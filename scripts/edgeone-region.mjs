import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.locator('.sdk-eo-pages-dropdown__value').first().click()
await page.waitForTimeout(800)
console.log((await page.locator('body').innerText()).slice(0,6000))
const opts = await page.evaluate(() => [...document.querySelectorAll('[class*=dropdown]')].map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.trim().replace(/\s+/g,' ').slice(0,100)})).filter(x=>x.text).slice(-30))
console.log(JSON.stringify(opts,null,2))
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/11-region.png' })
await browser.close()
