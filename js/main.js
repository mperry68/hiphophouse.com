// Main JavaScript for HipHopHouse.com

// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    initMobileMenu();
});

// Load header component
function loadHeader() {
    const path = window.location.pathname;
    const isClassesPage = path.includes('/classes/');
    
    // Determine correct path for header component
    const headerPath = isClassesPage ? '../components/header.html' : 'components/header.html';
    
    fetch(headerPath)
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
    
    fetch(footerPath)
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
            <p>Celebrating <span class="highlight">15 years</span></p>
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

