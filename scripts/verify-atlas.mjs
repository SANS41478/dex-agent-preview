/**
 * 验证 public/atlas 静态快照：包页可用、源码浏览器隐藏、无 API 请求与控制台错误。
 *
 * 前置：`pnpm build`（生成 dist/atlas）。
 * 用法：node scripts/verify-atlas.mjs
 */
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'

const root = path.resolve(import.meta.dirname, '..')
const port = Number(process.env.ATLAS_VERIFY_PORT ?? 4322)
const base = `http://127.0.0.1:${port}`
const out = path.join(root, 'artifacts', 'atlas-verify')
const failures = []

const check = (label, ok, detail = '') => {
  console.log(`[check] ${ok ? 'PASS' : 'FAIL'} ${label}${detail === '' ? '' : ` — ${detail}`}`)
  if (!ok) failures.push(label)
}

async function startServer() {
  const child = spawn(process.execPath, [path.join(root, 'scripts', 'serve.mjs'), String(port)], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('serve.mjs 启动超时')), 10_000)
    child.stdout.on('data', (chunk) => {
      if (String(chunk).includes('serving')) {
        clearTimeout(timer)
        resolve()
      }
    })
    child.stderr.on('data', (chunk) => process.stderr.write(chunk))
    child.once('exit', (code) => {
      clearTimeout(timer)
      reject(new Error(`serve.mjs 提前退出：${String(code)}`))
    })
  })
  return child
}

mkdirSync(out, { recursive: true })
const server = await startServer()
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const consoleErrors = []
const pageErrors = []
const failedRequests = []
const apiRequests = []
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('pageerror', (error) => pageErrors.push(error.message))
page.on('requestfailed', (request) => {
  failedRequests.push(`${request.url()} :: ${request.failure()?.errorText ?? 'failed'}`)
})
page.on('request', (request) => {
  if (request.url().includes('/api/')) apiRequests.push(request.url())
})

try {
  await page.goto(`${base}/atlas/`, { waitUntil: 'networkidle', timeout: 60_000 })
  await page.waitForSelector('#content', { timeout: 20_000 })
  await page.waitForTimeout(600)

  const landing = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('#content h1')?.textContent?.trim() ?? '',
    sourceVisible: getComputedStyle(document.querySelector('#head-source')).display !== 'none',
    navSourceVisible: getComputedStyle(document.querySelector('#nav-src')).display !== 'none',
    paneVisible: getComputedStyle(document.querySelector('#pane')).display !== 'none',
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    robots: document.querySelector('meta[name="robots"]')?.getAttribute('content'),
  }))
  check('首页渲染标题', landing.h1 !== '', landing.h1 || '(空)')
  check('源码浏览器入口隐藏', !landing.sourceVisible && !landing.navSourceVisible && !landing.paneVisible)
  check('无横向溢出', !landing.overflow)
  check('canonical 指向 /atlas/', landing.canonical === 'https://dexagent.dpdns.org/atlas/', landing.canonical ?? 'null')
  check('noindex 生效', landing.robots?.includes('noindex') === true, landing.robots ?? 'null')
  await page.screenshot({ path: path.join(out, 'atlas-home.png'), fullPage: false })

  await page.goto(
    `${base}/atlas/#/pkg-name/%40deepseek-ai%2Fdsh-tool-fs`,
    { waitUntil: 'networkidle', timeout: 60_000 },
  )
  await page.waitForFunction(
    () => document.querySelector('#content h1')?.textContent?.trim() === 'tool-fs',
    { timeout: 20_000 },
  )
  const packagePage = await page.evaluate(() => ({
    h1: document.querySelector('#content h1')?.textContent?.trim() ?? '',
    sourceLinkCount: [...document.querySelectorAll('.srclink')].filter(
      (element) => getComputedStyle(element).display !== 'none',
    ).length,
    sourceButtonVisible: getComputedStyle(document.querySelector('#head-source')).display !== 'none',
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  }))
  check('包名深链解析到 tool-fs', packagePage.h1 === 'tool-fs', packagePage.h1)
  check('包页源码链接隐藏', packagePage.sourceLinkCount === 0 && !packagePage.sourceButtonVisible)
  check('包页无横向溢出', !packagePage.overflow)
  await page.screenshot({ path: path.join(out, 'atlas-tool-fs.png'), fullPage: false })

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const mobileErrors = []
  mobile.on('console', (message) => {
    if (message.type() === 'error') mobileErrors.push(message.text())
  })
  mobile.on('pageerror', (error) => mobileErrors.push(error.message))
  await mobile.goto(`${base}/atlas/#/pkg-name/%40deepseek-ai%2Fdsh-tool-fs`, {
    waitUntil: 'networkidle',
    timeout: 60_000,
  })
  await mobile.waitForFunction(
    () => document.querySelector('#content h1')?.textContent?.trim() === 'tool-fs',
    { timeout: 20_000 },
  )
  const mobileInfo = await mobile.evaluate(() => ({
    h1: document.querySelector('#content h1')?.textContent?.trim() ?? '',
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth,
    overflowing: [...document.querySelectorAll('body *')]
      .filter((element) => element.scrollWidth > element.clientWidth + 2)
      .map((element) => ({
        tag: element.tagName,
        cls: typeof element.className === 'string' ? element.className : '',
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        text: element.textContent?.trim().slice(0, 40) ?? '',
      }))
      .slice(0, 8),
    layout: ['#shell', '#main', '#content', '.site-head', '.head-inner', '.table-wrap'].map(
      (selector) => {
        const element = document.querySelector(selector)
        if (element === null) return null
        const rect = element.getBoundingClientRect()
        return {
          selector,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        }
      },
    ),
    tour: (() => {
      const table = document.querySelector('table.tour')
      if (table === null) return null
      const style = getComputedStyle(table)
      return {
        display: style.display,
        width: style.width,
        maxWidth: style.maxWidth,
        overflowX: style.overflowX,
        parent: table.parentElement?.className ?? '',
        parentWidth: Math.round(table.parentElement?.getBoundingClientRect().width ?? 0),
      }
    })(),
    offenders: [...document.querySelectorAll('body *')]
      .map((element) => {
        const rect = element.getBoundingClientRect()
        return {
          tag: element.tagName,
          cls: typeof element.className === 'string' ? element.className : '',
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          text: element.textContent?.trim().slice(0, 40) ?? '',
        }
      })
      .filter((item) => item.right > window.innerWidth + 1 && item.width > 0)
      .slice(0, 8),
  }))
  check('移动端包页可见', mobileInfo.h1 === 'tool-fs', mobileInfo.h1)
  check(
    '移动端无横向溢出',
    !mobileInfo.overflow,
    mobileInfo.overflow
      ? `${mobileInfo.scrollWidth}/${mobileInfo.bodyScrollWidth}/${mobileInfo.innerWidth} layout=${JSON.stringify(mobileInfo.layout)} tour=${JSON.stringify(mobileInfo.tour)} overflowing=${JSON.stringify(mobileInfo.overflowing)} offenders=${JSON.stringify(mobileInfo.offenders)}`
      : '',
  )
  check('移动端无控制台错误', mobileErrors.length === 0, mobileErrors.join(' | '))
  await mobile.screenshot({ path: path.join(out, 'atlas-tool-fs-mobile.png'), fullPage: false })
  await mobile.close()

  await page.goto(`${base}/atlas/#/code/packages/fs/tool-fs/src/index.ts`, {
    waitUntil: 'networkidle',
    timeout: 60_000,
  })
  await page.waitForTimeout(300)
  const redirected = await page.evaluate(() => location.hash)
  check('源码路由重定向到全站地图', redirected === '#/map', redirected)

  check('无控制台错误', consoleErrors.length === 0, consoleErrors.join(' | '))
  check('无 pageerror', pageErrors.length === 0, pageErrors.join(' | '))
  check(
    '无失败请求',
    failedRequests.filter((item) => !item.includes('favicon')).length === 0,
    failedRequests.join(' | '),
  )
  check('未请求 /api/*', apiRequests.length === 0, apiRequests.join(' | '))
} finally {
  await browser.close()
  server.kill()
}

if (failures.length > 0) {
  console.error(`[result] atlas 验证失败 ${failures.length} 项：${failures.join(' / ')}`)
  process.exitCode = 1
} else {
  console.log('[result] atlas 静态档案验证通过')
}
