---
title: 从 Diigo 导入
description: 从 CSV 或受支持的 API 输入导入 Diigo 高亮。
---

当你希望把网页批注从 Diigo 移到 Acorny 时，请使用 Diigo 导入。

Diigo 可以将网页批注导出为 CSV。某些 Acorny 环境可能也会显示 Diigo API 导入字段。如果你不确定该使用哪条路径，请从 CSV 开始，因为它在上传前更容易检查。

## CSV 导入

将你的 Diigo 批注导出为 CSV，然后在 Import Highlights 中上传该 CSV 文件。

### 从 Diigo 导出

在 Diigo 中把批注导出为 CSV，并把文件保存在你能再次找到的位置。Acorny 只读取你上传的文件，因此除了导出本身之外，Diigo 中不需要额外配置。

### 上传到 Acorny

1. 打开 Acorny，然后进入 Import。
2. 选择 Upload File。
3. 将 Source type 设为 Diigo CSV。
4. 上传该 CSV 文件。
5. 查看预览。
6. 选择 Confirm import。

单行 Diigo 数据可能包含多个被高亮的段落，因此 Acorny 可能会从一行创建多条高亮。

## API 导入

如果你的 Acorny 账户在导入界面中显示了 Diigo API 字段：

1. 在 https://www.diigo.com/api_keys 申请或打开你的 Diigo API key。
2. 打开 Acorny，然后进入 Import。
3. 选择 Import from API。
4. 选择 Diigo API。
5. 输入你的 Diigo API key、用户名和密码。
6. 预览导入。
7. 选择 Confirm import。

Acorny 仅将那些凭据用于本次导入请求。如果你的环境中没有 Diigo API 字段，请使用 CSV 导入。

## 会保留哪些内容

两条 Diigo 路径都可以保留：

- 高亮文本
- 来源标题
- 来源 URL
- 标签（如有）
- 笔记或 sticky notes（当导出提供足够结构时）
- 创建日期（如有）
- Diigo 提供的、可用于避免重复的信息

当你希望 Diigo 的网页批注变成 Acorny 中可搜索的高亮和复习候选时，这很有用。

## 不会保留哪些内容

Diigo 导入不会重建你的完整 Diigo 账户、群组、浏览器扩展设置，或每一个仅书签的条目。Acorny 关注包含高亮文本或可附属于高亮的笔记的记录。

## Sticky notes

当导出包含足够的结构供 Acorny 匹配时，Diigo 笔记可以附属于附近的高亮。

如果某个 sticky note 出现时没有匹配的高亮，请在确认前检查预览。源文件可能没有足够的上下文来安全地附上该笔记。

## 故障排查

### 如果 CSV 预览数量低于预期

CSV 可能包含没有高亮文本的书签。Acorny 可能会跳过这些，因为它们不会生成有用的复习卡。

### 如果 API 导入失败

请在 `https://www.diigo.com/api_keys` 核实 Diigo API key，并确认用户名属于拥有这些批注的账户。

## 相关页面

- [从 Cubox 导入](/zh/import-sync/cubox/)
- [从 CSV 导入](/zh/import-sync/csv/)
- [联系支持](/zh/account-data/contact-support/)
