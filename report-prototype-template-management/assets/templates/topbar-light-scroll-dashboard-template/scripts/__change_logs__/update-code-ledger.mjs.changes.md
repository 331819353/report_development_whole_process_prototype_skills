# Code Change Ledger: scripts/update-code-ledger.mjs

- Code file: `scripts/update-code-ledger.mjs`
- Ledger file: `scripts/__change_logs__/update-code-ledger.mjs.changes.md`
- Purpose: Initialized bundled-template baseline. Fill in project-specific ownership after copying/configuring the template.
- Primary features: template baseline
- Last reviewed before edit: template initialization
- Process-record policy: internal template-development history is intentionally omitted from bundled templates.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| TEMPLATE-BASELINE | Current bundled template behavior | 317 lines | project configuration | runnable template source | Replace with project-specific inventory after the first real edit. |

## Version Entries

### template-initialized

- Change ID: template-baseline
- Actor: template
- Change type: baseline
- Summary: Clean baseline record for a newly copied report template.
- Modified functionality: none
- Code ranges: current file snapshot, 317 lines
- Modified content: none
- Affected contracts: none
- Verification: current template snapshot sha256 `cd7c22ea0ae2d472d1b7bcaad7a6641c1774894d49386e6b3cced21aec6d574d`; run `npm run ledger:code -- --file scripts/update-code-ledger.mjs --stage before` before the first project-specific edit.
- Rollback note: restore this file from the bundled template or project VCS.
- Related files: none
- Change evidence: baseline only; no project-specific change has been recorded yet.
- Follow-up: append project-specific entries after the first real change.
