# 12e4a Placement Tree Tooltip And States

Load this file with `12e4-placement-tree.md` when tooltip, empty/loading/error, no-permission, or responsive state behavior is needed.

### Tooltip

Tooltip payload:

- Node name.
- Level/depth.
- Parent node.
- Child count.
- Leaf/collapsed state when useful.
- Metric value, unit, share of parent when useful.
- Status/anomaly reason.
- Owner/person if allowed and relevant.
- Period/source/update time.
- Aggregation rule for `其他`/`+N`.

Tooltip geometry:

```text
minWidth = 180px
maxWidth = 320px
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
| Loading | Skeleton for title, filter, nodes, and connectors |
| Empty | `暂无层级数据` in tree viewport |
| Error | `数据获取失败` plus retry/action when available |
| No permission | Permission message in tree viewport |
| Missing root | `缺少根节点`; do not draw orphan tree |
| Empty children | Hide expand control |
| Child loading | Loading indicator at expand control |
| Too many nodes | Default collapsed state plus search/list fallback |
| Too many levels | Limit visible depth; offer tree list/search |
| Branch too dense | Show Top N and `+N`/`其他` |
| Circular reference | Stop traversal and surface data defect |
| Multiple parent conflict | Treat as data defect or switch to relation graph |
| Long node name | Ellipsis/abbreviation with tooltip |
| Search no result | `未找到节点` |
| Aggregated children | Show `+N`/`其他` with detail tooltip |
