import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-2.html', { waitUntil: 'load' })
const info = await page.evaluate(() => {
  const el = document.querySelector('.time-mark b'); const cs = getComputedStyle(el); const bg = getComputedStyle(document.querySelector('.time-paper')).backgroundColor;
  return { color: cs.color, bg, fs: cs.fontSize, ink4: getComputedStyle(document.documentElement).getPropertyValue('--ink-4') }
})
console.log(JSON.stringify(info, null, 2))
await browser.close()
