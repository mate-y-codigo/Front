function escapeHtml(val) {
  if (val == null) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function groupExercisesByGroup(exercises, muscles) {
  const muscleMap = new Map();
  (muscles || []).forEach((m) => {
    const gName = m.grupoMuscular?.nombre || m.grupoMuscularNombre || "Otros";
    muscleMap.set(m.id, gName);
  });

  const groups = new Map();

  (exercises || []).forEach((ex) => {
    const groupNameRaw =
      ex.grupoMuscularNombre ||
      (ex.musculoId != null ? muscleMap.get(ex.musculoId) : null) ||
      "Otros";

    const groupName = escapeHtml(groupNameRaw);
    if (!groups.has(groupName)) groups.set(groupName, []);
    groups.get(groupName).push(ex);
  });

  return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
}

function buildGroupChips(muscleGroups) {
  if (!muscleGroups || !muscleGroups.length) return "";

  const chips = muscleGroups
    .map((g) => {
      const name = escapeHtml(g.nombre ?? "Otros");
      const value = name.toLowerCase();
      return `
        <button
          type="button"
          class="group-chip"
          data-group="${value}"
        >
          ${name}
        </button>
      `;
    })
    .join("");

  return `
    <div class="exercise-group-filter">
      <button
        type="button"
        class="group-chip active"
        data-group=""
      >
        Todos
      </button>
      ${chips}
    </div>
  `;
}

function buildGroupSections(exercises, muscles) {
  const grouped = groupExercisesByGroup(exercises, muscles);

  if (!grouped.length) {
    return `
      <div class="exercise-no-data">
        <p class="ubuntu-regular text-sm text-muted-foreground">
          No hay ejercicios cargados aún.
        </p>
      </div>
    `;
  }

  return grouped
    .map(([groupName, groupExercises]) => {
      const cards = groupExercises
        .map((ex) => {
          const nombre = escapeHtml(ex.nombre ?? ex.name ?? "");
          const musculo = escapeHtml(ex.musculoPrincipal ?? ex.musculo ?? "");
          const categoria = escapeHtml(ex.categoria ?? "");
          const urlDemo = escapeHtml(ex.urlDemostracion ?? ex.urlDemo ?? "");
          const activo = ex.activo === true;

          const dataName = nombre.toLowerCase();
          const dataMuscle = musculo.toLowerCase();
          const dataCategory = categoria;
          const dataState = activo ? "true" : "false";
          const dataGroup = groupName.toLowerCase();

          return `
            <article
              class="exercise-card"
              data-name="${dataName}"
              data-muscle="${dataMuscle}"
              data-category="${dataCategory}"
              data-state="${dataState}"
              data-group="${dataGroup}"
            >
              <div class="exercise-card-main">
                <div class="exercise-card-info">
                  <h3 class="exercise-name">${nombre}</h3>
                  <p class="exercise-muscle-text">${musculo || "-"}</p>
                </div>
                <div class="exercise-card-meta">
                  <span class="exercise-pill exercise-pill--state ${
                    activo
                      ? "exercise-pill--state-active"
                      : "exercise-pill--state-inactive"
                  }">
                    ${activo ? "Activo" : "Inactivo"}
                  </span>
                  <span class="exercise-pill exercise-pill--category">
                    ${categoria || "-"}
                  </span>
                </div>
              </div>

              <div class="exercise-card-actions">
                <button
                  type="button"
                  class="button-small button-small btn-view-demo"
                  data-url="${urlDemo}"
                  title="Ver demostración"
                >
                  <span class="material-symbols-outlined">visibility</span>
                </button>
                <button
                  type="button"
                  class="button-small btn-edit-exercise"
                  data-exercise='${JSON.stringify(ex)}'
                  title="Editar ejercicio"
                >
                  <span class="material-symbols-outlined" style="font-size:18px;">edit_square</span>
                </button>
                <button
                  type="button"
                  class="button-small-cancel btn-delete-exercise"
                  data-exercise-id="${escapeHtml(ex.id ?? "")}"
                  data-exercise-name="${nombre}"
                  title="Eliminar ejercicio"
                >
                  <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
                </button>
              </div>
            </article>
          `;
        })
        .join("");

      return `
        <section class="exercise-group" data-group-section="${groupName.toLowerCase()}">
          <h2 class="exercise-group-title">${groupName}</h2>
          <div class="exercise-cards-row">
            ${cards}
          </div>
        </section>
      `;
    })
    .join("");
}

export function exercisesHtml(data) {
  const exercises = data?.exercises ?? [];
  const muscles = data?.muscles ?? [];
  const muscleGroups = data?.muscleGroups ?? [];

  const groupChipsHtml = buildGroupChips(muscleGroups);
  const groupSectionsHtml = buildGroupSections(exercises, muscles);

  return `
    <div class="flex flex-col pt-6 pb-6 pl-20 pr-20 page-exercises">

      <section class="exercise-filters">
        <div class="exercise-filters-row-1">
          <div class="search-input-container flex-1">
            <span class="material-symbols-outlined search-icon">search</span>
            <input
              id="exercise-search-input"
              class="input w-full"
              type="text"
              placeholder="Buscar por nombre de ejercicio"
              autocomplete="off"
            />
          </div>

          <div class="filter-select">
            <label class="filter-label" for="exercise-muscle-filter">Músculo</label>
            <input
              id="exercise-muscle-filter"
              class="input"
              type="text"
              placeholder="Buscar por músculo"
              autocomplete="off"
            />
          </div>

          <div class="filter-select">
            <label class="filter-label" for="exercise-category-filter">Categoría</label>
            <select
              id="exercise-category-filter"
              class="input select-input"
            >
              <option value="">Todas</option>
              <option value="Movilidad">Movilidad</option>
              <option value="Entrada en Calor">Entrada en Calor</option>
              <option value="Fuerza">Fuerza</option>
              <option value="Hipertrofia">Hipertrofia</option>
            </select>
          </div>

          <div class="filter-select">
            <label class="filter-label" for="exercise-status-filter">Estado</label>
            <select
              id="exercise-status-filter"
              class="input select-input"
            >
              <option value="true" selected>Activos</option>
              <option value="false">Inactivos</option>
            </select>
          </div>

          <button id="btn-new-exercise" class="button inline-flex items-center justify-center gap-2">
            <span class="material-symbols-outlined">add</span>
            <span>Nuevo Ejercicio</span>
          </button>
        </div>
      </section>

      ${groupChipsHtml}

      <!-- Grupos musculares y cartas -->
      <section class="exercise-groups-wrapper">
        ${groupSectionsHtml}
      </section>

      <div id="modal-open-exercise"></div>
      <div id="exercise-toast-container"></div>
    </div>
  `;
}
