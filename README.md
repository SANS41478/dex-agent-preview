# Dex AGENT Website

基于 **方向 2「剖面手册 / Exploded Manual」** 的 4 页静态官网。

## 状态

- ✅ 三方向探索完成，方向 2 已选定。
- ✅ 首屏轴测图已按产品真实视觉编码优化：类型 = 颜色、状态 = 外环、大小 = 连接度、边 = inject / runtime / active run。
- ✅ Astro 4 页 + 404 已完成：首页 / 观测 / 下载 / 关于。
- ✅ `astro check`、`astro build`、`astro preview` 通过。
- ✅ 1440 / 375 Playwright 检查：无控制台错误、坏图、横向溢出。
- ✅ 正式域名已上线：`https://dexagent.dpdns.org/`，GitHub Pages + HTTPS 强制跳转。
- ⏳ 预约端点、安装包链接仍为占位。

## 页面

| 路由 | 内容 |
| --- | --- |
| `/` | 拆开 Agent：轴测剖面图、结构 / 过程 / 时间 / 扩展四张图、原则、CTA |
| `/observe/` | 观测能力：图谱编码、DAG、时间线、可点击联动示意、性能 |
| `/download/` | 平台占位、内测预约、FAQ |
| `/about/` | Open the loop.、原则、边界、架构、技术栈、版本 |
| `/404.html` | 品牌一致的返回页 |

## 开发

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm check      # astro check
pnpm build      # 输出 dist/
pnpm preview
pnpm build:gh-pages  # 生成 GitHub Pages 生产目录 artifacts/gh-pages-prod
```

## 结构

```text
src/
  layouts/BaseLayout.astro      SEO / OG / 导航 / Footer / 全局脚本
  components/
    Header.astro  Footer.astro  CtaBand.astro
    HeroDiagram.astro          首屏轴测剖面图 + 图例
    ArchDiagram.astro          架构图
    PlatformTable.astro  WaitlistForm.astro  Faq.astro
  pages/
    index.astro  observe.astro  download.astro  about.astro  404.astro
  styles/global.css            品牌 token 派生的全站样式
public/
  fonts/                       Geist + Geist Mono + Noto Sans SC
  images/brand/                logo / 图标 / favicon
  images/screens/              真实产品截图
  images/og.png                OG 图
design-demos/                  三方向探索样张（保留作参考）
docs/                          产品事实 / 品牌规范 / 文案 / 方向 / 验证
```

## 部署

| 项 | 值 |
| --- | --- |
| 生产地址 | `https://dexagent.dpdns.org/` |
| 托管 | GitHub Pages |
| Pages 仓库 | `SANS41478/dex-agent-preview` |
| 域名 | DigitalPlat `dpdns.org`，DNS 由 DigitalPlat DNS 托管 |
| DNS | 4 条 GitHub Pages A 记录；`CNAME` 文件指向 `dexagent.dpdns.org` |
| HTTPS | GitHub Pages 自动证书，已开启 HTTPS 强制 |

发布流程：`pnpm build:gh-pages`，把 `artifacts/gh-pages-prod` 推送到 Pages 仓库根目录。`CNAME` 与 `.nojekyll` 由脚本生成。

## 内容边界

- 公开页面不出现 `dsh` / `DeepSeek Harness` / `deepseek-harness`；`Cordis` 按约定允许出现。
- 不编造下载链接、版本号、客户评价或性能数据。
- 500 节点 / 101fps 为 2026-10-30 本机开发环境基准，页面已注明口径。
- 所有截图来自真实产品界面；首屏剖面图是**示意图**，图注明确 `type clusters, not physical positions`。

## 占位项（上线前替换）

| 项 | 位置 |
| --- | --- |
| 预约邮箱 / 表单端点 | `src/components/WaitlistForm.astro` 的 `hello@example.com` 与 `mailto:` |
| 正式域名 | 已上线：`https://dexagent.dpdns.org/` |
| OG / canonical | 由 `Astro.site` 生成，已指向正式域名 |
| 安装包 / Release | 下载页当前只有「预约内测」与「即将开放」，无假下载 |
| GitHub | 仓库未公开，官网不放置 GitHub 按钮 |

## 验证

详见 `docs/verification.md`。最终站用 served 版本跑 `design_lint`：**0 红灯**；黄灯为技术手册式等宽标签、真实序列编号与绝对图片路径，属于设计语言/静态资源，不是缺陷。
