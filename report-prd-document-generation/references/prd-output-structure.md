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

### 5. 页面布局配置

Follow `template-layout-prd-contract.md`. This section must include:

- Framework template choice.
- Existing shell configuration: title, filters, navigation, toolbar/export, permission entry.
- Page `layoutRows` or equivalent block map.
- Block layout template map.
- Standard area config for every block.
- Component slot/component content area template map.
- Layout acceptance notes.

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

### 12. PRD-to-workflow 执行矩阵

Follow `prototype-workflow-execution-map.md`. The PRD must prove that every section is executable by downstream workflow skills.

Use:

| PRD section | Executable IDs | Downstream owner skill/workflow | Execution artifact | Blocking rule | Status |
| --- | --- | --- | --- | --- | --- |

Rules:

- Every PRD section from 0 to 11 must have at least one row.
- Every `PAGE-*`, `BLK-*`, `MET-*`, `API-*`, `INT-*`, and `ROLE-*` that appears in earlier sections must be consumed by at least one execution row.
- `Status` can be `ready`, `draft`, `blocked`, or `deferred-out-of-scope`.
- A prototype workflow can start only when no execution row needed by the first design/layout/template step is `blocked`.
