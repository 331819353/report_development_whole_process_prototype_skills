# Code Change Ledger: src/widgets/templates/WidgetTemplate.vue

- Code file: `src/widgets/templates/WidgetTemplate.vue`
- Ledger file: `src/widgets/templates/__change_logs__/WidgetTemplate.vue.changes.md`
- Purpose: Vue3 standard project structure refactor baseline
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T12:42:33.576Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-11T12:42:33.577Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 273 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `5177741fef43090d7abdc602b51fa04bb6810e06a08feff3df42bebe08101cc4`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611125155 - 2026-06-11T12:51:55.861Z

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
- File snapshot: 273 lines, sha256 `97e2156f9920c6adeb847ab41b0765f5adb50513e9ee611854b26cbdad4c5f62`
- Follow-up: none

### v20260611133152 - 2026-06-11T13:31:52.921Z

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
- File snapshot: 273 lines, sha256 `d8ccb6fa6406c240fc939ce2563b9a66e7cbeac6a8e3b3c4ddf0b530870a0bfb`
- Follow-up: none

### v20260622023542 - 2026-06-22T02:35:42.072Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Document default ECharts legend and Y-axis unit rules
- Modified functionality: Widget development template chart comments
- Code ranges: top chart-rule comment block
- Modified content: Added component-template guidance for top-centered ECharts legends and Y-axis unit placement with raw numeric axis labels.
- Affected contracts: none
- Verification: npm run validate:dashboard passed
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 273 lines, sha256 `d8ccb6fa6406c240fc939ce2563b9a66e7cbeac6a8e3b3c4ddf0b530870a0bfb`, captured `2026-06-22T02:28:43.248Z`
- After snapshot: 275 lines, sha256 `fec29c7873b936945e03112bb11a4a40fa2f5330ec4dc39176db6a3495fea6ba`
- Change evidence: inline unified diff:

```diff
--- a/src/widgets/templates/WidgetTemplate.vue
+++ b/src/widgets/templates/WidgetTemplate.vue
@@ -138,6 +138,8 @@
  * - 内容区背景由模板铺满整个 body，不要再做一个缩进背景或默认边框。
  * - KPI 核心数字使用 28-32px；单位/同比/辅助标签使用 12-14px；表格/列表里的财务和指标数字右对齐。
  * - 多系列 ECharts 必须显示 legend；隐藏外边框和纵向网格，横向网格用浅色虚线。
+ * - ECharts 图例默认顶部居中：使用 legend: { top: 0, left: 'center' } 或等效居中策略；右侧/底部/隐藏图例必须写明业务或小屏降级原因。
+ * - 笛卡尔坐标系图表必须在 yAxis.name、yAxisUnit/axisUnit 或 leftAxisUnit/rightAxisUnit 配置单位；yAxis.axisLabel 原始刻度只显示数值，不要在每个刻度后拼接 %, 元, 万元等单位，单位放在 Y 轴标题和 tooltip 中。
  * - 折线图排序时先 sort rows，再用同一份 rows 生成 xAxis.data 和所有 series.data。
  *   不要写 labels.sort() 后让 series.data 继续读取未排序 data。
  * - 状态文字必须渲染成 badge/pill 或 icon+text，不要只输出纯文本。
```
- Follow-up: none

### v20260622031757 - 2026-06-22T03:17:57Z

- Change ID: echarts-axis-anatomy-template-guidance
- Actor: codex
- Change type: update
- Summary: Document default ECharts dynamic axis, compact grid, axis-title placement, inside target labels, and single-series legend behavior in the widget template.
- Modified functionality: Widget development template chart comments
- Code ranges: top chart-rule comment block
- Modified content: Added guidance that single-series charts hide legends, NPS/score/rate/current-vs-target charts compute dynamic Y-axis ranges, Cartesian grids explicitly tighten all four sides, target/reference labels use `insideEndTop`, and Y/X axis titles sit on side/bottom axes.
- Affected contracts: widget authoring handoff; validate-dashboard contract
- Verification: node --check scripts/validate-dashboard-contract.mjs; npm run validate:dashboard; npm run build:preview; negative ECharts contract probe failed as expected for the new chart anatomy checks; git diff --check passed.
- Rollback note: remove the added chart guidance lines only if the ECharts anatomy contract changes.
- Related files: scripts/validate-dashboard-contract.mjs; src/config/dashboard.config.ts
- Follow-up: none
