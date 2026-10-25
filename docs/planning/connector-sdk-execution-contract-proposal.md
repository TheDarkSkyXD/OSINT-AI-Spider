# Connector SDK and execution contract

Status: approved planning decision. On October 25, 2026, the user selected all four recommendations covering the portable authoring contract, cache and retry defaults, guided runtime setup, and compatibility and maintenance. No SDK or sandbox implementation is present in this repository.

Decision: [Define the Connector SDK and source execution contract](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/25).

Evidence: [execution constraints](../research/connector-sdk-execution-constraints.md), checked against primary documentation on October 25, 2026. That research establishes limitations and qualification requirements, not successful runtime integration.

## Existing constraints

The [approved catalog](initial-connector-catalog-proposal.md) defines 33 target adapters, individual exact-version admission, visible source coverage, optional active-cyber tools, and no silent provider substitution. The [extension decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/11) fixes isolated execution, immutable versions, Case grants, credential aliases, and host-owned policy. Installation grants no authority.

The [lifecycle decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/20) fixes durable operation IDs, attempt leases, checkpoints, stale-attempt rejection, and retention of permitted late captures. The [provenance decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/14) requires preserved originals, exact-version citations, explicit capture limits, and human acceptance of Findings. These are constraints, not new questions.

## Approved contract and responsibility boundaries

Use the following portable, host-mediated contract, with one schema source and a first-party TypeScript authoring SDK. Other languages and existing tools use the documented worker bridge. They do not need to be rewritten in TypeScript. A separate Python authoring SDK is deferred until demand justifies maintaining it.

### Alternatives considered

Three concrete shapes were considered before selecting the proposed contract:

1. A Connector receives an in-process application object, fetches data, and writes Case records directly. It is convenient for authors but cannot satisfy the approved isolation or authoritative-write boundaries.
2. Every Connector is a standalone service with its own credentials, persistence, retries, and authorization endpoints. It supports many languages but duplicates policy and introduces independent Case writers. A remote service may still be an approved Source adapter; it cannot become a second Case authority.
3. A Connector runs as a bounded worker, requests named host capabilities, and returns typed output batches. The host authorizes each action, brokers access, and commits accepted output. This is the selected shape.

### Manifest

Use one machine-readable schema source for manifests, wire messages, input types, output types, and error variants. Generate authoring types and protocol documentation from it. The encoding is JSON with [JSON Schema 2020-12](https://json-schema.org/draft/2020-12). Binary content travels through bounded Artifact transfer handles rather than inline JSON. Schema validation checks message shape; explicit Domain and broker checks enforce permissions, destinations, scope, budgets, and valid references.

The manifest includes the already approved publisher, immutable version, package and manifest digests, signature, dependency lock, licenses, source terms, maintenance owner, capabilities, platform claims, and compatibility requirements. Add the following execution details:

- Named operations with input and output schema identifiers and versions.
- Declared Source classes, destination rules, HTTP operations, redirect behavior, and data-disclosure fields.
- Required and optional credential aliases, approved authentication profiles, and entitlement checks. No secret values.
- Runtime, operating-system, architecture, executable and model digests, resource limits, and supported isolation profile.
- Pagination and checkpoint formats, retry classification, cost units, rate-limit scope, capture limits, cache rules, and retention restrictions.
- Synthetic fixtures, negative cases, live-health method, and whether that method uses credentials, discloses data, or incurs a charge.

Manifest permissions are a ceiling. The effective Case grant and current policy may narrow them further. Unknown executable capabilities or required protocol features prevent dispatch.

### Caller and message sketch

The investigator approves a Research plan. The host freezes the selected package and operation, validates input references and permissions, then dispatches one operation to an eligible Runner. The Connector never receives a whole Case merely because the run belongs to that Case.

The wire contract has these message families:

- `start` identifies the protocol version, Connector digest, operation name, Research run, Execution attempt, host-issued operation ID, input object versions, approved configuration, limits, and an opaque capability handle.
- `capability-request` asks for a declared network, file, browser, tool, or Artifact-transfer operation. A request ID identifies an exact request body. Reusing it with different data is a protocol error. An opaque handle does not authorize an arbitrary destination.
- `output-batch` carries a stable batch ID, sequence, verified Artifact-transfer references, typed Observations, source assertions, discovery lineage, capture limitations, and a proposed checkpoint.
- `ack` reports the durable acceptance or explicit rejection of a batch. Only the host can acknowledge a Case commit.
- `progress` carries bounded public status and usage hints. Broker measurements remain authoritative for budgets and billing.
- `finish` reports a complete, partial, or no-results outcome and its coverage. `failure` reports a typed error and the last acknowledged batch. Both remain distinct from the Research run lifecycle.
- Host controls stop new actions, request a safe pause or cancellation, and revoke an attempt. Emergency stop revokes capabilities before process termination.

These names define the planned protocol. They are not callable APIs already shipped by the product. The process adapter uses bounded framed messages over inherited private pipes. A remote Runner uses authenticated encrypted transport carrying the same application contract. Neither exposes a general remote shell.

Reject oversized frames, unbounded nesting, invalid sequence transitions, unknown required message variants, and output beyond the remaining limit. Separate protocol frames from bounded diagnostic logs. A worker crash or absent final message does not erase earlier acknowledged batches.

### Output acceptance

The host stages Artifact bytes, verifies their size and digest, validates references and current retention permission, then atomically commits each accepted batch, its Observations, Collection records, history entry, acknowledgement record, and resumable position. This follows the approved persistence transaction boundary.

The host supplies trusted collection times and execution identity. The Connector reports provider timestamps and extraction assessments with their origin. Outputs identify the original Source, Connector and external-tool versions, input origin, query or safe request reference, and exact Artifact spans where available. Logs and provenance must not preserve raw authorization headers or secret-bearing URLs.

A repeated batch ID with identical content returns its existing acknowledgement. Different content under that ID is rejected. Deduplication of delivery must not collapse separate real-world collections or new collection times merely because response bytes match.

No Connector can accept a Finding, establish identity, silently assert a real-world Relationship from discovery adjacency, or modify membership. Proposed Pivots return to the host for evaluation within the current plan. Unsupported output types are reported and retained as permitted raw material rather than silently converted into invented domain facts.

Typed errors distinguish setup required, runtime missing, access restricted, rate limited, Source unavailable, Source changed, invalid output, incompatible protocol, policy denied, budget exhausted, canceled, and internal failure. An error includes its safe reason, affected operation, acknowledged-output position, coverage gap, and recovery hint. The host decides whether recovery is permitted and maps the error to the existing run and catalog states. No results is a successful completed query without matches. A partial outcome identifies both collected coverage and omitted work.

### Ownership and placement

The ownership map describes planned code responsibilities. It does not create these source directories yet.

- Shared contracts own schemas, wire-safe values, generated types, and conformance fixtures.
- Domain owns manifest semantics, effective grants, permitted state transitions, scope decisions, budget rules, output acceptance, and user-facing outcome meaning.
- Capability ports expose bounded execution, network, secrets, files, browser, tool, and persistence operations in application-owned terms.
- Runtime and provider adapters implement those ports using WASM engines, operating-system isolation, browser runtimes, provider APIs, or external executables.
- Transport validates pipe, IPC, HTTP, and worker messages and maps them to Domain commands. It owns framing and delivery, not Case policy.
- Composition roots wire the local host, attached Runner, and private managed workers. UI renders setup, progress, coverage, and errors through typed clients.

Domain imports contracts and ports. Concrete adapters import the ports they implement. UI never imports the SDK's privileged host adapters. Source-import boundaries become part of the normal lint gate when the implementation creates JavaScript or TypeScript packages.

## Approved freshness, caching, and retry defaults

Use a transparent cache within the same Case when the Source permits reuse and the entry is within its declared freshness window. Show the original collection time, cache use, and coverage. Offer an explicit fresh collection when policy and budgets permit it. Missing or unclear cache permission disables reusable response caching.

Cache keys include Case identity, Source and endpoint, normalized query, representation, credential principal and entitlement scope, and relevant Connector or parser versions. Different Cases, accounts, permissions, or paid entitlements never share reusable results by default. Provider validators and cache headers further constrain reuse. Authentication and authorization checks still run on a cache hit.

A cache hit references the earlier collection; it does not invent a new source observation time. Revalidation records its actual check time separately. A cache is disposable processing storage. Preserved Case evidence follows the separately approved capture and retention rights, and an HTTP cache directive alone does not grant those rights. Deletion propagates to cache and derived copies.

Default to at most one automatic retry after the initial request, and only for operations declared and verified safe to repeat within the approved plan. Do not automatically repeat a failed automatic retry. Every attempt consumes the same remaining request, time, byte, and cost budgets. Honor provider backoff and `Retry-After`; if the delay exceeds the dispatch window, enter Waiting rather than repeatedly sending requests.

Authentication failures, permission errors, scope changes, unsupported schemas, and policy restrictions do not trigger blind retries. Active probes and ambiguous paid requests require a known-safe recovery rule; otherwise pause for review. Retrying accepted Case writes is idempotent. Repeating an upstream request can still incur another charge or produce different content, so the product makes no exactly-once external-traffic promise.

Rate accounting covers the provider account, destination, Organization or device, Case, run, and operation as applicable. Parallel child agents and retries consume their parent's remaining budget. Several Runners using the same credential alias need shared quota accounting. Independently configured devices cannot promise a global provider quota unless they coordinate; use a dedicated credential or conservative allocation and honor provider limits.

## Approved optional runtimes and external tools

Offer guided setup with detected runtime versions and project-verified installation artifacts where the platform supports them. Show download size, license, permissions, platform support, and resource requirements before installation. Otherwise provide checked manual setup instructions. Installing a runtime never enables a Case grant.

There are two execution classes under the same contract. Deterministic processors use capability-restricted WASM where practical. Provider, browser, and native-tool adapters run outside the UI and Case store under a verified operating-system isolation profile. A process boundary, temporary directory, or language permission flag alone is insufficient proof of isolation.

All runtime and executable dependencies are pinned and reviewed. Installation is a separate host operation using the existing signed-package and supply-chain rules. Connectors cannot download a latest tool, execute an undeclared install script, or resolve new dependencies during a Research run. Missing or incompatible runtimes show Runtime missing with an actionable reason.

The host network broker enforces approved destinations, DNS and resolved-address policy, redirect checks, allowed methods, disclosures, quotas, and secret injection. It never forwards authentication to a different origin merely because a response redirects there. Browser traffic, subresources, downloads, service workers, WebSockets, and tool-originated traffic must remain within the adapter's verified controls.

Browser sessions use separate host-owned profiles and named session handles. Sessions do not expose cookies, tokens, passwords, arbitrary desktop APIs, or general-purpose scripting capabilities to a Connector. A login or verification step may pause for the user under the approved account policy. Authenticated pages themselves remain untrusted captured material.

An external tool receives fixed executable identity, validated argument arrays, selected input handles, a private temporary workspace, resource limits, and bounded output. It cannot inherit the user's shell environment or credentials. Its complete process tree must be covered by stop controls and its network path by scope enforcement.

Some tools expect plaintext API keys or make direct connections that a host cannot adequately constrain. They are not admitted by exception. A reviewed host adapter must provide a compatible credential and network path without exposing raw secrets to extension code, or that exact tool/platform combination stays unavailable and offers an import alternative. The 33-candidate target is not a guarantee that every tool works on every host.

An attached Runner cannot continue new operations without current host authority. Losing the control channel stops new dispatch and moves the run to Waiting under its execution-lease rules. Stale attempts cannot commit changes. Permitted late captures return through the host's separate reconciliation path; they do not restore a revoked lease or authorize more actions.

## Approved compatibility and maintenance

Publish an explicit SDK compatibility matrix and support each protocol major for at least 12 months after its successor becomes generally available. Block unsupported dispatch with an explanation. A security, legal, or Source-policy suspension overrides the support window. This window covers the contract, not an external provider's continued availability.

The host negotiates a declared supported protocol version and required feature set before dispatch. Additive optional metadata may be ignored only where the schema explicitly permits it. Unknown permissions, actions, mandatory features, and semantic enum values fail closed. A manifest version, wire protocol version, Observation schema version, and package version remain separate identifiers.

Cases remain pinned to their approved Connector versions. Compatibility adapters preserve old contract semantics; they cannot silently relabel an old payload or replace package code. Upgrading a Connector requires the existing exact-version review rules. Updating a host does not authorize new data disclosure or executable behavior. Historical manifests and output remain readable after execution support ends.

Each exact platform/runtime build needs an identified owner and conformance record. The admission suite covers manifest and signature verification, permissions, provenance references, parser fixtures, schema drift, malformed output, duplicate delivery, interrupted uploads, stale attempts, budgets, cancellation, credential leakage, active-scope boundaries, and platform isolation. Live checks remain separate from deterministic fixtures.

The default maintenance plan uses inexpensive unauthenticated checks daily where permitted, after releases, and after reported failures. Authenticated or paid live checks require an explicit configured health-check account, disclosure allowance, and budget. They must not silently spend an investigator's key or repeatedly probe a program target. The manifest records the safe cadence when daily checks are unsuitable.

Health has separate dimensions for package integrity, runtime readiness, Source availability, authentication, entitlement, and compatibility. A user's expired credential affects that configuration rather than globally suspending the provider. A parser or Source change suspends affected exact versions when output validity cannot be established; other Connectors remain usable. No results from a successful query is not a failed health check.

## Failure cases the implementation must prove

- A response commits, but its acknowledgement is lost. Replaying its batch returns the same accepted records without duplicate history.
- An attempt dies after an external request but before a durable capture. Recovery reports that gap and applies the safe-repeat rule before making another request.
- Three pages commit before page four fails. The run preserves those captures, reports partial coverage, and resumes only from a supported acknowledged checkpoint.
- A page redirects an active-cyber check outside approved scope. The network adapter denies the next request and records the omitted target.
- A child process ignores cancellation. Its operation capabilities are revoked, the process tree is terminated, and the host rejects stale mutations.
- A canceled request returns permitted evidence. Reconciliation records a late capture without restarting Pivots or accepting a Finding.
- A paid provider times out after accepting a query. An ambiguous outcome does not automatically charge for another request.
- A provider key expires. The UI shows Setup required or Access restricted with a reason, rather than No results.
- A user opens another Case with the same query. The cache does not reveal the first Case's material.
- A Windows runtime cannot enforce an adapter's network grants. That build remains unavailable; a Linux or dedicated isolated Runner is offered only when supported and explicitly configured.
- A service worker or native child attempts a connection that bypasses request interception. The isolation and egress gate must still block it, or admission fails.
- A suspended Connector's old output is opened. Its historical provenance and captures remain readable under current Case access and retention rules.

## Decision boundary

All four choices are approved. SDK decision questions remaining: 0. This resolves the planning ticket. It does not admit any adapter or prove these controls are implemented.

Implementation must publish complete schemas, generated SDK documentation, platform-specific isolation evidence, and executable conformance results before claiming compatibility. Concrete sandbox engines, installer technology, framing libraries, numerical resource limits per adapter, and hosting vendors are implementation selections constrained by this contract.
