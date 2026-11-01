import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
const opts = await page.evaluate(() => [...document.querySelectorAll('.sdk-eo-pages-dropdown-box *')].map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,cls:e.className,text:e.textContent.trim().replace(/\s+/g,' ').slice(0,120),x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}}).filter(x=>x.w>0&&x.h>0&&x.text))
console.log(JSON.stringify(opts,null,2))
await browser.close()
