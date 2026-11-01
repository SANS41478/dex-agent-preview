import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
for (const url of [
  'https://console.tencentcloud.com/edgeone/makers/project/makers-ev6a9gpbi3gj',
  'https://console.tencentcloud.com/edgeone/pages/project/makers-ev6a9gpbi3gj',
  'https://console.tencentcloud.com/edgeone/pages'
]) {
  try {
    await page.goto(url, { waitUntil:'domcontentloaded', timeout:30000 })
    await page.waitForTimeout(6000)
    console.log('###', url, '->', page.url())
    const t = await page.locator('body').innerText().catch(()=> '')
    console.log(t.slice(0,1800))
    const buttons = await page.evaluate(()=>[...document.querySelectorAll('button,a')].map(e=>e.innerText.trim()).filter(Boolean).slice(-20))
    console.log('buttons', JSON.stringify(buttons))
  } catch(e) { console.log('ERR', url, e.message) }
}
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/29-project-route.png'})
await browser.close()
