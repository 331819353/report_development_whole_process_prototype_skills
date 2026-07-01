# Mock API Contract

This template serves prototype data only through the npm mock API. Do not keep static filter options, static widget rows, chart series, KPI values, or component demo props as runtime fallback data.

## Commands

```bash
npm run mock:api
npm run dev:mock
```

- `mock:api` starts only the API, defaulting to `http://127.0.0.1:4179`.
- `dev:mock` starts the API and Vite, and proxies Vite `/api` requests to the mock API.
- Useful flags: `--host`, `--port`, `--mock-host`, `--mock-port`, `--attempts`.

## Response Envelope

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "items": [],
    "rows": [],
    "total": 0
  }
}
```

- Filter option endpoints use `api.responsePath: 'data.items'`.
- Component endpoints use `api.responsePath: 'data.rows'`.
- Component props are returned as `rows[0].props` and mapped with `dataBinding.propsObjectField: 'props'`.
- Component keys use stable `page.block.slot` values such as `overview.A.A`. The mock dataset may keep `legacyKey` only to trace old title-based fixture names.
- Component responses echo the effective query in `rows[0].query` and `rows[0].props.queryContext`.

## Endpoints

```text
GET /api/health
GET /api/filter-options/period
GET /api/filter-options/region
GET /api/filter-options/project
GET /api/filter-options/channel
GET /api/component-props/:componentDataKey
GET /api/report/revenue-trend
GET /api/report/revenue-table
GET /api/report/kpi-summary
```

`/api/component-props/:componentDataKey` is the default data path for component slots. The backing object lives in `src/data/dashboard.dataset.json` at `businessData.componentProps`.

Filter option endpoints accept the other active filters as query params. The mock server uses those params for lightweight cascading on region, project, and channel options.

Ranking-list component props use `props.items`. Each item requires `value`; `label` is the preferred display-name field, while `name`, `regionName`, `region`, `areaName`, and `dimension` are accepted aliases for backend-friendly dimension names. Optional fields are `rank`, `suffix`, and `delta`.

## Filter Example

```ts
{
  id: 'region',
  label: 'Region',
  defaultValue: 'all',
  source: {
    id: 'apiData',
    api: {
      url: '/api/filter-options/region',
      method: 'GET',
      responsePath: 'data.items',
      query: {
        period: '$filters.period',
        region: '$filters.region',
        project: '$filters.project',
        channel: '$filters.channel',
      },
    },
    labelField: 'label',
    valueField: 'id',
    emptyFilterValues: ['', '__all', 'all'],
  },
}
```

## Component Slot Example

```ts
{
  data: {
    id: 'apiData',
    api: {
      url: `/api/component-props/${encodeURIComponent('overview.A.A')}`,
      method: 'GET',
      responsePath: 'data.rows',
      adapter: 'rows',
      query: {
        period: '$filters.period',
        region: '$filters.region',
        project: '$filters.project',
        channel: '$filters.channel',
        metric: '$context.activeTitlePill.params.metric',
        activeTitlePillId: '$context.activeTitlePillId',
        activeTitlePillLabel: '$context.activeTitlePillLabel',
      },
    },
    filterFields: {
      period: 'period',
      region: 'region',
      project: 'project',
      channel: 'channel',
      metric: 'metric',
    },
    emptyFilterValues: ['', '__all', 'all'],
  },
  dataBinding: {
    mode: 'custom-props',
    propsObjectField: 'props',
  },
}
```

## Block Title Pill Contract

Every configured business-analysis block receives default title pills unless a block overrides them:

| Pill | Params | Runtime effect |
| --- | --- | --- |
| `current` / 本期 | `{ metric: 'current', perspective: 'periodActual' }` | Reloads every slot in the owning block with current-period context. |
| `target` / 目标 | `{ metric: 'target', perspective: 'targetGap' }` | Reloads every slot in the owning block with target/gap context. |
| `risk` / 风险 | `{ metric: 'risk', perspective: 'riskAction' }` | Reloads every slot in the owning block with risk/action context. |

The mock API receives `metric`, `activeTitlePillId`, and `activeTitlePillLabel` on `/api/component-props/:componentDataKey`. Real APIs should keep these fields in the common query DTO or provide an equivalent perspective switch.

## Replacing With Real APIs

1. Keep the `apiData` / `httpData` data-source boundary.
2. Replace `api.url` and, if needed, `api.responsePath`.
3. Keep component props stable or add an adapter in `src/dataSources/registry.ts`.
4. Preserve `emptyFilterValues` for aggregate values such as `all`.
5. Keep `componentDataKey` stable across copy/title changes; backend should key by page/block/slot or an agreed stable business id, not by visible title text.
6. Do not add component-local fetchers or static fallback rows.

## Interaction Contract

Each configured component slot receives a default `actions.slotClick` action. `BaseLayoutSpan.vue` emits a `slotClick` dashboard action only for slots with that action configured.

Default target type is role-based:

| Slot role | Interaction | Target type |
| --- | --- | --- |
| `primary` | drilldown | drawer |
| `reference` | drilldown | drawer |
| `secondary` | modal | modal |
| `supporting` | popup | popover |

The event payload includes:

```json
{
  "sourceSlotId": "A",
  "sourceSlotLabel": "slot label",
  "sourceComponentExampleId": "component-example-catalog:kpi-metric-card",
  "componentDataKey": "overview.A.A",
  "sourceSlotRole": "primary",
  "filters": {
    "period": "2026-06",
    "region": "east"
  },
  "activeTitlePillId": "current"
}
```

Production projects can replace this with route, modal, popup, cross-filter, or a custom registry handler while keeping the same payload fields.
