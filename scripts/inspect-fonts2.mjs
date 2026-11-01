import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-2.html', { waitUntil: 'load' })
const data = await page.evaluate(() => {
  const sels = ['.fig-top','.fig-top b','.fig-caption','.stamp','.m-note','.spec-strip span','.time-mark b','.time-mark span','.hero-copy .topline .eyebrow','.plate-bar','.dag-top','.step .idx','.step p','.foot-col a','.foot-bottom']
  return sels.map(sel => { const el = document.querySelector(sel); if(!el) return {sel, none:true}; const cs=getComputedStyle(el); return {sel, fs:cs.fontSize, color:cs.color, text:el.textContent.trim().slice(0,40)} })
})
console.log(JSON.stringify(data, null, 2))
await browser.close()
