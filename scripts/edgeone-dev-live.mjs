import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport:{width:1440,height:900} })
const u='https://dex-agent-global-kulmnazh.edgeone.dev/'
const errors=[]; page.on('console',m=>{if(m.type()==='error')errors.push(m.text())}); page.on('pageerror',e=>errors.push(e.message))
try { const r=await page.goto(u,{waitUntil:'networkidle',timeout:60000}); console.log('status',r?.status(),'url',page.url(),'title',await page.title(),'h1',await page.locator('h1').innerText().catch(()=>'')); console.log('errors',errors); await page.screenshot({path:'E:/Dex/dex-site/artifacts/edgeone/54-edgeone-dev-live.png'}) } catch(e){console.log('ERR',e.message)}
await browser.close()
