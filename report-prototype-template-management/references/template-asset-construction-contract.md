# Template Asset Construction Contract

Use this reference before a PRD, workflow, or implementation claims it understands how to build a bundled report template.

This contract follows `configurable-zero-to-one-flow.md`. It replaces the older fixed block-template and legacy slot-fill asset contract.

## Source Of Truth

Inspect the selected framework template asset before writing final layout or implementation rows.

| Asset layer | Source path inside `assets/templates/<template-id>/` | What to extract |
| --- | --- | --- |
| Framework shell | `src/config/dashboard.config.ts` | `screen`, title/logo/theme, `page` or `nav[]`, filters, actions, toolbar/export/fullscreen surfaces. |
| Page config source | `src/report-template-assets/business-report-pages.ts` | `layoutRows`, pages/nav, `createBlockAreaConfig`, `blockAreaConfigMap`, slot helpers, component example bindings. |
| Block area runtime | `src/widgets/templates/block-spans/BaseLayoutSpan.vue` | Runtime block area implementation, slot grid, component example resolution. |
| Block area types | `src/widgets/templates/block-spans/types.ts` | `componentSlots`, `componentSlotContracts`, `componentExampleId`, props/config/data policy shape. |
| Component example catalog | `src/widgets/templates/component-examples/config.ts` | Registered `componentExampleId` values, widget type, visual type, config sections, required data props. |
| Component example exports | `src/widgets/templates/component-examples/index.ts` | Vue component exports available for mounting. |
| Widget registry | `src/widgets/registry.ts` | Registered component type to Vue component mapping. |
| Validator | `src/report-template-assets/blueprint/compatibility.ts`, `scripts/validate-dashboard-contract.mjs` | Contract validation, slot checks, layout checks, component example checks. |
| Data/action extension points | `src/data/dashboard.dataset.json`, `src/dataSources/registry.ts`, `scripts/mock-api-server.mjs`, `scripts/dev-with-mock-api.mjs`, `docs/mock-api-contract.md`, `src/actions/registry.ts` | Dataset/API/filter/action hooks, npm mock API, and interaction hooks. |

Bundled framework templates:

- `topbar-light-scroll-dashboard-template`
- `left-nav-analytics-workbench-template`
- `frozen-title-sci-fi-cockpit-template`

## Required Artifact

Before `blockAreaConfigMap` or `componentExampleConfigMap`, create `templateAssetUnderstandingMap`.

| Field | Required value |
| --- | --- |
| `frameworkTemplateId` | One bundled template id. |
| `assetRoot` | `report-prototype-template-management/assets/templates/<template-id>/`. |
| `shellConfigSource` | `src/config/dashboard.config.ts`; list title/nav/filter/action fields to configure. |
| `pageConfigSource` | `src/report-template-assets/business-report-pages.ts`. |
| `gridContract` | 12 columns, first-screen minimum 8 rows, total `N >= 8`. |
| `dynamicBlockRuntimeSource` | `src/widgets/templates/block-spans/BaseLayoutSpan.vue`. |
| `dynamicBlockCreationApi` | `createBlockAreaConfig`. |
| `dynamicBlockCollectionExport` | `blockAreaConfigMap`. |
| `slotTypeSource` | `src/widgets/templates/block-spans/types.ts`. |
| `componentExampleCatalogSource` | `src/widgets/templates/component-examples/config.ts`. |
| `componentExampleExportSource` | `src/widgets/templates/component-examples/index.ts`. |
| `widgetRegistrySource` | `src/widgets/registry.ts`. |
| `validatorSource` | `src/report-template-assets/blueprint/compatibility.ts` and `scripts/validate-dashboard-contract.mjs`. |
| `assetInspectionStatus` | `ready`, `draft`, or `blocked`. |

## Block Area Construction

Block areas are not selected from fixed size catalogs. Build them from page layout plus slot config.

For every visible block:

- `layoutRows` determines block `cols/rows`.
- `createBlockAreaConfig` creates the widget config.
- `componentRegionPattern` defines slot geometry inside `3 componentArea`.
- `componentSlotContracts` declares slot order, role, and required status.
- `componentSlots` fills each slot with `componentExampleId` plus props/config/data policy.

Required block row fields:

| Field | Meaning |
| --- | --- |
| `blockId` | Stable page block id. |
| `blockCoordinate` | Readable `R-B` coordinate. |
| `layoutRowsSpan` | row/column span derived from `layoutRows`. |
| `componentRegionPattern` | Slot geometry such as `A`, `AB`, `ABC`, `AAB|CCD`. |
| `slotCount` | Distinct slot letters. |
| `componentSlotPattern` | Same as or derived from `componentRegionPattern`. |
| `slotCoordinateList` | `R-B-S` values for all slots. |
| `titleAreaConfig` | Required. |
| `pillAreaConfig` | Config or `null` with reason. If pills change metric, period, mode, scenario, data perspective, props, or interaction state, include their `titlePills[].filters/params/props/dataBinding/actions` impact and affected block/slot coordinates. |
| `componentExampleConfigMap` | Required for every component slot. Include component-owned title, unit, auxiliary metric, chart/table/list, props/config/data binding, and auto-fit evidence when the selected example declares those areas. |
| `summaryAreaConfig` | Config or `null`. |

## Component Example Selection

A component slot is filled only after all checks pass:

1. The slot appears in `slotCoordinateList`.
2. `componentExampleId` exists in `component-examples/config.ts`.
3. The component type is exported from `component-examples/index.ts`.
4. The component type is registered in `widgets/registry.ts`.
5. The row records visual type, props/config/data, metric IDs, filter behavior, state contract, and sample/source evidence.
6. Custom ECharts work is registered before the slot is considered filled.

Common component example ids:

| Component example id | Typical use |
| --- | --- |
| `component-example-catalog:kpi-metric-card` | KPI/metric card. |
| `component-example-catalog:target-progress-card` | Target progress. |
| `component-example-catalog:line-chart-card` | Trend line chart. |
| `component-example-catalog:bar-chart-card` | Bar chart. |
| `component-example-catalog:combo-chart-card` | Bar/line combo chart. |
| `component-example-catalog:proportion-chart-card` | Pie/donut/proportion chart. |
| `component-example-catalog:heatmap-chart-card` | Heatmap matrix. |
| `component-example-catalog:radar-chart-card` | Radar chart. |
| `component-example-catalog:rounded-funnel-chart-card` | Funnel chart. |
| `component-example-catalog:ranking-list-card` | Ranking list. |
| `component-example-catalog:action-list-card` | Action list. |
| `component-example-catalog:conclusion-card` | Conclusion card. |
| `component-example-catalog:detail-table-card` | Detail table. |
| `component-example-catalog:complex-table-card` | Complex table. |
| `component-example-catalog:custom-echart-component-template` | Self-developed ECharts fallback. |

## Custom Component Example Rules

When no existing component example fits:

1. Add the Vue file under `src/widgets/templates/component-examples/`.
2. Export it from `component-examples/index.ts`.
3. Add schema in `component-examples/config.ts`.
4. Register it in `widgets/registry.ts`.
5. Bind it through `componentSlots[].componentExampleId`.

Do not create a custom shell, page layout, block runtime, fixed block wrapper, duplicate filter, duplicate toolbar, or duplicate navigation.

## Build Order

1. Select `frameworkTemplateId`.
2. Record `templateAssetUnderstandingMap`.
3. Configure shell title, logo, nav/page, filters, toolbar/actions, export, permission.
4. Create page previews and `layoutSectionMap`.
5. Create exact `12*N` `layoutRows`.
6. Create `blockAreaConfigMap`.
7. Configure block areas.
8. Declare `componentSlotConfigMap`.
9. Bind registered component examples.
10. Register custom ECharts examples only when needed.
11. Bind data/API/filter/interactions/conclusion rules.
12. Generate or update `docs/prototype-data-summary.md`, including Metric To Interface And Source Mapping and the Mock API To HTTP API Replacement Matrix.
13. Run `npm run ledger:check`, `npm run validate:dashboard`, `npm run build:test`, and runtime checks when a URL exists.

## Hard Stops

- Do not write PRD layout tables without `templateAssetUnderstandingMap`.
- Do not select retired fixed-size wrappers as report blocks.
- Do not use legacy slot-fill maps as active slot fill contracts.
- Do not put parent-block title, pills, filters, summary, or explanation copy inside component slots. Component-owned `unit` and `auxMetrics` are valid only when the registered component example declares and renders them.
- Do not treat `componentRegionPattern` as a component example.
- Do not mark a slot filled before its `componentExampleId` resolves through schema, export, and registry.
