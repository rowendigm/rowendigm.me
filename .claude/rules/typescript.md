---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript — authoring guard

- `strict: true`; never weaken tsconfig. **No `any`** — use `unknown` + narrowing.
  No `@ts-ignore` (`@ts-expect-error` + reason only when truly unavoidable).
- **Explicit return types** on exported functions/components.
- `import type` for type-only imports. **Named exports** for components/utilities
  (no default exports for components).
- Path alias `@/*` — no `../../../` chains.
- Prefer precise unions / discriminated unions over loose `string`/`boolean` for state
  (e.g. `NowItem.status`). Keep types aligned with the `ProfileData` contract.
- No dead code, no commented-out blocks, no `_unused` vars, no premature abstraction.

## Dependency direction (keeps parts reusable)

Imports flow **downward only**: `app/` → `sections/` → `ui/` → `content/types` / tokens.

- `components/ui/*` may import `content/types.ts` (the contract) — **never
  `content/data.ts`** (the content). Only `app/` reads data and passes slices.
- `components/ui/*` never imports from `components/sections/`.
- Sections never import each other — a shared need means promoting it to `ui/`.
- `lib/*` imports nothing from `components/` or `content/data` — domain-free.
