# PRD Output Structure

Use this reference when writing the final PRD bundle. The output must be development-ready, but the reader-facing main PRD must stay short.

The PRD bundle has three layers:

1. Main PRD: human-readable decision brief.
2. Execution appendices: dense reusable contracts and matrices.
3. Child PRDs: stage-specific AI execution documents for 原型、前端、后端、技术方案、测试.

Read `main-prd-minimal-contract.md` before this file. It is the binding rule for what belongs in the main PRD.

## Main PRD Rules

- The main PRD uses readable Chinese names for report type, navigation pages, blocks, metrics, controls, and interactions.
- Raw codes such as `RTP-*`, `PATH-*`, `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, `MEET-*`, `PAGE-*`, `BLK-*`, `SLOT-*`, `MET-*`, `API-*`, and `RULE-*` are execution handles. Keep them out of headings and out of primary prose.
- If an ID must appear in the main PRD, put it after the readable name or in a final column named `开发引用ID`.
- Every retained navigation page must have a Markdown/mermaid preview before any template/layout summary.
- Do not put full metric formulas, `layoutRows`, API field tables, interaction maps, conclusion rule maps, workflow matrices, or Template Build Packet sections in the main PRD.
- The main PRD must include a child PRD registry and final stage map, but not the full child PRD bodies.

## Required Main PRD Sections

The main PRD may contain only these reader-facing sections.

### 0. 文档摘要

Use one compact table:

| 字段 | 内容 |
| --- | --- |
| 文档名称 | Business report name. |
| 版本/状态 | `v0.1` plus `draft`, `ready-for-review`, or `blocked`. |
| 需求来源 | User request, attachment, meeting note, screenshot, existing page, metric list. |
| 确认事实 | Facts directly supported by input. |
| 推断假设 | Safe assumptions. |
| 关键缺口 | Only top blockers; full gap list goes to appendices/child PRDs. |

### 0A. 子 PRD 索引与阶段使用说明

Use one short table. This is an index, not the child PRD body.

| 阶段 | 使用子 PRD | 子 PRD 作用 | 主 PRD 变更后的同步规则 |
| --- | --- | --- | --- |
| 原型 | `CHILD-PRD-PROTOTYPE` | 配置模板、页面、分块、槽位、组件、交互、动态结论和数据摘要。 | 页面、布局、指标、API、交互、结论或模板规则变化时同步。 |
| 前端 | `CHILD-PRD-FRONTEND` | 指导路由、组件、接口适配、状态、权限、格式化和运行 QA。 | 页面、组件、API、权限、状态或格式化变化时同步。 |
| 后端 | `CHILD-PRD-BACKEND` | 指导数据对象、指标计算、API、权限、缓存、导出和错误处理。 | 指标、数据源、字段、筛选、权限、导出或接口变化时同步。 |
| 技术方案 | `CHILD-PRD-TECHNICAL-SOLUTION` | 指导系统边界、架构、环境、NFR、风险和实施计划。 | 范围、架构、环境、NFR 或风险变化时同步。 |
| 测试 | `CHILD-PRD-TESTING` | 指导测试矩阵、联调、权限、导出、异常、证据和回归。 | 验收、交互、API、权限、数据规则或异常状态变化时同步。 |

### 1. 背景与目标

Explain why the report exists, who uses it, what management problem it solves, and what success means. Keep it to 3-6 bullets or one compact table.

### 2. 用户与场景

Use one role table and optional scenario bullets:

| 角色 | 关注内容 | 主要操作 | 权限范围 | 输出/动作 |
| --- | --- | --- | --- | --- |

### 3. 一期范围边界

Separate:

- 本期做.
- 本期不做.
- 延后做.
- 敏感数据/权限边界.

Also state the prototype output boundary in plain language: runnable prototypes default to copying the selected bundled `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` template project. HTML/static or new Vue3 project output requires an explicit exception.

### 4. 报表实现思路

Write the selected report type and reading path in natural language.

| 报表类型 | 推荐阅读顺序 | 为什么适合 | 需要校验的点 |
| --- | --- | --- | --- |

If the user supplied an implementation thought, validate it:

| 用户想法 | 判断 | 优化建议 | 原因 |
| --- | --- | --- | --- |

Detailed `RTP-*`, `PATH-*`, `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, and `MEET-*` rows go to `CHILD-PRD-PROTOTYPE`, `CHILD-PRD-TESTING`, and execution appendices.

### 5. 导航页与页面预览

Show the navigation/page relationship first:

```mermaid
flowchart LR
  A["总览页"] --> B["原因诊断页"]
  B --> C["闭环跟踪页"]
  C --> D["明细查询页"]
```

Then write one preview per retained navigation page:

```mermaid
flowchart TB
  F["筛选区：期间 / 业务线 / 区域"]
  T["工具栏：刷新 / 导出 / 全屏"]
  subgraph V["首屏：结论 -> 原因 -> 过程 -> 动作"]
    B1["核心结论：当前是否健康、风险在哪里"]
    B2["关键指标：满意度 / 投诉率 / 闭环率"]
    B3["原因排名：业务线或问题类型Top风险"]
    B4["趋势：近12个月变化"]
    B5["动作：待闭环与超期事项"]
  end
  F --> B1
  F --> B2
  B1 --> B3
  B3 --> B5
```

Add a compact table after each preview:

| 页面区域 | 展示内容 | 模板使用 | 交互入口 | 说明 |
| --- | --- | --- | --- | --- |
| 筛选区 | 日期、业务线、区域 | 框架模板筛选区 | 切换后刷新页面 | 不自建筛选栏 |
| 核心结论 | 前端按数据生成结论和证据 | 分块布局 + 结论组件内容区模板 | 点击查看证据 | 结论不是固定文案 |

### 6. 模板布局摘要

Keep this section understandable. Do not write the full machine layout here.

| 页面 | 框架模板 | 页面分区 | 主要分块 | 分块模板摘要 | 槽位摘要 | 模板资产状态 |
| --- | --- | --- | --- | --- | --- | --- |

Rules:

- Show `12*K` section split such as `12*2 + 12*3 + 12*3`.
- State that total page rows must be at least 8 and every row is exactly 12 columns.
- Use readable block coordinates only as examples: `R-B` for block, `R-B-S` for component slot.
- Mention selected direct block templates and slot patterns such as `AB`, `AAB`, or `AABBCC`.
- Move full `templateAssetUnderstandingMap`, `layoutRows`, block map, standard area config, component slot map, component content area template map, and validation rows to `CHILD-PRD-PROTOTYPE` and Appendix A/G.

### 7. 指标、数据与交互摘要

Use one summary table:

| 主题 | 主体内容 | 页面/位置 | 数据或规则来源 | 子 PRD 负责方 |
| --- | --- | --- | --- | --- |
| 核心指标 | Metric names, business meaning, direction | Page/block summary | Appendix B | 原型、前端、后端、测试 |
| 数据/API | API groups and data domains | Pages that call them | Appendix C | 前端、后端、技术方案、测试 |
| 交互 | Filters, pills, ranking click, drilldown, jump, drawer/popup/modal, export | Visible locations | Appendix D | 原型、前端、测试 |
| 动态结论 | Summary areas and conclusion cards generated from data | Target blocks/components | Appendix E | 原型、前端、测试 |

Keep complete metric formulas, denominator/sample size, null rules, source lineage, API fields, interaction payloads, and conclusion rule logic out of the main PRD.

### 8. 验收标准与待确认

Use short, testable rows:

| 验收项 | 验收标准 | 证据 | 状态 |
| --- | --- | --- | --- |

| 待确认问题 | 影响范围 | 建议提问对象 | 阻塞等级 |
| --- | --- | --- | --- |

## Execution Appendices

The execution appendices are mandatory when the PRD feeds implementation, but they must not dominate the main PRD.

| Appendix | Purpose | Main consumers |
| --- | --- | --- |
| Appendix A. Template execution contract | `templateAssetUnderstandingMap`, `layoutSectionMap`, `layoutRows`, `layoutCoordinateMap`, direct block template availability, block map, standard area config, component slot map, component content area template map, visual-type size compatibility. | 原型 |
| Appendix B. Metric dictionary and mounting matrix | Full metric口径, formula, unit, direction, source, refresh, denominator/sample, null rule, page/block/slot/API mounting. | 原型、前端、后端、测试 |
| Appendix C. Data object and API contracts | Data grain, dimensions, fields, request/response, permissions, pagination/sort, cache/freshness, empty/error, lineage. | 前端、后端、技术方案、测试 |
| Appendix D. Filter, pill, toolbar, and interaction maps | `filterSurfaceMap`, `pillAreaConfig`, `toolbarActionMap`, `interactionBehaviorMap`, drilldown/jump/drawer/popup/modal/export behavior. | 原型、前端、测试 |
| Appendix E. Dynamic conclusion rules | `conclusionRuleMap` for summary areas, conclusion cards, and analysis insight components. | 原型、前端、测试 |
| Appendix F. PRD-to-workflow execution matrix | Every PRD section, appendix, child PRD, and executable ID mapped to downstream owner, artifact, blocker, status. | All stages |
| Appendix G. Template Build Packet seed | Fixed packet sections from `report-prototype-template-management/references/template-build-packet-contract.md`. | 原型 |

## Child PRD Bundle

The final PRD output must include all five child PRD bodies, either as Appendix H-L in one Markdown document or as five actual files listed in the main PRD.

| Child PRD | Stage | Required detail |
| --- | --- | --- |
| Appendix H / `CHILD-PRD-PROTOTYPE` | 原型 | Full template/layout/slot/component/conclusion/interaction packet, Template Build Packet seed, prototype data summary expectation. |
| Appendix I / `CHILD-PRD-FRONTEND` | 前端 | Route/component/API adapter/state/permission/formatter/runtime QA contract. |
| Appendix J / `CHILD-PRD-BACKEND` | 后端 | Data objects, source mapping, metric computation, endpoints, cache, export, security, errors. |
| Appendix K / `CHILD-PRD-TECHNICAL-SOLUTION` | 技术方案 | Architecture, system boundary, technology choices, data flow, NFR, environment, risks, plan. |
| Appendix L / `CHILD-PRD-TESTING` | 测试 | Test matrix, expected frontend/API/data results, permissions, export, visual/runtime evidence, regression. |

Every child PRD must include:

1. Common child header.
2. Parent sections consumed.
3. Stage execution input table.
4. Stage-specific contract.
5. Relevant data/API/interaction/conclusion/permission inputs.
6. Blocking gaps and sync status.
7. Downstream start gate.

Do not copy the full main PRD into every child PRD. Child PRDs refine execution only; they must not override the main PRD's business goal, scope, roles, or acceptance.

## Appendix ID Rules

Use stable IDs in execution appendices and child PRDs so downstream agents can reference the same objects:

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
| Child PRD | `CHILD-PRD-` | `CHILD-PRD-PROTOTYPE` |
| Gap | `GAP-` | `GAP-METRIC-SOURCE-NPS` |

Rules:

- Use the same IDs in all appendices and child PRDs.
- Do not leave required fields blank.
- Use `TBD(GAP-*)` when a missing value affects implementation, validation, permission, or delivery.
- Use `none` only when a field is truly not applicable.

## Readiness Gates

- The main PRD is invalid if it is dominated by raw IDs or dense execution tables.
- The PRD bundle is invalid if any of the five child PRD bodies is missing, reduced to a filename, or replaced by the child registry/stage map.
- The PRD bundle is invalid if section 0A and the child PRD bundle disagree on child PRD IDs, purposes, sync status, or blocking gaps.
- The PRD bundle is invalid if a retained navigation page lacks a Markdown/mermaid preview with filters, toolbar actions, major blocks, block business content, and interaction entries.
- A template-backed PRD is not ready when Appendix A/G or `CHILD-PRD-PROTOTYPE` lacks `templateAssetUnderstandingMap`, exact-12 and minimum-8 layout proof, selected direct block templates, component slot size, visual-type size compatibility, or component content area template evidence.
- A template-backed PRD is not ready when it selects a size-only `SpanCCxRRLayout.vue` wrapper as a complete block layout template.
- A conclusion-bearing PRD is not ready when summary areas, conclusion cards, or analysis insight components contain fixed business conclusions without `RULE-*` frontend generation rules.
- A runnable prototype PRD is not ready when it routes to HTML/static output because the PRD or source material mentions HTML. Default to `vueTemplatePrototype` with `implementationMode: copyTemplateProject` unless the latest explicit user request says otherwise.
- A runnable prototype PRD is not ready when it defaults to a new Vue3 project. `newVue3Project` requires a self-developed/non-template exception, rejected copy candidates, owner, and readiness impact.
- Parent PRD changes must update affected child PRDs in the same delivery or mark them `stale` with a `GAP-*`.
