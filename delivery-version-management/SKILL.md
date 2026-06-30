---
name: delivery-version-management
description: "[原型阶段] 本阶段版本仅服务报表/页面原型设计、可运行原型、模板和原型验收；不承接技术方案、后端实现、前端正式接入或测试执行。用于报表项目交付物版本管理、交付物索引、版本链路和迭代追踪。用户提到版本化交付、原型/API/数据模型/后端/前端/测试报告版本对应关系、交付物索引、版本对齐、迭代记录、发布包清单、哪个文档对应哪个版本时触发；不负责生成各交付物正文。"
---

# Delivery Version Management

## Stage Scope

Classification: 原型阶段.

Use this copy only inside the prototype skill bundle. Treat technical solution, backend, frontend delivery, and testing work as downstream handoff artifacts or blockers, not as implementation steps to execute from this skill.

## Overview

Use this skill as a required report-development memory ledger. Every configured report project must keep a root `DELIVERY_INDEX.md` that links prototype, requirements, API docs, data models, backend, frontend, test reports, automation, defects, and release notes across iterations. Use `$code-change-ledger-management` for reusable file-level code change ledger discipline on frontend, backend, and runnable prototype source code.

The goal is to answer: "Which version of each artifact belongs together, what changed last time, and what must the next model know before editing again?"

## Inputs

- Configured report project root and its `DELIVERY_INDEX.md`.
- Artifact folders/files, current version naming, PRD/prototype/API/model/frontend/backend/test documents, release notes, branch/commit, environment, or defect reports.
- Optional: target version, release date, owner, status, dependency chain, and change request IDs.
- Frontend/backend/prototype source code paths when the delivery index must link to per-file ledgers, changed code ranges, or implementation traceability.

Use `$delivery-artifact-template-management` when producing the delivery index table. Use `scripts/build_delivery_index.py` to create a first-pass index from files.
Use `scripts/update_delivery_index.py --stage before` before editing an existing report project; it reads or initializes `DELIVERY_INDEX.md` and prints the recent change history. Use `scripts/update_delivery_index.py --stage after` after modifications to append the current change, validation, data-summary, and handoff record.
Use `$code-change-ledger-management` when source code is created, edited, repaired, or refactored.

## Reference Loading

- Code-file ledger structure and sidecar expectations: `references/code-file-change-ledger.md` when the delivery index must link changed frontend/backend/prototype source files to file-level ledgers.

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

0. Read the existing version file before changing a report project.
   In the configured report project root, read `DELIVERY_INDEX.md` before editing PRD/config/template/data/source files. If it is missing, create the initial index first and record that no prior version history was available. Do not rely on chat history as the version record.

1. Define version chain.
   Use a stable chain such as `requirement-v1 -> prototype-v1 -> model-v1 -> api-v1 -> backend-v1 -> frontend-v1 -> test-v1 -> release-v1`. Keep patch/minor versions when one artifact updates without full-cycle redesign.

2. Inventory artifacts.
   List every artifact path, type, version, owner, source date, status, and related change IDs. Mark missing or stale artifacts.

3. Link dependencies.
   Connect each artifact to upstream/downstream versions. For example, `frontend-v2` consumes `api-v2` and is validated by `test-v2`.

4. Record compatibility.
   Mark compatible, partial, breaking, deprecated, or blocked. Breaking changes must record affected artifacts, required owner updates, and blocking gaps through `gap-ledger-management`, then update this delivery index.

5. Define release bundle.
   State exactly which artifacts belong in the current delivery package and which remain draft/obsolete.

6. Maintain index.
   Update the index after every approved change, test result, defect repair, prototype configuration change, data-binding change, validation run, handoff, or release. Do not overwrite history; append a new row to `## Change History` and update current artifact status only when evidence supports it.

7. Link code file ledgers when code changes.
   For every scoped frontend/backend/prototype code file, apply `$code-change-ledger-management`, then link the sidecar ledger status and changed ranges in the delivery index.

8. Preserve next-change memory.
   The final version entry must state changed files, affected pages/blocks/slots/components, data/API/filter/conclusion impacts, validation commands, `docs/prototype-data-summary.md` status, sidecar code-ledger status, known gaps, and what the next model must read before continuing.

## Script

Create a first-pass Markdown index:

```bash
python3 delivery-version-management/scripts/build_delivery_index.py <artifact-root> --out DELIVERY_INDEX.md
```

Use `--version release-v1` to stamp a target bundle version.

Read or initialize the project version index before editing:

```bash
python3 delivery-version-management/scripts/update_delivery_index.py --root <configured-project-root> --stage before
```

Append the post-change record after editing:

```bash
python3 delivery-version-management/scripts/update_delivery_index.py --root <configured-project-root> --stage after --summary "<change summary>" --changed-files "<paths>" --validation "<commands/results>"
```

Create or append a per-code-file ledger:

```bash
python3 delivery-version-management/scripts/update_code_change_ledger.py --file <code-file> --stage before
python3 delivery-version-management/scripts/update_code_change_ledger.py --file <code-file> --stage after --summary "<change summary>" --ranges "L10-L42"
```

## Required Output

- Version chain: requirement/prototype/model/API/backend/frontend/test/release mapping.
- Existing version-file read proof: `DELIVERY_INDEX.md` path, read/initialized status, last known change, and stale or missing rows.
- Delivery artifact index: artifact type, name, version, path, owner, status, upstream/downstream versions, change IDs, evidence.
- Change history entry appended after modification: summary, changed files, impacted report pages/blocks/slots/components, data/API/filter/conclusion impacts, validation, `docs/prototype-data-summary.md` status, ledger status, next-change notes.
- Code file change ledger status when code changed: changed code file, sidecar ledger path, pre-change read evidence, appended version, changed code ranges, verification, and unresolved follow-up.
- Compatibility and freshness check: stale, missing, obsolete, breaking, partial, or ready.
- Release bundle: included artifacts, excluded drafts, required approvals, rollout/rollback notes.
- Follow-up actions: missing versions, required updates, owner workflows, and blockers.

## Quality Checklist

- Every delivery artifact has type, version, path/source, owner, and status.
- A report project change is not ready unless existing `DELIVERY_INDEX.md` was read before editing or initialized before the first edit.
- A report project change is not ready unless `DELIVERY_INDEX.md` has a post-change `## Change History` entry for the current work.
- Version relationships are explicit and not inferred silently.
- Test reports and automation runs point to the exact frontend/backend/API versions tested.
- Obsolete documents are marked obsolete rather than left ambiguous.
- Breaking or mismatched versions must be recorded in `gap-ledger-management` and reflected in this delivery index before readiness.
- Frontend, backend, and runnable prototype code changes are not version-complete unless every changed scoped code file has a sidecar ledger that was read before edit and appended after edit with feature/code-range/version/verification information.
