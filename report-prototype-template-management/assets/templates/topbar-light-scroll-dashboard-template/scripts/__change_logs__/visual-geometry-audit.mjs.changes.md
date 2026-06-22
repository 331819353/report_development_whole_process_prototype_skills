# Code Change Ledger: scripts/visual-geometry-audit.mjs

- Code file: `scripts/visual-geometry-audit.mjs`
- Ledger file: `scripts/__change_logs__/visual-geometry-audit.mjs.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-06-22T02:23:45.491Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-22T02:23:45.492Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 632 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `d1e0bb1a3ebcf7a7d9b3c8971f9091091944b638c7d0b1d0665511eaaf3485d7`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260622022345 - 2026-06-22T02:23:45.498Z

- Change ID: visual-geometry-audit-script
- Actor: codex
- Change type: create
- Summary: Add automated runtime visual geometry audit script.
- Modified functionality: CLI URL/viewport options, Playwright screenshot capture, DOM overflow detection, text clipping detection, sibling overlap detection, list row squeeze detection, chart squeeze detection, SVG text overlap detection, JSON report output
- Code ranges: L1-L105 CLI/options, L107-L557 browser geometry audit, L558-L631 Playwright runner and report output
- Modified content: Created a Playwright-based geometry audit that measures DOM and chart geometry and emits structured VIS-* findings plus screenshots and geometry-report.json.
- Affected contracts: Runtime visual QA; VIS-* findings; bundled template visual:geometry command
- Verification: node --check scripts/visual-geometry-audit.mjs; npm run visual:geometry -- --help; npm run validate:dashboard; npm run visual:geometry -- --url http://127.0.0.1:5174 --viewports 1365x768 --fail-on none; negative data URL test returned VIS-CONTENT-CLIPPED and VIS-CHART-SQUEEZED
- Rollback note: Remove scripts/visual-geometry-audit.mjs, package.json visual:geometry command, Playwright dependency, and package-lock changes together.
- Related files: package.json, package-lock.json, visual-browser-regression-check, frontend-runtime-qa-validation
- Before snapshot: 0 lines, sha256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`, captured `new file before visual geometry audit change`
- After snapshot: 632 lines, sha256 `d1e0bb1a3ebcf7a7d9b3c8971f9091091944b638c7d0b1d0665511eaaf3485d7`
- Change evidence: sidecar patch `scripts/__change_logs__/patches/v20260622022345-visual-geometry-audit.mjs.diff` (634 diff lines, sha256 `de2ca6b7097fce68bfb369a0fe6838289ee18917c63fba1570e13ee4bd6167b6`)
- Follow-up: none

### v20260622030028 - 2026-06-22T03:00:28Z

- Change ID: runtime-list-chart-geometry
- Actor: codex
- Change type: update
- Summary: Add runtime list-row clipping and axis chart body/plot checks.
- Modified functionality: visual geometry audit thresholds and browser findings
- Code ranges: CLI thresholds; `evaluateGeometry` list row checks; chart body/plot squeeze checks
- Modified content: Added `rowOverflowTolerance` defaulting to `1`, `VIS-LIST-ROW-CLIPPED`, `VIS-LIST-OVERFLOW-HIDDEN`, `VIS-CHART-BODY-SQUEEZED`, and `VIS-CHART-PLOT-SQUEEZED`.
- Affected contracts: `npm run visual:geometry`; runtime visual QA; report component geometry gates
- Verification: node --check scripts/visual-geometry-audit.mjs
- Rollback note: revert this file together with sibling template visual geometry scripts and validator contract changes.
- Related files: scripts/validate-dashboard-contract.mjs
- Follow-up: none

### v20260622035051 - 2026-06-22T03:50:51Z

- Change ID: runtime-chart-container-geometry
- Actor: codex
- Change type: update
- Summary: Add runtime detection for narrow and short axis chart containers.
- Modified functionality: visual geometry audit thresholds and chart findings
- Code ranges: CLI thresholds; chart container checks inside evaluateGeometry
- Modified content: Added min/warning axis chart container width and height thresholds, `VIS-CHART-CONTAINER-NARROW`, `VIS-CHART-CONTAINER-SHORT`, and squeeze-risk strategy metadata detection before chart body/plot checks.
- Affected contracts: `npm run visual:geometry`; runtime visual QA; chart squeeze-prevention readiness
- Verification: node --check scripts/visual-geometry-audit.mjs; npm run build:preview
- Rollback note: revert this file together with sibling template visual geometry scripts and validator chart container contract changes.
- Related files: scripts/validate-dashboard-contract.mjs
- Follow-up: none
