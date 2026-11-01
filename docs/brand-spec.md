# Dex AGENT 官网 · 品牌与素材规范

> 来源：`E:\dexAgent\brand\`、`E:\dexAgent\docs\design-system\01-brand.md`、`02-foundations.md`、`07-tokens-theming.md`、`apps/desktop/src/renderer/src/tokens.css`。
> 官网是“界面外”物料，产品名用 **Dex AGENT**；截图内的 `Dex` 不改。

## 1. 品牌内核

| 关键词 | 是 | 不是 |
| --- | --- | --- |
| 克制的 | 信息密度高，但每个像素都有理由 | 为了留白而留白、把功能藏起来 |
| 精确的 | 数字、单位、时间、路径如实呈现 | 用「哎呀」替代错误码 |
| 专业的 | 面向每天使用 8 小时的开发者 | 炫酷、霓虹、渐变字、无意义 3D |

**产品命题**：把 Agent 黑箱打开，变成可观察、可拆解、可扩展的对象。
**标语**：`Open the loop.` / `打开回路`。

## 2. 标志

| 变体 | 文件 | 用途 | 禁止 |
| --- | --- | --- | --- |
| pearl-dark | `brand/logo/dex-logo-pearl-dark-2048.png` | 深色底品牌展示：官网首屏、关于页 | 小尺寸、界面内、商标材料 |
| ink-light | `brand/logo/dex-logo-ink-light-2048.png` | 浅色底品牌展示 | 深色底 |
| mono-ink | `brand/logo/dex-logo-mono-ink-2048.png` | 界面内深色底、单色印刷 | 质感展示 |
| mono-white | `brand/logo/dex-logo-mono-white-2048.png` | 深色底/彩色底、反白 | 浅色底 |
| app-icon | `brand/logo/dex-logo-app-icon-1024.png` | favicon、OG、应用图标 | 界面内、小尺寸发光 |

规则：

- 宽高比 0.9590，等比缩放，禁止拉伸/旋转/改色/加投影/渐变。
- 最小完整标志 24px；favicon 可用 16–32px 简化识别；app icon ≥32px。
- 安全区：紧凑框高度 × 0.25，四周不得出现文字、边框、其他图标。
- 官网导航用 `mono-white` 做 CSS mask，颜色取 `--text-primary`；首屏/关于用 `pearl-dark` 或 `ink-light` 展示。
- 不把生成版当商标；矢量基准是程序化派生版。

## 3. 色彩

### 暗色（默认）

| Token | HEX | 用途 |
| --- | --- | --- |
| `--surface-base` | `#0A0A0A` | 页面底 |
| `--surface-panel` | `#131313` | 区块底 |
| `--surface-card` | `#171717` | 卡片/图框 |
| `--surface-raised` | `#222222` | 浮层 |
| `--border-subtle` | `#232323` | 发丝分隔 |
| `--border-default` | `#373737` | 图框/输入框 |
| `--text-primary` | `#F3F3F3` | 正文 |
| `--text-secondary` | `#A4A4A4` | 次要信息 |
| `--text-tertiary` | `#898989` | 元信息下限 |
| `--accent-primary` | `#4A91F8` | 唯一交互/选中信号 |
| `--status-running` | `#00BDBE` | 运行中 |
| `--status-success` | `#51C672` | 成功 |
| `--status-warning` | `#EBA941` | 告警 |
| `--status-failed` | `#F75D59` | 失败 |

### 浅色

| Token | HEX |
| --- | --- |
| `--surface-base` | `#F7F7F7` |
| `--surface-panel` | `#FCFCFC` |
| `--surface-card` | `#FFFFFF` |
| `--surface-raised` | `#EEEEEE` |
| `--border-subtle` | `#E4E4E4` |
| `--border-default` | `#D4D4D4` |
| `--text-primary` | `#1B1B1B` |
| `--text-secondary` | `#5D5D5D` |
| `--text-tertiary` | `#6B6B6B` |
| `--accent-primary` | `#0B66D6` |
| `--status-running` | `#007E7F` |
| `--status-success` | `#14823E` |
| `--status-warning` | `#A16400` |
| `--status-failed` | `#C92F33` |

纪律：

- 蓝色只表达“可交互 / 被选中”；不做装饰点缀。
- 状态色只表达状态，不做强调色。
- 官网允许大面积中性灰阶、真实截图中的状态色；不允许紫渐变、霓虹光晕、渐变文字。

## 4. 字体

| 角色 | 字体 | 文件 |
| --- | --- | --- |
| 拉丁/数字/代码 | Geist / Geist Mono Variable | `apps/desktop/node_modules/@fontsource-variable/geist/files/*.woff2` |
| 中文 | Noto Sans SC 可变切片 | `apps/desktop/src/renderer/src/assets/fonts/noto-sans-sc.css` + 101 个 woff2 |

字体栈：

```css
--font-sans: 'Geist Variable', 'Noto Sans SC', 'Microsoft YaHei', system-ui, sans-serif;
--font-mono: 'Geist Mono Variable', 'Noto Sans SC', 'Cascadia Mono', Consolas, monospace;
```

官网字号（营销尺度，不套产品 13px 基准）：

| Token | 值 | 用途 |
| --- | --- | --- |
| `--display-1` | `clamp(3.5rem, 7.5vw, 7rem)` / 0.95 | 首屏主标题 |
| `--display-2` | `clamp(2.5rem, 4.6vw, 4.5rem)` / 1.0 | 区块大标题 |
| `--h2` | `clamp(2rem, 3.2vw, 3rem)` / 1.1 | 二级标题 |
| `--h3` | `1.375rem` / 1.35 | 卡片标题 |
| `--body-lg` | `1.125rem` / 1.75 | 导语 |
| `--body` | `1rem` / 1.7 | 正文 |
| `--label` | `0.75rem` / 1.4 | 技术标签/图注 |

规则：正文 ≥16px，标签 ≥12px；中文行高 1.7；不使用 800/900 字重；不用全大写拉开字距的小标签；编号只在真实序列中使用。

## 5. 间距、圆角、动效

| 类别 | 值 |
| --- | --- |
| 间距 | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160 |
| 圆角 | 0, 4, 6, 8, 12, 16, 24；官网默认小圆角（4–12），不做全 pill |
| 时长 | 120, 160, 220, 320ms；载入编排可到 600ms |
| 缓动 | `cubic-bezier(0.2, 0, 0, 1)` |
| 边框 | 1px 发丝线；暗色 `#232323`，浅色 `#E4E4E4` |
| 阴影 | 只给产品窗口/浮层：`0 24px 80px rgba(0,0,0,.35)`；卡片默认无阴影 |

## 6. 图像与图表

- 只用真实产品截图、官方 logo、自绘几何/数据图表。
- 不使用生成式假产品图、假人物、假客户 logo、假评价、假数据。
- 截图需检查：不出现 dsh / DeepSeek Harness / 包名 / 本地路径 / 个人 token。
- 架构图用自绘 SVG，标签用中性词：`Cordis 插件运行时`、`插件树`、`graph bridge`、`trace bridge`、`WebSocket`、`Electron`。
- 图表颜色只取自 token；状态色只表达状态。
- 图表必须有图注和来源/口径。

## 7. 文案语气

- 短句、技术名词、精确动词：观察、拆解、回放、定位、挂载、热插拔。
- 不用“赋能、一站式、革命性、重新定义、AI 时代”。
- 不用 emoji；不用感叹号堆情绪。
- 数字带口径：`500 节点基准 101fps（本机开发环境）`。
- 公开页禁用词见 `product-facts.md` 第 11 节。
- 独立声明：`Dex AGENT 是独立产品，与模型厂商无隶属关系。`

## 8. 官网“更外放”的边界

允许：

- 更大的字号、更多负空间、全幅截图、自绘剖面图/时间轴。
- 一次编排好的载入、滚动叙事、粘性面板、可交互图谱示意。
- 亮色方向作为三方向之一，测试品牌在浅色营销语境的表现。

不允许：

- 紫渐变、彩虹渐变、霓虹 glow、渐变文字。
- 每个区块都 fade-up、无限循环装饰动画。
- 左彩条圆角卡片、bento 套件、emoji 图标、假 metric cards。
- 把整页做成终端/仪表盘道具（最多一个方向、且必须服务内容）。
