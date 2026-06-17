# 06f Binding Profile Spatial Process And Matrix Types

Load this file for multidimensional profile, population/object, spatial, flow/process/conversion, and matrix-decision binding contracts.

```ts
type MultiDimensionalFeatureCardPattern =
  | 'object-profile-summary-card'
  | 'radar-feature-profile-card'
  | 'radar-feature-compare-card'
  | 'dimension-score-breakdown-card'
  | 'feature-trend-profile-card'
  | 'feature-comparison-matrix-card'
  | 'feature-bubble-comparison-card'
  | 'tag-taxonomy-overview-card'
  | 'tag-status-board-card'
  | 'tag-cloud-profile-card'
  | 'tag-rule-detail-card';

type MultiDimensionalFeatureEvidenceBinding = {
  multiDimensionalTask:
    | 'object-profile'
    | 'feature-profile'
    | 'profile-compare'
    | 'feature-breakdown'
    | 'tag-taxonomy'
    | 'tag-status'
    | 'tag-cloud'
    | 'tag-detail';
  objectGrain?: string;
  objectIdField?: string;
  objectNameField?: string;
  objectTypeField?: string;
  dimensionDatasetId?: string;
  dimensionIdField?: string;
  dimensionNameField?: string;
  dimensionOrderField?: string;
  scoreField?: string;
  rawValueField?: string;
  unitField?: string;
  scaleMin?: number;
  scaleMax?: number;
  scaleMode?: 'shared-score' | 'standardized-score' | 'raw-same-unit' | 'blocked';
  comparisonFields?: string[];
  targetFields?: string[];
  tagDatasetId?: string;
  tagIdField?: string;
  tagNameField?: string;
  tagGroupField?: string;
  tagStatusField?: string;
  tagStrengthField?: string;
  tagCoverageField?: string;
  tagRuleFields?: string[];
  metricFields?: string[];
  periodField?: string;
  sourceField?: string;
  freshnessField?: string;
  densityLimit: string;
  labelRule: string;
  tooltipPayload: string[];
  exactValueRoute: string;
  localControls?: string[];
  rendererOwner: 'echarts' | 'project-table' | 'antv-s2' | 'project-list' | 'project-tag-component';
  fallback: string;
  validationCases: string[];
};

type PopulationObjectCardPattern =
  | 'population-profile-overview-card'
  | 'population-segment-composition-card'
  | 'population-rfm-matrix-card'
  | 'population-lifecycle-stage-card'
  | 'population-behavior-preference-card'
  | 'population-channel-source-card'
  | 'population-geographic-distribution-card'
  | 'population-consumption-frequency-card'
  | 'population-churn-risk-card'
  | 'object-basic-info-card'
  | 'object-key-metrics-card'
  | 'object-structure-distribution-card'
  | 'object-geographic-coverage-card'
  | 'object-relationship-network-card'
  | 'object-behavior-timeline-card'
  | 'object-value-score-card'
  | 'object-risk-alert-card';

type PopulationObjectEvidenceBinding = {
  populationObjectTask:
    | 'population-profile'
    | 'segment-structure'
    | 'rfm-segmentation'
    | 'lifecycle-stage'
    | 'behavior-preference'
    | 'channel-source'
    | 'geo-distribution'
    | 'frequency-segmentation'
    | 'churn-risk'
    | 'object-detail'
    | 'object-kpi'
    | 'object-structure'
    | 'object-relationship'
    | 'object-timeline'
    | 'object-value-score'
    | 'object-risk';
  objectGrain:
    | 'user'
    | 'customer'
    | 'member'
    | 'account'
    | 'store'
    | 'channel'
    | 'supplier'
    | 'product'
    | 'service'
    | 'project-defined';
  objectIdField?: string;
  objectNameField?: string;
  objectTypeField?: string;
  objectStatusField?: string;
  segmentIdField?: string;
  segmentNameField?: string;
  populationCountField?: string;
  totalField?: string;
  shareField?: string;
  denominatorPolicy?:
    | 'all-filtered-rows'
    | 'api-total'
    | 'visible-total'
    | 'selected-object-total'
    | 'declared-market-total';
  metricFields?: string[];
  numericFormatContractIds?: string[];
  dimensionFields?: string[];
  tagFields?: string[];
  rfmFields?: {
    recencyScoreField: string;
    frequencyScoreField: string;
    monetaryScoreField: string;
    segmentField: string;
  };
  lifecycleFields?: {
    stageField: string;
    stageOrderField: string;
    stageCountField: string;
    stageShareField?: string;
    transitionField?: string;
  };
  categoryFields?: {
    categoryIdField: string;
    categoryNameField: string;
    valueField: string;
    shareField?: string;
    sortField?: string;
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
  relationFields?: {
    nodeIdField?: string;
    nodeNameField?: string;
    edgeSourceField?: string;
    edgeTargetField?: string;
    edgeWeightField?: string;
    relationTypeField?: string;
  };
  timelineFields?: {
    eventIdField: string;
    eventTimeField: string;
    eventTitleField: string;
    eventStatusField?: string;
    eventDetailField?: string;
  };
  riskFields?: {
    riskLevelField: string;
    riskScoreField?: string;
    severityDictionary?: string[];
    statusField?: string;
    thresholdFields?: string[];
    ownerField?: string;
    actionField?: string;
  };
  scoreFields?: {
    scoreField: string;
    scoreLevelField?: string;
    scaleMin?: number;
    scaleMax?: number;
    dimensionScoreFields?: string[];
  };
  periodField?: string;
  sourceField?: string;
  freshnessField?: string;
  densityLimit: string;
  labelRule: string;
  tooltipPayload: string[];
  exactValueRoute: string;
  localControls?: string[];
  rendererOwner:
    | 'echarts'
    | 'project-table'
    | 'antv-s2'
    | 'project-list'
    | 'project-profile-card'
    | 'data-driven-custom-diagram';
  fallback: string;
  validationCases: string[];
};

type SpatialAnalysisCardPattern =
  | 'spatial-overview-map-card'
  | 'spatial-heat-distribution-card'
  | 'spatial-comparison-map-card'
  | 'spatial-point-distribution-card'
  | 'spatial-trend-change-map-card'
  | 'spatial-ranking-map-card'
  | 'spatial-kpi-map-diagnostic-card'
  | 'spatial-composite-metric-map-card'
  | 'spatial-coverage-radius-card'
  | 'spatial-flow-migration-card';

type SpatialAnalysisEvidenceBinding = {
  spatialTask:
    | 'overview'
    | 'heat-distribution'
    | 'comparison'
    | 'point-distribution'
    | 'trend-change'
    | 'ranking'
    | 'kpi-diagnosis'
    | 'composite-metric'
    | 'coverage-radius'
    | 'flow-migration';
  geographyGrain: string;
  regionCodeField?: string;
  regionNameField?: string;
  longitudeField?: string;
  latitudeField?: string;
  mapResource: string;
  projectionOrFitRule: string;
  primaryMetricField: string;
  unit: string;
  periodField: string;
  visualMapRule?: string;
  legendRule: string;
  labelRule: string;
  missingGeoPolicy: string;
  densityLimit: string;
  tooltipPayload: string[];
  exactValueRoute: string;
  rendererOwner: 'echarts' | 'project-map-engine';
  fallback: string;
  comparisonFields?: string[];
  rankingFields?: string[];
  pointFields?: string[];
  coverageFields?: string[];
  flowFields?: string[];
  metricFields?: string[];
  localControls?: string[];
  stateRules: string[];
};

type FlowHierarchyDiagramCardPattern =
  | 'conversion-funnel-card'
  | 'multi-stage-sankey-card'
  | 'journey-stage-map-card'
  | 'hierarchy-tree-card'
  | 'hub-relation-network-card'
  | 'sunburst-composition-card'
  | 'treemap-composition-card'
  | 'path-conversion-flow-card';

type ProcessAnalysisCardPattern =
  | 'linear-process-flow-card'
  | 'ring-process-flow-card'
  | 'timeline-process-flow-card'
  | 'stage-card-process-flow-card'
  | 'branch-process-flow-card'
  | 'funnel-process-flow-card'
  | 'cycle-process-flow-card'
  | 'map-path-process-flow-card'
  | 'horizontal-stepper-card'
  | 'icon-stepper-card'
  | 'number-stepper-card'
  | 'segmented-stepper-card'
  | 'vertical-stepper-card'
  | 'timeline-stepper-card'
  | 'cycle-stepper-card'
  | 'stepper-metric-card'
  | 'horizontal-node-flow-card'
  | 'ring-node-map-card'
  | 'tree-node-structure-card'
  | 'node-grid-status-card'
  | 'hub-node-relation-card'
  | 'node-timeline-card'
  | 'hierarchy-node-card'
  | 'node-network-card'
  | 'bottleneck-stage-highlight-card'
  | 'bottleneck-ranking-card'
  | 'bottleneck-gauge-card'
  | 'bottleneck-heatmap-card'
  | 'bottleneck-waterfall-card'
  | 'bottleneck-bubble-card'
  | 'bottleneck-trend-card'
  | 'bottleneck-cause-donut-card';

type ProcessAnalysisEvidenceBinding = {
  processTask:
    | 'process-overview'
    | 'step-progress'
    | 'node-status'
    | 'bottleneck-diagnosis'
    | 'process-detail-evidence';
  stageFields?: string[];
  nodeFields?: string[];
  linkFields?: string[];
  statusFields?: string[];
  timingFields?: string[];
  bottleneckFields?: string[];
  thresholdFields?: string[];
  ownerFields?: string[];
  metricFields: string[];
  orderRule: string;
  denominatorRule?: string;
  thresholdRule?: string;
  statusDictionary?: string;
  severityDictionary?: string;
  densityLimit: string;
  labelRule: string;
  tooltipPayload: string[];
  exactValueRoute: string;
  localControls?: string[];
  rendererOwner: 'echarts' | 'antv-s2' | 'project-table' | 'project-list' | 'data-driven-custom-diagram';
  fallback: string;
};

type ConversionRetentionCardPattern =
  | 'conversion-overview-card'
  | 'standard-conversion-funnel-card'
  | 'stage-rate-matrix-card'
  | 'conversion-trend-card'
  | 'conversion-comparison-card'
  | 'conversion-channel-distribution-card'
  | 'conversion-path-card'
  | 'conversion-quality-overview-card'
  | 'loss-overview-card'
  | 'loss-reason-composition-card'
  | 'loss-segment-distribution-card'
  | 'loss-warning-card'
  | 'loss-impact-card'
  | 'retention-overview-card'
  | 'retention-cohort-heatmap-card'
  | 'retention-curve-card'
  | 'retention-segment-card'
  | 'retention-target-progress-card'
  | 'stage-conversion-overview-card'
  | 'stage-leakage-waterfall-card'
  | 'stage-conversion-path-card';

type ConversionRetentionEvidenceBinding = {
  conversionRetentionTask:
    | 'conversion-overview'
    | 'stage-conversion'
    | 'conversion-trend'
    | 'conversion-comparison'
    | 'loss-diagnosis'
    | 'retention-analysis'
    | 'stage-path'
    | 'conversion-detail-evidence';
  stageFields?: string[];
  cohortFields?: string[];
  retentionFields?: string[];
  lossFields?: string[];
  reasonFields?: string[];
  segmentFields?: string[];
  channelFields?: string[];
  pathFields?: string[];
  comparisonFields?: string[];
  metricFields: string[];
  numeratorField?: string;
  denominatorField?: string;
  denominatorRule: string;
  formulaRule: string;
  orderRule?: string;
  densityLimit: string;
  labelRule: string;
  tooltipPayload: string[];
  exactValueRoute: string;
  localControls?: string[];
  rendererOwner: 'echarts' | 'antv-s2' | 'project-table' | 'project-list' | 'data-driven-custom-diagram';
  fallback: string;
};

type MatrixDecisionCardPattern =
  | 'quadrant-segmentation-card'
  | 'quadrant-kpi-grid-card'
  | 'quadrant-trend-compare-card'
  | 'quadrant-share-ring-card'
  | 'quadrant-bubble-priority-card'
  | 'metric-heatmap-matrix-card'
  | 'metric-delta-matrix-card'
  | 'metric-intensity-matrix-card'
  | 'rating-matrix-card'
  | 'boolean-support-matrix-card'
  | 'bubble-magnitude-matrix-card'
  | 'sparkline-trend-matrix-card'
  | 'priority-summary-card'
  | 'priority-detail-list-card'
  | 'priority-pyramid-card'
  | 'priority-quadrant-card'
  | 'priority-timeline-card'
  | 'priority-donut-list-card'
  | 'priority-kanban-swimlane-card'
  | 'priority-trend-card'
  | 'strategy-pyramid-card'
  | 'strategy-hierarchy-list-card'
  | 'strategy-goal-breakdown-card'
  | 'strategy-matrix-card'
  | 'strategy-timeline-card'
  | 'strategy-funnel-layer-card'
  | 'strategy-stack-card'
  | 'strategy-dependency-tree-card';

type MatrixDecisionEvidenceBinding = {
  matrixDecisionTask:
    | 'quadrant-segmentation'
    | 'metric-matrix-judgment'
    | 'priority-classification'
    | 'strategy-layering'
    | 'portfolio-prioritization'
    | 'action-routing'
    | 'decision-detail-evidence';
  objectGrain: string;
  objectFields: string[];
  axisFields?: string[];
  rowDimensionFields?: string[];
  columnDimensionFields?: string[];
  levelFields?: string[];
  priorityFields?: string[];
  strategyLayerFields?: string[];
  parentChildFields?: string[];
  metricFields: string[];
  scoreFields?: string[];
  statusFields?: string[];
  xMetricField?: string;
  yMetricField?: string;
  sizeMetricField?: string;
  colorField?: string;
  thresholdRule: string;
  classificationRule: string;
  orderRule?: string;
  densityLimit: string;
  labelRule: string;
  tooltipPayload: string[];
  exactValueRoute: string;
  localControls?: string[];
  rendererOwner:
    | 'echarts'
    | 'antv-s2'
    | 'project-table'
    | 'project-list'
    | 'project-card'
    | 'data-driven-custom-diagram';
  fallback: string;
  validationCases: string[];
};

```
