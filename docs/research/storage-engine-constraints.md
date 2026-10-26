# Storage engine constraints

Research date: 2026-09-04

This note checks SQLite, PostgreSQL, and SQLCipher against current first-party documentation. PostgreSQL's current documentation resolves to version 18. These findings inform implementation under [ADR 0001](../adr/0001-local-first-clients-with-private-managed-cloud.md); they do not change Case ownership, synchronization, retention, or recovery product rules. Deployment implications below are engineering inferences, not guarantees supplied by an engine.

## SQLite local storage

SQLite provides atomic transactions that commit all included changes or none. This can cover related Case records in one database transaction. [SQLite transactions](https://sqlite.org/transactional.html)

WAL permits concurrent readers and a writer, but only one writer at a time. Processes must share one host; WAL does not support a database shared through a network filesystem. Transactions spanning attached databases are atomic separately, not across the set. Long reads can delay checkpoints and grow the WAL. The WAL is persistent database state; separating it from its database can lose committed changes or corrupt the database. [SQLite WAL](https://sqlite.org/wal.html)

Durability depends on settings. In WAL mode, `synchronous=FULL` adds a synchronization at each commit; `NORMAL` can lose acknowledged transactions after power loss or a system crash. `OFF` also risks corruption. The relevant filesystem and device must honor synchronization. A successful SQL write alone does not establish the application's promised recovery behavior. [SQLite synchronous settings](https://sqlite.org/pragma.html#pragma_synchronous)

The current WAL documentation identifies a corruption race affecting SQLite 3.7.0 through 3.51.2 when multiple connections write or checkpoint concurrently. It is fixed in 3.51.3 and later, with backports in 3.44.6 and 3.50.7. Check the actual embedded SQLite version, including a SQLCipher build's baseline, before selecting a runtime. [SQLite WAL-reset bug](https://sqlite.org/wal.html)

FTS5 supports token, prefix, phrase, proximity, and Boolean queries, with ranking and snippets. Availability depends on the build or a loaded extension. External-content indexes require the application or triggers to maintain consistency with their content table. Adding triggers does not index existing rows; a rebuild can populate or repair the index. [SQLite FTS5](https://sqlite.org/fts5.html)

The Online Backup API copies a live database incrementally and yields a consistent snapshot when it completes. Concurrent writes can restart the copy, so sustained writes can prevent completion. `VACUUM INTO` is another documented live-copy mechanism. A live filesystem copy of only the main database file is therefore unsuitable as the general backup procedure. [SQLite Online Backup API](https://sqlite.org/backup.html), [SQLite WAL file handling](https://sqlite.org/wal.html#the_wal_file)

Implementation inference: database backup does not establish a consistent snapshot of Artifact bytes stored separately. The application needs a shared checkpoint or manifest for database records and external bytes, plus a tested restore path. FTS5 is a derived search structure whose rebuild and deletion behavior needs verification in the packaged runtime.

## PostgreSQL managed storage

PostgreSQL transactions bundle multiple SQL changes into an atomic operation, with intermediate changes hidden from concurrent transactions. This supports committing a Case mutation and its associated records together. [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)

Acknowledgment durability depends on WAL configuration. `synchronous_commit=off` can acknowledge transactions subsequently lost in a crash; `fsync=off` can cause unrecoverable corruption. With no configured synchronous standby, commit synchronization provides local durability only. Replication acknowledgment and standby query visibility depend on the selected mode and actual standby configuration. [PostgreSQL WAL settings](https://www.postgresql.org/docs/current/runtime-config-wal.html)

Row-level security can restrict reads and writes. Once enabled, an absent policy defaults to denial. Superusers and `BYPASSRLS` roles bypass it; owners normally bypass it unless `FORCE ROW LEVEL SECURITY` applies. `TRUNCATE` and `REFERENCES` are outside row policies. Integrity checks bypass policies and can leak existence information. Policies consulting other tables can introduce authorization races. Permissive policies combine with `OR`. `row_security=off` does not bypass policies; it errors if filtering would occur, which can expose incomplete-backup mistakes. [PostgreSQL row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

Implementation inference: tenant isolation requires trusted request identity, scoped privileges, tested policies on all relevant tables, and consistent transaction context. A tenant identifier supplied by an untrusted caller is not sufficient. Database administrators and privileged service paths remain part of the trust model; RLS does not isolate external Artifact storage or application caches.

Point-in-time recovery requires a base backup and an uninterrupted archived WAL sequence covering the recovery interval. `pg_dump` output cannot substitute for that base backup. WAL archiving must be configured and tested; PostgreSQL does not supply the archive destination or retention operation. This recovery mechanism restores a whole cluster, not one Case. [PostgreSQL continuous archiving and PITR](https://www.postgresql.org/docs/current/continuous-archiving.html)

Implementation inference: a per-Case recovery interface needs application-level snapshots or an isolated cluster restore followed by controlled extraction. Recovery time, recovery window, and maximum data loss require measured deployment procedures, including separately stored Artifacts. PITR support alone promises none of those service levels.

Built-in full-text search uses `tsvector`, `tsquery`, configurable parsing and dictionaries, and relevance functions. GIN is the documented preferred text-search index type. [PostgreSQL text search](https://www.postgresql.org/docs/current/textsearch-intro.html), [PostgreSQL text-search indexes](https://www.postgresql.org/docs/current/textsearch-indexes.html)

Implementation inference: PostgreSQL and FTS5 do not establish identical tokenization, query syntax, or ranking. Any cross-client search contract needs fixtures and deliberate normalization. Case authorization must also govern snippets and result metadata.

## SQLCipher encryption and distribution

SQLCipher is a modified SQLite build using transparent page encryption. Its documented design uses AES-256-CBC and page HMACs. Database data and journal/WAL page data are encrypted; other temporary files are not, so Zetetic requires disabling file-based temporary storage where temporary space is used. It is a separate SQLite source tree, not a loadable encryption plugin. [SQLCipher design](https://www.zetetic.net/sqlcipher/design/)

Community Edition is available under a BSD-style license and Zetetic explicitly permits use in open-source and closed-source commercial applications. Distribution requires its copyright, license conditions, disclaimer, and applicable dependency notices in a user-accessible location. This makes Community Edition a plausible distribution option for the open-source local client, subject to checking the chosen bindings, cryptographic provider, and packaged notices. [SQLCipher Community Edition](https://www.zetetic.net/sqlcipher/community/)

Official Commercial Edition packages have a separate license and include additional features and private support. Trial licensing permits evaluation but prohibits production use and redistribution. Package selection must distinguish Community source builds, commercial packages, and trial packages. [SQLCipher license information](https://www.zetetic.net/sqlcipher/license/)

Implementation inference: SQLCipher protects database contents at rest. It does not define key custody, recovery, device unlocking, transport security, or encryption of separately stored Artifacts, exports, and application logs. Those need explicit application and deployment designs. This note makes no claim of legal or regulatory compliance.
