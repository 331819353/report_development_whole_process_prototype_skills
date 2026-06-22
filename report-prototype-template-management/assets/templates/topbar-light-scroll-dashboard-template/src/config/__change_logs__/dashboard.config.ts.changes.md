# Code Change Ledger: src/config/dashboard.config.ts

- Code file: `src/config/dashboard.config.ts`
- Ledger file: `src/config/__change_logs__/dashboard.config.ts.changes.md`
- Purpose: Vue3 standard project structure refactor baseline
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T12:42:34.947Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### v20260618-n-row-menu-axis-grid - 2026-06-18

- Change ID: ad-hoc-n-row-menu-axis-grid
- Actor: Codex
- Change type: config
- Summary: Clarified the topbar template as a 12-column/N-row grid where rowHeight is calculated from the first 8 visible content row units.
- Modified functionality: layout comments and grid contract documentation in config comments.
- Code ranges: `screen.layout`; `screen.grid`; `page.layoutRows` comments.
- Modified content: Reworded fixed `12x8`/`12列*8` language to `12列*N行`, kept `topbarHeight/contentStartY: 160`, `contentEndY: 1080`, and `rowHeight: 115`.
- Affected contracts: horizontal menu height deduction; `(1080 - 160) / 8 = 115`; 12 fixed columns; `N` uncapped rows.
- Verification: `npm run validate:dashboard` and `npm run build:preview` passed in `topbar-light-scroll-dashboard-template`.
- Rollback note: Restore the previous comments only if the layout contract is changed back to a fixed row budget.
- Related files: `scripts/validate-dashboard-contract.mjs`, `$report-visual-layout-design`.
- Change evidence: working-tree diff for `src/config/dashboard.config.ts` in this change set.
- Follow-up: none

### v20260622030028 - 2026-06-22T03:00:28Z

- Change ID: geometry-contract-config-comments
- Actor: codex
- Change type: update
- Summary: Add widget config comments for list row and axis-chart geometry contracts.
- Modified functionality: dashboard.config developer guidance
- Code ranges: `visualType` comment block
- Modified content: Documented required `rowHeightPx`, `visibleRowCount`, `overflowStrategy`, `3x2` action-list row budget, and full-axis `chartBodyH >= 180` / compact-sparkline alternative.
- Affected contracts: template config handoff comments; validate-dashboard contract
- Verification: npm run validate:dashboard passed
- Rollback note: remove the added comments only.
- Related files: scripts/validate-dashboard-contract.mjs
- Follow-up: none

### v20260622031757 - 2026-06-22T03:17:57Z

- Change ID: echarts-axis-anatomy-config-comments
- Actor: codex
- Change type: update
- Summary: Add dashboard config guidance for ECharts axis anatomy and dynamic Y-axis defaults.
- Modified functionality: dashboard.config developer guidance
- Code ranges: `visualType` comment block
- Modified content: Documented top-centered multi-series legends, hidden single-series legends, dynamic NPS/score/rate/target Y-axis ranges, compact four-side grid, side/bottom axis titles, and `insideEndTop` target labels.
- Affected contracts: template config handoff comments; validate-dashboard chart anatomy contract
- Verification: node --check scripts/validate-dashboard-contract.mjs; npm run validate:dashboard; npm run build:preview; negative ECharts contract probe failed as expected for the new chart anatomy checks; git diff --check passed.
- Rollback note: remove the added comment only.
- Related files: scripts/validate-dashboard-contract.mjs; src/widgets/templates/WidgetTemplate.vue
- Follow-up: none

### v20260618-12x8-content-grid - 2026-06-18

- Change ID: ad-hoc-12x8-content-grid
- Actor: Codex
- Change type: config
- Summary: Rebased the template default grid on a 1920x1080 viewport with a 160px topbar and an 8-row visible content area.
- Modified functionality: screen.layout topbar/contentGap tokens; screen.grid content range/rowHeight/cellPadding; default page/pages layoutRows.
- Code ranges: `screen.layout`; `screen.grid`; `page.layoutRows`; `pages.*.layoutRows`.
- Modified content: Changed the mathematical grid gap to 0, set `contentStartY: 160`, `contentEndY: 1080`, `rowHeight: 115`, added visual `cellPadding: 6`, and expanded default layouts to 8 visible rows.
- Affected contracts: 1920x1080 prototype content grid; 12 columns; 8 visible row units; 12-row scroll budget.
- Verification: `npm run validate:dashboard` passed in `topbar-light-scroll-dashboard-template`.
- Rollback note: Restore the previous topbar height, gap, rowHeight, cellPadding, and three-row layoutRows together with the DashboardShell and validator changes.
- Related files: `src/components/DashboardShell.vue`, `scripts/validate-dashboard-contract.mjs`, `$report-visual-layout-design` grid references.
- Change evidence: working-tree diff for `src/config/dashboard.config.ts` in this change set.
- Follow-up: none

### baseline - 2026-06-11T12:42:34.948Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 97 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `50ec8847d41724f942df67216715da5834e6d41b029a56c8bdfb24829abd9b8b`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611125158 - 2026-06-11T12:51:58.803Z

- Change ID: vue3-standard-structure-refactor
- Actor: codex
- Change type: refactor
- Summary: Refactored template into the standard Vue3 TypeScript Vite project structure with router, Pinia store, Axios request wrapper, env files, Sass style entry, and preview build compatibility.
- Modified functionality: project structure, app bootstrap, routing, store, request layer, style entry, template docs
- Code ranges: full file
- Modified content: standard Vue3 project scaffolding and imports
- Affected contracts: Vue3 project directory contract; dashboard template data-source contract preserved
- Verification: npm run build:preview passed for all four templates
- Rollback note: revert the structure refactor and package dependency updates together
- Related files: package.json, vite.config.ts, tsconfig.json, src/main.ts, src/App.vue, src/router, src/stores, src/utils, src/views, src/styles
- File snapshot: 97 lines, sha256 `a725cead3291da32ddf0cf122d8fa976ec4e99713a2465a93077b483ce370eb6`
- Follow-up: none

### v20260611133152 - 2026-06-11T13:31:52.229Z

- Change ID: component-owned-title-construction-state
- Actor: codex
- Change type: update
- Summary: Reassigned block titles and local controls to component ownership, and changed the unbound widget fallback to construction state.
- Modified functionality: component-owned title/control handoff, unbound widget construction mask, local filter context API, template comments
- Code ranges: DashboardShell block state/context/template; styles block viewport/mask; widgets/types WidgetContext and BaseWidgetConfig; dashboard.config and WidgetTemplate comments; types/actions localFilters comment
- Modified content: Removed Shell-rendered block title/local-filter DOM, removed titleVisible from widget contract, exposed local filter config/options/set/clear through WidgetContext, changed unbound mask copy to 建设中, and updated source comments.
- Affected contracts: template-layout-design-system component-owned title/control contract; runtime UI no longer exposes 未绑定 or 待配置组件
- Verification: npm run build:preview passed for all four templates; Browser QA on http://localhost:5185/#/ showed placeholderTitleCount=0, mask texts=建设中, no 未绑定/待配置组件, and no console errors
- Rollback note: Revert DashboardShell.vue, styles/index.scss, widgets/types.ts, config comments, WidgetTemplate comments, and types/actions together
- Related files: src/components/DashboardShell.vue, src/styles/index.scss, src/widgets/types.ts, src/config/dashboard.config.ts, src/widgets/templates/WidgetTemplate.vue, src/types/actions.ts
- File snapshot: 97 lines, sha256 `71ac44656a4ed33c7a895762b98212177213b0f61bd9982bb47cf56fcb87bbd5`
- Follow-up: none

### v20260616073314 - 2026-06-16T07:33:14.388Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Added default topbar navigation and updated light SaaS layout tokens.
- Modified functionality: screen.topbarNav; layout spacing; light card token config
- Code ranges: L6-L22, L34-L48
- Modified content: Removed unused cockpit background image, added topbarNav/defaultTopbarNavId, increased content gap and row height, and changed dominant/card background tokens to Haier blue plus white.
- Affected contracts: none
- Verification: npm run build:preview passed; validate:dashboard passed.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 97 lines, sha256 `71ac44656a4ed33c7a895762b98212177213b0f61bd9982bb47cf56fcb87bbd5`, captured `2026-06-16T07:27:16.937Z`
- After snapshot: 103 lines, sha256 `d629aedea3ee58b8ac7ee5f4c066f34bf7677e02631c0c0ce2acc1fd49908c64`
- Change evidence: inline unified diff:

```diff
--- a/src/config/dashboard.config.ts
+++ b/src/config/dashboard.config.ts
@@ -4,16 +4,22 @@
 // 新页面通常只需要改这个文件：换 logo、改标题、调整 page.layoutRows、配置筛选项和组件挂载关系。
 export const cockpitConfig: DashboardConfig = {
   assets: {
-    // 顶部栏左一 logo。深色背景建议使用白色 logo；浅色背景使用原色 logo。
+    // 顶部栏左一 logo。浅色背景使用原色 logo。
     logoSrc: '/haier-logo.svg',
     logoAlt: 'Haier logo',
-    // 可选背景图。没有背景图时使用 src/styles/index.scss 中的渐变背景。
-    backgroundSrc: '/cockpit-bg.jpg',
   },

   screen: {
-    // 顶部栏居中标题。
+    // 顶部栏左侧标题。
     title: '经营驾驶舱',
+    // 顶部栏中间导航项。当前模板保持单页壳，导航先作为视觉/视角入口预留。
+    topbarNav: [
+      { id: 'overview', label: '总览' },
+      { id: 'analytics', label: '经营分析' },
+      { id: 'metrics', label: '指标洞察' },
+      { id: 'details', label: '明细追踪' },
+    ],
+    defaultTopbarNavId: 'overview',
     // 右侧筛选抽屉标题。
     filterTitle: '筛选项',
     defaultTheme: 'light',
@@ -27,19 +33,19 @@
       // 顶部菜单栏高度。内容区从 grid.contentStartY 开始。
       topbarHeight: 72,
       // 内容分块之间的间距。只影响块与块之间，不影响块内部 padding。
-      contentGap: 14,
+      contentGap: 16,
     },

     grid: {
-      // 内容区起始 y 坐标。默认在顶部菜单栏下方留出 16px 呼吸空间。
-      contentStartY: 88,
+      // 内容区起始 y 坐标。默认在顶部菜单栏下方留出 20px 呼吸空间。
+      contentStartY: 92,
       // 内容区结束 y 坐标。默认铺到 1080px 底部。
       contentEndY: 1064,
       // Every resolved content block must be at least 220px tall. If the grid is taller than the first 1080px viewport, the page grows and scrolls vertically.
-      rowHeight: 316,
+      rowHeight: 320,
       cellPadding: 0,
-      dominantTitleColor: '#20a8ff',
-      innerBackgroundColor: 'rgba(9, 30, 48, 0.68)',
+      dominantTitleColor: '#0073E5',
+      innerBackgroundColor: '#ffffff',
     },

     controls: {
```
- Follow-up: none

### v20260616073732 - 2026-06-16T07:37:32.757Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Aligned topbar navigation labels with the reference text-tab pattern.
- Modified functionality: screen.topbarNav reference labels
- Code ranges: L15-L23
- Modified content: Replaced compact placeholder nav labels with reference-style business analysis tabs: 经营概览, 销售分析, 客户分析, 商品分析, 渠道分析, 区域分析.
- Affected contracts: none
- Verification: npm run build:preview passed; Browser QA passed at default 904px, 1920x1080, and 1280x768 with nav overflow false and no console errors.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 103 lines, sha256 `d629aedea3ee58b8ac7ee5f4c066f34bf7677e02631c0c0ce2acc1fd49908c64`, captured `2026-06-16T07:35:14.479Z`
- After snapshot: 105 lines, sha256 `663cf96b7c83d26fb6ca16599cfe21287f6ced06016e6707a8663c7ba2d5f98c`
- Change evidence: inline unified diff:

```diff
--- a/src/config/dashboard.config.ts
+++ b/src/config/dashboard.config.ts
@@ -14,10 +14,12 @@
     title: '经营驾驶舱',
     // 顶部栏中间导航项。当前模板保持单页壳，导航先作为视觉/视角入口预留。
     topbarNav: [
-      { id: 'overview', label: '总览' },
-      { id: 'analytics', label: '经营分析' },
-      { id: 'metrics', label: '指标洞察' },
-      { id: 'details', label: '明细追踪' },
+      { id: 'overview', label: '经营概览' },
+      { id: 'sales', label: '销售分析' },
+      { id: 'customers', label: '客户分析' },
+      { id: 'products', label: '商品分析' },
+      { id: 'channels', label: '渠道分析' },
+      { id: 'regions', label: '区域分析' },
     ],
     defaultTopbarNavId: 'overview',
     // 右侧筛选抽屉标题。
```
- Follow-up: none

### v20260616075618 - 2026-06-16T07:56:18.062Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: 将 5302 顶栏导航接入轻量 pages 配置，并为六个导航项预置独立占位布局。
- Modified functionality: topbar-nav-page-binding,lightweight-dashboard-pages
- Code ranges: 3-24,80-111
- Modified content: 导航 id 绑定同名 pages[id]；新增 overview/sales/customers/products/channels/regions 六个页面布局；更新入口配置注释。
- Affected contracts: none
- Verification: npm run build:preview passed; Browser QA on http://localhost:5302/#/ clicked six nav items and confirmed cell counts 10/8/8/8/6/6, one active nav, badges match active label, no nav overflow, no new console errors.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 105 lines, sha256 `663cf96b7c83d26fb6ca16599cfe21287f6ced06016e6707a8663c7ba2d5f98c`, captured `2026-06-16T07:48:10.078Z`
- After snapshot: 133 lines, sha256 `294ba45250d6e703d8530f299a028fb550b4adc441dd4b4790d88e6139c8a693`
- Change evidence: inline unified diff:

```diff
--- a/src/config/dashboard.config.ts
+++ b/src/config/dashboard.config.ts
@@ -1,7 +1,7 @@
 import type { DashboardConfig } from '../types/dashboard';

-// 单页顶部栏报表模板的唯一入口配置。
-// 新页面通常只需要改这个文件：换 logo、改标题、调整 page.layoutRows、配置筛选项和组件挂载关系。
+// 顶部栏滚动报表模板的唯一入口配置。
+// 新页面通常只需要改这个文件：换 logo、改标题、调整 pages[id].layoutRows、配置筛选项和组件挂载关系。
 export const cockpitConfig: DashboardConfig = {
   assets: {
     // 顶部栏左一 logo。浅色背景使用原色 logo。
@@ -12,7 +12,7 @@
   screen: {
     // 顶部栏左侧标题。
     title: '经营驾驶舱',
-    // 顶部栏中间导航项。当前模板保持单页壳，导航先作为视觉/视角入口预留。
+    // 顶部栏中间导航项。id 会优先绑定到同名 pages[id]；缺省时回退到 page。
     topbarNav: [
       { id: 'overview', label: '经营概览' },
       { id: 'sales', label: '销售分析' },
@@ -57,7 +57,7 @@
     },
   },

-  // 单页内容配置。layoutRows 采用 8*N 规则：
+  // 默认内容配置。layoutRows 采用 8*N 规则：
   // 1. 每个字符串代表一行，每个字符代表一列，每行建议保持 8 个字符。
   // 2. 相邻且相同的字符会合并成一个矩形块，例如 "AAAA" 会横向跨四列。
   // 3. 同一个字符上下相邻也会合并，例如两行同列都是 "A" 会纵向合并。
@@ -82,6 +82,34 @@
     widgets: {},
   },

+  // 轻量多页面配置。每个 key 对应 topbarNav 的 id，先提供不同占位布局，后续可逐页补 widgets。
+  pages: {
+    overview: {
+      layoutRows: ['AAAABBBB', 'CCDDEEFF', 'gghhiijj'],
+      widgets: {},
+    },
+    sales: {
+      layoutRows: ['AAAABBBB', 'CCCCDDDD', 'EEFFGGHH'],
+      widgets: {},
+    },
+    customers: {
+      layoutRows: ['AAAABBCC', 'AAAADDCC', 'EEFFGGHH'],
+      widgets: {},
+    },
+    products: {
+      layoutRows: ['AABBCCDD', 'EEEEFFFF', 'GGGGHHHH'],
+      widgets: {},
+    },
+    channels: {
+      layoutRows: ['AAAABBBB', 'AAAABBBB', 'CCDDEEFF'],
+      widgets: {},
+    },
+    regions: {
+      layoutRows: ['AAAABBCC', 'DDDDBBCC', 'EEEEFFFF'],
+      widgets: {},
+    },
+  },
+
   // 筛选项配置。模板默认保持空白，只保留全局传参入口。
   // 需要新增筛选时，优先把选项写到 src/data/dashboard.dataset.json 的 filterData 中，
   // 再在这里增加 source 引用；若选项来自接口，使用 source.id: 'apiData' + source.api。
```
- Follow-up: none
