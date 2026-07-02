# Code Change Ledger: src\widgets\templates\component-examples\HeatmapChartExampleCard.vue

- Code file: `src\widgets\templates\component-examples\HeatmapChartExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\HeatmapChartExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:52.007Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:52.008Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 989 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `a0b00aebb5d228faec895eb1cd3ad359d502731d9581ed22cfcc3c6b0b6ca223`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144913 - 2026-07-01T14:49:13.160Z

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
- Before snapshot: 989 lines, sha256 `a0b00aebb5d228faec895eb1cd3ad359d502731d9581ed22cfcc3c6b0b6ca223`, captured `2026-07-01T14:29:52.012Z`
- After snapshot: 986 lines, sha256 `7dad7126d253445f1605a8ebc8e9fb77fd981e08cbec2aae5c73058936eae73c`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144913-HeatmapChartExampleCard.vue.diff` (842 diff lines, sha256 `15670a9abba9ab299cc88509ee4f61c85dd899ecee4b751c27158b92afb9afcc`)
- Follow-up: none
