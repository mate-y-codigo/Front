function esc(val) {
  if (val == null) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function modalExerciseDetailHtml(exercise) {
  const nombre      = esc(exercise?.nombre ?? "");
  const musculo     = esc(exercise?.musculoPrincipal ?? exercise?.musculo ?? "");
  const categoria   = esc(exercise?.categoria ?? "");
  const descripcion = esc(exercise?.descripcion ?? "");
  const urlDemo     = esc(exercise?.urlDemostracion ?? "");
  const activo      = exercise?.activo !== false;

  return `
    <div id="modal-overlay-exercise-detail"
         class="modal-exercise-overlay"
         role="dialog"
         aria-modal="true"
         tabindex="-1">

      <div id="modal-exercise-detail"
           class="modal-exercise modal-exercise-enter flex flex-col">

        <!-- Header -->
        <div class="flex flex-col space-y-1.5 mb-4">
          <h2 class="ubuntu-medium text-xl">
            Detalle de ejercicio
          </h2>
          <p class="ubuntu-regular text-sm text-muted-foreground">
            Información del ejercicio seleccionado.
          </p>
        </div>

        <!-- Contenido -->
        <div class="w-full flex-1 space-y-4">
          <div>
            <h3 class="ubuntu-medium text-base mb-1">Nombre</h3>
            <p class="ubuntu-regular text-sm">${nombre || "-"}</p>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <h3 class="ubuntu-medium text-base mb-1">Músculo principal</h3>
              <p class="ubuntu-regular text-sm">${musculo || "-"}</p>
            </div>
            <div class="flex-1">
              <h3 class="ubuntu-medium text-base mb-1">Categoría</h3>
              <p class="ubuntu-regular text-sm">${categoria || "-"}</p>
            </div>
            <div class="flex-1">
              <h3 class="ubuntu-medium text-base mb-1">Estado</h3>
              <p class="ubuntu-regular text-sm">
                ${activo ? "Activo" : "Inactivo"}
              </p>
            </div>
          </div>

          <div>
            <h3 class="ubuntu-medium text-base mb-1">Descripción</h3>
            <p class="ubuntu-regular text-sm">
              ${
                descripcion
                  ? descripcion
                  : "<span class='text-muted-foreground'>Sin descripción</span>"
              }
            </p>
          </div>

          <div>
            <h3 class="ubuntu-medium text-base mb-1">URL de demostración</h3>
            <p class="ubuntu-regular text-sm">
              ${
                urlDemo
                  ? `<a href="${urlDemo}" target="_blank" rel="noreferrer" class="link">${urlDemo}</a>`
                  : "<span class='text-muted-foreground'>Sin URL de demostración</span>"
              }
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-8 modal-exercise-actions">
          <button
            id="exercise-detail-close"
            type="button"
            class="button-small"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  `;
}
