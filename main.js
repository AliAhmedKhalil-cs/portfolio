// ==================== MOBILE MENU TOGGLE ====================
const menuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.navbar ul');

if (menuIcon && navMenu) {
    // Ensure menu icon is always visible on mobile
    const checkMenuIcon = () => {
        if (window.innerWidth <= 768) {
            menuIcon.style.display = 'flex';
        }
    };
    
    checkMenuIcon();
    window.addEventListener('resize', checkMenuIcon);
    
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        menuIcon.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle Icon
        const icon = menuIcon.querySelector('i');
        if (icon) {
            if (menuIcon.classList.contains('active')) {
                icon.classList.replace('bx-menu', 'bx-x');
            } else {
                icon.classList.replace('bx-x', 'bx-menu');
            }
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset Icon
            const icon = menuIcon.querySelector('i');
            if (icon) {
                icon.classList.replace('bx-x', 'bx-menu');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuIcon.contains(e.target) && !navMenu.contains(e.target)) {
            menuIcon.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset Icon
            const icon = menuIcon.querySelector('i');
            if (icon) {
                icon.classList.replace('bx-x', 'bx-menu');
            }
        }
    });
}

// ==================== NAVBAR SCROLL HIDE/SHOW ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease-in-out';
    } 
    else if (currentScroll < lastScroll) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s ease-in-out';
    }
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ==================== EMAILJS INITIALIZATION ====================
if (typeof emailjs !== 'undefined') {
    (function(){
        emailjs.init("weB-XBxkuDxyfDhQK");
    })();
}

// ==================== CONTACT FORM HANDLER ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        if (typeof emailjs !== 'undefined') {
            emailjs.sendForm(
                'service_zmfug2q',
                'template_s83eqok',
                this
            )
            .then(function(_response) {
                submitBtn.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
                submitBtn.style.background = '#4CAF50';
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, function(_error) {
                submitBtn.innerHTML = '<i class="bx bx-x"></i> Failed to send';
                submitBtn.style.background = '#f44336';
                alert('Oops! Something went wrong. Please try again.');
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            });
        }
    });

    // Form field animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// ==================== AUDIT FORM HANDLER ====================
const auditForm = document.getElementById('auditForm');
if (auditForm) {
    auditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = document.querySelector('.audit-submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Sending...';
        submitBtn.disabled = true;
        if (typeof emailjs !== 'undefined') {
            emailjs.sendForm(
                'service_zmfug2q',
                'template_s83eqok',
                this
            )
            .then(function(_response) {
                submitBtn.innerHTML = '<i class="bx bx-check"></i> Audit Requested!';
                submitBtn.style.background = '#4CAF50';
                alert('Thanks! Your free audit request has been received.');
                auditForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, function(_error) {
                submitBtn.innerHTML = '<i class="bx bx-x"></i> Failed to send';
                submitBtn.style.background = '#f44336';
                alert('Oops! Something went wrong. Please try WhatsApp.');
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            });
        }
    });
}

// ==================== CHATBOT SYSTEM ====================
// تكوين البوت - يمكنك تعديل الردود والمعلومات هنا
const BOT_CONFIG = {
    name: "إبراهيم",
    greeting: "مرحباً! 👋 أنا مساعد إبراهيم الذكي. كيف يمكنني مساعدتك اليوم؟",
    greetingEn: "Hi there! 👋 I'm Ibrahem's assistant. How can I help you today?",
    
    // معلومات الخدمات والأسعار
    services: {
        landingPage: {
            name: "صفحة هبوط",
            price: "من 150$",
            duration: "3-5 أيام",
            features: ["تصميم متجاوب", "محسن لـ SEO", "سرعة عالية"]
        },
        website: {
            name: "موقع كامل",
            price: "من 300$",
            duration: "7-10 أيام",
            features: ["تصميم احترافي", "لوحة تحكم", "استضافة مجانية لشهر"]
        },
        ecommerce: {
            name: "متجر إلكتروني",
            price: "من 500$",
            duration: "14-21 يوم",
            features: ["نظام دفع", "إدارة منتجات", "تقارير مبيعات"]
        },
        seo: {
            name: "تحسين SEO",
            price: "من 200$",
            duration: "شهري",
            features: ["تحليل شامل", "تحسين محركات البحث", "تقارير شهرية"]
        }
    },
    
    // معلومات التواصل
    contact: {
        email: "ibrahem.kassap@gmail.com",
        whatsapp: "+201017358087",
        linkedin: "linkedin.com/in/ibrahem-kassap",
        github: "github.com/ibrahemkassap",
        location: "القاهرة، مصر"
    },
    
    // أوقات العمل
    availability: {
        workDays: "السبت - الخميس",
        workHours: "9 صباحاً - 6 مساءً",
        responseTime: "خلال 24 ساعة",
        timezone: "توقيت القاهرة (GMT+2)"
    },
    
    // الكلمات المفتاحية والردود
    keywords: {
        greeting: ["مرحبا", "السلام", "هاي", "هلو", "صباح", "مساء", "أهلا"],
        services: ["خدمات", "خدمة", "تقدم", "تعمل", "شغل", "عمل"],
        pricing: ["سعر", "اسعار", "تكلفة", "كام", "فلوس", "ثمن", "price"],
        portfolio: ["اعمال", "مشاريع", "portfolio", "شغل سابق", "نماذج"],
        contact: ["تواصل", "اتصال", "رقم", "ايميل", "واتساب", "whatsapp"],
        time: ["وقت", "مدة", "متى", "كام يوم", "توقيت"],
        available: ["متاح", "فاضي", "موجود", "available"],
        help: ["مساعدة", "help", "ساعدني"],
        blog: ["مدونة", "مقالات", "دروس", "تعليم", "blog"],
        html: ["html", "اتش تي ام ال"],
        css: ["css", "سي اس اس", "تصميم"],
        javascript: ["javascript", "js", "جافا سكريبت"],
        seo: ["seo", "محركات بحث", "جوجل"],
        thanks: ["شكرا", "thanks", "متشكر", "ممتن"]
    }
};

// حالة البوت
var chatState = {
    isOpen: false,
    conversationHistory: [],
    userName: null
};

function toggleChat() {
    chatState.isOpen = !chatState.isOpen;
    
    var chatWindow = document.getElementById('chatWindow');
    var toggleIcon = document.getElementById('toggleIcon');
    var badge = document.getElementById('notificationBadge');
    
    if (chatState.isOpen) {
        chatWindow.classList.add('active');
        toggleIcon.className = 'bx bx-x';
        if (badge) badge.style.display = 'none';
        
        // إرسال رسالة ترحيب إذا كانت أول مرة
        if (chatState.conversationHistory.length === 0) {
            setTimeout(() => {
                const currentLang = document.documentElement.getAttribute('lang') || 'en';
                const greeting = currentLang === 'ar' ? BOT_CONFIG.greeting : BOT_CONFIG.greetingEn;
                addBotMessage(greeting);
                showQuickReplies();
            }, 500);
        }
        
        const messageInput = document.getElementById('messageInput');
        if (messageInput) messageInput.focus();
    } else {
        chatWindow.classList.remove('active');
        toggleIcon.className = 'bx bx-bot';
    }
}

function sendMessage() {
    var input = document.getElementById('messageInput');
    var message = input.value.trim();
    
    if (message === '') return;

    addUserMessage(message);
    input.value = '';
    
    chatState.conversationHistory.push({role: 'user', message: message});

    // إخفاء الأزرار السريعة
    hideQuickReplies();

    // الحصول على رد البوت
    var botReply = getIntelligentResponse(message);
    showTypingThenRespond(botReply);
}

function getIntelligentResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    // التحية
    if (containsKeywords(msg, BOT_CONFIG.keywords.greeting)) {
        return `مرحباً بك! 😊<br><br>أنا ${BOT_CONFIG.name}، مطور ويب محترف متخصص في:<br>• تطوير المواقع<br>• تحسين SEO<br>• UI/UX Design<br><br>كيف يمكنني مساعدتك؟`;
    }
    
    // الخدمات
    if (containsKeywords(msg, BOT_CONFIG.keywords.services)) {
        return `<strong>الخدمات التي أقدمها:</strong><br><br>` +
               `💼 <strong>صفحة هبوط:</strong> ${BOT_CONFIG.services.landingPage.price}<br>` +
               `🌐 <strong>موقع كامل:</strong> ${BOT_CONFIG.services.website.price}<br>` +
               `🛒 <strong>متجر إلكتروني:</strong> ${BOT_CONFIG.services.ecommerce.price}<br>` +
               `📈 <strong>تحسين SEO:</strong> ${BOT_CONFIG.services.seo.price}<br><br>` +
               `هل تريد تفاصيل أكثر عن خدمة معينة؟`;
    }
    
    // الأسعار
    if (containsKeywords(msg, BOT_CONFIG.keywords.pricing)) {
        if (msg.includes('صفحة') || msg.includes('landing')) {
            return `<strong>صفحة الهبوط:</strong><br><br>` +
                   `💰 السعر: ${BOT_CONFIG.services.landingPage.price}<br>` +
                   `⏱️ المدة: ${BOT_CONFIG.services.landingPage.duration}<br><br>` +
                   `<strong>يشمل:</strong><br>` +
                   BOT_CONFIG.services.landingPage.features.map(f => `✓ ${f}`).join('<br>') +
                   `<br><br>تواصل معي للحصول على عرض سعر مخصص!`;
        }
        return `الأسعار تبدأ من:<br><br>` +
               `• صفحة هبوط: ${BOT_CONFIG.services.landingPage.price}<br>` +
               `• موقع كامل: ${BOT_CONFIG.services.website.price}<br>` +
               `• متجر إلكتروني: ${BOT_CONFIG.services.ecommerce.price}<br>` +
               `• SEO: ${BOT_CONFIG.services.seo.price}<br><br>` +
               `السعر النهائي يعتمد على متطلبات المشروع. تواصل معي للحصول على عرض سعر دقيق!`;
    }
    
    // الأعمال السابقة
    if (containsKeywords(msg, BOT_CONFIG.keywords.portfolio)) {
        return `يمكنك مشاهدة أعمالي السابقة:<br><br>` +
               `📁 <a href="portfolio.html" style="color: #0071e3;">صفحة الأعمال</a><br><br>` +
               `لدي أكثر من 50 مشروع منجز في:<br>` +
               `• مواقع الشركات<br>` +
               `• المتاجر الإلكترونية<br>` +
               `• صفحات الهبوط<br>` +
               `• تطبيقات الويب<br><br>` +
               `هل تريد رؤية مشروع معين؟`;
    }
    
    // التواصل
    if (containsKeywords(msg, BOT_CONFIG.keywords.contact)) {
        return `<strong>طرق التواصل معي:</strong><br><br>` +
               `📧 <strong>البريد:</strong> ${BOT_CONFIG.contact.email}<br>` +
               `📱 <strong>واتساب:</strong> <a href="https://wa.me/${BOT_CONFIG.contact.whatsapp.replace('+', '')}" target="_blank" style="color: #25D366;">${BOT_CONFIG.contact.whatsapp}</a><br>` +
               `💼 <strong>LinkedIn:</strong> ${BOT_CONFIG.contact.linkedin}<br>` +
               `🐙 <strong>GitHub:</strong> ${BOT_CONFIG.contact.github}<br>` +
               `📍 <strong>الموقع:</strong> ${BOT_CONFIG.contact.location}<br><br>` +
               `أفضل طريقة للتواصل السريع هي واتساب!`;
    }
    
    // الوقت والتوفر
    if (containsKeywords(msg, BOT_CONFIG.keywords.time) || containsKeywords(msg, BOT_CONFIG.keywords.available)) {
        return `<strong>أوقات العمل:</strong><br><br>` +
               `📅 ${BOT_CONFIG.availability.workDays}<br>` +
               `🕐 ${BOT_CONFIG.availability.workHours}<br>` +
               `⚡ وقت الرد: ${BOT_CONFIG.availability.responseTime}<br>` +
               `🌍 ${BOT_CONFIG.availability.timezone}<br><br>` +
               `يمكنك إرسال رسالة في أي وقت وسأرد عليك في أقرب فرصة!`;
    }
    
    // المدونة والدروس
    if (containsKeywords(msg, BOT_CONFIG.keywords.blog)) {
        return `<strong>المدونة والدروس:</strong><br><br>` +
               `📚 لدي دروس مجانية في:<br>` +
               `• HTML Performance<br>` +
               `• CSS الحديثة<br>` +
               `• SEO الشامل<br>` +
               `• إنشاء صفحة هبوط<br><br>` +
               `<a href="blog.html" style="color: #0071e3;">شاهد جميع الدروس</a><br><br>` +
               `عن أي موضوع تريد أن تتعلم؟`;
    }
    
    // HTML
    if (containsKeywords(msg, BOT_CONFIG.keywords.html)) {
        return `<strong>دروس HTML:</strong><br><br>` +
               `لدي درس شامل عن تحسين أداء HTML يشمل:<br>` +
               `• تقليل عمق DOM<br>` +
               `• ترتيب الموارد<br>` +
               `• تأجيل السكريبتات<br>` +
               `• HTML الدلالي<br><br>` +
               `<a href="html-performance.html" style="color: #0071e3;">ابدأ التعلم الآن</a>`;
    }
    
    // CSS
    if (containsKeywords(msg, BOT_CONFIG.keywords.css)) {
        return `<strong>دروس CSS:</strong><br><br>` +
               `تعلم أحدث تقنيات CSS:<br>` +
               `• CSS Variables<br>` +
               `• CSS Grid<br>` +
               `• Flexbox<br>` +
               `• Glassmorphism<br><br>` +
               `<a href="css-modern.html" style="color: #0071e3;">ابدأ التعلم الآن</a>`;
    }
    
    // SEO
    if (containsKeywords(msg, BOT_CONFIG.keywords.seo)) {
        return `<strong>دليل SEO الشامل:</strong><br><br>` +
               `تعلم كيف تتصدر نتائج البحث:<br>` +
               `• Core Web Vitals<br>` +
               `• HTML الدلالي<br>` +
               `• Structured Data<br>` +
               `• تحسين المحتوى<br><br>` +
               `<a href="seo-checklist.html" style="color: #0071e3;">ابدأ التعلم الآن</a>`;
    }
    
    // شكر
    if (containsKeywords(msg, BOT_CONFIG.keywords.thanks)) {
        return `العفو! 😊<br><br>سعيد بمساعدتك. إذا كان لديك أي سؤال آخر، أنا هنا!<br><br>لا تتردد في التواصل معي مباشرة على واتساب للمشاريع العاجلة.`;
    }
    
    // رد افتراضي ذكي
    return `شكراً على رسالتك! 🤔<br><br>` +
           `يمكنني مساعدتك في:<br>` +
           `• معرفة الخدمات والأسعار<br>` +
           `• مشاهدة أعمالي السابقة<br>` +
           `• طرق التواصل<br>` +
           `• الدروس التعليمية<br><br>` +
           `أو استخدم الأزرار السريعة أدناه!`;
}

// دالة مساعدة للبحث عن الكلمات المفتاحية
function containsKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
}

function showQuickReplies() {
    var qr = document.getElementById('quickReplies');
    if (qr) qr.style.display = 'flex';
}

function hideQuickReplies() {
    var qr = document.getElementById('quickReplies');
    if (qr) qr.style.display = 'none';
}

function addUserMessage(text) {
    var chatMessages = document.getElementById('chatMessages');
    var div = document.createElement('div');
    div.className = 'message user';
    div.innerHTML = '<div class="message-content">' + text + '</div><div class="message-avatar"><i class="bx bx-user"></i></div>';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(text) {
    var chatMessages = document.getElementById('chatMessages');
    var div = document.createElement('div');
    div.className = 'message bot';
    div.innerHTML = '<div class="message-avatar"><i class="bx bx-bot"></i></div><div class="message-content">' + text + '</div>';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingThenRespond(response) {
    var chatMessages = document.getElementById('chatMessages');
    
    var typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<div class="message-avatar"><i class="bx bx-bot"></i></div><div class="typing-indicator"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    window.setTimeout(function() {
        var typing = document.getElementById('typing-indicator');
        if (typing) {
            typing.parentNode.removeChild(typing);
        }
        addBotMessage(response);
        
        // إظهار الأزرار السريعة بعد الرد
        setTimeout(showQuickReplies, 500);
    }, 1500);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
}

function sendQuickReply(message) {
    document.getElementById('messageInput').value = message;
    sendMessage();
}

function initProjectPicker() {
    const picker = document.querySelector('.project-picker');
    if (!picker) return;

    const cards = picker.querySelectorAll('.picker-card');
    const input = picker.querySelector('#projectTypeInput');
    const desc = picker.querySelector('#projectDescInput');
    const sendBtn = picker.querySelector('#pickerSendBtn');

    if (!cards.length || !input) return;

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            cards.forEach((c) => c.classList.remove('selected'));
            card.classList.add('selected');
            input.value = card.textContent.trim();
        });
    });

    if (desc) {
        const clearDefault = () => {
            const defaultText = desc.getAttribute('data-default-text') || '';
            if (desc.value.trim() === defaultText.trim()) {
                desc.value = '';
            }
        };

        desc.addEventListener('focus', clearDefault);
        desc.addEventListener('input', () => {
            const defaultText = desc.getAttribute('data-default-text') || '';
            if (desc.value.trim() === defaultText.trim()) {
                desc.value = '';
            }
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const typeValue = input ? input.value.trim() : '';
            const defaultText = desc ? (desc.getAttribute('data-default-text') || '') : '';
            const descValue = desc ? desc.value.trim() : '';
            const finalDesc = descValue && descValue !== defaultText.trim() ? descValue : '';
            const lang = document.documentElement.getAttribute('lang') || 'en';

            const lines = [];
            lines.push('تفاصيل المشروع:');
            lines.push(`1- نوع الموقع: ${typeValue || 'غير محدد'}`);
            lines.push(`2- وصف الموقع: ${finalDesc || 'لم يتم إضافة وصف'}`);
            lines.push('3- مع إرفاق الصورة المرسلة من العميل');

            const message = lines.join('\n');
            const phone = '201016040576';
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }

    syncProjectPickerSelection();
}

function initVodafoneCashDialer() {
    const amountInput = document.getElementById('vodafoneAmount');
    const btn = document.getElementById('vodafoneCashBtn');
    if (!btn) return;

    const base = '*9*7*01017358087*';
    const suffix = '#';
    const encodedSuffix = '%23';

    const updateDialer = () => {
        const raw = amountInput ? amountInput.value.trim() : '';
        const clean = raw.replace(/[^\d.]/g, '');
        const code = clean ? `${base}${clean}${suffix}` : `${base}${suffix}`;
        const dialCode = clean ? `${base}${clean}${encodedSuffix}` : `${base}${encodedSuffix}`;
        btn.setAttribute('href', `tel:${dialCode}`);
        btn.setAttribute('data-code', code);
    };

    if (amountInput) {
        amountInput.addEventListener('input', updateDialer);
    }

    updateDialer();
}

function syncProjectPickerSelection() {
    const picker = document.querySelector('.project-picker');
    if (!picker) return;

    const selected = picker.querySelector('.picker-card.selected');
    const input = picker.querySelector('#projectTypeInput');
    if (selected && input) {
        input.value = selected.textContent.trim();
    }
}

window.onload = function() {
    var badge = document.getElementById('notificationBadge');
    if (badge) {
        badge.style.display = 'none';
        window.setTimeout(function() {
            if (!chatState.isOpen) {
                badge.style.display = 'flex';
            }
        }, 3000);
    }
    
    // Load saved theme
    loadTheme();
    // Load saved language
    loadLanguage();
    // Initialize project picker interactions
    initProjectPicker();
    // Initialize Vodafone Cash dialer
    initVodafoneCashDialer();
};

// ==================== THEME TOGGLE ====================
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = newTheme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = savedTheme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
    }
}

// ==================== LANGUAGE TOGGLE ====================
const translations = {
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            portfolio: 'Portfolio',
            services: 'Services',
            pricing: 'Pricing',
            blog: 'Blog',
            contact: 'Contact'
        },
        home: {
            title: 'Ibrahem Kassap',
            subtitle: 'High-performance websites that turn visitors into clients',
            description: 'I build fast, conversion-focused websites with clean code, modern UI, and SEO-ready structure. Let’s launch your project quickly and professionally.',
            btn1: 'Work With Me',
            btn2: 'View Recent Work',
            btn3: "Let's Build Your Project",
            picker: {
                badge: 'Pick Your Website Type',
                title: 'Tell me what you need, I’ll handle the rest',
                subtitle: 'Select your project type and I’ll guide you to the best solution.',
                cards: {
                    store: 'Online Store',
                    b2b: 'B2B Web',
                    ecommerce: 'E-Commerce',
                    portfolio: 'Portfolio',
                    landing: 'Landing Page',
                    webapp: 'Web App'
                },
                form: {
                    typeLabel: 'Selected project type',
                    typePlaceholder: 'Select a project type above',
                    descLabel: 'Project description',
                    descPlaceholder: 'Tell me a bit about your project goals, pages, or features.',
                    descDefault: 'Write a short brief about your project here...',
                    uploadLabel: 'Add a reference image (optional)',
                    uploadHint: 'Screenshots or inspirations help me estimate faster.',
                    uploadNote: 'After WhatsApp opens, please attach your image manually.'
                },
                ctaText: 'Ready to start? I reply fast and help you choose the right plan.',
                ctaBtn: 'Start Your Project',
                sendBtn: 'Send to WhatsApp'
            }
        },
        shared: {
            cta: {
                explore: {
                    title: 'Explore More'
                },
                cards: {
                    services: {
                        title: 'Our Services',
                        desc: 'Discover what we offer'
                    },
                    pricing: {
                        title: 'Pricing Plans',
                        desc: 'Choose your package'
                    },
                    portfolio: {
                        title: 'Portfolio',
                        desc: 'View our projects'
                    },
                    contact: {
                        title: 'Contact Us',
                        desc: 'Get in touch'
                    }
                }
            }
        },
        about: {
            hero: {
                roleIntro: "I'm a",
                roles: {
                    frontend: 'Frontend Developer',
                    uiux: 'UI/UX Designer',
                    seo: 'SEO Specialist',
                    marketing: 'Digital Marketing'
                },
                desc: 'Frontend developer focused on high-performance websites, clean UI, and measurable business results. 5+ years of experience delivering fast, reliable, and scalable web projects.',
                cta: 'Download CV'
            },
            section: {
                title: 'About Me',
                subtitle: 'Get to know me better',
                whoTitle: 'Who Am I?',
                whoDesc1: 'I graduated from the Sadat Academy for Administrative Sciences in Cairo with a Bachelor\'s degree in Information Technology Systems. I specialize in front-end development, with strong expertise in performance, UX, and SEO. I work on GitHub, and all my projects are freelance; I am not affiliated with any company.',
                whoDesc2: 'I build fast, conversion-focused websites with clean structure, modern UI, and scalable code. My focus is delivering reliable results and long-term maintainability for every client.'
            },
            highlights: {
                kicker: '5+ Years • 50+ Projects • 100+ Clients',
                title: 'Why Clients Trust Me',
                items: {
                    one: {
                        title: 'Production-ready code',
                        desc: 'Clean architecture, fast performance, and maintainable structure.'
                    },
                    two: {
                        title: 'SEO-first mindset',
                        desc: 'Technical SEO, Core Web Vitals, and conversion-focused UX.'
                    },
                    three: {
                        title: 'Clear delivery process',
                        desc: 'Milestones, transparent updates, and on-time delivery.'
                    }
                }
            },
            cards: {
                experience: {
                    title: 'Experience',
                    value: '5+ Years',
                    desc: 'Five years of experience in the field of programming.'
                },
                projects: {
                    title: 'Projects',
                    value: '50+',
                    desc: 'More than 50 projects over five years.'
                },
                clients: {
                    title: 'Happy Clients',
                    value: '100+',
                    desc: 'Over 100 satisfied clients have had positive experiences with me and the services and projects I offer.'
                },
                education: {
                    title: 'Education',
                    value: "Bachelor's Degree",
                    desc: "Bachelor's degree in Information Technology Systems."
                },
                languages: {
                    title: 'Languages',
                    value: 'Arabic & English & Spanish',
                    desc: 'I love learning languages; I speak English and Arabic fluently, and my Spanish pronunciation is limited.'
                },
                location: {
                    title: 'Location',
                    value: 'Cairo, Egypt',
                    desc: 'I was born and live in Cairo.'
                }
            },
            skills: {
                title: 'My Skills',
                htmlcss: 'HTML & CSS',
                javascript: 'JavaScript',
                uiux: 'UI/UX Design',
                seoMarketing: 'SEO & Digital Marketing',
                cyber: 'CYBERSECURITY',
                identity: 'Business Identities'
            },
            certs: {
                title: 'My Certificates',
                subtitle: 'Professional achievements and qualifications'
            },
            cta: {
                title: 'Work With Me',
                cards: {
                    pricing: {
                        title: 'Pricing',
                        desc: 'Affordable packages'
                    },
                    services: {
                        title: 'Services',
                        desc: 'What I do'
                    },
                    portfolio: {
                        title: 'Portfolio',
                        desc: 'My work'
                    },
                    hire: {
                        title: 'Hire Me',
                        desc: "Let's talk"
                    }
                },
                floating: 'Pricing'
            }
        },
        contact: {
            title: 'Get In Touch',
            subtitle: "Let's discuss your project and bring your ideas to life",
            cards: {
                whatsapp: {
                    title: 'WhatsApp',
                    cta: 'Message Me'
                },
                email: {
                    title: 'Email',
                    cta: 'Send Email'
                },
                location: {
                    title: 'Location',
                    value: 'Cairo, Egypt',
                    cta: 'View Map'
                }
            },
            form: {
                title: 'Send Me a Message',
                name: 'Your Name',
                email: 'Your Email',
                subject: 'Subject',
                message: 'Your Message',
                submit: 'Send Message'
            },
            quick: {
                text: 'Or message me directly on',
                cta: 'WhatsApp'
            },
            social: {
                title: 'Follow Me On'
            },
            internalCta: {
                title: 'Before You Go',
                cards: {
                    pricing: {
                        title: 'Pricing',
                        desc: 'Transparent rates'
                    },
                    portfolio: {
                        title: 'Portfolio',
                        desc: 'Our best work'
                    },
                    audit: {
                        title: 'Free Audit',
                        desc: 'Website analysis'
                    },
                    blog: {
                        title: 'Blog',
                        desc: 'Learn & grow'
                    }
                }
            }
        },
        blog: {
            header: {
                title: 'Web Development & Programming Blog',
                subtitle: 'Free tutorials on HTML, CSS, JavaScript, and SEO to help you learn from basics to advanced.'
            },
            cards: {
                landing: {
                    badge: 'New - Arabic Friendly',
                    title: 'Complete Guide: Build a Professional Landing Page',
                    desc: 'Learn step by step how to build a pro landing page using HTML, CSS, and JavaScript with copy-ready code.',
                    cta: 'Start Learning'
                },
                html: {
                    badge: 'High Performance',
                    title: 'HTML Performance Optimization',
                    desc: 'Learn how to build fast, SEO-friendly HTML with practical examples.',
                    cta: 'Start Reading'
                },
                css: {
                    badge: 'Modern Design',
                    title: 'Modern CSS Techniques',
                    desc: 'Explore CSS Variables, Grid, and Flexbox for clean, responsive layouts.',
                    cta: 'Start Reading'
                },
                seo: {
                    badge: 'Rank Higher',
                    title: 'The SEO Checklist for 2026',
                    desc: 'A complete guide to technical SEO, Core Web Vitals, and E-E-A-T signals.',
                    cta: 'Start Reading'
                }
            },
            cta: {
                title: 'Ready to Build?',
                cards: {
                    pricing: {
                        title: 'Pricing',
                        desc: 'View packages'
                    },
                    services: {
                        title: 'Services',
                        desc: 'Our solutions'
                    },
                    projects: {
                        title: 'Projects',
                        desc: 'Live examples'
                    },
                    contact: {
                        title: 'Contact',
                        desc: 'Get quote'
                    }
                },
                floating: 'Pricing'
            }
        },
        audit: {
            title: 'Free Website SEO Audit',
            subtitle: 'Get a custom report with quick wins to boost qualified leads',
            cards: {
                scope: {
                    title: "What you'll get",
                    desc: 'Core Web Vitals, speed, on-page SEO, UX friction, and prioritised fixes.'
                },
                trust: {
                    title: 'Trust indicators',
                    desc: 'Real projects, SEO certificates, and a no-spam policy. 100% free.'
                },
                delivery: {
                    title: 'Delivery',
                    desc: 'Audit summary in 24-48 hours with next-step recommendations.'
                }
            },
            form: {
                title: 'Request Your Audit',
                name: 'Your Name',
                email: 'Your Email',
                website: 'Website URL',
                projectType: 'Project Type (e.g., Portfolio, SaaS)',
                submit: 'Get My Free Audit',
                note: 'By submitting, you agree to be contacted about your audit. No spam.'
            },
            quick: {
                text: 'Prefer chat?',
                cta: 'WhatsApp'
            },
            social: {
                title: 'Featured Work & Credentials'
            },
            cta: {
                title: 'After Your Audit',
                cards: {
                    pricing: {
                        title: 'Pricing',
                        desc: 'Fix issues now'
                    },
                    services: {
                        title: 'Services',
                        desc: 'Full solutions'
                    },
                    success: {
                        title: 'Success Stories',
                        desc: 'See results'
                    },
                    tips: {
                        title: 'SEO Tips',
                        desc: 'Learn more'
                    }
                },
                floating: 'Pricing'
            }
        },
        services: {
            title: 'My Services',
            subtitle: 'What I offer to help your business grow',
            webDev: {
                title: 'Web Development',
                desc: 'Creating responsive and modern websites using the latest technologies. From landing pages to complex web applications, I deliver high-quality solutions tailored to your needs.',
                feat1: 'Responsive Design',
                feat2: 'Modern Technologies',
                feat3: 'Fast Performance'
            },
            uiux: {
                title: 'UI/UX Design',
                desc: 'Designing beautiful and intuitive user interfaces that provide exceptional user experiences. I focus on creating designs that are both aesthetic and functional.',
                feat1: 'User Research',
                feat2: 'Wireframing & Prototyping',
                feat3: 'Visual Design'
            },
            seo: {
                title: 'SEO Optimization',
                desc: 'Improving your website\'s visibility on search engines to drive organic traffic. I implement proven SEO strategies to help your business rank higher.',
                feat1: 'Keyword Research',
                feat2: 'On-Page SEO',
                feat3: 'Technical SEO'
            },
            marketing: {
                title: 'Digital Marketing',
                desc: 'Comprehensive digital marketing strategies to grow your online presence. From social media to email campaigns, I help you reach your target audience effectively.',
                feat1: 'Social Media Marketing',
                feat2: 'Content Strategy',
                feat3: 'Email Marketing'
            },
            brand: {
                title: 'Brand Identity',
                desc: 'Building strong brand identities that resonate with your audience. I create cohesive visual identities including logos, color schemes, and brand guidelines.',
                feat1: 'Logo Design',
                feat2: 'Brand Guidelines',
                feat3: 'Visual Identity'
            },
            maintenance: {
                title: 'Website Maintenance',
                desc: 'Keeping your website running smoothly with regular updates and support. I ensure your site stays secure, fast, and up-to-date with the latest features.',
                feat1: 'Regular Updates',
                feat2: 'Security Monitoring',
                feat3: 'Performance Optimization'
            },
            learnMore: 'Learn More',
            ctaTitle: 'Ready to Start Your Project?',
            ctaDesc: 'Let\'s work together to bring your ideas to life',
            ctaBtn: 'Get In Touch',
            internalCta: {
                title: 'Next Steps',
                cards: {
                    pricing: {
                        title: 'View Pricing',
                        desc: 'Check our packages'
                    },
                    work: {
                        title: 'Our Work',
                        desc: 'See live projects'
                    },
                    audit: {
                        title: 'Free Audit',
                        desc: 'Get SEO analysis'
                    },
                    contact: {
                        title: 'Contact',
                        desc: 'Start your project'
                    }
                }
            }
        },
        portfolio: {
            title: 'My Portfolio',
            subtitle: 'Check out my latest projects and work',
            viewLive: 'View Live',
            items: {
                anubis: {
                    title: 'ANUBIS-MUSUIM',
                    desc: 'An interactive museum website showcasing ancient Egyptian artifacts and history.',
                    cta: 'ANUBIS-MUSUIM'
                },
                cv: {
                    title: '3D CV Portfolio Project',
                    desc: 'A modern, responsive website built using HTML, CSS, and JavaScript, featuring a sleek design and smooth animations to showcase your resume professionally.'
                },
                rgbClock: {
                    title: 'RGB Clock Project',
                    desc: 'A digital clock project built with HTML, CSS, and JavaScript that displays time in RGB color format.'
                },
                creativeLanding: {
                    title: 'Creative Landing Page',
                    desc: 'A modern, responsive landing page built using HTML, CSS, and JavaScript, featuring a sleek design and smooth animations to showcase your business or product.'
                },
                pos: {
                    title: 'Cashier System (POS)',
                    desc: 'A point-of-sale system built with HTML, CSS, JavaScript, and React, designed for efficient transaction processing and inventory management.'
                },
                domzi: {
                    title: 'Domzi Art Store',
                    desc: 'A modern e-commerce website for an art store built with HTML, CSS, and JavaScript, featuring a responsive design and product showcase.'
                },
                clinic: {
                    title: 'Perfect Clinic',
                    desc: 'A modern clinic website built with HTML, CSS, and JavaScript, featuring a responsive design and appointment booking system.'
                },
                samsung: {
                    title: 'Samsung AI Landing Page',
                    desc: 'A responsive landing page for Samsung\'s AI products built with HTML, CSS, and JavaScript.'
                },
                xbet: {
                    title: '1xBet Agent Landing Page',
                    desc: 'A responsive landing page for 1xBet agents built with HTML, CSS, and JavaScript.'
                },
                miraj: {
                    title: 'Miraj',
                    desc: 'A responsive landing page for Miraj built with HTML, CSS, and JavaScript.'
                },
                mrx: {
                    title: 'MR-X AI Chatbot',
                    desc: 'A responsive landing page for MR-X AI Chatbot built with HTML, CSS, and JavaScript (Demo View).'
                }
            },
            cta: {
                title: 'Like What You See?',
                cards: {
                    getStarted: {
                        title: 'Get Started',
                        desc: 'Choose your plan'
                    },
                    services: {
                        title: 'Services',
                        desc: 'What we offer'
                    },
                    learn: {
                        title: 'Learn',
                        desc: 'Free tutorials'
                    },
                    discuss: {
                        title: 'Discuss',
                        desc: 'Your project'
                    }
                }
            },
            pricingBtn: 'Pricing'
        },
        pricing: {
            title: 'Choose Your Plan',
            subtitle: 'Select the perfect package for your needs',
            free: {
                name: 'Free Plan',
                price: '0',
                period: '/forever',
                feat1: 'Browse Portfolio',
                feat2: 'Read Blog Articles',
                feat3: 'Free SEO Audit',
                feat4: 'Email Support',
                feat5: 'Community Access',
                btn: 'Get Started'
            },
            silver: {
                badge: 'Most Popular',
                name: 'Silver Plan',
                price: '2,500',
                period: '/one-time',
                feat1: '1 Landing Page',
                feat2: 'Responsive Design',
                feat3: 'SEO Optimized',
                feat4: 'Fast Loading Speed',
                feat5: 'Contact Form Integration',
                feat6: '3 Revisions',
                feat7: '1 Month Free Support',
                feat8: 'Source Code Included',
                feat9: '7-10 Days Delivery',
                btn: 'Choose Silver'
            },
            gold: {
                name: 'Gold Plan',
                price: '10,000',
                period: '/one-time',
                feat1: 'Full Website (5-10 Pages)',
                feat2: 'Custom Design',
                feat3: 'Advanced SEO Setup',
                feat4: 'Performance Optimization',
                feat5: 'CMS Integration',
                feat6: 'E-commerce Ready',
                feat7: 'Unlimited Revisions',
                feat8: '3 Months Free Support',
                feat9: 'Priority Support 24/7',
                feat10: 'Free Hosting Setup',
                feat11: 'Analytics Integration',
                feat12: '14-21 Days Delivery',
                btn: 'Choose Gold'
            },
            faqTitle: 'Frequently Asked Questions',
            faq1Q: 'What payment methods do you accept?',
            faq1A: 'We accept InstaPay, Vodafone Cash, and Fawry Pay.',
            faq2Q: 'Can I upgrade my plan later?',
            faq2A: 'Yes! You can upgrade anytime and pay only the difference.',
            faq3Q: 'Do you offer refunds?',
            faq3A: 'We offer a 14-day money-back guarantee if you\'re not satisfied.',
            faq4Q: 'What if I need custom features?',
            faq4A: 'Contact us for a custom quote tailored to your specific needs.',
            cta: {
                title: 'Ready to Get Started?',
                desc: 'Choose your plan and start building your dream website today.',
                btnContact: 'Contact Us',
                btnPortfolio: 'View Our Work'
            }
        },
        payment: {
            title: 'Professional Payment Options',
            subtitle: 'Choose a method, send the receipt, and we\'ll confirm quickly.',
            instapay: {
                title: 'InstaPay',
                desc: 'Fast transfer to the same number'
            },
            vodafone: {
                title: 'Vodafone Cash',
                desc: 'Instant wallet transfer to this number',
                directTitle: 'Vodafone Cash Direct Code',
                directDesc: 'Enter the amount and tap the button to open your dialer with the code ready.',
                amountLabel: 'Amount (EGP)',
                amountPlaceholder: 'Enter amount',
                directBtn: 'Pay with Vodafone Cash',
                directNote: 'The code uses *9*7*01017358087*amount# and opens your dialer automatically.'
            },
            fawry: {
                title: 'Fawry Pay',
                desc: 'Available on request',
                badge: 'Request Code'
            },
            steps: {
                one: 'Choose InstaPay, Vodafone Cash, or Fawry Pay.',
                two: 'Send the receipt on WhatsApp for instant confirmation.'
            },
            notePrefix: 'After payment, send the receipt via',
            noteOr: 'or',
            noteSuffix: '.'
        },
        footer: 'Copyright © 2023 by Ibrahem Kassap | All Rights Reserved.'
    },
    ar: {
        nav: {
            home: 'الرئيسية',
            about: 'من أنا',
            portfolio: 'الأعمال',
            services: 'الخدمات',
            pricing: 'الباقات',
            blog: 'المدونة',
            contact: 'تواصل'
        },
        home: {
            title: 'إبراهيم كساب',
            subtitle: 'مواقع عالية الأداء تحوّل الزائر إلى عميل',
            description: 'أبني مواقع سريعة تركز على التحويل بكود نظيف وواجهة حديثة وتجهيز كامل للسيو. لنطلق مشروعك بسرعة وباحتراف.',
            btn1: 'اعمل معي الآن',
            btn2: 'شاهد أحدث الأعمال',
            btn3: 'لنبدأ مشروعك',
            picker: {
                badge: 'اختر نوع موقعك',
                title: 'اختر النوع وسأتولى الباقي',
                subtitle: 'حدد نوع المشروع وسأوجهك للحل الأنسب.',
                cards: {
                    store: 'متجر إلكتروني',
                    b2b: 'موقع أعمال B2B',
                    ecommerce: 'تجارة إلكترونية',
                    portfolio: 'بورتفوليو',
                    landing: 'صفحة هبوط',
                    webapp: 'تطبيق ويب'
                },
                form: {
                    typeLabel: 'نوع المشروع المختار',
                    typePlaceholder: 'اختر نوع المشروع من الأعلى',
                    descLabel: 'وصف المشروع',
                    descPlaceholder: 'اكتب أهداف المشروع والصفحات أو المزايا المطلوبة.',
                    descDefault: 'اكتب نبذة قصيرة عن مشروعك هنا...',
                    uploadLabel: 'أضف صورة مرجعية (اختياري)',
                    uploadHint: 'الصور أو أمثلة الإلهام تساعدني على التقدير أسرع.',
                    uploadNote: 'بعد فتح واتساب، برجاء إرفاق الصورة يدويًا.'
                },
                ctaText: 'جاهز للانطلاق؟ أرد بسرعة وأساعدك في اختيار الخطة المناسبة.',
                ctaBtn: 'ابدأ مشروعك',
                sendBtn: 'إرسال عبر واتساب'
            }
        },
        shared: {
            cta: {
                explore: {
                    title: 'اكتشف المزيد'
                },
                cards: {
                    services: {
                        title: 'خدماتنا',
                        desc: 'اكتشف ما نقدمه'
                    },
                    pricing: {
                        title: 'خطط الأسعار',
                        desc: 'اختر الباقة المناسبة'
                    },
                    portfolio: {
                        title: 'معرض الأعمال',
                        desc: 'شاهد مشاريعنا'
                    },
                    contact: {
                        title: 'تواصل معنا',
                        desc: 'تواصل الآن'
                    }
                }
            }
        },
        about: {
            hero: {
                roleIntro: 'أنا',
                roles: {
                    frontend: 'مطور واجهات أمامية',
                    uiux: 'مصمم واجهات وتجربة مستخدم',
                    seo: 'متخصص SEO',
                    marketing: 'تسويق رقمي'
                },
                desc: 'مطور واجهات أمامية يركز على الأداء العالي وتجربة المستخدم والنتائج العملية. خبرة أكثر من 5 سنوات في تنفيذ مشاريع ويب سريعة وموثوقة وقابلة للتوسع.',
                cta: 'تحميل السيرة الذاتية'
            },
            section: {
                title: 'من أنا',
                subtitle: 'تعرف علي أكثر',
                whoTitle: 'من أنا؟',
                whoDesc1: 'تخرجت من أكاديمية السادات للعلوم الإدارية بالقاهرة بدرجة البكالوريوس في نظم معلومات التكنولوجيا. أتخصص في تطوير الواجهات الأمامية مع خبرة قوية في الأداء وتجربة المستخدم وSEO. أعمل على GitHub وجميع مشاريعي عمل حر ولا أنتمي لأي شركة.',
                whoDesc2: 'أبني مواقع سريعة تركز على التحويل بهيكل نظيف وواجهة حديثة وكود قابل للتطوير. هدفي تقديم نتائج موثوقة واستدامة طويلة المدى لكل عميل.'
            },
            highlights: {
                kicker: 'أكثر من 5 سنوات • 50+ مشروع • 100+ عميل',
                title: 'لماذا يثق بي العملاء',
                items: {
                    one: {
                        title: 'كود جاهز للإنتاج',
                        desc: 'هيكل نظيف وأداء سريع وقابلية صيانة عالية.'
                    },
                    two: {
                        title: 'تفكير SEO أولاً',
                        desc: 'SEO تقني وCore Web Vitals وتجربة مستخدم تركز على التحويل.'
                    },
                    three: {
                        title: 'عملية تسليم واضحة',
                        desc: 'مراحل عمل محددة وتحديثات شفافة وتسليم في الموعد.'
                    }
                }
            },
            cards: {
                experience: {
                    title: 'الخبرة',
                    value: 'أكثر من 5 سنوات',
                    desc: 'خمس سنوات خبرة في مجال البرمجة.'
                },
                projects: {
                    title: 'المشاريع',
                    value: '50+',
                    desc: 'أكثر من 50 مشروعًا خلال خمس سنوات.'
                },
                clients: {
                    title: 'عملاء سعداء',
                    value: '100+',
                    desc: 'أكثر من 100 عميل راضٍ عن الخدمات والمشاريع التي أقدمها.'
                },
                education: {
                    title: 'التعليم',
                    value: 'بكالوريوس',
                    desc: 'بكالوريوس نظم معلومات التكنولوجيا.'
                },
                languages: {
                    title: 'اللغات',
                    value: 'العربية والإنجليزية والإسبانية',
                    desc: 'أحب تعلم اللغات؛ أتحدث العربية والإنجليزية بطلاقة ونطقي للإسبانية محدود.'
                },
                location: {
                    title: 'الموقع',
                    value: 'القاهرة، مصر',
                    desc: 'ولدت وأعيش في القاهرة.'
                }
            },
            skills: {
                title: 'مهاراتي',
                htmlcss: 'HTML وCSS',
                javascript: 'JavaScript',
                uiux: 'تصميم UI/UX',
                seoMarketing: 'SEO والتسويق الرقمي',
                cyber: 'الأمن السيبراني',
                identity: 'هويات تجارية'
            },
            certs: {
                title: 'شهاداتي',
                subtitle: 'الإنجازات والمؤهلات المهنية'
            },
            cta: {
                title: 'اعمل معي',
                cards: {
                    pricing: {
                        title: 'الأسعار',
                        desc: 'باقات مناسبة'
                    },
                    services: {
                        title: 'الخدمات',
                        desc: 'ما أقدمه'
                    },
                    portfolio: {
                        title: 'الأعمال',
                        desc: 'نماذج من عملي'
                    },
                    hire: {
                        title: 'وظفني',
                        desc: 'لنتحدث'
                    }
                },
                floating: 'الأسعار'
            }
        },
        contact: {
            title: 'تواصل معي',
            subtitle: 'لنتحدث عن مشروعك ونحوّل أفكارك إلى واقع',
            cards: {
                whatsapp: {
                    title: 'واتساب',
                    cta: 'راسلني'
                },
                email: {
                    title: 'البريد الإلكتروني',
                    cta: 'إرسال بريد'
                },
                location: {
                    title: 'الموقع',
                    value: 'القاهرة، مصر',
                    cta: 'عرض الخريطة'
                }
            },
            form: {
                title: 'أرسل رسالة',
                name: 'اسمك',
                email: 'بريدك الإلكتروني',
                subject: 'الموضوع',
                message: 'رسالتك',
                submit: 'إرسال الرسالة'
            },
            quick: {
                text: 'أو راسلني مباشرة على',
                cta: 'واتساب'
            },
            social: {
                title: 'تابعني على'
            },
            internalCta: {
                title: 'قبل أن تغادر',
                cards: {
                    pricing: {
                        title: 'الأسعار',
                        desc: 'أسعار واضحة'
                    },
                    portfolio: {
                        title: 'معرض الأعمال',
                        desc: 'أفضل أعمالنا'
                    },
                    audit: {
                        title: 'تدقيق مجاني',
                        desc: 'تحليل الموقع'
                    },
                    blog: {
                        title: 'المدونة',
                        desc: 'تعلم وتطور'
                    }
                }
            }
        },
        blog: {
            header: {
                title: 'مدونة تطوير الويب والبرمجة',
                subtitle: 'دروس مجانية في HTML وCSS وJavaScript وSEO من المبتدئ حتى المتقدم.'
            },
            cards: {
                landing: {
                    badge: 'جديد - مناسب للعربية',
                    title: 'دليل كامل: إنشاء صفحة هبوط احترافية',
                    desc: 'تعلّم خطوة بخطوة بناء صفحة هبوط احترافية باستخدام HTML وCSS وJavaScript مع كود جاهز.',
                    cta: 'ابدأ التعلم'
                },
                html: {
                    badge: 'أداء عالٍ',
                    title: 'تحسين أداء HTML',
                    desc: 'تعلّم بناء HTML سريع ومحسّن للسيو مع أمثلة عملية.',
                    cta: 'ابدأ القراءة'
                },
                css: {
                    badge: 'تصميم عصري',
                    title: 'تقنيات CSS الحديثة',
                    desc: 'استكشف CSS Variables وGrid وFlexbox لبناء تخطيطات متجاوبة.',
                    cta: 'ابدأ القراءة'
                },
                seo: {
                    badge: 'تصدر النتائج',
                    title: 'قائمة فحص SEO لعام 2026',
                    desc: 'دليل شامل للسيو التقني وCore Web Vitals وإشارات E-E-A-T.',
                    cta: 'ابدأ القراءة'
                }
            },
            cta: {
                title: 'جاهز للانطلاق؟',
                cards: {
                    pricing: {
                        title: 'الأسعار',
                        desc: 'عرض الباقات'
                    },
                    services: {
                        title: 'الخدمات',
                        desc: 'حلولنا'
                    },
                    projects: {
                        title: 'المشاريع',
                        desc: 'أمثلة مباشرة'
                    },
                    contact: {
                        title: 'تواصل',
                        desc: 'احصل على عرض'
                    }
                },
                floating: 'الأسعار'
            }
        },
        audit: {
            title: 'تدقيق SEO مجاني للموقع',
            subtitle: 'احصل على تقرير مخصص مع تحسينات سريعة لزيادة العملاء المحتملين',
            cards: {
                scope: {
                    title: 'ما الذي ستحصل عليه',
                    desc: 'Core Web Vitals والسرعة وSEO الداخلي واحتكاك UX وأولويات الإصلاح.'
                },
                trust: {
                    title: 'عناصر الثقة',
                    desc: 'مشاريع حقيقية وشهادات SEO وسياسة بدون إزعاج. 100% مجاني.'
                },
                delivery: {
                    title: 'التسليم',
                    desc: 'ملخص التدقيق خلال 24-48 ساعة مع توصيات الخطوة التالية.'
                }
            },
            form: {
                title: 'اطلب تدقيقك',
                name: 'اسمك',
                email: 'بريدك الإلكتروني',
                website: 'رابط الموقع',
                projectType: 'نوع المشروع (مثل بورتفوليو، SaaS)',
                submit: 'احصل على التدقيق المجاني',
                note: 'بإرسال النموذج، توافق على التواصل بشأن التدقيق. بدون رسائل مزعجة.'
            },
            quick: {
                text: 'تفضل الدردشة؟',
                cta: 'واتساب'
            },
            social: {
                title: 'أعمال بارزة واعتمادات'
            },
            cta: {
                title: 'بعد التدقيق',
                cards: {
                    pricing: {
                        title: 'الأسعار',
                        desc: 'اصلح المشاكل الآن'
                    },
                    services: {
                        title: 'الخدمات',
                        desc: 'حلول كاملة'
                    },
                    success: {
                        title: 'قصص نجاح',
                        desc: 'شاهد النتائج'
                    },
                    tips: {
                        title: 'نصائح SEO',
                        desc: 'تعلّم المزيد'
                    }
                },
                floating: 'الأسعار'
            }
        },
        services: {
            title: 'خدماتي',
            subtitle: 'ما أقدمه لمساعدة عملك على النمو',
            webDev: {
                title: 'تطوير المواقع',
                desc: 'إنشاء مواقع ويب متجاوبة وحديثة باستخدام أحدث التقنيات. من صفحات الهبوط إلى تطبيقات الويب المعقدة، أقدم حلولًا عالية الجودة مصممة خصيصًا لاحتياجاتك.',
                feat1: 'تصميم متجاوب',
                feat2: 'تقنيات حديثة',
                feat3: 'أداء سريع'
            },
            uiux: {
                title: 'تصميم UI/UX',
                desc: 'تصميم واجهات مستخدم جميلة وبديهية تقدم تجربة استخدام استثنائية. أركز على تصميمات تجمع بين الجمال والوظيفة.',
                feat1: 'بحث المستخدم',
                feat2: 'نماذج أولية وتخطيط',
                feat3: 'تصميم بصري'
            },
            seo: {
                title: 'تحسين محركات البحث',
                desc: 'تحسين ظهور موقعك في محركات البحث لزيادة الزيارات العضوية. أطبق استراتيجيات SEO مثبتة لمساعدة عملك على التصدّر.',
                feat1: 'بحث الكلمات المفتاحية',
                feat2: 'تحسين داخلي',
                feat3: 'SEO تقني'
            },
            marketing: {
                title: 'التسويق الرقمي',
                desc: 'استراتيجيات تسويق رقمي شاملة لتنمية وجودك على الإنترنت. من وسائل التواصل الاجتماعي إلى حملات البريد الإلكتروني، أساعدك على الوصول لجمهورك المستهدف بفاعلية.',
                feat1: 'تسويق عبر الشبكات',
                feat2: 'استراتيجية محتوى',
                feat3: 'تسويق بالبريد'
            },
            brand: {
                title: 'الهوية التجارية',
                desc: 'بناء هويات تجارية قوية تتناغم مع جمهورك. أقدم هويات بصرية متماسكة تشمل الشعارات والألوان وإرشادات العلامة التجارية.',
                feat1: 'تصميم شعار',
                feat2: 'دليل العلامة',
                feat3: 'هوية بصرية'
            },
            maintenance: {
                title: 'صيانة المواقع',
                desc: 'الحفاظ على موقعك يعمل بسلاسة عبر تحديثات ودعم منتظم. أضمن أن يبقى موقعك آمنًا وسريعًا ومحدّثًا بأحدث الميزات.',
                feat1: 'تحديثات منتظمة',
                feat2: 'مراقبة الأمان',
                feat3: 'تحسين الأداء'
            },
            learnMore: 'اعرف المزيد',
            ctaTitle: 'جاهز لبدء مشروعك؟',
            ctaDesc: 'دعنا نعمل معًا لتحويل أفكارك إلى واقع',
            ctaBtn: 'تواصل معي',
            internalCta: {
                title: 'خطوتك التالية',
                cards: {
                    pricing: {
                        title: 'الأسعار',
                        desc: 'تعرف على الباقات'
                    },
                    work: {
                        title: 'أعمالي',
                        desc: 'شاهد مشاريع حية'
                    },
                    audit: {
                        title: 'تدقيق مجاني',
                        desc: 'تحليل سيو سريع'
                    },
                    contact: {
                        title: 'تواصل',
                        desc: 'ابدأ مشروعك'
                    }
                }
            }
        },
        portfolio: {
            title: 'معرض أعمالي',
            subtitle: 'اطّلع على أحدث مشاريعي وأعمالي',
            viewLive: 'عرض مباشر',
            items: {
                anubis: {
                    title: 'متحف أنوبيس',
                    desc: 'موقع متحف تفاعلي يعرض الآثار وتاريخ مصر القديمة.',
                    cta: 'متحف أنوبيس'
                },
                cv: {
                    title: 'مشروع سيرة ذاتية ثلاثي الأبعاد',
                    desc: 'موقع حديث ومتجاوب مبني بـ HTML وCSS وJavaScript مع تصميم أنيق وحركات سلسة لعرض سيرتك الذاتية باحتراف.'
                },
                rgbClock: {
                    title: 'مشروع ساعة RGB',
                    desc: 'مشروع ساعة رقمية مبني بـ HTML وCSS وJavaScript يعرض الوقت بألوان RGB.'
                },
                creativeLanding: {
                    title: 'صفحة هبوط إبداعية',
                    desc: 'صفحة هبوط حديثة ومتجاوبة مبنية بـ HTML وCSS وJavaScript مع تصميم أنيق وحركات سلسة لعرض نشاطك أو منتجك.'
                },
                pos: {
                    title: 'نظام كاشير (POS)',
                    desc: 'نظام نقاط بيع مبني بـ HTML وCSS وJavaScript وReact لمعالجة المعاملات وإدارة المخزون بكفاءة.'
                },
                domzi: {
                    title: 'متجر دومزي الفني',
                    desc: 'موقع تجارة إلكترونية حديث لمتجر فني مبني بـ HTML وCSS وJavaScript مع تصميم متجاوب وعرض للمنتجات.'
                },
                clinic: {
                    title: 'عيادة بيرفكت',
                    desc: 'موقع عيادة حديث مبني بـ HTML وCSS وJavaScript مع تصميم متجاوب ونظام لحجز المواعيد.'
                },
                samsung: {
                    title: 'صفحة هبوط سامسونج للذكاء الاصطناعي',
                    desc: 'صفحة هبوط متجاوبة لمنتجات سامسونج الذكية مبنية بـ HTML وCSS وJavaScript.'
                },
                xbet: {
                    title: 'صفحة هبوط وكلاء 1xBet',
                    desc: 'صفحة هبوط متجاوبة لوكلاء 1xBet مبنية بـ HTML وCSS وJavaScript.'
                },
                miraj: {
                    title: 'ميراج',
                    desc: 'صفحة هبوط متجاوبة لميراج مبنية بـ HTML وCSS وJavaScript.'
                },
                mrx: {
                    title: 'شات بوت MR-X',
                    desc: 'صفحة هبوط متجاوبة لشات بوت MR-X مبنية بـ HTML وCSS وJavaScript (عرض تجريبي).'
                }
            },
            cta: {
                title: 'هل أعجبك ما ترى؟',
                cards: {
                    getStarted: {
                        title: 'ابدأ الآن',
                        desc: 'اختر خطتك'
                    },
                    services: {
                        title: 'الخدمات',
                        desc: 'ما الذي نقدمه'
                    },
                    learn: {
                        title: 'تعلّم',
                        desc: 'دروس مجانية'
                    },
                    discuss: {
                        title: 'ناقش',
                        desc: 'مشروعك'
                    }
                }
            },
            pricingBtn: 'الأسعار'
        },
        pricing: {
            title: 'اختر باقتك',
            subtitle: 'اختر الباقة المثالية لاحتياجاتك',
            free: {
                name: 'الباقة المجانية',
                price: '0',
                period: '/مجانا للأبد',
                feat1: 'تصفح الأعمال',
                feat2: 'قراءة مقالات المدونة',
                feat3: 'تدقيق SEO مجاني',
                feat4: 'دعم عبر البريد',
                feat5: 'الوصول للمجتمع',
                btn: 'ابدأ الآن'
            },
            silver: {
                badge: 'الأكثر شعبية',
                name: 'الباقة الفضية',
                price: '2,500',
                period: '/دفعة واحدة',
                feat1: 'صفحة هبوط واحدة',
                feat2: 'تصميم متجاوب',
                feat3: 'محسن لمحركات البحث',
                feat4: 'سرعة تحميل عالية',
                feat5: 'نموذج اتصال',
                feat6: '3 تعديلات',
                feat7: 'دعم مجاني لمدة شهر',
                feat8: 'الكود المصدري متضمن',
                feat9: 'التسليم 7-10 أيام',
                btn: 'اختر الفضية'
            },
            gold: {
                name: 'الباقة الذهبية',
                price: '10,000',
                period: '/دفعة واحدة',
                feat1: 'موقع كامل (5-10 صفحات)',
                feat2: 'تصميم مخصص',
                feat3: 'إعداد SEO متقدم',
                feat4: 'تحسين الأداء',
                feat5: 'تكامل CMS',
                feat6: 'جاهز للتجارة الإلكترونية',
                feat7: 'تعديلات غير محدودة',
                feat8: 'دعم مجاني 3 أشهر',
                feat9: 'دعم أولوية 24/7',
                feat10: 'إعداد استضافة مجاني',
                feat11: 'تكامل التحليلات',
                feat12: 'التسليم 14-21 يوم',
                btn: 'اختر الذهبية'
            },
            faqTitle: 'الأسئلة الشائعة',
            faq1Q: 'ما هي طرق الدفع المقبولة؟',
            faq1A: 'نقبل إنستا باي وفودافون كاش وفوري باي.',
            faq2Q: 'هل يمكنني الترقية لاحقًا؟',
            faq2A: 'نعم! يمكنك الترقية في أي وقت ودفع الفرق فقط.',
            faq3Q: 'هل تقدمون استرداد الأموال؟',
            faq3A: 'نقدم ضمان استرداد الأموال لمدة 14 يومًا إذا لم تكن راضيًا.',
            faq4Q: 'ماذا لو احتجت ميزات مخصصة؟',
            faq4A: 'تواصل معنا للحصول على عرض سعر مخصص لاحتياجاتك.',
            cta: {
                title: 'جاهز للانطلاق؟',
                desc: 'اختر باقتك وابدأ بناء موقعك الآن باحتراف.',
                btnContact: 'تواصل معنا',
                btnPortfolio: 'شاهد أعمالنا'
            }
        },
        payment: {
            title: 'خيارات دفع احترافية',
            subtitle: 'اختر الطريقة المناسبة، أرسل الإيصال، وسنؤكد بسرعة.',
            instapay: {
                title: 'إنستا باي',
                desc: 'تحويل سريع على نفس الرقم'
            },
            vodafone: {
                title: 'فودافون كاش',
                desc: 'تحويل فوري من المحفظة إلى هذا الرقم',
                directTitle: 'كود فودافون كاش المباشر',
                directDesc: 'أدخل المبلغ واضغط الزر لفتح شاشة الاتصال بالكود جاهزًا.',
                amountLabel: 'المبلغ (جنيه)',
                amountPlaceholder: 'أدخل المبلغ',
                directBtn: 'ادفع بفودافون كاش',
                directNote: 'الكود المستخدم: *9*7*01017358087*المبلغ# وسيتم فتح شاشة الاتصال تلقائيًا.'
            },
            fawry: {
                title: 'فوري باي',
                desc: 'متاح عند الطلب',
                badge: 'اطلب الكود'
            },
            steps: {
                one: 'اختر إنستا باي أو فودافون كاش أو فوري باي.',
                two: 'أرسل الإيصال عبر واتساب للتأكيد الفوري.'
            },
            notePrefix: 'بعد الدفع، أرسل الإيصال عبر',
            noteOr: 'أو',
            noteSuffix: '.'
        },
        footer: 'جميع الحقوق محفوظة © 2023 إبراهيم كساب'
    }
};

function toggleLanguage() {
    const html = document.documentElement;
    const currentLang = html.getAttribute('lang') || 'en';
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    
    html.setAttribute('lang', newLang);
    html.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('language', newLang);
    
    // Update button text
    const langBtn = document.querySelector('.lang-text');
    if (langBtn) {
        langBtn.textContent = newLang === 'en' ? 'AR' : 'EN';
    }
    
    // Update page content
    updatePageContent(newLang);
    
    // Ensure menu icon stays visible on mobile
    setTimeout(() => {
        const menuIcon = document.querySelector('.menu-icon');
        if (menuIcon && window.innerWidth <= 768) {
            menuIcon.style.display = 'flex';
        }
    }, 100);
}

function loadLanguage() {
    const savedLang = localStorage.getItem('language') || 'ar';
    const html = document.documentElement;
    
    html.setAttribute('lang', savedLang);
    html.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
    
    const langBtn = document.querySelector('.lang-text');
    if (langBtn) {
        langBtn.textContent = savedLang === 'en' ? 'AR' : 'EN';
    }
    
    updatePageContent(savedLang);
}

function getTranslationValue(obj, path) {
    return path.split('.').reduce((acc, part) => {
        if (acc && Object.prototype.hasOwnProperty.call(acc, part)) {
            return acc[part];
        }
        return undefined;
    }, obj);
}

function updatePageContent(lang) {
    const t = translations[lang];
    
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const value = getTranslationValue(t, key);
        if (typeof value === 'string') {
            el.textContent = value;
        }
    });

    const i18nAttrElements = document.querySelectorAll('[data-i18n-attr]');
    i18nAttrElements.forEach((el) => {
        const attrList = el.getAttribute('data-i18n-attr');
        if (!attrList) return;
        const key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-key');
        if (!key) return;
        const value = getTranslationValue(t, key);
        if (typeof value !== 'string') return;
        attrList.split(',').map((attr) => attr.trim()).filter(Boolean).forEach((attr) => {
            el.setAttribute(attr, value);
        });
    });

    syncProjectPickerSelection();

    // Update navigation
    const navLinks = document.querySelectorAll('.nav-links li a');
    if (navLinks.length >= 6) {
        navLinks[0].textContent = t.nav.home;
        navLinks[1].textContent = t.nav.about;
        navLinks[2].textContent = t.nav.portfolio;
        navLinks[3].textContent = t.nav.services;
        if (navLinks.length >= 7) {
            navLinks[4].textContent = t.nav.pricing;
            navLinks[5].textContent = t.nav.blog;
            navLinks[6].textContent = t.nav.contact;
        } else {
            navLinks[4].textContent = t.nav.blog;
            navLinks[5].textContent = t.nav.contact;
        }
    }
    
    // Update home page content
    const homeTitle = document.querySelector('.home-info h1');
    const homeSubtitle = document.querySelector('.home-info h2');
    const homeDesc = document.querySelector('.home-info p');
    const btns = document.querySelectorAll('.btn-sci .btn');
    
    if (homeTitle) homeTitle.textContent = t.home.title;
    if (homeSubtitle) homeSubtitle.textContent = t.home.subtitle;
    if (homeDesc) homeDesc.textContent = t.home.description;
    
    if (btns.length >= 2) {
        btns[0].textContent = t.home.btn1;
        btns[1].textContent = t.home.btn2;
        if (btns[2]) {
            btns[2].textContent = t.home.btn3;
        }
    }
    
    // Update services page content
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length >= 6) {
        const servicesTitle = document.querySelector('.section-header h2');
        const servicesSubtitle = document.querySelector('.section-header p');
        
        if (servicesTitle) servicesTitle.textContent = t.services.title;
        if (servicesSubtitle) servicesSubtitle.textContent = t.services.subtitle;

        // Web Development
        serviceCards[0].querySelector('h3').textContent = t.services.webDev.title;
        serviceCards[0].querySelector('p').textContent = t.services.webDev.desc;
        const webDevFeats = serviceCards[0].querySelectorAll('.service-features li');
        if (webDevFeats.length >= 3) {
            webDevFeats[0].innerHTML = `<i class='bx bx-check'></i> ${t.services.webDev.feat1}`;
            webDevFeats[1].innerHTML = `<i class='bx bx-check'></i> ${t.services.webDev.feat2}`;
            webDevFeats[2].innerHTML = `<i class='bx bx-check'></i> ${t.services.webDev.feat3}`;
        }
        serviceCards[0].querySelector('.service-btn').innerHTML = `${t.services.learnMore} <i class='bx bx-right-arrow-alt'></i>`;
        
        // UI/UX Design
        serviceCards[1].querySelector('h3').textContent = t.services.uiux.title;
        serviceCards[1].querySelector('p').textContent = t.services.uiux.desc;
        const uiuxFeats = serviceCards[1].querySelectorAll('.service-features li');
        if (uiuxFeats.length >= 3) {
            uiuxFeats[0].innerHTML = `<i class='bx bx-check'></i> ${t.services.uiux.feat1}`;
            uiuxFeats[1].innerHTML = `<i class='bx bx-check'></i> ${t.services.uiux.feat2}`;
            uiuxFeats[2].innerHTML = `<i class='bx bx-check'></i> ${t.services.uiux.feat3}`;
        }
        serviceCards[1].querySelector('.service-btn').innerHTML = `${t.services.learnMore} <i class='bx bx-right-arrow-alt'></i>`;
        
        // SEO
        serviceCards[2].querySelector('h3').textContent = t.services.seo.title;
        serviceCards[2].querySelector('p').textContent = t.services.seo.desc;
        const seoFeats = serviceCards[2].querySelectorAll('.service-features li');
        if (seoFeats.length >= 3) {
            seoFeats[0].innerHTML = `<i class='bx bx-check'></i> ${t.services.seo.feat1}`;
            seoFeats[1].innerHTML = `<i class='bx bx-check'></i> ${t.services.seo.feat2}`;
            seoFeats[2].innerHTML = `<i class='bx bx-check'></i> ${t.services.seo.feat3}`;
        }
        serviceCards[2].querySelector('.service-btn').innerHTML = `${t.services.learnMore} <i class='bx bx-right-arrow-alt'></i>`;
        
        // Digital Marketing
        serviceCards[3].querySelector('h3').textContent = t.services.marketing.title;
        serviceCards[3].querySelector('p').textContent = t.services.marketing.desc;
        const marketingFeats = serviceCards[3].querySelectorAll('.service-features li');
        if (marketingFeats.length >= 3) {
            marketingFeats[0].innerHTML = `<i class='bx bx-check'></i> ${t.services.marketing.feat1}`;
            marketingFeats[1].innerHTML = `<i class='bx bx-check'></i> ${t.services.marketing.feat2}`;
            marketingFeats[2].innerHTML = `<i class='bx bx-check'></i> ${t.services.marketing.feat3}`;
        }
        serviceCards[3].querySelector('.service-btn').innerHTML = `${t.services.learnMore} <i class='bx bx-right-arrow-alt'></i>`;
        
        // Brand Identity
        serviceCards[4].querySelector('h3').textContent = t.services.brand.title;
        serviceCards[4].querySelector('p').textContent = t.services.brand.desc;
        const brandFeats = serviceCards[4].querySelectorAll('.service-features li');
        if (brandFeats.length >= 3) {
            brandFeats[0].innerHTML = `<i class='bx bx-check'></i> ${t.services.brand.feat1}`;
            brandFeats[1].innerHTML = `<i class='bx bx-check'></i> ${t.services.brand.feat2}`;
            brandFeats[2].innerHTML = `<i class='bx bx-check'></i> ${t.services.brand.feat3}`;
        }
        serviceCards[4].querySelector('.service-btn').innerHTML = `${t.services.learnMore} <i class='bx bx-right-arrow-alt'></i>`;
        
        // Website Maintenance
        serviceCards[5].querySelector('h3').textContent = t.services.maintenance.title;
        serviceCards[5].querySelector('p').textContent = t.services.maintenance.desc;
        const maintenanceFeats = serviceCards[5].querySelectorAll('.service-features li');
        if (maintenanceFeats.length >= 3) {
            maintenanceFeats[0].innerHTML = `<i class='bx bx-check'></i> ${t.services.maintenance.feat1}`;
            maintenanceFeats[1].innerHTML = `<i class='bx bx-check'></i> ${t.services.maintenance.feat2}`;
            maintenanceFeats[2].innerHTML = `<i class='bx bx-check'></i> ${t.services.maintenance.feat3}`;
        }
        serviceCards[5].querySelector('.service-btn').innerHTML = `${t.services.learnMore} <i class='bx bx-right-arrow-alt'></i>`;
    }
    
    // Update services CTA
    const ctaTitle = document.querySelector('.services-cta h3');
    const ctaDesc = document.querySelector('.services-cta p');
    const ctaBtn = document.querySelector('.services-cta .btn');
    
    if (ctaTitle) ctaTitle.textContent = t.services.ctaTitle;
    if (ctaDesc) ctaDesc.textContent = t.services.ctaDesc;
    if (ctaBtn) ctaBtn.textContent = t.services.ctaBtn;
    
    // Update footer
    const footerText = document.querySelector('.footer-text p');
    if (footerText) footerText.textContent = t.footer;
    
    // Update pricing page
    const pricingTitle = document.querySelector('.pricing-section .section-header h2');
    const pricingSubtitle = document.querySelector('.pricing-section .section-header p');
    if (pricingTitle) pricingTitle.textContent = t.pricing.title;
    if (pricingSubtitle) pricingSubtitle.textContent = t.pricing.subtitle;
    
    const pricingCards = document.querySelectorAll('.pricing-card');
    if (pricingCards.length >= 3) {
        // Free Plan
        const freeCard = pricingCards[0];
        const freeName = freeCard.querySelector('.plan-name');
        const freePeriod = freeCard.querySelector('.period');
        const freeFeats = freeCard.querySelectorAll('.plan-features li:not(.disabled)');
        const freeBtn = freeCard.querySelector('.plan-btn');
        if (freeName) freeName.textContent = t.pricing.free.name;
        if (freePeriod) freePeriod.textContent = t.pricing.free.period;
        if (freeFeats.length >= 5) {
            freeFeats[0].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.free.feat1}`;
            freeFeats[1].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.free.feat2}`;
            freeFeats[2].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.free.feat3}`;
            freeFeats[3].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.free.feat4}`;
            freeFeats[4].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.free.feat5}`;
        }
        if (freeBtn) freeBtn.textContent = t.pricing.free.btn;
        
        // Silver Plan
        const silverCard = pricingCards[1];
        const silverBadge = silverCard.querySelector('.popular-badge');
        const silverName = silverCard.querySelector('.plan-name');
        const silverPeriod = silverCard.querySelector('.period');
        const silverFeats = silverCard.querySelectorAll('.plan-features li');
        const silverBtn = silverCard.querySelector('.plan-btn');
        if (silverBadge) silverBadge.textContent = t.pricing.silver.badge;
        if (silverName) silverName.textContent = t.pricing.silver.name;
        if (silverPeriod) silverPeriod.textContent = t.pricing.silver.period;
        if (silverFeats.length >= 9) {
            silverFeats[0].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.silver.feat1}`;
            silverFeats[1].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.silver.feat2}`;
            silverFeats[2].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.silver.feat3}`;
            silverFeats[3].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.silver.feat4}`;
            silverFeats[4].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.silver.feat5}`;
            silverFeats[5].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.silver.feat6}`;
            silverFeats[6].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.silver.feat7}`;
            silverFeats[7].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.silver.feat8}`;
            silverFeats[8].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.silver.feat9}`;
        }
        if (silverBtn) silverBtn.textContent = t.pricing.silver.btn;
        
        // Gold Plan
        const goldCard = pricingCards[2];
        const goldName = goldCard.querySelector('.plan-name');
        const goldPeriod = goldCard.querySelector('.period');
        const goldFeats = goldCard.querySelectorAll('.plan-features li');
        const goldBtn = goldCard.querySelector('.plan-btn');
        if (goldName) goldName.textContent = t.pricing.gold.name;
        if (goldPeriod) goldPeriod.textContent = t.pricing.gold.period;
        if (goldFeats.length >= 12) {
            goldFeats[0].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat1}`;
            goldFeats[1].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat2}`;
            goldFeats[2].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat3}`;
            goldFeats[3].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat4}`;
            goldFeats[4].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat5}`;
            goldFeats[5].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat6}`;
            goldFeats[6].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat7}`;
            goldFeats[7].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat8}`;
            goldFeats[8].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat9}`;
            goldFeats[9].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat10}`;
            goldFeats[10].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat11}`;
            goldFeats[11].innerHTML = `<i class='bx bx-check'></i> ${t.pricing.gold.feat12}`;
        }
        if (goldBtn) goldBtn.textContent = t.pricing.gold.btn;
    }
    
    // Update FAQ
    const faqTitle = document.querySelector('.pricing-faq h3');
    if (faqTitle) faqTitle.textContent = t.pricing.faqTitle;
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length >= 4) {
        faqItems[0].querySelector('h4').innerHTML = `<i class='bx bx-help-circle'></i> ${t.pricing.faq1Q}`;
        faqItems[0].querySelector('p').textContent = t.pricing.faq1A;
        faqItems[1].querySelector('h4').innerHTML = `<i class='bx bx-help-circle'></i> ${t.pricing.faq2Q}`;
        faqItems[1].querySelector('p').textContent = t.pricing.faq2A;
        faqItems[2].querySelector('h4').innerHTML = `<i class='bx bx-help-circle'></i> ${t.pricing.faq3Q}`;
        faqItems[2].querySelector('p').textContent = t.pricing.faq3A;
        faqItems[3].querySelector('h4').innerHTML = `<i class='bx bx-help-circle'></i> ${t.pricing.faq4Q}`;
        faqItems[3].querySelector('p').textContent = t.pricing.faq4A;
    }
}
