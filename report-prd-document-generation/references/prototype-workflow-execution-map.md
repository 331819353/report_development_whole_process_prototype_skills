# Prototype Workflow Execution Map

Use this reference when finalizing the specialized PRD and when a specialized workflow starts from an existing PRD.

## Hard Rule

The PRD layer runs first. The specialized workflow consumes the PRD output.

```text
ordinary PRD
  -> report-prd-document-generation
  -> CHILD-PRD-PROTOTYPE + execution files
  -> selected specialized workflow
  -> configurable template implementation
```

The active specialized workflows are:

- `report-analysis-report-prototype-workflow`
- `report-kpi-dashboard-prototype-workflow`
- `report-detail-report-prototype-workflow`
- `report-self-service-analysis-prototype-workflow`

Generic report-design workflows are retired and must not be used as active downstream owners.

## What The Workflow Consumes

Before any specialized workflow starts implementation, the PRD bundle must provide:

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

- Target specialized workflow and report type path.
- Thinking output from `report-prototype-design-thinking`: page content, first-viewport priority, reading path, visible/non-visible content decisions, conclusion/evidence/action sequence.
- Page preview references.
- Selected `frameworkTemplateId`.
- `pageLayoutConfig`: `layoutSectionMap`, `layoutRows`, `layoutCoordinateMap`, page/nav wiring, block coordinates, and first-viewport plan.
- `blockAreaConfigMap`: per-block title, pill, auxiliary metric, unit, component area, summary/description, source/trust, and optional conclusion-rule binding.
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

A specialized workflow may start only when:

- Target workflow is one of the four active specialized workflows.
- `CHILD-PRD-PROTOTYPE` is present and `synced` or `draft` with non-blocking gaps.
- Page content and reading path are decided by the thinking output or an explicitly accepted user design idea.
- The configurable template route is complete enough to implement: `frameworkTemplateId`, `pageLayoutConfig`, `blockAreaConfigMap`, `componentSlotConfigMap`, and `componentExampleConfigMap` are present for every retained page.
- Any missing component has a `customEChartExampleMap` entry and registration plan.
- Every displayed metric is defined and mounted.
- Every visible conclusion has a `RULE-*` row in `conclusionRuleMap`.
- Every interaction has visible ownership and system response.
- The self-development exception map contains only registered component examples and interaction behavior.

If the start gate fails, return to `report-prd-document-generation` or `report-requirement-structure-extraction`; do not patch missing PRD structure inside the specialized workflow.

## Area To Execution Map

| PRD area | Required execution | Primary owner |
| --- | --- | --- |
| Main summary and scope | Business goal, users, phase scope, target workflow, readiness gaps. | `report-prd-document-generation` |
| Thinking output | Page content, reading path, first viewport, conclusion/evidence/action sequence. | `report-prototype-design-thinking` through PRD generation |
| Target workflow | One of the four specialized workflows. | `report-prd-document-generation` |
| Page layout | `pageLayoutConfig` with section map, layout rows, coordinates, nav/page wiring. | `report-prd-document-generation`, target workflow, `report-prototype-template-management` |
| Block areas | `blockAreaConfigMap` with standard block-area content and rules. | target workflow, `report-prototype-template-management` |
| Component slots | `componentSlotConfigMap` and `componentExampleConfigMap`. | `report-info-component-mapping`, target workflow, `report-prototype-template-management` |
| Custom components | `customEChartExampleMap`, registration path, props/data contract, validation. | target workflow, `report-prototype-template-management` |
| Metrics | Metric dictionary, formulas, units, source, null rules, mounting. | `report-info-component-mapping`, `metric-number-display-contract` |
| Data/API | Data objects, request/response, mock/data-source status, permissions, freshness. | `report-info-component-mapping`, target workflow |
| Interactions | Filters, pills, toolbar actions, drilldown/jump/drawer/modal/export/state behavior. | `report-info-component-mapping`, target workflow |
| Conclusions | `conclusionRuleMap` and generated conclusion bindings. | `report-info-component-mapping`, target workflow |
| Release | Validation commands, URL/screenshot/data evidence, readiness status. | target workflow |

## Ready Gate

A specialized workflow may mark report development ready only when:

- Every required PRD execution row is consumed or explicitly `deferred-out-of-scope`.
- `pageLayoutConfig`, `blockAreaConfigMap`, `componentSlotConfigMap`, and `componentExampleConfigMap` match the implemented template files.
- Every declared slot has a registered component example or newly registered custom ECharts example.
- Data, filters, widgets, generated conclusion rules, interactions, and permission states are reflected in `docs/prototype-data-summary.md` when a runnable project is produced.
- Validation/build/release commands have passed or the blocker is explicit.

Rows with `draft` or `blocked` status keep readiness `partial` or `blocked`.
