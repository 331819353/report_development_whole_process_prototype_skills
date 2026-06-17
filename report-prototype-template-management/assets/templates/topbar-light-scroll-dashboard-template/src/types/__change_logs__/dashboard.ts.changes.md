# Code Change Ledger: src/types/dashboard.ts

- Code file: `src/types/dashboard.ts`
- Ledger file: `src/types/__change_logs__/dashboard.ts.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-06-16T07:27:16.947Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-16T07:27:16.948Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 85 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `4019f228579b64c19c49b3d4f95c1876db96a42657e13b66988621708521e66e`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260616073314 - 2026-06-16T07:33:14.388Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Extended the dashboard screen contract with configurable topbar navigation.
- Modified functionality: DashboardTopbarNavItem; DashboardScreenConfig topbar navigation fields
- Code ranges: L40-L43, L74-L83
- Modified content: Added DashboardTopbarNavItem and optional topbarNav/defaultTopbarNavId fields to DashboardScreenConfig.
- Affected contracts: none
- Verification: npm run build:preview passed, including vue-tsc --noEmit.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 85 lines, sha256 `4019f228579b64c19c49b3d4f95c1876db96a42657e13b66988621708521e66e`, captured `2026-06-16T07:27:16.948Z`
- After snapshot: 92 lines, sha256 `bcc4f250a7fa0802f79fbc1d034aa9430b2d4afdcf37ad834c9d036030507fb1`
- Change evidence: inline unified diff:

```diff
--- a/src/types/dashboard.ts
+++ b/src/types/dashboard.ts
@@ -37,6 +37,11 @@
   refresh: string;
 }

+export interface DashboardTopbarNavItem {
+  id: string;
+  label: string;
+}
+
 export interface DashboardFilterOption {
   id: string;
   label: string;
@@ -69,6 +74,8 @@
 export interface DashboardScreenConfig {
   title: string;
   filterTitle: string;
+  topbarNav?: DashboardTopbarNavItem[];
+  defaultTopbarNavId?: string;
   defaultTheme: ThemeMode;
   defaultFiltersOpen: boolean;
   layout: DashboardLayoutConfig;
```
- Follow-up: none

### v20260616075618 - 2026-06-16T07:56:18.062Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: 为轻量导航页面绑定扩展 Dashboard 配置类型，允许 topbarNav/defaultTopbarNavId 和 pages[id] 页面映射。
- Modified functionality: topbar-nav-page-binding,dashboard-config-types
- Code ranges: 40-43,74-90
- Modified content: 新增 DashboardTopbarNavItem；DashboardScreenConfig 暴露 topbarNav/defaultTopbarNavId；DashboardConfig 支持可选 pages 映射并保留 page 回退。
- Affected contracts: none
- Verification: npm run build:preview passed; Browser QA on http://localhost:5302/#/ clicked six nav items and confirmed active nav, expected cell counts, matching page badges, no nav overflow, no new console errors.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 92 lines, sha256 `bcc4f250a7fa0802f79fbc1d034aa9430b2d4afdcf37ad834c9d036030507fb1`, captured `2026-06-16T07:48:10.077Z`
- After snapshot: 93 lines, sha256 `4fedfd0678fd577c04f2d8015d47efe06ab9809d8ff18b42ade9053e9105f747`
- Change evidence: inline unified diff:

```diff
--- a/src/types/dashboard.ts
+++ b/src/types/dashboard.ts
@@ -86,6 +86,7 @@
 export interface DashboardConfig {
   assets: DashboardAssetConfig;
   screen: DashboardScreenConfig;
+  pages?: Record<string, DashboardPageConfig>;
   page: DashboardPageConfig;
   filters: DashboardFilterGroup[];
 }
```
- Follow-up: none
