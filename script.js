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

  const originals = Array.from(track.querySelectorAll('.testimonial-card'));
  if (originals.length === 0) return;

  // Triple clone for true infinite feel (Original - CloneA - CloneB)
  // This ensures that even on huge screens, we have enough content to scroll
  originals.forEach(card => {
    track.appendChild(card.cloneNode(true)).setAttribute('aria-hidden', 'true');
  });
  originals.forEach(card => {
    track.appendChild(card.cloneNode(true)).setAttribute('aria-hidden', 'true');
  });

  const SPEED = 0.6;
  let isHovered = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragScrollStart = 0;
  let hasDragged = false;
  let loopWidth = 0;

  function updateLoopBoundary() {
    // The loop boundary is the total width of one full set of testimonials
    // We use the offset of the first card in the second set
    const firstClone = track.children[originals.length];
    if (firstClone) {
      loopWidth = firstClone.offsetLeft - track.children[0].offsetLeft;
    } else {
      loopWidth = track.scrollWidth / 3;
    }
  }

  // Initial setup after layout
  requestAnimationFrame(() => {
    updateLoopBoundary();

    // Start in the middle set to allow dragging backwards immediately
    track.scrollLeft = loopWidth;

    function tick() {
      if (!isHovered && !isDragging) {
        track.scrollLeft += SPEED;

        // If we've scrolled past the first set of clones into the second set, 
        // jump back by one loopWidth to stay in the "middle" seamless zone
        if (track.scrollLeft >= loopWidth * 2) {
          track.scrollLeft -= loopWidth;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  // Handle window resize to re-calculate boundaries
  window.addEventListener('resize', updateLoopBoundary);

  // Interaction handlers
  track.addEventListener('mouseenter', () => { isHovered = true; });
  track.addEventListener('mouseleave', () => { isHovered = false; });

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

    // Wrap during drag
    if (newScroll < loopWidth) newScroll += loopWidth;
    if (newScroll >= loopWidth * 2) newScroll -= loopWidth;

    track.scrollLeft = newScroll;
  });

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
    isHovered = true;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    isHovered = false;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - touchStartX) * 1.5;
    let newScroll = touchScrollStart - walk;

    if (newScroll < loopWidth) newScroll += loopWidth;
    if (newScroll >= loopWidth * 2) newScroll -= loopWidth;

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
