import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
console.log('URL', page.url())
const links = await page.locator('a').evaluateAll(els => els.map(e => ({ text: e.innerText.trim().slice(0,40), href: e.getAttribute('href') })).filter(x=>x.text||x.href).slice(0,40))
const buttons = await page.locator('button').evaluateAll(els => els.map(e => e.innerText.trim().slice(0,40)).filter(Boolean).slice(0,40))
console.log(JSON.stringify({links,buttons},null,2))
await browser.close()
