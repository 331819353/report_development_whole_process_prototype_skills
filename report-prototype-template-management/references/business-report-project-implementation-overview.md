# 经营分析项目实现介绍

本文只说明当前三套模板中的经营分析示例如何组织，不重复字段配置。字段级配置、组件示例、标题/胶囊按钮/说明区和数据绑定规则，以 `configuration-field-reference.md` 为准。

## 当前示例目标

三套模板共享同一套经营分析配置，分别挂载到：

| 本地端口 | 模板 | 形态 |
| --- | --- | --- |
| `5173` | `frozen-title-sci-fi-cockpit-template` | 固定标题暗色驾驶舱 |
| `5177` | `topbar-light-scroll-dashboard-template` | 顶部导航浅色滚动报告 |
| `5178` | `left-nav-analytics-workbench-template` | 左侧导航浅色工作台 |

差异只应在框架壳、主题、导航、背景和控制区；业务页、分块配置、槽位和组件示例挂载方式保持一致。

## 核心文件

| 文件 | 职责 |
| --- | --- |
| `src/config/dashboard.config.ts` | 框架标题、主题、导航、筛选器、页面挂载。 |
| `src/report-template-assets/business-report-pages.ts` | 经营分析页面、布局、分块、槽位、组件示例配置。 |
| `src/widgets/templates/block-spans/BaseLayoutSpan.vue` | 唯一分块配置运行时。 |
| `src/widgets/templates/block-spans/types.ts` | 分块和槽位类型。 |
| `src/widgets/templates/component-examples/` | 已注册组件示例。 |
| `src/widgets/registry.ts` | 组件类型到 Vue 组件的注册表。 |
| `src/styles/index.scss` | 框架、网格、槽位容器和主题适配。 |

## 页面结构

当前经营分析示例包含：

| 页面 ID | 页面名 | 业务重点 |
| --- | --- | --- |
| `overview` | 经营总览 | 核心指标、目标进度、结论、趋势、结构、行动、明细。 |
| `revenue` | 收入结构 | 收入拆解、目标缺口、渠道趋势、品类、热力、行动、明细。 |
| `profit` | 利润成本 | 利润指标、目标、结论、成本结构、费用热力、象限、复杂表。 |
| `risk` | 风险行动 | 风险概览、风险结论、自开发图表、风险热力、漏斗、行动、明细。 |

## 三套模板挂载方式

固定标题和左侧导航模板通过 `projectReportNav` 挂载。顶部导航模板通过 `projectReportPages`、`projectReportTopbarNav` 和 `defaultProjectReportPage` 挂载。

维护时必须同步三套模板中的：

- `business-report-pages.ts`
- `BaseLayoutSpan.vue`
- `block-spans/types.ts`
- `component-examples/`
- `registry.ts`
- 相关主题样式

## 当前示例的边界

- 它是可运行示例，不是字段说明书。
- 它可以作为三套模板一致性验证样本。
- 新项目应先读 `configurable-zero-to-one-flow.md` 和 `configuration-field-reference.md`，不要从本示例复制一整套业务内容。
- 接真实数据时，先把静态 props 梳理成字段表，再映射到数据源或 API，不要把 API 原始形状直接泄露到组件示例内部。

## 验证

每个受影响模板目录运行：

```bash
npm run validate:dashboard
npm run build:test
```

浏览器检查：

- 三套模板都能打开。
- 页面/导航能切换。
- 每个可见槽位都有组件。
- 图表、表格、列表没有被压扁。
- 页面能滚动到底部。
- 暗色模板没有浅色底块突兀问题。
