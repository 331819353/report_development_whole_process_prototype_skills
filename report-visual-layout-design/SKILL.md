---
name: report-visual-layout-design
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于报表页面视觉布局设计、页面规范、页面设计规范、页面壳设计、布局评审和布局修复。用户提到提高前端设计、前端设计提升、页面布局、页面壳、顶部栏、左侧导航、页面级筛选区、工具栏、1920x1080、12列*N网格、8可视行单元、区块排布、KPI总览卡/多指标总览卡跨度、单指标KPI卡跨度、状态卡/健康度卡/评分卡/仪表盘卡/指标判断卡跨度、目标执行卡/目标达成卡/差距卡/进度卡/里程碑卡跨度、时间序列KPI卡/趋势卡/变化卡/同环比卡/周期卡/波动卡/预测卡跨度、对比分析KPI卡/对比卡/分组对比卡/竞品对比卡/标杆卡/差异卡跨度、排名卡/榜单卡/Top N卡/排行榜/帕累托卡跨度、占比卡/构成卡/结构卡/份额卡跨度、指标拆解卡/归因拆解卡/贡献卡/层级拆解卡跨度、分布卡/区间卡/密度卡/分位数卡/箱线卡跨度、横向指标卡/横版KPI跨度、坐标折线KPI跨度、坐标柱状KPI跨度、横向柱状KPI跨度、坐标散点KPI跨度、地图KPI跨度、双栏VS对比卡跨度、1920x1080首屏层级、Haier品牌位置、图表/表格容器尺寸、hover动效裁切、空态/加载/错误态位置、元素重叠、溢出、布局不好看时触发；不负责组件细节样式、模板工程复制或业务报表类型选择。"
---

# Report Visual Layout Design

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this skill for report page-level layout: shell, navigation, header/filter/control surface, toolbar, brand placement, `1920x1080` review viewport, content-area `12 * 8` first-viewport sizing grid, scrollable `12 * N` parent-block grid, parent-block sizing, internal sub-block composition, first-viewport hierarchy, viewport fit, and layout defect repair.

It owns page规范. Component internals go to `$report-component-style-design`; reusable component standards go to `$report-component-design-spec`; full design-system governance goes to `$report-design-system-governance`; runnable templates go to `$report-prototype-template-management`.

For Haier/enterprise Web surfaces, including report/dashboard/BI/data-screen layouts, load `$haier-enterprise-app-ui-design-spec` for company-level color, typography, spacing, base controls, states, and brand/logo rules. Also load `$report-design-system-governance` report guideline references before final report layout decisions. These baselines are inherited together; they are not alternatives.

## Reference Loading

| Need | Read |
| --- | --- |
| Preflight understanding before implementation/repair/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Page shell and layout mode | `references/page-layout-modes.md` |
| Brand and Haier placement | `references/brand-style.md` |
| `1920x1080` / `12 * 8` visible grid and `12 * N` parent containers | `references/grid-containers.md` |
| Low-noise high-density component/page baseline | `$report-component-style-design` `references/00b-low-noise-high-density-baseline.md` when external/general design guidance, 高级感, 好看, 好用, 易懂, 降噪, or UI Kit/SaaS/BI style is used as inspiration |
| Block sizing and viewport constraints | `references/block-size-constraints.md` |
| Anti-squeeze row-group expansion, full-row vacancy reflow, and typography/component floors | `references/block-size-constraints-05-anti-squeeze-reflow.md` when a block is crowded, moved to full row, or needs height expansion |
| Direct block-size front door | `$report-layout-size-constraint-spec` |
| Parent block and internal sub-block composition | `references/block-composition.md` |
| Block title/body chrome style selection | `references/block-chrome-style-patterns.md` |
| Toolbar, drawer, modal, responsive interactions | `references/components-interactions.md` |
| Output checklist | `references/output-checklist.md` |
| Detailed layout acceptance gates | `references/layout-acceptance-gates.md` |
| Report layout baseline and decision gates | `$report-design-system-governance` relevant guideline references |
| Modern SaaS / BI Dashboard / UI Kit positive style contract | `$report-design-system-governance` `references/12-modern-saas-bi-style-contract.md` when requested |
| Template layout tokens | `$report-prototype-template-management` `references/template-layout-design-system.md` when template-based |

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Run the Preflight understanding gate for implementation, repair, or acceptance work; name page purpose, baseline, affected surfaces, specialty skill routing, hard constraints, missing evidence, and start decision.
2. Identify page purpose, user, primary report question, density, display scenario, first action, and the fixed prototype review viewport `1920x1080`.
3. Classify the baseline: report/dashboard, common enterprise app, template-based page, custom page, or mixed. For Haier/enterprise report pages, record both the inherited Haier application baseline and report-specific baseline.
4. If outside/general design guidance is provided, compare it against the inherited report/component rules and translate only useful intent through the low-noise high-density baseline; do not copy generic palettes, fixed spacing, or "more whitespace" rules that conflict with the page's content density and grid. If modern SaaS / BI Dashboard / UI Kit style is requested, apply the positive style contract to the page canvas, card hierarchy, first-viewport priority, component count, and chart-lightness layout checks.
5. Run anti-AI and report-decision layout checks when the page is a report surface.
6. Choose shell structure: topbar, left-nav, unified header/control area, fixed cockpit, existing shell, or custom shell.
7. Place navigation, page/global filters, toolbar actions, brand/logo, refresh/export/fullscreen/status controls, and template-native filter entry when applicable.
8. Plan the first meaningful viewport and downstream reading path.
9. Declare the page rhythm: `information-flow report`, `KPI dashboard`, `detail/query report`, `analysis narrative`, or `cockpit/status monitor`. Default to information flow unless the central question is current-state monitoring. Use typography, spacing, section rhythm, and subtle dividers before uniform card borders; reserve KPI/card grids for justified status-overview needs.
10. Lay out top-level parent blocks in legal spans on the content-area grid: 12 equal columns after menu/sidebar width is deducted, and rowHeight from 8 visible row units after menu/header height is deducted. Row count is `N` and is not capped by the grid rule. Then decide whether each block contains one component or composed internal sub-blocks.
11. Before filling detailed body content, choose or explicitly inherit one `blockChromePattern` for each top-level parent block through `references/block-chrome-style-patterns.md`. The block title/body chrome is chosen from business role, density, evidence type, and template family, then the internal content is placed inside the reserved body viewport.
12. Size blocks and sub-blocks from content needs: KPI, summary, chart, table, complex diagram, task list, evidence panel, drawer/detail, or action area. Use `$report-layout-size-constraint-spec` when the task is mainly block size, height budget, overflow, or viewport fit. When any block is crowded, requires a taller row, or moves to a wider/full row, apply `block-size-constraints-05-anti-squeeze-reflow.md` before accepting the new layout.
13. Define layout states, vertical scroll behavior, and overflow fallback for parent blocks and sub-blocks at `1920x1080`.
14. Use `layout-acceptance-gates.md` before accepting implementation-ready layout or repairing overlap/cropping defects.

## Required Output

- Preflight understanding result when the work is implementation/repair/acceptance, plus surface classification, baseline inheritance references, and shell choice.
- First-viewport hierarchy and reading path.
- Page rhythm decision: information-flow report vs KPI/dashboard grid, KPI scope boundary, and card-border reduction strategy.
- Header/navigation/filter/toolbar/brand structure.
- Block chrome style matrix: `blockChromePattern`, selection reason, title-stage geometry, body background relation, density, decoration budget, overflow/fallback, and implementation proof hook for every styled parent block.
- Modern BI page-language plan when requested: light page canvas, white-card block surfaces, no nested-card strategy, first-viewport hierarchy, component-count rationale, and chart-lightness layout implications.
- `1920x1080` content-area grid plan: menu/sidebar occupied width, menu/header occupied height, `12 * 8` first-viewport sizing units, row-height/column-width calculation, `N`-row scroll behavior, parent-block grid, and internal sub-block plan.
- Anti-squeeze reflow plan when triggered: `layoutFitContract` coverage, row-group expansion decision, full-row vacancy handling, sibling stretch/fill rationale, typography/component floors, and `VIS-*` failure codes when unresolved.
- Block sizing rationale, state plan, `1920x1080` fit/overflow plan, and downstream component/template handoffs.
- Proof obligations for implementation-ready layout: legal grid spans, filter/control ownership, fixed-height overflow checks, first-viewport answer, component handoff, screenshot/DOM evidence, and exception conditions for advisory layout defaults.
- Layout risks, `DESIGN-*`/`RPT-*`/`VIS-*` findings, and readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- The first meaningful viewport must answer the page's main question or expose the main action.
- Do not repair or accept page layout before affected component families and their chart/table/filter/placement owners are identified.
- Do not accept Haier/enterprise report layout that applies report grid rules but omits Haier application typography, color, spacing, base surface, and brand/logo constraints.
- Layout must be driven by task, data density, business priority, state coverage, and next action, not decorative polish.
- Do not accept a layout where uniform bordered cards are the main information separator. Prefer typographic hierarchy, whitespace, section rhythm, and subtle dividers; card frames are justified only for independent objects, repeated items, or template-owned surfaces.
- Do not fill business content into styled parent blocks before the block title/body chrome pattern is selected or an explicit inherited default such as `template-default` is recorded. The chrome decision must preserve component-owned title/control ownership and measurable body viewport floors.
- Do not KPI-ize every block. KPI cards/metric tiles are allowed only for primary decision metrics; evidence, explanation, detail, action, trust, and workflow blocks must keep task-matched component forms.
- Do not treat blank space as proof of premium layout. At `1920x1080`, parent blocks should use the `12列*N行` grid to carry meaningful conclusion, evidence, detail/action, and trust/source content; reduce noise with hierarchy and disclosure rather than leaving large empty regions.
- Do not let red/green semantic color define the page hierarchy. Layout-level emphasis must come from brand/product color, scale, position, typography, and neutral contrast; red/green/orange status color is reserved for documented states or business-direction rules.
- Do not treat "dashboard" as the default visual answer. If the task is analysis, review, detail, or decision support, the layout must be an information flow with a visible sequence from conclusion/status to evidence, driver, detail/action, and trust/source.
- A requested modern SaaS / BI Dashboard / UI Kit layout is not ready unless light page/card styling, clear information hierarchy, no component pileup, and lightweight chart allocation are proven or recorded as `VIS-*` findings.
- Report pages must expose metric tree, diagnostic path, detail/action route, and trust/source/version placement or explicit scoped gaps.
- Template-native filter surfaces must be reused unless a template-level redesign is explicitly requested.
- Fixed-height navigation/cards/KPI strips need padding, explicit line-height, gap, and DOM overflow checks at `1920x1080` using `scrollHeight <= clientHeight + 2` and `scrollWidth <= clientWidth + 2`, or a declared visible scroll/disclosure strategy.
- Layout defaults such as block composition, first-level navigation density, and template filter reuse are not optional polish when they affect readability, clipping, or shell consistency. Treat them as `MUST/fail` unless an explicit business/template exception and proof are recorded.
- Dense tables/charts/diagrams need enough block area or a scroll/fullscreen/drawer/fallback strategy.
- Crowded blocks must not be fixed by shrinking typography or silently stretching siblings. If one core block in a semantic row group needs more height, the row group expands/reflows together; if a block moves to a wider or full row, the old vacancy must be filled by related decision-chain content, expanded only with new business value, repacked, or declared blocked.
- Page layout cannot hide an axis-chart, KPI-card, ranking-card, Pareto-card, composition-card, decomposition-card, or distribution-card squeeze inside a valid grid span. Full line/bar/combo blocks, KPI overview cards, single-indicator KPI cards, KPI judgment cards, KPI goal execution cards, ranking / leaderboard / Top N cards, Pareto cards, composition / share / structure cards, decomposition / attribution / contribution / hierarchy cards, distribution / interval / density / quantile / boxplot cards, and axis-line/axis-bar/axis-scatter/spatial-map/paired-comparison diagnostic KPI cards must reserve their component-family value, evidence, footer, hero visual, execution visual, row/list, cumulative chart, denominator/detail, explanation body, formula/node/link/stage/matrix area, statistical body, sample/statistic strip, plot, map, metric-cell, or pane floors; chart + table/list blocks must prove both chart readability and at least `3` preview rows. If the grid span cannot carry both, enlarge/split the block or move detail to drawer/tab/detail before accepting the layout.
- Load `layout-acceptance-gates.md` before marking a layout ready for implementation or acceptance.
