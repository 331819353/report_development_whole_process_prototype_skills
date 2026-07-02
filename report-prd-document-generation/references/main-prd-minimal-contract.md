# Main PRD Minimal Contract

Use this reference before writing any report PRD. It is the binding rule for the reader-facing main PRD.

The main PRD is a decision brief, not the execution manual. It must let a human and a weak model understand the report in minutes:

- Why this report exists.
- Who uses it.
- Which scenario/action it supports.
- What phase one includes and excludes.
- What design thought and report type/path are selected.
- What each navigation page looks like at business level.
- Which child PRD each downstream stage must use.
- Which targeted source-material reading file explains source authority, evidence-to-decision trace, and stage-specific reading plan.
- What blocks readiness.

All dense implementation detail must move to independent files under `prd/execution/` or `prd/children/`.

## Main PRD Allowed Content

The reader-facing main PRD may contain only these sections:

| Section | Purpose | Detail level |
| --- | --- | --- |
| 0. 文档摘要 | Name, version, status, source, key assumptions, top blockers. | Compact table only. |
| 0A. 文件索引 | Tell 原型、前端、后端、技术方案、测试 which execution and child PRD files to use, including `prd-targeted-reading-analysis.md`, and when to sync. | One short table. |
| 1. 背景与目标 | Why build it, for whom, what management problem it solves, what success means. | 3-6 bullets or one compact table. |
| 2. 用户与场景 | Core roles, what they look at, what they do, usage scenario, decision/action, permission boundary. | One role table plus optional scenario bullets. |
| 3. 一期范围 | Do, do not do, defer, sensitive data boundary. | Three short lists or one table. |
| 4. 报表实现思路 | Selected design thought, report type, storyline summary, reading path, whether user-supplied thought is accepted/optimized. | Natural language plus one small table. |
| 5. 页面预览 | Navigation, filters, toolbar, main blocks, storyline order, reading path, interaction entries. | Markdown/mermaid preview per page. |
| 6. 模板布局摘要 | Framework template, page section split such as `12*3 + 12*3 + 12*3`, block names, storyline coverage, block area configs, slot pattern summary, and top-level block row-span `N >= 3` statement. | Summary only; no raw `layoutRows`. |
| 7. 指标/数据/筛选/交互摘要 | Core metrics, data/API groups, global filters, local filters/pills, major interactions, dynamic conclusion rule intent. | Summary only; no formulas, API fields, or full filter maps. |
| 8. 验收与缺口 | Ready conditions and blockers. | Short checklist and gap list. |

The main PRD must not contain:

- Full metric formulas, denominators, null rules, or lineage tables.
- Full `layoutRows`, `layoutCoordinateMap`, raw block IDs, raw slot IDs, or machine-checkable geometry tables.
- Full API request/response fields.
- Full `globalFilterDesignMap`, `localFilterDesignMap`, `filterSurfaceMap`, `pillAreaConfig`, `toolbarActionMap`, or `interactionBehaviorMap`.
- Full `conclusionRuleMap`.
- Full PRD-to-workflow execution matrix.
- Full Template Build Packet seed.
- Full child PRD bodies.
- Any one-file delivery sections that replace required files.

## Detail Routing

Route detail to the target artifact that will execute it:

| Detail type | Write in |
| --- | --- |
| Source material inventory, authority order, targeted reading plan, evidence-to-decision trace for demand/scenario/design-thought/storyline decisions, non-authority items | `execution/prd-targeted-reading-analysis.md`, affected child PRDs |
| Design thought selection, storyline map, story block map, block design reflection, story value review | `children/prd-child-prototype.md`, `execution/prd-template-execution-contract.md`, `execution/prd-targeted-reading-analysis.md` for evidence trace |
| Template asset map, `layoutRows`, block template map, slot map, component example map | `execution/prd-template-execution-contract.md`, `execution/prd-template-build-packet-seed.md`, `children/prd-child-prototype.md` |
| Metric dictionary and metric mounting matrix | `execution/prd-metric-dictionary-and-mounting.md`, `children/prd-child-backend.md`, `children/prd-child-frontend.md`, `children/prd-child-prototype.md` |
| Data design, API objects, request/response fields, cache, export, permissions, freshness, quality/null rules, mock-to-real status | `execution/prd-data-api-contract.md`, `children/prd-child-backend.md`, `children/prd-child-frontend.md`, `children/prd-child-prototype.md` |
| Global filters, local filters, pills, toolbar actions, drilldown, jump, drawer, popup, modal, reset/stale rules | `execution/prd-interaction-contract.md`, `children/prd-child-prototype.md`, `children/prd-child-frontend.md`, `children/prd-child-testing.md` |
| Dynamic conclusion generation rules | `execution/prd-conclusion-rules.md`, `children/prd-child-prototype.md`, `children/prd-child-frontend.md`, `children/prd-child-testing.md` |
| Architecture, environments, NFR, risks, rollout | `children/prd-child-technical-solution.md` |
| Test cases, evidence, data consistency, permissions, export, regression | `children/prd-child-testing.md` |

## Main PRD Length Gate

- If a main PRD section needs more than one dense table, move the table to an execution file or child PRD and keep only a summary row.
- If a row contains more than one raw ID family, move it to an execution file and keep the readable Chinese name in the main PRD.
- If a reader cannot understand the chosen design thought and storyline by reading section 4 plus section 5 preview and section 6 summary, rewrite the story before adding more tables.
- If the main PRD becomes longer because an implementation detail is required, that detail is in the wrong layer.

## Child PRD Detail Gate

Child PRDs are allowed to be detailed and AI-oriented. They must carry the executable rows that the main PRD intentionally omits:

- `CHILD-PRD-PROTOTYPE`: full demand framing, design thought selection, storyline, story block map, block design reflection, global/local filter design, data design, story value review, and template/layout/slot/component/conclusion/interaction packet.
- `CHILD-PRD-FRONTEND`: routes, state, API adapters, view models, permissions, rendering QA.
- `CHILD-PRD-BACKEND`: data objects, metric computation, endpoints, cache, export, security.
- `CHILD-PRD-TECHNICAL-SOLUTION`: architecture, decisions, dependencies, environments, NFR, delivery plan.
- `CHILD-PRD-TESTING`: test matrix, expected results, evidence, regression, retest triggers.

The final PRD bundle is valid only when `prd-main.md`, all execution files, and all child PRDs agree on scope, page names, metric names, APIs, interactions, readiness status, and blocking gaps.

The final PRD bundle is not valid for downstream implementation when `execution/prd-targeted-reading-analysis.md` is missing or when child PRDs do not state which targeted reading rows they consume.
