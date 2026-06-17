# Conversion Retention Analysis Card Standard

Use this standard when a report asks for `analysisPerspective: conversionRetention`, such as 看转化, 漏斗卡, 转化卡, 流失卡, 留存卡, 阶段转化卡, 用户转化, 渠道转化, 转化路径, 转化质量, or cohort retention.

This is an upper-level component-family standard. It does not invent a decorative card skin. It routes each card to existing controlled pattern fields such as `flowHierarchyDiagramCardPattern`, `kpiTimeSeriesCardPattern`, `kpiComparisonAnalysisCardPattern`, `basicChartCardPattern`, `compositionShareCardPattern`, `anomalyAnalysisCardPattern`, `tableCardPattern`, or the new `conversionRetentionCardPattern` wrapper when the card packages conversion/retention context, exact values, local scope, states, and fallback as one component.

The source screenshots are reusable inspiration only. Do not store raw image paths as durable knowledge. Preserve the value as text-only contracts that a non-multimodal downstream model can apply.

## 1. Scope And Source Of Truth

- Component family: Conversion Retention Analysis Cards / 转化留存分析卡片族.
- Primary mapping perspective: `analysisPerspective: conversionRetention`.
- Related perspectives: `flowTransfer`, `processBottleneck`, `trendMovement`, `comparisonDifference`, `compositionShare`, `rankingContribution`, `anomalyRisk`, `detailEvidence`, and `actionRecommendation`.
- Applicable report/page types: growth dashboards, product analytics, CRM conversion analysis, marketing funnel analysis, ecommerce order conversion, member retention, lifecycle operation, customer journey diagnostics, and stage conversion monitoring.
- Source hierarchy: company UI baseline -> report design system -> Modern SaaS BI Dashboard style contract -> this component-family standard -> project exceptions.
- Boundary: use `flowTransfer` when the primary question is source-to-target movement across many-to-many links. Use `processBottleneck` when the primary question is process status, node health, timing, queue, SLA, or bottleneck optimization. Use this conversion-retention standard when the primary question is stage conversion, total conversion, loss/drop-off, retention, cohort survival, or stage-to-stage quality.
- Libraries/renderers: ECharts for standard funnel, line, bar, heatmap, Sankey, pie/donut, and scatter evidence; Element Plus or project controls for local filters; project table or AntV S2 for exact audit.
- Supported viewports: ordinary card `420x260+`; funnel/trend/bar/overview cards `420x260+`; retention heatmap and path/Sankey cards `560x340+`; dense matrix/table cards `640x360+`; narrow cards use summary + drawer/fullscreen/table fallback.
- Owner/version/status: report-component-design-spec / v1.0 / stable for reusable guidance, implementation-ready only after local data and runtime proof.

## 2. Why These Designs Feel Strong And Non-AI

These card sets feel designed because their polish follows the decision job, not a generic AI/SaaS decoration recipe:

- Each card is an analytical sentence. Header names the question, the middle shows one dominant evidence body, and the bottom keeps `2-4` exact facts or action/detail hints.
- The visual form matches the conversion data shape. Funnel means ordered cohort shrinkage, horizontal bars mean stage comparison, line/area means time movement, heatmap means cohort retention, donut means reason/share, Sankey/path means branch transition, and table means exact audit.
- The card anatomy is stable across different forms. The viewer learns where title, local period, body, support facts, and exact-value route live, so variety feels intentional instead of random.
- Density is budgeted before styling. Labels are key-only, Top N and `其他` are explicit, long stages collapse, exact values move to tooltip/drawer/table, and dense cohorts move to heatmap or fullscreen.
- Color is semantic. Conversion/primary progress uses the primary hue; retention/success uses restrained green/teal; loss/risk uses restrained red/pink; baseline/comparison uses muted blue/gray; unknown/other/stale stays neutral.
- The product rhythm is believable. Small numbered badges, compact period selectors, segmented switches, muted captions, subtle dividers, and bottom KPI strips look like real operating UI rather than poster art.
- Exact values remain inspectable. Rates show denominators, stage values, drop values, comparison baselines, source/freshness, and tooltip/detail/export payloads.
- Messy business states are planned. Zero denominator, missing stage, stale period, unknown loss reason, cohort too small, unbalanced path, no-permission, filtered-empty, and dense data are visible states.
- The style is restrained. White cards, thin borders, small radius, light shadow, light chart grids, sparse labels, and no glow/glass/orb/3D icon treatment keep data above surface polish.

## 3. Style Generalization Coverage

| Sample role | Reusable meaning | Selected controlled patterns | Status | Adaptive variables | Fallback |
| --- | --- | --- | --- | --- | --- |
| 漏斗卡片组 | Ordered stage count, total conversion, comparison, trend, stage distribution, and exact channel table | `conversionRetentionCardPattern`, `flowHierarchyDiagramCardPattern: conversion-funnel-card`, KPI comparison/time-series, basic bar/table | covered-by-composed-patterns | stage count, entry/final values, total conversion, step conversion, drop value/rate, comparison period, channel dimension | horizontal bars, table/detail drawer, fullscreen funnel |
| 转化卡片组 | Overall conversion rate, stage rates, trend, channel/device/path/quality views | `conversionRetentionCardPattern`, `kpiTimeSeriesCardPattern`, `kpiComparisonAnalysisCardPattern`, `flowHierarchyDiagramCardPattern`, `compositionShareCardPattern` | covered-by-composed-patterns | conversion metric, stage pair, channel/device, path depth, quality target, period, segment | line/bar/table, path only when branch data exists |
| 流失卡片组 | Loss overview, loss trend, reason composition, user segment/profile, warning, and business impact | `conversionRetentionCardPattern`, `anomalyAnalysisCardPattern`, `compositionShareCardPattern`, `distributionAnalysisCardPattern`, KPI trend/comparison | covered-by-composed-patterns | loss rate/value, lost user count, reason dictionary, segment bucket, risk threshold, impact metric | reason table, alert list, detail drawer |
| 留存卡片组 | Retention overview, retention heatmap/curve, channel/segment compare, activity relation, target progress | `conversionRetentionCardPattern`, heatmap/line/bar/scatter, KPI goal/time-series/comparison, table | covered-by-composed-patterns | cohort date, retention day/window, retained count, base cohort, target, activity metric, segment | retention table, line card, target progress card |
| 阶段转化卡片组 | Step-by-step conversion, stage contrast, capability matrix, leakage waterfall, stage distribution, path flow | `conversionRetentionCardPattern`, `processAnalysisCardPattern` when process status is primary, `flowHierarchyDiagramCardPattern`, bar/line/waterfall/table | covered-by-composed-patterns | stage pair, stage order, conversion/loss formula, stage target, period compare, path depth | stage table, process card, Sankey/path only when transition links exist |

`textOnlyReproduction` is `true`: future components must be generated from this text standard, not from raw screenshots.

## 4. Controlled Pattern Field

Use `conversionRetentionCardPattern` when `analysisPerspective: conversionRetention` is primary and the card packages conversion/retention context, formulas, local scope, exact values, state coverage, and fallback. Keep `visualType` as the real renderer or evidence family.

```ts
type ConversionRetentionCardPattern =
  | 'conversion-overview-card'
  | 'standard-conversion-funnel-card'
  | 'stage-rate-matrix-card'
  | 'conversion-trend-card'
  | 'conversion-comparison-card'
  | 'conversion-channel-distribution-card'
  | 'conversion-path-card'
  | 'conversion-quality-overview-card'
  | 'loss-overview-card'
  | 'loss-reason-composition-card'
  | 'loss-segment-distribution-card'
  | 'loss-warning-card'
  | 'loss-impact-card'
  | 'retention-overview-card'
  | 'retention-cohort-heatmap-card'
  | 'retention-curve-card'
  | 'retention-segment-card'
  | 'retention-target-progress-card'
  | 'stage-conversion-overview-card'
  | 'stage-leakage-waterfall-card'
  | 'stage-conversion-path-card';
```

Pattern grouping:

| Group | Pattern values | Primary job |
| --- | --- | --- |
| Conversion overview | `conversion-overview-card`, `conversion-quality-overview-card` | Summarize total conversion, converted count, total entered population, and quality/goal context. |
| Stage conversion | `standard-conversion-funnel-card`, `stage-rate-matrix-card`, `stage-conversion-overview-card` | Show ordered stages, stage-to-stage rates, drop-off, and stage quality. |
| Trend and comparison | `conversion-trend-card`, `conversion-comparison-card`, `conversion-channel-distribution-card` | Compare conversion across time, period, channel, device, segment, or source. |
| Loss diagnosis | `loss-overview-card`, `loss-reason-composition-card`, `loss-segment-distribution-card`, `loss-warning-card`, `loss-impact-card` | Locate where loss happens, why, who is affected, and what business impact follows. |
| Retention | `retention-overview-card`, `retention-cohort-heatmap-card`, `retention-curve-card`, `retention-segment-card`, `retention-target-progress-card` | Read retention by cohort/window, compare segments, and track target achievement. |
| Stage path | `conversion-path-card`, `stage-leakage-waterfall-card`, `stage-conversion-path-card` | Explain branch paths, leakage accumulation, or transition flow when link data exists. |

## 5. Component Family Matrix

| Conversion card family | Business trigger | Primary pattern fields | Required evidence body | Minimum size | Use when |
| --- | --- | --- | --- | ---: | --- |
| `conversion-overview-card` | 当前整体转化/完成转化如何 | `conversionRetentionCardPattern`, KPI overview/judgment/comparison | Lead conversion KPI + compact funnel/bar/strip | `420x260` | The first question is total rate, converted count, entered population, and comparison. |
| `stage-conversion-card` | 每一步转化率/流失率是多少 | `standard-conversion-funnel-card`, `conversion-funnel-card`, stage matrix/bar | Funnel, horizontal stage bars, stage-rate table | `420x260`; dense `560x340` | There is ordered stage data and a shared cohort/entry rule. |
| `conversion-trend-card` | 转化率过去如何变化 | KPI time-series, basic line/area/combo | Line/area + key facts | `420x260` | Ordered time rows exist and movement is primary. |
| `conversion-comparison-card` | 渠道/设备/人群/周期转化谁高谁低 | KPI comparison, ranking, bar/table | Bars, paired compare, ranking table | `420x300` | Subjects share metric/unit/grain/filter scope. |
| `loss-diagnosis-card` | 哪里流失最多, 为什么流失 | loss patterns, anomaly/composition/distribution/ranking | Reason donut, segment bars, warning strip, impact facts | `420x300` | Loss reason, segment, threshold, or impact fields exist. |
| `retention-analysis-card` | 次日/7日/30日留存如何 | retention patterns, heatmap, line, goal progress | Cohort heatmap, retention curve, target ring/progress | `420x260`; heatmap `560x340` | Cohort base and retention window fields exist. |
| `stage-path-card` | 经过哪些路径转化/流失 | path/Sankey/funnel/waterfall | Path, Sankey, leakage waterfall | `560x340` | Transition links or accumulated loss fields exist. |
| `conversion-detail-evidence-card` | 需要核对具体用户/订单/渠道/阶段明细 | table/list patterns | Detail table/list/drawer | `420x300` | Exact row audit matters more than a chart. |

## 6. Component Purpose

Conversion Retention Analysis Cards answer one of these questions:

- `conversion-overview`: 整体转化率、转化人数、总进入量、目标/上期对比如何?
- `stage-conversion`: 每一步转化率多少, 哪一步流失最大?
- `conversion-trend`: 转化率随时间如何变化, 是否持续改善?
- `conversion-comparison`: 哪个渠道、设备、人群、来源、方案或周期转化更好?
- `loss-diagnosis`: 流失发生在哪一步, 主要原因是什么, 影响多大?
- `retention-analysis`: 次日/7日/30日留存如何, 哪个 cohort 或分群更稳定?
- `stage-path`: 用户/订单/线索经过哪些路径转化或流失?
- `conversion-detail-evidence`: 具体哪些对象、记录、阶段、原因或渠道构成证据?

Not suitable for unordered category comparison without stage/cohort semantics, decorative funnels with arbitrary descending numbers, retention heatmaps without cohort base, loss reason cards without reason dictionary or impact, or Sankey/path visuals without transition links.

## 7. Anatomy

Required slots:

1. Header: optional index badge, concise title, definition/help icon, and one local control group when needed.
2. Scope metadata: period, cohort rule, stage range, metric basis, segment/channel/device/source, retention window, or comparison baseline.
3. Primary evidence body: exactly one dominant visual or table/list body.
4. Evidence strip: `2-4` facts such as total conversion, entered count, converted count, biggest loss stage, retention users, target gap, top channel, top reason, or business impact.
5. Exact-value route: tooltip plus detail drawer, fullscreen, table fallback, export, or detail link.
6. State body: loading, empty, filtered-empty, error, no-permission, stale, zero-denominator, missing-stage, missing-cohort, too-dense, invalid-order, and partial data.

Forbidden slots: nested card piles, unrelated mini-chart collages, decorative funnels/ribbons/icons without fields, full-card gradient/glass/glow, duplicated global filters, and all-label funnels/heatmaps that hide readability.

## 8. Data Contract

Every conversion-retention card must declare:

```ts
type ConversionRetentionAnalysisCardContract = {
  analysisPerspective: 'conversionRetention';
  conversionRetentionTask:
    | 'conversion-overview'
    | 'stage-conversion'
    | 'conversion-trend'
    | 'conversion-comparison'
    | 'loss-diagnosis'
    | 'retention-analysis'
    | 'stage-path'
    | 'conversion-detail-evidence';
  conversionRetentionCardPattern: string;
  primaryPatternField: string;
  secondaryPatternFields?: string[];
  componentType: 'card' | 'chart' | 'table' | 'list' | 'custom';
  visualType: string;
  dataGrain: string;
  metricFields: string[];
  stageFields?: string[];
  cohortFields?: string[];
  retentionFields?: string[];
  lossFields?: string[];
  reasonFields?: string[];
  segmentFields?: string[];
  channelFields?: string[];
  pathFields?: string[];
  comparisonFields?: string[];
  numeratorField?: string;
  denominatorField?: string;
  denominatorRule: string;
  formulaRule: string;
  orderRule?: string;
  aggregationRule: string;
  densityLimit: string;
  labelRule: string;
  tooltipFields: string[];
  exactValueRoute: string;
  localControls?: string[];
  rendererOwner: 'echarts' | 'project-table' | 'antv-s2' | 'project-list' | 'data-driven-custom-diagram';
  fallback: string;
};
```

Required fields by task:

| Task | Required fields |
| --- | --- |
| `conversion-overview` | `entered_value`, `converted_value`, `conversion_rate`, `period`; optional `target_rate`, `baseline_rate`, `delta`, `converted_user_count`, `total_amount`. |
| `stage-conversion` | `stage_id`, `stage_name`, `stage_order`, `entry_value`, `stage_value`, `next_stage_value`, `step_conversion_rate`, `drop_value`, `drop_rate`, `period`, `cohort_rule`. |
| `conversion-trend` | `period`, `entered_value`, `converted_value`, `conversion_rate`; optional `target_rate`, `baseline_rate`, `max_rate`, `min_rate`, `event_marker`. |
| `conversion-comparison` | comparable subject id/name, `entered_value`, `converted_value`, `conversion_rate`, `period`, shared filter scope, optional rank/tie-break and baseline fields. |
| `loss-diagnosis` | `loss_stage_id` or `stage_id`, `lost_value`, `loss_rate`, `reason_id/name` when reason is visible, optional segment/profile fields, threshold/severity, impact metric. |
| `retention-analysis` | `cohort_id/date`, `base_value`, `retained_value`, `retention_day/window`, `retention_rate`, `period`; optional segment/channel/activity fields and target. |
| `stage-path` | Node rows: `node_id`, `node_name`, `stage_order`, `node_type`; link rows: `source_id`, `target_id`, `value`, `rate`, `period`; optional terminal status and loss flag. |
| `conversion-detail-evidence` | Primary key such as user/order/lead/session id, stage, timestamp, conversion/loss/retention status, channel/source, reason, and permission/export fields. |

Numeric display contract:

- Visible `%` values must declare whether source data is `0-1`, `0-100`, or preformatted. The component formatter owns display scale and precision.
- Conversion rate formula defaults to `converted_value / entered_value`; step conversion defaults to `next_stage_value / stage_value`; loss rate defaults to `drop_value / stage_value`; retention rate defaults to `retained_value / base_value`. Any exception must name the business rule.
- Zero denominator displays `--` with tooltip explaining denominator state. Do not coerce denominator-zero to `0%`.
- Raw values drive sorting, width, heatmap color, path width, tooltip, export, and exact-value audit. Do not derive logic from rounded labels.

## 9. Pattern Selection Rules

| User wording / data shape | Choose | Avoid |
| --- | --- | --- |
| "整体转化/总转化率" | `conversion-overview-card` | A full funnel when only two values exist. |
| "每一步转化/漏斗" with ordered stages and shared cohort | `standard-conversion-funnel-card` or `flowHierarchyDiagramCardPattern: conversion-funnel-card` | Funnel without cohort/denominator. |
| "阶段转化率对比/阶段能力" | `stage-rate-matrix-card`, horizontal bar, or table | Unordered pie/donut for ordered stages. |
| "转化趋势" with ordered periods | `conversion-trend-card` | Static KPI card when movement is the question. |
| "渠道/设备/人群转化" | `conversion-comparison-card` or `conversion-channel-distribution-card` | Sankey/path unless real transitions exist. |
| "流失原因/流失画像/流失预警" | `loss-reason-composition-card`, `loss-segment-distribution-card`, `loss-warning-card`, or anomaly card | Pretty red cards without threshold/reason/impact. |
| "留存热力/留存曲线" | `retention-cohort-heatmap-card` or `retention-curve-card` | Donut/pie for cohort x window data. |
| "阶段路径/转化路径/多分支" | `conversion-path-card`, `stage-conversion-path-card`, Sankey/path | Funnel if branches dominate and would hide transitions. |
| "需要核对明细" | table/list/detail drawer | Decorative chart that hides exact records. |

## 10. Placement And Fit

Use variables: `W`, `H`, `P`, `CW = W - 2P`, `CH = H - headerH - footerH - 2P`.

Default slot budgets:

- `headerH`: `40-52px`; title left, one local control group right.
- `evidenceBodyH`: at least `52%` of card height for funnel/path/Sankey, `45%` for line/bar/donut/cards, `55%` for heatmap/table matrix.
- `metricStripH`: `44-72px` when visible; support facts stay `2-4`.
- `footerH`: `32-44px`; detail/action/source only.
- Local controls: title-right capsule/dropdown by default; under-title row only when title still fits and body floor remains valid.

Minimum fit gates:

| Evidence type | Fit floor |
| --- | --- |
| Overview/KPI conversion card | card `>=420x260`, primary value/summary zone `>=96px`, evidence strip `2-4` facts. |
| Funnel | card `>=420x260`, `funnelAreaH >= CH * 0.52`, stages `3-6` preferred, `>10` folded/table fallback. |
| Stage bar/matrix | card `>=420x300`, visible stages `3-6` default and `<=8`, row height `>=22px`. |
| Trend line/area | card `>=420x260`, chart body `>=180px`, plot height `>=130px`. |
| Retention heatmap | card `>=560x340`, heatmap body `>=200px`, cell `>=12px`, windows `<=12` visible before scroll/detail. |
| Path/Sankey | card `>=560x340`, path/Sankey body `>=CH * 0.52`, nodes `<=20` path or links `<=80` Sankey before aggregation. |
| Donut/reason composition | card `>=420x300`, categories `2-6` preferred, `<=8` before merge. |
| Detail table/list | card `>=420x300`, visible rows `4-6`, table columns `5-8` default. |

Responsive fallback order:

1. Collapse secondary controls to dropdown.
2. Reduce evidence strip to `<=2` facts.
3. Hide ordinary labels; keep key stage/loss/retention labels and tooltip.
4. Aggregate Top N + `其他`, fold long stages, or reduce retention windows.
5. Move exact rows to drawer/table/fullscreen.
6. Split into a larger chart/table card.
7. Reject the visual and route to bar/table/list when required fields or size floors fail.

## 11. Visual And Interaction Rules

- Inherit white or near-white card surfaces, thin border, `6-8px` radius unless template differs, light shadow, compact typography, muted metadata, stable UI Kit controls, and no nested-card look.
- Use semantic conversion colors: conversion/current = primary/brand, retention/success = restrained green/teal, loss/risk = restrained red/pink, warning = restrained amber, comparison/baseline = muted blue/gray, unknown/other/stale = neutral gray.
- Highlight one key point by default: total conversion, worst loss stage, top channel, target gap, or selected cohort. Do not make every stage equally strong.
- Funnel widths, bar lengths, line values, heatmap colors, path widths, and donut angles must bind to named numeric fields.
- Permanent labels are sparse: stage labels, key values, selected cohort/window, worst loss, and top reasons. Exact values move to tooltip/detail.
- Hover highlights related stage/cohort/path/reason and dims unrelated marks without layout movement.
- Click pins stage/cohort/path/reason/segment and opens declared detail, drawer, fullscreen, or table.
- Local controls update only this card or declared local group; otherwise reclassify as global filter or perspective switch.
- Fullscreen is required when ordinary card density cannot preserve labels and geometry.

## 12. States

Required states: `loading`, `empty`, `filtered-empty`, `error`, `no-permission`, `stale`, `missing-stage`, `missing-cohort`, `missing-denominator`, `zero-denominator`, `invalid-stage-order`, `cohort-too-small`, `all-zero`, `too-dense`, and `partial-data`.

State rules:

- Loading skeleton preserves header, body, metric strip, and footer geometry.
- No-permission states must not leak restricted totals, user/order names, reason names, or chart silhouettes that reveal unauthorized detail.
- Missing stage order or cohort base must be surfaced as a data quality gap, not silently sorted by label.
- Zero denominator displays `--` and explanation; no fake `0%` conversion/retention.
- Too-dense states switch to aggregation, search, table, drawer, or fullscreen.

## 13. Anti-AI Gate

Reject or keep readiness `partial` when:

- `analysisPerspective: conversionRetention` is missing for a component that claims 看转化, 漏斗, 流失, 留存, or 阶段转化.
- The card is selected because it looks sophisticated rather than because the data has ordered stages, shared cohort, conversion/loss formula, retention window, or transition links.
- Stage order, cohort base, numerator/denominator, conversion formula, retention formula, or loss formula is missing.
- Funnel/path/heatmap/bar/line/donut color, width, area, or intensity is not tied to named fields.
- The card lacks density limit, label rule, tooltip payload, exact-value route, state set, or fallback.
- The design hides messy states such as zero denominator, missing stage, small cohort, unknown reason, stale data, no permission, or long-tail `其他`.
- Generic blue-purple glass polish, oversized glow, fake 3D icons, ornamental gradients, random rainbow stages, all-up/all-green data, or chart variety competes with conversion reading.
- A simpler table/ranking/bar would answer the question more clearly.

Use failure IDs:

- `RPT-CONVERSION-PERSPECTIVE-MISSING`
- `RPT-CONVERSION-COHORT-MISSING`
- `RPT-CONVERSION-FORMULA-MISSING`
- `RPT-RETENTION-WINDOW-MISSING`
- `RPT-LOSS-REASON-MISSING`
- `VIS-CONVERSION-DENSITY-UNBOUNDED`
- `VIS-CONVERSION-EVIDENCE-DECORATIVE`
- `VIS-CONVERSION-SQUEEZED`
- `VIS-CONVERSION-AI-POLISH`
- `VIS-CONVERSION-GEOMETRY-WARPED`

## 14. Rule Strength And Proof Matrix

| Rule | Strength | Proof method | Failure ID |
| --- | --- | --- | --- |
| Conversion cards declare `analysisPerspective: conversionRetention` and one `conversionRetentionTask`. | MUST/fail | Binding matrix or component config field | `RPT-CONVERSION-PERSPECTIVE-MISSING` |
| Selected pattern uses `conversionRetentionCardPattern` or a declared composed pattern field and real `visualType`. | MUST/fail | Config/schema review | `RPT-CONVERSION-FORMULA-MISSING` |
| Required stage/cohort/retention/loss/path fields for the selected task exist. | MUST/fail | Dataset/API/mock schema review | `RPT-CONVERSION-COHORT-MISSING` / `RPT-RETENTION-WINDOW-MISSING` |
| Numerator, denominator, formula, display scale, and denominator-zero behavior are declared. | MUST/fail | Metric contract and formatter review | `RPT-CONVERSION-FORMULA-MISSING` |
| Visual encodings bind to raw numeric fields, not display labels. | MUST/fail | Renderer option/data adapter review | `VIS-CONVERSION-EVIDENCE-DECORATIVE` |
| Density and label budgets are declared before styling. | MUST/fail | Source/config plus QA crop/DOM or chart option proof | `VIS-CONVERSION-DENSITY-UNBOUNDED` |
| Evidence body meets the selected fit floor. | MUST/fail | Slot budget, DOM geometry, screenshot/crop, ECharts/custom renderer proof | `VIS-CONVERSION-SQUEEZED` |
| Exact values are available through tooltip/detail/drawer/table/export. | MUST/fail | Interaction contract and payload review | `RPT-NO-ACTION` |
| Local controls are scoped to current card/local group. | MUST/fail | Control semantics model | `VIS-DUPLICATE-CONTROL` or `RPT-SHELL-DUPLICATE` |
| UI Kit look maps to semantic tokens and restrained chart treatment. | MUST/fail when claimed | Token and visual baseline review | `VIS-MODERN-BI-BASELINE-MISSING` / `VIS-CONVERSION-AI-POLISH` |
| Use Top N + `其他`, fold, drawer, or fullscreen for dense stages/reasons/cohorts. | SHOULD/exception-required | Aggregation/fallback route proof | `VIS-CONVERSION-DENSITY-UNBOUNDED` |
| Use trapezoid funnel only for few-stage storytelling; default report components use horizontal funnel/bars when scan precision matters. | SHOULD/exception-required | Pattern selection rationale | `VIS-CONVERSION-SQUEEZED` |

## 15. Acceptance Checklist

- `analysisPerspective: conversionRetention` is declared or the card explicitly routes to another perspective.
- `conversionRetentionTask` maps to a concrete business question in user language.
- `conversionRetentionCardPattern` is one of the controlled values when the card packages conversion/retention context; otherwise the composed pattern fields are declared.
- Required data fields, formula/denominator, source/freshness, period, cohort/stage/window, and numeric display contract are present.
- Stage order, cohort rule, retention window, loss reason dictionary, path transition schema, or comparison scope is explicit when visible.
- One primary evidence body owns the card; support facts stay `2-4`.
- Local filters are documented under `组件内筛选区 / 局部筛选区` and scoped correctly.
- Density limit, label rule, aggregation/collapse rule, and fallback are explicit.
- Tooltip/detail/exact-value route is present.
- Loading, empty, error, no-permission, stale, dense, invalid-order, missing-cohort, and zero-denominator states are defined.
- The design can be reproduced from this text standard without retaining the source screenshots.

## 16. Governance

- Allowed variants: conversion overview, stage conversion, conversion trend, conversion comparison, loss diagnosis, retention analysis, stage path, and detail evidence.
- Deprecated patterns: image-only conversion cards, decorative funnels, arbitrary decreasing categories, funnel without cohort/denominator, retention chart without cohort base/window, reason donut without reason dictionary, all-green sample data, nested card piles, generic glass/gradient conversion skins, and path/Sankey cards without transition links.
- Exception process: custom conversion diagrams must declare renderer ownership, data adapter, resize behavior, accessibility, fallback, and why ECharts/project standard charts cannot satisfy the task.
- Migration note: existing funnel/conversion/loss/retention/stage cards can adopt this standard incrementally by adding `analysisPerspective`, task, pattern, data contract, density/fallback rules, exact-value route, and state coverage before visual refactoring.
