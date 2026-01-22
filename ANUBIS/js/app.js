/**
 * Egypt Eternal - Main Application Engine
 * Premium Egyptian Archaeology & Tourism Platform
 * Bilingual (EN/AR) | Responsive | Accessible
 */

class EgyptEternalApp {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.places = [];
    this.rulers = [];
    this.timeline = [];
    this.testimonials = [];
    this.translations = {};
    this.init();
  }

  async init() {
    // Set initial language
    this.setLanguage(this.currentLanguage);
    
    // Load data
    await Promise.all([
      this.loadPlaces(),
      this.loadRulers(),
      this.loadTimeline(),
      this.loadTestimonials()
    ]);
    
    // Setup UI
    this.setupNavigation();
    this.setupLanguageToggle();
    this.setupFilters();
    this.setupTripPlanner();
    this.setupModals();
    this.setupScrollReveals();
    this.setupFormHandlers();
    this.setupAmbientAudio();
    this.setupHieroglyphicGenerator();
    
    // Immersive button
    document.getElementById('immersive-btn')?.addEventListener('click', () => {
      this.openImmersiveMode();
    });
    
        // Anubis Chamber (video room)
    this.setupAnubisRoom();

console.log('âœ… Egypt Eternal App Initialized');
  }

  // ============= LANGUAGE SYSTEM =============
  
  setLanguage(lang) {
    this.currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('lang', lang);
    localStorage.setItem('language', lang);
    this.updateAllTranslations();
  }

  updateAllTranslations() {
    document.querySelectorAll('[data-en], [data-ar]').forEach(el => {
      const key = this.currentLanguage === 'ar' ? 'data-ar' : 'data-en';
      const value = el.getAttribute(key);
      if (value) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = value;
        } else {
          el.textContent = value;
        }
      }
    });
  }

  setupLanguageToggle() {
    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        this.setLanguage(this.currentLanguage === 'en' ? 'ar' : 'en');
        this.repopulateAllContent();
      });
    }
  }

  getDataPath(fileName) {
    const isSubpage = window.location.pathname.includes('/pages/');
    const base = isSubpage ? '../data/' : 'data/';
    return `${base}${fileName}`;
  }

  // ============= DATA LOADING =============

  async loadPlaces() {
    try {
      const response = await fetch(this.getDataPath('places.json'));
      const data = await response.json();
      this.places = Array.isArray(data) ? data : data.places || [];
      this.populatePlaces();
    } catch (err) {
      console.error('Error loading places:', err);
    }
  }

  async loadRulers() {
    try {
      const response = await fetch(this.getDataPath('rulers.json'));
      const data = await response.json();
      this.rulers = Array.isArray(data) ? data : data.rulers || [];
    } catch (err) {
      console.error('Error loading rulers:', err);
    }
  }

  async loadTimeline() {
    try {
      const response = await fetch(this.getDataPath('timeline.json'));
      const data = await response.json();
      this.timeline = Array.isArray(data) ? data : data.timeline || [];
      this.populateTimeline();
    } catch (err) {
      console.error('Error loading timeline:', err);
    }
  }

  async loadTestimonials() {
    try {
      const response = await fetch(this.getDataPath('testimonials.json'));
      const data = await response.json();
      this.testimonials = Array.isArray(data) ? data : data.testimonials || [];
      this.populateTestimonials();
    } catch (err) {
      console.error('Error loading testimonials:', err);
    }
  }

  // ============= PLACES SECTION =============

  populatePlaces() {
    const grid = document.getElementById('places-grid');
    if (!grid) return;

    grid.innerHTML = '';
    this.places.forEach((place, idx) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="card__image" style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); min-height: 200px; display: flex; align-items: center; justify-content: center; border-radius: 12px; margin-bottom: 16px;">
          <div style="text-align: center; color: #0A0A0A; font-weight: bold;">${place.name}</div>
        </div>
        <h3 class="card__title">${this.currentLanguage === 'ar' ? place.name_ar : place.name}</h3>
        <p class="card__text" style="color: #E8D7C3; margin: 0; font-size: 0.9rem;">
          ${this.currentLanguage === 'ar' ? place.short_story_ar : place.short_story_en}
        </p>
        <button class="btn btn--ghost" style="margin-top: 16px; width: 100%; font-size: 0.9rem;">
          ${this.currentLanguage === 'ar' ? 'Ø§ÙƒØªØ´Ù' : 'Discover'}
        </button>
      `;
      card.addEventListener('click', () => this.openPlaceModal(place));
      grid.appendChild(card);
    });
  }

  setupFilters() {
    const regionFilter = document.getElementById('region-filter');
    const categoryFilter = document.getElementById('category-filter');
    const searchFilter = document.getElementById('search-filter');

    [regionFilter, categoryFilter, searchFilter].forEach(filter => {
      if (filter) {
        filter.addEventListener('change', () => this.applyFilters());
        filter.addEventListener('keyup', () => this.applyFilters());
      }
    });
  }

  applyFilters() {
    const region = document.getElementById('region-filter')?.value || '';
    const category = document.getElementById('category-filter')?.value || '';
    const search = document.getElementById('search-filter')?.value.toLowerCase() || '';

    const filtered = this.places.filter(place => {
      const matchRegion = !region || place.region === region;
      const matchCategory = !category || place.category === category;
      const matchSearch = !search || 
        place.name.toLowerCase().includes(search) ||
        place.name_ar.includes(search) ||
        place.short_story_en.toLowerCase().includes(search);
      return matchRegion && matchCategory && matchSearch;
    });

    this.displayFilteredPlaces(filtered);
  }

  displayFilteredPlaces(places) {
    const grid = document.getElementById('places-grid');
    if (!grid) return;
    grid.innerHTML = '';
    places.forEach(place => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h3 class="card__title">${this.currentLanguage === 'ar' ? place.name_ar : place.name}</h3>
        <p class="card__text">${this.currentLanguage === 'ar' ? place.short_story_ar : place.short_story_en}</p>
        <button class="btn btn--ghost" style="margin-top: 16px; width: 100%; font-size: 0.9rem;">
          ${this.currentLanguage === 'ar' ? 'Ø§ÙƒØªØ´Ù' : 'Discover'}
        </button>
      `;
      card.addEventListener('click', () => this.openPlaceModal(place));
      grid.appendChild(card);
    });
  }

  openPlaceModal(place) {
    const modal = document.getElementById('place-modal');
    const content = document.getElementById('place-modal-content');
    if (!modal || !content) return;

    const isAr = this.currentLanguage === 'ar';
    content.innerHTML = `
      <div style="border-bottom: 2px solid #D4AF37; padding-bottom: 16px; margin-bottom: 16px;">
        <h2 style="color: #FFD700; margin: 0; font-size: 1.8rem;">
          ${isAr ? place.name_ar : place.name}
        </h2>
        <p style="color: #B8860B; margin: 8px 0; font-weight: 600;">
          ${place.era}
        </p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: #D4AF37; margin-bottom: 12px; font-size: 1.2rem;">
          ${isAr ? 'Ø§Ù„Ø³Ø±Ø¯' : 'Story'}
        </h3>
        <p style="color: #E8D7C3; line-height: 1.8;">
          ${isAr ? place.full_story_ar : place.full_story_en}
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div>
          <h4 style="color: #D4AF37; margin-bottom: 12px; font-size: 1rem;">
            ${isAr ? 'Ø§Ù„Ø­Ù‚Ø§Ø¦Ù‚' : 'Facts'}
          </h4>
          <ul style="color: #E8D7C3; padding-left: 16px; margin: 0;">
            ${(isAr ? place.facts_ar : place.facts_en).map(fact => `<li>${fact}</li>`).join('')}
          </ul>
        </div>
        
        <div>
          <h4 style="color: #D4AF37; margin-bottom: 12px; font-size: 1rem;">
            ${isAr ? 'Ù†ØµØ§Ø¦Ø­ Ø§Ù„Ø²ÙŠØ§Ø±Ø©' : 'Visiting Tips'}
          </h4>
          <ul style="color: #E8D7C3; padding-left: 16px; margin: 0;">
            ${(isAr ? place.visiting_tips_ar : place.visiting_tips_en).map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        </div>
      </div>

      ${place.coordinates ? `
        <div style="background: #2A2A2A; padding: 12px; border-radius: 8px; margin-bottom: 16px; color: #E8D7C3;">
          ðŸ“ <strong>${isAr ? 'Ø§Ù„Ø¥Ø­Ø¯Ø§Ø«ÙŠØ§Øª' : 'Coordinates'}:</strong> ${place.coordinates.lat}, ${place.coordinates.lng}
        </div>
      ` : ''}

      <button class="btn btn--primary" onclick="document.getElementById('place-modal').setAttribute('aria-hidden', 'true')">
        ${isAr ? 'ØºÙ„Ù‚' : 'Close'}
      </button>
    `;

    modal.setAttribute('aria-hidden', 'false');
  }

  // ============= TIMELINE SECTION =============

  populateTimeline() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    timeline.innerHTML = '';
    this.timeline.forEach((era, idx) => {
      const item = document.createElement('div');
      item.className = 'timeline__item';
      item.innerHTML = `
        <div class="timeline__dot"></div>
        <div class="timeline__content">
          <div class="timeline__era">${this.currentLanguage === 'ar' ? era.name_ar : era.name}</div>
          <div class="timeline__period">${era.period}</div>
          <div class="timeline__description">
            ${this.currentLanguage === 'ar' ? era.description_ar : era.description}
          </div>
        </div>
      `;
      timeline.appendChild(item);
    });
  }

  // ============= TESTIMONIALS SECTION =============

  populateTestimonials() {
    const grid = document.getElementById('testimonials-grid');
    if (!grid) return;

    grid.innerHTML = '';
    this.testimonials.forEach(testimonial => {
      const card = document.createElement('article');
      card.className = 'testimonial card';
      const stars = 'â­'.repeat(testimonial.rating);
      card.innerHTML = `
        <div style="color: #FFD700; font-size: 1rem; margin-bottom: 12px;">${stars}</div>
        <p style="color: #E8D7C3; margin-bottom: 16px; font-size: 0.95rem; font-style: italic;">
          "${testimonial.text}"
        </p>
        <div style="color: #D4AF37; font-weight: 600;">${testimonial.author}</div>
        <div style="color: #B8860B; font-size: 0.85rem;">${testimonial.location}</div>
      `;
      grid.appendChild(card);
    });
  }

  // ============= TRIP PLANNER =============

  setupTripPlanner() {
    const form = document.getElementById('planner-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.generateItinerary();
    });
  }

  generateItinerary() {
    const duration = parseInt(document.getElementById('duration')?.value || 5);
    const budget = document.getElementById('budget')?.value || 'moderate';
    const interests = document.getElementById('interests')?.value || 'temples';

    // Create personalized itinerary
    const itinerary = this.buildItinerary(duration, budget, interests);
    
    const output = document.getElementById('itinerary-output');
    const content = document.getElementById('itinerary-content');
    
    if (output && content) {
      content.innerHTML = itinerary;
      output.style.display = 'block';
      output.scrollIntoView({ behavior: 'smooth' });
    }
  }

  buildItinerary(days, budget, interests) {
    const isAr = this.currentLanguage === 'ar';
    
    let html = '<div style="background: #2A2A2A; padding: 20px; border-radius: 12px; border-left: 4px solid #D4AF37;">';
    
    // Day assignments
    const dayPlans = this.createDayPlans(days, interests);
    dayPlans.forEach((plan, idx) => {
      html += `
        <div style="margin-bottom: 20px; border-bottom: 1px solid #3A3A3A; padding-bottom: 16px;">
          <h4 style="color: #FFD700; margin: 0 0 12px 0; font-size: 1.2rem;">
            ${isAr ? `Ø§Ù„ÙŠÙˆÙ… ${idx + 1}` : `Day ${idx + 1}`}
          </h4>
          <div style="color: #E8D7C3; line-height: 1.8;">
            ${plan}
          </div>
        </div>
      `;
    });
    
    // Budget note
    const budgetText = {
      'budget': { en: 'Budget ($50-80/day)', ar: 'Ø§Ù‚ØªØµØ§Ø¯ (50-80 Ø¯ÙˆÙ„Ø§Ø±/ÙŠÙˆÙ…)' },
      'moderate': { en: 'Moderate ($100-150/day)', ar: 'Ù…ØªÙˆØ³Ø· (100-150 Ø¯ÙˆÙ„Ø§Ø±/ÙŠÙˆÙ…)' },
      'premium': { en: 'Premium ($200-300/day)', ar: 'Ø¨Ø±ÙŠÙ…ÙŠÙˆÙ… (200-300 Ø¯ÙˆÙ„Ø§Ø±/ÙŠÙˆÙ…)' },
      'luxury': { en: 'Luxury ($400+/day)', ar: 'ÙØ§Ø®Ø±Ø© (400+ Ø¯ÙˆÙ„Ø§Ø±/ÙŠÙˆÙ…)' }
    };
    
    html += `
      <div style="margin-top: 20px; background: #1A1A1A; padding: 16px; border-radius: 8px;">
        <span style="color: #D4AF37; font-weight: 600;">${isAr ? 'Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ©' : 'Budget'}:</span>
        <span style="color: #E8D7C3; margin-left: 8px;">${budgetText[budget][isAr ? 'ar' : 'en']}</span>
      </div>
    `;
    
    html += '</div>';
    return html;
  }

  createDayPlans(days, interests) {
    const isAr = this.currentLanguage === 'ar';
    const plans = [];
    
    const interestPlans = {
      'pyramids': {
        en: ['Visit Giza Pyramids & Sphinx', 'Explore Saqqara Step Pyramid', 'Memphis ancient capital', 'Rest at hotel'],
        ar: ['Ø²ÙŠØ§Ø±Ø© Ø£Ù‡Ø±Ø§Ù…Ø§Øª Ø§Ù„Ø¬ÙŠØ²Ø© ÙˆØ£Ø¨Ùˆ Ø§Ù„Ù‡ÙˆÙ„', 'Ø§Ø³ØªÙƒØ´Ù Ù‡Ø±Ù… Ø³Ù‚Ø§Ø±Ø© Ø§Ù„Ù…Ø¯Ø±Ø¬', 'Ø¹Ø§ØµÙ…Ø© Ù…Ù†Ù Ø§Ù„Ù‚Ø¯ÙŠÙ…Ø©', 'Ø§Ù„Ø±Ø§Ø­Ø© Ø¨Ø§Ù„ÙÙ†Ø¯Ù‚']
      },
      'temples': {
        en: ['Karnak Temple complex', 'Luxor Temple at sunset', 'Valley of Kings', 'Cruise the Nile'],
        ar: ['Ù…Ø¹Ø¨Ø¯ Ø§Ù„ÙƒØ±Ù†Ùƒ', 'Ù…Ø¹Ø¨Ø¯ Ø§Ù„Ø£Ù‚ØµØ± Ø¹Ù†Ø¯ Ø§Ù„ØºØ±ÙˆØ¨', 'ÙˆØ§Ø¯ÙŠ Ø§Ù„Ù…Ù„ÙˆÙƒ', 'Ø±Ø­Ù„Ø© Ø¹Ù„Ù‰ Ø§Ù„Ù†ÙŠÙ„']
      },
      'museums': {
        en: ['Grand Egyptian Museum', 'Egyptian Museum Tahrir', 'Nubian Museum', 'Local galleries'],
        ar: ['Ø§Ù„Ù…ØªØ­Ù Ø§Ù„Ù…ØµØ±ÙŠ Ø§Ù„ÙƒØ¨ÙŠØ±', 'Ø§Ù„Ù…ØªØ­Ù Ø§Ù„Ù…ØµØ±ÙŠ Ø¨Ø§Ù„ØªØ­Ø±ÙŠØ±', 'Ù…ØªØ­Ù Ø§Ù„Ù†ÙˆØ¨Ø©', 'Ù…Ø¹Ø§Ø±Ø¶ Ù…Ø­Ù„ÙŠØ©']
      },
      'luxury': {
        en: ['5-star resort stay', 'Private Nile cruise', 'Guided tours all sites', 'Fine dining experiences'],
        ar: ['Ø¥Ù‚Ø§Ù…Ø© Ù…Ù†ØªØ¬Ø¹ 5 Ù†Ø¬ÙˆÙ…', 'Ø±Ø­Ù„Ø© Ù†ÙŠÙ„ Ø®Ø§ØµØ©', 'Ø¬ÙˆÙ„Ø§Øª Ù…ÙˆØ¬Ù‡Ø© Ù„Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…ÙˆØ§Ù‚Ø¹', 'ØªØ¬Ø§Ø±Ø¨ Ø·Ø¹Ø§Ù… ÙØ§Ø®Ø±Ø©']
      },
      'adventure': {
        en: ['Hot air balloon over Luxor', 'Desert safari', 'Scuba diving Red Sea', 'Hiking Mount Sinai'],
        ar: ['Ù…Ù†Ø·Ø§Ø¯ ÙÙˆÙ‚ Ø§Ù„Ø£Ù‚ØµØ±', 'Ø³ÙØ§Ø±ÙŠ Ø§Ù„ØµØ­Ø±Ø§Ø¡', 'Ø§Ù„ØºØ·Ø³ Ø¨Ø§Ù„Ø¨Ø­Ø± Ø§Ù„Ø£Ø­Ù…Ø±', 'Ø±Ø­Ù„Ø© Ø¬Ø¨Ù„ Ø³ÙŠÙ†Ø§Ø¡']
      }
    };
    
    const selectedPlan = interestPlans[interests] || interestPlans['temples'];
    
    for (let i = 0; i < days; i++) {
      const activity = selectedPlan[isAr ? 'ar' : 'en'][i % selectedPlan[isAr ? 'ar' : 'en'].length];
      plans.push(`â€¢ ${activity}`);
    }
    
    return plans;
  }

  // ============= MODALS & FORMS =============

  setupModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      const overlay = modal.querySelector('.modal__overlay');
      const closeBtn = modal.querySelector('.modal__close');
      
      if (overlay) overlay.addEventListener('click', () => {
        modal.setAttribute('aria-hidden', 'true');
      });
      if (closeBtn) closeBtn.addEventListener('click', () => {
        modal.setAttribute('aria-hidden', 'true');
      });
    });
  }

  setupFormHandlers() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.showNotification(
          this.currentLanguage === 'ar' ? 'Ø´ÙƒØ±Ø§Ù‹ Ù„Ù„Ø§Ø´ØªØ±Ø§Ùƒ! ðŸŽ‰' : 'Thank you for subscribing! ðŸŽ‰'
        );
        newsletterForm.reset();
      });
    }
  }

  showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #D4AF37;
      color: #0A0A0A;
      padding: 16px 24px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 3000;
      animation: slideInUp 0.4s ease-out;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
      notif.style.animation = 'fadeOut 0.4s ease-in';
      setTimeout(() => notif.remove(), 400);
    }, 3000);
  }

  // ============= SCROLL REVEALS =============

  setupScrollReveals() {
    // Premium IntersectionObserver with staggered reveals
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Add staggered delay for elegant cascade
          const delay = (idx % 3) * 0.1;
          entry.target.style.animation = `fadeInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s forwards`;
          entry.target.style.willChange = 'opacity, transform';
          observer.unobserve(entry.target);
          
          // Add gold dust effect
          entry.target.addEventListener('mouseenter', () => {
            entry.target.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.3)';
          });
          entry.target.addEventListener('mouseleave', () => {
            entry.target.style.boxShadow = 'none';
          });
        }
      });
    }, observerOptions);

    // Observe all sections, cards, and content elements
    const elementsToObserve = document.querySelectorAll(
      '.section, .card, .timeline__item, .dynasty-slab, .testimonial, .info-card, h2, h3'
    );
    
    elementsToObserve.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      observer.observe(el);
    });

    // Fallback for browsers without IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      elementsToObserve.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }
  }

  // ============= AMBIENT AUDIO =============

  setupAmbientAudio() {
    const audio = document.getElementById('site-ambience');
    if (!audio) return;

    try { audio.volume = 0.4; } catch (_) {}

    const attemptPlay = () => {
      const playAttempt = audio.play();
      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(() => {});
      }
    };

    attemptPlay();

    const resumeOnGesture = () => {
      attemptPlay();
      window.removeEventListener('pointerdown', resumeOnGesture);
      window.removeEventListener('keydown', resumeOnGesture);
    };

    window.addEventListener('pointerdown', resumeOnGesture);
    window.addEventListener('keydown', resumeOnGesture);
  }

  // ============= HIEROGLYPHIC GENERATOR =============

  setupHieroglyphicGenerator() {
    const input = document.getElementById('anubis-input');
    const output = document.getElementById('anubis-output');
    const button = document.getElementById('anubis-generate');
    if (!input || !output || !button) return;

    const map = {
      A: 'ð“„¿', B: 'ð“ƒ€', C: 'ð“Ž¡', D: 'ð“‚§', E: 'ð“‡Œ', F: 'ð“†‘', G: 'ð“Ž¼', H: 'ð“‰”',
      I: 'ð“‡‹', J: 'ð“†“', K: 'ð“Ž¡', L: 'ð“ƒ­', M: 'ð“…“', N: 'ð“ˆ–', O: 'ð“¯', P: 'ð“Šª',
      Q: 'ð“ˆŽ', R: 'ð“‚‹', S: 'ð“‹´', T: 'ð“', U: 'ð“…±', V: 'ð“†‘', W: 'ð“…±',
      X: 'ð“', Y: 'ð“‡Œ', Z: 'ð“Šƒ',
      '0': 'ð“¢', '1': 'ð“º', '2': 'ð“»', '3': 'ð“¼', '4': 'ð“½',
      '5': 'ð“¾', '6': 'ð“¿', '7': 'ð“€', '8': 'ð“', '9': 'ð“‚',
      ' ': ' ',
      'Ø§': 'ð“„¿', 'Ø£': 'ð“„¿', 'Ø¥': 'ð“„¿', 'Ø¢': 'ð“„¿', 'Ø¨': 'ð“ƒ€', 'Øª': 'ð“',
      'Ø«': 'ð“', 'Ø¬': 'ð“Ž¼', 'Ø­': 'ð“‰”', 'Ø®': 'ð“', 'Ø¯': 'ð“‚§', 'Ø°': 'ð“‚§',
      'Ø±': 'ð“‚‹', 'Ø²': 'ð“Šƒ', 'Ø³': 'ð“‹´', 'Ø´': 'ð“‹´', 'Øµ': 'ð“‹´', 'Ø¶': 'ð“‹´',
      'Ø·': 'ð“', 'Ø¸': 'ð“', 'Ø¹': 'ð“‚', 'Øº': 'ð“Ž¼', 'Ù': 'ð“†‘', 'Ù‚': 'ð“ˆŽ',
      'Ùƒ': 'ð“Ž¡', 'Ù„': 'ð“ƒ­', 'Ù…': 'ð“…“', 'Ù†': 'ð“ˆ–', 'Ù‡': 'ð“‰”', 'Ùˆ': 'ð“…±',
      'ÙŠ': 'ð“‡Œ', 'Ù‰': 'ð“‡Œ', 'Ø©': 'ð“'
    };

    const render = () => {
      const value = input.value || '';
      const glyphs = value
        .split('')
        .map((ch) => {
          const upper = ch.toUpperCase();
          return map[ch] || map[upper] || 'ð“Šƒ';
        })
        .join(' ');
      output.textContent = glyphs || 'ð“€€ ð“Ž¼ ð“ˆ– ð“Ž¡';
    };

    button.addEventListener('click', render);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        render();
      }
    });
  }

  // ============= NAVIGATION =============

  setupNavigation() {
    const hamburger = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.navbar__menu');
    
    if (hamburger && menu) {
      const setMenuState = (isOpen) => {
        menu.classList.toggle('open', isOpen);
        document.body.classList.toggle('nav-open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      };

      // Ensure closed state on load
      setMenuState(false);

      hamburger.addEventListener('click', () => {
        setMenuState(!menu.classList.contains('open'));
      });
      
      menu.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
          setMenuState(false);
        });
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setMenuState(false);
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          setMenuState(false);
        }
      });
    }
  }
  // ============= IMMERSIVE MODE =============

  openImmersiveMode() {
    const modal = document.getElementById('immersive-modal');
    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
      if (typeof ImmersiveExperience !== 'undefined') {
        new ImmersiveExperience();
      }
    }
  }

  
  // ============= ANUBIS CHAMBER (VIDEO ROOM) =============
  setupAnubisRoom() {
    const room = document.getElementById('anubis-room');
    const video = document.getElementById('anubis-room-video');
    const audio = document.getElementById('anubis-room-audio');
    const exitBtn = document.getElementById('anubis-room-close');

    if (!room || !video) return;

    const open = () => {
      room.classList.add('is-open');
      room.setAttribute('aria-hidden', 'false');

      // Restart + play video
      try { video.currentTime = 0; } catch (_) {}
      const playVideo = video.play();
      if (playVideo && typeof playVideo.catch === 'function') playVideo.catch(() => {});

      // Optional audio (will be blocked unless user gesture - this is called from click)
      if (audio) {
        try { audio.currentTime = 0; audio.volume = 0.75; } catch (_) {}
        const playAudio = audio.play();
        if (playAudio && typeof playAudio.catch === 'function') playAudio.catch(() => {});
      }

      // Prevent page scroll while in chamber
      document.body.classList.add('modal-open');
    };

    const close = () => {
      room.classList.remove('is-open');
      room.setAttribute('aria-hidden', 'true');

      try { video.pause(); } catch (_) {}
      if (audio) { try { audio.pause(); } catch (_) {} }

      document.body.classList.remove('modal-open');
    };

    // Bind all Enter buttons/links (hero + navbar) with data-enter-room="anubis"
    document.querySelectorAll('[data-enter-room="anubis"]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        open();
      });
    });

    exitBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      close();
    });

    // ESC closes
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && room.classList.contains('is-open')) {
        close();
      }
    });

    // Click outside UI closes (only on the room overlay itself, not content)
    room.addEventListener('click', (e) => {
      if (e.target === room) close();
    });
  }


// ============= UTILS =============

  repopulateAllContent() {
    this.populatePlaces();
    this.populateTimeline();
    this.populateTestimonials();
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.egyptApp = new EgyptEternalApp();
  });
} else {
  window.egyptApp = new EgyptEternalApp();
}



