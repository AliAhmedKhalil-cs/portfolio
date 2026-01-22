/**
 * Egypt Eternal - SPA Router
 * Hash-based routing for single-page navigation
 */

class EgyptRouter {
  constructor() {
    this.routes = {};
    this.currentRoute = '';
    this.setupRoutes();
    this.setupPopstateListener();
    this.handleInitialRoute();
  }

  setupRoutes() {
    // Define route handlers
    this.routes = {
      '': () => this.navigateToSection('hero'),
      'hero': () => this.navigateToSection('hero'),
      'why-egypt': () => this.navigateToSection('why-egypt'),
      'gem': () => this.navigateToSection('gem'),
      'places': () => this.navigateToSection('places'),
      'timeline': () => this.navigateToSection('timeline'),
      'planner': () => this.navigateToSection('planner'),
      'info': () => this.navigateToSection('info'),
      'testimonials': () => this.navigateToSection('testimonials'),
    };
  }

  navigate(route) {
    // Remove leading # if present
    const cleanRoute = route.replace(/^#/, '');
    
    // Update URL hash
    window.location.hash = cleanRoute;
    
    // Execute route handler
    if (this.routes[cleanRoute]) {
      this.routes[cleanRoute]();
    }
    
    this.currentRoute = cleanRoute;
  }

  navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Add animation class
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        section.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 10);
    }
  }

  handleInitialRoute() {
    const hash = window.location.hash.slice(1) || '';
    this.navigate(hash || 'hero');
  }

  setupPopstateListener() {
    // Handle back/forward buttons
    window.addEventListener('popstate', () => {
      this.handleInitialRoute();
    });

    // Handle hash changes
    window.addEventListener('hashchange', () => {
      this.handleInitialRoute();
    });
  }

  // Get current route
  getCurrentRoute() {
    return this.currentRoute;
  }

  // Check if on specific route
  isRoute(routeName) {
    return this.currentRoute === routeName;
  }
}

// Initialize router when document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.router = new EgyptRouter();
  });
} else {
  window.router = new EgyptRouter();
}

// Expose for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EgyptRouter;
}
