import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 375, height: 812 } })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-1.html', { waitUntil: 'load' })
const data = await page.evaluate(() => {
  const pick = (sel) => { const el = document.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return { sel, x:r.x, y:r.y, w:r.width, h:r.height, padL:cs.paddingLeft, padR:cs.paddingRight, margin:cs.margin, transform:cs.transform, display:cs.display, fontSize:cs.fontSize, letterSpacing:cs.letterSpacing } }
  return { vw: innerWidth, dpr: devicePixelRatio, body: pick('body'), container: pick('.container.hero-inner'), copy: pick('.hero-copy'), h1: pick('.hero h1'), head: pick('.head-inner'), brand: pick('.brand'), window: pick('.product-window'), scrollX: scrollX, docW: document.documentElement.scrollWidth, bodyW: document.body.scrollWidth }
})
console.log(JSON.stringify(data, null, 2))
await browser.close()
