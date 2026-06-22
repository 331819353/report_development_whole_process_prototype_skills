# Code Change Ledger: package.json

- Code file: `package.json`
- Ledger file: `__change_logs__/package.json.changes.md`
- Purpose: Vue3 standard project structure refactor baseline
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T12:42:34.353Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-11T12:42:34.354Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 30 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `f3fd138c9d79c8551344c756309bef6f94d5f0f88cdf3259b2620a0639f9bec4`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611125158 - 2026-06-11T12:51:58.210Z

- Change ID: vue3-standard-structure-refactor
- Actor: codex
- Change type: refactor
- Summary: Refactored template into the standard Vue3 TypeScript Vite project structure with router, Pinia store, Axios request wrapper, env files, Sass style entry, and preview build compatibility.
- Modified functionality: project structure, app bootstrap, routing, store, request layer, style entry, template docs
- Code ranges: full file
- Modified content: standard Vue3 project scaffolding and imports
- Affected contracts: Vue3 project directory contract; dashboard template data-source contract preserved
- Verification: npm run build:preview passed for all four templates
- Rollback note: revert the structure refactor and package dependency updates together
- Related files: package.json, vite.config.ts, tsconfig.json, src/main.ts, src/App.vue, src/router, src/stores, src/utils, src/views, src/styles
- File snapshot: 37 lines, sha256 `d4456643e589601f524834a5e9cd506e6109abebefc42a0e5d692ae53c5e6953`
- Follow-up: none

### v20260622021816 - 2026-06-22T02:18:16.043Z

- Change ID: visual-geometry-audit-command
- Actor: codex
- Change type: update
- Summary: Add visual geometry audit command and Playwright dependency.
- Modified functionality: scripts.visual:geometry, devDependencies.playwright
- Code ranges: L6-L17 scripts, L34-L37 devDependencies
- Modified content: Added visual:geometry npm command and Playwright devDependency for runtime DOM/chart geometry audit.
- Affected contracts: Bundled template runtime visual QA; visual geometry audit command; package-lock dependency graph
- Verification: node --check scripts/visual-geometry-audit.mjs; npm run visual:geometry -- --help; npm run validate:dashboard; topbar runtime visual geometry positive and negative checks
- Rollback note: Remove scripts.visual:geometry, Playwright devDependency, package-lock changes, and scripts/visual-geometry-audit.mjs together.
- Related files: package-lock.json, scripts/visual-geometry-audit.mjs
- Before snapshot: 37 lines, sha256 `d4456643e589601f524834a5e9cd506e6109abebefc42a0e5d692ae53c5e6953`, captured `git HEAD before visual geometry audit change`
- After snapshot: 39 lines, sha256 `04ae53c76d870f73e1fc246b8d79a58e7aa7c0074987061c20a96a3bac02fd9e`
- Change evidence: inline unified diff:

```diff
--- a/package.json
+++ b/package.json
@@ -7,6 +7,7 @@
     "dev": "vite --mode development --host 0.0.0.0",
     "dev:auto": "node scripts/start-available-port.mjs --mode dev",
     "validate:dashboard": "node scripts/validate-dashboard-contract.mjs",
+    "visual:geometry": "node scripts/visual-geometry-audit.mjs",
     "ledger:code": "node scripts/update-code-ledger.mjs",
     "build": "npm run build:prod",
     "build:preview": "npm run validate:dashboard && vue-tsc --noEmit && vite build --mode preview",
@@ -31,6 +32,7 @@
     "vue-tsc": "^2.1.10"
   },
   "devDependencies": {
-    "@types/node": "^25.9.1"
+    "@types/node": "^25.9.1",
+    "playwright": "^1.61.0"
   }
 }
```
- Follow-up: none
