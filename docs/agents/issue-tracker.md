# GitHub issue tracker

Issues and specifications for this repository live in GitHub Issues. Use the `gh` CLI for all operations.

Repository: `TheDarkSkyXD/OSINT-AI-Spider`

External pull requests are not treated as triage requests.

## Conventions

- Create, read, edit, comment on, label, assign, and close issues through `gh`.
- Infer the repository from the configured Git remote.
- Use native GitHub sub-issues and dependencies when available.
- Fall back to task lists and `Blocked by` lines when native relationships are unavailable.

## Wayfinding operations

- A map is one issue labeled `wayfinder:map`.
- Decision tickets are child issues labeled `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`, or `wayfinder:task`.
- Claim a ticket by assigning it to the current developer before work begins.
- Use GitHub issue dependencies to record blockers.
- The frontier contains open, unassigned child tickets with no open blockers.
- Resolve a ticket by posting its answer, closing it, and adding a linked summary to the map.
