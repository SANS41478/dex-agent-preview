import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
for (let i=0;i<8;i++){ await page.waitForTimeout(6000); const t=await page.locator('body').innerText(); console.log('tick',i,t.slice(-1200)) }
console.log('URL',page.url())
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/41-china-deployed.png'})
await browser.close()
