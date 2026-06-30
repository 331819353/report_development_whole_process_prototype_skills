---
name: report-analysis-report-prototype-workflow
description: "Run the specialized configurable report-development workflow for analysis reports, topic reports, business review reports, monthly/weekly/quarterly reports, variance analysis, attribution analysis, conclusion-first reporting, evidence chains, and action recommendations. Use only after report-prd-document-generation has converted the user's ordinary PRD into CHILD-PRD-PROTOTYPE and execution files. This workflow consumes the PRD, implements the selected bundled template through pageLayoutConfig, blockAreaConfigMap, componentSlotConfigMap, componentExampleConfigMap, optional customEChartExampleMap, and releaseValidation, and does not recreate the PRD internally."
---

# Analysis Report Specialized Workflow

## Purpose

Use this workflow when the executable PRD says the report must answer "why did this happen, what evidence proves it, and what action follows?"

The workflow starts after PRD compilation:

```text
ordinary PRD
  -> report-prd-document-generation
  -> CHILD-PRD-PROTOTYPE
  -> report-analysis-report-prototype-workflow
  -> configured report project
```

## Input Contract

Before starting, require:

- `prd/prd-main.md`
- `prd/children/prd-child-prototype.md`
- `prd/execution/prd-template-execution-contract.md`
- `prd/execution/prd-template-build-packet-seed.md`
- `prd/execution/prd-metric-dictionary-and-mounting.md`
- `prd/execution/prd-data-api-contract.md`
- `prd/execution/prd-interaction-contract.md`
- `prd/execution/prd-conclusion-rules.md`
- `prd/execution/prd-workflow-execution-matrix.md`

`CHILD-PRD-PROTOTYPE` must name this workflow or an accepted mixed-report path with analysis report as the primary execution flow.

The PRD must already contain the thinking output: page content, conclusion/evidence/action reading path, first-viewport priority, visible/non-visible content decisions, and page preview.

## Required Capabilities

Use these capabilities as needed:

- `report-prd-document-generation` only to repair missing PRD structure.
- `report-info-component-mapping` for conclusion/evidence/action component mapping.
- `report-prototype-template-management` for configurable template implementation.
- `report-chart-design-spec`, `report-table-design-spec`, `report-filter-control-design-spec`, and `report-component-placement-spec` for specialized component decisions.
- `frontend-runtime-qa-validation` and `runtime-url-smoke-test` for runnable validation.

## Template Reference Gate

Before implementation, read and apply these template references through `report-prototype-template-management`:

- `references/configuration-field-reference.md`
- `references/configurable-zero-to-one-flow.md`
- `references/custom-echarts-component-example-guide.md` only when `customEChartExampleMap` is present or no registered example fits.
- `references/business-report-project-implementation-overview.md` only when updating the bundled business-report demo.

Do not treat these as optional background. The workflow output must include `templateReferenceConsumption` with read status, applicable rules, exceptions, and any blocked items for the selected template.

## Workflow

1. Validate the PRD start gate.
   Confirm the target workflow, thinking output, analysis report path, page preview, `frameworkTemplateId`, and template execution files. If missing, return to `report-prd-document-generation`.

2. Consume the analysis story.
   Extract conclusion, evidence, attribution, impact, action recommendation, appendix/detail path, meeting/export needs, and trust/source requirements from `CHILD-PRD-PROTOTYPE`.

3. Lock the configurable template route.
   Preserve the selected bundled template and stack. Do not create static HTML, blank Vue projects, custom shells, custom page layouts, custom block systems, or unregistered slot fills.
   Before editing an existing configured project, use `delivery-version-management` to read or initialize the root `DELIVERY_INDEX.md`; consume the last change history so this run understands what already changed.

4. Implement page layout.
   Materialize `pageLayoutConfig` exactly from the PRD: page/nav wiring, `layoutSectionMap`, `layoutRows`, `layoutCoordinateMap`, block coordinates, first-viewport plan, and section purpose.

5. Implement block areas.
   Materialize `blockAreaConfigMap`: title, pill controls, auxiliary metrics, unit, component area, summary/description, conclusion-rule binding, source/trust notes, and not-needed reasons for optional areas.

6. Implement component slots.
   Materialize `componentSlotConfigMap`, then fill `componentExampleConfigMap`. Every slot must map to a registered `componentExampleId`, Vue component/file, visual type, props/config, metric/data binding, state, and compatibility evidence.

7. Add custom components only through the registry.
   If no existing example fits a slot, create a `customEChartExampleMap` row, implement a standalone Vue/ECharts component example, export/register it, then bind its `componentExampleId`.

8. Implement data, interactions, and generated conclusions.
   Bind metrics, datasets, API/mock data, filters, toolbar actions, drilldowns, exports, permissions, and every `RULE-*` row needed by summary areas, conclusion cards, or analysis insight components.

9. Validate and release.
   Run the template validation/build commands, preview URL when requested, runtime smoke checks, update `docs/prototype-data-summary.md`, and append the current change to `DELIVERY_INDEX.md` for runnable projects.

## Required Output

Return:

- Consumed PRD paths and start-gate status.
- Analysis story consumed: conclusion, evidence, attribution, impact, action, trust/source, and export/review path.
- Selected `frameworkTemplateId`.
- Implemented `pageLayoutConfig`.
- Implemented `blockAreaConfigMap`.
- Implemented `componentSlotConfigMap`.
- Implemented `componentExampleConfigMap`.
- `customEChartExampleMap` rows and registered files when used.
- `templateReferenceConsumption`.
- Data/API, interaction, permission, and `conclusionRuleMap` consumption evidence.
- Version index evidence: `DELIVERY_INDEX.md` read/initialized before edits and appended after edits with changed files, impacted pages/blocks/slots/components, data/filter/conclusion impact, validation, data-summary status, and next-change notes.
- Changed files, validation commands, runtime URL or blocker, and release readiness.

## Quality Gate

- Do not start from ordinary user requirements; start from the specialized PRD output.
- Do not decide page content from scratch in this workflow. Consume the thinking output in `CHILD-PRD-PROTOTYPE`; if it is missing, return to PRD generation.
- Do not build a chart gallery with no conclusion/evidence/action path.
- Do not place titles, filters, pills, auxiliary metrics, units, descriptions, or summaries inside component examples.
- Do not render fixed normal-state business conclusions when a `RULE-*` generated conclusion is required.
- Do not use retired block-template deliverables, fixed block-size catalogs, component-content templates, static HTML, blank Vue projects, custom shells, or unregistered component fills.
- Do not mark release readiness when `DELIVERY_INDEX.md` was not read before editing or lacks a post-change entry for the current work.
- Do not mark release readiness when `docs/prototype-data-summary.md` is missing, generic, stale, or not current with the implemented data, filters, widgets, interactions, and conclusion rules.
