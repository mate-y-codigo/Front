export function exerciseCreateHtml({ muscles, muscleGroups, categories }) {
  return `
    <div class="exercise-create-page">
      <div class="exercise-create-card">
        <div class="exercise-create-header">
          <h2>Nuevo Ejercicio</h2>
          <p>Ingresá los datos del ejercicio que querés agregar.</p>
        </div>

        <form id="exercise-create-form" class="exercise-form">
          <div class="exercise-form-row">
            <div class="exercise-form-field">
              <label for="exercise-name">Nombre *</label>
              <input
                id="exercise-name"
                name="nombre"
                type="text"
                class="input"
                placeholder="Nombre del ejercicio..."
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
                      <option value="${g.id}">${g.nombre}</option>
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
                      <option value="${m.id}" data-group-id="${m.grupoMuscularId}">
                        ${m.nombre} ${
                          m.grupoMuscularNombre
                            ? `(${m.grupoMuscularNombre})`
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
                      <option value="${c.id}">${c.nombre}</option>
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
              />
            </div>
          </div>

          <div class="exercise-form-actions">
            <button
              type="button"
              id="exercise-create-cancel"
              class="button button-cancel"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="button inline-flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">add</span>
              <span>Guardar ejercicio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}
