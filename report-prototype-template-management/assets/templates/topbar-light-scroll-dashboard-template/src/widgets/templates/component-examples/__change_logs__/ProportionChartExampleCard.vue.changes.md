# Code Change Ledger: src\widgets\templates\component-examples\ProportionChartExampleCard.vue

- Code file: `src\widgets\templates\component-examples\ProportionChartExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\ProportionChartExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:51.142Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:51.144Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1032 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `bd1354889940d06fbe351c13300cadda2442712db6e28358d927bcea4ad40d9e`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144852 - 2026-07-01T14:48:52.115Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Set aux metric strip default layout
- Modified functionality: component auxMetrics default orientation and placement
- Code ranges: auxOrientation; has-aux body grid; aux horizontal/vertical CSS; compact axis chart marker where applicable; table aux row sizing where applicable
- Modified content: Changed component-owned auxMetrics so auto horizontal keeps the strip between title and chart/body with horizontal tiles and stacked key/value, while auto vertical keeps it between title and chart/body with vertical tiles and inline key/value.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5178/
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1032 lines, sha256 `bd1354889940d06fbe351c13300cadda2442712db6e28358d927bcea4ad40d9e`, captured `2026-07-01T14:29:51.151Z`
- After snapshot: 1029 lines, sha256 `c1839767ef0ced28c88973e70a3840a372624c683c0d61658f19ad5c7ac3f7ed`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144852-ProportionChartExampleCard.vue.diff` (982 diff lines, sha256 `e6c34b40670ba7b777de34731eeffb932002881969f23162bc35d6b4ccf6a5f5`)
- Follow-up: none

### v20260701151444 - 2026-07-01T15:14:44.611Z

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
- Before snapshot: 1029 lines, sha256 `c1839767ef0ced28c88973e70a3840a372624c683c0d61658f19ad5c7ac3f7ed`, captured `2026-07-01T15:01:28.702Z`
- After snapshot: 1029 lines, sha256 `62b0635a955a474eb169d87384d272eb05f137ba84dbcb072d4da484e492c767`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701151444-ProportionChartExampleCard.vue.diff` (609 diff lines, sha256 `a1e5b225c8720c5fb98d66a50605e3034df160d958bb02b82638b3fc65876983`)
- Follow-up: none

### v20260702003638 - 2026-07-02T00:36:38.892Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Show proportion/pie legend by default on the right
- Modified functionality: ProportionChartExampleCard right legend visibility gate
- Code ranges: L439-L466, L499-L546
- Modified content: Allowed the default right-side proportion/pie legend to render for any non-empty item set.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5178/ --out-dir visual-check-legend-defaults; screenshot visual-check-legend-defaults/geometry-1920x1080.png; rg hidden legend defaults returned no matches
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1029 lines, sha256 `62b0635a955a474eb169d87384d272eb05f137ba84dbcb072d4da484e492c767`, captured `2026-07-02T00:31:39.560Z`
- After snapshot: 1029 lines, sha256 `ec383b4b2b48ffe6debab9abc38b5be105fcb2ee116ff8dbd255f5b85441441a`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/ProportionChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/ProportionChartExampleCard.vue
@@ -441,7 +441,7 @@
     : chartConfig.legendPosition;
   const legendVisible = chartConfig.legendVisible
     && effectiveLegendPosition !== 'hidden'
-    && visibleItems.value.length > 1
+    && visibleItems.value.length > 0
     && width >= 160
     && height >= 100;
   const rightLegendVisible = legendVisible && effectiveLegendPosition === 'right';
```
- Follow-up: none
