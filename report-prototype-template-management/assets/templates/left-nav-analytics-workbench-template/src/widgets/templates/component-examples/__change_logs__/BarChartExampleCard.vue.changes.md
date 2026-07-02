# Code Change Ledger: src\widgets\templates\component-examples\BarChartExampleCard.vue

- Code file: `src\widgets\templates\component-examples\BarChartExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\BarChartExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:49.088Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:49.089Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 853 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `776127b72c7cb4031a699004725ef683127258ab2542ee36f9c0e807d6c93261`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144900 - 2026-07-01T14:49:00.862Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Set aux metric strip default layout
- Modified functionality: component auxMetrics default orientation and placement
- Code ranges: auxOrientation; has-aux body grid; aux horizontal/vertical CSS; compact axis chart marker where applicable; table aux row sizing where applicable
- Modified content: Changed component-owned auxMetrics so auto horizontal keeps the strip between title and chart/body with horizontal tiles and stacked key/value, while auto vertical keeps it between title and chart/body with vertical tiles and inline key/value.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 853 lines, sha256 `776127b72c7cb4031a699004725ef683127258ab2542ee36f9c0e807d6c93261`, captured `2026-07-01T14:29:49.096Z`
- After snapshot: 858 lines, sha256 `8520ec5fb0bfe67f799d9bbe5cb0a01dcb39abaffa0b7ffc1c084d9bc00b08a9`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144900-BarChartExampleCard.vue.diff` (822 diff lines, sha256 `9608e03c14f00b701ccfaf6e1f998e8838f5e19ab217e045eedcfdf9de18ddd5`)
- Follow-up: none

### v20260702003636 - 2026-07-02T00:36:36.519Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Show bar chart legend by default
- Modified functionality: BarChartExampleCard chart default and legend visibility gate
- Code ranges: L131-L143, L348-L370, L416-L430
- Modified content: Enabled bar chart legend by default and allowed it to render for any non-empty series set.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/ --out-dir visual-check-legend-defaults; screenshot visual-check-legend-defaults/geometry-1920x1080.png; rg hidden legend defaults returned no matches
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 858 lines, sha256 `8520ec5fb0bfe67f799d9bbe5cb0a01dcb39abaffa0b7ffc1c084d9bc00b08a9`, captured `2026-07-02T00:31:37.109Z`
- After snapshot: 858 lines, sha256 `4082bc9ffaf168f16bd0d2f8b2fdd617f5e64b99d3d16d9ae93eeb9998940e73`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260702003636-BarChartExampleCard.vue.diff` (455 diff lines, sha256 `cb990e1d705fb9056873680ff5e042458e0c474aefb4cb594cc84439d84b8095`)
- Follow-up: none

### v20260702004258 - 2026-07-02T00:42:58.065Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Add top breathing room for titleless bar chart aux metrics
- Modified functionality: BarChartExampleCard titleless auxMetrics spacing
- Code ranges: L747-L750
- Modified content: Added a titleless has-aux CSS rule that applies a bounded top padding to the component-owned aux metrics strip while preserving titled and no-aux layouts.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/ --out-dir visual-check-aux-titleless-spacing
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 858 lines, sha256 `4082bc9ffaf168f16bd0d2f8b2fdd617f5e64b99d3d16d9ae93eeb9998940e73`, captured `2026-07-02T00:39:57.993Z`
- After snapshot: 863 lines, sha256 `aa7363d05c7f4eb91b77f5817efe79aa11ff9181e1c7409466ad1a8fd79a13d5`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/BarChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/BarChartExampleCard.vue
@@ -744,6 +744,11 @@
   grid-template-rows: minmax(0, 1fr);
 }
 
+.bar-chart-example-card:not(.has-title).has-aux .bar-chart-example-aux {
+  box-sizing: border-box;
+  padding-top: min(5px, var(--bar-chart-card-padding));
+}
+
 .bar-chart-example-aux {
   min-width: 0;
   min-height: 0;
```
- Follow-up: none

### v20260702004919 - 2026-07-02T00:49:19.426Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Move titleless bar chart aux metrics away from top border
- Modified functionality: BarChartExampleCard titleless auxMetrics spacing
- Code ranges: L747-L750
- Modified content: Replaced aux-internal 5px top padding with 12px top padding on the titleless has-aux chart body so the auxiliary metric strip is visually separated from the slot top border.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/ --out-dir visual-check-aux-body-spacing
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 863 lines, sha256 `aa7363d05c7f4eb91b77f5817efe79aa11ff9181e1c7409466ad1a8fd79a13d5`, captured `2026-07-02T00:46:27.877Z`
- After snapshot: 863 lines, sha256 `ef5e2ccf7fd8a12a74d2403b6086bcf50363eecb318278ecc5d6b7ab512f0144`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/BarChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/BarChartExampleCard.vue
@@ -744,9 +744,9 @@
   grid-template-rows: minmax(0, 1fr);
 }
 
-.bar-chart-example-card:not(.has-title).has-aux .bar-chart-example-aux {
-  box-sizing: border-box;
-  padding-top: min(5px, var(--bar-chart-card-padding));
+.bar-chart-example-card:not(.has-title).has-aux .bar-chart-example-body {
+  box-sizing: border-box;
+  padding-top: 12px;
 }
 
 .bar-chart-example-aux {
```
- Follow-up: none

### v20260702005418 - 2026-07-02T00:54:18.185Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Use dynamic body padding for titleless bar chart aux metrics
- Modified functionality: BarChartExampleCard titleless auxMetrics spacing
- Code ranges: L747-L750
- Modified content: Kept the titleless has-aux spacing on the chart body, but changed the top padding from a fixed 12px to the dynamic component padding expression min(5px, var(--bar-chart-card-padding)).
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/ --out-dir visual-check-aux-dynamic-body-spacing
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 863 lines, sha256 `ef5e2ccf7fd8a12a74d2403b6086bcf50363eecb318278ecc5d6b7ab512f0144`, captured `2026-07-02T00:51:36.243Z`
- After snapshot: 863 lines, sha256 `bad739daefed941f16449cff72fd11bd414dc24136688b407a3dcbb74bdce4f7`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/BarChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/BarChartExampleCard.vue
@@ -746,7 +746,7 @@
 
 .bar-chart-example-card:not(.has-title).has-aux .bar-chart-example-body {
   box-sizing: border-box;
-  padding-top: 12px;
+  padding-top: min(5px, var(--bar-chart-card-padding));
 }
 
 .bar-chart-example-aux {
```
- Follow-up: none

### v20260702010708 - 2026-07-02T01:07:08.409Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Use dynamic titleless bar chart aux gap
- Modified functionality: BarChartExampleCard titleless auxMetrics dynamic spacing
- Code ranges: L518-L534, L751-L752
- Modified content: Added a ResizeObserver-backed component CSS variable for titleless auxiliary top spacing and changed the aux strip margin to consume the dynamic variable instead of a fixed pixel value.
- Affected contracts: none
- Verification: npm run build:test; runtime DOM on 5178/5183/5193 verified cssVar 8px/9px and matching auxMarginTop; npm run visual:geometry -- --out-dir visual-check-aux-component-dynamic-gap
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 862 lines, sha256 `0f6590ceb305cf51c5ea058293306a867195537e7b14c751693b04655e282f26`, captured `2026-07-02T01:03:23.509Z`
- After snapshot: 866 lines, sha256 `b7ca4d166c4f5ae30bfd4c65e91241e604c994d3c21cffdcb2be5994361649ec`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260702010708-BarChartExampleCard.vue.diff` (475 diff lines, sha256 `a517943fd8664ad5faf0a57f597e0f03fbfdd8487b8e642d0be30b0f2d88dbfb`)
- Follow-up: none
