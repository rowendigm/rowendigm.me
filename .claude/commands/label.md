---
description: Manage GitHub PR/issue labels from the taxonomy — create the label set in the repo, apply labels to a PR/issue, or propose labels for the current change.
argument-hint: "sync | <pr|issue number> <label>..."
allowed-tools: Bash(gh label *), Bash(gh pr *), Bash(gh issue *), Bash(git branch *), Bash(git diff *), Read
---

Apply or manage labels defined in `.claude/templates/labels.md`.

- **`/label sync`** — ensure every label in the taxonomy exists in the repo. For each row run
  `gh label create "<name>" --color <color> --description "<desc>" --force`. Show the list and
  confirm before running.
- **`/label <number> <labels...>`** — add labels to PR/issue `#<number>`:
  `gh pr edit <number> --add-label "<a>,<b>"` (use `gh issue edit` for an issue). Each label
  must exist in the taxonomy; if one is missing, suggest `/label sync` first.
- **No args** — infer the right `type:*` (from the change kind) and `area:*` (from the touched
  files) for the current branch's PR, and **propose** them. Do not apply until confirmed.

Never delete labels without an explicit request.
