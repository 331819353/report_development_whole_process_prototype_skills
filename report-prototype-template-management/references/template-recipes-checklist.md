# Template Recipes And Checklist

Use this file for common adjustments and final verification after changing a template project.

## Observed Delivery Pitfalls To Prevent

- Mock API mode served with plain Vite: filters and component slots fire many `/api/*` requests, causing repeated generic failures. Use `npm run dev:mock`, smoke API endpoints, and keep request errors rate-limited and diagnosable.
- Process records shipped as development history: users see old release rows, patches, snapshots, and Codex iteration details in a supposedly new project. Reset bundled templates to initialized baseline records; let copied projects create their own history.
- Data-field alias mismatch: components may render values while names disappear, for example ranking rows using backend-natural `name` while the component reads only `label`. Prefer `label`, normalize common dimension aliases, and verify visible names in DOM.
- Config used to fix layout sizing: hand-tuned per-page size values hide weak component auto-fit behavior. Keep size fitting in template runtime and registered component examples.
- Runtime proof skipped after config passes: contract validation can pass while the browser still has blank pages, clipped values, missing multi-slot titles, or non-working interactions. Keep browser/API/interaction smoke as part of readiness.

## Common Recipes

### Initialize Code Ledgers After Copy

1. Run `npm run ledger:init` in the configured template project before the first source edit.
2. Confirm the command created same-directory `__change_logs__/<code-file-name>.changes.md` sidecars for scoped source files.
3. Use `npm run ledger:code -- --file <source-file> --stage before` and `--stage after` for each edited file after this baseline bootstrap.
4. Run `npm run ledger:check` before handoff; missing sidecars block readiness.

### Reset Bundled Template Process Records

Use this only when preparing reusable bundled templates for users. Copied/configured user projects keep their real project history.

1. Keep `docs/mock-api-contract.md`, `docs/prototype-data-summary.md`, and `README.md`; they are handoff/user docs, not process logs.
2. Reduce each template root `DELIVERY_INDEX.md` to a clean `template-initialized` artifact/version/change baseline.
3. Reduce each `__change_logs__/*.changes.md` file to a current-file baseline, with no internal release chronology.
4. Remove generated evidence under `__change_logs__/patches/` and `__change_logs__/.snapshots/` before packaging the reusable template.
5. After a user copies/configures the template, run `npm run ledger:init` and append project-specific entries normally.

### Create Template Build Packet

1. Read `template-asset-construction-contract.md` and `template-build-packet-contract.md` before PRD-driven or multi-step template implementation.
2. Create `templateAssetUnderstandingMap` from the selected template asset root before creating block area configs or binding registered component examples.
3. Create or update `docs/template-build-packet.md` in the configured template project, or maintain an equivalent workflow packet before source edits.
4. Fill the packet sections for framework/shell, pages, `layoutSectionMap`, `layoutRows`, `layoutCoordinateMap`, block map, standard block areas, component slots, data/API, filters/actions, interactions, dynamic conclusion rules, self-development exceptions, implementation file plan, and validation plan.
5. Mark each row `ready`, `draft`, `blocked`, or `deferred`.
6. Do not edit a target source file unless the packet section 11 row names that file and the page/block/slot/control/data/conclusion rows it consumes.

### Change Logo

- Single-page: update `assets.logoSrc`.
- Left-nav: update `assets.logoSrc`.
- Sci-fi: update `assets.logoSrc`, usually to the white logo.
- Light background uses original color logo. Dark background uses white logo.

### Change Page Title

- Single-page: update `screen.title`.
- Left-nav: update `nav[].label` and any page title config exposed by the template.
- Sci-fi: update cockpit title/page label in config and title asset use if present.

### Change Layout Blocks

0. Run `npm run ledger:code -- --file src/config/dashboard.config.ts --stage before` and read the sidecar ledger before editing.
1. Create or update `layoutSectionMap` before editing raw `layoutRows`. Split the page into readable exact `12*K` parts, for example section 1 `12*3` (`AAAAAAAAAAAA|AAAAAAAAAAAA|AAAAAAAAAAAA`), section 2 `12*3` (`AAAAAABBBBBB|AAAAAABBBBBB|AAAAAABBBBBB`), and section 3 `12*3` (`AAAAAABBBBBB|AAAAAABBBBBB|AAAAAABBBBBB`).
2. Edit `layoutRows`.
3. Keep 12 columns per row and normally provide at least 8 visible row units for the first `1920x1080` content viewport.
   Record a row audit: each `layoutRows` string has exactly 12 cells, no row exceeds 12 cells, total row count is at least 8, every block letter is rectangular, every visible top-level block has `rowSpan >= 3`, every block id has one widget and one `blockAreaConfigMap` row, and every span records `colStart`, `colSpan`, `rowStart`, and `rowSpan`.
   Assign readable `blockCoordinate` values (`R-B`) by layout section/page region and block order. Local A/B previews may repeat across sections for readability, but final machine rows and block ids must globally disambiguate different blocks.
4. Keep repeated characters rectangular.
5. Read `template-layout-design-system.md` when changing `contentGap`, `rowHeight`, `cellPadding`, card padding/radius, component title/control handoff, or content range.
6. Calculate the actual block width/height with `report-visual-layout-design`.
7. Verify each span can hold its chart/table/KPI/composite content at the target viewport size.
   For KPI/core-value spans, verify the internal component body too: the main value, suffix/unit, accessory row, spark/reflection layer, and optional component title strip must all fit in the slot. A block frame or slot grid being aligned is not enough.
8. Keep or add vertical scrolling when the report needs more rows than the first viewport can show.
9. Rename widget keys to match changed block ids.
10. Update the Template Build Packet from `template-build-packet-contract.md` and the configurable flow from `configurable-zero-to-one-flow.md`; do not duplicate the full field list here.
11. Append the config ledger entry with changed layout ranges and affected widget/filter contracts.
12. Run `npm run validate:dashboard`.

### Fill Block Template Slots

1. Confirm the independent 分块配置 runtime for the block and its standard block areas: `1-1 titleArea`, `1-2 pillArea`, `3 componentArea`, and `4 summaryArea`.
   - Choose SingleSlot or MultiSlot from the requirement. Use SingleSlot for one dominant conclusion card/component; use MultiSlot only for parallel evidence, comparison, conclusion-card-plus-driver, or tightly related component groups. In MultiSlot blocks, place the conclusion card or primary conclusion component in the first component slot when componentized conclusions are needed.
2. Declare `slotCount`, `componentSlotPattern`, and `slotCoordinateList` before selecting registered component examples. Use slot patterns such as `A`, `AB`, `AAB`, and `AABBCC`; these describe slots inside `3 componentArea`, not page `layoutRows`.
3. Configure `1-1 titleArea`: title and title style.
4. Decide whether `1-2 pillArea` is needed. Configure it when needed; otherwise record it as not configured. If a pill changes metric, period, mode, scenario, or data perspective, configure `titlePills[].filters`, `titlePills[].params`, `titlePills[].props`, `titlePills[].dataBinding`, or `titlePills[].actions`; do not stop at `id/label`.
5. For every `3 componentArea` slot, assign/verify `slotCoordinate` (`R-B-S`), inspect `references/component-examples/config.ts`, then inspect `src/widgets/templates/component-examples/` and its README/catalog, then select an existing 组件示例 first. Component-level title, unit, auxiliary metrics, chart/table/list body, and overflow behavior must be provided by the selected registered example.
6. If no suitable registered component example exists, create a standalone Vue component example, use ECharts for standard chart needs, register/copy it, and record it in `selfDevelopmentExceptionMap` with `type: componentExample`.
7. For every selected 组件示例, keep the root as a rounded rectangle without border lines. Component short-title visibility is automatic: hide it for single-slot parent blocks and show it for every multi-slot block. Do not use `showContentTitle: false` or `config.title.visible:false` in multi-slot blocks.
   When the optional title strip is hidden in a single-slot block, verify the component releases that title-row height and the body/content is not auto-placed into a collapsed title row. If compact KPI/target-progress/conclusion slots still clip values or lists, fix the registered component example auto-fit behavior or choose another registered example; do not hand-tune per-page slot/title/value sizes as the solution.
8. Do not put parent-block filters, controls, description/help text, summary, or explanation content inside 组件示例 slots. Those belong to 分块配置 block areas, shell/page config, or a non-slot widget with explicit ownership. Component-owned props such as chart/table `unit` and `auxMetrics` remain valid when the selected registered example renders its own internal unit or auxiliary metric strip.
9. Configure `4 summaryArea`: show it by default. If no separate `bodySummary` is provided, use the block `note`. If the block has no conclusion card/component, it may carry text-only/narrative conclusion, note, caveat, or explanation. If the block contains `ConclusionExampleCard`, hide the outer block `4 summaryArea` with `showSummary:false` plus `summaryHiddenReason`; do not remove the conclusion card's internal supplemental/evidence/action sections. Hide other summary areas only with explicit user intent plus `showSummary: false` and `summaryHiddenReason`.
10. Do not treat a slot as filled until it points to a registered component example ID plus standalone component example Vue file/component id, component slot size, visual-type size compatibility evidence, sample/source evidence, props/data/state contract, and data binding.
11. Do not fill a slot with text/prose/placeholder content, `visualType` only, an inline widget object, or a visual type that is not compatible with the slot size. If the component is text-summary/insight, it still needs a registered component example and a `conclusionRuleId` when the text is data-driven.

### Add A Data-Bound Widget

1. Read/create sidecar ledgers before editing each planned source file, usually `dashboard.config.ts`, `dashboard.dataset.json`, `src/widgets/types.ts`, `src/widgets/registry.ts`, and the new component file.
2. Create/register the widget.
3. Add static/mock rows in `src/data/dashboard.dataset.json`, configure `widget.data.id: 'apiData'` with `widget.data.api`, or register a custom API/provider resolver in `dataSources/registry.ts` for complex providers. Do not create TS fixture modules for mock rows.
4. For registered component examples inside `3 componentArea`, configure the owning slot/widget with `data`, `filterScope`, and `dataBinding`; do not add a component-example-specific data loader.
5. Verify data completeness before binding filters: every affecting primary/global/scoped filter has option rows, matching business rows or API/resolver support, required fields, default and non-default states, and empty/no-permission coverage when relevant.
6. Configure `widget.data` or `componentSlots[].data`.
7. Add `requiredFilters`, API params, resolver params, or `requiredParams` for every affecting global/page filter. Use `ignoredFilters` plus `ignoredFilterReasons` only for filters the widget intentionally does not consume.
8. If a filter is scoped, set `filters[].scope` and match it from `componentSlots[].filterScope`; `filterScope` is not a substitute for required filter ids or API/query mappings.
9. Configure `dataBinding.mode`: `rows`, `first-row`, `category-series`, `items`, or `custom-props`. Verify mapped props match the selected component example.
10. If mock/offline mode is used, ensure non-default filter values return different rows or values when the business state should change; add a custom resolver when plain rows cannot model the scenario.
11. For line, area, and category-axis charts, sort row tuples first and derive labels, values, tooltip payloads, and click payloads from the same sorted rows.
12. Render from the `data` prop inside ordinary widgets, or from `slotData` plus `dataBinding` inside component examples.
13. Append sidecar ledger entries for every changed source file with feature list, code ranges, affected data/filter/API contracts, and verification.
14. Update `docs/prototype-data-summary.md` with the dataset id, fields, metric/conclusion inputs, component binding row, filters, interaction payloads, backend API/model implications, gaps, and verification.

### Add Lightweight NPM Mock API Data

1. Keep mock rows in `src/data/dashboard.dataset.json`; do not create TS fixture modules for options, chart rows, table rows, or KPI rows.
2. Use or extend `scripts/mock-api-server.mjs` so filter option endpoints return `{ data: { items } }` and component endpoints return `{ data: { rows, total } }`.
3. Add or update npm scripts: `mock:api` starts only the API, and `dev:mock` starts the API plus Vite with `/api` proxied to the mock server.
4. Configure global/page filters with `filters[].source.id: 'apiData'`, `api.url: '/api/filter-options/<filterId>'`, `api.responsePath: 'data.items'`, `labelField`, `valueField`, and `emptyFilterValues`.
5. Configure component slots or owning widgets with `data.id: 'apiData'`, `api.url: '/api/component-props/<componentKey>'` by default, `api.query` expressions from `$filters` and `$context.activeTitlePill` when needed, `api.responsePath: 'data.rows'`, and `dataBinding.propsObjectField: 'props'` so `rows[0].props` becomes the registered component props.
6. Do not preserve static `filters[].options`, static widget rows, chart series, KPI values, or component demo props as runtime fallback data in mock API mode.
7. Document endpoints, response envelope, replacement steps, and field mapping in `docs/mock-api-contract.md` and `docs/prototype-data-summary.md`.
8. Verify `/api/health`, one `/api/filter-options/*` endpoint, and one `/api/component-props/:componentDataKey` endpoint before browser review.
9. Use `npm run dev:mock` for the normal local preview path. Plain `npm run dev` is only acceptable when no runtime `/api/*` data source is configured, or when `/api` is already handled by a verified server/proxy. Mock API proxy targeting uses non-client `MOCK_API_BASE_URL`, not `VITE_API_BASE_URL`.
10. The shared request client should rate-limit identical user-facing failures and show actionable API-unavailable/404/429/business-error messages; repeated generic `Request failed` toasts block readiness.
11. Run `npm run validate:dashboard` and `npm run build`.

### Update Prototype Data Summary

1. Read `prototype-data-summary-contract.md` before final handoff, backend handoff, or any meaningful data/API/filter/widget/interaction change.
2. Create `docs/prototype-data-summary.md` when it does not exist.
3. Summarize actual project evidence from `src/data/dashboard.dataset.json`, `src/config/dashboard.config.ts`, `src/dataSources/registry.ts`, widget components, and action hooks.
4. Include dataset catalog, field dictionary, metric and generated-conclusion inputs, component data binding matrix, filter/parameter semantics, interaction payloads, backend interface method contract, backend API/model suggestions, `GAP-*` rows, and verification.
5. In `## Backend Interface Method Contract`, include what the prototype already provides for backend design, then list method rows with service method name, HTTP method/path, owning domain/service, frontend consumers, request DTO, response DTO/envelope, `responsePath`, adapter/props mapping, pagination/export behavior when relevant, cache/freshness, permission injection, empty/error/no-permission handling, and mock-to-real replacement note.
6. Keep full fixture rows out of the document; include representative shape and backend design implications.
7. Record the code-ledger sidecar path for every changed scoped source file that produced or changed the data contract.

### Add Or Change First-Level Perspective

1. Classify the control as `perspective-switch` when it changes business domain, report theme, management object, metric set, component set, table schema,口径, or domain wording.
2. Put the switch in `nav[]`, page route, tab/segment control, or explicit perspective state. Do not place it in `filters[]` unless the binding matrix proves it only narrows row scope.
3. Add `componentSchemaImpact` to the binding matrix and list whether metric names, component collection, table headers, dimensions, formulas/口径, or domain vocabulary change.
4. Add navigation metric lineage when the perspective navigation shows percentages, rankings, or status lights: `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, and `periodBehavior`.
5. Add mock/API/resolver data for default and non-default perspectives, including one personalized metric and one risk focus per domain. Dynamic navigation KPIs must come from `businessData`, aggregate data, API/provider fields, or resolver output, not `filterData.meta`.
6. Add a QA case that switches every non-default perspective and checks labels/schema as well as values.

### Add Component Interaction

1. Widget emits `dashboard-action`.
2. Configure `actions[eventName]` on the block widget or component slot.
3. Choose `targetType`: `route`, `external`, `drawer`, `modal`, `popover`, `cross-filter`, `fullscreen`, `export`, or `refresh`.
4. Fill `target`, `query`, `params`, `contextInheritance`, and `meta.title` when relevant. Use `$event`, `$filters`, and `$context` expressions for payload mapping.
5. Let the shell default behavior run when it is sufficient: nav/route jump, external open, drawer/drilldown, modal, popup, cross-filter, fullscreen, export, and refresh.
6. Use `actions/registry.ts` only when default behavior must be overridden for permission, API orchestration, analytics, host-system integration, or a business-specific overlay.
7. Record the interaction in `interactionBehaviorMap` with source page/block/slot coordinate, event name, action placement, target type, handler mode, state response, and QA case.

### Change Visual Style

- Read/create the target source file ledger before editing `src/styles.css` or a widget scoped style; append after editing with style range, affected component state, and screenshot/build verification.
- Shell-level changes go in `src/styles.css`.
- Widget-level changes go in the widget scoped style.
- Shared template layout style such as block gap, card radius, component title/control handoff, cell padding, and hover/focus feedback follows `template-layout-design-system.md`.
- Keep Haier blue/white as the primary style for ordinary report pages.
- For sci-fi, keep a dark cockpit theme with controlled semantic colors.

## Verification Checklist

- Template choice matches report scope and usage scenario.
- `templateAssetUnderstandingMap` exists and is based on the selected template asset root.
- Template Build Packet exists for PRD-driven or multi-step implementation, is current with implemented source files, and maps every edited target file to packet section 11.
- Template operation chain is complete: `frameworkTemplateId`, `templateAssetUnderstandingMap`, `pageLayoutConfig` with `layoutSectionMap`, `filterSurfaceMap`, `toolbarActionMap`, `interactionBehaviorMap`, `blockAreaConfigMap` with `slotCount`, `componentSlotPattern`, `slotCoordinateList`, block area configs created by `createBlockAreaConfig`, and asset availability, `titleAreaConfig`, `pillAreaConfig`, `componentExampleConfigMap` with component slot size, visual-type size compatibility evidence, and component-owned title/unit/auxMetrics config when declared by the selected example, `summaryAreaConfig`, and fallback map when custom registered component examples were created.
- `pageLayoutConfig` has no visible top-level block with `rowSpan < 3`; smaller strips/cards are internal component/sub-block sizing inside legal parent blocks.
- Component slots under `3 componentArea` contain only registered 组件示例 content. Parent block title, pills, filters, controls, descriptions, explanations, and summaries stay in 分块配置 block areas, shell/page config, or non-slot widgets. Component-owned internal `unit` and `auxMetrics` stay inside the registered component example when that example supports them.
- Chart-like component examples that expose component-owned `auxMetrics` keep those metrics visible and fitted. `config.layout.orientation` controls the relationship between aux strip and chart body; `config.aux.orientation` controls the metric-item layout inside the aux strip (`horizontal`, `vertical`, or `auto`). Explicit aux orientation wins, and only `auto` may adapt to available space. Missing aux strips, clipped aux text, or parent-size tuning used to hide the problem blocks readiness.
- Component examples with `auxMetrics` default the auxiliary information area between the component title strip and chart/table/list body. Horizontal component layout uses a horizontal strip with each key/value stacked vertically; vertical component layout uses a vertical strip with each key/value on one line.
- Block pills are verified as real switches when they claim to switch data: active pill context path, affected params/filters, affected block/slot coordinates, data reload scope, and optional `titlePillChange` action are documented.
- Interactions are verified as runtime effects, not only config rows: click/key-activate representative primary/reference/secondary/supporting slots and confirm drawer, modal, popover, route, cross-filter, refresh, fullscreen, export, or external-open state as configured.
- Component slots are not text-filled or placeholder-filled; every slot has a registered component example ID, standalone Vue file/component id, component slot size, visual-type size compatibility evidence, sample/source evidence, props/data/state contract, and data binding.
- Registered component examples are standalone Vue files, rounded rectangles without border lines. Their optional top title strip is `20px`, centered, `3px` top-padded, removable, hidden for single-slot parent blocks, and visible for every multi-slot parent block. When hidden, the title row is removed or set to `0` and content explicitly occupies the full body area.
- `4 summaryArea` is visible by default on every visible block. The built-in exception is a block containing `ConclusionExampleCard`, where the outer summary area is hidden and the card's internal supplemental/evidence/action sections remain. Other hidden summary areas require explicit user-requested `showSummary:false` and `summaryHiddenReason`.
- KPI/core-value component examples have local fit evidence: screenshot crop and DOM geometry for the slot, card, main value, suffix/unit, accessory row, spark/reflection layer, and optional title strip. `VIS-TEXT-CLIPPED` or `VIS-CONTENT-OVERFLOW` inside `.layout-slot-content-widget`, `.kpi-example-card`, `.target-progress-example-card`, `.metric`, `.score`, `.value`, or `.card-value` blocks readiness even if the visual audit labels it `minor`.
- `ConclusionExampleCard` core conclusion content is vertically centered within its core area; the title/eyebrow row and trailing supplemental/evidence/action rows keep their own top/bottom alignment and are not dragged into the core centering calculation.
- Stack contract is intact: `package.json` keeps Vue 3, TypeScript, Vite, Element Plus, ECharts, axios, and build/typecheck scripts; `src/main.ts` uses Vue 3 `createApp`, registers Element Plus with locale, imports Element Plus base and dark CSS variables, and preserves project Element token styles.
- Standard chart widgets use real ECharts runtime/options/series; ordinary controls and row tables use Element Plus/project control patterns; S2 is added only when pivot/cross/wide analytical table behavior is implemented.
- Logo variant matches background.
- `dashboard.config.ts` owns layout, filters, widgets, actions, and assets.
- Registered component examples expose the optional removable title strip plus their body content, including component-owned internal auxiliary metric strips when supported by props such as `auxMetrics`. Component-local filters, filter panels, and detail links are allowed only in non-slot business widgets with explicit ownership.
- Business data is not stored directly in config.
- Standard API endpoints are configured with `apiData` / `httpData`; custom resolvers are reserved for complex providers.
- When lightweight backend-shaped data is required, `npm run mock:api` or `npm run dev:mock` works, `docs/mock-api-contract.md` exists, and `filters[].source` / component `data` use response paths matching the mock API envelope.
- Mock API runtime evidence includes `/api/health`, one filter option endpoint, one component props endpoint, and no repeated generic request-failure toast storm during page load.
- Every widget has `visualType`.
- Widgets without data have `dataPolicy`.
- Data completeness is verified before filter binding: filter option rows, business/API rows, required fields, default/non-default states, and resolver/API branches exist or are documented as gaps.
- `docs/prototype-data-summary.md` exists, names actual project data files and data modes, and is current with `dashboard.config.ts`, `dashboard.dataset.json`, `dataSources/registry.ts`, widget data contracts, generated conclusion rules, filters, and interactions.
- The data summary includes backend API/model suggestions plus explicit `GAP-*` rows for missing source/model/API/permission/freshness facts.
- First-level perspective switches are not hidden in `filters[]`; domain/theme/management-object controls use nav/page/route/tab/segment/perspective state unless explicitly row-scope-only.
- Binding matrix includes `controlSemantics` and `componentSchemaImpact` for controls that affect widgets.
- Navigation percentages, rankings, and status lights have lineage and are not stored in `filterData.meta` unless explicitly static display copy.
- Filter scope and data field mapping are explicit.
- Component-slot filter binding is explicit: `filters[].scope` matches `componentSlots[].filterScope`, while `requiredFilters` and API/query params reference filter ids.
- Every dynamic component slot has `dataBinding.mode` plus mapped fields/props, or a documented static-data reason.
- List/ranking/action component examples show display names as well as values. Prefer `label`; when backend rows naturally use `name`, `regionName`, `region`, `areaName`, or `dimension`, normalize those fields in the component example or adapter and document the accepted aliases in the data summary.
- Affecting filters are bound through `filterFields`, `requiredFilters`, API params, or resolver params; `ignoredFilters` is used only for intentionally invariant widgets and each ignored filter has `ignoredFilterReasons`.
- Non-default primary filter states visibly change affected widget data in JSON/API/resolver mode, or the widget is clearly labeled static/invariant.
- Configured interactions name source coordinate, event name, action placement, target type, query/params, handler mode, state response, and QA case.
- Non-default perspective states update metric names, titles/summaries, table dimensions/headers, component set, specialty metrics, and口径 when specified by `componentSchemaImpact`; value-only changes are not enough.
- Block spans match the size and component-count constraints from `report-visual-layout-design`.
- Layout tokens match the selected template family or deviations are documented: content range, `contentGap`, `rowHeight`, `cellPadding`, card padding/radius, and component-owned title/control handoff.
- Outer block validation does not replace component-internal fit checks. Composite widgets must be reviewed with `report-component-style-design` for summary columns, nested KPI grids, text wrapping, min-height, and no critical nowrap/ellipsis clipping.
- Do not accept a KPI row where the cards are horizontally aligned but the large value is top-clipped, bottom-clipped, vertically offset, hidden by `overflow: hidden`, or squeezed by a hidden internal title row. This is a component-internal failure, not a page-grid success.
- Do not accept `VIS-MULTI-SLOT-TITLE-MISSING`, summary-area clipping, or component-slot text/value clipping. These are blocker-level failures because they break the template's automatic fitting contract.
- Visual geometry audit rules must distinguish real chart panes from wrapper/title/aux elements and distinguish Cartesian axis charts from non-axis charts. Do not use broad `[class*="chart"]` matching as evidence; require explicit chart pane/ECharts roots plus token-matched axis types before applying axis chart floor thresholds.
- Composite widget no-data masks are scoped by child data states: if all child sub-blocks are no-data, show one parent-block mask; if only some child sub-blocks are no-data, mask only those sub-blocks and include their title/control area plus component body.
- `1920 * 1080` is used as the prototype viewport check, not a total report height cap.
- Layout blocks do not clip titles, legends, charts, tables, empty states, or controls.
- `npm run validate:dashboard` runs after the minimal required dependencies are installed.
- Stack-contract failures from `npm run validate:dashboard` block handoff even if Vite build or screenshots appear fine.
- `npm run ledger:init` ran after project copy, `npm run ledger:check` passes before handoff, and every changed source file has a sidecar code ledger under `__change_logs__`. The ledger was read before editing, and a post-change version entry records feature/function list, changed code ranges, affected widget/data/filter/API contracts, verification, and rollback notes. A `change_logs` folder is not required and is not the expected path.
- For bundled reusable template handoff, process records are initialized, not historical: `DELIVERY_INDEX.md` and `__change_logs__/*.changes.md` contain only clean template-baseline entries, and generated patch/snapshot evidence is not shipped.
- If npm dependency installation is blocked by domestic network access, retry with a temporary command-level mirror such as `npm install --registry=https://registry.npmmirror.com` or `npm install <package-name> --registry=https://registry.npmmirror.com`; if unavailable, replace the registry URL with `https://npm.aliyun.com/`, `https://mirrors.cloud.tencent.com/npm/`, `https://mirrors.ustc.edu.cn/npm/`, or `https://mirrors.tuna.tsinghua.edu.cn/npm/`. Do not persist registry changes unless explicitly requested.
- `npm run build` runs before handoff when implementation code changed.
- A local dev/preview URL is started and verified when a runnable project is part of the task.
