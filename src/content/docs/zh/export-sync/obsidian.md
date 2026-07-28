---
title: 同步到 Obsidian
description: 用官方 Acorny Sync 插件把 Acorny 高亮同步进 Obsidian vault。
---

当你在 Obsidian 中记笔记，并希望 Acorny 高亮自动以 Markdown 笔记的形式出现在你的 vault 中时，请使用 Obsidian 同步。

Obsidian 同步是单向的：高亮从 Acorny 流向 Obsidian。你在 Obsidian 中所做的修改不会改变你的 Acorny 库。

同步在 Obsidian 内部通过官方 Acorny Sync 插件设置。在 Acorny 中，你只需要创建导出令牌。

## 设置

1. 打开 Acorny。
2. 进入 **Settings**。
3. 找到 **Export tokens**。
4. 创建一个名为 `Obsidian` 的令牌。
5. 立即复制该令牌。它只会显示一次。
6. 打开 Obsidian。
7. 进入 **设置** → **第三方插件**，按提示开启社区插件，并浏览社区插件市场。
8. 搜索 `Acorny`，安装 Acorny Sync 插件并启用。
9. 打开 Acorny Sync 插件设置。
10. 将导出令牌粘贴到令牌字段中。
11. 保存设置并运行一次同步。

设置完成后，插件会按同步周期从 Acorny 拉取新高亮，并以 Markdown 笔记的形式写入你的 vault。

## 会同步哪些内容

- 你 Acorny 库中的高亮
- 附属于高亮的笔记
- 附属于高亮的标签

同步是增量的：首次运行后，插件只会拉取自上次同步以来新增的高亮。

## 令牌安全

导出令牌是只读的：它可以读取你的高亮，但不能在 Acorny 中创建或修改任何内容。仍请像密码一样保管它。如果令牌泄露，请在 Settings 中撤销并创建新令牌。不要把 Obsidian vault 数据目录提交到公开仓库——插件配置中可能包含此令牌。

## 故障排查

如果高亮没有出现在 Obsidian 中，请检查以下内容：

- 确认令牌字段中填入的是 Acorny 导出令牌，而不是导入 API 令牌，也不是你的 Acorny 登录密码。
- 如果身份验证失败，请创建一个新的导出令牌并重新配置插件。
