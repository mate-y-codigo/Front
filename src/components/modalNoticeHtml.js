export function modalNoticeHtml(){
    return `
        <div id="app-modal-overlay" class="hidden fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[99999999]">
            <div id="app-modal" class="animate-modal-enter pointer-events-auto">                
                <div class="flex items-start space-x-3">
                    <div id="app-modal-icon" class="text-5xl"></div>
                    <div class="flex-1">
                        <h2 id="app-modal-title"></h2>
                        <p id="app-modal-message"></p>
                    </div>
                </div>

                <div class="text-right mt-6">
                    <button id="app-modal-close"
                            class="button">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
}
