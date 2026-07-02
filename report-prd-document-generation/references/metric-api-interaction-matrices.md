# Metric, API, And Interaction Matrices

Use this reference for PRD sections 5A, 6, 7, 8, and 9.

## Metric List

Every metric needs a complete口径. Use one row per metric:

| 指标 ID | 指标名称 | 业务含义 | 公式 | 单位 | 方向 | 适用业务线 | 数据来源 | 刷新频率 | 样本量/分母 | 空值规则 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Add these fields when useful:

| Field | Requirement |
| --- | --- |
| 统计周期 | Day, month-to-date, year-to-date, rolling 7 days, etc. |
| 统计粒度 | Group, business line, region, product, store, order, user, issue, etc. |
| 维度 | Date, business line, channel, product, region, issue type. |
| 阈值/目标 | Target line, warning threshold, SLA, benchmark. |
| 展示精度 | Decimals, percentage precision, thousand separator. |
| Tooltip口径 | Reader-facing explanation. |
| Owner | Business/data owner. |
| 状态 | `confirmed`, `inferred`, `TBD(GAP-*)`. |

Metric rules:

- Direction must be `越高越好`, `越低越好`, `区间内更好`, or `仅展示不判断`.
- Formula must include numerator and denominator for rates.
- Sample/denominator must explain who or what is counted.
- Null rule must say whether null displays as `-`, `0`, excluded from denominator, carried forward, or blocks calculation.
- If a metric is only a derived display label, still define source and derivation.

## Metric Mounting Matrix

This is the developer handoff section. Every visible metric must appear here.

| Metric ID | Page ID | Block ID | Block coordinate | 分块配置 | Standard area | Area coordinate | Component slot | Slot coordinate | 组件示例 | Visual role | Data object | API ID | Filter scope | Interaction ID | Export field |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Use `Standard area = 3 componentArea` when the metric, unit, or auxiliary information is rendered by a registered component example.
- Use `Standard area = 4 summaryArea` only for a `RULE-*` driven narrative conclusion when no conclusion component already owns the conclusion, or for static text/caveat/source/action note.
- Use `none` in `Component slot` when the metric is not in `3 componentArea`.
- Use `Block coordinate = R-B` for every mounted metric, and use `Slot coordinate = R-B-S` whenever `Standard area = 3 componentArea`.
- Use `Area coordinate = blockCoordinate + areaName`, such as `1-2:summaryArea`, only when the metric lives outside `3 componentArea`.
- Component-owned `unit` and `auxMetrics` must be listed on the component example row with their data/API fields and display rules; do not create block-level `auxMetricArea` or `unitArea` mounting rows.
- Every `Metric ID` must exist in the metric list.
- Every slot metric must be traceable to a registered component example and API/data object.

## Conclusion Rule Matrix

This is the frontend generation contract for summary areas, conclusion cards, and analysis insight components. Every visible business conclusion must appear here.

| Rule ID | Display target | Page ID | Block ID | Block coordinate | Standard area | Area coordinate | Component slot | Slot coordinate | Registered component example | Input metric IDs | Data object | API ID | Trigger/filter state | Rule logic/threshold | Output fields or sentence template | Evidence fields | Priority/severity | Empty/null/insufficient-data rule | Permission/masking rule | QA case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- `Rule ID` must use the `RULE-*` prefix and be referenced by `summaryAreaConfig.conclusionRuleId`, conclusion-card slot props, or `analysisInsightContract`.
- `Display target` must be one of `summaryArea`, `conclusionCard`, `analysisInsight`, or a more specific component target approved by the registered component example.
- `Input metric IDs` must exist in the metric list, and each metric must also appear in the metric mounting matrix when it is visible or drives visible text.
- `Rule logic/threshold` must include the comparison baseline, period behavior, direction, denominator-zero handling, top-N/ranking rule when relevant, and priority when multiple rules match.
- `Output fields or sentence template` is a template for frontend generation, not the final fixed conclusion. Use placeholders such as `{metricName}`, `{value}`, `{baseline}`, `{delta}`, `{dimensionName}`, `{reason}`, and `{action}` when useful.
- `Evidence fields` must name the numbers, dimensions, timestamps, source/freshness, or links shown with the conclusion or exposed by tooltip/detail.
- Empty/null/insufficient-data rules must not produce misleading positive or negative conclusions.
- If a conclusion target has no rule, mark the PRD `draft` or `blocked`; do not replace the rule with static copy.

## Data Object Requirements

Define objects before APIs:

| Object ID | 对象名称 | 业务含义 | 粒度 | 主键/唯一键 | 维度字段 | 指标字段 | 数据来源 | 权限字段 | 刷新频率 | 数据质量规则 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Data object rules:

- Grain must be precise: one row per month/business line, one row per issue, one row per region ranking item, etc.
- Permission fields must support role/data-scope filtering when the report has multiple roles.
- Data quality rules should include missing source, duplicate key, delayed refresh, denominator zero, and abnormal value handling when relevant.

## API Requirements

Use one table per interface or one consolidated table for small PRDs:

| API ID | 接口名称 | Method/Path | 用途 | Request params | Response fields | Data object | Permission rule | Sort/page | Cache/freshness | Empty/error behavior |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

For each API, define:

| Area | Required content |
| --- | --- |
| Request | businessLineId, periodType, dateRange, metricId, rankingDimension, pageSize/pageNo, drill filters. |
| Response | rows, summary, metric values, trend points, ranking items, issue types, closure states, totals, unit,口径 metadata. |
| Error | Timeout, no permission, empty data, partial data, source delay. |
| Performance | Expected page size, cache duration, first-screen API count if known. |
| Security | Masking, sensitive field exclusion, user data-scope. |

Keep response field names implementation-oriented when known. If not known, use stable conceptual names and mark real field mapping as `TBD(GAP-API-FIELD-*)`.

## Interaction Logic

Use this interaction matrix:

| Interaction ID | 操作 | 触发位置 | 输入 | 系统响应 | 影响范围 | API/Data refresh | URL/state sync | Loading/empty/error | Permission rule |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Also output these named maps for template-based report prototypes:

| Map | Required fields |
| --- | --- |
| `filterSurfaceMap` | Template filter id, visible label, control type, option source, default, affected blocks/components, query params, permission scope, reset behavior, loading/empty/error behavior. |
| `pillAreaConfig` | Block id, `blockCoordinate`, pill id, label, default active value, template area code `1-2 pillArea`, area coordinate such as `1-2:pillArea`, affected metric/component/API params, state reset, response, or `null` plus `notNeededReason`. |
| `toolbarActionMap` | Action id, label/icon, template toolbar slot, permission, payload, target, export/fullscreen/refresh behavior, success/failure behavior. |
| `interactionBehaviorMap` | Trigger, owner, source page/block/slot/template id, `blockCoordinate`, `slotCoordinate` when the trigger is inside `3 componentArea`, target type, payload fields, context inheritance, state sync, close/back behavior, permission rule, QA case. |

Add this self-developed interaction contract for every 下钻, 跳转, 弹窗/抽屉/modal, or component-owned deep interaction. Keep the exact field names because template validators use these names:

| PRD meaning | Required config field | Required value |
| --- | --- | --- |
| Interaction ID | `interactionId` | Stable unique ID, also referenced by metric mounting rows when relevant. |
| Interaction type | `interactionType` | One of `drilldown`, `jump`, `drawer`, `modal`, `popup`, `crossFilter`. |
| Trigger owner | `triggerOwner` | One of `templateActionHook`, `widgetEvent`, `componentOwnedEvent`. |
| Source page | `sourcePageId` | Page/nav ID that owns the trigger. |
| Source block | `sourceBlockId` | Block ID from `layoutRows`/block map. |
| Source block coordinate | `sourceBlockCoordinate` | Readable `R-B` coordinate from `layoutCoordinateMap`. |
| Source slot | `sourceSlotId` | Component slot or `componentArea` slot ID that owns the trigger. |
| Source slot coordinate | `sourceSlotCoordinate` | Readable `R-B-S` coordinate when the trigger is inside a component slot; use `none` only for shell, toolbar, or standard block area triggers. |
| Source registered component example | `sourceComponentExampleId` | Registered component example ID. |
| Payload fields | `payloadFields` | Non-empty list of event payload fields. |
| Target | `target` | Route, drawer/modal ID, popover ID, external target, or cross-filter target. |
| Target type | `targetType` | One of `route`, `drawer`, `modal`, `popover`, `external`, `cross-filter`, `fullscreen`, `export`. |
| Context inheritance | `contextInheritance` | Non-empty list such as filters, date range, business line, role/data scope, selected metric. |
| State sync | `stateSync` | URL/query/store/open-state sync rule. |
| API/Data dependency | `apiId` | API/data object used by the interaction, or `none` only when no data is fetched. |
| Permission rule | `permissionRule` | Permission check and no-permission behavior. |
| Close/back behavior | `closeBackBehavior` | Drawer/modal close, route back, stale-state, and return-state behavior. |
| QA case | `qaCase` | Test case ID or concrete QA scenario. |

Rules for self-developed interactions:

- `interactionType` must be one of `drilldown`, `jump`, `drawer`, `modal`, `popup`, or `crossFilter`.
- `triggerOwner` must be an existing template action hook, existing widget event, or a component-owned event emitted from the component example. It must not create a new framework shell, duplicate navigation, duplicate filter bar, duplicate toolbar, or custom page/block layout.
- Drilldown must pass current filters, period/date, business line, role/data scope, source metric ID, clicked dimension/object ID, and return-state token when applicable.
- Jump must declare internal route or external system, route/query/body parameters, permission check timing, open mode, and no-permission behavior.
- Drawer/modal/popover must declare trigger, content owner, size, data object/API, loading/empty/error/no-permission state, close/confirm behavior, and whether changing global filters while open synchronizes or shows stale-selection state.
- Every interaction that can change visible data must list affected blocks/APIs and reset/highlight behavior.
- Every interaction that changes filters, date/period, metric, ranking context, drilldown context, permission scope, or API data must list the affected `RULE-*` conclusion rules and whether frontend recomputes, clears, or marks them stale.
- Every interaction that cannot be used must be explicitly marked non-clickable or disabled with visible reason.

Required interaction coverage for report PRDs:

| Interaction | Required logic |
| --- | --- |
| 业务线切换 | Which filter changes, which blocks refresh, role scope, whether nav/page state resets. |
| 月累/年累切换 | Period enum, affected metrics/formulas, title/unit/tooltip updates, comparison baseline. |
| 日期选择 | Allowed granularity, default date, max range, disabled future dates, refresh behavior. |
| 指标切换 | Metric selector owner, chart/list remapping,口径/单位/threshold update. |
| 排名点击 | Selected ranking row, highlight behavior, downstream block/detail filter, drill entry. |
| 下钻 | From block/row/point to detail page/drawer; pass filters, metric ID, period, role scope. |
| 跳转 | Internal route or external system; parameters and permission check. |
| 弹窗/抽屉 | Trigger, content, data source, close/confirm behavior, size, empty/error state. |
| 导出 | Export scope, current filters, file name, fields, permission, async behavior. |

Interaction rules:

- Every clickable chart point, table row, ranking item, KPI card, pill, tab, or link must have a response or be explicitly non-clickable.
- A filter interaction must name all affected blocks/APIs.
- State changes must not silently change metric口径. If period/metric/business line changes formulas or denominators, state the rule in the metric list.
- Permission denial needs a user-visible behavior and API behavior.
- Empty/error/loading states must be defined for first-screen blocks and drilldown views.

## Common Management Dashboard Defaults

Use these defaults only when the input does not specify otherwise:

| Topic | Default |
| --- | --- |
| Business-line filter | Required for group-level reports; default `全部` if permission allows. |
| Period | Month-to-date default, year-to-date as toggle when annual review is needed. |
| Date | Latest available data date, not current calendar date if source refresh lags. |
| Ranking | Top 10 by selected metric, with tie rule `same value same rank` when required. |
| Drilldown | Preserve current filters and add clicked dimension/metric. |
| Export | Export current permission-filtered result, not all raw source data. |
| Sensitive detail | Exclude personal detail unless explicitly authorized. |
