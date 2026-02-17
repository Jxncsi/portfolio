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
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
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
            let subject = encodeURIComponent(`Üzenet a portfólióról`);
            let bodyContent = encodeURIComponent(message);
            let gmailLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=janos.molnar828@gmail.com&su=${subject}&body=${bodyContent}`;

            window.open(gmailLink, '_blank');

            if (formFeedback) {
                formFeedback.innerText = `A Gmail megnyitása a levél elküldéséhez...`;
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