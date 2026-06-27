---
name: report-design-workflow
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。运行通用报表、仪表盘、数据大屏、页面原型的设计和可运行原型编排。用户明确提到原型、页面原型、报表原型、仪表盘原型、大屏原型、demo、样机、截图/HTML还原、HTML源码原型、mock数据原型、模板原型、可运行URL、本地预览、部署预览、Vue报表原型，且没有明确要求自助分析、指标看板、分析报告、明细报表专项 workflow 时触发；默认加载通用原型设计思路，开发过程中执行行动前自省，并默认用内置报表模板和 Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios；AntV S2 仅在分析型表格需要时加入；HTML中的SVG/canvas标准图表只作证据，应重建为ECharts；报表开发流程内除交互和组件内容区模板可自开发外，其余页面壳、布局、分块与支持区必须使用模板。"
---

# Report Design Workflow

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this workflow only when the user asks for a report/page/dashboard prototype, runnable demo, screenshot/HTML restoration, template-based prototype, or preview URL. It orchestrates atomic skills and keeps implementation details in the owning skills.

PRD prerequisite: this workflow consumes a complete PRD from `$report-prd-document-generation`. If the request has no PRD, or the PRD lacks the required PRD-to-workflow execution matrix, generate/update the PRD first and then continue from that contract. Do not recreate full PRD content inside this workflow.

Default policy: load `$report-prototype-design-thinking` for the generic design-thinking layer, then use a bundled report template and `Vue 3 + TypeScript + Vite + Element Plus + ECharts + AntV S2 + axios`. In the report development flow, `pageShellPath` is fixed to `template`: framework shell, page layout, block layout templates, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, and permission surfaces are configured through templates. Only interaction behavior and component content area templates may be self-developed.

Source-material policy: every user-provided message, screenshot, HTML, Markdown/MD, copied source, code, data file, or document is first converted into requirement evidence: confirmed facts, inferred assumptions, gaps, component/data/filter/interaction constraints, and acceptance checks. Source file format is not output-format authority. Only explicit wording such as "输出 HTML", "单 HTML 文件", "HTML 格式原型", or "保留静态 HTML" switches the prototype output to HTML; otherwise runnable prototypes default to bundled `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios`.

## Child Skills

| Stage | Skill |
| --- | --- |
| PRD prerequisite | `$report-prd-document-generation` |
| Requirement evidence clarification | `$report-requirement-structure-extraction` |
| Prototype design thinking | `$report-prototype-design-thinking` |
| Report business type | `$report-type-design` |
| Component/data/filter/interaction mapping | `$report-info-component-mapping` |
| Frontend design-improvement routing | `$frontend-design-improvement-workflow` |
| Page layout | `$report-visual-layout-design` |
| Runnable template assets | `$report-prototype-template-management` |
| Component visual details | `$report-component-style-design` |
| Reusable component standards | `$report-component-design-spec` |
| Reusable design standards | `$report-design-system-governance` |
| Haier enterprise app UI standard | `$haier-enterprise-app-ui-design-spec` |
| Code file ledgers | `$code-change-ledger-management` |
| Delivery/version index | `$delivery-version-management` |
| Delivery pipeline governance | `$report-delivery-pipeline-governance` |
| Artifact readability | `$artifact-readability-standard` |
| Environment profile contract | `$environment-profile-contract` |
| Quality gates | `$quality-gate-validation` |
| Runtime visual QA | `$frontend-runtime-qa-validation` |

## Reference Loading

- Stage gates and modes: `references/01-workflow-modes-and-stage-gates.md`; load `references/01a-workflow-visual-implementation-gates.md` for Stage 8 visual layout, Stage 9 component style, and Stage 10 template/implementation gates.
- PRD prerequisite and execution map: `$report-prd-document-generation` `references/prototype-workflow-execution-map.md`; load before design, layout, template, component, or implementation work.
- Preflight understanding gate: `$quality-gate-validation` `references/preflight-understanding-gate.md`
- Default prototype design thinking: `$report-prototype-design-thinking` before display theme, report type, layout, or template decisions.
- Good-report decision path: `$report-prototype-design-thinking` `references/02-good-report-decision-path.md` when report/dashboard/BI pages are designed, mapped, accepted, or repaired.
- Conclusion explanation chain: `$report-prototype-design-thinking` `references/02-good-report-decision-path.md` and `$report-info-component-mapping` `references/01-question-component-flow.md` when report sections/components are planned.
- Startup/deployment self-check: `references/02-self-check-startup-deployment.md`
- Output quality and avoid list: `references/03-output-quality-and-avoid.md`
- Display themes and pattern chain: `references/04-common-display-theme-pattern-chain.md`
- Block title/body chrome style selection: `$report-visual-layout-design` `references/block-chrome-style-patterns.md` when source samples define parent-block title/background style or when styled report blocks are needed.
- Anti-squeeze row-group expansion and vacancy reflow: `$report-visual-layout-design` `references/block-size-constraints-05-anti-squeeze-reflow.md` when dense KPI/chart/table/composite blocks are mapped, laid out, repaired, or accepted.
- Template operation flow: `$report-prototype-template-management` `references/template-operation-flow.md` before copying, editing, or accepting bundled template implementations.
- Modern SaaS / BI Dashboard / UI Kit positive style contract: `$report-design-system-governance` `references/12-modern-saas-bi-style-contract.md` when that design language is requested.
- Detailed prototype implementation gates: `references/05-prototype-implementation-gates.md`
- Code-file ledger: `$code-change-ledger-management` before code edits.
- Delivery pipeline handoff: `$report-delivery-pipeline-governance` when a prototype feeds technical solution, backend, frontend, testing, release, or retest work.
- Environment profile contract: `$environment-profile-contract` when a runnable URL or deployable profile is part of the handoff.
- Report anti-AI and report-decision gates: `$report-design-system-governance` relevant references for any report/dashboard/BI/detail-query/cockpit/topic-analysis/report-designer prototype.

## Workflow

1. Run the Preflight understanding gate before layout, template, styling, or code. Name the workflow mode, evidence inventory, authority order, affected surfaces, owning skills, hard constraints, missing evidence, and start decision.
2. Confirm the PRD prerequisite. If no complete PRD exists, use `$report-prd-document-generation` to create one. If source evidence is unclear, use `$report-requirement-structure-extraction` only to feed facts/gaps back into the PRD. Do not continue design from unstructured notes.
3. Load `$report-prd-document-generation` `references/prototype-workflow-execution-map.md` and create/validate the PRD section execution matrix. Every PRD section must map to a downstream owner skill, execution artifact, blocking rule, and status before workflow design starts.
4. Confirm prototype intent and mode: design spec, runnable implementation, screenshot/HTML restoration, repair, or URL handoff.
5. Run the anti-laziness execution gate from `$quality-gate-validation` for design routing, implementation, repair, HTML restoration, QA, or handoff. Keep `LAZY-*` findings visible until evidence closes them.
6. Before each non-trivial mode, template, visual-source, component, renderer, or source-code action, run the action reflection loop from `$quality-gate-validation` `references/preflight-understanding-gate.md`; revise or stop when the action fails hard constraints or design reasonableness.
7. Convert every provided source artifact, including HTML/MD/source files, into a source-material requirement matrix only as PRD evidence. Update the PRD before selecting output format, shell, template, or code path when new facts affect scope/layout/metrics/API/interactions.
8. Load `$report-prototype-design-thinking` as the default generic thinking layer. Do not branch into 自助分析、指标看板、分析报告、or 明细报表 inside this workflow; those are separate workflow skills.
8. Choose one `displayTheme`, one primary report type, one style baseline when requested, and a small reusable pattern-card set. Record rejected competing themes and rejected generic style directions.
9. Run anti-AI and report-decision gates before layout, styling, or code.
   Carry the visual constraints from the design-system gates: reduce uniform card borders, do not KPI-ize every module, inherit brand/product color before status colors, lower default green/red dependence, and choose information flow instead of generic dashboard collage unless current-state monitoring justifies it.
10. Use `$report-info-component-mapping` to produce analysis perspectives, answer atoms, component bundles, datasets, filters, interactions, binding matrix, and a filter/value semantics table.
    The binding matrix must carry the conclusion explanation chain: overall conclusion, supporting sections, section conclusions, and component evidence roles.
    Dense or metric-bearing bundles must carry `layoutFitContract` before layout handoff.
11. Run the result-content boundary check before layout or implementation: visible report content must pass a business-value test, while design-process artifacts such as 下钻链路清单, 指标清单, component mapping, binding matrix, workflow/gate checklists, dataset field catalogues, and implementation notes stay in contracts, interactions, tooltip/detail/dictionary, validation, appendix/handoff, or QA evidence by default.
12. Decide `outputArtifact`: default `vueTemplatePrototype`; use `htmlPrototype` only when the user explicitly requests HTML/static/single-file HTML output or exact static HTML preservation.
13. Declare `pageShellPath: template` and the self-development exception map. In report development, custom/free shell, exact shell restoration, custom page layout, custom block layout, duplicate filter/navigation/toolbar surfaces, and static HTML shell paths are blockers or out-of-scope exceptions, not implementation routes. The only allowed self-developed entries are interaction behavior IDs and component content area template IDs.
14. If HTML/source is provided, classify any SVG/canvas/DOM chart marks as sample evidence, not standard-chart implementation. Standard charts must be rebuilt with ECharts/data-driven options unless an explicit custom-diagram exception is documented.
15. Use `$report-visual-layout-design` for shell, navigation, filter surface, `12 * N` grid, block sizing, page规范, and per-parent-block `blockChromePattern` selection. Its handoff must include `pageLayoutConfig`: `layoutRows`, stable block ids, block spans, first-viewport plan, and nav/page wiring.
16. Use `$report-prototype-template-management` to execute the nine-step template operation flow: `frameworkTemplateId -> pageLayoutConfig -> blockLayoutTemplateMap -> titleAreaConfig -> pillAreaConfig -> auxMetricAreaConfig -> unitAreaConfig -> componentContentAreaTemplateMap -> summaryAreaConfig`. Select the independent 分块布局模板 Vue file for every page block, configure title, decide pill buttons, configure evenly distributed additional information, decide units, then fill only `3 componentArea` slots with 组件内容区模板 and configure summary/explanation on `4 summaryArea`.
17. Route chart, table, filter, component-placement, and reusable component work to `$report-chart-design-spec`, `$report-table-design-spec`, `$report-filter-control-design-spec`, `$report-component-placement-spec`, or `$report-component-design-spec` whenever those surfaces are affected. If no suitable 组件内容区模板 exists for a slot, define the ECharts/table/list contract here before creating the standalone Vue component content area template.
18. Use `$report-component-style-design` and `$report-component-design-spec` for component fit, chart/table/KPI readability, reusable component rules, and the internal geometry of each selected or newly created 组件内容区模板. Component content area templates must be standalone Vue files and must not include block title, pill, filters, controls, additional information, unit, description/help, summary, or explanation areas.
19. Apply Haier UI as the company-level application baseline for Haier/enterprise report pages, then apply report design-system rules as report-specific extensions. Skip Haier baseline only for explicit non-Haier/native sample/neutral brand decisions.
20. Before implementation or repair touches source, read/create code ledgers for every changed file through `$code-change-ledger-management`; append version entries after edits.
21. Start/verify the prototype when a runnable URL is requested and route runtime findings through `$frontend-runtime-qa-validation`.
22. For handoff artifacts, apply `$artifact-readability-standard` and `$report-delivery-pipeline-governance` so downstream technical solution, backend, frontend, and testing workflows know the entry conditions.

## Required Output

- Workflow mode, Preflight understanding matrix, input inventory, prototype design-thinking output, core narrative, user path, key decision points, target user/scenario/decision/action, `displayTheme`, pattern cards, report type, and core question.
- PRD prerequisite proof: PRD status, source PRD path or generated output, PRD-to-workflow execution matrix, blocked/draft rows, and how every PRD section is consumed or explicitly deferred.
- Source-material requirement matrix: every user-provided message/file/source artifact, extracted facts, inferred assumptions, gaps, affected requirement areas, and whether it is output-format authority.
- Output artifact decision: `vueTemplatePrototype` by default, or `htmlPrototype` with the user's explicit HTML/static-output wording.
- Good-report decision-path output: primary decision question, 3-second main point, conclusion/evidence/cause/detail/action sequence, comparison baseline, metric relationship network, drilldown/action path, and `RPT-*` findings.
- Conclusion explanation chain output: `overallConclusion`, supporting sections, each `sectionConclusion`, component evidence roles, and `RPT-NO-OVERALL-CONCLUSION` / `RPT-ORPHAN-SECTION` / `RPT-ORPHAN-COMPONENT` findings.
- Result-content boundary: visible business-value conclusions/evidence/actions versus internal process artifacts; record any removed 下钻链路清单, 指标清单, component mapping, binding matrix, workflow/gate, dataset-field, or implementation-note content and where it moved.
- Style baseline decision when applicable: inherited source hierarchy, modern SaaS / BI Dashboard / UI Kit contract mapping, and unresolved `VIS-*` design-language findings.
- Visual constraint decision: information-flow vs dashboard rhythm, KPI scope boundary, card-border reduction strategy, and brand-vs-status color rule.
- Block chrome style decision: for each styled parent block, record `blockChromePattern`, source evidence, business-role selection reason, title-stage geometry, body background relation, density, fallback, and proof hook; if no special chrome is used, record the inherited `template-default` or `plain-enterprise` decision.
- Action reflection checkpoints for non-trivial mode/template/component/renderer/source-code decisions, especially when HTML/source samples are used.
- Anti-laziness execution result: local/source evidence inspected, `LAZY-*` findings or explicit no-finding result, before/after proof for repairs, regression probe, and readiness impact.
- Affected-surface to owning-skill routing, including chart/table/filter/component-placement/design-system skills when applicable.
- Anti-AI and report-decision gate result.
- Analysis perspective and component/data/filter/control/interaction binding matrix.
- Filter/value semantics table with `detailValue`, `aggregateValue`, `emptyFilterValue`, display label, data-row role, query behavior, and primary-key eligibility.
- Layout plan, selected framework template, template-only decision, self-development exception map, filter surface mapping, perspective-layer mapping, baseline inheritance decision, anti-squeeze row-group/vacancy reflow decisions when triggered, and implementation target path.
- Template operation chain: `frameworkTemplateId`, `pageLayoutConfig`, `blockLayoutTemplateMap` with selected independent block layout Vue files, `titleAreaConfig`, `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, `componentContentAreaTemplateMap`, `summaryAreaConfig`, ECharts self-developed component content area fallbacks, and validation evidence for every filled slot.
- Files changed, code-ledger proof, verification commands, URL or blocker.
- Quality-gate findings and readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not use this workflow without prototype/demo/page-output intent.
- Do not start design, layout, component mapping, template copying, implementation, or repair without a PRD from `$report-prd-document-generation` or a freshly generated draft PRD. `$report-requirement-structure-extraction` is evidence intake only, not a complete PRD substitute.
- Do not mark the workflow `ready` until every PRD-to-workflow execution row is consumed by an artifact or explicitly `deferred-out-of-scope`.
- Do not skip `$report-prototype-design-thinking` for new prototype work unless the user provides an already structured prototype design brief with core narrative, user path, key decision points, user/scenario/decision/action, metric layers, analysis path, and block intent.
- Do not start implementation, repair, layout, or template copying before the Preflight understanding gate has a `ready-to-start` or bounded `partial-start` decision.
- Do not continue from the initial preflight into implementation on autopilot. Non-trivial template, component, renderer, data, layout, HTML conversion, and readiness actions require action reflection; revise or stop when the action conflicts with constraints or design reasonableness.
- Do not treat Haier UI and report design-system baselines as alternatives for Haier/enterprise report pages; inherit Haier application tokens/base controls and then apply report-specific rules.
- Do not rely only on this top-level workflow when a chart, table, filter, component-placement, or reusable component standard is affected; route to the specific front-door skill before implementation or acceptance.
- Do not implement before display theme, report type, binding matrix, layout, `pageShellPath: template`, selected framework template, and self-development exception map exist.
- Do not implement or accept a bundled-template prototype before the nine-step template operation chain exists: `frameworkTemplateId`, `pageLayoutConfig`, `blockLayoutTemplateMap`, `titleAreaConfig`, `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, `componentContentAreaTemplateMap`, and `summaryAreaConfig`. `blockLayoutTemplateMap` must name the selected independent block layout Vue file, not only a generic size wrapper plus `componentRegionPattern`. Every `3 componentArea` slot must be filled by an existing 组件内容区模板 or a newly registered standalone ECharts component content area template.
- Do not implement a dense KPI/chart/table/composite layout before `layoutFitContract` and anti-squeeze reflow decisions exist. Crowding must be resolved by row-group expansion, wider/full-row move with vacancy handling, split/tab/drawer/fullscreen/pagination, or density reduction, not by font shrinkage, hidden overflow, or empty sibling stretching.
- Do not start implementation from raw HTML, Markdown/MD, copied source, screenshots, or docs before converting them into requirement facts, assumptions, gaps, bindings, and acceptance checks.
- Do not output HTML or static single-file prototypes merely because the user provided HTML/MD/source files; HTML output requires an explicit user request for HTML/static/single-file HTML or exact static preservation.
- Do not implement a requested modern SaaS / BI Dashboard / UI Kit page before the positive style contract is mapped to tokens, hierarchy, component count, and chart-lightness proof obligations.
- Do not implement a prototype as a same-weight bordered-card grid, KPI wall, or red/green semantic-color page unless the report-decision gate records an explicit business reason and proof obligations.
- Do not fill styled parent blocks with final business content before selecting or explicitly inheriting the block title/body chrome pattern. User-provided HTML/CSS block samples must become `blockChromePattern` evidence and controlled pattern contracts, not hidden one-off markup or output-format authority.
- Do not implement a report prototype that is only an information collection. The page must help the reader make one primary judgment, then expose evidence, cause, detail, and action paths according to the report type.
- Do not implement a report prototype as peer modules without a conclusion explanation chain. A non-detail-only report must start with one overall conclusion, then use sections with partial conclusions and components that explain those partial conclusions.
- Do not render design-process artifacts as report results. 下钻链路 may appear as an actionable control, breadcrumb, drawer/jump route, or detail entry tied to current context; it must not appear as a standalone design-chain list. 指标清单, component mappings, binding matrices, workflow/gate outputs, dataset field catalogues, and implementation notes stay out of the visible page unless the user explicitly asks for visible documentation or the item passes the business-value test as conclusion, evidence, trust, or action content.
- Do not reuse one sentinel value such as `all` for detail rows, aggregate rows, and empty/no-filter state. "All detail rows", "aggregate row", and "empty filter value" must be declared as separate semantics before implementation.
- Do not choose custom shell/page/block/supporting-area development inside the report development flow. Framework shell, page layout, block layout templates, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, and permission surfaces must use templates; only interaction behavior and component content area templates may be self-developed.
- Template-native filters and shell slots must be reused; redesign requests for those surfaces are blockers or out-of-scope exceptions for this report development workflow.
- Component slots must not carry block-layout supporting areas or local control surfaces. Title, pill buttons, filters, controls, additional information, units, description/help text, and summary/explanation copy stay on the 分块布局模板 areas `1-1`, `1-2`, `2-1`, `2-2`, and `4`, shell/page config, or non-slot widgets.
- Do not silently degrade the default runnable stack to Vue 3 only, Vue 3 + ECharts without Element Plus, or Vue 3 + Element Plus with hand-drawn charts. Stack exceptions require a named source authority and readiness impact.
- Standard charts must be real ECharts option/series/runtime components; S2-class analytical tables must use S2/project-equivalent behavior.
- HTML-provided SVG/canvas/DOM chart marks are visual/source evidence only. Do not copy or keep them as standard chart implementation; rebuild standard charts as ECharts data-driven components unless a named custom-diagram exception is approved.
- Changed prototype source files require code-ledger read/create evidence and post-change version entries.
- Do not mark prototype/design work ready when the anti-laziness gate is missing, `LAZY-*` findings remain open, available local evidence was not inspected, or the conclusion only says "optimized/looks good/implemented" without proof.
- Load `05-prototype-implementation-gates.md` before implementing, repairing, or accepting runnable prototypes.
