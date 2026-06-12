# ADR 0006 — Bilingual content (KO/EN)

- **Status**: Accepted · 2026-06-12

## Context

The settled design (ADR 0007) is bilingual: a KO/EN toggle in the top bar, plus a
live KST clock. The site is a static export (ADR 0002) — both must run entirely in
the browser. The design prototype also had a visitor-facing edit mode; it is **not
shipped** — site content changes only through `content/data.ts` PRs by me.

## Decision

- **Bilingual content** — every copy field in `ProfileData` is a `{ko, en}` pair;
  `lib/i18n` resolves it by the active language. The toggle persists the choice in
  `localStorage` (`rd-lang`). Default language: Korean. No partial translation —
  the schema fails the build if either language is missing.
- **KST clock** — 1s interval client component in the top bar.
- **No edit mode** — the only write path to content is a `data.ts` PR.

## Trade-offs

- (+) Both audiences served from one static page; no routes, no server.
- (−) Copy is authored twice (ko + en) — schema enforces both stay complete.
- (−) Language toggle ships both language sets in the bundle (fine at this size).

## Alternatives

- Visitor-local edit mode (the prototype's behavior) — rejected: content must be
  editable by me only, and a static site cannot gate it for real.
- `/ko` `/en` routes — heavier (duplicate pages) for no benefit at one page.
