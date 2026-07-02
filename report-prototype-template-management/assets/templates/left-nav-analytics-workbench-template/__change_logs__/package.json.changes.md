# Code Change Ledger: package.json

- Code file: `package.json`
- Ledger file: `__change_logs__/package.json.changes.md`
- Purpose: Baseline ledger created by `npm run ledger:init`; fill exact ownership before the next functional edit.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T15:15:33.899Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T15:15:33.899Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial sidecar ledger created for project-wide traceability.
- Modified functionality: none
- Code ranges: full file baseline, 44 lines
- Modified content: none
- Affected contracts: none
- Verification: baseline only; 1648 bytes, sha256 `976d6fa819e68641293d0cc82cf0e897d5cd53063965f2de3a16aee603bbf873`
- Rollback note: no functional change in this entry.
- Related files: none
- Before snapshot: not applicable for baseline
- After snapshot: 44 lines, sha256 `976d6fa819e68641293d0cc82cf0e897d5cd53063965f2de3a16aee603bbf873`
- Change evidence: baseline ledger creation only; no source-code diff.
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701224453 - 2026-07-01T22:44:53.910Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Make mock API startup and runtime data QA enforceable
- Modified functionality: dev script mock startup; visual geometry runtime API smoke; component mount and empty data blockers; mock API docs
- Code ranges: package.json scripts; visual-geometry runtimeApiChecks/evaluateRuntimeApiChecks/evaluateGeometry runtime data checks; README commands; mock API contract commands; prototype data summary verification row
- Modified content: Changed default dev scripts to start mock API plus Vite, documented dev:vite as shell-only, and extended visual geometry QA to fail when /api returns non-JSON, filter options are empty, component props are empty, component slots fall back to inline content, or visible components show empty/error data markers.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/ --out-dir visual-check-runtime-final; negative plain Vite visual check on 5279 failed with VIS-API-NOT-JSON and VIS-FILTER-OPTIONS-MISSING
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 44 lines, sha256 `976d6fa819e68641293d0cc82cf0e897d5cd53063965f2de3a16aee603bbf873`, captured `2026-07-01T22:40:09.141Z`
- After snapshot: 45 lines, sha256 `7e78b2cf4d39e686f73009b886272156af2c6021044aa224faa56249ca47d844`
- Change evidence: inline unified diff:

```diff
--- a/package.json
+++ b/package.json
@@ -4,8 +4,9 @@
   "version": "0.1.0",
   "type": "module",
   "scripts": {
-    "dev": "vite --mode development --host 0.0.0.0",
-    "dev:auto": "node scripts/start-available-port.mjs --mode dev",
+    "dev": "node scripts/dev-with-mock-api.mjs",
+    "dev:auto": "node scripts/dev-with-mock-api.mjs",
+    "dev:vite": "vite --mode development --host 0.0.0.0",
     "dev:mock": "node scripts/dev-with-mock-api.mjs",
     "mock:api": "node scripts/mock-api-server.mjs",
     "validate:dashboard": "node scripts/validate-dashboard-contract.mjs",
```
- Follow-up: none
