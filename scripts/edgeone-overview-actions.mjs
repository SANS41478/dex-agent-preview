import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const context = browser.contexts()[0]
const page = context.pages()[0]
await page.goto('https://console.tencentcloud.com/edgeone/makers/project/makers-ev6a9gpbi3gj/index', { waitUntil:'domcontentloaded' })
await page.waitForTimeout(5000)
const texts = await page.evaluate(()=>[...document.querySelectorAll('button,a')].map(e=>({tag:e.tagName,text:e.innerText.trim().slice(0,40),href:e.getAttribute('href'),cls:e.className})).filter(x=>x.text||x.href))
console.log(JSON.stringify(texts,null,2))
console.log((await page.locator('body').innerText()).slice(-3000))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/27-overview.png'})
await browser.close()
