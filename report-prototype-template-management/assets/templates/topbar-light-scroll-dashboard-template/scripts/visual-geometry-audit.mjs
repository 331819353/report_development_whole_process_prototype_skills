import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const args = process.argv.slice(2);

const getArg = (name, fallback = '') => {
  const index = args.indexOf(name);
  if (index >= 0 && index + 1 < args.length) {
    return args[index + 1];
  }

  const prefixed = args.find((arg) => arg.startsWith(`${name}=`));
  return prefixed ? prefixed.slice(name.length + 1) : fallback;
};

const hasFlag = (name) => args.includes(name);
const projectRoot = process.cwd();
const reportDir = path.join(projectRoot, getArg('--out-dir', 'visual-check'));
const url = getArg('--url', process.env.DASHBOARD_QA_URL || '');
const waitMs = Number(getArg('--wait-ms', '12000'));
const stabilizeMs = Number(getArg('--stabilize-ms', '800'));
const failOn = getArg('--fail-on', 'major');
const viewportSpec = getArg('--viewports', getArg('--viewport', '1365x768,1920x1080'));

const severityRank = {
  none: Number.POSITIVE_INFINITY,
  minor: 1,
  major: 2,
  blocker: 3,
};

const thresholds = {
  overflowTolerance: Number(getArg('--overflow-tolerance', '2')),
  rowOverflowTolerance: Number(getArg('--row-overflow-tolerance', '1')),
  overlapArea: Number(getArg('--overlap-area', '12')),
  overlapRatio: Number(getArg('--overlap-ratio', '0.02')),
  minTextItemHeight: Number(getArg('--min-text-item-height', '32')),
  minChartHeight: Number(getArg('--min-chart-height', '180')),
  minDenseChartHeight: Number(getArg('--min-dense-chart-height', '220')),
  minChartRenderedHeight: Number(getArg('--min-chart-rendered-height', '120')),
  minPlotHeight: Number(getArg('--min-plot-height', '140')),
};

const usage = () => {
  console.log(`Usage:
  npm run visual:geometry -- --url http://localhost:5173
  npm run visual:geometry -- --url http://localhost:5173 --viewports 1365x768,1920x1080
  npm run visual:geometry -- --url http://localhost:5173 --fail-on blocker

Options:
  --url                 Target page URL. Can also use DASHBOARD_QA_URL.
  --viewports           Comma-separated viewport list. Default: 1365x768,1920x1080.
  --out-dir             Output directory for screenshots and JSON. Default: visual-check.
  --fail-on             none | minor | major | blocker. Default: major.
  --wait-ms             Navigation/network wait budget. Default: 12000.
  --stabilize-ms        Extra wait after fonts/network. Default: 800.
  --row-overflow-tolerance  List row clipping tolerance in px. Default: 1.
`);
};

const parseViewports = (spec) =>
  spec
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [widthText, heightText] = item.toLowerCase().split('x');
      const width = Number(widthText);
      const height = Number(heightText);

      if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
        throw new Error(`Invalid viewport "${item}". Expected WIDTHxHEIGHT, for example 1365x768.`);
      }

      return {
        name: `${width}x${height}`,
        width,
        height,
      };
    });

if (hasFlag('--help') || hasFlag('-h')) {
  usage();
  process.exit(0);
}

if (!url) {
  usage();
  console.error('[visual-geometry] missing --url or DASHBOARD_QA_URL.');
  process.exit(1);
}

if (!Object.hasOwn(severityRank, failOn)) {
  console.error(`[visual-geometry] invalid --fail-on "${failOn}". Use none, minor, major, or blocker.`);
  process.exit(1);
}

const loadPlaywright = async () => {
  try {
    return await import('playwright');
  } catch (error) {
    console.error('[visual-geometry] Playwright is not installed. Run npm install, then npx playwright install chromium.');
    console.error(`[visual-geometry] import error: ${error.message}`);
    process.exit(1);
  }
};

const evaluateGeometry = (auditThresholds) => {
  const findings = [];
  const seen = new Set();
  const severityRankInBrowser = {
    minor: 1,
    major: 2,
    blocker: 3,
  };

  const round = (value) => Math.round(value * 10) / 10;
  const rectOf = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      x: round(rect.x),
      y: round(rect.y),
      width: round(rect.width),
      height: round(rect.height),
      right: round(rect.right),
      bottom: round(rect.bottom),
    };
  };

  const isIgnored = (element) =>
    element.closest?.('[data-visual-audit-ignore], .visual-audit-ignore, [aria-hidden="true"]') ||
    element.matches?.('script, style, noscript, template, option');

  const isVisible = (element) => {
    if (!element || isIgnored(element)) {
      return false;
    }

    const style = window.getComputedStyle(element);

    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) {
      return false;
    }

    const rect = element.getBoundingClientRect();
    return rect.width >= 2 && rect.height >= 2;
  };

  const cssPath = (element) => {
    if (!element || element === document.documentElement) {
      return 'html';
    }

    if (element.id) {
      return `#${CSS.escape(element.id)}`;
    }

    const role = element.getAttribute('data-ui-role') || element.getAttribute('data-widget-id') || element.getAttribute('data-testid');

    if (role) {
      return `${element.tagName.toLowerCase()}[data*="${role.slice(0, 48)}"]`;
    }

    const className = Array.from(element.classList || [])
      .filter((name) => !/^css-|^is-|^el-/.test(name))
      .slice(0, 2)
      .map((name) => `.${CSS.escape(name)}`)
      .join('');

    const parent = element.parentElement;

    if (!parent) {
      return element.tagName.toLowerCase();
    }

    const siblings = Array.from(parent.children).filter((item) => item.tagName === element.tagName);
    const nth = siblings.length > 1 ? `:nth-of-type(${siblings.indexOf(element) + 1})` : '';
    return `${cssPath(parent)} > ${element.tagName.toLowerCase()}${className}${nth}`;
  };

  const elementText = (element) => (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim();

  const addFinding = (finding) => {
    const element = finding.element;
    const rect = element ? rectOf(element) : undefined;
    const selector = element ? cssPath(element) : 'document';
    const key = `${finding.id}|${selector}|${finding.observation}`;

    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    findings.push({
      id: finding.id,
      severity: finding.severity,
      severityRank: severityRankInBrowser[finding.severity] || 0,
      category: finding.category,
      selector,
      rect,
      observation: finding.observation,
      impact: finding.impact,
      suggestedFix: finding.suggestedFix,
      evidence: finding.evidence,
    });
  };

  const isIntentionalScroll = (element, axis) => {
    const style = window.getComputedStyle(element);
    const overflow = axis === 'x' ? style.overflowX : style.overflowY;
    return overflow === 'auto' || overflow === 'scroll';
  };

  const hasHiddenOverflow = (element, axis) => {
    const style = window.getComputedStyle(element);
    const overflow = axis === 'x' ? style.overflowX : style.overflowY;
    return overflow === 'hidden' || overflow === 'clip';
  };

  const meaningfulContainerSelector = [
    '[data-ui-role]',
    '[data-widget-id]',
    '[data-testid]',
    '.dashboard-card',
    '.dashboard-widget',
    '.widget',
    '.widget-card',
    '.card',
    '.panel',
    '.summary',
    '.insight',
    '.metric',
    '.kpi',
    '.chart',
    '.table',
    '.nav',
    '.tabs',
    '.segment',
    '.filter',
    'main',
    'section',
  ].join(',');

  const overflowElements = Array.from(document.querySelectorAll(meaningfulContainerSelector))
    .filter(isVisible)
    .filter((element) => !['HTML', 'BODY'].includes(element.tagName) && element.id !== 'app');

  overflowElements.forEach((element) => {
    const overY = element.scrollHeight > element.clientHeight + auditThresholds.overflowTolerance;
    const overX = element.scrollWidth > element.clientWidth + auditThresholds.overflowTolerance;

    if (!overY && !overX) {
      return;
    }

    const axis = overY ? 'vertical' : 'horizontal';
    const intentional = overY ? isIntentionalScroll(element, 'y') : isIntentionalScroll(element, 'x');
    const hidden = overY ? hasHiddenOverflow(element, 'y') : hasHiddenOverflow(element, 'x');

    if (intentional && !hidden) {
      return;
    }

    addFinding({
      id: hidden ? 'VIS-CONTENT-CLIPPED' : 'VIS-CONTENT-OVERFLOW',
      severity: hidden ? 'major' : 'minor',
      category: hidden ? 'clipping' : 'overflow',
      element,
      observation: `${axis} content exceeds its viewport: scroll ${overY ? element.scrollHeight : element.scrollWidth}px > client ${overY ? element.clientHeight : element.clientWidth}px.`,
      impact: 'Decision-critical text, values, controls, or chart content may be hidden or squeezed.',
      suggestedFix: 'Increase the block span/height, allow visible scroll, split content, move details to drawer/fullscreen, or reduce internal density.',
      evidence: {
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight,
        overflowX: window.getComputedStyle(element).overflowX,
        overflowY: window.getComputedStyle(element).overflowY,
      },
    });
  });

  const textSelector = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
    'button',
    'a',
    'label',
    'li',
    'td',
    'th',
    '[class*="title" i]',
    '[class*="label" i]',
    '[class*="name" i]',
    '[class*="value" i]',
  ].join(',');

  Array.from(document.querySelectorAll(textSelector))
    .filter(isVisible)
    .forEach((element) => {
      const text = elementText(element);

      if (text.length < 4) {
        return;
      }

      const overX = element.scrollWidth > element.clientWidth + auditThresholds.overflowTolerance;
      const overY = element.scrollHeight > element.clientHeight + auditThresholds.overflowTolerance;

      if ((!overX || isIntentionalScroll(element, 'x')) && (!overY || isIntentionalScroll(element, 'y'))) {
        return;
      }

      addFinding({
        id: 'VIS-TEXT-CLIPPED',
        severity: element.matches('h1,h2,h3,h4,h5,h6,button,th') ? 'major' : 'minor',
        category: 'text clipping',
        element,
        observation: `Text "${text.slice(0, 60)}" exceeds its visible box.`,
        impact: 'The reader may lose labels, metric names, actions, or explanatory evidence.',
        suggestedFix: 'Allow wrapping, increase min-width/min-height, reduce text density, or move long text to tooltip/detail disclosure.',
        evidence: {
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
          scrollHeight: element.scrollHeight,
          clientHeight: element.clientHeight,
        },
      });
    });

  const overlapArea = (a, b) => {
    const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
    const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    return x * y;
  };

  const allowOverlap = (a, b) => {
    const allowSelector = [
      '.badge',
      '.tag',
      '.status',
      '.tooltip',
      '.popover',
      '.dropdown',
      '.legend',
      '.marker',
      '.avatar',
      '.icon',
      '[role="tooltip"]',
    ].join(',');

    return a.matches(allowSelector) || b.matches(allowSelector);
  };

  Array.from(document.querySelectorAll(meaningfulContainerSelector))
    .filter(isVisible)
    .forEach((parent) => {
      const children = Array.from(parent.children).filter(isVisible);

      if (children.length < 2 || children.length > 80) {
        return;
      }

      for (let i = 0; i < children.length; i += 1) {
        for (let j = i + 1; j < children.length; j += 1) {
          const first = children[i];
          const second = children[j];

          if (allowOverlap(first, second)) {
            continue;
          }

          const firstRect = first.getBoundingClientRect();
          const secondRect = second.getBoundingClientRect();
          const area = overlapArea(firstRect, secondRect);
          const minArea = Math.min(firstRect.width * firstRect.height, secondRect.width * secondRect.height);

          if (area <= auditThresholds.overlapArea || area / Math.max(minArea, 1) <= auditThresholds.overlapRatio) {
            continue;
          }

          addFinding({
            id: 'VIS-ELEMENT-OVERLAP',
            severity: area / Math.max(minArea, 1) > 0.15 ? 'major' : 'minor',
            category: 'element overlap',
            element: parent,
            observation: `Direct children overlap by ${round(area)}px2 inside ${cssPath(parent)}.`,
            impact: 'Text, controls, chart marks, or cards may collide and reduce readability.',
            suggestedFix: 'Reserve explicit gaps, remove transform/absolute positioning, increase block size, or split the crowded content.',
            evidence: {
              first: cssPath(first),
              second: cssPath(second),
              firstRect: rectOf(first),
              secondRect: rectOf(second),
              overlapArea: round(area),
            },
          });
        }
      }
    });

  Array.from(document.querySelectorAll(meaningfulContainerSelector))
    .filter(isVisible)
    .forEach((parent) => {
      const children = Array.from(parent.children).filter(isVisible);

      if (children.length < 2 || children.length > 40) {
        return;
      }

      children.forEach((child) => {
        const rect = child.getBoundingClientRect();
        const text = elementText(child);

        if (text.length >= 12 && rect.height < auditThresholds.minTextItemHeight) {
          addFinding({
            id: 'VIS-LIST-ITEM-SQUEEZED',
            severity: 'major',
            category: 'component squeezed',
            element: child,
            observation: `Repeated text item is only ${round(rect.height)}px tall: "${text.slice(0, 60)}".`,
            impact: 'List or insight rows are compressed, making hierarchy and text hard to read.',
            suggestedFix: 'Increase row min-height, allow multi-line text, reduce item count, or move secondary details out of the compact row.',
            evidence: {
              height: round(rect.height),
              minimum: auditThresholds.minTextItemHeight,
              parent: cssPath(parent),
            },
          });
        }
      });
    });

  const listContainerSelector = [
    '[data-ui-role*="list" i]',
    '[data-list-contract]',
    '[data-overflow-strategy]',
    '.operational-list',
    '.action-list',
    '.task-list',
    '.ranking-list',
    '.status-list',
    '.alert-list',
    '.exception-list',
    '.timeline-list',
    '.record-list',
    '.work-list',
    'ul',
    'ol',
  ].join(',');
  const listRowSelector = [
    '[data-ui-role*="list-row" i]',
    '[data-ui-role*="action-row" i]',
    '[data-ui-role*="task-row" i]',
    '[data-ui-role*="status-row" i]',
    '[data-list-row]',
    '[data-row-height-px]',
    '.list-row',
    '.action-row',
    '.task-row',
    '.status-row',
    '.alert-row',
    '.exception-row',
    '.timeline-row',
    '.record-row',
    '.work-item',
    'li',
  ].join(',');

  Array.from(new Set(Array.from(document.querySelectorAll(listRowSelector))))
    .filter(isVisible)
    .filter((row) => row.closest(listContainerSelector))
    .forEach((row) => {
      const overY = row.scrollHeight > row.clientHeight + auditThresholds.rowOverflowTolerance;
      const overX = row.scrollWidth > row.clientWidth + auditThresholds.rowOverflowTolerance;

      if (!overY && !overX) {
        return;
      }

      addFinding({
        id: 'VIS-LIST-ROW-CLIPPED',
        severity: 'major',
        category: 'list row clipping',
        element: row,
        observation: `List row content exceeds its own box: scroll ${row.scrollWidth}x${row.scrollHeight}px > client ${row.clientWidth}x${row.clientHeight}px.`,
        impact: 'Action, status, or evidence rows are clipped inside the row and cannot be reliably reviewed.',
        suggestedFix: 'Increase rowHeightPx, reduce visibleRowCount, or move overflow content to detail/tooltip/drawer instead of clipping the row.',
        evidence: {
          scrollWidth: row.scrollWidth,
          clientWidth: row.clientWidth,
          scrollHeight: row.scrollHeight,
          clientHeight: row.clientHeight,
          rowHeightPx: row.getAttribute('data-row-height-px') || undefined,
          overflowStrategy: row.closest('[data-overflow-strategy]')?.getAttribute('data-overflow-strategy') || undefined,
          text: elementText(row).slice(0, 80),
        },
      });
    });

  Array.from(document.querySelectorAll(listContainerSelector))
    .filter(isVisible)
    .forEach((list) => {
      const overY = list.scrollHeight > list.clientHeight + auditThresholds.rowOverflowTolerance;
      const hidden = hasHiddenOverflow(list, 'y');

      if (!overY || !hidden) {
        return;
      }

      addFinding({
        id: 'VIS-LIST-OVERFLOW-HIDDEN',
        severity: 'major',
        category: 'list clipping',
        element: list,
        observation: `List container clips overflow: scrollHeight ${list.scrollHeight}px > clientHeight ${list.clientHeight}px with hidden/clip overflow.`,
        impact: 'Extra action or evidence rows are hard-hidden instead of routed to a detail, tooltip, drawer, or view-all path.',
        suggestedFix: 'Declare rowHeightPx, visibleRowCount, and overflowStrategy, then use detail/tooltip/drawer/view-all overflow handling.',
        evidence: {
          scrollHeight: list.scrollHeight,
          clientHeight: list.clientHeight,
          overflowY: window.getComputedStyle(list).overflowY,
          overflowStrategy: list.getAttribute('data-overflow-strategy') || undefined,
        },
      });
    });

  const nearestVisualContainer = (element) =>
    element.closest?.(
      '[data-ui-role*="chart" i], [data-widget-id], .chart, .chart-card, .dashboard-widget, .widget, .widget-card, .dashboard-card, .card, .panel',
    ) || element;

  const chartElements = Array.from(
    new Set(
      Array.from(
        document.querySelectorAll(
          '[_echarts_instance_], canvas, svg, [data-ui-role*="chart" i], [class*="chart" i], [class*="echart" i]',
        ),
      )
        .filter(isVisible)
        .map(nearestVisualContainer),
    ),
  ).filter(isVisible);

  chartElements.forEach((container) => {
    const rect = container.getBoundingClientRect();
    const rendered = Array.from(container.querySelectorAll('canvas, svg')).filter(isVisible);
    const renderedHeights = rendered.map((item) => item.getBoundingClientRect().height).filter((height) => height > 0);
    const renderedHeight = renderedHeights.length > 0 ? Math.max(...renderedHeights) : rect.height;
    const classText = `${container.className || ''} ${container.getAttribute('data-ui-role') || ''} ${container.getAttribute('data-widget-id') || ''} ${container.getAttribute('data-visual-type') || ''} ${container.getAttribute('data-chart-type') || ''}`;
    const isMini = /spark|mini|micro|compact|icon|logo|avatar|badge/i.test(classText);
    const isAxisChart = /(?:line|bar|combo|axis|cartesian|column)/i.test(classText);
    const hasDenseCompanion = Boolean(container.closest('.card, .dashboard-card, .widget, .panel')?.querySelector('table, [class*="table" i], ul, ol'));
    const minHeight = hasDenseCompanion ? auditThresholds.minDenseChartHeight : auditThresholds.minChartHeight;
    const plotElement =
      container.querySelector('[data-chart-plot], [data-ui-role*="plot" i], .chart-plot, .plot-area') || rendered[0] || container;
    const plotHeight = plotElement ? plotElement.getBoundingClientRect().height : renderedHeight;

    if (!isMini && rect.width >= 220 && rect.height < minHeight) {
      addFinding({
        id: 'VIS-CHART-SQUEEZED',
        severity: 'major',
        category: 'chart squeezed',
        element: container,
        observation: `Chart container height ${round(rect.height)}px is below ${minHeight}px.`,
        impact: 'Axis charts, legends, and labels can collapse into a thin band and become unreadable.',
        suggestedFix: 'Increase grid span/row height, hide axes only for an explicit sparkline, or split chart and table/list content into separate blocks.',
        evidence: {
          width: round(rect.width),
          height: round(rect.height),
          minimum: minHeight,
          hasDenseCompanion,
        },
      });
    }

    if (!isMini && isAxisChart && rect.width >= 180 && renderedHeight < auditThresholds.minChartHeight) {
      addFinding({
        id: 'VIS-CHART-BODY-SQUEEZED',
        severity: 'major',
        category: 'chart squeezed',
        element: container,
        observation: `Axis chart body/rendered height ${round(renderedHeight)}px is below ${auditThresholds.minChartHeight}px.`,
        impact: 'Full coordinate-axis line/bar/combo charts need enough chart body height for marks, axes, legend, and tooltip targets.',
        suggestedFix: 'Reserve chartBodyH >= 180px, expand the block to 3+ rows, or switch to an explicit compact-sparkline with legend, axis unit/name, and permanent labels hidden.',
        evidence: {
          renderedHeight: round(renderedHeight),
          minimumChartBodyH: auditThresholds.minChartHeight,
        },
      });
    }

    if (!isMini && rect.width >= 180 && renderedHeight < auditThresholds.minChartRenderedHeight) {
      addFinding({
        id: 'VIS-CHART-SQUEEZED',
        severity: 'major',
        category: 'chart squeezed',
        element: container,
        observation: `Rendered canvas/svg height ${round(renderedHeight)}px is below ${auditThresholds.minChartRenderedHeight}px.`,
        impact: 'The rendered chart body is too short to carry labels, marks, and tooltip targets safely.',
        suggestedFix: 'Reserve more chart body height or convert to a documented sparkline/compact indicator.',
        evidence: {
          renderedHeight: round(renderedHeight),
          minimum: auditThresholds.minChartRenderedHeight,
        },
      });
    }

    const minPlotHeight = hasDenseCompanion ? auditThresholds.minPlotHeight : auditThresholds.minChartRenderedHeight;

    if (!isMini && isAxisChart && plotHeight < minPlotHeight) {
      addFinding({
        id: 'VIS-CHART-PLOT-SQUEEZED',
        severity: 'major',
        category: 'chart plot squeezed',
        element: plotElement || container,
        observation: `Axis chart plot height ${round(plotHeight)}px is below ${minPlotHeight}px.`,
        impact: 'The actual plot band is too short to distinguish bars, line movement, labels, and hover targets.',
        suggestedFix: 'Increase the chart plot budget, remove permanent labels, move preview rows to detail, or switch to compact-sparkline mode.',
        evidence: {
          plotHeight: round(plotHeight),
          minimumPlotHeight: minPlotHeight,
          hasDenseCompanion,
        },
      });
    }

    if (hasDenseCompanion && renderedHeight < auditThresholds.minPlotHeight) {
      addFinding({
        id: 'VIS-CHART-TABLE-CROWDING',
        severity: 'major',
        category: 'chart/table crowding',
        element: container,
        observation: `Chart shares a card with table/list content while rendered height is ${round(renderedHeight)}px.`,
        impact: 'Neither the chart plot nor the preview rows have enough reading space.',
        suggestedFix: 'Use a Top3 preview, drawer/detail route, tab split, or larger parent span instead of squeezing both into one card.',
        evidence: {
          renderedHeight: round(renderedHeight),
          minimumPlotHeight: auditThresholds.minPlotHeight,
        },
      });
    }

    rendered
      .filter((item) => item.tagName.toLowerCase() === 'svg')
      .forEach((svg) => {
        const textNodes = Array.from(svg.querySelectorAll('text')).filter(isVisible);

        for (let i = 0; i < textNodes.length; i += 1) {
          for (let j = i + 1; j < textNodes.length; j += 1) {
            const first = textNodes[i];
            const second = textNodes[j];
            const area = overlapArea(first.getBoundingClientRect(), second.getBoundingClientRect());

            if (area <= 4) {
              continue;
            }

            addFinding({
              id: 'VIS-AXIS-LABEL-STACKED',
              severity: 'major',
              category: 'chart label overlap',
              element: svg,
              observation: `SVG chart text labels overlap by ${round(area)}px2.`,
              impact: 'Axis labels, legends, or annotations may be unreadable or misleading.',
              suggestedFix: 'Increase grid/legend spacing, rotate/sample labels, hide low-priority labels, or increase chart body size.',
              evidence: {
                firstText: elementText(first),
                secondText: elementText(second),
                overlapArea: round(area),
              },
            });
          }
        }
      });
  });

  findings.sort((a, b) => b.severityRank - a.severityRank || a.id.localeCompare(b.id));
  return findings.slice(0, 200);
};

const viewports = parseViewports(viewportSpec);
const { chromium } = await loadPlaywright();
mkdirSync(reportDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const allFindings = [];
const screenshots = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: {
        width: viewport.width,
        height: viewport.height,
      },
      deviceScaleFactor: 1,
      locale: 'zh-CN',
      timezoneId: 'Asia/Shanghai',
    });
    const page = await context.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: waitMs });
    await page.waitForLoadState('networkidle', { timeout: waitMs }).catch(() => undefined);
    await page.evaluate(() => document.fonts?.ready).catch(() => undefined);
    await page.waitForTimeout(stabilizeMs);

    const screenshotPath = path.join(reportDir, `geometry-${viewport.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    screenshots.push(path.relative(projectRoot, screenshotPath));

    const viewportFindings = await page.evaluate(evaluateGeometry, thresholds);
    viewportFindings.forEach((finding) => {
      allFindings.push({
        ...finding,
        viewport: viewport.name,
        screenshot: path.relative(projectRoot, screenshotPath),
      });
    });

    await context.close();
  }
} finally {
  await browser.close();
}

const report = {
  url,
  generatedAt: new Date().toISOString(),
  viewports: viewports.map(({ name, width, height }) => ({ name, width, height })),
  thresholds,
  failOn,
  screenshots,
  findingCount: allFindings.length,
  findings: allFindings,
};

const reportPath = path.join(reportDir, 'geometry-report.json');
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

allFindings.forEach((finding) => {
  const prefix = severityRank[finding.severity] >= severityRank[failOn] ? 'error' : 'warning';
  const logMethod = prefix === 'error' ? 'error' : 'warn';
  console[logMethod](
    `[visual-geometry ${prefix}] ${finding.id} ${finding.severity} ${finding.viewport} ${finding.selector}: ${finding.observation}`,
  );
});

console.log(`[visual-geometry] screenshots: ${screenshots.join(', ')}`);
console.log(`[visual-geometry] report: ${path.relative(projectRoot, reportPath)}`);

const failingFindings = allFindings.filter((finding) => severityRank[finding.severity] >= severityRank[failOn]);

if (failingFindings.length > 0) {
  console.error(`[visual-geometry] failed: ${failingFindings.length} finding(s) at or above ${failOn}.`);
  process.exit(1);
}

console.log('[visual-geometry] ok');
