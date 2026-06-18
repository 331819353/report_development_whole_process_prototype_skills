---
name: report-table-design-spec
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于报表/仪表盘/BI中的表格设计规范、明细表、复杂表头、分组表头、透视表、交叉表、AntV S2、指标矩阵、分页、固定列、排序、条件格式、表格可读性和表格布局验收。用户提到表格规范、表格设计、明细表、透视表、复杂表头、分组表头、S2、AntV S2、表格列宽、表格滚动、固定表头、固定列、分页、导出、表格溢出时触发；不负责整页布局或API实现。"
---

# Report Table Design Spec

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this as the direct front door for analytical table standards. It makes table references reachable without first entering the broad component-style skill.

When table references come from screenshots or visual samples, route them through the shared style generalization goal first: the table must map to a controlled table pattern, a valid composed table/card pattern, or a documented extension gap before it becomes implementation guidance.

Use `$report-component-style-design` for mixed components; use this skill when the task is mainly table anatomy, column/header structure, S2/pivot behavior, row density, scrolling, pagination, or table acceptance.

## Reference Map

| Need | Read |
| --- | --- |
| Preflight understanding before implementation/repair/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Screenshot/sample-derived table style generalization | `$report-component-style-design` `references/00a-style-generalization-goal.md` and `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` |
| Low-noise high-density visual baseline | `$report-component-style-design` `references/00b-low-noise-high-density-baseline.md` when table polish, operation clutter, status color noise, or outside/general table guidance is in scope |
| Table source map and exact placement files | `references/01-table-reference-map.md` |
| Analytical table visual/content rules | `$report-component-style-design` `references/06-analytical-tables.md` |
| Report chart/table format baseline | `$report-design-system-governance` `references/05-report-charts-tables-format-guidelines.md` |
| Table/composite placement routing | `$report-component-style-design` `references/12f-placement-composite-tables.md` |
| Dense table acceptance | `$report-component-style-design` `references/12-component-acceptance-gates.md` |

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Run the Preflight understanding gate for implementation, repair, or acceptance work; name table type candidates, row grain, primary key/object identity, column contracts, parent container, hard constraints, missing evidence, and start decision.
2. For sample-derived table visuals, classify the style as an existing controlled pattern, a composed table/card pattern, an extension gap, or an out-of-scope one-off.
3. Identify table type: detail table, grouped header, pivot/S2, metric matrix, composite panel child, or export-oriented list.
4. Load `references/01-table-reference-map.md`, then load only the matching visual and placement references.
5. Define row grain, columns, header hierarchy, metrics, units, precision, sorting, filtering, pagination, fixed header/columns, and export behavior.
6. Reserve visible space for header depth, body rows, scrollbars, pagination, summary, selection, empty/error/no-permission states, and tooltips.
7. Convert table rules into proof obligations when implementation or URL exists: row grain, primary key/object identity, column metadata, grouped-header tree/span proof, S2/project renderer evidence, pagination/search/sort/export scope, body height/row count, overflow behavior, and state coverage.
8. Verify table readability at the target viewport and density before marking ready.

## Required Output

- Preflight understanding result when the work is implementation/repair/acceptance, plus table type and selected references.
- Style generalization result when table style is sample-derived: controlled pattern field, status, adaptive variables, fallback, and text-only reproducibility.
- Row grain, columns, header hierarchy, units/precision, and interaction contract.
- Layout rules for width, height, rows, fixed areas, scroll, pagination, and states.
- Proof obligations: row grain/primary key, column metadata, renderer ownership, grouped-header or pivot contract, pagination/search/sort/export scope, DOM overflow/visible-row checks, and screenshot/crop evidence when code or URL exists.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not hide critical columns through nowrap truncation, unplanned horizontal scroll, or decorative density.
- Do not accept table styling that uses strong colored backgrounds, many permanent row operations, or tag noise as the main visual language. Tables must remain scan-first: restrained header, stable rows, typed alignment, bounded actions, and exact-value disclosure.
- Do not accept a sample-derived table style that remains image-only or lacks a controlled table pattern, composed pattern decision, or documented `requires-pattern-extension` gap.
- Do not repair or accept table visuals before row grain, primary key/object identity, column type/width/alignment metadata, and density limits are known.
- Do not use pivot/S2 patterns when a detail table answers the task more directly.
- Do not mark a table ready without pagination/large-result behavior and empty/error/no-permission states when data can vary.
- Row grain, primary key/object identity, column metadata, renderer ownership, grouped-header/pivot contracts, pagination/search/sort/export scope, overflow, and state coverage are `MUST/fail` constraints for implementation-ready tables; recommended density values may vary only with a documented fit proof and fallback.
