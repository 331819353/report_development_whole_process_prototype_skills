# Code Change Ledger: src/widgets/templates/WidgetTemplate.vue

- Code file: `src/widgets/templates/WidgetTemplate.vue`
- Ledger file: `src/widgets/templates/__change_logs__/WidgetTemplate.vue.changes.md`
- Purpose: Vue3 standard project structure refactor baseline
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T12:42:34.887Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-11T12:42:34.888Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 276 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `3b9381fcfeef34fdf4477e01ce4a31617035359c5c30946b20dabb75bccce07a`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611125158 - 2026-06-11T12:51:58.744Z

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
- File snapshot: 276 lines, sha256 `204e25fe2e032713c7a7520a7438680618ee34b9b0994b7cf8288d6849597c9f`
- Follow-up: none

### v20260611133152 - 2026-06-11T13:31:52.449Z

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
- File snapshot: 276 lines, sha256 `957039630b2303df906e802ea05de2f1ae46f3a362a996390eff3c076f6034c4`
- Follow-up: none

### v20260616075618 - 2026-06-16T07:56:18.108Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: 同步组件模板上下文注释，说明 navId/navLabel 已跟随当前页面导航。
- Modified functionality: widget-template-context-comment
- Code ranges: 173-179
- Modified content: 将 navId/navLabel 从单页固定说明改为当前页面/导航语义，并标注未配置 pages/topbarNav 时的回退。
- Affected contracts: none
- Verification: npm run build:preview passed; Browser QA on http://localhost:5302/#/ clicked six nav items and confirmed context-facing page label behavior through placeholder badges and grid aria labels.
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 276 lines, sha256 `957039630b2303df906e802ea05de2f1ae46f3a362a996390eff3c076f6034c4`, captured `2026-06-16T07:55:40.064Z`
- After snapshot: 276 lines, sha256 `f8e57a30dd0d70ce6f96b016851775cc4905467ebc1d6e8742e7e8cfd48925c8`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/WidgetTemplate.vue
+++ b/src/widgets/templates/WidgetTemplate.vue
@@ -174,8 +174,8 @@
    * context 是模板自动提供的上下文，不需要在配置文件里写。
    * 常用字段：
    * - context.area：当前区域，模板主画布固定为 page
-   * - context.navId：兼容字段，单页模板固定为 single-page
-   * - context.navLabel：兼容字段，单页模板为当前页面标题
+   * - context.navId：当前页面/导航 id；未配置 pages 时回退为 single-page
+   * - context.navLabel：当前导航标签；未配置导航时回退为页面标题
    * - context.blockId：当前分块字符，例如 A、B、g
    * - context.filters：当前组件作用域内的筛选项选中值
    * - context.allFilters：全量筛选项选中值
```
- Follow-up: none
