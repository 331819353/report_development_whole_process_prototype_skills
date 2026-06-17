# 12b1 Placement KPI Base And Overview

Load this file for the base Metric Card Placement Algorithm, default vertical flow, landscape split, and KPI Overview Card placement.

## Metric Card Placement Algorithm

Use this for KPI cards, metric cards, target cards, comparison tiles, and mini-trend cards.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Metric title | Conditional | Top-left only for standalone KPI cards or when the surrounding block title does not already identify the metric |
| Definition/help entry | Optional | Top-right icon, opens tooltip/drawer |
| Component-local filter | Optional | Header-right capsule/dropdown, affects only this card |
| Value group | Yes | Metric value plus unit, centered as one group |
| Comparison group | Yes | YoY/MoM or one priority comparison, centered below value |
| Target group | Yes when target exists | Target value, attainment, target gap, or progress |
| Sparkline | Optional | Secondary trend, full content width or centered reduced width |
| Summary | Optional | Short judgment, centered or left-aligned by card type |
| Description/metadata | Optional | Bottom weak text, source, freshness, or data delay |

### Size Tiers

| Tier | Condition | Permanent content | Move or hide |
| --- | --- | --- | --- |
| Small | `W < 200px` or `H < 110px` | title, value group, one priority comparison | target, sparkline, summary, description |
| Standard | `200px <= W < 360px` and `120px <= H < 180px` | title, value group, YoY/MoM, target text | sparkline only when height allows; description in tooltip |
| Enhanced | `W >= 360px` and `H >= 180px` | title, value group, YoY/MoM, target, optional sparkline, short summary | long definition in tooltip/drawer |
| Wide | `W >= 480px` | left primary value zone plus right auxiliary zone | keep value centered within the left zone, not the full card |

Recommended card ranges:

| Type | Width | Height | Use |
| --- | ---: | ---: | --- |
| Small card | `160-220px` | `96-120px` | value plus one comparison |
| Standard card | `220-320px` | `120-160px` | value, comparison, target |
| Enhanced card | `320-480px` | `160-220px` | value, comparison, target, sparkline or summary |
| Wide card | `480px+` | `160-240px` | split primary and auxiliary information |
| Landscape KPI card | `420-560px` | `180-240px` | value, comparison/status, one auxiliary evidence visual |
| KPI overview card | `720-960px` | `220-320px` | one domain/topic, `2-5` metrics, comparison/target cells, and optional compact evidence |
| Single-indicator KPI grid card | `360-460px` | `220-320px` | one metric, one comparison, one mini evidence visual, target/progress footer |
| KPI judgment card | `360-460px` | `240-360px` | one status/health/rating/gauge judgment, one semantic hero visual, comparison strip, and footer evidence |
| KPI goal execution card | `360-520px` | `240-360px` | one target attainment/gap/progress/milestone execution judgment, one execution hero visual, comparison strip, and deadline/footer evidence |
| KPI time-series analysis card | `360-520px` | `240-360px` | one trend/change/YoY-MoM/cycle/volatility/forecast judgment, one time-series evidence zone, and footer baseline/stat/forecast evidence |
| KPI comparison analysis card | `360-560px` | `240-380px` | one direct/group/competitor/benchmark/variance comparison judgment, one comparison evidence zone, and footer rank/gap/benchmark evidence |
| Axis-scatter diagnostic KPI card | `420-560px` | `300-360px` | value, comparison/status, readable scatter evidence with axes/reference/quadrant body |
| Spatial-map diagnostic KPI card | `460-640px` | `320-380px` | value, comparison/status, geography evidence with projection-safe map body |
| Paired comparison diagnostic KPI card | `420-560px` | `260-340px` | two comparable panes, central VS rail, bottom conclusion |
| Compact KPI row | `360-420px` | `128-160px` | value, one comparison/status, compact icon/progress |
| Wide KPI banner | `560-760px` | `160-240px` | split primary value zone plus right/bottom evidence zone |

### Title Ownership

Metric title is a visible layout slot only when the KPI card is standalone, when the block/container has no visible title, or when multiple body metrics need distinct sub-labels.

```text
displayTitle = visible block/card title
metricName = semantic metric name for tooltip/export/definition
bodyMetricLabel = visible KPI body label/title
showBodyMetricLabel = explicit boolean override
```

Rules:

- If a surrounding block/container already renders `displayTitle`, and `normalized(displayTitle)` equals or is highly similar to `normalized(bodyMetricLabel)` or `normalized(metricName)`, set `showBodyMetricLabel = false` by default.
- `metricName` remains available in tooltip, export, drilldown payload, definition/help, or口径说明 even when the body label is hidden.
- Body labels in embedded KPI blocks are allowed only when they disambiguate multiple metrics in the same block, for example `满意度得分` vs `有效样本`, or when an explicit standalone-card mode is declared.
- A visible duplicate block title + KPI body label is `VIS-DUPLICATE-TITLE`, not a harmless style choice.

### Padding And Slot Heights

```text
P = clamp(12px, W * 0.05, 24px)
titleHeight = clamp(20px, H * 0.16, 28px)
valueHeight = clamp(36px, H * 0.35, 64px)
compareHeight = clamp(20px, H * 0.18, 32px)
targetHeight = clamp(22px, H * 0.18, 36px)
sparkHeight = clamp(28px, H * 0.22, 56px)
descriptionHeight = clamp(18px, H * 0.18, 40px)
valueAnchorViewportY = P + titleHeight
valueAnchorViewportH = H - P * 2 - titleHeight - visibleFooterOrMetadataH
```

Padding tiers:

| Container width | Padding |
| ---: | ---: |
| `W < 200px` | `12px` |
| `200px <= W < 320px` | `16px` |
| `320px <= W < 480px` | `20px` |
| `W >= 480px` | `24px` |

### Default Vertical Flow

```text
currentY = P

titleY = currentY
currentY += titleHeight

currentY += 8-12px
valueY = currentY
currentY += valueHeight

currentY += 8-10px
compareY = currentY
currentY += compareHeight

if sparkline is visible:
  currentY += 8-12px
  sparkY = currentY
  currentY += sparkHeight

currentY += 8-12px
targetY = currentY
currentY += targetHeight

if summary is visible:
  currentY += 6-8px
  summaryY = currentY
```

Before accepting the layout, compute:

```text
requiredContentHeight =
  P * 2
  + titleHeight
  + valueHeight
  + compareHeight
  + visibleSparkHeight
  + targetHeight
  + visibleSummaryOrDescriptionHeight
  + sum(verticalGaps)

requiredContentHeight <= H
```

If the budget fails, remove or move optional content in this order: description, summary, sparkline, second comparison, target progress bar. Do not shrink primary value text below readable size.

The fit proof must measure the actual rendered value group, not only the row allocation. A grid row such as `minmax(42px, 1fr)` is not sufficient if the numeral sits at the row's top edge.

### Landscape Metric Card Split

Use this algorithm when `kpiCardOrientation` is `landscape`, `compact-row`, or `wide-banner`, or when `kpiCardPattern` starts with `horizontal-`.

```text
headerH = clamp(28px, H * 0.18, 40px)
footerBandH =
  0 when no bottom evidence band exists
  clamp(44px, H * 0.26, 68px) when comparison strip, mini bars, or warning band exists

bodyY = P + headerH
bodyH = H - P - bodyY - footerBandH
primaryW = clamp(140px, CW * 0.46, 220px)
auxW = CW - primaryW - 16px
primaryX = P
auxX = P + primaryW + 16px
primaryCenterX = primaryX + primaryW / 2
```

Slot rules:

- Header owns title and one local control. It must not create a second filter row.
- Primary value, unit, and main comparison/status center inside the primary zone or left-align only when `alignmentIntent: scan-left` is declared.
- Auxiliary zone owns exactly one evidence visual: sparkline, ring, progress track, semantic icon, or mini bar group.
- Bottom evidence band owns previous/current/target cells, warning reason, prior-period value, or auxiliary mini bars. It cannot contain a second chart.
- If the auxiliary visual is a ring/progress/gauge-like shape, reserve a fit box of at least `108x96px` and preserve aspect ratio.
- If the auxiliary visual is a linear progress track, reserve at least `200x24px` for track plus marker and labels.
- If the auxiliary visual is a mini line/bar band, reserve `48-72px` height and use tooltip for exact values.
- If the pattern is `horizontal-axis-line-trend`, do not use this split auxiliary layout. Use the Axis-Line Diagnostic KPI algorithm below because the line body needs axes, grid, labels, and threshold/reference space.
- If the pattern is `horizontal-axis-bar-compare`, do not use this split auxiliary layout. Use the Axis-Bar Diagnostic KPI algorithm below because the bar body needs category labels, value labels, axes, target/threshold/reference space, and row-height budget.
- If the pattern is `horizontal-axis-scatter-diagnostic`, do not use this split auxiliary layout. Use the Axis-Scatter Diagnostic KPI algorithm below because the scatter body needs x/y axes, point-density, reference/trend/threshold/quadrant space, and tooltip targets.
- If the pattern is `horizontal-spatial-map-diagnostic`, do not use this split auxiliary layout. Use the Spatial-Map Diagnostic KPI algorithm below because the map body needs projection-safe fit, legend/visualMap, and key-label budget.
- If the pattern is `paired-comparison-diagnostic`, do not use this split auxiliary layout. Use the Paired Comparison Diagnostic KPI algorithm below because the two panes, `VS` rail, and conclusion band need mirrored geometry.

Landscape fit check:

```text
primaryW >= 140px
auxW >= 96px when auxiliary visual exists
bodyH >= 72px
footerBandH == 0 or footerBandH >= 44px
requiredHeaderW = titleTextW + localControlW + 12px
requiredHeaderW <= CW
```

When the fit check fails, degrade in this order:

1. Collapse segmented local control to compact dropdown.
2. Remove decorative icon or background illustration.
3. Move secondary comparison or prior-period value to tooltip.
4. Hide mini chart evidence before shrinking the primary value.
5. Switch to portrait `plain-metric`, a full chart block, or a detail drawer.

### KPI Overview Card

Use this algorithm when a wide metric card sets `kpiOverviewCardPattern`. This component is still a KPI/metric card, not a Micro Dashboard Card: it summarizes one domain or management topic with a bounded set of metrics and at most one compact evidence visual.

Minimum outer size:

```text
W >= 720px
H >= 220px
standard W = 760-960px
standard H = 240-320px
visibleMetricCount = 2-5
```

Shared slot budget:

```text
P = clamp(20px, W * 0.03, 28px)
CW = W - 2P
CH = H - 2P

headerH = 36-48px
bodyY = P + headerH
bodyH = CH - headerH
controlH = 28-36px
controlW = min(actualControlWidth, CW * 0.34, 320px)
overflowMenuW = 0 or 36px
titleMaxW = CW - controlW - overflowMenuW - 16px
```

Header geometry:

```text
indexW = 0 or 40-48px
titleX = P + indexW
titleY = P
titleH = headerH
controlX = W - P - overflowMenuW - controlW - (overflowMenuW > 0 ? 12px : 0)
controlY = P + (headerH - controlH) / 2
overflowMenuX = W - P - overflowMenuW
```

Variant geometry:

`lead-metric-comparison-sparkline-overview`:

```text
iconTileW = 0 or clamp(64px, H * 0.34, 92px)
iconTileX = P
iconTileY = bodyY + (bodyH - iconTileW) / 2

leadW = clamp(180px, CW * 0.28, 260px)
comparisonW = clamp(112px, CW * 0.16, 160px)
targetW = clamp(150px, CW * 0.20, 200px)
sparkW = clamp(120px, CW - iconTileW - leadW - comparisonW * 2 - targetW - 64px, 180px)
gap = 16-24px

leadX = P + iconTileW + (iconTileW > 0 ? gap : 0)
comparison1X = leadX + leadW + gap
comparison2X = comparison1X + comparisonW
targetX = comparison2X + comparisonW
sparkX = W - P - sparkW

metricCellY = bodyY + 20-28px
metricCellH = bodyH - 32px
sparkH = clamp(56px, bodyH * 0.42, 72px)
sparkY = bodyY + (bodyH - sparkH) / 2
```

`multi-metric-strip-progress-overview`:

```text
cellCount = visibleMetricCount
cellGap = 0
dividerW = 1px
cellW = (CW - dividerW * (cellCount - 1)) / cellCount
cellW >= 128px
cellY = bodyY + 12-20px
cellH = bodyH - 20px
progressTrackW = min(cellW - 24px, 180px)
progressTrackW >= 120px when progress is visible
```

`domain-metric-cluster-progress-overview`:

```text
iconTileW = 0 or clamp(64px, H * 0.34, 92px)
leadW = clamp(190px, CW * 0.28, 280px)
companionCount = 2-3
companionW = clamp(120px, (CW - iconTileW - leadW - 40px) / (companionCount + 1), 180px)
targetW = clamp(150px, companionW, 220px)
progressTrackW >= 120px when progress is visible
```

Slot rules:

- The header owns the domain title and one visible local control group. Overflow menu is allowed only for secondary actions.
- `overviewTopic` names the domain/topic; body metric labels name cells and may be visible because they disambiguate metrics.
- Lead overview cards use a stronger lead metric. Strip overview cards align all values equally and avoid one oversized value.
- Every metric cell declares a value+unit group, comparison/status row, and optional target/progress footer. Value baselines align across sibling cells.
- Sparkline, mini bars, or semantic icon is compact evidence. Do not render axes, legends, or permanent dense labels inside a KPI overview card.
- Progress tracks require target and attainment fields. If the target is missing, hide the track and show a target-missing state or detail route.
- Vertical dividers are decorative only after fit passes; remove them before reducing label readability.

Fit check:

```text
requiredHeaderW = indexW + titleTextW + controlW + overflowMenuW + 16px
requiredHeaderW <= CW
visibleMetricCount >= 2
visibleMetricCount <= 5
eachMetricCellW >= 128px
leadW >= 180px when a lead metric exists
comparisonW >= 112px when comparison cells exist
targetW >= 150px when a target/progress cell exists
sparkW == 0 or (sparkW >= 120px and sparkH >= 56px)
progressTrackW >= 120px when visible
evidenceVisualCount <= 1
```

When the fit check fails, degrade in this order:

1. Collapse segmented control to compact dropdown.
2. Hide optional overflow menu, definition icon, or decorative index.
3. Hide the domain icon tile.
4. Move secondary baseline helper text to tooltip while keeping comparison values.
5. Reduce visible metric cells to Top `3` by business priority and move the rest to drawer/detail.
6. Hide sparkline/mini evidence before shrinking values.
7. Split into separate KPI cards, a full chart/table block, or a Micro Dashboard Card before accepting a crowded overview.
