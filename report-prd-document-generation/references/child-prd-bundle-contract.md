# Child PRD Bundle Contract

Use this reference when the PRD will feed multiple downstream stages. The PRD bundle has two audiences:

1. Main PRD: for humans. It explains business intent, scope, page preview, decisions, and the child PRD index.
2. Child PRDs: for AI/workflow execution. They contain dense IDs, matrices, contracts, stage gates, and exact handoff inputs.

Do not make the main PRD carry every execution table. Do not make child PRDs replace the main PRD's business authority.

The main PRD is intentionally concise. Child PRDs are responsible for the detailed, stage-specific execution content that the main PRD omits. If a formula, API field, layout row, slot map, interaction payload, conclusion rule, or test case is needed by a downstream stage, it must appear in the matching child PRD or execution appendix rather than being expanded in the main PRD.

Hard rule: a child PRD registry is only an index, not the child PRD bundle. A valid PRD bundle must include the full body of all five child PRDs, either as Appendix H-L in the same Markdown file or as five child files. If any child body is missing, the whole PRD remains incomplete.

## Required Bundle Files Or Sections

When output is a single Markdown file, use these as major appendices. When output is a folder, use these filenames.

| Child PRD ID | Recommended file/section | Stage | Purpose | Primary consumers |
| --- | --- | --- | --- | --- |
| `CHILD-PRD-PROTOTYPE` | `children/prd-child-prototype.md` or Appendix H | 原型 | Drive report prototype workflow, template layout, component mapping, Template Build Packet seed, and runnable prototype handoff. | `report-design-workflow`, typed prototype workflows, `report-visual-layout-design`, `report-info-component-mapping`, `report-prototype-template-management` |
| `CHILD-PRD-FRONTEND` | `children/prd-child-frontend.md` or Appendix I | 前端 | Drive production/frontend integration after prototype: routes, page/component contracts, API adapters, state, permissions, rendering, runtime QA, and data consistency. | `frontend-development-workflow`, `frontend-runtime-qa-validation`, `environment-profile-contract` |
| `CHILD-PRD-BACKEND` | `children/prd-child-backend.md` or Appendix J | 后端 | Drive API/data-service design and implementation: data objects, source mapping, metric computation, query parameters, permissions, cache, export, and errors. | `backend-development-workflow`, API/documentation/data-service workflows, `delivery-artifact-template-management` |
| `CHILD-PRD-TECHNICAL-SOLUTION` | `children/prd-child-technical-solution.md` or Appendix K | 技术方案 | Drive architecture and implementation planning: system boundary, frontend/backend/data split, ADRs, NFRs, environments, deployment, observability, risks, and delivery plan. | `technical-solution-workflow`, `report-delivery-pipeline-governance`, `environment-profile-contract` |
| `CHILD-PRD-TESTING` | `children/prd-child-testing.md` or Appendix L | 测试 | Drive test design and acceptance: scenario cases, UI/API/data consistency, permission, export, errors, performance, regression, and evidence expectations. | `testing-integration-workflow`, `frontend-runtime-qa-validation`, `runtime-url-smoke-test`, delivery QA skills |

Rules:

- In chat/single-document output, do not stop after the table above. Continue with full Appendix H-L child PRD bodies.
- In file output, create all five child files and list them in the main PRD. A path without file content is not enough.
- `not-needed` is a child PRD sync status, not permission to omit the child PRD. The child body must still include the common header, reason, future trigger, and downstream impact.

## Main PRD Child Registry

The main PRD must include a short registry so humans understand which child PRD exists, why it exists, and when it must be updated.

Use this table in the main PRD, preferably after document metadata:

| 阶段 | 使用子 PRD | 子 PRD 作用 | 读取内容 | 下游产物 | 主 PRD 变更后的同步规则 |
| --- | --- | --- | --- | --- | --- |
| 原型 | `CHILD-PRD-PROTOTYPE` | 让原型 workflow 配置页面、模板、分块、槽位、交互、动态结论和数据摘要。 | 主 PRD 0-8 + Appendix A/G | 原型说明、可运行原型、`docs/template-build-packet.md`, `docs/prototype-data-summary.md` | 主 PRD 的页面、布局、指标、API、交互、结论或范围变化时必须同步。 |
| 前端 | `CHILD-PRD-FRONTEND` | 让前端实现页面路由、组件、状态、接口适配、权限、格式化、运行 QA。 | 主 PRD 0-8 + Appendix B-E + prototype data summary when available | 前端功能说明、接口适配、页面实现、运行 QA 结果 | 页面、组件、交互、API、权限、数值格式或环境变化时必须同步。 |
| 后端 | `CHILD-PRD-BACKEND` | 让后端/API 明确数据对象、计算口径、查询参数、权限、缓存、导出和错误处理。 | 主 PRD 0/1/3/7/8 + Appendix B/C + prototype data summary when available | API 清单、数据模型、服务设计、接口实现输入 | 指标口径、数据源、字段、筛选、权限、导出、性能要求变化时必须同步。 |
| 技术方案 | `CHILD-PRD-TECHNICAL-SOLUTION` | 让技术方案明确系统边界、架构决策、前后端分工、环境、非功能和风险。 | 主 PRD 0-8 + all child PRD status | 技术方案、ADR、实施计划、风险清单 | 范围、架构边界、技术栈、数据链路、环境、NFR 或风险变化时必须同步。 |
| 测试 | `CHILD-PRD-TESTING` | 让测试阶段生成用例、联调检查、数据一致性检查、权限/异常/导出验证和证据要求。 | 主 PRD 0-8 + Appendix B-E + frontend/backend/API/prototype outputs | 测试矩阵、验收清单、缺陷证据、回归报告 | 验收标准、交互、API、权限、数据规则、异常状态或交付范围变化时必须同步。 |

## Child PRD Common Header

Every child PRD must start with this header:

| Field | Requirement |
| --- | --- |
| Child PRD ID | One of the required `CHILD-PRD-*` IDs. |
| Stage | 原型 / 前端 / 后端 / 技术方案 / 测试. |
| Parent PRD | Main PRD name and version. |
| Parent sections consumed | Exact section numbers and IDs consumed. |
| Generated from parent version | Version or timestamp. |
| Sync status | `synced`, `stale`, `blocked`, or `not-needed`. |
| Owner workflow | Downstream workflow or skill that consumes it. |
| Required upstream artifacts | For example prototype data summary, API inventory, frontend route map, backend model, or test environment. |
| Blocking gaps | `GAP-*` rows that block this stage. |

## Minimum Child PRD Body Template

Every child PRD body must contain these sections. Keep them concise, but do not omit them:

1. Common child header.
2. Parent-section consumption table: exact parent sections, IDs, and why the child needs them.
3. Stage execution input table: the minimum rows the downstream workflow needs to start.
4. Stage-specific contract: use the requirements below for the matching `CHILD-PRD-*`.
5. Data/API/interaction/conclusion/permission inputs relevant to that stage, or `none` with a reason.
6. Blocking gaps and sync status: `synced`, `draft`, `stale`, `blocked`, or `not-needed`.
7. Downstream start gate: what must be true before the stage can start.

If the source information is thin, use `TBD(GAP-*)` inside the child PRD rather than omitting the child PRD.

## Child PRD Content Requirements

### `CHILD-PRD-PROTOTYPE`

Include detailed content, but only what the prototype/design AI needs:

- Report type implementation path: selected `RTP-*`, `PATH-*`, first-viewport plan, and block intent.
- Executive satisfaction gates: required `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, `MEET-*` rows.
- Page previews: main PRD readable preview references.
- Template layout contract: framework template, shell config, `templateAssetUnderstandingMap`, `layoutSectionMap`, `layoutRows`, `layoutCoordinateMap`, block layout template map, direct template asset availability, and standard block area configs.
- Block/slot contract: `slotCount`, `componentSlotPattern` such as `A` / `AB` / `AAB` / `AABBCC`, `slotCoordinateList`, readable `slotCoordinate` (`R-B-S`), component slot size, visual-type size compatibility evidence, component content area template IDs, Vue files, sample evidence, data binding, and fallback template registrations.
- Dynamic conclusion rules: `RULE-*` rows used by summary areas, conclusion cards, and analysis insight components.
- Data/API and interaction rows required for prototype data, filters, drilldown, jump, modal/drawer, export, and state behavior.
- Template Build Packet seed and validation plan.

### `CHILD-PRD-FRONTEND`

Include detailed content, but only what frontend implementation/integration AI needs:

- Route/page/component map, including production route names when known.
- Component-to-API adapter map and frontend view-model fields.
- State model: filters, pills, toolbar actions, drilldown context, drawer/modal state, loading/empty/error/permission states.
- Dynamic conclusion frontend generation contract: `RULE-*`, input fields, recompute triggers, stale/clear behavior, fallback text.
- Formatting contract: units, precision, rounding, null/zero/denominator-zero, percent display, export precision.
- Permission and masking behavior in the UI.
- Environment/API base URL assumptions and frontend QA commands/evidence requirements.
- Differences between prototype behavior and production frontend behavior.

### `CHILD-PRD-BACKEND`

Include detailed content, but only what backend/API AI needs:

- Data objects, row grain, primary keys, dimensions, metric fields, source systems, lineage, and freshness.
- Metric computation ownership: backend-computed, source-computed, frontend-format-only, or `TBD(GAP-*)`.
- API inventory: endpoint group, method/path, request params, response model, pagination/sort/filter stage, permissions, error envelope.
- Query/service behavior: aggregation, Top N/ranking, drilldown payloads, export lifecycle, cache, performance/SLA, audit.
- Security and masking rules.
- Backend gaps and data-source confirmation questions.

### `CHILD-PRD-TECHNICAL-SOLUTION`

Include detailed content, but only what technical-solution AI needs:

- System boundary and architecture: frontend, backend/data service, source systems, external services, export/file services.
- Technology decisions and ADR candidates, including default vs exception.
- Data flow from source to model to API to frontend/prototype.
- Integration sequence and delivery plan.
- Environment profiles, auth/SSO, observability, logging, performance, cache, resilience, security, and deployment notes.
- Cross-stage dependency map: which prototype/frontend/backend/testing outputs must exist before each milestone.
- Risks, tradeoffs, open decisions, and owner.

### `CHILD-PRD-TESTING`

Include detailed content, but only what testing AI needs:

- Acceptance criteria mapped to pages, components, APIs, metrics, interactions, permissions, exports, and data quality.
- Test scenario matrix: e2e, API, data consistency, permission, empty/error/loading, export, visual/runtime, regression.
- Test data requirements and source authority.
- Expected frontend result and expected API/backend result for each case.
- Evidence requirements: screenshots, network logs, API samples, data comparison, command output, defect report fields.
- Blocking gaps and retest triggers.

## Parent-To-Child Sync Matrix

When the main PRD changes, update affected child PRDs in the same delivery. If a child cannot be updated, mark it `stale` and list the blocking gap.

| Parent PRD change | Prototype child | Frontend child | Backend child | Technical-solution child | Testing child |
| --- | --- | --- | --- | --- | --- |
| Background/goal/role/scope changes | update story and acceptance | update route/use scenario | update service scope if affected | update architecture boundary | update scenarios |
| Report type or reading path changes | update `RTP-*`, `PATH-*`, layout intent | update component/page flow | update API aggregation if affected | update dependency/risk | update e2e path |
| Page preview/layout/block/template changes | update layout and packet seed | update route/component/rendering | update response shape if affected | update delivery plan if affected | update UI/visual cases |
| Metric definition or mounting changes | update component binding | update formatter/view model | update metric computation/API | update data flow | update data consistency cases |
| Data/API/source/freshness changes | update prototype data contract | update adapter/env contract | update API/model/source contract | update architecture/integration | update API/data tests |
| Interaction/filter/drilldown/export changes | update interaction rows | update UI state and payloads | update request/export/service behavior | update integration plan | update e2e/export cases |
| Permission/security/masking changes | update visible scope | update UI masking/no-permission | update auth/data-scope enforcement | update security design | update permission cases |
| Acceptance/gap/readiness changes | update prototype gates | update frontend gates | update backend gates | update milestone risk | update test gates |

## Final Output Stage Map

Every final PRD output must include this stage map in the main document and again in the execution appendix:

| Delivery stage | Must use child PRD | Also read | Cannot start when |
| --- | --- | --- | --- |
| 原型 | `CHILD-PRD-PROTOTYPE` | Main PRD, Template Build Packet seed, source evidence | Child is missing/stale, layout/template rows blocked, or required `RULE-*`/API/interaction rows missing. |
| 前端 | `CHILD-PRD-FRONTEND` | Main PRD, prototype output, `docs/prototype-data-summary.md`, API/backend child when available | Child is missing/stale, API/view model/permission/state contract blocked. |
| 后端 | `CHILD-PRD-BACKEND` | Main PRD, metric dictionary, data/API sections, prototype data summary when available | Child is missing/stale, source/metric/grain/permission/export contract blocked. |
| 技术方案 | `CHILD-PRD-TECHNICAL-SOLUTION` | Main PRD, all child PRD statuses, delivery/version index when available | Child is missing/stale, system boundary or architecture decision blocked. |
| 测试 | `CHILD-PRD-TESTING` | Main PRD, frontend/backend/API outputs, prototype URL/data summary when available | Child is missing/stale, acceptance/API/data/permission/test-data expectation blocked. |

## Quality Gates

- Do not mark the PRD bundle `ready-for-review` when the main PRD lacks the child PRD registry.
- Do not mark the PRD bundle `ready-for-review` when any of the five child PRD bodies is missing, reduced to a filename, or replaced by the registry/stage map.
- Do not mark the PRD bundle `ready-for-review` when the final output does not state which child PRD is used by 原型、前端、后端、技术方案、测试.
- Do not let child PRDs drift silently. Each child PRD must declare `Generated from parent version` and `Sync status`.
- Do not update a parent PRD section without either updating affected child PRDs or marking them `stale` with a `GAP-*`.
- Do not make a child PRD more authoritative than the main PRD on business goal, scope, role, or acceptance. Child PRDs refine execution only.
- Do not put full child PRD matrices inside the reader-facing main body. The main body contains the child registry and stage map; child details live in appendices/files.
- Do not omit stage-critical detail just because the main PRD is concise. Missing executable detail belongs in the child PRD as `TBD(GAP-*)`, not in the main PRD as vague prose.
