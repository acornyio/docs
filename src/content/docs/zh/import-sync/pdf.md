---
title: 从 PDF 导入
description: 导入从 PDF 文件中提取的高亮。
---

当你的高亮作为批注存储在 PDF 文件中时，请使用 PDF 导入。

## 导入到 Acorny

1. 打开 Acorny，然后进入 Import。
2. 选择 Upload File。
3. 上传一个 `.pdf` 文件，或将 Source type 设为 Auto-detect 然后把 PDF 拖到上传区域。
4. 查看预览。
5. 选择 Confirm import。

Acorny 会在浏览器中解析 PDF，并将检测到的高亮转换为 Acorny 的导入格式，然后再发送到服务器。

## Acorny 会导入哪些内容

Acorny 会导入可从 PDF 中提取的文本高亮。在可用时，它会使用 PDF 元数据（如标题、作者和指纹）来创建稳定的来源标识。

当 PDF 以受支持的批注形式暴露评论或批注笔记时，它们可能会被导入。

## 限制

- 受密码保护的 PDF 必须在导入前解锁。
- 不含文本的扫描版 PDF 可能无法生成高亮。
- 某些 PDF 应用会以非标准方式存储批注。如果 Acorny 报告未找到高亮，请先尝试从该 PDF 应用导出或扁平化批注。
- 大型 PDF 在浏览器中解析可能需要更长时间。
