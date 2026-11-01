import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
for (let i=0;i<4;i++){ await page.waitForTimeout(4000); const t=await page.locator('body').innerText(); console.log('tick',i,t.slice(-2500)) }
console.log('URL',page.url())
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/23-domains-loaded.png', fullPage: false })
await browser.close()
