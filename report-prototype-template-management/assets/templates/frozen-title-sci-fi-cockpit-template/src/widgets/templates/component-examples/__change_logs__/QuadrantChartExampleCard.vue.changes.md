# Code Change Ledger: src\widgets\templates\component-examples\QuadrantChartExampleCard.vue

- Code file: `src\widgets\templates\component-examples\QuadrantChartExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\QuadrantChartExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:54.527Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:54.528Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1243 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `ef7504d90ad6f7503b3c0f0de64a85e3f2c6b1e579f66fbde454738044f1cce4`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144915 - 2026-07-01T14:49:15.805Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Set aux metric strip default layout
- Modified functionality: component auxMetrics default orientation and placement
- Code ranges: auxOrientation; has-aux body grid; aux horizontal/vertical CSS; compact axis chart marker where applicable; table aux row sizing where applicable
- Modified content: Changed component-owned auxMetrics so auto horizontal keeps the strip between title and chart/body with horizontal tiles and stacked key/value, while auto vertical keeps it between title and chart/body with vertical tiles and inline key/value.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1243 lines, sha256 `ef7504d90ad6f7503b3c0f0de64a85e3f2c6b1e579f66fbde454738044f1cce4`, captured `2026-07-01T14:29:54.533Z`
- After snapshot: 1244 lines, sha256 `fca5097943bd7cb21eced1c31d8bca2c28f8589bba06a0e2505d51ca147895fe`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144915-QuadrantChartExampleCard.vue.diff` (1426 diff lines, sha256 `291c0050a0f5c94cadec83da21d4105740299f2cb325740241605608554ddb3e`)
- Follow-up: none
