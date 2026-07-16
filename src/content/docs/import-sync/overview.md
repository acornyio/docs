---
title: 'Overview: import vs sync'
description: Compare every current Acorny import and sync path, then open the guide for your source.
---

Acorny has three current ways to bring highlights into your library: a one-time file or API import, a connected service that keeps syncing, or a reader app that sends highlights with an Acorny Import API token.

## Choose by goal

- **Moving an existing library once:** use a file import or a one-time API import.
- **Receiving new highlights from a connected service:** connect Instapaper or Inoreader in Extensions & Apps.
- **Sending highlights from a reader app:** create an Import API token in Acorny Settings, then configure the reader's Readwise-compatible sync.

## Current source matrix

| Source | Current path | Transfer type | Open the guide |
| --- | --- | --- | --- |
| Acorny export | Upload exported JSON or CSV | One-time file import | [Import an Acorny export](/import-sync/acorny-export/) |
| Supported CSV | Upload an Acorny, Readwise, or Diigo CSV export | One-time file import | [Import a CSV file](/import-sync/csv/) |
| Cubox | Upload a Cubox JSON export | One-time file import | [Import from Cubox](/import-sync/cubox/) |
| Diigo | Upload CSV or use Diigo credentials for a pull | One-time file or API import | [Import from Diigo](/import-sync/diigo/) |
| Inoreader | Connect the service in Extensions & Apps | Connected sync | [Sync Inoreader highlights](/import-sync/inoreader/) |
| Instapaper | Connect the service in Extensions & Apps | Connected sync | [Sync Instapaper highlights](/import-sync/instapaper/) |
| Kindle | Upload `My Clippings.txt` | One-time file import | [Import from Kindle](/import-sync/kindle/) |
| Koodo Reader | Configure Readwise sync with an Acorny Import API token | Reader app sync | [Sync Koodo Reader](/import-sync/koodo-reader/) |
| Moon+ Reader | Upload a supported backup or configure Readwise sync | File import or reader app sync | [Import or sync Moon+ Reader](/import-sync/moon-reader/) |
| PDF | Upload a PDF with extractable annotations | One-time local import | [Import highlights from PDF](/import-sync/pdf/) |
| Readest | Configure its Readwise-compatible API with an Acorny token and URL | Reader app sync | [Sync Readest](/import-sync/readest/) |
| Readwise | Upload CSV or use a Readwise access token for a pull | One-time file or API import | [Import from Readwise](/import-sync/readwise/) |
| WeRead | Export `weread-export.json` with the Acorny extension, then upload it | One-time file import | [Import from WeRead](/import-sync/weread/) |

## What each type means

### One-time import

A one-time import copies the highlights available in the selected file or API response. Use it for migrations, restores, and occasional transfers. Repeating an import is not the same as keeping a provider connected.

### Connected sync

Instapaper and Inoreader appear as connection cards in Extensions & Apps. After setup, use [Manual sync](/import-sync/manual-sync/) when you need to request a sync outside the normal connected flow.

### Reader app sync

Koodo Reader, Moon+ Reader, and Readest are configured inside the reader app. Create an Import API token in Acorny Settings and paste the documented URL and token into that app's Readwise integration settings. These reader apps do not appear as connected provider cards in Acorny.

## After highlights arrive

Open your library and confirm the expected source and highlight text are present. If an import or connection does not complete, use [Import and sync troubleshooting](/import-sync/troubleshooting/). When the content is ready, continue with [How review sessions work](/review-recall/how-review-works/).
