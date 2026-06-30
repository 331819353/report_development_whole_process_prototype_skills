# Delivery Index

- Project: left-nav-analytics-workbench-template
- Current release version: release-v1.0
- Ledger rule: read this file before editing the report project; append a change entry after every scoped modification.

## Artifact Index

| Artifact ID | Type | Name | Version | Path/source | Owner | Status | Upstream version | Downstream version | Change IDs | Evidence | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| artifact-001 | prototype | Left-nav analytics workbench business report | release-v1.0 | . | report-prototype-template-management | ready | PRD/current | validate:dashboard | baseline | npm run validate:dashboard | Configurable report template with left navigation shell. |
| artifact-002 | data-summary | Prototype data summary | release-v1.0 | docs/prototype-data-summary.md | report-prototype-template-management | ready | dashboard.config.ts/business-report-pages.ts | backend handoff | baseline | docs/prototype-data-summary.md | Backend-facing data structure summary. |

## Version Chain

| Release version | Requirement | Prototype | Data model | API docs | Backend | Frontend | Test matrix/report | Automation | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| release-v1.0 | business-report baseline | left-nav-analytics-workbench-template | dashboard.dataset.json | suggested in docs/prototype-data-summary.md | pending downstream | template project | validate:dashboard/build:test | package scripts | ready |

## Change History

| Time | Version | Change ID | Actor | Summary | Changed files | Impacted report scope | Data/API/filter/conclusion impact | Validation | Prototype data summary | Code ledger status | Next-change notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-30 00:00:00 +0800 | release-v1.0 | baseline | codex | Baseline configurable business report template with delivery index and data summary. | DELIVERY_INDEX.md; docs/prototype-data-summary.md | all business-report pages | documents existing static dataset, filters, component examples, and conclusion inputs | npm run validate:dashboard | docs/prototype-data-summary.md ready | existing sidecars retained where present | Read DELIVERY_INDEX.md before the next modification. |
