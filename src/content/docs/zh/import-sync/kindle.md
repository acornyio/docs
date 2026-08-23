---
title: 从 Kindle 导入
description: 通过 Chrome 扩展同步 Kindle Notebook 高亮，或导入 My Clippings.txt。
---

Acorny 支持通过两种方式导入 Kindle 高亮：

- **使用 Chrome 扩展同步 Kindle Notebook**，适合保存在 Amazon 账户中的高亮和笔记。
- **导入 `My Clippings.txt`**，适合迁移保存在 Kindle 设备中的阅读记录。

如果高亮已显示在 Kindle Notebook 中，扩展同步是最快的方式；对于较早的记录或仅保存在设备上的剪贴，仍可使用文件导入。

## 使用 Chrome 扩展同步 Kindle Notebook

### 执行同步

1. 安装 Acorny Chrome 扩展，并登录 Acorny 账户。
2. 在同一浏览器中打开 [Kindle Notebook](https://read.amazon.com/notebook)，并登录 Amazon。
3. 保持 Kindle Notebook 为当前页面，然后打开 Acorny 扩展 popup。
4. 点击 **Sync Kindle Highlights**。
5. 首次使用时，批准访问 Kindle Notebook 和 Amazon 登录页。
6. 如果页面要求重新登录，请保持该 Amazon 标签页打开；同步结束后，在扩展 popup 中查看结果。

### 扩展会导入哪些内容

扩展会导入书名、作者、高亮、笔记和 Kindle 位置标签。只有当你点击同步按钮时才会开始同步，并且会使用浏览器中已有的 Amazon 登录会话。Acorny 不会读取或收集你的 Amazon 密码、Cookie 或其他登录凭据，也不会将它们发送到 Acorny 服务器。

## 导入 My Clippings.txt

Kindle 设备会为保存在设备上的高亮、笔记和书签生成 `My Clippings.txt`。如果你要迁移设备中的阅读记录，或者这些高亮从未进入 Kindle Notebook、Readwise 或其他同步服务，请导入该文件。

### 获取 My Clippings.txt

1. 将 Kindle 设备连接到电脑。
2. 打开 Kindle 的 documents 文件夹。
3. 找到 `My Clippings.txt`。
4. 在上传之前，先把该文件复制到电脑上。

### 导入到 Acorny

1. 打开 Acorny，然后进入 Import。
2. 选择 Upload File。
3. 将 Source type 设为 Kindle My Clippings.txt，或将 Source type 保持为 Auto-detect。
4. 上传 `My Clippings.txt`。
5. 查看预览。
6. 选择 Confirm import。

### Acorny 会导入哪些内容

Acorny 会读取以 `==========` 分隔的 Kindle 剪贴块。当文件包含相应字段时，它会导入高亮文本、来源标题、作者、位置标签，以及原始的添加日期。

当剪贴文件包含足够的位置信息时，Kindle 笔记可以与附近的高亮配对。仅含书签的记录不包含可复习的引文文本，因此不适合作为高亮。

### 会保留哪些内容

Kindle 导入可以保留：

- 高亮文本
- 书名
- 作者
- Kindle 位置或页码标签
- 添加日期
- 笔记（当它们可以与附近的高亮匹配时）

这些数据有助于你搜索已导入的高亮，并为复习提供足够的上下文来生成复习卡。

### 不会保留哪些内容

`My Clippings.txt` 并不包含 Kindle 账户中的所有内容。它通常不包含封面图片、完整的电子书文件、阅读进度、Kindle 收藏，或云端图书馆元数据。

如果同一条高亮存在于多个剪贴文件中，Acorny 会根据可用的来源和位置数据来尽量避免重复。

### 大文件

长期使用 Kindle 的用户可能有一个非常大的 `My Clippings.txt`。导入整个文件没有问题，但你应该在首次预览时检查质量。

在预览中找一本较新的书和一本较早的书。如果两者看起来都正确，说明文件格式很可能被正确读取了。

### 如果文件无法导入

请确保该文件是来自 Kindle 设备的纯文本 `My Clippings.txt` 文件。如果你手动编辑过该文件，请保持原始的剪贴分隔符和元数据行完好无损。

如果文件包含混合语言，在将其复制到电脑时，请保持原始的 UTF-8 或 Kindle 文本编码。避免在文字处理软件中打开并重新保存它。

## 相关页面

- [从 CSV 导入](/zh/import-sync/csv/)
- [排查导入与同步问题](/zh/import-sync/troubleshooting/)
- [复习会话如何运作](/zh/review-recall/how-review-works/)
