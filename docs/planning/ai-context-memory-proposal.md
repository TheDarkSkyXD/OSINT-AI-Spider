# AI providers, instructions, context, and memory

Status: approved October 15, 2026. The user selected option A for all four decisions.

Decision ticket: [Define AI provider selection, instructions, context, and memory](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/17).

## Established requirements

Each Case has a selectable AI provider and model. Users may change that selection at any time. The product supports the previously selected local CLI subscription paths and optional provider APIs. CLI subscription credentials stay on the user's desktop or attached Runner. Managed workers use separately configured supported API credentials. Provider availability, entitlement, and integration terms must be checked when implementing each adapter; the September research is historical evidence, not a guarantee of current support.

Case chat, custom agents, global and Case instructions, global and Case Skills, cited summaries, and visible subagent work remain part of the approved design. Every Case member can view the Case's sensitive material; sending material to a model is a separate operation governed by the configured provider and Case policy.

## Model selection and switching

The selector shows provider, model, execution location, authentication method, capability support, availability, and the billing route. Subscription usage and API charges remain separate from the app subscription. Unknown remaining allowance displays as unknown.

Changing the Case default applies to subsequent work immediately. For a running job, the user can also request a switch. The job pauses at a safe boundary, saves a Run checkpoint, and starts a linked continuation with the new provider and model. Completed work and citations remain intact. The application explains what context will be handed over and rechecks the destination's capabilities and Case permissions.

Provider session identifiers remain provider-specific. A transfer uses the recorded Case context, public progress summary, pending tasks, and tool outcomes. It does not claim to transfer hidden reasoning or reproduce the prior model's internal state.

## Fallback and budgets

Pause by default when the provider is unavailable or reaches its allowance. Users may configure an ordered fallback list per Case, naming permitted providers, models, execution locations, and API spending ceilings. A run can use only the fallback choices enabled before that run or explicitly added by an authorized user.

Fallback cannot expand data disclosure, tool access, or the run's remaining budget. A missing capability pauses the affected task instead of silently dropping it. A disconnected Runner leaves work visibly waiting; it does not move subscription credentials into the cloud.

Parent and child agents share the run's total budget. Time, tool calls, concurrency, context, and separately metered charges have explicit limits. Estimates are labeled. A cost cap must account for outstanding requests and provider reporting delay; the UI must not promise exact billing control when the provider cannot supply it.

## Context and memory

Case records are authoritative. Assemble task context from the request, applicable instructions and Skills, selected or pinned material, relevant retrieved passages, contradictions, review states, and public checkpoints. Preserve exact object versions and citation locations. Leave room for output and tool results. When a model has a smaller context window, rebuild a bounded context package and disclose omissions.

Maintain an editable Case memory of objectives, unresolved questions, decisions, and public progress summaries. Each entry names its origin and supporting Case records. Memory is a navigation aid, not evidence. Corrections, deletions, and access changes invalidate affected entries and retrieval caches before later use.

Global memory contains user-approved preferences and reusable methods. Do not automatically promote names, identifiers, Case facts, or sensitive material into global memory. Cross-Case retrieval is an explicit scope choice, checked against current Case access, with the origin of each included item visible. Revoked source access prevents future retrieval and invalidates dependent memory; disclosures already made cannot be recalled.

Context inspection shows included sources, omitted categories, active instruction versions, and an approximate token allocation. Large documents are retrieved in relevant passages; original Artifacts remain preserved. Search embeddings and extraction services obey the same destination and disclosure restrictions as generation models.

## Instruction resolution

Separate enforced restrictions from ordinary instructions. Restrictions continue to use the approved strictest-policy rule. Ordinary guidance is composed from global defaults, the selected Custom agent, Case instructions, enabled Skills, and the current task request. More specific task and Case guidance can override ordinary defaults. If enabled Skills or mandatory guidance cannot be reconciled, present the conflict instead of silently selecting one.

Case settings show where each instruction came from and the effective version used for the next run. Pin instructions, agent configuration, and Skill versions for each run. Editing the defaults does not rewrite a running job or historical results. Applying an edit to active work creates a checkpoint and records the new configuration.

Collected pages, documents, messages, and tool outputs are source content. They cannot grant permissions or replace user instructions. Skills describe procedures but do not grant executable capabilities beyond their existing Case grants.

## History and output

Record provider and model identifiers, execution location, configuration versions, context references, tool outcomes, normalized events, citations, public summaries, errors, usage, and handover checkpoints. Keep secrets out of Case history. Preserve only public resumable state and provider-exposed events, not private reasoning.

A citation must resolve to the supporting stored Artifact version. Unsupported statements remain explicit Claims or Inferences. Multiple models agreeing does not promote a Claim to a Finding. Research replay reads recorded actions; rerunning creates new work and may produce different answers.

## Approved decisions

1. Model changes save a checkpoint and start a linked continuation with the selected model.
2. Provider failures pause by default. Users may enable a fallback list with spending limits.
3. Case memory is editable. Global memory contains only user-approved preferences and reusable methods.
4. Specific Case and task instructions override ordinary defaults. Irreconcilable conflicts remain visible, and enforced restrictions still apply.

These decisions define product behavior for implementation planning. Provider adapters and the runtime remain future implementation work.
