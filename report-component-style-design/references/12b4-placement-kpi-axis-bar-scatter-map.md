# 12b4 Placement KPI Axis Bar Scatter And Map

Load this file for Axis-Bar, Axis-Scatter, and Spatial-Map Diagnostic KPI Card placement.

### Axis-Bar Diagnostic KPI Card

Use this algorithm when `kpiCardPattern` is `horizontal-axis-bar-compare`.

This is a KPI card, not a generic bar chart block: the top value answers the current judgment, while the ECharts horizontal bar body proves rank, period comparison, target gap, threshold state, category variation, or per-category change-rate evidence.

Minimum outer size:

```text
W >= 420px
H >= 260px
standard W = 460-560px
standard H = 280-340px
visibleBars = 3-6 recommended, 8 maximum
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
plotH >= 140px
barRowH = plotH / visibleBars
barRowH >= 22px
```

Header and value geometry follow the Axis-Line Diagnostic KPI Card algorithm.

Horizontal bar body geometry:

```text
chartX = P
chartY = P + headerH + valueBandH + compareInlineH + chartTopGap
chartW = CW
chartH = chartBodyH

categoryLabelW = clamp(44px, maxCategoryLabelWidth + 8px, 88px)
valueLabelW = clamp(48px, maxValueOrChangeLabelWidth + 8px, 96px)
rightGap = valueLabelW
rightGap = valueLabelW + 36px when target/reference labels sit on the right
gridTop = legendH + 4px
gridBottom = xAxisH
gridLeft = categoryLabelW
gridRight = rightGap
plotW = chartW - categoryLabelW - rightGap
plotH = chartH - gridTop - gridBottom
```

Evidence-mode placement:

- `basic-horizontal-bar`: one primary bar series; labels left, values right; all value labels visible only when `N <= 6`.
- `period-comparison-bar`: periods are ordered chronologically or by declared recency; do not sort by value unless requested.
- `target-reference-bar`: target line/tick shares the x-axis scale; target label uses the reserved right gap or tooltip.
- `category-change-sidebar-bar`: value label and change-rate label occupy a right-side evidence column; semantic color follows business direction.
- `time-series-horizontal-bar`: dates/months remain ordered; category labels may abbreviate but tooltip keeps full period.
- `grain-switch-horizontal-bar`: segmented control lives in the header right; `2-4` short options only, otherwise use dropdown.
- `dual-series-horizontal-bar`: legend consumes `20-24px`; comparison bars are muted, thinner, or outlined; primary value label stays closest to the row.
- `threshold-warning-bar`: threshold line and warning label stay weak but visible; warning color appears on labels/bands, not every bar.

Fit check:

```text
requiredHeaderW = titleTextW + controlW + 12px
requiredHeaderW <= CW
valueBandH >= valueGlyphH + comparisonH + 4px
chartBodyH >= 180px
plotH >= 140px
barRowH >= 22px
categoryLabelW + rightGap + 180px <= chartW
visibleBars <= 8
```

When the fit check fails, degrade in this order:

1. Collapse segmented control to a selected-value dropdown.
2. Abbreviate category labels and preserve full labels in tooltip.
3. Hide ordinary value labels, keeping only current/top/target-related labels.
4. Move target/reference/threshold labels into tooltip while keeping the line/band.
5. Reduce visible rows to Top 5 plus detail route.
6. Downgrade to `horizontal-grain-bar-switch` or a mini bar strip only if axes/value columns are intentionally hidden.
7. Split into a full bar chart card, target/actual bar card, table, or detail drawer before shrinking the primary value or rendering unreadable row bars.

### Axis-Scatter Diagnostic KPI Card

Use this algorithm when `kpiCardPattern` is `horizontal-axis-scatter-diagnostic`.

This is a KPI card, not a generic scatter block: the top value answers the current status or comparison, while the scatter body proves relationship, distribution, outlier, target fit, threshold, or quadrant evidence.

Minimum outer size:

```text
W >= 420px
H >= 300px
standard W = 460-560px
standard H = 320-360px
recommended pointCount = 12-80
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
legendH = 0-24px
xAxisH = 32-48px
footerH = 0-20px

chartBodyH = CH - headerH - valueBandH - compareInlineH - chartTopGap - footerH
chartBodyH >= 200px
plotH >= 160px
```

Scatter body geometry:

```text
chartX = P
chartY = P + headerH + valueBandH + compareInlineH + chartTopGap
chartW = CW
chartH = chartBodyH

yAxisW = clamp(40px, maxYAxisLabelWidth + 8px, 60px)
rightGap = 12-20px
rightGap = 48-72px when change-rate zone labels, quadrant labels, or target labels sit on the right
gridTop = legendH + 4px
gridBottom = xAxisH
gridLeft = yAxisW
gridRight = rightGap
plotW = chartW - gridLeft - gridRight
plotH = chartH - gridTop - gridBottom
```

Evidence-mode placement:

- `correlation-trendline-scatter`: trendline is weak/dashed, behind selected points, and named in tooltip or annotation.
- `mean-reference-scatter`: average/reference lines use weak dashed strokes and labels with reserved top/right gaps.
- `target-crosshair-scatter`: x/y target lines share axis scales; the target label can move to tooltip if it collides.
- `distribution-change-band-scatter`: side legend or background bands reserve `56-96px`; bands stay low opacity.
- `threshold-quadrant-scatter`: quadrant backgrounds are subtle, labels sit in corners, and points stay dominant.
- `dual-series-trendline-scatter`: legend consumes `20-24px`; baseline points are muted and primary points are stronger.
- `change-callout-scatter`: callout bubble is `120-180px` wide, max `2` lines, and must not cover the selected point.
- `category-quadrant-scatter`: visible categories `<=5`; selected/abnormal labels only.

Fit check:

```text
requiredHeaderW = titleTextW + controlW + 12px
requiredHeaderW <= CW
valueBandH >= valueGlyphH + comparisonH + 4px
chartBodyH >= 200px
plotH >= 160px
yAxisW + rightGap + 180px <= chartW
pointCount <= 80 for normal permanent display
permanentPointLabels <= 6
```

When the fit check fails, degrade in this order:

1. Collapse segmented control to a selected-value dropdown.
2. Hide ordinary point symbols' labels and keep only selected/outlier labels.
3. Move trendline/reference/target/quadrant labels into tooltip while keeping the line/band.
4. Remove optional metric strip, footer, and callout.
5. Reduce point count through Top/outlier selection, sampling, or aggregation.
6. Split into a full scatter chart block, table, or detail drawer before shrinking the scatter into a decorative dot field.

### Spatial-Map Diagnostic KPI Card

Use this algorithm when `kpiCardPattern` is `horizontal-spatial-map-diagnostic`.

This is a KPI card, not a generic map block: the top value answers the current geographic judgment, while the map body proves where the value, status, target gap, or change is concentrated.

Minimum outer size:

```text
W >= 460px
H >= 320px
standard W = 500-640px
standard H = 340-380px
```

Slot budget:

```text
P = clamp(16px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P

headerH = 32-44px
valueBandH = 56-78px
compareInlineH = 20-24px when comparison is not inline with value
mapTopGap = 8-12px
footerH = 0-20px

mapBodyAvailableH = CH - headerH - valueBandH - compareInlineH - mapTopGap - footerH
mapBodyAvailableH >= 220px
```

Map body geometry:

```text
mapBodyX = P
mapBodyY = P + headerH + valueBandH + compareInlineH + mapTopGap
mapBodyW = CW
mapBodyH = mapBodyAvailableH

legendW = 0 or clamp(72px, CW * 0.22, 140px)
legendGap = 12-16px
mapAreaW = CW - legendW - legendGap
mapViewportInset = clamp(8px, min(mapAreaW, mapBodyH) * 0.04, 20px)
mapViewportW = mapAreaW - 2 * mapViewportInset
mapViewportH = mapBodyH - 2 * mapViewportInset
min(mapViewportW, mapViewportH) >= 180px
```

Projection fit:

```text
scale = min(mapViewportW / geoBoundsWidth, mapViewportH / geoBoundsHeight)
offsetX = (mapViewportW - geoBoundsWidth * scale) / 2
offsetY = (mapViewportH - geoBoundsHeight * scale) / 2
```

Use a single `scale`. Do not stretch geography independently on X/Y.

Evidence-mode placement:

- `choropleth-heat-map` and `graded-choropleth-map`: visualMap uses `5-6` bins; no-data fill is neutral.
- `bubble-target-gap-map`: bubble radius uses sqrt mapping; side legend or tooltip explains size and target gap.
- `distribution-change-marker-map`: marker color follows change-rate semantics and side legend reserves status definitions.
- `column-symbol-map`: small columns anchor to region centroids; column height scale is capped and tooltip holds exact values.
- `annotated-interval-map`: permanent labels are only selected/key regions; interval bins sit in legend.
- `yoy-change-zone-map`: divergent scale names rise/fall/no-change bands and zero/neutral state.
- `point-category-summary-map`: side summary uses category counts; ordinary point labels hide.

Fit check:

```text
requiredHeaderW = titleTextW + controlW + 12px
requiredHeaderW <= CW
mapBodyH >= 220px
min(mapViewportW, mapViewportH) >= 180px
legendW == 0 or legendW >= 72px
map resource/projection declared
```

When the fit check fails, degrade in this order:

1. Collapse segmented control to compact dropdown.
2. Move footer/source metadata into tooltip or detail.
3. Collapse side legend into compact in-map legend if it does not cover key geography.
4. Hide ordinary labels and keep Top/selected/abnormal labels.
5. Switch to ranked bar/table or a full map block before rendering a tiny decorative basemap.
