# Code Change Ledger: src\widgets\templates\component-examples\LineChartExampleCard.vue

- Code file: `src\widgets\templates\component-examples\LineChartExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\LineChartExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:48.045Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:48.047Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 852 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `aea58b94abc7015f6c504a6a38c738b9404af0157b16774302aaf608fc2a7163`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144859 - 2026-07-01T14:48:59.975Z

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
- Before snapshot: 852 lines, sha256 `aea58b94abc7015f6c504a6a38c738b9404af0157b16774302aaf608fc2a7163`, captured `2026-07-01T14:29:48.052Z`
- After snapshot: 857 lines, sha256 `ed47ef63acddd14f826ceeee9801dfb04a44391521fa7e967437d407ab09ad8d`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144859-LineChartExampleCard.vue.diff` (828 diff lines, sha256 `c4a4e4ea954165e6fa97f40352ff0e4988141516b5ed21ee6b76af603e0b9958`)
- Follow-up: none

### v20260701231811 - 2026-07-01T23:18:11.351Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Enable line-chart legend by default for multi-series examples
- Modified functionality: LineChartExampleCard chart default configuration and ECharts legend visibility
- Code ranges: L131-L143, L348-L365, L407-L423
- Modified content: Changed the line-chart registered component default so multi-series line charts can render the top-centered ECharts legend.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/ --out-dir visual-check-current-fix; API smoke /api/health, /api/filter-options/period, /api/component-props/overview.D.A; screenshot visual-check-current-fix/geometry-1920x1080.png
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 857 lines, sha256 `ed47ef63acddd14f826ceeee9801dfb04a44391521fa7e967437d407ab09ad8d`, captured `2026-07-01T23:13:37.971Z`
- After snapshot: 857 lines, sha256 `26c81b8aab6fe517defe30053d8a2f46932a86e4bb01a610d31ced3ee2986bf3`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/LineChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/LineChartExampleCard.vue
@@ -131,7 +131,7 @@
 };
 
 const defaultChartConfig: Required<LineChartExampleChartConfig> = {
-  legendVisible: false,
+  legendVisible: true,
   smooth: true,
   areaVisible: true,
   showSymbol: true,
```
- Follow-up: none

### v20260702003637 - 2026-07-02T00:36:37.339Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Show line chart legend for any series by default
- Modified functionality: LineChartExampleCard legend visibility gate
- Code ranges: L348-L365, L407-L423
- Modified content: Allowed the default top-centered line chart legend to render for any non-empty series set instead of only multi-series charts.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/ --out-dir visual-check-legend-defaults; screenshot visual-check-legend-defaults/geometry-1920x1080.png; rg hidden legend defaults returned no matches
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 857 lines, sha256 `26c81b8aab6fe517defe30053d8a2f46932a86e4bb01a610d31ced3ee2986bf3`, captured `2026-07-02T00:31:37.994Z`
- After snapshot: 857 lines, sha256 `2a5ec84e32f5af02f68e717bb95711c2940174611943967f02b6b81ae9df3a7c`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/LineChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/LineChartExampleCard.vue
@@ -349,7 +349,7 @@
   const compact = Math.min(width / 280, height / 170);
   const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
   const axisVisible = resolvedChart.value.axisVisible && width >= 150 && height >= 86;
-  const legendVisible = resolvedChart.value.legendVisible && seriesRows.value.length > 1 && width >= 240 && height >= 130;
+  const legendVisible = resolvedChart.value.legendVisible && seriesRows.value.length > 0 && width >= 240 && height >= 130;
   const yAxisLabelGutter = axisVisible ? Math.max(resolvedChart.value.gridLeftPx, width < 220 ? 24 : 30) : 0;
 
   return {
```
- Follow-up: none

### v20260702004258 - 2026-07-02T00:42:58.995Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Add top breathing room for titleless line chart aux metrics
- Modified functionality: LineChartExampleCard titleless auxMetrics spacing
- Code ranges: L746-L749
- Modified content: Added a titleless has-aux CSS rule that applies a bounded top padding to the component-owned aux metrics strip while preserving titled and no-aux layouts.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/ --out-dir visual-check-aux-titleless-spacing
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 857 lines, sha256 `2a5ec84e32f5af02f68e717bb95711c2940174611943967f02b6b81ae9df3a7c`, captured `2026-07-02T00:39:58.782Z`
- After snapshot: 862 lines, sha256 `df3779322f733566ea29e870edb7a67471bb38fe8aa531dc001884ceaa7e7716`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/LineChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/LineChartExampleCard.vue
@@ -743,6 +743,11 @@
   grid-template-rows: minmax(0, 1fr);
 }
 
+.line-chart-example-card:not(.has-title).has-aux .line-chart-example-aux {
+  box-sizing: border-box;
+  padding-top: min(5px, var(--line-chart-card-padding));
+}
+
 .line-chart-example-aux {
   min-width: 0;
   min-height: 0;
```
- Follow-up: none

### v20260702004920 - 2026-07-02T00:49:20.163Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Move titleless line chart aux metrics away from top border
- Modified functionality: LineChartExampleCard titleless auxMetrics spacing
- Code ranges: L746-L749
- Modified content: Replaced aux-internal 5px top padding with 12px top padding on the titleless has-aux chart body so the auxiliary metric strip is visually separated from the slot top border.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/ --out-dir visual-check-aux-body-spacing
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 862 lines, sha256 `df3779322f733566ea29e870edb7a67471bb38fe8aa531dc001884ceaa7e7716`, captured `2026-07-02T00:46:28.651Z`
- After snapshot: 862 lines, sha256 `c64c6aaaa5c28c1af1aeea5ee7d58c40d216b0ea9219108ed9f20e636dfb2aa3`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/LineChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/LineChartExampleCard.vue
@@ -743,9 +743,9 @@
   grid-template-rows: minmax(0, 1fr);
 }
 
-.line-chart-example-card:not(.has-title).has-aux .line-chart-example-aux {
-  box-sizing: border-box;
-  padding-top: min(5px, var(--line-chart-card-padding));
+.line-chart-example-card:not(.has-title).has-aux .line-chart-example-body {
+  box-sizing: border-box;
+  padding-top: 12px;
 }
 
 .line-chart-example-aux {
```
- Follow-up: none

### v20260702005418 - 2026-07-02T00:54:18.886Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Use dynamic body padding for titleless line chart aux metrics
- Modified functionality: LineChartExampleCard titleless auxMetrics spacing
- Code ranges: L746-L749
- Modified content: Kept the titleless has-aux spacing on the chart body, but changed the top padding from a fixed 12px to the dynamic component padding expression min(5px, var(--line-chart-card-padding)).
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/ --out-dir visual-check-aux-dynamic-body-spacing
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 862 lines, sha256 `c64c6aaaa5c28c1af1aeea5ee7d58c40d216b0ea9219108ed9f20e636dfb2aa3`, captured `2026-07-02T00:51:37.029Z`
- After snapshot: 862 lines, sha256 `60a2ad08c0bbe8030e1a23074b273c8ce83a417f31230acb689d3d112ea64887`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/LineChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/LineChartExampleCard.vue
@@ -745,7 +745,7 @@
 
 .line-chart-example-card:not(.has-title).has-aux .line-chart-example-body {
   box-sizing: border-box;
-  padding-top: 12px;
+  padding-top: min(5px, var(--line-chart-card-padding));
 }
 
 .line-chart-example-aux {
```
- Follow-up: none

### v20260702010709 - 2026-07-02T01:07:09.314Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Use dynamic titleless line chart aux gap
- Modified functionality: LineChartExampleCard titleless auxMetrics dynamic spacing
- Code ranges: L517-L533, L750-L751
- Modified content: Added a ResizeObserver-backed component CSS variable for titleless auxiliary top spacing and changed the aux strip margin to consume the dynamic variable instead of a fixed pixel value.
- Affected contracts: none
- Verification: npm run build:test; runtime DOM on 5178/5183/5193 verified cssVar 8px/9px and matching auxMarginTop; npm run visual:geometry -- --out-dir visual-check-aux-component-dynamic-gap
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 861 lines, sha256 `9d51ea004cde755303874fd8e9da5d8c2ca774ba4a06ecf107d1bf87036062dd`, captured `2026-07-02T01:03:24.362Z`
- After snapshot: 865 lines, sha256 `1695da03f0731fed5b811040f7b3c37f0520bb7133e228540c8151cc36bbc098`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260702010709-LineChartExampleCard.vue.diff` (475 diff lines, sha256 `683ae7402b420b1b96d027b4c77b2416ecc9971db68e1fa781c37df62d3ff5e2`)
- Follow-up: none
