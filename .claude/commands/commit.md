---
description: Stage and commit the current change as a Conventional Commit on a feature branch. Refuses on main.
argument-hint: "[commit subject]"
allowed-tools: Bash(git status), Bash(git diff *), Bash(git add *), Bash(git commit *), Bash(git rev-parse *), Bash(git branch *), Bash(git log *)
---

Commit the current change.

1. **Refuse on main.** Check `git rev-parse --abbrev-ref HEAD`. If it is `main`, stop and tell
   the user to branch first (`type/kebab-subject`). The guard hook also blocks this.
2. Review what will be committed (`git status`, `git diff`). Stage the intended files only.
3. Write the message per `.claude/templates/commit-message.md`: Conventional
   `type(scope): subject` (≤50 chars, imperative, no trailing period, **no AI attribution**) +
   a prose body explaining the **why**, scaled to the diff (a trivial change needs no body).
   Use `$ARGUMENTS` as the subject when provided; otherwise infer it from the diff. A breaking
   change gets a `BREAKING CHANGE: <description>` footer.
4. Commit, then show `git log -1 --stat`.

One logical change per commit. Do not push or open a PR.
