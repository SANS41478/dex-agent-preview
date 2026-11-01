import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.getByText('创建项目', { exact: true }).first().click()
await page.waitForTimeout(1200)
const t = await page.locator('body').innerText()
console.log(t.slice(-2500))
const opts = await page.evaluate(()=>[...document.querySelectorAll('.options-dropdown-item')].map(e=>{const r=e.getBoundingClientRect();return {text:e.innerText.trim().replace(/\s+/g,' '),x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}}).filter(x=>x.w>0&&x.h>0))
console.log(JSON.stringify(opts,null,2))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/48-china-create.png'})
await browser.close()
