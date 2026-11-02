# 三方向阶段 · 验证记录

日期：2026-10-31
范围：`design-demos/dir-1.html`、`dir-1-download.html`、`dir-2.html`、`dir-2-download.html`、`dir-3.html`、`dir-3-download.html`

## 1. 设计体检

工具：`E:\git开源项目\huashu-design\scripts\design_lint.py`（Python 3.13 + Playwright 1.64.1）

| 页面 | 红灯 | 黄灯/说明 |
| --- | --- | --- |
| dir-1 | 0 | 相对路径图片（多页样张共享 `public/`）；等宽小标签；结构分隔 `·`；序列编号 |
| dir-1-download | 0 | 等宽小标签；结构分隔 `·` |
| dir-2 | 0 | 相对路径图片；技术手册式大写小标签；等宽小标签；图号编号 |
| dir-2-download | 0 | 等宽小标签；结构分隔 `·` |
| dir-3 | 0 | 相对路径图片；等宽小标签；时间码/阶段标签 |
| dir-3-download | 0 | 等宽小标签；阶段编号 |

结论：红灯全部清除。黄灯是这三个方向的设计语言（仪表读数、技术手册图注、回放时间码）与多页样张共享资源导致的，保留并在交付说明中注明。

## 2. 三方向对比

`design_lint.py compare --brand`：

```
dir-1 ↔ dir-2：骨架相关 0.17
dir-1 ↔ dir-3：骨架相关 0.50
dir-2 ↔ dir-3：骨架相关 0.19
✓ 三版拉开了
```

不加 `--brand` 时，dir-1 与 dir-3 会因为同为品牌暗色底、同为 Geist 标题被判「色板几乎相同」。这是品牌约束，不是换皮；骨架分别是仪表盘、技术手册、滚动回放。详见 `docs/directions.md`。

## 3. 浏览器验证

Playwright（项目内 `@playwright/test`）逐页检查：

- 1440×900 与 375×812 均无控制台错误、无 pageerror、无失败请求。
- 所有图片 `naturalWidth > 0`。
- `document.documentElement.scrollWidth === window.innerWidth`（无横向溢出）。
- 页面标题与 h1/h2 层级可读。

产物：

- `design-demos/screenshots/*-desktop-full.png` / `*-mobile-full.png`
- `design-demos/screenshots/dir-1-light-*.png`（浅色主题）
- `design-demos/screenshots/dir-3-run-0.png` – `dir-3-run-4.png`（滚动分镜）

## 4. 交互验证

| 交互 | 结果 |
| --- | --- |
| dir-1 主题切换 | 通过；截图切换为 light 版本，localStorage 持久化 |
| dir-1 移动菜单 | 通过；Esc 关闭，链接点击关闭 |
| dir-1 时间线回放按钮 | 通过；播放头从 0 到 60%，时间读数更新 |
| dir-1 下载页平台选择 | 通过；点击平台行按钮会把平台写入表单 |
| dir-2 时间线回放按钮 | 通过 |
| dir-2 下载页平台选择 | 通过 |
| dir-3 滚动阶段切换 | 通过；5 个阶段分别激活对应 figure / tick / HUD / 状态 |
| dir-3 tick 点击跳转 | 通过；滚动到对应阶段并激活 |
| dir-3 下载页平台选择 | 通过 |
| 三个下载页邮箱校验 | 通过；无效邮箱显示错误，不提交 |
| 三个下载页提交 | 打开 `mailto:hello@example.com` 占位；不伪造成功 |

## 5. 公开禁用词

```powershell
rg -i "\bdsh\b|DeepSeek Harness|deepseek-harness" design-demos -g "*.html"
```

无匹配。`Cordis` 允许出现；截图内未发现 dsh 字样。

## 6. 已知 caveats

- 三方向样张为多页 HTML，共享 `public/` 字体与截图；最终 Astro 站会自托管并优化资源。
- 预约表单使用 `mailto:` 占位，正式端点待替换。
- 域名、canonical、OG URL 均为占位。
- Run 001 为示例执行，截图来自真实界面，但时间码与步骤编排为演示叙事。
- `dir-1` 浅色主题截图已验；`dir-2` 是刻意的浅色方向，`dir-3` 是刻意的暗色方向，暂不做主题切换。

---

## 最终站验证（方向 2 · 剖面手册）

### 构建

```bash
pnpm check   # astro check: 0 errors / 0 warnings / 0 hints
pnpm build   # 5 pages: /, /observe/, /download/, /about/, /404.html
```

`dist/` 约 6.57 MB，主要是 Noto Sans SC 的 101 个 unicode-range 切片（4.3 MB）和真实截图。字体按 unicode-range 懒加载，首屏不会全量下载。

### 设计体检（served 版本）

由于 `design_lint.py` 用 `file://` 打开页面，绝对路径 `/images` 与 Astro 的 `/_astro` 会失效；本轮把脚本的 `page.goto` 改为支持 HTTP，检查 `http://127.0.0.1:4321` 的 served 版本。

| 页面 | 红灯 | 黄灯 |
| --- | --- | --- |
| `/` | 0 | 绝对图片路径；技术手册等宽标签；真实序列编号 |
| `/observe/` | 0 | 绝对图片路径；技术手册等宽标签 |
| `/download/` | 0 | 等宽标签 |
| `/about/` | 0 | 绝对图片路径；等宽标签；序列编号 |
| `/404.html` | 0 | 等宽标签 |

黄灯与三方向阶段一致：属于“剖面手册”的设计语言，不是模板装饰；绝对路径是静态站的正常资源引用方式。

### 浏览器验证

- 1440×900 / 375×812，5 个路由全部 200。
- 无控制台错误、无 pageerror、无失败请求。
- 无坏图；`scrollWidth === innerWidth`（无横向溢出）。
- 截图：`artifacts/site/*-desktop-full.png`、`*-mobile-full.png`、`*-desktop-hero.png`。

### 交互验证

| 交互 | 结果 |
| --- | --- |
| 首页时间线回放 | 通过；`--play` 到 60%，读数 `00:48` |
| 观测页联动示意 | 通过；Step 03 → edit 节点高亮；重置清除 |
| 下载页平台选择 | 通过；macOS 按钮写入 select |
| 下载页邮箱校验 | 通过；无效邮箱显示错误，有效邮箱打开 mailto 占位 |
| 移动端菜单 | 通过；打开/关闭、aria-expanded/aria-hidden 同步 |
| 内部链接 | `/`, `/observe/`, `/download/`, `/about/`, `/atlas/`, `/404.html` 全部 200 |

### 公开禁用词（营销页面）

`dist` 的营销 HTML/JS/CSS 中 `dsh`、`DeepSeek Harness`、`deepseek-harness` 无匹配；`Cordis` 按约定保留。`dist/atlas/` 是独立技术档案，按 ADR/内容边界例外处理。

### Atlas 静态档案（2026-11-02）

- `pnpm sync:atlas`：从 `E:\dsh研究` 生成 `public/atlas/`，8 个运行文件 / 2.29 MiB；复用官网字体，不复制研究站 4.7MB 字体。
- `pnpm check`：0 errors / 0 warnings / 0 hints（`public/atlas` 已在 `tsconfig` 排除）。
- `pnpm build`：营销 4 页 + 404 + `/atlas/`；`dist` 总计约 9.29MB。
- `pnpm test:atlas` 16/16：`/atlas/` 加载、`#/pkg-name/%40deepseek-ai%2Fdsh-tool-fs` 解析到 `tool-fs`、源码入口隐藏、`#/code` 重定向 `#/map`、无 `/api/*` 请求、无控制台错误/pageerror、桌面与 390px 移动端无横向溢出、noindex/canonical 正确。
- 截图：`artifacts/atlas-verify/atlas-home.png`、`atlas-tool-fs.png`、`atlas-tool-fs-mobile.png`。
- 限制：静态托管没有 `/api/*`，源码浏览器与「读源码 / 行号跳转」不可用；需要源码时运行本地研究站。

### 待部署

- `/atlas/`、官网导航/页脚入口与内容边界更新已在本地构建验证，但尚未推送 GitHub Pages；需执行 `pnpm build:gh-pages` 后把 `artifacts/gh-pages-prod` 推到 Pages 仓库。

### 最终 caveats

- 预约端点仍为 `mailto:hello@example.com` 占位。
- 域名已上线：`https://dexagent.dpdns.org/`；canonical / OG 已指向正式域名。
- 下载页没有安装包，所有平台按钮均为预约内测。
- 观测页的 `FIG. 02` 为结构示意，不是某次真实 run 的逐帧录屏；图注已标明。
- 首页首屏剖面图为示意图，图注明确 `type clusters, not physical positions`。

### 生产验证（2026-11-01）

- 域名：`dexagent.dpdns.org`，DNS：DigitalPlat DNS
- A 记录：`185.199.108.153` / `.109.153` / `.110.153` / `.111.153`
- 托管：GitHub Pages，仓库 `SANS41478/dex-agent-preview`
- HTTPS：已开启强制跳转；HTTP 301 → HTTPS
- Pages 构建：`2d1a4d3`
- 页面：`/`、`/observe/`、`/download/`、`/about/`、404 全部通过
- 资源：CSS、字体、OG 图全部 200
- Playwright：桌面 1440 / 手机 390，无控制台错误、无失败资源、无坏图、无横向溢出
- canonical：各页均指向 `https://dexagent.dpdns.org/...`
- 截图：`artifacts/site-verify/`
