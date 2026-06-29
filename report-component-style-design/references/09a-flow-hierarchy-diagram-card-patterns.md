# Flow And Hierarchy Diagram Card Patterns

Use this reference when screenshots or requirements show reusable card-level patterns for flow, hierarchy, relationship, conversion, and path diagrams: funnel, Sankey, journey stage map, hierarchy tree, hub relation network, sunburst, treemap, and path conversion flow. The source images are temporary visual evidence; the durable standard is this text contract.

Pair with:

- `09-complex-diagrams.md` for viewport, node, edge, label, and aspect-safety rules.
- `05c-echarts-specialized-and-flow.md` for ECharts funnel, Sankey, path, tree, graph, sunburst, and treemap rules.
- `12e-placement-flow-hierarchy-charts.md` and exact `12e1`-`12e7` placement files when implementation-ready geometry is required.
- `10-in-component-controls.md` when the card owns a local period, metric, stage, depth, Top N, or scope selector.
- `$artifact-readability-standard` `references/visual-source-abstraction-standard.md` when converting visual samples into text-only contracts.

## Pattern Identity

Use these stable pattern names:

```ts
type FlowHierarchyDiagramCardPattern =
  | 'conversion-funnel-card'
  | 'multi-stage-sankey-card'
  | 'journey-stage-map-card'
  | 'hierarchy-tree-card'
  | 'hub-relation-network-card'
  | 'sunburst-composition-card'
  | 'treemap-composition-card'
  | 'path-conversion-flow-card';
```

Use:

```ts
componentType: chart
visualType: funnel | sankey | path | tree | graph | sunburst | treemap
flowHierarchyDiagramCardPattern: one of the controlled values above
```

Recommended chart mapping:

| Pattern | Recommended `visualType` | Primary task |
| --- | --- | --- |
| `conversion-funnel-card` | `funnel` | Read ordered stage conversion, drop, and total retention. |
| `multi-stage-sankey-card` | `sankey` | Trace value/user/object flow across multiple sources, stages, and outcomes. |
| `journey-stage-map-card` | `path` | Explain a user/business journey through stages, behaviors, touchpoints, emotion, and opportunities. |
| `hierarchy-tree-card` | `tree` | Show parent-child structure, organization, product modules, ownership, lineage, or decomposition. |
| `hub-relation-network-card` | `graph` | Show one central object and its surrounding entities, groups, channels, users, or dependencies. |
| `sunburst-composition-card` | `sunburst` | Show hierarchy path plus part-to-whole composition through radial rings. |
| `treemap-composition-card` | `treemap` | Show hierarchy composition and scale/share through rectangle area. |
| `path-conversion-flow-card` | `path` | Show start-to-end path branches, edge ratios, and terminal success/loss outcomes. |

Do not use these patterns to add visual complexity. They are valid only when flow, hierarchy, relationship, or ordered path is the decision evidence. Use bar, line, pie/donut, table, or ordinary list patterns when the question is simple ranking, time trend, small composition, or exact row audit.

Process, step, node, and bottleneck cards use `report-component-design-spec` `references/04-process-bottleneck-analysis-card-standard.md` as the component-family contract. They may reuse this file's `flowHierarchyDiagramCardPattern` values only for the actual diagram body, such as funnel, path, tree, graph, or Sankey. Do not create near-synonym flow-hierarchy values for stepper, node, or bottleneck variants; set `processAnalysisCardPattern` instead.

## Why These Designs Feel Strong

- The diagram form matches the data relationship. Funnel means ordered retention, Sankey means source-target flow, journey map means staged experience, tree means parent-child, graph means many-to-many relation, sunburst/treemap mean hierarchy composition, and path means directed movement.
- The visual grammar is controlled: nodes, links, stages, rings, rectangles, and arrows all encode named fields instead of ornamental shapes.
- The card keeps a readable scan path. Left-to-right or top-to-bottom ordering, reserved labels, side values, and clear terminal states make the story obvious.
- Exact values are not hidden inside the picture. Stage values, conversion rates, link tooltips, node details, legends, and side tables support audit.
- Density has a budget. Long tails are aggregated, deep levels collapse, dense networks move to fullscreen/search/table, and tiny labels become tooltip-only.
- Color semantics are stable. Source groups, status, category, success/loss, or parent hierarchy define colors; random rainbow styling is rejected.
- Geometry is preserved. Flows, trees, radial rings, rectangles, and network edges are not stretched to fill a card.
- The component feels designed because title, subtitle, diagram body, legend, control, and detail path each have a distinct role.

## Pattern Selection

| User need | Choose |
| --- | --- |
| Ordered process stages with value shrinking, conversion, drop, or retention | `conversion-funnel-card` |
| Many-to-many distribution from sources to intermediate stages to outcomes | `multi-stage-sankey-card` |
| User/customer/business journey with stage columns and row-level evidence such as goals, actions, touchpoints, emotions, and opportunities | `journey-stage-map-card` |
| Clear parent-child structure, org chart, category tree, product module tree, permission tree, or lineage tree | `hierarchy-tree-card` |
| One central object with surrounding entity clusters and relationship edges | `hub-relation-network-card` |
| Hierarchy path and composition share are equally important, and radial reading fits the viewport | `sunburst-composition-card` |
| Hierarchical contribution and relative area comparison are primary | `treemap-composition-card` |
| Directed path from start through branches to success/loss/end states, with edge ratios or counts | `path-conversion-flow-card` |

## Shared Card Anatomy

Every flow or hierarchy diagram card should declare:

1. Card surface: quiet white/light surface, inherited border/radius/shadow, and no decorative background that competes with nodes or links.
2. Header: title left; optional description, unit, local scope, period, metric, depth, or Top N selector.
3. Diagram viewport: one measured body area with clipping, zoom/pan or fullscreen when dense, and aspect-safe geometry.
4. Node/link encoding: node type, link value, direction, status, group, hierarchy level, or path order.
5. Evidence surface: value labels, side labels, stage percentages, legend, tooltip, detail drawer, table, or side summary.
6. Density strategy: stage count, node count, link count, depth, visible labels, Top N, aggregation, collapse, search, and fullscreen fallback.
7. State behavior: loading, empty, error, no-permission, missing node/link, too dense, all-zero, invalid hierarchy, circular reference, and stale selection.

## Size And Placement

Default desktop sizes:

| Pattern | Size rule |
| --- | --- |
| `conversion-funnel-card` | Width `560-1000px`; height `220-340px`; stages `3-7` preferred; left stage labels `64-120px`; right values `80-160px`. |
| `multi-stage-sankey-card` | Width `760-1280px`; height `260-420px`; nodes `<=35` ordinary; links `<=80`; layer count `3-5`. |
| `journey-stage-map-card` | Width `720-1280px`; height `240-380px`; stages `4-8`; evidence rows `4-6`; emotion curve optional and secondary. |
| `hierarchy-tree-card` | Width `720-1280px`; height `260-420px`; visible nodes `<=60`; depth `<=4` ordinary; more requires collapse/search/fullscreen. |
| `hub-relation-network-card` | Width `720-1280px`; height `260-420px`; nodes `<=50`; edges `<=90`; permanent labels `<=12`. |
| `sunburst-composition-card` | Width `560-1000px`; height `260-420px`; visible levels `2-3`; total visible nodes `<=50`; side legend/table optional. |
| `treemap-composition-card` | Width `640-1200px`; height `240-360px`; leaves `<=30` ordinary; Top N + other for long tail. |
| `path-conversion-flow-card` | Width `720-1280px`; height `240-380px`; nodes `<=20`; links `<=35`; terminal states visible. |

Mobile fallback:

- Use stacked summary plus detail drawer for Sankey, graph, and dense tree when width is under `520px`.
- Collapse journey evidence rows into tabs or accordion rows; keep stage order visible.
- Replace sunburst/treemap labels with tooltip-only labels when sectors/rectangles fall below label thresholds.
- Offer fullscreen for any diagram that cannot preserve geometry in the card body.

## Pattern Rules

### Conversion Funnel Card

Use for ordered stages with a shared population or documented cohort.

Rules:

- Stage order is mandatory and must not be inferred from visual order alone.
- Show stage label, value, and entry share or step conversion. Loss/drop can be tooltip-only unless it is the main finding.
- Use one business hue or a restrained progression. Avoid rainbow funnels.
- Traditional trapezoid funnels are allowed only for few stages and storytelling contexts. Horizontal bar funnels are better for report cards.

Required fields:

- `stage_id`, `stage_name`, `stage_order`, `value`, `unit`, `entry_value`, `period`.
- Optional: `step_conversion_rate`, `entry_rate`, `drop_value`, `drop_rate`, `target_value`, `comparison_value`, `cohort_rule`.

### Multi-Stage Sankey Card

Use for value, user, order, traffic, cost, or object flow from source to target across layers.

Rules:

- Links must have `source`, `target`, and non-negative `value`.
- Layer order and node grouping must be declared; do not rely on automatic layout alone for business order.
- Flow width maps to value, and link color explains source, status, outcome, or loss.
- Long tails aggregate to `other`; unbalanced flow surfaces as loss, unknown, or other instead of disappearing.

Required fields:

- Node rows: `node_id`, `node_name`, `layer`, `node_type`.
- Link rows: `source_id`, `target_id`, `value`, `unit`, `period`.
- Optional: `source_share`, `target_share`, `total_share`, `loss_flag`, `status`, `group_id`, `aggregation_rule`.

### Journey Stage Map Card

Use for structured journey explanation rather than numeric ranking.

Rules:

- Stage columns must be ordered and named. Each row describes a different evidence type, such as goal, behavior, touchpoint, emotion, or opportunity.
- Stage header uses arrows or connected tabs only when the journey is sequential.
- Emotion curves are secondary and must be tied to a score or qualitative state; do not add smile icons without data or source notes.
- Opportunity/action chips should be short, concrete, and tied to each stage.
- If exact metrics dominate, use path/funnel/table instead of a journey map.

Required fields:

- `stage_id`, `stage_name`, `stage_order`, `row_type`, `row_label`, `row_value`.
- Optional: `emotion_score`, `emotion_label`, `touchpoint`, `pain_point`, `opportunity`, `action_owner`, `source_note`.

### Hierarchy Tree Card

Use for parent-child structures.

Rules:

- Root, parent-child schema, depth, and visible depth must be declared.
- Use tree layout, not relation graph, when each node has one parent. Multiple parents should route to graph.
- Collapse dense child groups with `+N` or `other`; use search/locate for large trees.
- Node content stays compact: name plus one value/status at most.

Required fields:

- `node_id`, `node_name`, `parent_id`, `level`, `node_type`.
- Optional: `value`, `unit`, `status`, `owner`, `child_count`, `sort_key`, `collapsed_count`, `period`.

### Hub Relation Network Card

Use for one central entity and surrounding relationships.

Rules:

- The central node is a selected subject, not a decoration. Surrounding clusters must have semantic groups.
- Edge direction, type, and strength must be declared when visible.
- Permanent labels are limited to the hub, group labels, selected nodes, and key nodes.
- Dense networks need filtering, aggregation, search, neighborhood expansion, or table/detail fallback.

Required fields:

- Node rows: `node_id`, `node_name`, `node_type`, `group_id`.
- Edge rows: `source_id`, `target_id`, `edge_type`, `direction`, `weight`.
- Optional: `status`, `value`, `unit`, `relationship_strength`, `latest_time`, `selected_flag`, `risk_flag`.

### Sunburst Composition Card

Use for hierarchy path plus composition share.

Rules:

- Angle metric must be non-negative and additive.
- Visible depth defaults to `2-3` levels. Deeper structures need drilldown or breadcrumb.
- Center content should show total, current node, selected path, or empty state, not decoration.
- Tiny sectors merge, hide labels, or move to drilldown.

Required fields:

- `node_id`, `node_name`, `parent_id` or `path`, `level`, `value`, `unit`, `total_value`.
- Optional: `percent_of_total`, `percent_of_parent`, `rank`, `color_metric`, `aggregation_rule`, `selected_path`.

### Treemap Composition Card

Use for hierarchy composition and relative area comparison.

Rules:

- Area metric must be non-negative and additive.
- Parent and leaf totals must reconcile or document the source rule.
- Rectangle labels follow size thresholds. Tiny rectangles are tooltip-only or aggregated.
- Side legend/table is useful when exact parent totals, shares, or monetary values matter.

Required fields:

- `node_id`, `node_name`, `parent_id` or `path`, `level`, `value`, `unit`, `total_value`.
- Optional: `percent_of_total`, `percent_of_parent`, `rank`, `color_metric`, `aggregation_rule`, `leaf_count`.

### Path Conversion Flow Card

Use for directed start-to-end paths with branch ratios and terminal outcomes.

Rules:

- The graph must have a start node, ordered intermediate nodes, and terminal states.
- Edge labels show ratio or value only when sparse; dense edge values move to tooltip.
- Success, loss, pending, or abnormal terminal states use restrained status color.
- If movement is many-to-many across more than a few stages, use Sankey. If the task is simple retention, use funnel.

Required fields:

- Node rows: `node_id`, `node_name`, `node_type`, `stage_order`.
- Link rows: `source_id`, `target_id`, `value`, `rate`, `unit`, `period`.
- Optional: `terminal_status`, `conversion_rate`, `drop_rate`, `path_rank`, `cohort_rule`, `selected_path`.

## Data And Interaction Contract

Every mapping that uses `flowHierarchyDiagramCardPattern` must include:

```ts
type FlowHierarchyDiagramCardContract = {
  flowHierarchyDiagramCardPattern: FlowHierarchyDiagramCardPattern;
  visualType: 'funnel' | 'sankey' | 'path' | 'tree' | 'graph' | 'sunburst' | 'treemap';
  dataGrain: string;
  nodeFields?: string[];
  linkFields?: string[];
  stageFields?: string[];
  hierarchyFields?: string[];
  metricFields: string[];
  orderRule?: string;
  scaleRule?: string;
  labelRule: string;
  tooltipFields: string[];
  localControls?: string[];
  densityLimit: string;
  rendererOwner: 'echarts' | 'data-driven-custom-diagram';
  fallback: string;
};
```

Interaction rules:

- Hover highlights related nodes, links, ancestors, descendants, or current path without moving the layout.
- Click/brush/pin interactions must declare event name, payload, permission behavior, stale-state behavior, and target drawer/fullscreen/table behavior.
- Local controls must not silently change page scope, backend aggregation, or another component unless declared as global filter or perspective switch.

## Renderer Notes

- Use ECharts `series.type: 'funnel'`, `sankey`, `tree`, `graph`, `sunburst`, or `treemap` when the project supports the family.
- Path and journey diagrams may use ECharts graph/sankey/custom series or a data-driven custom diagram. The custom exception must declare renderer ownership, data adapter, resize behavior, and accessibility.
- Do not hand-draw nodes, ribbons, arcs, rectangles, arrows, or labels as static decoration while importing ECharts or claiming data-driven behavior.
- Preserve aspect ratio for radial, tree, network, and path geometry. Recalculate layout or use fit-to-screen instead of stretching x/y independently.

## Anti-AI Gate

Reject or revise the component when any of these are true:

- The diagram is chosen because it looks sophisticated rather than because the business question is flow, hierarchy, relation, or path.
- Required data is missing: ordered stages for funnel, source-target-value links for Sankey, parent-child fields for tree/sunburst/treemap, node-edge fields for graph, or start/end path fields for path.
- Colors, line widths, node sizes, sector angles, or rectangle areas are not tied to named fields.
- The diagram lacks exact-value tooltip, side evidence, drawer, fullscreen, or table fallback.
- Node labels, edge labels, stage titles, or legends overlap.
- Dense data is rendered all at once without Top N, aggregation, collapse, search, zoom, or fullscreen.
- A simpler chart or table would answer the question with less ambiguity.

## Acceptance Checklist

- Pattern value is one of the `FlowHierarchyDiagramCardPattern` controlled values.
- `componentType: chart` and `visualType` is the real diagram family.
- Required node, link, stage, hierarchy, or path fields are declared.
- Order, scale, label, tooltip, and density rules are explicit.
- Renderer ownership and resize behavior are documented.
- Dense-data fallback and exact-value path are defined.
- Loading, empty, error, no-permission, missing data, invalid topology, and dense states are covered.
- The card can be generated from text contracts without keeping the source screenshot.
