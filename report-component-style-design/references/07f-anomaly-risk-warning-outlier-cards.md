# Anomaly, Risk, Warning, And Outlier Analysis Cards

Use this reference when a report/dashboard/BI page needs card-level patterns for 异常分析, 风险分析, 预警分析, 离群点分析, 波动异常, 阈值预警, 影响评估, or 异常处置状态.

The source screenshots are temporary visual evidence. The durable standard is this text contract: the card family must be selectable, implementable, and verifiable without raw image access.

Pair with:

- `04a-kpi-card-patterns.md` when the first-read object is a KPI/status/score/gauge headline.
- `05d-basic-chart-card-patterns.md` and `05e-specialized-chart-card-patterns.md` when the evidence body is a full chart.
- `07b-operational-list-status-patterns.md` when the evidence is an alert/exception list or timeline.
- `07e-distribution-interval-density-cards.md` when the evidence is interval, distribution, density, boxplot, or outlier statistics.
- `09a-flow-hierarchy-diagram-card-patterns.md` when the evidence is relation, dependency, influence, or service impact.
- `10-in-component-controls.md` when the card owns a local severity, period, metric, dimension, or status switch.
- `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` when converting visual samples into text-only contracts.

## Why These Samples Feel Designed

- They are diagnostic lenses, not a random dashboard grid. Each card answers a different question: current severity, trend, distribution, threshold interval, timeline, top affected objects, impact, baseline, relation, geography, or response state.
- The visual variety is controlled by task. Donut means severity share, matrix means risk quadrant, timeline means event order, map means geography, scatter means outliers, relation graph means dependency, and gauge means bounded impact score.
- Every card has a shared product anatomy: numbered badge, concise title, quiet local control, semantic icon/status tile, primary value, one evidence body, `2-4` supporting facts, freshness time, and a detail route.
- The hierarchy is calm. White card surfaces, thin borders, small radius, light shadow, muted metadata, and restrained semantic colors make the data feel product-grade instead of generated.
- The cards carry operational proof: baseline, threshold, affected object, duration, first/updated time, status, owner/action, source/freshness, or detail path. This is why the page does not feel like an AI mockup.
- The copy is domain-specific. Phrases such as 异常数, 波动幅度, 阈值区间, 影响用户, 持续时间, 未恢复, 已处理, 高风险, and 离群点 connect the component to a real monitoring workflow.
- Density is believable. Cards show enough evidence to decide the next action, but avoid piling every KPI, chart, badge, and table into one container.

## Pattern Identity

Use `anomalyAnalysisCardPattern` when one card packages an abnormality/risk/warning/outlier diagnosis with evidence and next-step context.

```ts
type AnomalyAnalysisCardPattern =
  | 'anomaly-overview-card'
  | 'anomaly-trend-compare-card'
  | 'anomaly-distribution-structure-card'
  | 'anomaly-interval-threshold-card'
  | 'anomaly-timeline-card'
  | 'anomaly-ranking-top-card'
  | 'anomaly-impact-assessment-card'
  | 'anomaly-baseline-compare-card'
  | 'anomaly-summary-table-card'
  | 'anomaly-multi-metric-monitor-card'
  | 'risk-matrix-card'
  | 'risk-response-status-card'
  | 'anomaly-relation-influence-card'
  | 'anomaly-geographic-distribution-card'
  | 'outlier-scatter-card'
  | 'warning-progress-donut-card';
```

Recommended mapping:

```ts
componentType: 'card'
visualType: 'anomaly-card'
analysisPerspective: 'anomalyRisk'
anomalyAnalysisCardPattern: one of the controlled values above
anomalyAnalysisEvidenceBinding: required
```

Do not use `anomaly-card` for a bare chart, generic KPI, or decorative alert banner. If the card does not own severity/baseline/threshold/time/status/action evidence, route to the more specific KPI, chart, table, operational-list, distribution-card, or text-summary pattern.

## Sample Coverage

The five supplied visual groups are covered as composed pattern sets:

| Sample role | Covered patterns |
| --- | --- |
| 波动异常卡片组 | `anomaly-overview-card`, `anomaly-trend-compare-card`, `anomaly-distribution-structure-card`, `anomaly-interval-threshold-card`, `anomaly-timeline-card`, `anomaly-ranking-top-card`, `anomaly-impact-assessment-card`, `anomaly-baseline-compare-card` |
| 异常卡片组 | `anomaly-overview-card`, `anomaly-trend-compare-card`, `anomaly-distribution-structure-card`, `anomaly-summary-table-card`, `anomaly-timeline-card`, `anomaly-multi-metric-monitor-card`, `anomaly-relation-influence-card`, `anomaly-geographic-distribution-card` |
| 风险卡片组 | `anomaly-overview-card`, `anomaly-trend-compare-card`, `anomaly-distribution-structure-card`, `risk-matrix-card`, `anomaly-timeline-card`, `anomaly-multi-metric-monitor-card`, `anomaly-impact-assessment-card`, `risk-response-status-card` |
| 预警卡片组 | `anomaly-overview-card`, `anomaly-trend-compare-card`, `anomaly-summary-table-card`, `warning-progress-donut-card`, `anomaly-timeline-card`, `anomaly-interval-threshold-card`, `anomaly-relation-influence-card`, `anomaly-geographic-distribution-card` |
| 离群点卡片组 | `anomaly-overview-card`, `anomaly-trend-compare-card`, `anomaly-distribution-structure-card`, `outlier-scatter-card`, `anomaly-timeline-card`, `anomaly-ranking-top-card`, `anomaly-relation-influence-card`, `anomaly-impact-assessment-card` |

## Pattern Selection

| Business/data trigger | Choose | Evidence body | Required proof |
| --- | --- | --- | --- |
| Need current abnormal/risk/warning state with value and comparison | `anomaly-overview-card` | icon/status tile + primary value + small trend or fact strip | severity/status, current value, baseline, delta, time |
| Need whether abnormality is increasing, reducing, or fluctuating | `anomaly-trend-compare-card` | line/area/bar trend | ordered time, current/baseline series, anomaly marks, tooltip |
| Need severity/category/share structure | `anomaly-distribution-structure-card` | donut, bar, stacked strip, or interval share | category/severity fields, total, share, denominator |
| Need threshold or interval diagnosis | `anomaly-interval-threshold-card` | bucket bars, threshold band, bullet/ruler, interval donut | thresholds or interval bounds, current value, rule |
| Need event/handling chronology | `anomaly-timeline-card` | timeline/list rail | ordered events, event time, event status, event detail |
| Need top affected metrics/objects | `anomaly-ranking-top-card` | Top N list/table/sparklines | object id/name, value, rank, tie rule, visible limit |
| Need business/financial/technical impact | `anomaly-impact-assessment-card` | KPI facts + gauge/table/trend | affected users/orders/services/loss/duration |
| Need current vs baseline comparison | `anomaly-baseline-compare-card` | current/baseline line, bars, or paired panes | comparable baseline, same metric/unit/grain |
| Need compact row evidence | `anomaly-summary-table-card` | small status table | row grain, columns, default sort, status dictionary |
| Need several monitored metrics in one card | `anomaly-multi-metric-monitor-card` | bounded metric grid or mini table | metric ids, values, thresholds, status, max item count |
| Need risk likelihood x impact judgment | `risk-matrix-card` | heatmap/matrix | likelihood, impact, risk count/value, color scale |
| Need processing/closed-loop status | `risk-response-status-card` | donut/status list/facts | status dictionary, owner/action, open/closed counts |
| Need dependency/influence diagnosis | `anomaly-relation-influence-card` | relation graph/tree/path | node/edge schema, direction/weight, density limit |
| Need regional abnormality | `anomaly-geographic-distribution-card` | map or region ranking | geo code or lon/lat, map resource, missing-geo policy |
| Need outlier point diagnosis | `outlier-scatter-card` | scatter/quadrant/boxplot outliers | x/y fields or outlier rule, object grain, label density |
| Need warning volume or completion by status | `warning-progress-donut-card` | donut/ring/gauge + status facts | total, category/status counts, denominator, threshold |

## Evidence Binding

Every selected card must declare `anomalyAnalysisEvidenceBinding` or an equivalent project contract.

```ts
type AnomalyAnalysisEvidenceBinding = {
  anomalyObjectType:
    | 'metric'
    | 'order'
    | 'request'
    | 'server'
    | 'region'
    | 'user'
    | 'service'
    | 'indicator'
    | 'risk-event'
    | 'warning'
    | 'outlier-point'
    | string;
  anomalyIdField?: string;
  objectIdField?: string;
  objectNameField?: string;
  severityField: string;
  severityDictionary: string[];
  statusField?: string;
  statusDictionary?: string[];
  currentValueField?: string;
  unit?: string;
  baselineValueField?: string;
  deltaField?: string;
  deltaRateField?: string;
  directionRule?: 'higher-is-worse' | 'lower-is-worse' | 'outside-band-is-worse' | 'domain-defined';
  thresholdFields?: {
    warningThresholdField?: string;
    highThresholdField?: string;
    mediumThresholdField?: string;
    lowThresholdField?: string;
    thresholdUnit?: string;
    thresholdRule?: string;
    intervalLabelField?: string;
    lowerBoundField?: string;
    upperBoundField?: string;
  };
  timeFields?: {
    firstSeenAtField?: string;
    occurredAtField?: string;
    updatedAtField?: string;
    durationField?: string;
    timeGrain?: string;
    sortRule?: string;
  };
  impactFields?: {
    affectedUserField?: string;
    affectedOrderField?: string;
    affectedServiceField?: string;
    lossAmountField?: string;
    impactScoreField?: string;
    durationField?: string;
  };
  distributionFields?: {
    categoryField?: string;
    countField?: string;
    shareField?: string;
    totalField?: string;
    denominatorPolicy?: string;
  };
  timelineFields?: {
    eventIdField: string;
    eventTimeField: string;
    eventTitleField: string;
    eventStatusField: string;
    eventDetailField?: string;
  };
  rankingFields?: {
    rankField?: string;
    valueField: string;
    tieBreakFields?: string[];
    visibleLimit: number;
  };
  relationFields?: {
    nodeIdField?: string;
    nodeNameField?: string;
    nodeTypeField?: string;
    edgeSourceField?: string;
    edgeTargetField?: string;
    edgeWeightField?: string;
    relationDirection?: 'directed' | 'undirected' | 'mixed';
  };
  geoFields?: {
    regionIdField?: string;
    regionNameField?: string;
    geoCodeField?: string;
    lonField?: string;
    latField?: string;
    mapResource?: string;
    missingGeoPolicy?: string;
  };
  responseFields?: {
    ownerField?: string;
    actionField?: string;
    actionStatusField?: string;
    resolvedAtField?: string;
    slaField?: string;
  };
  tooltipPayload: string[];
  detailAction: string;
  exportFields?: string[];
  validationCases: string[];
};
```

## Shared Card Anatomy

1. Header: stable index badge such as `01`, short title, optional local control, and optional menu. One local control group maximum before collapse.
2. State zone: semantic icon tile or status tile, primary abnormal/risk value, severity/status badge, comparison to baseline, and unit.
3. Evidence body: exactly one primary evidence surface: trend, donut, interval chart, timeline, Top list, matrix, relation graph, map, scatter, gauge, or table.
4. Support strip: `2-4` facts such as affected users, affected orders, duration, baseline, max/min, unresolved count, or source count.
5. Footer: first seen/updated/freshness time on the left, detail/drill/action route on the right.

Forbidden slots:

- Full-card red fill, decorative illustration, large glass/gradient background, or abstract "AI" icon.
- More than one primary chart body in a normal card.
- Equal-weight metric, chart, table, and list piles without one dominant evidence body.
- Local controls that silently change page/global filters, permissions, backend aggregation, export scope, or other components.

## Size Families

| Size family | Minimum outer size | Use for | Critical floors |
| --- | --- | --- | --- |
| `anomaly_summary_card` | `360x240` | overview, warning progress, response status | state zone `88px`, support strip `44-64px`, footer `32px` |
| `anomaly_trend_card` | `420x260` | trend or baseline comparison with axes/thresholds | chart body `>=160px`, plot height `>=112px` |
| `anomaly_distribution_card` | `420x300` | donut, interval share, severity structure | donut fit `>=132x132`, legend/detail band `>=84px` |
| `anomaly_interval_card` | `480x320` | interval, threshold band, bucket comparison | evidence body `>=180px`, threshold labels non-overlapping |
| `anomaly_list_timeline_card` | `420x300` | timeline, Top N, alert/exception rows | row height `56-82px`, visible rows `3-6` |
| `anomaly_matrix_card` | `460x320` | risk matrix, heatmap, threshold grid | cell floor `36px`, legend `>=72px` |
| `anomaly_relation_card` | `520x340` | relation/influence graph or dependency tree | graph body `>=200px`, nodes `<=12` compact or `<=30` with filter/fullscreen |
| `anomaly_geo_card` | `460x320` | geographic abnormality map | map body `>=220px`, aspect-safe map, legend `72-140px` |
| `anomaly_scatter_card` | `420x300` | outlier scatter/quadrant | chart body `>=200px`, plot height `>=160px`, permanent labels `<=6` |

Compact cards below these floors may show only state, value, one comparison, and a detail route. Move the evidence to tooltip, drawer, fullscreen, or a full chart/table before squeezing charts into decoration.

## Visual Rules

- Inherit the modern SaaS/BI light-surface contract when in scope: light gray-white page, optional analytical surfaces, reduced uniform borders, `6-8px` radius, restrained shadows, UI Kit controls, and lightweight charts.
- Use brand/product color and neutral hierarchy as the base. Status colors are consistent only when the abnormality/recovery rule is documented and labeled; do not flood hierarchy with red/green.
- Use soft tint blocks for icons and status. Do not flood the whole card with danger color.
- Keep chart marks stronger than gridlines and borders. Axes, legends, and labels stay sparse; exact values go to tooltip/detail.
- Use one dominant accent per card plus neutral text. Avoid rainbow category colors unless categories have stable business meaning.
- Numbered badges create scanning order, but they are not rank badges unless rank is the actual data meaning.
- Use concrete Chinese operational copy. Avoid generic labels such as 智能分析, 异常洞察, 实时监控, or 建议关注 unless the card also names the affected object, condition, baseline, and next step.

## Anti-AI Failure Modes

- The card says abnormal/risk/warning but lacks severity, baseline, threshold, occurrence/update time, or detail path.
- The chart is visually varied but not tied to a diagnostic lens.
- The page shows eight equal cards with no reading path, no primary state, and no action route.
- The data is unrealistically clean: perfect smooth lines, all categories balanced, no missing/zero/extreme cases, or all risks resolved.
- Every field is a pill, badge, or icon, making the component look like generated UI ornament.
- Red/orange gradients, glass panels, huge shadows, or abstract warning art compete with reading.
- A map, relation graph, scatter, matrix, or gauge is used without the required data shape.
- The footer hides freshness/source/action to keep the card visually clean.

## Failure IDs

Use these IDs when accepting, auditing, or repairing anomaly-analysis cards:

| ID | Fails when | Repair |
| --- | --- | --- |
| `RPT-ANOMALY-LENS-MISSING` | The card has no named diagnostic lens such as trend, interval, impact, relation, geography, or response status. | Select `anomalyAnalysisCardPattern` and bind the matching evidence fields. |
| `RPT-ANOMALY-EVIDENCE-MISSING` | Severity/status, baseline/threshold, occurrence/update time, affected object, or exact-value route is absent. | Add `anomalyAnalysisEvidenceBinding`, tooltip/detail payload, and freshness/action fields. |
| `RPT-ANOMALY-NO-ACTION` | The abnormal/risk result has no owner, handling status, drilldown, detail, or action route. | Add response fields, detail drawer/table, route, or runbook action. |
| `VIS-ANOMALY-CARD-PILEUP` | Multiple unrelated metrics, charts, badges, and tables compete inside one card. | Keep one primary evidence body and move secondary evidence to support strip, tooltip, drawer, or split card. |
| `VIS-ANOMALY-CARD-AI-GENERIC` | The card uses interchangeable SaaS polish or generic copy instead of domain fields and diagnostic proof. | Replace generic copy with object, condition, metric, threshold, baseline, time, and action context. |
| `VIS-ANOMALY-SEVERITY-OVERPAINT` | Danger colors, gradients, or fills overpower numeric hierarchy, chart readability, or table/list scanning. | Use soft semantic tint, restrained badges, and neutral card surface. |

## Acceptance Checklist

- `analysisPerspective` is `anomalyRisk`, or the card declares `secondaryAnalysisPerspectives` including `anomalyRisk`.
- `visualType` is `anomaly-card`, unless the card is intentionally routed to a stricter existing family such as `metric-card`, `distribution-card`, `operational-list`, `graph`, `map`, or `table`.
- `anomalyAnalysisCardPattern` is selected from the controlled values.
- `anomalyAnalysisEvidenceBinding` declares severity/status, object identity when applicable, current/baseline/threshold/time/impact fields for the selected pattern, tooltip payload, detail action, and validation cases.
- The card has one diagnostic lens, one primary evidence body, `2-4` supporting facts, freshness/source metadata, and an exact-value/detail/action path.
- Display budget and fallback are declared before charts, lists, matrices, maps, relation graphs, or scatter plots are squeezed.
- Local controls are current-card or declared local-group scoped and do not change page/global scope silently.
- Severity colors are semantic and restrained; no full-card red/orange/glass/glow treatment is used as the design language.
- Empty/loading/error/no-permission/stale states preserve the card geometry and do not leak restricted abnormal counts or object names.
- The pattern is reproducible from text without retaining raw screenshot paths.
