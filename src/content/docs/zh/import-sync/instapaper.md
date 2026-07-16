---
title: 从 Instapaper 同步
description: 通过 xAuth 连接 Instapaper，并把文章高亮同步到 Acorny。
---

当你希望完成首次设置后，新的 Instapaper 高亮还能持续进入 Acorny 时，请使用这个连接式同步。

## 连接前须知

连接表单会要求填写 Instapaper 用户名和密码。Acorny 会用这些凭据通过 Instapaper 的 xAuth API 请求 access token。请求成功后，Acorny 不会保存密码，只保留用于后续同步的加密 access token。

## 连接 Instapaper

1. 在 Acorny 中打开 **Extensions & Apps**。
2. 找到 Instapaper 卡片并选择 **Connect**。
3. 输入连接表单要求的 Instapaper 用户名和密码。
4. 等待卡片显示已连接账号。连接成功后会开始第一次高亮同步。

## 卡片会显示什么

已连接卡片会显示账号、可用时的上次成功同步时间，以及 **Sync now** 操作。手动同步完成后可能显示 Imported、Skipped、Restored 和 Failed 数量。如果 Acorny 已经保存了某条高亮，出现 Skipped 可能是正常结果。

具体操作和结果含义请查看[运行手动同步](/zh/import-sync/manual-sync/)。

## 连接或同步失败时

- 如果最初的 xAuth 请求失败，请重新检查 Instapaper 用户名和密码。
- 如果卡片仍然显示已连接，请选择 **Retry sync** 或 **Sync now**。
- 如果卡片报告连接错误，请先重新连接账号，再尝试同步。
- 如果同一错误再次出现，请使用[导入与同步故障排查](/zh/import-sync/troubleshooting/)。

预期高亮出现后，可以继续了解[复习会话的工作方式](/zh/review-recall/how-review-works/)。如需比较 Instapaper 与其他传输类型，请返回[导入与同步概览](/zh/import-sync/overview/)。
