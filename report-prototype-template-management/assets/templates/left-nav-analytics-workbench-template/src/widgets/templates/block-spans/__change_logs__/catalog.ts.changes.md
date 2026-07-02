# Code Change Ledger: src\widgets\templates\block-spans\catalog.ts

- Code file: `src\widgets\templates\block-spans\catalog.ts`
- Ledger file: `src\widgets\templates\block-spans\__change_logs__\catalog.ts.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T15:01:42.480Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T15:01:42.481Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 170 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `743313b83f71f2328db1bc685e822f4922d22b4e10794e76ce9d603eaffdb7c7`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701151458 - 2026-07-01T15:14:58.146Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Apply legend placement, block span, summary ratio, and mock API defaults
- Modified functionality: ConclusionExampleCard core centering; proportion/radar/sunburst legend defaults; layout span minimum rows; block summary ratio; mock API proxy configuration
- Code ranges: ConclusionExampleCard core style; chart legend config/scale/option; layoutGridContract and validate-dashboard span rules; getPlaceholderCellInnerStyle and has-body-summary CSS; projectLayoutRows; dev-with-mock-api env; vite proxy; axios request client; env.d.ts
- Modified content: Centered conclusion core copy vertically, defaulted proportion/radar/sunburst legends to right-side placement, enforced minimum 3-row block spans with summary area at 1/(N+1), and moved mock API proxy targeting from VITE_API_BASE_URL to non-client MOCK_API_BASE_URL while keeping requests on relative /api.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 170 lines, sha256 `743313b83f71f2328db1bc685e822f4922d22b4e10794e76ce9d603eaffdb7c7`, captured `2026-07-01T15:01:42.485Z`
- After snapshot: 170 lines, sha256 `027e63ba66e1e62adb8283d3db94d3cca9683cc9d053218c85faac0571577f06`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/block-spans/catalog.ts
+++ b/src/widgets/templates/block-spans/catalog.ts
@@ -30,17 +30,17 @@
   columns: 12,
   visibleRows: 8,
   minColumns: 2,
-  minRows: 2,
-  rowHeight: 135,
-  cellPadding: 3,
-  requireColumnsGteRows: true,
-};
-
-const round = (value: number) => Math.round(value * 10) / 10;
-
-const assertLegalSpan = (cols: number, rows: number) => {
-  if (cols < layoutGridContract.minColumns || rows < layoutGridContract.minRows) {
-    throw new Error('Layout span must be at least 2x2.');
+  minRows: 3,
+  rowHeight: 135,
+  cellPadding: 3,
+  requireColumnsGteRows: true,
+};
+
+const round = (value: number) => Math.round(value * 10) / 10;
+
+const assertLegalSpan = (cols: number, rows: number) => {
+  if (cols < layoutGridContract.minColumns || rows < layoutGridContract.minRows) {
+    throw new Error('Layout span must use at least 2 columns and 3 rows.');
   }
 
   if (cols < rows) {
```
- Follow-up: none
