# Composition, Share, And Structure Card Patterns

Use this reference when a component answers part-to-whole questions such as 占比, 构成, 结构, 份额, 市场份额, 集中度, or composition over time.

The durable standard is text-only. Screenshots may inspire the pattern, but long-lived skills must store controlled pattern names, data contracts, sizing, interaction, and acceptance gates instead of image paths, image vectors, or OCR-only notes.

## Why These Cards Feel Designed

- They keep one denominator visible. Center totals, CR3/CR5 values, `100%`, market totals, or update timestamps make the part-to-whole basis auditable.
- The chart, legend, table, and metric strip share one color identity per category. This makes the card feel intentional instead of like a generated chart collage.
- Local controls are narrow and schema-aware: `占比/数量/金额`, `一级/二级`, `卡片/列表`, or period chips. They change evidence mode or measure basis, not the whole page secretly.
- Dense precision is moved into side lists, bottom metric strips, tooltips, or detail routes while the main visual remains simple.
- `其他` is weak, last, and governed by a merge rule. The card does not pretend that every tiny slice deserves equal visual weight.
- Hierarchy depth is visible only when the data really has parent/child structure. Multi-ring, sunburst, treemap, and structure maps are not used as decoration.
- Trend variants show share movement, not only raw volume movement. Each time bucket must reconcile to the same denominator rule.
- Market-share variants add competitive context such as CR1/CR3/CR5, share ranking, or concentration buckets, which turns the card from a chart into a decision surface.

## Controlled Pattern Field

Set `compositionShareCardPattern` when the reusable card expression matters.

```ts
type CompositionShareCardPattern =
  | 'basic-donut-share-card'
  | 'donut-detail-share-card'
  | 'percent-bar-share-card'
  | 'multi-ring-hierarchy-share-card'
  | 'share-trend-stack-card'
  | 'share-ranking-topn-card'
  | 'treemap-composition-card'
  | 'share-metrics-summary-card'
  | 'stacked-strip-composition-card'
  | 'stacked-column-trend-composition-card'
  | 'funnel-composition-card'
  | 'bubble-composition-card'
  | 'market-share-overview-card'
  | 'market-share-concentration-card'
  | 'share-distribution-interval-card'
  | 'map-structure-card'
  | 'sunburst-structure-card';
```

Use `componentType: 'card'` and `visualType: 'composition-card'`. The owned renderer may still be ECharts pie, bar, treemap, funnel, map, or sunburst, but the mapping is card-level because it combines denominator, legend/detail, controls, freshness, and fallback.

## Pattern Selection

| Pattern | Use When | Primary Evidence | Avoid When |
| --- | --- | --- | --- |
| `basic-donut-share-card` | One small composition with 2-6 categories | Donut + center total/100% + legend | Category count is high or exact ranking is primary |
| `donut-detail-share-card` | Composition plus exact values must stay visible | Donut + side table with value/share | Width cannot reserve side detail |
| `percent-bar-share-card` | Users compare category shares precisely | Horizontal percent bars | The story depends on area perception or hierarchy |
| `multi-ring-hierarchy-share-card` | Two-level parent/child composition | Nested ring with parent/child legend | More than 2-3 levels or tiny child slices |
| `share-trend-stack-card` | Share changes over time | 100% stacked area/bar trend | Period totals do not reconcile to 100% |
| `share-ranking-topn-card` | The largest shares and rank order matter | Ranked list/bars with share | No deterministic Top N or no denominator |
| `treemap-composition-card` | Area size should reveal structure | Rectangular area map | Negative/non-additive values or exact rank-only tasks |
| `share-metrics-summary-card` | One share visual needs total/count/amount summaries | Donut/mini chart + metric strip | Metrics use unrelated denominators |
| `stacked-strip-composition-card` | One category row or one period needs compact composition | 100% stacked strip + legend | Many categories or long labels |
| `stacked-column-trend-composition-card` | Composition across several periods/groups | 100% stacked columns | More than 6-8 periods in small card |
| `funnel-composition-card` | Categories are naturally ordered by level, size, or stage-like share | Funnel + exact value/share table | It is a true conversion funnel; use conversion funnel contract instead |
| `bubble-composition-card` | Approximate share magnitude matters more than exact order | Bubble areas + legend/table | Exact comparison, negative values, or crowded labels |
| `market-share-overview-card` | Competitive market share is the business question | Donut/ranking + market total + share deltas | Denominator is only internal filtered total |
| `market-share-concentration-card` | Concentration or CR metrics are primary | CR1/CR3/CR5, share rings/bars | Market concentration fields are unavailable |
| `share-distribution-interval-card` | Share values are grouped into buckets | Donut/bar by interval | Individual object ranking is the task |
| `map-structure-card` | Geography is the structure dimension | Map + region share/legend | Region is only an org label without geography |
| `sunburst-structure-card` | Hierarchical path share is the decision surface | Sunburst + center total + breadcrumb | Single-level composition or dense exact audit |

## Evidence Binding

Implementation-ready mappings must declare `compositionShareEvidenceBinding`.

```ts
type CompositionShareEvidenceBinding = {
  compositionMode:
    | 'share'
    | 'composition'
    | 'structure'
    | 'market-share'
    | 'concentration'
    | 'distribution';
  metricId: string;
  metricName: string;
  unit: string;
  categoryIdField: string;
  categoryNameField: string;
  valueField: string;
  totalField: string;
  shareField: string;
  denominatorPolicy:
    | 'all-filtered-rows'
    | 'api-total'
    | 'visible-total'
    | 'declared-market-total'
    | 'parent-total';
  orderRule: 'value-desc' | 'business-order' | 'time-order' | 'hierarchy-order';
  otherPolicy: 'topn-plus-other' | 'small-slice-merge' | 'none' | 'blocked';
  topN?: number;
  parentIdField?: string;
  parentNameField?: string;
  levelField?: string;
  parentValueField?: string;
  parentShareField?: string;
  totalShareField?: string;
  childShareField?: string;
  timeField?: string;
  comparisonValueField?: string;
  comparisonShareField?: string;
  deltaShareField?: string;
  concentrationFields?: {
    cr1Field?: string;
    cr3Field?: string;
    cr5Field?: string;
    hhiField?: string;
    otherShareField?: string;
  };
  distributionFields?: {
    bucketField: string;
    bucketSortField: string;
    countField: string;
    bucketShareField: string;
  };
  geoField?: string;
  lonField?: string;
  latField?: string;
  tooltipPayload: string[];
  detailAction?: string;
};
```

## Anatomy

- Header: index/title, optional info icon, `更多`/detail action, and local controls.
- Denominator anchor: center total, market total, `100%`, CR metric, or declared parent total.
- Main visual: donut/pie, percent bars, treemap, stack, funnel, bubble, map, or sunburst.
- Exact evidence: side legend table, bottom metric strip, Top N list, or tooltip/detail route.
- Footer: update time, source/freshness, refresh icon, and compact totals when needed.
- States: loading, empty, denominator-zero, all-zero, negative-value blocked, partial hierarchy, permission-limited, and stale data.

## Size Rules

- `composition_share_card`: minimum `420x300`; standard `480-560x320-380`.
- `composition_share_detail_card`: minimum `480x320`; standard `520-640x340-420`; side detail needs `>=160px`.
- `composition_hierarchy_card`: minimum `520x340`; standard `560-720x360-460`; ring/treemap/sunburst body `>=220x220`.
- `composition_trend_card`: minimum `560x340`; standard `640-760x360-460`; plot body `>=220px` high.
- `composition_map_card`: minimum `560x360`; standard `640-800x380-500`; map body `>=260px` high and aspect-safe.
- Donut/ring fit box `>=180x180`; compact donut may use `>=150x150` only with labels moved to legend/tooltip.
- Percent-bar row height `>=22px`; visible categories default `5-8`, max `10` before pagination/detail.
- Footer metric cells need `>=96px` width each; do not show more than `3` footer metrics in a narrow card.

## Data And Interaction Rules

- Shares must reconcile: visible categories plus `其他` should total `100%` within the declared rounding tolerance.
- Negative values are invalid for pie, donut, sunburst angle, treemap area, funnel width, and bubble size. Route to bar/table/variance when signed contribution matters.
- Zero or denominator-zero states must show explicit copy, not fake equal slices.
- Category identity must be stable across chart, legend, table, tooltip, and drilldown.
- Use `Top N + 其他` for dense compositions. Default is Top 5 plus `其他`; document exceptions.
- Tooltips include category, value, share, denominator, period/filter scope, and source/freshness.
- Drilldown/detail opens the same filtered context and must not change the denominator silently.
- If a local control changes measure basis from `占比` to `数量` or `金额`, declare `componentSchemaImpact: metric-set` or `definition-change` when formulas/units change.

## Anti-AI Pitfalls

- Do not use a donut only because it looks clean. Use bars/table when users must compare close percentages.
- Do not use hierarchy visuals without parent-child data.
- Do not let gradient fills, rounded cards, and blue palettes carry the design. The design comes from denominator clarity, exact values, and controlled density.
- Do not hide all numeric evidence in the chart. At least one exact-value path must be visible or one click away.
- Do not repeat the same composition as donut, bars, and treemap in one view unless each answers a different question.

## Acceptance Checklist

- `analysisPerspective: compositionShare` is declared or the component has a named secondary composition purpose.
- `compositionShareCardPattern` and `compositionShareEvidenceBinding` are set.
- Denominator policy, `shareField`, `totalField`, and rounding behavior are explicit.
- `otherPolicy` is explicit and matches visible labels.
- Category colors are stable across all card surfaces.
- Main visual meets the minimum fit box and does not squeeze labels, controls, legends, or footer metrics.
- Tooltip/detail path exposes exact category value, share, denominator, period, and source.
- Edge states cover empty, denominator-zero, all-zero, negative values, too many categories, and permission-limited data.
