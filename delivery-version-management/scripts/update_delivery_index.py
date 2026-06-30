#!/usr/bin/env python3
"""Read/initialize and append report delivery version index entries.

The default project-level index is:
<configured-project-root>/DELIVERY_INDEX.md
"""

from __future__ import annotations

import argparse
import datetime as dt
from pathlib import Path


REQUIRED_SECTIONS = [
    "# Delivery Index",
    "## Artifact Index",
    "## Version Chain",
    "## Change History",
]


def now_stamp() -> str:
    return dt.datetime.now(dt.timezone.utc).astimezone().strftime("%Y-%m-%d %H:%M:%S %z")


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, text: str) -> None:
    path.write_text(text, encoding="utf-8")


def index_path_for(root: Path, index_arg: str) -> Path:
    index_path = Path(index_arg).expanduser()
    if not index_path.is_absolute():
        index_path = root / index_path
    return index_path.resolve()


def default_index(project_name: str, version: str, actor: str) -> str:
    timestamp = now_stamp()
    return f"""# Delivery Index

- Project: {project_name}
- Created at: {timestamp}
- Current release version: {version}
- Ledger rule: read this file before editing the report project; append a change entry after every scoped modification.

## Artifact Index

| Artifact ID | Type | Name | Version | Path/source | Owner | Status | Upstream version | Downstream version | Change IDs | Evidence | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| artifact-001 | prototype | Configured report project | {version} | . | {actor} | draft | PRD/current | pending validation | baseline | initialized delivery index | Fill exact artifact rows as the project evolves. |

## Version Chain

| Release version | Requirement | Prototype | Data model | API docs | Backend | Frontend | Test matrix/report | Automation | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| {version} | PRD/current | prototype/current | pending | pending | pending | pending | pending | pending | draft |

## Change History

| Time | Version | Change ID | Actor | Summary | Changed files | Impacted report scope | Data/API/filter/conclusion impact | Validation | Prototype data summary | Code ledger status | Next-change notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| {timestamp} | {version} | baseline | {actor} | Initialized delivery index. | DELIVERY_INDEX.md | project | none | not run | docs/prototype-data-summary.md pending | pending | Read this file before the next modification. |
"""


def ensure_sections(text: str, path: Path) -> None:
    missing = [section for section in REQUIRED_SECTIONS if section not in text]
    if missing:
        raise SystemExit(f"[delivery-index] {path} is missing required sections: {', '.join(missing)}")


def read_or_create_index(args: argparse.Namespace, root: Path, index_path: Path) -> str:
    if not index_path.exists():
        text = default_index(root.name, args.version, args.actor)
        write_text(index_path, text)
        print(f"[delivery-index] initialized: {index_path}")
        return text

    text = read_text(index_path)
    ensure_sections(text, index_path)
    print(f"[delivery-index] read before edit: {index_path}")
    return text


def preview_recent_history(text: str, show_lines: int) -> None:
    lines = text.splitlines()
    start = max(0, len(lines) - show_lines)
    print("\n".join(lines[start:]))


def cell(value: str) -> str:
    cleaned = (value or "none").replace("\r", " ").replace("\n", " ").strip()
    return cleaned.replace("|", "\\|") or "none"


def append_after_entry(args: argparse.Namespace, index_path: Path) -> None:
    text = read_text(index_path)
    ensure_sections(text, index_path)

    summary = args.summary.strip()
    if not summary:
        raise SystemExit("[delivery-index] --summary is required for --stage after")

    timestamp = now_stamp()
    row = (
        f"| {cell(timestamp)} | {cell(args.version)} | {cell(args.change_id)} | {cell(args.actor)} | "
        f"{cell(summary)} | {cell(args.changed_files)} | {cell(args.impacted_scope)} | "
        f"{cell(args.data_impact)} | {cell(args.validation)} | {cell(args.prototype_data_summary)} | "
        f"{cell(args.code_ledger_status)} | {cell(args.next_change_notes)} |\n"
    )

    if not text.endswith("\n"):
        text += "\n"
    text += row
    write_text(index_path, text)
    print(f"[delivery-index] appended change entry: {index_path}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Maintain project-level report delivery version index.")
    parser.add_argument("--root", default=".", help="Configured report project root.")
    parser.add_argument("--index", default="DELIVERY_INDEX.md", help="Index path relative to --root.")
    parser.add_argument("--stage", choices=("before", "after"), required=True)
    parser.add_argument("--version", default="release-v1.0")
    parser.add_argument("--change-id", default="ad-hoc")
    parser.add_argument("--actor", default="codex")
    parser.add_argument("--summary", default="")
    parser.add_argument("--changed-files", default="")
    parser.add_argument("--impacted-scope", default="")
    parser.add_argument("--data-impact", default="")
    parser.add_argument("--validation", default="")
    parser.add_argument("--prototype-data-summary", default="docs/prototype-data-summary.md")
    parser.add_argument("--code-ledger-status", default="")
    parser.add_argument("--next-change-notes", default="Read DELIVERY_INDEX.md before continuing.")
    parser.add_argument("--show-lines", type=int, default=80)
    args = parser.parse_args()

    root = Path(args.root).expanduser().resolve()
    if not root.exists():
        raise FileNotFoundError(root)
    index_path = index_path_for(root, args.index)

    if args.stage == "before":
        text = read_or_create_index(args, root, index_path)
        preview_recent_history(text, args.show_lines)
        return 0

    if not index_path.exists():
        raise SystemExit("[delivery-index] missing DELIVERY_INDEX.md; run --stage before before editing")
    append_after_entry(args, index_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
