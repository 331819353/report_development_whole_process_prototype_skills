# 04a1 KPI Landscape Overview Judgment And Goal Patterns

Load this file for landscape KPI card patterns, KPI overview, KPI judgment/status, and KPI goal-execution pattern families.

## Landscape KPI Card Patterns

Use these patterns when a KPI card is intentionally horizontal, such as a first-row management indicator, an operations console summary card, a table/detail header card, or a wide dashboard peer card.

These designs feel strong and not AI-generated because each card follows a clear decision chain:

```text
metric name -> primary value -> comparison/status -> one evidence visual -> detail/action path
```

The visual evidence is not decoration. The line, ring, progress track, mini bars, comparison strip, percentage-point badge, or warning band must be derived from the KPI contract.

Axis-line diagnostic KPI cards add one more reason they feel designed: they spend enough height on a real chart body, so the y-axis scale, x-axis period, target/reference line, threshold zone, phase mark, or comparison series can be read without competing with the headline value. This makes the card look like a deliberate analytical module instead of a decorative KPI tile with a random sparkline.

Axis-bar diagnostic KPI cards feel designed for a similar but more scan-oriented reason: the card uses horizontal bars for ordered comparison, so labels stay left, bar lengths stay middle, and exact values or change rates stay right. The visual rhythm supports reading and ranking rather than decoration, and target/threshold marks sit on the same quantitative axis as the bars.

Scatter diagnostic KPI cards feel designed because the dots are not random garnish: x/y axes name two business measures, the point cloud shows distribution, reference lines or quadrants turn the cloud into a decision, and sparse labels/tooltip keep exact object evidence available.

Spatial map diagnostic KPI cards feel designed because geography is the evidence layer. A muted basemap, bounded projection, visualMap/legend, and selective labels make spatial differences readable without turning the card into a decorative map.

Paired comparison diagnostic KPI cards feel designed because the two panes are intentionally comparable. The central `VS` rail, mirrored pane geometry, and bottom conclusion strip create a clear judgment path instead of two unrelated numbers placed side by side.

KPI overview cards feel designed because they compress a business-domain answer into one disciplined horizontal scan: domain title/control -> lead or sibling metrics -> comparison context -> target/progress -> one small evidence visual or explicit disclosure path. The card does not become a chart collage; every cell has a declared role and shared baseline.

Single-indicator KPI grid cards feel designed because the repetition is disciplined: every card uses the same metric grammar, but the evidence visual changes only when the metric needs it. Index number, title/help, local control, value, comparison, evidence visual, target text, and progress footer form a predictable scan path, so a page can contain many KPIs without becoming a random chart collage.

Common landscape anatomy:

| Zone | Rule |
| --- | --- |
| Header row | Title top-left, one local control top-right. The control is a segmented capsule or compact dropdown, never a second toolbar. |
| Primary value zone | Left or center-left. It owns the largest text and keeps value + unit together. |
| Comparison/status zone | Sits directly under or beside the value. It names the baseline, direction, and semantic meaning. |
| Auxiliary visual zone | Right side or bottom band. It must explain the judgment: trend, ring, target track, status icon, or bar strip. |
| Evidence/footer band | Optional. Use for prior/current/target cells, warning text, previous-period value, or auxiliary mini bars. |
| Exact-value path | Tooltip, focus, detail drawer, or linked full chart/table. |

Minimum useful landscape sizes:

| Tier | Width | Height | Use |
| --- | ---: | ---: | --- |
| Compact row | `360-420px` | `128-160px` | Value, one comparison, one compact icon/progress/status; chart-like evidence usually hidden. |
| Standard landscape | `420-560px` | `180-240px` | Full horizontal KPI card with local control and one auxiliary evidence visual. |
| KPI overview card | `720-960px` | `220-320px` | One business-domain card with `2-5` metrics, local control, comparison/target cells, and optional sparkline. |
| KPI judgment card | `360-460px` | `240-360px` | One status/health/rating/gauge judgment, one semantic hero visual, comparison strip, and footer evidence. |
| KPI goal execution card | `360-520px` | `240-360px` | One target attainment, gap, progress, or milestone execution judgment with actual/target/gap/progress fields, comparison strip, and deadline/footer evidence. |
| Single-indicator grid card | `360-460px` | `220-320px` | One metric, one comparison, right/bottom mini evidence, and bottom target/progress footer in a peer KPI grid. |
| Axis-line diagnostic | `420-560px` | `260-340px` | KPI headline plus a readable ECharts line body with axes, target/reference/threshold/dual-series evidence. |
| Axis-bar diagnostic | `420-560px` | `260-340px` | KPI headline plus readable horizontal bars with labels, value column, target/reference/threshold/dual-series evidence. |
| Axis-scatter diagnostic | `420-560px` | `300-360px` | KPI headline plus readable scatter body with axes, reference/trend/threshold/quadrant evidence. |
| Spatial-map diagnostic | `460-640px` | `320-380px` | KPI headline plus map body with preserved geography, visualMap/legend, and selective labels. |
| Paired comparison diagnostic | `420-560px` | `260-340px` | Two comparable panes, central `VS` rail, optional mini evidence, and bottom conclusion strip. |
| Wide banner | `560-760px` | `160-240px` | Split value/evidence zones; can show a larger trend, ring, strip, or warning band. |

Landscape slot minimums:

- Title/control row: `28-40px`.
- Primary value column: `140-220px` wide.
- Auxiliary visual zone: at least `96x72px`; ring/progress/gauge-like visuals need `108x96px`.
- Bottom evidence band: `44-68px` when present.
- Mini line/bar evidence: plot or glyph band `48-72px`; do not render axis labels inside a landscape KPI card.
- Axis-line evidence: chart body `>=180px`, plot height `>=130px`, y-axis label band `36-56px`, x-axis label band `28-40px`; if any axis or threshold label is visible, do not classify it as a sparkline.
- Axis-bar evidence: chart body `>=180px`, plot height `>=140px`, category label column `44-88px`, value/change-rate column `48-96px`, x-axis band `28-40px`, and per-bar row height `>=22px`; if value labels or target lines are visible, do not classify it as a mini bar strip.
- Axis-scatter evidence: chart body `>=200px`, inner plot height `>=160px`, y-axis label band `40-60px`, x-axis label band `32-48px`, point radius `3-6px`, permanent labels `<=6`, and point count/density strategy declared.
- Spatial-map evidence: map body `>=220px`, map viewport `>=180px` on the shorter side, legend or side summary budget `72-140px`, and projection/aspect ratio preserved through a measured fit box.
- Paired comparison evidence: each pane `>=140px` wide, central `VS` rail `32-44px`, optional mini evidence `>=72px` high, and bottom conclusion band `36-52px`.
- Linear target progress track: at least `200x24px` for track + marker + min/max labels.

### KPI Overview Card Patterns

Use this mode set when a single wide card answers a business-domain overview question. It differs from a single-indicator KPI card in two ways: the card may carry `2-5` metrics, and the title names the domain/topic rather than only the metric.

```text
index/section marker -> domain title -> one local control group -> lead/sibling metrics -> comparison/target evidence -> compact visual or detail path
```

These cards feel strong and not AI-generated because the repetition is purposeful. Icon tiles, dividers, progress tracks, and sparklines are subordinate to the metric hierarchy; they do not create random decoration. Each metric has a named baseline, unit, and target/status path, so the user can read a domain summary without guessing what the visuals mean.

Layout modes:

| `kpiOverviewCardPattern` | Anatomy | Required data |
| --- | --- | --- |
| `lead-metric-comparison-sparkline-overview` | icon tile, lead metric, `1-2` comparison cells, target/attainment cell, right sparkline | lead value, unit, `1-2` comparisons, target, attainment rate, ordered trend series |
| `multi-metric-strip-progress-overview` | `3-5` equal metric cells with vertical dividers, each with comparison and progress | metric list, value/unit/comparison per metric, target/attainment per metric when progress is visible |
| `domain-metric-cluster-progress-overview` | icon tile, lead metric, `2-3` companion metrics, one target/progress summary | lead value, companion metric values, comparison fields, target/attainment or summary status |

Minimum and slot budget:

- Minimum outer size: `720x220`; standard size: `760-960px` wide and `240-320px` high.
- Header row: `36-48px`, with index/section marker optional, domain title left, one local control group plus optional overflow menu right.
- Icon tile: `64-92px` square when used; hide before shrinking metric cells.
- Lead metric zone: `180-260px` wide; primary value remains the strongest glyph.
- Metric cell zone: each metric cell `>=128px` wide and `>=112px` high; equal sibling cells share value, comparison, target, and progress baselines.
- Comparison cell: `112-160px` wide, with label, signed value, baseline helper, and tooltip payload.
- Target/progress cell: `150-200px` wide; progress track `>=120px`; target and attainment values remain visible or discoverable.
- Sparkline/evidence fit box: `120x56px` minimum, `160x72px` preferred; no axes inside this overview card.

Rules:

- One overview card answers one domain or management topic, such as sales, users, operations, finance, production, quality, inventory, or delivery.
- Keep visible metrics to `2-5`. More than `5` metrics require a metric switch, tabs, split cards, or a Micro Dashboard Card.
- The visible local control is scoped to this card only. Period switches change the metric and evidence dataset; unit/scale switches change display units; metric switches change which bounded metric set is visible.
- The card has at most one compact evidence visual. A sparkline, small bars, icon tile, or progress track may appear, but not a combination that competes with the metrics.
- Vertical dividers separate sibling metric cells only when the cells share height and baselines. Do not draw divider lines through values, badges, or progress tracks.
- Theme color follows domain semantics or project tokens: blue for sales/target, green for growth/quality/improvement, purple for finance/efficiency only when approved. Color never substitutes for labels, units, or target definitions.
- Icon tiles are meaningful only when they identify the domain. They are soft anchors, not illustrations; remove them first when the card is tight.
- Mock data must include at least one non-perfect comparison, target gap, or weaker companion metric when business reality allows it. An all-up, all-green overview card is suspect unless source evidence proves it.

Fallback:

1. Collapse segmented local control to a selected-value dropdown.
2. Hide overflow menu or definition icon if actions are secondary.
3. Hide icon tile or decorative domain mark.
4. Move secondary baseline helper text to tooltip while keeping comparison values.
5. Reduce visible metrics to Top `3` by priority and move the rest to drawer/detail.
6. Hide sparkline evidence before shrinking metric values.
7. Split into separate KPI cards, a full chart/table block, or a Micro Dashboard Card when the overview needs more than `5` metrics or more than one evidence visual.

### KPI Judgment Card Patterns

Use this mode set when one card answers a bounded judgment question: "是否正常", "是否健康", "是否优秀", "是否达标", "风险多高", "评分如何", or "处在哪个状态". These cards are still KPI cards, not generic icon tiles or chart blocks. The hero visual is accepted only when it is backed by a status dictionary, score range, threshold bands, target, or rating distribution.

```text
index/title/control -> semantic hero visual -> value/status label -> comparison strip -> footer evidence/disclosure
```

These cards feel designed and not AI-generated because the visual grammar follows the metric semantics. A check icon means categorical normality, a ring means bounded completion or score, a bullet bar means threshold judgment, dimension bars explain a composite health score, rating bars explain a satisfaction score, and a gauge makes target/range status visible. The repeated comparison strip and footer keep the cards auditable instead of merely polished.

Pattern modes:

| `kpiJudgmentCardPattern` | Hero visual | Required data |
| --- | --- | --- |
| `semantic-status-icon-card` | domain icon inside soft semantic disk/tile | status field, status dictionary, latest state, reason/detail path, optional status duration |
| `progress-status-ring-card` | circular progress/ring with center value or percent | value/progress, min/max or denominator, target, status label, due date or completion denominator |
| `health-score-ring-card` | circular score ring with health level | score field, score range, level dictionary, comparison fields, update/freshness |
| `health-threshold-bullet-card` | horizontal threshold/bullet bar with pointer | value/score, threshold band fields, target/min/max, direction, level labels |
| `health-dimension-breakdown-card` | overall score plus `3-5` dimension chips/bars | dimension dataset, dimension name, score/value, status/level per dimension |
| `rating-score-summary-card` | star, badge, hex, shield, or score tile plus label | score/rating, score range, level dictionary, comparison/gap, sample/evidence count |
| `rating-distribution-card` | rating distribution bars or share rows | distribution fields, total sample count, score/rating value, denominator-zero policy |
| `semicircle-gauge-target-card` | semi-gauge arc with ticks and target marker | value, min/max, target or threshold, direction, status color rule, overflow/clamp behavior |

Minimum and slot budget:

- Minimum outer size: `360x240`; standard size: `400-460px` wide and `300-360px` high.
- Header row: `32-44px`, including optional index, title/help, and one local control. Collapse the control before shrinking the hero visual.
- Hero zone: `96-160px` high. Semantic icons need `72-96px` square; rings need `136-180px` square; semi-gauges need `180x112px` minimum; threshold bars need `220x28px` minimum; dimension/rating rows need `4-6` visible rows at `20-28px` each.
- Judgment label/value zone: status/level copy sits beside or below the hero and must stay close enough to read as one judgment. The label is not decorative copy; it names the business state.
- Comparison strip: `54-72px`, usually `3` cells (`同比`, `环比`, `目标` or equivalent). Use vertical dividers only when cells share baselines.
- Footer evidence band: `32-52px`, for last check time, source/freshness, target definition, due date, sample count, risk count, progress text, or a compact sparkline. It cannot introduce a second full chart.

Rules:

- One card answers one judgment. Do not combine status icon, ring, gauge, dimension bars, and sparkline in the same card.
- Declare `judgmentKind`, `judgmentDirection`, `judgmentScoreRange`, `judgmentBands` or status dictionary, and the main `judgmentStatusField` or `judgmentScoreField`.
- Colors follow business meaning: green healthy/success/improved, blue progress/neutral information, orange pending/warning, red high risk/failure, purple only for approved domain semantics such as user/payment/product theme. Color never replaces label text.
- The visible comparison strip is capped at `3` cells. Additional comparisons move to tooltip, detail drawer, or a linked full analysis block.
- Ring and gauge cards must declare min/max, clamp/overflow behavior, target/threshold, and center value formatting. Unbounded metrics use a plain KPI or trend card instead.
- Health and rating cards must declare score ranges and level names, such as `优秀/良好/中等/较差`, not rely on raw color.
- Dimension breakdown cards show `3-5` dimensions by default. More dimensions require Top N, drawer, or a full table/radar chart.
- Rating distribution cards show at most `5` rating buckets permanently. Distribution percentages must reconcile to the visible sample count.
- Footer evidence is mandatory unless the surrounding block provides source/freshness and exact-value path.

Fallback:

1. Collapse segmented local control to a dropdown or inherited page filter.
2. Hide optional index/help/overflow menu.
3. Move secondary helper copy to tooltip while keeping status/level text.
4. Reduce comparison strip to the one most decision-relevant baseline.
5. Reduce dimension rows to Top `4` or rating rows to the defined rating scale only.
6. Replace ring/gauge with status chip + value when the hero fit box fails.
7. Split to a full gauge, radar, table, or detail drawer before accepting a squeezed judgment card.

### KPI Goal Execution Card Patterns

Use this mode set when one card answers a target execution question rather than a generic KPI question. The card must prove one of four execution jobs:

```text
target attainment -> gap/variance -> progress against plan -> milestone/deadline evidence
```

These cards feel designed and not AI-generated because the visual grammar follows the management contract. The ring, semi-gauge, target bar, dot strip, red deficit panel, paired bars, stage stepper, or milestone timeline is not decorative variety; it is the shortest visual form for actual value, target value, gap, planned progress, actual progress, remaining work, due date, and status.

Pattern modes:

| `kpiGoalExecutionCardPattern` | Hero visual | Required data |
| --- | --- | --- |
| `attainment-ring-summary-card` | ring/donut with center attainment rate | actual value, target value, attainment rate, remaining target, target formula |
| `attainment-gauge-deadline-card` | semi-gauge/ring plus due-status label | actual value, target value, attainment rate, deadline, due status, over/under target handling |
| `attainment-linear-target-card` | linear progress track with marker and min/max labels | actual value, target value, attainment rate, target marker, direction, optional scale min/max |
| `attainment-unit-progress-card` | dot/person/order strip or bounded count progress | actual count, target count, completion count, remaining count, item denominator |
| `gap-gauge-deficit-card` | deficit gauge/ring or red deficit callout | actual value, target value, gap value, gap rate, target miss status, direction |
| `gap-target-actual-compare-card` | target-vs-actual bars, budget/actual rows, or compact VS | actual value, target value, gap value, gap rate, baseline labels, shared unit/grain |
| `progress-plan-actual-card` | plan vs actual progress bars or progress delta strip | actual progress, planned progress, target progress, progress delta, remaining time, forecast status |
| `milestone-timeline-card` | stepper, phase cards, timeline, or cumulative milestone line | milestone dataset, milestone name, status, date, current milestone, total milestones, due date |

Minimum and slot budget:

- Minimum outer size: `360x240`; standard size: `400-520px` wide and `280-360px` high.
- Header row: `32-44px`, including optional index, title/help, local period/target control, and overflow menu. Collapse the control before shrinking the execution visual.
- Execution hero zone: `96-160px` high. Rings need `136x136px`; semi-gauges need `180x112px`; linear target bars need `220x24px` including marker and labels; paired bars/VS panes need each pane `>=120px` wide; milestone steppers need `3-7` visible nodes with node gap `>=52px`; timeline bodies need `>=240x80px`.
- Target/actual/gap summary zone: `40-72px`, with actual, target, gap, remaining target, or progress delta. Values must use the same unit/scale and remain inspectable.
- Comparison strip: `54-72px`, usually `2-4` cells such as `同比`, `环比`, `剩余目标`, `预计达成`, `剩余时间`, or `风险等级`.
- Footer evidence band: `32-52px`, for target completion date, remaining days, schedule status, source/freshness, next milestone, or exact-value/detail route.

Rules:

- One card answers one execution question. Do not combine ring, gauge, bar chart, dot strip, timeline, and detailed table in the same card.
- Declare `goalExecutionKind`, `goalDirection`, actual field, target field, and either attainment/gap/progress/milestone fields according to the selected pattern.
- `attainmentRate = actual / target` unless the business formula declares a different denominator. If lower-is-better or bounded-range applies, declare the direction and formatter.
- `gapValue = actual - target` or `target - actual` according to `goalDirection`; do not infer red/green from raw sign without business semantics.
- Deadline and remaining-time fields are mandatory when the visible copy mentions `提前`, `剩余`, `逾期`, `预计完成`, or `目标完成时间`.
- Planned-vs-actual progress cards must declare both planned progress and actual progress. A single progress value belongs to attainment, not plan-vs-actual progress.
- Milestone cards show `3-7` visible milestones by default. More milestones require horizontal scroll, phase grouping, condensed current-window display, drawer/detail, or a full timeline/Gantt.
- Red is reserved for target miss, deficit, lag, overspend, risk, or overdue. Orange is attention/overachievement/warning. Green is achieved/on-track/improved. Blue is neutral execution/progress. Purple only appears when the domain theme is approved.
- Overachievement must be labeled explicitly, such as `超额达成`, `已超前`, or `超过目标`. Do not silently cap all visuals at 100% without tooltip/detail explaining the overflow.
- Mock data should include non-perfect cases: remaining target, lagging progress, overachievement, upcoming deadline, or one pending milestone when business reality allows it.

Fallback:

1. Collapse segmented local control to dropdown or inherit the page period.
2. Hide optional index, help icon, domain illustration, or overflow action.
3. Reduce comparison strip to the two most decision-relevant cells.
4. Replace ring/semi-gauge/dot strip with a linear target progress track when the hero fit box fails.
5. Collapse milestone nodes to current + previous + next, with full list in drawer/detail.
6. Move secondary deadline/source copy to tooltip while keeping due status or remaining time visible.
7. Split to a full target/actual chart, progress table, timeline, Gantt, or detail drawer before accepting a squeezed execution card.

### KPI Time-Series Analysis Card Patterns

Use this mode set when one card answers a time-series analysis question rather than a generic KPI question. The card must prove one of six temporal jobs:

```text
trend movement -> change from baseline -> YoY/MoM comparison -> cycle/period state -> volatility/stability -> forecast/uncertainty
```

These cards feel designed and not AI-generated because every visual element has a statistical or temporal job. The line, area fill, grouped bars, period ring, volatility badge, comparison cells, dashed forecast, or confidence band is not decorative variety; it encodes ordered time, baseline choice, cycle window, volatility formula, or forecast uncertainty.

Pattern modes:

| `kpiTimeSeriesCardPattern` | Main evidence visual | Required data |
| --- | --- | --- |
| `trend-line-target-card` | line/area trend with latest point, optional target/reference | ordered time series, x field, y field, period grain, latest value, trend direction, optional target/reference/threshold |
| `change-baseline-delta-card` | current series vs baseline series, delta badge, or recent bars | current value, baseline value, baseline label, delta value, delta rate, comparison period, current series, optional baseline series |
| `yoy-mom-comparison-card` | trend or bars plus visible YoY/MoM chips and baseline cells | current value, YoY value/rate, MoM value/rate, prior-year comparable value, prior-period value, baseline semantics |
| `cycle-period-progress-card` | cycle progress ring, period phase badge, line/bars inside selected period | cycle grain, period start/end, current period index, total periods, period progress, phase/status, period target or attainment when visible |
| `volatility-stat-card` | jagged line/area with volatility level badge and stat footer | ordered series, volatility formula, volatility amplitude/rate, volatility level, max value, min value, standard deviation, threshold bands |
| `forecast-interval-card` | actual solid line plus forecast dashed line/bars and confidence band | actual series, forecast series, forecast start/end, forecast horizon, predicted value, confidence interval lower/upper, model/status field |

Minimum and slot budget:

- Minimum outer size: `360x240`; standard size: `400-520px` wide and `280-360px` high.
- Header row: `32-44px`, including optional index, title/help, local grain/period control, and overflow menu. Collapse the control before shrinking the chart evidence.
- Value and comparison zone: `56-88px`, with primary value, unit, period/baseline label, and `1-2` comparison chips. If the value line wraps, move the secondary baseline to tooltip/detail before shrinking the number.
- Time-series evidence zone: `112-176px`. Axis-visible line/bar evidence needs chart body `>=120px` and plot height `>=86px`; compact sparkline evidence needs fit box `>=160x64`. Forecast bands need at least `40px` future-region width after the forecast start.
- Footer evidence band: `44-72px`, usually `2-4` cells for max/min/stddev, prior-year/prior-period values, period target, forecast range, confidence interval, peak date, or exact-value route.
- Local legend/chip row: `18-28px` when actual/baseline/forecast series are visible. Hide series legend only when line styles and tooltip labels remain unambiguous.

Rules:

- One card answers one temporal question. Do not combine volatility, forecast, cycle phase, YoY/MoM, and target attainment in the same small card unless lower-priority details move to tooltip/detail.
- Every time-series card declares ordered time grain, x field, y field, latest period, period scope, and tooltip payload for exact points.
- Trend and change cards must name the baseline: previous period, prior-year comparable period, selected baseline, target, or forecast. A percentage without a named denominator fails.
- YoY/MoM cards must keep YoY and MoM as separate fields and labels; do not merge both into one generic "growth" value.
- Cycle cards must declare `cycleGrain`, period start/end, current period index, total periods or phase count, and period progress. A cycle badge without a cycle window is decorative.
- Volatility cards must declare the formula, such as `standardDeviation / average * 100%`, and threshold bands for low/medium/high volatility. Max/min/stddev values in the footer must come from the same filtered series.
- Forecast cards must distinguish actual from forecast through line style, fill, or bar style, and must expose forecast start/end, horizon, predicted value, and confidence interval or uncertainty status.
- Direction semantics are metric-specific. For costs, defects, response time, inventory days, and bad rates, lower can be better; do not infer green/red from positive or negative signs without `temporalDirection`.
- Use stable but non-perfect mock data: slight noise, plateaus, drops, spikes, baseline differences, forecast uncertainty, and at least one non-good state when realistic. Smooth monotone lines across every card look synthetic.
- Dense daily series should sample or aggregate to the visible grain when the plot would exceed `60` points; keep exact values in tooltip/detail.

Fallback:

1. Collapse segmented grain/period controls to a dropdown or inherit the page period.
2. Hide optional index, help icon, domain icon, or overflow action.
3. Reduce footer evidence to the two most decision-relevant cells.
4. Move secondary baseline, phase copy, or forecast method text to tooltip/detail.
5. Hide ordinary point markers and keep only latest/peak/forecast-start markers.
6. Downgrade axis-visible line/bar evidence to a compact sparkline only when exact values remain available.
7. Split to a full line/bar/forecast chart, volatility detail table, cycle timeline, or drawer before accepting a squeezed temporal card.
