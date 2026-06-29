# Executive Satisfaction Design Gate

Use this reference when a PRD or prototype targets management, business owners, review meetings, operating dashboards, cockpits, analysis reports, risk monitors, closure boards, or any report that supports decisions.

This is an auxiliary design gate, not visual polish. It forces the report to answer what management cares about: decision, priority, action, trust, and review reuse.

## When Required

Section `4B. 管理层满意度辅助设计` is required when any of these are true:

- The audience includes group management, business-line owners, operating managers, reviewers, executives, or decision owners.
- The report type is dashboard, cockpit, analysis report, risk monitor, closure/action board, review/export report, or a management-facing mixed report.
- The page is expected to support meeting review, monthly/quarterly review, risk tracking, action closure, performance judgment, resource allocation, or export circulation.

For pure row-level detail query reports used only by analysts/operators, the executive gate may be scoped to query efficiency, trust/source, export/audit, and row-level action instead of conclusion-first management reading.

## Required Tables

### Executive Decision Profile

| ESG ID | Role/level | Decision to make | 3-second answer | 30-second cause path | 3-minute action | Decision owner | Evidence needed | Blocker/gap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Use `ESG-*` IDs.
- The 3-second answer must be visible in the first viewport for management-facing dashboard, cockpit, analysis, risk, closure, and review/export reports.
- The 30-second cause path must trace to `PATH-*`, `BLK-*`, `MET-*`, `RULE-*`, and interaction IDs.
- The 3-minute action must name an action route, export route, owner route, closure route, or explicit non-action reason.

### First-Viewport Conclusion Quality

| ESG ID | Conclusion target | Rule ID | Direction | Magnitude | Object/scope | Likely reason | Business impact | Recommended action | Evidence fields | Failure condition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Every management-facing first viewport must answer `so what` instead of only showing numbers.
- A conclusion is not implementation-ready unless it has direction, magnitude, object/scope, reason/evidence, impact, and action/next step.
- The visible conclusion must be generated from `RULE-*`; do not write a fixed normal-state sentence.

### Metric Language Map

| ESG ID | Metric ID | Management wording | Technical definition pointer | Formula/owner | Page expression | Detail/tooltip path |
| --- | --- | --- | --- | --- | --- | --- |

Rules:

- Management wording explains why the metric matters.
- Technical definition pointer links to the section 6 metric row, formula, source, denominator, and null rule.
- Page expression is the concise label/copy used in the report, not the full metric dictionary.

### Priority And Severity Model

| SEV ID | Trigger rule/RULE | Severity | Impact measure | Urgency | Priority sort | Color/non-color cue | Owner/escalation | Empty/conflict rule |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Use `SEV-*` IDs.
- Risk, warning, anomaly, overdue, target-miss, and action-pressure reports require a severity model.
- Color alone is not enough; add ranking, tag, icon/text cue, or ordering behavior.

### Action Closure Model

| ACT ID | Source risk/conclusion | Owner | Due date/SLA | Status | Next action | System entry | Closure evidence | Overdue rule |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Use `ACT-*` IDs.
- If the report tells management there is a problem, it must show who acts, where they act, and how closure is checked, unless the phase-one scope explicitly excludes action handling.
- Excluded action handling still needs a visible route, export, or handoff note when management needs follow-up.

### Trust And Explanation Model

| TRUST ID | Data/source item | Source system | Freshness | Coverage/sample | Missing/null policy | Reconciliation/baseline | Permission masking | Source detail route |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Use `TRUST-*` IDs.
- Management-facing reports must expose data freshness, source, sample/coverage, and key caveats without crowding the first viewport.
- Trust content may live in summary area, auxiliary info area, tooltip/detail, drawer, source block, export metadata, or review appendix.

### Meeting Review And Export Model

| MEET ID | Scenario | Meeting/review use | Export format | Included conclusion/evidence/action | Filter snapshot | Audience | Audit/watermark |
| --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Use `MEET-*` IDs.
- Review/export reports always need this model.
- Dashboards and analysis reports need it when the page is used in monthly review, business review, leadership meeting, or circulation.

### Executive Satisfaction Checklist

| ESG ID | Check question | Evidence | Pass rule | Gap code |
| --- | --- | --- | --- | --- |

Required questions:

- Can the primary role get the main judgment in 3 seconds?
- Can the report explain the first cause path within 30 seconds?
- Can the user take or delegate one next action within 3 minutes?
- Are the severity/priority rules explicit enough to rank attention?
- Are the metric definitions available without turning the page into a metric dictionary?
- Are source, freshness, sample/coverage, and caveats findable?
- Can the report support a meeting/export/review scenario when required?
- Does every management-facing conclusion trace to data-driven `RULE-*` logic?

## Layout Mapping Rules

- Map every `ESG-*`, `SEV-*`, `ACT-*`, `TRUST-*`, and `MEET-*` item to `PATH-*` and `BLK-*` rows.
- First-viewport `ESG-*` rows must influence block order and block layout template selection.
- `SEV-*` rows influence ranking, status tags, warning blocks, ordering, and action entry behavior.
- `ACT-*` rows influence action list, owner/status block, drawer, jump, export, or phase-one handoff note.
- `TRUST-*` rows influence auxiliary information, summary notes, tooltip/detail, source blocks, and export metadata.
- `MEET-*` rows influence export configuration, review blocks, appendix/source blocks, and filter snapshot behavior.

## Readiness Gates

Do not mark a PRD or prototype `ready` when:

- A management-facing report has no `ESG-*` executive decision profile.
- The first viewport lacks a 3-second answer for the primary management question.
- A management-facing conclusion lacks direction, magnitude, object/scope, evidence/reason, impact, or action/next step.
- A visible management conclusion is fixed copy instead of a `RULE-*` data-driven conclusion.
- Risk, warning, anomaly, overdue, target-miss, or closure content lacks `SEV-*` priority/severity rules.
- Problems are raised without `ACT-*` owner/action/closure route or an explicit phase-one exclusion plus handoff.
- Source, freshness, sample/coverage, and permission/masking are missing for decision-critical metrics.
- A meeting/review/export scenario is required but `MEET-*` export/review behavior is absent.
- Section 5 page layout and block layout templates do not trace the 4B IDs to blocks, slots, summary areas, interactions, or export behavior.
