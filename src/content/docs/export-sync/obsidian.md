---
title: Sync to Obsidian
description: Sync your Acorny highlights into an Obsidian vault with the official Acorny Sync plugin.
---

Use Obsidian sync when you take notes in Obsidian and want your Acorny highlights to appear in your vault as Markdown notes automatically.

Obsidian sync is one-way: highlights flow from Acorny into Obsidian. Edits you make inside Obsidian do not change your Acorny library.

The sync is set up inside Obsidian with the official Acorny Sync plugin. In Acorny, you only create an export token and copy the Feed URL the plugin needs.

## Setup

1. Open Acorny.
2. Go to **Settings**.
3. Find **Export tokens**.
4. Create a token named `Obsidian`.
5. Copy the token immediately. It is only shown once.
6. Copy the Feed URL shown in the same Settings section.
7. Open Obsidian.
8. Go to **Settings** → **Community plugins**, turn on community plugins if prompted, and browse the community plugin directory.
9. Search for `Acorny` and install the Acorny Sync plugin, then enable it.
10. Open the Acorny Sync plugin settings.
11. Paste the Feed URL into the Feed URL field.
12. Paste the export token into the token field.
13. Save the settings and run a sync.

After setup, the plugin pulls new highlights from Acorny on its sync schedule and writes them into your vault as Markdown notes.

## What syncs

- Highlights from your Acorny library
- Notes attached to highlights
- Tags attached to highlights

Sync is incremental: after the first run, the plugin only fetches highlights that are new since the previous sync.

## Token safety

Export tokens are read-only: they can read your highlights but cannot create or change anything in Acorny. Store them like passwords anyway. If a token is exposed, revoke it in Settings and create a new one. Do not commit your Obsidian vault data folder to a public repository — plugin configuration may contain this token.

## Troubleshooting

If highlights do not appear in Obsidian, check the following:

- Confirm the Feed URL in the plugin settings exactly matches the one shown in Acorny Settings.
- Confirm the token field contains an Acorny export token, not an Import API token and not your Acorny login password.
- Create a fresh export token and reconfigure the plugin if authentication fails.
