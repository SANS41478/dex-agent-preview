import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.launch()
const results = {}
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' })
  await page.click('#play-timeline')
  await page.waitForTimeout(900)
  results.timeline = await page.evaluate(() => ({ play: document.getElementById('timeline')?.style.getPropertyValue('--play'), read: document.getElementById('time-read')?.textContent }))
  await page.close()
}
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://127.0.0.1:4321/observe/', { waitUntil: 'networkidle' })
  await page.click('.linkage-step[data-node="n2"]')
  results.linkage = await page.evaluate(() => ({ step: document.querySelector('.linkage-step.is-active')?.textContent?.trim(), node: document.querySelector('.linkage-node.is-linked')?.textContent?.trim(), caption: document.getElementById('linkage-caption')?.textContent }))
  await page.click('#linkage-reset')
  results.linkageReset = await page.evaluate(() => ({ step: !!document.querySelector('.linkage-step.is-active'), node: !!document.querySelector('.linkage-node.is-linked') }))
  await page.close()
}
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://127.0.0.1:4321/download/', { waitUntil: 'networkidle' })
  await page.click('a[data-platform="macOS"]')
  results.platform = await page.$eval('select[name="platform"]', (el) => el.value)
  await page.fill('input[name="email"]', 'bad')
  await page.click('#waitlist-form button[type="submit"]')
  results.invalidEmail = await page.$eval('#form-message', (el) => ({ text: el.textContent, error: el.classList.contains('error') }))
  await page.fill('input[name="email"]', 'test@example.com')
  await page.click('#waitlist-form button[type="submit"]')
  await page.waitForTimeout(300)
  results.validEmailMessage = await page.$eval('#form-message', (el) => el.textContent)
  await page.close()
}
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } })
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' })
  await page.click('.menu-btn')
  results.mobileMenu = await page.evaluate(() => ({ open: document.body.classList.contains('menu-open'), expanded: document.querySelector('.menu-btn')?.getAttribute('aria-expanded'), hidden: document.getElementById('mobile-menu')?.getAttribute('aria-hidden') }))
  await page.keyboard.press('Escape')
  results.mobileMenuClosed = await page.evaluate(() => ({ open: document.body.classList.contains('menu-open'), expanded: document.querySelector('.menu-btn')?.getAttribute('aria-expanded') }))
  await page.close()
}
console.log(JSON.stringify(results, null, 2))
await browser.close()
