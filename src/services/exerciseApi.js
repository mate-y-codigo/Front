const BASE_URL = "https://localhost:7243"; 

function buildQuery(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    qs.append(k, v);
  });
  const s = qs.toString();
  return s ? `?${s}` : "";
}

// --- GETS ---

// GET /api/Exercise
export async function getExercises(filters = {}) {
  const query = buildQuery({
    nombre: filters.nombre,
    idMusculo: filters.idMusculo,
    idCategoria: filters.idCategoria,
    Activo: filters.activo,
  });

  const res = await fetch(`${BASE_URL}/api/Exercise${query}`);
  if (!res.ok) {
    throw new Error("No se pudieron obtener los ejercicios");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

// GET /api/Muscle
export async function getMuscles(filters = {}) {
  const query = buildQuery({
    idMusculo: filters.idMusculo,
    idGrupoMuscular: filters.idGrupoMuscular,
    Musculo: filters.musculo,
    grupoMuscular: filters.grupoMuscular,
  });

  const res = await fetch(`${BASE_URL}/api/Muscle${query}`);
  if (!res.ok) {
    throw new Error("No se pudieron obtener los músculos");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

// GET /api/MuscleGroup
export async function getMuscleGroups() {
  const res = await fetch(`${BASE_URL}/api/MuscleGroup`);

  if (!res.ok) {
    throw new Error("No se pudieron obtener los grupos musculares");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

// GET /api/CategoryExercise
export async function getCategories() {
  const res = await fetch(`${BASE_URL}/api/CategoryExercise`);

  if (!res.ok) {
    throw new Error("No se pudieron obtener las categorías de ejercicio");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

// --- EJERCICIO ---

// POST /api/Exercise
export async function createExercise(createDto) {
  const res = await fetch(`${BASE_URL}/api/Exercise`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createDto),
  });

  if (!res.ok) {
    const err = await safeReadError(res);
    throw new Error(err || "No se pudo crear el ejercicio");
  }

  return await res.json();
}

// PUT /api/Exercise/{id}
export async function updateExercise(id, updateDto) {
  const res = await fetch(`${BASE_URL}/api/Exercise/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDto),
  });

  if (!res.ok) {
    const err = await safeReadError(res);
    throw new Error(err || "No se pudo actualizar el ejercicio");
  }

  return await res.json();
}

// DELETE /api/Exercise/{id}
export async function deleteExercise(id) {
  const res = await fetch(`${BASE_URL}/api/Exercise/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await safeReadError(res);
    throw new Error(err || "No se pudo eliminar el ejercicio");
  }

  return await res.json();
}

// helpers
async function safeReadError(res) {
  try {
    const text = await res.text();
    console.error("Error body del back:", text);
    try {
      const json = JSON.parse(text);
      return json?.title || json?.message || text;
    } catch {
      return text;
    }
  } catch {
    return null;
  }
}
