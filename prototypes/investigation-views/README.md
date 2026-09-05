# Investigation views prototype

Throwaway UI prototype for [Prototype graph, timeline, map, search, and live-agent views](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/13).

Run from the repository root:

```powershell
node prototypes/investigation-views/serve.mjs
```

Open `http://127.0.0.1:4174/?variant=A`. Use the floating switcher or the left and right arrow keys to compare the variants.

- `A`: Network canvas. The Relationship graph is primary, with a synchronized timeline, Entity inspector, and visible Research run.
- `B`: Case playback. The Timeline is primary, with the selected moment updating its Map and Relationships.
- `C`: Connection trail. Global search builds one explainable path with compact Map, Timeline, and live-agent context.

Selected direction: `A`, the graph-first Network canvas. Its synchronized Timeline, Entity inspector, source previews, confidence display, and persistent live Research run become the approved investigation-view pattern.

All data is fictional. State stays in memory, controls are read-only stubs, and no remote resources load. This is not production code.
