import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const model = JSON.parse(readFileSync(new URL('./application-architecture-model.json', import.meta.url), 'utf8'));
const allowed = {
  contracts: [],
  ports: ['contracts'],
  domain: ['domain', 'ports', 'contracts'],
  client: ['client', 'contracts'],
  view: ['view', 'contracts'],
  tokens: [],
  ui: ['ui', 'client', 'view', 'tokens', 'contracts'],
  transport: ['transport', 'domain', 'contracts'],
  adapter: ['adapter', 'ports', 'contracts'],
  native: ['native', 'contracts'],
  composition: ['contracts', 'ports', 'domain', 'client', 'view', 'tokens', 'ui', 'transport', 'adapter', 'native'],
  test: ['contracts', 'ports', 'domain', 'client', 'view', 'tokens', 'ui', 'transport', 'adapter', 'native']
};

function verify(candidate) {
  const modules = new Map();
  for (const item of candidate.modules) {
    assert(!modules.has(item.id), `Duplicate module: ${item.id}`);
    assert(Object.hasOwn(allowed, item.layer), `Unknown layer: ${item.layer}`);
    assert(['public', 'private'].includes(item.visibility), `Unknown visibility: ${item.id}`);
    assert.equal(item.path.startsWith('private:'), item.visibility === 'private', `Repository mismatch: ${item.id}`);
    modules.set(item.id, item);
  }
  for (const item of modules.values()) {
    for (const dependencyId of item.imports) {
      const dependency = modules.get(dependencyId);
      assert(dependency, `Unknown dependency: ${dependencyId}`);
      assert(item.visibility !== 'public' || dependency.visibility === 'public', `Public-to-private import: ${item.id}`);
      assert(allowed[item.layer].includes(dependency.layer), `Forbidden layer import: ${item.id} -> ${dependencyId}`);
    }
  }
  const complete = new Set();
  function visit(id, active = new Set()) {
    assert(!active.has(id), `Dependency cycle: ${id}`);
    if (complete.has(id)) return;
    const next = new Set(active).add(id);
    for (const dependency of modules.get(id).imports) visit(dependency, next);
    complete.add(id);
  }
  for (const id of modules.keys()) visit(id);
  return modules;
}

const modules = verify(model);
const negativeCases = [
  ['web-ui', 'domain', 'UI importing authoritative rules'],
  ['contracts', 'domain', 'Shared contracts importing Domain'],
  ['domain', 'local-adapters', 'Domain importing a concrete adapter'],
  ['local-host', 'managed-adapters', 'Public host importing private implementation'],
  ['web', 'test-support', 'Production importing test support'],
  ['web-ui', 'web', 'Circular UI dependencies']
];
for (const [from, to, reason] of negativeCases) {
  const invalid = structuredClone(model);
  invalid.modules.find(item => item.id === from).imports.push(to);
  assert.throws(() => verify(invalid), undefined, `Checker failed to reject ${reason}`);
}
assert.equal(model.decisions.length, 5, 'Expected five architecture choices');
assert.equal(new Set(model.routes.map(route => route.id)).size, 4, 'Expected four distinct runtime routes');
assert.equal(modules.get('domain').visibility, 'public');
console.log(`Architecture model: ${modules.size} modules, ${model.routes.length} runtime routes, ${negativeCases.length} forbidden examples rejected.`);
console.log('This checks the declared dependency model. It does not inspect source imports or prove runtime isolation, packaging, or platform compatibility.');

const template = readFileSync(new URL('./application-architecture-view.template.html', import.meta.url), 'utf8');
const html = template.replace('__ARCHITECTURE_ROUTES__', JSON.stringify(model.routes).replaceAll('<', '\\u003c'));
const renderedPath = new URL('./application-architecture.html', import.meta.url);
if (process.argv.includes('--render')) {
  writeFileSync(renderedPath, html);
  console.log('Rendered application-architecture.html from the reviewed model and template.');
} else {
  assert.equal(readFileSync(renderedPath, 'utf8'), html, 'Route visual is stale. Run this command with --render.');
}
