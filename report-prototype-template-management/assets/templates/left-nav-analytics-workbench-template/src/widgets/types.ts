import type { DashboardActionMap, DashboardRuntimeContext } from '../types/actions';
import type { DashboardDataSourceRef, DashboardFilterScope } from '../types/data-source';
import type { LayoutSpanTemplateWidgetProps } from './templates/block-spans/types';

export interface CompactBarChartWidgetProps extends Record<string, unknown> {
  metricName?: string;
  unit?: string;
  chartGeometryContract?: Record<string, unknown>;
}

export type TemplateCarriedWidgetTone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

export type AdvancedEChartKind =
  | 'radar'
  | 'boxplot'
  | 'heatmap'
  | 'quadrant'
  | 'graph'
  | 'path'
  | 'tree'
  | 'treemap'
  | 'sunburst'
  | 'parallel'
  | 'sankey'
  | 'gauge'
  | 'dupont'
  | 'serpentine';

export interface AdvancedEChartWidgetProps extends Record<string, unknown> {
  chartKind?: AdvancedEChartKind;
  seriesName?: string;
  unit?: string;
  quadrantXName?: string;
  quadrantYName?: string;
  quadrantXSplit?: number;
  quadrantYSplit?: number;
  quadrantLabels?: {
    topRight?: string;
    topLeft?: string;
    bottomLeft?: string;
    bottomRight?: string;
  };
  quadrantPoints?: Array<{
    name: string;
    x: number;
    y: number;
    value?: number;
    quadrant?: string;
  }>;
  currentValue?: number;
  minValue?: number;
  maxValue?: number;
  targetValue?: number;
}

export interface TemplateWidgetDisplayBudget {
  rowHeightPx?: number;
  visibleRowCount?: number;
  maxVisibleItems?: number;
  rowHeaderW?: number;
  headerRowH?: number;
  measureColumnW?: number;
  overflowStrategy?: string;
}

export interface KpiMetricWidgetProps extends Record<string, unknown> {
  label?: string;
  value?: string;
  unit?: string;
  delta?: string;
  tone?: TemplateCarriedWidgetTone;
  contentAreaTitle?: string;
  showContentTitle?: boolean;
  slotCount?: number;
}

export interface MetricValueWidgetProps extends Record<string, unknown> {
  value?: number | string;
  unit?: string;
  yearOverYear?: string;
  monthOverMonth?: string;
  maxDecimals?: number;
}

export interface ProgressGaugeWidgetProps extends Record<string, unknown> {
  label?: string;
  progress?: number;
  description?: string;
  tone?: TemplateCarriedWidgetTone;
  showCopy?: boolean;
  shape?: 'circle' | 'rect' | 'tank';
}

export interface RankingCardItem {
  rank?: number;
  label: string;
  value: number | string;
  suffix?: string;
}

export interface RankingCardWidgetProps extends Record<string, unknown> {
  items?: RankingCardItem[];
  valueUnit?: string;
  displayBudget?: TemplateWidgetDisplayBudget;
}

export interface StatusRowsWidgetItem {
  label: string;
  value?: string;
  status?: TemplateCarriedWidgetTone;
}

export interface StatusRowsWidgetProps extends Record<string, unknown> {
  tone?: TemplateCarriedWidgetTone;
  items?: StatusRowsWidgetItem[];
  displayBudget?: TemplateWidgetDisplayBudget;
}

export interface MiniBarTrendWidgetProps extends Record<string, unknown> {
  label?: string;
  value?: string;
  unit?: string;
  categories?: string[];
  series?: number[];
  seriesName?: string;
  tone?: TemplateCarriedWidgetTone;
}

export interface SignalMatrixCell {
  label: string;
  value: number;
  tone?: TemplateCarriedWidgetTone;
}

export interface SignalMatrixWidgetProps extends Record<string, unknown> {
  tone?: TemplateCarriedWidgetTone;
  matrix?: SignalMatrixCell[];
}

export interface FollowupActionWidgetProps extends Record<string, unknown> {
  label?: string;
  value?: string;
  description?: string;
  actionLabel?: string;
  tone?: TemplateCarriedWidgetTone;
  displayBudget?: TemplateWidgetDisplayBudget;
}

export interface ComponentContentAreaTemplateProps extends Record<string, unknown> {
  title?: string;
  contentAreaTitle?: string;
  showContentTitle?: boolean;
  slotCount?: number;
  templateFile?: string;
}

export interface ElementPivotTableMeta {
  field: string;
  name: string;
  unit?: string;
}

export interface ElementPivotTableContract {
  rowDimensions?: string[];
  columnDimensions?: string[];
  measures?: string[];
  aggregation?: 'SUM' | 'AVG' | 'COUNT' | 'MIN' | 'MAX';
  rateFormula?: string;
  subtotal?: boolean;
  grandTotal?: boolean;
  frozen?: string;
  tooltip?: string;
  drilldown?: string;
  states?: string[];
}

export interface ElementPivotTableWidgetProps extends Record<string, unknown> {
  rowFields?: string[];
  columnFields?: string[];
  valueFields?: string[];
  rawData?: Record<string, unknown>[];
  meta?: ElementPivotTableMeta[];
  valueInCols?: boolean;
  cornerText?: string;
  emptyText?: string;
  pivotContract?: ElementPivotTableContract;
  displayBudget?: TemplateWidgetDisplayBudget;
}

export type DetailTableColumnAlign = 'left' | 'center' | 'right';
export type DetailTableColumnType = 'text' | 'number' | 'currency' | 'percent' | 'status' | 'operation';

export interface DetailTableColumnConfig {
  key: string;
  label: string;
  field: string;
  width?: number;
  minWidth?: number;
  align?: DetailTableColumnAlign;
  fixed?: 'left' | 'right';
  sortable?: boolean;
  type?: DetailTableColumnType;
  formatter?: DetailTableColumnType;
  unit?: string;
  priority?: number;
  ellipsis?: boolean;
}

export interface DetailTableRow extends Record<string, string | number | null | undefined> {
  orderId: string;
  customerName: string;
}

export interface DetailTableContract {
  rowKey?: string;
  primaryKey?: string;
  rowGrain?: string;
  defaultSort?: { field: string; order: 'ascending' | 'descending' };
  visibleColumns?: string[];
  columnPriority?: Record<string, number>;
  columnSettings?: string;
  maxVisibleColumns?: number;
  hiddenColumns?: string[];
  pageSize?: number;
  currentPage?: number;
  pagination?: string;
  virtual?: string;
  loadMore?: string;
  search?: string;
  keyword?: string;
  query?: string;
  filterFields?: string[];
  localFilter?: string;
  exportScope?: string;
  exportRows?: string;
  detail?: string;
  rowDetail?: string;
  drawer?: string;
  onRowClick?: string;
  operation?: string;
  actions?: string[];
  states?: Array<'loading' | 'empty' | 'error' | 'noPermission'>;
}

export interface DetailTableWidgetProps extends Record<string, unknown> {
  rows?: DetailTableRow[];
  tableColumns?: DetailTableColumnConfig[];
  rowKey?: string;
  emptyText?: string;
  loading?: boolean;
  errorText?: string;
  noPermission?: boolean;
  detailTableContract?: DetailTableContract;
  displayBudget?: TemplateWidgetDisplayBudget;
}

export type ComplexTableAlign = 'left' | 'center' | 'right';
export type ComplexTableFixed = 'left' | 'right';
export type ComplexTableFormatter = 'text' | 'number' | 'currency' | 'percent' | 'duration' | 'status';

export interface ComplexTableColumnConfig {
  key: string;
  label: string;
  field?: string;
  children?: ComplexTableColumnConfig[];
  width?: number;
  minWidth?: number;
  align?: ComplexTableAlign;
  fixed?: ComplexTableFixed;
  sortable?: boolean;
  filterable?: boolean;
  unit?: string;
  definition?: string;
  formula?: string;
  formatter?: ComplexTableFormatter;
  priority?: number;
  ellipsis?: boolean;
}

export interface ComplexTableRow extends Record<string, string | number | null | undefined> {
  recordId: string;
  region: string;
  channel: string;
}

export interface ComplexTableContract {
  rowKey?: string;
  primaryKey?: string;
  rowGrain?: string;
  defaultSort?: { field: string; order: 'ascending' | 'descending' };
  columnTree?: string;
  leafColumns?: string[];
  spanRules?: {
    maxDepth: number;
    leafColumnCount: number;
    colSpan: string;
    rowSpan: string;
  };
  frozenColumns?: string[];
  localFilters?: string[];
  columnHeaderFilters?: string[];
  tooltip?: string;
  densityFallback?: string;
  detailRoute?: string;
  states?: Array<'loading' | 'empty' | 'error' | 'noPermission'>;
}

export interface ComplexGroupedTableWidgetProps extends Record<string, unknown> {
  rows?: ComplexTableRow[];
  columnTree?: ComplexTableColumnConfig[];
  rowKey?: string;
  emptyText?: string;
  loading?: boolean;
  errorText?: string;
  noPermission?: boolean;
  complexTableContract?: ComplexTableContract;
  displayBudget?: TemplateWidgetDisplayBudget;
}

export type S2ReportTableVariant = 'pivot' | 'detail' | 'complex';

export interface S2ReportTableWidgetProps extends Record<string, unknown> {
  variant?: S2ReportTableVariant;
  rows?: Record<string, unknown>[];
  tableColumns?: Array<DetailTableColumnConfig | ComplexTableColumnConfig>;
  columnTree?: ComplexTableColumnConfig[];
  rowFields?: string[];
  columnFields?: string[];
  valueFields?: string[];
  rawData?: Record<string, unknown>[];
  meta?: ElementPivotTableMeta[];
  rowKey?: string;
  cornerText?: string;
  emptyText?: string;
  loading?: boolean;
  errorText?: string;
  noPermission?: boolean;
  pivotContract?: ElementPivotTableContract;
  detailTableContract?: DetailTableContract;
  complexTableContract?: ComplexTableContract;
  displayBudget?: TemplateWidgetDisplayBudget;
}

export type TemplateEChartKind = 'line' | 'pie' | 'scatter' | 'map' | 'candlestick';

export interface TemplateEChartNamedValue {
  name: string;
  value: number;
}

export interface TemplateEChartScatterPoint {
  name: string;
  value: [number, number] | [number, number, number];
}

export interface TemplateEChartCandlePoint {
  date: string;
  open: number;
  close: number;
  low: number;
  high: number;
}

export interface TemplateEChartWidgetProps extends Record<string, unknown> {
  chartKind?: TemplateEChartKind;
  seriesName?: string;
  unit?: string;
  categories?: string[];
  values?: number[];
  pieData?: TemplateEChartNamedValue[];
  points?: TemplateEChartScatterPoint[];
  mapData?: TemplateEChartNamedValue[];
  candles?: TemplateEChartCandlePoint[];
  tone?: TemplateCarriedWidgetTone;
}

export type UniversalCardKind =
  | 'target'
  | 'compare'
  | 'warning'
  | 'contribution'
  | 'mini-grid'
  | 'funnel'
  | 'goal-bars'
  | 'summary';

export interface UniversalCardRow {
  label: string;
  value?: string;
  subValue?: string;
  status?: string;
  percent?: number;
  tone?: TemplateCarriedWidgetTone;
}

export interface UniversalCardWidgetProps extends Record<string, unknown> {
  cardKind?: UniversalCardKind;
  headline?: string;
  metricName?: string;
  riskLevel?: string;
  value?: string;
  unit?: string;
  target?: string;
  gap?: string;
  status?: string;
  rows?: UniversalCardRow[];
  notes?: string[];
  displayBudget?: TemplateWidgetDisplayBudget;
}

export interface WidgetViewportConfig {
  pannable?: boolean;
  zoomable?: boolean;
  minZoom?: number;
  maxZoom?: number;
  defaultZoom?: number;
  naturalWidth?: number;
  naturalHeight?: number;
}

export interface WidgetLocalFilterOption {
  id: string;
  label: string;
  disabled?: boolean;
  reason?: string;
  count?: number;
  sortOrder?: number;
}

export interface WidgetLocalFilterConfig {
  id: string;
  label: string;
  // 本地筛选基于组件已加载的全量 data，field 支持单字段或候选字段数组。
  field: string | string[];
  defaultValue?: string;
  options?: WidgetLocalFilterOption[];
  labelField?: string | string[];
  valueField?: string | string[];
  mode?: 'auto' | 'buttons' | 'panel';
  // Override only for deliberate exceptions; default is 2 so 3+ auto filters render as dropdown.
  maxButtonOptions?: number;
}

export interface WidgetContext extends DashboardRuntimeContext {
  // 组件自有标题区/控制区可读取并渲染本地筛选；Shell 只维护筛选值和数据过滤。
  localFilterConfigs?: WidgetLocalFilterConfig[];
  getLocalFilterOptions?: (filter: WidgetLocalFilterConfig) => WidgetLocalFilterOption[];
  setLocalFilter?: (filterId: string, value: string) => void;
  clearLocalFilters?: () => void;
}


export interface WidgetAnalysisInsightContract {
  subtype:
    | 'conclusion-card'
    | 'insight-card'
    | 'anomaly-alert'
    | 'attribution-card'
    | 'impact-factor-card'
    | 'comparison-interpretation'
    | 'trend-interpretation'
    | 'target-diagnosis'
    | 'recommendation-card'
    | 'risk-card'
    | 'definition-card'
    | 'data-quality-card'
    | 'chart-annotation'
    | 'summary-bar'
    | 'change-explanation'
    | 'ranking-interpretation'
    | 'forecast-note'
    | 'review-card'
    | 'explanatory-empty-state'
    | 'task-card'
    | 'permission-no-result-delay-note';
  insightFamily: 'conclusion' | 'insight' | 'diagnosis' | 'recommendation' | 'explanation' | 'state';
  conclusion: string;
  evidence?: string[];
  affectedObjects?: string[];
  compareWith?: string;
  changeValue?: string;
  reasonFields?: string[];
  recommendedActions?: string[];
  confidence?: 'high' | 'medium' | 'low' | 'insufficient';
  definitionRefs?: string[];
  dataQualityScope?: string;
  annotationTarget?: { componentId: string; field?: string; markId?: string; range?: string };
  maxVisibleItems?: number;
  localFilters?: string[];
  tooltipPayload?: string[];
  detailRoute?: string;
  sourceDataset?: string;
  freshnessField?: string;
  validationRules: string[];
}

export type WidgetVisualType =
  | 'line'
  | 'bar'
  | 'combo'
  | 'compact-sparkline'
  | 'candlestick'
  | 'heatmap'
  | 'pie'
  | 'radar'
  | 'path'
  | 'sunburst'
  | 'gauge'
  | 'scatter'
  | 'boxplot'
  | 'parallel'
  | 'map'
  | 'graph'
  | 'tree'
  | 'treemap'
  | 'sankey'
  | 'funnel'
  | 'metric-card'
  | 'text-summary'
  | 'operational-list'
  | 'action-recommendation-card'
  | 'ranking-list'
  | 'table'
  | 'pivot'
  | 'other';

export interface WidgetTitlePillOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface WidgetAuxMetric {
  label: string;
  value?: string;
}

export interface BaseWidgetConfig<TType extends string, TProps extends Record<string, unknown>> {
  type: TType;
  // Optional component metadata. Visible titles are rendered by the business component itself.
  title?: string;
  // Reader-facing title for a business block/card. Metric widgets may mirror this from title.
  displayTitle?: string;
  // Optional 1-2 block-layout-template segmented pill options rendered on the right side of the block title. Max 3.
  titlePills?: WidgetTitlePillOption[];
  // Optional 4 block-layout-template explanation/conclusion text.
  bodySummary?: string;
  // Optional 2-1 block-layout-template additional information plus 2-2 unit. These do not belong inside componentSlots. Max 5.
  auxMetrics?: WidgetAuxMetric[];
  // Semantic metric identity for tooltip, export, drilldown, and口径 disclosure; not always rendered visibly.
  metricName?: string;
  // Metric widgets default this to false when displayTitle/title already identifies the metric.
  showBodyMetricLabel?: boolean;
  // Optional copy for the block-level no-data mask when widget.data resolves to no rows.
  emptyState?: {
    title?: string;
    message?: string;
  };
  props: TProps;
  // 组件视觉类型。框架校验会用它检查当前 layoutRows 占位是否属于允许尺寸。
  visualType: WidgetVisualType;
  // 组件抛出 dashboard-action 后，壳层只会转发给预留钩子，不会替组件执行弹窗、跳转或下钻。
  actions?: DashboardActionMap;
  // 组件数据源。离线/mock 数据放在 dashboard.dataset.json；常规 API 使用 apiData/httpData + api 配置；复杂 provider 在 dataSources/registry.ts 注册。
  // 配置里只保留引用和参数映射，避免把业务数据塞进 dashboard.config.ts。
  data?: DashboardDataSourceRef;
  // 无 data 的组件必须声明原因：static 表示纯静态叙述/说明，external 表示自行管理外部运行态。
  dataPolicy?: 'static' | 'external';
  // 结论卡/洞察卡/异常风险/归因建议/口径质量/预测标注/解释型状态等分析说明组件必须声明该契约。
  analysisInsightContract?: WidgetAnalysisInsightContract;
  // 筛选作用域。未配置时只接收全局筛选；配置后会接收全局筛选 + 匹配 scope 的筛选。
  filterScope?: DashboardFilterScope;
  // 组件内部本地筛选。可视控件由组件自己渲染，只过滤当前组件已加载的全量 data，不参与接口或数据源传参。
  localFilters?: WidgetLocalFilterConfig[];
  viewport?: boolean | WidgetViewportConfig;
}

export interface WidgetPropsRegistry {
  // 复制 WidgetTemplate.vue 开发组件后，在这里登记 props 类型。
  // 示例：
  // MyWidget: MyWidgetProps;
  AdvancedEChartWidget: AdvancedEChartWidgetProps;
  CompactBarChart: CompactBarChartWidgetProps;
  KpiMetricWidget: KpiMetricWidgetProps;
  MetricValueWidget: MetricValueWidgetProps;
  ProgressGaugeWidget: ProgressGaugeWidgetProps;
  RankingCardWidget: RankingCardWidgetProps;
  StatusRowsWidget: StatusRowsWidgetProps;
  MiniBarTrendWidget: MiniBarTrendWidgetProps;
  SignalMatrixWidget: SignalMatrixWidgetProps;
  FollowupActionWidget: FollowupActionWidgetProps;
  ElementPivotTableWidget: ElementPivotTableWidgetProps;
  DetailTableWidget: DetailTableWidgetProps;
  ComplexGroupedTableWidget: ComplexGroupedTableWidgetProps;
  S2ReportTableWidget: S2ReportTableWidgetProps;
  TemplateEChartWidget: TemplateEChartWidgetProps;
  UniversalCardWidget: UniversalCardWidgetProps;
  OperatingRevenueMetricContentAreaTemplate: ComponentContentAreaTemplateProps;
  OperatingProfitMetricContentAreaTemplate: ComponentContentAreaTemplateProps;
  TargetAchievementContentAreaTemplate: ComponentContentAreaTemplateProps;
  RegionalRevenueRankingContentAreaTemplate: ComponentContentAreaTemplateProps;
  RevenueProfitTrendContentAreaTemplate: ComponentContentAreaTemplateProps;
  ChannelRevenueStructureContentAreaTemplate: ComponentContentAreaTemplateProps;
  CustomerValueScatterContentAreaTemplate: ComponentContentAreaTemplateProps;
  CostProfitHeatmapContentAreaTemplate: ComponentContentAreaTemplateProps;
  OperatingHealthRadarContentAreaTemplate: ComponentContentAreaTemplateProps;
  ExceptionWarningContentAreaTemplate: ComponentContentAreaTemplateProps;
  KeyActionListContentAreaTemplate: ComponentContentAreaTemplateProps;
  OpportunityFunnelContentAreaTemplate: ComponentContentAreaTemplateProps;
  OperatingConclusionContentAreaTemplate: ComponentContentAreaTemplateProps;
  LaunchConversionWaterfallContentAreaTemplate: ComponentContentAreaTemplateProps;
  [layoutSpanType: `Span${string}Layout`]: LayoutSpanTemplateWidgetProps;
  Span02x02Layout: LayoutSpanTemplateWidgetProps;
  Span03x02Layout: LayoutSpanTemplateWidgetProps;
  Span04x03Layout: LayoutSpanTemplateWidgetProps;
}

export type RegisteredWidgetType = keyof WidgetPropsRegistry & string;

export type RegisteredWidgetConfig = [RegisteredWidgetType] extends [never]
  ? BaseWidgetConfig<string, Record<string, unknown>>
  : {
      [Type in RegisteredWidgetType]: BaseWidgetConfig<Type, WidgetPropsRegistry[Type]>;
    }[RegisteredWidgetType];

export type WidgetMap = Partial<Record<string, RegisteredWidgetConfig>>;
