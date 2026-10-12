// Renders the link-preview images (public/images/og-<locale>.png).
//
// Run on macOS after changing the name, thesis or role in src/content.ts:
//   node scripts/og.mjs
// It uses system fonts (Helvetica Neue, SF Mono, Hiragino Sans GB), which is why
// it runs locally and the PNGs are committed rather than built in CI.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const { copy, locales, person, t } = await import(join(root, "src/content.ts"));

// Point fontconfig at the system fonts before sharp (librsvg) loads.
const fontDir = join(tmpdir(), "og-fontconfig");
mkdirSync(join(fontDir, "cache"), { recursive: true });
writeFileSync(
  join(fontDir, "fonts.conf"),
  `<?xml version="1.0"?><fontconfig><dir>/System/Library/Fonts</dir><cachedir>${fontDir}/cache</cachedir></fontconfig>`,
);
process.env.FONTCONFIG_FILE = join(fontDir, "fonts.conf");
const { default: sharp } = await import("sharp");

const C = { bg: "#07090b", panel: "#0d1215", ink: "#e9ece9", muted: "#8a979c", line: "#1b2428", strong: "#2c3a3f", accent: "#ff7a45", signal: "#4fe3bd" };
const escape = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function svg(locale) {
  const sans = locale === "zh" ? "Hiragino Sans GB, Helvetica Neue" : "Helvetica Neue";
  const mono = "SF Mono, Menlo";
  const nodes = ["Command", "Aggregate", "Event Store", "Projection"];
  const nodeW = 196;
  const gap = (1040 - nodes.length * nodeW) / (nodes.length - 1);
  const x = (i) => 80 + i * (nodeW + gap);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" fill="none" stroke="${C.ink}" stroke-opacity="0.06"/>
    </pattern>
    <radialGradient id="fade" cx="0.5" cy="0" r="0.9"><stop offset="0.35" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <mask id="m"><rect width="1200" height="630" fill="url(#fade)"/></mask>
    <radialGradient id="glow" cx="0.82" cy="0.3" r="0.45"><stop offset="0" stop-color="${C.accent}" stop-opacity="0.28"/><stop offset="1" stop-color="${C.accent}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${C.bg}"/>
  <rect width="1200" height="630" fill="url(#grid)" mask="url(#m)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <text x="80" y="108" font-family="${mono}" font-size="24" fill="${C.muted}"><tspan fill="${C.signal}">~/ahoo-wang</tspan> $ whoami</text>
  <rect x="378" y="88" width="13" height="26" fill="${C.accent}"/>
  <text x="1120" y="108" font-family="${mono}" font-size="22" fill="${C.muted}" text-anchor="end">i.ahoo.me</text>

  <text x="76" y="246" font-family="Helvetica Neue" font-weight="700" font-size="112" letter-spacing="-5" fill="${C.ink}">${escape(person.name)}</text>
  <text x="80" y="322" font-family="${sans}" font-weight="500" font-size="44" fill="${C.accent}">${escape(t(copy.intro.thesis, locale))}</text>
  <text x="80" y="380" font-family="${sans}" font-size="26" fill="${C.muted}">${escape(t(copy.intro.eyebrow, locale))}</text>

  ${nodes
    .map((label, i) => {
      const hot = label === "Aggregate";
      const wire =
        i < nodes.length - 1
          ? `<path d="M${x(i) + nodeW} 528 H${x(i + 1)}" stroke="${C.strong}" stroke-width="2"/><circle cx="${x(i) + nodeW + gap / 2}" cy="528" r="4" fill="${C.signal}"/>`
          : "";
      return `<rect x="${x(i)}" y="498" width="${nodeW}" height="60" rx="12" fill="${C.panel}" stroke="${hot ? C.accent : C.strong}" stroke-width="${hot ? 2 : 1.5}"/>
  <text x="${x(i) + nodeW / 2}" y="536" font-family="Helvetica Neue" font-weight="600" font-size="22" fill="${hot ? C.accent : C.ink}" text-anchor="middle">${label}</text>
  ${wire}`;
    })
    .join("\n  ")}
</svg>`;
}

for (const locale of locales) {
  const file = join(root, "public/images", `og-${locale}.png`);
  await sharp(Buffer.from(svg(locale))).png({ compressionLevel: 9, palette: true }).toFile(file);
  console.log(`  ${file}`);
}
rmSync(fontDir, { recursive: true, force: true });
