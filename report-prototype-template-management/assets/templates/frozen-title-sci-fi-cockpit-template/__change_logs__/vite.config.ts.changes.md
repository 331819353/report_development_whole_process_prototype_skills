# Code Change Ledger: vite.config.ts

- Code file: `vite.config.ts`
- Ledger file: `__change_logs__\vite.config.ts.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-07-01T15:02:00.199Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-07-01T15:02:00.200Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 61 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `5f1c29fe1da04d16272ed2dde31994d12c5f3fbef18d136db5f650572a4a6cef`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260701151515 - 2026-07-01T15:15:15.290Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Apply legend placement, block span, summary ratio, and mock API defaults
- Modified functionality: ConclusionExampleCard core centering; proportion/radar/sunburst legend defaults; layout span minimum rows; block summary ratio; mock API proxy configuration
- Code ranges: ConclusionExampleCard core style; chart legend config/scale/option; layoutGridContract and validate-dashboard span rules; getPlaceholderCellInnerStyle and has-body-summary CSS; projectLayoutRows; dev-with-mock-api env; vite proxy; axios request client; env.d.ts
- Modified content: Centered conclusion core copy vertically, defaulted proportion/radar/sunburst legends to right-side placement, enforced minimum 3-row block spans with summary area at 1/(N+1), and moved mock API proxy targeting from VITE_API_BASE_URL to non-client MOCK_API_BASE_URL while keeping requests on relative /api.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 61 lines, sha256 `5f1c29fe1da04d16272ed2dde31994d12c5f3fbef18d136db5f650572a4a6cef`, captured `2026-07-01T15:02:00.202Z`
- After snapshot: 61 lines, sha256 `25bd3c29bfad014d399a3a9b44ca0df82c82cc4c1798a4b5e5f4eb10abe91008`
- Change evidence: inline unified diff:

```diff
--- a/vite.config.ts
+++ b/vite.config.ts
@@ -15,31 +15,31 @@
 
 export default defineConfig(({ mode }) => {
   const envConfig = loadEnv(mode, process.cwd(), '');
-  const apiBaseUrl = envConfig.VITE_API_BASE_URL;
-
-  return {
-    base: './',
-    plugins: [vue()],
-    define: {
-      'process.env': {},
-    },
-    resolve: {
-      alias: {
-        '@': fileURLToPath(new URL('./src', import.meta.url)),
-      },
-    },
-    css: {
-      preprocessorOptions: {
-        scss: {
-          additionalData: '@use "@/styles/global.scss" as *;\n',
-        },
-      },
-    },
-    server: {
-      proxy: apiBaseUrl
-        ? {
-            '/api': {
-              target: apiBaseUrl,
+  const mockApiBaseUrl = process.env.MOCK_API_BASE_URL || envConfig.MOCK_API_BASE_URL;
+
+  return {
+    base: './',
+    plugins: [vue()],
+    define: {
+      'process.env': {},
+    },
+    resolve: {
+      alias: {
+        '@': fileURLToPath(new URL('./src', import.meta.url)),
+      },
+    },
+    css: {
+      preprocessorOptions: {
+        scss: {
+          additionalData: '@use "@/styles/global.scss" as *;\n',
+        },
+      },
+    },
+    server: {
+      proxy: mockApiBaseUrl
+        ? {
+            '/api': {
+              target: mockApiBaseUrl,
               changeOrigin: true,
             },
           }
```
- Follow-up: none
