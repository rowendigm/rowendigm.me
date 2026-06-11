---
description: Push the current feature branch and open a PR into main using the template. Stops for confirmation before creating the PR.
argument-hint: ""
allowed-tools: Bash(git status), Bash(git rev-parse *), Bash(git push *), Bash(gh pr *), Bash(git log *), Read
---

Open a PR for the current branch.

1. **Refuse on main.** If `git rev-parse --abbrev-ref HEAD` is `main`, stop.
2. Confirm the gate passed: `/verify` green and `/review` clean. If you cannot confirm, say so
   and stop.
3. Push the branch: `git push -u origin <branch>` (never push to main — the guard blocks it).
4. Draft the PR. **Title = the commit subject** (squash-merge uses it). Body per
   `.claude/templates/pr-body.md` (`## What` / `## Test`),
   filled from the commits and diff — **scale it to the diff size**; no emoji headers, no
   exhaustive auto-generated bullet dumps; write like a senior dev. **Show the title and body
   to the user and STOP for approval** — do not create the PR until they explicitly confirm.
   (Run `/preview` anytime to see the commit + PR draft without creating anything.)
5. On approval, open a PR into `main` with inferred labels:
   `gh pr create --base main --label "type:<…>,area:<…>"` — infer `type:*` + `area:*`
   from the diff per `.claude/templates/labels.md` and include the proposed labels in the
   step-4 preview. (Run `/label sync` once if the labels don't exist in the repo yet.)
6. **Do not merge.** Merge is human-only — squash-merge in the GitHub UI after CI is green,
   then delete the branch. (`gh pr merge --auto`/`--admin` is blocked by the guard.)
