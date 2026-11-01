import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.goto('https://console.cloud.tencent.com/edgeone/makers/project/makers-5ykxkmdhj0kt/domain', { waitUntil:'domcontentloaded' })
await page.waitForTimeout(6000)
console.log('URL', page.url())
console.log((await page.locator('body').innerText()).slice(-5000))
const links = await page.evaluate(()=>[...document.querySelectorAll('a')].map(a=>a.href).filter(h=>h.includes('edgeone')).slice(-20))
console.log('LINKS',JSON.stringify(links,null,2))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/42-china-domain.png'})
await browser.close()
