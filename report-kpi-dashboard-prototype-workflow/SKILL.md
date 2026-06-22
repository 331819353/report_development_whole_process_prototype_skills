---
name: report-kpi-dashboard-prototype-workflow
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。运行指标看板类报表原型 workflow。用户提到指标看板、经营看板、驾驶舱、状态总览、目标达成、核心 KPI、同比环比、趋势、排名、异常提醒、预警、现在怎么样时触发；不负责通用报表原型 workflow、自助分析、分析报告、明细报表、API 文档或后端实现。"
---

# KPI Dashboard Prototype Workflow

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this workflow when the prototype should monitor business state quickly. It is one of the five peer prototype workflows.

Core intent:

```text
指标看板看“现在怎么样”。
```

Even in this workflow, "dashboard" does not mean every module becomes a KPI card. The workflow must keep a bounded KPI summary, then use trend, driver, anomaly, detail, action, and trust components according to the decision path. Use brand/product color and neutral hierarchy for the page language; reserve red/green/orange for documented status, risk, warning, success, error, finance/market, or metric-direction semantics.

Prototype story gate: this workflow does not call `$report-prototype-design-thinking` by default. It carries its own typed story gate: reviewers should understand within 30 seconds what the current state is, which object or metric needs attention, and what drilldown or action should happen next.

Prototype layout gate: design and QA target `1920x1080`; page layout uses `12 * N`, minimum `2*1`, default analytical/chart block `3*2`, ordinary chart max `4*3`, and component internals default to center-axis symmetry. Existing design ideas in requirement documents must be checked before landing. Metric口径/指标清单 and design-process artifacts such as 下钻链路清单, component mapping, binding matrix, workflow/gate checklist, dataset field catalogue, and implementation notes are supplemental by default and stay in tooltip/detail/dictionary/interaction contract/validation/handoff unless explicitly requested as visible page content or rewritten as business-value conclusion, evidence, trust/source, or action content.

Visual quality gate: a dashboard that passes data/config validation can still fail as a prototype when the first viewport feels empty, fragmented, or template-like. Treat excessive blank space, oversized charts with too few marks, equal-weight blocks, low-contrast tiny copy, half-exposed next-row modules, and component content stretched away from its natural reading group as implementation defects, not polish preferences. A valid KPI dashboard prototype must prove that the first viewport is visually closed enough to answer the current-state question while still hinting at the next diagnostic layer intentionally.

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
| Table standards | `$report-table-design-spec` |
| Filter standards | `$report-filter-control-design-spec` |
| Component placement | `$report-component-placement-spec` |
| Design system | `$report-design-system-governance` |
| Quality gates | `$quality-gate-validation` |
| Runtime QA | `$frontend-runtime-qa-validation` |

## Workflow

1. Run `$quality-gate-validation` `references/preflight-understanding-gate.md` before design, repair, template edits, or code. Name affected surfaces, owning skills, hard constraints, missing evidence, and start decision.
2. Confirm mode: design proposal, implementation spec, runnable prototype, repair, or URL handoff.
3. Define the typed prototype story: who checks the dashboard, what "current state" they must remember, what status/risk/opportunity is the protagonist, and what next drilldown/action the page should push.
4. Define the dashboard user path: enter with time/org context -> judge state -> compare target/baseline -> locate split/rank/anomaly -> drill to object/detail/action -> confirm freshness/trust.
5. Define the dashboard decision: business health, target progress, abnormality, risk object, and next drilldown.
6. Lock the KPI set and KPI scope boundary: core KPI, process KPI, risk KPI, formula, unit, period, target, threshold, baseline, owner/source, freshness, and which metrics truly deserve KPI-card treatment.
7. Design the first viewport as a current-state information flow: title, time range, update time, global filters, bounded core KPI summary, target completion, YoY/MoM, abnormal reminder, and the first diagnostic evidence. Avoid filling the viewport with same-weight KPI cards.
8. Design the second layer: trends, target/average lines, regional/channel/product comparisons, key rankings.
9. Design the third layer: anomaly detail, attention list, drilldown destination, and action entry.
10. Use `$report-type-design`: default primary type is `status-overview`; use `anomaly-monitoring` only when alert handling is the central task.
11. Use `$report-info-component-mapping` to bind KPIs, thresholds, trend datasets, anomaly rules, drilldowns, filters, and states.
12. Route chart, table, filter, and component-internal placement surfaces to `$report-chart-design-spec`, `$report-table-design-spec`, `$report-filter-control-design-spec`, and `$report-component-placement-spec` before implementation-ready decisions.
13. Run the anti-laziness execution gate from `$quality-gate-validation` before implementation-ready, repair, QA, or handoff conclusions. Keep `LAZY-*` findings visible until evidence closes them.
14. Use layout/template/component skills to keep the dashboard sparse, layered, and actionable, with reduced uniform card borders, limited KPI-card scope, inherited brand/product color hierarchy, and task-matched non-KPI components.
15. Run a visual density and first-viewport closure check before readiness: identify the primary status block, the first diagnostic evidence block, the action/detail block, and the trust/freshness cue; reject layouts where a block's allocated height is not justified by its content, where a chart has fewer than 5 meaningful marks but consumes a dominant half-screen without labels/target/average/explanation, or where lower modules appear as awkward clipped fragments instead of intentional section hints.
16. Verify first-viewport answer, filter linkage, drilldown, abnormal states, refresh/freshness, runtime screenshot/DOM geometry, and runnable URL when requested.

## Required Output

- Workflow mode, Preflight understanding matrix, dashboard user role, business state question, decision/action, time scope, and managed objects.
- Typed prototype story: one-sentence current-state value, user path, protagonist metric/object/risk, supporting evidence, and 30-second review path.
- Affected-surface to owning-skill routing, especially layout, chart, table, filter, component placement, design-system, template, and runtime QA.
- KPI dictionary: formula, unit, period, target, threshold, baseline, owner/source, freshness, display status.
- KPI scope boundary: which metrics are KPI cards, which metrics stay in charts/tables/text/lists, and why.
- Result-content boundary: visible status/conclusion/evidence/action content versus process artifacts moved to interaction contract, appendix/handoff, validation, or removal.
- First-viewport plan, trend/comparison/ranking plan, anomaly/detail/action plan.
- Drilldown chain: state -> split -> object -> detail/action.
- Visual density and first-viewport closure result: oversized/empty block scan, chart mark-to-area fit, text contrast/readability, next-section exposure, and evidence-backed repair decisions.
- Filter, refresh, permission, export/share, abnormal, empty/error/no-permission state requirements.
- Component/data/filter/control/interaction binding matrix.
- Anti-laziness execution result: evidence inspected, `LAZY-*` findings or explicit no-finding result, before/after proof for repairs, regression probe, and readiness impact.
- Template/custom shell decision, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not turn a dashboard into a dense detail report.
- Do not start layout or component selection until the current-state story, user path, protagonist metric/object/risk, and next drilldown/action are explicit or safely inferred.
- Do not mark ready when layout or QA uses any viewport other than `1920x1080`, when the page ignores `12 * N`/`3*2`/chart `4*3` constraints, or when supplemental metric口径/指标清单 or design-process artifacts are rendered as page modules without an explicit display requirement or business-value justification.
- Do not turn a KPI dashboard into a wall of KPI cards. The first viewport may have a bounded KPI summary, but trend, driver, anomaly, detail, action, and trust content must use task-matched component forms.
- Do not rely on uniform card borders to separate every module; use typography, spacing, section rhythm, dividers, and hierarchy before adding more card frames.
- Do not use green/red as the default dashboard language. Brand/product color and neutral hierarchy own identity and emphasis; status colors require documented semantics and non-color cues.
- Do not start implementation or repair from this workflow alone when affected chart/table/filter/placement surfaces require their specific front-door skills.
- Do not mark ready without a Preflight understanding start decision and evidence that required specialty skills were loaded or explicitly not needed.
- Do not mark ready when the first viewport is legal but visually empty, fragmented, or template-like. Large panels must carry a proportional amount of decision content or be resized/split; sparse charts must add labels, target/average lines, explanatory context, or share space with a relevant list/table.
- Do not accept component internals that stretch title, evidence, metric, and action to the far edges of a tall card when the business content is naturally compact. Re-group the content, reduce the block span, or add supporting evidence/action content.
- Do not accept a lower section that is accidentally clipped into the first viewport in a way that looks like miscalculated layout. Either complete the first viewport group, create an intentional section transition, or adjust row height/spans.
- Do not treat screenshot-free browser QA as enough for visual quality. Runtime evidence must include at least one screenshot plus DOM checks for text overflow, chart/canvas presence, and fixed-height clipping/overflow for the repaired viewport.
- Do not use unbounded gauges or decorative charts for variety.
- Do not show only result metrics when process or risk metrics are needed to explain status.
- Do not mark every fluctuation as an anomaly; thresholds and severity must be explicit.
- Do not claim readiness unless the first viewport answers the current-state question and drilldown destinations are defined.
- Do not mark ready when the anti-laziness gate is missing, `LAZY-*` findings remain open, or implementation/QA evidence is only generic screenshots, default states, or unchecked assumptions.
