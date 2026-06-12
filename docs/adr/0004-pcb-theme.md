# ADR 0004 — PCB / circuit-board visual theme

- **Status**: Superseded by [ADR 0007](0007-pcb-theme-settled.md) · 2026-06-12
  (originally Accepted · 2026-06-09)

## Context

I want the site to have an identity of its own instead of another minimal template.
A PCB (circuit board) look — traces, status LEDs, silkscreen labels — fits a
developer's personal site and stands out.

## Decision

Three primitives carry the theme:

- **BackgroundTraces** — ambient SVG traces fixed behind content (`aria-hidden`, no pointer
  events).
- **Led** — status dot: active=green, planned=amber, idle=gray; CSS-only pulse.
- **SectionLabel** — uppercase silkscreen-style section header.

Page composition: BackgroundTraces → Hero → Now → Planned → Footer.
All colors/motion come from `@theme` tokens (ADR 0003); every animation respects
`prefers-reduced-motion`.

## Trade-offs

- (+) Distinctive personal brand; theme centralized in tokens.
- (−) Glow/motion need ongoing a11y care (contrast, reduced motion).
