---
description: Run the stack reviewers (frontend + typescript) in parallel on the current diff and aggregate findings by severity.
argument-hint: ""
allowed-tools: Bash(git diff *), Bash(git status), Read, Grep, Glob, Agent(frontend-reviewer), Agent(typescript-reviewer)
---

Review the current change before a PR.

1. Determine the diff: `git diff` and `git diff --staged` (and `git status`). If there is no
   git repo or no changes, say so and stop.
2. Launch **both** reviewers in parallel (one message, two Agent calls):
   - `frontend-reviewer`
   - `typescript-reviewer`
   Give each the branch name and the diff context.
3. Aggregate their findings into one report grouped **Blocking → Should-fix → Nits**,
   de-duplicated. End with a single verdict: **ready for PR** or **not yet** (with the reasons).

This command only reviews — do not edit files, commit, or open a PR.
