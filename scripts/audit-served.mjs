import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
for (const path of ['/', '/observe/', '/download/', '/about/', '/404.html']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://127.0.0.1:4321' + path, { waitUntil: 'networkidle' })
  const items = await page.evaluate(() => {
    const out = []
    const walk = (el) => {
      for (const node of el.childNodes) {
        if (node.nodeType === 3 && node.textContent.trim()) {
          const cs = getComputedStyle(el); const fs = parseFloat(cs.fontSize)
          const text = node.textContent.trim().replace(/\s+/g, ' ')
          if (fs < 12 || (text.length >= 28 && fs < 14 && !el.closest('figcaption, footer, small, caption, aside, sup, sub, [class*=caption], [class*=credit], [class*=footnote], [class*=meta]'))) {
            out.push({ fs: Math.round(fs * 10) / 10, tag: el.tagName, cls: typeof el.className === 'string' ? el.className : '', text: text.slice(0, 60) })
          }
        } else if (node.nodeType === 1) walk(node)
      }
    }
    walk(document.body)
    const seen = new Map()
    for (const x of out) { const k = x.tag+'.'+x.cls+'@'+x.fs; if (!seen.has(k)) seen.set(k, { ...x, count: 0 }); seen.get(k).count++ }
    return [...seen.values()]
  })
  console.log('###', path, items.length)
  console.log(JSON.stringify(items, null, 1))
  await page.close()
}
await browser.close()
