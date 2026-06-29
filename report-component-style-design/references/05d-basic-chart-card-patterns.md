# Basic Chart Card Patterns

Use this reference when screenshots or visual samples show reusable chart cards: simple bars, line trends, area trends, bar-line Combo charts, pie/donut composition cards, stacked bar composition, multi-metric operational Combo cards, and chart cards with a compact local time-range control or tooltip focus. The source images are temporary visual evidence; the durable standard is this text contract.

Boundary: when the card's first-read object is a large KPI value plus comparison, and the line, horizontal bar, scatter, map, or paired comparison evidence sits below/inside as supporting evidence, use `report-component-style-design` `references/04a-kpi-card-patterns.md` with `kpiCardPattern: 'horizontal-axis-line-trend'`, `kpiCardPattern: 'horizontal-axis-bar-compare'`, `kpiCardPattern: 'horizontal-axis-scatter-diagnostic'`, `kpiCardPattern: 'horizontal-spatial-map-diagnostic'`, or `kpiCardPattern: 'paired-comparison-diagnostic'` instead of treating it as an ordinary chart card. Use this basic chart library when the chart body is the primary object and KPI values are only a metric strip or header summary.

Pair with:

- `05a-echarts-foundation-bars-lines.md` for bars, lines, area charts, axis labels, plot viability, and ECharts lifecycle.
- `05b-echarts-combo-pie-radar-gauge.md` for Combo, pie, and donut chart rules.
- `10-in-component-controls.md` when the card owns a local period/range/metric selector.
- `12c-placement-basic-charts.md` and exact `12c1`-`12c4` placement files when implementation-ready geometry is required.
- `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` when converting visual samples into text-only contracts.

## Pattern Identity

Use these stable pattern names:

```ts
type BasicChartCardPattern =
  | 'single-series-bar-card'
  | 'comparison-line-trend-card'
  | 'area-trend-card'
  | 'bar-line-combo-card'
  | 'pie-composition-card'
  | 'donut-composition-card'
  | 'stacked-bar-composition-card'
  | 'multi-metric-combo-card'
  | 'filtered-bar-card'
  | 'tooltip-line-trend-card';
```

Use:

```ts
componentType: chart
visualType: bar | line | combo | pie
basicChartCardPattern: one of the controlled values above
```

Recommended chart mapping:

| Pattern | Recommended `visualType` | Primary task |
| --- | --- | --- |
| `single-series-bar-card` | `bar` | Compare one metric across a small set of categories. |
| `comparison-line-trend-card` | `line` | Compare two or more trend series over the same time grain. |
| `area-trend-card` | `line` | Show one continuous volume trend with a soft filled area. |
| `bar-line-combo-card` | `combo` | Read scale and related count/rate trend together. |
| `pie-composition-card` | `pie` | Show part-to-whole composition with a side legend. |
| `donut-composition-card` | `pie` | Show part-to-whole composition plus a center total/summary. |
| `stacked-bar-composition-card` | `bar` | Compare composition totals across categories with stack segments. |
| `multi-metric-combo-card` | `combo` | Compare two scale metrics plus one rate/efficiency metric. |
| `filtered-bar-card` | `bar` | Compare categories with a local time/range selector. |
| `tooltip-line-trend-card` | `line` | Inspect dense daily/rolling trend values through tooltip focus. |

Do not use these patterns for KPI target/actual summary cards that already require `targetActual*Pattern`. Do not use them for exact row audit; use a table or detail drawer when exact records, export, sorting, or many fields are primary.

## Why These Designs Feel Strong

- Each card answers one chart question: compare categories, read trend, inspect composition, or relate scale to rate. It does not mix unrelated visuals for variety.
- The card anatomy is restrained: title left, optional menu/control right, legend/unit in a predictable band, chart body below, tooltip for exact values.
- Ordinary multi-series axis-chart legends default to top center above the plot; single-series charts normally hide the legend and use the chart title/subtitle to state the metric. Y-axis units are configured on the axis/unit metadata rather than repeated in every tick label.
- Bounded movement charts such as NPS/score/rate use dynamic Y-axis ranges from current, comparison/same-period, and target/reference values instead of starting from `0` by default.
- The visual hierarchy is practical. The primary data marks are strongest; gridlines, axes, borders, and card shadows stay quiet.
- Color semantics are limited. Blue usually carries the primary series; green/orange/purple are used only for distinct series or composition parts.
- Data labels appear only when the count is small enough. Dense trends use tooltip rather than permanent labels.
- Pie and donut cards have side legends with exact percent/value context, so the slices are not decorative guesses.
- Combo cards use bars for scale and lines for related trend/rate, preserving a real business relationship.
- Local period selectors are small and title-right aligned; they change only the current card and do not behave like page filters.
- The ECharts ownership is clear: bars, lines, areas, slices, stacks, axes, legends, and tooltips are data-driven, not hand-drawn decorative shapes.
- The card is visually calm enough to sit with other report components without looking like a generated one-off.
- KPI-plus-line cards avoid AI flavor when they reserve enough chart height for real axes and thresholds; if the axis chart is squeezed into a decorative strip, route it back to a KPI sparkline or enlarge it into a full chart card.
- KPI-plus-horizontal-bar cards avoid AI flavor when category labels, bar lengths, exact values, target/reference lines, and change-rate evidence share one readable quantitative axis; if the bars are squeezed into decorative strips, route them back to a mini bar KPI or enlarge them into a full chart card.

## Pattern Selection

| User need | Choose |
| --- | --- |
| Compare access, sales, traffic, inventory, or regional totals across `3-8` categories | `single-series-bar-card` |
| Compare selected year/current-vs-previous trend on the same months or periods | `comparison-line-trend-card` |
| Show one volume trend such as active users, traffic, inventory, or usage over time | `area-trend-card` |
| Pair a scale metric with a related count/rate on one time axis | `bar-line-combo-card` |
| Show traffic/source/channel/product composition without center total | `pie-composition-card` |
| Show composition plus a center total, total devices, or selected category summary | `donut-composition-card` |
| Compare category totals and product/channel composition inside each total | `stacked-bar-composition-card` |
| Compare two scale metrics and one rate/efficiency metric over time | `multi-metric-combo-card` |
| Add a compact local period selector to an otherwise simple bar comparison | `filtered-bar-card` |
| Show dense daily/rolling line trend where exact value appears on hover/focus | `tooltip-line-trend-card` |
| Show a large KPI value plus readable axis-line evidence inside one horizontal card | Use `kpiCardPattern: horizontal-axis-line-trend`, not `basicChartCardPattern` |
| Show a large KPI value plus readable horizontal bar evidence inside one horizontal card | Use `kpiCardPattern: horizontal-axis-bar-compare`, not `basicChartCardPattern` |
| Show a large KPI value plus readable scatter diagnosis inside one horizontal card | Use `kpiCardPattern: horizontal-axis-scatter-diagnostic`, not `basicChartCardPattern` |
| Show a large KPI value plus spatial map diagnosis inside one horizontal card | Use `kpiCardPattern: horizontal-spatial-map-diagnostic`, not `basicChartCardPattern` |
| Show a KPI value compared in two mirrored panes with a central `VS` and conclusion strip | Use `kpiCardPattern: paired-comparison-diagnostic`, not `basicChartCardPattern` |

## Shared Card Anatomy

Every basic chart card should declare:

1. Card surface: quiet white/light surface, subtle border, radius, and shadow inherited from the report system.
2. Header: title left; optional menu, local range selector, or action right.
3. Metric/unit band: visible unit, optional legend, and optional summary metric.
4. Chart body: one ECharts-owned plot viewport with measured width and height; when a legend is visible, it defaults to a top-centered band unless the pattern explicitly uses pie/donut side or bottom legend.
5. Axes/geometry: x-axis labels, y-axis labels, gridline budget, pie/donut radius, or stack geometry.
6. Exact-value path: tooltip, selected point, legend, detail drawer, or table fallback.
7. State behavior: loading, empty, error, no-permission, dense data, missing series, denominator zero, and stale selected mark.

## Size And Placement

Default desktop sizes:

| Pattern | Size rule |
| --- | --- |
| `single-series-bar-card` | Width `520-900px`; height `220-320px`; plot body `>=180px`; category count `3-8`. |
| `comparison-line-trend-card` | Width `560-960px`; height `240-340px`; plot body `>=180px`; time points `6-24`. |
| `area-trend-card` | Width `560-960px`; height `240-340px`; plot body `>=180px`; one main series. |
| `bar-line-combo-card` | Width `640-1100px`; height `260-360px`; plot body `>=220px`; series `2-4`. |
| `pie-composition-card` | Width `520-900px`; height `220-320px`; pie area plus side legend; categories `2-6`, max `8` with merge. |
| `donut-composition-card` | Width `520-900px`; height `220-320px`; donut radius after side legend; center text fits inner radius. |
| `stacked-bar-composition-card` | Width `640-1100px`; height `240-340px`; categories `4-10`; stack segments `2-5`. |
| `multi-metric-combo-card` | Width `720-1200px`; height `280-380px`; plot body `>=220px`; legend items `<=4`. |
| `filtered-bar-card` | Width `560-960px`; height `240-340px`; title-right filter height `28-32px`; plot body `>=180px`. |
| `tooltip-line-trend-card` | Width `640-1100px`; height `260-360px`; dense points `14-60`; labels hidden by default. |

Mobile fallback:

- Collapse side legend to bottom legend for pie/donut when width is under `480px`.
- Collapse title-right local selector to a compact dropdown when title no longer fits.
- Hide permanent data labels before shrinking axis or plot text below readable size.
- Use dataZoom, sampling, or table/detail fallback for dense categories instead of cramming labels.

## Pattern Rules

### Single Series Bar Card

Use for small category comparison.

Rules:

- Category order is meaningful: business order, descending value, or explicit source order.
- One primary color is enough for ordinary categories. Do not assign random colors to every bar.
- Permanent value labels are allowed when `N <= 8` and labels pass collision checks.
- The y-axis starts at `0` unless negative values exist.
- Use tooltip for exact value, unit, period, source, and active filters.

Required fields:

- `category_id`, `category_name`, `value`, `period`.
- Optional: `rank`, `comparison_value`, `target_value`.

### Comparison Line Trend Card

Use for current year vs previous year, current period vs baseline, or multiple comparable series.

Rules:

- All series share the same x-axis time grain and ordered time field.
- Normal point radius is `3-4px`; line width is `2px`; hover point may be `5-6px`.
- Legend appears above the plot and uses stable series names.
- Avoid filled areas when the task is series comparison; use plain lines for readability.
- Tooltip uses `trigger: 'axis'` and lists every series value with unit.

Required fields:

- `time_period`, one numeric value field per series, `series_name` or wide-to-long series metadata.
- Optional: `baseline_type`, `year`, `comparison_period`.

### Area Trend Card

Use for one continuous trend where volume movement is the story.

Rules:

- Use one main line plus a soft area fill. The area fill should fade toward the baseline.
- Do not use area fill for multiple competing series unless stacking/composition is explicitly required.
- Permanent labels are normally hidden; use tooltip for exact values.
- Smooth line is allowed only when it does not imply fake precision; jagged operational data should keep actual points.
- The baseline remains visible and the area does not overpower axis labels.

Required fields:

- `time_period`, `value`, `unit`.
- Optional: `moving_average`, `anomaly_flag`, `selected_point`.

### Bar Line Combo Card

Use when one scale metric and one related count/rate metric must be read together.

Rules:

- Bars encode the primary scale metric; the line encodes related count, rate, or efficiency.
- Dual y-axis is allowed only when units differ and the relationship is explicit.
- Legend items are limited to the visible series and should not duplicate axis unit labels.
- Bar and line data come from the same ordered rows.
- Tooltip lists bar metrics first, then line/rate metric, then target/reference when present.

Required fields:

- `time_period`, `bar_value`, `bar_unit`, `line_value`, `line_unit`.
- Optional: `right_axis_unit`, `target_value`, `attainment_rate`.

### Pie Composition Card

Use for part-to-whole composition when a center total is unnecessary.

Rules:

- Category count is normally `2-6`; merge long tail to `其他`.
- Slice order follows value descending or declared business order; `其他` stays last.
- The side legend shows category, marker, and percentage/value.
- Inside labels show only short percentages and hide when slice angle is too small.
- Use ranked bar/table fallback when precise comparison or many categories matter.

Required fields:

- `category_id`, `category_name`, `value`, `percent`, `total_value`.
- Optional: `rank`, `change_rate`.

### Donut Composition Card

Use when part-to-whole composition benefits from a center total or selected summary.

Rules:

- Donut center shows total, selected category, Top1 share, or empty/all-zero state.
- Inner radius ratio is normally `0.60-0.66`.
- Right legend is allowed when it leaves enough donut area; otherwise use bottom legend.
- Center text must fit within the inner ring and use tooltip for full value if needed.
- Do not use donut for a single progress metric unless the pattern is explicitly a progress donut.

Required fields:

- `category_id`, `category_name`, `value`, `percent`, `total_value`, `center_label`.
- Optional: `selected_category_id`, `category_status`.

### Stacked Bar Composition Card

Use to compare totals and internal composition across categories.

Rules:

- All stack segments use the same ECharts `stack` value.
- Internal segment joins are square; only the outer visible ends may be rounded when the project style allows.
- Segment count should normally be `2-5`; more segments require merge, selector, or table.
- Legend explains stack segments and stays separate from filters.
- Tooltip shows category total, segment value, segment share, unit, and active period.

Required fields:

- `category_id`, `category_name`, one value field per stack segment or long rows with `segment_id`, `segment_name`, `value`.
- Optional: `category_total`, `segment_share`.

### Multi Metric Combo Card

Use for operational analysis where two scale metrics and one rate/efficiency metric share a time/category axis.

Rules:

- Limit visible series to `<=4`; recommended two bars plus one line.
- Left axis carries scale/count fields; right axis carries rate/percent fields.
- The orange/rate line should not visually dominate the bars unless rate is the primary decision.
- Tooltip must include denominator and rate formula when a percentage is shown.
- If the series are unrelated, split into separate charts.

Required fields:

- `time_period`, `scale_value_a`, `scale_value_b`, `rate_value`, `rate_denominator`.
- Optional: `rate_numerator`, `target_rate`, `comparison_value`.

### Filtered Bar Card

Use for simple category comparison with a local period/range selector.

Rules:

- The local selector belongs to the card and changes only this chart or declared local group.
- Title remains left aligned; selector sits title-right when it fits.
- Unit appears under title or in the chart header metadata.
- Selector state must update chart data, tooltip period, and export/detail payload.
- If the selector changes page-level scope, move it to page/global filter controls.

Required fields:

- `category_id`, `category_name`, `value`, `selected_range`, `unit`.
- Optional: `range_options`, `default_range`, `previous_range_value`.

### Tooltip Line Trend Card

Use for dense daily or rolling trend where exact values are inspected on hover/focus.

Rules:

- Use tooltip focus rather than permanent labels.
- The selected point may show a vertical guide line and tooltip card.
- Local time range dropdown is allowed in the header right side.
- For dense daily data, hide normal point symbols or keep tiny symbols; emphasize only hover/selected points.
- Break lines on missing values; do not convert missing values to `0`.

Required fields:

- `date`, `value`, `unit`, `selected_range`.
- Optional: `tooltip_date_label`, `missing_flag`, `anomaly_flag`.

## Data And Interaction Contract

Every reusable basic chart card should declare:

```ts
type BasicChartCardContract = {
  basicChartCardPattern: BasicChartCardPattern;
  visualType: 'bar' | 'line' | 'combo' | 'pie';
  sourceDataset: string;
  rowGrain: string;
  xField?: string;
  categoryField?: string;
  timeField?: string;
  valueFields: string[];
  seriesField?: string;
  unitFields: string[];
  percentFields?: string[];
  sortRule?: string;
  categoryCountLimit: number;
  visibleSeriesLimit: number;
  legendPlacement: 'top' | 'right' | 'bottom' | 'none';
  labelStrategy: 'all-small-n' | 'key-only' | 'tooltip-only';
  tooltipPayload: string[];
  localControlIds?: string[];
  axisPolicy?: string;
  geometryPolicy?: string;
  fallback: 'table' | 'ranking-list' | 'split-chart' | 'detail-drawer' | 'dataZoom' | 'aggregate-other';
  validationCases: string[];
};
```

Metric-bearing fields must also carry numeric display contracts. Percent/rate fields must declare numerator, denominator, scale, denominator-zero behavior, and formatter owner.

## ECharts Implementation Notes

- Standard chart cards must use ECharts-owned `series`, `xAxis`, `yAxis`, `legend`, `grid`, `tooltip`, `dataset`, `radius`, `center`, or equivalent options.
- Do not implement bars, lines, area fills, slices, stacks, axes, legends, or tooltip guides with static SVG/HTML/CSS when the contract says ECharts.
- Use a measured chart body viewport. The card title, control, legend, and unit bands must be outside the measured chart body or explicitly reserved inside ECharts `grid`.
- Tooltip is required for every chart card except static illustrative previews; report components should treat tooltip as exact-value evidence.
- Resize after card, tab, drawer, fullscreen, legend, or local filter state changes.

## Anti-AI Gate

Reject or revise the chart card when:

- The chart choice is visual variety rather than a named business question.
- A simple category comparison uses many random colors instead of one primary series color.
- A Combo chart pairs unrelated metrics or hides the dual-axis rationale.
- A pie/donut has too many categories, missing denominator, fake percent labels, or no side/bottom legend.
- A stacked bar is simulated with separate bars or has rounded internal seams.
- A local selector changes only the active style but not the data, tooltip, and payload.
- Permanent labels overlap or are forced into dense trends instead of moving exact values to tooltip.
- Units are missing from axis, legend, tooltip, subtitle, or numeric display contract.
- The chart is hand-drawn while the mapping says ECharts.
- The card relies on raw screenshot appearance instead of a text/data/option contract.

## Acceptance Checklist

- `componentType` is `chart`; `visualType` is the real chart family; `basicChartCardPattern` is one of the controlled values.
- The chart declares business question, data grain, value fields, units, source, freshness, and active filters.
- The card declares title/control/legend/unit/plot/tooltip/state slot budgets.
- ECharts axis cards use compact `grid.top/right/bottom/left`, side-placed Y-axis titles, bottom X-axis titles, and target/reference labels inside the plot with `insideEndTop`.
- The category/series count fits the selected pattern or declares a fallback.
- Metric-bearing fields have numeric display contracts.
- ECharts owns visible chart marks and tooltip behavior.
- Loading, empty, error, no-permission, dense data, missing values, and filtered states preserve geometry.
- The raw screenshot is not the durable source of truth; the reusable pattern is captured in text fields and contract rules.
