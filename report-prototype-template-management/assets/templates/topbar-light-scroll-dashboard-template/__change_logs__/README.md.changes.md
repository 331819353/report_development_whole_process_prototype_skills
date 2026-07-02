# Code Change Ledger: README.md

- Code file: `README.md`
- Ledger file: `__change_logs__\README.md.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T22:40:05.851Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T22:40:05.852Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 38 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `897e352fc9f09b2a7a65277689a7a81e89481b6bcf8df0f0beedfee2761a0cc7`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701224450 - 2026-07-01T22:44:50.589Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Make mock API startup and runtime data QA enforceable
- Modified functionality: dev script mock startup; visual geometry runtime API smoke; component mount and empty data blockers; mock API docs
- Code ranges: package.json scripts; visual-geometry runtimeApiChecks/evaluateRuntimeApiChecks/evaluateGeometry runtime data checks; README commands; mock API contract commands; prototype data summary verification row
- Modified content: Changed default dev scripts to start mock API plus Vite, documented dev:vite as shell-only, and extended visual geometry QA to fail when /api returns non-JSON, filter options are empty, component props are empty, component slots fall back to inline content, or visible components show empty/error data markers.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5178/ --out-dir visual-check-runtime-final; negative plain Vite visual check on 5279 failed with VIS-API-NOT-JSON and VIS-FILTER-OPTIONS-MISSING
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 38 lines, sha256 `897e352fc9f09b2a7a65277689a7a81e89481b6bcf8df0f0beedfee2761a0cc7`, captured `2026-07-01T22:40:05.856Z`
- After snapshot: 42 lines, sha256 `7d2f9cf37184e3620db8a4705609f96137a74d24ca704237f8b64a55cae590a8`
- Change evidence: inline unified diff:

```diff
--- a/README.md
+++ b/README.md
@@ -19,11 +19,15 @@
 
 ```bash
 npm run dev
-npm run build:preview
-npm run build:test
-npm run build:prod
-npm run preview
-```
+npm run dev:vite
+npm run build:preview
+npm run build:test
+npm run build:prod
+npm run preview
+```
+
+- `npm run dev` starts the mock API and Vite together, with Vite `/api` proxied to the mock service.
+- `npm run dev:vite` starts only Vite and is for shell-only debugging; API-backed filters and components will not be ready.
 
 ## Structure
```
- Follow-up: none
