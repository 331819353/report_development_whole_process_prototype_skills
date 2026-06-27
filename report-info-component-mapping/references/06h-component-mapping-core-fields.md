# 06h Component Mapping Core Fields

Load this file for the first segment of `ComponentMapping`. It depends on shared types from `06a-binding-foundation-and-insight-types.md`, including `ConclusionChainLink`. Compose it with `06i` and `06j` when the full mapping schema is required.

```ts
type LayoutFitContract = {
  componentFamily: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  plannedSpan?: { columns: number; rows: number };
  minOuterW: number;
  minOuterH: number;
  minContentW?: number;
  minContentH?: number;
  metricCellMinW?: number;
  requiredTextRows?: Array<{ slot: string; lines: number; fontSizePx: number; lineHeightPx: number }>;
  requiredSlots?: Array<
    | 'title'
    | 'value'
    | 'evidence'
    | 'action'
    | 'source'
    | 'state'
    | 'legend'
    | 'axis'
    | 'tableBody'
    | 'footer'
  >;
  densityLimits?: {
    visibleMetrics?: number;
    visibleRows?: number;
    visibleColumns?: number;
    visibleCategories?: number;
    visibleSeries?: number;
    visibleLabels?: number;
  };
  overflowStrategy:
    | 'enlarge'
    | 'row-group-expand'
    | 'full-row'
    | 'split'
    | 'tab'
    | 'drawer'
    | 'fullscreen'
    | 'paginate'
    | 'scroll'
    | 'downgrade'
    | 'blocked';
  reflowNotes?: string[];
  squeezeFailureCode?: string;
};

type ComponentMappingCoreFields = {
  id: string;
  // Metadata for the layout/block title. Do not render this again inside the component body.
  title: string;
  priority: 'must-have' | 'should-have' | 'optional';
  sampleModuleRole?: 'businessRequired' | 'sampleStructure' | 'optionalEnhancement';
  displayTheme?: DisplayTheme;
  sourcePatternIds?: string[];
  patternRoles?: PatternRole[];
  styleGeneralization?: StyleGeneralizationContract;
  businessQuestion: string;
  analysisPerspective?: AnalysisPerspective;
  secondaryAnalysisPerspectives?: AnalysisPerspective[];
  answerAtom: string;
  semanticRole: string;
  conclusionChain?: ConclusionChainLink;
  conclusionRuleId?: string;
  conclusionRuleBinding?: ConclusionGenerationRuleBinding;
  block: string;
  // Top-level page-grid occupant. Uses the report page `12 * N` grid.
  parentBlockId?: string;
  // Optional local region inside the parent block body. Not a page-grid block.
  subBlockId?: string;
  subBlockRole?: SubBlockRole;
  componentType: 'card' | 'chart' | 'table' | 'text-summary' | 'drawer' | 'task' | 'action' | 'custom';
  visualType: string;
  layoutFitContract?: LayoutFitContract;
  kpiCardPattern?: KpiCardPattern;
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
  timePatternCardPattern?: TimePatternCardPattern;
  kpiComparisonAnalysisCardPattern?: KpiComparisonAnalysisCardPattern;
  kpiComparisonAnalysisEvidenceMode?: KpiComparisonAnalysisEvidenceMode;
  targetActualCardPattern?: TargetActualCardPattern;
  targetActualTrendCardPattern?: TargetActualTrendCardPattern;
  targetActualRadarCardPattern?: TargetActualRadarCardPattern;
  targetActualDonutCardPattern?: TargetActualDonutCardPattern;
  targetActualScatterCardPattern?: TargetActualScatterCardPattern;
  targetActualTablePattern?: TargetActualTablePattern;
  targetActualPivotTablePattern?: TargetActualPivotTablePattern;
  tableCardPattern?: TableCardPattern;
  detailEvidenceCardPattern?: DetailEvidenceCardPattern;
  rankingCardPattern?: RankingCardPattern;
  paretoCardPattern?: ParetoCardPattern;
  compositionShareCardPattern?: CompositionShareCardPattern;
  decompositionAttributionCardPattern?: DecompositionAttributionCardPattern;
  distributionAnalysisCardPattern?: DistributionAnalysisCardPattern;
  anomalyAnalysisCardPattern?: AnomalyAnalysisCardPattern;
  matrixDecisionCardPattern?: MatrixDecisionCardPattern;
  relationshipAnalysisCardPattern?: RelationshipAnalysisCardPattern;
  marketAnalysisCardPattern?: MarketAnalysisCardPattern;
  definitionHelpCardPattern?: DefinitionHelpCardPattern;
  dataQualityTrustCardPattern?: DataQualityTrustCardPattern;
  actionRecommendationCardPattern?: ActionRecommendationCardPattern;
  actionEvidenceBodyMode?: ActionEvidenceBodyMode;
  reviewImpactCardPattern?: ReviewImpactCardPattern;
  reviewImpactEvidenceMode?: ReviewImpactEvidenceMode;
  basicChartCardPattern?: BasicChartCardPattern;
  specializedChartCardPattern?: SpecializedChartCardPattern;
  multiDimensionalFeatureCardPattern?: MultiDimensionalFeatureCardPattern;
  populationObjectCardPattern?: PopulationObjectCardPattern;
  spatialAnalysisCardPattern?: SpatialAnalysisCardPattern;
  flowHierarchyDiagramCardPattern?: FlowHierarchyDiagramCardPattern;
  processAnalysisCardPattern?: ProcessAnalysisCardPattern;
  conversionRetentionCardPattern?: ConversionRetentionCardPattern;
  listStatusPattern?: ListStatusPattern;
  overlayPanelPattern?: OverlayPanelPattern;
  microDashboardCardPattern?: MicroDashboardCardPattern;
  stateFeedbackPattern?: StateFeedbackPattern;
  chartSubtype?: string;
  tableSubtype?: string;
  dataSource: string;
  apiId?: string;
  apiEndpoint?: string;
  frontendComputePolicy?: 'component-ready' | 'format-only' | 'blocked';
  grain: string;
  primaryKey?: string;
  requiredFields: string[];
  formulas?: string[];
  rollupLogic?: string;
  numericFormatContracts?: NumericFormatContract[];
  analysisInsightContract?: AnalysisInsightContract;
  definitionHelpEvidenceBinding?: DefinitionHelpEvidenceBinding;
  dataQualityEvidenceBinding?: DataQualityEvidenceBinding;
  actionRecommendationEvidenceBinding?: ActionRecommendationEvidenceBinding;
  reviewImpactEvidenceBinding?: ReviewImpactEvidenceBinding;
  rankingEvidenceBinding?: RankingEvidenceBinding;
  paretoEvidenceBinding?: ParetoEvidenceBinding;
  compositionShareEvidenceBinding?: CompositionShareEvidenceBinding;
  decompositionAttributionEvidenceBinding?: DecompositionAttributionEvidenceBinding;
  distributionAnalysisEvidenceBinding?: DistributionAnalysisEvidenceBinding;
  anomalyAnalysisEvidenceBinding?: AnomalyAnalysisEvidenceBinding;
  matrixDecisionEvidenceBinding?: MatrixDecisionEvidenceBinding;
  relationshipAnalysisEvidenceBinding?: RelationshipAnalysisEvidenceBinding;
  marketAnalysisEvidenceBinding?: MarketAnalysisEvidenceBinding;
  detailEvidenceBinding?: DetailEvidenceBinding;
  multiDimensionalFeatureEvidenceBinding?: MultiDimensionalFeatureEvidenceBinding;
  populationObjectEvidenceBinding?: PopulationObjectEvidenceBinding;
  spatialAnalysisEvidenceBinding?: SpatialAnalysisEvidenceBinding;
  processAnalysisEvidenceBinding?: ProcessAnalysisEvidenceBinding;
  conversionRetentionEvidenceBinding?: ConversionRetentionEvidenceBinding;
};
```
