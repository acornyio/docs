---
title: Import from WeRead
description: Export highlights from WeRead with the Acorny browser extension, then import the JSON file.
---

Use WeRead import when your highlights are stored in WeRead and you want to move them into Acorny.

WeRead import is a two-step flow: the Acorny browser extension exports a local JSON file from WeRead, then the Acorny web app imports that JSON file.

## Before you start

- Install and sign in to the Acorny browser extension.
- Sign in to WeRead at `weread.qq.com` in the same browser.
- Keep the generated `weread-export.json` file private. It contains your exported reading data.

## Export from WeRead

1. Open the Acorny browser extension options page.
2. Find the WeRead Export section.
3. Choose Open WeRead Export.
4. If the browser asks for access to `weread.qq.com`, grant the permission.
5. If the export page says you are not signed in to WeRead, open WeRead login, sign in, then retry.
6. Choose Start Export.
7. When the export finishes, download `weread-export.json`.

The exporter runs in your browser. Acorny does not store your WeRead credentials.

## Import into Acorny

1. Open Acorny, then go to Import.
2. Choose Upload File.
3. Set Source type to WeRead.
4. Upload `weread-export.json`.
5. Review the preview counts and sample records.
6. Choose Confirm import.

Imported WeRead highlights appear in your Highlights page and can enter review sessions.

## Notes and thoughts

WeRead stores highlights and thoughts separately. The Acorny exporter converts them into Acorny's stable WeRead JSON format before upload, so Acorny can keep the quote, note, book title, author, chapter, and source identifiers when the data is available.

## Troubleshooting

If the import result looks wrong, keep the debug trace ID shown on the Acorny import page. Then go back to the WeRead export page and download the WeRead Debug Bundle. Share both the trace ID and debug bundle when reporting the issue.

If WeRead changes its web data shape, export may fail or produce fewer records than expected. Retry after confirming that your WeRead web session is still valid.
