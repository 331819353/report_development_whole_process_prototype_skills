# Low-Noise High-Density Component Baseline

Use this baseline when an external/general UI guideline is provided as inspiration, or when a report component needs to feel polished, usable, and easy to understand without becoming sparse or generic.

Do not copy an outside token set directly into project skills. Extract the underlying intent, then apply it through the existing source hierarchy:

1. Company/product UI baseline, such as Haier enterprise UI when applicable.
2. Approved report template tokens and layout contract.
3. Existing report/component/chart/table/filter family rules.
4. This low-noise high-density baseline.
5. Project-specific exception with reason, owner, and proof.

## Gap Diagnosis From Generic Specs

Generic "premium dashboard" specs are useful as a checklist, but they commonly miss report-prototype constraints. Use them to look for these gaps in our own rules:

- Token discipline may be implied but not stated as a failure condition.
- Color reduction is often stated as taste, while report specs need semantic color ownership and chart palette proof.
- KPI, chart, table, and filter defaults may exist separately, but the cross-component visual grammar may still drift.
- "More whitespace" may conflict with prototype pages that must fill a `12列*N行` grid with meaningful content.
- Hidden complexity can improve clarity, but hidden controls must still be discoverable, keyboard reachable, and scope-safe.

## Core Principle

The target is `低噪声 + 高信息密度`, not empty minimalism.

- Use neutral hierarchy, brand emphasis, and restrained status color to reduce noise.
- Keep the page and component content substantial; avoid large blank zones unless a component's geometry, reading path, or state genuinely requires breathing room.
- If a block looks empty, first enrich it with relevant evidence, context, source/freshness, comparison, drilldown, or action. Do not fill it with decoration.
- If a block looks crowded, reduce visible density through grouping, Top N, collapse, tooltip, drawer, fullscreen, pagination, or table fallback. Do not shrink fonts below readable floors.

## Token And Surface Discipline

- Components inherit semantic tokens. Do not create one-off local palettes, shadows, radii, margins, or control styles inside a component unless the inherited baseline lacks the needed role.
- Required token roles for implementation-ready component specs: `surface`, `surfaceMuted`, `surfaceRaised`, `border`, `divider`, `textPrimary`, `textSecondary`, `textMuted`, `brandPrimary`, `brandSoft`, `statusSuccess`, `statusWarning`, `statusDanger`, `statusInfo`, `focusRing`, `hoverFill`, and `chartSeries`.
- Use one brand/product accent family for primary emphasis. Additional hues require semantic roles such as status, risk, category identity, or business convention.
- No rainbow chart palette by default. Chart series colors come from ordered brand/neutral/category tokens with documented status/category exceptions.
- Status colors do not own visual hierarchy. Pair status color with sign, icon, label, threshold text, or tooltip.
- Shadows should be extremely light or absent on dense report surfaces. If elevation is used, it must not become the main separator between every block.
- Borders and dividers are low-contrast structure, not decoration. Avoid card-in-card surfaces unless the inner object is a repeated independent item or interaction surface.
- Radius stays bounded by the inherited UI baseline. Oversized rounded cards, blob-like pills, glass/glow, and decorative gradients are not accepted as "premium" proof.
- Spacing must come from the inherited spacing scale or a declared component algorithm. Arbitrary local `margin`/`padding` values are a readiness gap when they affect alignment or density.

## Component Defaults

### KPI Cards

- A single KPI card has one primary value anchor. Secondary values are comparison, target, freshness, or drilldown support; they must not compete as additional primary metrics.
- Multi-metric KPI displays must use a governed KPI overview/grid pattern with one shared topic and bounded metric cells.
- Optional sparkline or mini evidence is allowed only when it remains secondary, has a declared height budget, hides dense labels, and exposes exact values by tooltip/detail.
- Do not embed a full chart, table, or complex diagram inside a normal KPI card. Split the evidence into a chart/table block or use a governed composite card.

### Chart Cards

- A chart card answers one chart task: trend, ranking, composition, distribution, relationship, driver, map, or process. Mixed tasks need a composite pattern or split blocks.
- Title, unit, legend, local filter, toolbar, plot, footer/source, and state surface must have reserved bands before the chart option is accepted.
- Toolbar actions such as export, fullscreen, copy, or settings are quiet by default: title-right icon buttons, hover/focus reveal, or a compact menu. Frequently used primary actions may remain visible.
- Tooltip is not optional when labels are hidden. It must recover exact value, unit, period/dimension, active filter, and status/comparison where relevant.
- Permanent labels are key-only. Show latest/current, max/min, anomaly, target gap, Top N, selected item, first/last, or sampled ticks; move ordinary values to tooltip.

### Tables

- Tables optimize scanning, not centered decoration. Text left-aligns, numbers right-align, status aligns center or left with icon/text.
- Header and row density must be stable; row hover cannot change row height.
- Do not use colored table backgrounds as the main style. Use restrained header fill, thin dividers, row hover, status chips, and conditional formatting only for declared semantics.
- Inline operations are bounded: one primary action may stay visible; additional actions collapse into `更多` or a row detail surface.
- Wide or dense tables prefer horizontal scroll with frozen key columns, grouped headers, column settings, pagination, or detail drawer over unreadable column compression.

### Filters And Controls

- Filters should be weak in visual weight but strong in scope clarity.
- Default visible page/global filters should be the key decision filters only. Low-frequency, long-tail, or technical filters move to advanced popover/drawer.
- Component-local controls stay in the title/header right side or a reserved compact toolbar and affect only the current component or declared local group.
- Do not repeat page/global filters inside each component. A duplicated filter surface is a design defect unless its local scope is explicit.
- Selected state must be visible by more than color: shape, check, active fill, label, or active count.

### Status, Empty, Loading, Error

- Status uses icon/text/badge plus restrained semantic color. Avoid large colored panels unless the whole component is an alert or incident surface.
- Empty/loading/error/no-permission states preserve component geometry, state the affected scope, and keep copy concise.
- Component states should use one primary action at most. Secondary help/detail can be a link or compact menu.

### Tooltip And Help

- Short help tooltip copy is normally one or two lines. Long definitions, formulas, source lineage, and examples belong in a popover, drawer, or definition card.
- Tooltips must not cover the primary value, hovered mark, or action target when avoidable; they should flip or offset within the viewport.
- Help and definition icons are secondary. Do not place a visible help icon on every minor label if it creates toolbar clutter.

## Complexity Disclosure

- Hide complexity by default only when the recovery path is visible: `更多`, `高级筛选`, `查看明细`, fullscreen, drawer, column settings, or tooltip.
- Hiding is not deletion. Every hidden exact value, low-frequency filter, extra operation, full label, or dense detail needs a declared disclosure path.
- Hover-only reveal must have focus/click/tap alternatives.
- Interaction feedback must be stable: border, outline, subtle fill, or inset shadow. No hover translate/scale that shifts layout or gets clipped.

## Acceptance Failures

Use these findings when relevant:

| ID | Fails when | Repair |
| --- | --- | --- |
| `VIS-LOW-NOISE-TOKEN-MISSING` | Component/page claims polished UI but lacks inherited semantic token mapping. | Declare inherited tokens and component-specific roles. |
| `VIS-RAINBOW-CHART` | Chart uses arbitrary multi-hue colors without category/status rationale. | Use ordered brand/category/status palette with exceptions documented. |
| `VIS-EMPTY-MINIMALISM` | Large blank zones replace useful report evidence or context. | Add relevant data, source, comparison, detail/action, or reduce span. |
| `VIS-KPI-MULTI-PRIMARY` | A KPI card contains multiple competing primary values. | Convert to KPI overview pattern or split cards. |
| `VIS-FILTER-OVERWEIGHT` | Filters visually dominate the report or repeat inside components without scope. | Keep key filters visible, move others to advanced/local scoped surfaces. |
| `VIS-TABLE-OPERATION-CLUTTER` | Many row actions, tags, or colored backgrounds overwhelm table scanning. | Keep one primary action/status, collapse the rest, reduce color. |
| `VIS-HIDDEN-NO-DISCLOSURE` | Values, labels, filters, or actions are hidden without tooltip/detail/drawer/fullscreen path. | Add an explicit disclosure route. |

