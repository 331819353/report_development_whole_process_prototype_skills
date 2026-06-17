# 06c Binding KPI Pattern Types

Load this file for KPI, target/actual, table, and detail-evidence pattern enums and KPI helper bindings.

```ts
type KpiCardPattern =
  | 'plain-metric'
  | 'target-wave'
  | 'mini-bar-trend'
  | 'highlight-line-trend'
  | 'horizontal-trend-compare'
  | 'horizontal-axis-line-trend'
  | 'horizontal-axis-bar-compare'
  | 'horizontal-axis-scatter-diagnostic'
  | 'horizontal-spatial-map-diagnostic'
  | 'paired-comparison-diagnostic'
  | 'horizontal-ring-progress'
  | 'horizontal-target-progress'
  | 'horizontal-status-trend-compare'
  | 'horizontal-grain-bar-switch'
  | 'horizontal-period-summary-strip'
  | 'horizontal-pp-assist-info'
  | 'horizontal-warning-status-band';

type KpiCardOrientation =
  | 'portrait'
  | 'landscape'
  | 'compact-row'
  | 'wide-banner';

type KpiAxisLineEvidenceMode =
  | 'basic-compare-line'
  | 'filled-baseline-line'
  | 'target-reference-line'
  | 'phase-annotated-line'
  | 'unit-axis-line'
  | 'grain-switch-line'
  | 'dual-comparison-line'
  | 'threshold-band-line';

type KpiAxisBarEvidenceMode =
  | 'basic-horizontal-bar'
  | 'period-comparison-bar'
  | 'target-reference-bar'
  | 'category-change-sidebar-bar'
  | 'time-series-horizontal-bar'
  | 'grain-switch-horizontal-bar'
  | 'dual-series-horizontal-bar'
  | 'threshold-warning-bar';

type KpiScatterEvidenceMode =
  | 'correlation-trendline-scatter'
  | 'mean-reference-scatter'
  | 'target-crosshair-scatter'
  | 'distribution-change-band-scatter'
  | 'threshold-quadrant-scatter'
  | 'dual-series-trendline-scatter'
  | 'change-callout-scatter'
  | 'category-quadrant-scatter';

type KpiMapEvidenceMode =
  | 'choropleth-heat-map'
  | 'graded-choropleth-map'
  | 'bubble-target-gap-map'
  | 'distribution-change-marker-map'
  | 'column-symbol-map'
  | 'annotated-interval-map'
  | 'yoy-change-zone-map'
  | 'point-category-summary-map';

type KpiComparisonEvidenceMode =
  | 'metric-yoy-vs'
  | 'progress-mom-vs'
  | 'target-gap-progress-vs'
  | 'improvement-dot-matrix-vs'
  | 'trend-yoy-vs'
  | 'structure-breakdown-vs'
  | 'percentage-ring-vs'
  | 'trend-mom-vs';

type KpiSingleIndicatorLayoutMode =
  | 'dropdown-sparkline-progress'
  | 'unit-toggle-ring-progress'
  | 'dropdown-minibar-progress'
  | 'grain-switch-minibar-progress'
  | 'dropdown-area-sparkline-progress'
  | 'scale-toggle-area-progress'
  | 'dropdown-gauge-progress';

type KpiOverviewCardPattern =
  | 'lead-metric-comparison-sparkline-overview'
  | 'multi-metric-strip-progress-overview'
  | 'domain-metric-cluster-progress-overview';

type KpiJudgmentCardPattern =
  | 'semantic-status-icon-card'
  | 'progress-status-ring-card'
  | 'health-score-ring-card'
  | 'health-threshold-bullet-card'
  | 'health-dimension-breakdown-card'
  | 'rating-score-summary-card'
  | 'rating-distribution-card'
  | 'semicircle-gauge-target-card';

type KpiGoalExecutionCardPattern =
  | 'attainment-ring-summary-card'
  | 'attainment-gauge-deadline-card'
  | 'attainment-linear-target-card'
  | 'attainment-unit-progress-card'
  | 'gap-gauge-deficit-card'
  | 'gap-target-actual-compare-card'
  | 'progress-plan-actual-card'
  | 'milestone-timeline-card';

type KpiTimeSeriesCardPattern =
  | 'trend-line-target-card'
  | 'change-baseline-delta-card'
  | 'yoy-mom-comparison-card'
  | 'cycle-period-progress-card'
  | 'volatility-stat-card'
  | 'forecast-interval-card';

type TimePatternCardPattern =
  | 'calendar-rhythm-overview-card'
  | 'calendar-schedule-lane-card'
  | 'period-cycle-summary-card'
  | 'period-progress-status-card'
  | 'time-slot-trend-card'
  | 'time-slot-share-card'
  | 'weekday-hour-heatmap-card'
  | 'cumulative-time-curve-card'
  | 'period-comparison-overlay-card'
  | 'peak-valley-diagnostic-card'
  | 'peak-valley-warning-forecast-card';

type KpiComparisonAnalysisCardPattern =
  | 'direct-value-compare-card'
  | 'group-segment-compare-card'
  | 'competitor-position-card'
  | 'benchmark-position-card'
  | 'variance-gap-card';

type KpiComparisonAnalysisEvidenceMode =
  | 'side-by-side-values'
  | 'grouped-bars'
  | 'stacked-distribution'
  | 'multi-series-trend'
  | 'market-share-donut'
  | 'radar-profile'
  | 'benchmark-ruler'
  | 'variance-gauge'
  | 'nps-score-scale'
  | 'comparison-table'
  | 'map-table-compare';

type KpiJudgmentBandBinding = {
  label: string;
  minField?: string;
  maxField?: string;
  colorRole: 'success' | 'info' | 'warning' | 'danger' | 'neutral' | 'domain';
  statusKind: 'healthy' | 'normal' | 'progress' | 'warning' | 'risk' | 'failed' | 'unknown';
};

type KpiGoalMilestoneBinding = {
  milestoneDatasetId: string;
  nameField: string;
  statusField: string;
  dateField?: string;
  orderField?: string;
  currentMilestoneField?: string;
  dueDateField?: string;
};

type KpiOverviewMetricBinding = {
  metricId: string;
  metricName: string;
  valueField: string;
  unit: string;
  numericFormatContractId: string;
  comparisonFields?: Array<'yoy' | 'mom' | 'baseline' | 'targetGap' | 'status'>;
  targetField?: string;
  attainmentRateField?: string;
  progressTrackField?: string;
  evidenceVisual?: 'none' | 'sparkline' | 'mini-bars' | 'progress-track' | 'semantic-icon';
  trendDatasetId?: string;
  trendCategoryField?: string;
  trendValueField?: string;
  tooltipPayload: string[];
};

type TargetActualCardPattern =
  | 'standard-summary-panel'
  | 'emphasis-header-summary'
  | 'soft-chip-summary';

type TargetActualTrendCardPattern =
  | 'emphasis-wave-trend'
  | 'standard-summary-trend'
  | 'soft-chip-trend';

type TargetActualRadarCardPattern =
  | 'emphasis-wave-radar'
  | 'standard-action-radar';

type TargetActualDonutCardPattern =
  | 'emphasis-filter-donut'
  | 'standard-filter-donut';

type TargetActualScatterCardPattern =
  | 'emphasis-filter-scatter'
  | 'standard-filter-scatter';

type TargetActualTablePattern =
  | 'standard-audit-table'
  | 'compact-audit-table';

type TargetActualPivotTablePattern =
  | 'standard-hierarchy-pivot'
  | 'share-matrix-pivot'
  | 'tree-expand-pivot';

type TableCardPattern =
  | 'plain-detail-ledger-table'
  | 'filtered-operational-status-table'
  | 'grouped-header-summary-table'
  | 'metric-matrix-table'
  | 's2-cross-pivot-table'
  | 'fixed-column-scroll-table'
  | 'grouped-subtotal-summary-table'
  | 'tree-hierarchy-table';

type DetailEvidenceCardPattern =
  | 'summary-detail-table-card'
  | 'metric-trend-detail-card'
  | 'composition-drilldown-card'
  | 'hierarchy-drilldown-card'
  | 'record-list-detail-card'
  | 'object-media-detail-list-card'
  | 'subject-initial-list-card'
  | 'sample-basic-info-card'
  | 'sample-process-trace-card'
  | 'sample-result-overview-card'
  | 'sample-related-record-card'
  | 'log-summary-table-card'
  | 'access-log-table-card'
  | 'security-audit-log-card'
  | 'task-timeline-detail-card';

```
