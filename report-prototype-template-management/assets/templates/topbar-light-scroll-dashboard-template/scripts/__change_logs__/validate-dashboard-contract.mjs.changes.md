# Code Change Ledger: scripts/validate-dashboard-contract.mjs

- Code file: `scripts/validate-dashboard-contract.mjs`
- Ledger file: `scripts/__change_logs__/validate-dashboard-contract.mjs.changes.md`
- Purpose: Validate dashboard template contracts before build/preview handoff.
- Primary features: layout/grid validation, widget contract validation, component-source renderer checks, stack-contract validation.
- Last reviewed before edit: created from repository baseline during v20260618-stack-contract-validator.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| dashboard-contract | Validates config layout, filters, widgets, and component source rules. | existing validator sections | `src/config/dashboard.config.ts`, `src/widgets/components` | warnings/errors | Existing behavior preserved. |
| stack-contract | Validates Vue 3 + Element Plus + ECharts stack consistency. | `validateStackContract` | `package.json`, `src/main.ts`, `src` source files, widget visualTypes | blocking errors | Added in this change. |

## Version Entries

### v20260618-n-row-menu-axis-grid - 2026-06-18

- Change ID: ad-hoc-n-row-menu-axis-grid
- Actor: Codex
- Change type: update
- Summary: Removed the fixed row-count cap from grid validation so `layoutRows` can contain `N` rows while retaining fixed 12-column rows and the 8 visible row-unit height formula.
- Modified functionality: grid config validation, layoutRows row-length validation, validator error copy.
- Code ranges: `gridConfigs` constants; `validateAllLayoutRows`; final grid config validation block.
- Modified content: Kept `contentGap: 0`, 12 columns per `layoutRows` string, minimum `2*1` block width, and `rowHeight = (contentEndY - contentStartY) / 8`; removed the previous 8-to-12 row budget concept and changed copy from `12x8` to `12-column/N-row`.
- Affected contracts: 1920x1080 prototype content grid; horizontal menu height deduction; 12 fixed columns; `N` uncapped rows; 8 visible row units for rowHeight.
- Verification: `npm run validate:dashboard` and `npm run build:preview` passed in `topbar-light-scroll-dashboard-template`.
- Rollback note: Reintroduce a row-count budget only if the prototype layout contract is explicitly changed back to a fixed-height page.
- Related files: `src/config/dashboard.config.ts`, `$report-visual-layout-design`, `$report-layout-size-constraint-spec`.
- Change evidence: working-tree diff for `scripts/validate-dashboard-contract.mjs` in this change set.
- Follow-up: none

### v20260622030028 - 2026-06-22T03:00:28Z

- Change ID: list-chart-geometry-contract
- Actor: codex
- Change type: update
- Summary: Add static list row and axis-chart geometry contract checks.
- Modified functionality: widget visualType allowlist, widget config validation, compact-sparkline exception validation
- Code ranges: helpers/constants near top of file; `validateListGeometryContract`; `validateAxisChartGeometryContract`; `validateWidget`
- Modified content: Added `operational-list`, `action-recommendation-card`, `ranking-list`, and `compact-sparkline` visual types; required `rowHeightPx`, `visibleRowCount`, and `overflowStrategy` for list-like widgets; capped `3x2` action lists at two visible rows; required full line/bar/combo charts to declare `chartBodyH >= 180px` or use explicit compact-sparkline hiding rules.
- Affected contracts: bundled template widget config validation; report list geometry contract; ECharts axis-chart plot viability contract
- Verification: node --check scripts/validate-dashboard-contract.mjs
- Rollback note: revert this file together with sibling template validators and `src/widgets/types.ts` visual type additions.
- Related files: scripts/visual-geometry-audit.mjs, src/widgets/types.ts
- Follow-up: none

### v20260618-12x8-content-grid - 2026-06-18

- Change ID: ad-hoc-12x8-content-grid
- Actor: Codex
- Change type: update
- Summary: Added validator checks for the 1920x1080 content-area 12x8 grid model.
- Modified functionality: grid config collection, row count gate, rowHeight formula gate, gap gate.
- Code ranges: `collectGridConfigs`; `visibleGridRows` / `maxLayoutRows` constants; `buildLayoutBlockSpans`; final grid config validation block.
- Modified content: Required `contentGap: 0`, at least 8 and at most 12 layoutRows, and `rowHeight = (contentEndY - contentStartY) / 8` within tolerance.
- Affected contracts: 1920x1080 prototype content grid; 12 columns; 8 visible row units; 12-row scroll budget.
- Verification: `npm run validate:dashboard` passed in `topbar-light-scroll-dashboard-template`.
- Rollback note: Remove the 12x8 grid config checks and restore the previous rowHeight minimum validation only if the template contract is reverted.
- Related files: `src/config/dashboard.config.ts`, `src/components/DashboardShell.vue`.
- Change evidence: working-tree diff for `scripts/validate-dashboard-contract.mjs` in this change set.
- Follow-up: none

### v20260618-12n-grid-span-contract - 2026-06-18

- Change ID: ad-hoc-12n-grid-span-contract
- Actor: Codex
- Change type: update
- Summary: Updated dashboard contract validation from the legacy 8-column grid to the 12*N prototype grid with 2*1 minimum blocks and ordinary chart spans capped at 4*3.
- Modified functionality: layoutRows now require 12 columns per row, top-level blocks must span at least 2 columns, layoutRows are scanned even when a page has no widgets yet, visualType span allowlists use the new 3*2 default and 4*3 chart maximum, and validation copy refers to 12*N.
- Code ranges: `requiredGridColumns` and `minimumSpanColumns` constants near the layout constants; `allowedSpansByVisualType`; `buildLayoutBlockSpans`; `validateAllLayoutRows`; missing-visualType error message.
- Modified content: Added row-length/min-span validation, global layoutRows scanning, and replaced legacy chart/KPI/table/text span allowlists with the 12*N contract.
- Affected contracts: Bundled topbar template layoutRows, widget visualType span validation, prototype 1920x1080 grid rules.
- Verification: `npm run validate:dashboard` passed in `topbar-light-scroll-dashboard-template`.
- Rollback note: Restore the previous allowlists and remove `requiredGridColumns`, `minimumSpanColumns`, `validateAllLayoutRows`, row-length validation, and min-span validation.
- Related files: `src/config/dashboard.config.ts`, `$report-visual-layout-design` grid/size references.

### v20260618-stack-contract-validator - 2026-06-18

- Change ID: ad-hoc-stack-contract
- Actor: Codex
- Change type: update
- Summary: Added default stack-contract validation so copied template projects cannot drop Element Plus or ECharts while keeping a Vue 3 shell.
- Modified functionality: package dependency checks including axios, Vue 3 bootstrap check, Element Plus registration/style check, source scan for Element Plus runtime usage, ECharts runtime proof when chart visualTypes are present.
- Code ranges: `packagePath/mainEntryPath/srcPath` constants near L3-L8; `requiredStackDependencies`, `chartVisualTypes`, `sourceFileExtensions` near L116-L139; `walkSourceFiles`, `readJsonFile`, `validateStackContract` near L470-L566; `validateStackContract()` call near L1258.
- Modified content: Added stack dependency metadata, source-file walking, JSON parsing, stack validation function, and validator invocation before widget validation.
- Affected contracts: Bundled template stack contract: Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios; ECharts runtime ownership for standard chart widgets.
- Verification: `npm run validate:dashboard` passed in `topbar-light-scroll-dashboard-template`.
- Rollback note: Remove the added stack constants, helper functions, and `validateStackContract()` call to return to dashboard-only validation.
- Related files: `report-prototype-template-management/SKILL.md`, `references/template-routing-and-implementation-gates.md`, `references/template-shared-contract.md`, `references/template-recipes-checklist.md`.
- Before snapshot: repository baseline `HEAD`, 1148 lines, sha256 `38c1df1537632fcb9dc319abe1af81cff927774d0e46a7be0a59430b63066f28`.
- After snapshot: working tree, 1272 lines, sha256 `99e8453386016fd262cabe5744c3b1c1e0c158c1bc4674fb276c32f2ce3ab664`.
- Change evidence: `git diff -- report-prototype-template-management/assets/templates/topbar-light-scroll-dashboard-template/scripts/validate-dashboard-contract.mjs` shows the added constants, helpers, stack validator, and invocation.
- Follow-up: If the project adopts a dedicated ECharts wrapper such as `VueECharts`, add its import signature to `hasEchartsRuntime` if not already matched.

### v20260622023541 - 2026-06-22T02:35:41.839Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Add ECharts default legend and Y-axis unit validation
- Modified functionality: validateWidgetSource chart anatomy checks
- Code ranges: validateWidgetSource chart detection and chart anatomy checks
- Modified content: Added bar/cartesian chart detection plus failures for non-top-centered legends, missing Y-axis units, and unit suffixes in yAxis.axisLabel.formatter.
- Affected contracts: none
- Verification: node --check scripts/validate-dashboard-contract.mjs; npm run validate:dashboard; negative temporary component produced legend/Y-axis/unit formatter errors
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1333 lines, sha256 `aa04aa926a2d7dcc7177dcb93e463baaf6202ac7c15ac7fca25fc378fa91631d`, captured `2026-06-22T02:28:43.000Z`
- After snapshot: 1369 lines, sha256 `2dabe0fdf98e4a54b48838b7414b5702a102eb3c25eaf3f2963636165a3b6284`
- Change evidence: inline unified diff:

```diff
--- a/scripts/validate-dashboard-contract.mjs
+++ b/scripts/validate-dashboard-contract.mjs
@@ -652,6 +652,10 @@
     );
   const hasGraph =
     /type\s*:\s*['"]graph['"]|visualType\s*:\s*['"]graph['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]graph['"]/.test(
+      text,
+    );
+  const hasBarChart =
+    /type\s*:\s*['"]bar['"]|visualType\s*:\s*['"]bar['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]bar['"]/.test(
       text,
     );
   const hasLineChart =
@@ -660,8 +664,28 @@
     );
   const hasComboChart =
     /(?:visualType|type)\s*:\s*['"]combo['"]|combo(?:Data|Rows?|Series|Option|Config)|柱线组合图|柱状图\s*\+\s*折线图|ComboChart|series\s*:[\s\S]{0,1600}type\s*:\s*['"]bar['"][\s\S]{0,1600}type\s*:\s*['"]line['"]|series\s*:[\s\S]{0,1600}type\s*:\s*['"]line['"][\s\S]{0,1600}type\s*:\s*['"]bar['"]/.test(
+      text,
+    );
+  const unitTokenPattern = String.raw`(?:%|percent|元|万元|亿元|人|人数|次|件|个|台|单|订单|天|小时|分钟|分|吨|kg|KG|kWh|m3|m³|m2|㎡)`;
+  const hasCartesianAxisChart = hasBarChart || hasLineChart || hasComboChart || hasBoxplot || hasHeatmap;
+  const hasEchartsLegend = /legend\s*:/.test(text);
+  const hasTopCenteredLegend =
+    /legend\s*:\s*\{[\s\S]{0,700}(?:left|x)\s*:\s*['"]center['"][\s\S]{0,700}(?:top|y)\s*:\s*(?:['"]top['"]|['"]0['"]|\d)/.test(
+      text,
+    ) ||
+    /legend\s*:\s*\{[\s\S]{0,700}(?:top|y)\s*:\s*(?:['"]top['"]|['"]0['"]|\d)[\s\S]{0,700}(?:left|x)\s*:\s*['"]center['"]/.test(
+      text,
+    );
+  const hasDocumentedLegendException =
+    /legend(?:Placement|Position)\s*:\s*['"](?:right|bottom|side|hidden|none)['"]|sideLegend|bottomLegend|legendException|legendHidden|hideLegend|sparkline|miniChart|pie|donut|rose/.test(
       text,
     );
+  const hasYAxisUnitConfig = new RegExp(
+    String.raw`yAxis\s*:[\s\S]{0,2200}(?:name\s*:\s*(?:[^,\n}\]]*unit|['"\`][^'"\`]*(?:单位|${unitTokenPattern})[^'"\`]*['"\`])|(?:leftAxisUnit|rightAxisUnit|yAxisUnit|axisUnit)\b|unit\s*:)`,
+  ).test(text);
+  const yAxisAxisLabelAddsUnit = new RegExp(
+    String.raw`yAxis\s*:[\s\S]{0,2400}axisLabel\s*:[\s\S]{0,700}formatter\s*:[\s\S]{0,360}(?:\+\s*(?:unit|['"\`][^'"\`]*${unitTokenPattern})|['"\`][^'"\`]*${unitTokenPattern}|%\})`,
+  ).test(text);
   const hasCompositePanel =
     /(?:visualType|type)\s*:\s*['"]composite-panel['"]|CompositePanel|compositePanelContract|composite(?:Panel|Children|Layout|State|Tooltip)|multiComponent|multi-component|多组件组合图|组合面板|复合面板/.test(
       text,
@@ -699,6 +723,18 @@
     warnings.push(
       `${label}: line chart sorts labels/categories directly; verify every series is built from that same ordered category list or use sortRowsForCategoryAxis/buildSingleSeriesCategoryData.`,
     );
+  }
+
+  if (hasCartesianAxisChart && hasEchartsLegend && !hasTopCenteredLegend && !hasDocumentedLegendException) {
+    errors.push(`${label}: ECharts legends default to top-center; set legend.top and legend.left: 'center', or declare an explicit legend-placement exception.`);
+  }
+
+  if (hasCartesianAxisChart && /yAxis\s*:/.test(text) && !hasYAxisUnitConfig) {
+    errors.push(`${label}: Cartesian charts must configure the Y-axis unit through yAxis.name, yAxisUnit/axisUnit, or leftAxisUnit/rightAxisUnit.`);
+  }
+
+  if (hasCartesianAxisChart && yAxisAxisLabelAddsUnit) {
+    errors.push(`${label}: Y-axis tick labels must keep raw numeric values; do not append units in yAxis.axisLabel.formatter. Put the unit in yAxis.name and tooltip instead.`);
   }
```
- Follow-up: none

### v20260622031757 - 2026-06-22T03:17:57Z

- Change ID: echarts-axis-anatomy-contract
- Actor: codex
- Change type: update
- Summary: Enforce dynamic Y-axis ranges, compact ECharts grid, axis-title placement, inside target labels, and single-series legend hiding.
- Modified functionality: validateWidgetSource Cartesian chart anatomy checks
- Code ranges: validateWidgetSource chart detection and chart anatomy checks
- Modified content: Added NPS dynamic range checks, zero-baseline blocking, complete/compact grid checks, side/bottom axis-title checks, target/reference `insideEndTop` label check, and single-series visible-legend blocking.
- Affected contracts: bundled template ECharts chart option contract; report chart design spec
- Verification: node --check scripts/validate-dashboard-contract.mjs; npm run validate:dashboard; npm run build:preview; negative ECharts contract probe failed as expected for the new chart anatomy checks; git diff --check passed.
- Rollback note: revert this validator entry together with sibling template validators and chart/spec guidance if the chart anatomy contract changes.
- Related files: report-chart-design-spec/SKILL.md, report-component-style-design/SKILL.md, report-prototype-template-management/SKILL.md
- Follow-up: none

### v20260622035051 - 2026-06-22T03:50:51Z

- Change ID: echarts-container-squeeze-contract
- Actor: codex
- Change type: update
- Summary: Enforce post-layout ECharts container size and dense-label squeeze contracts.
- Modified functionality: collectGridConfigs; validateAxisChartGeometryContract; validateWidgetSource pie checks
- Code ranges: grid config collection; axis chart geometry validation; chart source option validation
- Modified content: Added contentWidth/cellPadding-based block content size estimates, full-axis chart hard floors, squeeze-risk strategy checks for narrow/short/dense blocks, plotH floor validation when declared, and pie/donut/rose minAngle or tiny-slice fallback enforcement.
- Affected contracts: bundled template chart geometry contract; report chart squeeze-prevention gates
- Verification: node --check scripts/validate-dashboard-contract.mjs; npm run validate:dashboard; npm run build:preview; negative 3x2 line-chart probe failed for 468px x 218px without squeeze strategy and undeclared density.
- Rollback note: revert this validator entry together with sibling template validators, visual geometry scripts, and chart/spec guidance if chart container thresholds change.
- Related files: scripts/visual-geometry-audit.mjs; src/config/dashboard.config.ts; src/widgets/templates/WidgetTemplate.vue
- Follow-up: none
