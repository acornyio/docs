---
title: 从 CSV 导入
description: 导入 Acorny、Readwise 或 Diigo 的受支持 CSV 导出。
---

当你拿到的是 CSV 文件时，请使用本页。Acorny 当前识别的是特定提供方的 CSV 结构，不提供任意列映射，也不会自动猜测一份无关电子表格的字段。

## 支持的 CSV 文件

| CSV 来源 | Acorny 如何识别 | 更合适的来源专属指南 |
| --- | --- | --- |
| Acorny 导出 CSV | 导出文件以 Acorny CSV 格式标记开头 | [导入 Acorny 导出文件](/zh/import-sync/acorny-export/) |
| Readwise CSV | 标准导出列以 Highlight、Book Title、Book Author 开头 | [从 Readwise 导入](/zh/import-sync/readwise/) |
| Diigo CSV | 标准导出以 title、URL、tags 和批注字段开头 | [从 Diigo 导入](/zh/import-sync/diigo/) |

如果你的电子表格使用其他列，请不要假设 Acorny 会自动完成映射。请保留原始文件，并在[导入与同步概览](/zh/import-sync/overview/)中寻找当前受支持的来源路径。

## 导入文件

1. 在 Acorny 中打开 Import，并进入文件上传流程。
2. 选择与 CSV 来源匹配的提供方，然后上传原始 `.csv` 文件。
3. 确认前先阅读预览，检查识别到的格式、来源标题、高亮文字，以及标记为已存在或无法导入的记录。
4. 只有当预览与要迁移的来源一致时才确认导入。

## CSV 被拒绝时

返回来源专属指南，重新导出一份没有改动表头的文件。如果预览或导入仍失败，请使用[导入与同步故障排查](/zh/import-sync/troubleshooting/)，联系支持时说明识别到的格式或页面上的错误。若文件含有私人阅读数据，请不要直接分享完整文件。
