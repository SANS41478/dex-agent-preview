import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.goto('https://console.tencentcloud.com/edgeone/makers/project/makers-ev6a9gpbi3gj/domain', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(4000)
console.log('URL', page.url())
console.log((await page.locator('body').innerText()).slice(0,6000))
const links = await page.evaluate(() => [...document.querySelectorAll('a')].map(a=>a.href).filter(h=>/edgeone|https?:\/\//.test(h)).slice(-40))
console.log('LINKS', JSON.stringify(links,null,2))
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/22-domains.png', fullPage: false })
await browser.close()
