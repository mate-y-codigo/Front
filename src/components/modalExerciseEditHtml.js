function esc(val) {
  if (val == null) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function modalExerciseEditHtml(exercise) {
  const id          = esc(exercise?.id ?? "");
  const nombre      = esc(exercise?.nombre ?? "");
  const musculo     = esc(exercise?.musculoPrincipal ?? exercise?.musculo ?? "");
  const categoria   = esc(exercise?.categoria ?? "");
  const descripcion = esc(exercise?.descripcion ?? "");
  const urlDemo     = esc(exercise?.urlDemostracion ?? "");
  const activo      = exercise?.activo !== false;

  return `
    <div id="modal-overlay-exercise-edit"
         class="modal-exercise-overlay"
         role="dialog"
         aria-modal="true"
         tabindex="-1">

      <div id="modal-exercise-edit"
           class="modal-exercise modal-exercise-enter flex flex-col">

        <!-- Header -->
        <div class="flex flex-col space-y-1.5 mb-4">
          <h2 class="ubuntu-medium text-xl">Editar ejercicio</h2>
          <p class="ubuntu-regular text-sm text-muted-foreground">
            Actualizá la información del ejercicio.
          </p>
        </div>

        <!-- Contenido -->
        <div class="w-full flex-1">
          <form id="exercise-edit-form" class="space-y-6">

            <input type="hidden" name="id" value="${id}" />

            <!-- Nombre -->
            <div class="space-y-2">
              <label class="ubuntu-regular text-sm" for="exercise-edit-name">
                Nombre del ejercicio *
              </label>
              <input
                id="exercise-edit-name"
                name="nombre"
                class="input"
                value="${nombre}"
                required
              />
            </div>

            <!-- Músculo + Categoría -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="exercise-edit-muscle">
                  Músculo principal *
                </label>
                <input
                  id="exercise-edit-muscle"
                  name="musculoPrincipal"
                  class="input"
                  value="${musculo}"
                  required
                />
              </div>

              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="exercise-edit-category">
                  Categoría *
                </label>
                <select
                  id="exercise-edit-category"
                  name="categoria"
                  class="input"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Movilidad" ${categoria === "Movilidad" ? "selected" : ""}>Movilidad</option>
                  <option value="Entrada en Calor" ${categoria === "Entrada en Calor" ? "selected" : ""}>Entrada en Calor</option>
                  <option value="Fuerza" ${categoria === "Fuerza" ? "selected" : ""}>Fuerza</option>
                  <option value="Hipertrofia" ${categoria === "Hipertrofia" ? "selected" : ""}>Hipertrofia</option>
                </select>
              </div>
            </div>

            <!-- Descripción -->
            <div class="space-y-2">
              <label class="ubuntu-regular text-sm" for="exercise-edit-description">
                Descripción
              </label>
              <textarea
                id="exercise-edit-description"
                name="descripcion"
                class="input"
                rows="3"
              >${descripcion}</textarea>
            </div>

            <!-- URL demostración -->
            <div class="space-y-2">
              <label class="ubuntu-regular text-sm" for="exercise-edit-url">
                URL de demostración
              </label>
              <input
                id="exercise-edit-url"
                name="urlDemostracion"
                type="url"
                class="input"
                value="${urlDemo}"
                placeholder="https://ejemplo.com/video-o-guía"
              />
            </div>

            <!-- Estado -->
            <div class="space-y-2">
              <label class="ubuntu-regular text-sm" for="exercise-edit-active">
                Estado
              </label>
              <div class="flex items-center gap-2">
                <input
                  id="exercise-edit-active"
                  name="activo"
                  type="checkbox"
                  class="checkbox"
                  ${activo ? "checked" : ""}
                />
                <span class="ubuntu-regular text-sm">
                  Ejercicio activo
                </span>
              </div>
            </div>

          </form>
        </div>

        <!-- Footer -->
        <div class="mt-8 modal-exercise-actions">
          <button
            id="exercise-edit-cancel"
            type="button"
            class="button-small-cancel"
          >
            Cancelar
          </button>
          <button
            id="exercise-edit-save"
            type="submit"
            form="exercise-edit-form"
            class="button-small"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  `;
}
