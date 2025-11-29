import { comboBoxHtml } from '../components/comboBoxHtml.js'

function comboBoxAddListener(container) {
    const dropdownButton = container.querySelector('#dropdown-button');
    const dropdownMenu = container.querySelector('#dropdown-menu');
    const selectedOption = container.querySelector('#selected-option');
    const arrowIcon = container.querySelector('#arrow-icon');

    const toggleDropdown = () => {
        const isOpen = dropdownMenu.classList.contains('scale-y-100');

        dropdownMenu.classList.toggle('scale-y-100', !isOpen);
        dropdownMenu.classList.toggle('opacity-100', !isOpen);
        dropdownMenu.classList.toggle('pointer-events-auto', !isOpen);

        dropdownMenu.classList.toggle('scale-y-0', isOpen);
        dropdownMenu.classList.toggle('opacity-0', isOpen);
        dropdownMenu.classList.toggle('pointer-events-none', isOpen);

        arrowIcon.classList.toggle('rotate-180', !isOpen);
    };

    dropdownButton.addEventListener('click', toggleDropdown);

    dropdownMenu.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            const name = item.dataset.name;

            selectedOption.textContent = name;
            toggleDropdown();

            container.dispatchEvent(new CustomEvent('combo:change', {
                detail: { id, name }
            }));
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('scale-y-100', 'opacity-100', 'pointer-events-auto');
            dropdownMenu.classList.add('scale-y-0', 'opacity-0', 'pointer-events-none');
            arrowIcon.classList.remove('rotate-180');
        }
    });

    container.addEventListener("combo:change", (e) => {
        container.dataset.selectedId = e.detail.id;
        container.dataset.selectedName = e.detail.name;
    });
}

/*
    Example 1:
    const combo = document.querySelector("#session-excercise-name-1 .combobox");
    const nuevosEjercicios = [
        { id: "abc", name: "Press banca" },
        { id: "xyz", name: "Sentadillas" },
        { id: "kkk", name: "Remo con barra" }
    ];
    comboBoxUpdateOptions(combo, nuevosEjercicios);


    Example 2: Set new
    combo.dataset.selectedId = "xyz";
    combo.dataset.selectedName = "Sentadillas";
    comboBoxUpdateOptions(combo, nuevosEjercicios);

*/
export function comboBoxUpdateOptions(comboEl, newList) {
    if (!comboEl) return;

    const menu = comboEl.querySelector("#dropdown-menu");
    const ul = menu?.querySelector("ul");
    const dropdownButton = comboEl.querySelector("#dropdown-button");
    const selectedLabel = comboEl.querySelector("#selected-option");
    const arrow = comboEl.querySelector("#arrow-icon");

    if (!ul || !dropdownButton) return;

    // rebuild options
    ul.innerHTML = newList
        .map(item => `<li data-id="${item.id}" data-name="${item.name}">${item.name}</li>`)
        .join("");

    // re-attach listeners: each li on click updates and closes by invoking the button
    ul.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", (ev) => {
            // set visual + dataset
            const id = li.dataset.id;
            const name = li.dataset.name;
            if (selectedLabel) selectedLabel.textContent = name;
            comboEl.dataset.selectedId = id ?? "";
            comboEl.dataset.selectedName = name ?? "";

            // dispatch event with id+name
            comboEl.dispatchEvent(new CustomEvent("combo:change", {
                detail: { id, name }
            }));

            setTimeout(() => {
                // If the menu is open (classes) -> press the button to close it
                const isOpen = menu.classList.contains("scale-y-100") || menu.classList.contains("opacity-100");
                if (isOpen) {
                    dropdownButton.click();
                } else {
                    // fallback: if for some reason it is not detected as open, we force the classes to close.
                    menu.classList.remove("scale-y-100", "opacity-100", "pointer-events-auto");
                    menu.classList.add("scale-y-0", "opacity-0", "pointer-events-none");
                    arrow?.classList.remove("rotate-180");
                }
            }, 0);
        });
    });
}

export function comboBoxReset(comboEl) {
    if (!comboEl) return;

    // Delete selectedId and selectedName
    comboEl.dataset.selectedId = "";
    comboEl.dataset.selectedName = "";

    // Delete the displayed text
    const selectedLabel = comboEl.querySelector("#selected-option");
    if (selectedLabel) selectedLabel.textContent = "Seleccione una opción...";

    // Remove visual selection in the options (if they exist)
    comboEl.querySelectorAll(".combobox-option").forEach(opt => {
        opt.classList.remove("selected");
    });
}


/** render combobox */
export function comboBoxRender(id, list) {
    const comboBox = document.getElementById(id);
    comboBox.innerHTML = comboBoxHtml(list);

    const container = comboBox.querySelector('.combobox');
    comboBoxAddListener(container);
}