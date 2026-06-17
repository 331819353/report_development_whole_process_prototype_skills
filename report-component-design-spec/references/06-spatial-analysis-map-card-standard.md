# Spatial Analysis Map Card Standard

Use this standard when a report component answers `spatialDistribution` / 看空间 questions such as regional distribution, geographic hot areas, point coverage, outlet coverage, service radius, migration flow, origin-destination relation, regional trend change, or multi-metric geographic diagnosis.

The source images are reusable visual inspiration only. The durable standard is this text contract. Do not store the raw screenshots as the primary skill knowledge source.

## 1. Why These Cards Feel Designed

The sample set feels stronger than generic AI dashboard output because the cards are not trying to look advanced first. They make the map do a specific analytical job.

- Geography is the decision layer. The map explains where the value happens, not just that a value exists.
- The basemap is deliberately weak. Administrative boundaries, coastlines, and route backgrounds stay pale, while the real data layer owns the visual emphasis.
- Each card has one primary spatial question: distribution, heat, contrast, point density, trend, ranking, coverage, structure, or migration. The design variety comes from the question, not from decorative chart swapping.
- Exact evidence sits next to the map. KPI strips, Top lists, legends, scale bars, mini trends, or side summaries prevent the map from becoming an illustration.
- The hierarchy is asymmetric but disciplined. Many cards use a left evidence rail + right map, or map + bottom metric strip, so the eye has a clear scan path instead of a centered generic tile.
- Controls are quiet and local. A small segmented switch or dropdown changes only the current card's metric/view/range. It does not become a page-level filter pretending to be a component control.
- The color system is semantic. Sequential scales show intensity, divergent scales show increase/decrease, category colors show point status, and radius/line width show magnitude.
- Dense data is bounded. Only Top, selected, abnormal, or hovered labels stay permanent; everything else moves to tooltip, drilldown, clustering, heatmap, Top N, or detail table.
- The cards reserve real geometry for maps. Projection, aspect ratio, visualMap, legend, zoom controls, labels, and side evidence each have a budget.
- The surface language is restrained: white/light card, thin border, small radius, soft shadow, tabular numbers, muted helper text, and no glass, neon, orb, decorative gradient, or oversized glow.

This is why the result has design intent but low "AI smell": every visual flourish is accountable to data, hierarchy, or interaction.

## 2. Pattern Identity

Use a dedicated card-family field when the map is packaged with spatial evidence, controls, and exact-value paths:

```ts
type SpatialAnalysisCardPattern =
  | 'spatial-overview-map-card'
  | 'spatial-heat-distribution-card'
  | 'spatial-comparison-map-card'
  | 'spatial-point-distribution-card'
  | 'spatial-trend-change-map-card'
  | 'spatial-ranking-map-card'
  | 'spatial-kpi-map-diagnostic-card'
  | 'spatial-composite-metric-map-card'
  | 'spatial-coverage-radius-card'
  | 'spatial-flow-migration-card';
```

Recommended mapping:

```ts
componentType: 'card';
visualType: 'spatial-map-card';
analysisPerspective: 'spatialDistribution';
spatialAnalysisCardPattern: SpatialAnalysisCardPattern;
rendererOwner: 'echarts' | 'project-map-engine';
```

Use `specializedChartCardPattern: 'choropleth-ranking-map-card'` only for a standalone chart card where the map body is primary and card packaging is light. Use `kpiCardPattern: 'horizontal-spatial-map-diagnostic'` only when a KPI headline is the primary object and the map is supporting evidence inside a KPI card.

## 3. Sample Coverage Matrix

| Sample family | Durable pattern coverage | Why it is covered |
| --- | --- | --- |
| Map card layout set: distribution, heat, regional contrast, point map, trend map, ranking, KPI map, combined map | `spatial-overview-map-card`, `spatial-heat-distribution-card`, `spatial-comparison-map-card`, `spatial-point-distribution-card`, `spatial-trend-change-map-card`, `spatial-ranking-map-card`, `spatial-kpi-map-diagnostic-card`, `spatial-composite-metric-map-card` | Each card maps to one spatial question plus map evidence and a bounded evidence rail. |
| Geographic hot area set | `spatial-heat-distribution-card`, `spatial-trend-change-map-card`, `spatial-ranking-map-card`, `spatial-composite-metric-map-card` | Heat is the primary layer; ranking, comparison, layering, and time contrast are supporting spatial tasks. |
| Outlet coverage set | `spatial-point-distribution-card`, `spatial-coverage-radius-card`, `spatial-ranking-map-card`, `spatial-composite-metric-map-card`, `spatial-trend-change-map-card` | Points, coverage radius, city ranking, coverage levels, and structure all require point/region geometry plus exact evidence. |
| Migration set | `spatial-flow-migration-card`, `spatial-overview-map-card`, `spatial-trend-change-map-card`, `spatial-ranking-map-card`, `spatial-composite-metric-map-card` | Origin-destination lines, inflow/outflow, intensity, source/destination ranking, and relation summaries all use directed geography. |

`styleGeneralization.generalizationStatus` is `covered-by-composed-patterns` for the full sample universe because the cards share the same spatial container grammar and differ by controlled `spatialAnalysisCardPattern` plus map layer encoding.

## 4. Pattern Selection

| Pattern | Use when | Primary visual evidence | Required data |
| --- | --- | --- | --- |
| `spatial-overview-map-card` | The user needs a first-read spatial status overview. | Choropleth, heat layer, point layer, or flow layer plus KPI rail. | geography fields, primary metric, period, source/freshness, summary metrics. |
| `spatial-heat-distribution-card` | The task is hotspot, heat intensity, event density, demand/load concentration, or risk concentration. | Heatmap layer on muted basemap; optional intensity bands. | lon/lat or region centroid, value/count/intensity, aggregation grain, max/min scale. |
| `spatial-comparison-map-card` | Regions must be compared by target, baseline, attainment, increase/decrease, or level. | Choropleth with sequential or divergent visualMap; optional side Top list. | region code/name, value, comparison or threshold field, bin rule, direction semantics. |
| `spatial-point-distribution-card` | Exact outlets, stores, devices, users, sites, events, or terminals must be located. | Point, bubble, category marker, or clustered point layer. | object id/name, lon/lat, category/status, value, optional size metric. |
| `spatial-trend-change-map-card` | The question is where change happened over time or compared to a baseline. | Map plus mini trend, before/after map, divergent change zone, or selected period callout. | region/point, current value, baseline value, change value/rate, time grain. |
| `spatial-ranking-map-card` | Users need exact Top regions/cities/points and spatial location together. | Side Top N ranking plus map highlight. | object/region id/name, rank, value, tie-break fields, Top N policy, map key. |
| `spatial-kpi-map-diagnostic-card` | One or several headline metrics need geographic proof. | KPI rail plus map body with tooltip/detail path. | metric values, units, period, region/point layer fields, comparison/status fields. |
| `spatial-composite-metric-map-card` | Several spatial metrics share one geographic context, such as users, amount, orders, or structure. | Map with bounded marker columns/icons or side metric strip. | 2-4 metric fields, unit/precision per metric, layer encoding rule, shared geography grain. |
| `spatial-coverage-radius-card` | Coverage, service radius, network reach, accessibility, or covered population/area is primary. | Point layer plus circles/isochrones/coverage heat, optionally structure donut or summary. | point lon/lat, radius/distance/coverage area, covered object/population, overlap policy. |
| `spatial-flow-migration-card` | Origin-destination movement, migration, inflow/outflow, shipment, transfer, or commute is the actual question. | Curved flow lines, directional arrows, source/destination lists, or relation graph over geography. | origin id/name/lon/lat, destination id/name/lon/lat, flow value, direction, share/rank, period. |

## 5. Anatomy

Required slots:

- Card surface: white or near-white analytical surface, thin border, subtle shadow, inherited report radius.
- Header: title left; optional help icon; one local control group on the right.
- Spatial evidence body: one map/geo viewport with preserved projection and aspect ratio.
- Data layer: choropleth, point, bubble, heat, column symbol, coverage radius, or flow layer.
- Legend or visualMap: color scale, size scale, category legend, radius/coverage legend, or flow-width legend.
- Exact-value path: tooltip, click detail, drawer, fullscreen map, linked table, or export.
- State geometry: loading, empty, error, no-permission, stale, missing geo fields, resource error, all-zero, dense data.

Optional slots:

- Left evidence rail: headline value, comparison, source/freshness, or 2-4 summary metrics.
- Side ranking panel: Top `3-5` by default, `<=10` with scroll or detail.
- Bottom metric strip: 2-4 metrics that share the map's active geography/filter context.
- Mini trend: one small line only when trend is part of the spatial question.
- Zoom/reset/drilldown controls: only when exploration is supported.
- Footer metadata: source date, unmatched region count, missing coordinate count, map resource version.

Forbidden slots:

- Decorative map background unrelated to the data.
- More than one visible local control group in a standard card without width proof.
- Generic "smart insight" copy without metric evidence.
- All-region labels, all-point labels, or all-flow labels.
- Nested card-in-card surfaces for side metrics unless the parent template explicitly requires tile cells.
- Page/global filters duplicated inside every card.

## 6. Data Contract

Common fields:

```ts
type SpatialAnalysisCardContract = {
  analysisPerspective: 'spatialDistribution';
  spatialAnalysisCardPattern: SpatialAnalysisCardPattern;
  geographyGrain: 'country' | 'region' | 'province' | 'city' | 'district' | 'site' | 'point' | string;
  regionCodeField?: string;
  regionNameField?: string;
  longitudeField?: string;
  latitudeField?: string;
  mapResource: string;
  projectionOrFitRule: string;
  primaryMetricField: string;
  primaryMetricName: string;
  unit: string;
  periodField: string;
  sourceField?: string;
  freshnessField?: string;
  visualMapRule?: string;
  legendRule: string;
  labelRule: string;
  tooltipPayload: string[];
  exactValueRoute: string;
  rendererOwner: 'echarts' | 'project-map-engine';
  densityLimit: string;
  fallback: string;
};
```

Variant fields:

- Comparison: `baselineValueField`, `changeValueField`, `changeRateField`, `targetField`, `attainmentField`, `thresholdBandField`, `directionSemantics`.
- Ranking: `rankField`, `sortField`, `tieBreakFields`, `visibleTopN`, `viewAllRoute`.
- Point/coverage: `objectIdField`, `objectNameField`, `categoryField`, `statusField`, `sizeMetricField`, `radiusField`, `coverageAreaField`, `coveredPopulationField`, `overlapPolicy`.
- Heat: `intensityField`, `aggregationGrain`, `sampleCountField`, `maxValueField`, `missingVsZeroPolicy`.
- Flow/migration: `originIdField`, `originNameField`, `originLonField`, `originLatField`, `destinationIdField`, `destinationNameField`, `destinationLonField`, `destinationLatField`, `flowValueField`, `flowShareField`, `flowDirectionField`.
- Composite metrics: `metricFields`, `metricUnits`, `metricDisplayOrder`, `layerEncodingRule`.

## 7. Placement And Fit

Use `W`, `H`, `P`, `CW`, and `CH` from the component placement system.

Minimum size:

```text
minOuter = 460 x 320
standardOuter = 520-760 x 340-420
largeOuter = 720-1200 x 420-560
mapBodyH >= 220
mapViewportShortSide >= 180
mapAreaH >= CH * 0.55
```

Header and controls:

```text
titleAreaH = 36-52
localControlH = 24-32
localControlMaxW = min(CW * 0.45, 280)
```

- Prefer one title-right segmented control for `2-4` short options.
- Use compact dropdown when options exceed `4`, labels are long, or width fails.
- Collapse controls before adding a second row, because maps need vertical area.

Common layouts:

| Layout | Use when | Slot budget |
| --- | --- | --- |
| Left evidence rail + map | Overview, KPI diagnostic, migration overview | rail `120-220px`; map `>=55%` width. |
| Map + bottom metric strip | Point/coverage/composite metrics | strip `44-72px`; metrics `2-4`. |
| Ranking side panel + map | Spatial ranking and exact Top N | ranking `160-260px`; visible rows `3-5` default. |
| Map + in-map compact legend | Standard cards with enough empty geography | legend `72-140px`, safe corner only. |
| Two period maps | Before/after spatial comparison | each map viewport shorter side `>=150px`; use only large cards. |
| Flow map + source/destination list | Migration/transfer | flow Top `5-10` standard, Top `20` large. |

Fallback order:

1. Move footer metadata to tooltip/detail.
2. Collapse secondary metrics to tooltip or detail.
3. Collapse local control to dropdown.
4. Move legend into a safe compact corner, or outside the map when it covers important geography.
5. Hide ordinary labels and keep only Top/selected/abnormal/hover labels.
6. Aggregate points to cluster/heatmap or flows to Top N.
7. Split into full map + ranking/table, or switch to bar/table when geography no longer fits.

## 8. Visual Rules

Card shell:

- Inherit report design-system tokens. Default card radius is `6-8px`; shadow is light and stable.
- Do not use glass panels, glowing gradients, abstract map decorations, or oversized rounded cards as the style source.
- Use tabular numerals for metric rails and ranking values.
- Keep text compact: title `14-16px`, metric label `12px`, metric value `20-32px` depending on priority, helper/source text `12px`.

Map layer:

- Basemap fill is neutral and weak; data layer is stronger than the basemap.
- Boundaries use `0.5-1px`; selected/hover boundary can reach `1.5-2px`.
- Preserve projection and aspect ratio. Empty letterbox space is acceptable; stretched geography fails.
- Color scale choices:
  - Sequential: intensity, count, value, density.
  - Divergent: signed change, above/below baseline, target gap.
  - Threshold/status: business levels such as high/medium/low risk or covered/partial/uncovered.
  - Category: point types/status, visible categories `<=5`.
- Do not use rainbow colors unless bins are explicitly named and the legend is readable.

Labels:

- Permanent labels are limited to Top `3-5`, selected, hovered, abnormal, or drilldown focus.
- Region/point labels are `11-12px` with `14-16px` line height.
- All exact values must be available in tooltip/detail even when labels are hidden.

## 9. Interaction And States

Interactions:

- Hover shows identity, value, unit, period, source/freshness, active filter context, rank/share/status, and missing/estimated flags.
- Click can select a region/point/flow, open detail drawer, drill down, or sync a local detail list. The emitted payload must include stable geography/object keys.
- Zoom/reset controls appear only when pan/zoom/drilldown/exploration is supported.
- Brush/lasso is allowed only in exploration cards and must declare whether it affects only this card or a declared local component group.

States:

| State | Required behavior |
| --- | --- |
| Loading | Preserve header, evidence rail, map viewport, legend, and metric strip skeleton. |
| Empty | Keep map viewport; show a concrete empty reason such as current filter has no location data. |
| Map resource error | Preserve viewport and show map resource load failure. |
| Missing geo fields | Skip affected marks and expose missing count. |
| Region code mismatch | Use neutral/no-data fill and expose mismatch count. |
| All zero values | Show low-value scale or empty-valid state; do not fake variation. |
| Too many points | Cluster, heatmap, aggregate, sample, or require zoom/detail. |
| Too many flows | Top N plus table/detail fallback. |
| No permission | Preserve geometry and do not leak restricted totals, region names, or point silhouettes. |

## 10. Rule Strength And Failure IDs

MUST/fail:

- `RPT-SPATIAL-PATTERN-MISSING`: `spatialDistribution` component lacks `spatialAnalysisCardPattern` or equivalent controlled pattern.
- `RPT-SPATIAL-NO-GEO`: no region code, geography key, longitude/latitude, origin-destination fields, or map resource is declared.
- `RPT-SPATIAL-DATA-MISSING`: visible map color, point size, flow width, radius, ranking, or metric strip is not tied to named fields.
- `VIS-SPATIAL-MAP-STRETCHED`: map, route, radius, or point positions are scaled independently on X/Y or rendered without projection/fit proof.
- `VIS-SPATIAL-LABEL-CLUTTER`: ordinary labels are permanently shown beyond the label budget.
- `VIS-SPATIAL-LEGEND-COLLISION`: legend/visualMap/control covers important regions, dense points, routes, KPI values, or state messages.
- `VIS-SPATIAL-CARD-PILEUP`: one card mixes unrelated maps, metrics, lists, mini charts, and controls without one spatial question.
- `VIS-SPATIAL-AI-POLISH`: the card relies on generic SaaS/AI polish, decorative maps, glow, glass, gradients, or fake perfect data instead of geography-bound evidence.
- `RPT-SPATIAL-NO-EXACT-PATH`: no tooltip/detail/table/fullscreen/export path exposes exact spatial values.

SHOULD/exception-required:

- Use a side evidence rail when the map alone cannot explain the key value.
- Pair ranking with map only when exact Top objects matter.
- Use fullscreen/detail map for dense point, coverage, or migration exploration.
- Use muted basemap and restrained status colors unless the project brand requires a stronger palette.

MAY/optional:

- Mini trend, bottom metric strip, drilldown breadcrumb, zoom controls, brush, and coverage overlay when they are data-driven and fit.

## 11. Acceptance Checklist

- `analysisPerspective: spatialDistribution` is declared and geography is the actual decision dimension.
- `spatialAnalysisCardPattern` is one of the controlled values above.
- Data contract includes geography grain, map resource/projection, key fields, metric fields, unit/precision, period, source/freshness, missing-geo policy, and tooltip payload.
- The selected pattern has a named spatial question and a clear fallback.
- Map viewport meets the minimum size and preserves aspect ratio.
- Basemap is weaker than the data layer.
- Legend/visualMap/controls do not collide with important geography or labels.
- Labels are key-only and exact values are discoverable.
- Local controls are current-card scoped and do not change page/global scope unless classified as a perspective switch.
- Dense points/flows/regions use clustering, heatmap, Top N, aggregation, fullscreen, table, or drawer fallback.
- Loading, empty, error, no-permission, stale, missing geo, all-zero, too-many-points, and too-many-flows states preserve geometry.
- ECharts or the project map engine owns map marks, scales, tooltips, selection, and resize lifecycle.
- The card can be reproduced from this text contract without the original screenshots.
