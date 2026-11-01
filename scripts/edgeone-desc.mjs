import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
const info = await page.evaluate(() => {
  const out=[]
  const walk=(el)=>{ for(const n of el.childNodes){ if(n.nodeType===3 && n.textContent.trim().includes('Upload project assets')){ let e=n.parentElement; const chain=[]; for(let i=0;i<5&&e;i++){const r=e.getBoundingClientRect(); chain.push({tag:e.tagName,cls:e.className,role:e.getAttribute('role'),href:e.getAttribute('href'),x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),text:e.textContent.trim().replace(/\s+/g,' ').slice(0,80)}); e=e.parentElement} out.push(chain) } else if(n.nodeType===1) walk(n) } }
  walk(document.body); return out
})
console.log(JSON.stringify(info,null,2))
await browser.close()
