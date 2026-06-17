# 12d8a Placement Heatmap Tooltip And States

Load this file with `12d8-placement-heatmap-matrix.md` when tooltip, empty/loading/error, no-permission, or responsive state behavior is needed.

### Tooltip

Base tooltip:

```text
row dimension and value
column dimension and value
metric name
formatted value and unit
share / rank / change when present
aggregation grain
period / source
color-scale rule
missing or zero state
anomaly / threshold reason when present
```

Correlation tooltip:

```text
metric A
metric B
correlation coefficient
relation direction
period / sample context
```

Tooltip geometry:

```text
minWidth = 160px
maxWidth = 300px
padding = 8-12px
lineGap = 4-6px
fontSize = 12px
lineHeight = 18px
offset = 8-12px
```

Tooltip flips away from right, top, and bottom viewport edges.

### States

| State | Behavior |
| --- | --- |
| Loading | Skeleton for title, filter, matrix cells, legend |
| Empty | Empty message in matrix viewport |
| Error | Error message and retry/action when available |
| No permission | Permission message in matrix viewport |
| Missing cell | Blank/neutral/hatch cell with tooltip |
| Zero cell | Lowest color as real value, not empty |
| All values equal | Single weak color plus tooltip/state note |
| Extreme values dominate | Percentile or clipped scale, with visualMap note |
| Too many rows/columns | Sample labels, scroll, aggregate, paginate, or fallback |
| Unit missing | Hide unit text but preserve subtitle geometry |
| Invalid color range | Use fallback range and show note |
