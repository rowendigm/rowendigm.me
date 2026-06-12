---
paths:
  - "components/**"
  - "lib/**"
---

# Client storage under static export — authoring guard

The site is prerendered (ADR 0002): there is no server, and `localStorage` does not
exist at build time. Storage is a **nice-to-have cache, never a dependency**.

- **S1 — Isolate access.** Touch `localStorage` only via `lib/storage.ts`, and only
  inside a client effect after mount — never lazy initializers, render bodies, or
  module scope. Prerender must emit the default; early reads mismatch or crash.
- **S2 — Default first.** Prerender always renders the default (lang `ko`). Stored
  preferences apply **after mount** — accept the one-frame flash for returning EN
  visitors. (Inline `<head>` scripts were rejected: they create a second source of
  truth and hydration-mismatch surface.)
- **S3 — Validate on read.** Parse stored values against their union
  (e.g. `'ko' | 'en'`) immediately; anything else falls back to the default.
- **S4 — Degrade gracefully.** If storage is unavailable, keep working with
  session-only state. A failed write is ignored, never surfaced.

Hydration-mismatch console errors are a blocking review finding.
