# Insight And KPI Placement Algorithms

This file was split from `12-internal-placement-algorithms.md`. Load it only when the matching component family is present.

## Analysis & Insight Component Placement Algorithm

Use this for conclusion cards, insight cards, anomaly/risk explanations, attribution summaries, recommendation cards, data-quality notes, definition cards, forecast notes, explanatory empty states, task cards, and chart annotations. These components are analysis surfaces, not decorative text blocks. They should turn data into judgment, reason, action, or trust context.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Type marker/status label | Yes | Top-left, weak label or slim status bar |
| Semantic icon | Optional | `14-18px`, aligned to title, never dominant |
| Title | Yes except summary bar | Top-left, names the subtype or question |
| Component-local filter | Optional | Header-right capsule/dropdown; current component only |
| Main conclusion | Yes | First readable body line, strongest text |
| Evidence | Required when data-backed | Metric, baseline, comparison, affected object, source, or reason |
| Recommended action/detail route | Required for recommendation/risk/task; optional elsewhere | Bottom-right or final line |
| Definition/confidence/freshness | Required for definition/data-quality/prediction; optional elsewhere | Bottom-left, tooltip, or drawer |
| Tooltip/detail payload | Required when anything is clamped | Hover/focus/click disclosure |

Implementation-ready components declare `analysisInsightContract` or equivalent metadata: subtype, insight family, conclusion, evidence, affected object, comparison/change value, reasons, recommended actions, confidence/definition/source/freshness, local filters, tooltip payload, detail route, and state rules.

### Size Tiers

| Tier | Width | Height | Permanent content | Move or hide |
| --- | ---: | ---: | --- | --- |
| Summary bar | `280-960px` | `36-56px` | one sentence, optional status | title, icon, secondary evidence |
| Small card | `220-360px` | `88-128px` | title, conclusion, one evidence line | action label, freshness, secondary reason |
| Standard card | `320-560px` | `120-180px` | title, conclusion, evidence, optional action | extra insights, long definition |
| Enhanced card | `480-720px` | `160-240px` | Top reasons/actions, confidence, detail route | long explanation to drawer |
| Side insight panel | `220-320px` | `240-480px` | `2-4` insight items | secondary action/source |
| Annotation bubble | `120-240px` | `40-96px` | short conclusion, optional value | title, long explanation |

### Padding And Line Budgets

```text
P = clamp(12px, W * 0.04, 24px)
headerH = 20-28px
conclusionLineH = 20-24px
bodyLineH = 18-20px
footerH = 0-32px
gapTitleBody = 8-12px
gapConclusionEvidence = 6-8px
gapBodyAction = 8-12px
```

Padding tiers:

| Container width | Padding |
| ---: | ---: |
| `W < 280px` | `12px` |
| `280px <= W < 480px` | `16px` |
| `480px <= W < 720px` | `20px` |
| `W >= 720px` | `24px` |

Height check:

```text
requiredContentHeight =
  P * 2
  + headerH
  + visibleConclusionLines * conclusionLineH
  + visibleEvidenceLines * bodyLineH
  + visibleActionOrFooterH
  + sum(visibleGaps)

requiredContentHeight <= H
```

If the budget fails, remove optional content in this order: decorative icon, secondary evidence, freshness/source line, long action label, extra insight items. Do not hide the main conclusion or status meaning without tooltip/drawer access.

### Slot Position Rules

Header:

```text
headerX = P
headerY = P
iconSize = 14-18px
typeMarkerW = measuredText + 12px
filterMaxW = min(CW * 0.45, 280px)

titleX = P + visibleIconW + iconGap
titleMaxW = CW - visibleIconW - iconGap - visibleFilterW - 12px
filterX = W - P - filterW
filterY = P + (headerH - filterH) / 2
```

Body:

```text
conclusionX = P
conclusionY = P + headerH + gapTitleBody
conclusionW = CW

evidenceY = conclusionY + conclusionH + gapConclusionEvidence
evidenceW = CW
```

Footer/action:

```text
footerY = H - P - footerH
actionX = W - P - actionW
actionY = footerY + (footerH - actionH) / 2
metaX = P
metaW = max(0, CW - actionW - 12px)
```

Rules:

- The conclusion owns the first body line. Evidence never appears above it.
- Values inside evidence can right-align only when the evidence is rendered as a compact list.
- Actions and detail links cannot overlap evidence text; they move to a final row or icon button before shrinking the conclusion.
- Source/freshness/confidence should be weak, but discoverable.

### Local Filter Rules

Analysis & Insight local filters are optional and usually inherit page/global, Composite Panel, or chart filters first. Add a component-local filter only for explanation mode switches such as:

- `全部 / 异常 / 建议`
- `本月 / 本季 / 本年`
- `实际 / 预测`
- `高 / 中 / 低风险`
- `原因 / 影响 / 建议`

```text
filterH = 24-28px
optionW = clamp(44px, textWidth + 24px, 96px)
filterMaxW = min(CW * 0.45, 280px)
```

When the capsule does not fit, collapse to a compact dropdown. The filter must not change global/page scope, metric口径, table schema, permission, pagination, export, or another component.

### Chart And Composite Placement

Chart-side insight:

```text
insightW = clamp(200px, W * 0.28, 320px)
mainChartW = W - insightW - gap
insightArea <= W * H * 0.25
```

Rules:

- Above-chart summary uses `36-56px` height and one sentence.
- Right-side insight panels use `2-4` items and do not exceed `25%` of a Composite Panel area unless the panel's declared purpose is explanation.
- Chart annotations use a bounded bubble and leader line:

```text
bubbleW = clamp(120px, textWidth + 32px, 240px)
bubbleH = clamp(40px, lineCount * 18px + 20px, 96px)
leaderLine = 12-48px
annotationCount <= 3
```

Annotations cannot cover axis labels, legends, selected marks, or the main anomaly point they explain.

### Responsive Degradation

| Condition | Behavior |
| --- | --- |
| `W < 280px` or `H < 96px` | Hide subtitle/evidence, hide or shrink icon, collapse action/filter, keep conclusion `1-2` lines |
| `280px <= W < 560px` and `H >= 120px` | Title, conclusion, one evidence line, weak status |
| `W >= 560px` and `H >= 160px` | Multi-insight list, Top3 reasons, action suggestions, confidence/source |
| `H < 120px` | No under-title filter row; use inline/collapsed control |
| Long explanation | Clamp to visible budget and disclose through tooltip/drawer |

### Subtype Fit Rules

- Conclusion card: `320-560px` wide, `96-144px` high, one generated conclusion plus one evidence line.
- Insight card: `2-4` insights by default, max `5`, item height `22-28px`.
- Anomaly/risk card: reserve object, metric, magnitude, and action; use weak warning tint or `3-4px` left bar, not full-card red.
- Attribution/impact card: Top `3` reasons by default, max `5`; contribution values align right.
- Target diagnosis card: current, target, and gap are mandatory; forecast text must be marked `预计`.
- Recommendation/task card: `1-3` actions; owner/deadline/status fit in footer or drawer.
- Definition/data-quality card: definition/source/freshness/confidence are mandatory; metric explanation cards additionally select `definitionHelpCardPattern` and keep formula/scope/denominator/source disclosure visible or in popover/drawer.
- State explanation card: reason, impact, and next step are mandatory; not only `暂无数据`.

### State Geometry

- Loading: skeleton header plus `1-3` text rows in the same slots.
- Generating: stable message row `分析生成中`.
- Insufficient data: preserve conclusion slot with `当前数据不足以生成结论`, then show missing reason/action.
- Empty/filter no-result: state message occupies conclusion slot and names the condition.
- Data delay: use data-quality tone, freshness field, and retry/detail action.
- Error/no-permission: show reason and next step without masking unrelated sibling components.


## Metric Card Placement Split Map

| Need | Read |
| --- | --- |
| Base metric-card flow, landscape split, KPI overview placement | `12b1-placement-kpi-base-overview.md` |
| KPI judgment/status, goal execution, and time-series placement | `12b2-placement-kpi-judgment-goal-timeseries.md` |
| KPI comparison analysis, single-indicator grid, and axis-line diagnostic placement | `12b3-placement-kpi-comparison-single-axis-line.md` |
| Axis-bar, axis-scatter, and spatial-map diagnostic KPI placement | `12b4-placement-kpi-axis-bar-scatter-map.md` |
| Paired comparison plus shared slot, wide-card, typography, and state rules | `12b5-placement-kpi-paired-and-shared-rules.md` |
