# 06e Binding Distribution Anomaly And Relationship Types

Load this file for distribution, anomaly/risk, relationship, basic-chart, and specialized-chart binding contracts.

```ts
type DistributionAnalysisEvidenceBinding = {
  distributionMode:
    | 'numeric-distribution'
    | 'interval-distribution'
    | 'density-distribution'
    | 'quantile-distribution'
    | 'boxplot-distribution'
    | 'spatial-distribution'
    | 'time-distribution'
    | 'comparison-distribution'
    | 'multidimensional-distribution';
  metricId: string;
  metricName: string;
  unit: string;
  sampleGrain: string;
  sampleCountField: string;
  valueField?: string;
  weightField?: string;
  bucketFields?: {
    bucketIdField: string;
    bucketLabelField: string;
    lowerBoundField?: string;
    upperBoundField?: string;
    countField: string;
    shareField?: string;
    cumulativeCountField?: string;
    cumulativeShareField?: string;
    sortField?: string;
  };
  densityFields?: {
    xField: string;
    densityField: string;
    bandwidthField?: string;
    estimatorField?: string;
    groupField?: string;
  };
  quantileFields?: {
    percentileField?: string;
    percentileValueField?: string;
    q1Field?: string;
    medianField?: string;
    q3Field?: string;
    p10Field?: string;
    p25Field?: string;
    p75Field?: string;
    p90Field?: string;
  };
  boxplotFields?: {
    categoryField: string;
    minField: string;
    q1Field: string;
    medianField: string;
    q3Field: string;
    maxField: string;
    outlierField?: string;
    whiskerRuleField?: string;
  };
  heatmapFields?: {
    xField: string;
    yField: string;
    valueField: string;
    missingPolicy: 'missing-as-null' | 'missing-as-zero' | 'explicit-empty-cell';
  };
  geographyFields?: {
    geoIdField?: string;
    geoNameField?: string;
    lonField?: string;
    latField?: string;
    mapResource?: string;
  };
  comparisonFields?: {
    groupField?: string;
    baselineField?: string;
    deltaField?: string;
    deltaRateField?: string;
  };
  intervalPolicy?: 'equal-width' | 'quantile' | 'business-rule' | 'api-provided' | 'custom';
  missingValuePolicy:
    | 'missing-as-null'
    | 'missing-as-zero'
    | 'explicit-empty-cell'
    | 'exclude-with-disclosure';
  zeroValuePolicy: 'true-zero' | 'empty-zero' | 'exclude-zero' | 'domain-defined';
  outOfRangePolicy:
    | 'clip-to-domain'
    | 'show-overflow-bucket'
    | 'mark-as-outlier'
    | 'exclude-with-disclosure';
  densityPolicy?: 'kde' | 'histogram-smoothed' | 'hexbin' | 'precomputed-density' | 'none';
  tooltipPayload: string[];
  detailAction?: string;
  exportFields?: string[];
};

type AnomalyAnalysisEvidenceBinding = {
  anomalyObjectType:
    | 'metric'
    | 'order'
    | 'request'
    | 'server'
    | 'region'
    | 'user'
    | 'service'
    | 'indicator'
    | 'risk-event'
    | 'warning'
    | 'outlier-point'
    | 'project-defined';
  anomalyIdField?: string;
  objectIdField?: string;
  objectNameField?: string;
  severityField: string;
  severityDictionary: string[];
  statusField?: string;
  statusDictionary?: string[];
  currentValueField?: string;
  unit?: string;
  baselineValueField?: string;
  deltaField?: string;
  deltaRateField?: string;
  directionRule?: 'higher-is-worse' | 'lower-is-worse' | 'outside-band-is-worse' | 'domain-defined';
  thresholdFields?: {
    warningThresholdField?: string;
    highThresholdField?: string;
    mediumThresholdField?: string;
    lowThresholdField?: string;
    thresholdUnit?: string;
    thresholdRule?: string;
    intervalLabelField?: string;
    lowerBoundField?: string;
    upperBoundField?: string;
  };
  timeFields?: {
    firstSeenAtField?: string;
    occurredAtField?: string;
    updatedAtField?: string;
    durationField?: string;
    timeGrain?: string;
    sortRule?: string;
  };
  impactFields?: {
    affectedUserField?: string;
    affectedOrderField?: string;
    affectedServiceField?: string;
    lossAmountField?: string;
    impactScoreField?: string;
    durationField?: string;
  };
  distributionFields?: {
    categoryField?: string;
    countField?: string;
    shareField?: string;
    totalField?: string;
    denominatorPolicy?: string;
  };
  timelineFields?: {
    eventIdField: string;
    eventTimeField: string;
    eventTitleField: string;
    eventStatusField: string;
    eventDetailField?: string;
  };
  rankingFields?: {
    rankField?: string;
    valueField: string;
    tieBreakFields?: string[];
    visibleLimit: number;
  };
  relationFields?: {
    nodeIdField?: string;
    nodeNameField?: string;
    nodeTypeField?: string;
    edgeSourceField?: string;
    edgeTargetField?: string;
    edgeWeightField?: string;
    relationDirection?: 'directed' | 'undirected' | 'mixed';
  };
  geoFields?: {
    regionIdField?: string;
    regionNameField?: string;
    geoCodeField?: string;
    lonField?: string;
    latField?: string;
    mapResource?: string;
    missingGeoPolicy?: string;
  };
  responseFields?: {
    ownerField?: string;
    actionField?: string;
    actionStatusField?: string;
    resolvedAtField?: string;
    slaField?: string;
  };
  tooltipPayload: string[];
  detailAction: string;
  exportFields?: string[];
  validationCases: string[];
};

type RelationshipAnalysisEvidenceBinding = {
  relationshipAnalysisCardPattern: RelationshipAnalysisCardPattern;
  relationTask:
    | 'correlation'
    | 'association'
    | 'influence'
    | 'dependency'
    | 'cooccurrence'
    | 'similarity'
    | 'flow'
    | 'community'
    | 'hierarchy'
    | 'pair-audit';
  entityGrain: string;
  sourceEntityFields?: string[];
  targetEntityFields?: string[];
  nodeFields?: string[];
  edgeFields?: string[];
  pairFields?: string[];
  metricFields: string[];
  strengthField?: string;
  directionField?: string;
  methodField?: string;
  timeField?: string;
  groupField?: string;
  thresholdRule?: string;
  densityLimit: string;
  labelRule: string;
  tooltipPayload: string[];
  exactValueRoute: string;
  localControls?: string[];
  rendererOwner: 'echarts' | 'antv-s2' | 'project-table' | 'data-driven-custom-diagram';
  fallback: string;
};

type BasicChartCardPattern =
  | 'single-series-bar-card'
  | 'comparison-line-trend-card'
  | 'area-trend-card'
  | 'bar-line-combo-card'
  | 'pie-composition-card'
  | 'donut-composition-card'
  | 'stacked-bar-composition-card'
  | 'multi-metric-combo-card'
  | 'filtered-bar-card'
  | 'tooltip-line-trend-card';

type SpecializedChartCardPattern =
  | 'gauge-progress-card'
  | 'choropleth-ranking-map-card'
  | 'time-heatmap-card'
  | 'candlestick-volume-card'
  | 'boxplot-distribution-card'
  | 'parallel-profile-card'
  | 'bubble-opportunity-card';

```
