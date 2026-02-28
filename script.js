// ===================================
// ROX THE ROOF - Single Page Script
// ===================================

document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initTestimonialsCarousel();
});

// Navbar scroll effect
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function () {
        menu.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll reveal animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.service-card, .visual-card, .testimonial-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ===================================
// TESTIMONIALS CAROUSEL — infinite smooth scroll
// ===================================
function initTestimonialsCarousel() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;

  // Clone all cards and append for seamless infinite loop
  const originals = Array.from(track.querySelectorAll('.testimonial-card'));
  originals.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  const SPEED = 0.6; // px per frame (~36px/s at 60fps)
  let isHovered = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragScrollStart = 0;
  let hasDragged = false;
  let loopBoundary = 0; // set after layout

  function isPaused() {
    return isHovered || isDragging;
  }

  // Measure the exact start of the cloned section after the browser lays out
  requestAnimationFrame(() => {
    // First clone is immediately after the originals
    const firstClone = track.children[originals.length];
    loopBoundary = firstClone ? firstClone.offsetLeft : track.scrollWidth / 2;

    // Continuous scroll tick
    function tick() {
      if (!isPaused()) {
        track.scrollLeft += SPEED;
        // When we've scrolled into the clone territory, seamlessly jump back
        if (track.scrollLeft >= loopBoundary) {
          track.scrollLeft -= loopBoundary;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  // Pause on hover, resume on leave
  track.addEventListener('mouseenter', () => { isHovered = true; });
  track.addEventListener('mouseleave', () => { isHovered = false; });

  // Drag to scroll while hovered
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    hasDragged = false;
    dragStartX = e.pageX - track.offsetLeft;
    dragScrollStart = track.scrollLeft;
    track.classList.add('is-dragging');
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      track.classList.remove('is-dragging');
    }
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - dragStartX) * 1.5;
    if (Math.abs(walk) > 5) hasDragged = true;
    let newScroll = dragScrollStart - walk;
    // Keep within the looping range
    if (newScroll < 0) newScroll += loopBoundary;
    if (newScroll >= loopBoundary) newScroll -= loopBoundary;
    track.scrollLeft = newScroll;
  });

  // Suppress click after drag
  track.addEventListener('click', (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Touch support
  let touchStartX = 0;
  let touchScrollStart = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX - track.offsetLeft;
    touchScrollStart = track.scrollLeft;
    isHovered = true; // pause auto-scroll on touch
  }, { passive: true });

  track.addEventListener('touchend', () => {
    isHovered = false;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - touchStartX) * 1.5;
    let newScroll = touchScrollStart - walk;
    if (newScroll < 0) newScroll += loopBoundary;
    if (newScroll >= loopBoundary) newScroll -= loopBoundary;
    track.scrollLeft = newScroll;
  }, { passive: true });
}

// Add animate-in styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
