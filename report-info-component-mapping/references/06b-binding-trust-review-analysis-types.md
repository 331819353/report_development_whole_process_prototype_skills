# 06b Binding Trust Review And Analysis Types

Load this file for data-quality trust, review-impact, analysis insight, and numeric-format binding contracts.

```ts
type DataQualityTrustCardPattern =
  | 'quality-score-overview-card'
  | 'quality-trend-card'
  | 'quality-dimension-radar-card'
  | 'quality-issue-composition-card'
  | 'quality-dimension-table-card'
  | 'quality-field-distribution-card'
  | 'quality-rule-accuracy-card'
  | 'quality-exception-sample-table-card'
  | 'quality-key-field-grid-card'
  | 'quality-source-freshness-card'
  | 'quality-reconciliation-card'
  | 'quality-action-closure-card';

type DataQualityTask =
  | 'overall-score'
  | 'completeness'
  | 'accuracy'
  | 'consistency'
  | 'timeliness'
  | 'uniqueness'
  | 'exception-monitoring'
  | 'field-quality'
  | 'rule-validation'
  | 'source-freshness'
  | 'reconciliation'
  | 'action-closure';

type DataQualityEvidenceBinding = {
  dataQualityTask: DataQualityTask;
  dataObjectType: 'dataset' | 'table' | 'field' | 'record' | 'rule' | 'source' | 'batch' | 'metric' | string;
  datasetId: string;
  sourceDataset: string;
  tableIdField?: string;
  tableNameField?: string;
  fieldIdField?: string;
  fieldNameField?: string;
  ruleIdField?: string;
  ruleNameField?: string;
  batchIdField?: string;
  periodField: string;
  qualityScoreField?: string;
  qualityLevelField?: string;
  statusField?: string;
  statusDictionary?: string[];
  checkedRecordCountField?: string;
  totalRecordCountField?: string;
  expectedRecordCountField?: string;
  passedRecordCountField?: string;
  failedRecordCountField?: string;
  missingCountField?: string;
  errorCountField?: string;
  duplicateCountField?: string;
  exceptionCountField?: string;
  issueTypeField?: string;
  issueSeverityField?: string;
  issueShareField?: string;
  completenessRateField?: string;
  accuracyRateField?: string;
  consistencyRateField?: string;
  timelinessRateField?: string;
  uniquenessRateField?: string;
  passRateField?: string;
  denominatorPolicy:
    | 'expected-records'
    | 'checked-records'
    | 'non-null-required-fields'
    | 'rule-evaluations'
    | 'source-api-frontend-reconciliation'
    | 'declared-custom';
  formulaRefs: string[];
  dimensionFields?: Array<{
    dimensionId: string;
    dimensionName: string;
    valueField: string;
    denominatorField: string;
    statusField?: string;
    thresholdRule?: string;
  }>;
  trendFields?: {
    datasetId: string;
    timeField: string;
    valueField: string;
    issueCountField?: string;
    baselineValueField?: string;
    thresholdField?: string;
  };
  ruleFields?: {
    ruleGroupField?: string;
    ruleExpressionField?: string;
    passedCountField?: string;
    failedCountField?: string;
    totalCheckCountField?: string;
    ruleOwnerField?: string;
  };
  sampleFields?: {
    rowIdField: string;
    issueValueField?: string;
    issueTypeField: string;
    ruleField?: string;
    sourceValueField?: string;
    expectedValueField?: string;
    observedValueField?: string;
  };
  sourceFreshnessFields?: {
    sourceSystemField?: string;
    loadBatchField?: string;
    expectedUpdateAtField?: string;
    actualUpdateAtField?: string;
    delayMinutesField?: string;
    freshnessStatusField?: string;
  };
  reconciliationFields?: {
    sourceValueField: string;
    apiValueField?: string;
    frontendValueField?: string;
    reportValueField?: string;
    diffValueField: string;
    diffRateField?: string;
    toleranceRule: string;
  };
  responseFields?: {
    ownerField?: string;
    actionField?: string;
    actionStatusField?: string;
    dueAtField?: string;
    resolvedAtField?: string;
    slaField?: string;
  };
  numericFormatContractIds: string[];
  localControlIds?: string[];
  tooltipPayload: string[];
  exactValueRoute?: string;
  detailTableRoute?: string;
  sourceLineageRoute?: string;
  validationCases: string[];
};

type ReviewImpactCardPattern =
  | 'event-kpi-overview-card'
  | 'event-trend-lift-card'
  | 'event-funnel-lift-card'
  | 'event-segment-lift-card'
  | 'event-conclusion-card';

type ReviewImpactEvidenceMode =
  | 'before-after-kpi-strip'
  | 'event-annotated-trend'
  | 'funnel-step-lift'
  | 'segment-lift-bars'
  | 'impact-summary-strip';

type ReviewImpactTask =
  | 'metric-overview'
  | 'trend-lift'
  | 'funnel-lift'
  | 'segment-lift'
  | 'summary';

type ReviewImpactEvidenceBinding = {
  reviewImpactTask: ReviewImpactTask;
  eventDatasetId: string;
  eventIdField: string;
  eventNameField: string;
  eventTypeField?: string;
  eventStartField: string;
  eventEndField?: string;
  eventMarkerField?: string;
  audienceField?: string;
  sourceDataset: string;
  periodField: string;
  timeGrainField?: string;
  baselineMethod:
    | 'pre-post-window'
    | 'control-group'
    | 'difference-in-differences'
    | 'matched-baseline'
    | 'custom-defined';
  beforeWindowField?: string;
  afterWindowField?: string;
  controlGroupField?: string;
  metricItems?: Array<{
    metricId: string;
    label: string;
    beforeValueField?: string;
    afterValueField: string;
    controlValueField?: string;
    deltaField: string;
    deltaRateField?: string;
    liftField?: string;
    unit: string;
    numericFormatContractId: string;
    direction: 'higher-is-better' | 'lower-is-better' | 'neutral';
  }>;
  trendFields?: {
    datasetId: string;
    timeField: string;
    impactedValueField: string;
    baselineValueField?: string;
    controlValueField?: string;
    eventDateField: string;
    confidenceBandField?: string;
  };
  funnelFields?: {
    stepField: string;
    stepOrderField: string;
    beforeValueField?: string;
    afterValueField: string;
    controlValueField?: string;
    conversionRateField?: string;
    liftField: string;
  };
  segmentFields?: {
    segmentField: string;
    impactedValueField: string;
    baselineValueField?: string;
    controlValueField?: string;
    liftField: string;
    sampleSizeField?: string;
  };
  conclusionField?: string;
  sourceField?: string;
  freshnessField?: string;
  activeFilterIds: string[];
  localControls?: string[];
  tooltipPayload: string[];
  exactValueRoute?: string;
  detailTableRoute?: string;
  validationCases: string[];
};

type AnalysisInsightContract = {
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
  conclusionCardPattern?: ConclusionCardPattern;
  conclusionEvidenceBodyMode?: ConclusionEvidenceBodyMode;
  conclusionEvidenceBinding?: ConclusionEvidenceBinding;
  definitionHelpCardPattern?: DefinitionHelpCardPattern;
  definitionHelpEvidenceBinding?: DefinitionHelpEvidenceBinding;
  reviewImpactCardPattern?: ReviewImpactCardPattern;
  reviewImpactEvidenceMode?: ReviewImpactEvidenceMode;
  reviewImpactEvidenceBinding?: ReviewImpactEvidenceBinding;
  conclusionRuleId?: string; // Required for normal-state generated business conclusions.
  generatedConclusionTemplate?: string;
  conclusion?: string; // Static copy is allowed only for definition/state/fallback text, not normal-state business conclusions.
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
};

type NumericFormatContract = {
  metricId: string;
  field: string;
  valueType:
    | 'count'
    | 'amount'
    | 'currency'
    | 'percent'
    | 'rate'
    | 'ratio'
    | 'average'
    | 'score'
    | 'duration'
    | 'rank'
    | 'index'
    | 'geo'
    | 'scientific'
    | 'project-enum';
  rawUnit: string;
  displayUnit: string;
  displayScale: string;
  precision: number | string;
  tooltipPrecision: number | string;
  exportPrecision: number | string;
  roundingMode: 'half-up' | 'bankers' | 'floor' | 'ceil' | 'truncate' | 'project-defined';
  trimTrailingZeros?: boolean;
  thousandsSeparator?: boolean;
  nullDisplay: string;
  zeroDisplay: string;
  zeroDivisionDisplay?: string;
  negativeZeroRule: string;
  smallNonZeroRule?: string;
  formulaPrecisionPolicy?: string;
  formatterOwner: 'frontend' | 'backend-export' | 'shared-contract' | 'project-defined';
};

```
