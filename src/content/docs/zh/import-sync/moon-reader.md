---
title: 从 Moon+ Reader 导入
description: 导入 Moon+ Reader 导出文件，或配置 Moon+ Reader 把新高亮同步到 Acorny。
---

你可以通过两种不同的方式将 Moon+ Reader 与 Acorny 配合使用：

- 一次性导入：把现有的 Moon+ Reader 导出文件上传到 Acorny。
- Readwise 同步：配置 Moon+ Reader 的 Readwise sync settings，将新高亮发送到 Acorny。

Moon+ Reader 同步是在 Moon+ Reader 内部设置的。在 Acorny 中，你只需要创建导入 API 令牌，并复制 Moon+ Reader 需要使用的 Readwise URL。

## 何时选择导入或同步

对于现有书库，请使用文件导入。如果你继续在 Moon+ Reader 中阅读并希望新高亮自动到达，之后请使用 Readwise 同步。

除非你在检查重复项如何处理，否则不要对同一小批测试高亮重复使用两种路径。Acorny 会使用可用信息来避免重复，但更干净的导入更容易检查。

## 一次性导入

当你已经拥有 Moon+ Reader 高亮并希望把它们迁移到 Acorny 时，请使用一次性导入。

### 从 Moon+ Reader 导出

支持的输入：

- 针对单本书 Moon+ Reader 文本导出的 TXT 粘贴
- `.mrexpt` 导出文件
- `.mrstd` 备份归档
- `.mrpro` 备份归档

对于单本书的 TXT 导出，请打开 Moon+ Reader 的书签视图，并使用分享菜单导出笔记和高亮。

![Moon+ Reader 分享菜单，带有笔记和高亮的导出选项](/images/import-sync/moon-reader/export_moon_reader.jpg)

### 导入到 Acorny

1. 打开 Acorny，然后进入 Import。
2. 选择 Upload File。
3. 将 Source type 设为 Moon+ Reader。
4. 选择匹配的 Moon+ Reader 输入模式：
   - 粘贴 TXT
   - 上传 `.mrexpt`
   - 上传备份（`.mrstd`、`.mrpro`）
5. 预览导入。
6. 选择 Confirm import。

### 会保留哪些内容

Moon+ Reader 导入可以保留：

- 高亮文本
- 书名
- 作者（如有）
- 章节或阅读位置（如有）
- 附属于高亮的笔记
- Acorny 可用于识别重复项的备份信息
- 创建日期（当导出提供时）

对于 `.mrexpt` 和备份导入，Acorny 可以使用章节、位置和备份信息等细节，尽量避免 TXT、`.mrexpt` 和备份导入之间产生重复。

如果某条 Moon+ Reader 高亮已在 Acorny 中但笔记为空，当 Acorny 能安全匹配这条高亮时，后续的 Moon+ Reader 导入可以补上缺失的笔记。

### 不会保留哪些内容

Moon+ Reader 导入不会转移完整的电子书文件、应用主题、阅读进度、书架文件夹，或每一个 Moon+ Reader 设置。备份文件可能比 TXT 导出包含更多细节，因此当你希望导入内容更完整时，请使用 `.mrexpt`、`.mrstd` 或 `.mrpro`。

## 从 Moon+ Reader 进行 Readwise 同步

当你继续在 Moon+ Reader 中阅读，并希望未来的高亮无需每次手动上传文件就能出现在 Acorny 中时，请使用这个同步选项。

### 配置同步

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

Moon+ Reader 会通过它的 Readwise 同步功能把高亮发送到 Acorny。Acorny 令牌用于授权向你的账户添加新高亮。

在 Moon+ Reader 中，从书签界面开始，打开设置按钮。

![Moon+ Reader 书签界面，设置按钮已高亮](/images/import-sync/moon-reader/sync_step1.jpg)

启用自动把新高亮和笔记分享到 Readwise 的选项，然后打开其设置。

![Moon+ Reader 书签设置，Readwise 分享已启用](/images/import-sync/moon-reader/sync_step2.jpg)

将 Acorny 令牌和 Readwise URL 粘贴到 Readwise 设置对话框中。

![Moon+ Reader 的 Readwise 同步设置，带有 Acorny 令牌和 URL 字段](/images/import-sync/moon-reader/sync_step3.jpg)

### 令牌安全

导入 API 令牌可以在你的 Acorny 账户中创建高亮。请像密码一样保管它们。如果令牌泄露，请在 Settings 中撤销它并创建一个新令牌。

### 同步故障排查

如果 Moon+ Reader 报告身份验证失败，请创建一个新的 Import API token，并确保 Token 字段中填入的是 Acorny 令牌，而不是你的 Acorny 登录密码。

如果 Moon+ Reader 无法连接，请确认 Readwise URL 包含 `/api/v2/highlights/`，并且开头与你在浏览器中使用的 Acorny 网站地址一致。

## 相关页面

- [从 Readwise 导入](/zh/import-sync/readwise/)
- [概览：导入与同步](/zh/import-sync/overview/)
- [联系支持](/zh/account-data/contact-support/)
