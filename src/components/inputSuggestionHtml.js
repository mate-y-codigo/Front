export function inputSuggestionHtml(id, placeholder){
    return `
        <div class="relative">
            <input id="${id}-search" class="input-suggestion" type="text" placeholder="${placeholder}" autocomplete="off" />
            <ul id="${id}-list" class="input-suggestion-list hidden"></ul>
        </div>
    `;
}

export function inputSuggestionIconHtml(id, icon, placeholder){
    return `
        <div class="relative">
            <span class="material-symbols-outlined input-icon">${icon}</span>
            <input id="${id}-search" class="input-suggestion-icon" type="text" placeholder="${placeholder}" autocomplete="off" />
            <ul id="${id}-list" class="input-suggestion-list hidden"></ul>
        </div>
    `;
}