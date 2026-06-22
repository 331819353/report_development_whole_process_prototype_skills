---
name: report-design-system-governance
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于沉淀、应用和验收可复用报表/仪表盘/经营分析/明细查询/专题分析页面的全流程设计系统与开发基线。用户提到提高前端设计、前端设计提升、报表设计系统、页面设计规范、页面规范、组件规范、组件设计规范、视觉规范、tokens、KPI、KPI总览卡/多指标总览卡、单指标KPI卡、状态卡/健康度卡/评分卡/仪表盘卡/指标判断卡、目标执行卡/目标达成卡/差距卡/进度卡/里程碑卡、时间序列KPI卡/趋势卡/变化卡/同环比卡/周期卡/波动卡/预测卡、对比分析KPI卡/对比卡/分组对比卡/竞品对比卡/标杆卡/差异卡/偏差卡、排名卡/榜单卡/Top N卡/排行榜/帕累托卡、占比卡/构成卡/结构卡/份额卡/市场份额卡/集中度卡、指标拆解卡/归因拆解卡/贡献卡/层级拆解卡/驱动因素拆解/路径贡献/瀑布拆解、分布卡/区间卡/密度卡/分位数卡/箱线卡/直方分布/KDE密度/分布热力图、异常分析卡/异常卡/风险卡/预警卡/离群点卡/波动异常卡/阈值预警卡/风险矩阵卡/异常影响评估卡、数据质量卡/质量分析卡/完整性卡/准确性卡/异常数据卡/字段质量卡/规则校验卡、横向指标卡/横版KPI/宽指标卡、横向折线KPI/坐标折线诊断卡、横向柱状KPI/坐标柱状诊断卡、横向散点KPI/关系诊断卡、横向地图KPI/空间诊断卡、双栏VS对比诊断卡、图表、表格、筛选、指标口径、单位/百分比显示、Micro Dashboard Card/微型看板卡、状态反馈/空态/loading/error/no-permission/building、报表前端实现、报表联调验收、数据对账、导出/性能、报表风格一致、可复用报表规范时触发；不替代单个组件修复或模板工程复制。"
---

# Report Design System Governance

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Overview

Use this skill to create, audit, merge, apply, or validate reusable report design-system standards across design, implementation, runtime QA, testing, acceptance, and handoff.

When the standard is built from user-provided component screenshots or samples, governance owns the outcome target: all reusable sample styles must become text-only, controlled, adaptive pattern contracts. The acceptance target is `100% routable coverage` of the provided sample universe, with unsupported samples recorded as `requires-pattern-extension` instead of being left as screenshots.

It governs the shared baseline. Use `$report-visual-layout-design` for a page layout fix, `$report-layout-size-constraint-spec` for block/viewport fit, `$report-component-style-design` for mixed component repair, `$report-component-design-spec` for reusable component-family standards, `$report-chart-design-spec` for charts, `$report-table-design-spec` for tables, `$report-filter-control-design-spec` for filters, `$report-component-placement-spec` for implementation-ready component coordinates, and `$report-prototype-template-management` for bundled template assets.

For Haier-branded or enterprise report/dashboard/BI/data-screen work, load `$haier-enterprise-app-ui-design-spec` as the company-level application UI baseline and keep inherited company rules separate from report-specific extensions and project exceptions. Do not treat Haier UI and report design rules as alternatives: Haier owns tokens and base application components; report governance owns analytical hierarchy, visualization, metric, chart/table/filter, and acceptance rules.

## Use Modes

| Mode | Use when | Output emphasis |
| --- | --- | --- |
| `create-standard` | A team needs a reusable report design system | Tokens, layout, component, visualization, state, engineering, and governance standards |
| `audit-standard` | Existing reports or standards are inconsistent | Findings, missing rules, conflict matrix, repair priorities |
| `merge-standards` | Multiple docs/templates/skills overlap | Source-of-truth decision, merged rules, deprecated rules |
| `extend-haier-standard` | Haier UI is the company baseline, including report applications | Inherited Haier tokens/base components plus report extensions |
| `migration-plan` | Existing reports need adoption | Versioned rollout, affected components, regression baselines, exception process |

## Reference Loading

Always choose the mode and then load only the matching references.

| Need | Read |
| --- | --- |
| Preflight understanding before standard creation/audit/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Reusable spec or audit skeleton | `references/01-design-system-spec-template.md` |
| Concrete rule catalog and completeness checks | `references/02-report-design-system-rule-catalog.md` |
| Report guideline index | `references/03-report-development-guidelines-index.md` |
| Requirements, metric口径, hierarchy, layout, priority | `references/04-report-requirements-metrics-layout-guidelines.md` |
| Chart, table, typography, format, warning colors | `references/05-report-charts-tables-format-guidelines.md` |
| Filters, states, permissions, frontend, performance, acceptance | `references/06-report-filters-states-engineering-acceptance.md` |
| Leadership-friendly patterns and dense report examples | `references/07-exemplary-report-design-patterns.md` |
| Generic anti-AI design gate | `references/08-anti-ai-design-gate.md` |
| Report decision anti-AI gate | `references/09-report-decision-anti-ai-gate.md` |
| Detailed reusable-standard acceptance gates | `references/10-design-system-acceptance-gates.md` |
| Modern SaaS / BI Dashboard / UI Kit positive style contract | `references/12-modern-saas-bi-style-contract.md` |
| Screenshot/sample-derived component style generalization | `$report-component-style-design` `references/00a-style-generalization-goal.md` and `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` |
| Parent block title/body chrome style patterns | `$report-visual-layout-design` `references/block-chrome-style-patterns.md` |
| Distribution / interval / density / quantile / boxplot card governance | `$report-component-style-design` `references/07e-distribution-interval-density-cards.md`, `$report-info-component-mapping` `references/06-binding-implementation-contract.md`, and `$report-layout-size-constraint-spec` |
| Anomaly / risk / warning / outlier analysis card governance | `$report-component-style-design` `references/07f-anomaly-risk-warning-outlier-cards.md`, `$report-info-component-mapping` `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, and `references/09-component-mapping-gates.md` |
| Data quality trust card governance | `$report-component-design-spec` `references/15-data-quality-trust-card-standard.md`, `$report-info-component-mapping` `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, and `references/09-component-mapping-gates.md` |
| Relationship / correlation / association / influence card governance | `$report-component-style-design` `references/09b-relationship-analysis-card-patterns.md`, `$report-info-component-mapping` `references/00-analysis-perspective-card-taxonomy.md`, `references/06-binding-implementation-contract.md`, and `references/09-component-mapping-gates.md` |
| Number precision, rounding, unit scaling, and exact-value display | `references/11-number-precision-display-rules.md`, then `$metric-number-display-contract` when a dedicated numeric contract is needed |
| Bundled template layout tokens | `$report-prototype-template-management` `references/template-layout-design-system.md` |
| Chart/table/filter-specific standards | `$report-chart-design-spec`, `$report-table-design-spec`, `$report-filter-control-design-spec` |
| Component-family placement and fit | `$report-component-placement-spec` |
| Haier/company application UI baseline | `$haier-enterprise-app-ui-design-spec` for Haier/enterprise report pages, dashboards, and data screens |

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Run the Preflight understanding gate before creating, auditing, merging, applying, or accepting standards. Name mode, source-of-truth hierarchy, affected surfaces, owning specialty skills, hard constraints, missing evidence, and start decision.
2. Select mode and source-of-truth hierarchy: company standard, report extension, template standard, project exception, or legacy override. For Haier/enterprise report pages, default hierarchy is `Haier company UI baseline -> report design-system extension -> template/project exception`.
3. When the user explicitly asks for modern SaaS Dashboard / BI Dashboard / UI Kit / light gray-white / white-card / linear clean style, load `references/12-modern-saas-bi-style-contract.md` and translate the wording into semantic tokens, hierarchy rules, chart-lightness rules, and `VIS-*` failure IDs.
4. Inventory design surfaces: shell, navigation, filters, KPI cards including KPI overview / multi-metric overview cards, single-indicator KPI grid cards, KPI judgment/status/health/rating/gauge cards, KPI goal execution / target attainment / gap / progress / milestone cards, KPI time-series / trend / change / YoY-MoM / cycle / volatility / forecast cards, KPI comparison analysis / comparison / group comparison / competitor / benchmark / variance cards, ranking / leaderboard / Top N / Pareto cards, composition / share / structure / market-share cards, decomposition / attribution / contribution / hierarchy cards, distribution / interval / density / quantile / boxplot cards, anomaly / risk / warning / outlier analysis cards, data quality trust cards, relationship / correlation / association / influence cards, horizontal KPI cards, axis-line diagnostic KPI cards, axis-bar diagnostic KPI cards, axis-scatter diagnostic KPI cards, spatial-map diagnostic KPI cards, and paired comparison diagnostic KPI cards, charts, tables, Composite Panels, Micro Dashboard Cards, drawers, modals, buttons, tags, empty/loading/error/no-permission/building states, export, responsive layouts, and custom graphics.
5. Classify whether the work is report/dashboard/BI/data-screen, common enterprise app, or mixed. Load Haier company UI baseline for Haier/enterprise app surfaces and report design-system references for report surfaces before judging or defining rules.
6. Run the generic anti-AI gate and report decision gate before stabilizing tokens or accepting a visual standard.
7. For sample-derived standards, run the style generalization goal: every reusable visual sample must map to controlled patterns, composed patterns, or `requires-pattern-extension`; raw images and embeddings are not durable skill knowledge. When the sample is parent block title/body chrome, map it to `blockChromePattern` through `$report-visual-layout-design` before component body styling.
8. Define semantic tokens and reusable rules: color roles, typography, spacing/grid, radius, border, shadow, density, icon size, z-index, responsive breakpoints, states, accessibility, motion limits, modern BI page/card language, and chart-lightness defaults.
   As a default report-design-system constraint, reduce uniform card-border language, do not KPI-ize every module, lower dependence on green/red as the primary visual grammar, inherit brand/product color systems before status colors, separate information with typography/spacing/dividers before card frames, and design an information flow rather than a generic dashboard collage.
9. Define page, component, visualization, numeric precision/display, filter, state, performance, and handoff standards. Delegate numeric display details to `$metric-number-display-contract`; delegate implementation-ready component families to `$report-component-design-spec` and `$report-component-style-design`.
10. Classify rule strength before acceptance: `MUST/fail` for correctness/trust/runtime/renderer/filter/permission/export/accessibility/readiness constraints, `SHOULD/exception-required` for strong defaults that may vary by business scenario, and `MAY/optional` for enhancements. Every `MUST` gets a proof method and failure ID; every `SHOULD` gets an exception condition.
11. Define governance: stable vs experimental rules, allowed variants, deprecated patterns, exception process, versioning, migration status, owners, and review checklist.
12. Route implementation or remediation to layout, component, frontend, runtime QA, testing, or template skills.

## Required Output

- Preflight understanding result, mode, source-of-truth hierarchy, input inventory, and scope.
- Inherited Haier baseline decisions for color, typography, spacing, radius, shadow, icon/base component, brand/logo, state, and cross-platform behavior.
- Token, page-layout, component, visualization, numeric precision/display, filter, state, accessibility, interaction, and performance standards.
- Modern SaaS / BI Dashboard / UI Kit style contract result when requested: selected source hierarchy, page/card tokens, hierarchy rules, chart-lightness rules, and open `VIS-*` findings.
- Sample-derived style generalization coverage: controlled pattern fields, covered/composed/extension statuses, non-retained image policy, and text-only reproducibility result.
- Block chrome pattern governance when applicable: allowed `blockChromePattern` values, selection triggers, title/body geometry, content-fit obligations, template/component ownership boundary, and deprecated one-off/raw-HTML variants.
- Report guideline mapping: requirements, metric dictionary, calculation口径, page hierarchy, chart/table/filter/state rules, engineering handoff, and acceptance checklist.
- Anti-AI and report-decision gate result with `AI-*` and `RPT-*` findings or explicit pass status.
- Rule strength matrix: `MUST/fail`, `SHOULD/exception-required`, and `MAY/optional` rules, with proof method, failure ID, and allowed exception condition for any advisory wording.
- Governance matrix: version, owner/source, status, allowed variants, deprecated patterns, exception approval, migration impact, and review checklist.
- Adoption or remediation plan with affected projects/components and regression evidence requirements.

## Quality Gate

- Do not output an empty table-only template; each required rule needs values, inherited source references, or explicit `gap` status.
- Do not create, audit, merge, or accept a report design-system standard before source-of-truth hierarchy, affected surfaces, and specialty skill ownership are clear.
- Do not accept a Haier/enterprise report standard that omits inherited Haier color, typography, spacing, radius, shadow, base control, brand/logo, state, and responsive rules.
- Do not create one-off colors, spacings, hover effects, chart semantics, or component variants without semantic tokens or approved exceptions.
- Do not accept generic "modern SaaS", "高级科技感", purple-blue gradients, glass cards, glow buttons, floating decoration, oversized radius, or abstract AI imagery as default report style.
- Do not accept report standards where uniform card borders become the main information separator. Use typography, spacing, section rhythm, subtle dividers, and content hierarchy first; card frames are for independent repeated objects, strong interaction surfaces, or explicit template constraints.
- Do not accept standards that convert every module into KPI cards, metric tiles, or dashboard blocks. KPI cards are reserved for primary decision metrics with formula, baseline, status dictionary, and action/detail route; analysis, explanation, table, evidence, and workflow content must keep their own component forms.
- Do not let red/green carry the default page language. Brand/product color systems and neutral hierarchy must define identity, emphasis, navigation, selection, and primary data focus; green/red/orange status colors are reserved for documented success/warning/error/risk/finance conventions and must pair with text, sign, icon, or label.
- Do not accept a "dashboard" layout when the business task needs an information flow. The standard must declare the reading sequence, such as conclusion -> evidence -> driver -> detail -> action/trust, and reject equal-weight card grids that obscure that sequence.
- When the user explicitly requests modern SaaS / BI Dashboard / UI Kit language, do not leave it as a generic adjective. It must map to `12-modern-saas-bi-style-contract.md`; missing page/card token mapping, flat hierarchy, component pileup, or overweight charts block readiness with the contract `VIS-*` IDs.
- Reusable standards must cover responsive behavior, edge states, accessibility, data density, numeric display contracts, exact-value access, engineering tokens, and migration impact.
- Reusable screenshot/sample-derived standards must reach `100% routable coverage` for the provided sample set: every reusable sample is covered by existing patterns, composed patterns, or a named extension gap, and no long-lived standard depends on raw image paths, image embeddings, or OCR-only extraction.
- Reusable parent-block title/background standards must declare `blockChromePattern` or a named extension gap. Do not accept raw HTML/CSS class names, screenshot-only memory, or post-content decorative styling as durable design-system knowledge.
- Reusable standards must not leave high-risk rules as vague advice. Renderer ownership, filter scope, query/export/permission impact, data contracts, runtime fit, overflow, accessibility, and readiness evidence must be written as `MUST/fail` with proof obligations.
- Report standards must preserve metric口径, metric tree/driver path, realistic data states, drilldown/detail/action, trust metadata, and industry vocabulary.
- Load `10-design-system-acceptance-gates.md` before accepting a reusable standard, audit result, merge, or migration plan.
