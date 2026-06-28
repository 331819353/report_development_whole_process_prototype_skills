# Output Skeleton And Gates

## Output Skeleton

When transforming a requirement, use this structure. Keep small inputs concise, but preserve the same logical sections.

1. 需求场景判断: primary scenario, secondary scenarios, expected deliverable.
2. 来源材料需求化清单: every user-provided message/file/source artifact, extracted facts, inferred assumptions, gaps, affected requirement areas, downstream owner, and whether it explicitly controls output format.
3. 已知事实/推断/缺口: confirmed facts, assumptions, missing inputs that affect design or development.
4. 目标用户与使用场景: users, stakeholders, usage moment, decision/action/result.
5. 主题与问题树: theme -> business/technical problem -> expected outcome.
6. 开发范围边界: in scope, out of scope, dependencies, phase split.
7. 对象模型: business/data/system/UI/process/test objects with grain, owner, source, status, relationships.
8. 场景化需求拆解: selected playbook output, such as prototype blocks, APIs, data tables, frontend components, or test cases.
9. 数据与接口需求: source systems, tables/models, relationships, API contracts, request/response fields, transformations.
10. 权限与安全需求: identity, role, organization scope, row/field/operation permission, masking, audit, export rules.
11. 交互/流程/状态需求: filters, jumps, approval/task flow, lifecycle state, error/empty/loading/no-permission/stale states.
12. 非功能需求: performance, freshness, reliability, observability, compatibility, deployment, rollback.
13. 测试与验收标准: acceptance criteria, test cases, evidence, data consistency checks, integration smoke tests.
14. UI/设计基线: Haier/company application baseline, report development baseline, inherited dual baseline, or explicit non-Haier/native/neutral exception, with downstream skills that must apply it.
15. 交付形态与默认实施方式: expected artifact, default `vueTemplatePrototype`, default `implementationMode: copyTemplateProject`, copied-template path, explicit HTML/static-output authority if any, explicit `newVue3Project` exception if any, and downstream Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios constraint for copied runnable prototypes.
16. 既有设计思路审查: accepted/repaired/rejected existing design proposals from the source requirement, including conflicts with story, path, hierarchy, `1920x1080`, `12 * N`, chart sizing, density, or metric-display rules.
17. 指标展示边界: visible metrics/components versus supplemental metric口径, calculation notes, and indicator lists that stay in tooltip/detail/dictionary/handoff unless explicitly requested for page display.
18. 后续调用建议: exact downstream skills/workflows and why.
19. 风险与待确认问题: unresolved risks, questions, decisions needed before implementation.

For implementation-ready tasks, add `开发任务清单`: task name, target file/module or artifact, dependency, and acceptance condition. Read `references/object-model-and-acceptance.md` for the detailed object and acceptance model.


## High-Availability Rules

- Never fail because the user only gave a short or vague request.
- Always produce a scenario judgment and a first-pass development brief.
- Keep extraction independent of one industry; adapt object names to the provided context.
- Separate business requirements, data requirements, API requirements, UI requirements, permission requirements, and test requirements.
- Do not overfit to examples; support adjacent scenarios that still convert requirements into development work.
- Use stable categories and explicit assumptions instead of inventing unnecessary methodology.
- When screenshots or source files are provided, extract visible/actual elements before inferring missing ones.
- Treat HTML, Markdown/MD, screenshots, source snippets, code, documents, and data files as requirement evidence first; do not let their file format decide output format by default.
- When code or API docs are provided, inspect real contracts before designing new ones.
- If a follow-up question is necessary, ask the minimum number needed to unblock the next irreversible decision.


## Quality Checklist

Before finalizing, verify:

- The primary scenario and expected deliverable are explicit.
- Every user-provided source artifact is either transformed into requirements or explicitly marked out of scope.
- HTML/static/single-file output is chosen only when the user's wording explicitly requests it; otherwise runnable prototypes copy a bundled template project and keep the default Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios path. A blank/new Vue3 project needs a self-developed/non-template exception and rejected copy candidates.
- Facts, assumptions, and missing inputs are separated.
- User/stakeholder and usage moment are named.
- Vague goals are converted into specific problems and outcomes.
- Scope boundaries and dependencies are visible.
- Objects include grain, owner/source, status, relationships, and permission when relevant.
- Scenario-specific requirements are detailed enough for the selected downstream skill.
- Data, API, UI, permission, process, nonfunctional, and test needs are separated.
- Page requirements identify whether the Haier/company application baseline, report development baseline, or inherited dual baseline must be applied downstream; Haier/enterprise report pages require both unless an explicit exception is recorded.
- Existing design ideas in requirement documents are checked before being accepted into prototype work.
- Metric口径, calculation notes, and indicator lists are not promoted to visible page modules unless the requirement explicitly asks for page display.
- Acceptance criteria are measurable and tied to tests or evidence.
- Recommended downstream skills are specific and minimal.
- Remaining risks and questions are not hidden.


## Avoid

- Do not treat requirement analysis as a generic summary.
- Do not skip requirement transformation because the user provided an HTML/MD/source file that looks implementation-ready.
- Do not output or recommend HTML/static prototypes merely because HTML/MD/source material was provided.
- Do not jump from vague intent to UI/code without scenario judgment.
- Do not design APIs without data source, table/model, permission, and response transformation considerations.
- Do not design visual pages without metrics, dimensions, filters, interactions, and data binding.
- Do not blindly implement a requirement document's existing design idea without checking its story, layout, component, and metric-display logic.
- Do not convert supplemental 指标口径 or 指标清单 into report-page content by default.
- Do not design tests without acceptance criteria, test data, expected results, and evidence.
- Do not list every possible artifact; include what the selected scenario needs.
- Do not ask broad clarification questions when safe assumptions can move the work forward.
