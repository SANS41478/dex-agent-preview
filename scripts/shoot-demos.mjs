import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
import { mkdirSync } from 'node:fs'

const files = process.argv.slice(2)
const outDir = 'E:/Dex/dex-site/design-demos/screenshots'
mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()
const results = []
for (const file of files) {
  const base = file.split('/').pop().replace('.html', '')
  for (const [label, width, height] of [['desktop', 1440, 900], ['mobile', 375, 812]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
    const errors = []
    const failed = []
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
    page.on('pageerror', err => errors.push(err.message))
    page.on('requestfailed', req => failed.push(req.url() + ' :: ' + req.failure()?.errorText))
    await page.goto('file:///' + file, { waitUntil: 'load' })
    await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready })
    const total = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < total; y += 600) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(40) }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(500)
    const info = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      scrollHeight: document.documentElement.scrollHeight,
      brokenImages: [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.src),
      headings: [...document.querySelectorAll('h1,h2')].map(h => h.innerText.replace(/\s+/g, ' ').trim()).slice(0, 12)
    }))
    await page.screenshot({ path: `${outDir}/${base}-${label}-full.png`, fullPage: true })
    await page.screenshot({ path: `${outDir}/${base}-${label}-hero.png` })
    results.push({ file, label, ...info, errors, failed })
    await page.close()
  }
}
await browser.close()
console.log(JSON.stringify(results, null, 2))
