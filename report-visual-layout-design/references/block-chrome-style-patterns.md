# Block Chrome Style Patterns

Use this reference when user-provided HTML, screenshots, or design samples define the title chrome and content-background style of report blocks.

This file owns the reusable block-level style contract. It does not replace report type selection, component mapping, chart/table rules, or template ownership. Source HTML/CSS is treated as temporary evidence unless the user explicitly requests HTML/static/exact restoration output.

## Source Abstraction

The sample `精选3款科技感标题设计` provides a reusable block-title/body-background family:

- Title height is fixed at `33px`.
- The title is embedded inside the component container, not rendered by the page shell.
- The body background and title chrome are the same visual family but not an exact copy: `容器背景与标题风格同源但不复刻`.
- Business content is filled after the block chrome is selected.
- The stable vocabulary is semantic enum values such as `prism-badge`, `deep-panel`, and `dual-arc`; raw class names such as `c15`, `t23`, or `Style 29` are source evidence only.

## Selection Workflow

1. Convert the provided sample, HTML, Markdown, image, or copied source into style evidence and requirement facts.
2. For each top-level parent block, identify the business role, content density, primary evidence type, interaction state, and template family.
3. Select `blockChromePattern` before filling the block body with widgets, charts, tables, lists, or text.
4. Reserve the chrome geometry: component-owned title stage, optional local control area, title/body gap, and measurable body viewport.
5. Fill the body with the selected component pattern and data content. If the body cannot meet chart/table/list fit rules, enlarge/split/collapse the content before weakening the chrome contract.
6. Validate that title text, decoration, body background, chart plot, table rows, and local controls do not overlap or clip.

## Contract Shape

Every styled parent block that uses this family must declare or inherit a contract like:

```ts
type BlockChromeStyleContract = {
  blockChromePattern:
    | 'template-default'
    | 'plain-enterprise'
    | 'prism-badge'
    | 'deep-panel'
    | 'dual-arc';
  selectionReason: string;
  businessRole: string;
  contentDensity: 'low' | 'medium' | 'high';
  titleStageHeightPx: 33 | 'template-inherited';
  titlePlacement: 'component-owned-stage';
  bodyBackgroundRelation: 'same-family-not-copy' | 'template-default';
  bodyViewportPolicy: 'content-first';
  decorationBudget: 'none' | 'low' | 'medium';
  longTitleStrategy: 'shorten' | 'tooltip' | 'subtitle' | 'drawer-detail';
  overflowStrategy: 'visible-fit' | 'internal-scroll' | 'tooltip' | 'drawer' | 'fullscreen' | 'split-block';
  fitChecks: string[];
};
```

For implementation-ready template work, expose the selected pattern through widget config, scoped component props, or an inspectable DOM attribute such as `data-block-chrome-pattern`. Do not leave the selected block style as a screenshot-only memory.

## Pattern Catalog

| `blockChromePattern` | Use when | Title chrome | Body background | Avoid |
| --- | --- | --- | --- | --- |
| `template-default` | The selected template already provides enough surface hierarchy, or the block is mostly chart/table/detail content. | Inherit component title/control style from template/component. | Inherit `.placeholder-cell-inner` and component body tokens. | Do not treat this as "no decision"; record that the template default was selected. |
| `plain-enterprise` | Dense reports, long text, tables, large charts, high evidence load, or first-viewport information flow where decoration would compete with reading. | 33px title stage may use typography, subtle divider, brand accent, or no shaped badge. | Very light neutral or brand-tinted surface, no repeated decorative geometry. | Do not make it a bordered-card wall; use typography and rhythm before frames. |
| `prism-badge` | High-priority operational/status/action blocks, efficiency diagnostics, fulfillment/order/supply-chain progress, or a block that needs sharper directional energy. | 33px clipped prism/badge mark plus brand-blue title, normally with a left/leading accent. | Diagonal/prism tint in the body, lower opacity than the title mark. | Dense tables, long titles, many repeated blocks, or small chart bodies where diagonal marks crowd axes. |
| `deep-panel` | Analytical diagnosis, inventory/quality/detail evidence, table-adjacent panels, and dense but calm management information. | 33px compact rectangular title panel with subtle inset line and a small corner/edge accent. | Quiet panel gradient and a small edge line, leaving the center body clean for data. | Blocks whose primary value is a large emotional/score visual; avoid making every module look like a heavy card. |
| `dual-arc` | Service experience, score/rating/quality feeling, satisfaction, relationship, radar/gauge, or softer assessment blocks. | 33px rounded asymmetric title chip with small point accents. | Soft horizontal tint plus corner/arc decoration placed away from data. | Dense axis charts, large tables, or pages already using many rounded decorative panels. |

## Geometry And Density Rules

- For the three sample-derived patterns, default `titleStageHeightPx = 33`. If a template baseline uses another title height, record `template-inherited` and the reason.
- Long titles do not expand the 33px title stage. Shorten the title, move detail to subtitle/tooltip/drawer, or split the block.
- The title stage belongs inside the business component/composite widget. The page shell or template layout must not add an extra block-title band.
- The body viewport is content-first: chart plot/table/list floors are reserved before decorative background details are placed.
- Decorative pseudo-elements stay behind or outside the active data-reading area, use `pointer-events: none`, and must not cover chart axes, legends, labels, table cells, local controls, or state messages.
- Body background should be a subordinate tint from the same family as the title chrome. Do not copy the title shape at full strength into the content area.
- Do not stack this chrome around nested mini-cards. A parent block may have one chrome family; internal sub-blocks use lighter labels, dividers, tabs, or local grouping.
- Use brand/product colors for the chrome family. Red/green/orange remains status color only when the business state requires it.

## Page-Level Consistency

- Pick the block style family before filling block content, but let business role and density decide the family.
- Use one dominant block chrome family per page section. A page may mix patterns by business role, but avoid showing all decorative families at equal weight in one viewport unless the style matrix is the actual deliverable.
- Prefer `plain-enterprise` or `deep-panel` for most analytical evidence blocks. Reserve `prism-badge` and `dual-arc` for blocks whose business role needs that signal.
- If an information-flow report reads better with typography and spacing alone, choose `template-default` or `plain-enterprise`; do not force a title badge onto every block.

## Acceptance Checklist

- Every styled parent block has `blockChromePattern`, `selectionReason`, title geometry, body background relation, and overflow/fallback policy.
- The block chrome is chosen before the body content is filled or an explicit inherited default is recorded.
- The visible title answers the business question of the block, not the chart type.
- Body content still passes its own component/chart/table/list fit rules after chrome geometry is reserved.
- Runtime or implementation-ready proof can inspect the selected pattern through config, DOM attributes/classes, or scoped component props.
- No long-lived skill or template rule depends on the original HTML path, raw CSS class names, or a screenshot to explain how to reproduce the style.
