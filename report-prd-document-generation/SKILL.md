---
name: report-prd-document-generation
description: "Convert an ordinary user PRD, requirement document, meeting note, screenshot brief, metric list, or report idea into a specialized executable report-development PRD. Use when a report/dashboard/cockpit/analysis/detail/self-service requirement must be transformed before implementation so the unified report-prototype-implementation-workflow clearly knows requirement understanding, targeted source-material reading and analysis, report classification, RTP/PATH reading path, page layout, block areas, component slots, registered component examples, data/API, interactions, permissions, acceptance gaps, and how the report will be implemented through one of the bundled configurable templates. This skill does not develop code; its output is the required input for report-prototype-implementation-workflow."
---

# Report PRD Document Generation

## Purpose

Use this skill as the first step in report development. Its job is not to summarize a user's PRD; its job is to compile ordinary requirements into a specialized PRD that the unified implementation workflow can execute without guessing.

The fixed direction is:

```text
ordinary user PRD / evidence
  -> specialized executable report PRD
  -> report-prototype-implementation-workflow
  -> configurable template implementation
```

The specialized PRD must answer four implementation questions before any workflow starts:

- What content should the report show, and what reading path should the user follow?
- Which source materials were read for which decisions, and what must downstream stages understand before implementation?
- How should each page be laid out?
- Which content belongs in each layout block, standard area, and component slot?
- How will the content be implemented through the selected configurable template and registered component examples?

## Core Rules

- PRD comes before workflow. The unified implementation workflow consumes this PRD; it does not recreate requirement understanding, report classification, layout, component mapping, data/API, or interaction decisions internally.
- Use `report-prototype-design-thinking` during PRD generation to decide the page content, report story, decision path, and reading sequence. Thinking is part of PRD compilation, not a replacement for template configuration.
- Set the implementation target to `report-prototype-implementation-workflow` and choose exactly one primary `RTP-*` report path inside the PRD. Secondary `RTP-*` modules are allowed only when they support the primary path.
- Own the full intake, gap, and report-path decision inside this PRD skill. Extract facts, assumptions, missing gaps, attachment evidence, target report path, and target workflow here instead of routing to separate requirement-extraction or report-type skills.
- Before choosing a template or final `RTP-*` path, understand what the user wants to make, who will read it, and which scenario/action it supports; then select one primary `DT-*` design thought and adapt it into a complete storyline.
- Treat the current project design produced in this PRD pass as authoritative when it conflicts with older source material, generic defaults, or earlier PRD sections. Record the conflict as `ENTRY-*`, and normalize or block any part that conflicts with template hard constraints.
- Create a targeted reading and analysis contract for downstream stages. The PRD must say what source materials were read, what was concluded, what remains uncertain, and which prototype/technical/backend/frontend/testing artifacts must consume each conclusion.
- Do not route new work to retired generic report-design paths.
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
- Page block notation uses `M*N`, where `M` is the page-grid column span and `N` is the page-grid row span. Every visible top-level block must use `N >= 3`; source/requested `N < 3` blocks must be normalized to a legal block, merged, expressed as internal component/sub-block sizing, or marked as blockers. When `N < 4`, the component slot pattern must not be vertical/up-down.
- If a block contains a conclusion-card component, its block size must be `6 <= M <= 12` and `N >= 3`; its `summaryAreaConfig` / visible说明区 must be hidden or `null` with `notNeededReason=conclusionCardOwnsConclusion`; the conclusion card must occupy 1-3 leading component slots starting at the first slot position, and all remaining slots must contain non-conclusion evidence/cause/action/trust/detail components.
- Framework shell, page layout, block areas, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, permission, and shell state must use the bundled templates. Only interaction behavior and registered component examples may be self-developed.
- If no existing component example fits a slot, define a `customEChartExampleMap` row and require a registered standalone Vue/ECharts component example before the slot is considered filled.

## Reference Loading

Read these references before finalizing the PRD:

- `references/main-prd-minimal-contract.md`
- `references/readable-prd-main-body.md`
- `references/child-prd-bundle-contract.md`
- `references/prd-output-structure.md`
- `references/targeted-reading-analysis-contract.md`
- `references/targeted-reading-analysis-template.md`
- `references/report-design-storyline-contract.md`
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

2. Understand user demand and scenario.
   Use `references/report-design-storyline-contract.md` to answer what the user wants to make, who will read it, which usage scenario it serves, which decision/action it supports, managed object, time scope, output/reuse form, and blocking gaps.

3. Select the report design thought.
   Compare the requirement against the `DT-*` design thought catalog, choose one primary design thought, record rejected/optimized candidates, and map the selected thought to the primary `RTP-*` implementation path. If sources conflict, keep the current design direction and record `ENTRY-*`.

4. Create targeted source-material reading and analysis.
   Produce `prd/execution/prd-targeted-reading-analysis.md` from `references/targeted-reading-analysis-template.md` with source material inventory, targeted reading plan by stage, evidence-to-decision trace, implementation-critical reading notes, non-authority items, downstream consumption matrix, readiness gate, and `ENTRY-*` / `GAP-*` rows.

5. Determine the report classification and implementation target.
   Classify the requirement into one primary `RTP-*` path such as KPI dashboard, cockpit, analysis report, detail query, self-service analysis, risk monitor, closure board, or review/export report. Set the implementation target to `report-prototype-implementation-workflow`.

6. Run the thinking step inside PRD generation.
   Use `report-prototype-design-thinking` plus the selected `DT-*` design thought to decide page content, first-viewport priority, reading path, conclusion/evidence/action sequence, and which content should be visible versus moved to tooltip/detail/export/handoff.

7. Adapt the selected design thought into a complete storyline.
   Create `storylineMap`, then design blocks top-to-bottom and left-to-right with title, pill button area, conclusion/description area, slot count, slot size, slot information, metric/data binding, interaction, and reflection status.

8. Design filters and data before final layout.
   Define global filters, local filters, block-level pill switches, data objects, data grain, baselines/thresholds, freshness, permissions, quality/null rules, and mock-to-real replacement status. Connect every filter and data decision to affected metrics, APIs, conclusions, interactions, and story steps.

9. Run the story completeness and value review.
   Confirm the selected story is complete, valuable, filter-aware, data-feasible, and template-feasible. Adjust block order, block contents, filters, data design, or readiness status before final layout.

10. Write the reader-facing main PRD.
   Keep `prd/prd-main.md` concise: background, users, scope, selected design thought and report content summary, page preview, layout summary, metric/data/interaction summary, child/execution file registry, and readiness gaps.

11. Create `CHILD-PRD-PROTOTYPE`.
   This is the executable input for `report-prototype-implementation-workflow`. It must include target workflow, thinking output, report type path, page content map, page preview references, layout contract, block area plan, component slot plan, registered component example map, custom component gaps, data/API requirements, interaction behavior, conclusion rules, permissions, and release validation expectations.

12. Create execution files.
   At minimum, write:

   - `prd/execution/prd-targeted-reading-analysis.md`
   - `prd/execution/prd-template-execution-contract.md`
   - `prd/execution/prd-template-build-packet-seed.md`
   - `prd/execution/prd-metric-dictionary-and-mounting.md`
   - `prd/execution/prd-data-api-contract.md`
   - `prd/execution/prd-interaction-contract.md`
   - `prd/execution/prd-conclusion-rules.md`
   - `prd/execution/prd-workflow-execution-matrix.md`

13. Define the configurable template route.
   Select one `frameworkTemplateId`, write `pageLayoutConfig`, then define `blockAreaConfigMap`, `componentSlotConfigMap`, `componentExampleConfigMap`, optional `customEChartExampleMap`, and `releaseValidation`.

14. Fill component slots.
   Every declared slot must map to a registered `componentExampleId`, visual type, component slot size, data/metric binding, props/state contract, and source/registration evidence. Prose, visual type labels, inline widget objects, and unregistered Vue files are not valid slot fills.

15. Define metrics, data/API, interactions, and dynamic conclusions.
   Every displayed metric needs definition, formula, unit, source, refresh, null rule, mount location, data/API source, and interaction impact. Every visible conclusion or insight must bind to `conclusionRuleMap`; fixed normal-state business conclusions are invalid.

16. Create the PRD-to-workflow matrix.
    Map every PRD file and executable row, including targeted reading rows, to `report-prototype-implementation-workflow`, the PRD-owned component mapping contract, template-management capability, validation artifact, downstream stage, and blocker rule.

17. Validate local PRD bundles when files are available.
    Run `python3 report-prd-document-generation/scripts/validate_targeted_reading.py <bundle-root>` before marking the PRD bundle ready. Use `--strict-child` when downstream child PRDs are generated in the same bundle.

## Required Output

Return a fixed multi-file PRD bundle. If files cannot be written in the delivery channel, serialize each file as a separate block with the exact path heading.

Required for every report-development PRD:

- `prd/prd-main.md`
- `prd/children/prd-child-prototype.md`
- `prd/execution/prd-targeted-reading-analysis.md`
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

- Do not output a single Markdown PRD when the result must feed implementation, and do not hand off until `CHILD-PRD-PROTOTYPE` plus required execution files are ready or explicitly `draft` with non-blocking gaps.
- Do not mark the PRD ready when the target workflow is not `report-prototype-implementation-workflow`, or when retired report-design paths, fixed block catalogs, static HTML, blank Vue projects, custom shells, or unregistered component fills appear as active implementation routes.
- Do not mark the PRD ready when targeted reading is missing/generic, disconnected from `SRC-*` / `READ-*` / `ENTRY-*` / `GAP-*`, or fails `validate_targeted_reading.py` for a local bundle.
- Do not mark the PRD ready when demand framing, primary `DT-*`, storyline, story-to-block map, filter/data design, story value review, or block reflection is missing; the canonical requirements are in `references/report-design-storyline-contract.md`.
- Do not mark a template-backed PRD ready when `pageLayoutConfig`, `blockAreaConfigMap`, `componentSlotConfigMap`, `componentExampleConfigMap`, registered component examples, or the canonical block geometry/conclusion-card gates in `references/template-layout-prd-contract.md` are missing or failed.
- Do not let `prd-main.md` become the execution manual. Move dense layout rows, metric dictionaries, API fields, interaction maps, slot maps, validation rows, and implementation matrices into execution files or child PRDs.
- Do not mark a management-facing PRD ready without first-viewport answer, cause path, action path, trust/source, and review/export expectations.
- Do not leave required table cells blank. Use `TBD(GAP-*)` for unknown blockers and `none` only when truly not applicable.
