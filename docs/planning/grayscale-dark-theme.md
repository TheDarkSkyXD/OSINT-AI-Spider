# Grayscale dark theme

Status: the user selected a dark grayscale interface on October 15, 2026. The palette below is the research-based starting recommendation.

Research ticket: [Research grayscale dark-theme accessibility and dashboard practices](https://github.com/TheDarkSkyXD/OSINT-AI-Spider/issues/24).

## Theme direction

Use neutral charcoal surfaces and grayscale controls throughout the application interface. Apply the same semantic theme tokens to web and Electron, and to features included on mobile. This changes the visual treatment of the approved Briefing room and Network canvas layouts. It does not reopen those layout choices.

Use surface brightness, spacing, typography, outlines, icons, labels, and line patterns to convey hierarchy and state. Existing mint, cyan, amber, blue, and other decorative accents are replaced in future implementations. Historical prototype captures remain records of the earlier exploration.

The grayscale requirement applies to application chrome. Preserve original colors in photographs, video, evidence screenshots, documents, and research-browser content. Do not apply a global grayscale or inversion filter. Offer a neutral map style when it preserves the needed information, but retain the ability to inspect an original map, image, or source layer. These are product requirements for faithful evidence presentation, not an accessibility rule mandating gray images.

## Surface and text palette

These values are project recommendations, not prescribed WCAG colors or copied Carbon tokens. Dark layers become progressively lighter, following the layering approach documented by [IBM Carbon](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview).

| Token | Value | Intended use |
| --- | --- | --- |
| Canvas | `#111111` | Main application background |
| Sidebar | `#151515` | Expanded navigation |
| Surface | `#1B1B1B` | Case sections, inspector, cards |
| Raised | `#242424` | Menus, dialogs, floating tools |
| Hover | `#2B2B2B` | Hover background |
| Selected | `#303030` | Selected background, accompanied by a visible marker |
| Primary text | `#E8E8E8` | Body content and headings |
| Secondary text | `#B8B8B8` | Descriptions, labels, and standard icons |
| Muted text | `#A3A3A3` | Metadata that must remain readable |
| Decorative border | `#383838` | Nonessential separators |
| Essential border | `#808080` | Boundaries needed to recognize controls or states |
| Graph edge | `#8A8A8A` | Meaningful graph lines and connectors |
| Focus | `#F0F0F0` | Keyboard focus outline |
| Primary action | `#DEDEDE` | Primary button fill |
| Action text | `#171717` | Text on the light primary button |

Use a small number of surface layers. Shadows may supplement them, but a shadow alone is too fragile a distinction for required controls. Avoid using each additional gray as a new semantic category. The similar dark surface fills are not sufficient on their own to communicate selection.

As project starting sizes, use 16-pixel text for sustained summary reading, 14-pixel text for ordinary controls, and at least 12-pixel text for metadata. Keep body line height around 1.5 and avoid thin font weights for small text. These are proposed design defaults rather than WCAG minimum font sizes. Verify larger user-selected text and zoom without losing controls or information.

The palette uses charcoal as the default aesthetic. Pure black is not universally wrong, and this research does not establish that dark mode is best for every user or viewing condition. Preserve system accessibility overrides and provide a path to stronger contrast.

## Contrast calculations

WCAG 2.2 requires normal text to reach 4.5:1 and qualifying large text to reach 3:1, with defined exceptions. Meaningful control indicators and graphical objects generally need 3:1 against adjacent colors. Decorative separators do not all need that ratio. See [text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

The following are calculated opaque sRGB pairings using the WCAG relative-luminance formula:

| Pair | Calculated contrast |
| --- | --- |
| Primary text on Canvas | 15.41:1 |
| Secondary text on Raised | 7.83:1 |
| Muted text on Selected, the weakest proposed text pairing | 5.23:1 |
| Essential border on Selected, the weakest checked essential-boundary pairing | 3.34:1 |
| Graph edge on Selected, the weakest checked graph pairing | 3.82:1 |
| Action text on Primary action | 13.33:1 |

Reproduce the 43 color-pair calculations from the repository root:

```powershell
node docs/research/check-grayscale-contrast.mjs
```

The script compares unrounded ratios against thresholds. Rounded values in this document are for display. It also checks that each proposed token has equal red, green, and blue channels. These checks do not establish application accessibility conformance.

Alpha blending, disabled styles, text on images, gradients, focus geometry, antialiasing, and actual rendered components require separate inspection. Never reduce metadata opacity to create an unchecked lighter-looking hierarchy.

## States and graph semantics

WCAG prohibits using color as the only means of conveying information. Our strict grayscale design goes further by choosing consistent labels and visual patterns for states. See [Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

| Meaning | Grayscale presentation |
| --- | --- |
| Selected navigation or node | Selected surface plus a bright outline or side marker and explicit selected state |
| Accepted Finding | Check icon and Finding label |
| Inference or proposed Relationship | Proposed label and dashed connection |
| Contradiction or renewed review | Warning icon, Review reopened label, and a bordered notice |
| Running agent | Activity indicator and Running label |
| Waiting or disconnected | Pause or connection icon, plain-language reason, and Waiting label |
| Failed action | Error icon, Failed label, and the recovery action |
| Destructive action | Explicit verb and consequence; do not depend on a red button |

Use distinct node shapes and type labels. Supported Relationships use solid lines, proposed ones use dashed lines, and directional connections have arrowheads. The selected path receives a stronger outline or thickness plus a text description. Do not fade unrelated meaningful edges below the contrast needed to interpret them. Hide irrelevant graph detail through labeled filters instead, retaining counts and a list alternative.

Underline text links and citations, or give citations a consistent outlined reference treatment. Do not require a colored link or hover to reveal clickability. Keep helper text and unselected tab labels readable.

## Focus and system presentation

Use a visible two-pixel focus outline with a dark separation gap around light buttons. The pale outline must remain distinguishable from nearby content. Keep focus distinct from persistent selection and visible while navigating menus, graph controls, preview dialogs, and agent panels.

[Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) is a Level AA requirement. [Focus Not Obscured Minimum](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) requires the focused component not to be entirely hidden by author-created content. Our target is a fully visible focus indicator. The more detailed [Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) criterion is Level AAA; a two-pixel outline alone does not prove that criterion is met.

Declare a dark color scheme for browser-managed controls, scrollbars, and default surfaces. This declaration does not recolor the entire custom UI or justify recoloring evidence. See [MDN color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme).

Respect forced-colors and higher-contrast settings. Allow the system to replace the palette for accessibility. Essential focus, selection, and control boundaries must survive even when shadows and background fills change. Avoid disabling forced-color adjustment globally. See [MDN forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/forced-colors).

## Implementation and validation handoff

- Use semantic tokens across the Case brief, graph, history, search, chat, agent tree, browser frame, settings, and extension library. Native file dialogs may retain their system appearance.
- Check active, hover, selected, focus, expanded, pressed, disabled, warning, and error states on each actual surface. Treat only genuinely inactive content as inactive for contrast exceptions.
- Verify text and icons in browser screenshots at normal size and zoom. Read graph edges, labels, and source references without relying on hue.
- Inspect evidence previews against known originals to confirm that theme styles do not alter source colors.
- Check keyboard focus, scrolling, dialogs, larger text, forced colors, and the graph's list alternative.
- Test comfortable reading on representative displays and lighting conditions with users. Do not claim eye-strain reduction from palette ratios.

This document records the selected theme direction and a proposed palette. Applying it to the workflow simulation or building production theme components is a separate implementation step. The investigation-workflow verdict remains open.
