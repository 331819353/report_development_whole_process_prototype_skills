# Code Change Ledger: src\widgets\templates\component-examples\RadarChartExampleCard.vue

- Code file: `src\widgets\templates\component-examples\RadarChartExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\RadarChartExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:52.776Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:52.777Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1021 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `e9745d5e84ca6a6f187a7e8ab4cdc018df11c4faea239cc667a97fca2208385c`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144914 - 2026-07-01T14:49:14.033Z

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
- Before snapshot: 1021 lines, sha256 `e9745d5e84ca6a6f187a7e8ab4cdc018df11c4faea239cc667a97fca2208385c`, captured `2026-07-01T14:29:52.782Z`
- After snapshot: 1018 lines, sha256 `5fcd5d3f8a1135c8071930c48db70537999abbfe165561095ab7fc7571f5ee81`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144914-RadarChartExampleCard.vue.diff` (934 diff lines, sha256 `45990ed89fa58841f5bc1724a45821e7a8581c211a2b5d304ca19b3307d82025`)
- Follow-up: none

### v20260701151507 - 2026-07-01T15:15:07.776Z

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
- Before snapshot: 1018 lines, sha256 `5fcd5d3f8a1135c8071930c48db70537999abbfe165561095ab7fc7571f5ee81`, captured `2026-07-01T15:01:52.807Z`
- After snapshot: 1031 lines, sha256 `9fc09143a0ad48c5804140a7e88fce0fe1b15ed0d305e7f186d522fb756d206d`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701151507-RadarChartExampleCard.vue.diff` (864 diff lines, sha256 `b0a573a0bcd6978affddad4fa3e77c94686c1dea10fbb116011b091193f154f7`)
- Follow-up: none

### v20260702003639 - 2026-07-02T00:36:39.650Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Show radar legend by default on the right
- Modified functionality: RadarChartExampleCard right legend visibility gate
- Code ranges: L488-L524, L566-L585
- Modified content: Allowed the default right-side radar legend to render for any non-empty series set, including single-series radar charts.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/ --out-dir visual-check-legend-defaults; screenshot visual-check-legend-defaults/geometry-1920x1080.png; rg hidden legend defaults returned no matches
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1031 lines, sha256 `9fc09143a0ad48c5804140a7e88fce0fe1b15ed0d305e7f186d522fb756d206d`, captured `2026-07-02T00:31:40.324Z`
- After snapshot: 1031 lines, sha256 `25f6aab1d2d36d0926e7a979731b819403ffda815a24efc71f412bd375e69100`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/RadarChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/RadarChartExampleCard.vue
@@ -490,7 +490,7 @@
   const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
   const chartConfig = resolvedChart.value;
   const effectiveLegendPosition = chartConfig.legendPosition === 'auto' ? 'right' : chartConfig.legendPosition;
-  const legendVisible = chartConfig.legendVisible && effectiveLegendPosition !== 'hidden' && seriesRows.value.length > 1;
+  const legendVisible = chartConfig.legendVisible && effectiveLegendPosition !== 'hidden' && seriesRows.value.length > 0;
   const legendPlacement: 'right' | 'top' = effectiveLegendPosition === 'top' ? 'top' : 'right';
   const legendTopVisible = legendVisible && legendPlacement === 'top';
   const legendRightVisible = legendVisible && legendPlacement === 'right';
```
- Follow-up: none
