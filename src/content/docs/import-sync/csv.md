---
title: Import from CSV
description: Import a currently supported Acorny, Readwise, or Diigo CSV export.
---

Use this page when the file you have is a CSV. Acorny currently recognizes provider-specific CSV shapes; it does not provide arbitrary column mapping for an unrelated spreadsheet.

## Supported CSV files

| CSV source | How Acorny recognizes it | Better source-specific guide |
| --- | --- | --- |
| Acorny export CSV | The export starts with the Acorny CSV format marker | [Import an Acorny export](/import-sync/acorny-export/) |
| Readwise CSV | The standard Readwise export columns begin with Highlight, Book Title, and Book Author | [Import from Readwise](/import-sync/readwise/) |
| Diigo CSV | The standard Diigo export begins with its title, URL, tags, and annotation fields | [Import from Diigo](/import-sync/diigo/) |

If your spreadsheet uses different columns, do not assume Acorny will guess the mapping. Keep the original file and use the [Import vs sync overview](/import-sync/overview/) to find a supported source path.

## Import the file

1. Open Import in Acorny and choose the file upload flow.
2. Select the provider that matches the CSV source, then upload the original `.csv` file.
3. Read the preview before confirming. Check the detected format, source title, highlight text, and rows marked as already present or unable to import.
4. Confirm only after the preview matches the source you intended to move.

## If the CSV is rejected

Return to the source-specific guide and export a fresh file without editing its header. If preview or import still fails, use [Import and sync troubleshooting](/import-sync/troubleshooting/) and include the detected format or visible error when contacting support. Do not share the full file if it contains private reading data.
