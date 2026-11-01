import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
await page.waitForTimeout(1000)
console.log((await page.locator('body').innerText()).slice(-4000))
const links = await page.evaluate(()=>[...document.querySelectorAll('a,input')].map(e=>({tag:e.tagName,text:(e.innerText||e.value||'').slice(0,200),href:e.getAttribute('href')})).filter(x=>x.text||x.href).slice(-30))
console.log(JSON.stringify(links,null,2))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/31-preview-modal.png'})
await browser.close()
