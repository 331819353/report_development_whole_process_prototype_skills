# 10 Metric Drilldown Contract

Use this reference when a KPI dashboard, operating dashboard, cockpit, or metric-heavy report must preserve a reusable metric drilldown design.

The goal is not to show a visible drilldown route list. The goal is to make every primary metric implement this closed loop:

```text
result judgment -> diagnostic split -> process / driver cause -> detail / action closure
```

## Four-Layer Closed Loop

| Layer | User question | Required evidence | Typical surface |
| --- | --- | --- | --- |
| `result` | Is business healthy now? | core KPI, target attainment, YoY/MoM, threshold/status, source freshness | KPI judgment card, overview card, goal card, time-series card, conclusion card |
| `diagnosis` | Where is the issue or opportunity? | split by region, product, channel, customer, org, process node, or other action-relevant dimension | ranking, bar, heatmap, map, composition, comparison, diagnostic KPI card |
| `process` | Why did it happen? | driver metric, process stage, conversion/drop, contribution, decomposition, bottleneck, variance bridge | decomposition, funnel, process table, waterfall, driver tree, trend comparison |
| `action` | What should happen next? | abnormal object, owner, deadline, status, source/detail records, export or assignment route | detail table, alert list, action card, row drawer, source jump, task route |

Every primary metric must either declare a complete four-layer path or record a scoped static exception. A scoped static exception is valid only when the page is intentionally presentation-only, read-only, or the metric is supplemental context rather than a decision anchor.

## Contract Shape

Add `metricDrilldownContract` before ordinary interaction details when a primary metric needs drilldown:

```yaml
metricDrilldownContract:
  contractId: revenueHealthDrilldown
  rootMetricId: revenue
  rootMetricRole: result
  primaryDecision: judgeRevenueHealthAndAct
  activeContext:
    period: currentMonth
    orgScope: selectedOrg
    comparisonPeriod: previousMonth
  layers:
    result:
      componentId: revenueKpiCard
      requiredFields: [metric_id, actual_value, target_value, attainment_rate, yoy, mom, status, freshness_at]
      nextTrigger: kpiClick
    diagnosis:
      componentId: regionRevenueRanking
      splitDimensionIds: [region, product_line, channel]
      defaultDimension: region
      evidenceMode: rankingAndContribution
      abnormalRuleId: revenueBelowTarget
      nextTrigger: dimensionItemClick
    process:
      componentId: conversionAndOrderDriver
      driverMetricIds: [traffic, conversion_rate, average_order_value, refund_rate]
      evidenceMode: driverDecomposition
      nextTrigger: driverMetricClick
    action:
      componentId: revenueActionDetail
      objectGrain: storeOrAccount
      requiredFields: [object_id, object_name, owner_id, issue_type, impact_value, action_status, due_at]
      routes: [detailDrawer, exportRows, assignTask, sourceSystemJump]
  payload:
    required: [metric_id, period, comparison_period, filters, return_to]
    optional: [dimension_id, object_id, driver_metric_id, status, severity]
  stateRules:
    empty: showEmptyWithReset
    noPermission: hideRestrictedTotals
    staleSelection: markOrClearSelectedObject
    lowestLevel: offerDetailQueryOrSourceJump
```

Keep IDs ASCII and stable. Display labels may be Chinese.

## Required Binding Columns

When `metricDrilldownContract` is present, include these fields in the binding matrix:

- `metricDrilldownContractId`
- `drillLayer`: `result`, `diagnosis`, `process`, or `action`
- `rootMetricId`
- `parentMetricId`
- `driverMetricIds`
- `splitDimensionIds`
- `objectGrain`
- `triggerEvent`
- `payloadFields`
- `targetComponentOrRoute`
- `contextInheritance`
- `stateRules`
- `validationCases`

## Placement Rules

- The result layer belongs in the first viewport and must answer the current-state question within seconds.
- The diagnosis layer should be the first analytical layer after the result, not a hidden appendix.
- The process layer must explain the selected result or diagnosis item. Do not show generic process charts that are not linked to the selected metric context.
- The action layer must make the next step reachable through detail, export, owner/action route, or source jump.
- If a conclusion card exists in a multi-slot block, do not repeat the same conclusion in the summary or description area. Use that area only for non-conclusion scope, source, caveat, definition, or action notes.
- Do not render the drilldown contract itself as a page module. It is an interaction and implementation contract.

## Validation Cases

Define at least these cases:

- Default root metric path loads result, diagnosis, process, and action layers with the same period and filters.
- KPI click updates or focuses the diagnosis layer.
- Dimension item click filters process/detail evidence and shows active selection.
- Driver/stage click opens detail evidence or action route with stable IDs.
- Global filter change clears or marks stale selections.
- Empty, no-permission, stale, and lowest-level states behave predictably.
- Export, drawer, jump, and assignment routes carry `metric_id`, `period`, active filters, selected dimension/object, and `return_to`.

## Failure Codes

- `RPT-MISSING-METRIC-DRILLDOWN`: a primary metric lacks a complete drilldown contract or scoped static exception.
- `RPT-DRILLDOWN-LIST-VISIBLE`: a route list or implementation chain is shown as visible report content without explicit documentation intent.
- `RPT-DRILLDOWN-NO-CAUSE`: result and diagnosis exist, but the process/driver cause layer is missing.
- `RPT-DRILLDOWN-NO-ACTION`: detail/action closure is missing for an action-oriented dashboard.
- `RPT-DRILLDOWN-CONTEXT-BROKEN`: selected period, filters, metric, dimension, or object context is not inherited across layers.
- `RPT-DRILLDOWN-FAKE-DEPTH`: lower layers repeat the same aggregate metric without finer dimension, cause, object, or source evidence.
