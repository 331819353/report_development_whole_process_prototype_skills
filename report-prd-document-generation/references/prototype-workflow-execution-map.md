# Prototype Workflow Execution Map

Use this reference when finalizing a PRD and when a prototype workflow starts from an existing PRD. The PRD is not merely background reading; it is the executable input contract for report prototype workflows.

Capability references in this file are platform-neutral. Names such as `report-prd-document-generation`, `report-prototype-template-management`, or legacy `report-prd-document-generation` are capability IDs, not Codex-only skill invocations. Claude, Hermes, Codex, and other agents must map each capability ID to their own available prompt, tool, workflow, or documentation bundle before execution.

## Hard Rule

All report prototype workflows must start from a PRD produced or validated by capability `report-prd-document-generation`.

If the user asks for prototype work without a PRD, create a draft PRD first. If the user provides a PRD, validate it against this execution map before design, layout, template, component, or runtime work begins.

Prototype workflows consume the parent/child PRD bundle, not only the reader-facing main PRD. The main PRD remains the business authority; `CHILD-PRD-PROTOTYPE` is the AI-executable prototype-stage contract. If the main PRD exists but `CHILD-PRD-PROTOTYPE` is missing, stale, or blocked, update the PRD bundle before design, layout, template, component, or source work continues.

Report development workflows must stay template-only except for two explicit extension surfaces: self-developed interaction behavior and self-developed component content area templates. Framework shell, page layout, block layout templates, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, and permission surfaces must be configured through templates, not self-developed.

All runnable report prototype workflows default to `outputArtifact: vueTemplatePrototype` and `implementationMode: copyTemplateProject`: copy the selected bundled template project first, then preserve its `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` stack; add AntV S2 only for pivot/cross/wide analytical tables. A PRD section, attachment, screenshot, HTML source, or requirement document mentioning HTML is not output-format authority. `htmlPrototype` is allowed only when the latest explicit user instruction asks for HTML/static/single-file HTML output or exact static HTML preservation. `newVue3Project` is allowed only for a documented self-developed/non-template exception with rejected copy candidates.

Summary areas, conclusion cards, and analysis insight components must consume PRD `RULE-*` entries from `conclusionRuleMap`. Prototype workflows must not replace dynamic frontend-generated conclusions with fixed one-sentence copy.

Runnable prototype workflows must create or update `docs/prototype-data-summary.md` after data, filters, widgets, generated conclusion rules, and interactions are configured. The PRD section 8 data/API contract is not fully executed until this backend-facing Markdown handoff exists or is explicitly deferred out of scope.

Report-type implementation paths are binding. Prototype workflows must consume PRD section 4A `RTP-*` and `PATH-*` rows to preserve the intended reading path before page layout, component mapping, and block layout template selection. A dashboard starts with status/conclusion before cause/process/action; a detail report starts with scope/summary and detail rows; an analysis report starts with conclusion before evidence/attribution/action unless the PRD validates a better exception.

Executive satisfaction design gates are binding for management-facing reports. Prototype workflows must consume PRD section 4B `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, and `MEET-*` rows before layout, component mapping, template selection, export design, or readiness acceptance. These IDs decide the first-viewport answer, cause path, action route, severity ordering, trust/source disclosure, and meeting/export reuse.

Reader-facing page previews are binding. Prototype workflows must consume PRD section 4C previews before page layout and template work: every retained navigation page must show filters, toolbar actions, first-viewport blocks, business content, and drilldown/jump/modal/drawer/popup entry points. The preview is the human-readable target; `layoutRows`, `layoutCoordinateMap`, and slot maps are the execution appendix.

Readable layout coordinates are binding. Prototype workflows must preserve `blockCoordinate` and `slotCoordinate` from PRD section 5 and the Template Build Packet: `R-B` identifies the block by page reading row/region and block order, and `R-B-S` identifies the component slot inside the selected block layout template. Example: first page row has two `6*3` blocks; the second block is `1-2`, and its first slot is `1-2-1`. Standard block areas use `blockCoordinate + areaName`, such as `1-2:titleArea`, so the third number remains reserved for component slots.

Template Build Packet rows are binding for implementation. Prototype workflows must turn the PRD appendix seed into a current Template Build Packet before editing copied template source files, then implement row by row from that packet.

Child PRD rows are binding for stage routing. The PRD final output must state which child PRD is used by 原型、前端、后端、技术方案、测试. Prototype workflows execute only `CHILD-PRD-PROTOTYPE`; they may read other child PRDs for context, but they must not perform frontend/backend/technical-solution/testing work inside the prototype stage.

Prototype workflows must not recreate complete PRD content internally. They may only:

- Consume PRD sections as execution inputs.
- Ask capability `report-requirement-structure-extraction` or an equivalent requirement-clarification agent to clarify evidence or gaps.
- Return to capability `report-prd-document-generation` or an equivalent PRD-generation agent to update missing or conflicting PRD sections.

## Required PRD Execution Matrix

Add this matrix to every PRD:

| PRD section | Executable IDs | Downstream owner capability/workflow | Execution artifact | Blocking rule | Status |
| --- | --- | --- | --- | --- | --- |

Rules:

- `Executable IDs` must reference actual IDs from the PRD, such as `PAGE-*`, `BLK-*`, `MET-*`, `API-*`, `INT-*`, `ROLE-*`, `RTP-*`, `PATH-*`, `RULE-*`, `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, `MEET-*`, `CHILD-PRD-*`, and `GAP-*`.
- `Downstream owner capability/workflow` must name the workflow, atomic capability, or equivalent agent function that will consume the section.
- `Execution artifact` must be concrete: binding matrix, pageLayoutConfig, blockLayoutTemplateMap, API contract, interaction contract, permission matrix, runtime QA case, etc.
- `Blocking rule` must say whether missing data blocks prototype start, only blocks implementation, or is explicitly out of scope.
- `Status` must be `ready`, `draft`, `blocked`, or `deferred-out-of-scope`.

## Section-To-Execution Map

| PRD section | Required execution | Primary downstream owner |
| --- | --- | --- |
| 0A. PRD child registry and stage map | Identify the required child PRD for each downstream stage, especially `CHILD-PRD-PROTOTYPE` for prototype work, and verify child sync status. | `report-prd-document-generation`, target prototype workflow, `report-delivery-pipeline-governance` |
| 0. 文档元信息 / facts / assumptions / gaps | Set workflow mode, source authority, gap ownership, readiness status, and handoff version. | `quality-gate-validation`, `delivery-version-management`, target prototype workflow |
| 1. 需求背景与目标 | Produce prototype story, primary management question, report type, first-viewport answer, and success criteria. | target prototype workflow, `report-type-design`, `report-prototype-design-thinking` when generic |
| 2. 用户角色与使用场景 | Produce role-specific user path, permission scope, navigation visibility, export scope, and scenario acceptance cases. | target prototype workflow, `report-info-component-mapping`, `report-filter-control-design-spec` |
| 3. 开发范围边界 | Lock phase-one scope, out-of-scope exclusions, `outputArtifact`, template-only constraint, self-development exception map, deferred items, and blockers. | target prototype workflow, `report-delivery-pipeline-governance`, `quality-gate-validation` |
| 4. 页面内容 | Produce visible business module inventory, result-content boundary, component bundle plan, and nav/page content plan. | target prototype workflow, `report-info-component-mapping`, `report-design-system-governance` |
| 4A. 报表类型实现思路与分块布局映射 | Produce attachment evidence intake, user-thought validation, primary `RTP-*` pattern, `PATH-*` reading path, first-viewport plan, and path-step-to-block-layout mapping. | `report-prd-document-generation`, target prototype workflow, `report-prototype-template-management` |
| 4B. 管理层满意度辅助设计 | Produce `ESG-*` executive decision profiles, first-viewport 3-second answer, 30-second cause path, 3-minute action, management metric wording, `SEV-*` priority/severity, `ACT-*` closure, `TRUST-*` source/freshness/coverage, `MEET-*` review/export, and satisfaction checklist. | `report-prd-document-generation`, target prototype workflow, `report-info-component-mapping`, `report-prototype-template-management` |
| 4C. 导航页与页面预览 | Produce Markdown/mermaid previews for every retained navigation page, including filters, toolbar actions, first-viewport blocks, block business content, reading path, and interaction entries. | `report-prd-document-generation`, `report-visual-layout-design`, `report-prototype-template-management` |
| 5. 页面布局配置 | Produce `frameworkTemplateId`, shell config, `pageLayoutConfig`, exact-12-column and minimum-8-row `layoutRows` audit, `layoutCoordinateMap`, `filterSurfaceMap`, `toolbarActionMap`, `blockLayoutTemplateMap`, standard area configs, component slot map, component content area template index/map with copy paths, and section 4B ID traces where applicable. | `report-visual-layout-design`, `report-prototype-template-management` |
| 5A. Dynamic conclusion generation rules | Produce `conclusionRuleMap`, summaryArea conclusion bindings, conclusion-card/analysisInsight rule bindings, affected API/filter/interaction refresh behavior, fallback text, and QA cases. | `report-info-component-mapping`, `report-prototype-template-management`, `frontend-runtime-qa-validation` |
| 6. 指标清单 | Produce metric dictionary, KPI scope boundary, display precision, formula validation, source/freshness, denominator/null behavior, and tooltip/export metadata. | `metric-number-display-contract`, `report-info-component-mapping`, target prototype workflow |
| 7. 指标挂载矩阵 | Produce component/data/filter/control/interaction binding matrix and slot-level metric binding. | `report-info-component-mapping`, `report-prototype-template-management` |
| 8. 数据与 API 需求 | Produce data object contracts, API request/response contracts, mock/data-source contract, permission filtering, cache/freshness, `docs/prototype-data-summary.md`, and technical-solution handoff. | `report-info-component-mapping`, `report-prototype-template-management`, `delivery-artifact-template-management`, downstream technical/backend workflows |
| 9. 交互逻辑 | Produce `filterSurfaceMap`, `pillAreaConfig`, `toolbarActionMap`, and `interactionBehaviorMap` for filters, period switch, metric switch, ranking click, drilldown, jump, drawer/modal, export, loading/empty/error/no-permission states. Self-developed interactions must remain component-owned or template action-hook behavior and must not create custom shell/layout/filter/nav/toolbar surfaces. | `report-info-component-mapping`, `report-filter-control-design-spec`, `report-prototype-template-management`, `frontend-runtime-qa-validation` |
| 10. 权限、安全、导出与异常状态 | Produce role/data-scope matrix, masking/export/audit behavior, state cases, and QA probes. | `quality-gate-validation`, `frontend-runtime-qa-validation`, downstream testing workflow |
| 11. 验收标准与待确认问题 | Produce readiness gates, test/QA matrix, unresolved blocker list, and downstream handoff conditions. | `quality-gate-validation`, `report-delivery-pipeline-governance`, `frontend-runtime-qa-validation` |
| 13. Template Build Packet Seed | Produce or update `docs/template-build-packet.md` / equivalent workflow packet with fixed rows for framework, shell, pages, layout rows, blocks, standard areas, component slots, data/API, filters/actions, interactions, conclusion rules, exceptions, target files, and validations. | `report-design-workflow`, `report-visual-layout-design`, `report-info-component-mapping`, `report-prototype-template-management` |
| 14. Child PRD Bundle | Produce stage-specific child PRDs for 原型、前端、后端、技术方案、测试; prototype workflow consumes `CHILD-PRD-PROTOTYPE` and records child sync status in readiness proof. | `report-prd-document-generation`, `report-design-workflow`, typed prototype workflows, downstream delivery workflows |

## Prototype Workflow Start Gate

Before any prototype workflow continues past preflight, require:

- A PRD status of `ready-for-review`, or `draft` with non-blocking `TBD(GAP-*)` items.
- A main PRD child registry in section 0A and a child PRD bundle in section 14.
- `CHILD-PRD-PROTOTYPE` exists, is `synced` or explicitly `draft` with non-blocking gaps, and lists the parent sections consumed by the prototype stage.
- A PRD execution matrix row for every PRD section.
- No `blocked` row for the target workflow's first executable step.
- `outputArtifact` is `vueTemplatePrototype` and `implementationMode` is `copyTemplateProject` by default with copied-template Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios stack proof; any `htmlPrototype` exception cites the latest explicit user HTML/static-output request, and any `newVue3Project` exception cites self-developed/non-template authority plus rejected copy candidates.
- Section 4A declares a primary `RTP-*` pattern, `PATH-*` reading path, first-viewport plan, and path-to-block layout mapping; if user attachments or user-supplied thinking exist, section 4A records their intake/validation.
- Management-facing reports include section 4B rows for `ESG-*` decision profile, first-viewport 3-second answer, 30-second cause path, 3-minute action or explicit non-action reason, required `SEV-*`, `ACT-*`, `TRUST-*`, and required `MEET-*` behavior.
- Section 4C contains a Markdown/mermaid preview for every retained navigation page, and each preview shows visible filters, toolbar actions, major blocks, block business content, and interaction entry points.
- Section 5 contains `layoutCoordinateMap`: every visible block has `blockCoordinate` (`R-B`), every `3 componentArea` slot has `slotCoordinate` (`R-B-S`), and coordinates match the preview, `layoutRows`, `blockMap`, and selected block layout slot order.
- The PRD execution appendix includes a Template Build Packet seed, and the workflow has created or will create a current Template Build Packet before source edits.
- The final stage map states that 原型 uses `CHILD-PRD-PROTOTYPE`, 前端 uses `CHILD-PRD-FRONTEND`, 后端 uses `CHILD-PRD-BACKEND`, 技术方案 uses `CHILD-PRD-TECHNICAL-SOLUTION`, and 测试 uses `CHILD-PRD-TESTING`.
- Every displayed metric in sections 6 and 7 has a mount path.
- Every summary-area conclusion, conclusion card, or analysis insight target has a `RULE-*` row and frontend generation behavior.
- Every page block in section 5 has a block layout template and component slot plan.
- Every API/data object used by a component has request/response or a documented mock/data-source fallback.
- Runnable prototype handoff has `docs/prototype-data-summary.md`, or PRD section 3 explicitly defers backend-facing data handoff out of scope for the current phase.
- Every interaction in section 9 has a system response and state behavior.
- The self-development exception map contains only interaction IDs and component content area template IDs; any custom shell/page/block/supporting-area work is `blocked` or `deferred-out-of-scope`.

If these conditions fail, update the PRD first instead of continuing inside the workflow.

## 100 Percent Execution Gate

A workflow may mark a prototype stage `ready` only when every PRD execution matrix row is one of:

- `ready`: consumed by the named workflow/capability and materialized into the required artifact.
- `deferred-out-of-scope`: explicitly excluded by PRD section 3 and not required for the current phase.

Rows with `draft` or `blocked` status keep the prototype stage `partial` or `blocked`. Do not hide incomplete PRD sections inside assumptions, mock data, or visual placeholders.

Dynamic conclusion rows are not optional. A workflow cannot mark the stage `ready` while a visible summary-area conclusion, conclusion card, or analysis insight component is backed only by fixed copy instead of a consumed `RULE-*` execution row.

Executive satisfaction rows are not optional for management-facing reports. A workflow cannot mark the stage `ready` while first-viewport blocks, component bundles, template maps, interactions, or export behavior fail to consume required `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, or `MEET-*` rows.

Navigation/page preview rows are not optional. A workflow cannot mark the stage `ready` while a retained nav page has no consumed section 4C preview or while the implementation contradicts the preview's filters, toolbar actions, major blocks, business content, or interaction entries.

Template Build Packet rows are not optional for implementation. A workflow cannot edit copied template source or mark implementation `ready` while packet sections for the edited page/block/slot/control/data/conclusion/target file are missing, blank, stale, blocked, or missing the required readable coordinate for that block or slot.

Child PRD rows are not optional for cross-stage handoff. A workflow cannot mark prototype readiness for downstream 前端、后端、技术方案、测试 when the final stage map is missing, when `CHILD-PRD-PROTOTYPE` is stale, or when affected downstream child PRDs are missing/stale without explicit `GAP-*` impact.

Output stack rows are not optional for runnable prototypes. A workflow cannot mark the stage `ready` if it chose HTML/static output from PRD/source wording instead of an explicit user request, if it created a new Vue3 project while a bundled template could be copied, or if the copied-template Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios stack proof is missing.

Data handoff rows are not optional when the prototype will feed technical solution, backend/data-service design, frontend integration, or testing. A workflow cannot mark the stage `ready` while `docs/prototype-data-summary.md` is missing, generic, stale, or not tied to current datasets, fields, component bindings, filters, interactions, API/model suggestions, gaps, and verification.
