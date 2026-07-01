---
name: report-prototype-design-thinking
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于报表、仪表盘、数据大屏、BI 页面原型在画表格、画图表或写代码前建立通用设计思路。用户提到原型核心叙事、用户路径、产品价值、半文档半产品、报表原型通用设计思路、产品经理接到报表需求、谁在什么场景下做什么决策、先想清楚业务目标/角色/指标/分析路径时触发；不负责四类专项原型 workflow、页面模板工程、API 文档、后端实现或运行测试。"
---

# Report Prototype Design Thinking

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this skill before report prototype layout, chart selection, component mapping, template selection, or implementation. It owns the product-manager thinking layer: what story the prototype must make clear, who uses the report, in what scenario, and what decision or action the user should take.

Default policy: this is the thinking layer used during `report-prd-document-generation` to decide report content, story, reading path, and page structure before a specialized prototype workflow starts. Four specialized prototype workflows exist separately for 自助分析、指标看板、分析报告、或明细报表 and should consume the generated PRD bundle instead of recreating the thinking step from scratch.

## Reference Loading

- Prototype story method: `references/00-prototype-story-design-thinking.md`
- Report decision method: `references/01-general-prototype-design-thinking.md`
- Good report decision-path gate: `references/02-good-report-decision-path.md`
- Configurable template zero-to-one flow: `report-prototype-template-management` `references/configurable-zero-to-one-flow.md` when the thinking output feeds a runnable template project

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Load `references/00-prototype-story-design-thinking.md` before ordinary prototype work.
2. Load `references/01-general-prototype-design-thinking.md` when the prototype is a report, dashboard, BI page, data screen, or business-analysis page.
3. Define the core narrative: user, problem, usage scenario, and the one-sentence value reviewers should remember.
4. Define the user path before page structure: entry -> first action -> core flow -> result feedback.
5. Split content into main functions, supporting functions, and information display; do not average-weight every module.
6. Identify two or three key decision points and their default, guidance, error, success, empty, partial, and no-permission states.
7. Identify target user, decision scenario, managed object, business question, time scope, expected action, and output form.
8. Separate report content into `coreMetrics`, `analysisMetrics`, and `detailFields`; do not turn a raw field list directly into page blocks.
9. Run the good-report decision-path gate: one primary decision question, conclusion-before-evidence order, What/Why/So what coverage, comparison baseline, metric relationship network, drilldown/action path, and 3-second self-check.
10. Build the conclusion explanation chain before layout: `overallConclusion -> supportingSections -> sectionConclusion -> evidenceComponents`. The overall conclusion is the report's total judgment; each section explains one reason, risk, trust point, detail route, or action behind that conclusion; each component explains one section conclusion.
11. Classify proposed content as `visible-result`, `interaction-or-contract`, `supplemental-handoff`, or `remove`. Design-process artifacts such as 下钻链路清单, 指标清单, component mapping, binding matrix, workflow/gate checklists, dataset field catalogues, and implementation notes are not visible results by default.
12. Define the analysis path before layout. A common report path is: overall state -> trend -> dimension/driver split -> ranking/anomaly -> detail/action.
13. Decide whether the page should be an information-flow report, KPI dashboard, detail/query report, analysis narrative, or cockpit/status monitor. Default to information flow unless current-state monitoring is the central decision.
14. Choose components and charts by analysis purpose, not visual variety. KPI cards are only for primary decision metrics; do not turn every metric, explanation, detail, action, or trust note into a card/tile.
15. Record filters, drilldowns, exports, permissions, data口径, freshness, empty/error/no-permission states, brand-vs-status color rules, result-content boundary decisions, and unresolved gaps.
16. Hand off the design-thinking output to `report-prd-document-generation` for `RTP-*` report-path selection and PRD-owned component mapping, then to `report-visual-layout-design` and `report-prototype-template-management`. When the target is a runnable configurable template, the handoff must explicitly preserve the chain `frameworkTemplateId -> pageLayoutConfig -> blockAreaConfigMap -> componentSlotConfigMap -> componentExampleConfigMap`.

## Required Output

- Core narrative: target user, problem solved, usage scenario, and one-sentence value.
- User path: entry, first action, core flow, result feedback, and walkthrough risks.
- Functional architecture: main functions, supporting functions, information display, and key decision points.
- Target users, usage scenario, business question, decision/action, managed object, time scope, and output mode.
- Metric/field layering: core metrics, analysis metrics, detail fields, dimensions, baselines, thresholds, and known口径 gaps.
- Good report decision path: one primary decision question, 3-second main point, What/Why/So what coverage, comparison baseline, metric relationship network, drilldown/action path, and `RPT-*` gaps.
- Conclusion explanation chain: `overallConclusion`, supporting sections, each section conclusion, reason role, evidence components, evidence role, and any `RPT-NO-OVERALL-CONCLUSION` / `RPT-ORPHAN-SECTION` / `RPT-ORPHAN-COMPONENT` gaps.
- Result-content boundary: which conclusions, insights, evidence, trust cues, or actions stay visible because they help business judgment; which process artifacts move to interaction contract, tooltip/detail/dictionary, validation, appendix/handoff, or removal.
- Analysis path and first-viewport answer.
- Page rhythm decision: information-flow report vs KPI/dashboard grid, KPI scope boundary, and card-border reduction direction.
- Page block proposal with each block's business purpose.
- Component/chart choice rationale tied to the question it answers.
- Filter, drilldown, export, save/share, permission, refresh, and state requirements.
- Downstream handoff notes for report type, component mapping, layout, template, data/API, and testing.
- Configurable-template handoff when applicable: candidate framework/template family, page/block intent, slot intent, and component-example gaps to resolve through the latest zero-to-one flow.

## Quality Gate

- Do not start by drawing pages, tables, or charts before the prototype story, user path, user/scenario/decision/action, and first value sentence are explicit or safely inferred.
- Do not treat the prototype as only a UI drawing. It must help reviewers understand product value without the designer standing beside it.
- Do not average-weight every feature. Separate protagonist functions, supporting functions, and information display.
- Do not skip entry path, first action, result feedback, or key states when they affect whether the story can be understood.
- Do not treat "报表" as one fixed page shape. When the user explicitly needs monitoring, explanation, exploration, or exact record verification, use the corresponding specialized prototype workflow instead of branching inside this skill.
- Do not place all requested fields on the main canvas. Detail fields belong in detail tables, drawers, exports, or appendix unless they are needed for the first decision.
- Do not accept a report prototype whose primary metrics are isolated numbers without target/baseline/benchmark/denominator/threshold comparison.
- Do not accept a flat metric list as the core report structure. Core metrics need driver, dimension, detail, action, or trust relationships.
- Do not accept a report that has only peer sections or peer components. A non-detail-only report needs one overall conclusion, multiple supporting sections that explain it, partial conclusions inside those sections, and components that explain the partial conclusions.
- Do not accept orphan sections or orphan components. Every section must explain the overall conclusion, and every primary component must name the section conclusion it supports.
- Do not place detail/source rows above judgment and evidence unless the report is explicitly detail-query or reconciliation-first.
- Do not expose design process as report content. 下钻链路, 指标清单, component mapping, binding matrix, workflow/gate checklists, dataset fields, and implementation notes are internal artifacts unless the user explicitly asks to display documentation or the content passes the business-value test: it helps the reader judge, understand evidence/reason, verify trust/source, or take action.
- Do not default to a dashboard/card-grid shape. Use an information-flow structure for analysis, review, detail, and decision-support pages.
- Do not KPI-ize every module. KPI cards are reserved for primary decision metrics with formula, baseline/target or comparison, status rule, source/freshness, and detail/action route.
- Do not use red/green as the default visual answer. Brand/product colors and neutral hierarchy should carry identity and reading order; semantic colors need explicit business meaning.
- Every proposed component must answer a named question, provide evidence, or support a required action.
- A type-specific entry must not bypass metric口径, data source, permissions, export scope, and abnormal/empty/error state notes.
- If the result feeds a runnable prototype, pass this output into the binding matrix and layout/template workflow before implementation.
