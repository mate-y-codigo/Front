export function modalQueryHtml() {
    return `
        <div id="app-modal-query-overlay" class="hidden fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[99999999]">
            <div id="app-modal-query" class="animate-modal-enter pointer-events-auto">                
                <div class="flex items-start space-x-3">
                    <div id="app-modal-query-icon" class="text-5xl"></div>
                    <div class="flex-1">
                        <h2 id="app-modal-query-title"></h2>
                        <p id="app-modal-query-message"></p>
                    </div>
                </div>

                <div class="flex flex-row justify-between gap-6 mt-6">
                    <div class="w-full"><button id="app-modal-query-cancel" class="button w-full">Cancelar</button></div>
                    <div class="w-full"><button id="app-modal-query-confirm" class="button-cancel w-full">Confirmar</button></div>                                        
                </div>
            </div>
        </div>
    `;
}