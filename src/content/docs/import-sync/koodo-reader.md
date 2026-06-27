---
title: Sync from Koodo Reader
description: Sync highlights and notes from Koodo Reader into Acorny automatically.
---

Use Koodo Reader sync when you read ebooks in Koodo Reader and want your highlights and notes to appear in Acorny automatically.

Koodo Reader sync is set up inside Koodo Reader. In Acorny, you only create an Import API token and copy the Readwise URL that Koodo Reader needs.

## Setup

1. Open Acorny.
2. Go to **Settings**.
3. Find **Import API tokens**.
4. Create a token named `Koodo Reader`.
5. Copy the token immediately. It is only shown once.
6. Copy the Acorny Readwise URL shown in the same Settings section. It ends with `/api/v2/highlights/`.
7. Download the Acorny-compatible Koodo Reader from <https://github.com/momadacoding/koodo-reader>.
8. Open Koodo Reader.
9. Go to **Settings** → **Data**.
10. Enable Acorny sync.
11. Paste the Acorny Readwise URL into the URL field.
12. Paste the Acorny token into the Token field.
13. Save the settings.

After setup, Koodo Reader automatically sends new highlights and notes to Acorny.

## What syncs

- Highlights you create while reading
- Notes attached to highlights

## Token safety

Import API tokens can create highlights in your Acorny account. Store them like passwords. If a token is exposed, revoke it in Settings and create a new one.

## Troubleshooting

If highlights do not appear in Acorny, check the following:

- Confirm the Acorny Readwise URL includes `/api/v2/highlights/` and starts with the same Acorny website address you use in the browser.
- Confirm the Token field contains the Acorny Import API token, not your Acorny login password.
- Create a fresh Import API token and reconfigure Koodo Reader if authentication fails.
