---
title: 从微信读书导入
description: 使用 Acorny 浏览器扩展从微信读书导出高亮，然后导入该 JSON 文件。
---

当你的高亮存储在微信读书中、且希望把它们移入 Acorny 时，请使用微信读书导入。

微信读书导入是一个两步流程：Acorny 浏览器扩展从微信读书导出一个本地 JSON 文件，然后 Acorny 网页应用导入该 JSON 文件。

## 开始之前

- 安装并登录 Acorny 浏览器扩展。
- 在同一浏览器中登录 `weread.qq.com` 上的微信读书。
- 妥善保管生成的 `weread-export.json` 文件。它包含你导出的阅读数据。

## 从微信读书导出

1. 打开 Acorny 浏览器扩展的选项页面。
2. 找到 WeRead Export 部分。
3. 选择 Open WeRead Export。
4. 如果浏览器请求访问 `weread.qq.com`，请授予该权限。
5. 如果导出页面提示你未登录微信读书，请打开微信读书登录、登录后再重试。
6. 选择 Start Export。
7. 导出完成后，下载 `weread-export.json`。

导出器在你的浏览器中运行。Acorny 不会存储你的微信读书凭据。

## 导入到 Acorny

1. 打开 Acorny，然后进入 Import。
2. 选择 Upload File。
3. 将 Source type 设为 WeRead。
4. 上传 `weread-export.json`。
5. 查看预览中的数量和样例记录。
6. 选择 Confirm import。

导入的微信读书高亮会出现在你的高亮页面中，并可进入复习会话。

## 笔记与想法

微信读书分别存储高亮和想法。Acorny 导出器会在上传前把它们转换为 Acorny 稳定的 WeRead JSON 格式，因此在数据可用时，Acorny 能保留引用文本、笔记、书名、作者、章节和来源标识符。

## 故障排查

如果导入结果看起来不对，请保留 Acorny 导入页面上显示的调试追踪 ID。然后返回微信读书导出页面并下载 WeRead Debug Bundle。在反馈问题时，请同时提供追踪 ID 和调试包。

如果微信读书更改了其网页数据结构，导出可能会失败或产生的记录少于预期。请在确认你的微信读书网页会话仍然有效后重试。
