import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
for (let i=0;i<6;i++) { await page.waitForTimeout(10000); const t=await page.locator('body').innerText(); console.log('tick', i, t.slice(-900)) }
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/20-deploy-done.png' })
await browser.close()
