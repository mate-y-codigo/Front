export function showToast(message, duration = 3500) {
    let container = document.getElementById("toast-container");

    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.classList.add("toast");

    toast.innerHTML = `
        <span>${message}</span>
        <span class="toast-close">&times;</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    toast.querySelector(".toast-close").addEventListener("click", () => hideToast(toast));

    setTimeout(() => hideToast(toast), duration);
}

export function hideToast(toast) {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
}