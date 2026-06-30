# PRD Output Structure

Use this reference when writing the final PRD bundle. The output must be a development-ready multi-file PRD package. Do not output a single Markdown PRD file.

The PRD package has three file groups:

1. `prd-main.md`: human-readable decision brief.
2. `execution/*.md`: dense reusable execution contracts and matrices.
3. `children/*.md`: stage-specific AI execution PRDs for 原型、前端、后端、技术方案、测试.

Read `main-prd-minimal-contract.md` before this file. It is the binding rule for what belongs in `prd-main.md`.

## Required File Tree

Every complete PRD delivery must create or output this file tree. File names are fixed.

```text
prd/
  prd-main.md
  execution/
    prd-template-execution-contract.md
    prd-metric-dictionary-and-mounting.md
    prd-data-api-contract.md
    prd-interaction-contract.md
    prd-conclusion-rules.md
    prd-workflow-execution-matrix.md
    prd-template-build-packet-seed.md
  children/
    prd-child-prototype.md
    prd-child-frontend.md
    prd-child-backend.md
    prd-child-technical-solution.md
    prd-child-testing.md
```

Rules:

- Do not offer any single-file PRD alternative.
- Do not use supplemental sections to replace required files.
- Do not replace a required file with a section inside `prd-main.md`.
- The logical file tree is invariant. Any generated package or rendered view may only wrap these files; it must not merge files, rename paths, omit bodies, or replace required files with appendices.
- If writing files is not available in the current channel, output each file with a clear filename heading and full body, using the fixed paths above. This is serialized fixed file output, not an alternative PRD structure.
- `prd-main.md` must list every required file path and sync status.

## Main PRD Rules

- `prd-main.md` uses readable Chinese names for report type, navigation pages, blocks, metrics, controls, and interactions.
- Raw codes such as `RTP-*`, `PATH-*`, `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, `MEET-*`, `PAGE-*`, `BLK-*`, `SLOT-*`, `MET-*`, `API-*`, and `RULE-*` are execution handles. Keep them out of headings and out of primary prose.
- If an ID must appear in `prd-main.md`, put it after the readable name or in a final column named `开发引用ID`.
- Every retained navigation page must have a Markdown/mermaid preview before any template/layout summary.
- Do not put full metric formulas, `layoutRows`, API field tables, interaction maps, conclusion rule maps, workflow matrices, or Template Build Packet sections in `prd-main.md`.
- `prd-main.md` must include the child PRD registry, execution-file registry, and final stage map, but not the full child PRD bodies.

## Required `prd-main.md` Sections

`prd-main.md` may contain only these reader-facing sections.

### 0. 文档摘要

Use one compact table:

| 字段 | 内容 |
| --- | --- |
| 文档名称 | Business report name. |
| 版本/状态 | `v0.1` plus `draft`, `ready-for-review`, or `blocked`. |
| 需求来源 | User request, attachment, meeting note, screenshot, existing page, metric list. |
| 确认事实 | Facts directly supported by input. |
| 推断假设 | Safe assumptions. |
| 关键缺口 | Only top blockers; full gap list goes to execution files and child PRDs. |

### 0A. PRD 文件清单与阶段使用说明

Use one short table. This is an index, not the child PRD body.

| 阶段 | 必读文件 | 文件作用 | 主 PRD 变更后的同步规则 |
| --- | --- | --- | --- |
| 原型 | `children/prd-child-prototype.md`, `execution/prd-template-execution-contract.md`, `execution/prd-template-build-packet-seed.md` | 配置模板、页面、分块、槽位、组件、交互、动态结论和数据摘要。 | 页面、布局、指标、API、交互、结论或模板规则变化时同步。 |
| 前端 | `children/prd-child-frontend.md`, `execution/prd-data-api-contract.md`, `execution/prd-interaction-contract.md`, `execution/prd-conclusion-rules.md` | 指导路由、组件、接口适配、状态、权限、格式化和运行 QA。 | 页面、组件、API、权限、状态或格式化变化时同步。 |
| 后端 | `children/prd-child-backend.md`, `execution/prd-metric-dictionary-and-mounting.md`, `execution/prd-data-api-contract.md` | 指导数据对象、指标计算、API、权限、缓存、导出和错误处理。 | 指标、数据源、字段、筛选、权限、导出或接口变化时同步。 |
| 技术方案 | `children/prd-child-technical-solution.md` plus all execution files when relevant | 指导系统边界、架构、环境、NFR、风险和实施计划。 | 范围、架构、环境、NFR 或风险变化时同步。 |
| 测试 | `children/prd-child-testing.md`, all execution files, stage outputs | 指导测试矩阵、联调、权限、导出、异常、证据和回归。 | 验收、交互、API、权限、数据规则或异常状态变化时同步。 |

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

Detailed `RTP-*`, `PATH-*`, `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, and `MEET-*` rows go to `children/prd-child-prototype.md`, `children/prd-child-testing.md`, and execution files.

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
| 核心结论 | 前端按数据生成结论和证据 | 分块布局 + 结论组件示例 | 点击查看证据 | 结论不是固定文案 |

### 6. 模板布局摘要

Keep this section understandable. Do not write the full machine layout here.

| 页面 | 框架模板 | 页面分区 | 主要分块 | 分块模板摘要 | 槽位摘要 | 模板资产状态 |
| --- | --- | --- | --- | --- | --- | --- |

Rules:

- Show `12*K` section split such as `12*2 + 12*3 + 12*3`.
- State that total page rows must be at least 8 and every row is exactly 12 columns.
- Use readable block coordinates only as examples: `R-B` for block, `R-B-S` for component slot.
- Mention block area configs and slot patterns such as `AB`, `AAB`, or `AABBCC`.
- Move full `templateAssetUnderstandingMap`, `layoutRows`, block map, standard area config, component slot map, registered component example map, and validation rows to `execution/prd-template-execution-contract.md`, `execution/prd-template-build-packet-seed.md`, and `children/prd-child-prototype.md`.

### 7. 指标、数据与交互摘要

Use one summary table:

| 主题 | 主体内容 | 页面/位置 | 详细文件 | 子 PRD 负责方 |
| --- | --- | --- | --- | --- |
| 核心指标 | Metric names, business meaning, direction | Page/block summary | `execution/prd-metric-dictionary-and-mounting.md` | 原型、前端、后端、测试 |
| 数据/API | API groups and data domains | Pages that call them | `execution/prd-data-api-contract.md` | 前端、后端、技术方案、测试 |
| 交互 | Filters, pills, ranking click, drilldown, jump, drawer/popup/modal, export | Visible locations | `execution/prd-interaction-contract.md` | 原型、前端、测试 |
| 动态结论 | Summary areas and conclusion cards generated from data | Target blocks/components | `execution/prd-conclusion-rules.md` | 原型、前端、测试 |

Keep complete metric formulas, denominator/sample size, null rules, source lineage, API fields, interaction payloads, and conclusion rule logic out of `prd-main.md`.

### 8. 验收标准与待确认

Use short, testable rows:

| 验收项 | 验收标准 | 证据 | 状态 |
| --- | --- | --- | --- |

| 待确认问题 | 影响范围 | 建议提问对象 | 阻塞等级 |
| --- | --- | --- | --- |

## Execution Files

The execution files are mandatory when the PRD feeds implementation, but they are separate files under `prd/execution/`, not sections inside `prd-main.md`.

| File | Purpose | Main consumers |
| --- | --- | --- |
| `execution/prd-template-execution-contract.md` | `templateAssetUnderstandingMap`, `layoutSectionMap`, `layoutRows`, `layoutCoordinateMap`, block area config availability, block map, standard area config, component slot map, registered component example map, visual-type size compatibility. | 原型 |
| `execution/prd-metric-dictionary-and-mounting.md` | Full metric口径, formula, unit, direction, source, refresh, denominator/sample, null rule, page/block/slot/API mounting. | 原型、前端、后端、测试 |
| `execution/prd-data-api-contract.md` | Data grain, dimensions, fields, request/response, permissions, pagination/sort, cache/freshness, empty/error, lineage. | 前端、后端、技术方案、测试 |
| `execution/prd-interaction-contract.md` | `filterSurfaceMap`, `pillAreaConfig`, `toolbarActionMap`, `interactionBehaviorMap`, drilldown/jump/drawer/popup/modal/export behavior. | 原型、前端、测试 |
| `execution/prd-conclusion-rules.md` | `conclusionRuleMap` for summary areas, conclusion cards, and analysis insight components. | 原型、前端、测试 |
| `execution/prd-workflow-execution-matrix.md` | Every PRD file, executable ID, downstream owner, artifact, blocker, and status. | All stages |
| `execution/prd-template-build-packet-seed.md` | Fixed packet sections from `report-prototype-template-management/references/template-build-packet-contract.md`. | 原型 |

## Child PRD Files

The final PRD output must include `prd/children/prd-child-prototype.md`. Generate the other child PRD files only when the current scope includes frontend integration, backend/API implementation, technical solution, or testing handoff.

| Child PRD | Stage | Required detail |
| --- | --- | --- |
| `children/prd-child-prototype.md` | 原型 | Required. Full template/layout/slot/component/conclusion/interaction packet, Template Build Packet seed, prototype data summary expectation. |
| `children/prd-child-frontend.md` | 前端 | Conditional. Route/component/API adapter/state/permission/formatter/runtime QA contract. |
| `children/prd-child-backend.md` | 后端 | Conditional. Data objects, source mapping, metric computation, endpoints, cache, export, security, errors. |
| `children/prd-child-technical-solution.md` | 技术方案 | Conditional. Architecture, system boundary, technology choices, data flow, NFR, environment, risks, plan. |
| `children/prd-child-testing.md` | 测试 | Conditional. Test matrix, expected frontend/API/data results, permissions, export, visual/runtime evidence, regression. |

Every child PRD file must include:

1. Common child header.
2. Parent sections consumed.
3. Stage execution input table.
4. Stage-specific contract.
5. Relevant data/API/interaction/conclusion/permission inputs.
6. Blocking gaps and sync status.
7. Downstream start gate.

Do not copy the full main PRD into every child PRD. Child PRDs refine execution only; they must not override the main PRD's business goal, scope, roles, or acceptance.

## ID Rules

Use stable IDs in execution files and child PRDs so downstream agents can reference the same objects:

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

- Use the same IDs in all execution files and child PRDs.
- Do not leave required fields blank.
- Use `TBD(GAP-*)` when a missing value affects implementation, validation, permission, or delivery.
- Use `none` only when a field is truly not applicable.

## Readiness Gates

- The PRD bundle is invalid if it is delivered as one Markdown PRD file instead of the required file tree.
- The PRD bundle is invalid if a channel/package/export format changes the logical file tree, merges required files, renames fixed paths, or moves required file bodies into appendices.
- `prd-main.md` is invalid if it is dominated by raw IDs or dense execution tables.
- The PRD bundle is invalid if any required execution file or child PRD file is missing, reduced to a filename, or replaced by a section inside `prd-main.md`.
- The PRD bundle is invalid if `prd-main.md`, execution files, and child PRD files disagree on child PRD IDs, purposes, sync status, or blocking gaps.
- The PRD bundle is invalid if a retained navigation page lacks a Markdown/mermaid preview with filters, toolbar actions, major blocks, block business content, and interaction entries.
- A template-backed PRD is not ready when `execution/prd-template-execution-contract.md`, `execution/prd-template-build-packet-seed.md`, or `children/prd-child-prototype.md` lacks a current `templateAssetUnderstandingMap`, exact-12 and minimum-8 `layoutRows` proof, block area configs, component slot size, visual-type size compatibility, component slot config, or registered component example evidence.
- A template-backed PRD is not ready when `templateAssetUnderstandingMap` is missing, stale, incomplete, inconsistent with the selected template asset root, or not written back to `execution/prd-template-execution-contract.md`, `execution/prd-template-build-packet-seed.md`, and `children/prd-child-prototype.md`.
- A template-backed PRD is not ready when a prose block grid, ratio split, or preview diagram replaces machine-checkable `layoutRows`. Such material may supplement `layoutRows` only.
- A template-backed PRD is not ready when any `3 componentArea` slot is filled by prose, text copy, visual type alone, an inline widget object, or an unregistered fallback. Every slot must use a registered component example or a registered standalone custom registered component example with ID, file, copy/registration path, props/state, data/API, and visual-size evidence.
- A template-backed PRD is not ready when it uses retired fixed-size wrapper selection instead of `createBlockAreaConfig`.
- A conclusion-bearing PRD is not ready when summary areas, conclusion cards, or analysis insight components contain fixed business conclusions without `RULE-*` frontend generation rules.
- A runnable prototype PRD is not ready when it creates an alternate output route because the PRD or source material mentions HTML. Source materials are evidence that must be mapped into the selected configurable template.
- A runnable prototype PRD is not ready when it defaults to an independent Vue3 project. The supported report-development route is the configured bundled template project; unsupported shell/layout requirements become blockers or template backlog items.
- Parent PRD changes must update affected child PRD and execution files in the same delivery or mark them `stale` with a `GAP-*`.
