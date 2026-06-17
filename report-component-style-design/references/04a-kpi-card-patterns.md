# KPI Card Pattern Library

Use this reference after `04-kpi-metric-cards.md` when a report prototype or component spec needs KPI cards that feel product-specific rather than generic metric shells, including portrait KPI cards, KPI overview cards, single-indicator KPI grid cards, KPI judgment cards for status/health/rating/gauge decisions, KPI goal execution cards for target attainment/gap/progress/milestones, KPI time-series analysis cards for trend/change/YoY-MoM/cycle/volatility/forecast decisions, KPI comparison analysis cards for direct/group/competitor/benchmark/variance decisions, landscape/horizontal KPI cards, horizontal axis-line diagnostic KPI cards, horizontal axis-bar diagnostic KPI cards, horizontal scatter diagnostic KPI cards, horizontal spatial-map diagnostic KPI cards, and paired comparison diagnostic KPI cards.

The pattern library does not replace the KPI data contract, numeric display contract, or placement rules. It chooses the card expression after the metric purpose, target/baseline, trend evidence, and parent viewport are known.

## Pattern Selection

Keep `visualType: "metric-card"` for all KPI cards. Add `kpiCardPattern` in component metadata or widget config to choose the internal expression. When one card summarizes a business domain with several metrics, also add `kpiOverviewCardPattern`; do not force the card into a single-indicator pattern. When the card's main job is to judge status, health, score, rating, risk, or gauge progress, also add `kpiJudgmentCardPattern` so the card has explicit status scale, threshold, and evidence semantics rather than decorative KPI polish. When the card's main job is target execution management, also add `kpiGoalExecutionCardPattern` so target attainment, gap, progress, milestone, remaining work, and deadline semantics are explicit instead of being scattered across generic gauges, timelines, or decorative progress bars. When the card's main job is time-series analysis, also add `kpiTimeSeriesCardPattern` so trend, change, YoY/MoM, cycle, volatility, and forecast semantics are explicit instead of being hidden in generic sparklines. When the card's main job is comparison analysis, also add `kpiComparisonAnalysisCardPattern` so direct comparison, group comparison, competitor comparison, benchmark position, and variance/gap semantics are explicit instead of being hidden in generic bars, radar charts, tables, or paired panes.

| `kpiCardPattern` | Use when | Required data | Avoid when |
| --- | --- | --- | --- |
| `plain-metric` | The card only needs a current value and one or two comparisons. | metric name, value, unit, period, at least one baseline/comparison or status. | A target/progress/trend is the main evidence. |
| `target-wave` | Target attainment or completion rate is the main judgment. | value, target, attainment rate, unit, period, target formula. | No bounded target exists, or progress semantics are unclear. |
| `mini-bar-trend` | The user needs quick period volatility or recent distribution evidence. | value, unit, period, trend series with ordered categories, comparison values. | The series has fewer than three points or exact trend audit is the main task. |
| `highlight-line-trend` | One KPI should become the primary visual anchor in a KPI group or first viewport. | value, unit, period, trend series, latest point, comparison values, target or threshold when available. | Many cards need equal weight, or a dark/emphasis token is not approved. |
| `horizontal-trend-compare` | A landscape KPI needs current value, prior/baseline comparison, and a small trend line. | value, unit, comparison label/value, ordered trend series, tooltip payload. | The trend needs axes, target lines, or exact audit. |
| `horizontal-axis-line-trend` | A landscape KPI needs a readable line chart with axes, grid, target/reference/threshold bands, phase annotation, or dual-series comparison under the primary value. | value, unit, comparison label/value, ordered trend dataset, x field, y field, axis unit, tooltip payload, optional target/reference/threshold/phase/comparison series fields. | The card is below `420x260`, the line is only decorative, or the chart evidence is the main block rather than supporting one KPI. |
| `horizontal-axis-bar-compare` | A landscape KPI needs a readable horizontal bar body for ranked/time/category comparison, target line, dual-series comparison, threshold warning, or per-category change-rate evidence under the primary value. | value, unit, comparison label/value, ordered bar dataset, category field, value field, axis unit, tooltip payload, optional target/reference/threshold/change-rate/comparison series fields. | The card is below `420x260`, labels or values do not fit, more than 8 bars are needed, or the bar chart is the main block rather than supporting one KPI. |
| `horizontal-axis-scatter-diagnostic` | A landscape KPI needs a readable scatter body for relationship, distribution, outlier, quadrant, threshold, target-crosshair, or correlation diagnosis under the primary value. | value, unit, comparison label/value, object-grain scatter dataset, x field, y field, x/y units, tooltip payload, optional trendline/reference/threshold/quadrant/category/size fields. | The card is below `420x300`, only one numeric metric exists, point density is unmanaged, or exact row audit is the main task. |
| `horizontal-spatial-map-diagnostic` | A landscape KPI needs geography as the evidence: choropleth, graded map, bubble map, point map, column-symbol map, or change-zone map under the primary value. | value, unit, comparison label/value, region code or lon/lat fields, map value field, map resource/projection, legend/visualMap payload, optional target gap/change/category/point fields. | Geography is only a label, the map would be decorative, the card is below `460x320`, or the map resource/projection cannot be proven. |
| `paired-comparison-diagnostic` | A KPI needs two comparable panes such as current vs prior, actual vs target, before vs after, or good/bad status with a central `VS` anchor and bottom conclusion. | left/right metric fields or comparable datasets, baseline labels, unit, comparison/gap field, optional mini charts/rings/dot matrices/breakdown rows, conclusion field. | The two sides are not comparable, baselines differ, the card is below `420x260`, or the user needs a full comparison table/chart. |
| `horizontal-ring-progress` | A landscape KPI needs a bounded status/progress reading such as OEE, utilization, SLA, or completion. | value, min/max or target range, progress rate, prior/baseline value, status direction. | The metric is unbounded or compares many categories. |
| `horizontal-target-progress` | A landscape KPI needs target attainment with a linear progress track and optional target marker. | value, target, attainment rate, target direction, target label/formula. | A circular gauge or detailed variance chart is the main task. |
| `horizontal-status-trend-compare` | A business-negative or quality metric needs before/after comparison and a compact trend. | current value, prior value, improvement/change rate, direction semantics, trend series. | Direction semantics are unknown or lower-is-better is not declared. |
| `horizontal-grain-bar-switch` | A KPI card includes a small time-grain switch and mini bars for recent distribution. | value, comparison, time-grain options, ordered bar series, selected period. | More than one local filter group is required. |
| `horizontal-period-summary-strip` | The card compares current/previous/target values in a bottom strip rather than a chart. | current value, prior value, target value, comparison label, selected period. | A trend or distribution is required to explain the judgment. |
| `horizontal-pp-assist-info` | A percent/ratio metric needs a percentage-point delta plus an auxiliary evidence panel. | value, baseline value, pp delta, evidence label/value, optional mini bars. | The delta is a percent change rather than percentage-point movement. |
| `horizontal-warning-status-band` | A KPI needs a visible warning/status badge plus a bottom alert band. | value, threshold, status, warning reason, selected status/period, action/detail path. | The status is neutral or no threshold/action path exists. |

Single-indicator KPI cards use the existing `kpiCardPattern` as the primary family and add `kpiSingleIndicatorLayoutMode` to choose the internal card layout. Use this when a page shows a peer grid of one-metric cards, each with one value, one comparison, one small evidence visual, and one target/progress footer.

KPI overview cards use the existing `kpiCardPattern` only for the lead metric evidence style and add `kpiOverviewCardPattern` to choose the multi-metric anatomy. Use this when one wide card answers a business-domain overview question, such as sales overview, user growth overview, operations overview, or finance overview.

| `kpiOverviewCardPattern` | Pair with `kpiCardPattern` | Use when |
| --- | --- | --- |
| `lead-metric-comparison-sparkline-overview` | `horizontal-trend-compare` or `horizontal-target-progress` | One lead metric is supported by two comparison cells, one target/progress cell, and one right-side sparkline. |
| `multi-metric-strip-progress-overview` | `plain-metric` or `horizontal-target-progress` | The card shows `3-5` sibling metrics as equal cells, each with value, comparison, target/attainment text, and a small progress track. |
| `domain-metric-cluster-progress-overview` | `horizontal-period-summary-strip`, `horizontal-target-progress`, or `plain-metric` | A domain card combines a lead metric with `2-3` companion metrics and one target/progress summary, often with a unit or metric switch. |

KPI judgment cards use the existing `kpiCardPattern` as the primary metric family and add `kpiJudgmentCardPattern` to choose the judgment anatomy. Use this when the card answers "是否正常 / 是否健康 / 是否达标 / 评分如何 / 风险多高" and the visible design depends on a bounded score, status dictionary, target threshold, or rating distribution.

| `kpiJudgmentCardPattern` | Pair with `kpiCardPattern` | Use when |
| --- | --- | --- |
| `semantic-status-icon-card` | `plain-metric` or `horizontal-warning-status-band` | A categorical state such as normal, processing, warning, failed, pending review, or paid/success is the main answer. |
| `progress-status-ring-card` | `horizontal-ring-progress` | A task, project, payment, or completion state needs a circular progress reading plus status copy. |
| `health-score-ring-card` | `horizontal-ring-progress` or `plain-metric` | A bounded health score needs an overall number, level label, and comparison strip. |
| `health-threshold-bullet-card` | `horizontal-target-progress` | A health, service, quality, or risk score is judged against multiple threshold bands. |
| `health-dimension-breakdown-card` | `plain-metric` | Several health dimensions or resource dimensions explain the overall score. |
| `rating-score-summary-card` | `plain-metric` or `horizontal-ring-progress` | A review/score/risk/project assessment needs a score, level, star/hex/shield motif, and comparison strip. |
| `rating-distribution-card` | `horizontal-ring-progress` or `plain-metric` | A rating metric needs visible distribution such as 5-star share bars or valid-review count. |
| `semicircle-gauge-target-card` | `horizontal-ring-progress` or `target-wave` | A bounded dashboard gauge needs arc, ticks, target marker, and pass/fail/status semantics. |

KPI goal execution cards use the existing `kpiCardPattern` as the primary metric family and add `kpiGoalExecutionCardPattern` to choose the execution anatomy. Use this when the card answers "目标达成了吗 / 还差多少 / 进度到哪了 / 关键节点到哪了 / 是否会延期" and the visible design depends on actual-vs-target, gap, planned-vs-actual progress, milestone status, or deadline/remaining-time fields.

| `kpiGoalExecutionCardPattern` | Pair with `kpiCardPattern` | Use when |
| --- | --- | --- |
| `attainment-ring-summary-card` | `horizontal-ring-progress` or `target-wave` | A target attainment rate is the hero, with actual value, target value, and remaining target visible. |
| `attainment-gauge-deadline-card` | `horizontal-ring-progress` or `target-wave` | Attainment needs a semi-gauge/ring plus due date, ahead/overdue status, or overachievement state. |
| `attainment-linear-target-card` | `horizontal-target-progress` | A linear progress track, target marker, min/max scale, and actual/target text best communicate target distance. |
| `attainment-unit-progress-card` | `horizontal-target-progress` or `plain-metric` | Count-based execution such as orders, users, projects, or people uses dot/pictogram/progress items plus actual/target. |
| `gap-gauge-deficit-card` | `horizontal-ring-progress` or `target-wave` | The main answer is deficit, shortage, overspend, lag, or target miss, with gap value and gap rate emphasized. |
| `gap-target-actual-compare-card` | `paired-comparison-diagnostic` or `horizontal-target-progress` | Target and actual must be compared side by side through bars, budget/actual rows, or a compact VS structure. |
| `progress-plan-actual-card` | `horizontal-target-progress` or `paired-comparison-diagnostic` | Actual progress is judged against planned progress, target progress, or schedule progress. |
| `milestone-timeline-card` | `plain-metric` or `horizontal-target-progress` | Milestones, phases, countdowns, or node status are the main evidence for completion state. |

KPI time-series analysis cards use the existing `kpiCardPattern` as the primary metric family and add `kpiTimeSeriesCardPattern` to choose the temporal evidence anatomy. Use this when the card answers "过去怎么变 / 和哪个周期比 / 当前处在哪个周期 / 波动大不大 / 未来可能怎么走" and the visible design depends on ordered series, comparison baseline, cycle window, volatility statistics, or forecast intervals.

| `kpiTimeSeriesCardPattern` | Pair with `kpiCardPattern` | Use when |
| --- | --- | --- |
| `trend-line-target-card` | `horizontal-axis-line-trend`, `highlight-line-trend`, or `horizontal-trend-compare` | A current KPI needs a readable trend line, target/reference line, status badge, and latest-value context. |
| `change-baseline-delta-card` | `horizontal-axis-line-trend`, `horizontal-axis-bar-compare`, or `horizontal-trend-compare` | A metric must explain how much it changed from a named baseline such as 上月, 上周, or 去年同期. |
| `yoy-mom-comparison-card` | `horizontal-axis-line-trend`, `horizontal-axis-bar-compare`, or `paired-comparison-diagnostic` | 同比 and 环比 are both visible, and their baseline values or baseline series must be inspectable. |
| `cycle-period-progress-card` | `horizontal-ring-progress`, `horizontal-period-summary-strip`, or `horizontal-axis-line-trend` | A metric is judged inside a selected day/week/month/quarter/year cycle with current period index, phase, progress, or period target. |
| `volatility-stat-card` | `horizontal-axis-line-trend` or `horizontal-trend-compare` | Stability or fluctuation is the main judgment, backed by amplitude, max/min, standard deviation, and volatility level. |
| `forecast-interval-card` | `horizontal-axis-line-trend` or `highlight-line-trend` | Forecasted future values, forecast interval, confidence band, horizon, or prediction status are visible. |

KPI comparison analysis cards use the existing `kpiCardPattern` as the primary metric family and add `kpiComparisonAnalysisCardPattern` to choose the comparison evidence anatomy. Use this when the card answers "谁更高 / 哪组更强 / 我与竞品差在哪 / 与标杆差多少 / 差异是否显著" and the visible design depends on comparable subjects, groups, competitors, benchmark percentiles, or variance formulas.

| `kpiComparisonAnalysisCardPattern` | Pair with `kpiCardPattern` | Use when |
| --- | --- | --- |
| `direct-value-compare-card` | `paired-comparison-diagnostic`, `horizontal-axis-line-trend`, or `horizontal-axis-bar-compare` | Two or more comparable values, periods, regions, products, or channels are judged on the same metric definition and unit. |
| `group-segment-compare-card` | `horizontal-axis-bar-compare`, `horizontal-axis-line-trend`, or `horizontal-trend-compare` | Several business groups or segments must be compared across the same metric, often through grouped/stacked bars, multi-line trends, or group summary tiles. |
| `competitor-position-card` | `horizontal-axis-bar-compare`, `horizontal-axis-line-trend`, `paired-comparison-diagnostic`, or `plain-metric` | One primary product/company is compared with named competitors, peer products, or industry average across share, ranking, dimensions, satisfaction, channel, or KPI matrix evidence. |
| `benchmark-position-card` | `horizontal-axis-bar-compare`, `horizontal-ring-progress`, `horizontal-target-progress`, or `plain-metric` | The current object is positioned against industry average, peer rank, P50/P75/P90, standard value, best practice, or a selected benchmark. |
| `variance-gap-card` | `paired-comparison-diagnostic`, `horizontal-axis-bar-compare`, `horizontal-target-progress`, or `plain-metric` | The main answer is the difference value/rate versus baseline, target, peer, region, group, or rank, including positive/negative gap semantics. |

| `kpiSingleIndicatorLayoutMode` | Pair with `kpiCardPattern` | Use when |
| --- | --- | --- |
| `dropdown-sparkline-progress` | `horizontal-trend-compare` | The card has a compact period dropdown, a right-side sparkline, and a bottom target/progress footer. |
| `unit-toggle-ring-progress` | `horizontal-ring-progress` | The card switches display unit or rate basis, and a ring communicates bounded progress/completion. |
| `dropdown-minibar-progress` | `mini-bar-trend` or `horizontal-trend-compare` | The card has a period dropdown, mini bars, and a bottom target/progress footer without needing bar axes. |
| `grain-switch-minibar-progress` | `horizontal-grain-bar-switch` | The card has a `日/周/月` or similar local grain switch plus mini bars. |
| `dropdown-area-sparkline-progress` | `horizontal-trend-compare` | The card has a period dropdown and a small filled/soft sparkline for rate, retention, or revenue movement. |
| `scale-toggle-area-progress` | `horizontal-trend-compare` | The card switches value scale such as `元/万/亿` and keeps the evidence as a small area/sparkline. |
| `dropdown-gauge-progress` | `horizontal-ring-progress` | The card has a period dropdown and a semi-gauge for bounded status, threshold, or attainment. |

Selection order:

1. If the parent container is landscape, wide, or row-based and the line evidence needs visible axes, gridlines, target/reference lines, threshold bands, phase annotations, or dual-series comparison, choose `horizontal-axis-line-trend` only when `W >= 420px` and `H >= 260px`.
2. If the parent container is landscape, wide, or row-based and the evidence is ranked/time/category bar comparison with readable category labels, value labels, target lines, dual-series comparison, threshold warning, or category change-rate evidence, choose `horizontal-axis-bar-compare` only when `W >= 420px`, `H >= 260px`, and visible bars are `3-8`.
3. If the parent container is landscape, wide, or row-based and the evidence is relationship, distribution, outlier, threshold, or quadrant diagnosis with two numeric fields, choose `horizontal-axis-scatter-diagnostic` only when `W >= 420px`, `H >= 300px`, and the point-density strategy is declared.
4. If the parent container is landscape, wide, or row-based and the evidence is spatial distribution, regional target gap, point coverage, or geographic change, choose `horizontal-spatial-map-diagnostic` only when `W >= 460px`, `H >= 320px`, geography is the decision dimension, and the map resource/projection is declared.
5. If the card's main job is a side-by-side baseline judgment, choose `paired-comparison-diagnostic` only when both panes share metric definition, unit, period/grain, and comparable baselines, and when each pane can keep its minimum content box.
6. If the parent container is landscape, wide, or row-based and `W >= 360px`, choose a horizontal pattern when the supporting evidence can fit without becoming a full chart.
7. For horizontal cards, choose by evidence type: compact trend comparison -> `horizontal-trend-compare`; readable axis line -> `horizontal-axis-line-trend`; readable horizontal bars -> `horizontal-axis-bar-compare`; readable scatter diagnosis -> `horizontal-axis-scatter-diagnostic`; spatial evidence -> `horizontal-spatial-map-diagnostic`; paired baseline judgment -> `paired-comparison-diagnostic`; bounded ring or semi-gauge status -> `horizontal-ring-progress`; target bar -> `horizontal-target-progress`; lower-is-better status trend -> `horizontal-status-trend-compare`; local time-grain bars -> `horizontal-grain-bar-switch`; current/prior/target strip -> `horizontal-period-summary-strip`; percentage-point delta -> `horizontal-pp-assist-info`; threshold warning -> `horizontal-warning-status-band`.
8. If the card's main job is status, health, score, rating, risk, or bounded gauge judgment, select `kpiJudgmentCardPattern` before treating it as an ordinary KPI. Choose icon cards for categorical states, ring/gauge cards for bounded progress or score, threshold bullet cards for multi-band health, dimension breakdown for multi-factor health, and rating distribution for satisfaction/review evidence.
9. If the card's main job is target execution management, select `kpiGoalExecutionCardPattern` before treating it as an ordinary KPI, gauge, timeline, or target/actual chart. Choose attainment patterns for "达成率/超额达成", gap patterns for "差距/缺口/落后/超支", progress patterns for "计划进度 vs 实际进度", and milestone patterns for "阶段/节点/倒计时/里程碑".
10. If the card's main job is time-series analysis, select `kpiTimeSeriesCardPattern` before treating the line, bar, area, or forecast mark as an ordinary mini chart. Choose trend for overall movement, change for current-vs-baseline delta, YoY/MoM for dual baselines, cycle for period window/stage, volatility for fluctuation/stability, and forecast for future interval or predicted value.
11. If the card's main job is comparison analysis, select `kpiComparisonAnalysisCardPattern` before treating bars, radar, donut, table, map, or `VS` panes as ordinary chart variety. Choose direct comparison for same-metric values, group comparison for segment/group cohorts, competitor for named market players, benchmark for P50/P75/P90 or industry standards, and variance for signed gap value/rate.
12. If one wide card summarizes a business domain with `2-5` visible metrics, select `kpiOverviewCardPattern` before choosing a single-indicator layout. Use `lead-metric-comparison-sparkline-overview` for one dominant metric plus comparison/target/sparkline, `multi-metric-strip-progress-overview` for equal sibling metric cells, and `domain-metric-cluster-progress-overview` for a lead metric plus companion metrics without a full chart.
13. If the design is a peer grid of single-indicator cards, select `kpiSingleIndicatorLayoutMode` after the primary `kpiCardPattern`. Each card must keep one metric, one comparison, one evidence visual, and one target/progress footer.
14. If target/achievement is the main question and `target` plus `attainmentRate` exist but the card is portrait/narrow, choose `target-wave`.
15. If one card is the lead KPI and trend movement is business-critical, choose `highlight-line-trend`.
16. If recent period evidence matters but the card is not the lead KPI, choose `mini-bar-trend`.
17. Otherwise choose `plain-metric`.

## Shared Anatomy

Every pattern keeps the same decision structure:

```text
metric label -> primary value -> comparison context -> target/status/trend evidence -> exact-value disclosure
```

Required slots:

| Slot | Rule |
| --- | --- |
| Metric label | Short business noun, normally top-left. Do not use generic labels such as "Revenue" unless the domain uses that exact term. |
| Primary value | Strongest visual anchor. It must remain readable before any decorative or evidence layer is tuned. |
| Unit | Close to the value; use display unit scaling for long currency values. |
| Period/scope | Visible or discoverable through tooltip/header context. |
| Comparison | YoY/MoM/baseline/status with signed value and semantic icon/color. |
| Target/status | Use progress, attainment, gap, or threshold wording; do not force target into up/down semantics. |
| Evidence visual | Wave, mini bars, or mini line only when it proves the KPI judgment. |
| Disclosure | Tooltip, focus, drawer, or detail route for formula, exact trend points, target, source, and freshness. |

## Pattern: `plain-metric`

Purpose: lightweight KPI or peer cards in a KPI strip.

Minimum viewport:

- Small: `W >= 220px`, `H >= 120px`.
- Standard: `W >= 260px`, `H >= 140px`.

Permanent content:

- Metric label.
- Primary value + unit.
- One priority comparison, or two compact comparison chips when width permits.
- Target/status only when it does not push the value anchor off center.

Fallback:

- If two comparisons do not fit, keep the comparison most relevant to the current decision and move the other to tooltip.
- If the target text is long, show `达成 87.6%` or `差 124万` and expose full target in tooltip.

## Pattern: `target-wave`

Purpose: target completion, budget consumption, quota attainment, inventory usage, SLA attainment, or another bounded progress/status metric.

Required contract:

```text
value
target
attainmentRate = value / target
targetLabel
targetFormula or definition reference
targetDirection: good-when-higher | good-when-lower | bounded-range
```

Layout:

- Keep the primary value in the upper or central value zone.
- Put target and attainment rate in the lower evidence zone.
- The wave/progress backdrop sits behind the lower evidence zone or bottom third; it cannot reduce text contrast.
- Wave height, progress fill, or area level must be derived from `attainmentRate`, clamped to the declared min/max.

Visual rules:

- Use soft brand tint or semantic progress color. Do not use a random decorative wave.
- The progress shape is evidence, not a hero illustration.
- If `attainmentRate` is over target, show overflow through status text, marker, or capped fill plus tooltip; do not let the wave fill obscure the value.
- If `target` is zero/null/missing, do not render the wave. Use `plain-metric` with an insufficient-target state.

## Pattern: `mini-bar-trend`

Purpose: show recent period volatility under a KPI without turning the card into a full chart.

Required contract:

```text
trendSeries: ordered category/time rows
valueField
categoryField
seriesGrain
latestPoint
tooltipPayload
```

Layout:

- Reserve the bottom `28-40%` of the card for the mini bar band.
- Hide axes and permanent data labels by default.
- Keep bars within the evidence band and away from comparison/target text.
- Use one bar series unless a target/actual mini comparison is explicitly needed and still fits.

Data and interaction:

- `trendSeries.length >= 3` by default.
- For `3-16` points, bars may render directly.
- For `17-30` points, sample labels away and use tooltip for exact values.
- For more than `30` points, use a full chart, drawer, or aggregation instead of a mini bar card.

Fallback:

- If the mini bars crowd the value or comparisons, remove the chart first and keep the KPI evidence in tooltip/detail.
- If exact period comparison is the user's task, use a full bar chart block instead of this card.

## Pattern: `highlight-line-trend`

Purpose: one lead KPI card that needs stronger visual memory while still reading as a business report component.

Required contract:

```text
trendSeries
valueField
timeField
latestPoint
comparison values
target or threshold when the line is judged against a goal
```

Layout:

- Use a stronger card surface token only for one lead card or a small number of primary cards.
- Keep the line in the lower half or lower third. It must not pass through the primary value or comparison text.
- Reserve a clear latest/attainment/status value in a stable lower-right or footer zone when used.
- The line is a sparkline: hide axes by default, keep exact points in tooltip.

Visual rules:

- Use approved dark/brand-emphasis tokens. Do not introduce unrelated neon, glass, glow, or oversized radius.
- Line stroke should be thin enough to remain evidence, not decoration.
- Avoid smooth all-up fake data. Mock data should include realistic bends, flat segments, or dips when the domain allows it.
- Use this pattern sparingly. A page full of lead cards destroys hierarchy and becomes template polish.

Fallback:

- If the dark/emphasis surface harms readability or conflicts with the page baseline, use `mini-bar-trend` or `plain-metric`.
- If the line needs axes, labels, target bands, or anomaly markers, move it to a full line chart block.


## Extended KPI Pattern References

| Need | Read |
| --- | --- |
| Landscape KPI, KPI overview, KPI judgment/status, KPI goal execution | `04a1-kpi-landscape-overview-judgment-goal-patterns.md` |
| KPI comparison, single-indicator grid, horizontal and diagnostic KPI cards | `04a2-kpi-comparison-single-horizontal-patterns.md` |
| KPI implementation data contract, field binding, formulas, and proof gates | `04a3-kpi-card-data-contract.md` |
## Anti-AI Gate For KPI Cards

A KPI card fails the anti-AI gate when any of these are true:

- It has a polished gradient, wave, line, or bar background but no target, baseline, trend series, or formula.
- It shows axes, gridlines, target labels, threshold bands, or phase marks without matching trend fields, reference fields, threshold definitions, or annotation data.
- It shows horizontal bars, target lines, comparison bars, change-rate sidebars, or warning thresholds without matching bar category/value fields, target/threshold definitions, change-rate fields, or sort rules.
- It shows scatter points, trendlines, quadrant bands, or threshold crosshairs without two numeric fields, object grain, point-density strategy, and data-driven reference/threshold fields.
- It shows a map without region codes or lon/lat fields, map resource/projection, legend/visualMap, missing-geo handling, and a genuine spatial decision.
- It shows a `VS` comparison card without comparable metric definitions, units, periods, pane fields, and a declared conclusion/delta.
- It shows a single-indicator KPI grid card with multiple mini visuals in one card, a local control that does not map to period/unit/grain/scale data, or a target/progress footer without target and attainment fields.
- It shows a KPI overview card with several polished numbers but no `kpiOverviewCardPattern`, no ordered metric list, no lead metric, no local-control scope, no target/attainment binding for visible progress, or more than one compact evidence visual.
- It shows a status, health, score, rating, or gauge card without `kpiJudgmentCardPattern`, status dictionary or score range, threshold/band definitions, business direction, comparison strip binding, and footer evidence/source path.
- It shows a target attainment, gap, progress, or milestone card without `kpiGoalExecutionCardPattern`, actual/target/gap/progress/milestone fields, direction semantics, formula, deadline or remaining-time fields when visible, and footer evidence/source path.
- It shows a trend, change, YoY/MoM, cycle, volatility, or forecast card without `kpiTimeSeriesCardPattern`, ordered time series, baseline/cycle/volatility/forecast fields required by the selected pattern, direction semantics, tooltip payload, footer evidence, and source/freshness path.
- It shows a direct comparison, group comparison, competitor comparison, benchmark position, or variance/gap card without `kpiComparisonAnalysisCardPattern`, comparable subject roles, shared metric definition/unit/grain, selected comparison/benchmark/variance fields, direction semantics, sort rule, tooltip payload, footer evidence, and source/freshness path.
- The visible text could belong to any industry or product, such as generic "增长", "效率", "智能洞察", or "核心指标" without a business object.
- The chart-like mark is random decoration rather than data-driven evidence.
- Every KPI is all-good, smooth, and perfectly balanced in mock data without source evidence.
- All cards have equal visual weight even though one metric should lead the decision.
- The value is small, off-center, or visually weaker than the decorative chart.
- The card hides formula, period, source/freshness, or target definition when those details affect trust.

Countermeasure:

```text
one metric -> one judgment -> one comparison or target -> one evidence mark -> one disclosure path
```

## Implementation Notes

- Use project or template tokens for color, radius, shadow, typography, and status semantics.
- Use ECharts or the approved project wrapper for mini bars and mini lines when runtime tooltip, resize, or theme behavior matters.
- A compact data-driven SVG sparkline is acceptable only when it is documented as a sparkline glyph, not a standard chart, and exact values remain available through tooltip/detail.
- Do not copy sample images as assets. Rebuild the card from data, tokens, and slots.
- Provide stable selectors or project equivalents for `kpi-card`, `kpi-value-anchor`, `kpi-value`, `kpi-unit`, `kpi-comparison`, `kpi-target`, and `kpi-evidence`.

## Acceptance Checklist

Before marking the card ready:

- The business question for the card is named.
- `visualType` is `metric-card` and `kpiCardPattern` is one of the controlled values.
- Primary value + unit is the strongest readable element and passes the value-anchor checks in `04-kpi-metric-cards.md`.
- Numeric display contract exists for the main value and visible comparison values.
- Target/progress cards declare target formula, denominator behavior, and missing-target fallback.
- Mini trend cards declare series grain, ordered category field, value field, latest point, and tooltip payload.
- Landscape KPI cards declare `kpiCardOrientation`, chosen horizontal pattern, primary value zone, auxiliary evidence zone, local control scope, and fallback when `W < 360px` or `H < 128px`.
- KPI overview cards declare `kpiOverviewCardPattern`, one overview topic, `2-5` ordered metrics, `overviewLeadMetricId` when the pattern has a lead metric, local control type/scope, target and attainment fields for every visible progress track, outer size `>=720x220`, each metric cell `>=128px` wide, progress track `>=120px`, one compact evidence visual maximum, exact-value route, and fallback when metrics or controls do not fit.
- KPI judgment cards declare `kpiJudgmentCardPattern`, `judgmentKind`, status or score field, score range or status dictionary, threshold/band fields when visible, `judgmentDirection`, exactly one hero visual, comparison strip fields, footer evidence/source path, outer size `>=360x240`, hero fit box that matches the selected visual, and fallback when icon/ring/gauge/bars cannot fit.
- KPI goal execution cards declare `kpiGoalExecutionCardPattern`, `goalExecutionKind`, actual/target fields, attainment/gap/progress/milestone fields required by the selected pattern, `goalDirection`, formula/denominator behavior, deadline/remaining-time fields when visible, exactly one execution hero visual, comparison strip fields, footer evidence/source path, outer size `>=360x240`, hero fit box that matches the selected visual, and fallback before target/gap/progress/milestone evidence is squeezed.
- KPI time-series analysis cards declare `kpiTimeSeriesCardPattern`, `temporalAnalysisKind`, ordered time series, x/y fields, grain, latest period, direction semantics, tooltip payload, and required baseline/cycle/volatility/forecast fields for the selected pattern; they fail when outer size `<360x240`, time-series evidence zone `<112px`, footer evidence is missing, or forecast/volatility/baseline semantics are decorative.
- KPI comparison analysis cards declare `kpiComparisonAnalysisCardPattern`, `comparisonAnalysisKind`, comparable subject grain, subject role fields, shared metric definition/unit/grain, selected comparison/competitor/benchmark/variance fields, direction semantics, sort rule, tooltip payload, footer evidence/source path, and exact-value route; they fail when outer size `<360x240`, comparison evidence zone `<112px`, circular evidence fit boxes fail, footer evidence is missing, or competitor/benchmark/gap semantics are decorative.
- Single-indicator KPI grid cards declare `kpiSingleIndicatorLayoutMode`, exactly one evidence visual, local control type/scope, target and attainment fields when the footer exists, card outer size `>=360x220`, evidence fit box `>=112x72`, ring/gauge fit box `>=116x96`, footer band `44-60px`, and peer-grid baseline alignment.
- Axis-line diagnostic KPI cards declare `kpiAxisLineEvidenceMode`, ECharts renderer ownership, ordered x field, y field/unit, chart body height, tooltip payload, and any target/reference/threshold/phase/comparison-series fields; they fail when `W < 420px`, `H < 260px`, chart body `<180px`, or plot height `<130px`.
- Axis-bar diagnostic KPI cards declare `kpiAxisBarEvidenceMode`, ECharts renderer ownership, category field, value field/unit, sort rule, visible bar limit, chart body height, tooltip payload, and any target/reference/threshold/change-rate/comparison-series fields; they fail when `W < 420px`, `H < 260px`, chart body `<180px`, plot height `<140px`, row height `<22px`, or visible bars exceed `8`.
- Axis-scatter diagnostic KPI cards declare `kpiScatterEvidenceMode`, ECharts renderer ownership, object grain, x/y fields, units, point-count strategy, chart body height, tooltip payload, and any trendline/reference/threshold/quadrant/category/size fields; they fail when `W < 420px`, `H < 300px`, chart body `<200px`, plot height `<160px`, or point density is unmanaged.
- Spatial-map diagnostic KPI cards declare `kpiMapEvidenceMode`, map renderer ownership, region code or lon/lat fields, map resource/projection, map body height, visualMap/legend payload, missing-geo handling, and any target-gap/change/category/point fields; they fail when `W < 460px`, `H < 320px`, map body `<220px`, or map viewport shorter side `<180px`.
- Paired comparison diagnostic KPI cards declare `kpiComparisonEvidenceMode`, left/right pane fields, baseline labels, matched unit/period/grain, central `VS` rail, bottom conclusion field, and optional mini evidence fields; they fail when `W < 420px`, `H < 260px`, pane width `<140px`, or the two panes are not definition-compatible.
- Decorative-looking layers are data-driven or removed.
- Long value, zero/null, denominator-zero, filtered-empty, no-permission, stale-data, loading, and error states are defined.
- Click, hover, or focus reveals formula/source/freshness and exact hidden trend values.
