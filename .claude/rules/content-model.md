---
paths:
  - "content/**"
---

# Content model — authoring guard

- All user-facing copy lives in `content/`, typed by `ProfileData` (`content/types.ts`),
  validated by `content/schema.ts`. **No hardcoded strings in components.**
- Components receive **slices** of `ProfileData` as props and render what they are given —
  never reach into a global.
- State unions (e.g. an item's `status`) are defined **once in `content/types.ts`** — rules
  and components follow the types, never a hardcoded list elsewhere.
- Links are data (e.g. `ContactLink[]`), not inline JSX.
- Editing content must keep `content/schema.ts` validation passing.
