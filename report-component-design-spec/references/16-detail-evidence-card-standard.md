# Detail Evidence Card Standard

Use this standard when a report, dashboard, BI page, detail-query page, or reusable component library asks for `analysisPerspective: detailEvidence`, such as 看明细, 明细卡, 明细分析视角, 下钻明细, 记录明细, 列表卡, 样本卡, 日志卡, 审计明细, 操作记录, 样本追踪, or "具体数据是什么 / 能否下钻查看".

The supplied images are reusable inspiration, not durable assets. The durable knowledge is this text contract: a text-only downstream agent must be able to recreate the design strength from the detail task, row grain, controlled pattern fields, slot budgets, and acceptance gates without relying on raw image paths.

## 1. Scope And Source Of Truth

- Component family: detail-evidence cards that package row proof, drilldown context, exact records, sample trails, operational logs, and local detail actions.
- Analysis perspective: `analysisPerspective: detailEvidence`.
- Applicable pages: detail reports, KPI dashboards with drilldown proof, operating ledgers, order/customer/product detail pages, sample/testing reports, audit/security/log pages, task scheduling reports, and card galleries for 明细分析视角.
- Source hierarchy: company UI baseline -> report design system -> Modern SaaS BI style contract when requested -> table/list/detail placement rules -> this detail-evidence standard -> project data/API contract.
- Supporting mapping references: `report-info-component-mapping` `references/00-analysis-perspective-card-taxonomy.md`, `report-info-component-mapping` `references/06-binding-implementation-contract.md`, `report-info-component-mapping` `references/08-generation-stability.md`, and `report-info-component-mapping` `references/09-component-mapping-gates.md`.
- Supporting style references: `report-component-style-design` `references/06-analytical-tables.md`, `report-component-style-design` `references/06c-table-card-patterns.md`, `report-component-style-design` `references/07-cards-lists-tasks.md`, `report-component-style-design` `references/07b-operational-list-status-patterns.md`, `report-component-style-design` `references/10-in-component-controls.md`, `report-component-style-design` `references/12f4-placement-detail-table.md`, `report-component-style-design` `references/12-component-acceptance-gates.md`, and `report-design-system-governance` `references/12-modern-saas-bi-style-contract.md`.
- Renderers: project card shell, Element Plus/project table for ordinary row-level detail, AntV S2 only for pivot/cross/wide analytical detail, ECharts only for bounded metric trend or composition evidence, project list/timeline components for compact rows, and drawer/fullscreen/detail route for full evidence.
- Supported viewports: compact row/list preview `360x220+`; standard detail table card `640x300+`; metric/trend detail card `720x300+`; hierarchy drilldown card `720x320+`; sample/log card `640x300+`; task timeline/detail card `720x360+`.
- Owner/version/status: report-component-design-spec / v1 / ready for reusable spec adoption.

## 2. Why These Designs Feel Designed

The samples feel strong because they turn "show me details" into trustworthy product evidence instead of decorative card variety.

1. Row grain is explicit. The user can tell whether one row is an order, product, customer, sample, log event, task, region node, or related report.
2. Each card answers one detail job. Table cards prove records, trend cards explain value movement before drilldown, share cards show where to drill, hierarchy cards show parent-child context, sample cards prove a workflow, and log cards support audit.
3. Exact values remain first-class. IDs, times, amounts, statuses, counts, IPs, sample numbers, and action links are visible or reachable through tooltip, row detail, export, drawer, or fullscreen.
4. UI controls are local and modest. Date, status, sample type, "下钻查看", "查看详情", and refresh/export controls sit in the card header and do not impersonate page-global filters.
5. Density is engineered. Header, metric strip, table body, list rows, pagination, and footers have visible budgets; the body never becomes a decorative two-row table.
6. The visual rhythm is enterprise-realistic: optional light analytical surfaces, reduced uniform borders, small radius, light shadows only when useful, calm dividers, compact tags, muted metadata, and tabular numerals.
7. Visual variety follows data shape. Donut means structure, line/area means trend, table means exact audit, tree row means hierarchy, timeline/stepper means ordered process, and metric strip means summary context.
8. Status is semantic, not ornamental. Success, failure, warning, pending, processing, abnormal, high-risk, and completed states map to dictionaries and allowed actions.
9. The designs tolerate operational reality. They show negative states, failures, long names, pagination, partial rows, hidden detail, and permission-sensitive actions.
10. The "no AI smell" comes from product specificity: domain vocabulary, row identity, default sort, source/freshness, detail routes, and bounded density. It does not come from gradients, glass, large icons, perfect generic copy, or unrelated mini charts.

## 3. Controlled Pattern Field

Use `detailEvidenceCardPattern` when a card packages detail context, exact row evidence, local controls, drilldown/export/action path, and fallback. Keep `visualType` as the real renderer family: `table`, `pivot`, `operational-list`, `metric-card`, `composition-card`, `line`, `pie`, `overlay-panel`, or `other`. Do not invent a generic visual shell that hides the actual evidence type.

```ts
type DetailEvidenceCardPattern =
  | 'summary-detail-table-card'
  | 'metric-trend-detail-card'
  | 'composition-drilldown-card'
  | 'hierarchy-drilldown-card'
  | 'record-list-detail-card'
  | 'object-media-detail-list-card'
  | 'subject-initial-list-card'
  | 'sample-basic-info-card'
  | 'sample-process-trace-card'
  | 'sample-result-overview-card'
  | 'sample-related-record-card'
  | 'log-summary-table-card'
  | 'access-log-table-card'
  | 'security-audit-log-card'
  | 'task-timeline-detail-card';
```

Recommended mapping:

```ts
analysisPerspective: 'detailEvidence'
secondaryAnalysisPerspectives?: [
  'trendMovement' | 'compositionShare' | 'processBottleneck' | 'anomalyRisk' | 'dataQualityTrust'
]
componentType: 'card' | 'table' | 'custom'
visualType: 'table' | 'pivot' | 'operational-list' | 'metric-card' | 'composition-card' | 'line' | 'pie' | 'overlay-panel' | 'other'
detailEvidenceCardPattern: DetailEvidenceCardPattern
detailEvidenceBinding: DetailEvidenceBinding
styleGeneralization.textOnlyReproduction: true
```

## 4. Pattern Selection

| User phrase / data shape | `detailEvidenceCardPattern` | Real renderer / supporting pattern | Minimum useful size |
| --- | --- | --- | --- |
| 表格明细 + 汇总, 订单/交易/记录明细 | `summary-detail-table-card` | `visualType: table`, `tableCardPattern: plain-detail-ledger-table` or `filtered-operational-status-table` | `640x300`; `4-6` rows |
| 指标明细 + 趋势, 指标值能否下钻 | `metric-trend-detail-card` | `visualType: metric-card` plus bounded line/area evidence | `720x300`; chart body `>=180px` |
| 分组明细 + 占比, 渠道/类型结构下钻 | `composition-drilldown-card` | `compositionShareCardPattern` plus row-level drill list/table | `640x300`; `2-5` categories |
| 层级明细, 区域/组织/科目树, 可展开下钻 | `hierarchy-drilldown-card` | `tableCardPattern: tree-hierarchy-table` or hierarchy list | `720x320`; visible depth `<=4` |
| 普通列表明细, 操作型记录卡 | `record-list-detail-card` | `listStatusPattern: simple-info-list` or `mixed-info-list` | `420x260`; `4-8` rows |
| 商品/对象带图片或缩略图明细 | `object-media-detail-list-card` | table/list with media cell and action column | `640x300`; image `32-48px` |
| 客户/主体首字列表明细 | `subject-initial-list-card` | `listStatusPattern: user-object-list` or light table | `520x300`; avatar/initial `28-36px` |
| 样本基础信息, 样本编号/来源/类型/采集/接收 | `sample-basic-info-card` | project card + compact key-value table | `640x300` |
| 样本流程追踪, 接收/处理/分析/审核/报告 | `sample-process-trace-card` | process stepper/timeline + detail route | `720x300`; steps `3-7` |
| 样本检测结果概览, 指标/参考范围/状态/趋势 | `sample-result-overview-card` | table + status dictionary + trend markers | `640x320`; `3-6` indicators |
| 样本关联患者/检查/报告信息 | `sample-related-record-card` | two-column related-list/table package | `720x320` |
| 系统操作日志, 级别统计 + 日志表 | `log-summary-table-card` | metric strip + filtered table | `720x320`; `4-6` rows |
| 应用访问日志, HTTP 方法/路径/状态/耗时/IP | `access-log-table-card` | filtered operational table | `720x320`; method/status dictionaries |
| 安全审计日志, 风险等级/主体/行为/结果 | `security-audit-log-card` | filtered table + severity dictionary | `720x320` |
| 任务调度日志, 时间线 + 任务详情 | `task-timeline-detail-card` | timeline/list + side detail panel | `720x360`; visible events `4-7` |

Selection order:

1. If the user must audit exact rows, choose `summary-detail-table-card` or a log/sample table variant.
2. If the user needs a value plus recent movement before drilling into rows, choose `metric-trend-detail-card`.
3. If the user needs to choose a category to drill into, choose `composition-drilldown-card`.
4. If the data has parent-child structure and row values matter, choose `hierarchy-drilldown-card`.
5. If compact workflow scanning is enough and full table behavior is unnecessary, choose a list pattern.
6. If the domain is sample/testing/lab, choose the sample-specific pattern that matches identity, process, results, or related records.
7. If the domain is audit/log/security/task execution, choose the log/task pattern and require time/status/action proof.
8. If the detail body becomes too dense, split to a full table/detail page or drawer before shrinking text, rows, or chart plot below the useful floor.

## 5. Evidence Binding

Every implementation-ready detail-evidence card must declare `detailEvidenceBinding`.

```ts
type DetailEvidenceTask =
  | 'record-audit'
  | 'row-lookup'
  | 'metric-drilldown'
  | 'composition-drilldown'
  | 'hierarchy-drilldown'
  | 'sample-identity'
  | 'sample-process'
  | 'sample-result'
  | 'sample-related-record'
  | 'log-audit'
  | 'access-trace'
  | 'security-audit'
  | 'task-execution-trace';

type DetailEvidenceBinding = {
  detailTask: DetailEvidenceTask;
  sourceDataset: string;
  rowGrain: 'record' | 'order' | 'transaction' | 'product' | 'customer' | 'sample' | 'log-event' | 'task' | 'hierarchy-node' | string;
  primaryKeyField: string;
  identityFields: string[];
  timeFields?: string[];
  metricFields?: string[];
  statusFields?: string[];
  statusDictionary?: string[];
  severityField?: string;
  actionFields?: string[];
  hierarchyFields?: {
    nodeIdField: string;
    nodeNameField: string;
    parentIdField?: string;
    levelField?: string;
    hasChildrenField?: string;
    defaultExpandedDepth?: number;
  };
  tableFields?: {
    columnMetadataRef: string;
    defaultSort: string;
    visibleColumnCount: number;
    visibleRowCount: number;
    paginationOrScroll: string;
    fixedColumns?: string[];
  };
  listFields?: {
    titleField: string;
    secondaryTextFields: string[];
    visibleRowCount: number;
    rowHeightPx: number;
    sortRule: string;
  };
  localControlIds?: string[];
  activeFilterIds: string[];
  sourceFreshnessFields?: string[];
  numericFormatContractIds?: string[];
  tooltipPayload: string[];
  rowDetailRoute?: string;
  drilldownRoute?: string;
  exportRoute?: string;
  rendererOwner:
    | 'element-plus'
    | 'project-table'
    | 'antv-s2'
    | 'echarts'
    | 'project-list'
    | 'project-card'
    | 'project-custom';
  densityLimit: string;
  fallback: string;
  validationCases: string[];
};
```

Rules:

- `rowGrain`, `primaryKeyField`, `defaultSort`, and exact-value route are mandatory for any row-level detail card.
- Table cards must also declare `tableCardPattern`, column metadata, visible row/column budgets, pagination or scroll, row detail/action payload, and export behavior when export is visible.
- List/timeline cards must also declare `listStatusPattern`, visible row count, row height, sort rule, status/severity dictionary when statuses are visible, and table/detail fallback.
- Trend and composition detail cards must bind the primary metric/category evidence and still expose row-level drilldown or exact-value route.
- Sample cards must expose sample id, source/type, collection/receive times, status dictionary, result fields or process step fields, and related record routes.
- Log cards must expose event time, actor/source, operation/request/action, target object, result/status, source IP/device/system when visible, and retention/export permission behavior.
- Component-local controls must not silently change page-level permission, backend aggregation, table schema, export scope, or sibling components.

## 6. Sample Coverage Matrix

| Supplied sample role | Reusable abstraction | Pattern coverage | Style generalization status |
| --- | --- | --- | --- |
| 明细卡布局方案: table summary, metric trend, group share, hierarchy drilldown | One detail perspective can shift between row proof, trend proof, composition drill, and hierarchy drill | `summary-detail-table-card`, `metric-trend-detail-card`, `composition-drilldown-card`, `hierarchy-drilldown-card` | `covered-by-composed-patterns` |
| 列表卡布局方案: order table, product media table, customer list, operation log | Detail evidence can be table-heavy or compact list-heavy according to audit vs scan needs | `summary-detail-table-card`, `object-media-detail-list-card`, `subject-initial-list-card`, `log-summary-table-card` | `covered-by-composed-patterns` |
| 样本卡布局方案: sample identity, process trace, result overview, related records | Sample detail needs identity -> process -> result -> related evidence, not generic cards | `sample-basic-info-card`, `sample-process-trace-card`, `sample-result-overview-card`, `sample-related-record-card` | `covered-by-existing-pattern` with detail extension |
| 日志卡布局方案: operation log, access log, security audit, task timeline | Log detail needs event grain, status/severity dictionaries, source/time proof, and action/detail route | `log-summary-table-card`, `access-log-table-card`, `security-audit-log-card`, `task-timeline-detail-card` | `covered-by-existing-pattern` with detail extension |

Style generalization contract:

```ts
styleGeneralization: {
  sourceRole: 'reusable-inspiration',
  generalizationStatus: 'covered-by-composed-patterns',
  canonicalPatternRef: 'report-component-design-spec/references/16-detail-evidence-card-standard.md',
  patternFields: ['detailEvidenceCardPattern', 'detailEvidenceBinding', 'tableCardPattern', 'listStatusPattern'],
  componentFamily: 'detail-evidence-card',
  businessTrigger: '看明细 / inspect exact records, samples, logs, and drilldown proof',
  dataShapeTrigger: 'row-grain records or bounded detail evidence with identity, time, status, metric fields, and exact-value route',
  adaptiveVariables: ['detailTask', 'rowGrain', 'visibleRows', 'visibleColumns', 'statusDictionary', 'localControls', 'drilldownDepth', 'rendererOwner'],
  minContainer: '360x220 compact; 640x300 table/sample; 720x320 hierarchy/log; 720x360 timeline/detail',
  responsiveFallback: ['collapse local controls', 'reduce metric strip', 'hide low-priority columns', 'Top N rows', 'drawer/detail/fullscreen', 'split chart and table'],
  rendererOwner: 'project card + project table/Element Plus/S2/list/ECharts according to real evidence body',
  textOnlyReproduction: true
}
```

## 7. Anatomy

Required slots:

- Header: pattern label/title, optional sequence badge, local filter/action area, and optional source/freshness tooltip.
- Scope context: period, object, source, status scope, permission scope, or active filter summary when relevant.
- Evidence anchor: table/list/timeline/hierarchy/metric trend/composition body selected by `detailEvidenceCardPattern`.
- Row identity: stable primary key and business display field.
- Status/action: status dictionary, detail link, drilldown, export, refresh, retry, or task action when visible.
- Exact-value path: tooltip, row drawer, full table, export, linked detail page, or fullscreen.
- State surface: loading, empty, filtered-empty, error, no-permission, stale, long text, too many rows/columns, missing fields.

Optional slots:

- Metric strip with at most `3` context values such as total rows, selected count, amount sum, abnormal count, or average.
- One compact chart when the chart explains the row detail, such as trend before drilldown or category share before drilldown.
- Related record panel when a domain object needs adjacent evidence.
- Timeline side detail panel when a selected event/task owns the detail.

Forbidden slots:

- Raw screenshot or image path as the durable style source.
- Generic "智能明细分析" copy without row grain, primary key, or detail route.
- Component-level controls that duplicate global filters, shell refresh/export, or template toolbar actions.
- Decorative icons, gradients, glass, or empty illustrations that compete with row evidence.
- Charts that replace exact-value tasks when rows, export, or audit proof are required.
- More than one primary evidence body in a compact card unless the card is a governed Composite Panel or Micro Dashboard Card.

## 8. Placement And Fit

Use:

```text
W = card width
H = card height
P = clamp(16px, W * 0.025, 24px)
CW = W - 2P
CH = H - 2P
headerH = 36-52px
metricStripH = 0-48px
footerH = 0-32px
bodyH = CH - headerH - metricStripH - footerH - gaps
```

General budgets:

- Detail table body should remain dominant: `bodyH >= CH * 0.55` and visible rows `>=4` by default.
- Compact table/list previews may show `3` rows only when a visible detail route exists.
- Visible table columns default to `5-8`; large cards may show `8-12`; more columns need horizontal scroll, frozen identity column, column settings, drawer, fullscreen, or split page.
- Metric strips are capped at `3` context values and must not push the table/list below useful row count.
- Component-local filters stay in the header right side. Collapse secondary controls before compressing title, table header, chart plot, or pagination.
- Chart + table/list composite detail cards must pass both floors: chart body `>=180px` and preview rows `>=3`; otherwise move one surface to drawer/tab/detail.

Pattern-specific budgets:

| Pattern family | Body budget |
| --- | --- |
| Table detail | Header `36-44px`; row height `32-44px`; visible rows `4-6`; pagination `32-40px` when present |
| Record/object list | Row height `44-62px`; visible rows `4-8`; trailing action column stable |
| Sample basic/result | Key-value facts `2` columns when `W>=640px`; result table rows `3-6`; status tags `20-24px` |
| Process/sample trace | Visible steps `3-7`; current/selected step emphasized; exact step values in tooltip/detail |
| Hierarchy detail | Depth `<=4` visible; expand/collapse icons before label; indentation `16-20px` |
| Log/security table | Time column `140-180px`; status/severity badge `80-120px`; IP/source/action columns visible or in drawer |
| Task timeline/detail | Time rail `88-120px`; event rows `56-78px`; side detail min width `260px`; use stack/drawer when narrow |

Responsive fallback order:

1. Remove nonessential badge/icon emphasis.
2. Collapse secondary local controls into dropdown or more menu.
3. Remove metric strip except one primary context value.
4. Hide low-priority columns with tooltip/column settings/detail route.
5. Reduce list/table to Top or latest rows with clear `查看全部`.
6. Move charts, related records, or side detail into tab/drawer/fullscreen.
7. Split into a full detail table page when audit/export is the main task.

## 9. Visual And Interaction Rules

Visual rules:

- Inherit enterprise/report tokens. State component-specific extensions only when needed.
- Use quiet light page surfaces, optional white analytical surfaces, reduced uniform borders, `6-8px` radius unless inherited tokens differ, and restrained shadows only when useful.
- Header hierarchy stays compact: title `14-16px`, helper/source text `12px`, controls `28-32px`, body text `12-14px`.
- Numeric cells use tabular numerals and right alignment. Ordinary values remain neutral; reserve color for change, risk, status, severity, selection, or action.
- Tags use weak semantic fills. Do not turn every field into a badge.
- Row hover/focus uses stable light background, outline, or in-bounds glow; it must not move row height or table geometry.
- Dividers and header backgrounds are weak. The data hierarchy, not decoration, should carry the design.

Interaction rules:

- `下钻查看`, `查看详情`, `查看全部`, `导出`, and row actions must preserve active filters, period, sort, pagination, selected row, and permission scope.
- Row click and action-column click must not double-trigger. Event payload must include primary key, row grain, active filters, and permission scope.
- Export must follow the same filters, sort, columns, permission scope, and selected granularity as the visible detail unless an exception is declared.
- Timeline/stepper selection updates detail without resizing the parent card.
- Component-local filters are scoped to the current card or declared local group. Schema-changing perspective switches are not ordinary filters.

## 10. State Rules

Required states:

- Loading: preserve header, metric strip, table/list/timeline body, and pagination geometry.
- Empty: show `暂无明细数据` or domain-specific empty copy and keep the body area.
- Filtered-empty: name the filter condition and provide reset/detail path when supported.
- Error: name the failed detail dataset and retry action when available.
- No permission: hide restricted values, row counts, source names, object names, and export if they are not allowed.
- Stale data: expose update time/source and avoid current-state wording when freshness is expired.
- Long text: use one-line or two-line reserved height plus tooltip/detail; no silent clipping of primary key, names, status, or action text.
- Too many rows/columns: use pagination, virtual scroll, column settings, drawer, export, or fullscreen.
- Missing fields: show `--` for missing, keep real zero as `0`, and expose missing-source note when critical.

## 11. Anti-AI Gate

Reject or keep readiness `partial` when:

- `RPT-DETAIL-PATTERN-MISSING`: a 看明细 card lacks `analysisPerspective: detailEvidence` or `detailEvidenceCardPattern`.
- `RPT-DETAIL-ROW-GRAIN-MISSING`: row grain, primary key, default sort, or identity fields are missing.
- `RPT-DETAIL-EXACT-PATH-MISSING`: hidden/abbreviated values, tables, logs, samples, or hierarchy nodes have no tooltip/detail/drawer/export route.
- `RPT-DETAIL-STATUS-DICT-MISSING`: status, severity, result, task, or log levels appear without raw value dictionary, display label, semantic color, and allowed action.
- `VIS-DETAIL-DENSITY-UNBOUNDED`: rows, columns, statuses, categories, steps, or child records exceed the visible budget without pagination, scroll, collapse, drawer, or fullscreen.
- `VIS-DETAIL-TABLE-SQUEEZED`: table/list body has fewer than useful rows, unreadable columns, clipped action text, or chart/list competition that reduces proof.
- `VIS-DETAIL-DUPLICATE-CONTROL`: card controls duplicate template-owned refresh/export/global filters or silently change page/global scope.
- `VIS-DETAIL-AI-POLISH`: the card looks polished through gradients, glass, generic icons, oversized radius, decorative charts, or slogan copy while missing row proof.

Repair rule:

```text
one detail task -> row grain + primary key -> bounded evidence body -> exact route -> states -> local action/export
```

## 12. Rule Strength And Proof Matrix

| Rule | Strength | Proof method | Failure ID |
| --- | --- | --- | --- |
| Detail cards declare `analysisPerspective: detailEvidence`, `detailEvidenceCardPattern`, and `detailEvidenceBinding`. | MUST/fail | Binding matrix or component config | `RPT-DETAIL-PATTERN-MISSING` |
| Row-level cards declare row grain, primary key, identity fields, default sort, and active filter scope. | MUST/fail | Data contract review | `RPT-DETAIL-ROW-GRAIN-MISSING` |
| Hidden values, long text, truncated cells, drill nodes, sample results, and log rows expose tooltip/detail/drawer/export route. | MUST/fail | Interaction contract review | `RPT-DETAIL-EXACT-PATH-MISSING` |
| Tables/lists/timelines declare visible row/column/step budgets and overflow strategy. | MUST/fail | Slot budget and config review | `VIS-DETAIL-DENSITY-UNBOUNDED` |
| Local controls affect only the current card or declared local group and preserve export/detail context. | MUST/fail | Control semantics review | `VIS-DETAIL-DUPLICATE-CONTROL` |
| Status/severity/result values map to dictionaries with semantic color, icon/text, meaning, terminal flag, and allowed actions. | MUST/fail | Status dictionary review | `RPT-DETAIL-STATUS-DICT-MISSING` |
| Light-surface SaaS/UI Kit style uses inherited tokens, reduced uniform borders, small radius, restrained shadows, muted tables, and documented brand/status accents. | SHOULD/exception-required | Style token review | `VIS-DETAIL-AI-POLISH` |
| Optional metric strips stay `<=3` values and do not squeeze the detail body below useful row count. | SHOULD/exception-required | Geometry budget review | `VIS-DETAIL-TABLE-SQUEEZED` |

## 13. Acceptance Checklist

- `analysisPerspective` is `detailEvidence`.
- `detailEvidenceCardPattern` is one of the controlled values in this standard.
- `detailEvidenceBinding` declares detail task, source dataset, row grain, primary key, identity fields, active filters, tooltip payload, renderer owner, density limit, fallback, and validation cases.
- The real `visualType` and renderer are preserved: table/pivot/list/metric/composition/timeline/log body, not a generic decorative shell.
- Table cards declare `tableCardPattern`, column metadata, visible rows/columns, default sort, pagination/scroll, row action/detail/export, and states.
- List/timeline cards declare `listStatusPattern`, visible row count, row height, sort rule, status dictionary, action payload, overflow strategy, and table/detail fallback.
- Trend/composition/hierarchy cards still expose exact row-level drilldown or detail route.
- Local controls have correct `controlSemantics`, `componentSchemaImpact`, selected state, keyboard/focus behavior, and data effect.
- Loading, empty, filtered-empty, error, no-permission, stale, long text, missing fields, and dense data states preserve geometry.
- The sample-derived style can be reproduced from this text contract without retaining raw screenshots.
