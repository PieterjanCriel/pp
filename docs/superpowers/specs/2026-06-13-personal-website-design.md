# Personal Landing Page — Design Spec

**Date:** 2026-06-13

## Overview

A single-page personal landing page for Pieterjan Criel. Bold, colorful, personality-forward. Built with Vite + vanilla HTML/CSS/JS, deployed to GitHub Pages via GitHub Actions.

## Stack

- **Build tool:** Vite
- **Frontend:** Vanilla HTML, CSS, JS (no framework)
- **Deployment:** GitHub Pages (`gh-pages` branch)
- **CI/CD:** GitHub Actions — triggers on push to `main`, runs `vite build`, deploys `dist/`

## Page Design

Single full-viewport hero section, vertically centered content, no scroll required.

### Layout (top to bottom, centered)

1. **Pill badge** — small white pill with orange text: `pjcr`
2. **Name** — `Pieterjan Criel.` — font-weight 900, ~64px, tight letter-spacing, color `#1a1a1a`
3. **Bio** — `Engineering Manager & AI leader building intelligent systems that create real business value.` — ~16px, color `#444`, max-width ~340px
4. **Social links** — two buttons side by side:
   - `𝕏 @pjcr` → https://x.com/pjcr — dark background (`#1a1a1a`), white text
   - `in LinkedIn` → https://www.linkedin.com/in/pieterjancriel/ — `#0077B5`, white text

### Colors

| Element | Value |
|---|---|
| Background gradient | `135deg, #FF6B35 0%, #F7C59F 55%, #EFEFD0 100%` |
| Primary text | `#1a1a1a` |
| Secondary text | `#444` |
| Badge text | `#FF6B35` |
| X button bg | `#1a1a1a` |
| LinkedIn button bg | `#0077B5` |

### Typography

- System font stack: `system-ui, -apple-system, sans-serif`
- Name: 900 weight, ~64px, letter-spacing `-2px`
- Badge: 700 weight, 10px, letter-spacing `3px`, uppercase
- Bio: 400 weight, 16px, line-height 1.6
- Buttons: 600 weight, 14px

## File Structure

```
index.html
src/
  main.js       # Vite entry point (minimal)
  style.css     # All styles
.github/
  workflows/
    deploy.yml  # Build + deploy to gh-pages on push to main
package.json
vite.config.js  # base path set to repo name for GitHub Pages
```

## GitHub Actions Workflow

- **Trigger:** push to `main`
- **Steps:** checkout → setup Node → install → `vite build` → deploy `dist/` to `gh-pages` branch
- **Action used:** `peaceiris/actions-gh-pages`
- **Note:** `vite.config.js` must set `base` to the GitHub repo name (e.g., `/pp/`) so asset paths resolve correctly on GitHub Pages.

## Success Criteria

- `npm run build` produces a working `dist/` with no errors
- Pushing to `main` automatically deploys to GitHub Pages
- Page loads in one viewport with no scroll, looks correct on mobile and desktop
- Both social links open the correct URLs in a new tab
