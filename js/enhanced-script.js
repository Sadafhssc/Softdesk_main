/**
 * SOFTDESK Enhanced Website Script
 * Modern, responsive, and animated functionality
 * Features: Framer Motion integration, particle effects, enhanced UI
 */

// ===== CONFIGURATION & GLOBALS =====
const CONFIG = {
    particleCount: window.innerWidth > 768 ? 50 : 25,
    animationDuration: 800,
    scrollOffset: 120,
    theme: {
        default: 'dark',
        storageKey: 'softdesk-theme'
    },
    typewriter: {
        phrases: [
            "Innovating the Future",
            "Empowering Students", 
            "Building Tomorrow's Tech",
            "Connecting Minds",
            "Creating Excellence"
        ],
        speed: 100,
        deleteSpeed: 50,
        pauseDuration: 2000
    }
};

let motionLib = null;
let particleSystem = null;
let isReducedMotion = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    checkReducedMotion();
    initializeTheme();
    initializeParticleSystem();
    initializeLoadingScreen();
    initializeNavigation();
    initializeAnimations();
    initializeInteractivity();
    initializeTypewriter();
    initializeMemberRibbon();
    initializeGallery();
    initializePerformanceOptimizations();
    
    console.log('🚀 SOFTDESK website initialized successfully!');
});

// ===== REDUCED MOTION CHECK =====
function checkReducedMotion() {
    isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Listen for changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        isReducedMotion = e.matches;
        if (isReducedMotion && particleSystem) {
            particleSystem.stop();
        } else if (!isReducedMotion && particleSystem) {
            particleSystem.start();
        }
    });
}

// ===== ANIMATIONS DISABLED =====
function initializeAnimations() {
    // All animations have been removed for static display
    console.log('Animations disabled - static display mode');
}

// ===== PARTICLE SYSTEM DISABLED =====
function initializeParticleSystem() {
    // Particle system disabled for static display
    console.log('Particle system disabled - static display mode');
}

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.isRunning = false;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < CONFIG.particleCount; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.isRunning = false;
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.reset(canvasWidth, canvasHeight);
        this.life = Math.random();
    }
    
    reset(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.005;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        
        // Reset particle when it dies or moves off screen
        if (this.life <= 0 || this.x < 0 || this.x > window.innerWidth || 
            this.y < 0 || this.y > window.innerHeight) {
            this.reset(window.innerWidth, window.innerHeight);
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity * this.life;
        
        // Create gradient for orange glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, '#ff8c00');
        gradient.addColorStop(0.5, '#ffa500');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ===== LOADING SCREEN SIMPLIFIED =====
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    // Hide loading screen immediately for static display
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1000);
}

// ===== ENHANCED NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Scroll effects
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll with adjustable durations
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transition = `transform var(--nav-hide-duration) ease-out`;
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transition = `transform var(--nav-show-duration) ease-out`;
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
        updateActiveNavLink();
    });
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = navbar ? navbar.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                closeMobileMenu();
            }
        });
    });
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function closeMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem(CONFIG.theme.storageKey);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme (default to dark as specified)
    const initialTheme = savedTheme || CONFIG.theme.default;
    setTheme(initialTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(CONFIG.theme.storageKey)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    localStorage.setItem(CONFIG.theme.storageKey, newTheme);
    
    // Announce theme change for accessibility
    announceToScreenReader(`Switched to ${newTheme} mode`);
}

function setTheme(theme) {
    const html = document.documentElement;
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        html.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.setAttribute('aria-checked', 'true');
    } else {
        body.classList.remove('dark-mode');
        html.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.setAttribute('aria-checked', 'false');
    }
    
    // Update theme-color meta tag
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
        themeColorMeta.content = theme === 'dark' ? '#0a0a0a' : '#ffffff';
    }
}

// ===== TYPEWRITER EFFECT DISABLED =====
function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    // Display static text instead of animated typewriter
    typewriterElement.textContent = 'Innovating the Future';
}

// ===== MEMBER RIBBON FUNCTIONALITY =====
function initializeMemberRibbon() {
    const ribbon = document.getElementById('membersRibbon');
    const prevBtn = document.getElementById('ribbonPrev');
    const nextBtn = document.getElementById('ribbonNext');
    
    if (!ribbon) return;
    
    let scrollAmount = 320; // Width of one member card plus gap
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            ribbon.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            ribbon.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
    
    // Update button states based on scroll position
    function updateButtonStates() {
        if (!prevBtn || !nextBtn) return;
        
        const isAtStart = ribbon.scrollLeft <= 0;
        const isAtEnd = ribbon.scrollLeft >= ribbon.scrollWidth - ribbon.clientWidth;
        
        prevBtn.disabled = isAtStart;
        nextBtn.disabled = isAtEnd;
        
        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
    }
    
    ribbon.addEventListener('scroll', updateButtonStates);
    updateButtonStates();
    
    // Touch/swipe support for mobile
    let isDown = false;
    let startX;
    let scrollLeft;
    
    ribbon.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - ribbon.offsetLeft;
        scrollLeft = ribbon.scrollLeft;
    });
    
    ribbon.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    ribbon.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    ribbon.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - ribbon.offsetLeft;
        const walk = (x - startX) * 2;
        ribbon.scrollLeft = scrollLeft - walk;
    });
}

// ===== ENHANCED GALLERY =====
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDescription');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        title: item.querySelector('h4')?.textContent || '',
        description: item.querySelector('p')?.textContent || ''
    }));
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        const expandBtn = item.querySelector('.gallery-expand');
        if (expandBtn) {
            expandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(index);
            });
        }
        
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        currentImageIndex = index;
        showImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showImage() {
        const image = images[currentImageIndex];
        if (lightboxImg) lightboxImg.src = image.src;
        if (lightboxTitle) lightboxTitle.textContent = image.title;
        if (lightboxDesc) lightboxDesc.textContent = image.description;
    }
    
    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage();
    }
    
    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage();
    }
    
    // Event listeners
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', showNext);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });
}

// ===== INTERACTIVITY SIMPLIFIED =====
function initializeInteractivity() {
    // Scroll to top button (no animations)
    initializeBackToTop();
    
    // Contact info click-to-copy
    initializeClickToCopy();
}

// Button effects disabled for static display
function initializeButtonEffects() {
    // All button animations removed
    console.log('Button effects disabled - static display mode');
}

function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initializeClickToCopy() {
    const copyElements = document.querySelectorAll('[href^="tel:"], [href^="mailto:"]');
    
    copyElements.forEach(element => {
        element.addEventListener('click', async (e) => {
            if (e.ctrlKey || e.metaKey) { // Only on Ctrl/Cmd + click
                e.preventDefault();
                
                let textToCopy = element.textContent.trim();
                if (element.href.startsWith('tel:')) {
                    textToCopy = element.href.replace('tel:', '');
                } else if (element.href.startsWith('mailto:')) {
                    textToCopy = element.href.replace('mailto:', '');
                }
                
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    showToast('Copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            }
        });
    });
}

// Member card animations disabled
function initializeMemberCards() {
    // All member card animations removed
    console.log('Member card animations disabled - static display mode');
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initializePerformanceOptimizations() {
    // Lazy load images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollEvents = [];
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            originalScrollEvents.forEach(fn => fn());
        }, 16); // ~60fps
    });
}

// ===== UTILITY FUNCTIONS =====
function announceToScreenReader(message) {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    setTimeout(() => announcer.remove(), 1000);
}

function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--accent-primary);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: toastSlideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, duration);
    
    // Add toast animations if not present
    if (!document.querySelector('#toast-keyframes')) {
        const style = document.createElement('style');
        style.id = 'toast-keyframes';
        style.textContent = `
            @keyframes toastSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes toastSlideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

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
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('SOFTDESK Website Error:', e.error);
    
    // Basic error tracking (could be expanded with analytics)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error?.toString() || 'Unknown error',
            'fatal': false
        });
    }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        toggleTheme,
        setTheme,
        ParticleSystem,
        debounce,
        throttle
    };
}

console.log('🎉 SOFTDESK Enhanced Script loaded successfully!');