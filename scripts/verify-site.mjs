import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
import { mkdirSync } from 'node:fs'

const base = process.env.SITE_BASE ?? 'https://dexagent.dpdns.org'
const out = 'E:/Dex/dex-site/artifacts/site-verify'
const pages = ['/', '/observe/', '/download/', '/about/', '/atlas/', '/does-not-exist']
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
const results = []

for (const path of pages) {
  for (const [label, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } })
    const errors = []
    const failed = []
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('requestfailed', (req) => failed.push(req.url() + ' :: ' + req.failure()?.errorText))
    page.on('response', (res) => {
      if (res.status() >= 400 && res.url().startsWith(base)) failed.push(`${res.status()} ${res.url()}`)
    })

    const response = await page.goto(base + path, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    const info = await page.evaluate(() => ({
      title: document.title,
      styleSheets: document.styleSheets.length,
      bodyBackground: getComputedStyle(document.body).backgroundColor,
      bodyFont: getComputedStyle(document.body).fontFamily,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      links: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
    }))

    const filename = (path.replace(/[^a-z0-9]/gi, '_').replace(/^_+|_+$/g, '') || 'home') + `-${label}.png`
    if (label === 'desktop' || path === '/') {
      await page.screenshot({ path: `${out}/${filename}`, fullPage: false })
    }

    results.push({ path, label, status: response?.status(), ...info, errors, failed })
    await page.close()
  }
}

await browser.close()
console.log(JSON.stringify(results, null, 2))
