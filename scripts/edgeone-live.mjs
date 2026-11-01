import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors=[]; page.on('console',m=>{if(m.type()==='error')errors.push(m.text())}); page.on('pageerror',e=>errors.push(e.message))
try { const r=await page.goto('https://dex-agent.edgeone.cool/', { waitUntil:'networkidle', timeout:60000 }); console.log('status',r?.status()); console.log('url',page.url()); console.log('title',await page.title()); console.log('h1',await page.locator('h1').innerText().catch(()=>'')); console.log('errors',errors); await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/24-live.png'}) } catch(e) { console.log('ERROR',e.message) }
await browser.close()
