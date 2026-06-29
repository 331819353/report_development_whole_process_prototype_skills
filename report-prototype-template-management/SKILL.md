---
name: report-prototype-template-management
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于管理可运行报表原型模板资产，选择、复制、二开和校验 Vue/Vite 报表模板。报表开发固定走内置模板：除交互和组件内容区模板可自开发外，页面壳、页面布局、分块布局模板、标题区、辅助信息区、单位区、说明区、导航、筛选、工具栏、导出和权限面必须使用模板。用户提到报表模板、页面模板、模板布局token、模板筛选、选择模板、复制模板、模板二开、topbar、left nav、亮色模板、固定1920大屏、Haier logo、dashboard.config.ts、dashboard.dataset.json、validate-dashboard-contract、启动预览URL时触发。"
---

# Report Prototype Template Management

## Stage Scope

Classification: 原型阶段.

Use this copy only inside any compatible prototype agent bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this workflow.

Agent-neutral rule: this workflow is a capability contract, not a platform-specific instruction file. Capability IDs such as `report-visual-layout-design`, `report-design-system-governance`, and `code-change-ledger-management` are stable routing names; Claude, Hermes, Codex, or another agent must map them to equivalent local prompts, tools, workflow nodes, or documentation before execution.

## Positioning

Use this capability when the task needs a runnable report prototype template or must modify a bundled template. It owns template asset selection, copy strategy, extension points, validation scripts, local startup helpers, and template-specific implementation boundaries.

It does not own report-type business logic, component visual rules, API documentation, or production frontend integration. Those route to `report-type-design`, `report-info-component-mapping`, `report-component-style-design`, and `frontend-development-workflow`.

Default routing: choose `pageShellPath: template`, `outputArtifact: vueTemplatePrototype`, and `implementationMode: copyTemplateProject` for runnable report prototypes. Copy one bundled template project before editing. In the report development flow, custom/free shell, exact shell restoration, existing shell preservation, custom page layout, custom block layout, duplicate filter/nav/toolbar surfaces, static HTML shell paths, and blank new Vue projects are blockers or out-of-scope exceptions, not default implementation routes. The only self-developed surfaces are interaction behavior and component content area templates. PRD wording or source artifacts that mention HTML are evidence only and must not switch the template route to `htmlPrototype`.

Default development stack contract: copied bundled report prototype projects use `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` as one integrated stack. This stack contract describes what the copied template preserves; it does not mean starting from an empty Vue3 engineering project. Do not downgrade this to "Vue 3 only", "Vue 3 + ECharts only", or a hand-built UI shell. Element Plus owns base controls, messages, tables/forms/dialog-ready styling, locale, and CSS variables; ECharts owns standard chart rendering through actual option/series/runtime instances. Add AntV S2 only for pivot/cross/wide analytical table needs.

## Bundled Assets

Template assets live under `assets/templates/<template-id>/`:

- `topbar-light-scroll-dashboard-template`
- `left-nav-analytics-workbench-template`
- `frozen-title-sci-fi-cockpit-template`

Brand assets live under `assets/brand/`:

- `haier-logo.svg`
- `haier-logo-white.svg`
- `haier-logo-original.svg`

Copy templates with their full project structure, including package/config files, `.vscode`, `demo`, `scripts`, `public`, and `src`.

## Reference Loading

| Need | Read |
| --- | --- |
| Template choice | `references/template-routing.md` |
| Template operation flow | `references/template-operation-flow.md` |
| Template asset construction understanding | `references/template-asset-construction-contract.md` |
| Step-by-step operation cards | `references/template-step-operation-cards.md` |
| Weak-model construction packet | `references/template-build-packet-contract.md` |
| Template routing and implementation gates | `references/template-routing-and-implementation-gates.md` |
| Component content area template copy map | `references/component-content-area-template-map.md` |
| Shared extension points | `references/template-shared-contract.md` |
| Prototype data handoff summary | `references/prototype-data-summary-contract.md` |
| Layout tokens and template design system | `references/template-layout-design-system.md` |
| Block title/body chrome style selection | `report-visual-layout-design` `references/block-chrome-style-patterns.md` |
| Topbar template details | `references/template-single-page.md` |
| Left-nav template details | `references/template-left-nav.md` |
| Fixed cockpit template details | `references/template-sci-fi.md` |
| Template use modes | `references/template-usage-modes.md` |
| Template redevelopment | `references/template-redevelopment-playbook.md` |
| Recipe and verification checklist | `references/template-recipes-checklist.md` |
| Report decision compatibility | `report-design-system-governance` `references/09-report-decision-anti-ai-gate.md` |
| Code-file ledger | `code-change-ledger-management` |

## Anti-Laziness Gate

For non-trivial work, apply `quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning capabilities were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

0. Enforce the template-only report development constraint. Framework template, page layout config, block layout templates, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, permission, and shell state use the bundled template contracts. Record any self-developed items only in `selfDevelopmentExceptionMap` with type `interactionBehavior` or `componentContentAreaTemplate`.
0A. Enforce the runnable output stack. Use `outputArtifact: vueTemplatePrototype` and preserve the copied template's Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios stack unless the latest explicit user instruction asks for HTML/static/single-file HTML output. A PRD, requirement document, or HTML source sample is not output-format authority.
0B. Enforce copy-first implementation. Use `implementationMode: copyTemplateProject` by default and copy the selected `assets/templates/<template-id>/` project before source edits. Do not use `npm create vite`, a blank Vue scaffold, or a hand-built Vue project unless the work is reclassified as `implementationMode: newVue3Project` with a documented self-developed/non-template exception, rejected copy candidates, owner, and readiness impact.
0C. Before each step from 1 through 9, apply `references/template-step-operation-cards.md`: state the current step, read only the step inputs, output the step result, run the step stop check, and do not perform later-step work until the current step is complete or explicitly blocked.
0D. For PRD-driven or multi-step template implementation, read `references/template-asset-construction-contract.md`, create `templateAssetUnderstandingMap`, then create or validate a Template Build Packet from `references/template-build-packet-contract.md` before source edits. Treat it as the single construction plan: every page, block, slot, filter, interaction, data/API row, conclusion rule, exception, target file, and validation command must be represented there before implementation consumes it.
1. Select exactly one 框架模板 using display theme, selected pattern cards, content volume, navigation depth, interaction density, and display environment.
2. Design 页面布局配置 through `layoutSectionMap`, `layoutRows`, stable block ids, readable `layoutCoordinateMap`, PRD section 4A `PATH-*` source per visible block, PRD section 4B gate ID traces when applicable, and page/nav widget wiring; for templates with `nav[]`, define substantial nav-page content before copying or editing. Split each page into readable `12*K` parts before raw rows, such as section 1 `12*2`, section 2 `12*3`, section 3 `12*3`; each section records business purpose, local row preview, global row range, and block coordinates. `layoutRows` must be `12 * N` with exactly 12 cells per row, no row longer than 12 cells, and `N >= 8`. Local section A/B previews may repeat for readability, but final machine rows must disambiguate blocks. Use `blockCoordinate` as `R-B` and `slotCoordinate` as `R-B-S`; for example, when section 2 has two `6*3` blocks, the second block is `2-2`, and its first component slot is `2-2-1`.
3. Based on 页面布局配置, the PRD section 4A report-type reading path, applicable section 4B executive satisfaction gates, and `templateAssetUnderstandingMap`, select 分块布局模板 for each page block. Each `blockLayoutTemplateMap` row must carry `blockCoordinate`, the source `RTP-*` / `PATH-*` step, applicable `ESG-*` / `SEV-*` / `ACT-*` / `TRUST-*` / `MEET-*` IDs unless it is support/source/export/permission-only, plus `slotCount`, `componentSlotPattern`, and `slotCoordinateList`. Slot patterns such as `A`, `AB`, `AAB`, and `AABBCC` describe slots inside `3 componentArea`, not page `layoutRows`. Each selectable block layout template must resolve to a direct independent Vue entry file, such as `Span04x03SingleSlotLayout.vue` or `Span06x03DoubleSlotLayout.vue`; the generic `SpanCCxRRLayout.vue` size wrappers are only bases for already registered templates or template backlog, not complete selectable slot-bearing templates. A block layout template is size plus slots, and every block uses the standard areas: `1-1 titleArea` 标题区, `1-2 pillArea` 胶囊按钮区, `2-1 auxMetricArea` 附加信息区, `2-2 unitArea` 单位区, `3 componentArea` 组件区, and `4 summaryArea` 说明区. Do not confuse these internal area codes with page coordinates; standard area targets should use `blockCoordinate + areaName`, such as `2-2:pillArea`.
   - Before selecting SingleSlot or MultiSlot, analyze the user's question, conclusion count, evidence relationship, comparison needs, and density. Choose SingleSlot when one conclusion card/component should dominate the block; choose MultiSlot only when parallel evidence, conclusion-card-plus-driver, comparison, or tightly related components are genuinely needed.
   - In MultiSlot templates, put the conclusion card or primary conclusion component in the first component position whenever the requirement uses componentized conclusions. Use later slots for evidence, drivers, details, actions, or trust/source support. Text-only or narrative conclusions belong to `4 summaryArea` only when the same block has no conclusion card/component; when a conclusion card/component exists, `4 summaryArea` must be `null` or carry only non-conclusion content such as scope, source, caveat, definition, or action note. Every conclusion target must bind `conclusionRuleId` from PRD `conclusionRuleMap`.
   - `1-1 titleArea` and `3 componentArea` are the only always-required block areas. `1-2 pillArea`, `2-1 auxMetricArea`, `2-2 unitArea`, and `4 summaryArea` are optional and should be omitted or recorded as `null` when the requirement does not need them.
4. Configure the 分块布局模板 `1-1 titleArea`: implement the title and title style.
5. Decide whether `1-2 pillArea` is needed. Configure pill buttons when needed; otherwise record `pillAreaConfig: null` with `notNeededReason`. If the PRD includes metric switch, period/month-year switch, local mode switch, scenario switch, or block-level compact control, it must be visible in `1-2 pillArea` unless it belongs to the template-native filter surface or toolbar.
6. Decide whether `2-1 auxMetricArea` is needed. Configure additional information and keep the items evenly distributed when needed; otherwise record `auxMetricAreaConfig: null`.
7. Decide whether `2-2 unitArea` is needed. Configure unit text/style when needed; otherwise record `unitAreaConfig: null`.
8. Based on the selected 分块布局模板 slots, inspect `references/component-content-area-template-map.md` plus the copied template's `src/widgets/templates/component-content-areas/` README/catalog and choose suitable standalone Vue 组件内容区模板 for `3 componentArea` / `componentSlots`; check `widget-config-schemas.ts` visual-type size compatibility before accepting the slot fill. If no suitable template exists, self-develop a new standalone Vue component content area template with ECharts for chart needs and register it before filling the slot. Every slot must carry `slotCoordinate`, slot pattern code, component slot size, visual-type size compatibility evidence, a registered `componentContentAreaTemplateId`, standalone Vue file, copy source/target, sample/source evidence, props/data/state contract, and data binding. Do not attach title/pills, filters, controls, additional information, unit, description, explanation, or summary copy to the component slot. Component content area templates render as rounded rectangles without border lines, and may expose only a removable `20px` top title strip with centered text and `3px` top padding; hide that strip when the parent block layout has only one component slot.
9. Configure `4 summaryArea`: when no conclusion card/component exists, it may carry a data-driven text-only/narrative conclusion through `summaryAreaConfig.conclusionRuleId`, or a static note/caveat/explanation that is not a business conclusion; when a conclusion card/component exists, it must be `null` or carry only non-conclusion content such as scope, source, caveat, definition, or action note.
10. Carry the layout-provided `blockChromePattern` matrix or explicitly inherit `template-default`/`plain-enterprise` for every styled parent block before widget body content is configured. Block chrome is widget/composite-owned and must not create a duplicate shell title band.
11. Verify report-decision compatibility: metric tree/data story, detail/action/trust capacity, realistic data states, and report-designer needs when applicable.
12. Copy or merge the full template into the target.
12A. In the copied project, run `npm run ledger:init` before source edits to create baseline `__change_logs__` sidecars for all scoped source files.
13. Keep shell-owned behavior in template config/data/action registries and widget registries.
14. Preserve native template filter surfaces; configure `filters[]`, data sources, empty-filter values, resolvers, and widget bindings instead of adding a duplicate filter bar. Produce a `filterSurfaceMap` that shows every visible filter/control, option source, default, affected blocks/components, query params, and refresh response.
15. Declare control ownership before adding UI controls. Default: template owns page/global filters, refresh, download/export, topbar actions, logo/title/navigation, and route-level toolbar. Widgets may own only component-scoped interaction behavior that appears in the PRD `selfDevelopmentExceptionMap`, such as drill/detail links, row actions, chart-point actions, drawer/modal triggers, or micro actions that do not duplicate shell controls. Do not move shell-owned controls into components inside the report development flow.
16. Preserve the stack contract before source edits: keep `vue`, `@vitejs/plugin-vue`, `vite`, `typescript`, `vue-tsc`, `element-plus`, `echarts`, and `axios` in package dependencies; keep `src/main.ts` bootstrapping Vue 3 and registering Element Plus; use ECharts for standard chart widgets instead of manual SVG/HTML/CSS/canvas marks.
17. Before editing copied template source, read/create the sidecar code ledger through `code-change-ledger-management`; append version entries after edits.
18. Validate chart/table/component fidelity through owning component references when widgets are added or changed.
18A. After data, filters, widgets, generated conclusion rules, and interactions are configured, generate or update `docs/prototype-data-summary.md` in the copied prototype project using `references/prototype-data-summary-contract.md`. The document must summarize actual data files, data modes, datasets, fields, metric/conclusion inputs, component binding, filter semantics, interaction payloads, backend API/model suggestions, gaps, and verification.
19. Run `npm run ledger:check`, template validation, build, and dev/preview startup when a local URL is required.
20. When widgets are configured, `npm run validate:dashboard` must check list and chart geometry contracts: list-like widgets declare `rowHeightPx`, `visibleRowCount`, and `overflowStrategy`; `3x2` action lists show at most `2` rows and use detail/tooltip/drawer/view-all/table fallback; full line/bar/combo axis charts first estimate post-layout `contentW/contentH` from grid span, `contentWidth`, `rowHeight`, and `cellPadding`, then require `contentW >=300px`, `contentH >=200px`, and `chartBodyH >=180px` unless they explicitly use `compact-sparkline` with legend, Y-axis unit/name, and permanent labels hidden. Blocks under `400px` wide or `250px` high, and blocks under `500px` with dense/long x-axis labels, must declare squeeze/dataZoom/axis-label/fallback strategy. ECharts Cartesian widgets also keep compact `grid.top/right/bottom/left`, side-placed Y-axis titles, bottom X-axis titles, `insideEndTop` target labels, dynamic NPS/score/rate Y-axis ranges, and no legend for single-series charts unless an exception is documented. Pie/donut/rose widgets declare `minAngle` or tiny-slice aggregation/fallback.
21. When a runnable URL exists, run `npm run visual:geometry -- --url <url>` and include `visual-check/geometry-report.json` so clipped content, text overflow, sibling overlap, squeezed rows/cards, list rows where `scrollHeight > clientHeight + 1`, hidden list overflow, narrow/short chart containers, chart body/plot squeeze, chart/table crowding, and SVG label overlap are discovered automatically before readiness.

## Required Output

- Selected template ID and reason.
- Output artifact, implementation mode, and stack decision: `vueTemplatePrototype`, `pageShellPath: template`, `implementationMode: copyTemplateProject`, copied template path, and Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios proof; any `htmlPrototype` exception must cite the latest explicit user request, and any `newVue3Project` exception must cite the self-developed/non-template reason.
- `pageShellPath: template` and `selfDevelopmentExceptionMap`, containing only interaction behavior IDs and component content area template IDs.
- `templateAssetUnderstandingMap`: selected asset root, shell config source, page-layout grid contract, block layout library source, direct selectable block template availability, component content area library source, widget schema source, validator source, and any asset gaps.
- Template operation chain: `templateAssetUnderstandingMap`, Template Build Packet path/status and packet-row consumption evidence, `frameworkTemplateId`, `pageLayoutConfig` with `layoutSectionMap`, exact-12-column and minimum-8-row `layoutRows` audit plus `layoutCoordinateMap`, PRD `RTP-*` / `PATH-*` trace and applicable section 4B gate ID traces per visible block, `filterSurfaceMap`, `toolbarActionMap`, `blockLayoutTemplateMap` with `blockCoordinate`, `slotCount`, `componentSlotPattern`, `slotCoordinateList`, each block's selected direct independent block layout Vue file, and asset availability, `titleAreaConfig`, `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, `componentContentAreaTemplateMap` with `slotCoordinate`, slot pattern code, component slot size, visual-type size compatibility evidence, registered template IDs/Vue files/copy paths/sample evidence, `summaryAreaConfig`, `conclusionRuleMap` consumption evidence, and `selfDevelopmentExceptionMap` entries when component content area templates or interaction behavior are self-developed.
- Step operation checkpoints from `references/template-step-operation-cards.md`: step name, inputs read, operation result, stop check, and blocker/gap for steps 1 through 9.
- Template Build Packet path/status from `references/template-build-packet-contract.md`, including packet sections consumed by the implementation and any blocked/draft rows.
- Compatibility notes for display theme, pattern cards, report decision path, and navigation depth.
- Shell decisions: title, logo, navigation, native filters, toolbar, controls.
- Control ownership matrix: refresh, download/export, copy/share, global filters, local filters, period/date controls, block pills, toolbar actions, drilldown/jump/modal/drawer/popup events, affected params, refresh scope, and any disabled template controls.
- Block chrome configuration: selected `blockChromePattern` per parent widget, source/inheritance reason, component-owned title/body geometry, body background relation, fallback, and inspectable config/DOM/scoped-style hook.
- Asset copy/merge path and files/extension points changed.
- Project-wide code-ledger bootstrap/check proof: `npm run ledger:init` after copy and `npm run ledger:check` before handoff.
- Stack contract proof: package dependencies, `src/main.ts` Vue 3 bootstrap, Element Plus registration/style imports, ECharts runtime ownership for standard chart widgets, and S2 exception only when used.
- Data binding mode and filter-to-widget binding proof.
- Backend-facing data summary artifact: `docs/prototype-data-summary.md`, with dataset catalog, field dictionary, metric/conclusion inputs, component data binding matrix, filter/parameter semantics, interaction payloads, backend API/model suggestions, `GAP-*` rows, and verification.
- Empty-filter configuration and aggregate-row key policy when filters or data contain all/total/synthetic options.
- Code-ledger proof for changed template source files.
- Validation/startup commands, URL, blockers, and template limitations.
- Automated visual geometry audit result: command, viewports, screenshot paths, JSON report path, `VIS-*` findings, or precise Playwright/browser blocker.

## Quality Gate

- Do not choose custom shell/page/block/supporting-area development inside the report development flow. Framework shell, page layout, block layout templates, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, permission, and shell state must use templates; only interaction behavior and component content area templates may be self-developed.
- Do not choose `htmlPrototype`, static HTML output, or a hand-built HTML shell because the PRD, requirement document, attachment, or source sample mentions HTML. Runnable report prototypes default to copying a bundled template project and preserving Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios.
- Do not create a new Vue3/Vite project as the default path. Runnable report prototypes default to copying a bundled template project; `newVue3Project` is allowed only when a self-developed/non-template exception proves no copyable template route is safe.
- Do not mark template configuration ready when a visible block lacks a PRD section 4A `PATH-*` source, unless it is explicitly support/source/export/permission-only.
- Do not mark template configuration ready for management-facing reports when visible first-viewport, severity, action, trust/source, or review/export blocks lack required PRD section 4B gate IDs.
- Do not mark the template implementation ready until the nine-step operation chain is complete: framework template selected, `templateAssetUnderstandingMap` recorded, page layout configured, block layout templates mapped with direct-template asset availability and SingleSlot/MultiSlot rationale, title configured, pill/aux/unit/summary decisions recorded, optional supporting areas configured only when needed, and every `3 componentArea` slot filled by a component content area template or a newly registered standalone ECharts component content area template with visual-type size compatibility evidence.
- Do not mark the template implementation ready when step operation checkpoints from `references/template-step-operation-cards.md` are missing for steps 1 through 9.
- Do not mark PRD-driven or multi-step template implementation ready when the Template Build Packet is missing, blocked, stale, or not consumed by source edits and validation evidence.
- Do not mark PRD-driven or multi-step template implementation ready when `templateAssetUnderstandingMap` is missing, stale, or lacks actual asset evidence from the selected template's block layout library, component content area library, widget schema, and validator.
- Do not accept a selectable 分块布局模板 that exists only as `SpanCCxRRLayout.vue` plus `componentRegionPattern` config. The selected block must name/export/register an independent Vue entry file; generic size wrappers are allowed only as bases for creating new selectable templates.
- Do not choose a nav template unless multiple substantial nav pages are implemented.
- Do not mark ready when a `4 summaryArea` conclusion, conclusion card, or `analysisInsightContract` renders fixed normal-state business copy instead of consuming a PRD `RULE-*` row through `conclusionRuleMap`. Static copy is allowed only for source/scope/caveat/definition/action notes or declared empty/permission/insufficient-data fallbacks.
- Do not accept a generated/copied project that keeps Vue 3 but drops ECharts or Element Plus. Missing `echarts`, `element-plus`, Vue 3 bootstrap, Element Plus global registration/style import, or actual ECharts runtime ownership for chart widgets is a template readiness failure.
- Do not replace Element Plus controls with ad hoc HTML controls for ordinary buttons, selects, popovers, drawers, dialogs, tables, messages, or form-like controls unless the user names an existing project design system and the control is inside an allowed interaction or component content area template exception.
- Do not add duplicate shell, filter bar, toolbar, or navigation layers over existing template slots. Redesign requests for those surfaces are blockers or out-of-scope exceptions for report development.
- Do not fill component slots with block-layout additional information, unit fields, title pills, filters, controls, description/help text, or summary/explanation copy. Component slots carry only the selected standalone Vue component content area file / mounted component; `1-1`, `1-2`, `2-1`, `2-2`, and `4` supporting areas stay on the 分块布局模板.
- Do not accept text, prose, placeholder copy, `visualType` alone, or an inline widget object as a filled component slot. A slot is filled only when it references a registered component content area template ID plus standalone Vue file/sample evidence, or a self-developed component content area template that has already been registered.
- Do not accept `pageLayoutConfig` unless every `layoutRows` row is exactly 12 cells, no row exceeds 12 cells, total rows are at least 8, every block is rectangular, and every block id maps to one widget plus one `blockLayoutTemplateMap` row.
- Do not accept `pageLayoutConfig` unless `layoutSectionMap` exists, every section is exact `12*K`, section row counts sum to page `N`, and local section preview letters are disambiguated in final machine rows.
- Do not accept `pageLayoutConfig`, `blockLayoutTemplateMap`, or `componentContentAreaTemplateMap` when any visible block lacks `blockCoordinate`, any component slot lacks `slotCoordinate`, or coordinates are duplicated/inconsistent with the page preview, `layoutRows`, selected block layout slot order, metric mounting, conclusion rules, or interaction sources.
- Do not accept `blockLayoutTemplateMap` or `componentContentAreaTemplateMap` when any block lacks `slotCount`, `componentSlotPattern`, or `slotCoordinateList`, or when any component content area template row maps to an undeclared slot.
- Do not accept template implementation when `filterSurfaceMap`, `toolbarActionMap`, `pillAreaConfig`, or `interactionBehaviorMap` is missing for a control that changes data, navigation, export, drilldown, modal/drawer/popup state, metric set, date/period, or business-line scope. If a block has no pills, `pillAreaConfig` must include `notNeededReason`.
- Do not accept component content area templates that introduce their own bordered card shell. The component content area root is a rounded rectangle with no border line; its optional top title strip is `20px` high, centered, `3px` top-padded, removable through configuration, and hidden when the parent block layout has only one component slot.
- Do not render duplicate refresh, download/export, copy/share, period/date, global-filter, or toolbar controls in business widgets when the selected template already owns those controls. Duplicate visible controls are `VIS-DUPLICATE-CONTROL` or `RPT-SHELL-DUPLICATE` unless component ownership is explicitly declared and the corresponding template control is disabled/hidden.
- Do not implement parent-block title/body chrome as a shell-level title band, raw copied HTML wrapper, or uninspectable one-off CSS. Styled parent blocks must declare `blockChromePattern` or an inherited default through widget/composite-owned config, props, scoped styles, or DOM attributes, and must preserve chart/table/list body floors.
- Template `filters[]` is for horizontal constraints; schema-changing perspectives belong in nav/page/route/tab/segment/perspective state.
- Template data sources must declare or inherit configurable `emptyFilterValues`; aggregate/subtotal rows must use a distinct `aggregateValue`, `rowRole`, or typed key and must not use `all` as a business primary key unless an upstream legacy contract is isolated, adapted, and downgraded from ready.
- Standard chart/table widgets must use their declared renderer and data contract. Ordinary ECharts axis charts default multi-series legend placement to top center, hide legends for single-series charts, configure Y-axis units through `yAxis.name`/axis-unit metadata, keep raw Y-axis tick labels unit-free, place Y-axis titles on the left/right side, place X-axis titles at the bottom, use compact `grid.top/right/bottom/left`, put target/reference labels at `insideEndTop`, and compute dynamic Y-axis ranges for NPS/score/rate/current-vs-target charts; tooltip/detail carries exact value plus unit.
- `npm run validate:dashboard` must pass the stack and geometry contracts before readiness: package dependencies, Vue 3 `createApp`, Element Plus `app.use(ElementPlus, ...)`, Element Plus CSS, ECharts runtime proof when chart visualTypes are present, required list row contracts, `3x2` action-list row budget, post-layout axis-chart container floors (`contentW >=300px`, `contentH >=200px`), squeeze-risk strategy declaration for narrow/short/dense blocks, full-axis chart `chartBodyH >=180px`, or explicit `compact-sparkline` exception.
- When a runnable URL exists, `npm run visual:geometry -- --url <url>` failures at `major` or above block `ready`. Do not bypass geometry audit by relying only on manual screenshot confirmation. List-row `scrollHeight > clientHeight + 1`, hard-hidden list overflow, axis chart containers under `300px` wide or `200px` high, squeeze-risk containers without strategy metadata, axis chart body below `180px`, and plot-height failures are direct readiness failures.
- Template validation scripts or config contracts do not replace runtime proof. Widget contracts such as `compositePanelContract`, `analysisInsightContract`, chart/table option contracts, and control ownership must map to DOM/CSS/renderer/browser evidence before readiness.
- Changed copied-template source files require code-ledger read/create evidence and post-change version entries.
- Do not mark a copied project ready when `npm run ledger:init` was skipped after copy or `npm run ledger:check` fails before handoff.
- Do not mark a copied prototype `ready` for technical solution, backend/data-service design, frontend integration, or testing handoff when `docs/prototype-data-summary.md` is missing, generic, or stale relative to `dashboard.config.ts`, `dashboard.dataset.json`, `dataSources/registry.ts`, widget data contracts, generated conclusion rules, filters, or interactions.
- Do not expect a `change_logs` folder. The required file-level code-ledger path is the same-directory sidecar `__change_logs__/<code-file-name>.changes.md`; absence of `change_logs` is normal, while absence of required `__change_logs__` sidecars for changed code blocks readiness.
- Load `template-routing-and-implementation-gates.md` before selecting, copying, editing, or accepting bundled report templates.
