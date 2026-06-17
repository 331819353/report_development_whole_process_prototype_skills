# Operational List, Status Chip, And Timeline Patterns

Use this reference when screenshots or visual samples show information lists, task lists, alert lists, exception lists, status chip groups, event timelines, user/member lists, or mixed work-item lists that should become reusable component patterns. The source images are temporary visual evidence; the durable standard is this text contract.

Pair with:

- `07-cards-lists-tasks.md` for generic card/list overflow, state, and task rules.
- `06-analytical-tables.md` when the list becomes row-level audit evidence with many columns.
- `08-drawers-detail-panels.md` when row click opens detail, evidence, operation, or owner workflow.
- `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` when converting visual samples into text-only contracts.

## Pattern Identity

Use these stable pattern names:

```ts
type ListStatusPattern =
  | 'simple-info-list'
  | 'progress-task-list'
  | 'severity-alert-list'
  | 'exception-record-list'
  | 'status-chip-set'
  | 'event-timeline'
  | 'user-object-list'
  | 'mixed-info-list';
```

Use:

```ts
visualType: operational-list
listStatusPattern: one of the controlled values above
```

Recommended component type:

| Pattern | Recommended `componentType` | Primary task |
| --- | --- | --- |
| `simple-info-list` | `card` | Scan ordinary records with owner, status, time, and action. |
| `progress-task-list` | `task` | Track task owner, deadline, status, and completion progress. |
| `severity-alert-list` | `card` or `task` | Locate alerts by severity, threshold, and latest time. |
| `exception-record-list` | `card` or `task` | Track system/business exceptions by code, time, and handling state. |
| `status-chip-set` | `custom` or `card` | Display reusable status tags for labels, filters, and markers. |
| `event-timeline` | `custom` or `card` | Read ordered process or event history by time. |
| `user-object-list` | `card` | Identify people/objects with avatar, role, org, status, and action. |
| `mixed-info-list` | `card` | Show work items with title, subtitle, status, priority, owner, and time. |

Do not map these as `ranking-list` unless row order encodes Top N rank and relative magnitude. Do not map them as analytical tables unless the primary task is exact audit, sorting, pagination, export, or many columns.

## Why These Designs Feel Strong

- Each row answers a real work question: what item, who owns it, what state, when updated, and what action exists.
- They use list rhythm instead of decorative card noise. Row height, dividers, metadata order, and right-side status/action alignment stay stable.
- Status color is semantic, not ornamental. Green, blue, orange, red, and gray map to lifecycle, severity, progress, or availability.
- Badges and chips are restrained. They identify state, priority, severity, or lifecycle rather than turning every field into a pill.
- Icons have jobs: document, task, alert, exception, user avatar, timeline node, or operation menu. They do not fill empty space.
- The density is believable for enterprise products: enough rows for scanning, not giant marketing cards with sparse content.
- Time, owner, and status are treated as first-class evidence. This makes the component feel operational rather than illustrative.
- Progress bars and timeline rails are small but data-driven. They support the row, not dominate it.
- The surface stays quiet: soft border, limited shadow, consistent spacing, and no random glass, glow, or oversized gradients.

## Pattern Selection

| User need | Choose |
| --- | --- |
| Ordinary projects, reports, documents, dashboards, or records with status and last update | `simple-info-list` |
| Tasks with owner, department, deadline, status, and completion percentage | `progress-task-list` |
| Monitoring alerts with severity and threshold/current value evidence | `severity-alert-list` |
| Failures, errors, incidents, abnormal jobs, or ignored/handled states | `exception-record-list` |
| Reusable status labels for filters, markers, lifecycle, business state, switch state, and size variants | `status-chip-set` |
| Ordered workflow, event, approval, release, or operation history | `event-timeline` |
| Users, members, customers, owners, assignees, or contacts with avatar and availability | `user-object-list` |
| Work items combining title, description, state, priority, owner, and update time | `mixed-info-list` |

If the component needs sorting, pagination, export, row selection, or more than `5-6` visible fields, use a table. If it needs Top N comparison, use `ranking-list`. If it is mainly a decision sentence, use an Analysis & Insight component.

## Shared Anatomy

Every operational list should declare:

1. Header: component title, optional subtitle/unit, optional local filter/action.
2. Row identity: item id, display name/title, optional icon/avatar.
3. Row metadata: owner, role, department, deadline, update time, error code, threshold, or subtitle.
4. State signal: status chip, severity badge, availability dot, priority text, progress bar, or timeline node.
5. Action affordance: operation menu, row click, detail drawer, retry, handle, ignore, contact, or no action.
6. Display budget: visible row count, row height, and overflow strategy.
7. State behavior: loading skeleton row count, empty reason, error state, disabled/no-permission row, stale selection, and hover/focus.
8. Exact-value path: tooltip, detail drawer, table fallback, or event detail.

## Size And Density

Default desktop sizes:

| Pattern | Size rule |
| --- | --- |
| `simple-info-list` | Card width `360-720px`; row height `44-56px`; visible rows `4-8`; use table for many fields. |
| `progress-task-list` | Card width `420-760px`; task row height `64-78px`; progress track `72-120px`; visible rows `3-6`. |
| `severity-alert-list` | Card width `420-760px`; alert row height `68-84px`; visible rows `3-6`; severity icon left. |
| `exception-record-list` | Card width `420-760px`; exception row height `64-82px`; visible rows `3-6`; handling status right. |
| `status-chip-set` | Chip height `24-32px`; chip min width `56px`; group row gap `12-18px`; max `6` visible chips per group before wrapping or dropdown. |
| `event-timeline` | Card width `440-780px`; time column `92-120px`; rail `24-32px`; event row height `64-82px`; visible steps `4-8`. |
| `user-object-list` | Card width `420-760px`; row height `48-62px`; avatar `24-32px`; visible rows `4-8`. |
| `mixed-info-list` | Card width `420-780px`; row height `56-72px`; title/subtitle left; status/priority/owner/time right. |

Mobile fallback:

- Collapse low-priority metadata under the title.
- Keep primary state visible.
- Move secondary action into a trailing menu.
- Timeline time labels may stack above event cards when width is under `420px`.
- Chip groups wrap to two lines, then collapse to `+N` or a dropdown.

## Pattern Rules

### Simple Info List

Use for ordinary information rows with predictable columns.

Rules:

- Row columns normally follow: title/name, owner, status, update time, action.
- Header labels are visible when the list behaves like a light table.
- Status chip uses short text plus dot/color.
- Operation menu is trailing and vertically centered.
- Use this pattern for `4-6` fields. Use a table when fields exceed this budget.

Required fields:

- `item_id`, `item_name`, `owner_name`, `status`, `updated_at`.
- Optional: `action_enabled`, `detail_route`, `permission_scope`.

### Progress Task List

Use for action closure and progress tracking.

Rules:

- Each task row shows title, owner/department, deadline, status, progress bar, and percent.
- Progress color follows task status, not arbitrary category color.
- Deadline must state whether it is due date, completion date, or SLA target.
- Completed tasks show `100%`; not-started tasks show `0%`; blocked/overdue states must be visually distinct.
- If progress formula is missing, use status-only task list instead of fake bars.

Required fields:

- `task_id`, `task_title`, `owner_name`, `owner_team`, `deadline_at`, `task_status`, `progress_rate`.
- Optional: `overdue_flag`, `blocked_reason`, `next_action`.

### Severity Alert List

Use for monitoring or threshold alerts.

Rules:

- Left icon color and severity chip match the same severity scale.
- Alert title names the condition, not a generic warning.
- Body states current value, threshold, impact, or required handling.
- Timestamp is visible in every row.
- The severity scale must be stable across the page: critical/high/medium/low/info or project equivalent.

Required fields:

- `alert_id`, `alert_title`, `severity`, `current_value`, `threshold_value`, `occurred_at`.
- Optional: `metric_id`, `metric_name`, `owner_name`, `handle_action`.

### Exception Record List

Use for failures, errors, incidents, abnormal jobs, payment/log-in/sync/export/report issues, and handling state.

Rules:

- Row title states the failure.
- Error code is visible below the title.
- Occurred time is visible and consistently formatted.
- Handling state sits on the right: unhandled, handling, ignored, resolved, failed-retry, or project equivalent.
- Destructive or risky retry/ignore actions should open confirmation or detail.

Required fields:

- `exception_id`, `exception_title`, `error_code`, `occurred_at`, `handling_status`.
- Optional: `severity`, `system_module`, `retry_action`, `ignore_reason`.

### Status Chip Set

Use when the design goal is reusable status labels rather than records.

Rules:

- Chip shape, padding, icon/dot, and text size are consistent across status families.
- Use soft fills for ordinary states and stronger fills only for selected/critical/success states.
- Color must pair with text and dot/icon.
- Each chip family declares allowed statuses and semantic meaning.
- Do not invent local one-off colors for every page.

Common chip families:

- Basic lifecycle: default, in-progress, completed, paused, cancelled, draft.
- Business result: success, failure, warning, abnormal, pending-review, returned.
- Switch state: enabled, disabled, enabling, pausing.
- Size/state examples: large, default, small, compact/mini.

### Event Timeline

Use for ordered events, workflow history, process milestones, and audit trails.

Rules:

- Time column is left aligned and fixed width.
- Rail/node column is stable; each node color maps to event status or type.
- Event card contains title and one concise detail line.
- Latest or current node may be emphasized, but all steps remain readable.
- Timeline order must be explicit: ascending, descending, or workflow order.
- Dense event histories should collapse older steps or open a full detail drawer.

Required fields:

- `event_id`, `event_time`, `event_title`, `event_actor`, `event_status`, `event_detail`.
- Optional: `event_type`, `current_step_flag`, `source_system`.

### User Object List

Use for user/member/customer/contact/owner rows.

Rules:

- Avatar or initials identify the object quickly.
- Name is primary; email/phone/account is secondary.
- Role and department are stable columns.
- Availability or account status uses dot + short label.
- Operation menu is trailing. Contact/detail actions can appear in drawer.

Required fields:

- `object_id`, `display_name`, `secondary_identity`, `role_name`, `department_name`, `status`.
- Optional: `avatar_url`, `masked_phone`, `permission_scope`, `detail_action`.

### Mixed Info List

Use for work items that combine title, short description, status, priority, owner, and time.

Rules:

- Title and secondary description form the left reading block.
- Status, priority, owner/avatar, and update time align in stable right columns.
- Priority has a short value such as high/medium/low and must not compete with lifecycle status.
- Use icons only when they classify item type or source.
- If descriptions become long, show one line and disclose full text in tooltip/detail.

Required fields:

- `item_id`, `item_title`, `item_summary`, `item_status`, `priority`, `owner_name`, `updated_at`.
- Optional: `item_type`, `owner_avatar`, `detail_action`.

## Data And Interaction Contract

Every reusable operational list should declare:

```ts
type OperationalListContract = {
  listStatusPattern: ListStatusPattern;
  sourceDataset: string;
  rowGrain: 'record' | 'task' | 'alert' | 'exception' | 'status-option' | 'event' | 'user' | 'work-item' | string;
  primaryKeyField: string;
  titleField: string;
  secondaryTextFields: string[];
  statusField?: string;
  severityField?: string;
  priorityField?: string;
  ownerField?: string;
  timeField?: string;
  progressField?: string;
  sortRule: string;
  visibleRowCount: number;
  rowHeightPx: number;
  overflowStrategy: 'pagination' | 'internal-scroll' | 'load-more' | 'detail-drawer' | 'table-fallback' | 'collapse-plus-n';
  statusDictionary: string[];
  actionPayload: string[];
  tooltipPayload: string[];
  rowClickAction?: string;
  validationCases: string[];
};
```

Status-bearing rows must not store only display text. The status dictionary should define raw value, display label, color semantic, icon/dot, business meaning, terminal-state flag, and allowed actions.

## Anti-AI Gate

Reject or revise the component when:

- Rows do not answer who/what/status/time/action.
- Every field is a badge or pill.
- Colors are decorative rather than tied to lifecycle, severity, priority, progress, or availability.
- Progress bars have no formula or update rule.
- Alerts do not declare severity scale, threshold/current value, or occurrence time.
- Exceptions show red styling but lack error code, handling state, or next action.
- Timeline nodes are evenly decorative but the event order or timestamp is missing.
- User/object rows show avatars but lack stable object identity or status semantics.
- The list crams many fields into cards when a table is the correct component.
- Long names, descriptions, status text, or action labels are clipped without tooltip/detail.

## Acceptance Checklist

- `visualType` is `operational-list` and `listStatusPattern` is one of the controlled values.
- The component declares row grain, primary key, visible row count, row height, sort rule, and overflow strategy.
- Status/severity/priority dictionaries map raw values to visible label, icon/dot, color semantic, and allowed actions.
- Task progress has a source field or formula and consistent percent display.
- Alert/exception rows include severity or handling status plus time evidence.
- Clickable rows/actions emit stable payload fields and preserve active filters.
- Empty/loading/error/no-permission states preserve the same geometry.
- The raw screenshot is not the durable source of truth; the reusable pattern is captured in text fields and contract rules.
