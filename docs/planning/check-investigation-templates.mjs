import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const registry = JSON.parse(readFileSync(new URL('./investigation-template-defaults.json', import.meta.url), 'utf8'));
const catalog = readFileSync(new URL('./initial-connector-catalog-proposal.md', import.meta.url), 'utf8');
const candidates = new Set([...catalog.matchAll(/^\| (C\d{2}) \|/gm)].map(match => match[1]));
const requiredTemplates = ['general-research', 'missing-person', 'criminal-investigation', 'cyber-investigation', 'financial-investigation', 'github-code-research', 'bug-bounty'];

function verify(value) {
  assert(['draft', 'approved'].includes(value.status), 'Unknown decision status');
  assert.equal(value.implementationVerified, false, 'This registry cannot claim implementation verification');
  assert.equal(new Set(value.decisions).size, 5, 'Expected five decision groups');
  const policy = value.common;
  assert.equal(policy.caseModel, 'universal', 'Templates must use one Case model');
  assert.equal(policy.initialCaseStatus, 'draft');
  assert.equal(policy.defaultAutonomyMode, 'suggest_only');
  assert.equal(policy.authorityCheck, 'current_authoritative_host_policy');
  for (const key of ['autoGrantConnectors', 'autoStartResearch', 'autoStartSchedules', 'activeCyberEnabled', 'externalEngagementEnabled', 'autoAcceptFindings']) {
    assert.equal(policy[key], false, `${key} cannot be enabled by a template`);
  }
  assert.equal(policy.unapprovedNewChargesUsdMaximum, 0);
  assert.equal(policy.templateUpgrade, 'explicit_reviewed_delta');
  assert.equal(policy.customization, 'private_configuration_only');
  for (const limit of Object.values(policy.starterPlan)) assert(Number.isInteger(limit) && limit > 0, 'Starter limits must be positive integer ceilings');
  const ids = value.templates.map(template => template.id);
  assert.deepEqual([...ids].sort(), [...requiredTemplates].sort(), 'Template set is incomplete or duplicated');
  const scenarios = new Set();
  for (const template of value.templates) {
    assert.match(template.version, /^\d+\.\d+\.\d+$/);
    for (const forbidden of ['caseModel', 'defaultAutonomyMode', 'grants', 'credentials', 'script', 'code']) assert(!Object.hasOwn(template, forbidden), `Forbidden template authority/executable field: ${forbidden}`);
    for (const field of ['intake', 'sensitivityDefaults', 'suggestedPacks', 'suggestedFolders', 'reviewFocus']) assert(template[field].length > 0, `Missing ${field}`);
    for (const id of template.candidateConnectors) {
      assert(candidates.has(id), `Unknown catalog candidate: ${id}`);
      assert(Number(id.slice(1)) < 31, 'Active tools cannot enter default research recommendations');
    }
    for (const id of template.optionalActiveCandidates) assert(candidates.has(id) && ['C31', 'C32', 'C33'].includes(id), 'Unknown optional active candidate');
    assert(template.scenario.seed && template.scenario.awkward, 'Scenario needs a seed and a concrete failure case');
    assert(!scenarios.has(template.scenario.id), 'Scenario IDs must be distinct');
    scenarios.add(template.scenario.id);
    for (const expectation of ['preserve-source-lineage', 'human-report-review']) assert(template.scenario.expected.includes(expectation), `Missing ${expectation}`);
  }
  for (const required of ['current-authority-before-dispatch', 'shared-parent-budget', 'template-update-preserves-case', 'no-automatic-case-closure']) assert(value.sharedAcceptance.includes(required), `Missing shared acceptance: ${required}`);
}

verify(registry);
const invalidExamples = [
  ['automatic grants', value => { value.common.autoGrantConnectors = true; }],
  ['automatic Findings', value => { value.common.autoAcceptFindings = true; }],
  ['template-specific authority', value => { value.templates[0].caseModel = 'separate-general-case'; }],
  ['raw credentials', value => { value.templates[0].credentials = 'synthetic-secret'; }],
  ['active defaults', value => { value.templates[0].candidateConnectors.push('C31'); }],
  ['unknown source', value => { value.templates[0].candidateConnectors.push('C99'); }],
  ['silent template update', value => { value.common.templateUpgrade = 'automatic'; }],
  ['claimed runtime proof', value => { value.implementationVerified = true; }]
];
for (const [name, mutate] of invalidExamples) {
  const invalid = structuredClone(registry);
  mutate(invalid);
  assert.throws(() => verify(invalid), undefined, `Checker failed to reject ${name}`);
}
console.log(`Template registry: ${registry.templates.length} presets, ${registry.sharedAcceptance.length} shared acceptance requirements, ${invalidExamples.length} invalid declarations rejected.`);
console.log('This checks planning declarations and catalog references only. It does not execute research, validate live sources, prove authorization, or run client acceptance tests.');
