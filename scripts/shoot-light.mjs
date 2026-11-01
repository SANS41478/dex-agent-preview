import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
for (const [file, name] of [['dir-1.html','dir-1'],['dir-1-download.html','dir-1-download']]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.addInitScript(() => localStorage.setItem('dex-site-theme','light'))
  await page.goto('file:///E:/Dex/dex-site/design-demos/' + file, { waitUntil: 'load' })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `E:/Dex/dex-site/design-demos/screenshots/${name}-light-hero.png` })
  await page.screenshot({ path: `E:/Dex/dex-site/design-demos/screenshots/${name}-light-full.png`, fullPage: true })
  const info = await page.evaluate(() => ({ theme: document.documentElement.dataset.theme, bg: getComputedStyle(document.body).backgroundColor, darkImgs: [...document.images].filter(i=>i.src.includes('dark')).length }))
  console.log(name, JSON.stringify(info))
  await page.close()
}
await browser.close()
