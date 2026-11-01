import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
import { mkdirSync } from 'node:fs'
const out = 'E:/Dex/dex-site/artifacts/site'
mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
const pages = ['/', '/observe/', '/download/', '/about/', '/404.html']
const results = []
for (const path of pages) {
  for (const [label, width, height] of [['desktop', 1440, 900], ['mobile', 375, 812]]) {
    const page = await browser.newPage({ viewport: { width, height } })
    const errors = []
    const failed = []
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('requestfailed', (req) => failed.push(req.url() + ' :: ' + req.failure()?.errorText))
    const res = await page.goto('http://127.0.0.1:4321' + path, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    const info = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
      links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((href) => href && href.startsWith('/')).slice(0, 30),
    }))
    await page.screenshot({ path: `${out}/${path.replace(/[^a-z0-9]/gi, '_') || 'home'}-${label}-full.png`, fullPage: true })
    await page.screenshot({ path: `${out}/${path.replace(/[^a-z0-9]/gi, '_') || 'home'}-${label}-hero.png` })
    results.push({ path, label, status: res?.status(), ...info, errors, failed })
    await page.close()
  }
}
await browser.close()
console.log(JSON.stringify(results, null, 2))
