import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.waitForTimeout(60000)
console.log('URL', page.url())
console.log((await page.locator('body').innerText()).slice(-3000))
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/19-after-wait.png' })
await browser.close()
