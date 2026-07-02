# Code Change Ledger: src\widgets\templates\component-examples\SunburstChartExampleCard.vue

- Code file: `src\widgets\templates\component-examples\SunburstChartExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\SunburstChartExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:53.541Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:53.542Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1069 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `98112b50316595f9ef087c7da5798f450442e3ec142982bd01dba3609f80d981`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144904 - 2026-07-01T14:49:04.891Z

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
- Before snapshot: 1069 lines, sha256 `98112b50316595f9ef087c7da5798f450442e3ec142982bd01dba3609f80d981`, captured `2026-07-01T14:29:53.547Z`
- After snapshot: 1066 lines, sha256 `27a0f9597c7ab6eaf0cf64763ddc101d08f15ba6f8734ec157a79c6558b158dc`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144904-SunburstChartExampleCard.vue.diff` (882 diff lines, sha256 `5d60fc13eb387e366edefea178f3b040d666d5d8bf45a7d36164d9f30116191b`)
- Follow-up: none

### v20260701151457 - 2026-07-01T15:14:57.362Z

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
- Before snapshot: 1066 lines, sha256 `27a0f9597c7ab6eaf0cf64763ddc101d08f15ba6f8734ec157a79c6558b158dc`, captured `2026-07-01T15:01:41.701Z`
- After snapshot: 1122 lines, sha256 `7fb5de5684fa27e9e89110fd6c805baee5bb080724f2e6757d9a2202a6a58342`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701151457-SunburstChartExampleCard.vue.diff` (1131 diff lines, sha256 `c56efc5fb52cbfcd4fbcb8cc6df14ba658240cae9833829ebb4e4fbeb43c8e95`)
- Follow-up: none

### v20260702003640 - 2026-07-02T00:36:40.508Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Show sunburst legend by default on the right
- Modified functionality: SunburstChartExampleCard right legend visibility gate
- Code ranges: L531-L566, L623-L641
- Modified content: Allowed the default right-side sunburst legend to render for any non-empty root legend item set.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/ --out-dir visual-check-legend-defaults; screenshot visual-check-legend-defaults/geometry-1920x1080.png; rg hidden legend defaults returned no matches
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1122 lines, sha256 `7fb5de5684fa27e9e89110fd6c805baee5bb080724f2e6757d9a2202a6a58342`, captured `2026-07-02T00:31:41.063Z`
- After snapshot: 1122 lines, sha256 `cde140b069399fc348eb76e3f6974761c812f443f0f8ac38e7f498a0deecd816`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/component-examples/SunburstChartExampleCard.vue
+++ b/src/widgets/templates/component-examples/SunburstChartExampleCard.vue
@@ -533,7 +533,7 @@
   const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
   const chartConfig = resolvedChart.value;
   const effectiveLegendPosition = chartConfig.legendPosition === 'auto' ? 'right' : chartConfig.legendPosition;
-  const legendVisible = chartConfig.legendVisible && effectiveLegendPosition !== 'hidden' && rootLegendItems.value.length > 1 && width >= 160 && height >= 100;
+  const legendVisible = chartConfig.legendVisible && effectiveLegendPosition !== 'hidden' && rootLegendItems.value.length > 0 && width >= 160 && height >= 100;
   const legendTopVisible = legendVisible && effectiveLegendPosition === 'top';
   const legendRightVisible = legendVisible && effectiveLegendPosition === 'right';
   const maxLegendNameLength = Math.max(1, ...rootLegendItems.value.map((item) => item.length));
```
- Follow-up: none
