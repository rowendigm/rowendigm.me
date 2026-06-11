# ADR 0003 — Tailwind v4, CSS-first

- **Status**: Accepted · 2026-06-09

## Context

The PCB theme needs one source of truth for colors/spacing/motion so I don't end up
with hardcoded values scattered across components. Tailwind v4 moved config from JS
to CSS (`@theme`), which fits that.

## Decision

**Tailwind v4 CSS-first.** All design tokens live in `app/globals.css`:
`@import "tailwindcss";` + one `@theme { … }` block (palette, fonts, keyframes).
No `tailwind.config.*`, no v3 `@tailwind` directives. Components use token-backed utility
classes only — never raw hex/px — composed with `cn()` (clsx + tailwind-merge).

## Trade-offs

- (+) One file owns the theme; no JS config to drift.
- (−) Tokens live in `globals.css`, not a config file — something to remember.

## Alternatives

- v3-style JS config — not idiomatic for v4.
- CSS modules / inline styles — fragments the theme.
