import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-2.html', { waitUntil: 'load' })
for (const ms of [200, 600, 1200, 2400, 4000]) {
  await page.waitForTimeout(ms)
  const a = await page.evaluate(() => [...document.querySelectorAll('.hero-svg .layer')].map((g,i)=>{const c=getComputedStyle(g);return {i,opacity:c.opacity,name:c.animationName,dur:c.animationDuration,delay:c.animationDelay,fill:c.animationFillMode,play:c.animationPlayState}}))
  console.log(ms, JSON.stringify(a))
}
await browser.close()
