import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'

import { injectStructuredData, insertBeforeClosingHead } from './inject-structured-data.mjs'

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
