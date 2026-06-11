---
description: Verify that docs/ARCHITECTURE.md (the living map), the filesystem, and the harness agree. Read-only — reports drift, never edits.
argument-hint: ""
allowed-tools: Read, Glob, Grep, Bash(git ls-files *), Bash(ls *), Bash(find *)
---

Audit architecture consistency. **Read-only**: report drift, do not fix anything.

1. **Map ↔ filesystem.** Read the directory map in `docs/ARCHITECTURE.md` and compare it
   against the actual tree (`git ls-files` + untracked source dirs). Report files the map
   promises but the tree lacks, and files the tree has but the map doesn't mention.
2. **Map ↔ harness.** Check that `.claude/CLAUDE.md`, `.claude/rules/*`, and
   `.claude/agents/*` don't assert structure that contradicts the map (e.g. a hardcoded
   section list, a component named as "the only" anything that is no longer true).
3. **Labeler ↔ tree.** Every glob in `.github/labeler.yml` must match at least one real
   path (or a documented future path); flag globs pointing at files that don't exist or
   were renamed. Check `.claude/templates/labels.md` and `labeler.yml` define the same
   area set.
4. **ADR links.** Cross-references (`ADR 000N`) in docs and rules must point at existing
   ADR files; the ARCHITECTURE.md decision-records list must match `docs/adr/`.
5. **Forbidden patterns** as a quick sweep: `@vercel/`, `next/og`, `ImageResponse`,
   `force-dynamic` anywhere in source.

Output: findings grouped **Drift (must sync) → Stale (probably outdated) → OK**, each as
`file — what disagrees with what — where the truth lives`. End with a one-line verdict:
**in sync** or **drift found (N items)**.

Run this before a PR that touches structure, docs, or the harness — and whenever a design
change lands.
