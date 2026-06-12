# Architecture — rowendigm

My personal site: one page, statically exported, hosted on Cloudflare Pages.

This document is the **living map** — it describes the site as it currently is, and is
updated in the same PR as any structural change. The decisions that lock trade-offs live
in `adr/`; everything else here is expected to evolve.

## Rendering model

- **Next.js 15 App Router** with **`output: 'export'`** → fully static `out/` directory
  (ADR 0002). No server runtime at request time — every interactive feature below runs
  entirely in the browser.
- **`app/page.tsx` is the single client boundary**: the language toggle changes every
  section's text, so the assembled tree owns the `Lang` state (ADR 0006). The layout
  stays a Server Component; prerender still emits the full Korean page.
- **Tailwind v4 CSS-first** (ADR 0003): tokens in `app/globals.css` `@theme`.

## Directory map

```
app/
  layout.tsx        # metadata (metadataBase from NEXT_PUBLIC_SITE_URL);
                    #   fonts (Pretendard Variable + JetBrains Mono) + Analytics (page PR)
  page.tsx          # composes TopNav + sections ('use client' — the lang boundary)
  globals.css       # @import "tailwindcss" + @theme tokens + keyframes (tokens: theme PR)
  sitemap.ts        # build-time sitemap (no app/robots.ts — export bug) (seo PR)
  not-found.tsx     # (page PR)
  manifest.ts       # (seo PR)
  icon.tsx          # (seo PR)
components/
  TopNav.tsx        # client — logo + online LED, KST clock, section links,
                    #   KO/EN segment, contact CTA
  BackgroundTraces.tsx  # substrate pattern + hero trace field + mirrored bottom field
  sections/ { Hero, Stack, Now, Planned, Contrib, Career, Footer }.tsx
  ui/ { Led, SectionLabel, Chip, Tag, Section, Bold, CardList }.tsx
content/
  types.ts          # ProfileData and friends — every copy field is a {ko,en} pair
  schema.ts         # runtime validation (build-time gate)
  data.ts           # the profile content (both languages)
  ui.ts             # nav/heading/cta strings, same zod gate
lib/
  utils.ts          # cn()
  i18n.ts           # L/tr helpers — resolve {ko,en} by active language (content PR)
  storage.ts        # safe localStorage access (client-storage rule S1/S3/S4)
public/
  _headers          # Cloudflare security headers (CSP, etc. — content: seo PR)
  robots.txt        # static robots (app/robots.ts broken under export — content: seo PR)
  og.png            # static Open Graph image (no dynamic OG — ADR 0002) (seo PR)
  favicon.ico       # (seo PR)
```

## Data flow

`content/data.ts` (typed by `content/types.ts`, validated by `content/schema.ts`) is the
single source of profile content, in both languages (ADR 0006). The only write path is
a `data.ts` PR — there is no edit mode.

```
content/data.ts (ko+en) ── resolved by active language (lib/i18n)
                                            ▼
  ├─ badge, headline, bio, flow[]  ─▶ Hero
  ├─ stack[]                       ─▶ Stack   ─▶ Chip, SectionLabel
  ├─ now[]                         ─▶ Now     ─▶ Tag, SectionLabel
  ├─ planned[]                     ─▶ Planned ─▶ CardList (Tag, Bold)
  ├─ contrib[]                     ─▶ Contrib ─▶ CardList (Tag, Bold)
  ├─ history[]                     ─▶ Career  ─▶ SectionLabel (timeline)
  └─ contact[], personal           ─▶ Footer
```

Components never hardcode copy; they render the data they are given.

## Page composition

One column, `max-width 760px`, on a dark board. Numbered sections (01–05).

```
<TopNav />             # sticky — logo·LED, clock, links, KO/EN, CTA
<BackgroundTraces />   # substrate pattern + hero trace field + mirrored bottom
<main>
  <Hero />             # badge · headline (amber accent) · bio · flow chips
  <Stack />            # 01 — two-column component-bank grid
  <Now />              # 02 — current work cards
  <Planned />          # 03 — project plans
  <Contrib />          # 04 — open source
  <Career />           # 05 — timeline (rail + amber nodes)
</main>
<Footer />             # contact buttons (mono key labels) + personal line
```

## Styling

- PCB palette + motion tokens in `@theme` (ADR 0007: warm-dark substrate `#0a0907`,
  copper lines, **amber `#f59e0b` as the only strong accent**, one green online LED),
  defined in `app/globals.css` (theme PR).
- Type: Pretendard Variable for body (15px/1.6, `word-break: keep-all`),
  JetBrains Mono for silkscreen labels/metadata.
- Class composition via `cn()` (clsx + tailwind-merge).
- Motion: trace glow/flow keyframes + LED pulse only — no scroll effects.
  All motion respects `prefers-reduced-motion`.

## Deploy pipeline

```
git push ─▶ Cloudflare Pages build (bun run build) ─▶ out/ ─▶ *.pages.dev
                                                              └▶ rowendigm.me (at launch)
```

- Build command `bun run build`, output `out/`.
- Env `NEXT_PUBLIC_SITE_URL=https://rowendigm.me`.
- Security headers from `public/_headers`.
- Analytics: Cloudflare Web Analytics script in `layout.tsx`.
- **Domain timing**: Pages is connected early so every PR gets a preview deployment
  (`*.pages.dev`), but the custom domain is attached only at launch — `main` stays
  deployable throughout without exposing a half-built site.

## Extending the site

The map above is the current state, not a ceiling. To grow it:

- **New section**: add the slice to `content/types.ts` → `schema.ts` → `data.ts`, build the
  component in `components/sections/`, compose it in `app/page.tsx`, update the map here.
- **New interactive piece**: smallest possible `'use client'` leaf in `components/ui/`.
- **New visual/theme value**: a token in `@theme` first, then use it.
- **Anything that breaks a locked decision** (server runtime, dynamic OG, hosting, …):
  supersede the ADR first, then build.

`/check-arch` verifies that this map, the filesystem, and the harness agree.

## Decision records

- [0001 — Cloudflare Pages](adr/0001-cloudflare-pages.md)
- [0002 — Static export](adr/0002-static-export.md)
- [0003 — Tailwind v4 CSS-first](adr/0003-tailwind-v4.md)
- [0004 — PCB theme](adr/0004-pcb-theme.md) *(superseded by 0007)*
- [0005 — Trunk-based Git workflow](adr/0005-git-workflow.md)
- [0006 — Bilingual content (KO/EN)](adr/0006-bilingual-content.md)
- [0007 — PCB theme, settled](adr/0007-pcb-theme-settled.md)
