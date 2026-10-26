# AI OSINT Spider

AI OSINT Spider organizes lawful open-source research around durable cases while preserving how collected material and analysis connect back to the investigator's starting information.

## Language

**Case**:
A durable workspace for one investigation or research objective. It may contain many pieces of Seed information and groups collected material, analysis, and the record of how they changed.
_Avoid_: Project, scan, database

**Case template**:
A versioned configuration preset for Case intake, suggested organization, relevant capabilities, and review guidance. It uses the universal Case model and grants no authority.
_Avoid_: Case type, permission grant, executable Plugin

**Case status**:
The lifecycle position of a Case: draft, active, paused, closed, or archived. Closed and archived Cases may be reopened; permanent deletion is governed separately.
_Avoid_: Progress, folder state

**Seed information**:
Information supplied by an investigator as a starting point for research within a Case.
_Avoid_: Target, raw input

**Relationship graph**:
A primary Case view that maps Entities and Relationships while preserving every discovery path back to one or more pieces of Seed information and supporting material.
_Avoid_: Spider web, network chart

**Case history**:
A chronological, append-only record of investigator actions, research activity, collected material, and analysis changes within a Case. Corrections create new entries, while reversals, deletions, and redactions remain visible without retaining protected content in ordinary views.
_Avoid_: Chat history, audit log

**Source**:
The origin from which case material came, such as a web location, public record, authorized account, person, or imported file.
_Avoid_: Evidence, citation

**Artifact**:
A preserved unit of material added to or collected for a Case, such as a document, image, page capture, message, or data record. Its original content does not change; annotations, OCR, translations, crops, redactions, and corrections become linked derived material or new versions.
_Avoid_: File, result, evidence

**Claim**:
A statement about an Entity or Relationship whose origin and review state are preserved. A Claim may come from an investigator, an Artifact, or an AI agent.
_Avoid_: Fact, data point

**Evidence link**:
A case record connecting a Claim to an Artifact that supports, contradicts, or otherwise bears on it.
_Avoid_: Proof, citation

**Inference**:
A Claim derived by an AI agent or analysis process from other case material. It remains distinct from an investigator-accepted Finding.
_Avoid_: Fact, conclusion

**Hypothesis**:
A testable proposed explanation or connection that guides further research without asserting that it is true.
_Avoid_: Theory, prediction

**Finding**:
A Claim or conclusion that an authorized investigator has reviewed and accepted for use in the Case, with its sources, support, contradictions, and confidence still visible. An AI agent may recommend but cannot approve this promotion.
_Avoid_: Fact, AI finding

**Entity**:
A distinct person, organization, place, account, digital asset, physical object, event subject, or other case-specific thing that Claims and Relationships describe.
_Avoid_: Node, record

**Relationship**:
A typed and directed connection asserted between Entities, with its Claims and Evidence links preserved independently from its graph display.
_Avoid_: Edge, link

**Entity merge**:
A recorded, reversible decision that two Entity records represent the same real-world thing. Suggested matches remain separate until an investigator approves the merge.
_Avoid_: Deduplication, automatic match

**Folder**:
An investigator- or agent-managed Case grouping that references existing material without owning or duplicating it. The same item may appear in several Folders.
_Avoid_: Directory, category

**Research run**:
A bounded, replayable AI or automated research activity within a Case. It preserves its Seed information, request, model, instructions, skills, tools, approvals, outputs, errors, usage, and final status.
_Avoid_: Scan, agent session

**Case summary**:
The current cited overview of a Case, generated from its structured material and preserved as a sequence of versions.
_Avoid_: Report, final answer

**Report**:
A purpose-specific, versioned snapshot assembled from reviewed Findings for export or communication outside the active Case workspace.
_Avoid_: Case summary, dashboard

**Case chat**:
The preserved conversation between investigators and AI agents about a Case. A message affects structured case material only when a user or agent explicitly promotes it.
_Avoid_: Case history, evidence

**Lead**:
A possible research avenue recorded with its rationale, priority, status, and origin. A Lead proposes what may be worth pursuing without asserting that it is true.
_Avoid_: Finding, Task

**Task**:
An assigned Case action recorded with its status, due information, and outcome. A Task may pursue a Lead but is not itself evidence or a conclusion.
_Avoid_: Lead, reminder

**Activity lifecycle**:
The concept-specific states and transitions of a Lead, Task, or Research run. These concepts do not share a generic status because their pauses, failures, completion, and dismissal have different meanings.
_Avoid_: Generic status, progress flag

**Case authorization profile**:
The declared purpose, permitted scope, authority basis, jurisdiction, sensitivity, and prohibited actions governing research within a Case. Automated collection cannot begin until this profile is complete.
_Avoid_: Disclaimer, terms checkbox

**Source class**:
The access and handling category assigned to a Source: public, user-provided, authorized-account, licensed, restricted, or prohibited. Technical reachability alone does not make a Source public.
_Avoid_: Public/private flag, connector type

**External side effect**:
An action that changes an external system or communicates with a subject, such as creating an account, posting, messaging, following, reacting, purchasing, uploading, or submitting a form. A Research run cannot perform one. An Authorized engagement may perform only the exact side effect approved by a person through a Managed account.
_Avoid_: Browser click, active research

**Managed account**:
An external-platform account truthfully owned or controlled by the user or their organization and used according to the platform's rules. It cannot be a fabricated persona, an impersonation, or a credential borrowed without authority.
_Avoid_: Puppet account, burner account, fake persona

**Authorized engagement**:
A separately approved workflow that creates or uses a Managed account to communicate or change an external platform. It is distinct from a Research run, requires a preview and approval for each outward action, and preserves the action and response in Case history.
_Avoid_: Active research, autonomous outreach, social engineering

**Sensitive case material**:
Case material concerning minors, victims, precise locations, biometrics, health, intimate content, or protected characteristics. Every authorized Case member may view the full material; previews, sharing, and exports outside the Case use redacted derivatives by default.
_Avoid_: Private data, secret data

**Core safety policy**:
The minimum prohibited-use and authorization rules enforced by every deployment. A deployment may add stricter rules but cannot weaken this baseline.
_Avoid_: Guidelines, optional policy

**Collection scope**:
The relevance, source, volume, and time limits derived from a Case authorization profile. Research retains only Case-relevant material, avoids redundant captures, and follows the applicable retention rules.
_Avoid_: Collect everything, crawl depth

**Policy precedence**:
The rule that every applicable core, organizational, Case, connector, jurisdictional, and provider restriction is combined and the strictest result governs an action.
_Avoid_: Case-owner override, provider-only policy

**Hard restriction**:
A prohibition imposed by the Core safety policy or an applicable legal, source, or provider rule. No user, Case, organization, plugin, or autonomy mode may override it.
_Avoid_: Warning, configurable block

**Policy exception**:
An authorized, reasoned, and recorded override of a risk warning or an organizational or Case-level restriction. It cannot override a Hard restriction.
_Avoid_: Safety bypass, admin override

**Connector**:
A versioned Case capability that accepts declared input types, collects from or analyzes a named Source, and returns preserved Artifacts and typed Observations under the applicable policy.
_Avoid_: Scraper, plugin, transform

**Skill**:
A versioned instruction bundle containing guidance, references, and assets that shape an agent's work. A helper that can execute code is governed as a Plugin capability even when distributed inside a Skill package.
_Avoid_: Tool, connector, unrestricted prompt

**Plugin**:
A versioned executable extension that may supply tools, processors, Connectors, or constrained interface contributions through declared permissions and an isolated runtime.
_Avoid_: Skill, arbitrary application code, trusted add-on

**Custom agent**:
A versioned, policy-bound configuration that composes instructions, model preferences, Skills, allowed Connectors and Plugins, an autonomy ceiling, budgets, and delegation rules. It references credential aliases but never contains credentials.
_Avoid_: AI model, unrestricted bot, automation identity

**Agent delegation**:
A recorded assignment from one Custom agent to an enabled, version-pinned Custom agent during the same Research run. The child receives a strict subset of the parent's remaining authority and budget, and its work remains attributed through the delegation chain.
_Avoid_: New run, permission inheritance, independent budget

**Extension library**:
A personal, device, Organization, or Case collection in which versions of Skills, Plugins, Connectors, and Custom agents are available for review and possible use. Library membership does not grant access to a Case or permission to execute.
_Avoid_: Case permissions, enabled plugins, marketplace

**Case extension grant**:
A versioned authorization that enables one exact extension version in a Case with declared data, tool, credential-alias, budget, and autonomy limits. A Case may narrow the extension's published limits but cannot widen them.
_Avoid_: Installation, global permission, trust tier

**Extension capability**:
A narrowly named operation or data scope that an extension declares and a Case extension grant may permit. Execution still requires current policy approval and a short-lived operation grant from the authoritative Case host.
_Avoid_: Runtime access, blanket permission, trust

**Extension package**:
A signed, versioned distribution container that may hold declared Skills, Plugins, Connectors, and Custom agents with their dependencies, compatibility, licenses, hashes, capabilities, and executable behavior. It is not itself an extension type or a permission grant.
_Avoid_: Plugin, capability pack, installer

**Observation**:
A structured record of what a Source returned or a tool measured, tied to its Artifact, Connector, Research run, time, and collection context. It may support a Claim but is not a Finding.
_Avoid_: Fact, result, evidence

**Passive collection**:
Research that reads user-provided material or third-party Sources without sending investigative probes to infrastructure controlled by the Case subject.
_Avoid_: Harmless collection, anonymous browsing

**Active collection**:
Research that sends investigative probes to infrastructure controlled by the Case subject, including port scans, DNS brute forcing, and vulnerability checks. It requires a separate capability pack and explicit target authorization.
_Avoid_: Normal OSINT, passive scan

**Pivot**:
The use of an Entity, Observation, Claim, or other declared Connector output as the input to another Connector while preserving the discovery path between them.
_Avoid_: Crawl step, arbitrary tool call

**Research plan**:
A bounded set of proposed or approved Connector actions for a Research run, derived from typed inputs and outputs and constrained by Case policy, budgets, duplicate suppression, and autonomy mode.
_Avoid_: Prompt, unrestricted agent loop

**Connector catalog**:
The registry of available Connectors and their publishers, versions, input and output types, permissions, Source classes, health, cost, risk, and support status.
_Avoid_: Plugin store, tool list

**Extension trust tier**:
An exact-version classification of bundled, verified, or local-development that communicates review and support status for a Skill, Plugin, Connector, or Custom agent without granting permissions or changing the Core safety policy. The product has no Community tier.
_Avoid_: Quality score, permission grant, popularity

**Capability pack**:
A curated group of Connectors and policy defaults for a coherent research purpose. Packs may add stricter authorization requirements, as the active-cyber pack does.
_Avoid_: Case template, plugin bundle

**Connector manifest**:
The declared identity, publisher, version, signature, licenses, source terms, inputs, outputs, permissions, credentials, network behavior, cost, rate limits, policy class, provenance behavior, tests, health checks, review status, and maintenance owner of a Connector.
_Avoid_: Package metadata, README

**Connector lifecycle**:
The operational state of a Connector: healthy, degraded, deprecated, suspended, or retired. Historical Case records keep the exact Connector version and provenance regardless of its current state.
_Avoid_: Enabled flag, install status

**Citation**:
A reference from a Claim, summary statement, or Relationship to the exact supporting Artifact version and, where available, its passage, page, image region, time range, or response field.
_Avoid_: Live link, proof

**Collection record**:
The record of a collection attempt identifying its Source, actor, Research run, Connector version, authorization context, time, outcome, and captured material. Separate attempts retain their own records even when their captured content is identical.
_Avoid_: Artifact, request log

**Capture status**:
The declared extent and form of preserved Source content, such as complete content, a partial capture, screenshot, excerpt, metadata only, or an uncaptured live link.
_Avoid_: Source reliability, verified source

**Evidence assessment**:
The separate evaluations of Source reliability, extraction or matching confidence, and investigator review state, each with its basis and origin preserved. Unknown values and contradictory support remain explicit.
_Avoid_: Truth score, AI certainty

**Artifact integrity**:
The agreement between preserved Artifact bytes and a previously recorded content digest. Integrity describes whether content changed relative to that reference, not whether its statements are true.
_Avoid_: Authenticity, factual accuracy

**Research replay**:
Inspection of the recorded actions, approvals, inputs, outputs, captures, and errors of a Research run without executing it again. Repeating the research creates a new run.
_Avoid_: Rerun, deterministic reproduction

**Export manifest**:
The record of an exported snapshot's included object versions, citations, file digests, custody history, redactions, capture limitations, and history checkpoint. It identifies what can be checked and what was omitted.
_Avoid_: Certificate of truth, admissibility certificate

**Case-library folder**:
A grouping of Cases in the investigator's library, distinct from a Folder of material within one Case. Removing the grouping does not delete its Cases.
_Avoid_: Case, material folder

**Pending Case change**:
A device's proposed change that the authoritative Case host has not accepted. It remains distinct from shared Case material and reviewed Findings.
_Avoid_: Saved shared change, synchronized evidence

**Case edit conflict**:
Incompatible changes to the same Case material that retain both versions for an investigator to resolve. A resolution becomes a new accepted version rather than silently replacing either contribution.
_Avoid_: Latest edit wins, automatic evidence merge

**Portable Case archive**:
An exported snapshot of permitted Case records, Artifacts, citations, and provenance with an Export manifest. A normal import creates an independent Case with a recorded origin, unlike an authorized backup restore that preserves Case identity.
_Avoid_: Cloud backup, synchronized copy

**Verified Case recovery point**:
A consistent saved state of a Case and its referenced Artifacts whose completeness and integrity have been checked for recovery. It is distinct from an untested backup file.
_Avoid_: Backup success notification, guaranteed recovery

**Case deletion marker**:
A minimal record that Case material was deleted, without retaining the protected content. It prevents reconnecting devices or restored backups from silently reintroducing that material.
_Avoid_: Archived material, recoverable trash

**Local operator**:
The person using an accountless local profile and acting as the authority for its local Cases. The managed service cannot recover or revoke this identity.
_Avoid_: Anonymous user, offline account

**Cloud user**:
One human identity registered with the managed service. A Cloud user may own personal managed Cases, join Organizations, and hold a separate Case role in each Case.
_Avoid_: Shared login, social account

**Organization**:
The managed team boundary for membership eligibility, policy, billing, and organization-owned Cases. Organization administration does not grant access to Case content.
_Avoid_: Tenant, workspace, team account

**Case member**:
A Cloud user with a current role in a managed Case. Every Case member may view all of that Case's content, including Sensitive case material.
_Avoid_: Partial viewer, hidden-folder user

**Case role**:
A named bundle of actions a Case member may perform. It controls actions rather than creating hidden content compartments inside a Case.
_Avoid_: Clearance level, content tier

**Full export grant**:
Permission to create a formal unredacted Case export. It controls the export workflow but does not claim that a Case member who can view content is unable to copy it.
_Avoid_: Download prevention, export role

**External collaborator**:
A Case member who does not belong to the owning Organization and whose membership has a required expiry.
_Avoid_: Public guest, Organization member

**Offline access lease**:
A signed, device-bound, time-limited authorization to open cached managed Case content and perform a declared set of offline actions.
_Avoid_: Trusted device, permanent offline access

**Automation identity**:
A nonhuman identity assigned to a managed worker, scheduled job, or attached Runner. Its actions remain attributed to both the automation and the human or schedule that initiated them.
_Avoid_: Shared service account, AI user

**Share package**:
An immutable, version-bound disclosure derived from a Report or Portable Case archive for named external recipients. It is redacted by default and never grants access to the live Case.
_Avoid_: Public Case link, shared live Case

**Break-glass access**:
Exceptional, short-lived Case membership granted for a recorded security, safety, or continuity reason, with strong authentication and immediate notification.
_Avoid_: Administrator bypass, hidden impersonation

**Timeline event**:
A versioned Case assertion about something that happened, may have happened, or is expected to happen in the investigated world, with its time precision, Claims, Evidence links, and review state preserved.
_Avoid_: Case history entry, activity log

**Approval request**:
A request for one or more authorized people to decide whether one exact, version-bound action may proceed. Approval permits the action to be checked again but does not guarantee execution.
_Avoid_: Permission, consent checkbox

**Schedule**:
A time rule that may dispatch a new Research run for each eligible occurrence. It never reuses a previous run.
_Avoid_: Recurring run, background loop

**Execution attempt**:
One Runner's bounded effort to advance a Research run from a durable point. A Research run may have several attempts after interruption without losing its identity or history.
_Avoid_: Research run, retry

**Run checkpoint**:
A verified durable snapshot of a Research run's public resumable state and accepted outputs. It does not contain or claim to reconstruct private model reasoning.
_Avoid_: Chain of thought, Case history entry

**Case memory**:
An editable account of Case objectives, unresolved questions, decisions, and public research progress, with links to its originating Case material. It guides later work without becoming evidence or an accepted Finding.
_Avoid_: Model memory, hidden reasoning, evidence

**Global memory**:
User-approved preferences and reusable methods available across Cases. It does not automatically include Case facts, identifiers, or Sensitive case material.
_Avoid_: Shared Case knowledge, automatic cross-Case memory

**Paid member**:
A named Cloud user or External collaborator whose access to managed Cases consumes one Team subscription seat. Custom agents, Automation identities, and service processes are not Paid members.
_Avoid_: Agent seat, service seat, anonymous guest

**Managed compute**:
Project-operated worker capacity consumed by hosted research or processing. It excludes work on a local runtime or attached Runner and excludes AI-provider or third-party service charges.
_Avoid_: AI credits, Research run count, local compute

**Service exit period**:
The disclosed read-only period after managed-service entitlement ends during which authorized users may inspect and export retained managed Cases before primary cloud content is deleted.
_Avoid_: Free sync, indefinite retention, cancellation grace
