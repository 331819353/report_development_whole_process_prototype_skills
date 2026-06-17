# 06d Binding Ranking Composition And Driver Types

Load this file for ranking, Pareto, composition/share, decomposition/attribution, and their evidence bindings.

```ts
type RankingCardPattern =
  | 'basic-rank-list-card'
  | 'trend-delta-rank-list-card'
  | 'progress-bar-rank-list-card'
  | 'podium-rank-card'
  | 'yoy-microbar-rank-list-card'
  | 'radar-comparison-rank-card'
  | 'metric-summary-rank-card'
  | 'time-switch-rank-card'
  | 'share-donut-rank-card'
  | 'map-distribution-rank-card'
  | 'topn-bar-rank-card'
  | 'topn-comparison-rank-card'
  | 'topn-waterfall-strip-card'
  | 'topn-sparkline-rank-list-card'
  | 'topn-bubble-rank-card'
  | 'topn-icon-card-grid'
  | 'medal-horizontal-ranking'
  | 'bar-progress-ranking'
  | 'compact-list-ranking';

type ParetoCardPattern =
  | 'pareto-basic-card'
  | 'pareto-table-chart-card'
  | 'pareto-dual-axis-card'
  | 'pareto-cumulative-fill-card'
  | 'pareto-stacked-share-card'
  | 'pareto-bubble-card'
  | 'pareto-zone-card'
  | 'pareto-ring-list-card';

type CompositionShareCardPattern =
  | 'basic-donut-share-card'
  | 'donut-detail-share-card'
  | 'percent-bar-share-card'
  | 'multi-ring-hierarchy-share-card'
  | 'share-trend-stack-card'
  | 'share-ranking-topn-card'
  | 'treemap-composition-card'
  | 'share-metrics-summary-card'
  | 'stacked-strip-composition-card'
  | 'stacked-column-trend-composition-card'
  | 'funnel-composition-card'
  | 'bubble-composition-card'
  | 'market-share-overview-card'
  | 'market-share-concentration-card'
  | 'share-distribution-interval-card'
  | 'map-structure-card'
  | 'sunburst-structure-card';

type DecompositionAttributionCardPattern =
  | 'formula-decomposition-card'
  | 'funnel-decomposition-card'
  | 'tree-decomposition-card'
  | 'sankey-decomposition-card'
  | 'driver-factor-decomposition-card'
  | 'variance-waterfall-decomposition-card'
  | 'combined-decomposition-card'
  | 'multilevel-metric-decomposition-card'
  | 'total-attribution-card'
  | 'funnel-attribution-card'
  | 'channel-attribution-donut-card'
  | 'touchpoint-attribution-list-card'
  | 'segment-attribution-card'
  | 'feature-attribution-bar-card'
  | 'time-attribution-waterfall-card'
  | 'multidimensional-attribution-matrix-card'
  | 'overall-contribution-card'
  | 'contribution-waterfall-card'
  | 'contribution-structure-card'
  | 'contribution-comparison-card'
  | 'contribution-trend-card'
  | 'contribution-tree-card'
  | 'key-contribution-topn-card'
  | 'contribution-heatmap-card'
  | 'progressive-hierarchy-decomposition-card'
  | 'hierarchy-tree-decomposition-card'
  | 'hierarchy-waterfall-card'
  | 'indented-hierarchy-table-card'
  | 'hierarchy-share-card'
  | 'path-contribution-card'
  | 'multilevel-comparison-hierarchy-card'
  | 'target-attainment-hierarchy-attribution-card';

type DistributionAnalysisCardPattern =
  | 'numeric-histogram-distribution-card'
  | 'interval-donut-distribution-card'
  | 'percentile-cdf-distribution-card'
  | 'geographic-distribution-card'
  | 'time-distribution-card'
  | 'distribution-comparison-card'
  | 'calendar-heatmap-distribution-card'
  | 'multidimensional-population-distribution-card'
  | 'interval-histogram-card'
  | 'interval-share-donut-card'
  | 'interval-boxplot-card'
  | 'interval-comparison-card'
  | 'interval-stacked-trend-card'
  | 'cumulative-interval-card'
  | 'interval-scatter-strip-card'
  | 'interval-detail-table-card'
  | 'univariate-density-curve-card'
  | 'interval-density-curve-card'
  | 'grouped-density-comparison-card'
  | 'density-heatmap-card'
  | 'kde-cumulative-density-card'
  | 'bivariate-density-hexbin-card'
  | 'quantile-band-density-card'
  | 'density-overview-card'
  | 'boxplot-kpi-summary-card'
  | 'time-series-boxplot-card'
  | 'grouped-boxplot-comparison-card'
  | 'boxplot-overview-card'
  | 'boxplot-side-summary-card'
  | 'weekday-boxplot-card'
  | 'anomaly-boxplot-card'
  | 'boxplot-detail-table-card';

type AnomalyAnalysisCardPattern =
  | 'anomaly-overview-card'
  | 'anomaly-trend-compare-card'
  | 'anomaly-distribution-structure-card'
  | 'anomaly-interval-threshold-card'
  | 'anomaly-timeline-card'
  | 'anomaly-ranking-top-card'
  | 'anomaly-impact-assessment-card'
  | 'anomaly-baseline-compare-card'
  | 'anomaly-summary-table-card'
  | 'anomaly-multi-metric-monitor-card'
  | 'risk-matrix-card'
  | 'risk-response-status-card'
  | 'anomaly-relation-influence-card'
  | 'anomaly-geographic-distribution-card'
  | 'outlier-scatter-card'
  | 'warning-progress-donut-card';

type RankingEvidenceBinding = {
  rankingMode: 'leaderboard' | 'top-n' | 'bottom-n' | 'rank-comparison' | 'rank-distribution' | 'spatial-rank';
  metricId: string;
  metricName: string;
  unit: string;
  topN: number;
  visibleCount: number;
  rankingOrder: 'desc' | 'asc';
  rankField: string;
  objectIdField: string;
  objectNameField: string;
  objectSecondaryField?: string;
  valueField: string;
  shareField?: string;
  denominatorField?: string;
  comparisonField?: string;
  deltaField?: string;
  deltaRateField?: string;
  targetField?: string;
  progressField?: string;
  trendSeriesField?: string;
  scoreDimensionFields?: string[];
  geographyFields?: string[];
  periodField?: string;
  tieBreakFields: string[];
  totalPolicy: 'all-filtered-rows' | 'visible-top-n' | 'api-provided-total';
  badgeRule: 'top3-medals' | 'rank-circles' | 'plain-rank' | 'brand-icons';
  overflowStrategy: 'view-all' | 'pagination' | 'drawer' | 'table-fallback' | 'scroll';
  tooltipPayload: string[];
  detailAction?: string;
};

type ParetoEvidenceBinding = {
  metricId: string;
  metricName: string;
  unit: string;
  itemIdField: string;
  itemNameField: string;
  rankField: string;
  valueField: string;
  totalField: string;
  contributionShareField: string;
  cumulativeValueField: string;
  cumulativeShareField: string;
  thresholdShare: number;
  keyFactorFlagField: string;
  boundaryItemField?: string;
  longTailField?: string;
  tieBreakFields: string[];
  otherAggregationPolicy: 'aggregate-tail' | 'show-tail-gray' | 'drawer-detail' | 'table-fallback';
  tooltipPayload: string[];
  detailAction?: string;
};

type CompositionShareEvidenceBinding = {
  compositionMode: 'share' | 'composition' | 'structure' | 'market-share' | 'concentration' | 'distribution';
  metricId: string;
  metricName: string;
  unit: string;
  categoryIdField: string;
  categoryNameField: string;
  valueField: string;
  totalField: string;
  shareField: string;
  denominatorPolicy: 'all-filtered-rows' | 'api-total' | 'visible-total' | 'declared-market-total' | 'parent-total';
  orderRule: 'value-desc' | 'business-order' | 'time-order' | 'hierarchy-order';
  otherPolicy: 'topn-plus-other' | 'small-slice-merge' | 'none' | 'blocked';
  topN?: number;
  parentIdField?: string;
  parentNameField?: string;
  levelField?: string;
  parentValueField?: string;
  parentShareField?: string;
  totalShareField?: string;
  childShareField?: string;
  timeField?: string;
  comparisonValueField?: string;
  comparisonShareField?: string;
  deltaShareField?: string;
  concentrationFields?: {
    cr1Field?: string;
    cr3Field?: string;
    cr5Field?: string;
    hhiField?: string;
    otherShareField?: string;
  };
  distributionFields?: {
    bucketField: string;
    bucketSortField: string;
    countField: string;
    bucketShareField: string;
  };
  geoField?: string;
  lonField?: string;
  latField?: string;
  tooltipPayload: string[];
  detailAction?: string;
};

type DecompositionAttributionEvidenceBinding = {
  decompositionMode:
    | 'formula'
    | 'driver'
    | 'attribution'
    | 'contribution'
    | 'variance'
    | 'hierarchy'
    | 'path'
    | 'matrix';
  metricId: string;
  metricName: string;
  unit: string;
  rootMetricId?: string;
  rootValueField: string;
  baselineValueField?: string;
  currentValueField?: string;
  targetValueField?: string;
  attainmentRateField?: string;
  formulaText?: string;
  formulaOperatorField?: string;
  nodeDatasetId?: string;
  nodeIdField?: string;
  nodeNameField?: string;
  parentIdField?: string;
  levelField?: string;
  pathField?: string;
  orderField?: string;
  valueField: string;
  comparisonValueField?: string;
  deltaValueField?: string;
  deltaRateField?: string;
  contributionValueField?: string;
  contributionRateField?: string;
  shareField?: string;
  parentShareField?: string;
  totalShareField?: string;
  directionField?: string;
  signRule: 'positive-is-good' | 'negative-is-good' | 'signed-neutral' | 'domain-defined';
  attributionMethod?: 'first-touch' | 'last-touch' | 'linear' | 'position-based' | 'shapley' | 'rule-based' | 'model-based' | 'domain-defined';
  reconciliationPolicy: 'must-equal-root' | 'allow-residual' | 'non-additive-explained' | 'model-estimate';
  residualField?: string;
  otherPolicy?: 'topn-plus-other' | 'small-item-merge' | 'show-residual' | 'none';
  stageField?: string;
  sourceField?: string;
  targetField?: string;
  linkValueField?: string;
  timeField?: string;
  rowDimensionField?: string;
  columnDimensionField?: string;
  confidenceField?: string;
  tooltipPayload: string[];
  detailAction?: string;
};

```
