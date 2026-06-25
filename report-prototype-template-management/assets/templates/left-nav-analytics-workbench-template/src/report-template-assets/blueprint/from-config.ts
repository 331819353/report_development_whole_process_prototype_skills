import type { DashboardConfig } from '../../types/dashboard';
import type { RegisteredWidgetConfig, WidgetAuxMetric } from '../../widgets/types';
import type { ReportTemplateNav, ReportTemplatePageConfig } from '../types';
import { buildLayoutBlocks, normalizeLayoutRows } from '../utils/layout-grid';
import type { ReportBlueprint, ReportBlueprintBlock, ReportTemplateSlotFill } from './types';

type DashboardConfigWithRuntimePages = DashboardConfig & {
  nav?: ReportTemplateNav[];
  page?: ReportTemplatePageConfig;
  pages?: Record<string, ReportTemplatePageConfig>;
  screen: DashboardConfig['screen'] & {
    topbarNav?: Array<{ id: string; label: string }>;
    defaultTopbarNavId?: string;
  };
};

interface CreateBlueprintOptions {
  frameworkId: string;
  pageLayoutId: string;
  blueprintId?: string;
  description?: string;
}

const cloneValue = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const getTemplateNavsFromConfig = (config: DashboardConfigWithRuntimePages): ReportTemplateNav[] => {
  if (Array.isArray(config.nav)) {
    return config.nav;
  }

  const topbarNav = config.screen.topbarNav;

  if (topbarNav?.length) {
    return topbarNav.map((item) => {
      const page = config.pages?.[item.id] ?? config.page;

      return {
        id: item.id,
        label: item.label,
        layoutRows: page?.layoutRows ?? [],
        widgets: page?.widgets,
      };
    });
  }

  return [
    {
      id: config.screen.defaultTopbarNavId ?? 'single-page',
      label: config.screen.title,
      layoutRows: config.page?.layoutRows ?? [],
      widgets: config.page?.widgets,
    },
  ];
};

const splitAuxMetrics = (metrics?: WidgetAuxMetric[]) => {
  const unitMetric = [...(metrics ?? [])].reverse().find((metric) => metric.label === '单位');
  const nonUnitMetrics = (metrics ?? []).filter((metric) => metric.label !== '单位');

  return { unitMetric, nonUnitMetrics };
};

const buildSlotFillsFromWidget = (widget?: RegisteredWidgetConfig): ReportTemplateSlotFill[] => {
  if (!widget) {
    return [];
  }

  const slotFills: ReportTemplateSlotFill[] = [];
  const { unitMetric, nonUnitMetrics } = splitAuxMetrics(widget.auxMetrics);

  if (widget.displayTitle || widget.title) {
    slotFills.push({ slotId: 'titleArea', text: widget.displayTitle ?? widget.title });
  }

  if (widget.titlePills?.length) {
    slotFills.push({ slotId: 'pillArea', pills: widget.titlePills });
  }

  if (nonUnitMetrics.length) {
    slotFills.push({ slotId: 'auxMetricArea', metrics: nonUnitMetrics });
  }

  if (unitMetric) {
    slotFills.push({ slotId: 'unitArea', unit: unitMetric });
  }

  if (widget.bodySummary) {
    slotFills.push({ slotId: 'summaryArea', text: widget.bodySummary });
  }

  return slotFills;
};

const buildBlueprintBlocks = (nav: ReportTemplateNav): ReportBlueprintBlock[] =>
  buildLayoutBlocks(normalizeLayoutRows(nav.layoutRows)).map((block) => {
    const widget = nav.widgets?.[block.label];
    const slotFills = buildSlotFillsFromWidget(widget);
    const dataBinding = widget?.data
      ? {
          mode: 'dataset' as const,
          sourceId: widget.data.id,
          filterFields: widget.data.filterFields ? Object.keys(widget.data.filterFields) : undefined,
        }
      : {
          mode: widget?.dataPolicy === 'external' ? 'external' as const : 'static' as const,
        };

    return {
      id: block.label,
      widget: widget ? cloneValue(widget) : undefined,
      slotFills,
      dataBinding,
    };
  });

export const createBlueprintFromDashboardConfig = (
  config: DashboardConfig,
  options: CreateBlueprintOptions,
): ReportBlueprint => {
  const runtimeConfig = config as DashboardConfigWithRuntimePages;
  const pages = getTemplateNavsFromConfig(runtimeConfig).map((nav) => ({
    id: nav.id,
    label: nav.label,
    icon: nav.icon,
    layoutRows: nav.layoutRows,
    blocks: buildBlueprintBlocks(nav),
  }));

  return {
    id: options.blueprintId ?? `${options.frameworkId}-current-config`,
    title: config.screen.title,
    description: options.description ?? 'Blueprint generated from the current dashboard configuration.',
    frameworkId: options.frameworkId,
    pageLayoutId: options.pageLayoutId,
    status: 'draft',
    pages,
    filters: cloneValue(config.filters),
  };
};
