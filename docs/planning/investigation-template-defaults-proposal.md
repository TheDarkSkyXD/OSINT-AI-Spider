# Investigation template defaults and acceptance criteria

Status: draft for user review. Five choices remain open. The seven presets and scenario requirements are proposed configuration and implementation criteria, not working integrations or executed acceptance tests.

Decision: [Define investigation template defaults and acceptance criteria](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/28).

Artifacts: [template registry](investigation-template-defaults.json) and [declaration checker](check-investigation-templates.mjs).

## Existing decisions

The [shared workflow decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/19#issuecomment-6191360179) already accepts one Case workflow across six research scenarios, with preserved source material, cited versioned summaries, human Finding review, contradictions, Report snapshots, visible agent work, and selective mobile handoff. Its HTML walkthrough was a planning simulation, not an implementation test.

The [approved catalog](initial-connector-catalog-proposal.md) adds bug-bounty program intake, passive asset research, evidence organization, report drafts, and optional separately scoped httpx, Nuclei, and ZAP work. Catalog entries remain candidates until their exact versions qualify. This proposal uses the catalog's C01-C33 references for traceability; those labels are not executable Connector IDs or admission claims.

The [autonomy decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/9) fixes Suggest only for new Cases, a complete authorization profile before automatic collection, explicit grants and budgets, human-controlled judgments, and separately approved engagement. The [lifecycle decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/20) permits draft Cases before they are ready for research and separates run completion from Case closure. These are inherited constraints rather than new permission choices.

## Q1. Seven versioned presets on one Case model

Recommendation: ship General research, Missing person, Criminal investigation, Cyber investigation, Financial investigation, GitHub and code research, and a dedicated Bug bounty preset. The last is a focused Cyber workflow, not a separate data model.

Proposed glossary definition: a Case template is a versioned configuration preset for intake, suggested organization, relevant capabilities, and review guidance. It uses the universal Case model and grants no authority. It is distinct from a Capability pack, which groups Connectors and policy defaults, and from an executable Plugin.

Each Case records the selected template ID/version, effective configuration snapshot, and deliberate overrides. Template changes appear in Case history. The original Case records, Artifact versions, Entity identities, truth states, and grants remain independent of the preset. A Case can continue when a template is retired or absent from the library. Changing a template never silently reclassifies existing material or launches work.

Every preset begins in Draft and Suggest only. It installs no Connector, binds no credential, accepts no Finding, creates no Schedule, and enables neither active cyber nor Authorized engagement. Recommended public/user-provided source paths remain suggestions; other source classes, credential scopes, provider disclosures, paid access, and active methods need the existing explicit review. A public source can still contain sensitive material.

Sensitivity prompts affect handling and export/disclosure review. They do not create hidden Folders or change the approved full-content visibility of Case members.

Create suggested Folders only when material makes them useful or a person chooses them. Folders reference existing material without copying or owning it. Template labels are editable organization, not new truth states. Applicable Source, Organization, Case, user, and extension rules can narrow every recommendation.

### General research

Intake covers the objective/questions, Seed information and its origin, relevant time/geography/language, included/excluded subjects, and source/disclosure constraints. Recommend web/news, documents/media, and general organization sources. Suggested organization is Sources, Working notes, and Reviewed material.

Review asks which questions the material supports, where sources share an origin, what conflicts, and what remains unknown. A copied article does not become independent corroboration. Suggested identity or technical research is added only when relevant to supplied Seeds and the approved plan.

### Missing person

Intake covers the research objective and relationship/declared authority, known identifiers/aliases, supplied images, last-known event/time zone/precision, age band or unknown age, vulnerability/consent constraints, and included/excluded sources or places. A supplied official contact or escalation reference is optional context; it does not dispatch a message.

Default to sensitive-person handling. Unknown age is not an assertion of adulthood. Recommend identity, web/news, and documents/media, with Timeline material, Candidate identities, and Contact information to review as suggested groups. Do not infer current location from an old image, metadata field, phone format, or similar username. Keep candidate people separate until the normal human merge/review path is completed.

The review checklist separates reported last-seen events from collection time, identifies conflicting sightings, and records unresolved identity or timing questions. The product does not promise a person is located or safe merely because research returned a match. Contacting anyone remains the existing separately approved engagement workflow.

### Criminal investigation

Intake covers the objective and alleged event, researcher role/jurisdiction/declared authority, event time/location with uncertainty, attributed roles in supplied records, sensitive-person constraints, and permitted/excluded record sources. Declaring an authority basis does not make the application a verifier of legal authority or unlock a private database.

Use sensitive-person defaults and require review of role assertions. Recommend documents/media, web/news, relevant public records, and identity research only where the plan needs it. Suggested groups are Statements and records, Timeline material, and Corroboration and contradictions.

Review supporting and conflicting material together. Preserve statements and alleged roles as sourced assertions. A name match, role label, or AI summary is not a guilt determination. Templates provide no guilt score, automated accusation, police-database entitlement, or shortcut around access policy.

### Cyber investigation

Intake covers the objective, typed indicators, observation/incident window, origin, ownership/authorization context, and permitted third-party disclosure. Active targets/methods belong to a separately proposed plan. Recommend infrastructure, existing cyber-intelligence lookups, relevant GitHub/code sources, and documents/media. Suggested groups are Indicators, Provider observations, and Assessment notes.

Start with supplied material and approved third-party observations. Do not automatically visit a suspicious URL, submit material for public scanning, request a provider scan, or probe a subject's infrastructure. A recursive DNS query and a passive provider lookup must remain within their declared policies. A target-contacting action uses the approved active-cyber path even when a tool describes its analysis as passive.

Review age, capture limits, coverage, provenance, and attribution separately. An old Shodan observation is not a current service measurement, and a threat-intelligence label is not proof of who controls an asset. A failed lookup appears as unavailable/restricted/degraded as appropriate, not No results.

### Financial investigation

Intake covers the objective/period, organization identifiers, relevant chain/network/address/transaction references, currency/units, source origin, handling rights, and included/excluded subjects. Mark supplied financial material sensitive and prompt for review before attributing a record to a person.

Recommend public corporate/financial records, relevant financial-identifier sources, documents, and general organization context. Suggested groups are Organizations, Transactions, and Attribution review. Preserve legal-entity identifiers, chain IDs, transaction references, currency, and time precision instead of matching by name or address text alone.

Review provider cluster labels as attributed assertions, separate similar organizations, and distinguish transaction observation from identity/ownership or criminal intent. The template does not authorize bank access, transactions, address broadcasting, sanctions determinations, or an inference of wrongdoing from a graph pattern.

### GitHub and code research

Intake covers the objective, repository/account identifiers, public or explicitly authorized private scope, selected revisions/paths/time ranges, and whether the question concerns architecture, provenance, dependencies, or security. Treat private code and exposed secrets as sensitive review material.

Recommend GitHub/code, documents, and relevant web/archive captures, with Repositories and revisions, Code and dependencies, and Review notes as suggested groups. Resolve a branch reference to a captured revision and collection time. A later branch change must not rewrite the original citation. Forks and copied files retain their shared origin.

Review code assertions separately from deployed behavior and person identity. Finding a secret does not authorize testing or using it. Comments, issues, pull requests, and public disclosure remain external actions requiring the existing engagement review; research does not post automatically.

### Bug bounty

Intake covers program/platform reference, supplied or accessible brief, original rules/scope Artifact and collection time, included/excluded assets, wildcard interpretation, allowed methods/windows/rates, third-party restrictions, approved accounts, objective, and report destination. Unknown scope fields may remain unknown during intake; they block any action that needs those fields.

Recommend program imports, third-party infrastructure research, relevant code, and documents. Suggested groups are Program and scope, Assets and observations, and Reproduction and report drafts. Use sensitive handling for private program details and reproduction material. A program import neither grants testing authority nor establishes platform API entitlement.

Prepare an active plan only after human scope review, using exact admitted engine/template versions, targets, exclusions, schedule, credentials, rate, and request limits. No target set, traffic budget, or active approval is filled in by selecting the preset. Scope changes stop affected work for review; redirects and discovered assets cannot expand scope. The same active workflow remains available to other Case templates when separately authorized.

Review original request/response evidence, reproduction steps, impact, unresolved interpretations, tool versions, and report scope. Scanner output stays a tool assertion until reviewed. Duplicate suggestions are advisory. Report submission uses the separate exact-content/account/destination approval. The template does not promise acceptance, bounty payment, or a valid vulnerability.

## Q2. Starter Research-plan ceilings

Recommendation: use one conservative first-pass profile across presets. Choosing a template does not start this plan or change Suggest only. A person must still approve actions or a bounded executable plan under the existing autonomy rules.

The proposed first-pass ceilings are ten elapsed minutes, 20 Connector actions, 100 network requests, 100 MiB of logical stored output, 50 output Artifacts, 500 Observation records, Pivot depth one, and three parallel branches. These are ceilings, not goals or required spend. They apply to the parent and all subagents together. Redirects, pagination, browser subresources, retries, and external-tool traffic consume the actual applicable network and cost budgets; they are not free work hidden inside one tool call.

Unapproved new charges remain zero. AI use follows the explicitly selected provider and run budget already approved by the user, rather than pretending every model call is free or giving it an unlimited budget. Paid sources need their own visible approved cap. A template cannot configure shared commercial keys, buy a plan, or approve overages.

Already supplied Case material is not retroactively limited to 100 MiB. Research output and processing limits remain explicit, including decompressed content and typed output, so one large response cannot bypass them. Reaching a limit records retained material and missing coverage, then follows the approved pause/partial-outcome rules. An incomplete capture is never labeled complete to fit a ceiling.

The user may prepare a broader plan with reviewed scope/budget changes. Do not silently increase the profile for a Case type, start recurring research, or replace unavailable sources. This proposal sets a starting point, not a lifetime Case quota or a limit on a later authorized investigation.

## Q3. Progressive intake with explicit unknowns

Recommendation: let users create and organize a draft with partial information, then require the specific fields and authority needed before each action. Show a short initial form and reveal relevant sections as Seeds and objectives are added.

Common intake starts with a title/objective draft, selected template, supplied Seeds and origin, and relevant scope questions. Unknown, not supplied, and not applicable remain distinct. A date/time may be approximate or an interval. Do not invent a full timestamp, adult age, identifier ownership, jurisdiction, or permission to make a form appear complete.

An intake value is a user assertion with its origin and edit history. It becomes a sourced Claim, Entity reference, or Timeline event only through the normal declared mapping/promotion path. Template field names never turn free text into a verified Finding. Template-specific metadata uses shared typed fields and references; it does not create seven incompatible Case schemas.

Before network/tool execution, the current host still validates the authorization profile, input versions, sensitivity, Source policy, exact Connector/version, credential scope, data disclosure, budgets, and required approvals. Missing scope for an active action blocks that action, not unrelated note-taking or review of already available material. Sensitive-person review requirements cannot be waived by leaving an intake field blank.

## Q4. Private customization and template versions

Recommendation: provide maintainer-curated built-in/public presets and private device/personal/Organization clones using the same non-executable configuration format. Accountless local customization works on the device. Any synchronized library follows the existing paid identity, sharing, and access rules.

Clones may adjust names, guidance, suggested organization, supported intake fields, recommended packs, and proposed starting ceilings within current policy maxima. A larger recommended budget still needs explicit plan review and cannot widen an existing run or grant. Clones reference only known safe field types and component identifiers. They cannot contain executable expressions, arbitrary schema compilation, scripts, credentials, package installers, permission grants, or automatic outreach/research triggers. Treat guidance as subordinate instruction content, not permission, and render it without executable markup. A helper that executes code still follows the Plugin policy. A template is a core configuration preset, not a fifth extension type or a new unreviewed public catalog.

Do not copy live Case facts into reusable defaults automatically. When a user deliberately saves a preset from a Case, preview its configuration, remove actual subjects/material/credentials by default, and require explicit treatment of any remaining sample content under the existing disclosure rules. Sharing a private template does not share its originating Case.

Publish immutable template versions and pin effective snapshots in Cases. Adopting an update requires a reviewed delta showing changed fields, guidance, recommended destinations, and limits. Preserve populated values and existing records; never delete material, broaden grants, or rerun research on update. Tighter controls still take effect where current host policy independently requires them. Removal of a template cannot make its Case unreadable.

## Q5. Optional guidance, review, and completion

Recommendation: show concise optional checklists tailored to the preset, with links into existing Briefing, Sources, Graph/Timeline/Map, live work, and Report views. Keep the complete underlying Case workflow available. Guidance may recommend a next step, not silently execute it or present a procedural checklist as a factual conclusion.

Run completion reports actual coverage and complete/partial/no-results outcomes. A run ending does not resolve a Lead, complete another actor's Task, accept Findings, or close the Case. A human records the Case outcome, including unresolved or stopped investigations, and chooses closure through the existing lifecycle. A template must not invent a solved percentage or insist that all questions have been answered before a Case can be closed with an honest reason.

Before a Report is approved, show its included object versions, citations, review states, capture limits, contradictions, redactions, missing coverage, and outstanding interpretations. A new contradiction flags affected review and Report drafts without erasing prior material or rewriting earlier approved snapshots. No template auto-promotes AI conclusions or guarantees identity, guilt, attribution, legal admissibility, vulnerability acceptance, or payment.

Mobile keeps the existing focused scope: draft intake, notes/selected media, readable cited material and review, run status/control, reviewed Report reading, and context-preserving handoff. A review action appears only when its full supporting comparison is usable and current host permission exists. Complex graph editing, ambiguous Entity merges, advanced Report composition, and complex active-scope review continue on web/Electron initially. Preserve selected objects, filters, draft, and Case identity during handoff; show no dead mobile controls.

The registry records each template's review focus and a distinct synthetic scenario. These are future acceptance requirements, not an assertion that the native clients or live integrations pass today.

## Shared implementation acceptance

Every template must pass the same accountless local and managed command semantics, with web/Electron parity and the supported mobile paths:

- Create an incomplete draft without an account or paid action. Preserve Seed origin, unknown fields, and sensitivity prompts.
- Select a recommended Connector with missing runtime/key/entitlement. Show the correct status and fallback proposal; install nothing and grant no authority.
- Approve a bounded synthetic plan. Preserve Artifact versions, Observation origin, collection/source times, and all discovery lineage. Shared child work consumes the same remaining limits.
- Reach a request/output/time ceiling or lose a source. Preserve acknowledged outputs and label partial/unavailable/no-results accurately. Resume only under the existing checkpoint and authority rules.
- Recommend a Claim or identity match. Keep it separate from an accepted Finding and require the authorized human review path. Contradictions retain originals and prior versions.
- Draft and review a Report. Its citations open exact retained versions; exports respect redaction, retention, and current permissions. It is not submitted externally by template selection or run completion.
- Capture material offline on mobile. Keep it pending until the authoritative host accepts it; retry without duplication. Handoff preserves context and never launches an offline Research request silently.
- Update, clone, retire, or remove a template. Existing Case content, identity, version history, authority, and readable effective snapshot survive. No cross-Case facts or grants leak through a clone.

## Scenario acceptance by preset

General research must retain source lineage when two articles share an origin and flag a conflicting date. Missing-person research must keep a similar profile and old image metadata as uncertain candidates without asserting current location or contacting someone. Criminal research must retain a statement and a contradictory dated record without scoring guilt or merging names automatically.

Cyber research must distinguish an old provider observation from current measurement and an unavailable provider from No results, without probing a target implicitly. Financial research must retain chain/currency identifiers and keep a provider's cluster attribution separate from person ownership or intent. GitHub research must keep citations pinned to commit A after a branch moves to B and recognize a fork as a copied origin.

Bug-bounty research must preserve the original scope Artifact, stop affected work when scope changes, deny an excluded redirect, retain permitted reproduction material, and leave final submission separately approved. Every scenario requires explicit human Report review and a recorded outcome with unresolved limitations.

The declaration check is `node docs/planning/check-investigation-templates.mjs`. It verifies the seven-preset set, shared defaults, catalog references, scenario declarations, and invalid examples. It does not contact a Source, execute a Research run, evaluate real permissions, or replace client/host acceptance tests.

## Pending decisions

The five choices are the preset set, starter limits, progressive intake, private customization/versioning, and optional guidance/review criteria. None is approved yet. The proposed Case-template definition belongs in the root glossary when resolved; this draft changes no glossary term silently. Licensing, release slicing, and broader governance remain with the final existing decision ticket.
