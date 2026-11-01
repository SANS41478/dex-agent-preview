import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const pages = ['/', '/observe/', '/download/', '/about/', '/404.html']
for (const path of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://127.0.0.1:4321' + path, { waitUntil: 'networkidle' })
  const hits = await page.evaluate(() => {
    const parse = (c) => { const m = c.match(/\d+(\.\d+)?/g); return m ? m.map(Number) : [0,0,0,1] }
    const lum = ([r,g,b]) => { const f = (v) => { v/=255; return v <= .03928 ? v/12.92 : ((v+.055)/1.055)**2.4 }; return .2126*f(r)+.7152*f(g)+.0722*f(b) }
    const contrast = (a,b) => { const l1=lum(a), l2=lum(b); return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05) }
    const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; const a = parse(c); if (a[3] > .9) return a.slice(0,3) } return [255,255,255] }
    const out = []
    const walk = (el) => {
      for (const node of el.childNodes) {
        if (node.nodeType === 3 && node.textContent.trim()) {
          const cs = getComputedStyle(el); const fs = parseFloat(cs.fontSize)
          if (fs >= 24) continue
          const c = contrast(parse(cs.color).slice(0,3), bgOf(el))
          if (c < 4.5) out.push({ text: node.textContent.trim().replace(/\s+/g,' ').slice(0,40), ratio: Math.round(c*100)/100, fs: Math.round(fs), cls: typeof el.className === 'string' ? el.className : '' })
        } else if (node.nodeType === 1) walk(node)
      }
    }
    walk(document.body)
    return out
  })
  console.log('###', path, hits.length)
  console.log(JSON.stringify(hits.slice(0,20), null, 1))
  await page.close()
}
await browser.close()
