import { execSync } from 'node:child_process'
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const out = path.join(root, 'artifacts', 'gh-preview')
const basePath = '/dex-agent-preview'
const previewOrigin = 'https://sans41478.github.io/dex-agent-preview/'

execSync('pnpm build', {
  cwd: root,
  stdio: 'inherit',
})

await mkdir(out, { recursive: true })
for (const entry of await readdir(out)) {
  if (entry === '.git') continue
  await rm(path.join(out, entry), { recursive: true, force: true })
}
await cp(dist, out, { recursive: true })
await writeFile(path.join(out, '.nojekyll'), '')

const extensions = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt'])
let rewritten = 0

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(full)
    } else if (entry.isFile()) {
      yield full
    }
  }
}

for await (const file of walk(out)) {
  if (!extensions.has(path.extname(file))) continue
  const before = await readFile(file, 'utf8')
  let text = before

  text = text.replace(
    /\b(href|src|poster|action)="\/(?!\/)/g,
    (_, attribute) => `${attribute}="${basePath}/`,
  )
  text = text.replace(
    /\burl\(\s*(["']?)\/(?!\/)/g,
    (_, quote) => `url(${quote}${basePath}/`,
  )
  text = text.replace(/\bsrcset="([^"]*)"/g, (_, value) => {
    const rewrittenValue = value
      .split(',')
      .map((candidate) => {
        const [url, descriptor] = candidate.trim().split(/\s+/, 2)
        if (!url.startsWith('/') || url.startsWith('//')) return candidate.trim()
        return `${basePath}${url}${descriptor ? ` ${descriptor}` : ''}`
      })
      .join(', ')
    return `srcset="${rewrittenValue}"`
  })

  text = text.replaceAll('https://example.com/images/', `${previewOrigin}images/`)
  text = text.replaceAll('https://example.com/', previewOrigin)

  if (text !== before) {
    await writeFile(file, text, 'utf8')
    rewritten += 1
  }
}

console.log(`GitHub Pages preview written to ${out}`)
console.log(`Rewritten ${rewritten} files for base path ${basePath}/`)
