import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-3-download.html', { waitUntil: 'load' })
const info = await page.evaluate(() => {
  const sels = ['.lane','.lane .no','.lane .req','.lane .btn','.lane .tag','.dl3-body','body']
  return sels.map(sel => { const el=document.querySelector(sel); if(!el) return {sel}; const cs=getComputedStyle(el); return {sel, color:cs.color, bg:cs.backgroundColor, fs:cs.fontSize, text:el.textContent.trim().slice(0,30)} })
})
console.log(JSON.stringify(info,null,2))
await browser.close()
