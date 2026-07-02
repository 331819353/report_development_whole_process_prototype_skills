# Code Change Ledger: src\widgets\templates\component-examples\ComboChartExampleCard.vue

- Code file: `src\widgets\templates\component-examples\ComboChartExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\ComboChartExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:50.131Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:50.133Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 985 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `4771c4815374925e51f82a567dcd3a546d27af20ff5632f3e2c0f478f5a78855`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144911 - 2026-07-01T14:49:11.612Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Set aux metric strip default layout
- Modified functionality: component auxMetrics default orientation and placement
- Code ranges: auxOrientation; has-aux body grid; aux horizontal/vertical CSS; compact axis chart marker where applicable; table aux row sizing where applicable
- Modified content: Changed component-owned auxMetrics so auto horizontal keeps the strip between title and chart/body with horizontal tiles and stacked key/value, while auto vertical keeps it between title and chart/body with vertical tiles and inline key/value.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 985 lines, sha256 `4771c4815374925e51f82a567dcd3a546d27af20ff5632f3e2c0f478f5a78855`, captured `2026-07-01T14:29:50.141Z`
- After snapshot: 990 lines, sha256 `0ca9aa43e3b85502d2aa5260f2c1cb251ddd757bfb4e9559e73d18849572d2c9`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144911-ComboChartExampleCard.vue.diff` (992 diff lines, sha256 `5c8a49dd5474fe7d441b430987013ad34da837a9f0f3534c9e84a194e713a9f3`)
- Follow-up: none

### v20260702003638 - 2026-07-02T00:36:38.089Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Show combo chart legend for any series by default
- Modified functionality: ComboChartExampleCard legend visibility gate
- Code ranges: L399-L421, L466-L481
- Modified content: Allowed the default top-centered combo chart legend to render for any non-empty visible series set.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/ --out-dir visual-check-legend-defaults; screenshot visual-check-legend-defaults/geometry-1920x1080.png; rg hidden legend defaults returned no matches
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 990 lines, sha256 `0ca9aa43e3b85502d2aa5260f2c1cb251ddd757bfb4e9559e73d18849572d2c9`, captured `2026-07-02T00:31:38.843Z`
- After snapshot: 990 lines, sha256 `645e3a8bcef7486312645fd378d239a1a55c3ac126c4b77f00650611d3f7aa20`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/ComboChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/ComboChartExampleCard.vue
@@ -400,7 +400,7 @@
   const compact = Math.min(width / 280, height / 170);
   const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
   const axisVisible = resolvedChart.value.axisVisible && width >= 150 && height >= 86;
-  const legendVisible = resolvedChart.value.legendVisible && visibleSeriesRows.value.length > 1 && width >= 240 && height >= 130;
+  const legendVisible = resolvedChart.value.legendVisible && visibleSeriesRows.value.length > 0 && width >= 240 && height >= 130;
   const hasRightAxis = resolvedChart.value.rightAxisVisible && visibleSeriesRows.value.some((item) => (item.yAxisIndex ?? 0) === 1);
   const yAxisLabelGutter = axisVisible ? Math.max(resolvedChart.value.gridLeftPx, width < 220 ? 24 : 30) : 0;
   const rightAxisGutter = axisVisible && hasRightAxis ? Math.max(resolvedChart.value.gridRightPx, width < 260 ? 26 : 34) : resolvedChart.value.gridRightPx;
```
- Follow-up: none

### v20260702004302 - 2026-07-02T00:43:02.336Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Add top breathing room for titleless combo chart aux metrics
- Modified functionality: ComboChartExampleCard titleless auxMetrics spacing
- Code ranges: L879-L882
- Modified content: Added a titleless has-aux CSS rule that applies a bounded top padding to the component-owned aux metrics strip while preserving titled and no-aux layouts.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/ --out-dir visual-check-aux-titleless-spacing
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 990 lines, sha256 `645e3a8bcef7486312645fd378d239a1a55c3ac126c4b77f00650611d3f7aa20`, captured `2026-07-02T00:40:01.732Z`
- After snapshot: 995 lines, sha256 `5e93f8bb20c80a096c222c2edb8258fd5592dc047f7346b12ad6fd44f6590397`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/ComboChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/ComboChartExampleCard.vue
@@ -876,6 +876,11 @@
   grid-template-rows: minmax(0, 1fr);
 }
 
+.combo-chart-example-card:not(.has-title).has-aux .combo-chart-example-aux {
+  box-sizing: border-box;
+  padding-top: min(5px, var(--combo-chart-card-padding));
+}
+
 .combo-chart-example-aux {
   min-width: 0;
   min-height: 0;
```
- Follow-up: none

### v20260702004923 - 2026-07-02T00:49:23.348Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Move titleless combo chart aux metrics away from top border
- Modified functionality: ComboChartExampleCard titleless auxMetrics spacing
- Code ranges: L879-L882
- Modified content: Replaced aux-internal 5px top padding with 12px top padding on the titleless has-aux chart body so the auxiliary metric strip is visually separated from the slot top border.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/ --out-dir visual-check-aux-body-spacing
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 995 lines, sha256 `5e93f8bb20c80a096c222c2edb8258fd5592dc047f7346b12ad6fd44f6590397`, captured `2026-07-02T00:46:31.583Z`
- After snapshot: 995 lines, sha256 `04c87472e2b480afdb97d9f107b1ba6d03489aabba5d38655bd65fbe1276e930`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/ComboChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/ComboChartExampleCard.vue
@@ -876,9 +876,9 @@
   grid-template-rows: minmax(0, 1fr);
 }
 
-.combo-chart-example-card:not(.has-title).has-aux .combo-chart-example-aux {
-  box-sizing: border-box;
-  padding-top: min(5px, var(--combo-chart-card-padding));
+.combo-chart-example-card:not(.has-title).has-aux .combo-chart-example-body {
+  box-sizing: border-box;
+  padding-top: 12px;
 }
 
 .combo-chart-example-aux {
```
- Follow-up: none

### v20260702005422 - 2026-07-02T00:54:22.413Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Use dynamic body padding for titleless combo chart aux metrics
- Modified functionality: ComboChartExampleCard titleless auxMetrics spacing
- Code ranges: L879-L882
- Modified content: Kept the titleless has-aux spacing on the chart body, but changed the top padding from a fixed 12px to the dynamic component padding expression min(5px, var(--combo-chart-card-padding)).
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/ --out-dir visual-check-aux-dynamic-body-spacing
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 995 lines, sha256 `04c87472e2b480afdb97d9f107b1ba6d03489aabba5d38655bd65fbe1276e930`, captured `2026-07-02T00:51:40.323Z`
- After snapshot: 995 lines, sha256 `377d7b7289374fb1287e4d3e8b7ba177b96fc7e11e7dde6594706ab8c28ce212`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/ComboChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/ComboChartExampleCard.vue
@@ -878,7 +878,7 @@
 
 .combo-chart-example-card:not(.has-title).has-aux .combo-chart-example-body {
   box-sizing: border-box;
-  padding-top: 12px;
+  padding-top: min(5px, var(--combo-chart-card-padding));
 }
 
 .combo-chart-example-aux {
```
- Follow-up: none

### v20260702010710 - 2026-07-02T01:07:10.284Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Use dynamic titleless combo chart aux gap
- Modified functionality: ComboChartExampleCard titleless auxMetrics dynamic spacing
- Code ranges: L650-L666, L883-L884
- Modified content: Added a ResizeObserver-backed component CSS variable for titleless auxiliary top spacing and changed the aux strip margin to consume the dynamic variable instead of a fixed pixel value.
- Affected contracts: none
- Verification: npm run build:test; runtime DOM on 5178/5183/5193 verified cssVar 8px/9px and matching auxMarginTop; npm run visual:geometry -- --out-dir visual-check-aux-component-dynamic-gap
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 994 lines, sha256 `177349a3c2d795af16f46d60435fa6b1c485527d7e820bf4bbca944245c246d6`, captured `2026-07-02T01:03:25.067Z`
- After snapshot: 998 lines, sha256 `d9f5b5dbbf7fd3023e302eeefee882ae83b57c44df60731f67b3cd0981bfabb7`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260702010710-ComboChartExampleCard.vue.diff` (475 diff lines, sha256 `46787dfa1808d2c004170a100af4242bb0a7945108d3c4a8c0259758d25598e1`)
- Follow-up: none
