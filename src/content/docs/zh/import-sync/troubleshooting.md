---
title: 排查导入与同步问题
description: 修复 Acorny 中常见的导入与同步问题。
---

当文件导入或已连接的同步没有带来你期望的高亮时，请使用本页面。

## 文件导入失败

请检查文件是否与你选择的来源匹配。例如，Cubox JSON 导出应作为 Cubox 导入，而 Diigo CSV 导出应作为 Diigo 导入。

对于 Cubox，请使用由 Cubox Exporter 生成的 JSON 文件。对于 WeRead，请使用来自 Acorny 浏览器扩展的 `weread-export.json`。对于 Kindle，请使用来自 Kindle 设备的原始 `My Clippings.txt` 文件。

## 预览显示的高亮少于预期

某些导出包含书签、空的批注，或没有高亮文本的笔记。Acorny 会导入高亮文本，并可能跳过那些无法成为可复习高亮的条目。

## 同步导入的高亮数量为零

请确认已连接的账户中确实包含高亮或批注，然后运行一次手动同步。某些提供方暴露笔记和高亮的方式有所不同。

Moon+ Reader 的推送同步是在 Moon+ Reader 内部配置的，而不是通过 Extensions & Apps 卡片。如果新的 Moon+ Reader 高亮没有出现，请检查 Moon+ Reader 的 Readwise sync settings 中的 Readwise URL 和 Import API token。

## 仍然受阻时

请联系支持团队，并提供来源名称、文件类型，以及 Acorny 中显示的错误。不要发送密码或 API 密钥。
