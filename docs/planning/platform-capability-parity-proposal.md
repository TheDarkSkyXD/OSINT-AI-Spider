# Electron, web, and mobile capability parity

Status: approved October 15, 2026. Revised after the user required web and Electron feature parity and selective mobile availability.

Decision ticket: [Define Electron, web, and mobile capability parity](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/18).

## Established requirements

Electron is the desktop application for Windows and Linux. Web and Electron provide the same product features. Mobile includes a feature only when its interface is easy to use and presents the information clearly on a small screen. This replaces the earlier commitment to full mobile feature parity.

Installed applications support accountless local Cases with manual Portable Case archive export and import. The web client can provide the same local Case workflows through a compatible local runtime on the user's computer. The hosted web service and managed synchronization, collaboration, and hosted jobs require a paid account. Accessing the local runtime from a browser on that computer does not introduce a self-hosted managed service or cross-device synchronization. Each Case retains one authoritative host.

The Case brief uses the approved narrative layout and expanded labeled sidebar in web and Electron. Investigation views use the approved Network canvas. Mobile presents its supported features through navigation sheets and focused screens. Provider credentials for CLI subscriptions stay on the desktop or attached Runner. Optional supported API providers can execute on an eligible local or managed worker.

This document specifies product behavior. Exact operating-system versions, mobile frameworks, packaging, browser compatibility, and background-service mechanisms require verification during implementation.

## Capability matrix

Every capability remains subject to the user's Case role, applicable policy, provider configuration, and service entitlement.

For the same Case, permissions, and connected execution capabilities, a product feature available in Electron must also be available in web. OS integration and execution location may differ. A web action that needs a native capability uses the compatible local runtime or attached Runner and explains that requirement. An unavailable Runner is a missing execution prerequisite, not a web feature exclusion.

Mobile entries below describe candidates and boundaries for workflow validation. They do not require porting every desktop action to a phone. A feature that fails the mobile usability criteria is omitted from mobile navigation and offered on web or Electron instead.

| Workflow | Electron on Windows and Linux | Web | Mobile |
| --- | --- | --- | --- |
| Create and organize local Cases without an account | Yes | Yes, through a compatible local runtime on the same computer | Simple local workflows |
| Create, organize, and collaborate on managed Cases | Yes | Yes | Yes |
| Add Seed information, documents, images, and links | File picker, paste, and drag and drop | File picker, paste, and drag and drop, with native capture through a compatible runtime | Simple file selection, sharing, and capture |
| Review summaries, previews, citations, and contradictions | Full workflow | Full workflow | Readable focused reviews |
| Edit Claims, Relationships, Folders, Leads, and Tasks | Full workflow | Full workflow | Simple edits that pass mobile workflow validation |
| Review Findings and Entity merges | Local host or connected managed host | Local runtime or connected managed host | Clear individual reviews only; complex merge comparison belongs on web or Electron |
| Search Cases, material, and Case history | Available local and managed content | Available local content through the local runtime and authorized managed content | Available local and managed content |
| Explore Graph, Timeline, and Map | Full workspace | Full workspace | Readable focused views; dense analysis and complex graph editing belong on web or Electron |
| Chat, change models, edit instructions, and manage Custom agents and Skills | Full workflow | Full workflow | Chat, model selection, and simple settings; complex configuration requires a usable mobile design or remains on web and Electron |
| Run CLI subscription agents | Eligible local Runner | Control an attached Runner | Control an attached Runner |
| Run optional API agents | Eligible local or managed worker | Eligible local runtime, managed worker, or attached Runner | Eligible managed worker or attached Runner |
| Execute native tools and executable Plugins | Compatible local Runner or managed worker | Compatible local runtime, managed worker, or attached Runner | Start supported workflows on an eligible host; complex tool configuration belongs on web or Electron |
| Watch parent agents, subagents, tool calls, and browser work | Full workflow | Full workflow | Readable agent activity and supported browser previews; complex multi-panel supervision belongs on web or Electron |
| Pause, stop, and review approvals | Local host or connected managed host | Local runtime or connected managed host | Local host or connected managed host |
| Generate Reports and Portable Case archives | Local host or managed host | Local runtime or managed host | Simple generation, import, and export; advanced Report composition belongs on web or Electron |
| Continue research after the UI closes | Available local Runner or managed worker | Available local runtime, managed worker, or attached Runner | Available managed worker or attached Runner |

Managing an extension library is distinct from executing an extension. Web and Electron provide the complete library, Custom-agent configuration, Skill configuration, and Case-grant workflows. Mobile includes only the parts that pass mobile workflow validation. Only a compatible execution host runs executable packages. The library remains maintainer-managed under the approved extension decision.

An accountless local mobile Case does not acquire remote research merely by installing the app. The UI identifies which requested actions require a Runner or managed host. Case editing, review, organization, local search, and archive portability remain useful without those services. Mobile-native model execution and arbitrary local executable tools are outside this parity commitment.

## Mobile feature admission

A mobile feature must complete its intended task with readable text, useful previews, suitable touch targets, clear navigation, and no dependence on a desktop pointer, keyboard shortcut, or several simultaneous panels. It must preserve the information needed to make the decision. Test the complete workflow on supported phone sizes with scalable text and assistive navigation.

Adapting a feature into a focused screen is acceptable when the task stays clear. If a usable design is not available, leave the feature off mobile. Do not ship an awkward compressed desktop screen to claim parity. Tablet availability is evaluated separately and does not automatically grant phone availability.

For an omitted feature, preserve any existing draft or selected object and provide an Open on web or Electron route to the same Case context when accessible. Mobile search, links, and menus must not expose dead controls. The exact mobile feature list is recorded as investigation workflows are validated, and later additions require the same usability check.

## Case navigation and accessibility

Keep Case identity, active view, selected Entity, applied filters, and local or managed status visible. Carry selection and time filters when moving between supported Graph, Timeline, Map, inspector, search, and live-work views. Mobile focused views preserve the complete underlying Case data even when an editing feature is available only on web and Electron.

Provide a searchable list or relationship table as an alternative to graph and map interaction. Every visual-only gesture has a labeled control. Desktop and web support keyboard navigation, visible focus, and shortcuts that do not intercept text editing. Mobile supports screen-reader labels, scalable text, and adequate touch targets. Status uses text and shape as well as color. Respect reduced motion and let users pause animation.

Long-running work exposes status and recovery actions without requiring the user to stay on one screen. Local search labels the content available on that device. Unavailable Artifacts show download state and size rather than a broken preview.

## Offline Cases and downloads

Local Cases retain their full local authority while disconnected. Network collection and remote model calls wait for connectivity. Managed caches remain replicas and never become a second authoritative host.

Users explicitly choose which managed Cases to make available offline. Download the Case structure, summary, selected text, and preview derivatives first. Let users pin original Artifacts or complete Cases with a size estimate. Show progress, verified completeness, required free space, last synchronization time, and offline access expiry. Cache limits are user-configurable within available storage and Organization policy. Pinned pending work is not silently evicted.

The previously approved managed Offline access lease lasts 72 hours by default. Organization policy may disable offline access or change its duration up to seven days. Expiry locks managed content until reauthentication. Local Cases do not depend on a cloud lease.

Offline managed users can write notes, add new material, organize drafts, propose Relationships, and draft Research requests. Pending Case changes remain labeled until the host accepts them. Findings, Entity merges, membership changes, permanent deletion, managed dispatch, Schedule changes, and remote run control require the authoritative host.

Synchronize permitted notes and material automatically on reconnection, preserving both versions of conflicts. Keep Research requests drafted offline in a ready-to-review queue. Require the user to send them after reconnection so a forgotten request cannot unexpectedly start a chargeable job. Host validation still applies to every accepted command.

Show browser-only offline drafts as temporary local work. Browser cache is disposable, so the web client must offer draft export and explain the limits before a user relies on an offline draft. Web uses a compatible local runtime for the durable offline Case downloads and local authority also available in Electron. The hosted web client can use permitted cached reading and temporary drafts while disconnected, without representing that cache as durable storage.

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

Web and Electron can inspect live parent and child agents, tool events, safe results, created Artifacts, graph changes, and browser activity. Mobile exposes readable activity views and supported previews that pass its usability criteria. The live research page runs in an isolated browser on the execution host. The client receives a permitted view and bounded controls. The page cannot access the application's Case database or privileged device APIs.

Private human takeover is available only through a supported secure session. If the client cannot provide that session, preserve the waiting state and open the task on a compatible client. Do not put credentials or private challenge content into a shared recording.

Use an in-app notification center on all clients. Offer desktop notifications, web notifications, and mobile push when available and enabled. External notifications default to a generic event category, such as Review requested or Research completed, and an opaque reference. Opening the notification authenticates and rechecks Case access before showing content. Permission denial leaves the in-app center functional.

Notification delivery is advisory. Approval requests, run errors, and completion remain durable Case records. An offline stop command is shown as undelivered and does not imply that the remote run stopped.

## Review scenarios

- A phone loses connectivity during an upload. The local copy remains pending and transfer resumes without duplicating the Artifact.
- A browser closes during research. Its eligible execution host continues, and reopening the Case restores the recorded agent activity.
- A desktop closes while a local CLI run is active. The chosen close behavior keeps work running, safely pauses, or stops it, with a visible final status.
- A revoked member reconnects with old drafts. The host rejects unauthorized changes and eligible recovery follows the existing identity policy.
- A mobile user follows an Entity into a supported focused view. The selection and time filter remain intact. If the requested advanced action is omitted from mobile, the user can continue it on web or Electron with the same context.
- A web user configures a Custom agent or performs complex graph editing. The complete workflow is available as in Electron, using the connected execution host when needed.
- A phone cannot present an Entity merge comparison clearly. The merge workflow is omitted from mobile, while the underlying records remain available for readable review.
- A user pairs a laptop Runner from their phone. The grant names the Case and capabilities, while provider login remains on the laptop.
- A user without a subscription imports an archive on an installed app. The independent local Case remains usable without managed synchronization.
- A user sends a stop request with no network connection. The app displays that delivery is pending rather than claiming that the run stopped.

## Approved decisions

Web and Electron have product feature parity. Mobile features are included selectively according to demonstrated usability and presentation quality. The following defaults also remain approved:

1. Closing Electron during active local research offers Keep running, Pause safely, or Stop, with an optional remembered preference.
2. Offline availability uses explicitly selected Cases, lightweight downloads first, and optional pinned originals.
3. Research requests drafted offline wait for review and submission after reconnection.
4. Large mobile media uploads wait for Wi-Fi by default, with an Upload now override.

Plan quotas, numerical media thresholds, hosted concurrency, retention after subscription expiry, and exact supported platform versions remain release and subscription decisions.
