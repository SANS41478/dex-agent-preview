import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-2.html', { waitUntil: 'load' })
const info = await page.evaluate(() => ['.time-mark b','.time-mark span','.time-foot'].map(sel=>{const el=document.querySelector(sel); const cs=getComputedStyle(el); const r=el.getBoundingClientRect(); return {sel,color:cs.color,fs:cs.fontSize,bg:getComputedStyle(document.querySelector('.time-paper')).backgroundColor, rect:{x:r.x,y:r.y,w:r.width,h:r.height}}}))
console.log(JSON.stringify(info,null,2)); await browser.close()
