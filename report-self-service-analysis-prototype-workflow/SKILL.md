---
name: report-self-service-analysis-prototype-workflow
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。运行自助分析类报表原型 workflow。用户提到自助分析、分析工作台、BI 自助分析、拖拽维度指标、自由组合筛选、透视分析、保存个人报表、分享分析、图表切换、探索还有什么问题时触发；不负责通用报表原型 workflow、指标看板、分析报告、明细报表、API 文档或后端实现。"
---

# Self-Service Analysis Prototype Workflow

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this workflow when the prototype is an analysis workbench rather than a fixed report. It is one of the five peer prototype workflows.

Core intent:

```text
自助分析让用户自己探索“还有什么问题”。
```

Prototype story gate: this workflow does not call `$report-prototype-design-thinking` by default. It carries its own typed story gate: reviewers should understand within 30 seconds how the analyst starts from a question, chooses dimensions/metrics, gets a result, verifies it, and saves or shares the reusable analysis.

Prototype layout gate: design and QA target `1920x1080`; page layout uses `12 * N`, minimum `2*1`, default analytical/chart block `3*2`, ordinary chart max `4*3`, and component internals default to center-axis symmetry. Existing design ideas in requirement documents must be checked before landing. Metric口径/指标清单 and design-process artifacts such as 下钻链路清单, component mapping, binding matrix, workflow/gate checklist, dataset field catalogue, and implementation notes are supplemental by default and stay in tooltip/detail/dictionary/interaction contract/validation/handoff unless explicitly requested as visible page content or rewritten as business-value conclusion, evidence, trust/source, or action content.

## Child Skills

| Stage | Skill |
| --- | --- |
| Requirement intake | `$report-requirement-structure-extraction` |
| Report business type | `$report-type-design` |
| Component/data/filter/interaction mapping | `$report-info-component-mapping` |
| Page layout | `$report-visual-layout-design` |
| Runnable template assets | `$report-prototype-template-management` |
| Component visual details | `$report-component-style-design` |
| Chart standards | `$report-chart-design-spec` |
| Table/pivot standards | `$report-table-design-spec` |
| Filter standards | `$report-filter-control-design-spec` |
| Component placement | `$report-component-placement-spec` |
| Design system | `$report-design-system-governance` |
| Quality gates | `$quality-gate-validation` |
| Runtime QA | `$frontend-runtime-qa-validation` |

## Workflow

1. Run `$quality-gate-validation` `references/preflight-understanding-gate.md` before design, repair, template edits, or code. Name affected surfaces, owning skills, hard constraints, missing evidence, and start decision.
2. Confirm mode: design proposal, implementation spec, runnable prototype, repair, or URL handoff.
3. Define the typed prototype story: target analyst, one-sentence exploration value, starting question, analysis result, reuse outcome, and trust/permission boundary.
4. Define the self-service user path: choose dataset/template -> select dimensions/metrics -> configure filters/view -> inspect chart/table result -> drill/verify detail -> save/share/export/reuse.
5. Define `dataScope -> analysisModel -> operationModel -> outputResult`.
6. List available datasets, dimensions, metrics, time fields, filter fields, and custom fields.
7. Define field metadata: field type, groupability, filterability, calculability, permissions, masking, allowed combinations, and performance limits.
8. Design the workbench structure: dataset/report title/save/share/export, field panel, row/column/metric/filter configuration, chart/style configuration, result area, drilldown/detail drawer.
9. Define user operations: drag/drop or equivalent selection, filter, sort, Top N, null handling, chart switching, pivot/table view, drilldown, save, duplicate, share, scheduled delivery, export, add-to-dashboard.
10. Use `$report-type-design` with exploratory-analysis intent; keep detail-query only as a drilldown or output block.
11. Use `$report-info-component-mapping` for field panel, config zones, result widgets, dataset contracts, invalid-combination states, and binding matrix.
12. Route chart, table/pivot, filter, and component-internal placement surfaces to `$report-chart-design-spec`, `$report-table-design-spec`, `$report-filter-control-design-spec`, and `$report-component-placement-spec` before implementation-ready decisions.
13. Run the anti-laziness execution gate from `$quality-gate-validation` before implementation-ready, repair, QA, or handoff conclusions. Keep `LAZY-*` findings visible until evidence closes them.
14. Use `$report-visual-layout-design` to produce `pageLayoutConfig`: `layoutRows`, stable block ids, field-panel/config/result/detail block spans, first-viewport workbench path, and nav/page wiring.
15. Use `$report-prototype-template-management` to execute the nine-step template operation flow: `frameworkTemplateId -> pageLayoutConfig -> blockLayoutTemplateMap -> titleAreaConfig -> pillAreaConfig -> auxMetricAreaConfig -> unitAreaConfig -> componentContentAreaTemplateMap -> summaryAreaConfig`. Select the independent 分块布局模板 Vue file for every workbench/result block, configure title, decide pill buttons, configure evenly distributed additional information, decide units, then fill `3 componentArea` slots and configure summary/explanation.
16. For every `3 componentArea` slot, choose an existing 组件内容区模板 first. If no suitable field-panel, chart/table/pivot result, or state template fits, create a standalone component content area template and register/copy it before slot fill. Use ECharts for standard chart fallbacks and S2/project-equivalent behavior for pivot/cross-table fallbacks when needed.
17. Use the owning layout, template, and component skills only in this order: finalize `pageLayoutConfig`, finalize `blockLayoutTemplateMap`, then finalize each component content area template so the workbench does not hide the analysis model behind decorative charts.
18. Verify data completeness, permission states, empty/error/timeout/invalid-combination states, and runnable URL when requested.

## Required Output

- Workflow mode, Preflight understanding matrix, target analysts, business scenarios, datasets, and exploration questions.
- Typed prototype story: one-sentence exploration value, user path, starting question, result/reuse outcome, trust/permission boundary, and 30-second review path.
- Affected-surface to owning-skill routing, especially field-panel layout, chart, table/pivot, filter, component placement, design-system, template, and runtime QA.
- Data scope, analysis model, operation model, and output/result reuse model.
- Field catalog: dimensions, metrics, time fields, statuses, custom fields, and each field's allowed operations.
- Workbench layout: field panel, configuration area, chart/table/pivot result area, detail drawer, save/share/export controls.
- Template operation chain: `frameworkTemplateId`, `pageLayoutConfig`, `blockLayoutTemplateMap` with selected independent block layout Vue files, `titleAreaConfig`, `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, `componentContentAreaTemplateMap`, `summaryAreaConfig`, and self-developed component content area fallback list.
- Result-content boundary: visible exploration/result/trust/reuse content versus process artifacts moved to interaction contract, appendix/handoff, validation, or removal.
- Filter, grouping, sorting, chart switching, drilldown, save/share/export, permission, masking, and performance rules.
- Component/data/filter/control/interaction binding matrix.
- Anti-laziness execution result: evidence inspected, `LAZY-*` findings or explicit no-finding result, before/after proof for repairs, regression probe, and readiness impact.
- Template/custom shell decision, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not design a BI-looking page unless the data model can support the promised field combinations.
- Do not start layout or workbench controls until the exploration story, user path, starting question, result/reuse outcome, and trust/permission boundary are explicit or safely inferred.
- Do not start runnable implementation until the nine-step template operation chain has no missing block configs or slots. `blockLayoutTemplateMap` must name the selected independent block layout Vue file, not only a generic size wrapper plus `componentRegionPattern`. Every `3 componentArea` slot must use an existing 组件内容区模板 or a newly registered standalone component content area template.
- Do not mark ready when layout or QA uses any viewport other than `1920x1080`, when the page ignores `12 * N`/`3*2`/chart `4*3` constraints, or when supplemental metric口径/指标清单 or design-process artifacts are rendered as page modules without an explicit display requirement or business-value justification.
- Do not start implementation or repair from this workflow alone when chart/table/filter/placement surfaces require their specific front-door skills.
- Do not mark ready without a Preflight understanding start decision and evidence that required specialty skills were loaded or explicitly not needed.
- Do not hide field metadata, invalid combinations, permissions, or performance limits.
- Do not treat save/share/export as optional polish; they decide whether self-service analysis can be reused.
- Do not overload ordinary users with expert controls without templates, presets, or guided defaults.
- Do not put field-panel title bands, filter summary copy, additional information, units, or explanation text inside result component content slots. Those stay on 分块布局模板 supporting areas or explicit workbench shell/config blocks.
- Do not claim runnable readiness until non-default field/filter/chart changes visibly alter the result.
- Do not mark ready when the anti-laziness gate is missing, `LAZY-*` findings remain open, or only default field/filter/chart states were checked.
