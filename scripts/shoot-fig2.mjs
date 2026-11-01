import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-2.html', { waitUntil: 'load' })
await page.waitForTimeout(3200)
await page.locator('.hero-fig').screenshot({ path: 'E:/Dex/dex-site/design-demos/screenshots/dir-2-fig.png' })
await browser.close()
