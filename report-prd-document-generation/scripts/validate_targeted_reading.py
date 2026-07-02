#!/usr/bin/env python3
"""Validate targeted reading analysis files in executable PRD bundles."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


REQUIRED_SECTIONS = [
    "Source Material Inventory",
    "Targeted Reading Plan By Stage",
    "Evidence To Decision Trace",
    "Implementation Critical Reading Notes",
    "Non-Authority And Deferred Items",
    "Downstream Consumption Matrix",
    "Readiness Gate",
]

BANNED_GENERIC_PATTERNS = [
    re.compile(r"\bread all (prd )?files\b", re.IGNORECASE),
    re.compile(r"\bread all sources\b", re.IGNORECASE),
    re.compile(r"\bread everything\b", re.IGNORECASE),
    re.compile(r"读所有"),
    re.compile(r"全部读取"),
    re.compile(r"全量读取"),
]


def resolve_target(path_arg: str) -> tuple[Path, Path]:
    path = Path(path_arg).resolve()
    if path.is_file():
        bundle_root = path.parents[2] if len(path.parents) >= 3 and path.parent.name == "execution" else path.parent
        return bundle_root, path

    if (path / "prd" / "execution" / "prd-targeted-reading-analysis.md").exists():
        return path, path / "prd" / "execution" / "prd-targeted-reading-analysis.md"

    if (path / "execution" / "prd-targeted-reading-analysis.md").exists():
        return path.parent, path / "execution" / "prd-targeted-reading-analysis.md"

    return path, path / "prd" / "execution" / "prd-targeted-reading-analysis.md"


def add_issue(issues: list[tuple[str, str]], severity: str, message: str) -> None:
    issues.append((severity, message))


def validate_targeted_file(target_file: Path) -> list[tuple[str, str]]:
    issues: list[tuple[str, str]] = []
    if not target_file.exists():
        add_issue(issues, "ERROR", f"Missing targeted reading file: {target_file}")
        return issues

    text = target_file.read_text(encoding="utf-8")
    lower_text = text.lower()

    for section in REQUIRED_SECTIONS:
        if section.lower() not in lower_text:
            add_issue(issues, "ERROR", f"Missing required section: {section}")

    if not re.search(r"\bSRC-[A-Z0-9][A-Z0-9-]*\b", text):
        add_issue(issues, "ERROR", "No concrete SRC-* source row found.")

    if not re.search(r"\bREAD-[A-Z0-9][A-Z0-9-]*\b", text):
        add_issue(issues, "ERROR", "No concrete READ-* evidence-to-decision row found.")

    if not re.search(r"\b(ENTRY|GAP)-[A-Z0-9][A-Z0-9-]*\b", text):
        add_issue(issues, "WARN", "No ENTRY-* or GAP-* row found; use explicit IDs when conflicts or blockers exist.")

    for pattern in BANNED_GENERIC_PATTERNS:
        if pattern.search(text):
            add_issue(issues, "ERROR", "Generic read-all wording found; targeted reading must name stage-specific extraction.")
            break

    stage_terms = [
        ("Technical solution", r"technical solution|技术方案"),
        ("Backend/API", r"backend|api|后端|接口"),
        ("Frontend", r"frontend|前端"),
        ("Testing/QA", r"testing|qa|测试"),
    ]
    for label, pattern in stage_terms:
        if not re.search(pattern, text, re.IGNORECASE):
            add_issue(issues, "WARN", f"No visible downstream stage row for {label}; use not-in-current-scope if intentionally omitted.")

    return issues


def validate_child_prds(bundle_root: Path, strict_child: bool) -> list[tuple[str, str]]:
    issues: list[tuple[str, str]] = []
    children_dir = bundle_root / "prd" / "children"
    if not children_dir.exists():
        return issues

    for child in sorted(children_dir.glob("*.md")):
        text = child.read_text(encoding="utf-8")
        if "prd-targeted-reading-analysis.md" in text or re.search(r"\bREAD-[A-Z0-9][A-Z0-9-]*\b", text):
            continue
        severity = "ERROR" if strict_child else "WARN"
        add_issue(issues, severity, f"Child PRD does not reference targeted reading rows: {child}")

    return issues


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate PRD targeted reading analysis coverage.")
    parser.add_argument(
        "path",
        nargs="?",
        default=".",
        help="PRD bundle root, prd directory, or prd/execution/prd-targeted-reading-analysis.md",
    )
    parser.add_argument(
        "--strict-child",
        action="store_true",
        help="Treat child PRDs that omit targeted reading references as errors instead of warnings.",
    )
    args = parser.parse_args()

    bundle_root, target_file = resolve_target(args.path)
    issues = validate_targeted_file(target_file)
    issues.extend(validate_child_prds(bundle_root, args.strict_child))

    if issues:
        for severity, message in issues:
            print(f"{severity}: {message}")
    else:
        print(f"OK: targeted reading analysis is structurally valid: {target_file}")

    return 1 if any(severity == "ERROR" for severity, _ in issues) else 0


if __name__ == "__main__":
    sys.exit(main())
