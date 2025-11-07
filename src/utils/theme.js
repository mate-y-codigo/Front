// set theme
export function themeToggle() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        themeIcon.textContent = 'dark_mode';
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        themeIcon.textContent = 'light_mode';
        localStorage.setItem('theme', 'dark');
    }
}

// load saved theme
export function themeLoad() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');

    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.textContent = 'light_mode';
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.textContent = 'dark_mode';
    }
}

export function themeAddListener(){
    document.getElementById('theme-toggle').addEventListener('click', themeToggle);
}
