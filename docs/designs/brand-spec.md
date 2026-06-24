# MarkText-derived brand spec

来源：
- 本地截图 `mqp0a7sv-PixPin_2026-06-22_17-17-34.png`
- 本地源码 `C:\Users\liuhao\workspace\dev\Dev\marktext\packages\website`
- 官网 `https://marktext.me`
- 文档站 `https://marktext.me/docs/introduction`

## Tokens

```css
:root {
  --bg: oklch(98.6% 0.003 286.4);
  --surface: oklch(100% 0 89.9);
  --fg: oklch(20.3% 0.014 285.1);
  --muted: oklch(56.3% 0.017 285.8);
  --border: oklch(92% 0.01 286);
  --accent: oklch(65.6% 0.212 354.3);
}
```

## Typography

- Display: `Geist, "SF Pro Display", "Segoe UI", system-ui, sans-serif`
- Body: `Geist, "SF Pro Text", "Segoe UI", system-ui, sans-serif`
- Mono: `"Geist Mono", "JetBrains Mono", "SF Mono", ui-monospace, monospace`

## Layout posture

- 顶部导航是低高度半透明胶囊条，边框极轻，阴影只作为空气感而不是层级主角。
- 页面大部分区域保持近白底，大留白，视觉重心靠字号和垂直节奏，而不是大面积色块。
- 强调色只集中在关键词、主 CTA、少量状态点和柔和晕染，不把整页染成渐变。
- 卡片和窗口演示统一用 16px 左右圆角、细描边、柔和投影，模拟“精致桌面应用”的质感。
- docs 站的价值在于信息架构清楚：左侧分组导航、中央窄列正文、右侧轻量辅助栏；不是花哨，而是有秩序。

## Vocalised system

我将采用“雾白产品画布 + 单一玫粉强调 + Geist 无衬线 + 轻玻璃导航 + 桌面窗口演示”的系统，把 MarkText 的干净感迁移到 Acorny，同时减少它偏开源下载站的语气，强化产品价值表达。
