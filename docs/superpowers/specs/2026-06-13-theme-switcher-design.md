# Theme Switcher Design Spec

**Date:** 2026-06-13

## Overview

Add a 4-mode theme switcher to the personal landing page: Light, Dark, System (mirrors OS preference), and Anxiety (humor). A fixed pill button in the top-right corner cycles through modes. Preference is persisted to `localStorage`.

## Modes

| Mode | Key | Icon | Trigger |
|---|---|---|---|
| System | `system` | 💻 | Mirrors `prefers-color-scheme`; default |
| Light | `light` | ☀️ | Always light |
| Dark | `dark` | 🌙 | Always dark |
| Anxiety | `anxiety` | 😱 | Chaos mode |

Cycling order: `system → light → dark → anxiety → system…`

## Theme Colors

### Light
- Background: `linear-gradient(135deg, #FF6B35 0%, #F7C59F 55%, #EFEFD0 100%)`
- Name: `#1a1a1a`
- Bio: `#444`
- Badge: white background, `#FF6B35` text
- Switcher: `rgba(0,0,0,0.12)` background, `#1a1a1a` text

### Dark
- Background: `linear-gradient(135deg, #1C0900 0%, #2A1500 40%, #16213e 100%)`
- Name: `#F5F0E8`
- Bio: `#A89080`
- Badge: `#FF6B35` background, white text
- Switcher: `rgba(255,255,255,0.12)` background, `#F5F0E8` text

### System
Resolves to Light or Dark based on `window.matchMedia('(prefers-color-scheme: dark)')`. Watches for OS-level changes and updates instantly.

### Anxiety
- Background: CSS `@keyframes` cycling `#FF0000 → #FF0066 → #CC00FF → #FF6600 → #FF0000` at 1.5s steps
- Name: white, CSS shake animation (`@keyframes shake`, ~0.4s infinite)
- Bio text (JS): `"WHY IS IT 3AM AND WHY IS PROD DOWN"`
- Badge text (JS): `"HELP"`, white background, red text
- Switcher: `rgba(255,0,0,0.15)` background, `#FF0000` text
- `@media (prefers-reduced-motion: reduce)`: disables all animations (background becomes static `#FF0000`, name stops shaking)

## Switcher UI

- `position: fixed; top: 16px; right: 16px`
- Pill shape: `border-radius: 20px; padding: 6px 14px`
- Shows icon + mode label: e.g. `💻 System`
- `cursor: pointer`, `border: none`, `font-weight: 600`, `font-size: 13px`
- Background and text color driven by CSS custom properties (`--switcher-bg`, `--switcher-color`) so it adapts automatically per theme
- `z-index: 100` to float above content
- Focus outline: `2px solid` using `--focus-color`

## State Management (JS)

- **Logical mode** (`theme-mode` in `localStorage`): what the user picked (`system`, `light`, `dark`, `anxiety`)
- **Resolved theme** (`data-theme` on `<html>`): the visual theme actually applied (`light`, `dark`, `anxiety`)
- **`data-mode`** on `<html>`: tracks logical mode for switcher icon display
- On load: read `localStorage`, default to `system`, apply theme
- On click: advance to next mode, save, apply
- `matchMedia` listener: fires when OS preference changes; only acts if logical mode is `system`

## Text Swaps (JS)

JS swaps `.badge` text and `.bio` text on anxiety mode entry/exit:

| Element | Normal | Anxiety |
|---|---|---|
| `.badge` | `pjcr` | `HELP` |
| `.bio` | `Engineering Manager & AI leader…` | `WHY IS IT 3AM AND WHY IS PROD DOWN` |

## Files Changed

| File | Change |
|---|---|
| `index.html` | Add `data-theme="system"` and `data-mode="system"` to `<html>`; add switcher `<button>` before `</body>` |
| `src/style.css` | Add CSS custom properties, 4 theme blocks, anxiety keyframes, switcher styles, reduced-motion block |
| `src/main.js` | Replace single CSS import with full theme management logic |

## Success Criteria

- Clicking the switcher cycles through all 4 modes correctly
- System mode updates instantly when OS preference changes
- Preference survives page reload
- Anxiety mode: background animates, name shakes, texts swap
- `prefers-reduced-motion`: animations disabled, static red background
- All existing buttons/links remain functional in all themes
