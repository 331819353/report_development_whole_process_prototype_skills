# Code Change Ledger: src/report-template-assets/business-report-pages.ts

- Code file: `src/report-template-assets/business-report-pages.ts`
- Ledger file: `src/report-template-assets/__change_logs__/business-report-pages.ts.changes.md`
- Purpose: Initialized bundled-template baseline. Fill in project-specific ownership after copying/configuring the template.
- Primary features: template baseline
- Last reviewed before edit: template initialization
- Process-record policy: internal template-development history is intentionally omitted from bundled templates.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| TEMPLATE-BASELINE | Current bundled template behavior | 987 lines | project configuration | runnable template source | Replace with project-specific inventory after the first real edit. |

## Version Entries

### template-initialized

- Change ID: template-baseline
- Actor: template
- Change type: baseline
- Summary: Clean baseline record for a newly copied report template.
- Modified functionality: none
- Code ranges: current file snapshot, 987 lines
- Modified content: none
- Affected contracts: none
- Verification: current template snapshot sha256 `b32021061f95a4bf276b0664abf8542d62ab8a4f2d482954f84846922dc65fec`; run `npm run ledger:code -- --file src/report-template-assets/business-report-pages.ts --stage before` before the first project-specific edit.
- Rollback note: restore this file from the bundled template or project VCS.
- Related files: none
- Change evidence: baseline only; no project-specific change has been recorded yet.
- Follow-up: append project-specific entries after the first real change.

### v20260701142023 - 2026-07-01T14:20:23.330Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Add overview 6x3 and 12x3 three-slot launch blocks
- Modified functionality: templateLaunchLayoutRows, overviewWidgets A-C, projectReportPages.overview
- Code ranges: templateLaunchLayoutRows; overviewWidgets A-C; projectReportPages.overview.layoutRows
- Modified content: Added overview 6x3/12x3 layout rows and ABC component slots for title, auxiliary, and chart examples.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/; mock API smoke /api/health and /api/component-props/overview.C.C
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 975 lines, sha256 `da529cb8fe4012a03c94a26ca26906be965fd8fc661325de37f71a649aaf0062`, captured `2026-07-01T14:07:34.596Z`
- After snapshot: 999 lines, sha256 `b3231b43b392e1a5116874c3cca7f011122e9aef5e820a181bd9958f52eaf35b`
- Change evidence: sidecar patch `src\report-template-assets\__change_logs__\patches\v20260701142023-business-report-pages.ts.diff` (851 diff lines, sha256 `a3b20c7385246eb1213501c42b0b1bf712e57afd3ccde695dfa5154224d3b04e`)
- Follow-up: none

### v20260701151512 - 2026-07-01T15:15:12.780Z

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
- Before snapshot: 999 lines, sha256 `b3231b43b392e1a5116874c3cca7f011122e9aef5e820a181bd9958f52eaf35b`, captured `2026-07-01T15:01:57.792Z`
- After snapshot: 1000 lines, sha256 `e06245217bfab32c1320253138ef9a65d5061a54b5a476025450cab7c3db9bab`
- Change evidence: inline unified diff:

```diff
--- a/src/report-template-assets/business-report-pages.ts
+++ b/src/report-template-assets/business-report-pages.ts
@@ -519,6 +519,7 @@
 const projectLayoutRows = [
   'AAAABBBBCCCC',
   'AAAABBBBCCCC',
+  'AAAABBBBCCCC',
   'DDDDEEEEFFFF',
   'DDDDEEEEFFFF',
   'DDDDEEEEFFFF',
```
- Follow-up: none

### v20260701231812 - 2026-07-01T23:18:12.236Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Mount line chart examples with default top legend
- Modified functionality: business report component example runtime config for LineChartExampleCard
- Code ranges: L82-L116, L181-L191
- Modified content: Added a line-specific runtime config that overrides the shared chart slot default and mounts LineChartExampleCard with legendVisible true and top placement.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/ --out-dir visual-check-current-fix; API smoke /api/health, /api/filter-options/period, /api/component-props/overview.D.A; screenshot visual-check-current-fix/geometry-1920x1080.png
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1000 lines, sha256 `e06245217bfab32c1320253138ef9a65d5061a54b5a476025450cab7c3db9bab`, captured `2026-07-01T23:13:38.771Z`
- After snapshot: 1009 lines, sha256 `1d5f0667c413c15caa96dfc586a1766cc3e85e617ef80c9b940bc79027e884b1`
- Change evidence: inline unified diff:

```diff
--- a/src/report-template-assets/business-report-pages.ts
+++ b/src/report-template-assets/business-report-pages.ts
@@ -106,78 +106,87 @@
   },
 };
 
-const metricSlotDisplayConfig: ComponentExampleRuntimeConfig = {
-  title: {
-    ...componentTitleBaseConfig,
-  },
-  layout: {
-    valueRatio: 3,
-    accessoryRatio: 1,
-    gapPx: 1,
-    paddingPx: 2,
-  },
-  value: {
-    maxFontSizePx: 42,
-    heightScale: 0.45,
-  },
-  accessory: {
-    maxItems: 1,
-    rowMinHeightPx: 20,
-    columns: 1,
-  },
-};
-
-const targetSlotDisplayConfig: ComponentExampleRuntimeConfig = {
-  title: {
-    ...componentTitleBaseConfig,
-  },
-  layout: {
-    bodyRatio: 6,
-    topRatio: 3,
-    progressRatio: 1,
-    valueRatio: 1,
-    detailRatio: 0.8,
-    gapPx: 1,
-    paddingPx: 2,
-  },
-  value: {
-    maxFontSizePx: 54,
-  },
-  detail: {
-    iconSizePx: 18,
-    iconGraphicSizePx: 12,
-    labelFontSizePx: 10,
-    valueFontSizePx: 11,
-  },
-  progress: {
-    labelVisible: false,
-    heightPx: 10,
-  },
-};
-
-const tableSlotDisplayConfig: ComponentExampleRuntimeConfig = {
-  title: {
-    ...componentTitleBaseConfig,
-  },
-  layout: {
-    paddingPx: 0,
-    gapPx: 2,
-    toolbarHeightPx: 22,
-    footerHeightPx: 32,
-    minSheetHeightPx: 140,
-  },
-  table: {
-    pageSize: 4,
-    rowHeightPx: 26,
-    headerHeightPx: 28,
-    maxVisibleColumns: 8,
-  },
-};
-
-const defaultBusinessComponentConfigByType: Partial<Record<RegisteredWidgetConfig['type'], ComponentExampleRuntimeConfig>> = {
-  KpiMetricExampleCard: metricSlotDisplayConfig,
-  TargetProgressExampleCard: targetSlotDisplayConfig,
-  LineChartExampleCard: chartSlotDisplayConfig,
+const lineChartSlotDisplayConfig: ComponentExampleRuntimeConfig = {
+  ...chartSlotDisplayConfig,
+  chart: {
+    ...chartSlotDisplayConfig.chart,
+    legendVisible: true,
+    legendPosition: 'top',
+  },
+};
+
+const metricSlotDisplayConfig: ComponentExampleRuntimeConfig = {
+  title: {
+    ...componentTitleBaseConfig,
+  },
+  layout: {
+    valueRatio: 3,
+    accessoryRatio: 1,
+    gapPx: 1,
+    paddingPx: 2,
+  },
+  value: {
+    maxFontSizePx: 42,
+    heightScale: 0.45,
+  },
+  accessory: {
+    maxItems: 1,
+    rowMinHeightPx: 20,
+    columns: 1,
+  },
+};
+
+const targetSlotDisplayConfig: ComponentExampleRuntimeConfig = {
+  title: {
+    ...componentTitleBaseConfig,
+  },
+  layout: {
+    bodyRatio: 6,
+    topRatio: 3,
+    progressRatio: 1,
+    valueRatio: 1,
+    detailRatio: 0.8,
+    gapPx: 1,
+    paddingPx: 2,
+  },
+  value: {
+    maxFontSizePx: 54,
+  },
+  detail: {
+    iconSizePx: 18,
+    iconGraphicSizePx: 12,
+    labelFontSizePx: 10,
+    valueFontSizePx: 11,
+  },
+  progress: {
+    labelVisible: false,
+    heightPx: 10,
+  },
+};
+
+const tableSlotDisplayConfig: ComponentExampleRuntimeConfig = {
+  title: {
+    ...componentTitleBaseConfig,
+  },
+  layout: {
+    paddingPx: 0,
+    gapPx: 2,
+    toolbarHeightPx: 22,
+    footerHeightPx: 32,
+    minSheetHeightPx: 140,
+  },
+  table: {
+    pageSize: 4,
+    rowHeightPx: 26,
+    headerHeightPx: 28,
+    maxVisibleColumns: 8,
+  },
+};
+
+const defaultBusinessComponentConfigByType: Partial<Record<RegisteredWidgetConfig['type'], ComponentExampleRuntimeConfig>> = {
+  KpiMetricExampleCard: metricSlotDisplayConfig,
+  TargetProgressExampleCard: targetSlotDisplayConfig,
+  LineChartExampleCard: lineChartSlotDisplayConfig,
   BarChartExampleCard: chartSlotDisplayConfig,
   ComboChartExampleCard: chartSlotDisplayConfig,
   HeatmapChartExampleCard: chartSlotDisplayConfig,
```
- Follow-up: none

### v20260702003635 - 2026-07-02T00:36:35.588Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Set default legend placement by chart family
- Modified functionality: business report component example runtime config legend defaults
- Code ranges: L82-L205
- Modified content: Removed hidden legend from shared chart config, added top and right legend config presets, mapped axis charts to top-centered legend and non-axis proportion/radar/sunburst/funnel charts to right-side legend.
- Affected contracts: none
- Verification: npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/ --out-dir visual-check-legend-defaults; screenshot visual-check-legend-defaults/geometry-1920x1080.png; rg hidden legend defaults returned no matches
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1009 lines, sha256 `1d5f0667c413c15caa96dfc586a1766cc3e85e617ef80c9b940bc79027e884b1`, captured `2026-07-02T00:31:36.257Z`
- After snapshot: 1017 lines, sha256 `cc042c8a0256871f052a2f5a0ad43953c6bb4a4bcfb8bd46b78e92268acbe0b9`
- Change evidence: inline unified diff:

```diff
--- a/src/report-template-assets/business-report-pages.ts
+++ b/src/report-template-assets/business-report-pages.ts
@@ -90,111 +90,119 @@
     orientation: 'auto',
   },
   chart: {
-    legendVisible: false,
-    legendPosition: 'hidden',
-    axisVisible: true,
-    axisNameVisible: true,
-    splitLineVisible: true,
-    labelVisible: false,
-    labelLineVisible: false,
-    gridTopPx: 4,
-    gridBottomPx: 14,
-    gridLeftPx: 0,
-    gridRightPx: 4,
-    radiusPercent: 68,
-    outerRadiusPercent: 74,
-  },
-};
-
-const lineChartSlotDisplayConfig: ComponentExampleRuntimeConfig = {
-  ...chartSlotDisplayConfig,
-  chart: {
-    ...chartSlotDisplayConfig.chart,
-    legendVisible: true,
-    legendPosition: 'top',
-  },
-};
-
-const metricSlotDisplayConfig: ComponentExampleRuntimeConfig = {
-  title: {
-    ...componentTitleBaseConfig,
-  },
-  layout: {
-    valueRatio: 3,
-    accessoryRatio: 1,
-    gapPx: 1,
-    paddingPx: 2,
-  },
-  value: {
-    maxFontSizePx: 42,
-    heightScale: 0.45,
-  },
-  accessory: {
-    maxItems: 1,
-    rowMinHeightPx: 20,
-    columns: 1,
-  },
-};
-
-const targetSlotDisplayConfig: ComponentExampleRuntimeConfig = {
-  title: {
-    ...componentTitleBaseConfig,
-  },
-  layout: {
-    bodyRatio: 6,
-    topRatio: 3,
-    progressRatio: 1,
-    valueRatio: 1,
-    detailRatio: 0.8,
-    gapPx: 1,
-    paddingPx: 2,
-  },
-  value: {
-    maxFontSizePx: 54,
-  },
-  detail: {
-    iconSizePx: 18,
-    iconGraphicSizePx: 12,
-    labelFontSizePx: 10,
-    valueFontSizePx: 11,
-  },
-  progress: {
-    labelVisible: false,
-    heightPx: 10,
-  },
-};
-
-const tableSlotDisplayConfig: ComponentExampleRuntimeConfig = {
-  title: {
-    ...componentTitleBaseConfig,
-  },
-  layout: {
-    paddingPx: 0,
-    gapPx: 2,
-    toolbarHeightPx: 22,
-    footerHeightPx: 32,
-    minSheetHeightPx: 140,
-  },
-  table: {
-    pageSize: 4,
-    rowHeightPx: 26,
-    headerHeightPx: 28,
-    maxVisibleColumns: 8,
-  },
-};
-
-const defaultBusinessComponentConfigByType: Partial<Record<RegisteredWidgetConfig['type'], ComponentExampleRuntimeConfig>> = {
-  KpiMetricExampleCard: metricSlotDisplayConfig,
-  TargetProgressExampleCard: targetSlotDisplayConfig,
-  LineChartExampleCard: lineChartSlotDisplayConfig,
-  BarChartExampleCard: chartSlotDisplayConfig,
-  ComboChartExampleCard: chartSlotDisplayConfig,
-  HeatmapChartExampleCard: chartSlotDisplayConfig,
-  ProportionChartExampleCard: chartSlotDisplayConfig,
-  QuadrantChartExampleCard: chartSlotDisplayConfig,
-  RadarChartExampleCard: chartSlotDisplayConfig,
-  RoundedFunnelChartExampleCard: chartSlotDisplayConfig,
-  CustomEChartComponentTemplate: chartSlotDisplayConfig,
+    axisVisible: true,
+    axisNameVisible: true,
+    splitLineVisible: true,
+    labelVisible: false,
+    labelLineVisible: false,
+    gridTopPx: 4,
+    gridBottomPx: 14,
+    gridLeftPx: 0,
+    gridRightPx: 4,
+    radiusPercent: 68,
+    outerRadiusPercent: 74,
+  },
+};
+
+const topLegendChartSlotDisplayConfig: ComponentExampleRuntimeConfig = {
+  ...chartSlotDisplayConfig,
+  chart: {
+    ...chartSlotDisplayConfig.chart,
+    legendVisible: true,
+    legendPosition: 'top',
+  },
+};
+
+const rightLegendChartSlotDisplayConfig: ComponentExampleRuntimeConfig = {
+  ...chartSlotDisplayConfig,
+  chart: {
+    ...chartSlotDisplayConfig.chart,
+    legendVisible: true,
+    legendPosition: 'right',
+  },
+};
+
+const metricSlotDisplayConfig: ComponentExampleRuntimeConfig = {
+  title: {
+    ...componentTitleBaseConfig,
+  },
+  layout: {
+    valueRatio: 3,
+    accessoryRatio: 1,
+    gapPx: 1,
+    paddingPx: 2,
+  },
+  value: {
+    maxFontSizePx: 42,
+    heightScale: 0.45,
+  },
+  accessory: {
+    maxItems: 1,
+    rowMinHeightPx: 20,
+    columns: 1,
+  },
+};
+
+const targetSlotDisplayConfig: ComponentExampleRuntimeConfig = {
+  title: {
+    ...componentTitleBaseConfig,
+  },
+  layout: {
+    bodyRatio: 6,
+    topRatio: 3,
+    progressRatio: 1,
+    valueRatio: 1,
+    detailRatio: 0.8,
+    gapPx: 1,
+    paddingPx: 2,
+  },
+  value: {
+    maxFontSizePx: 54,
+  },
+  detail: {
+    iconSizePx: 18,
+    iconGraphicSizePx: 12,
+    labelFontSizePx: 10,
+    valueFontSizePx: 11,
+  },
+  progress: {
+    labelVisible: false,
+    heightPx: 10,
+  },
+};
+
+const tableSlotDisplayConfig: ComponentExampleRuntimeConfig = {
+  title: {
+    ...componentTitleBaseConfig,
+  },
+  layout: {
+    paddingPx: 0,
+    gapPx: 2,
+    toolbarHeightPx: 22,
+    footerHeightPx: 32,
+    minSheetHeightPx: 140,
+  },
+  table: {
+    pageSize: 4,
+    rowHeightPx: 26,
+    headerHeightPx: 28,
+    maxVisibleColumns: 8,
+  },
+};
+
+const defaultBusinessComponentConfigByType: Partial<Record<RegisteredWidgetConfig['type'], ComponentExampleRuntimeConfig>> = {
+  KpiMetricExampleCard: metricSlotDisplayConfig,
+  TargetProgressExampleCard: targetSlotDisplayConfig,
+  LineChartExampleCard: topLegendChartSlotDisplayConfig,
+  BarChartExampleCard: topLegendChartSlotDisplayConfig,
+  ComboChartExampleCard: topLegendChartSlotDisplayConfig,
+  HeatmapChartExampleCard: chartSlotDisplayConfig,
+  ProportionChartExampleCard: rightLegendChartSlotDisplayConfig,
+  QuadrantChartExampleCard: topLegendChartSlotDisplayConfig,
+  RadarChartExampleCard: rightLegendChartSlotDisplayConfig,
+  RoundedFunnelChartExampleCard: rightLegendChartSlotDisplayConfig,
+  SunburstChartExampleCard: rightLegendChartSlotDisplayConfig,
+  CustomEChartComponentTemplate: topLegendChartSlotDisplayConfig,
   DetailTableExampleCard: tableSlotDisplayConfig,
   ComplexTableExampleCard: tableSlotDisplayConfig,
 };
```
- Follow-up: none
