# Conclusion Insight Card Standard

Use this standard when a report, dashboard, BI page, or reusable component library asks for `analysisPerspective: conclusionInsight`, such as 看结论, 洞察卡, 摘要卡, 解读卡, 关键结论, 结论分析视角, or "这组数据说明了什么".

The source screenshots are temporary visual evidence. The durable knowledge is this text contract: future text-only agents must be able to recreate the design strength from business intent, data fields, controlled pattern fields, slot budgets, and acceptance gates without relying on raw image paths.

## 1. Scope And Source Of Truth

- Component family: conclusion, insight, summary, interpretation, evidence, and action cards.
- Analysis perspective: `analysisPerspective: conclusionInsight`.
- Applicable pages: KPI dashboards, management reports, BI analysis pages, review reports, business diagnosis pages, and prototype card galleries that answer "这组数据说明了什么".
- Source hierarchy: company UI baseline -> report design system -> Analysis & Insight rules -> this conclusion-insight standard -> project-specific metric/data contract.
- Primary style reference: `$report-component-style-design` `references/03a-conclusion-evidence-action-cards.md`.
- Supporting references: `$report-component-style-design` `references/03-text-summary.md`, `$report-component-style-design` `references/04a-kpi-card-patterns.md`, `$report-component-style-design` `references/12b-placement-insight-kpi.md`, and `$report-component-style-design` `references/12-component-acceptance-gates.md`.
- Mapping references: `$report-info-component-mapping` `references/00-analysis-perspective-card-taxonomy.md`, `$report-info-component-mapping` `references/06-binding-implementation-contract.md`, `$report-info-component-mapping` `references/08-generation-stability.md`, and `$report-info-component-mapping` `references/09-component-mapping-gates.md`.
- Renderers: project card/text components, Element Plus Tabs/Segmented/Tooltip/Popover/Drawer where available; ECharts only when the evidence body contains a real chart.
- Supported viewports: compact `320x120+`; standard row card `720x168+`; wide interpretation row `960x180+`; gallery tile `360x240+`; full conclusion/evidence/action card `560x420+`.
- Owner/version/status: report component design spec / v1 / ready for routing and implementation handoff.

## 2. Why These Designs Feel Designed

The sample family feels strong because each card turns a loose AI-like "insight" into a visible decision chain.

1. Clear analytical lens: each row answers a different job, such as key conclusion, trend comparison, structure share, formula driver, segment action, or next-step recommendation.
2. Judgment before evidence: the left text block states one frontend-generated conclusion first; the right body proves it with metrics, chart, equation, table, or action list.
3. Real evidence body: sparklines, donut rings, formula tiles, trend bars, and segmentation tables are tied to fields and baselines. They are not decorative chart variety.
4. Shared grammar with controlled variation: icon/tag/title/copy repeat across cards, while the evidence body changes only when the data shape changes.
5. Editorial whitespace: cards use generous horizontal rhythm, thin dividers, and quiet gutters so the eye can scan from conclusion to proof.
6. Semantic color accents: blue, green, violet, and amber mark insight roles or evidence types, but the main surface remains white and restrained.
7. Compact copy: titles name the judgment, body copy names the object, period, metric, and action. There is no generic "智能分析" filler.
8. Exact-value path: compressed visuals stay elegant because values, formulas, source, freshness, and details remain visible or available through tooltip/drawer/table.
9. UI Kit restraint: small radius, light shadow, tabular numerals, stable segmented controls, and muted chart grids make the card feel product-native rather than image-generated.
10. Data realism: a designed card allows neutral, negative, missing, or contradictory evidence states. A suspicious AI-flavored card is always smooth, positive, and risk-free.

Design sense here comes from analytical hierarchy plus evidence discipline. It does not come from adding gradients, glass, large illustrations, or many unrelated mini charts.

## 3. Controlled Pattern Fields

Use the existing card-level pattern plus a controlled evidence-body mode.

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
```

Recommended mapping:

```ts
componentType: 'text-summary'
visualType: 'text-summary'
analysisPerspective: 'conclusionInsight'
analysisInsightContract.subtype: 'conclusion-card'
analysisInsightContract.insightFamily: 'conclusion'
analysisInsightContract.conclusionRuleId: 'RULE-*'
analysisInsightContract.generatedConclusionTemplate: string
analysisInsightContract.conclusionCardPattern: ConclusionCardPattern
analysisInsightContract.conclusionEvidenceBodyMode: ConclusionEvidenceBodyMode
analysisInsightContract.conclusionEvidenceBinding: ConclusionEvidenceBinding
```

Use child `visualType` values such as `metric-card`, `line`, `pie`, `bar`, `table`, or `decomposition-card` only for adjacent standalone evidence components. When the card owns the conclusion package, keep `visualType: text-summary` and put the evidence body mode inside `analysisInsightContract`.

## 4. Pattern Selection

| User phrase / data shape | `conclusionCardPattern` | `conclusionEvidenceBodyMode` | Main body | Minimum useful size |
| --- | --- | --- | --- | --- |
| 关键结论, 摘要 A, 整体表现如何 | `metric-evidence-conclusion` | `kpi-strip-sparkline` | `2-4` KPI cells plus one short trend | `720x168` row or `560x420` full card |
| 趋势对比, 本期 vs 上期, 近 7/30 期趋势 | `metric-evidence-conclusion` | `trend-compare-chart` | line/bar comparison plus side metrics | `760x180` |
| 新老用户、产品结构、渠道结构、收入构成 | `metric-evidence-conclusion` | `composition-structure` | donut/ring, share table, small bar trend | `820x180` |
| 指标拆解、公式说明、收入由哪些因素驱动 | `metric-evidence-conclusion` | `formula-driver-chain` | factor tiles and operator rail | `760x168` |
| 高价值用户、分群运营、策略建议、行动路由 | `finding-action-conclusion` | `segment-action-table` | segment table/list with action column | `820x180` |
| 关键发现 + 下一步建议 | `finding-action-conclusion` | `findings-action-list` | findings list plus action list | `720x160` |
| 小卡片、移动端、侧栏摘要 | `compact-conclusion-summary` | `kpi-strip-sparkline` or `findings-action-list` | one generated conclusion, one evidence line, one detail/action | `320x120` |

Selection order:

1. If the conclusion contains an explicit equation, driver chain, or factor multiplication/addition, use `formula-driver-chain`.
2. If shares, cohorts, composition, or segment mix are the proof, use `composition-structure`.
3. If time baseline comparison is the proof, use `trend-compare-chart`.
4. If groups need differentiated action, use `segment-action-table`.
5. If this is the first-read executive summary, use `kpi-strip-sparkline`.
6. If evidence is already visible in neighboring components, use `findings-action-list`.

## 5. Evidence Binding

Every implementation-ready conclusion-insight card must declare data-backed evidence. The exact binding can be project-local, but it must cover these fields.

```ts
type ConclusionEvidenceBinding = {
  conclusionRuleId: string;
  generatedConclusionTemplate: string;
  fallbackConclusion?: string;
  conclusionEvidenceBodyMode: ConclusionEvidenceBodyMode;
  sourceDataset: string;
  periodField: string;
  freshnessField?: string;
  activeFilterIds: string[];
  metricSummaryItems?: Array<{
    metricId: string;
    label: string;
    valueField: string;
    unit?: string;
    comparisonField?: string;
    targetField?: string;
    valueRole: 'comparison' | 'actual' | 'target' | 'attainment' | 'gap' | 'status';
    numericFormatContractId: string;
  }>;
  trendFields?: {
    datasetId: string;
    timeField: string;
    currentValueField: string;
    baselineValueField?: string;
    grainField?: string;
  };
  compositionFields?: {
    categoryField: string;
    valueField: string;
    totalField: string;
    shareField: string;
    denominatorPolicy: string;
  };
  formulaFields?: {
    factorFields: string[];
    operatorRule: string;
    resultField: string;
    reconciliationPolicy: 'exact' | 'rounded' | 'not-additive';
  };
  segmentActionFields?: {
    segmentField: string;
    shareField?: string;
    impactField?: string;
    priorityField?: string;
    actionField: string;
  };
  evidence: string[];
  keyFindings: string[];
  recommendedActions: string[];
  confidence: 'high' | 'medium' | 'low' | 'insufficient';
  tooltipPayload: string[];
  detailRoute?: string;
  validationCases: string[];
};
```

Rules:

- The lead conclusion must be generated from `conclusionRuleId` and derive from at least one visible metric, chart/table field, or linked component.
- All evidence must share the same period, filter scope, permission scope, source/freshness, and numeric display contracts as the surrounding report.
- If `confidence` is `insufficient`, the card must switch to an insufficient-data state and avoid positive/negative business claims.
- Contradictory KPI/chart/table evidence blocks readiness until the wording changes or the data conflict is surfaced.

## 6. Anatomy

Required slots:

- Header marker: badge such as 结论/洞察/摘要/解读 plus optional sequence A/B/C/D when comparing alternatives.
- Semantic icon: weak circular icon, secondary to copy and data.
- Lead conclusion: one generated business judgment, strongest text.
- Explanation copy: `1-2` lines that name object, period, metric, baseline, and implication.
- Evidence body: exactly one `conclusionEvidenceBodyMode`.
- Detail/source path: tooltip, drawer, linked table, or adjacent evidence component.
- State surface: loading, empty, insufficient data, missing comparison, no-permission, stale, long-copy, and contradictory evidence.

Optional slots:

- Component-local perspective switch when the card gallery compares modes such as 方案 A/B/C/D, 洞察 A/B/C/D, 摘要 A/B/C/D, or 解读 A/B/C/D. This is a `perspective-switch`, not a normal filter.
- Key findings and recommended actions when the card owns the action narrative.
- Right-side key interpretation list when the evidence body is dense and needs callouts.

Forbidden slots:

- Generic "AI洞察" label without evidence, source, or action.
- More than one primary evidence body in one row card.
- Decorative icon/illustration louder than the conclusion.
- Duplicated global filters, refresh/export/share, or shell actions inside the card.
- Hidden formula, denominator, baseline, or source when it affects trust.

## 7. Placement And Fit

Use:

```text
W = card width
H = card height
P = clamp(20px, W * 0.025, 32px)
leftIconW = 64-96px
textW = clamp(260px, W * 0.28, 420px)
evidenceW = W - 2P - leftIconW - textW - gaps
rowMinH = 168px
```

Standard row card geometry:

- Icon rail: left `64-96px`, vertically centered.
- Text rail: title/conclusion/copy, top-aligned for dense rows and center-aligned for short summaries.
- Evidence rail: right side, owns the chart/table/formula/list body.
- Dividers: use thin vertical separators between text and evidence only when they improve scan.
- Header tabs/segmented controls: top-right of the page or parent block, not repeated inside every row.

Evidence body budgets:

| Mode | Permanent content budget | Fallback |
| --- | --- | --- |
| `kpi-strip-sparkline` | `2-4` KPI cells, one sparkline with `4-12` points | hide sparkline, keep top `3` KPI cells, move rest to tooltip |
| `trend-compare-chart` | `1-2` series, `4-12` periods, one legend | collapse labels, then split to full trend chart |
| `composition-structure` | `2-5` categories, denominator visible | Top N + 其他, then table/drawer |
| `formula-driver-chain` | `2-4` factor tiles plus result | collapse secondary factors into tooltip or split to decomposition card |
| `segment-action-table` | `3-5` rows, `3-5` columns | Top3 plus drawer/table |
| `findings-action-list` | `2-3` findings and `1-3` actions | combine lists or move overflow to detail |

Fallback order:

1. Remove optional illustration/icon emphasis.
2. Collapse local switch to parent segmented control or dropdown.
3. Reduce evidence body to the declared visible budget.
4. Move secondary evidence to tooltip/drawer/table.
5. Downgrade to `compact-conclusion-summary`.
6. Split evidence into a standalone chart/table/component if the proof needs audit-level space.

## 8. Visual And Interaction Rules

Visual rules:

- Inherit enterprise/report tokens. State only component-specific semantic extensions.
- Page and components use a quiet light neutral background, optional white analytical surfaces, reduced uniform borders, `6-8px` radius unless inherited tokens differ, and restrained shadows only when useful.
- Color is brand-first: brand/product color and neutral hierarchy carry identity and reading order; documented status, structure, formula/conversion, action/opportunity/warning colors must be labeled and never carry meaning alone.
- Icon circles use weak tints. Icons are `24-40px` inside `56-80px` circles in row cards; smaller in compact cards.
- Values use tabular numerals. Units and comparison labels are visually weaker than primary values.
- Charts are light: muted axes/gridlines, key-only labels, exact values in tooltip, no decorative plot backgrounds.
- Tables in row cards are compact and scan-aligned; numeric cells right-align.
- Formula tiles use weak fills and stable operator rails. Operators are structural, not decorative.

Interaction rules:

- Perspective tabs such as 方案/洞察/摘要/解读 A-D change the card set or evidence body mode. Mark them as `controlSemantics: perspective-switch` and declare schema impact.
- Hover/focus exposes exact values, formula, source, freshness, baseline, and hidden evidence.
- Click opens a detail drawer/table only when row IDs, source dataset, and permission scope are defined.
- Component-local filters affect only this card or the declared local group. They cannot change global filters or metric口径 silently.

## 9. State Rules

Required states:

- Loading: preserve card height, icon rail, text skeleton, and evidence body skeleton.
- Empty/filter no-result: name the filter condition and avoid business judgment.
- Insufficient data: show a declared fallback such as `当前数据不足以生成结论`, list missing metric/source/baseline, and set confidence to `insufficient`.
- Missing comparison: remove period/baseline wording and comparison visuals.
- Missing denominator/formula: downgrade composition/formula body and disclose the gap.
- No permission: hide restricted values and explain scope without leaking row counts or restricted object names.
- Stale data: show freshness in tooltip/footer and avoid current-state wording when stale.
- Long copy: clamp to visible lines and expose full text in tooltip/detail.
- Contradictory evidence: mark confidence `low` and describe the conflict instead of forcing a smooth conclusion.

## 10. Anti-AI Gate

Reject or keep readiness `partial` when:

- The card says "整体表现良好" or "建议持续优化" without metric, baseline, object, source, and action path.
- Every card uses the same white shell but changes only the icon or accent color.
- The chart/table/formula body cannot be traced to required data fields.
- The design adds unrelated mini charts to look rich.
- A raw screenshot, image path, or OCR text is the only reusable standard.
- The card is always positive, smooth, and risk-free despite missing/negative/conflicting data.
- The generated conclusion repeats KPI labels without explaining implication.
- Actions are generic and cannot map to owner, task, detail route, or follow-up check.

Repair rule:

```text
conclusionRuleId -> generated conclusion -> one evidence body mode -> exact values/source -> implication -> action/detail/state
```

## 11. Acceptance Checklist

Before marking ready:

- `analysisPerspective: conclusionInsight`.
- `componentType: text-summary`, `visualType: text-summary`, `analysisInsightContract.subtype: conclusion-card`.
- PRD `conclusionRuleId` and `generatedConclusionTemplate` are declared; fixed normal-state conclusion copy is not used.
- `conclusionCardPattern` and `conclusionEvidenceBodyMode` use controlled values.
- `conclusionEvidenceBinding` declares the data fields required by the selected evidence body.
- The card answers one named business question: "这组数据说明了什么".
- Style generalization is present for screenshot-derived standards and `textOnlyReproduction: true`.
- Lead conclusion, evidence body, findings, and actions share the same active filters, period, source, and permission scope.
- Every visible value has a numeric display contract.
- Evidence body fields are declared for the selected mode.
- Source/freshness/detail or exact-value path is visible or discoverable.
- Loading, empty, insufficient, missing comparison, missing denominator/formula, no-permission, stale, long-copy, and contradictory-evidence states are defined.
- The card passes `$report-component-style-design` `references/03-text-summary.md`, `$report-component-style-design` `references/03a-conclusion-evidence-action-cards.md`, `$report-component-style-design` `references/12b-placement-insight-kpi.md`, and `$report-component-style-design` `references/12-component-acceptance-gates.md`.
