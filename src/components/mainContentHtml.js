export function mainContentHtml(headerH1, headerP, conteiner) {
    return `        
        <div class="flex-1 overflow-auto flex flex-col">
            <!-- Header -->
            <div class="header flex items-center justify-center">
                <div class="header-text grow">
                    <h1 id="header-h1">${headerH1}</h1>
                    <p id="header-p">${headerP}</p>
                </div>
                <div class="header-theme flex-none">
                    <button id="theme-toggle" type="button" class="button-round rounded-full inline-flex items-center">
                        <span id="theme-icon" class="material-symbols-outlined">light_mode</span>
                    </button>
                </div>
            </div>

            <!-- Content -->
            <div class="content">
                <div id="container">${conteiner}</div>
            </div>
        </div>`;
}