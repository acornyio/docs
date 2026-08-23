import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentRoot = path.join(packageRoot, 'src', 'content', 'docs')
const distRoot = path.join(packageRoot, 'dist')
const siteUrl = 'https://docs.acorny.io'

const organizationId = 'https://acorny.io/#organization'
const websiteId = `${siteUrl}/#website`

// The docs site does not currently publish section index pages like /import-sync/.
// Use stable section landing pages as breadcrumb nodes until those indexes exist.
const sectionBreadcrumbs = {
  'account-data': {
    name: 'Account & Data',
    item: `${siteUrl}/account-data/privacy-beta-pricing/`,
  },
  extensions: {
    name: 'Extensions & Apps',
    item: `${siteUrl}/extensions/browser-extension/`,
  },
  'getting-started': {
    name: 'Getting Started',
    item: `${siteUrl}/getting-started/what-is-acorny/`,
  },
  'import-sync': {
    name: 'Import & Sync',
    item: `${siteUrl}/import-sync/overview/`,
  },
  'review-recall': {
    name: 'Review & Recall',
    item: `${siteUrl}/review-recall/how-review-works/`,
  },
  troubleshooting: {
    name: 'Troubleshooting',
    item: `${siteUrl}/troubleshooting/highlights-not-showing/`,
  },
}

const sectionBreadcrumbsZh = {
  'getting-started': { name: '入门', item: `${siteUrl}/zh/getting-started/what-is-acorny/` },
  'import-sync': { name: '导入与同步', item: `${siteUrl}/zh/import-sync/overview/` },
  'review-recall': { name: '复习与回顾', item: `${siteUrl}/zh/review-recall/how-review-works/` },
  extensions: { name: '扩展与应用', item: `${siteUrl}/zh/extensions/browser-extension/` },
  'account-data': { name: '账户与数据', item: `${siteUrl}/zh/account-data/privacy-beta-pricing/` },
  troubleshooting: { name: '故障排查', item: `${siteUrl}/zh/troubleshooting/highlights-not-showing/` },
}

const auditedHowToSections = {
  '/getting-started/quick-start/': [
    { name: '1. Create or sign in to your account', anchor: '1-create-or-sign-in-to-your-account' },
    { name: '2. Install the browser extension', anchor: '2-install-the-browser-extension' },
    { name: '3. Save your first highlight', anchor: '3-save-your-first-highlight' },
    { name: '4. Check your highlights', anchor: '4-check-your-highlights' },
    { name: '5. Start your first review', anchor: '5-start-your-first-review' },
    { name: '6. Import existing highlights', anchor: '6-import-existing-highlights' },
    { name: '7. Know what "caught up" means', anchor: '7-know-what-caught-up-means' },
  ],
  '/zh/getting-started/quick-start/': [
    { name: '1. 创建账户或登录', anchor: '1-创建账户或登录' },
    { name: '2. 安装浏览器扩展', anchor: '2-安装浏览器扩展' },
    { name: '3. 保存你的第一条高亮', anchor: '3-保存你的第一条高亮' },
    { name: '4. 检查你的高亮', anchor: '4-检查你的高亮' },
    { name: '5. 开始你的第一次复习', anchor: '5-开始你的第一次复习' },
    { name: '6. 导入现有高亮', anchor: '6-导入现有高亮' },
    {
      name: '7. 了解“caught up”（复习完）是什么意思',
      anchor: '7-了解caught-up复习完是什么意思',
    },
  ],
  '/import-sync/kindle/': [
    { name: 'Get My Clippings.txt', anchor: 'get-my-clippingstxt' },
    { name: 'Import into Acorny', anchor: 'import-into-acorny' },
  ],
  '/zh/import-sync/kindle/': [
    { name: '获取 My Clippings.txt', anchor: '获取-my-clippingstxt' },
    { name: '导入到 Acorny', anchor: '导入到-acorny' },
  ],
  '/import-sync/moon-reader/': [
    { name: 'Export from Moon+ Reader', anchor: 'export-from-moon-reader' },
    { name: 'Import into Acorny', anchor: 'import-into-acorny' },
  ],
  '/zh/import-sync/moon-reader/': [
    { name: '从 Moon+ Reader 导出', anchor: '从-moon-reader-导出' },
    { name: '导入到 Acorny', anchor: '导入到-acorny' },
  ],
  '/import-sync/diigo/': [
    { name: 'Export from Diigo', anchor: 'export-from-diigo' },
    { name: 'Upload into Acorny', anchor: 'upload-into-acorny' },
  ],
  '/zh/import-sync/diigo/': [
    { name: '从 Diigo 导出', anchor: '从-diigo-导出' },
    { name: '上传到 Acorny', anchor: '上传到-acorny' },
  ],
  '/import-sync/readwise/': [
    { name: 'Import options', anchor: 'import-options' },
    { name: 'Large migrations', anchor: 'large-migrations' },
    { name: 'After import', anchor: 'after-import' },
  ],
  '/zh/import-sync/readwise/': [
    { name: '导入选项', anchor: '导入选项' },
    { name: '大批量迁移', anchor: '大批量迁移' },
    { name: '导入之后', anchor: '导入之后' },
  ],
}

export function localeFromRoute(route) {
  return route.startsWith('/zh/') ? 'zh-CN' : 'en'
}

async function listMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        return listMarkdownFiles(fullPath)
      }
      return entry.isFile() && /\.mdx?$/.test(entry.name) ? [fullPath] : []
    }),
  )

  return files.flat()
}

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const frontmatter = {}
  if (!match) return frontmatter

  for (const line of match[1].split(/\r?\n/)) {
    const keyValue = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!keyValue) continue
    const [, key, rawValue] = keyValue
    frontmatter[key] = rawValue.replace(/^['"]|['"]$/g, '')
  }

  return frontmatter
}

function routeFromMarkdownFile(filePath) {
  const relativePath = path.relative(contentRoot, filePath).replaceAll(path.sep, '/')
  if (relativePath === '404.md') return null
  if (/^index\.mdx?$/.test(relativePath)) return '/'
  if (/\/index\.mdx?$/.test(relativePath)) {
    return `/${relativePath.replace(/\/index\.mdx?$/, '')}/`
  }
  return `/${relativePath.replace(/\.mdx?$/, '')}/`
}

function htmlFileForRoute(route, targetDistRoot = distRoot) {
  if (route === '/') return path.join(targetDistRoot, 'index.html')
  return path.join(targetDistRoot, route.slice(1), 'index.html')
}

function slugifyHeading(heading) {
  return heading
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[`*_>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractSections(source) {
  const headings = [...source.matchAll(/^(#{2,3})\s+(.+)$/gm)]

  return headings.map((heading, index) => {
    const sectionStart = heading.index + heading[0].length
    const sectionEnd = headings[index + 1]?.index ?? source.length

    return {
      level: heading[1].length,
      heading: heading[2].trim(),
      body: source.slice(sectionStart, sectionEnd),
    }
  })
}

function buildHowToSchema(page) {
  const auditedSections = auditedHowToSections[page.route]
  if (!auditedSections && !/^(Import|Sync|Run|Quick start|从|导入|运行|快速开始)/.test(page.title)) {
    return null
  }

  const sections = extractSections(page.source)
  let steps

  if (auditedSections) {
    const sectionsByHeading = new Map(sections.map((section) => [section.heading, section]))
    steps = auditedSections.map(({ name, anchor }) => {
      const section = sectionsByHeading.get(name)
      const text = section ? stripMarkdown(section.body) : ''
      if (!text) return null

      return {
        '@type': 'HowToStep',
        name,
        text,
        url: `${page.url}#${anchor}`,
      }
    })

    // Do not publish a partial workflow if an audited visible heading is renamed or removed.
    if (steps.some((step) => step === null)) return null
  } else {
    steps = sections
      .filter((section) => section.level === 2)
      .filter((section) => !/^(Related pages|What transfers|What does not transfer)$/i.test(section.heading))
      .filter((section) => /^\d+\.\s+/m.test(section.body))
      .map((section) => ({
        '@type': 'HowToStep',
        name: section.heading,
        text: stripMarkdown(section.body),
        url: `${page.url}#${slugifyHeading(section.heading)}`,
      }))
  }

  if (steps.length === 0) return null

  return {
    '@type': 'HowTo',
    '@id': `${page.url}#howto`,
    name: page.title,
    description: page.description,
    step: steps,
  }
}

function buildBreadcrumbSchema(page) {
  if (page.route === '/' || page.route === '/zh/') return null

  const parts = page.route.split('/').filter(Boolean)
  const isZh = parts[0] === 'zh'
  const sectionKey = isZh ? parts[1] : parts[0]
  const sections = isZh ? sectionBreadcrumbsZh : sectionBreadcrumbs
  const section = sections[sectionKey]
  if (!section) return null

  return {
    '@type': 'BreadcrumbList',
    '@id': `${page.url}#breadcrumb`,
    itemListElement: [
      {
        position: 1,
        name: isZh ? '首页' : 'Home',
        item: isZh ? `${siteUrl}/zh/` : `${siteUrl}/`,
        '@type': 'ListItem',
      },
      {
        position: 2,
        name: section.name,
        item: section.item,
        '@type': 'ListItem',
      },
      {
        position: 3,
        name: page.title,
        item: page.url,
        '@type': 'ListItem',
      },
    ],
  }
}

function normalizeDateModified(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) return undefined

  const date = new Date(`${value}T00:00:00.000Z`)
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== value) return undefined

  return value
}

export function buildJsonLd(page) {
  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: 'Acorny',
      url: 'https://acorny.io',
      logo: 'https://acorny.io/logo.svg',
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'Acorny Docs',
      url: `${siteUrl}/`,
      publisher: { '@id': organizationId },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${page.url}#webpage`,
      name: page.title,
      description: page.description,
      dateModified: normalizeDateModified(page.dateModified),
      url: page.url,
      isPartOf: { '@id': websiteId },
      publisher: { '@id': organizationId },
      inLanguage: localeFromRoute(page.route),
    },
  ]

  const breadcrumbSchema = buildBreadcrumbSchema(page)
  if (breadcrumbSchema) graph.push(breadcrumbSchema)

  const howToSchema = buildHowToSchema(page)
  if (howToSchema) graph.push(howToSchema)

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

function toScript(schema) {
  const json = JSON.stringify(schema).replace(/</g, '\\u003c')
  return `<script type="application/ld+json">${json}</script>`
}

export function insertBeforeClosingHead(html, script, htmlPath) {
  const nextHtml = html.replace('</head>', `${script}</head>`)
  if (nextHtml === html) {
    throw new Error(`Failed to inject structured data into ${htmlPath}: missing </head>`)
  }
  return nextHtml
}

export async function injectStructuredData(page, targetDistRoot = distRoot) {
  const htmlPath = htmlFileForRoute(page.route, targetDistRoot)
  let html
  try {
    html = await readFile(htmlPath, 'utf8')
  } catch (error) {
    throw new Error(`Failed to read built HTML for route ${page.route} at ${htmlPath}`, { cause: error })
  }

  const script = toScript(buildJsonLd(page))
  const nextHtml = insertBeforeClosingHead(html, script, htmlPath)
  await writeFile(htmlPath, nextHtml, 'utf8')
}

async function main() {
  const markdownFiles = await listMarkdownFiles(contentRoot)

  for (const filePath of markdownFiles) {
    const route = routeFromMarkdownFile(filePath)
    if (!route) continue

    const source = await readFile(filePath, 'utf8')
    const frontmatter = parseFrontmatter(source)
    await injectStructuredData({
      route,
      source,
      title: frontmatter.title ?? 'Acorny Docs',
      description: frontmatter.description ?? 'Learn how to import, sync, save, and review highlights with Acorny.',
      dateModified: frontmatter.lastUpdated,
      url: `${siteUrl}${route}`,
    })
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
