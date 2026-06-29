# Component Content Area Template Map

Use this map before filling any `3 componentArea` slot. A slot is filled only when it names a readable `slotCoordinate` such as `2-2-1`, consumes a slot declared by `blockLayoutTemplateMap.slotCoordinateList`, names a registered `componentContentAreaTemplateId`, the standalone Vue file, the source template family, component slot size, visual-type size compatibility evidence, and data/props/state binding evidence.

## Copy Roots

| Framework template | Component content area directory |
| --- | --- |
| `topbar-light-scroll-dashboard-template` | `src/widgets/templates/component-content-areas/` |
| `left-nav-analytics-workbench-template` | `src/widgets/templates/component-content-areas/` |
| `frozen-title-sci-fi-cockpit-template` | `src/widgets/templates/component-content-areas/` |

All three bundled templates carry the same component content area sample files. Copy or mount from the selected framework template project first. If no row fits, create a new standalone Vue component under the same directory, register it, and add a `selfDevelopmentExceptionMap` entry with `type: componentContentAreaTemplate`.

## Registered Template Map

| Registered ID | Vue file | Visual type | Use when | Required binding evidence |
| --- | --- | --- | --- | --- |
| `kpi-metric-widget-content-area` | KPI metric content widget generated from KPI template slots | `metric-card` | Generic KPI value slot in KPI block layout examples. | Metric id, value field, unit, comparison field, null rule, title-strip decision. |
| `component-library:A` | `OperatingRevenueMetricContentAreaTemplate.vue` | `metric-card` | Revenue or primary operating KPI. | Metric id, value field, unit, comparison field, null rule. |
| `component-library:B` | `OperatingProfitMetricContentAreaTemplate.vue` | `metric-card` | Profit, margin, target, or value KPI. | Metric id, value field, unit, direction, comparison field. |
| `component-library:C` | `TargetAchievementContentAreaTemplate.vue` | `text-summary` | Data-driven goal achievement conclusion. | `conclusionRuleId`, target/current fields, threshold, fallback. |
| `component-library:D` | `RegionalRevenueRankingContentAreaTemplate.vue` | `ranking-list` | Top N ranking by region, business line, product, or owner. | Rank field, object label, value field, sort, click payload. |
| `component-library:E` | `RevenueProfitTrendContentAreaTemplate.vue` | `line` | Time trend for revenue, profit, score, or rate. | Time field, series fields, unit, `chartBodyH`, axis strategy. |
| `component-library:F` | `ChannelRevenueStructureContentAreaTemplate.vue` | `pie` | Composition/share by channel/category. | Dimension field, value/share fields, tiny-slice rule. |
| `component-library:G` | `CustomerValueScatterContentAreaTemplate.vue` | `scatter` | Relationship, quadrant, or object value distribution. | Point id/label, x/y fields, unit/range, tooltip fields. |
| `component-library:H` | `CostProfitHeatmapContentAreaTemplate.vue` | `heatmap` | Matrix heatmap for cost, profit, risk, or status. | X/Y dimensions, value field, color range, missing-cell rule. |
| `component-library:I` | `OperatingHealthRadarContentAreaTemplate.vue` | `radar` | Multi-dimensional health/profile score. | Dimension list, score fields, range, direction, tooltip. |
| `component-library:J` | `ExceptionWarningContentAreaTemplate.vue` | `text-summary` | Data-driven warning/risk conclusion. | `conclusionRuleId`, severity fields, evidence, action path. |
| `component-library:K` | `KeyActionListContentAreaTemplate.vue` | `operational-list` | Action, closure, task, or follow-up list. | Row id, owner, due/status, `rowHeightPx`, `visibleRowCount`, overflow route. |
| `component-library:L` | `OpportunityFunnelContentAreaTemplate.vue` | `funnel` | Ordered conversion/opportunity stage funnel. | Stage order, value, denominator, conversion/drop fields, tooltip. |
| `component-library:M` | `OperatingConclusionContentAreaTemplate.vue` | `text-summary` | Overall/generated business conclusion card. | `conclusionRuleId`, evidence fields, confidence/fallback, action/detail route. |
| `component-library:N` | `LaunchConversionWaterfallContentAreaTemplate.vue` | `bar` | Launch/conversion/waterfall-like stage comparison. | Stage field, value/change fields, unit, `chartBodyH`, axis/fallback strategy. |

## Slot Fill Output

Every `componentContentAreaTemplateMap` row must include:

| Field | Requirement |
| --- | --- |
| `slotCoordinate` | Readable `R-B-S` coordinate. Example: `2-2-1` means first component slot inside the second block of section 2. |
| `slotPatternCode` | Slot group from the parent block's `componentSlotPattern`, such as `A`, `B`, or `C`; must match the declared slot list. |
| `componentSlotSize` | Actual slot width/height derived from the selected block layout template. |
| `visualTypeSizeCompatibility` | Evidence from `src/report-template-assets/blueprint/widget-config-schemas.ts` that the selected visual type is legal for the slot size. |
| `componentContentAreaTemplateId` | One registered ID from this map, or a newly registered custom ID. |
| `standaloneVueFile` | File under the selected copied template project's `src/widgets/templates/component-content-areas/`. |
| `copySource` | Selected framework template family and original file path. |
| `copyTarget` | Copied/mounted project path. |
| `slotBinding` | Source page/block/slot coordinate, metric IDs, API/data object, fields, filters, and interaction payload. |
| `stateContract` | Loading, empty, error, no-permission, delayed-data, and fallback behavior. |

Text, prose, placeholder content, `visualType` alone, an inline widget without a registered ID, or a visual type without slot-size compatibility evidence does not fill a slot.
