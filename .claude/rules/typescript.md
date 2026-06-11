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
