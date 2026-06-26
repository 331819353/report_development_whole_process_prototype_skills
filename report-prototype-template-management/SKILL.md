---
name: report-prototype-template-management
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于管理可运行报表原型模板资产，选择、复制、二开和校验 Vue/Vite 报表模板。报表原型默认走内置模板，只有用户明确自定义/精确复刻/保留现有壳或模板无法满足时才走 custom。用户提到报表模板、页面模板、模板布局token、模板筛选、选择模板、复制模板、模板二开、topbar、left nav、亮色模板、固定1920大屏、Haier logo、dashboard.config.ts、dashboard.dataset.json、validate-dashboard-contract、启动预览URL时触发。"
---

# Report Prototype Template Management

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this skill when the task needs a runnable report prototype template or must modify a bundled template. It owns template asset selection, copy strategy, extension points, validation scripts, local startup helpers, and template-specific implementation boundaries.

It does not own report-type business logic, component visual rules, API documentation, or production frontend integration. Those route to `$report-type-design`, `$report-info-component-mapping`, `$report-component-style-design`, and `frontend-development-workflow`.

Default routing: choose `pageShellPath: template` for runnable report prototypes unless the user explicitly asks for custom/free design, exact screenshot/HTML/source restoration, existing shell preservation, or a documented bundled-template limitation.

Default development stack contract: bundled report prototype projects use `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` as one integrated stack. Do not downgrade this to "Vue 3 only", "Vue 3 + ECharts only", or a hand-built UI shell. Element Plus owns base controls, messages, tables/forms/dialog-ready styling, locale, and CSS variables; ECharts owns standard chart rendering through actual option/series/runtime instances. Add AntV S2 only for pivot/cross/wide analytical table needs.

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
| Template routing and implementation gates | `references/template-routing-and-implementation-gates.md` |
| Shared extension points | `references/template-shared-contract.md` |
| Layout tokens and template design system | `references/template-layout-design-system.md` |
| Block title/body chrome style selection | `$report-visual-layout-design` `references/block-chrome-style-patterns.md` |
| Topbar template details | `references/template-single-page.md` |
| Left-nav template details | `references/template-left-nav.md` |
| Fixed cockpit template details | `references/template-sci-fi.md` |
| Template use modes | `references/template-usage-modes.md` |
| Template redevelopment | `references/template-redevelopment-playbook.md` |
| Recipe and verification checklist | `references/template-recipes-checklist.md` |
| Report decision compatibility | `$report-design-system-governance` `references/09-report-decision-anti-ai-gate.md` |
| Code-file ledger | `$code-change-ledger-management` |

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Select exactly one 框架模板 using display theme, selected pattern cards, content volume, navigation depth, interaction density, and display environment.
2. Design 页面布局配置 through `layoutRows`, stable block ids, and page/nav widget wiring; for templates with `nav[]`, define substantial nav-page content before copying or editing.
3. Based on 页面布局配置, select 分块布局模板 for each page block. Each selectable block layout template must resolve to an independent Vue entry file, such as `Span04x03SingleSlotLayout.vue` or `Span06x03DoubleSlotLayout.vue`; the generic `SpanCCxRRLayout.vue` size wrappers are only bases for creating new selectable templates. A block layout template is size plus slots, and every block uses the standard areas: `1-1 titleArea` 标题区, `1-2 pillArea` 胶囊按钮区, `2-1 auxMetricArea` 附加信息区, `2-2 unitArea` 单位区, `3 componentArea` 组件区, and `4 summaryArea` 说明区.
   - Before selecting SingleSlot or MultiSlot, analyze the user's question, conclusion count, evidence relationship, comparison needs, and density. Choose SingleSlot when one conclusion card/component should dominate the block; choose MultiSlot only when parallel evidence, conclusion-card-plus-driver, comparison, or tightly related components are genuinely needed.
   - In MultiSlot templates, put the conclusion card or primary conclusion component in the first component position whenever the requirement uses componentized conclusions. Use later slots for evidence, drivers, details, actions, or trust/source support. Text-only or narrative conclusions belong to `4 summaryArea` only when the same block has no conclusion card/component; when a conclusion card/component exists, `4 summaryArea` must be `null` or carry only non-conclusion content such as scope, source, caveat, definition, or action note.
   - `1-1 titleArea` and `3 componentArea` are the only always-required block areas. `1-2 pillArea`, `2-1 auxMetricArea`, `2-2 unitArea`, and `4 summaryArea` are optional and should be omitted or recorded as `null` when the requirement does not need them.
4. Configure the 分块布局模板 `1-1 titleArea`: implement the title and title style.
5. Decide whether `1-2 pillArea` is needed. Configure pill buttons when needed; otherwise record `pillAreaConfig: null`.
6. Decide whether `2-1 auxMetricArea` is needed. Configure additional information and keep the items evenly distributed when needed; otherwise record `auxMetricAreaConfig: null`.
7. Decide whether `2-2 unitArea` is needed. Configure unit text/style when needed; otherwise record `unitAreaConfig: null`.
8. Based on the selected 分块布局模板 slots, choose suitable standalone Vue 组件内容区模板 for `3 componentArea` / `componentSlots`; if no suitable template exists, self-develop a new standalone Vue component content area template with ECharts for chart needs. Do not attach title/pills, filters, controls, additional information, unit, description, explanation, or summary copy to the component slot. Component content area templates render as rounded rectangles without border lines, and may expose only a removable `20px` top title strip with centered text and `3px` top padding; hide that strip when the parent block layout has only one component slot.
9. Configure `4 summaryArea`: when no conclusion card/component exists, it may carry a text-only/narrative conclusion, note, caveat, or explanation; when a conclusion card/component exists, it must be `null` or carry only non-conclusion content such as scope, source, caveat, definition, or action note.
10. Carry the layout-provided `blockChromePattern` matrix or explicitly inherit `template-default`/`plain-enterprise` for every styled parent block before widget body content is configured. Block chrome is widget/composite-owned and must not create a duplicate shell title band.
11. Verify report-decision compatibility: metric tree/data story, detail/action/trust capacity, realistic data states, and report-designer needs when applicable.
12. Copy or merge the full template into the target.
13. Keep shell-owned behavior in template config/data/action registries and widget registries.
14. Preserve native template filter surfaces; configure `filters[]`, data sources, empty-filter values, resolvers, and widget bindings instead of adding a duplicate filter bar.
15. Declare control ownership before adding UI controls. Default: template owns page/global filters, refresh, download/export, topbar actions, logo/title/navigation, and route-level toolbar; widgets own only current-component local filters, drill/detail links, and component-scoped micro actions. If a business component must own a normally shell-owned control, set `controlOwnership: "component"` or an equivalent explicit decision and disable/hide the matching template control.
16. Preserve the stack contract before source edits: keep `vue`, `@vitejs/plugin-vue`, `vite`, `typescript`, `vue-tsc`, `element-plus`, `echarts`, and `axios` in package dependencies; keep `src/main.ts` bootstrapping Vue 3 and registering Element Plus; use ECharts for standard chart widgets instead of manual SVG/HTML/CSS/canvas marks.
17. Before editing copied template source, read/create the sidecar code ledger through `$code-change-ledger-management`; append version entries after edits.
18. Validate chart/table/component fidelity through owning component references when widgets are added or changed.
19. Run template validation, build, and dev/preview startup when a local URL is required.
20. When widgets are configured, `npm run validate:dashboard` must check list and chart geometry contracts: list-like widgets declare `rowHeightPx`, `visibleRowCount`, and `overflowStrategy`; `3x2` action lists show at most `2` rows and use detail/tooltip/drawer/view-all/table fallback; full line/bar/combo axis charts first estimate post-layout `contentW/contentH` from grid span, `contentWidth`, `rowHeight`, and `cellPadding`, then require `contentW >=300px`, `contentH >=200px`, and `chartBodyH >=180px` unless they explicitly use `compact-sparkline` with legend, Y-axis unit/name, and permanent labels hidden. Blocks under `400px` wide or `250px` high, and blocks under `500px` with dense/long x-axis labels, must declare squeeze/dataZoom/axis-label/fallback strategy. ECharts Cartesian widgets also keep compact `grid.top/right/bottom/left`, side-placed Y-axis titles, bottom X-axis titles, `insideEndTop` target labels, dynamic NPS/score/rate Y-axis ranges, and no legend for single-series charts unless an exception is documented. Pie/donut/rose widgets declare `minAngle` or tiny-slice aggregation/fallback.
21. When a runnable URL exists, run `npm run visual:geometry -- --url <url>` and include `visual-check/geometry-report.json` so clipped content, text overflow, sibling overlap, squeezed rows/cards, list rows where `scrollHeight > clientHeight + 1`, hidden list overflow, narrow/short chart containers, chart body/plot squeeze, chart/table crowding, and SVG label overlap are discovered automatically before readiness.

## Required Output

- Selected template ID and reason.
- Template operation chain: `frameworkTemplateId`, `pageLayoutConfig`, `blockLayoutTemplateMap` with each block's selected independent block layout Vue file, `titleAreaConfig`, `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, `componentContentAreaTemplateMap`, `summaryAreaConfig`, and `echartsSelfDevelopedTemplateMap` when fallbacks are created.
- Compatibility notes for display theme, pattern cards, report decision path, and navigation depth.
- Shell decisions: title, logo, navigation, native filters, toolbar, controls.
- Control ownership matrix: refresh, download/export, copy/share, global filters, local filters, period/date controls, toolbar actions, and any disabled template controls.
- Block chrome configuration: selected `blockChromePattern` per parent widget, source/inheritance reason, component-owned title/body geometry, body background relation, fallback, and inspectable config/DOM/scoped-style hook.
- Asset copy/merge path and files/extension points changed.
- Stack contract proof: package dependencies, `src/main.ts` Vue 3 bootstrap, Element Plus registration/style imports, ECharts runtime ownership for standard chart widgets, and S2 exception only when used.
- Data binding mode and filter-to-widget binding proof.
- Empty-filter configuration and aggregate-row key policy when filters or data contain all/total/synthetic options.
- Code-ledger proof for changed template source files.
- Validation/startup commands, URL, blockers, and template limitations.
- Automated visual geometry audit result: command, viewports, screenshot paths, JSON report path, `VIS-*` findings, or precise Playwright/browser blocker.

## Quality Gate

- Do not choose custom development when a bundled template can satisfy the requirement.
- Do not mark the template implementation ready until the nine-step operation chain is complete: framework template selected, page layout configured, block layout templates mapped with SingleSlot/MultiSlot rationale, title configured, pill/aux/unit/summary decisions recorded, optional supporting areas configured only when needed, and every `3 componentArea` slot filled by a component content area template or a newly registered standalone ECharts component content area template.
- Do not accept a selectable 分块布局模板 that exists only as `SpanCCxRRLayout.vue` plus `componentRegionPattern` config. The selected block must name/export/register an independent Vue entry file; generic size wrappers are allowed only as bases for creating new selectable templates.
- Do not choose a nav template unless multiple substantial nav pages are implemented.
- Do not accept a generated/copied project that keeps Vue 3 but drops ECharts or Element Plus. Missing `echarts`, `element-plus`, Vue 3 bootstrap, Element Plus global registration/style import, or actual ECharts runtime ownership for chart widgets is a template readiness failure.
- Do not replace Element Plus controls with ad hoc HTML controls for ordinary buttons, selects, popovers, drawers, dialogs, tables, messages, or form-like controls unless the user names an existing project design system or an explicit custom-shell exception.
- Do not add duplicate shell, filter bar, toolbar, or navigation layers over existing template slots without an explicit redesign decision.
- Do not fill component slots with block-layout additional information, unit fields, title pills, filters, controls, description/help text, or summary/explanation copy. Component slots carry only the selected standalone Vue component content area file / mounted component; `1-1`, `1-2`, `2-1`, `2-2`, and `4` supporting areas stay on the 分块布局模板.
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
- Load `template-routing-and-implementation-gates.md` before selecting, copying, editing, or accepting bundled report templates.
