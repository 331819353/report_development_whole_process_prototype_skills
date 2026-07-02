# Component Mapping PRD Contract

Use this reference when finalizing `CHILD-PRD-PROTOTYPE` and the execution files. The PRD owns the final component mapping contract. `report-prototype-implementation-workflow` consumes this contract; it does not call a separate component-mapping workflow to decide it later.

## Ownership Rule

The PRD must decide and document:

- Which business question each visible block and component answers.
- Which `DT-*` design thought and `STORY-*` step each visible block and component supports.
- Which `RTP-*` / `PATH-*` row each block and component traces to.
- Which `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, or `MEET-*` gate row each management-facing component supports.
- Which content is visible business result, interaction-only contract, handoff/support material, or removed process artifact.
- Which component slots exist, which registered component example fills each slot, and what data/metric/interaction state each slot consumes.
- Which global filters, local filters, and block-level pills affect each block, slot, component, metric, conclusion rule, and interaction.
- Whether a conclusion-card component exists in a block, and if so whether it owns the block conclusion, hides the block说明区, starts in the first slot, uses only 1-3 leading slots, and leaves remaining slots for non-conclusion components.

## Required PRD Rows

At minimum, the PRD bundle must include these mapping rows across `prd/children/prd-child-prototype.md`, `prd/execution/prd-template-execution-contract.md`, and related execution files:

| Row group | Required fields |
| --- | --- |
| Answer atom map | `answerAtomId`, business question, role in selected design thought and reading path, visible/handoff/removed classification, source `DT-*`, `STORY-*`, `RTP-*` / `PATH-*`. |
| Block-to-component map | `blockCoordinate`, block purpose, storyline role, title rationale, pill-area decision, conclusion/description-area decision, `slotCoordinate`, slot role, slot size, slot information, component family, selected registered `componentExampleId`, visual type, state contract. |
| Component data map | dataset/API source, data design row, row grain, required fields, formula fields, metric dictionary link, null/error/loading/no-permission behavior. |
| Filter and action map | global/local filter owner, pill owner, affected block/slot, query/API params, refresh scope, conclusion recompute/stale behavior, drilldown/jump/drawer/modal/export response. |
| Conclusion rule map | `RULE-*`, display target, input metric/API fields, trigger state, output template, fallback, permission/masking rule, QA case. |
| Validation map | fit/readability risk, data/API proof need, interaction proof need, runtime validation or screenshot evidence expected. |

## Mapping Gates

- Do not leave component selection as prose. Every visible slot needs a registered `componentExampleId` or a `customEChartExampleMap` registration plan.
- Do not show design-process artifacts as result content by default. Binding matrices, metric lists, workflow gates, drilldown route lists, dataset catalogues, and implementation notes belong in execution files, tooltip/detail/dictionary/export metadata, or handoff docs unless explicitly requested as page content.
- Do not mark PRD ready when a metric-bearing component lacks formula, unit, grain, source, display precision, mount location, and update trigger.
- Do not mark PRD ready when filters, pills, toolbar actions, drilldowns, drawers, modals, exports, or generated conclusions are implied only in prose.
- Do not mark PRD ready when visible components cannot trace to a business question and a reading-path step.
- Do not mark PRD ready when visible components cannot trace to a `STORY-*` step, or when their slot size and slot information do not match the block design reflection.
- Do not mark PRD ready when filter/pill impacts on component data, conclusion rules, interaction state, and permissions are not mapped.
- Do not mark PRD ready when a conclusion-card component is mapped into a block that is narrower than 6 columns, wider than 12 columns, shorter than 3 rows, has visible block-level说明区, places the conclusion card after another slot, uses more than 3 conclusion-card slots, or fills remaining slots with additional conclusion cards.
- Do not mark PRD ready when an `N=3` block's slot map uses a vertical/up-down structure.

## Supporting Rule Sources

For difficult mapping decisions, consult the retained `report-info-component-mapping/references/` files as a rule library, especially:

- `00-analysis-perspective-card-taxonomy.md`
- `01-question-component-flow.md`
- `06-binding-implementation-contract.md`
- `08-generation-stability.md`
- `09-component-mapping-gates.md`
- `10-metric-drilldown-contract.md`

These files inform PRD generation. They do not own implementation routing.
