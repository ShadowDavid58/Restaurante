// Archivo principal - Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicación iniciada');

    // Inicializar módulos
    Auth.init();
    Reservations.init();
    Menu.init();

    // Navegación suave
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                Utils.scrollTo(href.substring(1));
                
                // Actualizar link activo
                navLinks.forEach(l => l.classList.remove('nav__link--active'));
                link.classList.add('nav__link--active');
            }
        });
    });

    // Toggle menú móvil
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Actualizar link activo al hacer scroll
    const sections = document.querySelectorAll('.section');
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', Utils.debounce(() => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    }, 100));

    // Manejar errores globales
    window.addEventListener('error', (e) => {
        console.error('Error global:', e.error);
        Utils.showLoader(false);
    });

    // Manejar errores de fetch
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Error no manejado:', e.reason);
        Utils.showLoader(false);
    });
});

