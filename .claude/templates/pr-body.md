# PR body — template

Short by default. A trivial PR is 1–2 lines total; never pad.

## What
The change and the reason, 1–3 lines of prose. Link an ADR if it locks a decision.
Add tight bullets only when the diff has several distinct pieces.

## Test
How it was verified (verify green / manual check), one line.

Closes #<issue>   <!-- only when an issue exists -->

---

## Example (shape only)

> ## What
> Move section components under `components/sections/` and add the missing
> `content/schema.ts` stub so the tree matches `docs/ARCHITECTURE.md`.
>
> ## Test
> `bun run verify` green.
