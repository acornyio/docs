---
title: Sync to SiYuan
description: Sync your Acorny highlights into SiYuan Note with the official Acorny sync plugin.
---

Use SiYuan sync when you take notes in SiYuan Note and want your Acorny highlights to appear in SiYuan automatically.

SiYuan sync is one-way: highlights flow from Acorny into SiYuan. Edits you make inside SiYuan do not change your Acorny library.

The sync is set up inside SiYuan with the official Acorny sync plugin. In Acorny, you only create an export token.

## Setup

1. Open Acorny.
2. Go to **Settings**.
3. Find **Export tokens**.
4. Create a token named `SiYuan`.
5. Copy the token immediately. It is only shown once.
6. Open SiYuan Note.
7. Open the Marketplace (集市), go to **Plugins**, and search for `Acorny`.
8. Install the Acorny sync plugin and enable it. The plugin source is also available at <https://github.com/acornyio/siyuan-note-sync>.
9. Open the plugin settings.
10. Paste the export token into the token field.
11. Save the settings and run a sync.

After setup, the plugin pulls new highlights from Acorny on its sync schedule and writes them into SiYuan.

## What syncs

- Highlights from your Acorny library
- Notes attached to highlights
- Tags attached to highlights

Sync is incremental: after the first run, the plugin only fetches highlights that are new since the previous sync.

## Token safety

Export tokens are read-only: they can read your highlights but cannot create or change anything in Acorny. Store them like passwords anyway. If a token is exposed, revoke it in Settings and create a new one.

## Troubleshooting

If highlights do not appear in SiYuan, check the following:

- Confirm the token field contains an Acorny export token, not an Import API token and not your Acorny login password.
- Create a fresh export token and reconfigure the plugin if authentication fails.
