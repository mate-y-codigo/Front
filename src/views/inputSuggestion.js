import { inputSuggestionIconHtml, inputSuggestionHtml } from '../components/inputSuggestionHtml.js'


/*
Example

options = 
[
    {
        "id": "bd6011c6-bd73-477b-87b4-6d738f7c663c",
        "name": "Admin FitCode"
    },
    {
        "id": "9a3ffd2c-1384-4574-b0ec-0b18e4c1d0be",
        "name": "Carlos Maestro"
    },
    {
        "id": "a8f3e9c2-1d2b-4f3a-8e2f-1a9c3d7e1a08",
        "name": "Nicolás Molina"
    },
    {
        "id": "a7f3e9c2-1d2b-4f3a-8e2f-1a9c3d7e1a07",
        "name": "Valentina López"
    },
    {
        "id": "a6f3e9c2-1d2b-4f3a-8e2f-1a9c3d7e1a06",
        "name": "Diego Sánchez"
    },
    {
        "id": "a5f3e9c2-1d2b-4f3a-8e2f-1a9c3d7e1a05",
        "name": "Carla Rodríguez"
    },
    {
        "id": "a4f3e9c2-1d2b-4f3a-8e2f-1a9c3d7e1a04",
        "name": "Marcos Fernández"
    },
    {
        "id": "c30c8c4a-204b-40c8-bd98-0a2ec4a640d4",
        "name": "Juan Perez"
    }
]
*/

/*function inputSuggestionLoadList(id, options) {
    const searchInput = document.getElementById(id + '-search');
    const suggestionList = document.getElementById(id + '-list');

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        suggestionList.innerHTML = "";

        if (query === "") {
            suggestionList.classList.add("hidden");
            return;
        }

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
            li.setAttribute('data-id', `${option.id}`);
            li.addEventListener("click", () => {
                searchInput.value = option.name;
                suggestionList.classList.add("hidden");
                const input = document.querySelector(`#${id}`);
                input.setAttribute('data-id', `${option.id}`);
                input.setAttribute('data-name', `${option.name}`);                
                //console.log(li.dataset.id);
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
}*/

function inputSuggestionLoadList(id, options) {
    const searchInput = document.getElementById(id + '-search');
    const suggestionList = document.getElementById(id + '-list');
    const containerInput = document.querySelector(`#${id}`);

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        suggestionList.innerHTML = "";

        // Siempre limpiar si se edita
        containerInput.removeAttribute("data-id");
        containerInput.removeAttribute("data-name");

        if (query === "") {
            suggestionList.classList.add("hidden");
            return;
        }

        const filtradas = options.filter(op =>
            op.name.toLowerCase().includes(query)
        );

        // Si no hay coincidencias → limpiar y ocultar
        if (filtradas.length === 0) {
            suggestionList.classList.add("hidden");
            return;
        }

        filtradas.forEach(option => {
            const li = document.createElement("li");
            li.textContent = option.name;
            li.className = "px-4 py-2 cursor-pointer list-fade-in";
            li.dataset.id = option.id;

            li.addEventListener("click", () => {
                // Asignar valores al seleccionar
                searchInput.value = option.name;
                suggestionList.classList.add("hidden");

                containerInput.setAttribute("data-id", option.id);
                containerInput.setAttribute("data-name", option.name);
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