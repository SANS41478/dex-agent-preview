import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const context = browser.contexts()[0]
const page = context.pages()[0]
await page.goto('https://console.tencentcloud.com/edgeone/makers', { waitUntil:'domcontentloaded' })
await page.waitForTimeout(5000)
const pagesBefore = new Set(context.pages().map(p=>p.url()))
await page.getByText('Preview', { exact: true }).first().click()
await page.waitForTimeout(4000)
const pages = context.pages()
console.log('pages', pages.map(p=>p.url()))
for (const p of pages) {
  if (!pagesBefore.has(p.url())) {
    console.log('NEW', p.url())
    console.log((await p.locator('body').innerText().catch(()=>'')).slice(0,1200))
    await p.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/30-preview.png'})
  }
}
await browser.close()
