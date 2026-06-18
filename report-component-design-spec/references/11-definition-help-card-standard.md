# Definition Help Card Standard

Use this standard when a report, dashboard, BI page, or reusable component library asks for `analysisPerspective: definitionHelp`, such as 看说明, 指标说明卡, 指标注释卡, 指标定义卡, 指标口径卡, 帮助卡, "这个指标什么意思", or "怎么算".

The source screenshots are temporary visual evidence. The durable knowledge is this text contract: future text-only agents must be able to recreate the design strength from business intent, data fields, controlled pattern fields, slot budgets, and acceptance gates without relying on raw image paths.

## 1. Scope And Source Of Truth

- Component family: definition/help cards for metric meaning, formula,口径, source, denominator, condition, and calculation examples.
- Analysis perspective: `analysisPerspective: definitionHelp`.
- Applicable pages: KPI dashboards, management reports, BI metric dictionaries, detail reports, cockpit cards, business review pages, and self-service analysis surfaces.
- Source hierarchy: company UI baseline -> report design system -> Analysis & Insight rules -> this definition-help standard -> project-specific metric dictionary.
- Primary style reference: `$report-component-style-design` `references/03b-definition-help-card-patterns.md`.
- Supporting references: `$report-component-style-design` `references/03-text-summary.md`, `$report-component-style-design` `references/04-kpi-metric-cards.md`, `$report-component-style-design` `references/10-in-component-controls.md`, `$report-component-style-design` `references/12b-placement-insight-kpi.md`, and `$report-component-style-design` `references/12-component-acceptance-gates.md`.
- Renderers: project UI/card components, Element Plus Tooltip/Popover/Drawer/Segmented/Select where available; ECharts only when the definition card includes a real trend/share body.
- Supported viewports: basic definition `320x200+`; comparison/formula/trend/share/filter/example `420x240+`; scope lists `420x260+`.
- Owner/version/status: report component design spec / v1 / ready for routing and implementation handoff.

## 2. Why These Designs Feel Designed

The sample family feels strong because the visual design is tied to product trust, not surface polish.

1. Product reading order: the user sees the metric subject, the explanation task, the evidence model, the formula or口径, and the source/detail path in one scan.
2. One card, one explanation job: definition, comparison, formula, scope, trend, share, filter, and example cards have different bodies because they answer different trust questions.
3. Shared grammar with real variation: index/title/tag/help, one main evidence body, and bottom trust strip repeat; body layout changes only when the data shape requires it.
4. Data-backed visuals: line, donut, formula equation, `VS`, condition chips, and example operands are not decoration. They are tied to fields, formula, denominator, or selected conditions.
5. Visible口径 boundaries: period, range, include/exclude, paid/completed status, refund treatment, channel, source, and freshness stay visible or discoverable.
6. Quiet UI language: optional white/light analytical surfaces, reduced uniform borders, restrained shadows only when needed, compact controls, muted metadata, and small labeled icons keep attention on metric comprehension.
7. Exact-value path: compressed explanations can stay elegant because tooltip, popover, drawer, dictionary link, or detail table preserves auditability.
8. Anti-AI discipline: no generic "智能说明", no smooth fake trend for every card, no decorative glass/gradient/glow, and no identical card shell pasted across different explanation tasks.

Design sense here comes from a metric explanation model plus disciplined information hierarchy. It does not come from making every card blue, shiny, or visually busy.

## 3. Controlled Pattern Field

Use `definitionHelpCardPattern` when one card packages metric explanation with header, evidence body, trust strip, disclosure, and optional local controls.

```ts
type DefinitionHelpCardPattern =
  | 'basic-metric-definition-card'
  | 'comparison-caliber-card'
  | 'formula-breakdown-help-card'
  | 'scope-caliber-list-card'
  | 'trend-meaning-card'
  | 'share-denominator-help-card'
  | 'condition-filter-help-card'
  | 'calculation-example-card';
```

Recommended mapping:

```ts
componentType: 'card' | 'text-summary'
visualType: 'text-summary'
analysisPerspective: 'definitionHelp'
analysisInsightContract.subtype: 'definition-card'
analysisInsightContract.insightFamily: 'explanation'
definitionHelpCardPattern: DefinitionHelpCardPattern
definitionHelpEvidenceBinding: DefinitionHelpEvidenceBinding
```

Use `visualType: metric-card`, `line`, `pie`, `table`, or another evidence type only when the component is standalone evidence and does not own the definition/help packaging. When the card owns the definition context, keep the definition-help pattern as the card-level contract.

## 4. Pattern Selection

| Trigger | Choose | Main evidence body | Minimum useful size |
| --- | --- | --- | --- |
| Metric meaning and a simple formula are enough | `basic-metric-definition-card` | semantic icon/value plus meaning/formula rows | `320x200` |
| Definition depends on current vs prior, old vs new, target vs actual, or comparable口径 | `comparison-caliber-card` | comparable panes, `VS`, optional mini trend | `420x240` |
| Metric is composed from factors or numerator/denominator terms | `formula-breakdown-help-card` | formula cells and result cell | `420x240` |
| Statistical period, range, include/exclude, channel, or permission scope is the main trust issue | `scope-caliber-list-card` | `4-6` key-value口径 rows | `420x260` |
| Recent movement helps explain how to read the metric | `trend-meaning-card` | metric headline plus bounded line/area body | `420x260` |
| Metric is a rate/share and denominator must be explicit | `share-denominator-help-card` | donut/ring/percent strip plus numerator/denominator | `420x260` |
| Explanation changes under selected local conditions | `condition-filter-help-card` | local chips/dropdown plus filtered metric body | `420x260` |
| A concrete arithmetic example prevents misunderstanding | `calculation-example-card` | operand cards -> operator rail -> result | `420x240` |

## 5. Evidence Binding

Every implementation-ready definition/help card must declare `definitionHelpEvidenceBinding`.

```ts
type DefinitionHelpTask =
  | 'meaning'
  | 'calculation'
  | 'formula-breakdown'
  | 'caliber-scope'
  | 'comparison-baseline'
  | 'trend-reading'
  | 'share-denominator'
  | 'condition-filter'
  | 'calculation-example';

type DefinitionHelpEvidenceBinding = {
  definitionHelpTask: DefinitionHelpTask;
  metricId: string;
  metricName: string;
  metricAliasFields?: string[];
  definitionTextField?: string;
  formulaTextField?: string;
  formulaFields?: string[];
  denominatorFields?: string[];
  scopeFields?: {
    periodField?: string;
    statisticRangeField?: string;
    includeFields?: string[];
    excludeFields?: string[];
    channelFields?: string[];
    permissionScopeField?: string;
  };
  comparisonFields?: {
    currentValueField: string;
    baselineValueField: string;
    baselineLabelField: string;
    deltaField?: string;
    deltaRateField?: string;
    comparableDefinitionRule: string;
  };
  decompositionFields?: {
    factorFields: string[];
    operatorRule: string;
    resultField: string;
    reconciliationPolicy: 'exact' | 'rounded' | 'example-only' | 'not-additive';
  };
  trendFields?: {
    datasetId: string;
    timeField: string;
    valueField: string;
    grainField?: string;
    latestPeriodField?: string;
  };
  shareFields?: {
    numeratorField: string;
    denominatorField: string;
    shareField: string;
    denominatorZeroRule: string;
  };
  filterConditionFields?: string[];
  exampleDatasetId?: string;
  exampleOperandFields?: string[];
  exampleResultField?: string;
  numericFormatContractIds: string[];
  sourceDataset: string;
  sourceFieldRefs?: string[];
  freshnessField?: string;
  lineageRefs?: string[];
  localControls?: string[];
  tooltipPayload: string[];
  exactValueRoute?: string;
  dictionaryRoute?: string;
  validationCases: string[];
};
```

## 6. Anatomy

Required slots:

- Header: title naming the explanation task, not generic "帮助".
- Subject: metric name, alias, selected口径, or metric id.
- Evidence body: exactly one primary body selected by `definitionHelpCardPattern`.
- Trust strip: formula, scope, source/freshness, denominator, include/exclude, or example note.
- Disclosure path: tooltip, popover, drawer, dictionary route, source lineage, or exact-value table.
- State geometry: loading, empty, no-permission, stale, missing-formula, missing-source, and dense-overflow states.

Optional slots:

- Index number or pattern tag when cards appear in a pattern gallery.
- One component-local control group for period basis, comparison basis, condition preview, or definition mode.
- Semantic icon or weak illustration, only when the explanation remains text/data-backed.

Forbidden slots:

- Decorative icon blocks without metric/formula/source meaning.
- Multiple unrelated evidence bodies inside one definition card.
- Global filters, export buttons, refresh buttons, or shell actions duplicated inside the card.
- Color-only meaning without text/tooltip rule.
- Hidden formula or hidden denominator when it affects trust.

## 7. Placement And Fit

Use:

```text
W = card width
H = card height
P = clamp(16px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P
headerH = 32-40px
trustStripH = 52-76px
bodyH = CH - headerH - trustStripH - gaps
```

Rules:

- Main evidence body owns at least `45%` of card height after header and trust strip.
- Header controls must not consume more than `45%` of `CW`; collapse to dropdown before shrinking the body.
- Scope rows default to `4-6`; longer dictionaries open drawer or table.
- Formula factors default to `2-4`; more factors collapse to formula text and detail drawer.
- Trend points default to `4-8` permanent ticks or points; exact values go to tooltip.
- Donut/ring/percent strip cards must keep numerator and denominator visible or in the adjacent trust strip.
- Example cards show `2-4` operand cards plus result; complex examples use drawer.
- The exact-value/dictionary route must remain available even when labels collapse.

Fallback order:

1. Collapse optional local control to compact dropdown.
2. Hide optional icon, index, or pattern tag.
3. Reduce trust strip to the most important `2` rows and move the rest to tooltip/drawer.
4. Downgrade trend/share/formula/example body to basic definition if required fields are missing.
5. Split to dictionary drawer/table before hiding formula, denominator, include/exclude, source, or freshness.

## 8. Visual And Interaction Rules

Visual rules:

- Inherit enterprise/report tokens. Component-specific styling should state semantic extensions only.
- Default bounded surface is white or weak neutral only when needed, with reduced border, `6-8px` radius unless the project token differs, and restrained shadow only when useful.
- Formula bands and trust strips use weak neutral backgrounds. They are structured content, not nested cards.
- Accent color is reserved for selected controls, result values, formula output, or semantic state.
- Icons are line icons or approved project icons; icon circles remain low-contrast and secondary.
- Tabular numerals are required for operands, values, comparison panes, shares, and examples.

Interaction rules:

- Hover/focus on formula, factors, denominator, source, and truncated text reveals full definition payload.
- Click opens dictionary, source lineage, detail drawer, or example table when available.
- Component-local controls affect only this card or declared local group and must preserve schema unless classified as a perspective switch.
- When a local control changes formula/口径, the card must label the口径 change and clear stale tooltip/selection state.

## 9. Style Generalization Contract

For screenshot-derived reusable standards, include:

```ts
styleGeneralization: {
  sourceRole: 'reusable-inspiration';
  generalizationStatus: 'covered-by-composed-patterns';
  canonicalPatternRef: '$report-component-design-spec references/11-definition-help-card-standard.md';
  patternFields: ['definitionHelpCardPattern'];
  componentFamily: 'Analysis & Insight / Definition Help';
  businessTrigger: '用户需要理解指标含义、算法、口径、条件或示例';
  dataShapeTrigger: 'metric dictionary + formula/scope/source plus optional comparison/trend/share/filter/example fields';
  adaptiveVariables: ['definitionHelpCardPattern', 'sizeFamily', 'bodyEvidenceKind', 'trustStripRows', 'localControls', 'disclosureRoute'];
  minContainer: '320x200 basic, 420x240 standard';
  responsiveFallback: ['collapse control', 'reduce trust rows', 'drawer/detail', 'downgrade to basic definition'];
  rendererOwner: 'project-ui / echarts only for real trend-share evidence';
  textOnlyReproduction: true;
}
```

## 10. Acceptance Gates

MUST/fail:

- `RPT-DEFINITION-PATTERN-MISSING`: `analysisPerspective: definitionHelp` cards must declare `definitionHelpCardPattern`.
- `RPT-DEFINITION-BINDING-MISSING`: implementation-ready cards must declare `definitionHelpEvidenceBinding`.
- `RPT-DEFINITION-FORMULA-MISSING`: calculation/formula/example patterns must expose formula text, factor fields, result field, numeric formats, and denominator/zero behavior when relevant.
- `RPT-DEFINITION-SCOPE-MISSING`: scope/caliber cards must expose period/range/include/exclude/channel/permission fields that affect trust.
- `RPT-DEFINITION-SOURCE-MISSING`: source dataset, source field references, freshness, dictionary route, or lineage route must be visible/discoverable.
- `RPT-DEFINITION-COMPARISON-INCOMPATIBLE`: comparison cards must prove comparable definition, unit, period grain, and filter scope.
- `RPT-DEFINITION-DENOMINATOR-MISSING`: share/rate cards must expose numerator, denominator, formula, and denominator-zero rule.
- `VIS-DEFINITION-AI-POLISH`: gradients, glass, glow, abstract AI graphics, oversized icons, or identical decorative shells are not accepted without data-backed explanation roles.
- `VIS-DEFINITION-EVIDENCE-DECORATIVE`: charts, donuts, formula cells, filters, or examples are rejected when not bound to fields and tooltip/detail payload.
- `VIS-DEFINITION-OVERFLOW`: fixed cards fail when definition, formula, rows, controls, or example values overflow without tooltip/drawer/detail.

SHOULD/exception-required:

- Use `basic-metric-definition-card` as the fallback when required fields for advanced patterns are missing.
- Keep one body evidence model per card.
- Prefer bottom trust strip for formula/source rows; use body key-value list only when口径 is the main evidence.
- Use project metric-number semantics for change colors; do not copy screenshot colors blindly.

MAY/optional:

- Add index numbers or type tags in galleries or teaching pages.
- Add weak semantic icons when they improve scan speed.
- Add a local segmented control for `2-4` short conditions when the control is data-bound and local.

## 11. Implementation Notes

- Use project UI card, tooltip, popover, drawer, and segmented/select components before custom controls.
- Use ECharts only for real trend/share evidence that needs tooltip, theme, resize, or renderer lifecycle.
- Provide stable selectors or project equivalents for definition-help card, title, body, trust strip, formula, source, local control, and disclosure trigger.
- QA should check default state, changed local control, long metric name, long formula, missing formula, missing source, denominator zero, filtered empty, stale freshness, no permission, loading, and narrow container.

## 12. Governance

- Allowed variants are the eight controlled `definitionHelpCardPattern` values.
- Deprecated patterns: image-only说明卡, generic AI help cards, full-card decorative illustrations, formula hidden in body copy, and unbound example arithmetic.
- Exceptions require a project-specific metric dictionary or brand/system token note.
- Migration impact: existing generic `definition-card` or `text-summary` components that explain metrics should add `definitionHelpCardPattern` and `definitionHelpEvidenceBinding` before implementation handoff.
