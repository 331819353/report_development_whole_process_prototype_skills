---
name: report-prd-document-generation
description: "[原型阶段] 独立生成报表、驾驶舱、管理看板、分析页面或数据应用的完整 PRD 文档，并作为所有报表原型设计 workflow 的前置输入契约。用户提到 PRD、需求文档、产品需求、需求转开发、报表需求、驾驶舱需求、原型前置需求、报表类型实现思路、附件信息抽取、用户方案校验、页面内容、页面布局、模板配置、指标清单、指标挂载矩阵、数据 API、交互逻辑、角色权限、一期范围边界时触发。输出必须覆盖背景目标、角色场景、范围边界、页面内容、报表类型实现路径、页面布局配置、指标口径、指标挂载矩阵、数据/API、交互逻辑、验收缺口和 PRD-to-workflow 执行矩阵；不直接开发代码、不生成接口实现、不替代下游原型/技术方案/测试执行。"
---

# Report PRD Document Generation

## Stage Scope

Classification: 原型阶段.

Use this agent-neutral capability to create the independent implementation-ready PRD for report development. This repository packages the capability as a skill for one distribution format, but the contract is for any capable agent or workflow runner, including Claude, Hermes, Codex, or internal automation. The output is the required prerequisite for downstream report prototype workflows, template configuration, technical solution, backend/API, frontend integration, and testing workflows.

Do not jump to code or mock implementation. Convert user needs into stable scope, layout, metric, data, API, interaction, permission, and acceptance contracts first.

## Positioning

Use this as the focused PRD-writing capability after or alongside requirement clarification. It is stricter than a generic requirement summary, but the output must be layered:

- The reader-facing main PRD is a short decision brief. It keeps only business intent, roles, scope, report path, page previews, layout summary, metric/data/interaction summary, child PRD index, and readiness gaps.
- Detailed formulas, APIs, layout rows, slot maps, workflow rows, Template Build Packet seed, and stage execution contracts belong in child PRDs or execution appendices, not in the main PRD.
- The PRD output must be a parent/child PRD bundle for every report-development PRD. A main PRD alone is invalid. The main PRD is for humans, while child PRDs are for AI execution in 原型、前端、后端、技术方案、测试. The main PRD must state each child PRD's purpose, consumed parent sections, downstream stage, and sync rule.
- Outputting only the child PRD registry, final stage map, links, or "see appendix" text does not satisfy the child PRD requirement. The final answer/file must include the full body of all five child PRDs, or explicitly write the five child files when file output is requested.
- Do not make raw codes such as `RTP-*`, `PATH-*`, `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, `MEET-*`, `BLK-*`, or `SLOT-*` the primary language of the main PRD. Pair any required ID with a readable Chinese name, and move dense ID tables to the execution appendix.
- Every navigation page must include a Markdown preview before technical layout tables. The preview must show filters, toolbar actions, major page blocks, business content, interaction entry points, and the intended reading path.
- Report prototype workflows must consume this PRD; they do not own complete PRD generation.
- The PRD must explain why the report exists, who uses it, what management problem it solves, and what phase one includes/excludes.
- The PRD must define the report-type implementation path before layout: how this report should be read, why that path fits the role and management problem, and how each path step maps to page blocks and block layout templates.
- For management-facing reports, the PRD must include an executive satisfaction auxiliary design gate: decision profile, 3-second answer, 30-second cause path, 3-minute action, priority/severity, closure, trust/source, meeting/export reuse, and acceptance checklist.
- The page layout section must be concrete enough for current configurable report templates: framework template, shell configuration, page `layoutSectionMap` that decomposes the page into readable `12*K` parts, page `layoutRows` with 12-column row evidence, readable layout coordinates, block layout template, standard block areas, component slots, and real component content area templates.
- Report development is template-only except for two explicit extension surfaces: self-developed interaction behavior and self-developed component content area templates. Framework shell, page layout, block layout templates, title/pill/aux/unit/summary areas, navigation, filters, toolbar, and export surfaces must use configurable templates.
- For prototype handoff, the PRD must default runnable output to `outputArtifact: vueTemplatePrototype` and `implementationMode: copyTemplateProject`: downstream workflows copy the selected bundled template project first, then preserve `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios`; add AntV S2 only for pivot/cross/wide analytical tables. HTML in attachments, copied source, screenshots, source files, or PRD text is requirement evidence only and must not become `htmlPrototype`. A blank/new Vue3 project is allowed only as `implementationMode: newVue3Project` for a documented self-developed/non-template exception where no copyable template route works.
- Metrics must include definitions, formulas, denominators, null rules, source, refresh cadence, and direction. Metric names alone are not acceptable.
- The metric mounting matrix must say exactly where each metric appears and which component/content slot consumes it.
- Summary areas, conclusion cards, and analysis insight components must be data-driven. The PRD must define `conclusionRuleMap` rows that tell frontend how to derive the conclusion from metrics/API fields, filters, thresholds, priorities, and empty-state rules; a fixed one-sentence conclusion is not acceptable.
- Data/API and interaction sections must be implementable, not prose-only.
- Section 8 data/API requirements must be detailed enough for the prototype workflow to generate `docs/prototype-data-summary.md` after implementation, including data objects, fields, metrics, generated conclusion inputs, component bindings, filter semantics, interaction payloads, backend API/model suggestions, and gaps.
- The PRD must include a PRD-to-workflow execution matrix so every PRD section has a downstream owning capability/workflow, execution artifact, and blocking rule.
- Parent PRD changes must propagate to child PRDs in the same delivery. If an affected child PRD cannot be updated, mark it `stale` and record the blocking `GAP-*`.

## Reference Loading

Capability references are agent-neutral. Names such as `report-prototype-template-management` identify the required capability contract, not a platform-specific invocation style; older `$`-prefixed notation means the same capability ID. Any agent must map the capability ID to its equivalent prompt, tool, workflow, or documentation bundle before executing the step.

Load references only as needed, but read the first seven before finalizing a PRD:

- Read `references/main-prd-minimal-contract.md` first. It is the binding rule that keeps the main PRD short and routes dense detail to child PRDs/appendices.
- Read `references/readable-prd-main-body.md` for the two-layer PRD structure: readable main document plus development execution appendix.
- Read `references/child-prd-bundle-contract.md` for the parent/child PRD bundle: human main PRD plus AI child PRDs for 原型、前端、后端、技术方案、测试.
- Read `references/prd-output-structure.md` for the required PRD headings, tables, ID rules, and readiness gates.
- Read `references/report-type-implementation-patterns.md` before writing page content or page layout for any report/dashboard/cockpit/detail/analysis PRD.
- Read `references/executive-satisfaction-design-gate.md` before finalizing any management-facing dashboard, cockpit, analysis report, risk monitor, closure board, review/export report, or decision-support PRD.
- Read `references/template-layout-prd-contract.md` before writing the page layout section for any report/dashboard/cockpit PRD.
- Read capability `report-prototype-template-management` `references/template-asset-construction-contract.md` before finalizing template-backed layout, block template selection, or component content area template selection.
- Read `references/metric-api-interaction-matrices.md` before writing metric lists, metric mounting, API requirements, or interaction logic.
- Read `references/prototype-workflow-execution-map.md` before finalizing the PRD or handing it to any prototype workflow.
- Read capability `report-prototype-template-management` `references/template-build-packet-contract.md` when the PRD will feed template implementation; include a Template Build Packet seed in the execution appendix.
- Use capability `report-prototype-template-management` when exact bundled template behavior, template operation flow, or runtime template validation affects the PRD.
- Use capability `report-info-component-mapping` when business questions must be mapped to charts, KPI cards, lists, tables, conclusion cards, drilldowns, or component content templates.
- Use capability `report-design-system-governance` when report decision quality, metric story, visual density, export/readability, or management cockpit design rules matter.
- Use capability `metric-number-display-contract` when the PRD defines numeric units, percentage precision, rounding, tooltip/export values, denominator display, or null/zero behavior.
- Use capability `delivery-artifact-template-management` when the PRD must align with downstream API, data model, permission matrix, test case, or delivery index templates.
- If the user input is very vague, use capability `report-requirement-structure-extraction` first to separate confirmed facts, assumptions, and gaps, then return here to produce the PRD.

## Workflow

1. Identify the report type and management problem.
   Determine whether the user needs a KPI dashboard, cockpit, analysis report, detail query, risk monitor, operational closure board, review/export report, or mixed report.

2. Extract requirement evidence.
   If the user provides attachments, screenshots, metric sheets, existing reports, meeting notes, or other source materials, inspect those first and extract facts before asking follow-up questions. Capture confirmed facts, inferred assumptions, missing gaps, source materials, target users, business lines, metric families, existing templates, and any explicit exclusions.
   If the user provides their own report implementation thought, validate whether it is the best fit for the report type, user role, evidence chain, data grain, template constraints, and interaction path. Keep it when sound; optimize or block it when a better path is required.

3. Define PRD scope before design.
   Separate phase-one deliverables from out-of-scope items. Record sensitive data exclusions, permission boundaries, unavailable data, deferred backend work, and non-goals.
   Record the prototype output boundary: runnable report prototypes use `vueTemplatePrototype` plus `implementationMode: copyTemplateProject` by default. Treat the bundled Vue/TypeScript/ECharts stack as the copied template stack to preserve, not as permission to create a blank Vue project. Treat any HTML mentioned in requirements, PRD sections, attachments, screenshots, or source samples as evidence only unless the latest explicit user instruction requests HTML/static output.

4. Build the page-content story.
   Convert business goals into page modules: overview, core conclusion, KPI, trend, ranking, issue type, closure status, drilldown/detail, business-line-specific content, export/review content, and empty/error states.
   Keep this section business-readable and short in the main PRD. Use page/module names and management questions; move raw IDs, formulas, and machine rows to child PRDs/appendices.

4A. Define the report-type implementation path.
   In the main PRD, state the selected report type and reading path in natural language. In `CHILD-PRD-PROTOTYPE` or Appendix A, add the detailed `RTP-*`/`PATH-*` rows, first-viewport mapping, block roles, candidate spans, selected block layout templates, component slot strategy, dynamic conclusion rules, and interaction entries.

4B. Define the executive satisfaction auxiliary design gate.
   For management-facing reports, summarize the 3-second answer, 30-second cause path, 3-minute action, trust/source, and export/review expectations in the main PRD. Put detailed `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, and `MEET-*` rows in `CHILD-PRD-PROTOTYPE`, `CHILD-PRD-TESTING`, or execution appendices. For pure analyst detail reports, scope the gate to query efficiency, trust/source, export/audit, and row-level action.

5. Design the template-backed layout.
   Before writing `layoutRows` or template maps, create a Markdown navigation/page preview for every page or retained navigation tab. Show the visible filter surface, toolbar actions, first-viewport blocks, business content inside each block, and interaction entry points so a reader can understand the report without reading the execution appendix.
   In the main PRD, keep the layout to a page preview and compact layout summary: framework template, section split such as `12*2 + 12*3 + 12*3`, major block names, selected direct block templates, slot pattern summary, filters, toolbar, and interaction entry points. Put machine-checkable `templateAssetUnderstandingMap`, `layoutRows`, block maps, slot maps, component template maps, and validation rows in `CHILD-PRD-PROTOTYPE` and Appendix A/G.
   Select the framework template only from the bundled template families. Create `templateAssetUnderstandingMap` from the selected template asset root before choosing block/component templates. Configure existing shell-owned title, filter, navigation, toolbar, export, and permission surfaces; do not self-develop or duplicate these surfaces in the report development flow. For each page block, choose a direct selectable independent block layout template from the `CHILD-PRD-PROTOTYPE` path mapping, executive gate rows, and actual template library evidence, then fill the standard areas:
   `1-1 titleArea`, `1-2 pillArea`, `2-1 auxMetricArea`, `2-2 unitArea`, `3 componentArea`, and `4 summaryArea`.
   Create `layoutSectionMap` before raw `layoutRows`. Split the page into readable sections such as section 1 `12*2` (`AAAAAAAAAAAA|AAAAAAAAAAAA`), section 2 `12*3` (`AAAAAABBBBBB|AAAAAABBBBBB|AAAAAABBBBBB`), and section 3 `12*3` (`AAAAAABBBBBB|AAAAAABBBBBB|AAAAAABBBBBB`). Each section records section number, business purpose, `sectionGrid`, row count, local row preview, block list, and global machine rows.
   `layoutRows` must be machine-checkable: every page has at least 8 rows, every row is exactly 12 columns, no row may exceed 12 cells, every visible block is rectangular, every block id maps to one `blockLayoutTemplateMap` row, and every row/column span is recorded before component slots are filled. Local A/B letters in a section preview may repeat across sections for readability, but final machine `layoutRows` and `blockMap` must use globally unique block letters/IDs or explicit section-scoped mapping so separate sections do not merge into one block.
   Add a readable `layoutCoordinateMap` for every page. Use `R-B-S` format for component slots: `R` = layout section/page region number, `B` = block order inside that section, `S` = slot order inside the selected block layout template. Example: if section 2 has two `6*3` blocks, the second block is `2-2`, and its first component slot is `2-2-1`. Standard block areas use `blockCoordinate + areaName` such as `2-2:titleArea`; do not use the third digit for title/pill/aux/unit/summary areas.
   Output a visible shell/filter/control design: `filterSurfaceMap` for template-native page filters, `pillAreaConfig` for every block, `toolbarActionMap`, and a display decision for each business switch/control. Do not omit filters, pills, or action entry points just because the user did not specify visual placement.

6. Fill every component slot.
   For each block, record `slotCount`, `componentSlotPattern`, and `slotCoordinateList` in `blockLayoutTemplateMap` before choosing component templates. Examples: `A` = one slot, `AB` = two slots, `AAB` = primary slot plus secondary slot, `AABBCC` = three grouped slots. For each `3 componentArea` slot, name its readable `slotCoordinate` such as `2-2-1`, then name the registered component content area template ID from the component content area template mapping table, standalone Vue file, sample/example source, visual type, visual-type size compatibility evidence, metric/data binding, slot role, props/state contract, and fallback. Do not put title, filters, controls, aux metrics, units, descriptions, or summaries inside component content area templates.
   If the slot renders a conclusion card or analysis insight, bind it to `conclusionRuleId` instead of writing final static copy.

7. Create metric contracts.
   In the main PRD, show only the core metric names, business meaning, direction, and where they appear. In `CHILD-PRD-BACKEND`, `CHILD-PRD-FRONTEND`, `CHILD-PRD-PROTOTYPE`, and Appendix B, every metric needs ID, name, business meaning, formula, unit, direction, applicable business line, source, refresh cadence, denominator/sample size, null rule, and owner/status. Use `TBD(GAP-*)` for unknown fields that block implementation and `none` only when truly not applicable.

8. Create the metric mounting matrix.
   Map each metric to page, block, block layout template, standard area or component slot, component content area template, visual role, API/data object, filter scope, interaction entry, and export behavior.

8A. Create dynamic conclusion rules.
   For every `4 summaryArea` narrative conclusion, conclusion card, or `analysisInsightContract`, create a `RULE-*` row in `conclusionRuleMap`: display target, input metric IDs/API fields, trigger state, threshold/comparison logic, priority/severity, output fields or sentence template, evidence fields, permission/masking, null/insufficient-data fallback, and QA case.

9. Define data objects and APIs.
   In the main PRD, summarize data domains and API groups. In `CHILD-PRD-BACKEND`, `CHILD-PRD-FRONTEND`, and Appendix C, specify object grain, dimensions, fields, metrics, request parameters, response shape, permission filtering, pagination/sort, cache/freshness, empty/error behavior, and source lineage.

10. Define interaction logic.
    In the main PRD, summarize the visible user operations and expected response. In `CHILD-PRD-PROTOTYPE`, `CHILD-PRD-FRONTEND`, `CHILD-PRD-TESTING`, and Appendix D, cover business-line switch, month-to-date/year-to-date switch, date selection, metric switch, ranking click, drilldown, jump, popup/drawer/modal, export, permission denial, loading, empty, and error states. For every control, state where it is displayed, whether it is a template filter, block `pillArea`, toolbar action, or component-owned event, which data/API/query parameters it changes, and how affected blocks refresh. Interactions may be self-developed only as component-owned behavior or template action-hook behavior; they must not introduce custom shell, custom page layout, custom block layout, duplicate navigation, duplicate filter bars, or duplicate toolbar surfaces.

11. Add acceptance checks and gaps.
    State what evidence will prove the PRD is ready: every page block mapped, every component slot filled, every metric defined and mounted, every API tied to data objects, and every interaction has response logic. List blockers separately.

12. Build the PRD-to-workflow execution matrix.
    Map every PRD section to the downstream workflow step, owning capability/workflow, required artifact, executable input IDs, and blocker rule. No PRD section may remain "for reference only" unless it is explicitly out of scope.

12A. Build the child PRD bundle.
    Follow `references/child-prd-bundle-contract.md`. In the main PRD, output the child PRD registry and final stage map for 原型、前端、后端、技术方案、测试. Then output the full body of `CHILD-PRD-PROTOTYPE`, `CHILD-PRD-FRONTEND`, `CHILD-PRD-BACKEND`, `CHILD-PRD-TECHNICAL-SOLUTION`, and `CHILD-PRD-TESTING`. In a single Markdown PRD, these must appear as Appendix H-L with visible headings. In a file-based delivery, create `children/prd-child-prototype.md`, `children/prd-child-frontend.md`, `children/prd-child-backend.md`, `children/prd-child-technical-solution.md`, and `children/prd-child-testing.md`, and list their paths in the main PRD. If a child PRD is not needed in the current phase, still create that child PRD body with the common header, `sync status: not-needed`, reason, future trigger, and affected downstream stage.

13. Create the Template Build Packet seed for template-based implementation.
    In the PRD execution appendix, normalize framework choice, page previews, `layoutRows`, block maps, standard block areas, component slot fills, data/API, filters/actions, interactions, dynamic conclusion rules, self-development exceptions, target files, and validations into the fixed sections from capability `report-prototype-template-management` `references/template-build-packet-contract.md`. Mark unknown implementation-critical values as `TBD(GAP-*)`.

## Required Output

Return a complete PRD bundle in Markdown unless the user asks for another format. The bundle has three layers:

1. Concise main PRD: follow `references/main-prd-minimal-contract.md`. It contains only sections 0-8: document summary, child PRD index, background/goal, roles/scenarios, phase-one scope, report implementation thought, navigation/page previews, template layout summary, metric/data/interaction summary, and acceptance/gaps.
2. Execution appendices: contain the dense reusable tables that should not bloat the main PRD, including Template execution contract, metric dictionary/mounting, data/API fields, interaction maps, dynamic conclusion rules, PRD-to-workflow matrix, and Template Build Packet seed.
3. Child PRDs: include all five bodies, not only a registry: `CHILD-PRD-PROTOTYPE`, `CHILD-PRD-FRONTEND`, `CHILD-PRD-BACKEND`, `CHILD-PRD-TECHNICAL-SOLUTION`, and `CHILD-PRD-TESTING`. Each child body must include the common child header, parent sections consumed, sync status, stage-specific execution inputs, blocker gaps, and downstream start gate.

The main PRD must be understandable without reading raw ID matrices. The child PRDs must be detailed enough for their downstream agents to execute without reconstructing missing formulas, template maps, API fields, interactions, or test gates from the main PRD.

## Quality Gate

- If the final PRD lacks any one of the five child PRD bodies, do not call the PRD complete. Continue writing the missing child PRD body or mark the whole PRD `blocked` with `GAP-CHILD-PRD-MISSING`.
- Do not treat section 0A, the child registry, the final stage map, or a list of child filenames as a substitute for the full child PRD body.
- Do not let the reader-facing main PRD become the execution manual. If the main body contains full `layoutRows`, full API field tables, full metric dictionary, full interaction maps, full conclusion rule map, full Template Build Packet seed, or full workflow execution matrix, move those details to appendices/child PRDs and keep only a readable summary in the main PRD.
- Do not produce a main PRD that is dominated by raw codes or opaque ID tables. Raw IDs are execution handles, not the reading experience.
- Do not mark a PRD bundle ready when the main PRD lacks the child PRD registry or when the final output does not state which child PRD is used by 原型、前端、后端、技术方案、测试.
- Do not update a parent PRD section without updating affected child PRDs in the same delivery, or marking the affected child PRDs `stale` with a `GAP-*` and clear impact.
- Do not let a child PRD override the main PRD's business goal, scope, role, or acceptance. Child PRDs refine execution only.
- Do not mark a PRD ready when any retained navigation page lacks a Markdown preview that shows visible filters, toolbar actions, major blocks, block business content, and interaction entry points before the technical layout table.
- Do not produce a PRD that says only "上中下布局", "左中右布局", or "按驾驶舱展示". Name page rows, blocks, block templates, slots, and component content templates.
- Do not skip attachment intake when user-provided files or screenshots exist. Extract their facts first, then ask only for missing blockers.
- Do not accept a user-provided report implementation thought without validation. Mark it `accepted`, `optimized`, `rejected`, or `needs-confirmation`, and explain the better path when optimized or rejected.
- Do not mark a PRD ready when the main PRD lacks a readable report path summary or when `CHILD-PRD-PROTOTYPE` / Appendix A lacks the primary `RTP-*` pattern, reading path, first-viewport plan, or path-step-to-block-layout mapping.
- Do not mark a management-facing PRD ready when the main PRD lacks management decision summary or when `CHILD-PRD-PROTOTYPE` / execution appendices lack executive decision profiles, first-viewport 3-second answer, 30-second cause path, 3-minute action or explicit non-action reason, priority/severity rules when risks exist, trust/source/freshness rules, and meeting/export rules when review circulation is required.
- Do not let Appendix A / Template Build Packet introduce page blocks that do not trace back to `CHILD-PRD-PROTOTYPE` path steps unless they are explicitly marked as support/source/export/permission blocks.
- Do not mark a PRD ready when `layoutRows` rows are not exactly 12 columns, block letters are not rectangular, block ids do not map one-to-one to `blockLayoutTemplateMap`, or row/column spans cannot be validated as the page-level `12 * N` grid.
- Do not mark a PRD ready when any `layoutRows` row is shorter or longer than exactly 12 cells, or when total page rows are fewer than 8. `12 * N` means N >= 8.
- Do not mark a PRD ready when section 5 lacks `layoutSectionMap`, when a page's section row counts do not sum to total `N`, when any section is not an exact `12*K` rectangle group, or when local section preview letters are reused in final machine `layoutRows` without global disambiguation.
- Do not mark a PRD ready when any visible block lacks a readable `blockCoordinate` such as `2-2`, any component slot lacks a readable `slotCoordinate` such as `2-2-1`, or the coordinate order contradicts the page preview, `layoutRows`, `blockMap`, or selected block layout template slot order.
- Do not mark a PRD ready when any `blockLayoutTemplateMap` row lacks `slotCount`, `componentSlotPattern`, or `slotCoordinateList`, or when any `componentContentAreaTemplateMap` row cannot be traced to one of those declared slots.
- Do not mark a PRD ready when template-native filters, business switches, date/period controls, block pills, toolbar actions, or component-owned drilldown/jump/modal/drawer/popup events are missing visible placement, ownership, affected data/API parameters, and refresh/state response. If a control is not needed, write an explicit `notNeededReason`.
- Do not treat `componentRegionPattern` as the selected template. It is compatibility metadata derived from selected block layout slots.
- Do not mark a PRD ready if it asks for self-developed framework shell, page layout, block layout template, title/pill/aux/unit/summary area, navigation, filter surface, toolbar, or export surface. Only interaction behavior and component content area templates may be self-developed, and both must remain inside the template contract.
- Do not place block title, pills, filters, auxiliary metrics, units, or summary/explanation copy inside component content area slots.
- Do not mark a PRD ready when `4 summaryArea`, a conclusion card, or an analysis insight component contains a fixed business conclusion without a `RULE-*` entry and frontend generation rule. Static copy is allowed only for source, scope, caveat, definition, or empty-state text.
- Do not mark a PRD ready if it routes a downstream runnable prototype to HTML/static output merely because the PRD, requirement document, attachment, screenshot, copied source, or source sample mentions HTML. Use `vueTemplatePrototype` with `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` unless the latest explicit user request asks for HTML/static/single-file output or exact static preservation.
- Do not mark a PRD ready if it implies a new Vue3/Vite project as the default implementation route. The PRD must default to copying a selected bundled template project; `newVue3Project` requires a self-developed/non-template exception, rejected copy candidates, owner, and readiness impact.
- Do not list metrics without口径, formula, source, denominator/sample, refresh, direction, and null rules.
- Do not leave required table cells blank. Use `TBD(GAP-*)` for unknowns or `none` when not applicable.
- Do not mark the PRD ready while any page block lacks a selected block layout template, any `componentArea` slot lacks a registered component content area template ID plus standalone Vue file/sample evidence or a registered custom fallback template, any displayed metric lacks a mounting row, or any API lacks request/response fields.
- Do not mark a template-backed PRD ready when `templateAssetUnderstandingMap` is missing, when a block selects a size-only `SpanCCxRRLayout.vue` wrapper as if it were a direct selectable slot template, or when a component slot lacks visual-type size compatibility evidence from the selected template's widget schema.
- Do not hand off to a prototype workflow until the PRD-to-workflow execution matrix covers every PRD section. Missing execution owner, artifact, or blocker rule keeps the PRD `draft` or `blocked`.
- Do not mark a template-based PRD ready when the execution appendix lacks a Template Build Packet seed or when the seed omits pages, blocks, slots, data/API, filters/actions, interactions, conclusion rules, self-development exceptions, target files, or validation rows needed for implementation.
