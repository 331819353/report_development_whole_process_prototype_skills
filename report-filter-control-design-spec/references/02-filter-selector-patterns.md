# Filter Selector Pattern Library

Use this reference when screenshot or design-sample inspired filter controls need to become reusable, text-only, implementation-ready standards. The source images are treated as temporary visual evidence; the durable knowledge is the pattern contract below.

Pair with:

- `report-component-style-design` `references/02-filter-controls.md` for page/global filter rules.
- `report-component-style-design` `references/10-in-component-controls.md` for component-local controls.
- `report-component-style-design` `references/12a-placement-foundation-controls.md` for header-right/local placement.
- `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` when converting image samples into text-only contracts.

## Pattern Identity

Use these stable pattern names:

```ts
type FilterControlPattern =
  | 'single-select-dropdown'
  | 'multi-tag-select'
  | 'date-range-selector'
  | 'searchable-select'
  | 'tree-path-selector'
  | 'advanced-filter-drawer'
  | 'combined-filter-chipbar';
```

Pair pattern names with `filterValueType`:

| Pattern | Typical `filterValueType` | Use when |
| --- | --- | --- |
| `single-select-dropdown` | `single`, `enum` | One ordinary dimension value is selected from a small or medium option set. |
| `multi-tag-select` | `multiple`, `enum` | Users need multiple selected values visible as removable chips. |
| `date-range-selector` | `range`, `date` | A report period, custom range, or common shortcut is selected. |
| `searchable-select` | `keyword`, `single`, `multiple` | Option volume is high or users know what to search. |
| `tree-path-selector` | `treePath` | A hierarchical organization, region, category, or product path is selected. |
| `advanced-filter-drawer` | `mixed` | Multiple low-frequency conditions should be hidden behind one trigger. |
| `combined-filter-chipbar` | `mixed` | The surface should show the current active filter summary without exposing every field. |

## Why These Controls Feel Designed

- The same control is shown in a size family: large, medium, small, and mini. This turns width into a deliberate system, not random resizing.
- Labels sit in a stable left column while controls align on the same x-axis. The eye reads the type before the specific value.
- Each pattern matches the data problem: tags for multi-select, date affordance for ranges, search icon for large option sets, path text for hierarchy, drawer for many conditions.
- Placeholder and selected states are short and useful. The control does not need helper paragraphs inside the field.
- Icons are semantic and quiet: chevron means open, calendar means date, search means query, filter means conditions.
- Borders, radius, padding, text size, and chevron placement stay consistent across variants.
- Active state is visible through chips, selected text, badge count, or drawer summary. Users do not have to remember hidden filters.
- The design avoids AI-like decoration: no random gradients, no oversized glow, no decorative cards inside cards, and no fake options.

## Shared Size System

Use one width system before styling:

```text
availableW = parent filter column or component control row width
largeW = min(availableW, max(280px, availableW * 1.00))
mediumW = clamp(200px, availableW * 0.60, 320px)
smallW = clamp(150px, availableW * 0.40, 240px)
miniW = 120px
controlH = 40px for page/global filters
denseControlH = 32px for component-local or table-toolbar filters
rowGap = 18-24px in specification demos; 8-12px in production filter bars
```

Minimum interactive widths:

- Compact select: `120px`.
- Ordinary select: `160px`.
- Search select: `200px`.
- Date range: `220px`.
- Tree select / cascader: `220px`.
- Drawer trigger: `40px` icon-only or `96-140px` text+icon.
- Combined chipbar: `120px` mini trigger, otherwise content-driven with max width and overflow summary.

Use the size labels consistently:

| Size label | Meaning | Behavior |
| --- | --- | --- |
| Large / `100%` | Fill the available filter column or toolbar cell. | Show full placeholder or selected path when possible. |
| Medium / `60%` | Ordinary form field in a compact row. | Show selected value; truncate long text with tooltip. |
| Small / `40%` | Narrow but still readable field. | Prefer short labels, shortcuts, or collapsed tags. |
| Mini / `120px` | Dense toolbar or component-local trigger. | Show summary, selected shortcut, icon, or count rather than long text. |

## Anatomy

Every selector uses:

1. Optional external label: stable, left aligned, not inside the control.
2. Trigger container: one height, one radius, one border style.
3. Leading affordance when useful: search, calendar, filter, tree/path hint.
4. Value area: placeholder, selected value, chips, path, date, or count.
5. Right affordance: chevron, calendar icon, clear icon, or action arrow.
6. Popover/menu/drawer: same width as trigger or wider when required for readability.
7. State layer: hover, focus, disabled, loading, no options, error.

Do not put multiple unrelated actions inside one trigger.

## Pattern Rules

### Single Select Dropdown

Use for region, product, period shortcut, metric, owner, status, and other ordinary single-choice filters.

Rules:

- Trigger shows placeholder such as `请选择区域` or selected value such as `区域`.
- Chevron is always right aligned.
- Placeholder text uses muted color; selected value uses normal text.
- Large and medium sizes may show longer labels; small/mini sizes use concise labels and tooltip for full value.
- Do not use native unstyled select as the final visual surface.

### Multi Tag Select

Use when the selected values matter and should remain visible.

Rules:

- Selected items are removable tags with close affordance.
- Large size may show `2-4` tags; medium size `1-2`; small/mini should collapse to `已选 N 项` or a short summary when tags no longer fit.
- Tag text must not wrap.
- The menu should include search when the option set is large.
- Do not let chips push the chevron or field height out of alignment.

### Date Range Selector

Use for report periods and analysis windows.

Rules:

- Large range may show start date, separator, end date, and calendar icons.
- Medium range may show dates with one calendar icon.
- Small/mini should use shortcuts such as `本月`, `近7天`, `本周`, with exact range in tooltip/popover.
- Separator should be visually quiet and centered.
- Calendar icon must be semantic; do not replace it with decorative icons.
- If custom range is allowed, the popover should expose start/end inputs and quick presets.

### Searchable Select

Use when option volume is high, option names are hard to scan, or users know the target keyword.

Rules:

- Search icon sits left for search-as-you-type controls.
- Placeholder says what can be searched, such as `搜索产品名称` or `搜索客户`.
- The menu filters options while preserving no-result and loading states.
- Mini mode may become a search trigger with icon and short `搜索` text.
- Do not use a searchable selector for tiny `2-4` option sets.

### Tree Path Selector

Use for organization, region, category, product hierarchy, and other parent-child dimensions.

Rules:

- Trigger displays a readable path, for example `华东地区 / 浙江省 / 杭州市`.
- Use slash or chevron separators consistently.
- Large size may show three levels; medium `1-2` levels; small/mini shows current node plus tooltip for full path.
- The popover should support expand/collapse, search, and selected path feedback when hierarchy is deep.
- Do not flatten a real hierarchy into an ambiguous dropdown.

### Advanced Filter Drawer

Use when filters are low-frequency, numerous, or expensive to apply.

Rules:

- Trigger may show icon+label+arrow, label-only, or icon-only depending on width.
- If active filters exist, show count badge or active state on the trigger.
- Drawer width defaults to `320-420px` on desktop; mobile may use full width.
- Drawer title, close icon, grouped fields, reset, and confirm/apply actions are permanent.
- Use reset and confirm for multi-step or expensive filters; avoid immediate updates for every drawer field unless the project explicitly uses live filtering.
- Drawer fields use the same selector patterns inside; do not invent a second visual language.

### Combined Filter Chipbar

Use when a compact surface should summarize current active filters.

Rules:

- The large form may show several `label: value` chips in one bar.
- Medium form shows the most important chips and collapses the rest.
- Small form shows one chip or one group.
- Mini form shows `筛选 N` with a badge and chevron.
- Chips are removable only if removing that condition is safe and immediately understandable.
- Clicking the bar opens a popover/drawer with the full filter set.

## Scope Rules

Classify each selector before placement:

| Scope | Allowed patterns |
| --- | --- |
| Page/global filter | All patterns, including drawer and combined chipbar |
| Component-local filter | Single select, date shortcut, small combined chip, or compact dropdown; drawer only when the component owns a complex local analysis mode |
| Table toolbar / column filter | Single select, searchable select, date range, combined chipbar |
| Drawer-internal field | Single select, multi-tag, date range, searchable select, tree path |

Component-local filters must not silently change page scope, export scope, permission scope, backend aggregation, pagination, or other components.

## Data And Binding Contract

Each filter should declare:

```ts
type FilterSelectorContract = {
  filterId: string;
  label: string;
  filterControlPattern: FilterControlPattern;
  filterValueType: 'single' | 'multiple' | 'range' | 'keyword' | 'date' | 'treePath' | 'enum' | 'toggle' | 'mixed';
  scope: 'page-global' | 'component-local' | 'table-column' | 'drawer-internal';
  optionSource: 'static-options' | 'filterData' | 'api' | 'resolver' | 'computed-from-business-data';
  defaultValue: string | string[] | Record<string, unknown> | null;
  resetValue: string | string[] | Record<string, unknown> | null;
  fieldMap: string[];
  queryParams: string[];
  affectsComponents: string[];
  executionStage: 'sql-where' | 'source-query' | 'provider-query' | 'repository-query' | 'resolver-param' | 'component-local' | 'bounded-local' | 'blocked';
  emptyOptionState: string;
  disabledReason?: string;
  tooltipPayload?: string[];
};
```

Dynamic KPI values, rankings, or status lights do not belong in filter option metadata. They must come from business data or a resolver.

## States

Required states:

- Default placeholder.
- Selected value.
- Hover.
- Focus.
- Open menu / drawer.
- Active filter count.
- Disabled with reason.
- Loading options.
- No options.
- Error loading options.
- Long value overflow with tooltip.
- Permission-limited option list.

## Anti-AI Gate

Reject or revise the filter design when:

- Widths are arbitrary and do not follow large/medium/small/mini behavior.
- Multi-select values are hidden without a count or summary.
- A date range loses exact dates without tooltip or popover access.
- A hierarchy is shown as a flat ambiguous string.
- A drawer trigger gives no active-filter feedback.
- The field looks like a generic native select with no designed hover/focus/selected/open states.
- Page/global filters are duplicated inside every component.
- The filter changes only the visual selected state while affected data remains unchanged.
- The design uses decorative gradients, large shadows, or colorful tags that compete with report reading.

## Acceptance Checklist

- Each visible selector has `filterControlPattern`, `filterValueType`, scope, option source, default/reset value, affected components, and execution stage.
- Large, medium, small, and mini behavior are defined when the pattern is responsive.
- Placeholder, selected, hover, focus, open, disabled, loading, no-option, and error states are specified.
- Long selected values have tooltip/popover disclosure.
- Component-local filters prove current-component or declared local-group scope.
- Drawer and combined chipbar triggers show active count or summary when filters are active.
- The visual language uses the same height, radius, border, text size, icon placement, and state style across filter patterns.
