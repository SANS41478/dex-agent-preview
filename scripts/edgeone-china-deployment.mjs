import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.goto('https://console.cloud.tencent.com/edgeone/makers/project/makers-5ykxkmdhj0kt/deployment/dp05svr1c7ld', { waitUntil:'domcontentloaded' })
await page.waitForTimeout(5000)
console.log((await page.locator('body').innerText()).slice(-3000))
const tabs = await page.evaluate(()=>[...document.querySelectorAll('a,button,[role=tab]')].map(e=>e.innerText.trim()).filter(t=>/项目概览|域名|构建部署|概览|Domain/.test(t)).slice(0,30))
console.log('TABS',JSON.stringify(tabs))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/43-china-deployment.png'})
await browser.close()
