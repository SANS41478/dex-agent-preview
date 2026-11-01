import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.getByText('Create project', { exact: true }).first().click().catch(()=>{})
await page.waitForTimeout(800)
const info = await page.evaluate(() => {
  const out=[]
  for (const el of document.querySelectorAll('[class*=pages-create], [class*=create-project], [class*=upload]')) {
    const r=el.getBoundingClientRect(); if (r.width===0||r.height===0) continue
    out.push({tag:el.tagName, cls:el.className, text:el.textContent.trim().replace(/\s+/g,' ').slice(0,80), href:el.getAttribute('href'), x:Math.round(r.x), y:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height)})
  }
  return out.slice(0,40)
})
console.log(JSON.stringify(info,null,2))
await browser.close()
