/**
 * 把 E:\dsh研究 的静态站点快照到 public/atlas/。
 *
 * 为什么不直接复制整个目录：
 * - 研究站的 assets/fonts 与官网 /public/fonts 重复（约 4.7MB），这里复用官网字体；
 * - GitHub Pages 没有研究站的 /api/*，源码浏览器必须隐藏，并拦截 #/files / #/code；
 * - 研究站是独立页面，这里只在静态产物上做最小品牌/可达性补丁，源站保持不变。
 *
 * 用法：
 *   pnpm sync:atlas
 *   DSH_ATLAS_SRC=E:/dsh研究 pnpm sync:atlas
 */
import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const source = path.resolve(process.env.DSH_ATLAS_SRC ?? 'E:/dsh研究')
const dest = path.join(root, 'public', 'atlas')

const files = [
  'index.html',
  'assets/app.js',
  'assets/deepfmt.js',
  'assets/source.js',
  'assets/style.css',
  'assets/source.css',
  'assets/responsive.css',
  'data/bundle.js',
]

function replaceOnce(text, from, to, label) {
  if (!text.includes(from)) {
    throw new Error(`[sync-atlas] 源站结构已变化，找不到 ${label}: ${from.slice(0, 80)}`)
  }
  return text.replace(from, to)
}

async function ensureSource() {
  try {
    const info = await stat(source)
    if (!info.isDirectory()) throw new Error('not a directory')
  } catch {
    throw new Error(`[sync-atlas] 找不到研究站目录：${source}（可用 DSH_ATLAS_SRC 覆盖）`)
  }
}

await ensureSource()
await rm(dest, { recursive: true, force: true })
await mkdir(dest, { recursive: true })

for (const relative of files) {
  const from = path.join(source, relative)
  const to = path.join(dest, relative)
  await mkdir(path.dirname(to), { recursive: true })
  await cp(from, to)
}

const staticCss = `
<style>
  .atlas-static .head-source,
  .atlas-static #nav-src,
  .atlas-static #pane,
  .atlas-static #pane-split,
  .atlas-static .srclink,
  .atlas-static a.code-live,
  .atlas-static a[data-tree],
  .atlas-static a[href="#/files"] { display: none !important; }
  .atlas-back { text-decoration: none; }
  .atlas-back:hover { color: var(--ink); }
  @media (max-width: 720px) {
    .atlas-static #content { overflow-wrap: anywhere; }
    .atlas-static #content table { width: 100%; min-width: 0; table-layout: fixed; }
    .atlas-static #content th,
    .atlas-static #content td { word-break: break-word; }
  }
</style>`

let html = await readFile(path.join(dest, 'index.html'), 'utf8')
html = replaceOnce(
  html,
  '<link rel="stylesheet" href="assets/fonts/noto-sans-sc.css">',
  '<link rel="stylesheet" href="/fonts/noto-sans-sc.css">',
  'Noto Sans SC CSS link',
)
html = replaceOnce(
  html,
  '<html lang="zh-CN">',
  '<html lang="zh-CN" class="atlas-static">',
  'html root',
)
html = replaceOnce(
  html,
  '<div class="head-actions">',
  '<div class="head-actions"><a class="head-meta atlas-back" href="/">← DEX AGENT / 技术档案</a>',
  'head actions',
)
html = replaceOnce(
  html,
  '</head>',
  `  <meta name="robots" content="noindex,nofollow">
  <link rel="canonical" href="https://dexagent.dpdns.org/atlas/">
  ${staticCss}
</head>`,
  'head closing',
)
html = replaceOnce(
  html,
  '<script src="data/bundle.js"></script>',
  '<script>window.DSH_STATIC = true</script>\n<script src="data/bundle.js"></script>',
  'bundle script',
)
html = replaceOnce(
  html,
  '</body>',
  `  <script>
    (function () {
      const guard = () => {
        if (/^#\\/(files|code)\\b/.test(location.hash)) location.replace('#/map')
      }
      addEventListener('hashchange', guard)
      guard()
    })()
  </script>
</body>`,
  'body closing',
)
await writeFile(path.join(dest, 'index.html'), html, 'utf8')

const appPath = path.join(dest, 'assets/app.js')
let app = await readFile(appPath, 'utf8')
const routeMarker = "async function route() {\n  const hash = location.hash.slice(1) || '/'\n"
if (!app.includes(routeMarker)) {
  throw new Error('[sync-atlas] 源站 app.js 的 route() 结构已变化，无法注入静态路由守卫')
}
const routeGuard = [
  '  if (window.DSH_STATIC && /^\\/(files|code)(\\/|$)/.test(hash)) {',
  "    location.replace('#/map')",
  '    return',
  '  }',
  '',
].join('\n')
app = app.replace(routeMarker, `${routeMarker}${routeGuard}`)
await writeFile(appPath, app, 'utf8')

const stylePath = path.join(dest, 'assets/style.css')
let style = await readFile(stylePath, 'utf8')
const beforeStyle = style
style = style.replaceAll("url('fonts/", "url('../../fonts/")
style = style.replaceAll('url("fonts/', 'url("../../fonts/')
if (style === beforeStyle) {
  throw new Error('[sync-atlas] 字体路径改写失败：assets/style.css 中没有 fonts/ url()')
}
await writeFile(stylePath, style, 'utf8')

const total = files.reduce(async (sizePromise, relative) => {
  const size = await sizePromise
  const info = await stat(path.join(dest, relative))
  return size + info.size
}, Promise.resolve(0))

console.log(`[sync-atlas] source: ${source}`)
console.log(`[sync-atlas] dest:   ${dest}`)
console.log(`[sync-atlas] copied ${files.length} files, ${(await total / 1024 / 1024).toFixed(2)} MiB`)
console.log('[sync-atlas] source browser hidden; #/files and #/code redirect to #/map')
