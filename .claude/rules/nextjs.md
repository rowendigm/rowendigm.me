---
paths:
  - "app/**"
---

# Next.js (App Router, static export) — authoring guard

- Every route must be **statically renderable**. `next.config`: `output:'export'`,
  `images.unoptimized:true`, `trailingSlash:true`.
- **Server Components by default**; add `'use client'` only where interactivity genuinely
  requires it, and keep the client boundary as small as possible (a leaf component, not a
  section).
- **Forbidden** (also blocked by `guard.py` in source files): `@vercel/*`; `next/og` &
  `ImageResponse` (use static `public/og.png`); `force-dynamic`; ISR / `revalidate`;
  Server Actions; runtime Route Handlers; request-time `cookies()` / `headers()`.
- `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!)` in `app/layout.tsx`.
- `robots.ts` export bug → ship static `public/robots.txt`. `next.config` `headers()` is
  ignored in export → set HTTP headers in `public/_headers`.
