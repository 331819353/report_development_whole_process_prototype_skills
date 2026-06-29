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

### 3. Page Registry

One row per retained page/navigation entry.

| Page ID | Nav label | Page purpose | Reader preview ref | `layoutRows` status | First viewport question | Owner role | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Every retained nav page must have a reader preview ref from PRD section 4C.
- A nav page without enough business content must be merged, deferred, or blocked.

### 4. Page Layout Rows

One table per page.

| Page ID | Row index | `layoutRow` | Column count | Over-12 check | Block letters | Status |
| --- | --- | --- | --- | --- | --- | --- |

Rules:

- `layoutRow` has exactly 12 visible cells.
- No row may exceed 12 cells.
- Each page has at least 8 rows.
- Every block letter forms a rectangle.

### 5. Block Map

One row per visible block.

| Block ID | Page ID | Business name | Reading path source | Gate source | Row start | Row span | Col start | Col span | Block layout template | Block layout Vue file | Slot count | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- `Block layout Vue file` must be an independent selectable block layout file.
- `componentRegionPattern` may appear only as derived compatibility metadata, not as the selected template.

### 6. Standard Block Areas

One row per block.

| Block ID | `titleAreaConfig` | `pillAreaConfig` | `auxMetricAreaConfig` | `unitAreaConfig` | `summaryAreaConfig` | Status |
| --- | --- | --- | --- | --- | --- | --- |

Rules:

- `titleAreaConfig` is required.
- Optional areas must be configured or set to `null` with `notNeededReason`.
- Business conclusions in `summaryAreaConfig` must reference a `conclusionRuleId`.

### 7. Component Slot Fills

One row per `3 componentArea` slot.

| Slot ID | Block ID | Slot role | Component content area template ID | Standalone Vue file | Copy source | Copy target | Visual type | Metric IDs | Data object/API | Props/state contract | `conclusionRuleId` | Fallback |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Text, prose, placeholder copy, and `visualType` alone do not fill a slot.
- If no existing component content area template fits, create a `selfDevelopmentExceptionMap` row with `type: componentContentAreaTemplate`, then register the new standalone Vue file before treating the slot as filled.

### 8. Data, API, Filters, And Interactions

#### Data/API

| Data/API ID | Type | Grain | Required fields | Metrics/conclusion inputs | Source file/API | Used by slots | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

#### Filters And Actions

| Control ID | Owner | Visible surface | Label | Type | Default | Query/API params | Affected pages/blocks/slots | Reset/refresh behavior | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

#### Interaction Behavior

| Interaction ID | Trigger owner | Source page/block/slot | Trigger | Target type | Payload fields | Context inheritance | Close/back behavior | Permission rule | QA case | Status |
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
| `src/config/dashboard.config.ts` | 2, 3, 4, 5, 6, 8 | shell/page/block/filter/action config | yes | `npm run validate:dashboard` |
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
- Any `layoutRow` is not exactly 12 cells or the page has fewer than 8 rows.
- Any block lacks a block layout Vue file.
- Any component slot lacks a registered component content area template ID and standalone Vue file.
- Any dynamic conclusion lacks a rule row.
- Any filter/action/interaction lacks visible owner, payload/params, affected scope, and state behavior.
- The implementation edits source files that are not named in section 11 without updating the packet first.
