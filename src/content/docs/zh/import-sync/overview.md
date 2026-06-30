---
title: '概览：导入与同步'
description: 了解 Acorny 中一次性导入与连接式同步之间的区别。
---

Acorny 支持两种方式将来自其他工具的高亮带入你的库。

## 导入

当你拥有导出文件、本地文档，或仅供 Acorny 做一次性拉取的凭据时，请使用导入。

文件与本地导入来源：

- 由 Acorny 浏览器扩展导出的 WeRead JSON
- Readwise CSV 导出
- Moon+ Reader 的 TXT、`.mrexpt`、`.mrstd` 或 `.mrpro`
- Cubox JSON 导出
- Diigo CSV 导出
- Kindle `My Clippings.txt`
- 带有可提取批注的 PDF 文件
- Acorny 导出的 JSON 或 CSV
- 通用 CSV 文件

一次性 API 导入来源：

- Readwise API
- Diigo API

导入最适合迁移、恢复和一次性转移。

## 同步

当某个服务会在初次设置后持续发送新高亮时，请使用同步。

当前同步提供方：

- Instapaper
- Inoreader

使用导入 API 令牌的阅读器应用同步：

- Koodo Reader
- Moon+ Reader
- Readest

Koodo Reader、Moon+ Reader 和 Readest 需要在阅读器应用内部设置。你只需要在 Acorny 的 Settings 中创建导入 API 令牌，再把它粘贴到阅读器的 Readwise 集成设置里。这些应用不会出现在 Extensions & Apps 卡片中，因为连接是从阅读器应用发起的。

## 选择正确的路径

如果你有文件，请使用 Upload File。如果你拥有用于一次性拉取的 Readwise 或 Diigo 凭据，请使用 Import from API。如果 Acorny 为你的来源显示了连接卡片，请使用 Extensions & Apps。如果你的阅读器应用里有 Readwise 同步设置，请打开对应应用的指南，并在 Acorny Settings 中创建导入 API 令牌。
