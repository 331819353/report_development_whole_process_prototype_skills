# 01 Workflow Modes And Stage Gates

## Workflow Modes

Choose the mode before starting.

Before choosing a mode, enforce the trigger gate. Do not let adjacent words such as `报表`, `页面`, `模板`, `部署`, `筛选联动`, `mock 数据`, `自检`, or `返回URL` activate this workflow by themselves; they must appear in a request that also includes `原型`.

Before implementation, also choose exactly one `pageShellPath`, exactly one `pageStyleSource`, exactly one `brandMode`, and exactly one `visualMode`: `haierEnterprise`, `sampleRestore`, or `sciFiCockpit`. When `pageShellPath: template`, also declare the nine-step template chain from `$report-prototype-template-management` `references/template-operation-flow.md`: `frameworkTemplateId`, `pageLayoutConfig`, `blockLayoutTemplateMap` with selected independent block layout Vue files, `titleAreaConfig`, `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, `componentContentAreaTemplateMap`, and `summaryAreaConfig`. These are blocking decisions, not later polish choices.

Source-material intake gate:

- Treat every user-provided message, file, HTML, Markdown/MD, screenshot, source snippet, code file, data file, or document as requirement evidence first.
- Convert source materials into confirmed facts, inferred assumptions, missing gaps, component/data/filter/interaction constraints, and acceptance checks before choosing shell, template, output format, or implementation target.
- Source file format is not output-format authority. Provided HTML/MD/source files do not by themselves mean `htmlPrototype`, `pageShellPath: custom`, or `customDesignPath: htmlReplica`.
- Declare exactly one `outputArtifact`: default `vueTemplatePrototype`; use `htmlPrototype` only when the user explicitly asks for HTML/static/single-file HTML output or exact static HTML preservation.

### 1. Prototype-Oriented Design Mode

Use when the user asks for a concrete report prototype plan but has not yet requested code.

Deliver:

- Display theme and selected reusable pattern cards.
- Report type judgment.
- Design logic.
- Content blocks.
- Component mapping.
- Interactions.
- Visual/style guidance.
- Validation checklist.

Mock data, filters, and interaction state should be included at planning level. Code and templates are optional unless requested.

### 2. Prototype Specification Mode

Use when the user wants an implementation-ready report prototype specification.

Deliver:

- Structured requirement.
- Display theme and pattern-card set.
- Report type and secondary roles.
- Page layout.
- Component list.
- Mock data plan.
- Filters and interactions.
- Visual style and responsive rules.
- Implementation-ready notes.

### 3. Implementation Mode

Use when the user wants code, a Vue dashboard, or an actual runnable page.

Deliver:

- All prototype design outputs.
- Display theme, pattern-card-to-component mapping, and pattern acceptance cases.
- Technical architecture based on `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios`, with ECharts standard charts including Combo through shared `xAxis` plus `bar` and `line`/`markLine` series, funnel through `series.type: 'funnel'` or a data-driven horizontal `bar` funnel, parallel coordinates through `parallelAxis` plus `series.type: 'parallel'`, and AntV S2 installed and used only when the binding matrix contains S2-class analytical tables.
- Template choice.
- Data files or mock data.
- Component implementation.
- Self-check report and repair loop, repeated up to 3 cycles when unresolved issues remain.
- Automatic deployment when requested or when a shareable prototype URL is part of the task.
- Automatic local server startup on an available port when a runnable prototype should be shown.
- Local verification.
- Public URL or local preview URL.
- Screenshot or browser QA when applicable.

Do not treat the word "report" as a single-page constraint. A report may be a one-page summary, a multi-chapter report suite, or a big-screen cockpit. Choose the template by content volume, chapter/view count, interaction density, and display scenario. Use the bundled template assets under `report-prototype-template-management/assets/templates/`: `topbar-light-scroll-dashboard-template` for compact focused reports, `left-nav-analytics-workbench-template` for multi-chapter analytics workbenches, and `frozen-title-sci-fi-cockpit-template` for fixed 1920x1080 cockpit screens. Topbar and left-nav templates may exceed 1080px and scroll vertically. Only select a template with `nav[]` when the content can be redesigned into multiple substantial nav pages; never use a navigation template while populating only the homepage. All bundled implementation paths use `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` as the base stack; add AntV S2 dependencies only when a generated component actually needs S2.

### 4. Review And Repair Mode

Use when the user provides an existing screenshot or page and asks what is wrong or how to optimize it.

Deliver:

- Visible issues.
- Requirement/display-theme/type interpretation.
- Layout and component diagnosis.
- Data/filter/interaction gaps.
- Concrete repair plan.
- Updated implementation if requested.

## Stage Gate Workflow

### Stage 0: Determine Scope

Clarify or infer:

- Is the user asking for thinking, design proposal, actual prototype, or repair?
- Is there a specific report page or a report category?
- Which of the six display themes is primary: 明细、汇总统计、经营看板、分析探索、管理报告/专题报告, or 监控告警?
- Is the expected output text, specification, code, or both?
- Which standard inputs are present: 需求文档, 指标清单, optional screenshot/image, optional HTML源码, optional Markdown/MD, optional copied source/code, optional data/config files?
- What is the source-material requirement matrix: each source artifact, extracted facts, inferred assumptions, missing gaps, affected requirement areas, and whether it is explicit output-format authority?
- Which `outputArtifact` is required: default `vueTemplatePrototype`, or `htmlPrototype` only with explicit HTML/static-output wording?
- If screenshot/image input is present, is it a full page, first viewport, partial component, modal/drawer, mobile view, export page, or style reference?
- If HTML/MD/source content is present, is it a requirement source, layout reference, full static page, partial component, copy source, data source, style evidence, or source of mock/chart configuration?
- If HTML源码 contains chart-like SVG/canvas/DOM marks, which evidence is legitimate to extract: layout rhythm, labels, series/categories, colors, mock values, or config hints? Do not treat the sample SVG/canvas marks themselves as the implementation for standard charts.
- Is the page a single-page top-bar report, standard enterprise sidebar dashboard, or sci-fi/big-screen cockpit?
- Does the user need automatic deployment, automatic local startup, and a returned URL?

Before moving to design or implementation, write two explicit statements: `User Intent` (what the user is trying to accomplish and decide) and `Design Thinking` (the report logic and layout direction you will use to satisfy that intent). Keep them concise, but do not skip them for prototype work.

Do not block if missing details can be safely assumed.

### Stage 0.5: Default General Prototype Design Thinking

Use `$report-prototype-design-thinking` before display theme, report type, component mapping, layout, template selection, or implementation.

This stage is only the generic/default thinking layer for the original workflow. Do not branch into 自助分析、指标看板、分析报告、or 明细报表 here; those are separate prototype workflow skills.

Output must include:

- Target user, usage scenario, business question, managed object, time scope, decision/action, and output mode.
- Core narrative, user path, functional architecture, and key decision points from the prototype story layer.
- Core metrics, analysis metrics, detail fields, dimensions, baselines, thresholds, and口径 gaps.
- Analysis path and first-viewport answer.
- Page block proposal and component/chart rationale by question.
- Filter, drilldown, export, save/share, permission, refresh, and state requirements.

Skip this stage only when the user already provides a structured prototype design brief that covers core narrative, user path, key decision points, user, scenario, decision/action, metric layers, analysis path, and block-level intent.

### Hard Gate: Shell Path, Style Source, Brand Mode, Visual Mode, Brand Assets, And Sample Fidelity

Run this gate before Stage 8 visual layout and before Stage 10 implementation.

Shell path:

- Declare exactly one `pageShellPath`: `template` or `custom`.
- Use `pageShellPath: template` by default for runnable prototypes, including when HTML/MD/source/sample files are provided as requirement evidence, hierarchy evidence, or style reference.
- Use `pageShellPath: custom` only when the user explicitly requests custom/free design, exact screenshot/HTML/source restoration, HTML/static output, existing shell preservation, or a documented template limitation.
- If `pageShellPath: custom`, declare exactly one `customDesignPath`: `htmlReplica` or `freeDesign`.
- Use `customDesignPath: htmlReplica` only when the user explicitly asks to replicate the provided HTML/source/sample structure or `outputArtifact: htmlPrototype` requires static structure preservation.
- Use `customDesignPath: freeDesign` when creating a custom shell from requirements without source visual authority.
- Custom Haier pages default to `brandMode: haierBranded` and must configure a real bundled Haier logo before final delivery; explicit `sampleNative` or `neutral` pages must record why Haier branding is not required.

Style source:

- Declare exactly one `pageStyleSource`: `templateDefault`, `userSpecified`, or `sampleProvided`.
- Use `templateDefault` when no page style is specified and no HTML/source/sample styling is provided; choose a bundled template by scenario.
- Use `userSpecified` when the user names a page style, shell, or design direction; follow that direction unless it violates hard gates.
- Use `sampleProvided` when screenshot, image, HTML source, Markdown/MD, copied source, or display sample supplies page structure/style evidence; this preserves evidence for hierarchy and tone, but it does not force `pageShellPath: custom` or `outputArtifact: htmlPrototype`.
- Do not choose a custom shell merely because style requirements are absent.

Brand mode:

- Before `visualMode`, declare exactly one `brandMode`: `haierBranded`, `sampleNative`, or `neutral`.
- Use `haierBranded` for Haier enterprise pages, Haier-branded report prototypes, and custom report pages unless the user clearly asks for non-Haier/native sample branding.
- Use `sampleNative` only when a provided sample/HTML/source is explicitly non-Haier and the user asks to keep the source-native brand/style.
- Use `neutral` only when the user explicitly asks for a generic non-branded report.
- If `brandMode: haierBranded`, configure the Haier logo and global UI tokens without changing the sample's main hierarchy.
- If `brandMode: sampleNative` or `neutral`, do not inject a Haier logo only because `pageShellPath: custom`; record "no Haier brand required by input".

Visual mode:

- Declare exactly one `visualMode`.
- Use `sampleRestore` when the input is a display sample, screenshot, image, or HTML source and the user asks to restore, follow, or build from it without explicit redesign.
- Use `haierEnterprise` for ordinary business report prototypes, enterprise report pages, and Haier/brand-unified pages.
- Use `sciFiCockpit` only for explicit big-screen, cockpit, command-center, exhibition, monitoring-wall, or fixed 1920*1080 presentation scenarios.
- If instructions conflict, first apply the entry consistency gate from `$quality-gate-validation`. Explicit user direction wins when it resolves the conflict; unresolved `P0`/`P1` entry conflicts require confirmation before implementation. Otherwise sample/source restoration wins over generic enterprise styling, sci-fi wins for explicit big-screen display, and all remaining business reports default to `haierEnterprise`.

Brand assets:

- For Haier/branded pages, search for logo assets in the existing project, selected template `public` path, and `report-prototype-template-management/assets/brand`.
- Configure the logo in the header, unified title area, sidebar brand area, or template logo slot before implementing components.
- If no usable asset exists, render an explicit logo placeholder in that slot and record the missing asset. Do not silently omit the logo.
- For `pageShellPath: custom` with `brandMode: haierBranded`, placeholder state is a blocker. Do not pass visual QA until `haier-logo.svg`, `haier-logo-original.svg`, or `haier-logo-white.svg` is actually configured.

Sample fidelity:

- In `sampleRestore`, the source page shell, module order, container hierarchy, main control count, layer structure, and card proportions are acceptance constraints.
- HTML/MD/source files may trigger `sampleRestore` only when the user asks to restore, follow, or build from their visible structure without redesign. If they are supplied as requirements or reference material, keep `visualMode: haierEnterprise` or the selected business mode and adapt their content into the selected Vue template.
- In `sampleRestore`, source HTML/SVG chart marks are not renderer authority for standard report charts. Preserve sample layout intent and visual hierarchy, but rebuild standard charts with ECharts/data-driven options unless a custom-diagram exception is explicitly approved.
- Any new filter, summary card, detail table, matrix, drawer, jump, or extra toolbar action is an enhancement. Label it as an enhancement and keep it from changing the sample's first viewport and main body layout unless the user asks for optimization or reconstruction.
- Classify each visible sample/source module as `businessRequired`, `sampleStructure`, or `optionalEnhancement`. Source visibility alone is not enough to make a component `must-have`.
- Added conclusions, insights, and status summaries must be embedded into an existing sample-equivalent region such as the header/control area, panorama header, section head, or summary card. Do not add a new standalone horizontal band unless the source has an equivalent band.
- In `haierEnterprise`, a sample/source may inform information architecture, visible metrics, and interaction intent, but it is not allowed to override the chosen Haier enterprise shell unless explicitly requested.

Global UI and Chinese metric display:

- When layout/style follows HTML, screenshot, or custom design, palette, typography, spacing, radius, shadows, semantic states, and Element Plus/control styling must still come from global UI tokens unless exact visual restoration is explicitly requested.
- For rate/change/completion fields, display values with `%` in Chinese UI. Do not show `pt`, `p.p.`, or `percentage point` labels on the visible page unless the user explicitly requires that term.
- For change-rate and variance-rate indicators, use positive-red-up / negative-green-down only when inherited company, finance, market, or explicit business convention requires it. Otherwise use brand/neutral emphasis with sign/icon/label and reserve red/green/orange for documented status, risk, warning, success, error, or metric-direction semantics.

Blocking behavior:

- Stop before implementation if `visualMode` is not declared.
- Stop before implementation if `brandMode` is not declared.
- Stop before implementation if `pageShellPath` is not declared.
- Stop before implementation if `pageStyleSource` is not declared.
- Stop before implementation if `pageShellPath: template` and any part of `frameworkTemplateId -> pageLayoutConfig -> blockLayoutTemplateMap -> titleAreaConfig -> pillAreaConfig -> auxMetricAreaConfig -> unitAreaConfig -> componentContentAreaTemplateMap -> summaryAreaConfig` is missing, if `blockLayoutTemplateMap` does not name selected independent block layout Vue files, or if optional areas are not explicitly marked as unnecessary.
- Stop before implementation if `pageShellPath: custom` and `customDesignPath` is not declared.
- Stop before implementation if `pageShellPath: custom`, `brandMode: haierBranded`, and the page has no real Haier logo asset configured.
- Stop before implementation if a required logo slot has neither asset nor placeholder.
- Stop before implementation if `sampleRestore` additions would alter the sample's first viewport without an explicit user request.

Custom layout pattern:

- If a custom shell is used, declare exactly one `customLayoutPattern`.
- Allowed values: `symmetricBalance` 对称式, `threePart` 三部式, `masterDetail` 主从式, and `narrativeStack` 分层叙事式.
- Record why the selected pattern fits the report and how it preserves the `12 * N` grid.

### Screenshot Or Image Source Handling

Use this stage when the task asks for 截图还原原型, 图片还原原型, visual repair from screenshot, or screenshot-based prototype completion.

Extract before designing:

- Page shell: title, logo, navigation, filters, toolbar actions, tabs, sidebars, drawers, modals, footer, and visible states.
- Content structure: first-viewport answer, section order, card/table/chart grouping, hierarchy, and repeated blocks.
- Component inventory: KPI cards including overview, judgment, goal execution, time-series, comparison analysis, horizontal/diagnostic variants, ranking/Top N/Pareto cards, composition/share/structure/market-share cards, decomposition/attribution/contribution/hierarchy cards, distribution/interval/density/quantile/boxplot cards, Analysis & Insight components, text summaries, Composite Panels, charts, tables, lists, task cards, alerts, comparison panels, controls, and legends.
- Data intent: visible metric names, units, comparison baselines, dimensions, row grain, chart axes, table columns, status labels, and totals.
- Interaction clues: clickable controls, active filters, selected tabs, highlighted marks, buttons, download/fullscreen/refresh/share actions, and disabled states.
- Visual style: palette, typography scale, spacing, radius, shadow, density, contrast, and any brand/logo rules.

Hard rules:

- Do not paste a screenshot into the page as the implementation.
- Do not invent hidden data or interactions from the screenshot without marking assumptions.
- Default to `visualMode: sampleRestore` for screenshot/image/HTML-source restoration unless the user explicitly asks for enterprise redesign, optimization, or reconstruction.
- Preserve page shell, module order, container hierarchy, main control count, layer structure, and card proportions in `sampleRestore`.
- Mark all added filters, summary cards, details, matrices, drawers, jumps, and extra actions as enhancements.
- If the screenshot conflicts with report-type logic, classify the conflict with `ENTRY-*`. For `P0`/`P1`, confirm the intended authority before repair; for lower-severity conflicts, preserve the business intent and repair the information architecture rather than copying the flawed layout.
- Convert visible text, metrics, controls, and blocks into the same binding matrix required by `report-info-component-mapping`.
- Verification must compare the rebuilt page against the screenshot for structure, hierarchy, key text, visible component count, spacing, and no overlap; exact pixel matching is not required unless explicitly requested.

### Stage 1: Requirement Extraction

Use `report-requirement-structure-extraction`.

Run this stage when any user-provided file/source artifact is present, including HTML, Markdown/MD, copied source, code, screenshot, document, data, or config. Skip only when the user already provides a clean structured brief and no extra source artifact needs requirement transformation.

Output must include:

- Report theme.
- Source-material requirement matrix and `outputArtifact` decision.
- Display theme and selected/rejected theme rationale.
- User intent.
- Design thinking.
- Primary and secondary report types.
- Users and scenario.
- Core questions.
- Business objects and grain.
- Metrics, dimensions, baselines.
- Content blocks.
- Data, filter, interaction, visual, and component needs.
- Assumptions and missing information.
- Prototype design thinking output from Stage 0.5, or the explicit reason it was skipped.

Skip only when the user already provides a clean structured brief.

### Stage 1.5: Display Theme And Pattern Routing

Use `references/04-common-display-theme-pattern-chain.md`.

Output must include:

- `displayTheme`: `detail-table`, `summary-stat`, `business-dashboard`, `exploratory-analysis`, `management-report`, or `monitoring-alert`.
- Competing display themes and why they were rejected or kept as local blocks.
- Selected pattern cards with `patternId`, `patternName`, `patternRole`, and priority.
- How each selected pattern affects component mapping, mock/API design, filter/interaction behavior, export/share, acceptance, or operations.
- Any selected source pattern that cannot be implemented in the current scope, marked as `gap` or `futurePattern`.

Rules:

- Display theme is a page-form decision; it does not replace the primary report type from `$report-type-design`.
- Use 3-7 pattern cards for a design proposal and 5-12 for an implementation-ready spec or runnable page.
- Each selected pattern must map to at least one binding matrix row, data/API requirement, or validation case before implementation.

### Stage 2: Report Type Routing

Choose one primary report-type skill:

- `report-type-design`: current status, health, target, variance, risk entry.
- `report-type-design`: why a metric changed, driver, cause, attribution.
- `report-type-design`: records, fields, filters, sorting, export, row detail.
- `report-type-design`: target completion, scoring, ranking, fairness, improvement.
- `report-type-design`: period story, conclusion, evidence, risk, action, meeting output.
- `report-type-design`: anomaly rules, severity, owner, SLA, handling.
- `report-type-design`: task, owner, progress, evidence, acceptance, closure.
- `report-type-design`: data correctness, differences, source, lineage, version, audit.

Use secondary report-type skills only for local blocks or follow-up flows. Do not invent extra report types for maps, funnels, tables, or charts.

Do not route by domain keyword alone. If the request says `产业`, `区域`, `国家`, `品牌`, `渠道`, or similar domain words, first identify the user's decision question:

- Use `report-type-design` when the question is "整体是否健康、是否达标、风险在哪里".
- Use `report-type-design` when the question is "为什么变化、问题来自哪里、哪些因素驱动".
- Use `report-type-design` when the question is "谁表现更好、如何排名/评分/评价".
- Use `report-type-design` when the question is "查哪些记录、字段、明细、导出".
- Use `report-type-design` when the question is "周期内发生了什么、如何汇报复盘".
- Use `report-type-design` when the question is "哪些对象异常、严重程度与处理状态".
- Use `report-type-design` when the question is "任务如何推进、责任与闭环如何跟踪".
- Use `report-type-design` when the question is "数据是否一致、差异如何追溯".

Domain words then become dimensions, filters, decomposition paths, table fields, hierarchy levels, or narrative context in later stages.

### Stage 3: Business Design

Apply the primary report-type skill.

Output must include:

- Design positioning.
- Business logic.
- Metric and dimension logic.
- Layout layers.
- Chart/component rationale.
- Interactions.
- Conclusion pattern.
- Type-specific checklist.

This stage owns business purpose. It does not finalize mock data, filters, visual shell, or component style.

### Stage 4: Information To Component Mapping

Use `report-info-component-mapping`.

Output must include:

- Information inventory.
- Display theme and selected pattern-card influence.
- Semantic roles.
- Content block mapping.
- Component/chart/table/card mapping.
- `sourcePatternIds` and pattern acceptance points for affected components or interactions.
- Interaction entry points.
- Mock data needs.
- Filter data needs.
- Layout and style constraints.

This is the bridge from business thinking to implementable page structure.

### Stage 5: Data Design

Use `$report-info-component-mapping` when prototype data, demo data, or chart-ready data is needed. Let the child skill decide which internal data-modeling reference to load.

Output must include:

- Data story.
- Dataset list.
- Row grain.
- Dimension schema.
- Fact schema.
- Derived formulas.
- Rollup rules.
- Edge cases.
- Validation checks.

Skip only for pure methodology answers where no prototype or example data is needed.

### Stage 6: Filter Design

Use `$report-info-component-mapping` when report scope can change by time, organization, status, object, owner, source, or keyword. Let the child skill decide which internal filter reference to load.

Output must include:

- Main filter surface. For bundled templates, this means template `filters[]` plus the native trigger/panel/popover/drawer, not a standalone visual filter bar.
- Advanced filters.
- Defaults.
- Option schema.
- Filter/value semantics table.
- Cascades.
- Query parameters.
- Permission rules.
- Reset/export/shared-link behavior.

Almost all operational reports need this stage.

Template note: Stage 6 designs filter contracts and placement decisions. It must not force a new filter toolbar into a bundled template that already owns filter invocation.

### Filter/Value Semantics Table

Every prototype that uses filter defaults, aggregate rows, "all" labels, total rows, subtotal rows, or synthetic options must declare these semantics before mock data, API binding, or template config is accepted:

| Field | Meaning |
| --- | --- |
| `controlId` | Filter/control id or local-control id. |
| `displayLabel` | Reader-facing label such as 全部, Total, Overall, or a domain label. Labels do not define data semantics. |
| `emptyFilterValue` | Value that means "do not constrain rows/query by this control"; default should be a dedicated sentinel such as `''` or `__all`, not a business row key. |
| `detailValue` | Real detail-row dimension value when the selection represents a concrete row/entity/member. |
| `aggregateValue` | Synthetic aggregate-row value when the row is already aggregated across members. Use a dedicated value such as `__aggregate__`, `__total__`, or a typed `rowRole`, not `all` as a business primary key. |
| `rowRole` | `detail`, `aggregate`, `subtotal`, `placeholder`, or another declared neutral role. |
| `queryBehavior` | `omit`, `pass-as-param`, `server-aggregate`, `client-filter`, or `local-only`. |
| `primaryKeyEligible` | Whether the value may be used as a stable business row key. `emptyFilterValue` and generic aggregate sentinels are normally `false`. |

Rules:

- "All rows shown after no filter" is a query/control state, not a detail row.
- "Aggregate across rows" is an aggregate data row or server response role, not the same thing as an empty filter value.
- A visible label like 全部 or Total may map to any of these roles, so the contract must name the role explicitly.
- If a legacy API requires `all`, declare whether it is `emptyFilterValue` or `aggregateValue`; do not let the same endpoint/config use it for both.

### Stage 7: Data Interaction Design

Use `$report-info-component-mapping` when any data object is clickable or navigable. Let the child skill decide which internal interaction reference to load.

Output must include:

- Clickable and non-clickable objects.
- Drilldown paths.
- Popover/drawer/modal contents.
- Cross-filtering rules.
- Jump targets.
- Parameter passing.
- State preservation.
- Permission and failure states.
- Back/return behavior.

Skip only for static export-only reports with no interaction.

### Hard Gate: Data, Filter, And Component Linkage Accuracy

Apply this gate for every prototype or implementation, including pages that do not use the bundled templates.

Before visual polish or final delivery, require an explicit linkage contract:

- Every selected pattern card maps to at least one component, filter/control, interaction, dataset/API requirement, or validation case; unmapped patterns are backlog/gaps, not completed scope.
- Every component declares its data source, row grain, required fields, formulas, filter dependencies, refresh trigger, and empty state.
- Every filter maps to a real data field, resolver parameter, or permission scope. If names differ, define an explicit filter-to-field mapping.
- Every filter/control with a "show all", total, subtotal, aggregate, or synthetic option is present in the filter/value semantics table and separates `emptyFilterValue` from `aggregateValue`.
- Every primary/global filter expected to affect a component must prove a visible data change for at least one non-default state. Selected-state-only behavior fails the linkage gate.
- Filter changes update KPI cards, charts, tables, drawers, exports, downloads, fullscreen views, and jump parameters consistently.
- Summary counts, table row counts, chart totals, and drawer records reconcile under the same active filters.
- Selected chart marks, rows, drawers, and drill paths reset or show stale-selection state when the selected object leaves the filtered scope.
- Cross-filtering, drilldown, jumps, shared links, and returns pass the same period, organization, object, metric, permission, and filter context.
- No component may show stale data after a filter, refresh, drilldown, permission, or mock-data update.

For custom implementations without a template, define the equivalent adapter contract in code or specification:

- `dataSource`: where each component reads data.
- `filterMap`: how each filter maps to data fields or query parameters.
- `componentBindings`: which components subscribe to which filters and interaction state.
- `updateTriggers`: when components recompute, refetch, resize, reset, or clear selection.

For bundled template implementations, use the template contracts instead of ad hoc wiring:

- Widget data must use `widget.data.id`, `params`, `filterFields`, `requiredFilters`, `requiredParams`, and `ignoredFilters` rather than hidden filtering inside the visual component.
- Every configured widget must either declare `data` or explicitly declare `dataPolicy: 'static' | 'external'`; unbound first-screen cards are not allowed.
- Dynamic filters should return stable `id`/`label` options and may return `disabled`, `reason`, `count`, `parentId`, `level`, `sortOrder`, `permissionScope`, and `meta` for cascades, permissions, and result counts.
- Widget code should render from the `data` prop and `context`; it should not maintain a separate copy of active filters unless that state is explicitly reset on filter changes.
- Widget interactions should emit `dashboard-action`; modal, setFilters, navigation, refresh, fullscreen, and URL jumps stay in the shell/action layer.
- If a component intentionally ignores a global filter, configure `ignoredFilters` and make the scope difference visible in title, subtitle, or helper text. Do not use `ignoredFilters` when the real issue is missing `filterFields`, missing mock grain, or an unimplemented resolver branch.
- Run `npm run validate:dashboard` before `npm run build`; the bundled templates also run this check automatically inside `build`.

For custom implementations without a bundled template, build the same runtime contract explicitly:

- A single source of truth for `activeFilters`, selected object, drill path, modal/drawer state, permission scope, and refresh timestamp.
- A deterministic data resolver layer that accepts `(filters, params, permissionScope)` and returns normalized rows.
- A component registry or binding table that declares each component's dataset, fields, formulas, affected filters, ignored filters, required filters, interaction outputs, and stale behavior.
- A shared action dispatcher for drilldown, cross-filtering, drawer, modal, jump, export, refresh, and fullscreen so components do not invent incompatible state.

Template and custom implementations must both pass the same audit:

- Mock data audit: default state, filtered state, empty state, and permission-limited state all have matching component outputs. Affecting primary filters require matching rows or resolver logic for non-default options.
- Filter audit: every primary filter has at least one visible affected component and at least one validation case.
- Filter semantic audit: no row primary key, option id, API parameter, resolver branch, or export key reuses the same raw value for both `emptyFilterValue` and `aggregateValue`.
- Interaction audit: every drawer, modal, drilldown, jump, export, and fullscreen view inherits or explicitly overrides filter context.
- Component audit: every component declares affected filters, ignored filters, required fields, formulas, and stale-state behavior.
- Layout-body audit: every visual block separates title/header from component body; charts, tables, icons, empty states, and custom canvases render only inside the body viewport.
- Component viewport audit: every rendered widget has a full-size viewport layer between block body and business component; the viewport owns background, clipping, scroll, and resize bounds.
- Design-idea audit: existing design ideas from a requirement document have been accepted, repaired, or rejected before implementation; conflicts with story, user path, `1920x1080`, `12 * N`, chart `4*3` max, or metric-display boundaries remain visible as findings.
- Span audit: every component declares `visualType` and uses one of the legal `columns * rows` spans from `report-visual-layout-design`.
- Block-height audit: for prototype templates, column width is derived after menu/sidebar width is deducted and rowHeight is derived from the first 8 visible content rows after menu/header height is deducted; when the total grid height exceeds the first viewport, the page or content region scrolls vertically instead of shrinking or recomputing rows.
- Table viewport audit: every native table, Detail Table, Pivot Table, AntV S2 table, wide matrix, and comparison grid declares `visualType: 'table'` or `visualType: 'pivot'` as appropriate, mounts inside the block body, and scrolls internally instead of expanding or clipping the block; Detail Tables preserve row grain, primary key, default sort, column priority, row budget, pagination/search/export scope, and row detail/action behavior; complex/grouped table headers preserve `columnTree`/nested columns, leaf fields, computed spans/depth, fixed whole-header behavior, frozen row/primary columns, filter separation, tooltip definitions, and useful body rows; Pivot Tables preserve row/column dimensions, measures, aggregation formulas, subtotal/grand-total rules, frozen headers, density fallback, and exact cell tooltip/drilldown behavior.
- Download/print audit: scrollable pages taller than 1080px export or print their full resolved height across multiple 1920x1080 pages; no print/download path may clip to only the first viewport.
- Regression audit: changing one filter cannot leave any KPI, chart, table, drawer, or export on the previous scope.

Minimum smoke tests before delivery:

- `npm run validate:dashboard` passes for bundled templates, or an equivalent custom validation checklist is completed.
- Default filters load and all visible components show data from the same scope.
- Each primary filter changes at least one KPI/chart/table/list and reconciles the related counts or totals.
- A filter combination with no data shows empty states without stale numbers.
- A disabled or unauthorized filter option cannot be selected and does not leak counts.
- Opening a drawer/modal, then changing a filter, either synchronizes or shows a stale-selection state.
- Export/download/jump/fullscreen receives the same filter context as the source component.
- Download/print of a page taller than 1080px includes the lower content on later PDF/print pages.
- Block body QA passes: titles remain readable, and charts/tables/empty states do not overlap the header after default and filtered data changes.
- Component viewport QA passes: charts, tables, KPI cards, text blocks, canvases, SVGs, and empty states do not paint outside the component-area background.
- Table body QA passes: each table shows either all columns within the block or a visible internal horizontal scroll path; no table content is silently clipped at the right or bottom edge. Detail Tables show only prioritized first-view columns by default and disclose secondary fields through tooltip, column settings, drawer, export, or a detail page. Complex/grouped table headers keep parent groups aligned to leaf columns, fix the whole multi-level header during vertical scroll, and keep the top-left header synchronized with frozen row/primary columns during horizontal scroll. Pivot Tables keep row and column context visible through frozen row dimensions, fixed column headers, and tooltip/drilldown for hidden or scrolled cells.
- Radar/chart label QA passes: category labels, dimension labels, legends, and graphics do not overlap after default and filtered data changes.
- Component span QA passes: line/bar/K-line/heatmap, pie/radar/path/sunburst/gauge, scatter/box/parallel, map/graph/tree/treemap/sankey/funnel, metric cards, tables, and other components all use their legal span sets.


### Later Stage Split

For Stage 8 visual layout, Stage 9 component style, and Stage 10 template or implementation, read `01a-workflow-visual-implementation-gates.md`.
