---
name: report-info-component-mapping
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于把报表业务问题映射为分析视角、组件、数据集、筛选、交互和绑定矩阵。用户提到指标怎么放、业务问题怎么变组件、图表选择、分析视角、看现状/看目标/看趋势/看对比/看排名/看占比/看拆解/看分布/看异常/看风险/看预警/看离群点/看关系/看流转/看流程/看转化/看空间/看时间规律/看多维特征/看人群对象/看矩阵判断/看行情/看说明/看结论/看原因/看行动/看复盘/看质量/看明细/看筛选探索、组件规划、页面信息架构、组件设计规范前置、行情卡/报价卡/K线卡/涨跌卡/波动率卡/自选列表卡选择、KPI总览卡/多指标总览卡/横向总览卡选择、单指标KPI卡/单指标卡片布局选择、状态卡/健康度卡/评分卡/仪表盘卡/指标判断卡选择、目标执行卡/目标达成卡/差距卡/进度卡/里程碑卡选择、时间序列KPI卡/趋势卡/变化卡/同环比卡/周期卡/波动卡/预测卡选择、对比分析KPI卡/对比卡/分组对比卡/竞品对比卡/标杆卡/差异卡/偏差卡选择、排名卡/榜单卡/Top N卡/排行榜/帕累托卡选择、占比卡/构成卡/结构卡/份额卡/市场份额卡/集中度卡选择、指标拆解卡/归因拆解卡/贡献卡/层级拆解卡/驱动因素拆解/路径贡献/瀑布拆解选择、分布卡/区间卡/密度卡/箱线卡/分位数卡/直方分布/KDE密度/分布热力图选择、转化卡/漏斗卡/流失卡/留存卡/阶段转化卡选择、多维特征分析卡/画像卡/用户画像卡/客户画像卡/雷达卡/能力画像卡/标签卡/标签云/标签详情卡选择、异常分析卡/异常卡/风险卡/预警卡/离群点卡/波动异常卡/阈值预警卡/风险矩阵卡/异常影响评估卡选择、横向指标卡/横版KPI/宽指标卡选择、横向折线KPI/坐标折线诊断卡选择、横向柱状KPI/坐标柱状诊断卡选择、横向散点KPI/关系诊断卡选择、横向地图KPI/空间诊断卡选择、双栏VS对比诊断卡选择、卡片/表格/图形组合、Micro Dashboard Card/微型看板卡、状态反馈/空态/loading/error/no-permission/building、数据集设计、mock字段、筛选查询、联动状态、钻取路径、组件绑定矩阵、实现配置、页面信息架构落地时触发；不负责页面模板复制或组件视觉细节。"
---

# Report Info Component Mapping

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Core Positioning

Use this skill as the bridge from business meaning to implementable report components:

`business question -> analysis perspective -> answer atoms -> component bundle -> data model -> control semantics -> filter/query model -> interaction state -> binding matrix`

When a component bundle uses screenshot-derived or reusable visual pattern knowledge, the mapping must also carry the style generalization decision: selected controlled pattern field, composed-pattern decision, extension gap, adaptive variables, and text-only reproduction status. This prevents later generation from depending on raw images or unstable visual memory.

It does not choose the whole report type and does not style the component. It decides which components are needed, what data each one consumes, how filters and interactions affect them, and what validation proves the mapping.

## Reference Map

Read only the files needed for the current task. Files are ordered by workflow stage.

| Need | Read |
| --- | --- |
| Analysis perspective to card-family routing | `references/00-analysis-perspective-card-taxonomy.md` |
| Answer atoms, content blocks, chart/table/component selection | `references/01-question-component-flow.md` |
| Typical scenario bundles and component sets | `references/02-business-bundle-patterns.md` |
| Mock data, dimensions, facts, formulas, edge cases | `references/03-mock-data-modeling.md` |
| Filters, option sources, query params, permissions, linkage | `references/04-filter-scope-query.md` |
| Drilldown, cross-filtering, drawer/modal/jump/export states | `references/05-interaction-state-flow.md` |
| Implementation-ready component contracts and binding matrix | `references/06-binding-implementation-contract.md`; load its `06a`-`06k` split files only for the needed schema segment |
| Report-type routing, layout/style constraints, output checklist | `references/07-routing-layout-quality.md` |
| Controlled vocabularies, stable IDs, deterministic generation | `references/08-generation-stability.md`; load `references/08a-generation-deterministic-selection-order.md` when detailed deterministic order is needed |
| Detailed implementation gates for mapping decisions | `references/09-component-mapping-gates.md` |
| Conclusion / insight / summary / interpretation card routing | `$report-component-design-spec` `references/12-conclusion-insight-card-standard.md`, `$report-component-style-design` `references/03a-conclusion-evidence-action-cards.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Action recommendation / next-step / suggested strategy / to-do execution card routing | `$report-component-design-spec` `references/13-action-recommendation-card-standard.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Review impact / 看复盘 / event impact / 活动影响评估 / before-after review card routing | `$report-component-design-spec` `references/14-review-impact-card-standard.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Data quality trust / 看质量 / completeness / accuracy / exception sample card routing | `$report-component-design-spec` `references/15-data-quality-trust-card-standard.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Detail evidence / 看明细 / row drilldown / sample / log card routing | `$report-component-design-spec` `references/16-detail-evidence-card-standard.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Ranking / leaderboard / Top N / Pareto pattern routing | `$report-component-style-design` `references/07a-top-ranking-cards.md` plus `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Composition / share / structure / market-share pattern routing | `$report-component-style-design` `references/07c-composition-share-cards.md` plus `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Decomposition / attribution / contribution / hierarchy pattern routing | `$report-component-style-design` `references/07d-decomposition-attribution-contribution-cards.md` plus `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Distribution / interval / density / boxplot pattern routing | `$report-component-style-design` `references/07e-distribution-interval-density-cards.md` plus `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Anomaly / risk / warning / outlier pattern routing | `$report-component-style-design` `references/07f-anomaly-risk-warning-outlier-cards.md` plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Relationship / correlation / association / influence pattern routing | `$report-component-style-design` `references/09b-relationship-analysis-card-patterns.md` plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Matrix decision / quadrant / priority / strategy-layer pattern routing | `$report-component-design-spec` `references/09-matrix-decision-card-standard.md` plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Market movement / quote / K-line / breadth / volatility pattern routing | `$report-component-design-spec` `references/10-market-analysis-card-standard.md` plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Definition help / metric explanation / 指标说明 / 指标口径 pattern routing | `$report-component-design-spec` `references/11-definition-help-card-standard.md`, `$report-component-style-design` `references/03b-definition-help-card-patterns.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Flow transfer / migration / path / traffic distribution pattern routing | `$report-component-design-spec` `references/03-flow-transfer-analysis-card-standard.md`, `$report-component-style-design` `references/09a-flow-hierarchy-diagram-card-patterns.md`, `$report-component-style-design` `references/05c-echarts-specialized-and-flow.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Process / step / node / bottleneck pattern routing | `$report-component-design-spec` `references/04-process-bottleneck-analysis-card-standard.md`, `$report-component-style-design` `references/09a-flow-hierarchy-diagram-card-patterns.md`, `$report-component-style-design` `references/05c-echarts-specialized-and-flow.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Conversion / retention / loss / stage conversion pattern routing | `$report-component-design-spec` `references/05-conversion-retention-analysis-card-standard.md`, `$report-component-style-design` `references/09a-flow-hierarchy-diagram-card-patterns.md`, `$report-component-style-design` `references/05c-echarts-specialized-and-flow.md`, `$report-component-style-design` `references/05d-basic-chart-card-patterns.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Spatial / map / geographic analysis pattern routing | `$report-component-design-spec` `references/06-spatial-analysis-map-card-standard.md`, `$report-component-style-design` `references/05c-echarts-specialized-and-flow.md`, `$report-component-style-design` `references/12d5-placement-map-geographic.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Time pattern / calendar / cycle / time-slot / peak-valley pattern routing | `$report-component-style-design` `references/07g-time-pattern-analysis-cards.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| Multidimensional feature / profile / radar / tag pattern routing | `$report-component-design-spec` `references/07-multidimensional-feature-analysis-card-standard.md`, `$report-component-style-design` `references/12d1-placement-radar.md`, plus `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, `references/08-generation-stability.md`, and `references/09-component-mapping-gates.md` |
| KPI, KPI overview, single-indicator KPI, KPI judgment/status/health/rating/gauge cards, KPI goal execution/target attainment/gap/progress/milestone cards, KPI time-series/trend/change/YoY-MoM/cycle/volatility/forecast cards, KPI comparison analysis/comparison/group comparison/competitor/benchmark/variance cards, horizontal KPI, axis-line diagnostic KPI, axis-bar diagnostic KPI, axis-scatter diagnostic KPI, spatial-map diagnostic KPI, paired comparison diagnostic KPI, Micro Dashboard, and state feedback pattern routing | `$report-component-style-design` `references/04a-kpi-card-patterns.md`, `references/12f6-placement-micro-dashboard-card.md`, and `references/13-state-feedback-patterns.md` |
| Number precision/display baseline | `$metric-number-display-contract` |
| Report requirement/metric/layout baseline | `$report-design-system-governance` relevant guideline references |

Loading guidance:

- For conceptual mapping, use this `SKILL.md` plus `00-analysis-perspective-card-taxonomy.md` and `01-question-component-flow.md`.
- For implementation-ready specs, widget configs, mock data, API-facing contracts, or generated files, `06-binding-implementation-contract.md`, `08-generation-stability.md`, and `09-component-mapping-gates.md` are mandatory; then load only the needed `06a`-`06k` or `08a` split references.
- For report/dashboard/BI/detail-query/topic-analysis work, also apply the report decision gate from `$report-design-system-governance`.

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Normalize the report theme, audience, primary question, decision, time/org/object scope, metrics, dimensions, baselines, risks, tasks, source, permissions, and acceptance target.
2. Classify the primary `analysisPerspective` and any secondary perspectives, such as currentStatus, targetProgress, trendMovement, rankingContribution, causeDiagnosis, detailEvidence, or actionRecommendation.
3. Decompose the selected perspectives into answer atoms such as state, target gap, trend, structure, ranking, process, cause, anomaly, detail, action, evidence, and data trust.
4. Map answer atoms to parent blocks, optional sub-blocks, and component bundles with `must-have`, `should-have`, or `optional` priority. When a component bundle is a definition/help card, anomaly/risk/warning/outlier analysis card, Micro Dashboard Card, or state feedback surface, select the controlled pattern field before layout or visual handoff.
5. Define data before controls: datasets, row grain, formulas, rollups, numeric display contracts, edge cases, realistic dirty-data cases, default/non-default states, empty/loading/error/no-permission/building states, and resolver/API branch needs.
6. Classify every control as `perspective-switch`, `global-filter`, `local-filter`, or `drilldown-param`; never hide metric/schema-changing perspectives inside ordinary filters.
7. Define filter/query behavior after the data model proves it can support option data, defaults, cascades, permissions, affected components, and non-default variations.
8. Define interactions: tooltip/value reveal, cross-filter, drilldown, drawer, modal, jump, export, refresh, fullscreen, batch action, owner/action flow, and stale-state behavior.
9. Produce the binding matrix linking business question, analysis perspective, answer atom, parent block, component, dataset, fields, formulas, controls, filters, interactions, update triggers, and validation cases.
10. Route to report-type, layout, component-style, API/model, frontend, and test skills as needed.

## Required Output

- Theme, user scenario, primary question, decision, and report-decision risks or gaps.
- Analysis perspective classification, answer atom decomposition, and component bundle map.
- Dataset/mock model with grain, fields, formulas, numeric display contracts, realistic edge cases, and reconciliation rules.
- Control semantics model and filter/query model.
- Interaction and state model.
- Unified binding matrix with stable IDs, controlled vocabularies, and validation cases.
- Style generalization fields in the binding matrix when reusable sample-derived patterns are used.
- Controlled `definitionHelpCardPattern`, `definitionHelpEvidenceBinding`, `actionRecommendationCardPattern`, `actionEvidenceBodyMode`, `actionRecommendationEvidenceBinding`, `reviewImpactCardPattern`, `reviewImpactEvidenceMode`, `reviewImpactEvidenceBinding`, `dataQualityTrustCardPattern`, `dataQualityEvidenceBinding`, `detailEvidenceCardPattern`, `detailEvidenceBinding`, `anomalyAnalysisCardPattern`, `anomalyAnalysisEvidenceBinding`, `microDashboardCardPattern`, `microDashboardContract`, `stateFeedbackPattern`, and `stateFeedbackContract` fields when those component classes are selected.
- Routing notes for report type, layout, component style, API/model, frontend, and testing.

## Quality Gate

- Every component must answer a named business question and participate in a decision path.
- Primary metric-bearing components need formula/denominator, grain, period, source/freshness, numeric display contract, baseline, and owner/action notes when implementation-ready.
- Numeric display contracts must define value type, raw/display unit, display scale, precision, tooltip/export precision, rounding mode, null/zero/denominator-zero behavior, negative-zero handling, and formula precision policy before API/frontend handoff.
- Data completeness must be checked before filter binding.
- KPI totals, chart totals, table rows, drawers, exports, jumps, and refresh must share the same active context.
- Exact-value tasks need table/card/drawer support; cause-analysis tasks need decomposition support; action tasks need owner/status/closure evidence.
- Action recommendation cards must declare `analysisPerspective: actionRecommendation`, `visualType: action-recommendation-card`, controlled `actionRecommendationCardPattern`, controlled `actionEvidenceBodyMode`, `actionRecommendationEvidenceBinding`, trigger metric, evidence fields, bounded action items, expected impact or execution metadata when visible, exact-value/detail/action route, owner/deadline/status when execution is expected, and validation cases before implementation handoff.
- Review impact cards must declare `analysisPerspective: reviewImpact`, controlled `reviewImpactCardPattern`, controlled `reviewImpactEvidenceMode`, `reviewImpactEvidenceBinding`, event id/name/date or period, baseline method, before/after or control fields, metric formulas/units/source/freshness, exact-value/detail route, local-control scope, fallback, and validation cases before implementation handoff. Causal wording requires control-group, difference-in-differences, matched baseline, or a documented business rule.
- Generated IDs, dataset names, filter IDs, visual types, action types, and matrix columns must follow `08-generation-stability.md`.
- Screenshot/sample-derived reusable component styles must populate `styleGeneralization` and controlled pattern fields; image-only references are not mapping-ready.
- Definition/help cards must declare `analysisPerspective: definitionHelp`, `visualType: text-summary`, controlled `definitionHelpCardPattern`, `definitionHelpEvidenceBinding`, metric meaning, formula or explicit non-formula reason, scope/include/exclude, source/freshness, numeric formats, tooltip/detail/dictionary route, and validation cases before implementation handoff.
- Data quality trust cards must declare `analysisPerspective: dataQualityTrust`, controlled `dataQualityTrustCardPattern`, `dataQualityEvidenceBinding`, data object scope, numerator/denominator policy, formula or rule references, source/freshness/batch metadata, exact-value/detail/source-lineage route, and validation cases before implementation handoff.
- Detail evidence cards must declare `analysisPerspective: detailEvidence`, controlled `detailEvidenceCardPattern`, `detailEvidenceBinding`, row grain, primary key, identity fields, default sort or event order, status/severity dictionary when visible, local-control scope, exact-value/detail/export route, renderer owner, density limits, fallback, and validation cases before implementation handoff.
- Anomaly/risk/warning/outlier cards must declare `analysisPerspective: anomalyRisk`, `visualType: anomaly-card`, controlled `anomalyAnalysisCardPattern`, `anomalyAnalysisEvidenceBinding`, one diagnostic lens, severity/status, baseline/threshold/time, impact/object, exact-value/detail/action path, and fallback before implementation handoff.
- Flow transfer cards must declare `analysisPerspective: flowTransfer`, one `flowTransferTask`, the existing controlled pattern fields selected by the real data shape, source-target/stage/path/migration/distribution/comparison fields, density/label rules, exact-value route, renderer owner, and fallback before implementation handoff.
- Process/step/node/bottleneck cards must declare `analysisPerspective: processBottleneck`, one `processTask`, controlled `processAnalysisCardPattern`, `processAnalysisEvidenceBinding`, stage/node/status/timing/bottleneck fields, order/threshold/denominator rules, density/label rules, exact-value route, renderer owner, and fallback before implementation handoff.
- Conversion/retention/loss/stage conversion cards must declare `analysisPerspective: conversionRetention`, one `conversionRetentionTask`, controlled `conversionRetentionCardPattern`, `conversionRetentionEvidenceBinding`, stage/cohort/window/loss/path/comparison fields, numerator/denominator/formula rules, density/label rules, exact-value route, renderer owner, and fallback before implementation handoff.
- Spatial/map/geographic analysis cards must declare `analysisPerspective: spatialDistribution`, one controlled `spatialAnalysisCardPattern`, geography grain, region code or longitude/latitude/origin-destination fields, map resource/projection, visualMap/legend fields, missing-geo policy, density/label rules, exact-value route, renderer owner, state coverage, and fallback before implementation handoff.
- Multidimensional feature/profile/tag cards must declare `analysisPerspective: multiDimensionalProfile`, one controlled `multiDimensionalFeatureCardPattern`, object/dimension/tag fields, scale policy, density/label rules, exact-value route, renderer owner, state coverage, and fallback before implementation handoff.
- Micro Dashboard Cards must declare one management topic, parent/child minimum sizes, child count budget, exact-value/status path, responsive fallback, and parent/child state rules before layout handoff.
- State feedback components must declare state kind, state scope, reason/action, geometry preservation, accessibility, and no-permission leakage protection before implementation handoff.
- Matrix decision cards must declare `analysisPerspective: matrixDecision`, controlled `matrixDecisionCardPattern`, `matrixDecisionEvidenceBinding`, explicit axes/dimensions/priority/layer fields, classification/threshold rules, density and label limits, exact-value route, renderer owner, fallback, and validation cases before implementation handoff.
- Market movement cards must declare `analysisPerspective: marketMovement`, `visualType: market-analysis-card`, controlled `marketAnalysisCardPattern`, `marketAnalysisEvidenceBinding`, instrument identity when instrument-level, quote/OHLC/breadth/volatility/risk-return fields required by the selected pattern, market color convention, source/freshness, exact-value route, local-control scope, renderer owner, fallback, and validation cases before implementation handoff.
- Load `09-component-mapping-gates.md` before finalizing implementation-ready component contracts, mock data, or binding matrices.
