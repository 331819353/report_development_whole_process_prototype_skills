import type { DashboardConfig } from '../../types/dashboard';
import type { RegisteredWidgetConfig, WidgetAuxMetric } from '../../widgets/types';
import type { ReportTemplateBlockAsset, ReportTemplateComponentSlotContract, ReportTemplateNav, ReportTemplatePageConfig } from '../types';
import { buildLayoutBlocks, normalizeLayoutRows } from '../utils/layout-grid';
import { validateReportBlueprint } from './compatibility';
import type {
  ReportAssetResolutionContext,
  ReportBlueprint,
  ReportBlueprintBlock,
  ReportBlueprintComponentSlot,
  ReportMaterializeOptions,
  ReportMaterializeResult,
  ReportTemplateRuntimePages,
  ReportTemplateSlotFill,
} from './types';
import {
  buildComponentRegionPatternFromSlots,
  buildComponentSlotContractsFromPattern,
  normalizeComponentRegionPattern,
} from './component-region-patterns';

type MutableDashboardConfig = DashboardConfig &
  ReportTemplateRuntimePages & {
    screen: DashboardConfig['screen'] & {
      topbarNav?: Array<{ id: string; label: string }>;
      defaultTopbarNavId?: string;
    };
  };

const cloneValue = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const getAssetById = <T extends { id: string; sourceBlockId?: string }>(assets: T[], id?: string) => {
  if (!id) {
    return undefined;
  }

  return assets.find((asset) => asset.id === id || asset.sourceBlockId === id);
};

const getBlockGenericTemplate = (block: ReportBlueprintBlock, context: ReportAssetResolutionContext) =>
  getAssetById(context.genericTemplates, block.genericTemplateId);

const getBlockWidget = (block: ReportBlueprintBlock, context: ReportAssetResolutionContext) =>
  block.widget ??
  getAssetById(context.componentSamples, block.componentSampleId)?.widget ??
  getBlockGenericTemplate(block, context)?.widget;

const getComponentSlotWidget = (slot: ReportBlueprintComponentSlot, context: ReportAssetResolutionContext) =>
  slot.widget ?? getAssetById(context.componentSamples, slot.componentSampleId)?.widget;

const getUnitMetric = (slotFill: ReportTemplateSlotFill): WidgetAuxMetric | undefined => {
  if (!slotFill.unit) {
    return undefined;
  }

  return typeof slotFill.unit === 'string' ? { label: '单位', value: slotFill.unit } : slotFill.unit;
};

const mergeAuxMetrics = (current: WidgetAuxMetric[] | undefined, slotFill: ReportTemplateSlotFill) => {
  const existingMetrics = current ?? [];
  const nextMetrics = slotFill.metrics ?? [];
  const unitMetric = getUnitMetric(slotFill);
  const nonUnitMetrics = [...existingMetrics, ...nextMetrics].filter((metric) => metric.label !== '单位');
  const existingUnit = [...existingMetrics].reverse().find((metric) => metric.label === '单位');

  return unitMetric || existingUnit ? [...nonUnitMetrics, unitMetric ?? existingUnit].filter(Boolean) as WidgetAuxMetric[] : nonUnitMetrics;
};

const applySlotFills = (widget: RegisteredWidgetConfig, slotFills: ReportTemplateSlotFill[] = []) => {
  const nextWidget = cloneValue(widget);

  slotFills.forEach((slotFill) => {
    if (slotFill.hidden) {
      return;
    }

    if (slotFill.slotId === 'titleArea' && slotFill.text) {
      nextWidget.displayTitle = slotFill.text;
    }

    if (slotFill.slotId === 'pillArea' && slotFill.pills) {
      nextWidget.titlePills = slotFill.pills.slice(0, 3);
    }

    if (slotFill.slotId === 'auxMetricArea') {
      nextWidget.auxMetrics = mergeAuxMetrics(nextWidget.auxMetrics, slotFill);
    }

    if (slotFill.slotId === 'unitArea') {
      nextWidget.auxMetrics = mergeAuxMetrics(nextWidget.auxMetrics, slotFill);
    }

    if (slotFill.slotId === 'summaryArea' && slotFill.text) {
      nextWidget.bodySummary = slotFill.text;
    }

    if (slotFill.slotId === 'componentArea' && slotFill.props) {
      nextWidget.props = {
        ...(nextWidget.props ?? {}),
        ...slotFill.props,
      } as RegisteredWidgetConfig['props'];
    }
  });

  return nextWidget;
};

const padSpanPart = (value: number) => String(value).padStart(2, '0');

const getBlockComponentPattern = (
  block: ReportBlueprintBlock,
  genericTemplate?: ReportTemplateBlockAsset,
) =>
  normalizeComponentRegionPattern(
    block.componentRegionPattern ??
    genericTemplate?.componentRegionPattern ??
    buildComponentRegionPatternFromSlots(block.componentSlots),
  );

const getBlockComponentSlotContracts = (
  block: ReportBlueprintBlock,
  genericTemplate?: ReportTemplateBlockAsset,
): ReportTemplateComponentSlotContract[] =>
  genericTemplate?.componentSlotContracts?.length
    ? genericTemplate.componentSlotContracts
    : buildComponentSlotContractsFromPattern(getBlockComponentPattern(block, genericTemplate));

const hasBlockComponentComposition = (
  block: ReportBlueprintBlock,
  genericTemplate?: ReportTemplateBlockAsset,
) =>
  Boolean(
    block.componentSlots?.length ||
    block.componentRegionPattern ||
    genericTemplate?.componentRegionPattern ||
    genericTemplate?.componentSlotContracts?.length,
  );

const createLayoutHostWidget = (
  block: ReportBlueprintBlock,
  genericTemplate: ReportTemplateBlockAsset | undefined,
  cols: number,
  rows: number,
): RegisteredWidgetConfig => ({
  type: `Span${padSpanPart(cols)}x${padSpanPart(rows)}Layout`,
  visualType: 'other',
  dataPolicy: 'static',
  displayTitle: block.id,
  props: {
    title: block.id,
    placeholder: '组件区域',
    showChrome: false,
    showFooter: false,
    componentRegionPattern: getBlockComponentPattern(block, genericTemplate),
    componentSlotContracts: getBlockComponentSlotContracts(block, genericTemplate),
  },
});

const materializeComponentSlots = (
  slots: ReportBlueprintComponentSlot[] = [],
  context: ReportAssetResolutionContext,
  slotContracts: ReportTemplateComponentSlotContract[] = [],
) =>
  slots.map((slot, index) => {
    const widget = getComponentSlotWidget(slot, context);
    const templateSlotId = slot.templateSlotId ?? slot.id;
    const contract = slotContracts.find((item) => item.id === templateSlotId || item.regionKey === slot.regionKey);

    return {
      id: slot.id,
      templateSlotId,
      label: slot.label ?? contract?.label ?? `组件${slot.regionKey ?? String.fromCharCode(65 + index)}`,
      regionKey: slot.regionKey ?? contract?.regionKey ?? String.fromCharCode(65 + index),
      role: slot.role ?? contract?.role,
      size: slot.size,
      dataBinding: slot.dataBinding,
      widget: widget ? applySlotFills(widget, slot.slotFills) : undefined,
    };
  });

const applyBlockComposition = (
  widget: RegisteredWidgetConfig,
  block: ReportBlueprintBlock,
  context: ReportAssetResolutionContext,
) => {
  const nextWidget = applySlotFills(widget, block.slotFills);
  const genericTemplate = getBlockGenericTemplate(block, context);
  const hasComponentComposition = hasBlockComponentComposition(block, genericTemplate);
  const componentRegionPattern = hasComponentComposition ? getBlockComponentPattern(block, genericTemplate) : undefined;
  const componentSlotContracts = hasComponentComposition ? getBlockComponentSlotContracts(block, genericTemplate) : [];
  const componentSlots = materializeComponentSlots(block.componentSlots, context, componentSlotContracts);

  if (hasComponentComposition) {
    nextWidget.props = {
      ...(nextWidget.props ?? {}),
      componentRegionPattern,
      componentSlotContracts,
      componentSlots,
    } as RegisteredWidgetConfig['props'];
  }

  return nextWidget;
};

const materializePage = (
  page: ReportBlueprint['pages'][number],
  context: ReportAssetResolutionContext,
): ReportTemplateNav => {
  const spanByLabel = new Map(buildLayoutBlocks(normalizeLayoutRows(page.layoutRows)).map((span) => [span.label, span]));
  const widgets = page.blocks.reduce<NonNullable<ReportTemplatePageConfig['widgets']>>((result, block) => {
    const span = spanByLabel.get(block.id);
    const cols = span ? Math.max(span.columnEnd - span.columnStart, 1) : 2;
    const rows = span ? Math.max(span.rowEnd - span.rowStart, 1) : 2;
    const genericTemplate = getBlockGenericTemplate(block, context);
    const hasComponentComposition = hasBlockComponentComposition(block, genericTemplate);
    const widget = getBlockWidget(block, context) ??
      (!hasComponentComposition && block.componentSlots?.length === 1 ? getComponentSlotWidget(block.componentSlots[0], context) : undefined) ??
      (hasComponentComposition
        ? createLayoutHostWidget(block, genericTemplate, cols, rows)
        : undefined);

    if (widget) {
      result[block.id] = applyBlockComposition(widget, block, context);
    }

    return result;
  }, {});

  return {
    id: page.id,
    label: page.label,
    icon: page.icon,
    layoutRows: page.layoutRows,
    widgets,
  };
};

const writePagesToConfig = (config: MutableDashboardConfig, pages: ReportTemplateNav[]) => {
  if (Array.isArray(config.nav)) {
    (config as unknown as { nav: ReportTemplateNav[] }).nav = pages.map((page) => ({
      ...page,
      icon: page.icon ?? 'Gauge',
    }));
    return;
  }

  const firstPage = pages[0];

  if (!firstPage) {
    return;
  }

  config.page = {
    layoutRows: firstPage.layoutRows,
    widgets: firstPage.widgets,
  };
  config.pages = pages.reduce<Record<string, ReportTemplatePageConfig>>((result, page) => {
    result[page.id] = {
      layoutRows: page.layoutRows,
      widgets: page.widgets,
    };
    return result;
  }, {});
  config.screen.topbarNav = pages.map((page) => ({ id: page.id, label: page.label }));
  config.screen.defaultTopbarNavId = firstPage.id;
};

export const materializeReportBlueprint = (
  baseConfig: DashboardConfig,
  blueprint: ReportBlueprint,
  context: ReportAssetResolutionContext,
  options: ReportMaterializeOptions = {},
): ReportMaterializeResult => {
  const findings = validateReportBlueprint(blueprint, context);
  const hasBlockingError = findings.some((finding) => finding.severity === 'error');
  const nextConfig = cloneValue(baseConfig) as MutableDashboardConfig;

  if (options.blockWhenInvalid && hasBlockingError) {
    return {
      config: nextConfig,
      findings,
      generatedPages: [],
    };
  }

  const pageLayout = context.pageLayouts.find((item) => item.id === blueprint.pageLayoutId);
  const generatedPages = blueprint.pages.map((page) => materializePage(page, context));

  nextConfig.screen.title = blueprint.title || nextConfig.screen.title;

  if (pageLayout) {
    nextConfig.screen.layout = {
      ...nextConfig.screen.layout,
      designWidth: pageLayout.designWidth,
      designHeight: pageLayout.designHeight,
    };
  }

  if (!options.keepBaseFilters && blueprint.filters) {
    nextConfig.filters = cloneValue(blueprint.filters);
  }

  writePagesToConfig(nextConfig, generatedPages);

  return {
    config: nextConfig,
    findings,
    generatedPages,
  };
};
