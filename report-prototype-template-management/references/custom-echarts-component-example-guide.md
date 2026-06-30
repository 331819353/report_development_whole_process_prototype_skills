# 自开发 ECharts 组件示例并挂载指南

本文只保留自开发判断和注册步骤。组件示例清单、props/config 数据绑定、`config` section 含义和示例代码，以 `configuration-field-reference.md` 为准。

## 什么时候才自开发

优先使用现有组件示例。只有满足以下任一条件时，才使用自开发 ECharts 组件：

- 现有示例无法表达业务图形语义。
- 数据结构不是 KPI、趋势、柱图、组合图、占比、热力、象限、雷达、漏斗、明细表、复杂表、行动清单或结论卡能够覆盖的结构。
- 需要 ECharts `custom` series 或特殊图形元素。
- 现有示例通过 props/config 调整后仍会破坏读数、交互或布局。

如果只是标题、颜色、单位、数据、列、图例、轴标签、行数或显隐差异，改现有组件示例的 props/config，不要新增组件。

## 优先使用内置自开发入口

内置入口：

```text
component-example-catalog:custom-echart-component-template
src/widgets/templates/component-examples/CustomEChartComponentTemplate.vue
```

适用：需要一个自定义 ECharts 画法，但仍可以使用通用 `items/auxMetrics/config` 数据结构。

## 新建独立组件的步骤

1. 新建 `src/widgets/templates/component-examples/<YourExampleCard>.vue`。
2. 在 `src/widgets/templates/component-examples/index.ts` 导出组件。
3. 在 `src/widgets/templates/component-examples/config.ts` 增加 config 类型、`ComponentExampleConfigByWidgetType` 字段和 schema。
4. 在 `src/widgets/registry.ts` 注册组件。
5. 在 `business-report-pages.ts` 的 `slot(...)` 中绑定新的 `componentExampleId`。

## 自开发组件要求

- 根节点包含 `layout-slot-content-widget`。
- 根节点宽高使用 `100%`。
- 创建真实 ECharts 实例，不能用截图、静态 HTML 或手写 SVG 假图。
- 数据和主题通过 props/config 传入，不能写死业务数据。
- 监听尺寸变化并调用 `chart.resize()`。
- 卸载时 dispose 图表实例。
- 暗色模板不得写死浅色背景。

## 验收

- `component-examples/index.ts` 已导出。
- `component-examples/config.ts` 已增加 schema。
- `widgets/registry.ts` 已注册。
- `componentSlots[].componentExampleId` 使用 `component-example-catalog:<id>`。
- 页面 DOM 中存在 `.layout-slot-content-widget`。
- `npm run validate:dashboard` 通过。
- `npm run build:test` 通过。
