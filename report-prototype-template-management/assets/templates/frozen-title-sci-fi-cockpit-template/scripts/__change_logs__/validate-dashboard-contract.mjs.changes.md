# Code Change Ledger: scripts/validate-dashboard-contract.mjs

- Code file: `scripts/validate-dashboard-contract.mjs`
- Ledger file: `scripts/__change_logs__/validate-dashboard-contract.mjs.changes.md`
- Purpose: Initialized bundled-template baseline. Fill in project-specific ownership after copying/configuring the template.
- Primary features: template baseline
- Last reviewed before edit: template initialization
- Process-record policy: internal template-development history is intentionally omitted from bundled templates.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| TEMPLATE-BASELINE | Current bundled template behavior | 2422 lines | project configuration | runnable template source | Replace with project-specific inventory after the first real edit. |

## Version Entries

### template-initialized

- Change ID: template-baseline
- Actor: template
- Change type: baseline
- Summary: Clean baseline record for a newly copied report template.
- Modified functionality: none
- Code ranges: current file snapshot, 2422 lines
- Modified content: none
- Affected contracts: none
- Verification: current template snapshot sha256 `9d0e492e09197cb71205d99d47b5a2389f0319c95d6558aeca23539aefcedb13`; run `npm run ledger:code -- --file scripts/validate-dashboard-contract.mjs --stage before` before the first project-specific edit.
- Rollback note: restore this file from the bundled template or project VCS.
- Related files: none
- Change evidence: baseline only; no project-specific change has been recorded yet.
- Follow-up: append project-specific entries after the first real change.

### v20260701142046 - 2026-07-01T14:20:46.722Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Allow BaseLayoutSpan 6x3 and 12x3 validation spans
- Modified functionality: allowedSpansByVisualType.other
- Code ranges: allowedSpansByVisualType.other
- Modified content: Added 6x3 and 12x3 to BaseLayoutSpan visualType other span whitelist.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/; mock API smoke /api/health and /api/component-props/overview.C.C
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 2422 lines, sha256 `9d0e492e09197cb71205d99d47b5a2389f0319c95d6558aeca23539aefcedb13`, captured `2026-07-01T14:08:35.483Z`
- After snapshot: 2422 lines, sha256 `d3bbc9007b98c6fe23777e65ecbda232ab48ff0aff40b053d35f22dcd74121c2`
- Change evidence: inline unified diff:

```diff
--- a/scripts/validate-dashboard-contract.mjs
+++ b/scripts/validate-dashboard-contract.mjs
@@ -393,7 +393,7 @@
   'ranking-list': ['3x2', '4x2', '3x3', '4x3', '6x2', '6x3'],
   table: ['3x2', '4x2', '6x2', '8x2', '12x2', '4x3', '6x3', '8x3', '12x3', '6x4', '8x4', '12x4'],
   pivot: ['4x3', '6x3', '8x3', '12x3', '6x4', '8x4', '12x4', '6x5', '8x5', '12x5'],
-  other: ['2x1', '3x2', '4x2', '3x3', '4x3'],
+  other: ['2x1', '3x2', '4x2', '3x3', '4x3', '6x3', '12x3'],
 };
 
 const emptyGridMarks = new Set(['.', ' ']);
```
- Follow-up: none

### v20260701151513 - 2026-07-01T15:15:13.606Z

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
- Before snapshot: 2422 lines, sha256 `d3bbc9007b98c6fe23777e65ecbda232ab48ff0aff40b053d35f22dcd74121c2`, captured `2026-07-01T15:01:58.603Z`
- After snapshot: 2428 lines, sha256 `0362933532899454291c22cf3636f7b14a645884db4d1acb98eec5ea2474bd0a`
- Change evidence: sidecar patch `scripts\__change_logs__\patches\v20260701151513-validate-dashboard-contract.mjs.diff` (541 diff lines, sha256 `48e71666358bb7cc22e7fe6869ee37a92d41d68c42847d20ebf66c7ad6fb3429`)
- Follow-up: none
