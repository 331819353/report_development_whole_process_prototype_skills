# Code Change Ledger: src\components\DashboardShell.vue

- Code file: `src\components\DashboardShell.vue`
- Ledger file: `src\components\__change_logs__\DashboardShell.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T15:01:32.942Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T15:01:32.943Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1722 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `da10e142af516d9d91660c756aa7ef771f229624760a0c2d3c051e32b1c8d706`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701151448 - 2026-07-01T15:14:48.736Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Apply legend placement, block span, summary ratio, and mock API defaults
- Modified functionality: ConclusionExampleCard core centering; proportion/radar/sunburst legend defaults; layout span minimum rows; block summary ratio; mock API proxy configuration
- Code ranges: ConclusionExampleCard core style; chart legend config/scale/option; layoutGridContract and validate-dashboard span rules; getPlaceholderCellInnerStyle and has-body-summary CSS; projectLayoutRows; dev-with-mock-api env; vite proxy; axios request client; env.d.ts
- Modified content: Centered conclusion core copy vertically, defaulted proportion/radar/sunburst legends to right-side placement, enforced minimum 3-row block spans with summary area at 1/(N+1), and moved mock API proxy targeting from VITE_API_BASE_URL to non-client MOCK_API_BASE_URL while keeping requests on relative /api.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5178/
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1722 lines, sha256 `da10e142af516d9d91660c756aa7ef771f229624760a0c2d3c051e32b1c8d706`, captured `2026-07-01T15:01:32.946Z`
- After snapshot: 1720 lines, sha256 `07a11161ad1e8facfbef2bcd669b8f1dd15eb4644a95350d15bc485e5d107524`
- Change evidence: inline unified diff:

```diff
--- a/src/components/DashboardShell.vue
+++ b/src/components/DashboardShell.vue
@@ -431,10 +431,8 @@
     '--block-row-span': String(rowSpan),
   };
 
-  if (isAutoComponentSlotBlock(block.label)) {
-    style['--block-summary-row-size'] = '1fr';
-    style['--block-component-row-size'] = `${Math.max(rowSpan - 1, 1)}fr`;
-  }
+  style['--block-summary-row-size'] = '1fr';
+  style['--block-component-row-size'] = `${Math.max(rowSpan, 1)}fr`;
 
   return style;
 };
```
- Follow-up: none
