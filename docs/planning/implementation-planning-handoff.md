# Implementation-planning handoff

Status: product decision planning complete as of 2026-10-25. All six final governance choices were explicitly approved. The map audit found 28 specified child decisions and no new material decision needed before implementation planning. This is a handoff for planning implementation, not a claim that the application or managed service is built or qualified.

## Canonical specification

[Wayfinder: define the complete AI OSINT Spider product](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/1) is the canonical index. Each linked decision issue holds its resolution. Read the resolution before relying on an earlier proposal, research note, or prototype. Research establishes constraints; prototype approval establishes intended behavior; neither proves a working integration.

The following references provide entry points for implementation planning:

- [Domain model and truth states](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/6) and the [root glossary](../../CONTEXT.md) define the Case vocabulary. Earlier planning and research records were committed with the glossary on 2026-10-26; canonical issue resolutions take precedence over historical notes.
- [Source authorization](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/7), [provenance and integrity](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/14), [identity and collaboration](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/16), [lifecycles](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/20), and [supervised autonomy](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/9) define authoritative behavior.
- [Deployment ADR](../adr/0001-local-first-clients-with-private-managed-cloud.md), [persistence and portability](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/15), and [application architecture](application-architecture-proposal.md) define runtime and repository boundaries.
- [Extension trust](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/11), [Connector catalog](initial-connector-catalog-proposal.md), and [Connector SDK](connector-sdk-execution-contract-proposal.md) define package admission and execution.
- [Briefing workspace](case-workspace-interface-proposal.md), [investigation views](investigation-views-interface-proposal.md), [platform parity](platform-capability-parity-proposal.md), and [grayscale accessibility](grayscale-dark-theme.md) define the client experience. Their historical previews are design evidence.
- [AI context and memory](ai-context-memory-proposal.md), [subscription plans](subscription-plans.md), [shared workflow decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/19), and [seven investigation templates](investigation-template-defaults-proposal.md) define cross-feature behavior.
- [Operational readiness](release-operational-readiness-proposal.md) and [licensing, governance, and release policy](licensing-governance-release-proposal.md) define qualification and release authority. [Release-stage declarations](release-stage-policy.json) provide the implementation milestone dependencies.

## Preserve the destination

Keep the public clients/local runtime free and accountless for device-local Cases. Portable archives provide manual transfer. The private paid managed service owns hosted access, synchronization, collaboration, recovery, managed storage, and managed jobs. There is no supported self-host managed backend. Web and Electron expose the same supported product features; mobile exposes the approved usable subset with context-preserving handoff.

Use the universal Case model, versioned source material and citations, human-controlled Findings and Reports, current host authority, bounded execution, and explicit source/credential/disclosure/spending approvals. New Cases remain Suggest only. CLI subscription sessions stay on the user-controlled desktop or attached Runner. Templates and extension installation grant no authority.

Preserve all seven template scenarios, approved interoperability formats, and the complete 33-adapter target. An adapter needs an independently admitted exact version and current access/rights evidence on a declared supported execution path. A user's missing optional credential/runtime remains a truthful readiness state. An unimplemented placeholder does not satisfy the target. Conditional Brave has its own rights gate and does not change the count. A permanent target change returns to the user as an explicit scope decision.

## First implementation-planning work

1. Review the consolidated planning baseline against its canonical issue resolutions before creating implementation tickets. Preserve the dates and limitations of historical research. Keep unrelated local agent configuration and skill updates separate. Do not imply an old draft is approved merely because its file exists.
2. Produce the file/component ownership and rights inventory. Keep the current Unlicense text until a separately reviewed implementation patch accurately describes legacy material, new Apache-2.0 original work, third-party notices, and package metadata. Plan DCO enforcement and verified public/private security intake before inviting contributions or reports under the new policies.
3. Break the Foundation proof milestone into executable tickets, each with its decision links, native blockers, owner, real proof procedure, and acceptance artifact. Prioritize actual platform encryption/recovery, host transaction lifetime, containment/egress, authoritative command acceptance, and clean public builds. Do not let source scaffolding stand in for these proofs.
4. Plan a complete General investigation slice through accountless intake, qualified capture, review, cited Report, archive round trip, budget exhaustion, and recovery. Use this to exercise the shared Domain and host adapters before expanding across all templates and clients.
5. Expand into the approved beta and GA milestones using their declared dependencies. Local GA and Paid managed GA have separate approvals; managed-preview readiness does not block Local GA. Every public executable release still needs its applicable safety, signing, rights, support, and reporting gates.

Implementation tickets belong to a new execution plan, not this completed decision map. Use the configured GitHub issue tracker and its standard triage labels. Set named accountable humans before a ticket or release depends on their approval; role names in a document are not staffing evidence.

## Required evidence remains open

The 23 release gates are all not-run. The approved budgets, reliability/recovery targets, incident timings, platform matrix, and support targets remain requirements rather than measured achievements. Each future passing gate must bind its procedure, actual evidence, exact artifact digest, platform, timestamp, and accountable human. Missing or failed required evidence blocks promotion.

Unproven technical questions include SQLCipher/native packaging and key recovery, native mobile builds, same-origin local browser behavior, engine-specific transactions, isolated workers and complete egress control, offline conflict/deletion recovery, provider-compatible authentication, individual adapter retention/export rights, and signed staged updates. Resolve these with integration proof and accurate failure states. Return only a changed product tradeoff or permanent scope change to decision review.

The declaration checks can be rerun now:

```text
node docs/planning/check-application-architecture.mjs
node docs/planning/check-investigation-templates.mjs
node docs/planning/check-release-readiness.mjs
node docs/planning/check-release-stage-policy.mjs
```

They validate declared models and generated artifact consistency. They do not execute the app, prove legal clearance, qualify live Connectors, verify staffing, enable reporting, or pass production release gates.

No implementation tickets, package installation, license-file replacement, repository security setting, deployment, purchase, or external submission was performed as part of closing this planning map.
