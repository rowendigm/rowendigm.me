# CLAUDE.md — rowendigm

**Personal site of rowendigm** — one statically exported Next.js page on Cloudflare
Pages at https://rowendigm.me. When a rule here conflicts with a default habit,
**this file wins**.

## Authoring mode (locked)

The user is the developer; Claude is the instrument.

- Code lands one logical unit at a time: ① explain what and why → ② propose the code
  → ③ the user approves (or edits) → ④ move on. **Never write it all in one pass.**
- Every outward action (commit / push / PR / writes to external services) requires
  explicit approval before execution.

## Writing style (locked)

Applies to everything written outward: commits, PR bodies, docs, ADRs, code comments.

- Plain sentences, like a quick human note. No em-dashes. No "not X but Y" framing,
  no triads, no trailing participles ("...enabling/ensuring..."), no bold-term-colon
  lists, no hard-wrapped or indented prose in PR bodies.
- Uneven is fine: important things get words, trivial things get almost none.

## Stack (locked)

Bun 1.3 · Next.js 15 (App Router) · TypeScript (strict) · Tailwind v4 (CSS-first
`@theme`) · static export → Cloudflare Pages.

## Hard constraints (non-negotiable)

1. **Static export only** — `output:'export'`, `images.unoptimized:true`,
   `trailingSlash:true`; no Server Actions, runtime Route Handlers, ISR, or
   request-time `cookies()`/`headers()`. (ADR 0002)
2. **No `@vercel/*`** — analytics via Cloudflare Web Analytics.
3. **No dynamic OG** — ship static `public/og.png`.
4. **`metadataBase`** from `NEXT_PUBLIC_SITE_URL` in `app/layout.tsx`.
5. **`robots.ts` is broken under export** → static `public/robots.txt`; HTTP headers
   via `public/_headers` (next.config `headers()` is ignored).
6. **Secrets** — only `NEXT_PUBLIC_*` in client code; real values in `.env.local`.

## Map & rules

- **`docs/ARCHITECTURE.md` is the living map** — a structural change updates it in
  the same PR; a decision that locks a trade-off gets an ADR in `docs/adr/`.
  `/check-arch` verifies map ↔ filesystem ↔ harness.
- Path-scoped authoring rules live in `.claude/rules/` and inject as you edit.

## Workflow (trunk-based)

- `main` is always deployable. Every change: short-lived `type/kebab-subject` branch
  → squash-merged PR. Independent work runs parallel in worktrees; dependent work
  branches off `main` after its prerequisite merges — never stack branches.
- Gate before PR: `/verify` and `/review` both clean. Commit with `/commit`
  (Conventional, no AI attribution); PR with `/open-pr`. Target ≤~150 net LOC,
  split over ~300 (`rules/code-size.md`).
- **Merging is human-only**, in the GitHub UI.

## Definition of Done

Hard constraints and rules hold · `bun run verify` green — never disable a check ·
content validates against the `ProfileData` schema.
