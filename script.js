/* ============================================
   SERGIO RIVAS BUENO — Portfolio JS
   Animations, navigation, filters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Cursor Glow ---
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            });
        });
    }

    // --- Navbar scroll ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }, { passive: true });

    // --- Mobile menu ---
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // --- Scroll animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // --- Skill bars animation ---
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-card__fill').forEach((fill, i) => {
                    setTimeout(() => {
                        fill.classList.add('animate');
                    }, i * 150);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const skillsGrid = document.querySelector('.skills__grid');
    if (skillsGrid) {
        skillObserver.observe(skillsGrid);
    }

    // --- Project Filters ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- Hero timecode counter ---
    const timecode = document.querySelector('.hero__timecode');
    if (timecode) {
        let seconds = 0;
        setInterval(() => {
            seconds++;
            const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
            const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
            const s = String(seconds % 60).padStart(2, '0');
            timecode.textContent = `REC ● ${h}:${m}:${s}`;
        }, 1000);
    }

    // --- Smooth scroll for nav links ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Image fallback (use hqdefault if maxresdefault fails or returns placeholder) ---
    document.querySelectorAll('.project-card__thumb img').forEach(img => {
        function checkAndFallback() {
            if (img.src.includes('maxresdefault') && (img.naturalWidth === 0 || img.naturalWidth === 120)) {
                img.src = img.src.replace('maxresdefault', 'hqdefault');
            }
        }
        img.addEventListener('error', function() {
            if (this.src.includes('maxresdefault')) {
                this.src = this.src.replace('maxresdefault', 'hqdefault');
            }
        });
        img.addEventListener('load', checkAndFallback);
        if (img.complete) {
            checkAndFallback();
        }
    });

    // --- Fade-in animation keyframe ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

});
