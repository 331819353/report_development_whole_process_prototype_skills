# 08a Generation Deterministic Selection Order

Load this file when stable component, pattern, KPI, state, or output selection order is needed. It was split from `08-generation-stability.md` to keep the entry file bounded.

## Deterministic Selection Order

Before choosing components, choose the stable `analysisPerspective` from `00-analysis-perspective-card-taxonomy.md`:

1. Use `currentStatus` for "当前怎么样/是否正常/健康度/评分".
2. Use `targetProgress` for "目标达成/进度/差距/里程碑".
3. Use `trendMovement` for "过去怎么变/未来可能怎么走/波动/预测".
4. Use `comparisonDifference` for "谁更高更低/差异/标杆/竞品".
5. Use `rankingContribution` for "Top N/Bottom N/谁贡献最大/主要来自谁".
6. Use `compositionShare` for "占比/结构/构成/份额".
7. Use `decompositionDriver` or `causeDiagnosis` for "由什么组成/为什么变化/归因/贡献". Use `decompositionDriver` when structure is primary; use `causeDiagnosis` when explanation is primary.
8. Use `distributionSpread` for "集中在哪/是否分散/区间/离散/箱线".
9. Use `anomalyRisk` for "哪里不正常/预警/风险/离群/波动异常".
10. Use `relationshipInfluence` for "A 和 B 有没有关系/谁影响谁/关联网络". Then choose `relationshipAnalysisCardPattern`: hub card for one selected subject, matrix card for pairwise strength/correlation, graph card for node-edge networks or communities, Sankey only for directed source-target-value flow, tree only for parent-child relation, scatter/bubble for two numeric variables, trend for relationship over time, factor ranking for ordered relationship strength, and table for exact pair audit. Do not claim influence/causality unless method evidence exists.
11. Use `flowTransfer`, `processBottleneck`, or `conversionRetention` only when the data has directed links, ordered stages, node schema, shared conversion cohort, retention window, conversion/loss formula, or process bottleneck fields. If not, route to comparison, ranking, composition, or detail. For `processBottleneck`, set `processAnalysisCardPattern` and `processAnalysisEvidenceBinding` before choosing the visual shell. For `conversionRetention`, set `conversionRetentionCardPattern` and `conversionRetentionEvidenceBinding` before choosing funnel, heatmap, path, line, bar, donut, table, or loss-card shells.
12. Use `spatialDistribution` only when geography itself is the decision dimension; organization/区域 labels without geography route to ranking/comparison. Then choose `spatialAnalysisCardPattern` when the map is packaged with KPI rails, ranking, controls, trend/change, point/coverage, or migration context: overview -> `spatial-overview-map-card`, hotspot -> `spatial-heat-distribution-card`, target/baseline/level contrast -> `spatial-comparison-map-card`, site/device/store locations -> `spatial-point-distribution-card`, change over time -> `spatial-trend-change-map-card`, exact Top regions -> `spatial-ranking-map-card`, KPI headline with map evidence -> `spatial-kpi-map-diagnostic-card`, 2-4 metrics sharing one geography -> `spatial-composite-metric-map-card`, service reach -> `spatial-coverage-radius-card`, origin-destination movement -> `spatial-flow-migration-card`.
13. Use `timePattern` when day/hour/week seasonality, calendar rhythm, cycle state, time-slot distribution, cumulative progress, or peak-valley pattern is the question, not merely a time trend. Then choose `timePatternCardPattern`: date rhythm -> `calendar-rhythm-overview-card`, event/project lanes -> `calendar-schedule-lane-card`, selected day/week/month/quarter/year state -> `period-cycle-summary-card`, progress/completion status -> `period-progress-status-card`, intraday slot movement -> `time-slot-trend-card`, time-band composition -> `time-slot-share-card`, weekday-hour intensity -> `weekday-hour-heatmap-card`, running total -> `cumulative-time-curve-card`, current vs previous periods on the same grain -> `period-comparison-overlay-card`, peak/valley/spread -> `peak-valley-diagnostic-card`, and forecast threshold risk -> `peak-valley-warning-forecast-card`.
14. Use `multiDimensionalProfile` for one object's multi-metric feature profile, radar/capability profile, tag taxonomy/status/cloud/detail, or feature comparison card. Then choose `multiDimensionalFeatureCardPattern`: object identity -> `object-profile-summary-card`, one shared-scale feature shape -> `radar-feature-profile-card`, current vs target/previous/peer feature shape -> `radar-feature-compare-card`, exact dimension ranking -> `dimension-score-breakdown-card`, features over time -> `feature-trend-profile-card`, multi-subject multi-metric comparison -> `feature-comparison-matrix-card`, two-axis feature distribution -> `feature-bubble-comparison-card`, tag group inventory -> `tag-taxonomy-overview-card`, tag operation state -> `tag-status-board-card`, weighted tags -> `tag-cloud-profile-card`, and tag audit/rule/source -> `tag-rule-detail-card`. Use `populationObject` when the object/person/customer group comparison is primary.
15. Use `populationObject` when the question is about people, cohorts, customer groups, object comparison, or object 360 details. Then choose `populationObjectCardPattern`: first-read profile -> `population-profile-overview-card`, group structure -> `population-segment-composition-card`, RFM -> `population-rfm-matrix-card`, lifecycle -> `population-lifecycle-stage-card`, behavior categories -> `population-behavior-preference-card`, source/channel -> `population-channel-source-card`, geography-bound cohort -> `population-geographic-distribution-card`, frequency bands -> `population-consumption-frequency-card`, loss/churn risk -> `population-churn-risk-card`, object identity -> `object-basic-info-card`, selected-object KPIs -> `object-key-metrics-card`, object structure -> `object-structure-distribution-card`, object coverage geography -> `object-geographic-coverage-card`, object relation neighborhood -> `object-relationship-network-card`, object events -> `object-behavior-timeline-card`, object score/value -> `object-value-score-card`, and object warnings -> `object-risk-alert-card`. If the card is only a feature/radar/tag profile, route to `multiDimensionalProfile`; if risk severity/action is primary, route to `anomalyRisk`; if row audit is primary, route to `detailEvidence`.
16. Use `matrixDecision` when the output needs quadrant, metric matrix, priority, strategy tier, portfolio placement, or action-routing classification. Then choose `matrixDecisionCardPattern`: two numeric axes -> `quadrant-segmentation-card` or `quadrant-bubble-priority-card`; 2x2 quadrant KPI summaries -> `quadrant-kpi-grid-card`; quadrant movement/share evidence -> `quadrant-trend-compare-card` or `quadrant-share-ring-card`; row/column intensity, delta, rating, support, magnitude, or cell trends -> the matching `metric-*`, `rating-*`, `boolean-*`, `bubble-*`, or `sparkline-*` matrix pattern; P0/P1/P2/P3 or ordered urgency/impact/severity -> `priority-*`; L1/L2/L3 strategy, goals, actions, dependencies, or execution layers -> `strategy-*`. Require `matrixDecisionEvidenceBinding`, deterministic `classificationRule`, threshold/dimension fields, density rules, and exact-value route before implementation.
17. Use `marketMovement` only for quote/price/index, K-line/OHLC, market breadth, watchlist/ranking, volatility, risk-return, or market sentiment tasks. Require `marketAnalysisCardPattern` and `marketAnalysisEvidenceBinding` before card-level market packaging; otherwise use ordinary trend, comparison, ranking, distribution, anomaly, chart, or table evidence.
18. Use `definitionHelp`, `conclusionInsight`, `actionRecommendation`, `reviewImpact`, `dataQualityTrust`, `detailEvidence`, and `filterExploration` as evidence/trust/action/exploration perspectives; they often appear as secondary perspectives supporting a primary analytical perspective. For `definitionHelp`, choose `definitionHelpCardPattern` and declare `definitionHelpEvidenceBinding` before visual handoff when the component packages metric meaning, formula,口径, denominator, condition, source, or examples. For `dataQualityTrust`, choose `dataQualityTrustCardPattern` and declare `dataQualityEvidenceBinding` before visual handoff when the component packages overall quality score, completeness, accuracy, consistency, timeliness, anomaly count/rate, issue composition, field distribution, rule pass rate, exception samples, source freshness, reconciliation, or closure actions. Route score/status summaries to `quality-score-overview-card`, time movement to `quality-trend-card`, quality-dimension comparisons to `quality-dimension-radar-card` or `quality-dimension-table-card`, problem composition to `quality-issue-composition-card`, field groups to `quality-field-distribution-card` or `quality-key-field-grid-card`, rule evidence to `quality-rule-accuracy-card`, exact rows to `quality-exception-sample-table-card`, source freshness to `quality-source-freshness-card`, cross-source checks to `quality-reconciliation-card`, and remediation tracking to `quality-action-closure-card`. For `detailEvidence`, choose `detailEvidenceCardPattern` and declare `detailEvidenceBinding` before visual handoff when the component packages row proof, record lookup, metric drilldown, composition drilldown, hierarchy drilldown, sample identity/process/result, related records, log audit, access trace, security audit, or task execution trace. Route row summary tables to `summary-detail-table-card`, value movement plus drilldown to `metric-trend-detail-card`, category drilldown to `composition-drilldown-card`, expandable hierarchy to `hierarchy-drilldown-card`, compact operational rows to `record-list-detail-card`, media/object rows to `object-media-detail-list-card`, subject/customer rows to `subject-initial-list-card`, sample identity/process/result/related records to the matching sample pattern, and operation/access/security/task logs to the matching log/task pattern. For `actionRecommendation`, keep `componentType: card`, set `visualType: action-recommendation-card`, choose `diagnostic-evidence-action-card` when the card explains "why this action", `strategy-impact-action-card` when expected uplift/cost/period is visible, `task-execution-action-card` when checkbox/status/deadline execution is primary, or `priority-immediate-action-card` when priority and CTA dominance are primary; then choose `kpi-line-action`, `kpi-bar-action`, `kpi-composition-action`, `kpi-target-gap-action`, or `evidence-list-action` according to the primary evidence body. For `reviewImpact`, use it only when event/action/activity identity exists and the business question asks "带来了什么变化/上线后效果/活动复盘/前后对比"; choose `event-kpi-overview-card` for core before-after metrics, `event-trend-lift-card` for event-marker trend evidence, `event-funnel-lift-card` for ordered conversion steps, `event-segment-lift-card` for user/group/region heterogeneity, or `event-conclusion-card` for adjacent evidence summaries; then choose the matching `reviewImpactEvidenceMode` and require `reviewImpactEvidenceBinding`.

When several components are plausible, choose in this order:

1. KPI/status card for current judgment.
2. Target/variance card or bullet/progress when target exists.
3. Gauge only when one bounded status/progress metric needs range and threshold judgment.
4. Combo chart only when scale + rate/trend/target must be read together on one shared category/time axis.
5. Trend chart when time movement matters or period filters exist.
6. Structure/ranking chart when the user must locate objects.
7. Process/funnel only when ordered stages, stage/node status, shared population/cohort logic, or process bottleneck fields exist. Set `processAnalysisCardPattern` for process/step/node/bottleneck cards; use plain funnel only when conversion/drop formulas are the primary evidence.
8. Decomposition/waterfall only when cause or additive contribution exists.
9. Detail table/drawer when exact records or evidence matter.
10. Task/action block when closure or responsibility matters.
11. Data-quality trust block when sources, versions, differences, rule pass/fail evidence, denominator confidence, source freshness, or exact exception rows matter.

If two components answer the same atom, keep the one earlier in this order unless the later one provides necessary evidence or action.

For screenshot/sample-derived style generation, first run the shared style generalization target from `report-component-style-design` `references/00a-style-generalization-goal.md`:

1. Choose `covered-by-existing-pattern` when one controlled pattern field matches the business task, data shape, and component family.
2. Choose `covered-by-composed-patterns` when the desired design is a valid composition, such as KPI headline + chart card + local filter + bottom evidence strip, and every child pattern remains valid.
3. Choose `requires-pattern-extension` when the sample is reusable but no controlled field or safe composition covers the business/data trigger.
4. Choose `out-of-scope-one-off` only when the visual is audit evidence, exact restoration, runtime asset, or a non-reusable project exception.

Preserve the selected status, `canonicalPatternRef`, and `patternFields` across runs unless the business question, data shape, template capability, or user instruction changes.

For conclusion/evidence/action cards, keep `componentType: text-summary`, `visualType: text-summary`, set `analysisPerspective: conclusionInsight`, set `analysisInsightContract.subtype: conclusion-card`, choose `conclusionCardPattern`, choose `conclusionEvidenceBodyMode`, and declare `conclusionEvidenceBinding` from `report-component-style-design` `references/03a-conclusion-evidence-action-cards.md` and `report-component-design-spec` `references/12-conclusion-insight-card-standard.md`:

1. `metric-evidence-conclusion` when the card is a standalone executive conclusion with visible KPI evidence, findings, and actions.
2. `finding-action-conclusion` when KPI/chart/table evidence already exists nearby and the card should focus on interpretation and next steps.
3. `compact-conclusion-summary` when the card is constrained and can show only a conclusion plus one evidence/action line.
4. Use `formula-driver-chain` when the conclusion depends on an equation or driver decomposition.
5. Use `composition-structure` when the proof is share, cohort mix, product/channel structure, or part-to-whole evidence.
6. Use `trend-compare-chart` when the proof is current vs previous, target vs actual, or another time baseline.
7. Use `segment-action-table` when groups must route to different actions or priorities.
8. Use `kpi-strip-sparkline` for first-read status summaries with `2-4` core metrics and one compact movement signal.
9. Use `findings-action-list` when evidence is already nearby and the card should focus on findings/actions.

For review impact cards, keep `analysisPerspective: reviewImpact`, choose `reviewImpactCardPattern`, choose `reviewImpactEvidenceMode`, and declare `reviewImpactEvidenceBinding` from `report-component-design-spec` `references/14-review-impact-card-standard.md`:

1. Use `event-kpi-overview-card` with `before-after-kpi-strip` when the question is "活动前后核心指标变化" and the card can show `2-5` ordered metrics with before/after/control and delta fields.
2. Use `event-trend-lift-card` with `event-annotated-trend` when the claim depends on a launch date, event marker, treatment/control series, baseline series, or post-launch trend break.
3. Use `event-funnel-lift-card` with `funnel-step-lift` when the claim depends on ordered conversion steps, step order, conversion/drop/lift fields, and a shared population or documented cohort logic.
4. Use `event-segment-lift-card` with `segment-lift-bars` when the claim depends on differences across user groups, regions, stores, products, channels, or other bounded segments.
5. Use `event-conclusion-card` with `impact-summary-strip` only when the exact evidence exists in adjacent cards or a detail route and this card summarizes one result plus `1-3` facts.
6. Require `baselineMethod` for every pattern. Causal words such as "带来", "推动", or "提升" require `control-group`, `difference-in-differences`, matched baseline, or a documented business rule; otherwise use descriptive "上线后变化" wording.
7. Keep `visualType` as the real evidence family (`metric-card`, `line`, `bar`, `table`, or `text-summary`), while `reviewImpactCardPattern` owns event context, baseline semantics, conclusion band, and fallback.
8. Do not use `reviewImpact` for ordinary trends, ordinary comparisons, or generic conclusions when event/action/activity identity is missing; route to `trendMovement`, `comparisonDifference`, or `conclusionInsight` according to the surviving evidence.

For KPI cards, choose the stable `kpiCardPattern` from `report-component-style-design` `references/04a-kpi-card-patterns.md`:

1. When one card judges status, health, score, rating, risk, progress, or gauge state, set `kpiJudgmentCardPattern` before treating it as an ordinary KPI. Use `semantic-status-icon-card` for categorical states, `progress-status-ring-card` for completion/progress, `health-score-ring-card` for bounded health scores, `health-threshold-bullet-card` for multi-band thresholds, `health-dimension-breakdown-card` for dimension health, `rating-score-summary-card` for score/level summaries, `rating-distribution-card` for rating buckets, and `semicircle-gauge-target-card` for bounded gauge targets. Require `W >= 360px`, `H >= 240px`, status/range/threshold semantics, exactly one hero visual, comparison strip fields, and footer evidence.
2. When one card manages target attainment, target gap, plan-vs-actual progress, remaining work, deadline, or milestone state, set `kpiGoalExecutionCardPattern` before treating it as an ordinary gauge, progress bar, timeline, or target/actual chart. Use attainment patterns for "达成率/超额达成", gap patterns for "差距/缺口/落后/超支", progress patterns for "计划进度 vs 实际进度", and milestone patterns for "阶段/节点/倒计时/里程碑". Require `W >= 360px`, `H >= 240px`, `kpiEvidenceBinding.goalExecution`, actual/target fields, formula/denominator behavior, one execution hero visual, comparison strip fields, and footer evidence.
3. When one card answers trend movement, named-baseline change, YoY/MoM comparison, cycle/period state, volatility/stability, or forecast uncertainty, set `kpiTimeSeriesCardPattern` before treating the line, bar, ring, or forecast band as an ordinary mini chart. Use trend patterns for "趋势/走势", change patterns for "变化/较上期", YoY/MoM patterns for "同比/环比", cycle patterns for "周期/第几周/阶段", volatility patterns for "波动/稳定", and forecast patterns for "预测/置信区间". Require `W >= 360px`, `H >= 240px`, `kpiEvidenceBinding.timeSeries`, ordered x/y fields, grain, latest period, direction semantics, footer evidence, and the selected pattern's baseline/cycle/volatility/forecast fields.
4. When one card answers direct value comparison, group/segment comparison, competitor position, benchmark distance, or variance/gap diagnosis, set `kpiComparisonAnalysisCardPattern` before treating bars, radar, donut, table, map, or VS panes as ordinary chart variety. Use `direct-value-compare-card` for two-period/two-object value comparison, `group-segment-compare-card` for segments/groups/categories, `competitor-position-card` for competitor/peer/industry comparisons, `benchmark-position-card` for P50/P75/P90/industry-standard/best-practice positioning, and `variance-gap-card` for actual-vs-reference gaps. Require `W >= 360px`, `H >= 240px`, `kpiEvidenceBinding.comparisonAnalysis`, shared metric/unit/grain/filter scope, comparable subject roles, direction semantics, selected evidence mode, sort/visible-limit rules, footer evidence, and exact values.
5. For a wide domain/topic card with `2-5` visible metrics, one local control group, and at most one compact evidence visual, set `kpiOverviewCardPattern` before considering single-indicator layout. Use `lead-metric-comparison-sparkline-overview` when one lead metric anchors comparison, target, and sparkline evidence; use `multi-metric-strip-progress-overview` when `3-5` sibling metrics have equal weight; use `domain-metric-cluster-progress-overview` when one lead metric has `2-3` companion metrics and one target/progress summary. Require `W >= 720px`, `H >= 220px`, and `kpiEvidenceBinding.overview`.
6. For landscape, wide, or row-based KPI cards with `W >= 360px`, choose a horizontal pattern first when the evidence can fit inside one KPI card.
7. When the design is a peer grid of one-metric cards with a local period/unit/grain/scale control, compact evidence visual, and target/progress footer, set `kpiSingleIndicatorLayoutMode` after choosing the closest `kpiCardPattern`. Use `dropdown-sparkline-progress` for period dropdown + sparkline, `unit-toggle-ring-progress` for unit/rate toggle + ring, `dropdown-minibar-progress` for period dropdown + mini bars, `grain-switch-minibar-progress` for grain switch + mini bars, `dropdown-area-sparkline-progress` for period dropdown + soft area sparkline, `scale-toggle-area-progress` for value-scale switch + area sparkline, and `dropdown-gauge-progress` for period dropdown + semi-gauge. Require `W >= 360px`, `H >= 220px`, exactly one evidence visual, and target/attainment fields when the footer is visible.
8. Use `horizontal-axis-line-trend` only when the KPI card needs a readable line body with axes, gridlines, target/reference lines, threshold bands, phase annotations, local grain switching, or dual-series comparison and the candidate size can satisfy `W >= 420px`, `H >= 260px`, chart body `>=180px`, and plot height `>=130px`. Set `kpiAxisLineEvidenceMode` according to the evidence: basic comparison, filled baseline, target reference, phase annotation, unit axis, grain switch, dual comparison, or threshold band.
9. Use `horizontal-axis-bar-compare` only when the KPI card needs readable horizontal bars for ranked/time/category comparison, target/reference lines, threshold warning, local grain switching, dual-series comparison, or category change-rate evidence and the candidate size can satisfy `W >= 420px`, `H >= 260px`, chart body `>=180px`, plot height `>=140px`, row height `>=22px`, and visible bars `<=8`. Set `kpiAxisBarEvidenceMode` according to the evidence: basic bar, period comparison, target reference, category change sidebar, time-series bar, grain switch, dual series, or threshold warning.
10. Use `horizontal-axis-scatter-diagnostic` only when the KPI card needs relationship, distribution, outlier, threshold, target-crosshair, quadrant, or category-zone diagnosis with two numeric fields and object grain, and the candidate size can satisfy `W >= 420px`, `H >= 300px`, chart body `>=200px`, plot height `>=160px`, and managed point density. Set `kpiScatterEvidenceMode` according to the evidence: correlation trendline, mean reference, target crosshair, distribution/change band, threshold quadrant, dual series, change callout, or category quadrant.
11. Use `horizontal-spatial-map-diagnostic` only when geography is the decision dimension and the candidate size can satisfy `W >= 460px`, `H >= 320px`, map body `>=220px`, map viewport shorter side `>=180px`, map resource/projection, and visualMap/legend budget. Set `kpiMapEvidenceMode` according to the evidence: choropleth heat, graded choropleth, bubble target gap, distribution/change marker, column symbol, annotation interval, YoY change zone, or point category summary.
12. Use `paired-comparison-diagnostic` only when two panes compare the same metric definition, unit, grain, period/filter scope, and baseline logic, and the candidate size can satisfy `W >= 420px`, `H >= 260px`, pane width `>=140px`, `VS` rail `32-44px`, and bottom conclusion band `>=36px`. Set `kpiComparisonEvidenceMode` according to the evidence: metric YoY, progress MoM, target gap, improvement dot matrix, trend YoY, structure breakdown, percentage ring, or trend MoM.
13. Use `horizontal-trend-compare` when current value plus prior/baseline comparison and a compact sparkline-like trend are the job and axes/thresholds are not needed.
14. Use `horizontal-ring-progress` when one bounded status/progress metric such as OEE, utilization, SLA, or completion is best read through a ring or semi-gauge.
15. Use `horizontal-target-progress` when target attainment and distance to target are best read through a linear track.
16. Use `horizontal-status-trend-compare` for business-negative metrics such as defect, complaint, overdue, risk, cost, or failure where lower-is-better semantics are declared.
17. Use `horizontal-grain-bar-switch` when one local time-grain switch and mini bars are required.
18. Use `horizontal-period-summary-strip` when current, previous, and target values are the complete evidence and a chart would be unnecessary.
19. Use `horizontal-pp-assist-info` when the visible delta is percentage points (`currentRate - baselineRate`), not percent growth.
20. Use `horizontal-warning-status-band` when the KPI has a threshold warning, status badge, and warning reason/action path.
21. Use `target-wave` when target attainment or bounded progress is the main judgment and target data exists but the card is portrait or narrow.
22. Use `highlight-line-trend` when one KPI is the lead card and trend movement is part of the first-viewport answer.
23. Use `mini-bar-trend` when recent period volatility is supporting evidence inside a peer KPI card.
24. Use `plain-metric` when the card only needs current value, comparison, and compact status.

For target/actual comparison cards, keep `visualType: bar`, set `chartSubtype: target-actual-comparison`, and choose `targetActualCardPattern` from `report-component-style-design` `references/04b-target-actual-comparison-cards.md`:

1. `emphasis-header-summary` when one comparison card is the lead first-read object.
2. `standard-summary-panel` when enterprise audit clarity or bottom reconciliation is most important.
3. `soft-chip-summary` when the card is secondary, mobile-friendly, or intentionally softer.

For target/actual trend cards, keep `visualType: line`, set `chartSubtype: target-actual-trend`, and choose `targetActualTrendCardPattern` from `report-component-style-design` `references/04c-target-actual-trend-cards.md`:

1. `emphasis-wave-trend` when one trend card is the lead first-read object and brand emphasis is allowed.
2. `standard-summary-trend` when enterprise audit clarity, target reconciliation, or dense dashboard rhythm is most important.
3. `soft-chip-trend` when the card is secondary, mobile-friendly, or intentionally softer.

For target/actual radar cards, keep `visualType: radar`, set `chartSubtype: target-actual-radar`, and choose `targetActualRadarCardPattern` from `report-component-style-design` `references/04d-target-actual-radar-cards.md`:

1. `emphasis-wave-radar` when one radar card is the lead first-read object and brand emphasis is allowed.
2. `standard-action-radar` when enterprise audit clarity, detail action, or multi-card consistency is more important.

For target/actual donut cards, keep `visualType: pie`, set `chartSubtype: target-actual-donut`, and choose `targetActualDonutCardPattern` from `report-component-style-design` `references/04e-target-actual-donut-cards.md`:

1. `emphasis-filter-donut` when one composition card is the lead first-read object and brand emphasis is allowed.
2. `standard-filter-donut` when enterprise audit clarity, local period switching, or multi-card consistency is more important.

For target/actual scatter cards, keep `visualType: scatter`, set `chartSubtype: target-actual-scatter`, and choose `targetActualScatterCardPattern` from `report-component-style-design` `references/04f-target-actual-scatter-cards.md`:

1. `emphasis-filter-scatter` when one relationship/distribution card is the lead first-read object and brand emphasis is allowed.
2. `standard-filter-scatter` when enterprise audit clarity, local period switching, or multi-card consistency is more important.

For target/actual detail table cards, keep `componentType: table`, `visualType: table`, set `tableSubtype: target-actual-detail`, and choose `targetActualTablePattern` from `report-component-style-design` `references/06a-target-actual-detail-tables.md`:

1. `standard-audit-table` when exact ranked row evidence, target reconciliation, total row, export, or audit clarity is the main task.
2. `compact-audit-table` when the card is narrow, mobile, embedded, or only a Top N evidence preview.

For target/actual pivot table cards, keep `componentType: table`, `visualType: pivot`, set `tableSubtype: target-actual-pivot`, and choose `targetActualPivotTablePattern` from `report-component-style-design` `references/06b-target-actual-pivot-tables.md`:

1. `standard-hierarchy-pivot` when a clean two-dimension target/actual pivot with subtotals and grand total is the main task.
2. `share-matrix-pivot` when amount plus share/contribution columns are required under comparison, actual, or target groups.
3. `tree-expand-pivot` when compact row hierarchy, expand/collapse, or many row groups are required.

For reusable table card patterns, keep `componentType: table`, keep `visualType` as `table` or `pivot`, and choose `tableCardPattern` from `report-component-style-design` `references/06c-table-card-patterns.md`:

1. `plain-detail-ledger-table` when row-level audit, order ledger, customer list, transaction list, or exact detail evidence is primary.
2. `filtered-operational-status-table` when local filters, status badges, row detail, export, or operational scanning are primary.
3. `grouped-header-summary-table` when fields naturally group by metric family, period, actual/target, amount/share, or business domain.
4. `metric-matrix-table` when indicator families, target/actual/score/weight, or multidimensional metrics need matrix comparison.
5. `s2-cross-pivot-table` when row dimension by column dimension aggregate summaries need S2-class pivot behavior.
6. `fixed-column-scroll-table` when a wide schedule, progress, or period table requires frozen key columns and horizontal scroll.
7. `grouped-subtotal-summary-table` when grouped rows, subtotals, and grand-total reconciliation are primary.
8. `tree-hierarchy-table` when parent-child rows, expandable hierarchy, and row-level metrics are primary.

For ranking, leaderboard, and Top N cards, keep `componentType: card`, `visualType: ranking-list`, choose `rankingCardPattern` from `report-component-style-design` `references/07a-top-ranking-cards.md`, and declare `rankingEvidenceBinding`:

1. `basic-rank-list-card` for the cleanest Top 5 rows with rank, object, secondary label, and value.
2. `trend-delta-rank-list-card` or `topn-sparkline-rank-list-card` when ranking movement or per-row trend proof is visible.
3. `progress-bar-rank-list-card` or legacy `bar-progress-ranking` when value gaps should be read through shared bar tracks.
4. `podium-rank-card` or legacy `medal-horizontal-ranking` when a broad card should stage top winners.
5. `yoy-microbar-rank-list-card` when row-level micro bars and YoY/MoM deltas are the evidence.
6. `radar-comparison-rank-card` when ranking is based on multi-dimensional score/profile comparison.
7. `metric-summary-rank-card` when 2-3 summary metrics must sit above the rank list.
8. `time-switch-rank-card` when the card owns a local day/week/month/period switch.
9. `share-donut-rank-card` when Top N share/concentration is visible through a donut plus list.
10. `map-distribution-rank-card` when geography itself is the ranked object and map evidence is needed.
11. `topn-bar-rank-card`, `topn-comparison-rank-card`, `topn-waterfall-strip-card`, `topn-bubble-rank-card`, or `topn-icon-card-grid` for compact Top N cards in a grid where bars, comparison columns, contribution strips, bubbles, or icon/entity cards are the primary evidence.
12. `compact-list-ranking` remains a legacy/narrow fallback when only rank, object, and value can fit.

For Pareto cards, keep `componentType: card`, `visualType: ranking-list`, choose `paretoCardPattern`, and declare `paretoEvidenceBinding`:

1. `pareto-basic-card` for sorted bars + cumulative line + threshold.
2. `pareto-table-chart-card` when a small exact rank table must sit with the Pareto chart.
3. `pareto-dual-axis-card` when value and cumulative share both need axes.
4. `pareto-cumulative-fill-card` when cumulative contribution region is emphasized.
5. `pareto-stacked-share-card` when single-item share and cumulative share should be compared together.
6. `pareto-bubble-card` when key factors should read as scale objects plus cumulative progression.
7. `pareto-zone-card` when key vs secondary factors need colored threshold zones.
8. `pareto-ring-list-card` when a compact summary ring plus ranked factor list is enough.

For composition, share, structure, and market-share cards, keep `componentType: card`, `visualType: composition-card`, choose `compositionShareCardPattern`, and declare `compositionShareEvidenceBinding`:

1. `basic-donut-share-card` or `donut-detail-share-card` when 2-6 categories need one denominator, a center total, and exact side or tooltip values.
2. `percent-bar-share-card` when close percentages must be compared precisely.
3. `multi-ring-hierarchy-share-card`, `sunburst-structure-card`, or `treemap-composition-card` when parent-child structure and share are both decision evidence.
4. `share-trend-stack-card`, `stacked-strip-composition-card`, or `stacked-column-trend-composition-card` when share movement across time or groups is primary and each bucket reconciles to 100%.
5. `share-ranking-topn-card` when the largest shares and their rank order are the primary task; combine with `rankingEvidenceBinding` only when row order itself is a ranking decision.
6. `funnel-composition-card` only when categories have a natural ordered level or stage-like structure but no cohort conversion logic; use conversion funnel contracts for true stage conversion.
7. `bubble-composition-card` when approximate share magnitude and grouping are more important than exact rank.
8. `market-share-overview-card`, `market-share-concentration-card`, or `share-distribution-interval-card` when external market denominator, CR metrics, or share buckets are primary.
9. `map-structure-card` only when geography is the structure dimension with region codes or coordinates.
10. `share-metrics-summary-card` when one share visual must be paired with total amount/count/average strips under the same denominator.

For decomposition, attribution, contribution, and hierarchy cards, keep `componentType: card`, `visualType: decomposition-card`, choose `decompositionAttributionCardPattern`, and declare `decompositionAttributionEvidenceBinding`:

1. Use `formula-decomposition-card` when the visible explanation is a formula and all factors/operators reconcile to the root.
2. Use `funnel-decomposition-card` when ordered stages explain the root but the primary question is metric structure rather than cohort conversion.
3. Use `tree-decomposition-card` or `multilevel-metric-decomposition-card` when parent-child metric nodes explain the root; choose multilevel when `3+` levels must remain visible.
4. Use `sankey-decomposition-card` or `path-contribution-card` when source-target-value links or named paths explain where the root value flows.
5. Use `driver-factor-decomposition-card` when drivers explain growth/change but the math is not a signed additive bridge.
6. Use `variance-waterfall-decomposition-card`, `contribution-waterfall-card`, or `time-attribution-waterfall-card` when signed additive values bridge baseline to current/target by factor or period.
7. Use `combined-decomposition-card` when one compact card needs root metric plus `2-3` bounded explanation visuals and every child stays above its minimum.
8. Use `total-attribution-card` only when an attribution method is declared; otherwise use contribution or driver wording.
9. Use `channel-attribution-donut-card`, `touchpoint-attribution-list-card`, `segment-attribution-card`, or `feature-attribution-bar-card` according to the primary attribution dimension.
10. Use `multidimensional-attribution-matrix-card` when two dimensions cross to explain the result and the visible matrix is bounded.
11. Use `overall-contribution-card`, `contribution-structure-card`, `contribution-comparison-card`, `contribution-trend-card`, `contribution-tree-card`, `key-contribution-topn-card`, or `contribution-heatmap-card` according to whether the main reading task is summary, structure, comparison, movement, hierarchy, top factors, or dense time/dimension cells.
12. Use `progressive-hierarchy-decomposition-card`, `hierarchy-tree-decomposition-card`, `hierarchy-waterfall-card`, `indented-hierarchy-table-card`, `hierarchy-share-card`, `multilevel-comparison-hierarchy-card`, or `target-attainment-hierarchy-attribution-card` according to whether the hierarchy is step rollup, tree structure, signed level change, dense rows, share by level, current-vs-baseline comparison, or target-gap attribution.

For distribution, interval, density, quantile, and boxplot cards, keep `componentType: card`, `visualType: distribution-card`, choose `distributionAnalysisCardPattern`, and declare `distributionAnalysisEvidenceBinding`:

1. Use `numeric-histogram-distribution-card` or `interval-histogram-card` when bounded interval counts are primary and each bucket has lower/upper bounds, count, share, and sort order.
2. Use `interval-donut-distribution-card` or `interval-share-donut-card` when interval composition is primary and the denominator reconciles to the sample count.
3. Use `percentile-cdf-distribution-card`, `cumulative-interval-card`, or `quantile-band-density-card` when percentile position, P25/P50/P75/P90, or cumulative coverage is the decision evidence.
4. Use `univariate-density-curve-card`, `interval-density-curve-card`, `grouped-density-comparison-card`, `density-heatmap-card`, `kde-cumulative-density-card`, `bivariate-density-hexbin-card`, or `density-overview-card` only when the density estimator or precomputed density field, sample count, and smoothing/binning policy are declared.
5. Use `boxplot-kpi-summary-card`, `time-series-boxplot-card`, `grouped-boxplot-comparison-card`, `boxplot-overview-card`, `boxplot-side-summary-card`, `weekday-boxplot-card`, `anomaly-boxplot-card`, or `boxplot-detail-table-card` only when Q1, median, Q3, whisker min/max, sample count, and outlier/whisker rule are declared.
6. Use `geographic-distribution-card` only when geography fields or a map resource exist; otherwise route to interval/ranking/table.
7. Use `time-distribution-card` or `calendar-heatmap-distribution-card` when the distribution is over hour/day/week and missing cells versus zero cells are explicitly different.
8. Use `distribution-comparison-card` when groups or periods share the same bucket/statistic definition and comparable sample counts are visible or available through tooltip.
9. Use `multidimensional-population-distribution-card` when two population sides or dimensions share aligned intervals and the visual answers "who is concentrated where".
10. Use `interval-detail-table-card` or `boxplot-detail-table-card` when exact audit of buckets/statistics is primary or when the chart body cannot fit without hiding statistical proof.

For anomaly, risk, warning, and outlier analysis cards, keep `componentType: card`, `visualType: anomaly-card`, choose `anomalyAnalysisCardPattern`, and declare `anomalyAnalysisEvidenceBinding`:

1. Use `anomaly-overview-card` when current abnormal/risk/warning state, severity, value, comparison, and freshness are the first-read answer.
2. Use `anomaly-trend-compare-card` or `anomaly-baseline-compare-card` when time movement or current-vs-baseline proof is the diagnostic lens.
3. Use `anomaly-distribution-structure-card`, `warning-progress-donut-card`, or `anomaly-interval-threshold-card` when severity/share, status progress, interval, or threshold bands are primary.
4. Use `anomaly-timeline-card`, `anomaly-ranking-top-card`, or `anomaly-summary-table-card` when ordered events, Top affected objects, or compact row evidence is primary.
5. Use `anomaly-multi-metric-monitor-card` when a bounded set of metrics share one warning context and every visible metric has threshold/status fields.
6. Use `risk-matrix-card` when likelihood and impact cross to form the decision; use `risk-response-status-card` when processing closure, owner, SLA, or unresolved count is primary.
7. Use `anomaly-impact-assessment-card` when affected users/orders/services, loss, duration, or impact score is the answer.
8. Use `anomaly-relation-influence-card`, `anomaly-geographic-distribution-card`, or `outlier-scatter-card` only when relation, geography, or outlier point fields are present and density/fallback rules are declared.

For matrix decision, quadrant, priority, and strategy-layer cards, set `analysisPerspective: matrixDecision`, keep `componentType: card`, `visualType: matrix-decision-card`, choose `matrixDecisionCardPattern` from `report-component-design-spec` `references/09-matrix-decision-card-standard.md`, and declare `matrixDecisionEvidenceBinding`:

1. Use `quadrant-segmentation-card` when two numeric metrics and x/y thresholds classify objects into zones.
2. Use `quadrant-kpi-grid-card` when the four zones need compact KPI summaries rather than point-level scatter.
3. Use `quadrant-trend-compare-card` or `quadrant-share-ring-card` when each quadrant needs movement or share evidence.
4. Use `quadrant-bubble-priority-card` when x/y placement also needs non-negative size/volume/opportunity evidence.
5. Use `metric-heatmap-matrix-card`, `metric-delta-matrix-card`, or `metric-intensity-matrix-card` when row/column dimensions classify current value, baseline delta, or ordered intensity.
6. Use `rating-matrix-card`, `boolean-support-matrix-card`, `bubble-magnitude-matrix-card`, or `sparkline-trend-matrix-card` when cell evidence is rating, support yes/no, size magnitude, or miniature trend.
7. Use `priority-summary-card`, `priority-detail-list-card`, `priority-pyramid-card`, `priority-quadrant-card`, `priority-timeline-card`, `priority-donut-list-card`, `priority-kanban-swimlane-card`, or `priority-trend-card` when ordered priority drives action, owner, status, SLA, or follow-up.
8. Use `strategy-pyramid-card`, `strategy-hierarchy-list-card`, `strategy-goal-breakdown-card`, `strategy-matrix-card`, `strategy-timeline-card`, `strategy-funnel-layer-card`, `strategy-stack-card`, or `strategy-dependency-tree-card` when L1/L2/L3 layers, goals, actions, dependencies, completion, or execution stages are the decision scaffold.
9. Keep `visualType` as a real chart/table family only when the component is standalone evidence without card-level matrix decision packaging.
10. Reject or downgrade the card when axes, dimensions, priority/layer fields, thresholds, deterministic classification rule, exact-value route, or density/fallback rules are missing.

For market movement, quote, K-line, breadth, watchlist, and volatility cards, set `analysisPerspective: marketMovement`, keep `componentType: card`, `visualType: market-analysis-card`, choose `marketAnalysisCardPattern` from `report-component-design-spec` `references/10-market-analysis-card-standard.md`, and declare `marketAnalysisEvidenceBinding`:

1. Use `quote-price-snapshot-card`, `quote-price-indicator-card`, `quote-sparkline-range-card`, or `quote-multi-period-compare-card` when instrument identity, current quote, change, change rate, unit/currency, source/freshness, and local period/range fields are the first-read evidence.
2. Use `kline-basic-card`, `kline-volume-card`, `kline-moving-average-card`, or `kline-technical-indicator-card` only when ordered valid OHLC rows exist; add volume, MA, MACD, RSI, or other indicators only when their fields and chart height budget exist.
3. Use `watchlist-table-card` or `market-leaderboard-card` when bounded instrument rows need price/change/rank/detail comparison with deterministic sort and overflow path.
4. Use `market-breadth-overview-card`, `market-breadth-distribution-card`, `market-breadth-share-card`, `market-breadth-trend-card`, or `market-breadth-heatmap-card` when up/down/flat or category breadth counts reconcile to a denominator.
5. Use `volatility-overview-card`, `volatility-range-card`, `volatility-trend-card`, `volatility-distribution-card`, `volatility-heatmap-card`, `volatility-compare-card`, or `volatility-warning-card` only when volatility formula, window, unit, percentile/threshold, and fallback are declared.
6. Use `risk-return-bubble-card` when x/y/size observations share one grain, and use `market-sentiment-gauge-card` only when score range, threshold, and market state dictionary are declared.
7. Keep `visualType` as a real chart/table family only when the evidence is standalone without quote identity, local controls, freshness/status, and market card packaging.
8. Reject or downgrade the card when instrument identity, quote/OHLC/breadth/volatility fields, color convention, source/freshness, exact-value route, or dense-data fallback are missing.

For population, object, customer segmentation, and object detail cards, set `analysisPerspective: populationObject`, choose `populationObjectCardPattern` from `report-component-design-spec` `references/08-population-object-analysis-card-standard.md`, and declare `populationObjectEvidenceBinding`:

1. `population-profile-overview-card` when a user/customer/member/cohort needs identity, tags/status, `2-5` facts, source/freshness, and one compact evidence mode.
2. `population-segment-composition-card` when segment count/share and denominator are the primary evidence.
3. `population-rfm-matrix-card` when recency, frequency, monetary score/bin, and segment assignment fields exist.
4. `population-lifecycle-stage-card` when ordered lifecycle stages, counts/shares, and optional transitions or trends are primary.
5. `population-behavior-preference-card` when behavior/category preferences need ranked bars or lists.
6. `population-channel-source-card` when source/channel composition and exact value/share are primary.
7. `population-geographic-distribution-card` when geography itself is the population decision dimension and region codes or coordinates exist.
8. `population-consumption-frequency-card` when ordered frequency bands, counts/shares, period, and boundary definitions are valid.
9. `population-churn-risk-card` when churn/loss risk level, affected count/share, threshold or detail/action route exists.
10. Use the `object-*` patterns when a selected business object owns the card: basic identity, key metrics, structure distribution, geographic coverage, relationship network, behavior timeline, value score, or risk alert.
11. Keep `visualType` as the real evidence family such as `metric-card`, `composition-card`, `spatial-map-card`, `graph`, `operational-list`, `anomaly-card`, `table`, or `other`; `other` is allowed only for a data-driven custom population/object component with declared renderer ownership and fallback.

For basic chart cards, keep `componentType: chart`, keep `visualType` as the real chart family, and choose `basicChartCardPattern` from `report-component-style-design` `references/05d-basic-chart-card-patterns.md`:

1. `single-series-bar-card` when one metric compares a small set of categories.
2. `comparison-line-trend-card` when two or more comparable series share one time grain.
3. `area-trend-card` when one continuous volume trend should read as movement over time.
4. `bar-line-combo-card` when one scale metric and one related count/rate need the same x-axis.
5. `pie-composition-card` when part-to-whole composition is small and no center total is needed.
6. `donut-composition-card` when composition needs a center total or selected summary.
7. `stacked-bar-composition-card` when category totals and segment composition must be read together.
8. `multi-metric-combo-card` when two scale metrics and one rate/efficiency metric share a time/category axis.
9. `filtered-bar-card` when a simple bar comparison owns a compact local period/range selector.
10. `tooltip-line-trend-card` when dense daily/rolling trend values should be inspected through tooltip focus.

For specialized chart cards, keep `componentType: chart`, keep `visualType` as the real chart family, and choose `specializedChartCardPattern` from `report-component-style-design` `references/05e-specialized-chart-card-patterns.md`:

1. `gauge-progress-card` when one bounded progress, completion, or status metric needs range and target judgment.
2. `choropleth-ranking-map-card` when geography is the decision dimension and a side ranking helps exact Top regions.
3. `time-heatmap-card` when two ordered dimensions, usually time by time or category by time, need hotspot pattern reading.
4. `candlestick-volume-card` when OHLC plus volume and moving-average context are primary.
5. `boxplot-distribution-card` when distribution, median, IQR, spread, or outliers across categories are primary.
6. `parallel-profile-card` when `3+` metrics describe object profiles and users need similarity, anomaly, or multi-factor screening.
7. `bubble-opportunity-card` when x/y relationship plus non-negative size metric is the primary opportunity or portfolio question.

For flow/hierarchy diagram cards, keep `componentType: chart`, keep `visualType` as the real diagram family, and choose `flowHierarchyDiagramCardPattern` from `report-component-style-design` `references/09a-flow-hierarchy-diagram-card-patterns.md`:

1. `conversion-funnel-card` when ordered stages, shared population/cohort, conversion, drop, or retention are primary.
2. `multi-stage-sankey-card` when source-target-value links distribute across multiple stages or outcomes.
3. `journey-stage-map-card` when a staged user/business journey needs goals, behaviors, touchpoints, emotions, and opportunities.
4. `hierarchy-tree-card` when parent-child structure, organization, category, ownership, lineage, or decomposition is primary.
5. `hub-relation-network-card` when one central object and surrounding relationship clusters are primary.
6. `sunburst-composition-card` when hierarchy path plus composition share should be read through radial rings.
7. `treemap-composition-card` when hierarchy contribution and relative area comparison are primary.
8. `path-conversion-flow-card` when start-to-end branches, edge ratios, and terminal success/loss outcomes are primary.

For process, step, node, and bottleneck analysis cards, set `analysisPerspective: processBottleneck`, choose `processAnalysisCardPattern` from `report-component-design-spec` `references/04-process-bottleneck-analysis-card-standard.md`, and declare `processAnalysisEvidenceBinding`:

1. Use the process-flow group (`linear-process-flow-card`, `ring-process-flow-card`, `timeline-process-flow-card`, `stage-card-process-flow-card`, `branch-process-flow-card`, `funnel-process-flow-card`, `cycle-process-flow-card`, `map-path-process-flow-card`) when the whole process path, branch, loop, or topology is the evidence.
2. Use the step-progress group (`horizontal-stepper-card`, `icon-stepper-card`, `number-stepper-card`, `segmented-stepper-card`, `vertical-stepper-card`, `timeline-stepper-card`, `cycle-stepper-card`, `stepper-metric-card`) when current step, completed/in-progress/pending state, remaining steps, or stage progress is the evidence.
3. Use the node-structure group (`horizontal-node-flow-card`, `ring-node-map-card`, `tree-node-structure-card`, `node-grid-status-card`, `hub-node-relation-card`, `node-timeline-card`, `hierarchy-node-card`, `node-network-card`) when node status, node relation, hierarchy, active nodes, or abnormal nodes are the evidence.
4. Use the bottleneck-diagnosis group (`bottleneck-stage-highlight-card`, `bottleneck-ranking-card`, `bottleneck-gauge-card`, `bottleneck-heatmap-card`, `bottleneck-waterfall-card`, `bottleneck-bubble-card`, `bottleneck-trend-card`, `bottleneck-cause-donut-card`) when duration, queue, throughput, pass rate, timeout, rework, threshold breach, impact, root cause, or optimization priority is the evidence.
5. Keep `visualType` as the real evidence family such as `path`, `funnel`, `tree`, `graph`, `gauge`, `bar`, `line`, `heatmap`, `table`, `operational-list`, `anomaly-card`, `metric-card`, or `other`; `other` is allowed only for a data-driven custom process diagram with declared renderer ownership and fallback.

For conversion, retention, loss, and stage conversion analysis cards, set `analysisPerspective: conversionRetention`, choose `conversionRetentionCardPattern` from `report-component-design-spec` `references/05-conversion-retention-analysis-card-standard.md`, and declare `conversionRetentionEvidenceBinding`:

1. Use the conversion overview group (`conversion-overview-card`, `conversion-quality-overview-card`) when total conversion, converted count, entered population, target, quality, or prior-period comparison is the evidence.
2. Use the stage conversion group (`standard-conversion-funnel-card`, `stage-rate-matrix-card`, `stage-conversion-overview-card`) when ordered stages, shared cohort, step conversion, and drop-off are the evidence.
3. Use the trend and comparison group (`conversion-trend-card`, `conversion-comparison-card`, `conversion-channel-distribution-card`) when period movement, channel/device/segment/source comparison, or rank of conversion performance is the evidence.
4. Use the loss diagnosis group (`loss-overview-card`, `loss-reason-composition-card`, `loss-segment-distribution-card`, `loss-warning-card`, `loss-impact-card`) when loss rate/value, loss reason, affected segment, threshold, or business impact is the evidence.
5. Use the retention group (`retention-overview-card`, `retention-cohort-heatmap-card`, `retention-curve-card`, `retention-segment-card`, `retention-target-progress-card`) when cohort base, retention window, retained value, retention target, or retention segment comparison is the evidence.
6. Use the stage path group (`conversion-path-card`, `stage-leakage-waterfall-card`, `stage-conversion-path-card`) when transition links, branch paths, or accumulated leakage are the evidence.
7. Keep `visualType` as the real evidence family such as `metric-card`, `funnel`, `line`, `bar`, `heatmap`, `sankey`, `path`, `pie`, `table`, `operational-list`, or `other`; `other` is allowed only for a data-driven custom conversion diagram with declared renderer ownership and fallback.

For operational lists, keep `visualType: operational-list` and choose `listStatusPattern` from `report-component-style-design` `references/07b-operational-list-status-patterns.md`:

1. `simple-info-list` when ordinary records need title/name, owner, status, update time, and a trailing action.
2. `progress-task-list` when task closure, owner/deadline, status, and completion percent are the main evidence.
3. `severity-alert-list` when alert severity, threshold/current value, and occurrence time are primary.
4. `exception-record-list` when failures or incidents need error code, occurrence time, and handling state.
5. `status-chip-set` when the component is a reusable status tag set rather than record rows.
6. `event-timeline` when ordered workflow, event, approval, release, or operation history is primary.
7. `user-object-list` when people, members, owners, customers, or contacts require avatar/identity and availability status.
8. `mixed-info-list` when work items combine title, subtitle, status, priority, owner, and update time but do not require a full table.

For visible filter controls, choose `filterControlPattern` from `report-filter-control-design-spec` `references/02-filter-selector-patterns.md`:

1. `single-select-dropdown` for ordinary one-value dimensions with small or medium option sets.
2. `multi-tag-select` when selected multiple values should remain visible as removable tags.
3. `date-range-selector` when the control selects an exact period or shortcut period.
4. `searchable-select` when option volume is large or keyword lookup is expected.
5. `tree-path-selector` when organization, region, category, or product hierarchy must stay visible.
6. `advanced-filter-drawer` when multiple low-frequency or expensive conditions should be grouped behind one trigger.
7. `combined-filter-chipbar` when the surface should summarize active filters and open the full filter set on click.

For reusable overlays, keep `visualType: overlay-panel` and choose `overlayPanelPattern` from `report-component-style-design` `references/08a-overlay-drawer-modal-patterns.md`:

1. `right-filter-drawer` when multiple table/report filters need a right-side configuration surface.
2. `bottom-action-sheet` when a small operation menu should slide from the bottom.
3. `center-confirmation-modal` when a focused confirmation, especially destructive or irreversible, is required.
4. `fullscreen-detail-modal` when a full object record needs tabs, grouped fields, and sticky actions.
5. `top-notification-bar` when a success/warning/info message should appear without blocking work.
6. `left-navigation-drawer` when temporary module navigation should preserve page context.
7. `side-detail-drawer` when a selected row/card needs compact detail while the source list stays visible.
8. `large-detail-side-panel` when analytical detail requires KPI, tabs, chart/table evidence, and a wide side panel.

For Micro Dashboard Cards, keep `componentType: custom`, set `visualType: micro-dashboard`, and choose `microDashboardCardPattern` from `report-component-style-design` `references/12f6-placement-micro-dashboard-card.md`:

1. `sales-fresh-analysis-board` when sales, revenue, orders, target attainment, channel mix, region ranking, and Top object detail are the shared topic.
2. `user-operations-purple-board` when user acquisition, active users, retention, conversion, funnel, heatmap, and product-operation signals are the shared topic.
3. `supply-chain-orange-monitoring-board` when procurement, supplier delivery, inventory, logistics, warnings, shortages, or exceptions are the shared topic.
4. `finance-blue-analysis-board` when revenue, profit, cost, expense, cash, accounts, or reconciliation is the shared topic.

Use `micro-dashboard` only when the parent can meet `680x620` minimum and every visible child meets its declared minimum. Otherwise choose a normal `composite-panel`, split blocks, tabs, drawer, or fullscreen.

For state feedback components, keep `componentType: custom`, set `visualType: state-feedback`, and choose `stateFeedbackPattern` from `report-component-style-design` `references/13-state-feedback-patterns.md`:

1. `fresh-line-state-set` for default professional report states.
2. `minimal-line-state-set` for dense admin, audit, or low-distraction states.
3. `business-blue-state-set` for enterprise portal and management-app defaults.
4. `soft-illustration-state-set` for guided self-service or friendly product states.
5. `glass-card-state-set` for card-based state galleries or template-library displays.
6. `dark-tech-state-set` only inside a dark monitoring, security, or ops-center template.
7. `playful-healing-state-set` only when brand and risk context allow a playful state.
8. `immersive-fullscreen-state-set` for page-level blocking scenes, not small chart/table states.
