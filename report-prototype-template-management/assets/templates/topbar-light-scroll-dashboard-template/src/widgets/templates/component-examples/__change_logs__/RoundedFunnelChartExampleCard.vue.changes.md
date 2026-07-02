# Code Change Ledger: src\widgets\templates\component-examples\RoundedFunnelChartExampleCard.vue

- Code file: `src\widgets\templates\component-examples\RoundedFunnelChartExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\RoundedFunnelChartExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:55.454Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:55.455Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 917 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `0ab1631d2b1a085f59a0ce0f7eafb63565947f869d22b2125eafb92bc408b76f`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144856 - 2026-07-01T14:48:56.525Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Set aux metric strip default layout
- Modified functionality: component auxMetrics default orientation and placement
- Code ranges: auxOrientation; has-aux body grid; aux horizontal/vertical CSS; compact axis chart marker where applicable; table aux row sizing where applicable
- Modified content: Changed component-owned auxMetrics so auto horizontal keeps the strip between title and chart/body with horizontal tiles and stacked key/value, while auto vertical keeps it between title and chart/body with vertical tiles and inline key/value.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5178/
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 917 lines, sha256 `0ab1631d2b1a085f59a0ce0f7eafb63565947f869d22b2125eafb92bc408b76f`, captured `2026-07-01T14:29:55.461Z`
- After snapshot: 918 lines, sha256 `bec2e0e10bc37491f3588f267228981dd13e64e63a36f4ccb3d5b4b2a4c0b321`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144856-RoundedFunnelChartExampleCard.vue.diff` (942 diff lines, sha256 `d3dc0fa6e07859e93b48a0aa0555859149f3aa612642cee71a2385f88c7698c1`)
- Follow-up: none
