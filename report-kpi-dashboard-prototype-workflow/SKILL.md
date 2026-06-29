---
name: report-kpi-dashboard-prototype-workflow
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。运行指标看板类报表原型 workflow。用户提到指标看板、经营看板、驾驶舱、状态总览、目标达成、核心 KPI、同比环比、趋势、排名、异常提醒、预警、现在怎么样时触发；不负责通用报表原型 workflow、自助分析、分析报告、明细报表、API 文档或后端实现。"
---

# KPI Dashboard Prototype Workflow

## Stage Scope

Classification: 原型阶段.

Use this copy only inside any compatible prototype agent bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this workflow.

Agent-neutral rule: this workflow is a capability contract, not a platform-specific instruction file. Capability IDs such as `report-prd-document-generation`, `report-info-component-mapping`, and `report-prototype-template-management` are stable routing names; Claude, Hermes, Codex, or another agent must map them to equivalent local prompts, tools, workflow nodes, or documentation before execution.

## Positioning

Use this workflow when the prototype should monitor business state quickly. It is one of the five peer prototype workflows.

PRD prerequisite: consume `report-prd-document-generation` as the independent parent/child PRD bundle. This workflow executes KPI-dashboard-specific design from `CHILD-PRD-PROTOTYPE`; the main PRD remains business authority. It must not generate a complete PRD internally.

Core intent:

```text
指标看板看“现在怎么样”。
```

Design spine:

```text
look overall -> locate issue -> explain cause -> drive action
result -> diagnosis -> process -> action
```

Even in this workflow, "dashboard" does not mean every module becomes a KPI card. The workflow must keep a bounded KPI summary, then use trend, driver, anomaly, detail, action, and trust components according to the decision path. Use brand/product color and neutral hierarchy for the page language; reserve red/green/orange for documented status, risk, warning, success, error, finance/market, or metric-direction semantics.

Prototype story gate: this workflow does not call `report-prototype-design-thinking` by default. It carries its own typed story gate: reviewers should understand within 30 seconds what the current state is, which object or metric needs attention, and what drilldown or action should happen next.

Prototype layout gate: design and QA target `1920x1080`; page layout uses `12 * N`, minimum `2*1`, default analytical/chart block `3*2`, ordinary chart max `4*3`, and component internals default to center-axis symmetry. Existing design ideas in requirement documents must be checked before landing. Metric口径/指标清单 and design-process artifacts such as 下钻链路清单, component mapping, binding matrix, workflow/gate checklist, dataset field catalogue, and implementation notes are supplemental by default and stay in tooltip/detail/dictionary/interaction contract/validation/handoff unless explicitly requested as visible page content or rewritten as business-value conclusion, evidence, trust/source, or action content.

Template-only gate: this workflow must use templates for framework shell, page layout, block layout templates, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, and permission surfaces. Only interaction behavior and component content area templates may be self-developed, and both must appear in the PRD/workflow `selfDevelopmentExceptionMap`.

Runnable output gate: when implementation, runnable URL, local preview, or deployable prototype is requested, use `outputArtifact: vueTemplatePrototype` with `implementationMode: copyTemplateProject`: copy the selected bundled template project first and preserve its `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` stack. Add AntV S2 only for pivot/cross/wide analytical tables. HTML mentioned inside the PRD, attachments, source files, screenshots, or requirement text is requirement evidence only; it must not switch this workflow to `htmlPrototype`. Use `htmlPrototype` only when the latest explicit user instruction asks for HTML/static/single-file HTML output or exact static HTML preservation. Use `newVue3Project` only for a documented self-developed/non-template exception with rejected copy candidates.

Visual quality gate: a dashboard that passes data/config validation can still fail as a prototype when the first viewport feels empty, fragmented, or template-like. Treat excessive blank space, oversized charts with too few marks, equal-weight blocks, low-contrast tiny copy, half-exposed next-row modules, and component content stretched away from its natural reading group as implementation defects, not polish preferences. A valid KPI dashboard prototype must prove that the first viewport is visually closed enough to answer the current-state question while still hinting at the next diagnostic layer intentionally.

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
| Table standards | `report-table-design-spec` |
| Filter standards | `report-filter-control-design-spec` |
| Component placement | `report-component-placement-spec` |
| Design system | `report-design-system-governance` |
| Quality gates | `quality-gate-validation` |
| Runtime QA | `frontend-runtime-qa-validation` |

## Workflow

1. Run `quality-gate-validation` `references/preflight-understanding-gate.md` before design, repair, template edits, or code. Name affected surfaces, owning capabilities, hard constraints, missing evidence, and start decision.
2. Confirm the PRD prerequisite. If no PRD exists, or the PRD lacks a PRD-to-workflow execution matrix, child PRD registry, section 14 child PRD bundle, or usable `CHILD-PRD-PROTOTYPE`, use `report-prd-document-generation` before continuing. Use `report-requirement-structure-extraction` only to clarify evidence/gaps that must be written back into the PRD.
3. Load `report-prd-document-generation` `references/prototype-workflow-execution-map.md` and validate that PRD sections 1-9 plus 4A, 4B, 5A, and 13 cover the dashboard story, report-type implementation path, executive satisfaction gate, roles, scope, page content, layout, dynamic conclusion rules, metrics, metric mounting, data/API, interactions, and Template Build Packet seed.
4. Confirm mode: design proposal, implementation spec, runnable prototype, repair, or URL handoff.
4A. Lock `outputArtifact: vueTemplatePrototype`, `implementationMode: copyTemplateProject`, and the copied-template Vue/ECharts stack unless the latest explicit user instruction requests HTML/static/single-file output or a documented self-developed/non-template exception requires `newVue3Project`. A PRD section, attachment, or source sample mentioning HTML is not output-format authority.
4B. For runnable or implementation-ready template work, create or validate the current Template Build Packet from `report-prototype-template-management` `references/template-build-packet-contract.md` before source edits. Treat PRD section 13 as the seed and mark every required page, block, slot, data/API, filter/action, interaction, conclusion rule, self-development exception, target file, and validation command as `ready`, `draft`, `blocked`, or `deferred`.
5. Derive the typed prototype story from the PRD section 4A `RTP-*` / `PATH-*` rows and section 4B `ESG-*` rows: who checks the dashboard, what "current state" they must remember in 3 seconds, what 30-second diagnosis path explains it, what status/risk/opportunity is the protagonist, and what 3-minute drilldown/action the page should push.
6. Define the dashboard user path from PRD section 4A first. Default to result judgment -> diagnosis split -> process/driver cause -> detail/action closure only when it matches the selected `RTP-*` pattern; preserve time/org context and trust/freshness across layers.
7. Define the dashboard decision from PRD background/goals and metric list: business health, target progress, abnormality, risk object, root metric, and the next action-worthy drilldown.
6. Lock the KPI set and KPI scope boundary: core KPI, process KPI, risk KPI, formula, unit, period, target, threshold, baseline, owner/source, freshness, and which metrics truly deserve KPI-card treatment.
7. Define `metricDrilldownContract` for every primary metric before ordinary component mapping: root metric, result/diagnosis/process/action layers, trigger events, payload fields, context inheritance, state rules, validation cases, or scoped static exception.
8. Design the first viewport as the result layer plus first diagnostic cue: title, time range, update time, global filters, bounded core KPI summary, target completion, YoY/MoM, threshold/status, abnormal reminder, and one clear path into diagnosis. Avoid filling the viewport with same-weight KPI cards.
9. Design the diagnosis layer: regional/channel/product/customer/org/process comparisons, rankings, contribution, heatmap, or other dimension splits that locate where the issue or opportunity sits.
10. Design the process layer: driver metrics, conversion/process stages, decomposition, waterfall, funnel, bottleneck, or variance evidence that explains why the selected result or diagnosis item moved.
11. Design the action layer: anomaly detail, attention list, owner/status/deadline, export, source jump, assignment route, or detail table that closes the loop.
12. Use `report-type-design`: default primary type is `status-overview`; use `anomaly-monitoring` only when alert handling is the central task.
13. Use `report-info-component-mapping` to bind KPIs, thresholds, trend datasets, anomaly rules, section 4B `ESG-*` / `SEV-*` / `ACT-*` / `TRUST-*` gates, `metricDrilldownContract`, `conclusionRuleMap`, drilldowns, filters, and states.
14. Route chart, table, filter, and component-internal placement surfaces to `report-chart-design-spec`, `report-table-design-spec`, `report-filter-control-design-spec`, and `report-component-placement-spec` before implementation-ready decisions.
15. Run the anti-laziness execution gate from `quality-gate-validation` before implementation-ready, repair, QA, or handoff conclusions. Keep `LAZY-*` findings visible until evidence closes them.
16. Use `report-visual-layout-design` to produce `pageLayoutConfig`: `layoutRows`, stable block ids, readable `layoutCoordinateMap`, block spans, first-viewport plan, and nav/page wiring. Keep the dashboard sparse, layered, and actionable, with reduced uniform card borders, limited KPI-card scope, inherited brand/product color hierarchy, and task-matched non-KPI components.
17. Use `report-prototype-template-management` to execute the nine-step template operation flow and Template Build Packet: `frameworkTemplateId -> pageLayoutConfig -> blockLayoutTemplateMap -> titleAreaConfig -> pillAreaConfig -> auxMetricAreaConfig -> unitAreaConfig -> componentContentAreaTemplateMap -> summaryAreaConfig`. Select the independent 分块布局模板 Vue file for every block, carry `blockCoordinate` (`R-B`) in each block map row, configure title, decide pill buttons, configure evenly distributed additional information, decide units, then fill `3 componentArea` slots with `slotCoordinate` (`R-B-S`) and configure summary/explanation. Every source edit must consume packet rows; any status/conclusion in `4 summaryArea`, conclusion cards, or analysis insight components must consume `conclusionRuleMap`.
18. For every `3 componentArea` slot, choose an existing standalone Vue 组件内容区模板 first. If no suitable template fits, create a standalone ECharts-backed Vue component content area template inside the copied template project and register/copy it before slot fill. This component fallback does not justify a new Vue project. Do not put KPI filters, controls, additional information, units, title pills, description/help text, or summary copy inside the component slot. Example coordinate: `1-2-1` = first component slot inside the second block of page row 1.
19. Use component/chart/table/filter specialty capabilities for any newly selected or self-developed component content area template before implementation-ready decisions.
20. Run a visual density and first-viewport closure check before readiness: identify the primary status block, the first diagnostic evidence block, the action/detail block, and the trust/freshness cue; reject layouts where a block's allocated height is not justified by its content, where a chart has fewer than 5 meaningful marks but consumes a dominant half-screen without labels/target/average/explanation, or where lower modules appear as awkward clipped fragments instead of intentional section hints.
21. After data, filters, widgets, generated conclusion rules, and interactions are configured, create or update `docs/prototype-data-summary.md` with dataset catalog, field dictionary, KPI/conclusion inputs, component binding matrix, filter/parameter semantics, drilldown/action payloads, backend API/model suggestions, gaps, verification, and code-ledger sidecar paths.
22. Verify first-viewport answer, filter linkage, drilldown, abnormal states, refresh/freshness, runtime screenshot/DOM geometry, and runnable URL when requested.

## Required Output

- Workflow mode, Preflight understanding matrix, dashboard user role, business state question, decision/action, time scope, and managed objects.
- Output artifact and implementation mode decision: `vueTemplatePrototype` with `implementationMode: copyTemplateProject` and copied-template `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` by default; any `htmlPrototype` exception must cite the latest explicit user request, and any `newVue3Project` exception must cite the self-developed/non-template reason, not merely PRD/source wording.
- PRD prerequisite proof: PRD status, section 0A child registry, section 14 child PRD bundle, `CHILD-PRD-PROTOTYPE` sync status, section 4A `RTP-*` / `PATH-*` rows consumed, section 13 Template Build Packet seed/current packet proof, PRD-to-workflow execution matrix, KPI-dashboard rows consumed, blocked/draft rows, and deferred-out-of-scope rows.
- Typed prototype story: one-sentence current-state value, user path, protagonist metric/object/risk, supporting evidence, and 30-second review path.
- Executive satisfaction gate consumption: `ESG-*` 3-second answer, 30-second diagnosis path, 3-minute action, `SEV-*` severity ordering, `ACT-*` closure route, `TRUST-*` freshness/source cue, and unresolved gaps.
- Affected-surface to owning-capability routing, especially layout, chart, table, filter, component placement, design-system, template, and runtime QA.
- KPI dictionary: formula, unit, period, target, threshold, baseline, owner/source, freshness, display status.
- KPI scope boundary: which metrics are KPI cards, which metrics stay in charts/tables/text/lists, and why.
- Metric drilldown contract: root metric, result/diagnosis/process/action layers, trigger events, payload fields, context inheritance, state rules, validation cases, and scoped static exceptions.
- Dynamic conclusion rule map: `conclusionRuleMap` with `RULE-*` rows for current-state summary, abnormal warning conclusions, conclusion cards, and analysis insight components.
- Result-content boundary: visible status/conclusion/evidence/action content versus process artifacts moved to interaction contract, appendix/handoff, validation, or removal.
- First-viewport result plan, diagnosis split plan, process/cause plan, anomaly/detail/action plan, each traced to PRD `PATH-*` rows.
- Template operation chain: Template Build Packet path/status and packet-row consumption evidence, `frameworkTemplateId`, `pageLayoutConfig` plus `layoutCoordinateMap`, `blockLayoutTemplateMap` with `blockCoordinate` and selected independent block layout Vue files, `titleAreaConfig`, `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, `componentContentAreaTemplateMap` with `slotCoordinate`, `summaryAreaConfig`, `conclusionRuleMap` consumption evidence, and ECharts self-developed component content area fallback list.
- Drilldown chain: result -> diagnosis -> process -> action.
- Visual density and first-viewport closure result: oversized/empty block scan, chart mark-to-area fit, text contrast/readability, next-section exposure, and evidence-backed repair decisions.
- Filter, refresh, permission, export/share, abnormal, empty/error/no-permission state requirements.
- Component/data/filter/control/interaction binding matrix.
- Prototype data summary: `docs/prototype-data-summary.md` with actual dashboard data modes, datasets, fields, KPI/conclusion inputs, component bindings, filter semantics, drilldown/action payloads, backend API/model suggestions, `GAP-*` rows, verification, and stale/missing-data decision.
- Anti-laziness execution result: evidence inspected, `LAZY-*` findings or explicit no-finding result, before/after proof for repairs, regression probe, and readiness impact.
- `pageShellPath: template`, selected framework template, `selfDevelopmentExceptionMap`, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not turn a dashboard into a dense detail report.
- Do not start KPI dashboard story, layout, KPI scope, component mapping, template, or implementation work without a PRD bundle from `report-prd-document-generation` that includes section 0A child registry, section 14 child PRD bundle, and usable `CHILD-PRD-PROTOTYPE`.
- Do not start layout or component mapping when PRD section 4A lacks `RTP-KPI-DASHBOARD`, `RTP-COCKPIT`, `RTP-RISK-MONITOR`, `RTP-CLOSURE-BOARD`, or an accepted `RTP-MIXED` primary path with `PATH-*` rows.
- Do not start layout or component mapping when a management-facing KPI/dashboard/cockpit PRD lacks section 4B `ESG-*` 3-second answer, 30-second cause path, 3-minute action, required `SEV-*`, `ACT-*`, or `TRUST-*` rows.
- Do not generate an HTML/static prototype merely because the PRD, requirement document, attachment, or source sample mentions HTML. The default runnable route is copying a bundled template project and preserving Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios.
- Do not create a new Vue3/Vite project as the default implementation route. Copy the selected bundled template project first; create new Vue3 project structure only for a documented self-developed/non-template exception.
- Do not mark ready until every PRD execution row needed for dashboard content, layout, metrics, metric mounting, data/API, and interactions is consumed or explicitly deferred out of scope.
- Do not start layout or component selection until the current-state story, user path, protagonist metric/object/risk, and next drilldown/action are explicit or safely inferred.
- Do not start runnable implementation if any requested self-development target is outside interaction behavior or component content area templates.
- Do not start runnable implementation until the Template Build Packet is current and the nine-step template operation chain has no missing block configs or slots. The packet must contain rows for the page/block/slot/control/data/conclusion/target file/validation being implemented. `blockLayoutTemplateMap` must name the selected independent block layout Vue file, not only a generic size wrapper plus `componentRegionPattern`. Every `3 componentArea` slot must use an existing 组件内容区模板 or a newly registered standalone ECharts component content area template.
- Do not start runnable implementation when `blockCoordinate` or `slotCoordinate` is missing, duplicated, or inconsistent with the PRD/Template Build Packet, `layoutRows`, selected block layout slot order, metric mounting, conclusion rules, or interactions.
- Do not mark ready when layout or QA uses any viewport other than `1920x1080`, when the page ignores `12 * N`/`3*2`/chart `4*3` constraints, or when supplemental metric口径/指标清单 or design-process artifacts are rendered as page modules without an explicit display requirement or business-value justification.
- Do not turn a KPI dashboard into a wall of KPI cards. The first viewport may have a bounded KPI summary, but trend, driver, anomaly, detail, action, and trust content must use task-matched component forms.
- Do not rely on uniform card borders to separate every module; use typography, spacing, section rhythm, dividers, and hierarchy before adding more card frames.
- Do not use green/red as the default dashboard language. Brand/product color and neutral hierarchy own identity and emphasis; status colors require documented semantics and non-color cues.
- Do not start implementation or repair from this workflow alone when affected chart/table/filter/placement surfaces require their specific front-door capabilities.
- Do not mark ready without a Preflight understanding start decision and evidence that required specialty capabilities were loaded or explicitly not needed.
- Do not mark ready when the first viewport is legal but visually empty, fragmented, or template-like. Large panels must carry a proportional amount of decision content or be resized/split; sparse charts must add labels, target/average lines, explanatory context, or share space with a relevant list/table.
- Do not accept component internals that stretch title, evidence, metric, and action to the far edges of a tall card when the business content is naturally compact. Re-group the content, reduce the block span, or add supporting evidence/action content.
- Do not put block template supporting areas or local control surfaces inside KPI component content slots. KPI 卡附加信息区、单位区、说明区, filters, controls, and title pills stay on the 分块布局模板 or shell/page config; the component content area carries only the KPI/card/chart internal component body plus the optional removable content title.
- Do not accept a lower section that is accidentally clipped into the first viewport in a way that looks like miscalculated layout. Either complete the first viewport group, create an intentional section transition, or adjust row height/spans.
- Do not treat screenshot-free browser QA as enough for visual quality. Runtime evidence must include at least one screenshot plus DOM checks for text overflow, chart/canvas presence, and fixed-height clipping/overflow for the repaired viewport.
- Do not use unbounded gauges or decorative charts for variety.
- Do not show only result metrics when process or risk metrics are needed to explain status.
- Do not mark every fluctuation as an anomaly; thresholds and severity must be explicit.
- Do not claim readiness unless the first viewport answers the current-state question and drilldown destinations are defined.
- Do not claim readiness unless every primary KPI has `metricDrilldownContract` coverage from result to diagnosis, process/cause, and detail/action, or an explicit scoped static exception.
- Do not claim readiness when a status summary, abnormal warning conclusion, `4 summaryArea` conclusion, conclusion card, or analysis insight component uses fixed normal-state copy instead of a PRD `RULE-*` rule that recomputes from current data.
- Do not claim readiness for backend-facing handoff when `docs/prototype-data-summary.md` is missing, generic, stale, or lacks actual dashboard dataset/field/KPI/filter/drilldown/API-model/gap/verification content.
- Do not mark ready when the anti-laziness gate is missing, `LAZY-*` findings remain open, or implementation/QA evidence is only generic screenshots, default states, or unchecked assumptions.
