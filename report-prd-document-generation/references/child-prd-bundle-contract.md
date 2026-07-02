# Child PRD Bundle Contract

Use this reference when the main PRD would become too large for humans if it carried every execution table. The child PRD layer keeps the main PRD readable while giving the unified implementation workflow exact execution input.

## Purpose

The parent/child structure has two audiences:

1. `prd/prd-main.md`: human/business document. It explains business intent, scope, target workflow, page previews, layout summary, metric/data/interaction summary, and gaps.
2. `prd/children/*` plus `prd/execution/*`: AI/workflow execution documents. They contain dense IDs, demand framing, design thought selection, storyline maps, mapping tables, layout/config rows, data/API contracts, interaction contracts, and validation gates.

Child PRDs refine execution only. They must not override the main PRD's business goal, scope, user, or acceptance boundary.

## Required Child PRD For Current Flow

`CHILD-PRD-PROTOTYPE` is required for every configurable report-development PRD.

| Child PRD ID | Required file | Purpose | Primary consumers |
| --- | --- | --- | --- |
| `CHILD-PRD-PROTOTYPE` | `prd/children/prd-child-prototype.md` | Convert the ordinary PRD into executable input for the unified implementation workflow and template configuration. | `report-prototype-implementation-workflow`, `report-prototype-template-management` |

The prototype child PRD must include these grouped contracts:

| Group | Must cover | Canonical reference |
| --- | --- | --- |
| Target and path | Target workflow, primary `RTP-*`, page preview references, answer atom map, result-content boundary. | `report-type-implementation-patterns.md`, `prototype-workflow-execution-map.md` |
| Demand and story | Demand framing, primary `DT-*`, storyline, `storyBlockMap`, block reflection, story value review, current-design override decisions. | `report-design-storyline-contract.md` |
| Template layout | `frameworkTemplateId`, `pageLayoutConfig`, `blockAreaConfigMap`, `componentSlotConfigMap`, `componentExampleConfigMap`, custom ECharts gaps, and block geometry/conclusion-card gates. | `template-layout-prd-contract.md` |
| Evidence trace | Consumed `SRC-*`, `READ-*`, `ENTRY-*`, and `GAP-*` rows that justify report type, story, layout, metric, API, interaction, permission, and QA decisions. | `targeted-reading-analysis-contract.md` |
| Metrics/data/interactions | Metric mounting, data/API contracts, global/local filters, pill behavior, interactions, permissions, export, and dynamic conclusion rules. | `metric-api-interaction-matrices.md` |
| Validation | Validation map, release expectations, and blocking/non-blocking gap status. | `prd-output-structure.md` |

## Conditional Child PRDs

Create these only when the user's current delivery scope includes the corresponding downstream stage. Otherwise list them in the main PRD registry as `not-in-current-scope`; do not generate empty boilerplate files.

| Child PRD ID | File | Create when |
| --- | --- | --- |
| `CHILD-PRD-FRONTEND` | `prd/children/prd-child-frontend.md` | The current request includes frontend integration, production route/component implementation, API adapter work, UI state, runtime QA, or production release handoff. |
| `CHILD-PRD-BACKEND` | `prd/children/prd-child-backend.md` | The current request includes backend/API/data-service implementation, source modeling, metric computation ownership, export service, permissions, cache, or SLA work. |
| `CHILD-PRD-TECHNICAL-SOLUTION` | `prd/children/prd-child-technical-solution.md` | The current request includes architecture, ADRs, environment, deployment, non-functional requirements, risk planning, or cross-stage implementation planning. |
| `CHILD-PRD-TESTING` | `prd/children/prd-child-testing.md` | The current request includes test design, acceptance execution, UAT, regression, API/data consistency checks, permission tests, export tests, or evidence requirements. |

## Main PRD Registry

`prd-main.md` must include a short child PRD registry:

| Stage | Child PRD | Status | Purpose | Update trigger |
| --- | --- | --- | --- | --- |
| Report development | `CHILD-PRD-PROTOTYPE` | `required` | Feeds `report-prototype-implementation-workflow` and template configuration. | Any page content, layout, component, metric, data/API, interaction, permission, or acceptance change. |
| Frontend | `CHILD-PRD-FRONTEND` | `not-in-current-scope` or `required` | Feeds production frontend integration when scoped. | Route, component, API adapter, state, permission, environment, or release change. |
| Backend | `CHILD-PRD-BACKEND` | `not-in-current-scope` or `required` | Feeds backend/API/data-service work when scoped. | Data source, metric formula, grain, API, permission, cache, export, or SLA change. |
| Technical solution | `CHILD-PRD-TECHNICAL-SOLUTION` | `not-in-current-scope` or `required` | Feeds architecture/planning when scoped. | System boundary, technology, environment, NFR, risk, or delivery milestone change. |
| Testing | `CHILD-PRD-TESTING` | `not-in-current-scope` or `required` | Feeds test design/acceptance when scoped. | Acceptance, interaction, API, permission, data, error state, export, or release scope change. |

## Child PRD Common Header

Every generated child PRD must start with:

| Field | Requirement |
| --- | --- |
| Child PRD ID | One `CHILD-PRD-*` id. |
| Stage | Report development, frontend, backend, technical solution, or testing. |
| Parent PRD | Main PRD name and version. |
| Parent sections consumed | Exact parent sections/IDs consumed. |
| Targeted reading rows consumed | `SRC-*`, `READ-*`, `ENTRY-*`, and `GAP-*` rows from `prd/execution/prd-targeted-reading-analysis.md` that the child PRD relies on, including demand/scenario/design-thought/storyline decisions. |
| Generated from parent version | Version or timestamp. |
| Sync status | `synced`, `draft`, `stale`, `blocked`, or `not-in-current-scope`. |
| Owner workflow | Downstream workflow/capability that consumes it. |
| Required upstream artifacts | Execution files or prototype outputs required before this child is usable. |
| Blocking gaps | `GAP-*` rows that block this stage. |

## Quality Gates

- Do not mark a report-development PRD ready when `prd/children/prd-child-prototype.md` is missing.
- Do not mark a child PRD ready when it does not state which targeted reading rows it consumes, or when it repeats source evidence without linking back to `prd/execution/prd-targeted-reading-analysis.md`.
- Do not mark `CHILD-PRD-PROTOTYPE` ready when any grouped contract above is missing, or when the canonical story, template, metric/data, filter/interaction, conclusion, or validation gates fail.
- Do not force downstream child PRDs into every report-development PRD. Generate conditional children only when they are in the current scope.
- Do not use a child PRD registry as a substitute for the required `CHILD-PRD-PROTOTYPE` body.
- Do not let child PRDs drift silently. If the parent PRD changes, update affected child PRDs and execution files in the same delivery or mark them `stale` with a concrete `GAP-*`.
- Do not place full child matrices in `prd-main.md`; keep them in child/execution files.
