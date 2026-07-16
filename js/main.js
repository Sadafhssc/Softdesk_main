/**
 * SOFTDESK Website JavaScript
 * Interactive functionality and animations
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTextRotator();
    initScrollEffects();
    initGallery();
    initAnimations();
    initStarAnimations();
    initLightbox();
    initResponsiveFeatures();
    console.log('SOFTDESK website initialized successfully!');
});

/**
 * Navigation Functionality
 */
function initNavigation() {

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Scroll button functionality
    const scrollBtn = document.querySelector('.scroll-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const targetSection = document.getElementById('about');
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
        
        // Keyboard support
        scrollBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollBtn.click();
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (correspondingLink) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
}

/**
 * Text Rotator Functionality
 */
function initTextRotator() {
    const rotatorElement = document.getElementById('typewriter');
    const pauseBtn = document.getElementById('rotator-pause');
    
    if (!rotatorElement) return;
    
    const phrases = [
        "Innovating the Future",
        "Empowering Students", 
        "Building Tomorrow's Tech",
        "Connecting Minds",
        "Creating Excellence"
    ];
    
    let currentIndex = 0;
    let isPaused = false;
    let intervalId = null;
    
    function updateText() {
        const phrase = phrases[currentIndex];
        if (phrase === "Innovating the Future") {
            // Create spans for each letter
            const letters = phrase.split('');
            rotatorElement.innerHTML = letters.map(letter => 
                letter === ' ' ? '<span class="letter space">&nbsp;</span>' : `<span class="letter">${letter}</span>`
            ).join('');
        } else {
            rotatorElement.textContent = phrase;
        }
        currentIndex = (currentIndex + 1) % phrases.length;
    }
    
    function startRotator() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(updateText, 3000); // Change every 3 seconds
        if (pauseBtn) pauseBtn.textContent = '⏸️';
        isPaused = false;
    }
    
    function pauseRotator() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        if (pauseBtn) pauseBtn.textContent = '▶️';
        isPaused = true;
    }
    
    // Start with first phrase
    updateText();
    
    // Start rotating
    setTimeout(startRotator, 2000); // Start after 2 seconds
    
    // Pause/resume button
    if (pauseBtn) {
        pauseBtn.style.display = 'inline-block';
        pauseBtn.addEventListener('click', () => {
            if (isPaused) {
                startRotator();
            } else {
                pauseRotator();
            }
        });
        
        // Keyboard support
        pauseBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                pauseBtn.click();
            }
        });
    }
    
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        pauseRotator();
    }
}

/**
 * Scroll Effects and Animations
 */
function initScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.hero-card, .about-card, .member-card, .event-card, .gallery-item, .advisor-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

/**
 * Gallery Functionality
 */
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add power-element class to gallery items
    galleryItems.forEach(item => {
        item.classList.add('power-element');
    });

    // Gallery filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Gallery hover effects disabled for static display
    galleryItems.forEach(item => {
        // All gallery animations removed
    });
}

/**
 * Star Animation Enhancement
 */
function initStarAnimations() {
    const starsContainer = document.querySelector('.stars-container');
    
    // Add more stars dynamically
    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 8 + 4;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's';
        
        return star;
    }

    // Add additional stars for a more dynamic effect
    if (starsContainer) {
        for (let i = 0; i < 15; i++) {
            const star = createStar();
            starsContainer.appendChild(star);
        }
    }

    // Mouse movement parallax effect for stars
    document.addEventListener('mousemove', (e) => {
        const stars = document.querySelectorAll('.star');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        stars.forEach((star, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            star.style.transform = `translate(${x}px, ${y}px) ${star.style.transform.includes('rotate') ? star.style.transform.split('translate')[1] || '' : ''}`;
        });
    });
}

/**
 * Lightbox Functionality
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const viewBtns = document.querySelectorAll('.view-btn');

    // Open lightbox
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const galleryItem = this.closest('.gallery-item');
            const img = galleryItem.querySelector('img');
            const title = galleryItem.querySelector('.gallery-overlay h3').textContent;
            const description = galleryItem.querySelector('.gallery-overlay p').textContent;
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add fade in animation
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block' && e.key === 'Escape') {
            closeLightbox();
        }
    });
}

/**
 * General Animations
 */
function initAnimations() {
    // Counter animation for statistics (if you want to add later)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let count = 0;
            
            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Button hover effects disabled for static display
    const buttons = document.querySelectorAll('.btn');
    // All button animations removed

    // Timeline marker pulse animation moved to script.js
    // Enhanced timeline animations handled in script.js
}

/**
 * Responsive Features
 */
function initResponsiveFeatures() {
    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }

        // Adjust star positions on resize
        adjustStarPositions();
    });

    function adjustStarPositions() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            // Reset transform to avoid conflicts
            star.style.transform = '';
        });
    }

    // Touch device optimization
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Optimize hover effects for touch devices
        const hoverElements = document.querySelectorAll('.hero-card, .about-card, .member-card, .gallery-item');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
}

/**
 * Utility Functions
 */

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-orange);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 18px;
        box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    scrollBtn.addEventListener('click', scrollToTop);
}

// Call the scroll to top function
addScrollToTopButton();

/**
 * Form Handling (if you add contact forms later)
 */
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Message sent successfully!', 'success');
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Performance Optimization
 */

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce function for performance
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

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Put scroll-heavy operations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

/**
 * Error Handling
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send error reports to a logging service here
});

// Console welcome message
console.log(`
%c🌟 SOFTDESK Website %c
%cWelcome to the SOFTDESK Student Software Society website!
Built with modern web technologies and lots of ❤️

For technical support, contact: softdesk@uettaxila.edu.pk
`, 
'color: #FF6B35; font-size: 20px; font-weight: bold;',
'',
'color: #546E7A; font-size: 14px;'
);

// Export functions for potential use in other scripts
window.SOFTDESK = {
    scrollToTop,
    showNotification,
    debounce
};