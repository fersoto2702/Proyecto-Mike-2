const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
    
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        const submenuItems = document.querySelectorAll('.nav-menu > li');
    
        submenuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    item.classList.toggle('submenu-open');
                }
            });
        });