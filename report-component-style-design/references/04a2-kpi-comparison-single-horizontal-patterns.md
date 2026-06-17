# 04a2 KPI Comparison Single Indicator And Horizontal Patterns

Load this file for KPI comparison analysis, single-indicator KPI grid modes, and horizontal/diagnostic KPI card patterns.

### KPI Comparison Analysis Card Patterns

Use this mode set when one card answers a comparison analysis question rather than a generic KPI or chart question. The card must prove one of five comparison jobs:

```text
direct value comparison -> group/segment comparison -> competitor position -> benchmark position -> variance/gap diagnosis
```

These cards feel designed and not AI-generated because every visual element is anchored to a declared comparison contract. The donut, grouped bars, multi-line trend, radar, NPS scale, benchmark ruler, variance gauge, comparison table, or map is not decorative variety; it encodes comparable subjects, group membership, competitor role, benchmark source, percentile/rank, or signed gap formula.

Pattern modes:

| `kpiComparisonAnalysisCardPattern` | Main evidence visual | Required data |
| --- | --- | --- |
| `direct-value-compare-card` | side-by-side values, dual line/bar series, map/table compare, or small comparison matrix | primary subject, comparison subject, shared metric definition, unit, grain, value fields, baseline label, delta value/rate |
| `group-segment-compare-card` | grouped bars, stacked bars, multi-line group trend, ranked segment bars, or segment summary tiles | group/segment field, comparable metric fields, shared period/filter scope, group sort rule, group count, per-group value and delta |
| `competitor-position-card` | market share donut, competitor ranking bars, multi-series trend, radar profile, NPS/score scale, channel table, or KPI matrix | primary product/company role, competitor roles, industry average or market total when used, metric list, competitor values, rank/share/delta fields |
| `benchmark-position-card` | benchmark ruler, peer ranking bars, P50/P75/P90 markers, standard-value bars, gauge-to-benchmark, or benchmark trend | benchmark source, benchmark value(s), percentile/rank fields, current value, gap to benchmark, benchmark label and validity period |
| `variance-gap-card` | signed gap summary, actual-vs-comparison bar, variance table, gap gauge, ranked variance rows, or difference trend | actual/current field, comparison/target/baseline field, gap value, gap rate, direction semantics, signed color rule, reconciliation total when tabular |

Minimum and slot budget:

- Minimum outer size: `360x240`; standard size: `400-560px` wide and `280-380px` high.
- Header row: `32-44px`, including optional index, title/help, local comparison scope control, period switch, or overflow menu. Collapse the control before shrinking comparison evidence.
- Value/comparison summary zone: `56-92px`, with primary value, comparison label, role labels, rank/share/gap or delta chip. If subject labels wrap, shorten labels and expose full names in tooltip/detail.
- Comparison evidence zone: `112-180px`. Axis-visible bars/lines need chart body `>=140px` and plot height `>=92px`; radar needs a `150x150px` circular fit box; donut/share evidence needs a `128x128px` circular fit box; benchmark ruler needs `220x40px`; NPS/score scale needs `220x32px`; comparison table preview needs at least `3` rows and `3-6` columns.
- Footer evidence band: `44-72px`, usually `2-4` cells for rank, benchmark, gap, market total, competitor count, sample count, or exact-value route.
- Legend/role row: `18-28px` when multiple subjects, groups, competitors, or benchmark roles are visible. Hide legend only when role labels remain directly visible.

Rules:

- One card answers one comparison question. Do not combine competitor ranking, group trend, benchmark P90, and target gap in the same small card unless one is primary and the rest move to tooltip/detail.
- Every comparison card declares comparable subject grain, metric definition, unit, period/grain, filter scope, comparison role labels, and exact-value tooltip/detail payload.
- Direct comparison requires the compared sides to share metric definition, unit, denominator, and period. If definitions differ, use a metric matrix or explanation card rather than a visual `VS`.
- Group comparison requires a deterministic group sort: chronological, descending value, ascending risk, business order, or selected-priority order. Mock array order is not a valid sort.
- Competitor comparison must distinguish `primary`, `competitor`, `peer`, `industry-average`, and `market-total` roles. The primary product/company may be highlighted, but competitor geometry must remain comparable.
- Benchmark cards must name the benchmark source, such as industry average, P50, P75, P90, peer Top N, standard value, best practice, or selected baseline. A benchmark marker without source and period is decorative.
- Variance cards must declare `gapValue` and `gapRate` formulas plus direction semantics. Red/green follows business meaning, not raw sign; cost overrun and defect reduction invert ordinary positive/negative coloring.
- Radar and multi-dimensional competitor cards require a shared normalized scale. Raw mixed units cannot be plotted directly as comparable dimensions.
- Tables used inside these cards are evidence previews, not full audit tables. If exact comparison across many rows/metrics is the main task, split to a full table or matrix block.
- Use realistic comparison data: uneven gaps, one weak group, one competitor lead, one benchmark miss, or one negative variance when the domain allows it. Perfectly balanced groups and all-green comparisons look synthetic.

Fallback:

1. Collapse comparison scope, period, or metric segmented controls to a dropdown or inherit page filters.
2. Hide optional index, help icon, domain icon, or decorative rank badge.
3. Reduce visible subjects/groups to Top `4-5` plus `其他`, or show primary + Top competitors.
4. Move secondary metric dimensions, long competitor names, or benchmark definitions to tooltip/detail.
5. Convert radar/donut/gauge-like evidence to bars or table rows when circular geometry cannot pass its fit box.
6. Reduce footer evidence to the two most decision-relevant facts.
7. Split to a full comparison chart, benchmark table, metric matrix, detail table, or drawer before accepting a squeezed comparison card.

### Pattern: `lead-metric-comparison-sparkline-overview`

Use for sales, user growth, order, production, or finance overview cards where one lead metric anchors the decision and the remaining content explains how it compares, whether it reaches target, and how it moves.

Rules:

- Lead metric sits after the domain icon or at the first metric position. It owns the largest number.
- Comparison cells (`同比`, `环比`, `较上期`, `较目标`) share label and value baselines.
- Target completion cell includes target value and attainment/progress. Do not show a progress bar without target and denominator.
- The right sparkline is secondary. It shows direction and latest point; exact period points live in tooltip/detail.

### Pattern: `multi-metric-strip-progress-overview`

Use when the card needs equal sibling metrics, such as visits, conversion, average order value, and order count in one operations overview.

Rules:

- Use `3-5` equal columns. Each column has metric label/help, value+unit, comparison, target/attainment text, and optional progress.
- Values align by baseline across columns; progress tracks align by footer baseline.
- Keep column titles short. If a title needs more than two lines, abbreviate and disclose the full definition.
- If one metric needs a chart while siblings do not, either make it the lead overview pattern or split to a chart card.

### Pattern: `domain-metric-cluster-progress-overview`

Use when the domain card has one lead metric and several companion metrics, such as finance overview with revenue, gross margin, net profit, and target completion.

Rules:

- Lead metric and icon tile form the left anchor. Companion metrics read left-to-right by business priority.
- Use one unit/scale switch when financial or count values share a scale; do not create per-metric controls.
- Companion metrics may omit progress tracks when the target summary already owns the progress evidence.
- Keep one target/progress summary visible when the card is used for management review; otherwise provide a detail route.

### Single-Indicator KPI Grid Layout Modes

Use this mode set for pages like a KPI overview grid where every card carries exactly one metric. The card can vary its evidence visual, but the reading grammar stays fixed:

```text
index -> metric title/help -> local period/unit control -> primary value -> semantic comparison -> one evidence visual -> target + attainment footer
```

These cards feel strong because the style is not decorative variety. The small chart changes by metric semantics: sparkline for trend, mini bars for period distribution, ring for bounded completion, area sparkline for rate movement, and semi-gauge for threshold/status. The bottom target/progress footer anchors the card in a measurable goal, so the reader does not stop at a pretty number.

Layout modes:

| `kpiSingleIndicatorLayoutMode` | Evidence visual | Local control | Required data |
| --- | --- | --- | --- |
| `dropdown-sparkline-progress` | right-side sparkline with latest point | compact period dropdown | value, comparison, trend series, target, attainment rate |
| `unit-toggle-ring-progress` | right-side ring/donut progress | 2-option unit/rate toggle | bounded value or rate, min/max or target, attainment rate |
| `dropdown-minibar-progress` | right-side or lower-right mini bars | compact period dropdown | ordered bar series, selected/latest period, target, attainment rate |
| `grain-switch-minibar-progress` | right-side mini bars | `2-4` option grain segmented control | grain options, ordered series per grain, selected grain |
| `dropdown-area-sparkline-progress` | soft filled sparkline/area | compact period dropdown | ordered trend series, comparison, target, attainment rate |
| `scale-toggle-area-progress` | soft filled sparkline/area | value scale segmented control such as `元/万/亿` | value, scale options, trend series in raw unit, formatter contract |
| `dropdown-gauge-progress` | right-side semi-gauge | compact period dropdown | min/max, value, target/threshold, attainment or status rate |

Minimum and slot budget:

- Minimum outer size: `360x220`; standard grid size: `400-460px` wide and `260-320px` high.
- Header row: `32-44px`, including optional light index number `20-28px`, title/help, and one local control.
- Value band: `64-92px`; primary numeral should be the strongest glyph and normally occupies `22-30%` of card height.
- Comparison row: `20-28px`, directly below the value, with signed color semantics based on metric direction.
- Evidence visual fit box: at least `112x72px`; ring or semi-gauge needs `116x96px`; mini bars/sparkline need `120x56px`.
- Footer target/progress band: `44-60px`, with target text left, attainment text right, and progress track `>=200px` when rendered.

Rules:

- One card, one metric, one evidence visual. Do not combine sparkline + bars + ring in the same single-indicator card.
- Use a light index number only for sample grids, design review, or ordered pattern libraries. Production dashboards should use it only when the order itself matters.
- Top-right controls are local to this card or declared peer KPI group. Unit/scale switches change formatting; period/grain switches change the evidence dataset and comparison baseline.
- The footer target/progress band is not optional when the card claims completion or target achievement. If there is no target, remove the footer and select a simpler trend/metric card.
- Mini evidence uses real data and keeps exact points in tooltip/detail. Smooth fake lines, equal-height decorative bars, and arbitrary gauge arcs fail the anti-AI gate.
- Cards in the same grid share outer height, padding, title baseline, value baseline, comparison baseline, and footer height. Evidence visuals may differ, but their fit boxes align.

Fallback:

1. Collapse segmented controls to compact dropdown.
2. Hide the light index number and definition icon.
3. Move secondary comparison wording to tooltip.
4. Hide the mini evidence visual and keep target/progress.
5. Remove footer progress track but keep target/attainment text.
6. Split to a full chart/table/detail block if the evidence visual is the decision task.

### Pattern: `horizontal-trend-compare`

Use for KPI cards like production volume, energy, orders, visits, or other current values that need a compact trend and a named baseline such as `同比`, `环比`, or `较去年同期`.

Rules:

- Primary value stays left. Trend evidence sits in the lower or right band.
- Trend line hides axes and permanent point labels; exact points live in tooltip.
- A faint domain icon may sit in the right background only when it supports the metric meaning and does not reduce contrast.
- If the trend needs target bands, annotations, or axis reading, use a full line chart block instead.

### Pattern: `horizontal-axis-line-trend`

Use for KPI cards like production volume, OEE, order completion, defect rate, energy, production cost, on-time delivery, or inventory turnover when the value needs a compact but readable line chart below it.

This pattern covers these controlled evidence modes:

| `kpiAxisLineEvidenceMode` | Use when | Required evidence |
| --- | --- | --- |
| `basic-compare-line` | One KPI needs current value plus YoY/MoM/baseline trend. | ordered time rows, value field, comparison label/value, unit. |
| `filled-baseline-line` | The line should emphasize magnitude or period area without becoming a full area chart. | ordered time rows, value field, fill semantics, baseline meaning. |
| `target-reference-line` | A target, SLA, budget, or goal line is part of the judgment. | target value, target label, target formula, value series. |
| `phase-annotated-line` | A business phase or improvement period explains a visible change. | phase start/end, phase label, affected points, before/after semantics. |
| `unit-axis-line` | Unit reading matters and the chart has no fill or extra comparison. | y-axis unit, ordered time rows, value series. |
| `grain-switch-line` | A compact `日/周/月`, `月/季/年`, or similar switch changes the time grain. | local control options, selected grain, grain-specific dataset. |
| `dual-comparison-line` | Current and prior/baseline series must be compared on the same axis. | two comparable series, shared time grain, legend labels, tooltip payload. |
| `threshold-band-line` | The KPI is judged against good/normal/warning ranges. | threshold bands, band labels, status direction, action/detail path when warning. |

Rules:

- The KPI headline remains the first-read object. The chart proves or qualifies it; it does not replace it.
- Use ECharts for the line body when axes, gridlines, target/reference lines, threshold bands, axisPointer, tooltip, or local grain switching are visible.
- Put title and the one local control in the top row. Put the primary value and comparison immediately below. Put the axis line chart in the bottom body.
- Keep one visible local control group only. If both comparison mode and time grain are needed, show the higher-priority group and collapse the other into tooltip/detail or a dropdown.
- Y-axis labels, x-axis labels, unit, legend, target label, and threshold labels must reserve chart-body space. They cannot overlay the value zone.
- Use point symbols only when `N <= 12`. For denser lines, keep hover/emphasis points and tooltip.
- Filled area is allowed only when the fill means magnitude, baseline, improvement zone, or status band. Do not add a soft fill because it looks polished.
- Target/reference labels should sit near the line with reserved right or top gap. If the label collides, keep the line and move label text into tooltip.
- Threshold bands are weak background evidence. They must not reduce line contrast or make the card read as an alert unless the KPI state is actually abnormal.
- Mock data must include plausible bends, plateaus, dips, or phase changes when the domain is operational. A perfectly smooth upward line fails the anti-AI gate unless it comes from real data.

Minimum and fallback:

- Minimum outer size: `420x260`; standard size: `460-560px` wide and `280-340px` high.
- Chart body after title/value/comparison/control bands must be `>=180px`; inner plot height must be `>=130px`.
- If the card cannot satisfy the chart body floor, downgrade to `horizontal-trend-compare` by hiding axes/grid/target labels, or split the chart into a full `comparison-line-trend-card`.
- If exact audit, dense annotations, many series, dataZoom, or table comparison is the task, use a full chart/table block instead of this KPI card.

### Pattern: `horizontal-axis-bar-compare`

Use for KPI cards like production volume, OEE, order completion, defect rate, energy, production cost, on-time delivery, inventory turnover, or category quality comparison when the value needs a compact but readable horizontal bar chart below it.

This pattern covers these controlled evidence modes:

| `kpiAxisBarEvidenceMode` | Use when | Required evidence |
| --- | --- | --- |
| `basic-horizontal-bar` | One KPI needs recent period or ranked category comparison plus a named baseline. | ordered category rows, value field, comparison label/value, unit. |
| `period-comparison-bar` | Period-to-period comparison such as 本期/上期/上上期 is the main evidence. | ordered period rows, value field, period labels, baseline semantics. |
| `target-reference-bar` | A target, SLA, budget, or goal line is part of the judgment. | target value, target label, target formula, value rows. |
| `category-change-sidebar-bar` | Each category needs a value plus change-rate, such as product line defect rate changes. | category rows, value field, change-rate field, direction semantics. |
| `time-series-horizontal-bar` | Recent dates/months should be compared as horizontal bars rather than a line. | ordered time rows, value field, time grain, unit. |
| `grain-switch-horizontal-bar` | A compact `日/周/月`, `月/季/年`, or similar switch changes the bar grain. | local control options, selected grain, grain-specific dataset. |
| `dual-series-horizontal-bar` | Current and prior/baseline bars must be compared on the same row. | two comparable value fields or series rows, shared category/time grain, legend labels. |
| `threshold-warning-bar` | The KPI is judged against good/normal/warning ranges or an inventory/quality threshold. | threshold value or bands, warning label, status direction, action/detail path when warning. |

Rules:

- The KPI headline remains the first-read object. The horizontal bar body explains rank, period comparison, target gap, category variation, or warning state.
- Use ECharts for the horizontal bar body when axes, gridlines, target/reference lines, threshold bands, legend, tooltip, or local grain switching are visible.
- Put title and the one local control in the top row. Put the primary value and comparison immediately below. Put the horizontal bar body in the bottom body.
- Keep category labels on the left and exact value or change-rate labels on the right. Do not center labels inside bars unless labels still pass contrast and fit checks.
- Visible bars default to `3-6`, maximum `8` inside a KPI card. More bars require Top N, scrolling/detail, or a full bar chart block.
- Sort order must be explicit: chronological for time, descending/ascending value for ranking, or declared business order for categories. Do not let mock array order decide silently.
- Bar color follows the semantic role: primary blue/green for the main series, muted gray for comparison, orange/red only for warning or negative status. Do not assign random colors per row.
- Target/reference lines and threshold bands are data-driven and share the x-axis scale with the bars. They cannot float as decorative vertical lines.
- Dual-series bars must keep the primary series visually stronger. The comparison series is muted, outline, lighter, or slightly thinner.
- Change-rate sidebars must follow business direction, not raw sign. Lower defect rate or lower inventory days can be good.
- Mock data should include realistic uneven gaps, one or two weak categories, and at least one non-perfect target/comparison case when the domain allows it.

Minimum and fallback:

- Minimum outer size: `420x260`; standard size: `460-560px` wide and `280-340px` high.
- Chart body after title/value/comparison/control bands must be `>=180px`; inner plot height must be `>=140px`; row height must be `>=22px`.
- If the card cannot satisfy the chart body floor, downgrade to `horizontal-grain-bar-switch` only when axes/labels can be hidden, or split the chart into a full `single-series-bar-card`, `filtered-bar-card`, or target/actual bar card.
- If exact audit, many categories, sorting/filtering, dataZoom, or table comparison is the task, use a full chart/table block instead of this KPI card.

### Pattern: `horizontal-axis-scatter-diagnostic`

Use for KPI cards like energy vs output, OEE vs runtime, order completion vs delivery cycle, defect rate distribution, cost vs production, age vs failure count, or supplier delivery quality when the value needs a compact relationship/distribution diagnosis below it.

This pattern covers these controlled evidence modes:

| `kpiScatterEvidenceMode` | Use when | Required evidence |
| --- | --- | --- |
| `correlation-trendline-scatter` | A relationship or correlation supports the KPI judgment. | x/y metrics, object grain, trendline or fit result, optional correlation field. |
| `mean-reference-scatter` | The cloud should be judged against average or reference lines. | x/y metrics, x/y average or reference values, comparison semantics. |
| `target-crosshair-scatter` | Two target thresholds define desired placement. | x/y target values, target labels, gap fields, target direction. |
| `distribution-change-band-scatter` | Distribution is judged by change-rate bands or side legend. | point values, change-rate field, band thresholds, direction semantics. |
| `threshold-quadrant-scatter` | Operating zones such as normal/warning/alarm are the main reading. | x/y threshold fields, quadrant or band labels, action/detail path for bad zones. |
| `dual-series-trendline-scatter` | Current and prior/baseline points need comparison. | current and baseline point series or comparable fields, legend labels, shared axis scale. |
| `change-callout-scatter` | A selected point or cluster needs a small change callout. | selected object/cluster id, change field, callout text/value, tooltip payload. |
| `category-quadrant-scatter` | Points need category color plus quadrant or strategy labels. | category field, category legend, x/y thresholds or quadrant labels. |

Rules:

- The scatter is the evidence for relationship, spread, outlier, target fit, or quadrant decision. Do not use it for a single metric or simple category comparison.
- Use ECharts `scatter` or `effectScatter` only for highlighted points; axes, grid, reference lines, trendlines, quadrants, legends, tooltips, and resize behavior remain renderer-owned.
- Keep the KPI headline first. The scatter body proves why the current value is good, bad, improving, or uncertain.
- Point labels are key-only: selected, outlier, Top, or abnormal labels. Ordinary labels stay in tooltip.
- Reference lines, trendlines, target crosshairs, threshold bands, and quadrant backgrounds are data-driven and named. They cannot float as decorative diagonals or translucent zones.
- If color encodes category, keep visible categories `<=5`; otherwise use Top categories, filter, or tooltip-only category.
- Mock point clouds should include realistic spread, clusters, outliers, or mixed zones when the business allows it. A perfectly regular cloud fails the anti-AI gate.

Minimum and fallback:

- Minimum outer size: `420x300`; standard size: `460-560px` wide and `320-360px` high.
- Chart body after title/value/comparison/control bands must be `>=200px`; inner plot height must be `>=160px`.
- Recommended point count is `12-80`; `81-200` needs lower opacity and no permanent labels; `>200` needs aggregation, sampling, zoom/brush, density, or a full chart/detail path.
- If the card cannot satisfy the plot floor, downgrade to `horizontal-trend-compare`, a small anomaly note, or a full scatter chart block. Do not shrink the scatter into a decorative dot field.

### Pattern: `horizontal-spatial-map-diagnostic`

Use for KPI cards like national output distribution, online rate by region, order completion by province, defect-rate distribution, energy intensity by location, cost interval map, on-time delivery by supplier location, or regional change diagnosis when geography itself answers the question.

This pattern covers these controlled evidence modes:

| `kpiMapEvidenceMode` | Use when | Required evidence |
| --- | --- | --- |
| `choropleth-heat-map` | Administrative regions show metric intensity. | region code/name, value field, color bins, map resource. |
| `graded-choropleth-map` | Business thresholds classify regions. | region field, value field, threshold bins, status direction. |
| `bubble-target-gap-map` | Regional points or provinces need magnitude plus target gap. | lon/lat or region centroid, value/size field, target/gap field. |
| `distribution-change-marker-map` | Location markers need change-rate status. | point/region location, value, change-rate, status legend. |
| `column-symbol-map` | Regions need small vertical columns on a basemap. | region/coordinate, value field, unit, column scale. |
| `annotated-interval-map` | Selected locations carry interval labels or numeric annotations. | selected locations, value labels, interval bins. |
| `yoy-change-zone-map` | Increase/decrease zones are the primary reading. | region field, YoY/MoM change field, divergent bins. |
| `point-category-summary-map` | Many locations need category status plus side summary. | lon/lat, category/status, value, category counts. |

Rules:

- Use a map only when spatial position, adjacency, coverage, or regional clustering changes the decision. Region names alone do not justify a map.
- The basemap is muted evidence scaffolding; the data layer, legend, and selected labels carry the meaning.
- Administrative maps require `regionCode` whenever possible. Point maps require longitude/latitude. Missing geography is reported in tooltip/detail/QA evidence.
- Preserve map projection and aspect ratio with a measured fit box. Letterboxing is acceptable; stretching geography is not.
- Visible labels are key-only: Top, selected, abnormal, or hovered regions/points. The legend/visualMap must not cover important geography.
- If the map needs exact ranking or audit, pair it with a side ranking/table or route to detail, instead of printing all values on the map.

Minimum and fallback:

- Minimum outer size: `460x320`; standard size: `500-640px` wide and `340-380px` high.
- Map body after title/value/comparison/control bands must be `>=220px`; map viewport shorter side must be `>=180px`.
- Reserve `72-140px` for legend, visualMap, or side summary when it is outside the map; otherwise use compact in-map legend with safe overlap checks.
- If the card cannot preserve geography and legend, switch to a bar/ranking/table card or a full map block. Do not render a tiny decorative map.

### Pattern: `paired-comparison-diagnostic`

Use for KPI cards like this period vs prior period, actual vs target, before vs after, improvement vs previous, percentage vs benchmark, inventory days current vs last month, or cost structure current vs baseline when the main judgment is the difference between two comparable states.

This pattern covers these controlled evidence modes:

| `kpiComparisonEvidenceMode` | Use when | Required evidence |
| --- | --- | --- |
| `metric-yoy-vs` | Current value is compared with prior-year or prior-period value. | current value, baseline value, comparison label, delta. |
| `progress-mom-vs` | Two progress strips or bounded statuses compare current and previous. | current/baseline rates, min/max or target, delta direction. |
| `target-gap-progress-vs` | Actual and target panes compare target distance. | actual value, target value, gap, attainment rate. |
| `improvement-dot-matrix-vs` | Status counts or quality improvement is shown through dot matrices. | current/baseline counts or rate buckets, improvement field. |
| `trend-yoy-vs` | Two mini trends compare the shape of current and baseline movement. | current and baseline trend series, shared grain, comparable scale. |
| `structure-breakdown-vs` | Two structures compare cost/category composition. | current and baseline category rows, shared categories, delta. |
| `percentage-ring-vs` | Two bounded percentages compare completion/fulfillment. | current and baseline rates, denominator/target, delta. |
| `trend-mom-vs` | Month-over-month trend change is judged by two mini line panes. | current and prior period trend series, shared grain, delta. |

Rules:

- The two panes must compare the same metric definition, unit, grain, and filter scope. If definitions differ, use a table or explanation card instead.
- Central `VS` rail is structural, not decorative: it keeps left/right panes comparable and separates baselines.
- Left and right panes share typography scale, value baseline, mini-chart scale when comparable, and equal padding. The winning/primary side may use stronger color, but geometry stays mirrored.
- Bottom conclusion strip names the result, such as `本月能耗降低 818 kWh` or `未达目标，差距 2.7 个百分点`.
- Mini bars, rings, dot matrices, or small trends are evidence for the pane, not second full charts.

Minimum and fallback:

- Minimum outer size: `420x260`; standard size: `460-560px` wide and `280-340px` high.
- Each pane must be `>=140px` wide after padding, the `VS` rail must be `32-44px`, and bottom conclusion band must be `36-52px`.
- If pane evidence cannot fit, keep values plus delta and move mini evidence to tooltip/detail.
- If multiple categories, many baselines, or exact audit are needed, use a full comparison chart/table instead of this KPI card.

### Pattern: `horizontal-ring-progress`

Use for bounded progress/status metrics such as OEE, utilization, SLA, yield, completion, or availability.

Rules:

- Ring sits right of the value or centered in the right half.
- Center text equals the same display value or a declared progress rate; it cannot contradict the primary value.
- Footer may show prior period or baseline as weak evidence.
- If the ring would shrink below `96px` diameter, switch to `horizontal-target-progress` or `plain-metric`.

### Pattern: `horizontal-target-progress`

Use for target attainment where a linear progress track communicates distance to target better than a circle.

Rules:

- Show target label and value near the primary value or track, such as `目标 95.0%`.
- Progress track has min/max or start/end labels only when they fit.
- Target marker/tick is data-driven and must not float as decoration.
- If target is missing, degrade to `horizontal-trend-compare` or `plain-metric`.

### Pattern: `horizontal-status-trend-compare`

Use for lower-is-better quality, risk, defect, complaint, overdue, or cost metrics where improvement is the business point.

Rules:

- Status color follows business meaning, not raw sign. A lower value may be good.
- Show prior/current labels or an equivalent before/after comparison.
- The trend line should move in the same semantic direction as the stated improvement or explain exceptions in tooltip.
- If direction semantics are not declared, mark the mapping incomplete instead of guessing color.

### Pattern: `horizontal-grain-bar-switch`

Use when a KPI card needs a local `日/周/月`, `月/年`, or similar compact grain switch plus a mini bar distribution.

Rules:

- One local control group only; it affects this card or declared local KPI group.
- Mini bars show recent distribution or selected-period pattern. They do not replace a full bar chart.
- Highlight the selected/current bar only when its relationship to the primary value is declared.
- If the mini bars need axes or category labels to be useful, move them to a chart card.

### Pattern: `horizontal-period-summary-strip`

Use when current, previous, and target values are the evidence, and a chart would be unnecessary.

Rules:

- Bottom strip uses `2-3` equal cells, usually `本月 / 上月 / 目标` or `本期 / 上期 / 目标`.
- Cell labels and values align on a shared baseline.
- Do not add decorative icons or charts when the strip already answers the comparison.
- If more than `3` values are required, use a small table or detail drawer.

### Pattern: `horizontal-pp-assist-info`

Use for percentage or rate metrics where the change should be expressed as percentage points, such as on-time rate, conversion rate, yield, or fulfillment rate.

Rules:

- Use `pp` only when the delta is `currentRate - baselineRate`. Do not use `pp` for percent growth such as `(current - prior) / prior`.
- Show the pp delta as a compact badge near the primary value.
- Auxiliary info panel may show prior period value, calendar/period, or mini bars.
- If the audience expects percent change rather than percentage points, rename the metric or change the pattern.

### Pattern: `horizontal-warning-status-band`

Use when the KPI value has a threshold state and the next action is to notice or resolve the condition, such as inventory turnover days, overdue rate, stockout risk, abnormal cost, or safety warning.

Rules:

- Warning badge is adjacent to the value, not hidden in the footer.
- Bottom band carries the warning reason and threshold, such as `高于目标值（<=25天）`.
- The band color is semantic and restrained; do not turn the entire card into a full warning surface unless it is a blocking alert.
- The warning must have a detail/action path when operational follow-up is expected.

Landscape fallback order:

1. Remove decorative icon or background illustration.
2. Collapse local control from segmented options to compact dropdown.
3. Move secondary comparison or prior-period value to tooltip.
4. Hide mini chart evidence before shrinking the primary value.
5. Switch to `plain-metric` or a full chart/table block when the evidence cannot fit.
