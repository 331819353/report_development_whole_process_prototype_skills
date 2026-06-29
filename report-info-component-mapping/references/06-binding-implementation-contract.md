# 06 Binding Implementation Contract

Use this reference before implementation, prototype configuration, API handoff, or any output that must be buildable.

## Contract Split Map

Load only the segment needed for the current mapping. For a full binding matrix, load every `06a`-`06k` file in order.

| Need | Read |
| --- | --- |
| Shared control, action, schema-impact, lineage, style, conclusion-chain, conclusion/action/definition contracts | `06a-binding-foundation-and-insight-types.md` |
| Data-quality, review-impact, analysis-insight, numeric display contracts | `06b-binding-trust-review-analysis-types.md` |
| KPI, target/actual, table, detail-evidence pattern types | `06c-binding-kpi-pattern-types.md` |
| Ranking, Pareto, composition, decomposition/driver contracts | `06d-binding-ranking-composition-types.md` |
| Distribution, anomaly, relationship, basic/specialized chart contracts | `06e-binding-distribution-anomaly-relationship-types.md` |
| Profile, population/object, spatial, process, conversion, matrix-decision contracts | `06f-binding-profile-spatial-process-types.md` |
| Market, detail, list/filter/overlay/state vocabulary and perspectives | `06g-binding-market-detail-state-types.md` |
| ComponentMapping core identity, data, pattern, and evidence references | `06h-component-mapping-core-fields.md` |
| ComponentMapping composite, state, table, control, and interaction fields | `06i-component-mapping-composite-control-fields.md` |
| ComponentMapping KPI/time evidence and validation tail fields | `06j-component-mapping-kpi-time-fields.md` |
| Usage rules for pattern binding, renderer ownership, and data/filter discipline | `06k-binding-usage-rules.md` |

## Unified Component Mapping Contract

Every mapped component must be expressible as an implementation contract. The full schema is split into the files above to keep each load bounded; the semantic contract is unchanged.

`ComponentMapping = ComponentMappingCoreFields & ComponentMappingCompositeAndControlFields & ComponentMappingKpiAndTimeFields`.

## Required Controlled Values

Use these values unless an existing project explicitly defines a different local vocabulary.

- `priority`: `must-have`, `should-have`, `optional`.
- `componentType`: `card`, `chart`, `table`, `text-summary`, `drawer`, `task`, `action`, `custom`.
- `visualType`: `line`, `bar`, `combo`, `candlestick`, `heatmap`, `pie`, `radar`, `path`, `sunburst`, `gauge`, `scatter`, `boxplot`, `parallel`, `map`, `graph`, `tree`, `treemap`, `sankey`, `funnel`, `metric-card`, `text-summary`, `table`, `pivot`, `ranking-list`, `composition-card`, `decomposition-card`, `distribution-card`, `anomaly-card`, `data-quality-card`, `matrix-decision-card`, `market-analysis-card`, `spatial-map-card`, `action-recommendation-card`, `operational-list`, `overlay-panel`, `composite-panel`, `micro-dashboard`, `state-feedback`, `other`.
- `analysisPerspective`: `currentStatus`, `targetProgress`, `trendMovement`, `comparisonDifference`, `rankingContribution`, `compositionShare`, `decompositionDriver`, `distributionSpread`, `anomalyRisk`, `relationshipInfluence`, `flowTransfer`, `processBottleneck`, `conversionRetention`, `spatialDistribution`, `timePattern`, `multiDimensionalProfile`, `populationObject`, `matrixDecision`, `marketMovement`, `definitionHelp`, `conclusionInsight`, `causeDiagnosis`, `actionRecommendation`, `reviewImpact`, `dataQualityTrust`, `detailEvidence`, `filterExploration`.
- `conclusionChain.role`: `overall-conclusion`, `section-conclusion`, `evidence`, `cause`, `detail`, `action`, `trust`, `context`.
- `conclusionChain.evidenceVerb`: `proves`, `explains`, `locates`, `quantifies`, `contradicts`, `traces`, `recommends`, `verifies`.
- `conclusionRuleId`: `RULE-*` from the PRD `conclusionRuleMap`; required for generated summary-area conclusions, conclusion cards, and analysis insight components.
- `conclusionCardPattern`: `metric-evidence-conclusion`, `finding-action-conclusion`, `compact-conclusion-summary`.
- `conclusionEvidenceBodyMode`: `kpi-strip-sparkline`, `trend-compare-chart`, `composition-structure`, `formula-driver-chain`, `segment-action-table`, `findings-action-list`. Use with `analysisPerspective: conclusionInsight`, `visualType: text-summary`, `analysisInsightContract.subtype: conclusion-card`, and `conclusionEvidenceBinding`.
- `definitionHelpCardPattern`: `basic-metric-definition-card`, `comparison-caliber-card`, `formula-breakdown-help-card`, `scope-caliber-list-card`, `trend-meaning-card`, `share-denominator-help-card`, `condition-filter-help-card`, `calculation-example-card`. Use with `analysisPerspective: definitionHelp`, `visualType: text-summary`, and `definitionHelpEvidenceBinding`.
- `dataQualityTrustCardPattern`: `quality-score-overview-card`, `quality-trend-card`, `quality-dimension-radar-card`, `quality-issue-composition-card`, `quality-dimension-table-card`, `quality-field-distribution-card`, `quality-rule-accuracy-card`, `quality-exception-sample-table-card`, `quality-key-field-grid-card`, `quality-source-freshness-card`, `quality-reconciliation-card`, `quality-action-closure-card`. Use with `analysisPerspective: dataQualityTrust`, `visualType: data-quality-card` or the real evidence visual type, and `dataQualityEvidenceBinding`.
- `actionRecommendationCardPattern`: `diagnostic-evidence-action-card`, `strategy-impact-action-card`, `task-execution-action-card`, `priority-immediate-action-card`. Use with `componentType: card`, `visualType: action-recommendation-card`, `analysisPerspective: actionRecommendation`, and `actionRecommendationEvidenceBinding`.
- `actionEvidenceBodyMode`: `kpi-line-action`, `kpi-bar-action`, `kpi-composition-action`, `kpi-target-gap-action`, `evidence-list-action`. Use with `actionRecommendationCardPattern` and one primary evidence body that explains why the action exists.
- `reviewImpactCardPattern`: `event-kpi-overview-card`, `event-trend-lift-card`, `event-funnel-lift-card`, `event-segment-lift-card`, `event-conclusion-card`. Use with `analysisPerspective: reviewImpact` when one card packages event identity plus impact evidence.
- `reviewImpactEvidenceMode`: `before-after-kpi-strip`, `event-annotated-trend`, `funnel-step-lift`, `segment-lift-bars`, `impact-summary-strip`. Use with `reviewImpactCardPattern` and one primary evidence body that proves the review result.
- `kpiCardPattern`: `plain-metric`, `target-wave`, `mini-bar-trend`, `highlight-line-trend`, `horizontal-trend-compare`, `horizontal-axis-line-trend`, `horizontal-axis-bar-compare`, `horizontal-axis-scatter-diagnostic`, `horizontal-spatial-map-diagnostic`, `paired-comparison-diagnostic`, `horizontal-ring-progress`, `horizontal-target-progress`, `horizontal-status-trend-compare`, `horizontal-grain-bar-switch`, `horizontal-period-summary-strip`, `horizontal-pp-assist-info`, `horizontal-warning-status-band`.
- `kpiAxisLineEvidenceMode`: `basic-compare-line`, `filled-baseline-line`, `target-reference-line`, `phase-annotated-line`, `unit-axis-line`, `grain-switch-line`, `dual-comparison-line`, `threshold-band-line`. Use only with `kpiCardPattern: horizontal-axis-line-trend`.
- `kpiAxisBarEvidenceMode`: `basic-horizontal-bar`, `period-comparison-bar`, `target-reference-bar`, `category-change-sidebar-bar`, `time-series-horizontal-bar`, `grain-switch-horizontal-bar`, `dual-series-horizontal-bar`, `threshold-warning-bar`. Use only with `kpiCardPattern: horizontal-axis-bar-compare`.
- `kpiScatterEvidenceMode`: `correlation-trendline-scatter`, `mean-reference-scatter`, `target-crosshair-scatter`, `distribution-change-band-scatter`, `threshold-quadrant-scatter`, `dual-series-trendline-scatter`, `change-callout-scatter`, `category-quadrant-scatter`. Use only with `kpiCardPattern: horizontal-axis-scatter-diagnostic`.
- `kpiMapEvidenceMode`: `choropleth-heat-map`, `graded-choropleth-map`, `bubble-target-gap-map`, `distribution-change-marker-map`, `column-symbol-map`, `annotated-interval-map`, `yoy-change-zone-map`, `point-category-summary-map`. Use only with `kpiCardPattern: horizontal-spatial-map-diagnostic`.
- `kpiComparisonEvidenceMode`: `metric-yoy-vs`, `progress-mom-vs`, `target-gap-progress-vs`, `improvement-dot-matrix-vs`, `trend-yoy-vs`, `structure-breakdown-vs`, `percentage-ring-vs`, `trend-mom-vs`. Use only with `kpiCardPattern: paired-comparison-diagnostic`.
- `kpiOverviewCardPattern`: `lead-metric-comparison-sparkline-overview`, `multi-metric-strip-progress-overview`, `domain-metric-cluster-progress-overview`. Use with `visualType: metric-card` when one wide card summarizes one business domain/topic with `2-5` visible metrics.
- `kpiSingleIndicatorLayoutMode`: `dropdown-sparkline-progress`, `unit-toggle-ring-progress`, `dropdown-minibar-progress`, `grain-switch-minibar-progress`, `dropdown-area-sparkline-progress`, `scale-toggle-area-progress`, `dropdown-gauge-progress`. Use with `visualType: metric-card` when a peer grid of single-indicator cards needs one metric, one comparison, one mini evidence visual, and one target/progress footer.
- `kpiJudgmentCardPattern`: `semantic-status-icon-card`, `progress-status-ring-card`, `health-score-ring-card`, `health-threshold-bullet-card`, `health-dimension-breakdown-card`, `rating-score-summary-card`, `rating-distribution-card`, `semicircle-gauge-target-card`. Use with `visualType: metric-card` when one card judges status, health, score, rating, risk, progress, or gauge state; bind status/score/range/threshold semantics, comparison strip fields, and footer evidence.
- `kpiGoalExecutionCardPattern`: `attainment-ring-summary-card`, `attainment-gauge-deadline-card`, `attainment-linear-target-card`, `attainment-unit-progress-card`, `gap-gauge-deficit-card`, `gap-target-actual-compare-card`, `progress-plan-actual-card`, `milestone-timeline-card`. Use with `visualType: metric-card` when one card manages target attainment, target gap, plan-vs-actual progress, remaining work, deadlines, or milestones; bind actual/target/gap/progress/milestone fields, direction semantics, formula/denominator behavior, comparison strip, footer evidence, and exact values.
- `kpiTimeSeriesCardPattern`: `trend-line-target-card`, `change-baseline-delta-card`, `yoy-mom-comparison-card`, `cycle-period-progress-card`, `volatility-stat-card`, `forecast-interval-card`. Use with `visualType: metric-card` when one card answers trend movement, named-baseline change, YoY/MoM comparison, cycle/period state, volatility/stability, or forecast uncertainty; bind ordered series, grain, latest period, baseline/cycle/volatility/forecast fields, direction semantics, footer evidence, and exact values.
- `timePatternCardPattern`: `calendar-rhythm-overview-card`, `calendar-schedule-lane-card`, `period-cycle-summary-card`, `period-progress-status-card`, `time-slot-trend-card`, `time-slot-share-card`, `weekday-hour-heatmap-card`, `cumulative-time-curve-card`, `period-comparison-overlay-card`, `peak-valley-diagnostic-card`, `peak-valley-warning-forecast-card`. Use with `analysisPerspective: timePattern` when one card answers calendar rhythm, schedule occupancy, period cycle, time-slot distribution, weekday-hour heat, cumulative progress, period comparison, peak-valley diagnosis, or time forecast warning; bind `timePatternEvidenceBinding`.
- `kpiComparisonAnalysisCardPattern`: `direct-value-compare-card`, `group-segment-compare-card`, `competitor-position-card`, `benchmark-position-card`, `variance-gap-card`. Use with `visualType: metric-card` when one card answers direct value comparison, group/segment comparison, competitor position, benchmark distance, or variance/gap diagnosis; bind comparable subject roles, shared metric/unit/grain, benchmark or variance fields, sort/visible-limit rules, footer evidence, and exact values.
- `kpiComparisonAnalysisEvidenceMode`: `side-by-side-values`, `grouped-bars`, `stacked-distribution`, `multi-series-trend`, `market-share-donut`, `radar-profile`, `benchmark-ruler`, `variance-gauge`, `nps-score-scale`, `comparison-table`, `map-table-compare`. Use only with `kpiComparisonAnalysisCardPattern` and `kpiEvidenceBinding.comparisonAnalysis`.
- `targetActualCardPattern`: `standard-summary-panel`, `emphasis-header-summary`, `soft-chip-summary`.
- `targetActualTrendCardPattern`: `emphasis-wave-trend`, `standard-summary-trend`, `soft-chip-trend`.
- `targetActualRadarCardPattern`: `emphasis-wave-radar`, `standard-action-radar`.
- `targetActualDonutCardPattern`: `emphasis-filter-donut`, `standard-filter-donut`.
- `targetActualScatterCardPattern`: `emphasis-filter-scatter`, `standard-filter-scatter`.
- `tableSubtype`: `target-actual-detail` for target/actual detail table cards; `target-actual-pivot` for target/actual pivot table cards.
- `targetActualTablePattern`: `standard-audit-table`, `compact-audit-table`.
- `targetActualPivotTablePattern`: `standard-hierarchy-pivot`, `share-matrix-pivot`, `tree-expand-pivot`.
- `tableCardPattern`: `plain-detail-ledger-table`, `filtered-operational-status-table`, `grouped-header-summary-table`, `metric-matrix-table`, `s2-cross-pivot-table`, `fixed-column-scroll-table`, `grouped-subtotal-summary-table`, `tree-hierarchy-table`.
- `detailEvidenceCardPattern`: `summary-detail-table-card`, `metric-trend-detail-card`, `composition-drilldown-card`, `hierarchy-drilldown-card`, `record-list-detail-card`, `object-media-detail-list-card`, `subject-initial-list-card`, `sample-basic-info-card`, `sample-process-trace-card`, `sample-result-overview-card`, `sample-related-record-card`, `log-summary-table-card`, `access-log-table-card`, `security-audit-log-card`, `task-timeline-detail-card`. Use with `analysisPerspective: detailEvidence` and `detailEvidenceBinding`; keep the real renderer `visualType` such as `table`, `operational-list`, `metric-card`, `composition-card`, `overlay-panel`, or `other`.
- `rankingCardPattern`: `basic-rank-list-card`, `trend-delta-rank-list-card`, `progress-bar-rank-list-card`, `podium-rank-card`, `yoy-microbar-rank-list-card`, `radar-comparison-rank-card`, `metric-summary-rank-card`, `time-switch-rank-card`, `share-donut-rank-card`, `map-distribution-rank-card`, `topn-bar-rank-card`, `topn-comparison-rank-card`, `topn-waterfall-strip-card`, `topn-sparkline-rank-list-card`, `topn-bubble-rank-card`, `topn-icon-card-grid`, `medal-horizontal-ranking`, `bar-progress-ranking`, `compact-list-ranking`.
- `paretoCardPattern`: `pareto-basic-card`, `pareto-table-chart-card`, `pareto-dual-axis-card`, `pareto-cumulative-fill-card`, `pareto-stacked-share-card`, `pareto-bubble-card`, `pareto-zone-card`, `pareto-ring-list-card`.
- `compositionShareCardPattern`: `basic-donut-share-card`, `donut-detail-share-card`, `percent-bar-share-card`, `multi-ring-hierarchy-share-card`, `share-trend-stack-card`, `share-ranking-topn-card`, `treemap-composition-card`, `share-metrics-summary-card`, `stacked-strip-composition-card`, `stacked-column-trend-composition-card`, `funnel-composition-card`, `bubble-composition-card`, `market-share-overview-card`, `market-share-concentration-card`, `share-distribution-interval-card`, `map-structure-card`, `sunburst-structure-card`. Use with `componentType: card`, `visualType: composition-card`, and `compositionShareEvidenceBinding`.
- `decompositionAttributionCardPattern`: `formula-decomposition-card`, `funnel-decomposition-card`, `tree-decomposition-card`, `sankey-decomposition-card`, `driver-factor-decomposition-card`, `variance-waterfall-decomposition-card`, `combined-decomposition-card`, `multilevel-metric-decomposition-card`, `total-attribution-card`, `funnel-attribution-card`, `channel-attribution-donut-card`, `touchpoint-attribution-list-card`, `segment-attribution-card`, `feature-attribution-bar-card`, `time-attribution-waterfall-card`, `multidimensional-attribution-matrix-card`, `overall-contribution-card`, `contribution-waterfall-card`, `contribution-structure-card`, `contribution-comparison-card`, `contribution-trend-card`, `contribution-tree-card`, `key-contribution-topn-card`, `contribution-heatmap-card`, `progressive-hierarchy-decomposition-card`, `hierarchy-tree-decomposition-card`, `hierarchy-waterfall-card`, `indented-hierarchy-table-card`, `hierarchy-share-card`, `path-contribution-card`, `multilevel-comparison-hierarchy-card`, `target-attainment-hierarchy-attribution-card`. Use with `componentType: card`, `visualType: decomposition-card`, and `decompositionAttributionEvidenceBinding`.
- `distributionAnalysisCardPattern`: `numeric-histogram-distribution-card`, `interval-donut-distribution-card`, `percentile-cdf-distribution-card`, `geographic-distribution-card`, `time-distribution-card`, `distribution-comparison-card`, `calendar-heatmap-distribution-card`, `multidimensional-population-distribution-card`, `interval-histogram-card`, `interval-share-donut-card`, `interval-boxplot-card`, `interval-comparison-card`, `interval-stacked-trend-card`, `cumulative-interval-card`, `interval-scatter-strip-card`, `interval-detail-table-card`, `univariate-density-curve-card`, `interval-density-curve-card`, `grouped-density-comparison-card`, `density-heatmap-card`, `kde-cumulative-density-card`, `bivariate-density-hexbin-card`, `quantile-band-density-card`, `density-overview-card`, `boxplot-kpi-summary-card`, `time-series-boxplot-card`, `grouped-boxplot-comparison-card`, `boxplot-overview-card`, `boxplot-side-summary-card`, `weekday-boxplot-card`, `anomaly-boxplot-card`, `boxplot-detail-table-card`. Use with `componentType: card`, `visualType: distribution-card`, and `distributionAnalysisEvidenceBinding`.
- `anomalyAnalysisCardPattern`: `anomaly-overview-card`, `anomaly-trend-compare-card`, `anomaly-distribution-structure-card`, `anomaly-interval-threshold-card`, `anomaly-timeline-card`, `anomaly-ranking-top-card`, `anomaly-impact-assessment-card`, `anomaly-baseline-compare-card`, `anomaly-summary-table-card`, `anomaly-multi-metric-monitor-card`, `risk-matrix-card`, `risk-response-status-card`, `anomaly-relation-influence-card`, `anomaly-geographic-distribution-card`, `outlier-scatter-card`, `warning-progress-donut-card`. Use with `componentType: card`, `visualType: anomaly-card`, `analysisPerspective: anomalyRisk`, and `anomalyAnalysisEvidenceBinding`.
- `spatialAnalysisCardPattern`: `spatial-overview-map-card`, `spatial-heat-distribution-card`, `spatial-comparison-map-card`, `spatial-point-distribution-card`, `spatial-trend-change-map-card`, `spatial-ranking-map-card`, `spatial-kpi-map-diagnostic-card`, `spatial-composite-metric-map-card`, `spatial-coverage-radius-card`, `spatial-flow-migration-card`. Use with `componentType: card`, `visualType: spatial-map-card`, `analysisPerspective: spatialDistribution`, and `spatialAnalysisEvidenceBinding`.
- `multiDimensionalFeatureCardPattern`: `object-profile-summary-card`, `radar-feature-profile-card`, `radar-feature-compare-card`, `dimension-score-breakdown-card`, `feature-trend-profile-card`, `feature-comparison-matrix-card`, `feature-bubble-comparison-card`, `tag-taxonomy-overview-card`, `tag-status-board-card`, `tag-cloud-profile-card`, `tag-rule-detail-card`. Use with `analysisPerspective: multiDimensionalProfile` and `multiDimensionalFeatureEvidenceBinding`; keep `visualType` as the actual renderer or evidence family.
- `populationObjectCardPattern`: `population-profile-overview-card`, `population-segment-composition-card`, `population-rfm-matrix-card`, `population-lifecycle-stage-card`, `population-behavior-preference-card`, `population-channel-source-card`, `population-geographic-distribution-card`, `population-consumption-frequency-card`, `population-churn-risk-card`, `object-basic-info-card`, `object-key-metrics-card`, `object-structure-distribution-card`, `object-geographic-coverage-card`, `object-relationship-network-card`, `object-behavior-timeline-card`, `object-value-score-card`, `object-risk-alert-card`. Use with `analysisPerspective: populationObject` and `populationObjectEvidenceBinding`; keep `visualType` as the actual renderer or evidence family.
- `basicChartCardPattern`: `single-series-bar-card`, `comparison-line-trend-card`, `area-trend-card`, `bar-line-combo-card`, `pie-composition-card`, `donut-composition-card`, `stacked-bar-composition-card`, `multi-metric-combo-card`, `filtered-bar-card`, `tooltip-line-trend-card`.
- `specializedChartCardPattern`: `gauge-progress-card`, `choropleth-ranking-map-card`, `time-heatmap-card`, `candlestick-volume-card`, `boxplot-distribution-card`, `parallel-profile-card`, `bubble-opportunity-card`.
- `flowHierarchyDiagramCardPattern`: `conversion-funnel-card`, `multi-stage-sankey-card`, `journey-stage-map-card`, `hierarchy-tree-card`, `hub-relation-network-card`, `sunburst-composition-card`, `treemap-composition-card`, `path-conversion-flow-card`.
- `processAnalysisCardPattern`: `linear-process-flow-card`, `ring-process-flow-card`, `timeline-process-flow-card`, `stage-card-process-flow-card`, `branch-process-flow-card`, `funnel-process-flow-card`, `cycle-process-flow-card`, `map-path-process-flow-card`, `horizontal-stepper-card`, `icon-stepper-card`, `number-stepper-card`, `segmented-stepper-card`, `vertical-stepper-card`, `timeline-stepper-card`, `cycle-stepper-card`, `stepper-metric-card`, `horizontal-node-flow-card`, `ring-node-map-card`, `tree-node-structure-card`, `node-grid-status-card`, `hub-node-relation-card`, `node-timeline-card`, `hierarchy-node-card`, `node-network-card`, `bottleneck-stage-highlight-card`, `bottleneck-ranking-card`, `bottleneck-gauge-card`, `bottleneck-heatmap-card`, `bottleneck-waterfall-card`, `bottleneck-bubble-card`, `bottleneck-trend-card`, `bottleneck-cause-donut-card`. Use with `analysisPerspective: processBottleneck` and `processAnalysisEvidenceBinding`; keep `visualType` as the actual renderer/evidence family.
- `conversionRetentionCardPattern`: `conversion-overview-card`, `standard-conversion-funnel-card`, `stage-rate-matrix-card`, `conversion-trend-card`, `conversion-comparison-card`, `conversion-channel-distribution-card`, `conversion-path-card`, `conversion-quality-overview-card`, `loss-overview-card`, `loss-reason-composition-card`, `loss-segment-distribution-card`, `loss-warning-card`, `loss-impact-card`, `retention-overview-card`, `retention-cohort-heatmap-card`, `retention-curve-card`, `retention-segment-card`, `retention-target-progress-card`, `stage-conversion-overview-card`, `stage-leakage-waterfall-card`, `stage-conversion-path-card`. Use with `analysisPerspective: conversionRetention` and `conversionRetentionEvidenceBinding`; keep `visualType` as the actual renderer/evidence family.
- `relationshipAnalysisCardPattern`: `relation-overview-hub-card`, `relation-strength-matrix-card`, `relation-flow-sankey-card`, `relation-community-network-card`, `relation-pair-compare-card`, `relation-trend-card`, `relation-hierarchy-tree-card`, `relation-bubble-quadrant-card`, `relation-factor-ranking-card`, `relation-evolution-snapshot-card`, `relation-bipartite-attribute-card`, `relation-detail-table-card`. Use with `analysisPerspective: relationshipInfluence` and the real renderer `visualType`.
- `marketAnalysisCardPattern`: `quote-price-snapshot-card`, `quote-price-indicator-card`, `quote-sparkline-range-card`, `quote-multi-period-compare-card`, `kline-basic-card`, `kline-volume-card`, `kline-moving-average-card`, `kline-technical-indicator-card`, `watchlist-table-card`, `market-breadth-overview-card`, `market-breadth-distribution-card`, `market-breadth-share-card`, `market-breadth-trend-card`, `market-breadth-heatmap-card`, `market-leaderboard-card`, `market-sentiment-gauge-card`, `volatility-overview-card`, `volatility-range-card`, `volatility-trend-card`, `volatility-distribution-card`, `volatility-heatmap-card`, `volatility-compare-card`, `risk-return-bubble-card`, `volatility-warning-card`. Use with `componentType: card`, `visualType: market-analysis-card`, `analysisPerspective: marketMovement`, and `marketAnalysisEvidenceBinding`.
- `listStatusPattern`: `simple-info-list`, `progress-task-list`, `severity-alert-list`, `exception-record-list`, `status-chip-set`, `event-timeline`, `user-object-list`, `mixed-info-list`.
- `overlayPanelPattern`: `right-filter-drawer`, `bottom-action-sheet`, `center-confirmation-modal`, `fullscreen-detail-modal`, `top-notification-bar`, `left-navigation-drawer`, `side-detail-drawer`, `large-detail-side-panel`.
- `microDashboardCardPattern`: `sales-fresh-analysis-board`, `user-operations-purple-board`, `supply-chain-orange-monitoring-board`, `finance-blue-analysis-board`.
- `stateFeedbackPattern`: `fresh-line-state-set`, `soft-illustration-state-set`, `minimal-line-state-set`, `dark-tech-state-set`, `glass-card-state-set`, `playful-healing-state-set`, `business-blue-state-set`, `immersive-fullscreen-state-set`.
- `stateFeedbackKind`: `empty`, `filtered-empty`, `loading`, `error`, `no-permission`, `building`, `stale`, `partial-data`, `disabled`, `success`.
- `subBlockRole`: `summary`, `evidence`, `primaryEvidence`, `secondaryEvidence`, `detail`, `control`, `peer`, `state`, `feedback`, `status`, `kpiStrip`, `exactValuePath`, `microGroup`. Use the specific role instead of overloading `state` or `microGroup` when the sub-block is a feedback state, status strip, KPI strip, primary evidence chart, secondary evidence chart, or exact-value path.
- Built-in action type: `openModal`, `closeModal`, `setFilters`, `resetFilters`, `navigateUrl`, `print`, `fullscreen`, `refresh`. Use `custom` only with `customActionId`, event owner, and payload contract. Avoid `switchNav` for new components unless maintaining legacy config.
- `controlSemantics`: `perspective-switch`, `global-filter`, `local-filter`, `drilldown-param`.
- `componentSchemaImpact`: `none`, `row-scope-only`, `metric-name`, `metric-set`, `component-set`, `table-schema`, `dimension-set`, `definition-change`, `domain-vocabulary`, `mixed`.
- `navigationMetricKind`: `percentage`, `ranking`, `status-light`.
- `periodBehavior`: `selected-period`, `current-period`, `comparison-period`, `rolling-window`, `latest-snapshot`, `static-display-copy`.
- `filterExecutionStage`: `sql-where`, `source-query`, `provider-query`, `repository-query`, `resolver-param`, `redis-cache`, `precompute-cache`, `component-local`, `bounded-local`, or `blocked`.
- `filterValueType`: `single`, `multiple`, `range`, `keyword`, `date`, `treePath`, `enum`, `toggle`, `mixed`.
- `filterControlPattern`: `single-select-dropdown`, `multi-tag-select`, `date-range-selector`, `searchable-select`, `tree-path-selector`, `advanced-filter-drawer`, `combined-filter-chipbar`.
- `dataPolicy`: `static` only for explicit narrative/static content, `external` only when the component manages runtime data outside normal datasets.
- `visualSourceRole`: `temporary-evidence`, `exact-restoration-source`, `visual-regression-baseline`, `runtime-asset`, `audit-evidence`, `reusable-inspiration`.
- `styleGeneralizationStatus`: `covered-by-existing-pattern`, `covered-by-composed-patterns`, `requires-pattern-extension`, `out-of-scope-one-off`.

## Binding Matrix

Every mapping must produce a binding matrix before implementation or final specification.

Minimum columns:

- Component ID, parent block ID, optional sub-block ID, and layout/block title metadata.
- Display theme, source pattern IDs, and pattern roles when the workflow selected reusable pattern cards.
- Style generalization status, canonical pattern reference, pattern fields, adaptive variables, renderer owner, and text-only reproduction flag when the component style is sample-derived or reusable.
- Priority.
- Component type, `visualType`, planned parent `columns * rows` span, and sub-block layout when present.
- `layoutFitContract` for dense or metric-bearing components: family, priority, planned span, min outer/content size, metric-cell minimums, text row budget, required slots, density limits, overflow/reflow strategy, and squeeze failure code.
- Sub-block spacing: `subBlockInset:5px` and `subBlockGap:5px` when the component lives inside a composed parent block.
- Business question, answer atom, semantic role, `conclusionChain` link, and `conclusionRuleId` when the row renders a generated business conclusion: `overallConclusionId`, `supportingSectionId`, `sectionConclusionId`, role, evidence verb, and unresolved `RPT-*` gap when the chain cannot be completed.
- Data source or dataset.
- API ID/path and frontend compute policy when an API/backend handoff is in scope.
- Row grain, primary key, and required fields.
- Metric formulas and rollup logic.
- Numeric display contracts for every visible metric-bearing field, including percent/rate scale and denominator-zero behavior.
- `analysisInsightContract` when the component is an analysis/explanation/decision-support text summary, card, annotation, task, or state note. Generated business conclusions must include `conclusionRuleId`, input fields/metrics, trigger state, fallback, and validation cases.
- `actionRecommendationEvidenceBinding` when `visualType` is `action-recommendation-card`, including trigger metric, evidence body fields, `1-3` action items, priority/impact fields, expected uplift/cost/period fields when visible, owner/deadline/status when execution is expected, source/freshness, tooltip payload, detail/action route, state rules, and validation cases.
- `reviewImpactEvidenceBinding` when `analysisPerspective` is `reviewImpact`, including event id/name/type, event start/end or marker date, audience/scope, baseline method, before/after windows or control group, visible metric fields, trend/funnel/segment fields according to `reviewImpactEvidenceMode`, metric formulas/units/source/freshness, tooltip payload, exact-value/detail route, local-control scope and schema impact, renderer owner/fallback, and validation cases.
- `dataQualityEvidenceBinding` when `analysisPerspective` is `dataQualityTrust` or `dataQualityTrustCardPattern` is set, including data-quality task, data object scope, numerator/denominator policy, formula or rule refs, source/freshness/batch metadata, numeric display contracts, tooltip payload, exact-value/detail/source-lineage route, renderer owner, fallback, and validation cases.
- `anomalyAnalysisEvidenceBinding` when `visualType` is `anomaly-card`, including severity/status, baseline or threshold, time/freshness, impact/object, exact-value/detail/action path, and validation cases.
- `spatialAnalysisEvidenceBinding` when `analysisPerspective` is `spatialDistribution` and `spatialAnalysisCardPattern` is set, including geography grain, geography keys or coordinates, map resource/projection, primary metric, visualMap/legend rule, label rule, missing-geo policy, density limit, tooltip/detail path, renderer owner, fallback, and validation cases.
- `multiDimensionalFeatureEvidenceBinding` when `analysisPerspective` is `multiDimensionalProfile` and `multiDimensionalFeatureCardPattern` is set, including feature task, object/dimension/tag fields, scale policy, density and label rules, tooltip/detail path, renderer owner, fallback, and validation cases.
- `populationObjectEvidenceBinding` when `analysisPerspective` is `populationObject` and `populationObjectCardPattern` is set, including population/object task, object grain, identity or aggregate policy, denominator policy for visible shares, task-specific segment/RFM/lifecycle/behavior/channel/geo/relation/timeline/score/risk fields, density and label rules, tooltip/detail/action path, renderer owner, fallback, and validation cases.
- `processAnalysisEvidenceBinding` when `analysisPerspective` is `processBottleneck` and `processAnalysisCardPattern` is set, including process task, stage/node/status/timing/bottleneck fields, order/threshold/denominator rules, density/label rules, tooltip/detail path, renderer owner, fallback, and validation cases.
- `conversionRetentionEvidenceBinding` when `analysisPerspective` is `conversionRetention` and `conversionRetentionCardPattern` is set, including conversion-retention task, stage/cohort/window/loss/path/comparison fields, numerator/denominator/formula rules, denominator-zero handling, density/label rules, tooltip/detail path, renderer owner, fallback, and validation cases.
- `marketAnalysisEvidenceBinding` when `analysisPerspective` is `marketMovement` and `marketAnalysisCardPattern` is set, including market task, instrument identity when instrument-level, quote/OHLC/breadth/volatility/risk-return fields required by the selected pattern, market color convention, source/freshness, numeric display contracts, tooltip/detail path, renderer owner, fallback, and validation cases.
- `compositePanelContract` when `visualType` is `composite-panel` or multiple child components are intentionally combined into one component container.
- Control semantics for each control that affects the component.
- Component schema impact: whether the control changes metric names, component set, table headers, dimensions, formulas/口径, domain vocabulary, or only row scope.
- Navigation metric lineage when perspective navigation shows percentages, rankings, or status lights: `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, `periodBehavior`.
- Global filters that affect it.
- Ignored filters and visible scope label.
- Local filters or internal tabs.
- Filter-to-field or filter-to-query mapping.
- Filter control pattern for every visible filter when visual filter design is in scope.
- Filter/sort/page execution stage.
- Interaction state: selected row, chart mark, drill path, drawer, modal, or jump context.
- Action payload or emitted event.
- Update trigger: filter change, refresh, drilldown, permission change, data reload, resize, fullscreen.
- Reset/stale behavior when selected object leaves scope.
- Export/download behavior.
- Validation cases.
- Template Build Packet export fields when template-based: target packet section, packet row id, component slot fill row, data/API row, filter/action row, interaction row, conclusion rule row, self-development exception row, and implementation file plan row.

## Data Accuracy Rules

- A component without a data source is decorative unless explicitly static narrative.
- A selected pattern card without a component/control/data/API/interaction/export/operations/validation impact is decorative. Mark it as backlog or remove it from completed scope.
- A primary report component without a `conclusionChain` link is an orphan component. Add `overallConclusionId`, `supportingSectionId`, `sectionConclusionId`, role, and evidence verb, or move the component to detail/interaction/handoff.
- A data-bearing component should have a matching API or provider contract when implementation or handoff is in scope. Do not make a complex page-level API the hidden source for multiple unrelated components.
- KPI cards, conclusion cards, status cards, warning cards, and text-summary cards must have a source dataset plus `conclusionRuleId` when they generate a business conclusion, or an explicit static policy only for source/scope/caveat/definition/state/fallback text.
- Visible sample/source modules are not automatically `must-have`. A module becomes `businessRequired` only when it directly answers the stated report question; otherwise it remains `sampleStructure` or `optionalEnhancement`.
- Empty states must name the reason: no matching filter result, no permission, loading failed, source not configured, or static placeholder.
- Additive KPI/chart totals must reconcile with detail rows under the same filters.
- Non-additive metrics such as rates, scores, and completion rates must recalculate from raw numerator/denominator fields.
- A primary/global filter that should affect a component must map to a dataset field, query param, resolver param, or required filter. It cannot be hidden in `ignoredFilters`.
- Business domain, report theme, management object, subject area, and first-level perspective switching must not be represented as ordinary filters when they change metric names, component semantics, table headers, metric口径, or domain vocabulary.
- Perspective navigation percentages, rankings, and status lights are data-bearing metrics. They must be backed by business facts, aggregate datasets, or resolvers with lineage; they must not be hidden in `filterData.meta`.
- Filter option `meta` may contain only dimensional/static descriptors such as name aliases, sort order, permission, description, icon, disabled reason, stable category tags, or UI hints. Dynamic KPI values belong in business facts or resolvers.
- Mock/offline data must include enough dimension grain or resolver logic for each affected primary filter to return different values when business reality differs. A single static snapshot is allowed only for explicitly invariant/static content.
- For backend/API handoff, business formulas, aggregations, ranking, grouping, Top/Bottom, filtering, pagination, and chart-series/table shaping should be returned as component-ready response fields. The frontend may do display formatting, enum label display, null handling, local UI sorting of tiny already-returned option lists, and interaction state only.
- Do not design page/API-level full-materialize-then-filter data paths. Components, stores, adapters, and static helpers must not build/fetch all candidate rows and then apply global filters, permission filters, pagination, ranking, grouping, aggregation, or counts locally. Use `component-local` only for filters over the already fetched component dataset; use `bounded-local` for tiny static enums or confirmed bounded lookups; otherwise use `blocked`.
- Selected mock objects used by drawers, drilldowns, or jumps must exist in filtered data or produce a stale-selection state.

## Template Implementation Rules

For bundled templates:

- One template widget normally represents one top-level parent block. When the parent block contains multiple sub-blocks, implement them inside that widget with local CSS grid/flex or a typed `subBlocks[]` view model; do not create fake page-grid blocks for internal sub-blocks.
- Global/page filters must be declared in `filters[]` and invoked through the selected template's native filter trigger/panel/popover/drawer. Do not generate a standalone filter toolbar, persistent filter bar, or extra filter drawer unless the user explicitly requests template-level redesign.
- Template `filters[]` is for horizontal row-scope constraints. First-level business domain, report theme, management object, subject area, or analysis perspective must be represented through nav/page/route/tab/segment/perspective state when it changes component schema, metric names, table headers, or domain wording.
- Offline/mock filter options and business rows must live in `src/data/dashboard.dataset.json` and be loaded through `src/data/dashboard.loader.ts` plus the data-source registry. Do not create generated TS files for fixture rows, arrays, or payloads.
- `widget.data.params.key` must point to a real dataset in `dashboardData`.
- Use `filters[].source` for data-derived filter options and `filters[].options` for static enums.
- Do not put dynamic perspective-navigation KPIs in `filterData.meta`. Use `businessData`, aggregate rows, or a custom resolver and bind the navigation display to that data chain.
- Use `widget.data.filterFields` when filter ID differs from dataset field.
- Use `widget.data.requiredFilters` for filters that must affect the dataset.
- Use `widget.data.requiredParams` for fixed params that must filter `staticData`.
- Use SQL `WHERE`, source/provider/repository/resolver params, Redis/precompute cache keys, or equivalent source-side scope for high-volume or business-defined global filtering before component data is constructed. `staticData` or component-local filtering is acceptable only for already fetched component datasets, explicitly bounded demo datasets, tiny enums, or lookup options.
- Use `widget.data.ignoredFilters` only for intentionally ignored global filters whose component scope is invariant. Do not use it to bypass missing mock grain, mismatched field names, or unimplemented resolver behavior; fix the data with `filterFields`, `requiredFilters`, `requiredParams`, API params, or a custom resolver.
- Use `widget.filterScope` plus `filters[].scope` for local filter behavior.
- Business widgets should emit `dashboard-action` and central action config should handle the event.
- `navigateUrl` should include active filters by default.

## Custom Implementation Rules

For custom Vue or non-template pages:

- Keep `activeFilters` as a single runtime object.
- Keep a `filterMap` table from filter IDs to data fields, API query params, permission scopes, and affected components.
- Keep exports, jumps, fullscreen views, drawers, and modals reading from the same filtered context as visible components.
- Use a shared action dispatcher for drilldowns, drawers, modals, jumps, exports, refresh, and fullscreen actions.
- Store selection and drill path in one place so filter changes can invalidate them consistently.
- Keep raw mock rows outside visual components so KPI cards, charts, tables, drawers, and exports can use the same source.

## Prototype Technology Mapping

- Use TypeScript + Vue 3 single-file components with Composition API unless the existing project uses another stack.
- Use Element Plus for standard UI controls in Vue report prototypes: filter forms, selects, tree selects, cascaders, date pickers, inputs, buttons, tabs, tags, popovers, tooltips, dialogs, drawers, pagination, and simple operation/detail tables.
- Detail Table mappings with `componentType: 'table'` and `visualType: 'table'` must carry row grain, primary key, default sort, column metadata, visible-column priority, search/sort/pagination/export scope, row detail/action payload, local-filter behavior, and state handling. Use Element Plus/project table for ordinary row-level details; use S2 only when the table is a pivot, cross table, wide metric matrix, frozen-header analytical table, or dense comparison grid.
- Use ECharts for standard visual charts: KPI trend cards, line, bar, area, Combo through data-driven `bar` + `line`/`markLine` series on one shared x-axis, scatter, Gauge through `series.type: 'gauge'`, parallel coordinates through `parallelAxis` plus `series.type: 'parallel'`, heatmap, map, Sankey through `series.type: 'sankey'` with node/link `source`/`target`/`value`, path/user/process path when implemented through ECharts sankey/graph/custom series, treemap/rectangular tree map through `series.type: 'treemap'`, sunburst through `series.type: 'sunburst'`, tree/hierarchical tree through `series.type: 'tree'` or a declared data-driven hierarchy component, relation/network graph, waterfall, funnel, mixed chart.
- Gauge implementation must use ECharts `series.type: 'gauge'` with declared `min`, `max`, `startAngle`, `endAngle`, `radius`, `center`, `progress`/`axisLine`, `detail`, `data`, target/threshold encoding when present, and tooltip evidence. Do not map a standard Gauge to hand-authored SVG/CSS arcs, needles, ticks, or labels while merely importing ECharts.
- Combo implementation must use ECharts `xAxis`, one or two `yAxis` definitions, data-driven `bar` and `line`/`markLine`/reference series, `legend`, `tooltip`, and `axisPointer`. The mapping must carry the paired relationship, axis units, series limits, category-density fallback, and exact tooltip evidence; do not map unrelated metrics into a dual-axis Combo.
- Funnel implementation may be ECharts `series.type: 'funnel'` for traditional trapezoids or ECharts horizontal `bar` series for the report-default bar funnel. In both cases the mapping must carry ordered stage rows, value/unit, conversion/drop formulas, tooltip evidence, and target/comparison semantics instead of hand-drawn decorative bars or trapezoids.
- When the binding matrix maps a component to ECharts, implementation must use an actual ECharts instance or approved project wrapper with data-driven `option`/`series`. Do not mark a standard chart as ECharts if the intended implementation is hand-authored SVG/HTML/CSS/canvas. Use `customDiagram`, `svgIcon`, or another explicit non-standard component type only when the visual is genuinely not an ECharts chart.
- Use AntV S2 through `@antv/s2` and `@antv/s2-vue` for analytical tables: pivot tables, cross tables, wide metric matrices, frozen-header tables, drillable comparison grids, and dense financial/operation tables. Treat those packages as on-demand dependencies; do not add or install them when the mapped components only use charts, KPI cards, simple Element Plus tables, lists, or text summaries.
- Use regular Vue/HTML tables only when Element Plus and S2 are both unavailable or the existing project stack explicitly forbids them.
- Keep chart/table widgets typed, data-driven, and isolated from shell actions.
- Keep mock/static data in JSON data files or data-source resolvers, not embedded in ECharts/S2 setup code or generated TS fixture modules. In bundled templates, use `src/data/dashboard.dataset.json`.
- Visible Chinese UI uses `%` for rate, completion, variance-rate, YoY, MoM, and change labels. Avoid `pt`, `p.p.`, and `percentage point` labels unless explicitly requested.
- Change-rate and variance-rate indicators use positive-red-up and negative-green-down only when inherited company, finance, market, metric dictionary, or explicit business convention defines that convention. Otherwise use brand/neutral emphasis with sign/icon/label, and reserve red/green for documented status or direction semantics.

## Validation Requirements

For each primary filter, include at least one scenario proving:

- KPI cards, charts, tables, lists, drawers, and exports change consistently.
- Filtered detail rows reconcile to filtered KPI totals when additive.
- Non-additive metrics recalculate from raw numerator/denominator fields.
- Selected objects remain in scope or show a stale-selection state.

For each `perspective-switch`, include at least one default and one non-default scenario proving:

- Metric names and title/summary wording match the selected domain.
- Component collection and table dimensions/headers change when `componentSchemaImpact` says they should.
- Domain-specific specialty metrics and risk focus appear for the selected domain.
- Formula/口径 differences are visible in labels, field mapping, or validation notes instead of only changing numeric values.
- Navigation percentages, rankings, and status lights reconcile to the same `sourceDataset`/field/formula chain used by overview KPIs, journey cards, and chart summaries.

A runnable prototype should fail validation when:

- A primary filter has no explicit component binding.
- A schema-changing control is modeled only as a normal filter or lacks `componentSchemaImpact`.
- A navigation percentage, ranking, or status light lacks `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, or `periodBehavior`.
- A dynamic navigation KPI is stored in filter option `meta` or `filterData.meta` without being explicitly static display copy.
- A non-default perspective only changes numeric values while metric names, titles, table dimensions, component set, specialty metrics, and口径 stay incorrectly default.
- A primary filter only narrows data after full dataset/component construction.
- A primary filter changes only UI selected state while affected component data stays identical. Treat `ignoredFilters` or missing `filterFields` as binding gaps after data completeness is proven; treat single-snapshot mock data, missing non-default rows, or missing resolver/API branches as data-completeness gaps first.
- A clickable element has no emitted event or configured action.
- A multi-period filter is backed by single-period data.
- A first-screen component has no dataset, static policy, or external runtime contract.
- An action recommendation card is missing `analysisPerspective: actionRecommendation`, controlled `actionRecommendationCardPattern`, controlled `actionEvidenceBodyMode`, `actionRecommendationEvidenceBinding`, trigger metric, primary evidence body, bounded action items, or detail/action route.
- A review impact card is missing `analysisPerspective: reviewImpact`, controlled `reviewImpactCardPattern`, controlled `reviewImpactEvidenceMode`, `reviewImpactEvidenceBinding`, event identity, event date or period, baseline method, metric fields/formulas/source/freshness, exact-value/detail route, or validation cases.
- A data quality trust card is missing `analysisPerspective: dataQualityTrust`, controlled `dataQualityTrustCardPattern`, `dataQualityEvidenceBinding`, data object scope, numerator/denominator policy, formula or rule references, source/freshness/batch metadata, exact-value/detail/source-lineage route, fallback, or validation cases.
- A component mapped as an ECharts standard chart only imports `echarts` but renders chart marks through hand-authored SVG/HTML/CSS/canvas.
