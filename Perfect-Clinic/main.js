// Mobile menu toggle with null checks
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;
    
    if (navMenu && menuToggle) {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    }
}

// Toggle contact menu
function toggleContactMenu() {
    const contactMenu = document.getElementById('contactMenu');
    const contactToggle = document.querySelector('.contact-toggle');
    
    if (contactMenu && contactToggle) {
        contactMenu.classList.toggle('active');
        contactToggle.classList.toggle('active');
    }
}

// Close mobile menu with null checks
function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;
    
    if (navMenu && menuToggle) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        body.style.overflow = 'auto';
    }
}

// Close menu when clicking outside with null checks
document.addEventListener('click', function(e) {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const floatingContact = document.querySelector('.floating-contact');
    const contactMenu = document.getElementById('contactMenu');
    const contactToggle = document.querySelector('.contact-toggle');
    
    // Close mobile menu
    if (navMenu && menuToggle && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMobileMenu();
    }
    
    // Close contact menu
    if (floatingContact && contactMenu && contactToggle && !floatingContact.contains(e.target)) {
        contactMenu.classList.remove('active');
        contactToggle.classList.remove('active');
    }
});

// Smooth scrolling to booking section with null check
function scrollToBooking() {
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
        bookingElement.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Form submission handling with email functionality
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameEl = document.getElementById('name');
        const phoneEl = document.getElementById('phone');
        const complaintEl = document.getElementById('complaint');
        const branchEl = document.getElementById('branch');
        const preferredTimeEl = document.getElementById('preferred-time');
        
        const name = nameEl ? nameEl.value : '';
        const phone = phoneEl ? phoneEl.value : '';
        const complaint = complaintEl ? complaintEl.value : '';
        const branch = branchEl ? branchEl.value : '';
        const preferredTime = preferredTimeEl ? preferredTimeEl.value : 'غير محدد';
        
        if (name && complaint && branch) {
            // Create email content
            const emailSubject = encodeURIComponent('طلب حجز موعد جديد - Perfect Clinic');
            const emailBody = encodeURIComponent(
                `طلب حجز موعد جديد\n\n` +
                `الاسم: ${name}\n` +
                `رقم الهاتف: ${phone || 'غير مذكور'}\n` +
                `الفرع المطلوب: ${branch}\n` +
                `الوقت المفضل: ${preferredTime}\n` +
                `الشكوى أو الخدمة المطلوبة:\n${complaint}\n\n` +
                `تاريخ الطلب: ${new Date().toLocaleString('ar-EG')}\n` +
                `\n---\nتم إرسال هذا الطلب من موقع Perfect Clinic`
            );
            
            // Create mailto link - you'll need to replace 'CLINIC_EMAIL@example.com' with actual email
            const mailtoLink = `mailto:CLINIC_EMAIL@example.com?subject=${emailSubject}&body=${emailBody}`;
            
            // Try to open email client
            try {
                window.location.href = mailtoLink;
                
                // Show success modal after a short delay
                setTimeout(() => {
                    showModal();
                }, 500);
                
                // Reset form
                this.reset();
                
                // Log for debugging
                console.log('Booking request sent via email:', { name, phone, complaint, branch, preferredTime });
            } catch (error) {
                console.error('Error opening email client:', error);
                // Fallback: show modal anyway
                showModal();
                this.reset();
            }
        }
    });
}

// Show success modal with null check
function showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Auto close after 3 seconds
        setTimeout(() => {
            closeModal();
        }, 3000);
    }
}

// Close modal with null check
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside with null check
const successModal = document.getElementById('successModal');
if (successModal) {
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Cache DOM elements for better performance
const animatedElements = document.querySelectorAll('.service-card, .feature, .booking-card');

// Scroll animations with cached elements
function animateOnScroll() {
    const ANIMATION_TRIGGER_OFFSET = 150;
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < window.innerHeight - ANIMATION_TRIGGER_OFFSET) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            // Add animate class for service cards
            if (element.classList.contains('service-card')) {
                element.classList.add('animate');
            }
        }
    });
}

// Animate services cards with stagger effect
function animateServices() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 200); // 200ms delay between each card
    });
}

// Check if services section is in view with null check
function checkServicesInView() {
    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateServices();
            // Remove listener after animation
            window.removeEventListener('scroll', checkServicesInView);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Ensure menu is closed on page load
    closeMobileMenu();
    
    // Set initial state for animated elements
    const features = document.querySelectorAll('.feature');
    features.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Trigger animations on scroll
    window.addEventListener('scroll', debounce(animateOnScroll, 100));
    window.addEventListener('scroll', checkServicesInView);
    
    // Trigger initial animation check
    animateOnScroll();
});

// Header scroll effect with null check
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Form input animations
document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', function() {
        if (this.parentElement) {
            this.parentElement.style.transform = 'scale(1.02)';
        }
    });
    
    input.addEventListener('blur', function() {
        if (this.parentElement) {
            this.parentElement.style.transform = 'scale(1)';
        }
    });
});

// Button hover effects
document.querySelectorAll('.btn-primary, .btn-secondary, .submit-btn, .cta-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger entrance animations
    setTimeout(() => {
        document.querySelectorAll('.animate-fade-up').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 300);
});

// Form validation enhancements with null checks
function validateForm() {
    const MIN_NAME_LENGTH = 2;
    const MIN_COMPLAINT_LENGTH = 10;
    
    const name = document.getElementById('name');
    const complaint = document.getElementById('complaint');
    const branch = document.getElementById('branch');
    
    // Real-time validation with null checks
    if (name) {
        name.addEventListener('input', function() {
            if (this.value.length < MIN_NAME_LENGTH) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#4ecdc4';
            }
        });
    }
    
    if (complaint) {
        complaint.addEventListener('input', function() {
            if (this.value.length < MIN_COMPLAINT_LENGTH) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#4ecdc4';
            }
        });
    }
    
    if (branch) {
        branch.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#4ecdc4';
            }
        });
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', validateForm);

// Analytics tracking constants
const TRACKING_ACTIONS = {
    CALL_CLICKED: 'call_clicked',
    WHATSAPP_CLICKED: 'whatsapp_clicked',
    BOOKING_CLICKED: 'booking_clicked'
};

// Add click tracking for analytics
function trackClick(element, action) {
    // TODO: Implement actual analytics tracking
    console.log(`Tracked: ${action} on ${element}`);
}

// Track important clicks
document.addEventListener('DOMContentLoaded', function() {
    // Track phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => trackClick('phone', TRACKING_ACTIONS.CALL_CLICKED));
    });
    
    // Track WhatsApp clicks
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
        link.addEventListener('click', () => trackClick('whatsapp', TRACKING_ACTIONS.WHATSAPP_CLICKED));
    });
    
    // Track booking button clicks
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', () => trackClick('booking', TRACKING_ACTIONS.BOOKING_CLICKED));
    });
});