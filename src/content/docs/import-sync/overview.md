---
title: 'Overview: import vs sync'
description: Understand the difference between one-time imports and connected sync in Acorny.
---

Acorny supports two ways to bring highlights from other tools into your library.

## Import

Use import when you have an export file, a local document, or credentials that Acorny uses only for a one-time pull.

File and local import sources:

- WeRead JSON exported by the Acorny browser extension
- Readwise CSV export
- Moon+ Reader TXT, `.mrexpt`, `.mrstd`, or `.mrpro`
- Cubox JSON export
- Diigo CSV export
- Kindle `My Clippings.txt`
- PDF files with extractable annotations
- Acorny exported JSON or CSV
- Generic CSV files

One-time API import sources:

- Readwise API
- Diigo API

Imports are best for migrations, restores, and one-time transfers.

## Sync

Use sync when a connected service keeps sending new highlights after initial setup.

Current sync providers:

- Instapaper
- Inoreader

Push sync via Import API token:

- Koodo Reader
- Moon+ Reader
- Readest

Koodo Reader, Moon+ Reader, and Readest can keep sending new highlights to Acorny through the Readwise-compatible endpoint. They are configured with an Acorny Import API token in Settings. They do not appear as Extensions & Apps connection cards because Acorny does not pull from these apps; the apps push highlights into Acorny.

## Choosing the right path

If you have a file, use Upload File. If you have Readwise or Diigo credentials for a one-time pull, use Import from API. If Acorny shows a connected service card for your source, use Extensions & Apps. If your app can send highlights to a Readwise-compatible URL, use an Import API token.
