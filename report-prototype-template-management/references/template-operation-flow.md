# Template Operation Flow

Use this file when a report prototype is implemented with bundled template assets. It is the no-break handoff contract between report design, page layout, block layout templates, block supporting areas, and component content area templates.

## Canonical Terms

| Term | Owns | Required output |
| --- | --- | --- |
| 框架模板 | Page shell, runtime stack, navigation, global filters, toolbar, theme, and template project structure. | `frameworkTemplateId`, template reason, preserved shell slots, stack contract. |
| 页面布局配置 | Page-level `12 * N` grid, `layoutRows`, stable block ids, nav/page widget wiring, first-viewport and scroll behavior. | `pageLayoutConfig`, `layoutRows`, block id map, block span map, nav/page content plan. |
| 分块布局模板 | One parent block's size plus standard areas and component slots. Every selectable template resolves to an independent Vue entry file that may reuse a shared base renderer. `componentRegionPattern` is only an internal/compatibility descriptor derived from the selected template, not the selectable template itself. | `blockLayoutTemplateMap`, selected block layout Vue file, `componentSlotContracts`, supporting-area config, optional derived `componentRegionPattern`. |
| 组件内容区模板 | The implemented component internal content area only. Every reusable template must resolve to a standalone Vue file that can be copied or mounted; registered ids must map back to that file. | `componentContentAreaTemplateMap`, selected standalone Vue file and `componentContentAreaTemplateId`, slot props/data contract. |

## Nine-Step Implementation Sequence

1. Select 框架模板.
   - Decide the shell by display scenario, navigation depth, content volume, interaction density, and delivery environment.
   - Output `frameworkTemplateId`.
2. Design 页面布局配置.
   - Create `layoutRows`, stable block ids, widget ids, nav/page wiring, and the first-viewport reading path.
   - Output `pageLayoutConfig`.
3. Select the independent 分块布局模板 Vue file based on 页面布局配置.
   - For every block id, choose a size-compatible independent block layout Vue file, such as `Span04x03SingleSlotLayout.vue` or `Span06x03DoubleSlotLayout.vue`, and record its standard areas.
   - Use generic `SpanCCxRRLayout.vue` only as the size base when creating a new selectable block layout template.
   - Decide SingleSlot vs MultiSlot from requirement analysis, not template availability. Use SingleSlot for one dominant conclusion card/component. Use MultiSlot only for parallel evidence, comparison, conclusion-card-plus-driver, or tightly related component groups.
   - In MultiSlot templates, place the conclusion card or primary conclusion component in the first component position when the requirement uses componentized conclusions; use later slots for evidence, drivers, details, actions, or trust/source support. Text-only or narrative conclusions belong to `4 summaryArea` only when the same block has no conclusion card/component.
   - Output `blockLayoutTemplateMap`.
4. Configure `1-1 titleArea`.
   - Implement the block title and title style on the 分块布局模板.
   - Output `titleAreaConfig`.
5. Decide and configure `1-2 pillArea`.
   - If pill buttons are needed, configure pill labels, active state, and style on the 分块布局模板.
   - If not needed, record `pillAreaConfig: null`.
6. Decide and configure `2-1 auxMetricArea`.
   - If auxiliary information is needed, add suitable additional information and keep items evenly distributed.
   - If not needed, record `auxMetricAreaConfig: null`.
7. Decide and configure `2-2 unitArea`.
   - If a unit is needed, configure unit text/style on the 分块布局模板.
   - If not needed, record `unitAreaConfig: null`.
8. Fill `3 componentArea` slots from 组件内容区模板.
   - Select an existing standalone Vue component content area template first.
   - If no suitable template fits, self-develop a new standalone Vue component content area template. Use ECharts for standard chart needs.
   - The component content area may render only the optional removable title strip and the component body. Do not add local filters, extra controls, additional information, unit labels, summary, explanation, or description bands.
   - Output `componentContentAreaTemplateMap` and `echartsSelfDevelopedTemplateMap` when fallbacks are created.
9. Decide and configure `4 summaryArea`.
   - If the block has no conclusion card/component, `4 summaryArea` may carry a text-only/narrative conclusion, note, caveat, or explanation.
   - If the block has a conclusion card/component, `4 summaryArea` must be `null` or carry only non-conclusion content such as scope, source, caveat, definition, or action note.
   - If not needed, record `summaryAreaConfig: null`.

Do not skip from page layout directly to ad hoc chart/table markup. Do not treat `componentRegionPattern` as a replacement for selecting a block layout template Vue file. Do not fill component slots before the block supporting areas in steps 4-7 have been configured or explicitly marked not needed. If a slot needs custom work, create or register a component content area template first, then mount or copy it into the slot.

## Standard 分块布局模板 Areas

| Region | Slot id | Area | Alignment | Fill rule |
| --- | --- | --- | --- | --- |
| `1-1` | `titleArea` | 标题区 | Left aligned | Block/card title only. |
| `1-2` | `pillArea` | 胶囊按钮区 | Right aligned | Block-level pills, mode labels, or compact local mode buttons. |
| `2-1` | `auxMetricArea` | 附加信息区 | Left aligned | Supporting metrics, comparison values, or context labels. |
| `2-2` | `unitArea` | 单位区 | Right aligned | Unit label/value. |
| `3` | `componentArea` | 组件区 | Fill | Component slots only. Each slot receives one component content area template or a registered component content area component. |
| `4` | `summaryArea` | 说明区 | Left aligned | Optional text-only/narrative conclusion only when no conclusion card/component exists; otherwise `null` or non-conclusion scope/source/caveat/definition/action note. |

Required-area policy: only `1-1 titleArea` and `3 componentArea` are always required. `1-2 pillArea`, `2-1 auxMetricArea`, `2-2 unitArea`, and `4 summaryArea` are optional; omit them or record their configs as `null` when the user need/data story does not require them.

## Slot-Fill Rules

- `componentSlots` under `3 componentArea` may carry only the selected component content area's standalone Vue file, mapped component id, props, data binding, renderer contract, and interaction contract.
- Do not put `titleArea`, `pillArea`, `auxMetricArea`, `unitArea`, or `summaryArea` content inside a component slot.
- KPI 卡内部的组件内容区模板 only covers the KPI card internal component area. KPI additional information and explanation areas stay on the 分块布局模板.
- Component content area templates render as rounded rectangles without border lines.
- A component content area template may reserve a removable `20px` top title strip. The title text is horizontally centered with `3px` top padding.
- If the parent 分块布局模板 has only one `3 componentArea` slot, the component content area title strip must be hidden.
- Component content area templates do not own filters, pill switches, additional metrics, unit labels, summary text, explanation text, or description/help bands. Put those in the 分块布局模板 areas or in shell/page configuration.
- A self-developed ECharts fallback is not an exception to the template flow. It must become a standalone component content area template before the slot is considered filled.

## Required Implementation Evidence

- `frameworkTemplateId` and shell preservation proof.
- `pageLayoutConfig` with `layoutRows`, block ids, block spans, nav/page wiring, and first-viewport plan.
- `blockLayoutTemplateMap` with one entry per block id, including selected independent block layout Vue file, selected standard areas, component slot contracts, and supporting-area config. `componentRegionPattern` may be recorded only as a derived compatibility descriptor.
- `titleAreaConfig` for every block.
- `pillAreaConfig` for every block, or explicit `null` when pill buttons are not needed.
- `auxMetricAreaConfig` with evenly distributed additional information, or explicit `null` when auxiliary information is not needed.
- `unitAreaConfig` for every block, or explicit `null` when no unit is needed.
- `componentContentAreaTemplateMap` with one entry per `componentArea` slot, including selected standalone Vue template file/id, copied or mounted path, props, data source, and state coverage.
- Component content area title-strip decision for every slot: title text or hidden, removable flag, single-slot hide proof, rounded root, and no border line.
- `echartsSelfDevelopedTemplateMap` for every custom fallback, including renderer, chart option ownership, lifecycle proof, and registration/copy path.
- `summaryAreaConfig` for every block, or explicit `null` when no conclusion/note/explanation is needed.
- Validation evidence: `npm run validate:dashboard`, build result, and runtime/screenshot/geometry evidence when a URL exists.

## Readiness Gate

The prototype is not ready when any of these are true:

- `frameworkTemplateId`, `pageLayoutConfig`, `blockLayoutTemplateMap`, `titleAreaConfig`, or `componentContentAreaTemplateMap` is missing.
- Optional `pillAreaConfig`, `auxMetricAreaConfig`, `unitAreaConfig`, or `summaryAreaConfig` is neither configured nor explicitly marked `null`.
- A selectable block layout is encoded only as generic `SpanCCxRRLayout.vue` plus `componentRegionPattern`, without a named independent block layout Vue file.
- A component slot contains block title, pill, additional information, unit, summary, explanation, description/help content, or any local filter/control surface beyond the optional removable title strip.
- A custom ECharts chart is implemented directly inside a block without first becoming a standalone component content area template.
- A 分块布局模板 component slot is filled before steps 4-7 are configured or explicitly marked not needed.
- A nav template is selected without a substantial content plan for every retained nav page.
