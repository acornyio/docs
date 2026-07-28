---
title: '概览：导入与同步'
description: 比较 Acorny 当前所有导入与同步路径，然后打开与你的来源对应的指南。
---

Acorny 当前有三种方式把高亮带入你的库：一次性文件或 API 导入、持续连接的服务，以及通过 Acorny 导入 API 令牌发送高亮的阅读器应用。

## 按目标选择路径

- **一次迁移现有书库：** 使用文件导入或一次性 API 导入。
- **持续接收连接服务的新高亮：** 在 Extensions & Apps 中连接 Instapaper 或 Inoreader。
- **从阅读器应用发送高亮：** 在 Acorny Settings 中创建导入 API 令牌，然后设置阅读器的 Readwise 兼容同步。
- **把高亮发送到笔记应用：** 安装 [Obsidian](/zh/import-sync/obsidian/) 或[思源笔记](/zh/import-sync/siyuan/)插件，并在 Acorny Settings 中创建导出令牌。

## 当前来源矩阵

| 来源 | 当前路径 | 传输类型 | 打开指南 |
| --- | --- | --- | --- |
| Acorny 导出 | 上传导出的 JSON 或 CSV | 一次性文件导入 | [导入 Acorny 导出文件](/zh/import-sync/acorny-export/) |
| 受支持的 CSV | 上传 Acorny、Readwise 或 Diigo CSV 导出 | 一次性文件导入 | [导入 CSV 文件](/zh/import-sync/csv/) |
| Cubox | 上传 Cubox JSON 导出 | 一次性文件导入 | [从 Cubox 导入](/zh/import-sync/cubox/) |
| Diigo | 上传 CSV，或使用 Diigo 凭据拉取 | 一次性文件或 API 导入 | [从 Diigo 导入](/zh/import-sync/diigo/) |
| Inoreader | 在 Extensions & Apps 中连接服务 | 连接式同步 | [同步 Inoreader 高亮](/zh/import-sync/inoreader/) |
| Instapaper | 在 Extensions & Apps 中连接服务 | 连接式同步 | [同步 Instapaper 高亮](/zh/import-sync/instapaper/) |
| Kindle | 上传 `My Clippings.txt` | 一次性文件导入 | [从 Kindle 导入](/zh/import-sync/kindle/) |
| Koodo Reader | 使用 Acorny 导入 API 令牌设置 Readwise 同步 | 阅读器应用同步 | [同步 Koodo Reader](/zh/import-sync/koodo-reader/) |
| Moon+ Reader | 上传受支持的备份，或设置 Readwise 同步 | 文件导入或阅读器应用同步 | [导入或同步 Moon+ Reader](/zh/import-sync/moon-reader/) |
| PDF | 上传带有可提取批注的 PDF | 一次性本地导入 | [从 PDF 导入高亮](/zh/import-sync/pdf/) |
| Readest | 使用 Acorny 令牌和 URL 设置 Readwise 兼容 API | 阅读器应用同步 | [同步 Readest](/zh/import-sync/readest/) |
| Readwise | 上传 CSV，或使用 Readwise access token 拉取 | 一次性文件或 API 导入 | [从 Readwise 导入](/zh/import-sync/readwise/) |
| WeRead | 用 Acorny 扩展导出 `weread-export.json`，然后上传 | 一次性文件导入 | [从微信读书导入](/zh/import-sync/weread/) |

## 各类型的含义

### 一次性导入

一次性导入会复制所选文件或 API 响应中当前可用的高亮，适合迁移、恢复和偶尔转移。重复执行导入不等同于让提供方保持连接。

### 连接式同步

Instapaper 和 Inoreader 会在 Extensions & Apps 中显示为连接卡片。完成设置后，如果需要在常规连接流程之外主动请求同步，请使用[手动同步](/zh/import-sync/manual-sync/)。

### 阅读器应用同步

Koodo Reader、Moon+ Reader 和 Readest 需要在阅读器应用内部设置。请在 Acorny Settings 中创建导入 API 令牌，并把指南中的 URL 和令牌粘贴到该应用的 Readwise 集成设置。这些阅读器应用不会在 Acorny 中显示为已连接的提供方卡片。

## 高亮进入 Acorny 之后

打开你的库，确认来源和高亮文字符合预期。如果导入或连接没有完成，请查看[导入与同步故障排查](/zh/import-sync/troubleshooting/)。内容就绪后，可以继续了解[复习会话的工作方式](/zh/review-recall/how-review-works/)。
