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

function buildHowToSchema(page) {
  // HowTo schema is limited to procedural docs whose titles follow current guide naming.
  // Add frontmatter opt-in before broadening this to non-import/export workflows.
  if (!/^(Import|Sync|Run|Quick start)/.test(page.title)) return null

  const sections = [...page.source.matchAll(/^##\s+(.+)$/gm)]
  const steps = []

  for (let index = 0; index < sections.length; index += 1) {
    const heading = sections[index][1].trim()
    if (/^(Related pages|What transfers|What does not transfer)$/i.test(heading)) continue

    const sectionStart = sections[index].index + sections[index][0].length
    const sectionEnd = sections[index + 1]?.index ?? page.source.length
    const sectionBody = page.source.slice(sectionStart, sectionEnd)
    if (!/^\d+\.\s+/m.test(sectionBody)) continue

    steps.push({
      '@type': 'HowToStep',
      name: heading,
      text: stripMarkdown(sectionBody),
      url: `${page.url}#${slugifyHeading(heading)}`,
    })
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
  if (page.route === '/') return null

  const sectionKey = page.route.split('/').filter(Boolean)[0]
  const section = sectionBreadcrumbs[sectionKey]
  if (!section) return null

  return {
    '@type': 'BreadcrumbList',
    '@id': `${page.url}#breadcrumb`,
    itemListElement: [
      {
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`,
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

function buildJsonLd(page) {
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
      url: page.url,
      isPartOf: { '@id': websiteId },
      publisher: { '@id': organizationId },
      inLanguage: 'en',
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
      url: `${siteUrl}${route}`,
    })
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
