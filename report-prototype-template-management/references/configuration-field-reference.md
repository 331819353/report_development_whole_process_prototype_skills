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
          chart: { legendVisible: 'auto', smooth: true },
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
| `titlePills` | `WidgetTitlePillOption[]` | 标题右侧胶囊按钮，支持分块级局部切换。 | 改数组的 `id/label/hidden/disabled`；需要驱动数据/展示时配置 `filters/params/props/dataBinding/actions`。 |
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

组件内部短标题的文本来自 `slot` 的第二个参数或 `componentWidget` 的第三个参数；显隐由模板按槽位数量自动决定，不由项目配置手工决定：

```ts
slot('A', '收入趋势', 'line-chart-card', componentWidget('LineChartExampleCard', 'line', '收入趋势', props));
```

规则：

- 单槽位必须隐藏组件内部短标题，使用分块标题作为主标题。
- 多槽位必须展示每个组件内部短标题，用于区分 A/B/C 槽；不存在多槽位隐藏短标题的例外。
- 不要在项目配置里手工设置 `config.title.visible` 来解决排版问题；模板运行时会根据 `slotCount` 自动覆盖标题显隐。
- 单槽位隐藏组件内部短标题时，组件必须释放标题行高度；不能只 `v-if` 隐藏标题但保留 grid/flex 标题行，也不能让主体内容自动落入隐藏标题行。DOM 校验证据里，组件主体高度应接近槽位可用高度，而不是约 `20px`。
- 不要把分块标题写进组件 `props.title` 后又在分块 `title` 里重复一遍。

### 胶囊按钮怎么改

胶囊按钮配置在分块的 `titlePills`：

```ts
titlePills: [
  {
    id: 'revenue',
    label: '收入',
    params: { metric: 'revenue' },
    filters: { metric: 'revenue' },
    props: { unit: '万元', contentAreaTitle: '收入趋势' },
  },
  {
    id: 'profit',
    label: '利润',
    params: { metric: 'profit' },
    filters: { metric: 'profit' },
    props: { unit: '万元', contentAreaTitle: '利润趋势' },
  },
  { id: 'risk', label: '风险', params: { metric: 'risk' }, hidden: false },
  { id: 'forecast', label: '预测', disabled: true },
],
```

| 字段 | 含义 |
| --- | --- |
| `id` | 稳定 ID，用于记录当前激活项。必须非空。 |
| `label` | 按钮显示文本。必须非空。 |
| `hidden` | 为 `true` 时不渲染，也不占位。 |
| `disabled` | 为 `true` 时渲染但不可点击。 |
| `value` | 当前胶囊的语义值，可通过 `$context.activeTitlePill.value` 读取。 |
| `filters` | 合并到当前 block/slot 的运行时 `context.filters`，适合声明 `metric`、`mode`、`scenario` 等局部筛选值。 |
| `params` | 合并到 block/slot 数据源请求参数，且同名字段覆盖 `widget.data.params` 的默认值。 |
| `props` | 合并到组件示例 props，适合切换单位、标题、阈值、展示模式等轻量展示配置。 |
| `dataBinding` | 覆盖当前激活态下的行到 props 映射，适合同一组件在不同胶囊下读取不同字段。 |
| `actions` | 可选动作映射，支持 `titlePillChange` / `change` / `click`，走同一套 shell 默认交互或 `customActionRegistry`。 |

注意：

- 胶囊按钮属于 `1-2 pillArea`，仍然是分块支持区配置，不要塞进 `componentSlots[]`。
- 模板会维护激活态，并把当前项写入 `$context.activeTitlePillId`、`$context.activeTitlePillLabel`、`$context.activeTitlePill`。
- 配置了 `filters/params/props/dataBinding` 后，胶囊切换会触发该 block 及其 slot 数据重载和 props 重算。
- 数据源参数可以直接依赖胶囊：`params: { metric: '$context.activeTitlePill.params.metric' }`；也可以让胶囊 `params.metric` 覆盖数据源默认 `metric`。
- 一个分块可见胶囊建议不超过 6 个，超过会触发密度风险。

### 说明区怎么改

说明区配置在 `bodySummary`。默认展示：如果没有单独写 `bodySummary`，模板应使用分块 `note` 作为说明区内容。内置例外：如果分块包含 `ConclusionExampleCard`，外层 `4 summaryArea` 默认隐藏，因为结论、证据、行动和补充说明由结论卡内部承载；不要删除结论卡内部的补充说明/证据/行动区。其他场景只有用户明确说不展示说明/注释时，才允许 `showSummary: false`，并必须写 `summaryHiddenReason`：

```ts
bodySummary: '统计范围：直营门店；收入以财务确认口径为准；异常门店按毛利率低于 15% 识别。',
// 仅当用户明确要求不展示说明区时：
showSummary: false,
summaryHiddenReason: '用户明确要求该分块不展示说明区。',
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

配置边界：

- 只配置槽位显示哪个注册组件示例、绑定什么数据/API/筛选/交互、业务标题文本和说明文本。
- 不通过项目配置手工调整槽位高度、标题高度、说明区高度、字号比例、行比例、padding 或 overflow 来解决适配问题。
- 如果组件在槽位内放不下，应更换注册组件示例，或修复该注册组件示例的 auto-fit 行为。

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
    chart: { legendVisible: 'auto' },
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

### 组件与筛选项怎么通过配置绑定

绑定链路固定为：

```text
filters[]
  -> widget.data / componentSlot.data
  -> filterScope
  -> dataBinding
  -> registered component props
```

配置职责：

| 字段 | 放置位置 | 作用 |
| --- | --- | --- |
| `filters[]` | `dashboard.config.ts` | 壳层全局/页面筛选；只负责筛选 UI、默认值、选项来源。 |
| `data` | block widget 或 `componentSlots[].data` | 声明数据源、接口、参数、必填筛选、忽略筛选。 |
| `filterScope` | block widget 或 `componentSlots[]` | 声明当前组件接收哪些 `filters[].scope` 作用域；未配时只接收全局筛选。 |
| `dataBinding` | block widget 或 `componentSlots[]` | 把数据源返回的 rows 转成组件示例需要的 props。 |
| `props/config` | `componentWidget(...)`、`slot.props`、`slot.config` | 静态展示配置和组件私有样式配置。 |

`dataBinding.mode` 支持：

| mode | 输出 props | 适用组件 |
| --- | --- | --- |
| `rows` | `rows` 或 `rowsProp` 指定字段 | 表格、明细、原始列表。 |
| `first-row` | `firstRowProps` 映射出的字段 | KPI、目标进度、单对象卡片。 |
| `category-series` | `categories` + `series` | 折线、柱状、组合图。 |
| `items` | `items` | 排名、占比、行动清单、结论列表。 |
| `custom-props` | `propExpressions` 映射字段，或通过 `propsObjectField` 直接读取一整个 props 对象 | 自开发组件、特殊组件示例、`/api/component-props/:componentKey` 返回的组件 props。 |

示例：

```ts
const revenueTrendWidget = {
  ...componentWidget('LineChartExampleCard', 'line', '收入趋势'),
  data: {
    id: 'apiData',
    api: {
      url: `/api/component-props/${encodeURIComponent('LineChartExampleCard:收入趋势')}`,
      method: 'GET',
      query: {
        period: '$filters.period',
        region: '$filters.region',
        metric: '$context.activeTitlePill.params.metric',
      },
      responsePath: 'data.rows',
      adapter: 'rows',
      emptyFilterValues: ['', '__all', 'all'],
    },
  },
  filterScope: ['revenue'],
  dataBinding: {
    mode: 'custom-props',
    propsObjectField: 'props',
  },
};

slot(
  'A',
  '收入趋势',
  'line-chart-card',
  revenueTrendWidget,
  1,
  'primary',
);
```

注意：

- `componentSlots[]` 只放组件区槽位，不放标题、胶囊按钮、单位、说明或筛选 UI。
- `filterScope` 匹配的是 `filters[].scope`，不是 `filters[].id`；未配置 `scope` 的筛选项是全局筛选，仍会进入所有组件。
- 数据接口必填字段用 `data.requiredFilters` 声明，例如 `requiredFilters: ['regionId']`。
- 若槽位配置了 `data`，运行时会按 `blockId + slotId` 单独缓存数据，并把 `slotData`、`slotContext` 传给对应组件示例。
- 组件示例不再需要自己知道模板筛选面板在哪里；它只接收已经按 `filterScope` 计算好的 `context.filters` 和绑定后的 props。

弱模型固定步骤：

1. 先写 `filters[]`，确认每个筛选项的 `id`、`label`、`defaultValue`、`source`；需要局部影响时再写 `scope`。mock API 模式不要保留静态 `options` 作为保底。
2. 在目标组件槽位的 `widget` 上写 `data`；接口参数、`requiredFilters`、`ignoredFilters` 都在这里，不写进组件 props。
3. 在同一个槽位写 `filterScope`，只填 `filters[].scope` 的值；未设置 scope 的全局筛选不需要重复填。
4. 按组件示例需要写 `dataBinding`，确认输出 props 和组件 props 表一致。
5. 写 `actions` 时先使用壳层默认行为；只有默认行为表达不了时才注册 `src/actions/registry.ts` handler。
6. 在 `template-build-packet.md` 或等价施工包中同步 `filterSurfaceMap`、`componentExampleConfigMap`、`interactionBehaviorMap`，否则不要开始改代码。

### 轻量 API 数据怎么配置

模板内置 `npm run mock:api` 和 `npm run dev:mock`，用于把 `src/data/dashboard.dataset.json` 以接口形式提供给筛选项和组件槽位。mock API 模式下，筛选项选项、组件 rows、图表序列、KPI 值、组件示例 props 都必须来自接口，不保留静态运行时保底数据。真实 API 替换时，优先保持 `id: 'apiData'` 或 `id: 'httpData'`，只调整 `api.url`、`api.responsePath` 和必要的 `adapter`。`docs/prototype-data-summary.md` 必须用 Metric To Interface And Source Mapping 说明指标名称/接口字段/来源表字段的匹配关系，并用 Mock API To HTTP API Replacement Matrix 说明每个筛选、说明区变量、图表/组件、交互和导出从 mock endpoint 替换到真实 HTTP API 的方式。

筛选项使用 `data.items`：

```ts
{
  id: 'region',
  label: '组织区域',
  defaultValue: 'all',
  source: {
    id: 'apiData',
    api: {
      url: '/api/filter-options/region',
      method: 'GET',
      responsePath: 'data.items',
    },
    labelField: 'label',
    valueField: 'id',
    emptyFilterValues: ['', '__all', 'all'],
  },
}
```

组件示例槽位默认使用 `data.rows[0].props`：

```ts
{
  data: {
    id: 'apiData',
    api: {
      url: `/api/component-props/${encodeURIComponent('DetailTableExampleCard:收入明细')}`,
      method: 'GET',
      query: {
        period: '$filters.period',
        region: '$filters.region',
        project: '$filters.project',
        channel: '$filters.channel',
      },
      responsePath: 'data.rows',
      adapter: 'rows',
      emptyFilterValues: ['', '__all', 'all'],
    },
  },
  dataBinding: {
    mode: 'custom-props',
    propsObjectField: 'props',
  },
}
```

### 页面交互怎么通过配置绑定

组件抛出 `dashboard-action` 后，壳层按以下顺序处理：

```text
component event
  -> componentSlots[].actions 或 block widget.actions
  -> customActionRegistry[action.type/event.name/dashboardAction]
  -> shell built-in action
```

内置 action 支持：

| targetType / interactionType | 默认行为 |
| --- | --- |
| `route` / `jump` | 目标命中当前模板导航时切换 nav/page；否则写入 `location.hash`。 |
| `external` | 新窗口打开外部链接。 |
| `drawer` / `drilldown` | 打开模板默认抽屉，并展示 event、block、slot、target、query、params。 |
| `modal` | 打开模板默认弹窗。 |
| `popover` / `popup` | 使用默认弹窗容器承载轻量弹出信息。 |
| `cross-filter` / `crossFilter` | 将 `params/query` 中命中的筛选字段写回 `filters[]`。 |
| `fullscreen` | 进入或退出全屏。 |
| `export` / `exportCurrentBlock` | 触发当前模板导出/打印入口。 |

示例：

```ts
actions: {
  chartClick: {
    type: 'dashboardAction',
    interactionId: 'revenue-region-drilldown',
    interactionType: 'drilldown',
    triggerOwner: 'componentOwnedEvent',
    targetType: 'drawer',
    target: 'revenue-detail',
    query: {
      period: '$event.period',
      regionId: '$filters.regionId',
    },
    contextInheritance: ['filters', 'navId', 'blockId', 'sourceSlotId'],
    meta: { title: '收入明细下钻' },
  },
  legendClick: {
    type: 'dashboardAction',
    interactionType: 'crossFilter',
    targetType: 'cross-filter',
    params: {
      regionId: '$event.regionId',
    },
  },
}
```

需要更复杂的业务弹窗、权限判断、埋点或多接口联动时，在 `src/actions/registry.ts` 注册 `action.type` 或 `event.name` 对应 handler；同名 handler 会覆盖壳层默认行为。

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

`auxMetrics` is a component-owned auxiliary metric strip used by several chart/table examples. It belongs to the registered component example props/config. The parent block has no separate auxiliary metric slot; do not model component auxiliary information as a block slot.

For chart-like examples that expose component-owned `auxMetrics`, the registered component example owns both the configuration and fit behavior. `config.layout.orientation` controls how the aux strip and chart body sit together. `config.aux.orientation` controls the metric-item layout inside the aux strip: `horizontal`, `vertical`, or `auto`. Explicit `config.aux.orientation` wins; only `auto` may adapt to available space. Do not hide `auxMetrics`, remove the component title, or tune parent block height/summary height to fix this; update the registered component example's auto-fit contract instead.

Default auxiliary layout:
- Component-owned `auxMetrics` sits between the component title strip and the chart/table/list body.
- Horizontal component layout uses a horizontal auxiliary strip; each metric shows key/value stacked vertically.
- Vertical component layout uses a vertical auxiliary strip; each metric shows key/value on one line.
- Parent block config must not create separate `auxMetricArea` or `unitArea` fields to simulate this behavior.

常用数据结构：

```ts
// chart series
{ name: '收入', values: [3200, 3480, 3720], color: '#3b82f6' }

// ranking/action/conclusion item
{ label: '华东大区', value: '1280万', tone: 'success' }

// ranking item with backend-friendly dimension name
{ name: '华东', value: 3860, delta: '+14.8%' }

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

Chart legend defaults:
- Line, bar, scatter, quadrant, combo, and other Cartesian/axis chart examples default `legendVisible` to `'auto'`: multi-series legends are top-centered when data exists and space permits; single-series or single-metric legends are hidden by default.
- Proportion, pie/donut/rose, and sunburst chart examples default to a visible right-side category/hierarchy legend.
- Radar chart examples default to right-side legends for multi-series comparison and hide single-series legends by default.
- Use explicit `legendVisible: true` only when a single-series legend is a documented interaction or multi-encoding exception; use `legendVisible: false` / `legendPosition: 'hidden'` for compact or hidden-legend fallbacks.

KPI/core-value fit rule:

- `title.visible` is owned by the slot runtime strategy, not by per-page manual config. Single-slot blocks hide component short titles; multi-slot blocks show them.
- Component-internal `auxMetrics` is owned by the registered example. It remains valid as component props/config and must not be moved to the parent block. For chart-like examples, set `config.aux.orientation` when the metric items must be forced horizontal or vertical.
- `ConclusionExampleCard` core conclusion content is vertically centered inside its core area. The title/eyebrow row and supplemental/evidence/action rows keep their own top/bottom alignment and are not included in the core-centering calculation.
- When the component title is hidden in a single-slot block, the selected component example must release the internal title-row height through its auto-fit implementation.
- For compact KPI/target-progress slots, the registered component example must auto-fit value size, accessory rows, spark/reflection, and overflow behavior based on actual slot width/height. Do not solve clipping by hand-tuning per-page `value.maxFontSizePx`, `value.heightScale`, `layout.valueRatio`, `layout.accessoryRatio`, padding, or overflow.
- A `VIS-TEXT-CLIPPED` or `VIS-CONTENT-OVERFLOW` finding inside `.layout-slot-content-widget`, `.kpi-example-card`, `.target-progress-example-card`, `.metric`, `.score`, `.value`, or `.card-value` is a configuration failure even if the generic visual audit marks it as `minor`.
- Do not treat aligned outer cards as proof of readiness. The main value text, suffix/unit, accessory row, and optional title strip must each fit inside their own visible boxes in the screenshot and DOM rectangles.

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
- 列表/排行类组件必须清楚说明显示名字段。`label` 是推荐字段；当后端自然返回 `name`、`regionName`、`region`、`areaName` 或 `dimension` 时，组件示例或 adapter 必须归一化，不能只渲染数值而丢失名称。
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

- `DELIVERY_INDEX.md`: project version memory ledger for copied/configured user projects. Read or initialize it before modifications; append the current change after modifications with changed files, impacted pages/blocks/slots/components, data/API/filter/conclusion impact, validation, data-summary status, and next-change notes. For reusable bundled templates, keep this file at `template-initialized` baseline so users start with a clean project history.
- `docs/prototype-data-summary.md`: backend-facing data structure handoff. Keep it current with `dashboard.config.ts`, `business-report-pages.ts`, `dashboard.dataset.json`, `dataSources/registry.ts`, component bindings, filters, interactions, Metric To Interface And Source Mapping, and the Mock API To HTTP API Replacement Matrix.

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
