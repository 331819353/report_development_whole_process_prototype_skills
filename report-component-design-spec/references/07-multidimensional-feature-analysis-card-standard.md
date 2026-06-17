# Multidimensional Feature Analysis Card Standard

Use this standard when a report asks for `analysisPerspective: multiDimensionalProfile`, such as 看多维特征, 画像卡, 雷达卡, 多维对比卡, 标签卡, 用户画像, 客户画像, 能力画像, 特征分析, 标签体系, 标签云, 标签详情, or object feature profile.

This is an upper-level component-family standard. It does not invent a new chart renderer. It routes each card to existing chart, KPI, table, list, tag, and local-control patterns while adding one controlled component-family field: `multiDimensionalFeatureCardPattern`.

The source screenshots are reusable inspiration only. Do not store raw image paths as durable knowledge. Preserve the design value as text-only contracts that a non-multimodal downstream model can apply.

## 1. Scope And Source Of Truth

- Component family: Multidimensional Feature Analysis Cards / 多维特征分析卡片族.
- Applicable report/page types: customer/user profile, member operations, product or SKU feature analysis, employee capability evaluation, store/channel health, risk profile, label management, segmentation, and cohort comparison dashboards.
- Source hierarchy: company UI baseline -> report design system -> Modern SaaS BI Dashboard style contract -> this component-family standard -> project exceptions.
- Primary mapping perspective: `analysisPerspective: multiDimensionalProfile`.
- Related perspectives: `populationObject`, `comparisonDifference`, `currentStatus`, `distributionSpread`, `relationshipInfluence`, `detailEvidence`, `filterExploration`, `dataQualityTrust`.
- Boundary: use `comparisonDifference` when the primary task is comparing groups on one or a few metrics. Use `populationObject` when cohort/person/object-group comparison is primary. Use this standard when one card packages an object's multi-field feature profile, radar shape, tag set, label taxonomy, or feature comparison with exact-value fallback.
- Libraries/renderers: ECharts for radar, line, bar, scatter, parallel coordinates, donut, and heatmap evidence; Element Plus or project UI controls for segmented controls, tags, selects, popovers, and drawers; project table or AntV S2 for exact audit tables.
- Supported viewports: ordinary profile card `420x260+`; radar/feature body card `360x300+`; tag taxonomy/status card `420x260+`; dense comparison matrix/table card `520x320+`; mobile or narrow cards use summary + drawer/table fallback.
- Owner/version/status: report-component-design-spec / v1.0 / stable for reusable guidance, implementation-ready only after local data and runtime proof.

## 2. Why These Designs Work

These cards feel designed, and not AI-like, because the polish follows the reading job:

- One object or one feature question owns the card. The card first tells the reader who or what is being profiled, then which dimensions explain the profile.
- The visual grammar matches the data shape. Radar reads balance and strengths/weaknesses, tag groups read categorical identity, comparison cards read deltas, scatter/bubble reads two numeric dimensions, tables read exact audit.
- The hierarchy is editorial but restrained: object identity or title at top, one primary evidence body in the middle, bounded support facts at the bottom or side, and detail/source/trust paths nearby.
- Density is bounded before styling. Radar dimensions, tag count, comparison subjects, table columns, and footer metrics all have visible budgets and deterministic fallback.
- Color carries meaning. Status, gender/category, tag state, risk, activity, lifecycle, or positive/negative change owns color. Random gradients and decorative rainbow tags are rejected.
- The white-card UI Kit language is quiet: thin borders, small radius, light shadows, muted canvas, compact controls, sparse grid lines, and enough whitespace around the primary evidence.
- Exact values remain inspectable. Tags, radar points, profile facts, score dimensions, and comparison marks expose raw value, formula, period, source, update time, and detail route through tooltip, drawer, fullscreen, table, or export.
- Imperfect data states are designed: missing feature values, unknown tag source, stale tags, no permission, too many dimensions, conflicting scales, long labels, and low sample size are visible states rather than hidden cleanup.

## 3. Style Generalization Coverage

| Sample role | Reusable meaning | Selected controlled patterns | Status | Adaptive variables | Fallback |
| --- | --- | --- | --- | --- | --- |
| Image profile card set | One object profile with identity, key facts, tags, lifecycle, mini trends, composition, or risk/action list | `multiDimensionalFeatureCardPattern: object-profile-summary-card`; composed KPI, line, donut, radar, operational list, detail table patterns | covered-by-composed-patterns | object type, identity fields, KPI count, evidence visual, lifecycle/status, tags, detail route | compact profile + drawer/table when evidence is too dense |
| Radar capability card set | One object or group across capability/score dimensions, optionally compared with target/previous/peer | `multiDimensionalFeatureCardPattern: radar-feature-profile-card` or `radar-feature-compare-card`; `targetActualRadarCardPattern`; `specializedChartCardPattern: parallel-profile-card` when many samples need lines | covered-by-composed-patterns | dimension count, scale, series count, target/baseline, score model, local comparison switch | bar/table/detail drawer when exact comparison or too many dimensions is primary |
| Multidimensional comparison card set | Region/channel/product/user comparison across value, trend, rank, share, or score dimensions | `multiDimensionalFeatureCardPattern: feature-comparison-matrix-card`, `feature-bubble-comparison-card`, or composed KPI comparison/ranking/table patterns | covered-by-composed-patterns | subject count, metric set, comparison baseline, visible dimensions, sort, bubble size, footer facts | grouped bar/table/scatter/fullscreen when comparison density fails |
| Tag card set | Tag inventory, tag grouping, tag state board, tag cloud, contrast tag groups, tag detail/rule card | `multiDimensionalFeatureCardPattern: tag-taxonomy-overview-card`, `tag-status-board-card`, `tag-cloud-profile-card`, `tag-rule-detail-card`; list/status/table patterns | requires-pattern-extension now covered by this standard | tag hierarchy, tag category, state, coverage, confidence, rule/source/update, visible tag count | grouped list/table/drawer when tag count or rule detail is dense |

`textOnlyReproduction` is `true`: future components must be generated from this text standard, not from raw screenshots.

## 4. Component Family Matrix

| Pattern | Business trigger | Primary evidence body | Minimum size | Use when |
| --- | --- | --- | ---: | --- |
| `object-profile-summary-card` | Who is this object, and what are its main traits? | Identity block + `2-5` metrics/tags + one compact evidence visual/list | `420x260` | Customer, user, employee, SKU, store, channel, or risk object needs first-read profile. |
| `radar-feature-profile-card` | What are this object's strengths and weaknesses across dimensions? | ECharts radar, optional summary strip | `360x300` | `5-8` comparable dimensions on one shared score scale. |
| `radar-feature-compare-card` | How does this profile compare with target, previous period, or peer? | ECharts radar with actual + comparison/target series | `420x320` | Dimension scores share scale and series count is `<=3`. |
| `dimension-score-breakdown-card` | Which dimensions drive the profile score? | Ranked bars/list + score strip/table fallback | `420x300` | Exact dimension ranking matters more than radar shape. |
| `feature-trend-profile-card` | How do selected features change over time? | Line/area/bar trend + endpoint labels + footer facts | `420x260` | A few feature metrics have ordered time rows. |
| `feature-comparison-matrix-card` | Which subjects differ across several feature metrics? | Matrix/table/heatmap or compact comparison table | `520x320` | `3-8` subjects and `3-8` metrics need scan comparison. |
| `feature-bubble-comparison-card` | How do objects distribute on two or three feature dimensions? | Scatter/bubble with tooltip/detail | `420x300` | Two numeric axes plus optional size/category encode object groups. |
| `tag-taxonomy-overview-card` | Which tag groups exist and how many tags/users do they cover? | Grouped tag chips/list + summary strip | `420x300` | Tag hierarchy/category/state is the decision surface. |
| `tag-status-board-card` | Which tags are enabled, pending, disabled, abnormal, or stale? | Status chip grid/list + state counts | `420x260` | Tag operation or governance status matters. |
| `tag-cloud-profile-card` | What tags characterize this object or group? | Weighted tag cloud or grouped tag chips | `420x300` | Tag strength, frequency, or importance should be visible but not exact-primary. |
| `tag-rule-detail-card` | What is this tag and how is it calculated/used? | Definition/detail fields + rule/source/usage facts | `420x300` | Tag audit, source, formula, update, or usage path matters. |

## 5. Component Purpose

Multidimensional Feature Analysis Cards answer one of these questions:

- `object-profile`: 一个对象是谁, 具备哪些关键属性、状态、标签和指标?
- `feature-profile`: 一个对象在多维能力、偏好、风险、健康度、价值或行为维度上的轮廓是什么?
- `profile-compare`: 当前对象/群体与目标、上期、行业、同组或另一对象相比有哪些优势和短板?
- `feature-breakdown`: 哪些维度最高、最低、异常、缺失或最需要行动?
- `tag-taxonomy`: 标签体系如何分组、覆盖多少对象、哪些标签被使用?
- `tag-status`: 哪些标签启用、待审核、已停用、异常、过期或未认证?
- `tag-cloud`: 一个对象/人群最能被哪些标签解释, 标签强度如何?
- `tag-detail`: 标签定义、计算规则、来源、更新时间、覆盖对象和使用看板是什么?

Not suitable for decorative personas, exact-row audit as the only task, causal attribution without method proof, unrelated feature units plotted on one radar, unbounded tag clouds, or chart variety chosen because it looks modern.

## 6. Anatomy

Required slots:

1. Header: card title, object or feature scope, optional definition/help, and one local control group when needed.
2. Identity/scope block when profiling one object: avatar/icon/object name, id, group/location/type, lifecycle/status, and period/source.
3. Primary evidence body: exactly one dominant profile evidence body such as radar, tag group, comparison matrix, trend, scatter, ranked dimension list, or detail fields.
4. Support facts: `2-4` facts such as score, rank, coverage, active days, consumption amount, lifecycle stage, tag count, enabled count, confidence, update frequency, or warning count.
5. Exact-value path: tooltip plus detail drawer, fullscreen, table fallback, export, profile detail, or tag-rule detail.
6. State body: loading, empty, filtered-empty, error, no-permission, stale, missing-dimension, scale-conflict, too-many-dimensions, too-many-tags, and partial data.

Optional slots:

- Local segmented control for `综合能力 / 岗位匹配 / 标签状态`, `本期 / 上期`, `按维度 / 按场景`, or `全部 / 启用中 / 待审核 / 已停用`.
- Compact legend when multiple radar/series/category encodings are visible.
- Bottom audit strip for source, freshness, calculation rule, coverage, and detail count.

Forbidden slots:

- Nested card piles, avatar/photo surfaces without data purpose, decorative tag confetti, random colored chips, unbounded radar dimensions, repeated global filters inside every card, or a large chart collage with equal-weight children.

## 7. Data Contract

Every multidimensional feature card must declare:

```ts
type MultiDimensionalFeatureCardPattern =
  | 'object-profile-summary-card'
  | 'radar-feature-profile-card'
  | 'radar-feature-compare-card'
  | 'dimension-score-breakdown-card'
  | 'feature-trend-profile-card'
  | 'feature-comparison-matrix-card'
  | 'feature-bubble-comparison-card'
  | 'tag-taxonomy-overview-card'
  | 'tag-status-board-card'
  | 'tag-cloud-profile-card'
  | 'tag-rule-detail-card';

type MultiDimensionalFeatureEvidenceBinding = {
  analysisPerspective: 'multiDimensionalProfile';
  multiDimensionalTask:
    | 'object-profile'
    | 'feature-profile'
    | 'profile-compare'
    | 'feature-breakdown'
    | 'tag-taxonomy'
    | 'tag-status'
    | 'tag-cloud'
    | 'tag-detail';
  objectGrain?: string;
  objectIdField?: string;
  objectNameField?: string;
  objectTypeField?: string;
  dimensionDatasetId?: string;
  dimensionIdField?: string;
  dimensionNameField?: string;
  dimensionOrderField?: string;
  scoreField?: string;
  rawValueField?: string;
  unitField?: string;
  scaleMin?: number;
  scaleMax?: number;
  scaleMode?: 'shared-score' | 'standardized-score' | 'raw-same-unit' | 'blocked';
  comparisonFields?: string[];
  targetFields?: string[];
  tagDatasetId?: string;
  tagIdField?: string;
  tagNameField?: string;
  tagGroupField?: string;
  tagStatusField?: string;
  tagStrengthField?: string;
  tagCoverageField?: string;
  tagRuleFields?: string[];
  metricFields?: string[];
  periodField?: string;
  sourceField?: string;
  freshnessField?: string;
  densityLimit: string;
  labelRule: string;
  tooltipPayload: string[];
  exactValueRoute: string;
  localControls?: string[];
  rendererOwner: 'echarts' | 'project-table' | 'antv-s2' | 'project-list' | 'project-tag-component';
  fallback: string;
  validationCases: string[];
};
```

Required data by task:

| Task | Required fields |
| --- | --- |
| `object-profile` | `object_id`, `object_name`, object type/status/group fields, `2-5` metric fields, source/freshness, optional tag ids and one compact evidence dataset. |
| `feature-profile` | Dimension rows with `dimension_id`, `dimension_name`, order, score or standardized value, scale min/max, source, period, tooltip raw values. |
| `profile-compare` | Current and comparison/target rows at the same dimension grain, shared scale, comparison label, gap or delta field when visible. |
| `feature-breakdown` | Dimension score/value rows, rank or deterministic sort, highest/lowest/anomaly flags when visible, exact-value route. |
| `tag-taxonomy` | Tag group/category hierarchy, tag id/name, count, coverage, owner/source, optional enabled/pending/disabled state. |
| `tag-status` | Tag id/name, status enum, status reason, update time, owner, usage count, validation or approval state. |
| `tag-cloud` | Tag id/name, group, strength/frequency/importance value, visible weight rule, coverage/confidence when available. |
| `tag-detail` | Tag id/name/type, description, calculation rule, source fields, update time, coverage, usage boards, dependencies, owner. |

Scale and numeric rules:

- Radar and parallel-coordinate profiles must use one comparable scale. Mixed units require standardized score plus raw value disclosure.
- `scaleMode: blocked` is required when no comparable scale exists; use bar/table/detail instead of radar.
- Tags must not derive meaning from color alone. Tag group, status, or strength must be represented in text and tooltip.
- Visible percentages declare `0-1` vs `0-100` source scale, precision, rounding, and denominator-zero behavior.
- Dynamic tag coverage, ranking, status, or score values must come from fact/business datasets or resolvers, not static option metadata.

## 8. Placement And Fit

Use variables: `W`, `H`, `P`, `CW = W - 2P`, `CH = H - 2P`.

Default slot budgets:

- `P`: `16-24px`; dense cards may use `12px` only when text and controls still pass fit.
- `headerH`: `40-56px`; title left, one local control or action right.
- `identityH`: `0`, `64-96px` when one object identity is visible.
- `primaryBodyH`: at least `50%` of `CH`; radar body follows `$report-component-style-design` `references/12d1-placement-radar.md` and should not drop below `CH * 0.50`.
- `supportStripH`: `44-72px`; support facts stay `2-4`.
- `footerH`: `16-36px`; source/freshness/detail link only.
- Local controls: title-right capsule/dropdown by default; under-title row only when title remains readable and body floor still passes.

Minimum fit gates:

| Evidence type | Fit floor |
| --- | --- |
| Object profile summary | card `>=420x260`, identity block `>=64px` if visible, support facts `2-4`, evidence visual max `1`. |
| Radar profile | card `>=360x300`, dimensions `5-8` preferred, `<=10`, visible series `<=3`, radar fit box `>=150x150`. |
| Dimension breakdown list/bar | card `>=420x300`, visible dimensions `3-8`, row height `>=28px`, exact values in tooltip/detail. |
| Feature trend | card `>=420x260`, chart body `>=180px`, plot height `>=130px` for axis line. |
| Comparison matrix/table | card `>=520x320`, subjects `3-8`, metrics `3-8`, visible rows `4-8`, grouped header when natural metric groups exist. |
| Scatter/bubble comparison | card `>=420x300`, two numeric axes, point count `12-80`, permanent labels `<=6`. |
| Tag taxonomy/status board | card `>=420x260`, visible tag groups `3-6`, visible tags `<=24`, status colors semantic and labeled. |
| Tag cloud | card `>=420x300`, visible weighted tags `12-30`, ordinary labels never overlap, long labels disclose through tooltip. |
| Tag detail | card `>=420x300`, detail fields `6-12`, long rule text wraps or moves to drawer/fullscreen. |

Responsive fallback order:

1. Collapse secondary controls to dropdown.
2. Reduce support facts to `<=2`.
3. Hide ordinary value labels; keep key labels and tooltip.
4. Reduce radar dimensions/tags/subjects to Top N or selected group.
5. Switch radar to bar/list/table if exact comparison or scale conflict is primary.
6. Move dense tag/rule/detail rows to drawer/table/fullscreen.
7. Split into a larger chart/table/detail block.
8. Reject the visual when required fields, scale, or fit floors fail.

## 9. Visual And Interaction Rules

- Inherit white or near-white analytical surfaces, thin border, `6-8px` radius unless template differs, light shadow, compact typography, muted metadata, stable UI Kit controls, and no nested-card look.
- Use one primary accent plus semantic status colors. Keep fills weak for radar, trend, and comparison evidence so labels and exact-value paths remain readable.
- Object identity uses real object fields. Avatars/icons are supporting recognition, not the main data carrier.
- Tags use stable semantic colors by tag group/status. Do not randomize tag colors per render.
- Radar polygons, bar lengths, tag weights, bubble sizes, and heatmap colors must bind to named numeric fields.
- Shape-sensitive visuals preserve geometry: radar is circular, bubbles use bounded sqrt mapping, avatars/icons do not stretch, and tag clouds do not overlap.
- Hover/focus reveals exact feature or tag values without moving layout. Click opens declared profile detail, tag rule, feature table, fullscreen, or drawer.
- Local controls update only this card or declared local group; otherwise classify as `perspective-switch` or `global-filter`.
- Component body titles are off when the parent block already owns the title; use subtitles/metadata for period, scale, or source.

## 10. States

Required states: `loading`, `empty`, `filtered-empty`, `error`, `no-permission`, `stale`, `missing-dimension`, `missing-score`, `scale-conflict`, `too-many-dimensions`, `too-many-tags`, `long-label`, and `partial-data`.

State rules:

- Loading skeleton preserves header, identity, evidence body, support strip, and footer geometry.
- Empty states name the selected object, period, tag group, or dimension set and offer reset when filters caused it.
- No-permission states do not leak restricted names, scores, tag coverage, or row counts through faded charts.
- Missing dimension/score is shown as missing, not zero. Real zero remains visible.
- Scale conflict blocks radar and routes to standardized score, bar, table, or detail.
- Too many tags/dimensions use grouping, Top N, search, drawer, fullscreen, or table instead of shrinking text.
- Stale tag/feature data shows update time and source or route to data quality detail.

## 11. Anti-AI Gate

Reject or keep readiness `partial` when:

- `analysisPerspective: multiDimensionalProfile` is missing for a component that claims 看多维特征, 画像, 雷达, or 标签.
- A card is selected because it looks polished rather than because the data has object identity, feature dimensions, comparable scores, tag hierarchy, or tag rules.
- Radar, tag color, tag weight, bubble size, bar length, or status color is not tied to named fields.
- Mixed raw units are plotted in one radar without standardization and tooltip disclosure.
- The card has no density limit, label rule, tooltip payload, exact-value route, or fallback.
- The design uses generic blue-purple glass polish, oversized glow, decorative gradients, random chips, stock avatar decoration, or abstract AI imagery.
- It hides messy states such as missing dimensions, stale tags, low coverage, no permission, too many labels, or scale conflict.
- A simpler table/list/bar would answer the exact-value task more clearly.

Use failure IDs:

- `RPT-MULTIDIM-PERSPECTIVE-MISSING`
- `RPT-MULTIDIM-DATA-MISSING`
- `RPT-MULTIDIM-SCALE-MISSING`
- `VIS-MULTIDIM-DENSITY-UNBOUNDED`
- `VIS-MULTIDIM-EVIDENCE-DECORATIVE`
- `VIS-MULTIDIM-SQUEEZED`
- `VIS-MULTIDIM-AI-POLISH`
- `VIS-MULTIDIM-GEOMETRY-WARPED`

## 12. Rule Strength And Proof Matrix

| Rule | Strength | Proof method | Failure ID |
| --- | --- | --- | --- |
| Multidimensional feature cards declare `analysisPerspective: multiDimensionalProfile`, one `multiDimensionalTask`, and one `multiDimensionalFeatureCardPattern`. | MUST/fail | Binding matrix or component config field | `RPT-MULTIDIM-PERSPECTIVE-MISSING` |
| Required object, dimension, tag, score, comparison, source, and freshness fields exist for the selected task. | MUST/fail | Dataset/API/mock schema review | `RPT-MULTIDIM-DATA-MISSING` |
| Radar/parallel profiles use shared or standardized scale; raw values are disclosed. | MUST/fail | Data contract, tooltip payload, renderer option review | `RPT-MULTIDIM-SCALE-MISSING` |
| Radar polygons, tag weights/colors, bars, bubbles, and status encodings bind to named fields. | MUST/fail | Renderer option/data adapter review | `VIS-MULTIDIM-EVIDENCE-DECORATIVE` |
| Dimension, tag, subject, label, and support-fact budgets are declared before styling. | MUST/fail | Source/config plus QA crop/DOM or chart option proof | `VIS-MULTIDIM-DENSITY-UNBOUNDED` |
| Evidence body meets the selected chart/table/list/tag fit floor. | MUST/fail | Slot budget, DOM geometry, screenshot/crop, ECharts/table/tag option proof | `VIS-MULTIDIM-SQUEEZED` |
| Exact-value route exists for hidden/abbreviated feature values, tag rules, and raw standardized values. | MUST/fail | Tooltip/drawer/table/export/action config review | `RPT-NO-ACTION` |
| White-card UI Kit styling remains data-first and avoids generic AI polish. | MUST/fail | Token/style review plus visual QA | `VIS-MULTIDIM-AI-POLISH` |
| Loading, empty, no-permission, stale, missing-dimension, scale-conflict, too-dense, and long-label states preserve geometry. | MUST/fail | State matrix, screenshots/crops, DOM overflow checks | `LAZY-DEFAULT-STATE-ONLY` |
| Local controls are current-card scoped or explicitly reclassified. | MUST/fail | Control semantics contract | `VIS-DUPLICATE-CONTROL` |

## 13. Acceptance Checklist

- `analysisPerspective` is `multiDimensionalProfile`.
- `multiDimensionalFeatureCardPattern` is one of the controlled values above.
- `multiDimensionalFeatureEvidenceBinding` declares task, object/dimension/tag fields, scale policy, density/label rules, tooltip payload, exact-value route, renderer owner, fallback, and validation cases.
- Radar cards satisfy `$report-component-style-design` `references/12d1-placement-radar.md`: dimensions `5-8` preferred, `<=10`, series `<=3`, circular geometry, label ring, tooltip values, and resize proof when implemented.
- Tag cards keep visible tags bounded, label readable, colors semantic, status labeled, and tag rule/source/freshness available.
- Profile summary cards show object identity from real fields and expose enough detail/source context to avoid a decorative persona card.
- Comparison cards prove comparable subject grain, shared metric/unit/grain/filter scope, and exact values.
- Long labels, missing values, stale data, no permission, and too-dense cases have declared fallback.
- No raw screenshot path or image-only memory is required to reproduce the style.
