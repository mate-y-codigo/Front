import { exerciseCreateHtml } from "../components/exerciseCreateHtml.js";
import {
  getMuscles,
  getMuscleGroups,
  getCategories,
  createExercise,
} from "../services/exerciseApi.js";
import { exercisesRender } from "./exercises.js";

export async function exerciseCreateRender() {
  const container = document.getElementById("container-main");
  if (!container) return;

  // Actualizar header
  const headerH1 = document.getElementById("header-h1");
  const headerP = document.getElementById("header-p");
  if (headerH1 && headerP) {
    headerH1.textContent = "Nuevo Ejercicio";
    headerP.textContent = "Agregá un nuevo ejercicio al catálogo.";
  }

  try {
    const [apiMuscles, apiGroups, apiCategories] = await Promise.all([
      getMuscles({}),
      getMuscleGroups(),
      getCategories(),
    ]);

    const muscles = apiMuscles.map((m) => ({
      id: m.id,
      nombre: m.nombre,
      grupoMuscularId: m.grupoMuscular?.id ?? null,
      grupoMuscularNombre: m.grupoMuscular?.nombre ?? "",
    }));

    const muscleGroups = apiGroups.map((g) => ({
      id: g.id,
      nombre: g.nombre,
    }));

    const categories = apiCategories.map((c) => ({
      id: c.id,
      nombre: c.nombre,
    }));

    // 👇 AHORA SÍ: llamamos al componente pasando el objeto con props
    container.innerHTML = exerciseCreateHtml({
      muscles,
      muscleGroups,
      categories,
    });

    initExerciseCreateEvents();
  } catch (err) {
    console.error(err);
    container.innerHTML =
      "<p style='color:#fff; padding:1rem;'>Error cargando datos para crear un ejercicio.</p>";
  }
}

function mapToApiCreate(raw) {
  return {
    nombre: raw.nombre?.trim() ?? "",
    musculo: raw.musculoId ? Number(raw.musculoId) : 0,
    categoria: raw.categoriaId ? Number(raw.categoriaId) : 0,
    urlDemo: raw.urlDemostracion?.trim() || "",
  };
}

function initExerciseCreateEvents() {
  const form = document.getElementById("exercise-create-form");
  const btnCancel = document.getElementById("exercise-create-cancel");
  const groupSelect = document.getElementById("exercise-group");
  const muscleSelect = document.getElementById("exercise-muscle");

  if (!form || !btnCancel || !groupSelect || !muscleSelect) return;

  const allOptions = Array.from(muscleSelect.querySelectorAll("option"));

  groupSelect.addEventListener("change", () => {
    const groupId = groupSelect.value;

    muscleSelect.innerHTML = "";
    const baseOption = document.createElement("option");
    baseOption.value = "";
    baseOption.textContent = "Seleccionar músculo...";
    muscleSelect.appendChild(baseOption);

    allOptions.forEach((opt) => {
      const optGroupId = opt.getAttribute("data-group-id");
      if (!optGroupId) return;

      if (!groupId || optGroupId === groupId) {
        muscleSelect.appendChild(opt.cloneNode(true));
      }
    });
  });

  btnCancel.addEventListener("click", () => {
    exercisesRender();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(form).entries());
    const dto = mapToApiCreate(raw);

    try {
      await createExercise(dto);
      await exercisesRender();
    } catch (err) {
      console.error(err);
    }
  });
}
