# Grayscale dark-theme prototypes

This branch contains the updated working prototypes. The earlier prototype branches retain their original appearance for reference. These are fictional, in-memory planning artifacts, not production applications.

## Case workspace

Run from the repository root:

```powershell
node prototypes/case-workspace/serve.mjs
```

Open `http://127.0.0.1:4173/?variant=C` for the selected Briefing room with its expanded sidebar. The bottom arrows compare the other layouts. All variants now use the same dark grayscale theme.

## Investigation views

```powershell
node prototypes/investigation-views/serve.mjs
```

Open `http://127.0.0.1:4174/?variant=A` for the selected Network canvas. The other variants also use the grayscale theme.

## Workflow validation

Open [the workflow HTML file](investigation-workflows/index.html) directly in a browser. It is self-contained and needs no server. Choose a fictional Case and follow the numbered steps. The Web, Electron, and Mobile selectors simulate the planned client workflows rather than running native clients.

## Theme behavior

The interface uses charcoal layers, neutral text, outlined selection, dashed review states, underlined citations, and visible keyboard focus styling. Metadata uses a minimum authored size of 12 pixels. System forced colors and increased-contrast preferences have dedicated styles.

Evidence illustrations and research-page contents retain their original colors. There is no global grayscale or inversion filter.

Browser verification covered all seven main screens, settings, history search, parent and subagent activity, six complete workflow paths, and a narrow viewport. Sampled rendered text had no contrast failures outside original source content and genuinely disabled controls. This sampling does not establish full accessibility conformance. Focus styles were inspected; the embedded verification browser was not window-focused, so a visible keyboard-focus review remains necessary in a focused browser.

The investigation-workflow decision remains open for the user's verdict.
