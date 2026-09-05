# Investigation views interface

Status: approved September 4, 2026.

Decision ticket: [Prototype graph, timeline, map, search, and live-agent views](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/13).

Primary-source prototype: [`prototype/issue-13-investigation-views`](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/tree/prototype/issue-13-investigation-views/prototypes/investigation-views).

## Decision

Use the graph-first Network canvas as the primary investigation view. Keep the approved expanded Case sidebar. Place the Relationship graph in the main work area, an Entity inspector beside it, a synchronized Timeline below it, and a compact live Research run panel beside the Timeline.

The graph is an investigative workspace, not a decorative diagram. Every displayed Entity and Relationship must lead back to its Claims, Evidence links, Artifacts, Sources, review state, and discovery path from Seed information.

## Relationship graph

- Start with Seed information and the selected Entity in focus. Hide unrelated material until the user expands, searches, or changes filters.
- Use shape, labels, and status marks together. Color cannot carry Entity type, review state, or confidence by itself.
- Draw supported Relationships with solid lines. Draw proposed Relationships and AI-generated Inferences with a visibly different dashed treatment.
- Label each Relationship with its type. Directional Relationships show arrowheads.
- Clicking an Entity selects it across the graph, Timeline, Map, search results, and inspector.
- Expanding a node previews the new Entities and estimated result count before adding them to the canvas when the operation may produce a large graph.
- Never merge Entities automatically. Candidate matches remain separate and display the reason, confidence assessment, and required investigator action.
- Graph layouts may be force-directed, hierarchical, geographic, or chronological, but switching layout cannot change the underlying Relationships.

## Entity inspector and previews

The inspector explains why the selected item appears in the Case. It shows Entity type, accepted and proposed Claims, source agreement, confidence assessment, contradictions, Evidence links, and related Artifacts.

Artifact and link previews open without losing graph position. A preview shows the preserved content or safe local rendering, Source, capture time and limit, integrity state, extraction derivatives, and the Claims it supports or contradicts. Remote HTML never runs inside the privileged application interface.

## Synchronized Timeline and Map

The Timeline is a persistent filter under the graph. Selecting an event or changing the time window updates the graph, Map, and inspector together. Hidden material remains counted so the investigator knows the filter changed what they can see.

The Map opens as a full peer view or a docked panel. Selecting a location updates the graph and Timeline. Precise locations follow the Case access and redaction rules. Map paths distinguish observed movement from proposed routes.

Timeline playback animates only recorded Case state. It does not imply that missing intervals are known. Users can pause, change speed, compare periods, and return to the full time range.

## Search

Global search covers authorized Cases, Entities, Artifacts, Claims, Findings, Relationships, Sources, Reports, and Case history. Case search uses the same interaction but labels its narrower scope.

Search results show the owning Case, item type, review state, matching excerpt, and access status. Selecting a result opens it in context rather than replacing the investigation workspace with a generic results page. Natural-language questions may produce an explainable connection path, but each step must cite stored Case material.

## Confidence and truth state

Confidence describes a specific assessment, such as source agreement, extraction quality, identity-match likelihood, or Relationship support. The interface always names what the number measures. It does not combine these assessments into a guilt, threat, or person-risk score.

Findings, Claims, Inferences, Hypotheses, contradictions, and items needing review use separate labels. The AI may propose analysis, but only an authorized investigator can accept a Finding or Entity merge.

## Live Research work

The compact panel shows whether a Research run is active and which subagents are working. Opening it reveals the parent-child agent tree, current model, time and action budgets, tool calls, safe inputs and outputs, browser pages, captures, generated Case material, errors, and status.

Users with permission can pause or stop one branch, or stop the entire Research run. The live browser remains read-only for Research runs. Secrets, credentials, protected content outside the user's access, and private model reasoning never appear in the stream.

## Responsive behavior

- Wide desktop keeps the graph, inspector, Timeline, and compact live-work panel visible.
- Narrow desktop preserves the expanded labeled sidebar. The inspector becomes a labeled drawer while the Timeline remains attached to the graph.
- Mobile uses a full labeled navigation sheet and one view at a time. Selection stays synchronized when the user moves between Graph, Timeline, Map, inspector, and live work.

## Acceptance criteria

- A user can trace every visible Relationship back to supporting or contradicting Case material.
- Selecting an Entity or event updates every open investigation view without losing context.
- Filters disclose how many items they hide.
- Proposed AI connections cannot be mistaken for accepted Findings.
- Global search opens results in their original Case and investigation context.
- A user can preview an Artifact or Source without executing remote content in the application interface.
- Authorized users can inspect and control parent and subagent work in real time without exposing secrets or private model reasoning.

This decision extends the approved [Case workspace interface](case-workspace-interface-proposal.md). Detailed storage, query, rendering, and streaming implementation belongs in the later architecture and implementation plan.
