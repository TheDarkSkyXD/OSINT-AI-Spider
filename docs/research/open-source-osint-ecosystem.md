# GitHub OSINT ecosystem research

**Research snapshot:** 2026-09-04
**Scope:** Lawful, case-centered OSINT for an open-source Electron desktop application with future web and mobile clients.

## Method and boundaries

This review uses primary sources only: project repositories, repository license files, first-party specifications, and vendor documentation. Activity dates are the latest repository `pushed_at` values returned by the GitHub API on the snapshot date. A recent push is a maintenance signal, not proof of production quality. GitHub's "primary language" is also only an approximation for polyglot repositories.

Code licenses do not grant rights to collect or reuse data. Every connector still needs a source policy covering authorization, terms of service, robots directives where applicable, rate limits, data licensing, retention, and whether the source contains sensitive personal information.

This research excludes fake-account or "puppet" creation, credential attacks, bypassing access controls, evasion, and unlawful collection. It also excludes automated conclusions that a person is guilty, dangerous, deceptive, or likely to commit a crime. Those are not acceptable product capabilities.

## Findings at a glance

1. **Build the case system; adapt the collectors.** Existing tools provide broad collection, graph transforms, document extraction, and visualization, but none combines a durable case record, claim-level provenance, searchable agent history, a live research browser, per-case AI/provider choice, skills, and desktop/web/mobile clients.
2. **SpiderFoot is the coverage baseline, not the application foundation.** Its MIT-licensed Python modules cover a very broad set of identifiers and infrastructure, but the open edition is organized around scans. The project lists several case-oriented features only in its commercial HX offering: investigations, screenshotting, multi-user collaboration, and a fully RESTful API.
3. **The closest product references are fragmented.** Aleph is strongest for investigative documents and search; OGI, LinkScope, PANO, and OSINTBuddy show useful graph/transform interaction patterns; OpenCTI and IntelOwl are useful for cyber threat intelligence. Their licensing, maturity, platform, or case-model constraints prevent any one from being a drop-in base.
4. **Use two extension contracts.** Agent Skills are a good portable format for instructions and bundled resources. MCP is a good process/network contract for tools. Neither is a security boundary; executable plugins need explicit capabilities and isolation.
5. **Keep AI providers outside the domain model.** A case should store provider-neutral messages, citations, tool events, approvals, and artifacts. Codex CLI, Claude Code, and API providers should be replaceable adapters.

## SpiderFoot coverage baseline

[SpiderFoot](https://github.com/smicallef/spiderfoot) is Python and [MIT licensed](https://github.com/smicallef/spiderfoot/blob/master/LICENSE). Its repository was last pushed on 2026-04-13. The project README reports over 200 modules, a publisher/subscriber module pipeline, an embedded web interface and CLI, SQLite storage, a YAML correlation engine, visualizations, Docker support, and CSV/JSON/GEXF export.

| Area | What the open project covers | Implication for AI OSINT Spider |
| --- | --- | --- |
| Seed types | IP, domain/subdomain, hostname, CIDR, ASN, email, phone, username, person name, and cryptocurrency addresses | Use a typed seed contract compatible with this breadth; do not hard-code the application around "person" cases only. |
| Identity and social presence | Human-name/email/phone extraction and social-account enumeration | Useful as leads. A match is not identity proof; preserve the query, source, timestamp, returned fields, and confidence separately. |
| Internet infrastructure | DNS, domains, hosts, network ranges, banners, certificates, blacklists, and many commercial API integrations | Import selected passive modules through a Python worker. Gate active scans behind explicit proof-of-authorization. |
| Web and threat intelligence | Search, web-content analysis, threat feeds, Shodan-style services, dark-web-related sources, and third-party command-line tools | Create source categories and policies. Do not enable every module just because it exists. |
| Correlation | Modules publish events that become input to other modules; YAML rules correlate results | Copy the event-driven idea, but make every derived claim point to its source observations and derivation run. |
| Output | Scan UI, SQLite, visualizations, and CSV/JSON/GEXF | Prefer JSON import/export for an adapter. Do not couple the case database to SpiderFoot's scan database. |
| Open-edition gap | The README places investigations, screenshots, multi-user collaboration, third-party tools preinstalled, and a full REST API under SpiderFoot HX | The new product's differentiator is the open case workspace and evidence workflow, not merely a larger collector count. |

Primary source: [SpiderFoot README](https://github.com/smicallef/spiderfoot/blob/master/README.md).

## Investigation platforms and close product references

| Project | License and activity | Stack / integration | Reusable value | Material gap or risk |
| --- | --- | --- | --- | --- |
| [SpiderFoot](https://github.com/smicallef/spiderfoot) | [MIT](https://github.com/smicallef/spiderfoot/blob/master/LICENSE); Python; pushed 2026-04-13 | Run selected modules in a managed Python environment or import JSON/GEXF | Broad source/module coverage and an event-driven enrichment model | Scan-centric; open edition is not the complete case product described above |
| [Aleph](https://github.com/alephdata/aleph) | [MIT](https://github.com/alephdata/aleph/blob/develop/LICENSE.txt); JavaScript/Python services; pushed 2026-02-20 | Study APIs and data model; deploy only as an optional server | Indexes PDF, Word, HTML, CSV, XLS, and SQL data; investigative search and entity cross-referencing | Server-heavy stack; aimed at document/data investigations rather than a local desktop case timeline |
| [FollowTheMoney](https://github.com/opensanctions/followthemoney) | [MIT](https://github.com/opensanctions/followthemoney/blob/main/LICENSE); Python; pushed 2026-09-03 | Python library/CLI or schema inspiration | Mature investigative entity and relationship vocabulary plus normalization and tabular mapping | Finance/investigative-data emphasis; extend rather than adopt every schema verbatim |
| [Nomenklatura](https://github.com/opensanctions/nomenklatura) | [MIT](https://github.com/opensanctions/nomenklatura/blob/main/LICENSE); Python; pushed 2026-08-24 | Python API/CLI in the analysis worker | Human judgments for same/different/undecided entity resolution and canonical IDs | Requires a deliberate review UI; automated clustering cannot replace investigator judgment |
| [IntelOwl](https://github.com/intelowlproject/IntelOwl) | [AGPL-3.0](https://github.com/intelowlproject/IntelOwl/blob/master/LICENSE); Python; pushed 2026-09-03 | Optional container/API, subject to license review | Analyzer, connector, and visualizer plugin concepts; one request can fan out to multiple CTI sources | Cyber-threat focus, substantial service stack, AGPL obligations |
| [OpenCTI](https://github.com/OpenCTI-Platform/opencti) | Community Edition [Apache-2.0; enterprise code has separate terms](https://github.com/OpenCTI-Platform/opencti/blob/master/LICENSE); TypeScript; pushed 2026-09-04 | GraphQL API and connector architecture | Strong CTI knowledge model and connector lifecycle | CTI-specific and infrastructure-heavy; license boundary must be checked by component |
| [OpenGraph Intel (OGI)](https://github.com/khashashin/ogi) | [AGPL-3.0](https://github.com/khashashin/ogi/blob/main/LICENSE); Python/TypeScript; pushed 2026-07-24 | Reference or separately deployed service | Graph investigation, transform registry, GraphML/CSV/JSON import, analysis algorithms, AI worker | Young project created in 2026; AGPL; needs an independent security and quality audit |
| [LinkScope Client](https://github.com/AccentuSoft/LinkScope_Client) | [AGPL-3.0](https://github.com/AccentuSoft/LinkScope_Client/blob/main/LICENSE); Python/Qt; pushed 2025-03-04 | UX and module design reference | Graph, drag-and-drop entities, timeline, maps, browser-tab import, screenshots, extensible "resolutions" | Native Qt rather than Electron; its own README warns that resolutions are arbitrary Python code from potentially untrusted sources |
| [OSINTBuddy framework](https://github.com/osintbuddy/framework) and [plugins](https://github.com/osintbuddy/plugins) | [MIT](https://github.com/osintbuddy/framework/blob/main/LICENSE); Python; pushed 2026-03-09 | Evaluate entity/transform API concepts | Versioned entity targets, transform decorators, typed fields, file/subgraph results, settings | The [desktop application is proprietary and closed beta](https://github.com/osintbuddy); only the framework/plugins are reusable, and the ecosystem is very small |
| [PANO](https://github.com/ALW1EZ/PANO) | [CC BY-NC 4.0](https://github.com/ALW1EZ/PANO/blob/main/LICENSE); Python/Qt; pushed 2026-02-13 | Reference only | Graph, timeline, map, entity types, transforms, assisted analysis | Noncommercial Creative Commons license is not an OSI software license; do not copy code into this project |
| [OpenOSINT](https://github.com/OpenOSINT/OpenOSINT) | [MIT](https://github.com/OpenOSINT/OpenOSINT/blob/main/LICENSE); Python; pushed 2026-09-02 | Evaluate MCP/CLI adapter pattern in a sandbox | A compact AI/CLI/MCP wrapper over multiple OSINT tools | Very young; bundles high-risk breach, paste, recovery-flow, and active-security lookups that should not be enabled by default |

## Reusable collectors and analysis libraries

### People, usernames, email, phone, and GitHub

| Project | License / activity | Integration | Useful capability | Gap or constraint |
| --- | --- | --- | --- | --- |
| [Sherlock](https://github.com/sherlock-project/sherlock) | [MIT](https://github.com/sherlock-project/sherlock/blob/master/LICENSE); Python; pushed 2026-09-04 | Python package or JSON-producing CLI worker | Username presence checks across many sites | Presence is a candidate lead, not proof that accounts share an owner; sites change frequently |
| [Maigret](https://github.com/soxoj/maigret) | [MIT](https://github.com/soxoj/maigret/blob/main/LICENSE); Python; pushed 2026-09-04 | Python/CLI worker with structured output | Broad username-site dataset and profile metadata | Large site lists require continuous health checks and per-site policy metadata |
| [WhatsMyName](https://github.com/WebBreacher/WhatsMyName) | Dataset is [CC BY-SA 4.0](https://github.com/WebBreacher/WhatsMyName/blob/main/LICENSE.md); pushed 2026-08-16 | Consume or vendor the versioned `wmn-data.json` with attribution/share-alike review | Community-maintained username-check definitions | Dataset license is not the same as a permissive code dependency; response-pattern checks can produce false positives |
| [Social Analyzer](https://github.com/qeeqbox/social-analyzer) | [AGPL-3.0](https://github.com/qeeqbox/social-analyzer/blob/main/LICENSE); JavaScript; pushed 2026-01-12 | Optional isolated service/CLI | API, CLI, and web approaches to social-profile discovery | AGPL; broad crawling needs rate/source-policy controls |
| [PhoneInfoga](https://github.com/sundowndev/phoneinfoga) | [GPL-3.0](https://github.com/sundowndev/phoneinfoga/blob/master/LICENSE); Go; pushed 2026-08-25 | User-installed CLI adapter | Phone normalization and public-footprint pivots | Many useful results are search links rather than verified facts; GPL distribution review needed |
| [libphonenumber](https://github.com/google/libphonenumber) | [Apache-2.0](https://github.com/google/libphonenumber/blob/master/LICENSE); Java/C++/JavaScript; pushed 2026-09-01 | Direct JavaScript library | Offline parsing, formatting, and validation of international phone numbers | Validation means a plausible number format, not subscriber ownership or current service |
| [Octokit.js](https://github.com/octokit/octokit.js) | [MIT](https://github.com/octokit/octokit.js/blob/main/LICENSE); TypeScript; pushed 2026-09-03 | Direct library behind a GitHub connector | Authenticated/public GitHub REST and GraphQL access with pagination and throttling plugins | Must honor GitHub rate limits, API terms, visibility, and deletion/retention policy |

Do **not** ship [Holehe](https://github.com/megadose/holehe) as a default connector. Its account discovery relies on password-recovery behavior. Even though its code is GPL-3.0, that method creates platform-policy and privacy risk and can trigger notifications or abuse controls. If ever considered, it requires a separate legal, ethical, and source-specific approval. A generic "autonomous" switch is not enough.

### Missing-person workflow reference

[Trace Labs](https://tracelabs.org/) is a nonprofit focused on crowdsourced OSINT for missing-person cases. Its active [OSINT VM build repository](https://github.com/tracelabs/tlosint-vm) is Shell-based, [GPL-3.0](https://github.com/tracelabs/tlosint-vm/blob/main/LICENSE), and was pushed on 2026-08-06. Treat the VM and Trace Labs' [MPL-2.0 tool catalogue](https://github.com/tracelabs/awesome-osint) as workflow and test-environment references, not embedded dependencies; verify every listed tool at its upstream repository.

The more important reusable artifact is Trace Labs' first-party [Search Party rules of engagement](https://docs.tracelabs.org/searchparty/searchparty-rules). They require passive, "view but do not engage" research; prohibit contacting, tagging, friending, or liking the subject and associates; prohibit password resets, login attempts, and trying to register a missing person's email or phone; and require findings to be verifiable from a public link or reproducible access description. Encode these constraints into the missing-person case template, not merely a terms-of-use page. The app should route vetted leads to the authorized case owner or law-enforcement contact rather than encouraging users to contact subjects themselves.

### Domains, IPs, and cyber cases

| Project | License / activity | Integration | Useful capability | Gap or constraint |
| --- | --- | --- | --- | --- |
| [OWASP Amass](https://github.com/owasp-amass/amass) | [Apache-2.0](https://github.com/owasp-amass/amass/blob/main/LICENSE); Go; pushed 2026-07-19 | User-installed CLI or isolated service | Attack-surface and DNS relationship mapping | Some modes are active reconnaissance; require target authorization and mode-level policy |
| [theHarvester](https://github.com/laramies/theHarvester) | [GPL-2.0-only](https://github.com/laramies/theHarvester/blob/master/pyproject.toml); Python; pushed 2026-09-04 | CLI/Python worker | Emails, names, subdomains, IPs, and URLs from multiple public sources | GPL distribution review; source modules vary in stability and terms |
| [Subfinder](https://github.com/projectdiscovery/subfinder) | [MIT](https://github.com/projectdiscovery/subfinder/blob/dev/LICENSE.md); Go; pushed 2026-09-02 | CLI or Go sidecar | Fast passive subdomain enumeration | Narrowly scoped; each upstream provider still needs credentials, terms, and attribution metadata |
| [BBOT](https://github.com/blacklanternsecurity/bbot) | [AGPL-3.0](https://github.com/blacklanternsecurity/bbot/blob/stable/LICENSE); Python; pushed 2026-09-04 | Optional container/CLI | Event-driven recursive modules, presets, Python API, and multiple outputs | Designed for security scanning; many modules are active and AGPL applies |

Vulnerability scanners such as Nuclei and port scanners are not general OSINT defaults. They belong in an explicitly authorized cyber-investigation profile with target scope, preflight confirmation, rate limits, immutable audit events, and an emergency stop.

### Documents, images, metadata, and OCR

| Project | License / activity | Integration | Useful capability | Gap or constraint |
| --- | --- | --- | --- | --- |
| [Apache Tika](https://github.com/apache/tika) | [Apache-2.0](https://github.com/apache/tika/blob/main/LICENSE.txt); Java; pushed 2026-09-04 | Local sidecar/server | Type detection plus text and metadata extraction from over a thousand file types | JVM footprint; parsers process hostile files and need resource limits and isolation |
| [Unstructured](https://github.com/Unstructured-IO/unstructured) | [Apache-2.0](https://github.com/Unstructured-IO/unstructured/blob/main/LICENSE.md); Python; pushed 2026-09-04 | Python worker | Partitions complex documents into structured elements suitable for retrieval | Large optional dependency tree; benchmark against Tika before adopting both |
| [Tesseract](https://github.com/tesseract-ocr/tesseract) | [Apache-2.0](https://github.com/tesseract-ocr/tesseract/blob/main/LICENSE); C++; pushed 2026-09-02 | Native binary or wrapper in media worker | Local OCR across many trained languages | OCR confidence and coordinates must be preserved; output is not ground truth |
| [OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF) | [MPL-2.0](https://github.com/ocrmypdf/OCRmyPDF/blob/main/LICENSE); Python; pushed 2026-09-01 | CLI worker | Adds searchable OCR layers to scanned PDFs | Calls several native tools; retain the untouched original and record every transformation |
| [ExifRead](https://github.com/ianare/exif-py) | [BSD-3-Clause](https://github.com/ianare/exif-py/blob/master/LICENSE); Python; pushed 2026-06-10 | Python library | Read-only EXIF extraction | Metadata can be absent, stale, stripped, or forged; never present location metadata as independently verified |
| [OpenCV](https://github.com/opencv/opencv) | [Apache-2.0](https://github.com/opencv/opencv/blob/4.x/LICENSE); C++; pushed 2026-09-04 | Native/Python media worker | Image transforms, feature detection, scene/object-processing primitives | It is a low-level library, not an evidence interpretation system; biometric matching needs separate policy and should not be an MVP default |

There is no open-source reverse-image-search library with an index comparable to major commercial search engines. The safe product behavior is provider adapters or user-opened search actions, with the original image hash and query recorded. A reverse-search result should be captured as a sourced lead.

## UI, local search, graph, timeline, maps, browser, and provenance

| Project | License / activity | Recommended use | Important limitation |
| --- | --- | --- | --- |
| [Electron](https://github.com/electron/electron) | [MIT](https://github.com/electron/electron/blob/main/LICENSE); C++/TypeScript; pushed 2026-09-04 | Windows/Linux desktop shell around a shared local web UI | Never expose Node.js to researched pages. Electron's [security guidance](https://www.electronjs.org/docs/latest/tutorial/security) requires sandboxing, context isolation, restrictive IPC, navigation controls, and no Node integration for remote content. |
| [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) | [MIT](https://github.com/WiseLibs/better-sqlite3/blob/master/LICENSE); JavaScript/C++; pushed 2026-08-10 | Local case database, transactions, and SQLite FTS5 | Native module must be rebuilt and packaged for each Electron/OS/architecture target; DB writes should stay outside the renderer. |
| [sqlite-vec](https://github.com/asg017/sqlite-vec) | [Apache-2.0](https://github.com/asg017/sqlite-vec/blob/main/LICENSE-APACHE); C; pushed 2026-05-18 | Prototype optional local semantic retrieval | Project describes itself as pre-v1; semantic search must supplement, not replace, exact/global search. |
| [Cytoscape.js](https://github.com/cytoscape/cytoscape.js) | [MIT](https://github.com/cytoscape/cytoscape.js/blob/unstable/LICENSE); JavaScript; pushed 2026-09-02 | First graph renderer and client-side graph algorithms | Benchmark large cases and expensive layouts in workers before committing to scale claims. |
| [Graphology](https://github.com/graphology/graphology) + [Sigma.js](https://github.com/jacomyal/sigma.js) | MIT ([Graphology](https://github.com/graphology/graphology/blob/master/LICENSE.txt), [Sigma](https://github.com/jacomyal/sigma.js/blob/main/LICENSE.txt)); JavaScript/TypeScript; pushed 2026-09-02 / 2026-08-20 | Alternative prototype for WebGL rendering of larger graphs | More composition work than Cytoscape; selection should be based on a representative performance/interaction prototype. |
| [vis-timeline](https://github.com/visjs/vis-timeline) | [Apache-2.0 OR MIT](https://github.com/visjs/vis-timeline/blob/master/LICENSE.md); JavaScript; pushed 2026-09-04 | Interactive event ranges, groups, and time navigation | Timeline truth must come from normalized events with explicit timezone, precision, and source. Do not use node creation time. |
| [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js) | [BSD-3-Clause](https://github.com/maplibre/maplibre-gl-js/blob/main/LICENSE.txt); TypeScript; pushed 2026-09-04 | Desktop/web map renderer | Renderer license does not include map tiles, satellite imagery, or geocoding data rights. |
| [MapLibre React Native](https://github.com/maplibre/maplibre-react-native) | [MIT](https://github.com/maplibre/maplibre-react-native/blob/main/LICENSE.md); TypeScript; pushed 2026-09-02 | Future Android/iOS map client using compatible styles and sources | Native mobile client still needs its own performance, offline, and secure-storage design. |
| [Playwright](https://github.com/microsoft/playwright) | [Apache-2.0](https://github.com/microsoft/playwright/blob/main/LICENSE); TypeScript; pushed 2026-09-04 | Research browser automation, isolated browser contexts, screenshots, and deterministic event capture | Browser automation must not become anti-bot evasion. Respect access controls and make actions visible, cancellable, and attributable to a case/run. |
| [Mozilla Readability](https://github.com/mozilla/readability) | [Apache-2.0](https://github.com/mozilla/readability/blob/main/LICENSE.md); JavaScript; pushed 2026-08-04 | Extract readable article text for link previews and indexing | Store the source HTML/capture and extraction version; extracted text can omit important context. |
| [warcio.js](https://github.com/webrecorder/warcio.js) | [MIT](https://github.com/webrecorder/warcio.js/blob/main/LICENSE); TypeScript; pushed 2026-09-04 | Stream WARC records from Node/browser capture code | WARC preserves responses but does not by itself prove authorship, truth, or legal admissibility. |
| [Webrecorder specifications](https://github.com/webrecorder/specs) | No root license detected; primary language HTML; pushed 2025-10-16 | Package captures as WACZ and evaluate its signing/verification format | Confirm specification reuse terms before implementation. A signature proves package integrity/origin, not the truth of captured content. Record local trusted timestamps separately. |
| [Browsertrix Crawler](https://github.com/webrecorder/browsertrix-crawler) | [AGPL-3.0-or-later](https://github.com/webrecorder/browsertrix-crawler/blob/main/LICENSE); TypeScript; pushed 2026-08-27 | Optional high-fidelity capture container | Docker/Brave/Puppeteer footprint and AGPL obligations make it an optional service, not the default embedded browser. |

The capture pipeline should save, at minimum: requested URL, final URL, UTC timestamps, request/response headers where lawful, content bytes or WARC record, screenshot, extracted readable text, content hash, capture tool/version, case/run/user identity, and later derivations. Link previews should render sanitized local data, not execute arbitrary remote HTML inside the privileged dashboard.

## Skills, plugins, MCP, and AI-agent orchestration

| Project / specification | License / activity | What to adopt | Gap or constraint |
| --- | --- | --- | --- |
| [Agent Skills specification](https://github.com/agentskills/agentskills) | Code [Apache-2.0](https://github.com/agentskills/agentskills/blob/main/LICENSE), docs CC BY 4.0; primary language Python; pushed 2026-08-09 | `SKILL.md` plus optional scripts, references, and assets; progressive loading; portable skill bundles | Instructions are untrusted content. Bundled scripts elevate a skill into an executable plugin and require capabilities/approval. |
| [OpenAI Plugins examples](https://github.com/openai/plugins) | No root license; each plugin must be checked; primary language JavaScript; pushed 2026-08-28 | Study manifest composition for skills, agents, commands, apps, and MCP | Do not copy a plugin without its own explicit compatible license. |
| [Anthropic Skills](https://github.com/anthropics/skills) | Mixed per directory; many Apache-2.0, document skills are source-available rather than open source; primary language Python; pushed 2026-09-03 | Study examples and cross-client skill patterns | License must be resolved skill-by-skill; examples are not a trusted marketplace by default. |
| [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol) and [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) | Licensing is transitioning from MIT to Apache-2.0 with docs under CC BY 4.0; primary language TypeScript; pushed 2026-09-04 | Standard tool/resource/prompt contract over stdio or authenticated Streamable HTTP | MCP explicitly does not enforce its consent principles. The host must approve tools, constrain roots, validate origins/auth, and treat tool descriptions as untrusted. See the [official security principles](https://modelcontextprotocol.io/specification/2025-06-18/index). |
| [OpenAI Agents SDK for JavaScript](https://github.com/openai/openai-agents-js) | [MIT](https://github.com/openai/openai-agents-js/blob/main/LICENSE); TypeScript; pushed 2026-09-02 | Evaluate handoffs, guardrails, tracing, and streaming for API-backed agents | Do not bind the durable case model to an OpenAI-specific run object; this does not provide Codex CLI subscription access. |
| [LangGraph](https://github.com/langchain-ai/langgraph) | [MIT](https://github.com/langchain-ai/langgraph/blob/main/LICENSE); Python/TypeScript ecosystem; pushed 2026-09-03 | Evaluate durable, interruptible research workflows and human approval checkpoints | Framework state is not the system of record; map every event into the case event log. |
| [Pydantic AI](https://github.com/pydantic/pydantic-ai) | [MIT](https://github.com/pydantic/pydantic-ai/blob/main/LICENSE); Python; pushed 2026-09-04 | Strong candidate in the Python worker for typed, provider-neutral agent/tool outputs | Adds a Python orchestration dependency; CLI-backed providers still need custom adapters. |
| [Extism](https://github.com/extism/extism) | [BSD-3-Clause](https://github.com/extism/extism/blob/main/LICENSE); Rust/host SDKs; pushed 2026-09-02 | Prototype a WebAssembly boundary for third-party deterministic transforms | WASM only limits capabilities that the host refuses to expose. Network, filesystem, secrets, and case-data access still need a manifest and policy. |
| [Pluggy](https://github.com/pytest-dev/pluggy) | [MIT](https://github.com/pytest-dev/pluggy/blob/main/LICENSE); Python; pushed 2026-09-01 | Lightweight hook system inside the trusted Python worker | It is extensibility, not isolation. Never execute unreviewed marketplace code in-process. |

### Codex CLI, Claude Code, and optional APIs

The user's subscription-first requirement is technically supportable as local CLI adapters, but the application should not redistribute either provider's credentials or read their token stores.

- [Codex CLI](https://github.com/openai/codex) is Apache-2.0. OpenAI documents both [ChatGPT subscription sign-in and API-key sign-in](https://developers.openai.com/codex/auth/). `codex exec --json` emits JSONL events and reuses saved local CLI authentication, according to the [non-interactive mode documentation](https://developers.openai.com/codex/noninteractive/). The adapter should launch the user's installed CLI, parse JSONL, pass an isolated case workspace, select the least-capable sandbox, and never copy `auth.json`.
- Anthropic documents Claude Code login with a Claude Pro or Max subscription in its [setup guide](https://docs.anthropic.com/en/docs/claude-code/getting-started). Its [CLI reference](https://docs.anthropic.com/en/docs/claude-code/cli-usage) supports `claude -p`, `--output-format stream-json`, model selection, turn limits, allowed/disallowed tools, and permission modes. Treat Claude Code as a user-installed external dependency; its public repository does not provide a root open-source license for the CLI distribution.
- Optional API adapters should implement the same streaming contract. API keys belong in the operating-system credential store, never in case files, plugin settings, prompts, logs, or exported evidence packages.

Minimum provider-adapter contract:

```text
capabilities() -> models, tools, streaming, resume, sandbox modes
start(caseContext, prompt, policy) -> runId + event stream
approve(runId, actionId, decision)
cancel(runId)
resume(runId, prompt)
```

Normalize provider events into application-owned events such as `agent.message.delta`, `agent.tool.proposed`, `agent.tool.started`, `source.captured`, `artifact.created`, `claim.proposed`, `approval.recorded`, `run.completed`, and `run.failed`. This is what makes switching models during a case possible without losing history.

## Recommended composition

```text
Electron desktop / Web client / future mobile client
                    |
         typed application command API
                    |
    Case core: SQLite + FTS + append-only event log
       |              |                 |
  graph/timeline   evidence store   agent run history
       |              |                 |
  job and policy engine with per-case approval mode
       |              |                 |
 Python workers   browser/capture    AI provider adapters
       |              |            /        |         \
 OSINT modules   Playwright+WARC   Codex CLI Claude CLI APIs
                    |
       Skills / MCP / isolated plugin runtimes
```

### Core choices to prototype first

1. **Case and evidence model.** The application owns the SQLite database with FTS5, append-only events, immutable source artifacts, derived claims, entity/relationship assertions, confidence, and explicit investigator judgments. Borrow vocabulary and normalization ideas from FollowTheMoney and Nomenklatura.
2. **Desktop/web UI.** Use a shared TypeScript/React dashboard. Electron is the Windows/Linux shell. Keep researched pages in a separate sandboxed session/process from the local dashboard.
3. **Graph.** Prototype Cytoscape.js first. Run the same representative dataset through Sigma.js/Graphology before committing to large-case performance claims.
4. **Timeline and maps.** Use vis-timeline and MapLibre. Store UTC plus original timezone and precision; keep map providers separate from the rendering library.
5. **Capture.** Use Playwright for visible, user-observable research; Readability for previews; warcio.js/WACZ for preserved captures; screenshots and hashes as separate artifacts.
6. **Collection.** Use a managed Python worker with a narrow JSON-RPC/job protocol. Start with passive, low-risk adapters for SpiderFoot output, Sherlock/Maigret, and passive domain enumeration. Every adapter declares sources, network behavior, required secrets, legal/policy class, and output schema.
7. **AI.** Use a provider-neutral run/event model. Add user-installed Codex and Claude CLI adapters, then optional direct APIs. Model choice and custom instructions are per-case configuration snapshots attached to each run.
8. **Extensions.** Use portable Agent Skills for instructions; MCP for out-of-process tools; WASM or a strongly sandboxed subprocess/container for third-party executable plugins. A plugin library is curated metadata, not permission to auto-execute downloaded code.

### Per-case autonomy modes

The requested three modes can share one policy engine:

| Mode | Behavior | Required control |
| --- | --- | --- |
| Suggest | Agent proposes searches/tools and waits for approval before each action | Default for new cases and sensitive-person cases |
| Preapproved | Agent may run tools explicitly allowlisted for the case, within source, cost, rate, and target limits | Visible live activity, cancellation, budgets, and complete audit events |
| Autonomous | Agent may choose among a broader approved set until a goal/budget boundary is reached | Never means unrestricted; destructive, active-scan, credential, paywalled, biometric, high-risk personal-data, and external-write actions still require separate approval or remain prohibited |

## Safety, privacy, and evidentiary requirements

- Model observations, inferences, hypotheses, and investigator-confirmed facts as different record types. Never turn an AI summary into evidence.
- Require every graph edge and summary sentence to resolve to one or more captured source observations. Display contradictory sources and uncertainty.
- Treat username, email, phone, face, and location matches as candidate links until a human resolves them. Similarity is not identity.
- Missing-person cases require stricter defaults for minors, victims, medical information, home addresses, and live location. Minimize display/export and support redaction.
- Do not create or automate deceptive accounts. Support only user-owned account profiles, lawful authentication handoff, and source-access policies.
- Do not probe password-recovery flows, buy or ingest illicit credential dumps, bypass blocks, solve CAPTCHAs for evasion, or hide automation identity.
- Separate passive OSINT from active security testing. Active DNS brute force, port scanning, vulnerability checks, and authenticated collection require explicit target authorization and a cyber-specific policy.
- Give the live browser an obvious case/run indicator, action log, pause/stop control, and a preview of proposed navigation or form submission when approval is required.
- Preserve originals. OCR, transcription, translation, EXIF parsing, summaries, and entity extraction are derived artifacts with tool/model versions and reproducible parameters.
- Run imported files and remote content as hostile. Apply size/time/memory limits, MIME verification, antivirus hooks, sandboxing, and no automatic execution of attachments.

## Capability gaps the project must own

No reviewed repository supplies these as an integrated open component:

1. A general case ontology that spans missing persons, crime research, cyber, financial, corporate, journalism, and user-defined case types without implying guilt.
2. A provenance graph linking source bytes, extraction runs, observations, entity-resolution judgments, derived claims, summaries, and reports.
3. A unified searchable history of user edits, browser activity, agent reasoning outputs safe to retain, approvals, tool calls, and case changes.
4. A local-first sync model that can later support secure team/web/mobile access without leaking sensitive cases.
5. A provider-neutral adapter layer that combines Codex/Claude subscriptions with optional APIs and preserves continuity when models change.
6. A permissioned plugin/skill marketplace with signing, review status, version pinning, revocation, capabilities, isolated execution, and reproducible installs.
7. A source governance registry with jurisdiction, terms, credentials, rate limits, personal-data class, retention, attribution, and allowed autonomy modes.
8. Evaluation datasets for false identity links, stale data, conflicting timelines, source disappearance, OCR errors, and AI citation accuracy.

"All kinds of cases" should therefore mean an extensible case platform and templates, not a claim that every investigation type or source is complete at launch.

## License and adoption decisions

| Disposition | Projects / patterns | Reason |
| --- | --- | --- |
| Adopt or prototype as direct dependencies | Electron, better-sqlite3, Cytoscape.js, MapLibre, vis-timeline, Playwright, Readability, warcio.js, libphonenumber, Octokit | Permissive licenses and direct fit with an Electron/TypeScript core |
| Adopt in a managed Python/media worker | FollowTheMoney concepts, Nomenklatura, Sherlock/Maigret adapters, Tesseract, Tika or Unstructured, ExifRead | Strong existing ecosystems; isolation keeps heavy/native dependencies out of Electron renderers |
| Define as interoperability standards | Agent Skills, MCP, WARC/WACZ, JSON/CSV/GraphML exports | Reduces lock-in and enables a library ecosystem |
| Evaluate as optional services or user-installed tools | SpiderFoot, Amass, Subfinder, PhoneInfoga, Browsertrix, selected CTI services | Useful but their scope, dependencies, licenses, or active-network behavior require policy boundaries |
| Reference; do not copy without a deliberate license decision | OGI, LinkScope, IntelOwl, BBOT (AGPL); theHarvester/GPL and PhoneInfoga/GPL; PANO/CC BY-NC; proprietary OSINTBuddy desktop | Copyleft, noncommercial, mixed, or proprietary terms may conflict with the intended distribution model |
| Reject from default product scope | Fake-account creation, credential/recovery probing, illicit breach data, access-control bypass, evasion, unrestricted active scanning, automated guilt/threat predictions | Legal, safety, privacy, and reliability risks outweigh product value |

Before implementation, create a machine-readable dependency and connector inventory that records exact version/commit, code license, data license, source terms, network behavior, secrets, executable capabilities, distribution method, and approval class. Recheck this inventory on every release; licenses and upstream behavior can change.
