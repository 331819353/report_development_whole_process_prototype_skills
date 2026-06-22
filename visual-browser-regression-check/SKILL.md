---
name: visual-browser-regression-check
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于对可运行前端页面、报表、仪表盘、大屏或原型执行视觉回归与截图证据检查。用户提到视觉回归、截图diff、baseline diff、Playwright/Cypress截图、multimodal视觉检查、视觉异常识别、组件截图裁切、VIS-*缺陷、截图验收时触发；不替代完整前端运行QA或交互测试。"
---

# Visual Browser Regression Check

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this skill for visual evidence and regression checks: browser screenshots, deterministic image diff, component crops, multimodal visual inspection, and structured visual findings.

Use `$frontend-runtime-qa-validation` for complete runtime QA including console, network, interactions, states, data binding, auth, and readiness.

## Reference Loading

- Read `references/visual-multimodal-browser-check.md` before running or accepting visual regression, screenshot coverage, multimodal review, or `VIS-*` findings.

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Open the target URL with browser automation and wait for page, fonts, charts, tables, and async data to stabilize.
2. Capture deterministic screenshots before judging visual quality.
3. Run baseline image diff when an approved baseline exists; otherwise save baseline candidates and mark baseline as missing.
4. Capture focused component crops for dense report/chart/table/KPI/diagram components when present.
5. For bundled report templates or runnable pages with a URL, run the automated geometry audit when available: `npm run visual:geometry -- --url <url>` or `node scripts/visual-geometry-audit.mjs --url <url>`. It must inspect DOM overflow, clipped text, sibling bounding-box overlap, squeezed repeated rows/cards, list rows where `scrollHeight > clientHeight + 1`, hidden list overflow, ECharts/SVG/canvas container width/height, body height, plot-height squeeze, chart/table crowding, and SVG text overlap before manual screenshot review.
6. When ECharts/SVG/canvas components are present, run at least one geometry probe at a second viewport or container size: measure chart container width/height, chart body, generated SVG/canvas, legend/axis/plot bounds, compact grid bands, side/bottom axis-title placement, target/reference label placement, plot-height floor, axis-label overlap, nonblank pixels/marks, and resize result before accepting visual readiness.
7. Run multimodal explanatory review when available and in scope.
8. When modern SaaS / BI Dashboard / UI Kit style is requested or claimed, inspect screenshot/crop evidence against the positive style contract: light page canvas, optional analytical surfaces, reduced uniform card borders, small radius, restrained shadows, clear hierarchy, no component pileup, and lightweight charts.
9. Convert image-diff failures and visual anomalies into structured `VIS-*` findings with severity, evidence, owner, fix direction, and retest criteria.

## Required Output

- URL, viewport, screenshot paths, and crop coverage.
- Automated geometry audit command, screenshots, JSON report path, and `VIS-*` findings such as `VIS-CONTENT-CLIPPED`, `VIS-TEXT-CLIPPED`, `VIS-ELEMENT-OVERLAP`, `VIS-LIST-ITEM-SQUEEZED`, `VIS-LIST-ROW-CLIPPED`, `VIS-LIST-OVERFLOW-HIDDEN`, `VIS-CHART-SQUEEZED`, `VIS-CHART-CONTAINER-NARROW`, `VIS-CHART-CONTAINER-SHORT`, `VIS-CHART-BODY-SQUEEZED`, `VIS-CHART-PLOT-SQUEEZED`, `VIS-AXIS-LABEL-STACKED`, or `VIS-CHART-TABLE-CROWDING`.
- Baseline diff status and thresholds when available.
- Multimodal review status or precise blocker.
- Proof obligation coverage when owning skills require it: component crops, DOM geometry, CSS/computed-style notes, ECharts/S2 option evidence including legend visibility, grid bands, axis titles, dynamic Y-axis range, target/reference label placement, ECharts resize lifecycle evidence, control ownership evidence, alignment-intent evidence, and non-default visual states.
- Modern BI style-contract coverage when requested or claimed: page/card token evidence, hierarchy, component-pileup scan, and chart-lightness scan.
- Structured `VIS-*` findings.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not mark deterministic visual regression passed without screenshot evidence and a passing baseline diff when a baseline exists.
- Do not replace required component crops with only a full-page screenshot for dense report components.
- Do not replace automated geometry evidence with manual screenshot confirmation when a runnable URL and bundled template script are available. Missing `visual:geometry` output keeps visual readiness `partial` unless a precise environment blocker is recorded.
- Do not mark visual readiness `ready` when required owning-skill proof obligations are missing. Screenshots can support KPI alignment, overflow, chart legend position, and contract implementation, but they do not replace DOM geometry, CSS cascade, ECharts/S2 option, or control ownership checks when those are required.
- Do not mark ECharts visual readiness `ready` by observing only the initial screenshot. Runtime-verifiable charts must provide chart container width/height, chart-body dimensions, generated SVG/canvas dimensions, resize trigger or lifecycle evidence, and a second-size nonblank/collision check, or readiness stays `partial`.
- Do not mark Cartesian ECharts visual readiness `ready` when source/options or crops show an avoidable right-side target-label band, missing/oversized grid sides, misplaced axis titles, a zero-baseline NPS/score/rate axis without business justification, or a visible single-series legend that should have been represented by the chart title/subtitle.
- Do not accept list rows or list containers that pass only by clipping. If a row has `scrollHeight > clientHeight + 1`, `scrollWidth > clientWidth + 1`, or the list hides overflowing evidence/actions with `overflow:hidden` / `clip`, record `VIS-LIST-ROW-CLIPPED` or `VIS-LIST-OVERFLOW-HIDDEN`.
- Do not accept full axis charts squeezed into a thin band or narrow/short container. If chart container width is below `300px`, height is below `200px`, squeeze-risk bands lack strategy metadata, chart body/plot height is below the owning chart floor, axis labels stack, gridlines merge, or a table/list preview crowds the chart, record `VIS-CHART-SQUEEZED`, `VIS-CHART-CONTAINER-NARROW`, `VIS-CHART-CONTAINER-SHORT`, `VIS-CHART-BODY-SQUEEZED`, `VIS-CHART-PLOT-SQUEEZED`, `VIS-AXIS-LABEL-STACKED`, or `VIS-CHART-TABLE-CROWDING`.
- Do not mark visual readiness ready for requested modern SaaS / BI Dashboard / UI Kit pages when `VIS-MODERN-BI-BASELINE-MISSING`, `VIS-GENERIC-SAAS-SHELL`, `VIS-COMPONENT-PILEUP`, `VIS-CHART-OVERWEIGHT`, or `VIS-HIERARCHY-FLAT` remains unresolved.
- If multimodal review is unavailable, record the blocker and keep explanatory visual review `partial` unless the task only requires deterministic regression.
