# Target/Actual Trend Card Patterns

Use this reference when a KPI headline grows into a complete trend card with an actual line, comparison line, target/reference line, legend, axes, and bottom summary. It captures patterns such as sales amount cards with current value, YoY/MoM, actual trend, prior-period trend, target trend, and reconciled summary values.

This is a card-level composition pattern. Pair it with:

- `04-kpi-metric-cards.md` for headline metric fit and value-anchor rules.
- `05a-echarts-foundation-bars-lines.md` for ECharts line implementation, renderer ownership, and resize proof.
- `12c2-placement-line-trends.md` for line chart placement, axis, legend, target/reference line, and plot budget.

## Pattern Identity

Do not create a new `visualType`. Use:

```text
componentType: chart
visualType: line
chartSubtype: target-actual-trend
targetActualTrendCardPattern: one of the values below
```

| `targetActualTrendCardPattern` | Use when | Visual structure |
| --- | --- | --- |
| `emphasis-wave-trend` | One trend card is the lead first-read object and brand emphasis is allowed. | Brand/emphasis header, soft wave divider, neutral chart body, bottom legend/value summary rows. |
| `standard-summary-trend` | Enterprise workbench or ordinary report cards need maximum clarity and reconciliation. | Neutral card, compact KPI headline, full line chart, bottom row/panel summary. |
| `soft-chip-trend` | A lighter mobile or secondary trend card needs exact values without heavy header emphasis. | Soft bordered/tinted surface, full line chart, bottom chip-style summary values. |

Selection order:

1. Use `emphasis-wave-trend` for the primary card when the metric must be the strongest first-read object and the page allows one emphasis surface.
2. Use `standard-summary-trend` when audit clarity, exact target reconciliation, or enterprise density matters most.
3. Use `soft-chip-trend` for secondary cards, mobile-friendly overview, or intentionally softer dashboard surfaces.
4. If target, comparison, or ordered time series data is missing, fall back to a KPI card pattern or a simpler line chart instead of inventing the missing evidence.

## Business Purpose

The card must answer one complete question:

```text
Is the metric trajectory improving and staying on track against target and comparison periods?
```

Valid business uses:

- Sales amount, orders, GMV, profit, budget execution, SLA completion, resource usage, production output, or inventory movement over time.
- Actual trend compared with same period, prior period, plan, forecast, target, budget, or warning threshold.
- Lead KPI cards where the current value alone is not enough; the decision depends on the path toward target.

Invalid uses:

- The x-axis is unordered categories. Use bar, ranking, or table.
- No target/reference or comparison baseline exists but the card claims target/actual judgment.
- Exact record audit is the task. Use a table/detail view.
- The trend has too many points for a card and should become a full chart block with dataZoom, aggregation, or table fallback.

## Required Data Contract

Implementation-ready cards require:

```ts
type TargetActualTrendCardPattern =
  | 'emphasis-wave-trend'
  | 'standard-summary-trend'
  | 'soft-chip-trend';

type TargetActualTrendCardContract = {
  targetActualTrendCardPattern: TargetActualTrendCardPattern;
  metricId: string;
  metricName: string;
  currentValueField: string;
  unit: string;
  periodField: string;
  timeField: string;
  actualValueField: string;
  comparisonValueField?: string;
  comparisonLabel?: string;
  targetValueField?: string;
  targetSeriesField?: string;
  attainmentRateField?: string;
  gapField?: string;
  changeRateFields?: Array<'yoy' | 'mom' | 'baseline'>;
  targetDirection: 'good-when-higher' | 'good-when-lower' | 'bounded-range';
  timeGrain: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
  sourceDataset: string;
  numericFormatContractIds: string[];
  tooltipPayload: string[];
  summaryItems: Array<'comparison' | 'actual' | 'target' | 'attainment' | 'gap'>;
  stateRules: string[];
};
```

Data rules:

- `timeField` must be ordered before building `xAxis.data`, every series, tooltip payload, and click payload.
- `actualValueField`, `comparisonValueField`, and target fields must share unit, time grain, and period semantics or declare a conversion rule.
- `targetValueField` may be a constant reference value; `targetSeriesField` is required when the target changes by period.
- The headline `currentValueField` must reconcile with the selected period total, latest cumulative value, or explicitly stated snapshot.
- Tooltip must include time, actual, comparison/baseline, target/reference, attainment, gap, unit, and change rate when available.
- Do not store dynamic KPI values, target values, or attainment rates in filter option metadata.

## Shared Anatomy

All patterns use these zones:

| Zone | Rule |
| --- | --- |
| Header metric | Metric label, primary value, unit, comparison indicator, optional action/icon. It owns the first read. |
| Emphasis divider | Optional wave or brand header divider. It must separate hierarchy, not imitate data unless explicitly data-driven. |
| Encoding legend | Explains comparison, actual, and target/reference series. It must match line color, stroke, dash style, and summary labels. |
| Chart plot | ECharts owns lines, points, axes, grid, target/reference lines, tooltip, hover, update, and resize behavior. |
| Axis/unit | Y-axis labels and x-axis labels remain readable; unit can be in axis labels, subtitle, or header metadata. |
| Summary values | Bottom summary for comparison, actual, target, attainment, or gap. Values must reconcile with the chart. |
| Disclosure | Tooltip, focus, drawer, or detail route for formula, source, freshness, and exact period values. |

Decision structure:

```text
headline metric -> current comparison -> actual path -> target/reference path -> reconciled summary
```

## Pattern: `emphasis-wave-trend`

Use for a lead card that should feel memorable while still behaving like a report component.

Layout:

- Brand/emphasis header contains metric label, primary value, comparison, and optional scope.
- A soft wave/divider may separate header from chart body.
- Chart body stays white/neutral for axis and line readability.
- Bottom summary uses compact rows or columns for comparison, actual, target, attainment, or gap.

Strength:

- Strong first read without hiding the evidence path.
- The wave creates a crafted transition between metric judgment and line evidence.

Rules:

- Use one primary card per view, or a small number of deliberately prioritized lead cards.
- Header height must be budgeted; it cannot squeeze the line plot below the floors in `12c2-placement-line-trends.md`.
- The wave is a hierarchy divider by default. If it encodes attainment/progress, it must be driven by `attainmentRateField`.
- Keep the chart body neutral enough for y-axis labels, dashed target lines, and hover points to remain legible.

## Pattern: `standard-summary-trend`

Use for enterprise cards where users may need to reconcile the headline with target and period evidence.

Layout:

- Header is neutral, with metric label top-left and optional action icon top-right.
- Primary value and comparison sit above the plot.
- Legend sits above the plot or in the chart option legend area.
- Bottom panel or row summary contains label/value pairs.

Strength:

- Most auditable and easiest to implement across different pages.
- Good default for dense dashboards where multiple cards must share a calm rhythm.

Rules:

- Bottom summary can show `comparison`, `actual`, and `target`; keep visible row/card count `2-4`.
- Use subtle border/background for the summary panel; avoid heavy nested-card styling.
- If the summary crowds the plot below viable height, move extra values to tooltip/drawer and keep the most decision-critical row.

## Pattern: `soft-chip-trend`

Use for lighter overview cards, mobile-friendly cards, or secondary target/actual trend cards.

Layout:

- Use a subtle bordered or tinted card surface.
- Keep the headline metric compact but visible.
- Show the line chart with axes; do not degrade it into a decorative sparkline if the card claims target/actual trend evidence.
- Bottom summary values may use chip-like containers for emphasis.

Strength:

- Feels designed and approachable while preserving exact business evidence.
- Works well when the page needs a softer alternative to an emphasis header.

Rules:

- Chips should highlight summary values, not become decorative pills.
- Use chips for `2-4` summary values; too many chips create visual noise and wrapping risk.
- Chip colors must follow metric semantics and remain consistent with legend colors.
- If chips reduce chart height or cause label wrapping, switch to `standard-summary-trend`.

## ECharts Encoding

Default encoding:

```text
comparison series: muted gray or low-emphasis dashed line
actual series: brand-primary solid line with visible latest/current point
target/reference series: dashed brand/reference line, markLine, or target series
```

Allowed alternatives:

- Forecast or plan segment shown as a dashed continuation of actual.
- Target band or warning band only when the target is a range and the tooltip explains the range.
- Area fill only for one primary actual series; keep comparison and target lines readable.

Rules:

- Use ECharts series/options for lines, points, axes, legend, target/reference line, tooltip, axisPointer, hover emphasis, update, and resize.
- Do not hand-draw standard lines, axes, legends, target lines, or tooltips while claiming ECharts chart ownership.
- Y-axis max/min must include actual, comparison, target, reference, and negative values with readable headroom.
- Target/reference must be visually distinct from actual and comparison, usually dashed or thinner.
- Permanent labels are key-point only: latest/current, max/min, anomaly, selected, or target label.
- If points exceed `30`, hide normal points and ordinary labels; if points exceed `90`, use dataZoom, aggregation, full chart, or table fallback.

## Size And Density

Minimum useful card size:

| Tier | Width | Height | Use |
| --- | ---: | ---: | --- |
| Compact | `260-320px` | `420-520px` | Mobile/narrow card, fewer labels, compact summary. |
| Standard | `320-420px` | `500-660px` | Full card with chart and bottom summary. |
| Wide | `420px+` | `460px+` | Desktop card or grid panel with better plot width. |

Fit rules:

- Headline metric must remain readable before wave, chip, or line styling is tuned.
- Chart body should stay `>=220px` when y-axis, legend, target/reference line, and bottom summary are visible.
- Plot height should meet the line chart floors from `12c2-placement-line-trends.md`.
- Bottom summary must not leave fewer than three readable y-axis tick regions.
- For vertical mobile cards, line evidence should be the dominant middle region, not a thin decorative strip.

## Anti-AI Gate

This card fails when:

- It looks like a target/actual trend card but lacks target/reference, comparison baseline, or formula.
- The line path is decorative, hard-coded, too smooth, or all-good without realistic variance.
- The target/reference line cannot be traced to data or a declared target rule.
- Legend colors, dash styles, line marks, and summary labels do not match.
- Header values and chart series come from unrelated periods, grains, or filters.
- The wave/header/chips are visually stronger than the actual, comparison, and target evidence.
- The bottom summary repeats numbers that do not reconcile with chart data.

Countermeasure:

```text
current value -> comparison -> actual line -> target/reference line -> reconciled summary -> exact-value disclosure
```

## State Rules

Required states:

- Loading: preserve header skeleton, chart skeleton, axis band, legend, and summary skeleton separately.
- Empty: explain which selected period/time range has no data and offer reset when filters caused it.
- Missing target: render actual and comparison without target/reference line and show a target unavailable state; do not fake target.
- Missing comparison: render actual and target/reference and show comparison unavailable state.
- Sparse points: one point centers in the plot; two points place symmetrically; tooltip explains limited coverage.
- Denominator zero: show `--` for attainment/change rate and explain in tooltip.
- No permission: keep card shell and state message; do not leak restricted values through tooltip or summary.
- Stale data: show freshness/source note when values may lag.

## Acceptance Checklist

Before marking ready:

- `visualType` is `line`, `chartSubtype` is `target-actual-trend`, and `targetActualTrendCardPattern` is one of the controlled values.
- The card answers a named target-vs-actual trend business question.
- Headline value, actual line, comparison line, target/reference line, and bottom summary reconcile under the same active filters.
- Numeric display contracts exist for headline, actual, comparison, target/reference, attainment, gap, and visible change-rate values.
- ECharts owns lines, points, axes, target/reference line, legend, tooltip, hover, update, and resize behavior.
- Legend, line colors, dash styles, point marks, and summary labels use consistent semantics.
- Y-axis labels, x-axis labels, target/reference line, and lines do not overlap or squeeze.
- Missing target/comparison, empty, sparse-point, no-permission, stale, and long-label states are defined.
- Formula/source/freshness and exact per-period values are available through tooltip or detail route.
