# Report Design Thought And Storyline Contract

Use this reference when compiling a report PRD from user requirements, source evidence, metric lists, screenshots, existing pages, or project ideas. This contract turns "what the user wants" into a selected report design thought, an adapted storyline, and executable block/slot design before template layout is finalized.

This contract does not add a new PRD output file. Write the result into the existing bundle:

- `prd-main.md`: readable summary of user/scenario, selected design thought, storyline, page preview, and layout summary.
- `prd/children/prd-child-prototype.md`: full `designThoughtSelectionMap`, `storylineMap`, `storyBlockMap`, block design reflection, and story value review.
- `prd/execution/prd-targeted-reading-analysis.md`: source evidence and `READ-*` trace for user/scenario, design thought selection, storyline, and conflicts.
- `prd/execution/prd-template-execution-contract.md`: template-level block/slot configuration that preserves the storyline and block design decisions.
- `prd/execution/prd-conclusion-rules.md`, `prd-metric-dictionary-and-mounting.md`, `prd-data-api-contract.md`, and `prd-interaction-contract.md`: rules, metrics, APIs, global filters, local filters, pill switches, data objects, and interactions needed by the selected story.

## Current Design Override Rule

When source materials, historical defaults, a generic pattern, or an earlier PRD section conflicts with the current project design made in this PRD pass:

1. Treat the current project design as authoritative.
2. Record the conflict as `ENTRY-*` in `prd/execution/prd-targeted-reading-analysis.md`.
3. Explain the chosen direction in `designThoughtSelectionMap` or `storyBlockMap`.
4. If the chosen direction conflicts with template/runtime hard constraints, normalize it to a legal template configuration or create a blocking `GAP-*`; do not silently preserve an impossible design.

## 1. User Demand Understanding Gate

Before choosing a report type, chart, block, or template, the PRD must understand the user's real task.

Use this framing table in `CHILD-PRD-PROTOTYPE` and summarize it in `prd-main.md` sections 1-2:

| Field | Required answer | Evidence source | Gap rule |
| --- | --- | --- | --- |
| What the user wants to make | Report, dashboard, cockpit, analysis page, detail query, review package, decision support page, or another report product. | User request, attachment, existing page, meeting note. | `GAP-REPORT-INTENT` if unclear. |
| Who will read it | Primary role, secondary role, reviewer/meeting role, operator role. | User request, role/permission docs, scenario notes. | `GAP-PRIMARY-ROLE` if no primary reader can be inferred. |
| Usage scenario | Routine monitoring, management review, exception handling, root-cause analysis, target tracking, forecast planning, audit/export, or operational action. | User wording, source material context, report title, navigation names. | `GAP-USAGE-SCENARIO` if scenario changes the design but is unknown. |
| Business decision/action | Judgment, diagnosis, comparison, allocation, escalation, closure, export, audit, planning, or follow-up action. | User goal, KPI names, interaction needs. | `GAP-DECISION-ACTION` if the page would only list data. |
| Managed object | Business line, region, store, customer, user, product, process, task, risk item, financial object, or source record. | Metric dimensions, filters, row grain. | `GAP-MANAGED-OBJECT` when block/metric grain depends on it. |
| Time scope | Real-time, daily, month-to-date, year-to-date, period review, forecast horizon. | Metric period, filter, report title. | `GAP-TIME-SCOPE` when comparison or refresh rules depend on it. |
| Output/reuse form | On-screen decision, meeting review, export package, detail audit, action board, or saved analysis. | Export/share requirements, meeting context. | `GAP-OUTPUT-FORM` when acceptance depends on it. |

Rules:

- Do not ask the user to repeat information already present in source materials.
- If multiple audiences exist, choose one primary reader for the first viewport and place secondary readers below, in tabs, in drilldown/detail, or in export/handoff.
- If the report has no decision/action, rewrite the goal as a data query/detail report or create `GAP-DECISION-ACTION`.

## 2. Design Thought Catalog

Choose the closest primary design thought before mapping to `RTP-*` implementation paths. A design thought describes how the business story should be told; an `RTP-*` path describes how the implementation workflow will consume it.

| Design Thought ID | Design thought | Core flow | Main question answered | Design goal | Suitable scenarios | Typical page structure | Default RTP mapping |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `DT-CONCLUSION-FIRST` | 结论驱动型 | 结论 -> 现状 -> 维度 -> 明细 | 结果怎么样，为什么 | 快速让用户了解结果，并逐步定位原因。 | 管理驾驶舱、经营分析、领导看板。 | KPI/结论卡 -> 趋势图 -> 排行榜 -> 维度分析 -> 明细列表。 | `RTP-KPI-DASHBOARD`, `RTP-ANALYSIS-REPORT`, `RTP-REVIEW-EXPORT` |
| `DT-OVERVIEW-ANALYSIS-DETAIL` | 总览分析型 | 总览 -> 分析 -> 明细 | 整体情况如何 | 从宏观到微观逐层分析数据。 | 通用 BI、数据分析平台。 | 总览指标 -> 趋势分析 -> 分类分析 -> 数据明细。 | `RTP-KPI-DASHBOARD`, `RTP-SELF-SERVICE`, `RTP-DETAIL-QUERY` |
| `DT-METRIC-TREE` | 指标树分析型 | 一级指标 -> 二级指标 -> 三级指标 -> 根因 | 哪个指标导致了结果变化 | 将业务指标逐层拆解，定位关键影响因素。 | 指标体系、经营分析、OKR。 | 核心指标 -> 指标拆解树 -> 贡献分析 -> 根因分析。 | `RTP-ANALYSIS-REPORT`, `RTP-KPI-DASHBOARD` |
| `DT-FUNNEL` | 漏斗分析型 | 流量 -> 转化 -> 留存 -> 流失 | 用户在哪一步流失了 | 分析各阶段转化效果，发现流失节点。 | 电商、营销、增长运营。 | 漏斗图 -> 转化率 -> 流失分析 -> 用户明细。 | `RTP-ANALYSIS-REPORT`, `RTP-RISK-MONITOR` |
| `DT-BUSINESS-PROCESS` | 业务流程型 | 流程节点 -> 效率 -> 异常 -> 明细 | 业务流程是否顺畅 | 按业务流程监控各环节运行情况。 | ERP、MES、供应链、物流。 | 流程图 -> 节点指标 -> 异常统计 -> 工单明细。 | `RTP-CLOSURE-BOARD`, `RTP-RISK-MONITOR`, `RTP-COCKPIT` |
| `DT-LIFECYCLE` | 生命周期分析型 | 拉新 -> 激活 -> 留存 -> 转化 -> 复购 -> 流失 | 用户处于哪个阶段 | 监控用户或客户全生命周期表现。 | 用户运营、会员体系、CRM。 | 生命周期阶段 -> 指标分析 -> 趋势变化 -> 用户列表。 | `RTP-ANALYSIS-REPORT`, `RTP-KPI-DASHBOARD` |
| `DT-PDCA` | PDCA 管理型 | Plan -> Do -> Check -> Act | 计划是否按预期执行 | 支撑计划执行与持续改进。 | 制造业、项目管理、质量管理。 | 计划完成率 -> 执行情况 -> 偏差分析 -> 改进措施。 | `RTP-CLOSURE-BOARD`, `RTP-REVIEW-EXPORT`, `RTP-KPI-DASHBOARD` |
| `DT-DIAGNOSTIC` | 问题诊断型 | 发现问题 -> 定位问题 -> 分析原因 -> 制定措施 | 问题出在哪里 | 快速定位异常原因并提出改进方案。 | 专题分析、经营复盘。 | 异常指标 -> 原因分析 -> 影响范围 -> 改进建议。 | `RTP-ANALYSIS-REPORT`, `RTP-RISK-MONITOR` |
| `DT-COMPARISON` | 对比分析型 | 实际 -> 对比 -> 差异 -> 原因 | 与过去或目标相比有什么差异 | 发现不同时间、对象之间的差异。 | 财务分析、预算管理、经营分析。 | 同比/环比 -> 差异分析 -> 原因拆解 -> 排名分析。 | `RTP-ANALYSIS-REPORT`, `RTP-KPI-DASHBOARD`, `RTP-REVIEW-EXPORT` |
| `DT-MONITORING` | 监控预警型 | 实时监控 -> 异常预警 -> 定位 -> 处理 | 是否出现异常，需要立即处理吗 | 实时发现异常并快速响应。 | 运维监控、生产监控、IoT。 | 实时指标 -> 告警列表 -> 异常详情 -> 处理记录。 | `RTP-RISK-MONITOR`, `RTP-COCKPIT` |
| `DT-DATA-STORYTELLING` | 故事分析型 | 发生什么 -> 为什么 -> 有何影响 -> 怎么办 | 发生了什么，为什么，下一步怎么办 | 用数据讲述完整业务故事，辅助汇报。 | 管理汇报、专题分析、月报周报。 | 核心结论 -> 数据分析 -> 原因说明 -> 行动建议。 | `RTP-ANALYSIS-REPORT`, `RTP-REVIEW-EXPORT` |
| `DT-DECISION-SUPPORT` | 决策支持型 | 现状 -> 风险 -> 机会 -> 建议 -> 预测 | 管理层应该如何决策 | 为管理者提供决策依据和行动建议。 | 战略分析、高层驾驶舱、AI BI。 | 当前经营 -> 风险评估 -> 机会识别 -> 决策建议 -> 收益预测。 | `RTP-ANALYSIS-REPORT`, `RTP-KPI-DASHBOARD`, `RTP-SELF-SERVICE` |
| `DT-GOAL-TRACKING` | 目标管理型 | 目标 -> 完成情况 -> 差距 -> 行动 | 目标完成了吗，差距在哪里 | 持续跟踪目标达成情况。 | OKR、KPI、绩效管理。 | 目标值 -> 完成率 -> 差距分析 -> 改进计划。 | `RTP-KPI-DASHBOARD`, `RTP-CLOSURE-BOARD` |
| `DT-ATTRIBUTION` | 归因分析型 | 结果 -> 因素拆解 -> 贡献度 -> 根因 | 哪些因素贡献最大 | 量化各因素对结果的影响程度。 | 营销分析、经营分析、算法分析。 | 指标变化 -> 因素贡献 -> 权重分析 -> 根因定位。 | `RTP-ANALYSIS-REPORT` |
| `DT-FORECAST` | 预测规划型 | 历史数据 -> 趋势预测 -> 情景模拟 -> 资源规划 | 未来会怎样，应该提前做什么 | 基于历史趋势预测未来并辅助规划。 | 销售预测、库存预测、预算规划。 | 历史趋势 -> 预测结果 -> 情景分析 -> 资源建议。 | `RTP-ANALYSIS-REPORT`, `RTP-SELF-SERVICE`, `RTP-REVIEW-EXPORT` |

For broad enterprise BI without a sharper scenario, use this integrated path as the default draft:

```text
目标/KPI -> 总览 -> 对比 -> 趋势 -> 维度分析 -> 钻取明细 -> 异常诊断 -> 根因归因 -> 预测分析 -> 决策建议
```

Use the integrated path only as a starting point. Narrow it to the primary reader and scenario before layout.

## 3. Design Thought Selection Map

Write this table in `CHILD-PRD-PROTOTYPE`; summarize the selected row in `prd-main.md` section 4.

| Selection ID | Candidate design thought | Fit result | Evidence | Why it fits or fails | Selected? | RTP mapping | Conflict/adjustment |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `DT-SEL-001` | `DT-*` | accepted / optimized / rejected / needs-confirmation | `SRC-*`, user text, metric/data clues | role, scenario, decision/action, metric relationship, data grain, output form, template fit | yes / no | `RTP-*`, `PATH-*` | none / `ENTRY-*` / `GAP-*` |

Selection rules:

- Select exactly one primary `DT-*` for the project unless a justified `DT-MIXED` structure is unavoidable.
- If mixed, name the primary `DT-*` that controls the first viewport and place secondary thoughts after the primary question is answered.
- Prefer the design thought that best matches user role, usage scenario, business decision/action, metric relationship, data grain, time sensitivity, output/reuse form, and template fit.
- Do not select a design thought only because it produces a familiar dashboard shape.
- If the user's proposed approach is weaker than another option, mark it `optimized`, keep the user's intent, and explain the adjustment.

## 4. Storyline Adaptation

After choosing the primary design thought, adapt it to the current metrics, dimensions, data objects, interactions, and template constraints.

Write `storylineMap` in `CHILD-PRD-PROTOTYPE`:

| Story step ID | Design thought step | Business question | Expected conclusion or judgment | Metrics/data needed | Evidence component direction | Drilldown/action | Confidence/gap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `STORY-001` | e.g. 结论 / 总览 / 目标 / 异常 | What the reader must understand at this step. | Generated conclusion, status, gap, or explicit insufficient-data state. | `MET-*`, `OBJ-*`, `API-*`, dimensions, baselines. | KPI, trend, ranking, funnel, tree, process, table, action list, trust cue. | `INT-*`, export, owner route, detail drawer. | confirmed / inferred / `GAP-*` |

Rules:

- The storyline must be complete enough to answer What / Why / So what unless the report is explicitly detail-query or audit-first.
- Do not invent metric values, baselines, sources, or thresholds. Use `TBD(GAP-*)` when the story depends on unavailable evidence.
- Every visible block must trace to at least one `STORY-*` step or be marked support/export/trust-only with a reason.
- Storyline steps are ordered by business importance, not by chart type.

## 5. Block-By-Block Story Design

Use the adapted storyline to design blocks from top to bottom and left to right. This table belongs in `CHILD-PRD-PROTOTYPE` and must be reflected by `prd/execution/prd-template-execution-contract.md`.

| Display order | Page | Story step | Block name | Business importance | Block size | Title design | Pill button area | Conclusion/description area | Slot count | Slot structure | Slot size/ratio | Slot information | Metric/data binding | Interaction | Placement reason | Reflection/status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Page name / `PAGE-*` | `STORY-*` | Readable block name / `BLK-*` | primary / secondary / support | `M*N`; `N>=3`; if conclusion card then `6<=M<=12` | Question/result title, not chart-type title. | `pillAreaConfig` for local mode/metric/scope switch, or `null` with reason. | `summaryAreaConfig` with `RULE-*`, static caveat, or `null` reason; hidden when conclusion card exists. | 1 / 2 / 3 / more with reason | horizontal / side-by-side / single / vertical; vertical disallowed when `N<4` | Large enough for reading; state exact slot pattern in execution files. | What each slot proves, locates, quantifies, recommends, traces, or verifies. | `MET-*`, `OBJ-*`, `API-*` | `INT-*` or non-clickable reason. | Why this block is here and why this order. | accepted / adjusted / merged / moved-to-detail / blocked |

Ordering rules:

- First viewport must answer the primary user question or expose the primary exception/action.
- Within the same row, left-to-right order follows conclusion -> evidence -> cause/action unless the language or template layout requires a different scan path.
- Do not average-weight blocks. If two blocks have equal visual weight, they must have equal narrative importance.
- Detail, source, dictionary, or metric-list content sits below the judgment path, in drawers/tooltips/export, or in execution docs unless the selected design thought is detail-query/audit-first.
- Block-level pill buttons are not decorative tabs. Use them only when the current story step needs a compact local switch such as metric perspective, ranking dimension, period mode, status group, scenario, or evidence view. If a control changes the whole page, it belongs to global filters, not `pillAreaConfig`.
- All visible top-level blocks must have `N >= 3`. If `N < 4`, the slot structure must not be vertical/up-down; choose single, horizontal, side-by-side, or increase the block height to `N >= 4`.
- If a block contains a conclusion card, the block must be `6<=M<=12` and `N>=3`, the conclusion/description area must be hidden or `null` because the conclusion card owns the conclusion, and the conclusion card must occupy 1-3 leading slots starting from the first slot position. Remaining slots must be non-conclusion components that provide evidence, cause, action, trust, or detail.

## 6. Block Internal Design Reflection

Use this review after `storyBlockMap` to catch weak or illegal blocks. Do not duplicate every `storyBlockMap` field; write the check result, risk, and adjustment.

| Block ID | Story block row | Required checks covered | Risk found | Adjustment made | Status |
| --- | --- | --- | --- | --- | --- |
| `BLK-*` | display order / `STORY-*` | size, title, pill, conclusion area, slots, interaction, component strategy | clutter / weak story / missing data / wrong grain / none | merge, split, resize, reorder, move to detail, or keep | ready / draft / blocked |

Reflection rules:

- Required checks cover: `N>=3`, no vertical/up-down slots when `N<4`, business-result title, scoped pill decision or `null` reason, dynamic `RULE-*` for business conclusions, justified slot count/size/information, explicit interaction ownership, and registered component strategy.
- When a conclusion-card component is mounted in the block, hide `summaryAreaConfig` / 说明区, place the conclusion card in 1-3 leading slots starting at the first slot, and make all remaining slots evidence/cause/action/trust/detail components.
- If any required check fails, adjust the block or mark it `draft` / `blocked`; do not compensate by adding explanatory prose.

## 7. Filter And Data Design

After the story and block configuration are drafted, design global filters, local filters, and data contracts before final template layout.

Write `globalFilterDesignMap` in `prd/execution/prd-interaction-contract.md` and reference it from `CHILD-PRD-PROTOTYPE`:

| Filter ID | Filter type | Visible label | Scope | Default value | Option source | Affected pages/blocks/slots | Query/API params | Metric/formula impact | Story/conclusion impact | Reset/stale rule | Permission/state | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `FILTER-GLOBAL-*` | global / perspective-switch / time / org / role-scope | business-readable label | whole report / page group | default or `TBD(GAP-*)` | static / API / permission-derived | `PAGE-*`, `BLK-*`, `SLOT-*` | params | none / formula changes / denominator changes | affected `STORY-*` and `RULE-*` | reset detail, clear selection, mark stale | loading / empty / no-permission | ready / draft / blocked |

Write `localFilterDesignMap` for block-level pills, component controls, local selectors, and drill-context filters:

| Local filter ID | Owner | Control surface | Visible label | Scope | Default value | Affected slots/components | API/metric params | Interaction ID | Conclusion impact | Reset/stale rule | Disabled/empty/no-permission state | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `FILTER-LOCAL-*` | block / slot / component / drawer | `pillAreaConfig` / component control / drawer filter | label | one block / one slot / drill view | default | `SLOT-*` / component id | params | `INT-*` | recompute / clear / none | behavior | state rule | ready / draft / blocked |

Write `dataDesignMap` in `prd/execution/prd-data-api-contract.md` and cross-reference the metric and interaction files:

| Data design ID | Data object | Story/block usage | Grain | Dimensions | Measures | Required baselines/thresholds | Source/API | Freshness | Permission scope | Quality/null rule | Mock-to-real status | Gap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `DATA-DESIGN-*` | `OBJ-*` | `STORY-*`, `BLK-*`, `SLOT-*` | one row per... | dimensions | `MET-*` / fields | target, benchmark, prior period, denominator | `API-*` / source | refresh rule | role/data scope | null, duplicate, delay, denominator zero | mock / real / replacement-needed | none / `GAP-*` |

Rules:

- Global filters define the report's current question context. They belong to the template filter surface and must not be duplicated as block pills or component controls.
- Local filters refine one story block or component. They must not silently change report-level context, metric口径, or URL state.
- A control that changes formula, denominator, metric direction, data grain, or visible module set must record that impact in metric/data contracts, not only in interaction prose.
- Every `RULE-*` conclusion must say whether each global/local filter recomputes, clears, or marks the conclusion stale.
- Data design must verify that the selected storyline is feasible with current or planned data. If baseline, threshold, grain, permission, or freshness is missing, record `GAP-*` and downgrade readiness.
- Mock data can seed shape only. The PRD must state the real data/API replacement path or mark the data design blocked.

## 8. Story Completeness And Value Review

After all block configs are drafted, run this review before selecting final template layout or marking readiness.

| Review item | Required check | Result | Repair when failed |
| --- | --- | --- | --- |
| Primary question | The selected story answers one primary user question. | pass / fail / gap | Define primary question or split pages. |
| Audience fit | First viewport matches the primary reader's scenario and authority. | pass / fail / gap | Reorder first viewport or change primary reader. |
| Design thought fit | The selected `DT-*` still fits after metrics/data constraints. | pass / fail / gap | Re-select or optimize design thought. |
| What / Why / So what | The story covers status/result, reason/evidence, and action/detail/trust where needed. | pass / fail / gap | Add/move evidence, action, detail, or trust blocks. |
| Block contribution | Every visible block has a `STORY-*` role and business value. | pass / fail / gap | Remove, merge, or move weak blocks. |
| Story order | Top-to-bottom and left-to-right order reduces thinking steps. | pass / fail / gap | Reorder blocks or split into pages. |
| Data realism | Metrics, baselines, thresholds, and data grain exist or have explicit gaps. | pass / fail / gap | Add `GAP-*`, downgrade, or move to draft. |
| Filter design | Global filters, local filters, pill switches, and data impacts are explicit. | pass / fail / gap | Add filter/data maps or mark blocked. |
| Template feasibility | The story can be represented by legal `pageLayoutConfig`, `blockAreaConfigMap`, slots, and registered component examples. | pass / fail / gap | Normalize layout, add custom example gap, or adjust story. |

Readiness gates:

- Do not mark the PRD `ready-for-review` when no primary `DT-*` is selected.
- Do not mark the PRD ready when `storylineMap`, `storyBlockMap`, or block design reflection is missing from `CHILD-PRD-PROTOTYPE`.
- Do not mark the PRD ready when a visible block lacks `STORY-*`, `PATH-*`, block purpose, title decision, pill-area decision, conclusion/description decision, slot plan, component example strategy, metric/data binding, interaction decision, and readiness status.
- Do not mark the PRD ready when a conclusion-card block lacks hidden说明区, `6<=M<=12`, `N>=3`, first-position conclusion card, 1-3 conclusion slots, and non-conclusion remaining slots.
- Do not mark the PRD ready when any `N=3` block uses vertical/up-down slots.
- Do not mark the PRD ready when global filter design, local filter design, pill switch behavior, and data design are missing, generic, or disconnected from metrics, APIs, conclusions, interactions, and permissions.
- Do not mark the PRD ready when the story review fails and no repair or `GAP-*` is recorded.
