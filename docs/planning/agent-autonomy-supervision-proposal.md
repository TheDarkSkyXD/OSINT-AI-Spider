# Agent autonomy modes and supervised execution

Status: approved September 4, 2026.

Decision ticket: [Define agent autonomy modes and supervised execution](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/9).

This revision supersedes the earlier read-only proposal after the user approved truthful user-owned and organization-owned account automation. It keeps Research runs read-only and adds a separately approved Authorized engagement workflow.

This proposal defines three user-selectable autonomy modes for each Research run and a separate Authorized engagement workflow for approved external interaction. It follows the approved Core safety policy, source classes, typed Connectors, action-based Case roles, Approval requests, bounded Research plans, durable run lifecycle, and append-only Case history. No mode can create fake accounts, impersonate people, bypass access controls, exploit systems, make automated accusations, or weaken a Hard restriction.

## 1. Calculate one effective autonomy level

Each Case has a default autonomy mode, and each Research run records its chosen mode. A custom agent may set a lower default or maximum. The effective mode is the least permissive result of the Organization policy, Case authorization profile, Case setting, custom-agent ceiling, Connector policy, provider rules, current user's permissions, and run choice.

New Cases default to Suggest only. A Manager may change the Case default when its authorization profile is complete. Sensitive-person Cases, active-cyber capability packs, authorized-account Sources, and restricted Sources may impose narrower behavior or more approvals.

The main mode selector uses plain labels: Ask before actions, Run approved plan, and Research within limits. The detailed policy view also shows the canonical Suggest only, Approved-connector automation, and Supervised autonomous research names. Managers and Investigators may start executable runs under their Case permissions. Other roles may chat with an agent or draft a request without gaining run permission.

Changing the Case default affects only future runs. Lowering a running job's mode takes effect at its next safe boundary. Raising a run's mode pauses it, creates a new Research plan version, revalidates every grant and budget, and obtains any newly required approvals before resuming.

No agent may change its own mode, instructions, model, skills, Connectors, permissions, credentials, schedule, or budget. It may propose a change for an authorized person to approve.

## 2. Distinguish the three modes

| Capability | Suggest only | Approved-connector automation | Supervised autonomous research |
| --- | --- | --- | --- |
| Read permitted Case material | Yes | Yes | Yes |
| Use the selected AI model under its data-sharing and budget rules | Yes | Yes | Yes |
| Build a Research plan | Propose only | Build from the user's approved Connector set and typed limits | Build and revise within an approved Autonomy envelope |
| Contact Sources or execute Connectors | Only after approval of each exact action | Execute only the approved plan and Connector grants | Choose among allowed bundled or verified Connectors inside the Autonomy envelope |
| Follow new Pivots | Propose them | Follow typed Pivots within approved depth, source, and budget limits | Adaptively follow typed Pivots within the Autonomy envelope |
| Use the research browser | Navigate only after approval of each exact step | Navigate approved read-only steps | Navigate read-only public and authorized Sources inside scope while streaming the session |
| Add collected material | Add results only from each human-approved action | Add Artifacts and Observations from approved actions | Add Artifacts and Observations from allowed actions |
| Organize Folders, tags, and source groups | Propose changes | Apply plan-approved organization | Organize within the envelope and preserve history |
| Add analysis | Draft Inferences, Claims, Relationships, Leads, and Tasks | Add proposed analysis tied to provenance | Add proposed analysis tied to provenance |
| Open Leads and create Ready Tasks | Propose only | When the approved plan allows it | Within the envelope; never assign a person without permission |
| Accept Findings, merge Entities, approve Reports, or grant Policy exceptions | Never | Never | Never |
| Install or update skills, plugins, custom agents, or Connectors | Never | Never | Never |
| Create external side effects | Never inside a Research run; use a separately approved Authorized engagement | Never inside a Research run; use a separately approved Authorized engagement | Never inside a Research run; use a separately approved Authorized engagement |
| Run without an open dashboard | Not applicable | Yes when the approved plan permits background work | Yes within the approved envelope; policy may require live presence |

Suggest only lets the agent analyze material already available to its model context and recommend searches, Connectors, Pivots, source visits, Claims, Leads, Tasks, and graph changes. Each network or tool action waits for a person. The user may approve one exact action or turn the proposal into a bounded automated run.

Approved-connector automation is predictable batch research. The user approves the plan, Connector versions or compatible version range, Sources, inputs, targets, Pivot depth, and budgets. The agent may choose ordering and follow typed outputs already covered by that plan, but any new Connector, Source class, target, credential scope, material budget increase, or active method requires a new plan version and Approval request.

Supervised autonomous research is adaptive within a visible boundary. The user approves an Autonomy envelope rather than every plan step. The agent may revise ordering, choose allowed bundled or verified Connectors, open new typed Pivots, and recover from ordinary errors while it remains inside that envelope. It pauses at the boundary instead of silently expanding it.

## 3. Separate safe outputs from human judgments

An automated action may preserve an Artifact, Collection record, Observation, tool output, browser capture, OCR result, or other direct result when its Connector and Source action were authorized. Approved automation may create and maintain AI-managed Folders, tags, source groups, and candidate Entities without duplicating the underlying material. Every change remains visible in Case history.

The agent may create an Inference, proposed Claim, proposed Relationship, Hypothesis, draft summary section, or recommendation with provenance and uncertainty. In executable modes, it may move its own proposed Lead to Open or create a Ready Task when the approved plan or envelope grants that organizational action. It cannot assign work to a person, complete or dismiss another actor's item, overwrite human-authored organization, or treat a Lead or Task as a Finding.

The following actions always require an authorized person, regardless of autonomy mode:

- Accepting or changing a Finding
- Approving an Entity merge or a Report
- Granting a Policy exception
- Approving a new active-collection plan with its targets, methods, time window, and rate limits
- Enabling a new authorized-account or paid credential scope
- Approving the creation of each Managed account and its truthful owner identity
- Approving the exact content, destination, Managed account, and purpose of each post, message, reply, follow, reaction, upload, or form submission
- Expanding a run beyond its approved Source classes, targets, Connector permissions, or budget
- Publishing, sharing, or creating a full unredacted export
- Deleting protected material or permanently deleting a Case
- Changing Case membership, roles, authorization, instructions, or ownership
- Installing executable code or accepting new plugin and Connector permissions

Research runs remain read-only with respect to researched parties. Sending declared data to an enabled AI or Connector provider is allowed only through the approved provider path and envelope. Any account creation or outward interaction uses the separate Authorized engagement workflow below.

### Authorized account creation and interaction

An Authorized engagement may create or use a Managed account only when the user or their organization truthfully owns or controls it, the platform permits the intended access and automation method, and the Case authorization profile permits contact. The workflow prefers official APIs and supported authentication. Credentials remain in the secret broker or user-controlled Runner and never enter Case material or agent context.

For account creation, the agent may prepare and fill the reviewed registration details, but an authorized person approves the exact platform, owner identity, handle, contact details, terms acknowledgment, and final submission. The person completes email or phone verification, identity checks, consent screens, and CAPTCHAs. The system does not create fabricated personas, hide who controls an account, mass-register accounts, age accounts for deception, reuse credentials without authority, or evade platform enforcement.

For interaction, the agent may draft a post, message, reply, follow, reaction, upload, or form submission. Before dispatch, an authorized person sees and approves the exact content, destination, account, disclosed Case data, purpose, and expected effect. Approval is single-use and expires if any of those fields change. The agent cannot conduct autonomous unsolicited outreach, bulk messaging, social engineering, harassment, coordinated inauthentic activity, or contact prohibited by law, source rules, provider rules, Organization policy, or the Case template.

Missing-person, victim, minor, witness, and similar sensitive-person templates default to no engagement. Their policy may require a designated law-enforcement, safeguarding, or Case authority to enable a specific contact. Incoming responses are collected as Sources and Artifacts with their platform identifiers and timestamps. They remain assertions until reviewed and do not automatically prove identity or truth.

Active collection never expands by discovery alone. An approved active-cyber plan names the authorized targets, methods, rate, time window, and stop conditions. Finding another hostname, IP address, account, or organization creates a proposed scope expansion rather than permission to probe it.

## 4. Make the Autonomy envelope concrete

An Autonomy envelope is a versioned grant for one Research run. It records:

- The objective and Seed information
- Allowed Source classes, domains, accounts, identifiers, and active targets
- Allowed Connector trust tiers, capabilities, versions, permissions, and credential aliases
- Maximum Pivot depth, branch count, Connector actions, retries, collected items, and stored bytes
- Elapsed-time, AI usage, provider, third-party API, and paid-search budgets
- Permitted browser navigation and download types
- Data that may be sent to each AI or service provider
- Required Approval requests and stop conditions
- Whether background execution is allowed and whether a supervisor must remain connected

The envelope is deny-by-default. Missing permission means the action is not allowed. Every proposed tool call is evaluated against the current envelope and current policy immediately before dispatch. Approval of a broader Connector category does not approve unknown permissions added by a later version.

Bundled and verified Connectors may participate in autonomous runs when their manifest and current lifecycle state permit it. The product has no public Community extension tier. Local-development extensions remain device-local, require developer mode and visible per-run approval, and cannot participate in managed, background, sensitive-Case, active-cyber, or Authorized engagement execution. Degraded Connectors show a warning and may require renewed approval. Suspended and retired Connectors cannot start new actions.

An agent may delegate work to another custom agent only if the later custom-agent decision permits it. A child receives a strict subset of the parent's envelope, budget, remaining time, credentials, and Case permissions. Delegation never multiplies limits or creates a second source of authority.

## 5. Require bounded budgets

Every executable run has finite limits. The interface provides simple presets and puts individual controls in an advanced editor. The default Approved-connector run allows 15 minutes, 100 Connector actions, Pivot depth 2, 500 captured items, 1 GB of new Artifact storage, and no paid Connector or data-source spend. The default Supervised autonomous run allows 30 minutes, 250 Connector actions, Pivot depth 3, 1,000 captured items, 2 GB of new Artifact storage, and no paid Connector or data-source spend. The selected AI model keeps its separate Case and provider budget.

Users may lower these values. Authorized users may raise them within Organization, subscription, Connector, provider, and Case policy limits. Paid Connector and data-source spend begins at zero until a user sets and approves an amount. Active-collection plans use separate, tighter request-rate and target limits even when the general run budget is larger.

Track elapsed time, model tokens or provider units, estimated and billed cost when available, Connector calls, retries, browser navigations, downloads, Artifact count and bytes, graph expansion, and remaining Pivot depth. Provider-reported usage and invoices take priority over estimates. Subscription-based CLI usage may not expose a reliable monetary balance, so the run also uses time, turn, and action limits and reports provider rate-limit responses honestly.

Reserve known paid cost before dispatch and reconcile it with the returned usage. When a limit is reached, stop dispatching new actions. The run becomes Paused if an authorized increase could continue it, or completes with a clearly partial result when the bounded plan has no remaining permitted work. An agent cannot split work into child agents, retries, or schedules to escape a limit.

## 6. Show the agent working in real time

Every executing run has a live supervision view that remains reachable from the Case header and global activity area. It shows the run objective, mode, current plan version, current step, active agent and Runner, Connector, Source being contacted, safe input summary, browser viewport when used, new Artifacts and graph additions, warnings, pending approvals, errors, and budget meters.

The activity stream uses application-owned events rather than raw provider logs. It records concise public explanations for proposed actions and conclusions, but it does not expose or claim to preserve private model reasoning. Users can expand a step to inspect tool inputs and outputs with secrets removed, open captured evidence, or jump to the affected graph node, Folder, Timeline event, or Claim.

When a Custom agent delegates, the live view shows a selectable parent-child tree. Each subagent branch displays its assigned task, model and Custom-agent version, status, current tool call, safe input summary, output, browser session when used, created Artifacts and graph changes, errors, approvals, and remaining share of the parent budget. Parallel branches may be watched separately. An authorized user may pause or stop one branch or emergency-stop the full Research run. Finished branches remain searchable and replayable in Case history. The view exposes recorded actions and concise explanations, not secrets or private model reasoning.

Approval cards state exactly what the agent wants to do, why it is needed, what target or Source it will contact, which data will leave the Case, which credential alias will be used, expected cost, risk class, requested duration, and what changes if approved. Approval never uses vague prompts such as "allow everything."

The live research browser displays the executing agent, Case, run, current URL, navigation status, capture status, and read-only policy. The user can watch it without giving the researched page access to the dashboard, Case database, desktop APIs, credentials, or unrestricted clipboard.

Supervised means visible and interruptible, not that a person must watch every second. Managed and local runs may continue in the background when the envelope allows it. An Organization may require live presence for selected Case classes; losing all eligible supervisors then moves the run to Pausing after a two-minute reconnect grace period and then to Paused.

## 7. Provide pause, stop, and emergency controls

Pause is graceful and resumable. It stops new actions, lets the current operation reach a safe boundary, writes a Run checkpoint, and moves the run through Pausing to Paused. Resuming rechecks current permissions, policy, Connector health, credentials, budgets, and approvals.

Stop is graceful and terminal. It moves the run through Canceling, preserves permitted work already accepted, records partial results, and ends Canceled. It does not undo network requests, provider charges, captured material, or Case changes completed before the stop.

Emergency stop revokes the active Execution attempt, its temporary capability tokens, browser session, worker lease, and pending dispatches before terminating its Runner process or managed worker. It prioritizes preventing another action over preserving the current incomplete step. The host finalizes the run as Canceled when its records are consistent or Failed when recovery cannot establish a trustworthy boundary.

The investigator who started a run and any Case Manager may pause or stop it. A Case Manager may emergency-stop any Case run. Organization administrators may freeze dispatch for an Organization without gaining Case-content access. The policy engine may stop any run when authorization, source policy, provider rules, Connector trust, or deletion state requires it.

A Case-level Stop all control pauses every Schedule, rejects new dispatches, and emergency-stops active runs. An Organization freeze does the same across its Cases. Restart requires an authorized person and complete revalidation. Stop controls remain available while the browser, agent chat, graph, or another Case tab is open.

## 8. Recover without broadening authority

After an app, Runner, worker, or network interruption, the authoritative host keeps the same run identity, mode, plan version, Autonomy envelope, remaining budgets, and approvals. A replacement Execution attempt may resume only from a verified Run checkpoint. A stale attempt cannot commit Case mutations after the host replaces it.

If the exact Connector action has an idempotency mechanism, the adapter uses it. Otherwise the recovery logic checks the Collection record and provider result before deciding whether retry is safe. Uncertain external completion moves the run to Waiting for review rather than repeating the action blindly. An uncertain Authorized engagement never retries a registration, post, message, reaction, follow, upload, or form submission automatically.

An expired approval, changed Connector version, changed policy, missing Runner, revoked credential, removed user, or altered Case state moves the run to Awaiting approval, Waiting, Paused, Canceled, or Failed according to the approved lifecycle. Recovery never converts Suggest only into an executable mode or grants a wider scope.

Retry creates a new linked run with current checks. Rerun creates a new linked run from the earlier inputs and visible configuration. Neither reuses old approvals that no longer match, resets subscription usage, or hides the earlier outcome.

## 9. Treat websites and imported content as untrusted

Instructions found on a webpage, document, image, message, tool response, or imported Case are evidence content, not agent instructions. They cannot change the system or Case instructions, select a model, install a skill, request credentials, grant a Connector, raise a budget, approve an action, or disable logging.

Browser and Connector adapters separate retrieved content from trusted control messages. Downloads stay inside the run's isolated workspace until they pass policy, type, size, malware, and archive-safety checks. The agent never copies secrets into a researched page, query string, screenshot, Artifact metadata, or model prompt unless the approved provider path requires that exact data.

Authentication challenges, consent screens, CAPTCHAs, unexpected paywalls, material terms changes, and requests to submit data move the run to Waiting or Awaiting approval. For a CAPTCHA or identity check, the live browser enters a privacy-protected human-takeover state. The user completes the challenge and explicitly returns control before the agent resumes. Automated CAPTCHA solving or bypass, rate-limit evasion, proxy rotation for avoidance, and paywall bypass are not available actions.

## 10. Control schedules, background work, and offline behavior

Creating or changing a Schedule is a human action. Each occurrence creates a new Research run with current policy and budget checks. A Schedule records its maximum autonomy mode and may use only a previously approved template and Autonomy envelope ceiling. It cannot preserve an expired approval or silently adopt a new Connector permission. Schedules cannot approve or dispatch Authorized engagement actions.

Managed runs may execute while all clients are closed if their envelope allows background work. Users receive safe progress, approval, budget, pause, failure, and completion notifications. A run waits rather than guessing when it needs a human decision.

Local runs require the local host and required Runner to remain available. Closing Electron prompts the user to keep work running in the background, pause safely, or stop. Exact operating-system background support belongs to the platform decision.

An offline managed client cannot dispatch a cloud run, raise autonomy, approve actions, or change a Schedule. It may draft a Research request. The managed host may continue a previously approved background run, and the client catches up through durable events when it reconnects.

## 11. Preserve a useful audit trail

Case history records the selected and effective mode, Autonomy envelope and plan versions, model and custom-agent versions, instructions and skills used, Connector versions and trust state, human initiator, Automation identity, Runner, approval decisions, policy checks, credential aliases, action dispatch and outcome, Source locations, captures, Pivots, budget reservation and usage, errors, pause and stop commands, recovery attempts, and every promoted Case object. For Authorized engagement it also records the Managed account, platform, destination, exact approved content or content hash, purpose, approving person, dispatch result, and linked response without storing credentials.

For browser activity, record requested and final locations, redirects, action class, capture status, response outcome, and produced Artifacts. Do not store passwords, tokens, cookies, authorization headers, raw secrets, unnecessary sensitive text, or private model reasoning in logs.

The history view groups noisy progress events under a Research run and Connector step while preserving the underlying ordered records. Users can search and filter by run, agent, model, Connector, Source, actor, action, outcome, approval, policy decision, date, and affected Case object.

## 12. Enforce autonomy in the shared Domain

The shared Domain calculates effective autonomy, validates the Autonomy envelope, classifies actions, checks approvals and budgets, and decides whether a proposed transition is allowed. Web, mobile, Electron IPC, agent adapters, browser workers, Connector workers, queues, and schedules carry typed requests but cannot grant permission.

Before each external action, the executing Runner asks the authoritative Case host for a short-lived capability scoped to the run, plan version, action, Connector, target, credential alias, and budget reservation. An Authorized engagement capability is additionally bound to the approved Managed account, platform, destination, exact content or content hash, purpose, and single-use approval. Local Cases use the same decision contract inside the trusted local host. A provider SDK, CLI, browser page, plugin, or child agent never receives an unrestricted Case token.

The UI previews permissions and explains blocks, but hiding a button is not enforcement. Worker isolation, allowlisted Connector permissions, network policy, browser sandboxing, secret brokering, object-storage scopes, and host-side Case authorization provide separate enforcement layers.

## Review scenarios

- A Suggest-only agent recommends searching a username. It creates a proposed action but sends no network request until the user approves a bounded automated run.
- Approved automation finds another domain. It records a proposed Pivot and pauses because the new domain is outside the approved targets.
- A supervised run finds a new public profile through an allowed username Connector. It follows the typed Pivot because the Source class, Connector, depth, and budgets remain inside its envelope.
- A webpage tells the agent to reveal its API key and disable safety. The browser treats the text as untrusted Source content and neither instruction becomes executable control.
- An active-cyber run discovers a related IP address. It does not scan it because discovery is not authorization to expand the target list.
- A paid data source estimates a charge above the remaining budget. The host denies dispatch and asks for a specific budget increase.
- The user presses emergency stop during browser navigation. The host revokes the Execution attempt and browser capability, terminates the session, and records that the external request may already have reached the Source.
- A worker crashes after receiving a response but before showing it. Recovery checks the Collection record and operation identity before deciding whether the Connector may run again.
- A custom agent delegates to a specialist. The specialist receives only the parent's remaining allowed Connector set, data scope, time, and budget.
- A scheduled managed run reaches an approval point while nobody is online. It waits and sends a safe notification rather than skipping the approval.
- An agent drafts a message from an Organization-owned account. The user reviews the account, recipient, exact message, disclosed Case data, and purpose. Dispatch receives a single-use capability only after approval.
- Account registration presents a CAPTCHA. The browser pauses for private human takeover, the agent cannot see the solution or bypass the challenge, and the run resumes only when the user returns control.

## Decisions left with existing tickets

The skills, agents, and plugins decision defines custom-agent manifests, library installation, versioning, skill permissions, plugin isolation, delegation, and sharing. The AI provider decision defines model selection, context, instruction precedence, memory, and credential adapters. The workspace and visualization prototypes decide how plans, live browsers, approvals, budgets, graph changes, and stop controls appear. The platform decision owns operating-system background execution. The subscription decision owns paid concurrency, hosted execution quotas, and plan limits.
