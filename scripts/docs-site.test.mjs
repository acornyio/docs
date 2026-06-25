import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const distDir = new URL('../dist/', import.meta.url)

async function readDist(relativePath) {
  return readFile(new URL(relativePath, distDir), 'utf8')
}

test('docs build emits SEO and crawler artifacts for docs.acorny.io', async () => {
  const robots = await readDist('robots.txt')
  assert.match(robots, /User-agent: \*/)
  assert.match(robots, /Allow: \//)
  assert.match(robots, /User-agent: GPTBot\s+Allow: \//)
  assert.match(robots, /User-agent: ClaudeBot\s+Allow: \//)
  assert.doesNotMatch(robots, /User-agent: GPTBot\s+Disallow: \//)
  assert.doesNotMatch(robots, /User-agent: ClaudeBot\s+Disallow: \//)
  assert.match(robots, /Sitemap: https:\/\/docs\.acorny\.io\/sitemap-index\.xml/)

  const llms = await readDist('llms.txt')
  assert.match(llms, /# Acorny Documentation/)
  assert.match(llms, /https:\/\/docs\.acorny\.io\/getting-started\/quick-start\//)
  assert.match(llms, /Supported Sources/)

  const sitemapIndex = await readDist('sitemap-index.xml')
  assert.match(sitemapIndex, /https:\/\/docs\.acorny\.io\/sitemap-0\.xml/)

  const sitemap = await readDist('sitemap-0.xml')
  for (const route of [
    '/',
    '/getting-started/quick-start/',
    '/import-sync/overview/',
    '/import-sync/weread/',
    '/import-sync/readwise/',
    '/import-sync/moon-reader/',
    '/import-sync/readest/',
    '/import-sync/cubox/',
    '/import-sync/diigo/',
    '/import-sync/kindle/',
    '/import-sync/pdf/',
    '/import-sync/csv/',
    '/import-sync/acorny-export/',
    '/import-sync/instapaper/',
    '/import-sync/inoreader/',
    '/account-data/privacy-beta-pricing/',
    '/getting-started/what-is-acorny/',
    '/review-recall/how-spaced-repetition-works/',
    '/account-data/contact-support/',
    '/account-data/pricing/',
    '/troubleshooting/highlights-not-showing/',
    '/zh/',
    '/zh/import-sync/kindle/',
    '/zh/getting-started/quick-start/',
  ]) {
    assert.match(sitemap, new RegExp(`<loc>https://docs\\.acorny\\.io${route.replaceAll('/', '\\/')}</loc>`))
  }

  const home = await readDist('index.html')
  assert.match(home, /<title>Documentation (&amp;|&) Guides \| Acorny Help Center<\/title>/)
  assert.match(home, /<link rel="canonical" href="https:\/\/docs\.acorny\.io\/" ?\/?>/)
  assert.match(home, /Learn how to import, sync, save, and review highlights with Acorny\./)
  assert.match(home, /property="og:image" content="https:\/\/docs\.acorny\.io\/acorny_og-image\.png"/)
  assert.match(home, /rel="shortcut icon" href="\/favicon\.ico"/)
  assert.match(home, /Last updated:/)
  assert.match(home, /Built with Starlight/)

  const kindleEn = await readDist('import-sync/kindle/index.html')
  assert.match(kindleEn, /hreflang="zh-CN"/)
  assert.match(kindleEn, /hreflang="en"/)
  assert.match(kindleEn, /hreflang="x-default"/)

  const notFound = await readDist('404.html')
  assert.match(notFound, /<link rel="canonical" href="https:\/\/docs\.acorny\.io\/" ?\/?>/)
  assert.match(notFound, /name="robots" content="noindex"/)
})

test('phase 3 structured data renders JSON-LD for web pages, breadcrumbs, and how-to guides', async () => {
  const home = await readDist('index.html')
  assert.match(home, /"@type":"WebPage"/)
  assert.match(home, /"name":"Documentation & Guides"/)
  assert.match(home, /"url":"https:\/\/docs\.acorny\.io\/"/)
  assert.match(home, /"@type":"WebSite"/)
  assert.match(home, /"@type":"Organization"/)

  const kindle = await readDist('import-sync/kindle/index.html')
  assert.match(kindle, /"@type":"WebPage"/)
  assert.match(kindle, /"name":"Import from Kindle"/)
  assert.match(kindle, /"url":"https:\/\/docs\.acorny\.io\/import-sync\/kindle\/"/)
  assert.match(kindle, /"@type":"BreadcrumbList"/)
  assert.match(kindle, /"position":1,"name":"Home","item":"https:\/\/docs\.acorny\.io\/"/)
  assert.match(kindle, /"position":2,"name":"Import & Sync","item":"https:\/\/docs\.acorny\.io\/import-sync\/overview\/"/)
  assert.match(kindle, /"position":3,"name":"Import from Kindle","item":"https:\/\/docs\.acorny\.io\/import-sync\/kindle\/"/)
  assert.match(kindle, /"@type":"HowTo"/)
  assert.match(kindle, /"name":"Import from Kindle"/)
  assert.match(kindle, /"@type":"HowToStep"/)
  assert.match(kindle, /"name":"Get My Clippings.txt"/)
  assert.match(kindle, /"name":"Import into Acorny"/)
})

test('required first-wave pages render as static HTML', async () => {
  const requiredFiles = [
    'getting-started/quick-start/index.html',
    'import-sync/overview/index.html',
    'import-sync/weread/index.html',
    'import-sync/readwise/index.html',
    'import-sync/moon-reader/index.html',
    'import-sync/readest/index.html',
    'import-sync/cubox/index.html',
    'import-sync/diigo/index.html',
    'import-sync/kindle/index.html',
    'import-sync/pdf/index.html',
    'import-sync/csv/index.html',
    'import-sync/acorny-export/index.html',
    'import-sync/instapaper/index.html',
    'import-sync/inoreader/index.html',
    'account-data/privacy-beta-pricing/index.html',
    'getting-started/what-is-acorny/index.html',
    'review-recall/how-spaced-repetition-works/index.html',
    'account-data/contact-support/index.html',
    'account-data/pricing/index.html',
    'troubleshooting/highlights-not-showing/index.html',
    'zh/index.html',
    'zh/import-sync/kindle/index.html',
    'zh/getting-started/quick-start/index.html',
    'zh/account-data/contact-support/index.html',
  ]

  for (const file of requiredFiles) {
    const html = await readDist(file)
    assert.match(html, /<main/)
    assert.match(html, /Acorny/)
  }
})

test('provider guides include setup-specific instructions', async () => {
  const cubox = await readDist('import-sync/cubox/index.html')
  assert.match(cubox, /Cubox Exporter/)
  assert.match(cubox, /https:\/\/github\.com\/momadacoding\/cubox-exporter\/releases/)
  assert.match(cubox, /https:\/\/gitee\.com\/acorny_0\/cubox-exporter\/releases/)

  const moonReader = await readDist('import-sync/moon-reader/index.html')
  assert.match(moonReader, /api\/v2\/highlights/)
  assert.match(moonReader, /Import API tokens/)
  assert.match(moonReader, /Readwise sync settings/)

  const readest = await readDist('import-sync/readest/index.html')
  assert.match(readest, /https:\/\/acorny\.io\/api\/v2\//)
  assert.match(readest, /Settings/)
  assert.match(readest, /Integrations/)
  assert.match(readest, /Advanced/)
  assert.match(readest, /Custom URL/)

  const weread = await readDist('import-sync/weread/index.html')
  assert.match(weread, /weread-export\.json/)
  assert.match(weread, /WeRead Debug Bundle/)
})

test('phase 2 content foundation includes screenshots and expanded search-intent sections', async () => {
  const quickStart = await readDist('getting-started/quick-start/index.html')
  assert.match(quickStart, /src="\/images\/quick-start\/step1-toolbar\.png"/)
  assert.match(quickStart, /src="\/images\/quick-start\/step2-popup\.png"/)
  assert.match(quickStart, /src="\/images\/quick-start\/step3-list\.png"/)
  assert.match(quickStart, /alt="Acorny browser extension toolbar button"/)
  assert.match(quickStart, /alt="Acorny browser extension popup for saving a highlight"/)
  assert.match(quickStart, /alt="Acorny highlights list showing saved highlights"/)

  const whatIsAcorny = await readDist('getting-started/what-is-acorny/index.html')
  assert.match(whatIsAcorny, /Readwise alternative/)
  assert.match(whatIsAcorny, /capture/)
  assert.match(whatIsAcorny, /recall cards/)
  assert.match(whatIsAcorny, /spaced repetition/)

  const readwise = await readDist('import-sync/readwise/index.html')
  assert.match(readwise, /What transfers/)
  assert.match(readwise, /What does not transfer/)
  assert.match(readwise, /Large migrations/)
  assert.match(readwise, /src="\/images\/import-sync\/readwise\/readwise-csv\.png"/)
  assert.match(readwise, /src="\/images\/import-sync\/readwise\/readwise-token\.png"/)
  assert.match(readwise, /alt="Readwise export page with the CSV export button"/)
  assert.match(readwise, /alt="Readwise access token page with the token field"/)

  const kindle = await readDist('import-sync/kindle/index.html')
  assert.match(kindle, /What transfers/)
  assert.match(kindle, /My Clippings\.txt/)

  const moonReader = await readDist('import-sync/moon-reader/index.html')
  assert.match(moonReader, /Readwise-compatible sync/)
  assert.match(moonReader, /What transfers/)
  assert.match(moonReader, /src="\/images\/import-sync\/moon-reader\/export_moon_reader\.jpg"/)
  assert.match(moonReader, /src="\/images\/import-sync\/moon-reader\/sync_step1\.jpg"/)
  assert.match(moonReader, /src="\/images\/import-sync\/moon-reader\/sync_step2\.jpg"/)
  assert.match(moonReader, /src="\/images\/import-sync\/moon-reader\/sync_step3\.jpg"/)
  assert.match(moonReader, /alt="Moon\+ Reader share menu with notes and highlights export options"/)
  assert.match(moonReader, /alt="Moon\+ Reader bookmarks screen with the settings button highlighted"/)
  assert.match(moonReader, /alt="Moon\+ Reader bookmark settings with Readwise sharing enabled"/)
  assert.match(moonReader, /alt="Moon\+ Reader Readwise sync settings with Acorny endpoint fields"/)

  const cubox = await readDist('import-sync/cubox/index.html')
  assert.match(cubox, /What transfers/)
  assert.match(cubox, /Cubox Exporter/)
  assert.match(cubox, /src="\/images\/import-sync\/cubox\/cubox-api\.png"/)
  assert.match(cubox, /src="\/images\/import-sync\/cubox\/cubox-exporter-tool\.png"/)
  assert.match(cubox, /alt="Cubox settings page with API extension enabled"/)
  assert.match(cubox, /alt="Cubox Exporter tool for exporting highlights to JSON"/)

  const diigo = await readDist('import-sync/diigo/index.html')
  assert.match(diigo, /What transfers/)
  assert.match(diigo, /Sticky notes/)

  const spacedRepetition = await readDist('review-recall/how-spaced-repetition-works/index.html')
  assert.match(spacedRepetition, /spaced repetition/)
  assert.match(spacedRepetition, /rating buttons/)
  assert.match(spacedRepetition, /review interval/)

  const pricing = await readDist('account-data/pricing/index.html')
  assert.match(pricing, /public beta/)
  assert.match(pricing, /saved highlights/)

  const support = await readDist('account-data/contact-support/index.html')
  assert.match(support, /Do not send passwords/)
  assert.match(support, /source name/)
})

test('zh pages are built with translated titles and content', async () => {
  const zhKindle = await readDist('zh/import-sync/kindle/index.html')
  assert.match(zhKindle, /从 Kindle 导入/)
  assert.match(zhKindle, /My Clippings\.txt/)
  assert.match(zhKindle, /Acorny/)

  const zhHome = await readDist('zh/index.html')
  assert.match(zhHome, /记住你读过的内容。/)
  assert.match(zhHome, /Acorny 帮助中心/)
})

test('zh pages emit locale-aware structured data', async () => {
  const zhKindle = await readDist('zh/import-sync/kindle/index.html')
  assert.match(zhKindle, /"@type":"WebPage"/)
  assert.match(zhKindle, /"inLanguage":"zh-CN"/)
  assert.match(zhKindle, /"@type":"BreadcrumbList"/)
  assert.match(zhKindle, /"name":"首页"/)
  assert.match(zhKindle, /"item":"https:\/\/docs\.acorny\.io\/zh\/import-sync\/overview\/"/)
  assert.match(zhKindle, /"name":"导入与同步"/)
  assert.match(zhKindle, /"@type":"HowTo"/)
})
