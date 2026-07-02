# Prototype Data Summary

- Prototype name: bundled business report baseline
- Route/page ids: `overview`, `revenue`, `profit`, `risk`
- Source PRD/version: business-report baseline
- Readiness: ready for prototype handoff
- Data mode: npm mock API only. Runtime filter options and component display data are provided by API endpoints. Static `filters[].options`, static widget rows, chart series, KPI values, and component demo props are not runtime fallback data.

## Source Files And Data Modes

| File | Purpose | Mode | Notes |
| --- | --- | --- | --- |
| `src/config/dashboard.config.ts` | Shell title, theme, native filters, selected page wiring | static config + API-bound filters | Filter options come from `filters[].source`; no static `options` fallback. |
| `src/report-template-assets/business-report-pages.ts` | Business report pages, `layoutRows`, `blockAreaConfigMap`, component slots | static config + API-bound slots | Component slots default to `/api/component-props/:componentDataKey`, where the key is stable `page.block.slot`. |
| `src/data/dashboard.dataset.json` | Mock API backing store | JSON fixture behind API | Owns `filterData.*Options`, `businessData.componentProps`, and sample report rows. |
| `scripts/mock-api-server.mjs` | Lightweight Node API service | npm mock API | Exposes filter option, component props, and sample report endpoints. |
| `scripts/dev-with-mock-api.mjs` | API plus Vite startup | npm orchestration | Sets non-client `MOCK_API_BASE_URL` for the Vite `/api` proxy. |
| `src/dataSources/registry.ts` | Data source resolver and adapter registry | runtime data boundary | Keeps API/http/custom-provider behavior outside components. |
| `src/widgets/templates/block-spans/BaseLayoutSpan.vue` | Block runtime and slot data binding | runtime binding | Reads slot API rows and maps `rows[0].props` through `dataBinding.propsObjectField`. |
| `src/widgets/types.ts` | Widget/data-binding type contract | type contract | Declares `propsObjectField`. |
| `docs/mock-api-contract.md` | API response and replacement contract | documentation | Describes endpoints and no-fallback rule. |

## Dataset Catalog

| Dataset/API | Business object | Grain | Primary key | Dimensions | Measures/props | Source |
| --- | --- | --- | --- | --- | --- | --- |
| `GET /api/filter-options/period` | Period filter options | option row | `id` | filter id | `label`, `sortOrder` | `filterData.periodOptions` |
| `GET /api/filter-options/region` | Region filter options | option row | `id` | filter id | `label`, `sortOrder` | `filterData.regionOptions` |
| `GET /api/filter-options/project` | Project filter options | option row | `id` | filter id | `label`, `sortOrder` | `filterData.projectOptions` |
| `GET /api/filter-options/channel` | Channel filter options | option row | `id` | filter id | `label`, `sortOrder` | `filterData.channelOptions` |
| `GET /api/component-props/:componentDataKey` | Component-ready display payload | component slot | `key` | page, block, slot, component type, legacy title key | `props` object for registered component examples plus `query` echo | `businessData.componentProps` |
| `GET /api/report/revenue-trend` | Sample trend rows | period x filter context | composite period/filter tuple | period, region, project, channel | amount, completion, profit, risk count | `businessData.apiRevenueTrendRows` |
| `GET /api/report/revenue-table` | Sample detail rows | detail row | `id` | period, region, project, channel, customer | amount, target, completion, status | `businessData.apiRevenueTableRows` |
| `GET /api/report/kpi-summary` | Sample KPI rows | metric | `metric` | metric | value, target, unit, trend | `businessData.apiKpiSummaryRows` |

## Field Dictionary

| Field | Label | Type | Source | Nullable | Notes |
| --- | --- | --- | --- | --- | --- |
| `period` | Operating period | string | filter source/query | no | Default `2026-06`. |
| `region` | Region | string | filter source/query | no | `all` is omitted by `emptyFilterValues`. |
| `project` | Project | string | filter source/query | no | Drives project-level context. |
| `channel` | Channel | string | filter source/query | no | Drives channel analysis. |
| `key` | Component data key | string | `/api/component-props/:componentDataKey` | no | Stable format is `page.block.slot`, for example `overview.A.A`; old title-derived key is retained only as `legacyKey` in mock data. |
| `legacyKey` | Legacy component data key | string | `businessData.componentProps` | yes | Backward trace to previous `<ComponentType>:<Title>` fixture names; backend should not use it as the primary key. |
| `props` | Component props payload | object | `businessData.componentProps` | no | Mapped into registered component examples by `propsObjectField`. |
| `query` | API query echo | object | `/api/component-props/:componentDataKey` | yes | Mirrors `period`, `region`, `project`, `channel`, `metric`, and active pill fields received by the mock API. |
| `amount` | Amount | number | sample report endpoints | no | Used only by sample report API rows. |
| `completion` | Completion rate | number | sample report endpoints | no | Percent-like numeric value. |

## Metric And Conclusion Inputs

| Metric/rule | Inputs | Display target | Runtime source | Missing-data behavior |
| --- | --- | --- | --- | --- |
| KPI cards | `props.value`, `props.unit`, trend fields | registered KPI component examples | `/api/component-props/:componentKey` | Slot does not render component content until API rows exist. |
| Charts | `props.categories`, `props.series`, `props.items`, chart config | registered chart component examples | `/api/component-props/:componentKey` | No internal demo payload is used as runtime fallback. |
| Ranking lists | `props.items[].label` preferred; `name`, `regionName`, `region`, `areaName`, or `dimension` are accepted as display names; `value` is required; `rank`, `suffix`, and `delta` are optional | `RankingListExampleCard` | `/api/component-props/:componentKey` | The component normalizes the first non-empty display-name field so API rows can use business dimension names. |
| Tables/lists | `props.rows`, `props.columns`, `props.items` | registered table/list component examples | `/api/component-props/:componentKey` | Empty state follows API result rather than static rows. |
| Conclusions/actions | `props.conclusion`, `props.evidenceItems`, `props.actionItems` | registered conclusion/action examples | `/api/component-props/:componentKey` | Missing API data blocks fallback display. |

## Component Data Binding Matrix

| Scope | Component examples | Data source | Binding | Filters | State handling |
| --- | --- | --- | --- | --- | --- |
| all pages/all component slots | `component-example-catalog:*` | `apiData -> GET /api/component-props/:componentDataKey` | `dataBinding.mode = custom-props`; `propsObjectField = props` | period, region, project, channel, plus `activeTitlePillId` and active pill params when configured | Rows are fetched and cached by `blockId + slotId`; component content requires returned rows. |
| sample trend endpoint | line/combo-compatible rows | `apiData -> GET /api/report/revenue-trend` | `data.rows` sample API shape | period, region, project, channel | Kept as replaceable API example, not slot fallback. |
| sample table endpoint | table-compatible rows | `apiData -> GET /api/report/revenue-table` | `data.rows` sample API shape | period, region, project, channel | Kept as replaceable API example, not slot fallback. |
| sample KPI endpoint | KPI-compatible rows | `apiData -> GET /api/report/kpi-summary` | `data.rows` sample API shape | metric | Kept as replaceable API example, not slot fallback. |

## Component Display Configuration

Display configuration is not a backend data fallback. It is frontend presentation metadata carried in `slot.widget.props.config` and merged with API-provided `props`. The business-analysis demo uses it to keep slot content readable: block titles carry the visible hierarchy, chart internals hide duplicated title/aux rows, bottom chart slots use vertical region patterns, and table footers reserve readable height. Backend APIs should return business values, dimensions, series, rows, and status fields; they do not need to return these display-only defaults unless a real product wants server-controlled presentation.

## Filter And Parameter Semantics

| Filter | Default | Option source | Query mapping | Affected components | Notes |
| --- | --- | --- | --- | --- | --- |
| `period` | `2026-06` | `/api/filter-options/period` | `period` | all pages and slots | Required global context; option API receives the other active filters for future cascade rules. |
| `region` | `all` | `/api/filter-options/region` | `region` | all pages and slots | `all` is omitted through `emptyFilterValues`; region options can cascade by project/channel. |
| `project` | `all` | `/api/filter-options/project` | `project` | all pages and slots | Project options cascade by period/region/channel in the mock API. |
| `channel` | `all` | `/api/filter-options/channel` | `channel` | all pages and slots | Channel options cascade by period/region/project in the mock API. |
| block `titlePills` | `current` | block config default: `current` / `target` / `risk` | `$context.activeTitlePill.params.metric`, `$context.activeTitlePill.params.perspective` | every block and every slot in the owning block | Data-affecting pills reload all slot data in the block and recompute props through `/api/component-props/:componentDataKey`. |

## Interaction Payloads

| Interaction | Trigger | Payload fields | Target | API need | State handling |
| --- | --- | --- | --- | --- | --- |
| Refresh | shell toolbar | filters, page id | current page | reuse current component endpoints | keep current state until reload completes. |
| Download/export | shell toolbar | filters, page id, visible blocks | export action | future export endpoint | permission state required downstream. |
| Slot drilldown drawer | `actions.slotClick` on `primary` and `reference` component slots | `componentDataKey`, first returned row, filters, page/block/slot, active pill id, slot role | shell default drawer action | optional detail endpoint keyed by `componentDataKey` | slot wrapper emits the event; no component-local action code is required. |
| Slot comparison modal | `actions.slotClick` on `secondary` component slots | same slot payload plus `sourceSlotRole = secondary` | shell default modal action | optional detail endpoint keyed by `componentDataKey` | closes independently from page filter state. |
| Slot support popup | `actions.slotClick` on `supporting` component slots | same slot payload plus `sourceSlotRole = supporting` | shell default popup action | optional detail endpoint keyed by `componentDataKey` | lightweight explanation/action context. |
| Page jump | topbar or left-nav native navigation | page/nav id | configured page switch | no detail API required | changes active page and reloads page slot data. |
| Block pill switch | default `titlePills` state | `titlePillId`, `titlePillLabel`, active pill params/filters | owning block and slots | current component endpoint with updated params | reload scoped slot data. |

## Backend Interface Method Contract

This section is the backend handoff surface. It translates the prototype's current mock API usage into backend method candidates, DTOs, consumers, and replacement boundaries.

### Backend-Ready Information Already Provided

| Provided information | Prototype source | Backend usage |
| --- | --- | --- |
| Visible filters and defaults | `src/config/dashboard.config.ts` `filters[]` | Define filter-option methods and common query DTO defaults. |
| Filter option rows | `src/data/dashboard.dataset.json` `filterData.*Options` | Define option DTO fields: `id`, `label`, `sortOrder`; confirm enum/source authority. |
| Component consumers | `src/report-template-assets/business-report-pages.ts` `componentSlots` | Map backend methods to page/block/slot/component consumers. |
| Component props payloads | `businessData.componentProps` keyed by `page.block.slot` | Define component-ready response DTOs or normalized-row adapter targets. |
| Data binding contract | `BaseLayoutSpan.vue`, `src/widgets/types.ts` | `data.rows[0].props` is mapped through `dataBinding.propsObjectField = props`. |
| Query context | `filters[]`, default `titlePills[]`, `$context.activeTitlePill` | Define `CommonReportQuery` and optional pill/perspective params. |
| Interaction triggers | `actions.slotClick` on component slots plus optional block/component actions | Identify future detail/export/drilldown methods and payload fields. |
| Known gaps | `GAP-*` rows below | Assign backend/data owners for source tables, permission, and metric authority. |

### Common DTOs

| DTO | Fields | Notes |
| --- | --- | --- |
| `CommonReportQuery` | `period?: string`, `region?: string`, `project?: string`, `channel?: string`, `metric?: string`, `perspective?: string`, `pageId?: string`, `blockId?: string`, `slotId?: string`, `slotRole?: string`, `componentDataKey?: string`, `activeTitlePillId?: string` | Values `''`, `__all`, and `all` mean omit that constraint when listed in `emptyFilterValues`. |
| `ApiEnvelope<T>` | `code: number`, `message: string`, `data: T` | Current mock API uses `code = 0` for success. |
| `FilterOptionDto` | `id: string`, `label: string`, `sortOrder?: number`, `disabled?: boolean`, `meta?: object` | Consumed by native filter controls through `data.items`. |
| `ComponentPropsRowDto` | `key: string`, `legacyKey?: string`, `componentType: string`, `visualType: string`, `query?: object`, `props: object` | Consumed by component slots through `data.rows[0].props`; `key` uses `page.block.slot`. |

### Interface Methods

| Method ID | Service method | HTTP contract | Frontend consumers | Request DTO | Response DTO | Binding/replacement notes |
| --- | --- | --- | --- | --- | --- | --- |
| `M-FILTER-OPTIONS` | `ReportFilterService.listFilterOptions(filterId, query)` | `GET /api/filter-options/{filterId}` | Native filters: `period`, `region`, `project`, `channel` | Path: `filterId`; query: active values of the other filters for cascade | `ApiEnvelope<{ items: FilterOptionDto[] }>`; `responsePath = data.items` | Replace mock `filterData.*Options`; keep `labelField = label`, `valueField = id`; support cascading option availability. |
| `M-COMPONENT-PROPS` | `ReportComponentDataService.getComponentProps(componentDataKey, query)` | `GET /api/component-props/{componentDataKey}` | All `component-example-catalog:*` slots, cached by `blockId + slotId` | Path: stable `componentDataKey`; query: `CommonReportQuery` plus active pill params | `ApiEnvelope<{ rows: ComponentPropsRowDto[], total: number }>`; `responsePath = data.rows` | Default production-compatible contract. Backend may return component-ready props, or frontend can replace this with normalized endpoints plus adapters. |
| `M-COMPONENT-DETAIL` | `ReportComponentDataService.getComponentDetail(componentDataKey, query)` | `GET /api/component-detail/{componentDataKey}` or reuse component props endpoint | `actions.slotClick` drawer/modal/popup detail interactions | Path: stable `componentDataKey`; query: filters, page/block/slot, active pill id, slot role | `ApiEnvelope<{ detail: object }>` | Optional production detail endpoint. The prototype currently opens shell overlay metadata from configured `slotClick`. |
| `M-PAGE-DATA` | `ReportPageDataService.getPageData(pageId, query)` | `GET /api/report/business/{pageId}` | Optional page-level aggregation for `overview`, `revenue`, `profit`, `risk` | Path: `pageId`; query: `CommonReportQuery` | `ApiEnvelope<{ components: Record<string, ComponentPropsRowDto>, updatedAt?: string }>` | Useful real-API replacement to reduce per-slot requests; adapter should split component rows by key. |
| `M-REVENUE-TREND` | `ReportAnalysisService.listRevenueTrend(query)` | `GET /api/report/revenue-trend` | Sample normalized trend API; chart adapter candidates | Query: `period`, `region`, `project`, `channel`, `metric?` | `ApiEnvelope<{ rows: RevenueTrendRowDto[], total: number }>` | Keep only if backend prefers normalized chart rows over component-ready props. |
| `M-REVENUE-TABLE` | `ReportAnalysisService.pageRevenueDetails(query)` | `GET /api/report/revenue-table` | Sample normalized detail table API; detail/export candidates | Query: `period`, `region`, `project`, `channel`, `page?`, `pageSize?`, `sort?` | `ApiEnvelope<{ rows: RevenueDetailRowDto[], total: number }>` | Add backend pagination/sort before production row volumes. |
| `M-KPI-SUMMARY` | `ReportAnalysisService.getKpiSummary(query)` | `GET /api/report/kpi-summary` | Sample KPI normalized API | Query: `metric`, plus `CommonReportQuery` when scoped | `ApiEnvelope<{ rows: KpiSummaryRowDto[] }>` | Can feed KPI props adapter or be folded into `M-COMPONENT-PROPS`. |
| `M-EXPORT` | `ReportExportService.createExportJob(command)` | `POST /api/report/business/export` | Shell export/download action | Body: filters, page id, selected blocks, visible columns | `ApiEnvelope<{ jobId: string, fileUrl?: string, status: string }>` | Requires permission and audit policy before production. |

### Backend Method Requirements

| Area | Requirement |
| --- | --- |
| Permission | Inject user/org/role scope server-side; do not trust only frontend filters. Return no-permission state separately from empty data. |
| Cache/freshness | Include `updatedAt` or equivalent freshness metadata for page/component data when backend cache is used. |
| Empty/error states | Preserve envelope shape; use empty `items`/`rows` for no data, permission code for denied access, and non-zero `code` for business errors. |
| Component key stability | Current mock key is stable `page.block.slot`. Keep it stable across title copy changes; use `legacyKey` only for fixture traceability. |
| Adapter boundary | Backend can return `props` directly, or return normalized rows and let `src/dataSources/registry.ts` adapt to component props. Do not push raw backend shapes into component example internals. |

## Backend API And Model Suggestions

| Candidate | Request | Response | Notes |
| --- | --- | --- | --- |
| `GET /api/filter-options/{filterId}` | optional user/report context | `{ data: { items: [{ id, label, sortOrder }] } }` | Replace directly with backend filter option APIs. |
| `GET /api/component-props/{componentDataKey}` | filters, active pill params, stable component key | `{ data: { rows: [{ key, legacyKey?, query?, props }] } }` | Current default for component slots; backend can return component-ready props or use an adapter. |
| `GET /api/report/business/{pageId}` | filters, page id | component payload map or normalized rows | Useful production replacement when backend owns page-level aggregation. |
| `POST /api/report/business/export` | filters, page id, selected blocks | export job id/file | Apply permission and audit rules. |

## Gaps And Assumptions

| Gap ID | Gap | Impact | Owner/source needed | Current assumption | Readiness |
| --- | --- | --- | --- | --- | --- |
| GAP-001 | Authoritative production source tables are not bound in the template asset. | Backend handoff needs source mapping. | Backend/data owner | Prototype uses mock API-backed fixture data. | partial for backend |
| GAP-002 | Permission model is not connected to real SSO roles. | Production readiness cannot be claimed. | Auth/product owner | Prototype shows shell-level controls only. | partial for production |

## Verification

| Check | Status | Evidence |
| --- | --- | --- |
| Mock API | required | `npm run mock:api`; `npm run dev` / `npm run dev:mock` for API plus Vite |
| Filter options | required | direct requests to `/api/filter-options/*` |
| Component props | required | direct request to `/api/component-props/:componentDataKey` with filters and active pill query |
| Slot interaction | required | `actions.slotClick` opens shell drawer/modal/popup metadata by slot role using `componentDataKey`, filters, active pill, and source slot fields |
| Template validation | required | `npm run validate:dashboard` |
| Build | required | `npm run build` |
