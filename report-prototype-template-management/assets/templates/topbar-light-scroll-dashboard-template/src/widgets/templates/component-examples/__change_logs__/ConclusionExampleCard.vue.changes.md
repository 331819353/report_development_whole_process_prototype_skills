# Code Change Ledger: src\widgets\templates\component-examples\ConclusionExampleCard.vue

- Code file: `src\widgets\templates\component-examples\ConclusionExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\ConclusionExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T15:01:27.722Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T15:01:27.723Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 768 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `88297a1ed7be9568e66293e671f9db9dabb45b6923c67d80b02b18619a76e911`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701151443 - 2026-07-01T15:14:43.712Z

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
- Before snapshot: 768 lines, sha256 `88297a1ed7be9568e66293e671f9db9dabb45b6923c67d80b02b18619a76e911`, captured `2026-07-01T15:01:27.727Z`
- After snapshot: 769 lines, sha256 `2f4cff742a4767481974bc109a0642560efe6bfa43b4ae4104d0138e12613b28`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/ConclusionExampleCard.vue
+++ b/src/widgets/templates/component-examples/ConclusionExampleCard.vue
@@ -538,7 +538,8 @@
 
 .conclusion-example-core {
   display: grid;
-  grid-template-rows: auto minmax(0, 1fr) auto;
+  grid-template-rows: auto auto auto;
+  align-content: center;
   gap: 3px;
   padding: 6px 7px;
   border: 1px solid var(--conclusion-border, rgba(0, 87, 217, 0.16));
```
- Follow-up: none

### v20260701231810 - 2026-07-01T23:18:10.475Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Keep only the conclusion-card main statement vertically centered
- Modified functionality: ConclusionExampleCard core grid and main conclusion alignment
- Code ranges: L539-L623
- Modified content: Restored the core card to top/middle/bottom grid rows and centered only the main conclusion within the flexible middle row.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5178/ --out-dir visual-check-current-fix; API smoke /api/health, /api/filter-options/period, /api/component-props/overview.D.A; screenshot visual-check-current-fix/geometry-1920x1080.png
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 769 lines, sha256 `2f4cff742a4767481974bc109a0642560efe6bfa43b4ae4104d0138e12613b28`, captured `2026-07-01T23:13:37.125Z`
- After snapshot: 769 lines, sha256 `1eadc3b8b341c268ef65049fefc8d1540fdc0fb8a324194a0da68695a3c3a7f2`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/ConclusionExampleCard.vue
+++ b/src/widgets/templates/component-examples/ConclusionExampleCard.vue
@@ -538,88 +538,88 @@
 
 .conclusion-example-core {
   display: grid;
-  grid-template-rows: auto auto auto;
-  align-content: center;
-  gap: 3px;
-  padding: 6px 7px;
-  border: 1px solid var(--conclusion-border, rgba(0, 87, 217, 0.16));
-  border-radius: 6px;
-  background:
-    linear-gradient(135deg, var(--conclusion-panel-strong, rgba(18, 161, 80, 0.08)), transparent 62%),
-    linear-gradient(180deg, rgba(255, 255, 255, 0.72), var(--conclusion-panel, rgba(0, 87, 217, 0.035)));
-}
-
-.conclusion-example-card.is-vertical .conclusion-example-core {
-  gap: 2px;
-  padding: 4px 6px;
-}
-
-.conclusion-example-kicker {
-  display: grid;
-  grid-template-columns: minmax(0, 1fr) auto;
-  align-items: center;
-  gap: 5px;
-  min-width: 0;
-  overflow: hidden;
-}
-
-.conclusion-example-kicker-text {
-  min-width: 0;
-  overflow: hidden;
-  color: var(--conclusion-muted, #667085);
-  font-size: max(8px, calc(var(--conclusion-emphasis-font-size, 10px) - 1px));
-  font-weight: 800;
-  line-height: 1.1;
-  text-overflow: ellipsis;
-  white-space: nowrap;
-}
-
-.conclusion-example-status {
-  display: inline-flex;
-  align-items: center;
-  justify-content: center;
-  max-width: 88px;
-  min-width: 0;
-  height: 17px;
-  overflow: hidden;
-  padding: 0 6px;
-  border-radius: 999px;
-  color: var(--conclusion-primary, #0057d9);
-  background: color-mix(in srgb, var(--conclusion-primary, #0057d9) 8%, transparent);
-  font-size: max(8px, calc(var(--conclusion-emphasis-font-size, 10px) - 1px));
-  font-weight: 800;
-  line-height: 1;
-  text-overflow: ellipsis;
-  white-space: nowrap;
-}
-
-.conclusion-example-card.is-vertical .conclusion-example-status {
-  max-width: 70px;
-  height: 15px;
-  padding: 0 5px;
-}
-
-.conclusion-example-core.tone-success .conclusion-example-status {
-  color: var(--conclusion-success, #12a150);
-  background: color-mix(in srgb, var(--conclusion-success, #12a150) 8%, transparent);
-}
-
-.conclusion-example-core.tone-warning .conclusion-example-status {
-  color: var(--conclusion-warning, #dc8a00);
-  background: color-mix(in srgb, var(--conclusion-warning, #dc8a00) 8%, transparent);
-}
-
-.conclusion-example-core.tone-danger .conclusion-example-status {
-  color: var(--conclusion-danger, #d92d20);
-  background: color-mix(in srgb, var(--conclusion-danger, #d92d20) 8%, transparent);
-}
-
-.conclusion-example-core.tone-neutral .conclusion-example-status {
-  color: var(--conclusion-neutral, #667085);
-  background: color-mix(in srgb, var(--conclusion-neutral, #667085) 8%, transparent);
-}
-
-.conclusion-example-main {
+  grid-template-rows: auto minmax(0, 1fr) auto;
+  gap: 3px;
+  padding: 6px 7px;
+  border: 1px solid var(--conclusion-border, rgba(0, 87, 217, 0.16));
+  border-radius: 6px;
+  background:
+    linear-gradient(135deg, var(--conclusion-panel-strong, rgba(18, 161, 80, 0.08)), transparent 62%),
+    linear-gradient(180deg, rgba(255, 255, 255, 0.72), var(--conclusion-panel, rgba(0, 87, 217, 0.035)));
+}
+
+.conclusion-example-card.is-vertical .conclusion-example-core {
+  gap: 2px;
+  padding: 4px 6px;
+}
+
+.conclusion-example-kicker {
+  display: grid;
+  grid-template-columns: minmax(0, 1fr) auto;
+  align-items: center;
+  gap: 5px;
+  min-width: 0;
+  overflow: hidden;
+}
+
+.conclusion-example-kicker-text {
+  min-width: 0;
+  overflow: hidden;
+  color: var(--conclusion-muted, #667085);
+  font-size: max(8px, calc(var(--conclusion-emphasis-font-size, 10px) - 1px));
+  font-weight: 800;
+  line-height: 1.1;
+  text-overflow: ellipsis;
+  white-space: nowrap;
+}
+
+.conclusion-example-status {
+  display: inline-flex;
+  align-items: center;
+  justify-content: center;
+  max-width: 88px;
+  min-width: 0;
+  height: 17px;
+  overflow: hidden;
+  padding: 0 6px;
+  border-radius: 999px;
+  color: var(--conclusion-primary, #0057d9);
+  background: color-mix(in srgb, var(--conclusion-primary, #0057d9) 8%, transparent);
+  font-size: max(8px, calc(var(--conclusion-emphasis-font-size, 10px) - 1px));
+  font-weight: 800;
+  line-height: 1;
+  text-overflow: ellipsis;
+  white-space: nowrap;
+}
+
+.conclusion-example-card.is-vertical .conclusion-example-status {
+  max-width: 70px;
+  height: 15px;
+  padding: 0 5px;
+}
+
+.conclusion-example-core.tone-success .conclusion-example-status {
+  color: var(--conclusion-success, #12a150);
+  background: color-mix(in srgb, var(--conclusion-success, #12a150) 8%, transparent);
+}
+
+.conclusion-example-core.tone-warning .conclusion-example-status {
+  color: var(--conclusion-warning, #dc8a00);
+  background: color-mix(in srgb, var(--conclusion-warning, #dc8a00) 8%, transparent);
+}
+
+.conclusion-example-core.tone-danger .conclusion-example-status {
+  color: var(--conclusion-danger, #d92d20);
+  background: color-mix(in srgb, var(--conclusion-danger, #d92d20) 8%, transparent);
+}
+
+.conclusion-example-core.tone-neutral .conclusion-example-status {
+  color: var(--conclusion-neutral, #667085);
+  background: color-mix(in srgb, var(--conclusion-neutral, #667085) 8%, transparent);
+}
+
+.conclusion-example-main {
+  align-self: center;
   display: -webkit-box;
   min-width: 0;
   min-height: 0;
```
- Follow-up: none
