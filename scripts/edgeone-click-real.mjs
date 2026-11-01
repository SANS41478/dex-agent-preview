import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.locator('.options-dropdown-item', { hasText: 'Upload directly' }).click()
await page.waitForTimeout(3000)
console.log('URL', page.url())
console.log((await page.locator('body').innerText()).slice(0,5000))
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/09-upload-real.png' })
await browser.close()
