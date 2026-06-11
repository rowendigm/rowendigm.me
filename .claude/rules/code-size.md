# Code size — budgets & soft caps

Soft budgets, not hard gates: exceeding one is a **smell to review**, not an automatic
failure. For a single-page personal site, files should stay small.

## Per-kind expected size (rough LOC)

Budgets are by **kind**, not by name — they apply to whatever lives in each location as
the site grows.

| Location | Expected |
|---|---|
| `content/types.ts` · `schema.ts` | ~60–100 each |
| `content/data.ts` | ~80–150 (grows with content) |
| `components/sections/*` | ~40–90 each |
| `components/ui/*` | ~20–60 each |
| complex visual components (e.g. background art) | ~60–130 |
| `app/layout.tsx` | ~50–80 |
| `app/page.tsx` | ~25–45 |
| `app/globals.css` | ~100–180 (`@theme` tokens + keyframes) |
| `lib/*` | ~10–40 each |

## Per-file soft cap

- **~150 lines** per component/module. Over that → split (extract a child component, a
  helper, or move tokens/data out). A long file usually means it is doing two things.

Per-commit / per-PR size lives in `CLAUDE.md` (*Workflow*): target ≤~150 net LOC, split over
~300. The reviewers flag violations of both as **Should-fix**.
