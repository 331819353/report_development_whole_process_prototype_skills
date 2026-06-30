---
name: report-kpi-dashboard-prototype-workflow
description: "Run the specialized configurable report-development workflow for KPI dashboards, operating dashboards, cockpits, status overviews, target tracking, anomaly/risk monitoring, rankings, alerts, closure boards, and management views that answer what the current state is and what needs attention. Use only after report-prd-document-generation has converted the user's ordinary PRD into CHILD-PRD-PROTOTYPE and execution files. This workflow consumes the PRD and implements the selected bundled template through pageLayoutConfig, blockAreaConfigMap, componentSlotConfigMap, componentExampleConfigMap, optional customEChartExampleMap, and releaseValidation."
---

# KPI Dashboard Specialized Workflow

## Purpose

Use this workflow when the executable PRD says the report must answer "what is happening now, what is abnormal, and what action should happen next?"

## Input Contract

Require the PRD bundle produced by `report-prd-document-generation`, especially `prd/children/prd-child-prototype.md` and the execution files. `CHILD-PRD-PROTOTYPE` must name this workflow or an accepted mixed-report path with KPI dashboard/cockpit as the primary execution flow.

The PRD must already contain thinking output for page content, status hierarchy, first-viewport priority, metric/action path, visible/non-visible content decisions, and page preview.

## Template Reference Gate

Before implementation, read and apply these template references through `report-prototype-template-management`:

- `references/configuration-field-reference.md`
- `references/configurable-zero-to-one-flow.md`
- `references/custom-echarts-component-example-guide.md` only when `customEChartExampleMap` is present or no registered example fits.
- `references/business-report-project-implementation-overview.md` only when updating the bundled business-report demo.

Do not treat these as optional background. The workflow output must include `templateReferenceConsumption` with read status, applicable rules, exceptions, and any blocked items for the selected template.

## Workflow

1. Validate PRD readiness.
   Confirm target workflow, thinking output, KPI/cockpit path, `frameworkTemplateId`, page preview, metric mounting, data/API, interactions, permissions, and release validation rows. If missing, return to `report-prd-document-generation`.

2. Consume the dashboard story.
   Extract current state, target gap, anomaly/severity, responsible object, action route, trust/source, review/export, and closure signals.

3. Lock the template route.
   Use one bundled template. Do not introduce custom shell, custom page layout, custom block systems, static HTML, or blank Vue projects.
   Before editing an existing configured project, use `delivery-version-management` to read or initialize the root `DELIVERY_INDEX.md`; consume the last change history so this run understands what already changed.

4. Implement `pageLayoutConfig`.
   Preserve layout sections, layout rows, readable coordinates, first-viewport status plan, nav/page wiring, and block coordinates from the PRD.

5. Implement `blockAreaConfigMap`.
   Configure block title, pills, auxiliary metrics, unit, summary/description, source/trust, severity/action cues, and not-needed reasons.

6. Implement `componentSlotConfigMap` and `componentExampleConfigMap`.
   Fill every slot with registered component examples such as KPI cards, target progress, trend charts, ranking lists, risk/action lists, maps, tables, or conclusion cards.

7. Register custom ECharts examples when needed.
   Use `customEChartExampleMap` only when no registered component example fits. Implement and register the standalone component before binding it.

8. Bind data, filters, interactions, and conclusions.
   Consume metric dictionary, mounting matrix, data/API contract, filter ownership, drilldown/action behavior, export behavior, permission states, and `conclusionRuleMap`.

9. Validate and release.
   Run template validation/build, runtime checks, update `docs/prototype-data-summary.md`, and append the current change to `DELIVERY_INDEX.md` for runnable projects.

## Required Output

- Consumed PRD paths and start-gate status.
- Dashboard story consumed: current state, target gap, anomaly/severity, action, owner, trust/source, and review/export path.
- `frameworkTemplateId`.
- `pageLayoutConfig`.
- `blockAreaConfigMap`.
- `componentSlotConfigMap`.
- `componentExampleConfigMap`.
- Optional `customEChartExampleMap`.
- `templateReferenceConsumption`.
- Metric/data/API/interaction/conclusion-rule consumption evidence.
- Version index evidence: `DELIVERY_INDEX.md` read/initialized before edits and appended after edits with changed files, impacted pages/blocks/slots/components, data/filter/conclusion impact, validation, data-summary status, and next-change notes.
- Changed files, validation, URL or blocker, and release readiness.

## Quality Gate

- Do not start without the specialized PRD output.
- Do not decide dashboard content from scratch; consume the thinking output.
- Do not build a KPI wall without status interpretation, severity, and action path.
- Do not put block support content inside component examples.
- Do not use retired block-template deliverables, fixed block-size catalogs, component-content templates, static HTML, blank Vue projects, custom shells, or unregistered component fills.
- Do not mark release readiness when `DELIVERY_INDEX.md` was not read before editing or lacks a post-change entry for the current work.
- Do not mark release readiness when `docs/prototype-data-summary.md` is missing, generic, stale, or not current with the implemented data, filters, widgets, interactions, and conclusion rules.
