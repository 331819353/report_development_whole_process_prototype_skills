---
name: report-self-service-analysis-prototype-workflow
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。运行自助分析类报表原型 workflow。用户提到自助分析、分析工作台、BI 自助分析、拖拽维度指标、自由组合筛选、透视分析、保存个人报表、分享分析、图表切换、探索还有什么问题时触发；不负责通用报表原型 workflow、指标看板、分析报告、明细报表、API 文档或后端实现。"
---

# Self-Service Analysis Prototype Workflow

## Stage Scope

Classification: 原型阶段.

Use this copy only inside any compatible prototype agent bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this workflow.

Agent-neutral rule: this workflow is a capability contract, not a platform-specific instruction file. Capability IDs such as `report-prd-document-generation`, `report-info-component-mapping`, and `report-prototype-template-management` are stable routing names; Claude, Hermes, Codex, or another agent must map them to equivalent local prompts, tools, workflow nodes, or documentation before execution.

## Positioning

Use this workflow when the prototype is an analysis workbench rather than a fixed report. It is one of the five peer prototype workflows.

PRD prerequisite: consume `report-prd-document-generation` as the independent parent/child PRD bundle. This workflow executes self-service analysis model, field metadata, operation, result, and reuse design from `CHILD-PRD-PROTOTYPE`; the main PRD remains business authority. It must not generate a complete PRD internally.

Core intent:

```text
自助分析让用户自己探索“还有什么问题”。
```

Prototype story gate: this workflow does not call `report-prototype-design-thinking` by default. It carries its own typed story gate: reviewers should understand within 30 seconds how the analyst starts from a question, chooses dimensions/metrics, gets a result, verifies it, and saves or shares the reusable analysis.

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
| Chart standards | `report-chart-design-spec` |
| Table/pivot standards | `report-table-design-spec` |
| Filter standards | `report-filter-control-design-spec` |
| Component placement | `report-component-placement-spec` |
| Design system | `report-design-system-governance` |
| Quality gates | `quality-gate-validation` |
| Runtime QA | `frontend-runtime-qa-validation` |

## Workflow

1. Run `quality-gate-validation` `references/preflight-understanding-gate.md` before design, repair, template edits, or code. Name affected surfaces, owning capabilities, hard constraints, missing evidence, and start decision.
2. Confirm the PRD prerequisite. If no PRD exists, or the PRD lacks a PRD-to-workflow execution matrix, child PRD registry, full child PRD bundle/files, or usable `CHILD-PRD-PROTOTYPE`, use `report-prd-document-generation` before continuing. Use `report-requirement-structure-extraction` only to clarify evidence/gaps that must be written back into the PRD.
3. Load `report-prd-document-generation` `references/prototype-workflow-execution-map.md` and validate that the concise main PRD plus `CHILD-PRD-PROTOTYPE` and execution appendices cover analysts, report-type implementation path, executive/reuse satisfaction gate when shared upward, scope, workbench content, layout, dynamic result-summary rules when present, field/metric definitions, data/API, interactions, permissions, save/share/export, states, and Template Build Packet seed.
4. Confirm mode: design proposal, implementation spec, runnable prototype, repair, or URL handoff.
4A. Lock `outputArtifact: vueTemplatePrototype`, `implementationMode: copyTemplateProject`, and the copied-template Vue/ECharts stack unless the latest explicit user instruction requests HTML/static/single-file output or a documented self-developed/non-template exception requires `newVue3Project`. A PRD section, attachment, or source sample mentioning HTML is not output-format authority.
4B. For runnable or implementation-ready template work, create or validate `templateAssetUnderstandingMap` from `report-prototype-template-management` `references/template-asset-construction-contract.md`, then create or validate the current Template Build Packet from `report-prototype-template-management` `references/template-build-packet-contract.md` before source edits. Treat Appendix G / `CHILD-PRD-PROTOTYPE` packet rows as the seed and mark every required page, block, slot, data/API, filter/action, interaction, conclusion rule, self-development exception, target file, and validation command as `ready`, `draft`, `blocked`, or `deferred`.
5. Derive the typed prototype story from `CHILD-PRD-PROTOTYPE` report-path rows and executive/reuse gates when present: target analyst, one-sentence exploration value, starting question, analysis result, trust/quality cue, save/share/export reuse outcome, and management-facing interpretation when the result will be circulated upward.
6. Define the self-service user path from `CHILD-PRD-PROTOTYPE` first. Default to choose dataset/template -> select dimensions/metrics -> configure filters/view -> inspect chart/table result -> drill/verify detail -> save/share/export/reuse only when it matches the selected report pattern.
7. Define `dataScope -> analysisModel -> operationModel -> outputResult` from PRD page content, metric list, data/API requirements, and interaction logic.
6. List available datasets, dimensions, metrics, time fields, filter fields, and custom fields.
7. Define field metadata: field type, groupability, filterability, calculability, permissions, masking, allowed combinations, and performance limits.
8. Design the workbench structure: dataset/report title/save/share/export, field panel, row/column/metric/filter configuration, chart/style configuration, result area, drilldown/detail drawer.
9. Define user operations: drag/drop or equivalent selection, filter, sort, Top N, null handling, chart switching, pivot/table view, drilldown, save, duplicate, share, scheduled delivery, export, add-to-dashboard.
10. Use `report-type-design` with exploratory-analysis intent; keep detail-query only as a drilldown or output block.
11. Use `report-info-component-mapping` for field panel, config zones, result widgets, dataset contracts, invalid-combination states, `CHILD-PRD-PROTOTYPE` trust/review/management gates when applicable, `conclusionRuleMap` when generated result summaries exist, and binding matrix.
12. Route chart, table/pivot, filter, and component-internal placement surfaces to `report-chart-design-spec`, `report-table-design-spec`, `report-filter-control-design-spec`, and `report-component-placement-spec` before implementation-ready decisions.
13. Run the anti-laziness execution gate from `quality-gate-validation` before implementation-ready, repair, QA, or handoff conclusions. Keep `LAZY-*` findings visible until evidence closes them.
14. Use `report-visual-layout-design` to produce `pageLayoutConfig`: `layoutSectionMap`, `layoutRows`, stable block ids, readable `layoutCoordinateMap`, field-panel/config/result/detail block spans, first-viewport workbench path, and nav/page wiring.
15. Use `report-prototype-template-management` to execute the nine-step template operation flow and Template Build Packet: `frameworkTemplateId -> templateAssetUnderstandingMap -> pageLayoutConfig -> blockLayoutTemplateMap -> titleAreaConfig -> pillAreaConfig -> auxMetricAreaConfig -> unitAreaConfig -> componentContentAreaTemplateMap -> summaryAreaConfig`. Select the direct independent 分块布局模板 Vue file for every workbench/result block, never a size-only `SpanCCxRRLayout` wrapper, carry `blockCoordinate` (`R-B`), `slotCount`, `componentSlotPattern`, `slotCoordinateList`, and asset availability in each block map row, configure title, decide pill buttons, configure evenly distributed additional information, decide units, then fill declared `3 componentArea` slots with `slotCoordinate` (`R-B-S`) and visual-type size compatibility evidence, and configure summary/explanation. Every source edit must consume packet rows; generated result summaries or insight conclusions must consume `conclusionRuleMap`.
16. For every `3 componentArea` slot, choose an existing standalone Vue 组件内容区模板 first and prove visual-type size compatibility from the selected template's widget schema. If no suitable field-panel, chart/table/pivot result, or state template fits, create a standalone Vue component content area template inside the copied template project and register/copy it before slot fill. This component fallback does not justify a new Vue project. Use ECharts for standard chart fallbacks and S2/project-equivalent behavior for pivot/cross-table fallbacks when needed. Do not put filters, controls, additional information, units, descriptions, or explanation text inside the slot. Example coordinate: `2-2-1` = first component slot inside the second block of section 2.
17. Use the owning layout, template, and component capabilities only in this order: finalize `pageLayoutConfig`, finalize `blockLayoutTemplateMap`, then finalize each component content area template so the workbench does not hide the analysis model behind decorative charts.
18. After data, filters, widgets, generated result-summary rules, and interactions are configured, create or update `docs/prototype-data-summary.md` with dataset catalog, field dictionary, allowed dimension/metric operations, component binding matrix, filter/parameter semantics, drilldown/save/share/export payloads, backend API/model suggestions, gaps, verification, and code-ledger sidecar paths.
19. Verify data completeness, permission states, empty/error/timeout/invalid-combination states, and runnable URL when requested.

## Required Output

- Workflow mode, Preflight understanding matrix, target analysts, business scenarios, datasets, and exploration questions.
- Output artifact and implementation mode decision: `vueTemplatePrototype` with `implementationMode: copyTemplateProject` and copied-template `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` by default; any `htmlPrototype` exception must cite the latest explicit user request, and any `newVue3Project` exception must cite the self-developed/non-template reason, not merely PRD/source wording.
- PRD prerequisite proof: PRD status, child registry, full child PRD bundle/files, `CHILD-PRD-PROTOTYPE` sync status, report-path rows consumed, `templateAssetUnderstandingMap`, Appendix G / Template Build Packet seed/current packet proof, PRD-to-workflow execution matrix, self-service rows consumed, blocked/draft rows, and deferred-out-of-scope rows.
- Typed prototype story: one-sentence exploration value, user path, starting question, result/reuse outcome, trust/permission boundary, and 30-second review path.
- Self-service satisfaction gate consumption: `TRUST-*` result quality/source/freshness, `MEET-*` save/share/export reuse when shared upward, management-facing `ESG-*` interpretation when required, and unresolved permission/performance gaps.
- Affected-surface to owning-capability routing, especially field-panel layout, chart, table/pivot, filter, component placement, design-system, template, and runtime QA.
- Data scope, analysis model, operation model, and output/result reuse model.
- Field catalog: dimensions, metrics, time fields, statuses, custom fields, and each field's allowed operations.
- Workbench layout: field panel, configuration area, chart/table/pivot result area, detail drawer, save/share/export controls.
- Dynamic conclusion rule map when generated result summaries or insight conclusions exist: `RULE-*` rows, input fields, triggers, rule logic, fallback, and QA cases.
- Template operation chain: `templateAssetUnderstandingMap`, Template Build Packet path/status and packet-row consumption evidence, `frameworkTemplateId`, `pageLayoutConfig` plus `layoutSectionMap` and `layoutCoordinateMap`, `blockLayoutTemplateMap` with `blockCoordinate`, `slotCount`, `componentSlotPattern`, `slotCoordinateList`, selected direct independent block layout Vue files, and asset availability, `titleAreaConfig`, `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, `componentContentAreaTemplateMap` with `slotCoordinate`, slot pattern code, component slot size, and visual-type size compatibility evidence, `summaryAreaConfig`, `conclusionRuleMap` consumption evidence when generated summaries exist, and self-developed component content area fallback list.
- Result-content boundary: visible exploration/result/trust/reuse content versus process artifacts moved to interaction contract, appendix/handoff, validation, or removal.
- Filter, grouping, sorting, chart switching, drilldown, save/share/export, permission, masking, and performance rules.
- Component/data/filter/control/interaction binding matrix.
- Prototype data summary: `docs/prototype-data-summary.md` with actual self-service data modes, datasets, fields, allowed operations, result component bindings, filter/parameter semantics, drilldown/save/share/export payloads, backend API/model suggestions, `GAP-*` rows, verification, and stale/missing-data decision.
- Anti-laziness execution result: evidence inspected, `LAZY-*` findings or explicit no-finding result, before/after proof for repairs, regression probe, and readiness impact.
- `pageShellPath: template`, selected framework template, `selfDevelopmentExceptionMap`, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not design a BI-looking page unless the data model can support the promised field combinations.
- Do not start analysis model, field metadata, workbench layout, result component mapping, template, or implementation work without a PRD bundle from `report-prd-document-generation` that includes a child registry, full child PRD bundle/files, and usable `CHILD-PRD-PROTOTYPE`.
- Do not start layout or result mapping when `CHILD-PRD-PROTOTYPE` lacks `RTP-SELF-SERVICE` or an accepted `RTP-MIXED` primary path with self-service path rows.
- Do not start layout or result mapping for shared-upward self-service results when `CHILD-PRD-PROTOTYPE` lacks required trust, review/export, or management-facing gate rows.
- Do not generate an HTML/static prototype merely because the PRD, requirement document, attachment, or source sample mentions HTML. The default runnable route is copying a bundled template project and preserving Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios.
- Do not create a new Vue3/Vite project as the default implementation route. Copy the selected bundled template project first; create new Vue3 project structure only for a documented self-developed/non-template exception.
- Do not mark ready until every PRD execution row needed for datasets, fields/metrics, layout, data/API, interactions, permissions, save/share/export, and states is consumed or explicitly deferred out of scope.
- Do not start layout or workbench controls until the exploration story, user path, starting question, result/reuse outcome, and trust/permission boundary are explicit or safely inferred.
- Do not start runnable implementation if any requested self-development target is outside interaction behavior or component content area templates.
- Do not start runnable implementation until `templateAssetUnderstandingMap` and the Template Build Packet are current and the nine-step template operation chain has no missing block configs or slots. The packet must contain rows for the page/block/slot/control/data/conclusion/target file/validation being implemented. `blockLayoutTemplateMap` must name the selected direct independent block layout Vue file, not a size-only `SpanCCxRRLayout` wrapper plus `componentRegionPattern`. Every `3 componentArea` slot must use an existing 组件内容区模板 or a newly registered standalone component content area template with visual-type size compatibility evidence.
- Do not start runnable implementation when `blockCoordinate` or `slotCoordinate` is missing, duplicated, or inconsistent with the PRD/Template Build Packet, `layoutRows`, selected block layout slot order, metric mounting, conclusion rules, or interactions.
- Do not start runnable implementation when `layoutSectionMap` is missing, section row counts do not sum to page `N`, any section is not exact `12*K`, any block lacks `slotCount` / `componentSlotPattern` / `slotCoordinateList`, or any component template maps to an undeclared slot.
- Do not mark ready when layout or QA uses any viewport other than `1920x1080`, when the page ignores `12 * N`/`3*2`/chart `4*3` constraints, or when supplemental metric口径/指标清单 or design-process artifacts are rendered as page modules without an explicit display requirement or business-value justification.
- Do not start implementation or repair from this workflow alone when chart/table/filter/placement surfaces require their specific front-door capabilities.
- Do not mark ready without a Preflight understanding start decision and evidence that required specialty capabilities were loaded or explicitly not needed.
- Do not hide field metadata, invalid combinations, permissions, or performance limits.
- Do not treat save/share/export as optional polish; they decide whether self-service analysis can be reused.
- Do not overload ordinary users with expert controls without templates, presets, or guided defaults.
- Do not put field-panel title bands, filters, filter summary copy, controls, additional information, units, descriptions, or explanation text inside result component content slots. Those stay on 分块布局模板 supporting areas or explicit workbench shell/config blocks.
- Do not claim runnable readiness until non-default field/filter/chart changes visibly alter the result.
- Do not claim readiness when generated result summaries, `4 summaryArea` conclusions, conclusion cards, or analysis insight components are fixed normal-state copy instead of PRD `RULE-*` rules that recompute from current data.
- Do not claim readiness for backend-facing handoff when `docs/prototype-data-summary.md` is missing, generic, stale, or lacks actual dataset/field-operation/filter/result/interaction/API-model/gap/verification content.
- Do not mark ready when the anti-laziness gate is missing, `LAZY-*` findings remain open, or only default field/filter/chart states were checked.
