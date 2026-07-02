# Code Change Ledger: src\styles\index.scss

- Code file: `src\styles\index.scss`
- Ledger file: `src\styles\__change_logs__\index.scss.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T15:01:33.723Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T15:01:33.724Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1497 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `35cc7259ec6ad56812c47e8da099436455463b0cc2b45aa3ad1ff2359856467b`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701151449 - 2026-07-01T15:14:49.624Z

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
- Before snapshot: 1497 lines, sha256 `35cc7259ec6ad56812c47e8da099436455463b0cc2b45aa3ad1ff2359856467b`, captured `2026-07-01T15:01:33.727Z`
- After snapshot: 1497 lines, sha256 `ea610d51c52fe317136711d26e86575d73ce7460959bec5dc1fefbb06a49fe18`
- Change evidence: inline unified diff:

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -1034,79 +1034,79 @@
 
 
 .placeholder-cell-body.has-body-summary {
-  grid-template-rows: minmax(0, 7fr) minmax(0, 2fr);
-}
-
-.placeholder-cell-body-section {
-  min-width: 0;
-  min-height: 0;
-  overflow: hidden;
-}
-
-.placeholder-cell-body-section-3 {
-  display: flex;
-  align-items: center;
-  padding: 3px 6px;
-  border: 1px solid rgba(0, 115, 229, 0.14);
-  border-radius: var(--card-radius);
-  background:
-    linear-gradient(135deg, rgba(255, 255, 255, 0.34), rgba(223, 234, 249, 0.12)),
-    rgba(248, 251, 255, 0.12);
-  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.34), inset 0 -1px 0 rgba(0, 115, 229, 0.06);
-  backdrop-filter: blur(18px) saturate(180%);
-  color: var(--primary);
-}
-
-.placeholder-cell-summary-text {
-  display: -webkit-box;
-  min-width: 0;
-  margin: 0;
-  overflow: hidden;
-  color: var(--primary);
-  font-size: 12px;
-  font-weight: 700;
-  line-height: 1.35;
-  text-overflow: ellipsis;
-  -webkit-box-orient: vertical;
-  -webkit-line-clamp: 2;
-}
-
-.placeholder-cell-body-section-2 {
-  display: grid;
-  place-items: stretch;
-  padding: var(--component-area-padding);
-  border-radius: 0;
-}
-
-.placeholder-cell-body-section-2 > .widget-renderer {
-  width: 100%;
-  height: 100%;
-  min-width: 0;
-  min-height: 0;
-  border-radius: 0;
-}
-
-.placeholder-cell-inner.is-auto-component-slots {
-  --card-padding: 2px;
-  --cell-top-height: 34px;
-  --cell-inner-gap: 2px;
-}
-
-.placeholder-cell-inner.is-auto-component-slots .placeholder-cell-title {
-  height: 34px;
-  padding: 2px;
-  justify-items: start;
-  align-items: center;
-  text-align: left;
-  line-height: 1.15;
-}
-
-.placeholder-cell-inner.is-auto-component-slots .placeholder-cell-title-main {
-  justify-content: flex-start;
-}
-
-.placeholder-cell-inner.is-auto-component-slots .placeholder-cell-body.has-body-summary {
-  grid-template-rows: minmax(0, var(--block-summary-row-size, 1fr)) minmax(0, var(--block-component-row-size, 2fr));
+  grid-template-rows: minmax(0, var(--block-component-row-size, 3fr)) minmax(0, var(--block-summary-row-size, 1fr));
+}
+
+.placeholder-cell-body-section {
+  min-width: 0;
+  min-height: 0;
+  overflow: hidden;
+}
+
+.placeholder-cell-body-section-3 {
+  display: flex;
+  align-items: center;
+  padding: 3px 6px;
+  border: 1px solid rgba(0, 115, 229, 0.14);
+  border-radius: var(--card-radius);
+  background:
+    linear-gradient(135deg, rgba(255, 255, 255, 0.34), rgba(223, 234, 249, 0.12)),
+    rgba(248, 251, 255, 0.12);
+  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.34), inset 0 -1px 0 rgba(0, 115, 229, 0.06);
+  backdrop-filter: blur(18px) saturate(180%);
+  color: var(--primary);
+}
+
+.placeholder-cell-summary-text {
+  display: -webkit-box;
+  min-width: 0;
+  margin: 0;
+  overflow: hidden;
+  color: var(--primary);
+  font-size: 12px;
+  font-weight: 700;
+  line-height: 1.35;
+  text-overflow: ellipsis;
+  -webkit-box-orient: vertical;
+  -webkit-line-clamp: 2;
+}
+
+.placeholder-cell-body-section-2 {
+  display: grid;
+  place-items: stretch;
+  padding: var(--component-area-padding);
+  border-radius: 0;
+}
+
+.placeholder-cell-body-section-2 > .widget-renderer {
+  width: 100%;
+  height: 100%;
+  min-width: 0;
+  min-height: 0;
+  border-radius: 0;
+}
+
+.placeholder-cell-inner.is-auto-component-slots {
+  --card-padding: 2px;
+  --cell-top-height: 34px;
+  --cell-inner-gap: 2px;
+}
+
+.placeholder-cell-inner.is-auto-component-slots .placeholder-cell-title {
+  height: 34px;
+  padding: 2px;
+  justify-items: start;
+  align-items: center;
+  text-align: left;
+  line-height: 1.15;
+}
+
+.placeholder-cell-inner.is-auto-component-slots .placeholder-cell-title-main {
+  justify-content: flex-start;
+}
+
+.placeholder-cell-inner.is-auto-component-slots .placeholder-cell-body.has-body-summary {
+  grid-template-rows: minmax(0, var(--block-summary-row-size, 1fr)) minmax(0, var(--block-component-row-size, 3fr));
 }
 
 .placeholder-cell-inner.is-auto-component-slots .placeholder-cell-body-section-3 {
```
- Follow-up: none
