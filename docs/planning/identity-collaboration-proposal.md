# Identity, roles, collaboration, and administrative control

Status: accepted by the user. The resolution comment on the decision ticket is the canonical decision record; this file preserves the approved proposal.

Decision ticket: [Define identity, roles, collaboration, and administrative control](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/16).

This proposal follows the approved accountless local product, paid managed service, single authoritative Case host, full visibility for every authorized Case member, redacted external sharing, append-only Case history, and host-validated offline synchronization. It does not introduce hidden material inside a Case or give organization administrators automatic access to Case content.

## 1. Separate local identity from managed identity

A local operator uses an accountless local profile. The operating-system user boundary and the app's local unlock protect local Cases. The project cannot recover a lost local key or remotely revoke access to a local-only Case. Sharing a local Case means exporting a Portable Case archive and creating an independent Case on import.

A cloud user is one human identity for the managed service. Shared human logins are prohibited. A cloud user may own personal managed Cases, join Organizations, and hold a different Case role in each Case. Migrating a local Case to the managed host binds it to the chosen cloud user or Organization through an explicit ownership handover.

An Organization owns team policy, membership eligibility, billing, and organization-owned Cases. A managed Case has one owning scope at a time: a cloud user's personal scope or one Organization. Transfers preserve Case identity and history, require both sides to accept, and never create two authoritative owners.

Agents, Connectors, managed workers, Runners, devices, and support staff are not represented as the cloud user who initiated their work. Every accepted action records the human initiator, the effective automation or support identity, the executing device or Runner when relevant, and the approval that allowed it.

## 2. Use strong sign-in and visible recovery

Offer passkeys as the preferred cloud sign-in method. Support a password plus a second factor for users who cannot use passkeys. Encourage two registered authentication methods and give users recovery codes, a device and session list, remote session revocation, sign-in alerts, and a record of recent security events. Notify established channels when an authenticator or recovery method changes. Do not use knowledge questions or support-agent impersonation as recovery methods.

Electron and mobile perform managed sign-in through the system browser using authorization code with PKCE. They do not collect cloud credentials in an embedded research browser. Store refresh credentials in the operating system's protected credential store, rotate or bind them to the client, and enforce server-side idle and absolute session expiry.

Require verified contact information before invitations, recovery changes, or managed Case ownership. Require fresh sign-in for changing recovery methods, adding an administrator, revealing or rotating secrets, full export, ownership transfer, break-glass access, and permanent deletion. Organization policy may require phishing-resistant authentication for every member.

Enterprise plans may connect an external identity provider through standard single sign-on and directory provisioning. Organization suspension or directory removal blocks new server access immediately. Existing offline access ends when the current Offline access lease expires.

Recovery for a personal cloud account follows the user's configured recovery methods and a visible delay for high-risk changes. Organization recovery follows its identity-provider and owner policy. Project support may help restore account access but may not silently become the user or bypass Organization controls. Local-only Case recovery remains the local operator's responsibility.

## 3. Keep Organization administration separate from Case access

Organization roles control the team container, not investigation content.

| Organization role | Allowed responsibilities | Case content access |
| --- | --- | --- |
| Owner | Transfer or delete the Organization, appoint administrators, control billing and Organization policy | None unless separately added to the Case or using recorded break-glass access |
| Administrator | Manage the directory, invitations, security policy, device rules, and Case inventory metadata | None unless separately added to the Case or using recorded break-glass access |
| Oversight auditor | Review sign-ins, membership, policy changes, exceptions, exports, deletion events, and access history | Metadata only unless separately added to the Case |
| Billing administrator | Manage plans, invoices, quotas, and cost visibility | None |
| Member | Become a member of Cases allowed by Organization policy | Only Cases to which the member is added |

Organization inventory metadata is limited to what administrators need to govern the service, such as Case identifier, owner, lifecycle state, member count, storage usage, sensitivity class, and policy status. Titles, subjects, thumbnails, source text, graph content, chat, and Findings stay hidden from nonmembers.

An Organization must always have at least one Owner. Removing the last Owner or transferring Organization ownership is blocked until a replacement accepts. Organization roles cannot weaken the Core safety policy or applicable provider and source rules.

## 4. Give every Case member one clear role

Case roles are action bundles. They do not create different content compartments. Every current Case member can view all Case content, including Sensitive case material. If information must be hidden from someone, it belongs in a separate Case.

| Case role | View all Case content | Add and edit material | Run approved research | Review and approve | Manage members and settings | Formal export |
| --- | --- | --- | --- | --- | --- | --- |
| Manager | Yes | Yes | Yes | Yes | Yes | Redacted and full |
| Investigator | Yes | Yes | Yes | Findings and merges when separation of duties permits | No | Redacted; full only with an explicit Full export grant |
| Reviewer | Yes | Annotations, Claims, review notes, and corrections | No by default | Findings, merges, Reports, and assigned approvals | No | Redacted; full only with an explicit Full export grant |
| Contributor | Yes | New material, notes, comments, Leads, and Tasks | No | No | No | No formal export |
| Viewer | Yes | Comments when enabled | No | No | No | No formal export |

A Case must always have at least one Manager. A user's effective access is the intersection of the Case role, Organization policy, Case authorization profile, subscription entitlement, source and provider restrictions, and current account state. The strictest applicable rule wins.

The Full export grant is separate because a polished archive is easier to redistribute than on-screen access. It controls the product's export workflow, not a false promise that a person who can view information cannot copy it. Enterprise plans may define custom role templates, but every template resolves to the same named permissions and appears plainly in the member screen and Case history.

## 5. Make important approvals explicit

An AI agent, Connector, worker, or service identity may request an approval but may never grant one. Approval records name the requester, approver, action, exact scope, reason, time, expiry when applicable, and resulting Case change.

Personal Cases allow the sole Manager to approve their own permitted actions after a clear confirmation. Team Cases use role-based approval. Organization policy may require a second person and prohibit self-approval for any of these actions:

- Accepting a Finding or an Entity merge
- Approving an active-collection Research plan
- Granting a Policy exception that is not a Hard restriction
- Producing a full unredacted export
- Transferring Case ownership or authoritative hosting
- Permanently deleting a Case
- Opening break-glass Case access

The default team policy requires a Reviewer or Manager for Findings, Entity merges, and Reports. It requires a Manager for membership, role, Case setting, ownership, export-grant, and deletion changes. A person may initiate and approve ordinary review work unless the Organization enables separation of duties. Failed, expired, denied, and withdrawn approval requests remain visible in Case history without duplicating protected content.

## 6. Invite people without leaking the investigation

An invitation names the Organization or Case, proposed role, inviter, expiry, and any required authentication policy. Its random secret is stored only as a digest. It is single-use, bound to the intended verified identity, revocable before acceptance, and useless after its role or Case changes. Invitations expire after seven days by default and may not remain valid for more than 30 days. After acceptance, the service removes the secret from the visible URL and prevents it from entering logs or referrers. Invitation messages use a neutral Case reference by default rather than placing a sensitive subject or allegation in email or push-notification text.

External collaborators can receive Case membership without becoming Organization members. Their access expires after 30 days by default and cannot exceed 90 days without renewal by a Manager. Organization policy can prohibit external collaborators, require a sponsor, shorten the limit, restrict eligible email domains, or require a Reviewer before access begins.

There are no public links to a live Case. External sharing produces an immutable Share package tied to a Report or Portable Case archive. It uses redacted derivatives by default, records its recipients and expiry, and never changes when the live Case changes. A full Share package requires Full export permission, fresh sign-in, confirmation, and any required second approval. Revocation stops later service access but cannot recall a downloaded copy, which the interface states before sharing.

## 7. Make collaboration understandable

Connected Case members can see member presence, comments, mentions, assigned Leads and Tasks, Research run status, approval requests, and accepted Case changes. Presence shows who is active and which Case object they opened. It does not broadcast unsaved typing or the contents of a private draft.

The authoritative Case host orders accepted changes. Advisory edit indicators warn when someone else is editing the same object, while the approved version and conflict rules prevent silent replacement. Each collaborator sees whether a change is a local draft, pending synchronization, accepted, rejected, or in conflict.

Notifications contain the minimum useful information. A lock-screen notification may say that a Case needs review without exposing a person's name, precise location, image, Claim, or source excerpt. Opening a notification rechecks current Case membership before displaying content.

Comments and Case chat do not become Claims, Findings, Tasks, or other structured material until someone explicitly promotes them. Removing a member keeps that person's attributed history and accepted contributions while ending future access.

## 8. Bound offline access and revocation honestly

A managed device receives a signed, device-bound Offline access lease after successful online authentication. It identifies the user, Organization when applicable, Case, allowed offline action class, current policy or membership version, issue time, and expiry. The standard lease lasts 72 hours and refreshes while the device is online. An Organization may disable offline access or set another duration up to a maximum of seven days. The client shows the expiry time before the user goes offline.

When the lease expires, the app locks managed Case caches until it can reauthenticate. Revoking a session, removing a member, suspending an account, or changing policy blocks server access immediately, but an unreachable device may retain readable content until its existing lease expires. The product never claims instant remote erasure.

Offline users may create the limited Pending Case changes allowed by the synchronization decision. They cannot approve Findings, merge Entities, change membership, permanently delete, dispatch managed jobs, or perform actions that require fresh authorization. On reconnect, the host checks current permissions. It rejects unauthorized queued work with a reason and prevents deleted or revoked material from returning.

If access changed while a device was offline, the client preserves encrypted pending work without exposing former Case content. After successful reauthentication, an authorized user may recover eligible drafts. Organization policy decides whether user-authored material rejected after removal may be returned as a separate package that excludes Case content.

## 9. Use recorded support and emergency access

Project support has no standing Case membership and cannot impersonate a customer. Routine support uses account, billing, device, job, and error metadata that excludes Case content. A Case Manager may grant a named support worker access to a specific Case for a stated purpose and no more than four hours. The grant requires fresh sign-in, shows the exact permissions, expires automatically, notifies Case Managers, and records every support action.

An Organization may enable break-glass access for a security, safety, or continuity incident. It requires a named administrator, fresh strong authentication, a written reason, an expiry no later than one hour, immediate notification, and an immutable high-severity audit event. An Organization can require a second approver or disable break-glass access. Break-glass adds temporary Case membership; it does not hide who opened the Case.

The managed service uses separate operational roles for deployment, database maintenance, security response, and customer support. Privileged maintenance access is just-in-time and recorded. Because the managed runtime can decrypt managed Case data, the product must disclose that trusted operators remain part of the cloud trust model even when normal application permissions deny access.

## 10. Scope devices, Runners, and automation identities

Each cloud session and registered device belongs to one cloud user, has its own identifier, and can be revoked independently. Users can rename devices and inspect last use. An attached Runner receives a narrow, expiring registration for named Cases and capabilities. It never inherits every Case the user can access.

Managed workers and scheduled jobs use Automation identities with declared permissions, owning Organization or user, expiry or rotation policy, and current status. They cannot sign in interactively, invite members, change roles, approve their own work, use break-glass access, or export a Case unless a specific approved job requires it.

When an agent or worker acts, history attributes the result to both the Automation identity and the human or schedule that initiated it. Disabling a Connector, Runner, user, or Organization suspends its outstanding work at the next enforceable boundary; exact Research run cancellation states belong to the activity-lifecycle decision.

## 11. Enforce access in the authoritative domain

Desktop renderers, browser clients, mobile clients, deep links, notifications, and imported identifiers are untrusted inputs. Each transport authenticates the delivered identity and builds an application-owned request context. The authoritative local or managed Domain checks Case ownership, current membership, role permissions, approvals, policy, and object state for every command and query.

The UI explains allowed actions but is not an access-control boundary. Managed database row policies, object-storage scopes, worker credentials, search filters, preview generation, exports, caches, and live-event channels provide defense in depth under the same tenant and Case identity. Deny access by default. A request cannot gain access by supplying another Case or Organization identifier.

Entitlements and permissions remain separate. Paying for a plan may make a feature available, but it does not authorize a user to use that feature in a Case. Likewise, a Manager role does not bypass a plan limit or a Hard restriction.

## Verified identity constraints

The [identity and access-control research](../research/identity-access-control-constraints.md) supports this proposal with these conditions:

- NIST requires an AAL2 verifier to offer a phishing-resistant option and uses multiple authenticators, protected authenticator binding, recovery notifications, and stronger recovery combinations. These are design targets, not a claim that this product meets a NIST assurance level. [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html)
- WebAuthn keeps credential private keys with the authenticator and does not send local biometric data to the service. This supports passkeys without creating a biometric database. [W3C Web Authentication Level 2](https://www.w3.org/TR/webauthn-2/)
- Installed applications must use an external user agent for OAuth and authorization code with PKCE. Electron and mobile therefore use the system browser rather than an embedded webview for managed sign-in. [RFC 8252](https://www.rfc-editor.org/rfc/rfc8252.html)
- Authorization must use least privilege, deny by default, and check each object and action. Tenant identity must reach databases, object storage, search, queues, workers, caches, and live events rather than relying on a caller-supplied tenant identifier. [OWASP Authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), [OWASP multi-tenant guidance](https://cheatsheetseries.owasp.org/cheatsheets/Multi_Tenant_Security_Cheat_Sheet.html)
- Session revocation can take time to propagate, so short-lived tokens and explicit Offline access leases bound the known gap. Neither mechanism can erase information already copied from an authorized device. [RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html), [RFC 7662](https://www.rfc-editor.org/rfc/rfc7662.html)
- Audit records need attributable actors, outcomes, affected objects, and correlation identifiers while excluding credentials and unnecessary sensitive content. Privileged support and audit access require their own controls. [OWASP Logging guidance](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html), [NIST SP 800-53 Rev. 5.2.0](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)

## Review scenarios

- An Organization Owner opens the Case list. They see governance metadata but cannot open a Case until a Manager adds them or recorded break-glass access is granted.
- A Viewer joins a missing-person Case. They can see the same sensitive material as other members, because Case access is not compartmented, but cannot run research or export the Case.
- An Investigator accepts their own Finding in a small team. It succeeds under the default policy; an enterprise policy requiring independent review would route it to another Reviewer.
- A former member reconnects after removal. The host rejects queued changes and deleted material does not return. Cached content locks no later than the Offline access lease expiry.
- A Case Manager sends a full export. The app requires fresh sign-in, explains that downloads cannot be recalled, obtains any required second approval, and records the Export manifest.
- A support worker troubleshoots a broken preview. The customer grants narrow, expiring access, and the history identifies the support worker rather than pretending the customer performed the actions.
- A notification appears on a locked phone. It reveals that review is pending but not the Case subject or sensitive finding.
- The last Case Manager tries to leave. The host requires another Manager to accept responsibility first.

## Decisions left with existing tickets

The activity-lifecycle decision owns precise run, approval-request, task, and notification transitions. The platform-parity decision owns secure local credential adapters, device-specific cache behavior, background limits, and notification presentation. The provider decision owns model credentials and provider account linking. The subscription decision owns which Organization controls and collaboration limits belong to each paid plan. The workspace prototypes test whether roles, approvals, presence, conflicts, and sensitive sharing remain clear to amateur and expert investigators.
