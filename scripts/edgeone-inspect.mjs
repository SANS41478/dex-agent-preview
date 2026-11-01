import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
import { mkdirSync } from 'node:fs'
const out = 'E:/Dex/dex-site/artifacts/edgeone'
mkdirSync(out, { recursive: true })
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const contexts = browser.contexts()
const pages = contexts.flatMap(c => c.pages())
console.log('pages', pages.length, pages.map(p => p.url()))
const page = pages[0] ?? await contexts[0].newPage()
await page.bringToFront().catch(()=>{})
await page.waitForTimeout(2500)
console.log('URL', page.url())
console.log('TITLE', await page.title())
console.log((await page.locator('body').innerText().catch(()=>'' )).slice(0,3000))
await page.screenshot({ path: `${out}/01-edgeone.png`, fullPage: false })
await browser.close()
