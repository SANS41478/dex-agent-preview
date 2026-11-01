import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.getByText('域名管理', { exact: true }).first().click()
await page.waitForTimeout(5000)
console.log('URL',page.url())
console.log((await page.locator('body').innerText()).slice(-4000))
const links = await page.evaluate(()=>[...document.querySelectorAll('a')].map(a=>a.href).filter(h=>/edgeone/.test(h)).slice(-15))
console.log('LINKS',JSON.stringify(links,null,2))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/44-china-domains.png'})
await browser.close()
