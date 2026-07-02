# Code Change Ledger: src/utils/request.ts

- Code file: `src/utils/request.ts`
- Ledger file: `src/utils/__change_logs__/request.ts.changes.md`
- Purpose: Initialized bundled-template baseline. Fill in project-specific ownership after copying/configuring the template.
- Primary features: template baseline
- Last reviewed before edit: template initialization
- Process-record policy: internal template-development history is intentionally omitted from bundled templates.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| TEMPLATE-BASELINE | Current bundled template behavior | 127 lines | project configuration | runnable template source | Replace with project-specific inventory after the first real edit. |

## Version Entries

### template-initialized

- Change ID: template-baseline
- Actor: template
- Change type: baseline
- Summary: Clean baseline record for a newly copied report template.
- Modified functionality: none
- Code ranges: current file snapshot, 127 lines
- Modified content: none
- Affected contracts: none
- Verification: current template snapshot sha256 `7c20609a37e8bd4d3867d29ba2f52d5a83f5f1a8c49b3bc4d66cca7eed119417`; run `npm run ledger:code -- --file src/utils/request.ts --stage before` before the first project-specific edit.
- Rollback note: restore this file from the bundled template or project VCS.
- Related files: none
- Change evidence: baseline only; no project-specific change has been recorded yet.
- Follow-up: append project-specific entries after the first real change.

### v20260701151504 - 2026-07-01T15:15:04.381Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Apply legend placement, block span, summary ratio, and mock API defaults
- Modified functionality: ConclusionExampleCard core centering; proportion/radar/sunburst legend defaults; layout span minimum rows; block summary ratio; mock API proxy configuration
- Code ranges: ConclusionExampleCard core style; chart legend config/scale/option; layoutGridContract and validate-dashboard span rules; getPlaceholderCellInnerStyle and has-body-summary CSS; projectLayoutRows; dev-with-mock-api env; vite proxy; axios request client; env.d.ts
- Modified content: Centered conclusion core copy vertically, defaulted proportion/radar/sunburst legends to right-side placement, enforced minimum 3-row block spans with summary area at 1/(N+1), and moved mock API proxy targeting from VITE_API_BASE_URL to non-client MOCK_API_BASE_URL while keeping requests on relative /api.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5183/
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 127 lines, sha256 `7c20609a37e8bd4d3867d29ba2f52d5a83f5f1a8c49b3bc4d66cca7eed119417`, captured `2026-07-01T15:01:49.473Z`
- After snapshot: 126 lines, sha256 `450c0b0e51297095ace234c5f8f6340d1556cf0025508675687ce2d05e1d55bc`
- Change evidence: inline unified diff:

```diff
--- a/src/utils/request.ts
+++ b/src/utils/request.ts
@@ -4,51 +4,50 @@
 import { login } from './login';
 
 const service = axios.create({
-  baseURL: import.meta.env.VITE_API_BASE_URL || undefined,
-  timeout: 15000,
-});
-
-const REQUEST_ERROR_MESSAGE_COOLDOWN_MS = 6000;
-const lastRequestErrorMessageAt = new Map<string, number>();
-
-const getRequestUrl = (error: AxiosError) => {
-  const requestUrl = error.config?.url ?? error.request?.responseURL;
-
-  return typeof requestUrl === 'string' && requestUrl.length > 0 ? requestUrl : 'unknown request';
-};
-
-const showRequestError = (dedupeKey: string, message: string) => {
-  const now = Date.now();
-  const lastShownAt = lastRequestErrorMessageAt.get(dedupeKey) ?? 0;
-
-  if (now - lastShownAt < REQUEST_ERROR_MESSAGE_COOLDOWN_MS) {
-    return;
-  }
-
-  lastRequestErrorMessageAt.set(dedupeKey, now);
-  ElMessage.error({
-    message,
-    duration: 4200,
-    grouping: true,
-  });
-};
-
-const buildErrorMessage = (error: AxiosError) => {
-  const status = error.response?.status;
-  const requestUrl = getRequestUrl(error);
-  const isApiRequest = requestUrl.includes('/api/');
-
-  if (status === 429) {
-    return {
-      key: 'http-429',
-      message: 'Too many requests. Please slow down and try again.',
-    };
-  }
-
-  if (!status && isApiRequest) {
-    return {
-      key: 'api-unavailable',
-      message: 'Data service is unavailable. Start with npm run dev:mock or check VITE_API_BASE_URL.',
+  timeout: 15000,
+});
+
+const REQUEST_ERROR_MESSAGE_COOLDOWN_MS = 6000;
+const lastRequestErrorMessageAt = new Map<string, number>();
+
+const getRequestUrl = (error: AxiosError) => {
+  const requestUrl = error.config?.url ?? error.request?.responseURL;
+
+  return typeof requestUrl === 'string' && requestUrl.length > 0 ? requestUrl : 'unknown request';
+};
+
+const showRequestError = (dedupeKey: string, message: string) => {
+  const now = Date.now();
+  const lastShownAt = lastRequestErrorMessageAt.get(dedupeKey) ?? 0;
+
+  if (now - lastShownAt < REQUEST_ERROR_MESSAGE_COOLDOWN_MS) {
+    return;
+  }
+
+  lastRequestErrorMessageAt.set(dedupeKey, now);
+  ElMessage.error({
+    message,
+    duration: 4200,
+    grouping: true,
+  });
+};
+
+const buildErrorMessage = (error: AxiosError) => {
+  const status = error.response?.status;
+  const requestUrl = getRequestUrl(error);
+  const isApiRequest = requestUrl.includes('/api/');
+
+  if (status === 429) {
+    return {
+      key: 'http-429',
+      message: 'Too many requests. Please slow down and try again.',
+    };
+  }
+
+  if (!status && isApiRequest) {
+    return {
+      key: 'api-unavailable',
+      message: 'Data service is unavailable. Start with npm run dev:mock or check the /api proxy.',
     };
   }
```
- Follow-up: none
