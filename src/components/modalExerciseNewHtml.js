export function modalExerciseNewHtml() {
  return `
    <div id="modal-overlay-exercise-new"
         class="modal-exercise-overlay"
         role="dialog"
         aria-modal="true"
         tabindex="-1">

      <div id="modal-exercise-new"
           class="modal-exercise modal-exercise-enter flex flex-col">

        <!-- Header -->
        <div class="flex flex-col space-y-1.5 mb-4">
          <h2 class="ubuntu-medium text-xl">Nuevo ejercicio</h2>
          <p class="ubuntu-regular text-sm text-muted-foreground">
            Cargá un nuevo ejercicio al catálogo.
          </p>
        </div>

        <!-- Contenido -->
        <div class="w-full flex-1">
          <form id="exercise-new-form" class="space-y-6">

            <!-- Nombre -->
            <div class="space-y-2">
              <label class="ubuntu-regular text-sm" for="exercise-new-name">
                Nombre del ejercicio *
              </label>
              <input
                id="exercise-new-name"
                name="nombre"
                class="input"
                placeholder="Press banca, Sentadilla, etc."
                required
              />
            </div>

            <!-- Músculo (por grupo + búsqueda + lista) -->
            <div class="space-y-2">
              <label class="ubuntu-regular text-sm">
                Músculo que trabaja *
              </label>

              <div class="flex flex-col md:flex-row gap-4">
                <!-- Filtro por grupo muscular -->
                <div class="flex-1 space-y-2">
                  <span class="ubuntu-regular text-xs text-muted-foreground">
                    Grupo muscular
                  </span>
                  <select
                    id="exercise-new-muscle-group"
                    class="input select-input"
                  >
                    <option value="">Todos</option>
                    <!-- se completa desde JS -->
                  </select>
                </div>

                <!-- Búsqueda por nombre de músculo -->
                <div class="flex-1 space-y-2">
                  <span class="ubuntu-regular text-xs text-muted-foreground">
                    Buscar músculo
                  </span>
                  <input
                    id="exercise-new-muscle-search"
                    class="input"
                    type="text"
                    placeholder="Escribí para filtrar por nombre"
                    autocomplete="off"
                  />
                </div>
              </div>

              <!-- Lista de músculos -->
              <div class="space-y-1">
                <select
                  id="exercise-new-muscle-select"
                  name="musculoId"
                  class="input select-input"
                  required
                >
                  <option value="">Seleccionar músculo</option>
                  <!-- se completa desde JS -->
                </select>
                <p class="ubuntu-regular text-xs text-muted-foreground">
                  Elegí el músculo desde el listado filtrado.
                </p>
              </div>
            </div>

            <!-- Categoría -->
            <div class="space-y-2">
              <label class="ubuntu-regular text-sm" for="exercise-new-category">
                Categoría *
              </label>
              <select
                id="exercise-new-category"
                name="categoria"
                class="input"
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="Movilidad">Movilidad</option>
                <option value="Entrada en Calor">Entrada en Calor</option>
                <option value="Fuerza">Fuerza</option>
                <option value="Hipertrofia">Hipertrofia</option>
              </select>
            </div>

            <!-- URL demostración -->
            <div class="space-y-2">
              <label class="ubuntu-regular text-sm" for="exercise-new-url">
                URL de demostración (opcional)
              </label>
              <input
                id="exercise-new-url"
                name="urlDemostracion"
                type="url"
                class="input"
                placeholder="https://ejemplo.com/video-o-guía"
              />
            </div>

            <!-- Estado -->
            <div class="space-y-2">
              <label class="ubuntu-regular text-sm" for="exercise-new-active">
                Estado
              </label>
              <div class="flex items-center gap-2">
                <input
                  id="exercise-new-active"
                  name="activo"
                  type="checkbox"
                  class="checkbox"
                  checked
                />
                <span class="ubuntu-regular text-sm">
                  Ejercicio activo
                </span>
              </div>
            </div>

          </form>
        </div>

        <!-- Footer botones -->
        <div class="mt-8 modal-exercise-actions">
          <button
            id="exercise-new-cancel"
            type="button"
            class="button-small-cancel"
          >
            Cancelar
          </button>
          <button
            id="exercise-new-save"
            type="submit"
            form="exercise-new-form"
            class="button-small"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  `;
}
