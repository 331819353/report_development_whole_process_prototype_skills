---
name: frontend-design-improvement-workflow
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于处理模糊的前端设计提升、页面优化、界面优化、视觉优化、UI优化、页面规范、组件规范、组件设计规范、前端设计规范、提高前端设计、让页面更专业/更好看/更统一/更像企业应用/更像报表系统等请求。它会按页面规范、组件规范、报表设计系统、海尔通用应用UI基线和运行QA进行路由；用户未明确是页面还是组件时触发。"
---

# Frontend Design Improvement Workflow

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this as the router for vague frontend design-improvement requests. It decides which design baseline and downstream skills should be used before anyone edits UI, writes a spec, or judges visual quality.

This skill does not replace implementation skills. It creates the improvement route, scope, quality criteria, and required references so page-level and component-level work do not drift apart.

For runnable report/page prototype improvement, preserve the configurable template route: selected bundled framework template, `pageLayoutConfig.layoutRows`, `blockAreaConfigMap`, declared component slots, registered component examples, release validation, and the `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` stack; add AntV S2 only for pivot/cross/wide analytical tables. HTML, Markdown, screenshots, copied source, PRD wording, or static samples are evidence only; they must not switch implementation to HTML/static output or a blank new Vue3 project.

For bundled-template report improvement, preserve the latest configurable route: template selection, `pageLayoutConfig.layoutRows`, `blockAreaConfigMap`, declared component slots, registered component examples, and `customEChartExampleMap` only when no existing example fits.

## Reference Map

| Need | Read |
| --- | --- |
| Trigger and routing rules | `references/01-trigger-routing.md` |
| Preflight understanding gate | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Design-improvement checklist | `references/02-design-improvement-checklist.md` |
| Report/dashboard design-system baseline | `report-design-system-governance` |
| Modern SaaS / BI Dashboard / UI Kit positive style contract | `report-design-system-governance` `references/12-modern-saas-bi-style-contract.md` when the user asks for this design language |
| Report page layout/page规范 | `report-visual-layout-design` |
| Report block size and viewport fit | `report-layout-size-constraint-spec` |
| Report component design/组件规范 | `report-component-design-spec` and `report-component-style-design` |
| Chart/table/filter-specific component standards | `report-chart-design-spec`, `report-table-design-spec`, `report-filter-control-design-spec` |
| Implementation-ready component placement | `report-component-placement-spec` |
| Configurable template flow | `report-prototype-template-management` `references/configurable-zero-to-one-flow.md` when the improvement affects a bundled-template report |
| Common enterprise app UI baseline | `$haier-enterprise-app-ui-design-spec` |
| Runtime visual/browser QA | `$frontend-runtime-qa-validation` |
| Configurable template implementation or repair | `report-prototype-template-management` |
| Cross-stage readiness | `$quality-gate-validation` |

## Workflow

1. Run the Preflight understanding gate before routing or editing. Name the requested improvement, evidence inventory, surface classification, affected surfaces, owning skills, hard constraints, missing evidence, and start decision.
2. Classify the surface: report/dashboard/BI/data-screen, common enterprise app, mixed app, or unknown.
3. Split the request into page-level, component-level, data/decision-readability, interaction/state, responsive, and runtime-QA work.
4. Load the correct baseline: Haier enterprise UI as the company-level application baseline for Haier/enterprise Web surfaces, including reports; report design system as the additional report-specific baseline for report/dashboard/BI/data-screen surfaces. Load both for Haier/enterprise report surfaces unless an explicit non-Haier/native/neutral exception exists.
5. If the requested language is modern SaaS Dashboard / BI Dashboard / UI Kit, load the positive style contract and route its page/card tokens, hierarchy, component-pileup, and chart-lightness checks to the owning skills.
   Regardless of the requested style language, carry the report visual constraints forward: reduce uniform card borders, do not KPI-ize every module, inherit brand/product color before status colors, lower default green/red dependence, use typography/spacing/dividers for separation, and design information flow rather than a generic dashboard collage.
6. Route page shell, navigation, grid, header/filter area, responsive, and overlap work to `report-visual-layout-design`; route block size, height budget, fixed-card clipping, and viewport fit to `report-layout-size-constraint-spec`.
7. Route reusable component standards to `report-component-design-spec`; route chart, table, and filter-specific standards to `report-chart-design-spec`, `report-table-design-spec`, and `report-filter-control-design-spec`.
8. Route implementation-ready x/y/slot/alignment work to `report-component-placement-spec`; route mixed single-component review/repair to `report-component-style-design`.
9. For runnable/report UI work, build a shared proof-obligation list before implementation or acceptance: KPI X/Y alignment and CSS cascade, template/component control ownership, `pageLayoutConfig` and `blockAreaConfigMap` trace when template-backed, `componentExampleConfigMap` binding evidence, fixed-height overflow/clipping, chart/table option evidence, contract-to-DOM/CSS/renderer mapping, modern BI page/card token evidence, component-pileup and chart-lightness proof, screenshot/crop coverage, and non-default state checks.
   Include selected `frameworkTemplateId`, template target path, `pageLayoutConfig`, `blockAreaConfigMap`, `componentExampleConfigMap`, and Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios stack proof in that list.
10. When code or a live URL exists, require runtime screenshot/DOM/interaction evidence through `$frontend-runtime-qa-validation` before marking visual work ready.
11. Run the anti-laziness execution gate from `$quality-gate-validation` before declaring an improvement plan, repair, QA, or readiness. Keep `LAZY-*` findings visible until source evidence, owner routing, and proof obligations are closed.
12. Return a short action plan or execute the implementation workflow when the user asked for changes, not only advice.

## Required Output

- Preflight understanding matrix, surface classification, and selected baseline.
- Baseline inheritance: Haier company UI baseline plus report-specific baseline when the surface is a Haier/enterprise report/dashboard.
- Requested design-language contract: modern SaaS / BI Dashboard / UI Kit source hierarchy, page/card tokens, hierarchy rules, chart-lightness rules, and related `VIS-*` findings when applicable.
- Report visual constraints: card-border reduction, KPI scope boundary, brand-vs-status color rule, red/green exception condition, and information-flow reading path.
- Page-level and component-level scope.
- Skills/references to load next, with why each is needed.
- Acceptance checklist: layout, component fit, data readability, states, responsive behavior, runtime evidence, proof obligations, and remaining gaps.
- Configurable-template checklist when applicable: selected framework template, `layoutRows`, block area rows, declared slots, component examples, custom ECharts exceptions, and release validation.
- Anti-laziness execution result: evidence inspected, `LAZY-*` findings or explicit no-finding result, before/after proof for repairs, and readiness impact.

## Quality Gate

- Do not treat "提高前端设计" as only color/radius/shadow polish.
- Do not treat "现代 SaaS / BI Dashboard / UI Kit" as a free-form mood. If requested, it must become a measurable style contract with light page surface, optional analytical surfaces, reduced card-border use, clear hierarchy, no component pileup, and lightweight charts.
- Do not improve a report/dashboard by adding the same card border/radius/shadow to every module. Use typography, spacing, dividers, and information flow first.
- Do not make every module a KPI card or metric tile. KPI scope must be bounded to primary decision metrics.
- Do not use red/green as the default "professional" palette. Brand/product color and neutral hierarchy must carry identity and emphasis; semantic colors require explicit status/business meaning.
- Do not call a page improved when it is still a dashboard collage without conclusion -> evidence -> driver -> detail/action -> trust/source flow.
- Do not route runnable prototype improvement to HTML/static output merely because the PRD, source sample, screenshot, or provided file mentions HTML. Keep the configurable template project flow and Vue/TypeScript/Element Plus/ECharts stack.
- Do not mark bundled-template improvement ready when the change cannot be traced through `pageLayoutConfig`, `blockAreaConfigMap`, declared slots, and registered component examples.
- Do not begin visual repair or implementation before the affected surfaces and owning skills are classified.
- Do not route report/dashboard design only to report-design skills when the page is a Haier/enterprise Web application; inherit Haier color, typography, spacing, base controls, states, and brand rules as well.
- Do not skip page规范 when the issue includes shell, navigation, grid, section order, filters, spacing, overlap, or responsive behavior.
- Do not skip组件规范 when the issue includes KPI cards, charts, tables, filters, summaries, dialogs, drawers, labels, tooltips, states, or local controls.
- Do not leave chart/table/filter/placement requests routed only to the broad component skill when a specific front-door skill exists.
- Do not mark a runnable UI ready without runtime evidence when code or URL is available.
- Do not mark design improvement ready when contracts or style rules are only described in prose/config and lack matching DOM/CSS/ECharts/S2/browser evidence. Missing KPI alignment, duplicate-control ownership, fixed-height overflow, chart option, or contract-to-implementation proof keeps readiness `partial`.
- Do not mark design improvement ready when the anti-laziness gate is missing, `LAZY-*` findings remain open, available screenshots/source/DOM evidence was not inspected, or the output is only generic polish language.
