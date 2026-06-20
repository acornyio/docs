---
title: Import from PDF
description: Import highlights extracted from a PDF file.
---

Use PDF import when your highlights are stored as annotations inside a PDF file.

## Import into Acorny

1. Open Acorny, then go to Import.
2. Choose Upload File.
3. Upload a `.pdf` file, or set Source type to Auto-detect and drop the PDF into the upload area.
4. Review the preview.
5. Choose Confirm import.

Acorny parses the PDF in the browser and converts detected highlights into Acorny's import format before sending them to the server.

## What Acorny imports

Acorny imports text highlights that can be extracted from the PDF. When available, it uses PDF metadata such as title, author, and fingerprint to create a stable source identity.

PDF comments or annotation notes may be imported when the PDF exposes them in a supported annotation shape.

## Limits

- Password-protected PDFs must be unlocked before import.
- Scanned PDFs without text may not produce highlights.
- Some PDF apps store annotations in non-standard ways. If Acorny reports that no highlights were found, try exporting or flattening annotations from the PDF app first.
- Large PDFs may take longer to parse in the browser.
