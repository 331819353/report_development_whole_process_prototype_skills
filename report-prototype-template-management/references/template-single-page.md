# Topbar Scroll Dashboard Template

Use these assets for standalone, compact, single-theme reports:

- `assets/templates/topbar-light-scroll-dashboard-template`: light topbar, office-readable enterprise report feel, one scrollable content grid with 12 columns, 8-row sizing basis, and N report rows.

## Shell

- Top bar only; no sidebar.
- Center title from `screen.title`.
- Top-left Haier logo from `assets.logoSrc`.
- Right controls: refresh, filter, download.
- One page layout: `page.layoutRows`.
- One widget map: `page.widgets`.
- Page height may exceed the first viewport and must scroll vertically.
- This template family is not fixed to 1920*1080; 1920*1080 is only a planning viewport baseline.
- Default planning uses the full-width `1920x1080` preset from `$report-visual-layout-design`.

## Core Config

```ts
screen: {
  title: 'Monthly Overview',
  defaultTheme: 'light',
  layout: { topbarHeight: 160, contentGap: 0 },
  grid: { contentStartY: 160, contentEndY: 1080, rowHeight: 115, cellPadding: 6 },
},
assets: {
  logoSrc: '/haier-logo.svg',
},
page: {
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
filters: [],
```

## Shared Layout Contract

- This family follows `template-layout-design-system.md`; change shared spacing/radius/title placement there first, then apply it consistently to the topbar asset.
- Default content range is `160 -> 1080`; topbar/menu height is `160px`; mathematical block gap is `contentGap: 0`; `rowHeight = (1080 - 160) / 8 = 115px`.
- Default block anatomy is `placeholder-cell` -> `placeholder-cell-inner` -> body viewport -> `widget-renderer`; visible block titles and local controls are component-owned.
- Card padding and card radius are both `8px`; `cellPadding` is `6px` to provide visual breathing room without changing the 12-column/8-row grid unit.

## Adjustments

- Change `screen.title` for title.
- Change `assets.logoSrc` for logo.
- Keep original color logo on the light template.
- Keep filter access through the right-side filter drawer.
- Do not add tabs, side menus, breadcrumbs, or page switching unless explicitly extending the shell.
- Edit `page.layoutRows`; widget keys in `page.widgets` must match block characters.
- Keep `screen.grid.rowHeight` equal to the 8-row visible split. With `topbarHeight/contentStartY = 160`, use `115px`.
- Add rows when the report needs more content; do not shrink the page to one screen.
- Before placing charts, tables, or composite widgets, verify the chosen span with `$report-visual-layout-design`.

## Best Use Cases

- One compact status overview.
- One focused diagnostic page.
- One detail/query dashboard without chapters.
- Meeting preview or shareable standalone report.

Choose the light template for long reading, operational handoff, detail queries, and table-heavy but single-page reports.
