# Relationship Analysis Card Patterns

Use this reference when a reusable card answers "看关系 / 看相关性 / 看关联 / 看影响因素 / 看关系网络". These cards may use scatter, heatmap, graph, Sankey, tree, line, bar, or table renderers, but the durable design standard is the relationship-analysis contract, not the visual variety.

The source screenshots are temporary visual evidence. Do not keep raw image paths as the standard. Convert the visual value into text-only pattern contracts that a downstream non-multimodal model can reproduce.

Pair with:

- `00a-style-generalization-goal.md` and `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` for screenshot-to-text generalization.
- `01-shared-foundation.md` for card surface, typography, overflow, density, exact-value disclosure, and state rules.
- `05c-echarts-specialized-and-flow.md` for scatter, heatmap, parallel, graph, Sankey, tree, and flow renderer rules.
- `09-complex-diagrams.md` and `09a-flow-hierarchy-diagram-card-patterns.md` when the selected card owns graph, tree, Sankey, path, or hierarchy evidence.
- `12d3-placement-scatter-bubble.md`, `12d8-placement-heatmap-matrix.md`, `12e5-placement-relation-network.md`, `12e6-placement-sankey.md`, `12e4-placement-tree.md`, `12c2-placement-line-trends.md`, or table placement files according to the real `visualType`.
- `10-in-component-controls.md` when the card owns a local period, dimension, metric, relation-type, depth, Top N, or threshold selector.

## Pattern Identity

Use this stable pattern field:

```ts
type RelationshipAnalysisCardPattern =
  | 'relation-overview-hub-card'
  | 'relation-strength-matrix-card'
  | 'relation-flow-sankey-card'
  | 'relation-community-network-card'
  | 'relation-pair-compare-card'
  | 'relation-trend-card'
  | 'relation-hierarchy-tree-card'
  | 'relation-bubble-quadrant-card'
  | 'relation-factor-ranking-card'
  | 'relation-evolution-snapshot-card'
  | 'relation-bipartite-attribute-card'
  | 'relation-detail-table-card';
```

Use:

```ts
analysisPerspective: 'relationshipInfluence'
relationshipAnalysisCardPattern: one of the controlled values above
componentType: 'chart' | 'table' | 'card'
visualType: real renderer family such as scatter | heatmap | graph | sankey | tree | line | bar | table
```

Recommended mapping:

| Pattern | Recommended `visualType` | Primary task |
| --- | --- | --- |
| `relation-overview-hub-card` | `graph` | Show one selected subject and its nearest related entities. |
| `relation-strength-matrix-card` | `heatmap` | Compare pairwise strength, correlation, similarity, or co-occurrence across two dimensions. |
| `relation-flow-sankey-card` | `sankey` | Show directed relation flow from sources to targets or stages. |
| `relation-community-network-card` | `graph` | Show clusters, communities, bridges, and dense relationship groups. |
| `relation-pair-compare-card` | `card` or `bar` | Compare two entities, dimensions, or relationship pairs with shared metrics. |
| `relation-trend-card` | `line` | Show how relationship strength, influence, or co-occurrence changes over time. |
| `relation-hierarchy-tree-card` | `tree` | Show hierarchical relation, ownership, lineage, or dependency levels. |
| `relation-bubble-quadrant-card` | `scatter` | Diagnose relationship between two numeric variables, with optional size/category. |
| `relation-factor-ranking-card` | `bar` or `ranking-list` | Rank factors by relationship strength, contribution, or influence score. |
| `relation-evolution-snapshot-card` | `graph` or `line` | Compare network state across ordered time snapshots. |
| `relation-bipartite-attribute-card` | `graph` or `sankey` | Show links between two entity sets, such as user-behavior-product. |
| `relation-detail-table-card` | `table` | Audit exact pair rows, coefficients, link evidence, or relationship metadata. |

Do not use this field to dress ordinary ranking, trend, composition, or process data as a relationship card. If the relationship itself is not the decision evidence, use the simpler card family.

## Why These Designs Feel Strong

These cards feel designed, and not AI-like, because the visual polish follows from the analysis job:

- One card answers one relationship question. The card is not a collage of charts; it has a named relation task such as pair strength, hub neighborhood, community, flow, factor rank, or temporal change.
- The chart grammar matches the data shape. A matrix means pairwise values, a graph means nodes and edges, Sankey means source-target-value flow, scatter means two numeric variables, a tree means parent-child structure, and a table means audit.
- The card anatomy is stable: title and local scope on top, one dominant evidence body in the middle, and a bottom evidence strip or exact-value path below. This gives every variant a shared reading rhythm.
- The bottom strip is data, not decoration. It summarizes bounded evidence such as node count, relation count, correlation, density, top factor, or net influence.
- Color is restrained and semantic. Group, status, direction, positive/negative relation, source, or cluster defines color. Random rainbow palettes, decorative gradients, and glass effects are rejected.
- Density is budgeted. Labels are sparse, ordinary values move to tooltip, dense networks use Top N/filter/search/fullscreen, and long-tail links are aggregated.
- Geometry is respected. Circles stay circular, graphs are not stretched, matrices keep readable cells, ribbons map value, and axes have enough plot height.
- Exact values remain inspectable. Hover, click detail, table fallback, drawer, fullscreen, or export exposes coefficients, pair names, weights, source, period, and method.
- The copy is concrete. Titles and subtitles name the objects, metric method, period, and scope. Generic labels such as "智能关系洞察" or "关系大图" are not enough.
- Imperfect data states are planned. Missing links, zero relationships, sparse networks, all-equal coefficients, outliers, isolated nodes, dense clusters, stale data, and no-permission are part of the spec.

## Shared Card Anatomy

Every relationship analysis card declares:

1. Card surface: inherited white or light analytical surface, small radius, thin border, restrained shadow, no nested-card look.
2. Header: title left; optional definition or method note; local period, relation type, metric, threshold, depth, or Top N selector on the right.
3. Main evidence body: exactly one dominant relationship visual or table body.
4. Encoding contract: relation subject, source entity, target entity, relation type, direction, strength/weight, metric method, time scope, and group/status fields.
5. Evidence strip: `2-4` compact facts such as sample count, relation count, average strength, strongest pair, community count, top factor, or net influence.
6. Exact-value path: tooltip plus click detail, table fallback, drawer, fullscreen, or export when the body is visual.
7. Density strategy: bounded nodes/edges/pairs/cells/points/series/rows, label budget, aggregation, sampling, collapse, search, zoom/pan, or table fallback.
8. State behavior: loading, empty, error, no-permission, missing relation fields, too dense, all-zero, all-equal, invalid method, stale period, and filtered-empty.

## Pattern Selection

| User need | Choose |
| --- | --- |
| "以某个对象为中心看它关联了谁" | `relation-overview-hub-card` |
| "哪些维度之间相关性强/弱" | `relation-strength-matrix-card` |
| "关系从哪里流向哪里" | `relation-flow-sankey-card` |
| "网络里有哪些群组/桥接点/核心节点" | `relation-community-network-card` |
| "A 和 B 的关系强度、互动、影响力谁更高" | `relation-pair-compare-card` |
| "关系强度随时间如何变化" | `relation-trend-card` |
| "上下级/归属/依赖/血缘关系是什么" | `relation-hierarchy-tree-card` |
| "两个指标之间是否相关，哪些对象落在哪个象限" | `relation-bubble-quadrant-card` |
| "哪些因素影响最大，正负方向如何" | `relation-factor-ranking-card` |
| "关系网络在几个时间点如何演化" | `relation-evolution-snapshot-card` |
| "两类实体之间如何连接，如用户-行为-商品" | `relation-bipartite-attribute-card` |
| "我要审计每一对关系的原始证据" | `relation-detail-table-card` |

## Data And Evidence Contract

Every relationship card must include `relationshipAnalysisEvidenceBinding` or equivalent metadata:

```ts
type RelationshipAnalysisEvidenceBinding = {
  relationshipAnalysisCardPattern: RelationshipAnalysisCardPattern;
  relationTask:
    | 'correlation'
    | 'association'
    | 'influence'
    | 'dependency'
    | 'cooccurrence'
    | 'similarity'
    | 'flow'
    | 'community'
    | 'hierarchy'
    | 'pair-audit';
  entityGrain: string;
  sourceEntityFields?: string[];
  targetEntityFields?: string[];
  nodeFields?: string[];
  edgeFields?: string[];
  pairFields?: string[];
  metricFields: string[];
  strengthField?: string;
  directionField?: string;
  methodField?: string;
  timeField?: string;
  groupField?: string;
  thresholdRule?: string;
  densityLimit: string;
  labelRule: string;
  tooltipFields: string[];
  exactValueRoute: string;
  localControls?: string[];
  rendererOwner: 'echarts' | 'antv-s2' | 'project-table' | 'data-driven-custom-diagram';
  fallback: string;
};
```

Method wording is mandatory:

- Use "相关/关联/共现/相似" when the card shows statistical or observed relationship.
- Use "影响/驱动" only when there is a declared attribution method, model, experiment, causal assumption, or business rule.
- If the method is only correlation, the card may say "相关性强" but must not say "导致" or "影响最大".

## Size And Density

Default desktop card sizes:

| Pattern | Minimum | Ordinary density |
| --- | ---: | --- |
| `relation-overview-hub-card` | `520x320` | nodes `<=35`, edges `<=60`, permanent labels `<=10` |
| `relation-strength-matrix-card` | `420x300` | rows `<=8`, columns `<=8`, value labels only when cells fit |
| `relation-flow-sankey-card` | `560x340` | layers `3-5`, nodes `<=35`, links `<=80` |
| `relation-community-network-card` | `560x340` | nodes `<=50`, edges `<=90`, communities `<=6` |
| `relation-pair-compare-card` | `420x260` | pair subjects `2`, facts `3-5` |
| `relation-trend-card` | `420x260` | series `<=4`, points follow line chart density |
| `relation-hierarchy-tree-card` | `560x340` | visible depth `<=4`, visible nodes `<=60` |
| `relation-bubble-quadrant-card` | `420x300` | points `12-80` default, labels `<=6` |
| `relation-factor-ranking-card` | `420x260` | factors `3-8`, Top N + other for tail |
| `relation-evolution-snapshot-card` | `560x340` | snapshots `3-5`, nodes per snapshot `<=20` |
| `relation-bipartite-attribute-card` | `560x340` | left/right nodes `<=8` each, links `<=80` |
| `relation-detail-table-card` | `420x300` | visible columns `5-8`, rows `4-8` before scroll/pagination |

If a card cannot meet its minimum:

1. Collapse footer/update note.
2. Collapse evidence strip to `<=2` facts.
3. Collapse local controls to one dropdown.
4. Hide ordinary labels and edge labels.
5. Aggregate Top N + `其他`, sample, or filter.
6. Move dense detail to drawer/table/fullscreen.
7. Split into a larger chart/table card.

Do not shrink text, warp geometry, or keep all labels to preserve the screenshot-like look.

## Visual Rules

- Card radius, border, shadow, font family, and control style inherit the report design system. Relationship cards do not create a special "AI network" skin.
- Use a quiet neutral background with one primary hue and limited semantic accent colors.
- Use color for node type, group/community, positive/negative direction, status, or source group. Do not use color to make every entity look unique.
- Keep the main evidence body visually dominant. Header, filters, legends, and bottom strip must not consume the card.
- Bottom evidence strips use neutral tiles or row cells. They must align to the card grid and should not look like nested feature cards.
- Node/link graphics use weak edges and stronger nodes. Ordinary labels are hidden until hover when density increases.
- Matrix heatmaps keep color legend visible and distinguish missing from zero.
- Scatter/quadrant cards keep reference lines weak and data-driven; quadrant labels are secondary.
- Sankey/link cards map width to value and aggregate tails. Ribbons are not decorative gradients.
- Trend cards reserve real axis/legend space and pass line-chart squeeze gates.
- Tables use scan-friendly alignment: text left, numeric values right, trend/direction icon separate from value.

## Interaction Rules

- Hover reveals exact node, edge, pair, cell, point, or factor value without moving layout.
- Click pins the selected entity/pair/path and opens a detail drawer, table, or fullscreen when exact evidence matters.
- Graph cards include pan/zoom, fit/reset, and optional search when node count is high.
- Matrix cards support row/column hover highlight and selected-cell detail.
- Scatter cards support selected point, optional brush/zoom, and tooltip with all axis/size/category values.
- Local controls affect only the current card or a declared local group. Relation type, metric method, threshold, depth, Top N, and period are valid local controls; page/global filters and permission scope are not.

## Anti-AI Gate

Reject or keep readiness `partial` when any of these appear:

- The card is selected because it looks advanced, not because the data has a relationship task.
- `relationshipAnalysisCardPattern` is missing for a `relationshipInfluence` component.
- Required fields are missing: pair fields for matrix/correlation, node-edge fields for graph, source-target-value for Sankey, parent-child for tree, two numeric fields for scatter, ordered time for trend, or row identifiers for table audit.
- The card claims influence or causality with only correlation/co-occurrence data.
- Colors, sizes, line widths, ribbons, or matrix cells are not tied to named fields.
- The card has no method note, threshold rule, density limit, tooltip payload, or exact-value route.
- Dense networks, matrices, tables, points, or factors render everything at once without aggregation, search, scroll, pagination, drawer, or fullscreen.
- Bottom strips contain decorative facts that cannot be computed from declared fields.
- The style relies on raw screenshot paths, generic blue-purple glass polish, gradients, oversized shadows, or abstract icons.

Use failure IDs:

- `RPT-RELATION-PATTERN-MISSING`
- `RPT-RELATION-DATA-MISSING`
- `RPT-RELATION-CAUSALITY-UNPROVEN`
- `VIS-RELATION-DENSITY-UNBOUNDED`
- `VIS-RELATION-EVIDENCE-STRIP-DECORATIVE`
- `VIS-RELATION-AI-POLISH`

## Acceptance Checklist

- `analysisPerspective: relationshipInfluence` is set when the user asks 看关系, 相关性, 关联, or 影响因素.
- `relationshipAnalysisCardPattern` is one of the controlled values in this file.
- `visualType` remains the real renderer family and its matching chart/table/placement reference is applied.
- Required entity, pair, node, edge, source-target, hierarchy, time, or metric fields are declared.
- Method wording distinguishes correlation, association, influence, dependency, similarity, co-occurrence, flow, and hierarchy.
- Density, label, color, size, direction, tooltip, detail, and fallback rules are explicit.
- Renderer ownership and resize behavior are documented for ECharts/S2/custom diagrams.
- The card includes exact-value access and default/filtered/empty/error/no-permission/dense states.
- The card can be regenerated from text contracts without keeping the source screenshot.
