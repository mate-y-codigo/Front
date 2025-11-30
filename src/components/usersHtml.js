// src/components/usersHtml.js

/* ===================== HELPERS ===================== */

function escapeHtml(val) {
  if (val == null) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getUserInitials(user) {
  const fullName = `${user.nombre ?? ""} ${user.apellido ?? ""}`.trim();
  if (!fullName) return "?";

  const parts = fullName.split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/* ===================== ROW HTML ===================== */

function userRowHtml(user) {
  const nombre = `${user.nombre ?? ""} ${user.apellido ?? ""}`.trim();
  const email = user.email ?? "";
  const telefono = user.telefono ?? user.celular ?? "-";
  const isActive = user.activo === false ? false : true;

  return `
    <tr
      class="student-row"
      data-name="${escapeHtml(nombre.toLowerCase())}"
      data-email="${escapeHtml(email.toLowerCase())}"
      data-status="${isActive ? "active" : "inactive"}"
    >
      <!-- Nombre -->
      <td class="user-cell user-cell-name">
        <div class="user-name-wrapper">
          <div class="user-avatar">
            ${getUserInitials(user)}
          </div>
          <div class="user-name-text">
            <div class="user-name-main">
              ${escapeHtml(nombre)}
            </div>
            <div class="user-name-subtitle">
              Alumno
            </div>
          </div>
        </div>
      </td>

      <!-- Email -->
      <td class="user-cell">
        ${escapeHtml(email || "-")}
      </td>

      <!-- Teléfono -->
      <td class="user-cell">
        ${escapeHtml(telefono)}
      </td>

      <!-- Estado -->
      <td class="user-cell">
        <span class="user-status-pill ${
          isActive ? "user-status-pill--active" : "user-status-pill--inactive"
        }">
          ${isActive ? "Activo" : "Inactivo"}
        </span>
      </td>

      <!-- Acciones -->
      <td class="user-cell user-cell-actions">
        <div class="user-actions">
          <!-- Editar -->
          <button
            class="button-small user-action-button btn-edit-student"
            title="Editar alumno"
            data-user='${JSON.stringify(user)}'
          >
            <span class="material-symbols-outlined">edit_square</span>
          </button>

          <!-- Eliminar -->
          <button
            class="button-small-icon-red user-action-button btn-delete-student"
            title="Eliminar alumno"
            data-user-id="${user.id ?? ""}"
            data-user-name="${escapeHtml(nombre)}"
          >
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </td>
    </tr>
  `;
}

export function usersHtml(usersList) {
  const list = usersList?.users ?? [];

  return `
    <div class="flex flex-col pt-6 pb-6 pl-20 pr-20 page-enter page-users">

      <!-- Filtros -->
      <section class="user-filters">
        <div class="user-filters-row">

          <!-- Search -->
          <div class="user-search-input-container">
            <span class="material-symbols-outlined user-search-icon">search</span>
            <input
              id="students-search"
              class="input user-search-input"
              type="text"
              placeholder="Buscar por nombre o email..."
              autocomplete="off"
            />
          </div>

          <!-- Estado -->
          <div class="user-filter-select">
            <label class="user-filter-label" for="students-status-filter">Estado</label>
            <select
              id="students-status-filter"
              class="input user-status-select"
            >
              <option value="active" selected>Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>

          <!-- Botón nuevo -->
          <button
            id="btn-new-student"
            class="button user-new-button"
            type="button"
          >
            <span class="material-symbols-outlined">add</span>
            Nuevo Alumno
          </button>

        </div>
      </section>

      <!-- Tabla -->
      <section class="user-table-section">
        <h2 class="user-title">Alumnos</h2>

        <div class="user-list">
          <table class="user-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="students-table-body">
              ${
                list.length
                  ? list.map((u) => userRowHtml(u)).join("")
                  : `
                    <tr>
                      <td colspan="5" class="user-empty-state">
                        No hay alumnos registrados todavía.
                      </td>
                    </tr>
                  `
              }
            </tbody>
          </table>
        </div>
      </section>

      <div id="modal-open-user-new"></div>
    </div>
  `;
}
