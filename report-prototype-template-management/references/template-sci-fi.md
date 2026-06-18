# Sci-Fi Dashboard Template

Use `assets/templates/frozen-title-sci-fi-cockpit-template` only for fixed 1920*1080 big-screen/cockpit presentations with frozen title/background assets.

## Shell

- Fixed 1920*1080 design canvas; this is the exception to ordinary scrollable report pages.
- Strong dark cockpit framing.
- Title area and page navigation suitable for large screens.
- Navigation/filter drawers instead of office-style dense controls.
- `nav[].layoutRows` and `nav[].widgets` per cockpit page.
- Uses the same 1920 content-area split unless a documented one-screen cockpit exception is accepted: reserve horizontal menu/header height and vertical menu/sidebar width when present, then split the remaining visible content area into 12 columns and 8 row units for sizing.
- With a 160px title/menu shell, `rowHeight = (1080 - 160) / 8 = 115px`.

## Core Config

```ts
screen: {
  layout: { titleVisibleHeight: 160, contentGap: 0 },
  grid: { contentStartY: 160, contentEndY: 1080, rowHeight: 115, cellPadding: 5 },
},
assets: {
  logoSrc: '/haier-logo.svg',
  titleBackgroundSrc: '/title-bg.png',
  backgroundSrc: '/cockpit-bg.jpg',
},
nav: [
  {
    id: 'cockpit',
    label: 'Cockpit',
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

- This family follows `template-layout-design-system.md`; shared spacing, cockpit card radius, component title/control handoff, widget viewport, and hover/focus behavior are template-level design decisions.
- Default content range is `160 -> 1080`; visible title/menu shell is `160px`; mathematical block gap is `contentGap: 0`; `rowHeight = 115px`.
- Default block anatomy is `placeholder-cell` -> `placeholder-cell-inner` -> body viewport -> `widget-renderer`; visible block titles and local controls are component-owned.
- Card padding and card radius are both `8px`; `cellPadding: 5` leaves a small outer inset for cockpit frame effects.

## `nav[]` Content Gate

- Choose this template only when the cockpit can be organized into multiple substantial nav pages.
- Every retained `nav` item must represent a real cockpit view such as 总览, 预警, 产线/区域, 趋势, 指挥调度, or 事件详情.
- Each nav page must fit a complete 1920*1080 business view: clear page question, high-signal widgets, dataset scope, filter/drawer behavior when relevant, and non-placeholder data.
- Do not populate only the first cockpit page while leaving other nav pages empty, duplicated, or skeletal. If the content is only one large-screen view, do not choose or retain this nav template.

## Adjustments

- Keep all primary content visible within 1920*1080.
- Use fewer, stronger blocks with high signal.
- Avoid long text, dense editable forms, and office-style large tables.
- Use semantic color for status pressure, warning, and health.
- Avoid uncontrolled multi-color noise.
- Use white Haier logo on dark backgrounds.
- Configure title/background assets through `assets`.
- Keep business widgets inside block body viewports; do not paint across the cockpit frame.
- Avoid putting dense table/chart composites into one-row sci-fi blocks; promote to taller spans or split the cockpit page.

## Best Use Cases

- Exhibition or monitoring wall.
- Command center.
- Leadership cockpit presentation.
- Real-time or near-real-time status monitoring.
