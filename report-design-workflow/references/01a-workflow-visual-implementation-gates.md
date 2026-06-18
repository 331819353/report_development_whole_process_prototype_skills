# 01a Workflow Visual And Implementation Gates

Load this file with `01-workflow-modes-and-stage-gates.md` for Stage 8 visual layout, Stage 9 component style, and Stage 10 template or implementation gates.

### Stage 8: Visual Layout Design

Use `report-visual-layout-design`.

Output must include:

- `visualMode` and conflict resolution.
- `displayTheme`, selected pattern set impact, and first-screen theme structure.
- Page rhythm: information-flow report vs KPI dashboard/cockpit, KPI-card scope boundary, card-border reduction strategy, and brand-vs-status color rule.
- `pageShellPath`, `pageStyleSource`; if custom, `customDesignPath` and `customLayoutPattern`.
- Brand asset discovery result, configured logo path, logo variant, or placeholder gap.
- Page shell choice.
- Haier logo usage.
- Header, native/template filter surface or custom filter bar, toolbar, sidebar/menu, footer decisions.
- 12*N rectangular grid structure with minimum `2*1` blocks and default `3*2` analytical/chart blocks.
- Legal component span matrix and each component's selected `columns * rows` span.
- Block-height and overflow rule: for prototype templates, column width comes from the visible width after menu/sidebar width is deducted, rowHeight comes from the first 8 visible content rows after menu/header height is deducted, and grids taller than the first viewport use vertical scrolling instead of row compression.
- Content pattern: 总分总, 总分, 分总, 明细优先, 告警处理, 执行闭环, or recap narrative.
- Visual style preset.
- Empty/loading/error states.
- Block header/body separation and chart/table body viewport rules.
- Sample fidelity notes when input is a screenshot, display sample, or HTML source.
- Responsive and overflow rules.

Always respect the bundled Haier logo rule: original color on light backgrounds and white on dark backgrounds.

### Stage 9: Component Style Design

Use `report-component-style-design`.

Output must include:

- Component title style.
- Background, typography, color, border, shadow.
- Card-frame reduction, KPI eligibility, brand/product color hierarchy, and red/green status-color exception rules.
- Center-axis symmetry intent, alignment, and centering exceptions for tables/long text/lists.
- Label and legend rules.
- Header/body fit rules for every component viewport.
- Overflow/clipping strategy.
- Complex diagram viewport behavior.
- Table/card/chart/drawer style rules.
- Visual QA checklist.

This stage prevents overlap, truncation, low contrast, and component sizing failures.

### Stage 10: Template Or Implementation

Use this stage only when the user asks for runnable files, page implementation, or a prototype.

Default technical architecture:

- Language and framework: TypeScript + Vue 3 single-file components with Composition API.
- Build tool: Vite.
- UI component framework: Element Plus for page controls, filters, form fields, buttons, tabs, tags, popovers, dropdowns, dialogs, drawers, tooltips, pagination, and simple data tables or Detail Tables unless an existing project design system explicitly supersedes it.
- Charting: ECharts for KPI trends, bars, lines, scatter, Gauge through `series.type: 'gauge'` with one bounded progress/status metric, heatmaps, maps, funnel through `series.type: 'funnel'` or a data-driven horizontal `bar` funnel, Sankey through `series.type: 'sankey'` with node/link `source`/`target`/`value`, treemap through `series.type: 'treemap'`, sunburst through `series.type: 'sunburst'`, path/user/process paths through sankey/graph/custom series when appropriate, tree/hierarchical trees through `series.type: 'tree'` or a declared data-driven hierarchy component, relation/network graphs, waterfalls, and most dashboard charts.
- Analytical tables: install and use AntV S2 through `@antv/s2` and `@antv/s2-vue` only for pivot tables, cross tables, wide metric matrices, frozen headers, dense comparison grids, and analysis-style tables.
- Icons and controls: use the template's existing icon/control system; keep business widgets typed and scoped.
- Data: keep mock/static data in data files or data-source resolvers, not inside visual components.
- Interactions: emit typed dashboard actions from widgets and keep navigation, drilldown, modal, filter mutation, fullscreen, and URL navigation in the framework layer.
- Linkage accuracy: implement explicit data-source, filter-map, component-binding, and update-trigger contracts even when not using a bundled template.

Template choice:

- The three bundled templates now live under `report-prototype-template-management/assets/templates/`; use `topbar-light-scroll-dashboard-template`, `left-nav-analytics-workbench-template`, and `frozen-title-sci-fi-cockpit-template` as template asset ids, not as separate skills.

- Report is a content form, not a template decision. A "报告/报表/复盘/诊断" request can use any template after judging content volume and usage.
- Use `topbar-light-scroll-dashboard-template` for a compact focused office-readable report and detail/query-heavy handoff pages.
- Use `left-nav-analytics-workbench-template` for enterprise analytics reports, multi-chapter report suites, or dense workbenches with multiple pages/modules, and populate every `nav[]` page.
- Use `frozen-title-sci-fi-cockpit-template` for fixed 1920x1080 big-screen cockpit, command-center, exhibition, or leadership presentation screens where full-screen visual impact matters more than daily office efficiency, and populate every retained `nav[]` page.
- If the existing project already has a framework, follow the existing project patterns instead of forcing a template.

Template selection rules:

| Situation | Choose | Why |
| --- | --- | --- |
| Primary type is analysis/diagnostic and the user does not explicitly ask for sidebar, multi-page suite, workbench, big screen, or fixed 1920x1080 cockpit | `topbar-light-scroll-dashboard-template` | Analysis pages should default to one focused reading flow; use the light topbar template for office readability and handoff clarity. |
| Compact report: one decision question, usually 1-3 sections, roughly 4-12 components, no persistent page navigation, and users need a direct first-screen answer | `topbar-light-scroll-dashboard-template` | A topbar shell keeps the frame light and lets one 12*N content grid carry the report. |
| Large report: one report theme but multiple chapters, more than 3-4 sections, many components/tables, or separate views such as 总览 / 诊断 / 明细 / 任务 / 核对 | `left-nav-analytics-workbench-template` | Sidebar navigation can represent report chapters as well as different report modules, but each nav page must be substantial. |
| Daily operational analysis, dense tables, repeated filtering, saved workbench behavior, or several related reports in one app | `left-nav-analytics-workbench-template` | It is optimized for enterprise work rather than showpiece display, provided the workbench pages are all populated. |
| Large screen, monitoring wall, command center, exhibition, leadership cockpit, or presentation scenario | `frozen-title-sci-fi-cockpit-template` | It is optimized for fixed 1920x1080 full-screen viewing and high visual impact; retained nav pages must all be substantial. |
| The user explicitly asks for 单页 / 顶部栏 / 无侧边栏 | `topbar-light-scroll-dashboard-template` | Respect the requested shell unless existing code forces another pattern. |
| The user explicitly asks for 大屏 / 驾驶舱 / 指挥中心 / 科技风 | `frozen-title-sci-fi-cockpit-template` | These terms indicate presentation or monitoring display. |

Selection priority:

1. Existing project framework and user-stated shell.
2. Display scenario: big-screen/presentation uses `frozen-title-sci-fi-cockpit-template` only when its `nav[]` pages can all be meaningful and substantial.
3. Analysis/diagnostic default: if the primary report type is analysis/diagnostic and the user has not explicitly requested another shell, use a topbar scroll template even when the page needs to scroll beyond 1080px.
4. Content volume and information architecture: explicit multi-chapter or dense workbench reports use `left-nav-analytics-workbench-template` only when the content plan has multiple substantial nav pages, even if the user calls it one report.
5. Standalone compact report uses a topbar scroll template.

Do not choose a template only because it "looks better"; choose by scenario, navigation depth, interaction density, and display environment.

Implementation must:

- Install dependencies on demand. Before running `npm install`, compare `package.json`, existing imports, and the component binding matrix. Keep base template dependencies minimal; add heavy packages such as `@antv/s2` and `@antv/s2-vue` only when current code imports them or the mapped component set requires them. If install hangs past 120 seconds, stop, remove unused heavy dependencies from the generated project and lockfile, and retry the minimal install path. If domestic network access blocks npm, use a temporary command-level mirror such as `npm install --registry=https://registry.npmmirror.com` or `npm install <package-name> --registry=https://registry.npmmirror.com`; if unavailable, replace the registry URL with `https://npm.aliyun.com/`, `https://mirrors.cloud.tencent.com/npm/`, `https://mirrors.ustc.edu.cn/npm/`, or `https://mirrors.tuna.tsinghua.edu.cn/npm/`. Do not make registry changes persistent unless explicitly requested.
- Keep business data out of config when the template expects data files or data sources.
- Declare `brandMode`, `visualMode`, and pass brand asset discovery before changing files.
- Declare `pageShellPath`; if custom, declare `customDesignPath`.
- Declare `pageStyleSource`; if no page style and no HTML/source/sample styling is provided, use a bundled template by default.
- Preserve the selected `displayTheme` and `sourcePatternIds` in component IDs, widget comments/spec rows, or handoff notes so QA can trace why a component exists.
- If using a template with `nav[]`, declare the nav-page information architecture before implementation and populate every nav page with distinct widgets, data scope, and relevant interactions. If only a homepage can be populated, switch to a non-nav template.
- If choosing a bundled template, adapt requirement-document title, filter, navigation, and toolbar requirements into the selected template's existing config and shell slots. Do not implement duplicate shell layers from the original requirement document when they conflict with the template.
- In bundled-template mode, do not implement a standalone filter toolbar/bar for "main filter bar" wording. Implement filter scope through `filters[]`, native template invocation, and data/filter/component binding.
- If implementing a `brandMode: haierBranded` custom shell, configure a real bundled Haier logo before final delivery. For HTML replication, add the Haier logo even if the source HTML lacks it while preserving the source hierarchy.
- If implementing `brandMode: sampleNative` or `neutral`, record why Haier branding is not required rather than silently omitting the logo.
- If implementing a custom shell, declare `customLayoutPattern` from the allowed set before changing files.
- Preserve sample shell/module order/control count/layering/card proportions when `visualMode: sampleRestore`; label any enhancements.
- Classify sample/source modules as `businessRequired`, `sampleStructure`, or `optionalEnhancement`; do not make a component `must-have` only because it appears visually.
- Embed added conclusions into existing sample-equivalent regions; do not add standalone horizontal bands unless the source has an equivalent band.
- Keep HTML-replica and custom layouts on global UI tokens for palette, typography, spacing, radius, shadows, semantic colors, and controls unless exact restoration is explicitly requested.
- Render rate/change/completion labels with `%` in Chinese UI. Use positive-red-up / negative-green-down SVG/icon semantics for change-rate indicators only when inherited company, finance, market, or explicit business convention requires it; otherwise pair signed values with brand/neutral emphasis and reserve red/green/orange for documented status or direction semantics.
- Use stable IDs for filters, interactions, and mock records.
- Implement the data/filter/component linkage contract in the template config or custom runtime before visual polish.
- Run the template `validate:dashboard` script or equivalent custom checks to block unbound widgets, missing filter contracts, invalid action configs, and unsafe radar chart options.
- Avoid naked native `<select>` in primary filters; use Element Plus `ElSelect`/`ElTreeSelect`/`ElCascader`/`ElDatePicker` or project design-system equivalents. Fully styled native select is allowed only for baseline non-final prototypes.
- For funnel, flow, Sankey, graph, tree, decomposition, lineage, DuPont, and process-chain visuals, reserve stage/rail, node, label, gutter, value, and edge-bend space before drawing.
- Use ECharts before custom SVG/canvas for standard charts; funnel uses ECharts `funnel` or a data-driven ECharts horizontal `bar` funnel, treemap uses ECharts `treemap`, sunburst uses ECharts `sunburst`, tree/hierarchical trees use ECharts `tree` or a declared data-driven hierarchy component, and relation/network graphs use ECharts `graph` unless a custom-diagram exception is documented.
- Use AntV S2 before hand-rolled tables for analytical tables, cross tables, pivot tables, and dense metric matrices.
- Use Element Plus before hand-rolled DOM for filters, forms, buttons, tabs, tags, tooltips, popovers, dialogs, drawers, pagination, and simple operation/detail tables; reserve AntV S2 for analytical matrix/pivot/cross-table needs.
- Implement component overflow and responsive behavior from earlier stages.
- Run the self-check report and repair loop in Stage 10.4 before deployment or final handoff; start or preview the page inside the loop when runtime visual checks are needed.
- Run and verify the page when a dev server is required. Do not finish by asking the user to start the project manually.
