function escAttr(value) {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * @param {{ id: string|number, nombre?: string, apellido?: string, email?: string }} user
 */
export function modalStudentDeleteHtml(user) {
  const fullName = escAttr(`${user?.nombre ?? ""} ${user?.apellido ?? ""}`.trim()) || "este alumno";
  const email = escAttr(user?.email ?? "");

  return `
    <div id="modal-overlay-student-delete"
         class="modal-user-overlay"
         role="dialog"
         aria-modal="true"
         tabindex="-1">

      <div id="modal-student-delete"
           class="modal-user modal-user-enter flex flex-col">

        <div class="flex flex-col space-y-1.5 mb-4">
          <h2 class="ubuntu-medium text-xl">Eliminar Alumno</h2>
          <p class="ubuntu-regular text-sm text-muted-foreground">
            ¿Seguro que querés eliminar a <b>${fullName}</b>${email ? ` (${email})` : ""}?
          </p>
        </div>

        <div class="mt-6 modal-user-actions">
          <button id="student-delete-cancel"
                  type="button"
                  class="button">
            Cancelar
          </button>
          <button id="student-delete-confirm"
                  type="button"
                  class="button-cancel">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `;
}
