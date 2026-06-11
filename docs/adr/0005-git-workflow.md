# ADR 0005 — Trunk-based workflow, squash-merge PRs

- **Status**: Accepted · 2026-06-09

## Context

Solo project, AI pair, and Cloudflare auto-deploys `main`. Risks: a mistake reaching the
deployed branch, and a history future-me can't read. Git Flow is too much ceremony for one
person; direct pushes have no gate.

## Decision

**Trunk-based:**

- `main` is the only long-lived branch, always deployable, no direct commits.
- Every change: short-lived branch (`type/kebab-subject`) → PR → **squash-merge** (one PR =
  one Conventional Commit on `main`) → delete branch.
- Mergeable only when CI `verify` (typecheck + lint + build) is green. Merge is human-only.
- Branch protection on `main`: PR required, CI required, squash-only, no force-push.

Day-to-day flow and enforcement live in `.claude/` (CLAUDE.md Workflow, `guard.py`,
`/commit` · `/open-pr` · `/ship`); the remote gate is `.github/workflows/ci.yml`.

## Trade-offs

- (+) Linear readable history; nothing deploys without passing the gate.
- (−) Even tiny changes need a branch + PR.

## Alternatives

- Direct push to `main` — no gate before auto-deploy.
- Git Flow — ceremony with no payoff at this scale.
