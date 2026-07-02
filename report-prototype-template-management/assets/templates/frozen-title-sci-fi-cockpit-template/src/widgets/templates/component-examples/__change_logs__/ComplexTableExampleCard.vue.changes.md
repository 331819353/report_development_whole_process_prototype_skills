# Code Change Ledger: src\widgets\templates\component-examples\ComplexTableExampleCard.vue

- Code file: `src\widgets\templates\component-examples\ComplexTableExampleCard.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\ComplexTableExampleCard.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:58.251Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:58.252Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 674 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `0eec8a347908139fbd733e94ed052f08d28e2c0840ce89cd59961544e5e10106`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144919 - 2026-07-01T14:49:19.330Z

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
- Before snapshot: 674 lines, sha256 `0eec8a347908139fbd733e94ed052f08d28e2c0840ce89cd59961544e5e10106`, captured `2026-07-01T14:29:58.256Z`
- After snapshot: 774 lines, sha256 `a903269b6de9d5197caf5e81f1f1d3b29963caf6a165b2f3ad54775aef35717b`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144919-ComplexTableExampleCard.vue.diff` (1259 diff lines, sha256 `2cb7291e82b41dd088537b344902596f92287b192a7b725c3c05b0ae60385286`)
- Follow-up: none
