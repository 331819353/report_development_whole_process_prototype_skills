# Template Step Operation Cards

Use these cards before executing or accepting the bundled-template operation flow. The goal is to make the model focus on one template task at a time instead of mixing framework choice, page grid, block template, support areas, component slots, and summaries.

## Step Focus Protocol

Before each step:

1. State the current step number and step name.
2. Read only the inputs needed by this step.
3. Output this step's operation result.
4. Run this step's stop check.
5. Do not perform later-step work unless the current step is complete or explicitly blocked.

If the needed input is missing, create a `TBD(GAP-*)` or blocker for this step instead of guessing across multiple steps.

Do not jump from `pageLayoutConfig` directly to chart/table markup. Component slots are not filled until steps 4-7 have configured or explicitly skipped the block support areas.

## Step 1. Select Framework Template

Focus: choose the runtime shell template.

Inputs:

- PRD report type, page count, navigation depth, display environment, theme, user role, and phase-one scope.
- Bundled template routing rules.

Operation:

- Choose exactly one `frameworkTemplateId`.
- Explain why it fits the report: single page, multi-nav workbench, or fixed cockpit.
- Configure shell-owned title, navigation, native filters, toolbar/export, logo/theme, permission entry, and stack preservation.
- Record rejected template candidates when the choice is not obvious.

Output:

- `frameworkTemplateId`
- `shellConfig`
- `outputArtifact: vueTemplatePrototype`
- `implementationMode: copyTemplateProject`

Stop check:

- One and only one framework template is selected.
- No custom shell, duplicate nav, duplicate title band, duplicate filter bar, or duplicate toolbar is introduced.
- Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios stack is preserved through template copy.

## Step 2. Design Page Layout Configuration

Focus: design page-level grid and page/nav wiring.

Inputs:

- PRD section 4A reading path.
- PRD section 4B management gate rows when applicable.
- PRD section 4C Markdown page previews.
- Framework template selected in step 1.

Operation:

- Create one `pageLayoutConfig` per retained page/nav.
- Define visible filters, toolbar actions, and navigation-page content.
- Create `layoutRows` for each page.
- Audit `12 * N`: every row is exactly 12 cells, no row exceeds 12 cells, and `N >= 8`.
- Map every visible block to a readable business purpose, row/column span, and source reading-path step.

Output:

- `pageLayoutConfig`
- `layoutRowsAudit`
- `blockMap`
- `filterSurfaceMap`
- `toolbarActionMap`

Stop check:

- Every retained nav page has a meaningful page preview and layout.
- Every `layoutRows` row has exactly 12 cells.
- Page row count is at least 8.
- Every block is rectangular and maps to one block id.
- Filters, toolbar actions, and important controls are visibly placed.

## Step 3. Select Block Layout Template

Focus: choose the independent block layout Vue file for each page block.

Inputs:

- `pageLayoutConfig` and block spans from step 2.
- PRD reading path and management gate traces.
- Available block layout template catalog.

Operation:

- For each block, select a size-compatible independent block layout template Vue file.
- Choose SingleSlot or MultiSlot based on the business relationship, not because a template happens to exist.
- Record source reading-path step and applicable management gate IDs.
- Record derived `componentRegionPattern` only as compatibility metadata, not as the selected template.

Output:

- `blockLayoutTemplateMap`
- SingleSlot/MultiSlot rationale
- selected block layout Vue file per block

Stop check:

- Every block has exactly one selected independent block layout template.
- No block is represented only by a generic `SpanCCxRRLayout.vue` size wrapper.
- The block template is selected before component slots are filled.

## Step 4. Configure Title Area

Focus: configure `1-1 titleArea` on the selected block layout template.

Inputs:

- Block business purpose.
- Selected block layout template.
- Design style baseline and block chrome pattern.

Operation:

- Set the block title.
- Set title style intent: hierarchy, density, alignment, and optional icon/status style if supported by template config.
- Keep title content in `titleArea`, not in component content slots.

Output:

- `titleAreaConfig` for every block.

Stop check:

- Every block has a readable title.
- Title does not duplicate shell title or component-internal title strips.
- Component slots contain no block title content.

## Step 5. Decide And Configure Pill Area

Focus: decide whether `1-2 pillArea` is needed and configure it when needed.

Inputs:

- Local metric switches, period/month-year switches, status modes, business modes, scenario switches, and compact block-level controls.
- Filter/control ownership matrix.

Operation:

- If pills are needed, configure pill id, label, option values, default active value, affected metric/component/API params, reset rule, and display position.
- If pills are not needed, record `pillAreaConfig: null` plus `notNeededReason`.
- Keep global filters in the template-native filter surface; keep block-local mode switches in `pillArea`.

Output:

- `pillAreaConfig` for every block.

Stop check:

- Every block has configured pills or an explicit `notNeededReason`.
- No meaningful business switch is omitted.
- Pills do not duplicate global filters or toolbar actions.

## Step 6. Configure Auxiliary Info Area

Focus: decide whether `2-1 auxMetricArea` is needed and configure supporting information.

Inputs:

- Supporting metrics, comparison values, scope labels, sample/coverage hints, and short trust/source signals.
- Metric list and block content intent.

Operation:

- Add suitable auxiliary information only when it helps interpret the block.
- Keep items evenly distributed.
- Keep units in `unitArea`, not in auxiliary info.
- If not needed, record `auxMetricAreaConfig: null`.

Output:

- `auxMetricAreaConfig` for every block.

Stop check:

- Auxiliary info is concise and evenly distributed.
- Auxiliary info does not become a second component slot, title, unit, or summary.
- Blocks without auxiliary info explicitly record `null`.

## Step 7. Configure Unit Area

Focus: decide whether `2-2 unitArea` is needed.

Inputs:

- Metric units, chart/table axis units, comparison units, and display precision rules.

Operation:

- Configure unit text and style when the block needs a visible unit.
- Use `unitAreaConfig: null` when units are already clear inside component labels, axes, table headers, tooltips, or not applicable.

Output:

- `unitAreaConfig` for every block.

Stop check:

- Unit display is not duplicated across block chrome and component internals.
- Blocks without a visible unit need record `null`.

## Step 8. Fill Component Area Slots

Focus: fill `3 componentArea` slots with component content area templates.

Inputs:

- Selected block layout template slots from step 3.
- Component content area template map.
- Copied template's `src/widgets/templates/component-content-areas/` catalog.
- Metric/data/API binding matrix.
- Conclusion rule map when the component is a conclusion card or analysis insight.

Operation:

- Select an existing component content area template first.
- Record `componentContentAreaTemplateId`, standalone Vue file, copy source/target, sample evidence, visual type, props/state contract, data binding, and fallback.
- If no suitable template exists, create/register a standalone component content area template, usually with ECharts for standard charts, before filling the slot.
- Keep title, pills, filters, controls, auxiliary info, units, summary, explanation, and descriptions out of the component slot.

Output:

- `componentContentAreaTemplateMap`
- `selfDevelopmentExceptionMap` entries only when a new component content area template is required.

Stop check:

- Every slot has a registered component content area template ID and standalone Vue file.
- No slot is filled by prose, visual type labels, placeholder text, or inline widget objects.
- Custom ECharts work is registered as a component content area template before the slot is considered filled.

## Step 9. Configure Summary Area

Focus: configure `4 summaryArea` only when it adds a valid conclusion, note, caveat, source, scope, definition, or action hint.

Inputs:

- Whether the block already has a conclusion card/component in `3 componentArea`.
- `conclusionRuleMap`
- Source/scope/caveat/definition/action-note needs.

Operation:

- If no conclusion card/component exists, `summaryArea` may show a data-driven narrative conclusion through `summaryAreaConfig.conclusionRuleId`.
- If a conclusion card/component already exists, `summaryArea` must be `null` or non-conclusion content only.
- Static business conclusions are not allowed as normal-state copy.
- If not needed, record `summaryAreaConfig: null`.

Output:

- `summaryAreaConfig` for every block.
- `conclusionRuleMap` consumption evidence for any data-driven summary.

Stop check:

- Every business conclusion references a frontend generation rule.
- Summary area does not duplicate conclusion components.
- Static text is limited to source, scope, caveat, definition, action note, or empty/permission/insufficient-data fallback.

## Final Chain Check

The implementation chain is complete only when these artifacts exist in order:

`frameworkTemplateId -> pageLayoutConfig -> blockLayoutTemplateMap -> titleAreaConfig -> pillAreaConfig -> auxMetricAreaConfig -> unitAreaConfig -> componentContentAreaTemplateMap -> summaryAreaConfig`

If any artifact is missing, do not mark the template implementation ready.
