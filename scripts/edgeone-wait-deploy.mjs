import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
for (let i=0;i<6;i++) { await page.waitForTimeout(5000); const t=await page.locator('body').innerText(); console.log('---',i,'---'); console.log(t.slice(-2500)) }
console.log('URL', page.url())
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/18-deploy-result.png' })
await browser.close()
