# Case workspace interface

Status: approved September 4, 2026.

Decision ticket: [Prototype the case workspace and information organization](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/12).

Primary-source prototype: [`prototype/issue-12-case-workspace`](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/tree/prototype/issue-12-case-workspace/prototypes/case-workspace).

## Decision

Use the prototype's Briefing room direction as the default Case workspace. Keep its calm, narrative-first Case summary and progressive disclosure, but use a permanently expanded, labeled desktop sidebar instead of an icon-only or collapsed rail.

The interface should help a new investigator understand the supported account first while keeping the underlying material, Relationship graph, Case history, model, instructions, Skills, and live Research run one deliberate action away. Expert capability should remain available without turning the default view into a database table or a dense control surface.

## Desktop structure

The workspace has three stable regions:

1. **Expanded sidebar.** Show the product name, labeled workspace destinations, recent Cases with identifiers and types, Settings and Skills, and the signed-in user. The active Case and active destination remain visible. Do not replace the labels with an icon-only rail at narrower desktop widths.
2. **Narrative Case canvas.** Lead with the current cited Case summary. Present confirmed Findings, unresolved Claims, Inferences, review state, and supporting Artifacts as a readable sequence. Every material statement links back to its supporting or contradicting material.
3. **Case pulse.** Show human-review coverage, open Leads, unresolved Claims, collection recency, selected model, Case chat entry, and the current Research run. This region may move below the narrative when horizontal space is limited, but it must remain directly accessible.

The sidebar destinations are Case brief, Case material, Relationship graph, Map and timeline, and Case history. Case material opens the Folder and Artifact workspace. Selecting an Artifact opens its preview with provenance, integrity, extracted details, Evidence links, and related material without losing the current Case context.

## Responsive behavior

- Wide desktop keeps all three regions visible.
- Narrow desktop keeps the expanded labeled sidebar and narrative canvas; Case pulse moves into the canvas or a labeled panel.
- Mobile uses a full labeled navigation sheet opened from the header. It does not introduce an icon-only collapsed rail. The Case brief becomes a single readable column, and Case pulse follows the summary.

## Interaction rules

- Global search and Case search are visually distinct and always label their scope.
- Case history is searchable, chronological, and separate from Case chat and the Timeline.
- Model selection is stored per Case and may be changed without discarding prior Research run provenance.
- Case settings show editable Case instructions, inherited global instructions, enabled global and Case Skills, authorization, Sources, members, models, and history.
- Live work shows the parent agent, visible subagents, current tools, safe inputs and outputs, browser activity, budgets, status, and pause or stop controls. Secrets and private reasoning are never displayed.
- AI-created Claims, Inferences, Leads, Relationships, and Entity matches remain visibly distinct from investigator-accepted Findings and approved Entity merges.
- Sensitive case material remains visible to authorized Case members. Previews and exports outside the Case use the approved redaction rules.

## Acceptance criteria

- A first-time user can identify the active Case, its current supported account, unresolved questions, and next review action without opening another view.
- A user can reach any labeled primary destination from the expanded sidebar without interpreting icons.
- Every summary statement exposes its provenance and review state.
- A user can add Seed information, open organized Case material, preview an Artifact, search Case history, change the Case model, edit Case instructions, manage Skills, chat with the agent, and open live Research work from the workspace.
- At no supported desktop width does the sidebar become an icon-only rail.

The detailed Relationship graph, Map and timeline, global search, and live-agent visualization remain the subject of [issue 13](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/13).
