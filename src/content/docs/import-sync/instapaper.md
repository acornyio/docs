---
title: Sync from Instapaper
description: Connect Instapaper with xAuth and sync article highlights into Acorny.
---

Use this connected sync when new Instapaper highlights should continue arriving in Acorny after the first setup.

## Before you connect

The connection form asks for your Instapaper username and password. Acorny uses those credentials to request an access token through Instapaper's xAuth API. After the request succeeds, Acorny discards the password and keeps only the encrypted access token used for later syncs.

## Connect Instapaper

1. Open **Extensions & Apps** in Acorny.
2. Find the Instapaper card and choose **Connect**.
3. Enter the Instapaper username and password requested by the connection form.
4. Wait for the card to show the connected account. A successful connection starts the first highlight sync.

## What the card shows

The connected card shows the account, the last successful sync time when available, and a **Sync now** action. A completed manual sync can report Imported, Skipped, Restored, and Failed counts. Skipped items can be normal when Acorny already has the highlight.

For the exact manual action and result meanings, see [Run a manual sync](/import-sync/manual-sync/).

## If connection or sync fails

- Recheck the Instapaper username and password if the initial xAuth request fails.
- If the card is still connected, choose **Retry sync** or **Sync now**.
- If the card reports a connection error, reconnect the account before retrying.
- Use [Import and sync troubleshooting](/import-sync/troubleshooting/) if the same error returns.

After the expected highlights appear, continue with [How review sessions work](/review-recall/how-review-works/). To compare Instapaper with other transfer types, return to [Import vs sync](/import-sync/overview/).
