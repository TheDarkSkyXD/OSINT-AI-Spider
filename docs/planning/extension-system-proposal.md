# Skills, custom agents, Plugins, and Connector trust boundaries

Status: approved September 4, 2026.

Decision ticket: [Define skills, agents, plugins, and connector trust boundaries](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/11).

This specification defines one extension system for local Electron use, managed web and mobile clients, attached Runners, and hosted workers. It keeps extension availability separate from Case authority. Installing or synchronizing a package never grants access to a Case, a credential, the network, or an execution runtime.

## 1. Keep four extension types distinct

The user-facing extension types are:

- A Skill is a versioned bundle of instructions, references, and assets that guides an agent. Skill content is untrusted context. If a Skill includes a helper that can execute code, that helper is governed as a Plugin capability.
- A Connector accepts declared input types, collects from or analyzes a named Source, and returns preserved Artifacts and typed Observations with provenance.
- A Plugin is executable code that supplies tools, processors, Connectors, or constrained interface contributions through declared capabilities and an isolated runtime.
- A Custom agent is a versioned configuration that composes instructions, model preferences, Skills, permitted Connectors and Plugins, an autonomy ceiling, budgets, and delegation rules. It may reference credential aliases but never contains credentials.

A Capability pack remains a curated group of Connectors and policy defaults. MCP is a transport and tool protocol. An Extension package is the distribution container. None is a fifth extension type.

## 2. Provide one Custom-agent builder for beginners and experts

The Custom-agent builder has a guided interface and an advanced YAML or JSON manifest editor backed by the same schema. Both surfaces edit the same draft rather than producing different agent formats.

The builder covers identity, purpose, model preference and fallback, instructions, Skills, tools, Connectors, Plugins, Case-data scope, autonomy ceiling, budgets, delegation, and expected outputs. It continuously previews effective data access, network access, provider disclosure, credential aliases, cost, and actions that will still require human approval.

New agents begin as editable drafts. Publishing creates an immutable version. Further edits create a new draft and version. Users can clone, fork, import, and export permitted agents. Validation rejects missing dependencies, cycles, incompatible runtimes, unsupported providers, undeclared capabilities, permission conflicts, and a child agent whose requirements exceed its parent.

Test mode defaults to synthetic or explicitly selected sample data, no external network, no real credentials, no active-cyber operations, and no Authorized engagement. A person must deliberately grant a test access to a real Case.

## 3. Separate libraries from Case activation

Accountless local users have a device Extension library. Paid users may synchronize a personal library across their devices. Organizations have a shared library. A Case may also hold private Case-only Skills and Custom agents.

An Extension library records what is available for review. A Case extension grant enables one exact extension version and declares its Case objects, sensitivity classes, tools, providers, credential aliases, budgets, and autonomy limits. A Case may narrow published limits but cannot widen them. Library installation, update, or synchronization never creates a Case extension grant.

Cases remain pinned to their granted versions. A personal or Organization library update does not silently change an active Case. Private instruction and configuration extensions may be synchronized when policy permits. Executable local-development Plugins and Connectors remain device-local until project-maintainer verification.

## 4. Use deny-by-default capabilities

Every manifest declares the smallest Extension capabilities it may request. Capability groups cover:

- Case object types, sensitivity classes, and allowed read or proposal operations
- Folder, tag, and other allowed organizational changes
- Source classes, network destinations, browser actions, and download types
- Temporary files, selected user files, and bounded workspace storage
- AI providers, models, context classes, and data-disclosure destinations
- Named credential aliases without access to raw secret values
- WASM, subprocess, MCP, browser, or other executable runtimes
- Paid services, cost ceilings, active-cyber operations, and Authorized-engagement drafting

Installation grants no capabilities. A Case Manager reviews the package manifest and requested Case extension grant. A capability increase, new data destination, new executable dependency, or changed provider requires another review.

The authoritative Case host evaluates current Core, Organization, Case, Source, provider, extension, and user policy before every operation. An allowed worker receives a short-lived token for that exact operation. Custom agents and extensions may request a broader grant but cannot approve it or change their own permissions.

Authorized engagement remains separate. An extension may draft an account registration, post, message, reply, follow, reaction, upload, or form submission only when its capabilities permit drafting. Dispatch still needs the single-use human approval bound to the exact Managed account, destination, content, disclosed Case data, and purpose.

## 5. Match isolation to executable power

Instruction-only Skills enter the agent as clearly delimited untrusted context. Retrieved pages, imported files, tool descriptions, Skill instructions, and Plugin output cannot override system or Case instructions or grant capabilities.

Deterministic processors should use WebAssembly with no ambient network, filesystem, process, clock, or secret access. The host exposes only declared capabilities. Native tools and local MCP servers run as isolated subprocesses with temporary workspaces, resource and time limits, filtered environments, output limits, and no inherited credentials. Remote MCP servers require authenticated encrypted transport, approved origins, pinned server identity, and an allowlisted tool inventory.

Browser automation runs in a separate sandboxed process and profile from the dashboard, Case store, and credential broker. The page receives no desktop APIs, unrestricted clipboard, Case database connection, or general-purpose credential access.

Electron may dispatch local extension work through its restricted main-process composition root and local Runner. Web and mobile clients never execute arbitrary extension code. They send typed commands to the authoritative managed host or an attached user-controlled Runner. Managed workers use the same Domain permission contract and separate execution identities.

Third-party interface contributions are declarative. Approved packages may provide cards, forms, result renderers, graph styles, and view schemas interpreted by project-owned UI components. Arbitrary third-party JavaScript cannot run inside the Electron renderer, web client, or mobile client.

## 6. Have no Community extension tier

The Extension trust tiers are Bundled, Verified, and Local-development.

- Bundled versions are signed, reviewed, tested, and released with the project.
- Verified versions are signed third-party versions that passed the project-maintainer review and automated release gates.
- Local-development versions are unsigned, device-local work available only through developer mode.

There is no public unreviewed Community catalog for Skills, Custom agents, Plugins, or Connectors. Public libraries contain only Bundled and Verified versions. Trust applies to one exact version and communicates review status. It never grants Case access or weakens policy.

Only project maintainers may approve, sign, publish, update, suspend, or revoke public Plugins. Case Managers may enable or disable approved versions but cannot change code or trust status. Users may build local Plugins and Connectors, but these cannot synchronize, publish, run as managed or background work, or operate in sensitive-Case, active-cyber, or Authorized-engagement workflows. They must pass maintainer verification before entering the public library.

Private personal, Organization, and Case Skills and Custom agents remain supported because they are non-executable configurations. Any executable helper inside them is a Plugin and follows the Plugin rule.

The manifest schema, SDK, validators, and public catalog format remain open source. Paid service features may include synchronized personal libraries, private Organization libraries, hosted validation, and managed execution without turning private content into a public extension.

## 7. Pin, update, suspend, and revoke exact versions

Every Extension package release has an immutable version, publisher identity, signature, manifest digest, package digest, and dependency lock. A library may download or announce a new Verified version, but Cases keep using their currently approved version.

Permission, data-disclosure, Source, network, runtime, native dependency, or compatibility changes always require review. Compatible updates may be approved across several Cases through one explicit action. Users may roll back to a previously approved version while it remains executable and policy-compatible.

A security, legal, or source-policy suspension blocks new execution immediately and pauses affected queued or active work at a safe boundary. Revocation prevents the package from executing. Historical manifests, exact version identifiers, results, Case history, and provenance remain readable. Removal never deletes Case evidence or rewrites which version produced it.

## 8. Allow bounded Custom-agent delegation

A Custom agent may delegate a typed task only to an enabled, version-pinned child agent declared by the effective configuration. The child receives a strict subset of the parent's remaining Case data, tools, credential aliases, provider access, autonomy, time, and budget. Delegation cannot install an extension, raise authority, reset limits, or bypass an approval.

The Domain rejects dependency cycles. Default delegation depth is three. Parallel branches count against the parent Research run and applicable subscription limits. A provider or data-sharing destination not already approved pauses the branch. Child output returns as attributed collected material or a proposal, never an automatically accepted Finding.

The live run view shows a selectable parent-child tree. Each branch displays its task, model, Custom-agent version, state, current tool call, safe input, output, browser session, Artifacts, graph changes, errors, approvals, and remaining budget. An authorized user may pause or stop one branch or emergency-stop the whole Research run. Completed branches remain searchable and replayable. The product displays recorded actions and concise explanations, not credentials or private model reasoning.

## 9. Use one signed distribution package

An Extension package may contain several declared Skills, Plugins, Connectors, and Custom agents while preserving each component's type and capabilities. Its manifest includes:

- Publisher, version, signatures, hashes, licenses, source availability, and support contact
- Included components, dependency lock, and package relationships
- Supported application, platform, architecture, and extension-API versions
- Requested capabilities, Source classes, network destinations, credential aliases, data classes, and costs
- Native binaries, lifecycle scripts, MCP servers, external processes, and every other executable behavior
- Tests, fixtures, health checks, provenance behavior, and compatibility claims

Packages cannot perform undeclared downloads, post-install execution, permission discovery, or dependency resolution at runtime. The installer displays aggregate risk and capabilities. Case activation still grants each component only its approved scope.

## 10. Enforce a seven-day npm safety window

The JavaScript toolchain will follow the researched 2026 baseline in `docs/research/npm-security-release-hold-2026.md`.

For third-party dependencies, use an approved npm 12 release and enforce `min-release-age=7` for the complete dependency tree. Commit `package-lock.json`, require `npm ci`, enable strict npm configuration, make dependency install scripts opt-in and version-pinned, and reject Git or remote dependencies unless reviewed. CI asserts the effective configuration because command-line and environment settings can override `.npmrc`.

Run dependency review, `npm audit` at the chosen severity gate, registry signature and available provenance checks, malware alerts, tests, and lockfile review as separate controls. Pin GitHub Actions to reviewed full commit hashes. Dependabot uses a seven-day normal-update cooldown and never auto-merges. Security updates remain immediately available for human review.

npm does not provide a native seven-day timer for publishing this project's packages. An ordinary release workflow builds one candidate artifact, records its digest and source commit, and holds that artifact behind a protected GitHub environment for 10,080 minutes. After the wait, the workflow retrieves and verifies the original artifact rather than rebuilding it, uses OIDC stage-only trusted publishing, waits for npm malware scanning, and requires project-maintainer 2FA approval.

Before first publication, the maintainer assesses whether each package falls under npm's Dual-Use Content Policy. A qualifying package declares its class, includes a root `DISCLOSURE` file, and uses staged publication.

A narrow audited emergency path may waive the dependency-age rule or release timer for a known security fix or legal revocation. It pins exact versions, names the advisory and affected path, records the reason and approver, and preserves artifact identity, dependency review, signatures, provenance inspection, scanning, tests, and human publication approval. Temporary exceptions expire when the selected package version reaches seven days.

## 11. Keep policy in the shared Domain

The shared Domain owns extension types, manifest semantics, dependency validation, trust and lifecycle states, effective Case extension grants, delegation limits, capability checks, and approval requirements. These rules are shared by local and managed hosts.

Capability ports expose application-owned operations for model execution, extension execution, browser work, secrets, network access, files, and package verification. WASM engines, subprocesses, MCP clients, Electron APIs, operating-system credential stores, npm, and managed workers remain adapters. Provider or runtime types do not enter the Domain.

Electron IPC, HTTP or RPC endpoints, worker messages, and mobile or web clients validate and translate typed requests but do not decide whether an extension is allowed to act. Composition roots wire the permitted adapters. UI surfaces render manifests, grants, risks, approvals, and live branch state without becoming an authorization boundary.

## Review scenarios

- A user installs a Verified package. It appears in the personal library but cannot read any Case until a Case Manager grants its exact components and capabilities.
- A Skill contains a shell helper. The importer classifies the helper as Plugin code and refuses to treat the package as instruction-only.
- A Custom agent delegates to a specialist. The child receives only the parent's remaining grant and appears as a live branch with its own attributed tool activity.
- A Verified Plugin requests a new network destination in an update. Existing Cases stay pinned, and adoption requires another permission review.
- A maintainer suspends a compromised Connector. New dispatch stops immediately, while historical results still identify the exact version that produced them.
- A local developer builds a Plugin. It can run only in the restricted device-local development path and cannot enter managed or sensitive Case execution.
- A dependency release is six days old. npm refuses to resolve it during the normal install even if a Dependabot pull request exists.
- A project package finishes its seven-day hold. The release job verifies the original tarball digest, stages it with OIDC, waits for scanning, and requires maintainer 2FA approval.
