import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.getByText('文件验证', { exact: true }).first().click()
await page.waitForTimeout(1500)
console.log((await page.locator('body').innerText()).slice(-3000))
const links = await page.evaluate(()=>[...document.querySelectorAll('a')].map(a=>({text:a.innerText.trim(),href:a.href})).filter(x=>x.text||x.href).slice(-20))
console.log(JSON.stringify(links,null,2))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/56-file-verification.png'})
await browser.close()
