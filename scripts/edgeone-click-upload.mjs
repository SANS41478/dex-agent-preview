import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const contexts = browser.contexts()
const page = contexts[0].pages()[0]
const a = page.locator('a', { hasText: 'Upload directly' }).first()
console.log('href', await a.getAttribute('href'))
await a.click({ force: true })
await page.waitForTimeout(3000)
console.log('pages', contexts[0].pages().map(p=>p.url()))
console.log('URL', page.url())
console.log((await page.locator('body').innerText()).slice(0,4000))
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/06-upload-direct.png' })
await browser.close()
