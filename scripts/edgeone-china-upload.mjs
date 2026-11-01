import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.getByText('直接上传', { exact: true }).first().click()
await page.waitForTimeout(4000)
console.log('URL', page.url())
console.log((await page.locator('body').innerText()).slice(0,5000))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/38-china-upload.png'})
await browser.close()
