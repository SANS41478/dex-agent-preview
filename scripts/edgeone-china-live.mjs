import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport:{width:1440,height:900} })
const u='https://dex-agent-2awbpnbv.edgeone.cool/'
try { const r=await page.goto(u,{waitUntil:'networkidle',timeout:60000}); console.log('status',r?.status(),'url',page.url(),'title',await page.title()); console.log((await page.locator('body').innerText()).slice(0,800)) } catch(e){console.log('ERR',e.message)}
await browser.close()
