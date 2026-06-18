# 12b5 Placement KPI Paired Comparison And Shared Rules

Load this file for Paired Comparison Diagnostic KPI Card placement and shared slot, wide-card, typography, comparison, target, and state rules.

### Paired Comparison Diagnostic KPI Card

Use this algorithm when `kpiCardPattern` is `paired-comparison-diagnostic`.

This card compares two states with the same metric definition. The central `VS` rail establishes comparison, while the bottom conclusion band states the decision.

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
paneTopGap = 8-12px
conclusionBandH = clamp(36px, H * 0.16, 52px)
paneAreaH = CH - headerH - paneTopGap - conclusionBandH - 12px

vsRailW = clamp(32px, W * 0.08, 44px)
paneGap = 12-16px
paneW = (CW - vsRailW - paneGap * 2) / 2
paneW >= 140px
paneAreaH >= 140px
```

Pane geometry:

```text
leftPaneX = P
rightPaneX = P + paneW + paneGap * 2 + vsRailW
paneY = P + headerH + paneTopGap
vsCenterX = P + paneW + paneGap + vsRailW / 2
conclusionY = H - P - conclusionBandH
```

Pane content:

- Pane label: `本月`, `去年同期`, `实际完成`, `目标值`, `本期`, `上期`, or equivalent.
- Primary pane value plus unit: same font scale and baseline on both sides.
- Optional mini evidence: bar strip, ring, progress, dot matrix, mini trend, or small breakdown rows.
- Delta/gap text sits in the winning/primary pane or bottom conclusion, not both unless one is detailed and one is summary.

Evidence-mode placement:

- `metric-yoy-vs`: values dominate; mini bars are optional and weak.
- `progress-mom-vs` and `target-gap-progress-vs`: progress tracks align on the same min/max scale.
- `improvement-dot-matrix-vs`: dot grids have the same row/column count and semantic color mapping.
- `trend-yoy-vs` and `trend-mom-vs`: mini lines share y-axis scale or explicitly state independent normalization in tooltip.
- `structure-breakdown-vs`: shared categories align row-by-row; do not compare different category sets as if equivalent.
- `percentage-ring-vs`: ring diameters, stroke widths, and center-value sizes match.

Fit check:

```text
requiredHeaderW = titleTextW + controlW + 12px
requiredHeaderW <= CW
paneW >= 140px
paneAreaH >= 140px
vsRailW >= 32px
conclusionBandH >= 36px
left/right units and metric definitions match
```

When the fit check fails, degrade in this order:

1. Collapse local control to compact dropdown.
2. Remove pane mini evidence and keep value + delta.
3. Move secondary baseline text to tooltip.
4. Stack panes vertically only when the parent allows `H >= 420px`.
5. Split into a full comparison chart/table before changing value definitions or squeezing panes.

### Slot Position Rules

Title:

```text
titleX = P
titleY = P
titleWidth = CW - helpIconWidth - helpGap
titleHeight = 20-28px
horizontalAlign = left
verticalAlign = center
```

Definition/help icon:

```text
iconSize = 14-16px
helpX = W - P - iconSize
helpY = P + (titleHeight - iconSize) / 2
```

Component-local filter:

```text
filterH = 24-28px
filterW = min(actualFilterWidth, CW * 0.45)
filterX = W - P - filterW
filterY = P
titleMaxW = CW - filterW - 8px
```

Rules:

- Metric cards allow at most one visible local filter group by default, and the group should normally have no more than three short options.
- Suitable filters include `今日 / 本周 / 本月`, `同比 / 环比`, `实际 / 目标 / 完成率`, or `金额 / 数量`.
- On small cards, collapse to a single capsule dropdown such as `本月 ▾`.
- The local filter must not change the visual center of the primary value: keep `centerX = P + CW / 2` for value, comparison, and target groups unless the card intentionally uses the wide split layout.
- If the title, help icon, and filter do not fit, keep title plus selected filter value; move help/definition to tooltip, drawer entry, or card metadata.

Value group:

```text
valueGroupWidth = valueTextWidth + unitGap + unitTextWidth
valueGroupX = centerX - valueGroupWidth / 2
valueSlotY = valueY
valueSlotH = valueHeight
valueGroupY = valueSlotY + (valueSlotH - valueGroupHeight) / 2
valueAnchorViewportCenterY = valueAnchorViewportY + valueAnchorViewportH / 2
centerDeltaY = abs(valueGroupCenterY - valueAnchorViewportCenterY)
unitGap = 4-6px
```

The value and unit are centered as one group. Do not center the number and then attach the unit far away.

Hard value-anchor rules:

- Default metric cards center the actual `value + unit` group in the declared value anchor viewport. `centerDeltaY <= 8px`; otherwise record `VIS-KPI-VALUE-OFFCENTER`.
- `valueSlotH >= valueAnchorViewportH * 0.40` for standard centered cards. Wide/split or pyramid cards may use a declared primary value zone, but the same center and glyph checks apply inside that zone.
- The primary numeral glyph height should normally be `22-28%` of the value anchor viewport for primary standard/enhanced cards. If `W >= 360px` and `H >= 180px`, allow `40-44px` main value text after width and height fit proof.
- Do not use value-row `align-items: baseline` as the vertical placement strategy. The value slot should use `place-items: center`, flex `align-items: center`, or equivalent. Apply baseline alignment only to the unit inside the centered value group.
- Title, help, status, target, source/freshness, and summary are auxiliary. If they push the value group off center or force a weak numeral, collapse/move those auxiliary items before shrinking or offsetting the primary value.

Unit:

```text
unitX = valueTextX + valueTextWidth + 4-6px
unitY = baseline-aligned with value, or 2-4px lower
unitFontSize = valueFontSize * 0.4-0.5
```

Comparison group:

```text
compareGroupWidth = yoyWidth + comparisonGap + momWidth
compareGroupX = centerX - compareGroupWidth / 2
compareGroupY = valueY + valueHeight + 8-10px
comparisonGap = 8-16px
```

Each comparison item uses:

```text
[label] [directionIcon] [signedValue]
labelIconGap = 4px
iconValueGap = 2-4px
```

Target group:

```text
targetGroupWidth = targetTextWidth + targetGap + attainmentTextWidth
targetGroupX = centerX - targetGroupWidth / 2
targetGroupY = compareY + compareHeight + 8-12px
targetGap = 8-16px
```

Progress bar:

```text
progressWidth = CW * 0.8-1.0
progressX = centerX - progressWidth / 2
progressY = targetTextBottom + 6-8px
progressHeight = 4-6px
progressFillWidth = min(attainmentRate, 100%) * progressWidth
```

Sparkline:

```text
sparkWidth = CW for standard/enhanced cards
sparkWidth = CW * 0.85 for narrow cards when needed
sparkX = centerX - sparkWidth / 2
sparkY = compareY + compareHeight + 8-12px
sparkHeight = clamp(28px, H * 0.22, 56px)
```

Summary:

```text
summaryX = P
summaryY = targetY + targetHeight + 6-8px
summaryWidth = CW
```

Alignment:

- Small cards hide summary.
- Standard cards may center a short summary.
- Enhanced cards may center or left-align summary based on business tone.
- Wide business-analysis cards prefer left-aligned summary.

Description and freshness:

```text
descX = P
descY = H - P - descriptionHeight
descWidth = CW
```

Description is left-aligned by default. Freshness metadata may align bottom-right when it is short and noncritical.

### Wide Metric Card Split

For `W >= 480px`, use a two-zone layout only when the right side has meaningful auxiliary information.

```text
leftWidth = CW * 0.45-0.55
columnGap = 16-24px
rightWidth = CW - leftWidth - columnGap
leftX = P
rightX = P + leftWidth + columnGap
leftCenterX = leftX + leftWidth / 2
```

Rules:

- Value group, comparison group, and primary target status center around `leftCenterX`.
- Sparkline, detailed target, and summary may sit in the right zone.
- Right-zone content can be left-aligned for readability.
- Do not center the primary value against the full card when the card is split; center it inside the left primary zone.

### Typography Fit

```text
valueFontSize = clamp(24px, W * 0.11, 36px) by default
valueFontSize may reach 40px only for wide or top-priority primary metric cards after fit proof
unitFontSize = valueFontSize * 0.4-0.5
```

Recommended values:

| Container width | Value font |
| ---: | ---: |
| `W < 200px` | `24px` |
| `200px <= W < 280px` | `28px` |
| `280px <= W < 360px` | `32px` |
| `360px <= W < 480px` | `36px` |
| `W >= 480px` | `36px`, or `40px` only for wide/top-priority primary metric cards |

Text rules:

- Metric title: `13-14px`, `18-22px` line-height.
- Value: `24-36px` by default, up to `40px` only for wide/top-priority primary metric cards, `1.1-1.2` line-height, tabular numerals.
- Unit: `12-16px`, `16-20px` line-height.
- Comparison label/value: `12-13px`, `16-18px` line-height.
- Target and attainment: `12-13px`, `16-18px` line-height.
- Summary: `12-13px`, `18-20px` line-height, usually one line.
- Description/freshness: `11-12px`, `16-18px` line-height.

Long value fallback:

1. Use approved display units such as `万`, `亿`, `K`, or `M`.
2. Reduce decimals based on metric precision rules.
3. Widen the card or move secondary content.
4. Use tooltip for exact raw value.

### Comparison And Target Semantics

- Show at least one of YoY or MoM when comparison data exists. If space is tight, keep the comparison most relevant to the business cadence, often MoM for short-term monitoring.
- Chinese report change-rate and variance-rate indicators use `%`.
- For Chinese report change-rate indicators, use positive-red-up and negative-green-down only when inherited company, finance, market, metric dictionary, or explicit company standard defines that convention.
- For cost, complaint, failure, return, overdue, risk, and other business-negative metrics, the value direction must follow the metric dictionary. Do not color by raw sign alone.
- Target describes attainment, target gap, or progress. Do not force it into up/down semantics unless the business defines target movement that way.

### State Geometry

| State | Metric card behavior |
| --- | --- |
| Loading | Skeleton preserves title, value, comparison, and target slots |
| Empty | Value shows `--`; hide invalid comparison and target calculations; keep the card height |
| Error | Show concise affected metric and retry path when available |
| No permission | Keep title and explain permission condition without leaking value |
| Target missing | Show `暂无目标` or hide target slot with a documented height fallback |
| YoY/MoM missing | Hide the missing comparison and recenter remaining comparison |
| Previous period is zero | Show comparison as `--` with tooltip explaining denominator is zero |
| Value is zero | Display `0` normally; do not treat zero as empty data |
| Stale data | Show freshness or delay metadata in the description/freshness slot |
