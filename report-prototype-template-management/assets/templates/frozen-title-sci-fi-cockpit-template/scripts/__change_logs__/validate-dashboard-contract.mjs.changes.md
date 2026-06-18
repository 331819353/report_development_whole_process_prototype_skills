# Code Change Ledger: scripts/validate-dashboard-contract.mjs

- Code file: `scripts/validate-dashboard-contract.mjs`
- Ledger file: `scripts/__change_logs__/validate-dashboard-contract.mjs.changes.md`
- Purpose: Validate dashboard template contracts before build/preview handoff.
- Primary features: widget contract validation, component-source renderer checks, stack-contract validation.
- Last reviewed before edit: created from repository baseline during v20260618-stack-contract-validator.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| dashboard-contract | Validates config, filters, widgets, and component source rules. | existing validator sections | `src/config/dashboard.config.ts`, `src/widgets/components` | warnings/errors | Existing behavior preserved. |
| stack-contract | Validates Vue 3 + Element Plus + ECharts stack consistency. | `validateStackContract` | `package.json`, `src/main.ts`, `src` source files, widget visualTypes | blocking errors | Added in this change. |

## Version Entries

### v20260618-stack-contract-validator - 2026-06-18

- Change ID: ad-hoc-stack-contract
- Actor: Codex
- Change type: update
- Summary: Added default stack-contract validation so copied template projects cannot drop Element Plus or ECharts while keeping a Vue 3 shell.
- Modified functionality: package dependency checks including axios, Vue 3 bootstrap check, Element Plus registration/style check, source scan for Element Plus runtime usage, ECharts runtime proof when chart visualTypes are present.
- Code ranges: `packagePath/mainEntryPath/srcPath` constants near L3-L8; `requiredStackDependencies`, `chartVisualTypes`, `sourceFileExtensions` near L83-L106; `walkSourceFiles`, `readJsonFile`, `validateStackContract` near L437-L533; `validateStackContract()` call near L1215.
- Modified content: Added stack dependency metadata, source-file walking, JSON parsing, stack validation function, and validator invocation before widget validation.
- Affected contracts: Bundled template stack contract: Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios; ECharts runtime ownership for standard chart widgets.
- Verification: `npm run validate:dashboard` passed in `frozen-title-sci-fi-cockpit-template`.
- Rollback note: Remove the added stack constants, helper functions, and `validateStackContract()` call to return to dashboard-only validation.
- Related files: `report-prototype-template-management/SKILL.md`, `references/template-routing-and-implementation-gates.md`, `references/template-shared-contract.md`, `references/template-recipes-checklist.md`.
- Before snapshot: repository baseline `HEAD`, 1105 lines, sha256 `078723e557c88f782ec96bece3e83ecc93a1d4fdde080f302f36acf4ce16b0af`.
- After snapshot: working tree, 1229 lines, sha256 `78265fae5d8efb91de70c30b80d78299963ed268df1ffbb02aaf9561e9ab9d45`.
- Change evidence: `git diff -- report-prototype-template-management/assets/templates/frozen-title-sci-fi-cockpit-template/scripts/validate-dashboard-contract.mjs` shows the added constants, helpers, stack validator, and invocation.
- Follow-up: If the project adopts a dedicated ECharts wrapper such as `VueECharts`, add its import signature to `hasEchartsRuntime` if not already matched.
