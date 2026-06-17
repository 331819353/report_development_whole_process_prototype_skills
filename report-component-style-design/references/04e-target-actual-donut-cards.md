# Target/Actual Donut Card Patterns

Use this reference when a KPI headline grows into a complete donut composition card with product/category share, center share value, local period switch, side legend, and bottom target/actual/comparison summary. It captures cards such as sales amount with `实时 / 月累 / 年累`, product A-E share, center `实际占比`, and reconciled `同期 / 实际值 / 目标` totals.

This is a card-level composition pattern. Pair it with:

- `04-kpi-metric-cards.md` for headline metric fit and value-anchor rules.
- `05b-echarts-combo-pie-radar-gauge.md` for ECharts pie/donut implementation and renderer ownership.
- `12c4-placement-pie-donut.md` for donut radius, center metric, legend, labels, and category-density rules.

## Pattern Identity

Do not create a new `visualType`. Use:

```text
componentType: chart
visualType: pie
chartSubtype: target-actual-donut
targetActualDonutCardPattern: one of the values below
```

| `targetActualDonutCardPattern` | Use when | Visual structure |
| --- | --- | --- |
| `emphasis-filter-donut` | One composition card is the lead first-read object and brand emphasis is allowed. | Brand/emphasis header, local period switch, soft wave divider, donut + side legend, bottom summary rows. |
| `standard-filter-donut` | Enterprise workbench or ordinary report cards need repeatable clarity and actionability. | Neutral card, compact KPI headline, icon/action, local period switch, donut + side legend, bottom summary rows. |

Selection order:

1. Use `emphasis-filter-donut` for the primary card when the metric must be the strongest first-read object and a single emphasis surface is acceptable.
2. Use `standard-filter-donut` when the card appears in a grid, must repeat across pages, or needs calmer enterprise styling.
3. If category composition is not the question, use a KPI card, bar chart, trend card, or table instead.
4. If target/comparison by category is the primary question, prefer bar/table or a separate comparison chart. Do not force three comparable series into one donut.

## Business Purpose

The card must answer one complete question:

```text
What is the current metric total, and which categories contribute to the actual composition under target/comparison context?
```

Valid business uses:

- Product, channel, region, customer type, cost structure, order status, traffic source, or category share.
- Current actual composition plus total actual, target, same-period, or prior-period reconciliation.
- Lead KPI cards where the current total is important but the decision also depends on category contribution.

Invalid uses:

- Exact ranking or close percentage comparison is the main task. Use bar chart or table.
- Time movement is the main task. Use line/bar trend.
- Category count is too high for a readable donut and should become `Top5 + 其他`, ranked bar, or table.
- Negative values, mixed units, or all-zero values are present without a declared state.

## Required Data Contract

Implementation-ready cards require:

```ts
type TargetActualDonutCardPattern =
  | 'emphasis-filter-donut'
  | 'standard-filter-donut';

type TargetActualDonutCardContract = {
  targetActualDonutCardPattern: TargetActualDonutCardPattern;
  metricId: string;
  metricName: string;
  currentValueField: string;
  unit: string;
  periodField: string;
  localPeriodOptions?: Array<'realtime' | 'monthToDate' | 'yearToDate' | string>;
  categoryField: string;
  categoryLabelField?: string;
  categoryOrderField?: string;
  actualValueField: string;
  actualPercentField: string;
  centerCategoryField?: string;
  centerPercentField: string;
  comparisonTotalField?: string;
  comparisonLabel?: string;
  targetTotalField?: string;
  attainmentRateField?: string;
  gapField?: string;
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

- `categoryField` must have deterministic display order, normally value descending plus `其他` last, or a declared business order.
- `actualPercentField` must reconcile with `actualValueField / sum(actualValueField)` under the same active filters and local period.
- The donut encodes actual composition by default. Target and comparison totals belong in the summary unless target/comparison category composition is explicitly available.
- The headline `currentValueField` must reconcile with the donut total, selected period total, latest cumulative value, or explicitly stated snapshot.
- Tooltip must include category, actual value, actual percent, rank/order, change-rate when available, active local period, source, and freshness.
- Do not store dynamic KPI values, category share, target totals, or attainment rates in filter option metadata.

## Shared Anatomy

All patterns use these zones:

| Zone | Rule |
| --- | --- |
| Header metric | Icon/title, primary value, unit, comparison indicator, and optional local period switch. It owns the first read. |
| Local period switch | `实时 / 月累 / 年累` or equivalent; affects only this card or declared local card group. |
| Emphasis divider | Optional wave or brand header divider. It separates hierarchy; it is not a data mark unless explicitly data-driven. |
| Donut plot | ECharts owns slices, radius, center metric, legend, tooltip, hover, update, and resize behavior. |
| Center metric | Shows selected/core share such as `实际占比 35%`; it must fit inside the inner radius. |
| Category legend/list | Category name + percent, usually right of donut for narrow vertical cards when width passes. |
| Summary values | Bottom summary for comparison, actual, target, attainment, or gap. Values must reconcile with header and donut. |
| Disclosure/action | Tooltip, focus, drawer, or detail route for formula, source, freshness, and exact category rows. |

Decision structure:

```text
headline metric -> local period -> actual composition -> category contribution -> total reconciliation
```

## Pattern: `emphasis-filter-donut`

Use for a lead card that should feel branded and memorable while preserving category evidence.

Layout:

- Brand/emphasis header contains icon, metric label, local period switch, primary value, and comparison.
- A soft wave/divider may separate the header from the donut body.
- Donut body stays white/neutral so slices, center text, and legend remain readable.
- Product/category list sits next to the donut when the card is wide enough.
- Bottom summary uses compact rows for comparison, actual, target, attainment, or gap.

Strength:

- Strong first read plus a clear composition story.
- The wave gives hierarchy without making the donut feel like decorative wallpaper.

Rules:

- Use one primary card per view, or a small number of deliberately prioritized lead cards.
- Header and local switch height must be budgeted; they cannot squeeze the donut below `12c4-placement-pie-donut.md` radius floors.
- The wave is a hierarchy divider by default. If it encodes attainment/progress, it must be driven by `attainmentRateField`.
- Keep local switch labels short; if options exceed `4`, collapse to a dropdown before shrinking the donut.

## Pattern: `standard-filter-donut`

Use for enterprise cards where users compare several composition cards or need a calmer component.

Layout:

- Header is neutral, with icon/title left and local period switch right.
- Primary value and comparison sit under the header.
- Donut and category legend/list occupy the middle body.
- Bottom panel or row summary contains label/value pairs.

Strength:

- Most repeatable and easiest to implement across dashboards.
- Good for multi-card grids where a full blue header would become visually loud.

Rules:

- Top icon/action must have a detail route, drawer, fullscreen, or configured action when clickable; otherwise use it as a static metric icon only.
- Bottom summary can show `comparison`, `actual`, and `target`; keep visible row count `2-4`.
- Use subtle border/background for the summary panel; avoid heavy nested-card styling.
- If the legend/list or summary crowds the donut, move secondary values to tooltip/drawer and keep the most decision-critical rows.

## ECharts Encoding

Default encoding:

```text
series.type: pie
donut radius: inner/outer ring
actual composition: category slices ordered by value or business order
center metric: selected/core actual percent
legend/list: category + percent
bottom summary: comparison total, actual total, target total
```

Rules:

- Use ECharts `series.type: 'pie'`, `radius`, `center`, `startAngle`, `minAngle`, `avoidLabelOverlap`, `labelLayout`, `legend`, `tooltip`, and emphasis behavior.
- Do not hand-draw donut slices, arcs, labels, guide lines, legends, or center text while claiming ECharts chart ownership.
- Donut is the default shape. Plain pie is allowed only when center content is unnecessary or space is too tight.
- Default categories: `2-6`; allow `7-8` only with `Top5 + 其他` or legend-only disclosure; use bar/table when `>8`.
- Center metric must be short, such as `实际占比 35%`, selected category share, total, or empty/all-zero message.
- Avoid showing the same category percent in center, slice label, outside label, legend, and summary at once. Use legend and tooltip as the default exact-value surfaces.

## Size And Density

Minimum useful card size:

| Tier | Width | Height | Use |
| --- | ---: | ---: | --- |
| Compact | `240-300px` | `360-440px` | Mobile/narrow card, `3-5` categories, compact summary. |
| Standard | `300-420px` | `400-540px` | Full card with local switch, donut, side legend, and bottom summary. |
| Wide | `420px+` | `360px+` | Desktop card or grid panel with larger donut and richer legend. |

Fit rules:

- Headline metric must remain readable before wave, local switch, or donut styling is tuned.
- Donut body should stay visually dominant in the middle region, not shrink into a decorative badge.
- Reserve legend/list space before choosing donut radius. Follow `12c4-placement-pie-donut.md`.
- Center text must fit inside the inner radius; shorten units or move detail to tooltip rather than overflowing.
- If the component is too small for donut + legend + summary, keep KPI + top category and move full composition to drawer/table.

## Anti-AI Gate

This card fails when:

- It looks like a composition card but lacks category values, percent formula, target/comparison totals, or source.
- The donut is decorative, hard-coded, all-perfect, or unrelated to the summary totals.
- Category colors, legend order, center percent, and slice values do not reconcile.
- Header values and donut categories come from unrelated periods, grains, or filters.
- The local period switch changes only UI state while the data remains unchanged.
- The wave/header/icon is visually stronger than the actual composition evidence.
- Target/comparison values are implied as donut slices without target/comparison category data.

Countermeasure:

```text
current value -> local period -> actual category share -> center share -> legend/list -> reconciled totals
```

## State Rules

Required states:

- Loading: preserve header skeleton, local switch, donut skeleton, legend/list skeleton, and summary skeleton separately.
- Empty: explain which selected period/category scope has no data and offer reset when filters caused it.
- All zero: show empty ring or `暂无有效占比`; do not fake a full donut.
- One category: render a full ring labeled `100%` and explain in tooltip.
- Too many categories: merge to `Top5 + 其他`, use internal scroll/detail, or switch to bar/table.
- Missing target: keep actual composition and comparison summary, hide target row or show target unavailable state.
- Missing comparison: keep actual composition and target summary, show comparison unavailable state.
- Negative category value: pie/donut invalid; switch chart or show data validation state.
- No permission: keep card shell and state message; do not leak restricted values through tooltip or summary.
- Stale data: show freshness/source note when values may lag.

## Acceptance Checklist

Before marking ready:

- `visualType` is `pie`, `chartSubtype` is `target-actual-donut`, and `targetActualDonutCardPattern` is one of the controlled values.
- The card answers a named composition-with-target-context business question.
- Headline value, donut total, center share, category legend, and bottom summary reconcile under the same active filters and local period.
- Numeric display contracts exist for headline, category values, percents, comparison, actual, target, attainment, gap, and visible change-rate values.
- ECharts owns donut slices, center metric, legend, tooltip, hover, update, and resize behavior.
- Donut geometry remains circular; center text, legend, title, local switch, and summary do not collide.
- Empty, all-zero, one-category, too-many-category, missing target/comparison, negative-value, no-permission, stale, and long-label states are defined.
- Formula/source/freshness and exact category values are available through tooltip or detail route.
