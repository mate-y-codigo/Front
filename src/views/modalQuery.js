import { modalQueryHtml } from '../components/modalQueryHtml.js';

export const AppModalQuery = (() => {

    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = modalQueryHtml();
    document.body.appendChild(modalDiv);

    const overlay = document.getElementById("app-modal-query-overlay");

    const icon = document.getElementById("app-modal-query-icon");
    const title = document.getElementById("app-modal-query-title");
    const message = document.getElementById("app-modal-query-message");
    
    const btnCancel = document.getElementById("app-modal-query-cancel");
    const btnConfirm = document.getElementById("app-modal-query-confirm");

    let confirmCallback = null;
    let cancelCallback = null;
    let internalId = null;

    function open({
        id = null,
        iconHTML = "⚠️",
        titleText = "¿Estás seguro?",
        messageText = "",
        onConfirm = null,
        onCancel = null
    }) {

        internalId = id;
        confirmCallback = onConfirm;
        cancelCallback = onCancel;

        icon.innerHTML = iconHTML;
        title.textContent = titleText;
        message.textContent = messageText;

        overlay.classList.remove("hidden");
    }

    function close() {
        overlay.classList.add("hidden");
    }

    btnConfirm.addEventListener("click", () => {
        if (typeof confirmCallback === "function") {
            confirmCallback(internalId);
        }
        close();
    });

    btnCancel.addEventListener("click", () => {
        if (typeof cancelCallback === "function") {
            cancelCallback(internalId);
        }
        close();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    return { open, close };

})();