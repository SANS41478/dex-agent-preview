import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-2-download.html', { waitUntil: 'load' })
const info = await page.evaluate(() => [...document.querySelectorAll('.platform-table .prow')].map(el => { const r = el.getBoundingClientRect(); return { text: el.innerText.replace(/\s+/g,' ').slice(0,80), x:Math.round(r.x), y:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height), display:getComputedStyle(el).display, children:el.children.length } }))
console.log(JSON.stringify(info, null, 2))
await browser.close()
