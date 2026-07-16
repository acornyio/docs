---
title: Run a manual sync
description: Manually run or retry a connected Instapaper or Inoreader sync in Acorny.
---

Manual sync applies to the connected provider cards for Instapaper and Inoreader. It does not trigger one-time file imports or reader-app token flows such as Koodo Reader, Moon+ Reader, or Readest.

## Run sync

1. Open **Extensions & Apps**.
2. Find the connected Instapaper or Inoreader card.
3. Choose **Sync now**. If the card is already in an error state, choose **Retry sync**.
4. Keep the page open until the action finishes and the card shows the result or an error.

## Read the result

| Result | Meaning |
| --- | --- |
| Imported | New highlights added to your Acorny library |
| Backfilled | A note added to a matching existing highlight; currently relevant to Inoreader |
| Skipped | Content Acorny did not add again, such as a highlight already in the library |
| Restored | A previously known highlight restored by the current sync result |
| Failed | Items the current sync could not process |

Zero Imported can be a healthy result when the provider has no new highlights. Check the other counts and the last-synced time before treating zero as an error.

## If manual sync fails

Use **Retry sync** once. If the card reports a connection error, use **Reconnect** and complete the provider's connection flow again. If the same failure returns, follow [Import and sync troubleshooting](/import-sync/troubleshooting/).

Return to [Import vs sync](/import-sync/overview/) if you are unsure whether your source uses a connected card, a file import, or reader-app sync.
