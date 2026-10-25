# Licensing, governance, and release stages

Status: draft for user review. Six choices remain open. This document proposes policy and future acceptance gates. It changes no license, repository setting, staffing assignment, release, or service commitment.

Decision: [Define licensing, governance, and release stages](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/29).

Artifacts: [release-stage registry](release-stage-policy.json), [declaration checker](check-release-stage-policy.mjs), and [primary-source constraints](../research/licensing-governance-constraints.md).

## Fixed product boundary

The public repository contains the clients, local host, Runner, SDK, contracts, and shared Domain. A separate private repository contains the managed service implementation. Private builds consume reviewed immutable public packages. Public builds need neither the private repository nor private registry credentials. This follows the [approved architecture](application-architecture-proposal.md), rather than introducing another deployment model.

Free accountless device-local Cases, portable archives, web/Electron parity, focused mobile capabilities, the private project-operated service, and the approved commercial targets remain fixed. A release stage changes what is ready to offer, not the destination. An early milestone is not a claim that the complete product exists.

The [operational decision](release-operational-readiness-proposal.md) already fixes platform qualification, immutable seven-day holds, signed rollout, recovery, telemetry, incident staffing, and the U.S. hosting boundary. The [SDK decision](connector-sdk-execution-contract-proposal.md) fixes exact-version admission and protocol support. These gates cannot be waived by renaming a release beta or selecting a governance option below.

## Q1. Public licensing and rights review

Recommendation: use Apache-2.0 for new project-owned original public code and accompanying project documentation after a file-level ownership and compatibility review. Keep the managed implementation private under separately reviewed service and employment/contribution terms. The express contributor patent terms make Apache-2.0 a useful permissive baseline for reusable public packages.

The current root LICENSE is the Unlicense. Do not replace it as a side effect of accepting a planning proposal. Implementation must inventory existing files and contributions, preserve earlier grants, identify which owners can license which material, and publish an accurate file/package license map before distribution. Previously distributed material does not lose its original permissions. Preserve third-party licenses, notices, required source offers, and attribution independently of the project license. Ambiguous ownership blocks the affected material, not an assertion that the project owns it.

The recommended policy is prospective and does not assert that all historical material can be converted. Original new files may use Apache-2.0 while legacy files retain their applicable licenses. A later implementation change to root and package metadata must describe that mixed state accurately. Do not describe the entire repository as uniformly Apache-2.0 until the inventory supports that claim.

Software licensing, Source access terms, collected data rights, trademarks, model/provider terms, and customer Case content are separate reviews. Installing an adapter grants no right to retain, redistribute, or export its output. Neither the project license nor paid enrollment licenses customer Case data to the public.

For every shipped dependency, native component, optional runtime, adapter, and data source, record exact version/digest, origin, license/terms evidence and review date, permitted integration/distribution mode, notices/source obligations, retention/export restrictions, and responsible reviewer. Include transitive and packaged components. Copyleft or unclear terms require an integration-specific review; calling a program through a subprocess is not a blanket clearance. A manifest license label alone is insufficient evidence.

Alternative: retain the Unlicense for new original public work, with the same ownership, third-party, and data-rights gates. This minimizes license transitions but does not add Apache's express contributor patent provisions.

## Q2. Contributions and conduct

Recommendation: require Developer Certificate of Origin 1.1 sign-off on contributions, inbound under the applicable file/package license, without a mandatory CLA. Contributors retain their rights; sign-off records their certification of the right to contribute. It does not cure missing ownership, assign copyright, or grant blanket future relicensing power. An automated sign-off check supplements human provenance and license review.

Require origin and license disclosure for imported or generated material. Contributors remain responsible for the rights and review of AI-assisted contributions. Reject fabricated evidence, credentials, private Case records, unauthorized copies, and synthetic tests containing real secrets. Prefer deterministic synthetic fixtures and licensed samples.

Use a concise public conduct policy prohibiting harassment, doxxing, and publication of private investigation material. Route conduct complaints privately to named maintainers. Apply documented moderation with an appeal to an uninvolved maintainer when one is available; the owner records the final decision if no independent appeal is possible. Do not advertise an independent committee that does not exist.

Alternative: require a separately reviewed CLA before accepting contributions, with its actual copyright and patent terms published before use. Do not assume that the label CLA implies assignment or unrestricted relicensing rights.

## Q3. Maintainer authority and release approval

Recommendation: owner-led governance with named delegated responsibilities and independent human review for critical changes and releases. The project owner approves roadmap/scope, maintainership, licensing changes, paid-service terms, and policy exceptions. Delegation is recorded, narrow, and revocable. No agent can appoint itself or grant itself an exception.

Assign a code reviewer, rights/Source-policy reviewer, security responder, and release operator for each relevant component. These are responsibilities, not a claim of existing staff. One person may hold several roles, but the author or artifact producer cannot be their own independent critical approver. A release needs a named human operator and a different human approver. Critical changes to grants, credentials, isolation, encryption, synchronization, deletion, migrations, billing, or update trust require independent review before shipping.

If an independent approver is unavailable, hold the release. Emergency exceptions retain the named independent approver and the minimum safety checks already approved in the operations decision. Ordinary contributions can use one qualified maintainer review. Agents can prepare changes, tests, evidence, and drafts; humans retain protected approvals and publication authority.

The release owner owns the immutable evidence ledger. The rights reviewer blocks distribution or Source use without a supported rights decision. The security responder can suspend an affected version or dispatch capability immediately under the existing revocation policy. The project owner resolves policy disagreements; they cannot relabel missing technical evidence as passed.

Alternative: permit a single owner to review and publish with a documented self-review record until more maintainers join. Signing, provenance, safety, and operational gates still apply, but independent human review would not be required.

## Q4. Public issues and private vulnerability reports

Recommendation: use public GitHub Issues for sanitized feature/bug reports and enable GitHub private vulnerability reporting and draft security advisories before public executable releases. Publish SECURITY.md with supported versions, reporting instructions, expected handling, and the distinction between a project vulnerability and a finding in an investigator's target program. Do not test GitHub reporting by submitting a real vulnerability or customer data.

Target acknowledgement within three business days and initial triage within seven calendar days for a report containing enough information to investigate. Coordinate a disclosure target of 90 calendar days from a usable report, with earlier disclosure for active exploitation and documented mutually discussed extensions where justified. This is a coordination target, not a promise to fix every report within 90 days or permission to leave users exposed. Keep the reporter updated at least every 14 days while an accepted report is open.

Private reporting must be enabled and tested with synthetic material. If unavailable, publish and test a private replacement before inviting reports; do not invent an unmonitored security address. Restrict advisory access, redact Case information and credentials, arrange a private transfer for necessary evidence, and publish an advisory when disclosure is ready. Public bug reports accidentally containing sensitive material use the documented containment/removal workflow and appropriate platform support, without promising erasure from existing copies.

GitHub's public-repository reporting features do not establish a reporting channel for the private backend. Publish and test its private intake and response path separately, with restricted access and a sanitized public disclosure path when appropriate.

Triage issues using the project's existing needs-triage, needs-info, ready-for-agent, ready-for-human, and wontfix labels. Link the originating requirement and concrete acceptance criteria before work is marked ready. Security reports stay in the private workflow until sanitized disclosure. The product's Bug bounty template does not imply this project operates a paid bounty program.

Alternative: use the same private reporting and acknowledgement process, but choose disclosure dates case by case without a standard 90-day target.

## Q5. Support and deprecation

Recommendation: support the current application major and a retiring major for at least 12 months after its successor reaches GA. This includes material correctness and security fixes for the declared supported platform matrix, not every old minor forever. Publish supported minor/patch lines and a tested upgrade path. The SDK's independently approved minimum 12-month protocol window remains in force even if application support differs.

Give at least 90 days' notice for ordinary removal of a supported feature or service contract. Security, legal, upstream Source-policy, and unsupported OS/runtime constraints may require immediate suspension or earlier end of execution support. Explain the reason, affected versions, remaining read/export access, and available migration. Preserve old Case records, historical manifests, and archive readability under the existing compatibility requirements. Never silently replace pinned executable versions or delete material to simplify retirement.

Free Local receives best-effort community issue support with no response-time SLA. Paid Personal Cloud and Team receive staffed asynchronous support with a two-business-day first-response target during published support hours and holidays. Set the actual calendar and responsible people before selling the plan. This is separate from the already required 24/7 production incident pager and P0 timings. Enterprise response guarantees require a separately staffed and reviewed contract, not a template promise.

Alternative: support only the current application major with a 90-day migration window after its successor, retaining the fixed SDK window, safe archival access, security suspension rules, and the same customer-support channels.

## Q6. Measurable release stages

Recommendation: progress through Foundation proof, Local alpha, and Public beta with a limited managed preview. Approve Local GA and Paid managed GA separately after their respective gates pass. Set no calendar deadline before the implementation plan and staffing/cost checks exist. This lets the free local product ship when qualified without implying the paid service is ready.

Foundation proof is internal. Prove public-only reproducible build inputs, actual import boundaries, key/storage/Artifact encryption and recovery on both desktop OS families and the native mobile storage path, one shared domain command with durable provenance, and a contained worker denied unauthorized access. Fail closed when containment cannot be qualified. These are real integration experiments, not acceptance of the architecture diagram.

Local alpha is an explicitly incomplete opt-in prerelease. Prove accountless local use in Electron and the compatible web entry, one complete General scenario from intake through captured material, human Finding review, cited Report, and portable archive round trip. Prove budget exhaustion, cancellation, crash recovery, and denied unauthorized dispatch using admitted adapter versions. Expose the same supported feature slice on web and Electron. Do not advertise unsupported features through dead controls.

Public beta expands the complete planned workflow and focused native mobile paths. Run all seven template scenarios and shared acceptance requirements, platform accessibility checks, offline conflict/handoff, provider/Runner boundaries, and active-scope denial scenarios. Managed preview needs qualified access control, encryption, restore, deletion, region disclosure, cost limits, and support before accepting real Cases. Keep preview limitations explicit and do not sell GA guarantees while reliability or staffing remains unproven.

Local GA requires the complete approved local capability scope on the qualified platform matrix, all template and interoperability acceptance, public clean builds and notices, support ownership, migration/recovery evidence, and the applicable performance/security/update gates. Every C01-C33 adapter must have an implemented, independently admitted version on its declared supported execution path, plus current upstream-rights/access evidence. Optional credentials/runtimes and supported-platform limitations stay visible. Their absence on a user's device does not count as an adapter failure. A placeholder, historical test, or unexplained unavailable status does not complete the catalog target. Conditional Brave remains separately governed and does not inflate the 33-adapter count.

If upstream policy or rights prevents a target adapter from qualifying, record the blocker and ask the user to approve any permanent scope change. Continue a truthful preview while unresolved; do not silently shrink the destination or require live third-party success on every installation. Interoperability formats, retained provenance, and safe unavailable/fallback behavior still need fixtures and qualified integration evidence.

Paid managed GA additionally requires all local/shared release gates and private build/deployment isolation, validated entitlements/metering/spend limits, collaboration authorization/conflicts, managed recovery/deletion, production performance, the 30-day reliability observation, signed staged promotion, 24/7 pager with backup, support staffing, disclosed U.S. locations/operators, and reviewed customer terms. The operations evidence ledger binds exact artifacts/platforms and actual measurements. A plan target or declaration checker is not a passing measurement.

Stages are governed by evidence, not percent-complete scores. Each gate has a named accountable human, exact candidate/platform/digest, test procedure, evidence reference, timestamp, and passed/failed/not-run status. Required failed or not-run evidence blocks promotion. Scope exceptions cannot waive source authority, integrity, privacy, encryption, isolation, or recoverability. No production deployment or external submission follows automatically from this proposal.

Alternative: use the same proof stages and gates but wait for a joint Local/Paid managed GA announcement. This simplifies a single launch while coupling local availability to managed operational readiness.

## Planning handoff

The [registry](release-stage-policy.json) makes proposed milestones, dependencies, gate ownership roles, and the complete catalog target checkable. All gate measurements remain not-run. `node docs/planning/check-release-stage-policy.mjs` checks declarations and rejects invalid policy examples. It does not validate legal clearance, staffing, reporting setup, actual builds, or release readiness.

After the user settles these six choices, audit the map for new material decisions before closing it. Preserve canonical issue resolutions and assemble the approved artifacts into an implementation-planning brief. Implementation tickets, repository consolidation of earlier untracked planning material, license-file changes, CI settings, hiring, purchases, and launches are subsequent work. Closing the planning map does not authorize an automatic release or claim the app exists.
