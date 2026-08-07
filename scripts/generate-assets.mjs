/**
 * Generates static image assets at build time using sharp:
 *   public/og-default.png        — 1200×630 default social preview
 *   public/og-looplogic.png      — 1200×630 LoopLogic social preview
 *   public/og-hydrovault.png     — 1200×630 HydroVault social preview
 *   public/apple-touch-icon.png  — 180×180  iOS home screen icon
 *
 * Run via `npm run generate` (called automatically by `npm run build`).
 */

import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = join(__dirname, "../public");

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  surface: "#0a0a0a",
  surfaceRaised: "#111111",
  surfaceBorder: "#1f1f1f",
  ink: "#f5f5f5",
  inkMuted: "#808080",
  accent: "#0ea5e9",
};

// ─── XML escape (SVG text nodes must escape & < > " ') ───────────────────────
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ─── OG image builder ─────────────────────────────────────────────────────────
function ogSvg({ label, name, tagline, accent = C.accent }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${C.surface}"/>
  <rect x="60" y="60" width="1080" height="510" rx="20" fill="${C.surfaceRaised}" stroke="${C.surfaceBorder}" stroke-width="1"/>
  <rect x="60" y="60" width="160" height="4" rx="2" fill="${accent}"/>

  <text x="100" y="198"
    font-family="'Courier New', Courier, monospace"
    font-size="18" font-weight="400"
    letter-spacing="3"
    fill="${C.inkMuted}">${esc(label)}</text>

  <text x="100" y="300"
    font-family="'Courier New', Courier, monospace"
    font-size="80" font-weight="600"
    letter-spacing="-2"
    fill="${C.ink}">${esc(name)}</text>

  <text x="100" y="366"
    font-family="'Arial', 'Helvetica Neue', sans-serif"
    font-size="30" font-weight="400"
    fill="${C.inkMuted}">${esc(tagline)}</text>

  <text x="100" y="520"
    font-family="'Courier New', Courier, monospace"
    font-size="20" font-weight="400"
    fill="${accent}">scubadeving.com</text>
</svg>`;
}

// ─── Apple touch icon builder ─────────────────────────────────────────────────
const touchIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="${C.surface}"/>
  <rect x="0" y="0" width="60" height="6" rx="3" fill="${C.accent}"/>
  <text x="90" y="116"
    font-family="'Courier New', Courier, monospace"
    font-size="72" font-weight="600"
    text-anchor="middle"
    fill="${C.ink}">sd</text>
</svg>`;

// ─── Generate ─────────────────────────────────────────────────────────────────
// SYNC NOTE: each entry below must match a product id in src/data/products.ts.
// When adding a new product, add a corresponding entry here and run `npm run generate`.
const images = [
  {
    svg: ogSvg({
      label: "SOFTWARE STUDIO",
      name: "scubadeving",
      tagline: "Software for serious divers",
    }),
    file: "og-default.png",
    width: 1200,
    height: 630,
  },
  {
    svg: ogSvg({
      label: "CCR OPERATIONS APP",
      name: "LoopLogic",
      tagline: "CCR operations & analytics",
      accent: "#00BFA5",
    }),
    file: "og-looplogic.png",
    width: 1200,
    height: 630,
  },
  {
    svg: ogSvg({
      label: "CYLINDER MANAGEMENT APP",
      name: "HydroVault",
      tagline: "Scuba cylinder management",
      accent: "#00B0FF",
    }),
    file: "og-hydrovault.png",
    width: 1200,
    height: 630,
  },
  {
    svg: touchIconSvg,
    file: "apple-touch-icon.png",
    width: 180,
    height: 180,
  },
];

for (const { svg, file, width, height } of images) {
  await sharp(Buffer.from(svg))
    .resize(width, height)
    .png()
    .toFile(join(pub, file));
  console.log(`  ✓  ${file}`);
}
