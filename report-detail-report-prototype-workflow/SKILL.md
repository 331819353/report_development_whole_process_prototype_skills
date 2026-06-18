---
name: report-detail-report-prototype-workflow
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。运行明细报表类报表原型 workflow。用户提到明细报表、台账、流水、记录查询、订单/客户/库存/发票/回款/售后明细、筛选、排序、分页、导出、核对、追溯具体是哪一条时触发；不负责通用报表原型 workflow、自助分析、指标看板、分析报告、API 文档或后端实现。"
---

# Detail Report Prototype Workflow

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Positioning

Use this workflow when the prototype should query, verify, export, or trace exact business records. It is one of the five peer prototype workflows.

Core intent:

```text
明细报表用于核对“具体是哪一条”。
```

Prototype story gate: this workflow does not call `$report-prototype-design-thinking` by default. It carries its own typed story gate: reviewers should understand within 30 seconds how the user finds the exact record, verifies it, traces its source, exports it, or takes the required row-level action.

Prototype layout gate: design and QA target `1920x1080`; page layout uses `12 * N`, minimum `2*1`, default analytical/chart block `3*2`, ordinary chart max `4*3`, and component internals default to center-axis symmetry. Existing design ideas in requirement documents must be checked before landing. Metric口径/指标清单 are supplemental by default and stay in tooltip/detail/dictionary/handoff unless explicitly requested as visible page content.

## Child Skills

| Stage | Skill |
| --- | --- |
| Requirement intake | `$report-requirement-structure-extraction` |
| Report business type | `$report-type-design` |
| Component/data/filter/interaction mapping | `$report-info-component-mapping` |
| Page layout | `$report-visual-layout-design` |
| Runnable template assets | `$report-prototype-template-management` |
| Component visual details | `$report-component-style-design` |
| Table standards | `$report-table-design-spec` |
| Filter standards | `$report-filter-control-design-spec` |
| Component placement | `$report-component-placement-spec` |
| Design system | `$report-design-system-governance` |
| Quality gates | `$quality-gate-validation` |
| Runtime QA | `$frontend-runtime-qa-validation` |

## Workflow

1. Run `$quality-gate-validation` `references/preflight-understanding-gate.md` before design, repair, template edits, or code. Name affected surfaces, owning skills, hard constraints, missing evidence, and start decision.
2. Confirm mode: design proposal, implementation spec, runnable prototype, repair, or URL handoff.
3. Define the typed prototype story: target user, one-sentence lookup/verification value, protagonist record type, primary trace/export/action outcome, and required trust signal.
4. Define the detail-report user path: enter with task/context -> narrow with filters/search -> identify row -> inspect details/source -> export or act -> return with filter/page state preserved.
5. Define row grain, primary key, business record identity, source system, freshness, and trace target.
6. Design filters: high-frequency filters outside, low-frequency filters under "more filters"; declare default values, reset behavior, query limits, and saved filter needs.
7. Design table fields by order: identity -> time -> subject -> amount/quantity -> status -> owner -> operation.
8. Define table behavior: default sort, optional sort fields, pagination, page size, fixed header, frozen key columns, column resize, column configuration, return-state preservation.
9. Define export: current page/current filter/all matched, current columns/full fields, row limits, async export, watermark, audit log, approval, masking, and export failure state.
10. Define traceability: detail drawer, source-document jump, operation log, customer/order/product/invoice/payment links.
11. Use `$report-type-design` with `detail-query` as primary; add `reconciliation-traceability` only when matching differences or audit evidence is central.
12. Use `$report-info-component-mapping` to bind row fields, filters, sorting, pagination, export, detail drawer, source links, permissions, and states.
13. Route table, filter, and component-internal placement surfaces to `$report-table-design-spec`, `$report-filter-control-design-spec`, and `$report-component-placement-spec` before implementation-ready decisions.
14. Run the anti-laziness execution gate from `$quality-gate-validation` before implementation-ready, repair, QA, or handoff conclusions. Keep `LAZY-*` findings visible until evidence closes them.
15. Verify query/filter linkage, row identity, export scope, permissions/masking, timeout/over-limit states, and runnable URL when requested.

## Required Output

- Workflow mode, Preflight understanding matrix, users, query scenario, row grain, primary key, source system, freshness, and trace target.
- Typed prototype story: one-sentence lookup/verification value, user path, protagonist record type, trace/export/action outcome, trust signal, and 30-second review path.
- Affected-surface to owning-skill routing, especially table, filter, component placement, layout, design-system, template, and runtime QA.
- Filter plan: high-frequency filters, more filters, defaults, reset, saved schemes, query constraints.
- Table field plan: visible columns, hidden/optional columns, field source, format, width/alignment, status tags, sensitive handling.
- Table interaction plan: sorting, pagination, fixed/frozen behavior, column settings, detail drawer, source jumps, return-state preservation.
- Export plan: scope, fields, limits, async behavior, watermark, audit, approval, masking, failure state.
- Component/data/filter/control/interaction binding matrix.
- Anti-laziness execution result: evidence inspected, `LAZY-*` findings or explicit no-finding result, before/after proof for repairs, regression probe, and readiness impact.
- Template/custom shell decision, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not design only a field list; query efficiency and traceability are part of the prototype.
- Do not start layout or table design until the lookup/verification story, user path, row identity, trace/export/action outcome, and trust signal are explicit or safely inferred.
- Do not mark ready when layout or QA uses any viewport other than `1920x1080`, when the page ignores `12 * N`/`3*2`/chart `4*3` constraints, or when supplemental metric口径/指标清单 are rendered as page modules without an explicit display requirement.
- Do not start implementation or repair from this workflow alone when table/filter/placement surfaces require their specific front-door skills.
- Do not mark ready without a Preflight understanding start decision and evidence that required specialty skills were loaded or explicitly not needed.
- Do not put every available field into the first visible table.
- Do not miss export scope, row limit, permission, masking, or audit rules.
- Do not claim readiness without row grain, primary key, default sort, pagination, and exact filter binding.
- Do not ignore empty, timeout, no-permission, over-limit, and export-failure states.
- Do not mark ready when the anti-laziness gate is missing, `LAZY-*` findings remain open, or table/filter/export claims lack field-level evidence and non-default-state checks.
