# Architecture — rowendigm

My personal site: one page, statically exported, hosted on Cloudflare Pages.

This document is the **living map** — it describes the site as it currently is, and is
updated in the same PR as any structural change. The decisions that lock trade-offs live
in `adr/`; everything else here is expected to evolve.

## Rendering model

- **Next.js 15 App Router** with **`output: 'export'`** → fully static `out/` directory
  (ADR 0002). No server runtime at request time.
- **Server Components by default.** The only client component is `ui/Accordion`
  (`'use client'`), used for the Planned roadmap's expand/collapse.
- **Tailwind v4 CSS-first** (ADR 0003): tokens in `app/globals.css` `@theme`.

## Directory map

```
app/
  layout.tsx        # metadata (metadataBase from NEXT_PUBLIC_SITE_URL);
                    #   fonts + Cloudflare Web Analytics + BackgroundTraces (page PR)
  page.tsx          # composes the sections
  globals.css       # @import "tailwindcss" + @theme tokens + keyframes (tokens: theme PR)
  sitemap.ts        # build-time sitemap (no app/robots.ts — export bug) (seo PR)
  not-found.tsx     # (page PR)
  manifest.ts       # (seo PR)
  icon.tsx          # (seo PR)
components/
  BackgroundTraces.tsx
  sections/ { Hero, Now, Planned, Footer }.tsx
  ui/ { Led, SectionLabel, Accordion }.tsx
content/
  types.ts          # ProfileData and friends
  schema.ts         # runtime validation (build-time gate)
  data.ts           # the actual profile content
lib/
  utils.ts          # cn()
public/
  _headers          # Cloudflare security headers (CSP, etc. — content: seo PR)
  robots.txt        # static robots (app/robots.ts broken under export — content: seo PR)
  og.png            # static Open Graph image (no dynamic OG — ADR 0002) (seo PR)
  favicon.ico       # (seo PR)
```

## Data flow

`content/data.ts` (typed by `content/types.ts`, validated by `content/schema.ts`) is the
single source of profile content. `app/page.tsx` reads `ProfileData` and passes **slices**
to each section:

```
ProfileData
  ├─ name, role, tagline, contact ─▶ Hero
  ├─ now[]                         ─▶ Now   ─▶ Led, SectionLabel
  ├─ planned[]                     ─▶ Planned ─▶ Accordion, SectionLabel
  └─ contact, name                ─▶ Footer
```

Components never hardcode copy; they render the data they are given.

## Page composition

```
<BackgroundTraces />   # fixed, -z-10, ambient
<main>
  <Hero />
  <Now />
  <Planned />
</main>
<Footer />
```

## Styling

- PCB palette + motion tokens in `@theme` (ADR 0004), defined in `app/globals.css`
  (theme PR).
- Class composition via `cn()` (clsx + tailwind-merge).
- All motion respects `prefers-reduced-motion`.

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
- [0004 — PCB theme](adr/0004-pcb-theme.md)
- [0005 — Trunk-based Git workflow](adr/0005-git-workflow.md)
