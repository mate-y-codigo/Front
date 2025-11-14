import { inputSuggestionIconHtml, inputSuggestionHtml } from '../components/inputSuggestionHtml.js'

function inputSuggestionLoadList(id, options) {
    const searchInput = document.getElementById(id + '-search');
    const suggestionList = document.getElementById(id + '-list');

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        suggestionList.innerHTML = "";

        if (query === "") {
            suggestionList.classList.add("hidden");
            return;
        }

        /*const filtradas = options.filter(op =>
            op.toLowerCase().includes(query)
        );*/
        const filtradas = options.filter(op =>
            op.name.toLowerCase().includes(query.toLowerCase())
        );

        if (filtradas.length === 0) {
            suggestionList.classList.add("hidden");
            return;
        }

        filtradas.forEach(option => {
            const li = document.createElement("li");
            li.textContent = option.name;
            li.className = "px-4 py-2 cursor-pointer list-fade-in";
            li.setAttribute('data-id', `${option.uuid}`);
            li.addEventListener("click", () => {
                searchInput.value = option.name;
                suggestionList.classList.add("hidden");
                console.log(li.dataset.id);
            });
            suggestionList.appendChild(li);
        });

        suggestionList.classList.remove("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".relative")) {
            suggestionList.classList.add("hidden");
        }
    });
}

/** input suggestion with icon render */
export function inputSuggestionIcon(id, icon, placeholder, options) {
    const inputSuggestion = document.getElementById(id);
    inputSuggestion.innerHTML = inputSuggestionIconHtml(id, icon, placeholder);
    inputSuggestionLoadList(id, options);
}

/** input suggestion without icon render */
export function inputSuggestion(id, placeholder, options) {
    const inputSuggestion = document.getElementById(id);
    inputSuggestion.innerHTML = inputSuggestionHtml(id, placeholder);
    inputSuggestionLoadList(id, options);
}