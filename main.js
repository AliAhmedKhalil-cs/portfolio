// ==================== MOBILE MENU TOGGLE ====================
const menuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.navbar ul');

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuIcon.contains(e.target) && !navMenu.contains(e.target)) {
            menuIcon.classList.remove('active');
            navMenu.classList.remove('active');
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

// ==================== CHATBOT ====================
var isOpen = false;

function toggleChat() {
    isOpen = !isOpen;
    
    var chatWindow = document.getElementById('chatWindow');
    var toggleIcon = document.getElementById('toggleIcon');
    var badge = document.getElementById('notificationBadge');
    
    if (isOpen) {
        chatWindow.classList.add('active');
        toggleIcon.className = 'bx bx-x';
        if (badge) badge.style.display = 'none';
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

    var qr = document.getElementById('quickReplies');
    if (qr) qr.style.display = 'none';

    var botReply = getBotResponse(message);
    showTypingThenRespond(botReply);
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
    }, 1000);
}

function getBotResponse(userMessage) {
    var msg = userMessage.toLowerCase();

    if (msg.indexOf('hi') > -1 || msg.indexOf('hello') > -1 || msg.indexOf('hey') > -1) {
        return "Hello! 👋 Welcome! How can I help you today?";
    }

    if (msg.indexOf('service') > -1) {
        return "I offer the following services: <br><br>💻 <b>Frontend Development</b><br>- Modern, responsive websites<br>- React, Vue, Angular applications<br>- Landing pages & portfolios<br><br>🎨 <b>UI/UX Design</b><br>- User interface design<br>- Prototyping & wireframing<br><br>📈 <b>SEO & Digital Marketing</b><br>- Search engine optimization<br>- Social media marketing<br><br>Would you like to know more?";
    }

    if (msg.indexOf('portfolio') > -1 || msg.indexOf('project') > -1) {
        return "You can check out my portfolio page! <br><br>🔗 Visit: portfolio.html<br><br>I've worked on: <br>• Business websites<br>• E-commerce platforms<br>• Landing pages<br>• Web applications<br>• UI/UX designs";
    }

    if (msg.indexOf('contact') > -1 || msg.indexOf('reach') > -1) {
        return "You can reach me through:<br><br>📧 Email: ibrahemkassap@gmail.com<br>📱 WhatsApp: +201017358087<br>💼 LinkedIn: linkedin.com/in/ibrahem-kassap<br>🙂 GitHub: github.com/ibrahemkassap";
    }

    if (msg.indexOf('price') > -1 || msg.indexOf('pricing') > -1 || msg.indexOf('cost') > -1) {
        return "My pricing depends on the project: <br><br>💼 Landing Page: from $150<br>🌐 Business Website: from $300<br>🛒 E-commerce Site: from $500<br>🎨 UI/UX Design: from $200<br><br>Contact me for a custom quote!";
    }

    if (msg.indexOf('about') > -1 || msg.indexOf('who') > -1) {
        return "I'm Ibrahem Kassap 👋<br><br>A Frontend Developer and UI/UX Designer based in Egypt.<br><br>🎓 Skills: HTML, CSS, JavaScript, React<br>💼 Experience: 3+ years<br>🎯 Focus: Beautiful, functional websites";
    }

    if (msg.indexOf('email') > -1) {
        return "📧 My email is: <br>ibrahemkassap@gmail.com<br><br>Feel free to send me your project details!";
    }

    if (msg.indexOf('whatsapp') > -1 || msg.indexOf('phone') > -1) {
        return "📱 WhatsApp: +201017358087<br><br>Click here: wa.me/+201017358087";
    }

    if (msg.indexOf('hire') > -1 || msg.indexOf('work') > -1 || msg.indexOf('available') > -1) {
        return "Yes! ✅ I'm available for: <br><br>✅ Freelance projects<br>✅ Full-time opportunities<br>✅ Collaboration<br><br>Contact me to discuss your project!";
    }

    if (msg.indexOf('thank') > -1) {
        return "You're welcome! 😊<br><br>Is there anything else I can help you with?";
    }

    if (msg.indexOf('bye') > -1) {
        return "Goodbye! 👋<br><br>Thanks for chatting! Have a great day! 🌟";
    }

    if (msg.indexOf('help') > -1) {
        return "I can help you with:<br><br>💼 Services - What I offer<br>📁 Portfolio - My work<br>💰 Pricing - Project costs<br>📧 Contact - How to reach me<br><br>Just ask!";
    }

    return "I'm not sure I understand. 🤔<br><br>Try asking about: <br>• Services<br>• Portfolio<br>• Pricing<br>• Contact<br><br>Or use the quick buttons!";
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
            if (!isOpen) {
                badge.style.display = 'flex';
            }
        }, 3000);
    }
};