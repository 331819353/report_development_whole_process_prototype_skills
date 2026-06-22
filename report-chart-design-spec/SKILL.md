---
name: report-chart-design-spec
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于报表/仪表盘/BI/数据大屏中的图表设计规范、ECharts图表规范和图表可读性评审。用户提到图表规范、图表设计、ECharts、HTML源码里的SVG图表、手写SVG/canvas图表转ECharts、柱状图、折线图、组合图、饼图、雷达图、仪表盘、散点图、地图、K线、箱线图、热力图、桑基图、漏斗图、树图、关系图、旭日图、矩形树图、图例、坐标轴、标签过密、tooltip、图形变形、canvas/SVG/ECharts比例失真时触发；不负责整页布局或后端数据口径。"
---

# Report Chart Design Spec

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this as the direct front door for chart-family design standards and chart readability. It promotes chart references that were previously reachable only through `$report-component-style-design`.

When chart references come from screenshots or visual samples, route them through the shared style generalization goal first: the chart must map to a controlled chart pattern, a valid composed card pattern, or a documented extension gap before it becomes implementation guidance.

Use `$report-component-style-design` when the task covers mixed component families; use this skill when the task is clearly about chart choice, chart anatomy, ECharts option fidelity, label/legend/tooltip density, or chart placement.

## Reference Map

| Need | Read |
| --- | --- |
| Preflight understanding before implementation/repair/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Screenshot/sample-derived chart style generalization | `$report-component-style-design` `references/00a-style-generalization-goal.md` and `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` |
| Low-noise high-density visual baseline | `$report-component-style-design` `references/00b-low-noise-high-density-baseline.md` when chart polish, high-end BI style, chart color discipline, tooltip clarity, or outside/general chart guidance is in scope |
| Chart source map and exact placement files | `references/01-chart-reference-map.md` |
| Shared chart visual rules | `$report-component-style-design` `references/05-echarts-charts.md` |
| Spatial / map / geographic analysis cards | `$report-component-design-spec` `references/06-spatial-analysis-map-card-standard.md` when the map is packaged with KPI rails, Top lists, local controls, coverage, trend, structure, point, or migration evidence |
| Reusable relationship analysis chart-card patterns | `$report-component-style-design` `references/09b-relationship-analysis-card-patterns.md` when the chart answers 看关系, 相关性, 关联, 影响因素, or 关系网络 before routing to the exact chart family |
| Report chart/table format baseline | `$report-design-system-governance` `references/05-report-charts-tables-format-guidelines.md` |
| Modern SaaS / BI Dashboard / UI Kit chart-lightness contract | `$report-design-system-governance` `references/12-modern-saas-bi-style-contract.md` when requested |
| Placement and dense acceptance | `$report-component-style-design` references: `12-internal-placement-algorithms.md`, `12-component-acceptance-gates.md` |

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Run the Preflight understanding gate for implementation, repair, or acceptance work; name chart family candidates, data/metric contracts, parent container, affected labels/legend/axis/tooltip surfaces, hard constraints, missing evidence, and start decision.
2. For sample-derived chart visuals, classify the style as an existing controlled pattern, a composed card pattern, an extension gap, or an out-of-scope one-off.
3. Identify chart family, business question, grain, series count, category/time density, exact-value need, interaction, and post-layout container size. After a 12-column block is chosen, estimate `contentW = contentWidth / 12 * cols - cellPadding * 2` and `contentH = rowHeight * rows - cellPadding * 2` before approving a full ECharts surface. Default ordinary chart blocks to `3*2`; do not approve a chart larger than `4*3` unless it is not an ordinary chart block and has an explicit conclusion-card or detail/fullscreen exception.
4. Before selecting or accepting a renderer, run the action reflection loop from `$quality-gate-validation` `references/preflight-understanding-gate.md`; confirm the renderer matches the chart family, source authority, data contract, and design reasonableness.
5. If the source evidence is HTML with SVG/canvas/DOM chart marks, treat those marks as visual/config clues only. Extract labels, approximate layout, categories, series names, and colors when useful, then define an ECharts data-driven implementation for standard charts.
6. Load `references/01-chart-reference-map.md`, then load only the chart-family visual and placement files it names.
7. Confirm chart type is fit for the task before styling labels or colors.
8. Define chart anatomy: title, subtitle/definition, unit, metric strip, legend, axes, plot area, labels, tooltip, local filters, footer/source, and states. Default ECharts legends to the top center of the chart area (`legend.top` plus `legend.left: 'center'` or equivalent centering) unless a pie/donut side legend, mobile fallback, or documented no-legend/sparkline exception is explicit. When the chart has only one data series/one encoded metric, describe that metric in the chart title/subtitle and hide the legend unless a documented multi-encoding exception exists. Cartesian charts must place units in `yAxis.name`, `yAxisUnit`/`axisUnit`, or left/right axis-unit metadata; `yAxis.axisLabel` keeps raw numeric tick values without appending units. Y-axis titles belong on the left/right axis side, and X-axis titles belong in the bottom axis band. Keep the plot centered on the component's central axis after reserved bands are subtracted. Pie/donut/rose charts must declare `minAngle` or a tiny-slice aggregation/detail fallback when small sectors could disappear.
9. When modern SaaS / BI Dashboard / UI Kit style is requested, apply the chart-lightness contract: restrained grid/axis/legend/label density, semantic low-noise colors, one task per chart, no decorative chart variety, and no mini chart pileup inside KPI cards.
10. Verify ECharts ownership and lifecycle: standard ECharts charts must use ECharts series/options/runtime behavior rather than hand-drawn SVG/canvas marks, and must initialize, update, resize, and dispose from a measurable chart body viewport.
11. Run acceptance gates before marking dense or implementation-ready charts as ready.

## Required Output

- Preflight understanding result when the work is implementation/repair/acceptance, plus chart family and selected references.
- Renderer/action reflection result, including any HTML/SVG source conversion decision.
- Chart choice rationale and rejected alternatives when relevant.
- Style generalization result when chart style is sample-derived: controlled pattern field, status, adaptive variables, fallback, and text-only reproducibility.
- Anatomy, placement, label/legend/tooltip, density, state, and responsive rules.
- Data contract: fields, units, precision, grain, filters, and exact-value path.
- Option/runtime proof obligations when implementation or URL exists: renderer owner, `option`/series fields, legend/axis/grid/tooltip settings, estimated post-layout container dimensions, chart body dimensions, plot-height floor, axis-label overlap checks, resize trigger/cleanup path, before/after resize geometry, DOM/SVG collision checks, screenshot/crop evidence, and non-default state coverage.
- ECharts default anatomy proof when charts are implementation-ready: legend top-centered by default, Y-axis unit configured outside raw tick labels, and tooltip/detail path carrying exact value plus unit.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not choose a decorative chart when a simpler chart answers the business question better.
- Do not flatten spatial / map / geographic analysis cards into generic map charts. When the map is packaged with KPI rails, Top lists, local controls, coverage, trend/change, point distribution, structure metrics, or migration/flow evidence, route to `spatialAnalysisCardPattern`, `visualType: spatial-map-card`, and the spatial card data contract before chart styling.
- Do not accept a chart-heavy "modern dashboard" look. Extra chart families, dense labels, high-saturation palettes, decorative plot backgrounds, or multiple mini charts without distinct task roles are `VIS-CHART-OVERWEIGHT` or `RPT-DECORATIVE-CHART`.
- Do not accept rainbow or arbitrary chart palettes. Chart colors must come from inherited semantic chart-series tokens or documented category/status/business exceptions, with exact-value tooltip/detail paths for hidden labels.
- Do not accept a sample-derived chart style that remains image-only or lacks a controlled chart/card pattern, composed pattern decision, or documented `requires-pattern-extension` gap.
- Do not repair or accept chart visuals before the chart family, parent container, data grain, units, renderer ownership, and affected chart anatomy are known.
- Do not copy hand-authored chart SVG/canvas/DOM from an HTML prototype into a standard report chart implementation. Use ECharts options/series/runtime behavior, or document an explicit data-driven custom-diagram exception before implementation.
- Do not accept labels, legends, axis names, or tooltips that overlap, truncate critical evidence, or hide units/precision.
- Do not accept ordinary ECharts legends that drift to the right, bottom, or an unreserved side band by default. Use top-centered legend placement with reserved `grid.top` space, or document an explicit chart-family/mobile/sparkline exception.
- Do not show a legend for a single-series / single-metric Cartesian chart by default. Use the chart title/subtitle to state the data meaning; keep legend only when a documented multi-encoding or interaction exception exists.
- Do not append `%`, `元`, `万元`, `件`, `人`, `次`, or similar units to every Y-axis tick through `yAxis.axisLabel.formatter` for ordinary Cartesian charts. Configure the unit on `yAxis.name`/axis-unit metadata and show exact value + unit in tooltip/detail instead.
- Do not default bounded/score/rate charts such as NPS to `yAxis.min: 0` when the decision is about current vs same-period vs target movement. Compute a dynamic Y-axis range from current value, comparison/same-period value, and target/reference value, then apply a small readable padding/nice scale.
- Do not reserve large outside grid bands for target labels or axis titles. Cartesian `grid.top/right/bottom/left` must be explicitly compact, with Y-axis titles placed on left/right sides, X-axis titles placed at the bottom, and target/reference labels placed inside the plot using `insideEndTop` unless a measured exception is documented.
- Do not use an oversized chart block to compensate for sparse content. If a line/bar/radar/combo/pie/map/funnel/Sankey/tree/relationship chart has fewer marks, series, labels, or evidence items than its area implies, enrich it with target/average/context labels, exact-value paths, adjacent evidence, or reduce/split the span.
- Ordinary chart components default to `3*2` and must not exceed `4*3`. If the chart cannot fit within `4*3`, split the content, reduce density, move detail to table/drawer/fullscreen, or change the component type. Conclusion cards are the exception, not chart canvases.
- Do not accept chart readiness by checking only that `legend`, `tooltip`, or `series` exists. Dense or implementation-ready ECharts charts must prove the relevant option details and rendered geometry. For default top-centered legends, verify `legend.left: 'center'` or equivalent centering plus `grid.top` reserved space and measured/cropped legend position; a right-anchored legend fails unless the spec explicitly asks for it.
- Do not leave chart-engine, data contract, axis/legend/grid/tooltip, exact-value access, state coverage, or renderer ownership as advisory language. These are `MUST/fail` constraints when the chart is implementation-ready or runtime-verifiable.
- Do not accept ECharts responsiveness claims without naming the level. `container-resize-safe` requires non-zero mount size, `setOption` updates, `ResizeObserver` or equivalent container/visibility hooks, cleanup, and a browser resize check. `viewport-responsive` additionally requires page/component breakpoints or reflow proof. A fixed design-width shell with horizontal/vertical scrolling may be container-resize-safe but is not viewport-responsive by itself.
- Do not accept a full line/bar/combo axis chart when it is visually squeezed. After block placement, compute the content container before option tuning. Full axis charts require `contentW >=300px`, `contentH >=200px`, `chartBodyH >=180px`, and plot height `>= max(120px, chartBodyH * 0.45)` after title, top-centered legend, tabs, filters, metric strip, axes, x labels, footer, and any table/list preview are reserved. Blocks below `400px` wide or `250px` high are squeeze-risk and need an explicit `squeezeStrategy`, `axisLabelStrategy`, or `dataZoomStrategy`; blocks below `500px` with dense categories or labels longer than `4-6` characters need label rotation, `hideOverlap`, sampling, dataZoom, Top N/other aggregation, horizontal scroll, or table/detail fallback. Do not use `axisLabel.interval: 0` as the default dense-label fix because it can force every label into an already narrow plot. Dense combo, dual-axis, target/reference, or chart + table/list cards need chart body `>=220px` and plot height `>= max(140px, chartBodyH * 0.48)`. If a full axis chart cannot satisfy the floors, only two outcomes are accepted: enlarge/split the block, or explicitly switch to `compact-sparkline` with legend, Y-axis unit/name, and permanent labels hidden. If y-axis labels stack, gridlines merge into a stripe, or the table/list preview leaves only a thin chart band, fail readiness instead of accepting a squeezed chart.
- Do not distort geographic, radial, proportional, network, or flow geometry.
- Do not mark chart work ready without state handling for loading, empty, error, no-permission, stale, and dense data.
