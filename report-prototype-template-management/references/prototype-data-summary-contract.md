# Prototype Data Summary Contract

Use this contract after a runnable prototype has data, filters, widgets, and interactions configured. The output is a backend-facing Markdown document inside the copied prototype project:

```text
docs/prototype-data-summary.md
```

The document is required for prototype handoff to technical solution, backend/data-service design, frontend integration, and testing. It explains what data the prototype used, where the data lives, how widgets consume it, and what backend APIs or models should provide later.

## Required Sections

1. `# Prototype Data Summary`
   - Prototype name, route/page ids, source PRD path or version when known, generated timestamp, author/agent, readiness value.
   - State whether the prototype currently uses JSON fixture, API binding, custom resolver, mixed mode, or retained static display data.
2. `## Source Files And Data Modes`
   - List `src/data/dashboard.dataset.json`, `src/config/dashboard.config.ts`, `src/dataSources/registry.ts`, widget components, action hooks, and any other file that owns data, filters, API binding, generated conclusion rules, or interaction payloads.
   - For every file, state purpose, mode, changed or unchanged, and whether a code ledger sidecar exists when it was edited.
3. `## Dataset Catalog`
   - For every dataset or API-backed object, record dataset id, business object, row grain, primary key, dimensions, measures, enums, time fields, row count/sample coverage, source authority, refresh/freshness, permission scope, and empty/no-permission behavior.
   - Include mock sample shape, not large full datasets.
4. `## Field Dictionary`
   - Record field name, label, type, unit, formula/derivation, enum values, nullable rule, source column/API field, masking rule, and example value.
5. `## Metric And Conclusion Inputs`
   - Record every displayed metric, formula, numerator/denominator, unit, direction, data source, filter scope, null/zero denominator rule, and display precision.
   - Record every `conclusionRuleId` used by `summaryAreaConfig`, conclusion cards, or analysis insight components, including input fields, trigger state, rule logic, fallback, and refresh behavior.
6. `## Component Data Binding Matrix`
   - For every page/block/slot/component, record component id, block id, selected block layout template, component content area template id/file, data source id or API id, fields consumed, filters applied, ignored filters with reasons, local filters, sort/rank/pagination rules, states, and visible output.
7. `## Filter And Parameter Semantics`
   - Record global filters, perspective switches, local filters, default values, option source, `emptyFilterValue`, `aggregateValue`, query omission rules, field/query mapping, affected components, non-default state proof, and permission effects.
8. `## Interaction Payloads`
   - Record drilldown, jump, drawer, modal, popup, row action, chart click, export, refresh, and share events: trigger, payload fields, inherited context, target route/component/action, API needs, stale-selection behavior, and state handling.
9. `## Backend API And Model Suggestions`
   - Propose backend endpoint candidates, request params, response shape, response model family, dataset/model grain, pagination/sort/filter execution stage, export behavior, cache/freshness, permission injection, and source/model assumptions.
   - Mark these as suggestions unless an upstream API contract already exists.
10. `## Gaps And Assumptions`
   - Use stable `GAP-*` ids for missing source tables, formulas, fields, permissions, row volume, refresh cadence, export limits, and API/model authority.
   - State impact, owner/source needed, current safe assumption, and whether the prototype is `ready`, `partial`, or `blocked` for backend handoff.
11. `## Verification`
   - List `npm run validate:dashboard`, build, visual/runtime QA, filter non-default checks, data completeness checks, code-ledger checks, and exact blockers.

## Quality Gate

- Do not mark a runnable prototype `ready` for backend or technical-solution handoff without `docs/prototype-data-summary.md`.
- Do not treat this document as visible report content. It is a handoff artifact unless the user explicitly asks to display documentation inside the prototype.
- Do not leave the document as a generic template. It must name actual copied-project files, datasets, fields, widgets, filters, interactions, APIs, assumptions, and verification.
- Do not duplicate full fixture datasets. Summarize shape, row grain, important sample rows, and backend design implications.
- Do not hide data gaps in prose. Record them as `GAP-*` rows with owner/source and readiness impact.
- Do not use `change_logs` as the expected code-ledger path. File-level code ledgers use same-directory `__change_logs__/<code-file-name>.changes.md` sidecars.
