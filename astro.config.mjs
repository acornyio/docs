import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://docs.acorny.io',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: { en: 'Acorny Help Center', 'zh-CN': 'Acorny 帮助中心' },
      description: 'Learn how to import, sync, save, and review highlights with Acorny.',
      favicon: '/favicon.ico',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        zh: { label: '简体中文', lang: 'zh-CN' },
      },
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
          translations: { 'zh-CN': '入门' },
          items: [
            { slug: 'index', label: 'Introduction', translations: { 'zh-CN': '介绍' } },
            { slug: 'getting-started/what-is-acorny', label: 'What is Acorny?', translations: { 'zh-CN': 'Acorny 是什么？' } },
            { slug: 'getting-started/quick-start', label: 'Quick start', translations: { 'zh-CN': '快速开始' } },
          ],
        },
        {
          label: 'Import & Sync',
          collapsed: true,
          translations: { 'zh-CN': '导入与同步' },
          items: [
            { slug: 'import-sync/overview', label: 'Overview: import vs sync', translations: { 'zh-CN': '概览：导入与同步' } },
            { slug: 'import-sync/weread', label: 'Import from WeRead', translations: { 'zh-CN': '从微信读书导入' } },
            { slug: 'import-sync/readwise', label: 'Import from Readwise', translations: { 'zh-CN': '从 Readwise 导入' } },
            { slug: 'import-sync/moon-reader', label: 'Import from Moon+ Reader', translations: { 'zh-CN': '从 Moon+ Reader 导入' } },
            { slug: 'import-sync/koodo-reader', label: 'Sync from Koodo Reader', translations: { 'zh-CN': '从 Koodo Reader 同步' } },
            { slug: 'import-sync/readest', label: 'Sync from Readest', translations: { 'zh-CN': '从 Readest 同步' } },
            { slug: 'import-sync/cubox', label: 'Import from Cubox', translations: { 'zh-CN': '从 Cubox 导入' } },
            { slug: 'import-sync/diigo', label: 'Import from Diigo', translations: { 'zh-CN': '从 Diigo 导入' } },
            { slug: 'import-sync/kindle', label: 'Import from Kindle', translations: { 'zh-CN': '从 Kindle 导入' } },
            { slug: 'import-sync/pdf', label: 'Import from PDF', translations: { 'zh-CN': '从 PDF 导入' } },
            { slug: 'import-sync/csv', label: 'Import from CSV', translations: { 'zh-CN': '从 CSV 导入' } },
            { slug: 'import-sync/acorny-export', label: 'Import an Acorny export', translations: { 'zh-CN': '导入 Acorny 导出文件' } },
            { slug: 'import-sync/instapaper', label: 'Sync from Instapaper', translations: { 'zh-CN': '从 Instapaper 同步' } },
            { slug: 'import-sync/inoreader', label: 'Sync from Inoreader', translations: { 'zh-CN': '从 Inoreader 同步' } },
            { slug: 'import-sync/manual-sync', label: 'Run a manual sync', translations: { 'zh-CN': '运行手动同步' } },
            { slug: 'import-sync/troubleshooting', label: 'Troubleshoot import and sync issues', translations: { 'zh-CN': '排查导入与同步问题' } },
          ],
        },
        {
          label: 'Review & Recall',
          collapsed: true,
          translations: { 'zh-CN': '复习与回顾' },
          items: [
            { slug: 'review-recall/how-review-works', label: 'How review sessions work', translations: { 'zh-CN': '复习会话如何运作' } },
            { slug: 'review-recall/how-spaced-repetition-works', label: 'How spaced repetition works', translations: { 'zh-CN': '间隔重复如何运作' } },
          ],
        },
        {
          label: 'Extensions & Apps',
          collapsed: true,
          translations: { 'zh-CN': '扩展与应用' },
          items: [
            { slug: 'extensions/browser-extension', label: 'Browser extension', translations: { 'zh-CN': '浏览器扩展' } },
          ],
        },
        {
          label: 'Account & Data',
          collapsed: true,
          translations: { 'zh-CN': '账户与数据' },
          items: [
            { slug: 'account-data/account-security', label: 'Account security', translations: { 'zh-CN': '账户安全' } },
            { slug: 'account-data/privacy-beta-pricing', label: 'Privacy, data, and beta pricing', translations: { 'zh-CN': '隐私、数据与 Beta 定价' } },
            { slug: 'account-data/pricing', label: 'Pricing', translations: { 'zh-CN': '定价' } },
            { slug: 'account-data/contact-support', label: 'Contact support', translations: { 'zh-CN': '联系支持' } },
          ],
        },
        {
          label: 'Troubleshooting',
          collapsed: true,
          translations: { 'zh-CN': '故障排查' },
          items: [
            { slug: 'troubleshooting/highlights-not-showing', label: 'Highlights are not showing up', translations: { 'zh-CN': '高亮未显示' } },
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
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', zh: 'zh-CN' },
      },
    }),
  ],
})
