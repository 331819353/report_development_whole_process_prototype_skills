# 06i Component Mapping Composite And Control Fields

Load this file for composite panel, Micro Dashboard, state feedback, Pivot/S2, grouped-header, filter, control, and interaction fields. Compose it with `06h` and `06j` for the full `ComponentMapping` contract.

```ts
type ComponentMappingCompositeAndControlFields = {
  compositePanelContract?: {
    topic: string;
    analysisSequence: Array<'summary' | 'trend' | 'structure' | 'contribution' | 'exception' | 'detail' | 'action'>;
    layoutPattern:
      | 'metric-main'
      | 'main-side'
      | 'main-detail'
      | 'main-two-side'
      | 'two-by-two'
      | 'metric-main-side';
    primaryChildId: string;
    children: Array<{
      id: string;
      role:
        | 'primary-metric'
        | 'main-visual'
        | 'auxiliary-visual'
        | 'top-list'
        | 'detail-preview'
        | 'insight'
        | 'legend'
        | 'state';
      visualType: string;
      priority: 'P1' | 'P2' | 'P3' | 'P4';
      minW: number;
      minH: number;
      datasetId?: string;
      requiredFields?: string[];
      unit?: string;
      localFilterScope?: 'panel' | 'child-only';
    }>;
    childCountLimit: number;
    primaryVisualWeight: '50-70%';
    contentHeightRule: 'contentH>=CH*0.60';
    sharedLocalFilters?: string[];
    childLocalFilterException?: string;
    sharedLegend?: boolean;
    sharedUnit?: string;
    linkedInteraction?: 'none' | 'hover-highlight' | 'click-select' | 'hover-and-click';
    detailPreview?: { maxRows: number; maxColumns: number; detailRoute?: string };
    responsiveFallback: string[];
    stateRules: string[];
  };
  microDashboardContract?: {
    topic: string;
    themeTone: 'fresh-green' | 'operation-purple' | 'warning-orange' | 'finance-blue' | 'neutral-blue';
    layoutPattern: 'portrait-kpi-grid' | 'portrait-kpi-grid-status' | 'wide-kpi-grid' | 'wide-kpi-grid-status';
    primarySequence: Array<'status' | 'trend' | 'structure' | 'ranking' | 'conversion' | 'progress' | 'warning' | 'detail' | 'cash' | 'action'>;
    kpiCount: number;
    parentMinW: number;
    parentMinH: number;
    childCountLimit: number;
    sections: Array<{
      id: string;
      role:
        | 'kpi-strip'
        | 'primary-trend'
        | 'composition'
        | 'ranking'
        | 'target-progress'
        | 'funnel'
        | 'heatmap'
        | 'sparkline-group'
        | 'status-strip'
        | 'warning-table'
        | 'detail-preview'
        | 'cash-status'
        | 'supplier-sla';
      componentType: 'card' | 'chart' | 'table' | 'text-summary' | 'drawer' | 'task' | 'action' | 'custom';
      visualType: string;
      patternField?: string;
      priority: 'P1' | 'P2' | 'P3' | 'P4';
      minW: number;
      minH: number;
      datasetId?: string;
      requiredFields?: string[];
      fallback: 'keep' | 'collapse-to-tab' | 'move-to-drawer' | 'move-to-fullscreen' | 'split-block' | 'hide-optional';
    }>;
    sharedFilters?: string[];
    linkedInteraction?: 'none' | 'hover-highlight' | 'click-select' | 'hover-and-click';
    detailRoute?: string;
    responsiveFallback: string[];
    stateRules: string[];
  };
  stateFeedbackContract?: {
    stateKind: StateFeedbackKind;
    scope: StateFeedbackScope;
    title: string;
    reason?: string;
    impact?: string;
    primaryAction?: { label: string; actionType: ActionType; customActionId?: string; payload?: string[] };
    secondaryAction?: { label: string; actionType: ActionType; customActionId?: string; payload?: string[] };
    statusMeta?: string[];
    minW: number;
    minH: number;
    preserveGeometry: boolean;
    permissionLeakageRule?: 'no-counts-no-silhouettes' | 'safe-scope-only' | 'not-applicable';
    retryPolicy?: 'wired-retry' | 'no-retry' | 'deferred';
    motionPolicy?: 'none' | 'reduced-motion-safe' | 'skeleton-only' | 'project-defined';
    accessibility: string[];
    responsiveFallback: string[];
    validationRules: string[];
  };
  pivotContract?: {
    rowDimensions: string[];
    columnDimensions: string[];
    measures: string[];
    aggregationFunctions: Record<string, string>;
    rateFormulas?: Record<string, { numerator: string; denominator: string; formula: string }>;
    subtotalRules?: string[];
    grandTotalRules?: string[];
    rowHierarchyDepth?: number;
    columnHierarchyDepth?: number;
    sortRules?: string[];
    densityFallback?: string[];
    renderer?: 'antv-s2' | 'project-s2-equivalent' | 'static-preview';
  };
  groupedHeaderContract?: {
    columnTree: Array<{
      id: string;
      title: string;
      field?: string;
      children?: string[];
      unit?: string;
      definition?: string;
      align?: 'left' | 'center' | 'right';
      width?: number;
      minWidth?: number;
      maxWidth?: number;
      priority?: number;
      sortable?: boolean;
      filterable?: boolean;
      fixed?: 'left' | 'right';
    }>;
    maxDepth: number;
    leafColumnCount: number;
    spanRules: 'computed-colSpan-rowSpan';
    fixedHeader: boolean;
    frozenColumns?: string[];
    componentLocalFilters?: string[];
    columnHeaderFilters?: string[];
    densityFallback?: string[];
    tooltipFields?: string[];
  };
  controlSemantics: ControlSemantics[];
  componentSchemaImpact: ComponentSchemaImpactDetail;
  navigationMetricLineage?: NavigationMetricLineage[];
  globalFilters: string[];
  filterMap: Record<string, string>;
  filterControlPatterns?: Record<string, FilterControlPattern>;
  filterExecutionStage?: 'sql-where' | 'source-query' | 'provider-query' | 'repository-query' | 'resolver-param' | 'redis-cache' | 'precompute-cache' | 'component-local' | 'bounded-local' | 'blocked';
  ignoredFilters?: string[];
  localControls?: string[];
  interactions?: string[];
  actionPayload?: string[];
  stateKeys?: string[];
};
```
