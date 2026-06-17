# Population And Object Analysis Card Standard

Use this standard when a report asks for `analysisPerspective: populationObject`, such as 看人群, 看对象, 用户画像, 客户画像, 客户分群, 客群对比, 对象详情, 人群分布, 人群生命周期, RFM, 行为偏好, 消费频次, 流失风险, 对象关系, 对象轨迹, or 对象价值评估.

This is an upper-level component-family standard. It does not replace KPI, composition, spatial, relationship, anomaly, list, table, or multidimensional profile rules. It packages those existing controlled patterns around one population/object question so the card can be selected, generated, and accepted without relying on raw screenshots.

The supplied screenshots are reusable inspiration only. Do not store raw image paths as durable knowledge. Preserve the design value as text-only contracts that non-multimodal downstream agents can apply.

## 1. Scope And Source Of Truth

- Component family: Population And Object Analysis Cards / 人群与对象分析卡片族.
- Applicable report/page types: user profile, customer segmentation, member operations, CRM, store/customer object detail, account/object health, channel/persona analysis, lifecycle operation, churn/risk operation, and object 360 detail pages.
- Source hierarchy: company UI baseline -> report design system -> Modern SaaS BI Dashboard style contract -> this component-family standard -> project exceptions.
- Primary mapping perspective: `analysisPerspective: populationObject`.
- Related perspectives: `multiDimensionalProfile`, `compositionShare`, `comparisonDifference`, `relationshipInfluence`, `spatialDistribution`, `anomalyRisk`, `detailEvidence`, `currentStatus`, `trendMovement`, and `actionRecommendation`.
- Boundary:
  - Use `multiDimensionalProfile` when the main job is one object's feature/radar/tag profile.
  - Use `populationObject` when the main job is comparing or explaining people, cohorts, customer groups, or a concrete business object and its surrounding evidence.
  - Use `detailEvidence` when the card is only a row audit table/list.
  - Use `anomalyRisk` when risk severity, baseline, threshold, response status, or action closure is the primary lens.
- Libraries/renderers: ECharts for donut, bar, line, funnel, map, scatter, gauge, and graph evidence; Element Plus or project UI controls for filters, tags, menus, and drawers; project list/table or AntV S2 for exact evidence rows.
- Supported viewports: standard card `420x260+`; group analysis cards `480x300+`; map/relation cards `520x320+`; object-detail cards `420x300+`; dense object 360 cards should split, use tabs, drawer, fullscreen, or Micro Dashboard Card instead of squeezing.
- Owner/version/status: report-component-design-spec / v1.0 / stable for reusable guidance, implementation-ready only after local data and runtime proof.

## 2. Why These Designs Work

The screenshots feel designed, and not AI-like, because the visible polish is accountable to reading, evidence, and operation:

- One card answers one people/object question. A card says "who/which group is this", "how many", "how different", "where", "what risk", or "what happened"; it is not a random chart sampler.
- Identity anchors the evidence. Avatar/icon, object name, ID, group, status, lifecycle, owner, and freshness make the card feel like a product surface tied to real records, not a generic dashboard tile.
- The visual grammar matches the data shape. Donut means composition, RFM uses a quadrant, lifecycle uses ordered stages, preference uses ranked bars, geography uses a muted map plus Top list, risk uses severity/status, relationship uses nodes/edges, and behavior uses a timeline.
- The hierarchy is calm and editorial. Header, identity/scope block, one dominant evidence body, support facts, and detail/freshness route appear in predictable places.
- Density is bounded. Visible metrics, tags, rows, bars, categories, stages, nodes, labels, and footer facts have limits before styling happens.
- Exact values are never sacrificed for prettiness. A clean chart still has a tooltip, side list, detail drawer, audit table, export, source, update time, denominator, or formula path.
- Color is semantic and repeatable. Blue can mean selected/current/info, green active/normal, orange warning/stage, red risk, gray inactive/unknown; colors are not randomized per card.
- The white-card UI Kit language is restrained: light gray page, white cards, thin borders, small radius, soft shadow, muted metadata, compact controls, and lightweight charts.
- The copy is domain-specific. Labels like 活跃天数, RFM, 生命周期, 客户总数, 覆盖区域, 行为轨迹, 风险等级, 客单价, and 更新日期 make the surface feel operational.
- Imperfect states are planned. Missing object data, stale tags, no permission, low sample size, too many tags, dense relationships, no geo match, denominator zero, and risk in handling are visible states rather than polished away.

## 3. Style Generalization Coverage

| Sample role | Reusable meaning | Selected controlled patterns | Status | Adaptive variables | Fallback |
| --- | --- | --- | --- | --- | --- |
| User profile card grid | Single user/customer identity with facts, tags, lifecycle, region, behavior, device, consumption, and overview evidence | `populationObjectCardPattern: population-profile-overview-card`; composed `multiDimensionalFeatureCardPattern`, KPI, composition, spatial, list/status patterns | covered-by-composed-patterns | object type, identity fields, metric count, tag count, evidence mode, source/freshness | compact identity + `2-4` facts; move dense evidence to drawer/table |
| Customer segmentation grid | Group-level segmentation by value, RFM, lifecycle, behavior preference, channel, geography, frequency, and churn risk | `populationObjectCardPattern` values for segment composition, RFM matrix, lifecycle, preference, channel, geo, frequency, churn risk | requires-pattern-extension now covered by this standard | segment count, denominator, axis scores, stage order, category colors, Top N, period | bar/table/detail when chart grammar or denominator fails |
| Object detail card grid | Business object identity with key metrics, structure, geography, relation, behavior trajectory, value score, and risk warning | `object-*` pattern values; composed KPI, composition, spatial, relationship, timeline/list, anomaly patterns | requires-pattern-extension now covered by this standard | object grain, icon/avatar, facts, KPI count, event count, relation count, risk fields | detail table/drawer or split cards when object 360 becomes too dense |

`textOnlyReproduction` is `true`: future components must be generated from this text standard, not from raw screenshots.

## 4. Controlled Pattern Field

Use `populationObjectCardPattern` when one card packages people, cohort, customer group, or object evidence with identity, denominator, exact-value path, and bounded UI Kit anatomy.

```ts
type PopulationObjectCardPattern =
  | 'population-profile-overview-card'
  | 'population-segment-composition-card'
  | 'population-rfm-matrix-card'
  | 'population-lifecycle-stage-card'
  | 'population-behavior-preference-card'
  | 'population-channel-source-card'
  | 'population-geographic-distribution-card'
  | 'population-consumption-frequency-card'
  | 'population-churn-risk-card'
  | 'object-basic-info-card'
  | 'object-key-metrics-card'
  | 'object-structure-distribution-card'
  | 'object-geographic-coverage-card'
  | 'object-relationship-network-card'
  | 'object-behavior-timeline-card'
  | 'object-value-score-card'
  | 'object-risk-alert-card';
```

Recommended mapping:

```ts
componentType: 'card';
analysisPerspective: 'populationObject';
populationObjectCardPattern: PopulationObjectCardPattern;
visualType: real evidence family, such as 'metric-card' | 'composition-card' | 'spatial-map-card' | 'graph' | 'operational-list' | 'anomaly-card' | 'table' | 'other';
```

Keep `visualType` honest. Do not call a relationship network a profile card, a map a decorative region panel, or a warning card an ordinary KPI.

## 5. Component Family Matrix

| Pattern | Business trigger | Primary evidence body | Minimum size | Use when |
| --- | --- | --- | ---: | --- |
| `population-profile-overview-card` | Who is this person/customer/member/group representative? | Identity block + `2-5` facts + tags/status + one compact evidence mode | `420x260` | Single user/customer profile or cohort persona needs first-read summary. |
| `population-segment-composition-card` | How is the population split by value/type/risk/source? | Donut/percent bars + denominator + side list | `420x300` | `2-8` groups with one denominator and exact values. |
| `population-rfm-matrix-card` | Which segments appear by recency, frequency, and monetary score? | Quadrant/scatter/matrix + summary facts | `480x320` | R/F/M scores or segment assignment fields exist. |
| `population-lifecycle-stage-card` | Where are customers/users in lifecycle stages? | Ordered stage ribbon/stepper + counts/trend | `480x300` | Stage order and stage counts are primary. |
| `population-behavior-preference-card` | What behaviors/preferences define the cohort? | Ranked bars/list + shares/counts | `420x300` | Behavior categories have counts, share, or intensity. |
| `population-channel-source-card` | Which channels/sources contribute the group? | Donut/detail list or percent bars | `420x300` | Channel/source composition and denominator are primary. |
| `population-geographic-distribution-card` | Where is the population located or concentrated? | Map + Top regions + metric strip | `520x320` | Region codes or coordinates exist and geography is decision evidence. |
| `population-consumption-frequency-card` | How frequently do customers consume/visit/use? | Funnel, ordered bands, histogram, or bars | `480x300` | Frequency bands/order and denominator are valid. |
| `population-churn-risk-card` | Which customers are at churn/loss risk? | Risk composition + risk facts/detail route | `420x300` | Risk level/status, affected count, and action/detail path exist. |
| `object-basic-info-card` | What is this business object and what are its key facts? | Object identity + metadata fields + summary facts | `420x300` | Object detail page needs stable identity and ownership context. |
| `object-key-metrics-card` | What are the object's current operating metrics? | `2-5` KPI cells + optional trend | `420x300` | A selected object has measurable KPI fields. |
| `object-structure-distribution-card` | How is the object's customer/product/service structure split? | Donut/percent bars + exact list | `420x300` | Object-specific composition fields exist. |
| `object-geographic-coverage-card` | Which regions/sites does the object cover? | Map + coverage/ranking strip | `520x320` | Coverage geography or point data exists. |
| `object-relationship-network-card` | What is this object's relationship neighborhood? | Graph/tree/relation list | `520x340` | Node/edge or parent-child relationship fields exist. |
| `object-behavior-timeline-card` | What happened around this object recently? | Event timeline/list | `420x300` | Ordered event records exist. |
| `object-value-score-card` | How valuable/healthy is this object? | Score/gauge + dimension bars | `420x300` | Score, bands, and dimension evidence exist. |
| `object-risk-alert-card` | What risks or warnings require action? | Risk summary + warning table/list | `420x300` | Severity/status/time/action fields exist. |

## 6. Component Purpose

Population and object analysis cards answer one of these questions:

- `population-profile`: 这个人群/对象是谁, 有哪些关键属性、标签、状态和指标?
- `segment-structure`: 人群如何分层/分群, 每组占多少, 分母是什么?
- `rfm-segmentation`: 客户在 R/F/M 或价值矩阵中的位置是什么?
- `lifecycle-stage`: 客户处于哪个生命周期阶段, 各阶段数量/占比/趋势如何?
- `behavior-preference`: 这个人群偏好什么行为、内容、渠道、设备或品类?
- `channel-source`: 人群来自哪些渠道/来源, 结构是否变化?
- `geo-distribution`: 人群或对象在空间上分布在哪里?
- `frequency-segmentation`: 消费/访问/使用频次如何分层?
- `churn-risk`: 哪些人群有流失/风险, 风险等级和下一步是什么?
- `object-detail`: 一个对象的身份、指标、结构、关系、轨迹、价值和风险是什么?

Not suitable for decorative personas, stock avatars, fake customer stories, all-blue generic cards, chart variety without fields, or object 360 collages that hide exact evidence.

## 7. Anatomy

Required slots:

1. Header: stable index/title, optional definition/help, optional one local control group, and optional menu.
2. Scope/identity block: object/group name, ID when available, type/group/status/lifecycle, period/source/freshness, and avatar/icon only when it aids recognition.
3. Primary evidence body: exactly one dominant evidence surface such as donut, bars, RFM matrix, lifecycle ribbon, map, relationship graph, timeline, score/gauge, or warning list.
4. Support facts: `2-4` facts such as customer count, share, average spend, active days, visit frequency, coverage count, relation count, risk score, or update time.
5. Exact-value path: tooltip plus detail drawer, fullscreen, table fallback, object profile route, segment detail, export, or risk/action route.
6. State body: loading, empty, filtered-empty, error, no-permission, stale, missing-id, denominator-zero, low-sample, too-many-segments, too-many-tags, too-many-relations, missing-geo, and partial data.

Optional slots:

- Local segmented control for `卡片 / 列表`, `人群 / 对象`, `数量 / 占比 / 金额`, `本期 / 上期`, `全部 / 高风险 / 中风险 / 低风险`, or one metric/view switch.
- Bottom audit strip for source, freshness, denominator, sample count, last event time, or detail count.
- Detail link such as 查看详情, 查看全部关系, 查看评估详情, or 查看全部风险.

Forbidden slots:

- Nested card piles; generic persona cards without row identity; every field as a pill; random gradients/glow; decorative avatars; all-region/all-node labels; multiple unrelated chart bodies; duplicated global date/filter/refresh controls inside every card.

## 8. Data Contract

Every population/object card must declare:

```ts
type PopulationObjectEvidenceBinding = {
  analysisPerspective: 'populationObject';
  populationObjectTask:
    | 'population-profile'
    | 'segment-structure'
    | 'rfm-segmentation'
    | 'lifecycle-stage'
    | 'behavior-preference'
    | 'channel-source'
    | 'geo-distribution'
    | 'frequency-segmentation'
    | 'churn-risk'
    | 'object-detail'
    | 'object-kpi'
    | 'object-structure'
    | 'object-relationship'
    | 'object-timeline'
    | 'object-value-score'
    | 'object-risk';
  objectGrain: 'user' | 'customer' | 'member' | 'account' | 'store' | 'channel' | 'supplier' | 'product' | 'service' | 'project-defined';
  objectIdField?: string;
  objectNameField?: string;
  objectTypeField?: string;
  objectStatusField?: string;
  segmentIdField?: string;
  segmentNameField?: string;
  populationCountField?: string;
  totalField?: string;
  shareField?: string;
  denominatorPolicy?: 'all-filtered-rows' | 'api-total' | 'visible-total' | 'selected-object-total' | 'declared-market-total';
  metricFields?: string[];
  numericFormatContractIds?: string[];
  dimensionFields?: string[];
  tagFields?: string[];
  rfmFields?: {
    recencyScoreField: string;
    frequencyScoreField: string;
    monetaryScoreField: string;
    segmentField: string;
  };
  lifecycleFields?: {
    stageField: string;
    stageOrderField: string;
    stageCountField: string;
    stageShareField?: string;
    transitionField?: string;
  };
  categoryFields?: {
    categoryIdField: string;
    categoryNameField: string;
    valueField: string;
    shareField?: string;
    sortField?: string;
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
  relationFields?: {
    nodeIdField?: string;
    nodeNameField?: string;
    edgeSourceField?: string;
    edgeTargetField?: string;
    edgeWeightField?: string;
    relationTypeField?: string;
  };
  timelineFields?: {
    eventIdField: string;
    eventTimeField: string;
    eventTitleField: string;
    eventStatusField?: string;
    eventDetailField?: string;
  };
  riskFields?: {
    riskLevelField: string;
    riskScoreField?: string;
    severityDictionary?: string[];
    statusField?: string;
    thresholdFields?: string[];
    ownerField?: string;
    actionField?: string;
  };
  scoreFields?: {
    scoreField: string;
    scoreLevelField?: string;
    scaleMin?: number;
    scaleMax?: number;
    dimensionScoreFields?: string[];
  };
  periodField?: string;
  sourceField?: string;
  freshnessField?: string;
  densityLimit: string;
  labelRule: string;
  tooltipPayload: string[];
  exactValueRoute: string;
  localControls?: string[];
  rendererOwner: 'echarts' | 'project-table' | 'antv-s2' | 'project-list' | 'project-profile-card' | 'data-driven-custom-diagram';
  fallback: string;
  validationCases: string[];
};
```

Required data by task:

| Task | Required fields |
| --- | --- |
| `population-profile` | Object/group identity, object grain, `2-5` metrics or tags, source/freshness, and exact-value route. |
| `segment-structure` | Segment id/name, count/value, total, share, denominator policy, order/merge rule. |
| `rfm-segmentation` | Recency, frequency, monetary scores or bins, segment label, count/share, quadrant rule. |
| `lifecycle-stage` | Stage, stage order, count/share, stage dictionary, optional transition/trend. |
| `behavior-preference` | Behavior/category id/name, value/count/share/intensity, sort rule, Top N policy. |
| `channel-source` | Channel/source id/name, count/value/share, total, source freshness. |
| `geo-distribution` | Region code or lon/lat, map resource, value/share, missing-geo policy. |
| `frequency-segmentation` | Frequency band/order, count/share, denominator, period, boundary definitions. |
| `churn-risk` | Risk level/status, count/share or affected objects, threshold/baseline when visible, detail/action route. |
| `object-detail` | Object id/name/type/status, owner/group/created/updated fields, `2-4` summary facts. |
| `object-kpi` | Metric fields, units, numeric format, period, source/freshness, exact-value route. |
| `object-structure` | Category fields, value/total/share, denominator, `Top N + 其他` or merge rule. |
| `object-relationship` | Node/edge or pair fields, relation type/weight/method, density and label rule. |
| `object-timeline` | Event id/time/title/status, sort order, visible event count, row/detail action. |
| `object-value-score` | Score, scale/range/level, dimension scores, source, period, detail route. |
| `object-risk` | Severity/status dictionary, current/baseline/threshold/time/owner/action where visible. |

Numeric and identity rules:

- Population counts and shares must declare denominator and filter scope.
- Segment, risk, lifecycle, and status dictionaries must map raw value, display label, color semantic, icon/dot, business meaning, and terminal/action state where relevant.
- RFM and score cards must declare scale, band thresholds, or model/source version.
- Object cards must use real object fields; mock avatars/icons cannot substitute for `object_id`, `object_name`, type, status, owner, or freshness.

## 9. Placement And Fit

Use variables: `W`, `H`, `P`, `CW = W - 2P`, `CH = H - 2P`.

Default slot budgets:

- `P`: `16-24px`; dense cards may use `12px` only after text/controls fit.
- `headerH`: `36-52px`; title left, one menu/control group right.
- `identityH`: `64-104px` when identity is visible; `0` for pure group distribution cards.
- `primaryBodyH`: at least `50%` of `CH`, or the specific chart/list/table minimum if stricter.
- `supportStripH`: `44-72px`; support facts stay `2-4`.
- `footerH`: `16-36px`; source/freshness/detail only.

Minimum fit gates:

| Evidence type | Fit floor |
| --- | --- |
| Profile/object identity summary | card `>=420x260`, identity avatar/icon `40-64px`, facts `2-5`, tags `<=8` visible. |
| Donut/composition | card `>=420x300`, donut fit `>=150x150`, categories `2-6` preferred and `<=8` before merge. |
| RFM matrix/scatter | card `>=480x320`, plot `>=220x180`, labels permanent `<=4` segments or selected only. |
| Lifecycle stage | card `>=480x300`, stages `3-7`, stage label band `>=28px`, trend/evidence body `>=112px` when visible. |
| Behavior/preference bars | card `>=420x300`, visible rows `3-8`, row height `>=24px`, value column `>=56px`. |
| Map/geography | card `>=520x320`, map body `>=220px`, map viewport shorter side `>=180px`, side ranking `120-220px`. |
| Relationship network | card `>=520x340`, graph body `>=200px`, nodes `<=35`, permanent labels `<=10`. |
| Timeline/list | card `>=420x300`, visible rows `3-6`, row height `56-82px`. |
| Score/gauge | card `>=420x300`, gauge/ring `>=136x136` or semi-gauge `>=180x112`, dimension rows `3-6`. |
| Risk/warning | card `>=420x300`, one severity/status body, support facts `2-4`, table/list rows `3-6`. |

Responsive fallback order:

1. Collapse secondary controls to dropdown.
2. Reduce support facts to `<=2`.
3. Hide non-key labels; keep selected/current/Top/risk labels and tooltip.
4. Reduce tags/categories/stages/rows/nodes to Top N plus detail.
5. Convert donut/gauge/radar/matrix to bar/list/table when exact comparison matters more.
6. Move relationship/map/timeline/risk details to drawer/fullscreen/table.
7. Split object 360 into separate cards or route to Micro Dashboard Card when one object owns many evidence surfaces.
8. Reject the visual when identity, denominator, geography, relation, score, risk, or exact-value contract is missing.

## 10. Visual And Interaction Rules

- Inherit modern white-card UI Kit styling: near-white card, thin border, `6-8px` radius, light shadow, compact typography, muted metadata, and stable icon/menu controls.
- Use a numbered badge for scan order only. It is not a rank unless the data says so.
- Avatar/icon sits in an identity slot and must not dominate the card. Use domain icons for object type; use real avatar only when available and permitted.
- Segment, lifecycle, risk, status, and channel colors must be stable across card, legend, list, tooltip, and detail route.
- Use soft fills and restrained semantic colors. Avoid full-card color fills except approved selected/critical states with readable text.
- Maps use weak basemap and strong data layer. Graphs use weak edges and stronger selected/key nodes. Timelines use stable rail rhythm.
- Hover/focus reveals exact object, segment, value, denominator, period, source, and missing/estimated flags without moving layout.
- Click opens the declared profile, segment, region, relation, event, risk, or score detail. The event payload must include stable object/segment/region/event keys.
- Local controls affect only this card or a declared local group. If they change metric definitions, component set, or business vocabulary, classify as `perspective-switch`.

## 11. States

Required states: `loading`, `empty`, `filtered-empty`, `error`, `no-permission`, `stale`, `missing-object`, `missing-identity`, `missing-denominator`, `denominator-zero`, `low-sample`, `too-many-segments`, `too-many-tags`, `too-many-relations`, `missing-geo`, `all-zero`, `scale-conflict`, `long-label`, and `partial-data`.

State rules:

- Loading skeleton preserves header, identity, evidence body, support strip, and footer geometry.
- Empty states name the selected group/object/period and provide reset only when filters caused the empty result.
- No-permission states must not leak restricted object names, counts, silhouettes, relation nodes, risk rows, or region totals.
- Missing identity blocks object/profile cards until id/name/type policy is declared; use anonymous aggregate cards only when privacy requires it.
- Missing denominator blocks share/donut/frequency/lifecycle risk percentages; show counts or table instead.
- Low sample size is visible when a segment/risk score/profile might mislead.
- Too many segments/tags/relations use grouping, search, Top N, drawer, fullscreen, or table, not tiny text.

## 12. Anti-AI Gate

Reject or keep readiness `partial` when:

- `analysisPerspective: populationObject` is missing for a component that claims 看人群/对象, 用户画像, 客户分群, 客群对比, or 对象详情.
- A card is selected because it looks polished rather than because the data has object identity, group denominator, segment schema, lifecycle order, behavior categories, geography, relationship, timeline, score, or risk fields.
- Avatar, icon, tags, colors, bars, matrix positions, map intensity, graph nodes, timeline events, or risk status are not tied to named fields.
- The card has no denominator policy, density limit, label rule, tooltip payload, exact-value route, state coverage, or fallback.
- A profile card is a decorative persona card with fake photo/name and no data lineage.
- One object card becomes a mini-dashboard collage with unrelated metrics, charts, lists, and risk rows without one primary question.
- The design uses generic blue-purple SaaS polish, glass, glow, oversized radius, random chips, abstract AI imagery, or perfect mock data to create "高级感".
- Source/freshness, update time, owner/action, or detail route is hidden just to keep the card visually clean.

Use failure IDs:

- `RPT-POPOBJ-PERSPECTIVE-MISSING`
- `RPT-POPOBJ-PATTERN-MISSING`
- `RPT-POPOBJ-DATA-MISSING`
- `RPT-POPOBJ-DENOMINATOR-MISSING`
- `RPT-POPOBJ-NO-EXACT-PATH`
- `RPT-POPOBJ-IDENTITY-FAKE`
- `VIS-POPOBJ-DENSITY-UNBOUNDED`
- `VIS-POPOBJ-EVIDENCE-DECORATIVE`
- `VIS-POPOBJ-SQUEEZED`
- `VIS-POPOBJ-CARD-PILEUP`
- `VIS-POPOBJ-AI-POLISH`

## 13. Rule Strength And Proof Matrix

| Rule | Strength | Proof method | Failure ID |
| --- | --- | --- | --- |
| Population/object cards declare `analysisPerspective: populationObject`, one `populationObjectTask`, and one `populationObjectCardPattern`. | MUST/fail | Binding matrix or component config | `RPT-POPOBJ-PERSPECTIVE-MISSING` / `RPT-POPOBJ-PATTERN-MISSING` |
| Required identity, segment, denominator, metric, geo, relation, timeline, score, risk, source, and freshness fields exist for the selected task. | MUST/fail | Dataset/API/mock schema review | `RPT-POPOBJ-DATA-MISSING` |
| Share/frequency/lifecycle/risk percentages declare denominator policy and denominator-zero behavior. | MUST/fail | Data contract and formatter review | `RPT-POPOBJ-DENOMINATOR-MISSING` |
| Visible encodings bind to named fields, not screenshot decoration. | MUST/fail | Renderer option/data adapter review | `VIS-POPOBJ-EVIDENCE-DECORATIVE` |
| Identity cards use real object fields or an explicit privacy aggregate policy. | MUST/fail | Data contract and permission policy | `RPT-POPOBJ-IDENTITY-FAKE` |
| Display budgets are declared for facts, tags, rows, categories, stages, nodes, labels, and controls. | MUST/fail | Source/config plus QA crop/DOM or chart option proof | `VIS-POPOBJ-DENSITY-UNBOUNDED` |
| Evidence body meets the selected chart/list/table/map/relation fit floor. | MUST/fail | Slot budget, DOM geometry, screenshot/crop, renderer option proof | `VIS-POPOBJ-SQUEEZED` |
| Exact-value route exists for hidden/abbreviated values, formulas, object records, risk details, and raw rows. | MUST/fail | Tooltip/drawer/table/export/action config review | `RPT-POPOBJ-NO-EXACT-PATH` |
| White-card UI Kit styling remains data-first and avoids generic AI polish. | MUST/fail | Token/style review plus visual QA | `VIS-POPOBJ-AI-POLISH` |
| Local controls are current-card scoped or explicitly reclassified as perspective switches. | MUST/fail | Control semantics contract | `VIS-DUPLICATE-CONTROL` |
| Loading, empty, no-permission, stale, low-sample, missing denominator, dense data, and long-label states preserve geometry. | MUST/fail | State matrix, screenshots/crops, DOM overflow checks | `LAZY-DEFAULT-STATE-ONLY` |

## 14. Acceptance Checklist

- `analysisPerspective` is `populationObject`.
- `populationObjectCardPattern` is one of the controlled values above.
- `populationObjectEvidenceBinding` declares task, object grain, required fields, denominator policy when shares are visible, density/label rules, tooltip payload, exact-value route, renderer owner, fallback, and validation cases.
- Sample-derived style has `styleGeneralization.textOnlyReproduction: true` and maps every sample to a controlled pattern or composed pattern.
- Identity/profile cards show real object/group fields and enough source/freshness context to avoid decorative persona output.
- Segment/composition/frequency/lifecycle cards declare totals, shares, order rules, and `Top N + 其他` or merge policy.
- RFM/matrix cards declare scores/bins, quadrant/segment rule, label budget, and table fallback.
- Map cards declare geography keys or coordinates, map resource/projection, missing-geo policy, and exact-value path.
- Relationship cards declare node/edge or pair schema, method wording, density/label rules, and relation detail fallback.
- Timeline/list cards declare event row grain, sort order, row count, status dictionary where visible, and row action.
- Score/risk cards declare scale, thresholds, severity/status dictionary, time/freshness, and action/detail route.
- Long labels, low sample, stale data, no permission, and too-dense cases have declared fallback.
- No raw screenshot path or image-only memory is required to reproduce the style.
