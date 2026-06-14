# Theme Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 4-mode theme switcher (Light, Dark, System, Anxiety) with a fixed pill button in the top-right corner, persisted to localStorage.

**Architecture:** CSS custom properties on `:root` drive all theme colours; `[data-theme="X"]` blocks on `<html>` override them per theme. JS in `src/main.js` manages the logical mode, resolves system preference via `matchMedia`, applies `data-theme` + `data-mode` to `<html>`, and swaps Anxiety text content. The switcher is a single `<button>` that cycles through the four modes on click.

**Tech Stack:** Vanilla JS, CSS custom properties, `localStorage`, `matchMedia`

---

## File Map

| File | Change |
|---|---|
| `index.html` | Add `data-theme="system"` + `data-mode="system"` to `<html>`; add `<button id="themeToggle">` before `</body>` |
| `src/style.css` | Add CSS custom properties, 4 theme blocks, anxiety keyframes, switcher styles, reduced-motion block; remove hardcoded colours from `.hero`, `.badge`, `.name`, `.bio`, `.btn:focus-visible` |
| `src/main.js` | Replace single import with full theme management logic |

---

## Task 1: Add CSS custom properties and theme blocks

**Files:**
- Modify: `src/style.css`

This task refactors all hardcoded colours into CSS custom properties and adds per-theme overrides. The page will look identical after this task — the custom properties default to the existing light theme values.

- [ ] **Step 1: Replace the content of `src/style.css` with the themed version**

```css
/* ---- Theme tokens ---- */
:root {
  --hero-bg: linear-gradient(135deg, #FF6B35 0%, #F7C59F 55%, #EFEFD0 100%);
  --name-color: #1a1a1a;
  --bio-color: #444;
  --badge-bg: white;
  --badge-color: #FF6B35;
  --focus-color: #1a1a1a;
  --switcher-bg: rgba(0, 0, 0, 0.12);
  --switcher-color: #1a1a1a;
  --switcher-hover-bg: rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] {
  --hero-bg: linear-gradient(135deg, #1C0900 0%, #2A1500 40%, #16213e 100%);
  --name-color: #F5F0E8;
  --bio-color: #A89080;
  --badge-bg: #FF6B35;
  --badge-color: white;
  --focus-color: #F5F0E8;
  --switcher-bg: rgba(255, 255, 255, 0.12);
  --switcher-color: #F5F0E8;
  --switcher-hover-bg: rgba(255, 255, 255, 0.2);
}

[data-theme="anxiety"] {
  --name-color: white;
  --bio-color: rgba(255, 255, 255, 0.85);
  --badge-bg: white;
  --badge-color: #FF0000;
  --focus-color: white;
  --switcher-bg: rgba(255, 0, 0, 0.15);
  --switcher-color: white;
  --switcher-hover-bg: rgba(255, 0, 0, 0.3);
}

/* ---- Anxiety animations ---- */
@keyframes anxiety-bg {
  0%   { background: #FF0000; }
  25%  { background: #FF0066; }
  50%  { background: #CC00FF; }
  75%  { background: #FF6600; }
  100% { background: #FF0000; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  20%       { transform: translateX(-4px) rotate(-1deg); }
  40%       { transform: translateX(4px) rotate(1deg); }
  60%       { transform: translateX(-3px) rotate(-0.5deg); }
  80%       { transform: translateX(3px) rotate(0.5deg); }
}

/* ---- Base reset ---- */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: 100vh;
}

/* ---- Hero ---- */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  background: var(--hero-bg);
}

[data-theme="anxiety"] .hero {
  animation: anxiety-bg 1.5s steps(1) infinite;
}

/* ---- Badge ---- */
.badge {
  display: inline-block;
  background: var(--badge-bg);
  color: var(--badge-color);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 20px;
  margin-bottom: 28px;
}

/* ---- Name ---- */
.name {
  font-size: clamp(48px, 10vw, 80px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -2px;
  color: var(--name-color);
  margin-bottom: 20px;
}

[data-theme="anxiety"] .name {
  animation: shake 0.4s ease-in-out infinite;
}

/* ---- Bio ---- */
.bio {
  font-size: 16px;
  color: var(--bio-color);
  line-height: 1.6;
  max-width: 380px;
  margin-bottom: 36px;
}

/* ---- Links ---- */
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

.btn:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}

.btn-dark {
  background: #1a1a1a;
  color: white;
}

.btn-linkedin {
  background: #0077B5;
  color: white;
}

.btn-medium {
  background: #00AB6C;
  color: white;
}

.btn-agent {
  background: #7C3AED;
  color: white;
}

/* ---- Theme switcher ---- */
.theme-toggle {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;
  background: var(--switcher-bg);
  color: var(--switcher-color);
  border: none;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s ease;
}

.theme-toggle:hover {
  background: var(--switcher-hover-bg);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  [data-theme="anxiety"] .hero {
    animation: none;
    background: #FF0000;
  }
  [data-theme="anxiety"] .name {
    animation: none;
  }
  .btn {
    transition: none;
  }
  .theme-toggle {
    transition: none;
  }
}
```

- [ ] **Step 2: Verify the build succeeds and light theme looks unchanged**

```bash
npm run build
```

Expected: `✓ built in` with no errors. Open `npm run dev` and check `http://localhost:5173/pp/` — the page should look exactly as before (orange gradient, dark text). Stop the server.

- [ ] **Step 3: Commit**

```bash
git add src/style.css
git commit -m "feat: add CSS custom properties and theme blocks"
```

---

## Task 2: Add switcher button to HTML

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace `index.html` with the updated version**

```html
<!DOCTYPE html>
<html lang="en" data-theme="system" data-mode="system">
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
        <a class="btn btn-dark" href="https://x.com/pjcr" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter) @pjcr">
          𝕏 @pjcr
        </a>
        <a class="btn btn-linkedin" href="https://www.linkedin.com/in/pieterjancriel/" target="_blank" rel="noopener noreferrer">
          in LinkedIn
        </a>
        <a class="btn btn-medium" href="https://medium.com/@pjcr" target="_blank" rel="noopener noreferrer" aria-label="Medium blog">
          M Medium
        </a>
        <a class="btn btn-agent" href="/pp/agent.md" aria-label="Agent data file">
          ⚡ For Agents
        </a>
      </div>
    </main>
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">💻 System</button>
  </body>
</html>
```

- [ ] **Step 2: Verify dev server shows the switcher button**

```bash
npm run dev
```

Open `http://localhost:5173/pp/`. You should see a small `💻 System` pill in the top-right corner. It won't work yet (JS not wired). Stop the server.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add theme switcher button to HTML"
```

---

## Task 3: Implement theme switching in JS

**Files:**
- Modify: `src/main.js`

- [ ] **Step 1: Replace `src/main.js` with the full implementation**

```js
import './style.css'

const MODES = ['system', 'light', 'dark', 'anxiety']

const ICONS = {
  system: '💻 System',
  light: '☀️ Light',
  dark: '🌙 Dark',
  anxiety: '😱 Anxiety',
}

const ANXIETY = {
  badge: 'HELP',
  bio: 'WHY IS IT 3AM AND WHY IS PROD DOWN',
}

const NORMAL = {
  badge: 'pjcr',
  bio: 'Engineering Manager & AI leader building intelligent systems that create real business value.',
}

const mq = window.matchMedia('(prefers-color-scheme: dark)')

function resolveTheme(mode) {
  if (mode === 'system') return mq.matches ? 'dark' : 'light'
  return mode
}

function applyMode(mode) {
  const theme = resolveTheme(mode)
  const html = document.documentElement
  html.setAttribute('data-theme', theme)
  html.setAttribute('data-mode', mode)

  const btn = document.getElementById('themeToggle')
  if (btn) btn.textContent = ICONS[mode]

  const badge = document.querySelector('.badge')
  const bio = document.querySelector('.bio')
  if (mode === 'anxiety') {
    if (badge) badge.textContent = ANXIETY.badge
    if (bio) bio.textContent = ANXIETY.bio
  } else {
    if (badge) badge.textContent = NORMAL.badge
    if (bio) bio.textContent = NORMAL.bio
  }
}

function cycleMode() {
  const current = localStorage.getItem('theme-mode') || 'system'
  const next = MODES[(MODES.indexOf(current) + 1) % MODES.length]
  localStorage.setItem('theme-mode', next)
  applyMode(next)
}

// Apply stored or default mode on load
applyMode(localStorage.getItem('theme-mode') || 'system')

// Wire up button
document.getElementById('themeToggle').addEventListener('click', cycleMode)

// Track OS preference changes while in system mode
mq.addEventListener('change', () => {
  if ((localStorage.getItem('theme-mode') || 'system') === 'system') {
    applyMode('system')
  }
})
```

- [ ] **Step 2: Start dev server and manually test all 4 modes**

```bash
npm run dev
```

Open `http://localhost:5173/pp/`. Click the switcher pill repeatedly and verify:

1. `💻 System` → page uses your OS light/dark preference
2. `☀️ Light` → orange gradient, dark text, badge says `pjcr`
3. `🌙 Dark` → dark gradient, light text, orange badge
4. `😱 Anxiety` → red background animation, name shakes, badge says `HELP`, bio says `WHY IS IT 3AM AND WHY IS PROD DOWN`
5. Reload the page → mode is remembered
6. Cycle back to `💻 System` → returns to OS preference

Stop the server.

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: `✓ built in` with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/main.js
git commit -m "feat: implement theme switching logic with localStorage and system preference"
```

---

## Task 4: Push and verify deployment

- [ ] **Step 1: Push to GitHub**

```bash
git push
```

- [ ] **Step 2: Confirm Actions workflow passes**

Go to `https://github.com/PieterjanCriel/pp/actions`. The deploy workflow should go green within ~1 minute.

- [ ] **Step 3: Verify live site**

Open `https://pieterjancriel.github.io/pp/`. Test all 4 modes on the live site. Confirm:
- Switcher button visible top-right
- All 4 modes cycle correctly
- Preference survives page reload
- Anxiety mode: background animates, name shakes, text changes
