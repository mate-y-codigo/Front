export function switchHtml(txt){
    return `
        <div class="switch">
            <button id="switch-button">
                <span id="switch-circle"></span>
            </button>
            <label class="text-gray-800 font-medium cursor-pointer">${txt}</label>
        </div>
    `;
}