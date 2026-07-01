import type { DashboardConfig } from '../../types/dashboard';
import type { RegisteredWidgetConfig } from '../../widgets/types';
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

const getBlockLayoutTemplate = (block: ReportBlueprintBlock, context: ReportAssetResolutionContext) =>
  getAssetById(context.blockLayoutTemplates, block.blockLayoutTemplateId);

const getBlockWidget = (block: ReportBlueprintBlock, context: ReportAssetResolutionContext) =>
  block.widget ??
  getAssetById(context.componentExamples, block.componentExampleId)?.widget ??
  getBlockLayoutTemplate(block, context)?.widget;

const getComponentSlotExampleId = (slot: ReportBlueprintComponentSlot) =>
  slot.componentExampleId;

const getComponentSlotWidget = (slot: ReportBlueprintComponentSlot, context: ReportAssetResolutionContext) =>
  getAssetById(context.componentExamples, getComponentSlotExampleId(slot))?.widget ?? slot.widget;


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
      nextWidget.titlePills = slotFill.pills;
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

const applyComponentExampleSlotFills = (
  widget: RegisteredWidgetConfig,
  slotFills: ReportTemplateSlotFill[] = [],
) => applySlotFills(widget, slotFills.filter((slotFill) => slotFill.slotId === 'componentArea'));

const getBlockComponentPattern = (
  block: ReportBlueprintBlock,
  blockLayoutTemplate?: ReportTemplateBlockAsset,
) =>
  normalizeComponentRegionPattern(
    block.componentRegionPattern ??
    blockLayoutTemplate?.componentRegionPattern ??
    buildComponentRegionPatternFromSlots(block.componentSlots),
  );

const getBlockComponentSlotContracts = (
  block: ReportBlueprintBlock,
  blockLayoutTemplate?: ReportTemplateBlockAsset,
): ReportTemplateComponentSlotContract[] =>
  blockLayoutTemplate?.componentSlotContracts?.length
    ? blockLayoutTemplate.componentSlotContracts
    : buildComponentSlotContractsFromPattern(getBlockComponentPattern(block, blockLayoutTemplate));

const hasBlockComponentComposition = (
  block: ReportBlueprintBlock,
  blockLayoutTemplate?: ReportTemplateBlockAsset,
) =>
  Boolean(
    block.componentSlots?.length ||
    block.componentRegionPattern ||
    blockLayoutTemplate?.componentRegionPattern ||
    blockLayoutTemplate?.componentSlotContracts?.length,
  );

const createLayoutHostWidget = (
  block: ReportBlueprintBlock,
  blockLayoutTemplate: ReportTemplateBlockAsset | undefined,
  cols: number,
  rows: number,
): RegisteredWidgetConfig => ({
  type: 'BaseLayoutSpan',
  visualType: 'other',
  dataPolicy: 'static',
  displayTitle: block.id,
  props: {
    cols,
    rows,
    title: block.id,
    placeholder: '3 组件区',
    showChrome: false,
    showFooter: false,
    componentRegionPattern: getBlockComponentPattern(block, blockLayoutTemplate),
    componentSlotContracts: getBlockComponentSlotContracts(block, blockLayoutTemplate),
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
      widget: widget ? applyComponentExampleSlotFills(widget, slot.slotFills) : undefined,
    };
  });

const applyBlockComposition = (
  widget: RegisteredWidgetConfig,
  block: ReportBlueprintBlock,
  context: ReportAssetResolutionContext,
) => {
  const nextWidget = applySlotFills(widget, block.slotFills);
  const blockLayoutTemplate = getBlockLayoutTemplate(block, context);
  const hasComponentComposition = hasBlockComponentComposition(block, blockLayoutTemplate);
  const componentRegionPattern = hasComponentComposition ? getBlockComponentPattern(block, blockLayoutTemplate) : undefined;
  const componentSlotContracts = hasComponentComposition ? getBlockComponentSlotContracts(block, blockLayoutTemplate) : [];
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
    const blockLayoutTemplate = getBlockLayoutTemplate(block, context);
    const hasComponentComposition = hasBlockComponentComposition(block, blockLayoutTemplate);
    const widget = getBlockWidget(block, context) ??
      (!hasComponentComposition && block.componentSlots?.length === 1 ? getComponentSlotWidget(block.componentSlots[0], context) : undefined) ??
      (hasComponentComposition
        ? createLayoutHostWidget(block, blockLayoutTemplate, cols, rows)
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
