# Code Change Ledger: src\widgets\templates\component-examples\DetailTableExampleCard.vue

- Code file: `src\widgets\templates\component-examples\DetailTableExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\DetailTableExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:57.389Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:57.390Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1386 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `016f83b6777bfaa3885a3f658a2ef48ea1e496c422067813f6965b6e8a8ed03f`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144918 - 2026-07-01T14:49:18.436Z

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
- Before snapshot: 1386 lines, sha256 `016f83b6777bfaa3885a3f658a2ef48ea1e496c422067813f6965b6e8a8ed03f`, captured `2026-07-01T14:29:57.395Z`
- After snapshot: 1451 lines, sha256 `42f8090041dfc4f1e96e3868811a4bc8b61dd89efe7498d457a71d05bdc313d6`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144918-DetailTableExampleCard.vue.diff` (2050 diff lines, sha256 `363393d4911ce0eba340a5a09cf3bb860330f8e78bd7645ce28eba825f8891ab`)
- Follow-up: none
