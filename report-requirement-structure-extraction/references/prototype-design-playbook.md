# Prototype Design Playbook

Use when the requirement is for 原型, 报表, 看板, 可视化页面, 数据大屏, 页面设计, screenshot restoration, or implementation-ready UI spec.

## Extract

- 分析主题: what the page/report is about and which business situation it observes.
- 目标用户群体: user roles, decision level, usage frequency, meeting/workflow context.
- 主题拆解: each theme and the real business question it must answer.
- 问题-内容 mapping: for every business question, list the content blocks needed to answer it.
- 内容-指标 mapping: for every content block, list core metrics, supporting metrics, formulas, baselines, units, directions, and refresh cadence.
- 内容-维度 mapping: time, organization, product, customer, channel, project, owner, status, source system, version, and drill hierarchy.
- 筛选与权限: high-frequency filters, advanced filters, default values, cascades, permission-scoped options.
- 交互入口: drilldown, cross-filtering, drawer, modal, jump, export, refresh, fullscreen, source trace.
- 数据策略: mock data or real API needs, row grain, formula dependencies, empty states, validation data.
- 视觉与组件策略: page shell, navigation, block priority, chart/table/card choices, responsive/overflow risks.
- 来源材料需求化: for every provided HTML, Markdown/MD, screenshot, source snippet, document, code file, data file, or config file, extract requirement evidence into facts, assumptions, gaps, component/data/filter/interaction constraints, and acceptance checks.
- 交付形态决策: default prototype output is `vueTemplatePrototype` with `implementationMode: copyTemplateProject`; copy the selected bundled template project and preserve Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios. Choose `htmlPrototype` only when the user explicitly asks for HTML/static/single-file HTML output or exact static HTML preservation, and choose `newVue3Project` only for a documented self-developed/non-template exception.
- 既有设计思路: when a requirement document already includes layout, component, chart, or story ideas, extract them as proposals, then check whether they match the product/report story, user path, information hierarchy, `1920x1080` viewport, `12 * N` grid, default `3*2` blocks, chart `4*3` max, and visible-content density before accepting them.
- 指标补充材料: metric口径, metric dictionaries, and 指标清单 normally support the metric/data contract, tooltip/detail/dictionary payloads, validation, and handoff. They do not become visible page modules unless the document explicitly asks to show them.

## Report Category Hints

Use these categories when the prototype is a report/dashboard:

- 状态总览: current health, target, risk, priority.
- 分析诊断: why a metric changed or deviated.
- 明细查询: find, filter, inspect, export, trace records.
- 绩效评估: evaluate objects, scoring, ranking, fairness.
- 汇报复盘: period result, changes, reasons, risks, actions.
- 异常监控: alerts, severity, affected objects, owner, SLA.
- 运营执行: tasks, owners, progress, evidence, closure.
- 核对追溯: data correctness, source, differences, lineage.

## Required Handoff

Output enough detail for downstream prototype work:

- Page or view list.
- Source-material requirement matrix and output artifact decision.
- Content block list and why each block exists.
- Component/data/filter/interaction binding plan.
- Mock data or real API dependency plan.
- Existing-design review result: accepted, repaired, or rejected design ideas and the reason.
- Metric display boundary: which metrics are visible analytical content, and which metric口径/indicator-list items stay in tooltip/detail/dictionary/handoff only.
- Filter defaults and permission scope.
- Empty/loading/error/no-permission states.
- Layout risks such as dense tables, long labels, scroll, overflow, or drilldown complexity.
