# Case workspace prototype

Throwaway UI prototype for [Prototype the case workspace and information organization](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/12).

Run from the repository root:

```powershell
node prototypes/case-workspace/serve.mjs
```

Open `http://localhost:4173/?variant=A`. Use the floating switcher or the left and right arrow keys to compare all three variants.

- `A`: Command center
- `B`: Evidence desk
- `C`: Briefing room

Selected direction: `C`, keeping the narrative-first briefing room and replacing its icon-only rail with a permanently expanded desktop sidebar. The other variants remain available as comparison artifacts.

The data is fictional and state stays in memory. This is not production code.
