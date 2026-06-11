---
description: Create a convention-named feature branch off the latest main. Worktree-friendly for parallel streams.
argument-hint: <what you're building>
allowed-tools: Bash(git fetch *), Bash(git switch *), Bash(git checkout *), Bash(git pull *), Bash(git branch *), Bash(git worktree *), Bash(git status)
---

Create a feature branch for: `$ARGUMENTS`

1. **Sync `main`.** If the working tree has uncommitted work you'd lose, stop and say so.
   Otherwise: `git switch main && git pull --ff-only origin main`.
2. **Create the branch** per `CLAUDE.md`: infer `type` (feat|fix|perf|refactor|test|docs|
   build|ci|chore) and a **lowercase, ≤4-word** kebab subject from `$ARGUMENTS`, then
   `git switch -c <type>/<subject>`.
   - For a **parallel stream**, prefer a worktree instead of switching:
     `git worktree add ../rowendigm-<subject> -b <type>/<subject> main`.
3. Print the new branch (and worktree path, if used).

Never branch off a stale `main`; never work on `main` itself.
