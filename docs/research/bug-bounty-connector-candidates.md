# Bug bounty connector candidates

**Research snapshot:** 2026-10-15
**Status:** Candidate assessment for planning. No adapter has been implemented or integration-tested by this research.
**Method:** Official API documentation, upstream tool documentation, and upstream license files only. No scanners were run and no program targets were contacted.

## Recommended release boundary

Support bug bounty as a Cyber Case workflow: preserve the program brief and scope version, organize assets and observations in the graph, track hypotheses and reproduction evidence, and prepare a report with cited artifacts. The Case workflow and local import/export can be bundled. Credentialed platform adapters and installed security tools belong in the maintainer-managed Verified catalog. The recommendations below concern admission candidates; “Verified candidate” does not claim that project verification has already passed.

The engine must distinguish three activities: processing existing artifacts locally, asking third-party intelligence providers, and contacting program targets. A tool advertising passive scanning can still contact targets through discovery or crawling.

## Candidate matrix

| Candidate | Verified upstream capability and license | Proposed catalog position | Required qualification |
| --- | --- | --- | --- |
| Program brief / scope snapshot and report artifact import | Project-owned import of user-provided files or captured pages; original rules remain evidence | Bundled capability, planned | Normalize domains, URLs, IP ranges, exclusions, permitted methods, dates, and manual exceptions without claiming that a public listing authorizes every action |
| HackerOne researcher adapter | Researcher API lists programs, structured assets and exclusion categories; supports report reads and creation. Proprietary service, not redistributable data access. [Resources](https://api.hackerone.com/hacker-resources/) | Verified candidate; read/import first | Researcher credentials; preserve program policy as well as structured scope; test pagination and permissions before declaring supported |
| Bugcrowd adapter | Official API describes program/brief/target imports; tokens authorize according to user role. [Usage](https://docs.bugcrowd.com/api/usage/), [authentication](https://docs.bugcrowd.com/api/getting-started/) | Verified candidate for entitled accounts; manual brief capture first | Researcher-wide API availability was not established. Do not promise an ordinary researcher token can enumerate every engagement |
| Intigriti researcher adapter | Official researcher API queries programs and activity with token authentication; documentation still labels V1 beta. [Official introduction](https://kb.intigriti.com/en/articles/8529303-intigriti-researcher-api) | Verified candidate, subject to beta compatibility tests | Pin schema assumptions; retain manual import and detect unavailable fields instead of inventing rules |
| subfinder | Passive subdomain discovery through external providers; optional active resolution mode; JSONL and source attribution. [Usage](https://docs.projectdiscovery.io/opensource/subfinder/usage); [MIT license](https://raw.githubusercontent.com/projectdiscovery/subfinder/dev/LICENSE.md) | Optional Verified tool adapter | Disable active resolution in passive preset; source/provider credentials and terms vary; discoveries are leads pending scope evaluation |
| ProjectDiscovery httpx | Sends HTTP probes; JSONL and request/response evidence; IP allow/deny, request-rate, and redirect controls. [Usage](https://docs.projectdiscovery.io/opensource/httpx/usage); [MIT license](https://raw.githubusercontent.com/projectdiscovery/httpx/dev/LICENSE.md) | Optional Verified target-contacting adapter | Explicit scope input, program request budget, controlled redirects, output redaction and bounded retention |
| Nuclei | Template-driven scanning, template selection/exclusion, signed-template enforcement, rate controls, JSONL/SARIF evidence, optional OAST. [Running guide](https://docs.projectdiscovery.io/opensource/nuclei/running); [MIT engine license](https://raw.githubusercontent.com/projectdiscovery/nuclei/dev/LICENSE.md) | Optional Verified adapter with maintainer-reviewed template allowlist | Pin engine and reviewed template versions; signatures establish origin/integrity, not suitability for a particular program |
| ZAP | Proxy, passive analysis, spider and active scanning; Baseline emits JSON/XML/HTML and performs a spider before passive analysis. [Baseline](https://www.zaproxy.org/docs/docker/baseline-scan/); [Apache-2.0 license](https://github.com/zaproxy/zaproxy/blob/main/LICENSE) | Optional Verified external runtime; import reports before automation | Java/container footprint and add-on review; separate imported traffic analysis, crawling, and active tests in the UI |

MIT and Apache licenses apply to the examined engines; they do not establish licenses for every dependency, template, add-on, provider dataset, or program artifact. Audit the exact pinned distribution and preserve required notices before shipping it.

## Platform integration findings

### HackerOne

Use the researcher routes, not customer administration endpoints: `GET /v1/hackers/programs`, `GET /v1/hackers/programs/{handle}`, and `GET /v1/hackers/programs/{handle}/structured_scopes`. Asset instructions and submission/bounty eligibility remain separate fields. `scope_exclusions` describes excluded report categories, which are not a substitute for target exclusions. Preserve the complete policy text and review ambiguous restrictions. The API supports `POST /v1/hackers/reports`; proposed release behavior is draft/export followed by an explicit submission action. [Researcher API](https://api.hackerone.com/hacker-resources/)

API Basic authentication uses the generated token identifier/value. Published limits include 600 read requests per minute; use the current write limits, response headers and 429 handling at implementation time. These platform API quotas do not authorize the same request rate against program assets. [Authentication and limits](https://api.hackerone.com/getting-started-hacker-api/)

### Bugcrowd

The documented scope import joins the current brief, target groups and targets. Authentication is role-dependent, and published API traffic is limited to 60 requests per minute per IP. Check versioned schemas and account entitlement before enabling the API adapter. [API usage](https://docs.bugcrowd.com/api/usage/), [access and limits](https://docs.bugcrowd.com/api/getting-started/)

The researcher brief explicitly separates in-scope and out-of-scope targets and contains engagement disclosure requirements. Capture that brief with timestamps when API access is unavailable; this is a proposed app capability, not a claim that Bugcrowd provides a machine export. Researcher report submission should initially use a prepared report and platform handoff because general researcher write access was not established by this review. [Brief details](https://docs.bugcrowd.com/researchers/engagement-management/details/)

### Intigriti

The official help page links both [researcher reference documentation](https://intigriti-researcher-api.readme.io/reference/introduction-to-intigritis-researcher-api) and Swagger. Its beta status makes schema-change handling a release requirement. The reviewed sources establish program/activity reads, not a supported submission-write contract. Start with program import and report export/handoff. [Official help page](https://kb.intigriti.com/en/articles/8529303-intigriti-researcher-api)

## Execution requirements derived from the tool behavior

These are project recommendations, not claims that upstream tools already enforce the complete Case policy.

- Check normalized host, scheme, port, path and IP rules before each outgoing request; exclusions take precedence. Recheck resolved addresses and redirects. Wildcard discovery does not grant permission to test subsidiaries or unrelated infrastructure.
- Scope changes must invalidate queued target-contacting work until the current program policy is evaluated. Retain the policy snapshot and exact run configuration beside findings.
- Run external tools in an isolated worker/Runner with a bounded workspace, process/resource limits, restricted secrets, controlled egress, and cancellation. A Docker image alone does not enforce program authorization.
- Limit aggregate traffic across subagents, retries, browser work and tools. Per-process caps do not enforce an organization-wide or per-program request budget.
- Keep credentials and session material out of exported reports by default; let users review reproduction artifacts before submission. Report preparation, private platform submission, and public disclosure are distinct actions.

subfinder exposes provider rate limits and an optional `-active` resolution path; the passive preset should avoid the latter and keep provider provenance in JSONL. [Usage](https://docs.projectdiscovery.io/opensource/subfinder/usage)

httpx has IP allow/deny controls and same-host redirect options, but those do not represent path-specific program rules. Its documented default rate is 150 requests/second, unsuitable as a universal product default. [Usage](https://docs.projectdiscovery.io/opensource/httpx/usage)

For Nuclei, select exact reviewed templates, enforce signatures, disable OAST unless the program and user configuration permit it, and restrict execution-capable template features. Template exclusion tags alone cannot guarantee the absence of side effects. [Running guide](https://docs.projectdiscovery.io/opensource/nuclei/running)

ZAP scope and Protected mode restrict dangerous actions. Browser-based features can still load off-domain assets, so configure actual network restrictions separately. Its HTTP rate limiter does not cover WebSocket traffic. [Scope](https://www.zaproxy.org/docs/desktop/start/features/scope/), [off-domain browser traffic](https://www.zaproxy.org/faq/why-does-zap-access-out-of-scope-domains/), [rate limiting](https://www.zaproxy.org/docs/desktop/addons/network/options/ratelimit/)

## Deferred claims and release evidence

Defer automatic public disclosure, unrestricted template execution, generic autonomous exploitation, and claims of comprehensive program API coverage. First ship scope-aware planning, passive research, imports, evidence organization, and report drafting. Add controlled target-contacting execution through the approved Cyber workflow as each adapter passes qualification.

Before calling an adapter Verified, demonstrate it against local fixtures and explicitly authorized test services: malformed/stale scopes, exclusion precedence, redirect and DNS changes, rate sharing, permission failure, pagination, interrupted runs, secret redaction, false-positive handling, and report provenance. No such integration tests were conducted for this research.
