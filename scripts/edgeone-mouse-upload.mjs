import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.mouse.click(343, 75)
await page.waitForTimeout(2500)
console.log('URL', page.url())
console.log((await page.locator('body').innerText()).slice(0,4000))
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/07-upload-click2.png' })
await browser.close()
