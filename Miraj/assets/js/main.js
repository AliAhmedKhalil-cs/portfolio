/* Miraj interactions */
(() => {
  const body = document.body;
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const overlay = document.querySelector('[data-nav-overlay]');

  const openMenu = () => {
    if (!mobileMenu || !overlay || !menuBtn) return;
    mobileMenu.classList.add('open');
    overlay.classList.add('show');
    body.classList.add('nav-open');
    menuBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    if (!mobileMenu || !overlay || !menuBtn) return;
    mobileMenu.classList.remove('open');
    overlay.classList.remove('show');
    body.classList.remove('nav-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  if (menuBtn && mobileMenu && overlay) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Active nav link based on data-page
  const pageKey = body.getAttribute('data-page');
  if (pageKey) {
    document.querySelectorAll('[data-nav-link]').forEach(link => {
      if (link.getAttribute('data-nav-link') === pageKey) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
  }

  // Simple slider
  const slider = document.querySelector('[data-slider]');
  if (slider) {
    const track = slider.querySelector('[data-slider-track]');
    const slides = slider.querySelectorAll('[data-slide]');
    const prevBtn = slider.querySelector('[data-prev]');
    const nextBtn = slider.querySelector('[data-next]');
    let index = 0;

    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    const goPrev = () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    };

    const goNext = () => {
      index = (index + 1) % slides.length;
      update();
    };

    prevBtn?.addEventListener('click', goPrev);
    nextBtn?.addEventListener('click', goNext);

    // Auto play light
    setInterval(goNext, 7000);
  }

  // Booking form fake submit
  const bookingForm = document.querySelector('[data-booking-form]');
  const successMsg = document.querySelector('[data-success-msg]');
  if (bookingForm && successMsg) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      successMsg.style.display = 'block';
      bookingForm.reset();
    });
  }
})();
