# Block Area Template

`BaseLayoutSpan.vue` is the only runtime implementation for block layout templates.

Selectable block area configs are created by `createBlockAreaConfig` and exposed through `blockAreaConfigMap` in `src/report-template-assets/business-report-pages.ts`.

## Contract

- Page layout decides the block size.
- `WidgetRenderer` injects `cols` and `rows` into `BaseLayoutSpan` from the actual `layoutRows` block.
- Template config does not select fixed size wrappers and does not encode a separate size field.
- Template config only describes title/summary areas, `componentRegionPattern`, `componentSlotContracts`, and `componentSlots`.
- Each component slot binds a configurable component example through `componentExampleId`.
- When no existing component example fits, bind `component-example-catalog:custom-echart-component-template`.

## Areas

Every block area keeps the same structural areas:

- `1-1 titleArea`
- `1-2 pillArea`
- `2-1 auxMetricArea`
- `2-2 unitArea`
- `3 componentArea`
- `4 summaryArea`

Only title and component area are required. Summary, pills, and auxiliary metrics belong to the block template, not to the component slot.

## Removed Legacy Shape

The old fixed wrapper family has been removed:

- no fixed-size wrapper family
- no size-specific slot variants
- no selectable fixed-size catalog
- no wrapper id or size-field selection contract

Use one block area config plus slot configuration instead.
