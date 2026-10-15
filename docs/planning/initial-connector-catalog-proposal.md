# Initial connector catalog

Status: draft for user review. Catalog boundaries are approved; individual entries remain proposed.

Decision: [Choose the initial bundled and verified connector catalog](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/22).

Evidence: [passive connector assessment](../research/initial-passive-connector-candidates.md) and [bug bounty connector assessment](../research/bug-bounty-connector-candidates.md). Both use current primary sources and distinguish documented interfaces from tested project integrations.

## Approved boundaries

Aim for 25 to 40 tested Connectors across the approved capability groups. The public catalog contains Bundled and Verified exact versions maintained or reviewed by the project maintainer. Private libraries and device-local development follow the existing extension rules. There is no Community tier.

Bundle small maintained offline processors, public sources without credentials, and stable public API adapters. Credentialed services, large runtimes, external tools, and components needing additional license review are optional Verified candidates. Users supply credentials and pay source providers directly.

Case templates recommend relevant packs. Each Research plan selects its inputs, sources, scope, and budget. Bug bounty support includes program scope intake, authorized asset research, evidence organization, and report preparation. Target-contacting tests use the separate active-cyber pack.

## How to read the candidate matrix

Bundled candidate and Verified candidate describe intended distribution after admission. None of these entries has passed this project's implementation, security, platform, or source-health checks. A provider key does not establish permission to preserve or redistribute its data.

An adapter counts once regardless of endpoints, supported websites, file formats, or blockchain networks. Local Case intake, chat, graph rendering, portable Case archives, and Report generation are core product features and do not inflate the external-source count.

Every adapter preserves input origin, returned material or its explicit capture limit, source time, collection time, tool version, and discovery path. An imported tool result remains a tool assertion; it does not become an investigator-accepted Finding.

## Research and import candidates

| ID | Adapter | Pack | Proposed distribution | Input and useful output | Access or limitation |
| --- | --- | --- | --- | --- | --- |
| C01 | HTTP page capture and Mozilla Readability | Web and news | Bundled candidate | URL to original response, extracted article, and link metadata | Reads the named site; extracted text may omit context |
| C02 | Playwright browser capture | Web and news | Verified candidate | Approved URL to visible browser activity and page captures | Browser runtime required; site access and capture rights apply |
| C03 | RSS and Atom | Web and news | Bundled candidate | Feed URL to dated entries and source links | Feed content is bounded by publisher reuse rights |
| C04 | Internet Archive Wayback lookup | Web and news | Bundled candidate | URL to available historical captures and timestamps | Missing snapshots remain missing; archive time is not event time |
| C05 | CSV, JSON, and XLSX mapped import | Documents | Bundled candidate | Supplied structured files to typed Observations with row or cell references | Preserve source files and mapping; do not execute embedded content |
| C06 | PDF.js text extraction | Documents | Bundled candidate | PDF to page-referenced extracted text | Preserve the original; scanned pages require separate OCR |
| C07 | Tesseract OCR | Documents and media | Verified candidate | Images or page images to text, regions, and confidence | Optional models and executable runtime |
| C08 | Apache Tika | Documents and media | Verified candidate | Supplied documents to extracted text and metadata | Optional Java runtime and isolated parsers |
| C09 | ExifRead | Documents and media | Verified candidate | Supplied images to original metadata fields | Optional Python runtime; missing or forged metadata remains possible |
| C10 | Email identifier parser | Identity | Bundled candidate | Supplied material to normalized addresses and source spans | Parsing establishes neither mailbox existence nor ownership |
| C11 | libphonenumber | Identity | Bundled candidate | Supplied number to normalized format and numbering metadata | Format validity establishes neither subscriber nor current location |
| C12 | Sherlock with a reviewed site allowlist | Identity | Verified candidate | Username to candidate public-profile presence | Site-specific policy and response validation; presence is not identity |
| C13 | RDAP through authoritative bootstrap | Infrastructure | Bundled candidate | Domain, IP, or ASN to registry responses | Privacy-redacted registration data stays redacted |
| C14 | DNS through a configured recursive resolver | Infrastructure | Bundled candidate | Domain to requested DNS records | Record resolver, query types, and query time; prohibit brute force here |
| C15 | GitHub REST and GraphQL | GitHub and code | Verified candidate | Repository or account identifier to accessible repository and activity records | Scope token permissions, search limitations, and rate budgets |
| C16 | GLEIF | Public records and finance | Bundled candidate | LEI or organization query to legal-entity records | Registry relationships do not establish criminal intent |
| C17 | SEC EDGAR | Public records and finance | Bundled candidate | CIK or filing identifier to company and filing records | Identify the application and honor fair-access limits |
| C18 | Companies House | Public records and finance | Verified candidate | Company identifier or query to UK corporate records | User API key; coverage is UK-specific |
| C19 | Etherscan API | Financial identifiers | Verified candidate | Supported chain, address, or transaction to chain records | User key, network and plan coverage, and preservation rights required |
| C20 | Esplora-compatible read-only API | Financial identifiers | Verified candidate | Bitcoin address or transaction to chain records | Explicit provider endpoint and provider terms; no transaction broadcast |
| C21 | VirusTotal lookup | Cyber threat intelligence | Conditional Verified candidate | Hash, URL, domain, or IP to permitted existing intelligence | Public API restrictions prevent assuming commercial use; appropriate entitlement required |
| C22 | Shodan lookup | Cyber threat intelligence | Verified candidate | IP or bounded query to existing provider observations | User key and plan; no active scan request |
| C23 | URLhaus lookup | Cyber threat intelligence | Conditional Verified candidate | URL or hash to available threat records | Auth-Key required; commercial service entitlement must be resolved |
| C24 | Wikidata | General research and organizations | Bundled candidate | Entity identifier or query to statements, references, and aliases | Preserve revision and cited references; linked media have separate licenses |
| C25 | Subfinder with reviewed providers | Infrastructure | Verified candidate | Domain to passive-provider subdomain observations | Provider credentials and individual source rights still apply |
| C26 | HackerOne researcher API | Bug bounty | Verified candidate | Accessible program to program rules and structured scope | Researcher endpoint permissions; retain exclusions and scope version |
| C27 | Bugcrowd brief and scope import | Bug bounty | Bundled candidate | User-supplied authorized brief to draft structured scope | Human review required; no assumption of researcher API entitlement |
| C28 | Intigriti researcher API | Bug bounty | Verified candidate | Accessible program to scope and program context | Beta API compatibility must be pinned and tested |
| C29 | STIX 2.1 mapped import | Cyber threat intelligence | Bundled candidate | Supplied bundle to mapped indicators and relationships | Preserve producer assertions, markings, unsupported types, and identifiers |
| C30 | SpiderFoot structured-result import | General interoperability | Bundled candidate | Supplied result export to Observations and discovery lineage | Preserve tool/module origin; discovery adjacency is not a semantic Relationship |

## Separate active-cyber candidates

| ID | Adapter | Proposed distribution | Intended use | Execution boundary |
| --- | --- | --- | --- | --- |
| C31 | ProjectDiscovery httpx | Verified candidate | Authorized HTTP service observations | Contacts targets; resolve and check scope before dispatch and redirects |
| C32 | ProjectDiscovery Nuclei | Verified candidate | Approved bounded vulnerability checks | Pin reviewed templates and engine; exclude unapproved code, fuzzing, intrusive, and callback behavior |
| C33 | OWASP ZAP | Verified candidate | Authorized web application inspection | Crawling contacts targets even when analysis is called passive; active scans need explicit limits |

These three candidates are disabled by default. A program's scope import records its rules but does not itself grant permission to test. The plan binds a specific scope version, exclusions, permitted methods, schedule, credentials, and request budget. Scope changes stop affected work for review.

## Bug bounty Case workflow

1. Add a program brief or import accessible program details.
2. Review included assets, excluded assets, wildcard rules, permitted tests, and program restrictions.
3. Map assets from third-party sources and organize the results with their source lineage.
4. Approve bounded target-contacting checks where permitted by the program.
5. Preserve requests, responses, reproduction notes, test versions, and unresolved interpretations.
6. Draft a report with impact, reproduction steps, scope reference, evidence, and remediation notes.
7. Review the draft before any external submission through the separately approved engagement workflow.

Duplicate suggestions are advisory. The application cannot know all private program reports or promise acceptance, payment, or a vulnerability merely from a scanner result.

## Search and deferred entries

The default search provider remains unresolved. Search results must have terms compatible with the product's retention and citation workflow. A source whose terms prohibit that workflow cannot be admitted merely because an API key is available.

Brave offers plans with storage rights that can override its general restrictions. It is the first conditional search candidate, pending verification of the applicable retention, sharing, export, and AI-processing terms. Exa and Tavily are alternatives with unresolved agreement requirements. No provider is selected unconditionally by this draft.

Maigret is an alternative to evaluate after the initial username adapter. Broad SpiderFoot module execution is deferred until each selected module has its own policy and provenance mapping. Unreviewed module packs do not become approved through a wrapper.

OpenCorporates, OpenSanctions, bulk personal-data services, commercial data feeds, and additional authenticated social connectors require specific access and data-license decisions. OTX and crt.sh remain deferred until current access, support, and reuse conditions are established. A missing-person or criminal Case can already import user-supplied records; the catalog does not imply access to private police or telecom databases.

The [Etherscan API](https://docs.etherscan.io/introduction) documents keyed chain lookups. Its planned adapter still needs an account contract covering retention, display, and export. The [Esplora API specification](https://github.com/Blockstream/esplora/blob/master/API.md) documents both read endpoints and transaction broadcast; only the read subset belongs in this proposal. The [PDF.js license](https://github.com/mozilla/pdf.js/blob/master/LICENSE) is Apache-2.0; the actual pinned build and dependencies still require packaging review.

## Interoperability and coverage

CSV and JSON exports expose version references and provenance. GraphML and GEXF projections are graph exchange views with an accompanying manifest, not complete portable Case archives. STIX interchange applies to supported cyber types, with unsupported values reported rather than discarded silently.

The proposed list contains 30 research or import candidates and three separate active-cyber candidates. The interface must report actual admitted versions, runtime availability, source access, and current health. These candidate counts are not a claim of implemented or healthy integrations.

The final catalog review must settle the search provider, exact launch subset, optional active tools, interoperability scope, and behavior when a source is unavailable.
