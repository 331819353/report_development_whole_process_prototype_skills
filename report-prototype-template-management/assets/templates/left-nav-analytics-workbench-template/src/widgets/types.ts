import type {
  DashboardActionMap,
  DashboardExpressionValue,
  DashboardParams,
  DashboardRuntimeContext,
} from '../types/actions';
import type { DashboardDataSourceRef, DashboardFilterScope } from '../types/data-source';
import type { LayoutSpanTemplateWidgetProps } from './templates/block-spans/types';
import type { ComponentExampleConfigByWidgetType } from './templates/component-examples/config';

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

export interface KpiMetricExampleAccessoryMetric {
  label: string;
  value: string;
  tone?: TemplateCarriedWidgetTone;
  icon?: 'trend' | 'target' | 'clock';
}

export type KpiMetricExampleSparkType = 'line' | 'bar' | 'none';

export interface KpiMetricExampleLayoutConfig {
  titleRatio?: number;
  valueRatio?: number;
  accessoryRatio?: number;
  gapPx?: number;
  paddingPx?: number;
}

export interface KpiMetricExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

export interface KpiMetricExampleValueConfig {
  minFontSizePx?: number;
  maxFontSizePx?: number;
  heightScale?: number;
  gradientStartColor?: string;
  gradientMidColor?: string;
  gradientEndColor?: string;
  affixRatio?: number;
  affixMinFontSizePx?: number;
  affixMaxFontSizePx?: number;
  shadow?: string;
  reflectionVisible?: boolean;
  reflectionOpacity?: number;
}

export interface KpiMetricExampleSparkConfig {
  visible?: boolean;
  type?: KpiMetricExampleSparkType;
  values?: number[];
  maxPoints?: number;
  showArea?: boolean;
  showStroke?: boolean;
  fillStartColor?: string;
  fillMidColor?: string;
  fillEndColor?: string;
  fillStartOpacity?: number;
  fillMidOpacity?: number;
  fillEndOpacity?: number;
  strokeStartColor?: string;
  strokeMidColor?: string;
  strokeEndColor?: string;
  strokeStartOpacity?: number;
  strokeMidOpacity?: number;
  strokeEndOpacity?: number;
  strokeWidth?: number;
  barOpacity?: number;
  barRadiusPx?: number;
  edgeFade?: boolean;
  widthPercent?: number;
  heightPercent?: number;
  rightPercent?: number;
  bottomPercent?: number;
}

export interface KpiMetricExampleAccessoryConfig {
  visible?: boolean;
  columns?: 1 | 2;
  maxItems?: number;
  padding?: string;
  rowMinHeightPx?: number;
  columnGapPx?: number;
  rowGapPx?: number;
  itemGapPx?: number;
  itemPaddingInlinePx?: number;
  itemInnerPaddingPx?: number;
  iconVisible?: boolean;
  iconSizePx?: number;
  iconGraphicSizePx?: number;
  iconStrokeWidth?: number;
  iconRadiusPx?: number;
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  dividerVisible?: boolean;
  dividerColor?: string;
  dividerWeakOpacity?: number;
  dividerStrongOpacity?: number;
}

export interface KpiMetricExampleToneConfig {
  primary?: string;
  success?: string;
  warning?: string;
  danger?: string;
  neutral?: string;
  neutralValue?: string;
}

export interface KpiMetricExampleCardConfig {
  layout?: KpiMetricExampleLayoutConfig;
  title?: KpiMetricExampleTitleConfig;
  value?: KpiMetricExampleValueConfig;
  spark?: KpiMetricExampleSparkConfig;
  accessory?: KpiMetricExampleAccessoryConfig;
  tones?: KpiMetricExampleToneConfig;
}

export interface KpiMetricExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  value?: number | string;
  valuePrefix?: string;
  valueSuffix?: string;
  maxDecimals?: number;
  tone?: TemplateCarriedWidgetTone;
  accessoryMetrics?: KpiMetricExampleAccessoryMetric[];
  sparkType?: KpiMetricExampleSparkType;
  sparkValues?: number[];
  config?: KpiMetricExampleCardConfig;
}

export interface TargetProgressExampleDetailItem {
  label: string;
  value: number | string;
  icon?: 'target' | 'current' | 'gap';
}

export interface TargetProgressExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  value?: number | string;
  valueSuffix?: string;
  maxDecimals?: number;
  tone?: TemplateCarriedWidgetTone;
  targetValue?: number | string;
  currentValue?: number | string;
  gapValue?: number | string;
  targetLabel?: string;
  currentLabel?: string;
  gapLabel?: string;
  progressLabel?: string;
  goalLabel?: string;
  details?: TargetProgressExampleDetailItem[];
  config?: ComponentExampleConfigByWidgetType['TargetProgressExampleCard'];
}

export interface RankingListExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  items?: RankingCardItem[];
  valueUnit?: string;
  config?: ComponentExampleConfigByWidgetType['RankingListExampleCard'];
}

export interface LineChartExampleSeries {
  name: string;
  values: number[];
  color?: string;
  areaVisible?: boolean;
  smooth?: boolean;
}

export interface LineChartExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  categories?: string[];
  values?: number[];
  series?: LineChartExampleSeries[];
  config?: ComponentExampleConfigByWidgetType['LineChartExampleCard'];
}

export interface HeatmapChartExampleCell {
  row: string;
  col: string;
  value: number | null;
}

export interface HeatmapChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export interface HeatmapChartExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  rows?: string[];
  columns?: string[];
  cells?: HeatmapChartExampleCell[];
  auxMetrics?: HeatmapChartExampleAuxMetric[];
  config?: ComponentExampleConfigByWidgetType['HeatmapChartExampleCard'];
}

export interface BarChartExampleSeries {
  name: string;
  values: number[];
  color?: string;
  stack?: string;
}

export interface BarChartExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  categories?: string[];
  values?: number[];
  series?: BarChartExampleSeries[];
  config?: ComponentExampleConfigByWidgetType['BarChartExampleCard'];
}

export interface ComboChartExampleSeries {
  name: string;
  values: number[];
  kind?: 'bar' | 'line';
  color?: string;
  unit?: string;
  yAxisIndex?: 0 | 1;
  targetValue?: number;
  smooth?: boolean;
}

export interface ComboChartExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  categories?: string[];
  values?: number[];
  rateValues?: number[];
  series?: ComboChartExampleSeries[];
  config?: ComponentExampleConfigByWidgetType['ComboChartExampleCard'];
}

export interface ProportionChartExampleItem {
  name: string;
  value: number;
  color?: string;
}

export interface ProportionChartExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  totalLabel?: string;
  items?: ProportionChartExampleItem[];
  config?: ComponentExampleConfigByWidgetType['ProportionChartExampleCard'];
}

export interface DetailTableExampleColumn {
  key: string;
  label: string;
  field?: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  formatter?: 'text' | 'number' | 'currency' | 'percent' | 'status' | 'date';
  unit?: string;
  priority?: number;
  fixed?: 'left' | 'right';
  definition?: string;
}

export interface DetailTableExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export interface DetailTableExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  rowKey?: string;
  rows?: Record<string, unknown>[];
  columns?: DetailTableExampleColumn[];
  auxMetrics?: DetailTableExampleAuxMetric[];
  config?: ComponentExampleConfigByWidgetType['DetailTableExampleCard'];
}

export interface ComplexTableExampleColumn {
  key: string;
  label: string;
  field?: string;
  children?: ComplexTableExampleColumn[];
  width?: number;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  unit?: string;
  definition?: string;
  formula?: string;
  formatter?: 'text' | 'number' | 'currency' | 'percent' | 'duration' | 'status';
  priority?: number;
  ellipsis?: boolean;
  locked?: boolean;
}

export interface ComplexTableExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export interface ComplexTableExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  rowKey?: string;
  rows?: Record<string, unknown>[];
  columnTree?: ComplexTableExampleColumn[];
  auxMetrics?: ComplexTableExampleAuxMetric[];
  config?: ComponentExampleConfigByWidgetType['ComplexTableExampleCard'];
}

export interface QuadrantChartExamplePoint {
  name: string;
  x: number;
  y: number;
  size?: number;
  group?: string;
  color?: string;
}

export interface QuadrantChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export interface QuadrantChartExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  points?: QuadrantChartExamplePoint[];
  auxMetrics?: QuadrantChartExampleAuxMetric[];
  config?: ComponentExampleConfigByWidgetType['QuadrantChartExampleCard'];
}

export interface RadarChartExampleIndicator {
  name: string;
  max?: number;
  min?: number;
  unit?: string;
}

export interface RadarChartExampleSeries {
  name: string;
  values: number[];
  color?: string;
}

export interface RadarChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export interface RadarChartExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  seriesName?: string;
  indicators?: RadarChartExampleIndicator[];
  values?: number[];
  series?: RadarChartExampleSeries[];
  auxMetrics?: RadarChartExampleAuxMetric[];
  config?: ComponentExampleConfigByWidgetType['RadarChartExampleCard'];
}

export interface SunburstChartExampleNode {
  name: string;
  value?: number;
  color?: string;
  children?: SunburstChartExampleNode[];
}

export interface SunburstChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export interface SunburstChartExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  totalLabel?: string;
  nodes?: SunburstChartExampleNode[];
  auxMetrics?: SunburstChartExampleAuxMetric[];
  config?: ComponentExampleConfigByWidgetType['SunburstChartExampleCard'];
}

export interface RoundedFunnelChartExampleStage {
  name: string;
  value: number;
  color?: string;
  detail?: string;
}

export interface RoundedFunnelChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export interface RoundedFunnelChartExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  stages?: RoundedFunnelChartExampleStage[];
  auxMetrics?: RoundedFunnelChartExampleAuxMetric[];
  config?: ComponentExampleConfigByWidgetType['RoundedFunnelChartExampleCard'];
}

export interface CustomEChartComponentTemplateDatum {
  name: string;
  value: number;
  color?: string;
  detail?: string;
  meta?: Record<string, string | number | boolean | null | undefined>;
}

export interface CustomEChartComponentTemplateAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export interface CustomEChartComponentTemplateProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  items?: CustomEChartComponentTemplateDatum[];
  auxMetrics?: CustomEChartComponentTemplateAuxMetric[];
  config?: ComponentExampleConfigByWidgetType['CustomEChartComponentTemplate'];
}

export interface ActionListExampleItem {
  label: string;
  status?: string;
  owner?: string;
  due?: string;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  done?: boolean;
}

export interface ActionListExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  items?: ActionListExampleItem[];
  config?: ComponentExampleConfigByWidgetType['ActionListExampleCard'];
}

export type ConclusionExampleTone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

export interface ConclusionExampleItem {
  label: string;
  value: string;
  tone?: ConclusionExampleTone;
}

export interface ConclusionExampleCardProps extends Record<string, unknown> {
  title?: string;
  unit?: string;
  conclusion?: string;
  emphasis?: string;
  statusLabel?: string;
  statusTone?: ConclusionExampleTone;
  evidenceItems?: ConclusionExampleItem[];
  actionItems?: ConclusionExampleItem[];
  items?: ConclusionExampleItem[];
  config?: ComponentExampleConfigByWidgetType['ConclusionExampleCard'];
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
  label?: string;
  name?: string;
  regionName?: string;
  region?: string;
  areaName?: string;
  dimension?: string;
  value: number | string;
  suffix?: string;
  delta?: string;
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

export interface WidgetDataBindingSeriesConfig {
  name: string;
  valueField: string;
  type?: 'line' | 'bar';
  color?: string;
  smooth?: boolean;
  stack?: string;
  unit?: string;
}

export interface WidgetDataBindingItemFields {
  id?: string;
  label?: string;
  name?: string;
  value?: string;
  tone?: string;
  status?: string;
  owner?: string;
  due?: string;
  percent?: string;
  metaText?: string;
}

export interface WidgetDataBindingConfig {
  mode?: 'rows' | 'first-row' | 'category-series' | 'items' | 'custom-props';
  rowsProp?: string;
  propsObjectField?: string;
  firstRowProps?: Record<string, string>;
  categoryField?: string;
  valueField?: string;
  series?: WidgetDataBindingSeriesConfig[];
  itemFields?: WidgetDataBindingItemFields;
  propExpressions?: Record<string, string>;
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
  hidden?: boolean;
  disabled?: boolean;
  value?: DashboardExpressionValue;
  filters?: DashboardParams;
  params?: DashboardParams;
  props?: Record<string, unknown>;
  dataBinding?: WidgetDataBindingConfig;
  actions?: DashboardActionMap;
}


export interface BaseWidgetConfig<TType extends string, TProps extends Record<string, unknown>> {
  type: TType;
  // Optional component metadata. Visible titles are rendered by the business component itself.
  title?: string;
  // Reader-facing title for a business block/card. Metric widgets may mirror this from title.
  displayTitle?: string;
  // Optional shell-level pill options rendered on the right side of the block title. Hidden pills do not render or reserve space.
  titlePills?: WidgetTitlePillOption[];
  // Optional shell-level text rendered in the top part of the block body.
  bodySummary?: string;
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
  // 组件抛出 dashboard-action 后，壳层先匹配自定义钩子；没有钩子时执行内置跳转、抽屉、弹窗、交叉筛选、刷新、导出等默认行为。
  actions?: DashboardActionMap;
  // 组件数据源。离线/mock 数据放在 dashboard.dataset.json；常规 API 使用 apiData/httpData + api 配置；复杂 provider 在 dataSources/registry.ts 注册。
  // 配置里只保留引用和参数映射，避免把业务数据塞进 dashboard.config.ts。
  data?: DashboardDataSourceRef;
  dataBinding?: WidgetDataBindingConfig;
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
  KpiMetricExampleCard: KpiMetricExampleCardProps;
  TargetProgressExampleCard: TargetProgressExampleCardProps;
  RankingListExampleCard: RankingListExampleCardProps;
  LineChartExampleCard: LineChartExampleCardProps;
  HeatmapChartExampleCard: HeatmapChartExampleCardProps;
  BarChartExampleCard: BarChartExampleCardProps;
  ComboChartExampleCard: ComboChartExampleCardProps;
  ProportionChartExampleCard: ProportionChartExampleCardProps;
  DetailTableExampleCard: DetailTableExampleCardProps;
  ComplexTableExampleCard: ComplexTableExampleCardProps;
  QuadrantChartExampleCard: QuadrantChartExampleCardProps;
  RadarChartExampleCard: RadarChartExampleCardProps;
  SunburstChartExampleCard: SunburstChartExampleCardProps;
  RoundedFunnelChartExampleCard: RoundedFunnelChartExampleCardProps;
  CustomEChartComponentTemplate: CustomEChartComponentTemplateProps;
  ActionListExampleCard: ActionListExampleCardProps;
  ConclusionExampleCard: ConclusionExampleCardProps;
  MetricValueWidget: MetricValueWidgetProps;
  ProgressGaugeWidget: ProgressGaugeWidgetProps;
  RankingCardWidget: RankingCardWidgetProps;
  StatusRowsWidget: StatusRowsWidgetProps;
  MiniBarTrendWidget: MiniBarTrendWidgetProps;
  SignalMatrixWidget: SignalMatrixWidgetProps;
  FollowupActionWidget: FollowupActionWidgetProps;
  S2ReportTableWidget: S2ReportTableWidgetProps;
  TemplateEChartWidget: TemplateEChartWidgetProps;
  UniversalCardWidget: UniversalCardWidgetProps;
  BaseLayoutSpan: LayoutSpanTemplateWidgetProps;
}

export type RegisteredWidgetType = keyof WidgetPropsRegistry & string;

export type RegisteredWidgetConfig = [RegisteredWidgetType] extends [never]
  ? BaseWidgetConfig<string, Record<string, unknown>>
  : {
      [Type in RegisteredWidgetType]: BaseWidgetConfig<Type, WidgetPropsRegistry[Type]>;
    }[RegisteredWidgetType];

export type WidgetMap = Partial<Record<string, RegisteredWidgetConfig>>;
