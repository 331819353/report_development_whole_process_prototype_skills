export type ComponentExampleConfigSection =
  | 'title'
  | 'layout'
  | 'aux'
  | 'chart'
  | 'table'
  | 'row'
  | 'value'
  | 'spark'
  | 'accessory'
  | 'progress'
  | 'detail'
  | 'core'
  | 'list'
  | 'developer'
  | 'tones';

export type ComponentExampleConfig<TSection extends ComponentExampleConfigSection> = Partial<
  Record<TSection, Record<string, unknown>>
>;

export type AxisChartExampleConfig = ComponentExampleConfig<'title' | 'layout' | 'aux' | 'chart' | 'tones'>;
export type TableExampleConfig = ComponentExampleConfig<'title' | 'layout' | 'aux' | 'table' | 'tones'>;
export type ListExampleConfig = ComponentExampleConfig<'title' | 'layout' | 'row' | 'tones'>;

export type KpiMetricExampleCardConfig = ComponentExampleConfig<
  'title' | 'layout' | 'value' | 'spark' | 'accessory' | 'tones'
>;
export type TargetProgressExampleCardConfig = ComponentExampleConfig<
  'title' | 'layout' | 'value' | 'detail' | 'progress' | 'tones'
>;
export type RankingListExampleCardConfig = ListExampleConfig;
export type LineChartExampleCardConfig = AxisChartExampleConfig;
export type HeatmapChartExampleCardConfig = AxisChartExampleConfig;
export type BarChartExampleCardConfig = AxisChartExampleConfig;
export type ComboChartExampleCardConfig = AxisChartExampleConfig;
export type ProportionChartExampleCardConfig = AxisChartExampleConfig;
export type DetailTableExampleCardConfig = TableExampleConfig;
export type ComplexTableExampleCardConfig = TableExampleConfig;
export type QuadrantChartExampleCardConfig = AxisChartExampleConfig;
export type RadarChartExampleCardConfig = AxisChartExampleConfig;
export type SunburstChartExampleCardConfig = AxisChartExampleConfig;
export type RoundedFunnelChartExampleCardConfig = AxisChartExampleConfig;
export type ActionListExampleCardConfig = ListExampleConfig;
export type ConclusionExampleCardConfig = ComponentExampleConfig<
  'title' | 'layout' | 'core' | 'list' | 'tones'
>;
export type CustomEChartComponentTemplateConfig = ComponentExampleConfig<
  'title' | 'layout' | 'aux' | 'chart' | 'developer' | 'tones'
>;

export interface ComponentExampleConfigByWidgetType {
  KpiMetricExampleCard: KpiMetricExampleCardConfig;
  TargetProgressExampleCard: TargetProgressExampleCardConfig;
  RankingListExampleCard: RankingListExampleCardConfig;
  LineChartExampleCard: LineChartExampleCardConfig;
  HeatmapChartExampleCard: HeatmapChartExampleCardConfig;
  BarChartExampleCard: BarChartExampleCardConfig;
  ComboChartExampleCard: ComboChartExampleCardConfig;
  ProportionChartExampleCard: ProportionChartExampleCardConfig;
  DetailTableExampleCard: DetailTableExampleCardConfig;
  ComplexTableExampleCard: ComplexTableExampleCardConfig;
  QuadrantChartExampleCard: QuadrantChartExampleCardConfig;
  RadarChartExampleCard: RadarChartExampleCardConfig;
  SunburstChartExampleCard: SunburstChartExampleCardConfig;
  RoundedFunnelChartExampleCard: RoundedFunnelChartExampleCardConfig;
  CustomEChartComponentTemplate: CustomEChartComponentTemplateConfig;
  ActionListExampleCard: ActionListExampleCardConfig;
  ConclusionExampleCard: ConclusionExampleCardConfig;
}

export type ComponentExampleWidgetType = keyof ComponentExampleConfigByWidgetType;

export interface ComponentExampleConfigSchema {
  widgetType: ComponentExampleWidgetType;
  componentExampleId: string;
  label: string;
  visualType: string;
  configSections: ComponentExampleConfigSection[];
  requiredConfigSections: ComponentExampleConfigSection[];
  primaryDataProps: string[];
  optionalDataProps?: string[];
  selfDevelopedFallback?: boolean;
  notes?: string[];
}

const componentExampleCatalogPrefix = 'component-example-catalog';

const schema = (
  widgetType: ComponentExampleWidgetType,
  componentExampleId: string,
  label: string,
  visualType: string,
  configSections: ComponentExampleConfigSection[],
  primaryDataProps: string[],
  options: {
    requiredConfigSections?: ComponentExampleConfigSection[];
    optionalDataProps?: string[];
    selfDevelopedFallback?: boolean;
    notes?: string[];
  } = {},
): ComponentExampleConfigSchema => ({
  widgetType,
  componentExampleId: `${componentExampleCatalogPrefix}:${componentExampleId}`,
  label,
  visualType,
  configSections,
  requiredConfigSections: options.requiredConfigSections ?? ['layout'],
  primaryDataProps,
  optionalDataProps: options.optionalDataProps,
  selfDevelopedFallback: options.selfDevelopedFallback,
  notes: options.notes,
});

export const customEChartComponentTemplateId =
  `${componentExampleCatalogPrefix}:custom-echart-component-template`;

export const componentExampleConfigSchemas: ComponentExampleConfigSchema[] = [
  schema('KpiMetricExampleCard', 'kpi-metric-card', 'KPI 指标卡', 'metric-card', ['title', 'layout', 'value', 'spark', 'accessory', 'tones'], ['value']),
  schema('TargetProgressExampleCard', 'target-progress-card', '目标进度卡', 'metric-card', ['title', 'layout', 'value', 'detail', 'progress', 'tones'], ['targetValue', 'currentValue']),
  schema('RankingListExampleCard', 'ranking-list-card', '排名列表卡', 'ranking-list', ['title', 'layout', 'row', 'tones'], ['items']),
  schema('LineChartExampleCard', 'line-chart-card', '折线图卡', 'line', ['title', 'layout', 'aux', 'chart', 'tones'], ['categories', 'values or series']),
  schema('HeatmapChartExampleCard', 'heatmap-chart-card', '热力图卡', 'heatmap', ['title', 'layout', 'aux', 'chart', 'tones'], ['rows', 'columns', 'cells']),
  schema('BarChartExampleCard', 'bar-chart-card', '柱状图卡', 'bar', ['title', 'layout', 'aux', 'chart', 'tones'], ['categories', 'values or series']),
  schema('ComboChartExampleCard', 'combo-chart-card', '组合图卡', 'combo', ['title', 'layout', 'aux', 'chart', 'tones'], ['categories', 'series']),
  schema('ProportionChartExampleCard', 'proportion-chart-card', '占比图卡', 'pie', ['title', 'layout', 'aux', 'chart', 'tones'], ['items']),
  schema('DetailTableExampleCard', 'detail-table-card', '明细表卡', 'table', ['title', 'layout', 'aux', 'table', 'tones'], ['rows', 'columns']),
  schema('ComplexTableExampleCard', 'complex-table-card', '复杂表卡', 'table', ['title', 'layout', 'aux', 'table', 'tones'], ['rows', 'columnTree']),
  schema('QuadrantChartExampleCard', 'quadrant-chart-card', '象限图卡', 'scatter', ['title', 'layout', 'aux', 'chart', 'tones'], ['points']),
  schema('RadarChartExampleCard', 'radar-chart-card', '雷达图卡', 'radar', ['title', 'layout', 'aux', 'chart', 'tones'], ['indicators', 'values or series']),
  schema('SunburstChartExampleCard', 'sunburst-chart-card', '旭日图卡', 'sunburst', ['title', 'layout', 'aux', 'chart', 'tones'], ['nodes']),
  schema('RoundedFunnelChartExampleCard', 'rounded-funnel-chart-card', '圆角漏斗图卡', 'funnel', ['title', 'layout', 'aux', 'chart', 'tones'], ['stages']),
  schema(
    'CustomEChartComponentTemplate',
    'custom-echart-component-template',
    '自开发 ECharts 组件模板',
    'other',
    ['title', 'layout', 'aux', 'chart', 'developer', 'tones'],
    ['items'],
    {
      requiredConfigSections: ['layout', 'chart', 'developer'],
      selfDevelopedFallback: true,
      notes: ['Use this template when no registered component example fits the requested visual contract.'],
    },
  ),
  schema('ActionListExampleCard', 'action-list-card', '行动清单卡', 'action-recommendation-card', ['title', 'layout', 'row', 'tones'], ['items']),
  schema('ConclusionExampleCard', 'conclusion-card', '结论说明卡', 'text-summary', ['title', 'layout', 'core', 'list', 'tones'], ['conclusion or items']),
];

export const createComponentExampleDefaultConfig = (schema: ComponentExampleConfigSchema) =>
  schema.configSections.reduce<Record<string, Record<string, unknown>>>((result, section) => {
    result[section] = {};
    return result;
  }, {});

export const componentExampleConfigSchemaByWidgetType = componentExampleConfigSchemas.reduce(
  (result, item) => ({
    ...result,
    [item.widgetType]: item,
  }),
  {} as Record<ComponentExampleWidgetType, ComponentExampleConfigSchema>,
);

export const componentExampleConfigSchemaById = componentExampleConfigSchemas.reduce(
  (result, item) => ({
    ...result,
    [item.componentExampleId]: item,
  }),
  {} as Record<string, ComponentExampleConfigSchema>,
);

export const isComponentExampleWidgetType = (widgetType?: string): widgetType is ComponentExampleWidgetType =>
  Boolean(widgetType && widgetType in componentExampleConfigSchemaByWidgetType);

export const getComponentExampleConfigSchema = (widgetType?: string) =>
  isComponentExampleWidgetType(widgetType) ? componentExampleConfigSchemaByWidgetType[widgetType] : undefined;

export const getComponentExampleConfigSchemaById = (componentExampleId?: string) =>
  componentExampleId ? componentExampleConfigSchemaById[componentExampleId] : undefined;
