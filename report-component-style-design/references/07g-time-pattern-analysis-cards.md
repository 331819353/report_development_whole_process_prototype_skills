# Time Pattern Analysis Card Patterns

Use this reference when a report component answers `analysisPerspective: timePattern`: calendar rhythm, period cycle, time-slot distribution, weekday-hour heat, cumulative progress, peak-valley diagnosis, or time forecast warning.

This file turns visual samples such as calendar cards, cycle KPI cards, hour-distribution cards, and peak-valley cards into text-only reusable contracts. Do not keep raw screenshots as the durable standard.

## Why These Designs Feel Strong

These card families feel designed, and avoid generic AI flavor, because they have temporal grammar before visual polish:

- The visual form matches the time question. Calendar grids answer date rhythm, cycle cards answer period status, hour lines answer intraday movement, heatmaps answer two-dimensional time intensity, and peak-valley cards answer threshold/extreme moments.
- Each card has one first-read decision. A card may show side evidence or a footer strip, but it does not mix calendar, line, donut, gauge, and table just to look rich.
- The hierarchy is calm: title and local time control sit in a small header, the temporal evidence owns the center, and exact facts live in side panels, footers, or tooltips.
- The selected time is visible. Active date, current period, peak point, low point, forecast start, or selected cell is marked as state, not decoration.
- Color carries data semantics. Blue is usually primary/current, green often means completed/low/good, red/orange means warning/peak/risk, purple is secondary category, and neutral gray separates missing or inactive time.
- Small multiples are bounded. Calendar days, hour bins, week lines, and summary cells stay count-limited, with tooltip/detail for exact values.
- Realistic temporal variation is preserved. Slight noise, plateaus, dips, missing dates, holidays, and uneven peaks read more credible than perfectly smooth all-up mock data.
- Control ownership is clear. `日 / 周 / 月 / 季 / 年` and `近7天 / 近4周` switches change only the current card unless explicitly declared as a perspective switch.
- The card exposes evidence. Source/freshness, tooltip payload, detail route, and exact period values prevent the chart from becoming a pretty illustration.
- The style is UI-kit restrained: white/light surfaces, thin dividers, subtle shadows, compact controls, small-radius cards, no glass/glow/orb/AI illustration layer.

## Pattern Identity

Use these stable pattern names:

```ts
type TimePatternCardPattern =
  | 'calendar-rhythm-overview-card'
  | 'calendar-schedule-lane-card'
  | 'period-cycle-summary-card'
  | 'period-progress-status-card'
  | 'time-slot-trend-card'
  | 'time-slot-share-card'
  | 'weekday-hour-heatmap-card'
  | 'cumulative-time-curve-card'
  | 'period-comparison-overlay-card'
  | 'peak-valley-diagnostic-card'
  | 'peak-valley-warning-forecast-card';
```

Use:

```ts
analysisPerspective: 'timePattern'
timePatternCardPattern: TimePatternCardPattern
componentType: 'card' | 'chart'
visualType: 'metric-card' | 'line' | 'bar' | 'heatmap' | 'pie' | 'gauge' | 'other'
```

Recommended mapping:

| `timePatternCardPattern` | Primary question | Preferred evidence |
| --- | --- | --- |
| `calendar-rhythm-overview-card` | Which dates are active, overloaded, completed, abnormal, or selected? | Month calendar grid plus side detail or summary |
| `calendar-schedule-lane-card` | How do project/event periods occupy the calendar? | Month grid with lane bars, event agenda, or side list |
| `period-cycle-summary-card` | How is this metric behaving inside day/week/month/quarter/year? | KPI value plus compact line/bar/donut/progress evidence |
| `period-progress-status-card` | How far has the period/task/project progressed? | Ring/progress/gauge/status calendar plus count summary |
| `time-slot-trend-card` | Which hour/time slot is high or low? | 24h line/bar with peak/low callouts and footer facts |
| `time-slot-share-card` | What share belongs to morning/noon/evening/night or custom time bands? | Donut/stacked share with band legend and exact values |
| `weekday-hour-heatmap-card` | Which weekday-hour cells are hot or cold? | Heatmap with ordered weekdays, hours, and visualMap |
| `cumulative-time-curve-card` | How much has accumulated across the day/period? | Cumulative line/area, latest label, comparison to target/baseline |
| `period-comparison-overlay-card` | How do this period and previous periods differ by time slot? | Multi-line or grouped bar comparison on same time grain |
| `peak-valley-diagnostic-card` | Where are peak and valley, and how large is the spread? | Line/lollipop/gauge with peak/valley markers and difference strip |
| `peak-valley-warning-forecast-card` | Will the upcoming time slot cross warning thresholds? | Actual solid line, forecast dashed line/band, warning banner |

## Sample-Derived Coverage

The sample universe maps as follows:

| Sample family | Durable pattern mapping | Generalization status |
| --- | --- | --- |
| Month calendars with selected date and right-side details | `calendar-rhythm-overview-card`, optionally composed with `listStatusPattern` for agenda rows | `covered-by-composed-patterns` |
| Multi-project calendar bars and event timelines | `calendar-schedule-lane-card`, optionally composed with `listStatusPattern: event-timeline` | `covered-by-composed-patterns` |
| Sales/traffic/income/user/task/cost/inventory/project cycle cards | `period-cycle-summary-card` or `period-progress-status-card`, composed with `kpiTimeSeriesCardPattern`, `basicChartCardPattern`, `specializedChartCardPattern`, or progress KPI patterns as needed | `covered-by-composed-patterns` |
| Hour distribution line/bar/donut/heatmap/cumulative cards | `time-slot-trend-card`, `time-slot-share-card`, `weekday-hour-heatmap-card`, `cumulative-time-curve-card` | `covered-by-composed-patterns` |
| Peak-valley line, lollipop, gauge, trend, and warning cards | `peak-valley-diagnostic-card` or `peak-valley-warning-forecast-card`, composed with line/gauge/heatmap rules | `covered-by-composed-patterns` |

## Pattern Selection

| User wording or data shape | Choose |
| --- | --- |
| 日历, 日期分布, 哪些天活跃, 任务/排班/打卡按日期 | `calendar-rhythm-overview-card` |
| 项目跨天、事件区间、排期、甘特-like but compact | `calendar-schedule-lane-card` |
| 日/周/月/季/年周期, 本周期表现, 周期卡 | `period-cycle-summary-card` |
| 完成率、进度、任务状态、打卡率、周期内达成状态 | `period-progress-status-card` |
| 00:00-24:00, 峰值时段, 低谷时段, 时段分布趋势 | `time-slot-trend-card` |
| 时段占比, 各时间段贡献占比, 早中晚夜结构 | `time-slot-share-card` |
| 星期几 x 小时, 近7天 x 24小时, 周内热力 | `weekday-hour-heatmap-card` |
| 当日累计、截至当前、逐小时累积、周期累计 | `cumulative-time-curve-card` |
| 本周 vs 上周, 第1周到第4周, 多周期同时间粒度对比 | `period-comparison-overlay-card` |
| 峰谷差、峰值、谷值、峰谷强度、波动率 | `peak-valley-diagnostic-card` |
| 峰值预警、未来时段预测、阈值风险 | `peak-valley-warning-forecast-card` |

If the question is only "过去怎么变" without seasonality, slot, calendar, or peak-valley logic, route to `kpiTimeSeriesCardPattern` or a standard line chart instead of `timePatternCardPattern`.

## Shared Anatomy

Every time pattern card should declare:

1. Header: title left; optional index/help; one local period/grain/range control right.
2. Time context: selected period, comparison period, timezone/business calendar, and aggregation grain.
3. Primary temporal evidence: calendar grid, time-series line/bar, heatmap matrix, donut/share, gauge/progress, or forecast band.
4. Evidence facts: `2-4` visible facts such as peak, valley, spread, average, completed count, active days, forecast value, or anomaly cell count.
5. Exact-value path: tooltip for every date/time cell/point, selected side panel, detail drawer, or table fallback.
6. Footer metadata: source, freshness, aggregation, missing/zero rule, or data-delay state.
7. States: loading, empty, all-zero, missing periods, no-permission, stale data, dense data, and timezone/calendar mismatch.

Forbidden slots:

- Decorative icon clusters, unrelated illustrations, glass/glow backgrounds, or extra charts that do not answer the time question.
- Multiple independent local controls that change metric set, period, and dimension at once in a small card.
- A calendar grid with fake dates but no `dateField`, or a peak/valley badge with no calculable peak/valley fields.

## Data Contract

Base fields:

```ts
type TimePatternEvidenceBinding = {
  pattern: TimePatternCardPattern;
  datasetId: string;
  calendarSystem?: 'gregorian' | 'fiscal' | 'retail-445' | 'project-defined';
  timezone?: string;
  periodStartField: string;
  periodEndField?: string;
  grain: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
  metricId: string;
  metricName: string;
  valueField: string;
  unit: string;
  aggregation: 'sum' | 'count' | 'avg' | 'max' | 'min' | 'rate' | 'custom';
  numericFormatContractId: string;
  tooltipPayload: string[];
  exactValueRoute?: string;
  sourceDataset?: string;
  freshnessField?: string;
  missingValuePolicy: string;
  zeroValuePolicy: string;
};
```

Pattern-specific fields:

| Pattern group | Required extra fields |
| --- | --- |
| Calendar cards | `dateField`, `weekdayField`, `monthField`, `cellStatusField`, optional `selectedDateField`, `eventCountField`, `completionRateField`, `holidayFlagField` |
| Schedule lane cards | `eventIdField`, `eventNameField`, `startDateTimeField`, `endDateTimeField`, `laneField`, `statusField`, optional `ownerField`, `overlapGroupField` |
| Period cycle cards | `periodField`, `periodLabelField`, `currentValueField`, optional `baselineValueField`, `deltaField`, `targetField`, `attainmentRateField` |
| Time slot trend cards | `timeSlotField`, `slotOrderField`, `valueField`, optional `baselineValueField`, `peakFlagField`, `valleyFlagField` |
| Heatmap cards | `rowTimeField`, `columnTimeField`, `valueField`, `sampleCountField`, optional `missingFlagField`, `hotspotFlagField` |
| Cumulative cards | `timeSlotField`, `cumulativeValueField`, optional `targetCumulativeField`, `expectedCurveField` |
| Comparison overlay cards | `seriesNameField`, `seriesRoleField`, `timeSlotField`, `valueField`, `baselineTypeField` |
| Peak-valley cards | `peakValueField`, `peakTimeField`, `valleyValueField`, `valleyTimeField`, `spreadField`, optional `spreadRateField`, `thresholdField`, `volatilityField` |
| Forecast warning cards | `forecastValueField`, `forecastTimeField`, `forecastStartField`, optional `lowerBoundField`, `upperBoundField`, `warningStatusField`, `thresholdField` |

## Size And Placement

Default desktop sizes:

| Pattern | Minimum | Standard | Notes |
| --- | ---: | ---: | --- |
| Calendar rhythm overview | `420x300` | `480-720 x 320-420` | Calendar grid plus side panel requires side panel `120-200px` or bottom collapse |
| Calendar schedule lane | `520x300` | `640-960 x 320-460` | Lane bars need row height `>=22px` and visible lanes `<=6` |
| Period cycle summary | `360x240` | `400-560 x 260-360` | One KPI plus one compact evidence visual |
| Period progress status | `360x240` | `400-560 x 260-360` | Ring/gauge/progress body must preserve shape |
| Time slot trend | `420x260` | `480-760 x 300-380` | Axis chart body `>=180px`; plot height `>=120px` |
| Time slot share | `360x260` | `420-640 x 280-360` | Donut/share legend and center value must fit |
| Weekday-hour heatmap | `420x300` | `560-900 x 320-420` | Cell min `12px`; missing cells distinct from zero |
| Cumulative curve | `420x260` | `480-760 x 300-380` | Latest/cumulative label and target/reference need reserved space |
| Period comparison overlay | `480x300` | `560-900 x 320-420` | Visible series normally `2-4`, max `5` before selector |
| Peak-valley diagnostic | `420x260` | `480-760 x 300-400` | Peak/valley labels count as annotations and must not overlap |
| Peak-valley forecast warning | `480x300` | `560-900 x 340-460` | Forecast region and warning banner require extra height |

Slot budget:

```text
P = clamp(16px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P

headerH = 36-48px
contextH = 0-24px
factStripH = 44-72px
footerH = 0-24px
mainEvidenceH = H - 2P - headerH - contextH - factStripH - footerH - gaps
mainEvidenceH >= CH * 0.45
```

For calendar plus side panel:

```text
sidePanelW = clamp(120px, CW * 0.28, 220px)
calendarW = CW - sidePanelW - 16px
cellGap = 4-8px
cellH >= 28px
```

If `calendarW < 280px`, move side panel below the calendar or replace it with selected-date summary plus drawer/detail.

For hour trend and peak-valley charts, use the line/bar placement rules from `12c2-placement-line-trends.md` and `05a-echarts-foundation-bars-lines.md`. For weekday-hour heatmaps, use `12d8-placement-heatmap-matrix.md`. For donut/share cards, use `12c4-placement-pie-donut.md`. For progress/gauge cards, use `12d2-placement-gauge.md`.

## Component-Local Controls

Suitable local controls:

- Time grain: `日 / 周 / 月`, `月 / 季 / 年`.
- Time range: `近7天 / 近4周 / 本月`, `本周 / 上周`.
- Metric view: `数量 / 金额 / 占比`, `实际 / 完成率`.
- Display mode: `日历 / 趋势`, `图表 / 明细` only when both modes are valid for the same component schema.

Control rules:

- Use a title-right capsule for `2-4` short values when it fits.
- Collapse to compact dropdown when options exceed `4`, labels are long, or `filterW > min(CW * 0.45, 280px)`.
- A control that changes the component family or metric set is a `perspective-switch`, not a quiet local filter.
- A visible control with no data effect is `RPT-TIME-CONTROL-NO-EFFECT`.

## Visual Rules

- Use white or very light surfaces with subtle border/shadow inherited from the report design system. Inner evidence cells may use soft tints but must not look like nested cards.
- Keep card radius at or below the report system default, usually `8px`.
- Calendar inactive dates are muted; selected dates use one strong brand fill or outline; today uses a separate subtle state if both today and selected are visible.
- Peak and warning colors must be semantic. Do not color peak red unless the metric definition makes high bad or warning-like.
- Missing values must look different from zero values in calendar and heatmap cells.
- Permanent labels are limited to selected/current, peak, valley, latest, forecast start, or key anomaly. Other values move to tooltip.
- Footer update/source text is weak but readable; it should not compete with the temporal evidence.

## Interaction

- Hover/focus tooltip shows period, value, unit, metric definition, active controls, comparison/baseline, sample count, missing/estimated flag, source, and freshness.
- Click on date/cell/point emits a stable payload with period start/end, grain, metric id, value, active filters, and permission state.
- Selected date/time state updates side panel, detail drawer, or row highlight without changing card size.
- Dense calendar or heatmap cards provide fullscreen, drawer, table fallback, or range aggregation before squeezing labels.
- Keyboard focus should reach selectable cells/points through a list/table equivalent or accessible chart wrapper when the native chart marks are not tabbable.

## Anti-AI Gate

Reject or keep readiness `partial` when:

- The card is selected because it looks modern, not because the business question is about calendar rhythm, cycle, time slot, heat, cumulative progress, peak-valley, or forecast risk.
- `timePatternCardPattern` is missing for `analysisPerspective: timePattern` implementation-ready cards.
- Date/hour/week/month fields are missing or unordered.
- Calendar cells, heatmap cells, peak/valley marks, progress rings, or forecast bands are hand-drawn without a data contract.
- The card has a visible time control but no data/filter binding.
- Peak/valley wording appears without peak, valley, spread, and selected period fields.
- Forecast/warning wording appears without forecast horizon, threshold/status, and uncertainty or status evidence.
- The design uses generic gradient/glass/glow, oversized shadows, decorative icons, or perfect all-up synthetic data to fake polish.
- Exact values, missing values, zero values, source, or freshness are hidden with no tooltip/detail path.

Failure IDs:

- `RPT-TIME-PATTERN-DATA-MISSING`: required time grain/date/slot fields are absent.
- `RPT-CALENDAR-GRAIN-MISSING`: calendar view lacks date/month/weekday or business-calendar rules.
- `RPT-TIME-CONTROL-NO-EFFECT`: visible period/grain control does not affect data or schema.
- `RPT-PEAK-VALLEY-EVIDENCE-MISSING`: peak/valley/spread fields or formula are missing.
- `RPT-TIME-FORECAST-EVIDENCE-MISSING`: forecast horizon/threshold/status/uncertainty fields are missing.
- `VIS-TIME-CARD-OVERPACKED`: too many temporal questions, controls, labels, or facts compete in one card.
- `VIS-TIME-HEATMAP-DENSITY-UNBOUNDED`: row/column/cell density exceeds declared budget without aggregation or detail.
- `RPT-TIME-TOO-CLEAN-DATA`: mock data is unrealistically smooth, complete, or all-good when used as evidence.

## Acceptance Checklist

- `analysisPerspective: timePattern` is declared.
- `timePatternCardPattern` is one of the controlled values in this file.
- `styleGeneralization` maps reusable visual samples to this pattern or a composed pattern with `textOnlyReproduction: true`.
- Time grain, period, calendar/timezone or business calendar, metric, unit, aggregation, source, and freshness are declared.
- Pattern-specific fields are present for calendar, schedule, time slot, heatmap, cumulative, comparison, peak-valley, or forecast.
- Local controls are scoped and classified as `local-filter` or `perspective-switch` with schema impact.
- The main temporal evidence passes its chart/geometry placement reference: line/bar, heatmap, donut, gauge, or calendar grid.
- Display budget covers visible dates/cells/series/annotations/facts and names an overflow strategy.
- Tooltip/detail exposes exact values, missing/zero status, denominator/sample count when relevant, baseline/comparison, source, and freshness.
- Loading, empty, all-zero, missing-period, dense-data, no-permission, stale, and timezone/calendar mismatch states preserve geometry.
