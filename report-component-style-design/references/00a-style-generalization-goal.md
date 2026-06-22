# Component Style Generalization Goal

Use this reference whenever screenshot samples, visual examples, or component-style requests are meant to become reusable design knowledge.

The goal is not to archive screenshots. The goal is to make every provided component style become a text-only, pattern-driven contract that a non-multimodal model can use to generate an adaptive design for a new business requirement.

## Generalization Target

For the user-provided sample universe, the standard aims for `100% routable coverage`:

- Every reusable sample maps to one existing pattern field, one composition of pattern fields, or a documented `requires-pattern-extension` gap.
- Every mapped pattern has a business trigger, data shape, component family, container size rule, internal slots, visual hierarchy, interaction/state contract, renderer owner, fallback path, and acceptance checklist.
- Every selected pattern can be generated from text contracts without retaining raw screenshot paths, image embeddings, or hidden visual memory.
- Every future requirement follows the same route: business question -> answer atom -> component family -> pattern field -> adaptive variables -> placement/fallback -> proof obligations.

`100% routable coverage` does not mean pixel-identical replication for unknown future designs. It means no provided style remains an opaque image-only reference, and no generator may silently invent a decorative one-off when an existing pattern or extension path is required.

## Canonical Workflow

1. Classify the business decision: state, target gap, trend, structure, ranking, process, cause, anomaly, detail, action, evidence, or data trust.
2. Choose the component family: KPI, target/actual card, chart card, table card, filter, ranking, list/status, overlay, conclusion card, or flow/hierarchy diagram.
3. If the sample defines parent block title chrome, component-container background, or "先选分块样式再填内容" behavior, select `blockChromePattern` through `$report-visual-layout-design` before selecting body component patterns.
4. Select a controlled pattern field from the binding contract, such as `blockChromePattern`, `kpiCardPattern`, `actionRecommendationCardPattern`, `basicChartCardPattern`, `tableCardPattern`, `filterControlPattern`, or `overlayPanelPattern`.
5. Fill the adaptive variables: container size tier, title zone, value zone, plot/table/body zone, legend/control positions, item counts, density limits, tokens, and responsive fallback.
6. Bind data and interaction: grain, primary key, required fields, formulas, numeric format, controls, filters, tooltip/detail/export path, and loading/empty/error/no-permission states.
7. Validate with gates: text-only reproducibility, renderer ownership, layout fit, overflow strategy, exact-value access, anti-AI risks, and fallback behavior.

## Required Pattern Contract

Every reusable visual pattern must define:

```ts
type StyleGeneralizationContract = {
  sourceRole:
    | 'temporary-evidence'
    | 'exact-restoration-source'
    | 'visual-regression-baseline'
    | 'runtime-asset'
    | 'audit-evidence'
    | 'reusable-inspiration';
  generalizationStatus:
    | 'covered-by-existing-pattern'
    | 'covered-by-composed-patterns'
    | 'requires-pattern-extension'
    | 'out-of-scope-one-off';
  canonicalPatternRef: string;
  patternFields: string[];
  componentFamily: string;
  blockChromePattern?: 'template-default' | 'plain-enterprise' | 'prism-badge' | 'deep-panel' | 'dual-arc';
  businessTrigger: string;
  dataShapeTrigger: string;
  adaptiveVariables: string[];
  minContainer: string;
  responsiveFallback: string[];
  rendererOwner: string;
  textOnlyReproduction: true;
};
```

For implementation-ready mapping rows, put this information in `styleGeneralization`.

## Current Pattern Universe

These pattern fields are the current reusable vocabulary. Prefer controlled values before creating a new family.

| Pattern field | Covered surface |
| --- | --- |
| `blockChromePattern` | Parent block title/body chrome styles, including template-default, plain-enterprise, prism-badge, deep-panel, and dual-arc patterns where the title stage and body background family are selected before content is filled |
| `conclusionCardPattern` plus `conclusionEvidenceBodyMode` | Conclusion, evidence, action, executive summary, insight, abstract, and interpretation cards, including KPI strip, trend comparison, composition structure, formula driver, segment action table, and findings/action evidence bodies |
| `definitionHelpCardPattern` | Definition help / metric explanation cards for 指标说明, 注释, 定义, 口径, formula, scope, comparison, denominator, condition, and calculation examples |
| `actionRecommendationCardPattern` plus `actionEvidenceBodyMode` | Action recommendation / 看行动 / 下一步行动 / 建议策略 / 待办执行 cards that combine trigger metric, evidence body, bounded action list, impact or execution metadata, detail route, and action route |
| `kpiCardPattern` plus `kpiOverviewCardPattern` / `kpiSingleIndicatorLayoutMode` / `kpiJudgmentCardPattern` / `kpiGoalExecutionCardPattern` / `kpiTimeSeriesCardPattern` / `kpiComparisonAnalysisCardPattern` | Plain KPI, target wave, mini bar trend, lead line trend, KPI overview cards, single-indicator KPI grid cards, KPI judgment cards for status/health/rating/gauge decisions, KPI goal execution cards for target attainment/gap/progress/milestones, KPI time-series analysis cards for trend/change/YoY-MoM/cycle/volatility/forecast decisions, KPI comparison analysis cards for direct/group/competitor/benchmark/variance decisions, landscape/horizontal KPI cards, axis-line diagnostic KPI cards, axis-bar diagnostic KPI cards, axis-scatter diagnostic KPI cards, spatial-map diagnostic KPI cards, and paired comparison diagnostic KPI cards |
| `targetActualCardPattern` | KPI headline plus target/actual comparison bars |
| `targetActualTrendCardPattern` | KPI headline plus actual/comparison/target trends |
| `targetActualRadarCardPattern` | KPI headline plus product/object radar profiles |
| `targetActualDonutCardPattern` | KPI headline plus composition donut and bottom summary |
| `targetActualScatterCardPattern` | KPI headline plus relationship/scatter target evidence |
| `targetActualTablePattern` | Target/actual detail audit tables |
| `targetActualPivotTablePattern` | Target/actual hierarchy/pivot tables |
| `tableCardPattern` | Detail ledgers, operational tables, grouped headers, metric matrices, S2 cross tables, fixed wide tables, grouped subtotals, and tree tables |
| `detailEvidenceCardPattern` plus `detailEvidenceBinding` | Detail evidence / 看明细 cards that package row-level proof, summary-detail tables, metric trend drilldown, composition drilldown, hierarchy drilldown, record lists, sample identity/process/result cards, related records, operation/access/security logs, task timelines, exact-value routes, export/detail actions, and state coverage |
| `rankingCardPattern` plus `paretoCardPattern` | Ranking, leaderboard, Top N, share/radar/map/bubble ranking, and Pareto contribution cards |
| `compositionShareCardPattern` | Occupancy/share/composition/structure/market-share/concentration cards such as donut detail, percent bars, multi-ring hierarchy, treemap, stacked share trend, share ranking, market-share overview, concentration, interval distribution, map structure, and sunburst structure |
| `decompositionAttributionCardPattern` | Indicator decomposition, attribution decomposition, contribution, hierarchy decomposition, driver-factor, variance-waterfall, path-contribution, and matrix-attribution cards |
| `distributionAnalysisCardPattern` | Distribution, interval, density, quantile, and boxplot cards such as histogram, interval donut, CDF, KDE, density heatmap, bivariate density, percentile bands, boxplot summaries, anomaly boxplot, and distribution detail tables |
| `timePatternCardPattern` | Time-pattern analysis cards such as calendar rhythm, schedule calendar lanes, period cycle summaries, period progress status, time-slot trends/shares, weekday-hour heatmaps, cumulative time curves, period comparison overlays, peak-valley diagnosis, and peak-valley forecast warnings |
| `reviewImpactCardPattern` plus `reviewImpactEvidenceMode` | Review impact / 看复盘 cards such as event KPI overview, event-annotated trend lift, funnel step lift, segment lift bars, and impact summary strips with event identity, baseline method, exact-value route, and text-only reproduction |
| `anomalyAnalysisCardPattern` | Anomaly, risk, warning, volatility, threshold, impact, response, and outlier analysis cards such as overview, trend compare, distribution, interval threshold, timeline, Top affected objects, impact assessment, baseline compare, risk matrix, relation influence, geographic abnormality, response status, and outlier scatter cards |
| `dataQualityTrustCardPattern` | Data-quality trust cards such as quality score overview, completeness/accuracy trend, dimension radar/table, issue composition, field distribution, rule accuracy, exception sample table, key-field grid, source freshness, reconciliation, and action closure cards |
| `spatialAnalysisCardPattern` | Spatial/geographic analysis cards such as spatial overview, regional distribution, geographic hot area, point distribution, outlet coverage, coverage radius, migration/flow map, regional trend change, ranking map, KPI map diagnosis, and composite metric map cards |
| `multiDimensionalFeatureCardPattern` | Multidimensional feature/profile/tag cards such as object profile summary, radar feature profile, radar feature comparison, dimension score breakdown, feature trend profile, feature comparison matrix, feature bubble comparison, tag taxonomy, tag status board, tag cloud, and tag rule detail cards |
| `populationObjectCardPattern` | Population/object/customer segmentation and object detail cards such as population profile overview, segment composition, RFM matrix, lifecycle stage, behavior preference, channel source, geographic distribution, consumption frequency, churn risk, object basic info, object key metrics, object structure, object geography, object relationship, behavior timeline, value score, and risk alert cards |
| `basicChartCardPattern` | Bar, line, area, combo, pie/donut, stacked bar, filtered bar, and tooltip trend cards |
| `specializedChartCardPattern` | Gauge, map, heatmap, K-line, boxplot, parallel, and bubble cards |
| `flowHierarchyDiagramCardPattern` | Funnel, Sankey, journey, tree, relation graph, sunburst, treemap, and path flow cards |
| `processAnalysisCardPattern` | Process overview, step progress, node status, and bottleneck diagnosis cards |
| `conversionRetentionCardPattern` | Conversion overview, ordered funnel, stage conversion, conversion trend/comparison, loss diagnosis, retention cohort/window, leakage waterfall, and conversion path cards |
| `relationshipAnalysisCardPattern` | Relationship, correlation, association, influence, and relation-network cards such as hub relation, strength matrix, relation Sankey, community network, pair comparison, relation trend, hierarchy relation, bubble quadrant, factor ranking, evolution snapshots, bipartite relation, and relation detail audit cards |
| `matrixDecisionCardPattern` | Matrix decision, quadrant, priority, and strategy-layer cards such as quadrant segmentation, KPI quadrant grid, metric heatmap/delta/rating/boolean/bubble/trend matrices, priority summary/detail/pyramid/quadrant/timeline/kanban/trend cards, and strategy pyramid/list/breakdown/matrix/timeline/funnel/stack/dependency cards |
| `marketAnalysisCardPattern` | Market movement cards such as quote price snapshot, price indicator, sparkline range, multi-period quote compare, K-line, K-line with volume, moving average, technical indicator, watchlist table, market breadth overview/distribution/share/trend/heatmap, leaderboard, sentiment gauge, volatility overview/range/trend/distribution/heatmap/compare, risk-return bubble, and volatility warning cards |
| `listStatusPattern` | Info lists, task lists, alerts, exceptions, chips, timelines, user/object lists, and mixed work items |
| `filterControlPattern` | Single select, multi-tag, date range, searchable select, tree path, advanced drawer, and combined chipbar |
| `overlayPanelPattern` | Filter drawers, action sheets, confirmation modals, fullscreen detail, notifications, navigation drawers, side details, and large panels |
| `microDashboardCardPattern` | Large single-topic mini dashboard cards that combine KPI strip, multiple small charts, status/detail evidence, and shared filters |
| `stateFeedbackPattern` | Empty, loading, error, no-permission, stale, partial, disabled, success, and building states |

## Adaptive Design Rules

- Match the pattern to the business job first, then adapt the visual density. Do not choose a pattern because it looks impressive.
- When the sample is about parent block title/background chrome, choose `blockChromePattern` before filling the body component; content density and business role decide whether the block uses template-default, plain-enterprise, prism-badge, deep-panel, or dual-arc.
- Preserve the underlying component renderer: ECharts for standard charts, AntV S2 for analytical pivot/cross tables, Element Plus or project controls for selectors, drawers, modals, lists, and simple tables.
- Treat color, radius, shadow, and gradients as semantic variables, not the source of the pattern. The pattern survives theme changes.
- Use composition before invention: a new card can combine a KPI headline, a chart pattern, local controls, and a bottom evidence strip if each child contract remains valid.
- When the container is too small, degrade predictably: reduce labels, collapse legends, move exact values to tooltip/drawer, paginate/scroll tables, or switch to fullscreen/detail.
- When data shape does not satisfy the pattern trigger, reject the pattern and pick a simpler chart, table, list, or KPI fallback.

## Extension Rules

Create a new pattern only when all of these are true:

- No existing pattern field or safe composition can represent the business task and data shape.
- The new pattern has at least one reusable trigger beyond a single screenshot.
- The pattern has a controlled enum value, selection rule, size/placement contract, data/interaction contract, fallback, and acceptance checklist.
- The binding contract, generation stability rules, mapping gates, component source map, and relevant chart/table/filter/design-system indexes are updated in the same change.

## Anti-AI Gate

Reject the design or keep readiness `partial` when:

- The source screenshot remains the only way to understand the style.
- A raw image path, embedding, or OCR text is treated as the durable standard.
- A sample is copied as decorative markup without business trigger, data contract, or fallback.
- A pattern is selected because it feels modern, high-end, blue, glassy, or polished, rather than because the data shape needs it.
- The generator invents a near-synonym enum instead of using the controlled vocabulary.
- The component has no exact-value path, state geometry, overflow strategy, or renderer ownership.

## Acceptance Checklist

- Every reusable sample is mapped to a pattern field, a composed pattern contract, or `requires-pattern-extension`.
- Parent block title/body background samples are mapped to `blockChromePattern` or a documented extension gap before body component styling.
- The chosen pattern answers a named business question and has required data fields.
- `styleGeneralization.textOnlyReproduction` is `true` for reusable knowledge.
- Raw screenshot paths are absent from long-lived skill references unless retained for runtime asset, exact restoration, visual baseline, or audit evidence.
- Pattern selection is deterministic under `report-info-component-mapping/references/08-generation-stability.md`.
- Mapping gates can validate the component without multimodal access to the original image.
