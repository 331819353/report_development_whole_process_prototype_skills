# Action Recommendation Evidence Card Standard

Use this standard for `actionRecommendation` / 看行动 cards that turn metric evidence into recommended next steps. These cards answer:

```text
Which action should the user take next, why, what evidence triggered it, what impact is expected, and how can the action be started or audited?
```

This is not a generic insight card, ordinary KPI card, or loose task list. It is a card-level decision package: diagnostic signal -> evidence body -> recommended actions -> expected impact / owner / period -> detail or execution route.

## 1. Scope And Source Of Truth

- Component family: action recommendation evidence card / 下一步行动卡 / 建议策略卡 / 待办执行卡.
- Applicable report/page types: management dashboards, operations cockpits, business-analysis pages, KPI diagnosis pages, action workbenches, and executive recommendation sections.
- Source hierarchy: company UI baseline -> report design system -> Modern SaaS BI style contract when requested -> this component standard -> project exception.
- Libraries/renderers: Element Plus or project controls for buttons, tags, segmented controls, checkboxes, date range; ECharts for line/bar/donut evidence; simple HTML/list renderer for action rows; drawer/table for exact values.
- Supported viewports: desktop wide cards first; tablet collapses action rail under evidence; mobile collapses to stacked KPI/evidence/action sections.
- Owner/version/status: report-component-design-spec / v1 / ready for reusable spec adoption.

## 2. Why These Samples Work

The provided samples feel designed because they use a product decision chain rather than visual decoration:

- The page question is concrete: `接下来该做什么?` It sets a user job before showing cards.
- Every card has a stable action grammar: numbered priority -> short problem/opportunity -> metric evidence -> recommended actions -> detail or execution route.
- The layout has clear zones. Left KPI is the trigger, middle chart is proof, right list is what to do, bottom strip is expected outcome / cost / period.
- The visual hierarchy is uneven on purpose: title and primary value are strong; chart and actions are medium; metadata and freshness are quiet.
- Charts are light evidence, not visual variety. Line, bar, or donut appears only because the recommendation needs trend, activity, retention, or ROI structure.
- Actions are bounded to `2-3` items, so the card feels operational instead of generated prose.
- The cards expose business tradeoffs such as expected lift, revenue, acquisition cost, implementation period, deadline, or priority.
- Accent colors are semantic and sparse: priority, impact, or domain category. They do not turn the whole interface into a gradient theme.
- Controls look like enterprise UI Kit controls: segmented perspective switch, date range selector, restrained tags, checkboxes, and action buttons.
- The surface stays quiet: optional white/light analytical surface, reduced border, small radius, subtle shadow only when useful, soft internal fills, no glass, neon, floating ornaments, or large illustrations.
- Copy names actual metrics, objects, baselines, and actions. It does not say only "智能分析", "提升效率", or "持续优化".

This is why the samples do not have an "AI smell": the polish is a side effect of business specificity, density control, and stateful interaction, not a generic SaaS skin.

## 3. Pattern Identity

Use the controlled card-level pattern when the component owns evidence and action routing:

```ts
type ActionRecommendationCardPattern =
  | 'diagnostic-evidence-action-card'
  | 'strategy-impact-action-card'
  | 'task-execution-action-card'
  | 'priority-immediate-action-card';

type ActionEvidenceBodyMode =
  | 'kpi-line-action'
  | 'kpi-bar-action'
  | 'kpi-composition-action'
  | 'kpi-target-gap-action'
  | 'evidence-list-action';
```

Use this mapping:

```text
analysisPerspective: actionRecommendation
componentType: card
visualType: action-recommendation-card
actionRecommendationCardPattern: controlled value above
actionEvidenceBodyMode: controlled value above
actionRecommendationEvidenceBinding: required
```

Pattern selection:

| Pattern | Use When | Sample Role |
| --- | --- | --- |
| `diagnostic-evidence-action-card` | The card recommends actions from one metric trigger plus a line/bar/donut evidence body and a short action list. | Sample 1 basic action recommendations. |
| `strategy-impact-action-card` | The recommendation must show expected effect, benefit, cost, or implementation period in a bottom impact strip. | Sample 2 strategy view. |
| `task-execution-action-card` | Recommendations are executable tasks with checkbox/status/deadline/owner semantics. | Sample 3 to-do view. |
| `priority-immediate-action-card` | The action is high priority and needs a stronger CTA such as `立即行动`, plus impact and period fields. | Sample 4 next-step view. |

Evidence body selection:

| `actionEvidenceBodyMode` | Use When | Required Evidence |
| --- | --- | --- |
| `kpi-line-action` | Trend or target gap triggers the recommendation. | Ordered time rows, current value, baseline/target/gap. |
| `kpi-bar-action` | Activity, reach, frequency, or category comparison triggers the action. | Ordered categories/time, value field, unit, visible bar limit. |
| `kpi-composition-action` | ROI/channel/product/user mix drives the recommendation. | Category, value, total, share, denominator policy. |
| `kpi-target-gap-action` | Under-target / over-target status drives execution. | Current, target, gap, target formula, direction. |
| `evidence-list-action` | Evidence is already adjacent or mostly textual. | Evidence items tied to metrics, objects, or rules. |

## 4. Style Generalization Coverage

The screenshot samples are reusable inspiration, not durable assets. Do not store raw image paths in long-lived standards.

| Sample | Reusable Abstraction | Pattern Coverage | Adaptive Variables | Fallback |
| --- | --- | --- | --- | --- |
| Four-card recommendation board with right action list | Metric trigger + evidence chart + recommended actions | `diagnostic-evidence-action-card` with `kpi-line-action`, `kpi-bar-action`, or `kpi-composition-action` | sequence, priority badge, metric tile, evidence body, action list, detail route | Collapse action list to drawer when width fails. |
| Strategy view with bottom effect strip | Adds expected lift, cost, benefit, and period | `strategy-impact-action-card` | impact metrics, benefit/cost fields, CTA position, local perspective switch | Move impact details to tooltip/drawer on compact cards. |
| To-do view with checkboxes and deadlines | Turns recommendations into executable tasks | `task-execution-action-card` | task status, due date, owner, completion state, start action | Use `operational-list` table/detail fallback when tasks exceed budget. |
| Immediate action view with stronger CTA and colored priority | Emphasizes priority and direct execution | `priority-immediate-action-card` | accent color, action severity, immediate CTA, action route, impact strip | Downgrade CTA to detail link when no action route exists. |

Style generalization contract:

```ts
styleGeneralization: {
  sourceRole: 'reusable-inspiration',
  generalizationStatus: 'covered-by-existing-pattern',
  canonicalPatternRef: 'report-component-design-spec/references/13-action-recommendation-card-standard.md',
  patternFields: ['actionRecommendationCardPattern', 'actionEvidenceBodyMode', 'actionRecommendationEvidenceBinding'],
  componentFamily: 'action-recommendation-card',
  businessTrigger: '看行动 / next-step recommendation after metric diagnosis',
  dataShapeTrigger: 'one trigger metric + one evidence body + 1-3 recommended actions + optional impact/deadline fields',
  adaptiveVariables: ['priority', 'evidenceBodyMode', 'actionCount', 'impactStrip', 'ctaMode', 'taskState'],
  minContainer: '680x220; 720x260 when impact strip is visible',
  responsiveFallback: ['collapse action rail', 'move impact strip to drawer', 'stack sections', 'table/task fallback'],
  rendererOwner: 'project card + ECharts for chart evidence + Element Plus controls',
  textOnlyReproduction: true
}
```

## 5. Anatomy

Required slots:

- Header: sequence badge, action title, priority/impact badge, one-line reason.
- Trigger metric tile: metric name, current value, unit, baseline/target/gap, direction semantics.
- Evidence body: one chart/list/table-proof body matching `actionEvidenceBodyMode`.
- Action rail: `1-3` recommended actions, each with action title and optional owner/deadline/status.
- Detail or action route: `查看详情`, `开始执行`, `立即行动`, create-task route, drawer, or URL.
- Source/freshness: visible footer or tooltip; required when implementation-ready.

Optional slots:

- Bottom impact strip: expected lift, revenue/benefit, cost reduction, long-term value, cycle, confidence.
- Local mode switch: only for perspective mode such as strategy / execution or action state; it is not a global filter.
- Checkbox/task state: only in `task-execution-action-card`.
- CTA button: only when an actual action route exists.

Forbidden slots:

- Decorative AI icons, abstract illustrations, glass panels, gradient orbs, or chart variety unrelated to the recommendation.
- More than one primary chart body inside one card.
- Repeated card title and metric label when they normalize to the same text.
- Action bullets without metric/object/owner/detail route when execution is expected.

## 6. Data Contract

Implementation-ready cards require:

```ts
type ActionRecommendationEvidenceBinding = {
  actionRecommendationCardPattern: ActionRecommendationCardPattern;
  actionEvidenceBodyMode: ActionEvidenceBodyMode;
  sourceDataset: string;
  periodField: string;
  freshnessField?: string;
  activeFilterIds: string[];
  triggerMetric: {
    metricId: string;
    label: string;
    valueField: string;
    unit?: string;
    baselineField?: string;
    targetField?: string;
    gapField?: string;
    direction: 'good-when-higher' | 'good-when-lower' | 'bounded-range';
    numericFormatContractId: string;
  };
  evidenceFields: {
    datasetId: string;
    rendererOwner: 'echarts' | 'html-list' | 'table' | 'project-custom';
    timeField?: string;
    categoryField?: string;
    valueField?: string;
    baselineValueField?: string;
    targetField?: string;
    totalField?: string;
    shareField?: string;
    denominatorPolicy?: string;
    visibleLimit?: number;
  };
  actionItems: Array<{
    actionIdField: string;
    actionTitleField: string;
    actionType: 'optimize' | 'increase' | 'reduce' | 'test' | 'monitor' | 'assign' | 'create-task' | 'open-detail' | 'project-defined';
    ownerField?: string;
    dueDateField?: string;
    statusField?: string;
    priorityField?: string;
    routeField?: string;
  }>;
  impactFields?: {
    expectedMetricField?: string;
    expectedLiftField?: string;
    expectedBenefitField?: string;
    expectedCostField?: string;
    implementationPeriodField?: string;
    confidenceField?: string;
  };
  detailRoute?: string;
  actionRoute?: string;
  tooltipPayload: string[];
  stateRules: string[];
  validationCases: string[];
};
```

Data rules:

- `actionItems.length` defaults to `1-3`; more than `3` moves to drawer/table/task list.
- At least one of `baselineField`, `targetField`, `gapField`, or evidence comparison fields is required. A recommendation with no trigger evidence fails.
- Visible expected effect must be backed by `impactFields` and numeric display contracts.
- Task execution cards need owner/deadline/status or an explicit `guidance-only` exception.
- All visible metrics share the same period and active filters unless a comparison period is explicitly declared.
- Action copy must be operational: optimize copy, increase touch frequency, reallocate budget, simplify form fields, create task, assign owner, monitor threshold, open detail.

## 7. Placement And Fit

Minimum size:

| Tier | Width | Height | Use |
| --- | ---: | ---: | --- |
| Compact | `420-680px` | `220-320px` | Stack metric/evidence/action; no permanent impact strip. |
| Standard wide | `680-960px` | `220-320px` | Left metric, center evidence, right action rail. |
| Wide with impact strip | `720-1080px` | `260-360px` | Standard wide plus bottom expected-effect strip and CTA. |
| Dense execution | `760-1120px` | `300-420px` | Checkable tasks with owner/deadline/status. |

Default wide layout:

```text
P = 20-24px
headerH = 48-64px
footerH = 0px or 52-72px
gap = 20-28px
metricW = clamp(128px, W * 0.16, 176px)
actionW = clamp(200px, W * 0.24, 280px)
chartW = W - P * 2 - metricW - actionW - gap * 2
bodyH = H - P * 2 - headerH - footerH - gaps
```

Slot rules:

- Header title owns the first reading line. Priority badge sits beside title, not above it.
- Metric tile is left aligned and can use a weak tinted surface; it must not look like a nested heavy card.
- Evidence body sits center and must keep standard axis chart body `>=180px` high, or `>=220px` when chart + footer/detail share the same card.
- Action rail is right aligned in wide cards; it stacks below evidence when `chartW < 260px` or `actionW < 200px`.
- Bottom impact strip uses `3-4` cells max plus CTA. If there are more impact fields, keep the top `3` and move the rest to detail.
- CTA sits bottom-right; detail link can sit inside the action rail when no direct execution route exists.

Responsive fallback:

1. Remove decorative icon or sequence emphasis.
2. Collapse bottom impact strip to tooltip/detail.
3. Move action rail below evidence.
4. Hide non-critical chart labels and disclose exact values in tooltip.
5. Move additional actions to drawer/task table.
6. Split into metric/evidence block plus action list when the card cannot satisfy minimums.

## 8. Visual And Interaction Rules

Inherited tokens:

- Use the report/card token family for page surface, card surface, border, radius, shadow, text, muted text, focus, hover, and status colors.
- Default card radius should stay `6-8px` unless inherited tokens differ.
- Use white or near-white card surfaces with subtle borders and soft shadows.

Component-specific rules:

- Sequence badge: `28-36px`, semantic accent, tabular two-digit number when cards form a ranked action set.
- Priority badge: soft fill with short label such as 高优先级, 中优先级, 高影响, 中高影响. It is semantic; do not use it as decoration.
- Metric value: strongest element in the left tile; unit close to number; comparison/gap below.
- Chart evidence: light gridlines, muted axes, one main series unless comparison is required, key labels only.
- Action list: `1-3` rows, check/icon or checkbox at `14-18px`, line height `20-24px`, route affordance visible or discoverable.
- Impact strip: muted label + numeric value; values align by baseline, not floating pills.
- CTA: solid or outline according to action strength; must have hover/focus/disabled/loading states.
- Accent color: one semantic accent per card by priority/domain/status. Multiple category colors are allowed only inside a composition chart legend.

Interaction:

- Hover/focus on card may show border or inset shadow, but cannot translate, scale, or resize the card.
- Chart tooltip exposes exact points/categories, period, source, and formula/denominator when relevant.
- Action row click opens detail, creates task, applies filter, or navigates to an action route. Event payload must include `actionId`, active filters, period, and stale-state behavior.
- Checkbox state is controlled by task status. It cannot be a decorative checkmark when no task state exists.
- Disabled actions must explain missing permission, missing route, stale data, or insufficient evidence.

Accessibility:

- Icon-only action affordances require tooltip/accessible name.
- Status and priority cannot be communicated by color alone.
- Keyboard focus must reach action rows, CTA, detail link, and component-local controls.
- Loading, empty, insufficient-data, no-permission, stale, disabled, and action-failed states preserve card geometry.

## 9. States

Required states:

- Loading: skeleton header, metric tile, evidence body, action rows, and impact strip if present.
- Empty/no recommendation: explain the active condition, e.g. `当前筛选范围内暂无可执行建议`.
- Insufficient evidence: name missing metric/source/baseline and do not render confident recommendations.
- Missing action route: show guidance and detail link, but disable direct CTA.
- No permission: hide restricted values, explain scope, and avoid leaking counts or object names.
- Stale data: show freshness and require refresh/detail before high-impact execution.
- Action submitted: show success, new task id or action id, owner/status, and next state.
- Action failed: show reason, retry/detail route, and preserve selected action.
- Long action text: clamp to visible budget with tooltip/detail; do not clip decision-critical text silently.

## 10. Anti-AI Gate

Reject or keep readiness `partial` when:

- `RPT-ACTION-EVIDENCE-MISSING`: recommendation has no metric trigger, baseline, target, gap, or evidence fields.
- `RPT-ACTION-NO-ROUTE`: the card uses `开始执行` / `立即行动` but has no action route, task route, or detail route.
- `RPT-ACTION-NO-OWNER`: task execution card lacks owner/deadline/status and no guidance-only exception is declared.
- `RPT-ACTION-IMPACT-UNBOUND`: expected lift, revenue, cost, period, or confidence is visible but not bound to fields.
- `RPT-ACTION-CLOSURE-MISSING`: action tasks have no submitted/failed/done/stale state.
- `VIS-ACTION-AI-POLISH`: design depends on generic gradients, glass, glow, decorative icons, or "AI/SaaS polish" instead of evidence and action semantics.
- `VIS-ACTION-PILEUP`: one card contains more than one primary evidence chart, more than `3` permanent actions, or more than `4` bottom impact cells.
- `VIS-ACTION-CHART-SQUEEZED`: evidence chart falls below chart-body or plot-height minimums.
- `VIS-ACTION-FOOTER-OVERFLOW`: impact strip or CTA overlaps values/actions or clips decision-critical text.

Countermeasure:

```text
one trigger metric -> one evidence body -> 1-3 actions -> expected impact/owner/period -> detail/execution route -> closure state
```

## 11. Implementation Handoff

Recommended config fields:

```ts
{
  analysisPerspective: 'actionRecommendation',
  componentType: 'card',
  visualType: 'action-recommendation-card',
  actionRecommendationCardPattern: 'strategy-impact-action-card',
  actionEvidenceBodyMode: 'kpi-line-action',
  actionRecommendationEvidenceBinding: { ... },
  styleGeneralization: { textOnlyReproduction: true, ... }
}
```

Renderer rules:

- Use ECharts for standard line, bar, and donut evidence. Do not hand-draw standard charts while importing ECharts.
- Use Element Plus or project-standard buttons, tags, checkboxes, segmented controls, and date range controls.
- Action row DOM should expose `data-action-id`, status, owner, and route metadata for tests.
- Chart DOM / ECharts options should expose renderer ownership, dataset fields, tooltip payload, axis/legend budgets, and resize lifecycle proof.

QA evidence:

- DOM overflow: no `scrollHeight > clientHeight + 2` or `scrollWidth > clientWidth + 2` for decision-critical header, metric, action, impact, or CTA content unless a declared scroll/detail path exists.
- Chart fit: chart body `>=180px` for standard axis evidence; plot height `>=120px`; no axis-label stacking.
- Action route: clicking CTA or action row emits the declared action event with period/filter/action payload.
- State coverage: loading, insufficient evidence, no permission, stale data, submitted, failed, and disabled CTA states render in stable geometry.
- Text-only reproducibility: a downstream agent can implement the card from pattern field, binding, slots, and tokens without opening the original images.

## 12. Governance

Allowed variants:

- `diagnostic-evidence-action-card`
- `strategy-impact-action-card`
- `task-execution-action-card`
- `priority-immediate-action-card`

Deprecated patterns:

- Generic insight cards that only list "建议关注 / 持续优化".
- KPI cards with decorative action bullets but no route or impact.
- Task lists detached from the metric or evidence that triggered them.
- Full-card gradient/glass "AI recommendation" cards.

Exceptions:

- Static advisory reports may omit `actionRoute` only when `detailRoute` exists and the card labels the action as guidance, not execution.
- A card may use `evidence-list-action` when the evidence is already visible in adjacent components, but it must cite component IDs, metric IDs, or detail route.

Migration notes:

- Existing conclusion/evidence/action cards that answer `这组数据说明了什么` remain `conclusionInsight`.
- Cards that answer `接下来该做什么` and own action execution, expected impact, or task closure migrate to `actionRecommendation`.
- If the card is only a task list with no metric trigger, use `visualType: operational-list` and `listStatusPattern: progress-task-list` instead.
