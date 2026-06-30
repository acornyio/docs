# Acorny Docs Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Do not use subagents unless the user explicitly requests delegation.

**Goal:** Turn the real Starlight homepage into the Acorny product-oriented docs entry shown by the design reference, while preserving verified product facts, one semantic H1, production search, responsive behavior, and all existing documentation pages.

**Architecture:** Keep Starlight’s `doc` layout, sidebar, Pagefind search, content collection, and bundled MDX integration. Use Starlight’s `hero` branch with a custom `Hero` override so the homepage has one H1 and does not render the normal `PageTitle`. Homepage-only Astro components and CSS stay isolated under `src/components/docs/` and `src/styles/docs-home.css`; shared shell changes remain in `Header.astro`, `ThemeToggle.astro`, `astro.config.mjs`, and `marktext-docs.css`.

**Tech Stack:** Astro `^6.3.7`, Starlight `^0.39.2`, Starlight’s bundled `@astrojs/mdx`, TypeScript 6, Node test runner, Pagefind, PowerShell 7, and Python Playwright for final rendered QA.

---

## Non-negotiable constraints

- All edited and created text files use UTF-8.
- Use `pnpm`; do not use npm or yarn.
- Do **not** install or register another `@astrojs/mdx`. Starlight already supplies MDX.
- Do **not** use the undefined `~` alias. Imports from `src/content/docs/index.mdx` use `../../components/docs/...`.
- Do not change other files under `src/content/docs/`.
- Product copy must be supported by existing docs. Do not claim Amazon account sync, WeRead OAuth sync, folder watching, exact sync times, SM-2, an open-source scheduler file, encryption-at-rest, 24-hour deletion, ZIP+Markdown export, or free beta pricing.
- Preserve Pagefind, structured-data injection, brand, CTA, language component, and provider pages.
- Commands are PowerShell-compatible. Do not use Bash-only `rm -rf`, `kill $!`, `mkdir -p`, `grep`, or `/dev/null` syntax.
- Preserve unrelated working-tree changes. Only move the tracked `acorny-docs.html` explicitly listed here.
- Run commit steps only after the user explicitly authorizes commits.

## File map

- Create `src/components/docs/HomeHero.astro`: homepage breadcrumb, eyebrow, single H1, lead, and meta strip.
- Create `src/components/docs/IntroPanel.astro`: framed explanatory panel with named aside slot.
- Create `src/components/docs/FlowStack.astro`: three-step capture/review flow.
- Create `src/components/docs/QuickGrid.astro`: four navigational cards.
- Create `src/components/docs/Callout.astro`: tip/note content block.
- Create `src/components/docs/CodeBar.astro`: pseudocode panel with local copy behavior.
- Create `src/styles/docs-home.css`: homepage-only styles.
- Create `src/components/ThemeToggle.astro`: shared two-state theme button using Starlight’s storage key.
- Rename `src/content/docs/index.md` to `src/content/docs/index.mdx`.
- Modify `src/components/Header.astro`: real section links, flex header hook, theme toggle.
- Modify `src/components/MobileMenuFooter.astro`: shared theme toggle.
- Modify `astro.config.mjs`: custom Hero/CSS and collapsed large sidebar groups.
- Modify `src/styles/marktext-docs.css`: shared header, mobile, TOC, theme, and reduced-motion rules.
- Modify `scripts/docs-site.test.mjs`: structural, copy-safety, and shell assertions.
- Move `acorny-docs.html` to `docs/designs/acorny-docs-homepage.html` and create `docs/designs/README.md`.

---

## Task 1: Establish the baseline and archive the design reference

**Files:**
- Move: `acorny-docs.html` → `docs/designs/acorny-docs-homepage.html`
- Create: `docs/designs/README.md`

- [ ] **Step 1: Verify the current baseline**

```powershell
pnpm test
git status --short
```

Expected: tests pass. Record existing untracked files and exclude them from later commits.

- [ ] **Step 2: Move the tracked mockup**

```powershell
New-Item -ItemType Directory -Force 'docs/designs' | Out-Null
git mv -- 'acorny-docs.html' 'docs/designs/acorny-docs-homepage.html'
```

- [ ] **Step 3: Create `docs/designs/README.md`**

```md
# Design references

`acorny-docs-homepage.html` is the visual reference used for the 2026-06-24
Acorny Docs homepage redesign. It is an archived concept, not production code.

The production implementation lives in `src/content/docs/index.mdx`,
`src/components/docs/`, and `src/styles/docs-home.css`.

Use the reference for hierarchy, spacing, panels, and navigation treatment.
Do not copy its product claims or mobile CSS verbatim. Product facts come from
the existing pages under `src/content/docs/`, and the production page must
remain usable at a 390px viewport without horizontal overflow.
```

- [ ] **Step 4: Verify and commit if authorized**

```powershell
if (Test-Path -LiteralPath 'acorny-docs.html') { throw 'Root mockup still exists.' }
if (-not (Test-Path -LiteralPath 'docs/designs/acorny-docs-homepage.html')) { throw 'Archived mockup is missing.' }
git diff --name-status -- 'acorny-docs.html' 'docs/designs'
git add -A -- 'acorny-docs.html' 'docs/designs'
git commit -m 'docs(docs): archive homepage design reference'
```

---

## Task 2: Add the Starlight hero branch and guarantee one H1

**Files:**
- Modify: `scripts/docs-site.test.mjs`
- Create: `src/components/docs/HomeHero.astro`
- Modify: `astro.config.mjs`
- Rename: `src/content/docs/index.md` → `src/content/docs/index.mdx`
- Create: `src/styles/docs-home.css`

- [ ] **Step 1: Add the failing test**

Append to `scripts/docs-site.test.mjs`:

```js
test('docs homepage renders one product-oriented hero heading', async () => {
  const home = await readDist('index.html')
  const h1Count = (home.match(/<h1\b/g) ?? []).length

  assert.equal(h1Count, 1)
  assert.match(home, /class="docs-home-hero"/)
  assert.match(home, /Turn highlights into a reviewable reading memory/)
  assert.match(home, /class="docs-home-hero__lead"/)
})
```

In the existing tests, replace the old homepage title and PageTitle assertions:

```js
assert.match(home, /<title>Turn highlights into a reviewable reading memory \| Acorny Docs<\/title>/)
assert.match(home, /"name":"Turn highlights into a reviewable reading memory"/)
assert.match(home, /class="docs-home-hero__eyebrow"[^>]*>User Documentation<\/p>/)
```

Remove the corresponding assertions for `<title>User Documentation`, JSON-LD name `User Documentation`, and `class="docs-eyebrow"`; the Starlight hero branch intentionally bypasses `PageTitle.astro` on `/`.

- [ ] **Step 2: Run the test and verify failure**

```powershell
pnpm test
```

Expected: FAIL because the new hero does not exist.

- [ ] **Step 3: Create `src/components/docs/HomeHero.astro`**

```astro
---
const { starlightRoute } = Astro.locals
const hero = starlightRoute.entry.data.hero
const title = hero?.title ?? starlightRoute.entry.data.title
const tagline = hero?.tagline ?? starlightRoute.entry.data.description
const meta = [
  'Capture from web pages and reading tools',
  'Import files and connected services',
  'Review recall cards with spaced repetition',
]
---

<section class="docs-home-hero" aria-labelledby="docs-home-title">
  <nav class="docs-home-hero__breadcrumb" aria-label="Breadcrumb">
    <a href="/">User docs</a>
    <span aria-hidden="true">/</span>
    <span aria-current="page">Introduction</span>
  </nav>
  <p class="docs-home-hero__eyebrow">User Documentation</p>
  <h1 id="docs-home-title">{title}</h1>
  {tagline && <p class="docs-home-hero__lead">{tagline}</p>}
  <ul class="docs-home-hero__meta" role="list">
    {meta.map((item) => <li>{item}</li>)}
  </ul>
</section>
```

- [ ] **Step 4: Register the custom Hero and homepage stylesheet**

In `astro.config.mjs`, change `customCss` and extend `components`:

```js
customCss: ['./src/styles/marktext-docs.css', './src/styles/docs-home.css'],
```

```js
components: {
  Head: './src/components/Head.astro',
  Header: './src/components/Header.astro',
  Hero: './src/components/docs/HomeHero.astro',
  PageTitle: './src/components/PageTitle.astro',
  MobileMenuFooter: './src/components/MobileMenuFooter.astro',
},
```

Do not import or add `mdx()`.

- [ ] **Step 5: Rename the homepage and enable Starlight’s hero branch**

```powershell
git mv -- 'src/content/docs/index.md' 'src/content/docs/index.mdx'
```

Replace its content temporarily with:

```mdx
---
title: Turn highlights into a reviewable reading memory
description: Acorny helps you capture highlights, import existing reading notes, and review important ideas as recall cards with spaced repetition.
hero:
  title: Turn highlights into a reviewable reading memory
  tagline: Acorny helps you capture highlights, import existing reading notes, and review important ideas as recall cards with spaced repetition.
---

Welcome to Acorny Docs.
```

- [ ] **Step 6: Create the initial `src/styles/docs-home.css`**

```css
.docs-home-hero {
  display: grid;
  gap: 0.9rem;
  padding-block: 0.25rem 1.4rem;
}

.docs-home-hero__breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  color: var(--ac-doc-muted);
  font-size: 0.84rem;
}

.docs-home-hero__breadcrumb a {
  color: inherit;
  text-decoration: none;
}

.docs-home-hero__eyebrow {
  margin: 0.5rem 0 0;
  color: var(--ac-doc-accent);
  font-size: 0.75rem;
  font-weight: 720;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.docs-home-hero h1 {
  max-width: 46rem;
  margin: 0;
  color: var(--ac-doc-text);
  font-size: clamp(2.2rem, 4.5vw, 3rem);
  font-weight: 650;
  letter-spacing: -0.04em;
  line-height: 1.04;
  text-wrap: balance;
}

.docs-home-hero__lead {
  max-width: 46rem;
  margin: 0;
  color: color-mix(in oklch, var(--ac-doc-text) 82%, var(--ac-doc-muted));
  font-size: 1.08rem;
  line-height: 1.62;
  text-wrap: pretty;
}

.docs-home-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 1rem;
  margin: 0.35rem 0 0;
  padding: 0 0 1.25rem;
  border-bottom: 1px solid var(--ac-doc-border);
  color: var(--ac-doc-muted);
  font-size: 0.82rem;
  list-style: none;
}
```

- [ ] **Step 7: Run tests and commit if authorized**

```powershell
pnpm test
git add -A -- 'astro.config.mjs' 'src/content/docs/index.md' 'src/content/docs/index.mdx' 'src/components/docs/HomeHero.astro' 'src/styles/docs-home.css' 'scripts/docs-site.test.mjs'
git commit -m 'feat(docs): add single-heading homepage hero'
```

---

## Task 3: Build the homepage content components

**Files:**
- Create: `src/components/docs/IntroPanel.astro`
- Create: `src/components/docs/FlowStack.astro`
- Create: `src/components/docs/QuickGrid.astro`
- Create: `src/components/docs/Callout.astro`
- Create: `src/components/docs/CodeBar.astro`
- Modify: `src/content/docs/index.mdx`
- Modify: `src/styles/docs-home.css`
- Modify: `scripts/docs-site.test.mjs`

- [ ] **Step 1: Add a failing structure test**

```js
test('docs homepage renders flow, navigation, callout, and copy target', async () => {
  const home = await readDist('index.html')
  assert.match(home, /class="docs-home-intro"/)
  assert.equal((home.match(/class="docs-home-flow__item"/g) ?? []).length, 3)
  assert.equal((home.match(/class="docs-home-quick__link"/g) ?? []).length, 4)
  assert.match(home, /class="docs-home-callout docs-home-callout--tip"/)
  assert.match(home, /data-copy-target="review-loop"/)
  assert.match(home, /<pre id="review-loop"/)
  assert.match(home, /aria-live="polite"/)
})
```

Run `pnpm test`; expect failure.

- [ ] **Step 2: Create `IntroPanel.astro`**

```astro
---
interface Props { path: string; label: string; title: string; copy: string }
const { path, label, title, copy } = Astro.props
---
<section class="docs-home-intro" aria-labelledby="docs-home-intro-title">
  <header class="docs-home-intro__bar"><span>{path}</span><span>{label}</span></header>
  <div class="docs-home-intro__body">
    <div class="docs-home-intro__copy"><h2 id="docs-home-intro-title">{title}</h2><p>{copy}</p></div>
    <div class="docs-home-intro__aside"><slot name="aside" /></div>
  </div>
</section>
```

- [ ] **Step 3: Create `FlowStack.astro` and `QuickGrid.astro`**

```astro
---
// FlowStack.astro
interface Step { number: string; title: string; copy: string }
interface Props { steps: Step[] }
const { steps } = Astro.props
---
<ol class="docs-home-flow">
  {steps.map((step) => <li class="docs-home-flow__item"><span class="docs-home-flow__number">{step.number}</span><strong>{step.title}</strong><span>{step.copy}</span></li>)}
</ol>
```

```astro
---
// QuickGrid.astro
interface Item { title: string; description: string; href: string }
interface Props { items: Item[] }
const { items } = Astro.props
---
<ul class="docs-home-quick" role="list">
  {items.map((item) => <li><a class="docs-home-quick__link" href={item.href}><strong>{item.title}</strong><span>{item.description}</span></a></li>)}
</ul>
```


- [ ] **Step 4: Create `Callout.astro` and `CodeBar.astro`**

```astro
---
// Callout.astro
interface Props { variant?: 'tip' | 'note'; title: string }
const { variant = 'tip', title } = Astro.props
---
<aside class:list={['docs-home-callout', `docs-home-callout--${variant}`]}><strong>{title}</strong><div><slot /></div></aside>
```

```astro
---
// CodeBar.astro
interface Props { language: string; targetId: string; code: string }
const { language, targetId, code } = Astro.props
---
<figure class="docs-home-code">
  <figcaption class="docs-home-code__bar"><span>{language}</span><button type="button" data-copy-target={targetId}><span aria-live="polite">Copy</span></button></figcaption>
  <pre id={targetId}><code>{code}</code></pre>
</figure>
<script>
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy-target]:not([data-copy-bound])')) {
    button.dataset.copyBound = 'true'
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget ?? '')
      const label = button.querySelector<HTMLElement>('[aria-live]')
      if (!target || !label) return
      try {
        await navigator.clipboard.writeText(target.textContent ?? '')
        label.textContent = 'Copied'
        window.setTimeout(() => { label.textContent = 'Copy' }, 1400)
      } catch { label.textContent = 'Copy failed' }
    })
  }
</script>
```

This is an Astro-processed module script. Do not use `?url` or `is:inline` with TypeScript.

- [ ] **Step 5: Compose the components in `index.mdx`**

```mdx
import IntroPanel from '../../components/docs/IntroPanel.astro'
import FlowStack from '../../components/docs/FlowStack.astro'
import QuickGrid from '../../components/docs/QuickGrid.astro'
import Callout from '../../components/docs/Callout.astro'
import CodeBar from '../../components/docs/CodeBar.astro'

<IntroPanel path="docs/introduction" label="Acorny quick start" title="Keep the highlight and its source together." copy="Acorny keeps saved text tied to the article, book, file, or reading tool it came from, so review starts with useful context instead of an isolated sentence.">
  <FlowStack slot="aside" steps={[
    { number: '01', title: 'Capture', copy: 'Save or import a complete idea with its source.' },
    { number: '02', title: 'Prepare', copy: 'Acorny makes saved highlights eligible for review.' },
    { number: '03', title: 'Review', copy: 'Rate recall so the next interval can move sooner or later.' },
  ]} />
</IntroPanel>

## Start here

<QuickGrid items={[
  { title: 'Quick start', description: 'Save a first highlight and begin a review session.', href: '/getting-started/quick-start/' },
  { title: 'Import & sync', description: 'Choose the correct path for files, APIs, or connected services.', href: '/import-sync/overview/' },
  { title: 'Review & recall', description: 'Understand recall cards, ratings, and review intervals.', href: '/review-recall/how-review-works/' },
  { title: 'Privacy & data', description: 'See what the product stores and how to request a data copy.', href: '/account-data/privacy-beta-pricing/' },
]} />

<Callout variant="tip" title="Start with one complete idea">A full sentence with enough context is usually easier to review than a short fragment.</Callout>

## The daily review loop

<CodeBar language="workflow" targetId="review-loop" code={`save_or_import_highlight()
make_highlight_eligible_for_review()
show_recall_card_when_due()
adjust_next_interval_from_rating()`} />
```

- [ ] **Step 6: Add homepage component styles**

Append to `docs-home.css`:

```css
.docs-home-intro,.docs-home-code{overflow:clip;border:1px solid var(--ac-doc-border);border-radius:1rem;background:var(--ac-doc-panel)}
.docs-home-intro{margin-block:.5rem 2rem;box-shadow:var(--ac-doc-shadow)}
.docs-home-intro__bar,.docs-home-code__bar{display:flex;justify-content:space-between;gap:1rem;padding:.7rem 1rem;border-bottom:1px solid var(--ac-doc-border);color:var(--ac-doc-muted);font:.75rem var(--sl-font-mono)}
.docs-home-intro__body{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}
.docs-home-intro__copy,.docs-home-intro__aside{padding:1.5rem}.docs-home-intro__copy{border-inline-end:1px solid var(--ac-doc-border)}
.docs-home-flow{display:grid;gap:.65rem;margin:0;padding:0;list-style:none}
.docs-home-flow__item{display:grid;grid-template-columns:auto 1fr;gap:.12rem .75rem;padding:.75rem .85rem;border:1px solid var(--ac-doc-border);border-radius:.8rem;background:var(--ac-doc-panel-soft)}
.docs-home-flow__number{grid-row:1/span 2;color:var(--ac-doc-accent);font:700 .75rem var(--sl-font-mono)}
.docs-home-flow__item>span:last-child{color:var(--ac-doc-muted);font-size:.86rem}
.docs-home-quick{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.8rem;margin:1rem 0 1.5rem;padding:0;list-style:none}
.docs-home-quick__link{display:grid;height:100%;gap:.3rem;padding:1rem;border:1px solid var(--ac-doc-border);border-radius:.85rem;background:var(--ac-doc-panel);color:var(--ac-doc-text);text-decoration:none;transition:transform 180ms ease,border-color 180ms ease,background 180ms ease}
.docs-home-quick__link:hover,.docs-home-quick__link:focus-visible{border-color:var(--ac-doc-border-strong);background:color-mix(in oklch,var(--ac-doc-accent) 7%,var(--ac-doc-panel));transform:translateY(-1px)}
.docs-home-quick__link span,.docs-home-callout>div{color:var(--ac-doc-muted);font-size:.86rem;line-height:1.5}
.docs-home-callout{display:grid;gap:.35rem;margin-block:1.4rem;padding:1rem 1.1rem;border:1px solid color-mix(in oklch,var(--ac-doc-accent) 28%,var(--ac-doc-border));border-radius:.9rem;background:color-mix(in oklch,var(--ac-doc-accent) 7%,var(--ac-doc-panel))}
.docs-home-callout>div p{margin:0}.docs-home-code{margin-block:1.3rem}.docs-home-code__bar{align-items:center}
.docs-home-code__bar button{padding:.3rem .6rem;border:1px solid var(--ac-doc-border);border-radius:.5rem;background:transparent;color:inherit;cursor:pointer}
.docs-home-code pre{margin:0;overflow-x:auto;padding:1rem;background:transparent;color:var(--ac-doc-text);font:.82rem/1.65 var(--sl-font-mono)}
@media(max-width:53.75rem){.docs-home-intro__body,.docs-home-quick{grid-template-columns:minmax(0,1fr)}.docs-home-intro__copy{border-inline-end:0;border-bottom:1px solid var(--ac-doc-border)}}
```

- [ ] **Step 7: Run tests and commit if authorized**

```powershell
pnpm test
git add -- 'src/components/docs' 'src/content/docs/index.mdx' 'src/styles/docs-home.css' 'scripts/docs-site.test.mjs'
git commit -m 'feat(docs): add homepage content components'
```

---

## Task 4: Complete verified homepage copy

- [ ] **Step 1: Add product-fact guardrail assertions**

```js
test('docs homepage uses verified facts and avoids unsupported promises', async () => {
  const home = await readDist('index.html')
  for (const text of ['File and local imports','Connected sync','Recall cards and ratings','Self-serve data export is not a public Help Center workflow yet','Acorny is currently in public beta']) assert.match(home,new RegExp(text))
  assert.doesNotMatch(home,/SM-2|scheduler\.ts|encrypted at rest|within 24 hours|Connect Amazon account|folder watch|The beta is free|export ZIP|JSON \+ Markdown/i)
})
```

Run `pnpm test`; expect failure.

- [ ] **Step 2: Append verified sections to `index.mdx`**

```mdx
## Supported sources

### File and local imports
Acorny accepts WeRead JSON, Readwise CSV, Moon+ Reader files, Cubox JSON, Diigo CSV, Kindle `My Clippings.txt`, annotated PDFs, Acorny JSON or CSV exports, and generic CSV files.

### One-time API imports
Readwise and Diigo can be imported through their APIs for a one-time transfer.

### Connected sync
Instapaper and Inoreader are the current connected sync providers. Koodo Reader, Moon+ Reader, and Readest can push highlights through Acorny’s Readwise-compatible endpoint using an Import API token.

## Recall cards and ratings
Acorny turns saved highlights into recall cards. Review asks you to remember the idea before rereading it, then rate the result.

| Rating | Use it when | Scheduling effect |
| --- | --- | --- |
| Forgot | You could not recall the idea | Bring the card back sooner |
| Hard | Recall required effort or missed details | Keep the interval short |
| Good | You remembered the main idea | Increase the interval |
| Easy | The idea felt immediate and stable | Increase the interval more |

<Callout variant="note" title="Review timing">A highlight can exist in your library before it becomes due as a recall card. This is normal.</Callout>

## Privacy and data export
Acorny stores the highlights and account data needed to provide highlighting, import, sync, and review features. Self-serve data export is not a public Help Center workflow yet. If you need a copy of your data, contact support.

## FAQ
**Is Acorny still in beta?** Acorny is currently in public beta. Follow current in-product information for account-specific availability and pricing.

**Does Acorny replace Readwise?** Acorny focuses on recall cards and review sessions. Start with a small migration before importing a full library.

**Why is a saved highlight not in Review yet?** A highlight can be in your library before it becomes due. Check Highlights first, then return when cards are due.

## Need help?
Start with [Highlights are not showing up](/troubleshooting/highlights-not-showing/) or [Contact support](/account-data/contact-support/).
```

- [ ] **Step 3: Run tests and commit if authorized**

```powershell
pnpm test
git add -- 'src/content/docs/index.mdx' 'scripts/docs-site.test.mjs'
git commit -m 'docs(docs): publish verified homepage guidance'
```

---

## Task 5: Replace ThemeSelect without breaking Starlight state

**Files:**
- Create: `src/components/ThemeToggle.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/MobileMenuFooter.astro`
- Modify: `src/styles/marktext-docs.css`
- Modify: `scripts/docs-site.test.mjs`

- [ ] **Step 1: Add a failing static test**

```js
test('docs shell renders synchronized theme toggles', async () => {
  const home = await readDist('index.html')
  assert.equal((home.match(/<button[^>]*data-theme-toggle/g) ?? []).length, 2)
  const source = await readFile(new URL('../src/components/ThemeToggle.astro', import.meta.url), 'utf8')
  assert.match(source, /starlight-theme/)
  assert.doesNotMatch(home, /<starlight-theme-select>/)
})
```

Run `pnpm test`; expect failure.

- [ ] **Step 2: Create `ThemeToggle.astro`**

```astro
<button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="Switch to light mode" aria-pressed="false" title="Switch to light mode">
  <svg class="theme-icon theme-icon--light" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
  <svg class="theme-icon theme-icon--dark" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 7.6 7.6 0 1 0 20.5 14.5Z" /></svg>
</button>
<script>
  const storageKey = 'starlight-theme'
  const root = document.documentElement
  const media = matchMedia('(prefers-color-scheme: light)')
  const storedTheme = () => { try { return localStorage.getItem(storageKey) } catch { return null } }
  function updateControls() {
    const isDark = root.dataset.theme === 'dark'
    const next = isDark ? 'light' : 'dark'
    for (const button of document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')) {
      button.setAttribute('aria-pressed', String(isDark)); button.setAttribute('aria-label', `Switch to ${next} mode`); button.setAttribute('title', `Switch to ${next} mode`)
    }
  }
  function applyTheme(theme: 'light' | 'dark', persist: boolean) {
    root.dataset.theme = theme
    if (persist) { try { localStorage.setItem(storageKey, theme) } catch {} }
    updateControls()
  }
  updateControls()
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]:not([data-theme-bound])')) {
    button.dataset.themeBound = 'true'
    button.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true))
  }
  media.addEventListener('change', () => { if (!storedTheme()) applyTheme(media.matches ? 'light' : 'dark', false) })
</script>
```

The script binds every rendered toggle and uses Starlight’s existing `starlight-theme` key.

- [ ] **Step 3: Wire both consumers**

Replace each `ThemeSelect` import/usage in `Header.astro` and `MobileMenuFooter.astro` with:

```astro
import ThemeToggle from './ThemeToggle.astro'
```

```astro
<ThemeToggle />
```

Keep `LanguageSelect` unchanged.

- [ ] **Step 4: Add shared styles**

```css
.icon-btn{display:inline-flex;align-items:center;justify-content:center;width:2.35rem;height:2.35rem;padding:0;border:1px solid transparent;border-radius:.68rem;background:transparent;color:var(--ac-doc-muted);cursor:pointer}
.icon-btn:hover,.icon-btn:focus-visible{border-color:var(--ac-doc-border);background:color-mix(in oklch,var(--ac-doc-accent) 8%,transparent);color:var(--ac-doc-text)}
.theme-icon{display:none;width:1.1rem;height:1.1rem;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
:root[data-theme='light'] .theme-icon--light,:root[data-theme='dark'] .theme-icon--dark{display:block}
:root[data-theme='light']{color-scheme:light}:root[data-theme='dark']{color-scheme:dark}
```

- [ ] **Step 5: Run tests and commit if authorized**

```powershell
pnpm test
git add -- 'src/components/ThemeToggle.astro' 'src/components/Header.astro' 'src/components/MobileMenuFooter.astro' 'src/styles/marktext-docs.css' 'scripts/docs-site.test.mjs'
git commit -m 'feat(docs): add synchronized theme toggle'
```

---

## Task 6: Align real navigation, sidebar density, TOC, and mobile behavior

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `astro.config.mjs`
- Modify: `src/styles/marktext-docs.css`
- Modify: `scripts/docs-site.test.mjs`

- [ ] **Step 1: Add failing shell assertions**

```js
test('docs shell exposes real tabs and collapsed dense groups', async () => {
  const home = await readDist('index.html')
  const config = await readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8')
  for (const label of ['User docs','Importing','Recall cards','Privacy','Support']) assert.match(home,new RegExp(`>${label}<`))
  assert.doesNotMatch(home,/Developer docs/)
  assert.match(config,/label: 'Import & Sync',[\s\S]{0,120}collapsed: true/)
  assert.match(config,/label: 'Account & Data',[\s\S]{0,120}collapsed: true/)
})
```

Run `pnpm test`; expect failure.

- [ ] **Step 2: Replace static header tabs**

Add to `Header.astro` frontmatter:

```js
const pathname = Astro.url.pathname
const tabs = [
  { label: 'User docs', href: '/', active: pathname === '/' || pathname.startsWith('/getting-started/') },
  { label: 'Importing', href: '/import-sync/overview/', active: pathname.startsWith('/import-sync/') },
  { label: 'Recall cards', href: '/review-recall/how-review-works/', active: pathname.startsWith('/review-recall/') },
  { label: 'Privacy', href: '/account-data/privacy-beta-pricing/', active: pathname.includes('/privacy') || pathname.includes('/pricing') },
  { label: 'Support', href: '/account-data/contact-support/', active: pathname.includes('/contact-support') || pathname.startsWith('/troubleshooting/') },
]
```

Give the search wrapper `class="header-search sl-flex print:hidden"`. Replace the tabs with:

```astro
<nav class="docs-section-tabs header-shell" aria-label="Documentation sections">
  {tabs.map((tab) => <a href={tab.href} class:list={['docs-section-tab',{ active: tab.active }]} aria-current={tab.active ? 'page' : undefined}>{tab.label}</a>)}
</nav>
```

- [ ] **Step 3: Collapse dense sidebar groups**

Add `collapsed: true` immediately after the labels `Import & Sync`, `Review & Recall`, `Extensions & Apps`, `Account & Data`, and `Troubleshooting`. Leave `Getting Started` expanded and do not change any item.

- [ ] **Step 4: Simplify header layout and retain mobile search**

Remove the computed desktop grid block from the scoped `Header.astro` style. Add:

```css
.header-search{flex:1 1 28.75rem;max-width:28.75rem}.header-search :global(button[data-open-modal]){max-width:none}
@media(max-width:50rem){.header-search{flex:0 0 auto;margin-inline-start:auto}}
```

Delete the global mobile rule `.header-shell > .sl-flex.print\:hidden { display: none; }`; Starlight already hides the search label and shortcut below 50rem, leaving the icon.

- [ ] **Step 5: Add TOC, mobile, and reduced-motion styles**

```css
.right-sidebar nav ul{margin:0;padding-inline-start:0;border-inline-start:1px solid var(--ac-doc-border);list-style:none}
.right-sidebar nav a{display:block;margin-inline-start:-1px;padding:.38rem 0 .38rem 1rem;border-inline-start:1.5px solid transparent;color:var(--ac-doc-muted);font-size:.81rem;font-weight:400;line-height:1.4;text-decoration:none}
.right-sidebar nav a[style*='--depth: 1'],.right-sidebar nav a[style*='--depth: 2'],.right-sidebar nav a[style*='--depth: 3']{padding-inline-start:1.85rem;font-size:.78rem}
.right-sidebar nav a[aria-current='true'],.right-sidebar nav a[aria-current='location']{border-inline-start-color:var(--ac-doc-accent);color:var(--ac-doc-text);font-weight:500}
@media(max-width:50rem){.sidebar-pane{background:var(--ac-doc-bg)}}
@media(prefers-reduced-motion:reduce){.download-link,.pagination-links a,.docs-home-quick__link,.icon-btn{transition:none}.download-link:hover,.pagination-links a:hover,.docs-home-quick__link:hover{transform:none}}
```

- [ ] **Step 6: Run tests and commit if authorized**

```powershell
pnpm test
git add -- 'src/components/Header.astro' 'astro.config.mjs' 'src/styles/marktext-docs.css' 'scripts/docs-site.test.mjs'
git commit -m 'feat(docs): align section navigation and responsive shell'
```

---

## Task 7: Production build and Playwright acceptance

- [ ] **Step 1: Run static checks**

```powershell
pnpm lint
pnpm test
$changedDocs = git diff --name-only HEAD -- 'src/content/docs'
$unexpected = $changedDocs | Where-Object { $_ -notin @('src/content/docs/index.md','src/content/docs/index.mdx') }
if ($unexpected) { throw "Unexpected docs changes: $($unexpected -join ', ')" }
```

- [ ] **Step 2: Start production preview**

```powershell
pnpm build
$repo = (Get-Location).Path
$previewJob = Start-Job -ArgumentList $repo -ScriptBlock { param($path) Set-Location -LiteralPath $path; pnpm preview --host 127.0.0.1 }
for ($i=0; $i -lt 30; $i++) { try { if ((Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:4321/').StatusCode -eq 200) { break } } catch {}; Start-Sleep -Milliseconds 500 }
```

- [ ] **Step 3: Run rendered checks with Python Playwright**

The inline script must:

```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe')
    context=browser.new_context(viewport={'width':1440,'height':1000},permissions=['clipboard-read','clipboard-write'])
    page=context.new_page(); page.goto('http://127.0.0.1:4321/',wait_until='networkidle')
    assert page.locator('h1').count()==1
    assert page.locator('h1').inner_text()=='Turn highlights into a reviewable reading memory'
    assert page.evaluate('document.documentElement.scrollWidth===document.documentElement.clientWidth')
    before=page.locator('html').get_attribute('data-theme'); page.locator('[data-theme-toggle]').first.click(); after=page.locator('html').get_attribute('data-theme'); assert before!=after
    page.locator('[data-copy-target="review-loop"]').click(); assert page.get_by_text('Copied',exact=True).is_visible()
    page.locator('button[data-open-modal]').first.click(); page.locator('dialog input').first.fill('Kindle'); page.wait_for_timeout(600); assert page.get_by_text('Import from Kindle',exact=False).count()>0
    mobile=browser.new_context(viewport={'width':390,'height':844}); m=mobile.new_page(); m.goto('http://127.0.0.1:4321/',wait_until='networkidle')
    assert m.evaluate('document.documentElement.scrollWidth===document.documentElement.clientWidth')
    assert m.locator('button[data-open-modal]').first.is_visible(); m.get_by_role('button',name='Menu').click(); assert m.locator('.sidebar-pane').is_visible()
    browser.close()
```

Save desktop and mobile screenshots under `$env:TEMP`, not in the repository.

- [ ] **Step 4: Stop preview and inspect the diff**

```powershell
Stop-Job $previewJob -ErrorAction SilentlyContinue
Remove-Job $previewJob -Force -ErrorAction SilentlyContinue
git diff --check
git status --short
```

---

## Acceptance criteria

1. `pnpm lint` and `pnpm test` pass.
2. Production homepage contains exactly one H1 with the product-oriented title.
3. No unsupported product, privacy, billing, provider, or algorithm claim appears.
4. Other documentation content pages are unchanged.
5. Production Pagefind search returns Kindle documentation.
6. Desktop and mobile theme buttons work, synchronize, and persist through `starlight-theme`.
7. Copying the workflow changes its live label to `Copied`.
8. Top tabs link to real routes; the dead Developer docs item is gone.
9. Dense sidebar groups are collapsed by default.
10. Desktop and 390px mobile have no horizontal overflow.
11. Mobile retains a visible search icon and an opaque opened menu.
12. The right TOC has a left rail, nested-item differentiation, and accent active state.
13. The design mock is archived under `docs/designs/` as a non-production reference.

## Deliberate deviations from the earlier spec

- No manual `@astrojs/mdx` dependency or integration is added.
- The custom Starlight Hero branch prevents a second H1.
- Homepage CSS is isolated in `docs-home.css`.
- Copy behavior lives in `CodeBar.astro`, not every page through `PageTitle`.
- Product copy follows existing docs rather than unverified claims.
- Real top-level destinations and sidebar density are included because they materially affect fidelity.



