---
title: 从 Moon+ Reader 导入
description: 导入 Moon+ Reader 导出文件，或配置 Moon+ Reader 把新高亮推送到 Acorny。
---

你可以通过两种不同的方式将 Moon+ Reader 与 Acorny 配合使用：

- 一次性导入：把现有的 Moon+ Reader 导出文件上传到 Acorny。
- 兼容 Readwise 的同步：配置 Moon+ Reader 的 Readwise sync settings，将新高亮发送到 Acorny。

Moon+ Reader 不会作为 Extensions & Apps 连接卡片出现，因为 Acorny 不会从 Moon+ Reader 拉取数据。Moon+ Reader 会通过 Acorny 兼容 Readwise 的端点把高亮推送到 Acorny。

## 一次性导入

当你已经拥有 Moon+ Reader 高亮并希望把它们迁移到 Acorny 时，请使用一次性导入。

支持的输入：

- 针对单本书 Moon+ Reader 文本导出的 TXT 粘贴
- `.mrexpt` 导出文件
- `.mrstd` 备份归档
- `.mrpro` 备份归档

对于单本书的 TXT 导出，请打开 Moon+ Reader 的书签视图，并使用分享菜单导出笔记和高亮。

![Moon+ Reader 分享菜单，带有笔记和高亮的导出选项](/images/import-sync/moon-reader/export_moon_reader.jpg)

导入流程：

1. 打开 Acorny，然后进入 Import。
2. 选择 Upload File。
3. 将 Source type 设为 Moon+ Reader。
4. 选择匹配的 Moon+ Reader 输入模式：
   - 粘贴 TXT
   - 上传 `.mrexpt`
   - 上传备份（`.mrstd`、`.mrpro`）
5. 预览导入。
6. 选择 Confirm import。

## 会保留哪些内容

Moon+ Reader 导入可以保留：

- 高亮文本
- 书名
- 作者（如有）
- 章节或位置元数据（如有）
- 附属于高亮的笔记
- 来源文件路径或备份导入的记录标识
- 创建日期（当导出提供时）

对于 `.mrexpt` 和备份导入，Acorny 会在可用时使用 Moon+ Reader 的元数据，例如章节、位置、来源文件路径和记录标识。这有助于 Acorny 在 TXT、`.mrexpt` 和备份导入之间避免重复。

如果某条已存在的 Moon+ Reader 高亮已在 Acorny 中但笔记为空，当记录可以安全匹配时，后续的 Moon+ Reader 导入可以回填缺失的笔记。

## 不会保留哪些内容

Moon+ Reader 导入不会转移完整的电子书文件、应用主题、阅读进度、书架文件夹，或每一个 Moon+ Reader 设置。备份文件可能比 TXT 导出包含更多结构，因此当你希望获得更好的元数据时，请使用 `.mrexpt`、`.mrstd` 或 `.mrpro`。

## 从 Moon+ Reader 进行兼容 Readwise 的同步

当你继续在 Moon+ Reader 中阅读，并希望未来的高亮无需每次手动上传文件就能出现在 Acorny 中时，请使用推送同步。

1. 打开 Acorny。
2. 进入 Settings。
3. 找到 Import API tokens。
4. 创建一个名为 `Moon+ Reader` 的令牌。
5. 立即复制该令牌。它只会显示一次。
6. 复制同一 Settings 部分中显示的 Moon+ Reader Readwise URL。它以 `/api/v2/highlights/` 结尾。
7. 打开 Moon+ Reader。
8. 打开 Moon+ Reader 的 Readwise sync settings。
9. 将 Acorny URL 粘贴到 Readwise URL 字段中。
10. 将 Acorny 令牌粘贴到 Token 字段中。
11. 触发 Moon+ Reader 的 Readwise 同步。

Moon+ Reader 使用兼容 Readwise 的 API 把高亮发送到 Acorny。该令牌授权向你的 Acorny 账户写入数据。

在 Moon+ Reader 中，从书签界面开始，打开设置按钮。

![Moon+ Reader 书签界面，设置按钮已高亮](/images/import-sync/moon-reader/sync_step1.jpg)

启用自动把新高亮和笔记分享到 Readwise 的选项，然后打开其设置。

![Moon+ Reader 书签设置，Readwise 分享已启用](/images/import-sync/moon-reader/sync_step2.jpg)

将 Acorny 令牌和端点 URL 粘贴到 Readwise 设置对话框中。

![Moon+ Reader 的 Readwise 同步设置，带有 Acorny 端点字段](/images/import-sync/moon-reader/sync_step3.jpg)

## 何时选择导入或同步

对于现有书库，请使用文件导入。如果你继续在 Moon+ Reader 中阅读并希望新高亮自动到达，之后请使用兼容 Readwise 的同步。

除非你在检查重复行为，否则不要对同一小批测试高亮重复使用两种路径。Acorny 会使用可用元数据来避免重复，但更干净的导入更容易检查。

## 令牌安全

导入 API 令牌可以在你的 Acorny 账户中创建高亮。请像密码一样保管它们。如果令牌泄露，请在 Settings 中撤销它并创建一个新令牌。

## 推送同步故障排查

如果 Moon+ Reader 报告身份验证失败，请创建一个新的 Import API token，并确保 Token 字段中填入的是 Acorny 令牌，而不是你的 Acorny 登录密码。

如果 Moon+ Reader 无法连接，请确认 Readwise URL 包含 `/api/v2/highlights/`，并且使用的是你在浏览器中使用的同一个 Acorny 主机。

## 相关页面

- [从 Readwise 导入](/zh/import-sync/readwise/)
- [概览：导入与同步](/zh/import-sync/overview/)
- [联系支持](/zh/account-data/contact-support/)
