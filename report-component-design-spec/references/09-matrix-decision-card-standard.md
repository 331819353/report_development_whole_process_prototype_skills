# Matrix Decision Card Standard

Use this standard when a report card answers `看矩阵判断`: which objects deserve attention, which quadrant they fall into, which priority they carry, which strategy layer they belong to, and what action should follow.

This is a reusable component-family standard. Do not keep screenshot paths as the durable source of truth. Convert visual references into `matrixDecisionCardPattern`, data fields, placement rules, and acceptance gates.

## 1. Scope And Source Of Truth

- Component family: matrix decision cards, quadrant cards, metric matrices, priority cards, strategy-layer cards.
- Analysis perspective: `analysisPerspective: matrixDecision`.
- Applicable pages: management dashboards, business review reports, task/issue triage, customer/product portfolio analysis, strategy execution tracking, work-order prioritization, risk/opportunity classification.
- Source hierarchy: company UI baseline -> report design system -> this matrix decision standard -> project-specific exception.
- Renderers: ECharts for scatter/bubble/heatmap/line/bar/funnel/tree where the chart body is standard; AntV S2 or project table for dense matrix/pivot/detail; project list/card components for priority lists, kanban lanes, strategy cards, and task entries.
- Supported viewports: standard card `420x300+`; dense matrix or strategy tree `560x340+`; compact summary cards may fall back to list/table at smaller sizes.
- Owner/version/status: report component design spec / v1 / ready for routing and implementation handoff.

## 2. Why These Samples Feel Designed

The sample family feels strong because the visual language is tied to decision semantics, not decoration.

1. Clear decision grammar: every card answers one action-oriented question, such as "which quadrant", "which priority", "which layer", or "which cell is high". The user can infer what to do after reading it.
2. Stable axes and thresholds: quadrant and matrix cards expose x/y axes, row/column dimensions, level boundaries, or priority bands. The design has a visible reasoning scaffold instead of floating metrics.
3. Bounded density: each card has a small, intentional amount of content: 4 quadrants, 4-6 matrix rows/columns, 3-4 priority levels, or 3 strategy layers. It reads as curated, not generated filler.
4. Brand-first color, restrained surface: brand/product color and neutral hierarchy set identity; documented category, priority, or level colors stay labeled. Optional light analytical surfaces, reduced borders, light gridlines, and soft fills leave the data in charge.
5. Micro-evidence inside a card: values, deltas, rings, mini trends, badges, or row snippets show why the classification is true. The card is not just a label.
6. Exact-value path: visually compressed data still has tooltip, table, drawer, or detail fallback. The design is allowed to be elegant because auditability is not lost.
7. Repeated rhythm with real variation: the samples share header/filter/white-card rules, but the body changes according to data shape. This avoids the common AI-flavored pattern of repeating identical cards with different icons.
8. Typography hierarchy is quiet: titles, labels, values, legends, and footers have distinct weights. There are no oversized marketing headlines inside analytical cards.

Anti-AI takeaway: the "design sense" comes from a decision model plus disciplined information hierarchy. It does not come from gradients, glass, glow, generic blue-purple polish, abstract icons, or card piles.

## 3. Controlled Pattern Field

Use `matrixDecisionCardPattern` with `visualType: matrix-decision-card` when the card packages a decision matrix with header, local control, evidence body, exact-value route, and fallback. If the visual is a standalone chart without card-level decision context, use the real chart `visualType` such as `scatter`, `heatmap`, `bar`, `line`, `tree`, `funnel`, or `table`.

```ts
type MatrixDecisionCardPattern =
  | 'quadrant-segmentation-card'
  | 'quadrant-kpi-grid-card'
  | 'quadrant-trend-compare-card'
  | 'quadrant-share-ring-card'
  | 'quadrant-bubble-priority-card'
  | 'metric-heatmap-matrix-card'
  | 'metric-delta-matrix-card'
  | 'metric-intensity-matrix-card'
  | 'rating-matrix-card'
  | 'boolean-support-matrix-card'
  | 'bubble-magnitude-matrix-card'
  | 'sparkline-trend-matrix-card'
  | 'priority-summary-card'
  | 'priority-detail-list-card'
  | 'priority-pyramid-card'
  | 'priority-quadrant-card'
  | 'priority-timeline-card'
  | 'priority-donut-list-card'
  | 'priority-kanban-swimlane-card'
  | 'priority-trend-card'
  | 'strategy-pyramid-card'
  | 'strategy-hierarchy-list-card'
  | 'strategy-goal-breakdown-card'
  | 'strategy-matrix-card'
  | 'strategy-timeline-card'
  | 'strategy-funnel-layer-card'
  | 'strategy-stack-card'
  | 'strategy-dependency-tree-card';
```

## 4. Pattern Selection

| Trigger | Choose | Main evidence body | Minimum useful size |
| --- | --- | --- | --- |
| Two metrics classify objects into four zones | `quadrant-segmentation-card` | scatter/quadrant, quadrant tiles, or detail table | `420x300` |
| Four quadrants each need headline values | `quadrant-kpi-grid-card` | 2x2 KPI grid with axis labels | `420x300` |
| Quadrants also need movement proof | `quadrant-trend-compare-card` | quadrant KPI + mini trend | `480x320` |
| Each quadrant needs share/composition proof | `quadrant-share-ring-card` | quadrant KPI + ring/share | `480x320` |
| Object value is x/y plus volume/opportunity | `quadrant-bubble-priority-card` | bubble scatter with reference lines | `480x340` |
| Row/column dimensions classify metric intensity | `metric-heatmap-matrix-card` | bounded heatmap | `420x300` |
| The matrix compares current vs baseline | `metric-delta-matrix-card` | delta heatmap/table with up/down semantics | `480x320` |
| Ordered intensity levels drive judgment | `metric-intensity-matrix-card` | stepped heatmap | `420x300` |
| Rating stars/levels are the evidence | `rating-matrix-card` | rating matrix plus legend | `420x300` |
| Capability/support yes-no decisions are primary | `boolean-support-matrix-card` | check/cross matrix | `420x300` |
| Cells need magnitude as area/diameter | `bubble-magnitude-matrix-card` | bubble matrix with size legend | `480x320` |
| Each cell has small time movement | `sparkline-trend-matrix-card` | cell sparklines | `560x340` |
| Priority counts and shares are first-read | `priority-summary-card` | P0/P1/P2/P3 metric strip + bar/ring | `420x260` |
| Priority rows need owner/status/action | `priority-detail-list-card` | compact operational list/table | `420x300` |
| Priority levels should read as severity hierarchy | `priority-pyramid-card` | pyramid/funnel stack | `420x300` |
| Urgency and impact cross into priority | `priority-quadrant-card` | x/y priority matrix | `480x320` |
| Priority changes over time or events | `priority-timeline-card` | timeline with colored levels | `420x300` |
| Priority structure plus top rows | `priority-donut-list-card` | donut/share + list | `480x320` |
| Work items are grouped by priority lanes | `priority-kanban-swimlane-card` | bounded columns/lanes | `560x340` |
| Priority movement over periods matters | `priority-trend-card` | multi-series line/bar | `480x320` |
| Strategy layers are top-down hierarchy | `strategy-pyramid-card` | L1/L2/L3 pyramid + metrics | `420x300` |
| Strategy layers require exact list audit | `strategy-hierarchy-list-card` | grouped list/table | `420x300` |
| Goals break down into subgoals/actions | `strategy-goal-breakdown-card` | layered goal cards with progress | `520x320` |
| Strategy layer crosses dimensions | `strategy-matrix-card` | layer-by-dimension matrix | `520x320` |
| Strategy phases run over time | `strategy-timeline-card` | swimlane timeline | `520x320` |
| Layer counts narrow from goal to action | `strategy-funnel-layer-card` | funnel/layer stack | `420x300` |
| Layers are stacked score/progress bands | `strategy-stack-card` | stacked cards/strips | `420x300` |
| Dependencies determine execution path | `strategy-dependency-tree-card` | tree/dependency diagram | `560x340` |

## 5. Data Contract

A matrix decision card is not valid without the fields that explain how classification is computed.

Required common fields:

- `object_id`, `object_name`, and object grain, unless the card is aggregate-only and declares an aggregate policy.
- `period` or snapshot field.
- At least one decision metric, score, status, or level field.
- `classification_rule`: deterministic rule mapping raw fields to quadrant, priority, layer, or cell state.
- `threshold_rule`: threshold/band fields or named threshold source. Use `none` only for pure categorical matrices.
- `numericFormatContracts` for all visible metrics, shares, rates, scores, deltas, or counts.
- `tooltipPayload` with exact object/cell value, classification, period, source/freshness, and rule version.
- `exactValueRoute`: table, drawer, fullscreen, detail page, or export path.
- `validationCases`: default, changed period/filter, missing threshold, zero/empty, dense data, long labels, no-permission, stale source.

Pattern-specific fields:

- Quadrant: `x_metric`, `y_metric`, x/y units, x/y direction, x/y threshold or reference value, quadrant id/name/action.
- Matrix heatmap: row dimension, column dimension, value metric, aggregation, color scale, missing-vs-zero rule.
- Priority: priority id/name/order/color, severity/urgency/impact fields, owner/status/deadline/action fields when work items are visible.
- Strategy layer: layer id/name/order, parent id, target/progress/completion fields, dependency fields when tree or relation evidence is visible.
- Bubble: non-negative size metric and size legend policy.
- Trend/sparkline: ordered time field, series value field, missing-period rule.

## 6. Anatomy

Required slots:

- Header: title naming the decision task, not a generic "matrix analysis".
- Local control zone: optional period, metric, level, object scope, or view-mode control. It affects only this card or declared local group.
- Decision scaffold: axes, rows/columns, layers, priority bands, or dependency edges.
- Evidence body: one primary visual body only.
- Legend/rule note: color, threshold, priority, layer, or size meaning.
- Exact-value route: tooltip, drilldown, drawer, fullscreen, table, or export.
- State geometry: loading, empty, error, no-permission, stale, partial-data, threshold-missing, and dense-overflow states.

Forbidden slots:

- Decorative icon blocks that do not map to object, level, priority, status, or action fields.
- Multiple unrelated chart bodies inside one card.
- Global filters duplicated as component-local controls.
- Color-only meaning without visible or tooltip rule disclosure.

## 7. Placement And Fit

Use these variables:

```text
W = container width
H = container height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P
titleAreaH = 36-56px
legendH = 20-36px
footerH = 0-28px
bodyH = CH - titleAreaH - legendH - footerH - gaps
```

Global fit rules:

- Main evidence body must own at least `52%` of card height.
- A standard matrix decision card should be at least `420x300`.
- Dense matrix, kanban, strategy tree, sparkline matrix, or table hybrids should be at least `560x340`.
- Header controls must not consume more than `45%` of `CW`; collapse to a dropdown before shrinking the evidence body.
- Legends are short and semantic. If legend items exceed `6`, use grouped legend, dropdown, or detail panel.
- The exact-value route must remain available even when labels collapse.

Quadrant geometry:

```text
axisLabelW = 36-72px
xAxisLabelH = 24-36px
plotX = P + axisLabelW
plotY = P + titleAreaH
plotW = CW - axisLabelW
plotH = bodyH - xAxisLabelH
```

- Reference lines are weaker than points/cards.
- Quadrant labels sit in corners and must not cover points.
- Permanent point labels stay `<=6`; ordinary labels move to tooltip/detail.
- Use table/list fallback when point count is unbounded or exact row audit is primary.

Heatmap/matrix geometry:

- Follow `report-component-style-design` `references/12d8-placement-heatmap-matrix.md`.
- Cell size must be `>=12px` for color-only cells and `>=28px` for permanent value labels.
- Missing cells and zero cells must look different.
- Row/column labels may sample, rotate, or collapse, but exact labels remain in tooltip/detail.

Priority and strategy geometry:

- Priority levels default to `P0/P1/P2/P3` or project-defined ordered enums. Keep level order stable.
- Pyramid/funnel/stack shapes must preserve aspect ratio and meaningful layer order.
- Kanban lanes default `3-4` priority columns; visible cards per lane `3-5` before `+N` and drawer.
- Strategy layers default `L1/L2/L3`; visible depth `<=3` in the card body. Deeper trees use fullscreen/drawer/table.

## 8. Visual And Interaction Rules

Visual rules:

- Use light analytical surfaces only when the matrix needs bounded objects, reduced borders, 6-8px radius unless the project token says otherwise, optional restrained shadow, and muted gridlines.
- Use semantic palettes: priority/severity may use red/orange/blue/green; strategy layers may use blue/green/orange; matrix intensity uses sequential or diverging scales.
- Do not encode semantic meaning only through hue. Add text, icon, shape, label, or tooltip.
- Avoid large gradients, glass blur, glow, abstract AI icons, heavy background decoration, and identical decorative card piles.
- Body graphics should be calm: points, cells, bars, rings, and lines are lightweight; reference lines and axes are visible but secondary.

Interaction rules:

- Hover/focus reveals exact object/cell values, classification rule, threshold, source/freshness, and action hint.
- Click opens object/cell detail, filtered table, drawer, or action route.
- Brush/zoom/fullscreen is required for dense scatter, heatmap, tree, or kanban.
- Local control changes must preserve component schema unless declared as a `perspective-switch`.
- Selected object must reset or show stale-selection state when filters remove it from scope.

## 9. Sample Coverage Matrix

| Sample family | Reusable abstraction | `matrixDecisionCardPattern` coverage | Why it works |
| --- | --- | --- | --- |
| Quadrant customer cards | Two axes classify customer groups, with KPI/ring/bubble/trend variants | `quadrant-kpi-grid-card`, `quadrant-trend-compare-card`, `quadrant-share-ring-card`, `quadrant-bubble-priority-card` | Axes explain the classification, each quadrant has bounded evidence, color is category identity rather than decoration. |
| Metric matrix cards | Rows/columns cross dimensions and show value, delta, intensity, rating, support, bubble, or trend | `metric-heatmap-matrix-card`, `metric-delta-matrix-card`, `rating-matrix-card`, `boolean-support-matrix-card`, `bubble-magnitude-matrix-card`, `sparkline-trend-matrix-card` | Tables become analytical because the matrix has color/shape semantics, legends, exact cells, and bounded density. |
| Priority cards | P0-P3 levels drive operational focus, list/detail/action, timeline, share, kanban, or trend | `priority-summary-card`, `priority-detail-list-card`, `priority-pyramid-card`, `priority-quadrant-card`, `priority-timeline-card`, `priority-donut-list-card`, `priority-kanban-swimlane-card`, `priority-trend-card` | Priority order is visible and action-oriented; values and task rows make the design operational rather than ornamental. |
| Strategy layer cards | L1/L2/L3 layers structure strategy, goals, actions, dependency, progress, and completion | `strategy-pyramid-card`, `strategy-hierarchy-list-card`, `strategy-goal-breakdown-card`, `strategy-matrix-card`, `strategy-timeline-card`, `strategy-funnel-layer-card`, `strategy-stack-card`, `strategy-dependency-tree-card` | Layer hierarchy creates a mental model; progress and dependencies tie abstract strategy to executable evidence. |

## 10. Binding Contract

Implementation-ready mappings must include:

```ts
type MatrixDecisionEvidenceBinding = {
  matrixDecisionTask:
    | 'quadrant-segmentation'
    | 'metric-matrix-judgment'
    | 'priority-classification'
    | 'strategy-layering'
    | 'portfolio-prioritization'
    | 'action-routing'
    | 'decision-detail-evidence';
  objectGrain: string;
  objectFields: string[];
  axisFields?: string[];
  rowDimensionFields?: string[];
  columnDimensionFields?: string[];
  levelFields?: string[];
  priorityFields?: string[];
  strategyLayerFields?: string[];
  parentChildFields?: string[];
  metricFields: string[];
  scoreFields?: string[];
  statusFields?: string[];
  xMetricField?: string;
  yMetricField?: string;
  sizeMetricField?: string;
  colorField?: string;
  thresholdRule: string;
  classificationRule: string;
  orderRule?: string;
  densityLimit: string;
  labelRule: string;
  tooltipPayload: string[];
  exactValueRoute: string;
  localControls?: string[];
  rendererOwner:
    | 'echarts'
    | 'antv-s2'
    | 'project-table'
    | 'project-list'
    | 'project-card'
    | 'data-driven-custom-diagram';
  fallback: string;
  validationCases: string[];
};
```

## 11. Acceptance Gates

MUST/fail:

- `RPT-MATRIX-PATTERN-MISSING`: a matrix decision card lacks `analysisPerspective: matrixDecision`, `matrixDecisionCardPattern`, or `matrixDecisionEvidenceBinding`.
- `RPT-MATRIX-AXIS-MISSING`: quadrant or priority matrix lacks required axis/dimension fields, units, threshold/reference values, or direction semantics.
- `RPT-MATRIX-CLASSIFICATION-MISSING`: priority, layer, quadrant, or cell state lacks a deterministic `classificationRule`.
- `RPT-MATRIX-EXACT-VALUE-MISSING`: cells, points, levels, or task rows have no tooltip/detail/table/export route.
- `RPT-MATRIX-DENSITY-UNBOUNDED`: matrix rows/columns, points, lanes, levels, tree nodes, or cards exceed the visible budget without aggregation, scroll, fullscreen, drawer, or table fallback.
- `RPT-MATRIX-MISSING-ZERO-CONFLATED`: heatmap/matrix cells do not distinguish missing from zero when both are possible.
- `VIS-MATRIX-AI-POLISH`: visual polish depends on generic gradients, glass/glow, decorative icons, or repeated card shells without data-driven classification.
- `VIS-MATRIX-SCAFFOLD-OBSCURED`: axes, row/column labels, layer order, priority order, legend, or threshold lines are hidden by controls, labels, cards, or decorative fills.

SHOULD/exception-required:

- Use `2-4` local control options as capsules; collapse to dropdown for longer labels or `>4` options.
- Keep visible priority/strategy levels to `3-4`; deeper structures use expand, drawer, fullscreen, or table.
- Keep matrix rows and columns to `4-8` each for first-read cards unless virtual scroll/fullscreen is declared.
- Keep support facts to `2-4` and permanent labels to key cells/points only.

MAY/optional:

- Add mini trends, rings, badges, or list rows when they prove the classification and do not compete with the main scaffold.
- Add comparison/baseline mode when fields and exact-value routes are available.
- Add action buttons for priority/workflow cards when owner, action, permission, and closure state are declared.

## 12. Fallback Order

When the card does not fit or data is incomplete:

1. Remove decorative icons, helper copy, footer notes, and secondary statistics.
2. Collapse local controls to one dropdown.
3. Hide ordinary labels while keeping tooltip/detail.
4. Reduce visible objects to Top N or current selection plus `+N`.
5. Aggregate long-tail cells/categories to `其他` where valid.
6. Move exact evidence to drawer/table/fullscreen.
7. Split into a full chart/table/detail block.
8. Downgrade to KPI, ranking, comparison, operational list, or detail table if matrix classification cannot be proven.
