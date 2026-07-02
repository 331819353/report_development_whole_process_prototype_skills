# Code Change Ledger: scripts/dev-with-mock-api.mjs

- Code file: `scripts/dev-with-mock-api.mjs`
- Ledger file: `scripts/__change_logs__/dev-with-mock-api.mjs.changes.md`
- Purpose: Initialized bundled-template baseline. Fill in project-specific ownership after copying/configuring the template.
- Primary features: template baseline
- Last reviewed before edit: template initialization
- Process-record policy: internal template-development history is intentionally omitted from bundled templates.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| TEMPLATE-BASELINE | Current bundled template behavior | 110 lines | project configuration | runnable template source | Replace with project-specific inventory after the first real edit. |

## Version Entries

### template-initialized

- Change ID: template-baseline
- Actor: template
- Change type: baseline
- Summary: Clean baseline record for a newly copied report template.
- Modified functionality: none
- Code ranges: current file snapshot, 110 lines
- Modified content: none
- Affected contracts: none
- Verification: current template snapshot sha256 `b307e7b81d9e7c27599bb04cca650ec8c0a71e8f3e25df02408576e5478c0b53`; run `npm run ledger:code -- --file scripts/dev-with-mock-api.mjs --stage before` before the first project-specific edit.
- Rollback note: restore this file from the bundled template or project VCS.
- Related files: none
- Change evidence: baseline only; no project-specific change has been recorded yet.
- Follow-up: append project-specific entries after the first real change.

### v20260701151514 - 2026-07-01T15:15:14.430Z

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
- Before snapshot: 110 lines, sha256 `b307e7b81d9e7c27599bb04cca650ec8c0a71e8f3e25df02408576e5478c0b53`, captured `2026-07-01T15:01:59.395Z`
- After snapshot: 110 lines, sha256 `3f70e6811fb3ce6b064d5428921e4b00781bfa02eef52de6ad90b358146834aa`
- Change evidence: inline unified diff:

```diff
--- a/scripts/dev-with-mock-api.mjs
+++ b/scripts/dev-with-mock-api.mjs
@@ -82,7 +82,7 @@
   ],
   {
     ...process.env,
-    VITE_API_BASE_URL: apiBaseUrl,
+    MOCK_API_BASE_URL: apiBaseUrl,
   },
 );
```
- Follow-up: none
