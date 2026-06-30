# Page Layout Modes

Use this reference when deciding the report page shell and layout mode.

## 1. Single Supported Mode

Report development now has one supported implementation mode: configure a bundled framework template.

Declare these decisions before designing cards, charts, filters, or navigation:

- `frameworkTemplateId`: choose one bundled framework template, such as `topbar-light-scroll-dashboard-template`, `left-nav-analytics-workbench-template`, or `frozen-title-sci-fi-cockpit-template`.
- `pageStyleSource`: `templateDefault`, `userSpecified`, or `sampleProvided`. Source files, screenshots, HTML, or samples are evidence for hierarchy, density, tone, and wording; they do not create an alternate shell path.
- `brandMode`: `haierBranded`, `sampleNative`, or `neutral`, with explicit logo/token implications.
- `visualMode`: choose the visual direction allowed by the selected framework template.
- `pageLayoutConfig`: the page-level `12 * N` layout, `layoutSectionMap`, `layoutRows`, and `layoutCoordinateMap`.
- `blockAreaConfigMap`: one block area config per visible block, created through `createBlockAreaConfig`.
- `componentExampleConfigMap`: one registered component example per declared `3 componentArea` slot.

If no bundled framework template can satisfy the report shell, layout, navigation, filter, toolbar, export, or permission surface, record a blocker or template backlog item. Do not branch into a free shell or independent project implementation inside this workflow.

## 2. Template-Owned Shell

When a framework template is selected, the template owns the shell.

Rules:

- Follow the selected template's layout zones, logo slot, navigation style, filter mechanism, toolbar, action hook boundary, sizing model, and grid mechanics.
- Configure the template through intended fields: title, assets/logo, nav/page, filters, toolbar actions, `layoutRows`, widgets, theme, data source bindings, and permission/export hooks.
- Do not add a second global header, standalone filter bar, duplicate navigation, or replacement toolbar when the template already owns that surface.
- If the template exposes `public/haier-logo.svg`, keep that asset for the light/default logo slot unless a dark theme requires the white logo variant.
- If the template defines invoked filters, map filter requirements to `filters[]`, native trigger/panel/popover/drawer, and binding rules.
- If the template defines persistent filters, keep them compact and aligned with the template's own controls.
- For scrollable templates, keep row/block heights and enable vertical scrolling when the `12 * N` content exceeds the active viewport height.
- Treat `1920x1080` as the visible prototype review viewport, not the full report height limit.
- For fixed big-screen templates, respect the fixed `1920x1080` canvas and do not force scrollable-row sizing.

## 3. Configurable Block Area Layout

The only supported block layout template is the block area config created by `createBlockAreaConfig` and listed in `blockAreaConfigMap`.

Rules:

- Block size comes from `pageLayoutConfig.layoutRows`, not from fixed historical wrappers.
- Each block records `blockCoordinate`, `slotCount`, `componentSlotPattern`, `slotCoordinateList`, and optional area configs.
- `1-1 titleArea` and `3 componentArea` are required unless the block is explicitly non-component by design.
- `1-2 pillArea`, `2-1 auxMetricArea`, `2-2 unitArea`, and `4 summaryArea` are optional but must be configured or marked unnecessary with a reason.
- `componentRegionPattern` may appear only as derived slot-geometry metadata. It is not a selectable implementation target.
- Every `3 componentArea` slot must bind to a registered component example or a newly registered self-developed ECharts component example with size compatibility evidence.

## 4. Navigation Guidance

Navigation should help orientation without competing with the report.

Prefer:

- Breadcrumb text for hierarchy.
- Compact tabs for peer views.
- Segmented controls for mode switching.
- Icon-collapsed side navigation for many chapters.
- Drawer navigation for low-frequency report switching.

Avoid:

- Large persistent menus for single-report pages.
- Heavy sidebars when a top tab or breadcrumb is enough.
- Repeating global navigation inside every report block.
- Navigation that pushes the first useful report answer below the fold.

## 5. Filter Guidance

Filters should be easy to invoke, but should not dominate the page.

Prefer:

- Filter button/popover/drawer/bottom sheet for the full filter form.
- Active filter chips near the title, toolbar, or filter trigger.
- 0-3 persistent high-frequency filters only when they are essential for comprehension.
- Reset, apply, and saved-view actions for complex filter sets.
- Sticky behavior only when repeated filtering is a primary task.

Avoid:

- A large permanent filter region by default.
- Hiding active scope after a filter is applied.
- Making users scroll before they can understand or change the report scope.
- Filter layouts that create a separate visual block heavier than the report answer.
