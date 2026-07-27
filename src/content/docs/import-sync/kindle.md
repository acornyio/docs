---
title: Import from Kindle
description: Sync Kindle Notebook highlights with the Acorny Chrome extension, or import My Clippings.txt.
---

Acorny supports two ways to bring Kindle highlights into your library:

- **Sync Kindle Notebook with the Chrome extension** for highlights and notes stored in your Amazon account.
- **Import `My Clippings.txt`** to move reading history stored on a Kindle device.

Extension sync is the quickest option when your highlights appear in Kindle Notebook. File import remains useful for older or device-only clippings.

## Sync Kindle Notebook with the Chrome extension

1. Install the Acorny Chrome extension and sign in to your Acorny account.
2. Open [Kindle Notebook](https://read.amazon.com/notebook) in the same browser and sign in to Amazon.
3. While Kindle Notebook is the active page, open the Acorny extension popup.
4. Click **Sync Kindle Highlights**.
5. On first use, approve access to Kindle Notebook and Amazon's sign-in page.
6. Keep the Amazon tab open if you are asked to sign in, then review the sync result in the extension popup.

The extension imports book titles, authors, highlights, notes, and Kindle location labels. Sync starts only when you click the button and uses the Amazon session already open in your browser. Acorny does not read or collect your Amazon password, cookies, or other login credentials, and does not send them to Acorny's servers.

## Import My Clippings.txt

Kindle devices create `My Clippings.txt` for highlights, notes, and bookmarks saved on the device. Import this file when you want to move device history into Acorny or when those highlights never went through Kindle Notebook, Readwise, or another sync service.

The remaining sections on this page describe only the `My Clippings.txt` file import path.

## Get My Clippings.txt

1. Connect your Kindle device to your computer.
2. Open the Kindle documents folder.
3. Find `My Clippings.txt`.
4. Copy the file to your computer before uploading it.

## Import into Acorny

1. Open Acorny, then go to Import.
2. Choose Upload File.
3. Set Source type to Kindle My Clippings.txt, or leave Source type as Auto-detect.
4. Upload `My Clippings.txt`.
5. Review the preview.
6. Choose Confirm import.

## What Acorny imports

Acorny reads Kindle clipping blocks separated by `==========`. It imports highlight text, source title, author, location labels, and the original added date when the file contains those fields.

Kindle notes can be paired with nearby highlights when the clipping file has enough location information. Bookmark-only records do not contain reviewable quote text, so they are not useful as highlights.

## What transfers

Kindle import can preserve:

- Highlight text
- Book title
- Author
- Kindle location or page label
- Date added
- Notes when they can be matched to a nearby highlight

This data helps you search imported highlights and gives Review enough context to create recall cards.

## What does not transfer

`My Clippings.txt` does not contain everything from your Kindle account. It usually does not include cover images, full book files, reading progress, Kindle collections, or cloud library metadata.

If the same highlight exists in multiple clipping files, Acorny attempts to avoid duplicates based on the available source and location data.

## Large files

Long-time Kindle users may have a very large `My Clippings.txt`. Importing the whole file is fine, but the first preview is where you should check quality.

Look for one recent book and one older book in the preview. If both look right, the file format is probably being read correctly.

## If the file does not import

Make sure the file is the plain text `My Clippings.txt` file from the Kindle device. If you edited the file manually, keep the original clipping separators and metadata lines intact.

If the file contains mixed languages, keep the original UTF-8 or Kindle text encoding when copying it to your computer. Avoid opening and re-saving it in a word processor.

## Related pages

- [Import from CSV](/import-sync/csv/)
- [Troubleshoot import and sync issues](/import-sync/troubleshooting/)
- [How review sessions work](/review-recall/how-review-works/)
