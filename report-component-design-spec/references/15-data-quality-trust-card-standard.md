# Data Quality Trust Card Standard

Use this standard when a report, dashboard, BI page, or reusable component library asks for `analysisPerspective: dataQualityTrust`, such as 看质量, 数据质量卡, 数据质量分析, 完整性卡, 准确性卡, 一致性卡, 及时性卡, 唯一性卡, 异常数据卡, 问题样例卡, 字段质量卡, 规则校验卡, 数据源可信度, or "数据靠不靠谱".

The supplied images are reusable inspiration, not durable assets. The durable knowledge is this text contract: a text-only downstream agent must be able to recreate the design strength from the quality task, data grain, controlled pattern fields, slot budgets, and acceptance gates without relying on raw image paths.

## 1. Scope And Source Of Truth

- Component family: data-quality trust cards that explain whether data is usable, complete, accurate, timely, unique, consistent, and traceable.
- Analysis perspective: `analysisPerspective: dataQualityTrust`.
- Applicable pages: quality dashboards, BI trust panels, data governance reports, source-table audit pages, metric validation pages, ETL/batch monitoring pages, and report sections that must prove data credibility before business interpretation.
- Source hierarchy: company UI baseline -> report design system -> Modern SaaS BI style contract when requested -> this data-quality trust standard -> project data-quality rule catalog.
- Primary mapping references: `$report-info-component-mapping` `references/00-analysis-perspective-card-taxonomy.md`, `$report-info-component-mapping` `references/06-binding-implementation-contract.md`, `$report-info-component-mapping` `references/08-generation-stability.md`, and `$report-info-component-mapping` `references/09-component-mapping-gates.md`.
- Supporting style references: `$report-component-style-design` `references/04a-kpi-card-patterns.md`, `$report-component-style-design` `references/05d-basic-chart-card-patterns.md`, `$report-component-style-design` `references/07c-composition-share-cards.md`, `$report-component-style-design` `references/07f-anomaly-risk-warning-outlier-cards.md`, `$report-component-style-design` `references/06c-table-card-patterns.md`, `$report-component-style-design` `references/10-in-component-controls.md`, and `$report-component-style-design` `references/12-component-acceptance-gates.md`.
- Renderers: project card components for the shell, Element Plus/project controls for segmented controls/dropdowns/tooltips/drawers, ECharts for trend/donut/radar/bar evidence, and project table/S2 renderer for issue samples, rules, fields, and source audits.
- Supported viewports: summary score card `360x240+`; trend/composition card `520x300+`; dimension/rule table `640x320+`; exception sample table `720x340+`; key-field grid `680x300+`.
- Owner/version/status: report-component-design-spec / v1 / ready for reusable spec adoption.

## 2. Why These Samples Feel Designed

The sample family feels designed because the visual style is tied to a trust workflow, not to generic dashboard polish.

1. One trust question owns each card. The cards answer "overall trust", "which dimension is weak", "which issue type dominates", "which field/rule failed", or "which rows prove the problem". They do not use chart variety as decoration.
2. Quality grain is explicit. Tables, fields, rules, records, issue types, batches, and sources are named, so the viewer knows whether the card judges a dataset, a field, a rule, or a row sample.
3. The primary value has a denominator. A score, rate, exception count, pass count, or issue share is paired with total records, checked rows, expected fields, rule count, or batch time. That denominator is why the card feels credible.
4. Visual hierarchy follows diagnosis. Score/ring first, then trend or structure, then sample/detail/action. The user can judge status, locate the weak dimension, and inspect exact records.
5. Visual variety is controlled by data shape. Ring means trust score, line means quality movement, radar means dimensions on a shared scale, donut means issue composition, table means exact row/rule evidence, and field tiles mean key-field coverage.
6. Local controls are small and scoped. Switches such as 按表/按字段, 按规则/按时间, or 近7天 affect only the current card or local group. They do not silently change page-global scope.
7. Light-surface UI language is restrained. Optional analytical surfaces, reduced uniform borders, small radius, subtle shadow only when useful, compact controls, muted metadata, and sparse charts keep attention on quality evidence.
8. Semantic color is not decorative. Green means pass/trusted, red means invalid/error/high severity, orange means warning/needs review, blue means current selection/info, gray means unknown/unchecked.
9. The design tolerates dirty reality. Missing values, zero denominators, stale sources, partial batches, permission-limited rows, long field names, and repeated issue types have display rules.
10. The "no AI smell" comes from domain vocabulary, denominator proof, freshness/source details, and drilldown paths. It does not come from gradients, glass, oversized icons, perfect smooth lines, or generic "智能质量分析" copy.

## 3. Controlled Pattern Field

Use `dataQualityTrustCardPattern` when one card packages data-quality context, evidence, trust metadata, exact-value path, and fallback.

```ts
type DataQualityTrustCardPattern =
  | 'quality-score-overview-card'
  | 'quality-trend-card'
  | 'quality-dimension-radar-card'
  | 'quality-issue-composition-card'
  | 'quality-dimension-table-card'
  | 'quality-field-distribution-card'
  | 'quality-rule-accuracy-card'
  | 'quality-exception-sample-table-card'
  | 'quality-key-field-grid-card'
  | 'quality-source-freshness-card'
  | 'quality-reconciliation-card'
  | 'quality-action-closure-card';
```

Recommended mapping:

```text
analysisPerspective: dataQualityTrust
componentType: card | chart | table | custom
visualType: data-quality-card | metric-card | line | pie | radar | table | operational-list
dataQualityTrustCardPattern: DataQualityTrustCardPattern
dataQualityEvidenceBinding: DataQualityEvidenceBinding
```

Keep `visualType` as the real evidence family when the card is a standalone chart/table. Use `visualType: data-quality-card` when the component packages the quality task, scope, denominator, evidence body, freshness, and drill path inside one card.

## 4. Pattern Selection

| User phrase / data shape | `dataQualityTrustCardPattern` | Main evidence body | Minimum useful size |
| --- | --- | --- | --- |
| 整体质量怎么样, 数据靠不靠谱 | `quality-score-overview-card` | score/ring/gauge + `2-5` dimension metrics | `360x240` |
| 质量最近怎么变 | `quality-trend-card` | line/area trend + issue or pass-rate strip | `520x300` |
| 完整性/准确性/一致性/及时性/唯一性一起看 | `quality-dimension-radar-card` | radar or dimension score polygon + table fallback | `520x320` |
| 问题类型/异常类型占比 | `quality-issue-composition-card` | donut/percent bars + exact legend | `520x300` |
| 各质量维度分数、状态、趋势 | `quality-dimension-table-card` | dimension matrix/table with trend/status | `640x320` |
| 按字段看缺失、错误、重复、异常值 | `quality-field-distribution-card` | field ranking/table/bar list | `640x320` |
| 按规则组/校验规则看准确率 | `quality-rule-accuracy-card` | rule table/progress bars/pass count | `640x320` |
| 查看最新异常样例/问题明细 | `quality-exception-sample-table-card` | detail table with row identity and issue rule | `720x340` |
| 关键字段质量卡片组 | `quality-key-field-grid-card` | peer field tiles with value/rate/sparkline | `680x300` |
| 数据源/批次/更新时间可信度 | `quality-source-freshness-card` | freshness/status facts + batch timeline/list | `520x260` |
| 前后端/API/源表数据一致性核验 | `quality-reconciliation-card` | reconciliation summary + mismatch table | `720x340` |
| 问题处置闭环/待处理质量问题 | `quality-action-closure-card` | status donut/list + owner/action route | `520x300` |

Selection order:

1. If the first-read answer is "是否可信", choose `quality-score-overview-card`.
2. If the task is movement over time, choose `quality-trend-card`, with `trendMovement` as secondary perspective.
3. If several quality dimensions share a `0-100` or percentage scale, choose `quality-dimension-radar-card` or `quality-dimension-table-card`; use table when exact dimension audit is primary.
4. If the question is issue-type structure, choose `quality-issue-composition-card`, with `compositionShare` as secondary perspective.
5. If the question names fields, choose `quality-field-distribution-card` or `quality-key-field-grid-card`.
6. If the question names rules or accuracy checks, choose `quality-rule-accuracy-card`.
7. If the user must inspect exact bad rows, choose `quality-exception-sample-table-card`; do not replace it with a chart.
8. If freshness, source, batch, or delayed sync is the trust issue, choose `quality-source-freshness-card`.
9. If values must reconcile between source/API/frontend/report/export, choose `quality-reconciliation-card`.
10. If the question includes owner, status, SLA, or repair progress, choose `quality-action-closure-card`.

## 5. Evidence Binding

Every implementation-ready data-quality card must declare `dataQualityEvidenceBinding`.

```ts
type DataQualityTask =
  | 'overall-score'
  | 'completeness'
  | 'accuracy'
  | 'consistency'
  | 'timeliness'
  | 'uniqueness'
  | 'exception-monitoring'
  | 'field-quality'
  | 'rule-validation'
  | 'source-freshness'
  | 'reconciliation'
  | 'action-closure';

type DataQualityEvidenceBinding = {
  dataQualityTask: DataQualityTask;
  dataObjectType: 'dataset' | 'table' | 'field' | 'record' | 'rule' | 'source' | 'batch' | 'metric' | string;
  datasetId: string;
  sourceDataset: string;
  tableIdField?: string;
  tableNameField?: string;
  fieldIdField?: string;
  fieldNameField?: string;
  ruleIdField?: string;
  ruleNameField?: string;
  batchIdField?: string;
  periodField: string;
  qualityScoreField?: string;
  qualityLevelField?: string;
  statusField?: string;
  statusDictionary?: string[];
  checkedRecordCountField?: string;
  totalRecordCountField?: string;
  expectedRecordCountField?: string;
  passedRecordCountField?: string;
  failedRecordCountField?: string;
  missingCountField?: string;
  errorCountField?: string;
  duplicateCountField?: string;
  exceptionCountField?: string;
  issueTypeField?: string;
  issueSeverityField?: string;
  issueShareField?: string;
  completenessRateField?: string;
  accuracyRateField?: string;
  consistencyRateField?: string;
  timelinessRateField?: string;
  uniquenessRateField?: string;
  passRateField?: string;
  denominatorPolicy:
    | 'expected-records'
    | 'checked-records'
    | 'non-null-required-fields'
    | 'rule-evaluations'
    | 'source-api-frontend-reconciliation'
    | 'declared-custom';
  formulaRefs: string[];
  dimensionFields?: Array<{
    dimensionId: string;
    dimensionName: string;
    valueField: string;
    denominatorField: string;
    statusField?: string;
    thresholdRule?: string;
  }>;
  trendFields?: {
    datasetId: string;
    timeField: string;
    valueField: string;
    issueCountField?: string;
    baselineValueField?: string;
    thresholdField?: string;
  };
  ruleFields?: {
    ruleGroupField?: string;
    ruleExpressionField?: string;
    passedCountField?: string;
    failedCountField?: string;
    totalCheckCountField?: string;
    ruleOwnerField?: string;
  };
  sampleFields?: {
    rowIdField: string;
    issueValueField?: string;
    issueTypeField: string;
    ruleField?: string;
    sourceValueField?: string;
    expectedValueField?: string;
    observedValueField?: string;
  };
  sourceFreshnessFields?: {
    sourceSystemField?: string;
    loadBatchField?: string;
    expectedUpdateAtField?: string;
    actualUpdateAtField?: string;
    delayMinutesField?: string;
    freshnessStatusField?: string;
  };
  reconciliationFields?: {
    sourceValueField: string;
    apiValueField?: string;
    frontendValueField?: string;
    reportValueField?: string;
    diffValueField: string;
    diffRateField?: string;
    toleranceRule: string;
  };
  responseFields?: {
    ownerField?: string;
    actionField?: string;
    actionStatusField?: string;
    dueAtField?: string;
    resolvedAtField?: string;
    slaField?: string;
  };
  numericFormatContractIds: string[];
  localControlIds?: string[];
  tooltipPayload: string[];
  exactValueRoute?: string;
  detailTableRoute?: string;
  sourceLineageRoute?: string;
  validationCases: string[];
};
```

Rules:

- A quality rate is invalid without a numerator, denominator, denominator policy, and formula reference.
- Completeness, accuracy, consistency, timeliness, and uniqueness must not share one generic "quality rate" formula unless the rule catalog declares identical logic.
- A score such as `92/100` must declare score range, threshold bands, status dictionary, and calculation basis.
- Issue composition must reconcile to a declared total issue count; use `Top N + 其他` when issue types exceed the visible budget.
- Rule accuracy cards must expose rule id/name, rule group, pass/fail counts, and rule expression or dictionary route.
- Exception sample tables must expose row identity, issue value, issue type, rule, period, source, and detail/export route.
- Freshness cards must distinguish no data, delayed data, partial batch, stale source, and no-permission states.
- Reconciliation cards must declare tolerance and compare the same metric, grain, period, and filter scope.
- Quality action cards must expose owner/action/status or downgrade to a passive quality evidence card.

## 6. Sample Coverage Matrix

| Supplied sample role | Reusable abstraction | Pattern coverage | Style generalization status |
| --- | --- | --- | --- |
| 数据质量卡布局方案: overall score, trend, radar/table dimensions, issue distribution | Trust score plus trend plus dimension/issue evidence | `quality-score-overview-card`, `quality-trend-card`, `quality-dimension-radar-card`, `quality-issue-composition-card` | `covered-by-composed-patterns` |
| 异常数据卡布局方案: abnormal overview, trend, distribution, sample table | Exception count, issue type distribution, exact bad rows | `quality-issue-composition-card`, `quality-exception-sample-table-card`; secondary `anomalyRisk` uses `anomalyAnalysisCardPattern` | `covered-by-composed-patterns` |
| 准确性卡: table/rule accuracy, trend, distribution, rule group table | Accuracy rate by table/rule/field with pass/fail proof | `quality-rule-accuracy-card`, `quality-dimension-table-card`, `quality-trend-card`, `quality-field-distribution-card` | `covered-by-existing-pattern` |
| 完整性卡: completeness overview, trend, distribution, key-field grid | Required-field completeness and field-level rates | `quality-score-overview-card`, `quality-trend-card`, `quality-field-distribution-card`, `quality-key-field-grid-card` | `covered-by-existing-pattern` |

Style generalization contract:

```ts
styleGeneralization: {
  sourceRole: 'reusable-inspiration',
  generalizationStatus: 'covered-by-composed-patterns',
  canonicalPatternRef: '$report-component-design-spec/references/15-data-quality-trust-card-standard.md',
  patternFields: ['dataQualityTrustCardPattern', 'dataQualityEvidenceBinding'],
  componentFamily: 'data-quality-trust-card',
  businessTrigger: '看质量 / data trust before analysis',
  dataShapeTrigger: 'dataset/table/field/rule/batch quality metrics with denominator, freshness, issue, and exact-value evidence',
  adaptiveVariables: ['qualityTask', 'dataObjectType', 'scoreScale', 'dimensionCount', 'issueTypeCount', 'ruleCount', 'fieldCount', 'sampleRowCount', 'localControls'],
  minContainer: '360x240 summary; 520x300 chart; 640x320 table; 720x340 sample/reconciliation',
  responsiveFallback: ['reduce support metrics', 'collapse local controls', 'Top N + other', 'move exact rows to table/drawer/fullscreen', 'split chart and table'],
  rendererOwner: 'project card + ECharts for chart evidence + project table/S2 for exact audit',
  textOnlyReproduction: true
}
```

## 7. Anatomy

Required slots:

- Header: quality task title, info tooltip, optional local control, optional detail/menu action.
- Scope label: table, field, rule group, source, batch, period, permission scope, or selected filters.
- Trust anchor: score/rate/count/status with unit and denominator note.
- Evidence body: exactly one primary evidence surface selected by `dataQualityTrustCardPattern`.
- Support facts: `2-4` facts such as total rows, checked rows, issue count, failed rules, affected fields, source batch, or update time.
- Exact-value route: tooltip, detail table, drawer, source lineage, export, or row sample route.
- Footer or metadata: source/freshness/version, last update, rule version, or action owner/status when relevant.

Optional slots:

- Index badge when cards are presented as alternatives or pattern gallery examples.
- One component-local control group: period, table/field/rule mode, issue severity, metric basis, or display mode.
- Weak semantic icon for score/status, only if it does not replace labels or data.

Forbidden slots:

- Full-card red/orange/green fill as the main design language.
- More than one primary chart/table body in a normal card.
- Generic copy such as 智能分析, 数据很健康, 建议关注 without affected object, denominator, rule, source, or action.
- Table dumps without row grain, default sort, field priority, status dictionary, and detail/export path.
- Local controls that silently change page/global filters, backend aggregation, permission scope, export scope, or other components.

## 8. Placement And Fit

Use:

```text
W = card width
H = card height
P = clamp(16px, W * 0.035, 24px)
CW = W - 2P
CH = H - 2P
headerH = 36-48px
scopeH = 20-28px
supportStripH = 44-72px
footerH = 28-36px
bodyH = CH - headerH - scopeH - supportStripH - footerH - gaps
```

Global fit rules:

- The trust anchor must be visible in the first scan and must not be pushed off center by local controls or support facts.
- Main evidence body owns at least `48%` of available card height after header/scope/support/footer.
- Header-right controls must not consume more than `45%` of `CW`; collapse controls before shrinking score, chart, or table body.
- Support facts default to `2-4`; more facts move to tooltip, drawer, or detail table.
- Dense issue types, fields, rules, or records require Top N, pagination, internal table scroll, drawer, or fullscreen. Do not compress text below readability.

Pattern floors:

| Pattern group | Minimum fit |
| --- | --- |
| Score/ring overview | score/ring box `>=132x132`, support strip `>=44px`, denominator visible |
| Trend | chart body `>=180px`, plot height `>=120px`, ordered time labels sampled |
| Radar/dimension profile | radar body `>=200x200`, `4-8` dimensions recommended, table fallback for `>8` |
| Issue composition | donut fit `>=150x150`, issue types `2-6` preferred, `<=8` before merge |
| Dimension/rule/field table | table body `>=180px`, visible rows `4-6`, numeric cells right aligned |
| Exception sample/reconciliation table | table body `>=220px`, visible rows `4-6`, row identity and issue/action columns visible |
| Key-field grid | tile `>=112x136`, visible tiles `3-6`, peer tiles share value/footer baseline |

Fallback order:

1. Collapse optional index/icon/pattern tag.
2. Collapse local segmented control to dropdown.
3. Reduce support facts to the strongest `2`.
4. Use Top N + `其他` for issue/field/rule structures.
5. Move exact rows to detail table, drawer, fullscreen, or export.
6. Split chart and table into separate cards before squeezing either below its floor.

## 9. Visual And Interaction Rules

Visual rules:

- Inherit report/enterprise tokens. Component-specific styling states only semantic extensions.
- Default bounded surface is white or weak neutral only when needed, with reduced border, small radius, and restrained shadow only when useful.
- Use dividers, soft fills, and spacing for internal groups; do not create card-in-card stacks.
- Green indicates passed/trusted or positive quality; red indicates error/invalid/high severity; orange indicates warning/needs review; blue indicates current selection/info; gray indicates unknown, skipped, or unchecked.
- Do not use color alone for quality status. Add status text, icon, rule label, tooltip, or row detail.
- Charts stay light: restrained axes/gridlines, few permanent labels, semantic series colors, tooltip for exact values.
- Tables use pale header background, weak borders, numeric right alignment, status badges with dictionaries, and row hover without geometry movement.
- Primary copy names data objects and conditions, such as 订单明细表, 手机号字段, 取值范围规则, 近7天, 批次 20240601, rather than generic "质量分析".

Interaction rules:

- Hover/focus reveals numerator, denominator, formula, source, rule version, period, and active filters.
- Click score/dimension/issue/field/rule opens filtered detail with the same period, scope, permission, and rule version.
- Table row click opens row detail or source lineage; export preserves active filters and masks restricted fields.
- Local controls are current-card or local-group scoped. If a control changes metric definitions or table schema, classify it as `componentSchemaImpact: metric-set`, `table-schema`, or `definition-change`.
- Stale selection after filter changes must clear or show stale-selection state.

## 10. States And Realistic Data

Required states:

- Loading: preserve score/body/table geometry.
- Empty: name the active scope and reset action; do not fake a `100%` quality score.
- Filtered-empty: state that no rows matched the filter, separate from perfect quality.
- Error: identify source/rule/batch failure and retry/detail route.
- No-permission: do not leak restricted row counts, field names, table names, issue types, or sample values.
- Stale/partial: show batch/freshness status and whether the card uses partial rows.
- Denominator-zero: show explicit denominator-zero state and hide misleading rates.
- Missing-rule: show rule catalog gap and route to rule definition.
- Dense-overflow: use Top N/table/drawer/fullscreen rather than label collisions.

Realistic sample data should include at least one null/missing value, one failed rule, one duplicated or out-of-range case when relevant, one long table/field name, one delayed or partial batch, one non-default filter state, and one permission-limited state when roles exist.

## 11. Anti-AI Failure Modes

- A card says 数据质量良好 but lacks denominator, source, freshness, rule version, or exact-value route.
- Completion/accuracy rates are shown without numerator/denominator or with incompatible denominator policies.
- The design uses many equal cards, icons, badges, and charts but no trust reading path.
- Donut, radar, line, and tables are all placed in one card as visual variety.
- Every trend is smooth, all scores are high, and no dirty data state exists.
- The sample table is a source dump without row grain, issue type, rule, default sort, and detail route.
- Freshness/source/action is hidden to keep the card visually clean.
- Quality issues are mixed with business anomalies without distinguishing data-quality trust from business performance.
- Green/red/orange fills overpower text, axes, row scanning, or exact values.

## 12. Failure IDs

Use these IDs when accepting, auditing, or repairing data-quality trust cards:

| ID | Fails when | Repair |
| --- | --- | --- |
| `RPT-DQ-PERSPECTIVE-MISSING` | A card claims 看质量 but lacks `analysisPerspective: dataQualityTrust`. | Set the perspective and choose `dataQualityTrustCardPattern`. |
| `RPT-DQ-PATTERN-MISSING` | The card has no controlled data-quality pattern field. | Select `dataQualityTrustCardPattern` from this standard. |
| `RPT-DQ-SCOPE-MISSING` | Table, field, rule, record, batch, source, or metric scope is unclear. | Add `dataObjectType`, dataset/table/field/rule/source fields, and visible scope label. |
| `RPT-DQ-DENOMINATOR-MISSING` | Score/rate/share lacks numerator, denominator, denominator policy, or formula reference. | Add denominator fields, `denominatorPolicy`, formula refs, and numeric format contract. |
| `RPT-DQ-RULE-EVIDENCE-MISSING` | Accuracy/completeness/consistency/timeliness/uniqueness lacks rule id/name/expression/pass-fail proof. | Add rule fields, rule dictionary route, pass/fail counts, and validation cases. |
| `RPT-DQ-SAMPLE-ROUTE-MISSING` | Issues are summarized but exact rows or source lineage cannot be inspected. | Add detail table/drawer/source lineage/export route. |
| `RPT-DQ-FRESHNESS-MISSING` | Source, batch, updated time, stale/partial status, or rule version is absent. | Add freshness/source fields and state rules. |
| `RPT-DQ-ACTION-MISSING` | A repair/closure card has issue status but no owner/action/SLA/detail route. | Add response fields or downgrade to passive evidence. |
| `VIS-DQ-CARD-PILEUP` | Multiple unrelated charts/tables/badges compete inside one card. | Keep one primary evidence body and move secondary evidence to support strip/detail. |
| `VIS-DQ-AI-GENERIC` | The card uses generic SaaS polish or generic copy instead of quality fields and trust proof. | Replace with table/field/rule/batch/source terminology and evidence binding. |
| `VIS-DQ-TRUST-OVERPAINT` | Semantic danger/success colors overpower readability. | Use neutral card surface, soft status tint, and restrained badges. |
| `VIS-DQ-TABLE-DUMP` | A sample/rule/field table is a raw dump without row grain, priority columns, status, sort, action, or states. | Convert to a governed table card or detail drawer with explicit metadata. |

## 13. Rule Strength Matrix

| Rule | Strength | Proof method | Failure ID |
| --- | --- | --- | --- |
| Data-quality cards declare `analysisPerspective`, pattern, and evidence binding. | MUST/fail | Binding matrix or component config | `RPT-DQ-PERSPECTIVE-MISSING`, `RPT-DQ-PATTERN-MISSING` |
| Every visible score/rate/share declares numerator, denominator, denominator policy, formula refs, and numeric format contract. | MUST/fail | Data contract, API/schema, formatter config | `RPT-DQ-DENOMINATOR-MISSING` |
| Quality rule cards expose rule id/name/group, pass/fail counts, rule expression/dictionary route, and validation cases. | MUST/fail | Rule dataset, table config, tooltip/drawer route | `RPT-DQ-RULE-EVIDENCE-MISSING` |
| Issue summaries provide exact row/detail/source-lineage/export path under the same filters and permissions. | MUST/fail | Interaction payload, route config, export scope | `RPT-DQ-SAMPLE-ROUTE-MISSING` |
| Source/freshness/batch/rule-version states are visible or discoverable. | MUST/fail | Metadata fields, UI slots, state cases | `RPT-DQ-FRESHNESS-MISSING` |
| One card owns one primary evidence body. | MUST/fail for implementation-ready cards | Layout contract, screenshot/crop, DOM geometry | `VIS-DQ-CARD-PILEUP` |
| Modern BI visual treatment uses light cards, restrained semantic color, small radius, and lightweight charts. | SHOULD/exception-required | Token mapping and screenshot/crop | `VIS-DQ-AI-GENERIC`, `VIS-DQ-TRUST-OVERPAINT` |
| Key-field tiles share height, value baseline, and footer baseline. | SHOULD/exception-required | CSS/geometry check | `VIS-DQ-CARD-PILEUP` |
| Additional decorative icons, badges, and index labels are allowed only when all trust evidence remains readable. | MAY/optional | Visual review | `VIS-DQ-AI-GENERIC` |

## 14. Acceptance Checklist

- `analysisPerspective: dataQualityTrust` is declared for 看质量, 数据质量, 完整性, 准确性, 异常数据, 字段质量, 规则校验, or source freshness trust cards.
- `dataQualityTrustCardPattern` is selected from the controlled values in this standard.
- `dataQualityEvidenceBinding` declares task, data object type, dataset/source, period, denominator policy, formulas, numeric formats, source/freshness, tooltip payload, exact-value route, and validation cases.
- The card distinguishes data-quality trust from business anomaly/performance analysis. Use `secondaryAnalysisPerspectives` such as `anomalyRisk`, `compositionShare`, `trendMovement`, or `detailEvidence` only when needed.
- The card has one primary evidence body, `2-4` support facts, visible/discoverable freshness, and a detail/source lineage/action route.
- Local controls are component-local or declared local-group scoped and do not silently change page/global scope.
- Empty/loading/error/no-permission/stale/partial/denominator-zero/missing-rule states preserve geometry and avoid data leakage.
- Display budget and fallback are declared before donut/radar/trend/table/field tiles are squeezed.
- The standard is reproducible from text; raw screenshots are not required for future generation.
