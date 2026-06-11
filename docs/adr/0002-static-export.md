# ADR 0002 — Next.js static export

- **Status**: Accepted · 2026-06-09

## Context

This is one content-light page with no per-request data, auth, or user input.
Cloudflare Pages (ADR 0001) serves static files — so Next.js has to build to pure static.

## Decision

`next.config.ts`: **`output: 'export'`** + `images: { unoptimized: true }` +
`trailingSlash: true`. The build emits a static `out/` directory.

What this rules out (and the replacement):

- Dynamic OG / `next/og` → static `public/og.png`
- `app/robots.ts` (broken under export) → static `public/robots.txt`
- next.config `headers()` (ignored in export) → `public/_headers`
- Server Actions / ISR / runtime Route Handlers / request-time `cookies()`·`headers()` → not used
- `app/sitemap.ts` still works (build-time generation) — kept

`metadataBase` comes from `NEXT_PUBLIC_SITE_URL` so OG/sitemap URLs are absolute.

## Trade-offs

- (+) Fast, cacheable, nothing to break at runtime.
- (−) Any future dynamic feature needs an architecture change first.
