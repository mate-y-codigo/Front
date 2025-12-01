import { usersHtml } from "../components/usersHtml.js";
import { userNewRender } from "./userNew.js";
import { userEditRender } from "./userEdit.js";
import { modalStudentDeleteHtml } from "../components/modalStudentDeleteHtml.js";
import { getUserAll } from "../services/userApi.js";
import { headerTxt } from "../config/headerTxt.js";
import { updateUser } from "../services/userApi.js";
import { showToast } from "./toast.js";
import { AppModal } from "./modalNotice.js";

const usersState = {
  users: [],
};

function mapFromApiUsers(apiUsers) {
  return (apiUsers || []).map((u) => ({
    id: u.id,
    nombre: u.nombre ?? u.firstName ?? "",
    apellido: u.apellido ?? u.lastName ?? "",
    email: u.email ?? "-",
    celular: u.celular ?? "-",
    peso: u.peso ?? null,
    altura: u.altura ?? null,
    activo: u.activo === false ? false : true,
  }));
}

export async function usersRender() {
  const container = document.getElementById("container-main");
  if (!container) return;

  // Animación de entrada
  container.classList.add("opacity-0", "scale-95", "transition-all", "duration-300");
  container.classList.remove("opacity-100", "scale-100");

  // Header
  const headerH1 = document.getElementById("header-h1");
  const headerP = document.getElementById("header-p");
  if (headerH1 && headerP && headerTxt.users) {
    headerH1.textContent = headerTxt.users.h1;
    headerP.textContent = headerTxt.users.p;
  }

  setTimeout(async () => {
    try {
      const apiUsers = await getUserAll();
      const onlyStudents = apiUsers.filter((u) => u.rolId === 3);
      usersState.users = mapFromApiUsers(onlyStudents);

      container.innerHTML = usersHtml({ users: usersState.users });
      initUsersEvents();

      // Fin de animación
      container.classList.remove("opacity-0", "scale-95");
      container.classList.add("opacity-100", "scale-100");
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      container.innerHTML =
        "<p style='color:#fff; padding:1rem;'>Error cargando alumnos. Revisá la consola.</p>";

      container.classList.remove("opacity-0", "scale-95");
      container.classList.add("opacity-100", "scale-100");
    }
  }, 100);
}


function initUsersEvents() {
  const btnNewStudent = document.getElementById("btn-new-student");
  const modalHost = document.getElementById("modal-open-user-new");
  const searchInput = document.getElementById("students-search");
  const statusSelect = document.getElementById("students-status-filter");

  const rows = Array.from(document.querySelectorAll(".student-row"));

  /* FILTROS */

  function applyFilters() {
    const term = (searchInput?.value || "").trim().toLowerCase();
    const statusFilter = statusSelect?.value || "all";

    rows.forEach((row) => {
      const name = (row.dataset.name || "").toLowerCase();
      const email = (row.dataset.email || "").toLowerCase();
      const status = row.dataset.status || "active";

      const matchesTerm =
        !term || name.includes(term) || email.includes(term);

      let matchesStatus = true;
      if (statusFilter === "active") {
        matchesStatus = status === "active";
      } else if (statusFilter === "inactive") {
        matchesStatus = status === "inactive";
      }

      const visible = matchesTerm && matchesStatus;
      row.classList.toggle("hidden", !visible);
    });
  }

  searchInput?.addEventListener("input", applyFilters);
  statusSelect?.addEventListener("change", applyFilters);

  if (statusSelect && !statusSelect.value) {
    statusSelect.value = "active";
  }
  applyFilters();

  /* NUEVO ALUMNO */
  if (btnNewStudent) {
    btnNewStudent.addEventListener("click", async () => {
      await userNewRender();
    });
  }

  /* EDITAR ALUMNO */
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

      userEditRender(user);
    });
  });


  /* ELIMINAR ALUMNO */

  // DESACTIVAR (activos)
  document.querySelectorAll(".btn-disable-student").forEach((btn) => {
    btn.addEventListener("click", () => {
      const raw = btn.getAttribute("data-user");
      if (!raw || !modalHost) return;

      let user;
      try {
        user = JSON.parse(raw);
      } catch (err) {
        console.error("No se pudo parsear data-user:", err);
        return;
      }

      openStudentStatusModal(modalHost, user, false); // false => desactivar
    });
  });

  // REACTIVAR (inactivos)
  document.querySelectorAll(".btn-reactivate-student").forEach((btn) => {
    btn.addEventListener("click", () => {
      const raw = btn.getAttribute("data-user");
      if (!raw || !modalHost) return;

      let user;
      try {
        user = JSON.parse(raw);
      } catch (err) {
        console.error("No se pudo parsear data-user:", err);
        return;
      }

      openStudentStatusModal(modalHost, user, true); // true => activar
    });
  });
}

// HELPERS MODAL

function openStudentStatusModal(modalHost, user, newActive) {
  modalHost.innerHTML = modalStudentDeleteHtml(user, newActive);

  const overlay = document.getElementById("modal-overlay-student-delete");
  const modal = document.getElementById("modal-student-delete");
  const btnCancel = document.getElementById("student-delete-cancel");
  const btnConfirm = document.getElementById("student-delete-confirm");

  if (!overlay || !modal || !btnCancel || !btnConfirm) return;

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

  btnConfirm.addEventListener("click", async () => {
    try {
      btnConfirm.disabled = true;
      const originalText = btnConfirm.textContent;
      btnConfirm.textContent = newActive ? "Reactivando..." : "Desactivando...";

      const dto = {
        nombre: user.nombre ?? null,
        apellido: user.apellido ?? null,
        celular: (user.celular ?? user.telefono ?? "").trim() || null,
        peso: user.peso ?? null,
        altura: user.altura ?? null,
        activo: newActive,
      };

      await updateUser(user.id, dto);
      showToast(newActive ? "Alumno activado correctamente" : "Alumno desactivado correctamente");

      await usersRender(); // recargar lista con estado actualizado
      closeWithAnimation();
    } catch (err) {
      console.error("Error actualizando estado del alumno:", err);
      AppModal.open({
        iconHTML: '<span class="material-symbols-outlined text-red-600 text-5xl">error</span>',
        titleText: "Error al actualizar estado del alumno",
        messageText: err?.message || "No se pudo cambiar el estado del alumno. Intentalo de nuevo"
      });
      btnConfirm.disabled = false;
      btnConfirm.textContent = newActive ? "Reactivar" : "Eliminar";
    }
  });
}
