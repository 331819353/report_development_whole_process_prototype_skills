# 12b2 Placement KPI Judgment Goal And Time Series

Load this file for KPI Judgment, KPI Goal Execution, and KPI Time-Series Analysis card placement.

### KPI Judgment Card

Use this algorithm when a metric card sets `kpiJudgmentCardPattern`. The card's primary job is a bounded judgment: status, health, rating, score, risk, project state, payment state, service state, or gauge progress.

Minimum outer size:

```text
W >= 360px
H >= 240px
standard W = 400-460px
standard H = 300-360px
```

Slot budget:

```text
P = clamp(16px, W * 0.045, 24px)
CW = W - 2P
CH = H - 2P

headerH = 32-44px
heroH = clamp(96px, H * 0.38, 160px)
comparisonStripH = 54-72px
footerH = 32-52px
bodyGap = 8-12px
```

Hero visual minimums:

```text
semanticIconBox >= 72x72px
ringBox >= 136x136px
semiGaugeBox >= 180x112px
thresholdBulletBox >= 220x28px
dimensionRowH >= 20px
dimensionRows = 3-5 preferred
ratingDistributionRows <= 5
```

Geometry:

```text
headerX = P
headerY = P
headerW = CW
controlW = min(actualControlWidth, CW * 0.34, 148px)

heroX = P
heroY = P + headerH + bodyGap
heroW = CW
heroH = min(heroH, CH - headerH - comparisonStripH - footerH - bodyGap * 3)

comparisonY = heroY + heroH + bodyGap
comparisonH = comparisonStripH
comparisonCellCount = min(3, visibleComparisonCount)
comparisonCellW = CW / comparisonCellCount

footerY = comparisonY + comparisonH + bodyGap
footerH = CH - headerH - heroH - comparisonH - bodyGap * 3
```

Rules:

- The hero zone owns exactly one judgment visual: semantic icon, ring, semi-gauge, threshold bullet, dimension bars, rating stars, or rating distribution. Do not add a second chart-like visual.
- Status/level text sits inside or immediately beside the hero zone. The user should read the visual and label as one sentence, such as `正常运行`, `健康 92`, `良好 78`, or `告警中`.
- Comparison strip cells share height and baseline. Use `2-3` cells; more comparisons move to tooltip/detail.
- Footer evidence is not optional unless inherited by a parent block. It names source/freshness, last check time, target, due date, sample count, risk count, or exact-value route.
- `health-dimension-breakdown-card` and `rating-distribution-card` may use the hero zone for rows instead of a centered icon/ring. Keep row labels readable; never render tiny unreadable bars to preserve the card shape.
- `semicircle-gauge-target-card` uses uniform scaling and keeps arc/ticks/target marker inside `semiGaugeBox`. If target labels collide with ticks, move labels to tooltip or footer.

Fit check:

```text
requiredHeaderW = titleTextW + controlW + 16px
requiredHeaderW <= CW
heroH >= 96px
comparisonStripH >= 54px when comparisons are visible
footerH >= 32px when footer evidence is visible
visibleComparisonCount <= 3
heroVisualCount == 1
```

When the fit check fails, degrade in this order:

1. Collapse segmented control to dropdown or inherit the page filter.
2. Hide optional index, help icon, or overflow menu.
3. Move secondary helper copy to tooltip while keeping status/level text.
4. Reduce comparison strip to one priority comparison.
5. Reduce dimension rows to Top `4` or move distribution rows to detail.
6. Replace ring/gauge with status chip + value when the hero fit box is too small.
7. Split to a full gauge/chart/table/detail block before shrinking the card below `360x240`.

### KPI Goal Execution Card

Use this algorithm when a metric card sets `kpiGoalExecutionCardPattern`. The card's primary job is execution management: target attainment, gap/variance, progress against plan, milestone state, deadline, or remaining work.

Minimum outer size:

```text
W >= 360px
H >= 240px
standard W = 400-520px
standard H = 280-360px
```

Slot budget:

```text
P = clamp(16px, W * 0.045, 24px)
CW = W - 2P
CH = H - 2P

headerH = 32-44px
heroH = clamp(96px, H * 0.38, 160px)
summaryH = 40-72px
comparisonStripH = 54-72px
footerH = 32-52px
bodyGap = 8-12px
```

Hero visual minimums:

```text
ringBox >= 136x136px
semiGaugeBox >= 180x112px
linearProgressBox >= 220x24px
targetActualPaneW >= 120px
dotStripItemCount <= 12 before grouping
milestoneNodes = 3-7 preferred
milestoneNodeGap >= 52px
timelineBox >= 240x80px
```

Geometry:

```text
headerX = P
headerY = P
headerW = CW
controlW = min(actualControlWidth, CW * 0.34, 148px)

heroX = P
heroY = P + headerH + bodyGap
heroW = CW
heroH = min(heroH, CH - headerH - summaryH - comparisonStripH - footerH - bodyGap * 4)

summaryY = heroY + heroH + bodyGap
summaryH = clamp(40px, summaryH, 72px)

comparisonY = summaryY + summaryH + bodyGap
comparisonCellCount = min(4, visibleComparisonCount)
comparisonCellW = CW / comparisonCellCount

footerY = H - P - footerH
```

Rules:

- The hero zone owns exactly one execution visual: ring, semi-gauge, linear target progress, target/actual bars, dot strip, stepper, timeline, or cumulative milestone line.
- Actual value, target value, gap, progress delta, or current milestone must be adjacent to the hero visual or summary zone. The user should not need to infer the number from the shape alone.
- Comparison strip cells share height and baseline. Use `2-4` cells; more evidence moves to tooltip/detail.
- Footer evidence names target completion date, remaining days, due status, source/freshness, next milestone, or exact-value route. It is mandatory when the card mentions deadline, remaining time, or forecast status.
- `gap-gauge-deficit-card` and `gap-target-actual-compare-card` reserve red/negative emphasis for the gap, not the whole card surface. The primary deficit value must include unit and direction semantics.
- `progress-plan-actual-card` reserves space for both planned progress and actual progress. If one is missing, use an attainment card instead.
- `milestone-timeline-card` uses the hero zone for nodes/timeline. Keep node labels short; full milestone names and dates go to tooltip/detail when labels collide.

Fit check:

```text
requiredHeaderW = titleTextW + controlW + 16px
requiredHeaderW <= CW
heroH >= 96px
summaryH >= 40px when target/actual/gap/progress text is visible
comparisonStripH >= 54px when comparisons are visible
footerH >= 32px when deadline/source/evidence is visible
visibleComparisonCount <= 4
heroVisualCount == 1
```

When the fit check fails, degrade in this order:

1. Collapse segmented control to dropdown or inherit the page period.
2. Hide optional index, help icon, or decorative illustration.
3. Reduce comparison strip to the two most decision-relevant cells.
4. Replace ring/semi-gauge/dot strip with a linear target progress track when the hero fit box fails.
5. Collapse milestone nodes to previous/current/next and move the full list to detail.
6. Move secondary deadline/source copy to tooltip while keeping due status or remaining time visible.
7. Split to a full target/actual chart, progress table, timeline, Gantt, or detail drawer before shrinking the card below `360x240`.

### KPI Time-Series Analysis Card

Use this algorithm when a metric card sets `kpiTimeSeriesCardPattern`. The card's primary job is temporal analysis: trend movement, named-baseline change, YoY/MoM comparison, cycle or period state, volatility/stability, or forecast uncertainty.

Minimum outer size:

```text
W >= 360px
H >= 240px
standard W = 400-520px
standard H = 280-360px
```

Slot budget:

```text
P = clamp(16px, W * 0.045, 24px)
CW = W - 2P
CH = H - 2P

headerH = 32-44px
valueH = 56-88px
legendOrChipH = 0px or 18-28px
timeSeriesEvidenceH = max(112px, CH - headerH - valueH - legendOrChipH - footerH - bodyGap * 4)
footerH = 44-72px
bodyGap = 8-12px
```

Evidence visual minimums:

```text
axisChartBodyW >= 120px
axisChartBodyH >= 112px
axisPlotH >= 86px
sparklineBox >= 160x64px
forecastFutureRegionW >= 40px after forecastStart
footerCellCount <= 4
footerCellW >= 88px
```

Geometry:

```text
headerX = P
headerY = P
headerW = CW
controlW = min(actualControlWidth, CW * 0.34, 148px)

valueX = P
valueY = P + headerH
valueW = CW
valueH = clamp(56px, valueH, 88px)

chipY = valueY + valueH + bodyGap
chipH = legendOrChipH

evidenceX = P
evidenceY = chipY + chipH + bodyGap
evidenceW = CW
evidenceH = timeSeriesEvidenceH

footerY = H - P - footerH
footerH = clamp(44px, footerH, 72px)
```

Pattern-specific requirements:

- `trend-line-target-card` reserves line or area evidence plus optional target/reference label. If the target label collides with the value band or y-axis, move it to tooltip or the footer.
- `change-baseline-delta-card` must show the named baseline, current value, and delta value/rate. Baseline and current marks share one scale; do not use separate scales to exaggerate change.
- `yoy-mom-comparison-card` keeps YoY and MoM as separate baselines. Do not merge them into a single "growth" chip; prior-year and prior-period values remain inspectable in tooltip/footer.
- `cycle-period-progress-card` may use a ring, stepper, period strip, or cycle line, but it must declare cycle grain, period start/end, current index, total count, and phase/status.
- `volatility-stat-card` must show volatility level plus at least max, min, and standard deviation or a named volatility formula. Threshold bands or level chips use business direction semantics.
- `forecast-interval-card` draws actual history as solid marks and forecast as dashed/weak marks. The forecast band or confidence interval owns a future-region width of at least `40px`; otherwise downgrade to a forecast note.

Rules:

- The card answers exactly one temporal question. Do not combine trend, target gap, forecast, and volatility unless one is the primary question and the others are footer evidence.
- Ordered time fields, time grain, latest period, direction semantics, tooltip payload, source/freshness, and exact-value route are mandatory.
- Use realistic temporal variation. Perfectly smooth lines, identical bars, and generic upward curves make the card feel synthetic unless the data source proves that shape.
- Comparison badges inherit business direction: higher-is-better, lower-is-better, range-target, or neutral. Color alone is not the rule.
- Footer evidence is mandatory and should contain the baseline value, prior period, volatility stats, forecast interval, sample count, or target/reference value.

Fit check:

```text
requiredHeaderW = titleTextW + controlW + 16px
requiredHeaderW <= CW
timeSeriesEvidenceH >= 112px
axisPlotH >= 86px when axes/grid are visible
sparklineBox >= 160x64px when no axes are visible
forecastFutureRegionW >= 40px when forecast is visible
footerH >= 44px and footerCellCount <= 4
temporalQuestionCount == 1
```

When the fit check fails, degrade in this order:

1. Collapse segmented controls to dropdown or inherit the page period.
2. Hide optional index, help icon, or decorative domain icon.
3. Move secondary chips such as extra baseline, confidence, or level to tooltip.
4. Reduce footer cells to the two most decision-relevant facts.
5. Downgrade axis chart evidence to a sparkline only when axes, thresholds, and forecast intervals are not required.
6. Split to a full line/bar/forecast chart or detail table before shrinking the card below `360x240`.
