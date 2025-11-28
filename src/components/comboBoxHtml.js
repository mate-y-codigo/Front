export function comboBoxHtml(list) {
    return `
        <div class="combobox">
            <button id="dropdown-button">
                <span id="selected-option">Seleccione una opción...</span>
                <span class="material-symbols-outlined transition-transform duration-300" id="arrow-icon">keyboard_arrow_down</span>
            </button>

            <div id="dropdown-menu"
                class="transform scale-y-0 opacity-0 origin-top transition duration-300 ease-out pointer-events-none">
                <ul class="scroll-rounded">
                    ${list.map(item => `<li data-id="${item.id}" data-name="${item.name}">${item.name}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;
}