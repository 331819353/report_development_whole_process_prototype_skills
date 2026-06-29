# Grid And Containers

## 1. 1920x1080 Content Grid

All report content display areas must start from the fixed `1920x1080` prototype review viewport and then split the usable content area:

- `1920x1080` is the fixed prototype review viewport.
- Deduct horizontal menu/sidebar width before calculating column units.
- Deduct vertical menu/header height before calculating row units.
- The visible content display area is divided into 12 equal columns and 8 equal row units for sizing.
- Row count is `N` and is not capped by the grid rule. The report continues downward using the same rowHeight and scrolls vertically when `N * rowHeight` exceeds the visible content height.
- For a full-width topbar page with a 160px horizontal menu/header, `colWidth = (1920 - 0) / 12 = 160px` and `rowHeight = (1080 - 160) / 8 = 115px`.
- For a left-nav page with a 256px vertical menu/sidebar and no horizontal menu/header, `colWidth = (1920 - 256) / 12 ~= 138.67px` and `rowHeight = (1080 - 0) / 8 = 135px`.
- Every top-level content block occupies one or more complete page-grid cells and acts as a parent block.
- Every top-level content block's occupied area must be rectangular.
- When a PRD exists, derive the grid from the PRD section 4C reader-facing page preview first. The preview names filters, toolbar actions, major blocks, business content, and interaction entries; `layoutRows` is the machine-checkable execution form of that preview, not a separate layout invention.
- Implementation handoff must include a machine-checkable row audit: every `layoutRows` string is exactly 12 cells wide, no `layoutRows` string exceeds 12 cells, total row count `N >= 8`, every block letter is rectangular, every block has `colStart`, `colSpan`, `rowStart`, `rowSpan`, and every block id maps to one downstream block layout template.
- A top-level parent block may contain multiple internal sub-blocks, and each sub-block may contain one component or a tightly related micro-group. Internal sub-blocks do not count as page-grid blocks. See `block-composition.md`.
- Internal sub-block layouts always reserve `5px` from the parent block body edge and `5px` between sibling sub-blocks.
- Major sections may occupy full-width 12-column rows.
- The minimum top-level block is `2 * 1`.
- The default analytical block is `3 * 2`. Use it before trying larger or custom spans.
- Dense work surfaces may use 2-column, 3-column, 4-column, 6-column, 8-column, or 12-column spans, but all spans must align to the 12-column grid and the 8-row first-viewport sizing rhythm.
- Drawers and modals are overlays and do not count as content-grid blocks.

Do not use masonry, staggered, diagonal, floating, or irregular component shapes.
Do not use prose-only layout such as "8+4", "three columns", or "upper/middle/lower" as the final handoff. Convert the reader-facing preview into 12-character `layoutRows` before template implementation. Reject any row with more than 12 characters, any page with fewer than 8 rows, and any grid that contradicts the PRD section 4C page preview.

After choosing a default span, calculate its actual pixel size with `block-size-constraints.md` at `1920x1080`. Keep `3 * 2` when the content fits; enrich sparse content, split, or move detail content only when the size check fails.

## 2. Scroll And Row Height

For scrollable page templates and blank scrollable report pages:

- Row height is a derived grid unit, not an arbitrary minimum: `rowHeight = (visibleHeight - menuOrHeaderHeight) / 8`.
- Column width is also derived: `colWidth = (visibleWidth - menuOrSidebarWidth) / 12`.
- If `N * rowHeight` exceeds the visible content area, keep row/block heights and enable vertical scrolling.
- Do not shrink blocks below usable size to force everything into the first viewport.
- Page design should fill the first 8 visible row units intentionally when the business content supports it, while implementation allows the report's total height to grow with `N`.
- Do not recalculate row height from the total number of report rows. Use the first-viewport 8-row unit, then add rows, scroll, split, or paginate instead of compressing the unit.
- The first `1920x1080` viewport must feel intentionally filled. Reject layouts with large unused bands, oversized panels carrying thin content, or lower-row fragments that look accidentally clipped.

Fixed sci-fi/big-screen cockpit layouts use the same content-area formula unless a documented one-screen cockpit exception is explicitly accepted.

## 3. Recommended Spans

Use these common spans before detailed size checks:

- Hero summary or main conclusion block: 12 columns only when it carries enough decision content; otherwise use `6*2`, `8*2`, or split.
- Default chart or analysis block: `3*2`.
- KPI strip: six cards at `2*1` or four richer cards at `3*2`; more KPIs should use two rows, tabs, or pagination.
- Primary chart + side insight: `8+4`, `6+3+3`, or `4+4+4` columns when visual weight remains balanced.
- Four balanced panels: `3+3+3+3` columns.
- Three panels: `4+4+4` columns.
- Table or task list: usually `6-12` columns and at least `2-4` rows depending on density.
- Secondary cards: `2*1`, `3*2`, or `4*2`.

Use `block-size-constraints.md` before finalizing dense parent blocks, composite widgets, tables, or any block containing repeated visible sub-blocks/components.

For peer component groups or repeated sub-blocks inside one large parent block, use an internal exact `M * N` distribution where `M` means local columns and `N` means local rows:

1. Let `total` be the actual number of peer cards/charts/tiles shown together.
2. If `total <= 4`, do not apply this factor algorithm; use a small-group layout based on content and the parent block shape.
3. If `total > 4` and `total` is prime, set `layoutTotal = total + 1`; otherwise set `layoutTotal = total`.
4. Find integer factor pairs where `layoutTotal = M * N`.
5. Keep only pairs where `M >= N`.
6. Choose the pair with the smallest `M - N`.
7. Use this pair as the internal sub-block matrix inside the large parent block, reserve `5px` inset/gaps, then check whether the parent block needs more page-grid rows with `heightExpansionRows = ceil(N * 2 / 3)`.
8. Do not add arbitrary empty placeholders to force a prettier matrix. The only allowed spare cell is the single prime-balancing cell created by `layoutTotal = total + 1`; it must not create fake metrics or mock data. If the pair creates an unreadable strip, split the group by business meaning, tabs, pagination, drawer, or another parent block.

Example: when a parent block such as `12 * 2` contains 8 peer sub-blocks, the internal matrix is `4 * 2`; then verify whether the `12 * 2` parent block has enough body height under `heightExpansionRows = ceil(2 * 2 / 3) = 2`. If not, expand the parent block row span instead of compressing the 8 child components.

Examples: 1-4 peers -> small-group layout, not this algorithm; 5 peers -> calculate as 6 -> `3 * 2`; 6 peers -> `3 * 2`; 7 peers -> calculate as 8 -> `4 * 2`; 8 peers -> `4 * 2`; 9 peers -> `3 * 3`; 10 peers -> `5 * 2`; 11 peers -> calculate as 12 -> `4 * 3`; 12 peers -> `4 * 3`.
- Avoid one long strip or one narrow column unless the component is explicitly a timeline, KPI strip, or navigation.

## 4. Default Span Distribution

Start with the default span distribution below. When one parent block contains multiple sub-blocks/components, choose the row by the dominant or most layout-demanding internal component, then validate every sub-block viewport.

| Component type | Default candidate spans |
| --- | --- |
| 折线图 / 柱状图 / K 线图 / 热力图 | default `3*2`; allowed `4*2`, `3*3`, `4*3` |
| 饼图 / 雷达图 / 旭日图 / 仪表盘 | default `3*2`; allowed `3*3`, `4*3` |
| 散点图 / 盒须图 | default `3*2`; allowed `4*2`, `3*3`, `4*3` |
| 平行坐标系 | default `3*2`; allowed `4*2`, `3*3`, `4*3` |
| 地图 / 路径图 / 关系图 / 树图 / 矩形树图 / 漏斗图 | default `3*2`; allowed `3*3`, `4*3` |
| 桑基图 | default `3*2`; allowed `3*3`, `4*3` |
| 指标卡 | `2*1`, `3*2` |
| 表格 | `3*2`, `4*2`, `6*2`, `8*2`, `4*3`, `6*3`, `8*3`, `12*3`, `6*4`, `8*4`, `12*4` |
| 结论卡 / 行动卡 / 说明卡 | `3*2`, `4*2`, `6*2`, `8*2`, `12*1`, `12*2` |
| 其他组件 | default `3*2`; allowed `2*1`, `4*2`, `3*3`, `4*3` |

Rules:

- Pick the smallest span that matches the component's importance and expected density.
- For ordinary chart blocks, start at `3*2` and never exceed `4*3`; conclusion cards are the exception when they need a wider reading strip.
- Validate the selected span with `block-size-constraints.md`.
- If the selected span fits, keep it.
- If it does not fit, try the next larger candidate span in the same row.
- If no candidate span fits, split the content, use tabs, move details to drawer/fullscreen, or change the component type.
- Do not shrink text, hide overflow, or overlap legends to force a too-small span.
- Composite parent blocks with multiple sub-blocks must still declare one dominant `visualType` for template sizing; use the dominant visual type, or `other` only when no supported visual type dominates. Individual sub-blocks may carry their own component type in implementation metadata.

## 5. Block Internal Anatomy

Each content block separates frame from component body:

- Block frame: unified card background, radius, shadow, safe padding, optional actions.
- Header/title area: title, subtitle, unit, status tag, small actions.
- Component body: the parent viewport where charts, tables, KPI groups, text, empty states, diagrams, business components, and optional internal sub-blocks render.
- Optional footer: source, pagination, note, or legend only when reserved height exists.

Rules:

- Module title sits top-left as plain text: 16px, `font-weight: 600`, deep gray on light theme.
- Do not put the title in a boxed nested card.
- The block header owns the visible component title. ECharts/S2/custom component bodies must not render a duplicate visible title inside the body viewport when the block already has one.
- Section, group, layer, stage, lane, and column titles must occupy a reserved title band. They must stay at least 16px away from card borders, node boxes, connector paths, legends, badges, and child labels.
- When a diagram has top layer titles such as `L1/L2/L3`, subtract the reserved title band from the body viewport before placing the first node row. Do not draw nodes upward into the title band.
- Component body must fill the body rectangle and not create an unnecessary inner moat.
- Component body composition defaults to center-axis symmetry: the main visual/value group sits on the component's central axis after title, legend, controls, and footer bands are reserved. This is a composition rule, not a requirement to center every text line.
- The body viewport must have explicit `min-width: 0`, `min-height: 0`, and a defined overflow strategy.
- ECharts and AntV S2 instances must mount and resize against the body viewport, not the whole card frame.
- If the body contains internal sub-blocks, each sub-block needs its own stable internal viewport, local label/control area when needed, `5px` inset/gap spacing, and explicit overflow rule. It must remain visually subordinate to the parent block title.
- Internal sub-blocks may use section labels, legends, axis names, column names, chips, or short labels, but not duplicate parent block-level titles or introduce nested card shadows.
- Empty/loading/no-permission states stay centered inside the body viewport and must not replace the title area.

## 6. Overflow Rules

The page should not be visually cut off by the browser viewport, sidebar, or grid container.

- The outer shell should separate sidebar and main content with stable grid/flex layout.
- Main content must use `min-width: 0` behavior so wide children do not push it outside the viewport.
- The report content display area should scroll vertically as a whole unless a component explicitly owns internal scroll.
- Avoid page-level horizontal overflow.
- Wide tables, timelines, and complex diagrams may scroll or pan inside their own viewport.
- Tables should use content-aware widths, wrapping, table-level horizontal scroll, and sticky/frozen key columns when needed.
- Tables must not expand the grid block or rely on page-level horizontal overflow.
