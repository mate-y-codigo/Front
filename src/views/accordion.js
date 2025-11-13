
function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector("span");

    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0px";
        icon.style.transform = "rotate(0deg)";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
    }
}

/** render accordion */
export function accordionRender(id, content) {
    const comboBox = document.getElementById(id);
    comboBox.innerHTML = comboBoxHTML(list);

    const container = comboBox.querySelector('.combobox');
    comboBoxAddListener(container);
}