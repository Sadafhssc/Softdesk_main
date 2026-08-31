/**
 * SOFTDESK — site interactions
 * Nav (scroll state, active link, mobile menu), theme toggle,
 * gallery lightbox, back-to-top, scroll reveal, subtle parallax.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initGalleryLightbox();
    initBackToTop();
    initScrollReveal();
    initParallax();
});

/* ---------- Navigation ---------- */
function initNav() {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('main section[id]');

    // Scrolled state
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
        updateActiveLink();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu
    navToggle?.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => closeMobileMenu());
    });

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    function updateActiveLink() {
        let current = sections[0]?.id;
        const scrollPos = window.scrollY + 140;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) current = section.id;
        });

        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${current}`;
            link.classList.toggle('active', isActive);
        });
    }

    updateActiveLink();
}

/* ---------- Gallery lightbox ---------- */
function initGalleryLightbox() {
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    if (!items.length) return;

    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    const slides = items.map(item => ({
        src: item.querySelector('img').src,
        title: item.querySelector('.gallery-caption')?.textContent || ''
    }));

    let index = 0;

    items.forEach((item, i) => {
        item.addEventListener('click', () => open(i));
    });

    function open(i) {
        index = i;
        render();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function close() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function render() {
        const slide = slides[index];
        lightboxImg.src = slide.src;
        lightboxImg.alt = slide.title;
        lightboxTitle.textContent = slide.title;
    }

    function next() { index = (index + 1) % slides.length; render(); }
    function prev() { index = (index - 1 + slides.length) % slides.length; render(); }

    closeBtn.addEventListener('click', close);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('in-view'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(el => observer.observe(el));
}

/* ---------- Subtle hero parallax ---------- */
function initParallax() {
    const mark = document.querySelector('.hero-mark');
    if (!mark) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const offset = Math.min(window.scrollY * 0.06, 40);
            mark.style.transform = `translateY(${offset}px)`;
            ticking = false;
        });
    }, { passive: true });
}

/* ---------- Back to top ---------- */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
