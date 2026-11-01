import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const pages = browser.contexts().flatMap(c=>c.pages())
console.log(pages.map(p=>p.url()))
const page = pages[0]
await page.goto('https://github.com/is-a-dev/register', { waitUntil:'domcontentloaded', timeout:30000 }).catch(e=>console.log('goto err',e.message))
await page.waitForTimeout(3000)
console.log('URL',page.url())
console.log((await page.locator('body').innerText()).slice(0,2000))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/45-github.png'})
await browser.close()
