# CLAUDE.md — rowendigm

**Personal site of rowendigm** — the site itself is the statement: one statically
exported Next.js page hosted on Cloudflare Pages at https://rowendigm.me.

Read this first. When a rule here conflicts with a default habit, **this file wins**.

## Authoring mode (locked)

The user is the developer of this project. Claude is the instrument.

- Code lands one file / logical unit at a time: ① explain what and why → ② propose
  the code → ③ the user approves (or edits it themselves) → ④ move on.
  **Never write the whole thing in one pass.**
- Every outward action (commit / push / PR / writes to external services) requires
  explicit approval before execution.

## Stack (locked)

Bun 1.3 · Next.js 15 (App Router) · TypeScript (strict) · Tailwind v4 (CSS-first `@theme`)
· static export to Cloudflare Pages.
Architecture detail: `docs/ARCHITECTURE.md`. Decisions: `docs/adr/`.

## Hard constraints (non-negotiable)

1. **Static export only** — `next.config`: `output:'export'`, `images.unoptimized:true`,
   `trailingSlash:true`. No Server Actions, runtime Route Handlers, ISR, or request-time
   `cookies()/headers()`. (ADR 0002)
2. **No `@vercel/*`** — analytics via Cloudflare Web Analytics. (ADR 0002)
3. **No dynamic OG** (`next/og` / `ImageResponse`) — ship static `public/og.png`. (ADR 0002)
4. **`metadataBase`** from `NEXT_PUBLIC_SITE_URL` in `app/layout.tsx`.
5. **`robots.ts` export bug** → ship static `public/robots.txt`; HTTP headers via
   `public/_headers` (next.config `headers()` is ignored in static export).
6. **Secrets** — only `NEXT_PUBLIC_*` in client code; real values in gitignored `.env.local`.

`.claude/hooks/guard.py` blocks the worst of these (and destructive shell) at write time.

## Architecture

**`docs/ARCHITECTURE.md` is the living map** — directory layout, page composition, data
flow. The site evolves: sections, features, and content will be added. A structural change
updates the map **in the same PR**; a decision that locks a trade-off gets an ADR. The map,
the filesystem, and the harness must agree (`/check-arch` verifies).

- Server Components by default; `'use client'` only where interactivity genuinely requires
  it, with the smallest possible client boundary.
- Content lives in `content/`, typed by `ProfileData` (`types.ts` → `schema.ts` → `data.ts`).
  Components render the **slices** they are given and never hardcode copy. State unions are
  defined once in `types.ts`.
- Themed values (color / spacing / motion) come from `@theme` tokens in `app/globals.css` —
  never raw hex/px in components. Compose classes with `cn()` (clsx + tailwind-merge).
- All motion respects `prefers-reduced-motion`.

```
app/        routes + globals.css (tokens) + build-time metadata files
components/ sections/* (page sections) · ui/* (primitives) · top-level visual components
content/    types.ts, schema.ts, data.ts   (ProfileData — single source of content)
lib/        shared utilities (cn, …)
public/     static assets (_headers, robots.txt, og.png, favicon, …)
```

## TypeScript / quality bar

- `strict: true`; no `any` (use `unknown` + narrowing); no `@ts-ignore`
  (`@ts-expect-error` with a reason only when unavoidable).
- Explicit return types on exported functions/components; `import type` for type-only
  imports; **named exports** for components/utilities; path alias `@/*` (no `../../../`).
- Smallest change that does the job. No dead code, no premature abstraction, no commented-out
  blocks, no hardcoded copy, no themed hex/px in components.

## Workflow (trunk-based, parallel via worktrees)

`main` is always deployable. Every change lands via a short-lived branch and a squash-merged
PR. Independent changes run **in parallel, each in its own git worktree** — branches never
merge into each other, only into `main`, so parallel streams need no cross-branch merge.
**Dependent** work branches off `main` *after* its prerequisite PR merges — never stack
branches (squash-merge rewrites SHAs). Keep PRs small and merge fast so a chain never blocks
the parallel lanes; development must always be able to continue on some lane regardless of
any one PR's merge state.

1. **Plan** multi-step work with the todo list.
2. **Branch** off `main`: `type/kebab-subject` — **lowercase, ≤4-word subject**; `type ∈
   feat|fix|perf|refactor|test|docs|build|ci|chore`. One logical change per PR — keep it
   small: **target ≤~150 net LOC, split anything over ~300** (`rules/code-size.md`). For a
   parallel stream use a worktree (`git worktree add`). Never commit on `main` or push to
   `main` — `guard.py` blocks both.
3. **Develop.** Path-scoped `.claude/rules/` inject stack guidance as you edit; `guard.py`
   blocks hard-constraint violations in source at write time. For minor choices (naming,
   defaults, equivalent approaches) pick a reasonable option and note it — don't stop to ask.
   Still ask first for scope changes and destructive actions; `/ship` gates stay mandatory.
4. **Gate (before PR):** `/verify` (typecheck+lint+build) **and** `/review` (frontend +
   typescript reviewers, in parallel). Both clean before opening a PR.
5. **Commit** with `/commit` — Conventional Commit (`type(scope): subject`, ≤50 chars,
   imperative, no trailing period, **no AI attribution**). Body explains *why* (wrap ~72),
   omitted for trivial changes; a breaking change gets a `BREAKING CHANGE:` footer. Refused on
   `main`.
6. **PR** with `/open-pr` — pushes the branch and opens a PR (title = commit
   subject; template: What/Test, keep it short; a trivial change is a
   one-liner). CI (`.github/workflows/ci.yml`) runs the same gate.
7. **Merge is human-only** — squash-merge in the GitHub UI after CI is green, then delete the
   branch. The harness never auto-merges (`--auto`/`--admin` merge is blocked).

`/ship` orchestrates steps 2→6 with **mandatory stop-and-approve gates** before commit and
before PR. It assists but always halts at outward/irreversible steps; it never merges.

**Branch protection** (set once in the GitHub UI on `main`): require a PR before merging,
require the CI `verify` check to pass, allow **squash-merge only** (disable merge-commit and
rebase-merge), and block force-push and branch deletion. The root/bootstrap commit is the only
commit allowed directly on `main`.

**Labels** track every PR / issue — apply `type:*` (kind of change) and `area:*` (part of the
site) via `/label`; `/open-pr` adds them at creation. Taxonomy in `.claude/templates/labels.md`.

8. Record architectural choices as ADRs in `docs/adr/`.

## Definition of Done

- Satisfies the hard constraints and the quality bar; no forbidden patterns.
- `bun run verify` is green once scaffolded — **never disable a check to pass**.
- Content still validates against the `ProfileData` schema.

## Status

App not scaffolded yet (no `package.json`; `app/ components/ content/ lib/ public/` are empty).
Next phase: scaffold the Next.js app to the architecture above.
