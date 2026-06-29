# Template Layout PRD Contract

Use this reference for the PRD "页面布局配置" section. The goal is to make the PRD directly usable by report-template development.

Before selecting concrete block layout templates, use `report-type-implementation-patterns.md` to define the selected `RTP-*` report pattern and `PATH-*` reading path. For management-facing reports, also use `executive-satisfaction-design-gate.md` section 4B IDs. Section 5 layout choices must implement those paths and gates, not invent a new reading order.

Before writing technical layout tables, show the reader-facing page preview from PRD section 4C. Each navigation page needs a Markdown/mermaid preview that shows filters, toolbar actions, first-viewport blocks, business content inside each block, and interaction entry points. Raw IDs and full `layoutRows` belong after that preview, not before it.

## Layer Vocabulary

Use these terms exactly:

| Layer | Meaning | PRD must specify |
| --- | --- | --- |
| 框架模板 | Runtime shell template: navigation, title, filters, toolbar, theme, logo, stack. | One selected template family and why. |
| 页面布局配置 | Page-level 12-column grid and blocks. | Page ID, nav, `layoutRows`, block IDs, spans, order. |
| 分块布局模板 | Independent Vue entry with block size plus standard areas. | Selected block layout template file/type and slot rationale. |
| 组件内容区模板 | Standalone Vue component content mounted inside `3 componentArea`. | Component content template ID/file, visual type, data/metric binding. |

Do not use `componentRegionPattern` as the selected template. It is derived compatibility metadata.

## Layout Coordinate Notation

Use readable coordinates before raw block letters or slot IDs. The coordinate helps humans and weak models locate the exact implementation target.

| Coordinate | Meaning | Example |
| --- | --- | --- |
| `R-B` | Block coordinate. `R` is the page reading row/region number, and `B` is the block order inside that row, left-to-right then top-to-bottom. | `1-2` = first page region row, second block in that row. |
| `R-B-S` | Component slot coordinate. `S` is the slot order inside the selected block layout template's `3 componentArea`. | `1-2-1` = first slot inside block `1-2`. |
| `R-B:areaName` | Standard block area coordinate. Use this for title/pill/aux/unit/summary areas so they do not consume the component slot digit. | `1-2:titleArea`, `1-2:summaryArea`. |

Rules:

- `R` is the report reading row/region, not every raw `layoutRows` grid line. A `6*3` block that spans three raw grid rows still belongs to one reading row.
- `B` follows visible block order within the reading row. If row 1 has two `6*3` blocks, the left block is `1-1` and the right block is `1-2`.
- `S` follows the selected block layout template slot order. SingleSlot blocks have only `R-B-1`; DoubleSlot blocks use `R-B-1` and `R-B-2`.
- Do not use opaque letters such as `A/B/C` or `BLK-*` as the only locator. They may remain technical IDs, but every block and component slot also needs the readable coordinate.
- Coordinates must be stable across `blockMap`, `blockLayoutTemplateMap`, standard area configs, `componentContentAreaTemplateMap`, metric mounting rows, conclusion rules, and interaction sources.
- Do not confuse page coordinates with block-layout internal area codes. `1-2` can mean the second block in page row 1 when it appears as `blockCoordinate`; `1-2 pillArea` remains the internal block area code for the pill area. When targeting a standard block area, write both clearly, for example `blockCoordinate: 1-2`, `areaCode: 1-2 pillArea`, `areaCoordinate: 1-2:pillArea`.

## Framework Template Selection

Select one of the current bundled framework templates. In the report development flow, custom framework shells, custom page layouts, custom block layout surfaces, and custom title/filter/nav/toolbar/export surfaces are out of scope. Only interaction behavior and component content area templates may be self-developed, and both must stay inside the selected template contracts:

| Framework template ID | Use when | Avoid when |
| --- | --- | --- |
| `topbar-light-scroll-dashboard-template` | Single report/dashboard, horizontal top title/filter/action area, scrollable content, normal enterprise report. | There are multiple substantial nav pages needing persistent side navigation. |
| `left-nav-analytics-workbench-template` | Multi-page analytics workbench, stable left navigation, business-line pages, detail/analysis subpages. | The report is a single first-screen cockpit with no meaningful nav. |
| `frozen-title-sci-fi-cockpit-template` | Fixed 1920 * 1080 cockpit, frozen title band, dark/sci-fi visual framing, command-center display. | The requirement is dense operational workbench or scroll-heavy analysis. |

PRD table:

| Field | Required content |
| --- | --- |
| `frameworkTemplateId` | Exact template ID. |
| 选择原因 | Match to user role, display environment, page count, nav depth, density. |
| 壳层保留 | Title, filter, navigation, toolbar/export, logo/theme. |
| 壳层配置 | Values to configure, not custom UI instructions. |
| 不改造项 | Shell surfaces that must not be duplicated in widgets. |

## Existing Shell Configuration

Current templates already provide title, filter, navigation, and toolbar/export surfaces. The PRD should configure them:

| Shell area | PRD field | Examples |
| --- | --- | --- |
| 标题区 | `pageTitle`, `subtitle`, `periodLabel`, `ownerLabel` | `集团用户体验管理驾驶舱`, `月度体验健康监控`. |
| 筛选区 | `filters[]` | business line, period type, date range, region, channel, product. |
| 导航区 | `nav[]` | overview, risk analysis, closure tracking, business-line detail. |
| 工具栏 | `actions[]` | refresh, export, fullscreen, help. |
| 权限入口 | `permissionScope` | group-wide, business-line, region, admin. |

Rules:

- Do not add a second filter bar inside page blocks when shell `filters[]` can own it.
- Period/date/business-line controls are shell/page controls unless the PRD explicitly declares component ownership.
- Block-level pills can live in `1-2 pillArea`; component content slots cannot own shell filters.
- Do not self-develop or duplicate the title, filter, navigation, toolbar, export, permission, page layout, or block layout surfaces. Configure the selected template surfaces instead.

## Page Layout Configuration

For each page, provide:

| Field | Required content |
| --- | --- |
| `pageId` | Stable `PAGE-*` ID. |
| `navId` | Navigation entry or `none`. |
| `readerPreview` | Markdown/mermaid preview from section 4C with filters, toolbar actions, major blocks, block content, and interaction entries. |
| `layoutRows` | 12-character row strings or a precise block grid map. |
| `layoutRowsAudit` | For every row: row index, raw row string, column count exactly `12`, over-12 check, block letters used, and pass/fail. |
| `visibleRows` | First-screen rows `8`, total rows `N`, and proof that `N >= 8`. |
| `blockMap` | Block ID, row/column span, business purpose. |
| `layoutCoordinateMap` | Human-readable block and slot coordinates: `blockCoordinate` as `R-B`, `slotCoordinate` as `R-B-S`, and standard area coordinates as `R-B:areaName`. |
| `scrollPolicy` | Fixed first screen, vertical scroll, or nav split. |
| `responsivePolicy` | Usually fixed 1920 design frame unless otherwise requested. |

If writing `layoutRows`, every row must have exactly 12 characters. A row with 13 or more characters is invalid even if the visual intent looks reasonable. A page must include at least 8 rows; `12 * N` means `N >= 8`. Repeated letters define a rectangular block. Explain each letter in `blockMap`.

Example shape:

```text
layoutRows:
  AAAAAAAABBBB
  AAAAAAAABBBB
  CCCCDDDDEEEE
  CCCCDDDDEEEE
```

Acceptance rules:

- Every row string has exactly 12 visible grid cells. Do not use proportional prose such as `8+4` without also writing the 12-character row.
- Reject rows with more than 12 cells and reject pages with fewer than 8 rows.
- Every block letter forms one rectangle. Disconnected, L-shaped, staggered, or masonry blocks are invalid.
- Every non-empty block letter has exactly one `blockMap` row and one `blockLayoutTemplateMap` row.
- Every `blockMap` row records `colStart`, `colSpan`, `rowStart`, `rowSpan`, and selected block layout template size.
- Every visible block has exactly one `blockCoordinate` such as `1-2`, and every component slot has exactly one `slotCoordinate` such as `1-2-1`.
- `componentSlots` are filled only after the selected block layout template and standard areas are configured.

## Block Layout Template Map

In the PRD, name this table `blockLayoutTemplateMap`.

For every page block, create:

| Block ID | Block coordinate | `PATH-*` source | 4B gate IDs | 业务内容 | Span | Selected 分块布局模板 | Slot pattern | Single/Multi rationale | `componentRegionPattern` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Current selectable examples include:

| Template | Pattern | Use when |
| --- | --- | --- |
| `Span04x03SingleSlotLayout` | `AAAA` | One dominant KPI, chart, list, conclusion, or compact evidence card. |
| `Span04x03DoubleSlotLayout` | `AABB` | Two tightly related values/components in one 4*3 block. |
| `Span04x03CompactTripleSlotLayout` | `AABC` | One primary short content plus two narrow supporting items. Use cautiously. |
| `Span06x03SingleSlotLayout` | `AAAAAA` | One wider chart/table/list/conclusion component. |
| `Span06x03DoubleSlotLayout` | `AAABBB` | Main evidence plus comparison/driver/detail. |
| `Span06x03TripleSlotLayout` | `AABBCC` | Three same口径 indicators or tightly related evidence components. |
| `Span03x02Layout`, `Span04x02Layout`, `Span05x02Layout` | Single or compact split patterns | Small KPI/status/action cards. |
| `Span05x03Layout`, `Span07x03Layout`, `Span08x03Layout` | Single or split patterns | Wider analysis, trend, table, and mixed blocks when dedicated selectable entries are not available. |

Use SingleSlot when one conclusion or component should dominate. Use MultiSlot only when simultaneous evidence, comparison, driver, detail, or same口径 metric group is necessary.

## Standard Block Area Configuration

For every block, write the six areas:

| Area | Required? | PRD content |
| --- | --- | --- |
| `1-1 titleArea` | Required | Block title and title style intent. |
| `1-2 pillArea` | Optional | Up to 3 block-level mode/status pills, or `null`. |
| `2-1 auxMetricArea` | Optional | Supporting metrics/info excluding unit, or `null`. |
| `2-2 unitArea` | Optional | Unit text such as `单位：%`, `单位：件`, or `null`. |
| `3 componentArea` | Required | Slot list and selected component content area template for every slot. |
| `4 summaryArea` | Optional | Dynamic narrative conclusion with `conclusionRuleId` only when no conclusion component exists; otherwise source/scope/caveat/action note or `null`. |

Block area table:

| Block ID | Block coordinate | `titleAreaConfig` | `pillAreaConfig` | `auxMetricAreaConfig` | `unitAreaConfig` | `summaryAreaConfig` |
| --- | --- | --- | --- | --- | --- | --- |

`pillAreaConfig` is not a throwaway optional note. For every block, write either configured pills or `null` with `notNeededReason`. Configured pills need: pill id, label, default active value, affected metric/component/API params, state reset rule, template area code `1-2 pillArea`, area coordinate such as `1-2:pillArea`, and interaction response. Do not hide metric switches, period switches, or local mode choices as prose.

## Filter And Interaction Surface Map

For every page, add:

| Surface | Required PRD fields |
| --- | --- |
| `filterSurfaceMap` | Template filter id, label, control type, option source, default value, affected blocks/components, query params, permission scope, reset behavior, and empty/error state. |
| `toolbarActionMap` | Action id, visible label/icon, template toolbar slot, permission, payload, affected data/export/screenshot/fullscreen behavior. |
| `interactionBehaviorMap` | Trigger, owner (`templateFilter`, `pillArea`, `toolbarAction`, `componentOwnedEvent`, or `templateActionHook`), source page/block/slot/template id, target type, payload fields, context inheritance, state sync, and QA case. |

Shell/page filters must use the selected template's native filter surface. Block-level compact mode switches belong in `1-2 pillArea`. Drilldown, jump, drawer, modal, popup, and chart/table row-click behavior must be visible through component-owned events or template action hooks and declared in `interactionBehaviorMap`.

## Component Slot Map

For every `3 componentArea` slot:

| Slot ID | Slot coordinate | Block ID | Block coordinate | Slot role | Region key | Component content area template ID | Standalone Vue file | Sample/source evidence | Visual type | Metric IDs | Data object/API | Props/state contract | Fallback |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Component content area template examples from current assets. Use the registered ID exactly; the same file path exists under each copied framework template's `src/widgets/templates/component-content-areas/` directory:

| Registered ID | Template file | Visual type | Typical PRD use |
| --- | --- | --- | --- |
| `kpi-metric-widget-content-area` | KPI metric content widget template | `metric-card` | Generic KPI metric slot generated from KPI template slots. |
| `component-library:A` | `OperatingRevenueMetricContentAreaTemplate.vue` | `metric-card` | Revenue/primary KPI value. |
| `component-library:B` | `OperatingProfitMetricContentAreaTemplate.vue` | `metric-card` | Profit/target/value KPI. |
| `component-library:C` | `TargetAchievementContentAreaTemplate.vue` | `text-summary` | Data-driven goal achievement conclusion, bound to `conclusionRuleId`. |
| `component-library:D` | `RegionalRevenueRankingContentAreaTemplate.vue` | `ranking-list` | Ranking by region/business line. |
| `component-library:E` | `RevenueProfitTrendContentAreaTemplate.vue` | `line` | Time trend. |
| `component-library:F` | `ChannelRevenueStructureContentAreaTemplate.vue` | `pie` | Composition/share. |
| `component-library:G` | `CustomerValueScatterContentAreaTemplate.vue` | `scatter` | Quadrant or relationship analysis. |
| `component-library:H` | `CostProfitHeatmapContentAreaTemplate.vue` | `heatmap` | Matrix/risk heat. |
| `component-library:I` | `OperatingHealthRadarContentAreaTemplate.vue` | `radar` | Multi-dimensional health. |
| `component-library:J` | `ExceptionWarningContentAreaTemplate.vue` | `text-summary` | Data-driven warning/conclusion text, bound to `conclusionRuleId`. |
| `component-library:K` | `KeyActionListContentAreaTemplate.vue` | `operational-list` | Action/closure list. |
| `component-library:L` | `OpportunityFunnelContentAreaTemplate.vue` | `funnel` | Funnel/conversion. |
| `component-library:M` | `OperatingConclusionContentAreaTemplate.vue` | `text-summary` | Data-driven main conclusion, bound to `conclusionRuleId`. |
| `component-library:N` | `LaunchConversionWaterfallContentAreaTemplate.vue` | `bar` | Bar/waterfall-like conversion path. |

If none fits, mark `componentContentAreaTemplateId: TBD(GAP-COMPONENT-TEMPLATE-*)` or declare a `selfDevelopmentExceptionMap` entry with `type: componentContentAreaTemplate`, expected standalone Vue file, visual type, metrics, source page/block/slot, data object/API, props/state contract, registration/copy path, and reason. A slot is not filled by text copy, prose intent, visual type alone, or an inline widget object without a registered component content area template ID.

## Dynamic Conclusion Rule Binding

The PRD must separate conclusion placement from conclusion generation:

| Target | Placement rule | Required PRD binding |
| --- | --- | --- |
| `4 summaryArea` dynamic conclusion | Allowed only when the same block has no conclusion card/component. | `summaryAreaConfig.conclusionRuleId`, input metrics/API fields, trigger state, rule logic, output fields, fallback copy. |
| Conclusion card in `3 componentArea` | Use a selected or self-developed component content area template. | Slot `conclusionRuleId`, `analysisInsightContract` when applicable, component template ID/file, input metrics/API, state coverage. |
| Non-conclusion note | May live in `4 summaryArea` when it is source/scope/caveat/definition/action note. | Static note text, note type, visibility rule, and permission/export behavior. |

Rules:

- Do not hardcode the final business conclusion sentence in `summaryAreaConfig`, conclusion-card props, mock data, or component template defaults.
- Frontend must recompute conclusions after shell/page filters, business line, date, period, metric switch, ranking click, drilldown context, permission scope, or API refresh changes the input data.
- A conclusion target without a `RULE-*` row is not implementation-ready unless it is explicitly a static source/scope/caveat/definition/action note.
- Empty, null, denominator-zero, delayed-data, and permission-denied fallbacks must be declared separately from the normal conclusion sentence template.

## Self-Development Exception Map

The PRD may list self-developed items only in these two categories:

| Exception type | Allowed content | Required PRD evidence | Not allowed |
| --- | --- | --- | --- |
| `interactionBehavior` | Drilldown, jump, popup, drawer, modal, row click, chart-point click, or action-hook behavior. | Exact fields: `interactionId`, `interactionType`, `triggerOwner`, `sourcePageId`, `sourceBlockId`, `sourceSlotId`, `sourceComponentContentAreaTemplateId`, `payloadFields`, `target`, `targetType`, `contextInheritance`, `stateSync`, `apiId`, `permissionRule`, `closeBackBehavior`, `qaCase`, and `reason`. | New shell, duplicate navigation, duplicate filter bar, custom page layout, custom block layout, custom toolbar. |
| `componentContentAreaTemplate` | New standalone Vue component content area template, usually ECharts/table/list based, mounted only in `3 componentArea`. | Exact fields: `id`, `type`, `sourcePageId`, `sourceBlockId`, `sourceSlotId`, `componentContentAreaTemplateId`, template file, visual type, metrics, data object/API, props, states, registration/copy path, and reason no existing template fits. | Title/pill/aux/unit/summary areas, shell filters, block-level controls, explanations or summary bands inside the component slot. |

If the requested self-developed item is not in one of these categories, mark it `blocked` or `deferred-out-of-scope` instead of treating it as a report-development requirement.

## Layout Acceptance Gates

- Every page has a framework template and shell configuration.
- Every retained navigation page has a reader-facing Markdown/mermaid preview before the technical layout table.
- Every page block has an ID, purpose, span, and selected block layout template.
- Every page block has a readable `blockCoordinate`; every `3 componentArea` slot has a readable `slotCoordinate`; and standard block areas are addressed as `blockCoordinate + areaName`, for example `1-2:titleArea`.
- Every visible page block traces to a PRD section 4A `PATH-*` reading step, or is explicitly marked as support/source/export/permission-only.
- Management-facing blocks trace to section 4B `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, or `MEET-*` IDs when they implement first-viewport answers, severity, closure, trust/source, or review/export behavior.
- The first viewport implements the first one or two steps of the selected `RTP-*` report-type implementation path.
- Every block names all standard areas, using `null` for optional areas not configured.
- Every component slot has a registered component content area template ID, standalone Vue file, sample/source evidence, props/data/state contract, or an explicit custom fallback template registered through `selfDevelopmentExceptionMap`.
- `summaryArea` does not duplicate a conclusion already represented as a conclusion component.
- Every `summaryArea` conclusion, conclusion card, or analysis insight component references a `RULE-*` row and data/API inputs.
- Static conclusion sentences in template config, slot props, or mock payloads fail readiness unless they are only fallback text for empty/permission/insufficient-data states.
- Component content area templates do not include filters, controls, aux metrics, units, titles/pills, or summary explanations.
- Text-only slot filling fails readiness unless the selected component content area template is an analysis/insight template and the text is generated from a `RULE-*` row with data/API inputs and fallbacks.
- Metric IDs in slots appear in both the metric list and metric mounting matrix.
- The self-development exception map contains only interaction behavior and component content area template entries.
