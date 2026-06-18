---
name: report-layout-size-constraint-spec
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于报表页面区块、容器、卡片、图表和表格的尺寸约束、高度预算、首屏层级、1920x1080、12列*N网格、8可视行单元、固定高度、overflow/裁切/重叠、尺寸评审。用户提到卡片高度、图表太挤、表格太矮，KPI/趋势/对比/排名/占比/拆解/分布/地图/矩阵/VS/多组件挤压，1920x1080、scrollHeight/clientHeight、plot压缩时触发；不负责组件内部图表细节。"
---

# Report Layout Size Constraint Spec

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this as the direct front door for page/block sizing and viewport fit. It promotes the layout sizing reference that was previously nested under `$report-visual-layout-design`.

Use `$report-visual-layout-design` for full page layout decisions; use this skill for block size budgets, fixed-height risk, parent/child container fit, and `1920x1080` overflow checks.

## Reference Map

| Need | Read |
| --- | --- |
| Preflight understanding before implementation/repair/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Size source map | `references/01-size-reference-map.md` |
| Parent layout references | `$report-visual-layout-design` references: `block-size-constraints.md`, `grid-containers.md`, `block-composition.md`, `layout-acceptance-gates.md` |
| Modern SaaS / BI Dashboard / UI Kit pileup and hierarchy constraints | `$report-design-system-governance` `references/12-modern-saas-bi-style-contract.md` when requested |
| KPI time-series card minimums for trend/change/YoY-MoM/cycle/volatility/forecast cards | `$report-visual-layout-design` `references/block-size-constraints-02-component-requirements.md` |
| Component minimums for KPI overview cards, single-indicator KPI cards, KPI judgment cards, KPI goal execution / target attainment / gap / progress / milestone cards, KPI comparison analysis / comparison / group comparison / competitor / benchmark / variance cards, ranking / leaderboard / Top N / Pareto cards, composition / share / structure / market-share cards, decomposition / attribution / contribution / hierarchy cards, distribution / interval / density / quantile / boxplot cards, horizontal KPI cards, axis-line diagnostic KPI cards, axis-bar diagnostic KPI cards, axis-scatter diagnostic KPI cards, spatial-map diagnostic KPI cards, paired comparison diagnostic KPI cards, Composite Panel, Micro Dashboard Card, state feedback, dense tables/charts | `$report-visual-layout-design` `references/block-size-constraints-02-component-requirements.md` |

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Run the Preflight understanding gate for implementation, repair, or acceptance work; name affected blocks, child component families, viewport targets, hard constraints, missing evidence, and start decision.
2. Identify the `1920x1080` viewport target, menu/sidebar occupied width, menu/header occupied height, content-area `12 * 8` sizing grid, `N`-row scroll behavior, parent blocks, child components, fixed-height surfaces, and density.
3. Calculate usable width/height from the block units before deciding chart/table/KPI composition: `colWidth = (visibleWidth - menuOrSidebarWidth) / 12`; `rowHeight = (visibleHeight - menuOrHeaderHeight) / 8`.
4. Check row count, header/filter/toolbar/legend/footer/state masks, child-component minimums, gaps, padding, line-height, and scroll areas.
5. Decide whether to enlarge, split, move to drawer/fullscreen, paginate, scroll, or reduce component density.
6. Require DOM overflow checks when code or URL exists: fixed-height cards, summary/ranking blocks, KPI tiles, nav items, Composite Panels, table bodies, and compact controls must pass `scrollHeight <= clientHeight + 2` and `scrollWidth <= clientWidth + 2`, or declare an intentional visible scroll, expand/collapse, drawer/fullscreen, pagination, or split strategy.
7. Inspect `overflow: hidden` on parent/root containers. It is allowed for decorative masks or known non-content regions, but fails acceptance when it hides decision-critical text, ranking rows, controls, legends, values, or table content without a declared disclosure path.

## Required Output

- Preflight understanding result when the work is implementation/repair/acceptance, plus target viewport and block/container size budget.
- Fit decision for each dense block: fit, enlarge, split, scroll, drawer/fullscreen, or blocked.
- Overflow/cropping risks and required DOM/runtime checks, including selectors, target viewports, `scrollHeight/clientHeight`, `scrollWidth/clientWidth`, overflow CSS, and pass/fail result when code or URL exists.
- Handoff to component/table/chart skills when internal fit rules are needed.

## Quality Gate

- Do not approve a block only because it roughly looks acceptable; it must pass the `1920x1080` content-area grid, density, and DOM overflow checks that match this prototype stage.
- Do not approve or edit a layout before identifying affected child component families and their owning chart/table/filter/placement skills.
- Fixed-height KPI/card/navigation/table areas need explicit padding, line-height, gap, and overflow checks.
- Fixed-height summary/ranking/composite cards cannot pass with hidden overflow. They must prove content budget, pass DOM overflow checks within the `+2px` tolerance, or expose usable visible scroll, expand/collapse, pagination, drawer/fullscreen, or split behavior.
- Dense charts, tables, KPI Overview Cards, Micro Dashboard Cards, Composite Panels, and state feedback surfaces need enough reserved area for labels, axes, legends, pagination, child minimums, metric-cell minimums, and states.
- Do not solve a modern SaaS/BI visual request by shrinking more components into the same viewport. If the page needs extra cards or charts beyond the hierarchy budget, split, tab, drawer, fullscreen, or route to detail instead of accepting `VIS-COMPONENT-PILEUP` or `VIS-CHART-OVERWEIGHT`.
