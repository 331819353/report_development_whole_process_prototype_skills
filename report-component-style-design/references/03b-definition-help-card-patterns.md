# Definition Help Card Pattern Library

Use this reference after `03-text-summary.md` when a report card answers `analysisPerspective: definitionHelp`, such as 指标说明卡, 指标注释卡, 指标定义卡, 指标口径卡, 帮助卡, "这个指标什么意思", or "怎么算".

These cards are Analysis & Insight components, not ordinary KPI cards. They may show a metric value, mini chart, formula, or example, but their primary job is trust and comprehension: make the metric definition, calculation rule, scope, denominator, condition, source, and example auditable.

## Why These Designs Feel Strong

- They follow a real product reading order: metric subject -> explanation task -> evidence model -> definition/formula/scope -> exact-value or source path.
- They use one card to answer one explanation question. The card does not try to become a mini dashboard.
- Shared anatomy creates consistency, while the body changes by data shape: icon/value for basic meaning, two panes for comparison, equation cells for formula, key-value rows for口径, line/donut/filter/example bodies when those are the explanation evidence.
- The surface is quiet and analytical: white card, thin border, small radius, restrained shadow, muted metadata, and compact controls. The data and wording carry the design.
- Icons and pale illustration circles are semantic wayfinding, not decoration. They identify definition, filter, formula, or example, but never replace the actual口径.
- The bottom answer strip or formula band makes trust visible. Users can find "指标含义 / 如何计算 / 统计周期 / 包含项 / 不包含项" without opening a separate document.
- The mock examples look operational: selected period, completed orders, refund exclusion, denominator, comparison baseline, and local filters are named.
- The design avoids AI flavor because it is governed by contracts and exceptions, not by generic blue gradients, glass, glow, abstract AI icons, or all-positive smooth charts.

## Controlled Pattern Field

Use `definitionHelpCardPattern` inside `analysisInsightContract` or component metadata when a definition/help card needs reusable layout selection.

```ts
type DefinitionHelpCardPattern =
  | 'basic-metric-definition-card'
  | 'comparison-caliber-card'
  | 'formula-breakdown-help-card'
  | 'scope-caliber-list-card'
  | 'trend-meaning-card'
  | 'share-denominator-help-card'
  | 'condition-filter-help-card'
  | 'calculation-example-card';
```

Recommended mapping:

```ts
componentType: 'card' | 'text-summary'
visualType: 'text-summary'
analysisPerspective: 'definitionHelp'
analysisInsightContract.subtype: 'definition-card'
analysisInsightContract.insightFamily: 'explanation'
analysisInsightContract.definitionHelpCardPattern: DefinitionHelpCardPattern
definitionHelpEvidenceBinding: DefinitionHelpEvidenceBinding
```

## Sample Generalization Coverage

| Sample role | Reusable abstraction | Pattern coverage | Status |
| --- | --- | --- | --- |
| 指标注释卡片 | Compact card grid with bottom Q/A strips and metric proof bodies | all eight patterns | `covered-by-composed-patterns` |
| 指标定义卡片 | Definition-first cards with meaning, formula, and example rows | `basic-metric-definition-card`, `comparison-caliber-card`, `formula-breakdown-help-card`, `calculation-example-card` | `covered-by-composed-patterns` |
| 指标口径卡片 | Scope-first cards with period/range/channel/include/exclude rows | `scope-caliber-list-card`, `condition-filter-help-card`, plus comparison/trend/share variants | `covered-by-composed-patterns` |
| 指标帮助卡片 | Help-first cards for productized metric education | all eight patterns, with stronger usage tips and source/freshness footer | `covered-by-composed-patterns` |

Do not keep raw image paths as the durable standard. The pattern field, slot budget, evidence binding, and acceptance checks below are the reusable knowledge.

## Pattern Selection

| Trigger | Choose | Primary body | Avoid when |
| --- | --- | --- | --- |
| The user only needs what the metric means and the core formula | `basic-metric-definition-card` | icon or value hero plus meaning/formula strip | The metric has important scope exceptions |
| A definition depends on this period vs prior/baseline | `comparison-caliber-card` | two comparable values, `VS`, optional mini trend | Definitions or periods differ |
| The metric is literally composed from factors | `formula-breakdown-help-card` | equation cells and result cell | Formula factors cannot reconcile |
| The main trust issue is statistical scope, include/exclude, channel, or period | `scope-caliber-list-card` | key-value口径 list | More than `6` rows are required |
| The meaning is best explained by recent movement | `trend-meaning-card` | headline metric plus small line/area trend | Trend series is missing or only decorative |
| The metric is a share/rate and denominator must be visible | `share-denominator-help-card` | donut/ring/percent strip plus numerator/denominator | Denominator is unknown |
| The explanation changes under selected local conditions | `condition-filter-help-card` | local filter chips plus filtered metric body | The control changes page/global scope or formula |
| Users need a concrete arithmetic example | `calculation-example-card` | operand cards -> operator rail -> result | Example rows are invented without source or formula |

## Anatomy

Required slots:

- Header: index/label, short title, optional pattern tag, optional help/info icon.
- Explanation task marker: visible or metadata-backed task such as 指标含义, 如何计算, 统计口径, 条件说明, or 计算示例.
- Subject: metric name, alias, or selected口径.
- Primary evidence body: one body only, chosen by `definitionHelpCardPattern`.
- Trust strip: formula, period, range, include/exclude, source, freshness, denominator, or example rule.
- Disclosure: tooltip, popover, drawer, source table link, data dictionary link, or exact-value route.

Optional slots:

- One component-local control group for definition view, period basis, comparison basis, or condition preview.
- Semantic icon or pale symbol, `40-72px`, only when it does not replace the explanation.
- Pattern tag such as 基础型, 对比型, 拆解型, 进阶型.

Forbidden slots:

- Decorative chart, icon, or illustration without definition/source/formula meaning.
- More than one primary evidence body in one card.
- Global page filters repeated as component-local controls.
- Long essay definitions inside the fixed card body without drawer/popover disclosure.
- Generic copy such as "帮助理解核心指标" without metric name, calculation, scope, or source.

## Placement And Fit

Use:

```text
W = card width
H = card height
P = clamp(16px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P
headerH = 32-40px
trustStripH = 52-76px
bodyH = CH - headerH - trustStripH - gaps
```

Default sizes:

| Size family | Minimum outer size | Standard size | Permanent content |
| --- | ---: | ---: | --- |
| `definition_help_basic` | `320x200` | `360-460x220-300` | header, subject, meaning, formula/source |
| `definition_help_comparison` | `420x240` | `460-560x260-340` | two values, baseline, formula/trust strip |
| `definition_help_formula` | `420x240` | `460-600x260-340` | equation cells, result, factor definitions |
| `definition_help_scope` | `420x260` | `460-620x300-380` | `4-6` key-value口径 rows, formula/source |
| `definition_help_trend` | `420x260` | `460-600x300-380` | headline metric, trend `4-8` points, formula/trust strip |
| `definition_help_share` | `420x260` | `460-600x300-380` | donut/ring or percent strip, numerator/denominator |
| `definition_help_filter` | `420x260` | `480-640x300-380` | local condition row, filtered metric, formula/trust strip |
| `definition_help_example` | `420x240` | `460-620x260-340` | `2-4` operands, operator rail, result, example note |

Slot rules:

- Header keeps title left and one help/control cluster right. Header controls must not exceed `45%` of `CW`; collapse to dropdown before shrinking the body.
- The body owns one visual explanation model. If a card shows formula cells, it should not also show a line chart.
- The trust strip sits at the bottom or as a low-emphasis body band. It is not a decoration; it carries formula, meaning, source, period, or example.
- The primary explanation text should be `1-2` visible lines. Longer definitions open popover/drawer.
- Scope lists show `4-6` visible rows. More rows move to drawer or grouped table.
- Example operand cards show `2-4` operands by default. More operands collapse into formula text plus drawer.

## Pattern Rules

### `basic-metric-definition-card`

- Use for a concise first explanation of one metric.
- Body may show a semantic icon, current example value, or both, but the explanation text and formula remain visible.
- The trust strip must include at least meaning plus calculation, or meaning plus source/freshness if formula is not applicable.

### `comparison-caliber-card`

- Use when a definition mentions 本期/上期, 同比/环比, target/baseline, or old/new口径.
- Both panes must share metric definition, unit, period grain, and filter scope unless the card explicitly explains a口径 difference.
- Include baseline label and comparison formula. The central `VS` separator is structural, not decoration.

### `formula-breakdown-help-card`

- Use when readers need to understand `root metric = factor A x factor B`, additive formulas, or numerator/denominator formulas.
- Every factor cell has label, value or example, unit, and source/field reference in tooltip.
- Reconciliation rule is required: exact close, rounded close, estimated example, or non-additive warning.

### `scope-caliber-list-card`

- Use for 统计周期, 统计范围, 包含项, 不包含项, 渠道, 权限范围, source, and freshness.
- Rows use stable label/value alignment. Values may wrap to two lines; longer values open tooltip/drawer.
- Include/exclude rows must be explicit when they affect metric trust, such as refunds, unpaid orders, cancellations, test data, or delayed records.

### `trend-meaning-card`

- Use when recent movement helps explain the metric's meaning or how to read it.
- Trend body uses real ordered rows, `4-8` permanent ticks/points max, and tooltip for exact values.
- Do not use trend to decorate a static definition. Missing series downgrades to `basic-metric-definition-card`.

### `share-denominator-help-card`

- Use for ratios, rates, shares, completion percentages, and occupation metrics.
- Numerator, denominator, formula, and denominator-zero behavior must be visible or in tooltip.
- Donut/ring/percent strip is evidence of denominator relation, not ornamental progress.

### `condition-filter-help-card`

- Use when the explanation depends on local conditions such as period, channel, order status, payment status, metric view, or denominator basis.
- Use `2-4` short capsule options or collapse to dropdown. The control affects only this card or declared local group.
- If the control changes formula, metric names, table schema, permission, export, or another component, classify it as `perspective-switch` or global filter, not a local filter.

### `calculation-example-card`

- Use when one concrete example prevents misunderstanding.
- Show operands, operators, result, and which rows are included/excluded.
- Example data may be illustrative, but it must be labeled as example and must follow the same formula, unit, and rounding rule as the real metric.

## Visual Rules

- Inherit project/report tokens for typography, spacing, radius, border, shadow, controls, and change-color semantics. Do not hardcode screenshot colors when the project has a metric-number convention.
- Default surface: white or weak neutral card, `1px` subtle border, `6-8px` radius unless project tokens require otherwise, restrained shadow.
- Accent color marks selected state, formula result, or semantic role. It should not fill the whole card.
- Use tabular numerals for example values, operands, current values, and comparison values.
- Formula bands use weak neutral background and compact monospace-like grouping only when it improves scanning.
- Icons are line icons or approved project icons. They stay secondary to text and data.
- Hover/focus uses in-bounds border/outline. Do not use hover translate/scale that shifts the grid.

## State And Overflow Rules

- Loading: skeleton header, body placeholder matching selected pattern, and trust-strip skeleton.
- Empty: name the missing definition, formula, scope, or source; do not show only `暂无说明`.
- Insufficient formula: show definition and mark calculation unavailable; do not invent formula.
- Missing source/freshness: keep readiness partial and show source gap.
- No permission: do not leak restricted source table, row count, or exact example values.
- Long formula or long口径: clamp visible text and open drawer/popover with the full dictionary entry.

## Anti-AI Gate

A definition/help card fails when any of these are true:

- It cannot name the metric, formula, scope, denominator, source, or freshness behind the explanation.
- The card looks polished because of gradients, glass, glow, huge icons, 3D art, or abstract AI visuals rather than a metric trust contract.
- A chart, donut, line, filter, or example is shown without matching fields and tooltip/detail payload.
- All cards share the same icon/value layout even though the tasks are definition, comparison, formula, scope, trend, share, filter, and example.
- Visible copy is generic, such as "该指标用于衡量业务表现", without object, period, included rows, formula, or denominator.
- The card hides formula/口径 to make the surface cleaner.

Countermeasure:

```text
one metric -> one explanation task -> one evidence body -> formula/scope/source -> one disclosure path
```

## Acceptance Checklist

- `analysisPerspective: definitionHelp`.
- `visualType: text-summary` and `analysisInsightContract.subtype: definition-card`, unless the project has an approved custom visual type.
- `definitionHelpCardPattern` is one of the controlled values above.
- `definitionHelpEvidenceBinding` declares task, metric id/name, formula/scope/source/freshness, numeric formats, tooltip payload, validation cases, and exact-value or dictionary route.
- Component-local controls, when present, follow `10-in-component-controls.md` and do not change page/global scope.
- The body has exactly one primary explanation model.
- Formula, denominator, period, include/exclude, source, and freshness are visible or discoverable.
- Long content has tooltip/popover/drawer disclosure.
- Empty, loading, no-permission, stale, missing-formula, and missing-source states preserve geometry.
