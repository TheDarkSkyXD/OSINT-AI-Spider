# Connector SDK execution constraints

Verified: 2026-10-25. Planning evidence for [Define the Connector SDK and source execution contract](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/25), based on official documentation and HTTP standards. No runtime tests, target-program contact, or credential use. Project implications below are engineering inferences under the approved policy, not new approvals.

The [extension decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/11) requires exact-version Case grants, authorization before every operation, credential aliases without raw secrets, and isolation appropriate to executable power. The [connector catalog](../planning/initial-connector-catalog-proposal.md) admits candidates individually and requires access, platform, provenance, and source-rights checks. A candidate's presence does not qualify its runtime.

## Wasmtime and Node.js

Wasmtime is designed to sandbox untrusted WebAssembly. Guest functionality comes through imports, and WASI filesystem access follows capabilities for explicitly supplied files and directories. This protects the host only within the configured engine and host interfaces. [Wasmtime security](https://docs.wasmtime.dev/security.html)

The WASI builder defaults to no environment variables or preopened directories, denies network addresses, and exposes host wall and monotonic clocks. `inherit_network` permits host-accessible addresses. WASI therefore does not automatically satisfy the project's no-ambient-clock policy. The host must omit unapproved imports, avoid inherited resources, and expose only authorized operations. [WasiCtxBuilder](https://docs.wasmtime.dev/api/wasmtime_wasi/struct.WasiCtxBuilder.html)

Node explicitly says its permission model does not protect against malicious code, which can bypass it. Its documented purpose is to prevent trusted code from unintentionally accessing resources. It is insufficient as the security boundary for hostile Plugin code. [Node permissions](https://nodejs.org/api/permissions.html)

Project implication: prefer narrowly imported WASM for deterministic processors. Native code, Node code, and local MCP servers need an independently enforced host boundary. A separate process, temporary directory, filtered environment, or Node permission flags alone cannot establish the approved isolation. This follows the runtime limitations above and [extension proposal section 5](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/11).

## Windows subprocess containment

Job Objects group processes for resource accounting, limits, and termination. Limits include user-mode CPU time, active process count, and committed memory. CPU-time limits are not elapsed-time deadlines. [Job Objects](https://learn.microsoft.com/en-us/windows/win32/procthread/job-objects), [basic limits](https://learn.microsoft.com/en-us/windows/win32/api/winnt/ns-winnt-jobobject_basic_limit_information), [memory limits](https://learn.microsoft.com/en-us/windows/win32/api/winnt/ns-winnt-jobobject_extended_limit_information)

`TerminateJobObject` terminates associated processes. Ordinary `CreateProcess` children normally join the job, but breakaway settings and other creation paths affect membership. Windows security restrictions must be configured for individual processes; resource membership does not itself restrict file or network access. [Job membership, termination, and security](https://learn.microsoft.com/en-us/windows/win32/procthread/job-objects)

Microsoft documents filesystem, credential, process, and network isolation separately through AppContainer. Its network capabilities are coarse categories such as Internet or intranet access, rather than this project's destination-specific Case policy. [AppContainer isolation](https://learn.microsoft.com/en-us/windows/win32/secauthz/appcontainer-isolation)

Project implication: combine Job Objects and host-enforced deadlines with a qualified OS isolation mechanism and controlled network access. Verify descendant containment and cancellation for each native runtime. A Job Object is useful for cleanup, but cannot qualify a Connector's filesystem or egress restrictions. AppContainer is evidence of a separate Windows mechanism, not a selected or compatibility-tested project implementation.

## Playwright browser execution

BrowserContexts separate cookies, local storage, and session storage like incognito profiles, and can share one browser. That session separation does not establish an OS security boundary. Chromium sandboxing is a separate launch option, `chromiumSandbox`, documented as defaulting to `false`. [Context isolation](https://playwright.dev/docs/browser-contexts), [browser launch options](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-option-chromium-sandbox)

`browserContext.route()` does not intercept frame requests intercepted by a Service Worker. Playwright recommends `serviceWorkers: 'block'` for request interception. Service Worker network requests have context events and routing, but updated worker main-script requests currently cannot be routed. [Context routing](https://playwright.dev/docs/api/class-browsercontext#browser-context-route), [Service Worker routing and limitations](https://playwright.dev/docs/service-workers#network-events-and-routing)

Playwright also exposes `APIRequestContext`, including `browserContext.request`, which shares the browser context's cookie jar. Browser state therefore includes authority usable for direct API requests. [APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext)

Project implication: retain the approved separate browser process and profile, explicitly qualify OS sandbox settings, and enforce destination policy on all egress. Account for subresources, redirects, worker traffic, and API requests. Blocking Service Workers simplifies request accounting but does not replace network isolation. A fresh BrowserContext alone cannot satisfy [extension proposal section 5](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/11).

## HTTP retries and cancellation

Idempotency means repeated identical requests have the same intended server effect. Servers may still log each request or produce other side effects. RFC 9110 advises against automatic non-idempotent retries unless their semantics are known to be idempotent or the original was never applied. It also advises against automatically retrying a failed automatic retry. [RFC 9110 section 9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2)

`Retry-After` accepts an HTTP-date or nonnegative delay in seconds. It describes a wait before a follow-up, including temporary unavailability for 503 and a minimum delay before following a redirect. It does not authorize retrying a non-idempotent operation. [RFC 9110 section 10.2.3](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.3)

Project implication: safe retries cannot promise exactly-once upstream traffic. A lost response leaves uncertainty about completed work. Local cancellation cannot undo upstream processing. Record attempts and ambiguous outcomes, charge attempts to budgets, and reauthorize before another dispatch. Honor valid server delays, or stop when they exceed the deadline. Upstream deduplication requires a documented provider contract. Local run IDs alone cannot supply it. [RFC 9110 retry semantics](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2)

## HTTP caches and Case authorization

Response `no-store` prohibits cache storage and reuse, applies to private and shared caches, forbids intentional persistent storage, and requires prompt best-effort removal from volatile storage. RFC 9111 specifies a narrow `must-understand` exception. A conservative SDK can decline that exception. [RFC 9111 section 5.2.2.5](https://www.rfc-editor.org/rfc/rfc9111.html#section-5.2.2.5)

Unqualified `private` prohibits shared-cache storage but permits private-cache storage subject to other rules. Qualified `private` restricts listed fields. Neither directive guarantees confidentiality. Shared reuse of Authorization-bearing responses needs an explicitly permitting response directive. Freshness and `Vary` matching also constrain reuse. [RFC 9111 sections 3.5, 4, and 5.2.2.7](https://www.rfc-editor.org/rfc/rfc9111.html#section-3.5)

Project implication: partition cached results by Case and relevant provider identity and entitlement. Recheck current Case, Source, extension, and user authority on every cache read. A cache hit cannot bypass revocation, disclosure restrictions, or source retention terms. HTTP `private` means a single user's cache, not permission to share among Case members. These Case requirements follow [extension proposal sections 3 and 4](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/11) and [catalog access requirements](../planning/initial-connector-catalog-proposal.md#approved-boundaries).

Artifact preservation needs separate source-rights and retention authorization. An evidence store must not silently turn a forbidden HTTP cache entry into reusable SDK data. Cacheability alone does not authorize archival retention, export, or AI processing. [Catalog source-rights requirements](../planning/initial-connector-catalog-proposal.md#search-and-deferred-entries)

## Tool credentials and remaining uncertainty

The approved policy permits named credential aliases without raw secret access and forbids inherited credentials in subprocesses. Passing a tool an API key through environment variables, arguments, configuration files, or a mounted secret still gives that tool the raw secret. Process isolation does not make this compliant. A broker must perform authorized authentication without exposing the credential to extension code. A tool that requires direct secret access remains incompatible until adapted or separately approved. [Extension proposal sections 4 and 5](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/11)

The remaining implementation uncertainty is which pinned runtimes and Windows containment mechanism satisfy these constraints together. The live [Wasmtime API page](https://docs.wasmtime.dev/api/wasmtime_wasi/struct.WasiCtxBuilder.html) identifies a development build and gives inconsistent TCP and UDP default descriptions, so explicit denial and pinned-version verification are necessary. Browser routing and sandbox behavior also require qualification in the packaged browser. Provider-specific retry deduplication, storage rights, and broker-compatible tool authentication remain unverified per Connector. This note establishes constraints, not successful integration.
