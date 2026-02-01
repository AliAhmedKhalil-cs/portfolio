const galleryEl = document.getElementById('gallery');
const searchInput = document.getElementById('gallery-search');
const filterButtons = document.querySelectorAll('.filter-btn');
const heroMedia = document.getElementById('hero-media');
const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightbox-media');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCategory = document.getElementById('lightbox-category');
const backToTop = document.querySelector('.back-to-top');
const toast = document.getElementById('toast');
const yearEl = document.getElementById('year');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const diagnosticsToggle = document.getElementById('diagnostics-toggle');

const galleryItems = Array.from(galleryEl.querySelectorAll('.gallery-card')).map((card, index) => {
  const img = card.querySelector('img');
  const src = img ? img.getAttribute('src') : '';
  const title = card.dataset.title || card.querySelector('h4')?.textContent || `Image ${index + 1}`;
  const caption = card.dataset.caption || card.querySelector('.caption')?.textContent || '';
  const category = card.dataset.category ? card.dataset.category[0].toUpperCase() + card.dataset.category.slice(1) : 'Arabic';
  const idMatch = src.match(/(\\d+)\\.jpg$/);
  const id = idMatch ? Number(idMatch[1]) : index + 1;
  return { id, src, title, category, caption, card };
});

function createImageElement(src, alt, onLoad, onError) {
  const img = new Image();
  img.alt = alt;
  img.loading = 'lazy';

  img.addEventListener('load', () => onLoad(img));
  img.addEventListener('error', onError);
  img.src = src;
}

function setupGalleryCards() {
  galleryItems.forEach((item) => {
    const img = item.card.querySelector('img');
    const diagnostics = item.card.querySelector('.diagnostics');

    if (img) {
      img.addEventListener('load', () => {
        item.card.classList.add('loaded');
        diagnostics.textContent = `Loaded: ${item.src}`;
        const skeleton = item.card.querySelector('.skeleton');
        skeleton?.remove();
      });
      img.addEventListener('error', () => {
        diagnostics.textContent = `Missing: ${item.src}`;
      });
    }

    item.card.addEventListener('click', () => openLightbox(item));
    item.card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') openLightbox(item);
    });
  });
}

function applyFilters() {
  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  const searchTerm = searchInput.value.toLowerCase();

  galleryItems.forEach((item) => {
    const matchesFilter = activeFilter === 'all' || item.category.toLowerCase() === activeFilter;
    const matchesSearch = [item.title, item.caption, item.category].some((text) =>
      text.toLowerCase().includes(searchTerm)
    );
    item.card.style.display = matchesFilter && matchesSearch ? '' : 'none';
  });
}

function setFilter(button) {
  filterButtons.forEach((btn) => btn.classList.remove('active'));
  button.classList.add('active');
  applyFilters();
}

let lightboxIndex = 0;

function openLightbox(item) {
  lightboxIndex = galleryItems.findIndex((i) => i.id === item.id);
  updateLightbox();
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  trapFocus(lightbox);
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const item = galleryItems[lightboxIndex];
  lightboxTitle.textContent = item.title;
  lightboxCaption.textContent = item.caption;
  lightboxCategory.textContent = item.category;

  lightboxMedia.innerHTML = '';
  createImageElement(
    item.src,
    item.title,
    (img) => lightboxMedia.appendChild(img),
    () => {
      const placeholder = document.createElement('div');
      placeholder.className = 'placeholder';
      placeholder.textContent = `Image ${item.id} not found`;
      lightboxMedia.appendChild(placeholder);
    }
  );
}

function changeLightbox(step) {
  lightboxIndex = (lightboxIndex + step + galleryItems.length) % galleryItems.length;
  updateLightbox();
}

function trapFocus(modal) {
  const focusable = modal.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  first?.focus();
}

function updateHeroImage() {
  const heroSrc = 'imgs/cv-photo.png';
  const img = new Image();
  img.addEventListener('load', () => {
    heroMedia.style.backgroundImage = `url('${heroSrc}')`;
  });
  img.addEventListener('error', () => {
    heroMedia.classList.add('hero-fallback');
  });
  img.src = heroSrc;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

function setupCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        showToast('Number copied to clipboard');
      } catch (error) {
        showToast('Copy not available. Please select manually.');
      }
    });
  });
}

function setupForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      showToast('Please complete all fields correctly.');
      return;
    }
    showToast('Message ready — we’ll get back soon.');
    form.reset();
  });
}

function setupScrollEffects() {
  window.addEventListener('scroll', () => {
    const progress = document.querySelector('.scroll-progress');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const width = (scrollTop / docHeight) * 100;
    progress.style.width = `${width}%`;

    if (scrollTop > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function setupTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
}

function setupNav() {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

function setupLightbox() {
  lightbox.addEventListener('click', (event) => {
    if (event.target.dataset.close === 'true') {
      closeLightbox();
    }
  });

  document.querySelector('.lightbox-nav.prev').addEventListener('click', () => changeLightbox(-1));
  document.querySelector('.lightbox-nav.next').addEventListener('click', () => changeLightbox(1));

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('active')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') changeLightbox(1);
    if (event.key === 'ArrowLeft') changeLightbox(-1);
  });
}

function applyDiagnosticsState() {
  const show = diagnosticsToggle?.checked;
  document.querySelectorAll('.gallery-card').forEach((card) => {
    card.classList.toggle('show-diagnostics', show);
  });
}

filterButtons.forEach((btn) => btn.addEventListener('click', () => setFilter(btn)));
searchInput.addEventListener('input', applyFilters);

diagnosticsToggle?.addEventListener('change', applyDiagnosticsState);

updateHeroImage();
setupGalleryCards();
setupCopyButtons();
setupForm();
setupScrollEffects();
setupTheme();
setupNav();
setupLightbox();
applyDiagnosticsState();

yearEl.textContent = new Date().getFullYear();
