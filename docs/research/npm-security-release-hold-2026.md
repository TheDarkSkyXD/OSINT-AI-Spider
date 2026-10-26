# npm security and a seven-day release hold

Research date: 2026-09-04

This note separates two different decisions: when AI OSINT Spider may adopt a third-party npm dependency, and when one of this project's own packages may become public. The controls and failure modes are different.

## Findings

- Adopt a seven-day minimum age for normal third-party dependency updates. npm has a native gate for this. npm 11.10.0 added `min-release-age`; the current npm 12 configuration accepts a number of days and refuses to resolve versions newer than that cutoff. Use `min-release-age=7`. [npm configuration](https://docs.npmjs.com/cli/v12/using-npm/config/), [npm 11.10.0 release](https://github.com/npm/cli/releases/tag/v11.10.0)
- Treat the package-manager gate as the enforcement point. Dependabot's `cooldown.default-days: 7` is useful, but it only delays version-update pull requests. Security updates are intentionally immediate. [Dependabot cooldown](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference#cooldown), [default cooldown announcement](https://github.blog/changelog/2026-07-14-dependabot-version-updates-introduce-default-package-cooldown/)
- npm does not document a native seven-day timer for publishing this project's packages. `npm stage publish` holds an existing package version until a maintainer approves it with 2FA, but the maintainer can approve as soon as npm permits approval. npm's documented steps contain no minimum staging age or scheduled promotion. This is a conclusion from the documented command behavior, not a registry guarantee. [staged publishing](https://docs.npmjs.com/staged-publishing/), [`npm stage` reference](https://docs.npmjs.com/cli/v12/commands/npm-stage/)
- A mechanically enforced publication hold is practical on this public repository. Build the release candidate once, preserve its digest, then put the job that uploads it to npm behind a GitHub environment wait timer of 10,080 minutes. GitHub supports timers up to 43,200 minutes and can combine the timer with branch restrictions, required review, prevention of self-review, and disabled administrator bypass. After the timer, use OIDC to stage the exact artifact, then require a human 2FA approval in npm. [GitHub deployment environments](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments), [managing environments](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments)
- Keep a tightly controlled emergency path for a known security fix or legal revocation. A blanket seven-day delay can preserve a known-vulnerable dependency because `npm audit fix` obeys `min-release-age`, warns, and exits nonzero when the age gate blocks the fix. [npm configuration](https://docs.npmjs.com/cli/v12/using-npm/config/#min-release-age)

## The 2026 npm security baseline

### Runtime and package manager

As of the research date, Node 24 is Active LTS and Node 22 is Maintenance LTS. Node recommends production applications use Active or Maintenance LTS lines. Node 20 is end-of-life. The project should use a patched Node 24 release and an approved npm 12.x release, then update both deliberately when security releases arrive. Do not assume that the npm bundled with a Node installer is recent enough for every control in this note. [Node.js releases](https://nodejs.org/en/about/previous-releases), [Node.js release schedule](https://github.com/nodejs/Release#release-schedule)

npm 12 made dependency install scripts opt-in and changed Git and remote-URL dependencies to opt-in. Dependency `preinstall`, `install`, and `postinstall` scripts, implicit `node-gyp` builds, and `prepare` scripts from non-registry dependencies no longer run unless approved. An unreviewed script is blocked with a warning by default; `strict-allow-scripts=true` turns that condition into an installation failure. Root-project scripts and scripts a developer invokes explicitly are outside the dependency approval decision, so reviewers must still inspect changes to this repository's own `scripts` entries. [npm 12 security defaults](https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/), [`npm ci` configuration](https://docs.npmjs.com/cli/v12/commands/npm-ci/)

Use an npm 12 project policy equivalent to:

```ini
# .npmrc
min-release-age=7
strict-npmrc=true
strict-allow-scripts=true
allow-git=none
allow-remote=none
```

Set `allow-file=none` and `allow-directory=none` too if the eventual workspace does not use local package links or tarballs. npm 12 already defaults Git and remote URL sources to `none`, but committing the rule records intent. `strict-npmrc` makes unknown npm configuration keys fail instead of producing only a warning. [npm configuration](https://docs.npmjs.com/cli/v12/using-npm/config/)

Pin the npm toolchain in the build image or other trusted bootstrap, and make an npm-version check run before any dependency installation. A project `devEngines.packageManager` rule with `onFail: "error"` is a useful second check. The required CI command should also pass `--min-release-age=7` explicitly and assert the effective value. npm's configuration precedence permits command-line and environment settings to override a project `.npmrc`, so the file alone is not an organization-level security boundary. [npm configuration precedence](https://docs.npmjs.com/cli/v12/using-npm/config/#description), [`devEngines`](https://docs.npmjs.com/files/package.json/#devengines)

### Lockfiles and install execution

Commit `package-lock.json` and require `npm ci`. The lockfile records the exact tree, source, and integrity values; `npm ci` errors if the manifest and lockfile disagree and does not rewrite either file. This prevents a broad semver range from silently changing the installed tree during a build. [package-lock format](https://docs.npmjs.com/files/package-lock.json/), [`npm ci`](https://docs.npmjs.com/cli/v12/commands/npm-ci/)

A lockfile is evidence of what the project selected, not evidence that the selection is safe. It can faithfully pin malicious bytes. Require review of every manifest and lockfile diff, and restrict edits to the dependency policy, lockfile, workflows, and install-script approvals with branch rules and CODEOWNERS. Do not cache `node_modules` in release builds. Recreate it with `npm ci` from the reviewed lockfile.

Use dependency install-script approvals sparingly. First list pending packages, inspect the package and its script, and then approve only the required package:

```text
npm install-scripts ls
npm install-scripts approve <reviewed-package>
```

The second command writes a version-pinned approval by default. Keep that pin. A name-only approval lets every future version of that dependency execute during installation. Explicit denials are name-wide. [npm install-script approvals](https://docs.npmjs.com/cli/v12/commands/npm-install-scripts/)

### Vulnerability, malware, and authenticity checks

Run these as separate required checks because they answer different questions:

- `npm audit --audit-level=high` submits the dependency tree to the configured registry's audit endpoint. A clean result means the registry returned no matching known advisory for the dependency tree npm submitted; it does not analyze package behavior. Dependency types omitted with npm's `omit` configuration are not submitted. [npm audit](https://docs.npmjs.com/cli/v12/commands/npm-audit/)
- `npm audit signatures` verifies registry signatures and available provenance attestations for installed packages. Registry signatures bind package name, version, and tarball integrity. They detect tampering between the registry and the install, but a correctly signed malicious publication still verifies. [audit signatures](https://docs.npmjs.com/cli/v12/commands/npm-audit/#audit-signatures), [registry signatures](https://docs.npmjs.com/about-registry-signatures/)
- npm provenance links a public package to its source commit and build workflow through Sigstore. npm explicitly says provenance does not guarantee an absence of malicious code. Treat missing provenance or a downgrade from trusted publishing as a review signal, not automatic proof of malware. [npm provenance and its limits](https://docs.npmjs.com/generating-provenance-statements/)
- Enable Dependabot alerts and npm malware alerts. Malware alerts currently cover npm packages, use reviewed advisories, may take time to appear, and cannot catch every malicious package. [Dependabot malware alerts](https://docs.github.com/en/code-security/concepts/supply-chain-security/malware-alerts)
- Require GitHub's dependency review action on pull requests. It compares direct and transitive dependency changes in manifests and lockfiles and can fail a pull request that introduces a known vulnerability. Pin the action itself to a reviewed full commit SHA because GitHub identifies that as the only immutable way to reference an action. [dependency review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review), [secure use of actions](https://docs.github.com/en/actions/reference/security/secure-use#using-third-party-actions)

Do not auto-merge dependency pull requests. Configure Dependabot version updates with a seven-day cooldown, grouping only where the combined diff stays reviewable. Leave security updates immediate:

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: daily
    cooldown:
      default-days: 7
```

Dependabot now applies a three-day default cooldown to version updates, so the explicit `7` is required for this policy. `allow`, `ignore`, and SemVer update rules can control normal update volume, but SemVer update restrictions do not suppress security updates. [Dependabot options](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference), [controlling updates](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/manage-your-dependency-security/controlling-dependencies-updated)

### What the seven-day dependency gate does not do

`min-release-age=7` filters the whole npm dependency tree by publication time. It does not inspect source, maintainer changes, provenance, downloads, or runtime behavior. It does not make a package safe on day eight. It only creates time for the registry, maintainers, scanners, and consumers to identify a bad release before this project selects it.

The native exceptions also need care:

- `min-release-age-exclude` accepts package names and glob patterns, not a version-specific exception.
- Excluding a package does not exempt its dependencies.
- `before` can coexist with `min-release-age`; within one configuration source, `before` wins.
- Higher-precedence CLI or environment configuration can relax a project setting.
- A registry or mirror must expose trustworthy publication-time metadata for an age decision. Test the chosen registry path rather than assuming a proxy preserves it.

These behaviors are documented in npm's current configuration reference. [npm release-age options](https://docs.npmjs.com/cli/v12/using-npm/config/#min-release-age), [npm release-age exclusions](https://docs.npmjs.com/cli/v12/using-npm/config/#min-release-age-exclude)

For comparison, pnpm also has a native age gate. Its `minimumReleaseAge` uses minutes, applies to transitive dependencies, supports package and version exceptions, and can fail when no eligible version exists. pnpm can also reject a downgrade in publication trust and recheck a loaded lockfile unless `trustLockfile` disables that pass. If the project later chooses pnpm, the equivalent seven-day value is `10080`, not `7`. Do not copy npm's unit into pnpm configuration. [pnpm dependency-resolution settings](https://pnpm.io/settings/dependency-resolution#minimumreleaseage)

## Publishing this project's packages

### Authentication and attestations

Use npm trusted publishing rather than a stored publish token. npm binds a package to a specific repository, workflow file, and optional GitHub environment, then exchanges the workflow's OIDC identity for a short-lived publish credential. It requires npm 11.5.1 or later, Node 22.14.0 or later, and a GitHub-hosted runner. Self-hosted runners are not supported. [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)

For a public package built from this public repository on GitHub Actions, trusted publishing generates provenance automatically. Automatic provenance does not apply to a package built from a private repository, and CircleCI trusted publishing does not currently generate it. Set the npm package's publishing access to require 2FA and disallow traditional tokens. Give the publish job only `contents: read` and `id-token: write`; `id-token: write` permits OIDC token minting but does not itself grant repository write access. [npm trusted-publishing limitations](https://docs.npmjs.com/trusted-publishers/#automatic-provenance-generation), [GitHub OIDC permissions](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-cloud-providers#adding-permissions-settings)

Classic npm tokens were permanently revoked in December 2025. Write-enabled granular tokens now have a seven-day default expiry and a 90-day maximum, but they remain inferior to workflow-bound OIDC for publishing. Since August 2026, bypass-2FA tokens cannot change account, package, or organization governance. npm is targeting January 2027 for removal of their direct-publish ability; that date is announced policy, not a completed control as of this research date. [granular-token limits](https://github.blog/changelog/2025-09-29-strengthening-npm-security-important-changes-to-authentication-and-token-management/), [classic-token revocation](https://github.blog/changelog/2025-12-09-npm-classic-tokens-revoked-session-based-auth-and-cli-token-management-now-available/), [bypass-2FA restrictions](https://github.blog/changelog/2026-07-31-restricting-npm-bypass-2fa-granular-access-tokens/)

This project may fall under npm's 2026 Dual-Use Content Policy because npm lists security-research utilities among its examples. If the published tarball has such capability, add `contentPolicy.class: "dual-use"` to `package.json` and include a root `DISCLOSURE` file describing the legitimate use. A declared dual-use package may not publish directly through trusted publishing. OIDC must upload it through staged publishing, followed by human 2FA approval. The declaration persists across versions. This requires a package-specific policy assessment before the first npm publication. [npm Dual-Use Content Policy](https://docs.npmjs.com/policies/dual-use/)

### Enforcing seven days before publication

For ordinary releases, use this sequence:

1. A protected release tag starts a candidate workflow. It checks out the exact commit, installs from the reviewed lockfile, tests, runs audits, executes `npm pack`, and records the tarball's SHA-512 digest. Store the tarball, digest, test result, and source commit as release-candidate artifacts.
2. A separate job references an `npm-release-hold` GitHub environment configured with a 10,080-minute wait timer. Restrict it to protected release tags, require a reviewer other than the initiator, and disable administrator bypass.
3. After the timer, download the original tarball and verify its digest. Re-run package inspection and any non-mutating scanners against that artifact. Do not rebuild a different tarball.
4. Give this post-wait job `id-token: write` and configure the npm trusted publisher for this workflow and environment with stage-only permission. Run `npm stage publish <tarball>`.
5. A maintainer downloads the staged tarball, compares its digest with the candidate record, and approves it with 2FA. As of September 3, 2026, npm disables staged approval until its publish-time malware scan finishes. [multiple trusted publishers and scan gate](https://github.blog/changelog/2026-09-03-multiple-trusted-publishing-configurations-for-npm/)

Staged publishing requires npm 11.15.0 or later and an existing npm package. It cannot stage a brand-new package, and the `npm stage` command is unaware of workspaces. Bootstrap a first publication only after the same CI wait and an explicit interactive 2FA review; configure stage-only trusted publishing before the second release. In a workspace, pack and stage each publishable package explicitly. [`npm stage` prerequisites and limits](https://docs.npmjs.com/cli/v12/commands/npm-stage/)

The seven-day timer protects the automated path, not every npm owner action. A package maintainer with interactive publishing rights can still publish locally with 2FA. Keep the npm maintainer set small, protect changes to the release workflow and environment, review npm package history, and treat an out-of-band publish as an incident. npm provides no documented setting that both permits maintainer approval and cryptographically prevents that maintainer from approving or publishing early.

The hold also cannot use public feedback to vet an unpublished tarball. Its value comes from time for internal artifact inspection, npm's malware scanning, and detection of a compromised release workflow. Without those checks, waiting seven days is ceremony.

## Emergency procedure

For a newly disclosed vulnerability whose fix is younger than seven days, require a reviewed break-glass pull request that:

1. Identifies the advisory and affected path.
2. Pins the exact fixed version in `package-lock.json`.
3. Adds the narrowest temporary `min-release-age-exclude[]` entry needed for that package. List any young transitive fixes separately because the parent exception does not cover them.
4. Runs dependency review, tests, `npm audit`, signature verification, provenance inspection where available, and a tarball diff against the last accepted version.
5. Keeps the exception until every pinned version reaches seven days, then removes it in a tracked follow-up.

Use a separate, audited publishing workflow for an urgent fix to this project's own package. Require two-person review, stage-only OIDC, npm scanning, and human 2FA approval, but permit an explicit waiver of the GitHub wait timer. A security fix should not sit behind the rule created to reduce security risk.

If a dependency or maintainer is suspected of compromise, stop installs and releases first. Preserve the lockfile and CI evidence, identify every affected direct and transitive path, rotate any credential that the package or its lifecycle script could have read, pin or revert to a known-good version, clean the package cache and workspaces used by exposed jobs, then reinstall from the reviewed lockfile. Enable and inspect npm malware advisories, and report confirmed malware to npm Security. npm validates reports, removes confirmed malware, publishes a security placeholder, and issues an advisory. [GitHub incident response](https://docs.github.com/en/code-security/tutorials/secure-your-organization/respond-to-a-security-incident), [reporting npm malware](https://docs.npmjs.com/reporting-malware-in-an-npm-package/)

For a bad version of this project's own package, revoke compromised credentials and trusted-publisher relationships, reject any pending stages, deprecate the affected version immediately, and contact npm Security for malware. Unpublication is restricted and irreversible; a used `name@version` cannot be reused even after removal. Publish a new fixed version with provenance and a clear advisory. [npm unpublish policy](https://docs.npmjs.com/policies/unpublish/), [revoking npm tokens](https://docs.npmjs.com/revoking-access-tokens/)

## Decision

Adopt the seven-day age gate for third-party dependencies once JavaScript packaging is introduced. Enforce it with npm 12, required CI, a committed lockfile, version-pinned lifecycle-script approvals, dependency review, and an explicit emergency exception process.

For this project's own npm packages, use a seven-day GitHub environment hold for ordinary release candidates, then OIDC stage-only publishing and human 2FA approval. npm staging is a valuable approval boundary, but it is not the seven-day clock. Keep an audited security-hotfix path that can waive the timer without waiving artifact identity, scanning, provenance, or human approval.
