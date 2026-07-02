# Code Change Ledger: src\widgets\templates\component-examples\CustomEChartComponentTemplate.vue

- Code file: `src\widgets\templates\component-examples\CustomEChartComponentTemplate.vue`
- Ledger file: `src\widgets\templates\component-examples\__change_logs__\CustomEChartComponentTemplate.vue.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T14:29:56.430Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T14:29:56.432Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1015 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `a762832fc0056a571165a01c63ccf957689c5c67526c83f8fef625ff674470a7`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701144917 - 2026-07-01T14:49:17.619Z

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
- Before snapshot: 1015 lines, sha256 `a762832fc0056a571165a01c63ccf957689c5c67526c83f8fef625ff674470a7`, captured `2026-07-01T14:29:56.438Z`
- After snapshot: 1016 lines, sha256 `587de48b4482a525a49282125525523fdc83c3a42a626e27d2eb89e60a854e81`
- Change evidence: sidecar patch `src\widgets\templates\component-examples\__change_logs__\patches\v20260701144917-CustomEChartComponentTemplate.vue.diff` (1042 diff lines, sha256 `161148a8794960fae21bb382201e12b56281ece94b3c31ff1f59f72be4a9ee61`)
- Follow-up: none
