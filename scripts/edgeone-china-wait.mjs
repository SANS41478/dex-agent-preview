import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
for (let i=0;i<5;i++){ await page.waitForTimeout(4000); console.log('tick',i,page.url(), (await page.locator('body').innerText()).slice(-1800)) }
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/36-china-makers.png'})
await browser.close()
