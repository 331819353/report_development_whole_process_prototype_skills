# Code Change Ledger: src/data/dashboard.dataset.json

- Code file: `src/data/dashboard.dataset.json`
- Ledger file: `src/data/__change_logs__/dashboard.dataset.json.changes.md`
- Purpose: Initialized bundled-template baseline. Fill in project-specific ownership after copying/configuring the template.
- Primary features: template baseline
- Last reviewed before edit: template initialization
- Process-record policy: internal template-development history is intentionally omitted from bundled templates.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| TEMPLATE-BASELINE | Current bundled template behavior | 2216 lines | project configuration | runnable template source | Replace with project-specific inventory after the first real edit. |

## Version Entries

### template-initialized

- Change ID: template-baseline
- Actor: template
- Change type: baseline
- Summary: Clean baseline record for a newly copied report template.
- Modified functionality: none
- Code ranges: current file snapshot, 2216 lines
- Modified content: none
- Affected contracts: none
- Verification: current template snapshot sha256 `ad1bbdebb46e67477ff0a88d140734f21d2c41ecfebe442ecac824fd704de623`; run `npm run ledger:code -- --file src/data/dashboard.dataset.json --stage before` before the first project-specific edit.
- Rollback note: restore this file from the bundled template or project VCS.
- Related files: none
- Change evidence: baseline only; no project-specific change has been recorded yet.
- Follow-up: append project-specific entries after the first real change.

### v20260701142034 - 2026-07-01T14:20:34.477Z

- Change ID: ad-hoc
- Actor: codex
- Change type: update
- Summary: Add mock props for overview three-slot launch blocks
- Modified functionality: businessData.componentProps overview.A-C
- Code ranges: businessData.componentProps overview.A.A through overview.C.C
- Modified content: Updated overview A/B/C component prop rows and added mock API rows for new slot keys.
- Affected contracts: none
- Verification: npm run validate:dashboard; npm run build:test; npm run visual:geometry -- --url http://127.0.0.1:5193/; mock API smoke /api/health and /api/component-props/overview.C.C
- Rollback note: revert this file and listed related files together if needed
- Related files: none
- Before snapshot: 2216 lines, sha256 `ad1bbdebb46e67477ff0a88d140734f21d2c41ecfebe442ecac824fd704de623`, captured `2026-07-01T14:10:50.482Z`
- After snapshot: 2342 lines, sha256 `371e7a4c2f4132db30856997defab577808ae05e3d7c9abbcc4b07feb7e4fffa`
- Change evidence: inline unified diff:

```diff
--- a/src/data/dashboard.dataset.json
+++ b/src/data/dashboard.dataset.json
@@ -326,122 +326,248 @@
       },
       "overview.A.B": {
         "key": "overview.A.B",
-        "componentType": "KpiMetricExampleCard",
-        "visualType": "metric-card",
-        "props": {
-          "title": "经营利润",
-          "value": 2460,
-          "unit": "万",
-          "tone": "success",
-          "accessoryMetrics": [
-            {
-              "label": "同比",
-              "value": "+9.4%",
-              "tone": "success"
-            }
-          ],
-          "sparkValues": [
-            18,
-            19,
-            21,
-            22,
-            24,
-            25
-          ]
-        },
-        "legacyKey": "KpiMetricExampleCard:经营利润"
-      },
-      "overview.A.C": {
-        "key": "overview.A.C",
-        "componentType": "KpiMetricExampleCard",
-        "visualType": "metric-card",
-        "props": {
-          "title": "经营现金流",
-          "value": 3180,
-          "unit": "万",
-          "tone": "warning",
-          "accessoryMetrics": [
-            {
-              "label": "回款达成",
-              "value": "88.4%",
-              "tone": "warning",
-              "icon": "clock"
-            }
-          ],
-          "sparkValues": [
-            21,
-            26,
-            24,
-            28,
-            31,
-            32
-          ]
-        },
-        "legacyKey": "KpiMetricExampleCard:经营现金流"
-      },
-      "overview.B.A": {
-        "key": "overview.B.A",
-        "componentType": "TargetProgressExampleCard",
-        "visualType": "metric-card",
-        "props": {
-          "title": "收入达成率",
-          "value": 92.4,
-          "valueSuffix": "%",
-          "targetValue": 100,
-          "currentValue": 92.4,
-          "gapValue": 7.6,
-          "tone": "primary",
-          "details": [
-            {
-              "label": "年度目标",
-              "value": "100%",
-              "icon": "target"
-            },
-            {
-              "label": "当前达成",
-              "value": "92.4%",
-              "icon": "current"
-            },
-            {
-              "label": "缺口",
-              "value": "7.6%",
-              "icon": "gap"
-            }
-          ]
-        },
-        "legacyKey": "TargetProgressExampleCard:收入达成率"
-      },
-      "overview.C.A": {
-        "key": "overview.C.A",
-        "componentType": "ConclusionExampleCard",
-        "visualType": "text-summary",
-        "props": {
-          "title": "本期判断",
-          "conclusion": "项目收入保持增长，但华北工程客户拖累利润与现金流。",
-          "emphasis": "增长质量分化",
-          "statusLabel": "经营判断",
-          "statusTone": "warning",
-          "evidenceItems": [
-            {
-              "label": "收入同比",
-              "value": "+12.6%",
-              "tone": "success"
-            },
-            {
-              "label": "华北毛利率",
-              "value": "18.8%",
-              "tone": "warning"
-            }
-          ],
-          "actionItems": [
-            {
-              "label": "优先动作",
-              "value": "锁定华北回款与交付节点",
-              "tone": "warning"
-            }
-          ]
-        },
-        "legacyKey": "ConclusionExampleCard:本期判断"
+        "componentType": "RankingListExampleCard",
+        "visualType": "ranking-list",
+        "props": {
+          "title": "区域贡献",
+          "unit": "万",
+          "valueUnit": "万",
+          "items": [
+            {
+              "name": "华东",
+              "value": 3860,
+              "delta": "+14.8%"
+            },
+            {
+              "name": "海外",
+              "value": 3120,
+              "delta": "+11.5%"
+            },
+            {
+              "name": "华南",
+              "value": 2480,
+              "delta": "+6.2%"
+            }
+          ]
+        },
+        "legacyKey": "RankingListExampleCard:区域贡献"
+      },
+      "overview.A.C": {
+        "key": "overview.A.C",
+        "componentType": "ProportionChartExampleCard",
+        "visualType": "pie",
+        "props": {
+          "title": "图表区",
+          "unit": "%",
+          "totalLabel": "收入结构",
+          "items": [
+            {
+              "name": "线上直营",
+              "value": 42
+            },
+            {
+              "name": "门店零售",
+              "value": 28
+            },
+            {
+              "name": "工程客户",
+              "value": 18
+            },
+            {
+              "name": "海外直营",
+              "value": 12
+            }
+          ]
+        },
+        "legacyKey": "ProportionChartExampleCard:图表区"
+      },
+      "overview.B.A": {
+        "key": "overview.B.A",
+        "componentType": "TargetProgressExampleCard",
+        "visualType": "metric-card",
+        "props": {
+          "title": "达成率",
+          "unit": "%",
+          "value": 92.4,
+          "valueSuffix": "%",
+          "targetValue": 100,
+          "currentValue": 92.4,
+          "gapValue": 7.6,
+          "tone": "primary",
+          "details": [
+            {
+              "label": "年度目标",
+              "value": "100%",
+              "icon": "target"
+            },
+            {
+              "label": "当前达成",
+              "value": "92.4%",
+              "icon": "current"
+            },
+            {
+              "label": "缺口",
+              "value": "7.6%",
+              "icon": "gap"
+            }
+          ]
+        },
+        "legacyKey": "TargetProgressExampleCard:收入达成率"
+      },
+      "overview.B.B": {
+        "key": "overview.B.B",
+        "componentType": "ActionListExampleCard",
+        "visualType": "action-recommendation-card",
+        "props": {
+          "title": "关键动作",
+          "unit": "项",
+          "items": [
+            {
+              "label": "华北工程客户回款专项会",
+              "owner": "赵岩",
+              "due": "今日",
+              "status": "待处理",
+              "tone": "danger"
+            },
+            {
+              "label": "华南门店样机结构复盘",
+              "owner": "陈卓",
+              "due": "明日",
+              "status": "推进中",
+              "tone": "warning"
+            }
+          ]
+        },
+        "legacyKey": "ActionListExampleCard:关键动作"
+      },
+      "overview.B.C": {
+        "key": "overview.B.C",
+        "componentType": "RadarChartExampleCard",
+        "visualType": "radar",
+        "props": {
+          "title": "健康度",
+          "unit": "分",
+          "indicators": [
+            "增长",
+            "毛利",
+            "履约",
+            "回款",
+            "库存"
+          ],
+          "values": [
+            86,
+            78,
+            82,
+            72,
+            68
+          ]
+        },
+        "legacyKey": "RadarChartExampleCard:健康度"
+      },
+      "overview.C.A": {
+        "key": "overview.C.A",
+        "componentType": "ConclusionExampleCard",
+        "visualType": "text-summary",
+        "props": {
+          "title": "本期判断",
+          "conclusion": "项目收入保持增长，但华北工程客户拖累利润与现金流。",
+          "emphasis": "增长质量分化",
+          "statusLabel": "经营判断",
+          "statusTone": "warning",
+          "evidenceItems": [
+            {
+              "label": "收入同比",
+              "value": "+12.6%",
+              "tone": "success"
+            },
+            {
+              "label": "华北毛利率",
+              "value": "18.8%",
+              "tone": "warning"
+            }
+          ],
+          "actionItems": [
+            {
+              "label": "优先动作",
+              "value": "锁定华北回款与交付节点",
+              "tone": "warning"
+            }
+          ]
+        },
+        "legacyKey": "ConclusionExampleCard:本期判断"
+      },
+      "overview.C.B": {
+        "key": "overview.C.B",
+        "componentType": "RankingListExampleCard",
+        "visualType": "ranking-list",
+        "props": {
+          "title": "证据清单",
+          "unit": "万",
+          "valueUnit": "万",
+          "items": [
+            {
+              "name": "线上直营",
+              "value": 4620,
+              "delta": "+18.4%"
+            },
+            {
+              "name": "海外直营",
+              "value": 3120,
+              "delta": "+11.5%"
+            },
+            {
+              "name": "工程客户",
+              "value": 1510,
+              "delta": "-3.4%"
+            }
+          ]
+        },
+        "legacyKey": "RankingListExampleCard:证据清单"
+      },
+      "overview.C.C": {
+        "key": "overview.C.C",
+        "componentType": "ComboChartExampleCard",
+        "visualType": "combo",
+        "props": {
+          "title": "图表区",
+          "unit": "万/%",
+          "categories": [
+            "华东",
+            "华南",
+            "华北",
+            "海外"
+          ],
+          "series": [
+            {
+              "name": "收入",
+              "type": "bar",
+              "values": [
+                3860,
+                2480,
+                1960,
+                3120
+              ]
+            },
+            {
+              "name": "毛利率",
+              "type": "line",
+              "values": [
+                29.6,
+                22.4,
+                18.8,
+                27.3
+              ]
+            }
+          ],
+          "auxMetrics": [
+            {
+              "label": "平均毛利率",
+              "value": "24.8%",
+              "tone": "primary"
+            }
+          ]
+        },
+        "legacyKey": "ComboChartExampleCard:图表区"
       },
       "overview.D.A": {
         "key": "overview.D.A",
```
- Follow-up: none
