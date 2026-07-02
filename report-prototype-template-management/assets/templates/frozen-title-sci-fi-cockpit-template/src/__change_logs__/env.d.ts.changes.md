# Code Change Ledger: src\env.d.ts

- Code file: `src\env.d.ts`
- Ledger file: `src\__change_logs__\env.d.ts.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T15:02:01.672Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T15:02:01.673Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 13 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `b53441958976b36120ed7404e3f92bc0064a86252e708ca53e4a85056f84cb34`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701151517 - 2026-07-01T15:15:17.085Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Apply legend placement, block span, summary ratio, and mock API defaults
- Modified functionality: ConclusionExampleCard core centering; proportion/radar/sunburst legend defaults; layout span minimum rows; block summary ratio; mock API proxy configuration
- Code ranges: ConclusionExampleCard core style; chart legend config/scale/option; layoutGridContract and validate-dashboard span rules; getPlaceholderCellInnerStyle and has-body-summary CSS; projectLayoutRows; dev-with-mock-api env; vite proxy; axios request client; env.d.ts
- Modified content: Centered conclusion core copy vertically, defaulted proportion/radar/sunburst legends to right-side placement, enforced minimum 3-row block spans with summary area at 1/(N+1), and moved mock API proxy targeting from VITE_API_BASE_URL to non-client MOCK_API_BASE_URL while keeping requests on relative /api.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 13 lines, sha256 `b53441958976b36120ed7404e3f92bc0064a86252e708ca53e4a85056f84cb34`, captured `2026-07-01T15:02:01.677Z`
- After snapshot: 12 lines, sha256 `98097ddf7125ce66b376eb7fec86689f6da177bc3cc0fafe4760cb335e0a7021`
- Change evidence: inline unified diff:

```diff
--- a/src/env.d.ts
+++ b/src/env.d.ts
@@ -1,7 +1,6 @@
 /// <reference types="vite/client" />
 
 interface ImportMetaEnv {
-  readonly VITE_API_BASE_URL?: string;
   readonly VITE_API_NODE_ENV?: string;
   readonly VITE_APP_ENV?: string;
   readonly VITE_LOGIN_URL?: string;
```
- Follow-up: none
