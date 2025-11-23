import { usersHtml } from "../components/usersHtml.js";
import { modalStudentNewHtml } from "../components/modalStudentNewHtml.js";

export function usersRender(usersList) {
    const container = document.getElementById("container-main");
    if (!container) return;

    // datos hardcodeados
    const data = usersList ?? {
        users: [
            {
                id: 1,
                nombre: "Santiago",
                apellido: "Peter",
                email: "santiago@example.com",
                telefono: "+54 9 11-55555555",
                activo: true
            },
            {
                id: 2,
                nombre: "Ivan",
                apellido: "Sierra",
                email: "ivan@correo.com",
                telefono: "+54 9 11-1234-5678",
                activo: true
            }
        ],
    };

    container.innerHTML = usersHtml(data);
    initUsersEvents();
}


function initUsersEvents() {
  const btnNewStudent = document.getElementById("btn-new-student");
  const modalHost = document.getElementById("modal-open-user-new");

  if (!btnNewStudent || !modalHost) return;

  btnNewStudent.addEventListener("click", () => {
    // Inyectar HTML
    modalHost.innerHTML = modalStudentNewHtml();

    const overlay = document.getElementById("modal-overlay-student-new");
    const modal = document.getElementById("modal-student-new");
    const form = document.getElementById("student-new-form");
    const btnCancel = document.getElementById("student-new-cancel");

    if (!overlay || !modal || !form || !btnCancel) return;

    // Aseguramos clase de entrada
    modal.classList.remove("modal-user-exit");
    modal.classList.add("modal-user-enter");

    function reallyClose() {
      modalHost.innerHTML = "";
    }

    function closeWithAnimation() {
      modal.classList.remove("modal-user-enter");
      modal.classList.add("modal-user-exit");
      setTimeout(reallyClose, 250); // mismo tiempo que la animación
    }

    // Click en overlay cierra
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeWithAnimation();
    });

    // Botón cancelar
    btnCancel.addEventListener("click", closeWithAnimation);

    // Guardar
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      console.log("Nuevo alumno:", data);
      // TODO: API
      closeWithAnimation();
    });
  });
}