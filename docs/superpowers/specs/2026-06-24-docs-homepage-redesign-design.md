# Acorny Docs Homepage Redesign — Design Spec

**Date:** 2026-06-24
**Author:** brainstorm session
**Status:** awaiting user review
**Scope:** `docs.acorny.io` homepage (`src/content/docs/index.md`) + shared styles and components used by the homepage only, **plus a targeted header change to replace the theme dropdown with a single toggle button**. All other docs pages keep their existing `.md` files unchanged. Other header elements (search, language, social, CTA, brand) remain as currently implemented.

## 1. Context and motivation

The reference design `acorny-docs.html` (at the project root, to be archived under `docs/designs/`) describes a structured docs homepage: hero, intro panel with a numbered flow stack, quick-link grid, callouts, and a workflow code block. The current `src/content/docs/index.md` is plain prose without the design's visual treatment.

Goal: align the docs homepage structure and visual treatment with the reference design, using Acorny-specific copy. Do not retrofit every subpage.

## 2. Architectural decisions

- **Add `@astrojs/mdx` to dependencies and register the integration in `astro.config.mjs`.**
  - Reason: only the homepage needs JSX/Astro components. Other pages keep `.md`.
- **Rename `src/content/docs/index.md` → `src/content/docs/index.mdx`.**
  - Reason: the homepage uses new Astro components, which require MDX.
- **Place new components in `src/components/docs/`** to keep them separate from the existing Starlight-overridden components (`Header`, `PageTitle`, `MobileMenuFooter`, `Head`) at `src/components/`.
- **Continue using `src/styles/marktext-docs.css` as the single source of design tokens.** New component styles append to the same file. No new CSS files.

## 3. Component library

Homepage-only components live under `src/components/docs/`. The theme toggle (used by the header) lives at `src/components/ThemeToggle.astro` because it is wired into `Header.astro` and `MobileMenuFooter.astro`, not the homepage body. Each component has a single responsibility and a small, explicit prop interface (where applicable).

### 3.1 `Hero.astro`

```ts
interface Props {
  eyebrow?: string;   // default "User documentation"
  title: string;      // required, rendered as <h1>
  lead: string;       // required, rendered as <p>
  meta?: string[];    // optional meta strip, dot-separated
}
```

### 3.2 `IntroPanel.astro`

```ts
interface Props {
  file?: string;      // top-left path display, e.g. "docs/introduction"
  badge?: string;     // top-right label, e.g. "Acorny quick start"
  copy: string;       // left column body
  copyTitle?: string; // bold title above copy
}
// Slot "aside" hosts the right column (typically a <FlowStack />)
```

### 3.3 `FlowStack.astro`

```ts
interface Props {
  steps: Array<{
    num: string;    // "01" / "02" / "03"
    kicker: string; // small uppercase label, e.g. "Capture"
    label: string;  // main description
  }>;
}
```

### 3.4 `QuickGrid.astro`

```ts
interface Props {
  items: Array<{
    title: string;  // bold link label
    desc: string;   // muted description
    href: string;   // internal route or anchor
  }>;
}
```

### 3.5 `Callout.astro`

```ts
interface Props {
  variant?: 'tip' | 'note'; // default "tip"
  title?: string;           // optional bold title
}
// Body via <slot />
```

### 3.6 `CodeBar.astro`

```ts
interface Props {
  lang: string;     // shown as the language tag, e.g. "workflow"
  targetId: string; // id of the <pre> the copy button targets
}
// Body via <slot /> — typically <pre><code>…</code></pre>
```

### 3.7 `ThemeToggle.astro` (header-level component, **not** under `src/components/docs/`)

Replaces Starlight's `<ThemeSelect>` dropdown with a single icon button matching the reference design's toggle.

Props: none. The component reads the current theme from `document.documentElement.dataset.theme` and renders:

- A `<button class="icon-btn" type="button" aria-label="Toggle theme" aria-pressed="…" title="…">`.
- Two `<svg>` icons (sun and moon), shown/hidden via `[data-theme]` attribute selectors (no client JS for visibility).
- A small inline `<script>` (no external file needed) that:
  - Reads the persisted theme from `localStorage.getItem('acorny-theme')` on init and sets `data-theme` if a stored value exists.
  - On click, toggles `data-theme` between `"light"` and `"dark"`, persists the new value, and updates `aria-pressed` + `title`.

Storage key: `acorny-theme` (matching the reference design).

### 3.8 Header updates

- `src/components/Header.astro`: replace the existing `<ThemeSelect />` import and usage with `<ThemeToggle />`. Keep all other header elements (brand, search, language, social, CTA, section tabs) unchanged.
- `src/components/MobileMenuFooter.astro`: same replacement for visual consistency between desktop and mobile.

## 4. CSS additions

All new styles append to `src/styles/marktext-docs.css`. No new files.

New class prefixes / blocks:

| Block | Class(es) |
| --- | --- |
| Hero | `.docs-hero`, `.docs-hero__eyebrow`, `.docs-hero__title`, `.docs-hero__lead`, `.docs-hero__meta` |
| Intro panel | `.intro-panel`, `.intro-panel__bar`, `.intro-panel__body`, `.intro-panel__copy`, `.intro-panel__aside` |
| Flow stack | `.flow-stack`, `.flow-card`, `.flow-card small`, `.flow-card span` |
| Quick grid | `.quick-grid`, `.quick-link`, `.quick-link b`, `.quick-link span` |
| Callout | `.ac-callout`, `.ac-callout--tip`, `.ac-callout--note` |
| Code bar | `.code-bar`, `.code-bar__lang`, `.code-bar__copy` |
| Theme toggle | `.icon-btn`, `.theme-icon`, `[data-theme] .theme-icon-light`, `[data-theme] .theme-icon-dark` (matches `.icon-btn` styling already used in the existing `Header.astro` so no new tokens are needed) |

Rules:

- Reuse existing `var(--ac-doc-*)` tokens, including dark-mode variants. Do not redeclare colors.
- Use `color-mix(in oklch, ...)` for hover/active states.
- Responsive: at `≤860px` collapse `.intro-panel__body` to a single column and `.quick-grid` to one column.
- The `.ac-callout` prefix avoids collisions with Starlight's `starlight-aside` styles.

## 5. Content structure of `src/content/docs/index.mdx`

Order and components used:

1. `<Hero … />` — eyebrow "User documentation", title "Turn highlights into a reviewable reading memory.", lead describing Acorny as a capture-to-review loop, meta strip with three entries.
2. `<IntroPanel …>` — copy on the left, `<FlowStack>` (3 steps: Capture / Shape / Review) on the right.
3. `## Start here` heading + `<QuickGrid />` with 4 items (Supported sources, Recall cards, Privacy & exports, FAQ).
4. Numbered Markdown list — three steps.
5. `<Callout variant="tip">` — "Quick recommendation".
6. `## The daily review loop` + `<CodeBar lang="workflow" targetId="flow-code">` with the pseudocode block.
7. `## Supported sources` — Markdown table.
8. `### Browser extension capture` and `### Reader imports` — short prose sections.
9. `## Recall cards` — bullet list of Cloze vs Q&A guidance.
10. `<Callout variant="note">` — short design rationale.
11. `### Spaced repetition` — short prose.
12. `## Privacy & exports` — bullet list.
13. `## FAQ` — short paragraph linking to `/account-data/pricing/` and `/troubleshooting/highlights-not-showing/`.
14. `## Need help?` — preserved from the current page, with links to troubleshooting and contact support.

Removed (replaced by design structure):

- The current `## Common jobs` table — replaced by `<QuickGrid>`.
- The current `## Core concepts` definition list — semantics absorbed into `<IntroPanel>` + `<FlowStack>`.

Frontmatter `title` and `description` are preserved so SEO meta continues to flow through Starlight.

Copy rules:

- Acorny-specific language only. No reference to "MarkText" anywhere on the rendered page.

## 6. Client-side scripts

Add a new client-side script `src/scripts/copy-code.ts` that wires up any element with a `data-copy-target` attribute to copy the text content of the referenced element (`document.getElementById(...)`) to the clipboard, with a temporary "Copied" flash. Wire the script into a layout entrypoint already loaded on every page — `src/components/PageTitle.astro` is the natural choice since Starlight already mounts it on every docs page.

The script must be a no-op when there are no `[data-copy-target]` elements on the page. Use `navigator.clipboard.writeText` with a `document.execCommand('copy')` fallback, matching the behavior described in the reference design.

## 7. Test updates (`scripts/docs-site.test.mjs`)

Updates:

- In `'docs build emits SEO and crawler artifacts for docs.acorny.io'`, append three `assert.match` checks for the new homepage copy (`Turn highlights into a reviewable reading memory`, `Acorny quick start`, `Capture the quote with its source context`).
- In `'docs UI uses the Acorny MarkText-inspired documentation shell'`, append CSS class assertions for `.intro-panel`, `.intro-panel__bar`, `.flow-stack`, `.flow-card`, `.quick-grid`, `.quick-link`, `.ac-callout`, `.ac-callout--tip`, `.ac-callout--note`, `.code-bar`.
- Add a new test: `'docs homepage renders hero, intro panel, flow stack, quick grid'` that asserts the homepage HTML contains `class="docs-hero"`, `class="intro-panel__bar"`, the literal `01 Capture Save the quote…` sequence, and the four quick-grid titles.
- Add asserts for `class="code-bar__copy"` and `data-copy-target="flow-code"`.
- In `'docs UI uses the Acorny MarkText-inspired documentation shell'`, also assert that the theme toggle button is present in the rendered HTML (so we know the dropdown was replaced):
  ```js
  assert.match(home, /aria-label="Toggle theme"/)
  assert.match(home, /theme-icon-light/)
  assert.match(home, /theme-icon-dark/)
  ```

Unchanged tests:

- `'phase 3 structured data renders JSON-LD …'` — unchanged.
- `'required first-wave pages render as static HTML'` — unchanged.
- `'provider guides include setup-specific instructions'` — unchanged.
- `'phase 2 content foundation …'` — unchanged.

## 8. Reference design file handling

- Move `acorny-docs.html` from the project root to `docs/designs/acorny-docs-homepage.html`.
- Add `docs/designs/README.md` describing it as a design reference for the 2026-06-24 homepage redesign and pointing to `src/content/docs/index.mdx` as the implemented version.
- Both files are tracked in git.

## 9. Out of scope

- Other docs pages (`getting-started/*`, `import-sync/*`, etc.) — content and styling unchanged.
- Other header elements: brand, search, language selector, social icons, "Open Acorny" link, and the User docs / Developer docs section tabs all stay exactly as they are. The only header change is the theme selector.
- New SEO / structured-data work — existing `inject-structured-data.mjs` continues to run as-is.
- Translations — the existing `LanguageSelect` continues to behave the same way; no new locales.

## 10. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| MDX upgrade breaks Starlight content collection | Add `@astrojs/mdx` alongside Starlight; only one file becomes `.mdx`. Verify `pnpm build` succeeds before/after. |
| New CSS classes conflict with Starlight defaults | Use distinct prefixes (`.docs-hero`, `.intro-panel`, `.ac-callout`) and scope all new rules behind existing `var(--ac-doc-*)` tokens. |
| Tests become brittle to copy edits | Keep new assertions scoped to structural class names and short, stable copy snippets; avoid matching full sentences. |
| Copy-code script runs on pages without a `<CodeBar>` | `src/scripts/copy-code.ts` uses `Array.prototype.forEach.call(document.querySelectorAll('[data-copy-target]'), …)` — empty selection is a no-op. |

## 11. Acceptance criteria

1. `pnpm build` succeeds; the homepage HTML at `dist/index.html` contains the new structural classes and the Acorny-specific copy.
2. `pnpm test` passes all existing assertions plus the new homepage/CSS assertions.
3. `docs/designs/acorny-docs-homepage.html` exists at the new path; the project root no longer contains `acorny-docs.html`.
4. All other `.md` files are unchanged.
5. The rendered header (homepage and any other page) shows a single icon-button theme toggle, not a `<select>` dropdown. Same for the mobile menu footer.
