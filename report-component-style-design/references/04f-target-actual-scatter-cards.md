# Target/Actual Scatter Card Patterns

Use this reference when a KPI headline grows into a complete scatter relationship card with actual points, comparison points, target/trend reference line, local period switch, axes, and bottom target/actual/comparison summary. It captures cards such as sales amount with `实时 / 月累 / 年累`, object-level scatter distribution, same-period gray points, actual blue points, target dashed line, and reconciled totals.

This is a card-level composition pattern. Pair it with:

- `04-kpi-metric-cards.md` for headline metric fit and value-anchor rules.
- `05c-echarts-specialized-and-flow.md` for ECharts scatter/bubble implementation and renderer ownership.
- `12d3-placement-scatter-bubble.md` for scatter axes, point density, reference lines, trend line, and tooltip rules.

## Pattern Identity

Do not create a new `visualType`. Use:

```text
componentType: chart
visualType: scatter
chartSubtype: target-actual-scatter
targetActualScatterCardPattern: one of the values below
```

| `targetActualScatterCardPattern` | Use when | Visual structure |
| --- | --- | --- |
| `emphasis-filter-scatter` | One relationship card is the lead first-read object and brand emphasis is allowed. | Brand/emphasis header, local period switch, scatter plot, target/trend reference line, bottom summary rows. |
| `standard-filter-scatter` | Enterprise workbench or ordinary report cards need repeatable clarity and calmer styling. | Neutral card, compact KPI headline, icon/action, local period switch, scatter plot, bottom summary rows. |

Selection order:

1. Use `emphasis-filter-scatter` for the primary card when the metric must be the strongest first-read object and a single emphasis surface is acceptable.
2. Use `standard-filter-scatter` when the card appears in a grid, must repeat across pages, or needs calmer enterprise styling.
3. If the task is pure time movement, use target/actual trend card instead.
4. If the task is pure composition, use donut/stacked bar/table instead.
5. If exact row audit is primary, use table/detail drawer and keep scatter as an overview only.

## Business Purpose

The card must answer one complete question:

```text
How are objects distributed against a target/reference relationship, and how does the current distribution compare with the comparison period?
```

Valid business uses:

- Store, product, customer, salesperson, region, order group, or campaign distribution by two numeric metrics.
- Current actual points compared with same-period or prior-period points.
- A target, plan, regression, average, or warning reference line that helps judge whether points are above/below expectation.
- Lead KPI cards where the current total is important but the decision also depends on spread, clusters, outliers, or correlation.

Invalid uses:

- Only one numeric metric exists. Use KPI, bar, or table.
- The x-axis is categorical rather than numeric. Use bar/boxplot/table.
- Time movement is the main question. Use line/bar trend.
- There are too many points without sampling, aggregation, zoom, brush, or density fallback.

## Required Data Contract

Implementation-ready cards require:

```ts
type TargetActualScatterCardPattern =
  | 'emphasis-filter-scatter'
  | 'standard-filter-scatter';

type TargetActualScatterCardContract = {
  targetActualScatterCardPattern: TargetActualScatterCardPattern;
  metricId: string;
  metricName: string;
  currentValueField: string;
  unit: string;
  periodField: string;
  localPeriodOptions?: Array<'realtime' | 'monthToDate' | 'yearToDate' | string>;
  objectIdField: string;
  objectNameField: string;
  xMetricField: string;
  xMetricName: string;
  xUnit: string;
  actualYValueField: string;
  comparisonYValueField?: string;
  yMetricName: string;
  yUnit: string;
  sizeMetricField?: string;
  categoryField?: string;
  comparisonLabel?: string;
  targetLineField?: string;
  targetLineFormula?: string;
  targetTotalField?: string;
  comparisonTotalField?: string;
  attainmentRateField?: string;
  gapField?: string;
  changeRateFields?: Array<'yoy' | 'mom' | 'baseline'>;
  targetDirection: 'good-when-higher' | 'good-when-lower' | 'bounded-range';
  objectGrain: string;
  sourceDataset: string;
  numericFormatContractIds: string[];
  tooltipPayload: string[];
  summaryItems: Array<'comparison' | 'actual' | 'target' | 'attainment' | 'gap'>;
  stateRules: string[];
};
```

Data rules:

- `objectIdField` and `objectNameField` must identify each point. Do not render anonymous points when drilldown or tooltip claims object evidence.
- `xMetricField`, `actualYValueField`, and `comparisonYValueField` must share object grain, period context, and active filter scope.
- `targetLineField` or `targetLineFormula` must be data-driven. The dashed line may be a target curve, threshold, average, fitted trend, or plan reference, but it must state which one.
- The headline `currentValueField` must reconcile with selected actual points, selected period total, latest cumulative value, or explicitly stated snapshot.
- Tooltip must include object name, X metric, actual Y metric, comparison Y metric when available, target/reference value, target gap, active local period, source, and freshness.
- Do not store dynamic KPI values, scatter point values, target line values, or attainment rates in filter option metadata.

## Shared Anatomy

All patterns use these zones:

| Zone | Rule |
| --- | --- |
| Header metric | Icon/title, primary value, unit, comparison indicator, and optional local period switch. It owns the first read. |
| Local period switch | `实时 / 月累 / 年累` or equivalent; affects only this card or declared local card group. |
| Scatter plot | ECharts owns axes, grid, points, target/trend line, tooltip, hover, update, and resize behavior. |
| Point encoding | Actual points use the primary brand color; comparison points use muted gray; optional category color must stay limited. |
| Reference line | Target/trend/average line is dashed or weak and explains expected relationship. It cannot overpower the point cloud. |
| Summary values | Bottom summary for comparison, actual, target, attainment, or gap. Values must reconcile with chart context. |
| Disclosure/action | Tooltip, focus, drawer, brush, zoom, or detail route for formula, source, freshness, and exact object rows. |

Decision structure:

```text
headline metric -> local period -> object distribution -> target/reference relationship -> total reconciliation
```

## Pattern: `emphasis-filter-scatter`

Use for a lead card that should feel branded and analytical without turning the scatter into decoration.

Layout:

- Brand/emphasis header contains icon, metric label, local period switch, primary value, and comparison.
- Scatter body stays white/neutral so axes, grid, point cloud, and target line remain readable.
- Target/reference line sits inside the chart, not as a DOM decoration.
- Bottom summary uses compact rows for comparison, actual, target, attainment, or gap.

Strength:

- Strong first read plus relationship evidence.
- The card feels designed because the dense point cloud is contained inside a calm, measured chart area.

Rules:

- Use one primary card per view, or a small number of deliberately prioritized lead cards.
- Header and local switch height must be budgeted; they cannot squeeze the scatter plot below `12d3-placement-scatter-bubble.md` plot floors.
- Do not add a wave/divider unless the scatter plot still has enough vertical space. This pattern usually works better with a clean hard header/body boundary.
- Keep target/trend line weaker than actual points; it is a reference, not the main data.

## Pattern: `standard-filter-scatter`

Use for enterprise cards where users compare several relationship cards or need calmer repeated components.

Layout:

- Header is neutral, with icon/title left and local period switch right.
- Primary value and comparison sit under the header.
- Scatter plot occupies the middle body with full axes and grid.
- Bottom panel or row summary contains label/value pairs.

Strength:

- Most repeatable and easiest to implement across dashboards.
- Good for multi-card grids where a full blue header would become visually loud.

Rules:

- Top icon/action must have a detail route, drawer, fullscreen, or configured action when clickable; otherwise use it as a static metric icon only.
- Bottom summary can show `comparison`, `actual`, and `target`; keep visible row count `2-4`.
- If bottom summary crowds the plot, move secondary values to tooltip/drawer and keep actual + target as the visible pair.
- Use chart tooltip or detail drawer for exact object rows; do not print object labels on every point.

## ECharts Encoding

Default encoding:

```text
comparison points: muted gray scatter series
actual points: brand-primary scatter series
target/reference: dashed line series or markLine
summary: comparison total, actual total, target total
```

Rules:

- Use ECharts `series.type: 'scatter'`, data-driven `xAxis`, `yAxis`, `dataset` or `series.data`, `tooltip`, `legend`, `markLine` or line series, `dataZoom`/`brush` when needed, and emphasis/blur behavior.
- Do not hand-draw points, axes, grid, reference lines, legends, or tooltips while claiming ECharts chart ownership.
- X and Y axes must state metric names and units through subtitle, axis title, or tooltip metadata.
- Point count `N <= 50` may show normal radius and key labels. `51-300` hides ordinary labels. `>300` needs opacity reduction, zoom/brush, sampling, aggregation, density plot, or table fallback.
- Default point radius is `4px`; hover radius `6px`; actual opacity `65%-85%`; comparison opacity `35%-55%`.
- Target/trend line is optional but must be data-driven and named: target, plan, average, regression, warning, or forecast reference.

## Size And Density

Minimum useful card size:

| Tier | Width | Height | Use |
| --- | ---: | ---: | --- |
| Compact | `240-300px` | `360-440px` | Mobile/narrow card, fewer points, compact summary. |
| Standard | `300-420px` | `400-560px` | Full card with local switch, axes, scatter, target line, and bottom summary. |
| Wide | `420px+` | `360px+` | Desktop card or grid panel with more points and richer axis labels. |

Fit rules:

- Headline metric must remain readable before local switch or point styling is tuned.
- Scatter plot body should stay `>=220px` when axes, grid, target/reference line, and bottom summary are visible.
- Plot height should meet the scatter floors from `12d3-placement-scatter-bubble.md`.
- Bottom summary must not leave fewer than three readable y-axis tick regions.
- If the component is too small for axes + point cloud + summary, use a KPI card with a sparkline/top outlier note or move scatter to fullscreen/detail.

## Anti-AI Gate

This card fails when:

- It looks like a scatter card but lacks two numeric metrics, object grain, target/reference line definition, or source.
- Points are random decoration, hard-coded, evenly fake, or unrelated to the summary totals.
- The target line is an unlabeled decorative diagonal and cannot be traced to data or formula.
- Actual and comparison points use inconsistent filters, periods, or object grains.
- Axis labels/units are missing, making the point cloud impossible to interpret.
- The local period switch changes only UI state while the data remains unchanged.
- The header/icon/gradient is visually stronger than the actual distribution evidence.

Countermeasure:

```text
current value -> local period -> object points -> target/reference line -> outliers/clusters -> reconciled totals
```

## State Rules

Required states:

- Loading: preserve header skeleton, local switch, axes/grid skeleton, point placeholders, and summary skeleton separately.
- Empty: explain which selected period/object scope has no data and offer reset when filters caused it.
- Missing target: keep actual/comparison points and hide target/reference line; show target unavailable state.
- Missing comparison: keep actual points and target/reference line; show comparison unavailable state.
- Missing X or Y value: do not draw that point; disclose omitted count in tooltip/detail/state.
- All X or Y values identical: add fallback axis range so points do not collapse into one line.
- Too many points: hide labels, lower opacity, aggregate/sample, enable zoom/brush, or switch to density/table.
- Extreme values: mark as outlier, use zoom/brush, or explain axis range in tooltip.
- No permission: keep card shell and state message; do not leak restricted values through tooltip or summary.
- Stale data: show freshness/source note when values may lag.

## Acceptance Checklist

Before marking ready:

- `visualType` is `scatter`, `chartSubtype` is `target-actual-scatter`, and `targetActualScatterCardPattern` is one of the controlled values.
- The card answers a named target-vs-actual relationship/distribution business question.
- Headline value, actual points, comparison points, target/reference line, and bottom summary reconcile under the same active filters and local period.
- Numeric display contracts exist for headline, X metric, actual Y, comparison Y, target/reference, gap, and visible change-rate values.
- ECharts owns points, axes, grid, target/reference line, legend, tooltip, hover, update, and resize behavior.
- X/Y axes, units, grid, point cloud, target/reference line, and summary do not overlap or squeeze.
- Missing target/comparison, empty, missing X/Y, all-same axis, too-many-points, no-permission, stale, and outlier states are defined.
- Formula/source/freshness and exact object-level values are available through tooltip or detail route.
