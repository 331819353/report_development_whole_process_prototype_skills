# Scenario Routing Reference

Use this reference when scenario judgment, phase split, or downstream skill routing is needed.

## Scenario Types

These are routing labels for requirement transformation, not skill names. Use them to decide which reference to load and which downstream skill, if any, to call.

- `prototype-design`: report/dashboard/page prototype, data screen, visual analysis page, interaction demo, screenshot restoration.
- `technical-solution`: technical architecture, technology selection, implementation roadmap, API inventory, data model, table relationship, source mapping, permission strategy, transformation plan, runtime/NFR, production readiness.
- `data-modeling`: data model requirement transformation, business object modeling, conceptual/logical/physical model split, table-field mapping, metric grain, model relationship, source-to-service-to-view model design.
- `data-service-backend`: data-service design, backend service, Flask/API service, interface documentation, query-service chain, database/upstream access, auth, pagination, export, upload, cache, error handling, runtime readiness.
- `data-visualization-frontend`: frontend page, dashboard, report, API integration, response adapter, filters, component binding, runtime QA.
- `testing-integration`: test case design, frontend-backend integration, data consistency, filter linkage, SSO/auth flow, smoke test, evidence/defect report.
- `data-governance`: data source credibility, lineage, data quality, reconciliation, version,口径, masking, audit, retention.
- `business-workflow`: operational process, task/approval/notification flow, status machine, responsibility, SLA, closure criteria.
- `migration-optimization`: legacy system replacement, refactor, performance optimization, compatibility, phased rollout.

## Classification Rules

- Pick the scenario by the user's intended deliverable, not by isolated keywords.
- Provided file type is not the deliverable. HTML, Markdown/MD, screenshots, code, API docs, and data files are source materials to transform into requirements unless the user explicitly asks to output in that same format.
- If the user wants a visible page or demo, prefer `prototype-design` or `data-visualization-frontend`.
- If the user provides HTML/MD/source files for a report/page prototype, still route as `prototype-design` and hand off to the configurable template path: select a bundled template project, configure it, and preserve Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios.
- If the user asks how to build architecture/API/model/runtime artifacts before coding, prefer `technical-solution`.
- If the user asks for 数据模型, 数据建模, 表字段映射, 业务对象建模, 模型文件, 指标粒度, 明细/汇总模型, or source-to-response model transformation, prefer `data-modeling` or add it as a secondary scenario under `technical-solution`.
- If the user asks for 数据服务设计, API服务设计, 后端方案, or to implement service endpoints, prefer `data-service-backend`; use design mode unless the user explicitly asks for code/routes/runtime service.
- If the user asks to replace mock data, connect APIs, or fix runtime UI/API issues, prefer `data-visualization-frontend`.
- If the user asks how to verify,联调,自测,验收, or find defects, prefer `testing-integration`.
- If source systems,口径, lineage, permissions, or reconciliation dominate, add `data-governance`.
- If task assignment, approval, handling, or closure dominates, add `business-workflow`.
- If the request spans multiple phases, name the immediate phase first and list later phases as dependencies.

## Downstream Skill Routing

Recommend the smallest complete path.

- Use `report-self-service-analysis-prototype-workflow` when the user explicitly wants a self-service analysis prototype: dataset selection, field panel, drag/drop dimensions and metrics, flexible filters, chart switching, saved analysis, sharing, or export.
- Use `report-kpi-dashboard-prototype-workflow` when the user explicitly wants a KPI dashboard prototype: current-state monitoring, core KPI, target completion, YoY/MoM, trend, ranking, anomaly reminder, warning, or drilldown.
- Use `report-analysis-report-prototype-workflow` when the user explicitly wants an analysis report prototype: conclusion-first report, topic analysis, variance/cause diagnosis, attribution, evidence chain, impact, action recommendations, comments, PDF/PPT export, or historical reports.
- Use `report-detail-report-prototype-workflow` when the user explicitly wants a detail report prototype: row-level records, ledger/list, filters, sorting, pagination, export, reconciliation, verification, traceability, or source-document jump.
- Use `report-prd-document-generation` when the user provides an ordinary report PRD or business requirement that must be converted into a specialized executable report PRD before choosing one of the four specialized prototype workflows.
- Use `report-type-design` when the requirement is a business report and needs business type selection: status overview, analysis diagnosis, detail query, performance evaluation, review recap, anomaly monitoring, operational execution, or reconciliation traceability.
- Use `report-info-component-mapping`, `report-visual-layout-design`, `report-prototype-template-management`, and `report-component-style-design` for prototype/detail design after the requirement is structured.
- Use `report-delivery-pipeline-governance` when the deliverable is technical architecture, technology selection, implementation roadmap, production readiness, API inventory, data model files, data source mapping, or pending model gaps.
- Use `delivery-artifact-template-management` for endpoint inventory and request/response contracts.
- Use `gap-ledger-management` for table/model/source relationships and transformations.
- Use `data-model-requirement-playbook.md` in this directory before `gap-ledger-management` when vague business/data needs must first become a clear model requirement.
- Use `gap-ledger-management` when required source tables, fields,口径, or model metadata are missing.
- Use `report-delivery-pipeline-governance` when designing, documenting, implementing, or repairing a backend/data service.
- Use `delivery-artifact-template-management`, `quality-gate-validation`, `gap-ledger-management`, `gap-ledger-management`, and `quality-gate-validation` for backend subproblems.
- Use `report-prototype-template-management`, `frontend-runtime-qa-validation`, and `report-delivery-pipeline-governance` when integrating a frontend prototype/page with real APIs.
- Use `quality-gate-validation`, `gap-ledger-management`, `frontend-runtime-qa-validation`, `environment-profile-contract`, and `quality-gate-validation` for frontend subproblems.
- Use `quality-gate-validation` when the deliverable is联调,测试设计,验收, defect evidence, or end-to-end validation.
- Use `runtime-url-smoke-test`, `frontend-runtime-qa-validation`, `quality-gate-validation`, `report-delivery-pipeline-governance`, and SSO validation when auth is in scope for targeted testing.
