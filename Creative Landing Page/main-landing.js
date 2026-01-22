let img = document.querySelector('.img');
let container = document.querySelector('.container');
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

function phones(phone){
    img.src = phone;
}

function colors(color){
    container.style.background = color;
}

// Menu Toggle
if(menuIcon){
    menuIcon.onclick = () => {
        navbar.classList.toggle('active');
    }
}

// Close menu when clicking on a link
if(navbar){
    document.querySelectorAll('.navbar a').forEach(link => {
        link.onclick = () => {
            navbar.classList.remove('active');
        }
    })
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});