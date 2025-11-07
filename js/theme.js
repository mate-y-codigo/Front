class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeToggle(theme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
    }

    updateThemeToggle(theme) {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        const icon = toggle.querySelector('.theme-icon');
        const text = toggle.querySelector('span:last-child');

        if (theme === 'dark') {
            icon.textContent = 'light_mode';
            text.textContent = 'Tema Claro';
        } else {
            icon.textContent = 'dark_mode';
            text.textContent = 'Tema Oscuro';
        }
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const toggle = document.getElementById('themeToggle');
            if (toggle) {
                toggle.addEventListener('click', () => this.toggleTheme());
            }
        });
    }
}

// Inicializar el gestor de temas
const themeManager = new ThemeManager();