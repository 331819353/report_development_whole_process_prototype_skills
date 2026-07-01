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
| `2-1 auxMetricArea` | block area | optional |
| `2-2 unitArea` | block area | optional |
| `3 componentArea` | block area slots | yes |
| `4 summaryArea` | block area | optional |

Rules:

- Configure title and note at block level.
- Configure `titlePills` only for block-local compact switches. When a pill changes metric, period, mode, scenario, or data perspective, declare its `filters`, `params`, `props`, `dataBinding`, or `actions`; do not leave it as a visual-only active state.
- Configure summary only for non-duplicative explanation, source, scope, caveat, or data-driven conclusion.
- Do not place shell filters, toolbar actions, unit labels, block titles, or summaries inside `componentSlots`.

Output:

- `titleAreaConfig`
- `pillAreaConfig` or `null` with reason
- `auxMetricAreaConfig` or `null`
- `unitAreaConfig` or `null`
- `summaryAreaConfig` or `null`

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

## Step 8. Validate Runtime Mounting

A slot is ready only when runtime proof exists:

- `componentExampleId` exists in `component-examples/config.ts`.
- component type is exported from `component-examples/index.ts`.
- component type is registered in `widgets/registry.ts`.
- browser DOM contains `.layout-slot-content-widget`.
- fallback label count is `0`.
- component slot height is visible, not collapsed to a few pixels.

## Step 9. Release Validation

Before changing an existing configured project, read or initialize the project root `DELIVERY_INDEX.md` through `delivery-version-management`. After the change, append the current change record to `DELIVERY_INDEX.md`. The record must include changed files, impacted pages/blocks/slots/components, data/API/filter/conclusion impact, validation, `docs/prototype-data-summary.md` status, code-ledger status, and next-change notes.

After data, filters, widgets, generated conclusions, and interactions are configured, create or update:

```text
docs/prototype-data-summary.md
```

The summary must name actual data files, datasets, fields, component bindings, filters, interaction payloads, backend API/model suggestions, gaps, and verification.

Run inside every affected template project:

```bash
npm run validate:dashboard
npm run build:test
```

When a URL is part of the task, start or reuse dev servers and verify:

- pages/nav entries render;
- filters and toolbar do not duplicate;
- every page reaches the bottom on scroll;
- charts/tables/lists adapt to slot size;
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
Data-bound slots are also blocked when they lack `dataBinding` or a documented static-data reason. Scoped filters are blocked when the path `filters[].scope -> componentSlots[].filterScope -> data/API params` is missing. Configured interactions are blocked when source coordinate, event name, action placement, target type, state response, or QA case is missing.
