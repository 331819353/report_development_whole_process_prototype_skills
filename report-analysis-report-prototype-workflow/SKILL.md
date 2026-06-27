---
name: report-analysis-report-prototype-workflow
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。运行分析报告类报表原型 workflow。用户提到分析报告、专题分析、经营分析报告、月报/周报/季报、活动复盘、原因归因、为什么上涨/下降、结论先行、证据链、行动建议、为什么这样时触发；不负责通用报表原型 workflow、自助分析、指标看板、明细报表、API 文档或后端实现。"
---

# Analysis Report Prototype Workflow

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this workflow when the prototype should explain a topic, variance, or business problem through a structured data story. It is one of the five peer prototype workflows.

PRD prerequisite: consume `$report-prd-document-generation` as the independent input contract. This workflow executes analysis-report-specific story, evidence, layout, and interaction design from the PRD; it must not generate a complete PRD internally.

Core intent:

```text
分析报告讲“为什么这样”。
```

Prototype story gate: this workflow does not call `$report-prototype-design-thinking` by default. It carries its own typed story gate: reviewers should understand within 30 seconds what happened, why it likely happened, how large the impact is, and what action or follow-up decision is expected.

Prototype layout gate: design and QA target `1920x1080`; page layout uses `12 * N`, minimum `2*1`, default analytical/chart block `3*2`, ordinary chart max `4*3`, and component internals default to center-axis symmetry. Existing design ideas in requirement documents must be checked before landing. Metric口径/指标清单 and design-process artifacts such as 下钻链路清单, component mapping, binding matrix, workflow/gate checklist, dataset field catalogue, and implementation notes are supplemental by default and stay in tooltip/detail/dictionary/interaction contract/validation/handoff unless explicitly requested as visible page content or rewritten as business-value conclusion, evidence, trust/source, or action content.

Template-only gate: this workflow must use templates for framework shell, page layout, block layout templates, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, and permission surfaces. Only interaction behavior and component content area templates may be self-developed, and both must appear in the PRD/workflow `selfDevelopmentExceptionMap`.

## Child Skills

| Stage | Skill |
| --- | --- |
| PRD prerequisite | `$report-prd-document-generation` |
| Requirement evidence clarification | `$report-requirement-structure-extraction` |
| Report business type | `$report-type-design` |
| Component/data/filter/interaction mapping | `$report-info-component-mapping` |
| Page layout | `$report-visual-layout-design` |
| Runnable template assets | `$report-prototype-template-management` |
| Component visual details | `$report-component-style-design` |
| Chart standards | `$report-chart-design-spec` |
| Table standards | `$report-table-design-spec` |
| Filter standards | `$report-filter-control-design-spec` |
| Component placement | `$report-component-placement-spec` |
| Design system | `$report-design-system-governance` |
| Quality gates | `$quality-gate-validation` |
| Runtime QA | `$frontend-runtime-qa-validation` |

## Workflow

1. Run `$quality-gate-validation` `references/preflight-understanding-gate.md` before design, repair, template edits, or code. Name affected surfaces, owning skills, hard constraints, missing evidence, and start decision.
2. Confirm the PRD prerequisite. If no PRD exists, or the PRD lacks a PRD-to-workflow execution matrix, use `$report-prd-document-generation` before continuing. Use `$report-requirement-structure-extraction` only to clarify evidence/gaps that must be written back into the PRD.
3. Load `$report-prd-document-generation` `references/prototype-workflow-execution-map.md` and validate that PRD sections 1-9 plus 5A cover the analysis audience, scope, page content, narrative layout, dynamic conclusion rules, metrics, metric mounting, data/API, and interactions.
4. Confirm mode: design proposal, implementation spec, runnable prototype, repair, or URL handoff.
5. Derive the typed prototype story from the PRD: target audience, conclusion/value intent plus `conclusionRuleMap`, protagonist problem or variance, key evidence, and action or follow-up decision.
6. Define the report reader path from PRD roles/scenes and page content: enter from meeting/topic context -> read conclusion -> inspect overview -> locate cause/attribution -> assess impact -> decide action -> verify appendix/source.
7. Define the report question from PRD background/goals: what happened, why, impact, and next action.
6. Write the conclusion-first answer before choosing charts. The conclusion must include fact, magnitude, likely reason, and suggested action when evidence allows.
7. Build the narrative path: conclusion -> overview -> problem analysis -> attribution -> impact -> action -> appendix.
8. Define evidence: metric formulas, comparisons, baselines, time/region/channel/product/customer/person/process splits, contribution, and detail evidence.
9. Define interaction: period switch, dimension switch, chart-to-detail, conclusion-to-chart anchor, expand/collapse, PDF/PPT export, share, comment, historical report.
10. Use `$report-type-design`: default primary type is `analysis-diagnostic`; use `review-recap` when meeting/report circulation is the main scenario.
11. Use `$report-info-component-mapping` to bind conclusions, `conclusionRuleMap`, evidence components, attribution blocks, action items, appendix details, and states.
12. Route chart, table, filter, and component-internal placement surfaces to `$report-chart-design-spec`, `$report-table-design-spec`, `$report-filter-control-design-spec`, and `$report-component-placement-spec` before implementation-ready decisions.
13. Run the anti-laziness execution gate from `$quality-gate-validation` before implementation-ready, repair, QA, or handoff conclusions. Keep `LAZY-*` findings visible until evidence closes them.
14. Use `$report-visual-layout-design` to produce `pageLayoutConfig`: `layoutRows`, stable block ids, block spans, first-viewport narrative path, and nav/page wiring.
15. Use `$report-prototype-template-management` to execute the nine-step template operation flow: `frameworkTemplateId -> pageLayoutConfig -> blockLayoutTemplateMap -> titleAreaConfig -> pillAreaConfig -> auxMetricAreaConfig -> unitAreaConfig -> componentContentAreaTemplateMap -> summaryAreaConfig`. Select the independent 分块布局模板 Vue file for every narrative/evidence block, configure title, decide pill buttons, configure evenly distributed additional information, decide units, then fill `3 componentArea` slots and configure summary/explanation. Any conclusion in `4 summaryArea`, conclusion cards, or analysis insight components must consume `conclusionRuleMap`.
16. For every `3 componentArea` slot, choose an existing standalone Vue 组件内容区模板 first. If no suitable template fits the evidence body, create a standalone ECharts-backed Vue component content area template and register/copy it before slot fill. Do not put title, pills, filters, controls, additional information, units, description, or explanation copy inside the component slot. A conclusion card or analysis insight component may render a generated conclusion only when bound to `conclusionRuleId`; do not put fixed conclusion copy in slot props or component defaults.
17. Use the owning layout, template, and component skills only in this order: finalize `pageLayoutConfig`, finalize `blockLayoutTemplateMap`, then finalize each component content area template so the report reads as a coherent story, not a chart gallery.
18. Verify conclusion-evidence links, action follow-up, export/share/comment needs, and runnable URL when requested.

## Required Output

- Workflow mode, Preflight understanding matrix, report audience, report period, data scope, business question, and meeting/circulation scenario.
- PRD prerequisite proof: PRD status, PRD-to-workflow execution matrix, analysis-report rows consumed, blocked/draft rows, and deferred-out-of-scope rows.
- Typed prototype story: conclusion/value intent plus dynamic rule coverage, reader path, protagonist problem or variance, key evidence, action/follow-up decision, and 30-second review path.
- Affected-surface to owning-skill routing, especially narrative layout, chart, table, filter, component placement, design-system, template, and runtime QA.
- Core conclusion, supporting evidence, cause breakdown, impact assessment, and action recommendation.
- Dynamic conclusion rule map: `conclusionRuleMap` with `RULE-*` rows for the core conclusion, section conclusions, summary-area narratives, conclusion cards, and analysis insight components.
- Result-content boundary: visible conclusions/evidence/actions versus process artifacts moved to interaction contract, appendix/handoff, validation, or removal.
- Narrative block plan: title/meta, conclusion, overview, problem analysis, attribution, action, appendix.
- Template operation chain: `frameworkTemplateId`, `pageLayoutConfig`, `blockLayoutTemplateMap` with selected independent block layout Vue files, `titleAreaConfig`, `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, `componentContentAreaTemplateMap`, `summaryAreaConfig`, `conclusionRuleMap` consumption evidence, and ECharts self-developed component content area fallback list.
- Comparison model: current vs previous, YoY, actual vs target, before/after, segment comparison.
- Action model: owner, deadline, follow-up metric, status, and tracking notes.
- Filter, interaction, export/share/comment/history, permission, freshness, and state requirements.
- Component/data/filter/control/interaction binding matrix.
- Anti-laziness execution result: evidence inspected, `LAZY-*` findings or explicit no-finding result, before/after proof for repairs, regression probe, and readiness impact.
- `pageShellPath: template`, selected framework template, `selfDevelopmentExceptionMap`, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not build a chart collection with no conclusion.
- Do not start analysis story, narrative layout, component mapping, template, or implementation work without a PRD from `$report-prd-document-generation`.
- Do not mark ready until every PRD execution row needed for report story, page content, layout, metrics, metric mounting, data/API, interactions, and export/comment/history behavior is consumed or explicitly deferred out of scope.
- Do not start layout or component selection until the report story, reader path, protagonist problem/variance, evidence chain, and action/follow-up decision are explicit or safely inferred.
- Do not start runnable implementation if any requested self-development target is outside interaction behavior or component content area templates.
- Do not start runnable implementation until the nine-step template operation chain has no missing block configs or slots. `blockLayoutTemplateMap` must name the selected independent block layout Vue file, not only a generic size wrapper plus `componentRegionPattern`. Every `3 componentArea` slot must use an existing 组件内容区模板 or a newly registered standalone ECharts component content area template.
- Do not mark ready when layout or QA uses any viewport other than `1920x1080`, when the page ignores `12 * N`/`3*2`/chart `4*3` constraints, or when supplemental metric口径/指标清单 or design-process artifacts are rendered as page modules without an explicit display requirement or business-value justification.
- Do not start implementation or repair from this workflow alone when affected chart/table/filter/placement surfaces require their specific front-door skills.
- Do not mark ready without a Preflight understanding start decision and evidence that required specialty skills were loaded or explicitly not needed.
- Do not explain changes without a baseline, comparison, or evidence link.
- Do not let recommendations appear without owner, follow-up metric, or tracking intent when the report drives action.
- Do not repeat the same metric across multiple charts unless each chart answers a different narrative step.
- Do not claim readiness unless each conclusion is tied to evidence or marked as insufficient-data.
- Do not claim readiness when a core conclusion, section conclusion, `4 summaryArea` conclusion, conclusion card, or analysis insight component uses fixed normal-state copy instead of a PRD `RULE-*` rule that recomputes from current data.
- Do not put narrative titles, evidence summaries, fixed conclusion text, filters, controls, additional information, units, descriptions, or explanation copy inside component content slots. Those stay on 分块布局模板 supporting areas, shell/page config, or narrative blocks. A conclusion card or analysis insight component may render generated conclusion output only through `conclusionRuleId`.
- Do not mark ready when the anti-laziness gate is missing, `LAZY-*` findings remain open, or conclusion/story claims rely on generic design assertions without evidence links.
