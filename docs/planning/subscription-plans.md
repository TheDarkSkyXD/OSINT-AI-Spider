# Subscription plans and managed-service limits

Status: approved October 15, 2026.

Decision ticket: [Define subscription plans, entitlements, and metered usage](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/21).

## Keep the investigation product free locally

Free Local works without an account. It includes local Cases, the Relationship graph, agents, Skills, search, exports, and execution on the local runtime or an attached Runner. Local storage is limited by the user's device rather than a service quota.

Paid plans fund project-operated services. They add hosted web access, real-time device synchronization, managed storage, recovery, collaboration, managed jobs, and administrative controls. A subscription does not include a Codex or Claude subscription.

## Plan targets

| Plan | Monthly price | Annual price | Included service |
| --- | ---: | ---: | --- |
| Free Local | Free | Free | Accountless local use and portable Case export |
| Personal Cloud | $15 | $144 | 50 GB of managed storage, synchronization, hosted web access, cloud history, and recovery |
| Team | $25 per paid member | $240 per paid member | A two-seat minimum, pooled storage of 50 GB per paid member, collaboration, roles, team administration, and basic audit access |
| Enterprise | Custom | Custom | Organization administration, SSO, configurable policies, audit integration, contracted support, and optional project-operated dedicated environments |

Prices are launch targets. Hosting benchmarks must validate the economics before publication. Enterprise availability, recovery, and support commitments require tested operations and a contract.

## Count human access as seats

Team billing counts named people who can access managed Cases. An External collaborator with Case access consumes a paid seat. A billing owner must approve a new charge before an invitation adds a seat. Custom agents, Automation identities, and service processes do not consume seats.

Team storage is pooled across the Organization. Two members therefore receive 100 GB rather than separate 50 GB silos.

## Separate managed compute from provider charges

Each paid plan includes a bounded Managed compute allowance. The service meters project-operated worker use rather than counting Research runs because runs vary in size. The product shows an estimate before dispatch, current use while work runs, and the approved spending limit.

Local runtime and attached-Runner work does not consume Managed compute. AI subscriptions, provider APIs, commercial data sources, and third-party services remain separate charges. The product labels each charge source. It never bills an overage automatically.

The service warns before a limit and stops new chargeable activity at the limit. A user may approve an extra spending cap. Reaching a limit does not remove access to existing Case material or portable export. Benchmarks must set the included compute amounts before launch.

## Offer a bounded cloud trial

The cloud trial lasts 14 days and requires no payment card. It supports up to five people, 5 GB of shared storage, and a small hard-capped Managed compute allowance. Trial users provide their own supported AI access. The trial does not charge automatically when it ends.

Free Local remains available after the trial. Managed content follows the same subscription-exit rules as paid content.

## Preserve an exit from the service

Monthly and annual subscriptions remain active through their paid period. When service entitlement ends, new synchronization writes, managed jobs, and scheduled cloud work stop. Authorized users then receive 30 days of read-only and export access.

After that period, the service deletes primary managed Case content. Deleted content expires from eligible backups within a further 30 days. Restore procedures reapply deletion records so old backups do not reintroduce deleted material. Legal holds and applicable law may require a disclosed exception.

Managed Case history does not have a shorter plan-specific window while the Case remains stored. The service targets 30 days of managed recovery points. The project must test full restoration before advertising a recovery guarantee.

Portable Case export remains available during the exit period and opens in Free Local without a subscription. Cloud export creates an independent local Case. It does not preserve real-time synchronization.

## Validate before publication

Launch readiness requires measured storage, bandwidth, worker, support, payment, and recovery costs. Tests must establish the included Managed compute amounts, restore behavior, deletion timing, and any advertised service commitments. Until then, the prices, quotas, and time periods in this document are approved product targets rather than public guarantees.
