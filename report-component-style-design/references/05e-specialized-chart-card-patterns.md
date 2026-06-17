# Specialized Chart Card Patterns

Use this reference when screenshots or requirements show reusable card-level patterns for specialized analytical charts: gauge/progress, choropleth map with ranking, time heatmap, candlestick/K-line with volume, boxplot distribution, parallel-coordinate profile, and bubble opportunity charts. The source images are temporary visual evidence; the durable standard is this text contract.

Boundary: when a map, scatter, bubble, or other specialized geometry is supporting evidence inside a KPI-first horizontal card, use `references/04a-kpi-card-patterns.md` with `kpiCardPattern: 'horizontal-axis-scatter-diagnostic'` or `kpiCardPattern: 'horizontal-spatial-map-diagnostic'` instead of treating it as a full specialized chart card. When a map is packaged as a spatialDistribution card with KPI rails, Top lists, local controls, coverage, trend, structure, or migration evidence, use `../../report-component-design-spec/references/06-spatial-analysis-map-card-standard.md` with `spatialAnalysisCardPattern` and `visualType: 'spatial-map-card'`. Use this file when the specialized chart body is the primary object and KPI values are only a metric strip, header summary, or side evidence panel.

Pair with:

- `05b-echarts-combo-pie-radar-gauge.md` for gauge-specific rules.
- `05c-echarts-specialized-and-flow.md` for scatter/bubble, parallel coordinates, map, candlestick, boxplot, and heatmap rules.
- `10-in-component-controls.md` when the card owns a local period, range, metric, or scope selector.
- `12d-placement-specialized-charts.md` and exact `12d1`-`12d8` placement files when implementation-ready geometry is required.
- `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` when converting visual samples into text-only contracts.

## Pattern Identity

Use these stable pattern names:

```ts
type SpecializedChartCardPattern =
  | 'gauge-progress-card'
  | 'choropleth-ranking-map-card'
  | 'time-heatmap-card'
  | 'candlestick-volume-card'
  | 'boxplot-distribution-card'
  | 'parallel-profile-card'
  | 'bubble-opportunity-card';
```

Use:

```ts
componentType: chart
visualType: gauge | map | heatmap | candlestick | boxplot | parallel | scatter
specializedChartCardPattern: one of the controlled values above
```

Recommended chart mapping:

| Pattern | Recommended `visualType` | Primary task |
| --- | --- | --- |
| `gauge-progress-card` | `gauge` | Judge one bounded completion, progress, or status metric against target/range. |
| `choropleth-ranking-map-card` | `map` | Show geographic distribution and exact Top N regional ranking together. |
| `time-heatmap-card` | `heatmap` | Find intensity hotspots across two time dimensions such as weekday and hour. |
| `candlestick-volume-card` | `candlestick` | Read OHLC movement, moving averages, and volume context for a financial series. |
| `boxplot-distribution-card` | `boxplot` | Compare spread, median, IQR, and outliers across categories. |
| `parallel-profile-card` | `parallel` | Compare object profiles across `3+` dimensions and find similarity/anomaly. |
| `bubble-opportunity-card` | `scatter` | Compare x/y opportunity position with a third size metric. |

Do not use these patterns to make ordinary dashboards look more advanced. Specialized charts are valid only when the chart family is the simplest truthful way to answer the business question. Use basic chart cards, KPI cards, tables, or detail drawers when the question is ranking, trend, exact audit, or a small part-to-whole composition.

## Why These Designs Feel Strong

- The chart family has a real analytical reason. Gauge means bounded progress, map means geography, heatmap means two-dimensional intensity, K-line means OHLC, boxplot means distribution, parallel coordinates mean multi-metric profiles, and bubble means x/y/size opportunity.
- The card solves one visual problem at a time. It does not add chart types for variety.
- The geometry is preserved. Arcs, maps, heatmap cells, candlesticks, whiskers, parallel axes, and bubbles are not stretched into decorative shapes.
- The exact-value path is visible. Side metric lists, ranking panels, legends, tooltips, and hover states prevent the chart from becoming pure illustration.
- Local controls are quiet and card-scoped. Period, range, granularity, or scope controls sit in the title-right slot and do not pretend to be page-level filters.
- Color is data semantics, not decoration. Sequential scales, status colors, rise/fall colors, group colors, and bubble sizes all map to named fields.
- Density is bounded. When category count, sample count, or mark count exceeds the card budget, the component switches to sampling, dataZoom, aggregation, fullscreen, detail table, or a simpler chart.
- ECharts owns the marks. The card may style the surface, header, and summary panel, but chart marks, scales, axes, legends, visualMap, tooltips, and resize lifecycle must be data-driven.
- The card looks designed because text, numbers, legend, and controls each have a job. Nothing is filler.

## Pattern Selection

| User need | Choose |
| --- | --- |
| One progress/completion/attainment metric needs range and target judgment | `gauge-progress-card` |
| Region, province, city, store area, or other geography is the decision dimension | `choropleth-ranking-map-card` |
| Activity, load, risk, utilization, or demand should be read by day/hour, cohort/period, or category/time cells | `time-heatmap-card` |
| OHLC price/quote movement, moving averages, and volume are required | `candlestick-volume-card` |
| Category distribution, stability, spread, and outliers matter more than totals | `boxplot-distribution-card` |
| Products, customers, regions, or accounts must be compared across `3+` normalized metrics | `parallel-profile-card` |
| Market opportunity, portfolio position, efficiency frontier, or risk-return relation needs x/y plus size | `bubble-opportunity-card` |

## Shared Card Anatomy

Every specialized chart card should declare:

1. Card surface: quiet white/light surface, subtle border, inherited radius and shadow, and no decorative background that competes with the plot.
2. Header: title left; optional unit subtitle, local selector, menu, or range control right.
3. Chart body: one ECharts-owned viewport with fixed minimum height, resize lifecycle, and collision-safe labels.
4. Supporting evidence: legend, value list, ranking panel, status metric list, or scale legend that explains the visual encoding.
5. Exact-value path: tooltip, selected mark, brush result, detail drawer, fullscreen, or table fallback.
6. Density strategy: limits for regions, cells, samples, dimensions, categories, and visible labels.
7. State behavior: loading, empty, error, no-permission, missing data, dense data, stale selection, and unsupported geometry.

## Size And Placement

Default desktop sizes:

| Pattern | Size rule |
| --- | --- |
| `gauge-progress-card` | Width `640-1100px`; height `220-320px`; gauge body `>=50%` of width; side evidence panel `160-240px`. |
| `choropleth-ranking-map-card` | Width `720-1200px`; height `240-360px`; map viewport `>=55%` of width; ranking panel `180-260px`. |
| `time-heatmap-card` | Width `720-1200px`; height `220-320px`; heatmap grid supports `7 x 24` cells; cell min `10 x 10px`; color legend `40-72px`. |
| `candlestick-volume-card` | Width `760-1280px`; height `260-380px`; main K-line plot `60-72%` of plot height; volume band `18-28%`; indicators `<=3`. |
| `boxplot-distribution-card` | Width `720-1200px`; height `240-340px`; categories `3-8` ordinary, `9-16` with dataZoom or scroll. |
| `parallel-profile-card` | Width `760-1280px`; height `260-380px`; dimensions `3-8` preferred, `9-12` max with rotated/short labels; samples default `<=100` unless aggregated. |
| `bubble-opportunity-card` | Width `720-1200px`; height `240-360px`; bubbles `<=50` ordinary, `<=120` with opacity/sampling; size legend `100-180px`. |

Mobile fallback:

- Collapse side evidence panels below the chart when width is under `520px`.
- Replace title-right segmented controls with a compact dropdown when title and control collide.
- Hide permanent value labels before shrinking axis text below readable size.
- Use fullscreen/detail table for map, K-line, boxplot, parallel, or dense bubble charts when the viewport cannot preserve geometry.

## Pattern Rules

### Gauge Progress Card

Use for one bounded progress, completion, attainment, or status metric.

Rules:

- The metric must have `minValue`, `maxValue`, and clear business direction. If the metric is unbounded, do not use gauge.
- Use a semicircle or compact arc when the card is wide. Keep the center value and label readable.
- A target marker is allowed only when the target has a named source and unit.
- Put exact current value, target value, and comparison change in a side evidence list or tooltip.
- Do not place multiple independent gauges in one card unless they share one status question and fit the same scale.

Required fields:

- `metric_id`, `metric_name`, `current_value`, `min_value`, `max_value`, `unit`, `period`.
- Optional: `target_value`, `completion_rate`, `comparison_value`, `comparison_rate`, `status`, `thresholds`.

### Choropleth Ranking Map Card

Use when geography itself matters and regional distribution needs a map.

Rules:

- Declare geographic grain, region code or lon/lat fields, and map resource/projection.
- Use a sequential color scale with explicit bins or continuous visualMap. Do not assign arbitrary colors by region.
- Keep region labels sparse. Use hover tooltip for exact values and missing data.
- Pair the map with a Top N ranking panel when exact leaders matter.
- Missing or unrecognized geographies must have an explicit display rule such as muted fill, "unmatched", or table-only fallback.

Required fields:

- `region_id`, `region_name`, `geo_code` or `lon`/`lat`, `value`, `unit`, `period`.
- Optional: `rank`, `share`, `comparison_value`, `comparison_rate`, `parent_region`.

### Time Heatmap Card

Use for two-dimensional intensity over time, utilization, risk, load, activity, or demand.

Rules:

- The row and column dimensions must be ordered and named. For hour heatmaps, keep hour labels in consistent intervals.
- Use one continuous visualMap scale and reserve high/low labels for the legend.
- Distinguish missing from zero. Missing cells should not look like low-value cells.
- Permanent cell labels are hidden by default; use tooltip for exact cell value, denominator, and period.
- If cell count exceeds readable density, aggregate, sample, use calendar heatmap, or offer fullscreen/table fallback.

Required fields:

- `row_dimension`, `column_dimension`, `value`, `unit`, `aggregation_grain`, `period`.
- Optional: `denominator`, `sample_count`, `missing_flag`, `baseline_value`, `hotspot_flag`.

### Candlestick Volume Card

Use only for ordered OHLC price, quote, or market data.

Rules:

- The card must declare `open`, `high`, `low`, `close`, time grain, instrument, market, and unit.
- Rise/fall colors must follow the project's market convention and stay consistent with tooltip labels.
- Moving averages are limited to the lines users actually compare, usually `MA5`, `MA10`, and `MA20`.
- The volume band belongs below the main K-line plot and shares the time axis.
- Dense histories require dataZoom, recent-window defaults, or fullscreen. Do not squeeze all labels into one card.

Required fields:

- `time`, `open`, `high`, `low`, `close`, `volume`, `instrument_id`, `instrument_name`, `market`, `unit`.
- Optional: `ma5`, `ma10`, `ma20`, `turnover`, `adjustment_type`, `period_grain`.

### Boxplot Distribution Card

Use when spread, median, IQR, and outliers are more important than totals.

Rules:

- Use raw samples or precomputed statistics, but declare which one owns calculation.
- Show Q1, median, Q3, whiskers, and outliers with a consistent rule.
- Do not use boxplot for tiny sample sizes. Mark small-N categories or fall back to strip/table/detail.
- Keep y-axis unit and category labels visible; use tooltip for exact statistics.
- Outliers should be visible but quieter than the box and median unless outlier investigation is the primary task.

Required fields:

- `category_id`, `category_name`, `unit`, `sample_count`, plus either raw `sample_value` rows or `q1`, `median`, `q3`, `lower_whisker`, `upper_whisker`.
- Optional: `outlier_value`, `outlier_id`, `iqr_rule`, `period`, `group_name`.

### Parallel Profile Card

Use for comparing selected objects across multiple metric dimensions.

Rules:

- Require at least `3` metric dimensions. Under `3`, use scatter, bar, or table.
- Dimension order should match the decision story, not source-column order.
- Declare whether axes use independent ranges or standardized scores.
- Limit visible samples, lower opacity, and use group color or selected highlight to prevent line clutter.
- Brush/filter behavior must declare whether it updates only this card or triggers a detail table/drawer.

Required fields:

- `object_id`, `object_name`, `dimension_id`, `dimension_name`, `value`, `unit`, `axis_min`, `axis_max`.
- Optional: `group_id`, `group_name`, `score_direction`, `normalized_value`, `selected_flag`, `sample_count`.

### Bubble Opportunity Card

Use for x/y relationship plus a third size metric, especially market opportunity, portfolio, risk-return, or efficiency comparisons.

Rules:

- X, y, and size metrics must have named business meaning and units.
- Bubble size must map to a non-negative metric. Do not encode negative values as radius.
- Use quadrant lines, baseline, target bands, or annotations only when they have business thresholds.
- Labels should appear for selected, Top N, or outlier bubbles only. Full labels for all points are allowed only when `N <= 8`.
- Include size legend or tooltip size explanation so users can read the third metric.

Required fields:

- `object_id`, `object_name`, `x_value`, `x_unit`, `y_value`, `y_unit`, `size_value`, `size_unit`, `period`.
- Optional: `group_id`, `group_name`, `quadrant`, `target_x`, `target_y`, `rank`, `outlier_flag`.

## Data And Interaction Contract

Every mapping that uses `specializedChartCardPattern` must include:

```ts
type SpecializedChartCardContract = {
  specializedChartCardPattern: SpecializedChartCardPattern;
  visualType: 'gauge' | 'map' | 'heatmap' | 'candlestick' | 'boxplot' | 'parallel' | 'scatter';
  dataGrain: string;
  metricFields: string[];
  dimensionFields: string[];
  geometryFields: string[];
  scaleRule: string;
  legendRule: string;
  tooltipFields: string[];
  localControls?: string[];
  densityLimit: string;
  rendererOwner: 'echarts';
  fallback: string;
};
```

Interaction rules:

- Hover tooltip must include displayed value, unit, period, source grain, active local controls, and missing/estimated flags when present.
- Click/brush interactions must declare emitted event, payload fields, permission behavior, stale-state behavior, and whether the target is tooltip, drawer, fullscreen, or table.
- Local card controls must preserve the same component schema unless they are explicitly classified as perspective switches.

## ECharts Implementation Notes

- Use ECharts series types that match the visual family: `gauge`, `map`, `heatmap`, `candlestick`, `boxplot`, `parallel`, or `scatter`.
- Use `visualMap` for map and heatmap scale. Use `symbolSize` callback for bubble size.
- Use `dataset` and `encode` when the project style supports it; otherwise keep a documented data adapter.
- Call `resize()` after container size changes, tab changes, drawer/fullscreen transitions, and local filter updates.
- Do not draw primary marks with CSS divs, SVG decoration, or background images when ECharts is available.

## Anti-AI Gate

Reject or revise the component when any of these are true:

- The chart type is chosen because it looks advanced rather than because the data shape requires it.
- The card lacks the fields needed to read the chart truthfully, such as gauge min/max, map geo code, heatmap two dimensions, OHLC fields, boxplot statistics, parallel dimensions, or bubble size metric.
- Color, size, line opacity, or legend items are not tied to named fields.
- The card has no exact-value path beyond visual estimation.
- The chart body is squeezed below the minimum size, distorting geometry or hiding axes.
- The local control changes schema/meaning but is documented as a simple filter.
- A simpler chart or table would answer the question with less ambiguity.

## Acceptance Checklist

- Pattern value is one of the `SpecializedChartCardPattern` controlled values.
- `componentType: chart` and `visualType` is the real chart family.
- Required data fields and grain are declared.
- Scale, legend, tooltip, local controls, and fallback are specified.
- ECharts owns the chart marks and resize lifecycle.
- Density and responsive fallback are defined.
- Missing, zero, outlier, and no-permission states are covered.
- The card can be generated from text contracts without keeping the source screenshot.
