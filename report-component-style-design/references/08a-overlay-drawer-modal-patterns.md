# Overlay, Drawer, Modal, And Detail Panel Patterns

Use this reference when screenshots or visual samples show drawers, modals, action sheets, notification bars, navigation panels, or detail side panels that need to become reusable report/application component patterns. The source images are temporary visual evidence; the durable standard is this text contract.

Pair with:

- `08-drawers-detail-panels.md` for generic drawer/detail rules.
- `report-info-component-mapping` `references/05-interaction-state-flow.md` for interaction choice and parameter passing.
- `report-filter-control-design-spec` `references/02-filter-selector-patterns.md` when the overlay contains filters.
- `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` when converting visual samples into text-only contracts.

## Pattern Identity

Use these stable pattern names:

```ts
type OverlayPanelPattern =
  | 'right-filter-drawer'
  | 'bottom-action-sheet'
  | 'center-confirmation-modal'
  | 'fullscreen-detail-modal'
  | 'top-notification-bar'
  | 'left-navigation-drawer'
  | 'side-detail-drawer'
  | 'large-detail-side-panel';
```

Use:

```ts
visualType: overlay-panel
overlayPanelPattern: one of the controlled values above
```

Recommended component type:

| Pattern | Recommended `componentType` | Primary task |
| --- | --- | --- |
| `right-filter-drawer` | `drawer` | Configure multiple filters without leaving a table or report. |
| `bottom-action-sheet` | `action` or `drawer` | Choose one operation from a small action menu. |
| `center-confirmation-modal` | `action` or `custom` | Confirm a focused, usually irreversible decision. |
| `fullscreen-detail-modal` | `drawer` or `custom` | Inspect full object details with tabs and sticky actions. |
| `top-notification-bar` | `text-summary` or `custom` | Show a transient success/warning/info message without blocking work. |
| `left-navigation-drawer` | `drawer` | Navigate sections while preserving current page context. |
| `side-detail-drawer` | `drawer` | Inspect a selected row/card while keeping the source list visible. |
| `large-detail-side-panel` | `drawer` | Inspect analytical detail with KPI, tabs, chart/table, and wide content. |

## Why These Designs Feel Strong

- Each overlay has one job. Filter, action selection, confirmation, detail inspection, navigation, and notification are not mixed into one generic modal.
- The dimmed background preserves context: users know where the overlay came from and what will remain after closing.
- Panel sizes match cognitive load. Confirmation is small and centered; filters use a right drawer; actions use a bottom sheet; dense detail uses a large panel.
- Headers are stable: title left, close right, optional favorite/minimize/action near the title. Users can exit without hunting.
- Footers are action-specific. Destructive confirmation uses a strong confirm button; filter drawers use reset + confirm; action sheets use a calm cancel row.
- Details are grouped with tabs or side sections rather than a wall of fields.
- The visual language is restrained: white surface, soft radius, measured shadow, semantic accent only for active/danger/primary states.
- Icons are semantic: warning triangle, export/share/bell/star/delete, close, favorite, menu item icons. They do not decorate empty space.

## Pattern Selection

| User need | Choose |
| --- | --- |
| Multiple filters for the current table/report | `right-filter-drawer` |
| A compact menu of operations on the current chart/report/card | `bottom-action-sheet` |
| Confirm deletion, submit, rollback, approve, or other focused decision | `center-confirmation-modal` |
| Full object record with tabs, many fields, and sticky actions | `fullscreen-detail-modal` |
| Success/info/warning after refresh, save, sync, export, or update | `top-notification-bar` |
| Temporary app/module navigation on the left | `left-navigation-drawer` |
| Selected row/card detail while source list remains visible | `side-detail-drawer` |
| Analytical detail requiring tabs plus KPI/chart/table evidence | `large-detail-side-panel` |

Do not use a centered modal for complex analysis. Do not use a drawer for a one-line confirmation. Do not use a notification bar for decisions that require user confirmation.

## Shared Anatomy

Every overlay must declare:

1. Source context: the component, row, chart mark, KPI, or action that opened it.
2. Overlay surface: position, width/height, radius, shadow, and z-index relationship.
3. Scrim/mask: whether background is dimmed, clickable, and scroll-locked.
4. Header: title, close/minimize/favorite/action icons, and optional status.
5. Body: filter fields, action grid, confirmation copy, tabs, detail fields, chart/table evidence, or message.
6. Footer/action area: reset/confirm, cancel, close/edit, primary action, or no footer.
7. State behavior: loading, empty, no-permission, error, stale selected object, destructive confirmation, keyboard/focus trap.
8. Return behavior: closing preserves source scroll, filters, selected row, and active tab unless the action intentionally changes them.

## Size And Placement

Default desktop sizes:

| Pattern | Size rule |
| --- | --- |
| `right-filter-drawer` | Width `320-420px`; height `100%`; right anchored; body scrolls; footer sticky. |
| `bottom-action-sheet` | Width `100%` of container/viewport; height content-driven `180-320px`; bottom anchored; top drag handle optional. |
| `center-confirmation-modal` | Width `320-420px`; content centered; compact body; no internal scroll unless copy is exceptional. |
| `fullscreen-detail-modal` | Width `80-96vw`; height `80-96vh` or full viewport; tabs/side nav; sticky footer. |
| `top-notification-bar` | Width `min(100%, 720px)` or aligned to content container; height `48-64px`; top anchored. |
| `left-navigation-drawer` | Width `220-280px`; height `100%`; left anchored; menu body scrolls if needed. |
| `side-detail-drawer` | Width `320-440px`; height `100%` or source-card height; right anchored; footer sticky. |
| `large-detail-side-panel` | Width `640-860px` or `60-80vw`; height `100%`; right anchored; chart/table body scrolls inside. |

Mobile fallback:

- Right and left drawers become full-width panels when viewport width is under `480px`.
- Bottom action sheets remain bottom anchored and may use full width.
- Center confirmation modal keeps `min(280px, viewport - 32px)`.
- Large detail panels should either become full-screen modal or route to a detail page.

## Pattern Rules

### Right Filter Drawer

Use for table or report filters that are too many for the visible toolbar.

Rules:

- Source page is dimmed but still recognizable.
- Drawer title is `筛选条件` or a domain-specific equivalent.
- Fields use consistent selector patterns: select, date range, tree select, multi-tag, and add-condition row.
- Footer has `重置` and `确定`; apply/reset behavior must be explicit.
- The drawer should not update every report component until confirm when filters are expensive or multi-field.
- Active filter count should appear on the trigger after applying.

### Bottom Action Sheet

Use for secondary actions on a chart/report/card, especially when users need several operations but should not leave the page.

Rules:

- Actions are equal-sized icon+label tiles.
- Destructive action is visually distinct but not dominant unless selected.
- Cancel is a full-width calm row at the bottom.
- The sheet should close after action selection unless the action opens a second confirmation.
- Use a drag handle only when the product supports gesture-like behavior.

### Center Confirmation Modal

Use only for focused decisions.

Rules:

- Warning icon and title state the decision.
- Supporting copy states consequence and whether it is reversible.
- Key evidence fields appear as short label/value pairs, not a table.
- Footer has secondary cancel and primary confirm; destructive confirm uses danger color.
- Background is dimmed and focus-trapped.
- Escape/backdrop behavior must be defined; destructive operations should require explicit button confirmation.

### Fullscreen Detail Modal

Use when detail requires multiple sections but should still feel like an overlay rather than a page jump.

Rules:

- Header title identifies the object type and object name/context.
- Left tabs or horizontal tabs group detail sections.
- Body uses aligned labels and values, not free text blocks.
- Footer includes close and the primary safe action such as edit.
- Content scrolls inside the body; header/footer remain stable.

### Top Notification Bar

Use for save/sync/export/update success, warnings, or informational state that should not interrupt the flow.

Rules:

- The bar sits above content and does not cover primary controls.
- Icon and title summarize the event; subtitle provides timestamp/source when relevant.
- Close icon is right aligned.
- It should auto-dismiss only when the product standard allows; otherwise user closes it.
- Notification copy must be specific, such as update result and time, not generic praise.

### Left Navigation Drawer

Use for temporary module navigation or mobile/compact navigation.

Rules:

- Drawer title identifies the navigation group.
- Menu items have stable icons and labels.
- Current item has soft active background and clear text emphasis.
- Close icon is in the header.
- The masked page remains visible enough to preserve context.
- Selection either navigates immediately or closes drawer after navigation; behavior must be consistent.

### Side Detail Drawer

Use when users select one row/card and need a compact profile or contact/action panel.

Rules:

- Source list remains visible under dim mask.
- Header shows object title and optional favorite/close icons.
- Body contains key fields with aligned labels and status tags.
- Footer contains one or two task actions, not a full toolbar.
- Selected object must stay highlighted or be represented in drawer context.

### Large Detail Side Panel

Use when the detail surface contains KPI summaries, tabs, chart/table evidence, and analytical fields.

Rules:

- Large panel keeps source context visible at the edge.
- Header has title, close, and tabs.
- KPI strip appears before chart/table evidence.
- Chart/table area follows the same data/format rules as normal components.
- A close button may sit in footer/right-bottom; primary edit/export action may sit in header or footer only when needed.
- If content becomes a full workflow, route to a detail page instead of expanding the drawer indefinitely.

## Data And Interaction Contract

Every overlay should declare:

```ts
type OverlayPanelContract = {
  overlayPanelPattern: OverlayPanelPattern;
  triggerComponentId: string;
  triggerEventName: string;
  sourceDataset?: string;
  objectIdField?: string;
  objectNameField?: string;
  inheritedFilters: string[];
  actionPayload: string[];
  openBehavior: 'replace-current-overlay' | 'stack-with-parent' | 'block-until-closed';
  closeBehavior: 'preserve-source-state' | 'refresh-source' | 'clear-selection' | 'navigate-back';
  maskBehavior: 'dim-click-close' | 'dim-no-click-close' | 'none';
  focusBehavior: 'focus-trap' | 'focus-within-panel' | 'nonblocking';
  scrollBehavior: 'body-scroll' | 'panel-body-scroll' | 'locked-background';
  footerActions: string[];
  staleStateRule: string;
  validationCases: string[];
};
```

Required payload fields for row/detail overlays:

- `object_id`.
- `object_name` when visible.
- `period` and active filters when data is filtered.
- `source_component_id`.
- `permission_scope`.
- `return_to`.

## Anti-AI Gate

Reject or revise the overlay when:

- A complex detail view is placed in a small centered modal.
- A single confirmation is implemented as a large drawer.
- The background is blurred/dimmed so strongly that source context is lost without reason.
- The panel lacks close behavior, escape behavior, focus behavior, or stale-selection behavior.
- Footer actions are generic or mismatched to task severity.
- Fields become an ungrouped wall of labels.
- Destructive actions are not visually distinguished and do not require explicit confirmation.
- The overlay duplicates page-level navigation/filter/action controls without a clear ownership decision.
- The screenshot-like surface has no data binding, trigger payload, or return-state contract.

## Acceptance Checklist

- `visualType` is `overlay-panel` and `overlayPanelPattern` is one of the controlled values when the overlay is reusable.
- The overlay declares source component, trigger event, payload, inherited filters, close behavior, mask behavior, focus behavior, scroll behavior, and stale state.
- The chosen pattern matches the task: filter, action menu, confirmation, detail, notification, navigation, compact detail, or analytical detail.
- Header, body, footer, and action ownership are explicit.
- Loading, empty, no-permission, error, stale, destructive confirmation, and keyboard states are defined where relevant.
- The source page state is preserved or intentionally refreshed after close.
- The visual style uses semantic icons, restrained surface styling, and no decorative effects that compete with content.
