# Code Change Ledger: demo/config-templates.ts

- Code file: `demo/config-templates.ts`
- Ledger file: `demo/__change_logs__/config-templates.ts.changes.md`
- Purpose: Initialized bundled-template baseline. Fill in project-specific ownership after copying/configuring the template.
- Primary features: template baseline
- Last reviewed before edit: template initialization
- Process-record policy: internal template-development history is intentionally omitted from bundled templates.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| TEMPLATE-BASELINE | Current bundled template behavior | 542 lines | project configuration | runnable template source | Replace with project-specific inventory after the first real edit. |

## Version Entries

### template-initialized

- Change ID: template-baseline
- Actor: template
- Change type: baseline
- Summary: Clean baseline record for a newly copied report template.
- Modified functionality: none
- Code ranges: current file snapshot, 542 lines
- Modified content: none
- Affected contracts: none
- Verification: current template snapshot sha256 `a41f1d47690cc37117971457fbbc78ce72ebfd082c833a857e66252793ccf409`; run `npm run ledger:code -- --file demo/config-templates.ts --stage before` before the first project-specific edit.
- Rollback note: restore this file from the bundled template or project VCS.
- Related files: none
- Change evidence: baseline only; no project-specific change has been recorded yet.
- Follow-up: append project-specific entries after the first real change.
