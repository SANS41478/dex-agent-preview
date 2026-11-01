import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-2.html', { waitUntil: 'load' })
await page.waitForTimeout(1800)
const info = await page.evaluate(() => {
  const gs = [...document.querySelectorAll('.hero-svg .layer')].map((g,i) => ({ i, opacity:getComputedStyle(g).opacity, bbox:g.getBBox(), html:g.innerHTML.slice(0,60) }))
  const fig = document.querySelector('.hero-fig').getBoundingClientRect()
  const copy = document.querySelector('.hero-copy').getBoundingClientRect()
  const head = document.querySelector('.head-actions').getBoundingClientRect()
  return { layers: gs, fig: {x:fig.x,w:fig.width}, copy:{x:copy.x,w:copy.width}, head:{x:head.x,right:head.right}, vw: innerWidth }
})
console.log(JSON.stringify(info, null, 2))
await page.locator('.hero-fig').screenshot({ path: 'E:/Dex/dex-site/design-demos/screenshots/dir-2-fig.png' })
await browser.close()
