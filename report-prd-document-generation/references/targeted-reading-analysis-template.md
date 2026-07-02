# Targeted Reading Analysis Template

Use this template to create:

```text
prd/execution/prd-targeted-reading-analysis.md
```

Keep the tables compact but specific. Replace every `TBD(GAP-*)` before marking the PRD bundle `ready`.

## 0. Summary

- PRD bundle:
- Source package/date:
- Current scope: prototype / technical-solution / backend / frontend / testing / release
- Readiness: ready / partial / blocked
- Top blockers: none / `ENTRY-001` / `GAP-001`

## 1. Source Material Inventory

| Source ID | Source name/path | Source type | Provided by | Reliability | Key pages/sections/anchors | Used for | Conflicts/gaps |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `SRC-REQ-001` | user request / requirement file / screenshot / HTML / data / API / mock | PRD / brief / note / screenshot / HTML / code / data / API / mock | user / repo / system | confirmed / inferred / sample-only / stale / conflicting | section, screenshot area, code path, dataset key | business scope / metric / layout / API / interaction / permission / QA | none / `ENTRY-*` / `GAP-*` |

## 2. Targeted Reading Plan By Stage

| Stage | Must read | Read for | Must extract | Do not infer from | Output artifact/row |
| --- | --- | --- | --- | --- | --- |
| Prototype | selected `SRC-*`, `prd/children/prd-child-prototype.md`, template execution rows | report path, page story, layout, slots, component examples, data summary | page/block/slot ids, component data keys, conclusion rules, custom example gaps | screenshots alone, visible labels alone, copied SVG/canvas marks | template config, `docs/prototype-data-summary.md` |
| Technical solution | this file, PRD execution files, data/API files | architecture, API/model ownership, runtime/NFR, source authority | scope boundaries, endpoint families, source conflicts, environment assumptions | final DOM, mock data alone | architecture blueprint, API inventory, model plan |
| Backend/API | this file, metric/data/API files, replacement rows | source feasibility, API shape, response compatibility | metrics, grain, filters, permissions, source fields, replacement rows, data-version rules | frontend labels, local mock JSON alone | API docs, data model, backend implementation |
| Frontend | this file, child frontend/prototype files, API contracts | route/component/provider implementation | component data keys, slots, filters, states, retained mock exceptions, conclusion inputs | business prose alone, screenshot chart shape alone | frontend function description, runtime QA |
| Testing/QA | this file, execution files, delivered stage outputs | acceptance coverage and defect localization | authority order, expected behavior, evidence requirements, non-default cases, replacement coverage | API 200, smoke success, default state only | test matrix, QA findings, retest criteria |

## 3. Evidence To Decision Trace

| Decision ID | Decision | Source IDs | Analysis summary | Confidence | Affected PRD files/rows | Downstream consumers | Gap/conflict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `READ-DECISION-001` | report type / metric formula / page block / API group / interaction / permission / QA case | `SRC-*` | what was concluded and why | confirmed / inferred / blocked | file path + row/ID | prototype / technical-solution / backend / frontend / testing | none / `ENTRY-*` / `GAP-*` |

## 4. Implementation Critical Reading Notes

| Area | What must be understood | Evidence | Risk if missed | Owning stage | Gate |
| --- | --- | --- | --- | --- | --- |
| Metric formula | numerator, denominator, unit, null rule | `SRC-*`, `MET-*` | wrong value or display | backend / frontend / testing | numeric display / data consistency |
| Component data key | data key, slot, API row, replacement row | `SLOT-*`, `API-*`, `READ-*` | stale mock or adapter mismatch | prototype / frontend / backend / testing | mock-to-real / data consistency |
| Filter behavior | global/local/perspective/drilldown scope | `INT-*`, filter map, `READ-*` | selected-state-only filter | frontend / backend / testing | filter completeness |
| Conclusion rule | inputs, thresholds, empty/insufficient data | `RULE-*`, `READ-*` | fixed or misleading conclusion | prototype / frontend / testing | conclusion-rule QA |
| Permission/export | role, row/field/action/export scope | `ROLE-*`, `API-*`, `READ-*` | data leak or wrong export | backend / frontend / testing | permission/export QA |

## 5. Non-Authority And Deferred Items

| Item | Why not authoritative | Safe use | Required owner/gap |
| --- | --- | --- | --- |
| screenshot chart shape | visual evidence only, no data grain | layout rhythm, label clue | `GAP-*` if chart type or data shape is unknown |
| local mock JSON | sample payload only | fixture, API shape seed | backend replacement row |
| copied HTML/SVG/canvas chart | sample evidence only | ECharts option inspiration | chart/component owner |

## 6. Downstream Consumption Matrix

| Consumer stage | Consumed rows | Accepted decisions | Deferred rows | Output artifact/version | Readiness impact |
| --- | --- | --- | --- | --- | --- |
| Technical solution | `READ-*` | API/model/runtime/security decisions | none / `ENTRY-*` / `GAP-*` | technical solution / API inventory / model file | ready / partial / blocked |
| Backend/API | `READ-*` | endpoint, response, source, permission decisions | none / `ENTRY-*` / `GAP-*` | API docs / backend plan | ready / partial / blocked |
| Frontend | `READ-*` | provider binding, component data keys, states | none / `ENTRY-*` / `GAP-*` | function description / runtime QA | ready / partial / blocked |
| Testing/QA | `READ-*` | test cases, acceptance evidence, retest criteria | none / `ENTRY-*` / `GAP-*` | test matrix / evidence report | ready / partial / blocked |

## 7. Readiness Gate

- Missing targeted reading file: yes / no
- Generic broad-read rows present: yes / no
- Every authoritative source has `SRC-*`: yes / no
- Every PRD decision with source evidence has `READ-*`: yes / no
- Non-authority items are explicit: yes / no
- Downstream stages consume or defer relevant rows: yes / no
- Open blockers: none / `ENTRY-*` / `GAP-*`
