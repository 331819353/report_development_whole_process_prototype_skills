# Prototype Data Summary

- Prototype name: frozen-title-sci-fi-cockpit-template business report baseline
- Route/page ids: overview, revenue, profit, risk
- Source PRD/version: business-report baseline
- Readiness: ready for prototype handoff
- Data mode: JSON fixture plus static component props in configurable template files

## Source Files And Data Modes

| File | Purpose | Mode | Notes |
| --- | --- | --- | --- |
| `src/config/dashboard.config.ts` | Shell title, theme, filters, selected page wiring | static config | Owns global filters and page selection. |
| `src/report-template-assets/business-report-pages.ts` | Business report pages, layoutRows, blockAreaConfigMap, component slots, component-example-catalog ids | static config | Main configurable report packet. |
| `src/data/dashboard.dataset.json` | Baseline JSON fixture datasets | JSON fixture | Used by loader/data-source paths when widgets need shared data. |
| `src/dataSources/registry.ts` | Data source registry and resolver surface | static registry | Future API binding surface. |
| `src/widgets/templates/component-examples/config.ts` | Registered component example schemas | static registry | Validates component-example-catalog ids and config sections. |
| `src/widgets/registry.ts` | Runtime widget/component registration | static registry | Mounts registered examples through WidgetRenderer. |

## Dataset Catalog

| Dataset ID | Business object | Row grain | Primary key | Dimensions | Measures | Freshness | Permission scope |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `business-report-baseline` | Operating analysis report | page/block/component sample | `id` or component-local key | period, region, project, channel, page, block | revenue, profit, target, risk, conversion, action count | fixture as of release-v1.0 | prototype only |

## Field Dictionary

| Field | Label | Type | Unit | Source | Nullable | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `period` | Operating period | string | none | dashboard.config.ts filters | no | Default `2026-06`. |
| `region` | Organization region | string | none | dashboard.config.ts filters | no | `all` means aggregate selection. |
| `project` | Operating project | string | none | dashboard.config.ts filters | no | Drives project-level report context. |
| `channel` | Operating channel | string | none | dashboard.config.ts filters | no | Drives channel analysis. |
| `value` | Metric value | number | metric-specific | business-report-pages.ts/dashboard.dataset.json | no | Used by KPI, chart, table, and list examples. |
| `status` | Business status | string | none | component props/config | yes | Used by risk/action/conclusion examples. |

## Metric And Conclusion Inputs

| Metric or rule | Inputs | Formula or logic | Display target | Fallback |
| --- | --- | --- | --- | --- |
| Revenue/profit KPI | value, target, previous | configured component props | KPI cards and trends | empty state when missing |
| Target achievement | actual, target | actual / target | progress and gauge-like cards | denominator-zero note |
| Risk/action conclusion | status, severity, owner, due date | rule text in component config or summaryAreaConfig | conclusion cards and action lists | insufficient-data note |

## Component Data Binding Matrix

| Page/block/slot | Component example | Data source | Fields | Filters | States |
| --- | --- | --- | --- | --- | --- |
| overview/all slots | `component-example-catalog:*` | business-report-pages.ts props | value, label, trend, status | period, region, project, channel | loading, empty, normal |
| revenue/all slots | `component-example-catalog:*` | business-report-pages.ts props | revenue, target, channel, region | period, region, project, channel | loading, empty, normal |
| profit/all slots | `component-example-catalog:*` | business-report-pages.ts props | profit, cost, margin, risk | period, region, project, channel | loading, empty, normal |
| risk/all slots | `component-example-catalog:*` | business-report-pages.ts props | risk, severity, action, owner | period, region, project, channel | loading, empty, normal |

## Filter And Parameter Semantics

| Filter | Default | Option source | Query mapping | Affected components | Notes |
| --- | --- | --- | --- | --- | --- |
| `period` | `2026-06` | dashboard.config.ts | period | all pages and components | Required global context. |
| `region` | `all` | dashboard.config.ts | region | all pages and components | `all` is an aggregate filter option, not a row primary key. |
| `project` | `all` | dashboard.config.ts | project | all pages and components | Used for project-specific analysis. |
| `channel` | `all` | dashboard.config.ts | channel | all pages and components | Used for channel analysis. |

## Interaction Payloads

| Interaction | Trigger | Payload fields | Target | API need | State handling |
| --- | --- | --- | --- | --- | --- |
| Refresh | shell toolbar | filters, page id | current page | future refresh endpoint | keep stale data until success |
| Download/export | shell toolbar | filters, page id, visible blocks | export action | future export endpoint | no-permission state required downstream |
| Component drill/detail | component-owned event when configured | component id, datum id, filters | drawer/modal/action hook | future detail endpoint | empty and stale-selection fallback |

## Backend API And Model Suggestions

| Candidate | Request | Response | Notes |
| --- | --- | --- | --- |
| `GET /api/report/business/overview` | period, region, project, channel | page metrics, trends, risks, actions | Split by page or use page id parameter. |
| `GET /api/report/business/detail` | period, region, project, channel, component id | component-ready rows | Keep data-vs-presentation boundary. |
| `POST /api/report/business/export` | filters, page id, selected blocks | export job id/file | Apply permission and audit rules. |

## Gaps And Assumptions

| Gap ID | Gap | Impact | Owner/source needed | Current assumption | Readiness |
| --- | --- | --- | --- | --- | --- |
| GAP-001 | Authoritative production source tables are not bound in the template asset. | Backend handoff needs source mapping. | Backend/data owner | Prototype uses fixture/static config. | partial for backend |
| GAP-002 | Permission model is not connected to real SSO roles. | Production readiness cannot be claimed. | Auth/product owner | Prototype shows shell-level controls only. | partial for production |

## Verification

| Check | Status | Evidence |
| --- | --- | --- |
| Template contract | ready | `npm run validate:dashboard` |
| Build | expected | `npm run build:test` |
| Data summary | ready | this file |
| Version index | ready | `DELIVERY_INDEX.md` |
