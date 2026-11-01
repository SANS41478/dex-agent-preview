import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
const root = 'E:/Dex/dex-site/dist'
const port = Number(process.argv[2] || 4321)
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.txt':'text/plain; charset=utf-8', '.json':'application/json' }
const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent((req.url || '/').split('?')[0])
    if (p.endsWith('/')) p += 'index.html'
    let file = normalize(join(root, p))
    if (!file.startsWith(normalize(root))) { res.writeHead(403); res.end('forbidden'); return }
    try { const s = await stat(file); if (s.isDirectory()) file = join(file, 'index.html') } catch {}
    const data = await readFile(file)
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' })
    res.end(data)
  } catch { res.writeHead(404, { 'content-type':'text/plain; charset=utf-8' }); res.end('not found') }
})
server.listen(port, '127.0.0.1', () => console.log(`serving ${root} on http://127.0.0.1:${port}`))
