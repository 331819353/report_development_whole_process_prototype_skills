# Prototype Workflow Execution Map

Use this reference when finalizing a PRD and when a prototype workflow starts from an existing PRD. The PRD is not merely background reading; it is the executable input contract for report prototype workflows.

## Hard Rule

All report prototype workflows must start from a PRD produced or validated by `$report-prd-document-generation`.

If the user asks for prototype work without a PRD, create a draft PRD first. If the user provides a PRD, validate it against this execution map before design, layout, template, component, or runtime work begins.

Report development workflows must stay template-only except for two explicit extension surfaces: self-developed interaction behavior and self-developed component content area templates. Framework shell, page layout, block layout templates, title/pill/aux/unit/summary areas, navigation, filters, toolbar, export, and permission surfaces must be configured through templates, not self-developed.

Summary areas, conclusion cards, and analysis insight components must consume PRD `RULE-*` entries from `conclusionRuleMap`. Prototype workflows must not replace dynamic frontend-generated conclusions with fixed one-sentence copy.

Prototype workflows must not recreate complete PRD content internally. They may only:

- Consume PRD sections as execution inputs.
- Ask `$report-requirement-structure-extraction` to clarify evidence or gaps.
- Return to `$report-prd-document-generation` to update missing or conflicting PRD sections.

## Required PRD Execution Matrix

Add this matrix to every PRD:

| PRD section | Executable IDs | Downstream owner skill/workflow | Execution artifact | Blocking rule | Status |
| --- | --- | --- | --- | --- | --- |

Rules:

- `Executable IDs` must reference actual IDs from the PRD, such as `PAGE-*`, `BLK-*`, `MET-*`, `API-*`, `INT-*`, `ROLE-*`, `RULE-*`, and `GAP-*`.
- `Downstream owner skill/workflow` must name the workflow or atomic skill that will consume the section.
- `Execution artifact` must be concrete: binding matrix, pageLayoutConfig, blockLayoutTemplateMap, API contract, interaction contract, permission matrix, runtime QA case, etc.
- `Blocking rule` must say whether missing data blocks prototype start, only blocks implementation, or is explicitly out of scope.
- `Status` must be `ready`, `draft`, `blocked`, or `deferred-out-of-scope`.

## Section-To-Execution Map

| PRD section | Required execution | Primary downstream owner |
| --- | --- | --- |
| 0. 文档元信息 / facts / assumptions / gaps | Set workflow mode, source authority, gap ownership, readiness status, and handoff version. | `$quality-gate-validation`, `$delivery-version-management`, target prototype workflow |
| 1. 需求背景与目标 | Produce prototype story, primary management question, report type, first-viewport answer, and success criteria. | target prototype workflow, `$report-type-design`, `$report-prototype-design-thinking` when generic |
| 2. 用户角色与使用场景 | Produce role-specific user path, permission scope, navigation visibility, export scope, and scenario acceptance cases. | target prototype workflow, `$report-info-component-mapping`, `$report-filter-control-design-spec` |
| 3. 开发范围边界 | Lock phase-one scope, out-of-scope exclusions, `outputArtifact`, template-only constraint, self-development exception map, deferred items, and blockers. | target prototype workflow, `$report-delivery-pipeline-governance`, `$quality-gate-validation` |
| 4. 页面内容 | Produce visible business module inventory, result-content boundary, component bundle plan, and nav/page content plan. | target prototype workflow, `$report-info-component-mapping`, `$report-design-system-governance` |
| 5. 页面布局配置 | Produce `frameworkTemplateId`, shell config, `pageLayoutConfig`, `layoutRows`, `blockLayoutTemplateMap`, standard area configs, component slot map, and component content area map. | `$report-visual-layout-design`, `$report-prototype-template-management` |
| 5A. Dynamic conclusion generation rules | Produce `conclusionRuleMap`, summaryArea conclusion bindings, conclusion-card/analysisInsight rule bindings, affected API/filter/interaction refresh behavior, fallback text, and QA cases. | `$report-info-component-mapping`, `$report-prototype-template-management`, `$frontend-runtime-qa-validation` |
| 6. 指标清单 | Produce metric dictionary, KPI scope boundary, display precision, formula validation, source/freshness, denominator/null behavior, and tooltip/export metadata. | `$metric-number-display-contract`, `$report-info-component-mapping`, target prototype workflow |
| 7. 指标挂载矩阵 | Produce component/data/filter/control/interaction binding matrix and slot-level metric binding. | `$report-info-component-mapping`, `$report-prototype-template-management` |
| 8. 数据与 API 需求 | Produce data object contracts, API request/response contracts, mock/data-source contract, permission filtering, cache/freshness, and technical-solution handoff. | `$report-info-component-mapping`, `$delivery-artifact-template-management`, downstream technical/backend workflows |
| 9. 交互逻辑 | Produce interaction contracts for filters, period switch, metric switch, ranking click, drilldown, jump, drawer/modal, export, loading/empty/error/no-permission states. Self-developed interactions must remain component-owned or template action-hook behavior and must not create custom shell/layout/filter/nav/toolbar surfaces. | `$report-info-component-mapping`, `$report-filter-control-design-spec`, `$frontend-runtime-qa-validation` |
| 10. 权限、安全、导出与异常状态 | Produce role/data-scope matrix, masking/export/audit behavior, state cases, and QA probes. | `$quality-gate-validation`, `$frontend-runtime-qa-validation`, downstream testing workflow |
| 11. 验收标准与待确认问题 | Produce readiness gates, test/QA matrix, unresolved blocker list, and downstream handoff conditions. | `$quality-gate-validation`, `$report-delivery-pipeline-governance`, `$frontend-runtime-qa-validation` |

## Prototype Workflow Start Gate

Before any prototype workflow continues past preflight, require:

- A PRD status of `ready-for-review`, or `draft` with non-blocking `TBD(GAP-*)` items.
- A PRD execution matrix row for every PRD section.
- No `blocked` row for the target workflow's first executable step.
- Every displayed metric in sections 6 and 7 has a mount path.
- Every summary-area conclusion, conclusion card, or analysis insight target has a `RULE-*` row and frontend generation behavior.
- Every page block in section 5 has a block layout template and component slot plan.
- Every API/data object used by a component has request/response or a documented mock/data-source fallback.
- Every interaction in section 9 has a system response and state behavior.
- The self-development exception map contains only interaction IDs and component content area template IDs; any custom shell/page/block/supporting-area work is `blocked` or `deferred-out-of-scope`.

If these conditions fail, update the PRD first instead of continuing inside the workflow.

## 100 Percent Execution Gate

A workflow may mark a prototype stage `ready` only when every PRD execution matrix row is one of:

- `ready`: consumed by the named workflow/skill and materialized into the required artifact.
- `deferred-out-of-scope`: explicitly excluded by PRD section 3 and not required for the current phase.

Rows with `draft` or `blocked` status keep the prototype stage `partial` or `blocked`. Do not hide incomplete PRD sections inside assumptions, mock data, or visual placeholders.

Dynamic conclusion rows are not optional. A workflow cannot mark the stage `ready` while a visible summary-area conclusion, conclusion card, or analysis insight component is backed only by fixed copy instead of a consumed `RULE-*` execution row.
