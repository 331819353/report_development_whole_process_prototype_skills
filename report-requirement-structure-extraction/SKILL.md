---
name: report-requirement-structure-extraction
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于在完整 PRD 生成前，把模糊想法、业务口述、截图、会议纪要、指标草表或零散资料拆成事实、假设、缺口和下游路由证据。用户提到需求分析、需求梳理、需求拆解、需求澄清、业务问题转开发需求、范围/对象/指标/数据源/权限/验收标准不清、下一步该进哪个流程时触发；完整 PRD/产品需求文档必须转交 `report-prd-document-generation`，本 skill 不直接产出完整 PRD、API 文档、代码或测试结果。"
---

# Requirement Transformation Analysis

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Core Positioning

Use this as the front-door skill for turning unclear or partial requirements into concrete development inputs. The output is not only a summary; it must become an actionable requirement package that downstream prototype, technical-solution, backend, frontend, data-service, visualization, testing, and integration workflows can use.

All user-provided materials are requirement evidence first. Messages, HTML files, Markdown/MD files, copied DOM/source snippets, screenshots, documents, code, config, data, API notes, and mock files must be converted into confirmed facts, inferred assumptions, missing gaps, affected requirement areas, and acceptance checks. Do not preserve the source file format as the default output format unless the user explicitly requests that format.

This skill answers:

- What real business, service, technical, data, permission, integration, or delivery problem the user needs solved.
- Which delivery scenario the request belongs to, and whether it should be split into phases.
- What each theme, business problem, feature, API, data object, page, flow, or test point requires.
- Which facts are confirmed, which items are inferred, and which gaps block reliable design or development.
- Which downstream skill/workflow should be used next and what handoff artifacts it needs.

Do not jump directly to implementation. First convert the request into a stable, traceable, scenario-specific development brief.

## Reference Loading Guide

Load references only when their scenario is relevant. Do not bulk-load every reference by default.

- Read `references/scenario-routing.md` when scenario judgment, phase split, or downstream skill routing is needed.
- Read `references/prototype-design-playbook.md` for prototypes, report/dashboard/page design, data screens, screenshot restoration, or implementation-ready UI specs.
- Read `references/technical-solution-playbook.md` for technical solutions, API inventory, data models, table relationships, data sources, transformations, and permission strategy.
- Read `references/data-model-requirement-playbook.md` for data model requirement transformation, including business objects, source fields, conceptual/logical/physical models, metric grain, table relationships, response/view models, and model gaps.
- Read `references/data-service-backend-playbook.md` for backend/data-service/API implementation requirements.
- Read `references/data-visualization-frontend-playbook.md` for frontend visualization, mock-to-API replacement, response adapters, filters, component binding, and runtime UI validation.
- Read `references/testing-integration-playbook.md` for test design, frontend-backend integration, smoke tests, SSO tests, data consistency, and defect evidence.
- Read `references/data-governance-permission-playbook.md` whenever data source credibility,口径, lineage, reconciliation, masking, audit, or permission design matters.
- Read `references/object-model-and-acceptance.md` when object fields, acceptance criteria, or implementation task lists need more detail than the core output skeleton.
- Read `references/output-skeleton-and-gates.md` before finalizing the requirement package, output structure, quality checklist, or avoid-list.
- Use `report-prd-document-generation` when the user asks for a complete PRD/产品需求文档, especially when the output must include report background, role scenes, scope boundary, page content, template-backed page layout, metric口径 list, metric mounting matrix, data/API requirements, and interaction logic.
- Use `$artifact-readability-standard` when the requirement package must be reviewed by humans and consumed by downstream AI/workflows.
- Use `report-delivery-pipeline-governance` when routing the requirement package into prototype, technical solution, backend, frontend, testing, release, or retest stages.
- Use `$metric-number-display-contract` when requirements include units, percentages, rates, precision, rounding, tooltip/export values, or numeric consistency expectations.
- For changes to an existing metric,口径, filter, permission, API, page, field, model, test case, or delivery document, record impact and blockers through `gap-ledger-management` and version alignment through `$delivery-version-management` before redesigning or implementing the affected scope.
- Route metric display and unit/precision concerns to `$metric-number-display-contract`, version concerns to `$delivery-version-management`, delivery chain concerns to `report-delivery-pipeline-governance`, environment/runtime concerns to `environment-profile-contract`, and unresolved data/permission/source concerns to `gap-ledger-management`.
- Use `$haier-enterprise-app-ui-design-spec` as the Haier/enterprise application UI baseline when the requirement includes forms, lists, detail pages, tables, navigation, dialogs, empty/error/feedback states, workbench pages, cross-platform app adaptation, or Haier/enterprise report applications.
- Use `report-design-system-governance` as the report development/design baseline when the requirement includes reports, dashboards, cockpits, BI, data screens, business analysis, detail queries, topic analysis, KPI, charts, tables, filters, metric口径, export, performance, or acceptance.

## Input Adaptation

Accept incomplete inputs and infer cautiously.

Supported input forms include one-sentence ideas, PRDs, meeting notes, screenshots, prototypes, HTML files/source, Markdown/MD documents, copied DOM snippets, static pages, metric lists, data dictionaries, database fields, source-system metadata, API documents, mock data, frontend/backend code, logs, deployment notes, SSO/security notes, and mixed Chinese/English terminology.

When HTML/MD/source artifacts are provided for a report/page prototype, extract page intent, visible content, metric names, dimensions, filters, controls, chart labels/config hints, copy, hierarchy, states, and style evidence into the requirement package. The default downstream runnable implementation is the configurable report project flow: select a bundled `frameworkTemplateId`, configure `pageLayoutConfig`, create `blockAreaConfigMap`, declare component slots, bind registered component examples, and preserve Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios. HTML/source format is evidence, not an implementation route; blank/new Vue3 projects and static shells are outside this configurable report flow.

When information is missing:

- Produce a best-effort structure instead of blocking.
- Separate confirmed facts, inferred assumptions, and missing questions.
- Ask follow-up questions only when a missing answer changes the main scenario, user, data source, permission model, or delivery boundary.
- Prefer explicit uncertainty over silent invention.

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Universal Workflow

Use this sequence for every requirement transformation:

1. Identify the primary deliverable.
   State whether the user likely expects a requirement brief, prototype spec, technical solution, API list, data model, backend plan, frontend integration plan, test plan, or executable implementation.

   If the request modifies existing delivered or in-progress artifacts, classify it as change management first, record impacted artifacts through `gap-ledger-management`, and align versions through `$delivery-version-management` before redesigning or implementing the affected scope.

2. Judge the scenario.
   Pick one primary scenario and optional secondary scenarios. If scenario choice is not obvious, read `references/scenario-routing.md`.

3. Classify UI/design baseline when the deliverable contains pages.
   Mark the requirement as Haier/enterprise app, report/dashboard, or mixed. For Haier/enterprise report pages, route both the inherited Haier application baseline and report-specific baseline into downstream prototype, technical solution, frontend, testing, and acceptance work even when the user did not say "规范".

4. Extract facts, assumptions, and missing inputs.
   Facts come from the user or provided files. Assumptions are safe inferences. Missing inputs are items that may affect scope, data, permission, acceptance, or delivery.

   Create a source-material requirement matrix whenever the user provides files or source content. For each artifact, record artifact type, useful evidence, confirmed facts, inferred assumptions, gaps, affected requirement areas, downstream owner, and whether the artifact explicitly controls output format. Mark HTML/MD/source materials as requirement evidence by default.

   If the input is a requirement document that already contains a design idea, page structure, component plan, chart choice, or layout sketch, first classify it as an existing design proposal and run a reasonableness check before downstream prototype work. Do not treat existing design prose as automatically accepted implementation guidance when it conflicts with the business story, user path, `1920x1080` / `12 * N` layout rules, chart sizing, or metric-display boundaries.

5. Identify users, stakeholders, and usage moments.
   Capture target users, maintainers, data owners, reviewers, approvers, external systems, and when/why they use the delivered result.

6. Convert goals into problem statements.
   Split vague goals into `theme -> business/technical problem -> expected decision/action/result`.

7. Define scope and boundaries.
   List in-scope capabilities, out-of-scope items, phase boundaries, dependencies, and delivery order.

8. Build the object model.
   Identify business objects, data objects, system objects, UI objects, process objects, and test objects. Capture grain, owner, source, status, relationship, lifecycle, permission, and acceptance when relevant.

9. Load the relevant scenario playbook.
   Use only the reference files that match the selected scenario and requested deliverable.

   Metric definitions, metric dictionaries, calculation口径, indicator lists, drilldown-chain lists, component mappings, binding matrices, workflow/gate checklists, dataset field catalogues, and implementation notes in requirement documents are supplemental evidence by default. Use them to build the metric/data contract, tooltip/detail/dictionary payload, interaction route, validation criteria, and downstream handoff. Do not create visible report-page cards,口径说明 blocks, indicator-list modules, drilldown-chain blocks, or process-explanation modules from them unless the requirement explicitly asks to display that documentation on the page or the content passes the business-value test as conclusion, evidence, trust/source, or action content.

10. Convert to tasks and acceptance criteria.
   Write requirements as capability statements with measurable acceptance criteria, data/API dependencies, permission behavior, error/empty states, and test evidence.

11. Route to downstream skills.
    Recommend the next skill/workflow only after the requirement package is clear enough for that skill to act.

    Include governance routes when relevant: `$metric-number-display-contract` for numeric display and unit/precision rules, `gap-ledger-management` for unresolved metric/source/permission/data trust gaps, `$delivery-version-management` for artifact versions, `environment-profile-contract` for runtime profile concerns, and `report-delivery-pipeline-governance` for delivery-chain handoff blockers.
    Use `report-delivery-pipeline-governance` to state next-stage entry conditions and handoff blockers.
