import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.goto('https://console.tencentcloud.com/edgeone/makers/project/makers-ev6a9gpbi3gj/deployment/dp7i2uhgjvgw', { waitUntil:'domcontentloaded' })
await page.waitForTimeout(5000)
const els = await page.evaluate(()=>[...document.querySelectorAll('button,a')].map(e=>({tag:e.tagName,text:e.innerText.trim().slice(0,40),href:e.getAttribute('href'),cls:e.className})).filter(x=>x.text||x.href).slice(-80))
console.log(JSON.stringify(els,null,2))
console.log((await page.locator('body').innerText()).slice(0,2500))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/28-deployment.png'})
await browser.close()
