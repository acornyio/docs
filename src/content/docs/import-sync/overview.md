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

Use sync when a service keeps sending new highlights after initial setup.

Current sync providers:

- Instapaper
- Inoreader

Reader app sync with an Import API token:

- Koodo Reader
- Moon+ Reader
- Readest

Koodo Reader, Moon+ Reader, and Readest are set up inside the reader app. In Acorny, you create an Import API token in Settings and paste it into the reader's Readwise integration settings. These apps do not appear as Extensions & Apps cards because the connection is started from the reader app.

## Choosing the right path

If you have a file, use Upload File. If you have Readwise or Diigo credentials for a one-time pull, use Import from API. If Acorny shows a connection card for your source, use Extensions & Apps. If your reader app has Readwise sync settings, open that app's guide and create an Import API token in Acorny Settings.
