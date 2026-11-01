import { execSync } from 'node:child_process'
import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const out = path.join(root, 'artifacts', 'gh-pages-prod')
const domain = 'dexagent.dpdns.org'

execSync('pnpm build', {
  cwd: root,
  stdio: 'inherit',
})

await mkdir(out, { recursive: true })
for (const entry of await readdir(out)) {
  await rm(path.join(out, entry), { recursive: true, force: true })
}
await cp(dist, out, { recursive: true })
await writeFile(path.join(out, '.nojekyll'), '')
await writeFile(path.join(out, 'CNAME'), domain)

console.log(`GitHub Pages production build written to ${out}`)
console.log(`Custom domain: ${domain}`)
