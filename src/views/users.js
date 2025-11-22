import { usersHtml } from "../components/usersHtml.js";

export function usersRender(usersList) {
    const container = document.getElementById("container-main");
    if (!container) return;

    // Por ahora, datos fake si todavía no viene nada de la API
    const data = usersList ?? {
        users: [
            {
                id: 1,
                nombre: "Santiago",
                apellido: "Peter",
                email: "santiago@example.com",
                telefono: "+54 11 5555-5555",
                activo: true,
            },
        ],
    };

    container.innerHTML = usersHtml(data);
    initUsersEvents();
}

function initUsersEvents() {
    const btnNewStudent = document.getElementById("btn-new-student");
    const modalBackdrop = document.getElementById("user-modal-backdrop");
    const modalWrapper = document.getElementById("user-modal-wrapper");
    const modalClose = document.getElementById("user-modal-close");
    const modalCancel = document.getElementById("user-modal-cancel");
    const modalForm = document.getElementById("user-modal-form");

    // Si no existe el modal todavía, no seguimos
    if (!btnNewStudent || !modalBackdrop || !modalWrapper) {
        return;
    }

    function openUserModal() {
        modalBackdrop.classList.remove("hidden");
        modalWrapper.classList.remove("hidden");
    }

    function closeUserModal() {
        modalBackdrop.classList.add("hidden");
        modalWrapper.classList.add("hidden");
    }
        // --- Combobox de estado (Todos / Activo / Inactivo) ---
    const statusCombo = document.getElementById("students-status-combobox");

    if (statusCombo) {
        const statusButton = statusCombo.querySelector("#dropdown-button");
        const statusMenu = statusCombo.querySelector("#dropdown-menu");
        const statusLabel = statusCombo.querySelector("#students-filter-label");

        if (statusButton && statusMenu) {

            function openMenu() {
                statusMenu.style.display = "block";
            }

            function closeMenu() {
                statusMenu.style.display = "none";
            }

            function toggleMenu() {
                const isHidden =
                    statusMenu.style.display === "none" ||
                    statusMenu.style.display === "";
                if (isHidden) {
                    openMenu();
                } else {
                    closeMenu();
                }
            }

            // Abrir/cerrar al hacer click en el botón
            statusButton.addEventListener("click", (e) => {
                e.stopPropagation(); // para que no lo cierre el click global
                toggleMenu();
            });

            // Click en una opción del menú
            statusMenu.querySelectorAll("li").forEach((item) => {
                item.addEventListener("click", () => {
                    const value = item.getAttribute("data-value"); // all / active / inactive
                    const text = item.textContent.trim();

                    if (statusLabel) {
                        statusLabel.textContent = text;
                    }

                    // TODO: acá filtrás realmente la tabla según 'value'
                    console.log("Filtro alumnos:", value);

                    closeMenu();
                });
            });

            // Cerrar al clickear fuera del combobox
            document.addEventListener("click", (e) => {
                if (!statusCombo.contains(e.target)) {
                    closeMenu();
                }
            });
        }
    }


    btnNewStudent.addEventListener("click", openUserModal);
    modalClose?.addEventListener("click", closeUserModal);
    modalCancel?.addEventListener("click", closeUserModal);
    modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) closeUserModal();
    });

    modalForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(modalForm));
        console.log("Nuevo usuario:", data);
        // TODO: llamar a la API
        closeUserModal();
        modalForm.reset();
    });

    // Botones de eliminar alumno
    document.querySelectorAll(".button-small-icon-red").forEach((btn) => {
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("data-user-id");
            console.log("Eliminar alumno:", userId);
            // TODO: eliminar alumno (confirm + API)
        });
    });
}
