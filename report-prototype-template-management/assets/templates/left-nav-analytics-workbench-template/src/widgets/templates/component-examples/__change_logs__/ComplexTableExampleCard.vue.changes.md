# Code Change Ledger: src\widgets\templates\component-examples\ComplexTableExampleCard.vue

- Code file: `src\widgets\templates\component-examples\ComplexTableExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\ComplexTableExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:58.194Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:58.195Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 637 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `07fc8f5a22e17e1a8b8abb37338f079feddb17130e0ffadd480e781dc35b1875`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144909 - 2026-07-01T14:49:09.206Z

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
- Before snapshot: 637 lines, sha256 `07fc8f5a22e17e1a8b8abb37338f079feddb17130e0ffadd480e781dc35b1875`, captured `2026-07-01T14:29:58.199Z`
- After snapshot: 737 lines, sha256 `921f0b13e96b438a5c3eade2098a1adeafc74351c59deb1e824bae007a95ee46`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144909-ComplexTableExampleCard.vue.diff` (1185 diff lines, sha256 `6bc06484e591b827eebf2a123b223d5010708a71e708e4c97c0ab5564ecad7c2`)
- Follow-up: none
