import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const policy = JSON.parse(readFileSync(new URL('./release-stage-policy.json', import.meta.url), 'utf8'));
const catalog = readFileSync(new URL('./initial-connector-catalog-proposal.md', import.meta.url), 'utf8');
const catalogIds = [...catalog.matchAll(/^\| (C\d{2}) \|/gm)].map(match => match[1]);
const operations = JSON.parse(readFileSync(new URL('./release-readiness-targets.json', import.meta.url), 'utf8'));
const templates = JSON.parse(readFileSync(new URL('./investigation-template-defaults.json', import.meta.url), 'utf8'));

function verify(value) {
  assert(['draft', 'approved'].includes(value.status));
  assert.equal(value.implementationVerified, false, 'Planning cannot claim implementation proof');
  assert.equal(new Set(value.decisions).size, 6);
  assert.equal(value.license.changesLicenseNow, false);
  assert.equal(value.license.preserveHistoricalGrants, true);
  assert.equal(value.license.thirdPartyAndDataReviewSeparate, true);
  assert.equal(value.contributions.ownershipAssigned, false);
  assert.equal(value.authority.independentCriticalReview, true);
  assert.equal(value.authority.independentReleaseApproval, true);
  assert.equal(value.authority.agentCanApprove, false);
  assert.equal(value.authority.unassignedRolesBlockPromotion, true);
  assert.equal(value.reporting.privateBackendIntake, 'separately-verify');
  assert.equal(value.reporting.automaticPublication, false);
  assert.equal(value.reporting.caseDataInReports, false);
  assert(value.support.sdkProtocolMonthsAfterSuccessorGaMinimum >= 12);
  assert.equal(value.support.archiveReadabilityRequired, true);
  assert.equal(value.release.publicBuildNeedsPrivateRepository, false);
  assert.equal(value.release.managedBackendPublic, false);
  assert.equal(value.release.webElectronParity, true);
  assert.equal(value.release.permanentCatalogScopeChange, 'explicit-user-decision');
  assert.equal(value.release.productionChangesNow, false);
  assert.deepEqual([...value.catalogTarget].sort(), [...catalogIds].sort(), 'Catalog scope must match the approved target');
  assert.equal(value.catalogTarget.length, 33);
  assert.equal(value.evidenceFields.length, 7);
  const gates = new Map(value.gates.map(gate => [gate.id, gate]));
  assert.equal(gates.size, value.gates.length, 'Duplicate gate');
  for (const gate of value.gates) assert(gate.role && gate.requires && gate.measurement === 'not-run', 'Gate needs an owner role and unmeasured requirement');
  const stages = new Map();
  const usedGates = new Set();
  for (const stage of value.stages) {
    assert(!stages.has(stage.id), 'Duplicate stage');
    for (const prior of stage.after) assert(stages.has(prior), 'Prerequisites must precede the stage');
    const inherited = new Set(stage.after.flatMap(prior => [...stages.get(prior)]));
    for (const gate of stage.gates) { assert(gates.has(gate), `Unknown gate ${gate}`); inherited.add(gate); usedGates.add(gate); }
    stages.set(stage.id, inherited);
  }
  assert.deepEqual([...stages.keys()], ['foundation', 'local-alpha', 'public-beta', 'managed-preview', 'local-ga', 'managed-ga']);
  assert.equal(usedGates.size, gates.size, 'Unattached gate');
  for (const id of ['rights', 'seven-templates', 'catalog-complete', 'update-trust', 'release-approval']) assert(stages.get('local-ga').has(id));
  assert(!stages.get('local-ga').has('managed-preview'), 'Managed preview cannot block Local GA');
  for (const id of ['catalog-complete', 'private-build-isolation', 'billing-collaboration', 'production-operations']) assert(stages.get('managed-ga').has(id), `Managed GA missing ${id}`);
  assert.equal(templates.templates.length, 7);
  assert.equal(templates.status, 'approved');
  assert.equal(operations.reliability.preLaunchObservationDays, 30);
  assert.match(operations.incidents.productionCoverage, /24\/7/);
}

verify(policy);
const invalid = [
  ['license replacement', value => { value.license.changesLicenseNow = true; }],
  ['revoked historical grants', value => { value.license.preserveHistoricalGrants = false; }],
  ['DCO ownership assignment', value => { value.contributions.ownershipAssigned = true; }],
  ['agent approval', value => { value.authority.agentCanApprove = true; }],
  ['self-approved critical changes', value => { value.authority.independentCriticalReview = false; }],
  ['private source required by public build', value => { value.release.publicBuildNeedsPrivateRepository = true; }],
  ['reduced catalog target', value => { value.catalogTarget.pop(); }],
  ['claimed measured gate', value => { value.gates[0].measurement = 'passed'; }],
  ['early managed GA', value => { value.stages[5].after = ['foundation']; }],
  ['unverified private-backend intake', value => { value.reporting.privateBackendIntake = 'assumed-public-github'; }]
];
for (const [name, mutate] of invalid) { const copy = structuredClone(policy); mutate(copy); assert.throws(() => verify(copy), undefined, name); }

const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Proposed release stages</title><style>body{margin:0;font:14px/1.5 var(--font-sans,system-ui);color:var(--foreground,#ddd)}p{margin:0 0 16px;color:var(--muted-foreground,#aaa)}ol{list-style:none;padding:0;margin:0;display:grid;gap:10px}li{border:1px solid var(--border,#555);border-radius:var(--radius,8px);padding:16px;background:var(--card,#222)}h2{font-size:16px;margin:0 0 4px}small{color:var(--muted-foreground,#aaa)}li p{margin:4px 0 8px}footer{margin-top:16px;font-size:12px;color:var(--muted-foreground,#aaa)}</style><p>Proposed sequence. Every required gate needs measured evidence before promotion. All ${policy.gates.length} gate declarations are currently not-run.</p><ol>${policy.stages.map((stage, index) => `<li><h2>${index + 1}. ${escape(stage.name)}</h2><small>${escape(stage.kind)} · ${stage.gates.length} direct gates · ${stage.after.length ? `after ${stage.after.map(id => escape(policy.stages.find(item => item.id === id).name)).join(' + ')}` : 'starting proof'}</small><p>${escape(stage.summary)}</p><details><summary>Required evidence</summary><ul>${stage.gates.map(id => `<li>${escape(policy.gates.find(gate => gate.id === id).requires)}</li>`).join('')}</ul></details></li>`).join('')}</ol><footer>Six policy choices await user review. Local GA and Paid managed GA have separate approvals. No dates, release qualification, license changes, or production actions are implied.</footer></html>\n`;
const visualPath = new URL('./release-stages.html', import.meta.url);
if (process.argv.includes('--render')) writeFileSync(visualPath, html);
else assert.equal(readFileSync(visualPath, 'utf8'), html, 'Regenerate visual with --render');
console.log(`Release policy: ${policy.stages.length} stages, ${policy.gates.length} unmeasured gates, ${policy.catalogTarget.length} catalog targets, ${invalid.length} invalid declarations rejected.`);
console.log('Declaration consistency only. No legal clearance, staffing, actual release gates, or live settings were verified.');
