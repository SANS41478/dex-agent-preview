const base = 'http://127.0.0.1:4321'
const pages = ['/','/observe/','/download/','/about/','/atlas/','/404.html']
const hrefs = new Set(pages)
for (const p of pages) {
  const html = await (await fetch(base + p)).text()
  for (const m of html.matchAll(/href="(\/[^"#?]*(?:#[^"?]*)?)"/g)) {
    let h = m[1].split('#')[0]
    if (h.startsWith('/_astro/') || h.startsWith('/images/') || h.startsWith('/fonts/')) continue
    if (h.endsWith('/') || h.endsWith('.html')) hrefs.add(h)
  }
}
const results = []
for (const h of hrefs) {
  const res = await fetch(base + h, { redirect: 'manual' })
  results.push({ h, status: res.status })
}
console.log(results)
