# Code Change Ledger: src/types/dashboard.ts

- Code file: `src/types/dashboard.ts`
- Ledger file: `src/types/__change_logs__/dashboard.ts.changes.md`
- Purpose: Dashboard configuration type contract for the frozen cockpit template.
- Primary features: dashboard asset config, nav item config, grid/layout config, filter config, screen config.
- Last reviewed before edit: 2026-06-18 / v20260618-12x8-content-grid / Codex

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| dashboard-config-types | Defines TypeScript contracts consumed by `dashboard.config.ts` and `DashboardShell.vue`. | interfaces in this file | template config | typed runtime config | Maintained as source contract. |

## Version Entries

### v20260618-12x8-content-grid - 2026-06-18

- Change ID: ad-hoc-12x8-content-grid
- Actor: Codex
- Change type: update
- Summary: Added `rowHeight` to the frozen cockpit grid config contract.
- Modified functionality: `DashboardGridConfig`.
- Code ranges: `DashboardGridConfig`.
- Modified content: Added `rowHeight: number` so the frozen template can use the same configured 12x8 content-grid row unit as the scroll templates.
- Affected contracts: `screen.grid.rowHeight` is now required in `dashboard.config.ts`.
- Verification: `npm run validate:dashboard` passed in `frozen-title-sci-fi-cockpit-template`.
- Rollback note: Remove `rowHeight` only together with reverting the frozen runtime/style/config/validator changes.
- Related files: `src/config/dashboard.config.ts`, `src/components/DashboardShell.vue`, `src/styles/index.scss`, `scripts/validate-dashboard-contract.mjs`.
- Change evidence: working-tree diff for `src/types/dashboard.ts` in this change set.
- Follow-up: none
