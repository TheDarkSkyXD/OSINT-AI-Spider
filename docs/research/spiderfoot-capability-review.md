# SpiderFoot Capability Review

Research date: 2026-09-04
Scope: SpiderFoot open-source edition, not the commercial SpiderFoot HX service
Source policy: official project repository, source code, documentation, and release pages only

## Executive finding

SpiderFoot is best understood as a mature, scan-centric OSINT collection engine. Its durable ideas are its typed event pipeline, broad connector catalog, automatic module chaining, passive-versus-active collection profiles, source-to-result lineage, and exportable graph. It is not a case-management or AI investigation system.

The opportunity for AI OSINT Spider is therefore not merely to reproduce SpiderFoot's module list. It should retain the useful collection primitives while making the **case** the central object: user-supplied evidence, many research runs, AI work history, cited findings, files, images, links, entities, relationships, notes, decisions, and reports should all remain organized within one evolving case.

SpiderFoot's own correlation documentation identifies its core product gap: collection and entity extraction are heavily automated, but common analysis tasks were historically left to the user, and large result sets often had to be exported to other tools for analysis. Its 4.0 correlation engine narrows that gap with rules, but does not create an agentic, evidence-cited investigation workflow. [Official correlation-engine background](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/correlations/README.md#L1-L12)

## Research snapshot and counting method

The review pins source observations to open-source `master` commit [`0f815a2`](https://github.com/smicallef/spiderfoot/commit/0f815a203afebf05c98b605dba5cf0475a0ee5fd). At the research date, `VERSION` still identifies the product as 4.0.0, the latest GitHub release is [v4.0, published April 7, 2022](https://github.com/smicallef/spiderfoot/releases/tag/v4.0), and the pinned commit is the current `master` head, authored November 5, 2023. This does not mean every connector is unusable, but it is a material maintenance and dependency-compatibility risk for a new product to address.

Counts below were reproduced from the pinned tree rather than copied from promotional text:

- 232 `sfp_*.py` runtime modules excluding the developer template: 230 collection/analysis modules and two storage modules.
- 37 shipped correlation rules excluding the YAML template.
- 172 event-type declarations: 57 `ENTITY`, 79 `DESCRIPTOR`, 30 `DATA`, five `SUBENTITY`, and one `INTERNAL` type.
- Of the 232 runtime modules, 83 declare an API-key flag, 13 declare an external-tool flag, four declare an invasive flag, 13 declare a slow flag, and seven declare an error-prone flag.
- Module use-case tags overlap: 198 modules declare `Passive`, 157 `Footprint`, and 206 `Investigate`.

The project's public description rounds this to “over 200 modules” and documents 37 rules, export formats, SQLite, visualizations, Tor support, Docker, and external-tool invocation. [Official feature list](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/README.md#L19-L34)

## Architecture

SpiderFoot open source is a Python monolith with several internal layers:

```text
Web UI or CLI
      |
scan configuration + target classification
      |
one scan process
      |
ROOT/target events -> shared queue -> subscribed Python modules
                                      |           |
                                  new events   external APIs/tools
                                      |
                              SQLite storage module
                                      |
                         post-scan YAML correlations
                                      |
                   tables, search, graph, CLI, exports
```

### Runtime and process model

- `sf.py` is the executable entry point. It loads Python modules from the `modules` directory, loads YAML correlation rules, initializes SQLite, and starts either the embedded web server or a command-line scan. [Entry-point source](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sf.py#L168-L232)
- A web-initiated scan starts in its own `multiprocessing.Process`. Within the scan, the scanner creates a shared event queue, initializes selected modules, gives every module its own incoming queue, and uses module threads plus a shared worker pool. [Web scan process](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sfwebui.py#L1374-L1505), [scanner initialization](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sfscan.py#L260-L358)
- The scanner emits a `ROOT` event and a typed target event. Each resulting event is routed to modules whose `watchedEvents()` contains its type. Modules may emit additional typed events, creating the expanding “spider” chain. [Initial events and event loop](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sfscan.py#L359-L425), [queue dispatch](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sfscan.py#L438-L515)
- The plug-in base class suppresses repeated ancestry loops, forwards produced events, and provides the `watchedEvents`, `producedEvents`, and `handleEvent` contract. [Publisher/subscriber implementation](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/plugin.py#L283-L388), [module contract](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/plugin.py#L438-L488)
- Correlations run after successful collection. Rules are translated into SQLite queries plus Python filtering and grouping; rules analyze collected data and do not gather data themselves. [Correlation implementation description](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/correlations/README.md#L79-L116)

### Storage model

SQLite is the sole open-source datastore. The schema uses WAL mode and tables for event types, global/module configuration, scan instances, logs, scan configuration, scan results, correlation results, and correlation-to-event mappings. A scan result stores one type, value, producing module, timestamp, confidence, visibility, risk, false-positive flag, and parent event hash. [SQLite schema](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/db.py#L38-L109)

This is an event-lineage store, not a semantic graph database. Graph edges are inferred from `source_event_hash`; relationship types, assertions, evidence citations, alternative hypotheses, case folders, and file/blob records are not first-class schema objects.

The graph projection walks through non-entity ancestors to connect entity values. Its Sigma JSON nodes contain only an ID, text label, random initial coordinates, fixed size, and color; edges contain only source and target IDs. GEXF is built with an undirected NetworkX `Graph`. The result visualizes discovery adjacency but loses type, relationship meaning, evidence, time, and confidence at the graph boundary. [Graph projection source](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/helpers.py#L420-L633)

## Scan workflow

1. **Choose one target.** Supported target classes include IPv4/IPv6 addresses and netblocks, internet names, email addresses, human names, ASNs, phone numbers, usernames, and Bitcoin addresses. [Target type source](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/target.py#L13-L54)
2. **Choose scope.** A user can select exact modules, desired output event types, or one of `All`, `Footprint`, `Investigate`, and `Passive`. Passive is explicitly intended not to contact the target or its affiliates. [New-scan profiles](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/templates/newscan.tmpl#L38-L60)
3. **Resolve the module chain.** If users select output types, SpiderFoot finds producing modules, then recursively adds modules that produce those modules' input event types. [Automatic selection logic](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sfwebui.py#L1420-L1478)
4. **Initialize and enrich.** Modules receive merged global and module configuration, can enrich target aliases, and are attached to event queues. [Module setup](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sfscan.py#L278-L358)
5. **Expand from the seed.** Typed events trigger interested modules. Results preserve immediate parentage and are stored even when repeat expansion is suppressed.
6. **Finish and correlate.** When queues drain, modules receive a finish signal, the scan closes, and YAML rules create risk-ranked correlation results. [Completion and correlations](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sfscan.py#L405-L436)
7. **Inspect or export.** Users browse summaries, result tables, correlations, discovery paths, graphs, logs, and search results.

The workflow is effective for “seed → automated expansion → result set.” It does not model “case → research plan → multiple user/agent sessions → reviewed findings → evolving narrative.”

## Module and data-source coverage

The 230 non-storage modules at the pinned commit divide into these declared primary categories:

| Category | Modules |
| --- | ---: |
| Reputation systems | 67 |
| Search engines | 47 |
| Content analysis | 27 |
| Crawling and scanning | 20 |
| Passive DNS | 15 |
| Leaks, dumps, and breaches | 12 |
| DNS | 10 |
| Real world | 10 |
| Social media | 10 |
| Public registries | 7 |
| Secondary networks | 5 |

The official catalog shows representative coverage of domain/DNS and infrastructure discovery, public registries, search engines, code search, social-account discovery, breach providers, paste and dark-web search, IP reputation and passive DNS, cloud buckets, cryptocurrency, phone/email enrichment, geolocation, metadata extraction, and vulnerability/security tools. It also includes an internal Account Finder that checks a username against more than 500 sites; that is site enumeration, not 500 independent full-source integrations. [Official module catalog](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/README.md#L126-L366)

At the pinned commit, declared data-source access models across all runtime modules are:

| Module metadata | Count |
| --- | ---: |
| Free, no authentication, unlimited beyond throttling | 88 |
| Free, authenticated, limited | 61 |
| Free, authenticated, unlimited beyond throttling | 11 |
| Free, no authentication, limited | 6 |
| Commercial only | 8 |
| Private/invite-only | 2 |
| No external data-source model declared | 56 |

These are module metadata counts, not guarantees of unique sources, present-day availability, legal suitability, or connector health. The module template defines access models, flags (`apikey`, `slow`, `errorprone`, `invasive`, `tool`), use cases, categories, source documentation, and API-key instructions. [Official module template](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/modules/sfp_template.py#L20-L132)

Important parity targets for AI OSINT Spider are therefore:

- typed input/output declarations so connectors chain automatically;
- passive, direct-contact, authenticated, paid, and invasive capability labels;
- configurable source credentials and rate limits;
- internal parsers alongside remote APIs and external tools;
- per-result source lineage and false-positive review;
- connector health tests, compatibility status, and last-success metadata, which module count alone does not provide.

## Entity and relationship model

`SpiderFootEvent` is the core unit. It carries generated time, event type, confidence, visibility, risk, module, string data, parent event, parent hash, module data source, and actual source. Its exported dictionary is smaller: generated time, type, data, module, and source data. [Event object](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/event.py#L6-L60), [event export shape](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/event.py#L284-L301)

The event taxonomy distinguishes `ENTITY`, `SUBENTITY`, `DESCRIPTOR`, `DATA`, and `INTERNAL` records. Correlation rules can traverse a result's source, children, or nearest ancestor entity. [Taxonomy declaration](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/db.py#L111-L284), [correlation traversal semantics](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/correlations/README.md#L335-L353)

Limitations relevant to the new product:

- The parent-child discovery edge says “this result came from that result”; it cannot natively distinguish `employed_by`, `owns`, `contacted`, `appeared_at`, `same_as`, `claimed_by`, or `contradicts`.
- A result's SHA-256 identifier hashes an ID made from type, generation time, module, and randomness, not the collected content. It is an identity/linkage hash, not evidence-integrity proof. [Event hash implementation](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/event.py#L127-L138)
- The SQLite schema has no content-addressed artifact/blob table, capture manifest, source snapshot, quote/span citation, legal basis, reviewer decision, or immutable chain-of-custody record.
- Confidence, visibility, and risk exist on events, but source reliability, claim confidence, entity-resolution confidence, and analyst verification are not separated.

AI OSINT Spider should use distinct first-class types for `Case`, `ResearchRun`, `AgentStep`, `Source`, `SourceSnapshot`, `Artifact`, `Entity`, `Claim`, `Relationship`, `Finding`, `Citation`, `ReviewDecision`, and `AuditEvent`. Discovery lineage should remain separate from asserted semantic relationships.

## UI, API, search, and export

### Open-source UI

The web UI provides scan creation/listing, settings, summary, correlations, browse, graph, scan settings, logs, scoped search, false-positive marking, and exports. [Scan workspace template](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/templates/scaninfo.tmpl#L15-L73)

Visualization includes:

- a Sigma canvas graph with draggable nodes;
- random and five-second ForceAtlas2 layouts;
- graph snapshot download;
- D3 bar, bubble, and discovery-path dendrogram views;
- tabular full/unique data views and correlation tables.

[Graph implementation](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/templates/scaninfo.tmpl#L215-L276), [static dependency versions](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/static/package.json#L1-L10)

Search can query by scan, event type, wildcard/exact value, or regular expression. The database implementation can omit `scan_id`, but the visible case-like search control is scoped to the current scan and the top navigation has no global search experience. [Search implementation](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/db.py#L448-L529), [navigation template](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/templates/HEADER.tmpl#L43-L92)

The endpoint named `scanhistory` is not an analyst activity history. It returns counts grouped by hour/day and event type for one scan. [History query](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/db.py#L1469-L1496)

The open-source UI does not supply first-class case folders, rich evidence/media previews, link preview cards, notes, tasks, AI chat, per-case instructions, skills, a plug-in library, model selection, a live agent browser, maps, or a narrative timeline. The repository explicitly presents investigations, multiple targets, multi-user collaboration, full REST API, screenshotting, and outbound Splunk/Elastic/REST feeds as HX capabilities rather than open-source features. [Open-source versus HX list](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/README.md#L36-L53)

### CLI and HTTP surface

SpiderFoot supports direct CLI scans and a remote interactive CLI that calls the embedded web server. Remote commands cover modules, types, scans, correlations, data, export, logs, start/stop, search, summary, delete, and settings. [Remote CLI commands](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sfcli.py#L536-L1330)

The web class exposes JSON-returning HTTP handlers for these operations, but the project reserves the description “fully RESTful API” for HX. Treat the open-source endpoints as an application interface, not as a stable, versioned public API contract.

### Export

The documented primary formats are CSV, JSON, and GEXF. Web handlers also produce Excel-compatible event, search, and correlation exports and CSV logs. GEXF makes results portable to graph tools. [Documented exports](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/README.md#L19-L28), [web export handlers](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sfwebui.py#L331-L742)

## Extensibility

### Python modules

A module subclasses `SpiderFootPlugin` and declares metadata, configuration defaults and descriptions, setup behavior, consumed event types, produced event types, and event-handling logic. Modules can use in-memory temporary storage, enrich the target, call APIs, parse content, or wrap external tools. [Module template](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/modules/sfp_template.py#L20-L281)

The extension contract is simple and powerful, but modules run as trusted Python inside the scanner. There is no manifest-enforced filesystem/network/credential permission boundary, package signature, isolated connector process, or in-product curated library/install/update workflow in the open-source tree.

Module temporary state is still an in-memory dictionary; the base class states that moving all module state behind it would enable scan pause/resume. This is direct evidence that durable pause/resume was unfinished in the reviewed architecture. [Temporary-storage TODO](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/plugin.py#L296-L310)

### Correlation rules

Rules are one YAML file each and support exact/regex collection, aggregation, thresholding, outlier detection, cross-collection matching, and templated headlines. A new rule is installed by copying the template and restarting SpiderFoot. [Correlation rule reference](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/correlations/README.md#L117-L194)

For AI OSINT Spider, “skills” and “connectors” should not be the same thing:

- a **connector** obtains or transforms evidence under explicit permissions and credential scopes;
- a **skill** supplies investigation methodology, planning guidance, schemas, and validation rules;
- an **agent profile** selects model/provider, tools, instructions, autonomy policy, and budget;
- a **correlation rule** is deterministic and replayable over stored claims/events.

## Deployment, licensing, and security posture

### Deployment

SpiderFoot runs directly with Python and an embedded CherryPy server, normally on `127.0.0.1:5001`. The repository also supplies Docker and Compose. Its container is Alpine-based, runs as a non-root `spiderfoot` user, exposes port 5001, and places the SQLite database/log/cache under `/var/lib/spiderfoot`, normally mounted as a volume. [Direct install/run](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/README.md#L91-L114), [Dockerfile runtime](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/Dockerfile#L52-L85), [Compose service](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/docker-compose.yml#L19-L32)

It is a browser-served application, not a native desktop application, mobile application, or offline-first synchronized case client. AI OSINT Spider can reuse the local-service pattern inside Electron, but Electron renderers should communicate through a narrow authenticated IPC/API layer rather than opening the case database directly. A separate web deployment can use the same domain service contracts; a mobile client should be a constrained companion rather than attempting to run every desktop connector.

### Authentication and transport

The embedded server enables digest authentication when a `passwd` file exists and enables TLS when key/certificate files exist. Otherwise it warns that authentication is disabled. [Server security configuration](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sf.py#L461-L586)

That default is reasonable for loopback-only personal use but should not become the security model for a web/team product. The new system needs explicit local, hosted, and enterprise threat models; encrypted secrets; per-case access control; session security; audit logs; connector isolation; safe media rendering; and clear remote-exposure configuration.

### License

SpiderFoot open source uses the permissive MIT License, allowing use, modification, distribution, sublicensing, and sale provided the copyright and permission notice are preserved. [Official license](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/LICENSE)

Architectural inspiration is unrestricted. If code is copied or adapted, preserve the required MIT notice and track provenance at the file/dependency level.

## Gaps to turn into Wayfinder decisions

| SpiderFoot open-source baseline | Better-system requirement |
| --- | --- |
| One target produces one scan | A case contains many seeds, artifacts, scans, agent runs, and human decisions |
| Scan list is the top-level organizer | Searchable case library with folders/tags, saved views, and role-aware access |
| Typed event and parent hash | Typed entity/claim/evidence graph plus separate discovery lineage |
| Broad module catalog | Versioned connector SDK, health checks, permissions, rate limits, and curated library |
| Passive/Footprint/Investigate profiles | User-selectable suggest-only, preapproved automation, and bounded autonomous modes enforced by policy |
| Tables plus a derived Sigma graph | Interactive link analysis with typed edges, filters, provenance inspection, graph editing, timeline, map, and media/link previews |
| Post-scan deterministic correlations | Deterministic rules plus AI synthesis, contradiction detection, gap analysis, and cited summaries |
| Scan log and hourly result histogram | Searchable append-only case history of user actions, agent steps, tool calls, approvals, findings, and revisions |
| String result data in SQLite | Content-addressed artifacts, source snapshots, previews, OCR/transcripts, and integrity hashes |
| Global module configuration | Global defaults with per-case model, provider, instructions, skills, connector access, budgets, and credentials |
| Python/web or Docker | Electron desktop for Windows/Linux, hosted web, and a scoped mobile companion on shared contracts |
| Trusted in-process plug-ins | Sandboxed workers with explicit network/filesystem/secret permissions and cancellation |
| Open-source endpoints used by UI/CLI | Documented, authenticated, versioned API plus live progress/event streaming |

## Safety and product boundary

SpiderFoot's Account Finder and social modules discover public account presence; they do not justify automated fake-account creation. AI OSINT Spider should not create deceptive “puppet” identities, automate platform abuse, evade safeguards, or access non-public data without authorization.

The safe replacement is an investigator-owned account vault and connector authorization system:

- users connect accounts they lawfully control;
- connectors declare whether they are passive, contact a target, authenticate, incur cost, or perform active scanning;
- suggest-only mode asks for each action;
- preapproved mode runs only connectors and scopes explicitly approved for the case;
- bounded autonomous mode remains inside the same policy, legal, credential, cost, and rate limits and cannot override them;
- every external action records initiator, purpose, connector, parameters, time, returned source, and approval basis.

For missing-person and criminal cases, AI output must distinguish observed evidence, source claims, inference, and hypothesis. Risk scores and predicted locations should never be presented as facts, and identity matches, accusations, or high-impact actions require human review.

## Bottom line

SpiderFoot provides a valuable collection-engine reference and a substantial connector inventory. Its strongest reusable concepts are typed event subscriptions, automatic chain construction, scan profiles, module metadata, deterministic correlations, and result lineage. The differentiating product should be built above and around those concepts: an evidence-centered case model, live and controllable AI research, model/skill/connector policy per case, rich visual investigation, durable history, citations, and a coherent Electron/web/mobile user experience.
