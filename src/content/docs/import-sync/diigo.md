---
title: Import from Diigo
description: Import Diigo highlights from CSV or supported API input.
---

Use Diigo import when you want to move web annotations from Diigo to Acorny.

Diigo can export web annotations as CSV. Some Acorny environments may also expose Diigo API import fields. If you are not sure which path to use, start with CSV because it is easier to inspect before upload.

## CSV import

Export your Diigo annotations as CSV, then upload the CSV file in Import Highlights.

### Export from Diigo

In Diigo, export your annotations as CSV and save the file where you can find it again. Acorny reads the file you upload, so nothing needs to be configured in Diigo beyond the export itself.

### Upload into Acorny

1. Open Acorny, then go to Import.
2. Choose Upload File.
3. Set Source type to Diigo CSV.
4. Upload the CSV file.
5. Review the preview.
6. Choose Confirm import.

A single Diigo row can contain more than one highlighted passage, so Acorny may create multiple highlights from one row.

## API import

If your Acorny account shows Diigo API fields in the import screen:

1. Request or open your Diigo API key at https://www.diigo.com/api_keys.
2. Open Acorny, then go to Import.
3. Choose Import from API.
4. Select Diigo API.
5. Enter your Diigo API key, username, and password.
6. Preview the import.
7. Choose Confirm import.

Acorny uses those credentials only for the import request. If Diigo API fields are not available in your environment, use CSV import.

## What transfers

Both Diigo paths can preserve:

- Highlight text
- Source title
- Source URL
- Tags when present
- Notes or sticky notes when the export provides enough structure
- Created date when present
- Details Diigo provides to help avoid duplicates

This is useful when you want web annotations from Diigo to become searchable highlights and review candidates in Acorny.

## What does not transfer

Diigo import does not recreate your full Diigo account, groups, browser extension settings, or every bookmark-only item. Acorny focuses on records that contain highlight text or notes that can attach to highlights.

## Sticky notes

Diigo notes can be attached to nearby highlights when the export contains enough structure for Acorny to match them.

If a sticky note appears without a matching highlight, check the preview before confirming. The source file may not contain enough context to attach the note safely.

## Troubleshooting

### If the CSV preview count is lower than expected

The CSV may contain bookmarks without highlighted text. Acorny may skip those because they do not create useful recall cards.

### If API import fails

Verify the Diigo API key at `https://www.diigo.com/api_keys` and confirm the username belongs to the account that owns the annotations.

## Related pages

- [Import from Cubox](/import-sync/cubox/)
- [Import from CSV](/import-sync/csv/)
- [Contact support](/account-data/contact-support/)
