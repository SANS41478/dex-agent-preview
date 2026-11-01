import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
const info = await page.evaluate(() => {
  const nodes = [...document.querySelectorAll('*')].filter(el => el.children.length === 0 && el.textContent.trim() === 'Upload directly')
  return nodes.map(el => { let e = el; const chain=[]; for(let i=0;i<5&&e;i++){ const r=e.getBoundingClientRect(); chain.push({tag:e.tagName, cls:e.className, role:e.getAttribute('role'), x:Math.round(r.x), y:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height), text:e.textContent.trim().slice(0,50)}); e=e.parentElement } return chain })
})
console.log(JSON.stringify(info,null,2))
await browser.close()
