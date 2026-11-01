import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push(e.message))
await page.goto('file:///E:/Dex/dex-site/design-demos/dir-3.html', { waitUntil: 'load' })
await page.waitForTimeout(1200)
const steps = await page.$$('.run-step')
for (let i = 0; i < steps.length; i++) {
  await steps[i].scrollIntoViewIfNeeded()
  await page.evaluate((idx) => { const el = document.querySelectorAll('.run-step')[idx]; el.scrollIntoView({ block: 'center' }) }, i)
  await page.waitForTimeout(700)
  const state = await page.evaluate(() => ({
    activeStep: [...document.querySelectorAll('.run-step')].findIndex(el => el.classList.contains('is-active')),
    activeFig: [...document.querySelectorAll('#run-stack figure')].findIndex(el => el.classList.contains('is-active')),
    activeTick: [...document.querySelectorAll('.run-ticks button')].findIndex(el => el.classList.contains('is-active')),
    hud: document.getElementById('hud-label')?.textContent,
    status: document.getElementById('hud-status')?.textContent
  }))
  console.log(i, JSON.stringify(state))
  await page.screenshot({ path: `E:/Dex/dex-site/design-demos/screenshots/dir-3-run-${i}.png` })
}
console.log('errors', JSON.stringify(errors))
await browser.close()
