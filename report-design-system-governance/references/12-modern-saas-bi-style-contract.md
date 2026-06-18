# Modern SaaS BI Dashboard Style Contract

Use this reference when the user explicitly asks for a modern SaaS Dashboard, BI Dashboard, UI Kit, light gray-white, white-card, linear, clean, high-end report style.

This contract turns those style words into a measurable report design baseline. It is a report/product UI contract, not permission to use generic SaaS decoration.

## Source Hierarchy

Apply this contract after inherited company/template tokens and before project-specific exceptions:

1. Company or product UI baseline, such as Haier enterprise UI when applicable.
2. Approved report template tokens.
3. This Modern SaaS BI Dashboard style contract.
4. Project-specific exception with owner, reason, expiry, and regression evidence.

If a company/template baseline conflicts with this contract, keep the inherited source as authority and record the conflict instead of inventing a new style.

## Baseline Contract

### Page Surface

- Page canvas uses a quiet light gray-white neutral surface. If no inherited token exists, define semantic tokens such as `surface.page`, `surface.muted`, and `surface.card` rather than hardcoding values.
- Cards and report blocks use white or near-white surfaces only when the content is an independent analytical object or interaction surface. Do not make a uniform bordered-card grid the default page language. Thin borders, small radii, and light shadows are allowed, but typography, spacing, section rhythm, subtle dividers, and local grouping must do the first pass of information separation.
- Avoid nested cards. A parent report block can contain internal sub-blocks, but those sub-blocks use headings, indentation, dividers, soft fills, or local spacing rather than full card-in-card styling.
- Decoration is not the page language. No orb, glass, neon, particle, heavy gradient, oversized shadow, or large illustrative background may replace hierarchy, data, or workflow.
- This contract is not a "large whitespace" rule. In report prototypes, the preferred expression is low-noise high information density: enough breathing room for reading, but no large empty regions when the grid span can carry useful conclusion, evidence, detail/action, or trust/source content.

### Information Hierarchy

- The first meaningful viewport must answer the main report question or expose the main action. Style polish cannot be the first-screen purpose.
- Use a clear information flow: primary conclusion/status, supporting evidence, breakdown/driver, detail/action, trust/source. Prefer report-like reading rhythm over a generic dashboard collage when the task is analysis, review, detail, or decision support.
- Do not make all cards equal weight. The primary evidence block should be visually dominant, with supporting cards quieter and smaller.
- Do not KPI-ize every module. KPI cards and metric tiles are reserved for primary decision metrics; explanations, rankings, tables, driver paths, anomalies, definitions, and action items must keep component forms that match their task.
- Each block needs one semantic role. If a block mixes unrelated KPI, chart, list, table, and narrative content, split it or use a governed Composite Panel or Micro Dashboard Card pattern.

### Brand And Status Color

- Inherit the company/product brand color system before applying status colors. Brand/product colors define identity, navigation, selection, focus, primary actions, and primary data emphasis.
- Green, red, orange, and other functional colors are status semantics, not the main visual grammar. Use them only when a metric dictionary, risk rule, success/warning/error state, or explicit business convention defines the meaning.
- Do not rely on red/green alone for meaning. Pair any status color with sign, icon, label, threshold text, or tooltip/detail explanation.
- For non-status comparisons, trends, categories, and hierarchy, prefer brand palette steps, neutral contrast, ordered tints, line weight, position, labels, or typography before red/green encoding.

### UI Kit Language

- Controls use established project or Element Plus-style patterns: icon buttons for tool actions, segmented controls for small mode sets, dropdowns for longer option sets, date/range selectors for time, and restrained tags for status.
- Text hierarchy is compact and readable: clear page title, small section titles, scan-friendly labels, explicit units, and muted metadata.
- Interaction feedback is linear and stable: border color, outline, subtle fill, or inset shadow. Do not use hover translate/scale or motion that changes block geometry.
- Cards, tables, charts, filters, and states share one token family. A page fails if every component looks individually polished but visually unrelated.

### Chart Lightness

- Charts are selected for task fit, not visual variety. Trend, ranking, composition, distribution, relationship, driver diagnosis, detail, and action tasks each need the chart family that best answers the question.
- Prefer fewer, clearer chart families per first viewport. A business dashboard should normally have one primary chart plus bounded supporting evidence; additional charts need distinct business questions.
- Chart styling stays light: restrained gridlines, key-only labels, muted axes, semantic series colors, readable legend placement, exact-value tooltip/detail, and no decorative backgrounds inside plot areas. Avoid rainbow palettes unless category identity, status semantics, or business convention explicitly requires multiple hues.
- Do not use multiple mini charts inside KPI cards or overview cards unless the component-family rule explicitly allows one compact evidence visual and the fit budget passes.
- Heavy chart treatment, high-saturation palettes, dense permanent labels, competing legends, or chart/table crowding is `VIS-CHART-OVERWEIGHT` unless the business task and geometry proof justify it.

## Failure IDs

Use these IDs in design, layout, component, chart, runtime QA, and readiness outputs:

| ID | Fails when | Repair |
| --- | --- | --- |
| `VIS-MODERN-BI-BASELINE-MISSING` | The output says modern SaaS/BI/UI Kit but lacks semantic page/card/border/radius/shadow/typography/chart tokens or inherited source decisions. | Declare inherited tokens or this contract's semantic tokens, with exceptions. |
| `VIS-GENERIC-SAAS-SHELL` | The page looks like an interchangeable SaaS dashboard and has no task-specific hierarchy, metric tree, diagnostic path, trust detail, or action route. | Rebuild around the report question, decision path, metric tree, and domain vocabulary. |
| `VIS-COMPONENT-PILEUP` | The page or card piles up unrelated KPI/cards/charts/tables/lists/narratives, nests cards, or uses equal-weight component variety as the design language. | Split blocks, reduce visible components, choose a governed Composite Panel/Micro Dashboard Card only when its contract passes. |
| `VIS-CHART-OVERWEIGHT` | Charts dominate through quantity, decoration, saturation, labels, legends, or competing chart types rather than answering the question. | Reduce chart count, choose simpler chart/table forms, move detail to tooltip/drawer/table, and lighten grid/label/legend treatment. |
| `VIS-HIERARCHY-FLAT` | Cards, charts, filters, and text have similar weight so users cannot tell what to read first or what action follows. | Assign first-viewport priority, primary/supporting/detail roles, and visual weight by task importance. |
| `VIS-CARD-BORDER-OVERUSE` | Uniform bordered cards or card outlines are the primary way information is separated, making the page feel like a tiled dashboard regardless of content. | Remove unnecessary card frames, strengthen typography and whitespace, use dividers/section rhythm, and keep frames only for independent objects or interactions. |
| `VIS-KPI-EVERYWHERE` | Most modules are expressed as KPI cards/metric tiles even when the content is explanation, diagnosis, detail, ranking, action, or trust evidence. | Keep only primary decision metrics as KPI cards; restore charts, tables, text evidence, lists, or action panels according to the task. |
| `VIS-SEMANTIC-COLOR-OVERRELIANCE` | Red/green/status colors carry the main hierarchy or trend meaning without an explicit business/status dictionary. | Use brand/product palette and neutral hierarchy for structure, reserve status colors for documented states, and pair status color with labels/icons/signs. |
| `VIS-NO-INFORMATION-FLOW` | The page is a dashboard-like collection of blocks without a reading sequence from conclusion to evidence, driver, detail, action, and trust. | Rebuild the layout as an information flow with named block roles and deliberate section rhythm. |

## Proof Obligations

For implementation-ready or runtime-verifiable work, evidence must include:

- Source hierarchy and selected style baseline.
- Semantic token mapping for page surface, optional card surface, divider, border, radius, shadow, text, muted text, brand/product accent, status colors, chart series, and focus/hover.
- Layout proof that first viewport priority, block roles, component count, and card nesting pass this contract.
- Layout proof that information is separated first by typography/spacing/section rhythm, not uniform card borders, unless an explicit template or interaction reason is recorded.
- Component proof that controls, local filters, states, text hierarchy, and hover/focus behavior use the same UI Kit language.
- Component proof that KPI cards are limited to primary decision metrics and that non-KPI modules keep task-matched component forms.
- Chart proof that chart count, chart family choice, palette, grid/axis/legend/label density, tooltip/detail path, and plot fit are acceptable.
- Color proof that brand/product colors own identity and primary emphasis while red/green/orange only encode documented status, risk, or business-direction semantics.
- Runtime proof when code or URL exists: screenshot/crop plus DOM/CSS/ECharts evidence for page background, card styling, chart option/lightness, overflow, and no overlap.

## Readiness Rule

When this contract is in scope, `ready` is blocked by unresolved `VIS-MODERN-BI-BASELINE-MISSING`, `VIS-GENERIC-SAAS-SHELL`, `VIS-COMPONENT-PILEUP`, `VIS-CHART-OVERWEIGHT`, `VIS-HIERARCHY-FLAT`, `VIS-CARD-BORDER-OVERUSE`, `VIS-KPI-EVERYWHERE`, `VIS-SEMANTIC-COLOR-OVERRELIANCE`, or `VIS-NO-INFORMATION-FLOW` findings. `partial` is allowed only when the exception owner, scope, and follow-up proof are recorded.
