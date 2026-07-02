# Template Layout PRD Contract

Use this reference for the PRD `页面布局配置` section. The goal is to make the PRD directly executable by the latest configurable report-template flow.

This contract follows:

```text
frameworkTemplateId
  -> templateAssetUnderstandingMap
  -> pageLayoutConfig
  -> blockAreaConfigMap
  -> blockAreaConfigMap
  -> componentSlotConfigMap
  -> componentExampleConfigMap
  -> customEChartExampleMap when needed
  -> releaseValidation
```

Do not write PRD layout tables that ask downstream implementation to choose fixed block wrapper files or legacy content-area templates.

## Layer Vocabulary

Use these terms exactly:

| Layer | Meaning | PRD must specify |
| --- | --- | --- |
| `frameworkTemplateId` / 框架模板 | Bundled runtime shell: title, navigation, filters, toolbar, theme, logo, stack. | One bundled template id and why it fits the report scenario. |
| `pageLayoutConfig` / 页面布局配置 | Page-level 12-column grid, readable sections, `layoutRows`, block ids, spans, and scroll policy. | Page ID, nav entry, `layoutSectionMap`, exact `layoutRows`, `blockMap`, `layoutCoordinateMap`. |
| `blockAreaConfigMap` / 分块配置 | Block area configs created by `createBlockAreaConfig` and rendered by `BaseLayoutSpan.vue`. | Block coordinates, spans, area config, slot pattern, slot contracts, and slot list. |
| 槽位配置 | `componentSlots` inside `3 componentArea`. | `R-B-S` coordinate, role, slot key, required status, and binding owner. |
| `componentExampleConfigMap` / 组件示例配置 | Registered component examples mounted into slots. | `componentExampleId`, Vue export/registry proof, visual type, props/config/data binding, states. |
| 自开发 ECharts 组件示例 | New registered component example created only when the catalog has no fit. | File path, export, schema, registry, data contract, validation proof. |

Retired terms:

- Legacy fixed-wrapper block maps as active implementation targets.
- Legacy content-area template maps and ids as active slot-fill targets.
- Size-specific retired fixed-size wrappers report-block selection.
- `componentRegionPattern` as the implementation target. It is only slot geometry metadata.

## Framework Template Selection

Select one bundled framework template:

| Framework template ID | Use when | Main PRD summary |
| --- | --- | --- |
| `topbar-light-scroll-dashboard-template` | Single scrollable report/dashboard with top title/filter/action area. | Normal enterprise report, summary-to-detail reading. |
| `left-nav-analytics-workbench-template` | Multiple meaningful analysis pages needing stable side navigation. | Workbench, business-line pages, detail/analysis subpages. |
| `frozen-title-sci-fi-cockpit-template` | Fixed 1920x1080 command-center/cockpit display. | Frozen title band, dark/cockpit framing, first-screen command view. |

PRD fields:

| Field | Required content |
| --- | --- |
| `frameworkTemplateId` | Exact bundled template id. |
| `selectionReason` | User role, display environment, page count, navigation depth, density. |
| `shellConfigMap` | Title, subtitle, period, owner, logo/theme, native filters, toolbar actions, permission scope. |
| `notAllowedChanges` | Shell surfaces that must not be duplicated inside blocks or components. |

Only interaction behavior and registered component examples may be self-developed. Shell, page layout runtime, block area runtime, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, and permission surfaces are configured, not rebuilt.

## Template Asset Understanding Map

Before `pageLayoutConfig`, write `templateAssetUnderstandingMap` to `prd/execution/prd-template-execution-contract.md`, `prd/execution/prd-template-build-packet-seed.md`, and `prd/children/prd-child-prototype.md`.

| Field | Required content |
| --- | --- |
| `frameworkTemplateId` | Selected bundled template id. |
| `assetRoot` | `report-prototype-template-management/assets/templates/<template-id>/`. |
| `shellConfigSource` | `src/config/dashboard.config.ts`. |
| `pageConfigSource` | `src/report-template-assets/business-report-pages.ts`. |
| `gridContract` | 12 columns, page rows `N >= 8`, exact row strings, and visible top-level block row span `N >= 3`. |
| `dynamicBlockRuntimeSource` | `src/widgets/templates/block-spans/BaseLayoutSpan.vue`. |
| `dynamicBlockCreationApi` | `createBlockAreaConfig`. |
| `dynamicBlockCollectionExport` | `blockAreaConfigMap`. |
| `slotTypeSource` | `src/widgets/templates/block-spans/types.ts`. |
| `componentExampleCatalogSource` | `src/widgets/templates/component-examples/config.ts`. |
| `componentExampleExportSource` | `src/widgets/templates/component-examples/index.ts`. |
| `widgetRegistrySource` | `src/widgets/registry.ts`. |
| `validatorSource` | `scripts/validate-dashboard-contract.mjs` and blueprint compatibility files. |
| `assetInspectionStatus` | `ready`, `draft`, or `blocked`. |

## Page Preview First

Before technical tables, every retained page or navigation tab needs a reader-facing Markdown/mermaid preview in the main PRD. It must show:

- Visible filters and toolbar actions.
- First-viewport blocks and their business purpose.
- The reading path from conclusion to evidence, cause, detail, and action.
- Major interaction entry points.

Raw IDs, full `layoutRows`, component example binding, data/API matrices, and Template Build Packet rows belong in execution files and child PRDs, not in the readable main PRD body.

## Layout Section Map

Before raw `layoutRows`, write a readable `layoutSectionMap`.

| Page ID | Section No (`R`) | Section name | Business purpose | Section grid | Row count | Local row preview | Global row range | Block coordinates |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Each section grid is `12*K`; `Row count = K`.
- The page total row count is the sum of section row counts and must be `N >= 8`.
- Local previews may reuse letters for readability, but final machine `layoutRows` must use globally unique block ids or a section-scoped mapping.
- `Section No` is the `R` in block coordinate `R-B` and slot coordinate `R-B-S`.
- Section examples must not imply an implementable top-level block with row span `N < 3`. If a source asks for a shorter strip, fold it into a legal `N >= 3` block or treat it as internal component/sub-block sizing.

## Page Layout Rows

For every page:

| Field | Required content |
| --- | --- |
| `pageId` | Stable `PAGE-*` id. |
| `navId` | Navigation entry or `none`. |
| `layoutRows` | Exact 12-character row strings. |
| `layoutRowsAudit` | Row index, string, column count exactly 12, block letters, pass/fail. |
| `blockMap` | Block id, business purpose, row/col start, row/col span. |
| `layoutCoordinateMap` | `blockCoordinate`, `slotCoordinate`, and standard area coordinates. |
| `scrollPolicy` | Fixed first screen, vertical scroll, or nav split. |
| `responsivePolicy` | Usually fixed 1920 design frame unless the requirement says otherwise. |

Rules:

- A row with fewer or more than 12 cells is invalid.
- A page with fewer than 8 rows is invalid.
- Each block must form one rectangle.
- Every visible block's `rowSpan` is the block `N` in `M*N` and must be `N >= 3`.
- A source/requested `N < 3` top-level block is invalid for handoff until normalized to a legal block, merged into adjacent content, represented as internal component/sub-block sizing, or recorded as a blocker.
- Every visible block has one `blockMap` row and one `blockAreaConfigMap` row.
- Proportional prose such as `8+4`, screenshots, or preview diagrams can explain intent but cannot replace `layoutRows`.

## Block Area Config Map

In the PRD and Template Build Packet, name this section `blockAreaConfigMap`.

For every visible block:

| Block ID | Block coordinate | Page ID | Section No | `PATH-*` source | 4B gate IDs | Business purpose | Row start | Row span | Col start | Col span | `componentRegionPattern` | Slot count | `componentSlotPattern` | Slot coordinate list | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- The implementation target is `createBlockAreaConfig(...)`.
- `layoutRows` decides the block span; do not select fixed retired fixed-size wrappers report blocks.
- `Row span` is the block `N` in `M*N` and must be `N >= 3` for every visible top-level block.
- `componentRegionPattern` only describes internal slot geometry.
- `Slot count` equals distinct slot groups in the pattern.
- `Slot coordinate list` enumerates all declared slots, such as `2-2-1`, `2-2-2`, `2-2-3`.
- A block is not ready when it lacks `PATH-*` source unless it is explicitly support/source/export/permission-only.

## Block Area Config Map

For every block, write `blockAreaConfigMap`.

| Block ID | Block coordinate | `titleAreaConfig` | `pillAreaConfig` | `summaryAreaConfig` | Component-owned unit/aux evidence | Status |
| --- | --- | --- | --- | --- | --- | --- |

Rules:

- `titleAreaConfig` is required.
- Optional areas are configured or set to `null` with `notNeededReason`.
- Business conclusions in `summaryAreaConfig` must reference `conclusionRuleId`.
- When `summaryAreaConfig` is visible, its height/ratio follows the template runtime default of `1/(N+1)` for the block row span `N`; PRD text must not specify a stale fixed row or fixed-pixel summary ratio.
- Do not put parent-block title, pills, filters, descriptions, or summary/explanation copy into component slots.
- Units and auxiliary information are component-owned only when the registered component example declares `unit` / `auxMetrics`; record those fields in `componentExampleConfigMap`, not as block-level `auxMetricAreaConfig` or `unitAreaConfig`.
- Component examples with `auxMetrics` must default the auxiliary information area between the component title strip and the chart/table/list body: horizontal component layout uses a horizontal strip with each key/value stacked vertically; vertical component layout uses a vertical strip with each key/value on one line.

## Component Slot Config Map

For every `3 componentArea` slot:

| Slot ID | Slot coordinate | Block ID | Block coordinate | Slot key | Slot role | Required? | Component slot size | Expected visual/evidence role | Data owner | Interaction owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- `Slot coordinate` uses `R-B-S`.
- Slot rows must trace to a declared `Slot coordinate list` in `blockAreaConfigMap`.
- Slot rows are empty containers until `componentExampleConfigMap` binds a registered component example.
- Text, prose, placeholder copy, `visualType` alone, or inline widget objects do not fill a slot.

## Component Example Config Map

For every slot fill:

| Slot ID | Slot coordinate | `componentExampleId` | Component type | Vue file/export | Registry proof | Visual type | Props/config | Metric IDs | Data object/API | State contract | `conclusionRuleId` | Fallback |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- `componentExampleId` must exist in `src/widgets/templates/component-examples/config.ts`.
- Component type must be exported from `src/widgets/templates/component-examples/index.ts`.
- Component type must be registered in `src/widgets/registry.ts`.
- Every metric id appears in the metric dictionary and metric mounting matrix.
- Every chart/table/list/card state includes loading, empty, error, no-permission, and insufficient-data behavior where applicable.
- If the component renders a normal-state conclusion, it must bind `conclusionRuleId`.

## Custom ECharts Example Map

If no catalog example fits, create `customEChartExampleMap` before implementation readiness.

| Field | Required content |
| --- | --- |
| `exceptionId` | Stable `EX-*` id. |
| `type` | `componentExample`. |
| `sourceSlotCoordinate` | `R-B-S`. |
| `reasonNoCatalogFit` | Concrete reason. |
| `vueFile` | New file under `src/widgets/templates/component-examples/`. |
| `exportProof` | Export from `component-examples/index.ts`. |
| `schemaProof` | Entry in `component-examples/config.ts`. |
| `registryProof` | Mapping in `src/widgets/registry.ts`. |
| `dataContract` | Props, dataset/API, metrics, states, interactions. |
| `validation` | Validator/build/runtime proof. |

This fallback does not justify a new shell, new page layout system, fixed block wrapper, duplicate filter bar, duplicate toolbar, or duplicate navigation.

## Data, Filters, Interactions

Every PRD must include:

| Map | Required content |
| --- | --- |
| `filterSurfaceMap` | Native template filter id, label, control type, option source, default value, affected blocks/slots, query params, permission scope, reset behavior, states. |
| `toolbarActionMap` | Template toolbar action id, icon/label, permission, payload, export/fullscreen/help behavior, states. |
| `pillAreaConfig` | Block-level compact switches, affected slot/component/API params, reset behavior. |
| `interactionBehaviorMap` | Component-owned or template-action-hook interactions: trigger, source, target, payload, context inheritance, close/back behavior, QA case. |

Shell/page filters use the template-native filter surface. Component slots do not own global filters or block support areas.

## Dynamic Conclusion Binding

| Target | Placement rule | Required binding |
| --- | --- | --- |
| `summaryAreaConfig` | Use only when the block has no conclusion component. | `conclusionRuleId`, input metrics/API fields, logic, output fields, fallback. |
| Conclusion component example | Mounted in `3 componentArea`. | Slot `conclusionRuleId`, component example id, input metrics/API, states. |
| Static note | Source/scope/caveat/definition/action note only. | Note type, copy, visibility/export rule. |

Do not hardcode final normal-state business conclusions in mock data, static props, or template defaults.

## Readiness Gates

- Every retained page has a reader-facing preview before technical tables.
- `templateAssetUnderstandingMap` is current and written back to all required PRD artifacts.
- Every page has `layoutSectionMap`, exact `layoutRows`, `blockMap`, and `layoutCoordinateMap`.
- Every visible block has one `blockAreaConfigMap` row created for `createBlockAreaConfig`.
- Every visible top-level block has `rowSpan >= 3`; no ready PRD artifact contains an implementable `M*N` block where `N < 3`.
- Visible `summaryAreaConfig` rows inherit the template `1/(N+1)` ratio and do not carry stale fixed-height summary sizing.
- Every block has `blockAreaConfigMap`.
- Every component slot has one `componentSlotConfigMap` row.
- Every filled slot has one `componentExampleConfigMap` row with schema/export/registry proof.
- Every custom ECharts component is registered as a component example before the slot is ready.
- No fixed retired fixed-size wrappers wrapper or legacy component example map is used as an active implementation target.
- No component slot carries title/pill/filter/aux/unit/summary content.
- Every filter, pill, toolbar action, and component interaction has visible owner, affected data/API params, refresh scope, states, and QA case.
- Template-backed PRD handoff includes a Template Build Packet seed aligned with `report-prototype-template-management/references/template-build-packet-contract.md`.
