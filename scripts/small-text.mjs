import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
for (const file of ['dir-1.html','dir-2.html','dir-3.html']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('file:///E:/Dex/dex-site/design-demos/' + file, { waitUntil: 'load' })
  const list = await page.evaluate(() => {
    const out = []
    const walk = (el) => {
      for (const node of el.childNodes) {
        if (node.nodeType === 3 && node.textContent.trim()) {
          const cs = getComputedStyle(el); const fs = parseFloat(cs.fontSize)
          if (fs < 12) {
            const text = node.textContent.trim().replace(/\s+/g,' ').slice(0,50)
            const cls = el.className && typeof el.className === 'string' ? el.className : ''
            out.push({ fs, tag: el.tagName, cls, text })
          }
        } else if (node.nodeType === 1) walk(node)
      }
    }
    walk(document.body)
    const map = new Map()
    for (const x of out) { const k = x.tag+'.'+x.cls+'@'+x.fs; if (!map.has(k)) map.set(k, { ...x, count: 0 }); map.get(k).count++ }
    return [...map.values()].sort((a,b)=>a.fs-b.fs)
  })
  console.log('###', file, list.length)
  console.log(JSON.stringify(list, null, 1))
  await page.close()
}
await browser.close()
