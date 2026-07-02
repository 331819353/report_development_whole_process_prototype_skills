# Code Change Ledger: docs\mock-api-contract.md

- Code file: `docs\mock-api-contract.md`
- Ledger file: `docs\__change_logs__\mock-api-contract.md.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T22:40:10.776Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T22:40:10.778Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 172 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `521b18b27dba0b30ae2144d13028d1d71194ab12587d0e4ea85ef08a06af2f6b`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701224455 - 2026-07-01T22:44:55.741Z

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
- Before snapshot: 172 lines, sha256 `521b18b27dba0b30ae2144d13028d1d71194ab12587d0e4ea85ef08a06af2f6b`, captured `2026-07-01T22:40:10.782Z`
- After snapshot: 174 lines, sha256 `d4d9523db8f97f38c1429d00cf15f3c602028ef997f0d24c8e10c41c14d66deb`
- Change evidence: inline unified diff:

```diff
--- a/docs/mock-api-contract.md
+++ b/docs/mock-api-contract.md
@@ -5,12 +5,14 @@
 ## Commands
 
 ```bash
-npm run mock:api
-npm run dev:mock
-```
-
-- `mock:api` starts only the API, defaulting to `http://127.0.0.1:4179`.
-- `dev:mock` starts the API and Vite, and proxies Vite `/api` requests to the mock API.
+npm run dev
+npm run mock:api
+npm run dev:mock
+```
+
+- `mock:api` starts only the API, defaulting to `http://127.0.0.1:4179`.
+- `dev` and `dev:mock` start the API and Vite, and proxy Vite `/api` requests to the mock API.
+- `dev:vite` starts only Vite and is not runtime-ready for API-backed filters or component slots.
 - Useful flags: `--host`, `--port`, `--mock-host`, `--mock-port`, `--attempts`.
 
 ## Response Envelope
```
- Follow-up: none
