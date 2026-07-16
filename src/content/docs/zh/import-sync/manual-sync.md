---
title: 运行手动同步
description: 在 Acorny 中手动运行或重试已连接的 Instapaper 或 Inoreader 同步。
---

手动同步只适用于 Instapaper 和 Inoreader 的已连接提供方卡片。它不会触发一次性文件导入，也不会触发 Koodo Reader、Moon+ Reader 或 Readest 这类阅读器应用令牌流程。

## 运行同步

1. 打开 **Extensions & Apps**。
2. 找到已连接的 Instapaper 或 Inoreader 卡片。
3. 选择 **Sync now**。如果卡片已经处于错误状态，请选择 **Retry sync**。
4. 保持页面打开，直到操作完成并显示结果或错误。

## 查看结果

| 结果 | 含义 |
| --- | --- |
| Imported | 新增到 Acorny 库的高亮 |
| Backfilled | 为匹配的现有高亮补上笔记；当前与 Inoreader 有关 |
| Skipped | Acorny 没有重复添加的内容，例如库中已有的高亮 |
| Restored | 本次同步结果恢复的已知高亮 |
| Failed | 本次同步无法处理的条目 |

当提供方没有新高亮时，Imported 为零也可能是正常结果。请先检查其他数量和上次同步时间，再判断它是否是错误。

## 手动同步失败时

先使用一次 **Retry sync**。如果卡片报告连接错误，请选择 **Reconnect** 并重新完成提供方的连接流程。如果同一错误再次出现，请查看[导入与同步故障排查](/zh/import-sync/troubleshooting/)。

如果不确定你的来源使用连接卡片、文件导入还是阅读器应用同步，请返回[导入与同步概览](/zh/import-sync/overview/)。
