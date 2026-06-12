# ADR 0007 — PCB theme, settled

- **Status**: Accepted · 2026-06-12 · Supersedes [ADR 0004](0004-pcb-theme.md)

## What changed from 0004

| 0004 | 0007 (settled) |
|---|---|
| Led status triad (active green / planned amber / idle gray) | Status shown by **Tag**; Led is just the green online dot |
| Accordion for the Planned roadmap | Dropped — content always visible |
| Theme via literal circuit primitives | Clean cards on a 760px column — PCB feel from **palette + texture + labels** |
| Colors unspecified | Locked: board `#0a0907` · copper lines · **amber `#f59e0b` only accent** · green `#4ade80` online dot |
| Fonts unspecified | Pretendard Variable (body) + JetBrains Mono (labels) |
| Motion unspecified | Trace glow/flow + LED pulse only; respects reduced motion |

Unchanged: tokens live in `@theme` (ADR 0003); every animation respects
`prefers-reduced-motion`.
