import { modalNoticeHtml } from '../components/modalNoticeHtml.js'

export const AppModal = (() => {

    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = modalNoticeHtml();
    document.body.appendChild(modalDiv);

    const overlay = document.getElementById("app-modal-overlay");
    const modal = document.getElementById("app-modal");

    const icon = document.getElementById("app-modal-icon");
    const title = document.getElementById("app-modal-title");
    const message = document.getElementById("app-modal-message");
    const btnClose = document.getElementById("app-modal-close");

    let onCloseCallback = null;

    function open({ iconHTML = "ℹ️", titleText = "Título", messageText = "", onClose = null }) {

        icon.innerHTML = iconHTML;
        title.textContent = titleText;
        message.textContent = messageText;

        // Guardar callback
        onCloseCallback = onClose;

        overlay.classList.remove("hidden");
    }

    function close() {
        overlay.classList.add("hidden");
        if (typeof onCloseCallback === "function") onCloseCallback();
    }

    // Botón de cerrar
    btnClose.addEventListener("click", close);

    // Cerrar con clic afuera
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    return { open, close };

})();