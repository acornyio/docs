---
title: Sync from Inoreader
description: Authorize Inoreader with OAuth and sync annotated highlights into Acorny.
---

Use Inoreader sync for items that contain annotations. This connection is not a general import of every unread or starred item in the account.

## Connect Inoreader

1. Open **Extensions & Apps** in Acorny.
2. Find Inoreader and choose **Connect**.
3. Acorny opens Inoreader's OAuth authorization flow in the same browser window.
4. Approve access in Inoreader and return to Acorny. A successful connection starts the first sync.

## What sync imports

Acorny imports annotated highlights from Inoreader. The initial connection can also perform a one-time note backfill when a matching highlight is already in your library but its note is empty. It does not import every unread, starred, or account-level item.

## Read and rerun the result

The connected card shows the last successful sync time when available. Choose **Sync now** to request another pass. The result can include Imported, Backfilled, Skipped, Restored, and Failed counts; [Run a manual sync](/import-sync/manual-sync/) explains what each count means.

## If annotations do not appear

- Confirm that the source item actually contains an annotation in Inoreader.
- Check that the Inoreader card still reports a connected account.
- Choose **Sync now**; use **Retry sync** if the card is in an error state.
- Reconnect through OAuth if Acorny reports a connection error.
- Use [Import and sync troubleshooting](/import-sync/troubleshooting/) if the same item is still missing.

Return to [Import vs sync](/import-sync/overview/) to compare this connected flow with one-time imports. Once the content appears, continue with [How review sessions work](/review-recall/how-review-works/).
