---
description: Preview the commit message and PR body for the current change, formatted to the .claude templates, and stop for confirmation. Does not commit or open a PR.
argument-hint: "[issue-number]"
allowed-tools: Bash(git status), Bash(git diff *), Bash(git log *), Bash(git branch *), Read
---

Organize the current change into a commit + PR preview for the user to confirm.

1. Gather context: `git status`, `git diff`, `git diff --staged`, `git log origin/main..HEAD`,
   and the current branch. If there is nothing to preview, say so and stop.
2. Draft the **commit message** per `.claude/templates/commit-message.md` — Conventional
   subject + prose body, scaled to the diff.
3. Draft the **PR body** per `.claude/templates/pr-body.md` — `## What` / `## Test`,
   short by default. Use `$ARGUMENTS` as the issue number when given; omit `Closes`
   if there is no issue.
4. Show **both** in a clear preview block and **STOP**. Do not commit or open a PR — wait for
   the user to confirm or edit. On confirmation, `/commit` and `/open-pr` reuse these.
