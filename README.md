# rowendigm

My personal site, live at [rowendigm.me](https://rowendigm.me).

I build this with an AI pair — the rules for how changes get made live under
[`.claude/`](.claude/) (the sharper tools stay local). The architecture is written up
in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), and the reasoning behind the bigger
decisions in [`docs/adr/`](docs/adr/).

## Stack

- **Runtime / package manager**: Bun 1.3
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind v4 (CSS-first, `@theme`)
- **Hosting**: Cloudflare Pages (static export, `output: 'export'`)
- **Domain**: https://rowendigm.me (Cloudflare DNS)

## Develop

```bash
bun install
bun dev          # http://localhost:3000
```

## Build

```bash
bun run build    # static export -> ./out
```

## Deploy

Cloudflare Pages builds `main` straight from this repo:

- Build command: `bun run build`
- Output directory: `out`
- Env: `NEXT_PUBLIC_SITE_URL=https://rowendigm.me`

## Structure

```
docs/        architecture + decision records (ADRs)
app/         Next.js App Router
components/  sections + ui primitives
content/     ProfileData (types, schema, data)
lib/         utilities
public/      static assets (_headers, robots.txt, og.png, favicon)
```
