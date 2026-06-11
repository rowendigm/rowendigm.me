# Labels — PR / issue taxonomy

Label every PR (and issue) so work is trackable. Two axes:

- **`type:*`** — the kind of change (mirrors the Conventional Commit type).
- **`area:*`** — the part of the site touched.

`/label sync` creates/updates these in the repo; `/open-pr` adds them at PR creation.
Extend as needed — add a row, re-run `/label sync`.

## type

| label | color | meaning |
|---|---|---|
| `type: feat` | `1d76db` | new capability / section |
| `type: fix` | `d73a4a` | bug fix |
| `type: refactor` | `5319e7` | restructure, no behavior change |
| `type: perf` | `0e8a16` | performance |
| `type: docs` | `0075ca` | docs / ADRs |
| `type: test` | `fbca04` | tests |
| `type: chore` | `cfd3d7` | tooling / deps / scaffolding |
| `type: ci` | `bfd4f2` | CI / build pipeline |

## area

| label | color | meaning |
|---|---|---|
| `area: sections` | `c5def5` | components/sections/* (page sections) |
| `area: ui` | `c5def5` | components/ui/* + top-level visual components |
| `area: content` | `c5def5` | content/ (ProfileData) |
| `area: theme` | `c5def5` | @theme tokens / globals.css |
| `area: config` | `c5def5` | build/config (next.config, tsconfig, …) |
| `area: deploy` | `c5def5` | Cloudflare / headers / SEO |
| `area: harness` | `c5def5` | .claude/ rules, agents, commands, hooks |
| `area: docs` | `c5def5` | docs/ — architecture, ADRs |
