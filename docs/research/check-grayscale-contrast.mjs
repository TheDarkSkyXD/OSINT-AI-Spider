// Research calculation only. This does not establish application accessibility conformance.
// Formula: https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
export const palette = Object.freeze({
  canvas: "#111111",
  sidebar: "#151515",
  surface: "#1b1b1b",
  raised: "#242424",
  hover: "#2b2b2b",
  selected: "#303030",
  textPrimary: "#e8e8e8",
  textSecondary: "#b8b8b8",
  textMuted: "#a3a3a3",
  borderDecorative: "#383838",
  borderEssential: "#808080",
  icon: "#b8b8b8",
  focus: "#f0f0f0",
  action: "#dedede",
  actionText: "#171717",
  edge: "#8a8a8a",
});

const surfaces = ["canvas", "sidebar", "surface", "raised", "hover", "selected"];

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map(channel => {
    const value = Number.parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
}

const checks = [];
for (const foreground of ["textPrimary", "textSecondary", "textMuted", "icon", "borderEssential", "edge", "focus"]) {
  const minimum = foreground.startsWith("text") ? 4.5 : 3;
  for (const background of surfaces) {
    checks.push({ foreground, background, minimum, ratio: contrast(palette[foreground], palette[background]) });
  }
}
checks.push({ foreground: "actionText", background: "action", minimum: 4.5, ratio: contrast(palette.actionText, palette.action) });

const nonNeutral = Object.entries(palette).filter(([, hex]) => {
  const channels = hex.slice(1).match(/../g);
  return channels[0] !== channels[1] || channels[1] !== channels[2];
});
const failures = checks.filter(check => check.ratio < check.minimum);
console.table(checks.map(check => ({
  foreground: check.foreground,
  background: check.background,
  ratio: check.ratio.toFixed(2),
  minimum: check.minimum,
  result: check.ratio >= check.minimum ? "PASS" : "FAIL",
})));
console.log(`${checks.length} opaque color-pair checks; ${failures.length} contrast failures; ${nonNeutral.length} non-neutral tokens.`);
console.log("Decorative dividers are excluded. Essential boundaries use borderEssential.");
console.log("Focus assumes a dark gap around light controls. Actual compositing, geometry, images, and interaction states still need UI verification.");
if (failures.length || nonNeutral.length) process.exitCode = 1;
