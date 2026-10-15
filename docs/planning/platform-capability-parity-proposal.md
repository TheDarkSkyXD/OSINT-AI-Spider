# Electron, web, and mobile capability parity

Status: approved October 15, 2026. The user selected all four recommended choices.

Decision ticket: [Define Electron, web, and mobile capability parity](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/18).

## Established requirements

Electron is the desktop application for Windows and Linux. Web and mobile are full clients for managed Cases. Installed applications also support accountless local Cases with manual Portable Case archive export and import. Paid authentication enables managed synchronization, collaboration, and hosted services. Each Case has one authoritative host.

The Case brief uses the approved narrative layout and expanded labeled desktop sidebar. Investigation views use the approved Network canvas. Mobile presents the same information and actions through navigation sheets and focused screens. Provider credentials for CLI subscriptions stay on the desktop or attached Runner. Optional supported API providers can execute on an eligible local or managed worker.

This document specifies product behavior. Exact operating-system versions, mobile frameworks, packaging, browser compatibility, and background-service mechanisms require verification during implementation.

## Capability matrix

Every capability remains subject to the user's Case role, applicable policy, provider configuration, and service entitlement.

| Workflow | Electron on Windows and Linux | Web | Mobile |
| --- | --- | --- | --- |
| Create and organize local Cases without an account | Yes | Managed Cases only | Yes |
| Create, organize, and collaborate on managed Cases | Yes | Yes | Yes |
| Add Seed information, documents, images, and links | File picker, paste, and drag and drop | File picker and paste | File picker, share intake, and capture |
| Review summaries, previews, citations, and contradictions | Full workflow | Full workflow | Full workflow with focused screens |
| Edit Claims, Relationships, Folders, Leads, and Tasks | Full workflow | Full workflow | Full workflow |
| Review Findings and Entity merges | Local host or connected managed host | Connected managed host | Local host or connected managed host |
| Search Cases, material, and Case history | Available local and managed content | Authorized managed content and permitted cache | Available local and managed content |
| Explore Graph, Timeline, and Map | Full workspace | Full workspace | Focused subgraphs and linked views, with equivalent selection and editing actions |
| Chat, change models, edit instructions, and manage Custom agents and Skills | Full workflow | Full managed workflow | Full workflow |
| Run CLI subscription agents | Eligible local Runner | Control an attached Runner | Control an attached Runner |
| Run optional API agents | Eligible local or managed worker | Eligible managed worker or attached Runner | Eligible managed worker or attached Runner |
| Execute native tools and executable Plugins | Compatible local Runner | Compatible managed worker or attached Runner | Compatible managed worker or attached Runner |
| Watch parent agents, subagents, tool calls, and browser work | Yes | Yes | Yes |
| Pause, stop, and review approvals | Local host or connected managed host | Connected managed host | Local host or connected managed host |
| Generate Reports and Portable Case archives | Local host or managed host | Managed host | Local host or managed host, with large jobs handled by an eligible worker |
| Continue research after the UI closes | Available local Runner or managed worker | Available managed worker or attached Runner | Available managed worker or attached Runner |

Managing an extension library is distinct from executing an extension. All clients can inspect versions, configure Custom agents and Skills, and request permitted Case grants. Only a compatible execution host runs executable packages. The library remains maintainer-managed under the approved extension decision.

An accountless local mobile Case does not acquire remote research merely by installing the app. The UI identifies which requested actions require a Runner or managed host. Case editing, review, organization, local search, and archive portability remain useful without those services. Mobile-native model execution and arbitrary local executable tools are outside this parity commitment.

## Case navigation and accessibility

Keep Case identity, active view, selected Entity, applied filters, and local or managed status visible. Carry selection and time filters when moving between Graph, Timeline, Map, inspector, search, and live work. A mobile subgraph can expand progressively without losing the complete Case graph.

Provide a searchable list or relationship table as an alternative to graph and map interaction. Every visual-only gesture has a labeled control. Desktop and web support keyboard navigation, visible focus, and shortcuts that do not intercept text editing. Mobile supports screen-reader labels, scalable text, and adequate touch targets. Status uses text and shape as well as color. Respect reduced motion and let users pause animation.

Long-running work exposes status and recovery actions without requiring the user to stay on one screen. Local search labels the content available on that device. Unavailable Artifacts show download state and size rather than a broken preview.

## Offline Cases and downloads

Local Cases retain their full local authority while disconnected. Network collection and remote model calls wait for connectivity. Managed caches remain replicas and never become a second authoritative host.

Users explicitly choose which managed Cases to make available offline. Download the Case structure, summary, selected text, and preview derivatives first. Let users pin original Artifacts or complete Cases with a size estimate. Show progress, verified completeness, required free space, last synchronization time, and offline access expiry. Cache limits are user-configurable within available storage and Organization policy. Pinned pending work is not silently evicted.

The previously approved managed Offline access lease lasts 72 hours by default. Organization policy may disable offline access or change its duration up to seven days. Expiry locks managed content until reauthentication. Local Cases do not depend on a cloud lease.

Offline managed users can write notes, add new material, organize drafts, propose Relationships, and draft Research requests. Pending Case changes remain labeled until the host accepts them. Findings, Entity merges, membership changes, permanent deletion, managed dispatch, Schedule changes, and remote run control require the authoritative host.

Synchronize permitted notes and material automatically on reconnection, preserving both versions of conflicts. Keep Research requests drafted offline in a ready-to-review queue. Require the user to send them after reconnection so a forgotten request cannot unexpectedly start a chargeable job. Host validation still applies to every accepted command.

Show browser offline drafts as temporary local work. Browser cache is disposable, so the web client must offer draft export and explain the limits before a user relies on an offline draft. Durable offline Case downloads belong to installed apps. The web client remains useful for permitted cached reading and temporary drafts when its offline interface is available.

## Device sign-in and Runner pairing

Signing into another client grants the user's current managed Case access. It does not register that device as a Runner, transfer local Cases, or copy CLI provider credentials.

Pair a Runner through a short-lived QR invitation or manually entered one-time code. The authenticated user reviews the Runner identity, account, named Cases, capabilities, and expiry before registration. The Runner confirms the same request locally. Codes are single-use and must not act as permanent credentials.

List connected devices and Runners with owner, name, last contact, current work, capabilities, and revocation controls. A device can be renamed independently of its identity. Adding a new Case requires a new grant rather than inheriting all future Cases.

Accountless local Cases move through manual archive export and import. Runner pairing does not introduce free cross-device synchronization or a public self-hosted service.

## Background execution and client closure

Closing a client and stopping a Research run are separate commands. Managed jobs continue when their approved execution settings allow it. A web or mobile client reconnects to durable run events and public checkpoints.

When the user closes Electron while local work is active, offer Keep running, Pause safely, or Stop. Remember the user's selection only when they enable that preference. Keep running retains the local host and Runner with a visible status or tray control where supported. Full Quit remains explicit and reaches a safe pause or stop boundary. Scheduled local work requires the local host to remain available.

Sleep, power loss, or an unavailable Runner moves affected work to Waiting or recovery under the approved lifecycle. Never display an unacknowledged pause or stop as completed. The client shows request delivery, host acknowledgement, and final run state separately. Stop controls remain reachable from every investigation view.

Mobile and browser clients control research on eligible execution hosts. Their closed-screen behavior does not depend on continuously running the investigation inside the client. If a human-presence policy applies, loss of eligible supervisors follows the previously approved reconnect grace period and safe pause rule.

## Field intake and media transfer

Mobile intake supports a note, photo, selected document, and shared link or text. Before adding material, show the destination Case and allow correction. Offer an accountless local inbox when the user has no selected Case. Original content, capture context, collection time, and later edits remain traceable. Request camera, microphone, or location access only for an explicit capture action. Location attachment is optional and never activates background tracking.

An incomplete managed upload stays a Pending Case change. Verify the received content before accepting its Artifact. Keep a local retry copy until acknowledgement, subject to deletion and retention policy.

Automatically transfer text and small previews, but wait for Wi-Fi before large media uploads by default. Show the size and allow a user to upload now over another connection. Apply this preference consistently when the app next gets an execution opportunity. The UI reports pending work without promising a background upload deadline.

## Live browser and notifications

All clients can inspect live parent and child agents, tool events, safe results, created Artifacts, graph changes, and browser activity. The live research page runs in an isolated browser on the execution host. The client receives a permitted view and bounded controls. The page cannot access the application's Case database or privileged device APIs.

Private human takeover is available only through a supported secure session. If the client cannot provide that session, preserve the waiting state and open the task on a compatible client. Do not put credentials or private challenge content into a shared recording.

Use an in-app notification center on all clients. Offer desktop notifications, web notifications, and mobile push when available and enabled. External notifications default to a generic event category, such as Review requested or Research completed, and an opaque reference. Opening the notification authenticates and rechecks Case access before showing content. Permission denial leaves the in-app center functional.

Notification delivery is advisory. Approval requests, run errors, and completion remain durable Case records. An offline stop command is shown as undelivered and does not imply that the remote run stopped.

## Review scenarios

- A phone loses connectivity during an upload. The local copy remains pending and transfer resumes without duplicating the Artifact.
- A browser closes during research. Its eligible execution host continues, and reopening the Case restores the recorded agent activity.
- A desktop closes while a local CLI run is active. The chosen close behavior keeps work running, safely pauses, or stops it, with a visible final status.
- A revoked member reconnects with old drafts. The host rejects unauthorized changes and eligible recovery follows the existing identity policy.
- A mobile user selects an Entity on the Timeline. Opening Graph focuses the same Entity and preserves the selected time window.
- A user pairs a laptop Runner from their phone. The grant names the Case and capabilities, while provider login remains on the laptop.
- A user without a subscription imports an archive on an installed app. The independent local Case remains usable without managed synchronization.
- A user sends a stop request with no network connection. The app displays that delivery is pending rather than claiming that the run stopped.

## Approved decisions

1. Closing Electron during active local research offers Keep running, Pause safely, or Stop, with an optional remembered preference.
2. Offline availability uses explicitly selected Cases, lightweight downloads first, and optional pinned originals.
3. Research requests drafted offline wait for review and submission after reconnection.
4. Large mobile media uploads wait for Wi-Fi by default, with an Upload now override.

Plan quotas, numerical media thresholds, hosted concurrency, retention after subscription expiry, and exact supported platform versions remain release and subscription decisions.
