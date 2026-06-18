# Presets Composite Checks And Selection

This file was split from `block-size-constraints.md`. Load it only for this focused rule group; use `block-size-constraints.md` as the routing index.

## 7. Practical Presets

Use these rounded values for planning visible block size. Exact implementation may use CSS variables from the selected template, but the layout decision must remain consistent with these limits. These presets do not cap total report height. They use the prototype content-area split: `1920x1080` review viewport, menu/sidebar deducted horizontally, menu/header deducted vertically, 12 equal columns, 8 equal visible row units for sizing, and no mathematical grid gap.

### Full-Width 1920 Viewport With 160px Menu

Applies to custom pages and `topbar-light-scroll-dashboard-template`.

- `contentWidth = 1920`
- `menuOrHeaderHeight = 160`
- `contentVisibleHeight = 920`
- `visibleGridRows = 8`
- `rowCount = N`, uncapped
- `gap = 0` for mathematical grid splitting
- `rowHeight = 115`
- `columnWidth = 160`

| Span | Width | 1 row | 2 rows | 3 rows |
| --- | ---: | ---: | ---: | ---: |
| `2*N` | 320 | 115 | 230 | 345 |
| `3*N` | 480 | 115 | 230 | 345 |
| `4*N` | 640 | 115 | 230 | 345 |
| `6*N` | 960 | 115 | 230 | 345 |
| `8-col` | 1280 | 115 | 230 | 345 |
| `12*N` | 1920 | 115 | 230 | 345 |

### Left-Nav 1920 Viewport

Applies to `left-nav-analytics-workbench-template` with expanded sidebar.

- `contentWidth = 1664`
- `menuOrSidebarWidth = 256`
- `contentVisibleHeight = 1080`
- `visibleGridRows = 8`
- `rowCount = N`, uncapped
- `gap = 0` for mathematical grid splitting
- `rowHeight = 135`
- `columnWidth ~= 139`

| Span | Width | 1 row | 2 rows | 3 rows |
| --- | ---: | ---: | ---: | ---: |
| `2*N` | 277 | 135 | 270 | 405 |
| `3*N` | 416 | 135 | 270 | 405 |
| `4*N` | 555 | 135 | 270 | 405 |
| `6*N` | 832 | 135 | 270 | 405 |
| `8-col` | 1109 | 135 | 270 | 405 |
| `12*N` | 1664 | 135 | 270 | 405 |

### Sci-Fi 1920 Cockpit

Applies to `frozen-title-sci-fi-cockpit-template` when the title/menu shell reserves `160px`.

- `contentWidth = 1920`
- `menuOrHeaderHeight = 160`
- `availableContentHeight = 920`
- `visibleGridRows = 8`
- `rowCount = N`, uncapped
- `gap = 0` for mathematical grid splitting
- `rowHeight = 115`
- `columnWidth = 160`

| Span | Width | 1 row | 2 rows | 3 rows |
| --- | ---: | ---: | ---: | ---: |
| `2*N` | 320 | 115 | 230 | 345 |
| `3*N` | 480 | 115 | 230 | 345 |
| `4*N` | 640 | 115 | 230 | 345 |
| `6*N` | 960 | 115 | 230 | 345 |
| `8-col` | 1280 | 115 | 230 | 345 |
| `12*N` | 1920 | 115 | 230 | 345 |

If a page needs more than the 8 visible row units, it extends down with `N` rows instead of recomputing a smaller row height.

The prototype-stage bundled templates use one fixed review preset. If a downstream implementation later adds responsive breakpoints, handle that in the frontend stage without changing the 1920x1080 prototype acceptance target.


## 8. Composite Block Checks

When one parent block contains internal sub-blocks, check the parent block against the most demanding sub-block plus the required `5px` parent-to-sub-block inset, `5px` sibling sub-block gaps, headers, dividers, controls, legends, and state surfaces. Then check every sub-block against the component it owns.

For composed parent blocks:

```text
subBlockInset = 5px
subBlockGap = 5px
usableSubBlockAreaWidth = parentBodyWidth - subBlockInset * 2
usableSubBlockAreaHeight = parentBodyHeight - subBlockInset * 2
```

If the internal layout has multiple columns or rows, subtract `subBlockGap * (columnCount - 1)` from the width axis and `subBlockGap * (rowCount - 1)` from the height axis before calculating each sub-block viewport.

Split into separate parent grid blocks, tabs, drawer, fullscreen, or drilldown when:

- sub-blocks answer different business questions;
- each sub-block needs an independent block-level title, filter, action, or drilldown path;
- any sub-block's final validated size cannot be safely represented inside the parent block;
- there are more than four analytical sub-blocks visible at once unless they are repeated peers that pass the internal `M * N` and parent-height checks, or the parent is a declared `micro-dashboard` with `microDashboardCardPattern`, parent minimum `680x620`, and child minimum-size proof;
- internal scrolling becomes the main way to understand the block.

KPI/status peers should use the exact internal sub-block layout rule only when `actualTotal > 4`; for `actualTotal <= 4`, use a small-group layout. When the algorithm applies, prime `actualTotal` first becomes `layoutTotal = actualTotal + 1`, `layoutTotal = M * N`, `M >= N`, and `M - N` is minimal among valid factor pairs. Every tile/sub-block still needs pixel validation; split the group when the factor pair is unreadable.

For a composed large parent block, the internal matrix feeds the parent height decision. If the internal peer layout has `N` rows, calculate the parent block height expansion with:

```text
heightExpansionRows = ceil(N * 2 / 3)
```

Then calculate the parent block body height needed as:

```text
requiredParentBodyHeight =
  subBlockInset * 2
  + heightExpansionRows * childMinOuterHeight
  + max(0, heightExpansionRows - 1) * subBlockGap
  + internalControlsOrDividerReserve
```

If the current parent body height is smaller, expand the parent block's row span until it passes. In practical terms, a block that could carry one row of child tiles uses roughly `N * 2 / 3` as the height expansion baseline when the internal matrix has `N` rows; convert fractional results to whole page-grid rows by rounding up. Do not reduce row height, padding, title height, or child chart/table body height to make the current parent block pass.


## 9. Layout Rules

- The page-grid span belongs to the top-level parent block; internal sub-blocks must not create nested page grids.
- Internal sub-blocks are local layout regions inside the parent body. They may use local grid/flex tracks, but they must have explicit min size, gap, overflow, and state behavior.
- Internal sub-blocks use `5px` inset from the parent body and `5px` sibling gaps. Do not silently collapse these gaps to make a cramped block pass.
- Do not treat `1920x1080` as the report's maximum height.
- Do not reduce `N`, row height, title space, chart body height, or table body height to force the full report into one viewport.
- Do not divide available viewport height by `N` to create smaller rows.
- Do not skip the default span distribution before size checking.
- Do not render any component whose computed outer size or content viewport is smaller than its final required size.
- Do not accept domain navigation, Tabs, or Segment controls whose visible item/card content viewport fails `scrollHeight <= clientHeight + 2` or `scrollWidth <= clientWidth + 2` at `1920x1080`.
- Do not pack more than two primary information layers into one perspective navigation card.
- Do not accept fixed-height navigation/cards without a declared padding, line-height, gap, and height-budget calculation.
- Do not accept fixed-height navigation/cards whose measured DOM has `scrollHeight > clientHeight + 2` or `scrollWidth > clientWidth + 2`, even if the screenshot looks acceptable.
- Do not duplicate block titles inside chart/table/KPI bodies.
- Do not make peer components too narrow, tiny, crowded, or unreadable; when `actualTotal > 4`, use internal exact `M * N` layouts, expand the parent block, split sections, or move details to drawer/fullscreen.
- Do not treat a dense Micro Dashboard Card as a normal Composite Panel. Use `micro_dashboard_card` sizing rules, child minimums, and lower-priority collapse; otherwise split, tab, drawer, or fullscreen.
- Do not use a generic `chart`, `table`, `map`, or `other` label when a precise component type exists.
- Do not use more than one internal scroll area in one block.
- If a title, legend, axis label, table column, toolbar, or status tag does not fit, increase the span or simplify the component.
- Do not expand a sparse component just to fill space. If the allocated `3*2` or larger block lacks enough content, enrich it with labels, target/average lines, exact-value paths, lists, or actions, or reduce/split the block.
- If a block needs long explanations, detailed table review, or multiple independent actions, use a drawer/detail page instead of expanding the card forever.


## 10. Selection Steps

1. Choose the business question for the block.
2. Decide whether the parent block is single-component or internally sub-blocked.
3. If internally sub-blocked, define sub-blocks, component owner, local tracks, `5px` parent inset, `5px` sibling gap, and state behavior.
4. Pick a default candidate parent span from `grid-containers.md`.
5. Classify the dominant component with the detailed size table and validate every sub-block component against its own minimum.
6. Apply base minimum size and complexity expansion.
7. Compute actual parent outer/body pixel size and sub-block viewport sizes.
8. For fixed-height navigation/cards, declare padding, explicit line-height, row count, gaps, and footer/status heights; verify `requiredContentHeight <= cardHeight`.
9. For domain navigation, Tabs, and Segments, run DOM no-clipping checks at `1920x1080`: `scrollHeight <= clientHeight + 2` and `scrollWidth <= clientWidth + 2`.
10. Keep the default span if it passes; otherwise try the next larger candidate span or redesign the block.
11. If total report height exceeds the first viewport, keep block sizes and enable vertical scrolling.
12. If the block still fails any constraint, either:
   - increase the span,
   - switch simultaneous sub-blocks/components to tabs/segmented views,
   - move details to a drawer/modal,
   - or split into separate `12 * N` blocks.
