# Template Recipes And Checklist

Use this file for common adjustments and final verification after changing a template project.

## Common Recipes

### Initialize Code Ledgers After Copy

1. Run `npm run ledger:init` in the configured template project before the first source edit.
2. Confirm the command created same-directory `__change_logs__/<code-file-name>.changes.md` sidecars for scoped source files.
3. Use `npm run ledger:code -- --file <source-file> --stage before` and `--stage after` for each edited file after this baseline bootstrap.
4. Run `npm run ledger:check` before handoff; missing sidecars block readiness.

### Create Template Build Packet

1. Read `template-asset-construction-contract.md` and `template-build-packet-contract.md` before PRD-driven or multi-step template implementation.
2. Create `templateAssetUnderstandingMap` from the selected template asset root before creating block area configs or binding registered component examples.
3. Create or update `docs/template-build-packet.md` in the configured template project, or maintain an equivalent workflow packet before source edits.
4. Fill the packet sections for framework/shell, pages, `layoutSectionMap`, `layoutRows`, `layoutCoordinateMap`, block map, standard block areas, component slots, data/API, filters/actions, interactions, dynamic conclusion rules, self-development exceptions, implementation file plan, and validation plan.
5. Mark each row `ready`, `draft`, `blocked`, or `deferred`.
6. Do not edit a target source file unless the packet section 11 row names that file and the page/block/slot/control/data/conclusion rows it consumes.

### Change Logo

- Single-page: update `assets.logoSrc`.
- Left-nav: update `assets.logoSrc`.
- Sci-fi: update `assets.logoSrc`, usually to the white logo.
- Light background uses original color logo. Dark background uses white logo.

### Change Page Title

- Single-page: update `screen.title`.
- Left-nav: update `nav[].label` and any page title config exposed by the template.
- Sci-fi: update cockpit title/page label in config and title asset use if present.

### Change Layout Blocks

0. Run `npm run ledger:code -- --file src/config/dashboard.config.ts --stage before` and read the sidecar ledger before editing.
1. Create or update `layoutSectionMap` before editing raw `layoutRows`. Split the page into readable exact `12*K` parts, for example section 1 `12*2` (`AAAAAAAAAAAA|AAAAAAAAAAAA`), section 2 `12*3` (`AAAAAABBBBBB|AAAAAABBBBBB|AAAAAABBBBBB`), and section 3 `12*3` (`AAAAAABBBBBB|AAAAAABBBBBB|AAAAAABBBBBB`).
2. Edit `layoutRows`.
3. Keep 12 columns per row and normally provide at least 8 visible row units for the first `1920x1080` content viewport.
   Record a row audit: each `layoutRows` string has exactly 12 cells, no row exceeds 12 cells, total row count is at least 8, every block letter is rectangular, every block id has one widget and one `blockAreaConfigMap` row, and every span records `colStart`, `colSpan`, `rowStart`, and `rowSpan`.
   Assign readable `blockCoordinate` values (`R-B`) by layout section/page region and block order. Local A/B previews may repeat across sections for readability, but final machine rows and block ids must globally disambiguate different blocks.
4. Keep repeated characters rectangular.
5. Read `template-layout-design-system.md` when changing `contentGap`, `rowHeight`, `cellPadding`, card padding/radius, component title/control handoff, or content range.
6. Calculate the actual block width/height with `report-visual-layout-design`.
7. Verify each span can hold its chart/table/KPI/composite content at the target viewport size.
8. Keep or add vertical scrolling when the report needs more rows than the first viewport can show.
9. Rename widget keys to match changed block ids.
10. Update the Template Build Packet from `template-build-packet-contract.md` and the configurable flow from `configurable-zero-to-one-flow.md`; do not duplicate the full field list here.
11. Append the config ledger entry with changed layout ranges and affected widget/filter contracts.
12. Run `npm run validate:dashboard`.

### Fill Block Template Slots

1. Confirm the independent 分块配置 Vue file for the block and its standard areas: `1-1 titleArea`, `1-2 pillArea`, `2-1 auxMetricArea`, `2-2 unitArea`, `3 componentArea`, and `4 summaryArea`.
   - Choose SingleSlot or MultiSlot from the requirement. Use SingleSlot for one dominant conclusion card/component; use MultiSlot only for parallel evidence, comparison, conclusion-card-plus-driver, or tightly related component groups. In MultiSlot blocks, place the conclusion card or primary conclusion component in the first component slot when componentized conclusions are needed.
2. Declare `slotCount`, `componentSlotPattern`, and `slotCoordinateList` before selecting registered component examples. Use slot patterns such as `A`, `AB`, `AAB`, and `AABBCC`; these describe slots inside `3 componentArea`, not page `layoutRows`.
3. Configure `1-1 titleArea`: title and title style.
4. Decide whether `1-2 pillArea` is needed. Configure it when needed; otherwise record it as not configured.
5. Decide whether `2-1 auxMetricArea` is needed. Configure it when needed and keep the items evenly distributed; otherwise record it as not configured.
6. Decide whether `2-2 unitArea` is needed. Configure it when needed; otherwise record it as not configured.
7. For every `3 componentArea` slot, assign/verify `slotCoordinate` (`R-B-S`), inspect `references/component-examples/config.ts`, then inspect `src/widgets/templates/component-examples/` and its README/catalog, then select an existing 组件示例 first.
8. If no suitable registered component example exists, create a standalone Vue component example, use ECharts for standard chart needs, register/copy it, and record it in `selfDevelopmentExceptionMap` with `type: componentExample`.
9. For every selected 组件示例, keep the root as a rounded rectangle without border lines. Configure the optional `20px` top title strip only for metric/content meaning in multi-slot blocks; hide it when the parent 分块配置 has one slot or when `showContentTitle: false`.
10. Do not put filters, controls, additional information, units, description/help text, summary, or explanation content inside 组件示例 slots. Those belong to 分块配置 supporting areas, shell/page config, or a non-slot widget with explicit ownership.
11. Configure `4 summaryArea`: if the block has no conclusion card/component, it may carry text-only/narrative conclusion, note, caveat, or explanation. If the block has a conclusion card/component, record `summaryAreaConfig: null` or use it only for non-conclusion content such as scope, source, caveat, definition, or action note.
12. Do not treat a slot as filled until it points to a registered component example ID plus standalone component example Vue file/component id, component slot size, visual-type size compatibility evidence, sample/source evidence, props/data/state contract, and data binding.
13. Do not fill a slot with text/prose/placeholder content, `visualType` only, an inline widget object, or a visual type that is not compatible with the slot size. If the component is text-summary/insight, it still needs a registered component example and a `conclusionRuleId` when the text is data-driven.

### Add A Data-Bound Widget

1. Read/create sidecar ledgers before editing each planned source file, usually `dashboard.config.ts`, `dashboard.dataset.json`, `src/widgets/types.ts`, `src/widgets/registry.ts`, and the new component file.
2. Create/register the widget.
3. Add static/mock rows in `src/data/dashboard.dataset.json`, configure `widget.data.id: 'apiData'` with `widget.data.api`, or register a custom API/provider resolver in `dataSources/registry.ts` for complex providers. Do not create TS fixture modules for mock rows.
4. Verify data completeness before binding filters: every affecting primary/global filter has option rows, matching business rows or API/resolver support, required fields, default and non-default states, and empty/no-permission coverage when relevant.
5. Configure `widget.data`.
6. Add `filterFields`, `requiredFilters`, API params, resolver params, or `requiredParams` for every affecting global/page filter. Use `ignoredFilters` plus `ignoredFilterReasons` only for filters the widget intentionally does not consume.
7. If mock/offline mode is used, ensure non-default filter values return different rows or values when the business state should change; add a custom resolver when plain rows cannot model the scenario.
8. For line, area, and category-axis charts, sort row tuples first and derive labels, values, tooltip payloads, and click payloads from the same sorted rows.
9. Render from the `data` prop inside the widget.
10. Append sidecar ledger entries for every changed source file with feature list, code ranges, affected data/filter/API contracts, and verification.
11. Update `docs/prototype-data-summary.md` with the dataset id, fields, metric/conclusion inputs, component binding row, filters, interaction payloads, backend API/model implications, gaps, and verification.

### Update Prototype Data Summary

1. Read `prototype-data-summary-contract.md` before final handoff, backend handoff, or any meaningful data/API/filter/widget/interaction change.
2. Create `docs/prototype-data-summary.md` when it does not exist.
3. Summarize actual project evidence from `src/data/dashboard.dataset.json`, `src/config/dashboard.config.ts`, `src/dataSources/registry.ts`, widget components, and action hooks.
4. Include dataset catalog, field dictionary, metric and generated-conclusion inputs, component data binding matrix, filter/parameter semantics, interaction payloads, backend API/model suggestions, `GAP-*` rows, and verification.
5. Keep full fixture rows out of the document; include representative shape and backend design implications.
6. Record the code-ledger sidecar path for every changed scoped source file that produced or changed the data contract.

### Add Or Change First-Level Perspective

1. Classify the control as `perspective-switch` when it changes business domain, report theme, management object, metric set, component set, table schema,口径, or domain wording.
2. Put the switch in `nav[]`, page route, tab/segment control, or explicit perspective state. Do not place it in `filters[]` unless the binding matrix proves it only narrows row scope.
3. Add `componentSchemaImpact` to the binding matrix and list whether metric names, component collection, table headers, dimensions, formulas/口径, or domain vocabulary change.
4. Add navigation metric lineage when the perspective navigation shows percentages, rankings, or status lights: `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, and `periodBehavior`.
5. Add mock/API/resolver data for default and non-default perspectives, including one personalized metric and one risk focus per domain. Dynamic navigation KPIs must come from `businessData`, aggregate data, API/provider fields, or resolver output, not `filterData.meta`.
6. Add a QA case that switches every non-default perspective and checks labels/schema as well as values.

### Add Component Interaction

1. Widget emits `dashboard-action`.
2. Configure `actions[eventName]` on the widget.
3. Implement popup, navigation, drilldown, and detail behavior inside the widget or hosting product module.
4. Use `actions/registry.ts` only for shell-level utilities or host-system event observation.
5. Keep global filters immutable from component actions unless the host product intentionally wires that behavior.

### Change Visual Style

- Read/create the target source file ledger before editing `src/styles.css` or a widget scoped style; append after editing with style range, affected component state, and screenshot/build verification.
- Shell-level changes go in `src/styles.css`.
- Widget-level changes go in the widget scoped style.
- Shared template layout style such as block gap, card radius, component title/control handoff, cell padding, and hover/focus feedback follows `template-layout-design-system.md`.
- Keep Haier blue/white as the primary style for ordinary report pages.
- For sci-fi, keep a dark cockpit theme with controlled semantic colors.

## Verification Checklist

- Template choice matches report scope and usage scenario.
- `templateAssetUnderstandingMap` exists and is based on the selected template asset root.
- Template Build Packet exists for PRD-driven or multi-step implementation, is current with implemented source files, and maps every edited target file to packet section 11.
- Nine-step template operation chain is complete: `frameworkTemplateId`, `templateAssetUnderstandingMap`, `pageLayoutConfig` with `layoutSectionMap`, `filterSurfaceMap`, `toolbarActionMap`, `interactionBehaviorMap`, `blockAreaConfigMap` with `slotCount`, `componentSlotPattern`, `slotCoordinateList`, block area configs created by `createBlockAreaConfig`, and asset availability, `titleAreaConfig`, `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, `componentExampleConfigMap` with component slot size and visual-type size compatibility evidence, `summaryAreaConfig`, and fallback map when custom registered component examples were created.
- Component slots under `3 componentArea` contain only registered 组件示例 content. Title, pills, filters, controls, additional information, units, descriptions, explanations, and summaries stay in 分块配置 supporting areas, shell/page config, or non-slot widgets.
- Component slots are not text-filled or placeholder-filled; every slot has a registered component example ID, standalone Vue file/component id, component slot size, visual-type size compatibility evidence, sample/source evidence, props/data/state contract, and data binding.
- Registered component examples are standalone Vue files, rounded rectangles without border lines. Their optional top title strip is `20px`, centered, `3px` top-padded, removable, and hidden for single-slot parent blocks.
- Stack contract is intact: `package.json` keeps Vue 3, TypeScript, Vite, Element Plus, ECharts, axios, and build/typecheck scripts; `src/main.ts` uses Vue 3 `createApp`, registers Element Plus with locale, imports Element Plus base and dark CSS variables, and preserves project Element token styles.
- Standard chart widgets use real ECharts runtime/options/series; ordinary controls and row tables use Element Plus/project control patterns; S2 is added only when pivot/cross/wide analytical table behavior is implemented.
- Logo variant matches background.
- `dashboard.config.ts` owns layout, filters, widgets, actions, and assets.
- Registered component examples expose only the optional removable title strip plus body content. Component-local filters, filter panels, and detail links are allowed only in non-slot business widgets with explicit ownership.
- Business data is not stored directly in config.
- Standard API endpoints are configured with `apiData` / `httpData`; custom resolvers are reserved for complex providers.
- Every widget has `visualType`.
- Widgets without data have `dataPolicy`.
- Data completeness is verified before filter binding: filter option rows, business/API rows, required fields, default/non-default states, and resolver/API branches exist or are documented as gaps.
- `docs/prototype-data-summary.md` exists, names actual project data files and data modes, and is current with `dashboard.config.ts`, `dashboard.dataset.json`, `dataSources/registry.ts`, widget data contracts, generated conclusion rules, filters, and interactions.
- The data summary includes backend API/model suggestions plus explicit `GAP-*` rows for missing source/model/API/permission/freshness facts.
- First-level perspective switches are not hidden in `filters[]`; domain/theme/management-object controls use nav/page/route/tab/segment/perspective state unless explicitly row-scope-only.
- Binding matrix includes `controlSemantics` and `componentSchemaImpact` for controls that affect widgets.
- Navigation percentages, rankings, and status lights have lineage and are not stored in `filterData.meta` unless explicitly static display copy.
- Filter scope and data field mapping are explicit.
- Affecting filters are bound through `filterFields`, `requiredFilters`, API params, or resolver params; `ignoredFilters` is used only for intentionally invariant widgets and each ignored filter has `ignoredFilterReasons`.
- Non-default primary filter states visibly change affected widget data in JSON/API/resolver mode, or the widget is clearly labeled static/invariant.
- Non-default perspective states update metric names, titles/summaries, table dimensions/headers, component set, specialty metrics, and口径 when specified by `componentSchemaImpact`; value-only changes are not enough.
- Block spans match the size and component-count constraints from `report-visual-layout-design`.
- Layout tokens match the selected template family or deviations are documented: content range, `contentGap`, `rowHeight`, `cellPadding`, card padding/radius, and component-owned title/control handoff.
- Outer block validation does not replace component-internal fit checks. Composite widgets must be reviewed with `report-component-style-design` for summary columns, nested KPI grids, text wrapping, min-height, and no critical nowrap/ellipsis clipping.
- Composite widget no-data masks are scoped by child data states: if all child sub-blocks are no-data, show one parent-block mask; if only some child sub-blocks are no-data, mask only those sub-blocks and include their title/control area plus component body.
- `1920 * 1080` is used as the prototype viewport check, not a total report height cap.
- Layout blocks do not clip titles, legends, charts, tables, empty states, or controls.
- `npm run validate:dashboard` runs after the minimal required dependencies are installed.
- Stack-contract failures from `npm run validate:dashboard` block handoff even if Vite build or screenshots appear fine.
- `npm run ledger:init` ran after project copy, `npm run ledger:check` passes before handoff, and every changed source file has a sidecar code ledger under `__change_logs__`. The ledger was read before editing, and a post-change version entry records feature/function list, changed code ranges, affected widget/data/filter/API contracts, verification, and rollback notes. A `change_logs` folder is not required and is not the expected path.
- If npm dependency installation is blocked by domestic network access, retry with a temporary command-level mirror such as `npm install --registry=https://registry.npmmirror.com` or `npm install <package-name> --registry=https://registry.npmmirror.com`; if unavailable, replace the registry URL with `https://npm.aliyun.com/`, `https://mirrors.cloud.tencent.com/npm/`, `https://mirrors.ustc.edu.cn/npm/`, or `https://mirrors.tuna.tsinghua.edu.cn/npm/`. Do not persist registry changes unless explicitly requested.
- `npm run build` runs before handoff when implementation code changed.
- A local dev/preview URL is started and verified when a runnable project is part of the task.
