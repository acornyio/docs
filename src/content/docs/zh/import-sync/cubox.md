---
title: 从 Cubox 导入
description: 从 Cubox JSON 导出导入 Cubox 高亮。
---

当你的高亮存储在 Cubox 中、且希望把它们移入 Acorny 时，请使用 Cubox 导入。

Cubox 不会直接上传到 Acorny。请先用 Cubox Exporter 导出一个 Cubox JSON 文件，然后在 Acorny 导入页面上传该 JSON 文件。

在使用 Cubox Exporter 之前，请启用 Cubox API 扩展并复制它提供的 API 值。

![Cubox 设置页面，API 扩展已启用](/images/import-sync/cubox/cubox-api.png)

## 从 Cubox 导出

1. 下载 Cubox Exporter：
   - [GitHub releases](https://github.com/momadacoding/cubox-exporter/releases)
   - [Gitee 镜像](https://gitee.com/acorny_0/cubox-exporter/releases)
2. 在你的电脑上打开 Cubox Exporter。
3. 按照导出器的说明登录，或提供它所需的 Cubox 访问信息。
4. 将你的 Cubox 数据导出为 JSON。
5. 妥善保管生成的 JSON 文件。它应包含文章及其嵌套的高亮。

不要上传随意的 Cubox 备份或浏览器下载文件。Acorny 期望的是 Cubox Exporter 生成的 JSON 结构：`source: "cubox"` 以及一个 `articles` 数组。

![用于把高亮导出为 JSON 的 Cubox Exporter 工具](/images/import-sync/cubox/cubox-exporter-tool.png)

## 导入到 Acorny

1. 打开 Acorny，然后进入 Import。
2. 选择 Upload File。
3. 将 Source type 设为 Cubox JSON。
4. 上传由 Cubox Exporter 生成的 JSON 文件。
5. 查看预览中的数量和样例记录。
6. 选择 Confirm import。

Acorny 会把每条非空的 Cubox 高亮作为一条高亮记录导入。当导出包含相应字段时，它会保留文章标题、来源 URL、文章标签、高亮笔记、Cubox 文章 ID、Cubox 高亮 ID、Cubox 高亮 URL、域名、颜色和创建时间。

## 会保留哪些内容

Cubox 导入可以保留：

- 高亮文本
- 文章标题
- 来源 URL
- 域名
- 文章标签
- 高亮笔记
- Cubox 文章 ID
- Cubox 高亮 ID
- Cubox 高亮 URL
- 高亮颜色
- 创建时间

这使得 Cubox 导入对那些把 Cubox 用作网页批注库、并希望这些段落能在 Acorny 中复习的读者很有用。

## 不会保留哪些内容

Acorny 不会导入 Cubox 账户设置、订阅状态、阅读进度，或每一个 Cubox 列表视图。它只导入 Cubox Exporter 写入 JSON 文件的高亮记录。

如果某篇 Cubox 文章没有高亮文本，它可能只是一个书签，而不是可复习的内容。

## 空高亮

如果 Cubox 导出包含空高亮，Acorny 会跳过该条目，以便你的库中只包含可复习的文本。

## 预览检查

在确认导入之前，请检查预览：

1. 确认文章标题可识别。
2. 确认高亮文本不为空。
3. 确认笔记和标签在你期望时出现。
4. 确认导入数量接近你导出的 Cubox 高亮数量。

## 如果导入失败

如果 Acorny 提示格式不受支持，请确认该文件来自 Cubox Exporter 且未被手动编辑。如果导出器无法在你的环境中运行，请使用上面的 Gitee 镜像链接，或在另一台电脑上重试。

如果 JSON 文件非常大，请先尝试导出一个较小的 Cubox 子集。一次成功的小批量导入，比一次包含数千条记录的全库导入更容易检查。

## 相关页面

- [从 Diigo 导入](/zh/import-sync/diigo/)
- [从 CSV 导入](/zh/import-sync/csv/)
- [排查导入与同步问题](/zh/import-sync/troubleshooting/)
