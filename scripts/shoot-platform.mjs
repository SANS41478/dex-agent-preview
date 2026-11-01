import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-2-download.html', { waitUntil: 'load' })
await page.locator('.platform-table').screenshot({ path: 'E:/Dex/dex-site/design-demos/screenshots/dir-2-platform.png' })
await browser.close()
