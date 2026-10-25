import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const targets = JSON.parse(readFileSync(new URL('./release-readiness-targets.json', import.meta.url), 'utf8'));

function verify(value) {
  assert(['draft', 'approved'].includes(value.status), 'Unknown decision status');
  assert.equal(value.measured, false, 'This planning model cannot claim measured service performance');
  assert.equal(new Set(value.decisions).size, 7, 'Expected seven distinct decision groups');
  assert.equal(value.release.normalArtifactHoldMinutes, 7 * 24 * 60, 'Ordinary hold must preserve seven days');
  assert.equal(value.release.sameArtifactPromotion, true, 'Promotions must retain artifact identity');
  assert.equal(value.release.preMigrationVerifiedSnapshot, true, 'Migration snapshot gate is required');
  assert(value.release.previousProtocolSupportMonths >= 12, 'SDK support window cannot shrink');
  const stages = value.release.stagesPercent;
  assert(stages.length >= 2 && stages.at(-1) === 100, 'Rollout must end at full promotion');
  stages.forEach((percent, index) => {
    assert(percent > 0 && percent <= 100, 'Invalid rollout percentage');
    if (index) assert(percent > stages[index - 1], 'Rollout stages must increase');
  });
  assert(value.reliability.monthlyCoreAvailabilityPercent > 0 && value.reliability.monthlyCoreAvailabilityPercent < 100, 'Availability must have a finite error budget');
  assert(value.reliability.disasterRpoMinutes < value.reliability.recoveryRetentionDays * 24 * 60, 'Recovery loss window exceeds retained history');
  assert.equal(value.reliability.recoveryRetentionDays, 30, 'Approved recovery-point retention changed');
  assert(value.reliability.disasterRpoMinutes >= 0 && value.reliability.disasterRtoHours > 0, 'Invalid recovery objective');
  assert(value.fixtures.graphProjection.entities <= value.fixtures.desktop.entities, 'Projection exceeds benchmark Case');
  assert(value.fixtures.graphProjection.relationships <= value.fixtures.desktop.relationships, 'Projection exceeds benchmark Case');
  assert.equal(value.fixtures.managed.readPercent + value.fixtures.managed.writePercent, 100, 'Managed workload mix must total 100%');
  assert(value.fixtures.managed.burstOperationsPerSecond >= value.fixtures.managed.coreOperationsPerSecond, 'Burst cannot be below steady load');
  const ids = new Set();
  for (const metric of value.performance) {
    assert(!ids.has(metric.id), 'Duplicate performance metric');
    ids.add(metric.id);
    assert(metric.maximum > 0 && metric.quantile > 0 && metric.quantile < 100, 'Invalid latency target');
    assert.equal(metric.unit, 'ms', 'Latency targets must use milliseconds');
    assert(Object.hasOwn(value.fixtures, metric.fixture), 'Unknown benchmark fixture');
    assert(metric.scope.length > 20, 'Metric needs an explicit measurement boundary');
  }
  assert.equal(value.privacy.casePayloadsInTelemetry, false, 'Telemetry cannot contain Case payloads');
  assert.equal(value.privacy.clientUploadsDefault, 'off', 'Client upload consent default changed');
  assert.equal(value.hosting.automaticCrossBoundaryFailover, false, 'Hosting boundary cannot move silently');
  assert.equal(value.hosting.externalProviderDisclosureRequired, true, 'External disclosure gate missing');
}

verify(targets);
const mutations = [
  ['artifact age', value => { value.release.normalArtifactHoldMinutes = 60; }],
  ['unrecorded rebuild', value => { value.release.sameArtifactPromotion = false; }],
  ['shortened compatibility', value => { value.release.previousProtocolSupportMonths = 1; }],
  ['unknown fixture', value => { value.performance[0].fixture = 'unmeasured-machine'; }],
  ['content telemetry', value => { value.privacy.casePayloadsInTelemetry = true; }],
  ['silent geographic failover', value => { value.hosting.automaticCrossBoundaryFailover = true; }],
  ['invented measurements', value => { value.measured = true; }]
];
for (const [name, mutate] of mutations) {
  const invalid = structuredClone(targets);
  mutate(invalid);
  assert.throws(() => verify(invalid), undefined, `Checker did not reject ${name}`);
}
const permittedFailures = 100 - targets.reliability.monthlyCoreAvailabilityPercent;
const windowMinutes = targets.reliability.measurementWindowDays * 24 * 60;
console.log(`Readiness model: ${targets.decisions.length} decision groups, ${targets.performance.length} latency targets, ${mutations.length} invalid examples rejected.`);
console.log(`A ${targets.reliability.measurementWindowDays}-day time-based ${targets.reliability.monthlyCoreAvailabilityPercent}% target would permit ${(windowMinutes * permittedFailures / 100).toFixed(1)} unavailable minutes. The defined core SLI is request-based, with synthetic probes for low traffic.`);
console.log('This validates planning consistency only. It does not run a benchmark, verify release signatures, enforce a deployment hold, or prove backup recovery.');
