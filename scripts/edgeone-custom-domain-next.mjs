import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
const input = page.locator('input[placeholder*="your-domain"]').first()
await input.fill('dex-agent.is-a.dev')
await page.waitForTimeout(500)
await page.getByText('下一步', { exact: true }).first().click()
await page.waitForTimeout(4000)
console.log('URL',page.url())
console.log((await page.locator('body').innerText()).slice(-4000))
const inputs = await page.evaluate(()=>[...document.querySelectorAll('input,code')].map(e=>({tag:e.tagName,text:(e.value||e.innerText||'').slice(0,300),placeholder:e.placeholder})).filter(x=>x.text))
console.log(JSON.stringify(inputs,null,2))
await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/55-custom-domain-next.png'})
await browser.close()
