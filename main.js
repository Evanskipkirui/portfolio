/* ============================================
   NAVBAR — scroll + active link behaviour
   ============================================ */
const navbar        = document.getElementById('navbar');
const navToggle     = document.getElementById('navToggle');
const navLinksEl    = document.getElementById('navLinks');
const navAnchors    = navLinksEl.querySelectorAll('a');
const sections      = document.querySelectorAll('main section[id]');

// Sticky header & active link highlight
window.addEventListener('scroll', () => {
  // Scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Active section highlight
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - navbar.offsetHeight - 20) {
      current = section.id;
    }
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

/* ============================================
   MOBILE NAV TOGGLE
   ============================================ */
navToggle.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close on any link click
navAnchors.forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    navLinksEl.classList.remove('open');
    navToggle.classList.remove('open');
  }
});

/* ============================================
   SMOOTH SCROLL — offset for fixed navbar
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const offset = target.offsetTop - navbar.offsetHeight - 12;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ============================================
   SCROLL REVEAL — Intersection Observer
   ============================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Stagger siblings for a cascading effect
      const parent   = entry.target.parentElement;
      const siblings = [...parent.children].filter(c =>
        c.classList.contains(entry.target.classList[0])
      );
      const index  = siblings.indexOf(entry.target);
      const delay  = Math.min(index * 90, 400); // cap at 400 ms

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Observe all animated elements
document.querySelectorAll(
  '.reveal, .timeline-item, .skill-category, .stat-card, .edu-card'
).forEach(el => revealObserver.observe(el));

/* ============================================
   TYPED HERO SUBTITLE — optional subtle effect
   Loop through key terms in the hero subtitle
   ============================================ */
(function initHeroAnimation() {
  const heroName = document.querySelector('.hero-name');
  if (!heroName) return;

  // Simple entrance: fade + slight rise already handled by CSS initial opacity
  // Add a class after a short delay so the animation fires after page paint
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-subtitle, .hero-cta, .hero-tech').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = `opacity 0.55s ease ${i * 110}ms, transform 0.55s ease ${i * 110}ms`;
      // Trigger after next paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = '';
          el.style.transform = '';
        });
      });
    });
  });
})();

/* ============================================
   CONTACT FORM
   ============================================ */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const formEmailSubject = document.getElementById('formEmailSubject');

    formStatus.className = 'form-status';

    if (!phone.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
      formStatus.textContent = 'Please fill in all fields before sending.';
      formStatus.classList.add('error');
      return;
    }

    // Basic phone check allows numbers, spaces and common symbols.
    const phonePattern = /^[+]?[-()\s\d]{7,20}$/;
    if (!phonePattern.test(phone.value.trim())) {
      formStatus.textContent = 'Please enter a valid phone number.';
      formStatus.classList.add('error');
      return;
    }

    if (!email.checkValidity()) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.classList.add('error');
      return;
    }

    if (formEmailSubject) {
      formEmailSubject.value = `Portfolio Inquiry: ${subject.value.trim()}`;
    }

    formStatus.textContent = 'Sending your inquiry...';
    formStatus.classList.add('sending');

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      formStatus.className = 'form-status success';
      formStatus.textContent = 'Inquiry sent successfully. Thank you!';
      contactForm.reset();
    } catch (error) {
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Unable to send right now. Please use the email link below.';
    }
  });
}
