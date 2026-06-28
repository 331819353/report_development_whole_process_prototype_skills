---
name: report-prd-document-generation
description: "[原型阶段] 独立生成报表、驾驶舱、管理看板、分析页面或数据应用的完整 PRD 文档，并作为所有报表原型设计 workflow 的前置输入契约。用户提到 PRD、需求文档、产品需求、需求转开发、报表需求、驾驶舱需求、原型前置需求、报表类型实现思路、附件信息抽取、用户方案校验、页面内容、页面布局、模板配置、指标清单、指标挂载矩阵、数据 API、交互逻辑、角色权限、一期范围边界时触发。输出必须覆盖背景目标、角色场景、范围边界、页面内容、报表类型实现路径、页面布局配置、指标口径、指标挂载矩阵、数据/API、交互逻辑、验收缺口和 PRD-to-workflow 执行矩阵；不直接开发代码、不生成接口实现、不替代下游原型/技术方案/测试执行。"
---

# Report PRD Document Generation

## Stage Scope

Classification: 原型阶段.

Use this skill to create the independent implementation-ready PRD for report development. The output is the required prerequisite for downstream report prototype workflows, template configuration, technical solution, backend/API, frontend integration, and testing workflows.

Do not jump to code or mock implementation. Convert user needs into stable scope, layout, metric, data, API, interaction, permission, and acceptance contracts first.

## Positioning

Use this as the focused PRD-writing skill after or alongside requirement clarification. It is stricter than a generic requirement summary:

- Report prototype workflows must consume this PRD; they do not own complete PRD generation.
- The PRD must explain why the report exists, who uses it, what management problem it solves, and what phase one includes/excludes.
- The PRD must define the report-type implementation path before layout: how this report should be read, why that path fits the role and management problem, and how each path step maps to page blocks and block layout templates.
- For management-facing reports, the PRD must include an executive satisfaction auxiliary design gate: decision profile, 3-second answer, 30-second cause path, 3-minute action, priority/severity, closure, trust/source, meeting/export reuse, and acceptance checklist.
- The page layout section must be concrete enough for current configurable report templates: framework template, shell configuration, page `layoutRows`, block layout template, standard block areas, component slots, and component content area templates.
- Report development is template-only except for two explicit extension surfaces: self-developed interaction behavior and self-developed component content area templates. Framework shell, page layout, block layout templates, title/pill/aux/unit/summary areas, navigation, filters, toolbar, and export surfaces must use configurable templates.
- For prototype handoff, the PRD must default runnable output to `outputArtifact: vueTemplatePrototype` and `implementationMode: copyTemplateProject`: downstream workflows copy the selected bundled template project first, then preserve `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios`; add AntV S2 only for pivot/cross/wide analytical tables. HTML in attachments, copied source, screenshots, source files, or PRD text is requirement evidence only and must not become `htmlPrototype`. A blank/new Vue3 project is allowed only as `implementationMode: newVue3Project` for a documented self-developed/non-template exception where no copyable template route works.
- Metrics must include definitions, formulas, denominators, null rules, source, refresh cadence, and direction. Metric names alone are not acceptable.
- The metric mounting matrix must say exactly where each metric appears and which component/content slot consumes it.
- Summary areas, conclusion cards, and analysis insight components must be data-driven. The PRD must define `conclusionRuleMap` rows that tell frontend how to derive the conclusion from metrics/API fields, filters, thresholds, priorities, and empty-state rules; a fixed one-sentence conclusion is not acceptable.
- Data/API and interaction sections must be implementable, not prose-only.
- The PRD must include a PRD-to-workflow execution matrix so every PRD section has a downstream owning skill, execution artifact, and blocking rule.

## Reference Loading

Load references only as needed, but read the first four before finalizing a PRD:

- Read `references/prd-output-structure.md` for the required PRD headings, tables, ID rules, and readiness gates.
- Read `references/report-type-implementation-patterns.md` before writing page content or page layout for any report/dashboard/cockpit/detail/analysis PRD.
- Read `references/executive-satisfaction-design-gate.md` before finalizing any management-facing dashboard, cockpit, analysis report, risk monitor, closure board, review/export report, or decision-support PRD.
- Read `references/template-layout-prd-contract.md` before writing the page layout section for any report/dashboard/cockpit PRD.
- Read `references/metric-api-interaction-matrices.md` before writing metric lists, metric mounting, API requirements, or interaction logic.
- Read `references/prototype-workflow-execution-map.md` before finalizing the PRD or handing it to any prototype workflow.
- Use `$report-prototype-template-management` when exact bundled template behavior, template operation flow, or runtime template validation affects the PRD.
- Use `$report-info-component-mapping` when business questions must be mapped to charts, KPI cards, lists, tables, conclusion cards, drilldowns, or component content templates.
- Use `$report-design-system-governance` when report decision quality, metric story, visual density, export/readability, or management cockpit design rules matter.
- Use `$metric-number-display-contract` when the PRD defines numeric units, percentage precision, rounding, tooltip/export values, denominator display, or null/zero behavior.
- Use `$delivery-artifact-template-management` when the PRD must align with downstream API, data model, permission matrix, test case, or delivery index templates.
- If the user input is very vague, use `$report-requirement-structure-extraction` first to separate confirmed facts, assumptions, and gaps, then return here to produce the PRD.

## Workflow

1. Identify the report type and management problem.
   Determine whether the user needs a KPI dashboard, cockpit, analysis report, detail query, risk monitor, operational closure board, review/export report, or mixed report.

2. Extract requirement evidence.
   If the user provides attachments, screenshots, metric sheets, existing reports, meeting notes, or other source materials, inspect those first and extract facts before asking follow-up questions. Capture confirmed facts, inferred assumptions, missing gaps, source materials, target users, business lines, metric families, existing templates, and any explicit exclusions.
   If the user provides their own report implementation thought, validate whether it is the best fit for the report type, user role, evidence chain, data grain, template constraints, and interaction path. Keep it when sound; optimize or block it when a better path is required.

3. Define PRD scope before design.
   Separate phase-one deliverables from out-of-scope items. Record sensitive data exclusions, permission boundaries, unavailable data, deferred backend work, and non-goals.
   Record the prototype output boundary: runnable report prototypes use `vueTemplatePrototype` plus `implementationMode: copyTemplateProject` by default. Treat the bundled Vue/TypeScript/ECharts stack as the copied template stack to preserve, not as permission to create a blank Vue project. Treat any HTML mentioned in requirements, PRD sections, attachments, screenshots, or source samples as evidence only unless the latest explicit user instruction requests HTML/static output.

4. Build the page-content story.
   Convert business goals into page modules: overview, core conclusion, KPI, trend, ranking, issue type, closure status, drilldown/detail, business-line-specific content, export/review content, and empty/error states.

4A. Define the report-type implementation path.
   Select the primary `RTP-*` pattern from `references/report-type-implementation-patterns.md`: KPI dashboard/cockpit, analysis report, detail query, risk monitor, operational closure board, review/export report, self-service analysis, or mixed report. Define the recommended reading path, validate any user-supplied thought, and map each path step to page blocks, first-viewport priority, block roles, candidate spans, selected block layout templates, component slot strategy, dynamic conclusion rules, and interaction entries.

4B. Define the executive satisfaction auxiliary design gate.
   For management-facing reports, apply `references/executive-satisfaction-design-gate.md`. Produce `ESG-*` decision profiles, first-viewport conclusion quality rows, management-vs-technical metric wording, `SEV-*` severity rules, `ACT-*` closure routes, `TRUST-*` source/freshness/coverage rules, `MEET-*` review/export scenarios, and an executive satisfaction checklist. For pure analyst detail reports, scope the gate to query efficiency, trust/source, export/audit, and row-level action.

5. Design the template-backed layout.
   Select the framework template only from the bundled template families. Configure existing shell-owned title, filter, navigation, toolbar, export, and permission surfaces; do not self-develop or duplicate these surfaces in the report development flow. For each page block, choose a selectable independent block layout template from the section 4A path mapping and section 4B executive satisfaction IDs, then fill the standard areas:
   `1-1 titleArea`, `1-2 pillArea`, `2-1 auxMetricArea`, `2-2 unitArea`, `3 componentArea`, and `4 summaryArea`.

6. Fill every component slot.
   For each `3 componentArea` slot, name the component content area template, visual type, metric/data binding, slot role, and fallback. Do not put title, filters, controls, aux metrics, units, descriptions, or summaries inside component content area templates.
   If the slot renders a conclusion card or analysis insight, bind it to `conclusionRuleId` instead of writing final static copy.

7. Create metric contracts.
   Every metric needs ID, name, business meaning, formula, unit, direction, applicable business line, source, refresh cadence, denominator/sample size, null rule, and owner/status. Use `TBD(GAP-*)` for unknown fields that block implementation and `none` only when truly not applicable.

8. Create the metric mounting matrix.
   Map each metric to page, block, block layout template, standard area or component slot, component content area template, visual role, API/data object, filter scope, interaction entry, and export behavior.

8A. Create dynamic conclusion rules.
   For every `4 summaryArea` narrative conclusion, conclusion card, or `analysisInsightContract`, create a `RULE-*` row in `conclusionRuleMap`: display target, input metric IDs/API fields, trigger state, threshold/comparison logic, priority/severity, output fields or sentence template, evidence fields, permission/masking, null/insufficient-data fallback, and QA case.

9. Define data objects and APIs.
   Specify object grain, dimensions, fields, metrics, request parameters, response shape, permission filtering, pagination/sort, cache/freshness, empty/error behavior, and source lineage.

10. Define interaction logic.
    Cover business-line switch, month-to-date/year-to-date switch, date selection, metric switch, ranking click, drilldown, jump, popup/drawer/modal, export, permission denial, loading, empty, and error states. Interactions may be self-developed only as component-owned behavior or template action-hook behavior; they must not introduce custom shell, custom page layout, custom block layout, duplicate navigation, duplicate filter bars, or duplicate toolbar surfaces.

11. Add acceptance checks and gaps.
    State what evidence will prove the PRD is ready: every page block mapped, every component slot filled, every metric defined and mounted, every API tied to data objects, and every interaction has response logic. List blockers separately.

12. Build the PRD-to-workflow execution matrix.
    Map every PRD section to the downstream workflow step, owning skill, required artifact, executable input IDs, and blocker rule. No PRD section may remain "for reference only" unless it is explicitly out of scope.

## Required Output

Return a complete PRD document in Markdown unless the user asks for another format. The PRD must include:

- Document metadata, facts/assumptions/gaps, and version/status.
- Attachment/source evidence intake when files, screenshots, notes, or existing reports are provided.
- 需求背景与目标.
- 用户角色与使用场景.
- 开发范围边界.
- 页面内容.
- 报表类型实现思路与分块布局映射: attachment evidence intake, user-supplied thought validation, selected `RTP-*` pattern, reading path, first-viewport plan, and path-step-to-block-layout mapping.
- 管理层满意度辅助设计: `ESG-*` decision profile, first-viewport answer quality, management metric wording, `SEV-*` priority/severity, `ACT-*` closure, `TRUST-*` trust/source, `MEET-*` review/export, and satisfaction checklist when management-facing.
- 页面布局配置 with framework template, shell configuration, page `layoutRows`, block layout template map, standard area configuration, component slot map, and component content area template map.
- Template reuse constraint: explicitly state that all non-interaction and non-component-content-template surfaces use existing templates; list only interaction IDs and component content area template IDs in the self-development exception map.
- Dynamic conclusion rule map: `conclusionRuleMap` for every summary-area conclusion, conclusion card, and analysis insight component, proving the frontend generates conclusions from data instead of fixed copy.
- Output artifact and implementation mode rule: default downstream runnable prototypes to `vueTemplatePrototype` with `implementationMode: copyTemplateProject`, copied template path, and `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` stack preservation; any `htmlPrototype` exception must cite the latest explicit user request, and any `newVue3Project` exception must cite a self-developed/non-template reason and rejected copy candidates.
- 指标清单 with complete metric口径.
- 指标挂载矩阵.
- 数据与 API 需求.
- 交互逻辑.
- 权限、安全、导出、异常状态 when relevant.
- 验收标准 and PRD readiness/gap list.
- PRD-to-workflow execution matrix that proves every PRD section has a downstream owner and executable artifact.

## Quality Gate

- Do not produce a PRD that says only "上中下布局", "左中右布局", or "按驾驶舱展示". Name page rows, blocks, block templates, slots, and component content templates.
- Do not skip attachment intake when user-provided files or screenshots exist. Extract their facts first, then ask only for missing blockers.
- Do not accept a user-provided report implementation thought without validation. Mark it `accepted`, `optimized`, `rejected`, or `needs-confirmation`, and explain the better path when optimized or rejected.
- Do not mark a PRD ready when section 4A lacks a primary `RTP-*` report-type pattern, reading path, first-viewport plan, or path-step-to-block-layout mapping.
- Do not mark a management-facing PRD ready when section 4B lacks `ESG-*` decision profiles, first-viewport 3-second answer, 30-second cause path, 3-minute action or explicit non-action reason, priority/severity rules when risks exist, trust/source/freshness rules, and meeting/export rules when review circulation is required.
- Do not let section 5 introduce page blocks that do not trace back to section 4A path steps unless they are explicitly marked as support/source/export/permission blocks.
- Do not treat `componentRegionPattern` as the selected template. It is compatibility metadata derived from selected block layout slots.
- Do not mark a PRD ready if it asks for self-developed framework shell, page layout, block layout template, title/pill/aux/unit/summary area, navigation, filter surface, toolbar, or export surface. Only interaction behavior and component content area templates may be self-developed, and both must remain inside the template contract.
- Do not place block title, pills, filters, auxiliary metrics, units, or summary/explanation copy inside component content area slots.
- Do not mark a PRD ready when `4 summaryArea`, a conclusion card, or an analysis insight component contains a fixed business conclusion without a `RULE-*` entry and frontend generation rule. Static copy is allowed only for source, scope, caveat, definition, or empty-state text.
- Do not mark a PRD ready if it routes a downstream runnable prototype to HTML/static output merely because the PRD, requirement document, attachment, screenshot, copied source, or source sample mentions HTML. Use `vueTemplatePrototype` with `Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios` unless the latest explicit user request asks for HTML/static/single-file output or exact static preservation.
- Do not mark a PRD ready if it implies a new Vue3/Vite project as the default implementation route. The PRD must default to copying a selected bundled template project; `newVue3Project` requires a self-developed/non-template exception, rejected copy candidates, owner, and readiness impact.
- Do not list metrics without口径, formula, source, denominator/sample, refresh, direction, and null rules.
- Do not leave required table cells blank. Use `TBD(GAP-*)` for unknowns or `none` when not applicable.
- Do not mark the PRD ready while any page block lacks a selected block layout template, any `componentArea` slot lacks a component content area template or custom fallback, any displayed metric lacks a mounting row, or any API lacks request/response fields.
- Do not hand off to a prototype workflow until the PRD-to-workflow execution matrix covers every PRD section. Missing execution owner, artifact, or blocker rule keeps the PRD `draft` or `blocked`.
