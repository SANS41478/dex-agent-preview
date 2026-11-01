import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const pages = browser.contexts().flatMap(c=>c.pages())
console.log('pages', pages.map(p=>p.url()))
const page = pages[0]
await page.bringToFront().catch(()=>{})
await page.waitForTimeout(3000)
console.log('URL', page.url())
console.log((await page.locator('body').innerText().catch(()=>'')).slice(0,5000))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/35-china-state.png'})
await browser.close()
