import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-3-download.html', { waitUntil: 'load' })
const info = await page.evaluate(() => ['.lane','.lanes','.lane .no','.lane .req'].map(sel=>{const el=document.querySelector(sel); const cs=getComputedStyle(el); return {sel, color:cs.color,bg:cs.backgroundColor,img:cs.backgroundImage,opacity:cs.opacity}}))
console.log(JSON.stringify(info,null,2)); await browser.close()
