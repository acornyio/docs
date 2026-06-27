---
title: 从 Readest 同步
description: 自动把 Readest 的高亮和笔记同步到 Acorny。
---

当你在 Readest 中阅读电子书，并希望高亮和笔记自动出现在 Acorny 中时，请使用 Readest 同步。

Readest 同步是在 Readest 内部设置的。在 Acorny 中，你只需要创建导入 API 令牌，并把它粘贴到 Readest 的 Readwise 集成设置里。

## 设置

1. 打开 Acorny。
2. 进入 **Settings**。
3. 找到 **Import API tokens**。
4. 创建一个名为 `Readest` 的令牌。
5. 立即复制该令牌。它只会显示一次。
6. 打开 Readest。
7. 进入 **Settings** → **Integrations** → **Readwise**。
8. 将 Acorny 令牌粘贴到 Readwise token 字段中。
9. 展开 **Advanced**。
10. 将 **Custom URL** 设为 `https://acorny.io/api/v2/`。
11. 保存设置。

设置完成后，Readest 会自动与 Acorny 同步：

- 当你打开一本书时，该书已有的高亮和笔记会同步到 Acorny。
- 当你创建新高亮或笔记时，Readest 会在其创建时把它发送到 Acorny。

## 会同步哪些内容

- 在 Readest 中打开一本书后，该书已有的高亮
- 在 Readest 中打开一本书后，该书已有的笔记
- 阅读时创建的新高亮
- 阅读时创建的新笔记

## 令牌安全

导入 API 令牌可以在你的 Acorny 账户中创建高亮。请像密码一样保管它们。如果令牌泄露，请在 Settings 中撤销它并创建一个新令牌。

## 故障排查

如果高亮没有出现在 Acorny 中，请检查以下内容：

- 确认 Custom URL 完全是 `https://acorny.io/api/v2/`。
- 确认 Readwise token 字段中填入的是 Acorny 导入 API 令牌，而不是你的 Acorny 登录密码。
- 在 Readest 中重新打开该书，以触发已有高亮和笔记的同步。
- 如果身份验证失败，请创建一个新的导入 API 令牌并重新配置 Readest。
