---
name: report-prototype-implementation-workflow
description: "Run the unified configurable report prototype implementation workflow for KPI dashboards, analysis reports, detail reports, self-service analysis, cockpits, risk monitors, closure boards, and review/export reports after report-prd-document-generation has produced CHILD-PRD-PROTOTYPE and execution files. This workflow consumes the PRD-owned RTP/PATH route, pageLayoutConfig, blockAreaConfigMap, componentSlotConfigMap, componentExampleConfigMap, customEChartExampleMap, data/API, interactions, conclusion rules, permissions, and release validation; it does not reinterpret requirements, choose report type, redesign layout, or remap components."
---

# Report Prototype Implementation Workflow

## Purpose

Use this workflow as the single execution path after `report-prd-document-generation`.

The fixed direction is:

```text
ordinary PRD / evidence
  -> report-prd-document-generation
  -> CHILD-PRD-PROTOTYPE + execution files
  -> report-prototype-implementation-workflow
  -> configured report project
```

This workflow implements the PRD. It does not decide report type, reading path, page structure, component mapping, metric definitions, data/API contracts, interactions, or conclusion rules. If those are missing or contradictory, return to `report-prd-document-generation`.

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

The PRD must already include target `RTP-*` path, `PATH-*` reading steps, answer atom map, result-content boundary, `frameworkTemplateId`, `pageLayoutConfig`, `blockAreaConfigMap`, `componentSlotConfigMap`, `componentExampleConfigMap`, data/API rows, filter/action rows, interaction rows, permissions, release validation rows, and `conclusionRuleMap` when generated summaries or insights exist.

## Template Reference Gate

Before implementation, read and apply these references through `report-prototype-template-management`:

- `references/configuration-field-reference.md`
- `references/configurable-zero-to-one-flow.md`
- `references/custom-echarts-component-example-guide.md` only when `customEChartExampleMap` is present or no registered example fits.
- `references/business-report-project-implementation-overview.md` only when updating the bundled business-report demo.

Return `templateReferenceConsumption` with read status, applicable rules, exceptions, and blocked items.

## Workflow

1. Validate PRD start gate.
   Confirm the PRD bundle, target workflow, `RTP-*` path, page preview, template route, component maps, data/API, interactions, permissions, conclusion rules, and release validation. If missing, stale, or contradictory, return to `report-prd-document-generation`.

2. Prepare the selected template.
   Use the PRD-selected bundled template and stack. Do not create custom shells, custom page layouts, custom block systems, static HTML, blank Vue projects, or unregistered slot fills. Before editing an existing configured project, use `delivery-version-management` to read or initialize `DELIVERY_INDEX.md`.

3. Materialize the PRD build packet.
   Implement the PRD rows exactly: `pageLayoutConfig`, `blockAreaConfigMap`, `componentSlotConfigMap`, `componentExampleConfigMap`, `filterSurfaceMap`, `toolbarActionMap`, `interactionBehaviorMap`, data/API or mock data configuration, permission/state behavior, and `conclusionRuleMap`.

4. Handle declared implementation exceptions.
   Only handle exceptions already declared by the PRD, such as missing registered component examples, `customEChartExampleMap`, template field incompatibility, or blocked template capability. Register standalone Vue/ECharts/table examples before binding them. Do not redesign the component plan inside this workflow.

5. Validate and release.
   Run template validation/build commands, preview URL when requested, runtime smoke checks, visual/runtime QA when in scope, update `docs/prototype-data-summary.md`, and append the current change to `DELIVERY_INDEX.md` for runnable projects.

## Required Output

- Consumed PRD files and start-gate status.
- Selected `RTP-*` path and `frameworkTemplateId`.
- Implemented `pageLayoutConfig`.
- Implemented `blockAreaConfigMap`.
- Implemented `componentSlotConfigMap`.
- Implemented `componentExampleConfigMap`.
- Optional `customEChartExampleMap` and registered files.
- Data/API, filter/action, interaction, permission, state, and `conclusionRuleMap` consumption evidence.
- `templateReferenceConsumption`.
- Version index evidence: `DELIVERY_INDEX.md` read/initialized before edits and appended after edits.
- `docs/prototype-data-summary.md` status.
- Changed files, validation commands, runtime URL or blocker, and release readiness.

## Quality Gate

- Do not start from ordinary user requirements; start from the specialized PRD output.
- Do not decide report type, page content, reading path, layout, component selection, metric formulas, data/API contracts, interactions, permissions, or conclusion rules from scratch.
- Do not patch missing PRD structure inside this workflow. Return to `report-prd-document-generation`.
- Do not use retired block-template deliverables, fixed block-size catalogs, component-content templates, static HTML, blank Vue projects, custom shells, custom page layout systems, or unregistered component fills.
- Do not mark release readiness when any visible slot lacks a registered `componentExampleId` or a declared registered custom example.
- Do not mark release readiness when generated visible conclusions lack `RULE-*` rows and data/API inputs.
- Do not mark release readiness when `DELIVERY_INDEX.md` was not read before editing or lacks a post-change entry for the current work.
- Do not mark release readiness when `docs/prototype-data-summary.md` is missing, generic, stale, or not current with the implemented data, filters, widgets, interactions, and conclusion rules.
