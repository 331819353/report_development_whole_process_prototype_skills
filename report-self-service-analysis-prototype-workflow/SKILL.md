---
name: report-self-service-analysis-prototype-workflow
description: "Run the specialized configurable report-development workflow for self-service analysis, BI workbenches, field/dimension/metric selection, configurable filters, pivot/cross analysis, saved personal reports, shared analysis, chart/table switching, and exploratory analysis experiences. Use only after report-prd-document-generation has converted the user's ordinary PRD into CHILD-PRD-PROTOTYPE and execution files. This workflow consumes the PRD and implements the selected bundled template through pageLayoutConfig, blockAreaConfigMap, componentSlotConfigMap, componentExampleConfigMap, optional customEChartExampleMap, and releaseValidation."
---

# Self-Service Analysis Specialized Workflow

## Purpose

Use this workflow when the executable PRD says the user must configure an analysis question, choose fields/metrics, inspect generated results, and save/share/export reusable analysis.

## Input Contract

Require the PRD bundle produced by `report-prd-document-generation`. `CHILD-PRD-PROTOTYPE` must name this workflow or an accepted mixed-report path with self-service analysis as the primary execution flow.

The PRD must already contain thinking output for analysis model, field panel, configuration path, result view, save/share/export reuse, trust/permission boundary, and page preview.

## Template Reference Gate

Before implementation, read and apply these template references through `report-prototype-template-management`:

- `references/configuration-field-reference.md`
- `references/configurable-zero-to-one-flow.md`
- `references/custom-echarts-component-example-guide.md` only when `customEChartExampleMap` is present or no registered example fits.
- `references/business-report-project-implementation-overview.md` only when updating the bundled business-report demo.

Do not treat these as optional background. The workflow output must include `templateReferenceConsumption` with read status, applicable rules, exceptions, and any blocked items for the selected template.

## Workflow

1. Validate PRD readiness.
   Confirm target workflow, thinking output, dataset/field model, analysis operations, result components, permissions, `frameworkTemplateId`, and template config rows. If missing, return to PRD generation.

2. Consume the self-service story.
   Extract starting question, dataset choices, dimension/metric fields, filter/config zones, chart/table switch, pivot/cross behavior, invalid-combination states, result interpretation, save/share/export, and reuse path.

3. Lock the template route.
   Use one bundled template. Do not introduce a custom BI shell or blank project unless explicitly out of scope for this report-template flow.
   Before editing an existing configured project, use `delivery-version-management` to read or initialize the root `DELIVERY_INDEX.md`; consume the last change history so this run understands what already changed.

4. Implement `pageLayoutConfig`.
   Preserve field/config/result/detail/support blocks, layout rows, coordinates, first-viewport workbench path, and nav/page wiring.

5. Implement `blockAreaConfigMap`.
   Configure titles, pills, auxiliary info, units, result summaries, help/source notes, permission notices, and not-needed reasons.

6. Implement `componentSlotConfigMap` and `componentExampleConfigMap`.
   Fill slots with registered field panels, result charts, pivot/cross tables, detail tables, saved-analysis lists, action components, or conclusion/result summary components. Use AntV S2 only for pivot/cross/wide analytical tables.

7. Register custom examples when needed.
   Use `customEChartExampleMap` only for missing chart/result components, then implement and register the standalone component before binding.

8. Bind data, interactions, and generated result summaries.
   Consume field metadata, allowed dimension/metric combinations, filter params, result data contract, drilldown/detail payloads, save/share/export behavior, permission states, and `conclusionRuleMap` when generated summaries exist.

9. Validate and release.
   Run template validation/build, runtime checks, invalid-combination state checks, update `docs/prototype-data-summary.md`, and append the current change to `DELIVERY_INDEX.md` for runnable projects.

## Required Output

- Consumed PRD paths and start-gate status.
- Self-service story consumed: starting question, field model, configuration path, result interpretation, reuse/export path, and trust/permission boundary.
- `frameworkTemplateId`.
- `pageLayoutConfig`.
- `blockAreaConfigMap`.
- `componentSlotConfigMap`.
- `componentExampleConfigMap`.
- Optional `customEChartExampleMap`.
- `templateReferenceConsumption`.
- Data/API, field metadata, interaction, permission, and generated-summary evidence.
- Version index evidence: `DELIVERY_INDEX.md` read/initialized before edits and appended after edits with changed files, impacted pages/blocks/slots/components, data/filter/conclusion impact, validation, data-summary status, and next-change notes.
- Changed files, validation, URL or blocker, and release readiness.

## Quality Gate

- Do not start without the specialized PRD output.
- Do not decide the analysis model from scratch; consume the thinking output.
- Do not hide the field/config/result path behind decorative charts.
- Do not allow impossible field combinations without an invalid-state contract.
- Do not put field-panel titles, filters, controls, summaries, or help text inside component examples when they belong to shell/block areas.
- Do not use retired block-template deliverables, fixed block-size catalogs, component-content templates, static HTML, blank Vue projects, custom shells, or unregistered component fills.
- Do not mark release readiness when `DELIVERY_INDEX.md` was not read before editing or lacks a post-change entry for the current work.
- Do not mark release readiness when `docs/prototype-data-summary.md` is missing, generic, stale, or not current with the implemented data, filters, widgets, interactions, and conclusion rules.
