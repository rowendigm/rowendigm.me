---
paths:
  - "**/*.tsx"
  - "app/globals.css"
---

# Tailwind v4 (CSS-first) — authoring guard

- `app/globals.css` begins with `@import "tailwindcss";`. **No** v3 directives
  (`@tailwind base/components/utilities`). **No** `tailwind.config.*` / JS config.
- All design tokens (color, spacing, font, keyframes) live in `@theme { … }` in
  `globals.css`. **Never hardcode themed hex or px** in components — use token-backed
  utility classes.
- Compose classes with `cn()` from `@/lib/utils` (clsx + tailwind-merge), not string
  concatenation.
- Motion (LED pulse, trace glow) defined as `@keyframes` near the tokens; **every** animation
  respects `prefers-reduced-motion`.
