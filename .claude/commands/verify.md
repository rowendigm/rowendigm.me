---
description: Run the verification gate — typecheck + lint + build. No-ops until the app is scaffolded.
argument-hint: ""
allowed-tools: Bash(bun *), Bash(test *), Bash(ls *)
---

Run the project's verification gate. This is the same gate CI enforces
(`.github/workflows/ci.yml`) and the bar for "done" in CLAUDE.md.

Steps:

1. If `package.json` does not exist, the app is not scaffolded yet — report
   "verify: app not scaffolded, gate skipped (no package.json)" and stop. This is a
   success, not a failure.
2. Otherwise run, stopping at the first failure and reporting which step failed:
   - `bun install --frozen-lockfile`
   - `bun run typecheck`
   - `bun run lint`
   - `bun run build`
3. Report the result plainly. If anything fails, show the relevant output — never
   suggest disabling a check to make it pass.
