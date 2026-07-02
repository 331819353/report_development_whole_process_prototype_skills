# Code Change Ledger: scripts/visual-geometry-audit.mjs

- Code file: `scripts/visual-geometry-audit.mjs`
- Ledger file: `scripts/__change_logs__/visual-geometry-audit.mjs.changes.md`
- Purpose: Baseline ledger created by `npm run ledger:init`; fill exact ownership before the next functional edit.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T15:15:33.886Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T15:15:33.886Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial sidecar ledger created for project-wide traceability.
- Modified functionality: none
- Code ranges: full file baseline, 1029 lines
- Modified content: none
- Affected contracts: none
- Verification: baseline only; 39725 bytes, sha256 `62c7a5e6e102728312d5fd0b72e907ddd244c9dbe396874bd599e887304f7dba`
- Rollback note: no functional change in this entry.
- Related files: none
- Before snapshot: not applicable for baseline
- After snapshot: 1029 lines, sha256 `62c7a5e6e102728312d5fd0b72e907ddd244c9dbe396874bd599e887304f7dba`
- Change evidence: baseline ledger creation only; no source-code diff.
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701224449 - 2026-07-01T22:44:49.043Z

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
- Before snapshot: 1029 lines, sha256 `62c7a5e6e102728312d5fd0b72e907ddd244c9dbe396874bd599e887304f7dba`, captured `2026-07-01T22:40:04.211Z`
- After snapshot: 1272 lines, sha256 `50e89bb9ce8b7cdb77ddbc426311271e9c810a8d5d39f33789998537f7bb635c`
- Change evidence: sidecar patch `scripts\__change_logs__\patches\v20260701224449-visual-geometry-audit.mjs.diff` (2120 diff lines, sha256 `fb40fa5ba029886d1d5835d3817b8c570e6c4ebd3e6047ad572b996f381a4626`)
- Follow-up: none
