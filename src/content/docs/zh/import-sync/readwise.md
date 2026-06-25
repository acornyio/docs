---
title: 从 Readwise 导入
description: 将你现有的 Readwise 高亮移入 Acorny。
---

当你希望迁移已保存在 Readwise 中的高亮，或当其他应用能把高亮发送到兼容 Readwise 的端点时，请使用 Readwise 导入。

对大多数人来说，最稳妥的迁移路径是：先从 Readwise CSV 导出开始，导入一个小样本，确认预览看起来正确，然后再导入完整文件。

## 导入选项

Acorny 通过文件导入和兼容的导入端点支持 Readwise 风格的数据。

对大多数用户，请从以下路径之一开始：

- Readwise API：使用 Import from API，并粘贴来自 https://readwise.io/access_token 的 Readwise API 令牌。
- Readwise CSV：从 Readwise 导出一个 CSV 文件，然后在 Acorny 中上传它。
- 兼容 Readwise 的客户端：在 Settings 中生成一个 Acorny 导入 API 令牌，并将客户端指向 Acorny 的 `/api/v2/highlights/` 端点。

Moon+ Reader 使用兼容 Readwise 的路径，但它的设置细节在 Moon+ Reader 页面中说明。

![Readwise 导出页面，带有 CSV 导出按钮](/images/import-sync/readwise/readwise-csv.png)

如果你使用 API 路径，请从 Readwise 访问令牌页面复制令牌，并仅在导入界面要求时才将其粘贴到 Acorny 中。

![Readwise 访问令牌页面，带有令牌字段](/images/import-sync/readwise/readwise-token.png)

## 会保留哪些内容

Readwise 导入旨在保留让一条高亮在 Acorny 中有用的数据：

- 高亮文本
- 来源标题
- 来源 URL（如有提供）
- 作者（如有提供）
- 笔记（如有提供）
- 标签（如有提供）
- 高亮或创建日期（如有提供）
- Readwise 高亮标识（如有提供）

该标识有助于在 Acorny 中识别重复项，便于在你再次导入同一个库时去重。

## 不会保留哪些内容

Acorny 不会尝试重建每一个 Readwise 账户设置。例如，它不会导入 Readwise 的邮件设置、每日复习偏好、在 Readwise 内配置的集成，或 Readwise 专属的 UI 状态。

某些导出也会省略提供方专属字段。如果某个字段不在 CSV 或 API 负载中，Acorny 无法在事后推断它。

## 大批量迁移

如果你有数千条高亮，请先导入一个较小的导出。在预览中检查以下项目：

1. 来源标题看起来正确。
2. 高亮文本可读。
3. 笔记和标签出现在预期位置。
4. 导入数量接近你的预期。
5. 重复处理没有创建重复记录。

在小批量导入成功后，再运行完整迁移。大批量迁移可能会让复习显得繁忙，但你的高亮不需要一次性全部变成复习卡。

## 导入之后

导入的高亮会出现在你的高亮页面中，并可进入复习会话。如果导入的高亮已存在，Acorny 会保留现有记录，而不是创建重复项。

确认导入后，请打开高亮页面。用导出中的某个书名或文章标题进行搜索。稍后打开复习，练习由导入高亮生成的复习卡。

## 故障排查

如果上传失败，请确认该文件是 Readwise CSV 导出，而不是以其他格式保存的电子表格。如果预览看起来是空的，请在本地打开该 CSV 并检查它是否包含高亮文本。

如果 API 导入失败，请创建一个新的 Readwise API 令牌，并只粘贴来自 `https://readwise.io/access_token` 的令牌值。不要把你的 Readwise 密码粘贴到 API 令牌字段中。

## 相关页面

- [概览：导入与同步](/zh/import-sync/overview/)
- [从 CSV 导入](/zh/import-sync/csv/)
- [间隔重复如何运作](/zh/review-recall/how-spaced-repetition-works/)
