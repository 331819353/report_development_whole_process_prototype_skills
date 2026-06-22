# Template Layout Design System

Use this file when extracting, applying, or reviewing common layout design from bundled report templates. It turns layout details currently scattered across `dashboard.config.ts`, `DashboardShell.vue`, `WidgetRenderer.vue`, and `src/styles.css` into one reusable template contract.

The current bundled assets contain three directories and three layout families:

| Layout family | Template assets | Primary use |
| --- | --- | --- |
| Topbar scroll dashboard | `topbar-light-scroll-dashboard-template` | Single-page scrollable dashboard with top title/control bar. |
| Left-nav analytics workbench | `left-nav-analytics-workbench-template` | Multi-page workbench with persistent navigation and scrollable right content. |
| Frozen-title cockpit | `frozen-title-sci-fi-cockpit-template` | Fixed 1920 * 1080 cockpit with image-backed title band and dark visual framing. |

## 1. Common Layout Layers

All template families use the same conceptual layers:

1. Design frame: fixed design width/height, normally `1920 * 1080`.
2. Shell frame: topbar, left-nav, or frozen title/header area.
3. Content canvas: vertical region bounded by `screen.grid.contentStartY` and `screen.grid.contentEndY`, or by row count and `rowHeight` when the page scrolls.
4. Content block grid: `layoutRows` characters resolve into rectangular blocks on a 12-column grid; column width comes from `(visibleWidth - menuOrSidebarWidth) / 12`, rowHeight comes from `(visibleHeight - menuOrHeaderHeight) / 8`, and long pages reuse the same rowHeight for `N` rows.
5. Block frame: `.placeholder-cell` reserves `cellPadding` around the block.
6. Block card: `.placeholder-cell-inner` owns the visible card/frame surface, body viewport, radius, shadow, and theme surface.
7. Widget viewport: `.placeholder-cell-body > .widget-renderer` fills the card body and gives the business component or composite parent widget a stable `100% * 100%` viewport.
8. Component-owned title/control area: visible block titles, local filters, panel triggers, links, and detail actions are rendered inside the business component or composite parent widget, not by the page layout or template shell.
9. Optional component-owned block chrome: when `blockChromePattern` is selected, the business component/composite widget renders its title-stage chrome and body-background family inside `.widget-renderer`; the template shell still owns only the outer block viewport.
10. Optional internal sub-blocks: when a parent widget contains multiple components, the widget defines local grid/flex sub-blocks inside `.widget-renderer`; these are not page-grid blocks. The sub-block grid uses `5px` inset from the parent widget viewport and `5px` gap between sibling sub-blocks.

## 2. Config-Owned Tokens

Normal report delivery should change these fields through `src/config/dashboard.config.ts`, not by hardcoding parallel values in `src/styles.css`.

| Token | Source | Meaning | Rule |
| --- | --- | --- | --- |
| `designWidth`, `designHeight` | `screen.layout` | Fixed design frame size. | Keep `1920 * 1080` unless the user explicitly changes display target. |
| `topbarHeight` / sidebar widths / title asset sizes | `screen.layout` | Shell-specific reserved area. | Preserve selected template shell; do not recreate a second shell. |
| `contentStartY`, `contentEndY` | `screen.grid` | Content canvas vertical range. | Move these only when shell height or first-viewport hierarchy changes. |
| `contentGap` | `screen.layout` | Gap between resolved grid blocks. | Controls block-to-block spacing only, not card internal padding. |
| `rowHeight` | `screen.grid`, scroll templates | Resolved grid-row height from the visible content area. | Calculate from the first viewport: `(contentEndY - contentStartY) / 8`; do not recalculate from total report rows. |
| `cellPadding` | `screen.grid` | Space between grid cell and visible card surface. | Use `0` for clean enterprise cards; use small values such as `5px` for cockpit frames. |
| `dominantTitleColor` | `screen.grid` | Accent color hint for component-owned titles, glow, and weak highlights. | Keep aligned with brand/template theme. |
| `innerBackgroundColor` | `screen.grid` | Block body/frame background hint. | Do not use as business-widget data surface when component scoped styles own the body. |

## 3. Default Family Values

These values are the current shared baseline extracted from bundled template code.

| Family | Content range | `contentGap` | `rowHeight` | `cellPadding` | Card padding/radius | Component title/control ownership | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Topbar scroll | `160 -> 1080`, page may grow beyond 1080 | `0px` | `115px` | `6px` | `8px / 8px` | component-owned, no shell-reserved title band | Topbar/menu is horizontal: menu height `160px`, menu width `0`; content width is `1920px`, content height is `920px`. |
| Left-nav workbench | `0 -> 1080`, right content scrolls | `0px` | `135px` | `6px` | `8px / 8px` | component-owned, no shell-reserved title band | Left shell is vertical: menu width `256px`, menu height `0`; content width is `1664px`, content height is `1080px`. |
| Frozen cockpit | `160 -> 1080`, fixed review canvas or controlled scroll | `0px` | `115px` | `5px` | `8px / 8px` | component-owned, no shell-reserved title band | Title/menu shell reserves `160px`; content splits `920px` into 8 visible rows. |

## 4. Block Anatomy Contract

Every block should keep this structure unless the task explicitly redesigns the template itself:

```text
placeholder-cell
  padding: var(--cell-padding)
  border-radius: 8px
  placeholder-cell-inner
    inset: var(--cell-padding)
    display: grid
    grid-template-rows: minmax(0, 1fr)
    gap: 0
    padding: var(--card-padding)      # default 8px
    border-radius: var(--card-radius) # default 8px
    placeholder-cell-body
      padding: 0
      border: 0
      border-radius: 0
      widget-renderer fills 100%
        component-owned title/function/local-filter area when needed
        optional widget-owned sub-block grid/flex
          padding: 5px
          gap: 5px
          sub-block viewport
            component
```

Rules:

- Page layout and template shell do not render block-internal titles, local filters, local action links, or component-specific control strips.
- Visible block titles and local controls are owned by the business component or composite parent widget. The component may use `widget.title` as metadata, but it decides whether and how to render it.
- Component ownership does not permit duplicate visible titles. For KPI/metric widgets, if the component renders a block/card header title from `widget.title` or `displayTitle`, the body metric label is hidden by default when it repeats the same metric; keep `metricName` in tooltip/export/口径 metadata instead. Use `showBodyMetricLabel: true` only for standalone or multi-metric disambiguation cases.
- `localFilters[]` are passed through the component context (`localFilterConfigs`, `localFilters`, `getLocalFilterOptions`, `setLocalFilter`, `clearLocalFilters`) so the component can render its own control area.
- Local filter control selection inside the component:
  - One local filter with `2-4` short values and fit proof: sliding capsule / segmented pill.
  - One local filter with `>4` values, long labels, or failed width fit: compact dropdown/select.
  - Multiple local filter groups: filter panel/popover/drawer trigger with active count or active summary.
  - Detail actions: text links such as `详情`, `查看详情`, `查看明细`, or `进入分析`; rare actions collapse into `更多`.
- Local filter chips in the component-owned control area use compact pill controls, normally `24px` high, `0 8px` padding, and `999px` radius.
- `localFilters[]` affect only the current widget's already loaded data. They do not replace template `filters[]`, page/global scope, permission scope, backend aggregation, pagination, export scope, or other widgets.
- The body viewport has no extra padding by default for single-component widgets. For composite parent widgets, the widget-owned sub-block grid adds `padding: 5px` and `gap: 5px`.
- `WidgetRenderer` keeps `min-width: 0`, `min-height: 0`, `width: 100%`, `height: 100%`, and overflow policy. Table visuals may use internal scroll; charts/canvas/SVG must fill a measurable viewport.
- If the widget contains internal sub-blocks, each sub-block keeps `min-width: 0`, `min-height: 0`, a declared local track/area, `5px` sibling gap through the parent sub-block grid, overflow policy, and state behavior.
- Composite widgets own no-data mask scope. Compute every child sub-block data state first. If all child sub-blocks are no-data, render one parent-block mask over `.placeholder-cell-inner`, covering the component-owned title/control area and widget body. If only some child sub-blocks are no-data, render masks inside those sub-blocks only, covering each sub-block label/control strip plus its component body.
- Template fallback for an unbound widget is reader-facing `建设中` only. Do not show engineering terms such as `未绑定`, `待配置组件`, or file/config instructions inside the report UI.

## 4a. Block Chrome Style Contract

Use `$report-visual-layout-design` `references/block-chrome-style-patterns.md` when a report block needs selectable title chrome and body background style.

Rules:

- `blockChromePattern` is a widget/composite-owned style decision. It may be stored in widget config, widget props, scoped component style, or an inspectable DOM attribute such as `data-block-chrome-pattern`.
- The template shell must not render a second title band for this decision. `.placeholder-cell`, `.placeholder-cell-inner`, and `.placeholder-cell-body` keep the same structural ownership.
- The common sample-derived title stage defaults to `33px`; if a selected template component inherits another title height, record `titleStageHeightPx: "template-inherited"` and the reason.
- Choose or inherit the block chrome before filling the body content. Body content then uses the reserved viewport for ECharts, Element Plus tables/forms, S2 pivots, lists, text summaries, or composite children.
- Body backgrounds must be same-family-but-subordinate to the title chrome. They cannot reduce chart body floors, hide table rows, cover local controls, or make list overflow invisible.
- For dense evidence blocks, `template-default`, `plain-enterprise`, or `deep-panel` should be preferred over decorative patterns. `prism-badge` and `dual-arc` are reserved for business roles that benefit from those signals.

## 5. Spacing And Radius Rules

- Use `8px` as the default card radius across template blocks and compact panels.
- Use `8px` as the default card/frame padding inside `.placeholder-cell-inner`.
- Do not reserve a template title-band gap. Component-owned headers/controls manage their own internal spacing.
- Use `5px` as the fixed spacing inside composite parent widgets: parent viewport to sub-block edge is `5px`, and sub-block to sub-block spacing is `5px`.
- Use `999px` radius only for chips, badges, and pill controls.
- Keep mathematical grid splitting gapless (`contentGap: 0`) when following the exact grid-unit formulas. Visual breathing room belongs in `cellPadding`, card padding, and component scoped spacing, not in a grid gap that changes the block unit.
- Keep block-internal spacing in `cardPadding`, title/body gap, and component scoped styles; do not change `cellPadding` to solve widget-level density.
- In scroll templates, increase rows or allow page scroll when content is dense. In fixed cockpit, reduce visible content, split pages, or use drilldown rather than compressing the 1080px canvas.

## 6. Title And Function Area Placement

- Topbar family: title/control ownership is the topbar shell. Content blocks start at `contentStartY`; do not add a second persistent page header above the grid.
- Left-nav family: page identity is carried by the left navigation/header area. The right content area should not introduce another large page heading unless the user requests a subpage section.
- Frozen cockpit family: title image, logo, and header controls are shell-owned. Content starts below the frozen title band.
- Block-internal title text lives in the business component. Long text uses component-level wrapping, tooltip, or disclosure.
- Local component controls or links stay inside the component-owned control area. Page/global filters stay in the template's native filter entry.
- If a component title and control area conflict, keep the title readable, then collapse secondary controls into dropdown, filter panel, or `更多`.
- Do not place chart legends, metric units that belong to axes, or explanatory prose in the component control area.

## 7. Interaction Feedback

- Template shell hover/focus states should preserve geometry.
- Prefer border color, in-bounds outline, inset glow, stable background tint, or pseudo-elements inside the block/card bounds.
- Do not use hover `translate`, `scale`, or outside-only shadows for fixed grid blocks, compact toolbar buttons, nav rows, or cards that sit inside `overflow: hidden` containers.
- `focus-visible` should match hover feedback without shifting layout.

## 8. What To Change Where

| Change | Preferred place | Avoid |
| --- | --- | --- |
| Reorder blocks or change spans | `layoutRows` in `dashboard.config.ts` | CSS grid overrides in `styles.css`. |
| Change block visual breathing room | `screen.grid.cellPadding`, card padding, or component spacing | Changing `screen.layout.contentGap` away from `0` when exact 12-column/8-row block units are required. |
| Change content vertical area | `screen.grid.contentStartY/contentEndY` | Absolute offsets on individual blocks. |
| Change minimum row height | `screen.grid.rowHeight` in scroll templates | Shrinking widget internals below fit rules. |
| Change block accent/surface | `dominantTitleColor`, `innerBackgroundColor`, theme tokens | One-off colors per block without design-system reason. |
| Choose parent block title/body chrome | Widget config/props/scoped style using `blockChromePattern`; inherit `template-default` when no special chrome is needed | Shell-rendered block title bands, raw copied HTML wrappers, or one-off CSS that cannot be inspected. |
| Change business component padding | Widget scoped style | `placeholder-cell-body` padding. |
| Add internal sub-blocks inside one parent block | Widget scoped CSS/config view model with `padding: 5px; gap: 5px` | Extra page-grid blocks, nested card shadows, or collapsed sub-block gaps. |
| Change component title/control behavior | Business component or composite widget | Adding shell-rendered block titles/local controls. |
| Add local function controls | Component-owned control area using `localFilters`, link/action config, or existing component slots | Floating controls over chart/table body or adding a shell title band. |
| Add no-data masks in composite blocks | Parent widget state calculation: all child sub-blocks empty -> parent-block mask; partial empty -> affected sub-block masks including sub-block title + component | Masking only the chart/table body, or masking the whole parent when siblings still have data. |

## 9. Review Checklist

- The selected template family is named and its shell contract is preserved.
- `layoutRows` remains rectangular; every row has exactly 12 characters; row count is `N` and is not capped by the grid rule.
- Top-level blocks are at least `2*1`; ordinary analytical/chart widgets default to `3*2` and chart widgets do not exceed `4*3` unless they are replaced by a conclusion/detail/fullscreen pattern.
- `contentGap`, `rowHeight`, `cellPadding`, card padding, and radius are not changed ad hoc. `rowHeight` must match the 8-row visible content split.
- Component-owned title/control/local filter/link areas and body content have stable geometry inside the widget.
- Styled parent widgets declare `blockChromePattern` or an inherited default before body content is filled; selected title/body chrome remains component-owned and keeps a measurable body viewport.
- Component control area follows selection rules: one component-local filter with `2-4` short values and fit proof uses sliding capsule; one filter with `>4` values, long labels, or failed fit uses dropdown; multiple filter groups use panel trigger; detail actions use lightweight links.
- Widgets receive a stable measurable viewport and do not depend on the template shell for internal component labels.
- Composite widgets declare internal sub-blocks and component ownership; sub-blocks do not pretend to be top-level `layoutRows` cells.
- Composite widgets preserve `5px` parent-to-sub-block inset and `5px` sibling sub-block gaps.
- Hover/focus feedback stays inside component bounds and is not clipped.
- Any deviation from the family defaults is documented as a template-level design decision, not hidden in component code.
