# Code Change Ledger: src\components\DashboardShell.vue

- Code file: `src\components\DashboardShell.vue`
- Ledger file: `src\components\__change_logs__\DashboardShell.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T15:01:44.285Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T15:01:44.286Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1763 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `42240d498298367e387404e4dedd9632d3e1a926e7461958b8d5a8f850e90d88`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701151459 - 2026-07-01T15:14:59.711Z

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
- Before snapshot: 1763 lines, sha256 `42240d498298367e387404e4dedd9632d3e1a926e7461958b8d5a8f850e90d88`, captured `2026-07-01T15:01:44.289Z`
- After snapshot: 1761 lines, sha256 `ca94e7f3dfcdec9e8f8c9b43dfaba0fb9f4948478cafd982b734840d0956f62c`
- Change evidence: inline unified diff:

```diff
--- a/src/components/DashboardShell.vue
+++ b/src/components/DashboardShell.vue
@@ -490,10 +490,8 @@
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
