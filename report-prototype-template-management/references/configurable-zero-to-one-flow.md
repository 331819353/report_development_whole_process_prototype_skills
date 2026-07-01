# Configurable Zero-To-One Report Flow

Use this reference as the canonical path for every new report prototype, PRD handoff, template implementation, and repair. It replaces the older fixed block-size and legacy slot-fill flow.

## One Supported Flow

Every report project must follow this chain:

```text
frameworkTemplateId
  -> pageLayoutConfig
  -> filterSurfaceMap
  -> toolbarActionMap
  -> interactionBehaviorMap
  -> blockAreaConfigMap
  -> componentSlotConfigMap
  -> componentExampleConfigMap
  -> customEChartExampleMap when needed
  -> DELIVERY_INDEX.md read/update
  -> docs/prototype-data-summary.md
  -> releaseValidation
```

The runtime implementation is:

```text
dashboard.config.ts
  -> business-report-pages.ts
  -> layoutRows
  -> WidgetRenderer
  -> BaseLayoutSpan.vue
  -> componentSlots[].componentExampleId
  -> componentSlots[].data/filterScope/dataBinding/actions
  -> component-examples/config.ts
  -> widgets/registry.ts
  -> component-examples/*.vue
```

## Retired Paths

Do not use these as active implementation contracts:

- Retired fixed block-size template catalogs.
- Retired fixed-size wrapper files as selectable report blocks.
- Component-content-area template catalogs and prose-only slot-fill maps.
- Slot fills based on prose, `visualType` only, inline widget objects, or unregistered Vue files.
- Custom shell, custom page layout, custom block layout, duplicate filter bars, duplicate navigation, or duplicate toolbars.

The only block area runtime is `BaseLayoutSpan.vue`. The only block creation API for configurable report pages is `createBlockAreaConfig`. Page-level collections are exposed through `blockAreaConfigMap`.

## Step 1. Select Framework Template

Choose exactly one bundled template:

| Template | Use when |
| --- | --- |
| `frozen-title-sci-fi-cockpit-template` | Fixed-title dark cockpit or large-screen display. |
| `left-nav-analytics-workbench-template` | Multi-page analytical workbench with left navigation. |
| `topbar-light-scroll-dashboard-template` | Top navigation, light report, scroll-friendly project report. |

Output:

- `frameworkTemplateId`
- shell title/logo/theme/nav/filter/toolbar decisions
- configurable template target path
- selected shell/title/logo/theme/nav/filter/toolbar decisions

Stop if no bundled template fits. Do not create an independent Vue project inside this template flow.

## Step 2. Configure Page Layout

Create `pageLayoutConfig` with machine-checkable `layoutRows`.

Rules:

- Page layout uses 12 columns.
- Every `layoutRows` row has exactly 12 cells.
- Page row count is `N >= 8`.
- Every block letter is rectangular.
- Each visible block maps to one widget in `blockAreaConfigMap`.
- `layoutSectionMap` is required for readable planning. Use sections such as `12*2 + 12*3 + 12*3`.

Output:

- `layoutSectionMap`
- `layoutRows`
- `layoutCoordinateMap`
- `filterSurfaceMap`
- `toolbarActionMap`
- `page/nav wiring`

## Step 3. Configure Block Areas

For every block letter from `layoutRows`, create one widget with `createBlockAreaConfig`.

Required fields:

- `title`
- `note`
- optional `bodySummary`
- optional `titlePills`
- `componentRegionPattern`
- `slots`

Example:

```ts
export const createBlockAreaConfig = (...) => RegisteredWidgetConfig;

const revenueBlock = createBlockAreaConfig({
  title: '收入趋势',
  note: '观察收入、利润和目标变化。',
  componentRegionPattern: 'A',
  slots: [
    slot('A', '月度收入趋势', 'line-chart-card', line(...), 1, 'primary'),
  ],
});
```

Rules:

- The block size comes from `layoutRows`; do not encode a fixed size selection.
- `componentRegionPattern` only describes internal component-area slot geometry.
- Supported slot patterns include `A`, `AB`, `ABC`, and row patterns such as `AAB|CCD`.
- `componentSlotContracts` and `componentSlots` are generated from `slots`.

Output:

- `blockAreaConfigMap`
- `componentSlotConfigMap`

## Step 4. Configure Block Areas

Block areas stay on the block area, not inside component slots:

| Area | Owner | Required |
| --- | --- | --- |
| `1-1 titleArea` | block area | yes |
| `1-2 pillArea` | block area | optional |
| `3 componentArea` | block area slots | yes |
| `4 summaryArea` | block area | default visible |

Rules:

- Configure title and note at block level.
- Configure `titlePills` only for block-local compact switches. When a pill changes metric, period, mode, scenario, or data perspective, declare its `filters`, `params`, `props`, `dataBinding`, or `actions`; do not leave it as a visual-only active state.
- Configure summary by default. If no separate `bodySummary` exists, use the block `note` as the visible summary. Hide summary only when the user explicitly says not to show notes/explanations, and then record `showSummary:false` plus `summaryHiddenReason`.
- Configure summary only for non-duplicative explanation, source, scope, caveat, or data-driven conclusion.
- Do not hand-tune slot height, title height, summary height, font ratios, row ratios, padding, or overflow to make a block fit. Fitting belongs to template runtime and registered component example auto-fit behavior.
- Do not place shell filters, toolbar actions, block titles, or summaries inside `componentSlots`. Component-owned unit labels and auxiliary metrics belong only to registered component examples that declare `unit` / `auxMetrics` props or config.

Output:

- `titleAreaConfig`
- `pillAreaConfig` or `null` with reason
- `summaryAreaConfig` by default, or `showSummary:false` plus `summaryHiddenReason` only when explicitly hidden

## Step 5. Select Component Examples

Each `3 componentArea` slot must bind one registered component example.

Source paths:

```text
src/widgets/templates/component-examples/config.ts
src/widgets/templates/component-examples/index.ts
src/widgets/templates/component-examples/*.vue
src/widgets/registry.ts
```

Slot fill contract:

| Field | Meaning |
| --- | --- |
| `slotCoordinate` | Readable coordinate such as `2-2-1`. |
| `regionKey` | Pattern letter such as `A`, `B`, or `C`. |
| `role` | `primary`, `secondary`, `supporting`, or `reference`. |
| `componentExampleId` | `component-example-catalog:<id>`. |
| `props` | Business data and component props. |
| `config` | Config sections such as `title`, `layout`, `chart`, `table`, `tones`, `developer`. |
| `data` | Optional data-source reference loaded per `blockId + slotId`. |
| `filterScope` | Optional scope list matching `filters[].scope`; unscoped filters remain global. |
| `dataBinding` | Optional row-to-props mapping for existing component examples. |
| `actions` | Optional event-to-action map for click, drilldown, jump, modal, drawer, popup, cross-filter, export, refresh, or fullscreen. |

Allowed examples include KPI cards, target progress, line/bar/combo/pie/heatmap/radar/funnel charts, ranking/action lists, conclusion cards, detail tables, complex tables, and the self-developed ECharts template.

Component title visibility is automatic: single-slot parent blocks hide component short titles and rely on the parent block title; multi-slot parent blocks must show each component short title. There is no multi-slot hidden-title exception. If a registered example cannot fit with the required title strategy, fix that component example's auto-fit behavior or choose another registered example instead of hand-tuning per-page sizes. Hidden single-slot titles must release their title-row height and move the body/content into the full available component area; hiding the header while leaving content auto-placed in a collapsed title row is a readiness failure.

Component examples may also define component-owned internal unit and auxiliary metrics such as `unit` and `auxMetrics` for chart/table/composite cards. These are component-internal areas, not block-level areas. Keep parent block title, pills, filters, controls, and summaries out of `componentSlots`, but do not strip internal `unit` or `auxMetrics` from a registered example when they are part of that component's props and auto-fit layout.

Output:

- `componentExampleConfigMap`
- one row for every declared slot

## Step 6. Self-Develop Only When No Example Fits

When no existing component example fits, use:

```text
component-example-catalog:custom-echart-component-template
```

or create a new registered component example.

To create a new example:

1. Add `src/widgets/templates/component-examples/<Name>.vue`.
2. Export it from `component-examples/index.ts`.
3. Add schema in `component-examples/config.ts`.
4. Register it in `widgets/registry.ts`.
5. Bind it through `componentSlots[].componentExampleId`.

Self-development is limited to:

- registered component examples;
- interaction behavior that shell-default `actions` cannot express;
- ECharts/custom chart internals inside the registered component.

It does not permit custom framework shell, custom page layout, custom block area runtime, duplicate filters, duplicate navigation, or duplicate toolbar.

Output:

- `customEChartExampleMap`
- `selfDevelopmentExceptionMap` entries with `type: componentExample` or `type: interactionBehavior`

## Step 7. Bind Data, Filters, And Interactions

Use template-owned surfaces first:

- Global/page filters: `dashboard.config.ts` `filters[]`.
- Topbar/left-nav/fixed cockpit navigation: template shell config.
- Toolbar/download/refresh/fullscreen: template shell controls.
- Block-level switches: `titlePills`. The active pill is exposed as `$context.activeTitlePillId`, `$context.activeTitlePillLabel`, and `$context.activeTitlePill`. Its `filters` merge into the block/slot runtime filters, its `params` merge into data-source params and override same-name defaults, its `props` merge into component-example props, and its `dataBinding` can override the slot/widget data binding for the active state.
- Configured drilldown, drawer, modal, row action, chart-point action, jump, popup, and cross-filter: `actions` on the block widget or component slot.

Every component example row must name:

- data source or static props;
- `dataBinding.mode` and the fields mapped into component props;
- metric fields;
- filter impact, `filters[].scope` to `filterScope` mapping, required filter ids, API/query params, or ignored-filter reason;
- interaction event names, source block/slot coordinate, target type, target, query/params, and whether behavior uses shell default or `src/actions/registry.ts`;
- conclusion rule when it renders a conclusion;
- loading/empty/error/no-permission behavior when applicable.

For existing component examples, use this binding algorithm:

1. Declare the visible filter in `filters[]`; add `scope` only when it should affect a subset of widgets.
2. Declare the slot data source in `componentSlots[].data` through the owning widget config. Use `requiredFilters`, `api.query`, resolver params, or `ignoredFilters`/`ignoredFilterReasons`.
3. Set `componentSlots[].filterScope` to the matching `filters[].scope` values. Do not put filter ids here unless the filter's `scope` intentionally uses the same string.
4. Set `componentSlots[].dataBinding` to convert rows into registered component props: `rows`, `first-row`, `category-series`, `items`, or `custom-props`.
5. For block-local switches, configure `titlePills[].params` or `titlePills[].filters` and reference them from data params when needed, for example `params: { metric: '$context.activeTitlePill.params.metric' }`. Use `titlePills[].props` or `titlePills[].dataBinding` when the switch changes component display fields without changing the data source.
6. Set `componentSlots[].actions[eventName]`, block `actions[eventName]`, or `titlePills[].actions.titlePillChange` for interaction events. Shell defaults handle `route`, `external`, `drawer`/`drilldown`, `modal`, `popover`/`popup`, `cross-filter`, `fullscreen`, `export`, and `refresh`; registry handlers override defaults.
7. Verify representative interactions in the running page. A configured interaction is ready only when clicking or keyboard-activating the source block/slot produces the expected visible route, drawer, modal, popover, cross-filter, refresh, fullscreen, export, or external-open state.

When backend-shaped data is needed before real backend delivery, use the bundled npm mock API route: keep filter options, component props, and mock rows in `src/data/dashboard.dataset.json`, start with `npm run dev:mock`, configure `filters[].source.api.responsePath: 'data.items'` and component `data.api.responsePath: 'data.rows'`, and for component-example slots prefer `/api/component-props/:componentKey` with `dataBinding.propsObjectField: 'props'`. Do not retain static filter options, widget rows, chart series, KPI values, or component demo props as runtime fallback data. Document endpoints in `docs/mock-api-contract.md` and `docs/prototype-data-summary.md`.

Mock API readiness is not just a successful Vite page load. Verify `/api/health`, at least one `/api/filter-options/*` endpoint, and at least one `/api/component-props/:componentDataKey` endpoint before browser review. If the page shows repeated generic request-failure messages, stop and diagnose startup mode, proxy/base URL, endpoint path, response envelope, and component `dataBinding` before judging visual or interaction quality.

## Step 8. Validate Runtime Mounting

A slot is ready only when runtime proof exists:

- `componentExampleId` exists in `component-examples/config.ts`.
- component type is exported from `component-examples/index.ts`.
- component type is registered in `widgets/registry.ts`.
- browser DOM contains `.layout-slot-content-widget`.
- fallback label count is `0`.
- component slot height is visible, not collapsed to a few pixels.
- list/ranking/action items render both display names and values; if backend-friendly fields such as `name`, `regionName`, `region`, `areaName`, or `dimension` are used, the selected component example or adapter maps them to the expected display-name prop.
- component-owned unit and auxiliary metric strips render when `unit` / `auxMetrics` are provided by the selected example contract, without creating a parent block area.
- single-slot blocks hide component short titles, and multi-slot blocks show a visible short title for every component slot.
- `4 summaryArea` is visible by default and does not clip; hidden summaries carry an explicit user-requested reason.
- KPI/core-value component examples have component-internal fit proof: screenshot crop plus DOM rectangles show the main value, suffix/unit, accessory row, spark/reflection layer, and optional internal title strip are not clipped or vertically offset. If the internal title is hidden, the component must release that row height and prove the body/content rectangle uses the available slot height rather than a collapsed title row. Any visible clipping inside `.layout-slot-content-widget`, `.kpi-example-card`, `.target-progress-example-card`, `.metric`, `.score`, `.value`, or `.card-value` blocks slot readiness even when the generic visual audit severity is only `minor`.

## Step 9. Release Validation

Before changing an existing configured user project, read or initialize the project root `DELIVERY_INDEX.md` through `delivery-version-management`. After the change, append the current change record to `DELIVERY_INDEX.md`. The record must include changed files, impacted pages/blocks/slots/components, data/API/filter/conclusion impact, validation, `docs/prototype-data-summary.md` status, code-ledger status, and next-change notes.

Before handing off a bundled reusable template asset, reset process records to new-project baseline: `DELIVERY_INDEX.md` should contain only initialized artifact/version/change rows, `__change_logs__/*.changes.md` should contain only current-file baseline records, and `__change_logs__/patches` plus `__change_logs__/.snapshots` should not ship internal template-development evidence. Keep `docs/mock-api-contract.md` and `docs/prototype-data-summary.md` substantive because they are user/backend handoff docs, not process logs.

After data, filters, widgets, generated conclusions, and interactions are configured, create or update:

```text
docs/prototype-data-summary.md
```

The summary must name actual data files, datasets, fields, component bindings, filters, interaction payloads, backend interface method contracts, backend API/model suggestions, gaps, and verification. Backend-facing method rows must include suggested service method name, HTTP path, request DTO, response DTO, frontend consumers, binding/adapter mapping, permission/cache/error notes, and mock-to-real replacement guidance.

Run inside every affected template project:

```bash
npm run validate:dashboard
npm run build:test
```

When a URL is part of the task, start or reuse dev servers and verify:

- pages/nav entries render;
- filters and toolbar do not duplicate;
- representative configured interactions open the expected drawer/modal/popover, route, cross-filter, refresh, fullscreen, export, or external state;
- every page reaches the bottom on scroll;
- charts/tables/lists adapt to slot size;
- multi-slot component short titles are visible, single-slot component short titles are hidden, and summary areas are visible unless explicitly disabled;
- KPI/core-value rows show complete values without top/bottom clipping, hidden-title row squeeze, reflection overlap, or accessory-row crowding;
- dark and light themes remain coherent;
- tables fill width when only 2-3 columns exist;
- Element Plus and ECharts warnings are not newly introduced by the change.
- `DELIVERY_INDEX.md` exists, has `## Change History`, and contains the current post-change record.
- `docs/prototype-data-summary.md` exists, has the required sections, and is current with the implemented project.

## Required Handoff

Any skill that produces or consumes the report configuration must carry these fields:

- `frameworkTemplateId`
- `pageLayoutConfig`
- `layoutRows`
- `blockAreaConfigMap`
- `componentSlotConfigMap`
- `componentExampleConfigMap`
- `customEChartExampleMap` when needed
- `filterSurfaceMap`
- `toolbarActionMap`
- `interactionBehaviorMap`
- `conclusionRuleMap`
- `DELIVERY_INDEX.md` read/update status
- `docs/prototype-data-summary.md` status
- validation commands and runtime evidence

Readiness is blocked if any visible block or slot cannot be traced through this chain.
Data-bound slots are also blocked when they lack `dataBinding` or a documented static-data reason. Scoped filters are blocked when the path `filters[].scope -> componentSlots[].filterScope -> data/API params` is missing. Configured interactions are blocked when source coordinate, event name, action placement, target type, state response, runtime effect proof, or QA case is missing.
