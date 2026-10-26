# AI CLI provider constraints

Research date: 2026-09-04

This note answers [GitHub issue #4](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/4). It relies only on current OpenAI and Anthropic documentation, terms, policies, and first-party source repositories. The legal and pricing pages can change, so the project should review them again before a release.

## Decision summary

OSINT AI Spider should not treat Codex CLI and Claude Code as interchangeable executables. Their product-integration rules differ.

| Provider path | Subscription login in OSINT AI Spider | Supported product interface | Recommended use |
| --- | --- | --- | --- |
| OpenAI Codex | Yes. Codex App Server documents ChatGPT browser and device-code login for custom clients. | Codex App Server over local `stdio`; Codex SDK or `codex exec` for automation | Primary local Electron agent adapter |
| OpenAI API | Not applicable. The user or deployment supplies an API credential. | Codex SDK, `codex exec`, or OpenAI API | Self-hosted runners and predictable automation |
| Anthropic Claude Code binary | Yes, but only through Anthropic's own flow in the unmodified binary. Each end user must use and pay through their own credential. | Unmodified `claude` binary, including `claude -p` | Optional local adapter after accepting the Commercial Terms and reviewing distribution |
| Anthropic Agent SDK | No Claude.ai login in a third-party product without prior Anthropic approval. | TypeScript or Python Agent SDK with an API key or supported cloud provider | Primary Claude integration for a custom UI or shared runner |

The architecture should therefore use a provider-neutral `AgentRunner` boundary but give each provider a separate authentication adapter. Do not import, copy, proxy, pool, or synchronize consumer session credentials.

## OpenAI Codex

### Authentication and subscription access

Codex supports two local sign-in methods: ChatGPT subscription access and OpenAI API key access. The CLI starts ChatGPT authentication with `codex login`; API-key login reads a key from standard input. ChatGPT authentication follows the user's ChatGPT workspace controls, while API-key authentication follows the API organization's settings and standard API billing. [OpenAI authentication documentation](https://developers.openai.com/codex/auth/)

The custom-client path is explicit. Codex App Server is documented as the interface for embedding Codex in a product, including authentication, approvals, conversation history, and streamed events. Its account API supports API keys, a managed ChatGPT browser flow, and a ChatGPT device-code flow where the client displays the verification URL and code. Codex owns, persists, and refreshes managed ChatGPT tokens. An experimental external-token mode exists, but OSINT AI Spider should not own ChatGPT tokens when the supported managed flow is available. [Codex App Server documentation](https://developers.openai.com/codex/app-server/)

ChatGPT Plus, Pro, Business, Edu, and Enterprise plans include Codex access according to their plan and workspace settings. ChatGPT login consumes the plan's Codex allowance. API-key use is billed separately at API rates and may not include ChatGPT-only cloud features. [Codex pricing](https://developers.openai.com/codex/pricing/)

### Automation and execution location

`codex exec` is the supported non-interactive command for pipelines, scheduled jobs, and scripts. It emits progress events as JSON Lines, can constrain the final result with a JSON Schema, supports resumable sessions, and defaults to a read-only sandbox. OpenAI recommends API keys as the default for automation. ChatGPT-managed authentication is documented as an advanced option only for trusted private runners, not public or open-source CI. [Codex non-interactive mode](https://developers.openai.com/codex/noninteractive/)

The TypeScript SDK runs local Codex threads from a server-side Node.js process. The Python SDK controls a local App Server and installs a pinned Codex runtime. OpenAI directs rich custom clients to App Server and automation to the SDK. [Codex SDK documentation](https://developers.openai.com/codex/sdk/)

App Server's stable local transport is newline-delimited JSON over `stdio`, which fits an Electron main-process child. Its TCP WebSocket listener and remote Code Mode host are marked experimental and unsupported for production. A production self-hosted deployment should expose OSINT AI Spider's authenticated job API around an isolated SDK or `codex exec` worker. It should not expose Codex App Server's WebSocket listener to users or the internet. [Codex App Server transport and security guidance](https://developers.openai.com/codex/app-server/)

### Credentials and sessions

Codex can store cached credentials in the operating-system keyring or in `auth.json` under `CODEX_HOME`. The file contains access tokens and must be handled like a password. ChatGPT tokens refresh automatically during active use. The CLI and IDE extension share the same cache by default. [OpenAI credential storage documentation](https://developers.openai.com/codex/auth/)

Design consequences:

- Let App Server conduct the ChatGPT login. Open the returned URL in the user's external browser or show the documented device code.
- Keep `CODEX_HOME` and the operating-system account isolated per OSINT AI Spider user. Do not read the token file into Electron's renderer, case database, logs, crash reports, or synchronization system.
- Use the system credential store where supported. If file storage is unavoidable, restrict permissions and exclude the path from backups and case exports.
- Record Codex thread IDs in the case database, but leave provider rollout files and credentials under the runner's private storage. App Server supports starting, resuming, and forking threads.
- For enterprise automation, prefer a Codex access token or workload identity where available. For ordinary self-hosted automation, prefer a separately scoped API key.

### Limits, cost, and licensing

ChatGPT plan limits are usage allowances, not fixed message counts. Consumption varies with the model, context, task complexity, tool use, and local versus cloud execution. Local and cloud Codex work share the plan allowance, and weekly limits may also apply. The client should display provider-reported usage and stop cleanly at a limit instead of estimating entitlement from the user's plan name. API-key usage follows API pricing and API rate limits. [Codex pricing and usage limits](https://developers.openai.com/codex/pricing/)

Codex is licensed under Apache License 2.0. That permits modification and redistribution if the project ships the license, marks modified files, preserves applicable notices, and follows the other redistribution terms. The license does not grant OpenAI trademarks. [OpenAI Codex license](https://github.com/openai/codex/blob/main/LICENSE)

The open-source license covers the software, not free model service. Account sharing, resale of account access, transferred API keys, avoidance of usage limits, and bypassing provider safeguards remain prohibited under the applicable OpenAI terms. [OpenAI Services Agreement](https://openai.com/policies/services-agreement/)

## Anthropic Claude Code and Agent SDK

### The two integration paths are different

Anthropic permits a product to preinstall or run the unmodified Claude Code binary only under its Commercial Terms and stated conditions. The product may not modify the binary or remove, disable, or restrict any built-in authentication method. Each end user must authenticate with their own Claude subscription, Anthropic API key, or supported cloud-provider credential, and the provider bills that user directly. The product may not pay for, resell, or intermediate Claude usage for end users. [Claude Code legal and compliance documentation](https://code.claude.com/docs/en/legal-and-compliance)

Anthropic draws a sharper boundary around custom applications. Third-party developers may not offer Claude.ai login in their own application, route requests through Free, Pro, or Max credentials on behalf of users, or collect, store, or intermediate Claude.ai credentials or session tokens. An end user may still sign in through Anthropic's own flow in the unmodified Claude Code binary. [Claude Code authentication and credential-use rules](https://code.claude.com/docs/en/legal-and-compliance)

The Agent SDK repeats this rule: without prior approval, third-party products must use API-key authentication rather than offering Claude.ai login or subscription rate limits. The SDK is the documented choice for a production custom application, while the CLI is positioned for interactive or one-off terminal work. [Claude Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)

This means OSINT AI Spider can support Claude in two ways:

1. A local CLI adapter may discover or install the unmodified Claude Code binary, launch Anthropic's own login flow, and invoke `claude -p`. The project must accept the Commercial Terms, retain all authentication choices, bill nothing on Anthropic's behalf, and never inspect the user's Claude credential files.
2. The integrated Claude agent inside the OSINT AI Spider interface should use the Agent SDK with a user-owned or deployment-owned Anthropic API key, Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry. Claude.ai login in this custom flow requires prior written approval from Anthropic.

### Automation and execution location

`claude -p` is the supported non-interactive CLI mode. It can stream structured JSON, return a session ID, resume sessions, constrain output with JSON Schema, and preapprove a limited tool set. For unattended runs, unresolved permission requests can be denied instead of waiting forever. [Claude Code programmatic usage](https://code.claude.com/docs/en/headless)

`--bare` skips local hooks, skills, plugins, MCP servers, memory, and project instructions. It also skips subscription OAuth and the system keychain, so bare runs require an API key, credential helper, or supported cloud-provider credential. Non-bare `-p` runs can use the end user's existing subscription login, but they also load local and project configuration. The runner must isolate the working directory and explicitly control which settings, hooks, plugins, and MCP servers it permits. [Claude Code bare-mode documentation](https://code.claude.com/docs/en/headless)

The TypeScript and Python Agent SDKs run the agent loop in the host process and infrastructure. Anthropic's Managed Agents product is a separate hosted REST API where Anthropic owns the sandbox and session event log. For Electron, the TypeScript SDK belongs in the main process or a restricted worker, never the renderer. For self-hosting, run one isolated worker identity per user or organization. [Claude Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)

### Credentials and sessions

Claude Code stores credentials in macOS Keychain, `~/.claude/.credentials.json` with mode `0600` on Linux, or `%USERPROFILE%\.claude\.credentials.json` under the user's profile ACLs on Windows. Environment variables and credential helpers can override a subscription login. [Claude Code authentication documentation](https://code.claude.com/docs/en/authentication)

Design consequences:

- Do not read, copy, upload, synchronize, or proxy `.credentials.json`, OAuth tokens, or Claude.ai session tokens.
- Send users through Anthropic's own browser login when using the unmodified CLI. Never build a Claude.ai username, password, or token form into OSINT AI Spider.
- Store API keys only in the operating-system credential store or a deployment secrets manager. Pass them to a short-lived worker process, not Electron's renderer.
- Use separate home and configuration directories for different server users. Do not allow one user's saved subscription login to serve another user.
- Store the provider session ID and OSINT AI Spider's normalized event history separately. Provider-native session data remains in the runner's private area.

### Limits, cost, and licensing

Claude subscription use is limited and shared across Claude product interfaces. Anthropic announced a separate monthly credit for Agent SDK and `claude -p` use, then paused that change on June 15, 2026. As of this research date, Agent SDK, `claude -p`, and third-party app usage still draw from the subscription's existing usage limit. The previously announced credit is not available. [Anthropic's current Agent SDK subscription notice](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan)

API-key usage is pay-as-you-go. Anthropic applies organization spend caps plus per-model request, input-token, and output-token limits. A deployment can add lower workspace limits. The runner must honor `429` responses and `retry-after`, expose spend controls, and avoid treating client-side cost estimates as invoices. [Claude API rate limits](https://platform.claude.com/docs/en/api/rate-limits) and [Agent SDK cost tracking](https://code.claude.com/docs/en/agent-sdk/cost-tracking)

Claude Code itself is not open source. Its repository license says all rights are reserved and use is subject to Anthropic's Commercial Terms. The TypeScript Agent SDK repository uses the same notice. The Python Agent SDK repository uses the MIT License, but model access and product use still remain subject to Anthropic's service terms. [Claude Code license](https://github.com/anthropics/claude-code/blob/main/LICENSE.md), [TypeScript Agent SDK license](https://github.com/anthropics/claude-agent-sdk-typescript/blob/main/LICENSE.md), and [Python Agent SDK license](https://github.com/anthropics/claude-agent-sdk-python/blob/main/LICENSE)

Anthropic also restricts product branding. An Agent SDK integration may use plain references such as "Claude Agent" or "Powered by Claude", but the product may not call itself "Claude Code" or mimic Claude Code branding. [Claude Agent SDK branding guidance](https://code.claude.com/docs/en/agent-sdk/overview)

## Restrictions that affect the OSINT product

Provider access does not authorize every proposed investigation feature.

OpenAI prohibits privacy-compromising aggregation, monitoring, profiling, or distribution of private or sensitive personal information without authorization. It also prohibits facial-recognition databases without consent, real-time remote biometric identification in public spaces, crime-risk prediction based solely on personal traits or profiling, impersonation, and high-stakes law-enforcement decisions without human review. National-security or intelligence use requires OpenAI review and approval. [OpenAI Usage Policies](https://openai.com/policies/usage-policies/)

Anthropic prohibits unauthorized access to private information, facial recognition, tracking a person's physical location or communications without consent, predictive policing, law-enforcement applications that impair civil liberties or human rights, fake personas used to mislead, automation of account creation, and attempts to bypass another platform's guardrails or terms. [Anthropic Usage Policy](https://www.anthropic.com/legal/aup)

These policies rule out the proposed automated "puppet account creator." The product can instead manage investigator-owned accounts and authorized source credentials. It should require provenance, authorization records, human confirmation of findings, and human approval before any consequential action.

## Required architecture decisions

1. Use Codex App Server over `stdio` for the local Electron Codex experience. Let App Server own ChatGPT OAuth or device-code login.
2. Use the Codex SDK or `codex exec` with API credentials for self-hosted workers. Permit ChatGPT account authentication only on a trusted, private, per-user runner and never in public CI.
3. Use the Claude Agent SDK with API or supported cloud-provider credentials for the integrated Claude experience.
4. Keep any Claude subscription adapter separate. It must run the unmodified Claude Code binary, use Anthropic's login flow, preserve every built-in authentication method, and keep billing directly between Anthropic and the user.
5. Put all provider processes behind a local or server-side runner boundary. Electron renderers and browser clients receive normalized events, approvals, status, and results. They never receive provider credentials.
6. Maintain isolated credential stores, workspaces, and process identities per user. Case synchronization must exclude provider credential and native session directories.
7. Add provider-specific budget, rate-limit, pause, and cancellation handling. Display reported usage and costs as estimates unless they come from the provider's billing API.
8. Recheck provider documentation, commercial terms, pricing, and usage policies before shipping. Get Anthropic's written approval before adding Claude.ai login to any custom Agent SDK interface.
