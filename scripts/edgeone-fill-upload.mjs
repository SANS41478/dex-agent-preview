import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
const nameInput = page.locator('input.sdk-eo-pages-input.input-name').first()
await nameInput.fill('dex-agent')
await page.waitForTimeout(600)
const fileInput = page.locator('input[type=file][accept*=".zip"]').first()
await fileInput.setInputFiles('E:/Dex/dex-site/artifacts/edgeone/dex-site-dist.zip')
await page.waitForTimeout(6000)
console.log('URL', page.url())
console.log((await page.locator('body').innerText()).slice(0,7000))
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/15-after-upload.png' })
await browser.close()
