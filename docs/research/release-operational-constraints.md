# Release and operational constraints

Verified against primary documentation on October 25, 2026 for [Define release engineering and operational readiness](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/27). This is source verification, not a release, restore exercise, performance measurement, or deployment. Delegated-research catalog calls did not return during this session, so the primary-source checks were completed directly.

## Supported platforms

Microsoft services individual Windows 11 releases on different schedules. Selecting Windows 11 alone is insufficient; the tested release must still be serviced. Canonical publishes separate Ubuntu LTS support periods. These support policies do not establish compatibility of this application's native binaries. [Windows lifecycle](https://learn.microsoft.com/en-us/lifecycle/products/windows-11-home-and-pro), [Ubuntu release cycle](https://ubuntu.com/about/release-cycle)

Electron supports its latest three stable major releases, with fixes applied differently across those lines. A project's year-long wire-protocol support promise cannot imply keeping an unpatched Electron binary for a year. [Electron release policy](https://www.electronjs.org/docs/latest/tutorial/electron-timelines)

Expo pairs each SDK with specific React Native, native SDK, OS, and Xcode requirements. Its inspected table lists an Android 7 and iOS 16.4 floor for the documented SDKs, but a project can select a narrower tested device baseline. Android 12 and iOS 18 in the proposal are project choices, not upstream requirements. Store submission SDK requirements need another check at release time. [Expo compatibility matrix](https://docs.expo.dev/versions/latest/#support-for-android-and-ios-versions)

## Updates and signed artifacts

Electron's built-in autoUpdater supports Windows and macOS, with packaging-specific behavior on Windows. It has no built-in Linux updater and recommends the distribution package manager. A successful download does not mean a running application has installed the update. [autoUpdater platform behavior](https://www.electronjs.org/docs/latest/api/auto-updater)

Forge documents Windows signing and hardware-backed or cloud signing arrangements. Its example certificate configuration is not proof that this project's signing identity, eligibility, protected workflow, or packaged runtime has been qualified. [Forge Windows signing](https://www.electronforge.io/guides/code-signing/code-signing-windows)

Expo runtime versions associate an update with compatible native code. Changing native code requires another native build. EAS Update offers client-verified signatures, but its hosted signing feature has a documented plan restriction. Signed store builds are a simpler launch distribution choice than assuming every JavaScript update is safe or free to distribute. [Runtime compatibility](https://docs.expo.dev/eas-update/runtime-versions/), [EAS Update signing](https://docs.expo.dev/eas-update/code-signing/)

Project inference: use platform-specific signed distribution, verify every promotion against the same recorded candidate identity, and install only at a safe run boundary. Native encryption or permission changes need the native release path. Do not assume the downloaded mobile store wrapper has the identical digest as the submitted signed artifact; preserve the store submission identity and transformation evidence too.

## GitHub release protection

GitHub environment wait timers accept 1 through 43,200 minutes. A seven-day hold is 10,080 minutes. GitHub Free, Pro, and Team restrict environment required reviewers and wait timers to public repositories. A configuration that works in this public repository therefore does not prove the same enforcement in the private managed repository. [GitHub environment protection](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments)

Project inference: before a private deployment can ship, verify an eligible plan or an equivalent protected deployment controller that enforces immutable artifact age and approval outside the candidate job's control. A shell delay or unchecked timestamp is not an equivalent authorization boundary. Keep the already approved npm dependency-age, stage-only publication, malware-scan, and human-approval rules from [the npm security decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/23).

## Recovery and consistency

PostgreSQL continuous archiving combines a base backup with a continuous WAL sequence. Ordinary logical dumps cannot serve as the base for WAL recovery. Physical point-in-time recovery restores a cluster, rather than selecting one Case. [PostgreSQL continuous archiving](https://www.postgresql.org/docs/current/continuous-archiving.html)

Project inference: restore a Case through an isolated recovery environment and controlled extraction, using the approved history/identity rules. Database recovery alone does not restore separately stored Artifact objects, keys, retention decisions, or search projections. A usable recovery point needs compatible database and Artifact watermarks and must reapply deletion and revocation records before access. Validate whole-Case references, not only whether PostgreSQL starts. These requirements follow the approved [storage and portability decision](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/15).

## Targets, telemetry, and remaining uncertainty

Google's SRE workbook treats service objectives and error budgets as tools for prioritizing reliability work. It does not prescribe this project's numerical uptime, restore, or latency promises. The proposal's 99.9%, 15-minute loss window, eight-hour recovery, and performance budgets are engineering choices that still need measurement, staffing, and cost validation. [Implementing SLOs](https://sre.google/workbook/implementing-slos/)

OpenTelemetry says instrumentation cannot determine which application data is sensitive. It recommends collecting only what is needed and provides filtering/redaction tools. Hashing predictable identifiers does not necessarily anonymize them. [Handling sensitive data](https://opentelemetry.io/docs/security/handling-sensitive-data/)

Project inference: use allowlisted operational attributes, synthetic probes, and content-free metrics. Keep Case history separate from short-lived service logs. Local diagnostic uploads need deliberate consent and inspection. Exact retention periods, hosting geography, and incident-response targets are product choices in this decision, not requirements established by these sources.

Unproven items remain actual installer signing and updates, the private deployment gate, native platform/device coverage, consistent off-site restores, deletion propagation, on-call readiness, benchmark results, and the economics of the approved subscription targets. No provider contract or compliance certification is inferred from a region name or framework feature.
