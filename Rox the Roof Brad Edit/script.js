document.addEventListener('DOMContentLoaded', function () {

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Active Link Highlighting (Simple URL check)
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    if (lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function () {
                const placeholderUrl = 'https://images.unsplash.com/photo-1632759145351-1d592919f522?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                lightbox.style.display = "block";
                lightboxImg.src = placeholderUrl;
            });
        });

        if (closeLightbox) {
            closeLightbox.addEventListener('click', function () {
                lightbox.style.display = "none";
            });
        }

        window.addEventListener('click', function (e) {
            if (e.target == lightbox) {
                lightbox.style.display = "none";
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !phone || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate form submission
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! We will get back to you shortly.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Hero Form Handling
    const heroForm = document.getElementById('heroForm');
    if (heroForm) {
        heroForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = heroForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = 'Submitting...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Request received! We will contact you shortly.');
                heroForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Chatbot Widget Logic
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');

    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', function () {
            chatbotWindow.classList.toggle('active');
            const icon = chatbotToggle.querySelector('i');
            if (chatbotWindow.classList.contains('active')) {
                icon.classList.remove('fa-comment-alt');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-comment-alt');
            }
        });

        if (chatbotClose) {
            chatbotClose.addEventListener('click', function () {
                chatbotWindow.classList.remove('active');
                const icon = chatbotToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-comment-alt');
            });
        }
    }
});
