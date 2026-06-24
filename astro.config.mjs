import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://docs.acorny.io',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Acorny Docs',
      description: 'Learn how to import, sync, save, and review highlights with Acorny.',
      favicon: '/favicon.ico',
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon-180x180.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'manifest',
            href: '/site.webmanifest',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://docs.acorny.io/acorny_og-image.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:width',
            content: '1663',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:height',
            content: '933',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:alt',
            content: 'Acorny — Capture highlights, turn them into recall cards, review with spaced repetition',
          },
        },
      ],
      lastUpdated: true,
      credits: true,
      customCss: ['./src/styles/marktext-docs.css', './src/styles/docs-home.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { slug: 'index', label: 'Introduction' },
            { slug: 'getting-started/what-is-acorny', label: 'What is Acorny?' },
            { slug: 'getting-started/quick-start', label: 'Quick start' },
          ],
        },
        {
          label: 'Import & Sync',
          collapsed: true,
          items: [
            { slug: 'import-sync/overview', label: 'Overview: import vs sync' },
            { slug: 'import-sync/weread', label: 'Import from WeRead' },
            { slug: 'import-sync/readwise', label: 'Import from Readwise' },
            { slug: 'import-sync/moon-reader', label: 'Import from Moon+ Reader' },
            { slug: 'import-sync/koodo-reader', label: 'Sync from Koodo Reader' },
            { slug: 'import-sync/readest', label: 'Sync from Readest' },
            { slug: 'import-sync/cubox', label: 'Import from Cubox' },
            { slug: 'import-sync/diigo', label: 'Import from Diigo' },
            { slug: 'import-sync/kindle', label: 'Import from Kindle' },
            { slug: 'import-sync/pdf', label: 'Import from PDF' },
            { slug: 'import-sync/csv', label: 'Import from CSV' },
            { slug: 'import-sync/acorny-export', label: 'Import an Acorny export' },
            { slug: 'import-sync/instapaper', label: 'Sync from Instapaper' },
            { slug: 'import-sync/inoreader', label: 'Sync from Inoreader' },
            { slug: 'import-sync/manual-sync', label: 'Run a manual sync' },
            { slug: 'import-sync/troubleshooting', label: 'Troubleshoot import and sync issues' },
          ],
        },
        {
          label: 'Review & Recall',
          collapsed: true,
          items: [
            { slug: 'review-recall/how-review-works', label: 'How review sessions work' },
            { slug: 'review-recall/how-spaced-repetition-works', label: 'How spaced repetition works' },
          ],
        },
        {
          label: 'Extensions & Apps',
          collapsed: true,
          items: [
            { slug: 'extensions/browser-extension', label: 'Browser extension' },
          ],
        },
        {
          label: 'Account & Data',
          collapsed: true,
          items: [
            { slug: 'account-data/account-security', label: 'Account security' },
            { slug: 'account-data/privacy-beta-pricing', label: 'Privacy, data, and beta pricing' },
            { slug: 'account-data/pricing', label: 'Pricing' },
            { slug: 'account-data/contact-support', label: 'Contact support' },
          ],
        },
        {
          label: 'Troubleshooting',
          collapsed: true,
          items: [
            { slug: 'troubleshooting/highlights-not-showing', label: 'Highlights are not showing up' },
          ],
        },
      ],
      social: [],
      components: {
        Head: './src/components/Head.astro',
        Header: './src/components/Header.astro',
        Hero: './src/components/docs/HomeHero.astro',
        PageTitle: './src/components/PageTitle.astro',
        PageSidebar: './src/components/docs/HomePageSidebar.astro',
        Pagination: './src/components/docs/HomePagePagination.astro',
        MobileMenuFooter: './src/components/MobileMenuFooter.astro',
      },
    }),
    sitemap(),
  ],
})
