// src/components/exerciseEditHtml.js

function escapeHtml(val) {
  if (val == null) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function exerciseEditHtml({ exercise, muscles, muscleGroups, categories, selectedGroupId }) {
  const nombre = escapeHtml(exercise.nombre ?? "");
  const urlDemo = escapeHtml(exercise.urlDemostracion ?? exercise.urlDemo ?? "");
  const selectedMuscleId = exercise.musculoId ?? null;
  const selectedCategoryId = exercise.categoriaId ?? null;

  return `
    <div class="exercise-create-page">
      <div class="exercise-create-card">
        <div class="exercise-create-header">
          <h2>Editar Ejercicio</h2>
          <p>Modificá los datos del ejercicio seleccionado.</p>
        </div>

        <form id="exercise-edit-form" class="exercise-form">
          <div class="exercise-form-row">
            <div class="exercise-form-field">
              <label for="exercise-name">Nombre *</label>
              <input
                id="exercise-name"
                name="nombre"
                type="text"
                class="input"
                placeholder="Nombre del ejercicio..."
                value="${nombre}"
                required
              />
            </div>
          </div>

          <div class="exercise-form-row">
            <div class="exercise-form-field">
              <label for="exercise-group">Filtrar por Grupo muscular</label>
              <select
                id="exercise-group"
                name="grupoMuscularId"
                class="input"
              >
                <option value="">Todos los grupos</option>
                ${muscleGroups
                  .map(
                    (g) => `
                      <option
                        value="${g.id}"
                        ${g.id === selectedGroupId ? "selected" : ""}
                      >
                        ${escapeHtml(g.nombre)}
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </div>

            <div class="exercise-form-field">
              <label for="exercise-muscle">Músculo principal *</label>
              <select
                id="exercise-muscle"
                name="musculoId"
                class="input"
                required
              >
                <option value="">Seleccionar músculo...</option>
                ${muscles
                  .map(
                    (m) => `
                      <option
                        value="${m.id}"
                        data-group-id="${m.grupoMuscularId ?? ""}"
                        ${m.id === selectedMuscleId ? "selected" : ""}
                      >
                        ${escapeHtml(m.nombre)} ${
                          m.grupoMuscularNombre
                            ? `(${escapeHtml(m.grupoMuscularNombre)})`
                            : ""
                        }
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </div>
          </div>

          <div class="exercise-form-row">
            <div class="exercise-form-field">
              <label for="exercise-category">Categoría *</label>
              <select
                id="exercise-category"
                name="categoriaId"
                class="input"
                required
              >
                <option value="">Seleccionar categoría...</option>
                ${categories
                  .map(
                    (c) => `
                      <option
                        value="${c.id}"
                        ${c.id === selectedCategoryId ? "selected" : ""}
                      >
                        ${escapeHtml(c.nombre)}
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </div>

            <div class="exercise-form-field">
              <label for="exercise-url">URL de demostración</label>
              <input
                id="exercise-url"
                name="urlDemostracion"
                type="url"
                class="input"
                placeholder="https://..."
                value="${urlDemo}"
              />
            </div>
          </div>

          <div class="exercise-form-row">
            <div class="exercise-form-field">
              <label for="exercise-active">Estado</label>
              <div class="flex items-center gap-2">
                <input
                  id="exercise-active"
                  name="activo"
                  type="checkbox"
                  ${exercise.activo ? "checked" : ""}
                />
                <span class="text-sm">
                  Ejercicio activo
                </span>
              </div>
            </div>
          </div>

          <div class="exercise-form-actions">
            <button
              type="button"
              id="exercise-edit-cancel"
              class="button button-cancel"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="button inline-flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">edit_square</span>
              <span>Guardar cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}
