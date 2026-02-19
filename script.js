/**
 * ========================================
 * PORTFÓLIÓ JAVASCRIPT LOGIKA
 * ========================================
 */

// --- 1. MOBIL MENÜ & SMART NAVBAR KEZELÉSE ---
let header = document.querySelector('header');
let hamburger = document.getElementById('hamburger');
let navLinks = document.getElementById('nav-links');

// A navbar mindig látható marad görgetéskor is

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Görgetés tiltása/engedélyezése a menü állapota alapján
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto'; // Görgetés visszaállítása
        });
    });
}


// --- 2. SÖTÉT/VILÁGOS MÓD VÁLTÓ ---
let themeToggle = document.getElementById('theme-toggle');
let body = document.body;

if (themeToggle) {
    let icon = themeToggle.querySelector('i');

    let currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        let theme = 'light';
        if (body.classList.contains('dark-mode')) {
            theme = 'dark';
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            if (icon) icon.classList.replace('fa-sun', 'fa-moon');
        }

        localStorage.setItem('theme', theme);
    });
}


// --- 3. SCROLL REVEAL (INTERSECTION OBSERVER) ---
let revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
    let revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    let revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
}


// --- 4. KAPCSOLAT ÜRLAP VALIDÁCIÓ ---
let contactForm = document.getElementById('contact-form');
let formFeedback = document.getElementById('form-feedback');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let message = document.getElementById('message').value;

        if (message) {
            // Email küldés nincs implementálva, csak demó
            if (formFeedback) {
                formFeedback.innerText = `Üzenet elküldve!`;
                formFeedback.classList.add('success');
            }

            contactForm.reset();

            setTimeout(() => {
                if (formFeedback) {
                    formFeedback.classList.remove('success');
                    formFeedback.innerText = '';
                }
            }, 5000);
        }
    });
}

// --- 5. FORRÁSOK MODAL KEZELÉSE ---
let sourcesLink = document.getElementById('sources-link');
let sourcesModal = document.getElementById('sources-modal');
let closeModal = document.querySelector('.close-modal');

if (sourcesLink && sourcesModal && closeModal) {
    sourcesLink.addEventListener('click', (e) => {
        e.preventDefault();
        sourcesModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Görgetés letiltása
    });

    closeModal.addEventListener('click', () => {
        sourcesModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Görgetés újraengedélyezése
    });

    // Bezárás a modalon kívülre kattintva
    window.addEventListener('click', (e) => {
        if (e.target === sourcesModal) {
            sourcesModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}