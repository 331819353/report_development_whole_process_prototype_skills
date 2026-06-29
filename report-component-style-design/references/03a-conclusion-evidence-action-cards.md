# Conclusion Evidence Action Card Patterns

Use this reference when a report needs an executive conclusion card that combines a lead conclusion, KPI evidence, key findings, and recommended actions. It captures cards such as `结论卡` with a large sequence number, semantic document/check icon, quoted conclusion statement, core metric overview, key findings, and action suggestions.

This is an Analysis & Insight pattern. Pair it with:

- `03-text-summary.md` for Analysis & Insight copy, state, and subtype rules.
- `04a-kpi-card-patterns.md` for the embedded KPI evidence strip.
- `12b-placement-insight-kpi.md` for conclusion and KPI placement budgets.
- `report-component-design-spec` when this must become a reusable component-family standard.

## Pattern Identity

Do not create a new `visualType`. Use:

```text
componentType: text-summary
visualType: text-summary
analysisInsightContract.subtype: conclusion-card
analysisInsightContract.insightFamily: conclusion
analysisInsightContract.conclusionCardPattern: one of the values below
```

| `conclusionCardPattern` | Use when | Visual structure |
| --- | --- | --- |
| `metric-evidence-conclusion` | The conclusion must be backed by visible KPI evidence and followed by findings/actions. | Sequence/title/icon, quoted lead conclusion, KPI overview strip, key findings, action suggestions. |
| `finding-action-conclusion` | KPI evidence is already visible nearby, and the card should focus on interpretation and next steps. | Lead conclusion, compact evidence lines, key findings, action suggestions, optional detail route. |
| `compact-conclusion-summary` | The available space is small and only a generated one-sentence conclusion plus one evidence/action line can fit. | Short title/status, one generated conclusion, one evidence line, one next action or detail link. |

Selection order:

1. Use `metric-evidence-conclusion` when the card is a standalone executive conclusion or first-read summary.
2. Use `finding-action-conclusion` when KPI cards/charts/tables already provide the exact evidence in the same block.
3. Use `compact-conclusion-summary` for side panels, mobile previews, section headers, or constrained report cards.
4. If the copy cannot cite a metric, source, baseline, affected object, or action path, do not generate a conclusion card; use a data-quality or insufficient-data state instead.

## Why It Feels Designed

This card feels designed and not AI-generated because it turns analysis into a decision chain:

- The sequence number and title establish that this is a report section, not random decorative text.
- The quoted lead conclusion gives a single business judgment before details.
- The KPI overview proves the conclusion with comparison, actual, target, change rate, and completion rate.
- Key findings translate the KPI into reasons or interpretation.
- Action suggestions translate the findings into next steps.
- Icons are semantic markers for conclusion, discovery, and action; they do not replace content.
- The light blue quote box, weak borders, and section cards are restrained, so evidence and copy stay dominant.
- The language is concrete: it names actual value, target attainment, growth, product line, strategy, or channel support instead of generic "持续优化".

## Business Purpose

The card must answer one complete question:

```text
What is the main judgment, what evidence supports it, why did it happen, and what should the user do next?
```

Valid business uses:

- Executive monthly/weekly report conclusion.
- Sales, profit, operation, production, inventory, SLA, risk, quality, or project progress summary.
- Dashboard first-read conclusion that must bridge KPI cards, charts, tables, and next actions.
- Review cards at the end of a report section.

Invalid uses:

- Decorative text card with no data, source, evidence, or action.
- Long essay narrative inside a dense dashboard.
- Multiple unrelated conclusions in one card.
- Recommendation card without a named owner, action path, or measurable trigger when action execution matters.
- A conclusion that says performance is good while KPI, chart, or table evidence contradicts it.

## Required Data Contract

Implementation-ready cards require:

```ts
type ConclusionCardPattern =
  | 'metric-evidence-conclusion'
  | 'finding-action-conclusion'
  | 'compact-conclusion-summary';

type ConclusionEvidenceBodyMode =
  | 'kpi-strip-sparkline'
  | 'trend-compare-chart'
  | 'composition-structure'
  | 'formula-driver-chain'
  | 'segment-action-table'
  | 'findings-action-list';

type ConclusionEvidenceActionContract = {
  conclusionRuleId: string;
  conclusionCardPattern: ConclusionCardPattern;
  conclusionEvidenceBodyMode: ConclusionEvidenceBodyMode;
  subtype: 'conclusion-card';
  insightFamily: 'conclusion';
  generatedConclusionTemplate: string;
  fallbackConclusion?: string;
  metricSummaryItems: Array<{
    metricId: string;
    label: string;
    valueField: string;
    unit?: string;
    comparisonField?: string;
    targetField?: string;
    attainmentRateField?: string;
    valueRole: 'comparison' | 'actual' | 'target' | 'attainment' | 'gap' | 'status';
    numericFormatContractId: string;
  }>;
  evidence: string[];
  keyFindings: string[];
  recommendedActions: string[];
  sourceDataset: string;
  periodField: string;
  freshnessField?: string;
  confidence: 'high' | 'medium' | 'low' | 'insufficient';
  definitionRefs?: string[];
  affectedObjects?: string[];
  ownerOrActionRoute?: string;
  tooltipPayload: string[];
  detailRoute?: string;
  stateRules: string[];
};
```

Data rules:

- The lead conclusion must cite or derive from at least one visible metric item, evidence field, or linked component.
- `conclusionEvidenceBodyMode` must match the actual evidence shape. Do not choose a body because it looks varied.
- `metricSummaryItems` must share the active report filters and period context.
- Every visible number needs a numeric display contract. Avoid component-local formatter assumptions.
- Findings must map to evidence, affected objects, or reason fields. They cannot be generic analysis filler.
- Actions must be operational: optimize strategy, support a channel, monitor target attainment, open detail, create task, or assign owner. Avoid untestable advice.
- If confidence is `insufficient`, the conclusion changes into an insufficient-data state and should not make a positive business claim.

## Shared Anatomy

All patterns use these zones:

| Zone | Rule |
| --- | --- |
| Sequence/title | Optional sequence number plus visible title. Use when cards are reviewed as a report story. |
| Semantic icon | Optional document/check, lightbulb, target/action icon. It stays secondary. |
| Lead conclusion | Required. One judgment sentence, visually strongest after the title. |
| Quote or emphasis box | Optional for lead cards. It frames the conclusion but must not look like decoration without evidence. |
| KPI overview | Required for `metric-evidence-conclusion`; optional for other variants. Shows `2-4` metric cells. |
| Key findings | `2-3` bullets by default, each tied to metric evidence or affected objects. |
| Action suggestions | `1-3` bullets, each testable or routed to an action/detail path. |
| Source/freshness/detail | Tooltip, footer, drawer, or detail route. |
| State surface | Loading, insufficient data, empty, error, no-permission, stale-data. |

Decision structure:

```text
lead conclusion -> KPI evidence -> findings -> action suggestions -> source/freshness/detail
```

## Evidence Body Modes

Use `conclusionEvidenceBodyMode` to preserve the design value of screenshot-derived conclusion cards without depending on screenshots. The mode chooses the middle/right evidence body inside the same conclusion-card grammar.

| `conclusionEvidenceBodyMode` | Use when | Typical body | Why it feels designed |
| --- | --- | --- | --- |
| `kpi-strip-sparkline` | The conclusion is mainly a status judgment backed by `2-4` core metrics and a short movement signal. | KPI strip, thin dividers, tabular values, one small trend line or area sparkline. | It creates a quick judgment-to-proof scan and avoids a generic text-only summary. |
| `trend-compare-chart` | The conclusion depends on current vs previous, target vs actual, or another named time baseline. | One readable line/bar body with current and baseline series plus `1-2` side metrics. | The comparison is visible in the chart, so the wording does not feel invented. |
| `composition-structure` | The conclusion explains structure, share, new/old user mix, product mix, or segment contribution. | Donut/ring, small bar comparison, share table, or compact structure list. | The body answers "what is made of what" instead of decorating the card with chart variety. |
| `formula-driver-chain` | The conclusion is a driver or metric equation, such as conversion x unit price x order count = revenue. | `2-4` factor tiles, operator rail, result tile, and delta under each factor. | It makes the data logic visible; the design strength comes from decomposition, not polish. |
| `segment-action-table` | The conclusion ends in differentiated operation, priority, user segment, or action routing. | Segment table or list with share, revenue/impact, risk/rebuy/priority, and suggested action. | It turns insight into action and gives exact rows that can be audited. |
| `findings-action-list` | Evidence is already visible nearby, and the card should summarize findings and next steps. | Key finding bullets plus action bullets, owner/detail route optional. | It keeps the card decision-oriented without repeating nearby KPI/chart evidence. |

Selection order:

1. Use `formula-driver-chain` when the conclusion uses an explicit equation or multiplicative/additive drivers.
2. Use `composition-structure` when shares, cohorts, structure, or part-to-whole evidence is the main proof.
3. Use `trend-compare-chart` when the baseline comparison is a time series or period-over-period visual.
4. Use `segment-action-table` when the output must route different groups to different actions.
5. Use `kpi-strip-sparkline` for a first-read executive status summary.
6. Use `findings-action-list` when evidence is already shown in adjacent components.

Fit rules:

- One conclusion card owns exactly one primary evidence body mode. Combine modes only by splitting into separate cards or moving secondary evidence to tooltip/drawer.
- Keep permanent evidence items bounded: KPI cells `2-4`, trend series `1-2`, formula factors `2-4`, segment/action rows `3-5`, and findings/actions `1-3` each.
- Evidence bodies stay quieter than the lead conclusion. Icons, badges, gradients, and illustrations are optional and secondary.
- If the selected body cannot satisfy its required fields or size floor, downgrade to `kpi-strip-sparkline`, `findings-action-list`, or `compact-conclusion-summary` before inventing a decorative body.

## Pattern: `metric-evidence-conclusion`

Use for a full executive conclusion card.

Layout:

- Sequence number and title sit top-left; semantic icon or soft symbol sits top-right.
- Quote/emphasis box contains the main conclusion, usually `2` lines.
- KPI overview strip follows the conclusion and uses `2-4` cells. The actual value is the visual anchor.
- Findings and actions are grouped in one lower panel or two stacked sections.
- Findings use dot bullets; actions use check icons or action markers.

Strength:

- Gives a complete "judgment -> evidence -> reason -> action" story in one component.
- Works well as the first or final card of a report section.

Rules:

- Keep one generated main conclusion only, produced from `conclusionRuleId` and the current data context.
- Default KPI strip uses comparison, actual, and target/attainment. More than `4` cells moves to drawer/detail.
- The actual metric can use primary blue and larger text; comparison/target stay calmer.
- Findings and actions should be parallel and specific: at most `3` each.
- The quote box must not be the only evidence. It must be followed by KPI or linked evidence.

## Pattern: `finding-action-conclusion`

Use when the card lives beside charts, tables, or KPI strips and should avoid repeating all metrics.

Layout:

- Lead conclusion stays at the top.
- Evidence appears as short inline metric references or linked component IDs.
- Findings and actions use a two-section list.
- Optional detail route opens full explanation, source, and historical evidence.

Strength:

- Good for dense dashboards where the conclusion should guide action without duplicating every number.

Rules:

- Show `1-2` visible evidence lines, not a full KPI strip.
- Findings should reference nearby component evidence such as trend, ranking, table, or target gap.
- If actions depend on ownership or workflow, show owner/status in tooltip or detail route.

## Pattern: `compact-conclusion-summary`

Use for small cards, mobile previews, or section headers.

Layout:

- Title/status label, one generated conclusion sentence, one evidence line, one action/detail link.
- Icon is optional and usually smaller than in the full card.
- No separate lower panel unless height allows.

Strength:

- Keeps conclusion discipline in constrained spaces.

Rules:

- Conclusion budget: `12-28` Chinese characters or `1-2` lines.
- Evidence budget: one line with one metric or baseline.
- Action budget: one link or one short bullet.
- If any of the three elements cannot fit, keep conclusion + evidence and move action to tooltip/detail.

## Size And Layout Budget

Recommended component size:

| Tier | Width | Height | Use |
| --- | ---: | ---: | --- |
| Compact | `280-420px` | `160-280px` | One conclusion, one evidence line, one action/detail. |
| Standard vertical | `420-560px` | `640-820px` | Full sequence/title, quote, KPI strip, findings, actions. |
| Wide report | `560-760px` | `420-640px` | Quote + KPI strip with findings/actions in two columns. |

Default vertical budget for the full card:

```text
P = 20-28px
headerH = 72-96px
quoteH = 96-136px
sectionTitleH = 28-36px
kpiStripH = 104-136px
findingsActionsH = 220-320px
footerH = 0-28px
H = P * 2 + headerH + quoteH + sectionTitleH + kpiStripH + findingsActionsH + footerH + gaps
```

KPI strip budget:

| KPI cells | Behavior |
| ---: | --- |
| `2` | Comfortable, value plus comparison/target. |
| `3` | Default: comparison, actual, target/attainment. |
| `4` | Accept only when width allows and labels are short. |
| `>4` | Move to detail drawer or linked KPI cards. |

Fit rules:

- Keep the lead conclusion readable before tuning icon or quote decoration.
- Findings and actions should not exceed `3` items each in the default card.
- If height fails, remove decorative icon, shrink quote box, move secondary KPI values to tooltip, then collapse findings/actions into one list.
- Never shrink body text below the project minimum to preserve all bullets.

## Visual Rules

- Use one primary accent for conclusion, actual values, and action checkmarks.
- Quote marks are allowed only as weak decoration around the conclusion. They must not dominate the text.
- Icon background can use a soft circular tint, but the icon should remain secondary to the conclusion.
- KPI strip uses thin dividers, tabular numerals, and consistent alignment.
- Findings/actions panel can use a weak surface or border, but avoid nested heavy cards.
- Section markers such as a slim left bar or icon help scan, but they should carry semantic meaning.
- Avoid generic AI/SaaS gradients, oversized glow, and stock-like decorative icons.

## Copy Rules

- Lead conclusion should name the business object and judgment, for example `整体业绩表现良好，实际值超越上期并达成目标`.
- Evidence should name values, baseline, target, gap, or affected object.
- Findings should explain why or where, not restate the conclusion.
- Actions should start with verbs and be testable: `持续优化`, `加强支持`, `关注进度`, `创建任务`, `查看详情`.
- Avoid filler such as `持续关注业务发展`, `进一步优化各项指标`, or `智能分析发现` unless it is followed by concrete object, metric, and next step.

## State Rules

Required states:

- Loading: preserve header, quote box, KPI strip skeleton, findings skeleton, and action skeleton.
- Insufficient data: show `当前数据不足以生成结论`, list missing metric/source, and avoid positive/negative judgment.
- Missing target: remove target/attainment KPI cell and adjust conclusion wording.
- Missing comparison: remove comparison KPI cell and avoid "优于上期" wording.
- No action route: keep recommendation as guidance, not clickable task.
- No permission: hide restricted values and explain scope.
- Stale data: show source/freshness in tooltip or footer.
- Long conclusion: clamp to visible lines and expose full text in tooltip/detail.
- Contradictory evidence: mark confidence `low` or state data conflict instead of forcing a conclusion.

## Anti-AI Gate

This card fails when:

- The conclusion is generic and could fit any dashboard.
- It has recommendation bullets with no metric, object, owner, or measurable action.
- KPI values do not reconcile with linked cards/charts/tables.
- The quote card is decorative but the evidence is absent or hidden.
- Every statement is positive, smooth, and risk-free while the data includes gaps or under-target areas.
- Icons, quote marks, gradients, or large numbers are louder than the conclusion and evidence.
- Findings repeat the KPI labels instead of explaining implications.
- Actions are not testable or cannot map to a detail route, owner, task, or follow-up check.

Countermeasure:

```text
conclusionRuleId -> generated conclusion -> visible evidence -> specific findings -> concrete actions -> source/freshness/detail
```

## Acceptance Checklist

Before marking ready:

- `visualType` is `text-summary`, `analysisInsightContract.subtype` is `conclusion-card`, and `conclusionCardPattern` is one of the controlled values.
- `conclusionEvidenceBodyMode` is one of the controlled values and matches the visible evidence body.
- The selected evidence body has a binding or equivalent field contract for KPI, trend, composition, formula, segment/action, or findings/action evidence.
- The card answers one named executive judgment question.
- The lead conclusion, KPI evidence, findings, and actions all share the same active filters and period.
- Numeric display contracts exist for every visible value in the KPI overview.
- The conclusion can be traced to metric evidence, source dataset, formula, baseline, and freshness.
- Findings cite evidence, affected objects, or reason fields.
- Actions are concrete and have an owner/detail/action route when workflow execution is expected.
- Loading, insufficient-data, missing-target, missing-comparison, no-permission, stale, long-copy, and contradictory-evidence states are defined.
- The card passes `03-text-summary.md` and `12b-placement-insight-kpi.md` size, copy, overflow, and disclosure rules.
