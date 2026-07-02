# Code Change Ledger: docs\prototype-data-summary.md

- Code file: `docs\prototype-data-summary.md`
- Ledger file: `docs\__change_logs__\prototype-data-summary.md.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T22:40:15.650Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T22:40:15.651Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 171 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `b9368e435305d214a4e556ea2df8b133fc657133244f76dbef2b8f3a28db2767`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701224500 - 2026-07-01T22:45:00.532Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Make mock API startup and runtime data QA enforceable
- Modified functionality: dev script mock startup; visual geometry runtime API smoke; component mount and empty data blockers; mock API docs
- Code ranges: package.json scripts; visual-geometry runtimeApiChecks/evaluateRuntimeApiChecks/evaluateGeometry runtime data checks; README commands; mock API contract commands; prototype data summary verification row
- Modified content: Changed default dev scripts to start mock API plus Vite, documented dev:vite as shell-only, and extended visual geometry QA to fail when /api returns non-JSON, filter options are empty, component props are empty, component slots fall back to inline content, or visible components show empty/error data markers.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/ --out-dir visual-check-runtime-final; negative plain Vite visual check on 5279 failed with VIS-API-NOT-JSON and VIS-FILTER-OPTIONS-MISSING
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 171 lines, sha256 `b9368e435305d214a4e556ea2df8b133fc657133244f76dbef2b8f3a28db2767`, captured `2026-07-01T22:40:15.656Z`
- After snapshot: 171 lines, sha256 `68be0403311638b5225417b2c28d497af7706a58c56cda316155cf5c052aa5f0`
- Change evidence: inline unified diff:

```diff
--- a/docs/prototype-data-summary.md
+++ b/docs/prototype-data-summary.md
@@ -162,7 +162,7 @@
 
 | Check | Status | Evidence |
 | --- | --- | --- |
-| Mock API | required | `npm run mock:api`; `npm run dev:mock` for API plus Vite |
+| Mock API | required | `npm run mock:api`; `npm run dev` / `npm run dev:mock` for API plus Vite |
 | Filter options | required | direct requests to `/api/filter-options/*` |
 | Component props | required | direct request to `/api/component-props/:componentDataKey` with filters and active pill query |
 | Slot interaction | required | `actions.slotClick` opens shell drawer/modal/popup metadata by slot role using `componentDataKey`, filters, active pill, and source slot fields |
```
- Follow-up: none
