// src/views/users.js
import { usersHtml } from "../components/usersHtml.js";
import { modalStudentNewHtml } from "../components/modalStudentNewHtml.js";
import { modalStudentEditHtml } from "../components/modalStudentEditHtml.js";
import { modalStudentDeleteHtml } from "../components/modalStudentDeleteHtml.js"

export function usersRender(usersList) {
  const container = document.getElementById("container-main");
  if (!container) return;

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
      {
        id: 2,
        nombre: "Ivan",
        apellido: "Sierra",
        email: "ivan@correo.com",
        telefono: "+54 9 11 1234 5678",
        activo: true,
      },
    ],
  };

  container.innerHTML = usersHtml(data);
  initUsersEvents();
}

function initUsersEvents() {
  const btnNewStudent = document.getElementById("btn-new-student");
  const modalHost = document.getElementById("modal-open-user-new");

  if (!modalHost) return;

  // ---------- NUEVO ALUMNO ----------
  if (btnNewStudent) {
    btnNewStudent.addEventListener("click", () => {
      openNewStudentModal(modalHost);
    });
  }

  // ---------- EDITAR ALUMNO ----------
  document.querySelectorAll(".btn-edit-student").forEach((btn) => {
    btn.addEventListener("click", () => {
      const raw = btn.getAttribute("data-user");
      if (!raw) return;

      let user;
      try {
        user = JSON.parse(raw);
      } catch (err) {
        console.error("No se pudo parsear data-user:", err);
        return;
      }

      openEditStudentModal(modalHost, user);
    });
  });

    // ---------- ELIMINAR ALUMNO ----------
  document.querySelectorAll(".btn-delete-student").forEach((btn) => {
    btn.addEventListener("click", () => {
      const userId = btn.getAttribute("data-user-id");
      const userName = btn.getAttribute("data-user-name") || "";
      const userEmail = btn.closest("tr")?.querySelector("td:nth-child(2)")?.textContent?.trim() || "";

      const user = {
        id: userId,
        nombre: userName.split(" ")[0] ?? "",
        apellido: userName.split(" ").slice(1).join(" ") ?? "",
        email: userEmail,
      };

      openDeleteStudentModal(modalHost, user);
    });
  });
}

// =================== HELPERS MODAL ===================

function openNewStudentModal(modalHost) {
  modalHost.innerHTML = modalStudentNewHtml();

  const overlay = document.getElementById("modal-overlay-student-new");
  const modal = document.getElementById("modal-student-new");
  const form = document.getElementById("student-new-form");
  const btnCancel = document.getElementById("student-new-cancel");

  if (!overlay || !modal || !form || !btnCancel) return;

  modal.classList.remove("modal-user-exit");
  modal.classList.add("modal-user-enter");

  function reallyClose() {
    modalHost.innerHTML = "";
  }

  function closeWithAnimation() {
    modal.classList.remove("modal-user-enter");
    modal.classList.add("modal-user-exit");
    setTimeout(reallyClose, 250);
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeWithAnimation();
  });

  btnCancel.addEventListener("click", closeWithAnimation);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    console.log("Nuevo alumno (a enviar al backend):", data);
    closeWithAnimation();
  });
}

function openEditStudentModal(modalHost, user) {
  modalHost.innerHTML = modalStudentEditHtml(user);

  const overlay = document.getElementById("modal-overlay-student-edit");
  const modal = document.getElementById("modal-student-edit");
  const form = document.getElementById("student-edit-form");
  const btnCancel = document.getElementById("student-edit-cancel");

  if (!overlay || !modal || !form || !btnCancel) return;

  modal.classList.remove("modal-user-exit");
  modal.classList.add("modal-user-enter");

  function reallyClose() {
    modalHost.innerHTML = "";
  }

  function closeWithAnimation() {
    modal.classList.remove("modal-user-enter");
    modal.classList.add("modal-user-exit");
    setTimeout(reallyClose, 250);
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeWithAnimation();
  });

  btnCancel.addEventListener("click", closeWithAnimation);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const updated = Object.fromEntries(new FormData(form).entries());

    const payload = {
      id: user.id,
      email: user.email,
      ...updated,
    };

    console.log("Alumno editado (a enviar al backend):", payload);
    closeWithAnimation();
  });
}

function openDeleteStudentModal(modalHost, user) {
  modalHost.innerHTML = modalStudentDeleteHtml(user);

  const overlay = document.getElementById("modal-overlay-student-delete");
  const modal = document.getElementById("modal-student-delete");
  const btnCancel = document.getElementById("student-delete-cancel");
  const btnConfirm = document.getElementById("student-delete-confirm");

  if (!overlay || !modal || !btnCancel || !btnConfirm) return;

  modal.classList.remove("modal-user-exit");
  modal.classList.add("modal-user-enter");

  function reallyClose() {
    modalHost.innerHTML = "";
  }

  function closeWithAnimation() {
    modal.classList.remove("modal-user-enter");
    modal.classList.add("modal-user-exit");
    setTimeout(reallyClose, 250);
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeWithAnimation();
  });

  btnCancel.addEventListener("click", closeWithAnimation);

  btnConfirm.addEventListener("click", () => {
    console.log("Soft delete (futuro) del alumno id:", user.id);
    // TODO: cuando esté el backend, llamar al endpoint de softDelete
    closeWithAnimation();
  });
}

