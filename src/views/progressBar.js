import { } from '../components/progressBarHtml.js'

export function progressBarSetAll() {
    document.querySelectorAll('.progress-container').forEach((container) => {
        const progress = parseInt(container.dataset.progress, 10);
        /** check data progress */
        if (isNaN(progress) || progress < 0 || progress > 100) return;

        const bar = container.querySelector('.progress-bar');
        const label = container.querySelector('.progress-label');

        // Aplicar estilos y texto
        bar.style.width = `${progress}%`;
        label.textContent = `${progress}%`;
    });
}

/** progressBar render */
export function progressBarRender(progress) {
    const progressBar = document.getElementById('card-assignment-progress-bar');
    progressBar.innerHTML = progressBarHtml(progress);
}


