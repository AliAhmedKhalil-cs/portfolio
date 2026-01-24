(function() {
    'use strict';
    
    function initMenu() {
        var menuToggle = document.querySelector('.menu-toggle');
        var floatingMenuToggle = document.querySelector('.floating-menu-toggle');
        var sideMenu = document.querySelector('.side-menu');
        var menuOverlay = document.querySelector('.menu-overlay');
        var sideMenuClose = document.querySelector('.side-menu-close');

        function openMenu() {
            if (sideMenu && menuOverlay) {
                sideMenu.classList.add('active');
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }
        }

        function closeMenu() {
            if (sideMenu && menuOverlay) {
                sideMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        }

        if (menuToggle) {
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openMenu();
            });
            menuToggle.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openMenu();
            });
        }

        if (floatingMenuToggle) {
            floatingMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openMenu();
            });
            floatingMenuToggle.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openMenu();
            });
        }

        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
            menuOverlay.addEventListener('touchstart', closeMenu);
        }

        if (sideMenuClose) {
            sideMenuClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });
            sideMenuClose.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                closeMenu();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
})();