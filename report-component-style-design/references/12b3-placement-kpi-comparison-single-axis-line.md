# 12b3 Placement KPI Comparison Single Indicator And Axis Line

Load this file for KPI Comparison Analysis, Single-Indicator KPI Grid, and Axis-Line Diagnostic KPI Card placement.

### KPI Comparison Analysis Card

Use this algorithm when a metric card sets `kpiComparisonAnalysisCardPattern`. The card's primary job is comparison analysis: direct same-metric comparison, group/segment comparison, competitor position, benchmark position, or signed variance/gap diagnosis.

Minimum outer size:

```text
W >= 360px
H >= 240px
standard W = 400-560px
standard H = 280-380px
```

Slot budget:

```text
P = clamp(16px, W * 0.045, 24px)
CW = W - 2P
CH = H - 2P

headerH = 32-44px
summaryH = 56-92px
legendOrRoleH = 0px or 18-28px
comparisonEvidenceH = max(112px, CH - headerH - summaryH - legendOrRoleH - footerH - bodyGap * 4)
footerH = 44-72px
bodyGap = 8-12px
```

Evidence visual minimums:

```text
axisChartBodyW >= 140px
axisChartBodyH >= 112px
axisPlotH >= 92px
radarFitBox >= 150x150px
donutFitBox >= 128x128px
benchmarkRuler >= 220x40px
npsOrScoreScale >= 220x32px
comparisonTableVisibleRows >= 3
comparisonTableVisibleColumns between 3 and 6
footerCellCount <= 4
footerCellW >= 88px
visibleSubjects <= 5 by default
```

Geometry:

```text
headerX = P
headerY = P
headerW = CW
controlW = min(actualControlWidth, CW * 0.34, 148px)

summaryX = P
summaryY = P + headerH
summaryW = CW
summaryH = clamp(56px, summaryH, 92px)

roleY = summaryY + summaryH + bodyGap
roleH = legendOrRoleH

evidenceX = P
evidenceY = roleY + roleH + bodyGap
evidenceW = CW
evidenceH = comparisonEvidenceH

footerY = H - P - footerH
footerH = clamp(44px, footerH, 72px)
```

Pattern-specific requirements:

- `direct-value-compare-card` keeps compared values on the same unit, denominator, period, and axis scale. If definitions differ, switch to a metric matrix or explanation card.
- `group-segment-compare-card` reserves enough category/legend space for group labels and uses deterministic sort. If `visibleSubjects > 5`, show Top N plus `其他` or split.
- `competitor-position-card` reserves role labels for primary product, competitors, peers, industry average, and market total. The primary subject may be highlighted, but competitor geometry stays comparable.
- `benchmark-position-card` reserves space for benchmark markers such as P50/P75/P90, industry average, or standard value. The benchmark source and validity period stay visible or in tooltip/footer.
- `variance-gap-card` reserves signed gap value/rate and direction semantics. A variance table preview needs subtotal/reconciliation row when the card claims total gap.

Rules:

- The card answers exactly one comparison question. Avoid mixing competitor share, benchmark P90, group trend, and target gap as equal evidence in one small card.
- Comparable subject grain, role fields, shared metric definition/unit/grain, comparison direction, sort rule, tooltip payload, source/freshness, and exact-value route are mandatory.
- Circular evidence such as donut, radar, ring, or gauge must keep aspect ratio. If the fit box fails, switch to bars/table rows before stretching the graphic.
- Multi-series comparison uses direct labels or a visible legend; group/competitor colors cannot be random and must preserve role consistency across cards.
- Long competitor, region, product, or group names truncate only with tooltip/detail disclosure.

Fit check:

```text
requiredHeaderW = titleTextW + controlW + 16px
requiredHeaderW <= CW
comparisonEvidenceH >= 112px
axisPlotH >= 92px when axes/grid are visible
radar/donut fit boxes preserve aspect ratio
footerH >= 44px and footerCellCount <= 4
comparisonQuestionCount == 1
subject roles and shared metric definitions declared
```

When the fit check fails, degrade in this order:

1. Collapse segmented controls to dropdown or inherit the page period/comparison scope.
2. Hide optional index, help icon, rank badge, or decorative domain icon.
3. Reduce visible groups/competitors to Top `4-5` plus `其他`.
4. Move long subject labels, secondary metric dimensions, and benchmark definitions to tooltip/detail.
5. Convert circular evidence to bars or table rows when the fit box fails.
6. Reduce footer cells to the two most decision-relevant facts.
7. Split to a full comparison chart, benchmark table, metric matrix, detail table, or drawer before shrinking the card below `360x240`.

### Single-Indicator KPI Grid Card

Use this algorithm when a peer KPI grid uses `kpiSingleIndicatorLayoutMode`. This card is still a KPI card, not a chart card: the large number answers current status, the right/bottom mini visual provides one piece of evidence, and the footer states target plus attainment.

Minimum outer size:

```text
W >= 360px
H >= 220px
standard W = 400-460px
standard H = 260-320px
```

Slot budget:

```text
P = clamp(16px, W * 0.045, 24px)
CW = W - 2P
CH = H - 2P

headerH = 34-44px
valueBandH = clamp(64px, H * 0.30, 92px)
compareH = 22-28px
footerH = 44-60px when target/progress footer exists
bodyGap = 8-12px

bodyH = CH - headerH - footerH - bodyGap
evidenceBoxH = bodyH - valueBandH - compareH
evidenceBoxH >= 56px
```

Header geometry:

```text
indexW = 0 or 28-36px
titleX = P + indexW
titleY = P + 4px
titleW = CW - indexW - controlW - 12px
controlX = W - P - controlW
controlY = P
controlH = 32-36px
```

Body split:

```text
primaryX = P
primaryY = P + headerH
primaryW = clamp(150px, CW * 0.52, 230px)
auxX = P + primaryW + 12px
auxW = CW - primaryW - 12px

valueY = primaryY + 6-12px
comparisonY = valueY + valueGlyphH + 12px
evidenceFitBox = (auxX, primaryY + 8px, auxW, bodyH - 8px)
```

Footer geometry:

```text
footerY = H - P - footerH
targetTextX = P
attainmentTextX = W - P - attainmentTextW
targetTextY = footerY + 6-10px
progressTrackX = P
progressTrackW = CW
progressTrackY = footerY + footerH - 10-14px
progressTrackH = 4-6px
```

Evidence fit boxes:

- `dropdown-sparkline-progress`: sparkline uses `>=120x56px`, no axes, latest point may be highlighted.
- `unit-toggle-ring-progress`: ring uses `>=116x96px`, center value optional only if it does not duplicate the primary value.
- `dropdown-minibar-progress` and `grain-switch-minibar-progress`: bars use `>=120x56px`, normally `6-12` bars, one highlighted current bar.
- `dropdown-area-sparkline-progress` and `scale-toggle-area-progress`: area sparkline uses `>=120x56px`, fill opacity low enough to keep value hierarchy.
- `dropdown-gauge-progress`: semi-gauge uses `>=116x96px`, preserves semicircle ratio, and includes target/threshold semantics in tooltip or footer.

Fit check:

```text
requiredHeaderW = indexW + titleTextW + helpIconW + controlW + 16px
requiredHeaderW <= CW
primaryW >= 150px
auxW >= 112px when evidence visual exists
footerH == 0 or footerH >= 44px
progressTrackW >= 200px when progress track is visible
evidence visual count == 1
```

When the fit check fails, degrade in this order:

1. Collapse segmented control to compact dropdown.
2. Hide sample index and definition icon.
3. Move secondary comparison wording to tooltip.
4. Hide the mini evidence visual while keeping target/attainment text.
5. Hide progress track and keep target/attainment text only.
6. Use `plain-metric`, a full chart card, or a detail drawer before shrinking the primary value.

### Axis-Line Diagnostic KPI Card

Use this algorithm when `kpiCardPattern` is `horizontal-axis-line-trend`.

This is a KPI card, not a generic chart block: the top value answers the current judgment, while the ECharts line body proves the trend, target, threshold, phase, or comparison evidence.

Minimum outer size:

```text
W >= 420px
H >= 260px
standard W = 460-560px
standard H = 280-340px
```

Slot budget:

```text
P = clamp(16px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P

headerH = 32-44px
valueBandH = 56-78px
compareInlineH = 20-24px when comparison is not inline with value
chartTopGap = 8-12px
xAxisH = 28-40px
legendH = 0-24px
footerH = 0-20px

chartBodyH = CH - headerH - valueBandH - compareInlineH - chartTopGap - footerH
chartBodyH >= 180px
plotH >= 130px
```

Header geometry:

```text
titleX = P
titleY = P
controlH = 28px
controlW = min(actualControlWidth, CW * 0.42, 168px)
controlX = W - P - controlW
titleMaxW = CW - controlW - 12px
```

Value geometry:

```text
valueX = P
valueY = P + headerH
valueMaxW = CW * 0.52
compareX = valueX + valueTextW + 16px when inline comparison fits
compareY = valueY + valueBaselineOffset
```

The main value may be left-aligned in this pattern because the card is a scan-friendly analytical surface. It still must be the strongest text, and the comparison/status must sit close enough to be read as part of the value judgment.

Line body geometry:

```text
chartX = P
chartY = P + headerH + valueBandH + compareInlineH + chartTopGap
chartW = CW
chartH = chartBodyH

yAxisW = clamp(36px, maxYAxisLabelWidth + 8px, 56px)
rightGap = 8-16px
rightGap = 44-64px when target/reference/threshold labels sit on the right
gridTop = legendH + 4px
gridBottom = xAxisH
gridLeft = yAxisW
gridRight = rightGap
```

Evidence-mode placement:

- `basic-compare-line`: one primary line, weak grid, all x labels only when `N <= 8`.
- `filled-baseline-line`: area fill opacity `8-14%`; fill starts at the baseline and must not cover grid/labels.
- `target-reference-line`: reserve right/top label gap; target label may collapse to tooltip if it collides.
- `phase-annotated-line`: phase band starts and ends on x-axis positions; label sits inside the band top-right or outside the plot with a leader.
- `unit-axis-line`: unit appears in title or y-axis metadata, not as a large floating label inside the plot.
- `grain-switch-line`: segmented control lives in the header right; `2-4` short options only, otherwise use dropdown.
- `dual-comparison-line`: legend consumes `20-24px`; primary series is stronger, comparison series is muted or dashed.
- `threshold-band-line`: bands are weak background rectangles with right-side labels; line and point contrast remain dominant.

Fit check:

```text
requiredHeaderW = titleTextW + controlW + 12px
requiredHeaderW <= CW
valueBandH >= valueGlyphH + comparisonH + 4px
chartBodyH >= 180px
plotH >= 130px
yAxisW + rightGap + 160px <= chartW
```

When the fit check fails, degrade in this order:

1. Collapse segmented control to a selected-value dropdown.
2. Hide ordinary point symbols and all non-key labels.
3. Move target/reference/threshold text labels into tooltip while keeping the line/band.
4. Remove area fill before removing axes.
5. Downgrade to `horizontal-trend-compare` by hiding axes/grid and treating the chart as a sparkline.
6. Split into a full line chart card or detail drawer before shrinking the value or rendering a thin unreadable plot.
