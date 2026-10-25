# Release engineering and operational readiness

Status: approved planning decision. On October 25, 2026, the user selected all seven recommendations. Numerical values are approved engineering and launch-gate targets, not measurements, public guarantees, or selected service contracts.

Decision: [Define release engineering and operational readiness](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/27).

Evidence: [primary-source constraints](../research/release-operational-constraints.md). The [target registry](release-readiness-targets.json) records approved numerical limits and the [checker](check-release-readiness.mjs) verifies planning consistency. No application, release workflow, backup system, or benchmark is implemented here.

## Existing commitments

The [approved architecture](application-architecture-proposal.md) fixes React/Vite web and Electron, shared TypeScript rules, Node/Fastify hosts, narrow Rust native integration, Expo mobile, a public workspace, and a separate private managed backend. Web and Electron retain the same features through their eligible hosts. Local use requires no account.

The [SDK contract](connector-sdk-execution-contract-proposal.md) fixes exact-version grants, host-owned execution policy, scope and credential brokering, bounded retries, checkpoints, independent Connector admission, and at least 12 months of protocol-major support after a successor ships. These requirements remain in force throughout updates and incidents.

The [subscription decision](subscription-plans.md) fixes 30 days of managed recovery points, a 30-day read/export exit period, and backup expiry within a further 30 days after primary deletion, subject to its disclosed exceptions. It also requires measured hosting, recovery, and compute economics before publishing price or service guarantees. This proposal preserves those periods and does not set an unmeasured included compute allowance.

## Approved supported launch platforms

Qualify a bounded platform matrix before claiming support:

- Electron and local runtime on serviced Windows 11 releases, x64; Ubuntu 24.04 LTS and 26.04 LTS, x64.
- Desktop web on current and previous stable Chrome, Edge, and Firefox. Include current and previous stable Safari for managed web after its full workspace checks pass. Safari is not a claim of a macOS local runtime.
- Focused native mobile features on qualified Android 12+ and iOS 18+ devices, with real native development/release builds. Record device and OS coverage rather than treating every newer phone as automatically verified.
- Defer Windows/Linux ARM64, other Linux distributions, and a macOS desktop/local runtime until separately qualified. Direct hosted-page-to-loopback pairing remains optional as already approved.

These are project support targets, not the minimum versions permitted by Electron or Expo. Pin exact serviced OS releases, browser builds, native SDKs, and device models in each release qualification manifest. Test the minimum mobile OS and current OS, representative low-memory devices, touch/keyboard input, screen readers, scalable text, and reduced motion.

An unsupported platform may receive a clear compatibility explanation or read-only import alternative; it must not be advertised as qualified. A failed platform build delays that platform's release. It does not justify shipping plaintext storage, disabling process isolation, or silently removing required web/Electron features. Continue upstream security maintenance rather than preserving an obsolete Electron runtime to satisfy wire compatibility.

## Approved release, update, and migration gates

Extend the existing ordinary seven-day immutable-artifact hold to normal public app/runtime releases and managed deployment candidates. Keep the existing audited emergency exception for a security fix, legal revocation, or similarly urgent incident. This extends the approved npm publication hold; it does not replace the separate seven-day dependency-age policy.

### Candidate and promotion

Each candidate binds the source commit, dependency locks, toolchain and native build inputs, OS/architecture, manifest and payload digests, SBOM, available provenance, signatures, and required test evidence. Build in clean environments with controlled script permissions and no production Case data. Confirm that the public workspace builds without private source or private-service credentials.

Compare independently rebuilt unsigned payloads where feasible. Record any packaging metadata that prevents full byte reproducibility, and prove it cannot conceal executable changes. Signed timestamps and app-store transformations can change wrapper bytes; preserve the exact submitted candidate and store identity instead of claiming every delivered wrapper is byte-identical.

After the 10,080-minute normal hold, promote the recorded candidate without rebuilding it. Reinspect signatures and current advisories against that candidate. npm packages retain stage-only OIDC publication, available malware scanning, maintainer 2FA approval, and the existing first-publication exception procedure. Other distributions need their own protected signing/promotion identities.

Prove the wait and approval gate for each repository before first release. GitHub environment features available in the public repository may be unavailable under the private repository's plan. Use an eligible plan or an equivalent protected deployment controller; an unchecked timestamp or sleep in the candidate's own script is insufficient. This proposal purchases no plan or signing service.

Roll out compatible managed deployments and update feeds through 1%, 10%, and 100% eligible cohorts. Observe each limited cohort for at least 24 hours and inspect correctness, errors, resource use, and recovery before advancing. For a tiny population, use an explicit volunteer canary rather than an empty percentage. Freeze promotion on a failed hard invariant, severe incident, or exhausted reliability budget. An emergency may shorten a hold or cohort only through the recorded exception path.

### Platform update behavior

Windows uses qualified Authenticode-signed installers and a matching supported update mechanism. Linux initially uses signed repository metadata and `.deb` distribution for the qualified Ubuntu builds, plus verified signed manifests for manual standalone-runtime installation. Electron's built-in updater is not the Linux update solution.

Check and optionally download updates without interrupting a Case. Installation requires a safe restart boundary, checkpoints, a verified pre-migration recovery point where needed, and a clear view of affected local work. Do not silently terminate research, reset budgets, broaden grants, or restart a paused run. An Organization may schedule a reviewed maintenance window within those rules. Offline local use and existing Case access must remain useful without an update server.

Mobile launches through signed native store releases. Executable over-the-air JavaScript updates are deferred initially. A later OTA path must satisfy signing, native runtime compatibility, the same artifact hold and rollout rules, and store policy. Encryption, native dependency, or permission changes require a native build.

### Migration and rollback

Before a local schema or encryption migration, verify an encrypted recovery snapshot and enough free space for the operation. Simulate interruption at every durable boundary. Preserve the original until the replacement and referenced Artifacts verify. A migration failure returns to the verified original or a clear recovery state, rather than creating two writers or a partly upgraded Case.

Managed changes use expand/migrate/contract sequencing. Keep compatible reads and writes throughout mixed-version rollout. Do not remove a compatibility field sooner than 30 days after migration completion, and retain it longer whenever the approved 12-month protocol window or an active supported client requires it. A database downgrade is not assumed safe merely because the application binary rolled back.

Separate code rollback, data repair, and full disaster restore. Prefer a compatible code rollback or forward correction. Any destructive managed restore requires impact review, preserved current state where possible, deletion/revocation replay, and the applicable Case/administrative authorization. It must not silently discard newer accepted Case work.

Portable archives remain versioned. Keep documented read/conversion paths for all published archive formats, with original bytes preserved and unsupported fields reported. An archive conversion is not permission to run an obsolete vulnerable application or erase provenance. Test imports against historical fixtures, tampered content, and current redaction rules.

## Approved performance and resource budgets

Use the target registry as the initial measurable budget, then require actual benchmark evidence before claiming readiness. These are acceptance targets, not current results or hard Case-size quotas.

The desktop reference is an 8 GiB RAM, four-logical-core SSD machine. The synthetic Case has 10,000 Entities, 50,000 Relationships, 100,000 Observations, and 10,000 Artifacts totaling 10 GiB. Publish the generator seed, file types, text/index size, graph distribution, machine identity, encryption settings, build digest, and background workload for each result. Test both qualified desktop operating systems.

The mobile reference is a qualified 4 GiB device with a 1 GiB downloaded/local Case, 2,000 Entities, 5,000 Relationships, 20,000 Observations, and 1,000 Artifacts. Native iOS and Android measurements are separate. A simulator-only result is insufficient for memory, encryption, capture, or power behavior.

The managed benchmark uses 100 connected sessions across ten reference Cases, 20 core operations per second for 30 minutes at an 80% read/20% write mix, and a two-minute burst at 40 operations per second. Run five isolated synthetic research jobs on separately declared worker capacity. The initial API reference has two replicas totaling four vCPU/eight GiB, with a two-vCPU/eight-GiB database primary; record failover/replica resources, disk I/O, object-store behavior, and actual costs separately. Measure both steady and burst latency and test loss of one API replica. These are benchmark inputs, not subscription quotas, chosen hosting products, or proof that this capacity is sufficient.

Initial p95 latency targets are:

| Operation | Target | Measurement boundary |
| --- | ---: | --- |
| Desktop cold start | 5 seconds | Start to usable Case library; human unlock input excluded |
| Desktop Case open | 3 seconds | Unlocked Case to first usable content with coverage shown |
| Local search | 1 second | Warm identifier/full-text query to first 50 results |
| Small local save | 500 ms | Command to durable host acknowledgement; large binary transfer excluded |
| Bounded graph view | 2 seconds | Prepared projection of at most 1,000 Entities and 3,000 Relationships to usable view |
| Managed core API | 750 ms | Server processing of small commands/queries; excludes WAN, bulk bytes, and external research execution |
| Mobile Case open | 3 seconds | Unlocked local/downloaded Case structure to focused usable view |
| Mobile file intake | 3 seconds | Selected file of at most 10 MiB to durable local intake; excludes camera interaction, extraction, and network upload |

Cap idle application memory at 1,024 MiB on desktop and 350 MiB on the reference mobile Case, with no active tool, OCR, or large preview. Record included processes and the platform memory measurement method. Native workers have separate explicit CPU, memory, byte, and elapsed-time budgets under the SDK contract; the idle budget is not permission for unbounded research work.

Use at least 30 repetitions per tested scenario with raw results and declared warm/cold conditions. Do not derive a p95 claim from a single run. Investigate regressions greater than 10% in a stable scenario even when the absolute ceiling still passes. A baseline change needs a stated workload/hardware reason and review rather than a quiet threshold increase.

Larger Cases remain supported through paging, streamed imports, bounded graph projections, background indexing, cancellation, and visible coverage. Projection limits must not silently omit material from full exports or imply that only displayed Entities exist. Supportability and actual performance beyond the reference workload remain explicit.

Correctness, retention, authorization, and durable acknowledgements have no 5% failure allowance. A latency target cannot authorize losing a save, skipping a permission check, or mislabeling a partial result as complete.

## Approved managed availability, backups, and recovery

Target 99.9% monthly core-service availability, a disaster recovery-point objective of 15 minutes, and a disaster recovery-time objective of eight hours. Preserve the already approved 30-day recovery history. Ordinary process restarts must retain acknowledged durable commits; the 15-minute loss window describes a disaster affecting the primary durable environment.

Core availability is successful completion of eligible authorized login, Case read/write, synchronization catch-up, and export-control operations divided by eligible attempts over a rolling 30-day window. Correct denials and invalid requests are excluded; internal failures, required identity/storage dependencies, and planned maintenance count. External source/model outages are reported separately, but accepting a Research run or surfacing its state still counts as a core operation. Use privacy-safe synthetic probes at least every 60 seconds to detect low-traffic outages; publish both request and synthetic results rather than hiding an outage behind an empty denominator.

Only publish a customer commitment after at least 30 days of representative prelaunch observation, load testing, staffing validation, and cost review against the approved subscription targets. A contractual Enterprise SLA, remedies, dedicated region, or shorter recovery objective requires separately tested operations and a contract. Planning approval does not create one.

Use tested base backups, continuous recovery logs, versioned encrypted Artifact storage, key recovery, and explicit recovery manifests. Keep an isolated backup account and another region inside the chosen hosting boundary. Track the latest recoverable database and Artifact watermarks together; the recovery point is the latest verified consistent cut, not whichever store reports the newest timestamp.

Restoration must verify object references, digests, Case identity, history, current permissions, deletion tombstones, and key versions before exposing content. Rebuild derived indexes with visible coverage. Per-Case recovery uses isolated restore/extraction with controlled acceptance; whole-cluster PITR is not an automatic per-Case undo operation.

Measure the 15-minute loss window from the incident back to the latest usable consistent recovery point, including replication lag. Measure the eight-hour restoration window from service loss until essential reads, writes, and exports are restored with verified Case content and authorization. Log detection and acknowledgement times separately. Perform and retain evidence from at least one full restore exercise each month and after a material backup, key, migration, or storage change.

Preserve deletion deadlines across backup expiry and restore. Isolated recovery cannot resurrect expired managed content into the live service. The service must alert before replication lag, missing keys, or unverifiable objects invalidate its target. A green database backup job alone is not a green Case recovery check.

Local Cases offer consistent encrypted snapshots to a user-selected independent destination and a reminder before risky changes. They have no project-operated off-device backup or recovery guarantee by default. A snapshot on the same failed disk cannot supply disaster recovery. Local reminders and backup operations must work without paid registration.

## Approved observability and privacy

Collect allowlisted, content-free managed operational metrics and keep client diagnostic uploads off by default. Permit deliberate preview-and-send diagnostic packages and revocable opt-in crash reporting, with no Case payloads or credentials.

Operational counters cover core success/latency, queue state, backup/Artifact lag, restore verification, resource exhaustion, Connector health, revocation, version compatibility, and rollout errors. Use build, operation category, region, and bounded error class rather than Case titles, names, query terms, URLs, evidence bodies, prompt text, identifiers under investigation, raw Case IDs, session tokens, or secrets. Automatic exception/HTTP instrumentation must use the same allowlist before export. Hashing predictable identifiers is not an adequate anonymization policy.

Retention targets are seven days for local diagnostic logs, 14 days for managed operational logs, seven days for traces, and 90 days for minimally necessary managed authentication/security logs. Raw IP or account details needed for a narrowly scoped security investigation require restricted access, purpose, expiry, and separate review. Diagnostic support access does not grant Case membership.

Case history, accepted results, billing records, customer-visible usage, and formal security evidence follow their existing purpose-specific policies. The short operational-log windows must not trim Case history or erase a user's recoverable investigation. Deletion requests propagate through diagnostic attachments and telemetry stores where applicable. A time-bounded incident preservation exception is recorded and disclosed under policy.

Do not enable analytics, session replay, or automatic screenshots of Case views by default. Browser/mobile/desktop privacy choices must not be reset by an update. Show what a support package contains before upload, let the user remove files, and preserve the authorized destination and retention notice.

## Approved incident response and operational ownership

Require a staffed 24/7 operational pager with a backup responder before paid managed launch. Target acknowledgement of a P0 incident within 15 minutes, public status updates at least hourly during a continuing core outage, and a reviewed incident report within five business days. These are launch-readiness targets, not promises of free 24/7 individual support.

P0 includes suspected cross-Case disclosure, signing or production credential compromise, data corruption/loss, or widespread essential-service failure. Give each release a named release operator, service incident lead, security responder, backup/key custodian, and backup operator. Governance assigns actual people and approval rules; a role label alone does not provide coverage. Run an outage, compromise/revocation, and disaster-restore drill before general paid availability.

Incident controls can freeze promotion, revoke signing/deployment identities, disable affected Connector versions, stop a Case/Organization's dispatch, isolate workers, and block new chargeable work. Preserve access to safe existing evidence and exports where possible. A compromised core may require a wider containment stop; do not hide which functions are unavailable.

On a reachable host, target p95 acknowledgement of a stop within two seconds, revocation of new capabilities within two seconds, and termination of a noncooperating tool's process tree within five seconds. These are distinct observations. Responses already in flight cannot be unsent. Retain permitted late captures through the approved reconciliation path without continuing Pivots.

Disconnected execution leases expire within at most 60 seconds. Loss of the control channel stops new dispatch immediately. An offline client must display pending delivery rather than falsely reporting an accepted stop. Neither these timings nor a native process boundary proves isolation; actual descendant, egress, pause, cancel, and emergency-stop tests are release gates.

An urgent patch may use the already approved exception to dependency age, artifact hold, or cohort duration. It still requires a pinned artifact, scope/reason, named approver, current scanning, appropriate signatures, minimum safety tests, a compatible migration/recovery path, and subsequent review. Do not create an automatic bypass that an agent or ordinary candidate job can grant itself.

If pager staffing, recovery drills, or essential controls are not ready, keep managed access in a clearly limited preview and delay paid general availability. Publish local releases only when their own platform gates pass. Customer-support hours and Enterprise service terms remain explicit commercial/governance choices rather than being inferred from the incident pager.

## Approved managed hosting boundary

Begin with one primary U.S. region and an isolated backup/disaster-recovery region in the United States. Disclose both concrete locations and operators before managed enrollment. This is the selected initial market and operating boundary, not a jurisdictional or compliance conclusion.

Keep managed Case primary storage, backups, project-operated processing, and sensitive operational data inside the declared boundary. Never silently fail over to another country or move a Case to make capacity available. A new boundary or dedicated Enterprise environment needs qualified operations, explicit terms, and an authorized migration.

Source and AI providers may be separate disclosure destinations; the existing plan/credential policies still require approval and accurate disclosure. A hosting-region label does not promise that a user, collaborator, authorized attached Runner, or approved external provider can only exist in that geography. Record those distinctions rather than advertising blanket residency or compliance.

Free Local remains device-local and does not acquire a U.S. upload, account, telemetry, or managed subscription requirement. Do not select a cloud vendor, buy capacity, or activate a region merely by accepting this planning policy. Exact providers and regions must pass recovery, privacy, signing/deployment, cost, and access-control gates before receiving customer Cases.

An EU-first launch or separate U.S./EU service boundaries were considered. Two launch boundaries increase the number of recovery, key, deletion, incident, and financial readiness paths to prove. Any later change to the approved boundary requires explicit review and authorized migration rather than an inferred user location.

## Proof required before release

Release evidence binds the exact candidate and tested platform and includes public-only clean build, effective npm controls, dependency/native review, signatures/provenance, tampered-update rejection, wrong-key failure, accountless offline use, shared Case semantics, historical archive import, migration interruption, rollback/forward correction, full restore and deletion replay, privacy/secret canaries, worker scope/revocation, accessibility, benchmark raw data, and the verified private promotion gate. Applicable Connector versions qualify independently.

Keep a readiness ledger with an owner, evidence path, tested digest/platform, timestamp, and passed/failed/not-run status for each gate. Missing evidence is not a pass. A security, correctness, privacy, authority, or recoverability failure blocks the affected release; do not average it away with performance scores. Review deliberate exceptions through their narrow existing approval rules.

The declaration checker is `node docs/planning/check-release-readiness.mjs`. It checks target consistency and rejects several invalid declarations. It does not replace any of the release evidence above or establish that current infrastructure meets these targets.

## Decision boundary

All seven choices are approved. Operational-readiness decision questions remaining: 0. This resolves the planning ticket. Implementation evidence, staffed coverage, actual providers/regions, cost validation, and contractual commitments remain future release gates. Release stages, licensing, and broader governance remain with [Define licensing, governance, and release stages](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/29); template-specific acceptance remains with its existing ticket.
