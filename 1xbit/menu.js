/**
 * Menu Management Script - Enhanced Version
 * إدارة القائمة الجانبية بشكل محسّن
 */

(function() {
    'use strict';
    
    // تهيئة القائمة
    function initMenu() {
        // الحصول على العناصر
        const menuToggle = document.querySelector('.menu-toggle');
        const floatingMenuToggle = document.querySelector('.floating-menu-toggle');
        const sideMenu = document.querySelector('.side-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        const sideMenuClose = document.querySelector('.side-menu-close');
        const body = document.body;
        
        // التحقق من وجود العناصر
        if (!sideMenu || !menuOverlay) {
            console.warn('Menu elements not found');
            return;
        }
        
        // فتح القائمة
        function openMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            sideMenu.classList.add('active');
            menuOverlay.classList.add('active');
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.width = '100%';
            body.classList.add('menu-open');
            
            // تعطيل التمرير على iOS
            document.documentElement.style.overflow = 'hidden';
        }
        
        // إغلاق القائمة
        function closeMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
            body.classList.remove('menu-open');
            
            // إعادة تفعيل التمرير على iOS
            document.documentElement.style.overflow = '';
        }
        
        // تبديل حالة القائمة
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            if (sideMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        // إضافة مستمعي الأحداث للزر العادي
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
            menuToggle.addEventListener('touchstart', function(e) {
                e.preventDefault();
                toggleMenu(e);
            }, { passive: false });
        }
        
        // إضافة مستمعي الأحداث للزر العائم
        if (floatingMenuToggle) {
            floatingMenuToggle.addEventListener('click', toggleMenu);
            floatingMenuToggle.addEventListener('touchstart', function(e) {
                e.preventDefault();
                toggleMenu(e);
            }, { passive: false });
        }
        
        // إضافة مستمع للـ overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
            menuOverlay.addEventListener('touchstart', closeMenu, { passive: true });
        }
        
        // إضافة مستمع لزر الإغلاق
        if (sideMenuClose) {
            sideMenuClose.addEventListener('click', closeMenu);
            sideMenuClose.addEventListener('touchstart', function(e) {
                e.preventDefault();
                closeMenu(e);
            }, { passive: false });
        }
        
        // إغلاق القائمة عند الضغط على Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                if (sideMenu.classList.contains('active')) {
                    closeMenu();
                }
            }
        });
        
        // إغلاق القائمة عند النقر على رابط داخلها
        const menuLinks = sideMenu.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // تأخير بسيط للسماح بالانتقال
                setTimeout(closeMenu, 100);
            });
        });
        
        // منع التمرير عند فتح القائمة على iOS
        sideMenu.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, { passive: true });
        
        // منع التمرير على الـ overlay
        menuOverlay.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
    }
    
    // تهيئة العد التنازلي (إذا كان موجوداً)
    function initCountdown() {
        const countdownTimer = document.getElementById('countdownTimer');
        if (!countdownTimer) return;
        
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (!hoursEl || !minutesEl || !secondsEl) return;
        
        function updateCountdown() {
            let hours = parseInt(hoursEl.textContent);
            let minutes = parseInt(minutesEl.textContent);
            let seconds = parseInt(secondsEl.textContent);
            
            seconds--;
            
            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }
            
            if (minutes < 0) {
                minutes = 59;
                hours--;
            }
            
            if (hours < 0) {
                hours = 23;
                minutes = 59;
                seconds = 59;
            }
            
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
        
        // تحديث كل ثانية
        setInterval(updateCountdown, 1000);
    }
    
    // تهيئة التمرير السلس
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // تهيئة lazy loading للصور
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }
    
    // تهيئة عند تحميل الصفحة
    function init() {
        initMenu();
        initCountdown();
        initSmoothScroll();
        initLazyLoading();
        
        // إضافة class للـ body عند التحميل
        document.body.classList.add('loaded');
    }
    
    // تشغيل عند جاهزية DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // تصدير الدوال للاستخدام الخارجي
    window.menuManager = {
        init: initMenu,
        open: function() {
            const event = new Event('click');
            const toggle = document.querySelector('.floating-menu-toggle');
            if (toggle) toggle.dispatchEvent(event);
        },
        close: function() {
            const sideMenu = document.querySelector('.side-menu');
            const menuOverlay = document.querySelector('.menu-overlay');
            if (sideMenu) sideMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.classList.remove('menu-open');
            document.documentElement.style.overflow = '';
        }
    };
    
})();
