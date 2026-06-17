# Decomposition, Attribution, Contribution, And Hierarchy Cards

Use this reference when a card explains how a metric is built, why it changed, which factors contributed, or how a hierarchy rolls up. The design goal is text-only reuse: a downstream model that cannot see the screenshots must still be able to select, size, bind, render, and validate the card.

## Why These Samples Feel Designed

- They have an analytical grammar before they have decoration. Formula cards show operators, attribution cards show contribution direction, contribution cards reconcile to a total, and hierarchy cards show levels and parent-child responsibility.
- They keep the root metric visible while users inspect the explanation path. The title, root value, active tab, and update/freshness line anchor the card so the chart is not an isolated illustration.
- They separate "what happened" from "why it happened". Values, deltas, shares, contribution rates, and residual/other buckets are explicit instead of implied by shape alone.
- They use the right geometry for the business question: formula for multiplicative drivers, waterfall for signed additive variance, Sankey for flow allocation, tree for ownership or hierarchy, heatmap/matrix for cross attribution.
- They reserve exact-value routes. Good cards include detail tabs, side lists, bottom summaries, update time, or drilldown affordances so the visual never becomes decorative evidence.
- They avoid AI flavor by staying constrained: small palette, light borders, clear hierarchy, real numbers, local controls that affect only the card, and no generic "insight" copy without data proof.

## Cause Analysis Diagnostic Card Set

Use this section when screenshot samples or requirements show a family of reason-analysis cards that answer "为什么变好/变差", "主要原因是什么", "哪些因素贡献最大", or "按维度看原因". Treat the source images as reusable inspiration with `retentionPolicy: text-only`; the durable standard is the pattern contract below, not the image path.

This is a composed diagnostic shell. Do not create near-synonym values such as `reason-analysis-card`, `diagnosis-card`, or `ai-insight-cause-card`. Select one existing `decompositionAttributionCardPattern` first, then choose a controlled `causeAnalysisDiagnosticLayout` to place the root metric, evidence body, summary, and detail path.

```ts
type CauseAnalysisDiagnosticLayout =
  | 'metric-rail-plus-topn-bars'
  | 'metric-rail-plus-waterfall'
  | 'metric-rail-plus-donut-legend'
  | 'metric-rail-plus-bubble-scatter'
  | 'metric-rail-plus-path-flow'
  | 'metric-rail-plus-dimension-table';
```

### Sample Coverage Matrix

| Observed sample shape | Controlled pattern | `causeAnalysisDiagnosticLayout` | Use when | Why it feels designed |
| --- | --- | --- | --- | --- |
| Left root metric rail + Top 5 horizontal contribution bars + right net contribution rail | `key-contribution-topn-card`, `feature-attribution-bar-card`, or `overall-contribution-card` | `metric-rail-plus-topn-bars` | Users need the fastest answer to "which factors drove the change" | It has a ranking grammar, right-aligned values, visible positive/negative contribution, and reconciliation summary instead of decorative bars |
| Left root metric rail + waterfall bridge from prior/baseline to current | `variance-waterfall-decomposition-card`, `contribution-waterfall-card`, or `time-attribution-waterfall-card` | `metric-rail-plus-waterfall` | Signed additive deltas must explain how baseline becomes current | The geometry itself proves sequence and reconciliation; users can see start, each driver, residual, and end value |
| Left root metric rail + donut contribution structure + legend table | `contribution-structure-card` or `channel-attribution-donut-card` | `metric-rail-plus-donut-legend` | Part-to-whole contribution share matters more than exact ranking | The center total anchors the story, while the legend carries factor, value, share, and direction without crowding the ring |
| Left root metric rail + cause bubble/scatter evidence | `driver-factor-decomposition-card`, `segment-attribution-card`, or `multidimensional-attribution-matrix-card` when X/Y evidence is real | `metric-rail-plus-bubble-scatter` | Drivers need two numeric axes plus a third magnitude such as contribution value | The card separates relation, size, and direction; important bubbles stand out without turning every point into a label |
| Left root metric rail + driver path/Sankey/tree flow | `sankey-decomposition-card`, `path-contribution-card`, or `contribution-tree-card` | `metric-rail-plus-path-flow` | The reason travels through source -> driver -> segment/outcome or parent -> child levels | The path makes propagation visible, while node/link tooltips preserve exact audit values |
| Left root metric rail + dimension comparison table with reason column | `segment-attribution-card`, `contribution-comparison-card`, or `indented-hierarchy-table-card` | `metric-rail-plus-dimension-table` | Exact comparison, row-level reason, owner, or action is the main decision | The table is scan-aligned, numeric columns are comparable, and the reason column turns the card into a decision surface |

### Diagnostic Shell Anatomy

1. Header band: title left, short business question next to it, optional info icon, one lightweight detail action, and optional component-local selector on the right. The title names the diagnostic job, such as `原因分析卡片`, `影响因素卡片`, or `归因分析`, not only `图表`.
2. Left root metric rail: metric selector or name, root value, current-vs-baseline delta/rate, previous/baseline value, and at most one mini trend. It anchors "what changed" before the body explains "why".
3. Main evidence body: one primary evidence form only: ranked bars, waterfall, donut+legend, bubble/scatter, path/Sankey/tree, or table. Do not use two competing primary charts in the same card.
4. Reconciliation rail or evidence strip: optional right rail for positive total, negative total, net contribution, residual/other, or confidence. Use a soft fill/divider, not a nested card look.
5. Insight strip: optional bottom `32-44px` sentence with one concrete conclusion naming factor, direction, value/share, and scope. It must be derived from the same evidence binding.
6. Exact-value route: tooltip, row list, detail drawer, fullscreen, or table tab. Every abbreviated factor, value, share, method, and residual must be inspectable.

### Slot And Fit Rules

Use these rules for wide diagnostic cards before applying the exact chart/table placement file.

```text
W = card outer width
H = card outer height
P = clamp(16px, W * 0.025, 24px)
headerH = 40-52px
insightH = 0px or 32-44px
railW = clamp(168px, W * 0.20, 220px)
summaryRailW = 0px or clamp(112px, W * 0.14, 160px)
bodyW = W - 2P - railW - summaryRailW - gaps
bodyH = H - 2P - headerH - insightH - gaps
```

- `bodyH >= max(160px, H * 0.52)` for ranked bars, donut, and compact driver cards.
- `bodyH >= 180px` for waterfall or axis-based contribution bars.
- `bodyH >= 200px` for bubble/scatter evidence.
- `bodyH >= 190px` and `bodyH >= H * 0.55` for Sankey/path/tree evidence.
- `bodyH >= 220px` and at least `4` useful rows for dimension tables.
- If `W < 640px`, stack the root metric rail above the evidence body and move the reconciliation rail to a bottom strip; do not squeeze the body below its floor.
- If `H < 300px`, keep root metric, one evidence body, and detail route; remove the mini trend, bottom insight strip, secondary metrics, and right reconciliation rail before shrinking the evidence body.

### Data Contract Additions

Cause-analysis cards must extend `decompositionAttributionEvidenceBinding` with a project-equivalent cause contract:

```ts
type CauseAnalysisDiagnosticEvidence = {
  causeQuestion: 'why-up' | 'why-down' | 'why-change' | 'top-drivers' | 'dimension-reason';
  rootMetricId: string;
  currentValueField: string;
  baselineValueField: string;
  rootDeltaField: string;
  rootDeltaRateField?: string;
  contributorDatasetId: string;
  contributorIdField: string;
  contributorNameField: string;
  contributorRankField?: string;
  contributionValueField: string;
  contributionRateField: string;
  directionField: string;
  reasonTextField?: string;
  positiveContributionTotalField?: string;
  negativeContributionTotalField?: string;
  netContributionField?: string;
  residualField?: string;
  reconciliationFormula: string;
  methodField?: string;
  sourceFreshnessField?: string;
  detailAction: string;
};
```

Required logic:

- `baseline + sum(contributionValue) + residual = current` for additive variance cards, within the declared rounding tolerance.
- Positive/negative contribution totals must reconcile to `netContribution`; if they do not, show residual/other rather than hiding the gap.
- If the method is descriptive contribution, use "贡献", "影响", or "驱动因素"; reserve "归因" or "因果" wording for a declared attribution method, diagnostic model, or business rule.
- Bottom insight copy must be generated from `contributorNameField`, `contributionValueField`, `contributionRateField`, `directionField`, and period/filter scope. Generic copy is invalid.

### Visual Language Rules

- Use a quiet light report surface: white/near-white card, 1px soft border, `6-8px` radius, light shadow, and no card-in-card nesting.
- Keep the left rail visually quieter than the evidence body but numerically strong: root value is the largest text, mini trend is secondary, and the body remains the proof.
- Use color by semantic role: baseline/neutral, current/total, positive contribution, negative contribution, residual/other, selected/highlighted factor, and muted long tail. Do not assign a new saturated color to every reason.
- Use one accent color family plus semantic positive/negative/warning colors. Avoid purple-blue gradients, glass panels, glow buttons, ornamental icons, floating decorative shapes, and random pastel palettes.
- Alignment is deliberate: root metric rail is left-scanned, ranked bars and table labels are left-aligned with values right-aligned, donut and bubble bodies preserve geometric center, waterfall aligns to a visible baseline, and summary rail numbers align on one vertical axis.
- Permanent labels stay bounded: Top `5` reasons, `<=3` permanent annotations, `<=6` visible bars by default, `2-6` donut categories before `Top5 + 其他`, `<=6` bubble labels, and table first-view columns `5-8`.
- The bottom insight strip is a proof sentence, not decoration. Preferred shape: `因素A贡献最大，贡献值 +1,258，占净增长 64.4%。` Add action wording only when `detailAction` or owner/action fields exist.

### Failure IDs

Use these findings when accepting or repairing cause-analysis diagnostic cards:

| ID | Fails when | Required repair |
| --- | --- | --- |
| `RPT-CAUSE-NO-ROOT-METRIC` | The card explains reasons but no root metric, baseline, current value, or period is visible/discoverable | Add root metric rail or summary strip with metric, value, baseline, delta, unit, and period |
| `RPT-CAUSE-NO-RECONCILIATION` | Contributions do not reconcile to root change, residual is hidden, or positive/negative/net totals disagree | Declare formula, tolerance, residual/other policy, and show unmatched amount |
| `RPT-CAUSE-METHOD-UNDECLARED` | The card uses attribution/causal wording without attribution method, diagnostic model, or rule proof | Downgrade wording to contribution/driver evidence or add method proof |
| `RPT-CAUSE-GENERIC-COPY` | Insight text says only "建议关注" or "主要因素表现良好" without factor, value, direction, scope, or action | Generate copy from evidence fields and name the factor/value/share/period |
| `VIS-CAUSE-CHART-MISMATCH` | Donut, Sankey, bubble, waterfall, or table is chosen for visual variety rather than the required data shape | Route to the correct controlled pattern or fallback to bars/table |
| `VIS-CAUSE-EVIDENCE-SQUEEZED` | Main evidence body falls below the family floor or labels/legends/tables overlap | Collapse secondary rails/filters/insight, aggregate Top N, enlarge/split, or move detail to drawer/fullscreen |
| `VIS-CAUSE-AI-POLISH` | The card relies on gradients, glass, glow, generic AI icons, excessive saturation, or equal-weight component collage | Return to quiet report tokens, one primary evidence body, restrained semantic color, and exact-value route |
| `VIS-CAUSE-UNROUTED-SAMPLE` | A screenshot-inspired reason card cannot map to an existing pattern plus `causeAnalysisDiagnosticLayout` | Record `requires-pattern-extension` and do not accept it as reusable standard |

## Controlled Pattern Field

Use `decompositionAttributionCardPattern` when the component is one self-contained card whose primary job is explaining metric structure, drivers, attribution, contribution, or hierarchy.

```ts
type DecompositionAttributionCardPattern =
  | 'formula-decomposition-card'
  | 'funnel-decomposition-card'
  | 'tree-decomposition-card'
  | 'sankey-decomposition-card'
  | 'driver-factor-decomposition-card'
  | 'variance-waterfall-decomposition-card'
  | 'combined-decomposition-card'
  | 'multilevel-metric-decomposition-card'
  | 'total-attribution-card'
  | 'funnel-attribution-card'
  | 'channel-attribution-donut-card'
  | 'touchpoint-attribution-list-card'
  | 'segment-attribution-card'
  | 'feature-attribution-bar-card'
  | 'time-attribution-waterfall-card'
  | 'multidimensional-attribution-matrix-card'
  | 'overall-contribution-card'
  | 'contribution-waterfall-card'
  | 'contribution-structure-card'
  | 'contribution-comparison-card'
  | 'contribution-trend-card'
  | 'contribution-tree-card'
  | 'key-contribution-topn-card'
  | 'contribution-heatmap-card'
  | 'progressive-hierarchy-decomposition-card'
  | 'hierarchy-tree-decomposition-card'
  | 'hierarchy-waterfall-card'
  | 'indented-hierarchy-table-card'
  | 'hierarchy-share-card'
  | 'path-contribution-card'
  | 'multilevel-comparison-hierarchy-card'
  | 'target-attainment-hierarchy-attribution-card';
```

## Pattern Selection

| Business trigger | Pattern | Primary geometry | Required proof |
| --- | --- | --- | --- |
| A metric equals a formula such as revenue = price * orders * conversion | `formula-decomposition-card` | metric tokens linked by operators | formula, factor values, operator order, root reconciliation |
| A root metric is explained by ordered funnel stages | `funnel-decomposition-card` | funnel or horizontal stages | ordered stages, stage value, stage share, drop/conversion if used |
| A root metric splits into parent-child metric nodes | `tree-decomposition-card` | compact tree | node id, parent id, value, level, rollup policy |
| A root value flows into categories, regions, or outcomes | `sankey-decomposition-card` | Sankey | source, target, value, unit, aggregation policy |
| Drivers explain a growth/change result | `driver-factor-decomposition-card` | driver tree/list | baseline, current, driver value, contribution, confidence |
| Signed changes bridge baseline to current | `variance-waterfall-decomposition-card` | waterfall | start, signed deltas, end, residual, sign rule |
| Multiple small explanations are needed in one card | `combined-decomposition-card` | KPI + mini charts/table | primary explanation, secondary evidence limit, exact path |
| Three or more metric levels must remain visible | `multilevel-metric-decomposition-card` | hierarchy tree/table | level fields, visible depth, expand/collapse, rollup |
| Overall change needs attribution by quantity and price/quality/effect | `total-attribution-card` | formula strip + bars | attribution method, baseline, contribution value/rate |
| Ordered conversion attribution is primary | `funnel-attribution-card` | funnel + attribution columns | stage attribution, conversion/drop, same cohort rule |
| Channel contribution should show share and value | `channel-attribution-donut-card` | donut + attribution list | channel id/name, contribution, share, total, method |
| Touchpoints or steps drive a result | `touchpoint-attribution-list-card` | stepped list/timeline | touchpoint order, contribution, share, attribution method |
| User/customer/product segments explain change | `segment-attribution-card` | segmented table/list | segment id, contribution, share, delta, total |
| Product features explain a target metric | `feature-attribution-bar-card` | horizontal bars | feature id, contribution, rank, share, direction |
| Attribution changes over time | `time-attribution-waterfall-card` | time waterfall | time grain, signed deltas, cumulative/period rule |
| Two dimensions cross to explain contribution | `multidimensional-attribution-matrix-card` | matrix/heatmap table | row dimension, column dimension, contribution, total |
| Contribution is a compact summary | `overall-contribution-card` | KPI + ranked bars | root total, contributor value/share, top contributor |
| Contributions bridge from baseline to target/current | `contribution-waterfall-card` | waterfall | additive positive/negative values, subtotal/end value |
| Contribution structure matters more than ranking | `contribution-structure-card` | donut/treemap | total, category contribution, share, other policy |
| Contributors must be compared side by side | `contribution-comparison-card` | bars/table | comparable dimension, metric, delta/share/rank |
| Contribution movement across time matters | `contribution-trend-card` | multi-series trend | time grain, contributor series, total reconciliation |
| Parent-child contribution is primary | `contribution-tree-card` | tree or tree list | hierarchy, contribution values, parent share |
| The top contributors answer the question | `key-contribution-topn-card` | Top N list/bars | rank, contribution, share, cumulative or total |
| Contribution by time and dimension is dense | `contribution-heatmap-card` | heatmap/matrix | time/dimension cells, value, color scale, detail |
| A hierarchy should read as step-by-step rollup | `progressive-hierarchy-decomposition-card` | vertical levels | level order, value/share per level, comparison with parent |
| A formal hierarchy is the answer | `hierarchy-tree-decomposition-card` | tree chart | root, parent-child, visible depth, collapse behavior |
| Level-by-level loss/gain should be compared | `hierarchy-waterfall-card` | waterfall by level | signed level deltas, baseline/current, residual |
| Dense hierarchy needs rows, not shapes | `indented-hierarchy-table-card` | tree table | row hierarchy, expand state, visible columns |
| Parent/child shares across levels matter | `hierarchy-share-card` | stacked bars or share rows | parent total, child share, level share, total share |
| Contribution flows through named paths | `path-contribution-card` | path/tree flow | path id, source, target, contribution, path share |
| Same hierarchy needs current vs baseline comparison | `multilevel-comparison-hierarchy-card` | hierarchy table | current, baseline, change, level, rollup |
| Target attainment must be attributed by hierarchy | `target-attainment-hierarchy-attribution-card` | target card + hierarchy | actual, target, attainment, node contribution/gap |

## Evidence Binding

Every selected card must carry `decompositionAttributionEvidenceBinding` or an equivalent project contract.

```ts
type DecompositionAttributionEvidenceBinding = {
  decompositionMode:
    | 'formula'
    | 'driver'
    | 'attribution'
    | 'contribution'
    | 'variance'
    | 'hierarchy'
    | 'path'
    | 'matrix';
  metricId: string;
  metricName: string;
  unit: string;
  rootMetricId?: string;
  rootValueField: string;
  baselineValueField?: string;
  currentValueField?: string;
  targetValueField?: string;
  attainmentRateField?: string;
  formulaText?: string;
  formulaOperatorField?: string;
  nodeDatasetId?: string;
  nodeIdField?: string;
  nodeNameField?: string;
  parentIdField?: string;
  levelField?: string;
  pathField?: string;
  orderField?: string;
  valueField: string;
  comparisonValueField?: string;
  deltaValueField?: string;
  deltaRateField?: string;
  contributionValueField?: string;
  contributionRateField?: string;
  shareField?: string;
  parentShareField?: string;
  totalShareField?: string;
  directionField?: string;
  signRule: 'positive-is-good' | 'negative-is-good' | 'signed-neutral' | 'domain-defined';
  attributionMethod?: 'first-touch' | 'last-touch' | 'linear' | 'position-based' | 'shapley' | 'rule-based' | 'model-based' | 'domain-defined';
  reconciliationPolicy: 'must-equal-root' | 'allow-residual' | 'non-additive-explained' | 'model-estimate';
  residualField?: string;
  otherPolicy?: 'topn-plus-other' | 'small-item-merge' | 'show-residual' | 'none';
  stageField?: string;
  sourceField?: string;
  targetField?: string;
  linkValueField?: string;
  timeField?: string;
  rowDimensionField?: string;
  columnDimensionField?: string;
  confidenceField?: string;
  tooltipPayload: string[];
  detailAction?: string;
};
```

## Anatomy

Standard cards use the following regions:

1. Header: index/title, optional info icon, local tab or selector, and optional "more" action. The title names the explanatory job, such as "利润归因拆解", not only the chart type.
2. Root metric band: root value, baseline/target/current context, comparison or status chip. This band may collapse in table-heavy cards but must remain available through a summary strip or tooltip.
3. Explanation body: formula, funnel, tree, Sankey, waterfall, matrix, list, or bars. The body must own at least `52%` of card height in visual-heavy cards.
4. Evidence/detail band: exact rows, top contributors, summary cells, update time, detail tab, or drilldown entry.
5. State band: loading/empty/error/no-permission states preserve the same root/body/detail geometry.

## Size Rules

Use these as component minimums before adapting to page grid spans.

| Size family | Min outer size | Use for | Body minimum |
| --- | ---: | --- | --- |
| `decomposition_card` | `480x320` | formula, driver, overall contribution, compact attribution | body `>=160px`, detail band `>=44px` |
| `decomposition_flow_card` | `560x340` | funnel, Sankey, path contribution | flow body `>=190px`, label columns reserved |
| `decomposition_hierarchy_card` | `560x360` | tree, multilevel metric, hierarchy share | hierarchy body `>=200px`, node min `76x34` |
| `decomposition_matrix_card` | `640x360` | attribution matrix, heatmap, hierarchy table | matrix/table body `>=220px`, at least `4` useful rows |
| `contribution_heatmap_card` | `560x340` | contribution heatmap or dense contribution table | heatmap body `>=200px`, legend `>=72px` |

Compact embedded cards may shrink to `360x260` only when there is one root metric, one simple visual, `<=4` visible factors, and a detail route. Do not shrink tree/Sankey/matrix cards below their body floors.

## Data And Interaction Rules

- Formula cards require formula order and operator semantics. Do not show a multiplication or equality chain unless the fields actually reconcile.
- Additive contribution and waterfall cards require signed values, baseline, end value, and residual policy. Positive and negative colors follow business direction, not generic red/green assumptions.
- Attribution cards require an attribution method. If the method is unknown, label the card as contribution or driver evidence rather than causal attribution.
- Hierarchy cards require stable node IDs, parent IDs, levels, and a default expanded depth. Orphan nodes fail acceptance.
- Flow cards require directed `source`, `target`, and `value` fields. Negative values in Sankey/funnel/path flows are invalid.
- Matrix and heatmap cards require bounded row/column counts. Default visible cells should stay within `8 x 6`; larger matrices need scroll, paging, drawer, or fullscreen.
- Every card has an exact-value route through tooltip, side list, table tab, drawer, or fullscreen. Shapes alone are not evidence.
- Local tabs such as "指标拆解/明细数据" or "贡献值/贡献率" are component-local. They must not silently change page-level filters or export scope.
- Update time/source freshness is recommended for any card used to explain business decisions.

## Style Rules

- Keep the root metric and decomposition body in one visual rhythm: same numeric formatter, same unit, same filter period.
- Use color families by semantic role: root/current, positive contribution, negative contribution, neutral/residual, hierarchy group, and selected node. Avoid assigning new colors to every minor node.
- Use light node backgrounds, thin connectors, and reserved gutters. Connectors must terminate at node edges and never cross labels.
- Use permanent labels only for root, key nodes, top factors, and selected state. Secondary labels move to tooltip/detail.
- Prefer tables when exact comparison is the main task; prefer diagram geometry only when structure, flow, or explanatory path is the task.
- For cause-analysis diagnostic shells, preserve the left root metric rail, one primary evidence body, and exact-value route before adding right rails, bottom insight strips, decorative icons, or secondary visuals.

## Fallback Rules

- Missing formula or rollup proof: use `overall-contribution-card`, ranked bars, or a detail table, not formula/tree decomposition.
- Missing attribution method: downgrade attribution wording to contribution/driver evidence.
- Missing additive signed values: do not use waterfall; use bars/table/tree.
- Too many nodes: show Top N + other, default collapse to `2-3` levels, or move to fullscreen/detail.
- Too little card space: keep root metric, one primary explanation, and detail route; remove decorative icons, reduce secondary cells, collapse tabs to dropdown, then split the card.
- Dense matrix/table cannot fit: keep summary card plus "view detail" action; do not compress rows or columns below readability.

## Anti-AI Pitfalls

- Do not present a causal claim when the data only supports correlation or descriptive contribution.
- Do not use Sankey, tree, or funnel because the shape looks sophisticated. Require the matching nodes, links, stages, or formula.
- Do not hide residual, "other", rounding differences, or unmatched children. Reconciliation is part of the design.
- Do not use generic copy such as "核心因素表现良好" without naming the factor, value, direction, and evidence path.
- Do not keep screenshot images as the durable standard. Store this controlled pattern, binding fields, size family, and fallback instead.
- Do not keep a cause-analysis sample as an image-only reference. Map it to `decompositionAttributionCardPattern` plus `causeAnalysisDiagnosticLayout`, or record `VIS-CAUSE-UNROUTED-SAMPLE`.

## Acceptance Checklist

- `decompositionAttributionCardPattern` is selected from the controlled values.
- Screenshot/sample-derived cause-analysis cards declare `causeAnalysisDiagnosticLayout`, `styleGeneralization.sourceRole: reusable-inspiration`, `generalizationStatus`, adaptive variables, fallback, and `textOnlyReproduction: true`.
- `decompositionAttributionEvidenceBinding` declares root metric, value fields, sign rule, reconciliation policy, tooltip payload, and detail action.
- Cause-analysis cards declare `CauseAnalysisDiagnosticEvidence` or equivalent fields for current/baseline/root delta, contributor identity, contribution value/rate, direction, reconciliation formula, source freshness, and detail action.
- The selected pattern has the required data shape: formula, stages, nodes, links, matrix dimensions, or signed deltas.
- Root value and child values reconcile according to the declared policy, or residual/other is visible.
- Minimum size family is satisfied, or a documented fallback is selected before implementation.
- Exact values, update/source, state geometry, and overflow behavior are defined.
- `RPT-CAUSE-*` and `VIS-CAUSE-*` findings are absent or explicitly recorded with repair/fallback decisions.
- The design can be reproduced from text by a non-multimodal model without raw screenshots or image embeddings.
