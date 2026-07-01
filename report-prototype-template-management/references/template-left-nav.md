# Left Nav Analytics Dashboard Template

Use `assets/templates/left-nav-analytics-workbench-template` for multi-page enterprise analytics and dense daily workbenches.

## Shell

- 1920*1080 is a planning viewport baseline, not a fixed page size.
- Chinese collapsible left navigation.
- Right-side content display area.
- Sidebar-anchored filter popover.
- Multiple pages through `nav`.
- Each nav page has its own `layoutRows` and `widgets`.
- Each nav page uses a scrollable content grid with 12 columns, 8-row sizing basis, and N report rows.
- Right content area scrolls vertically when grid height exceeds the active viewport.
- Expanded 1920 pages use about `1664px` of content width and the `1920x1080` left-nav preset from `report-visual-layout-design`.

## Core Config

```ts
screen: {
  layout: { sidebarWidth: 256, sidebarCollapsedWidth: 80, contentGap: 0 },
  grid: { contentStartY: 0, contentEndY: 1080, rowHeight: 135, cellPadding: 6 },
},
assets: {
  logoSrc: '/haier-logo.svg',
},
nav: [
  {
    id: 'overview',
    label: 'Overview',
    layoutRows: [
      'AAABBBCCCDDD',
      'AAABBBCCCDDD',
      'EEEFFFGGGHHH',
      'EEEFFFGGGHHH',
      'IIIJJJKKKLLL',
      'IIIJJJKKKLLL',
      'MMNNOOPPQQRR',
      'SSUUVVWWXXYY',
    ],
    widgets: {},
  },
],
filters: [],
```

## Shared Layout Contract

- This family follows `template-layout-design-system.md`; shared spacing, card radius, component title/control handoff, widget viewport, and hover/focus behavior are template-level design decisions.
- Default right-content range is `0 -> 1080`; expanded sidebar is `256px`, collapsed sidebar is `80px`, mathematical block gap is `contentGap: 0`, and `rowHeight = 1080 / 8 = 135px`.
- Default block anatomy is `placeholder-cell` -> `placeholder-cell-inner` -> body viewport -> `widget-renderer`; visible block titles and local controls are component-owned.
- Card padding and card radius are both `8px`; `cellPadding` is `6px` to provide visual breathing room without changing the 12-column/8-row grid unit.

## `nav[]` Content Gate

- Choose this template only when the report can be reorganized into multiple substantial pages.
- Every `nav` item must represent a real business chapter/module, not a decorative menu entry.
- Each nav page must include enough content to stand on its own: a clear page question, component set, dataset scope, filters/interactions when relevant, and non-placeholder mock/API data.
- Do not populate only `overview` while leaving other nav pages empty, duplicated, or skeletal. If the report is really a single reading flow, use a topbar scroll template instead.

## Add A Page

1. Add a new item in `nav`.
2. Give it stable `id` and concise `label`.
3. Define `layoutRows` with 12 columns per row. Row count is `N`; use as many rows as the business content needs without recalculating rowHeight.
4. Mount widgets under that nav item's `widgets`.
5. Add page-specific filters through `filters[].scope` and bind affected slots/widgets through `filterScope`, `data.requiredFilters`, and API/query params.
6. Configure page jump, popup, drilldown, drawer, modal, and detail behavior through block or component-slot `actions` first. Use `actions/registry.ts` only when the default action model must be overridden for host observation, permission, API orchestration, or custom overlays.

## Adjustments

- Use left nav for chapters, modules, related report pages, or daily workbench pages.
- Keep labels short and business-facing.
- Avoid a second top navigation layer unless there is a real sub-view need.
- Use the template filter popover for global and scoped filters.
- Use `filters[].source` for data-bearing filters and `filters[].options` for stable enums.
- Before committing a page `layoutRows`, verify block spans with `report-visual-layout-design`, especially for tables and composite widgets.
- Add rows for long report content; do not force every page into the first 1920*1080 viewport.

## Best Use Cases

- Multi-chapter business analysis.
- Status + diagnosis + detail + task pages.
- Dense tables, wide metric matrices, repeated filtering.
- Enterprise analytics workbench.
