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

## Implementation Discipline

- Before editing source files, derive `blockImplementationInventory` from the PRD and Template Build Packet: page count, block count, each block coordinate, `M*N` occupancy, row/column span, slot count, slot coordinates, slot pattern, component examples, and readiness/gap status.
- Implement one block at a time. A block is not complete until title, pill area, summary/conclusion area, slot title, slot auxiliary information, slot chart/table/body area, interaction, filter binding, data/API binding, states, and validation evidence are configured or explicitly `none` with a reason.
- After each block, write a short `blockConfigurationReview`: what was configured, what PRD row it consumed, what was checked, what remains blocked, and whether later global filters or mock APIs must revisit the block.
- Configure global functions only after block-level ownership is clear. Global filters, toolbar actions, export, refresh, permissions, and shell state must bind to known pages/blocks/slots instead of broad prose.
- Mock API design must name performance expectations, data scope, request params, response envelope, response path, filter bindings, component consumers, cache/freshness, permission/error/no-permission behavior, and mock-to-real replacement status.
- Work step by step and repeatedly look back: after inventory, after each block, after global functions, after mock API wiring, and before release validation, reconcile implementation against the PRD rows and Template Build Packet.

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

2. Build the block implementation inventory.
   Count how many visible blocks must be implemented, where each block sits, how much space each block occupies, which slots it owns, and which PRD rows drive it. Do not start source edits until every visible block has an inventory row or a blocking `GAP-*`.

3. Prepare the selected template.
   Use the PRD-selected bundled template and stack. Do not create custom shells, custom page layouts, custom block systems, static HTML, blank Vue projects, or unregistered slot fills. Before editing an existing configured project, use `delivery-version-management` to read or initialize `DELIVERY_INDEX.md`.

4. Materialize the PRD build packet.
   Implement the PRD rows exactly: `pageLayoutConfig`, `blockAreaConfigMap`, `componentSlotConfigMap`, `componentExampleConfigMap`, data/API or mock data configuration, permission/state behavior, and `conclusionRuleMap`. Work block by block: finish a block's title area, pill area, summary/conclusion area, slots, slot titles, auxiliary information, chart/table/body binding, interactions, filters, data, states, and review before moving to the next block.

5. Configure global functions after block configuration.
   Implement `filterSurfaceMap`, `toolbarActionMap`, global refresh/export/fullscreen/share actions, permission scope, shell state, and cross-page behaviors only after their affected pages/blocks/slots are known. Revisit affected block rows and update filter/action/data bindings when a global function changes them.

6. Design and wire mock APIs.
   For every mock endpoint, define performance expectations, scope, request params, response fields/envelope, `responsePath`, filter/query binding, component consumers, cache/freshness, permission/error/no-permission behavior, and mock-to-real replacement row before considering the endpoint ready.

7. Handle declared implementation exceptions.
   Only handle exceptions already declared by the PRD, such as missing registered component examples, `customEChartExampleMap`, template field incompatibility, or blocked template capability. Register standalone Vue/ECharts/table examples before binding them. Do not redesign the component plan inside this workflow.

8. Validate and release.
   Run template validation/build commands, preview URL when requested, runtime smoke checks, visual/runtime QA when in scope, update `docs/prototype-data-summary.md` with Metric To Interface And Source Mapping, the Mock API To HTTP API Replacement Matrix, and backend method contract, and append the current change to `DELIVERY_INDEX.md` for runnable projects.

## Required Output

- Consumed PRD files and start-gate status.
- Selected `RTP-*` path and `frameworkTemplateId`.
- `blockImplementationInventory` with block counts, coordinates, occupancy, slot count/pattern, and readiness.
- Implemented `pageLayoutConfig`.
- Implemented `blockAreaConfigMap`.
- Implemented `componentSlotConfigMap`.
- Implemented `componentExampleConfigMap`.
- `blockConfigurationReview` showing per-block configuration completeness and reflection.
- Optional `customEChartExampleMap` and registered files.
- Data/API, filter/action, interaction, permission, state, and `conclusionRuleMap` consumption evidence.
- `templateReferenceConsumption`.
- Version index evidence: `DELIVERY_INDEX.md` read/initialized before edits and appended after edits.
- `docs/prototype-data-summary.md` status, including Metric To Interface And Source Mapping coverage for displayed metrics/conclusion variables and Mock API To HTTP API Replacement Matrix coverage for filters, summary/conclusion variables, component slots, interactions, and export/detail paths.
- Changed files, validation commands, runtime URL or blocker, and release readiness.

## Quality Gate

- Do not start from ordinary user requirements; start from the specialized PRD output.
- Do not decide report type, page content, reading path, layout, component selection, metric formulas, data/API contracts, interactions, permissions, or conclusion rules from scratch.
- Do not patch missing PRD structure inside this workflow. Return to `report-prd-document-generation`.
- Do not edit implementation files before `blockImplementationInventory` identifies every visible block and its occupancy, slots, component examples, data/API, interactions, and gaps.
- Do not mark a block complete until `blockConfigurationReview` confirms title, pill, summary/conclusion, slot title, slot auxiliary information, slot chart/table/body area, interaction, filter, data/API, states, and validation evidence.
- Do not configure global filters/actions as broad page prose; they must list affected pages, blocks, slots, params, reset/refresh behavior, stale handling, and permission/error/no-permission states.
- Do not mark mock APIs ready when performance, scope, request params, response envelope/path, filter bindings, output fields, cache/freshness, permissions, errors, or mock-to-real replacement rows are missing.
- Do not use retired block-template deliverables, fixed block-size catalogs, component-content templates, static HTML, blank Vue projects, custom shells, custom page layout systems, or unregistered component fills.
- Do not mark release readiness when any visible slot lacks a registered `componentExampleId` or a declared registered custom example.
- Do not mark release readiness when generated visible conclusions lack `RULE-*` rows and data/API inputs.
- Do not mark release readiness when `DELIVERY_INDEX.md` was not read before editing or lacks a post-change entry for the current work.
- Do not mark release readiness when `docs/prototype-data-summary.md` is missing, generic, stale, lacks Metric To Interface And Source Mapping coverage, lacks Mock API To HTTP API Replacement Matrix coverage, or is not current with the implemented data, filters, widgets, interactions, and conclusion rules.
