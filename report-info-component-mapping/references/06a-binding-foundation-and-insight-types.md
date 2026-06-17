# 06a Binding Foundation And Insight Types

Load this file for shared control/action/schema/source/style-generalization types plus conclusion, action recommendation, and definition-help binding contracts.

```ts
type ControlSemantics =
  | 'perspective-switch'
  | 'global-filter'
  | 'local-filter'
  | 'drilldown-param';

type ActionType =
  | 'openModal'
  | 'closeModal'
  | 'setFilters'
  | 'resetFilters'
  | 'navigateUrl'
  | 'print'
  | 'fullscreen'
  | 'refresh'
  | 'custom';

type ComponentSchemaImpact =
  | 'none'
  | 'row-scope-only'
  | 'metric-name'
  | 'metric-set'
  | 'component-set'
  | 'table-schema'
  | 'dimension-set'
  | 'definition-change'
  | 'domain-vocabulary'
  | 'mixed';

type ComponentSchemaImpactDetail = {
  categories: ComponentSchemaImpact[];
  changesMetricNames: boolean;
  changesComponentSet: boolean;
  changesTableHeaders: boolean;
  changesDimensions: boolean;
  changesFormulaOrDefinition: boolean;
  changesDomainVocabulary: boolean;
  notes?: string;
};

type NavigationMetricLineage = {
  navigationId: string;
  metricKind: 'percentage' | 'ranking' | 'status-light';
  sourceDataset: string;
  field?: string;
  formula?: string;
  grain: string;
  affectedFilters: string[];
  periodBehavior:
    | 'selected-period'
    | 'current-period'
    | 'comparison-period'
    | 'rolling-window'
    | 'latest-snapshot'
    | 'static-display-copy';
  staticDisplayCopy?: boolean;
};

type DisplayTheme =
  | 'detail-table'
  | 'summary-stat'
  | 'business-dashboard'
  | 'exploratory-analysis'
  | 'management-report'
  | 'monitoring-alert';

type PatternRole =
  | 'primary-structure'
  | 'supporting-evidence'
  | 'interaction'
  | 'state'
  | 'export'
  | 'governance'
  | 'acceptance-only';

type VisualSourceRole =
  | 'temporary-evidence'
  | 'exact-restoration-source'
  | 'visual-regression-baseline'
  | 'runtime-asset'
  | 'audit-evidence'
  | 'reusable-inspiration';

type StyleGeneralizationStatus =
  | 'covered-by-existing-pattern'
  | 'covered-by-composed-patterns'
  | 'requires-pattern-extension'
  | 'out-of-scope-one-off';

type StyleGeneralizationContract = {
  sourceRole: VisualSourceRole;
  generalizationStatus: StyleGeneralizationStatus;
  canonicalPatternRef: string;
  patternFields: string[];
  componentFamily: string;
  businessTrigger: string;
  dataShapeTrigger: string;
  adaptiveVariables: string[];
  minContainer: string;
  responsiveFallback: string[];
  rendererOwner: string;
  textOnlyReproduction: true;
};

type ConclusionCardPattern =
  | 'metric-evidence-conclusion'
  | 'finding-action-conclusion'
  | 'compact-conclusion-summary';

type ConclusionEvidenceBodyMode =
  | 'kpi-strip-sparkline'
  | 'trend-compare-chart'
  | 'composition-structure'
  | 'formula-driver-chain'
  | 'segment-action-table'
  | 'findings-action-list';

type ConclusionEvidenceBinding = {
  conclusionEvidenceBodyMode: ConclusionEvidenceBodyMode;
  sourceDataset: string;
  periodField: string;
  freshnessField?: string;
  activeFilterIds: string[];
  metricSummaryItems?: Array<{
    metricId: string;
    label: string;
    valueField: string;
    unit?: string;
    comparisonField?: string;
    targetField?: string;
    valueRole: 'comparison' | 'actual' | 'target' | 'attainment' | 'gap' | 'status';
    numericFormatContractId: string;
  }>;
  trendFields?: {
    datasetId: string;
    timeField: string;
    currentValueField: string;
    baselineValueField?: string;
    grainField?: string;
  };
  compositionFields?: {
    categoryField: string;
    valueField: string;
    totalField: string;
    shareField: string;
    denominatorPolicy: string;
  };
  formulaFields?: {
    factorFields: string[];
    operatorRule: string;
    resultField: string;
    reconciliationPolicy: 'exact' | 'rounded' | 'not-additive';
  };
  segmentActionFields?: {
    segmentField: string;
    shareField?: string;
    impactField?: string;
    priorityField?: string;
    actionField: string;
  };
  validationCases: string[];
};

type ActionRecommendationCardPattern =
  | 'diagnostic-evidence-action-card'
  | 'strategy-impact-action-card'
  | 'task-execution-action-card'
  | 'priority-immediate-action-card';

type ActionEvidenceBodyMode =
  | 'kpi-line-action'
  | 'kpi-bar-action'
  | 'kpi-composition-action'
  | 'kpi-target-gap-action'
  | 'evidence-list-action';

type ActionRecommendationEvidenceBinding = {
  actionRecommendationCardPattern: ActionRecommendationCardPattern;
  actionEvidenceBodyMode: ActionEvidenceBodyMode;
  sourceDataset: string;
  periodField: string;
  freshnessField?: string;
  activeFilterIds: string[];
  triggerMetric: {
    metricId: string;
    label: string;
    valueField: string;
    unit?: string;
    baselineField?: string;
    targetField?: string;
    gapField?: string;
    direction: 'good-when-higher' | 'good-when-lower' | 'bounded-range';
    numericFormatContractId: string;
  };
  evidenceFields: {
    datasetId: string;
    rendererOwner: 'echarts' | 'html-list' | 'table' | 'project-custom';
    timeField?: string;
    categoryField?: string;
    valueField?: string;
    baselineValueField?: string;
    targetField?: string;
    totalField?: string;
    shareField?: string;
    denominatorPolicy?: string;
    visibleLimit?: number;
  };
  actionItems: Array<{
    actionIdField: string;
    actionTitleField: string;
    actionType: 'optimize' | 'increase' | 'reduce' | 'test' | 'monitor' | 'assign' | 'create-task' | 'open-detail' | 'project-defined';
    ownerField?: string;
    dueDateField?: string;
    statusField?: string;
    priorityField?: string;
    routeField?: string;
  }>;
  impactFields?: {
    expectedMetricField?: string;
    expectedLiftField?: string;
    expectedBenefitField?: string;
    expectedCostField?: string;
    implementationPeriodField?: string;
    confidenceField?: string;
  };
  detailRoute?: string;
  actionRoute?: string;
  tooltipPayload: string[];
  stateRules: string[];
  validationCases: string[];
};

type DefinitionHelpCardPattern =
  | 'basic-metric-definition-card'
  | 'comparison-caliber-card'
  | 'formula-breakdown-help-card'
  | 'scope-caliber-list-card'
  | 'trend-meaning-card'
  | 'share-denominator-help-card'
  | 'condition-filter-help-card'
  | 'calculation-example-card';

type DefinitionHelpTask =
  | 'meaning'
  | 'calculation'
  | 'formula-breakdown'
  | 'caliber-scope'
  | 'comparison-baseline'
  | 'trend-reading'
  | 'share-denominator'
  | 'condition-filter'
  | 'calculation-example';

type DefinitionHelpEvidenceBinding = {
  definitionHelpTask: DefinitionHelpTask;
  metricId: string;
  metricName: string;
  metricAliasFields?: string[];
  definitionTextField?: string;
  formulaTextField?: string;
  formulaFields?: string[];
  denominatorFields?: string[];
  scopeFields?: {
    periodField?: string;
    statisticRangeField?: string;
    includeFields?: string[];
    excludeFields?: string[];
    channelFields?: string[];
    permissionScopeField?: string;
  };
  comparisonFields?: {
    currentValueField: string;
    baselineValueField: string;
    baselineLabelField: string;
    deltaField?: string;
    deltaRateField?: string;
    comparableDefinitionRule: string;
  };
  decompositionFields?: {
    factorFields: string[];
    operatorRule: string;
    resultField: string;
    reconciliationPolicy: 'exact' | 'rounded' | 'example-only' | 'not-additive';
  };
  trendFields?: {
    datasetId: string;
    timeField: string;
    valueField: string;
    grainField?: string;
    latestPeriodField?: string;
  };
  shareFields?: {
    numeratorField: string;
    denominatorField: string;
    shareField: string;
    denominatorZeroRule: string;
  };
  filterConditionFields?: string[];
  exampleDatasetId?: string;
  exampleOperandFields?: string[];
  exampleResultField?: string;
  numericFormatContractIds: string[];
  sourceDataset: string;
  sourceFieldRefs?: string[];
  freshnessField?: string;
  lineageRefs?: string[];
  localControls?: string[];
  tooltipPayload: string[];
  exactValueRoute?: string;
  dictionaryRoute?: string;
  validationCases: string[];
};

```
