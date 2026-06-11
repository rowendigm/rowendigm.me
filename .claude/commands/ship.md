---
description: Orchestrate a change end-to-end (branch → develop → verify → review → commit → PR) with mandatory stop-and-approve gates. Worktree-friendly for parallel streams. Never merges.
argument-hint: "<type/kebab-subject> [task description]"
allowed-tools: Bash(git *), Bash(gh pr *), Bash(bun *), Read, Grep, Glob, Edit, Write, Agent(frontend-reviewer), Agent(typescript-reviewer)
---

Drive one change through the pipeline. **Assist, but halt at every outward / irreversible
step — never run the whole thing unattended.**

Pipeline:

1. **Branch.** Take the branch name (`type/kebab-subject`) from `$ARGUMENTS`. Create it off
   `main`. For a parallel stream, prefer a worktree:
   `git worktree add ../rowendigm-<subject> -b <branch> main`. Never work on `main`.
2. **Develop** the task to `CLAUDE.md` + the path-scoped rules in `.claude/rules/`. Keep the
   change small and focused.
3. **Verify.** Run the `/verify` gate (typecheck + lint + build). Fix failures before moving on.
4. **Review.** Run `frontend-reviewer` + `typescript-reviewer` in parallel on the diff.
5. 🛑 **GATE 1 — show the verify + review results and STOP.** Wait for an explicit "go" before
   committing.
6. **Commit** via the `/commit` flow (Conventional Commit; refused on `main`).
7. 🛑 **GATE 2 — show the PR title + body and STOP.** Wait for explicit approval.
8. **Open PR** via the `/open-pr` flow into `main`.
9. ⛔ **Stop. Do not merge.** Report the PR URL. Merge is the human's deliberate action.

If any step fails, stop and report — never paper over a red check. (Linear issues are
reference-only — no integration; don't link or update them from here.)
