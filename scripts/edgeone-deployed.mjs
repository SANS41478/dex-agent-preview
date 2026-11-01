import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.waitForTimeout(1000)
console.log('URL', page.url())
const text = await page.locator('body').innerText()
console.log(text.slice(-6000))
const links = await page.evaluate(() => [...document.querySelectorAll('a')].map(a=>a.href).filter(h=>/edgeone|https?:\/\//.test(h)).slice(-30))
console.log('LINKS', JSON.stringify(links,null,2))
await page.screenshot({ path: 'E:/Dex/dex-site/artifacts/edgeone/21-deployed.png', fullPage: false })
await browser.close()
