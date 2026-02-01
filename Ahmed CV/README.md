# Ahmed Kassab — Chef Portfolio

## How to run
1) Keep the folder structure as-is:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `/imgs` (images 1..24 + cv-photo.png)
2) Open `index.html` in any modern browser.

## Image rules (IMPORTANT)
- Hero image must be: `imgs/cv-photo.png`
- Gallery images must be: `imgs/1.jpg` through `imgs/24.jpg`
- The gallery will NOT attempt any other extensions.
- If a gallery image is missing, a premium placeholder will appear with “Image {n} not found”.

## Diagnostics toggle
- Use the “Diagnostics” toggle in the Portfolio controls to show load/missing status under each tile.
- It is OFF by default.

## How to swap content
- Open `index.html` and edit the text in these sections:
  - Hero (name, title, tagline)
  - About
  - Highlights (card titles + descriptions)
  - Experience timeline
  - Skills, languages, and contact details

## Customizing gallery data
- Open `script.js` and edit:
  - `titles` and `captions` arrays for the 24 items
  - `categoryMap` for category ranges (Arabic, Oriental, Plating, Kitchen, Desserts)

## Recommended image specs
- Aspect ratio: 4:3 or 3:2 for best masonry layout balance
- File size: 200–600 KB per image for fast loading
- Compression: JPG 70–80% quality

## Notes
- No external libraries or build tools required.
- Works offline and is mobile responsive.
