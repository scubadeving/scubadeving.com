# scubadeving.com

Studio landing site for [scubadeving.com](https://scubadeving.com).

## Tech stack

- **Astro 5** — static site, zero client-side JS by default
- **Tailwind CSS 3** — utility-first, dark-mode-only design system
- **TypeScript** — strict mode, `.astro` component props typed via interfaces
- No UI framework (no React/Vue) — pure `.astro` components only
- Fonts: Inter (sans) + JetBrains Mono (mono) via Google Fonts

## Design system tokens (tailwind.config.mjs)

| Token | Value | Use |
|---|---|---|
| `surface` | `#0a0a0a` | Page background |
| `surface-raised` | `#111111` | Card backgrounds |
| `surface-border` | `#1f1f1f` | Borders, dividers |
| `ink` | `#f5f5f5` | Primary text |
| `ink-muted` | `#737373` | Secondary text, labels |
| `accent` | `#0ea5e9` | Interactive elements, links |

Status badge colors (in `ProductCard.astro`):
- `in-development` → amber
- `coming-soon` → muted
- `available` → emerald

## Project structure

```
src/
  layouts/Layout.astro     — base HTML shell (meta, fonts, dark bg)
  pages/index.astro        — homepage: header + hero + product grid + footer
  components/
    ProductCard.astro      — typed card: name, tagline, description, status, platform, href
public/
  favicon.svg
```

## Dev commands

```bash
npm run dev      # start dev server at localhost:4321
npm run build    # production build → dist/
npm run preview  # preview built output
```

## Sibling projects

- **HydroVault** — `~/Projects/sd/HydroVault` (Android, Kotlin/Compose)
- **LoopLogic** — `~/Projects/sd/LoopLogic` (Android, Kotlin/Compose)

Both appear as product cards on the homepage. Keep descriptions and status in sync with actual shipping state.
