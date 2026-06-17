# Target/Actual Pivot Table Card Patterns

Use this reference when a target/actual KPI family needs a compact pivot table card: row hierarchy, dimension controls, metric selector, comparison/actual/target measures, completion rate, subtotal/grand-total rows, and field-definition footer. It captures sales pivot cards such as `区域 * 产品` with `实时 / 月累 / 年累`, `维度：区域 / 产品 / 时间`, `指标：销售额（元）`, and target attainment values.

This is a pivot-table card composition pattern. Pair it with:

- `06-analytical-tables.md` for Pivot Table, grouped header, subtotal, and grand-total rules.
- `10-in-component-controls.md` for component-local period, dimension, metric, and display controls.
- `12f3-placement-pivot-table.md` for pivot area, row hierarchy, header, subtotal, and grand-total geometry.
- `12f2-placement-grouped-table-header.md` when amount/share or multi-level measure headers appear.
- `$report-table-design-spec` when the task is mainly table anatomy, pivot behavior, S2/project renderer, width, height, scroll, or acceptance.

## Pattern Identity

Do not create a new `visualType`. Use:

```text
componentType: table
visualType: pivot
tableSubtype: target-actual-pivot
targetActualPivotTablePattern: one of the values below
```

| `targetActualPivotTablePattern` | Use when | Visual structure |
| --- | --- | --- |
| `standard-hierarchy-pivot` | Users need a clean two-dimension sales/target pivot with subtotals and grand total. | Title, period switch, legend, dimension/metric controls, grouped rows, simple target/actual columns, subtotal and total rows. |
| `share-matrix-pivot` | Users must compare both amount and share under comparison, actual, and target groups. | Green or semantic accent, grouped column headers, amount/share subcolumns, subtotal rows, grand total, footer definitions. |
| `tree-expand-pivot` | Users need compact hierarchy with expand/collapse inside one row-dimension column. | Tree row dimension, expandable groups, leaf rows, target/actual columns, group subtotal rows, grand total. |

Selection order:

1. Use `standard-hierarchy-pivot` for ordinary enterprise audit and target attainment reading.
2. Use `share-matrix-pivot` when structure share or contribution share is part of the decision, not a decorative extra.
3. Use `tree-expand-pivot` when the same table needs compact scanning, collapsible hierarchy, or many row groups.
4. If the user only needs one flat Top N list, use `06a-target-actual-detail-tables.md`.
5. If row/column dimensions, subtotal rules, or aggregation formulas are missing, do not finalize a pivot table.

## Why It Feels Designed

These cards feel designed and not AI-generated because the visual surface exposes a real analytical model:

- The top area separates three jobs: period switch, legend, and dimension/metric controls. They do not pretend to be the same thing.
- Row hierarchy is explicit. Region rows, product child rows, subtotals, and grand totals are visually distinct.
- Grouped headers show how measures belong together, especially in the amount/share variant.
- Numeric columns are right-aligned with tabular numerals, so scanning across rows and columns is easy.
- Actual values use a consistent semantic accent; totals and subtotal rows use light backgrounds rather than loud decoration.
- The footer explains comparison, actual, and target meanings, making the table self-auditing.
- The card is dense but controlled: small type, stable row height, modest radius, weak dividers, and enough whitespace around control clusters.
- The green variant works because green is a coherent semantic accent for the whole table family, not random one-off color.

## Business Purpose

The card must answer one complete question:

```text
Across selected dimensions, how do actual values compare with previous period and target, and which subtotal or leaf objects explain the total completion rate?
```

Valid business uses:

- Region by product, product by channel, store by category, department by period, or sales team by salesperson target attainment.
- Current actual value compared with comparison period and target across hierarchical dimensions.
- Amount plus share analysis, such as sales amount and contribution share by region/product.
- Compact executive cards that need exact values plus hierarchy but not a full analytical workspace.

Invalid uses:

- Raw records are the task. Use a Detail Table.
- Only a single KPI is needed. Use a KPI card.
- There is no row hierarchy, column grouping, subtotal, or grand total. Use `target-actual-detail`.
- Dimension controls change page schema or global aggregation but are implemented as harmless local filters.
- Completion rate is averaged from displayed percentages instead of recomputed from actual and target totals.

## Required Data Contract

Implementation-ready cards require:

```ts
type TargetActualPivotTablePattern =
  | 'standard-hierarchy-pivot'
  | 'share-matrix-pivot'
  | 'tree-expand-pivot';

type TargetActualPivotTableContract = {
  targetActualPivotTablePattern: TargetActualPivotTablePattern;
  tableSubtype: 'target-actual-pivot';
  metricId: string;
  metricName: string;
  unit: string;
  periodField: string;
  localPeriodOptions?: Array<'realtime' | 'monthToDate' | 'yearToDate' | string>;
  rowDimensions: string[];
  columnDimensions?: string[];
  activeDimensionControls: string[];
  metricSelector?: string[];
  rowIdField: string;
  parentRowIdField?: string;
  rowPathField: string;
  hierarchyDepth: number;
  comparisonValueField: string;
  actualValueField: string;
  targetValueField: string;
  completionRateField: string;
  comparisonShareField?: string;
  actualShareField?: string;
  targetShareField?: string;
  subtotalRules: string[];
  grandTotalRules: string[];
  aggregationFunctions: Record<string, 'sum' | 'count' | 'avg' | 'weighted-rate' | 'custom'>;
  rateFormulas: Record<string, { numerator: string; denominator: string; formula: string }>;
  defaultExpandState: 'all-expanded' | 'top-level-only' | 'all-collapsed';
  defaultSort: { field: string; direction: 'asc' | 'desc'; reason: string };
  sourceDataset: string;
  numericFormatContractIds: string[];
  columnTree: string[];
  tooltipPayload: string[];
  footerDefinitionItems: Array<'comparison' | 'actual' | 'target' | 'completion' | 'share'>;
  interactions: Array<'expand-collapse' | 'sort' | 'cell-drilldown' | 'export' | 'fullscreen' | 'none'>;
  stateRules: string[];
};
```

Data rules:

- `rowDimensions` must declare the hierarchy order, such as `region -> product`; UI chips cannot be the only source of dimension truth.
- `rowIdField`, `parentRowIdField`, and `rowPathField` are required when rows can expand/collapse or drill down.
- Subtotal and grand-total rows must recompute additive values and rate values from source numerators/denominators.
- Share fields must state denominator scope: parent subtotal, grand total, current filter result, or visible rows.
- The period switch must update leaf rows, subtotals, grand totals, completion rates, shares, tooltip, and export scope together.
- Dimension controls that change row/column dimensions or headers must be classified as `perspective-switch` or table-schema-changing component controls, not simple row filters.
- Tooltip must include row path, metric, actual, comparison, target, completion, share when visible, formula, source, freshness, active period, and active dimensions.

## Shared Anatomy

All patterns use these zones:

| Zone | Rule |
| --- | --- |
| Sequence and title | Optional sequence number plus icon/title left; title names the table purpose, not only the metric. |
| Period switch | Title-right segmented control for `实时 / 月累 / 年累` or equivalent. |
| Legend | Dots/line marks explain comparison, actual, and target semantics; it is not a filter. |
| Dimension controls | Small dropdown chips for row/column dimension choices; visible controls stay `2-4`. |
| Metric selector | Compact right-side selector such as `指标：销售额（元）`; it changes metric set or measure fields. |
| Pivot header | Row dimension header plus measure/group headers; grouped headers are data structure, not decoration. |
| Row hierarchy | Parent rows, child rows, subtotal rows, and optional expand/collapse controls. |
| Measure cells | Numeric values right-align; actual cells use the primary accent. |
| Grand total | Bottom row with recomputed totals and completion rate. |
| Footer definitions | `2-4` concise definition rows for comparison, actual, target, completion, or share. |
| Disclosure/action | Tooltip, cell drilldown, fullscreen, export, or detail route for exact evidence. |

Decision structure:

```text
period + dimensions + metric -> hierarchy -> leaf values -> subtotals -> grand total -> field definitions
```

## Pattern: `standard-hierarchy-pivot`

Use for the most repeatable target/actual pivot card.

Layout:

- Blue or project-primary accent, neutral card shell, modest radius, and subtle border.
- Period switch sits at top-right; legend sits below title and before dimension controls.
- Dimension controls form a short row: `维度：区域 / 产品 / 时间`.
- Metric selector sits on the same control row when width allows, right aligned.
- Row dimensions may use two columns (`区域`, `产品`) or one merged row header if the renderer supports it.
- Parent dimension rows have slightly stronger weight; subtotal rows use weak tint.
- Grand total row uses a clearer tint and weight `600`.

Strength:

- Best default when enterprise users need exact target attainment by dimension.
- Avoids both chart over-simplification and spreadsheet heaviness.

Rules:

- Default visible hierarchy depth is `2`.
- Use simple columns when only amount values are visible: comparison, actual, target, completion.
- Actual values use primary accent; target and comparison stay neutral unless status thresholds exist.
- Keep footer definitions short; full口径 goes to tooltip or fullscreen/detail.

## Pattern: `share-matrix-pivot`

Use when share/contribution is part of the answer.

Layout:

- Accent can switch to green or another semantic project color when the whole card family uses it consistently.
- Column groups are required: comparison, actual, target, and completion.
- Amount/share subcolumns sit under comparison, actual, and target groups.
- Completion may show only completion rate, or amount plus completion when the business contract requires it.
- Subtotal rows show both amount and share; grand total share is normally `100%`.

Strength:

- Makes structure analysis and target attainment visible in one scan.
- Feels advanced because the header encodes real measure relationships.

Rules:

- Use this only when share denominator and subtotal scope are defined.
- Header depth is normally `2`; depth `3` needs a larger card or fullscreen.
- Do not color every share column. Use the accent for key totals/actual values and subtle tints for groups.
- If width fails, hide share subcolumns behind display-mode switch such as `金额 / 占比 / 金额+占比`.

## Pattern: `tree-expand-pivot`

Use when row hierarchy must be compact and interactive.

Layout:

- The first column combines row dimensions such as `区域 / 产品`.
- Parent rows show expand/collapse icons and stronger text.
- Child rows are indented with stable `levelIndent`.
- Parent rows can show subtotal values in the same row.
- Leaf rows show product/customer/store values.
- Grand total remains fixed at the bottom of the visible table when feasible.

Strength:

- Best for compact dashboards where two separate row-dimension columns would consume too much width.
- Gives users control over density without changing the table's identity.

Rules:

- Expand/collapse icons must be real controls with keyboard and aria state where implementation supports it.
- Default state is usually `all-expanded` for small row counts and `top-level-only` for dense tables.
- Row click for drilldown must not conflict with expand/collapse.
- If hierarchy depth exceeds `2`, route to fullscreen or a larger analytical table.

## Size And Layout Budget

Recommended component size:

| Tier | Width | Height | Use |
| --- | ---: | ---: | --- |
| Compact | `420-640px` | `360-480px` | Tree preview, `4-7` visible rows, core measures only. |
| Standard | `640-960px` | `440-620px` | Full pivot card with controls, hierarchy, subtotal, total, and footer. |
| Wide | `960-1280px` | `480-720px` | Amount/share matrix, grouped headers, more row groups, optional fullscreen/export. |

Default vertical budget:

```text
P = 16-24px
titleAreaH = 36-44px
legendH = 22-28px
controlRowH = 30-36px
headerH = 36-44px for simple headers, 64-80px for grouped amount/share headers
rowH = 32-38px for dense pivot cards, 40px for standard analytical tables
visibleRows = 6-10
grandTotalH = 32-38px
footerDefinitionH = 44-72px
pivotAreaH = headerH + rowH * visibleRows + grandTotalH
H = P * 2 + titleAreaH + legendH + controlRowH + pivotAreaH + footerDefinitionH + gaps
```

Width budget:

| Area | Width | Notes |
| --- | ---: | --- |
| Row dimension, two-column | `160-260px` | Split as `区域` + `产品` or equivalent. |
| Row dimension, tree | `160-240px` | Includes indent and expand/collapse icon. |
| Amount column | `96-132px` | Comparison, actual, target amounts. |
| Share column | `72-96px` | Percent/share values. |
| Completion column | `72-96px` | Completion rate. |
| Dimension control chip | `64-112px` | Collapse to dropdown when long. |
| Metric selector | `120-180px` | Right aligned when width allows. |

Fit rules:

- Keep `pivotAreaH >= CH * 0.55`; otherwise collapse footer, secondary controls, share columns, or route to fullscreen.
- Header + rows + grand total must show at least `4` useful body rows.
- If grouped amount/share columns exceed width, switch display mode or enable horizontal scroll with frozen row dimension.
- Row labels may ellipsize only with tooltip; numeric values should not ellipsize in the default view.

## Visual Rules

- Use one semantic accent per card family: blue for primary sales/target evidence, green for share/structure emphasis, or project token color.
- Actual values are the primary accent by default.
- Parent rows, subtotal rows, and grand total rows use weight and weak background, not saturated fills.
- Column group headers may use a light tint, but body values stay visually dominant.
- Use weak vertical dividers when grouped headers need column tracing.
- Keep radius around `6-8px`; do not use heavy cards inside the table area.
- The table should feel like an operational pivot card, not a decorative spreadsheet screenshot.

## Interactions And States

Required states:

- Loading: preserve title, switch, legend, controls, grouped header skeleton, row skeletons, subtotal skeleton, total skeleton, and footer placeholder.
- Empty: keep header and controls visible, then state which dimension/period has no rows.
- Filter-empty: explain current filters and offer reset when supported.
- Missing comparison: hide comparison group or show `--`; update legend and footer.
- Missing target: hide target group or show `--`; completion rate becomes `--` with tooltip.
- Missing share denominator: hide share subcolumns or show `--` and explain denominator.
- Denominator zero: completion/share shows `--` and explains formula.
- No permission: keep card shell but hide restricted cells, tooltip values, drilldown, and export.
- Aggregation error: show formula/source issue in tooltip or state; do not silently calculate.
- Too many rows: expand/collapse, Top N per group, pagination, virtual scroll, fullscreen, or export.
- Too many columns: grouped collapse, metric display switch, horizontal scroll, column settings, or fullscreen.

Allowed interactions:

- Period switch updates this card or a declared local group.
- Dimension controls change row/column dimensions and may change table schema; this must be declared in `componentSchemaImpact`.
- Metric selector changes measure fields, unit, formatter, totals, and export.
- Expand/collapse changes visible hierarchy only, not aggregation totals.
- Cell drilldown opens row-path detail only when stable payload fields exist.
- Export/fullscreen uses the same active filters, period, dimensions, metric selector, expand state, and total policy as the visible card.

## Renderer Guidance

- Use AntV S2 or a project S2-equivalent for real pivot/cross-summary behavior, wide metric matrices, synchronized frozen headers, virtualization, and analytical drilldown.
- Element Plus/project table grouped columns are acceptable for small bounded cards with `<=50` rows, `<=12` visible leaf columns, simple two-level hierarchy, and no S2-class interactions.
- Do not fake row merges, grouped headers, expand/collapse, or total rows with absolutely positioned labels over a flat table.
- Grouped headers must be driven by a `columnTree` or renderer-equivalent schema.
- Row hierarchy must be driven by parent/child row metadata or row path, not indentation-only text.

## Anti-AI Gate

This card fails when:

- It says pivot table but lacks row dimensions, column/measure metadata, subtotal rules, or grand-total rules.
- Dimension chips are decorative and do not change row/column dimensions, schema, totals, or export.
- Parent, child, subtotal, and grand-total rows do not reconcile.
- Completion or share values are averaged incorrectly.
- Actual, comparison, target, share, and completion values use inconsistent filters, periods, or units.
- Grouped headers are visual overlays rather than renderer-owned column groups.
- Expand/collapse changes only icons but not visible row hierarchy.
- The table uses arbitrary colors, thick borders, or gradients that overpower hierarchy and numeric evidence.
- The footer explains generic UI labels instead of business fields and denominator scope.

Countermeasure:

```text
period + dimensions + metric -> row hierarchy -> measure groups -> subtotal formulas -> grand total formulas -> field definitions
```

## Acceptance Checklist

Before marking ready:

- `componentType` is `table`, `visualType` is `pivot`, `tableSubtype` is `target-actual-pivot`, and `targetActualPivotTablePattern` is one of the controlled values.
- The pivot answers a named target-vs-actual multidimensional business question.
- Row dimensions, active dimension controls, metric selector, row id/path, hierarchy depth, column tree, subtotal rules, grand-total rules, and aggregation formulas are defined.
- Numeric display contracts exist for comparison, actual, target, completion, share, and any visible gap values.
- Completion and share values recompute from declared numerator/denominator fields.
- Header, body, subtotal rows, grand total row, footer definitions, tooltip, fullscreen, and export share the same active filters, period, dimensions, and metric selector.
- The renderer owns grouped headers, row hierarchy, expand/collapse, scroll, fixed header/row dimension, tooltip, and state geometry.
- Loading, empty, filter-empty, missing comparison, missing target, missing share denominator, denominator-zero, no-permission, aggregation-error, too-many-rows, and too-many-columns states are defined.
- The table passes `12f3-placement-pivot-table.md`, `12f2-placement-grouped-table-header.md`, and `$report-table-design-spec` fit rules for pivot body height, visible rows, header depth, row/column density, and overflow.
