# Report Design System Rule Catalog

Use this catalog when a design-system output needs concrete rules rather than an empty framework. It is intentionally reusable across report products; project-specific values should come from source systems such as `$haier-enterprise-app-ui-design-spec`, bundled templates, existing CSS tokens, or approved brand files.

## Source Hierarchy

When multiple design sources exist, resolve conflicts in this order:

1. Company-level standard, such as `$haier-enterprise-app-ui-design-spec`.
2. Approved template design system, such as `$report-prototype-template-management` template layout tokens.
3. Product/report-family extension.
4. Project-specific exception with owner, expiry, and regression evidence.

If a lower-level source conflicts with a higher-level source, record the conflict instead of silently choosing the newer-looking style.

## Required Rule Families

A report design system is incomplete unless it covers all of these:

| Family | Must define |
| --- | --- |
| Tokens | Color, typography, spacing, grid, radius, border, shadow, icon, density, z-index, breakpoint |
| Layout | Shell, header, navigation, filter surface, content grid, parent block anatomy, internal sub-block anatomy, title band, responsive behavior |
| Components | Filters, KPI cards, summaries, Analysis & Insight components, charts, tables, drawers/modals, actions, tags, feedback states |
| Visualization | Chart choice, axis, legend, tooltip, data labels, color semantics, thresholds, drilldown/export |
| Data display | Unit, precision, percent/rate wording, trend direction, empty/null/zero/stale data |
| Interaction | Hover, focus, active, selected, disabled, loading, reduced motion, no layout shift |
| States | Loading, empty, error, no-permission, stale, disabled, partial data, offline/mock |
| Governance | Version, owner, source, status, allowed variants, deprecated patterns, exception process, QA baseline |

## Token Rules

- Tokens must be semantic. Prefer `text.primary`, `surface.card`, `border.default`, `state.error`, `chart.series.primary`, `space.block`, not raw names such as `blue-1` unless the raw token is inherited from a company source.
- Each token needs `value/source`, `usage`, `accessibility note`, and `status`.
- If the value is inherited, write the source name and section, not a copied paraphrase.
- If a token is unknown, mark it `gap` and name the owner needed to close it.
- Do not allow one-off colors in chart series, KPI status, hover glow, or badges without a semantic role.

## Modern SaaS BI Style Rules

Use these rules only when the user explicitly asks for modern SaaS Dashboard, BI Dashboard, UI Kit, light gray-white, white-card, linear, clean, or high-end report style. Also load `12-modern-saas-bi-style-contract.md`.

- Source hierarchy is mandatory: company/template tokens first, then the modern BI contract, then project exceptions.
- Required token roles include `surface.page`, `surface.card`, `surface.card.muted`, `border.subtle`, `radius.card`, `shadow.card`, `text.primary`, `text.secondary`, `chart.series.*`, `chart.grid`, and `focus.*`.
- Page canvas is light gray-white and analytical surfaces are white or near-white when needed, with reduced uniform card borders, small radii, and restrained shadows. If the page uses heavy gradient, glass, glow, large illustration as the main atmosphere, or the same bordered card frame for every module, record `VIS-GENERIC-SAAS-SHELL`, `VIS-CARD-BORDER-OVERUSE`, or `AI-TEMPLATE-AESTHETIC`.
- Component density is bounded. Do not create a modern look by adding more cards, badges, mini charts, or local controls. Unrelated widget piles, card-in-card surfaces, and equal-weight collages are `VIS-COMPONENT-PILEUP`.
- Information hierarchy is visible. First viewport needs a primary answer/action, supporting evidence, and a clear downstream path. Equal card grids with no reading order are `VIS-HIERARCHY-FLAT` or `VIS-NO-INFORMATION-FLOW`.
- Chart lightness is part of the style. Chart count, chart family, labels, legend, grid, palette, and exact-value paths must be justified by task; chart variety for polish is `VIS-CHART-OVERWEIGHT` or `RPT-DECORATIVE-CHART`.
- This style does not weaken report trust requirements: metric口径, source/freshness, permission scope, drilldown/detail/export, edge states, accessibility, and runtime proof still apply.

## Layout Rules

- Define page shell areas: logo/brand, title, scope/status, navigation, filter surface, toolbar/actions, content blocks, feedback area.
- Top-level report blocks must use stable rectangular `8 * N` parent spans. A parent block may contain internal sub-blocks; sub-blocks are local layout regions, not page-grid cells, and they need their own fit rules.
- Internal sub-blocks must declare component owner, local grid/flex tracks, `5px` parent inset, `5px` sibling gap, min width/height, state behavior, and overflow policy.
- Template-based pages must use template-owned filters, title bands, card padding/radius, row height, and hover/focus behavior unless a template-level redesign is approved.
- Define first-viewport priority: primary conclusion or action, supporting evidence, breakdown, detail, and next action.
- Responsive behavior must declare what collapses, stacks, scrolls, moves to drawer, or remains fixed.
- Loading, empty, error, and no-permission states must preserve the planned geometry unless the state is explicitly page-level.

## Component Rules

### Filter And Control Surfaces

- Define filter source, default value, active-state display, reset path, changed-state display, disabled/loading/error states, and affected components.
- In template-based report pages, main filters should map to template-native `filters[]` and its trigger/panel/popover/drawer behavior.
- Separate page/global filters from `组件内筛选区 / 局部筛选区`. Component-internal local filters affect only the current component or declared local group and must not change page/global scope, permission scope, backend aggregation, pagination, export scope, or other components.
- Component-internal local filters default to a quiet title/header capsule: `2-4` short options use a segmented pill, `>4` options, long labels, or failed width fit use a compact dropdown, and multiple local filter groups use a panel/popover/drawer trigger.
- Component-internal local filters must reserve geometry before rendering: title-right is preferred, under-title row is allowed only when vertical budget passes, and the filter cannot overlay or compress KPI values, plot areas, legends, axes, table headers, pagination, or state messages.
- Filter chips and selected labels need wrapping, overflow counter, or panel expansion.
- Primary filters must not be visual-only; affected components need binding and validation.

### KPI And Metric Cards

- Card anatomy: title, value, unit, trend/comparison, helper, status/action when needed.
- Implementation-ready KPI rules must include the internal placement algorithm: content box variables, top-left title, top-right definition/help entry, centered `value + unit` group or declared landscape primary value zone, centered comparison/target group, optional sparkline/right evidence zone, bottom metadata/evidence band, size tiers, and fallback order.
- KPI overview / multi-metric overview standards must declare `kpiOverviewCardPattern`, one shared `overviewTopic`, `2-5` visible metric cells, lead metric ownership when present, local-control scope, metric-cell minimum width, compact evidence ownership, exact-value/detail route, `kpi_overview_card` minimum `720x220`, and fallback before peer metrics, dividers, progress tracks, or sparklines are squeezed.
- KPI judgment / status / health / rating / gauge card standards must declare `kpiJudgmentCardPattern`, `judgmentKind`, status or score field, score range or status dictionary, thresholds/bands when visible, business direction, exactly one hero visual, comparison strip fields, footer evidence/source fields, exact-value route, `kpi_judgment_card` minimum `360x240`, and fallback before icon/ring/gauge/bars are squeezed.
- KPI goal execution / target attainment / gap / progress / milestone standards must declare `kpiGoalExecutionCardPattern`, `goalExecutionKind`, actual/target fields, required attainment/gap/progress/milestone fields, formula/denominator and direction semantics, exactly one execution hero visual, comparison strip fields, deadline/remaining-time fields when visible, footer evidence/source fields, exact-value route, `kpi_goal_execution_card` minimum `360x240`, and fallback before ring/gauge/progress/stepper/timeline evidence is squeezed.
- KPI time-series / trend / change / YoY-MoM / cycle / volatility / forecast standards must declare `kpiTimeSeriesCardPattern`, `temporalAnalysisKind`, ordered x/y fields, grain, latest period, direction semantics, required baseline/cycle/volatility/forecast fields, tooltip payload, footer evidence/source fields, exact-value route, `kpi_time_series_card` minimum `360x240`, time-series evidence zone `>=112px`, forecast future region `>=40px` when visible, and fallback before temporal evidence is squeezed.
- KPI comparison analysis / comparison / group comparison / competitor / benchmark / variance standards must declare `kpiComparisonAnalysisCardPattern`, `comparisonAnalysisKind`, `kpiComparisonAnalysisEvidenceMode`, comparable subject grain and role labels, shared metric definition, unit, period/grain, filter scope, direction semantics, benchmark or variance fields when required, deterministic sort and visible-limit rules, tooltip payload, footer evidence/source fields, exact-value route, `kpi_comparison_analysis_card` minimum `360x240`, comparison evidence zone `>=112px`, and fallback before radar/donut/table/chart evidence is squeezed.
- Ranking / leaderboard / Top N standards must declare `rankingCardPattern`, `rankingEvidenceBinding`, ranking mode, source-side Top N or bounded-local exception, visible row/item budget, object id/name fields, value/share/progress/trend fields used by the chosen pattern, deterministic rank and tie-break fields, total/share policy, overflow/detail path, and `ranking_card` minimum `420x300` or documented compact fallback before bars/trends/icons become decorative.
- Pareto standards must declare `paretoCardPattern`, `paretoEvidenceBinding`, additive value field, total field, contribution share, cumulative value/share, threshold share, boundary/key-factor field, long-tail policy, chart/table fallback, and `pareto_card` minimum `480x340` or `pareto_table_chart_card` minimum `640x360` before the 80% threshold or exact rows are hidden.
- Composition / share / structure / market-share standards must declare `compositionShareCardPattern`, `compositionShareEvidenceBinding`, denominator policy, category id/name, value/total/share fields, `Top N + 其他` or small-slice merge policy, exact-value route, `composition_share_card` minimum `420x300`, and the stricter `composition_share_detail_card`, `composition_hierarchy_card`, `composition_trend_card`, or `composition_map_card` minimum when detail, hierarchy, trend, or geography evidence is visible.
- Decomposition / attribution / contribution / hierarchy standards must declare `decompositionAttributionCardPattern`, `decompositionAttributionEvidenceBinding`, one explanation mode, root metric/unit/value fields, selected-pattern formula/node/link/stage/time/matrix fields, `signRule`, `reconciliationPolicy`, residual/other behavior, exact-value route, and the correct size family: `decomposition_card`, `decomposition_flow_card`, `decomposition_hierarchy_card`, `decomposition_matrix_card`, or `contribution_heatmap_card`. Attribution wording requires an attribution method or model; otherwise use contribution/driver wording. Fallback must be defined before formula, Sankey, tree, waterfall, matrix, or heatmap evidence is squeezed.
- Distribution / interval / density / quantile / boxplot standards must declare `distributionAnalysisCardPattern`, `distributionAnalysisEvidenceBinding`, one distribution mode, metric id/name/unit, sample grain, sample count field, selected bucket/density/quantile/boxplot/heatmap/geography/comparison fields, interval policy, density or estimator policy when used, missing/zero/out-of-range policy, exact-value tooltip/detail route, and the correct size family: `distribution_card`, `distribution_density_card`, `distribution_heatmap_card`, `distribution_boxplot_card`, or `distribution_matrix_card`. Density wording requires an estimator or precomputed density fields; boxplot wording requires Q1/median/Q3/whisker rule and sample count. Fallback must be defined before histogram, CDF, KDE, heatmap, boxplot, scatter-strip, or detail-table evidence is squeezed.
- Anomaly / risk / warning / outlier standards must declare `anomalyAnalysisCardPattern`, `anomalyAnalysisEvidenceBinding`, one diagnostic lens, severity/status dictionary, current/baseline or threshold evidence, occurrence/update/freshness time, affected object or impact fields when visible, tooltip/detail/action route, and the correct size family from `$report-component-style-design` `references/07f-anomaly-risk-warning-outlier-cards.md`. Use `visualType: anomaly-card` when the card owns abnormality context; use a stricter chart/list/table/KPI family only when the card shell does not own severity, freshness, response, or detail obligations. Fallback must be defined before trend, donut, matrix, map, relation, scatter, gauge, timeline, list, or table evidence is squeezed.
- Matrix decision / quadrant / priority / strategy-layer standards must declare `analysisPerspective: matrixDecision`, `matrixDecisionCardPattern`, `matrixDecisionEvidenceBinding`, one decision task, object grain, axes/dimensions/priority/layer fields required by the selected pattern, deterministic classification rule, threshold/band rule when visible, density and label rules, exact-value tooltip/detail route, renderer ownership, and fallback before quadrant, heatmap, priority, strategy, table, tree, trend, or action evidence is squeezed.
- Horizontal KPI card standards must declare `kpiCardOrientation`, a controlled `horizontal-*` or paired comparison `kpiCardPattern`, auxiliary evidence ownership, minimum `360x128` collapsed size and `420x180` standard size, and the fallback before mini evidence squeezes the primary value. Single-indicator KPI grid standards must also declare `kpiSingleIndicatorLayoutMode`, one evidence visual, local control scope, target/attainment footer binding, minimum `360x220` outer size, evidence fit box `>=112x72`, ring/gauge fit box `>=116x96` when used, footer `44-60px`, and peer-card baseline alignment. When `kpiCardPattern` is `horizontal-axis-line-trend`, the standard must also declare `kpiAxisLineEvidenceMode`, ECharts ownership, minimum `420x260` outer size, chart body `>=180px`, plot height `>=130px`, and fallback before the axis line becomes a thin decorative stripe. When `kpiCardPattern` is `horizontal-axis-bar-compare`, the standard must also declare `kpiAxisBarEvidenceMode`, ECharts ownership, ordered category/value fields, x-axis unit, sort rule, visible bar limit, optional target/reference/threshold/change-rate/comparison fields, minimum `420x260` outer size, chart body `>=180px`, plot height `>=140px`, row height `>=22px`, and fallback before horizontal bars become compressed stripes. When `kpiCardPattern` is `horizontal-axis-scatter-diagnostic`, the standard must declare `kpiScatterEvidenceMode`, ECharts ownership, object grain, x/y fields and units, point-density strategy, optional trend/reference/threshold/quadrant/category/size fields, minimum `420x300` outer size, chart body `>=200px`, plot height `>=160px`, and fallback before points become decoration. When `kpiCardPattern` is `horizontal-spatial-map-diagnostic`, the standard must declare `kpiMapEvidenceMode`, map resource/projection, region code or lon/lat fields, visualMap/legend, missing-geo policy, minimum `460x320` outer size, map body `>=220px`, map viewport shorter side `>=180px`, and fallback before geography is stretched or miniaturized. When `kpiCardPattern` is `paired-comparison-diagnostic`, the standard must declare `kpiComparisonEvidenceMode`, comparable left/right pane fields, shared unit/grain/filter scope, central `VS` rail, conclusion field, minimum `420x260` outer size, pane width `>=140px`, `VS` rail `32-44px`, conclusion band `36-52px`, and fallback before the panes are squeezed.
- Value and unit must remain visible. Long titles may wrap or disclose, but critical values cannot be ellipsis-only.
- Trend direction and color semantics must be explicit. For Chinese report UI, rate/change/completion labels use `%` unless an approved exception says otherwise.
- Cards need loading, empty, error, no-permission, and stale-data variants.

### Ranking, Top N, And Pareto Cards

- Ranking standards must declare `rankingCardPattern`, `rankingEvidenceBinding`, ranking mode, metric/unit, source-side Top N or bounded-local exception, object id/name fields, value/share/progress/trend fields used by the selected pattern, rank/tie-break fields, visible-count budget, overflow strategy, tooltip payload, and detail/action path.
- Top N cards default to `5` visible rows/items; Top 10 needs a taller card, internal scroll, pagination, drawer, or table fallback. A fixed card with hidden overflow is not acceptable.
- Ranking rows use scan alignment: rank/object left, value/share right, bars/trends on a common rail. Center alignment is reserved for podium or icon-card slots with adequate width.
- Share-based ranking requires a declared denominator and `Top N + 其他` or detail policy. Do not show percentages detached from total policy.
- Map, donut, radar, bubble, or icon ranking variants require the geometry-specific fields and exact-value side list/tooltip. If those fields are missing, use a basic/progress ranking card or table.
- Pareto standards must declare `paretoCardPattern`, `paretoEvidenceBinding`, additive value field, total, contribution share, cumulative value/share, threshold share, boundary/key-factor field, and long-tail policy. The default threshold is 80% unless the business domain declares another threshold.
- Pareto cards use sorted descending additive values. Non-additive metrics, missing totals, or cumulative share computed only from visible rows must route to ordinary ranking/table/chart fallback.
- Ranking and Pareto cards need realistic data states: ties, long names, missing/zero values, dense tails, no-permission, filtered empty, stale selection, and no-threshold/invalid-Pareto states.

### Composition, Share, Structure, And Market-Share Cards

- Composition standards must declare `compositionShareCardPattern`, `compositionShareEvidenceBinding`, denominator policy, share formula, category identity, `Top N + 其他`/merge policy, exact-value route, renderer owner, size family, and fallback.
- Card-level composition uses `visualType: composition-card` when denominator, legend/detail, controls, freshness, and fallback belong to one card. Use standalone chart visual types only when the card shell does not add those obligations.
- Donut and ring variants prefer `2-6` categories, allow `<=8` before merge, show a center total/100%/CR metric, and keep side or tooltip exact values.
- Percent-bar variants are preferred when close shares require precise comparison. Do not force near-equal values into pie slices.
- Hierarchy variants require parent-child fields, non-negative additive values, total share and parent share, visible depth rules, breadcrumb/drilldown when deep, and treemap/sunburst/multi-ring fit boxes.
- Trend composition variants require each time bucket to reconcile to 100% and must show or expose the denominator for the selected period.
- Market-share variants require an external or declared market denominator. Concentration variants require CR1/CR3/CR5/HHI fields when visible.
- Edge states include empty, denominator-zero, all-zero, negative-value blocked, too many categories, permission-limited, and stale-data states.

### Anomaly, Risk, Warning, And Outlier Analysis Cards

- Anomaly standards cover 异常分析, 风险分析, 预警分析, 离群点分析, 波动异常, 阈值预警, 风险矩阵, 影响评估, and 处置状态 cards. They must start from a diagnostic lens instead of chart variety.
- Required contract fields are `analysisPerspective: anomalyRisk`, `visualType: anomaly-card`, `anomalyAnalysisCardPattern`, `anomalyAnalysisEvidenceBinding`, severity/status dictionary, current/baseline or threshold fields, time/freshness fields, impact or affected-object fields when visible, tooltip/detail payload, action route, and validation cases.
- Shared anatomy is stable: index/title/control header, semantic state/value zone, exactly one primary evidence body, `2-4` support facts, and footer freshness plus detail/action route.
- The evidence body may be a trend, donut, interval, timeline, Top list, matrix, relation graph, map, scatter, gauge, or table only when the selected pattern's required data shape exists.
- Modern SaaS/BI expression stays restrained: white card, thin border, small radius, muted metadata, soft semantic tint, sparse chart marks, and no full-card danger-color fill, glass/glow shell, or abstract warning art.
- Edge states include missing baseline, missing threshold, unrecognized severity, no active anomaly, permission-limited abnormal counts, stale data, partial sync, resolved/no-action, and unsupported map/relation/scatter data.

### Summary And Narrative Blocks

- Summary text must follow the surrounding layout tokens and density.
- A summary block must have conclusion, reason/evidence, and action/follow-up when the business task requires decisions.
- Long narrative should use expand/drawer or a larger block instead of tiny text.

### Analysis And Insight Components

- Treat conclusion cards, insight cards, anomaly/risk explanations, attribution summaries, impact-factor cards, comparison/trend/target diagnosis notes, recommendation/action cards, definition/data-quality/forecast notes, chart annotations, explanatory empty states, and permission/no-result/delay notes as a dedicated component family.
- Implementation-ready standards must require `analysisInsightContract`: subtype, insight family, conclusion, evidence, affected object, comparison/change value when relevant, reason fields, recommended actions, confidence/definition/source/freshness, local filters, tooltip payload, detail route, and state rules.
- Copy structure is conclusion first, evidence second, action/trust third. One card carries one main point; multi-insight lists default to `2-4` items and max `5`.
- Length budgets are explicit: title `2-8` Chinese characters, main conclusion `12-32` Chinese characters, explanation `1-2` lines, action suggestions `1-3`, tooltip `3-6` short lines.
- Visual style stays quieter than the chart/table it explains: weak neutral or semantic tint, `1px` weak border, `8-12px` radius, summary/annotation radius `6-8px`, semantic icons `14-18px`, and no full-card red alert fills.
- Component-local filters are optional and current-component scoped, such as 全部/异常/建议, 实际/预测, 高/中/低风险, or 原因/影响/建议. They use capsule/dropdown rules and must not change report scope or metric口径.
- Chart annotations are bounded: max `3` visible annotations, bubble `120-240px * 40-96px`, leader line `12-48px`, and no coverage of key marks, legends, or axes.
- States include loading, analysis generating, insufficient data, empty/filter-no-result, data delay, error, no-permission, and long-content expansion.

### Charts

- Chart type must match the task: trend, ranking, composition, distribution, correlation, process, or exact-value lookup.
- Axis order, unit, tooltip payload, legend behavior, threshold lines, and drilldown target must be specified.
- Dense charts require label budgets, tooltip exact values, zoom/fullscreen/table fallback, or sampling rules.
- Combo charts require a named scale + rate/trend/target relationship, shared ordered category/time grain, bar metric/unit, line or target metric/unit, left/right y-axis mapping, visible series limit, dual-axis rationale when present, `plotH` budget, legend/filter separation, category-density fallback, and exact tooltip/detail access.
- Pie/donut charts require part-to-whole semantics, `2-6` preferred categories, `<=8` maximum before merge, deterministic `TopN + 其他`, negative/all-zero handling, legend/label budget, center metric rules, and exact-value tooltip/detail.
- Radar charts require a shared score scale, dimension/series limits, circular geometry, outside label budget, tooltip exact/raw values, and a fallback when dimensions or objects exceed the readable range.
- Scatter/bubble charts require two numeric metrics with names and units, declared axis ranges/baselines, point-count density handling, bubble size mapping when present, weak reference/quadrant/trend encodings, key-only labels, and exact-value tooltip/detail.
- Parallel-coordinate charts require an object/sample schema, `3-12` ordered dimension fields, per-axis range/unit/direction, independent or standardized scaling mode, plot-height and axis-gap budget, sample-density opacity/sampling/aggregation rules, Top/anomaly/selected highlight semantics, brush behavior when present, legend/filter separation, and exact object tooltip/detail access.
- Map/geographic charts require a real geography decision scope, region-code or lon/lat binding, declared map resource/projection, aspect-safe fitBounds, visualMap/legend semantics, key-only labels, dense point/flow fallback, missing-geo handling, and exact-value tooltip/detail.
- Candlestick/K-line charts require ordered OHLC rows, price unit, market color convention, valid OHLC relationship, price range padding, candle-density/dataZoom strategy, secondary volume/indicator budget, limited MA/indicator count, crosshair tooltip, and missing OHLC/volume states.
- Boxplot charts require a raw-sample or precomputed-statistics contract, sample counts, Q1/median/Q3/IQR, declared whisker/outlier rule, sample-size thresholds, category/group density limits, stable outlier strategy, key-only labels, and exact five-number tooltip/detail access.
- Matrix/time/calendar/correlation heatmaps require row and column dimensions, value metric, aggregation grain, unit, visualMap/color-scale rule, missing-vs-zero encoding, row/column density limits, cell-size and value-label thresholds, label sampling, highlight/anomaly rule, and exact cell tooltip/detail access.
- Gauge charts require one bounded progress/status metric, min/max range, unit, current value, target/threshold semantics when present, status color business direction, `gaugeAreaH` budget, semicircle default for report cards, center value/unit anchoring, sparse ticks, threshold segment limits, pointer-use limits, and exact range/target/status tooltip/detail access.
- Path/user/process path charts require step/node schema, directed transition schema, start/end/order, metric basis, conversion/drop-off formulas, path depth, Top N and "other" aggregation, node/link density limits, main-path/branch strategy, path-width mapping, key-only labels, legend/filter separation, and exact node/transition tooltip/detail access.
- Funnel charts require ordered stage schema, shared population/cohort rule, metric basis/unit, entry/final values, entry share, stage conversion, drop value/rate, total conversion, `funnelAreaH` budget, `3-6` preferred stages with `>10` fallback, horizontal bar default for report cards, max/key-loss highlight, legend/filter separation, and exact stage tooltip/detail access.
- Sankey diagrams require source-target-value link schema, node schema, layer/stage order, metric unit, node-value/flow-conservation handling, Top N/`其他` aggregation, node/link density limits, flow-width mapping, key-only labels, legend/filter separation, hover/click path highlight, and exact node/link tooltip/detail access.
- Treemap/rectangular tree maps require hierarchy schema, parent/leaf aggregation, non-negative additive area metric, optional color metric semantics, Top N/`其他`, visible-depth rule, rectangle/label thresholds, breadcrumb/drilldown when deep, legend/filter separation, and exact path/value/share tooltip/detail access.
- Sunburst charts require hierarchy schema or `children`, parent/child aggregation, non-negative additive angle metric, optional color metric semantics, total/parent share formulas, visible-depth/ring-width budget, Top N/`其他`, sector/label thresholds, center content, breadcrumb/drilldown when deep, legend/filter separation, and exact path/value/total-share/parent-share tooltip/detail access.
- Relation/network graphs require node schema, edge schema, relationship direction/weight semantics, graph layout type, node/edge density limits, node category and edge type limits, node-size and edge-width mapping, label limits, legend/filter separation, fitView/zoom/drag behavior, and exact node/edge tooltip/detail access.
- Do not use pie/donut as a default for ranking, trend, or precise comparison.

### Tables

- Composite Panels / multi-component analysis cards are valid only when one container answers one shared business question through a mini analysis loop. Standards must define `compositePanelContract`, one primary child, child roles/priorities/min sizes, default `2-3` visible children and normal max `4`, primary visual weight `50-70%`, content height `>=60%`, panel-level local filter scope, child-only filter exceptions, shared legend/unit rules, linked hover/click behavior, detail-preview limits, responsive fallback, and parent/child loading/empty/error/no-permission states. Split unrelated or equal-weight children into separate blocks.
- Tables need column definitions, unit/precision, sorting, pagination, empty/error/no-permission states, row actions, export rule, and overflow behavior.
- Complex/grouped headers are required by default when a table has `>8` visible columns or natural field groups. Standards must define `columnTree`, parent group nodes, leaf field metadata, `colSpan`/`rowSpan` calculation, max depth `<=3` by default, parent width from child leaf widths, fixed whole-header behavior, frozen row/primary columns when horizontally scrolling, restrained header backgrounds/dividers, component-local filter vs per-column header-filter separation, sort/filter icon limits, group collapse, and tooltip definition access.
- Detail Tables need row grain, primary key/object field, visible column priority, type-specific width/alignment, default sort, table-body height/visible-row budget, fixed-header/frozen-column rules, row detail/action contract, tooltip disclosure for truncated cells, and provider/API/resolver scope for global search, sorting, pagination, and export.
- Default Detail Tables show `5-8` core columns; large blocks may show `8-12`; `11-16` columns require horizontal scroll plus frozen primary column; `>16` columns require column settings/drawer/detail/split; `>24` columns should not be one flat table.
- Pivot Tables need row dimensions, column dimensions, measures, aggregation grain, aggregation functions/formulas, subtotal/grand-total placement, hierarchy depth, sort rules, exact cell tooltip, and drilldown/export behavior.
- Pivot Tables keep `pivotAreaH >= CH * 0.55`, visible measures `1-3` by default and `<=5`, rows/columns within density thresholds, frozen row dimensions for horizontal scroll, fixed column headers for vertical scroll, and restrained conditional formatting for only `1-2` core measures.
- Percentage/rate metrics in Pivot Tables recompute totals from numerator/denominator; do not sum percentages or average them unless the business口径 explicitly requires unweighted average.
- Wide tables should preserve operation access through frozen/sticky action columns or row detail drawers.
- Simple row-level Detail Tables should use Element Plus or the project table component. Analytical matrices, pivot tables, cross tables, frozen-header analytical tables, wide metric matrices, and dense comparison grids should use S2-class table behavior when implementation supports it.

### Drawers, Modals, And Popouts

- Use drawer/modal for focused detail or short editing flows; move long workflows to a page or route.
- Define mask, z-index, close path, footer actions, scroll area, loading/error states, and context preservation.
- Popout shadow and focus rules must be inherited from the token system.

### Feedback States

- Every reusable component family needs loading, empty, error, no-permission, stale, disabled, and partial-data states.
- Empty states should explain whether data is absent, filtered out, unauthorized, not loaded, or not configured.
- Error states need retry/contact/reset action when appropriate.

## Visualization Semantics

| Question | Preferred visual | Required rule |
| --- | --- | --- |
| Current status or target gap | KPI card, status table, progress indicator | Baseline, threshold, status color, and owner |
| Single bounded progress/status | Gauge only when range, threshold, and current-state judgment matter | Min/max, unit, target/threshold, status color direction, center value, sparse ticks, and KPI/bar/table fallback |
| Trend over time | Line/area/bar by period | Chronological order, consistent period granularity, y-axis range rule, missing/null handling, and point/label density |
| Scale + rate/target relationship | Combo chart | Shared x-axis, bar and line/target metric roles, left/right axis units, series `<=4`, dual-axis rationale, category-density fallback, and split-chart/table fallback |
| Price volatility over time | Candlestick/K-line | Ordered OHLC fields, market color convention, price range padding, main/volume height budget, candle density/dataZoom, crosshair tooltip, and line/table fallback for non-OHLC data |
| Distribution/stability/outliers | Boxplot | Sample count, Q1/median/Q3/IQR, declared whisker/outlier rule, category/group density, outlier strategy, and table/detail fallback for raw sample audit |
| Density/pattern/cohort/correlation | Heatmap | Row dimension, column dimension, value metric, aggregation grain, visualMap/color scale, missing-vs-zero encoding, row/column density, label sampling, and exact cell tooltip/detail |
| Ordered movement/journey/workflow | Path chart | Step/link schema, start/end/order, metric basis, conversion/drop-off, Top N and aggregation, main-path/branch strategy, legend/filter separation, and transition detail fallback |
| Ordered stage conversion/loss | Funnel chart | Stage schema/order, shared population/cohort rule, value/unit, entry share, stage conversion, drop value/rate, total conversion, stage-count fallback, legend/filter separation, and stage detail fallback |
| Hierarchy/parent-child structure | Tree chart | Root node, parent-child schema, depth/layer, visible-depth/default-expanded rules, Top N/`+N` child aggregation, orientation, expand/collapse/search, legend/filter separation, and node detail fallback |
| Entity relationship/dependency/network | Relation graph | Node/edge schema, relationship direction and weight, layout type, density limits, legend/filter separation, fitView/zoom/search, and node/edge detail fallback |
| Ranking/comparison | Sorted bar/table | Sort basis, top/bottom rule, exact values |
| Simple composition | Composition/share card, stacked bar, or donut/pie only for `2-6` categories | `compositionShareCardPattern` when card-level denominator/detail/control/footer is owned, total basis, percent/value tooltip, `Top5 + 其他` merge rule, and bar/table fallback when categories exceed budget |
| Metric decomposition, attribution, contribution, or hierarchy rollup | Decomposition card, waterfall, formula, tree, Sankey, matrix, or table | `decompositionAttributionCardPattern` when the card owns root metric, explanation mode, required formula/node/link/stage/time/matrix fields, reconciliation policy, residual/other visibility, attribution method when claimed, exact-value route, and fallback |
| Hierarchical composition/scale | Treemap / rectangular tree map | Hierarchy schema, non-negative additive area metric, parent/leaf aggregation, Top N/`其他`, label thresholds, color semantics, breadcrumb/drilldown, and table/bar/tree fallback |
| Hierarchical path/share | Sunburst | Hierarchy schema, non-negative additive angle metric, parent/child aggregation, visible depth/ring budget, Top N/`其他`, sector label thresholds, center content, breadcrumb/drilldown, and Treemap/bar/table fallback |
| Relationship/outlier/quadrant | Scatter/bubble | X/Y metric names and units, axis range/baseline rule, point density, reference lines/quadrants, tooltip exact values, and aggregation fallback |
| Matrix decision, priority, or strategy layer | Matrix decision card | `matrixDecisionCardPattern`, object grain, axes/dimensions/priority/layer fields, deterministic classification and threshold rules, density/label limits, exact-value route, and fallback to table/chart/detail when the decision scaffold cannot fit |
| Multi-metric object profile/anomaly | Parallel coordinates | Object id/name, `3-12` ordered dimensions, axis range/unit/direction, scaling mode, plot/axis spacing, sample opacity/sampling, brush/highlight, and table/scatter/bar fallback |
| Geography/spatial distribution | Map/geographic | Geography key or lon/lat fields, map resource/projection, fitBounds, map viewport budget, visualMap/legend, key-label-only rule, dense point/flow fallback, and tooltip exact values |
| Abnormality, risk, warning, or outlier diagnosis | Anomaly analysis card | `anomalyAnalysisCardPattern`, `anomalyAnalysisEvidenceBinding`, one diagnostic lens, severity/status, baseline or threshold, time/freshness, impact/object, detail/action route, and fallback |
| Cause or contribution | Waterfall, decomposition chart, ranked factors, table | Additive or attribution logic |
| Process/conversion | Funnel/process/flow only with ordered stages | Shared population/cohort rule, conversion/drop formulas, and detail fallback |
| Multi-dimensional score/profile | Radar only for `5-8` recommended dimensions, shared score scale, and `<=3` visible series | Dimension labels, target/actual semantics, tooltip exact/raw values, and fallback when dimensions/objects overflow |
| Audit/detail lookup | Table/S2/detail drawer | Row grain, key fields, export permission |

## Metric Display Rules

- Every metric must define raw scale, display scale, unit, precision, null/zero rule, period, comparison baseline, and owner.
- Chinese report UI should display rate, completion, change-rate, variance-rate, YoY, and MoM with `%` by default.
- Use positive-red-up and negative-green-down for change-rate indicators only when inherited company, finance, market, or explicit business convention requires it; otherwise use brand/neutral emphasis with sign/icon/label and reserve red/green for documented status or direction semantics.
- A displayed percentage must distinguish ratio value `0.42`, percent value `42`, and formatted value `42%`.
- Avoid terms such as `pt`, `p.p.`, and `percentage point` in Chinese UI unless the product explicitly requires them.

## Interaction Feedback Rules

- Hover/focus must not move, scale, or resize fixed-grid blocks.
- Prefer border color, outline, inset glow, or stable box-shadow inside component bounds.
- Focus-visible must be visible for keyboard users and must not rely only on color when possible.
- Reduced-motion behavior should keep state feedback but remove nonessential transitions.
- Disabled states must preserve layout and explain unavailable actions when the action is important.

## Governance Status

Use these statuses consistently:

| Status | Meaning |
| --- | --- |
| `stable` | Approved source, owner, scope, and acceptance checks exist |
| `variant` | Allowed alternative for a named scenario, with limits |
| `deprecated` | Existing pattern should be migrated away |
| `gap` | Required rule is missing or source conflict is unresolved |
| `exception` | Temporary project-specific deviation with owner and expiry |

## Minimum Audit Checks

- Are color, typography, spacing, radius, shadow, and breakpoint tokens semantic and sourced?
- Are filter, KPI, chart, table, drawer/modal, action, and feedback components specified?
- Are metric display rules explicit for unit, precision, percentage/rate, and trend semantics?
- Are loading, empty, error, no-permission, stale, disabled, and partial-data states present?
- Are hover/focus effects geometry-safe and accessible?
- Are template rules inherited rather than rediscovered or changed ad hoc?
- Are allowed variants and deprecated patterns named?
- Does each stable rule have source, owner, adoption status, and regression check?
