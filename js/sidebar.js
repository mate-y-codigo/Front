class SidebarManager {
    constructor() {
        this.isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        this.init();
    }

    init() {
        this.applySidebarState();
        this.setupEventListeners();
    }

    applySidebarState() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        if (this.isCollapsed) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
        localStorage.setItem('sidebarCollapsed', this.isCollapsed);
        this.applySidebarState();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const toggle = document.getElementById('sidebarToggle');
            if (toggle) {
                toggle.addEventListener('click', () => this.toggleSidebar());
            }

            // Cerrar sidebar en móvil al hacer clic en un enlace
            if (window.innerWidth <= 768) {
                const links = document.querySelectorAll('.sidebar-menu a');
                links.forEach(link => {
                    link.addEventListener('click', () => {
                        document.getElementById('sidebar')?.classList.remove('show');
                    });
                });
            }
        });

        // Manejar redimensionamiento de ventana
        window.addEventListener('resize', () => {
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth > 768) {
                sidebar?.classList.remove('show');
            }
        });
    }
}

// Inicializar el gestor del sidebar
const sidebarManager = new SidebarManager();