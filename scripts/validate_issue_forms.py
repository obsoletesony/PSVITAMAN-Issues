#!/usr/bin/env python3
"""Validate the public PSVITAMAN issue forms and their supporting files."""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE_DIR = ROOT / ".github" / "ISSUE_TEMPLATE"
FORM_FILES = sorted(TEMPLATE_DIR.glob("[0-9][0-9]-*.yml"))
ALLOWED_TYPES = {"markdown", "textarea", "input", "dropdown", "checkboxes", "upload"}
ID_PATTERN = re.compile(r"^[A-Za-z0-9_-]+$")


def fail(message: str) -> None:
    raise SystemExit(f"validation error: {message}")


def load_yaml(path: Path) -> dict[str, Any]:
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        fail(f"{path} must contain a YAML mapping")
    return data


if len(FORM_FILES) != 1:
    fail(f"expected 1 numbered issue form, found {len(FORM_FILES)}")

label_defs = json.loads((ROOT / ".github" / "labels.json").read_text(encoding="utf-8"))
known_labels = {item["name"] for item in label_defs}
if len(known_labels) != len(label_defs):
    fail(".github/labels.json contains duplicate label names")

for path in FORM_FILES:
    form = load_yaml(path)

    for key in ("name", "description", "title", "body"):
        if not form.get(key):
            fail(f"{path} is missing top-level key {key!r}")

    if len(str(form["name"])) <= 3:
        fail(f"{path} name must be longer than 3 characters")

    labels = form.get("labels", [])
    if not isinstance(labels, list):
        fail(f"{path} labels must be a list")
    unknown = set(labels) - known_labels
    if unknown:
        fail(f"{path} references undefined labels: {sorted(unknown)}")

    body = form["body"]
    if not isinstance(body, list) or not body:
        fail(f"{path} body must be a non-empty list")

    ids: set[str] = set()
    field_labels: set[str] = set()
    non_markdown_fields = 0

    for index, element in enumerate(body):
        if not isinstance(element, dict):
            fail(f"{path} body[{index}] must be a mapping")

        element_type = element.get("type")
        if element_type not in ALLOWED_TYPES:
            fail(f"{path} body[{index}] has invalid type {element_type!r}")

        attributes = element.get("attributes")
        if not isinstance(attributes, dict):
            fail(f"{path} body[{index}] must contain attributes")

        if element_type == "markdown":
            if not attributes.get("value"):
                fail(f"{path} body[{index}] markdown must contain a value")
            continue

        non_markdown_fields += 1
        element_id = element.get("id")
        if not isinstance(element_id, str) or not element_id:
            fail(f"{path} body[{index}] must contain a non-empty id")
        if not ID_PATTERN.fullmatch(element_id):
            fail(f"{path} contains invalid id {element_id!r}")
        if element_id in ids:
            fail(f"{path} contains duplicate id {element_id!r}")
        ids.add(element_id)

        field_label = attributes.get("label")
        if not isinstance(field_label, str) or not field_label:
            fail(f"{path} body[{index}] must contain an attributes.label")
        if field_label in field_labels:
            fail(f"{path} contains duplicate field label {field_label!r}")
        field_labels.add(field_label)

        if element_type == "dropdown":
            options = attributes.get("options")
            if not isinstance(options, list) or not options:
                fail(f"{path} dropdown {element_id!r} must contain options")
            if any(not isinstance(option, str) for option in options):
                fail(f"{path} dropdown {element_id!r} options must all be strings")
            if len(options) != len(set(options)):
                fail(f"{path} dropdown {element_id!r} contains duplicate options")

        if element_type == "checkboxes":
            options = attributes.get("options")
            if not isinstance(options, list) or not options:
                fail(f"{path} checkboxes {element_id!r} must contain options")
            option_labels: set[str] = set()
            for option in options:
                if not isinstance(option, dict) or not option.get("label"):
                    fail(f"{path} checkboxes {element_id!r} has an invalid option")
                option_label = option["label"]
                if option_label in option_labels:
                    fail(f"{path} checkboxes {element_id!r} contains duplicate labels")
                option_labels.add(option_label)

    if non_markdown_fields == 0:
        fail(f"{path} must contain at least one user-input field")

config = load_yaml(TEMPLATE_DIR / "config.yml")
if config.get("blank_issues_enabled") is not False:
    fail("blank issues must remain disabled for public reporters")

readme = (ROOT / "README.md").read_text(encoding="utf-8")
for form in FORM_FILES:
    expected = f"template={form.name}"
    if expected not in readme:
        fail(f"README.md does not link to {form.name}")

for required_path in (
    "CONTRIBUTING.md",
    "SECURITY.md",
    "CODE_OF_CONDUCT.md",
    "scripts/sync-labels.js",
    "scripts/triage.js",
    "test/triage.test.js",
):
    if not (ROOT / required_path).is_file():
        fail(f"missing {required_path}")

print(f"Validated {len(FORM_FILES)} PSVITAMAN issue forms and supporting files.")


