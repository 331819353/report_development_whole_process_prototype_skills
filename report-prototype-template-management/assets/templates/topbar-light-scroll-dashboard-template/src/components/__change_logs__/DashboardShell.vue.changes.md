# Code Change Ledger: src/components/DashboardShell.vue

- Code file: `src/components/DashboardShell.vue`
- Ledger file: `src/components/__change_logs__/DashboardShell.vue.changes.md`
- Purpose: Block title and state mask behavior repair
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T13:02:46.559Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-11T13:02:46.560Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1025 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `05b42dc348746874190a4e27905be46c94172c886297dec56ff81a8d16b41954`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611130905 - 2026-06-11T13:09:05.009Z

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
- File snapshot: 1084 lines, sha256 `a11f759e63cce10d6bb5011036e1da854df2e1dda2c4f5e62439783b5059e957`
- Follow-up: none

### v20260611133151 - 2026-06-11T13:31:51.558Z

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
- File snapshot: 893 lines, sha256 `9a9891b3b102ce45791861e93d976a750e6b6b54c851ad9099de6644f09af599`
- Follow-up: none

### v20260616073314 - 2026-06-16T07:33:14.388Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Redesigned the topbar shell with left-aligned title, configurable center navigation, and preserved right-side controls.
- Modified functionality: topbar nav runtime state; topbar shell template
- Code ranges: L56-L57, L589-L590, L755-L805
- Modified content: Added config-driven topbar navigation state and replaced centered ornament title markup with left brand/title plus center nav buttons while keeping refresh/filter/download controls.
- Affected contracts: none
- Verification: npm run build:preview passed; Browser QA screenshots and DOM checks passed for default 904px, 1920x1080, and 1280x768 viewports.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 893 lines, sha256 `9a9891b3b102ce45791861e93d976a750e6b6b54c851ad9099de6644f09af599`, captured `2026-06-16T07:27:16.930Z`
- After snapshot: 900 lines, sha256 `a7e491808c5f5fe0bc4c8e1a295f75fa88dd866eda4b4e838db0faab326cb286`
- Change evidence: inline unified diff:

```diff
--- a/src/components/DashboardShell.vue
+++ b/src/components/DashboardShell.vue
@@ -53,6 +53,8 @@
 const pageId = 'single-page';
 const pageTitle = computed(() => props.config.screen.title);
 const dashboardStateStorageKey = 'topbar-light-scroll-dashboard:runtime-state';
+const topbarNavItems = computed(() => props.config.screen.topbarNav ?? []);
+const activeTopbarNavId = ref(props.config.screen.defaultTopbarNavId ?? topbarNavItems.value[0]?.id ?? '');

 const getStaticFilterOptions = (group: DashboardFilterGroup) => group.options ?? [];

@@ -584,7 +586,11 @@
   isFiltersOpen.value = !isFiltersOpen.value;
 };

+const setActiveTopbarNav = (navId: string) => {
+  activeTopbarNavId.value = navId;
+};

+
 const persistDashboardState = () => {
   try {
     sessionStorage.setItem(
@@ -747,27 +753,28 @@

     <section class="dashboard-shell">
       <header class="topbar">
-        <div class="topbar-actions topbar-actions-left" @click.stop>
+        <div class="topbar-brand" @click.stop>
           <div class="topbar-logo" :aria-label="config.assets.logoAlt" role="img">
             <img :src="config.assets.logoSrc" :alt="config.assets.logoAlt" />
           </div>
+          <h1 class="topbar-title">
+            <span class="topbar-title-text">{{ config.screen.title }}</span>
+          </h1>
         </div>

-        <h1 class="topbar-title">
-          <span class="topbar-title-ornament topbar-title-ornament-left" aria-hidden="true">
-            <i class="title-arrow"></i>
-            <i class="title-arrow"></i>
-            <i class="title-arrow"></i>
-            <i class="title-arrow"></i>
-          </span>
-          <span class="topbar-title-text">{{ config.screen.title }}</span>
-          <span class="topbar-title-ornament topbar-title-ornament-right" aria-hidden="true">
-            <i class="title-arrow"></i>
-            <i class="title-arrow"></i>
-            <i class="title-arrow"></i>
-            <i class="title-arrow"></i>
-          </span>
-        </h1>
+        <nav v-if="topbarNavItems.length > 0" class="topbar-nav" aria-label="主导航" @click.stop>
+          <button
+            v-for="item in topbarNavItems"
+            :key="item.id"
+            class="topbar-nav-item"
+            :class="{ active: activeTopbarNavId === item.id }"
+            type="button"
+            :aria-pressed="activeTopbarNavId === item.id"
+            @click="setActiveTopbarNav(item.id)"
+          >
+            {{ item.label }}
+          </button>
+        </nav>

         <div class="topbar-actions topbar-actions-right" @click.stop>
           <button
```
- Follow-up: none

### v20260616075618 - 2026-06-16T07:56:18.072Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: 实现顶栏导航到轻量页面配置的运行时绑定。
- Modified functionality: topbar-nav-page-binding,active-page-runtime,widget-context-page-id
- Code ranges: 52-62,179-216,548-567,615-638,772-789,811-823,906-937
- Modified content: 增加 activeTopbarNavId/activePage/activePageLabel 运行态；布局、组件、数据 key、占位 mask、WidgetContext、持久化状态均跟随当前导航；点击导航切换页面并重置滚动/筛选面板状态。
- Affected contracts: none
- Verification: npm run build:preview passed; Browser QA on http://localhost:5302/#/ clicked six nav items and confirmed active nav, expected cell counts, matching page badges, grid aria label updates, no nav overflow, no new console errors.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 900 lines, sha256 `a7e491808c5f5fe0bc4c8e1a295f75fa88dd866eda4b4e838db0faab326cb286`, captured `2026-06-16T07:48:10.079Z`
- After snapshot: 946 lines, sha256 `1ef8af39265acec68da224a4ef9f9968ea12c88958b410f0793879b921c7c33a`
- Change evidence: inline unified diff:

```diff
--- a/src/components/DashboardShell.vue
+++ b/src/components/DashboardShell.vue
@@ -5,7 +5,13 @@
 import { resolveDataSource } from '../dataSources/registry';
 import type { DashboardActionConfig, DashboardExpressionValue, DashboardWidgetActionEvent } from '../types/actions';
 import type { DashboardFilterScope } from '../types/data-source';
-import type { DashboardConfig, DashboardFilterGroup, DashboardFilterOption, ThemeMode } from '../types/dashboard';
+import type {
+  DashboardConfig,
+  DashboardFilterGroup,
+  DashboardFilterOption,
+  DashboardPageConfig,
+  ThemeMode,
+} from '../types/dashboard';
 import { resolveDashboardParams, resolveDashboardValue } from '../utils/dashboardExpressions';
 import WidgetRenderer from '../widgets/WidgetRenderer.vue';
 import {
@@ -45,16 +51,15 @@

 interface PersistedDashboardState {
   filters?: Record<string, string>;
+  topbarNavId?: string;
   scrollX?: number;
   scrollY?: number;
 }

 const emptyGridMarks = new Set(['.', ' ']);
-const pageId = 'single-page';
-const pageTitle = computed(() => props.config.screen.title);
+const fallbackPageId = 'single-page';
 const dashboardStateStorageKey = 'topbar-light-scroll-dashboard:runtime-state';
 const topbarNavItems = computed(() => props.config.screen.topbarNav ?? []);
-const activeTopbarNavId = ref(props.config.screen.defaultTopbarNavId ?? topbarNavItems.value[0]?.id ?? '');

 const getStaticFilterOptions = (group: DashboardFilterGroup) => group.options ?? [];

@@ -171,6 +176,19 @@
 const persistedDashboardState = readPersistedDashboardState();
 const defaultFilters = getDefaultFiltersFromGroups(props.config.filters);

+const getDefaultTopbarNavId = () => props.config.screen.defaultTopbarNavId ?? topbarNavItems.value[0]?.id ?? fallbackPageId;
+
+const isKnownTopbarNavId = (navId?: string) =>
+  Boolean(navId && (props.config.pages?.[navId] || topbarNavItems.value.some((item) => item.id === navId)));
+
+const getInitialTopbarNavId = () => {
+  if (isKnownTopbarNavId(persistedDashboardState.topbarNavId)) {
+    return persistedDashboardState.topbarNavId as string;
+  }
+
+  return getDefaultTopbarNavId();
+};
+
 const getInitialFilters = () =>
   Object.fromEntries(
     props.config.filters.map((group) => [
@@ -181,6 +199,7 @@

 const getInitialTheme = (): ThemeMode => props.config.screen.defaultTheme;

+const activeTopbarNavId = ref(getInitialTopbarNavId());
 const activeFilters = ref<Record<string, string>>(getInitialFilters());
 const filterOptionMap = ref<Record<string, DashboardFilterOption[]>>({});
 const widgetDataMap = ref<Record<string, unknown[]>>({});
@@ -190,7 +209,11 @@
 const pageScrollX = ref(0);
 const scrollTargets: EventTarget[] = [];

-const layoutRows = computed(() => normalizeLayoutRows(props.config.page.layoutRows));
+const activeTopbarNavItem = computed(() => topbarNavItems.value.find((item) => item.id === activeTopbarNavId.value));
+const activePageId = computed(() => (props.config.pages?.[activeTopbarNavId.value] ? activeTopbarNavId.value : fallbackPageId));
+const activePage = computed<DashboardPageConfig>(() => props.config.pages?.[activeTopbarNavId.value] ?? props.config.page);
+const activePageLabel = computed(() => activeTopbarNavItem.value?.label ?? props.config.screen.title);
+const layoutRows = computed(() => normalizeLayoutRows(activePage.value.layoutRows));
 const layoutColumnCount = computed(() => Math.max(...layoutRows.value.map((row) => Array.from(row).length), 1));
 const layoutRowCount = computed(() => Math.max(layoutRows.value.length, 1));
 const layoutBlocks = computed<LayoutBlock[]>(() => buildLayoutBlocks(layoutRows.value));
@@ -228,7 +251,7 @@
 let widgetDataLoadToken = 0;
 let hasInitializedFilters = false;

-const getWidgetForBlock = (blockId: string): RegisteredWidgetConfig | undefined => props.config.page.widgets?.[blockId];
+const getWidgetForBlock = (blockId: string): RegisteredWidgetConfig | undefined => activePage.value.widgets?.[blockId];

 const isFilterVisibleForWidget = (group: DashboardFilterGroup, widget?: RegisteredWidgetConfig) => {
   const filterScopes = normalizeScope(group.scope);
@@ -253,7 +276,7 @@

 const getWidgetDataKey = (ownerId: string, blockId: string) => `page:${ownerId}:${blockId}`;

-const getWidgetOwnerId = () => pageId;
+const getWidgetOwnerId = () => activePageId.value;

 const getWidgetInstanceKey = (blockId: string) => getWidgetDataKey(getWidgetOwnerId(), blockId);

@@ -265,7 +288,9 @@
   if (!widget) {
     return {
       kind: 'unbound',
+      label: activePageLabel.value,
       title: '建设中',
+      message: `已预留 ${blockId} 模块位。`,
     };
   }

@@ -289,8 +314,8 @@

 const getWidgetContext = (blockId: string, widget = getWidgetForBlock(blockId)): WidgetContext => ({
   area: 'page',
-  navId: pageId,
-  navLabel: pageTitle.value,
+  navId: activePageId.value,
+  navLabel: activePageLabel.value,
   blockId,
   filters: getScopedFilters(widget),
   allFilters: activeFilters.value,
@@ -523,13 +548,14 @@
 const loadWidgetData = async () => {
   const currentToken = ++widgetDataLoadToken;
   const jobs: Array<Promise<readonly [string, unknown[]]>> = [];
+  const ownerId = activePageId.value;

-  Object.entries(props.config.page.widgets ?? {}).forEach(([blockId, widget]) => {
+  Object.entries(activePage.value.widgets ?? {}).forEach(([blockId, widget]) => {
     if (!widget) {
       return;
     }

-    jobs.push(resolveWidgetData(pageId, blockId, widget, getWidgetContext(blockId, widget)));
+    jobs.push(resolveWidgetData(ownerId, blockId, widget, getWidgetContext(blockId, widget)));
   });
   const entries = await Promise.all(jobs);

@@ -587,7 +613,15 @@
 };

 const setActiveTopbarNav = (navId: string) => {
+  if (activeTopbarNavId.value === navId) {
+    return;
+  }
+
   activeTopbarNavId.value = navId;
+  widgetDataMap.value = {};
+  closePanels();
+  window.scrollTo(window.scrollX, 0);
+  syncPageScroll();
 };


@@ -597,6 +631,7 @@
       dashboardStateStorageKey,
       JSON.stringify({
         filters: activeFilters.value,
+        topbarNavId: activeTopbarNavId.value,
         scrollX: window.scrollX,
         scrollY: window.scrollY,
       } satisfies PersistedDashboardState),
@@ -735,7 +770,18 @@


 watch(
-  () => props.config.page,
+  topbarNavItems,
+  () => {
+    if (!isKnownTopbarNavId(activeTopbarNavId.value)) {
+      activeTopbarNavId.value = getDefaultTopbarNavId();
+    }
+  },
+  { deep: true },
+);
+
+
+watch(
+  () => activePage.value,
   () => {
     void loadWidgetData();
   },
@@ -858,10 +904,10 @@
       </aside>

       <section class="canvas-shell">
-        <section class="placeholder-grid" :aria-label="`${layoutColumnCount}乘${layoutRowCount}内容占位区`">
+        <section class="placeholder-grid" :aria-label="`${activePageLabel} ${layoutColumnCount}乘${layoutRowCount}内容占位区`">
           <div
             v-for="block in layoutBlocks"
-            :key="block.id"
+            :key="`${activePageId}:${block.id}`"
             class="placeholder-cell"
             :style="{
               gridColumn: `${block.columnStart} / ${block.columnEnd}`,
```
- Follow-up: none
