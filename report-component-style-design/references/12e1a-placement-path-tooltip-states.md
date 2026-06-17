# 12e1a Placement Path Tooltip And States

Load this file with `12e1-placement-path-journey.md` when tooltip, empty/loading/error, no-permission, or responsive state behavior is needed.

### Tooltip

Node tooltip includes:

- Node name.
- Node value.
- Share of total.
- Inbound path count.
- Outbound path count.
- Conversion/drop-off metrics.
- Period/source.

Link tooltip includes:

- Source and target.
- Transition value.
- Conversion rate.
- Drop-off rate.
- Average dwell/time when present.
- Change when present.
- Period/source.
- Aggregation rule when link includes `其他`.

Tooltip geometry:

```text
minW = 180px
maxW = 320px
padding = 8-12px
rowGap = 4-6px
fontSize = 12px
lineHeight = 18px
```

Auto-flip near right/top/bottom edges.

### States

| State | Behavior |
| --- | --- |
| Loading | Skeleton for title, filter, nodes, and links |
| Empty | Show "暂无路径数据" in path area |
| Error | Show "数据获取失败" |
| No permission | Show scoped permission state |
| Missing start | Show "缺少起点数据" |
| Missing end | Show known path and end as "未知" |
| Too many paths | Show Top N and aggregate rest |
| Too many nodes | Merge low-weight nodes |
| Zero-value path | Do not draw the path |
| Conversion unavailable | Show `--` |
| Change unavailable | Show `--` |
| Isolated node | Hide or weaken by default |
| Circular path | Use loop line, but do not expand many loops by default |
