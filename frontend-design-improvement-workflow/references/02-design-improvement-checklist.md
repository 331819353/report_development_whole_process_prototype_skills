# Design Improvement Checklist

Use this checklist after the route is selected.

## Page-Level Checks

- Page shell, navigation, topbar, filter area, toolbar, and content grid have clear hierarchy.
- When modern SaaS / BI Dashboard / UI Kit language is requested, page background, card surface, borders, radius, shadow, typography, and chart palette map to semantic tokens or inherited template tokens.
- Page hierarchy is not created mainly by uniform bordered cards. Typography, spacing, section rhythm, subtle dividers, and grouping create the first layer of structure; card frames have a reason such as repeated object, interaction surface, or template-owned block.
- The page has a named information flow, not only a dashboard-like block collection: conclusion/status -> evidence -> driver/breakdown -> detail/action -> trust/source, unless the task is a true current-state dashboard.
- First viewport shows the most important decision content without crowding or empty decorative space.
- First viewport has one clear primary answer/action and bounded supporting evidence; equal-weight card grids or chart variety do not carry the design.
- KPI cards/metric tiles are bounded to primary decision metrics. Explanations, rankings, tables, anomaly lists, action items, and trust/source notes keep task-matched component forms.
- Brand/product color and neutral hierarchy carry identity, navigation, selection, primary emphasis, and ordinary data focus. Green/red/orange semantic colors are used only for documented status/risk/success/warning/error/business-direction meanings and are paired with sign/icon/label/threshold text.
- Blocks use stable dimensions, legal grid spans, and responsive fallbacks.
- Text, controls, legends, table headers, and chart labels do not overlap or clip.
- Fixed-height summary/ranking/cards/KPI/composite blocks prove fit with height budget and DOM overflow assertions, not only screenshots.
- Template-owned controls and component-owned controls are separated. Refresh, export/download, copy/share, global filters, and topbar actions are not duplicated inside business components unless ownership is explicitly moved and the template counterpart is disabled.
- Loading, empty, error, no-permission, stale, and disabled states preserve layout geometry.

## Component-Level Checks

- Every KPI, chart, table, summary, drawer, dialog, and local control has a business purpose and data contract.
- KPI components pass an eligibility check before KPI styling: formula, unit, baseline/target/comparison, status/direction rule, source/freshness, and detail/action path.
- Exact values, metric口径, source/freshness, unit/precision, baseline, and next action are visible or discoverable.
- Component-internal local filters do not silently change global scope, permission, backend aggregation, pagination, export, or other components.
- KPI/metric cards prove the rendered value+unit group is centered in the value anchor on both X and Y axes and is not overridden by template/global CSS.
- Component contracts such as `compositePanelContract` and `analysisInsightContract` map to actual DOM/CSS/renderer behavior instead of remaining config-only metadata.
- Shape-sensitive charts preserve aspect ratio and use the appropriate engine/library.
- ECharts chart checks inspect option/config details, not only chart existence. Combo charts with top-centered legends prove legend centering, `grid.top` reserve, and legend/axis-name spacing.
- Dense charts and tables have tooltip/detail/table/fullscreen/scroll strategies instead of shrinking until unreadable.
- Charts are lightweight: each chart has a task reason, restrained grid/axis/legend/label treatment, exact-value path, and no extra chart family added only for visual richness.

## Runtime Checks

- Build/startup succeeds or blockers are explicit.
- Browser screenshot evidence exists for relevant viewports and non-default states.
- DOM overflow checks cover fixed-height cards, navigation, KPI tiles, and compact controls.
- Runtime evidence covers KPI alignment, duplicate controls, fixed-height clipping, chart legend/option details, contract-to-DOM/CSS/renderer binding, and component crops when those surfaces exist.
- Console and network do not show blocking errors.
- Hover/focus/tabs/drawers/modals/filter changes do not cause clipping, stale data, or state mismatch.
