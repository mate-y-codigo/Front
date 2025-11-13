
function comboBoxList(text){
    return `
        <li data-value="${text}">${text}</li>
    `;
}

export function comboBoxHTML(list) {
    return `
        <div class="combobox">
            <button id="dropdown-button">
                <span id="selected-option">${list[0]}</span>
                <span class="material-symbols-outlined transition-transform duration-300" id="arrow-icon">keyboard_arrow_down</span>
            </button>

            <div id="dropdown-menu"
                class="transform scale-y-0 opacity-0 origin-top transition duration-300 ease-out pointer-events-none">
                <ul class="scroll-rounded">
                    ${list.map((list) => comboBoxList(list)).join('')}
                </ul>
            </div>
        </div>
    `;    
}