import { chromium } from 'file:///E:/dexAgent/node_modules/@playwright/test/index.mjs'
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const page = browser.contexts()[0].pages()[0]
const info = await page.evaluate(() => {
  const inputs=[...document.querySelectorAll('input')].map(e=>({type:e.type,name:e.name,placeholder:e.placeholder,accept:e.accept,webkitdirectory:e.hasAttribute('webkitdirectory'),className:e.className}))
  const buttons=[...document.querySelectorAll('button')].map(e=>({text:e.innerText.trim().slice(0,60),cls:e.className,disabled:e.disabled}))
  const texts=[...document.querySelectorAll('*')].filter(e=>e.children.length===0 && e.textContent.trim()).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,80),cls:e.className})).filter(x=>/Acceleration|Global|MLC|Select|Upload|Project/i.test(x.text)).slice(0,30)
  return {inputs,buttons,texts}
})
console.log(JSON.stringify(info,null,2))
await browser.close()
