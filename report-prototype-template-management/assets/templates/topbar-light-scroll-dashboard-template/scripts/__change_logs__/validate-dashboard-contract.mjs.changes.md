# Code Change Ledger: scripts/validate-dashboard-contract.mjs

- Code file: `scripts/validate-dashboard-contract.mjs`
- Ledger file: `scripts/__change_logs__/validate-dashboard-contract.mjs.changes.md`
- Purpose: Validate dashboard template contracts before build/preview handoff.
- Primary features: layout/grid validation, widget contract validation, component-source renderer checks, stack-contract validation.
- Last reviewed before edit: created from repository baseline during v20260618-stack-contract-validator.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| dashboard-contract | Validates config layout, filters, widgets, and component source rules. | existing validator sections | `src/config/dashboard.config.ts`, `src/widgets/components` | warnings/errors | Existing behavior preserved. |
| stack-contract | Validates Vue 3 + Element Plus + ECharts stack consistency. | `validateStackContract` | `package.json`, `src/main.ts`, `src` source files, widget visualTypes | blocking errors | Added in this change. |

## Version Entries

### v20260618-n-row-menu-axis-grid - 2026-06-18

- Change ID: ad-hoc-n-row-menu-axis-grid
- Actor: Codex
- Change type: update
- Summary: Removed the fixed row-count cap from grid validation so `layoutRows` can contain `N` rows while retaining fixed 12-column rows and the 8 visible row-unit height formula.
- Modified functionality: grid config validation, layoutRows row-length validation, validator error copy.
- Code ranges: `gridConfigs` constants; `validateAllLayoutRows`; final grid config validation block.
- Modified content: Kept `contentGap: 0`, 12 columns per `layoutRows` string, minimum `2*1` block width, and `rowHeight = (contentEndY - contentStartY) / 8`; removed the previous 8-to-12 row budget concept and changed copy from `12x8` to `12-column/N-row`.
- Affected contracts: 1920x1080 prototype content grid; horizontal menu height deduction; 12 fixed columns; `N` uncapped rows; 8 visible row units for rowHeight.
- Verification: `npm run validate:dashboard` and `npm run build:preview` passed in `topbar-light-scroll-dashboard-template`.
- Rollback note: Reintroduce a row-count budget only if the prototype layout contract is explicitly changed back to a fixed-height page.
- Related files: `src/config/dashboard.config.ts`, `$report-visual-layout-design`, `$report-layout-size-constraint-spec`.
- Change evidence: working-tree diff for `scripts/validate-dashboard-contract.mjs` in this change set.
- Follow-up: none

### v20260618-12x8-content-grid - 2026-06-18

- Change ID: ad-hoc-12x8-content-grid
- Actor: Codex
- Change type: update
- Summary: Added validator checks for the 1920x1080 content-area 12x8 grid model.
- Modified functionality: grid config collection, row count gate, rowHeight formula gate, gap gate.
- Code ranges: `collectGridConfigs`; `visibleGridRows` / `maxLayoutRows` constants; `buildLayoutBlockSpans`; final grid config validation block.
- Modified content: Required `contentGap: 0`, at least 8 and at most 12 layoutRows, and `rowHeight = (contentEndY - contentStartY) / 8` within tolerance.
- Affected contracts: 1920x1080 prototype content grid; 12 columns; 8 visible row units; 12-row scroll budget.
- Verification: `npm run validate:dashboard` passed in `topbar-light-scroll-dashboard-template`.
- Rollback note: Remove the 12x8 grid config checks and restore the previous rowHeight minimum validation only if the template contract is reverted.
- Related files: `src/config/dashboard.config.ts`, `src/components/DashboardShell.vue`.
- Change evidence: working-tree diff for `scripts/validate-dashboard-contract.mjs` in this change set.
- Follow-up: none

### v20260618-12n-grid-span-contract - 2026-06-18

- Change ID: ad-hoc-12n-grid-span-contract
- Actor: Codex
- Change type: update
- Summary: Updated dashboard contract validation from the legacy 8-column grid to the 12*N prototype grid with 2*1 minimum blocks and ordinary chart spans capped at 4*3.
- Modified functionality: layoutRows now require 12 columns per row, top-level blocks must span at least 2 columns, layoutRows are scanned even when a page has no widgets yet, visualType span allowlists use the new 3*2 default and 4*3 chart maximum, and validation copy refers to 12*N.
- Code ranges: `requiredGridColumns` and `minimumSpanColumns` constants near the layout constants; `allowedSpansByVisualType`; `buildLayoutBlockSpans`; `validateAllLayoutRows`; missing-visualType error message.
- Modified content: Added row-length/min-span validation, global layoutRows scanning, and replaced legacy chart/KPI/table/text span allowlists with the 12*N contract.
- Affected contracts: Bundled topbar template layoutRows, widget visualType span validation, prototype 1920x1080 grid rules.
- Verification: `npm run validate:dashboard` passed in `topbar-light-scroll-dashboard-template`.
- Rollback note: Restore the previous allowlists and remove `requiredGridColumns`, `minimumSpanColumns`, `validateAllLayoutRows`, row-length validation, and min-span validation.
- Related files: `src/config/dashboard.config.ts`, `$report-visual-layout-design` grid/size references.

### v20260618-stack-contract-validator - 2026-06-18

- Change ID: ad-hoc-stack-contract
- Actor: Codex
- Change type: update
- Summary: Added default stack-contract validation so copied template projects cannot drop Element Plus or ECharts while keeping a Vue 3 shell.
- Modified functionality: package dependency checks including axios, Vue 3 bootstrap check, Element Plus registration/style check, source scan for Element Plus runtime usage, ECharts runtime proof when chart visualTypes are present.
- Code ranges: `packagePath/mainEntryPath/srcPath` constants near L3-L8; `requiredStackDependencies`, `chartVisualTypes`, `sourceFileExtensions` near L116-L139; `walkSourceFiles`, `readJsonFile`, `validateStackContract` near L470-L566; `validateStackContract()` call near L1258.
- Modified content: Added stack dependency metadata, source-file walking, JSON parsing, stack validation function, and validator invocation before widget validation.
- Affected contracts: Bundled template stack contract: Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios; ECharts runtime ownership for standard chart widgets.
- Verification: `npm run validate:dashboard` passed in `topbar-light-scroll-dashboard-template`.
- Rollback note: Remove the added stack constants, helper functions, and `validateStackContract()` call to return to dashboard-only validation.
- Related files: `report-prototype-template-management/SKILL.md`, `references/template-routing-and-implementation-gates.md`, `references/template-shared-contract.md`, `references/template-recipes-checklist.md`.
- Before snapshot: repository baseline `HEAD`, 1148 lines, sha256 `38c1df1537632fcb9dc319abe1af81cff927774d0e46a7be0a59430b63066f28`.
- After snapshot: working tree, 1272 lines, sha256 `99e8453386016fd262cabe5744c3b1c1e0c158c1bc4674fb276c32f2ce3ab664`.
- Change evidence: `git diff -- report-prototype-template-management/assets/templates/topbar-light-scroll-dashboard-template/scripts/validate-dashboard-contract.mjs` shows the added constants, helpers, stack validator, and invocation.
- Follow-up: If the project adopts a dedicated ECharts wrapper such as `VueECharts`, add its import signature to `hasEchartsRuntime` if not already matched.
