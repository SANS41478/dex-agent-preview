import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.locator('.sdk-eo-pages-dropdown__value').click()
await page.waitForTimeout(600)
const info = await page.evaluate(() => {
  const out=[]
  for (const el of document.querySelectorAll('*')) {
    const t=el.textContent.trim().replace(/\s+/g,' ')
    if ((t==='Global'||t==='Chinese Mainland'||t.includes('MLC')) && el.children.length===0) {
      const r=el.getBoundingClientRect(); if(r.width>0&&r.height>0) out.push({tag:el.tagName,cls:el.className,text:t,x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)})
    }
  }
  return out
})
console.log(JSON.stringify(info,null,2))
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/13-region-open.png' })
await browser.close()
