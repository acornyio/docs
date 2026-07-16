---
title: 从 Inoreader 同步
description: 通过 OAuth 授权 Inoreader，并把带批注的高亮同步到 Acorny。
---

Inoreader 同步只适用于包含批注的条目，并不是把账号中的所有未读或加星条目全部导入。

## 连接 Inoreader

1. 在 Acorny 中打开 **Extensions & Apps**。
2. 找到 Inoreader 并选择 **Connect**。
3. Acorny 会在同一个浏览器窗口中打开 Inoreader 的 OAuth 授权流程。
4. 在 Inoreader 中批准访问并返回 Acorny。连接成功后会开始第一次同步。

## 同步会导入什么

Acorny 会导入 Inoreader 中带批注的高亮。首次连接还可以执行一次性笔记回填：如果相同高亮已经在你的库中，但笔记为空，Acorny 可以补上笔记。它不会导入所有未读、加星或账号级别条目。

## 查看并重新运行结果

已连接卡片会在可用时显示上次成功同步时间。选择 **Sync now** 可以请求再次同步。结果可能包含 Imported、Backfilled、Skipped、Restored 和 Failed；[运行手动同步](/zh/import-sync/manual-sync/)解释了各个数量的含义。

## 批注没有出现时

- 确认来源条目在 Inoreader 中确实包含批注。
- 检查 Inoreader 卡片是否仍然显示已连接账号。
- 选择 **Sync now**；如果卡片处于错误状态，请使用 **Retry sync**。
- 如果 Acorny 报告连接错误，请重新完成 OAuth 连接。
- 如果同一条目仍然缺失，请使用[导入与同步故障排查](/zh/import-sync/troubleshooting/)。

返回[导入与同步概览](/zh/import-sync/overview/)可以比较这个连接流程与一次性导入。内容出现后，可以继续了解[复习会话的工作方式](/zh/review-recall/how-review-works/)。
