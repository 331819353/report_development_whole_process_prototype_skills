# Review Impact Card Standard

Use this standard for `analysisPerspective: reviewImpact`, such as 看复盘, 复盘卡, 事件卡, 活动影响评估卡, 前后对比卡, and "某个动作/活动带来了什么变化?".

The source images are reusable inspiration, not durable assets. Durable knowledge is the text contract below: a text-only downstream agent must be able to reproduce the design strength from the business question, event metadata, baseline method, controlled pattern fields, slot budgets, and acceptance gates.

## 1. Scope And Source Of Truth

- Component family: review impact / event impact / activity post-review cards.
- Analysis perspective: `analysisPerspective: reviewImpact`.
- Applicable pages: campaign review, product experiment review, release review, operation action review, conversion optimization review, and management report sections that compare before/after or impacted/control evidence.
- Source hierarchy: company UI baseline -> report design system -> Modern SaaS BI style contract when requested -> this review-impact standard -> project-specific experiment, event, or metric contract.
- Primary mapping references: `$report-info-component-mapping` `references/00-analysis-perspective-card-taxonomy.md`, `$report-info-component-mapping` `references/06-binding-implementation-contract.md`, `$report-info-component-mapping` `references/08-generation-stability.md`, and `$report-info-component-mapping` `references/09-component-mapping-gates.md`.
- Supporting style references: `$report-component-style-design` `references/04a-kpi-card-patterns.md`, `$report-component-style-design` `references/05d-basic-chart-card-patterns.md`, `$report-component-style-design` `references/10-in-component-controls.md`, `$report-component-style-design` `references/12b-placement-insight-kpi.md`, and `$report-component-style-design` `references/12-component-acceptance-gates.md`.
- Renderers: project card components for the shell, Element Plus/project controls for tabs/dropdowns/tooltips/drawers, ECharts for trend/bar/funnel evidence, and table/list renderer for exact audit rows.
- Supported viewports: standard wide card `720x220+`; trend/funnel/segment evidence `760x260+`; compact conclusion card `560x180+`; mobile collapses to stacked event identity -> evidence -> conclusion.
- Owner/version/status: report-component-design-spec / v1 / ready for reusable spec adoption.

## 2. Why These Samples Feel Designed

These samples feel designed because the visual style comes from a strict review logic, not from generic polish.

1. One business question anchors every card: "这个动作/活动带来了什么变化?" The card does not drift into generic insight, ranking, or dashboard decoration.
2. Event identity is separated from evidence. The left rail gives event name, type, period, audience, and icon; the right side proves impact with metrics, trend, funnel steps, or segments.
3. The comparison method is visible. Before/after, trend, funnel, segment, or control-group comparison is shown as a controlled mode rather than an arbitrary chart choice.
4. Visual variety follows data shape. KPI strips, annotated lines, funnel bars, and segment bars appear only because the evidence task differs.
5. Whitespace is editorial and functional. A vertical divider, generous gutters, and fixed evidence slots create a reading path: event -> method -> evidence -> conclusion.
6. UI controls look product-native. Segmented controls and compact dropdowns are small, aligned, and data-scoped; they do not become floating decorative chips.
7. Colors are semantic accents. Blue, green, violet, and amber identify event types or evidence families, while the card surface stays white and restrained.
8. Metrics are audit-friendly. Values, units, baseline labels, pp deltas, source/freshness, and exact-value routes are visible or discoverable.
9. The cards tolerate messy reality. Valid designs support neutral, negative, missing, insufficient, delayed, and no-permission states instead of always showing smooth uplift.
10. The style is not image-dependent. A non-multimodal model can rebuild the card from event fields, baseline fields, evidence mode, slot rules, and fallback rules.

The "no AI smell" comes from concrete event context, bounded evidence, exact baseline logic, and restrained UI Kit language. It does not come from gradients, glass, oversized icons, or random mini charts.

## 3. Controlled Pattern Fields

Use these fields whenever one card packages event context plus impact evidence.

```ts
type ReviewImpactCardPattern =
  | 'event-kpi-overview-card'
  | 'event-trend-lift-card'
  | 'event-funnel-lift-card'
  | 'event-segment-lift-card'
  | 'event-conclusion-card';

type ReviewImpactEvidenceMode =
  | 'before-after-kpi-strip'
  | 'event-annotated-trend'
  | 'funnel-step-lift'
  | 'segment-lift-bars'
  | 'impact-summary-strip';
```

Recommended mapping:

```text
analysisPerspective: reviewImpact
componentType: card
visualType: metric-card | line | bar | table | text-summary
reviewImpactCardPattern: ReviewImpactCardPattern
reviewImpactEvidenceMode: ReviewImpactEvidenceMode
reviewImpactEvidenceBinding: ReviewImpactEvidenceBinding
```

Keep `visualType` as the real evidence family. The review-impact fields own the event context, baseline method, comparison semantics, conclusion band, and fallback.

## 4. Pattern Selection

| User phrase / data shape | `reviewImpactCardPattern` | `reviewImpactEvidenceMode` | Main body | Minimum useful size |
| --- | --- | --- | --- | --- |
| 快速看活动前后核心指标变化 | `event-kpi-overview-card` | `before-after-kpi-strip` | `2-5` metric cells with before/after/delta | `720x220` |
| 活动上线后趋势是否抬升 | `event-trend-lift-card` | `event-annotated-trend` | line chart with event marker and optional control/baseline | `760x260` |
| 活动是否改善转化环节 | `event-funnel-lift-card` | `funnel-step-lift` | funnel/step rows with impacted value, baseline/control, lift | `760x260` |
| 不同用户/门店/区域受影响是否不同 | `event-segment-lift-card` | `segment-lift-bars` | grouped bars or row bars by segment | `760x260` |
| 只需要复盘摘要或结论条 | `event-conclusion-card` | `impact-summary-strip` | one conclusion plus `1-3` evidence facts | `560x180` |

Selection order:

1. If the user needs "活动前后核心指标变化", choose `event-kpi-overview-card`.
2. If the claim depends on an event date, launch date, trend break, or treatment/control line, choose `event-trend-lift-card`.
3. If the claim depends on ordered conversion steps, choose `event-funnel-lift-card`.
4. If the claim depends on group/user segment heterogeneity, choose `event-segment-lift-card`.
5. If evidence exists in adjacent components and this card only summarizes the result, choose `event-conclusion-card`.

Do not use review-impact cards for ordinary trend, ordinary comparison, or generic conclusion cards when no event/action/activity identity exists.

## 5. Evidence Binding

Every implementation-ready review-impact card must declare event identity, baseline method, visible metrics, numeric formats, exact-value route, and state cases.

```ts
type ReviewImpactEvidenceBinding = {
  reviewImpactTask:
    | 'metric-overview'
    | 'trend-lift'
    | 'funnel-lift'
    | 'segment-lift'
    | 'summary';
  eventDatasetId: string;
  eventIdField: string;
  eventNameField: string;
  eventTypeField?: string;
  eventStartField: string;
  eventEndField?: string;
  eventMarkerField?: string;
  audienceField?: string;
  sourceDataset: string;
  periodField: string;
  timeGrainField?: string;
  baselineMethod:
    | 'pre-post-window'
    | 'control-group'
    | 'difference-in-differences'
    | 'matched-baseline'
    | 'custom-defined';
  beforeWindowField?: string;
  afterWindowField?: string;
  controlGroupField?: string;
  metricItems?: Array<{
    metricId: string;
    label: string;
    beforeValueField?: string;
    afterValueField: string;
    controlValueField?: string;
    deltaField: string;
    deltaRateField?: string;
    liftField?: string;
    unit: string;
    numericFormatContractId: string;
    direction: 'higher-is-better' | 'lower-is-better' | 'neutral';
  }>;
  trendFields?: {
    datasetId: string;
    timeField: string;
    impactedValueField: string;
    baselineValueField?: string;
    controlValueField?: string;
    eventDateField: string;
    confidenceBandField?: string;
  };
  funnelFields?: {
    stepField: string;
    stepOrderField: string;
    beforeValueField?: string;
    afterValueField: string;
    controlValueField?: string;
    conversionRateField?: string;
    liftField: string;
  };
  segmentFields?: {
    segmentField: string;
    impactedValueField: string;
    baselineValueField?: string;
    controlValueField?: string;
    liftField: string;
    sampleSizeField?: string;
  };
  conclusionField?: string;
  sourceField?: string;
  freshnessField?: string;
  activeFilterIds: string[];
  localControls?: string[];
  tooltipPayload: string[];
  exactValueRoute?: string;
  detailTableRoute?: string;
  validationCases: string[];
};
```

Rules:

- `baselineMethod` is mandatory. A card cannot claim "效果提升" or "带来变化" without before/after, control group, or named custom baseline.
- Causal wording such as "带来", "推动", or "提升" requires `control-group`, `difference-in-differences`, matched baseline, or a documented business rule. Otherwise use descriptive wording such as "上线后变化".
- Delta formulas must be explicit. Percentage point deltas use `after_rate - before_rate`; percent growth uses `(after - before) / before`.
- Every visible metric has a numeric display contract and direction semantics.
- Event marker, before/after window, and missing-period behavior must be inspectable.
- Exact values, source/freshness, and detail rows must be available through tooltip, drawer, table, or export route.

## 6. Style Generalization Coverage

The provided sample universe maps to controlled review-impact patterns.

| Sample role | Reusable abstraction | Pattern coverage | Adaptive variables | Fallback |
| --- | --- | --- | --- | --- |
| Metric overview cards with event left rail and `2-4` metric cells | Event identity + before/after KPI strip | `event-kpi-overview-card` + `before-after-kpi-strip` | metric count, event accent, period labels, delta display, conclusion strip | Reduce metrics to Top3, move lower-priority metrics to tooltip/table. |
| Event trend cards with launch marker and side lift summary | Event date + impacted/control trend + lift fact | `event-trend-lift-card` + `event-annotated-trend` | event marker, baseline/control series, lift summary, trend window | Hide side fact, collapse legend/control, or split to full trend chart. |
| Funnel or step comparison cards | Ordered steps + impacted/control/baseline lift | `event-funnel-lift-card` + `funnel-step-lift` | step count, row height, lift column, baseline/control label | Reduce to key steps, move exact audit to table/drawer. |
| Segment comparison cards | Segment rows + impacted value + baseline/control + lift | `event-segment-lift-card` + `segment-lift-bars` | segment count, sort rule, bar track, lift column, selected metric | Reduce to Top5, paginate/scroll, or split to table. |
| Bottom conclusion bands | One concise result with evidence icon and source/freshness | `event-conclusion-card` + `impact-summary-strip` | confidence, source, action/detail route, accent color | Move long conclusion to drawer; keep one-line visible summary. |

Style generalization contract:

```ts
styleGeneralization: {
  sourceRole: 'reusable-inspiration',
  generalizationStatus: 'requires-pattern-extension',
  canonicalPatternRef: '$report-component-design-spec/references/14-review-impact-card-standard.md',
  patternFields: ['reviewImpactCardPattern', 'reviewImpactEvidenceMode', 'reviewImpactEvidenceBinding'],
  componentFamily: 'review-impact-card',
  businessTrigger: '看复盘 / event or activity impact review',
  dataShapeTrigger: 'event identity + baseline method + before/after, trend, funnel, segment, or summary evidence',
  adaptiveVariables: ['eventAccent', 'baselineMethod', 'metricCount', 'evidenceMode', 'localControls', 'conclusionBand'],
  minContainer: '720x220; 760x260 for chart/funnel/segment evidence',
  responsiveFallback: ['reduce metric count', 'collapse controls', 'move exact values to drawer/table', 'split to full chart/table'],
  rendererOwner: 'project card + ECharts for chart evidence + Element Plus/project controls',
  textOnlyReproduction: true
}
```

## 7. Anatomy

Required slots:

- Header question: concrete review question, usually "某个动作/活动带来了什么变化?" or a project-specific variant.
- Event identity rail: event icon, event type/status chip, event name, event period, audience/scope, optional owner/source.
- Evidence body: one primary body selected by `reviewImpactEvidenceMode`.
- Baseline/control label: visible before/after period, control group, or custom baseline method.
- Delta/lift display: value, unit, direction, and whether it is pp delta or percent growth.
- Conclusion band: one short result or "insufficient evidence" state.
- Exact-value path: tooltip, drawer, detail table, or export route.

Optional slots:

- Local control zone: perspective switch such as 前后对比/趋势对比, metric dropdown, segment dropdown, or comparison group dropdown.
- Side lift summary: `1-2` facts such as average lift, post-launch 7-day average, top lifted segment, or biggest funnel step lift.
- Source/freshness footnote: source dataset, update time, or experiment version.

Forbidden slots:

- Decorative full-card gradients, glass panels, large illustration backgrounds, abstract AI icons, or particle effects.
- Multiple unrelated chart bodies inside one review card.
- Generic copy such as "智能洞察", "效果明显", or "建议持续优化" without metric, baseline, period, and source evidence.
- Event-looking icon cards with no event ID/date/baseline binding.

## 8. Placement And Fit

Use `W`, `H`, `P`, `CW`, and `CH` as local variables:

- `P = 24px` standard, `P = 16px` compact.
- `CW = W - 2P`; `CH = H - 2P`.
- Standard wide card: `W >= 720`, `H >= 220`.
- Evidence chart cards: `W >= 760`, `H >= 260`.

Standard wide card slot rules:

| Slot | X/Y/Size | Alignment |
| --- | --- | --- |
| Header | `x=P`, `y=P`, `w=CW`, `h=44-56` | title left; local controls top-right |
| Event rail | `x=P`, `y=P+64`, `w=200-260`, `h=CH-64` | scan-aligned left; icon above labels |
| Divider | `x=P+eventRailW+24`, `y=P+72`, `h=CH-88` | 1px neutral line |
| Evidence body | `x=dividerX+28`, `y=P+72`, `w=CW-eventRailW-56`, `h=CH-100` | chart/table centers inside reserved bands |
| Conclusion band | bottom inside evidence area, `h=36-52` | one line; wraps to two lines only in tall cards |

Pattern-specific budgets:

- `event-kpi-overview-card`: metric cells `2-5`; each metric cell `>=128px` wide; value line `>=32px`; comparison line `18-22px`; conclusion band `36-48px`.
- `event-trend-lift-card`: chart body `>=180px` wide and plot height `>=130px`; event marker label stays above plot or in tooltip; visible series `<=3`.
- `event-funnel-lift-card`: steps `3-6` default and `<=8` before collapse; row height `>=28px`; lift column `>=72px`; exact values in tooltip/table.
- `event-segment-lift-card`: visible segments `3-5` default and `<=8`; bar track `>=120px`; segment label column `>=96px`; sort rule declared.
- `event-conclusion-card`: visible evidence facts `1-3`; long explanation moves to drawer/detail.

Responsive fallback order:

1. Collapse local controls into a dropdown.
2. Reduce metric cells or segment/step rows to Top3/Top5.
3. Hide secondary icon/status copy, not values or baseline labels.
4. Move exact rows to drawer/table.
5. Split chart/table into a full block before squeezing below its plot or row floor.

## 9. Visual And Interaction Rules

- Surface: white or near-white card with thin border, small radius `6-8px`, subtle shadow, and no nested card styling.
- Event badge: `40-48px` icon circle or rounded square; accent color maps to event type or status and must be sparse.
- Typography: title strong, event name medium, metadata muted, numeric values tabular, units close to values.
- Divider and gutters create hierarchy. Do not add extra cards inside the body.
- Chart treatment: muted grid/axes, key labels only, semantic event marker, exact tooltip, and no decorative plot background.
- Controls: `2-4` short modes use segmented/capsule control; more options use dropdown; controls are `local-filter` unless they change metric set or evidence mode, in which case classify as `perspective-switch`.
- Hover/focus: stable border/outline/inset shadow. No translate, scale, or geometry-shifting hover.
- Accessibility: event badge has accessible event type/name; deltas include non-color cues; event marker and control states are keyboard reachable.

## 10. Rule Strength And Failure IDs

| Rule | Strength | Failure ID |
| --- | --- | --- |
| Event identity must include event id/name and event start date or period. | MUST/fail | `RPT-REVIEW-EVENT-MISSING` |
| Baseline method must be declared before showing lift/change. | MUST/fail | `RPT-REVIEW-BASELINE-MISSING` |
| Causal uplift wording must have control-group, difference-in-differences, matched baseline, or approved business rule. | MUST/fail | `RPT-REVIEW-CAUSALITY-UNPROVEN` |
| Every visible metric needs formula/unit/precision/source/freshness and direction semantics. | MUST/fail | `RPT-REVIEW-METRIC-CONTRACT-MISSING` |
| Local controls must declare scope and schema impact. | MUST/fail | `RPT-REVIEW-CONTROL-SCOPE-MISSING` |
| Event marker, baseline label, and exact values must be inspectable. | MUST/fail | `RPT-REVIEW-EXACT-VALUE-MISSING` |
| Evidence body must meet its plot/table/row budget. | MUST/fail | `VIS-REVIEW-EVIDENCE-SQUEEZED` |
| Event marker must not be visually ambiguous or detached from the event date/period. | MUST/fail | `VIS-REVIEW-EVENT-MARKER-AMBIGUOUS` |
| The card should use left event rail + right evidence body for standard desktop cards. | SHOULD/exception-required | `VIS-REVIEW-RAIL-MISSING` |
| Accent color should remain semantic and sparse. | SHOULD/exception-required | `VIS-REVIEW-AI-POLISH` |

## 11. Implementation Handoff

- ECharts line evidence uses ordered rows, event marker `markLine` or equivalent annotation, tooltip with before/after/control values, and ResizeObserver-backed resize lifecycle.
- Bar/funnel evidence uses data-driven ECharts bar/funnel or project table/list renderer. Do not hand-draw standard bars while importing ECharts.
- Metric cells and deltas use shared numeric formatter contracts; do not use component-local `toFixed` assumptions.
- Tooltip payload includes event, period, baseline method, metric value, baseline/control value, delta, source, and freshness.
- Detail drawer/table reuses the same active filters and event id.
- Empty/insufficient state explains which evidence is missing: event, baseline, metric rows, control group, source freshness, or permission.

## 12. Acceptance Checklist

- `analysisPerspective: reviewImpact` is declared.
- One controlled `reviewImpactCardPattern` and one `reviewImpactEvidenceMode` are selected.
- `reviewImpactEvidenceBinding` declares event identity, baseline method, metric fields, source/freshness, tooltip payload, exact-value route, and validation cases.
- Style generalization is text-only and does not depend on raw image paths.
- The selected evidence body fits its minimum size and display budget.
- The card distinguishes before, after, event date, control/baseline, and missing periods.
- Causal wording is either supported or downgraded to descriptive wording.
- Local controls are scoped and classified as `local-filter` or `perspective-switch`.
- Conclusion copy is one concrete result tied to visible evidence.
- Loading, empty, insufficient, no-permission, stale, negative-impact, and neutral-impact states preserve geometry.
- No generic AI/SaaS polish, decorative gradients, or chart variety appears without a data reason.
