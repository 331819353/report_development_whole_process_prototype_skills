# Template Redevelopment Playbook

Use this file when building a new business report from a copied template or heavily adjusting an existing copied template.

## Sequence

Before source edits, create or validate the Template Build Packet from `template-build-packet-contract.md`. Weak/literal models implement from packet rows only: framework/shell, pages, `layoutRows`, blocks, standard areas, component slots, data/API, filters/actions, interactions, conclusion rules, self-development exceptions, target files, and validation commands.

Nine-step handoff output: `frameworkTemplateId -> pageLayoutConfig -> filterSurfaceMap -> toolbarActionMap -> interactionBehaviorMap -> blockLayoutTemplateMap -> titleAreaConfig -> pillAreaConfig -> auxMetricAreaConfig -> unitAreaConfig -> componentContentAreaTemplateMap -> summaryAreaConfig`. `pageLayoutConfig` includes an exact-12-column, over-12 rejection, and minimum-8-row `layoutRows` audit. `blockLayoutTemplateMap` names the selected independent block layout Vue file for every block. If a slot uses custom ECharts work, add a `selfDevelopmentExceptionMap` entry with `type: componentContentAreaTemplate` and create/register the standalone Vue component content area template before filling the slot.

1. Select 框架模板:
   - Choose the shell first: topbar scroll dashboard, left-nav analytics workbench, frozen-title cockpit, an existing project shell, or an explicit custom exception.
   - Let display theme, content volume, navigation depth, interaction density, and delivery environment drive the choice.
   - Output `frameworkTemplateId`.
   - Update Template Build Packet sections 0, 1, and 2.
2. Design the `12 * N` 页面布局配置:
   - Single-page: one `page.layoutRows` and one `page.widgets`.
   - Left-nav / sci-fi: one `nav[]` item per page/chapter.
   - Use 12 characters per row.
   - Use repeated characters for rectangular merged blocks.
   - Keep block ids stable.
   - Record the row audit: every row has exactly 12 cells, every block is rectangular, every block id maps to one widget and one `blockLayoutTemplateMap` row, and every span records `colStart`, `colSpan`, `rowStart`, and `rowSpan`.
   - Use `template-layout-design-system.md` before changing shared template layout tokens such as `contentGap`, `rowHeight`, `cellPadding`, card padding/radius, component title/control handoff, content range, or hover/focus surfaces.
   - Keep the shared block anatomy: grid block -> card frame -> body viewport -> `widget-renderer`.
   - Before finalizing `layoutRows`, calculate each block's actual size with `$report-visual-layout-design`.
   - Check whether the block can safely hold its component count and component mix at the `1920 * 1080` viewport baseline.
   - Let `layoutRows` grow when the report needs more content; do not cap the report at one viewport.
   - Output `pageLayoutConfig` with block ids, spans, nav/page wiring, and first-viewport plan.
   - Update Template Build Packet sections 3 and 4.
3. Based on 页面布局配置, choose 分块布局模板 for each page block:
   - A 分块布局模板 includes the block size plus its standard areas and `componentSlotContracts`; `componentRegionPattern` is only a derived compatibility descriptor.
   - Choose an independent block layout Vue entry file such as `Span04x03SingleSlotLayout.vue` or `Span06x03DoubleSlotLayout.vue`; use generic `SpanCCxRRLayout.vue` only as the size base when creating a new selectable template.
   - Decide SingleSlot vs MultiSlot from the user's analytical need. Use SingleSlot for one dominant conclusion card/component; use MultiSlot only for parallel evidence, comparison, conclusion-card-plus-driver, or tightly related component groups.
   - In MultiSlot templates, place the conclusion card or primary conclusion component in the first component slot when componentized conclusions are needed. Use later slots for evidence, drivers, details, actions, or trust/source support.
   - Output `blockLayoutTemplateMap` with one entry per block id.
   - Update Template Build Packet section 5.
4. Configure the 分块布局模板 `1-1 titleArea`:
   - Set the title and title style on the parent block/widget config.
   - Output `titleAreaConfig`.
   - Update Template Build Packet section 6.
5. Decide and configure `1-2 pillArea`:
   - Configure pill buttons when needed.
   - If not needed, record `pillAreaConfig: null` plus `notNeededReason`.
   - Update Template Build Packet section 6.
6. Decide and configure `2-1 auxMetricArea`:
   - Configure additional information and distribute items evenly when needed.
   - If not needed, record `auxMetricAreaConfig: null`.
   - Keep additional information on the parent block/widget config.
   - Update Template Build Packet section 6.
7. Decide and configure `2-2 unitArea`:
   - Configure the unit when needed.
   - If not needed, record `unitAreaConfig: null`.
   - Update Template Build Packet section 6.
8. Based on 分块布局模板槽位配置, choose 组件内容区模板:
   - `componentSlots` under `3 componentArea` carries only the selected component's internal content area.
   - Inspect `references/component-content-area-template-map.md`, then inspect `src/widgets/templates/component-content-areas/` and its README/catalog before selecting.
   - Mount or copy the selected standalone component content area Vue file, or point to a registered `componentContentAreaTemplateId` that maps to that file. Record copy source/target, sample/source evidence, props/data/state contract, and data binding.
   - If no existing component content area template fits the slot and business intent, self-develop a new standalone Vue component content area template with ECharts for chart needs and register it before the slot is considered filled.
   - Do not attach filters, controls, additional information, unit slot, title pills, description/help text, or summary copy to a component slot. The component content area may have only the optional removable title strip plus body content.
   - Do not fill a slot with text/prose/placeholder copy, `visualType` alone, or an inline widget object.
   - Output `componentContentAreaTemplateMap` with registered ID, Vue file, copy source/target, sample evidence, props/data/state; output `selfDevelopmentExceptionMap` component content area entries for newly created fallback templates.
   - Update Template Build Packet sections 7 and 10.
9. Configure `4 summaryArea`:
   - If the block has no conclusion card/component, add a text-only/narrative conclusion, note, caveat, or explanation when needed.
   - If the block has a conclusion card/component, record `summaryAreaConfig: null` or use it only for non-conclusion content such as scope, source, caveat, definition, or action note.
   - Do not put conclusion-card content or duplicate conclusion text in `summaryArea` when a MultiSlot first component slot carries that card.
   - Do not put summary/explanation copy inside `componentSlots`.
   - Update Template Build Packet sections 6 and 9.
10. Define filters:
   - Use `options` for stable enum filters.
   - Use `source` for time, organization, product, customer, project, owner, source system, and data version.
   - Default templates keep only a global parameter entry; add business filters only when the requirement needs them.
   - Update Template Build Packet section 8.
11. Define widgets:
   - Every widget needs `type`, `visualType`, `title`, and either `data` or `dataPolicy`.
   - Data-bound widgets declare row/prop shape in `src/widgets/types.ts`.
12. Add data:
   - Put static/mock rows in `src/data/dashboard.dataset.json`.
   - Keep `filterData` for filter option rows and `businessData` for business rows.
   - Use built-in JSON resolvers (`filterData`, `businessData`, `staticData`) for offline data.
   - Use built-in standard API resolvers (`apiData`, `httpData`) for ordinary REST/BFF endpoints.
   - Register custom API/provider resolvers in `src/dataSources/registry.ts` only for signatures, special auth, complex pagination, SDKs, realtime streams, or multi-step requests.
   - Verify data completeness before filter binding: option rows, business rows/API response, required fields, default/non-default filter states, empty/no-permission states, and resolver/API branches.
   - Map filters with same-name fields or `filterFields`.
   - Use `requiredFilters` when a widget must respond to a filter.
   - Use `ignoredFilters` when a widget intentionally ignores a global filter.
   - For line, area, and category-axis charts, keep each category label and value in the same row tuple. Sort rows first, then derive `xAxis.data`, every `series.data`, tooltip payloads, and click payloads from that same ordered row list.
   - Update Template Build Packet sections 8 and 11.
13. Implement widgets:
   - Copy `WidgetTemplate.vue`.
   - Render only inside the body viewport.
   - Use `width: 100%; height: 100%; min-width: 0; min-height: 0;`.
   - Mount ECharts/S2 against the widget body, not the card frame.
   - If one parent block needs multiple components, implement one composite widget with internal sub-blocks, keep `5px` parent inset and `5px` sibling gap, and keep sub-block labels subordinate to the block title.
   - If the composite needs 2/4/6/8 visible sub-blocks/components, follow the count limits from `$report-visual-layout-design`.
14. Add interactions:
   - Emit `dashboard-action` from widgets.
   - Configure `actions` in widget config.
   - Keep popup, navigation, drilldown, and detail behavior inside the component unless the host product intentionally observes events through `actions/registry.ts`.
   - Update Template Build Packet sections 8, 10, and 11.
15. Validate:
   - Run `npm run validate:dashboard`.
   - Run `npm run build`.
   - Preview and check clipping, filter effects, modal stale state, export/fullscreen/refresh.
   - Update Template Build Packet section 12 with validation results or blockers.

## Minimal Widget Config

```ts
widgets: {
  A: {
    type: 'RevenueTrend',
    visualType: 'line',
    title: 'Revenue Trend',
    filterScope: 'revenue',
    data: {
      id: 'staticData',
      params: { key: 'revenueTrend' },
      filterFields: {
        org: 'orgId',
        cycle: ['period', 'cycle'],
      },
      requiredFilters: ['org', 'cycle'],
    },
    props: {
      categoryField: 'period',
      valueField: 'revenue',
      sortField: 'period',
      sortDirection: 'asc',
      unit: 'CNY',
    },
    actions: {
      pointClick: {
        type: 'pointClick',
        params: {
          org: '$filters.org',
          period: '$event.period',
        },
      },
    },
  },
}
```

## Minimal JSON Data And Dynamic Filter

```json
{
  "filterData": {
    "orgs": [
      { "id": "china", "name": "中国区" }
    ]
  },
  "businessData": {
    "revenueTrend": [
      { "orgId": "china", "cycle": "month", "period": "2026-01", "revenue": 128.6 }
    ]
  }
}
```

```ts
filters: [
  {
    id: 'org',
    label: 'Organization',
    scope: 'revenue',
    source: {
      id: 'orgOptions',
      labelField: 'name',
      valueField: 'id',
    },
  },
]
```

Register `orgOptions` in `src/dataSources/registry.ts`.

## Minimal API Data Source

```ts
widgets: {
  A: {
    type: 'RevenueTable',
    visualType: 'table',
    title: '收入明细',
    data: {
      id: 'apiData',
      api: {
        url: '/api/revenue/rows',
        method: 'GET',
        query: {
          org: '$filters.org',
          cycle: '$filters.cycle',
        },
        responsePath: 'data.rows',
        adapter: 'rows',
      },
      filterFields: {
        org: 'orgId',
      },
      requiredFilters: ['org'],
    },
  },
}
```

```ts
filters: [
  {
    id: 'org',
    label: 'Organization',
    source: {
      id: 'apiData',
      api: {
        url: '/api/filter-options/orgs',
        responsePath: 'data.options',
        adapter: 'rows',
      },
      labelField: 'name',
      valueField: 'id',
    },
  },
]
```

For provider payloads that do not already match widget row fields, add a named adapter in `src/dataSources/registry.ts` and reference it with `api.adapter`.

## Component Local Filter Example

```ts
localFilters: [
  {
    id: 'productLine',
    label: '产品线',
    field: 'productLine',
    labelField: 'productLineName',
    mode: 'auto',
    maxButtonOptions: 5,
  },
]
```

This filter reads options from the widget's already loaded rows. It does not call an API and does not change provider-level totals.
