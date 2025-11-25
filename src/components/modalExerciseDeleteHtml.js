function esc(val) {
  if (val == null) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function modalExerciseDeleteHtml(exercise) {
  const nombre = esc(exercise?.nombre ?? "este ejercicio");

  return `
    <div id="modal-overlay-exercise-delete"
         class="modal-exercise-overlay"
         role="dialog"
         aria-modal="true"
         tabindex="-1">

      <div id="modal-exercise-delete"
           class="modal-exercise modal-exercise-enter flex flex-col">

        <!-- Header -->
        <div class="flex flex-col space-y-1.5 mb-4">
          <h2 class="ubuntu-medium text-xl">Eliminar ejercicio</h2>
          <p class="ubuntu-regular text-sm text-muted-foreground">
            ¿Seguro que querés eliminar el ejercicio <b>${nombre}</b>?
          </p>
          <p class="ubuntu-regular text-xs text-muted-foreground">
            Más adelante esto se implementará como un <i>soft delete</i>.
          </p>
        </div>

        <!-- Footer -->
        <div class="mt-8 modal-exercise-actions">
          <button
            id="exercise-delete-cancel"
            type="button"
            class="button-small-cancel"
          >
            Cancelar
          </button>
          <button
            id="exercise-delete-confirm"
            type="button"
            class="button-small"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `;
}
