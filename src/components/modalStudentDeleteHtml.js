function esc(v) {
  if (v == null) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function modalStudentDeleteHtml(user, newActive) {
  const nombreCompleto = `${user.nombre ?? ""} ${user.apellido ?? ""}`.trim() || "este alumno";

  const title = newActive ? "Reactivar alumno" : "Eliminar alumno";
  const question = newActive
    ? `¿Seguro que querés reactivar a <b>${esc(nombreCompleto)}</b>?`
    : `¿Seguro que querés desactivar (eliminar) a <b>${esc(nombreCompleto)}</b>?`;

  const confirmText = newActive ? "Reactivar" : "Eliminar";
  const confirmButtonClass = newActive
    ? "button"           // REACTIVAR
    : "button-cancel";   // DESACTIVAR

  return `
    <div id="modal-overlay-student-delete" class="modal-user-overlay">
      <div id="modal-student-delete" class="modal-user modal-user-enter flex flex-col">
        <div class="flex flex-col space-y-1.5 mb-4">
          <h1 class="ubuntu-medium text-xl">${title}</h1>
          <p class="ubuntu-regular text-sm text-muted-foreground">
            ${question}
          </p>
        </div>

        <div class="mt-8 modal-user-actions">
          <button
            id="student-delete-cancel"
            type="button"
            class="button"
          >
            Cancelar
          </button>
          <button
            id="student-delete-confirm"
            type="button"
            class="${confirmButtonClass}"
          >
            ${confirmText}
          </button>
        </div>
      </div>
    </div>
  `;
}
