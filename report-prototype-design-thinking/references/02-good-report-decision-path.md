# Good Report Decision Path

Use this reference after the prototype story method and before component mapping, layout, or template implementation.

The goal is not to make the report show more data. The goal is to make the reader do one less step of thinking before making a judgment.

## Core Definition

A good report is a decision assistant:

```text
clear question -> immediate judgment -> evidence -> reason -> detail/action
```

It is not a metric catalogue, chart gallery, or source-table dump.

## One Primary Decision Question

Every report prototype must declare one primary decision question.

Good questions are concrete:

- 本周销售是否达标？问题出在哪个环节？
- 哪些区域存在库存风险？应该先处理哪里？
- 本次活动是否有效？哪些人群/渠道贡献最大？
- 当前数据是否可信？差异来自哪个来源或规则？

Bad questions are usually broad nouns:

- 销售数据展示
- 经营看板
- 用户行为分析
- 库存报表

If the request contains several decision questions, split them into pages, tabs, sections, or a primary/secondary question hierarchy. Do not let one first viewport carry several unrelated purposes.

## Inverted-Pyramid Report Structure

Default information order:

```text
Conclusion / judgment
  -> supporting evidence
  -> driver / cause / split
  -> detail / traceability
  -> action / owner / next step
  -> trust / source / freshness
```

This does not require every layer to be a separate card. Use section rhythm, grouping, typography, and linked components to make the reading path visible.

Failure patterns:

- Detail table appears before the conclusion or status.
- KPI cards are scattered without a lead question.
- The first viewport shows many charts but no judgment.
- Every block has equal weight and the reader must find the key point alone.
- Source/freshness/trust is hidden even though the report supports decisions or reconciliation.

## Metric Explainability

Each primary metric must answer at least one part of the decision path:

| Question | Meaning | Typical evidence |
| --- | --- | --- |
| What happened? | state, target gap, trend, abnormality | KPI judgment, target/actual, trend, status |
| Why did it happen? | driver, dimension split, contribution, process loss | decomposition, ranking, structure, funnel, comparison |
| So what? | action, owner, risk, next step, drilldown | action card, task list, alert detail, owner/status, source jump |

Metrics that only "exist" but do not support What / Why / So what are supplemental. Keep them in detail, tooltip, drawer, export, or metric dictionary unless the user explicitly asks to display them.

## Result Content Boundary

The visible report result is not the place to show how the report was designed. Before layout, classify each proposed item:

- `visible-result`: helps the reader judge, understand evidence/reason, verify trust/source, or take action.
- `interaction-or-contract`: needed for tooltip, drawer, drilldown, jump, export, validation, data/API contract, or frontend implementation.
- `supplemental-handoff`: useful for downstream design, development, QA, governance, appendix, or operating documentation.
- `remove`: does not help the current business decision.

Design-process artifacts are internal by default:

- 下钻链路清单, analysis path lists, or drill trees.
- 指标清单, metric dictionaries, raw field catalogues, and口径 notes.
- Component mapping, binding matrix, pattern-card lists, workflow/gate checklists, implementation notes, and QA checklists.

Keep conclusions, insights, recommendations, risk notes, and status summaries only when they have business value. A visible conclusion must carry a concrete judgment, evidence or an explicit insufficient-data state, affected object/scope when relevant, source/freshness or trust context, and a detail/action path when the report drives action.

Drilldown is visible only as a user-facing route: breadcrumb, link, button, row action, chart interaction, drawer, or jump tied to the current metric/object/filter context. Do not show a standalone "下钻链路" design list as a report block.

指标清单 is visible only when the user explicitly asks for metric documentation,口径说明, indicator glossary, or a business task needs a definition/help surface. Otherwise place it in metric contracts, tooltip/popover, dictionary drawer, export metadata, validation, or handoff.

## Comparison Requirement

An isolated number is not a report judgment. Every primary metric needs at least one declared reference:

- Target / plan / budget.
- Same period last year or previous period.
- Historical range, average, or control interval.
- Benchmark, peer group, industry line, or expected threshold.
- Before/after event baseline for recap reports.
- Denominator or total when the metric is a share/rate.

If no comparison exists, the metric may still be shown as context, but it cannot be the primary judgment anchor. Record the gap and either add a baseline, downgrade the metric, or route the task to detail/exploration.

## Metric Relationship Network

Do not design core metrics as a flat list. Build a relationship model:

```text
result metric
  -> driver metric
  -> dimension / object
  -> detail record
  -> action / owner
```

Examples:

```text
GMV
  -> traffic
  -> conversion rate
  -> average order value
```

```text
Target completion
  -> actual value
  -> target value
  -> gap
  -> responsible region/team/object
```

The prototype should show which metrics explain the result, which dimensions locate the issue, and which records/actions close the loop.

## Drilldown And Action Path

Every primary judgment needs a next path:

- Click KPI/status -> see driver dimensions or target gap detail.
- Click abnormal trend -> see time period, object, threshold, and source records.
- Click ranking object -> filter related components or open detail drawer.
- Click structure/composition item -> show exact records or contribution explanation.
- Click action/recommendation -> owner, deadline, operation route, or source system.

Static charts are acceptable only for presentation artifacts with no interaction requirement. Runnable prototypes should define drilldown, tooltip, drawer, jump, export, or fullscreen behavior for primary evidence.

## Fast Self-Check

Use this before accepting a report prototype:

1. Can the reader know the main point within 3 seconds?
2. Is there one visible primary conclusion or judgment?
3. Does every primary metric have a comparison baseline?
4. Can the reader locate why the result happened?
5. Can the reader trace exact records or source evidence?
6. Can the reader take or assign a next action when action is expected?
7. Does the first viewport reduce thinking steps instead of adding interpretation work?

## Failure IDs

| ID | Fails when | Repair |
| --- | --- | --- |
| `RPT-NO-PRIMARY-QUESTION` | The report has no single primary decision question. | Define one lead question; split unrelated questions. |
| `RPT-DETAIL-FIRST` | Detail tables/source rows appear before conclusion/status for a decision report. | Move judgment/evidence first; keep detail for traceability. |
| `RPT-FLAT-METRIC-LIST` | Metrics are listed without cause/driver/detail/action relationships. | Build a metric relationship network and component sequence. |
| `RPT-MISSING-COMPARISON` | A primary metric has no target, baseline, benchmark, denominator, or threshold. | Add a reference or downgrade the metric to context. |
| `RPT-NO-WHY` | The report shows what happened but cannot explain drivers or affected dimensions. | Add decomposition, ranking, structure, process, anomaly, or detail evidence. |
| `RPT-NO-SO-WHAT` | The report gives no action, owner, drilldown, export, or source route when action is expected. | Add action/detail path and state rules. |
| `RPT-STATIC-INFO-PILE` | The page is a static information pile with no judgment path. | Rebuild as conclusion -> evidence -> reason -> detail/action. |
| `RPT-PROCESS-ARTIFACT-VISIBLE` | The visible result page shows 下钻链路清单, 指标清单, component mapping, binding matrix, workflow/gate checklist, dataset field catalogue, or implementation notes as if they were report content. | Move the artifact to interaction/config/tooltip/detail/dictionary/validation/handoff, or justify it as explicit visible documentation. |
| `RPT-NO-BUSINESS-VALUE` | A visible block does not help judgment, evidence/reason, trust/source verification, or action. | Remove it, downgrade it to handoff/appendix, or rewrite it as conclusion/evidence/action content. |
