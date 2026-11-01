import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.locator('li', { hasText: /^Global$/ }).click()
await page.waitForTimeout(1500)
console.log('URL', page.url())
console.log((await page.locator('body').innerText()).slice(0,5000))
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/14-region-global.png' })
await browser.close()
