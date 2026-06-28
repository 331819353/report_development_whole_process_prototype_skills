# PRD Output Structure

Use this reference when writing the final PRD. The output must be a development-ready Markdown PRD, not a loose requirement summary.

## ID Rules

Use stable IDs so downstream agents can reference the same objects:

| Object | Prefix | Example |
| --- | --- | --- |
| Page | `PAGE-` | `PAGE-OVERVIEW` |
| Page block | `BLK-` | `BLK-HEALTH-KPI` |
| Component slot | `SLOT-` | `SLOT-HEALTH-KPI-A` |
| Metric | `MET-` | `MET-NPS` |
| Data object | `OBJ-` | `OBJ-EXPERIENCE-MONTHLY` |
| API | `API-` | `API-OVERVIEW-SUMMARY` |
| Interaction | `INT-` | `INT-BIZLINE-SWITCH` |
| Role | `ROLE-` | `ROLE-GROUP-MANAGER` |
| Dynamic conclusion rule | `RULE-` | `RULE-HEALTH-RISK-SUMMARY` |
| Report type implementation path | `RTP-` / `PATH-` | `RTP-KPI-DASHBOARD`, `PATH-DASH-RESULT` |
| Executive satisfaction gate | `ESG-` | `ESG-GROUP-MGMT-DECISION` |
| Priority/severity rule | `SEV-` | `SEV-EXPERIENCE-RISK-HIGH` |
| Action closure item | `ACT-` | `ACT-RISK-CLOSURE-OWNER` |
| Trust/source item | `TRUST-` | `TRUST-NPS-SOURCE-FRESHNESS` |
| Meeting/export item | `MEET-` | `MEET-MONTHLY-REVIEW-EXPORT` |
| Gap | `GAP-` | `GAP-METRIC-SOURCE-NPS` |

Rules:

- Use the same IDs in all sections.
- Do not leave required fields blank.
- Use `TBD(GAP-*)` when a missing value affects implementation, validation, permission, or delivery.
- Use `none` only when a field is truly not applicable.

## Required PRD Headings

### 0. 文档元信息

Include:

| Field | Requirement |
| --- | --- |
| 文档名称 | Business report name, not a generic "PRD". |
| 版本 | Use a simple version such as `v0.1`. |
| 状态 | `draft`, `ready-for-review`, or `blocked`. |
| 需求来源 | User request, meeting note, screenshot, existing page, metric list, etc. |
| 适用阶段 | Usually phase-one report development. |
| 主要输出 | PRD, template layout contract, metric matrix, API requirements, interaction rules. |
| 确认事实 | Facts directly supported by input. |
| 推断假设 | Safe assumptions made by the writer. |
| 待确认缺口 | `GAP-*` list. |

### 1. 需求背景与目标

Answer:

- Why build this report/dashboard now.
- Who will use it.
- What management decision, risk, tracking, closure, review, export, or operational problem it solves.
- What success looks like after release.

Use this table:

| Item | Content |
| --- | --- |
| 背景 | Why the current process/data/product is insufficient. |
| 目标用户 | Main users and decision owners. |
| 管理问题 | The concrete problem to solve. |
| 业务目标 | What users can judge, discover, track, export, or close. |
| 成功标准 | Observable outcome or acceptance signal. |

### 2. 用户角色与使用场景

Create a role matrix:

| Role ID | 角色 | 关注内容 | 主要操作 | 权限范围 | 输出/动作 |
| --- | --- | --- | --- | --- | --- |

Common roles include group management, business-line owner, experience/operator, data analyst, system administrator, and auditor/reviewer. Adapt names to the user's domain.

Then create a scene matrix:

| Scene ID | 场景 | 触发时机 | 使用角色 | 关键问题 | 页面入口 | 后续动作 |
| --- | --- | --- | --- | --- | --- | --- |

### 3. 开发范围边界

Use separate tables for in scope, out of scope, and phase split:

| Scope ID | 一期范围 | 说明 | 依赖 | 验收方式 |
| --- | --- | --- | --- | --- |

| Exclusion ID | 本期不做 | 原因 | 后续阶段 |
| --- | --- | --- | --- |

Explicitly decide whether phase one includes or excludes:

- Dashboard display.
- Filters.
- Export.
- Permission/data scope.
- Drilldown/detail.
- Metric口径 display.
- Metric maintenance backend.
- Work order handling.
- Sensitive personal detail.
- Real-time data.
- Mobile adaptation.

### 4. 页面内容

Describe page business content before layout. Use:

| Content ID | 页面/导航 | 内容模块 | 业务问题 | 关键指标/维度 | 表现形式 | 角色可见性 |
| --- | --- | --- | --- | --- | --- | --- |

Required content categories for management reports:

- 数据概览.
- 核心结论.
- KPI.
- 趋势.
- 排名.
- 问题类型.
- 闭环情况.
- 业务线专属内容.
- 明细/证据/钻取入口 when needed.
- 导出/复盘内容 when needed.

### 4A. 报表类型实现思路与分块布局映射

Follow `report-type-implementation-patterns.md`. This section must decide how the report should be read before section 5 decides the final page grid and block templates.

If attachments exist, include evidence intake:

| Source ID | Source type | Filename or description | Key facts extracted | Sections affected | Confidence | Gaps raised |
| --- | --- | --- | --- | --- | --- | --- |

If the user supplies a report implementation thought, validate it:

| Idea ID | User-provided report thought | Fit result | Validation dimensions | Recommended adjustment | Reason | User confirmation needed |
| --- | --- | --- | --- | --- | --- | --- |

Choose one primary report-type pattern:

| Pattern selection ID | Primary `RTP-*` pattern | Secondary pattern if mixed | Core management question | Recommended reading path | First viewport priority | Why this is the best path | Downstream workflow |
| --- | --- | --- | --- | --- | --- | --- | --- |

Map the selected reading path to block-layout intent:

| Path step ID | Reading step | Business purpose | Page/Block IDs | First-viewport order | Recommended span | Selected block layout template | Component slot strategy | Dynamic conclusion rule IDs | Interaction IDs | Acceptance note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Use `RTP-*` for the report type pattern and `PATH-*` for reading-path steps.
- The first viewport must implement the first one or two path steps of the selected report type.
- Every visible page block in section 5 must trace to a `PATH-*` row unless it is a support/source/export/permission-only block.
- If the user's proposed thought is optimized or rejected, explain what changed and why the recommended path better serves the role, decision, data grain, and template constraints.
- For dashboards and cockpits, prefer result/status before cause, process, and action.
- For analysis reports, prefer conclusion before evidence, attribution, comparison, and recommendation.
- For detail reports, prefer scope/summary and the authoritative detail table before row trace, validation, and export.
- For risk monitors, prefer risk severity and impacted objects before cause and closure.
- For closure/action boards, prefer task status and overdue pressure before owner progress and review.
- For review/export reports, prefer period conclusion and goal/event evidence before export packaging.
- For self-service analysis, prefer configuration and generated result before interpretation, drilldown, and save/export.

### 4B. 管理层满意度辅助设计

Follow `executive-satisfaction-design-gate.md`. This section is required for management-facing reports and optional only for pure analyst/operator detail queries with no management decision, review, or circulation use.

Create the executive decision profile:

| ESG ID | Role/level | Decision to make | 3-second answer | 30-second cause path | 3-minute action | Decision owner | Evidence needed | Blocker/gap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Create the first-viewport conclusion quality map:

| ESG ID | Conclusion target | Rule ID | Direction | Magnitude | Object/scope | Likely reason | Business impact | Recommended action | Evidence fields | Failure condition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Create the management-vs-technical metric language map:

| ESG ID | Metric ID | Management wording | Technical definition pointer | Formula/owner | Page expression | Detail/tooltip path |
| --- | --- | --- | --- | --- | --- | --- |

Create the priority/severity model when the report has risk, warning, anomaly, overdue, target-miss, exception, or closure content:

| SEV ID | Trigger rule/RULE | Severity | Impact measure | Urgency | Priority sort | Color/non-color cue | Owner/escalation | Empty/conflict rule |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Create the action closure model when the report raises problems, risks, tasks, or recommendations:

| ACT ID | Source risk/conclusion | Owner | Due date/SLA | Status | Next action | System entry | Closure evidence | Overdue rule |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Create the trust/source model:

| TRUST ID | Data/source item | Source system | Freshness | Coverage/sample | Missing/null policy | Reconciliation/baseline | Permission masking | Source detail route |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Create the meeting/review/export model when the report supports review, monthly/quarterly meeting, circulation, or export:

| MEET ID | Scenario | Meeting/review use | Export format | Included conclusion/evidence/action | Filter snapshot | Audience | Audit/watermark |
| --- | --- | --- | --- | --- | --- | --- | --- |

Create the executive satisfaction checklist:

| ESG ID | Check question | Evidence | Pass rule | Gap code |
| --- | --- | --- | --- | --- |

Rules:

- Management-facing dashboards, cockpits, analysis reports, risk monitors, closure boards, and review/export reports must have at least one `ESG-*` row.
- The first viewport must answer the primary management question in 3 seconds; the 30-second cause path and 3-minute action must trace to `PATH-*`, `BLK-*`, `MET-*`, `RULE-*`, `INT-*`, and when relevant `ACT-*` IDs.
- Conclusions must be data-driven through `RULE-*`; section 4B validates conclusion quality but does not replace section 5A rules.
- Section 5 page layout must map `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, and `MEET-*` IDs to blocks, slots, summary areas, interactions, or export behavior.
- For detail reports, section 4B may emphasize query efficiency, row identity, trust/source, export/audit, and row-level action instead of conclusion-first management reading.

### 5. 页面布局配置

Follow `template-layout-prd-contract.md`. This section must include:

- Framework template choice.
- Existing shell configuration: title, filters, navigation, toolbar/export, permission entry.
- Page `layoutRows` or equivalent block map.
- Block layout template map traced to section 4A `PATH-*` steps and section 4B `ESG-*` / `SEV-*` / `ACT-*` / `TRUST-*` / `MEET-*` IDs when applicable.
- Standard area config for every block.
- Component slot/component content area template map.
- `conclusionRuleMap` bindings for any summary-area conclusion, conclusion card, or analysis insight component.
- Layout acceptance notes.

### 5A. Dynamic Conclusion Generation Rules

Summary areas and conclusion cards are not fixed copy. When the page shows a business conclusion, the PRD must define how frontend derives it from current data after filters, date/period switches, metric switches, permission scope, drilldown state, or API refresh.

Use this table:

| Rule ID | Display target | Page/Block/Slot | Area or component template | Input metrics/API fields | Trigger state | Rule logic and threshold | Output fields or sentence template | Evidence fields | Priority/severity | Empty/null/insufficient-data rule | Permission/masking rule | QA case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Use `RULE-*` IDs and reference them from `summaryAreaConfig`, conclusion-card slots, `analysisInsightContract`, metric mounting rows, and the PRD-to-workflow execution matrix.
- `4 summaryArea` may render a dynamic narrative conclusion only when the same block has no conclusion card/component. Its config must include `conclusionRuleId`, input bindings, refresh triggers, and fallback copy.
- Conclusion cards and analysis insight components must compute their visible conclusion from bound data using `conclusionRuleId` or `analysisInsightContract`. Do not put the final generated conclusion sentence into the PRD as fixed copy.
- Static text is allowed only for source, scope, caveat, definition, action-note label, loading, empty, permission-denied, or insufficient-data fallback.
- Rule logic must specify comparison baseline, threshold, ranking/top-N rule, trend direction, priority when multiple rules match, and the evidence fields shown or linked with the conclusion.
- Null and denominator-zero behavior must be compatible with the metric null rules in section 6.

### 6. 指标清单

Follow `metric-api-interaction-matrices.md`. Every displayed metric and every API-returned metric that drives display must have a complete row.

### 7. 指标挂载矩阵

Follow `metric-api-interaction-matrices.md`. Every metric in the display must be mounted to an exact page/block/slot/component/API path.

### 8. 数据与 API 需求

Follow `metric-api-interaction-matrices.md`. Define data objects first, then interfaces.

### 9. 交互逻辑

Follow `metric-api-interaction-matrices.md`. Include both successful response and loading/empty/error/permission behavior.

### 10. 权限、安全、导出与异常状态

Include when relevant:

| Item ID | 类型 | 规则 | 影响页面/接口 | 验收方式 |
| --- | --- | --- | --- | --- |

Cover:

- Role-based visibility.
- Business-line data scope.
- Sensitive data masking or exclusion.
- Export scope and file fields.
- Empty data.
- Partial data.
- API failure.
- Permission denial.
- Audit/logging if required.

### 11. 验收标准与待确认问题

Use:

| Acceptance ID | 验收项 | 验收标准 | 证据 | 状态 |
| --- | --- | --- | --- | --- |

Use:

| Gap ID | 待确认问题 | 影响范围 | 建议提问对象 | 阻塞等级 |
| --- | --- | --- | --- | --- |

Readiness rules:

- `ready-for-review` requires no blank required cells and no unowned critical gaps.
- `blocked` is required when core metric definitions, permission scope, page count, framework template, or data source cannot be inferred safely.
- `draft` is acceptable when implementation can continue with documented `TBD(GAP-*)` fields.
- The PRD cannot be `ready-for-review` when section 4A lacks attachment intake for provided files, user-thought validation when applicable, one primary `RTP-*` pattern, reading path, first-viewport plan, and path-step-to-block-layout mapping.
- The PRD cannot be `ready-for-review` for a management-facing report when section 4B lacks `ESG-*` decision profile, first-viewport 3-second answer, 30-second cause path, 3-minute action or explicit non-action reason, required `SEV-*` severity, required `ACT-*` closure, `TRUST-*` source/freshness, or required `MEET-*` review/export behavior.
- The PRD cannot be `ready-for-review` when any `summaryArea`, conclusion card, or analysis insight component displays a business conclusion without a `RULE-*` row and frontend generation rule.

### 12. PRD-to-workflow 执行矩阵

Follow `prototype-workflow-execution-map.md`. The PRD must prove that every section is executable by downstream workflow skills.

Use:

| PRD section | Executable IDs | Downstream owner skill/workflow | Execution artifact | Blocking rule | Status |
| --- | --- | --- | --- | --- | --- |

Rules:

- Every PRD section from 0 to 11, including sections 4A, 4B, and 5A, must have at least one row.
- Every `PAGE-*`, `BLK-*`, `MET-*`, `API-*`, `INT-*`, `ROLE-*`, `RTP-*`, `PATH-*`, `RULE-*`, `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, and `MEET-*` that appears in earlier sections must be consumed by at least one execution row.
- `Status` can be `ready`, `draft`, `blocked`, or `deferred-out-of-scope`.
- A prototype workflow can start only when no execution row needed by the first design/layout/template step is `blocked`.
