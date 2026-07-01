---
name: report-prd-document-generation
description: "Convert an ordinary user PRD, requirement document, meeting note, screenshot brief, metric list, or report idea into a specialized executable report-development PRD. Use when a report/dashboard/cockpit/analysis/detail/self-service requirement must be transformed before implementation so the unified report-prototype-implementation-workflow clearly knows requirement understanding, report classification, RTP/PATH reading path, page layout, block areas, component slots, registered component examples, data/API, interactions, permissions, acceptance gaps, and how the report will be implemented through one of the bundled configurable templates. This skill does not develop code; its output is the required input for report-prototype-implementation-workflow."
---

# Report PRD Document Generation

## Purpose

Use this skill as the first step in report development. Its job is not to summarize a user's PRD; its job is to compile ordinary requirements into a specialized PRD that downstream workflow agents can execute without guessing.

The fixed direction is:

```text
ordinary user PRD / evidence
  -> specialized executable report PRD
  -> report-prototype-implementation-workflow
  -> configurable template implementation
```

The specialized PRD must answer four implementation questions before any workflow starts:

- What content should the report show, and what reading path should the user follow?
- How should each page be laid out?
- Which content belongs in each layout block, standard area, and component slot?
- How will the content be implemented through the selected configurable template and registered component examples?

## Core Rules

- PRD comes before workflow. The unified implementation workflow consumes this PRD; it does not recreate requirement understanding, report classification, layout, component mapping, data/API, or interaction decisions internally.
- Use `report-prototype-design-thinking` during PRD generation to decide the page content, report story, decision path, and reading sequence. Thinking is part of PRD compilation, not a replacement for template configuration.
- Set the downstream workflow to `report-prototype-implementation-workflow` and choose exactly one primary `RTP-*` report path inside the PRD. Secondary `RTP-*` modules are allowed only when they support the primary path.
- Own the full intake, gap, and report-path decision inside this PRD skill. Extract facts, assumptions, missing gaps, attachment evidence, target report path, and target workflow here instead of routing to separate requirement-extraction or report-type skills.
- Do not route new work to a generic report-design workflow; the generic workflow is retired.
- Do not route new work to retired historical requirement-intake or standalone report-type entry skills.
- Keep the reader-facing `prd/prd-main.md` short. Put executable matrices in `prd/execution/` and stage-specific details in `prd/children/`.
- `CHILD-PRD-PROTOTYPE` is required for this report-development flow. Other child PRDs are generated only when the current scope includes frontend integration, backend/API implementation, technical solution, or testing handoff.
- Use the current configurable template chain:

```text
frameworkTemplateId
  -> pageLayoutConfig
  -> blockAreaConfigMap
  -> componentSlotConfigMap
  -> componentExampleConfigMap
  -> customEChartExampleMap when needed
  -> releaseValidation
```

- Do not expose retired block-template catalogs as PRD deliverables. Page block size comes from `pageLayoutConfig.layoutRows`; block content and standard areas live in `blockAreaConfigMap`; slot ownership lives in `componentSlotConfigMap`; visual content is mounted through `componentExampleConfigMap`.
- Framework shell, page layout, block areas, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, permission, and shell state must use the bundled templates. Only interaction behavior and registered component examples may be self-developed.
- If no existing component example fits a slot, define a `customEChartExampleMap` row and require a registered standalone Vue/ECharts component example before the slot is considered filled.

## Reference Loading

Read these references before finalizing the PRD:

- `references/main-prd-minimal-contract.md`
- `references/readable-prd-main-body.md`
- `references/child-prd-bundle-contract.md`
- `references/prd-output-structure.md`
- `references/report-type-implementation-patterns.md`
- `references/component-mapping-prd-contract.md`
- `references/executive-satisfaction-design-gate.md` for management-facing reports
- `references/template-layout-prd-contract.md`
- `references/metric-api-interaction-matrices.md`
- `references/prototype-workflow-execution-map.md`
- `report-prototype-template-management/references/configurable-zero-to-one-flow.md`
- `report-prototype-template-management/references/configuration-field-reference.md`
- `report-prototype-template-management/references/custom-echarts-component-example-guide.md` when any slot may need a custom ECharts example
- `report-prototype-template-management/references/template-build-packet-contract.md` when the PRD will feed implementation

Use these capabilities as needed:

- `report-prototype-design-thinking` to decide page content and reading path.
- `report-prototype-template-management` for exact configurable template contracts.
- `metric-number-display-contract` for numeric display, precision, units, and null rules.

## Workflow

1. Intake the ordinary PRD and evidence.
   Extract confirmed facts, assumptions, missing gaps, source materials, report users, business scenarios, metric families, existing reports, screenshots, and explicit exclusions.

2. Determine the report classification and implementation target.
   Classify the requirement into one primary `RTP-*` path such as KPI dashboard, cockpit, analysis report, detail query, self-service analysis, risk monitor, closure board, or review/export report. Set the implementation target to `report-prototype-implementation-workflow`.

3. Run the thinking step inside PRD generation.
   Use `report-prototype-design-thinking` to decide page content, first-viewport priority, reading path, conclusion/evidence/action sequence, and which content should be visible versus moved to tooltip/detail/export/handoff.

4. Write the reader-facing main PRD.
   Keep `prd/prd-main.md` concise: background, users, scope, target workflow, report content summary, page preview, layout summary, metric/data/interaction summary, child/execution file registry, and readiness gaps.

5. Create `CHILD-PRD-PROTOTYPE`.
   This is the executable input for `report-prototype-implementation-workflow`. It must include target workflow, thinking output, report type path, page content map, page preview references, layout contract, block area plan, component slot plan, registered component example map, custom component gaps, data/API requirements, interaction behavior, conclusion rules, permissions, and release validation expectations.

6. Create execution files.
   At minimum, write:

   - `prd/execution/prd-template-execution-contract.md`
   - `prd/execution/prd-template-build-packet-seed.md`
   - `prd/execution/prd-metric-dictionary-and-mounting.md`
   - `prd/execution/prd-data-api-contract.md`
   - `prd/execution/prd-interaction-contract.md`
   - `prd/execution/prd-conclusion-rules.md`
   - `prd/execution/prd-workflow-execution-matrix.md`

7. Define the configurable template route.
   Select one `frameworkTemplateId`, write `pageLayoutConfig`, then define `blockAreaConfigMap`, `componentSlotConfigMap`, `componentExampleConfigMap`, optional `customEChartExampleMap`, and `releaseValidation`.

8. Fill component slots.
   Every declared slot must map to a registered `componentExampleId`, visual type, component slot size, data/metric binding, props/state contract, and source/registration evidence. Prose, visual type labels, inline widget objects, and unregistered Vue files are not valid slot fills.

9. Define metrics, data/API, interactions, and dynamic conclusions.
   Every displayed metric needs definition, formula, unit, source, refresh, null rule, mount location, data/API source, and interaction impact. Every visible conclusion or insight must bind to `conclusionRuleMap`; fixed normal-state business conclusions are invalid.

10. Create the PRD-to-workflow matrix.
    Map every PRD file and executable row to `report-prototype-implementation-workflow`, the PRD-owned component mapping contract, template-management capability, validation artifact, and blocker rule.

## Required Output

Return a fixed multi-file PRD bundle. If files cannot be written in the delivery channel, serialize each file as a separate block with the exact path heading.

Required for every report-development PRD:

- `prd/prd-main.md`
- `prd/children/prd-child-prototype.md`
- `prd/execution/prd-template-execution-contract.md`
- `prd/execution/prd-template-build-packet-seed.md`
- `prd/execution/prd-metric-dictionary-and-mounting.md`
- `prd/execution/prd-data-api-contract.md`
- `prd/execution/prd-interaction-contract.md`
- `prd/execution/prd-conclusion-rules.md`
- `prd/execution/prd-workflow-execution-matrix.md`

Conditional child PRDs:

- `prd/children/prd-child-frontend.md` only when frontend integration is in scope.
- `prd/children/prd-child-backend.md` only when backend/API implementation is in scope.
- `prd/children/prd-child-technical-solution.md` only when architecture or delivery planning is in scope.
- `prd/children/prd-child-testing.md` only when test design or acceptance execution is in scope.

## Quality Gate

- Do not hand off to `report-prototype-implementation-workflow` until `CHILD-PRD-PROTOTYPE` and the execution matrix are ready or explicitly `draft` with non-blocking gaps.
- Do not let `prd-main.md` become the execution manual. Move dense layout rows, metric dictionaries, API fields, interaction maps, slot maps, and validation rows into execution files or child PRDs.
- Do not output a single Markdown PRD when the result must feed implementation.
- Do not mark the PRD ready when the target workflow is not `report-prototype-implementation-workflow`.
- Do not mention a generic report-design workflow as an active downstream workflow.
- Do not mark the PRD ready when page content was not decided through the thinking step or an equivalent validated report story.
- Do not mark the PRD ready when `pageLayoutConfig`, `blockAreaConfigMap`, `componentSlotConfigMap`, or `componentExampleConfigMap` is missing for any retained page.
- Do not mark the PRD ready when any slot lacks a registered component example or a defined custom ECharts example to be registered.
- Do not use retired block-template deliverables, fixed block-size catalogs, component-content templates, static HTML, blank Vue projects, custom shells, custom page layout systems, or unregistered component fills as active implementation routes.
- Do not mark a management-facing PRD ready without first-viewport answer, cause path, action path, trust/source, and review/export expectations.
- Do not leave required table cells blank. Use `TBD(GAP-*)` for unknown blockers and `none` only when truly not applicable.
