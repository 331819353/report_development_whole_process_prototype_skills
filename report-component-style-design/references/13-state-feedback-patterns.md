# State Feedback Component Patterns

Use this reference for empty, loading, error, no-permission, stale, filtered-empty, disabled, success, and building/in-progress states in report, dashboard, BI, management, and enterprise app surfaces.

The goal is not to create prettier placeholders. The goal is to make every blocked state explain what happened, what it affects, and what the user can do next while preserving the layout geometry of the affected component or page area.

## Pattern Field

Use `stateFeedbackPattern` with one of these controlled values:

| value | Visual expression | Best fit |
| --- | --- | --- |
| `fresh-line-state-set` | Light line icons, sparse blue accents, clean centered group. | Default report/table/chart states that should stay professional and quiet. |
| `soft-illustration-state-set` | Small friendly illustrations, soft fills, visible human/context cues. | Product-facing or self-service states that benefit from warmth and guidance. |
| `minimal-line-state-set` | Monochrome or low-color line icons, strong whitespace, no CTA unless needed. | Dense enterprise systems, audit pages, admin tools, or low-distraction states. |
| `dark-tech-state-set` | Dark panel, luminous but bounded icons, high contrast state markers. | Dark data-screen, monitoring, ops center, or security dashboards. |
| `glass-card-state-set` | Individual translucent cards for each state, subtle blur/shadow, same anatomy per card. | State galleries, onboarding, template libraries, or card-based modules. |
| `playful-healing-state-set` | Warm character illustration or playful metaphor with restrained copy. | Consumer-like internal tools, education, community, or low-risk workflow states. |
| `business-blue-state-set` | Corporate blue illustration, strong enterprise clarity, thin dividers. | General enterprise applications, management portals, and Haier-style report apps. |
| `immersive-fullscreen-state-set` | Full-bleed scene or poster card per state, large visual and centered action. | Empty landing states, full-page permission blocks, maintenance, or scenario pages. |

## State Kinds

Use controlled `stateKind` values:

- `empty`: no records exist for the current scope.
- `filtered-empty`: filters removed all records.
- `loading`: data is being fetched or transformed.
- `error`: request, rendering, or calculation failed.
- `no-permission`: the user is not authorized for this scope.
- `building`: module, report, or feature is not ready yet.
- `stale`: data exists but freshness is older than the accepted window.
- `partial-data`: some sub-blocks or sources failed while others still render.
- `disabled`: the action/control is currently unavailable.
- `success`: an operation completed and the user needs confirmation.

## Why The Samples Work

- All eight variants share the same information skeleton: state symbol, state name, short reason, and recovery or acknowledgement action.
- Visual style changes by context, but the state contract does not. That makes the design adaptive instead of decorative.
- The CTAs are state-specific: retry for failure, return/apply permission path for no-permission, reset or explore for empty, wait/acknowledge for building.
- The illustration never replaces the message. It anchors the mood while the title/reason/action carry the actual product behavior.
- The state group keeps consistent rhythm across empty, loading, error, no-permission, and building. This consistency is why it does not feel AI-random.
- The darker, playful, glass, and immersive versions are framed as intentional product contexts, not generic default polish.

## Anatomy

Every state feedback component must define:

| slot | Required | Rule |
| --- | --- | --- |
| `visual` | yes | Icon, illustration, spinner, or scene tied to `stateKind`; not a generic decorative asset. |
| `title` | yes | Names the exact state in concrete product language. |
| `reason` | yes except simple loading | Explains why the state exists without leaking restricted data. |
| `impact` | conditional | Names affected scope when useful, such as filter, report, module, or data source. |
| `primaryAction` | conditional | Retry, reset filters, request permission, go back, view another scope, or acknowledge. |
| `secondaryAction` | optional | Help, view logs, contact owner, open source detail, or cancel. |
| `statusMeta` | optional | Request id, updated time, source, owner, SLA, or progress percent when relevant. |

Generic text such as "暂无数据" alone is insufficient for reusable report standards. Use concrete copy such as "当前筛选下暂无订单", "本月库存预警数据加载失败", or "你没有查看华东区利润明细的权限".

## Size And Placement

| surface | min width | min height | layout |
| --- | ---: | ---: | --- |
| Inline chart/table body state | 180 | 120 | Centered visual group in the component body viewport. |
| Small card state | 220 | 160 | Icon/visual top, title, one-line reason, optional compact action. |
| Standard component state | 320 | 220 | Centered stack with visual, title, reason, action row. |
| Large panel state | 480 | 320 | Larger illustration, 1-2 reason lines, primary/secondary actions. |
| Full-page state | 720 | 480 | Scene or illustration plus action cluster; keep the original shell/navigation context when possible. |
| State gallery row | 640 | 160 | 4-5 peer state items, each at least `120x120`. |

Preserve the affected component's geometry. A table empty state should occupy the table body area after header/filter bands remain stable. A chart loading state should occupy the plot body without collapsing the chart card height.

## Pattern Selection

1. Choose `fresh-line-state-set` for ordinary report empty/loading/error/no-permission states unless the product context says otherwise.
2. Choose `minimal-line-state-set` when density, audit, or admin seriousness matters more than warmth.
3. Choose `business-blue-state-set` for enterprise portals or management apps that need a polished but conservative default.
4. Choose `soft-illustration-state-set` when the user benefits from guidance, onboarding, or a friendlier recovery path.
5. Choose `glass-card-state-set` only when the surrounding surface already uses card modules and the state items are peers.
6. Choose `dark-tech-state-set` only inside a dark template or monitoring/security/ops scenario.
7. Choose `playful-healing-state-set` only for low-risk, brand-approved, friendly products. Do not use it for finance audit, permission denial, security, or high-severity errors.
8. Choose `immersive-fullscreen-state-set` for full-page or scene-level blocking states, not small chart/table states.

## State-Specific Rules

### Empty And Filtered Empty

- State the scope: report, table, chart, selected filters, time period, organization, or object.
- Offer reset filters, change scope, create/import data, or explore another dataset when available.
- Do not show fake zero charts when the semantic truth is no records.

### Loading

- Preserve the final layout geometry to prevent layout jump.
- Use skeletons for tables/lists and centered spinner/progress only for simple chart or action states.
- Loading copy should be short. Long explanations belong to delayed or stale states.
- Respect reduced motion; spinner or progress animation must not shift surrounding layout.

### Error

- Name the failure surface and recovery path.
- Include retry only when retry is actually wired.
- Include request id/log id only when available and useful.
- Do not blame the user for system failures.

### No Permission

- Do not leak restricted totals, row counts, object names, or trend silhouettes.
- State the permission scope at a safe level, such as module, region, role, or data category.
- Provide request access, switch scope, return, or contact owner when the workflow supports it.

### Building

- Use when a module/report is intentionally not ready, not when data failed.
- State whether the user should wait, return later, or use an alternate path.
- If a release time or owner exists, show it as status metadata.

## Visual Token Rules

- Icons use `24-56px` for inline/component states, `64-120px` for large/full-page states.
- Standard title uses `14-18px`, weight `600`; full-page title may use `20-28px`.
- Reason text uses `12-14px`, max `2` lines in component states and max `3` in full-page states.
- Primary action uses the project button style. Do not invent special CTA gradients for states.
- Error accents use the semantic danger token; warning/building uses warning token; no-permission uses restricted/neutral blue or gray; loading uses primary/info.
- Illustrations are optional, but if used they must be tied to stateKind and product context. No abstract AI blobs, random 3D shapes, or unrelated mascot scenes.

## Binding Contract

A reusable state mapping must declare:

- `visualType: state-feedback`.
- `stateFeedbackPattern`.
- `stateFeedbackContract.stateKind`.
- Scope: `page`, `parent-block`, `sub-block`, `component-body`, `overlay`, or `card`.
- Reason, impact, action contract, permission leakage rule, and retry policy.
- Geometry preservation rule and minimum container.
- Accessibility labels and focus behavior.
- Validation cases for default, state trigger, action click, and recovery path.

## Accessibility And Interaction

- State title must be readable by assistive tech.
- Loading states use `aria-busy` or project equivalent.
- Error/no-permission states announce the reason and expose keyboard-focusable actions.
- Decorative illustration parts are hidden from assistive tech; the state group owns the accessible label.
- Focus order is title context -> reason -> primary action -> secondary action.

## Acceptance Checklist

- The state has a named `stateKind` and `stateFeedbackPattern`.
- The state explains condition, scope, and next action when action exists.
- The component or page geometry is preserved; no content jumps or collapses.
- No restricted data is leaked in no-permission states.
- Loading, empty, error, no-permission, and building states are visually consistent within one product surface.
- Visual style is justified by product context and not chosen only because it looks "premium".
- The pattern can be reproduced from text alone without raw screenshot paths, image vectors, or OCR-only evidence.
