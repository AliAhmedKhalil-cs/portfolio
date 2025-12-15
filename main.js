// Navbar scroll hide/show
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

    // Initialize EmailJS
    (function(){
        emailjs.init("weB-XBxkuDxyfDhQK"); // Replace with your actual public key
    })();

    // Contact Form Handler with EmailJS
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        emailjs.sendForm(
            'service_zmfug2q',    // Replace with your Service ID
            'template_s83eqok',   // Replace with your Template ID
            this
        )
        .then(function(_response) {
            submitBtn.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
            submitBtn.style.background = '#4CAF50';
            alert('Thank you! Your message has been sent successfully.');
            document.getElementById('contactForm').reset();
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

// Contact Form Handler with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.sendForm(
        'service_zmfug2q',    // Replace with your Service ID
        'template_s83eqok',   // Replace with your Template ID
        this
    )
    .then(function(_response) {
        // Success
        submitBtn.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
        submitBtn.style.background = '#4CAF50';
        
        alert('Thank you! Your message has been sent successfully.');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }, function(_error) {
        // Error
        submitBtn.innerHTML = '<i class="bx bx-x"></i> Failed to send';
        submitBtn.style.background = '#f44336';
        
        alert('Oops! Something went wrong. Please try again.');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    });
});