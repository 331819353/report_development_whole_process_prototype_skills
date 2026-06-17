# 06g Binding Market Detail State And Vocabulary Types

Load this file for market movement, detail evidence, list/filter/overlay/state patterns, analysis perspectives, and sub-block roles.

```ts
type RelationshipAnalysisCardPattern =
  | 'relation-overview-hub-card'
  | 'relation-strength-matrix-card'
  | 'relation-flow-sankey-card'
  | 'relation-community-network-card'
  | 'relation-pair-compare-card'
  | 'relation-trend-card'
  | 'relation-hierarchy-tree-card'
  | 'relation-bubble-quadrant-card'
  | 'relation-factor-ranking-card'
  | 'relation-evolution-snapshot-card'
  | 'relation-bipartite-attribute-card'
  | 'relation-detail-table-card';

type MarketAnalysisCardPattern =
  | 'quote-price-snapshot-card'
  | 'quote-price-indicator-card'
  | 'quote-sparkline-range-card'
  | 'quote-multi-period-compare-card'
  | 'kline-basic-card'
  | 'kline-volume-card'
  | 'kline-moving-average-card'
  | 'kline-technical-indicator-card'
  | 'watchlist-table-card'
  | 'market-breadth-overview-card'
  | 'market-breadth-distribution-card'
  | 'market-breadth-share-card'
  | 'market-breadth-trend-card'
  | 'market-breadth-heatmap-card'
  | 'market-leaderboard-card'
  | 'market-sentiment-gauge-card'
  | 'volatility-overview-card'
  | 'volatility-range-card'
  | 'volatility-trend-card'
  | 'volatility-distribution-card'
  | 'volatility-heatmap-card'
  | 'volatility-compare-card'
  | 'risk-return-bubble-card'
  | 'volatility-warning-card';

type MarketAnalysisEvidenceBinding = {
  marketTask:
    | 'instrument-quote'
    | 'ohlc-kline'
    | 'market-breadth'
    | 'watchlist-ranking'
    | 'volatility-risk'
    | 'risk-return-opportunity'
    | 'market-sentiment';
  instrumentFields?: string[];
  quoteFields?: string[];
  ohlcFields?: string[];
  breadthFields?: string[];
  volatilityFields?: string[];
  riskReturnFields?: string[];
  localControls?: string[];
  marketColorConvention:
    | 'international-green-rise-red-fall'
    | 'china-red-rise-green-fall'
    | 'custom-declared';
  formulaOrWindow?: string;
  sourceFreshnessFields: string[];
  numericFormatContracts: string[];
  tooltipPayload: string[];
  exactValueRoute: string;
  densityLimit: string;
  rendererOwner:
    | 'echarts'
    | 'project-table'
    | 'project-card'
    | 'data-driven-custom-diagram';
  fallback: string;
  validationCases: string[];
};

type DetailEvidenceBinding = {
  detailTask:
    | 'record-audit'
    | 'row-lookup'
    | 'metric-drilldown'
    | 'composition-drilldown'
    | 'hierarchy-drilldown'
    | 'sample-identity'
    | 'sample-process'
    | 'sample-result'
    | 'sample-related-record'
    | 'log-audit'
    | 'access-trace'
    | 'security-audit'
    | 'task-execution-trace';
  sourceDataset: string;
  rowGrain:
    | 'record'
    | 'order'
    | 'transaction'
    | 'product'
    | 'customer'
    | 'sample'
    | 'log-event'
    | 'task'
    | 'hierarchy-node'
    | string;
  primaryKeyField: string;
  identityFields: string[];
  timeFields?: string[];
  metricFields?: string[];
  statusFields?: string[];
  statusDictionary?: string[];
  severityField?: string;
  actionFields?: string[];
  hierarchyFields?: {
    nodeIdField: string;
    nodeNameField: string;
    parentIdField?: string;
    levelField?: string;
    hasChildrenField?: string;
    defaultExpandedDepth?: number;
  };
  tableFields?: {
    columnMetadataRef: string;
    defaultSort: string;
    visibleColumnCount: number;
    visibleRowCount: number;
    paginationOrScroll: string;
    fixedColumns?: string[];
  };
  listFields?: {
    titleField: string;
    secondaryTextFields: string[];
    visibleRowCount: number;
    rowHeightPx: number;
    sortRule: string;
  };
  localControlIds?: string[];
  activeFilterIds: string[];
  sourceFreshnessFields?: string[];
  numericFormatContractIds?: string[];
  tooltipPayload: string[];
  rowDetailRoute?: string;
  drilldownRoute?: string;
  exportRoute?: string;
  rendererOwner:
    | 'element-plus'
    | 'project-table'
    | 'antv-s2'
    | 'echarts'
    | 'project-list'
    | 'project-card'
    | 'project-custom';
  densityLimit: string;
  fallback: string;
  validationCases: string[];
};

type ListStatusPattern =
  | 'simple-info-list'
  | 'progress-task-list'
  | 'severity-alert-list'
  | 'exception-record-list'
  | 'status-chip-set'
  | 'event-timeline'
  | 'user-object-list'
  | 'mixed-info-list';

type FilterControlPattern =
  | 'single-select-dropdown'
  | 'multi-tag-select'
  | 'date-range-selector'
  | 'searchable-select'
  | 'tree-path-selector'
  | 'advanced-filter-drawer'
  | 'combined-filter-chipbar';

type OverlayPanelPattern =
  | 'right-filter-drawer'
  | 'bottom-action-sheet'
  | 'center-confirmation-modal'
  | 'fullscreen-detail-modal'
  | 'top-notification-bar'
  | 'left-navigation-drawer'
  | 'side-detail-drawer'
  | 'large-detail-side-panel';

type MicroDashboardCardPattern =
  | 'sales-fresh-analysis-board'
  | 'user-operations-purple-board'
  | 'supply-chain-orange-monitoring-board'
  | 'finance-blue-analysis-board';

type StateFeedbackPattern =
  | 'fresh-line-state-set'
  | 'soft-illustration-state-set'
  | 'minimal-line-state-set'
  | 'dark-tech-state-set'
  | 'glass-card-state-set'
  | 'playful-healing-state-set'
  | 'business-blue-state-set'
  | 'immersive-fullscreen-state-set';

type StateFeedbackKind =
  | 'empty'
  | 'filtered-empty'
  | 'loading'
  | 'error'
  | 'no-permission'
  | 'building'
  | 'stale'
  | 'partial-data'
  | 'disabled'
  | 'success';

type StateFeedbackScope =
  | 'page'
  | 'parent-block'
  | 'sub-block'
  | 'component-body'
  | 'overlay'
  | 'card';

type AnalysisPerspective =
  | 'currentStatus'
  | 'targetProgress'
  | 'trendMovement'
  | 'comparisonDifference'
  | 'rankingContribution'
  | 'compositionShare'
  | 'decompositionDriver'
  | 'distributionSpread'
  | 'anomalyRisk'
  | 'relationshipInfluence'
  | 'flowTransfer'
  | 'processBottleneck'
  | 'conversionRetention'
  | 'spatialDistribution'
  | 'timePattern'
  | 'multiDimensionalProfile'
  | 'populationObject'
  | 'matrixDecision'
  | 'marketMovement'
  | 'definitionHelp'
  | 'conclusionInsight'
  | 'causeDiagnosis'
  | 'actionRecommendation'
  | 'reviewImpact'
  | 'dataQualityTrust'
  | 'detailEvidence'
  | 'filterExploration';

type SubBlockRole =
  | 'summary'
  | 'evidence'
  | 'primaryEvidence'
  | 'secondaryEvidence'
  | 'detail'
  | 'control'
  | 'peer'
  | 'state'
  | 'feedback'
  | 'status'
  | 'kpiStrip'
  | 'exactValuePath'
  | 'microGroup';

```
