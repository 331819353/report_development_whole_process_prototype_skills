# Target/Actual Detail Table Card Patterns

Use this reference when a target/actual KPI family needs exact ranked rows rather than another chart. It captures compact sales detail cards with a title, local period switch, legend, ranked table, actual/comparison/target columns, completion rate, total row, and field-definition footer.

This is a table-card composition pattern. Pair it with:

- `06-analytical-tables.md` for Detail Table rules.
- `10-in-component-controls.md` for the local `实时 / 月累 / 年累` style switch.
- `12f4-placement-detail-table.md` for table title, header, body, summary row, pagination, and state geometry.
- `report-table-design-spec` when the task is mainly table column width, row density, fixed header, scrolling, or export behavior.

## Pattern Identity

Do not create a new `visualType`. Use:

```text
componentType: table
visualType: table
tableSubtype: target-actual-detail
targetActualTablePattern: one of the values below
```

| `targetActualTablePattern` | Use when | Visual structure |
| --- | --- | --- |
| `standard-audit-table` | Exact reconciliation, ranking, and export/evidence are the primary purpose. | Neutral card, title-left, period switch-right, legend, ranked table, highlighted actual column, tinted total row, footer definitions. |
| `compact-audit-table` | Narrow cards, mobile cards, or embedded previews need fewer rows/columns. | Neutral compact card, collapsed period switch if needed, core columns, visible total row or detail route, definitions in tooltip/drawer. |

Selection order:

1. Use `standard-audit-table` when the user must verify ranking, actual value, target, and completion rate in one card.
2. Use `compact-audit-table` when `W < 480px`, `H < 420px`, or the table is a preview inside a larger card.
3. If the task is pattern recognition rather than row audit, use bar, trend, scatter, or donut target/actual cards first.
4. If the row count or column count exceeds the compact card budget, keep this card as Top N and route the full set to a Detail Table page, drawer, fullscreen, or export.

## Why It Feels Designed

The card feels designed and not AI-generated because it solves an audit task before adding polish:

- It has a real reading order: card number/title -> local period switch -> legend -> ranked rows -> total row -> field definitions.
- It uses one strong semantic color for actual values, while comparison and target remain readable but quieter.
- Numeric cells use tabular, right-aligned values, so row-to-row comparison works without visual guessing.
- The total row proves reconciliation. It is a data trust device, not decoration.
- The footer explains field meaning in business language, preventing vague labels such as "value 1 / value 2".
- The local switch is scoped to this component, so it feels like a useful control rather than a decorative pill.
- Borders, fills, and blue accents are restrained; the table grid and values, not gradients or glow, carry the design.

## Business Purpose

The card must answer one complete question:

```text
Which objects rank highest or lowest, and how do their actual values reconcile against comparison period, target, and completion rate?
```

Valid business uses:

- Region, store, product, salesperson, customer, campaign, team, or project target attainment ranking.
- Sales, GMV, order amount, budget execution, capacity, SLA, inventory, profit, cost, or production detail by object.
- A chart/card suite where a previous target/actual chart needs exact ranked evidence.

Invalid uses:

- No row grain or primary object exists. Use KPI or chart.
- The task is only trend, composition, or relationship discovery. Use the matching chart card.
- The table is a source dump with many unrelated columns.
- The total row cannot reconcile with visible rows, filtered rows, or an explicit API total.

## Required Data Contract

Implementation-ready cards require:

```ts
type TargetActualTablePattern =
  | 'standard-audit-table'
  | 'compact-audit-table';

type TargetActualDetailTableContract = {
  targetActualTablePattern: TargetActualTablePattern;
  tableSubtype: 'target-actual-detail';
  metricId: string;
  metricName: string;
  periodField: string;
  localPeriodOptions?: Array<'realtime' | 'monthToDate' | 'yearToDate' | string>;
  rowIdField: string;
  rankField: string;
  objectNameField: string;
  comparisonValueField: string;
  actualValueField: string;
  targetValueField: string;
  completionRateField: string;
  gapField?: string;
  targetDirection: 'good-when-higher' | 'good-when-lower' | 'bounded-range';
  rowGrain: string;
  defaultSort: { field: string; direction: 'asc' | 'desc'; reason: string };
  totalRowPolicy: 'sum-visible' | 'sum-filtered' | 'api-total';
  sourceDataset: string;
  numericFormatContractIds: string[];
  columnPriority: Array<'rank' | 'object' | 'comparison' | 'actual' | 'target' | 'completion' | 'gap'>;
  tooltipPayload: string[];
  footerDefinitionItems: Array<'comparison' | 'actual' | 'target' | 'completion' | 'gap'>;
  interactions: Array<'row-detail' | 'sort' | 'export' | 'fullscreen' | 'none'>;
  stateRules: string[];
};
```

Data rules:

- `rowIdField` and `objectNameField` must identify each row. Do not rely on rank alone as identity.
- `comparisonValueField`, `actualValueField`, `targetValueField`, and `completionRateField` must share period scope, row grain, filters, and numeric unit, or declare a conversion rule.
- Completion rate must be recomputed from raw numerator/denominator or returned by an agreed API formula. Do not average row completion rates for the total row unless the metric definition says so.
- `totalRowPolicy` must state whether totals cover visible Top N rows, all filtered rows, or API-returned totals. The footer/export must use the same policy.
- The local period switch must update row values, total row, sort, and export scope together.
- Tooltip or row detail must include full value, unit, source, freshness, active filters, target formula, and comparison period definition.

## Shared Anatomy

All patterns use these zones:

| Zone | Rule |
| --- | --- |
| Title and sequence | Title-left; optional numeric prefix such as `05` is allowed when cards are reviewed as a sequence. |
| Local period switch | Title-right segmented control for `2-4` short options. It affects only this table or a declared local table group. |
| Encoding legend | Explains comparison, actual, and target. It is visual encoding, not an interactive filter. |
| Table header | Short labels, weak blue or neutral fill, stable height, alignment matching cell type. |
| Ranked body | `6-10` rows by default, row number center, object left, numeric and percent right. |
| Actual emphasis | Actual values use the primary blue weight/color; comparison and target use neutral values unless status semantics require color. |
| Total row | Bottom summary row with `合计`, tinted background, and recomputed totals. |
| Footer definitions | `2-4` concise definition rows for comparison, actual, target, completion, or gap. |
| Disclosure/action | Tooltip, row detail, export, fullscreen, or detail route for full evidence. |

Decision structure:

```text
title/period -> legend -> ranked row evidence -> total reconciliation -> field definitions
```

## Pattern: `standard-audit-table`

Use for enterprise cards where exact values and reconciliation are more important than chart drama.

Layout:

- Card uses a neutral white background, subtle border, small radius, and restrained shadow.
- Title and period switch share the top band.
- Legend sits below the title band and above the table; it should not steal a row from the body unless the card is very small.
- Header row uses a weak tint; body rows stay mostly white.
- Actual column gets primary color emphasis because it is the decision column.
- Total row is visually separate but not a nested card.
- Footer definitions sit below the table as compact icon/dot + label text rows.

Strength:

- Strong auditability and low cognitive load.
- Works well beside KPI cards and chart cards because it provides exact row evidence.
- Feels mature because every visual choice corresponds to a data function.

Rules:

- Keep visible columns to `5-7`: rank, object, comparison, actual, target, completion, optional gap.
- Default sort is usually actual desc, completion asc for risk, or gap desc depending on the business question.
- Completion rate can use semantic color only when threshold rules exist. Otherwise keep it neutral or primary-light.
- Footer definitions should be short. Long metric口径 moves to tooltip, drawer, or export metadata.
- If the total row represents all filtered rows while only Top N body rows are visible, label the policy in tooltip or footer.

## Pattern: `compact-audit-table`

Use when the card is narrow, embedded, or mobile-first.

Layout:

- Keep title and selected period visible.
- Collapse `实时 / 月累 / 年累` to a dropdown if the segmented control would crowd the title.
- Show core columns: rank, object, actual, target or completion. Move comparison/gap to tooltip or drawer when needed.
- Keep either the total row or a detail route visible. Do not hide both.
- Footer definitions collapse to tooltip, popover, or one compact note when height is tight.

Strength:

- Preserves row evidence in small spaces without pretending to be a full data grid.
- Makes the responsive fallback explicit instead of squeezing all columns.

Rules:

- `4-6` visible rows are enough for compact preview.
- Use horizontal scroll only when exact values are still readable; otherwise hide low-priority columns by priority.
- If visible body rows fall below `3`, switch to a KPI/list preview and route to full detail table.

## Size And Layout Budget

Recommended component size:

| Tier | Width | Height | Use |
| --- | ---: | ---: | --- |
| Compact | `320-480px` | `320-440px` | Embedded/mobile preview, `4-6` rows, reduced columns. |
| Standard | `480-720px` | `440-560px` | Title, switch, legend, `6-10` rows, total row, footer definitions. |
| Wide | `720-1080px` | `420-620px` | More comfortable desktop card, `8-12` rows, optional search/export. |

Default vertical budget for standard cards:

```text
P = 16-20px
titleAreaH = 36-44px
legendH = 22-28px
tableHeaderH = 30-36px
rowH = 28-34px for dense card tables, or 36-40px for normal detail tables
visibleRows = 6-10
summaryRowH = 30-36px
footerDefinitionH = 44-72px
bodyH = tableHeaderH + rowH * visibleRows + summaryRowH
H = P * 2 + titleAreaH + legendH + bodyH + footerDefinitionH + gaps
```

Width budget for the screenshot-like six-column table:

| Column | Width | Alignment | Notes |
| --- | ---: | --- | --- |
| Rank | `40-56px` | center | Fixed. |
| Object | `96-160px` | left | Flexible primary column. |
| Comparison | `96-132px` | right | Neutral value. |
| Actual | `96-132px` | right | Primary emphasis. |
| Target | `96-132px` | right | Neutral or primary-light. |
| Completion | `72-96px` | right | Percent, threshold color only when defined. |

Fit rules:

- If `totalColumnW > tableW`, hide optional gap/comparison first, then use horizontal scroll with frozen object column.
- Numeric values should use tabular numerals and thousands separators.
- Header labels should not wrap. Use short labels plus tooltip for complete definitions.
- Keep `tableBodyAreaH >= CH * 0.55`; otherwise collapse footer definitions, reduce visible rows, or route to detail/fullscreen.

## Visual Rules

- Use one primary blue family for actual values, active switch, and legend actual dot.
- Use muted gray or blue-tint for comparison; use dashed/line mark only for target legend when chart semantics are shared with the page.
- Header background should be weak enough that body values remain dominant.
- Row dividers are subtle. Avoid heavy gridlines, zebra overload, or saturated row fills.
- Total row uses a weak tint and weight `600`; do not style it as a separate card.
- Card radius should remain modest, usually `6-8px`, unless the project system requires otherwise.
- The table should look like a compact audit surface, not a decorative dashboard tile.

## Interactions And States

Required states:

- Loading: preserve title, switch, legend, header skeleton, body skeleton, total-row skeleton, and footer placeholder.
- Empty: keep header visible and state which period/filter has no ranked rows.
- Filter-empty: explain current filters and offer reset when supported.
- Missing comparison: hide or dash comparison values and update footer definition.
- Missing target: hide target column or show `--`; completion rate becomes `--` with tooltip.
- Denominator zero: completion rate shows `--` and explains denominator in tooltip.
- No permission: preserve card shell but hide restricted values and export/detail actions.
- Stale data: show source/freshness in tooltip or footer.
- Too many rows: Top N plus detail route, pagination, internal scroll, or fullscreen.
- Too many columns: column priority, horizontal scroll, column settings, or drawer.

Allowed interactions:

- Period switch updates only this card or declared local group.
- Header sort is allowed only for rank, actual, target, completion, or gap.
- Row click opens detail only when stable row payload exists.
- Export/fullscreen uses the same active filters, local period, sort, and total policy as the visible card.

## Anti-AI Gate

This card fails when:

- It has table visuals but no row grain, primary key, default sort, or column metadata.
- Values are hard-coded, overly smooth, all-good, or fail to reconcile with the total row.
- The actual, target, comparison, and completion fields do not share filter and period scope.
- The local period switch changes only selected styling while data, total row, and export stay unchanged.
- The legend colors do not match actual table emphasis.
- The footer explains generic UI concepts instead of business fields.
- Numeric columns are center-aligned, inconsistent in precision, or lack units/format contracts.
- The card hides exact values with ellipsis and no tooltip/detail/export path.
- Decorative gradients, glass, glow, or oversized corners are visually louder than the row evidence.

Countermeasure:

```text
period-scoped row grain -> ranked rows -> aligned numeric columns -> highlighted actual -> reconciled total -> field definitions
```

## Acceptance Checklist

Before marking ready:

- `componentType` is `table`, `visualType` is `table`, `tableSubtype` is `target-actual-detail`, and `targetActualTablePattern` is one of the controlled values.
- The table answers a named target-vs-actual row-evidence question.
- Row id, rank, object, comparison, actual, target, completion, default sort, and total policy are defined.
- Numeric display contracts exist for comparison, actual, target, completion, and any gap value.
- Visible columns follow width, alignment, and priority rules; hidden columns have tooltip/detail/export access.
- The total row reconciles with the declared visible, filtered, or API total scope.
- The local period switch, legend, table values, total row, footer definitions, detail, and export share the same active context.
- Loading, empty, filter-empty, missing comparison, missing target, denominator-zero, no-permission, stale, too-many-rows, and too-many-columns states are defined.
- The table passes `12f4-placement-detail-table.md` and `report-table-design-spec` fit rules for body height, visible rows, header, summary row, and overflow.
