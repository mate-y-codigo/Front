import { comboBoxHTML } from '../components/comboBoxHtml.js'

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
            selectedOption.textContent = item.dataset.value;
            toggleDropdown();
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('scale-y-100', 'opacity-100', 'pointer-events-auto');
            dropdownMenu.classList.add('scale-y-0', 'opacity-0', 'pointer-events-none');
            arrowIcon.classList.remove('rotate-180');
        }
    });
}

/** render combobox */
export function comboBoxRender(id, list) {
    const comboBox = document.getElementById(id);
    comboBox.innerHTML = comboBoxHTML(list);

    const container = comboBox.querySelector('.combobox');
    comboBoxAddListener(container);
}