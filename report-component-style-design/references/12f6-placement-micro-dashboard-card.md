# Micro Dashboard Card Placement Pattern

Use this reference when one large card intentionally contains a complete mini dashboard for one management topic. This pattern is larger than a normal Composite Panel. It exists to cover reusable screenshot-derived cards where a KPI strip, multiple charts, a small table, and status/detail evidence are designed as one compact analytical board.

Do not use this pattern as a workaround for page-grid planning. A Micro Dashboard Card must still answer one topic and must pass every child minimum-size check before it is accepted.

## Pattern Field

Use `microDashboardCardPattern` with one of these controlled values:

| value | Use when | Typical evidence sequence |
| --- | --- | --- |
| `sales-fresh-analysis-board` | Sales, revenue, order, target, channel, region, and Top object analysis should feel fresh and growth-oriented. | KPI strip -> trend -> channel/composition -> region/ranking -> target progress -> Top table |
| `user-operations-purple-board` | User acquisition, retention, active users, conversion, cohort, heatmap, and product operation analysis are primary. | KPI strip -> active trend -> user composition -> funnel -> heatmap -> sparklines |
| `supply-chain-orange-monitoring-board` | Procurement, supplier, inventory, logistics, warning, shortage, or exception monitoring is primary. | KPI strip -> procurement trend -> supplier delivery -> inventory mix -> warning table -> logistics status |
| `finance-blue-analysis-board` | Revenue, profit, cost, expense, cash, account balance, or finance reconciliation is primary. | KPI strip -> income/cost -> expense mix -> profit trend -> cash status -> account table |

## Why The Samples Work

- One topic owns the full card. The card does not feel like a random chart collage because every child supports the same management question.
- The top KPI strip answers "how are we doing now" before charts ask "why" or "where".
- Child charts are small but not arbitrary. Each one has a different evidence role: trend, structure, ranking, completion, warning, or detail.
- The theme color is semantic: green for growth/sales, purple for user operations, orange for warning/supply pressure, blue for finance/trust.
- Visual surfaces are restrained. Thin borders, light shadows, small radii, real labels, and real data density prevent a generic AI/SaaS look.
- The bottom or side detail component proves exact-value credibility. It gives the compact board an audit path instead of only decorative charts.

## Minimum Container

Micro Dashboard Cards are large parent components. They are not normal `composite_panel` blocks.

| target | width | height | decision |
| --- | ---: | ---: | --- |
| Absolute minimum | 680 | 620 | Only 3 KPI tiles plus 4 child sections; table/status strip may collapse into tabs. |
| Recommended portrait card | 720-960 | 760-980 | Supports 4 KPI tiles, 4-6 analytical child sections, and one compact table/status section. |
| Recommended wide card | 960-1280 | 560-760 | Supports a wide KPI strip plus 5-7 child sections in a 3-column layout. |

If the parent width is below `680px` or height below `620px`, do not render all children simultaneously. Use a summary card plus tabs, drawer, fullscreen detail, or split blocks.

## Child Minimums

Each visible child must pass its own useful viewport floor after subtracting parent padding, header, local labels, legends, and gaps.

| child role | min width | min height | recommended | notes |
| --- | ---: | ---: | --- | --- |
| KPI tile | 120 | 64 | 140x72 | 2 text rows plus value/delta; long titles wrap to 2 reserved lines. |
| Primary line/bar chart | 220 | 150 | 280x180 | Plot body must remain at least 110px high. |
| Small axis chart | 180 | 128 | 220x150 | Axis labels sampled; ordinary data labels hidden. |
| Donut/pie/ring | 150 | 140 | 180x160 | Use legend-first labels; center text must fit. |
| Funnel | 180 | 140 | 220x160 | Stage count `3-5` preferred; exact values in tooltip/detail. |
| Heatmap | 220 | 130 | 260x160 | Cell labels are optional and thresholded. |
| Sparkline group | 160 | 96 | 200x120 | No full axes; use endpoint/tooltip. |
| Compact table preview | 320 | 150 | 360x180 | 3-5 columns, 3-5 rows, detail route required. |
| Status strip item | 96 | 56 | 112x64 | Icon, label, value/status; no hidden critical value. |

If any child falls below its minimum, collapse lower-priority children in this order: ornamental note -> status strip -> table preview -> sparkline group -> secondary composition -> secondary ranking -> primary chart. Never shrink the primary chart below its plot floor.

## Layout Patterns

### Portrait KPI Grid

Use for narrow dashboard cards around `720-960px` wide.

```text
header: title + period/filter/action
kpiStrip: 4 equal KPI tiles
bodyGrid: 2 columns
  row 1: primary trend spans left or full width depending on topic
  row 1/2 side: composition, funnel, or progress card
  row 2: ranking/bar/heatmap/detail evidence
  row 3: compact table/status/sparkline section, often full width
```

Minimum body grid rules:

- `gap = 8-12px`, parent padding `12-16px`.
- Use equal-width KPI tracks only after each KPI tile has at least `120px`.
- Primary chart should receive `45-60%` of the body area when the trend is the main evidence.
- Table preview may span full width; it must not reduce chart plot height below the chart floor.

### Wide KPI Grid

Use for wide parent cards around `960-1280px` wide.

```text
header
kpiStrip: 4-6 KPI tiles
bodyGrid: 3 columns
  primary trend or combo chart spans 2 columns
  right column: composition/progress/funnel
  bottom row: table, status, or small multiples
```

Use wide layout only when every column stays at least `220px` wide and the primary chart remains at least `420x220`.

## State Geometry

- Whole-card loading is allowed only when the shared dataset or required parent context is unavailable.
- If one child dataset is empty and siblings still have evidence, show a child-level state mask inside that child viewport.
- If every child is empty after the same filter, show one parent-level explanatory empty state that names the filter and reset action.
- No-permission state must not leak hidden totals through muted child charts, axes, or row counts.
- Error states should preserve the card layout and offer retry at parent level only when the failure affects the shared data load.

## Binding Contract

A Micro Dashboard Card mapping must declare:

- `visualType: micro-dashboard`.
- `microDashboardCardPattern`.
- `microDashboardContract.topic`.
- `microDashboardContract.themeTone`.
- `microDashboardContract.layoutPattern`.
- `microDashboardContract.kpiCount`.
- `microDashboardContract.sections[]` with `id`, `role`, `componentType`, `visualType`, `patternField`, `priority`, `minW`, `minH`, `datasetId`, and `fallback`.
- `microDashboardContract.parentMinW` and `parentMinH`.
- Shared filters and linked interactions.
- Parent/child state rules.

## Acceptance Checklist

- The card has exactly one topic and one decision path.
- `microDashboardCardPattern` is one of the controlled values in this reference.
- The parent card passes the minimum container size.
- Every visible child passes its minimum useful width and height.
- No more than `8` visible analytical child sections are shown at once; `9+` requires tabs, split cards, or fullscreen.
- The KPI strip, primary chart, secondary charts, and detail/status section have clear priority, not equal-weight collage.
- Child labels are subordinate to the parent card title; no nested card shadows or repeated title hierarchy.
- Standard charts are implemented by ECharts or the project chart renderer, not hand-drawn DOM marks.
- Detail tables expose exact values, row grain, and detail/export route.
- Empty/loading/error/no-permission states preserve geometry and follow parent-vs-child state scope.
