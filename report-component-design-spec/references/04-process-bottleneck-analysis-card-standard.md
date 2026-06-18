# Process Bottleneck Analysis Card Standard

Use this standard when a report asks for `analysisPerspective: processBottleneck`, such as 看流程, 流程卡, 步骤卡, 节点卡, 瓶颈卡, 环节进度, 阶段进度, 流程耗时, 卡点定位, 堵点诊断, or process optimization.

This is an upper-level component-family standard for process analysis cards. It does not create a decorative flow style. It routes every card to controlled pattern fields, real data contracts, and real renderer ownership. The visual samples are reusable inspiration only; the durable source is this text-only contract.

## 1. Scope And Source Of Truth

- Component family: Process Bottleneck Analysis Cards / 流程分析卡片族.
- Primary mapping perspective: `analysisPerspective: processBottleneck`.
- Related perspectives: `flowTransfer`, `conversionRetention`, `targetProgress`, `anomalyRisk`, `relationshipInfluence`, `decompositionDriver`, `trendMovement`, and `detailEvidence`.
- Applicable report/page types: BI dashboards, operations dashboards, approval/workflow reports, R&D delivery reports, migration/work-order monitoring, production/service process dashboards, customer journey diagnostics, and process optimization reports.
- Source hierarchy: company UI baseline -> report design system -> Modern SaaS BI Dashboard style contract -> this component-family standard -> project exceptions.
- Libraries/renderers: ECharts for standard chart bodies; Element Plus or project controls for local filters; project table or AntV S2 for detail audit; data-driven custom diagram only for stepper/node/process diagrams not covered by standard chart series.
- Supported viewports: ordinary card `420x260+`; process/path/funnel card `560x340+`; node/tree/network card `560x340+`; dense bottleneck table/heatmap card `640x360+`; mobile or narrow cards use summary + drawer/fullscreen/table fallback.
- Owner/version/status: report-component-design-spec / v1.0 / stable for reusable guidance, implementation-ready only after local data and runtime proof.

## 2. Why These Designs Feel Strong And Non-AI

These cards feel designed, not AI-like, because their polish is produced by constraint, not ornament:

- One card answers one process question: what stage is current, which step is stuck, which node is abnormal, or which bottleneck should be optimized first.
- The visual metaphor matches the evidence: stepper means ordered stage state, timeline means time/order, path means directed movement, funnel means shared-cohort conversion/loss, tree means parent-child process structure, graph means node relations, gauge means bounded severity, heatmap/table means stage-by-metric diagnosis, and waterfall means accumulated loss.
- The anatomy is stable across variants: header and local scope, one dominant process body, bounded support facts, exact-value route, and state/fallback behavior.
- Light-surface UI Kit treatment is restrained: optional analytical surfaces, reduced uniform borders, small radius, optional light shadow, compact controls, sparse labels, muted lines, and no nested-card piles.
- Brand/product color and neutral hierarchy define the base; current/selected step, completed, in-progress, pending, abnormal, bottleneck, success, loss, and unknown use stable color roles only when the process/status rule is declared.
- The cards preserve messy business reality: waiting, rework, delayed, skipped, unknown owner, missing timestamp, zero denominator, non-monotonic stages, long-tail nodes, and permission-limited steps are visible states.
- Key numbers are never merely decorative. Duration, pass rate, waiting count, WIP, SLA breach, queue length, conversion, loss, and rework are bound to named fields and remain inspectable through tooltip/detail/table/export.
- Density is budgeted before styling: step count, visible labels, node count, edge count, metric columns, long-tail aggregation, drawer/fullscreen, and table fallback are declared.
- The design has a real product rhythm: title badges, period dropdowns, segmented switches, bounded metric/fact strips, hover/focus states, and status chips follow the same UI Kit language across all variants.
- It avoids common AI polish: no generic blue-purple glass, oversized glow, fake 3D icons, ornamental arcs, random rainbow nodes, all-green sample data, or chart variety added only to look rich.

## 3. Style Generalization Coverage

| Sample role | Reusable meaning | Selected controlled patterns | Status | Adaptive variables | Fallback |
| --- | --- | --- | --- | --- | --- |
| 流程卡布局方案 | Show the process as a flow body with stage, branch, loop, path, or funnel shape | `processAnalysisCardPattern` plus `flowHierarchyDiagramCardPattern`, `kpiTimeSeriesCardPattern`, table/detail fallback | covered-by-composed-patterns | stage count, branch count, loop state, selected step, period, metric basis, evidence strip | path/funnel/table/fullscreen when custom geometry fails |
| 步骤卡布局方案 | Show ordered steps and current progress/status | `processAnalysisCardPattern` plus `kpiGoalExecutionCardPattern: milestone-timeline-card`, list/timeline, path/funnel fallback | covered-by-composed-patterns | step count, current step, completed/pending/in-progress status, remaining step count, progress denominator | vertical timeline, compact dropdown, detail list |
| 节点卡布局方案 | Show process nodes, relations, hierarchy, and node-level health | `processAnalysisCardPattern` plus `flowHierarchyDiagramCardPattern: hierarchy-tree-card` / `hub-relation-network-card`, relationship graph, table fallback | covered-by-composed-patterns | node count, node group, level, relation count, active nodes, abnormal nodes, center/root node | tree-list/table/fullscreen/search when dense |
| 瓶颈卡布局方案 | Locate stage or node bottlenecks and optimization direction | `processAnalysisCardPattern` plus `anomalyAnalysisCardPattern`, ranking, gauge, heatmap, waterfall, trend, cause donut | covered-by-composed-patterns | bottleneck metric, severity threshold, stage rank, duration/waiting/rework fields, baseline/target, impact | ranked table, detail drawer, action list |

`textOnlyReproduction` is `true`: future components must be generated from this text standard, not from raw screenshots.

## 4. Controlled Pattern Field

Use `processAnalysisCardPattern` when `analysisPerspective: processBottleneck` is primary and the card itself packages stage/node/bottleneck context. Keep `visualType` as the real renderer or evidence family.

```ts
type ProcessAnalysisCardPattern =
  | 'linear-process-flow-card'
  | 'ring-process-flow-card'
  | 'timeline-process-flow-card'
  | 'stage-card-process-flow-card'
  | 'branch-process-flow-card'
  | 'funnel-process-flow-card'
  | 'cycle-process-flow-card'
  | 'map-path-process-flow-card'
  | 'horizontal-stepper-card'
  | 'icon-stepper-card'
  | 'number-stepper-card'
  | 'segmented-stepper-card'
  | 'vertical-stepper-card'
  | 'timeline-stepper-card'
  | 'cycle-stepper-card'
  | 'stepper-metric-card'
  | 'horizontal-node-flow-card'
  | 'ring-node-map-card'
  | 'tree-node-structure-card'
  | 'node-grid-status-card'
  | 'hub-node-relation-card'
  | 'node-timeline-card'
  | 'hierarchy-node-card'
  | 'node-network-card'
  | 'bottleneck-stage-highlight-card'
  | 'bottleneck-ranking-card'
  | 'bottleneck-gauge-card'
  | 'bottleneck-heatmap-card'
  | 'bottleneck-waterfall-card'
  | 'bottleneck-bubble-card'
  | 'bottleneck-trend-card'
  | 'bottleneck-cause-donut-card';
```

Pattern grouping:

| Group | Pattern values | Primary job |
| --- | --- | --- |
| Process flow | `linear-process-flow-card`, `ring-process-flow-card`, `timeline-process-flow-card`, `stage-card-process-flow-card`, `branch-process-flow-card`, `funnel-process-flow-card`, `cycle-process-flow-card`, `map-path-process-flow-card` | Explain the whole process path or flow topology. |
| Step progress | `horizontal-stepper-card`, `icon-stepper-card`, `number-stepper-card`, `segmented-stepper-card`, `vertical-stepper-card`, `timeline-stepper-card`, `cycle-stepper-card`, `stepper-metric-card` | Show current step, completed/pending state, and progress. |
| Node structure | `horizontal-node-flow-card`, `ring-node-map-card`, `tree-node-structure-card`, `node-grid-status-card`, `hub-node-relation-card`, `node-timeline-card`, `hierarchy-node-card`, `node-network-card` | Show node status, relation, hierarchy, and active/abnormal nodes. |
| Bottleneck diagnosis | `bottleneck-stage-highlight-card`, `bottleneck-ranking-card`, `bottleneck-gauge-card`, `bottleneck-heatmap-card`, `bottleneck-waterfall-card`, `bottleneck-bubble-card`, `bottleneck-trend-card`, `bottleneck-cause-donut-card` | Locate the worst stage/node and explain impact or cause. |

## 5. Component Family Matrix

| Process card family | Business trigger | Primary pattern fields | Required evidence body | Minimum size | Use when |
| --- | --- | --- | --- | ---: | --- |
| `process-overview-card` | 流程经过哪些环节, 当前走到哪里 | `processAnalysisCardPattern` process-flow group; optional `flowHierarchyDiagramCardPattern` | Linear/ring/timeline/stage-card/process-path body | `420x260` | The process order and current state are the first question. |
| `step-progress-card` | 哪一步已完成, 哪一步进行中, 还剩几步 | step-progress group; optional `kpiGoalExecutionCardPattern: milestone-timeline-card` | Stepper, vertical timeline, segmented stage track, progress summary | `420x260` | There is an ordered stage list and one current step. |
| `node-status-card` | 哪些节点活跃/异常, 节点之间如何关联 | node-structure group; optional `flowHierarchyDiagramCardPattern` tree/graph/path | Node map, node grid, hierarchy tree, hub relation, timeline | `560x340` | Nodes have status, owner, relation, or hierarchy. |
| `bottleneck-diagnosis-card` | 哪里卡住了, 卡点影响多大, 优先优化哪里 | bottleneck-diagnosis group; optional `anomalyAnalysisCardPattern`, ranking, gauge, heatmap, waterfall, trend, table | Highlighted stage, rank bars, gauge, heatmap table, waterfall, trend, cause donut | `420x300`; dense `640x360` | A stage/node has duration, queue, pass rate, delay, loss, or SLA evidence. |
| `process-detail-evidence-card` | 需要核对具体记录、工单、任务或节点明细 | table/list patterns | Detail table, task list, event timeline, drawer | `420x300` | Exact row audit matters more than diagram shape. |

## 6. Component Purpose

Process Bottleneck Analysis Cards answer one of these questions:

- `process-overview`: 流程有哪些环节, 当前状态如何?
- `step-progress`: 当前到哪一步, 哪些步骤已完成/进行中/待开始?
- `node-status`: 哪些节点活跃、异常、孤立、延期或关联密集?
- `bottleneck-diagnosis`: 哪个环节耗时最长、积压最多、转化最低、返工最高或影响最大?
- `process-detail-evidence`: 具体是哪批任务/订单/工单/记录造成了流程状态?

Not suitable for unordered category comparison, pure timeline trend, decorative icon process, exact-row audit as the only task, or process-looking visuals without stage order, node schema, status fields, timing fields, denominator, threshold, or exact-value path.

## 7. Anatomy

Required slots:

1. Header: optional solution/index badge, concise title, definition/help icon, and one local control group when needed.
2. Scope metadata: period, process scope, stage group, node scope, metric basis, SLA/threshold rule, or owner scope.
3. Primary evidence body: exactly one dominant process/step/node/bottleneck visual or table/list body.
4. Evidence strip: `2-4` facts such as process total, current step, completion rate, average duration, waiting count, timeout rate, pass rate, rework rate, active nodes, abnormal nodes, or bottleneck impact.
5. Exact-value route: tooltip plus detail drawer, fullscreen, table fallback, export, or detail link.
6. State body: loading, empty, filtered-empty, error, no-permission, stale, too-dense, missing-step, missing-node, missing-timestamp, invalid-order, invalid-threshold, and partial data.

Forbidden slots: nested card piles, unrelated mini-chart collages, decorative stage icons without fields, permanent labels for every node/link/step beyond budget, duplicated global filters, and full-card red/green overpaint.

## 8. Data Contract

Every process bottleneck card must declare:

```ts
type ProcessBottleneckAnalysisCardContract = {
  analysisPerspective: 'processBottleneck';
  processTask:
    | 'process-overview'
    | 'step-progress'
    | 'node-status'
    | 'bottleneck-diagnosis'
    | 'process-detail-evidence';
  processAnalysisCardPattern: string;
  primaryPatternField: string;
  secondaryPatternFields?: string[];
  componentType: 'card' | 'chart' | 'table' | 'task' | 'custom';
  visualType: string;
  dataGrain: string;
  processIdField?: string;
  stepFields?: string[];
  nodeFields?: string[];
  linkFields?: string[];
  statusFields?: string[];
  timingFields?: string[];
  metricFields: string[];
  bottleneckFields?: string[];
  thresholdFields?: string[];
  ownerFields?: string[];
  periodField?: string;
  denominatorRule?: string;
  orderRule: string;
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
| `process-overview` | `process_id`, `stage_id`, `stage_name`, `stage_order`, `status`, `value`, `unit`, `period`; optional `current_stage_flag`, `completed_flag`, `owner`, `start_time`, `end_time`. |
| `step-progress` | `step_id`, `step_name`, `step_order`, `step_status`, `current_step_flag`, `completed_value`, `total_value`, `progress_rate`, `period`; optional `planned_time`, `actual_time`, `remaining_steps`, `deadline`. |
| `node-status` | Node rows: `node_id`, `node_name`, `node_type`, `node_status`, `level` or `stage_order`, `value`; optional link rows: `source_id`, `target_id`, `weight`, `relation_type`, `period`. |
| `bottleneck-diagnosis` | `stage_id` or `node_id`, `duration`, `waiting_count` or `queue_length`, `throughput`, `pass_rate`, `timeout_rate`, `rework_rate` or `loss_value`, `severity`, `threshold`, `period`; optional `impact_value`, `root_cause`, `owner`, `action_status`. |
| `process-detail-evidence` | Primary key such as `task_id` / `order_id` / `ticket_id`, `stage_id`, `status`, `owner`, `start_time`, `end_time`, `duration`, `sla_status`, `bottleneck_reason`, and row-level permission/export fields. |

Numeric display contract:

- Visible rates must declare whether source data is `0-1`, `0-100`, or preformatted. Formatter owns display scale and precision.
- Duration units must be explicit, such as minute, hour, day, business day, or working hour. Do not mix duration units inside one stage chart without normalization.
- Stage order must come from data or a declared business rule, not visual position.
- Bottleneck severity must declare direction semantics: higher-is-worse, lower-is-worse, bounded status, or threshold breach.
- Zero denominator displays `--` and explains denominator state in tooltip. Do not coerce denominator-zero to `0%`.

## 9. Pattern Selection Rules

| User wording / data shape | Choose | Avoid |
| --- | --- | --- |
| "流程有哪些环节/流程怎么走" with ordered stages | `linear-process-flow-card`, `timeline-process-flow-card`, `stage-card-process-flow-card`, or `path-conversion-flow-card` | Donut, network, or random icon row when order is the evidence. |
| "当前到哪一步/还剩几步" with one current stage | `horizontal-stepper-card`, `segmented-stepper-card`, `vertical-stepper-card`, or `timeline-stepper-card` | Sankey or complex graph unless there are real branches. |
| "每一步转化/流失" with shared cohort | `funnel-process-flow-card` or `conversion-funnel-card` | Funnel without cohort/denominator. |
| "有分支/并行/回流/迭代" with directed transitions | `branch-process-flow-card`, `cycle-process-flow-card`, `path-conversion-flow-card`, or Sankey when many-to-many | Static decorative arrows with no link values. |
| "节点结构/层级/依赖" with parent-child fields | `tree-node-structure-card`, `hierarchy-node-card`, or `hierarchy-tree-card` | Relation graph when each node has one parent. |
| "节点之间关联/中心节点" with node-edge fields | `hub-node-relation-card`, `node-network-card`, or `hub-relation-network-card` | Tree when nodes have multiple parents/relations. |
| "哪个环节最卡/最慢/最堵" with metric ranking | `bottleneck-stage-highlight-card` or `bottleneck-ranking-card` | Gauge alone when comparison/rank is needed. |
| "瓶颈严重度/风险等级" with bounded severity | `bottleneck-gauge-card` plus side evidence | Gauge without threshold/status dictionary. |
| "瓶颈由哪些因素造成" with root cause shares | `bottleneck-cause-donut-card`, ranking/table, or decomposition card | Cause donut without denominator and source rule. |
| "瓶颈趋势/优化前后" with time rows | `bottleneck-trend-card` or line chart | Static highlight card when movement is the question. |

## 10. Placement And Fit

Use variables: `W`, `H`, `P`, `CW = W - 2P`, `CH = H - headerH - footerH - 2P`.

Default slot budgets:

- `headerH`: `40-52px`; title left, one local control group right.
- `processBodyH`: at least `52%` of card height for process/step/path/funnel, `55%` for tree/graph/network, `45%` for bottleneck ranking/gauge/line/table cards.
- `metricStripH`: `44-72px` when visible; support facts stay `2-4`.
- `footerH`: `32-44px`; detail/action/source only.
- Local controls: title-right capsule/dropdown by default; under-title row only when title still fits and body floor remains valid.

Minimum fit gates:

| Evidence type | Fit floor |
| --- | --- |
| Horizontal stepper | card `>=420x240`, stages `3-7` preferred, node gap `>=52px`, key labels only. |
| Vertical timeline | card `>=420x260`, visible steps `4-8`, row height `>=28px`, ordinary metadata muted. |
| Path/process chain | card `>=560x340`, `pathAreaH >= CH * 0.52`, main nodes `<=8`, links `<=20` before key-only labels. |
| Funnel/process conversion | card `>=420x260`, `funnelAreaH >= CH * 0.52`, stages `3-6` preferred, `>10` folded/table fallback. |
| Tree/node hierarchy | card `>=560x340`, `treeAreaH >= CH * 0.55`, visible depth `<=4`, visible nodes `<=60`. |
| Relation/node network | card `>=560x340`, `graphH >= CH * 0.55`, nodes `<=50`, edges `<=90`, permanent labels `<=10`. |
| Bottleneck ranking | card `>=420x300`, visible stages `3-6` default, `<=8`, row height `>=22px`. |
| Bottleneck heatmap/table | card `>=640x360`, cells `>=12px`, visible stages `<=8`, metrics `<=5` before scroll/detail. |
| Bottleneck gauge | card `>=360x240`, gauge body `>=120px`, threshold labels must not collide. |

Responsive fallback order:

1. Collapse secondary controls to dropdown.
2. Reduce evidence strip to `<=2` facts.
3. Hide ordinary labels; keep current/bottleneck/key labels and tooltip.
4. Aggregate Top N + `其他`, collapse path depth, or show current/previous/next steps only.
5. Move exact rows to drawer/table/fullscreen.
6. Split into a larger chart/table card.
7. Reject the visual and route to ranking/table/list when required fields or size floors fail.

## 11. Visual And Interaction Rules

- Inherit light or near-white analytical surfaces only when the process body needs a bounded object, reduce uniform borders, keep `6-8px` radius unless template differs, make shadow optional, use compact typography, muted metadata, stable UI Kit controls, and no nested-card look.
- Use semantic process colors: completed = restrained green/teal, current/in-progress = primary/brand, pending = neutral gray, warning/bottleneck = restrained amber/red, skipped/unknown/stale = neutral gray, success/loss terminal states = semantic success/risk.
- Step/node icon containers are status carriers, not decoration. Icons must have labels or accessible names and cannot be the only decision evidence.
- Connectors stay weaker than nodes; arrows stop at node edges; dotted/weak lines indicate pending, optional, or historical path only when declared.
- Highlight one selected/current/bottleneck point by default. Do not make every stage visually strong.
- Hover highlights related step/node/transition and dims unrelated marks without layout movement.
- Click pins stage/node/path/bottleneck and opens declared detail, drawer, fullscreen, or table.
- Local controls update only this card or declared local group; otherwise reclassify as global filter or perspective switch.
- Fullscreen is required when ordinary card density cannot preserve labels and geometry.

## 12. States

Required states: `loading`, `empty`, `filtered-empty`, `error`, `no-permission`, `stale`, `missing-step`, `missing-node`, `missing-timestamp`, `invalid-order`, `invalid-threshold`, `zero-denominator`, `too-dense`, and `partial-data`.

State rules:

- Loading skeleton preserves header, body, metric strip, and footer geometry.
- No-permission states must not leak restricted totals, task names, owner names, or chart silhouettes that reveal unauthorized detail.
- Missing timestamp or invalid order must be surfaced as data quality gaps, not silently sorted by display label.
- Too-dense states switch to aggregation, search, table, drawer, or fullscreen.
- Bottleneck states must include the action path or responsible owner when visible action is in scope.

## 13. Anti-AI Gate

Reject or keep readiness `partial` when:

- `analysisPerspective: processBottleneck` is missing for a component that claims 看流程, 步骤, 节点, or 瓶颈.
- The card is selected because it looks sophisticated rather than because the data has ordered stages, node status, directed transitions, timing, threshold, or bottleneck evidence.
- Stage order, node position, path width, color, gauge range, heatmap color, or bottleneck highlight is not tied to named fields or declared rules.
- The card lacks density limit, label rule, tooltip payload, exact-value route, state set, or fallback.
- A bottleneck card has no baseline, threshold, comparison, impact, or next action.
- The card hides messy states such as missing owner, waiting queue, rework, skipped step, zero denominator, stale data, or no permission.
- Generic blue-purple glass polish, decorative icons, oversized glow, all-green status, random rainbow nodes, or ornamental motion competes with process reading.
- A simpler table/ranking/list would answer the question more clearly.

Use failure IDs:

- `RPT-PROCESS-PERSPECTIVE-MISSING`
- `RPT-PROCESS-DATA-MISSING`
- `RPT-PROCESS-ORDER-MISSING`
- `RPT-PROCESS-METHOD-MISSING`
- `RPT-BOTTLENECK-EVIDENCE-MISSING`
- `RPT-BOTTLENECK-NO-ACTION`
- `VIS-PROCESS-DENSITY-UNBOUNDED`
- `VIS-PROCESS-EVIDENCE-DECORATIVE`
- `VIS-PROCESS-SQUEEZED`
- `VIS-PROCESS-AI-POLISH`
- `VIS-PROCESS-GEOMETRY-WARPED`

## 14. Rule Strength And Proof Matrix

| Rule | Strength | Proof method | Failure ID |
| --- | --- | --- | --- |
| Process cards declare `analysisPerspective: processBottleneck` and one `processTask`. | MUST/fail | Binding matrix or component config field | `RPT-PROCESS-PERSPECTIVE-MISSING` |
| Selected pattern uses `processAnalysisCardPattern` and a real `visualType` or renderer owner. | MUST/fail | Config/schema review | `RPT-PROCESS-METHOD-MISSING` |
| Required fields for the selected task exist. | MUST/fail | Dataset/API/mock schema review | `RPT-PROCESS-DATA-MISSING` |
| Stage order, node layout, status, severity, width, color, and thresholds bind to data or declared rules. | MUST/fail | Renderer option/data adapter review | `RPT-PROCESS-ORDER-MISSING` / `VIS-PROCESS-EVIDENCE-DECORATIVE` |
| Bottleneck cards include baseline/threshold/comparison plus impact or action path. | MUST/fail | Metric contract, action route, tooltip/detail payload | `RPT-BOTTLENECK-EVIDENCE-MISSING` / `RPT-BOTTLENECK-NO-ACTION` |
| Density and label budgets are declared before styling. | MUST/fail | Source/config plus QA crop/DOM or chart option proof | `VIS-PROCESS-DENSITY-UNBOUNDED` |
| Evidence body meets the selected fit floor. | MUST/fail | Slot budget, DOM geometry, screenshot/crop, ECharts/custom renderer proof | `VIS-PROCESS-SQUEEZED` |
| Exact values are available through tooltip/detail/drawer/table/export. | MUST/fail | Interaction contract and payload review | `RPT-NO-ACTION` |
| Local controls are scoped to current card/local group. | MUST/fail | Control semantics model | `VIS-DUPLICATE-CONTROL` or `RPT-SHELL-DUPLICATE` |
| UI Kit look maps to semantic tokens and restrained chart/process treatment. | MUST/fail when claimed | Token and visual baseline review | `VIS-MODERN-BI-BASELINE-MISSING` / `VIS-PROCESS-AI-POLISH` |
| Use Top N + `其他`, collapse, drawer, or fullscreen for dense steps/nodes/metrics. | SHOULD/exception-required | Aggregation/fallback route proof | `VIS-PROCESS-DENSITY-UNBOUNDED` |
| Use process icons only when they identify stage type, status, owner, or action. | MAY/optional | Icon semantic label/accessibility review | `VIS-PROCESS-AI-POLISH` |

## 15. Acceptance Checklist

- `analysisPerspective: processBottleneck` is declared or the card explicitly routes to another perspective.
- `processTask` is declared and maps to a business question in user language.
- `processAnalysisCardPattern` is one of the controlled values, and any secondary pattern fields remain valid.
- Required data fields, formula/denominator, source/freshness, period, status dictionary, and numeric display contract are present.
- Stage order, node hierarchy/relation, status/severity, threshold, and bottleneck method are explicit when visible.
- One primary evidence body owns the card; support facts stay `2-4`.
- Local filters are documented under `组件内筛选区 / 局部筛选区` and scoped correctly.
- Density limit, label rule, aggregation/collapse rule, and fallback are explicit.
- Tooltip/detail/exact-value route is present.
- Loading, empty, error, no-permission, stale, dense, invalid-order, missing-data, and zero-denominator states are defined.
- The design can be reproduced from this text standard without retaining the source screenshots.

## 16. Governance

- Allowed variants: process overview, step progress, node status, bottleneck diagnosis, and process detail evidence.
- Deprecated patterns: image-only process diagrams, all-green stage rows, icon-only step cards, fake stage order, decorative arrows, all-node networks without density controls, bottleneck cards without threshold/action, and generic glass/gradient process skins.
- Exception process: custom process diagrams must declare renderer ownership, data adapter, resize behavior, accessibility, fallback, and why ECharts/project standard charts cannot satisfy the task.
- Migration note: existing process/step/node/bottleneck cards can adopt this standard incrementally by adding `analysisPerspective`, task, pattern, data contract, density/fallback rules, exact-value route, and state coverage before visual refactoring.
