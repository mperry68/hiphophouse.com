# Cloudflare Pages Configuration Guide

## Build Settings

For this static site, use the following settings in Cloudflare Pages:

### Basic Configuration

- **Framework preset:** `None` (or leave blank)
- **Build command:** (leave empty - no build needed)
- **Build output directory:** `/` (root directory)
- **Root directory:** (leave empty unless your site is in a subfolder)

### Production Branch

- **Production branch:** `main` (or your default branch name)

## What This Site Needs

Since this is a **static HTML/CSS/JS site** with no build process:

1. ✅ **No build command needed** - Files are ready to deploy as-is
2. ✅ **Output directory is root** (`/`) - All files are in the root
3. ✅ **No framework preset** - It's plain HTML/CSS/JavaScript
4. ✅ **No environment variables needed** - Everything is static

## Special Files Included

### `_redirects` File
- Handles URL rewrites and redirects
- Includes 404 fallback to index.html
- Optional: Clean URLs (remove .html extensions)

### `_headers` File
- Sets security headers (X-Frame-Options, etc.)
- Configures caching for optimal performance
- Static assets cached for 1 year, HTML for 1 hour

## Deployment Steps

1. **Connect Repository**
   - Link your GitHub/GitLab repository to Cloudflare Pages

2. **Configure Build Settings**
   - Framework preset: `None`
   - Build command: (empty)
   - Build output directory: `/`
   - Production branch: `main`

3. **Deploy**
   - Cloudflare will automatically deploy on every push to main
   - Preview deployments for pull requests

## Notes

- The site uses JavaScript `fetch()` to load header/footer components
- This works perfectly on Cloudflare Pages (no CORS issues)
- All paths are relative, so no special path configuration needed
- Images and assets will be served from their respective folders

## Custom Domain

After deployment:
1. Go to your Cloudflare Pages project
2. Navigate to "Custom domains"
3. Add your domain (hiphophouse.com)
4. Follow DNS configuration instructions

## Performance

Cloudflare Pages automatically provides:
- ✅ Global CDN distribution
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ Image optimization (if enabled)
- ✅ Automatic compression

