# Prototype Workflow Execution Map

Use this reference when finalizing the specialized PRD and when the unified implementation workflow starts from an existing PRD.

## Hard Rule

The PRD layer runs first. The implementation workflow consumes the PRD output.

```text
ordinary PRD
  -> report-prd-document-generation
  -> CHILD-PRD-PROTOTYPE + execution files
  -> report-prototype-implementation-workflow
  -> configurable template implementation
```

The active implementation workflow is:

- `report-prototype-implementation-workflow`

Generic report-design workflows are retired and must not be used as active downstream owners.

## What The Workflow Consumes

Before `report-prototype-implementation-workflow` starts implementation, the PRD bundle must provide:

- `prd/prd-main.md` with a readable business summary, target workflow, page previews, layout summary, metric/data/interaction summary, and gaps.
- `prd/children/prd-child-prototype.md` with the executable report-development contract.
- `prd/execution/prd-template-execution-contract.md`.
- `prd/execution/prd-template-build-packet-seed.md`.
- `prd/execution/prd-metric-dictionary-and-mounting.md`.
- `prd/execution/prd-data-api-contract.md`.
- `prd/execution/prd-interaction-contract.md`.
- `prd/execution/prd-conclusion-rules.md`.
- `prd/execution/prd-workflow-execution-matrix.md`.

## Required Execution Content

`CHILD-PRD-PROTOTYPE` and execution files must include:

- Target workflow `report-prototype-implementation-workflow` and report type path.
- Thinking output from `report-prototype-design-thinking`: page content, first-viewport priority, reading path, visible/non-visible content decisions, conclusion/evidence/action sequence.
- Page preview references.
- Selected `frameworkTemplateId`.
- `pageLayoutConfig`: `layoutSectionMap`, `layoutRows`, `layoutCoordinateMap`, page/nav wiring, block coordinates, and first-viewport plan.
- `blockAreaConfigMap`: per-block title, pill, auxiliary metric, unit, component area, summary/description, source/trust, and optional conclusion-rule binding.
- Answer atom map and result-content boundary: which business question each visible block/component answers, which content is visible result versus interaction-only/handoff/removed process artifact, and which `RTP-*` / `PATH-*` row it traces to.
- `componentSlotConfigMap`: slot count, slot pattern, slot coordinates, slot roles, slot sizes, required/optional state, and ownership.
- `componentExampleConfigMap`: one registered component example per declared slot, including `componentExampleId`, Vue file/component, visual type, props/config, data binding, state contract, and compatibility evidence.
- `customEChartExampleMap` for slots that need a newly registered ECharts component example.
- `filterSurfaceMap`, `toolbarActionMap`, and `interactionBehaviorMap`.
- Metric dictionary and metric mounting matrix.
- Data/API contract and mock/data-source fallback status.
- `conclusionRuleMap` for every generated summary, conclusion card, or analysis insight.
- Permission, export, loading, empty, error, and no-permission behavior.
- Release validation commands and acceptance evidence expectations.

## Start Gate

`report-prototype-implementation-workflow` may start only when:

- Target workflow is `report-prototype-implementation-workflow`.
- `CHILD-PRD-PROTOTYPE` is present and `synced` or `draft` with non-blocking gaps.
- Page content and reading path are decided by the thinking output or an explicitly accepted user design idea.
- The configurable template route is complete enough to implement: `frameworkTemplateId`, `pageLayoutConfig`, `blockAreaConfigMap`, `componentSlotConfigMap`, and `componentExampleConfigMap` are present for every retained page.
- PRD-owned component mapping rows are complete enough to implement: answer atom map, block-to-component map, component data map, filter/action map, conclusion rule map, and validation map are present or explicitly `draft` with non-blocking gaps.
- Any missing component has a `customEChartExampleMap` entry and registration plan.
- Every displayed metric is defined and mounted.
- Every visible conclusion has a `RULE-*` row in `conclusionRuleMap`.
- Every interaction has visible ownership and system response.
- The self-development exception map contains only registered component examples and interaction behavior.

If the start gate fails, return to `report-prd-document-generation` to complete intake, classification, gap handling, report-path selection, and executable PRD structure; do not patch missing PRD structure inside the implementation workflow.

## Area To Execution Map

| PRD area | Required execution | Primary owner |
| --- | --- | --- |
| Main summary and scope | Business goal, users, phase scope, target workflow, readiness gaps. | `report-prd-document-generation` |
| Thinking output | Page content, reading path, first viewport, conclusion/evidence/action sequence. | `report-prototype-design-thinking` through PRD generation |
| Target workflow | `report-prototype-implementation-workflow`. | `report-prd-document-generation` |
| Page layout | `pageLayoutConfig` with section map, layout rows, coordinates, nav/page wiring. | `report-prd-document-generation`, target workflow, `report-prototype-template-management` |
| Block areas | `blockAreaConfigMap` with standard block-area content and rules. | target workflow, `report-prototype-template-management` |
| Component slots | `componentSlotConfigMap` and `componentExampleConfigMap`. | `report-prd-document-generation`, target workflow, `report-prototype-template-management` |
| Custom components | `customEChartExampleMap`, registration path, props/data contract, validation. | target workflow, `report-prototype-template-management` |
| Metrics | Metric dictionary, formulas, units, source, null rules, mounting. | `report-prd-document-generation`, `metric-number-display-contract` |
| Data/API | Data objects, request/response, mock/data-source status, permissions, freshness. | `report-prd-document-generation`, target workflow |
| Interactions | Filters, pills, toolbar actions, drilldown/jump/drawer/modal/export/state behavior. | `report-prd-document-generation`, target workflow |
| Conclusions | `conclusionRuleMap` and generated conclusion bindings. | `report-prd-document-generation`, target workflow |
| Release | Validation commands, URL/screenshot/data evidence, readiness status. | target workflow |

## Ready Gate

`report-prototype-implementation-workflow` may mark report development ready only when:

- Every required PRD execution row is consumed or explicitly `deferred-out-of-scope`.
- `pageLayoutConfig`, `blockAreaConfigMap`, `componentSlotConfigMap`, and `componentExampleConfigMap` match the implemented template files.
- Every declared slot has a registered component example or newly registered custom ECharts example.
- Data, filters, widgets, generated conclusion rules, interactions, and permission states are reflected in `docs/prototype-data-summary.md` when a runnable project is produced.
- Validation/build/release commands have passed or the blocker is explicit.

Rows with `draft` or `blocked` status keep readiness `partial` or `blocked`.
