# Investigation workflow validation

Status: planning prototype exercised October 15, 2026. Awaiting the user's workflow verdict.

The prototype now uses the requested grayscale dark theme. After the styling update, all six 13-step paths completed again in the browser. The theme update does not resolve the outstanding workflow verdict.

Decision ticket: [Validate end-to-end investigation workflows across case types](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/19).

Interactive artifact: [Investigation workflow walkthroughs](../../prototypes/investigation-workflows/index.html).

## Scope of the result

The prototype uses one Case state model and six fictional datasets. Its browser controls exercise Case creation, Seed information, a bounded approved Research plan, collection, Folder organization, sourced Claims, a proposed Relationship, summary versions, human review, a case-specific complication, run completion, and a reviewed Report snapshot.

The Web and Electron selectors use the same page and reducer. Running both modes checks that the planned workflow has no product-feature split. It does not validate separate Electron binaries, browser integrations, native Runners, AI providers, synchronization, real collection, source licensing, security enforcement, or operating-system behavior. No production application exists yet.

Source previews and browser activity are fixture content. Integrity is explicitly unevaluated because the fixtures do not contain preserved original source bytes. Citations resolve to the simulated Artifact version and passage represented in the page.

## Shared workflow

1. Create a Case with its type and objective.
2. Add user-provided starting material with its origin preserved.
3. Review a bounded read-only plan with scope, instructions, Skills, model, and shared budget.
4. Start a Research run and inspect its parent and specialist subagents.
5. Preserve source material and its capture limits.
6. Organize references into Folders and attach sourced Claims and proposed Relationships.
7. Generate a cited Case summary with unreviewed statements labeled.
8. Accept a supported Claim through investigator review.
9. Introduce contradictory material or another investigation-specific complication.
10. Review another Claim on its own supporting material.
11. Generate a new summary version without rewriting the old version.
12. Complete the bounded Research run while leaving the Case Active.
13. Prepare a Report snapshot from current accepted Findings, listing unresolved material separately.

Case summary generation remains available before investigator acceptance. The summary describes what the material supports and what is unresolved. A reviewed Report has a different inclusion rule.

## Scenario observations

Each guided path completed all 13 steps in both simulated client modes. Each produced two summary versions, preserved the first version's unreviewed labels, and completed its Research run without declaring the Case solved.

| Scenario | Difficult case | Observed result |
| --- | --- | --- |
| Missing person | A later witness note conflicts with a station time window | The first Claim returns to review. Original material and prior summary versions remain. The later Report contains only the unaffected reviewed Claim. |
| Criminal | A later export reports a camera-clock offset | The correction becomes separate source material. Review of the affected Claim reopens. Its earlier acceptance remains in history. |
| Cyber | A discovered hostname falls outside an active-target grant | A proposed scope expansion is recorded. No active probe is dispatched. Passive infrastructure observations remain usable. |
| Financial | A common name suggests two people might be the same | A match remains a candidate. No automatic Entity merge occurs, and a counterparty record does not establish intent or ownership. |
| GitHub research | Source text instructs the agent to upload secrets | The instruction attempt remains source content. The simulated plan and grants do not change. README claims remain claims about advertised capability, not proof of execution. |
| General research | A captured page omits part of the source | The excerpt limit and information gap remain visible. No Claim is fabricated for the missing section. |

The missing-person and criminal paths finish with three Artifacts and one current accepted Finding in the Report. The other paths finish with two Artifacts and two accepted Findings. Accepted Findings describe what the cited source actually says or shows; they do not convert the source's underlying allegation into established truth.

## Interruptions and awkward action orders

The following observations came from the browser interface and rendered state:

- Collection before Case creation is blocked with an explanation.
- An agent attempting to accept a Finding is blocked, with no Finding created.
- Repeated fixture collection does not duplicate captured material.
- A model switch preserves the two captured Artifacts and the remaining 17-action budget, records the prior model in a public checkpoint, and prepares the new model's continuation in Paused state. Resume returns it to Running.
- Removing the Runner moves active work to Waiting and blocks collection.
- An offline Stop leaves the simulated remote run Running and reports that Stop is undelivered. An online Stop cancels the run while retaining captured material.
- A Research request drafted offline stays unstarted after reconnection. Review and Send starts it once prerequisites are present.
- Citations open the expected source title, version, and passage. The receipt citation opens the receipt and Page 1 reference.
- Summary version 1 retains Needs review labels after later review and contradiction. Version 2 shows the changed review state.
- Case history search finds the recorded reopening of review.
- Unfinished intake text survives a client-mode change.

These are observations of a planning model, not acceptance tests for a production system.

## Mobile scope

At a 390 by 844 viewport, the walkthrough shell fits without horizontal page overflow. This establishes only a basic layout observation. It does not establish human usability, native accessibility, or supported-device coverage.

| Mobile workflow | Prototype disposition | Remaining validation |
| --- | --- | --- |
| Add a note or supplied material | Candidate focused action | File picker, camera, interrupted upload, and user comprehension on real devices |
| Read a Case summary or source preview | Candidate readable view | Large text, screen-reader navigation, image inspection, and long documents |
| Inspect current research status and request pause or stop | Candidate controls | Network delivery, acknowledgement, recovery, and real execution-host integration |
| Read parent and subagent activity | Candidate compact view | Long streams, multiple branches, and small-screen comprehension |
| Complex graph editing | Omitted from the mobile demonstration | Continue on web or Electron unless a future design passes the mobile criteria |
| Advanced Report composition | Omitted from mobile actions | Continue on web or Electron with the same reviewed material |

The graph handoff retains the Case, two Artifacts, two Claims, and the current guided step. The Report handoff retains the Case and accepted Findings, then completes on web. Handoffs in this prototype change a view mode on the same page; cross-device navigation and synchronization remain implementation work.

## Findings for the product specification

- The same Case structure can express these six bounded examples. Templates change starting material, source scope, Folder suggestions, and relevant complications rather than requiring six separate Case models.
- Contradictions must reopen the affected review and remain traceable through historical summaries. Export preparation checks current review state rather than copying an older summary.
- The Timeline needs a distinction between claimed event time and the time material entered Case history. This prototype preserves that distinction in source content and history order but does not implement a full Timeline UI.
- Source capture limits must stay visible in previews, summaries, and later Reports. The fixtures exercise excerpt limits without claiming real capture or digest verification.
- Mobile availability is determined per complete task. Readable review and field intake are candidates. Dense editing can hand off to web or Electron without losing the Case context.

## Still awaiting validation

The user must decide whether the shared workflow fits the intended investigative experience. Real connector selection remains with [Choose the initial bundled and verified connector catalog](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/22). Paid limits remain with [Define subscription plans, entitlements, and metered usage](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/21).

Implementation must later verify actual collection and normalization, provider integration and handovers, durable history, version-specific citations, original-content integrity, authorization, synchronization, desktop and browser parity, mobile usability, accessibility, performance, and recovery. The prototype does not replace those checks.
