import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
const loc = page.getByText('直接上传', { exact: true }).first()
console.log('count', await page.getByText('直接上传', { exact: true }).count())
await loc.click({force:true})
await page.waitForTimeout(3000)
console.log('URL',page.url())
console.log((await page.locator('body').innerText()).slice(-2000))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/49-china-upload2.png'})
await browser.close()
