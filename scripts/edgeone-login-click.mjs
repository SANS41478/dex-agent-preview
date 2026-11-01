import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.getByText('Log in', { exact: true }).first().click()
await page.waitForTimeout(2500)
console.log('URL', page.url())
console.log('TITLE', await page.title())
console.log((await page.locator('body').innerText()).slice(0,2500))
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/02-login.png' })
await browser.close()
