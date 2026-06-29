# Main PRD Minimal Contract

Use this reference before writing any report PRD. It is the binding rule for the reader-facing main PRD.

The main PRD is a decision brief, not the execution manual. It must let a human and a weak model understand the report in minutes:

- Why this report exists.
- Who uses it.
- What phase one includes and excludes.
- What report type/path is selected.
- What each navigation page looks like at business level.
- Which child PRD each downstream stage must use.
- What blocks readiness.

All dense implementation detail must move to execution appendices or child PRDs.

## Main PRD Allowed Content

The reader-facing main PRD may contain only these sections:

| Section | Purpose | Detail level |
| --- | --- | --- |
| 0. 文档摘要 | Name, version, status, source, key assumptions, top blockers. | Compact table only. |
| 0A. 子 PRD 索引 | Tell 原型、前端、后端、技术方案、测试 which child PRD to use and when to sync. | One short table. |
| 1. 背景与目标 | Why build it, for whom, what management problem it solves, what success means. | 3-6 bullets or one compact table. |
| 2. 用户与场景 | Core roles, what they look at, what they do, permission boundary. | One role table plus optional scenario bullets. |
| 3. 一期范围 | Do, do not do, defer, sensitive data boundary. | Three short lists or one table. |
| 4. 报表实现思路 | Selected report type, reading path, whether user-supplied thought is accepted/optimized. | Natural language plus one small table. |
| 5. 页面预览 | Navigation, filters, toolbar, main blocks, reading path, interaction entries. | Markdown/mermaid preview per page. |
| 6. 模板布局摘要 | Framework template, page section split such as `12*2 + 12*3 + 12*3`, block names, selected direct block templates, slot pattern summary. | Summary only; no raw `layoutRows`. |
| 7. 指标/数据/交互摘要 | Core metrics, API groups, major interactions, dynamic conclusion rule intent. | Summary only; no formulas or API fields. |
| 8. 验收与缺口 | Ready conditions and blockers. | Short checklist and gap list. |

The main PRD must not contain:

- Full metric formulas, denominators, null rules, or lineage tables.
- Full `layoutRows`, `layoutCoordinateMap`, raw block IDs, raw slot IDs, or machine-checkable geometry tables.
- Full API request/response fields.
- Full `filterSurfaceMap`, `pillAreaConfig`, `toolbarActionMap`, or `interactionBehaviorMap`.
- Full `conclusionRuleMap`.
- Full PRD-to-workflow execution matrix.
- Full Template Build Packet seed.
- Full child PRD bodies.

## Detail Routing

Route detail to the target artifact that will execute it:

| Detail type | Write in |
| --- | --- |
| Template asset map, `layoutRows`, block template map, slot map, component template map | `CHILD-PRD-PROTOTYPE` and Appendix A / Template Build Packet seed |
| Metric dictionary and metric mounting matrix | `CHILD-PRD-BACKEND`, `CHILD-PRD-FRONTEND`, `CHILD-PRD-PROTOTYPE`, Appendix B |
| API objects, request/response fields, cache, export, permissions | `CHILD-PRD-BACKEND`, `CHILD-PRD-FRONTEND`, Appendix C |
| Filters, pills, toolbar actions, drilldown, jump, drawer, popup, modal | `CHILD-PRD-PROTOTYPE`, `CHILD-PRD-FRONTEND`, `CHILD-PRD-TESTING`, Appendix D |
| Dynamic conclusion generation rules | `CHILD-PRD-PROTOTYPE`, `CHILD-PRD-FRONTEND`, `CHILD-PRD-TESTING`, Appendix E |
| Architecture, environments, NFR, risks, rollout | `CHILD-PRD-TECHNICAL-SOLUTION` |
| Test cases, evidence, data consistency, permissions, export, regression | `CHILD-PRD-TESTING` |

## Main PRD Length Gate

- If a main PRD section needs more than one dense table, move the table to a child PRD or appendix and keep only a summary row.
- If a row contains more than one raw ID family, move it to the appendix and keep the readable Chinese name in the main PRD.
- If a reader cannot understand the page by reading section 5 preview plus section 6 summary, rewrite the preview before adding more tables.
- If the main PRD becomes longer because an implementation detail is required, that detail is in the wrong layer.

## Child PRD Detail Gate

Child PRDs are allowed to be detailed and AI-oriented. They must carry the executable rows that the main PRD intentionally omits:

- `CHILD-PRD-PROTOTYPE`: full template/layout/slot/component/conclusion/interaction packet.
- `CHILD-PRD-FRONTEND`: routes, state, API adapters, view models, permissions, rendering QA.
- `CHILD-PRD-BACKEND`: data objects, metric computation, endpoints, cache, export, security.
- `CHILD-PRD-TECHNICAL-SOLUTION`: architecture, decisions, dependencies, environments, NFR, delivery plan.
- `CHILD-PRD-TESTING`: test matrix, expected results, evidence, regression, retest triggers.

The final PRD bundle is valid only when the concise main PRD and the detailed child PRDs agree on scope, page names, metric names, APIs, interactions, readiness status, and blocking gaps.
