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
