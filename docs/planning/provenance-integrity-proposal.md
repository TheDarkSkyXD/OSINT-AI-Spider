# Provenance, confidence, integrity, and audit semantics

Status: accepted by the user. The resolution comment on the decision ticket is the canonical decision record; this file preserves the approved proposal.

Decision ticket: [Define provenance, confidence, integrity, and audit semantics](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/14).

This proposal carries forward the approved immutable originals, cited summaries, human acceptance of Findings, reversible merges, full sensitive-material access for Case members, and append-only Case history. It specifies how those rules work together. It does not reopen the deployment or source-authorization decisions.

## 1. Trace a statement to its source

Every substantive factual statement in a generated summary and every asserted graph Relationship references one or more Claims. Each Claim identifies its origin: investigator statement, collected Observation, or Inference. Evidence links connect it to supporting and contradicting Artifact versions. A citation identifies the exact passage, page, image region, video time range, or structured response field when available.

An inference also names the input Claims or Observations and Research run that produced it. Discovery paths remain separate from asserted real-world Relationships. Finding an account through a username search does not by itself assert that a particular person owns it.

User statements and hypotheses can exist without a collected Artifact. The interface labels them as such. An unsupported AI statement may be preserved as an unverified Inference, but it must not appear as an established result or in a Report built from accepted Findings. Questions, recommendations, and uncertainty notices do not need fabricated citations.

Clicking a summary citation or graph connection opens a compact evidence panel with the captured content, origin, collection time, review state, contradictions, and a link to the live source. Detailed provenance expands on demand.

## 2. Preserve what was actually collected

A collection record names the Source, requested and final location when applicable, capture time, actor or Runner, Research run, Connector version, policy and authorization reference, response status, media type, and content digest. Provider request IDs may be stored when safe. Credentials, cookies, authorization headers, and signed access tokens are excluded from capture metadata and logs.

Capture status explicitly distinguishes complete content, a partial capture, a screenshot, an excerpt, metadata only, and a live link without preserved content. Collection failures remain visible. The product never describes an excerpt or screenshot as a complete copy of a website.

Every capture has its own collection record even when identical bytes are deduplicated within a permitted storage boundary. Source changes create a new Artifact version. Old citations keep pointing to the version originally used. If capture is unavailable or impermissible, record the limitation rather than fabricate preserved evidence.

## 3. Keep confidence separate from review

Display source reliability, extraction or matching confidence, and investigator review state separately. Unknown is a valid value. Record the basis and producing tool or model for each assessment.

Use plain labels and explanations by default. Numerical confidence is shown only with an identified method and a description of what the number measures; an AI model's self-assessment is not presented as a calibrated probability. Repeated copies of the same underlying source are not counted as independent corroboration.

Contradicting evidence stays attached. New contradictory material flags the affected Finding and summary as needing review, without silently erasing the investigator's earlier acceptance. Version history preserves the previous assessment.

## 4. Verify integrity without claiming truth

Record a SHA-256 digest over the exact stored bytes of every original and derived Artifact. Derived material records its parent versions, transformation, tool or model version, parameters, and producing run. Verify digests on import, export, restore, and scheduled integrity checks. A mismatch marks the affected material as integrity-failed and prevents silently relying on it in new analysis or Reports.

The Case host orders history entries and records actor, action, affected object versions, authorization or exception reference, host sequence, and timestamps. Keep device-reported event time distinct from host receipt time, and preserve unknown timezones or uncertain dates rather than inventing precision.

Chain history entries cryptographically and include the chain checkpoint in exported manifests. These checks detect changes relative to a previously trusted digest or checkpoint. They cannot prove a source statement is true or prevent a host administrator from rewriting both data and its locally stored verification record. Independently witnessed timestamps and external checkpoint services remain optional future choices, not guarantees of the base product.

## 5. Explain source loss, correction, and deletion

A dead or changed live link does not invalidate the existence of an earlier preserved capture. The UI separately reports live-source availability, captured-content integrity, and the current review state of the Claim.

Corrections create new versions. Deletion removes the designated content under the applicable retention rules and leaves only a minimal history marker. Citations then show that their supporting material is unavailable. Affected summaries and Reports remain visibly linked to that limitation.

History entries should reference content rather than duplicate sensitive text or secrets, so required deletion can remove the content without retaining it in history. Revocation and deletion must also cover derived previews, indexes, caches, and backup expiry according to the later persistence decision. Integrity records must not be advertised as a means to recover intentionally deleted content.

## 6. Inspect past runs without silently rerunning them

Research-run replay means viewing the recorded actions, approvals, inputs, outputs, captures, public explanations, and errors. It does not promise identical AI output, reconstructed private model reasoning, or identical results from a changing website.

Executing research again creates a new run with its own approvals and provenance. Preserve provider, model, instruction and skill versions, input Artifact references, and available configuration needed to explain differences. A retry must not duplicate an accepted Case mutation; exact retry and cancellation transitions belong to the activity-lifecycle decision.

## 7. Export a verifiable snapshot

Each Report or Case archive records its format version, creator, export time, included object versions, citation mappings, file digests, relevant custody history, redactions, capture limitations, and history checkpoint. A verification result states which included bytes and references were checked, which failed, and which were absent.

Exports outside the Case default to redacted derivatives, as already approved. A full export requires confirmation and a history entry. Never place hidden original content, secrets, or unredacted passages in a redacted export's metadata, thumbnails, search text, or attachments. Exports do not guarantee legal admissibility.

## Review examples

- Two accounts share a username. The graph shows a candidate connection and source captures, while identity stays unresolved until reviewed.
- A page changes after a summary is generated. The earlier citation opens the original capture; new collection creates a new version and identifies the changed support.
- A source cannot be captured. Its link remains usable, with the explicit label that no content was preserved.
- A downloaded image is altered. Its integrity check fails and downstream analysis can trace which results used that version.
- A new source contradicts an accepted Finding. The previous review remains in history and the dashboard flags the Finding for renewed review.
- A redacted Report is exported. Verification covers only its included material and confirms that the export manifest has not smuggled the original content into the package.
- A user opens a past Research run. They inspect the recorded activity without issuing fresh network requests or incurring a new AI charge.

## Decisions left with their existing tickets

The persistence decision chooses storage, backup expiry, cache invalidation, deletion propagation, and key management. The identity decision chooses reviewer and exporter permissions. The activity-lifecycle decision chooses exact transitions and retry semantics. The UI prototypes test whether these evidence details remain understandable to amateur investigators. This proposal fixes their shared evidence semantics without selecting those implementations.
