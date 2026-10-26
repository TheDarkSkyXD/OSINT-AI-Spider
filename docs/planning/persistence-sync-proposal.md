# Storage, synchronization, search, and Case portability

Status: accepted by the user. The resolution comment on the decision ticket is the canonical decision record; this file preserves the approved proposal.

Decision ticket: [Choose persistence, indexing, synchronization, and case portability](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/15).

The proposal follows the approved free local apps, paid managed sync, single authoritative Case host, preserved originals, and provenance decision. It introduces no supported self-hosted server. Exact library versions, hosting vendors, plan quotas, and recovery service commitments remain implementation or subscription decisions.

## 1. Store Cases locally or on the managed host

Use an encrypted SQLite database for each local Case, with separately encrypted Artifact files. Prefer SQLCipher for database encryption, subject to platform packaging verification. Accountless use retains local unlock and user-controlled recovery keys. The OS credential store may wrap local keys for convenient unlock; that convenience does not turn the remote service into a recovery authority for a local-only Case.

Store managed Case records in PostgreSQL and encrypted Artifact objects in private object storage. Organize Entities, Claims, Relationships, versions, approvals, run records, and history as explicit records. Begin with relational graph projections and indexes; a separate graph database is not required by this decision.

Keep a small local Case-library index for case folders, titles, tags, and search routing. Distinguish folders that organize Cases from folders that organize material inside a Case. Removing a folder removes its grouping, not its referenced Cases or Artifacts.

Devices cache selected managed Cases under separate local storage ownership. A cache never becomes a second authoritative host. Browser storage is a disposable cache; the product must not present it as the sole durable copy of an investigation. Mobile local storage uses the same application contracts with a platform-specific encrypted persistence adapter.

## 2. Make accepted changes durable

The authoritative host validates each command and commits its state change, new object version, Case history entry, and pending notification together in a database transaction. An operation ID identifies each submitted command. Repeating that ID returns the previous result instead of applying the command again.

Upload Artifact bytes to temporary storage, verify their digest, then commit their ready reference. Interrupted uploads remain pending and cannot appear as fully captured evidence. An interrupted final commit is reconciled without publishing missing content; unreferenced temporary objects expire under a cleanup policy.

Derived graph views, text indexes, previews, embeddings, and summaries record which object versions they cover. They can be rebuilt from retained Case records and Artifacts. The UI distinguishes a saved change from an index or preview that is still processing.

## 3. Synchronize commands and accepted changes

A device submits commands with its operation ID, Case ID, expected object version, and relevant authorization context. The managed host validates current membership and policy, orders accepted changes, and streams notifications to connected clients. Notifications prompt durable catch-up from a saved cursor; a dropped live connection must not lose history.

Offline changes remain visibly pending until the host accepts them. A client can add drafts, notes, new material, and proposed relationships while offline. Approval of Findings, entity merges, membership changes, Case migration, permanent deletion, and cloud job dispatch require the authoritative host. Pending material is marked as local and is not represented as shared or reviewed.

Live synchronization means prompt delivery while connected, not a guarantee of instantaneous global agreement. Connection, pending-upload, conflict, and last-synced indicators should use plain labels.

## 4. Handle conflicting edits without silent loss

Independent additions can coexist. Editing an outdated version of a note, metadata field, or relationship produces a visible conflict with both versions retained. The investigator chooses or combines the content, creating a new accepted version. Do not silently resolve evidence or judgment conflicts by picking the latest device timestamp.

Permission and policy changes take effect at the host before accepting queued work. Deleted or revoked material does not reappear when an old device reconnects. Reject stale commands with a reason and preserve eligible local drafts for an authorized user to recover. Reopening a closed Case is an explicit command, not a side effect of offline synchronization.

Automatic text co-editing may be introduced later, but must preserve these version and review rules. This decision does not require a universal conflict-free merge algorithm.

## 5. Search the material the user can access

Provide exact identifier search, full-text search over permitted extracted content, filters, and search within Case history. Use local FTS5 and PostgreSQL full-text capabilities as the initial engine choices. Index version references so results can open the exact supporting material.

Global search combines accessible local Cases and managed Cases into one view with clear location and offline-coverage labels. Case-library folders, material folders, tags, and saved searches remain distinct organizational tools. Search previews must obey the same current Case access rules as opening the result.

Semantic search is optional enrichment. It must not silently send local Case content to a remote embedding provider; use a local model or an explicitly enabled provider path. Embeddings follow the same tenant, access, retention, and deletion boundaries as source content.

Exact and full-text search remain usable when an AI provider is disconnected. Graph expansion is bounded and paginated so opening a large Case does not require rendering every node.

## 6. Encrypt and isolate data

Use separate key scopes for local Cases and managed tenants or Cases. Encrypt Artifact files as well as database pages, previews, temporary material, and backups that contain Case content. Keep key recovery and rotation separate from content export. Use established encryption implementations; exact algorithms and key-service products are selected during security implementation.

For managed data, authorize every database, object, preview, export, worker job, live event, and search request against the current tenant and Case. Add database row-level policies as defense in depth, using application roles that cannot bypass them. Service maintenance roles require separate controls.

Deduplicate content within a Case initially. Matching bytes in unrelated Cases or tenants do not imply shared ownership or access. Credentials, cookies, and CLI subscription sessions never enter Case storage, search indexes, archives, or sync messages.

## 7. Back up complete, recoverable Cases

Local users choose an encrypted backup destination and schedule; paid cloud storage is not required for local backups. Back up database state and the Artifact versions it references as a consistent set. Copying live database files without the appropriate snapshot mechanism is not a backup procedure.

Managed service recovery combines database backups and recovery logs with retained Artifact versions and manifests. A restore validates references and digests before exposing a Case, preserves its identity and history, rebuilds derived indexes, and records the recovery boundary. Regular restore exercises are required before advertising recovery guarantees.

Backup retention duration, available recovery points, and recovery time and data-loss commitments are published plan terms chosen in the subscription decision. The interface must distinguish an untested backup file from a successfully verified recovery point.

## 8. Apply deletion across stored and derived copies

Separate archive, recoverable trash, and permanent deletion. Archive preserves content. Trash permits recovery for a disclosed period. Permanent deletion creates a minimal tombstone and schedules removal of originals, derivatives, indexes, caches, and eligible backup copies according to the published retention policy.

Deletion and access-revocation events take precedence when a device reconnects. Backups may retain protected copies until their declared expiry; restore procedures reapply deletion and revocation records so a restore cannot silently resurrect removed material. Display pending deletion when expiry has not yet completed.

The product cannot recall an archive already exported or erase an offline device it cannot contact. Managed offline access has a visible, expiring authorization lease rather than a claim of instant remote revocation. Lease duration belongs to the identity and enterprise-policy decision. Encryption and application lockout do not prevent an already authorized user from copying information they can view.

## 9. Export and import portable Case archives

Define a documented archive format containing portable records, original and derived Artifact versions as permitted, citation mappings, provenance, history checkpoints, and an export manifest. Provide encrypted archives by default, with recovery controlled by the exporting user. The private cloud database is never a prerequisite for reading a portable archive.

Verify format version, declared file sizes, content digests, reference consistency, and safe archive paths before import. Never execute embedded scripts or imported plugins. Reject malformed content with a useful report; import valid but incomplete packages with their limitations visible.

A normal import creates an independent Case with a new identity and a recorded origin. Internal relationships and citations are remapped consistently while preserving their original provenance. A deliberate backup restore preserves identity only within its authorized host recovery workflow. Import does not silently merge two investigations.

Cloud migration uploads and verifies a snapshot while the local host remains authoritative. A controlled handover blocks local writes briefly, transfers remaining accepted changes, verifies the destination, then switches authority. Failures before handover leave the local Case usable; failures after confirmed handover resume the managed host without creating two writers.

## 10. Preserve an exit when a subscription ends

Recommend a disclosed export and recovery period after cancellation or payment failure. During that period, authorized users can inspect retained managed Cases and export them locally; new paid sync writes, managed jobs, and scheduled collection stop when entitlement ends. Warn users before the retention deadline and apply the deletion policy when it expires.

Do not delete the user's free local Cases because a subscription ends. Cloud export creates an independent local Case; it does not preserve free real-time synchronization. Handle pending device changes explicitly so they are not mistaken for server-accepted evidence or silently discarded. Exact grace periods and storage entitlements belong to the subscription decision.

## Review scenarios

- Two devices edit the same note offline. Both versions remain visible; resolving the conflict produces one accepted version and a history entry.
- A phone loses connectivity during a photo upload. The photo stays pending, resumes transfer, and becomes a captured Artifact only after verification.
- A device repeats a command after a timeout. The host returns the recorded result without creating duplicate Claims or history entries.
- A user searches offline. Results identify which locally cached Cases were searched and which cloud material was unavailable.
- A user imports the same archive twice. The app detects the matching origin, offers an existing import or a deliberate new copy, and never silently merges histories.
- A subscriber exports a Case before service retention expires. The local application can open it without a subscription, with citations and verification information intact.
- A backup predates a deletion. Restoring it reapplies deletion records before exposing data to users.

## Remaining choices owned elsewhere

The identity decision owns roles, access leases, and recovery authority. The lifecycle decision owns exact job states and cancellation behavior. The platform decision owns mobile execution and cache limits. The subscription decision owns numerical quotas, grace periods, backup retention, and recovery commitments. The approved provenance decision owns citation and integrity meaning. This proposal supplies the storage and synchronization contract they must implement.

## Verified engine constraints

The [storage-engine research](../research/storage-engine-constraints.md) supports these engine choices with the following implementation conditions:

- Pin a SQLite or SQLCipher build containing the documented WAL-reset corruption fix. The documented fixed versions include SQLite 3.51.3 and the 3.44.6 and 3.50.7 backports. Validate the embedded version, transaction durability settings, and FTS5 availability in every shipped platform build. [SQLite WAL documentation](https://sqlite.org/wal.html)
- SQLCipher Community Edition permits commercial and open-source distribution with the required notices. It encrypts database and journal pages but does not encrypt all temporary files; configure memory temporary storage and separately protect Artifact files and application caches. [Community license](https://www.zetetic.net/sqlcipher/community/), [SQLCipher design](https://www.zetetic.net/sqlcipher/design/)
- PostgreSQL row-level policies do not constrain superusers or roles with bypass privileges, and table owners normally bypass them. Test application-role privileges and policies explicitly. [PostgreSQL row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- PostgreSQL point-in-time recovery restores a cluster. Recovering one Case therefore requires application snapshots or isolated recovery followed by controlled extraction; it is not an automatic per-Case restore feature. [PostgreSQL recovery](https://www.postgresql.org/docs/current/continuous-archiving.html)
- Local and managed full-text engines can differ in tokenization and ranking. Normalize supported query behavior and test common identifier and text-search examples rather than promising identical engine results. [SQLite FTS5](https://sqlite.org/fts5.html), [PostgreSQL text search](https://www.postgresql.org/docs/current/textsearch-intro.html)
