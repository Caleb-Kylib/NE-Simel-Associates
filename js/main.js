/**
 * NE Simel Associates — Main JavaScript
 * Upgraded with page transitions, floating CTA, typewriter, reading progress,
 * service quick-nav, and enhanced form states.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. PAGE FADE-IN
       ========================================================= */
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add('page-loaded');
        });
    });

    /* =========================================================
       2. PAGE EXIT TRANSITION (internal links)
       ========================================================= */
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (
            href &&
            !href.startsWith('#') &&
            !href.startsWith('mailto:') &&
            !href.startsWith('tel:') &&
            !href.startsWith('http') &&
            link.target !== '_blank' &&
            !link.classList.contains('floating-cta')
        ) {
            link.addEventListener('click', (e) => {
                if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                e.preventDefault();
                const dest = link.href;
                document.body.classList.remove('page-loaded');
                document.body.classList.add('page-exit');
                setTimeout(() => { window.location.href = dest; }, 360);
            });
        }
    });

    /* =========================================================
       3. STICKY NAVBAR SCROLL HANDLER
       ========================================================= */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    /* =========================================================
       4. FLOATING BOOK CONSULTATION CTA (all pages)
       ========================================================= */
    const floatingCta = document.createElement('a');
    floatingCta.href = 'contact.html';
    floatingCta.className = 'floating-cta';
    floatingCta.setAttribute('aria-label', 'Book a Consultation');
    floatingCta.innerHTML = '<i class="bi bi-calendar-check-fill"></i><span class="fcta-text">Book Consultation</span>';
    document.body.appendChild(floatingCta);

    const whatsappCta = document.createElement('a');
    whatsappCta.href = 'https://wa.me/254703758251?text=Hello%20NE%20Simel%20Associates%2C%20I%20would%20like%20to%20ask%20about%20booking%20a%20consultation.';
    whatsappCta.className = 'whatsapp-cta';
    whatsappCta.target = '_blank';
    whatsappCta.rel = 'noopener noreferrer';
    whatsappCta.setAttribute('aria-label', 'Contact NE Simel Associates on WhatsApp');
    whatsappCta.innerHTML = '<i class="bi bi-whatsapp" aria-hidden="true"></i><span>WhatsApp</span>';
    document.body.appendChild(whatsappCta);

    /* =========================================================
       5. HERO TYPEWRITER (index.html only)
       ========================================================= */
    const typewriterEl = document.getElementById('heroTypewriter');
    if (typewriterEl) {
        const words = ['Solutions', 'Counsel', 'Advocacy', 'Representation'];
        let wIndex = 0, cIndex = 0, deleting = false;
        const TYPE_SPEED = 90, DELETE_SPEED = 55, PAUSE_END = 1800, PAUSE_START = 350;

        function typeLoop() {
            const currentWord = words[wIndex];
            if (!deleting) {
                typewriterEl.textContent = currentWord.substring(0, cIndex + 1);
                cIndex++;
                if (cIndex === currentWord.length) {
                    deleting = true;
                    setTimeout(typeLoop, PAUSE_END);
                    return;
                }
                setTimeout(typeLoop, TYPE_SPEED);
            } else {
                typewriterEl.textContent = currentWord.substring(0, cIndex - 1);
                cIndex--;
                if (cIndex === 0) {
                    deleting = false;
                    wIndex = (wIndex + 1) % words.length;
                    setTimeout(typeLoop, PAUSE_START);
                    return;
                }
                setTimeout(typeLoop, DELETE_SPEED);
            }
        }
        setTimeout(typeLoop, 900);
    }

    /* =========================================================
       6. ANIMATED STAT COUNTER (with gold glow class)
       ========================================================= */
    const counterElements = document.querySelectorAll('.stat-number');
    if (counterElements.length > 0) {
        const runCounter = () => {
            counterElements.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                const suffix = counter.getAttribute('data-suffix') || '';
                let current = 0;
                counter.classList.add('counting');
                const timer = setInterval(() => {
                    current += Math.ceil(target / 50);
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(timer);
                        setTimeout(() => counter.classList.remove('counting'), 400);
                    } else {
                        counter.textContent = current;
                    }
                }, 30);
            });
        };

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            let triggered = false;
            const obs = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !triggered) {
                    triggered = true;
                    runCounter();
                    obs.disconnect();
                }
            }, { threshold: 0.3 });
            obs.observe(statsSection);
        }
    }

    /* =========================================================
       7. SWIPER TESTIMONIALS CAROUSEL
       ========================================================= */
    if (document.querySelector('.testimonials-slider')) {
        new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
            }
        });
    }

    /* =========================================================
       8. CONTACT FORM — Loading & Success States
       ========================================================= */
    const contactForm = document.getElementById('lawContactForm');
    if (contactForm) {
        let submitBtn = contactForm.querySelector('[type="submit"]');
        if (submitBtn && !submitBtn.id) submitBtn.id = 'submitBtn';

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput    = document.getElementById('formName');
            const emailInput   = document.getElementById('formEmail');
            const phoneInput   = document.getElementById('formPhone');
            const messageInput = document.getElementById('formMessage');
            const statusDiv    = document.getElementById('formStatus');
            submitBtn = document.getElementById('submitBtn') || contactForm.querySelector('[type="submit"]');

            let isValid = true, errorMessage = '';
            [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
                if (input) input.classList.remove('is-invalid');
            });

            if (!nameInput || !emailInput || !phoneInput || !messageInput) return;
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
                errorMessage += 'Full name is required.<br>';
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
                errorMessage += 'A valid email address is required.<br>';
            }
            if (!phoneInput.value.trim()) {
                phoneInput.classList.add('is-invalid');
                isValid = false;
                errorMessage += 'Phone number is required.<br>';
            }
            if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
                messageInput.classList.add('is-invalid');
                isValid = false;
                errorMessage += 'Message must be at least 10 characters.<br>';
            }

            if (!isValid) {
                if (statusDiv) {
                    statusDiv.className = 'alert alert-danger mt-3';
                    statusDiv.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>' + errorMessage;
                    statusDiv.setAttribute('role', 'alert');
                    statusDiv.style.display = 'block';
                }
                return;
            }

            // Static sites cannot deliver form data. Open a prefilled email draft and
            // tell the visitor explicitly that they still need to send it.
            const subjectSelect = document.getElementById('formSubject');
            const contactPreference = document.getElementById('formContactPreference');
            const subject = subjectSelect && subjectSelect.value
                ? subjectSelect.options[subjectSelect.selectedIndex].text
                : 'Consultation request';
            const body = [
                `Name: ${nameInput.value.trim()}`,
                `Email: ${emailInput.value.trim()}`,
                `Phone: ${phoneInput.value.trim()}`,
                `Practice area: ${subject}`,
                `Preferred contact method: ${contactPreference ? contactPreference.value : 'Email'}`,
                '',
                'Message:',
                messageInput.value.trim()
            ].join('\n');
            if (statusDiv) {
                statusDiv.className = 'alert alert-info mt-3';
                statusDiv.innerHTML = '<i class="bi bi-info-circle-fill me-2"></i>Your email app should open with your request. Please review it and press Send. If it does not open, email <a href="mailto:simeladvocates@gmail.com">simeladvocates@gmail.com</a>. For your privacy, do not include confidential details until the firm confirms a secure way to share them.';
                statusDiv.style.display = 'block';
                statusDiv.setAttribute('role', 'status');
            }
            window.location.href = `mailto:simeladvocates@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }

    /* =========================================================
       9. DYNAMIC COPYRIGHT YEAR
       ========================================================= */
    const yearSpan = document.getElementById('copyrightYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    /* =========================================================
       10. AOS INITIALISE
       ========================================================= */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            once: true,
            easing: 'ease-out-quad',
            offset: 60,
        });
    }

    /* =========================================================
       11. SERVICES QUICK-JUMP NAV — Active pill highlight on scroll
       ========================================================= */
    const snavPills = document.querySelectorAll('.snav-pill[href^="#"]');
    if (snavPills.length > 0) {
        const sections = Array.from(snavPills).map(p => document.querySelector(p.getAttribute('href'))).filter(Boolean);
        const snavObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    snavPills.forEach(p => p.classList.remove('active'));
                    const activePill = document.querySelector(`.snav-pill[href="#${entry.target.id}"]`);
                    if (activePill) {
                        activePill.classList.add('active');
                        activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                }
            });
        }, { threshold: 0.3, rootMargin: '-80px 0px -45% 0px' });
        sections.forEach(sec => snavObs.observe(sec));
    }

    /* =========================================================
       12. READING PROGRESS BAR (article & insights pages)
       ========================================================= */
    const progressBar = document.getElementById('readingProgress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const docEl = document.documentElement;
            const scrollTop = window.scrollY || docEl.scrollTop;
            const scrollHeight = docEl.scrollHeight - docEl.clientHeight;
            progressBar.style.width = scrollHeight > 0 ? (scrollTop / scrollHeight * 100) + '%' : '0%';
        }, { passive: true });
    }

    /* INSIGHTS SEARCH AND CATEGORY FILTER */
    const insightSearch = document.getElementById('insightSearch');
    const insightCategory = document.getElementById('insightCategory');
    const insightCards = Array.from(document.querySelectorAll('#insightGrid .insight-card'));
    const insightStatus = document.getElementById('insightResultsStatus');
    const filterInsights = () => {
        const query = insightSearch ? insightSearch.value.trim().toLocaleLowerCase() : '';
        const category = insightCategory ? insightCategory.value : '';
        let visible = 0;
        insightCards.forEach(card => {
            const text = card.textContent.toLocaleLowerCase();
            const categoryLabel = card.querySelector('.insight-card-category');
            const cardCategory = card.dataset.category || (categoryLabel ? categoryLabel.textContent.trim().toLocaleLowerCase() : '');
            const show = (!query || text.includes(query)) && (!category || cardCategory === category);
            card.closest('.col-md-6').hidden = !show;
            if (show) visible++;
        });
        if (insightStatus) insightStatus.textContent = `${visible} article${visible === 1 ? '' : 's'} shown`;
    };
    if (insightSearch) insightSearch.addEventListener('input', filterInsights);
    if (insightCategory) insightCategory.addEventListener('change', filterInsights);

    /* REDUCE MOTION: keep animated content visible for users who request it */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
        document.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
    }

});

