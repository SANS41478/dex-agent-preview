import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-1-download.html', { waitUntil: 'load' })
const rows = await page.$$eval('.platform-row', els => els.map(el => ({ text: el.innerText.slice(0, 80), children: el.children.length, rects: [...el.children].map(c => ({ tag: c.tagName, cls: c.className, x: Math.round(c.getBoundingClientRect().x), y: Math.round(c.getBoundingClientRect().y), w: Math.round(c.getBoundingClientRect().width), h: Math.round(c.getBoundingClientRect().height) })) })))
console.log(JSON.stringify(rows, null, 2))
await browser.close()
