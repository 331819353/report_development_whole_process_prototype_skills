# Prototype Data Summary Contract

Use this contract after a runnable prototype has data, filters, widgets, and interactions configured. The output is a backend-facing Markdown document inside the configured template project:

```text
docs/prototype-data-summary.md
```

The document is required for prototype handoff to technical solution, backend/data-service design, frontend integration, and testing. It explains what data the prototype used, where the data lives, how widgets consume it, and what backend APIs or models should provide later.

## Required Sections

1. `# Prototype Data Summary`
   - Prototype name, route/page ids, source PRD path or version when known, generated timestamp, author/agent, readiness value.
   - State whether the prototype currently uses JSON fixture, API binding, custom resolver, mixed mode, or retained static display data. If mock API mode is selected, explicitly state that all filter options and component display data come from the mock API and that no static runtime fallback data remains.
2. `## Source Files And Data Modes`
   - List `src/data/dashboard.dataset.json`, `src/config/dashboard.config.ts`, `src/dataSources/registry.ts`, widget components, action hooks, and any other file that owns data, filters, API binding, generated conclusion rules, or interaction payloads.
   - When the template npm mock API is used, also list `scripts/mock-api-server.mjs`, `scripts/dev-with-mock-api.mjs`, and `docs/mock-api-contract.md`.
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
   - For every page/block/slot/component, record component id, block id, slot coordinate, selected block area config, registered component example id/file, data source id or API id, `dataBinding.mode`, source fields, mapped props, filters applied, ignored filters with reasons, local filters, sort/rank/pagination rules, states, and visible output.
   - For component-slot bindings, explicitly name whether the source config lives on the block widget or `componentSlots[]`, and whether rows are cached by `blockId + slotId`.
7. `## Filter And Parameter Semantics`
   - Record global filters, scoped filters, perspective switches, local filters, default values, option source, `filters[].scope`, `componentSlots[].filterScope`, `emptyFilterValue`, `aggregateValue`, query omission rules, field/query mapping, required filter ids, affected components/slot coordinates, non-default state proof, and permission effects.
   - Record block pill switches from `titlePills`: owner block, visible `1-2 pillArea`, default active pill, `filters/params/props/dataBinding/actions`, affected data/API params, affected block/slot coordinates, and refresh scope. Data-affecting pills must state the runtime context path, for example `$context.activeTitlePill.params.metric`.
   - State clearly that `filterScope` matches `filters[].scope`, while `requiredFilters` and API/query mappings reference filter ids.
8. `## Interaction Payloads`
   - Record drilldown, jump, drawer, modal, popup, row action, chart click, cross-filter, export, refresh, and share events: trigger, source block/slot coordinate, event name, action placement, payload fields, query/params, inherited context, target route/component/action, handler mode (`shell-default` or `customActionRegistry:<key>`), API needs, stale-selection behavior, and state handling.
   - For pill-triggered interactions, use event name `titlePillChange` when the action is declared on `titlePills[].actions`; include `titlePillId`, `titlePillLabel`, and the resolved active-pill params/filters in the payload description.
   - For shell-default actions, identify the default target type: `route`, `external`, `drawer`, `modal`, `popover`, `cross-filter`, `fullscreen`, `export`, or `refresh`.
9. `## Backend Interface Method Contract`
   - This is the backend-facing method-design section. It must be concrete enough for backend/data-service owners to create controller/service methods, request DTOs, response DTOs, adapters, permission hooks, and tests.
   - Start by summarizing what the prototype already provides: visible filters, component consumers, block/slot coordinates, data source ids, endpoint paths, `responsePath`, `dataBinding`, field dictionary, sample mock rows/props, empty-filter semantics, active pill params, interactions, and known `GAP-*` rows.
   - For every required backend method, record method id, suggested service method name, HTTP method/path, owning backend domain/service, frontend consumers (page/block/slot/component), trigger/refresh timing, request DTO fields (path/query/body, type, required/default/empty semantics, source expression such as `$filters.period`), response DTO/envelope, `responsePath`, adapter or props mapping, pagination/sort/export behavior when relevant, cache/freshness, permission injection, empty/error/no-permission state, and replacement note for the current mock API endpoint.
   - If the backend should return component-ready props, state the `props` schema family and component ids. If the backend should return normalized rows instead, state which frontend adapter must transform rows into component props.
   - Mark every missing backend authority, source table, metric formula, enum, permission rule, pagination/export limit, or cache policy as a `GAP-*` row instead of hiding it in prose.
10. `## Backend API And Model Suggestions`
   - Propose backend endpoint candidates, request params, response shape, response model family, dataset/model grain, pagination/sort/filter execution stage, export behavior, cache/freshness, permission injection, and source/model assumptions.
   - If using the template mock API, include current mock endpoints, response envelope paths such as `data.items` and `data.rows`, the `/api/component-props/:componentKey` contract when used, `dataBinding.propsObjectField`, and which parts can be replaced by real APIs without changing component code.
   - Mark these as suggestions unless an upstream API contract already exists.
11. `## Gaps And Assumptions`
   - Use stable `GAP-*` ids for missing source tables, formulas, fields, permissions, row volume, refresh cadence, export limits, and API/model authority.
   - State impact, owner/source needed, current safe assumption, and whether the prototype is `ready`, `partial`, or `blocked` for backend handoff.
12. `## Verification`
   - List `npm run validate:dashboard`, build, visual/runtime QA, filter non-default checks, data completeness checks, code-ledger checks, and exact blockers.

## Quality Gate

- Do not mark a runnable prototype `ready` for backend or technical-solution handoff without `docs/prototype-data-summary.md`.
- Do not treat this document as visible report content. It is a handoff artifact unless the user explicitly asks to display documentation inside the prototype.
- Do not leave the document as a generic template. It must name actual copied-project files, datasets, fields, widgets, filters, interactions, APIs, assumptions, and verification.
- Do not leave backend implementation to inference. The document must include `## Backend Interface Method Contract` with service method names, HTTP paths, request DTOs, response DTOs, frontend consumers, data binding/adapter mapping, permission/cache/error notes, and mock-to-real replacement guidance.
- Do not duplicate full fixture datasets. Summarize shape, row grain, important sample rows, and backend design implications.
- Do not hide data gaps in prose. Record them as `GAP-*` rows with owner/source and readiness impact.
- Do not use `change_logs` as the expected code-ledger path. File-level code ledgers use same-directory `__change_logs__/<code-file-name>.changes.md` sidecars.
