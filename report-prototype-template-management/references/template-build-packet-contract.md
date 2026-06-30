# Template Build Packet Contract

Use this reference when a weak or literal model must configure and implement a report template from documents. The packet is the single construction plan between PRD/design documents and configured template source files.

This contract follows the latest configurable flow:

```text
frameworkTemplateId
  -> pageLayoutConfig
  -> blockAreaConfigMap
  -> blockAreaConfigMap
  -> componentSlotConfigMap
  -> componentExampleConfigMap
  -> customEChartExampleMap when needed
  -> releaseValidation
```

Do not implement directly from scattered prose, screenshots, PRD paragraphs, or chat memory when a packet is required.

## Weak-Model Rules

- One field, one value.
- Use `R-B` for blocks and `R-B-S` for component slots.
- Split page layout into `layoutSectionMap` before raw `layoutRows`.
- Declare block area slots before component examples.
- Create `templateAssetUnderstandingMap` before selecting component examples.
- Use `TBD(GAP-*)` for missing implementation-critical values.
- Use `none` only when truly not applicable.
- Do not edit source files until packet sections 0-10 are `ready` or explicitly `deferred` for the affected scope.

## Required Packet Sections

### 0. Packet Status

| Field | Required value |
| --- | --- |
| `packetId` | Stable id. |
| `packetStatus` | `ready`, `draft`, or `blocked`. |
| `sourcePrd` | PRD path/name/version. |
| `targetTemplateId` | One bundled framework template id. |
| `targetProjectPath` | Configured template project path or `TBD(GAP-TARGET-PATH)`. |
| `configurableFlowStatus` | `ready`, `draft`, or `blocked`; blockers name template gaps instead of alternate implementation routes. |
| `runtimeStack` | Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios. |

### 1. Source Authority

| Source ID | Source type | Authority level | Used for | Not allowed to decide |
| --- | --- | --- | --- | --- |

Rules:

- PRD/source mentions of HTML are evidence only unless the latest explicit user request asks for HTML/static output.
- Screenshots or old pages are visual/content evidence, not permission to create custom shell/page/block templates.

### 2. Framework And Shell

| Field | Required value |
| --- | --- |
| `frameworkTemplateId` | Bundled template id. |
| `copySourcePath` | `assets/templates/<template-id>/`. |
| `copyTargetPath` | Target path. |
| `pageTitle` | Shell title. |
| `navMode` | `singlePage`, `leftNav`, `topbar`, or `fixedCockpit`. |
| `nativeFilterSurface` | Existing template filter surface to configure. |
| `toolbarSurface` | Existing toolbar/action surface to configure. |
| `permissionScope` | Data visibility scope. |

### 2A. Template Asset Understanding Map

| Field | Required value |
| --- | --- |
| `assetRoot` | `assets/templates/<template-id>/`. |
| `shellConfigSource` | `src/config/dashboard.config.ts`. |
| `pageConfigSource` | `src/report-template-assets/business-report-pages.ts`. |
| `gridContract` | 12 columns, `N >= 8`. |
| `dynamicBlockRuntimeSource` | `src/widgets/templates/block-spans/BaseLayoutSpan.vue`. |
| `dynamicBlockCreationApi` | `createBlockAreaConfig`. |
| `dynamicBlockCollectionExport` | `blockAreaConfigMap`. |
| `componentExampleCatalogSource` | `src/widgets/templates/component-examples/config.ts`. |
| `componentExampleExportSource` | `src/widgets/templates/component-examples/index.ts`. |
| `widgetRegistrySource` | `src/widgets/registry.ts`. |
| `validatorSource` | `scripts/validate-dashboard-contract.mjs`. |

### 3. Page Registry

| Page ID | Nav label | Page purpose | Reader preview ref | `layoutRows` status | First viewport question | Owner role | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

### 3A. Layout Section Map

| Page ID | Section No (`R`) | Section name | Business purpose | Section grid | Row count | Local row preview | Global row range | Section block coordinates | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

### 4. Page Layout Rows

| Page ID | Section No (`R`) | Row index | `layoutRow` | Column count | Over-12 check | Block letters | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- `layoutRow` has exactly 12 cells.
- Each page has at least 8 rows.
- Every block letter forms a rectangle.

### 5. Block Area Config Map

| Block ID | Block coordinate | Page ID | Section No | Business name | Reading path source | Gate source | Row start | Row span | Col start | Col span | `componentRegionPattern` | Slot count | Component slot pattern | Slot coordinate list | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- One row per visible block.
- The block implementation is `createBlockAreaConfig` rendered by `BaseLayoutSpan.vue`.
- Fixed retired fixed-size wrappers wrappers are not valid report block selections.

### 6. Standard Block Areas

| Block ID | Block coordinate | `titleAreaConfig` | `pillAreaConfig` | `auxMetricAreaConfig` | `unitAreaConfig` | `summaryAreaConfig` | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- `titleAreaConfig` is required.
- Optional areas must be configured or set to `null` with `notNeededReason`.
- Business conclusions in `summaryAreaConfig` must reference `conclusionRuleId`.

### 7. Component Slot Example Fills

| Slot ID | Slot coordinate | Block ID | Block coordinate | Slot pattern code | Slot role | Component slot size | `componentExampleId` | Component type | Vue file/export | Registry proof | Visual type | Props/config | Metric IDs | Data object/API | State contract | `conclusionRuleId` | Fallback |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Text, prose, placeholder copy, and `visualType` alone do not fill a slot.
- `componentExampleId` must exist in `component-examples/config.ts`.
- Component type must be exported from `component-examples/index.ts`.
- Component type must be registered in `widgets/registry.ts`.
- If no existing component example fits, register a custom ECharts component example before treating the slot as filled.

### 8. Data, API, Filters, And Interactions

#### Data/API

| Data/API ID | Type | Grain | Required fields | Metrics/conclusion inputs | Source file/API | Used by slot coordinates | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

#### Filters And Actions

| Control ID | Owner | Visible surface | Label | Type | Default | Query/API params | Affected pages/blocks/slot coordinates | Reset/refresh behavior | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

#### Interaction Behavior

| Interaction ID | Trigger owner | Source page/block/slot coordinate | Trigger | Target type | Payload fields | Context inheritance | Close/back behavior | Permission rule | QA case | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

### 9. Dynamic Conclusion Rules

| Rule ID | Display target | Inputs | Trigger state | Logic/threshold | Output template | Evidence fields | Fallback | QA case | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

### 10. Self-Development Exceptions

| Exception ID | Type | Source page/block/slot | Reason | Files | Registration proof | Validation | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

Allowed types:

- `componentExample`
- `interactionBehavior`

### 11. Target Files And Validation

| Target file | Packet sections consumed | Change type | Validation command |
| --- | --- | --- | --- |

Required validation:

- `npm run ledger:check`
- `npm run validate:dashboard`
- `npm run build:test`
- runtime mount proof when URL exists

## Readiness Blockers

The packet is not ready when:

- Any page lacks exact 12-column `layoutRows`.
- Any block lacks a block area config row.
- Any slot lacks `componentExampleId`.
- Any `componentExampleId` is missing from schema/export/registry.
- A fixed block wrapper is used as the report block implementation.
- A component slot carries title/pill/filter/aux/unit/summary content.
- A custom ECharts component is not registered.
- Validation commands are missing.
