# Table Card Patterns

Use this reference when screenshots or requirements show reusable table card patterns: plain detail ledgers, operational status tables with filters, grouped-header summary tables, metric matrices, S2 cross/pivot tables, fixed-column wide tables, grouped subtotal summary tables, and tree hierarchy tables. The source images are temporary visual evidence; the durable standard is this text contract.

Pair with:

- `06-analytical-tables.md` for base Detail Table, Pivot Table, grouped header, S2, row density, column width, status, and state rules.
- `10-in-component-controls.md` when the table owns local filters, date ranges, export, column settings, metric switches, or display-mode controls.
- `12f2-placement-grouped-table-header.md`, `12f3-placement-pivot-table.md`, `12f4-placement-detail-table.md`, and `12f5-placement-table-acceptance-checks.md` when implementation-ready geometry is required.
- `$report-table-design-spec` as the table front door.
- `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` when converting visual samples into text-only contracts.

## Pattern Identity

Use these stable pattern names:

```ts
type TableCardPattern =
  | 'plain-detail-ledger-table'
  | 'filtered-operational-status-table'
  | 'grouped-header-summary-table'
  | 'metric-matrix-table'
  | 's2-cross-pivot-table'
  | 'fixed-column-scroll-table'
  | 'grouped-subtotal-summary-table'
  | 'tree-hierarchy-table';
```

Use:

```ts
componentType: table
visualType: table | pivot
tableCardPattern: one of the controlled values above
```

Recommended mapping:

| Pattern | Recommended `visualType` | Primary task |
| --- | --- | --- |
| `plain-detail-ledger-table` | `table` | Inspect row-level records with stable identity, status, and row action. |
| `filtered-operational-status-table` | `table` | Operate a bounded list with component-local filters, status, and detail/export actions. |
| `grouped-header-summary-table` | `table` | Compare related measures organized by multi-level column groups. |
| `metric-matrix-table` | `pivot` | Compare metric families, dimensions, targets, weights, scores, or multidimensional indicators. |
| `s2-cross-pivot-table` | `pivot` | Read row dimension * column dimension cross summaries with S2-class behavior. |
| `fixed-column-scroll-table` | `table` | Scan a wide schedule/progress/period table with frozen key columns and horizontal scroll. |
| `grouped-subtotal-summary-table` | `table` | Read grouped rows with subtotal and grand-total reconciliation. |
| `tree-hierarchy-table` | `table` | Browse parent-child row structures with expand/collapse and row-level metrics. |

Do not use these patterns for decorative dense grids. A table is valid when exact values, row evidence, comparison, export, reconciliation, operation, or hierarchy browsing is the job.

## Why These Designs Feel Strong

- The table type matches the business task. Detail ledgers serve audit, operational tables serve work, grouped headers serve comparison, S2 serves multidimensional cross-summary, fixed columns serve wide periods, subtotal tables serve reconciliation, and tree tables serve hierarchy.
- Row grain is obvious. Each row reads as an order, project, store, region, metric, group subtotal, or tree node rather than anonymous filler data.
- Column structure is meaningful. Complex headers group fields by metric family, period, target/actual, or dimension; merged headers are not decorative banners.
- Numeric reading is disciplined. Amounts, percentages, rates, scores, and ranks align right with tabular numerals and consistent precision.
- Status and actions are quiet. Badges, operation links, and export buttons support the workflow without turning the table into a button wall.
- The density is engineered. Header depth, row height, visible row count, scrollbars, fixed columns, subtotal rows, and pagination are budgeted before styling.
- Exact-value access is native. Tooltip, row drawer, export, pagination, column setting, drilldown, or fullscreen paths are declared.
- The surface stays calm. Weak borders, pale header backgrounds, subtle row hover, and restrained blue accents let the data hierarchy carry the design.
- Renderer ownership is clear. Simple detail tables use Element Plus/project table; pivot/cross/wide analytical matrices use AntV S2 or an equivalent analytical renderer.

## Pattern Selection

| User need | Choose |
| --- | --- |
| Basic row-level audit, order ledger, customer list, transaction list, or detail evidence | `plain-detail-ledger-table` |
| Table-level filters, date range, status badge, row detail, export, or operational scanning | `filtered-operational-status-table` |
| Many fields naturally grouped by period, metric family, actual/target, amount/share, or business domain | `grouped-header-summary-table` |
| Multiple indicator rows and metric columns need weighted score, target, completion, or multidimensional comparison | `metric-matrix-table` |
| Row dimension * column dimension aggregate summary, especially region by product/month/category | `s2-cross-pivot-table` |
| Wide time/progress table where first columns must remain visible while users scroll horizontally | `fixed-column-scroll-table` |
| Grouped rows need subtotal rows, grand total, and group-level reconciliation | `grouped-subtotal-summary-table` |
| Parent-child rows, organization/project/category hierarchy, or expandable row tree is primary | `tree-hierarchy-table` |

## Shared Card Anatomy

Every table card should declare:

1. Card surface: inherited report card surface, quiet border/radius/shadow, and no decorative background inside the data body.
2. Header area: title left; optional unit/subtitle, local filter chips, dropdowns, date range, column setting, export, or fullscreen right.
3. Table viewport: measured table body with stable header, body, scrollbar, pagination, and state geometry.
4. Column contract: column id, label, type, width, alignment, priority, sortable/filterable flag, unit/precision, formatter, tooltip, and fixed behavior.
5. Row contract: row grain, primary key, default sort, status/action payload, permission behavior, and row click/expand semantics.
6. Exact-value path: tooltip for truncated cells, row drawer/detail route, export, drilldown, or fullscreen.
7. Density strategy: visible columns, visible rows, header depth, scroll direction, fixed columns, pagination, virtual scroll, subtotal behavior, and responsive fallback.
8. State behavior: loading, empty, filter-empty, error, no-permission, partial data, missing fields, long text, dense data, and stale selection.

## Size And Placement

Default desktop sizes:

| Pattern | Size rule |
| --- | --- |
| `plain-detail-ledger-table` | Width `640-1200px`; height `220-360px`; visible columns `5-8`; visible rows `4-6` minimum. |
| `filtered-operational-status-table` | Width `720-1280px`; height `260-420px`; toolbar `36-48px`; visible columns `7-10`; filters `2-5`. |
| `grouped-header-summary-table` | Width `760-1320px`; height `260-440px`; header levels `2-3`; leaf columns `8-18` ordinary. |
| `metric-matrix-table` | Width `760-1320px`; height `260-440px`; metric groups `2-5`; measures `4-12`; row groups `2-6`. |
| `s2-cross-pivot-table` | Width `720-1320px`; height `240-420px`; rows `<=50` and columns `<=12` direct; larger needs S2 scroll/virtualization. |
| `fixed-column-scroll-table` | Width `760-1320px`; height `240-420px`; frozen columns `1-3`; horizontal scrollbar visible when overflow exists. |
| `grouped-subtotal-summary-table` | Width `720-1280px`; height `260-440px`; groups `2-8`; subtotal rows visible; grand total sticky or bottom. |
| `tree-hierarchy-table` | Width `720-1280px`; height `260-440px`; visible depth `<=4`; visible rows `<=80` without virtualization. |

Mobile fallback:

- Convert broad analytical tables to preview + fullscreen/detail route under `640px`.
- Collapse low-priority columns first; never hide primary key, core metric, status, or action without a detail path.
- Keep tree expand/collapse and row identity visible; move secondary metrics into row drawer.
- S2/pivot and wide fixed-column tables should default to fullscreen or horizontal scroll rather than shrinking text below readable size.

## Pattern Rules

### Plain Detail Ledger Table

Use for row-level audit and exact record lookup.

Rules:

- Keep row grain explicit: order, transaction, customer, project, ticket, or ledger row.
- Show primary identity early, then key dimensions, core numeric metrics, status, and operation.
- Keep row actions to one primary action plus more menu when needed.
- Use pagination or virtual scroll when data can exceed the visible range.

Required fields:

- `row_id`, primary display field, time/period field, core dimension fields, core metric fields, status/action fields.

### Filtered Operational Status Table

Use when users filter and act on a bounded table.

Rules:

- Component-local filters must affect only this table or a declared local group.
- Filters belong in the header-right/toolbar band and must not steal body height below the visible-row floor.
- Status badges use restrained semantic colors and explicit dictionaries.
- Export/detail actions must preserve the active filter context.

Required fields:

- `row_id`, filter fields, default filter values, status dictionary, metric fields, detail/export payload fields.

### Grouped Header Summary Table

Use for natural column groups and complex comparison headers.

Rules:

- Use a real `columnTree`; parent group widths derive from visible leaf columns.
- Header depth defaults to `2`; depth `3` needs height budget; depth `4+` requires collapse, split, or fullscreen.
- Parent headers explain group meaning, not controls. Leaf headers own sort/filter/definition icons.
- Freeze the row identity column when horizontal scroll exists.

Required fields:

- `columnTree`, leaf field metadata, `colSpan`/`rowSpan` rules, group definitions, unit rules, fixed column rules.

### Metric Matrix Table

Use for indicator systems, scorecards, weighted metrics, and multidimensional comparison.

Rules:

- Separate row dimension groups from metric columns. Do not flatten every metric into anonymous columns.
- Weight, score, target, actual, and completion formulas must be explicit.
- Conditional formatting is limited to `1-2` core signals such as target completion or score.
- Metric group subtotals or overall score must recompute formulas, not sum percentages.

Required fields:

- `metric_id`, `metric_name`, `metric_group`, `dimension_fields`, actual/target/score/weight fields, formula metadata, unit/precision.

### S2 Cross Pivot Table

Use for row dimension * column dimension aggregate summaries.

Rules:

- Use AntV S2 or project S2-equivalent when the table needs frozen row headers, merged headers, pivot scrolling, or analytical interaction.
- Declare row dimensions, column dimensions, measures, subtotal, and grand total behavior.
- Time columns keep natural order; row dimensions follow business order or selected sort.
- Tooltips must show row path, column path, measure, exact value, formula, period, and source.

Required fields:

- `row_dimensions`, `column_dimensions`, `measures`, aggregation functions, subtotal/grand-total rules, S2 renderer config.

### Fixed Column Scroll Table

Use for wide period/progress/schedule tables.

Rules:

- Freeze row number or primary identity columns and keep the horizontal scrollbar inside the table card.
- Keep date/month/progress columns narrow but readable. Do not shrink below the numeric/text minimum.
- Sticky header and frozen columns must remain synchronized during horizontal and vertical scroll.
- Missing period values display `--`; real zero displays `0`.

Required fields:

- `row_id`, fixed key columns, wide period/metric columns, scroll width, fixed left/right column definitions, missing-value behavior.

### Grouped Subtotal Summary Table

Use for grouped rows with subtotal and grand total reconciliation.

Rules:

- Group rows and subtotal rows must be visually distinct but restrained.
- Subtotal and grand total formulas must reconcile to visible leaf rows under active filters.
- Expand/collapse is optional, but group identity must remain visible.
- Summary rows use stable row height and align numeric cells with ordinary rows.

Required fields:

- `group_id`, `group_name`, row fields, subtotal fields, grand total fields, aggregation formulas, group sort, expanded state.

### Tree Hierarchy Table

Use for parent-child row structures.

Rules:

- Use tree table behavior when users need exact row values inside a hierarchy. Use tree diagram when spatial structure is the main evidence.
- Declare root, parent-child relationship, level, default expanded depth, and child-count behavior.
- Indentation uses `levelIndent = 16-20px`; expand/collapse icons sit before the row label.
- Dense trees require search, collapse, virtualization, or fullscreen/detail route.

Required fields:

- `node_id`, `node_name`, `parent_id`, `level`, `has_children`, metric fields, status/action fields, default expanded state.

## Data And Interaction Contract

Every mapping that uses `tableCardPattern` must include:

```ts
type TableCardContract = {
  tableCardPattern: TableCardPattern;
  visualType: 'table' | 'pivot';
  rowGrain: string;
  primaryKey: string;
  columnMetadata: Array<{
    field: string;
    label: string;
    type: 'text' | 'number' | 'amount' | 'percent' | 'rate' | 'status' | 'time' | 'action' | 'tree';
    width: number;
    align: 'left' | 'center' | 'right';
    unit?: string;
    precision?: number;
    priority: 'must-have' | 'should-have' | 'optional';
    sortable?: boolean;
    filterable?: boolean;
    fixed?: 'left' | 'right';
  }>;
  columnTree?: unknown;
  pivotContract?: unknown;
  groupedHeaderContract?: unknown;
  defaultSort: string;
  localControls?: string[];
  paginationOrScroll: string;
  rendererOwner: 'element-plus' | 'antv-s2' | 'project-table';
  exactValuePath: string;
  fallback: string;
};
```

Interaction rules:

- Header sort/filter, row click, row action, expand/collapse, selection, export, fullscreen, and drilldown must declare emitted event, payload fields, permission behavior, and stale-state behavior.
- Export, drawer, and drilldown must preserve active filters, sort, pagination, selected metric, and permission scope.
- Component-local filters must not silently change backend aggregation, pagination, export scope, permission scope, or table schema.

## Renderer Notes

- Use Element Plus or the project table component for ordinary detail, operational, fixed-column, subtotal, and tree tables when the behavior is supported.
- Use AntV S2 or an equivalent analytical renderer for S2 cross tables, pivot tables, metric matrices, dense grouped headers, frozen-header analytical tables, and drillable comparison grids.
- Do not use S2 merely because a component is a table. S2 is justified by pivot/cross/matrix behavior, not by visual style.
- Do not hand-draw complex headers with absolute overlays. Use the table renderer's header model so scroll, sort, filter, fixed columns, tooltips, and accessibility remain consistent.

## Anti-AI Gate

Reject or revise the component when any of these are true:

- The table has no row grain, primary key, default sort, or column metadata.
- Complex headers are visual decoration rather than a real `columnTree`.
- Numeric cells are center-aligned or inconsistently formatted.
- The table hides critical columns without tooltip, drawer, column setting, or export path.
- Header depth, filters, or summary rows leave fewer than `4` useful body rows.
- S2 is used for a simple detail list, or a simple table is used for a real pivot/cross matrix that needs S2 behavior.
- Local filters change table schema or backend scope but are documented as row-scope filters.
- Exact row/detail/export behavior is missing when the table is the decision evidence.

## Acceptance Checklist

- Pattern value is one of the `TableCardPattern` controlled values.
- `componentType: table` and `visualType` is `table` or `pivot`.
- Row grain, primary key, default sort, column metadata, and numeric display contracts are declared.
- Grouped header, pivot, fixed-column, subtotal, or tree behavior is declared when applicable.
- Renderer ownership is explicit: Element Plus/project table or AntV S2.
- Scroll, pagination, visible row count, fixed columns, and state geometry are specified.
- Loading, empty, filter-empty, error, no-permission, missing fields, dense data, and long-text states are covered.
- The card can be generated from text contracts without keeping the source screenshot.
