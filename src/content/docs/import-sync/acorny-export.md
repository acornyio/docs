---
title: Import an Acorny export
description: Restore highlights from an Acorny JSON or CSV export file.
---

Use Acorny export import when you already have a file exported from Acorny and want to restore it or move it into another Acorny account.

## Supported files

Acorny accepts its own exported JSON and CSV files in the import screen.

Use JSON when you want the most complete structured data. Use CSV when you need a spreadsheet-compatible file or when you edited rows manually before re-importing.

## Import flow

1. Open Acorny, then go to Import.
2. Choose Upload File.
3. Set Source type to Acorny Exported File, or leave Source type as Auto-detect.
4. Upload the JSON or CSV export file.
5. Review the preview.
6. Choose Confirm import.

## Duplicate handling

If an exported highlight already exists in your library, Acorny skips the duplicate instead of creating another copy. This makes it safe to retry an import after a network error or partial migration.

## When to use provider-specific import instead

If the file came directly from another service, choose that provider first so Acorny can apply the supported schema and preserve source-specific metadata.
