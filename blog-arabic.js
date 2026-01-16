// Copy Code Functionality
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;
    
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        
        // Change button text and style
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="bx bx-check"></i> تم النسخ!';
        button.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('فشل نسخ الكود. يرجى المحاولة مرة أخرى.');
    }
    
    // Remove temporary textarea
    document.body.removeChild(textarea);
}

// Smooth scroll for table of contents
document.addEventListener('DOMContentLoaded', () => {
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in TOC
    const sections = document.querySelectorAll('.tutorial-step');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                tocLinks.forEach(link => {
                    link.style.fontWeight = 'normal';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.fontWeight = 'bold';
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Add animation to code blocks on scroll
const codeBlocks = document.querySelectorAll('.code-block');
const codeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

codeBlocks.forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(20px)';
    block.style.transition = 'all 0.6s ease';
    codeObserver.observe(block);
});
