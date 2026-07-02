# Prototype Data Summary Contract

Use this contract after a runnable prototype has data, filters, widgets, and interactions configured. The output is a backend-facing Markdown document inside the configured template project:

```text
docs/prototype-data-summary.md
```

The document is required for prototype handoff to technical solution, backend/data-service design, frontend integration, and testing. It explains what data the prototype used, where the data lives, how widgets consume it, and what backend APIs or models should provide later.

The central production logic is mock-to-real replacement plus metric-to-source matching: for every filter, summary/conclusion variable, chart, table, KPI, list, interaction, and export path that is currently backed by a mock API or fixture, the document must explain how that mock API is replaced by a real HTTP API. For every displayed metric or generated conclusion variable, it must also explain how the metric maps to an interface field, service method, source table/view/model, source columns, formula, grain, dimensions, and filters. Prefer a replacement-first and metric-mapping-first structure so backend owners can match table structures to report metrics without rereading the whole prototype.

## Required Sections

1. `# Prototype Data Summary`
   - Prototype name, route/page ids, source PRD path or version when known, generated timestamp, author/agent, readiness value.
   - State whether the prototype currently uses JSON fixture, API binding, custom resolver, mixed mode, or retained static display data. If mock API mode is selected, explicitly state that all filter options and component display data come from the mock API and that no static runtime fallback data remains.
   - State replacement readiness: `direct-http-ready`, `adapter-required`, `partial`, or `blocked`, with the main `GAP-*` ids when real HTTP API details are missing.
2. `## Source Files And Data Modes`
   - List `src/data/dashboard.dataset.json`, `src/config/dashboard.config.ts`, `src/dataSources/registry.ts`, widget components, action hooks, and any other file that owns data, filters, API binding, generated conclusion rules, or interaction payloads.
   - When the template npm mock API is used, also list `scripts/mock-api-server.mjs`, `scripts/dev-with-mock-api.mjs`, and `docs/mock-api-contract.md`.
   - For every file, state purpose, mode, changed or unchanged, whether it owns the mock endpoint, target HTTP config, or adapter boundary, and whether a code ledger sidecar exists when it was edited.
3. `## Dataset Catalog`
   - For every dataset or API-backed object, record dataset id, business object, row grain, primary key, dimensions, measures, enums, time fields, row count/sample coverage, source authority, refresh/freshness, permission scope, and empty/no-permission behavior.
   - Include mock sample shape, not large full datasets.
4. `## Field Dictionary`
   - Record field name, label, type, unit, formula/derivation, enum values, nullable rule, source column/API field, target HTTP response field when known, masking rule, and example value.
5. `## Metric And Conclusion Inputs`
   - Record every displayed metric, formula, numerator/denominator, unit, direction, data source, filter scope, null/zero denominator rule, and display precision.
   - Record every `conclusionRuleId` used by `summaryAreaConfig`, conclusion cards, or analysis insight components, including input fields, trigger state, rule logic, fallback, refresh behavior, current mock source, target HTTP source, and whether the real API returns final text or raw variables for frontend rule generation.
6. `## Metric To Interface And Source Mapping`
   - This is the backend table-structure matching section. Create one row for every displayed metric, KPI, chart measure, table measure, ranking value, generated conclusion variable, target/reference value, and derived status/score shown in the prototype.
   - Required columns: `metricId`, `metricName`, display label, business definition, formula or derivation, numerator/denominator when applicable, unit, precision, additivity, grain, dimensions, filter field mapping, frontend consumer (page/block/slot/component), current mock API, target HTTP API, service method, request params, response field/path, response DTO, source table/view/model, source columns, join keys or model relationship, aggregation/window rule, freshness/source authority, permission/data-scope predicate, related `conclusionRuleId` when applicable, related `GAP-*`, and readiness.
   - When the source table/view/model, source column, join key, formula, enum, permission predicate, or freshness authority is unknown, keep the metric row and mark the unknown value as `TBD` with a stable `GAP-*`. Do not hide missing metric lineage in prose.
   - This matrix must reconcile with `## Field Dictionary`, `## Mock API To HTTP API Replacement Matrix`, and `## Backend Interface Method Contract`: every displayed metric should map to a response field or explicit adapter output, and every response field used as a metric should map back to a source/formula/gap.
7. `## Component Data Binding Matrix`
   - For every page/block/slot/component, record component id, block id, slot coordinate, selected block area config, registered component example id/file, data source id or API id, current mock endpoint, target HTTP endpoint when known, `dataBinding.mode`, source fields, mapped props, filters applied, ignored filters with reasons, local filters, sort/rank/pagination rules, states, visible output, and adapter/direct-replacement status.
   - For component-slot bindings, explicitly name whether the source config lives on the block widget or `componentSlots[]`, and whether rows are cached by `blockId + slotId`.
8. `## Filter And Parameter Semantics`
   - Record global filters, scoped filters, perspective switches, local filters, default values, option source, mock option endpoint, target HTTP option endpoint, `filters[].scope`, `componentSlots[].filterScope`, `emptyFilterValue`, `aggregateValue`, query omission rules, field/query mapping, required filter ids, affected components/slot coordinates, non-default state proof, and permission effects.
   - Record block pill switches from `titlePills`: owner block, visible `1-2 pillArea`, default active pill, `filters/params/props/dataBinding/actions`, affected data/API params, affected block/slot coordinates, and refresh scope. Data-affecting pills must state the runtime context path, for example `$context.activeTitlePill.params.metric`.
   - State clearly that `filterScope` matches `filters[].scope`, while `requiredFilters` and API/query mappings reference filter ids.
9. `## Interaction Payloads`
   - Record drilldown, jump, drawer, modal, popup, row action, chart click, cross-filter, export, refresh, and share events: trigger, source block/slot coordinate, event name, action placement, payload fields, query/params, inherited context, target route/component/action, handler mode (`shell-default` or `customActionRegistry:<key>`), API needs, stale-selection behavior, and state handling.
   - For pill-triggered interactions, use event name `titlePillChange` when the action is declared on `titlePills[].actions`; include `titlePillId`, `titlePillLabel`, and the resolved active-pill params/filters in the payload description.
   - For shell-default actions, identify the default target type: `route`, `external`, `drawer`, `modal`, `popover`, `cross-filter`, `fullscreen`, `export`, or `refresh`.
10. `## Mock API To HTTP API Replacement Matrix`
   - This is the priority section when the prototype uses the bundled mock API, JSON fixture, or retained offline source. It must be concrete enough for frontend integration and backend/data-service owners to replace mock APIs without rewriting registered component examples.
   - Create one row per replaceable surface: global filter option endpoint, scoped filter option endpoint, block pill data path, summary/conclusion variable source, every chart/table/KPI/list/component slot, drilldown/detail API, export API, and any custom resolver.
   - Required columns: consumer or scope; current mock method/path; current mock request params and source expressions; mock response envelope and `responsePath`; mock sample shape; component-required shape; target HTTP method/path; target request DTO fields; target response DTO/envelope; adapter rule (`direct`, `registry-adapter`, `component-props-adapter`, `blocked`); config/code change needed; permission/cache/error/no-permission handling; related `GAP-*`.
   - Mark replacement as `direct` only when the real HTTP response can keep the same configured `responsePath`, `dataBinding`, and component-required prop/row shape. If the real API returns normalized business rows, record the adapter in `src/dataSources/registry.ts` or an equivalent data-source adapter layer; do not push raw backend response shapes into registered component examples.
   - For missing real API details, still create the row with `TBD` target method/path or DTO fields, attach a stable `GAP-*` id, and state whether the prototype is partial or blocked for HTTP replacement.
11. `## Backend Interface Method Contract`
   - This is the backend-facing method-design section. It must be concrete enough for backend/data-service owners to create controller/service methods, request DTOs, response DTOs, adapters, permission hooks, and tests.
   - Start by summarizing what the prototype already provides from the replacement matrix: visible filters, component consumers, block/slot coordinates, data source ids, endpoint paths, `responsePath`, `dataBinding`, field dictionary, sample mock rows/props, empty-filter semantics, active pill params, interactions, and known `GAP-*` rows.
   - For every required backend method, record method id, suggested service method name, HTTP method/path, owning backend domain/service, frontend consumers (page/block/slot/component), trigger/refresh timing, request DTO fields (path/query/body, type, required/default/empty semantics, source expression such as `$filters.period`), response DTO/envelope, `responsePath`, adapter or props mapping, pagination/sort/export behavior when relevant, cache/freshness, permission injection, empty/error/no-permission state, and replacement note for the current mock API endpoint.
   - If the backend should return component-ready props, state the `props` schema family and component ids. If the backend should return normalized rows instead, state which frontend adapter must transform rows into component props.
   - Mark every missing backend authority, source table, metric formula, enum, permission rule, pagination/export limit, or cache policy as a `GAP-*` row instead of hiding it in prose.
12. `## Backend API And Model Suggestions`
   - Propose backend endpoint candidates, request params, response shape, response model family, dataset/model grain, pagination/sort/filter execution stage, export behavior, cache/freshness, permission injection, and source/model assumptions.
   - If using the template mock API, include current mock endpoints, response envelope paths such as `data.items` and `data.rows`, the `/api/component-props/:componentKey` contract when used, `dataBinding.propsObjectField`, and which parts can be replaced by real APIs without changing component code.
   - Mark these as suggestions unless an upstream API contract already exists.
13. `## Gaps And Assumptions`
   - Use stable `GAP-*` ids for missing source tables, formulas, fields, permissions, row volume, refresh cadence, export limits, and API/model authority.
   - State impact, owner/source needed, current safe assumption, and whether the prototype is `ready`, `partial`, or `blocked` for backend handoff.
14. `## Verification`
   - List `npm run validate:dashboard`, build, visual/runtime QA, filter non-default checks, data completeness checks, code-ledger checks, and exact blockers.

## Quality Gate

- Do not mark a runnable prototype `ready` for backend or technical-solution handoff without `docs/prototype-data-summary.md`.
- Do not treat this document as visible report content. It is a handoff artifact unless the user explicitly asks to display documentation inside the prototype.
- Do not leave the document as a generic template. It must name actual copied-project files, datasets, fields, widgets, filters, interactions, APIs, assumptions, and verification.
- Do not leave mock-to-real replacement to inference. The document must include `## Mock API To HTTP API Replacement Matrix` with current mock endpoint, mock response shape, component-required shape, target HTTP endpoint, request DTO, response DTO, adapter/direct status, config/code changes, permission/cache/error/no-permission notes, and `GAP-*` ids.
- Do not leave metric-to-source matching to inference. The document must include `## Metric To Interface And Source Mapping` with metric name/id, interface name/path, response field, source table/view/model, source columns, formula, grain, dimensions, filters, and `GAP-*` ids.
- Do not leave backend implementation to inference. The document must include `## Backend Interface Method Contract` with service method names, HTTP paths, request DTOs, response DTOs, frontend consumers, data binding/adapter mapping, permission/cache/error notes, and mock-to-real replacement guidance.
- Do not claim a direct HTTP replacement when the real response shape does not preserve the configured `responsePath`, `dataBinding`, and component-required props/rows. Use an adapter boundary instead.
- Do not duplicate full fixture datasets. Summarize shape, row grain, important sample rows, and backend design implications.
- Do not hide data gaps in prose. Record them as `GAP-*` rows with owner/source and readiness impact.
- Do not use `change_logs` as the expected code-ledger path. File-level code ledgers use same-directory `__change_logs__/<code-file-name>.changes.md` sidecars.
