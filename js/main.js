/**
 * NE Simel Associates - Main JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar scroll handler
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Animated Counter for Stats
    const counterElements = document.querySelectorAll('.stat-number');
    if (counterElements.length > 0) {
        const runCounter = () => {
            counterElements.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                const count = parseInt(counter.innerText, 10);
                const duration = 2000; // 2 seconds
                const stepTime = Math.abs(Math.floor(duration / target));
                
                if (count === 0 && target > 0) {
                    let current = 0;
                    const timer = setInterval(() => {
                        current += Math.ceil(target / 50); // Increment size
                        if (current >= target) {
                            counter.innerText = target + (counter.getAttribute('data-suffix') || '');
                            clearInterval(timer);
                        } else {
                            counter.innerText = current;
                        }
                    }, 30);
                }
            });
        };

        // Scroll listener to trigger stats counters once visible
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            let triggered = false;
            const checkVisibility = () => {
                const rect = statsSection.getBoundingClientRect();
                const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
                if (!(rect.bottom < 0 || rect.top - viewHeight >= 0) && !triggered) {
                    triggered = true;
                    runCounter();
                    window.removeEventListener('scroll', checkVisibility);
                }
            };
            window.addEventListener('scroll', checkVisibility);
            checkVisibility(); // Initial check
        }
    }

    // 3. Swiper Slider for Testimonials
    if (document.querySelector('.testimonials-slider')) {
        new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // 4. Contact Form Validation and Success Interaction
    const contactForm = document.getElementById('lawContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get inputs
            const nameInput = document.getElementById('formName');
            const emailInput = document.getElementById('formEmail');
            const phoneInput = document.getElementById('formPhone');
            const subjectInput = document.getElementById('formSubject');
            const messageInput = document.getElementById('formMessage');
            const statusDiv = document.getElementById('formStatus');
            
            let isValid = true;
            let errorMessage = '';

            // Reset outline
            [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
                if (input) input.classList.remove('is-invalid');
            });

            // Name check
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
                errorMessage += 'Name is required.<br>';
            }

            // Email check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
                errorMessage += 'A valid email is required.<br>';
            }

            // Phone check
            if (!phoneInput.value.trim()) {
                phoneInput.classList.add('is-invalid');
                isValid = false;
                errorMessage += 'Phone number is required.<br>';
            }

            // Message check
            if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
                messageInput.classList.add('is-invalid');
                isValid = false;
                errorMessage += 'Message must be at least 10 characters long.<br>';
            }

            if (!isValid) {
                statusDiv.className = 'alert alert-danger mt-3';
                statusDiv.innerHTML = errorMessage;
                statusDiv.style.display = 'block';
                return;
            }

            // Mock success submit
            statusDiv.className = 'alert alert-success mt-3';
            statusDiv.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Thank you! Your consultation request has been sent successfully. One of our advocates will contact you shortly.';
            statusDiv.style.display = 'block';
            
            contactForm.reset();
        });
    }

    // 5. Dynamic Footer Copyright Year
    const yearSpan = document.getElementById('copyrightYear');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // 6. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-quad',
            disable: 'mobile'
        });
    }
});
