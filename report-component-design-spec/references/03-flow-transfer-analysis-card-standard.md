# Flow Transfer Analysis Card Standard

Use this standard when a report asks for `analysisPerspective: flowTransfer`, such as 看流转, 流向卡, 路径卡, 迁移卡, 流量分布卡, 来源去向, 转化流向, 用户流转, 资金流转, 数据迁移, or traffic/source distribution.

This is an upper-level component-family standard. It does not invent a new chart renderer. It routes each card to existing controlled pattern fields such as `flowHierarchyDiagramCardPattern`, `relationshipAnalysisCardPattern`, `compositionShareCardPattern`, `distributionAnalysisCardPattern`, `kpiTimeSeriesCardPattern`, `kpiComparisonAnalysisCardPattern`, `basicChartCardPattern`, or table/list patterns.

The source screenshots are reusable inspiration only. Do not store raw image paths as durable knowledge. Preserve the value as text-only contracts that a non-multimodal downstream model can apply.

## 1. Scope And Source Of Truth

- Component family: Flow Transfer Analysis Cards / 流转分析卡片族.
- Applicable report/page types: BI dashboards, operations dashboards, migration monitoring, customer/user journey analysis, traffic/channel analysis, fund/order/inventory flow analysis, data lineage or data migration report surfaces.
- Source hierarchy: company UI baseline -> report design system -> Modern SaaS BI Dashboard style contract -> this component-family standard -> project exceptions.
- Primary mapping perspective: `analysisPerspective: flowTransfer`.
- Related perspectives: `processBottleneck`, `conversionRetention`, `spatialDistribution`, `compositionShare`, `trendMovement`, `relationshipInfluence`, `detailEvidence`.
- Boundary: use `references/04-process-bottleneck-analysis-card-standard.md` when the primary question is 看流程/步骤/节点/瓶颈, current stage, stage status, process duration, queue, timeout, rework, or optimization priority. Use this flow-transfer standard when the primary question is source-to-target movement, path branch, migration, or traffic distribution.
- Libraries/renderers: ECharts for standard charts and flow diagrams; Element Plus or project UI controls for local filters; project table or AntV S2 for exact audit tables.
- Supported viewports: ordinary card `420x260+`; flow/path/Sankey card `560x340+`; large composite flow card `720x420+`; mobile or narrow cards use summary + drawer/fullscreen/table fallback.
- Owner/version/status: report-component-design-spec / v1.0 / stable for reusable guidance, implementation-ready only after local data and runtime proof.

## 2. Why These Designs Work

These card sets feel designed, and not AI-like, because the polish follows the analysis job:

- One card answers one flow question. A card says where value came from, where it went, which path converted, which migration failed, or which channel/device/region contributed. It is not a collage of unrelated chart variety.
- The visual grammar matches the data shape. Sankey means `source-target-value`, path means ordered movement, funnel means shared-cohort stage conversion, map means geography, donut/percent bars mean composition, line/area means time movement, and table/list means exact audit.
- The card anatomy is stable. Title and local scope sit in the header, one primary evidence body owns the middle, support facts stay bounded, and the bottom carries detail/action/source rather than decoration.
- The surface language is restrained. White cards, thin borders, small radius, light shadow, muted canvas, compact UI Kit controls, and sparse labels let the data read first.
- Exact values remain inspectable. Permanent labels are key-only, while tooltip, drawer, fullscreen, table fallback, export, or detail link exposes source, target, path, value, share, rate, period, source, and aggregation rules.
- Density is budgeted before styling. Top N + `其他`, aggregation, collapse, label sampling, zoom/pan, detail drawer, table fallback, and fullscreen are part of the component contract.
- Color is semantic. Source group, target state, channel, path status, success/loss, positive/negative change, or geography bucket owns color. Random rainbow ribbons, glass gradients, and decorative glow are rejected.
- Controls look like real product controls. Perspective switches, period switches, metric selectors, and Top N/depth selectors use segmented controls or compact dropdowns with declared local scope.
- Imperfect data states are planned. Missing source, unknown target, unbalanced flow, no path, zero conversion, dense links, all-zero distribution, no-permission, stale data, and partial migration are visible states, not hidden cleanup.

## 3. Style Generalization Coverage

| Sample role | Reusable meaning | Selected controlled patterns | Status | Adaptive variables | Fallback |
| --- | --- | --- | --- | --- | --- |
| Flow direction card set | Basic flow, stepped flow, ring flow, comparison flow, hierarchy flow, metric+flow, trend+flow, configurable flow | `flowHierarchyDiagramCardPattern`: `multi-stage-sankey-card`, `path-conversion-flow-card`, `conversion-funnel-card`; `relationshipAnalysisCardPattern`: `relation-flow-sankey-card`; `kpiTimeSeriesCardPattern`; table/detail fallback | covered-by-composed-patterns | flow layers, node/link count, stage count, metric basis, comparison period, local controls, evidence strip | table/detail drawer/fullscreen when flow density fails |
| Migration card set | Migration total, progress, trend, source-target, task list, type distribution, performance monitor, cost analysis | KPI overview/goal/time-series/comparison patterns, `compositionShareCardPattern`, basic chart cards, detail table/list patterns | covered-by-composed-patterns | task status, data volume unit, progress denominator, migration type, cost unit, period, status chips | task table, progress list, line chart, detail drawer |
| Path card set | Conversion path overview, path exploration, path loss, multi-path comparison, path trend, path distribution, user segment path, custom path | `flowHierarchyDiagramCardPattern`: `path-conversion-flow-card`, `conversion-funnel-card`, `journey-stage-map-card`; `relationshipAnalysisCardPattern`: `relation-trend-card`; `compositionShareCardPattern` | covered-by-composed-patterns | start/end, path depth, Top paths, terminal status, segment, stage order, conversion/drop formulas | funnel for simple cohort, Sankey for many-to-many, table for audit |
| Traffic distribution card set | Channel/region/device/source/time distribution and comparison | `compositionShareCardPattern`, `distributionAnalysisCardPattern`, `basicChartCardPattern`, map/geographic chart, `multi-stage-sankey-card` for source routing | covered-by-composed-patterns | denominator, category Top N, geography grain, device/channel/source, time grain, comparison baseline | bar/table when geography/flow data is absent |

`textOnlyReproduction` is `true`: future components must be generated from this text standard, not from raw screenshots.

## 4. Component Family Matrix

| Flow card family | Business trigger | Primary pattern fields | Required evidence body | Minimum size | Use when |
| --- | --- | --- | --- | ---: | --- |
| `flow-transfer-overview-card` | Overall inflow/outflow/retention/net flow status | KPI overview, KPI comparison, basic bar/progress | KPI strip + compact percent/progress/summary body | `420x260` | The first question is current flow scale and net result. |
| `source-target-sankey-card` | Where value/user/order/fund/data came from and went | `flowHierarchyDiagramCardPattern: multi-stage-sankey-card`; optional `relationshipAnalysisCardPattern: relation-flow-sankey-card` | Sankey node/link body | `560x340` | There are directed source-target-value links and 2-5 layers. |
| `path-conversion-card` | Which ordered path converts, drops, or ends | `flowHierarchyDiagramCardPattern: path-conversion-flow-card` or `conversion-funnel-card` | Path or horizontal funnel body | `560x340` | The data has ordered steps, start/end, branch ratios, or terminal states. |
| `migration-progress-card` | Data/system/application migration progress and task state | KPI goal/time-series/comparison, detail table/list | Progress ring/bar, task table/list, trend | `420x260` | Migration has total/completed/failed/in-progress volume or tasks. |
| `flow-distribution-card` | Flow share by channel, device, region, source, type, or segment | `compositionShareCardPattern`, `distributionAnalysisCardPattern`, map/basic chart | Donut, percent bar, map, grouped bar, heatmap, table | `420x300` | The question is part-to-whole or distribution, not directed flow. |
| `flow-comparison-card` | This period vs previous period or path A vs path B | `kpiComparisonAnalysisCardPattern`, paired comparison, line/bar | Paired panels, grouped bars, comparison flow body | `420x260` | Subjects share metric/unit/grain/filter scope. |
| `flow-trend-card` | How flow, conversion, or migration changes over time | `kpiTimeSeriesCardPattern`, basic line/area/combo | Line/area + key facts | `420x260` | Ordered time rows exist and movement is primary. |
| `configurable-flow-card` | User configures source, target, metric, time, or path depth | Composed flow pattern + local controls | One flow body + configuration controls | `560x340` | Controls are truly component-local and do not change page schema. |

## 5. Component Purpose

Flow Transfer Analysis Cards answer one of these questions:

- `source-target`: 数据/用户/资金/订单从哪里来, 到哪里去?
- `stage-conversion`: 经过哪些阶段, 哪一步流失或转化?
- `path-branch`: 哪条路径最常见, 哪条路径最有效?
- `migration-progress`: 迁移完成了多少, 哪里失败或积压?
- `traffic-distribution`: 访问/流量/对象分布在哪些渠道、地域、设备、来源或时间段?
- `source-target-compare`: 本期与上期、路径 A 与路径 B、来源 A 与来源 B 有什么不同?
- `flow-configuration`: 用户按来源、去向、指标、时间、层级自定义查看一个流转问题.

Not suitable for simple unordered comparison, decorative relationship networks, exact-row audit as the primary task, or pretty path/ribbon visuals without directed links, ordered stages, shared cohort, migration tasks, distribution denominator, or geography.

## 6. Anatomy

Required slots:

1. Header: number/index badge optional, title, definition/help icon, and one local control group when needed.
2. Scope metadata: period, metric basis, source/target scope, cohort rule, migration scope, or geography level.
3. Primary evidence body: exactly one dominant visual or table/list body.
4. Evidence strip: `2-4` facts such as total flow, inflow, outflow, net flow, conversion rate, loss rate, completed tasks, failed tasks, top source, top target, peak period, or cost.
5. Exact-value path: tooltip plus detail drawer, fullscreen, table fallback, export, or detail link.
6. State body: loading, empty, filtered-empty, error, no-permission, stale, dense, invalid topology, and partial data.

Forbidden slots: nested card piles, unrelated mini chart collages, decorative icons/gradients/glass/glow, duplicated global filters, or permanent labels for every node/link/path/category beyond the density budget.

## 7. Data Contract

Every flow-transfer card must declare:

```ts
type FlowTransferAnalysisCardContract = {
  analysisPerspective: 'flowTransfer';
  flowTransferTask:
    | 'source-target'
    | 'stage-conversion'
    | 'path-branch'
    | 'migration-progress'
    | 'traffic-distribution'
    | 'source-target-compare'
    | 'flow-configuration';
  primaryPatternField: string;
  secondaryPatternFields?: string[];
  componentType: 'card' | 'chart' | 'table' | 'list';
  visualType: string;
  dataGrain: string;
  metricFields: string[];
  unit: string;
  periodField?: string;
  sourceFields?: string[];
  targetFields?: string[];
  nodeFields?: string[];
  linkFields?: string[];
  stageFields?: string[];
  pathFields?: string[];
  distributionFields?: string[];
  taskFields?: string[];
  comparisonFields?: string[];
  denominatorRule?: string;
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

Required data by task:

| Task | Required fields |
| --- | --- |
| `source-target` | Node rows: `node_id`, `node_name`, `layer`, `node_type`; link rows: `source_id`, `target_id`, `value`, `unit`, `period`; optional `source_share`, `target_share`, `status`, `loss_flag`. |
| `stage-conversion` | `stage_id`, `stage_name`, `stage_order`, `value`, `entry_value`, `unit`, `period`; formulas for entry share, step conversion, drop value/rate, total conversion. |
| `path-branch` | Node rows with `stage_order` or `layer`; link rows with `source_id`, `target_id`, `value`, `rate`, `unit`, `period`; `start_node`, `end_node`, `terminal_status`, Top N rule. |
| `migration-progress` | `task_id`, `task_name`, `status`, `total_value`, `completed_value`, `failed_value`, `in_progress_value`, `speed`, `duration`, `source_system`, `target_system`, `period` or update time. |
| `traffic-distribution` | `category_id`, `category_name`, `value`, `total_value`, `share`, `unit`, `period`, optional geography/device/channel/source fields, denominator policy, Top N + `其他`. |
| `source-target-compare` | Comparable subject fields, shared metric/unit/grain/filter scope, baseline/current period, delta/gap fields, optional left/right node/link sets for comparison flow. |
| `flow-configuration` | All selected source/target/metric/time/depth fields plus control metadata and validation for default and changed-control states. |

Numeric display contract:

- Visible `%` values must declare whether source data is `0-1`, `0-100`, or preformatted. The component formatter owns display scale and precision.
- Flow values use raw numeric fields for width, sort, filter, export, and tooltip. Do not derive logic from rounded labels.
- Negative values are invalid for flow width, path width, funnel width, pie angle, treemap area, and Sankey links. Route signed movement to waterfall, variance, or table with explicit sign semantics.

## 8. Placement And Fit

Use variables: `W`, `H`, `P`, `CW = W - 2P`, `CH = H - headerH - footerH - 2P`.

Default slot budgets:

- `headerH`: `40-52px`; title left, one control group right.
- `metricStripH`: `44-72px` when visible; support facts stay `2-4`.
- `evidenceBodyH`: at least `52%` of card height for path/funnel, `55%` for Sankey/map/tree/treemap/sunburst, `45%` for ordinary line/bar/donut cards.
- `footerH`: `32-44px`; detail/action/source only.
- Local controls: title-right capsule/dropdown by default; under-title row only when title still fits and body floor remains valid.

Minimum fit gates:

| Evidence type | Fit floor |
| --- | --- |
| Sankey | card `>=560x340`, `sankeyAreaH >= CH * 0.55`, layers `3-4` default, visible nodes `<=35`, links `<=80`. |
| Path | card `>=560x340`, `pathAreaH >= CH * 0.52`, main nodes `<=8` for full labels, links `<=20` before key-only labels. |
| Funnel | card `>=420x260`, `funnelAreaH >= CH * 0.52`, stages `3-6` preferred, `>10` folded/table fallback. |
| Distribution donut/percent bar | card `>=420x300`, categories `2-6` preferred, `<=8` before merge, center/legend budget declared. |
| Map/geographic flow | card `>=460x320`, map body `>=220px`, shorter side `>=180px`, projection/aspect preserved. |
| Trend | card `>=420x260`, chart body `>=180px`, plot height `>=130px` for axis line. |
| Detail table/list | card `>=420x300`, visible rows `4-6`, columns `5-8` for tables. |

Responsive fallback order:

1. Collapse secondary controls to dropdown.
2. Reduce evidence strip to `<=2` facts.
3. Hide ordinary labels; keep key labels and tooltip.
4. Aggregate Top N + `其他` or collapse path depth.
5. Move exact rows to drawer/table/fullscreen.
6. Split into a larger chart/table card.
7. Reject the visual and route to bar/table/list when required fields or size floors fail.

## 9. Visual And Interaction Rules

- Inherit white or near-white card surfaces, thin border, `6-8px` radius unless template differs, light shadow, compact typography, muted metadata, stable UI Kit controls, and no nested-card look.
- Use semantic color: primary flow = brand/primary hue; retention/success = restrained green/teal; loss/failure/risk = restrained red or warning; unknown/other/stale = neutral gray; comparison baseline = muted blue/gray.
- Flow width, path width, bar width, ring angle, area, and map color must bind to named numeric fields.
- Ribbons stay translucent and readable; avoid high-saturation full-opacity ribbons that overpower labels.
- Shape-sensitive visuals preserve aspect ratio: rings stay circular, maps do not stretch, paths do not warp, nodes and arrows keep relative spacing.
- Hover highlights related source/target/path/category and dims unrelated marks without layout movement.
- Click pins node/link/path/category and opens declared detail, drawer, fullscreen, or table.
- Local controls update only this card or declared local group; otherwise reclassify as global filter or perspective switch.
- Fullscreen is required when ordinary card density cannot preserve labels and geometry.

## 10. States

Required states: `loading`, `empty`, `filtered-empty`, `error`, `no-permission`, `stale`, `missing-source`, `missing-target`, `unbalanced-flow`, `invalid-topology`, and `too-dense`.

State rules:

- Loading skeleton preserves header, body, and footer geometry.
- No-permission states must not leak restricted totals, row names, or chart silhouettes.
- Missing source/target is normalized to unknown or surfaced as a data gap.
- Unbalanced flow exposes loss, unknown, or other instead of making value disappear.
- Too-dense states switch to aggregation, search, table, drawer, or fullscreen.

## 11. Anti-AI Gate

Reject or keep readiness `partial` when:

- `analysisPerspective: flowTransfer` is missing for a component that claims 看流转.
- The card is selected because it looks sophisticated rather than because the data has directed links, ordered stages, path transitions, migration tasks, distribution denominator, or geography.
- Flow/path/ribbon/area/color is not tied to named fields.
- Required source-target, stage, path, migration, distribution, or comparison fields are missing.
- The card has no density limit, label rule, tooltip payload, exact-value route, or fallback.
- The card uses generic blue-purple glass polish, oversized glow, decorative gradients, nested cards, ornamental icons, or abstract AI imagery.
- It hides messy states such as unknown source, failed migration, missing target, zero conversion, all-zero distribution, long-tail other, stale data, or no permission.
- A simpler chart/table/list would answer the question more clearly.

Use failure IDs:

- `RPT-FLOW-PERSPECTIVE-MISSING`
- `RPT-FLOW-DATA-MISSING`
- `RPT-FLOW-METHOD-MISSING`
- `VIS-FLOW-DENSITY-UNBOUNDED`
- `VIS-FLOW-EVIDENCE-DECORATIVE`
- `VIS-FLOW-SQUEEZED`
- `VIS-FLOW-AI-POLISH`
- `VIS-FLOW-GEOMETRY-WARPED`

## 12. Rule Strength And Proof Matrix

| Rule | Strength | Proof method | Failure ID |
| --- | --- | --- | --- |
| Flow cards declare `analysisPerspective: flowTransfer` and one `flowTransferTask`. | MUST/fail | Binding matrix or component config field | `RPT-FLOW-PERSPECTIVE-MISSING` |
| Selected pattern routes to existing controlled pattern fields and real `visualType`. | MUST/fail | Config/schema review | `RPT-FLOW-METHOD-MISSING` |
| Required data fields for the selected task exist. | MUST/fail | Dataset/API/mock schema review | `RPT-FLOW-DATA-MISSING` |
| Flow/path/area/color encodings bind to raw numeric fields, not display labels. | MUST/fail | Renderer option/data adapter review | `VIS-FLOW-EVIDENCE-DECORATIVE` |
| Density and label budgets are declared before styling. | MUST/fail | Source/config plus QA crop/DOM or chart option proof | `VIS-FLOW-DENSITY-UNBOUNDED` |
| Evidence body meets the selected chart/table/list fit floor. | MUST/fail | Slot budget, DOM geometry, screenshot/crop, ECharts option proof | `VIS-FLOW-SQUEEZED` |
| Exact values are available through tooltip/detail/drawer/table/export. | MUST/fail | Interaction contract and tooltip/detail payload review | `RPT-NO-ACTION` |
| Local controls are scoped to current card/local group. | MUST/fail | Control semantics model | `VIS-DUPLICATE-CONTROL` or `RPT-SHELL-DUPLICATE` |
| Modern SaaS BI look maps to semantic tokens and restrained chart treatment. | MUST/fail when claimed | Token and visual baseline review | `VIS-MODERN-BI-BASELINE-MISSING` / `VIS-FLOW-AI-POLISH` |
| Use Top N + `其他` for long-tail flow/distribution. | SHOULD/exception-required | Aggregation rule; exception when full audit table is primary | `VIS-FLOW-DENSITY-UNBOUNDED` |
| Use fullscreen/drawer when ordinary card density fails. | SHOULD/exception-required | Fallback route proof | `VIS-FLOW-SQUEEZED` |
| Add decorative icons only when they identify source/target/task type. | MAY/optional | Icon semantic label/accessibility review | `VIS-FLOW-AI-POLISH` |

## 13. Acceptance Checklist

- `analysisPerspective: flowTransfer` is declared or the card explicitly routes to another perspective.
- `flowTransferTask` is declared and maps to a business question in user language.
- The selected card uses existing controlled pattern fields and keeps the real renderer family in `visualType`.
- Required data fields, formula/denominator, source/freshness, period, and numeric display contract are present.
- One primary evidence body owns the card; support facts stay `2-4`.
- Local filters are documented under `组件内筛选区 / 局部筛选区` and scoped correctly.
- Density limit, label rule, aggregation/Top N rule, and fallback are explicit.
- Tooltip/detail/exact-value route is present.
- Loading, empty, error, no-permission, stale, dense, and invalid-data states are defined.
- The design can be reproduced from this text standard without retaining the source screenshots.

## 14. Governance

- Allowed variants: overview, Sankey, path, funnel, migration progress, distribution/share, comparison, trend, configurable flow.
- Deprecated patterns: static decorative ribbons, image-only flow screenshots, all-link hairball Sankey, multi-chart collage cards, nested-card flow summaries, controls that silently change page scope.
- Exception process: any custom diagram must declare renderer ownership, data adapter, resize behavior, accessibility, fallback, and why ECharts/project standard charts cannot satisfy the task.
- Migration note: existing flow/path/migration/distribution cards can adopt this standard incrementally by adding `analysisPerspective`, task, data contract, density/fallback rules, and exact-value route before visual refactoring.
