# 12e5a Placement Relation Density Tooltip And States

Load this file with `12e5-placement-relation-network.md` when density control, tooltip, empty/loading/error, no-permission, or responsive state behavior is needed.

### Density Control

Node count:

| Nodes | Behavior |
| ---: | --- |
| `N <= 30` | Full graph may show |
| `31-80` | Hide ordinary labels; keep core/anomaly labels |
| `81-150` | Aggregate low-weight nodes and preserve key edges |
| `151-300` | Must filter, aggregate, or layered-load |
| `>300` | Do not show full graph by default |

Edge count:

| Edges | Behavior |
| ---: | --- |
| `E <= 50` | Full edges may show |
| `51-150` | Weaken ordinary edges; hide edge labels |
| `151-300` | Show key edges or selected neighborhoods |
| `>300` | Aggregate, filter, or local exploration |

Default filtering:

- Top N relationship weight.
- Direct/two-hop scope.
- Hide low-weight edges.
- Hide isolated nodes.
- Preserve anomaly nodes.

Aggregation:

- Merge same-type nodes.
- Merge same-group nodes.
- Low-weight nodes become `其他`.
- Aggregated node shows count and can expand or open detail.

### Tooltip

Node tooltip:

```text
node name
node type
relation count / degree
key metric
status / risk
latest relation time
period / source
```

Edge tooltip:

```text
relationship type
source node
target node
direction
count / weight / amount
start time or latest time
status
period / source
```

Group tooltip:

```text
group name
node count
edge count
core node
anomaly count
```

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
| Loading | Skeleton for title, filter, node/edge placeholders |
| Empty | `暂无关系数据` in graph viewport |
| Error | `数据获取失败` plus retry/action when available |
| No permission | Permission message in graph viewport |
| Missing node | Do not draw affected node/edge; expose count/detail |
| Missing relationship | Show nodes with `暂无连接关系` |
| Too many nodes | Show aggregation/filter/local-explore state |
| Isolated nodes | Hide by default or place weakly at edge |
| Circular relation | Use curves or directional highlight |
| Self-link | Small loop when meaningful |
| Layout failure | Fallback circular/radial layout |
| Search no result | `未找到节点` |
| Aggregated nodes | Show count and expand/detail affordance |
