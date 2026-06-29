---
name: report-detail-report-prototype-workflow
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。运行明细报表类报表原型 workflow。用户提到明细报表、台账、流水、记录查询、订单/客户/库存/发票/回款/售后明细、筛选、排序、分页、导出、核对、追溯具体是哪一条时触发；不负责通用报表原型 workflow、自助分析、指标看板、分析报告、API 文档或后端实现。"
---

# Detail Report Prototype Workflow

## Stage Scope

Classification: 原型阶段.

Use this copy only inside any compatible prototype agent bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this workflow.

Agent-neutral rule: this workflow is a capability contract, not a platform-specific instruction file. Capability IDs such as `report-prd-document-generation`, `report-info-component-mapping`, and `report-prototype-template-management` are stable routing names; Claude, Hermes, Codex, or another agent must map them to equivalent local prompts, tools, workflow nodes, or documentation before execution.

## Positioning

Use this workflow when the prototype should query, verify, export, or trace exact business records. It is one of the five peer prototype workflows.

PRD prerequisite: consume `report-prd-document-generation` as the independent parent/child PRD bundle. This workflow executes detail-report-specific query, table, export, traceability, and permission design from `CHILD-PRD-PROTOTYPE`; the main PRD remains business authority. It must not generate a complete PRD internally.

Core intent:

```text
明细报表用于核对“具体是哪一条”。
```

Prototype story gate: this workflow does not call `report-prototype-design-thinking` by default. It carries its own typed story gate: reviewers should understand within 30 seconds how the user finds the exact record, verifies it, traces its source, exports it, or takes the required row-level action.

Prototype layout gate: design and QA target `1920x1080`; page layout uses `12 * N`, minimum `2*1`, default analytical/chart block `3*2`, ordinary chart max `4*3`, and component internals default to center-axis symmetry. Existing design ideas in requirement documents must be checked before landing. Metric口径/指标清单 and design-process artifacts such as 下钻链路清单, component mapping, binding matrix, workflow/gate checklist, dataset field catalogue, and implementation notes are supplemental by default and stay in tooltip/detail/dictionary/interaction contract/validation/handoff unless explicitly requested as visible page content or rewritten as business-value conclusion, evidence, trust/source, or action content.

Template-only gate: this workflow must use templates for framework shell, page layout, block layout templates, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, and permission surfaces. Only interaction behavior and component content area templates may be self-developed, and both must appear in the PRD/workflow `selfDevelopmentExceptionMap`.

Runnable output gate: when implementation, runnable URL, local preview, or deployable prototype is requested, use `outputArtifact: vueTemplatePrototype` with `implementationMode: copyTemplateProject`: copy the selected bundled template project first and preserve its `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` stack. Add AntV S2 only for pivot/cross/wide analytical tables. HTML mentioned inside the PRD, attachments, source files, screenshots, or requirement text is requirement evidence only; it must not switch this workflow to `htmlPrototype`. Use `htmlPrototype` only when the latest explicit user instruction asks for HTML/static/single-file HTML output or exact static HTML preservation. Use `newVue3Project` only for a documented self-developed/non-template exception with rejected copy candidates.

## Required Capabilities

| Stage | Capability ID |
| --- | --- |
| PRD prerequisite | `report-prd-document-generation` |
| Requirement evidence clarification | `report-requirement-structure-extraction` |
| Report business type | `report-type-design` |
| Component/data/filter/interaction mapping | `report-info-component-mapping` |
| Page layout | `report-visual-layout-design` |
| Runnable template assets | `report-prototype-template-management` |
| Component visual details | `report-component-style-design` |
| Table standards | `report-table-design-spec` |
| Filter standards | `report-filter-control-design-spec` |
| Component placement | `report-component-placement-spec` |
| Design system | `report-design-system-governance` |
| Quality gates | `quality-gate-validation` |
| Runtime QA | `frontend-runtime-qa-validation` |

## Workflow

1. Run `quality-gate-validation` `references/preflight-understanding-gate.md` before design, repair, template edits, or code. Name affected surfaces, owning capabilities, hard constraints, missing evidence, and start decision.
2. Confirm the PRD prerequisite. If no PRD exists, or the PRD lacks a PRD-to-workflow execution matrix, child PRD registry, full child PRD bundle/files, or usable `CHILD-PRD-PROTOTYPE`, use `report-prd-document-generation` before continuing. Use `report-requirement-structure-extraction` only to clarify evidence/gaps that must be written back into the PRD.
3. Load `report-prd-document-generation` `references/prototype-workflow-execution-map.md` and validate that the concise main PRD plus `CHILD-PRD-PROTOTYPE` and execution appendices cover detail users, report-type implementation path, management/query satisfaction gate when applicable, scope, page content, layout, dynamic summary/conclusion rules when present, record fields/metrics, data/API, interactions, permissions, export, states, and Template Build Packet seed.
4. Confirm mode: design proposal, implementation spec, runnable prototype, repair, or URL handoff.
4A. Lock `outputArtifact: vueTemplatePrototype`, `implementationMode: copyTemplateProject`, and the copied-template Vue/ECharts stack unless the latest explicit user instruction requests HTML/static/single-file output or a documented self-developed/non-template exception requires `newVue3Project`. A PRD section, attachment, or source sample mentioning HTML is not output-format authority.
4B. For runnable or implementation-ready template work, create or validate `templateAssetUnderstandingMap` from `report-prototype-template-management` `references/template-asset-construction-contract.md`, then create or validate the current Template Build Packet from `report-prototype-template-management` `references/template-build-packet-contract.md` before source edits. Treat Appendix G / `CHILD-PRD-PROTOTYPE` packet rows as the seed and mark every required page, block, slot, data/API, filter/action, interaction, conclusion rule, self-development exception, target file, and validation command as `ready`, `draft`, `blocked`, or `deferred`.
5. Derive the typed prototype story from `CHILD-PRD-PROTOTYPE` report-path rows and executive/query gates when present: target user, one-sentence lookup/verification value, protagonist record type, query scope/total answer, primary trace/export/action outcome, audit/export use, and required trust signal.
6. Define the detail-report user path from `CHILD-PRD-PROTOTYPE` first. Default to enter with task/context -> narrow with filters/search -> identify row -> inspect details/source -> export or act -> return with filter/page state preserved only when it matches the selected report pattern.
7. Define row grain, primary key, business record identity, source system, freshness, and trace target from PRD data/API requirements.
6. Design filters: high-frequency filters outside, low-frequency filters under "more filters"; declare default values, reset behavior, query limits, and saved filter needs.
7. Design table fields by order: identity -> time -> subject -> amount/quantity -> status -> owner -> operation.
8. Define table behavior: default sort, optional sort fields, pagination, page size, fixed header, frozen key columns, column resize, column configuration, return-state preservation.
9. Define export: current page/current filter/all matched, current columns/full fields, row limits, async export, watermark, audit log, approval, masking, and export failure state.
10. Define traceability: detail drawer, source-document jump, operation log, customer/order/product/invoice/payment links.
11. Use `report-type-design` with `detail-query` as primary; add `reconciliation-traceability` only when matching differences or audit evidence is central.
12. Use `report-info-component-mapping` to bind row fields, filters, sorting, pagination, `CHILD-PRD-PROTOTYPE` trust/export/audit/row-action gates, export, detail drawer, source links, permissions, states, and `conclusionRuleMap` when the page has generated trust/summary/conclusion text.
13. Route table, filter, and component-internal placement surfaces to `report-table-design-spec`, `report-filter-control-design-spec`, and `report-component-placement-spec` before implementation-ready decisions.
14. Run the anti-laziness execution gate from `quality-gate-validation` before implementation-ready, repair, QA, or handoff conclusions. Keep `LAZY-*` findings visible until evidence closes them.
15. Use `report-visual-layout-design` to produce `pageLayoutConfig`: `layoutSectionMap`, `layoutRows`, stable block ids, readable `layoutCoordinateMap`, table/search/filter/detail block spans, first-viewport query path, and nav/page wiring.
16. Use `report-prototype-template-management` to execute the nine-step template operation flow and Template Build Packet: `frameworkTemplateId -> templateAssetUnderstandingMap -> pageLayoutConfig -> blockLayoutTemplateMap -> titleAreaConfig -> pillAreaConfig -> auxMetricAreaConfig -> unitAreaConfig -> componentContentAreaTemplateMap -> summaryAreaConfig`. Select the direct independent 分块布局模板 Vue file for every query/table/detail/action block, never a size-only `SpanCCxRRLayout` wrapper, carry `blockCoordinate` (`R-B`), `slotCount`, `componentSlotPattern`, `slotCoordinateList`, and asset availability in each block map row, configure title, decide pill buttons, configure evenly distributed additional information, decide units, then fill declared `3 componentArea` slots with `slotCoordinate` (`R-B-S`) and visual-type size compatibility evidence, and configure summary/explanation. Every source edit must consume packet rows; generated trust/summary/conclusion text in `4 summaryArea` or a component must consume `conclusionRuleMap`.
17. For every `3 componentArea` slot, choose an existing standalone Vue 组件内容区模板 first and prove visual-type size compatibility from the selected template's widget schema. If no suitable table/list/detail template fits, create a standalone Vue component content area template inside the copied template project and register/copy it before slot fill. This component fallback does not justify a new Vue project. Do not put title, pills, filters, controls, additional information, units, trust copy, description/help text, or summary text inside the component slot. Example coordinate: `2-2-1` = first component slot inside the second block of section 2.
18. After data, filters, widgets, generated trust/summary rules, and interactions are configured, create or update `docs/prototype-data-summary.md` with dataset catalog, field dictionary, row grain, primary keys, table/export fields, component binding matrix, filter/query semantics, detail/export/source-jump payloads, backend API/model suggestions, gaps, verification, and code-ledger sidecar paths.
19. Verify query/filter linkage, row identity, export scope, permissions/masking, timeout/over-limit states, and runnable URL when requested.

## Required Output

- Workflow mode, Preflight understanding matrix, users, query scenario, row grain, primary key, source system, freshness, and trace target.
- Output artifact and implementation mode decision: `vueTemplatePrototype` with `implementationMode: copyTemplateProject` and copied-template `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` by default; any `htmlPrototype` exception must cite the latest explicit user request, and any `newVue3Project` exception must cite the self-developed/non-template reason, not merely PRD/source wording.
- PRD prerequisite proof: PRD status, child registry, full child PRD bundle/files, `CHILD-PRD-PROTOTYPE` sync status, report-path rows consumed, `templateAssetUnderstandingMap`, Appendix G / Template Build Packet seed/current packet proof, PRD-to-workflow execution matrix, detail-report rows consumed, blocked/draft rows, and deferred-out-of-scope rows.
- Typed prototype story: one-sentence lookup/verification value, user path, protagonist record type, trace/export/action outcome, trust signal, and 30-second review path.
- Detail satisfaction gate consumption: management-facing `ESG-*` rows when present, `TRUST-*` source/freshness/row identity, export/audit behavior, row-level action route, and unresolved query/permission/masking gaps.
- Affected-surface to owning-capability routing, especially table, filter, component placement, layout, design-system, template, and runtime QA.
- Filter plan: high-frequency filters, more filters, defaults, reset, saved schemes, query constraints.
- Table field plan: visible columns, hidden/optional columns, field source, format, width/alignment, status tags, sensitive handling.
- Table interaction plan: sorting, pagination, fixed/frozen behavior, column settings, detail drawer, source jumps, return-state preservation.
- Dynamic conclusion rule map when visible generated trust/summary/conclusion text exists: `RULE-*` rows, input fields, triggers, rule logic, fallback, and QA cases.
- Template operation chain: `templateAssetUnderstandingMap`, Template Build Packet path/status and packet-row consumption evidence, `frameworkTemplateId`, `pageLayoutConfig` plus `layoutSectionMap` and `layoutCoordinateMap`, `blockLayoutTemplateMap` with `blockCoordinate`, `slotCount`, `componentSlotPattern`, `slotCoordinateList`, selected direct independent block layout Vue files, and asset availability, `titleAreaConfig`, `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, `componentContentAreaTemplateMap` with `slotCoordinate`, slot pattern code, component slot size, and visual-type size compatibility evidence, `summaryAreaConfig`, `conclusionRuleMap` consumption evidence when generated conclusions exist, and self-developed component content area fallback list.
- Result-content boundary: visible query/verification/trust/action content versus process artifacts moved to interaction contract, appendix/handoff, validation, or removal.
- Export plan: scope, fields, limits, async behavior, watermark, audit, approval, masking, failure state.
- Component/data/filter/control/interaction binding matrix.
- Prototype data summary: `docs/prototype-data-summary.md` with actual detail-report data modes, row grain, primary keys, datasets, fields, table/export bindings, filter/query semantics, detail/source-jump payloads, backend API/model suggestions, `GAP-*` rows, verification, and stale/missing-data decision.
- Anti-laziness execution result: evidence inspected, `LAZY-*` findings or explicit no-finding result, before/after proof for repairs, regression probe, and readiness impact.
- `pageShellPath: template`, selected framework template, `selfDevelopmentExceptionMap`, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not design only a field list; query efficiency and traceability are part of the prototype.
- Do not start query path, table field design, export/traceability, layout, template, or implementation work without a PRD bundle from `report-prd-document-generation` that includes a child registry, full child PRD bundle/files, and usable `CHILD-PRD-PROTOTYPE`.
- Do not start layout or table mapping when `CHILD-PRD-PROTOTYPE` lacks `RTP-DETAIL-QUERY` or an accepted `RTP-MIXED` primary path with detail-query path rows.
- Do not start layout or table mapping for management-facing detail/reconciliation reports when `CHILD-PRD-PROTOTYPE` lacks required trust, export/audit, row-action, or management gate rows.
- Do not generate an HTML/static prototype merely because the PRD, requirement document, attachment, or source sample mentions HTML. The default runnable route is copying a bundled template project and preserving Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios.
- Do not create a new Vue3/Vite project as the default implementation route. Copy the selected bundled template project first; create new Vue3 project structure only for a documented self-developed/non-template exception.
- Do not mark ready until every PRD execution row needed for detail content, layout, fields/metrics, data/API, interactions, permissions, export, masking, and states is consumed or explicitly deferred out of scope.
- Do not start layout or table design until the lookup/verification story, user path, row identity, trace/export/action outcome, and trust signal are explicit or safely inferred.
- Do not start runnable implementation if any requested self-development target is outside interaction behavior or component content area templates.
- Do not start runnable implementation until `templateAssetUnderstandingMap` and the Template Build Packet are current and the nine-step template operation chain has no missing block configs or slots. The packet must contain rows for the page/block/slot/control/data/conclusion/target file/validation being implemented. `blockLayoutTemplateMap` must name the selected direct independent block layout Vue file, not a size-only `SpanCCxRRLayout` wrapper plus `componentRegionPattern`. Every `3 componentArea` slot must use an existing 组件内容区模板 or a newly registered standalone component content area template with visual-type size compatibility evidence.
- Do not start runnable implementation when `blockCoordinate` or `slotCoordinate` is missing, duplicated, or inconsistent with the PRD/Template Build Packet, `layoutRows`, selected block layout slot order, metric mounting, conclusion rules, or interactions.
- Do not start runnable implementation when `layoutSectionMap` is missing, section row counts do not sum to page `N`, any section is not exact `12*K`, any block lacks `slotCount` / `componentSlotPattern` / `slotCoordinateList`, or any component template maps to an undeclared slot.
- Do not mark ready when layout or QA uses any viewport other than `1920x1080`, when the page ignores `12 * N`/`3*2`/chart `4*3` constraints, or when supplemental metric口径/指标清单 or design-process artifacts are rendered as page modules without an explicit display requirement or business-value justification.
- Do not start implementation or repair from this workflow alone when table/filter/placement surfaces require their specific front-door capabilities.
- Do not mark ready without a Preflight understanding start decision and evidence that required specialty capabilities were loaded or explicitly not needed.
- Do not put every available field into the first visible table.
- Do not miss export scope, row limit, permission, masking, or audit rules.
- Do not claim readiness without row grain, primary key, default sort, pagination, and exact filter binding.
- Do not ignore empty, timeout, no-permission, over-limit, and export-failure states.
- Do not claim readiness when visible generated trust/summary/conclusion text is fixed normal-state copy instead of a PRD `RULE-*` rule that recomputes from current data.
- Do not put block template title, pills, filters, controls, additional information, units, trust copy, description/help text, or summary/explanation content inside table/detail component content slots.
- Do not claim readiness for backend-facing handoff when `docs/prototype-data-summary.md` is missing, generic, stale, or lacks actual row-grain/field/table/filter/export/interaction/API-model/gap/verification content.
- Do not mark ready when the anti-laziness gate is missing, `LAZY-*` findings remain open, or table/filter/export claims lack field-level evidence and non-default-state checks.
