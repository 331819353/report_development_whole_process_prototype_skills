# Target/Actual Radar Card Patterns

Use this reference when a KPI headline grows into a complete radar comparison card with actual, target, and comparison polygons plus a bottom summary. It captures cards such as sales amount by product A-F with current value, YoY/MoM, actual product-shape evidence, target outline, prior-period outline, and reconciled summary values.

This is a card-level composition pattern. Pair it with:

- `04-kpi-metric-cards.md` for headline metric fit and value-anchor rules.
- `05b-echarts-combo-pie-radar-gauge.md` for ECharts radar implementation and renderer ownership.
- `12d1-placement-radar.md` for radar radius, labels, series count, and shape-preservation rules.

## Pattern Identity

Do not create a new `visualType`. Use:

```text
componentType: chart
visualType: radar
chartSubtype: target-actual-radar
targetActualRadarCardPattern: one of the values below
```

| `targetActualRadarCardPattern` | Use when | Visual structure |
| --- | --- | --- |
| `emphasis-wave-radar` | One radar card is the lead first-read object and brand emphasis is allowed. | Brand/emphasis header, soft wave divider, neutral radar body, top-centered legend when multi-series, bottom value summary rows. |
| `standard-action-radar` | Enterprise workbench or ordinary report cards need clickable detail and repeatable clarity. | Neutral card, compact KPI headline, optional top-right action icon, radar plot, bottom row/panel summary. |

Selection order:

1. Use `emphasis-wave-radar` for the primary card when the metric must be the strongest first-read object and the page allows one emphasis surface.
2. Use `standard-action-radar` when audit clarity, multi-card consistency, or detail action is more important than visual emphasis.
3. If target, comparison, or comparable dimension data is missing, fall back to a KPI card, bar chart, or table instead of inventing the missing evidence.

## Business Purpose

The card must answer one complete question:

```text
How does the current metric profile compare with target and prior/comparison profiles across dimensions?
```

Valid business uses:

- Sales amount by product, channel, region, capability, risk dimension, score dimension, or operational category.
- Actual profile compared with target, plan, budget, same period, prior period, benchmark, or warning threshold.
- Lead KPI cards where the current value alone is not enough because the decision depends on the balance and shape of dimensions.

Invalid uses:

- The user needs precise per-dimension lookup as the primary task. Use bar chart or table.
- Dimensions are unrelated raw units without a standardized score or shared scale.
- Dimensions exceed the radar budget, normally more than `8` for card use.
- Series exceed the normal visible limit of actual, target, and comparison.

## Required Data Contract

Implementation-ready cards require:

```ts
type TargetActualRadarCardPattern =
  | 'emphasis-wave-radar'
  | 'standard-action-radar';

type TargetActualRadarCardContract = {
  targetActualRadarCardPattern: TargetActualRadarCardPattern;
  metricId: string;
  metricName: string;
  currentValueField: string;
  unit: string;
  periodField: string;
  dimensionField: string;
  dimensionLabelField?: string;
  actualValueField: string;
  comparisonValueField?: string;
  comparisonLabel?: string;
  targetValueField?: string;
  attainmentRateField?: string;
  gapField?: string;
  changeRateFields?: Array<'yoy' | 'mom' | 'baseline'>;
  radarScaleMin: number;
  radarScaleMax: number;
  targetDirection: 'good-when-higher' | 'good-when-lower' | 'bounded-range';
  dimensionGrain: string;
  sourceDataset: string;
  numericFormatContractIds: string[];
  tooltipPayload: string[];
  summaryItems: Array<'comparison' | 'actual' | 'target' | 'attainment' | 'gap'>;
  detailAction?: string;
  stateRules: string[];
};
```

Data rules:

- `dimensionField` must have deterministic business order, such as product A-F, capability order, funnel-adjacent categories, or score model order.
- Radar values must share a comparable scale. If raw units differ, plot standardized scores and expose raw value, target, and score in tooltip/detail.
- The headline `currentValueField` must reconcile with the selected period total, latest cumulative value, or explicitly stated snapshot.
- `actualValueField`, `comparisonValueField`, and `targetValueField` must share dimension grain, period context, and scale semantics or declare conversion/standardization.
- Tooltip must include dimension, actual, comparison/baseline, target, attainment, gap, unit or score scale, raw value when standardized, period, and source.
- Do not store dynamic KPI values, radar dimension values, target values, or attainment rates in filter option metadata.

## Shared Anatomy

All patterns use these zones:

| Zone | Rule |
| --- | --- |
| Header metric | Metric label, primary value, unit, comparison indicator, optional action/icon. It owns the first read. |
| Emphasis divider | Optional wave or brand header divider. It separates hierarchy; it is not a radar or progress mark unless explicitly data-driven. |
| Radar plot | ECharts owns radar grid, dimension axes, labels, polygons, points, tooltip, hover, update, and resize behavior. |
| Encoding legend | Explains comparison, actual, and target series. It must match polygon color, fill, stroke, and dash semantics. |
| Dimension labels | Short labels outside the ring; long names abbreviate with tooltip/detail disclosure. |
| Summary values | Bottom summary for comparison, actual, target, attainment, or gap. Values must reconcile with the chart. |
| Disclosure/action | Tooltip, focus, drawer, or detail route for formula, source, freshness, and exact per-dimension values. |

Decision structure:

```text
headline metric -> current comparison -> actual shape -> target/comparison shape -> summary reconciliation
```

## Pattern: `emphasis-wave-radar`

Use for a lead card that should feel memorable while still behaving like a report component.

Layout:

- Brand/emphasis header contains metric label, primary value, comparison, and optional scope.
- A soft wave/divider may separate header from the radar body.
- Radar body stays white/neutral so dimension labels and polygon layers remain readable.
- Bottom summary uses compact rows for comparison, actual, target, attainment, or gap.

Strength:

- Strong first read with a shaped evidence layer.
- Works well when one KPI needs both current judgment and product/category profile.

Rules:

- Use one primary card per view, or a small number of deliberately prioritized lead cards.
- Header height must be budgeted; it cannot squeeze the radar body below the radius and label floors in `12d1-placement-radar.md`.
- The wave is a hierarchy divider by default. If it encodes attainment/progress, it must be driven by `attainmentRateField`.
- Keep radar fill opacity light enough that target and comparison outlines remain visible.

## Pattern: `standard-action-radar`

Use for enterprise cards where users may click through to dimension detail or compare several cards in one dashboard.

Layout:

- Header is neutral, with metric label top-left and optional action icon top-right.
- Primary value and comparison sit above the radar.
- Radar plot uses a centered circular coordinate system and short dimension labels.
- Bottom panel or row summary contains label/value pairs.

Strength:

- Most repeatable and easiest to implement across different pages.
- Good default for multi-card grids where a full blue header would become too loud.

Rules:

- Top-right action icon must have a detail route, drawer, fullscreen, or configured action; otherwise omit it.
- Bottom summary can show `comparison`, `actual`, and `target`; keep visible row count `2-4`.
- Use subtle border/background for the summary panel; avoid heavy nested-card styling.
- If the summary crowds the radar below viable radius, move extra values to tooltip/drawer and keep the most decision-critical row.

## ECharts Encoding

Default encoding:

```text
comparison series: muted gray dashed outline, no heavy fill
actual series: brand-primary solid outline with 8%-18% fill and visible points
target series: brand/reference dashed outline, no fill or very weak fill
```

Rules:

- Use ECharts `series.type: 'radar'`, `radar.indicator`, `radar.center`, `radar.radius`, `radar.shape`, `radar.splitNumber`, `axisName`, `nameGap`, `tooltip`, `legend`, and emphasis/blur behavior.
- Do not hand-draw radar polygons, rings, axes, points, labels, legends, or tooltips while claiming ECharts radar ownership.
- Keep the radar coordinate system circular. Do not stretch the radar into an ellipse to fill the card.
- Default dimensions: `5-8`; allow `3-4` only when the user accepts weaker shape evidence; use another chart when `>8` in card form.
- Default visible series: actual, target, and one comparison at most. More series require selector, facets, small multiples, bar chart, or table.
- Permanent value labels are off by default. Use tooltip for exact values; show only max/min/anomaly/selected labels when fit passes.

## Size And Density

Minimum useful card size:

| Tier | Width | Height | Use |
| --- | ---: | ---: | --- |
| Compact | `240-300px` | `340-420px` | Mobile/narrow card, `5-6` short labels, compact summary. |
| Standard | `300-420px` | `380-520px` | Full card with radar, legend, and bottom summary. |
| Wide | `420px+` | `360px+` | Desktop card or grid panel with larger radar radius. |

Fit rules:

- Headline metric must remain readable before wave, action icon, or radar styling is tuned.
- Radar plot should keep a viable radius after label reservation. Follow `12d1-placement-radar.md`; do not reduce labels below `11px`.
- Card radar body should stay visually dominant in the middle region, not shrink into a decorative badge.
- Bottom summary must not consume the space required for dimension labels and hover target area.
- If the component is too small for radar, use a compact KPI card with tooltip/detail or switch to bar/list.

## Anti-AI Gate

This card fails when:

- It looks like a target/actual radar card but lacks target, comparison baseline, formula, or comparable dimensions.
- Radar polygons are decorative, hard-coded, too smooth, or unrelated to the summary values.
- Dimensions mix raw units without standardization and tooltip disclosure.
- Legend colors, dash styles, polygon fills, points, and summary labels do not match.
- Header values and radar dimensions come from unrelated periods, grains, or filters.
- The wave/header/action icon is visually stronger than the actual, comparison, and target evidence.
- The bottom summary repeats numbers that do not reconcile with chart data.

Countermeasure:

```text
current value -> comparison -> actual shape -> target/comparison shape -> reconciled summary -> exact-value disclosure
```

## State Rules

Required states:

- Loading: preserve header skeleton, radar skeleton, label ring, legend, and summary skeleton separately.
- Empty: explain which selected period/dimension set has no data and offer reset when filters caused it.
- Missing target: render actual and comparison without target polygon and show a target unavailable state; do not fake target.
- Missing comparison: render actual and target and show comparison unavailable state.
- Dimension missing: do not invent a point; tooltip/state explains the missing dimension.
- Unit mismatch: plot standardized scores and expose raw values in tooltip/detail.
- No permission: keep card shell and state message; do not leak restricted values through tooltip or summary.
- Stale data: show freshness/source note when values may lag.

## Acceptance Checklist

Before marking ready:

- `visualType` is `radar`, `chartSubtype` is `target-actual-radar`, and `targetActualRadarCardPattern` is one of the controlled values.
- The card answers a named target-vs-actual profile business question.
- Headline value, actual polygon, comparison polygon, target polygon, and bottom summary reconcile under the same active filters.
- Numeric display contracts exist for headline, actual, comparison, target, attainment, gap, and visible change-rate values.
- ECharts owns radar grid, polygons, axes, dimension labels, legend, tooltip, hover, update, and resize behavior.
- Radar geometry remains circular and labels do not collide with title, edge, legend, summary, or each other.
- Missing target/comparison, empty, missing-dimension, unit-mismatch, no-permission, stale, and long-label states are defined.
- Formula/source/freshness and exact per-dimension values are available through tooltip or detail route.
