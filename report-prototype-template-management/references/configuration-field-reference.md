# 报表模板配置字段参考

本文回答配置层面的具体问题：每一项配置代表什么、组件示例有哪些、标题/胶囊按钮/说明区怎么改、组件内数据怎么绑定、自开发组件怎么开发和挂载。

## 0. 配置源文件

三套模板都遵循同一套配置结构。实现时优先对齐以下文件：

| 内容 | 文件 |
| --- | --- |
| 页面、分块、槽位、组件挂载 | `src/report-template-assets/business-report-pages.ts` |
| 模板导航、页面入口、全局筛选、工具栏 | `src/config/dashboard.config.ts` |
| 分块运行时 | `src/widgets/templates/block-spans/BaseLayoutSpan.vue` |
| 分块槽位类型 | `src/widgets/templates/block-spans/types.ts` |
| 组件示例注册 schema | `src/widgets/templates/component-examples/config.ts` |
| 组件示例导出 | `src/widgets/templates/component-examples/index.ts` |
| 组件渲染注册 | `src/widgets/registry.ts` |
| 组件 props 类型 | `src/widgets/types.ts` |

只允许改这条配置链：

```text
frameworkTemplateId
  -> pageLayoutConfig/layoutRows
  -> blockAreaConfigMap/createBlockAreaConfig
  -> componentSlotConfigMap/componentSlotContracts
  -> componentExampleConfigMap/componentSlots
  -> props/config data binding
  -> optional customEChartExampleMap
  -> releaseValidation
```

## 1. 完整配置示例

```ts
const revenueQualityBlock = createBlockAreaConfig({
  title: '收入质量诊断',
  note: '观察收入、毛利、目标达成和异常门店，判断本月经营质量。',
  bodySummary: '统计范围：本月已关账门店；收入和毛利取财务确认口径。',
  titlePills: [
    { id: 'month', label: '本月' },
    { id: 'quarter', label: '本季' },
    { id: 'year', label: '全年', disabled: true },
  ],
  componentRegionPattern: 'AB',
  slots: [
    slot(
      'A',
      '收入趋势',
      'line-chart-card',
      componentWidget('LineChartExampleCard', 'line', '收入趋势', {
        unit: '万元',
        categories: ['1月', '2月', '3月', '4月'],
        series: [
          { name: '收入', values: [3200, 3480, 3720, 4010], smooth: true },
          { name: '毛利', values: [820, 860, 910, 980], smooth: true },
        ],
        auxMetrics: [
          { label: '同比', value: '+8.6%', tone: 'success' },
          { label: '预算差', value: '-120万', tone: 'warning' },
        ],
        config: {
          title: { visible: false },
          layout: { paddingPx: 8 },
          chart: { legendVisible: true, smooth: true },
        },
      }),
      1,
      'primary',
    ),
    slot(
      'B',
      '渠道占比',
      'proportion-chart-card',
      componentWidget('ProportionChartExampleCard', 'pie', '渠道占比', {
        unit: '万元',
        totalLabel: '收入',
        items: [
          { name: '直营', value: 1880 },
          { name: '经销', value: 1320 },
          { name: '线上', value: 810 },
        ],
        config: {
          title: { visible: true },
          chart: { labelVisible: true },
        },
      }),
      1,
      'secondary',
    ),
  ],
});
```

## 2. 页面布局怎么配

`layoutRows` 决定页面分块位置和大小。每一行必须正好 12 个字符，同一个字母代表同一个分块。

```ts
const projectLayoutRows = [
  'AAAABBBBCCCC',
  'AAAABBBBCCCC',
  'DDDDEEEEFFFF',
  'DDDDEEEEFFFF',
  'DDDDEEEEFFFF',
  'GGGGHHHHIIII',
  'GGGGHHHHIIII',
  'GGGGHHHHIIII',
];
```

| 配置 | 含义 |
| --- | --- |
| `A/B/C...` | 分块 ID。每个字母必须对应一个 `blockAreaConfigMap` widget。 |
| 每行 12 个字符 | 12 列网格。不能 11、13，也不能用空格补位。 |
| 同一字母矩形 | 同一分块必须形成矩形，不能 L 形、断裂、斜连。 |
| 行数 `N >= 8` | 报表页至少 8 行，保证内容密度和滚动可读性。 |
| 分块大小 | 由字母占据的列数和行数自动计算，不再选择固定 `4x3`、`12x8` 模板。 |

## 3. 分块配置怎么配

分块用 `createBlockAreaConfig` 创建。它负责标题区、胶囊按钮、说明区、组件区和槽位声明。

| 字段 | 类型 | 作用 | 修改方式 |
| --- | --- | --- | --- |
| `title` | string | 分块标题，显示在块标题区。 | 改这里就是改分块标题。 |
| `note` | string | 分块说明或业务口径，传给分块运行时。 | 写该块回答什么问题、统计范围或口径。 |
| `bodySummary` | string | 说明区文本，显示在块体的 `4 说明区`。 | 改这里就是改说明区。没有说明就不要填。 |
| `titlePills` | `WidgetTitlePillOption[]` | 标题右侧胶囊按钮。 | 改数组的 `id/label/hidden/disabled`。 |
| `componentRegionPattern` | string | 组件区内部槽位布局。 | 单槽用 `A`，双槽用 `AB`，三槽用 `ABC`，复杂布局用 `AAB|CCD`。 |
| `slots` | `ProjectReportSlot[]` | 分块内的组件槽位。 | 每个槽位用 `slot(...)` 绑定一个组件示例。 |

### 标题怎么改

分块标题改 `createBlockAreaConfig({ title })`：

```ts
createBlockAreaConfig({
  title: '经营健康度',
  note: '观察收入、利润、风险和行动闭环。',
  componentRegionPattern: 'A',
  slots: [...],
});
```

组件内部短标题改 `slot` 的第二个参数或 `componentWidget` 的第三个参数：

```ts
slot('A', '收入趋势', 'line-chart-card', componentWidget('LineChartExampleCard', 'line', '收入趋势', props));
```

规则：

- 单槽位大图通常用分块标题作为主标题，组件内标题可用 `config.title.visible: false` 隐藏。
- 多槽位分块可以保留组件内短标题，帮助区分 A/B/C 槽。
- 不要把分块标题写进组件 `props.title` 后又在分块 `title` 里重复一遍。

### 胶囊按钮怎么改

胶囊按钮配置在分块的 `titlePills`：

```ts
titlePills: [
  { id: 'revenue', label: '收入' },
  { id: 'profit', label: '利润' },
  { id: 'risk', label: '风险', hidden: false },
  { id: 'forecast', label: '预测', disabled: true },
],
```

| 字段 | 含义 |
| --- | --- |
| `id` | 稳定 ID，用于记录当前激活项。必须非空。 |
| `label` | 按钮显示文本。必须非空。 |
| `hidden` | 为 `true` 时不渲染，也不占位。 |
| `disabled` | 为 `true` 时渲染但不可点击。 |

注意：

- 胶囊按钮目前是块标题区的轻量切换入口，模板会维护激活态。
- 胶囊按钮本身不自动切换组件数据。需要真实切换时，在交互行为或组件 props 中补充数据切换逻辑。
- 一个分块可见胶囊建议不超过 6 个，超过会触发密度风险。

### 说明区怎么改

说明区配置在 `bodySummary`：

```ts
bodySummary: '统计范围：直营门店；收入以财务确认口径为准；异常门店按毛利率低于 15% 识别。',
```

适合放：

- 数据范围、统计口径、刷新频率。
- 图表读法、风险提示、管理动作提示。
- 不能重复放组件已展示的结论。

不适合放：

- 组件标题。
- 单位标签。
- 筛选条件。
- 工具栏按钮。
- 可以通过 `ConclusionExampleCard` 表达的完整业务结论。

## 4. 槽位怎么配

业务配置通常用本地 helper：

```ts
slot(id, label, exampleId, widget, widthUnits, role)
```

| 参数 | 含义 |
| --- | --- |
| `id` | 槽位字母，通常是 `A/B/C`，必须和 `componentRegionPattern` 中的字母对应。 |
| `label` | 槽位名称，会作为组件短标题候选。 |
| `exampleId` | 组件示例短 ID，如 `line-chart-card`。运行时会补成 `component-example-catalog:line-chart-card`。 |
| `widget` | `componentWidget(...)` 返回的组件实例配置。 |
| `widthUnits` | 槽位宽度权重，用于槽位契约和最小尺寸说明。 |
| `role` | `primary`、`secondary`、`supporting`、`reference`。用于说明主次关系。 |

运行时会生成两张表：

| 表 | 作用 |
| --- | --- |
| `componentSlotContracts` | 声明槽位 ID、区域、顺序、角色、宽高单位、是否必填。 |
| `componentSlots` | 真正绑定 `componentExampleId`、`props`、`config` 和数据策略。 |

常见布局：

| `componentRegionPattern` | 用法 |
| --- | --- |
| `A` | 单个主图、主表、主结论。 |
| `AB` | 左右两槽，常见为图 + 表、主指标 + 明细。 |
| `ABC` | 三等分槽位，适合 KPI 组或轻量分析组。 |
| `AAB|CCD` | A 占上方更宽区域，C/D 在下方分列。 |

## 5. 组件示例有哪些

组件示例 ID 必须来自 `src/widgets/templates/component-examples/config.ts`。

| 挂载 ID | 组件 | 视觉类型 | 主数据字段 | 适用场景 |
| --- | --- | --- | --- | --- |
| `component-example-catalog:kpi-metric-card` | `KpiMetricExampleCard` | `metric-card` | `value` | 单指标、核心 KPI、状态卡。 |
| `component-example-catalog:target-progress-card` | `TargetProgressExampleCard` | `metric-card` | `targetValue`, `currentValue` | 目标达成、进度、差距。 |
| `component-example-catalog:ranking-list-card` | `RankingListExampleCard` | `ranking-list` | `items` | 排名、TopN、门店/渠道榜单。 |
| `component-example-catalog:line-chart-card` | `LineChartExampleCard` | `line` | `categories`, `values` 或 `series` | 趋势、同比环比、周期变化。 |
| `component-example-catalog:heatmap-chart-card` | `HeatmapChartExampleCard` | `heatmap` | `rows`, `columns`, `cells` | 区域 x 品类、时段 x 指标热力。 |
| `component-example-catalog:bar-chart-card` | `BarChartExampleCard` | `bar` | `categories`, `values` 或 `series` | 分类对比、结构对比。 |
| `component-example-catalog:combo-chart-card` | `ComboChartExampleCard` | `combo` | `categories`, `series` | 柱线组合、量价/收入率组合。 |
| `component-example-catalog:proportion-chart-card` | `ProportionChartExampleCard` | `pie` | `items` | 占比、结构、渠道构成。 |
| `component-example-catalog:detail-table-card` | `DetailTableExampleCard` | `table` | `rows`, `columns` | 明细表、列表、台账。 |
| `component-example-catalog:complex-table-card` | `ComplexTableExampleCard` | `table` | `rows`, `columnTree` | 复杂表头、分组表头、宽表。 |
| `component-example-catalog:quadrant-chart-card` | `QuadrantChartExampleCard` | `scatter` | `points` | 增长 x 毛利、价值 x 风险象限。 |
| `component-example-catalog:radar-chart-card` | `RadarChartExampleCard` | `radar` | `indicators`, `values` 或 `series` | 多维能力、健康度、评分。 |
| `component-example-catalog:sunburst-chart-card` | `SunburstChartExampleCard` | `sunburst` | `nodes` | 层级结构、品类层级、组织层级。 |
| `component-example-catalog:rounded-funnel-chart-card` | `RoundedFunnelChartExampleCard` | `funnel` | `stages` | 转化漏斗、流程阶段。 |
| `component-example-catalog:action-list-card` | `ActionListExampleCard` | `action-recommendation-card` | `items` | 行动清单、责任人、截止时间。 |
| `component-example-catalog:conclusion-card` | `ConclusionExampleCard` | `text-summary` | `conclusion` 或 `items` | 经营结论、证据、建议。 |
| `component-example-catalog:custom-echart-component-template` | `CustomEChartComponentTemplate` | `other` | `items` | 现有示例无法表达时的自开发入口。 |

## 6. 组件数据怎么绑定

组件数据放在 `componentWidget(..., props)` 或槽位的 `slot.props/widgetProps/config`。

```ts
componentWidget('LineChartExampleCard', 'line', '收入趋势', {
  unit: '万元',
  categories: ['1月', '2月', '3月'],
  series: [
    { name: '收入', values: [3200, 3480, 3720], smooth: true },
  ],
  config: {
    title: { visible: false },
    chart: { legendVisible: true },
  },
});
```

运行时合并顺序：

```text
slot.widget.props
  -> slot.props
  -> slot.widgetProps
  -> props.config
  -> slot.config
```

后面的值覆盖前面的值。最稳妥的做法：

- 默认业务数据写在 `componentWidget(..., props)`。
- 页面实例局部覆盖写在 `slot.props` 或 `slot.widgetProps`。
- 配置段覆盖写在 `slot.config`，因为它最后生效。

组件最终收到：

```ts
{
  title,
  unit,
  ...businessProps,
  config: {
    title: {},
    layout: {},
    chart: {},
    tones: {},
  },
}
```

## 7. 各组件常用 props

| 组件 | 常用 props |
| --- | --- |
| `KpiMetricExampleCard` | `title`, `unit`, `value`, `valuePrefix`, `valueSuffix`, `maxDecimals`, `tone`, `accessoryMetrics`, `sparkType`, `sparkValues`, `config` |
| `TargetProgressExampleCard` | `title`, `unit`, `value`, `valueSuffix`, `targetValue`, `currentValue`, `gapValue`, `details`, `config` |
| `RankingListExampleCard` | `title`, `unit`, `items`, `valueUnit`, `config` |
| `LineChartExampleCard` | `title`, `unit`, `categories`, `values`, `series`, `config` |
| `BarChartExampleCard` | `title`, `unit`, `categories`, `values`, `series`, `config` |
| `ComboChartExampleCard` | `title`, `unit`, `categories`, `series`, `rateValues`, `config` |
| `ProportionChartExampleCard` | `title`, `unit`, `totalLabel`, `items`, `config` |
| `HeatmapChartExampleCard` | `title`, `unit`, `rows`, `columns`, `cells`, `auxMetrics`, `config` |
| `DetailTableExampleCard` | `title`, `unit`, `rowKey`, `rows`, `columns`, `auxMetrics`, `config` |
| `ComplexTableExampleCard` | `title`, `unit`, `rowKey`, `rows`, `columnTree`, `auxMetrics`, `config` |
| `QuadrantChartExampleCard` | `title`, `unit`, `points`, `auxMetrics`, `config` |
| `RadarChartExampleCard` | `title`, `unit`, `indicators`, `values`, `series`, `auxMetrics`, `config` |
| `SunburstChartExampleCard` | `title`, `unit`, `totalLabel`, `nodes`, `auxMetrics`, `config` |
| `RoundedFunnelChartExampleCard` | `title`, `unit`, `stages`, `auxMetrics`, `config` |
| `ActionListExampleCard` | `title`, `unit`, `items`, `config` |
| `ConclusionExampleCard` | `title`, `unit`, `conclusion`, `emphasis`, `statusLabel`, `statusTone`, `evidenceItems`, `actionItems`, `items`, `config` |
| `CustomEChartComponentTemplate` | `title`, `unit`, `items`, `auxMetrics`, `config` |

常用数据结构：

```ts
// chart series
{ name: '收入', values: [3200, 3480, 3720], color: '#3b82f6' }

// ranking/action/conclusion item
{ label: '华东大区', value: '1280万', tone: 'success' }

// table column
{ key: 'revenue', label: '收入', field: 'revenue', align: 'right', formatter: 'currency', unit: '万元' }

// table row
{ id: 'store-001', storeName: '上海一店', revenue: 1280, grossMargin: 0.218, status: '正常' }
```

## 8. `config` 每个 section 代表什么

`config` 是组件内部可配置化入口。schema 只允许组件声明过的 section。

| section | 作用 |
| --- | --- |
| `title` | 控制组件内部标题显隐、字号、单位显示等。不是分块标题。 |
| `layout` | 控制组件内部 padding、gap、比例、高度、密度等。 |
| `aux` | 控制组件内部辅助指标显示方式。 |
| `chart` | 控制 ECharts 图表参数，如 legend、grid、axis、label、tooltip、series 行为。 |
| `table` | 控制表格列宽、密度、排序、对齐、滚动等。 |
| `row` | 控制列表行高、最大行数、状态标签、间距。 |
| `value` | 控制 KPI 主数值字号、渐变、前后缀、精度。 |
| `spark` | 控制 KPI 小趋势图显隐、线/柱、颜色、点数。 |
| `accessory` | 控制 KPI 辅助指标区域。 |
| `progress` | 控制目标进度条、阈值、颜色。 |
| `detail` | 控制目标进度的明细项。 |
| `core` | 控制结论卡核心结论区。 |
| `list` | 控制结论卡证据/行动列表。 |
| `developer` | 自开发组件信息，如 `componentId`、`componentName`、`renderMode`。 |
| `tones` | 控制主题色、状态色和暗/明主题适配色。 |

示例：

```ts
config: {
  title: { visible: false },
  layout: { paddingPx: 8, gapPx: 6 },
  chart: {
    legendVisible: true,
    labelVisible: true,
    grid: { top: 18, right: 12, bottom: 20, left: 8 },
  },
  tones: {
    primary: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
}
```

注意：

- 不要在 `config` 中写未被组件读取的字段后假设它会生效。
- 如果需要新字段，必须同步修改对应 Vue 组件读取逻辑和类型说明。
- 图表 `grid.containLabel`、外置 label gutter、legend 高度要分开控制，避免重复预留空间。

## 9. 自开发组件怎么开发

先判断是否真的需要自开发：

- 只改标题、颜色、数据、单位、行数、列、图例、轴标签时，改现有示例 props/config。
- 图形语义、数据结构或交互方式现有示例无法覆盖时，才使用自开发。

优先使用内置入口：

```text
component-example-catalog:custom-echart-component-template
src/widgets/templates/component-examples/CustomEChartComponentTemplate.vue
```

新建独立组件时按 5 步：

1. 新建 `src/widgets/templates/component-examples/<YourExampleCard>.vue`。
2. 在 `component-examples/index.ts` 导出。
3. 在 `component-examples/config.ts` 增加 config 类型、`ComponentExampleConfigByWidgetType` 字段和 schema。
4. 在 `src/widgets/registry.ts` 注册组件。
5. 在 `business-report-pages.ts` 的 `slot(...)` 中绑定新 `componentExampleId`。

最小 schema：

```ts
export type ProjectStageBlockageExampleCardConfig =
  ComponentExampleConfig<'title' | 'layout' | 'aux' | 'chart' | 'developer' | 'tones'>;

schema(
  'ProjectStageBlockageExampleCard',
  'project-stage-blockage-card',
  '项目阶段阻塞图',
  'other',
  ['title', 'layout', 'aux', 'chart', 'developer', 'tones'],
  ['items'],
  {
    requiredConfigSections: ['layout', 'chart', 'developer'],
    selfDevelopedFallback: true,
  },
);
```

挂载 ID 为：

```text
component-example-catalog:project-stage-blockage-card
```

自开发 ECharts 要求：

- 必须创建真实 ECharts 实例。
- 根节点必须包含 `layout-slot-content-widget`。
- 根节点宽高使用 `100%`。
- 使用 `ResizeObserver` 或等价方式触发 `chart.resize()`。
- `onBeforeUnmount` 时 dispose。
- 数据和主题色通过 props/config 传入，不能写死。
- 暗色模板不要写死浅色背景。

## 10. 发版前检查

每个受影响模板目录都跑：

```bash
npm run validate:dashboard
npm run build:test
```

Required delivery artifacts:

- `DELIVERY_INDEX.md`: project version memory ledger. Read or initialize it before modifications; append the current change after modifications with changed files, impacted pages/blocks/slots/components, data/API/filter/conclusion impact, validation, data-summary status, and next-change notes.
- `docs/prototype-data-summary.md`: backend-facing data structure handoff. Keep it current with `dashboard.config.ts`, `business-report-pages.ts`, `dashboard.dataset.json`, `dataSources/registry.ts`, component bindings, filters, and interactions.

检查项：

- `layoutRows` 每个字母都有对应分块配置。
- 每个分块都有 `title`、`note`、`componentRegionPattern`、`slots`。
- 每个槽位的 `componentExampleId` 存在于 `component-examples/config.ts`。
- 每个组件类型存在于 `component-examples/index.ts` 和 `widgets/registry.ts`。
- 页面 DOM 中有 `.layout-slot-content-widget`。
- 说明区来自 `bodySummary`，不是塞进组件 props。
- 胶囊按钮来自 `titlePills`，不是塞进组件 props。
- 组件内业务数据来自 `props`，组件样式来自 `props.config` 或 `slot.config`。
- 没有使用固定尺寸分块模板、组件内容区模板、未注册 Vue 文件、静态截图或假图。
