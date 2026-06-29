# Ranking, Top N, And Pareto Card Patterns

Use this reference for ranking cards, leaderboard cards, Top N summaries, and Pareto contribution cards where the business question is "who leads, by how much, what changed, and which few objects explain most of the result".

Pair with:

- `07-cards-lists-tasks.md` for generic list/card overflow and interaction rules.
- `10-in-component-controls.md` when the card owns a local period, scope, metric, ranking mode, or layout switch.
- `03-text-summary.md` when the ranking card contains a conclusion strip or recommendation.
- `05a-echarts-foundation-bars-lines.md`, `05b-echarts-combo-pie-radar-gauge.md`, `05c-echarts-specialized-and-flow.md`, or `report-chart-design-spec` when the card contains a chart body such as donut, radar, map, bubble, Pareto bar-line, or micro trend.
- `report-info-component-mapping` `references/06-binding-implementation-contract.md` for `rankingCardPattern`, `paretoCardPattern`, field binding, and source-side Top N/Pareto rules.

## Pattern Identity

Use ranking cards as row/slot-aligned comparison components, not as decorative chart cards.

```ts
componentType: 'card'
visualType: 'ranking-list'
rankingCardPattern:
  | 'basic-rank-list-card'
  | 'trend-delta-rank-list-card'
  | 'progress-bar-rank-list-card'
  | 'podium-rank-card'
  | 'yoy-microbar-rank-list-card'
  | 'radar-comparison-rank-card'
  | 'metric-summary-rank-card'
  | 'time-switch-rank-card'
  | 'share-donut-rank-card'
  | 'map-distribution-rank-card'
  | 'topn-bar-rank-card'
  | 'topn-comparison-rank-card'
  | 'topn-waterfall-strip-card'
  | 'topn-sparkline-rank-list-card'
  | 'topn-bubble-rank-card'
  | 'topn-icon-card-grid'
  | 'medal-horizontal-ranking' // legacy alias for podium/wide medal ranking
  | 'bar-progress-ranking' // legacy alias for progress-bar-rank-list-card
  | 'compact-list-ranking'; // legacy alias for basic-rank-list-card in narrow space
```

Use Pareto cards when the ranking also explains cumulative contribution and an 80/20 or declared threshold boundary.

```ts
componentType: 'card'
visualType: 'ranking-list'
paretoCardPattern:
  | 'pareto-basic-card'
  | 'pareto-table-chart-card'
  | 'pareto-dual-axis-card'
  | 'pareto-cumulative-fill-card'
  | 'pareto-stacked-share-card'
  | 'pareto-bubble-card'
  | 'pareto-zone-card'
  | 'pareto-ring-list-card';
```

Do not map these cards as ordinary `bar` charts unless the primary visual is a full analytical chart with axes, legend, and chart interaction. A ranking card is a bounded decision surface with rank semantics, exact value path, deterministic sort, and a visible overflow strategy.

## Why These Cards Feel Designed

- The business sentence is explicit: "Top 5 by sales amount", "Top N share", "Pareto key factors", or "monthly ranking". The component does not exist just to fill a dashboard slot.
- Rank is visible before reading numbers: medals, rank badges, row order, bar length, podium placement, map markers, or bubble size encode position.
- The top group and the tail have different visual weight. Top 1-3 get stronger badges or larger slots; lower ranks stay quieter, so the card has editorial hierarchy rather than AI-style uniform loudness.
- Evidence is layered, not random: value, share, delta, progress, trend, benchmark, or cumulative share each answers a distinct follow-up question.
- Local controls are credible. Metric, period, layout, and time switches sit in the header and clearly affect only this card or declared local group.
- The visible row count is bounded. Top 5/Top 10, "view all", pagination, drawer, or table fallback prevents cramped all-data displays.
- Decorations are semantic. Trophy, medal, map pin, small trend, donut, or Pareto 80% line explains rank, contribution, or decision threshold rather than serving as abstract polish.
- Numbers use stable alignment: object labels scan left, values and percentages align right, and bars/trends start on a common rail.
- The card contains a next step: detail click, "view all", conclusion strip, drilldown, or evidence tooltip. This makes it feel like a real product component, not a generated poster.

## Business Use

Use this component when:

- The task is locating leaders, laggards, major contributors, or key long-tail objects: region, product, channel, salesperson, store, customer, project, supplier, campaign, city, or category.
- The default visible set is Top 5 or Top 10 with deterministic sort and a detail path for the full set.
- The user needs first-screen "who matters most" evidence instead of full audit rows.
- The card can bind exact value, share or denominator, comparison/target when visible, and a stable row/object id.
- Pareto is needed because the question is "which few factors explain most of the total?" rather than simply "who ranks first?"

Avoid this component when:

- The task is exact row reconciliation, many columns, export, editable actions, or audit. Use a Detail Table.
- The question is pure trend over time. Use a trend or time-series card.
- The question is pure composition without ordered leadership. Use donut, stacked bar, treemap, or sunburst.
- The source cannot return deterministic rank, tie-break fields, total denominator, or cumulative contribution for Pareto.
- The visible object count exceeds the card budget and no overflow or detail path exists.

## Pattern Selection

| Pattern | Use when | Visual signature |
| --- | --- | --- |
| `basic-rank-list-card` | Need the cleanest Top 5 list with rank, object, role/category, and value. | Rank badge + optional avatar/icon, object label, secondary text, right-aligned value. |
| `trend-delta-rank-list-card` | Need to explain ranking and period movement. | Rank rows plus change arrows/percent and optional sparkline. |
| `progress-bar-rank-list-card` | Gap size between ranks matters. | Fixed rank/object columns, shared bar track, right-aligned value/share. |
| `podium-rank-card` | The top 3 should feel ceremonially important in a wide hero card. | Top 1-3 framed or staged; ranks 4-5 become smaller list slots. |
| `yoy-microbar-rank-list-card` | Each ranked item needs a tiny recent-history proof. | Row list with micro bars or sparkline plus YoY/MoM column. |
| `radar-comparison-rank-card` | Ranking comes from multi-dimensional score/profile. | Left rank list + right radar profile; keep exact score table or tooltip. |
| `metric-summary-rank-card` | Ranking needs supporting total score/count/average indicators above rows. | 2-3 compact metric tiles above a bounded rank list. |
| `time-switch-rank-card` | Same ranking needs day/week/month or period comparison. | Header segmented period switch plus rank list rows. |
| `share-donut-rank-card` | Top N contribution share is as important as order. | Donut/ring with Top N legend/list and center total or Top N share. |
| `map-distribution-rank-card` | Geography is the object and spatial location matters. | Map/region markers plus ranked side list. |
| `topn-bar-rank-card` | Need compact Top N bars in a card grid. | Top N rows with horizontal bars and "all N" disclosure. |
| `topn-comparison-rank-card` | Need current vs previous/baseline ranking values. | Columns for current, previous/baseline, and change. |
| `topn-waterfall-strip-card` | Need each rank as a contribution strip with cumulative or step effect. | Horizontal strip/bars with rank labels and contribution values. |
| `topn-sparkline-rank-list-card` | Need quick trend proof per Top N object. | Rank list with small line charts in each row. |
| `topn-bubble-rank-card` | Need scale hierarchy more than exact row scanning. | Ranked circles/bubbles with labels and values. |
| `topn-icon-card-grid` | Top N objects benefit from icon/brand/entity cards. | Peer mini cards, top 1-3 highlighted, values and share below. |
| `pareto-basic-card` | Standard Pareto answer: sorted bars + cumulative line + threshold. | Bars sorted desc, cumulative line, 80% reference line, summary stats. |
| `pareto-table-chart-card` | Need exact row audit next to Pareto chart. | Left table/rank + right Pareto chart, total row optional. |
| `pareto-dual-axis-card` | Need strong distinction between item value and cumulative share. | Bars on value axis, line on percent axis, threshold label/crosshair. |
| `pareto-cumulative-fill-card` | Need a more editorial contribution area. | Sorted bars/line with cumulative fill and threshold region. |
| `pareto-stacked-share-card` | Need compare single-item share and cumulative share. | Stacked percent bars plus cumulative curve. |
| `pareto-bubble-card` | Need emphasize key factors as size plus cumulative progression. | Ranked bubbles on x/order axis with cumulative line or threshold guide. |
| `pareto-zone-card` | Need classify key vs secondary factors. | 80% boundary splits key-factor and long-tail zones. |
| `pareto-ring-list-card` | Need compact Pareto summary in a card grid. | Ring shows key-factor share; side list shows ranked factors and cumulative share. |

Default to `progress-bar-rank-list-card` for operational ranking because it shows magnitude gaps clearly. Use `podium-rank-card` or `medal-horizontal-ranking` only for executive or award-like moments with enough width. Use `pareto-basic-card` when the user says 帕累托, 关键少数, 80/20, 贡献集中度, or "主要由哪些因素贡献".

## Data Contract

Every ranking card must declare:

```ts
type RankingCardContract = {
  rankingCardPattern: RankingCardPattern;
  metricId: string;
  metricName: string;
  unit: string;
  topN: number;
  visibleCount: 3 | 5 | 10 | number;
  rankingOrder: 'desc' | 'asc';
  rankField: string;
  objectIdField: string;
  objectNameField: string;
  objectSecondaryField?: string;
  valueField: string;
  shareField?: string;
  denominatorField?: string;
  comparisonField?: string;
  deltaField?: string;
  deltaRateField?: string;
  targetField?: string;
  progressField?: string;
  trendSeriesField?: string;
  scoreDimensionFields?: string[];
  geographyFields?: string[];
  periodField?: string;
  localPeriodOptions?: string[];
  localMetricOptions?: string[];
  defaultLocalOption?: string;
  tieBreakFields: string[];
  totalPolicy: 'all-filtered-rows' | 'visible-top-n' | 'api-provided-total';
  sourceDataset: string;
  numericFormatContractIds: string[];
  badgeRule: 'top3-medals' | 'rank-circles' | 'plain-rank' | 'brand-icons';
  rowVisualEncoding?: {
    barBaseField?: string;
    scaleMaxPolicy?: 'max-visible-row' | 'target' | 'absolute-domain';
    minBarPx?: number;
    sparklineField?: string;
    bubbleSizeField?: string;
    mapRegionField?: string;
  };
  conclusionRule?: string;
  tooltipPayload: string[];
  detailAction?: string;
  overflowStrategy: 'view-all' | 'pagination' | 'drawer' | 'table-fallback' | 'scroll';
  stateRules: string[];
};
```

Every Pareto card must declare:

```ts
type ParetoCardContract = {
  paretoCardPattern: ParetoCardPattern;
  metricId: string;
  metricName: string;
  unit: string;
  itemIdField: string;
  itemNameField: string;
  rankField: string;
  valueField: string;
  totalField: string;
  contributionShareField: string;
  cumulativeValueField: string;
  cumulativeShareField: string;
  thresholdShare: number; // usually 0.8
  keyFactorFlagField: string;
  boundaryItemField?: string;
  longTailField?: string;
  rankingOrder: 'desc';
  tieBreakFields: string[];
  topN?: number;
  otherAggregationPolicy: 'aggregate-tail' | 'show-tail-gray' | 'drawer-detail' | 'table-fallback';
  localMetricOptions?: string[];
  localPeriodOptions?: string[];
  sourceDataset: string;
  numericFormatContractIds: string[];
  tooltipPayload: string[];
  detailAction?: string;
  stateRules: string[];
};
```

Backend/API should return component-ready ranked rows, including rank, values, share, cumulative values, and tie-break fields. The frontend may format values, switch among already-returned bounded local metrics/periods, and render ECharts options. It must not compute an unbounded global ranking or Pareto cumulative result from a paged client subset.

## Shared Anatomy

1. Header: title, metric/unit, local controls, optional layout switch or "more" action.
2. Ranking body: fixed visible row/slot budget, rank signal, object identity, value, and the selected evidence field.
3. Evidence encoding: medals, bars, micro trend, progress, donut, map, radar, bubble, or Pareto threshold.
4. Summary/conclusion strip: one data-grounded sentence or short stat group.
5. Tooltip/detail: full object name, rank, value, share denominator, comparison, target, cumulative share, threshold, formula, source, and update time.

## Size And Placement Rules

| Family | Minimum outer size | Preferred size | Budget |
| --- | ---: | ---: | --- |
| Compact ranking list | `320x240` | `360-480x260-360` | Top 5 rows, row `32-40px`, no heavy visuals. |
| Standard ranking card | `420x300` | `460-640x320-420` | Header `44-56px`, body `180-260px`, footer `36-56px`. |
| Wide podium/medal card | `720x260` | `880-1200x300-360` | Top 3 stage `120-160px`, rank 4-5 compact slots. |
| Donut/radar/map ranking | `520x340` | `640-860x360-460` | Visual fit box `180-260px`, side list `180-260px`. |
| Metric-summary ranking | `560x320` | `640-920x340-440` | Summary cells `>=120px`, row body `>=150px`. |
| Top N card grid item | `360x300` | `400-520x320-420` | Header/control, Top 5 rows, footer disclosure. |
| Pareto chart card | `480x340` | `560-760x360-460` | Pareto plot body `>=220px`, axis/legend/threshold label reserved. |
| Pareto table + chart | `640x360` | `760-1040x400-520` | Table preview `>=220px` wide, chart body `>=260px` wide. |
| Pareto ring + list | `520x340` | `640-860x360-440` | Ring `>=160x160`, ranked list `>=180px` wide. |

Fit rules:

- Visible ranking rows default to `5`; Top 10 requires `H >= 420px`, internal scroll, or table/detail fallback.
- Rank column is fixed `28-44px`; object label column uses `minmax(96px, 1fr)`; value columns are right-aligned and tabular.
- Progress/bar tracks need `>=120px` width; tiny sparklines need `>=56x20`; readable per-row micro bars need `>=48x18`.
- Donut/radar/map/bubble visuals must keep aspect ratio and cannot be squeezed into decorative thumbnails.
- Pareto charts must reserve both value and cumulative-share axes when dual-axis is visible. The 80% threshold label must not collide with bars, line, legend, or axis labels.
- Local segmented controls use `2-4` options; more options collapse to dropdown before they reduce body height.
- If the card cannot fit, degrade in this order: collapse optional local controls, hide avatars/icons, reduce visible rows to Top 3/5, move trends/secondary metrics to tooltip, use `basic-rank-list-card`, then split to table/full chart/drawer/fullscreen.

## Pattern-Specific Rules

### Basic And Trend Ranking Lists

- Use scan-aligned rows, not centered content.
- Top 3 badges may use medal colors. Ranks 4+ should use quieter numeric badges.
- Long object names truncate only after an identity tooltip/detail path exists.
- Trend deltas use semantic arrows and declared direction; do not color every row with unrelated hues.
- Micro trends are optional evidence, not the primary chart. If the trend needs axes or threshold reading, split to a full trend chart.

### Progress And Bar Ranking

- Bar length maps to `valueField / maxVisibleValue` unless target or absolute-domain scaling is declared.
- Keep one shared track width so magnitude gaps are visually comparable.
- Values and shares occupy separate stable columns.
- Bars should stay in one accent family unless status coloring is data-driven.
- If all bars look similar despite different values, the scale is misleading and fails acceptance.

### Podium, Medal, And Icon Card Ranking

- Use only when `W >= 720px` or when each peer mini card has at least `120x140`.
- Top 1 gets the strongest visual treatment; Top 2/3 stay secondary; lower ranks must remain readable.
- Medals/crowns/icons are invalid without `rankField`, sort rule, and tie-break fields.
- Use brand/entity icons only when object identity benefits from them; otherwise use rank badges.

### Donut, Radar, Map, Bubble Ranking

- Donut ranking requires a share denominator and deterministic Top N + `其他` policy.
- Radar ranking requires `3-8` score dimensions, a shared scale, and exact score payload.
- Map ranking requires geography fields, map resource/projection, missing-geo policy, and ranked side list for exact values.
- Bubble ranking requires non-negative size metric, bounded sqrt radius scale, and key-only labels.
- If the shape visual cannot expose exact rank/value/share through tooltip or side list, use a bar/list/table fallback.

### Pareto Cards

- Items must be sorted descending by additive `valueField`.
- `cumulativeShareField` must be computed against `totalField`, not the visible Top N subtotal unless `totalPolicy` explicitly says so.
- The threshold defaults to `0.8`, but business domains may set another value with label and definition.
- The boundary item must be identifiable: the row or mark where cumulative share first meets/exceeds the threshold.
- Long-tail objects use one of: aggregate tail, gray tail marks, drawer detail, or table fallback.
- Use a chart body, not a decorative bar strip, when the card claims Pareto analysis.
- Use `pareto-ring-list-card` only for compact summary; it must still expose the underlying ranked rows and cumulative values through tooltip/detail.

## Visual Rules

- One dominant accent family per ranking card; use semantic variants for status only.
- Use tabular numerals for ranks, values, percentages, and cumulative shares.
- Rank/value hierarchy beats decoration: object name and metric value must remain more legible than badges, crowns, shadows, gradients, or waves.
- Bottom conclusion strips should be weak semantic tints, not a second KPI card.
- Keep row dividers subtle. Ranking cards need fast scanning, not decorative card-within-card nesting.
- Avoid generic blue glass/purple glow/oversized radius unless inherited from a project style token and it does not reduce legibility.

## Interaction And States

- Local period/metric/layout controls affect this component or a declared local group only.
- Hover row/slot/mark shows exact value, share denominator, rank formula, tie-break rule, comparison/target, cumulative share for Pareto, source, and freshness.
- Click row/slot may emit `rankingItemClick` with object id, rank, metric id, period, active filters, and source dataset.
- Click Pareto boundary or key-factor zone may emit `paretoBoundaryClick` or `paretoKeyFactorClick`.
- Loading state preserves header, control, row skeleton count, visual fit box, and footer/conclusion skeleton.
- Empty state distinguishes no data, filtered empty, no permission, no selected period, no ranked objects, or non-additive data rejected for Pareto.
- Tie state shows equal rank or stable secondary sort rule in tooltip.
- Stale state clears selected object if filters remove it from scope.

## Conclusion Strip Rules

The conclusion must be generated from ranking/Pareto data, not generic praise.

Good conclusion patterns:

- `TOP1 object + leading value/share + keep/expand action`.
- `Top3 concentration share + concentration risk/opportunity`.
- `Bottom visible object or weak tail + improvement action`.
- `Pareto keyFactorCount + cumulativeShare + boundary object + focus action`.
- `Ranking change leader/laggard + period + next check`.

Avoid:

- "数据表现良好，请持续关注" with no object, value, period, or action.
- Conclusions that contradict rank/order/cumulative share.
- Repeating the title or only restating the top value.

## Anti-AI Gate

Reject or revise the card when:

- Medals/crowns/podium appear but `rankField`, sort order, or tie-break fields are missing.
- Top N is a visual slice from a paged frontend subset rather than a source-side ranking.
- Percent shares do not declare a denominator.
- The local switch changes active style but not the ranking data.
- The conclusion is generic, ungrounded, or unrelated to the visible top/bottom/key factors.
- Every row has equal emphasis and rank hierarchy is unclear.
- More than Top 10 rows are crammed into one fixed card without scroll/detail/table fallback.
- A map, donut, radar, bubble, or Pareto visual is used without the required geometry-specific data contract.
- Pareto uses unsorted data, non-additive metrics, missing total, missing cumulative share, or no threshold boundary.
- Decorative badges, glass, glow, gradients, or illustrations compete with rank/value reading.

## Acceptance Checklist

- `componentType` is `card`, `visualType` is `ranking-list`, and `rankingCardPattern` or `paretoCardPattern` uses a controlled value.
- The card declares business question, metric, unit, Top N/visible count, ranking order, tie-break fields, total/share policy, source dataset, and numeric display contracts.
- Ranking rows declare object id/name, value, rank, optional share/comparison/target/progress/trend fields, and tooltip/detail payload.
- Pareto cards declare additive value, total, contribution share, cumulative value/share, threshold, boundary item, key-factor flag, and long-tail policy.
- Local period/metric/layout controls declare `controlSemantics: local-filter` unless they change schema, metric definitions, or component collection.
- Source/API returns component-ready ranked/Pareto rows or the bounded-local exception is explicitly justified.
- Visual hierarchy distinguishes top ranks/key factors without hiding tail ranks.
- Overflow strategy is visible and usable: view all, pagination, drawer, table fallback, or declared scroll.
- Tooltip/detail exposes exact value, share denominator, formula, rank/tie rule, cumulative share when relevant, and freshness.
- Loading, empty, no-permission, tie, stale-selection, missing-total, and non-additive Pareto rejection states are defined.
