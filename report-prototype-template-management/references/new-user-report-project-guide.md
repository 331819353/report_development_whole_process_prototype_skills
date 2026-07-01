# 新用户从零搭建报表项目指南

本文只保留新用户入口和执行顺序，不重复字段解释。字段含义、组件示例清单、标题/胶囊按钮/说明区、组件内数据绑定和自开发组件挂载细节，以 `configuration-field-reference.md` 为准。

## 读什么

| 目的 | 必读 |
| --- | --- |
| 了解从零到一流程 | `configurable-zero-to-one-flow.md` |
| 填写具体配置字段 | `configuration-field-reference.md` |
| 输出弱模型施工包 | `template-build-packet-contract.md` |
| 没有现成组件示例 | `custom-echarts-component-example-guide.md` |
| 维护当前经营分析示例 | `business-report-project-implementation-overview.md` |

## 最小执行顺序

1. 选择一个框架模板：`frozen-title-sci-fi-cockpit-template`、`left-nav-analytics-workbench-template`、或 `topbar-light-scroll-dashboard-template`。
2. 配置 `pageLayoutConfig` 和 `layoutRows`，每行 12 列，所有分块必须为矩形。
3. 为每个页面分块创建 `createBlockAreaConfig`，并写入 `blockAreaConfigMap`。
4. 在每个分块中配置标题、说明、胶囊按钮、辅助信息、单位和组件区。
5. 为每个组件区槽位选择已注册组件示例，写入 `componentSlotConfigMap` 和 `componentExampleConfigMap`。
6. 只有现有组件示例无法满足时，使用自开发 ECharts 组件模板或注册新的组件示例。
7. 绑定数据、筛选、交互和结论规则：筛选写在 `filters[]`，槽位数据写在 `componentSlots[].data` 或 owning widget 的 `data`，作用域用 `filterScope` 匹配 `filters[].scope`，数据行转 props 用 `dataBinding`，下钻/跳转/弹窗/交叉筛选用 `actions`。
8. 运行 `npm run validate:dashboard` 和 `npm run build:test`。

## 新用户不要做什么

- 不要从空 Vue/Vite 项目重新搭建。
- 不要恢复固定尺寸分块模板。
- 不要使用组件内容区模板。
- 不要把标题、说明、筛选、胶囊按钮、单位或工具栏塞进组件槽位。
- 不要把 `filterScope` 当作筛选字段 id；它匹配的是 `filters[].scope`。接口必填筛选字段写在 `requiredFilters` 或 API/query 参数中。
- 不要为组件示例新增重复筛选面板、重复数据加载器或重复弹窗壳；优先使用 `dataBinding` 和 `actions`。
- 不要用未注册 Vue 文件、静态截图、HTML 假图或只有 `visualType` 的占位内容填槽位。

## 交付前检查

- `frameworkTemplateId` 已选定。
- `layoutRows` 每行 12 列，且分块为矩形。
- 每个可见分块都有 `blockAreaConfigMap` 行。
- 每个槽位都有注册过的 `componentExampleId`。
- 动态槽位有 `dataBinding.mode` 和字段映射，或明确标记为静态数据。
- scoped 筛选有完整链路：`filters[].scope -> filterScope -> data/API params`。
- 交互有完整链路：事件名、source block/slot、`actions` 放置位置、target type、query/params、状态响应和 QA case。
- 自开发组件已导出、注册、写入 schema，并能被 `WidgetRenderer` 渲染。
- 页面 DOM 中存在 `.layout-slot-content-widget`。
- `validate:dashboard` 和 `build:test` 通过。
