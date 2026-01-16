// ==================== MOBILE MENU TOGGLE ====================
const menuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.navbar ul');

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
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
            subtitle: 'Growth-Oriented Web Strategist focused on client acquisition',
            description: 'Freelance Web Developer and SEO Specialist building fast, conversion-focused websites. Get a free audit and a clear roadmap to increase qualified leads.',
            btn1: 'Get a Free Website Audit',
            btn2: 'Request a Free Consultation',
            btn3: "Let's Build Your Project"
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
            ctaBtn: 'Get In Touch'
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
            faq1A: 'We accept PayPal, bank transfers, and cryptocurrency payments.',
            faq2Q: 'Can I upgrade my plan later?',
            faq2A: 'Yes! You can upgrade anytime and pay only the difference.',
            faq3Q: 'Do you offer refunds?',
            faq3A: 'We offer a 14-day money-back guarantee if you\'re not satisfied.',
            faq4Q: 'What if I need custom features?',
            faq4A: 'Contact us for a custom quote tailored to your specific needs.'
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
            subtitle: 'مطور ويب محترف متخصص في جذب العملاء',
            description: 'مطور ويب مستقل ومتخصص SEO أقوم ببناء مواقع سريعة تركز على التحويل. احصل على تدقيق مجاني وخارطة طريق واضحة لزيادة العملاء المحتملين.',
            btn1: 'احصل على تدقيق مجاني',
            btn2: 'اطلب استشارة مجانية',
            btn3: 'لنبني مشروعك'
        },
        services: {
            title: 'خدماتي',
            subtitle: 'ما أقدمه لمساعدة عملك على النمو',
            webDev: {
                title: 'تطوير المواقع',
                desc: 'إنشاء مواقع ويب متجاوبة وحديثة باستخدام أحدث التقنيات. من الصفحات المقصودة إلى تطبيقات الويب المعقدة، أقدم حلولاً عالية الجودة مصممة خصيصاً لاحتياجاتك.',
                feat1: 'تصميم متجاوب',
                feat2: 'تقنيات حديثة',
                feat3: 'أداء سريع'
            },
            uiux: {
                title: 'تصميم واجهات المستخدم',
                desc: 'تصميم واجهات مستخدم جميلة وبديهية توفر تجارب استخدام استثنائية. أركز على إنشاء تصاميم جمالية ووظيفية في آن واحد.',
                feat1: 'بحث المستخدم',
                feat2: 'النماذج الأولية',
                feat3: 'التصميم البصري'
            },
            seo: {
                title: 'تحسين محركات البحث',
                desc: 'تحسين ظهور موقعك في محركات البحث لزيادة الزيارات العضوية. أطبق استراتيجيات SEO مثبتة لمساعدة عملك على التصدر.',
                feat1: 'بحث الكلمات المفتاحية',
                feat2: 'تحسين داخلي',
                feat3: 'SEO تقني'
            },
            marketing: {
                title: 'التسويق الرقمي',
                desc: 'استراتيجيات تسويق رقمي شاملة لتنمية تواجدك على الإنترنت. من وسائل التواصل الاجتماعي إلى حملات البريد الإلكتروني، أساعدك في الوصول إلى جمهورك المستهدف بفعالية.',
                feat1: 'تسويق وسائل التواصل',
                feat2: 'استراتيجية المحتوى',
                feat3: 'التسويق بالبريد'
            },
            brand: {
                title: 'الهوية التجارية',
                desc: 'بناء هويات تجارية قوية تتناغم مع جمهورك. أنشئ هويات بصرية متماسكة تشمل الشعارات والألوان وإرشادات العلامة التجارية.',
                feat1: 'تصميم الشعار',
                feat2: 'إرشادات العلامة',
                feat3: 'الهوية البصرية'
            },
            maintenance: {
                title: 'صيانة المواقع',
                desc: 'الحفاظ على موقعك يعمل بسلاسة مع التحديثات والدعم المنتظم. أضمن أن يظل موقعك آمناً وسريعاً ومحدثاً بأحدث الميزات.',
                feat1: 'تحديثات منتظمة',
                feat2: 'مراقبة الأمان',
                feat3: 'تحسين الأداء'
            },
            learnMore: 'اعرف المزيد',
            ctaTitle: 'مستعد لبدء مشروعك؟',
            ctaDesc: 'لنعمل معاً لتحويل أفكارك إلى واقع',
            ctaBtn: 'تواصل معي'
        },
        pricing: {
            title: 'اختر باقتك',
            subtitle: 'اختر الباقة المثالية لاحتياجاتك',
            free: {
                name: 'الباقة المجانية',
                price: '0',
                period: '/مجاناً للأبد',
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
                feat8: 'كود المصدر متضمن',
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
                feat9: 'دعم ذو أولوية 24/7',
                feat10: 'إعداد استضافة مجاني',
                feat11: 'تكامل التحليلات',
                feat12: 'التسليم 14-21 يوم',
                btn: 'اختر الذهبية'
            },
            faqTitle: 'الأسئلة الشائعة',
            faq1Q: 'ما هي طرق الدفع المقبولة؟',
            faq1A: 'نقبل PayPal والتحويلات البنكية والعملات الرقمية.',
            faq2Q: 'هل يمكنني الترقية لاحقاً؟',
            faq2A: 'نعم! يمكنك الترقية في أي وقت ودفع الفرق فقط.',
            faq3Q: 'هل تقدمون استرداد الأموال؟',
            faq3A: 'نقدم ضمان استرداد الأموال لمدة 14 يوماً إذا لم تكن راضياً.',
            faq4Q: 'ماذا لو احتجت ميزات مخصصة؟',
            faq4A: 'تواصل معنا للحصول على عرض سعر مخصص لاحتياجاتك.'
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
}

function loadLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    const html = document.documentElement;
    
    html.setAttribute('lang', savedLang);
    html.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
    
    const langBtn = document.querySelector('.lang-text');
    if (langBtn) {
        langBtn.textContent = savedLang === 'en' ? 'AR' : 'EN';
    }
    
    updatePageContent(savedLang);
}

function updatePageContent(lang) {
    const t = translations[lang];
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-links li a');
    if (navLinks.length >= 7) {
        navLinks[0].textContent = t.nav.home;
        navLinks[1].textContent = t.nav.about;
        navLinks[2].textContent = t.nav.portfolio;
        navLinks[3].textContent = t.nav.services;
        navLinks[4].textContent = t.nav.pricing;
        navLinks[5].textContent = t.nav.blog;
        navLinks[6].textContent = t.nav.contact;
    }
    
    // Update home page content
    const homeTitle = document.querySelector('.home-info h1');
    const homeSubtitle = document.querySelector('.home-info h2');
    const homeDesc = document.querySelector('.home-info p');
    const btns = document.querySelectorAll('.btn-sci .btn');
    
    if (homeTitle) homeTitle.textContent = t.home.title;
    if (homeSubtitle) homeSubtitle.textContent = t.home.subtitle;
    if (homeDesc) homeDesc.textContent = t.home.description;
    
    if (btns.length >= 3) {
        btns[0].textContent = t.home.btn1;
        btns[1].textContent = t.home.btn2;
        btns[2].textContent = t.home.btn3;
    }
    
    // Update services page content
    const servicesTitle = document.querySelector('.section-header h2');
    const servicesSubtitle = document.querySelector('.section-header p');
    
    if (servicesTitle) servicesTitle.textContent = t.services.title;
    if (servicesSubtitle) servicesSubtitle.textContent = t.services.subtitle;
    
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length >= 6) {
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
