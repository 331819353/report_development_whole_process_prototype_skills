# Targeted Reading And Analysis Contract

Use this reference when compiling a report PRD from ordinary requirements, attachments, screenshots, HTML/source samples, metric lists, meeting notes, API fragments, or mock data.

The goal is to make the PRD tell downstream stages exactly what was read, why it mattered, what was concluded, and which implementation or QA artifact must consume that conclusion. This includes demand understanding, target reader/scenario, design thought selection, storyline adaptation, and block/slot design decisions. This is different from the report user's reading path. The report user's reading path explains how a business reader consumes the finished page; targeted reading analysis explains how implementers consume source evidence.

## Required Output File

Every executable report PRD bundle must include:

```text
prd/execution/prd-targeted-reading-analysis.md
```

Do not put this full matrix in `prd/prd-main.md`. `prd-main.md` should only reference the file in the PRD file registry.

Use `references/targeted-reading-analysis-template.md` as the output skeleton. The template can be compressed for small scopes, but its source inventory, demand/design-storyline trace, stage reading plan, evidence-to-decision trace, non-authority items, downstream consumption matrix, and readiness gate must remain represented.

After generating the bundle, run the structural validator when local files are available:

```bash
python3 report-prd-document-generation/scripts/validate_targeted_reading.py <bundle-root>
```

Use `--strict-child` when child PRDs are expected to consume targeted reading rows directly.

## Required Sections

### 1. Source Material Inventory

List every source artifact that influenced the PRD.

| Source ID | Source name/path | Source type | Provided by | Reliability | Key pages/sections/anchors | Used for | Conflicts/gaps |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `SRC-REQ-001` | Requirement document or user message | PRD / brief / note / screenshot / HTML / code / data / API / mock | user/system/repo | confirmed / inferred / sample-only / stale / conflicting | page, section, screenshot area, code path, dataset key | business scope, metric, layout, API, interaction, permission, QA | `none` or `ENTRY-*` / `GAP-*` |

Rules:

- Every material with business, metric, data, layout, interaction, permission, or acceptance influence must have a `SRC-*` row.
- Samples, screenshots, and HTML/source files must be classified as business evidence, visual evidence, data/config evidence, or sample-only evidence.
- If a source is not authoritative for a decision, say so explicitly in `Used for` or `Conflicts/gaps`.

### 1A. Demand And Design Storyline Trace

Record the source basis for the PRD's current design direction.

| Trace ID | Decision area | Current design decision | Source IDs | Why this source is authoritative | Conflict handling | Gap |
| --- | --- | --- | --- | --- | --- | --- |
| `READ-DESIGN-001` | demand / reader / scenario / decision-action / `DT-*` / `STORY-*` / block order / global filter / local filter / data design | what this PRD pass decided | `SRC-*` | latest user instruction, source authority, metric evidence, or safe inference | none / current design overrides stale source / `ENTRY-*` | none / `GAP-*` |

Rules:

- Include rows for what the user wants to make, who reads it, usage scenario, business decision/action, primary `DT-*`, adapted storyline, global/local filters, data design, and any block-order/filter/data conflict that affects implementation.
- If a previous source says one design but the current PRD pass chooses another, record the previous source as conflicting and keep the current design as authoritative unless a template hard constraint blocks it.

### 2. Targeted Reading Plan By Stage

For each downstream stage, state what it must read and what it must extract.

| Stage | Must read | Read for | Must extract | Do not infer from | Output artifact/row |
| --- | --- | --- | --- | --- | --- |
| Prototype | `prd/children/prd-child-prototype.md`, template execution files, selected `SRC-*` and `READ-DESIGN-*` rows | demand framing, design thought, page story, layout, filters, slots, component examples, data summary | primary `DT-*`, `STORY-*`, global/local filters, page/block/slot ids, component data keys, conclusion rules, data design rows, template packet gaps | screenshots alone, visible labels alone | template config, `docs/prototype-data-summary.md` |
| Technical solution | targeted reading file, PRD execution files, data/API files | architecture, boundaries, risks, source authority | scope boundaries, API/model ownership, environment/NFR assumptions, source conflicts | final DOM or mock data alone | architecture blueprint, API inventory, model plan |
| Backend/API | targeted reading file, metric/data/API files, mock replacement rows | source and API feasibility | metrics, grain, filters, permissions, source fields, replacement API rows, response compatibility | frontend labels or local mock JSON alone | API docs, data model, backend implementation |
| Frontend | targeted reading file, child frontend/prototype files, API contracts | route/component/provider implementation | component data keys, slot mapping, filters, states, conclusion inputs, retained mock exceptions | business prose alone | frontend function description, runtime QA |
| Testing/QA | targeted reading file, all execution files, delivered stage outputs | acceptance and defect localization | authority order, expected behavior, evidence requirements, non-default cases, replacement coverage | smoke success alone | test matrix, QA findings, retest criteria |

Rules:

- Do not write generic "read all PRD files" rows. Each row must name why that stage reads the file.
- If a stage is not in current scope, record `not-in-current-scope` instead of generating empty rows.
- If a required downstream stage cannot safely proceed from available evidence, create a `GAP-*`.

### 3. Evidence To Decision Trace

Link source materials to PRD decisions and downstream artifacts.

| Decision ID | Decision | Source IDs | Analysis summary | Confidence | Affected PRD files/rows | Downstream consumers | Gap/conflict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `READ-DECISION-001` | user/scenario, selected `DT-*`, storyline step, selected report path, metric formula, page block, global/local filter, data design, API group, interaction, permission, QA case | `SRC-*`, `READ-DESIGN-*` | what was concluded and why | confirmed / inferred / blocked | file path + row/ID | prototype/backend/frontend/testing | `none` or `ENTRY-*` / `GAP-*` |

Rules:

- Any report type, page, block, component slot, metric, API, interaction, conclusion rule, permission, export, or QA acceptance decision that came from source evidence must have a trace row.
- Any selected design thought, storyline step, first-viewport order, retained visible block, global/local filter, or data design row must have a trace row or a related `READ-DESIGN-*` row.
- A downstream stage should be able to answer "why is this here?" by reading this table.
- If two sources disagree, do not silently choose one; create an `ENTRY-*` conflict or `GAP-*` blocker.

### 4. Implementation Critical Reading Notes

Create compact notes for high-risk implementation areas:

| Area | What must be understood | Evidence | Risk if missed | Owning stage | Gate |
| --- | --- | --- | --- | --- | --- |
| Design thought and storyline | primary reader, scenario, selected `DT-*`, adapted `STORY-*`, block order | `SRC-*`, `READ-DESIGN-*`, `DT-*`, `STORY-*` | generic dashboard or broken story | prototype / testing | story value review |
| Filter and data design | global/local filter scope, pill behavior, data grain, baselines, freshness, permission, quality/null rules | `SRC-*`, `READ-DESIGN-*`, `FILTER-*`, `DATA-DESIGN-*` | wrong context, stale data, misleading conclusions | prototype / backend / frontend / testing | filter/data consistency |
| Metric formula | numerator, denominator, unit, null rule | `SRC-*`, `MET-*` | wrong value or display | backend/frontend/testing | numeric display / data consistency |
| Component data key | data key, slot, API row, mock replacement | `SLOT-*`, `API-*`, replacement row | stale mock or adapter mismatch | prototype/frontend/backend/testing | mock-to-real / data consistency |
| Filter behavior | global/local/perspective/drilldown scope | `INT-*`, filter map | selected-state-only filter | frontend/backend/testing | filter completeness |
| Conclusion rule | inputs, thresholds, empty/insufficient data | `RULE-*` | fixed or misleading conclusion | prototype/frontend/testing | conclusion-rule QA |
| Permission/export | role, row/field/action/export scope | `ROLE-*`, `API-*` | data leak or wrong export | backend/frontend/testing | permission/export QA |

### 5. Non-Authority And Deferred Items

List source materials or ideas that should not drive implementation directly.

| Item | Why not authoritative | Safe use | Required owner/gap |
| --- | --- | --- | --- |
| screenshot chart shape | visual evidence only, no data grain | style/layout clue | `GAP-*` if chart type or data shape unknown |
| local mock JSON | sample payload only | fixture, API shape seed | backend replacement row |
| copied HTML/SVG chart | sample evidence only | ECharts option inspiration | chart/component owner |

## Quality Gates

- Do not mark an executable PRD bundle `ready` when `prd/execution/prd-targeted-reading-analysis.md` is missing, generic, or disconnected from the PRD execution rows.
- Do not accept "read all sources" as targeted reading. The file must state what each stage reads, why, what to extract, and what not to infer.
- Do not mark downstream handoff `ready` when the downstream artifact does not consume the relevant `READ-*`, `SRC-*`, `MET-*`, `API-*`, `SLOT-*`, `INT-*`, and `RULE-*` rows.
- Do not let screenshots, HTML, source samples, or mock data become implementation authority without a source-material classification and evidence-to-decision trace.
- Do not leave source conflicts or missing evidence as prose caveats only. Use `ENTRY-*` or `GAP-*` IDs that appear in the workflow execution matrix and affected child PRDs.
