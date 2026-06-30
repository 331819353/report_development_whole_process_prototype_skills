---
name: report-detail-report-prototype-workflow
description: "Run the specialized configurable report-development workflow for detail reports, ledgers, transaction lists, record search, order/customer/inventory/invoice/payment/after-sales details, filtering, sorting, pagination, export, reconciliation, and traceability views that answer which exact record needs inspection. Use only after report-prd-document-generation has converted the user's ordinary PRD into CHILD-PRD-PROTOTYPE and execution files. This workflow consumes the PRD and implements the selected bundled template through pageLayoutConfig, blockAreaConfigMap, componentSlotConfigMap, componentExampleConfigMap, optional customEChartExampleMap, and releaseValidation."
---

# Detail Report Specialized Workflow

## Purpose

Use this workflow when the executable PRD says the report must answer "which record is it, how do I verify it, and what export/trace/action is needed?"

## Input Contract

Require `prd/children/prd-child-prototype.md` plus execution files from `report-prd-document-generation`. The child PRD must name this workflow or an accepted mixed-report path with detail report/query as the primary execution flow.

The PRD must already contain thinking output for query path, visible fields, filter model, row grain, detail/trace/export path, and page preview.

## Template Reference Gate

Before implementation, read and apply these template references through `report-prototype-template-management`:

- `references/configuration-field-reference.md`
- `references/configurable-zero-to-one-flow.md`
- `references/custom-echarts-component-example-guide.md` only when `customEChartExampleMap` is present or no registered example fits.
- `references/business-report-project-implementation-overview.md` only when updating the bundled business-report demo.

Do not treat these as optional background. The workflow output must include `templateReferenceConsumption` with read status, applicable rules, exceptions, and any blocked items for the selected template.

## Workflow

1. Validate PRD readiness.
   Confirm target workflow, thinking output, row grain, primary key, query/filter path, fields, permissions, export needs, `frameworkTemplateId`, and template config rows. If missing, return to PRD generation.

2. Consume the detail story.
   Extract record object, query scope, fields, filters, sorting, pagination, detail drawer/modal, source trace, export/audit, row actions, and trust/source requirements.

3. Lock the template route.
   Use one bundled template and preserve shell-owned filters, toolbar, export, navigation, permissions, and layout behavior.
   Before editing an existing configured project, use `delivery-version-management` to read or initialize the root `DELIVERY_INDEX.md`; consume the last change history so this run understands what already changed.

4. Implement `pageLayoutConfig`.
   Preserve table/search/filter/detail/support blocks, layout rows, coordinates, first-viewport query path, and nav/page wiring.

5. Implement `blockAreaConfigMap`.
   Configure block titles, pills, auxiliary counts, units, table/search summaries, source/trust notes, and optional support areas.

6. Implement `componentSlotConfigMap` and `componentExampleConfigMap`.
   Fill slots with registered detail table, complex table, filter summary, KPI, trend, action, trace, or source components. Wide/detail tables may use AntV S2 only when the PRD requires pivot/cross/wide analytical behavior.

7. Register custom examples when needed.
   Use `customEChartExampleMap` or a custom registered table/example only when no existing component example fits; register it before binding.

8. Bind data, interactions, and export.
   Consume data/API contract, row grain, field dictionary, filter/query params, pagination/sort, permission masking, detail drawer payload, source jump, export payload, loading/empty/error/no-permission states, and generated summaries.

9. Validate and release.
   Run template validation/build, runtime checks, table fit checks, update `docs/prototype-data-summary.md`, and append the current change to `DELIVERY_INDEX.md` for runnable projects.

## Required Output

- Consumed PRD paths and start-gate status.
- Detail query story consumed: record grain, primary key, filters, table fields, detail/trace/export/action path, and trust/source.
- `frameworkTemplateId`.
- `pageLayoutConfig`.
- `blockAreaConfigMap`.
- `componentSlotConfigMap`.
- `componentExampleConfigMap`.
- Optional `customEChartExampleMap`.
- `templateReferenceConsumption`.
- Data/API, filter/query, table/export, permission, and state evidence.
- Version index evidence: `DELIVERY_INDEX.md` read/initialized before edits and appended after edits with changed files, impacted pages/blocks/slots/components, data/filter/conclusion impact, validation, data-summary status, and next-change notes.
- Changed files, validation, URL or blocker, and release readiness.

## Quality Gate

- Do not start without the specialized PRD output.
- Do not decide fields and query path from scratch; consume the thinking output and executable PRD.
- Do not deliver only a field list; query efficiency, row identity, traceability, export, and permissions are part of the workflow.
- Do not put filters, controls, table summaries, units, or descriptions inside component examples when they belong to shell/block areas.
- Do not use retired block-template deliverables, fixed block-size catalogs, component-content templates, static HTML, blank Vue projects, custom shells, or unregistered component fills.
- Do not mark release readiness when `DELIVERY_INDEX.md` was not read before editing or lacks a post-change entry for the current work.
- Do not mark release readiness when `docs/prototype-data-summary.md` is missing, generic, stale, or not current with the implemented data, filters, widgets, interactions, and conclusion rules.
