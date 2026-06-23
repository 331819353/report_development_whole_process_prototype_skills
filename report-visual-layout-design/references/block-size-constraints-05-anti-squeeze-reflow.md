# Anti-Squeeze Reflow And Minimum Floors

Use this file when a parent block, peer row, KPI group, conclusion block, chart/table composite, or dense component becomes cramped after the first span choice. This is a design-stage gate, not only a runtime overflow check.

## 1. Layout Fit Contract

Before page layout is accepted, every dense or metric-bearing component must carry a `layoutFitContract` from component mapping or an equivalent layout note:

```text
layoutFitContract =
  componentFamily
  componentType / visualType / controlled pattern field
  priority: P1 | P2 | P3 | P4
  plannedSpan: columns * rows
  minOuterW / minOuterH
  minContentW / minContentH when known
  metricCellMinW when metric cells exist
  requiredTextRows with fontSize and lineHeight
  requiredSlots: title, value, evidence, action, source, state, legend, axis, tableBody, footer
  densityLimits: visible metrics / rows / columns / categories / series / labels
  overflowStrategy: enlarge | row-group-expand | full-row | split | tab | drawer | fullscreen | paginate | scroll | downgrade
  squeezeFailureCode
```

The layout stage must calculate the actual pixel size from the `1920x1080` review viewport, current shell deductions, 12 columns, and 8 visible row units. The selected span passes only when the actual size is greater than or equal to the final required size after complexity expansion.

Missing `layoutFitContract` keeps implementation-ready layout `partial` for KPI overview cards, KPI groups, Composite Panels, Micro Dashboard Cards, chart + table/list cards, detail tables, dense rankings, and any component that previously failed due to crowding.

## 2. Row Group Expansion Gate

A row group is a set of top-level blocks that share one horizontal page-grid row and one decision level, such as `conclusion + core KPI + risk/action`, `primary chart + side insight`, or `ranking + detail preview`.

When one core block in a row group needs more height:

1. Recompute the row group as a whole.
2. Increase the row group's bottom edge to the largest required `rowSpan` among its member blocks.
3. Keep same-row blocks bottom-aligned unless a deliberate split-row redesign is chosen.
4. Let sibling blocks occupy the same enlarged row height only when their content can use the added space meaningfully.
5. If siblings become sparse shells, fill the added area with decision-relevant evidence, source/freshness, action/detail route, small trend, state explanation, or trust note.
6. If siblings still have no useful content after enrichment, split the row group or move the enlarged block to a full row.

Do not create a jagged page-grid row where one block grows vertically and neighboring blocks leave arbitrary holes. Do not stretch decorative chrome, background, or empty card body only to match a taller neighbor.

## 3. Full-Row Move And Vacancy Reflow Gate

When a block cannot fit in its current column span and should move to a full row or wider row:

1. Preserve the primary decision path first. P1/P2 blocks such as core conclusion, core KPI, primary evidence chart, diagnostic result, or critical action may move to `12 * N`, `8 * N`, or another wider legal span before optional content.
2. Mark the old rectangle as a vacancy and classify it by business adjacency:
   - same-decision-chain content;
   - same-row support content;
   - low-priority optional content;
   - no useful fill.
3. Fill vacancy first with same-decision-chain blocks such as risk summary, action recommendation, trust/source, anomaly list, Top N evidence, or compact detail route.
4. If no related block exists, allow a sibling block to expand horizontally only when the expanded block reveals additional business value, such as more columns, more categories, richer trend points, clearer labels, or a visible exact-value path.
5. If expansion only creates empty white space or inflated decorative chrome, do not stretch it. Repack the row group or let the report continue downward with a clean `12 * N` flow.
6. Keep the grid rectangular. Do not use masonry, staggered fragments, fake placeholders, or low-priority cards solely to fill holes in the first viewport.

The output must state the chosen reflow action: `filled-by-related-block`, `sibling-expanded-with-new-value`, `row-group-repacked`, `full-row-flow`, or `blocked`.

## 4. Minimum Typography And Interaction Floors

These floors apply after inherited design-system tokens. Component-specific references may raise them but must not lower them without a documented baseline-only exception.

| Element | Minimum | Recommended |
| --- | ---: | ---: |
| Body / explanation text | `12px` | `13-14px` |
| Table / list cell text | `12px` | `13px` |
| Card or block title | `14px` | `16px`, weight `600` |
| Helper, source, freshness, unit, metadata | `11px` only for weak metadata, otherwise `12px` | `12px` |
| KPI primary value | `24px` | `28-36px` |
| Top-priority wide KPI primary value | `28px` | `36-40px` after fit proof |
| KPI secondary value / YoY / MoM | `12px` | `12-13px` |
| Control/button/filter text | `12px` | `13-14px` |
| Normal body line height | `16px` | `1.35-1.5` |
| Dense metadata line height | `15px` | `16-18px` |
| Click/tap target height | `28px` | `32px+` |
| Card padding | `12px` | `16px+` |
| Component internal gap | `8px` | `8-12px` |
| Parent sub-block inset/gap | `5px` | fixed by block-composition rules |

Do not reduce fonts below these floors to pass a cramped layout. The accepted fixes are span growth, row-group expansion, full-row move, split, tab, drawer/fullscreen, pagination, density reduction, or component downgrade.

## 5. Component Floor Shortlist

Use the detailed size table as the source of truth. These are common hard floors that must be checked early because they frequently cause squeeze defects:

| Component family | Minimum floor |
| --- | --- |
| `simple_kpi` | `220x120` |
| `rich_kpi` | `300x160` |
| `single_indicator_kpi` | `360x220` |
| `kpi_overview_card` | `720x220`; metric cell `>=128px`; lead metric zone `>=180px` |
| `kpi_judgment_card` | `360x240` |
| `kpi_goal_execution_card` | `360x240` |
| `kpi_time_series_card` | `360x240`; temporal evidence zone `>=112px` |
| `kpi_comparison_analysis_card` | `360x240` |
| Axis-line / axis-bar diagnostic KPI | `420x260` |
| Axis-scatter diagnostic KPI | `420x300` |
| Spatial-map diagnostic KPI | `460x320` |
| Paired-comparison diagnostic KPI | `420x260`; each pane `>=140px` |
| Full axis chart body | content `>=300x200`; chart body `>=180px` |
| Dense/combo/chart + table/list body | chart body `>=220px`; plot `>=140px` |
| Detail table | at least `4` useful rows by default; fewer than `3` rows fails unless it is a named preview with detail route |
| Composite Panel | normal parent `640-960px` wide and `360-560px` high; primary child `50-70%`; `contentH >= CH * 0.60` |
| Micro Dashboard Card | parent `>=680x620`; lower-priority children collapse before primary evidence shrinks |

## 6. Failure Codes

Use these failure codes when the design cannot pass without redesign:

- `VIS-BLOCK-SQUEEZED`: parent block actual size is below required size.
- `VIS-ROWGROUP-SQUEEZED`: a row group cannot expand/repack without harming siblings.
- `VIS-VACANCY-REFLOW-MISSING`: a full-row move creates an unhandled vacancy or arbitrary stretching.
- `VIS-KPI-CELL-SQUEEZED`: KPI metric cell width or value slot floor fails.
- `VIS-TYPOGRAPHY-FLOOR-BROKEN`: text, line-height, or control target falls below the floor.
- `VIS-FILLER-STRETCH`: a sparse sibling is stretched only to fill a hole.
- `VIS-PLACEHOLDER-FILL`: fake data or low-priority filler is used to patch layout gaps.

Any of these keeps layout readiness `partial` or `blocked` until the reflow decision and fit proof are updated.
