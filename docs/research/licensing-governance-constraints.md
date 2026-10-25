# Licensing, governance, and disclosure constraints

Primary sources checked on 2026-10-25. This is planning evidence, not legal clearance, a rights audit, or authorization to change licenses.

## Current position and proposed boundary

The root [LICENSE](../../LICENSE) currently contains the Unlicense. No license change is authorized. The [existing architecture decision](../adr/0001-local-first-clients-with-private-managed-cloud.md) keeps the paid managed backend private and publishes clients and the local runtime.

Planning recommendation: consider Apache-2.0 for future project-owned original public client/local-runtime code only after ownership and rights review. The private backend would consume public packages. Preserve historical grants, provenance, and third-party notices; a new root label must not imply that every historical contribution or dependency has acquired new permissions.

## License evidence and integration limits

The Unlicense permits copying, modification, publication, sale, and distribution for commercial or noncommercial purposes. It dedicates copyright interests to the public domain and disclaims warranties. Its text has no equivalent to Apache's explicit contributor patent section. That textual difference does not establish that all implied patent rights are absent or resolve jurisdiction-specific effects. [Unlicense text](https://unlicense.org/#the-unlicense)

Apache-2.0 section 3 expressly grants recipients a patent license from each contributor. It covers only contributor-licensable claims necessarily infringed by the contribution alone or combined with the work to which it was submitted. Patent litigation alleging infringement by that work or an incorporated contribution, including cross-claims and counterclaims, terminates the recipient's patent licenses for that work. This is not blanket patent clearance. [Apache-2.0 sections 1 and 3](https://www.apache.org/licenses/LICENSE-2.0)

Apache redistribution requires a license copy, prominent modification notices in changed files, retention of applicable source notices, and reproduction of applicable NOTICE attributions when supplied. Section 4 permits different terms for modifications or derivatives subject to compliance. Section 5 addresses intentionally submitted contributions, subject to explicit exclusions and separate agreements. Section 6 does not grant general trademark permission. These provisions support the proposed private consumer model, subject to dependency review. [Apache-2.0 sections 4-6](https://www.apache.org/licenses/LICENSE-2.0)

Permissive and copyleft components need review by exact license, version, exceptions, modification, linking, bundling, and distribution method. ASF explains that Apache-2.0 code can enter GPLv3 works, while resulting GPL-covered derivatives cannot simply be distributed solely as Apache-2.0; GPLv2 compatibility differs. ASF's own inclusion policy is not automatically this project's policy. [ASF compatibility explanation](https://www.apache.org/licenses/GPL-compatibility.html)

Private hosting is not a universal exception. AGPLv3 section 13 requires a modified program supporting remote interaction to offer its Corresponding Source to remote users. Whether a particular integration creates a covered combined work remains a review question; a process or API boundary alone does not establish clearance. [AGPLv3 section 13](https://www.gnu.org/licenses/agpl-3.0.txt)

Code licensing does not settle rights to collected data or access to a service. OpenStreetMap separately licenses its database under ODbL and identifies separate API/tile service policies. GitHub's API terms separately restrict abusive requests and token sharing to evade rate limits. Connector review must record source-data rights, retention/export restrictions, service terms, and credentials separately from SDK/code licenses. [OSM licensing and services](https://www.openstreetmap.org/copyright), [GitHub API terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#h-api-terms)

## Contributions and ownership

DCO 1.1 certifies origin and the right to submit under the indicated license, including specified routes for prior work and forwarded contributions. It also acknowledges indefinite public retention and redistribution of the contribution record and signoff information. Git documents a `Signed-off-by: Name <email>` trailer and `git commit -s` for this certification. [DCO 1.1](https://developercertificate.org/), [Git contribution procedure](https://www.kernel.org/pub/software/scm/git/docs/SubmittingPatches.html)

A DCO signoff does not assign copyright, cure missing permissions, or automatically authorize relicensing. A CLA is a separate agreement whose wording controls its grants. For example, ASF's ICLA reserves contributors' ownership while granting copyright and patent licenses and requiring authority to contribute, including employer permission where needed. Apache licensing does not itself impose ASF's CLA process on this project. [DCO text](https://developercertificate.org/), [ASF ICLA](https://www.apache.org/licenses/icla.pdf), [Apache-2.0 section 5](https://www.apache.org/licenses/LICENSE-2.0)

## GitHub security reporting and disclosure

GitHub.com repository security advisories and private vulnerability reporting are available for public repositories. Do not assume these workflows cover the private paid backend; define and verify its private intake and incident process separately. Advisory drafts support private discussion and temporary private forks, followed by deliberate publication. [Repository advisories](https://docs.github.com/en/code-security/concepts/vulnerability-reporting-and-management/repository-security-advisories)

Public-repository private reporting remains unavailable until enabled. A `SECURITY.md` file does not enable it. Eligible repository/organization owners, security managers, or admins can configure it; anyone can report once enabled. Repository visibility alone is insufficient. This note does not establish the current repository setting. [Reporting prerequisites](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/report-privately), [Enablement and permissions](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/configure-for-a-repository)

Maintainer advisory creation requires the documented owner, security-manager, or admin role. CVE assignment is conditional, not automatic. Publication exposes current advisory data and accepted credits publicly; advisory collaborators can still see conversation history. Prefer accurate affected and fixed package versions. [Advisory creation](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/fix-reported-vulnerabilities/create-repository-advisory), [CVE and publication limits](https://docs.github.com/en/code-security/concepts/vulnerability-reporting-and-management/repository-security-advisories)

Proposed project rule: reproduce with synthetic Cases and remove Case data, personal identifiers, credentials, tokens, and sensitive logs from reports, patches, fixtures, screenshots, and published advisories. Private reporting is not permission to upload sensitive Case material. If private reporting is unavailable, use the verified private contact; a public issue may ask only for that contact, without vulnerability details. GitHub explicitly warns that such issues are immediately public. [Coordinated disclosure guidance](https://docs.github.com/en/code-security/concepts/vulnerability-reporting-and-management/coordinated-disclosure)

## Verification still required

- Audit authorship, employer/contractor rights, historical contribution terms, copied/generated material, and third-party notices before proposing any licensing transition. No migration rights are established here.
- Review exact direct/transitive dependencies and assets in actual client, local-runtime, extension, and backend artifacts. Verify notices and any source/relinking obligations against shipping bundles and hosted behavior.
- Decide DCO versus any tailored CLA after rights review; test signoff enforcement through PR, squash, rebase, coauthor, bot, and security-fix paths without inventing certifications.
- Verify the live public-repository reporting setting, reporter access, advisory permissions, private-fork access, and notification delivery to staffed maintainers using a harmless synthetic report. No settings or advisories were changed here.
- Confirm the private-backend contact, triage ownership, supported versions, disclosure approval, redaction checks, and patched-version publication. Exercise the process before promising response times or coverage.
- Recheck provider/data terms and GitHub feature eligibility before implementation or release. GNU pages timed out in the browsing tool; AGPL section 13 was independently retrieved from GNU's official plain-text license during this check.
