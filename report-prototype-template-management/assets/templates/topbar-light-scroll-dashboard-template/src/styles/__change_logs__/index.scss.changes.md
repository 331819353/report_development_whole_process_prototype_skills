# Code Change Ledger: src/styles/index.scss

- Code file: `src/styles/index.scss`
- Ledger file: `src/styles/__change_logs__/index.scss.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T12:51:58.684Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-11T12:51:58.684Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1008 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `af186c80743d4db3cd8ac1d8d413244e07911ec729d2ceea407d914fe89730c8`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611125158 - 2026-06-11T12:51:58.685Z

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
- File snapshot: 1008 lines, sha256 `af186c80743d4db3cd8ac1d8d413244e07911ec729d2ceea407d914fe89730c8`
- Follow-up: none

### v20260611130905 - 2026-06-11T13:09:05.068Z

- Change ID: block-title-mask-control
- Actor: codex
- Change type: feature
- Summary: Implemented template-level block title visibility controls and block-level state masks for unbound widgets and no-data widget data.
- Modified functionality: block title function band, titleVisible config, emptyState config, unbound widget mask, no-data mask
- Code ranges: DashboardShell block state helpers and block template; styles/index.scss block mask styles; widgets/types.ts widget config contract
- Modified content: Added titleVisible/emptyState config fields, block state overlay rendering, and full-card mask styles covering title band and body.
- Affected contracts: template-layout-design-system block-owned title/function band and no-data mask scope
- Verification: npm run build:preview passed for all four templates; runtime check on http://localhost:5185 reported 16 block masks and no console errors
- Rollback note: revert DashboardShell.vue, styles/index.scss, and widgets/types.ts together
- Related files: src/components/DashboardShell.vue, src/styles/index.scss, src/widgets/types.ts
- File snapshot: 1066 lines, sha256 `054f08872590e7145725b27cab2b34678f393b871e96c92cc4d22641f780db07`
- Follow-up: none

### v20260611133151 - 2026-06-11T13:31:51.742Z

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
- File snapshot: 1065 lines, sha256 `2dfe27d9a36f3962692f9c457e7319c4b3619a78e50165aad238c74b5dec4c82`
- Follow-up: none

### v20260612093911 - 2026-06-12T09:39:11Z

- Change ID: topbar-shell-coordinate-alignment
- Actor: codex
- Change type: fix
- Summary: Aligned the fixed topbar with the centered dashboard canvas in wide browser viewports.
- Modified functionality: dashboard shell positioning, fixed topbar x-axis coordinate, print/export topbar reset
- Code ranges: `.dashboard-app` shell variables, `.topbar` fixed positioning, `@media print .topbar`
- Modified content: Added shared `--shell-left` based on `100vw` and `--design-width`, changed `.topbar` from browser-left `left: 0` to `left: var(--shell-left)`, and reset the print topbar left offset to `0`.
- Affected contracts: topbar-light fixed shell/content coordinate contract; horizontal scroll transform contract preserved
- Verification: `npm run build:preview` passed, including `validate:dashboard`, `vue-tsc --noEmit`, and Vite preview build.
- Rollback note: Revert `.dashboard-app --shell-left`, `.topbar left`, and print `.topbar left` changes together.
- Related files: src/styles/index.scss, src/components/DashboardShell.vue
- File snapshot: 1067 lines, sha256 `e839fa55e273bc6bc6230d49b937c4deb1fe635ec32790095c0fc3b90380323e`
- Follow-up: Runtime QA for copied projects should measure `abs(topbarRect.left - dashboardFrameRect.left) <= 1px` at wide and narrow viewports.

### v20260612094603 - 2026-06-12T09:46:03Z

- Change ID: filter-panel-overlay-layering
- Actor: codex
- Change type: fix
- Summary: Raised the global filter drawer and dismiss layer above block masks, and aligned the drawer with the centered dashboard shell in wide viewports.
- Modified functionality: filter drawer stacking order, dismiss layer stacking order, wide-viewport filter drawer x-axis position
- Code ranges: `src/styles/index.scss:343-357`
- Modified content: Increased `.panel-dismiss-layer` from z-index 15 to 80, increased `.filter-panel` from z-index 18 to 90, and changed `.filter-panel right` to `calc(var(--shell-left) + 24px)`.
- Affected contracts: topbar-light global filter drawer must sit above block masks and stay visually attached to the shell right edge.
- Verification: `npm run build:preview` passed. Runtime overlay checks passed on `http://localhost:5201/#/`: at 1920px viewport panel z-index 90, dismiss z-index 80, block mask z-index 30, `elementFromPoint` hit inside `.filter-panel`; at 2560px viewport panel stayed 24px from the dashboard shell right edge.
- Rollback note: Revert `.panel-dismiss-layer z-index`, `.filter-panel right`, and `.filter-panel z-index` together.
- Related files: src/styles/index.scss
- File snapshot: 1067 lines, sha256 `62433a49f3fe89bd4a17fd1286ad2332e348bb8edb269c80a817b2b57b17627a`
- Follow-up: none

### v20260616073314 - 2026-06-16T07:33:14.392Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Restyled the light topbar template into a modern SaaS/BI dashboard shell.
- Modified functionality: light design tokens; topbar nav; toolbar buttons; filter drawer; white card surfaces; responsive topbar
- Code ranges: L1-L47, L130-L265, L284-L482, L515-L530, L855-L1009
- Modified content: Replaced dark cockpit tokens with gray-white SaaS tokens, restyled topbar/nav/buttons/filter drawer/cards, and added responsive topbar behavior for sub-1920 viewports.
- Affected contracts: none
- Verification: npm run build:preview passed; Browser QA screenshots and DOM checks passed for default 904px, 1920x1080, 1280x768, and open filter drawer.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1068 lines, sha256 `62433a49f3fe89bd4a17fd1286ad2332e348bb8edb269c80a817b2b57b17627a`, captured `2026-06-16T07:27:16.921Z`
- After snapshot: 1091 lines, sha256 `0157b55f82b07a06cb196478dd125334f7567e445a05679b9aee3185b3797c17`
- Change evidence: sidecar patch `src/styles/__change_logs__/patches/v20260616073314-index.scss.diff` (775 diff lines, sha256 `cfa0f37ea0af5dcddea0a1c1465275e856986b210252155c08fadc8f1cd1f909`)
- Follow-up: none

### v20260616073737 - 2026-06-16T07:37:37.008Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Changed the center navigation from segmented pills to reference-style underline text tabs.
- Modified functionality: topbar text tab navigation; active underline; responsive nav fit
- Code ranges: L198-L260, L994-L1008
- Modified content: Removed topbar nav container border/background, restyled nav items as text tabs with active blue underline, and adjusted fixed item width/gaps to avoid clipping.
- Affected contracts: none
- Verification: npm run build:preview passed; Browser QA screenshots and DOM checks passed at default 904px, 1920x1080, and 1280x768.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1091 lines, sha256 `0157b55f82b07a06cb196478dd125334f7567e445a05679b9aee3185b3797c17`, captured `2026-06-16T07:35:14.478Z`
- After snapshot: 1106 lines, sha256 `2d935f3b080097427d74d1e1b2bf037ddaeead4f898e744b77ebbe1639aa1fc0`
- Change evidence: inline unified diff:

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -199,52 +199,66 @@
   display: flex;
   align-items: center;
   justify-self: center;
-  gap: 4px;
+  gap: 48px;
   min-width: 0;
-  height: 40px;
-  padding: 4px;
-  border: 1px solid var(--line);
-  border-radius: 8px;
-  background: #f8fafc;
-  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
+  height: var(--topbar-height);
+  padding: 0 8px;
+  background: transparent;
 }

 .topbar-nav-item {
+  position: relative;
   display: inline-flex;
   align-items: center;
   justify-content: center;
-  height: 32px;
-  min-width: 82px;
-  padding: 0 18px;
+  height: var(--topbar-height);
+  flex: 0 0 auto;
+  min-width: 88px;
+  padding: 0 0 3px;
   border: 0;
-  border-radius: 6px;
-  color: #667085;
+  border-radius: 0;
+  color: #595f6f;
   background: transparent;
-  font-size: 14px;
+  font-size: 16px;
   font-weight: 600;
-  line-height: 22px;
+  line-height: 24px;
   letter-spacing: 0;
   white-space: nowrap;
   cursor: pointer;
   transition:
     color 0.16s ease,
-    background 0.16s ease,
-    box-shadow 0.16s ease;
+    text-shadow 0.16s ease;
 }

+.topbar-nav-item::after {
+  position: absolute;
+  left: 50%;
+  bottom: 8px;
+  width: 0;
+  height: 3px;
+  border-radius: 999px;
+  background: var(--accent);
+  box-shadow: 0 2px 8px rgba(0, 115, 229, 0.26);
+  transform: translateX(-50%);
+  content: "";
+  transition: width 0.18s ease;
+}
+
 .topbar-nav-item:hover {
-  color: var(--text-strong);
-  background: #ffffff;
+  color: var(--accent-secondary);
+  background: transparent;
 }

 .topbar-nav-item.active {
   color: var(--accent);
-  background: #ffffff;
-  box-shadow:
-    0 1px 2px rgba(15, 23, 42, 0.06),
-    inset 0 0 0 1px rgba(0, 115, 229, 0.08);
+  background: transparent;
+  text-shadow: 0 0 0 currentColor;
 }

+.topbar-nav-item.active::after {
+  width: 88px;
+}
+
 .topbar-button {
   display: grid;
   place-items: center;
@@ -978,6 +992,7 @@
   }

  .topbar-nav {
+    gap: 28px;
     max-width: calc(100vw - 380px);
     overflow-x: auto;
     scrollbar-width: none;
@@ -988,8 +1003,8 @@
   }

  .topbar-nav-item {
-    min-width: auto;
-    padding: 0 12px;
+    min-width: 88px;
+    font-size: 15px;
   }
 }
```
- Follow-up: none

### v20260616074001 - 2026-06-16T07:40:01.408Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Tightened reference-style topbar tabs for narrow browser widths.
- Modified functionality: responsive topbar text tabs; no clipped nav labels
- Code ranges: L994-L1012
- Modified content: Reduced sub-1200px topbar tab gap to 14px, tab width to 72px, font size to 14px, and active underline width to 72px so all six reference nav labels remain visible beside the right toolbar.
- Affected contracts: none
- Verification: npm run build:preview passed; Browser QA passed at 904x758, 1280x768, and 1920x1080 with itemClippedByNav false, itemOverlapsActions false, actionsVisible true, and no console errors.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1106 lines, sha256 `2d935f3b080097427d74d1e1b2bf037ddaeead4f898e744b77ebbe1639aa1fc0`, captured `2026-06-16T07:38:36.104Z`
- After snapshot: 1110 lines, sha256 `54cedd831bd676edce7f48eca01c2c8f0a6bad6e578ba6102b7c0f3b8c15b1a3`
- Change evidence: inline unified diff:

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -992,7 +992,7 @@
   }

   .topbar-nav {
-    gap: 28px;
+    gap: 14px;
     max-width: calc(100vw - 380px);
     overflow-x: auto;
     scrollbar-width: none;
@@ -1003,9 +1003,13 @@
   }

   .topbar-nav-item {
-    min-width: 88px;
-    font-size: 15px;
+    min-width: 72px;
+    font-size: 14px;
   }
+
+  .topbar-nav-item.active::after {
+    width: 72px;
+  }
 }

@media (max-width: 760px) {
```
- Follow-up: none

### v20260616074416 - 2026-06-16T07:44:16.110Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Fixed topbar layering so scrolled content cards cannot bleed through the header.
- Modified functionality: topbar stacking; content canvas stacking; filter overlay stacking
- Code ranges: L36, L127-L144, L289-L303, L501-L507
- Modified content: Changed topbar background to opaque white, raised topbar z-index above block masks, raised filter dismiss/panel overlays above the topbar, and isolated the content canvas at a lower stacking layer.
- Affected contracts: none
- Verification: npm run build:preview passed; Browser QA at 2048x360 with scrollY=50 confirmed first card top at y=42 while all header hit points stayed inside .topbar and outside .placeholder-cell; filter overlay QA at 1280x768 confirmed dismiss z-index 130, panel z-index 140, topbar z-index 120, and no console errors.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1110 lines, sha256 `54cedd831bd676edce7f48eca01c2c8f0a6bad6e578ba6102b7c0f3b8c15b1a3`, captured `2026-06-16T07:41:57.633Z`
- After snapshot: 1113 lines, sha256 `52042c3effdcb8e8b0413fd164a5570d5ccd969e0c7acab9e8f6718134f21795`
- Change evidence: inline unified diff:

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -33,7 +33,7 @@
   --dashboard-vignette-background:
     linear-gradient(180deg, rgba(255, 255, 255, 0.86), transparent 24%, rgba(229, 234, 242, 0.34));
   --dashboard-texture-background: none;
-  --topbar-background: rgba(255, 255, 255, 0.92);
+  --topbar-background: #ffffff;
   --title-shadow: none;
   --cell-header-background: #f8fafc;
   --cell-body-background: transparent;
@@ -128,7 +128,7 @@
   position: fixed;
   top: 0;
   left: var(--shell-left);
-  z-index: 20;
+  z-index: 120;
   display: grid;
   grid-template-columns: minmax(360px, 1fr) auto minmax(360px, 1fr);
   gap: 24px;
@@ -141,6 +141,7 @@
   background: var(--topbar-background);
   backdrop-filter: blur(18px);
   box-shadow: 0 1px 0 rgba(15, 23, 42, 0.02), 0 10px 28px rgba(15, 23, 42, 0.06);
+  isolation: isolate;
 }

 .topbar-brand,
@@ -288,7 +289,7 @@
 .panel-dismiss-layer {
   position: fixed;
   inset: 0;
-  z-index: 80;
+  z-index: 130;
   padding: 0;
   border: 0;
   background: transparent;
@@ -299,7 +300,7 @@
   position: fixed;
   top: calc(var(--topbar-height) + 14px);
   right: calc(var(--shell-left) + 32px);
-  z-index: 90;
+  z-index: 140;
   display: grid;
   grid-template-rows: auto minmax(0, 1fr) auto;
   width: 420px;
@@ -499,9 +500,11 @@

 .canvas-shell {
   position: relative;
+  z-index: 1;
   display: grid;
   height: var(--canvas-height);
   margin-top: var(--content-start-y);
+  isolation: isolate;
 }

 .placeholder-grid {
```
- Follow-up: none

### v20260618012958 - 2026-06-18T01:29:58.144Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Fix topbar actions placement when center navigation is absent.
- Modified functionality: topbar grid column anchoring, no-navigation fallback, right toolbar alignment
- Code ranges: L154-L162, L199-L207
- Modified content: Added explicit grid-column anchors for topbar brand, center nav, and right actions so CSS Grid does not auto-place the actions into the former nav column when topbarNav is empty.
- Affected contracts: none
- Verification: npm run build:preview passed; node CSS assertion confirmed brand/nav/actions grid-column anchors and right actions justify-self. Playwright runtime geometry check not run because local Playwright browsers are not installed.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1113 lines, sha256 `52042c3effdcb8e8b0413fd164a5570d5ccd969e0c7acab9e8f6718134f21795`, captured `2026-06-18T01:28:11.430Z`
- After snapshot: 1116 lines, sha256 `5b5a2d075ede0c0ec491086ec6846505fa934c99bf6ede1f36d2a57e3ddb2947`
- Change evidence: inline unified diff:

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -152,11 +152,13 @@
 }

 .topbar-brand {
+  grid-column: 1;
   gap: 14px;
   justify-self: start;
 }

 .topbar-actions-right {
+  grid-column: -2 / -1;
   gap: 8px;
   justify-self: end;
 }
@@ -197,6 +199,7 @@
 }

 .topbar-nav {
+  grid-column: 2;
   display: flex;
   align-items: center;
   justify-self: center;
```
- Follow-up: none
