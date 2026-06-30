---
title: Import and sync from Moon+ Reader
description: Import Moon+ Reader export files or configure Moon+ Reader to push new highlights into Acorny.
---

Use Moon+ Reader with Acorny in two different ways:

- One-time import: upload existing Moon+ Reader export files into Acorny.
- Readwise sync: configure Moon+ Reader's Readwise settings to send new highlights to Acorny.

Moon+ Reader sync is set up inside Moon+ Reader. In Acorny, you only create an Import API token and copy the Readwise URL that Moon+ Reader needs.

## One-time import

Use one-time import when you already have Moon+ Reader highlights and want to migrate them into Acorny.

Supported inputs:

- TXT paste for a single-book Moon+ Reader text export
- `.mrexpt` export files
- `.mrstd` backup archives
- `.mrpro` backup archives

For a single-book TXT export, open the Moon+ Reader bookmarks view and use the share menu to export notes and highlights.

![Moon+ Reader share menu with notes and highlights export options](/images/import-sync/moon-reader/export_moon_reader.jpg)

Import flow:

1. Open Acorny, then go to Import.
2. Choose Upload File.
3. Set Source type to Moon+ Reader.
4. Pick the matching Moon+ Reader input mode:
   - Paste TXT
   - Upload `.mrexpt`
   - Upload backup (`.mrstd`, `.mrpro`)
5. Preview the import.
6. Choose Confirm import.

## What transfers

Moon+ Reader imports can preserve:

- Highlight text
- Book title
- Author when present
- Chapter or reading position when present
- Notes attached to highlights
- Backup details Acorny can use to recognize duplicates
- Created date when the export provides one

For `.mrexpt` and backup imports, Acorny can use details such as chapter, position, and backup information to avoid duplicates across TXT, `.mrexpt`, and backup imports.

If a Moon+ Reader highlight already exists in Acorny but its note is empty, a later Moon+ Reader import can fill in the missing note when Acorny can safely match the highlights.

## What does not transfer

Moon+ Reader import does not transfer the full ebook file, app theme, reading progress, library folders, or every Moon+ Reader setting. Backup files can contain more detail than TXT exports, so use `.mrexpt`, `.mrstd`, or `.mrpro` when you want a more complete import.

## Readwise-compatible sync from Moon+ Reader

Use this sync option when you keep reading in Moon+ Reader and want future highlights to appear in Acorny without manually uploading files each time.

1. Open Acorny.
2. Go to Settings.
3. Find Import API tokens.
4. Create a token named `Moon+ Reader`.
5. Copy the token immediately. It is only shown once.
6. Copy the Moon+ Reader Readwise URL shown in the same Settings section. It ends with `/api/v2/highlights/`.
7. Open Moon+ Reader.
8. Open Moon+ Reader's Readwise sync settings.
9. Paste the Acorny URL into the Readwise URL field.
10. Paste the Acorny token into the Token field.
11. Trigger Moon+ Reader's Readwise sync.

Moon+ Reader sends highlights to Acorny through its Readwise sync feature. The Acorny token authorizes new highlights to be added to your account.

In Moon+ Reader, start from the bookmarks screen and open the settings button.

![Moon+ Reader bookmarks screen with the settings button highlighted](/images/import-sync/moon-reader/sync_step1.jpg)

Enable the option that automatically shares new highlights and notes to Readwise, then open its settings.

![Moon+ Reader bookmark settings with Readwise sharing enabled](/images/import-sync/moon-reader/sync_step2.jpg)

Paste the Acorny token and Readwise URL into the Readwise settings dialog.

![Moon+ Reader Readwise sync settings with Acorny token and URL fields](/images/import-sync/moon-reader/sync_step3.jpg)

## When to choose import vs sync

Use file import for your existing library. Use Readwise-compatible sync after that if you continue reading in Moon+ Reader and want new highlights to arrive automatically.

Do not use both paths repeatedly for the same small set of test highlights unless you are checking how duplicates are handled. Acorny uses available details to avoid duplicates, but cleaner imports are easier to inspect.

## Token safety

Import API tokens can create highlights in your Acorny account. Store them like passwords. If a token is exposed, revoke it in Settings and create a new one.

## Troubleshooting sync

If Moon+ Reader reports an authentication failure, create a fresh Import API token and make sure the Token field contains the Acorny token, not your Acorny login password.

If Moon+ Reader cannot connect, confirm that the Readwise URL includes `/api/v2/highlights/` and starts with the same Acorny website address you use in the browser.

## Related pages

- [Import from Readwise](/import-sync/readwise/)
- [Overview: import vs sync](/import-sync/overview/)
- [Contact support](/account-data/contact-support/)
