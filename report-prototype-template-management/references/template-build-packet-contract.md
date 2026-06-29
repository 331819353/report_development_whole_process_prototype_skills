# Template Build Packet Contract

Use this reference when a weak or literal model must configure and implement a report template from documents. The packet is the single construction plan between PRD/design documents and copied template source files.

## Purpose

The packet normalizes PRD, component mapping, layout, data/API, interaction, and conclusion rules into one fixed-field artifact. Template implementation must read the packet first and then edit the copied template from packet rows only.

Do not implement directly from scattered prose, screenshots, PRD paragraphs, or chat memory when a packet is required.

## When Required

Create or update a Template Build Packet before bundled-template implementation when any of these are true:

- The work starts from a PRD.
- The report has more than one page or navigation entry.
- The report has filters, toolbar actions, pills, drilldown, jump, modal, drawer, popup, or export.
- The report has dynamic conclusions, conclusion cards, or analysis insight components.
- The implementation copies a bundled Vue template project.

The packet may live in the PRD appendix, a workflow handoff document, or `docs/template-build-packet.md` inside the copied prototype project. For implementation, prefer a real project file so later agents can re-open it.

## Weak-Model Rules

- One field, one value. Avoid sentences that hide multiple decisions.
- Use fixed field names exactly as written below.
- Use readable layout coordinates for every block and component slot: `blockCoordinate` is `R-B`; `slotCoordinate` is `R-B-S`. `R` is the layout section/page region number, not a raw grid row. Example: if section 2 has two `6*3` blocks, the second block is `2-2`, and its first component slot is `2-2-1`.
- Standard block areas use `blockCoordinate + areaName`, such as `2-2:titleArea`; the third number is reserved for component slots only.
- Do not confuse page coordinates with block-layout internal area codes such as `1-1 titleArea` and `1-2 pillArea`. A standard area row should keep `blockCoordinate`, `areaCode`, and `areaCoordinate` distinct when needed.
- Split page layout into `layoutSectionMap` before raw rows. A page may be `12*2 + 12*3 + 12*3`; each part must state its section number, business purpose, row count, local row preview, and global row range.
- Declare block slots before component mapping. Every block map row must include `slotCount`, `componentSlotPattern` such as `A`, `AB`, `AAB`, or `AABBCC`, and the full `slotCoordinateList`.
- Create `templateAssetUnderstandingMap` before selecting block layout or component content area templates. Use `template-asset-construction-contract.md`.
- Use `TBD(GAP-*)` for missing implementation-critical values.
- Use `none` only when the value is truly not applicable.
- Do not infer from a nearby section when a required packet field is empty.
- Do not edit source files until packet sections 0-10 are `ready` or explicitly `deferred` for the affected implementation scope; optional field values may be `none` only when truly not applicable.
- If a row is `blocked`, stop the affected implementation step and return to the owning document/skill.

## Required Packet Sections

### 0. Packet Status

| Field | Required value |
| --- | --- |
| `packetId` | Stable id such as `TBP-EXPERIENCE-DASHBOARD`. |
| `packetStatus` | `ready`, `draft`, or `blocked`. |
| `sourcePrd` | PRD path/name/version. |
| `targetTemplateId` | One bundled framework template id. |
| `targetProjectPath` | Copied project path or `TBD(GAP-TARGET-PATH)`. |
| `implementationMode` | Must default to `copyTemplateProject`. |
| `outputArtifact` | Must default to `vueTemplatePrototype`. |

### 1. Source Authority

| Source ID | Source type | Authority level | Used for | Not allowed to decide |
| --- | --- | --- | --- | --- |

Rules:

- PRD/source mentions of HTML are evidence only unless the latest explicit user request asks for HTML/static output.
- Screenshots or old pages are visual/content evidence, not permission to create custom shell/page/block templates.

### 2. Framework And Shell

| Field | Required value |
| --- | --- |
| `frameworkTemplateId` | `topbar-light-scroll-dashboard-template`, `left-nav-analytics-workbench-template`, or `frozen-title-sci-fi-cockpit-template`. |
| `copySourcePath` | `assets/templates/<template-id>/`. |
| `copyTargetPath` | Target path. |
| `pageTitle` | Shell title. |
| `subtitle` | Subtitle or `none`. |
| `navMode` | `singlePage`, `leftNav`, or `fixedCockpit`. |
| `nativeFilterSurface` | Existing template filter surface to configure. |
| `toolbarSurface` | Existing template toolbar/action surface to configure. |
| `permissionScope` | Data visibility scope. |

### 2A. Template Asset Understanding Map

One row per selected framework template.

| Field | Required value |
| --- | --- |
| `frameworkTemplateId` | Selected template id. |
| `assetRoot` | `assets/templates/<template-id>/`. |
| `shellConfigSource` | `src/config/dashboard.config.ts` plus fields to configure. |
| `pageLayoutId` | Current default `12x8-1920x1080`, or selected layout asset id. |
| `gridContract` | 12 columns, first-screen 8 rows, total `N >= 8`. |
| `blockSpanContract` | Minimum `2x2`, legal span `M >= N`, rectangular block rule. |
| `blockLayoutLibrarySource` | `src/widgets/templates/block-spans/`. |
| `directSelectableBlockTemplates` | Direct slot-bearing Vue files available for selected blocks. |
| `sizeOnlyWrappersUsed` | Must be `none`, or `TBD(GAP-BLOCK-LAYOUT-TEMPLATE-*)` with blocked/partial status. |
| `componentContentAreaLibrarySource` | `src/widgets/templates/component-content-areas/`. |
| `widgetSchemaSource` | `src/report-template-assets/blueprint/widget-config-schemas.ts`. |
| `validatorSource` | `src/report-template-assets/blueprint/compatibility.ts` and `scripts/validate-dashboard-contract.mjs`. |
| `assetInspectionStatus` | `ready`, `draft`, or `blocked`. |

Rules:

- Direct selectable block templates include size plus slot pattern, such as `Span04x03SingleSlotLayout.vue` or `Span06x03TripleSlotLayout.vue`.
- Size-only wrappers such as `Span04x03Layout.vue` are not complete block layout templates for PRD/workflow readiness.
- Component slot fills must include visual-type size compatibility evidence from `widgetSchemaSource`.

### 3. Page Registry

One row per retained page/navigation entry.

| Page ID | Nav label | Page purpose | Reader preview ref | `layoutRows` status | First viewport question | Owner role | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Every retained nav page must have a reader preview ref from PRD section 4C.
- A nav page without enough business content must be merged, deferred, or blocked.

### 3A. Layout Section Map

One row per readable page section.

| Page ID | Section No (`R`) | Section name | Business purpose | Section grid | Row count | Local row preview | Global row range | Section block coordinates | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- `Section grid` must be `12*K`; `Row count` must equal `K`.
- The sum of all section row counts for a page is the page `N`, and `N >= 8`.
- Local row preview may use local `A/B/C` letters for readability, but final machine `layoutRows` must disambiguate repeated local letters across sections.
- `Section No` defines the `R` part of `blockCoordinate` and `slotCoordinate`.

### 4. Page Layout Rows

One table per page.

| Page ID | Section No (`R`) | Row index | `layoutRow` | Column count | Over-12 check | Block letters | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- `layoutRow` has exactly 12 visible cells.
- No row may exceed 12 cells.
- Each page has at least 8 rows.
- Every block letter forms a rectangle.
- `Section No` must match section 3A and defines the `R` part of `R-B` and `R-B-S`; it is the visual/business section, not every raw grid line.

### 5. Block Map

One row per visible block.

| Block ID | Block coordinate | Page ID | Section No (`R`) | Business name | Reading path source | Gate source | Row start | Row span | Col start | Col span | Block layout template | Block layout Vue file | Asset availability | Slot count | Component slot pattern | Slot coordinate list | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- `Block layout Vue file` must be an independent selectable block layout file.
- `Asset availability` must be `direct-selectable`; if the block only has a size-only wrapper, mark `TBD(GAP-BLOCK-LAYOUT-TEMPLATE-*)`.
- `componentRegionPattern` may appear only as derived compatibility metadata, not as the selected template.
- `Block coordinate` must be unique on the page and must match the page preview, layout section/page region, and left-to-right block order.
- `Slot count` must equal the distinct slot groups in `Component slot pattern`.
- `Component slot pattern` belongs to the block template's `3 componentArea`, not page `layoutRows`.
- `Slot coordinate list` must enumerate every component slot that section 7 will fill.

### 6. Standard Block Areas

One row per block.

| Block ID | Block coordinate | `titleAreaConfig` | `pillAreaConfig` | `auxMetricAreaConfig` | `unitAreaConfig` | `summaryAreaConfig` | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- `titleAreaConfig` is required.
- Optional areas must be configured or set to `null` with `notNeededReason`.
- Business conclusions in `summaryAreaConfig` must reference a `conclusionRuleId`.
- Each standard area target must be addressable as `blockCoordinate + areaName`, for example `2-2:pillArea` or `2-2:summaryArea`.

### 7. Component Slot Fills

One row per `3 componentArea` slot.

| Slot ID | Slot coordinate | Block ID | Block coordinate | Slot pattern code | Slot role | Component slot size | Component content area template ID | Standalone Vue file | Copy source | Copy target | Visual type | Size compatibility | Metric IDs | Data object/API | Props/state contract | `conclusionRuleId` | Fallback |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Text, prose, placeholder copy, and `visualType` alone do not fill a slot.
- `Slot coordinate` must follow the selected block layout template slot order. A SingleSlot block has only `R-B-1`; a DoubleSlot block has `R-B-1` and `R-B-2`.
- `Slot coordinate` must appear in section 5 `Slot coordinate list`.
- `Size compatibility` must cite `widgetSchemaSource`; incompatible visual type and slot size blocks readiness.
- If no existing component content area template fits, create a `selfDevelopmentExceptionMap` row with `type: componentContentAreaTemplate`, then register the new standalone Vue file before treating the slot as filled.

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

Rules:

- Global/page filters use the template-native filter surface.
- Block-local compact switches use `pillArea`.
- Drilldown, jump, drawer, modal, and popup can be self-developed only as component-owned behavior or template action hooks.

### 9. Dynamic Conclusion Rules

| Rule ID | Display target | Inputs | Trigger state | Logic/threshold | Output template | Evidence fields | Fallback | QA case | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Normal-state business conclusions are generated from data.
- Static copy is allowed only for source, scope, caveat, definition, action note, or empty/permission/insufficient-data fallback.

### 10. Self-Development Exception Map

| Exception ID | Type | Source page/block/slot | Reason no template fits | Allowed file/behavior | Registration target | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

Allowed `Type` values:

- `interactionBehavior`
- `componentContentAreaTemplate`

All other custom shell/page/block/supporting-area work is blocked or out of scope.

### 11. Implementation File Plan

| Target file | Packet sections consumed | Edit type | Ledger required | Validation command |
| --- | --- | --- | --- | --- |
| `src/config/dashboard.config.ts` | 2, 2A, 3, 3A, 4, 5, 6, 8 | shell/page/block/filter/action config | yes | `npm run validate:dashboard` |
| `src/data/dashboard.dataset.json` | 8, 9 | offline/mock data | yes | `npm run validate:dashboard` |
| `src/dataSources/registry.ts` | 8, 9 | API/provider resolver | yes | `npm run validate:dashboard` |
| `src/widgets/templates/component-content-areas/*.vue` | 7, 10 | component content area template | yes | `npm run validate:dashboard` |
| `src/widgets/components/*.vue` | 7, 8, 9, 10 | business widget/component behavior | yes | `npm run validate:dashboard` |
| `docs/prototype-data-summary.md` | 8, 9, 10 | backend-facing data handoff | no | manual freshness check |

### 12. Validation Plan

| Validation ID | Command/evidence | Must pass before |
| --- | --- | --- |
| `VAL-LEDGER-INIT` | `npm run ledger:init` after copy | first source edit |
| `VAL-LEDGER-CHECK` | `npm run ledger:check` | handoff |
| `VAL-DASHBOARD` | `npm run validate:dashboard` | build/readiness |
| `VAL-BUILD` | `npm run build` | preview/readiness |
| `VAL-GEOMETRY` | `npm run visual:geometry -- --url <url>` when URL exists | visual readiness |
| `VAL-DATA-SUMMARY` | `docs/prototype-data-summary.md` current with data/config/widgets/filters/interactions | backend-facing handoff |
| `VAL-COORDINATES` | Coordinates are unique and consistent across page preview, `layoutRows`, block map, standard areas, component slots, metric mounting, conclusion rules, and interactions | source edits/readiness |
| `VAL-LAYOUT-SECTIONS` | `layoutSectionMap` row counts sum to `N`, each section is exact `12*K`, final `layoutRows` disambiguate repeated local letters, and all block coordinates use section numbers correctly | source edits/readiness |
| `VAL-SLOT-PATTERNS` | Every block declares `slotCount`, `componentSlotPattern`, and `slotCoordinateList`; every component content area map row consumes one declared slot | source edits/readiness |
| `VAL-ASSET-UNDERSTANDING` | `templateAssetUnderstandingMap` is present, asset sources exist, block templates are direct selectable files, and slot visual types are size-compatible | source edits/readiness |

## Execution Loop

Use this loop for weak-model implementation:

1. Open the packet.
2. Pick the next packet row with `Status: ready` that maps to the current implementation step.
3. Edit only the target file named in section 11.
4. Mark which packet section and row the edit consumed in the code ledger or implementation notes.
5. Run the smallest validation command for that row.
6. If validation fails, repair the row/file pair before moving to another packet row.

Do not edit multiple unrelated packet rows in one source change when a smaller row-by-row edit is possible.

## Readiness Gate

Template implementation is not ready when:

- The packet is missing.
- The packet is `blocked`.
- Sections 0-9 contain blank required fields.
- Any required field uses prose instead of a fixed ID/path/value.
- Any page lacks a 4C reader preview ref.
- Section 2A `templateAssetUnderstandingMap` is missing, stale, or `blocked`.
- Any page lacks a `layoutSectionMap`, section row counts do not sum to `N`, or any section is not exact `12*K`.
- Any `layoutRow` is not exactly 12 cells or the page has fewer than 8 rows.
- Any visible block lacks `blockCoordinate`, any component slot lacks `slotCoordinate`, or coordinates conflict across packet sections.
- Any block lacks `slotCount`, `componentSlotPattern`, or `slotCoordinateList`.
- Any block lacks a block layout Vue file.
- Any block selects a size-only wrapper as a direct slot-bearing template.
- Any component slot lacks a registered component content area template ID and standalone Vue file.
- Any component slot lacks visual-type size compatibility evidence.
- Any dynamic conclusion lacks a rule row.
- Any filter/action/interaction lacks visible owner, payload/params, affected scope, and state behavior.
- The implementation edits source files that are not named in section 11 without updating the packet first.
