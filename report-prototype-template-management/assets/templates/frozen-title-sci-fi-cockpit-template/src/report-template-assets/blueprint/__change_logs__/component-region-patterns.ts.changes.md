# Code Change Ledger: src\report-template-assets\blueprint\component-region-patterns.ts

- Code file: `src\report-template-assets\blueprint\component-region-patterns.ts`
- Ledger file: `src\report-template-assets\blueprint\__change_logs__\component-region-patterns.ts.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T15:01:55.309Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T15:01:55.310Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 145 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `bb3490eea9621c3e8b0439e1873092ebf39443106af48528eb2ae15b7effd32e`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701151510 - 2026-07-01T15:15:10.303Z

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
- Before snapshot: 145 lines, sha256 `bb3490eea9621c3e8b0439e1873092ebf39443106af48528eb2ae15b7effd32e`, captured `2026-07-01T15:01:55.313Z`
- After snapshot: 145 lines, sha256 `3d9a68890450bf7d0b46c6eaab85b0d0673d5f5a03c78b68e3797e4ecedcdb46`
- Change evidence: inline unified diff:

```diff
--- a/src/report-template-assets/blueprint/component-region-patterns.ts
+++ b/src/report-template-assets/blueprint/component-region-patterns.ts
@@ -131,7 +131,7 @@
 export const getComponentRegionPatternOptions = (
   minCols = 2,
   maxCols = 12,
-  minRows = 2,
+  minRows = 3,
   maxRows = 8,
 ) =>
   Array.from({ length: maxRows - minRows + 1 }, (_, rowIndex) => rowIndex + minRows)
```
- Follow-up: none
