# Assets Folder

This folder is for non-image assets used throughout the website.

## Recommended Structure

```
assets/
├── icons/          # Icon files (SVG, PNG, ICO)
├── fonts/          # Custom web fonts
└── misc/           # Other assets (PDFs, documents, etc.)
```

## Icons

Place icon files here. Common formats:
- **SVG** - Scalable vector icons (recommended)
- **PNG** - Raster icons (for complex graphics)
- **ICO** - Favicon files

### Usage Examples

**SVG Icons:**
```html
<img src="assets/icons/icon-name.svg" alt="Icon">
```

**Favicon:**
```html
<link rel="icon" href="assets/icons/favicon.ico">
```

**Font Icons:**
If using icon fonts (Font Awesome, etc.), you can place font files in `assets/fonts/`

## Fonts

Custom web fonts go in `assets/fonts/`. Reference them in CSS:
```css
@font-face {
    font-family: 'YourFont';
    src: url('../assets/fonts/yourfont.woff2') format('woff2');
}
```

## Other Assets

- PDF documents
- Downloadable files
- Other non-image resources

