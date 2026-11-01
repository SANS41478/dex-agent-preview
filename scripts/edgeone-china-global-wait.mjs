import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
for (let i=0;i<10;i++){ await page.waitForTimeout(5000); const t=await page.locator('body').innerText(); if(t.includes('部署\n完成')||t.includes('部署完成')||t.includes('状态\n 成功')){ console.log('done at',i); break } }
console.log('URL',page.url())
console.log((await page.locator('body').innerText()).slice(-2000))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/52-china-global-deployed.png'})
await browser.close()
