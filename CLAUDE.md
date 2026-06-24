# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow — mandatory worktree for code changes

All code modifications **must** happen in a new git worktree. Never edit files on `main` (or any existing branch) directly.

```bash
# 1. Create a worktree with a descriptive branch name
git worktree add .worktrees/<branch-name> -b <branch-name>

# 2. Make changes inside the worktree
cd .worktrees/<branch-name>
# ... edit, commit, test ...

# 3. After merging / finishing, clean up
git worktree remove .worktrees/<branch-name>
```

Rules:
- Branch name should describe the change (e.g. `fix/header-layout`, `feat/new-import-guide`).
- Run `pnpm test` inside the worktree before merging.
- Never commit directly to `main`.
- Worktrees live under `.worktrees/` (already in `.gitignore`).

## What this is

Source for the Acorny Help Center public docs site at <https://docs.acorny.io/>. Astro 6 + Starlight static site, deployed on Vercel. Package name `@acorny/docs` (private, `pnpm@11.1.2`, ESM).

## Commands

```bash
pnpm install          # install deps
pnpm dev              # astro dev (local docs server with HMR)
pnpm build            # astro build + scripts/inject-structured-data.mjs (post-build JSON-LD injection)
pnpm preview          # astro preview against ./dist
pnpm lint             # astro check (type-checks Starlight virtual modules via src/starlight.d.ts)
pnpm test             # pnpm run build && node --test ./scripts/docs-site.test.mjs ./scripts/inject-structured-data.test.mjs
```

There is no `--watch` test mode — `pnpm test` is the only test entry point and it always rebuilds first. Tests read files from `./dist/`, so any build failure will surface as a test failure. To run a single test file directly (skip the rebuild) use `node --test ./scripts/<file>.test.mjs` — the unit-test file `scripts/inject-structured-data.test.mjs` does not need a fresh build.

## Architecture

### Content pipeline

1. Markdown in `src/content/docs/<section>/<page>.md` is loaded by Starlight via `docsLoader()` (see `src/content.config.ts`) and rendered to static HTML at the matching `/<section>/<page>/index.html` route. The site URL is hard-coded with `trailingSlash: 'always'` in `astro.config.mjs` — every internal link must end with `/`.
2. `astro build` emits the static site into `./dist/` along with Starlight's `robots.txt`, `sitemap-index.xml`, `llms.txt`, and `404.html`.
3. `scripts/inject-structured-data.mjs` (chained after `astro build`) walks `src/content/docs/**/*.md`, parses frontmatter `title` / `description`, builds a JSON-LD `@graph` (Organization + WebSite + WebPage, plus BreadcrumbList for non-root pages and HowTo for procedural pages), and inserts a `<script type="application/ld+json">` tag immediately before `</head>` in each matching `dist/.../index.html`.

### Custom Starlight overrides

Configured via `astro.config.mjs → integrations.starlight({ components: { ... } })`:

- `src/components/Head.astro` — wraps Starlight's default `Head` and appends `@vercel/analytics`.
- `src/components/Header.astro` — wraps the Starlight header (SiteTitle / Search / SocialIcons / ThemeSelect / LanguageSelect) with a custom layout grid and a "Back to Acorny" link to <https://acorny.io>. Uses `virtual:starlight/*` imports — these are declared in `src/starlight.d.ts` so `astro check` can resolve them.
- `src/components/MobileMenuFooter.astro` — mobile menu footer variant of the header.

`social: []` is intentionally empty — SocialIcons renders nothing in this build, but the slot is still wired up so the header grid reserves space for it.

### Sidebar & structured-data parity

The sidebar in `astro.config.mjs` and the `sectionBreadcrumbs` map in `scripts/inject-structured-data.mjs` are the two hand-maintained registries that must stay in sync with the markdown on disk:

- Every `.md` file under `src/content/docs/` (except `404.md` and `index.md`) should appear in the sidebar.
- Every section directory should have a matching entry in `sectionBreadcrumbs` so nested pages emit a `BreadcrumbList`. The current build has no section-index pages, so each section's breadcrumb points to its first real page.

When adding a new page: add the file, add a sidebar entry, and (if it introduces a new section) add a breadcrumb entry. Tests in `scripts/docs-site.test.mjs` enumerate the required pages and will fail if the sidebar, sitemap, or dist output drifts.

### Test layout

- `scripts/inject-structured-data.test.mjs` — pure unit tests for the injector's helpers (`insertBeforeClosingHead`, `injectStructuredData`) using `node:test` and `tmpdir()` for isolated fixtures.
- `scripts/docs-site.test.mjs` — end-to-end tests that read from `./dist/` after a build and assert on robots, llms.txt, sitemap, JSON-LD presence, required pages, and provider-guide specifics (Cubox exporter URL, Moon+ Reader API path, Readest custom URL, etc.). Add new assertions here when adding pages that need SEO coverage guarantees.

### Vercel

`vercel.json` adds `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` (camera/microphone/geolocation disabled). Build command and output directory match the README defaults; no framework preset is overridden.