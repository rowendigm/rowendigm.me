#!/usr/bin/env python3
"""PreToolUse guard for rowendigm.

Single self-contained hook (no shared lib). Enforces the project's hard
constraints (CLAUDE.md), trunk-based merge policy, and basic shell safety at
write time — mechanically, so an over-eager orchestrator cannot skip them.

Protocol: read the hook payload as JSON on stdin. Exit 0 to allow, exit 2 to
block (stderr is shown to Claude). See docs.claude.com/en/docs/claude-code/hooks.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys


def block(reason: str) -> None:
    print(f"BLOCKED by guard.py: {reason}", file=sys.stderr)
    sys.exit(2)


def current_branch(cwd: str) -> str:
    try:
        out = subprocess.run(
            ["git", "-C", cwd or ".", "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True, text=True, timeout=2,
        )
        return out.stdout.strip()
    except Exception:
        return ""  # not a repo / git unavailable → no branch constraint


def has_commits(cwd: str) -> bool:
    try:
        out = subprocess.run(
            ["git", "-C", cwd or ".", "rev-parse", "--verify", "HEAD"],
            capture_output=True, text=True, timeout=2,
        )
        return out.returncode == 0
    except Exception:
        return False


def check_bash(cmd: str, cwd: str) -> None:
    # --- trunk-based protection: main is always deployable -------------------
    # The root/bootstrap commit on main is allowed; every later commit is not.
    if re.search(r"\bgit\s+commit\b", cmd) and current_branch(cwd) == "main" and has_commits(cwd):
        block("never commit on 'main' — branch first (type/kebab-subject).")
    if re.search(r"\bgit\s+push\b.*\bmain\b", cmd):
        block("direct push to 'main' is forbidden — integrate via a PR.")
    if re.search(r"\bgh\s+pr\s+merge\b", cmd) and re.search(r"(--auto|--admin)\b", cmd):
        block("auto/admin PR merge is forbidden — merge is a deliberate human action.")

    # --- shell safety --------------------------------------------------------
    if re.search(r"\brm\s+(-[a-zA-Z]*\s+)*-?[rR][fF]?\s+(/|~|\$HOME|\*|\.)(\s|/|$)", cmd):
        block("destructive 'rm -rf' on a sensitive path — delete explicit subpaths instead.")
    if re.search(r"\b(curl|wget)\b.*\|\s*(sudo\s+)?(sh|bash|zsh)\b", cmd):
        block("piping a remote script into a shell is forbidden (security).")
    if re.search(r">\s*\.?/?(\S*/)?\.env(\.local)?(\s|$)", cmd) and ".env.example" not in cmd:
        block("do not write secrets into .env from the shell — use gitignored .env.local.")


# Forbidden source patterns (ADR 0002). Static export, no Vercel, no dynamic OG.
FORBIDDEN = [
    (r"@vercel/", "no '@vercel/*' packages — use Cloudflare Web Analytics (ADR 0002)."),
    (r"['\"]next/og['\"]", "no dynamic OG via 'next/og' — ship static public/og.png (ADR 0002)."),
    (r"\bImageResponse\b", "no dynamic OG (ImageResponse) — ship static public/og.png (ADR 0002)."),
    (r"force-dynamic", "no 'force-dynamic' — the site is statically exported (ADR 0002)."),
]

# Only scan real source files. Docs and the harness itself legitimately *name* the
# forbidden patterns (to forbid them) and must not be blocked.
SOURCE_RE = re.compile(r"\.(ts|tsx|js|jsx|mjs|cjs)$")


def is_source(path: str) -> bool:
    p = path.replace("\\", "/")
    if "/.claude/" in p or p.startswith(".claude/") or "/docs/" in p or p.startswith("docs/"):
        return False
    return bool(SOURCE_RE.search(p)) or "next.config" in p


def check_write(content: str, path: str) -> None:
    if not content or not is_source(path):
        return
    for pattern, reason in FORBIDDEN:
        if re.search(pattern, content):
            block(reason)


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return 0  # fail open on malformed payloads

    tool = payload.get("tool_name", "")
    ti = payload.get("tool_input", {}) or {}
    cwd = payload.get("cwd", "") or ""
    path = ti.get("file_path", "") or ""

    if tool == "Bash":
        check_bash(ti.get("command", "") or "", cwd)
    elif tool in ("Write", "Edit"):
        check_write(ti.get("content") or ti.get("new_string") or "", path)
    elif tool == "MultiEdit":
        for edit in ti.get("edits", []) or []:
            check_write(edit.get("new_string", "") or "", path)

    return 0


if __name__ == "__main__":
    sys.exit(main())
