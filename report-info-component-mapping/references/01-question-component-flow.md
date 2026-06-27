# 01 Question Component Flow

Use this reference when deciding how a business question becomes answer atoms, content blocks, and real components.

Before this step, classify the request with `00-analysis-perspective-card-taxonomy.md` when the user uses viewing intents such as 看现状, 看目标, 看趋势, 看排名, 看原因, 看行动, 看质量, or 看明细. The perspective is the stable routing layer; answer atoms and component bundles are the implementation layer.

Also apply `$report-prototype-design-thinking` `references/02-good-report-decision-path.md` when the input is a broad report topic, a metric list, or a requirement document with proposed charts/components. A good mapping starts from one primary decision question and then creates the shortest answer path.

## Good Report Mapping Path

Default mapping chain:

```text
primary decision question
  -> conclusion / status judgment
  -> comparison baseline
  -> driver / cause / dimension split
  -> exact detail / source evidence
  -> action / owner / next step
```

Use this chain to decide block priority:

| Report layer | Must answer | Component implications |
| --- | --- | --- |
| Conclusion layer | What should the user judge now? | conclusion strip, KPI judgment, target/actual, anomaly/status |
| Evidence layer | What proves the judgment? | trend, comparison, target line, ranking, structure |
| Cause layer | Why did it happen or where is the issue? | decomposition, driver split, funnel/process, contribution, dimension drill |
| Detail layer | Which records or objects prove it? | Detail Table, drawer, source link, export |
| Action layer | What should happen next? | action recommendation, task/owner/status, jump, operation route |

If a proposed component cannot be assigned to one of these layers, mark it as supplemental, detail-only, or remove it.

## Conclusion Chain Mapping

Before selecting blocks or component families, map the report as:

```text
overallConclusion
  -> supportingSection
       -> sectionConclusion
       -> evidenceComponent
```

Use this chain to prevent flat dashboards:

| Chain layer | Mapping requirement | Common component role |
| --- | --- | --- |
| `overallConclusion` | One total judgment for the current scope/period and the primary decision question | executive summary, conclusion strip, primary judgment KPI, status summary |
| `supportingSection` | One reason, driver, risk, trust, detail, or action area that explains the total judgment | parent block or composite panel topic |
| `sectionConclusion` | The partial judgment that the section proves, weakens, contradicts, or leaves unresolved | section summary, insight sentence, chart annotation, KPI subtitle |
| `evidenceComponent` | The chart/card/table/list/action that explains the section conclusion | KPI, trend, decomposition, ranking, table, action, trust card |

Each component mapping should carry:

```text
conclusionChain: {
  overallConclusionId,
  supportingSectionId,
  sectionConclusionId,
  role,
  evidenceVerb
}
```

Valid `role` values describe the component's job in the chain: `overall-conclusion`, `section-conclusion`, `evidence`, `cause`, `detail`, `action`, `trust`, or `context`.

Valid `evidenceVerb` values describe how the component supports the section conclusion: `proves`, `explains`, `locates`, `quantifies`, `contradicts`, `traces`, `recommends`, or `verifies`.

Components that cannot name a `supportingSectionId` and `sectionConclusionId` are not primary report components. Move them to a detail route, tooltip, dictionary, export, appendix/handoff, or remove them.

## Result Content Boundary

Map the business answer, not the design process. Before creating blocks, classify every candidate item:

| Candidate role | Where it belongs |
| --- | --- |
| Conclusion, insight, recommendation, risk/status note with evidence and action/trust value | Visible result content |
| Tooltip, drawer, row action, breadcrumb, chart click, drilldown param, jump, export, validation case | Interaction or implementation contract |
| Metric dictionary, 指标清单, 口径/calculation notes, raw field catalogue | Tooltip/detail/dictionary/export metadata/validation/handoff unless explicit visible documentation is requested |
| 下钻链路清单, analysis-path checklist, component mapping, binding matrix, workflow/gate checklist, pattern-card inventory, implementation note | Internal process artifact; do not map to a visible report block by default |

A candidate becomes visible only when it helps the reader make a business judgment, understand evidence/reason, verify source/trust, or take action. Otherwise it stays in the binding matrix, contract, tooltip/detail/dictionary, appendix/handoff, QA evidence, or is removed.

## Answer Atom Decision Tree

| If the user asks... | Required answer atom | Typical component bundle |
| --- | --- | --- |
| 现在好不好、严不严重、是否达标、健康吗、评分如何 | status judgment | KPI judgment card with `kpiJudgmentCardPattern`, KPI card, status badge, target card, bullet/progress chart |
| 比目标差多少、比上期变化多少 | target/variance | KPI goal execution card with `kpiGoalExecutionCardPattern`, KPI + variance bar, bullet chart, comparison table |
| 趋势是否恶化或改善、波动是否异常、未来可能怎样 | trend | KPI time-series card with `kpiTimeSeriesCardPattern`, line/area chart, sparkline card, forecast/annotation marker |
| 谁更高/更低、分组差异多大、比竞品/标杆处于什么位置 | comparison/variance | KPI comparison analysis card with `kpiComparisonAnalysisCardPattern`, grouped bar, radar/profile card, benchmark ruler, variance table |
| 问题集中在哪里 | structure/location | bar chart, heatmap, matrix, map only for geographic meaning |
| 谁最好/最差/最需要关注 | ranking | ranking/leaderboard/Top N card with `rankingCardPattern`, ranking table, horizontal bar, Top/Bottom switch |
| 流程哪一步损失最大 | process/conversion | funnel chart, stage bar, process step table |
| 为什么变化、谁贡献最大 | cause/driver | waterfall, contribution bar, decomposition tree, driver table |
| 哪些明细对象支撑结论 | detail/evidence | Detail Table with row grain, primary key, prioritized columns, row drawer, source link, export |
| 是否异常、谁处理、是否超时 | anomaly/action | alert card, severity list, SLA table, handling drawer |
| 后续谁做什么、做到哪一步 | execution | KPI goal execution progress/milestone card with `kpiGoalExecutionCardPattern`, task table, task card, Kanban, Gantt, progress stepper |
| 数据是否可信、两边为何不一致、质量是否可用 | data trust | data-quality trust card with `dataQualityTrustCardPattern`, diff table, source comparison, lineage graph, audit log |
| 要给管理层讲清楚 | narrative | text-summary, conclusion strip, chapter block, action plan table |
| 发生了什么、为什么、影响多大、下一步怎么办、口径是否可信 | analysis insight | Analysis & Insight component with `analysisInsightContract`: conclusion, evidence, affected object, action/trust, state |

## Information To Component Mapping

| Information type | Recommended block | Recommended components |
| --- | --- | --- |
| 报表主题 / 标题 | Page header | Title, subtitle, business scope, period, status badge |
| 核心问题 | Executive summary | Question statement, conclusion card, decision prompt, `visualType: 'text-summary'` |
| 时间 / 组织 / 范围 | Filter block / header meta | Date picker, org selector, scope selector, active filter chips |
| 核心结论 | Executive summary | Text summary card, key finding list, conclusion strip, conclusion/evidence/action card with `conclusionCardPattern` and `conclusionEvidenceBodyMode` |
| 洞察 / 诊断 / 建议 / 明确要求页面展示口径说明 | Analysis insight block | Conclusion card, insight card, anomaly/risk card, attribution card, recommendation card, data-quality card, explicit definition/help card with `definitionHelpCardPattern`, chart annotation |
| 核心 KPI / 业务总览 | KPI block | KPI overview card when `2-5` peer metrics answer one domain topic; KPI judgment card when the main question is status/health/rating/gauge judgment; KPI goal execution card when the main question is target attainment/gap/progress/milestone execution; otherwise KPI card, metric card, sparkline card |
| 实际 vs 目标 / 预算 | Target/variance block | KPI goal execution card with `kpiGoalExecutionCardPattern`, bullet chart, progress bar, target card, comparison card |
| 差异额 / 差异率 | Target/variance block | Gap KPI goal execution card, variance bar, comparison bar, waterfall only when attribution is additive |
| 对比 / 分组对比 / 竞品对比 / 标杆 / 差异诊断 | Comparison block | KPI comparison analysis card with `kpiComparisonAnalysisCardPattern`, grouped bar, multi-series trend, radar, benchmark ruler, comparison table |
| 同比 / 环比 / 趋势 / 波动 / 预测 / 周期 | Trend block | KPI time-series card when the question is card-level trend/change/YoY-MoM/cycle/volatility/forecast; otherwise line chart, area chart, small multiple, sparkline |
| 日历 / 排期 / 时段分布 / 时间热力 / 峰谷 / 时间规律 | Time pattern block | Time pattern card with `timePatternCardPattern`, calendar grid, schedule lane, time-slot line/bar, time-band share, weekday-hour heatmap, cumulative curve, period overlay comparison, peak-valley diagnostic, forecast warning |
| 规模 + 效率 / 达成 | Trend or target/variance block | Combo chart only when amount/count and rate/trend/target share one ordered category/time axis |
| 区域 / 组织 / 产品结构 | Structure block | Bar chart, heatmap, matrix table, treemap for hierarchical non-negative value share, sunburst for hierarchy path/share, map only for geography |
| 排名 / Top Bottom | Ranking block | Ranking/leaderboard/Top N card with `rankingCardPattern`, Pareto card with `paretoCardPattern` when additive contribution is the question, horizontal bar chart, ranking table, Top/Bottom switch |
| 评分 / 分层 / 等级 | Evaluation block | KPI judgment card for bounded score/rating, scorecard, tier distribution, heat matrix, benchmark chart |
| 多指标对象画像 / 异常识别 | Evaluation or anomaly block | Parallel coordinates when `3+` metrics share objects, plus detail table fallback |
| 原因 / 驱动因素 | Decomposition block | Waterfall, decomposition tree, driver tree, contribution bar |
| 流程 / 转化 / 漏斗 | Process block | Funnel chart, stage bar, process step chart, stage table |
| 来源去向 / 流量分配 / 多阶段流转 | Flow block | Sankey diagram when source-target-value links exist, plus detail table fallback |
| 明细记录 | Detail block | Detail Table, row drawer, export action; S2 only for pivot/cross/wide analytical grids |
| 异常 / 风险 / 预警 | Alert block | Alert card, severity badge, warning list, SLA table |
| 任务 / 整改 / 跟进 | Task/action block | Task card, task table, Kanban, Gantt, progress stepper |
| 证据 / 附件 / 来源 | Evidence block | Evidence drawer, source list, attachment list, linked records |
| 明确要求展示口径 / 公式 / 规则 / 指标什么意思 / 怎么算 | Definition help block | Definition/help card with `analysisPerspective: definitionHelp`, `definitionHelpCardPattern`, `definitionHelpEvidenceBinding`, help icon, popover, rule drawer, formula note |
| 数据质量 / 数据差异 / 可信度 | Data trust block | Data-quality trust card with `analysisPerspective: dataQualityTrust`, `dataQualityTrustCardPattern`, and `dataQualityEvidenceBinding`; side-by-side comparison table, diff table, lineage graph, log table |
| 导出 / 下载 / 刷新 / 全屏 | Header actions or toolbar | Icon buttons with tooltips, menu actions |

## Cognitive Task Mapping

- Judge current status: KPI judgment card with status/score/threshold/range semantics, KPI card, health badge, target card, bullet chart.
- Compare values: KPI comparison analysis card with `kpiComparisonAnalysisCardPattern` for compact direct/group/competitor/benchmark/variance comparison; otherwise comparison bar, grouped bar, bullet chart, side-by-side table.
- Read scale with rate/target together: Combo chart with bar for amount/count/scale and line or target/reference for rate/trend/efficiency/standard.
- Rank objects: ranking/leaderboard/Top N card with `rankingCardPattern`, horizontal bar, ranking table, Top/Bottom list.
- See time movement: line chart, area chart, sparkline, annotated trend.
- Locate risky or important objects: heatmap, matrix, map, Top N list, alert table.
- Cross-summarize dimensions: Pivot Table with row dimensions, column dimensions, measures, aggregation formulas, subtotal/grand-total rules, frozen row headers, exact cell tooltip, and drilldown to detail evidence.
- Read grouped table fields: grouped table header with business column groups, `columnTree`, computed `colSpan`/`rowSpan`, leaf units/definitions, fixed multi-level header, and frozen row/primary columns when horizontal scroll exists.
- Complete a mini analysis loop inside one container: Composite Panel with one shared topic, one primary child, summary -> trend/structure -> contribution/exception -> detail/action sequence, panel-level local filter, shared legend/unit, and linked child interaction.
- Explain a decision point: Analysis & Insight component with one subtype, one generated main conclusion, supporting evidence, affected object, action or trust context, and `analysisInsightContract`. For 看结论 / 洞察 / 摘要 / 解读 cards, set `analysisPerspective: conclusionInsight`, `conclusionRuleId`, `conclusionCardPattern`, `conclusionEvidenceBodyMode`, and `conclusionEvidenceBinding`.
- Explain a metric definition or口径 on the page only when explicitly requested: definition/help card with `analysisPerspective: definitionHelp`, `definitionHelpCardPattern`, metric meaning, formula, scope, source/freshness, denominator or example evidence, and tooltip/popover/drawer disclosure.
- When metric口径 or 指标清单 appears only as requirement-document supplementary material, bind it to metric contracts, tooltip/detail/dictionary payloads, export metadata, and validation cases instead of adding a visible report-page block.
- Treat 下钻链路 as an interaction route, not a visible design list. Map it to breadcrumb, drilldown param, chart/table click, drawer, jump, or source-system route with payload and stale-state behavior.
- Compare multi-metric object profiles: parallel coordinates with object/dimension/axis contracts, plus detail table for exact values.
- Explain why: waterfall, decomposition tree, funnel/process chart, contribution analysis.
- Trace source-to-target flow: Sankey with node/link schema, Top N aggregation, main-flow highlight, and exact link tooltip/detail.
- Inspect exact records: table, drawer, source link, export.
- Inspect row-level records: Detail Table with stable primary key, default sort, pagination/search/export scope, row detail drawer, and exact hidden-field disclosure.
- Execute actions: task card, Kanban, workflow stepper, operation buttons.
- Prove data correctness: data-quality trust card with `dataQualityTrustCardPattern`, source comparison, lineage, version list, operation log.
- Present a story: conclusion cards, chapter blocks, timeline, action plan table.

## Metric Network Mapping

Do not map core metrics as parallel tiles by default. Build a metric relationship network:

```text
result metric -> driver metric -> split dimension/object -> detail record -> action/source
```

Rules:

- A result metric owns the top judgment only when it has a baseline/target/threshold/denominator.
- Driver metrics explain the result and should not have the same visual weight as the result unless the question is explicitly driver comparison.
- Dimension/object splits locate where the result changed or where action is needed.
- Detail records verify the issue and support export, drawer, or source-system jump.
- Action/source routes close the loop; otherwise the report may explain but not help the user act.

For KPI dashboards, operating dashboards, cockpits, or metric-heavy reports, turn this relationship network into `metricDrilldownContract` using `10-metric-drilldown-contract.md`. The contract must name the root metric, result/diagnosis/process/action layers, trigger events, payload fields, context inheritance, state rules, and validation cases. Do not render the contract itself as a visible block; expose it through KPI clicks, cross-filters, breadcrumbs, drawers, detail tables, export, source jumps, or action routes.

## Component Selection Constraints

- A component is valid only when it answers a named business question.
- A primary report component is valid only when it declares its conclusion-chain role and the section conclusion it explains.
- A primary metric component is valid only when it helps answer What, Why, or So what. Metrics that only show existence are context/detail fields.
- A visible text, list, table, or control is invalid when it only exposes the design process. Use `RPT-PROCESS-ARTIFACT-VISIBLE` for visible 下钻链路清单, 指标清单, component mapping, binding matrix, workflow/gate checklist, dataset field catalogue, or implementation note that has not passed the business-value test.
- A primary metric without target/baseline/benchmark/historical range/threshold/denominator is not a judgment component; downgrade it or add a comparison source.
- In sample/source restoration, a visible source module is not automatically `must-have`. Classify each source module as:
  - `businessRequired`: directly answers the user's stated report question.
  - `sampleStructure`: needed to preserve the sample's shell, hierarchy, or module rhythm, but not a business-required component.
  - `optionalEnhancement`: useful extra capability that should be labeled and must not alter the sample's first viewport or main body layout.
- Two components may show the same metric only when they answer different tasks, such as current value and trend.
- KPI cards must include actual value, unit, period, comparison baseline, direction, and status rule when judgment is implied.
- KPI Overview Cards are valid when one container answers one domain overview question, such as 销售总览, 用户增长总览, 运营指标总览, or 财务总览, through `2-5` related metrics. They must declare `kpiOverviewCardPattern`, `overviewTopic`, lead metric when present, metric cell list, local control scope, exact-value/detail route, and the `kpi_overview_card` size family. If the metrics are independent questions, split them into separate KPI cards or a Micro Dashboard Card.
- KPI Judgment Cards are valid when one metric/card answers status, health, score, rating, risk, progress, or gauge judgment. They must declare `kpiJudgmentCardPattern`, `judgmentKind`, status/score field, range or dictionary, threshold/band fields when visible, business direction, comparison strip fields, footer evidence/source path, and the `kpi_judgment_card` size family. If the requirement is an empty/error/no-permission condition, use `state-feedback`; if the requirement is a full range visualization with axes or many objects, use a chart/table instead.
- KPI Goal Execution Cards are valid when one metric/card answers target attainment, target gap, plan-vs-actual progress, remaining work, deadline, or milestone state. They must declare `kpiGoalExecutionCardPattern`, `goalExecutionKind`, actual/target fields, required attainment/gap/progress/milestone fields, formula/denominator and direction semantics, comparison strip fields, deadline/remaining-time fields when visible, footer evidence/source path, and the `kpi_goal_execution_card` size family. If many objects or many stages must be compared, split to a full chart/table/timeline/Gantt block instead.
- KPI Time-Series Cards are valid when one metric/card answers trend movement, named-baseline change, YoY/MoM comparison, cycle/period state, volatility/stability, or forecast uncertainty. They must declare `kpiTimeSeriesCardPattern`, `temporalAnalysisKind`, ordered x/y fields, grain, latest period, direction semantics, selected-pattern baseline/cycle/volatility/forecast fields, tooltip payload, footer evidence/source path, and the `kpi_time_series_card` size family. If the main task is multi-series comparison, dense trend audit, or exact forecast review, split to a full chart/table instead.
- Time Pattern Cards are valid when the question is calendar rhythm, schedule occupancy, period cycle, time-slot distribution, weekday-hour heat, cumulative progress, period comparison, peak-valley diagnosis, or time forecast warning. They must declare `analysisPerspective: timePattern`, `timePatternCardPattern`, `timePatternEvidenceBinding`, ordered grain/date/slot fields, metric/unit/aggregation, missing-vs-zero policy, local-control scope, exact-value/detail route, density/fallback rules, and the relevant chart/geometry placement family. If the requirement is only an ordinary trend, use KPI time-series or a full line chart instead.
- KPI Comparison Analysis Cards are valid when one metric/card answers direct comparison, group/segment comparison, competitor position, benchmark distance, or variance/gap diagnosis. They must declare `kpiComparisonAnalysisCardPattern`, `kpiComparisonAnalysisEvidenceMode`, `comparisonAnalysisKind`, comparable subject grain/roles, shared metric definition, unit, period/grain, filter scope, direction semantics, benchmark or variance fields when required, deterministic sort/visible limit, footer evidence/source path, and the `kpi_comparison_analysis_card` size family. If the comparison needs many objects, many dimensions, or exact audit, split to a full chart/table/map block instead.
- Trend charts require consistent time grain.
- Combo charts require one shared ordered category/time grain, a named scale-to-rate/target business relationship, declared bar metric/unit, line or target metric/unit, left/right y-axis mapping, total visible series `<=4`, tooltip exact values, and split-chart fallback. Use separate bar/line/table views when the metrics are unrelated, dual-axis semantics are weak, category labels are dense, or exact audit is the main task.
- Detail Tables require row grain, row id/primary key, visible column priority, default sort, column type/width/alignment, status/action semantics, pagination/search/sort/export scope, and row detail/action payload. Use Detail Tables for lookup, audit, reconciliation, export, and row action; do not use them as unprioritized source-table dumps or show checkbox/action columns without a real batch/action flow.
- Tables with more than `8` visible columns or natural field groups require a grouped-header contract: business group nodes, leaf fields, units/definitions, computed `colSpan`/`rowSpan`, max depth `<=3` by default, fixed multi-level header, frozen row/primary columns when scrolling, and component-local filters separated from per-column header filters. A flat header needs an explicit reason.
- Multiple child components may become a Composite Panel only when they answer one shared business question and can declare `compositePanelContract`: topic, analysis sequence, primary child, child roles/priorities/min sizes, default `2-3` children and max `4`, primary visual weight `50-70%`, shared panel-level filter, shared legend/unit, linked interaction, detail-preview limit, responsive fallback, and parent/child states. If children have independent questions or independent full controls, split them into separate parent blocks.
- Analysis & Insight components are valid only when they explain a concrete decision point: conclusion, insight, anomaly, attribution, impact factor, comparison, trend interpretation, target diagnosis, recommendation, risk, definition, data quality, forecast, annotation, state, or task. They require `analysisInsightContract` and cannot be generic narrative copy. Conclusion/insight cards additionally require `analysisPerspective: conclusionInsight`, `conclusionRuleId`, controlled `conclusionCardPattern`, controlled `conclusionEvidenceBodyMode`, `conclusionEvidenceBinding`, one evidence body, source/freshness, exact-value/detail route, and insufficient-data state. If the component cannot show evidence, action/trust, source/freshness, or an insufficient-data state, it is decorative.
- Ranking / leaderboard / Top N cards are valid only when row or slot order is the answer. They must declare `rankingCardPattern`, `rankingEvidenceBinding`, ranking mode, source-side Top N or bounded-local exception, object id/name fields, metric/unit, value/rank/tie-break fields, visible budget, overflow/detail path, and exact-value tooltip. Use a detail table or operational list when row order is not magnitude, score, contribution, target progress, or priority.
- Pareto cards are valid only when the metric is additive and sorted descending with a meaningful cumulative threshold. They must declare `paretoCardPattern`, `paretoEvidenceBinding`, additive value, total, contribution share, cumulative value/share, threshold boundary, boundary/key-factor flag, and long-tail policy. Use ordinary ranking, waterfall, decomposition tree, or table when cumulative contribution is not valid evidence.
- Funnel charts require ordered stages, shared population or documented cohort logic, value/unit, entry share, stage conversion, drop value/rate, total conversion, stage-count fallback, and exact tooltip/detail. Use funnel only for stage retention/conversion/loss questions; use bar/table for unordered stage comparison, line for trend, path for explicit movement paths, and Sankey for multi-branch source-target flows.
- Waterfall charts require additive contribution logic. Non-additive drivers need contribution bars, driver tables, decomposition trees, or narrative explanation.
- Pie/donut charts are not the default. Use only for very small part-to-whole composition with clear labels.
- Sankey diagrams are valid only for source-to-target flow, allocation, transfer, conversion, loss, or many-stage distribution tasks. Require node schema, directed links with `source`/`target`/`value`, layer/stage order, metric unit, Top N/`其他`, node/link density limits, flow-width semantics, legend/filter separation, exact node/link tooltip/detail, and fallback to table/path/funnel/bar when there is no real flow, only ranking/composition, negative values, or dense all-link clutter.
- Treemap/rectangular tree maps are valid only for hierarchical composition and scale/share reading with a non-negative additive area metric, Top N/`其他`, label thresholds, color semantics, and exact path/value/share tooltip. Use tree for expand/collapse hierarchy and bar/table for precise ranking or negative values.
- Sunburst charts are valid only for hierarchy path plus composition share with a non-negative additive angle metric, visible depth/ring budget, Top N/`其他`, sector label thresholds, center content, breadcrumb/drilldown, and exact full-path/value/total-share/parent-share tooltip. Use Treemap for area-size comparison, tree for expansion context, and bar/table for precise ranking, trend, negative values, or single-level composition.
- Parallel coordinates are valid only for multi-metric object profiles with `3+` metric dimensions. Require object/sample id, `3-12` ordered dimension fields, axis unit/range/direction, independent or standardized scale, sample-density opacity/sampling, Top/anomaly/selected highlight, exact object tooltip/detail, and fallback to table, scatter, bar, filtering, or horizontal scroll when dimensions/samples exceed readability.
- Maps are valid only when geography itself matters.
- Gauges are valid only for a single bounded progress/status metric with min/max range, unit, current value, target/threshold/status semantics when present, and exact tooltip/detail. Use KPI/progress bar when only the number matters, bar/table for multi-object comparison, line for trend, and table/detail for exact audit.
- Dense analytical tables, pivot tables, cross tables, and wide metric matrices should use AntV S2.
- Simple operation lists, alerts, task lists, short forms, pagination, tags, popovers, dialogs, drawers, and basic data tables should use Element Plus in Vue report prototypes unless the existing project design system supersedes it.
- Large graphs such as lineage, decomposition, process network, DuPont, Gantt, or map need a viewport with zoom, pan, reset, and fullscreen.
- For status-overview reports, process/path/flow diagrams are secondary. Use them only when the core question explicitly asks for value chain, dependency, lineage, transmission, process conversion, or flow attribution; otherwise prefer KPI, target/variance, trend, structure, ranking, or risk-entry components.

## Multi-Component Constraints

- Define one primary component or primary KPI group. The rest must be supporting, evidence, or action components.
- First viewport should usually contain 3-7 meaningful components, not a crowded catalogue.
- Every component must have a different semantic role, dimension, grain, or workflow purpose.
- If two components answer the same sub-question, merge them or keep the more precise one.
- Put judgment before evidence unless the report is detail-query or reconciliation-first.
- Put action entries near the object they act on: alert row, task row, risk card, or detail drawer.
- Keep all components under the same global filter context unless the difference is intentional and labeled.
- Do not add a chart when a single KPI, table, or text-summary answers the question better.
- Use Pivot Table only when the business question is a multidimensional aggregated cross-summary. It must include row dimensions, column dimensions, measures, aggregation functions/formulas, subtotal/grand-total rules, density fallback, and drilldown/tooltip evidence; raw records stay in Detail Tables.

## Adaptive Rules

- Infer business purpose from verbs such as "看整体", "为什么", "查明细", "谁好谁差", "汇报", "异常", "执行", "核对", "流失", "转化", "达成", "偏差".
- Start with fewer, stronger blocks rather than a crowded page.
- Mark assumptions and list the minimum missing fields needed to finalize.
- If a component choice depends on data shape, state the condition clearly. Example: "有阶段顺序时用漏斗, 否则用结构柱状图".
