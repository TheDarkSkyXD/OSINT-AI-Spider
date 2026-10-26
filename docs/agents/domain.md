# Domain docs

Before exploring the repository, read the root `CONTEXT.md` and relevant decisions under `docs/adr/` when they exist.

This repository uses a single domain context:

```text
/
|-- CONTEXT.md
|-- docs/adr/
`-- src/
```

Create domain files only when terms or decisions are resolved. `CONTEXT.md` is a glossary and contains no implementation details.

Use the glossary's canonical terms in issues, tests, specifications, and code. Explicitly identify proposals that contradict an existing ADR.
