# Direction Approval

> 三方向门禁文件。

## Status

**APPROVED — 方向 2「剖面手册 / Exploded Manual」**

## 用户原话

> 我觉得第二个不错，尤其是那个自绘轴剖面图，但是那个图感觉不是很准确也不清晰，可能需要你再进行优化一下

## 理解与执行

- 选定方向：**2 · 剖面手册**。
- 用户特别关注首屏自绘轴测图，指出准确性和清晰度不足。
- 已按产品真实视觉编码重做：
  - 节点类型 = 颜色（使用产品 light theme 的 graph token）；
  - 状态 = 外环（运行 / 成功 / 失败 / 未激活）；
  - 大小 = 连接度 / 活跃度；
  - 边 = inject 依赖（实线）/ runtime 调用（点线）/ active run（蓝线）。
- 保留爆炸视图：L1 模型 + 调度 / L2 工具 + 技能 / L3 会话 + 沙箱，并注明“type clusters, not physical positions”。
- 图例改为 HTML，避免 SVG 小字拥挤；图注明确“SCHEMATIC”。
- 优化后截图：`design-demos/screenshots/dir-2-hero-v2b.png`、`dir-2-fig-v2.png`、`dir-2-diagram-v2.png`。

## 后续

按方向 2 进入最终 Astro 4 页实现（首页 / 观测 / 下载 / 关于 + 404）。
