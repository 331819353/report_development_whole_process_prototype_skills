<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../../types';

interface SunburstChartExampleNode {
  name: string;
  value?: number;
  color?: string;
  children?: SunburstChartExampleNode[];
}

interface SunburstChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface SunburstChartExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface SunburstChartExampleLayoutConfig {
  paddingPx?: number;
  gapPx?: number;
  titleHeightPx?: number;
  contentGapPx?: number;
  orientation?: 'auto' | 'horizontal' | 'vertical';
  horizontalAuxRatio?: number;
  horizontalChartRatio?: number;
  verticalAuxRatio?: number;
  verticalChartRatio?: number;
}

interface SunburstChartExampleAuxConfig {
  visible?: boolean;
  maxItems?: number;
  orientation?: 'auto' | 'horizontal' | 'vertical';
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface SunburstChartExampleChartConfig {
  topN?: number;
  maxDepth?: number;
  innerRadiusPercent?: number;
  outerRadiusPercent?: number;
  centerVisible?: boolean;
  labelVisible?: boolean;
  borderRadiusPx?: number;
  borderWidthPx?: number;
  minLabelAngle?: number;
  valueUnit?: string;
  percentDigits?: number;
  sort?: 'desc' | 'asc' | 'none';
}

interface SunburstChartExampleToneConfig {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  quaternary?: string;
  axis?: string;
  text?: string;
  unit?: string;
}

interface SunburstChartExampleCardConfig {
  title?: SunburstChartExampleTitleConfig;
  layout?: SunburstChartExampleLayoutConfig;
  aux?: SunburstChartExampleAuxConfig;
  chart?: SunburstChartExampleChartConfig;
  tones?: SunburstChartExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  totalLabel?: string;
  nodes?: SunburstChartExampleNode[];
  auxMetrics?: SunburstChartExampleAuxMetric[];
  config?: SunburstChartExampleCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const chartRef = ref<HTMLDivElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
const chartSize = ref({ width: 0, height: 0 });
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const text = {
  title: '\u65ed\u65e5\u56fe\u5361\u7247',
  unit: '\u5355\u4f4d\uff1a\u503c',
  total: '\u5408\u8ba1',
  topNode: '\u6700\u5927\u7c7b',
  leafCount: '\u53f6\u5b50\u6570',
  depth: '\u5c42\u7ea7',
  noData: '\u6682\u65e0\u65ed\u65e5\u56fe\u6570\u636e',
  other: '\u5176\u4ed6',
};

const defaultNodes: SunburstChartExampleNode[] = [
  {
    name: '\u7ebf\u4e0a\u6e20\u9053',
    children: [
      { name: '\u76f4\u8425', value: 42 },
      { name: '\u5e73\u53f0', value: 24 },
      { name: '\u79c1\u57df', value: 14 },
    ],
  },
  {
    name: '\u95e8\u5e97\u96f6\u552e',
    children: [
      { name: '\u65d7\u8230\u5e97', value: 28 },
      { name: '\u793e\u533a\u5e97', value: 18 },
      { name: '\u4e34\u65f6\u5e97', value: 8 },
    ],
  },
  {
    name: '\u7ecf\u9500\u6e20\u9053',
    children: [
      { name: '\u7701\u4ee3', value: 22 },
      { name: '\u57ce\u5e02\u4ee3', value: 17 },
      { name: '\u96f6\u552e\u5546', value: 11 },
    ],
  },
  {
    name: '\u5de5\u7a0b\u5ba2\u6237',
    children: [
      { name: '\u5927\u5ba2\u6237', value: 16 },
      { name: '\u9879\u76ee\u5ba2\u6237', value: 12 },
    ],
  },
];

const defaultTitleConfig: Required<SunburstChartExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<SunburstChartExampleLayoutConfig> = {
  paddingPx: 5,
  gapPx: 2,
  titleHeightPx: 20,
  contentGapPx: 6,
  orientation: 'auto',
  horizontalAuxRatio: 1,
  horizontalChartRatio: 3,
  verticalAuxRatio: 1,
  verticalChartRatio: 2,
};

const defaultAuxConfig: Required<SunburstChartExampleAuxConfig> = {
  visible: true,
  maxItems: 4,
  orientation: 'auto',
  labelFontSizePx: 9,
  valueFontSizePx: 12,
  labelColor: '#6b7c93',
  valueColor: '#0057d9',
};

const defaultChartConfig: Required<SunburstChartExampleChartConfig> = {
  topN: 7,
  maxDepth: 3,
  innerRadiusPercent: 18,
  outerRadiusPercent: 96,
  centerVisible: false,
  labelVisible: true,
  borderRadiusPx: 5,
  borderWidthPx: 1.2,
  minLabelAngle: 12,
  valueUnit: '',
  percentDigits: 1,
  sort: 'desc',
};

const defaultToneConfig: Required<SunburstChartExampleToneConfig> = {
  primary: '#0057d9',
  secondary: '#2f8ee5',
  tertiary: '#00a870',
  quaternary: '#f59e0b',
  axis: '#7a8aa0',
  text: '#15304f',
  unit: '#667085',
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value));

const clampNumber = (value: unknown, min: number, max: number, fallback: number) => {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return fallback;
  }

  return Math.min(Math.max(numberValue, min), max);
};

const normalizeOrientation = (value: unknown): Required<SunburstChartExampleLayoutConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const normalizeAuxOrientation = (value: unknown): Required<SunburstChartExampleAuxConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const normalizeSort = (value: unknown): Required<SunburstChartExampleChartConfig>['sort'] => {
  if (value === 'asc' || value === 'desc' || value === 'none') {
    return value;
  }

  return defaultChartConfig.sort;
};

const resolvedTitle = computed<Required<SunburstChartExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<SunburstChartExampleLayoutConfig>>(() => {
  const config = props.config?.layout ?? {};

  return {
    ...defaultLayoutConfig,
    ...config,
    paddingPx: clampNumber(config.paddingPx, 0, 24, defaultLayoutConfig.paddingPx),
    gapPx: clampNumber(config.gapPx, 0, 16, defaultLayoutConfig.gapPx),
    titleHeightPx: clampNumber(config.titleHeightPx, 16, 40, defaultLayoutConfig.titleHeightPx),
    contentGapPx: clampNumber(config.contentGapPx, 0, 18, defaultLayoutConfig.contentGapPx),
    orientation: normalizeOrientation(config.orientation),
    horizontalAuxRatio: clampNumber(config.horizontalAuxRatio, 0.5, 4, defaultLayoutConfig.horizontalAuxRatio),
    horizontalChartRatio: clampNumber(config.horizontalChartRatio, 0.5, 5, defaultLayoutConfig.horizontalChartRatio),
    verticalAuxRatio: clampNumber(config.verticalAuxRatio, 0.5, 4, defaultLayoutConfig.verticalAuxRatio),
    verticalChartRatio: clampNumber(config.verticalChartRatio, 0.5, 5, defaultLayoutConfig.verticalChartRatio),
  };
});

const resolvedAux = computed<Required<SunburstChartExampleAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  orientation: normalizeAuxOrientation(props.config?.aux?.orientation),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 8, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedChart = computed<Required<SunburstChartExampleChartConfig>>(() => ({
  ...defaultChartConfig,
  ...(props.config?.chart ?? {}),
  topN: Math.round(clampNumber(props.config?.chart?.topN, 2, 12, defaultChartConfig.topN)),
  maxDepth: Math.round(clampNumber(props.config?.chart?.maxDepth, 2, 4, defaultChartConfig.maxDepth)),
  innerRadiusPercent: clampNumber(props.config?.chart?.innerRadiusPercent, 0, 45, defaultChartConfig.innerRadiusPercent),
  outerRadiusPercent: clampNumber(props.config?.chart?.outerRadiusPercent, 46, 98, defaultChartConfig.outerRadiusPercent),
  borderRadiusPx: clampNumber(props.config?.chart?.borderRadiusPx, 0, 12, defaultChartConfig.borderRadiusPx),
  borderWidthPx: clampNumber(props.config?.chart?.borderWidthPx, 0, 4, defaultChartConfig.borderWidthPx),
  minLabelAngle: clampNumber(props.config?.chart?.minLabelAngle, 4, 28, defaultChartConfig.minLabelAngle),
  percentDigits: Math.round(clampNumber(props.config?.chart?.percentDigits, 0, 2, defaultChartConfig.percentDigits)),
  sort: normalizeSort(props.config?.chart?.sort),
}));

const resolvedTones = computed<Required<SunburstChartExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || text.title);
const unit = computed(() => props.unit?.trim() || text.unit);
const totalLabel = computed(() => props.totalLabel?.trim() || text.total);
const valueUnit = computed(() => {
  const configured = resolvedChart.value.valueUnit.trim();

  if (configured) {
    return configured;
  }

  return unit.value.replace(/^\u5355\u4f4d[:\uff1a]?/, '').trim();
});

const sourceNodes = computed<SunburstChartExampleNode[]>(() => {
  if (props.nodes?.length) {
    return props.nodes;
  }

  const dataNodes = (props.data ?? []).reduce<SunburstChartExampleNode[]>((nodes, item, index) => {
    if (!isRecord(item)) {
      return nodes;
    }

    const group = String(item.group ?? item.parent ?? text.other);
    const existing = nodes.find((node) => node.name === group);
    const child = {
      name: String(item.name ?? item.label ?? `${text.other} ${index + 1}`),
      value: Number(item.value ?? item.amount ?? 0),
    };

    if (existing) {
      existing.children = [...(existing.children ?? []), child];
    } else {
      nodes.push({ name: group, children: [child] });
    }

    return nodes;
  }, []);

  return dataNodes.length ? dataNodes : defaultNodes;
});

const sumNodeValue = (node: SunburstChartExampleNode): number => {
  const childTotal = (node.children ?? []).reduce((sum, child) => sum + sumNodeValue(child), 0);

  if (childTotal > 0) {
    return childTotal;
  }

  return Math.max(0, Number(node.value ?? 0));
};

const sortNodes = (nodes: SunburstChartExampleNode[]) => {
  if (resolvedChart.value.sort === 'none') {
    return nodes;
  }

  return [...nodes].sort((a, b) => {
    const diff = sumNodeValue(b) - sumNodeValue(a);
    return resolvedChart.value.sort === 'asc' ? -diff : diff;
  });
};

const normalizeNodes = (nodes: SunburstChartExampleNode[], depth = 1): SunburstChartExampleNode[] => {
  const chartConfig = resolvedChart.value;
  const sorted = sortNodes(nodes)
    .map((node) => {
      const children = node.children?.length && depth < chartConfig.maxDepth
        ? normalizeNodes(node.children, depth + 1)
        : undefined;
      const value = children?.length
        ? children.reduce((sum, child) => sum + Number(child.value ?? 0), 0)
        : Math.max(0, Number(node.value ?? 0));

      return {
        name: node.name?.trim() || text.other,
        value,
        itemStyle: node.color ? { color: node.color } : undefined,
        children,
      };
    })
    .filter((node) => node.name && Number(node.value) > 0);

  if (sorted.length <= chartConfig.topN) {
    return sorted;
  }

  const visibleCount = Math.max(1, chartConfig.topN - 1);
  const visible = sorted.slice(0, visibleCount);
  const otherValue = sorted.slice(visibleCount).reduce((sum, node) => sum + Number(node.value ?? 0), 0);

  return otherValue > 0
    ? [...visible, { name: text.other, value: otherValue }]
    : visible;
};

const chartData = computed(() => normalizeNodes(sourceNodes.value));
const totalValue = computed(() => chartData.value.reduce((sum, node) => sum + Number(node.value ?? 0), 0));
const hasRenderableData = computed(() => totalValue.value > 0 && chartData.value.length > 0);

const flattenNodes = (nodes: SunburstChartExampleNode[], depth = 1): Array<SunburstChartExampleNode & { depth: number }> =>
  nodes.flatMap((node) => [
    { ...node, depth },
    ...flattenNodes(node.children ?? [], depth + 1),
  ]);

const allNodes = computed(() => flattenNodes(chartData.value));
const leafNodes = computed(() => allNodes.value.filter((node) => !(node.children?.length)));
const maxDepth = computed(() => Math.max(0, ...allNodes.value.map((node) => node.depth)));
const topNode = computed(() => sortNodes(chartData.value)[0]);

const formatNumber = (value: number | undefined, suffix = valueUnit.value) => {
  if (!Number.isFinite(value)) {
    return '--';
  }

  const numeric = Number(value);
  const formatted = Math.abs(numeric) >= 1000
    ? Math.round(numeric).toLocaleString('zh-CN')
    : `${Math.round(numeric * 10) / 10}`;

  return `${formatted}${suffix}`;
};

const formatPercent = (value: number) => {
  if (!Number.isFinite(value)) {
    return '--';
  }

  return `${value.toFixed(resolvedChart.value.percentDigits)}%`;
};

const defaultAuxMetrics = computed<SunburstChartExampleAuxMetric[]>(() => [
  { label: text.total, value: formatNumber(totalValue.value), tone: 'primary' },
  { label: text.topNode, value: topNode.value?.name ?? '--', tone: 'success' },
  { label: text.leafCount, value: leafNodes.value.length, tone: 'neutral' },
  { label: text.depth, value: maxDepth.value, tone: 'warning' },
]);

const visibleAuxMetrics = computed(() => {
  if (!resolvedAux.value.visible) {
    return [];
  }

  const metrics = props.auxMetrics?.length ? props.auxMetrics : defaultAuxMetrics.value;

  return metrics
    .filter((metric) => metric.label.trim() || String(metric.value).trim())
    .slice(0, resolvedAux.value.maxItems);
});

const contentOrientation = computed<'horizontal' | 'vertical'>(() => {
  const orientation = resolvedLayout.value.orientation;

  if (orientation === 'horizontal' || orientation === 'vertical') {
    return orientation;
  }

  if (!containerSize.value.width || !containerSize.value.height) {
    return 'horizontal';
  }

  return containerSize.value.width >= containerSize.value.height ? 'horizontal' : 'vertical';
});

const auxOrientation = computed<'horizontal' | 'vertical'>(() => {
  const orientation = resolvedAux.value.orientation;

  if (orientation === 'horizontal' || orientation === 'vertical') {
    return orientation;
  }

  return contentOrientation.value === 'horizontal' ? 'vertical' : 'horizontal';
});

const cardClasses = computed(() => ({
  [`is-${contentOrientation.value}`]: true,
  [`aux-${auxOrientation.value}`]: true,
  'has-aux': visibleAuxMetrics.value.length > 0,
  'has-title': resolvedTitle.value.visible,
  'has-title-underline': resolvedTitle.value.underline,
}));

const palette = computed(() => [
  resolvedTones.value.primary,
  resolvedTones.value.secondary,
  resolvedTones.value.tertiary,
  resolvedTones.value.quaternary,
  '#7bb6df',
  '#b8c3d1',
]);

const normalizeColor = (color: string) => (color.startsWith('#') ? color : resolvedTones.value.primary);

const hexToRgba = (color: string, opacity: number) => {
  const normalized = normalizeColor(color).replace('#', '');
  const expanded = normalized.length === 3 ? normalized.split('').map((item) => item + item).join('') : normalized;
  const numeric = Number.parseInt(expanded, 16);

  if (!Number.isFinite(numeric)) {
    return `rgba(0, 87, 217, ${opacity})`;
  }

  const r = (numeric >> 16) & 255;
  const g = (numeric >> 8) & 255;
  const b = numeric & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const chartScale = computed(() => {
  const width = chartSize.value.width || containerSize.value.width || 240;
  const fallbackHeight = Math.max(containerSize.value.height - resolvedLayout.value.titleHeightPx - resolvedLayout.value.gapPx, 80);
  const height = chartSize.value.height || fallbackHeight;
  const compact = Math.min(width / 280, height / 170);
  const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
  const chartConfig = resolvedChart.value;
  const labelVisible = chartConfig.labelVisible && width >= 160 && height >= 112;
  const centerVisible = chartConfig.centerVisible && width >= 150 && height >= 110;
  const radiusLimit = width < 160 || height < 96 ? 90 : width < 240 || height < 130 ? 94 : 96;
  const outerLimit = Math.min(radiusLimit, chartConfig.outerRadiusPercent);
  const outerRadius = Math.min(chartConfig.outerRadiusPercent, outerLimit);
  const innerRadius = Math.min(chartConfig.innerRadiusPercent, outerRadius - 32);
  const middleRadius = Math.round(innerRadius + (outerRadius - innerRadius) * 0.44);

  return {
    fontSize,
    labelFontSize: Math.max(8, fontSize - 0.5),
    centerLabelFontSize: Math.max(8, fontSize - 1),
    centerValueFontSize: Math.max(10, fontSize + 1),
    labelVisible,
    centerVisible,
    labelWidth: width < 230 ? 42 : 58,
    centerX: '50%',
    centerY: height < 110 ? '54%' : '53%',
    innerRadius,
    middleRadius,
    outerRadius,
    radius: [`${Math.max(innerRadius, 0)}%`, `${outerRadius}%`] as [string, string],
  };
});

const tooltipFormatter = (params: unknown) => {
  if (!isRecord(params)) {
    return '';
  }

  const name = String(params.name ?? '');
  const value = Number(params.value ?? 0);
  const treePathInfo = Array.isArray(params.treePathInfo) ? params.treePathInfo : [];
  const path = treePathInfo
    .map((item) => (isRecord(item) ? String(item.name ?? '') : ''))
    .filter(Boolean)
    .join(' / ');
  const parent = treePathInfo.length > 1 && isRecord(treePathInfo[treePathInfo.length - 2])
    ? treePathInfo[treePathInfo.length - 2]
    : undefined;
  const parentValue = Number(parent?.value ?? totalValue.value);
  const totalShare = totalValue.value ? (value / totalValue.value) * 100 : 0;
  const parentShare = parentValue ? (value / parentValue) * 100 : 0;

  return [
    path || name,
    `${text.total}: ${formatNumber(value)}`,
    `\u603b\u5360\u6bd4: ${formatPercent(totalShare)}`,
    `\u7236\u7ea7\u5360\u6bd4: ${formatPercent(parentShare)}`,
  ].join('<br/>');
};

const option = computed<EChartsOption>(() => {
  const scale = chartScale.value;
  const tones = resolvedTones.value;
  const chartConfig = resolvedChart.value;

  return {
    animationDuration: 520,
    color: palette.value,
    tooltip: {
      trigger: 'item',
      confine: true,
      appendToBody: true,
      formatter: tooltipFormatter,
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      borderColor: 'rgba(0, 87, 217, 0.16)',
      textStyle: {
        color: tones.text,
        fontSize: 11,
      },
    },
    series: [
      {
        name: title.value,
        type: 'sunburst',
        data: chartData.value,
        radius: scale.radius,
        center: [scale.centerX, scale.centerY],
        sort: chartConfig.sort === 'none' ? undefined : chartConfig.sort,
        nodeClick: false,
        minAngle: 3,
        emphasis: {
          focus: 'ancestor',
        },
        itemStyle: {
          borderColor: 'rgba(255, 255, 255, 0.9)',
          borderWidth: chartConfig.borderWidthPx,
          borderRadius: chartConfig.borderRadiusPx,
          shadowBlur: 2,
          shadowColor: 'rgba(0, 87, 217, 0.08)',
        },
        label: {
          show: scale.labelVisible,
          rotate: 'radial',
          color: tones.text,
          fontSize: scale.labelFontSize,
          minAngle: chartConfig.minLabelAngle,
          overflow: 'truncate',
          width: scale.labelWidth,
          formatter: '{b}',
        },
        levels: [
          {},
          {
            r0: `${Math.max(0, scale.innerRadius)}%`,
            r: `${scale.middleRadius}%`,
            label: {
              show: scale.labelVisible,
              rotate: 0,
              fontWeight: 800,
            },
            itemStyle: {
              borderWidth: chartConfig.borderWidthPx,
              borderRadius: chartConfig.borderRadiusPx,
            },
          },
          {
            r0: `${scale.middleRadius}%`,
            r: `${scale.outerRadius}%`,
            label: {
              show: scale.labelVisible,
              rotate: 'radial',
              color: tones.text,
              fontSize: scale.labelFontSize,
              minAngle: chartConfig.minLabelAngle,
              overflow: 'truncate',
              width: scale.labelWidth,
            },
            itemStyle: {
              borderWidth: chartConfig.borderWidthPx,
              borderRadius: chartConfig.borderRadiusPx,
            },
          },
        ],
      },
    ],
  } as EChartsOption;
});

const centerValue = computed(() => formatNumber(totalValue.value));

const cardStyle = computed(() => {
  const layout = resolvedLayout.value;
  const titleConfig = resolvedTitle.value;
  const auxConfig = resolvedAux.value;
  const tones = resolvedTones.value;

  return {
    '--sunburst-chart-card-padding': `${layout.paddingPx}px`,
    '--sunburst-chart-card-gap': `${layout.gapPx}px`,
    '--sunburst-chart-content-gap': `${layout.contentGapPx}px`,
    '--sunburst-chart-title-row': `${layout.titleHeightPx}px`,
    '--sunburst-chart-horizontal-split': `minmax(0, ${layout.horizontalAuxRatio}fr) minmax(0, ${layout.horizontalChartRatio}fr)`,
    '--sunburst-chart-vertical-split': `minmax(0, ${layout.verticalAuxRatio}fr) minmax(0, ${layout.verticalChartRatio}fr)`,
    '--sunburst-chart-aux-count': `${Math.max(visibleAuxMetrics.value.length, 1)}`,
    '--sunburst-chart-aux-label-font-size': `${auxConfig.labelFontSizePx}px`,
    '--sunburst-chart-aux-value-font-size': `${auxConfig.valueFontSizePx}px`,
    '--sunburst-chart-aux-label-color': auxConfig.labelColor,
    '--sunburst-chart-aux-value-color': auxConfig.valueColor,
    '--sunburst-chart-title-font-size': `${titleConfig.fontSizePx}px`,
    '--sunburst-chart-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--sunburst-chart-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--sunburst-chart-title-color': titleConfig.color || tones.text,
    '--sunburst-chart-unit-color': titleConfig.unitColor || tones.unit,
    '--sunburst-chart-primary': tones.primary,
    '--sunburst-chart-primary-soft': hexToRgba(tones.primary, 0.2),
    '--sunburst-chart-center-x': chartScale.value.centerX,
    '--sunburst-chart-center-y': chartScale.value.centerY,
    '--sunburst-chart-center-label-font-size': `${chartScale.value.centerLabelFontSize}px`,
    '--sunburst-chart-center-value-font-size': `${chartScale.value.centerValueFontSize}px`,
    '--sunburst-chart-center-label-color': tones.axis,
    '--sunburst-chart-center-value-color': tones.text,
  };
});

const updateContainerSize = () => {
  if (!rootRef.value) {
    return;
  }

  const rect = rootRef.value.getBoundingClientRect();
  const nextSize = {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };

  if (nextSize.width !== containerSize.value.width || nextSize.height !== containerSize.value.height) {
    containerSize.value = nextSize;
  }

  const chartRect = chartRef.value?.getBoundingClientRect();
  const nextChartSize = {
    width: Math.round(chartRect?.width ?? 0),
    height: Math.round(chartRect?.height ?? 0),
  };

  if (nextChartSize.width !== chartSize.value.width || nextChartSize.height !== chartSize.value.height) {
    chartSize.value = nextChartSize;
  }
};

const hasRenderableSize = () => {
  if (!chartRef.value) {
    return false;
  }

  const rect = chartRef.value.getBoundingClientRect();

  return rect.width > 0 && rect.height > 0;
};

const renderChart = () => {
  updateContainerSize();

  if (!hasRenderableData.value) {
    chart?.dispose();
    chart = null;
    return;
  }

  if (!chartRef.value || !hasRenderableSize()) {
    return;
  }

  chart ??= echarts.init(chartRef.value);
  chart.setOption(option.value, true);
  chart.resize();
};

const scheduleRenderChart = async () => {
  await nextTick();
  renderChart();
};

onMounted(() => {
  if (rootRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateContainerSize();
      if (hasRenderableSize()) {
        chart?.resize();
        void scheduleRenderChart();
      }
    });
    resizeObserver.observe(rootRef.value);
  }

  void scheduleRenderChart();
});

watch(option, () => {
  void scheduleRenderChart();
}, { deep: true, flush: 'post' });

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  chart?.dispose();
  chart = null;
});
</script>

<template>
  <section
    ref="rootRef"
    class="sunburst-chart-example-card"
    :class="cardClasses"
    :style="cardStyle"
    aria-label="Sunburst chart card"
  >
    <header v-if="resolvedTitle.visible" class="sunburst-chart-example-header">
      <div class="sunburst-chart-example-title-wrap">
        <span class="sunburst-chart-example-title">{{ title }}</span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="sunburst-chart-example-unit">{{ unit }}</span>
    </header>
    <div class="sunburst-chart-example-body">
      <div v-if="visibleAuxMetrics.length" class="sunburst-chart-example-aux" aria-label="Sunburst chart metrics">
        <span
          v-for="metric in visibleAuxMetrics"
          :key="`${metric.label}:${metric.value}`"
          class="sunburst-chart-example-aux-item"
          :class="`tone-${metric.tone ?? 'neutral'}`"
        >
          <em>{{ metric.label }}</em>
          <b>{{ metric.value }}</b>
        </span>
      </div>
      <div class="sunburst-chart-example-chart-pane">
        <div v-if="hasRenderableData" ref="chartRef" class="sunburst-chart-example-canvas" />
        <div v-if="hasRenderableData && chartScale.centerVisible" class="sunburst-chart-example-center">
          <em>{{ totalLabel }}</em>
          <b>{{ centerValue }}</b>
        </div>
        <div v-if="!hasRenderableData" class="sunburst-chart-example-empty">{{ text.noData }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sunburst-chart-example-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: var(--sunburst-chart-title-row) minmax(0, 1fr);
  row-gap: var(--sunburst-chart-card-gap);
  padding: var(--sunburst-chart-card-padding);
  overflow: hidden;
  background: transparent;
  color: var(--sunburst-chart-title-color);
}

.sunburst-chart-example-card:not(.has-title) {
  grid-template-rows: minmax(0, 1fr);
}

.sunburst-chart-example-header {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  column-gap: 8px;
}

.sunburst-chart-example-title-wrap {
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.sunburst-chart-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  color: var(--sunburst-chart-title-color);
  font-size: var(--sunburst-chart-title-font-size);
  line-height: var(--sunburst-chart-title-line-height);
  font-weight: 700;
  white-space: normal;
  overflow-wrap: anywhere;
}

.sunburst-chart-example-card.has-title-underline .sunburst-chart-example-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--sunburst-chart-primary) 0%,
    var(--sunburst-chart-primary-soft) 72%,
    transparent 100%
  );
}

.sunburst-chart-example-unit {
  justify-self: stretch;
  min-width: 0;
  width: 100%;
  color: var(--sunburst-chart-unit-color);
  font-size: var(--sunburst-chart-unit-font-size);
  line-height: var(--sunburst-chart-title-line-height);
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: right;
}

.sunburst-chart-example-body {
  min-width: 0;
  min-height: 0;
  display: grid;
  gap: var(--sunburst-chart-content-gap);
  overflow: hidden;
}

.sunburst-chart-example-card.has-aux.is-horizontal .sunburst-chart-example-body {
  grid-template-columns: var(--sunburst-chart-horizontal-split);
  grid-template-rows: minmax(0, 1fr);
}

.sunburst-chart-example-card.has-aux.is-vertical .sunburst-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--sunburst-chart-vertical-split);
}

.sunburst-chart-example-card:not(.has-aux) .sunburst-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.sunburst-chart-example-aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.sunburst-chart-example-card.aux-horizontal .sunburst-chart-example-aux {
  grid-template-columns: repeat(var(--sunburst-chart-aux-count), minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  column-gap: 4px;
}

.sunburst-chart-example-card.aux-vertical .sunburst-chart-example-aux {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--sunburst-chart-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
}

.sunburst-chart-example-aux-item {
  min-width: 0;
  min-height: 0;
  display: grid;
  align-content: center;
  color: var(--sunburst-chart-aux-value-color);
  overflow: hidden;
}

.sunburst-chart-example-card.aux-horizontal .sunburst-chart-example-aux-item {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto;
  justify-items: center;
  text-align: center;
  row-gap: 1px;
}

.sunburst-chart-example-card.aux-vertical .sunburst-chart-example-aux-item {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: stretch;
  column-gap: 6px;
  text-align: left;
}

.sunburst-chart-example-aux-item em,
.sunburst-chart-example-aux-item b {
  min-width: 0;
  font-style: normal;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sunburst-chart-example-aux-item em {
  color: var(--sunburst-chart-aux-label-color);
  font-size: var(--sunburst-chart-aux-label-font-size);
  font-weight: 600;
}

.sunburst-chart-example-aux-item b {
  color: var(--sunburst-chart-aux-value-color);
  font-size: var(--sunburst-chart-aux-value-font-size);
  font-weight: 800;
}

.sunburst-chart-example-card.aux-vertical .sunburst-chart-example-aux-item b {
  justify-self: end;
}

.sunburst-chart-example-aux-item.tone-neutral b {
  color: #52677a;
}

.sunburst-chart-example-aux-item.tone-success b {
  color: #12a867;
}

.sunburst-chart-example-aux-item.tone-warning b {
  color: #e58a00;
}

.sunburst-chart-example-aux-item.tone-danger b {
  color: #d93025;
}

.sunburst-chart-example-chart-pane {
  min-width: 0;
  min-height: 0;
  display: grid;
  position: relative;
  overflow: hidden;
}

.sunburst-chart-example-canvas {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.sunburst-chart-example-empty {
  min-width: 0;
  min-height: 0;
  display: grid;
  place-items: center;
  color: #667085;
  font-size: 12px;
  font-weight: 700;
}

.sunburst-chart-example-center {
  position: absolute;
  left: var(--sunburst-chart-center-x);
  top: var(--sunburst-chart-center-y);
  z-index: 1;
  display: grid;
  justify-items: center;
  align-content: center;
  min-width: 0;
  max-width: 38%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  text-align: center;
}

.sunburst-chart-example-center em,
.sunburst-chart-example-center b {
  min-width: 0;
  max-width: 100%;
  font-style: normal;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sunburst-chart-example-center em {
  color: var(--sunburst-chart-center-label-color);
  font-size: var(--sunburst-chart-center-label-font-size);
  font-weight: 600;
}

.sunburst-chart-example-center b {
  margin-top: 1px;
  color: var(--sunburst-chart-center-value-color);
  font-size: var(--sunburst-chart-center-value-font-size);
  font-weight: 800;
}
</style>
