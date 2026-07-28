---
title: Sync to SiYuan
description: Sync your Acorny highlights into SiYuan Note with the official Acorny sync plugin.
---

Use SiYuan sync when you take notes in SiYuan Note and want your Acorny highlights to appear in SiYuan automatically.

SiYuan sync is one-way: highlights flow from Acorny into SiYuan. Edits you make inside SiYuan do not change your Acorny library.

The sync is set up inside SiYuan with the official Acorny sync plugin. In Acorny, you only create an export token and copy the Feed URL the plugin needs.

## Setup

1. Open Acorny.
2. Go to **Settings**.
3. Find **Export tokens**.
4. Create a token named `SiYuan`.
5. Copy the token immediately. It is only shown once.
6. Copy the Feed URL shown in the same Settings section.
7. Open SiYuan Note.
8. Open the Marketplace (集市), go to **Plugins**, and search for `Acorny`.
9. Install the Acorny sync plugin and enable it. The plugin source is also available at <https://github.com/acornyio/siyuan-note-sync>.
10. Open the plugin settings.
11. Paste the Feed URL into the Feed URL field.
12. Paste the export token into the token field.
13. Save the settings and run a sync.

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

- Confirm the Feed URL in the plugin settings exactly matches the one shown in Acorny Settings.
- Confirm the token field contains an Acorny export token, not an Import API token and not your Acorny login password.
- Create a fresh export token and reconfigure the plugin if authentication fails.
