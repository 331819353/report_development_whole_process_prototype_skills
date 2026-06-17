# Target/Actual Comparison Card Patterns

Use this reference when a KPI card grows into a complete comparison card with a headline metric, actual-vs-prior or actual-vs-target bar chart, target line, legend, and bottom summary. It captures the pattern shown by sales amount cards such as current value + YoY/MoM + monthly actual/prior bars + target.

This is a card-level composition pattern. Pair it with:

- `04-kpi-metric-cards.md` for headline metric fit and value-anchor rules.
- `05a-echarts-foundation-bars-lines.md` for ECharts target/actual bar implementation.
- `12c1-placement-target-actual-bars.md` for chart placement, axis, legend, target line, and plot budget.

## Pattern Identity

Do not create a new `visualType`. Use:

```text
componentType: chart
visualType: bar
chartSubtype: target-actual-comparison
targetActualCardPattern: one of the values below
```

| `targetActualCardPattern` | Use when | Visual structure |
| --- | --- | --- |
| `standard-summary-panel` | Enterprise workbench or ordinary report cards need maximum clarity and auditability. | White card, compact header metric, full chart, bottom legend/value summary panel. |
| `emphasis-header-summary` | One comparison card is the lead object in a mobile/first-viewport flow. | Strong brand header for metric, white chart body, bottom summary values. |
| `soft-chip-summary` | A lighter overview card needs friendliness while keeping exact summary values visible. | Soft tinted surface, chart body, bottom chip-style summary values. |

Selection order:

1. Use `emphasis-header-summary` for the primary card when the metric must be the strongest first-read object.
2. Use `standard-summary-panel` when audit clarity, legend/value reconciliation, or enterprise density matters most.
3. Use `soft-chip-summary` for secondary cards, mobile overview, or a softer consumer-grade dashboard surface.
4. If target, prior/comparison, or trend data is missing, fall back to a KPI card pattern or a simpler bar chart instead of inventing the missing evidence.

## Business Purpose

The card must answer one complete question:

```text
How is the current metric performing against target and comparison periods?
```

Valid business uses:

- Sales amount vs target and prior-period monthly values.
- Orders, GMV, profit, budget execution, SLA completion, resource usage, or production output against target.
- Month-by-month actual value compared with last period, last year, budget, plan, or benchmark.

Invalid uses:

- No target or comparison baseline exists.
- The user only needs one current value. Use a KPI card.
- Exact record audit is the task. Use a table/detail view.
- The category count is too high for readable bars and should become Top N, scroll/dataZoom, table, or a full chart block.

## Required Data Contract

Implementation-ready cards require:

```ts
type TargetActualCardPattern =
  | 'standard-summary-panel'
  | 'emphasis-header-summary'
  | 'soft-chip-summary';

type TargetActualComparisonCardContract = {
  targetActualCardPattern: TargetActualCardPattern;
  metricId: string;
  metricName: string;
  currentValueField: string;
  unit: string;
  periodField: string;
  categoryField: string;
  actualValueField: string;
  comparisonValueField?: string;
  comparisonLabel?: string;
  targetValueField: string;
  attainmentRateField?: string;
  changeRateFields?: Array<'yoy' | 'mom' | 'baseline'>;
  targetDirection: 'good-when-higher' | 'good-when-lower' | 'bounded-range';
  categoryGrain: string;
  sourceDataset: string;
  numericFormatContractIds: string[];
  tooltipPayload: string[];
  summaryItems: Array<'comparison' | 'actual' | 'target' | 'attainment' | 'gap'>;
  stateRules: string[];
};
```

Data rules:

- `categoryField` must be ordered, such as month, week, store rank, region, or product group.
- `actualValueField`, `comparisonValueField`, and `targetValueField` must share unit, grain, and period semantics or declare a conversion rule.
- `targetValueField` may be a unified target value repeated for all categories, or a category-specific target.
- The headline `currentValueField` must reconcile with the chart context, such as selected period total or latest cumulative value.
- Tooltip must include category, actual, comparison/baseline, target, attainment, gap, unit, and change rate when available.
- Do not store dynamic KPI values or target values in filter option metadata.

## Shared Anatomy

All patterns use these zones:

| Zone | Rule |
| --- | --- |
| Header metric | Metric label, primary value, unit, comparison indicator, optional action/icon. It owns the first read. |
| Encoding legend | Explains comparison series, actual series, and target line. It must not be confused with summary values. |
| Chart plot | Grouped bars or actual bars plus target line/ticks. ECharts owns bars, axes, target line/ticks, tooltip, and hover state. |
| Axis/unit | Y-axis labels and category labels remain readable; unit can be in axis labels, subtitle, or header metadata. |
| Summary values | Bottom or panel summary for comparison, actual, target, attainment, or gap. Values must reconcile with the chart. |
| Disclosure | Tooltip, focus, drawer, or detail route for formula, source, freshness, and exact period values. |

Decision structure:

```text
headline metric -> comparison status -> monthly/category evidence -> target reference -> summary reconciliation
```

## Pattern: `standard-summary-panel`

Use for enterprise report cards where the user may need to reconcile values.

Layout:

- Header is white/neutral, with metric label top-left and optional action icon top-right.
- Primary value is large, left-aligned under the label.
- Comparison indicator sits under the value.
- Chart occupies the center and keeps full y-axis labels and x-axis labels.
- Bottom panel contains legend-like rows or summary rows with label left and value right.

Strength:

- Most auditable and easiest to read.
- Good for dense dashboards where multiple cards must share a calm rhythm.

Rules:

- Bottom panel can show `comparison`, `actual`, and `target`; keep row count `2-4`.
- Use subtle border/background for the panel; do not turn it into a nested card with heavy shadow.
- If the bottom panel crowds the chart below viable plot height, move full summary to tooltip/drawer and keep a one-row summary.

## Pattern: `emphasis-header-summary`

Use for a lead card that should have a strong first-read metric.

Layout:

- Brand/emphasis header contains metric label, primary value, and comparison.
- Chart body stays white/neutral for legibility.
- Legend sits between header and plot or at chart top.
- Bottom summary uses three compact value columns by default: comparison, actual, target.

Strength:

- Strong visual memory without sacrificing chart readability.
- Separates judgment in the header from evidence in the body.

Rules:

- Use the emphasis surface for one primary card or a small number of lead cards. A page full of emphasis headers becomes decorative template polish.
- Header height must be budgeted; it cannot squeeze the plot below target/actual bar floors.
- Keep the header text concrete: metric, value, period, and comparison. Do not add generic slogans.
- The chart area must not inherit low-contrast dark styling that weakens axis/legend readability.

## Pattern: `soft-chip-summary`

Use for lighter overview cards, mobile-friendly dashboards, or secondary comparison cards.

Layout:

- Use a subtle tinted card surface.
- Keep the headline metric compact but clear.
- Place legend above the plot.
- Bottom summary values may use chip-like containers for emphasis.

Strength:

- Feels designed and approachable while keeping business evidence visible.
- Works well when the card must sit beside softer KPI cards.

Rules:

- Chips should highlight summary values, not become decorative pills.
- Use chips for `2-4` summary values; too many chips create visual noise.
- Chip colors must follow metric semantics and remain consistent with legend colors.
- If chips reduce chart height or cause wrapping, switch to the `standard-summary-panel` row summary.

## ECharts Encoding

Default encoding:

```text
comparison series: muted bar
actual series: brand-primary bar
target: dashed markLine or constant line series
```

Allowed alternatives:

- Category-specific target ticks when every category has its own target.
- Grouped target bars only when category count is small and exact actual-vs-target gap is the task.

Rules:

- Use ECharts series/options for bars, axes, legend, target line/ticks, tooltip, and hover emphasis.
- Do not hand-draw target lines, axes, legends, bars, or values while claiming ECharts chart ownership.
- Y-axis max must include actual, comparison, and target values with readable headroom.
- Target line must be visually distinct from actual/comparison bars, usually dashed or thinner.
- Permanent data labels are optional. Prefer tooltip unless the card has enough space and only a few categories.
- If categories exceed `12`, sample x-axis labels; if they exceed `30`, use dataZoom, scroll, Top N, table, or a full chart block.

## Size And Density

Minimum useful card size:

| Tier | Width | Height | Use |
| --- | ---: | ---: | --- |
| Compact | `260-320px` | `420-520px` | Mobile/narrow card, fewer labels, compact summary. |
| Standard | `320-420px` | `520-680px` | Full card with chart and bottom summary. |
| Wide | `420px+` | `480px+` | Desktop card or grid panel with better plot width. |

Fit rules:

- Headline metric must remain readable before chart or summary decoration is tuned.
- Chart body should stay `>=220px` when y-axis, legend, target line, and grouped bars are visible.
- Plot height should meet the bar/line chart floors from `05a-echarts-foundation-bars-lines.md`.
- Bottom summary must not leave fewer than three readable y-axis tick regions.
- For vertical mobile cards, chart evidence should be the dominant middle region, not a thin strip.

## Anti-AI Gate

This card fails when:

- It looks like a chart card but lacks target, comparison baseline, or formula.
- The target line is decorative or hard-coded and cannot be traced to data.
- Legend colors do not match chart marks or summary values.
- Header says a generic metric while the chart uses unrelated fields.
- All values are smooth/all-good without realistic variance, missing values, or threshold cases.
- The visual design emphasizes gradient/header/chips more than actual, comparison, and target evidence.
- The bottom summary repeats numbers that do not reconcile with chart data.

Countermeasure:

```text
current value -> comparison -> target line -> category evidence -> reconciled summary
```

## State Rules

Required states:

- Loading: preserve header skeleton, chart skeleton, and summary skeleton separately.
- Empty: explain which selected period/category has no data and offer reset when filters caused it.
- Missing target: render comparison bars without target line and show a target unavailable state; do not fake target.
- Missing comparison: render actual + target and show comparison unavailable state.
- Denominator zero: show `--` for attainment/change rate and explain in tooltip.
- No permission: keep card shell and state message; do not leak restricted values through tooltip or summary.
- Stale data: show freshness/source note when values may lag.

## Acceptance Checklist

Before marking ready:

- `visualType` is `bar`, `chartSubtype` is `target-actual-comparison`, and `targetActualCardPattern` is one of the controlled values.
- The card answers a named target-vs-actual business question.
- Headline value, chart bars, target line, and bottom summary reconcile under the same active filters.
- Numeric display contracts exist for headline, actual, comparison, target, attainment, and gap values.
- ECharts owns bars, axes, target line/ticks, legend, tooltip, hover, update, and resize behavior.
- Legend, chart colors, and summary labels use consistent semantics.
- Y-axis labels, x-axis labels, target line, and bars do not overlap or squeeze.
- Missing target/comparison, empty, no-permission, stale, and long-label states are defined.
- Formula/source/freshness and exact per-category values are available through tooltip or detail route.
