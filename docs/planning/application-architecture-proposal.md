# Application architecture and build toolchain

Status: approved planning decision. On October 25, 2026, the user selected all five recommendations for the core stack, mobile framework, browser-local entry, repository split, and build/enforcement approach. Implementation and platform qualification remain ahead.

Decision: [Choose application architecture and build toolchain](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/26).

Evidence: [client and toolchain constraints](../research/application-client-toolchain-constraints.md), [host and storage constraints](../research/application-host-storage-constraints.md), and the [approved Connector SDK contract](connector-sdk-execution-contract-proposal.md).

## Fixed requirements and current repository

The repository contains planning and research artifacts, with no application package manifest, application source tree, or existing framework to migrate. Untracked historical planning files are outside this change. The root glossary remains the source of domain vocabulary; package names below describe implementation responsibilities rather than new domain terms.

The [deployment ADR](../adr/0001-local-first-clients-with-private-managed-cloud.md) fixes open-source clients and local runtime, free accountless local Cases, one authoritative host per Case, and a private project-operated paid managed backend. The [platform decision](platform-capability-parity-proposal.md) requires web/Electron feature parity, Windows/Linux Electron, and usable selective mobile features. Accountless mobile Cases need local encrypted persistence; mobile does not execute arbitrary tools or CLI subscriptions.

The approved storage decision fixes encrypted local SQLCipher databases with separately encrypted Artifacts and managed PostgreSQL with private object storage. The approved SDK fixes isolated workers, language-neutral wire contracts, host-owned grants, immutable versions, typed Observations, and authoritative output acceptance. This proposal does not reopen those decisions.

## Competing architecture sketches

Three materially different core designs were considered:

1. Shared TypeScript Domain, Node application hosts, and a narrow Rust platform executable. React clients reuse contracts and presentation logic. Native details stay behind ports. This concentrates product rules in one language while adding a small native build pipeline. It is the selected architecture.
2. Rust Domain and application host, with React clients and generated bridge contracts. This concentrates native ownership and could share a qualified core with mobile. It adds native/WASM integration wherever executable rules must run in a JavaScript client. No measured performance or security advantage has been established for this product.
3. Python/FastAPI Domain and host, with React clients and bridged specialist tools. It aligns with many OSINT libraries, but adds Python application distribution and a separate path for accountless mobile authority. Python remains useful for isolated existing tools without owning the whole product.

These are design sketches, not benchmarked prototypes. Framework popularity and a working hello-world do not prove the required encryption, process isolation, recovery, or mobile behavior.

## Approved core architecture and stack

Use React and TypeScript with Vite for the web application and Electron renderer, a shared framework-independent TypeScript Domain, Node/Fastify application hosts, and a narrow Rust platform executable for native integration.

### Client and host separation

Build the web application as a client of application-owned commands and queries. The same web workspace and views run in Electron and in a browser. Use platform adapters for file selection, local-host startup, native dialogs, and approved downloads; do not fork the Case workflow for desktop.

Electron uses sandboxed renderers, context isolation, disabled Node integration, restricted navigation, a restrictive content-security policy, and IPC sender validation. Preload exposes separate allowed methods, never generic IPC forwarding. Package reviewed local content under a qualified application protocol; do not load untrusted evidence as privileged application content.

Vite is selected because the investigation workspace needs a reusable client bundle while the application host owns durable work. A Next.js application with an explicit local server is viable, but adds a framework server to the desktop/local-browser path. Static Next.js export cannot preserve server-dependent features by itself. Public marketing pages may use a different framework later without changing Case authority.

The TypeScript Domain owns Case invariants, truth and review states, permissions, plan and run transitions, policy decisions, and accepted mutations. It imports application-owned contracts and capability ports. It does not import React, Fastify, Electron, Expo, Node APIs, SQL drivers, or provider SDKs. Mobile can run these pure rules for its own local Cases. Managed authorization always runs on the managed host, even when a client has the same code.

Use modular local and managed application hosts rather than a service for every feature. Research execution already requires separate worker processes for isolation and lifecycle reasons. That separation does not require separate distributed services for Claims, Entities, Reports, or every Connector. A later extraction needs evidence of a scaling or ownership constraint.

### Platform executable and persistence

The Rust executable provides the reviewed SQLCipher bridge, OS credential-store integration, and platform process-control operations. It does not become a second Domain or decide which research is authorized. Node retains ordinary orchestration, file operations, and trusted adapter work that needs no native binding.

Keep the Rust interface versioned, validated, bounded, and private to the trusted host through inherited pipes or an equivalently authenticated local channel. Expose reviewed operations and handles rather than a general shell, arbitrary SQL endpoint, or unrestricted file path. Validate process identity and message limits. A separate process or the Rust language alone is not extension containment.

The initial desktop SQLCipher binding candidate is rusqlite with explicitly selected SQLCipher and crypto linkage. The first packaging gate must prove it on the intended Windows/Linux builds. Ordinary bundled SQLite is not an encrypted substitute. An incompatible binding may be replaced behind the same storage port; encryption and recovery requirements cannot be weakened to make a build pass.

Define storage ports around whole Case operations and their transaction boundary. SQLCipher and PostgreSQL use separate SQL, migrations, isolation handling, and search adapters. The same semantic fixtures must pass on each engine. A bridge operation must retain the same database connection and transaction for an atomic Case commit. Do not turn a multi-statement transaction into unrelated per-statement pipe calls.

Artifact staging, digest verification, ready references, history, and operation acknowledgements follow the existing persistence protocol. Encryption of database pages does not encrypt external Artifacts, exports, previews, or temporary files. Protect those copies separately. Keep secrets and keys inside qualified trusted components, with none in renderer state, extension inputs, logs, or exports.

### Client protocol and durable execution

Use versioned JSON commands and queries over HTTPS for managed use, same-origin loopback HTTP for the local browser entry, and restricted IPC for Electron's local bridge. Generate client contracts from the approved schema source. Keep binary uploads separate and bounded. Application commands include operation IDs and expected versions; responses expose accepted versions and safe typed errors.

Durable cursor-based catch-up is authoritative for live changes. Server-sent events may reduce latency where supported; reconnect and mobile adapters can use catch-up or bounded polling. A live socket is not the record of truth. Uploads and command delivery can resume without creating duplicate accepted mutations.

Fastify receives only project-reviewed schemas. Its normal schema compilation must not execute imported Case or extension schemas. Configure and qualify JSON Schema 2020-12 validation and response serialization explicitly rather than assuming its default Draft 7 examples satisfy the SDK contract. [Fastify validation](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/), [Ajv schema versions](https://ajv.js.org/json-schema.html)

The public Runner is an execution role, distinct from a Case host. It accepts short-lived scoped work, uses qualified adapters, and returns outputs to the current host. It cannot mint its own grants, make itself a managed Case writer, or copy CLI subscription credentials to the service. A public local host may have local execution capability without turning every installed Runner into an authoritative host.

Managed API instances form one logical Case authority through the approved persistence and fencing rules. Private workers return Case-output batches through that authority. A worker does not get unrestricted Case database writes merely because it can claim a job. Begin with a durable PostgreSQL-backed queue/outbox and scoped job leases; add another queue service only if measured needs justify it.

## Approved mobile framework

Use Expo React Native with project development and release builds for iOS and Android. Share contracts, pure Domain rules, view selectors, design tokens, and conformance fixtures. Build focused native screens rather than embedding the entire desktop workspace in a WebView.

Mobile-local composition binds the shared Domain to qualified native SQLCipher, encrypted Artifact storage, secure key storage, and OS file/capture adapters. Managed composition sends authoritative commands to the service and treats downloaded material as a cache under the existing offline lease. A replica never becomes a local authority accidentally.

Expo Go is not the acceptance environment for encryption or custom native modules. SQLCipher, FTS5, native key custody, encrypted Artifact copies, and import/export must pass on the actual iOS and Android builds. Custom native adapters remain available when a required secure capability is not supplied by a standard Expo module. Do not fall back to plaintext storage or a disposable browser cache for a local Case.

Windows/Linux can support much of JavaScript and Android development. iOS local native builds and Simulator verification need a compatible macOS/Xcode environment; an approved cloud build can produce binaries but does not by itself prove device behavior. Release readiness must provide real iOS build and verification capacity. No iOS or Android compatibility is claimed by this proposal.

Flutter is a viable alternative for a separate mobile UI, with generated contracts and a platform bridge to the chosen local rules. Fully native Swift/Kotlin clients are another option. Both increase the number of UI stacks and the work required to keep local Case semantics consistent. The recommendation is based on sharing and maintenance, not a claim that React Native is always faster or more secure.

## Approved browser access to local Cases

Install the local runtime and serve the complete web application and its API from the same loopback origin on that computer. This is the primary free browser-local entry point. Hosted managed web remains a separate paid entry point using the same application features.

The runtime binds loopback only by default and serves only its packaged reviewed assets. Bootstrap and unlock establish a device-local session with approved origin, Host validation, CSRF protection, bounded request handling, and authenticated live channels. Reject DNS rebinding and unapproved origins. Loopback reachability is not authorization. Do not place durable credentials in URLs or expose a LAN listener by default.

The native launcher or local console supplies a short-lived single-use pairing code through a trusted local surface. The unpaired browser can load the packaged application but cannot read Cases or invoke native operations. Pairing consumes the code and creates a revocable host session for the approved origin; unlocking a Case remains a separate action. Require current session and CSRF validation for mutations and reauthenticate according to the existing local-lock policy. Qualify cookie/session behavior on the supported browsers rather than trusting a wildcard origin or an ambient local listener.

The local browser and Electron both address the same local Case host. Starting a second client attaches to that host; it does not open a competing writer. Runtime registration, Case locking, and process lifecycle must preserve that rule across restarts. Closing the browser does not silently kill or authorize background research.

A hosted HTTPS page talking directly to loopback is a separately qualified optional connection mode, not the only accountless path. It requires explicit pairing, browser permissions where applicable, compatible transport/CORS behavior, and clear denial/recovery UI. Chromium behavior does not establish Firefox or Safari behavior. An unsupported direct connection directs the user to the local browser entry without moving Case data to the cloud.

This local browser entry preserves the approved web/Electron parity. It does not provide a public self-hosted managed service, free cross-device sync, or automatic exposure of a local Case to another device. Portable archives remain the accountless transfer mechanism.

## Approved repository and package ownership

Keep one public npm-workspace repository for the open-source clients, local host, Runner, SDK, contracts, and shared Domain. Keep managed API, workers, managed identity, billing, synchronization implementation, and managed storage adapters in a separate private repository.

Private code consumes reviewed immutable versions of the public packages through a controlled build dependency. The public product builds without checking out the private repository, obtaining a paid account, or using private registry credentials. Public clients may contain managed-service protocol clients; they do not contain the private service implementation or its secrets. Compatible public-package licensing must be settled in the existing governance decision before distribution.

The approved package map is recorded in [the architecture model](application-architecture-model.json). These are responsibilities to scaffold during implementation, not existing source folders:

- `apps/web` builds the browser entry around `packages/ui-web`.
- `apps/desktop` separates renderer, preload, and main-process composition. It supervises or attaches to the local host and exposes restricted native channels.
- `apps/local-host` contains thin local transport and a composition root wiring shared rules and local adapters. It can run without opening Electron.
- `apps/runner` composes the execution role for an attached user-controlled Runner.
- `apps/mobile` separates focused UI, local transport/controller, and composition for local or managed use.
- `packages/contracts` owns machine schemas, generated wire values, and protocol compatibility. Runtime SDK objects and database rows stay out.
- `packages/domain` owns the application use cases and pure product rules; `packages/capabilities` owns the narrow ports those rules require.
- `packages/client` owns typed HTTP/IPC client contracts and delivery adapters. `packages/view-models` owns portable display selectors over already authorized data.
- `packages/design-tokens` owns shared visual meaning. `packages/ui-web` owns reusable web/Electron views without privileged imports.
- `packages/adapters-local` and `packages/adapters-mobile` implement platform ports. They normalize vendor behavior without deciding Case policy.
- `packages/connector-sdk` exposes the approved worker authoring contract. `native/platform` holds the Rust platform bridge and generated native wire bindings.
- `packages/test-support` contains development-only semantic fixtures. Production packages cannot import it.
- The private repository has its own managed transport, composition roots, and adapters. Public source cannot depend on any private implementation.

The graph/map/timeline renderer, editor, and file-preview libraries stay replaceable behind UI-owned interfaces over stable Case projections. Select and qualify the concrete libraries against the existing interface and performance requirements during implementation. Choosing a graph renderer does not choose a new graph database or change the meaning of Relationships.

## Approved build system and boundary enforcement

Begin with npm workspaces, explicit root build/check scripts, TypeScript project references, Cargo for the native executable, Vite for the shared web bundle, Electron Forge for desktop packaging, and Expo development/release builds for mobile. Add a larger task orchestrator only when build measurements justify it.

Build the Vite assets and host/native binaries explicitly before Forge packages them. Forge's Vite plugin is currently marked experimental, so the initial plan does not depend on that plugin or its template. Forge remains the packaging layer over reviewed prebuilt assets and explicit lifecycle hooks. Qualify packaged paths, application-protocol loading, signing, and per-platform makers. [Forge build lifecycle](https://www.electronforge.io/core-concepts/build-lifecycle), [Vite plugin status](https://www.electronforge.io/config/plugins/vite)

Pin supported runtime and toolchain releases in the implementation compatibility matrix. Standalone hosts use an approved supported Node LTS. Electron's bundled Node is a separate compatibility target. Packaging must not assume that an Electron embedded Node version equals the standalone Node selected for the local host.

Desktop installers must include the reviewed local-host runtime, platform executable, and shared web assets needed for accountless local use. End users do not need to install the Node development toolchain. The separately installable local runtime provides the same browser-local capability without requiring an Electron window. Optional large tool runtimes use the already approved setup and qualification rules.

Use the approved npm 12 baseline, dependency lock, seven-day dependency-age policy, and controlled install scripts. Pin Cargo dependencies and native build inputs, review licenses, and produce platform artifacts under the release gates. The authoring machine currently reports Node 24.14.0 and npm 11.19.0; those observations are not a compliant project bootstrap. This planning pass installs or upgrades no toolchain.

Root checks must cover schema generation freshness, TypeScript builds, formatting/lint, architecture imports, Domain fixtures, adapter conformance, Rust checks, public-only clean builds, and platform integration gates. Generated output is checked against its schema source. An import type is still an architectural dependency.

Use ESLint boundaries plus package exports and targeted restricted imports when the source packages are scaffolded. Check aliases, relative paths, re-exports, dynamic imports, and CommonJS paths actually in use. Deny UI access to Domain implementations, persistence, Node, Electron main APIs, and provider SDKs. Deny Domain imports of transports, frameworks, or concrete adapters. Permit composition-root wiring narrowly. Keep test and generated-code exceptions explicit.

Enforcement must ship in the same implementation change that creates the architecture folders. This proposal contains no application folders and therefore adds no pretend ESLint configuration. Rust crates and runtime capabilities need their own checks; ESLint cannot establish native isolation or dynamic network policy.

## Runtime routes and import directions

The [architecture model](application-architecture-model.json) separates source imports from four runtime routes. A UI calls a transport at runtime without importing the server Domain. A concrete adapter imports the port it implements; that port never imports its implementation. Local adapters reach the Rust executable through a runtime wire adapter, not a TypeScript source import of a Rust crate.

For mobile-local use, composition injects a typed local controller into the UI client interface. The UI still cannot import Domain or native storage directly. For a managed Case on mobile, the same client interface addresses the managed host. Data location and pending/accepted state remain explicit.

The reproducible model check is:

```text
node docs/planning/check-application-architecture.mjs
```

It checks declared package references, layer directions, public/private separation, cycles, forbidden example imports, and freshness of the generated [route visual](application-architecture.html). Run the same command with `--render` after editing its model or template. It validates the declared dependency model, not real source imports. Platform packaging, encryption, mobile behavior, browser access, runtime sandboxing, and production performance remain unproven.

## First implementation proofs

Implementation planning should begin with verifiable end-to-end paths rather than generating empty packages for every future feature:

1. Create, unlock, edit, export, and reopen an accountless encrypted local Case. Drive the same operation from Electron and the local browser and verify one authoritative history with no account dependency.
2. Preserve an imported Artifact and a typed Observation through the staged-byte and atomic-commit path. Crash between staging, commit, and acknowledgement; recover without a missing published file or duplicated history.
3. Run the same Case semantic fixtures against desktop SQLCipher, mobile SQLCipher, and managed PostgreSQL. Verify expected-version conflicts, single-operation replay, rollback, and search coverage on their actual builds.
4. Open a focused local Case on Android and iOS with encrypted originals and correct key/recovery handling. Verify that Expo Go, plaintext SQLite, and a browser cache cannot be mistaken for this capability.
5. Pair an attached Runner and execute one permitted synthetic Connector. Revoke its lease and reject later dispatch or mutation; keep existing permitted output readable.
6. Execute a managed command and a worker-output acceptance with current membership checks, queue lease fencing, and cursor catch-up. Prove public clients/local use still build without the private repository.
7. Intentionally introduce forbidden source imports and confirm normal CI rejects them through both aliases and relative paths. Native resource and network tests remain separate qualification gates.

These are acceptance proofs for future implementation, not tests claimed to pass today. The [operational-readiness decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/27) sets numerical budgets, operating-system/browser support baselines, update/rollback/migration gates, and recovery targets. The [governance and release decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/29) chooses licensing and release stages.

## Decision boundary

All five choices are approved. Architecture decision questions remaining: 0. This resolves the planning ticket. It does not claim that the application, private backend, package boundaries, encrypted storage, or sandbox controls are implemented or qualified. Numerical operating targets, release gates, and governance remain with their existing decision tickets.
