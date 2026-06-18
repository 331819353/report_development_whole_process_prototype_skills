# Code Change Ledger: src/config/dashboard.config.ts

- Code file: `src/config/dashboard.config.ts`
- Ledger file: `src/config/__change_logs__/dashboard.config.ts.changes.md`
- Purpose: Vue3 standard project structure refactor baseline
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T12:42:32.973Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### v20260618-n-row-menu-axis-grid - 2026-06-18

- Change ID: ad-hoc-n-row-menu-axis-grid
- Actor: Codex
- Change type: config
- Summary: Clarified the frozen cockpit template as a 12-column/N-row grid where rowHeight is calculated from the first 8 visible content row units.
- Modified functionality: title/menu shell comments and nav layoutRows comments.
- Code ranges: `screen.layout`; `screen.grid`; `nav[].layoutRows`.
- Modified content: Reworded fixed `12x8`/`12列*8` language to `12列*N行`, kept `titleVisibleHeight/contentStartY: 160`, `contentEndY: 1080`, and `rowHeight: 115`.
- Affected contracts: horizontal title/menu height deduction; `(1080 - 160) / 8 = 115`; 12 fixed columns; `N` uncapped rows.
- Verification: `npm run validate:dashboard` and `npm run build:preview` passed in `frozen-title-sci-fi-cockpit-template`.
- Rollback note: Restore the previous comments only if the layout contract is changed back to a fixed row budget.
- Related files: `scripts/validate-dashboard-contract.mjs`, `$report-visual-layout-design`.
- Change evidence: working-tree diff for `src/config/dashboard.config.ts` in this change set.
- Follow-up: none

### v20260618-12x8-content-grid - 2026-06-18

- Change ID: ad-hoc-12x8-content-grid
- Actor: Codex
- Change type: config
- Summary: Rebased the frozen cockpit defaults on a 160px shell and 8-row visible content grid.
- Modified functionality: title/menu shell height; screen.layout contentGap; screen.grid contentStartY/rowHeight; nav page layoutRows.
- Code ranges: `screen.layout`; `screen.grid`; `nav[].layoutRows`.
- Modified content: Set `titleVisibleHeight/contentStartY` to 160, changed the mathematical grid gap to 0, added `rowHeight: 115`, and expanded default nav layouts to 8 visible rows.
- Affected contracts: 1920x1080 prototype content grid; 12 columns; 8 visible row units; 12-row scroll budget.
- Verification: `npm run validate:dashboard` passed in `frozen-title-sci-fi-cockpit-template`.
- Rollback note: Restore the previous title/content offsets, gap, proportional rows, and three-row nav layouts together with DashboardShell/style/type/validator changes.
- Related files: `src/components/DashboardShell.vue`, `src/styles/index.scss`, `src/types/dashboard.ts`, `scripts/validate-dashboard-contract.mjs`.
- Change evidence: working-tree diff for `src/config/dashboard.config.ts` in this change set.
- Follow-up: none

### baseline - 2026-06-11T12:42:32.974Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 178 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `2d7a4116a782ded08824b865d9476c219ab19c5525dc82edf496d126b917795a`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611125154 - 2026-06-11T12:51:54.502Z

- Change ID: vue3-standard-structure-refactor
- Actor: codex
- Change type: refactor
- Summary: Refactored template into the standard Vue3 TypeScript Vite project structure with router, Pinia store, Axios request wrapper, env files, Sass style entry, and preview build compatibility.
- Modified functionality: project structure, app bootstrap, routing, store, request layer, style entry, template docs
- Code ranges: full file
- Modified content: standard Vue3 project scaffolding and imports
- Affected contracts: Vue3 project directory contract; dashboard template data-source contract preserved
- Verification: npm run build:preview passed for all four templates
- Rollback note: revert the structure refactor and package dependency updates together
- Related files: package.json, vite.config.ts, tsconfig.json, src/main.ts, src/App.vue, src/router, src/stores, src/utils, src/views, src/styles
- File snapshot: 178 lines, sha256 `2d7a4116a782ded08824b865d9476c219ab19c5525dc82edf496d126b917795a`
- Follow-up: none

### v20260611133152 - 2026-06-11T13:31:52.740Z

- Change ID: component-owned-title-construction-state
- Actor: codex
- Change type: update
- Summary: Reassigned block titles and local controls to component ownership, and changed the unbound widget fallback to construction state.
- Modified functionality: component-owned title/control handoff, unbound widget construction mask, local filter context API, template comments
- Code ranges: DashboardShell block state/context/template; styles block viewport/mask; widgets/types WidgetContext and BaseWidgetConfig; dashboard.config and WidgetTemplate comments; types/actions localFilters comment
- Modified content: Removed Shell-rendered block title/local-filter DOM, removed titleVisible from widget contract, exposed local filter config/options/set/clear through WidgetContext, changed unbound mask copy to 建设中, and updated source comments.
- Affected contracts: template-layout-design-system component-owned title/control contract; runtime UI no longer exposes 未绑定 or 待配置组件
- Verification: npm run build:preview passed for all four templates; Browser QA on http://localhost:5185/#/ showed placeholderTitleCount=0, mask texts=建设中, no 未绑定/待配置组件, and no console errors
- Rollback note: Revert DashboardShell.vue, styles/index.scss, widgets/types.ts, config comments, WidgetTemplate comments, and types/actions together
- Related files: src/components/DashboardShell.vue, src/styles/index.scss, src/widgets/types.ts, src/config/dashboard.config.ts, src/widgets/templates/WidgetTemplate.vue, src/types/actions.ts
- File snapshot: 178 lines, sha256 `990554d5c92e13cc6b3fb684605cc9f8302244790bda70f6fae6a1c3d59db4b7`
- Follow-up: none
