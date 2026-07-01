# Report Type Implementation Patterns

Use this reference before writing the main PRD report-implementation summary and the detailed `CHILD-PRD-PROTOTYPE` / `prd/execution/prd-template-execution-contract.md` report-path rows.

The PRD must decide how the report should be read before it decides which block area config to use. A report type is not only a label such as "dashboard" or "detail report"; it defines the user's decision path, module order, first-viewport priority, block layout sequence, and where drilldown/action/export belongs.

## Input And Attachment Intake

If the user provides attachments, screenshots, meeting notes, metric sheets, existing reports, prototype images, or business documents, inspect those materials first. Ask follow-up questions only for missing information that blocks a safe PRD.

Use this table:

| Source ID | Source type | Filename or description | Key facts extracted | Sections affected | Confidence | Gaps raised |
| --- | --- | --- | --- | --- | --- | --- |

Rules:

- Do not ask the user to repeat information that is already present in attachments.
- When attachment evidence conflicts with the user's latest text, prefer the latest explicit user instruction and record the conflict as a fact/gap.
- When the attachment only contains a metric list or page screenshot, infer a draft report type and mark unsupported assumptions as `TBD(GAP-*)`.
- When attachments cannot be read, state the blocked file/type and ask for the minimum replacement information.

## User-Supplied Thinking Validation

If the user already proposes a report implementation idea, validate it instead of accepting it blindly.

Use this table:

| Idea ID | User-provided report thought | Fit result | Validation dimensions | Recommended adjustment | Reason | User confirmation needed |
| --- | --- | --- | --- | --- | --- | --- |

`Fit result` must be one of:

- `accepted`: matches the report type, user role, management decision, data grain, and template constraints.
- `optimized`: direction is right but order, emphasis, or block mapping should be improved.
- `rejected`: conflicts with the report type or would create a poor decision path.
- `needs-confirmation`: cannot be judged from current evidence.

Validate against these dimensions:

- Management question: does the thought answer the user's real decision problem first?
- Role fit: does the first viewport match the primary role's attention span and authority?
- Evidence chain: is there a clear path from conclusion to metric evidence, cause, detail, and action/export?
- Data grain: can the required metric/detail/action data exist at the stated grain?
- Template fit: can the idea be implemented with framework template, page layout, block area configs, and standard areas?
- Interaction fit: are drilldown, jump, drawer, popup, and export placed where users naturally act?
- Visual density: does the first viewport answer the main question without becoming empty, crowded, or detail-heavy?

If the user's idea is not the best option, the PRD must give an optimized recommendation and explain the tradeoff without losing the user's intent.

## Pattern Catalog

Use the closest pattern as the default. For mixed reports, choose one primary pattern and add secondary pattern modules only where they serve the primary decision path.

### Historical Type Compatibility

The retired standalone report-type entry used narrower business-type labels. Do not route to a separate type-selection skill. Translate legacy labels or user wording into the active `RTP-*` paths inside this PRD reference:

| Legacy label or user wording | Active PRD path | Notes |
| --- | --- | --- |
| `status-overview`, operating overview, health/status board | `RTP-KPI-DASHBOARD` or `RTP-COCKPIT` | Choose cockpit only when large-screen command context is central. |
| `analysis-diagnostic`, cause analysis, variance analysis | `RTP-ANALYSIS-REPORT` | Keep conclusion -> evidence -> cause -> action order. |
| `detail-query`, ledger, row lookup, source records | `RTP-DETAIL-QUERY` | Keep row identity, source trace, export, and row action explicit. |
| `performance-evaluation`, scoring, ranking, target achievement | `RTP-KPI-DASHBOARD` or `RTP-ANALYSIS-REPORT` | Use dashboard when status/rank is primary; use analysis report when fairness, cause, or improvement diagnosis is primary. |
| `review-recap`, weekly/monthly review, meeting export | `RTP-REVIEW-EXPORT` | Preserve review/export reuse and evidence package expectations. |
| `anomaly-monitoring`, warning, alert, risk board | `RTP-RISK-MONITOR` | Preserve severity, impacted object, owner, SLA, and closure path. |
| `operational-execution`, task board, action closure | `RTP-CLOSURE-BOARD` | Preserve owner, deadline, blocker, progress, and closure evidence. |
| `reconciliation-traceability`, audit, source comparison | `RTP-DETAIL-QUERY` | Treat as detail/audit-first unless management judgment is explicitly primary. Always emphasize trust/source/export/audit. |

### Pattern To Executive Satisfaction Focus

Use this table together with `executive-satisfaction-design-gate.md` when filling management-facing gate rows in `CHILD-PRD-PROTOTYPE` or execution files. The executive satisfaction gate must match the report type instead of forcing every report into the same dashboard pattern.

| Pattern ID | 3-second answer | 30-second cause/evidence path | 3-minute action/reuse | Required 4B emphasis |
| --- | --- | --- | --- | --- |
| `RTP-KPI-DASHBOARD` | Current health, target gap, risk/opportunity | KPI -> driver -> ranking/trend/process | Drilldown, owner follow-up, export/share | `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*` |
| `RTP-COCKPIT` | Overall situation and urgent exception | Status -> spatial/business distribution -> alert object | Command/action route, fullscreen review | `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*` |
| `RTP-ANALYSIS-REPORT` | Conclusion and impact | Evidence -> attribution -> comparison -> affected objects | Recommendation, follow-up decision, meeting export | `ESG-*`, `ACT-*`, `TRUST-*`, `MEET-*` |
| `RTP-DETAIL-QUERY` | Query scope, total, and authoritative row set | Row identity -> row detail -> source trace -> reconciliation | Export, audit, row action, source jump | `ESG-*` only when management-facing; always `TRUST-*`, export/audit, row action |
| `RTP-RISK-MONITOR` | Highest severity and impacted object | Severity -> impacted object -> cause/time/process | Escalation, closure owner, risk export | `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*` |
| `RTP-CLOSURE-BOARD` | Closure pressure and overdue status | Status -> owner -> process -> blocker | Owner action, deadline, review | `ESG-*`, `SEV-*`, `ACT-*`, `MEET-*` when used in review |
| `RTP-REVIEW-EXPORT` | Period conclusion and goal/event evidence | Goal comparison -> key events -> impact -> learnings | Export package, filter snapshot, circulation | `ESG-*`, `TRUST-*`, `MEET-*`, `ACT-*` when recommendations exist |
| `RTP-SELF-SERVICE` | Generated result and whether it is trustworthy | Config -> result -> interpretation -> data quality | Save, share, export, reuse | `TRUST-*`, `MEET-*` when shared upward, `ESG-*` only for management-facing saved views |
| `RTP-MIXED` | Primary pattern answer first | Primary evidence path, secondary modules below | Primary pattern action/reuse | 4B follows the primary pattern and records secondary exceptions |

### Pattern Catalog Table

| Pattern ID | Report type | Core question | Recommended reading path | First viewport priority | Implementation workflow |
| --- | --- | --- | --- | --- | --- |
| `RTP-KPI-DASHBOARD` | KPI dashboard / management board / operating dashboard | 现在怎么样，哪里有风险，下一步看什么 | 先结论/状态 -> 看关键 KPI 与目标差距 -> 看原因/结构/排名 -> 看过程/趋势 -> 看动作/闭环 | Core conclusion, bounded KPI group, risk/target signal, first diagnostic evidence | `report-prototype-implementation-workflow` |
| `RTP-COCKPIT` | Command cockpit / large screen | 全局态势是否健康，异常在哪里，需要指挥什么 | 先总态势 -> 看空间/业务分布 -> 看异常预警 -> 看关键过程 -> 看指挥动作 | One dominant status zone, map/ranking/risk signal, live action cue | `report-prototype-implementation-workflow` |
| `RTP-ANALYSIS-REPORT` | Topic analysis / management analysis report | 为什么发生，影响多大，建议怎么做 | 先结论 -> 看核心证据 -> 看拆解归因 -> 看对比/趋势/分群 -> 看建议/行动 -> 看附录证据 | Generated conclusion card plus one or two decisive evidence blocks | `report-prototype-implementation-workflow` |
| `RTP-DETAIL-QUERY` | Detail report / query / reconciliation table | 总量是多少，哪些明细构成，能否追溯/导出 | 先范围与汇总 -> 看明细表 -> 选行看证据/轨迹 -> 看汇总校验 -> 导出/跳转 | Filter context, summary strip, primary table/list, row detail entry | `report-prototype-implementation-workflow` |
| `RTP-RISK-MONITOR` | Risk monitor / exception monitor / warning board | 哪些对象异常，影响多大，谁处理 | 先风险等级/异常结论 -> 定位对象 -> 看影响范围 -> 看原因/时序 -> 看处置闭环 | Risk summary, exception ranking/matrix, impacted objects, action owner | `report-prototype-implementation-workflow` |
| `RTP-CLOSURE-BOARD` | Operational closure / action tracking board | 哪些事项未闭环，责任和时限是什么 | 先任务态势 -> 看逾期/阻塞 -> 看责任对象 -> 看过程进展 -> 看闭环复盘 | Status/overdue summary, action list, owner/deadline, progress signal | `report-prototype-implementation-workflow` |
| `RTP-REVIEW-EXPORT` | Review report / recap / export-oriented report | 本期结果如何，复盘材料怎么导出 | 先期间结论 -> 看目标/计划对比 -> 看关键事件/影响 -> 看经验问题 -> 导出复盘 | Period conclusion, goal comparison, event/impact evidence, export-ready section | `report-prototype-implementation-workflow` |
| `RTP-SELF-SERVICE` | Self-service analysis / exploratory workbench | 用户自己选字段后能得到什么分析结果 | 先配置问题/字段 -> 生成视图 -> 看自动结论/质量 -> 下钻探索 -> 保存/导出 | Analysis config, result preview, generated insight, quality/trust cue | `report-prototype-implementation-workflow` |
| `RTP-MIXED` | Mixed report | 同时满足多个场景但必须有一个主路径 | 先主路径 -> 插入必要的次级模块 -> 保持动作/导出闭环 | Primary pattern first viewport; secondary pattern below or secondary page | `report-prototype-implementation-workflow` |

## Pattern To Block Area Mapping

The PRD bundle must map each reading-path step to page blocks, block area configs, component slots, and registered component examples. Summarize the path in the main PRD, then put this detailed table in `CHILD-PRD-PROTOTYPE`, `prd/execution/prd-template-execution-contract.md`, and the Template Build Packet seed.

The `Block area guidance` column is not a fixed wrapper catalog. The implementation must create block area configs with `createBlockAreaConfig`; `layoutRows` determines block size, and `componentRegionPattern` only describes slot geometry.

| Path step ID | Pattern ID | Reading step | Business purpose | Recommended block role | Span guidance | Block area guidance | Component example strategy | Summary/conclusion rule | Interaction entry |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `PATH-DASH-RESULT` | `RTP-KPI-DASHBOARD` | 先结论/状态 | Make the current state unmistakable | Primary result block | Wider or taller first-viewport block when needed | Single-slot or primary-plus-evidence slot pattern | Conclusion card, KPI metric, target progress, or trend example | `RULE-*` required | KPI click, metric switch, drilldown |
| `PATH-DASH-DIAGNOSIS` | `RTP-KPI-DASHBOARD` | 看原因/结构/排名 | Explain what drives the state | Diagnostic evidence block | Medium block or row group | One chart/list slot, or chart plus ranking slot | Line/bar/combo/proportion/ranking examples | Optional `RULE-*` | Ranking click, chart point click |
| `PATH-DASH-PROCESS` | `RTP-KPI-DASHBOARD` | 看过程/趋势 | Show how the result evolved | Process block | Medium/wide trend area | Single trend slot or trend plus detail slot | Line/combo/funnel/process examples | Optional `RULE-*` | Period switch, drilldown |
| `PATH-DASH-ACTION` | `RTP-KPI-DASHBOARD` | 看动作/闭环 | Turn diagnosis into action | Action/detail block | Medium block or table band | List/table slot, optionally paired with status slot | Action list, detail table, complex table examples | Optional `RULE-*` | Drawer, jump, export |
| `PATH-COCKPIT-STATUS` | `RTP-COCKPIT` | 先总态势 | Establish large-screen command context | Dominant status block | Large first-screen block | Multi-slot status pattern when evidence must be simultaneous | KPI, radar, map/custom ECharts, ranking examples | `RULE-*` required | Fullscreen, alert click |
| `PATH-ANALYSIS-CONCLUSION` | `RTP-ANALYSIS-REPORT` | 先结论 | Give answer before evidence | Narrative conclusion block | Wider reading block | Conclusion-first slot pattern | Conclusion card plus trend/evidence example | `RULE-*` required | Evidence jump |
| `PATH-ANALYSIS-EVIDENCE` | `RTP-ANALYSIS-REPORT` | 看核心证据/拆解归因 | Prove and explain the conclusion | Evidence/attribution block | Medium/wide evidence area | Multi-slot only when comparison or driver evidence must be side by side | Trend, decomposition, comparison, table, heatmap examples | Optional `RULE-*` | Drilldown, segment switch |
| `PATH-ANALYSIS-ACTION` | `RTP-ANALYSIS-REPORT` | 看建议/行动 | Make the conclusion usable | Recommendation block | Medium block | Action recommendation slot plus optional evidence slot | Action list/conclusion/detail examples | `RULE-*` when conclusion-like | Jump, task route |
| `PATH-DETAIL-SUMMARY` | `RTP-DETAIL-QUERY` | 先范围与汇总 | Confirm query scope and totals | Summary strip/block | Compact top block or strip | KPI/source/trust slots | KPI metric, target progress, conclusion/note examples | Optional `RULE-*` | Filter/date change |
| `PATH-DETAIL-TABLE` | `RTP-DETAIL-QUERY` | 看明细表 | Show rows at authoritative grain | Primary detail block | Wide table band | Table slot should fill available width | Detail table or complex table example | Static note only unless generated insight exists | Sort, pagination, row click |
| `PATH-DETAIL-TRACE` | `RTP-DETAIL-QUERY` | 选行看证据/轨迹 | Explain one row without crowding the table | Drawer/detail component | Drawer/modal or side block | Component-owned interaction, not shell rebuild | Detail evidence/custom ECharts/list example | Optional `RULE-*` | Row drawer, jump |
| `PATH-RISK-SUMMARY` | `RTP-RISK-MONITOR` | 先风险等级/异常结论 | Identify urgent risk | Risk summary block | Medium/wide block | Warning-first slot pattern | Conclusion/warning, heatmap, ranking examples | `RULE-*` required | Alert click |
| `PATH-RISK-OBJECTS` | `RTP-RISK-MONITOR` | 定位对象/影响范围 | Decide who/what needs attention | Ranking/matrix/detail block | Medium/wide block | Ranking/table/heatmap slots | Ranking, heatmap, detail table, custom map examples | Optional `RULE-*` | Drilldown, drawer |
| `PATH-CLOSURE-STATUS` | `RTP-CLOSURE-BOARD` | 先任务态势 | Show closure pressure | Status/action block | Medium block | KPI plus action/list slot pattern | Progress/KPI/action list examples | `RULE-*` when conclusion-like | Owner/status click |
| `PATH-CLOSURE-PROCESS` | `RTP-CLOSURE-BOARD` | 看过程进展/闭环复盘 | Track execution and learning | Process/review block | Medium/wide block | Timeline/funnel/evidence slots | Funnel, line/combo, table/list examples | Optional `RULE-*` | Jump, export |
| `PATH-REVIEW-CONCLUSION` | `RTP-REVIEW-EXPORT` | 先期间结论 | Prepare review narrative | Review summary block | Wider reading block | Conclusion plus goal comparison slot | Conclusion, KPI, combo examples | `RULE-*` required | Export section |
| `PATH-REVIEW-EVIDENCE` | `RTP-REVIEW-EXPORT` | 看关键事件/影响 | Support recap and export | Evidence/detail block | Medium/wide block or table band | Event evidence plus table/chart slots | Review impact, trend, detail table examples | Optional `RULE-*` | Event drawer, export |
| `PATH-SELF-CONFIG` | `RTP-SELF-SERVICE` | 先配置问题/字段 | Let users define analysis | Configuration block | Shell/page config plus block when needed | Use existing shell/filter/template config, no custom shell | Config summary/action list/custom example as needed | none or static note | Field select, run analysis |
| `PATH-SELF-RESULT` | `RTP-SELF-SERVICE` | 生成视图/看自动结论 | Show generated result safely | Result block | Chart/table block or table band | Slot pattern chosen from generated result shape | Chart/table plus generated insight examples | `RULE-*` when insight visible | Drilldown, save, export |

## PRD Readiness Gates

- The PRD cannot be `ready-for-review` unless the main PRD summarizes one primary report path and `CHILD-PRD-PROTOTYPE` / `prd/execution/prd-template-execution-contract.md` names one primary `RTP-*` pattern or a justified `RTP-MIXED` primary-plus-secondary structure.
- Every visible page block in `prd/execution/prd-template-execution-contract.md` / Template Build Packet must trace back to a path step in `CHILD-PRD-PROTOTYPE` or `prd/execution/prd-template-execution-contract.md`.
- The first viewport must implement the first one or two steps of the selected report-type reading path.
- If the user supplied a report implementation idea, the main PRD must summarize whether it is `accepted`, `optimized`, `rejected`, or `needs-confirmation`, and `CHILD-PRD-PROTOTYPE` / `prd/execution/prd-template-execution-contract.md` must hold the detailed validation.
- If attachments were provided, the PRD bundle must show which attachment facts shaped the chosen report type, module order, and block area mapping.
- Section 4A must not name a retired fixed-size wrapper as ready. Large spans and table bands are only ready when `templateAssetUnderstandingMap` proves a dynamic slot pattern config.
- Do not map a detail-query report as a conclusion-first dashboard unless the primary user task is management judgment rather than row lookup.
- Do not map a dashboard as a dense table-first report unless the user explicitly asks for reconciliation/detail-first behavior.
- Do not add secondary pattern modules before the primary pattern answers its main question.
