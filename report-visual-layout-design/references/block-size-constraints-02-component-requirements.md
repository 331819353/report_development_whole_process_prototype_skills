# Component Size Requirements

This file was split from `block-size-constraints.md`. Load it only for this focused rule group; use `block-size-constraints.md` as the routing index.

## 5. Extended Component Size Requirements

Classify every component into one of the following component types. `min_outer_width_px` and `min_outer_height_px` are base size checks used after selecting a default candidate span. `size_check_hint` helps judge whether the default span is likely to pass; it does not replace the default span distribution in `grid-containers.md`. Any hint with fewer than 3 rows is an internal component/sub-block size hint only and must not be emitted as a top-level page-grid block span.

| component_type | min_outer_width_px | min_outer_height_px | size_check_hint | notes |
| --- | ---: | ---: | --- | --- |
| `title` | 600 | 56 | `12x1` | Page main title |
| `section_header` | 360 | 48 | `12x1` | Section or chapter title |
| `filter_bar` | 600 | 64 | `12x1` | Filter and query controls |
| `tab_bar` | 500 | 56 | `12x1` | Tabs or dimension switch |
| `simple_kpi` | 220 | 120 | `2x1_or_2x2` | Single metric card |
| `rich_kpi` | 300 | 160 | `3x2` | Multi-line KPI with comparison |
| `mini_chart_kpi` | 320 | 180 | `3x2` | KPI with sparkline or mini chart |
| `progress_kpi` | 260 | 140 | `2x2_or_3x2` | KPI with progress bar |
| `gauge_kpi` | 300 | 220 | `3x3` | Gauge-style KPI |
| `landscape_kpi` | 420 | 180 | `4x2_or_5x2` | Horizontal KPI card with primary value plus right/bottom evidence visual |
| `kpi_overview_card` | 720 | 220 | `8x3_or_6x3` | Wide domain/topic overview card with `2-5` metrics, one local control, comparison/target cells, and optional compact evidence |
| `single_indicator_kpi` | 360 | 220 | `4x3` | Peer-grid KPI card with one metric, one comparison, one mini evidence visual, and target/progress footer |
| `kpi_judgment_card` | 360 | 240 | `4x3_or_4x4` | Status/health/rating/gauge judgment card with one semantic hero visual, comparison strip, and footer evidence |
| `kpi_goal_execution_card` | 360 | 240 | `4x3_or_5x3` | Target attainment/gap/progress/milestone execution card with one execution hero visual, comparison strip, and deadline/footer evidence |
| `kpi_time_series_card` | 360 | 240 | `4x3_or_5x3` | Trend/change/YoY-MoM/cycle/volatility/forecast KPI card with one time-series evidence zone and footer baseline/stat/forecast evidence |
| `kpi_comparison_analysis_card` | 360 | 240 | `4x3_or_5x4` | Direct/group/competitor/benchmark/variance comparison KPI card with comparable subject roles, evidence visual, and footer proof |
| `axis_line_kpi` | 420 | 260 | `4x3_or_5x3` | Horizontal KPI card with primary value plus readable ECharts line body, axes, target/reference/threshold/dual-series evidence |
| `axis_bar_kpi` | 420 | 260 | `4x3_or_5x3` | Horizontal KPI card with primary value plus readable ECharts horizontal bar body, labels, values, target/reference/threshold/dual-series evidence |
| `axis_scatter_kpi` | 420 | 300 | `4x4_or_5x4` | Horizontal KPI card with primary value plus readable scatter body, axes, trend/reference/threshold/quadrant evidence |
| `spatial_map_kpi` | 460 | 320 | `5x4_or_6x4` | Horizontal KPI card with primary value plus projection-safe map body, visualMap/legend, and selective labels |
| `paired_compare_kpi` | 420 | 260 | `4x3_or_5x3` | Horizontal KPI card with two comparable panes, central VS rail, mini evidence, and bottom conclusion strip |
| `wide_kpi_banner` | 560 | 160 | `5x2_or_8x2` | Wide KPI banner with split value/evidence zones |
| `kpi_group` | 600 | 180 | `12x2` | Group of KPI cards |
| `composite_panel` | 640 | 360 | `6x3_or_8x3` | Multi-component analysis card with one shared topic and one primary child |
| `micro_dashboard_card` | 680 | 620 | `8x7_or_larger` | Large single-topic mini dashboard card with KPI strip, multiple child charts, status/detail evidence, and shared filters |
| `state_feedback` | 220 | 160 | `component_body_or_block` | Empty/loading/error/no-permission/building state; inline states may use 180x120 if geometry is preserved |
| `line_chart` | 420 | 280 | `3x3_default_wider_legal` | Line chart |
| `area_chart` | 420 | 300 | `3x3_default_wider_legal` | Area or stacked area chart |
| `bar_chart` | 420 | 300 | `3x3_default_wider_legal` | Vertical bar chart |
| `horizontal_bar_chart` | 460 | 300 | `3x3_default_wider_legal` | Horizontal bar chart; left labels need room |
| `stacked_bar_chart` | 480 | 320 | `3x3_default_wider_legal` | Stacked or percentage bar chart |
| `combo_chart` | 520 | 340 | `4x3_default_wider_legal` | Bar-line combo or dual-axis chart |
| `scatter_chart` | 460 | 320 | `3x3_default_wider_legal` | Scatter plot |
| `bubble_chart` | 480 | 340 | `3x3_default_wider_legal` | Bubble chart |
| `parallel_coordinates` | 560 | 360 | `4x3_default_wider_legal` | Parallel coordinates need multi-axis width |
| `pie_chart` | 320 | 320 | `3x3_default_wider_legal` | Pie chart needs near-square plot |
| `donut_chart` | 360 | 320 | `3x3_default_wider_legal` | Donut chart, often with center metric |
| `funnel_chart` | 420 | 300 | `4x3_default_wider_legal` | Ordered conversion funnel; horizontal bar default |
| `waterfall_chart` | 520 | 320 | `4x3_default_wider_legal` | Waterfall or attribution chart |
| `radar_chart` | 360 | 340 | `3x3_default_wider_legal` | Radar chart |
| `treemap_chart` | 420 | 320 | `4x3_default_wider_legal` | Treemap chart |
| `sunburst_chart` | 420 | 360 | `4x3_default_wider_legal` | Multi-level sunburst hierarchy |
| `heatmap_chart` | 480 | 340 | `4x3_default_wider_legal` | Matrix heatmap |
| `calendar_heatmap` | 640 | 280 | `4x3_max` | Calendar heatmap |
| `boxplot_chart` | 480 | 320 | `3x3_default_wider_legal` | Boxplot |
| `histogram_chart` | 420 | 280 | `3x3_default_wider_legal` | Histogram or distribution chart |
| `distribution_card` | 480 | 320 | `5x3_or_5x4` | Distribution or interval card with histogram, donut, CDF, statistic strip, and exact-value path |
| `distribution_density_card` | 520 | 340 | `5x4_or_6x4` | Density/KDE card with estimator policy, sample count, and statistics |
| `distribution_heatmap_card` | 560 | 340 | `6x4_or_8x4` | Distribution heatmap, calendar heatmap, or density heatmap with cell legend and missing-vs-zero policy |
| `distribution_boxplot_card` | 520 | 340 | `5x4_or_6x4` | Boxplot card with sample count, Q1/median/Q3, whisker rule, and stat strip |
| `distribution_matrix_card` | 640 | 360 | `6x4_or_8x4` | Distribution detail table, population pyramid, multi-group comparison, or interval audit card |
| `table` | 720 | 360 | `8x4` | Standard data table; Detail Tables need row and column budget |
| `grouped_table` | 760 | 400 | `8x4_or_8x5` | Table with complex/grouped headers; header depth and body rows both need budget |
| `pivot_table` | 760 | 360 | `8x4_or_8x5` | Pivot or cross-summary table |
| `ranking_table` | 420 | 300 | `4x3` | Ranking list or Top N table |
| `ranking_card` | 420 | 300 | `4x3_or_5x3` | Ranking, leaderboard, or Top N card with rank/value/share rows |
| `wide_ranking_card` | 720 | 260 | `8x3_or_6x3` | Podium, medal-horizontal, metric-summary, or wide leaderboard card |
| `ranking_visual_card` | 520 | 340 | `5x4_or_6x4` | Ranking card with donut, radar, map, bubble, or chart-side evidence |
| `pareto_card` | 480 | 340 | `5x4_or_6x4` | Pareto chart card with sorted bars, cumulative line, and threshold |
| `pareto_table_chart_card` | 640 | 360 | `6x4_or_8x4` | Pareto card with exact table/list preview plus chart |
| `composition_share_card` | 420 | 300 | `4x3_or_5x3` | Basic occupancy/share/composition card with denominator, one main visual, and legend/tooltip exact values |
| `composition_share_detail_card` | 480 | 320 | `5x3_or_6x4` | Composition/share card with side detail table or bottom metric strip |
| `composition_hierarchy_card` | 520 | 340 | `5x4_or_6x4` | Multi-ring, sunburst, or treemap structure card with parent/child share evidence |
| `composition_trend_card` | 560 | 340 | `6x4_or_8x4` | Share trend, 100% stacked area/columns, or composition-over-time card |
| `composition_map_card` | 560 | 360 | `6x4_or_8x4` | Geographic structure/share card with map viewport and side legend/detail |
| `decomposition_card` | 480 | 320 | `5x3_or_6x4` | Formula, driver, overall contribution, compact attribution, or simple variance card with one root metric and one explanation body |
| `decomposition_flow_card` | 560 | 340 | `6x4_or_8x4` | Funnel, Sankey, path contribution, or flow decomposition card with directed/staged labels |
| `decomposition_hierarchy_card` | 560 | 360 | `6x4_or_8x4` | Tree, multilevel metric, hierarchy share, or hierarchy contribution card |
| `decomposition_matrix_card` | 640 | 360 | `6x4_or_8x4` | Attribution matrix, contribution matrix, heatmap, or hierarchy table card with exact rows/cells |
| `contribution_heatmap_card` | 560 | 340 | `6x4_or_8x4` | Contribution heatmap or dense contribution table card |
| `matrix_table` | 520 | 360 | `5x4_or_6x4` | Matrix, score, or 2D metric table |
| `detail_list` | 360 | 240 | `4x3` | Detail, event, or log summary list |
| `text_block` | 360 | 180 | `4x3_or_internal` | Analysis text |
| `insight_block` | 420 | 200 | `4x3_or_internal` | Insight card |
| `conclusion_block` | 600 | 180 | `6x3_or_12x3` | Conclusion section; wider legal span when reading strip is required |
| `recommendation_block` | 600 | 220 | `6x3_or_12x3` | Recommendations, actions, next steps |
| `analysis_summary_bar` | 280 | 56 | `internal_summary_strip` | One-line analysis summary or conclusion strip inside a legal parent block |
| `analysis_insight_card` | 320 | 128 | `4x3_or_internal` | One conclusion with evidence/action |
| `analysis_diagnosis_card` | 480 | 180 | `4x3_or_5x3` | Anomaly, attribution, risk, target diagnosis |
| `analysis_side_panel` | 220 | 240 | `2x3_or_3x3` | Chart-side insight list, max 25% of parent area |
| `analysis_annotation_bubble` | 120 | 40 | `chart_overlay` | Chart annotation, max 240x96 and max 3 visible |
| `path_chart` | 560 | 320 | `6x4_or_8x4` | User/business/process path chart |
| `conversion_path` | 560 | 320 | `6x4_or_8x4` | Conversion or drop-off path |
| `relationship_graph` | 560 | 420 | `6x5_or_8x5` | Entity relationship graph |
| `dependency_graph` | 560 | 420 | `6x5_or_8x5` | Dependency graph or impact chain |
| `sankey_chart` | 640 | 360 | `6x4_or_8x4` | Sankey flow chart |
| `flow_chart` | 560 | 360 | `6x4` | Business process flow |
| `org_chart` | 640 | 420 | `8x5` | Organization chart |
| `tree_diagram` | 600 | 420 | `6x5_or_8x5` | Tree diagram |
| `topology_graph` | 640 | 460 | `8x5` | System topology or architecture graph |
| `timeline` | 640 | 220 | `8x3` | Timeline or milestones |
| `gantt_chart` | 760 | 360 | `8x4_or_8x5` | Gantt chart |
| `duPont_chart` | 720 | 420 | `8x5` | DuPont financial decomposition chart |
| `map` | 480 | 360 | `4x4_or_8x4` | Map visualization |
| `geo_heatmap` | 560 | 420 | `6x5_or_8x5` | Geographic heatmap |

### Ranking, Top N, And Pareto Card Size Rules

- `ranking_card` covers cards that set `rankingCardPattern` and use `visualType: ranking-list`. Minimum outer size is `420x300`; compact list fallback may use `320x240` only after avatars/icons, micro trends, footer, and non-essential controls collapse.
- Standard ranking cards reserve header/control `44-56px`, ranking body `180-260px`, optional conclusion/footer `36-56px`, row height `32-44px`, rank column `28-44px`, object label column `>=96px`, and value/share column `>=72px`.
- Visible rows default to `5`. Top 10 requires `H >= 420px`, internal scroll, pagination, drawer, or table fallback. Do not squeeze more rows by shrinking row height below readability.
- `wide_ranking_card` covers podium, medal-horizontal, and metric-summary ranking cards. Minimum outer size is `720x260`; preferred size is `880-1200px` wide and `300-360px` high. Top 3 slots need `>=120x140` each when rendered as cards; ranks 4-5 may use compact rows.
- `ranking_visual_card` covers ranking cards with donut, radar, map, bubble, or score-profile evidence. Minimum outer size is `520x340`; the visual fit box must be at least `160x160` compact or `180x180` standard, and the exact-value side list/table/tooltip path must remain visible.
- Progress-bar ranking tracks need `>=120px` width. Per-row sparkline evidence needs `>=56x20`; readable row micro bars need `>=48x18`. If these fail, move the evidence to tooltip/detail or split to a full chart.
- `pareto_card` covers `paretoCardPattern` chart-only cards. Minimum outer size is `480x340`; preferred size is `560-760px` wide and `360-460px` high. The Pareto plot body must stay `>=220px` high and preserve both value and cumulative-share label budgets when dual-axis is visible.
- `pareto_table_chart_card` covers Pareto with an exact table/list preview. Minimum outer size is `640x360`; table/list preview needs `>=220px` width and at least `4` useful rows, chart body needs `>=260px` width, and the 80% or configured threshold label cannot collide with axes, bars, line, or legend.
- Pareto visible factors default to `4-8` and should stay `<=12` before aggregation. Long tail uses `aggregate-tail`, gray tail marks, drawer detail, or table fallback.
- Degrade ranking/Pareto cards in this order: collapse local controls, hide avatars/icons, reduce visible rows to Top3/Top5, move trend/share/secondary comparison to tooltip, switch to `basic-rank-list-card`, split to table/full chart, or move to drawer/fullscreen. Hidden overflow without a disclosure path fails.

### Composition, Share, And Structure Card Size Rules

- `composition_share_card` covers cards with `compositionShareCardPattern` and `visualType: composition-card`. Minimum outer size is `420x300`; compact cards must keep denominator, legend/tooltip access, and one exact-value path.
- `composition_share_detail_card` covers donut/detail, percent-bar/detail, share ranking, share metrics summary, market-share overview, and concentration cards. Minimum outer size is `480x320`; side detail/table budget must be `>=160px`, and footer metric cells must be `>=96px` wide.
- `composition_hierarchy_card` covers multi-ring hierarchy, sunburst, and treemap structure cards. Minimum outer size is `520x340`; ring/sunburst/treemap fit box must be `>=220x220`, visible levels default to `2`, and deeper drilldown needs breadcrumb/drawer/fullscreen.
- `composition_trend_card` covers 100% stacked share trends, stacked strips, and stacked column composition over time. Minimum outer size is `560x340`; plot body must stay `>=220px` high, x-axis labels must not collide, and each time bucket must have a visible or tooltip denominator.
- `composition_map_card` covers map structure/share cards. Minimum outer size is `560x360`; map body must stay `>=260px` high, map aspect ratio must be preserved, and visualMap/legend/detail cannot overlap geography.
- Donut/ring body minimum is `180x180`; compact cards may use `150x150` only when labels move to legend/tooltip. Percent-bar rows require `>=22px` height and visible category count defaults to `5-8`, max `10` before detail overflow.
- Degrade composition/share cards in this order: collapse local controls, move secondary value columns to tooltip, aggregate to Top5 + other, reduce footer metrics to `<=3`, switch donut to percent bars for close comparison, move hierarchy/detail to drawer/fullscreen, or fall back to table/ranking. Do not shrink the main visual into a decorative icon or hide the denominator.

### Decomposition, Attribution, Contribution, And Hierarchy Card Size Rules

- `decomposition_card` covers cards that set `decompositionAttributionCardPattern` and use `visualType: decomposition-card` for formula, driver-factor, overall contribution, compact attribution, and simple signed variance explanations. Minimum outer size is `480x320`; compact embedded cards may use `360x260` only when there is one root metric, one simple visual, `<=4` visible factors, and a detail route.
- Standard decomposition cards reserve header/control `36-48px`, root metric band `44-72px`, explanation body `>=160px` and `>=52%` of card height, detail/update band `36-52px`, and footer summary cells `>=96px` when present.
- `decomposition_flow_card` covers funnel decomposition, Sankey decomposition, path contribution, and staged attribution cards. Minimum outer size is `560x340`; flow body must stay `>=190px` high, left/right label columns need `>=88px` when visible, and every permanent node label needs a `>=72x28` fit box.
- `decomposition_hierarchy_card` covers tree decomposition, multilevel metric cards, hierarchy share cards, contribution trees, and target-attainment hierarchy attribution. Minimum outer size is `560x360`; hierarchy body must stay `>=200px` high, visible node boxes need `>=76x34`, default visible depth should be `2-3`, and deeper structures need collapse, drawer, or fullscreen.
- `decomposition_matrix_card` covers attribution matrices, contribution matrices, heatmaps, and indented hierarchy tables. Minimum outer size is `640x360`; matrix/table body must stay `>=220px` high, show at least `4` useful rows by default, and bound visible density around `8 x 6` cells before scroll/fullscreen.
- `contribution_heatmap_card` covers dense contribution heatmap/table hybrids. Minimum outer size is `560x340`; heatmap body must stay `>=200px` high, legend/scale needs `>=72px`, and exact row/cell values must be available through tooltip or a side/detail table.
- Waterfall, contribution, and variance cards need enough width for the start/end bars, signed deltas, residual/other, and labels. If the waterfall body drops below `260x180`, use ranked bars/table or split to a full chart.
- Do not validate a decomposition card as a standalone chart when it carries a root metric, explanation mode, exact-value route, local tabs, update time, or reconciliation policy. Do not validate it as `composition_share_card` when signed drivers, formulas, attribution methods, or hierarchy rollups are primary.
- Degrade decomposition cards in this order: collapse local controls, hide decorative icons, reduce secondary summary cells to `<=3`, aggregate small factors to `other/residual`, collapse hierarchy to `2` levels, move exact detail to tooltip/drawer, switch Sankey/tree/matrix to table when their body floor fails, split to a full chart/table, or remove causal/attribution wording if the method is missing. Hidden residuals, orphan nodes, unsigned waterfalls, and squeezed flow labels fail.

### Distribution, Interval, Density, And Boxplot Card Size Rules

- `distribution_card` covers cards that set `distributionAnalysisCardPattern` and use `visualType: distribution-card` for numeric distribution, interval, CDF, map distribution, time distribution, and compact distribution comparison. Minimum outer size is `480x320`; compact embedded cards may use `420x280` only when there is one chart body, `<=6` buckets/groups, and a detail route.
- Standard distribution cards reserve header/control `36-48px`, optional metric/sample strip `36-56px`, evidence body `>=180px` and `>=52%` of card height, statistic/footer strip `44-60px`, and update/detail band `28-40px`.
- `distribution_density_card` covers KDE, density comparison, quantile-band density, and density overview cards. Minimum outer size is `520x340`; density body must stay `>=200px` high, legend/estimator/sample notes need `24-36px`, and the card must preserve sample count plus estimator/bandwidth or precomputed-density policy.
- `distribution_heatmap_card` covers distribution heatmaps, density heatmaps, calendar/time heatmaps, and hotspot cards. Minimum outer size is `560x340`; heatmap body must stay `>=220px` high, cell size should be `>=12x12`, visible cells should stay around `<=14 x 8` before scroll/detail, and color legend needs `>=72px` or a safe in-chart scale.
- `distribution_boxplot_card` covers boxplot KPI summary, time-series boxplot, grouped boxplot comparison, weekday boxplot, anomaly boxplot, and boxplot overview cards. Minimum outer size is `520x340`; boxplot body must stay `>=200px` high, each category band should be `>=44px`, visible categories default to `4-7`, and Q1/median/Q3/whisker/outlier values must stay visible through labels, stat strip, tooltip, or detail table.
- `distribution_matrix_card` covers interval detail tables, boxplot detail tables, population pyramids, and multi-dimensional distribution cards. Minimum outer size is `640x360`; detail/table body must stay `>=220px` high, show at least `4` useful rows or `5` aligned interval bands, and preserve exact values without truncating bucket labels.
- Do not validate distribution cards as ordinary bar/line/heatmap/boxplot charts when they own sample count, bucket/statistical policy, local controls, statistic strips, update time, or exact-value/detail route. Use the standalone chart family only when the chart is one child inside a larger block and the card-level statistical contract lives elsewhere.
- Degrade distribution cards in this order: collapse local controls, reduce statistic strip to `<=3` cells, aggregate sparse buckets, shorten labels, move secondary quantiles/outlier detail to tooltip, switch density to histogram when estimator proof is missing, switch boxplot to statistic table when category bands fail, move heatmap/detail to drawer/fullscreen, or split to a full chart/table. Hidden sample size, fake density, unlabeled intervals, and missing-vs-zero ambiguity fail.

### KPI Card Size Rules

- `landscape_kpi` covers horizontal KPI cards whose `kpiCardPattern` starts with `horizontal-` and whose `kpiCardOrientation` is `landscape`, `compact-row`, or `wide-banner`.
- Do not validate a horizontal KPI card as `simple_kpi` when it contains a ring, mini trend, progress track, bottom comparison strip, percentage-point badge, or warning band.
- Minimum horizontal KPI useful size is `360x128` only after auxiliary evidence is collapsed. Standard horizontal KPI size is `420-560px` wide and `180-240px` high.
- Required internal minimums after padding: primary value zone `140px` wide, auxiliary visual zone `96x72`, ring/progress fit box `108x96`, bottom evidence band `44px` high when present, mini line/bar evidence `48px` high.
- `kpi_overview_card` covers wide metric cards that set `kpiOverviewCardPattern`. Minimum outer size is `720x220`; standard size is `760-960px` wide and `240-320px` high. It must reserve header `36-48px`, each visible metric cell `>=128px` wide, lead metric zone `>=180px` when present, comparison cells `>=112px`, target/progress cell `>=150px`, progress track `>=120px`, and compact sparkline/evidence fit box `>=120x56` when used.
- Do not validate KPI overview cards as `kpi_group`, `landscape_kpi`, `single_indicator_kpi`, or `micro_dashboard_card`. Overview cards summarize one topic with `2-5` metrics; Micro Dashboard Cards require larger parent minimums and multiple child sections.
- `single_indicator_kpi` covers peer-grid KPI cards that set `kpiSingleIndicatorLayoutMode`. Minimum outer size is `360x220`; standard size is `400-460px` wide and `260-320px` high. It must reserve header `32-44px`, value band `64-92px`, evidence fit box `>=112x72`, ring/semi-gauge fit box `>=116x96` when used, and footer target/progress band `44-60px` when visible.
- Do not validate single-indicator KPI grid cards as `simple_kpi`, `mini_chart_kpi`, or generic `landscape_kpi` when a footer target/progress band and local period/unit/grain/scale control are present.
- `kpi_judgment_card` covers metric cards that set `kpiJudgmentCardPattern` for status, health, score, rating, risk, progress, or gauge judgment. Minimum outer size is `360x240`; standard size is `400-460px` wide and `300-360px` high. It must reserve header `32-44px`, hero zone `>=96px`, comparison strip `54-72px`, footer evidence `32-52px`, and one hero visual family minimum such as icon `72x72`, ring `136x136`, semi-gauge `180x112`, or threshold bullet `220x28`.
- Do not validate KPI judgment cards as `simple_kpi`, `gauge_kpi`, `state_feedback`, or generic `landscape_kpi` when they carry status/score/range/threshold semantics plus comparison/footer evidence. If the hero minimum fails, downgrade to status chip + value or split to a full chart/table/detail block.
- `kpi_goal_execution_card` covers metric cards that set `kpiGoalExecutionCardPattern` for target attainment, target gap, plan-vs-actual progress, remaining work, deadline, or milestone state. Minimum outer size is `360x240`; standard size is `400-520px` wide and `280-360px` high. It must reserve header `32-44px`, execution hero zone `96-160px`, summary/actual-target zone `40-72px` when visible, comparison strip `54-72px`, footer evidence/deadline `32-52px`, and one hero visual family minimum such as ring `136x136`, semi-gauge `180x112`, linear progress `220x24`, target/actual pane `120px` each, milestone node gap `>=52px`, or timeline body `240x80`.
- Do not validate KPI goal execution cards as `simple_kpi`, `progress_kpi`, `gauge_kpi`, `kpi_judgment_card`, or generic `timeline` when they carry actual/target/gap/progress/milestone semantics plus deadline/footer evidence. If the hero minimum fails, collapse controls, reduce comparison cells, downgrade to a linear progress summary, collapse milestones to previous/current/next, or split to a full chart/table/timeline/Gantt/detail block.
- `kpi_time_series_card` covers metric cards that set `kpiTimeSeriesCardPattern` for trend movement, named-baseline change, YoY/MoM comparison, cycle/period state, volatility/stability, or forecast uncertainty. Minimum outer size is `360x240`; standard size is `400-520px` wide and `280-360px` high. It must reserve header `32-44px`, value/comparison zone `56-88px`, optional legend/chip row `18-28px`, time-series evidence zone `>=112px`, footer evidence `44-72px`, axis chart body `>=120px`, plot height `>=86px`, sparkline `>=160x64px`, forecast future region `>=40px`, and footer cells `<=4`.
- Do not validate KPI time-series cards as `simple_kpi`, `mini_chart_kpi`, `axis_line_kpi`, or generic `line_chart` when they carry compact trend/change/YoY-MoM/cycle/volatility/forecast semantics plus footer baseline/stat/forecast evidence. If the temporal evidence floor fails, collapse controls, reduce footer cells, downgrade to a sparkline only when axes/thresholds/forecast intervals are not required, or split to a full chart/table before accepting.
- `kpi_comparison_analysis_card` covers metric cards that set `kpiComparisonAnalysisCardPattern` for direct value comparison, group/segment comparison, competitor position, benchmark distance, or variance/gap diagnosis. Minimum outer size is `360x240`; standard size is `400-560px` wide and `280-380px` high. It must reserve header `32-44px`, summary/comparison zone `56-92px`, optional legend/role row `18-28px`, comparison evidence zone `>=112px`, footer evidence `44-72px`, axis chart body `>=140px`, plot height `>=92px`, radar fit box `>=150x150`, donut/ring fit box `>=128x128`, benchmark ruler `>=220x40`, NPS/score scale `>=220x32`, comparison table preview with `>=3` visible rows and `3-6` visible columns, footer cells `<=4`, and visible subjects `<=5`.
- Do not validate KPI comparison analysis cards as generic `bar_chart`, `radar_chart`, `donut_chart`, `table`, `map`, `paired_compare_kpi`, or `kpi_goal_execution_card` when they carry direct/group/competitor/benchmark/variance semantics. If the evidence minimum fails, collapse controls, hide decorative icons, reduce visible subjects to Top3, move secondary role/benchmark copy to tooltip, convert circular evidence to bars/table, reduce footer cells, or split to a full chart/table/map/matrix block.
- `axis_line_kpi` covers KPI cards whose `kpiCardPattern` is `horizontal-axis-line-trend`. Minimum outer size is `420x260`; standard size is `460-560px` wide and `280-340px` high. The ECharts line body must stay `>=180px` high, inner plot `>=130px` high, y-axis band `36-56px`, and x-axis band `28-40px`.
- Do not validate `horizontal-axis-line-trend` as a normal `landscape_kpi` if visible axes, gridlines, target/reference labels, threshold bands, phase annotations, or comparison legends are present.
- `axis_bar_kpi` covers KPI cards whose `kpiCardPattern` is `horizontal-axis-bar-compare`. Minimum outer size is `420x260`; standard size is `460-560px` wide and `280-340px` high. The ECharts horizontal bar body must stay `>=180px` high, inner plot `>=140px` high, row height `>=22px`, category label column `44-88px`, value/change-rate column `48-96px`, and visible bars `<=8`.
- Do not validate `horizontal-axis-bar-compare` as a normal `landscape_kpi` if visible axes, category labels, value labels, target/reference lines, threshold bands, change-rate sidebars, or comparison legends are present.
- `axis_scatter_kpi` covers KPI cards whose `kpiCardPattern` is `horizontal-axis-scatter-diagnostic`. Minimum outer size is `420x300`; standard size is `460-560px` wide and `320-360px` high. The ECharts scatter body must stay `>=200px` high, inner plot `>=160px` high, y-axis band `40-60px`, x-axis band `32-48px`, permanent point labels `<=6`, and point count/density strategy declared.
- Do not validate `horizontal-axis-scatter-diagnostic` as a normal `landscape_kpi` if visible axes, point cloud, trendline, reference line, threshold zone, quadrant labels, callouts, or category legends are present.
- `spatial_map_kpi` covers KPI cards whose `kpiCardPattern` is `horizontal-spatial-map-diagnostic`. Minimum outer size is `460x320`; standard size is `500-640px` wide and `340-380px` high. The map body must stay `>=220px` high, map viewport shorter side `>=180px`, legend/visualMap side budget `72-140px` or safe compact in-map legend, and map projection/aspect ratio preserved.
- Do not validate `horizontal-spatial-map-diagnostic` as a normal `landscape_kpi` if visible geography, visualMap, point/bubble/column markers, region labels, or side category summaries are present.
- `paired_compare_kpi` covers KPI cards whose `kpiCardPattern` is `paired-comparison-diagnostic`. Minimum outer size is `420x260`; standard size is `460-560px` wide and `280-340px` high. Each pane must stay `>=140px` wide, pane area `>=140px` high, central `VS` rail `32-44px`, and bottom conclusion band `36-52px`.
- Do not validate `paired-comparison-diagnostic` as two normal KPI cards unless the central comparison rail and bottom conclusion are removed; the comparison card must prove left/right pane fit and comparable metric definitions.
- If the parent span cannot satisfy those minimums, degrade in this order: collapse local control, remove decorative icon, move secondary comparison to tooltip, hide mini chart evidence, switch to `plain-metric`, or route the evidence to a full chart/table/detail block.
- For `kpi_overview_card`, degrade in this order: collapse segmented control to dropdown, hide overflow/definition/index, hide domain icon, move secondary helper text to tooltip, reduce visible metrics to Top3, hide compact evidence visual, split to separate KPI cards/full chart/table, or route to Micro Dashboard Card only when a large multi-section board is actually needed.
- For `single_indicator_kpi`, degrade in this order: collapse segmented control to dropdown, hide sample index/help icon, move secondary comparison wording to tooltip, hide mini evidence visual, hide progress track while keeping target/attainment text, or split evidence to a full chart/detail block. Do not shrink the primary value below the peer-grid baseline.
- For `kpi_goal_execution_card`, degrade in this order: collapse segmented/dropdown controls, hide icon/index/help, reduce comparison strip to `<=3` cells, move secondary copy to tooltip, replace ring/semi-gauge with linear target track, collapse milestone nodes to previous/current/next, move details to drawer, or split to a full chart/table/timeline/Gantt block.
- For `kpi_time_series_card`, degrade in this order: collapse segmented/dropdown controls, hide icon/index/help, reduce footer evidence to `<=2` cells, move secondary baseline or forecast confidence to tooltip, downgrade readable axes to sparkline only when exact audit is not required, or split to a full line/bar/forecast chart plus detail table.
- For `kpi_comparison_analysis_card`, degrade in this order: collapse segmented/dropdown controls, hide icon/index/help, reduce visible subjects to Top3, reduce footer evidence to `<=2` cells, move secondary benchmark/competitor/context copy to tooltip, convert radar/donut/gauge to bar/table when fit boxes fail, split to full chart/table/map/matrix, or move dense comparison detail to drawer/fullscreen.
- For `axis_line_kpi`, degrade in this order: collapse local control, hide ordinary point symbols and non-key labels, move target/reference/threshold labels to tooltip, remove area fill, downgrade to `horizontal-trend-compare`, or split into a full line chart block. Do not compress the chart into a thin stripe.
- For `axis_bar_kpi`, degrade in this order: collapse local control, abbreviate category labels, hide ordinary value labels, move target/reference/threshold labels to tooltip, reduce visible rows to Top 5, downgrade to a mini bar strip only if axes/value columns are intentionally hidden, or split into a full bar/table/detail block. Do not compress bars into unreadable row stripes.
- For `axis_scatter_kpi`, degrade in this order: collapse local control, hide ordinary labels, move reference/quadrant text to tooltip, remove optional callout/footer, sample or aggregate points, or split into a full scatter/table block. Do not compress points into an unreadable dot field.
- For `spatial_map_kpi`, degrade in this order: collapse local control, move footer/source metadata to tooltip, compact legend safely, hide ordinary labels, switch to ranked bar/table, or split into a full map block. Do not stretch or miniaturize geography.
- For `paired_compare_kpi`, degrade in this order: collapse local control, remove pane mini evidence, move secondary baseline text to tooltip, stack panes only in a taller block, or split into a full comparison chart/table. Do not compare mismatched units or grains.
- A KPI strip may combine portrait and landscape KPI cards only when row heights align and every card's primary value baseline remains stable. Otherwise split the strip into rows or use a larger summary block.

### Analysis & Insight Component Rules

- Analysis & Insight blocks include conclusion cards, insight cards, anomaly/risk cards, attribution summaries, recommendation/task cards, definition/data-quality/forecast notes, chart annotations, explanatory empty states, and permission/no-result/delay notes.
- A valid block carries `analysisInsightContract` in the component mapping or widget config: subtype, insight family, conclusion, evidence, affected object, action/trust/source/freshness, local-filter scope, tooltip/detail path, and state rules.
- Reserve conclusion, evidence, action/trust/source/freshness, optional local filter, tooltip/detail, and state-message zones before span acceptance.
- Summary bars stay `36-56px` high and use one sentence. Small cards stay `88-128px` high, standard cards `120-180px`, enhanced diagnosis cards `160-240px`.
- Chart-side insight panels use `insightW = clamp(200px, W * 0.28, 320px)` and should not exceed `25%` of the chart/Composite Panel area unless the parent is explicitly an explanation panel.
- Annotation bubbles use `120-240px` width and `40-96px` height, with `12-48px` leader line and max `3` visible annotations. They cannot cover axis labels, legends, selected marks, or the anomaly point they explain.
- If an analysis block needs more than `5` body rows, split it, shorten copy, turn it into a side panel, or move detail to drawer/fullscreen. Do not shrink text below baseline readability.
- Explanatory empty/no-permission/data-delay states need reason, impact, and next step, not only `暂无数据`.

### Composite Panel Rules

- `composite_panel` blocks are parent blocks that contain one business analysis unit, not a free collection of widgets. Require one shared topic, one primary child, child roles/priorities, and a declared `compositePanelContract` before span acceptance.
- Recommended outer size is `640-960px` wide and `360-560px` high. Minimum outer size is `320x260px` only after subtitle, auxiliary child, detail preview, shared legend, and footer have collapsed.
- Reserve title/function/local-filter, optional subtitle/unit/source, optional metric strip, main child, auxiliary child area, optional short detail preview, shared legend, tooltip/detail route, and state-message zones.
- Content body must remain dominant: `contentH >= CH * 0.60`. If it fails, hide footer, reduce metric strip, collapse local filter, hide shared legend, collapse detail preview, then hide auxiliary children before shrinking the primary child.
- Default visible child count is `2-3`; normal maximum is `4`. More than `4` visible analytical children require split blocks, tabs, drawer/fullscreen, or a documented large-container exception.
- Primary child visual weight should be `50-70%`. Auxiliary area should stay `20-35%`. Notes, definitions, and footer actions should stay `5-10%`.
- Main/side layouts require `W >= 640px` and `H >= 320px`; `2 x 2` matrix layouts require `W >= 720px` and `H >= 420px`; metric + main + side + bottom detail requires roughly `W >= 960px` and `H >= 540px`.
- Detail preview stays short: `3-6` rows and `3-5` columns. Larger details need a full Detail Table block, drawer, fullscreen, or route.
- Child minimums: metric `120x72`, line `220x140`, bar `240x160`, pie/donut `180x160`, Top list `140x120`, detail preview `240x120`, heatmap `240x160`, map `280x220`, gauge `180x160`.
- Split the block when children answer different questions, need independent full title/filter/action bands, or internal scrolling becomes the main way to understand the panel.

### Micro Dashboard Card Rules

- `micro_dashboard_card` blocks are larger than `composite_panel` blocks. They contain one themed management topic with a KPI strip, `4-8` bounded child sections, and a compact exact-value/status path.
- Require `microDashboardCardPattern` and `microDashboardContract` before span acceptance. Do not accept this pattern as a normal Composite Panel exception.
- Recommended portrait size is `720-960px` wide and `760-980px` high. Recommended wide size is `960-1280px` wide and `560-760px` high. Absolute minimum is `680x620`.
- Header and shared filter/action area should consume `36-52px`; KPI strip consumes `76-96px`; internal gaps are `8-12px`; parent padding is `12-16px`.
- Child minimums after all padding and labels: KPI tile `120x64`, primary chart `220x150`, small axis chart `180x128`, donut/pie/ring `150x140`, funnel `180x140`, heatmap `220x130`, sparkline group `160x96`, compact table preview `320x150`, status strip item `96x56`.
- The primary trend/combo/chart child must remain visually dominant when present and must not be squeezed below its plot floor. If a table/status section competes for height, collapse the table/status section into tabs, drawer, or detail route before shrinking the primary chart.
- No more than `8` visible analytical child sections may render simultaneously. `9+` sections require tabs, split cards, or fullscreen.
- If `W < 680` or `H < 620`, render a summary card plus one primary child and move the rest to tabs/drawer/fullscreen. Do not scale down typography, axes, or table rows to force the full board.

### State Feedback Rules

- `state_feedback` surfaces include empty, filtered-empty, loading, error, no-permission, stale, partial-data, disabled, success, and building states.
- Inline chart/table body states may use `180x120` only when the surrounding component header, filters, and body geometry stay stable. Standard component states need at least `320x220`; full-page states need at least `720x480`.
- Reserve visual, title, reason, optional impact, action row, and optional status metadata before accepting the span.
- A state cannot collapse the parent card, chart, table, drawer, or page body. Preserve the affected component geometry to avoid layout jump.
- No-permission states must not leak restricted row counts, totals, silhouettes, trend shapes, or object names. Use safe scope wording and a request/switch/return action when supported.
- Loading states must use skeletons for tables/lists and stable centered progress for charts/cards. Motion must be reduced-motion aware and must not shift layout.
- Error states need affected surface, concise cause, and retry only when retry is wired.
- If a state reason needs more than `2` lines inside a component or `3` lines in a full-page state, move detail to help/log/drawer instead of shrinking text.

### Detail Table Rules

- `table` blocks that represent Detail Tables need title/function/local-filter, optional metric strip, optional compact search/tools, fixed header, body rows, optional summary row, pagination/total, tooltip/detail, and state-message zones before span acceptance.
- The body must remain dominant: `tableBodyAreaH >= CH * 0.55`. Default visible rows should be `4-6`; fewer than `3` visible rows fails unless the block is explicitly a small preview with a detail route.
- Recommended outer size is `560-960px` wide and `360-560px` high. Minimum preview size is `280x220px` only when subtitle, metric strip, toolbar, low-priority columns, footer, and full pagination are collapsed.
- Default visible columns are `5-8`; large blocks may show `8-12`; `11-16` columns require horizontal scroll plus frozen primary column; `>16` columns require column settings/drawer/split; `>24` should not be one flat table.
- Row height defaults to `40px`; compact rows are `32-36px`; relaxed rows are `48-56px` only for avatar/two-line content. Do not shrink text or row height below readability just to pass the span.

### Grouped Table Header Rules

- `grouped_table`, wide Detail Table, metric matrix, financial grid, or table blocks with `>8` visible columns/natural field groups need a grouped-header budget before span acceptance.
- Reserve title/function/local-filter, optional subtitle/metric strip, grouped header rows, leaf header row, body rows, optional summary row, pagination/total, tooltip/detail, and state-message zones.
- Header depth defaults to `2`, max accepted display depth is `3`; `headerRowH = 32-40px`; total header height is roughly `64-80px` for two levels and `96-116px` for three levels.
- The table body must still show at least `4` useful rows by default. If grouped headers leave fewer than `3` rows, enlarge/split, collapse groups, remove header subtext, compact rows, use fullscreen/detail, or redesign.
- Leaf columns `<=8` display directly; `9-16` may use horizontal scroll; `17-30` need frozen key columns plus column settings; `31-50` need group collapse or settings; `>50` needs redesign, pivot, column paging, or configuration view.
- The whole multi-level header fixes during vertical body scroll. When horizontal scroll exists, the top-left grouped header and row-dimension/primary columns freeze together.
- Component-local filters sit in the component-owned title/function area and must not be confused with leaf-column filter icons inside the grouped header.

### Pivot Table Rules

- `pivot_table` or visualType `pivot` blocks need title/function/local-filter, optional metric strip, row dimension header, multi-level column header, measure header, data body, subtotal/grand-total bands, scroll/virtual viewport, tooltip/drilldown, and state-message zones before span acceptance.
- The pivot body must remain dominant: `pivotAreaH >= CH * 0.55`. At least `4` body rows should be visible unless the block is a named preview with fullscreen/detail route.
- Recommended outer size is `640-1200px` wide and `360-640px` high. Minimum preview size is `320x240px` only when subtitle, metric strip, toolbar, footer, low-priority measures, and full pagination are collapsed.
- Default row dimension depth is `1-2`; default column dimension depth is `1-2`; default visible measures are `1-3` and maximum visible measures are `5`.
- Rows `<=50` and columns `<=12` can display directly. Rows `51-200` or columns `13-24` require fixed headers and scroll. Rows `>200` require row virtualization. Columns `>24` require horizontal scroll and frozen row dimension columns. Columns `>50` require dimension reduction, column paging, fullscreen, or redesign.
- Percentage/rate totals need formula space and tooltip evidence; do not accept a layout that hides aggregation definitions or makes subtotal/grand-total semantics ambiguous.
- Conditional formatting must not dominate the matrix. Reserve it for `1-2` core measures; if every cell family needs color, consider heatmap or split views.

### Combo Chart Rules

- `combo_chart` blocks need more axis and legend budget than ordinary bar or line charts: reserve title/function/local-filter area, optional metric strip, legend, left y-axis, optional right y-axis, x-axis label band, target/reference right-gap, tooltip guide, and state-message zone before accepting the span.
- Recommended outer size is `560-960px` wide and `360-480px` high; minimum is `320x240px` only when subtitle, metric strip, ordinary labels, footer, and secondary legend items are collapsed.
- The inner plot remains dominant: `plotH >= CH * 0.48`. Collapse footer, secondary metric strip, legend detail, component-local filters, ordinary data labels, and line points before shrinking the plot.
- Combo blocks are valid only when bar and line/target metrics share one ordered category/time axis. If the relationship is weak or exact audit is the task, allocate separate bar/line/table blocks instead of forcing a dual-axis chart.
- Use at least `4x3` for ordinary Combo charts. When dual axes, target labels, grouped/stacked bars, or `N > 12` categories cannot fit within a legal wider span, split into separate bar/line/table blocks, reduce visible density, or move detail to drawer/fullscreen instead of squeezing the chart canvas.

### Gauge Rules

- `gauge_kpi` or Gauge chart blocks need enough width and height for title/local filter, center value, arc geometry, min/max ticks, target marker, and optional status text. Treat the table minimum above as the outer block minimum; the inner Gauge body still needs `gaugeAreaH >= CH * 0.50`.
- Default to a semicircle Gauge in ordinary report blocks. Circular or `240deg` gauges require larger height and a documented monitoring/display reason.
- Preserve a centered fit box: semicircle/circle arcs must not be stretched independently on X/Y. If the body ratio fails, use a KPI card, progress bar, bullet/target card, or larger block before distorting the Gauge.
- Center value plus unit is the visual anchor. Hide footer, metric strip, middle ticks, threshold text, target label, and legend before reducing the center value below readable size.
- Recommended Gauge block: `280-420px` wide and `240-340px` high; minimum usable body is about `220x180px` only when subtitle, metric strip, legend, and target labels are hidden.
- Threshold segments stay `3-4` by default and `<=5`; target label is optional, but target tick and tooltip should remain when target is business-critical.
- Multiple Gauge blocks in one view must share range, gauge type, typography, status colors, radius ratio, and threshold semantics. Otherwise use KPI cards or a comparison table.

### Funnel Rules

- `funnel_chart` needs enough width for left stage labels, the bar/funnel body, and right value/share labels. Treat the table minimum above as the outer block minimum; the inner funnel body still needs `funnelAreaH >= CH * 0.52`.
- Default to a horizontal bar funnel in report blocks. A traditional trapezoid funnel needs a larger display/storytelling block, short labels, and few stages.
- `3-5` stages are the clearest, `6-7` may fit the minimum block, `8-10` requires compact mode or folding, and `>10` should use process table, path chart, Sankey, or scroll/folded detail.
- Preserve `stageLabelW = 56-120px`, `valueLabelW = 72-160px`, `barGap = 12-16px`, and `stageH >= 20px`. If any budget fails, enlarge the span or remove optional footer/metric/legend/loss labels before shrinking text.
- Component-local filters must stay in the title/header area and collapse before they reduce the funnel body below the height floor.
- Legend is normally omitted for a single funnel; comparison/target legends require a width/height budget and at most two visible groups.
- Do not place funnel charts in narrow strips where stage names, conversion values, or exact-value tooltip targets become unreadable.

### Treemap Rules

- `treemap_chart` needs enough body height for parent groups, child rectangles, label thresholds, legend/visualMap, breadcrumb, and component-local filters. Treat the table minimum above as the outer block minimum; the inner treemap body still needs `treemapAreaH >= CH * 0.55`.
- `leaf_count <= 12`: full display may fit in the minimum block when labels pass thresholds.
- `13 <= leaf_count <= 30`: use Top N and hide small labels.
- `31 <= leaf_count <= 80`: use Top N + `其他`; consider a wider/taller span when parent labels matter.
- `leaf_count > 80`: use drilldown, search, pagination, fullscreen, ranked bar, or table fallback before declaring the layout valid.
- `depth > 2`: require breadcrumb/drilldown; `depth > 3` should not render all levels in one block.
- Negative values, rate-only metrics, scores, or unclear hierarchy cannot use treemap area. Route to bar, waterfall, table, tree, or relation graph as appropriate.
- If tiny rectangles dominate or permanent labels cannot pass `48px * 28px`, aggregate long-tail leaves, reduce visible levels, or enlarge the block.

### Sunburst Rules

- `sunburst_chart` needs enough body height for center content, visible rings, sector label thresholds, legend/visualMap, breadcrumb, and component-local filters. Treat the table minimum above as the outer block minimum; the inner sunburst body still needs `sunburstAreaH >= CH * 0.55`.
- The sunburst viewport should be aspect-compatible and centered. Do not allocate a narrow strip and stretch the radial chart; use a centered fit box, a larger span, fullscreen, or another component.
- Visible levels default to `2-3`; `4` levels require a large block and key-only labels; `5+` levels require drilldown, search, table detail, or another view.
- Ring budget must pass: `innerR = outerR * 0.22-0.34`, default `0.28`, `ringGap = 1-3px`, and `ringW >= 18px`. If `ringW < 18px`, reduce visible levels or enlarge the block before shrinking text.
- `node_count <= 20`: direct display may fit in the minimum block when sector labels pass thresholds.
- `21 <= node_count <= 50`: use Top N + `其他`.
- `51 <= node_count <= 100`: use drilldown or only two visible levels.
- `node_count > 100`: do not render full sunburst by default; use search, table/detail, Treemap, or drilldown.
- `children_per_parent > 12`: hide small/deep labels or use Top N; `> 20` requires Top N plus drilldown/search/detail.
- Negative values, rate-only metrics, scores, or unclear hierarchy cannot use sunburst angle. Route to bar, waterfall, table, tree, relation graph, or Treemap as appropriate.
- If tiny sectors dominate or permanent labels cannot pass `sectorAngle >= 10deg`, `ringW >= 22px`, and arc-length fit, aggregate long-tail sectors, reduce visible levels, or enlarge the block.

### Parallel Coordinates Rules

- `parallel_coordinates` needs enough body width for `3-12` vertical axes, axis titles, line density, highlighted objects, brush ranges, legend, and component-local filters. Treat the table minimum above as the outer block minimum; the inner plot still needs `plotH >= CH * 0.48`.
- Axis spacing must pass `axisGap = plotW / (dimension_count - 1)`. Minimum `axisGap` is `56px`, and long axis titles should use `72-96px`. If the gap fails within `4x3`, reduce visible dimensions, use horizontal scroll, move to fullscreen/detail, or switch to table/scatter/bar fallback.
- `dimension_count < 3` should not use parallel coordinates; use scatter, bar, KPI, or table. `3-5` dimensions are clearest, `6-8` are the recommended upper range, `9-12` require short labels and tick reduction, and `>12` requires dimension filtering or another component.
- Sample count controls density: `<=30` lines may display normally, `31-100` lowers ordinary-line opacity, `101-500` needs very low opacity plus brush/filter, and `>500` needs sampling, aggregation, density view, or detail table fallback.
- Collapse footer, secondary metric strip, legend, and local filters before shrinking the plot. Axis titles and exact-value tooltip/detail access are not optional.
