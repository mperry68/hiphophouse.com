// Main JavaScript for HipHopHouse.com

// Simple test log
console.log('main.js loaded');

// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing...');
    loadHeader();
    loadFooter();
    initMobileMenu();
    // Check immediately and after delays
    checkPageHeaderImages();
    setTimeout(checkPageHeaderImages, 100);
    setTimeout(checkPageHeaderImages, 500);
    setTimeout(checkPageHeaderImages, 1000);
});

// Also run on window load as backup
window.addEventListener('load', function() {
    console.log('Window loaded - checking page headers again');
    checkPageHeaderImages();
});

// Debug function to check page header background images
function checkPageHeaderImages() {
    console.log('=== Checking Page Header Images ===');
    const pageHeaders = document.querySelectorAll('.page-header');
    console.log('Found page-header elements:', pageHeaders.length);
    
    if (pageHeaders.length === 0) {
        console.warn('No .page-header elements found!');
        return;
    }
    
    pageHeaders.forEach((header, index) => {
        const bgImage = window.getComputedStyle(header).backgroundImage;
        const inlineStyle = header.getAttribute('style');
        const allStyles = window.getComputedStyle(header);
        
        console.log(`\n--- Page Header ${index} ---`);
        console.log('Computed background-image:', bgImage);
        console.log('Inline style attribute:', inlineStyle);
        console.log('Background color:', allStyles.backgroundColor);
        console.log('Background size:', allStyles.backgroundSize);
        console.log('Has background image:', bgImage !== 'none' && bgImage !== '');
        console.log('Element:', header);
        
        // If inline style exists, always apply it to ensure it works
        if (inlineStyle && inlineStyle.includes('background-image')) {
            const urlMatch = inlineStyle.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
                const imageUrl = urlMatch[1];
                console.log('Found image URL in inline style:', imageUrl);
                
                // Always apply the background image to ensure it's set
                console.log('Applying background image fix...');
                header.style.setProperty('background-image', `url(${imageUrl})`, 'important');
                header.style.setProperty('background-size', 'cover', 'important');
                header.style.setProperty('background-position', 'center', 'important');
                header.style.setProperty('background-repeat', 'no-repeat', 'important');
                header.style.setProperty('background-color', 'transparent', 'important');
                
                // Force a reflow
                void header.offsetHeight;
                
                // Verify it was applied
                const newBgImage = window.getComputedStyle(header).backgroundImage;
                console.log('After fix - background-image:', newBgImage);
                if (newBgImage.includes(imageUrl) || (newBgImage !== 'none' && newBgImage !== '')) {
                    console.log('✅ Successfully applied background image!');
                } else {
                    console.error('❌ Failed to apply background image. Computed value:', newBgImage);
                }
            }
        } else {
            console.warn('No background-image found in inline style');
        }
    });
    console.log('=== End Page Header Check ===\n');
}

// Load header component
function loadHeader() {
    const path = window.location.pathname;
    const isClassesPage = path.includes('/classes/');
    
    // Determine correct path for header component
    const headerPath = isClassesPage ? '../components/header.html' : 'components/header.html';
    
    fetch(headerPath + '?v=' + new Date().getTime() + '&nocache=' + Math.random())
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setActiveNavigation(path, isClassesPage);
            initMobileMenu(); // Reinitialize after header loads
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback header if component fails to load
            document.getElementById('header-placeholder').innerHTML = getDefaultHeader();
            setActiveNavigation(path, isClassesPage);
        });
}

// Load footer component
function loadFooter() {
    const path = window.location.pathname;
    const isClassesPage = path.includes('/classes/');
    
    // Determine correct path for footer component
    const footerPath = isClassesPage ? '../components/footer.html' : 'components/footer.html';
    
    fetch(footerPath + '?v=' + Date.now())
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback footer if component fails to load
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
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Toggle hamburger icon
            const icon = menuToggle.querySelector('i') || menuToggle;
            if (mainNav.classList.contains('active')) {
                icon.textContent = '✕';
            } else {
                icon.textContent = '☰';
            }
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i') || menuToggle;
                icon.textContent = '☰';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i') || menuToggle;
                icon.textContent = '☰';
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
                        <li><a href="/" class="active">Home</a></li>
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

