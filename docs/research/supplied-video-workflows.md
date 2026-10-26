# Supplied OSINT Video Workflow Review

Research date: 2026-09-04
Wayfinder question: [GitHub issue #5](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/5)
Source policy: the supplied videos and archived first-party YouTube metadata for what was shown; official project repositories and documentation for capability verification

## Executive finding

The videos support a case-centered workflow, not a single giant scraper:

1. Start with a user-supplied seed such as a username, email address, domain, IP address, file, image, or public profile.
2. Offer relevant, scoped pivots and let the selected agent mode decide whether the user approves each one, preapproves a connector set, or supervises an autonomous run.
3. Normalize every result into typed entities, relationships, sources, artifacts, and events while preserving the original response, URL, collection time, and collection method.
4. Let a user inspect the same evidence through case folders, previews, a relationship graph, a timeline, search, and chat.
5. Keep observations separate from identity claims and AI inferences. Username reuse is a lead; a public cryptographic proof is stronger evidence; neither alone proves that a real-world person controls an account now.

The recurring lawful capabilities worth carrying into AI OSINT Spider are username discovery, passive domain and infrastructure enrichment, public-web and archive research, document/media metadata extraction, public-profile correlation, transform-style graph expansion, and reproducible reports. The videos also contain or mention social engineering, credential testing, service scanning, proxy rotation, and access to exposed devices. Those are not product requirements and must not be implemented as general investigation features.

## Video availability and identification

The URLs were checked directly against YouTube on 2026-09-04. Current YouTube metadata and captions were available for two videos. One removed video had a first-party YouTube page archived by the Internet Archive. The remaining three returned `video unavailable`, their oEmbed records and thumbnails returned `404`, and no Wayback capture was available for their watch or short URLs. Their titles, creators, and contents therefore cannot be identified responsibly from the supplied links alone.

| # | Supplied video | Title and creator | Inspection status |
| --- | --- | --- | --- |
| 1 | [`HV6Ox7bTajc`](https://www.youtube.com/watch?v=HV6Ox7bTajc) | Unknown | Unavailable; no recoverable first-party metadata or archive. No workflow claims are made. |
| 2 | [`kPo9ySOWc44`](https://www.youtube.com/watch?v=kPo9ySOWc44) | **“10 New Latest OSINT Tools in Kali Linux to Find Anyone” — Cyber World YT** | Public. Title, description, upload date, and auto-captions inspected. |
| 3 | [`XOeGzxh1rRM`](https://www.youtube.com/watch?v=XOeGzxh1rRM) | Unknown | Unavailable; no recoverable first-party metadata or archive. No workflow claims are made. |
| 4 | [`cR8mQNMFGes`](https://www.youtube.com/watch?v=cR8mQNMFGes) | **“Top 10 OSINT Tools in Kali Linux \| Best 10 Kali Linux OSINT Tools Every Hacker Should Know! #osint” — CyberSleuth** | Removed from current YouTube. Title, creator, description, duration, upload date, and chapter outline recovered from the [archived YouTube page](https://web.archive.org/web/20241008125142/https://www.youtube.com/watch?v=cR8mQNMFGes). The media and caption text were not recoverable. |
| 5 | [`gfUEuxaotto`](https://www.youtube.com/watch?v=gfUEuxaotto) | **“Free OSINT Mini Course \| Learn OSINT in Under Two Hours” — Motasem Hamdan** | Public. Title, description, author-supplied chapters, and auto-captions inspected. |
| 6 | [`kScyk3bMU4A`](https://www.youtube.com/watch?v=kScyk3bMU4A) | Unknown | Unavailable; no recoverable first-party metadata or archive. No workflow claims are made. |

The unavailable status is material. The three unknown videos must not be treated as evidence for requirements. If the author can supply local copies or replacement URLs, this review can be extended.

## What the accessible videos show

### Video 2: ten-tool overview

This is a narrated overview rather than a reproducible tutorial. Its captions name ten tools and describe a typical purpose for each:

| Tool | What is actually stated in the video | Verification and correction |
| --- | --- | --- |
| Sherlock | Enter a username and look for matching account URLs on many social sites. | The official project searches usernames across 400+ networks and exports text, CSV, XLSX, or JSON results. A returned URL means a username-shaped account page was detected; it does not establish identity, control, activity, or ownership. [Sherlock repository](https://github.com/sherlock-project/sherlock) |
| SpiderFoot | Give it an IP, domain, email, or similar seed; modules expand related domains, IPs, emails, subdomains, and names and visualize/export results. | The open-source project documents a web UI and CLI, 200+ modules, typed targets, visualizations, SQLite, and CSV/JSON/GEXF export. Results are module observations, not a guaranteed “comprehensive profile.” [SpiderFoot repository](https://github.com/smicallef/spiderfoot) |
| Maltego | Start with entities and expand them into a visual relationship map. | Maltego defines transforms as functions that accept an entity, emit new entities, and link outputs to the input. This is the clearest precedent for an explainable case graph. [Official Maltego graph guide](https://www.maltego.com/blog/beginners-guide-to-maltego-charting-my-first-maltego-graph/) |
| theHarvester | Collect public emails, hostnames, subdomains, IPs, URLs, and people related to a domain or organization. | The current project normalizes results from public search, certificate, DNS, code, and threat-intelligence sources. It explicitly distinguishes passive discovery from active DNS/HTTP/TLS actions. [theHarvester repository](https://github.com/laramies/theHarvester) |
| Shodan | Search indexed Internet-connected devices and their exposed service details. | Shodan says its data comes primarily from service banners. The video’s suggestion that it can expose camera feeds must not become an automated access feature; the product may show indexed metadata and the source page only. [What is Shodan?](https://help.shodan.io/the-basics/what-is-shodan) |
| Recon-ng | Use modular web-reconnaissance components to collect and organize public information. | Recon-ng describes itself as modular, web-based open-source reconnaissance and explicitly distinguishes reconnaissance from exploitation and social engineering. [Recon-ng repository](https://github.com/lanmaster53/recon-ng) |
| Censys | Search Internet-facing hosts, services, ports, software, and certificates. | Censys documents structured host, web-property, and certificate datasets, including related-asset pivots. Use must remain within provider terms and case authorization. [Censys Platform quick start](https://docs.censys.com/docs/platform-quickstart-guide) |
| FOCA | Extract hidden metadata such as author, timestamps, and producing software from documents. | FOCA supports Office, OpenOffice, PDF, InDesign, SVG, and local graphic files, but the official project is Windows/.NET/SQL Server oriented. Its workflow is relevant; its implementation is not a suitable cross-platform dependency. [FOCA repository](https://github.com/ElevenPaths/FOCA) |
| Social-Engineer Toolkit (SET) | Create phishing and impersonation scenarios for social-engineering assessments. | SET’s own project limits it to explicitly authorized, consent-based assessments. It is not an OSINT collector and must not be bundled, wrapped, or exposed as a case skill. [SET repository and responsible-use statement](https://github.com/trustedsec/social-engineer-toolkit) |
| OSINT Framework | Browse a categorized directory of OSINT tools and resources. | This is a catalog, not an intelligence source. Its useful product precedent is discoverability: a connector/skill library organized by task, input type, cost, authentication, activity level, and platform. [OSINT Framework repository](https://github.com/lockfale/OSINT-Framework) |

The video does not demonstrate installation, exact commands, error handling, source terms, provenance, false-positive review, or case organization. Those are product-design gaps, not features proven by the video.

### Video 4: archived CyberSleuth overview

The archived YouTube record directly names Maltego, theHarvester, and Shodan. Its chapter outline then moves through “web reconnaissance,” “automating your OSINT workflow,” Internet mapping, two document-metadata sections, an “OSINT Swiss Army Knife,” and “the human element of hacking.” The following fuller sequence is a reconstruction from that first-party outline, not a fresh viewing of the removed media:

1. Maltego for visual data mining and links.
2. theHarvester for public domain and email discovery.
3. Shodan for indexed Internet-device data.
4. Recon-ng for modular web reconnaissance.
5. SpiderFoot for automated source expansion.
6. Censys for Internet-wide host and certificate data.
7. FOCA for metadata extraction.
8. Metagoofil for locating public documents, followed by a metadata tool.
9. OSRFramework for username/email-oriented utilities.
10. SET for social engineering.

Official projects support the reconstructed roles with two important corrections. Current Metagoofil searches for publicly indexed files and explicitly delegates metadata analysis to ExifTool; its documentation also suggests proxy rotation after Google throttling, which AI OSINT Spider must not reproduce. Use an official search API or a visible, user-driven search and respect quotas instead. [Metagoofil repository](https://github.com/opsdisk/metagoofil) The current Kali package documentation describes OSRFramework utilities for checking usernames, email variants, and strings across configured services, but the upstream GitHub repository linked by Kali is currently unavailable; this makes it a poor direct dependency. [Kali OSRFramework documentation](https://www.kali.org/tools/osrframework/)

The archived outline later discusses web scraping, APIs, social monitoring, encryption, case examples, cyber defense, journalism, and competitive intelligence. Those are narrated use cases, not validated autonomous-investigation results. Claims about machine learning identifying people, locations, threats, or future behavior should be treated as speculative unless each finding is supported by inspectable evidence and a calibrated model evaluation.

### Video 5: hands-on mini-course

This is the only accessible video that demonstrates a multi-step investigation. Its author-supplied chapters and captions show these concrete workflows:

#### Passive and active work are separated

The course distinguishes passive collection from direct interaction with a target. It demonstrates DNS lookups for TXT/SPF/DMARC/DKIM records and explains that tools such as Nmap and service enumeration are active. This separation should be first-class product data: every connector and proposed action needs an `activity` classification, scope requirement, and approval rule.

#### Public profile and identity correlation

The course begins with a nickname/Reddit handle, finds a Keybase account, and follows public Keybase proofs to Twitter, GitHub, Reddit, and a website. This is stronger than simple username reuse because Keybase proofs are public signed claims linking accounts, although they still require current validation and do not by themselves identify a real-world person. [Keybase proof documentation](https://book.keybase.io/account)

It then inspects public GitHub repository/commit information for names and email addresses. GitHub’s official commit API confirms that public commit objects may contain author name, email, and date. AI OSINT Spider should retain the commit URL and SHA with any extracted identity attribute and should redact or avoid displaying exposed credentials. [GitHub commit API](https://docs.github.com/en/rest/commits/commits)

#### Domain history and infrastructure pivots

From a discovered domain, the course checks current registration data, archived pages, historical IP/reverse-IP data, and DNS relationships. Product implications:

- Prefer structured RDAP over scraping legacy WHOIS. ICANN describes RDAP as the standardized successor that can provide differentiated access to registration data. [ICANN RDAP overview](https://www.icann.org/rdap/)
- Integrate Wayback availability and capture URLs while preserving the archive timestamp and original URL. Archived pages can be incomplete, redirected, or excluded and should never be presented as a perfect copy. [Internet Archive usage guidance](https://archivesupport.zendesk.com/hc/en-us/articles/360004651732-Using-The-Wayback-Machine), [Wayback APIs](https://archive.org/help/wayback_api.php)
- Show historical observations on a timeline. Do not collapse a past domain/IP relationship into a current relationship.

#### Username discovery

The course uses NameCheckup to test a handle across services. The current site says it checks public username availability without logging into platforms or accessing private accounts. This should be implemented as provider-aware public lookups with per-site timestamps and an “unverified match” status, not as account ownership inference. [NameCheckup](https://namecheckup.com/)

#### Transform-driven expansion

The course demonstrates Recon-ng workspaces/modules and Maltego transforms, including pivots among IP addresses, DNS names, subdomains, emails, and Shodan results. The durable pattern is a typed transform contract:

```text
input entity + case scope + connector configuration
    -> immutable source observation
    -> zero or more typed entities/relationships
    -> confidence and warnings
    -> suggested next pivots
```

Graph edges must point back to the observation that justified them. Re-running a transform creates a new time-stamped observation rather than silently replacing history.

#### Image, video, and location research

The course demonstrates reading file metadata with ExifTool, searching an image with Google, examining visible landmarks and signs, and comparing them with map imagery. ExifTool officially reads metadata across many image, audio, video, and document formats. Google Lens can return similar images and pages containing the same or similar image. [ExifTool documentation](https://exiftool.org/ExifTool.html), [Google Lens image-search help](https://support.google.com/websearch/answer/1325808)

The product should preserve the original file and hash before analysis, record extracted tags verbatim, create candidate locations rather than asserted locations, and require the user to see the visual evidence behind a geolocation conclusion. Missing EXIF is not evidence that an image is fake, and present GPS data is not automatically trustworthy.

#### Unsafe material that is not a requirement

Later sections discuss trying username/password combinations, brute force, scanning an IP with Nmap, and using default credentials to obtain access. Even when shown in a training lab, these are active security-testing or intrusion techniques, not OSINT collection. They are outside AI OSINT Spider’s general case workflow and must not be available as agent tools. The same exclusion applies to phishing, fake sites, impersonation, fake or puppet account creation, access-control bypass, anti-detection/evasion, and automated access to exposed cameras or services.

## Recommended product capabilities

### Build into the core

- **Case-first evidence model:** user material, agent runs, sources, artifacts, entities, relationships, events, notes, hypotheses, and reports all belong to one case and retain revision history.
- **Typed seed intake:** person/name, username, email, phone, domain, hostname, IP, ASN, organization, URL, repository, crypto address, location, document, image, video, and free-text prompt.
- **Transform registry:** each connector declares accepted inputs, outputs, activity level, authorization needs, credentials, price/quota, platform support, source terms, and failure modes.
- **Three agent modes with the same safety boundary:** suggest-only; automatic use of case-approved connectors; supervised autonomous research with live browser, budgets, pause, and kill switch. None may bypass authentication or source policy.
- **Live work view:** show the agent’s browser or connector task, current source, proposed action, extracted observation, and why the next pivot was selected.
- **Evidence-backed graph:** selecting an edge reveals its supporting sources, timestamps, extraction rule, confidence, and whether it is observed, user-asserted, or AI-inferred.
- **Folders plus derived views:** folders organize originals and findings; graph, timeline, map, summary, and search are projections over the same records rather than separate stores.
- **Identity-resolution discipline:** distinguish exact public proofs, shared identifiers, fuzzy similarities, and analyst assertions. Never merge people or accounts automatically without review.
- **Passive infrastructure connectors:** RDAP, DNS, certificate transparency, archives, Shodan, and Censys via documented APIs or user-authorized sessions. Past and current observations remain distinct.
- **Read-only media analysis:** hashing, MIME/type validation, metadata, OCR, frame extraction, perceptual hashes, reverse-image-search handoff, and human-reviewable geolocation clues.
- **Reproducible research:** save query parameters, connector version, response/snapshot, timestamps, errors, partial-result reasons, and citations. Summaries link to the underlying observations.
- **Library experience:** organize skills and plugins by investigative task as OSINT Framework does, but include signed packages, permissions, data-flow disclosure, activity classification, and compatibility information.

### Keep out of scope

- Fake, puppet, or impersonation account creation and account-aging automation.
- Phishing, pretexting, credential harvesting, malicious document generation, or SET integration.
- Password guessing, default-credential testing, brute force, exploitation, or access-control bypass.
- Stealth, proxy rotation to defeat throttling, CAPTCHA bypass, fingerprint spoofing, or anti-detection features.
- General-purpose port scanning or vulnerability exploitation. A separately governed asset-security product could support explicitly authorized testing, but it should not share the OSINT agent’s permission surface.
- Automated access to exposed cameras, file shares, admin panels, or other services; index metadata may be recorded without opening or authenticating to the service.
- Unsupported claims that a person committed a crime, controls an account, is in a location, poses a threat, or will act in the future.

## Product decision

Use the videos as workflow inspiration, not as a feature checklist. The strongest design is a supervised, evidence-centered investigation workspace that combines SpiderFoot-style automated expansion, Maltego-style typed transforms and graph links, and the mini-course’s manual correlation trail. The differentiator should be that the agent organizes every step into a searchable case with visible provenance and lets an investigator audit how a conclusion was reached.

Do not integrate offensive tools merely because an OSINT video lists them. Connector admission should be capability-based: public or user-authorized data, lawful purpose, inspectable provenance, bounded activity, provider-policy compliance, and a clean failure/stop path.
