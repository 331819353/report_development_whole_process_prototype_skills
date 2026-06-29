# Component Content Area Templates

This directory contains standalone Vue component content area templates for `3 componentArea` slots only.

Hard rules:

- Select one registered component content area template for every `componentSlots[]` entry.
- Record `componentContentAreaTemplateId`, standalone Vue file, sample/source evidence, props/data/state contract, and data binding in `componentContentAreaTemplateMap`.
- Do not fill a slot with text, prose, placeholder copy, `visualType` alone, or an inline widget object.
- Title, pills, filters, controls, auxiliary metrics, units, summary, explanation, and description/help copy stay on the parent block layout template or shell/page config.
- A component content area template may expose only a removable `20px` top title strip plus body. Hide the strip for single-slot parent blocks with `showContentTitle: false`.
- If no existing template fits, create a new standalone Vue component content area template, register it, and add a `selfDevelopmentExceptionMap` entry with `type: componentContentAreaTemplate`.

## Selection Evidence Required

Every slot handoff must include:

| Field | Required value |
| --- | --- |
| `componentContentAreaTemplateId` | Registered template id such as `component-library:A`, or a registered custom id. |
| `standaloneVueFile` | File under `src/widgets/templates/component-content-areas/`. |
| `sampleEvidence` | One row from the table below, or the custom fallback registration proof. |
| `visualType` | Widget visual type used by validation. |
| `metricIds` | Metrics consumed by the component. |
| `dataBinding` | Dataset/API/provider id, grain, fields, filters, and states. |
| `propsStateContract` | Props, loading/empty/error/no-permission behavior, and title-strip decision. |

## Current Template Samples

| Registered ID | Template file | visualType | Use when | Required binding evidence |
| --- | --- | --- | --- | --- |
| `kpi-metric-widget-content-area` | KPI metric content widget template | `metric-card` | Generic KPI metric slot in KPI block layout examples. | Metric id, value field, unit, comparison field, null rule. |
| `component-library:A` | `OperatingRevenueMetricContentAreaTemplate.vue` | `metric-card` | Operating revenue or primary KPI value. | Metric id, value field, unit, comparison field, null rule. |
| `component-library:B` | `OperatingProfitMetricContentAreaTemplate.vue` | `metric-card` | Profit, margin, or value KPI. | Metric id, value field, unit, direction, comparison field. |
| `component-library:C` | `TargetAchievementContentAreaTemplate.vue` | `text-summary` | Data-driven target achievement conclusion. | `conclusionRuleId`, target/current fields, threshold, fallback. |
| `component-library:D` | `RegionalRevenueRankingContentAreaTemplate.vue` | `ranking-list` | Top N ranking by region, business line, product, or owner. | Rank field, object label, value field, sort, click payload. |
| `component-library:E` | `RevenueProfitTrendContentAreaTemplate.vue` | `line` | Time trend for revenue/profit/score/rate. | Time field, series fields, unit, `chartBodyH`, axis strategy. |
| `component-library:F` | `ChannelRevenueStructureContentAreaTemplate.vue` | `pie` | Composition/share by channel/category. | Dimension field, value/share fields, tiny-slice rule. |
| `component-library:G` | `CustomerValueScatterContentAreaTemplate.vue` | `scatter` | Relationship, quadrant, or customer/object value distribution. | Point id/label, x/y fields, unit/range, tooltip fields. |
| `component-library:H` | `CostProfitHeatmapContentAreaTemplate.vue` | `heatmap` | Matrix heatmap for cost/profit/risk/status. | X/Y dimensions, value field, color range, missing-cell rule. |
| `component-library:I` | `OperatingHealthRadarContentAreaTemplate.vue` | `radar` | Multi-dimensional health/profile score. | Dimension list, score fields, range, direction, tooltip. |
| `component-library:J` | `ExceptionWarningContentAreaTemplate.vue` | `text-summary` | Data-driven warning/risk conclusion. | `conclusionRuleId`, severity fields, evidence, action path. |
| `component-library:K` | `KeyActionListContentAreaTemplate.vue` | `operational-list` | Action, closure, task, or follow-up list. | Row id, owner, due/status, `rowHeightPx`, `visibleRowCount`, overflow route. |
| `component-library:L` | `OpportunityFunnelContentAreaTemplate.vue` | `funnel` | Ordered conversion/opportunity stage funnel. | Stage order, value, denominator, conversion/drop fields, tooltip. |
| `component-library:M` | `OperatingConclusionContentAreaTemplate.vue` | `text-summary` | Overall/generated business conclusion card. | `conclusionRuleId`, evidence fields, confidence/fallback, action/detail route. |
| `component-library:N` | `LaunchConversionWaterfallContentAreaTemplate.vue` | `bar` | Launch/conversion/waterfall-like stage comparison. | Stage field, value/change fields, unit, `chartBodyH`, axis/fallback strategy. |

Copy path: use this directory in the selected copied template project. The same sample files are also indexed in `report-prototype-template-management/references/component-content-area-template-map.md`.
