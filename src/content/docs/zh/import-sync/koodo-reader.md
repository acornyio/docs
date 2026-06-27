---
title: 从 Koodo Reader 同步
description: 自动把 Koodo Reader 的高亮和笔记同步到 Acorny。
---

当你在 Koodo Reader 中阅读电子书，并希望高亮和笔记自动出现在 Acorny 中时，请使用 Koodo Reader 同步。

Koodo Reader 同步是在 Koodo Reader 内部设置的。在 Acorny 中，你只需要创建导入 API 令牌，并复制 Koodo Reader 需要使用的 Readwise URL。

## 设置

1. 打开 Acorny。
2. 进入 **Settings**。
3. 找到 **Import API tokens**。
4. 创建一个名为 `Koodo Reader` 的令牌。
5. 立即复制该令牌。它只会显示一次。
6. 复制同一 Settings 部分中显示的 Acorny Readwise URL。它以 `/api/v2/highlights/` 结尾。
7. 从 <https://github.com/momadacoding/koodo-reader> 下载兼容 Acorny 的 Koodo Reader。
8. 打开 Koodo Reader。
9. 进入 **Settings** → **Data**。
10. 启用 Acorny 同步。
11. 将 Acorny Readwise URL 粘贴到 URL 字段中。
12. 将 Acorny 令牌粘贴到 Token 字段中。
13. 保存设置。

设置完成后，Koodo Reader 会自动把新高亮和笔记发送到 Acorny。

## 会同步哪些内容

- 你在阅读时创建的高亮
- 附属于高亮的笔记

## 令牌安全

导入 API 令牌可以在你的 Acorny 账户中创建高亮。请像密码一样保管它们。如果令牌泄露，请在 Settings 中撤销它并创建一个新令牌。

## 故障排查

如果高亮没有出现在 Acorny 中，请检查以下内容：

- 确认 Acorny Readwise URL 包含 `/api/v2/highlights/`，并且开头与你在浏览器中使用的 Acorny 网站地址一致。
- 确认 Token 字段中填入的是 Acorny 导入 API 令牌，而不是你的 Acorny 登录密码。
- 如果身份验证失败，请创建一个新的导入 API 令牌并重新配置 Koodo Reader。
