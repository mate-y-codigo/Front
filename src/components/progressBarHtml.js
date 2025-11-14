export function progressBarHtml(progress){
    return `
        <div class="progress-container" data-progress="${progress}">
            <div class="progress-bar" id="progress-bar"></div>
            <span class="progress-label" id="progress-label">0%</span>
        </div>
    `;
}