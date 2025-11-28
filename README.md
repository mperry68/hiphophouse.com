# HipHopHouse.com

Website for HipHopHouse - A premier destination for hip hop culture, events, and community.

## Folder Structure

```
hiphophouse.com/
├── css/
│   └── main.css          # Main stylesheet
├── js/
│   └── main.js           # Main JavaScript file
├── components/
│   ├── header.html       # Standardized header component
│   └── footer.html       # Standardized footer component
├── images/               # Photos and image files (JPG, PNG, WebP)
├── assets/               # Icons, fonts, and other non-image assets
│   ├── icons/            # Icon files (SVG, PNG, ICO)
│   └── fonts/            # Custom web fonts
├── index.html            # Homepage
└── README.md             # This file
```

## Features

- **Standardized Header & Footer**: Reusable components loaded via JavaScript
- **Responsive Design**: Mobile-friendly layout with hamburger menu
- **Modern Styling**: Clean, professional design with smooth transitions
- **Cloudflare Ready**: Static HTML/CSS/JS structure perfect for Cloudflare Pages

## Adding New Pages

To create a new page:

1. Create a new HTML file (e.g., `about.html`)
2. Use the same structure as `index.html`:
   - Include the header placeholder: `<div id="header-placeholder"></div>`
   - Include the footer placeholder: `<div id="footer-placeholder"></div>`
   - Link to `css/main.css` and `js/main.js`

Example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - HipHopHouse</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div id="header-placeholder"></div>
    <main class="main-content">
        <div class="content-container">
            <!-- Your content here -->
        </div>
    </main>
    <div id="footer-placeholder"></div>
    <script src="js/main.js"></script>
</body>
</html>
```

## Customization

### Colors
Edit CSS variables in `css/main.css`:
- `--primary-color`: Main dark color (header/footer)
- `--secondary-color`: Accent color (links, highlights)
- `--accent-color`: Secondary accent color

### Navigation
Edit `components/header.html` to add/remove navigation links.

### Footer Content
Edit `components/footer.html` to update footer information, links, and social media.

## Adding Images

Place all photos and image files in the `images/` folder. Reference them in your HTML:
```html
<img src="images/your-image.jpg" alt="Description">
```

## Adding Icons and Assets

**Icons** go in `assets/icons/`:
```html
<img src="assets/icons/icon-name.svg" alt="Icon">
<link rel="icon" href="assets/icons/favicon.ico">
```

**Custom fonts** go in `assets/fonts/` and are referenced in CSS.

**Other assets** (PDFs, documents) can go in `assets/` or a subfolder like `assets/misc/`.

## Cloudflare Deployment

This site is ready for Cloudflare Pages:
1. Connect your repository to Cloudflare Pages
2. Set build command: (none needed for static site)
3. Set output directory: `/` (root)
4. Deploy!

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Graceful degradation for older browsers

