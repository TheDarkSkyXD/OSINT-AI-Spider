# Grayscale dark theme research

Retrieved: 2026-10-15

Scope: a neutral grayscale interface for OSINT-AI-Spider on web and Electron, with the same visual rules applied to supported mobile screens. This note researches the theme. It does not validate the current prototypes or choose final color tokens.

## Recommended direction

Use dark neutral backgrounds, progressively lighter panels, light text, and explicit labels for Case and Agent states. Reserve the strongest light/dark contrast for primary actions, selection, and keyboard focus. Keep the interface grayscale while preserving the original colors of Evidence and external content. These are project recommendations informed by the requirements and design guidance below, rather than a standard's prescribed palette.

## Accessibility requirements

WCAG success criteria are normative. W3C Understanding documents explain their application and are informative. The proposed product target is WCAG 2.2 AA, with a stronger focus indicator as an additional design target. Theme checks alone cannot establish whole-product conformance. [WCAG 2.2 introduction and conformance](https://www.w3.org/TR/WCAG22/#wcag-2-layers-of-guidance)

| Topic | Standard requirement | Project application |
| --- | --- | --- |
| Ordinary text | SC 1.4.3, AA: at least 4.5:1 against its background. Large text can use 3:1. [WCAG 1.4.3](https://www.w3.org/TR/WCAG22/#contrast-minimum) | Check body text, timestamps, citations, placeholders, search results, and secondary labels on every surface where they appear. |
| Essential controls and graphics | SC 1.4.11, AA: required visual information identifying components, states, and graphics needs at least 3:1 against adjacent colors, with stated exceptions. [WCAG 1.4.11](https://www.w3.org/TR/WCAG22/#non-text-contrast) | Check control boundaries when needed for identification, meaningful icons, selection marks, and relationship lines. |
| Meaning | SC 1.4.1, A: color cannot be the only visual means of conveying information or action. [WCAG 1.4.1](https://www.w3.org/TR/WCAG22/#use-of-color) | Use status words and symbols; avoid badges distinguished only by gray shade. |
| Focus | SC 2.4.7, AA requires visible keyboard focus. SC 2.4.11, AA prevents the focused component being entirely hidden by authored content. [WCAG focus criteria](https://www.w3.org/TR/WCAG22/#focus-visible) | Check sidebar navigation, dialogs, sticky toolbars, search, and graph controls. |

Large text means at least 18 point, or 14 point bold, subject to the standard's definition. Do not treat ordinary dashboard labels as large text. Computed contrast thresholds must not be rounded upward; 4.499:1 fails a 4.5:1 requirement. Test composited colors where opacity changes the actual foreground or background. [Understanding contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

Inactive controls and purely decorative text have exceptions under text contrast. Non-text contrast also exempts inactive components and unmodified user-agent appearance. These exceptions do not make readable metadata or an enabled secondary action optional. A decorative divider need not reach 3:1; a divider that is the only way to identify a usable input may need to. [Understanding contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [Understanding non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

## Neutral surfaces and text

Material 2 recommends a dark gray base, uses `#121212` as its baseline, and makes elevated surfaces lighter. Carbon similarly makes each added dark-theme layer lighter; its Gray 100 and Gray 90 bases are `#161616` and `#262626`. These are design-system examples, not WCAG requirements or proof that one hex value is best. Material also permits true black for some use cases. [Material 2 dark theme](https://m2.material.io/design/color/dark-theme.html), [Carbon color overview](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview)

For this dashboard, define role-based tokens for the page, sidebar, panel, raised menu/dialog, hover, selected item, text, control border, decorative divider, and focus. Carbon uses role-based tokens and coordinated layer sets to keep colors consistent across themes. Use a small number of deliberate layers rather than a different gray for every nested card. [Carbon color overview](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview), [Carbon color guidelines](https://www.carbondesignsystem.com/building-blocks/foundations/color/guidelines)

Keep normal secondary text above 4.5:1; make it secondary through hierarchy, spacing, and modest weight changes. Aim for 7:1 on principal reading text where practical, as a project target. Apple recommends striving for 7:1 for custom foreground/background colors, especially small text. Its guidance also calls for checking increased contrast and different lighting conditions. This supports testing readability, not a claim that dark mode universally reduces eye strain. [Apple Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode), [Apple color](https://developer.apple.com/design/human-interface-guidelines/color)

## States, graphs, and selection

W3C explains that additional shape or text can communicate information otherwise encoded in color. For this project, use labels such as Running, Paused, Failed, Finding, Needs review, and Contradicted alongside distinct icons. Keep labels visible in the Agent tree and Case history. A light badge alone cannot communicate which state occurred. [Understanding use of color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)

For the Relationship graph, the recommended encoding is labeled node types with recognizable shapes or icons, arrowheads for direction, and named solid/dashed edge styles for relationship categories. Show a legend and a textual relationship inspector. Required graphical parts need contrast against their actual surroundings, while the standard does not require every overlapping graph element to contrast 3:1 with every other element. Text within graphics still follows text contrast. [Understanding non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

Give selection a persistent marker and label, and keyboard focus a separate outline. Our recommended focus target is an offset solid outline at least 2 CSS pixels thick, checked for 3:1 adjacent contrast and the focused/unfocused change. WCAG 2.4.13's area/change requirement is AAA, not AA; a 2-pixel perimeter is a straightforward implementation, not its only permitted shape. [Understanding focus appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)

## Evidence and external content

Preserve original colors in Evidence photos, screenshots, video, documents, captured pages, maps, and satellite imagery. Do not apply a global CSS grayscale, inversion, or dimming filter to those items. This is our evidence-fidelity recommendation. W3C's essential-presentation explanation explicitly includes photographs and screenshots whose meaning would be undermined by alteration. [Understanding non-text contrast, essential exception](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#essential-exception)

Apple suggests softening bright white image backgrounds in some dark-mode interfaces. Do not apply that generic asset guidance automatically to investigative Evidence. Use a neutral viewer surround and padding; offer any analyst-requested adjustment as a clearly indicated, reversible viewing operation. Author-created decorative assets can have theme variants. [Apple Dark Mode, icons and images](https://developer.apple.com/design/human-interface-guidelines/dark-mode)

## Browser and accessibility settings

Declare `color-scheme: dark` for the authored dark interface so browser-provided controls and scrollbars can match. This declaration does not design the custom application colors; those still need authored styles. [MDN color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)

Provide a stronger-contrast token set when `prefers-contrast: more` matches. The media feature detects requested contrast; it does not improve the design automatically. [MDN prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-contrast)

Respect forced colors even when the normal product theme is grayscale. In forced-colors mode browsers replace certain colors, remove box shadows, and can remove non-URL background images. Use system colors and real borders/outlines for critical state cues, and avoid globally opting out through `forced-color-adjust: none`. Test Windows High Contrast as well as the ordinary theme. [MDN forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/forced-colors), [MDN forced-color-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/forced-color-adjust)

## Validation still needed

Calculate the proposed foreground/background pairs without rounding passing values upward. Check text and controls in default, hover, selected, focused, loading, error, and disabled states. Include the brightest panel and the graph canvas. Then test keyboard navigation, increased contrast, forced colors, bright surroundings, and representative Evidence previews. These are proposed project checks derived from the sources above; this research does not claim they have passed.

Material 2 and Apple use dynamic documentation pages. Their main URLs opened during research but yielded limited extracted text; the search tool returned their first-party page contents. Carbon, W3C, and MDN supplied directly readable pages. Material 2 is used as historical design guidance, not a claim about the current Material 3 specification.
