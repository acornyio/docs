---
title: Import from Kindle
description: Import highlights and notes from Kindle My Clippings.txt.
---

Use Kindle import when you have highlights stored in a Kindle `My Clippings.txt` file. This is the file Kindle devices create for highlights, notes, and bookmarks saved on the device.

Kindle import is best for moving a personal reading history into Acorny. It is also useful when your Kindle highlights never went through Readwise or another sync service.

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
