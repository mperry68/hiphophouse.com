// Main JavaScript for HipHopHouse.com
// Version: 2.0 - Debug enabled

// Immediate log to verify script is loading
console.log('%c=== MAIN.JS LOADED ===', 'color: green; font-weight: bold; font-size: 14px;');
console.log('Current URL:', window.location.href);
console.log('Current Path:', window.location.pathname);
console.log('Script loaded at:', new Date().toISOString());

// Check if DOM is already loaded
if (document.readyState === 'loading') {
    console.log('DOM is still loading, waiting for DOMContentLoaded...');
} else {
    console.log('DOM already loaded, running immediately...');
    // DOM is already loaded, run immediately
    loadHeader();
    loadFooter();
    initMobileMenu();
    checkPageHeaderImages();
    checkAnnouncementBar();
}

// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CONTENT LOADED ===');
    loadHeader();
    loadFooter();
    initMobileMenu();
    checkPageHeaderImages();
});

// Check page header images after everything loads
window.addEventListener('load', function() {
    console.log('=== WINDOW LOADED ===');
    checkPageHeaderImages();
    checkAnnouncementBar();
    setTimeout(checkPageHeaderImages, 500);
    setTimeout(checkAnnouncementBar, 500);
});

// Load header component
function loadHeader() {
    console.log('=== LOADING HEADER ===');
    const path = window.location.pathname;
    const isClassesPage = path.includes('/classes/');
    const headerPath = isClassesPage ? '../components/header.html' : 'components/header.html';
    
    console.log('Header path:', headerPath);
    console.log('Is classes page:', isClassesPage);
    
    fetch(headerPath)
        .then(response => {
            console.log('Header fetch response status:', response.status);
            return response.text();
        })
        .then(data => {
            console.log('Header HTML received, length:', data.length);
            console.log('Header HTML preview:', data.substring(0, 200));
            
            // Check for announcement bar in the data
            if (data.includes('announcement-bar')) {
                const announcementMatch = data.match(/<p>([^<]+)<\/p>/);
                if (announcementMatch) {
                    console.log('Announcement bar text found in HTML:', announcementMatch[1]);
                }
            }
            
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Check announcement bar after insertion
            setTimeout(() => {
                checkAnnouncementBar();
            }, 100);
            
            setActiveNavigation(path, isClassesPage);
            initMobileMenu();
        })
        .catch(error => {
            console.error('Error loading header:', error);
            console.log('Using fallback header');
            document.getElementById('header-placeholder').innerHTML = getDefaultHeader();
            setTimeout(() => {
                checkAnnouncementBar();
            }, 100);
            setActiveNavigation(path, isClassesPage);
        });
}

// Load footer component
function loadFooter() {
    const path = window.location.pathname;
    const isClassesPage = path.includes('/classes/');
    const footerPath = isClassesPage ? '../components/footer.html' : 'components/footer.html';
    
    fetch(footerPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            document.getElementById('footer-placeholder').innerHTML = getDefaultFooter();
        });
}

// Set active navigation state
function setActiveNavigation(path, isClassesPage) {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (isClassesPage && href === '/classes.html') {
            link.classList.add('active');
        } else if (path === href || (path === '/' && href === '/')) {
            link.classList.add('active');
        } else if (path.includes(href) && href !== '/') {
            link.classList.add('active');
        }
    });
}

// Initialize mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        // Remove existing listeners by cloning
        const newToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newToggle, menuToggle);
        const newNav = mainNav.cloneNode(true);
        mainNav.parentNode.replaceChild(newNav, mainNav);
        
        const toggle = newToggle;
        const nav = newNav;
        
        toggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            toggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                toggle.textContent = '☰';
            });
        });

        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !toggle.contains(event.target)) {
                nav.classList.remove('active');
                toggle.textContent = '☰';
            }
        });
    }
}

// Default header fallback
function getDefaultHeader() {
    return `
        <div class="announcement-bar">
            <p>Thank you for your confidence and trust. Celebrating <span class="highlight">15 years</span></p>
        </div>
        <header class="site-header">
            <div class="header-container">
                <a href="/" class="site-logo">
                    <span class="logo-accent">HipHop</span>House
                </a>
                <button class="mobile-menu-toggle">☰</button>
                <nav>
                    <ul class="main-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about.html">About Us</a></li>
                        <li><a href="/classes.html" class="has-dropdown">Dance Classes</a></li>
                        <li><a href="/schedule.html">Schedule</a></li>
                        <li><a href="/gallery.html">Gallery</a></li>
                        <li><a href="/contact.html">Contact Us</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    `;
}

// Check announcement bar
function checkAnnouncementBar() {
    console.log('=== CHECKING ANNOUNCEMENT BAR ===');
    const announcementBar = document.querySelector('.announcement-bar');
    
    if (!announcementBar) {
        console.error('❌ Announcement bar element NOT FOUND!');
        return;
    }
    
    console.log('✅ Announcement bar element found');
    
    // Check text content
    const text = announcementBar.textContent || announcementBar.innerText;
    console.log('Announcement bar text:', text);
    
    // Check HTML content
    const html = announcementBar.innerHTML;
    console.log('Announcement bar HTML:', html);
    
    // Check computed styles
    const styles = window.getComputedStyle(announcementBar);
    console.log('Background color (computed):', styles.backgroundColor);
    console.log('Background color (CSS variable):', getComputedStyle(document.documentElement).getPropertyValue('--announcement-bg'));
    console.log('Color:', styles.color);
    console.log('All computed styles:', {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        padding: styles.padding,
        fontSize: styles.fontSize
    });
    
    // Check if CSS variable is set
    const rootStyles = getComputedStyle(document.documentElement);
    const announcementBg = rootStyles.getPropertyValue('--announcement-bg').trim();
    console.log('CSS Variable --announcement-bg value:', announcementBg);
    
    // Check inline styles
    const inlineStyle = announcementBar.getAttribute('style');
    console.log('Inline style attribute:', inlineStyle || 'none');
}

// Check page header images
function checkPageHeaderImages() {
    console.log('=== CHECKING PAGE HEADER IMAGES ===');
    const pageHeaders = document.querySelectorAll('.page-header');
    console.log('Found .page-header elements:', pageHeaders.length);
    
    if (pageHeaders.length === 0) {
        console.warn('⚠️ No .page-header elements found');
        return;
    }
    
    pageHeaders.forEach((header, index) => {
        console.log(`\n--- Page Header ${index + 1} ---`);
        
        // Check inline style
        const inlineStyle = header.getAttribute('style');
        console.log('Inline style attribute:', inlineStyle || 'NONE');
        
        // Check computed styles BEFORE any changes
        const computed = window.getComputedStyle(header);
        const bgImage = computed.backgroundImage;
        const bgSize = computed.backgroundSize;
        const bgPosition = computed.backgroundPosition;
        const bgRepeat = computed.backgroundRepeat;
        const bgColor = computed.backgroundColor;
        
        console.log('Computed background-image:', bgImage);
        console.log('Computed background-size:', bgSize);
        console.log('Computed background-position:', bgPosition);
        console.log('Computed background-repeat:', bgRepeat);
        console.log('Computed background-color:', bgColor);
        console.log('Has background image:', bgImage !== 'none' && bgImage !== '');
        
        // If inline style has background-image, extract URL and ensure it's applied
        if (inlineStyle && inlineStyle.includes('background-image')) {
            const urlMatch = inlineStyle.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
                const imageUrl = urlMatch[1];
                console.log('✅ Found image URL in inline style:', imageUrl);
                
                // Always ensure the background image is properly set via JavaScript
                // This fixes cases where CSS might not apply the inline style correctly
                header.style.setProperty('background-image', `url(${imageUrl})`, 'important');
                header.style.setProperty('background-size', 'cover', 'important');
                header.style.setProperty('background-position', 'center', 'important');
                header.style.setProperty('background-repeat', 'no-repeat', 'important');
                
                // Check again after applying
                const newComputed = window.getComputedStyle(header);
                const newBgImage = newComputed.backgroundImage;
                console.log('After JS application - background-image:', newBgImage);
                
                if (newBgImage !== 'none' && newBgImage !== '') {
                    console.log('✅ Background image successfully applied via JavaScript');
                } else {
                    console.error('❌ Background image STILL not applied after JS fix!');
                }
            }
        } else {
            console.warn('⚠️ No background-image in inline style');
        }
        
        // Check element visibility
        console.log('Element visible:', header.offsetWidth > 0 && header.offsetHeight > 0);
        console.log('Element dimensions:', header.offsetWidth, 'x', header.offsetHeight);
    });
    
    console.log('=== END PAGE HEADER CHECK ===\n');
}

// Default footer fallback
function getDefaultFooter() {
    return `
        <footer class="site-footer">
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>HipHop House</h3>
                        <p>An established dance school dedicated to excellence in hip hop dance education.</p>
                    </div>
                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <ul class="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about.html">About Us</a></li>
                            <li><a href="/classes.html">Dance Classes</a></li>
                            <li><a href="/schedule.html">Schedule</a></li>
                            <li><a href="/gallery.html">Gallery</a></li>
                            <li><a href="/contact.html">Contact Us</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Connect With Us</h3>
                        <div class="social-links">
                            <a href="#" aria-label="Facebook">FB</a>
                            <a href="#" aria-label="Instagram">IG</a>
                            <a href="#" aria-label="YouTube">YT</a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h3>Contact Info</h3>
                        <p><strong>Address:</strong><br>
                        B2-186 Pl. Sutton<br>
                        Beaconsfield, QC H9W 5S3</p>
                        <p><strong>Email:</strong><br>
                        <a href="mailto:hiphophouse@gmail.com">hiphophouse@gmail.com</a></p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} HipHop House. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}
