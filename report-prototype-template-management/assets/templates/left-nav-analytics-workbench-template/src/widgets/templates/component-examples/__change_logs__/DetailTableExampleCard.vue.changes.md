# Code Change Ledger: src\widgets\templates\component-examples\DetailTableExampleCard.vue

- Code file: `src\widgets\templates\component-examples\DetailTableExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\DetailTableExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:57.282Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:57.283Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1361 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `d1f36b3196c183e7e6c5e6cf84a9543b1a903fbff146b87d969132f3456b2e4f`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144908 - 2026-07-01T14:49:08.352Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Set aux metric strip default layout
- Modified functionality: component auxMetrics default orientation and placement
- Code ranges: auxOrientation; has-aux body grid; aux horizontal/vertical CSS; compact axis chart marker where applicable; table aux row sizing where applicable
- Modified content: Changed component-owned auxMetrics so auto horizontal keeps the strip between title and chart/body with horizontal tiles and stacked key/value, while auto vertical keeps it between title and chart/body with vertical tiles and inline key/value.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 1361 lines, sha256 `d1f36b3196c183e7e6c5e6cf84a9543b1a903fbff146b87d969132f3456b2e4f`, captured `2026-07-01T14:29:57.290Z`
- After snapshot: 1426 lines, sha256 `947b9af871968395f3203d6f9ada53236ca8a810a92412415cb09a601b08c848`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144908-DetailTableExampleCard.vue.diff` (2006 diff lines, sha256 `821906ea11e69fb6c9dd6af0cee7537622bccca9d98f88ea798e5cf3303e0fbe`)
- Follow-up: none
