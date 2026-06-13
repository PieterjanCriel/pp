# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a bold, colorful personal landing page for Pieterjan Criel using Vite + vanilla HTML/CSS/JS, auto-deployed to GitHub Pages via GitHub Actions.

**Architecture:** Single `index.html` with one CSS file and a minimal JS entry point, built by Vite into `dist/`. GitHub Actions triggers on every push to `main`, runs the build, and pushes `dist/` to the `gh-pages` branch using `peaceiris/actions-gh-pages`. The `vite.config.js` sets `base: '/pp/'` so asset paths resolve correctly on GitHub Pages under `https://<user>.github.io/pp/`.

**Tech Stack:** Node 20+, Vite 5, vanilla HTML/CSS/JS, GitHub Actions, `peaceiris/actions-gh-pages@v4`

---

## File Map

| Path | Responsibility |
|---|---|
| `index.html` | Page shell — links CSS/JS, contains all markup |
| `src/style.css` | All visual styles (gradient, typography, buttons) |
| `src/main.js` | Vite entry point — imports CSS, no logic needed |
| `vite.config.js` | Vite config — sets `base` for GitHub Pages |
| `package.json` | Dependencies and scripts |
| `.gitignore` | Ignores `node_modules/`, `dist/`, `.superpowers/` |
| `.github/workflows/deploy.yml` | Build + deploy workflow |

---

## Task 1: Scaffold the Vite project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `.gitignore`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "pp",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/pp/',
})
```

- [ ] **Step 3: Create `.gitignore`**

```
node_modules/
dist/
.superpowers/
```

- [ ] **Step 4: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, `package-lock.json` generated.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.js .gitignore
git commit -m "chore: scaffold Vite project"
```

---

## Task 2: Build the HTML page

**Files:**
- Create: `index.html`
- Create: `src/main.js`

- [ ] **Step 1: Create `src/main.js`**

```js
import './style.css'
```

- [ ] **Step 2: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pieterjan Criel</title>
    <script type="module" src="/src/main.js"></script>
  </head>
  <body>
    <main class="hero">
      <span class="badge">pjcr</span>
      <h1 class="name">Pieterjan<br>Criel.</h1>
      <p class="bio">Engineering Manager &amp; AI leader building intelligent systems that create real business value.</p>
      <div class="links">
        <a class="btn btn-dark" href="https://x.com/pjcr" target="_blank" rel="noopener noreferrer">
          𝕏 @pjcr
        </a>
        <a class="btn btn-linkedin" href="https://www.linkedin.com/in/pieterjancriel/" target="_blank" rel="noopener noreferrer">
          in LinkedIn
        </a>
      </div>
    </main>
  </body>
</html>
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: terminal prints a localhost URL (e.g. `http://localhost:5173/pp/`). Open it — you should see a plain white page with the text content (no styles yet). Stop the server with `Ctrl+C`.

- [ ] **Step 4: Commit**

```bash
git add index.html src/main.js
git commit -m "feat: add HTML structure"
```

---

## Task 3: Style the page

**Files:**
- Create: `src/style.css`

- [ ] **Step 1: Create `src/style.css`**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: 100vh;
}

.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  background: linear-gradient(135deg, #FF6B35 0%, #F7C59F 55%, #EFEFD0 100%);
}

.badge {
  display: inline-block;
  background: white;
  color: #FF6B35;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 20px;
  margin-bottom: 28px;
}

.name {
  font-size: clamp(48px, 10vw, 80px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -2px;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.bio {
  font-size: 16px;
  color: #444;
  line-height: 1.6;
  max-width: 380px;
  margin-bottom: 36px;
}

.links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.15s ease;
}

.btn:hover {
  opacity: 0.85;
}

.btn-dark {
  background: #1a1a1a;
  color: white;
}

.btn-linkedin {
  background: #0077B5;
  color: white;
}
```

- [ ] **Step 2: Start the dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:5173/pp/` in your browser. Check:
- Full-viewport gradient background (orange → peach → cream)
- `pjcr` pill badge at top
- Large bold name "Pieterjan Criel."
- Bio text below
- Two buttons: dark X button and blue LinkedIn button
- Page looks correct at narrow viewport (mobile) — buttons stack if needed

Stop the server with `Ctrl+C`.

- [ ] **Step 3: Verify the build succeeds**

```bash
npm run build
```

Expected output ends with something like:
```
dist/index.html    x.xx kB
dist/assets/...    x.xx kB
✓ built in xxxms
```

No errors. A `dist/` directory is created.

- [ ] **Step 4: Commit**

```bash
git add src/style.css
git commit -m "feat: add styles — gradient hero, typography, buttons"
```

---

## Task 4: Add GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```bash
mkdir -p .github/workflows
```

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions deploy workflow for GitHub Pages"
```

---

## Task 5: Connect to GitHub and verify deployment

- [ ] **Step 1: Create the GitHub repo**

Go to https://github.com/new and create a repo named `pp` (public). Do NOT initialize with README.

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/<your-username>/pp.git
git push -u origin main
```

Replace `<your-username>` with your GitHub username.

- [ ] **Step 3: Verify the Actions workflow ran**

Go to `https://github.com/<your-username>/pp/actions`. The `Deploy to GitHub Pages` workflow should appear. Wait for it to turn green (takes ~1 minute).

- [ ] **Step 4: Enable GitHub Pages**

Go to `https://github.com/<your-username>/pp/settings/pages`.
- Under **Source**, select **Deploy from a branch**
- Branch: `gh-pages`, folder: `/ (root)`
- Click **Save**

- [ ] **Step 5: Verify the live site**

Open `https://<your-username>.github.io/pp/` in your browser.

Check:
- Page loads with the gradient hero
- Both social links open the correct URLs in a new tab
- No 404s in the browser console for assets
