# 04a3 KPI Card Data Contract

Load this file when the KPI card needs implementation-ready field binding, formulas, tooltip payloads, numeric display contracts, or anti-AI data proof.

## Data Contract

Implementation-ready KPI cards require these fields unless explicitly scoped out:

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

type KpiJudgmentBand = {
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

type KpiOverviewMetricItem = {
  metricId: string;
  metricName: string;
  valueField: string;
  unit: string;
  valueType: string;
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

type KpiCardContract = {
  kpiCardPattern: KpiCardPattern;
  kpiCardOrientation?: KpiCardOrientation;
  kpiAxisLineEvidenceMode?: KpiAxisLineEvidenceMode;
  kpiAxisBarEvidenceMode?: KpiAxisBarEvidenceMode;
  kpiScatterEvidenceMode?: KpiScatterEvidenceMode;
  kpiMapEvidenceMode?: KpiMapEvidenceMode;
  kpiComparisonEvidenceMode?: KpiComparisonEvidenceMode;
  kpiSingleIndicatorLayoutMode?: KpiSingleIndicatorLayoutMode;
  kpiOverviewCardPattern?: KpiOverviewCardPattern;
  kpiJudgmentCardPattern?: KpiJudgmentCardPattern;
  kpiGoalExecutionCardPattern?: KpiGoalExecutionCardPattern;
  kpiTimeSeriesCardPattern?: KpiTimeSeriesCardPattern;
  kpiComparisonAnalysisCardPattern?: KpiComparisonAnalysisCardPattern;
  kpiComparisonAnalysisEvidenceMode?: KpiComparisonAnalysisEvidenceMode;
  metricId: string;
  metricName: string;
  valueField: string;
  unit: string;
  periodField?: string;
  valueType: string;
  numericFormatContractId: string;
  comparisonFields?: Array<'yoy' | 'mom' | 'baseline' | 'targetGap' | 'status'>;
  targetField?: string;
  attainmentRateField?: string;
  thresholdField?: string;
  warningReasonField?: string;
  previousValueField?: string;
  currentValueField?: string;
  ppDeltaField?: string;
  localControlFields?: string[];
  trendDatasetId?: string;
  trendCategoryField?: string;
  trendValueField?: string;
  trendXAxisField?: string;
  trendYAxisUnit?: string;
  trendComparisonSeriesFields?: string[];
  trendTargetValueField?: string;
  trendReferenceFields?: string[];
  trendThresholdBandFields?: string[];
  trendPhaseAnnotationFields?: string[];
  temporalAnalysisKind?: 'trend' | 'change' | 'yoy-mom' | 'cycle' | 'volatility' | 'forecast';
  temporalDirection?: 'higher-better' | 'lower-better' | 'range-target' | 'neutral';
  temporalGrainField?: string;
  temporalLatestPeriodField?: string;
  temporalBaselineLabelField?: string;
  temporalBaselineValueField?: string;
  temporalDeltaValueField?: string;
  temporalDeltaRateField?: string;
  temporalYoyValueField?: string;
  temporalYoyRateField?: string;
  temporalMomValueField?: string;
  temporalMomRateField?: string;
  temporalPriorYearComparableValueField?: string;
  temporalPriorPeriodValueField?: string;
  cycleGrainField?: string;
  cyclePeriodStartField?: string;
  cyclePeriodEndField?: string;
  cycleCurrentIndexField?: string;
  cycleTotalCountField?: string;
  cycleProgressField?: string;
  cyclePhaseStatusField?: string;
  volatilityFormula?: string;
  volatilityRateField?: string;
  volatilityLevelField?: string;
  volatilityMaxField?: string;
  volatilityMinField?: string;
  volatilityStdDevField?: string;
  volatilityThresholdBandFields?: string[];
  forecastDatasetId?: string;
  forecastStartField?: string;
  forecastEndField?: string;
  forecastHorizonField?: string;
  forecastValueField?: string;
  forecastLowerBoundField?: string;
  forecastUpperBoundField?: string;
  forecastStatusField?: string;
  temporalFooterEvidenceFields?: string[];
  comparisonAnalysisKind?: 'direct' | 'group' | 'competitor' | 'benchmark' | 'variance';
  comparisonDirection?: 'higher-better' | 'lower-better' | 'range-target' | 'neutral';
  comparisonSubjectDatasetId?: string;
  comparisonSubjectIdField?: string;
  comparisonSubjectNameField?: string;
  comparisonSubjectRoleField?: string;
  comparisonPrimarySubjectIdField?: string;
  comparisonBaselineSubjectIdField?: string;
  comparisonGroupField?: string;
  comparisonSegmentField?: string;
  comparisonCompetitorRoleField?: string;
  comparisonMetricFields?: string[];
  comparisonValueFields?: string[];
  comparisonBaselineValueField?: string;
  comparisonDeltaValueField?: string;
  comparisonDeltaRateField?: string;
  comparisonRankField?: string;
  comparisonShareField?: string;
  comparisonMarketTotalField?: string;
  comparisonBenchmarkSourceField?: string;
  comparisonBenchmarkValueField?: string;
  comparisonBenchmarkLabelField?: string;
  comparisonP50Field?: string;
  comparisonP75Field?: string;
  comparisonP90Field?: string;
  comparisonPercentileField?: string;
  comparisonIndustryAverageField?: string;
  comparisonVarianceValueField?: string;
  comparisonVarianceRateField?: string;
  comparisonSortRule?: string;
  comparisonVisibleSubjectLimit?: number;
  comparisonFooterEvidenceFields?: string[];
  barDatasetId?: string;
  barCategoryField?: string;
  barValueField?: string;
  barXAxisUnit?: string;
  barComparisonSeriesFields?: string[];
  barTargetValueField?: string;
  barReferenceFields?: string[];
  barThresholdFields?: string[];
  barChangeRateField?: string;
  barSortRule?: string;
  barVisibleLimit?: number;
  scatterDatasetId?: string;
  scatterObjectIdField?: string;
  scatterObjectNameField?: string;
  scatterXField?: string;
  scatterYField?: string;
  scatterXUnit?: string;
  scatterYUnit?: string;
  scatterSizeField?: string;
  scatterColorField?: string;
  scatterTrendlineField?: string;
  scatterReferenceFields?: string[];
  scatterThresholdFields?: string[];
  scatterQuadrantFields?: string[];
  scatterPointLimit?: number;
  mapDatasetId?: string;
  mapRegionCodeField?: string;
  mapRegionNameField?: string;
  mapValueField?: string;
  mapVisualMapField?: string;
  mapPointDatasetId?: string;
  mapPointLonField?: string;
  mapPointLatField?: string;
  mapPointValueField?: string;
  mapCategoryField?: string;
  mapProjection?: string;
  mapResource?: string;
  mapLegendFields?: string[];
  comparisonBaselineField?: string;
  comparisonValueFields?: string[];
  comparisonPaneFields?: string[];
  comparisonConclusionField?: string;
  singleIndicatorEvidenceVisual?: 'sparkline' | 'mini-bars' | 'ring' | 'area-sparkline' | 'semi-gauge';
  singleIndicatorControlType?: 'period-dropdown' | 'grain-segmented' | 'unit-toggle' | 'scale-toggle';
  singleIndicatorControlOptions?: string[];
  singleIndicatorSelectedControlField?: string;
  singleIndicatorProgressTrack?: boolean;
  overviewTopic?: string;
  overviewLeadMetricId?: string;
  overviewMetrics?: KpiOverviewMetricItem[];
  overviewLocalControlType?:
    | 'period-segmented'
    | 'period-dropdown'
    | 'metric-segmented'
    | 'unit-scale-segmented'
    | 'overflow-menu';
  overviewLocalControlFields?: string[];
  overviewVisibleMetricLimit?: number;
  overviewExactValueRoute?: string;
  judgmentKind?: 'status' | 'health' | 'rating' | 'score' | 'gauge' | 'risk' | 'progress';
  judgmentStatusField?: string;
  judgmentScoreField?: string;
  judgmentScoreRange?: [number, number];
  judgmentLevelField?: string;
  judgmentBands?: KpiJudgmentBand[];
  judgmentThresholdFields?: string[];
  judgmentDirection?: 'higher-better' | 'lower-better' | 'range-target' | 'status-enum';
  judgmentHeroVisual?:
    | 'semantic-icon'
    | 'ring'
    | 'semi-gauge'
    | 'bullet-range'
    | 'dimension-bars'
    | 'rating-stars'
    | 'rating-distribution';
  judgmentDimensionDatasetId?: string;
  judgmentDimensionNameField?: string;
  judgmentDimensionScoreField?: string;
  judgmentRatingDistributionFields?: string[];
  judgmentFooterEvidenceFields?: string[];
  goalExecutionKind?: 'attainment' | 'gap' | 'progress' | 'milestone';
  goalDirection?: 'higher-better' | 'lower-better' | 'range-target' | 'schedule-target';
  goalActualField?: string;
  goalTargetField?: string;
  goalAttainmentRateField?: string;
  goalGapField?: string;
  goalGapRateField?: string;
  goalRemainingField?: string;
  goalDeadlineField?: string;
  goalDueStatusField?: string;
  goalPlanProgressField?: string;
  goalActualProgressField?: string;
  goalProgressDeltaField?: string;
  goalRemainingTimeField?: string;
  goalMilestoneBinding?: KpiGoalMilestoneBinding;
  goalHeroVisual?:
    | 'ring'
    | 'semi-gauge'
    | 'linear-progress'
    | 'target-actual-bars'
    | 'dot-strip'
    | 'stepper'
    | 'timeline'
    | 'cumulative-line';
  goalFooterEvidenceFields?: string[];
  sourceField?: string;
  freshnessField?: string;
  drilldownAction?: string;
  tooltipPayload: string[];
  stateRules: string[];
};
```

Do not store dynamic KPI values, rankings, status lights, or percentages in filter option `meta`. KPI values must come from business fact datasets, aggregate datasets, or resolvers with declared grain and filters.
