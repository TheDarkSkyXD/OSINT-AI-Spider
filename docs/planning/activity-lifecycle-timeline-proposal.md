# Activity lifecycles and timeline semantics

Status: accepted by the user. The resolution comment on the decision ticket is the canonical decision record; this file preserves the approved proposal.

Decision ticket: [Define activity lifecycles and timeline semantics](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/20).

This proposal gives Cases, Leads, Tasks, Approval requests, Research runs, and Schedules separate state machines. It also separates claimed real-world Timeline events from the append-only Case history. The authoritative Case host owns every accepted transition, while clients may hold visibly pending commands under the approved offline rules.

## 1. Apply shared transition rules

Every state change is an explicit command checked against the current Case status, object version, actor permission, approval state, policy, and subscription entitlement. The authoritative host commits the new state and Case history entry together. Repeating an operation ID returns the first accepted result rather than applying the transition twice.

Each lifecycle has a small fixed state set. Reason codes, progress, priority, assignee, due date, retry time, and explanatory text are separate fields rather than new states. The UI uses plain labels and shows why an item is waiting, blocked, paused, failed, dismissed, or canceled.

Terminal Approval requests and Research runs never return to a nonterminal state. A Case, Lead, or Task may reopen only through the recorded transition its lifecycle permits. Retrying or rerunning Research creates a new Research run linked to the earlier run. This keeps previous outputs, errors, approvals, and costs intact.

## 2. Govern the Case lifecycle

| Case status | Meaning | Allowed next status |
| --- | --- | --- |
| Draft | Intake, authorization setup, Seed information, and manual organization are still being prepared | Active, Archived |
| Active | Authorized investigation work and permitted Research runs may proceed | Paused, Closed |
| Paused | Human review and manual organization may continue, but automated and scheduled research cannot start or resume | Active, Closed, Archived |
| Closed | The investigation is finished and its contents are read-only until explicitly reopened | Active, Archived |
| Archived | The Case is read-only and removed from normal active views | Active |

Activating a Draft requires a complete Case authorization profile and at least one Manager. Pausing a Case blocks new run dispatch, pauses its Schedules, and sends active runs a pause request. Closing or archiving requires every Research run to reach a safe paused or terminal state. The user may wait, cancel the runs, or return to the Case without changing its status.

Closing warns about unresolved Leads, incomplete Tasks, pending approvals, conflicts, and uncited summary statements but does not force them to be marked complete. Reopening requires a reason and rechecks the current authorization profile, memberships, provider rules, and retention state.

Case status does not replace trash or permanent deletion. Archiving preserves the Case. A subscription ending, a device going offline, or a sync conflict never changes Case status on its own.

## 3. Track a Lead as a research avenue

| Lead status | Meaning | Allowed next status |
| --- | --- | --- |
| Proposed | A person or agent suggested an avenue that has not been accepted | Open, Pursuing, Dismissed |
| Open | Accepted as worth considering but not currently being worked | Pursuing, Waiting, Resolved, Dismissed |
| Pursuing | An investigator or Research run is actively following it | Open, Waiting, Resolved, Dismissed |
| Waiting | Progress depends on a named person, date, permission, source, or result | Open, Pursuing, Resolved, Dismissed |
| Resolved | The avenue was answered or exhausted and has a recorded outcome | Open |
| Dismissed | The avenue was rejected as irrelevant, duplicate, unsafe, unauthorized, or not worthwhile | Open |

User-created Leads may begin Open. Agent-created Leads begin Proposed unless the later autonomy decision permits the agent to create accepted Leads. A Lead may link to Tasks, Research runs, Claims, and Findings, but those objects do not silently change its status.

Resolving records the outcome and supporting Case material. Dismissing records a reason without claiming the Lead was disproven. Reopening either state creates a new history entry and preserves the earlier resolution or dismissal.

## 4. Track a Task as assigned work

| Task status | Meaning | Allowed next status |
| --- | --- | --- |
| Proposed | A person or agent suggested work that has not been accepted | Ready, Canceled |
| Ready | Accepted work that may be assigned and started | In progress, Blocked, Completed, Canceled |
| In progress | An assignee is actively performing the work | Ready, Blocked, Completed, Canceled |
| Blocked | A named condition prevents work from continuing | Ready, In progress, Completed, Canceled |
| Completed | The work finished with a recorded outcome | Ready |
| Canceled | The work will not be performed and has a recorded reason | Ready |

A Task must have an assignee before entering In progress. It may have dependencies, due information, reminders, and a link to the Lead it serves. These fields do not replace status. Completing a Task does not resolve its Lead, prove a Claim, or complete a Case.

User-created Tasks may begin Ready. Agent-created Tasks begin Proposed unless the autonomy policy permits accepted task creation. Reopening a Completed or Canceled Task returns it to Ready and records why.

## 5. Keep Approval requests single-purpose

| Approval status | Meaning | Allowed next status |
| --- | --- | --- |
| Pending | The exact action is waiting for all required human approvals | Approved, Denied, Withdrawn, Expired, Invalidated |
| Approved | The required approval threshold was met | None |
| Denied | An authorized approver rejected the action | None |
| Withdrawn | The requester no longer wants the action | None |
| Expired | The approval window ended | None |
| Invalidated | The action, object version, permission, policy, or scope changed | None |

An Approval request is bound to one action and exact object versions. Editing the plan or protected object invalidates the request. A new request is required. Multiple approvers add decisions to the same Pending request until it reaches its required threshold or a decisive denial.

Approval permits the host to evaluate the action again. It does not guarantee execution if access, policy, budget, Case status, or source conditions changed. Agents and Automation identities may request approval but never approve it.

## 6. Give Research runs durable states

| Research run status | Meaning | Allowed next status |
| --- | --- | --- |
| Draft | The request, model, instructions, skills, Connectors, limits, or Research plan may still change | Validating, Canceled |
| Validating | The host freezes a plan version and checks authorization, policy, inputs, credentials, Runner availability, and budgets | Draft, Awaiting approval, Queued, Failed, Canceled |
| Awaiting approval | One or more required actions are waiting on a Pending Approval request | Draft, Queued, Canceled |
| Queued | The approved run is waiting for an eligible execution slot | Running, Waiting, Paused, Canceling, Failed |
| Running | An execution attempt is processing the plan and may commit permitted outputs | Waiting, Pausing, Canceling, Completed, Failed |
| Waiting | The run cannot continue until a recorded condition clears, such as rate limits, user input, connectivity, credentials, or Runner availability | Queued, Paused, Canceling, Failed |
| Pausing | The host accepted a pause request and the Runner is reaching a safe checkpoint | Paused, Canceling, Completed, Failed |
| Paused | The run has a durable checkpoint and requires an explicit resume | Validating, Queued, Canceling |
| Canceling | The host accepted cancellation and the Runner is stopping at the next safe boundary | Canceled, Completed, Failed |
| Completed | The bounded plan ended and its result states whether it was complete, partial, or produced no findings | None |
| Failed | The run could not safely continue and records the failing step, retained outputs, and recovery choices | None |
| Canceled | The run stopped intentionally or because its required approval was denied or withdrawn | None |

Waiting may resume automatically when its recorded condition clears. Paused never resumes without an authorized command. Reaching a budget or policy boundary pauses the run when the user can make a permitted choice; a Hard restriction cancels the prohibited path and may cancel the run when no compliant path remains.

A run may have several execution attempts after a crash or lost worker, but it remains one Research run only when it resumes from a valid durable checkpoint. Each attempt has its own identity and host-issued execution lease. Once the host replaces an attempt, it rejects late mutations from the stale attempt.

If recovery from the last checkpoint is unsafe or impossible, the run becomes Failed. Retry creates a new linked Research run with new current-policy checks and approvals. Rerun also creates a new run. Neither action rewrites the earlier run or pretends changing websites and AI models will return identical results.

## 7. Define pause, cancellation, and restart behavior

The Runner checkpoints at safe tool and Case-mutation boundaries. A checkpoint contains the public run transcript, plan position, tool state safe to retain, accepted object versions, pending proposals, and usage. It does not store or claim to reconstruct private model reasoning.

Pausing stops new tool actions and Case mutations after the current safe boundary. Cancellation has the same boundary rule and then ends the run. Neither operation rolls back accepted Artifacts, Claims, history entries, costs, external requests, or source-side effects. The run summary states what completed before the stop.

An in-flight authorized request may finish after cancellation was requested. Preserve a returned capture and its Collection record as a late run output when policy still allows retention, but do not automatically promote its Claims or continue Pivots. Record responses that were discarded because policy or deletion rules prohibit retention.

The local host and managed host both scan nonterminal runs after restart. A lost Runner or expired execution lease moves the run to Waiting with a reason. The host resumes it from the last verified checkpoint or marks it Failed. Durable operation IDs and execution leases prevent a restarted worker from duplicating accepted Case changes.

A user who loses Case access cannot resume or control its runs. A managed run may continue for the Case if its Automation identity, Case authorization, and another responsible Manager remain valid. A run that depends on that user's attached Runner or credential moves to Waiting and then follows the configured timeout or cancellation rule.

## 8. Treat Schedules as dispatch rules

| Schedule status | Meaning | Allowed next status |
| --- | --- | --- |
| Active | Eligible occurrences may create Research runs | Paused, Ended |
| Paused | No occurrence may dispatch until an authorized user resumes it | Active, Ended |
| Ended | The schedule will never dispatch again | None |

Each scheduled occurrence has a stable identifier derived from its Schedule and intended time. Re-evaluating that occurrence cannot create a second run. It records the actual evaluation time, policy and entitlement result, and either a linked new Research run or a reason it was skipped. A Schedule never reuses an old run. Every occurrence rechecks the current Case status, authorization profile, Connector health, credentials, permissions, budgets, and plan entitlement.

Schedules use a named time zone and record daylight-saving adjustments. After downtime, the default missed-run policy dispatches one run for the most recent missed occurrence and marks older occurrences skipped. Users may instead choose to skip all missed occurrences. The system does not launch an unlimited backlog.

Overlapping runs are disabled by default. If the previous occurrence is still nonterminal, the next one is skipped with a visible reason. A user may enable one queued follow-up, but not unbounded overlap. Pausing a Case pauses its Schedules. Closing or archiving requires them to be Paused or Ended.

## 9. Separate Timeline events from Case history

A Timeline event is a Case assertion about something that happened, may have happened, or is expected to happen in the investigated world. It may describe a time instant, uncertain range, recurring interval, or unknown timezone. It links the involved Entities, location when known, Claims, Evidence links, source versions, and review state. An inferred or disputed Timeline event remains labeled as such and is not promoted to fact by appearing on the timeline.

A Case history entry records what happened inside AI OSINT Spider. It identifies the actor, host sequence, host receipt time, device-reported time when relevant, action, affected object versions, approval or exception, and outcome. It is append-only. A correction creates another entry rather than editing the earlier one.

The same user action may affect both views without merging them. Uploading a message on Tuesday creates a Tuesday Case history entry. If the message claims a person was seen on Monday, it may support a Monday Timeline event. Correcting the claimed sighting time creates a new Timeline event version and a new Case history entry recording that correction.

The timeline interface may show two clearly separated lanes: investigated-world events and investigation activity. Search can span both, but result labels, filters, timestamps, and citations never treat a Case history timestamp as the time a real-world event occurred.

## 10. Keep notifications as a view over durable work

A notification is Unread, Read, or Dismissed. A user may mark a Read notification Unread. Dismissed is terminal for that notification, but later Case activity may create a new notification. Delivery failure does not erase the underlying Approval request, Task, Lead, Research run, or history entry.

Notifications carry a durable target and minimum safe preview rather than duplicating sensitive content. Opening one rechecks access and opens the current object version. Notification state is per user and does not change the lifecycle of the item it references.

## 11. Put state machines in the shared Domain

The shared Domain owns allowed transitions, guards, reason codes, and effects on related objects. Web, mobile, Electron IPC, API, worker, queue, and scheduler transports authenticate and translate commands but cannot invent transitions. Persistence commits accepted state and history atomically. Queue, clock, connectivity, and Runner adapters report conditions through application-owned capabilities.

The UI derives buttons, badges, progress, and available actions from authoritative state and permissions. It may optimistically display a Pending Case change, but it never presents a local guess as the final managed state. Local and managed hosts use the same lifecycle rules even though their queue and process adapters differ.

## Review scenarios

- An investigator closes a Case while a run is Running. The host refuses the transition and offers to wait, pause, or cancel the run first.
- A laptop crashes during a connector step. The host expires that execution attempt, rejects later writes from it, and resumes from the last safe checkpoint or marks the run Failed.
- A cancel request races with the last tool result. The host orders the accepted events, preserves any permitted late capture, and records whether the run became Completed, Failed, or Canceled.
- An agent proposes a Lead and a Task. They remain Proposed until the current autonomy policy permits acceptance or a user accepts them.
- A Reviewer approves a plan, then the investigator changes a Connector. The old Approval request becomes Invalidated and cannot authorize the new plan.
- A scheduled run is missed during downtime. One catch-up run is dispatched for the latest occurrence, older occurrences are marked skipped, and no backlog storm starts.
- A source claims an event happened three days earlier. The claimed date appears in the Timeline event lane; the collection date appears in the investigation-activity lane and Case history.
- A Case member works offline. Their status commands remain pending until the host validates current object versions, permissions, and Case state.

## Decisions left with existing tickets

The autonomy decision chooses which proposed transitions an agent may request or perform without per-action approval. The skills, agents, and plugins decision packages those permissions into custom agents. The workspace prototypes test whether the state labels, controls, history, and timeline remain understandable. The platform-parity decision chooses background-execution limits and notification delivery on each client. The subscription decision chooses hosted concurrency, schedule counts, retention, and usage limits.
