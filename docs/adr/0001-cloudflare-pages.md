# ADR 0001 — Host on Cloudflare Pages

- **Status**: Accepted · 2026-06-09

## Context

My personal site needs hosting under rowendigm.me. DNS, SSL, and CDN for the
domain are already on Cloudflare — keeping hosting there too means one provider, zero
cross-provider friction, and free static hosting.

## Decision

Host on **Cloudflare Pages**, auto-building `main` from GitHub.
Build: `bun run build` → output `out/`. Analytics: Cloudflare Web Analytics.
Env: `NEXT_PUBLIC_SITE_URL` set in the CF dashboard.

Connect Pages early for per-PR preview deployments (`*.pages.dev`), but attach the
rowendigm.me domain **only at launch** — keeps `main` always-deployable without exposing
a half-built site.

## Trade-offs

- (+) Everything (DNS/SSL/CDN/hosting/analytics) in one place, free.
- (−) No server runtime → the build must be fully static (ADR 0002).

## Alternatives

- Cloudflare Workers (SSR) — overkill for a static one-pager.
- Vercel/Netlify — would split hosting from the existing Cloudflare DNS.
