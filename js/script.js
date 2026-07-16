// ===== GLOBAL VARIABLES & INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Core initialization function
function initializeWebsite() {
    // Initialize all components
    initParticleBackground();
    initLoadingScreen();
    initNavigation();
    initThemeToggle();
    initTypewriterEffect();
    initScrollAnimations();
    initBackToTop();
    initSmoothScrolling();
    initTimelineAnimations();
    initGalleryEffects();
    initMobileMenu();
    
    // Set initial theme
    setInitialTheme();
    
    // Start particles animation
    startParticlesAnimation();
    
    console.log('SOFTDESK Website initialized successfully!');
}

// ===== PARTICLE BACKGROUND DISABLED =====
let particles = [];
const particleCount = 0; // Disabled

function initParticleBackground() {
    // Particle system disabled for static display
    console.log('Particle background disabled - static display mode');
}

function createParticle(container) {
    // Particle creation disabled
}

function startParticlesAnimation() {
    // Particle animation disabled
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 3500); // 3.5 seconds to match animation
}

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Handle scroll effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
    });
    
    // Add click handlers to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navCursor = document.getElementById('navCursor');
    const navContainer = document.querySelector('.nav-container');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach((link, index) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
            
            // Update cursor position
            if (navCursor && navContainer) {
                const linkRect = link.getBoundingClientRect();
                const navRect = navContainer.getBoundingClientRect();
                const cursorX = linkRect.left - navRect.left + (linkRect.width / 2) - 15; // Center the cursor
                
                navCursor.style.transform = `translateX(${cursorX}px)`;
                navCursor.style.width = '30px';
                navCursor.style.opacity = '1';
            }
        }
    });
    
    // Hide cursor if no active section (e.g., at top of page)
    if (!currentSection && navCursor) {
        navCursor.style.opacity = '0';
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== THEME TOGGLE SYSTEM =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme-preference')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme-preference');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to dark mode as specified
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    localStorage.setItem('theme-preference', newTheme);
    
    // Add smooth transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Update theme-color meta tag
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
        themeColorMeta.content = theme === 'dark' ? '#0f172a' : '#ffffff';
    }
}

// ===== TYPEWRITER EFFECT DISABLED =====
function initTypewriterEffect() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    // Display static text instead of animated typewriter
    typewriterElement.textContent = 'Innovating the Future';
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .member-card, .timeline-item, .gallery-item');
    
    // Add animate-on-scroll class to elements
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Create Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// ===== TIMELINE ANIMATIONS =====
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Animate timeline item
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate corresponding marker
                    const marker = entry.target.querySelector('.timeline-marker');
                    if (marker) {
                        marker.style.animation = 'markerPulse 2s ease-in-out infinite';
                    }
                }, index * 200); // Staggered animation
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Add hover effects for timeline items
    timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        const marker = item.querySelector('.timeline-marker');
        
        item.addEventListener('mouseenter', () => {
            content.style.transform = 'translateY(-5px) scale(1.02)';
            content.style.boxShadow = 'var(--shadow-xl)';
            content.style.borderColor = 'var(--accent-primary)';
            
            if (marker) {
                marker.style.transform = 'translateX(-50%) scale(1.3)';
                marker.style.boxShadow = '0 0 30px rgba(255, 102, 0, 1)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            content.style.transform = '';
            content.style.boxShadow = '';
            content.style.borderColor = '';
            
            if (marker) {
                marker.style.transform = 'translateX(-50%) scale(1)';
                marker.style.boxShadow = '';
            }
        });
    });
    
    // Initialize star animations
    initStarAnimations();
}

// ===== STAR ANIMATIONS =====
function initStarAnimations() {
    const stars = document.querySelectorAll('.timeline-stars .star');
    
    stars.forEach((star, index) => {
        // Randomize star properties
        const size = star.style.getPropertyValue('--size') || '3px';
        star.style.width = size;
        star.style.height = size;
        
        // Add floating animation
        star.style.animation = `twinkle ${2 + Math.random() * 2}s ease-in-out infinite, float ${3 + Math.random() * 2}s ease-in-out infinite`;
        star.style.animationDelay = `${Math.random() * 3}s`;
    });
}

// Add floating animation keyframes if not present
if (!document.querySelector('#star-animations')) {
    const style = document.createElement('style');
    style.id = 'star-animations';
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes twinkle {
            0%, 100% {
                opacity: 0.3;
                transform: scale(1) rotate(0deg);
                box-shadow: 0 0 6px rgba(255, 102, 0, 0.6);
            }
            50% {
                opacity: 1;
                transform: scale(1.2) rotate(180deg);
                box-shadow: 0 0 12px rgba(255, 102, 0, 0.9);
            }
        }
        
        @keyframes markerPulse {
            0%, 100% {
                transform: translateX(-50%) scale(1);
                box-shadow: 0 0 15px rgba(255, 102, 0, 0.5);
            }
            50% {
                transform: translateX(-50%) scale(1.2);
                box-shadow: 0 0 25px rgba(255, 102, 0, 0.8);
            }
        }
        
        @keyframes markerRing {
            0%, 100% {
                transform: scale(1);
                opacity: 0.6;
            }
            50% {
                transform: scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== GALLERY EFFECTS =====
function initGalleryEffects() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('Gallery cursor effects disabled - reduced motion preference');
        return;
    }
    
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryCursor = document.getElementById('galleryCursor');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryContainer || !galleryCursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isHoveringGallery = false;
    
    // Smooth cursor following animation
    function animateCursor() {
        if (!isHoveringGallery) return;
        
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        galleryCursor.style.left = `${cursorX}px`;
        galleryCursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    // Mouse enter gallery
    galleryContainer.addEventListener('mouseenter', (e) => {
        isHoveringGallery = true;
        galleryCursor.classList.add('active');
        galleryCursor.style.opacity = '1';
        animateCursor();
    });
    
    // Mouse leave gallery
    galleryContainer.addEventListener('mouseleave', () => {
        isHoveringGallery = false;
        galleryCursor.classList.remove('active', 'target');
        galleryCursor.style.opacity = '0';
    });
    
    // Mouse move in gallery
    galleryContainer.addEventListener('mousemove', (e) => {
        const rect = galleryContainer.getBoundingClientRect();
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Check if hovering over gallery item
        let isHoveringItem = false;
        galleryItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if (e.clientX >= itemRect.left && e.clientX <= itemRect.right &&
                e.clientY >= itemRect.top && e.clientY <= itemRect.bottom) {
                isHoveringItem = true;
            }
        });
        
        if (isHoveringItem) {
            galleryCursor.classList.add('target');
        } else {
            galleryCursor.classList.remove('target');
        }
    });
    
    // Enhanced gallery item hover effects
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            galleryCursor.classList.add('target');
        });
        
        item.addEventListener('mouseleave', () => {
            galleryCursor.classList.remove('target');
        });
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== BUTTON EFFECTS DISABLED =====
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    // All button animations removed for static display
    console.log('Button effects disabled - static display mode');
}

// ===== MEMBER CARD INTERACTIONS DISABLED =====
function initMemberCardEffects() {
    const memberCards = document.querySelectorAll('.member-card');
    // All member card animations removed for static display
    console.log('Member card effects disabled - static display mode');
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('.member-card, .gallery-item, .social-link');
    
    interactiveElements.forEach(element => {
        // Make focusable
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Add keyboard event handlers
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Announce theme changes to screen readers
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            const announcement = `Switched to ${currentTheme} mode`;
            
            // Create and announce to screen readers
            const announcer = document.createElement('div');
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
            announcer.textContent = announcement;
            
            document.body.appendChild(announcer);
            setTimeout(() => announcer.remove(), 1000);
        });
    }
}

// ===== ERROR HANDLING =====
function initErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
        console.error('Website Error:', e.error);
        
        // Could send error reports to analytics service
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                'description': e.error?.toString() || 'Unknown error',
                'fatal': false
            });
        }
    });
    
    // Handle images that fail to load
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            console.warn('Failed to load image:', img.src);
        });
    });
}

// ===== SOCIAL MEDIA INTEGRATION =====
function initSocialFeatures() {
    // Add click tracking for social links
    const socialLinks = document.querySelectorAll('.social-link, .social-btn');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = link.classList.contains('linkedin') ? 'LinkedIn' : 
                           link.classList.contains('github') ? 'GitHub' : 
                           link.classList.contains('whatsapp') ? 'WhatsApp' :
                           link.classList.contains('facebook') ? 'Facebook' :
                           link.classList.contains('instagram') ? 'Instagram' : 'Unknown';
            
            console.log(`Social link clicked: ${platform}`);
            
            // Track with analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'platform': platform,
                    'url': link.href
                });
            }
        });
    });
}

// ===== CONTACT FORM ENHANCEMENTS =====
function initContactFeatures() {
    // Add click-to-copy functionality for contact information
    const phoneNumbers = document.querySelectorAll('[href^="tel:"], .contact-item span');
    const emailLinks = document.querySelectorAll('[href^="mailto:"]');
    
    [...phoneNumbers, ...emailLinks].forEach(element => {
        if (element.textContent && element.textContent.trim()) {
            element.style.cursor = 'pointer';
            element.title = 'Click to copy';
            
            element.addEventListener('click', async (e) => {
                if (!e.target.closest('a')) {
                    e.preventDefault();
                    
                    try {
                        await navigator.clipboard.writeText(element.textContent.trim());
                        
                        // Show feedback
                        const originalText = element.textContent;
                        element.textContent = 'Copied!';
                        setTimeout(() => {
                            element.textContent = originalText;
                        }, 1500);
                    } catch (err) {
                        console.error('Failed to copy text:', err);
                    }
                }
            });
        }
    });
}

// ===== ADVANCED ANIMATIONS DISABLED =====
function initAdvancedAnimations() {
    // All advanced animations removed for static display
    console.log('Advanced animations disabled - static display mode');
}

// ===== INITIALIZE ADDITIONAL FEATURES =====
// Call additional initialization functions
setTimeout(() => {
    initButtonEffects();
    initMemberCardEffects();
    initPerformanceOptimizations();
    initAccessibility();
    initErrorHandling();
    initSocialFeatures();
    initContactFeatures();
    initAdvancedAnimations();
}, 1000);

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeWebsite,
        toggleTheme,
        setTheme,
        initTypewriterEffect,
        debounce,
        throttle
    };
}