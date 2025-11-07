
// Funcionalidades generales de la aplicación
class App {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
    }

    setupEventListeners() {
        // Logout
        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('¿Estás seguro de que quieres salir?')) {
                // Aquí iría la lógica de logout
                window.location.href = 'login.html';
            }
        });

        // Cerrar modales al hacer clic fuera
        document.addEventListener('click', (e) => {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        });
    }

    setupNavigation() {
        // Marcar enlace activo basado en la URL actual
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.sidebar-menu a');
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }
}

// Inicializar la aplicación
new App();