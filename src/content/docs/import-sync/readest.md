---
title: Sync from Readest
description: Sync highlights and notes from Readest into Acorny automatically.
---

Use Readest sync when you read ebooks in Readest and want highlights and notes to appear in Acorny automatically.

Readest sync is set up inside Readest. In Acorny, you only create an Import API token and paste it into Readest's Readwise integration settings.

## Setup

1. Open Acorny.
2. Go to **Settings**.
3. Find **Import API tokens**.
4. Create a token named `Readest`.
5. Copy the token immediately. It is only shown once.
6. Open Readest.
7. Go to **Settings** → **Integrations** → **Readwise**.
8. Paste the Acorny token into the Readwise token field.
9. Expand **Advanced**.
10. Set **Custom URL** to `https://acorny.io/api/v2/`.
11. Save the settings.

After setup, Readest syncs with Acorny automatically:

- When you open a book, existing highlights and notes from that book sync to Acorny.
- When you create a new highlight or note, Readest sends it to Acorny when it is created.

## What syncs

- Existing highlights from a book after you open it in Readest
- Existing notes from a book after you open it in Readest
- New highlights created while reading
- New notes created while reading

## Token safety

Import API tokens can create highlights in your Acorny account. Store them like passwords. If a token is exposed, revoke it in Settings and create a new one.

## Troubleshooting

If highlights do not appear in Acorny, check the following:

- Confirm the Custom URL is exactly `https://acorny.io/api/v2/`.
- Confirm the Readwise token field contains the Acorny Import API token, not your Acorny login password.
- Open the book in Readest again to trigger sync for existing highlights and notes.
- Create a fresh Import API token and reconfigure Readest if authentication fails.
