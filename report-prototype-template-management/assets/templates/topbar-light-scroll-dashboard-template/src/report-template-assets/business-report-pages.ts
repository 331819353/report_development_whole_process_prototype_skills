import type { DashboardPageConfig } from '../types/dashboard';
import type { DashboardDataSourceRef } from '../types/data-source';
import type {
  RegisteredWidgetConfig,
  WidgetDataBindingConfig,
  WidgetMap,
  WidgetTitlePillOption,
  WidgetVisualType,
} from '../widgets/types';
import type { LayoutSpanTemplateProps } from '../widgets/templates/block-spans/types';
import type { ReportTemplateNav } from './types';

const componentExampleId = (id: string) => `component-example-catalog:${id}`;
type ProjectReportComponentSlot = NonNullable<LayoutSpanTemplateProps['componentSlots']>[number];

type SlotRole = 'primary' | 'secondary' | 'supporting' | 'reference';

interface ProjectReportSlot {
  id: string;
  label: string;
  regionKey: string;
  role: SlotRole;
  widthUnits: number;
  componentExampleId: string;
  widget: RegisteredWidgetConfig;
}

interface ProjectReportBlockOptions {
  title: string;
  note: string;
  bodySummary?: string;
  showSummary?: boolean;
  summaryHiddenReason?: string;
  titlePills?: WidgetTitlePillOption[];
  componentRegionPattern: string;
  slots: ProjectReportSlot[];
}

interface ComponentWidgetOptions {
  data?: DashboardDataSourceRef;
  dataBinding?: WidgetDataBindingConfig;
  dataPolicy?: RegisteredWidgetConfig['dataPolicy'];
}

type ComponentExampleRuntimeConfig = Record<string, Record<string, unknown>>;

const apiEmptyFilterValues = ['', '__all', 'all'];
const componentPropsDataSource = (key: string): DashboardDataSourceRef => ({
  id: 'apiData',
  api: {
    url: `/api/component-props/${encodeURIComponent(key)}`,
    method: 'GET',
    responsePath: 'data.rows',
    adapter: 'rows',
    query: {
      period: '$filters.period',
      region: '$filters.region',
      project: '$filters.project',
      channel: '$filters.channel',
      metric: '$context.activeTitlePill.params.metric',
      activeTitlePillId: '$context.activeTitlePillId',
      activeTitlePillLabel: '$context.activeTitlePillLabel',
    },
    emptyFilterValues: apiEmptyFilterValues,
  },
  filterFields: {
    period: 'period',
    region: 'region',
    project: 'project',
    channel: 'channel',
    metric: 'metric',
  },
  emptyFilterValues: apiEmptyFilterValues,
});
const componentPropsBinding: WidgetDataBindingConfig = {
  mode: 'custom-props',
  propsObjectField: 'props',
};

const componentTitleBaseConfig = {} as const;

const chartSlotDisplayConfig: ComponentExampleRuntimeConfig = {
  title: {
    ...componentTitleBaseConfig,
  },
  layout: {
    paddingPx: 0,
    gapPx: 0,
    contentGapPx: 0,
    orientation: 'auto',
  },
  chart: {
    legendVisible: false,
    legendPosition: 'hidden',
    axisVisible: true,
    axisNameVisible: true,
    splitLineVisible: true,
    labelVisible: false,
    labelLineVisible: false,
    gridTopPx: 4,
    gridBottomPx: 14,
    gridLeftPx: 0,
    gridRightPx: 4,
    radiusPercent: 68,
    outerRadiusPercent: 74,
  },
};

const metricSlotDisplayConfig: ComponentExampleRuntimeConfig = {
  title: {
    ...componentTitleBaseConfig,
  },
  layout: {
    valueRatio: 3,
    accessoryRatio: 1,
    gapPx: 1,
    paddingPx: 2,
  },
  value: {
    maxFontSizePx: 42,
    heightScale: 0.45,
  },
  accessory: {
    maxItems: 1,
    rowMinHeightPx: 20,
    columns: 1,
  },
};

const targetSlotDisplayConfig: ComponentExampleRuntimeConfig = {
  title: {
    ...componentTitleBaseConfig,
  },
  layout: {
    bodyRatio: 6,
    topRatio: 3,
    progressRatio: 1,
    valueRatio: 1,
    detailRatio: 0.8,
    gapPx: 1,
    paddingPx: 2,
  },
  value: {
    maxFontSizePx: 54,
  },
  detail: {
    iconSizePx: 18,
    iconGraphicSizePx: 12,
    labelFontSizePx: 10,
    valueFontSizePx: 11,
  },
  progress: {
    labelVisible: false,
    heightPx: 10,
  },
};

const tableSlotDisplayConfig: ComponentExampleRuntimeConfig = {
  title: {
    ...componentTitleBaseConfig,
  },
  layout: {
    paddingPx: 0,
    gapPx: 2,
    toolbarHeightPx: 22,
    footerHeightPx: 32,
    minSheetHeightPx: 140,
  },
  table: {
    pageSize: 4,
    rowHeightPx: 26,
    headerHeightPx: 28,
    maxVisibleColumns: 8,
  },
};

const defaultBusinessComponentConfigByType: Partial<Record<RegisteredWidgetConfig['type'], ComponentExampleRuntimeConfig>> = {
  KpiMetricExampleCard: metricSlotDisplayConfig,
  TargetProgressExampleCard: targetSlotDisplayConfig,
  LineChartExampleCard: chartSlotDisplayConfig,
  BarChartExampleCard: chartSlotDisplayConfig,
  ComboChartExampleCard: chartSlotDisplayConfig,
  HeatmapChartExampleCard: chartSlotDisplayConfig,
  ProportionChartExampleCard: chartSlotDisplayConfig,
  QuadrantChartExampleCard: chartSlotDisplayConfig,
  RadarChartExampleCard: chartSlotDisplayConfig,
  RoundedFunnelChartExampleCard: chartSlotDisplayConfig,
  CustomEChartComponentTemplate: chartSlotDisplayConfig,
  DetailTableExampleCard: tableSlotDisplayConfig,
  ComplexTableExampleCard: tableSlotDisplayConfig,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value));

const mergeRuntimeConfig = (...configs: unknown[]): ComponentExampleRuntimeConfig => {
  const result: ComponentExampleRuntimeConfig = {};

  configs.forEach((config) => {
    if (!isRecord(config)) {
      return;
    }

    Object.entries(config).forEach(([section, sectionConfig]) => {
      if (isRecord(sectionConfig)) {
        result[section] = {
          ...(result[section] ?? {}),
          ...sectionConfig,
        };
      }
    });
  });

  return result;
};

const getSlotTitleConfig = (slotCount: number) => ({
  ...componentTitleBaseConfig,
  visible: slotCount > 1,
});

const applySlotAutoFitConfig = (
  widget: RegisteredWidgetConfig,
  slotCount: number,
): RegisteredWidgetConfig => {
  const props = (widget.props ?? {}) as Record<string, unknown>;

  return {
    ...widget,
    props: {
      ...props,
      config: mergeRuntimeConfig(
        props.config,
        {
          title: getSlotTitleConfig(slotCount),
        },
      ),
      showContentTitle: slotCount > 1,
    },
  } as RegisteredWidgetConfig;
};

const defaultBusinessTitlePills: WidgetTitlePillOption[] = [
  {
    id: 'current',
    label: '本期',
    params: {
      metric: 'current',
      perspective: 'periodActual',
    },
  },
  {
    id: 'target',
    label: '目标',
    params: {
      metric: 'target',
      perspective: 'targetGap',
    },
  },
  {
    id: 'risk',
    label: '风险',
    params: {
      metric: 'risk',
      perspective: 'riskAction',
    },
  },
];

const componentWidget = (
  type: RegisteredWidgetConfig['type'],
  visualType: WidgetVisualType,
  title: string,
  _props: Record<string, unknown>,
  options: ComponentWidgetOptions = {},
): RegisteredWidgetConfig => {
  const data = options.data;
  const config = mergeRuntimeConfig(defaultBusinessComponentConfigByType[type], _props.config);

  return ({
    type,
    visualType,
    dataPolicy: data ? 'external' : options.dataPolicy ?? 'static',
    displayTitle: title,
    data,
    dataBinding: options.dataBinding ?? componentPropsBinding,
    props: {
      title,
      ...(Object.keys(config).length ? { config } : {}),
    },
  }) as RegisteredWidgetConfig;
};

const slot = (
  id: string,
  label: string,
  exampleId: string,
  widget: RegisteredWidgetConfig,
  widthUnits = 1,
  role: SlotRole = 'supporting',
): ProjectReportSlot => ({
  id,
  label,
  regionKey: id,
  role,
  widthUnits,
  componentExampleId: componentExampleId(exampleId),
  widget,
});

const createSlotContracts = (slots: ProjectReportSlot[]): LayoutSpanTemplateProps['componentSlotContracts'] =>
  slots.map((item, index) => ({
    id: item.id,
    label: `${item.id} ${item.label}`,
    regionKey: item.regionKey,
    role: item.role,
    order: index + 1,
    widthUnits: item.widthUnits,
    heightUnits: 3,
    minSize: `${item.widthUnits}x3`,
    required: true,
  }));

const createComponentSlots = (slots: ProjectReportSlot[]): ProjectReportComponentSlot[] =>
  slots.map((item) => {
    const widget = applySlotAutoFitConfig(item.widget, slots.length);

    return ({
    id: item.id,
    label: item.label,
    regionKey: item.regionKey,
    role: item.role,
    componentExampleId: item.componentExampleId,
    dataPolicy: widget.dataPolicy,
    data: widget.data,
    dataBinding: widget.dataBinding,
    filterScope: widget.filterScope,
    actions: widget.actions,
    widget,
    props: widget.props as Record<string, unknown>,
  });
  });

const getDefaultSlotInteraction = (slot: ProjectReportComponentSlot) => {
  if (slot.role === 'secondary') {
    return {
      interactionType: 'modal' as const,
      targetType: 'modal' as const,
      title: '经营对比弹窗',
    };
  }

  if (slot.role === 'supporting') {
    return {
      interactionType: 'popup' as const,
      targetType: 'popover' as const,
      title: '经营辅助弹层',
    };
  }

  return {
    interactionType: 'drilldown' as const,
    targetType: 'drawer' as const,
    title: slot.role === 'reference' ? '经营明细下钻' : '经营指标下钻',
  };
};

export const createBlockAreaConfig = ({
  title,
  note,
  bodySummary,
  showSummary = true,
  summaryHiddenReason,
  titlePills,
  componentRegionPattern,
  slots,
}: ProjectReportBlockOptions): RegisteredWidgetConfig =>
  {
    const hasConclusionCardSlot = slots.some((slot) => slot.componentExampleId === componentExampleId('conclusion-card'));
    const shouldShowSummary = showSummary !== false && !hasConclusionCardSlot;
    const resolvedSummaryHiddenReason = summaryHiddenReason ?? (hasConclusionCardSlot ? 'Conclusion card owns conclusion evidence and actions; block summary is hidden to avoid duplicate explanation.' : undefined);
    const resolvedBodySummary = shouldShowSummary ? bodySummary ?? note : undefined;

    return ({
    type: 'BaseLayoutSpan',
    visualType: 'other',
    dataPolicy: 'static',
    displayTitle: title,
    titlePills: titlePills ?? defaultBusinessTitlePills,
    bodySummary: resolvedBodySummary,
    summaryHiddenReason: resolvedSummaryHiddenReason,
    props: {
      title,
      note,
      summaryHiddenReason: resolvedSummaryHiddenReason,
      showChrome: false,
      showFooter: false,
      density: 'auto',
      placeholder: '经营分析组件槽位',
      componentRegionPattern,
      autoComponentSlots: true,
      componentAreaPaddingPx: 2,
      componentSlotGapPx: 10,
      componentSlotContracts: createSlotContracts(slots),
      componentSlots: createComponentSlots(slots),
      showSummary: shouldShowSummary && Boolean(resolvedBodySummary),
    },
  }) as RegisteredWidgetConfig;
  };

const createSlotDefaultActions = (
  pageId: string,
  blockId: string,
  slot: ProjectReportComponentSlot,
  componentDataKey: string,
): NonNullable<RegisteredWidgetConfig['actions']> => {
  const interaction = getDefaultSlotInteraction(slot);
  const slotRole = slot.role ?? 'supporting';

  return {
    slotClick: {
      type: 'dashboardAction',
      interactionId: `${componentDataKey}.slotClick`,
      interactionType: interaction.interactionType,
      triggerOwner: 'templateActionHook',
      targetType: interaction.targetType,
      sourcePageId: pageId,
      sourceBlockId: blockId,
      sourceSlotId: slot.id,
      sourceComponentExampleId: slot.componentExampleId,
      target: `/api/component-props/${componentDataKey}`,
      query: {
        componentDataKey,
        pageId,
        blockId,
        slotId: slot.id,
        slotRole,
        period: '$filters.period',
        region: '$filters.region',
        project: '$filters.project',
        channel: '$filters.channel',
        activeTitlePillId: '$context.activeTitlePillId',
        activeTitlePillLabel: '$context.activeTitlePillLabel',
      },
      params: {
        componentDataKey,
        sourceSlotLabel: '$context.sourceSlotLabel',
        sourceSlotRole: slotRole,
        activeTitlePillId: '$context.activeTitlePillId',
      },
      meta: {
        title: interaction.title,
        source: 'component-slot-default-action',
      },
    },
  };
};

const bindComponentSlotDataSources = <T extends Record<string, WidgetMap>>(pageWidgets: T): T =>
  Object.fromEntries(
    Object.entries(pageWidgets).map(([pageId, widgets]) => [
      pageId,
      Object.fromEntries(
        Object.entries(widgets).map(([blockId, widget]) => {
          if (!widget) {
            return [blockId, widget];
          }

          const widgetProps = (widget.props ?? {}) as LayoutSpanTemplateProps & Record<string, unknown>;
          const componentSlots = widgetProps.componentSlots?.map((slotItem) => {
            const componentDataKey = `${pageId}.${blockId}.${slotItem.id}`;
            const data = componentPropsDataSource(componentDataKey);
            const actions = {
              ...createSlotDefaultActions(pageId, blockId, slotItem, componentDataKey),
              ...(slotItem.widget?.actions ?? {}),
              ...(slotItem.actions ?? {}),
            };
            const slotWidget = {
              ...(slotItem.widget ?? {}),
              dataPolicy: 'external',
              data,
              dataBinding: slotItem.widget?.dataBinding ?? componentPropsBinding,
              actions,
              props: {
                ...((slotItem.widget?.props ?? {}) as Record<string, unknown>),
                title: ((slotItem.widget?.props ?? {}) as Record<string, unknown>).title ?? slotItem.label,
                componentDataKey,
              },
            } as RegisteredWidgetConfig;

            return {
              ...slotItem,
              dataPolicy: 'external' as const,
              data,
              dataBinding: componentPropsBinding,
              actions,
              widget: slotWidget,
              props: slotWidget.props as Record<string, unknown>,
            };
          });

          return [
            blockId,
            {
              ...widget,
              props: {
                ...widgetProps,
                componentSlots,
              },
            },
          ];
        }),
      ),
    ]),
  ) as T;

const projectBlock = createBlockAreaConfig;

const projectLayoutRows = [
  'AAAABBBBCCCC',
  'AAAABBBBCCCC',
  'DDDDEEEEFFFF',
  'DDDDEEEEFFFF',
  'DDDDEEEEFFFF',
  'GGGGHHHHIIII',
  'GGGGHHHHIIII',
  'GGGGHHHHIIII',
  'GGGGHHHHIIII',
];

const kpi = (
  title: string,
  value: number | string,
  unit: string,
  tone: 'primary' | 'success' | 'warning' | 'danger' | 'neutral',
  accessoryMetrics: Array<{ label: string; value: string; tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'; icon?: 'trend' | 'target' | 'clock' }>,
  sparkValues: number[],
  options: ComponentWidgetOptions = {},
) =>
  componentWidget('KpiMetricExampleCard', 'metric-card', title, {
    value,
    unit,
    tone,
    accessoryMetrics,
    sparkValues,
  }, options);

const target = (
  title: string,
  value: number,
  targetValue: number,
  currentValue: number,
  gapValue: number,
  tone: 'primary' | 'success' | 'warning' | 'danger' | 'neutral',
) =>
  componentWidget('TargetProgressExampleCard', 'metric-card', title, {
    value,
    valueSuffix: '%',
    targetValue,
    currentValue,
    gapValue,
    tone,
    details: [
      { label: '年度目标', value: `${targetValue}%`, icon: 'target' },
      { label: '当前达成', value: `${currentValue}%`, icon: 'current' },
      { label: '缺口', value: `${gapValue}%`, icon: 'gap' },
    ],
  });

const line = (
  title: string,
  unit: string,
  categories: string[],
  series: Array<{ name: string; values: number[]; smooth?: boolean; areaVisible?: boolean }>,
  auxMetrics: Array<{ label: string; value: string | number; tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' }> = [],
  options: ComponentWidgetOptions = {},
) =>
  componentWidget('LineChartExampleCard', 'line', title, {
    unit,
    categories,
    series,
    auxMetrics,
  }, options);

const combo = (
  title: string,
  categories: string[],
  series: Array<{ name: string; type: 'bar' | 'line'; values: number[] }>,
  auxMetrics: Array<{ label: string; value: string | number; tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' }> = [],
) =>
  componentWidget('ComboChartExampleCard', 'combo', title, {
    categories,
    series,
    auxMetrics,
  });

const bar = (title: string, categories: string[], values: number[], unit: string) =>
  componentWidget('BarChartExampleCard', 'bar', title, { categories, values, unit });

const proportion = (title: string, items: Array<{ name: string; value: number }>) =>
  componentWidget('ProportionChartExampleCard', 'pie', title, { items });

const ranking = (
  title: string,
  items: Array<{ name: string; value: number; delta?: string }>,
  valueUnit: string,
) => componentWidget('RankingListExampleCard', 'ranking-list', title, { items, valueUnit });

const heatmap = (
  title: string,
  rows: string[],
  columns: string[],
  cells: number[][],
) => componentWidget('HeatmapChartExampleCard', 'heatmap', title, { rows, columns, cells });

const radar = (title: string, indicators: string[], values: number[]) =>
  componentWidget('RadarChartExampleCard', 'radar', title, { indicators, values });

const quadrant = (
  title: string,
  points: Array<{ name: string; x: number; y: number; value?: number }>,
) =>
  componentWidget('QuadrantChartExampleCard', 'scatter', title, {
    xAxisName: '增长率',
    yAxisName: '毛利率',
    points,
  });

const funnel = (title: string, stages: Array<{ name: string; value: number }>) =>
  componentWidget('RoundedFunnelChartExampleCard', 'funnel', title, { stages });

const conclusion = (
  title: string,
  text: string,
  emphasis: string,
  statusTone: 'primary' | 'success' | 'warning' | 'danger' | 'neutral',
  evidenceItems: Array<{ label: string; value: string; tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' }>,
  actionItems: Array<{ label: string; value: string; tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' }>,
) =>
  componentWidget('ConclusionExampleCard', 'text-summary', title, {
    conclusion: text,
    emphasis,
    statusLabel: '经营判断',
    statusTone,
    evidenceItems,
    actionItems,
  });

const actions = (
  title: string,
  items: Array<{ label: string; status: string; owner: string; due: string; tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'; done?: boolean }>,
) => componentWidget('ActionListExampleCard', 'action-recommendation-card', title, { items });

const detailTable = (
  title: string,
  rows: Record<string, unknown>[],
  columns: Array<Record<string, unknown>>,
  options: ComponentWidgetOptions = {},
) =>
  componentWidget('DetailTableExampleCard', 'table', title, {
    rowKey: 'id',
    rows,
    columns,
    auxMetrics: [
      { label: '明细行数', value: rows.length, tone: 'primary' },
      { label: '可下钻', value: '项目/区域', tone: 'success' },
    ],
  }, options);

const apiKpi = (
  metric: 'revenue' | 'completion' | 'profit' | 'risk',
  title: string,
  value: number | string,
  unit: string,
  tone: 'primary' | 'success' | 'warning' | 'danger' | 'neutral',
  accessoryMetrics: Array<{ label: string; value: string; tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'; icon?: 'trend' | 'target' | 'clock' }>,
  sparkValues: number[],
) =>
  kpi(title, value, unit, tone, accessoryMetrics, sparkValues);

const apiRevenueLine = (
  title: string,
  unit: string,
  categories: string[],
  series: Array<{ name: string; values: number[]; smooth?: boolean; areaVisible?: boolean }>,
  auxMetrics: Array<{ label: string; value: string | number; tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' }> = [],
) =>
  line(title, unit, categories, series, auxMetrics);

const apiRevenueDetailTable = (
  title: string,
  rows: Record<string, unknown>[],
  columns: Array<Record<string, unknown>>,
) =>
  detailTable(title, rows, columns);

const complexTable = (
  title: string,
  rows: Record<string, unknown>[],
  columnTree: Array<Record<string, unknown>>,
) =>
  componentWidget('ComplexTableExampleCard', 'table', title, {
    rowKey: 'id',
    rows,
    columnTree,
    auxMetrics: [
      { label: '分组表头', value: '经营表现/风险/动作', tone: 'primary' },
      { label: '数据粒度', value: '区域-渠道', tone: 'neutral' },
    ],
  });

const customEChart = (title: string) =>
  componentWidget('CustomEChartComponentTemplate', 'other', title, {
    categories: ['立项', '签约', '交付', '验收', '回款'],
    values: [42, 36, 31, 26, 21],
    auxMetrics: [
      { label: '当前阶段', value: '交付推进' },
      { label: '阻塞节点', value: '验收材料' },
    ],
  });

const projectRows = [
  { id: 'P-001', project: '智慧家庭套购增长', region: '华东', owner: '王晶', revenue: 3860, margin: 29.6, progress: '96%', risk: '低', action: '放大复购投放' },
  { id: 'P-002', project: '门店焕新转化', region: '华南', owner: '陈卓', revenue: 2480, margin: 22.4, progress: '84%', risk: '中', action: '优化样机结构' },
  { id: 'P-003', project: '工程客户交付', region: '华北', owner: '赵岩', revenue: 1960, margin: 18.8, progress: '77%', risk: '高', action: '锁定回款节点' },
  { id: 'P-004', project: '海外直营提效', region: '海外', owner: '林可', revenue: 3120, margin: 27.3, progress: '91%', risk: '中', action: '补齐交付资源' },
];

const detailColumns = [
  { key: 'project', label: '项目', width: 150, align: 'left', fixed: 'left', formatter: 'text', priority: 1 },
  { key: 'region', label: '区域', width: 72, align: 'center', formatter: 'text', priority: 1 },
  { key: 'owner', label: '负责人', width: 80, align: 'center', formatter: 'text', priority: 2 },
  { key: 'revenue', label: '收入', width: 86, align: 'right', formatter: 'currency', unit: '万', priority: 1 },
  { key: 'margin', label: '毛利率', width: 78, align: 'right', formatter: 'percent', unit: '%', priority: 1 },
  { key: 'progress', label: '进度', width: 72, align: 'center', formatter: 'text', priority: 2 },
  { key: 'risk', label: '风险', width: 70, align: 'center', formatter: 'status', priority: 1 },
  { key: 'action', label: '下一步动作', width: 150, align: 'left', formatter: 'text', priority: 1 },
];

const apiRevenueDetailColumns = [
  { key: 'customerName', label: '对象', width: 170, align: 'left', fixed: 'left', formatter: 'text', priority: 1 },
  { key: 'regionName', label: '区域', width: 88, align: 'center', formatter: 'text', priority: 1 },
  { key: 'channelName', label: '渠道', width: 96, align: 'center', formatter: 'text', priority: 1 },
  { key: 'amount', label: '收入', width: 86, align: 'right', formatter: 'currency', unit: '万', priority: 1 },
  { key: 'target', label: '目标', width: 86, align: 'right', formatter: 'currency', unit: '万', priority: 2 },
  { key: 'completion', label: '达成率', width: 84, align: 'right', formatter: 'percent', unit: '%', priority: 1 },
  { key: 'owner', label: '责任组', width: 104, align: 'center', formatter: 'text', priority: 2 },
  { key: 'status', label: '状态', width: 76, align: 'center', formatter: 'status', priority: 1 },
];

const operatingRows = [
  { id: 'R-001', region: '华东', channel: '线上直营', revenue: 3860, revenueYoY: 14.8, grossMargin: 29.6, fulfillmentRate: 97.8, stockRisk: '低', overdueAmount: 186, status: '健康', owner: '王晶', nextAction: '加大高复购会员投放' },
  { id: 'R-002', region: '华南', channel: '门店零售', revenue: 2480, revenueYoY: 6.2, grossMargin: 22.4, fulfillmentRate: 92.1, stockRisk: '中', overdueAmount: 312, status: '关注', owner: '陈卓', nextAction: '压降低效样机库存' },
  { id: 'R-003', region: '华北', channel: '工程客户', revenue: 1960, revenueYoY: -3.4, grossMargin: 18.8, fulfillmentRate: 88.6, stockRisk: '高', overdueAmount: 468, status: '预警', owner: '赵岩', nextAction: '周内确认回款计划' },
  { id: 'R-004', region: '海外', channel: '直营网点', revenue: 3120, revenueYoY: 11.5, grossMargin: 27.3, fulfillmentRate: 94.5, stockRisk: '中', overdueAmount: 224, status: '关注', owner: '林可', nextAction: '补齐交付安装资源' },
];

const operatingColumnTree = [
  { key: 'region', label: '区域', field: 'region', width: 70, fixed: 'left', align: 'center', formatter: 'text', locked: true },
  { key: 'channel', label: '渠道', field: 'channel', width: 96, fixed: 'left', align: 'left', formatter: 'text', locked: true },
  {
    key: 'performance',
    label: '经营表现',
    children: [
      { key: 'revenue', label: '收入', field: 'revenue', width: 86, align: 'right', formatter: 'currency', unit: '万', sortable: true },
      { key: 'revenueYoY', label: '同比', field: 'revenueYoY', width: 72, align: 'right', formatter: 'percent', unit: '%', sortable: true },
      { key: 'grossMargin', label: '毛利率', field: 'grossMargin', width: 78, align: 'right', formatter: 'percent', unit: '%', sortable: true },
    ],
  },
  {
    key: 'delivery',
    label: '履约质量',
    children: [
      { key: 'fulfillmentRate', label: '履约率', field: 'fulfillmentRate', width: 78, align: 'right', formatter: 'percent', unit: '%' },
      { key: 'stockRisk', label: '库存风险', field: 'stockRisk', width: 82, align: 'center', formatter: 'status' },
    ],
  },
  {
    key: 'risk',
    label: '风险闭环',
    children: [
      { key: 'overdueAmount', label: '逾期回款', field: 'overdueAmount', width: 90, align: 'right', formatter: 'currency', unit: '万' },
      { key: 'status', label: '状态', field: 'status', width: 76, align: 'center', formatter: 'status' },
      { key: 'owner', label: '负责人', field: 'owner', width: 76, align: 'center', formatter: 'text' },
      { key: 'nextAction', label: '下一步', field: 'nextAction', minWidth: 140, align: 'left', formatter: 'text', ellipsis: true },
    ],
  },
];

const overviewWidgets: WidgetMap = {
  A: projectBlock({
    title: '核心经营指标',
    note: '收入、利润与现金流三项指标共同判断项目经营健康度。',
    componentRegionPattern: 'ABC',
    slots: [
      slot('A', '项目收入', 'kpi-metric-card', apiKpi('revenue', '项目收入', 12860, '万', 'primary', [{ label: '同比', value: '+12.6%', tone: 'success', icon: 'trend' }], [82, 96, 104, 116, 122, 129]), 1, 'primary'),
      slot('B', '经营利润', 'kpi-metric-card', kpi('经营利润', 2460, '万', 'success', [{ label: '利润率', value: '19.1%', tone: 'primary', icon: 'target' }], [16, 18, 20, 21, 23, 25]), 1, 'secondary'),
      slot('C', '经营现金流', 'kpi-metric-card', kpi('经营现金流', 3180, '万', 'warning', [{ label: '回款达成', value: '88.4%', tone: 'warning', icon: 'clock' }], [21, 26, 24, 28, 31, 32]), 1, 'supporting'),
    ],
  }),
  B: projectBlock({
    title: '年度目标达成',
    note: '以收入目标为主线，识别当前差距与达成压力。',
    componentRegionPattern: 'A',
    slots: [slot('A', '收入达成率', 'target-progress-card', target('收入达成率', 92.4, 100, 92.4, 7.6, 'primary'), 1, 'primary')],
  }),
  C: projectBlock({
    title: '经营结论',
    note: '把本期结论、证据和动作放在首屏可读位置。',
    componentRegionPattern: 'A',
    slots: [
      slot('A', '本期判断', 'conclusion-card', conclusion('本期判断', '项目收入保持增长，但华北工程客户拖累利润与现金流。', '增长质量分化', 'warning', [
        { label: '收入同比', value: '+12.6%', tone: 'success' },
        { label: '华北毛利率', value: '18.8%', tone: 'warning' },
      ], [
        { label: '优先动作', value: '锁定华北回款与交付节点', tone: 'warning' },
      ]), 1, 'primary'),
    ],
  }),
  D: projectBlock({
    title: '收入趋势',
    note: '跟踪月度收入、目标线和增长拐点。',
    componentRegionPattern: 'A',
    slots: [slot('A', '月度收入趋势', 'line-chart-card', apiRevenueLine('月度收入趋势', '万元', ['1月', '2月', '3月', '4月', '5月', '6月'], [{ name: '实际收入', values: [8600, 9400, 10100, 11200, 11900, 12860], smooth: true, areaVisible: true }, { name: '目标收入', values: [9000, 9600, 10400, 11100, 12000, 13200], smooth: true }], [{ label: '6月收入', value: '12860万', tone: 'primary' }]), 1, 'primary')],
  }),
  E: projectBlock({
    title: '收入与毛利联动',
    note: '收入增长需要同步验证毛利率是否被折扣、履约成本侵蚀。',
    componentRegionPattern: 'A',
    slots: [slot('A', '收入毛利组合', 'combo-chart-card', combo('收入毛利组合', ['华东', '华南', '华北', '海外'], [{ name: '收入', type: 'bar', values: [3860, 2480, 1960, 3120] }, { name: '毛利率', type: 'line', values: [29.6, 22.4, 18.8, 27.3] }], [{ label: '平均毛利率', value: '24.8%', tone: 'primary' }]), 1, 'primary')],
  }),
  F: projectBlock({
    title: '区域贡献排行',
    note: '识别贡献主体和需要重点补强的区域。',
    componentRegionPattern: 'A',
    slots: [slot('A', '区域收入排行', 'ranking-list-card', ranking('区域收入排行', [{ name: '华东', value: 3860, delta: '+14.8%' }, { name: '海外', value: 3120, delta: '+11.5%' }, { name: '华南', value: 2480, delta: '+6.2%' }, { name: '华北', value: 1960, delta: '-3.4%' }], '万'), 1, 'secondary')],
  }),
  G: projectBlock({
    title: '收入结构',
    note: '查看渠道结构是否支撑利润目标。',
    componentRegionPattern: 'A|B',
    slots: [
      slot('A', '渠道占比', 'proportion-chart-card', proportion('渠道收入占比', [{ name: '线上直营', value: 42 }, { name: '门店零售', value: 28 }, { name: '工程客户', value: 18 }, { name: '海外直营', value: 12 }]), 1, 'primary'),
      slot('B', '经营健康度', 'radar-chart-card', radar('经营健康度', ['增长', '毛利', '履约', '回款', '库存'], [86, 78, 82, 72, 68]), 1, 'secondary'),
    ],
  }),
  H: projectBlock({
    title: '本周动作',
    note: '动作清单用于经营例会闭环。',
    componentRegionPattern: 'A',
    slots: [slot('A', '经营动作清单', 'action-list-card', actions('经营动作清单', [
      { label: '华北工程客户回款专项会', owner: '赵岩', due: '今日', status: '待处理', tone: 'danger' },
      { label: '华南门店样机结构复盘', owner: '陈卓', due: '明日', status: '推进中', tone: 'warning' },
      { label: '华东会员复购投放扩量', owner: '王晶', due: '本周', status: '推进中', tone: 'primary' },
      { label: '海外交付资源补齐', owner: '林可', due: '本周', status: '已排期', tone: 'success' },
    ]), 1, 'primary')],
  }),
  I: projectBlock({
    title: '项目明细',
    note: '保留项目级明细，支持会议追问。',
    componentRegionPattern: 'A',
    slots: [slot('A', '项目经营明细', 'detail-table-card', apiRevenueDetailTable('项目经营明细', projectRows, apiRevenueDetailColumns), 1, 'reference')],
  }),
};

const revenueWidgets: WidgetMap = {
  A: projectBlock({ title: '收入拆解', note: '按项目、区域、渠道拆解本期收入来源。', componentRegionPattern: 'AB', slots: [
    slot('A', '项目收入', 'kpi-metric-card', kpi('项目收入', 12860, '万', 'primary', [{ label: '同比', value: '+12.6%', tone: 'success' }], [88, 92, 108, 116, 124, 129]), 1, 'primary'),
    slot('B', '新增收入', 'kpi-metric-card', kpi('新增收入', 1760, '万', 'success', [{ label: '贡献', value: '13.7%', tone: 'primary' }], [8, 10, 11, 13, 16, 18]), 1, 'secondary'),
  ] }),
  B: projectBlock({ title: '目标缺口', note: '收入缺口定位到项目责任人与渠道动作。', componentRegionPattern: 'A', slots: [slot('A', '收入目标达成', 'target-progress-card', target('收入目标达成', 92.4, 100, 92.4, 7.6, 'warning'), 1, 'primary')] }),
  C: projectBlock({ title: '收入结论', note: '收入增长来自线上直营和海外直营，工程客户承压。', componentRegionPattern: 'A', slots: [slot('A', '收入结论', 'conclusion-card', conclusion('收入结论', '线上直营贡献最大，华北工程客户连续两月低于目标。', '结构增长成立', 'primary', [{ label: '线上直营占比', value: '42%', tone: 'success' }, { label: '工程客户缺口', value: '420万', tone: 'warning' }], [{ label: '动作', value: '工程客户逐单确认签收与回款', tone: 'warning' }]), 1, 'primary')] }),
  D: projectBlock({ title: '渠道趋势', note: '观察不同渠道的连续增长和波动。', componentRegionPattern: 'A', slots: [slot('A', '渠道收入趋势', 'line-chart-card', line('渠道收入趋势', '万元', ['1月', '2月', '3月', '4月', '5月', '6月'], [{ name: '线上直营', values: [3200, 3480, 3720, 4050, 4380, 4620], smooth: true, areaVisible: true }, { name: '门店零售', values: [2100, 2180, 2240, 2320, 2380, 2480], smooth: true }, { name: '工程客户', values: [1800, 1720, 1680, 1640, 1590, 1510], smooth: true }]), 1, 'primary')] }),
  E: projectBlock({ title: '品类收入', note: '品类结构用于识别增量来源和资源投向。', componentRegionPattern: 'A', slots: [slot('A', '品类收入', 'bar-chart-card', bar('品类收入', ['冰箱', '洗衣机', '空调', '厨电', '热水器'], [2860, 2410, 2180, 1960, 1450], '万元'), 1, 'secondary')] }),
  F: projectBlock({ title: '收入热力', note: '区域与渠道二维交叉定位高低贡献区。', componentRegionPattern: 'A', slots: [slot('A', '区域渠道热力', 'heatmap-chart-card', heatmap('区域渠道热力', ['华东', '华南', '华北', '海外'], ['线上', '门店', '工程'], [[92, 76, 58], [74, 68, 46], [58, 52, 31], [82, 44, 39]]), 1, 'supporting')] }),
  G: projectBlock({ title: '区域渠道占比', note: '结构占比与排行共同判断资源配置。', componentRegionPattern: 'A|B', slots: [
    slot('A', '区域占比', 'proportion-chart-card', proportion('区域收入占比', [{ name: '华东', value: 34 }, { name: '海外', value: 27 }, { name: '华南', value: 22 }, { name: '华北', value: 17 }]), 1, 'primary'),
    slot('B', '渠道排行', 'ranking-list-card', ranking('渠道排行', [{ name: '线上直营', value: 4620, delta: '+18.4%' }, { name: '海外直营', value: 3120, delta: '+11.5%' }, { name: '门店零售', value: 2480, delta: '+6.2%' }], '万'), 1, 'secondary'),
  ] }),
  H: projectBlock({ title: '收入动作', note: '收入动作按责任人推进。', componentRegionPattern: 'A', slots: [slot('A', '收入动作', 'action-list-card', actions('收入动作', [
    { label: '工程客户订单逐单复盘', owner: '赵岩', due: '今日', status: '待处理', tone: 'danger' },
    { label: '线上直营会员加购包上线', owner: '王晶', due: '本周', status: '推进中', tone: 'primary' },
    { label: '海外直营价格带复核', owner: '林可', due: '本周', status: '已排期', tone: 'success' },
  ]), 1, 'primary')] }),
  I: projectBlock({ title: '收入明细', note: '收入明细保留项目粒度和追踪字段。', componentRegionPattern: 'A', slots: [slot('A', '收入明细', 'detail-table-card', detailTable('收入明细', projectRows, detailColumns), 1, 'reference')] }),
};

const profitWidgets: WidgetMap = {
  A: projectBlock({ title: '利润指标', note: '利润页优先看毛利率、费用率和经营利润。', componentRegionPattern: 'ABC', slots: [
    slot('A', '毛利率', 'kpi-metric-card', kpi('毛利率', 24.8, '%', 'primary', [{ label: '环比', value: '+1.2pp', tone: 'success' }], [21, 22, 23, 24, 25, 25]), 1, 'primary'),
    slot('B', '费用率', 'kpi-metric-card', kpi('费用率', 11.6, '%', 'warning', [{ label: '预算差', value: '+0.8pp', tone: 'warning' }], [10, 11, 12, 12, 11, 12]), 1, 'secondary'),
    slot('C', '经营利润', 'kpi-metric-card', kpi('经营利润', 2460, '万', 'success', [{ label: '同比', value: '+9.4%', tone: 'success' }], [18, 19, 21, 22, 24, 25]), 1, 'supporting'),
  ] }),
  B: projectBlock({ title: '利润目标', note: '利润目标距离年度预算仍有 5.8pp 缺口。', componentRegionPattern: 'A', slots: [slot('A', '利润达成率', 'target-progress-card', target('利润达成率', 94.2, 100, 94.2, 5.8, 'primary'), 1, 'primary')] }),
  C: projectBlock({ title: '利润结论', note: '利润改善主要来自高毛利渠道占比提升。', componentRegionPattern: 'A', slots: [slot('A', '利润结论', 'conclusion-card', conclusion('利润结论', '毛利率改善，但费用率超预算，需要压降华南门店促销和华北交付返工。', '利润改善但费用承压', 'warning', [{ label: '毛利率', value: '24.8%', tone: 'success' }, { label: '费用率', value: '11.6%', tone: 'warning' }], [{ label: '动作', value: '费用专项复核到项目', tone: 'warning' }]), 1, 'primary')] }),
  D: projectBlock({ title: '利润趋势', note: '对比收入、利润和利润率走势。', componentRegionPattern: 'A', slots: [slot('A', '利润趋势', 'combo-chart-card', combo('利润趋势', ['1月', '2月', '3月', '4月', '5月', '6月'], [{ name: '经营利润', type: 'bar', values: [1680, 1810, 1960, 2110, 2280, 2460] }, { name: '利润率', type: 'line', values: [18.6, 18.9, 19.2, 19.4, 19.6, 19.1] }]), 1, 'primary')] }),
  E: projectBlock({ title: '成本结构', note: '成本拆分用于识别费用压降抓手。', componentRegionPattern: 'A', slots: [slot('A', '成本结构', 'proportion-chart-card', proportion('成本结构', [{ name: '采购成本', value: 56 }, { name: '履约成本', value: 18 }, { name: '促销费用', value: 14 }, { name: '售后费用', value: 12 }]), 1, 'secondary')] }),
  F: projectBlock({ title: '费用热力', note: '费用异常集中在华南门店和华北工程客户。', componentRegionPattern: 'A', slots: [slot('A', '费用热力', 'heatmap-chart-card', heatmap('费用热力', ['华东', '华南', '华北', '海外'], ['促销', '履约', '售后'], [[46, 38, 22], [78, 61, 44], [58, 82, 63], [42, 56, 35]]), 1, 'supporting')] }),
  G: projectBlock({ title: '项目利润象限', note: '用增长与毛利识别投资优先级。', componentRegionPattern: 'A', slots: [slot('A', '项目利润象限', 'quadrant-chart-card', quadrant('项目利润象限', [{ name: '智慧家庭套购', x: 82, y: 76, value: 38 }, { name: '门店焕新', x: 58, y: 54, value: 24 }, { name: '工程客户交付', x: 36, y: 42, value: 18 }, { name: '海外直营提效', x: 74, y: 68, value: 31 }]), 1, 'primary')] }),
  H: projectBlock({ title: '利润动作', note: '利润动作聚焦费用压降与低毛利项目治理。', componentRegionPattern: 'A', slots: [slot('A', '利润动作', 'action-list-card', actions('利润动作', [
    { label: '华南门店促销费用复核', owner: '财务BP', due: '今日', status: '待确认', tone: 'warning' },
    { label: '华北返工成本专项分析', owner: '交付经理', due: '明日', status: '推进中', tone: 'danger' },
    { label: '高毛利套购方案扩区', owner: '产品运营', due: '本周', status: '推进中', tone: 'primary' },
  ]), 1, 'primary')] }),
  I: projectBlock({ title: '利润分组表', note: '复杂表头承载经营、履约、风险和动作字段。', componentRegionPattern: 'A', slots: [slot('A', '利润分组表', 'complex-table-card', complexTable('利润分组表', operatingRows, operatingColumnTree), 1, 'reference')] }),
};

const riskWidgets: WidgetMap = {
  A: projectBlock({ title: '风险概览', note: '风险页聚焦回款、库存、履约和动作闭环。', componentRegionPattern: 'AB', slots: [
    slot('A', '风险项目数', 'kpi-metric-card', kpi('风险项目数', 7, '项', 'danger', [{ label: '高风险', value: '2项', tone: 'danger' }], [3, 4, 5, 6, 7, 7]), 1, 'primary'),
    slot('B', '回款达成率', 'target-progress-card', target('回款达成率', 88.4, 100, 88.4, 11.6, 'warning'), 1, 'secondary'),
  ] }),
  B: projectBlock({ title: '风险结论', note: '高风险主要集中在华北工程客户回款与履约延迟。', componentRegionPattern: 'A', slots: [slot('A', '风险结论', 'conclusion-card', conclusion('风险结论', '华北工程客户存在回款与验收双风险，需要按项目建立日清单。', '回款风险优先', 'danger', [{ label: '逾期回款', value: '468万', tone: 'danger' }, { label: '履约率', value: '88.6%', tone: 'warning' }], [{ label: '动作', value: '项目经理每日更新验收材料', tone: 'danger' }]), 1, 'primary')] }),
  C: projectBlock({ title: '自开发图表', note: '没有现成图表能表达阶段阻塞时，绑定自开发 ECharts 模板。', componentRegionPattern: 'A', slots: [slot('A', '项目阶段阻塞', 'custom-echart-component-template', customEChart('项目阶段阻塞'), 1, 'primary')] }),
  D: projectBlock({ title: '风险热力', note: '识别区域与风险类型交叉分布。', componentRegionPattern: 'A', slots: [slot('A', '风险热力', 'heatmap-chart-card', heatmap('风险热力', ['华东', '华南', '华北', '海外'], ['回款', '库存', '履约'], [[22, 28, 18], [46, 58, 44], [86, 74, 82], [38, 42, 56]]), 1, 'primary')] }),
  E: projectBlock({ title: '回款漏斗', note: '从应收到账逐级追踪损耗。', componentRegionPattern: 'A', slots: [slot('A', '回款漏斗', 'rounded-funnel-chart-card', funnel('回款漏斗', [{ name: '应收确认', value: 100 }, { name: '开票完成', value: 92 }, { name: '客户确认', value: 81 }, { name: '到账', value: 68 }]), 1, 'secondary')] }),
  F: projectBlock({ title: '风险排行', note: '按影响金额排列风险对象。', componentRegionPattern: 'A', slots: [slot('A', '风险排行', 'ranking-list-card', ranking('风险排行', [{ name: '华北工程客户', value: 468, delta: '高' }, { name: '华南门店样机', value: 312, delta: '中' }, { name: '海外安装资源', value: 224, delta: '中' }], '万'), 1, 'supporting')] }),
  G: projectBlock({ title: '风险健康度', note: '多维度衡量风险治理能力。', componentRegionPattern: 'A', slots: [slot('A', '风险健康度', 'radar-chart-card', radar('风险健康度', ['回款', '库存', '履约', '客诉', '动作闭环'], [58, 64, 62, 76, 68]), 1, 'primary')] }),
  H: projectBlock({ title: '风险动作', note: '风险动作必须明确责任人与截止时间。', componentRegionPattern: 'A', slots: [slot('A', '风险动作', 'action-list-card', actions('风险动作', [
    { label: '华北回款日清单', owner: '赵岩', due: '今日', status: '高优先级', tone: 'danger' },
    { label: '验收材料补齐', owner: '交付经理', due: '明日', status: '推进中', tone: 'warning' },
    { label: '华南样机库存处置', owner: '陈卓', due: '本周', status: '推进中', tone: 'warning' },
    { label: '海外安装资源排班', owner: '林可', due: '本周', status: '已排期', tone: 'success' },
  ]), 1, 'primary')] }),
  I: projectBlock({ title: '风险明细', note: '风险明细保留项目、责任人和下一步动作。', componentRegionPattern: 'A', slots: [slot('A', '风险明细', 'detail-table-card', detailTable('风险明细', projectRows, detailColumns), 1, 'reference')] }),
};

export const projectReportPageIds = ['overview', 'revenue', 'profit', 'risk'] as const;

export const blockAreaConfigMap = bindComponentSlotDataSources({
  overview: overviewWidgets,
  revenue: revenueWidgets,
  profit: profitWidgets,
  risk: riskWidgets,
} as const);

export const projectReportPages: Record<(typeof projectReportPageIds)[number], DashboardPageConfig> = {
  overview: {
    layoutRows: projectLayoutRows,
    widgets: blockAreaConfigMap.overview,
  },
  revenue: {
    layoutRows: projectLayoutRows,
    widgets: blockAreaConfigMap.revenue,
  },
  profit: {
    layoutRows: projectLayoutRows,
    widgets: blockAreaConfigMap.profit,
  },
  risk: {
    layoutRows: projectLayoutRows,
    widgets: blockAreaConfigMap.risk,
  },
};

export const defaultProjectReportPage = projectReportPages.overview;

export const projectReportTopbarNav = [
  { id: 'overview', label: '经营总览' },
  { id: 'revenue', label: '收入结构' },
  { id: 'profit', label: '利润成本' },
  { id: 'risk', label: '风险行动' },
] as const;

export const projectReportNav = [
  { id: 'overview', label: '经营总览', icon: 'Gauge' as const, ...projectReportPages.overview },
  { id: 'revenue', label: '收入结构', icon: 'BarChart3' as const, ...projectReportPages.revenue },
  { id: 'profit', label: '利润成本', icon: 'Factory' as const, ...projectReportPages.profit },
  { id: 'risk', label: '风险行动', icon: 'Network' as const, ...projectReportPages.risk },
] satisfies ReportTemplateNav[];

export const configuredReportTemplatePage = defaultProjectReportPage;
export const reportTemplatePages = projectReportPages;
export const reportTemplateNav = projectReportNav;
