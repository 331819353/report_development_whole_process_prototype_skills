# Distribution, Interval, Density, And Boxplot Cards

Use this reference when a reusable report card answers:

- Where do values concentrate?
- Which interval or percentile band matters?
- How spread out, skewed, stable, or abnormal is the metric?
- How do distributions differ by group, time, region, or dimension?

These cards are not generic chart cards. They are distribution-analysis cards with an evidence chart, sample/statistics contract, local controls, exact-value disclosure, and fallbacks.

## Why The Samples Feel Designed

- The card title names the analytical job, such as "区间分布", "密度分布", "箱线图", or "分位数分布", not only a chart type.
- Each card keeps a visible data contract: sample count, interval boundaries, mean/median, quantiles, standard deviation, max/min, or high-density interval.
- The visual geometry matches the statistical question: histogram for frequency, donut for interval share, CDF for percentile location, KDE for smooth density, heatmap for two-dimensional concentration, and boxplot for quartiles/outliers.
- Local tabs such as "分布 / 明细数据" are scoped to the card, while global date/view controls stay outside the card.
- Exact values remain reachable through tooltip, bottom statistic strip, detail table, or "更多".
- The style is calm: thin borders, neutral card surface, restrained blue/teal/orange/purple semantic series, and small update/freshness text. The polish comes from statistical clarity, not decorative gradients.

## Controlled Pattern Field

Use `distributionAnalysisCardPattern` when the component is one self-contained card whose primary job is reading distribution, intervals, density, quantiles, spread, or outliers.

```ts
type DistributionAnalysisCardPattern =
  | 'numeric-histogram-distribution-card'
  | 'interval-donut-distribution-card'
  | 'percentile-cdf-distribution-card'
  | 'geographic-distribution-card'
  | 'time-distribution-card'
  | 'distribution-comparison-card'
  | 'calendar-heatmap-distribution-card'
  | 'multidimensional-population-distribution-card'
  | 'interval-histogram-card'
  | 'interval-share-donut-card'
  | 'interval-boxplot-card'
  | 'interval-comparison-card'
  | 'interval-stacked-trend-card'
  | 'cumulative-interval-card'
  | 'interval-scatter-strip-card'
  | 'interval-detail-table-card'
  | 'univariate-density-curve-card'
  | 'interval-density-curve-card'
  | 'grouped-density-comparison-card'
  | 'density-heatmap-card'
  | 'kde-cumulative-density-card'
  | 'bivariate-density-hexbin-card'
  | 'quantile-band-density-card'
  | 'density-overview-card'
  | 'boxplot-kpi-summary-card'
  | 'time-series-boxplot-card'
  | 'grouped-boxplot-comparison-card'
  | 'boxplot-overview-card'
  | 'boxplot-side-summary-card'
  | 'weekday-boxplot-card'
  | 'anomaly-boxplot-card'
  | 'boxplot-detail-table-card';
```

## Pattern Selection

| Business/data trigger | Pattern | Default evidence | Required proof |
| --- | --- | --- | --- |
| One numeric metric needs frequency by bucket | `numeric-histogram-distribution-card` | histogram | bucket start/end, count, total, bin rule |
| Bucket shares are the main reading task | `interval-donut-distribution-card` | donut + interval legend | bucket count/share, total, denominator |
| Percentile position or threshold lookup matters | `percentile-cdf-distribution-card` | cumulative line/CDF | ordered value, cumulative share, percentile markers |
| Geography is the distribution dimension | `geographic-distribution-card` | choropleth/region map | geo code, value, visualMap, missing-geo policy |
| Hour/day/period distribution matters | `time-distribution-card` | time line or bars | time grain, ordered time, count/value |
| Current vs baseline distribution differs by bucket | `distribution-comparison-card` | grouped bars | bucket, current, baseline, delta |
| Time x day or period x hour concentration matters | `calendar-heatmap-distribution-card` | heatmap | row dimension, column dimension, value, scale |
| Two demographic/object dimensions split one population | `multidimensional-population-distribution-card` | population pyramid or mirrored bars | dimension A, dimension B, counts, denominator |
| Data is explicitly grouped into business intervals | `interval-histogram-card` | interval bars | interval labels, lower/upper bounds, count |
| Interval share is more important than counts | `interval-share-donut-card` | donut by interval | interval share, count, total |
| Spread within each interval must be compared | `interval-boxplot-card` | boxplot by interval | Q1, median, Q3, whisker, sample count |
| Current/baseline interval shares differ | `interval-comparison-card` | interval bars with delta | current share, baseline share, delta |
| Interval composition changes over time | `interval-stacked-trend-card` | stacked area/columns | time, interval, share/count |
| Cumulative contribution by interval matters | `cumulative-interval-card` | cumulative line | cumulative count/share, percentile markers |
| Raw samples per interval need visible scatter | `interval-scatter-strip-card` | jitter/scatter strip | sample grain, interval, value, density strategy |
| Exact interval audit is primary | `interval-detail-table-card` | table | interval stats, totals, cumulative share |
| One metric needs smooth concentration reading | `univariate-density-curve-card` | KDE/area curve | value, density, bandwidth or smoothing policy |
| Density peak by interval is the key result | `interval-density-curve-card` | KDE with interval labels | interval bounds, density curve, peak interval |
| Multiple cohorts need density comparison | `grouped-density-comparison-card` | multi-line KDE | group id/name, curve values, sample count |
| Two dimensions form a density surface | `density-heatmap-card` | heatmap | x bins, y bins, density/count |
| Density and cumulative share are both needed | `kde-cumulative-density-card` | KDE + cumulative line | density curve, cumulative share, shared x order |
| Two numeric metrics have dense samples | `bivariate-density-hexbin-card` | hexbin/scatter density | x/y fields, binning, count/density |
| The reader needs P10/P25/P50/P75/P90 bands | `quantile-band-density-card` | density curve with shaded bands | percentile fields, band ranges |
| A summary distribution card combines key stats | `density-overview-card` | density curve + stats strip | sample count, mean, median, stddev |
| KPI headline plus boxplot is needed | `boxplot-kpi-summary-card` | boxplot + KPI/legend | sample stats plus headline metric |
| Distribution over ordered dates/periods | `time-series-boxplot-card` | boxplots by time | time, Q1/median/Q3, whisker |
| Two or three groups compare spread | `grouped-boxplot-comparison-card` | grouped boxplots | group fields, stats per group |
| Card summarizes distribution state | `boxplot-overview-card` | boxplot + side stat list | summary stats, sample count |
| Side summary metrics matter as much as boxplot | `boxplot-side-summary-card` | side stats + boxplot | median, mean, stddev, coefficient |
| Weekday/hour boxplot pattern matters | `weekday-boxplot-card` | boxplots by weekday/hour | ordered day/hour, sample stats |
| Outlier/error spread needs warning | `anomaly-boxplot-card` | boxplot + anomaly band/callout | outlier rule, anomaly value, action route |
| Exact statistics table is primary | `boxplot-detail-table-card` | table + mini boxplot | statistic rows, categories, raw detail route |

## Evidence Binding

Every selected card must carry `distributionAnalysisEvidenceBinding` or an equivalent project contract.

```ts
type DistributionAnalysisEvidenceBinding = {
  distributionMode:
    | 'distribution'
    | 'interval'
    | 'density'
    | 'boxplot'
    | 'quantile'
    | 'cumulative'
    | 'multidimensional';
  metricId: string;
  metricName: string;
  unit: string;
  sampleGrain: string;
  sampleCountField: string;
  valueField?: string;
  weightField?: string;
  bucketFields?: {
    bucketIdField: string;
    bucketLabelField: string;
    lowerBoundField?: string;
    upperBoundField?: string;
    countField: string;
    shareField?: string;
    cumulativeCountField?: string;
    cumulativeShareField?: string;
  };
  densityFields?: {
    xField: string;
    densityField: string;
    bandwidthField?: string;
    groupField?: string;
    cumulativeShareField?: string;
    highDensityIntervalField?: string;
  };
  quantileFields?: {
    minField?: string;
    p10Field?: string;
    p25Field?: string;
    medianField: string;
    p75Field?: string;
    p90Field?: string;
    maxField?: string;
    meanField?: string;
    stddevField?: string;
    iqrField?: string;
  };
  boxplotFields?: {
    categoryField: string;
    lowerWhiskerField: string;
    q1Field: string;
    medianField: string;
    q3Field: string;
    upperWhiskerField: string;
    outlierField?: string;
    meanField?: string;
    sampleCountField?: string;
  };
  heatmapFields?: {
    rowField: string;
    columnField: string;
    valueField: string;
    colorScaleField?: string;
    missingValuePolicy: 'distinct-missing' | 'zero-is-valid' | 'omit';
  };
  geographyFields?: {
    regionIdField: string;
    regionNameField: string;
    mapResource: string;
    valueField: string;
    missingGeoPolicy: string;
  };
  comparisonFields?: {
    baselineLabelField?: string;
    baselineValueField?: string;
    currentValueField?: string;
    deltaField?: string;
    deltaRateField?: string;
  };
  intervalPolicy: {
    binMethod: 'business-defined' | 'equal-width' | 'quantile' | 'custom';
    intervalClosed: 'left-closed-right-open' | 'right-closed-left-open' | 'closed' | 'open';
    overflowBucketPolicy: 'show-below-above' | 'merge-tail' | 'hide-with-detail' | 'not-applicable';
  };
  missingValuePolicy:
    | 'missing-as-null'
    | 'missing-as-zero'
    | 'explicit-empty-cell'
    | 'exclude-with-disclosure';
  zeroValuePolicy: 'true-zero' | 'empty-zero' | 'exclude-zero' | 'domain-defined';
  outOfRangePolicy:
    | 'clip-to-domain'
    | 'show-overflow-bucket'
    | 'mark-as-outlier'
    | 'exclude-with-disclosure';
  densityPolicy?: {
    estimator: 'histogram' | 'kde' | 'hexbin' | 'heatmap' | 'boxplot-stats';
    smoothingPolicy?: string;
    scaleType: 'linear' | 'log' | 'percent' | 'score';
  };
  tooltipPayload: string[];
  detailAction?: string;
  exportFields?: string[];
};
```

## Anatomy

1. Header: index/title, optional info icon, local tabs such as `分布 / 明细数据`, optional metric or dimension selector, and "more" action.
2. Context row: metric name, sample count, time range, unit, selected interval/density mode, or short comparison value when needed.
3. Evidence body: one primary statistical visual. Avoid multiple competing plots in one card unless the pattern explicitly calls for KDE + cumulative or chart + table.
4. Statistic strip: `3-5` stable stats such as total, mean, median, P25/P75/P90, stddev, peak interval, or largest interval.
5. Footer: update/freshness, source, refresh icon, or detail route.

## Size Families

| Size family | Minimum outer size | Use for | Critical floors |
| --- | --- | --- | --- |
| `distribution_card` | `480x320` | histogram, CDF, interval comparison, basic density | evidence body `>=180px`, stats strip `44-60px` |
| `distribution_density_card` | `520x340` | KDE, grouped density, quantile bands | plot body `>=200px`, legend/scale `>=64px` |
| `distribution_heatmap_card` | `560x340` | calendar/time heatmap, density heatmap | heatmap body `>=200px`, legend `>=56px`, cell floor `12px` |
| `distribution_boxplot_card` | `520x340` | boxplot cards | boxplot body `>=200px`, category labels `<=12` before scroll |
| `distribution_matrix_card` | `640x360` | detail tables, multidimensional/pyramid/table hybrids | table or matrix body `>=220px`, at least `4` useful rows |

Compact cards below these floors may show only a summary KPI plus one sparkline/minibar and must link to a full distribution card or detail drawer.

## Data And Interaction Rules

- Do not generate interval cards without explicit bucket boundaries or a declared binning method.
- Do not generate density cards without sample count and a smoothing/binning policy.
- Do not generate boxplot cards without Q1, median, Q3, whisker rule, and sample count. If only min/max/average exist, use a bar/table summary instead.
- Distribution cards need a sample grain. Aggregates without raw samples or precomputed distribution stats are not enough.
- Show missing, zero, and out-of-range handling explicitly. Missing values must not be silently counted as zero.
- Permanent labels should be sparse. Use tooltip/detail for exact buckets, outliers, and raw rows.
- Local controls change only the card evidence mode, interval basis, metric, group, or detail mode. They must not silently change page/global filters or export scope.
- Outliers need a named rule, such as IQR, percentile cutoff, sigma, or business threshold.
- Use table/detail fallback for exact audit, sparse samples, too many buckets, too many categories, or unclear statistical assumptions.

## Visual Rules

- Use a neutral card shell, clear axis/grid, and weak fills. Keep statistical marks stronger than background decoration.
- Use stable interval colors across charts in the same card family. Bucket color order should not change after filtering.
- Use sequential color for magnitude/density, diverging color for signed deviation, and semantic warning color only for anomaly/outlier callouts.
- Density curves should be smooth but not falsely perfect. Keep visible points, stats, or confidence/percentile bands when uncertainty matters.
- Boxplots should preserve geometry: boxes, whiskers, medians, outliers, and legends are renderer-owned or contract-owned, not hand-drawn decoration.
- Map and heatmap distribution cards must preserve aspect ratio and color scale readability.

## Fallbacks

| Problem | Fallback |
| --- | --- |
| Raw samples unavailable but precomputed bucket stats exist | histogram/interval/table card |
| Only aggregate min/max/avg exists | KPI summary + detail note, not density/boxplot |
| Buckets exceed `12` | Top intervals + tail, scroll, or detail table |
| Boxplot categories exceed `12` | horizontal/scroll/table/fullscreen |
| Heatmap cells exceed `20 x 30` or `600` cells | aggregate, sample labels, scroll, or detail |
| Density sample count too low | histogram or raw scatter strip |
| Exact row audit is primary | table or detail drawer first, chart secondary |

## Anti-AI Failure Modes

- The card uses a pretty curve but cannot state sample count, bin method, or unit.
- A boxplot is drawn from aggregate averages instead of quartile/whisker stats.
- Interval labels are arbitrary decorative buckets with no boundaries.
- Heatmaps use color variation even when missing and zero are not distinguished.
- Every bucket or point is labeled, making the chart look generated rather than designed.
- The same blue palette carries every category without statistical semantics.
- The card hides the denominator/sample count, so percentages cannot be trusted.

## Acceptance Checklist

- `distributionAnalysisCardPattern` is selected from the controlled values.
- `distributionAnalysisEvidenceBinding` declares sample grain, sample count, metric/unit, required bucket/density/quantile/boxplot/heatmap/geography fields, policies, tooltip payload, and detail action.
- The selected pattern has the required sample/statistical fields.
- Bucket boundaries, interval closure, missing/zero/out-of-range policy, and denominator/sample count are visible or inspectable.
- The card uses `componentType: card` and `visualType: distribution-card` when local controls, statistic strips, exact values, and one statistical evidence visual are packaged together.
- Standard standalone chart blocks may still use `visualType: bar`, `heatmap`, `boxplot`, `map`, or `scatter`; do not use `distribution-card` for a bare chart with no card-level distribution contract.
- Size family and fallback are declared before labels, stats, or plots are squeezed.
- The pattern can be reproduced from text without retaining the screenshot.
