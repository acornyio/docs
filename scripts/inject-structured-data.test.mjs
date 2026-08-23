import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'

import {
  buildJsonLd,
  injectStructuredData,
  insertBeforeClosingHead,
  localeFromRoute,
} from './inject-structured-data.mjs'

test('insertBeforeClosingHead injects JSON-LD before the closing head tag', () => {
  const script = '<script type="application/ld+json">{"@type":"WebPage"}</script>'

  const html = insertBeforeClosingHead('<html><head><title>Docs</title></head><body></body></html>', script, 'dist/index.html')

  assert.match(html, /<title>Docs<\/title><script type="application\/ld\+json">/)
  assert.match(html, /<\/script><\/head><body>/)
})

test('insertBeforeClosingHead throws a clear error when the closing head tag is missing', () => {
  const script = '<script type="application/ld+json">{"@type":"WebPage"}</script>'

  assert.throws(
    () => insertBeforeClosingHead('<html><body></body></html>', script, 'dist/index.html'),
    /Failed to inject structured data into dist\/index\.html: missing <\/head>/,
  )
})

test('injectStructuredData adds route context when the dist html file is missing', async () => {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'acorny-docs-schema-'))

  try {
    await assert.rejects(
      () =>
        injectStructuredData(
          {
            route: '/missing/',
            source: '---\ntitle: Missing\ndescription: Missing page.\n---\n',
            title: 'Missing',
            description: 'Missing page.',
            url: 'https://docs.acorny.io/missing/',
          },
          tempDir,
        ),
      /Failed to read built HTML for route \/missing\/ at .*missing.*index\.html/,
    )
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
})

test('injectStructuredData writes JSON-LD into the selected dist file', async () => {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'acorny-docs-schema-'))
  const routeDir = path.join(tempDir, 'guide')
  const htmlPath = path.join(routeDir, 'index.html')

  try {
    await mkdir(routeDir)
    await writeFile(htmlPath, '<html><head><title>Guide</title></head><body></body></html>', 'utf8')

    await injectStructuredData(
      {
        route: '/guide/',
        source: '---\ntitle: Guide\ndescription: Guide page.\n---\n',
        title: 'Guide',
        description: 'Guide page.',
        url: 'https://docs.acorny.io/guide/',
      },
      tempDir,
    )

    const html = await readFile(htmlPath, 'utf8')
    assert.match(html, /<script type="application\/ld\+json">/)
    assert.match(html, /"@type":"WebPage"/)
    assert.match(html, /"name":"Guide"/)
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
})

test('localeFromRoute detects the zh locale from a /zh/ route', () => {
  assert.equal(localeFromRoute('/zh/import-sync/kindle/'), 'zh-CN')
  assert.equal(localeFromRoute('/zh/'), 'zh-CN')
})

test('localeFromRoute returns en for root-locale routes', () => {
  assert.equal(localeFromRoute('/import-sync/kindle/'), 'en')
  assert.equal(localeFromRoute('/'), 'en')
})

test('buildJsonLd marks a zh page with inLanguage zh-CN and a localized breadcrumb', () => {
  const schema = buildJsonLd({
    route: '/zh/import-sync/kindle/',
    source: '## Import into Acorny\n1. Step',
    title: '从 Kindle 导入',
    description: '从 Kindle My Clippings.txt 导入高亮和笔记。',
    url: 'https://docs.acorny.io/zh/import-sync/kindle/',
  })
  const graph = Object.fromEntries(schema['@graph'].map((n) => [n['@type'], n]))
  assert.equal(graph.WebPage.inLanguage, 'zh-CN')
  assert.equal(graph.BreadcrumbList.itemListElement[0].name, '首页')
  assert.equal(graph.BreadcrumbList.itemListElement[0].item, 'https://docs.acorny.io/zh/')
  assert.equal(graph.BreadcrumbList.itemListElement[1].name, '导入与同步')
  assert.equal(graph.BreadcrumbList.itemListElement[1].item, 'https://docs.acorny.io/zh/import-sync/overview/')
})

test('buildJsonLd keeps English breadcrumb and inLanguage for root pages', () => {
  const schema = buildJsonLd({
    route: '/import-sync/kindle/',
    source: '## Import into Acorny\n1. Step',
    title: 'Import from Kindle',
    description: 'Import highlights and notes from Kindle My Clippings.txt.',
    url: 'https://docs.acorny.io/import-sync/kindle/',
  })
  const graph = Object.fromEntries(schema['@graph'].map((n) => [n['@type'], n]))
  assert.equal(graph.WebPage.inLanguage, 'en')
  assert.equal(graph.BreadcrumbList.itemListElement[0].name, 'Home')
  assert.equal(graph.BreadcrumbList.itemListElement[0].item, 'https://docs.acorny.io/')
})

test('buildJsonLd emits HowTo for a Chinese procedural title with numbered steps', () => {
  const schema = buildJsonLd({
    route: '/zh/import-sync/cubox/',
    source: '## Import into Acorny\n1. Open Acorny, then go to Import.\n2. Choose Upload File.',
    title: '从 Cubox 导入',
    description: '从 Cubox JSON 导出文件导入高亮和笔记。',
    url: 'https://docs.acorny.io/zh/import-sync/cubox/',
  })
  const graph = Object.fromEntries(schema['@graph'].map((n) => [n['@type'], n]))
  assert.ok(graph.HowTo, 'expected a HowTo node for a Chinese procedural title')
  assert.equal(graph.HowTo.name, '从 Cubox 导入')
})

test('buildJsonLd omits HowTo for a Chinese non-procedural title', () => {
  const schema = buildJsonLd({
    route: '/zh/getting-started/what-is-acorny/',
    source: '## What is Acorny\nAcorny is a tool.\n## Features\n- One\n- Two',
    title: 'Acorny 是什么？',
    description: '了解 Acorny 的功能。',
    url: 'https://docs.acorny.io/zh/getting-started/what-is-acorny/',
  })
  const graph = Object.fromEntries(schema['@graph'].map((n) => [n['@type'], n]))
  assert.equal(graph.HowTo, undefined, 'a non-procedural Chinese title must not produce HowTo')
})

test('buildJsonLd uses the audited quick-start sections as HowTo steps and emits dateModified', () => {
  const schema = buildJsonLd({
    route: '/getting-started/quick-start/',
    source: [
      '## 1. Create or sign in to your account',
      'Create an account.',
      '## 2. Install the browser extension',
      'Install the extension.',
      '## 3. Save your first highlight',
      'Save a highlight.',
      '## 4. Check your highlights',
      'Check the library.',
      '## 5. Start your first review',
      'Open Review.',
      '## 6. Import existing highlights',
      'Choose an import path.',
      '## 7. Know what "caught up" means',
      'Read the scheduling explanation.',
      '## Next steps',
      '- Read more.',
    ].join('\n'),
    title: 'Quick start',
    description: 'Install Acorny, save your first highlight, and start your first review.',
    url: 'https://docs.acorny.io/getting-started/quick-start/',
    dateModified: '2026-07-16',
  })
  const graph = Object.fromEntries(schema['@graph'].map((node) => [node['@type'], node]))

  assert.equal(graph.WebPage.dateModified, '2026-07-16')
  assert.deepEqual(
    graph.HowTo.step.map((step) => step.name),
    [
      '1. Create or sign in to your account',
      '2. Install the browser extension',
      '3. Save your first highlight',
      '4. Check your highlights',
      '5. Start your first review',
      '6. Import existing highlights',
      '7. Know what "caught up" means',
    ],
  )
  assert.equal(
    graph.HowTo.step[0].url,
    'https://docs.acorny.io/getting-started/quick-start/#1-create-or-sign-in-to-your-account',
  )
})

test('buildJsonLd uses the actual Chinese quick-start heading anchors', () => {
  const schema = buildJsonLd({
    route: '/zh/getting-started/quick-start/',
    source: [
      '## 1. 创建账户或登录',
      '创建账户。',
      '## 2. 安装浏览器扩展',
      '安装扩展。',
      '## 3. 保存你的第一条高亮',
      '保存高亮。',
      '## 4. 检查你的高亮',
      '检查高亮。',
      '## 5. 开始你的第一次复习',
      '打开复习。',
      '## 6. 导入现有高亮',
      '选择导入方式。',
      '## 7. 了解“caught up”（复习完）是什么意思',
      '了解排程。',
      '## 后续步骤',
      '- 继续阅读。',
    ].join('\n'),
    title: '快速开始',
    description: '安装 Acorny、保存你的第一条高亮，并开始你的第一次复习。',
    url: 'https://docs.acorny.io/zh/getting-started/quick-start/',
  })
  const howTo = schema['@graph'].find((node) => node['@type'] === 'HowTo')

  assert.equal(howTo.step.length, 7)
  assert.equal(
    howTo.step[6].url,
    'https://docs.acorny.io/zh/getting-started/quick-start/#7-了解caught-up复习完是什么意思',
  )
})

test('buildJsonLd represents the complete Readwise migration path instead of one checklist section', () => {
  const schema = buildJsonLd({
    route: '/import-sync/readwise/',
    source: [
      '## Import options',
      'Choose CSV or API import.',
      '## What transfers',
      'Highlight content transfers.',
      '## Large migrations',
      '1. Check the preview.',
      '## After import',
      'Check Highlights and Review.',
      '## Troubleshooting',
      'Retry with a valid export.',
    ].join('\n'),
    title: 'Import from Readwise',
    description: 'Move your existing Readwise highlights into Acorny.',
    url: 'https://docs.acorny.io/import-sync/readwise/',
  })
  const howTo = schema['@graph'].find((node) => node['@type'] === 'HowTo')

  assert.deepEqual(
    howTo.step.map((step) => step.name),
    ['Import options', 'Large migrations', 'After import'],
  )
})

test('buildJsonLd omits an invalid dateModified value', () => {
  const schema = buildJsonLd({
    route: '/getting-started/what-is-acorny/',
    source: '## What is Acorny\nAcorny is a tool.',
    title: 'What is Acorny?',
    description: 'Learn what Acorny does.',
    url: 'https://docs.acorny.io/getting-started/what-is-acorny/',
    dateModified: 'recently',
  })
  const webPage = schema['@graph'].find((node) => node['@type'] === 'WebPage')

  assert.equal(webPage.dateModified, undefined)
})
