import { exerciseEditHtml } from "../components/exerciseEditHtml.js";
import {
  getMuscles,
  getMuscleGroups,
  getCategories,
  updateExercise,
} from "../services/exerciseApi.js";
import { exercisesRender } from "./exercises.js";
import { headerTxt } from "../config/headerTxt.js";

function mapFromApiMuscles(apiMuscles) {
  return apiMuscles.map((m) => ({
    id: m.id,
    nombre: m.nombre,
    grupoMuscularId: m.grupoMuscular?.id ?? null,
    grupoMuscularNombre: m.grupoMuscular?.nombre ?? "",
  }));
}

function mapFromApiMuscleGroups(apiMuscleGroups) {
  return apiMuscleGroups.map((mg) => ({
    id: mg.id,
    nombre: mg.nombre,
  }));
}

function mapFromApiCategories(apiCategories) {
  return apiCategories.map((c) => ({
    id: c.id,
    nombre: c.nombre,
  }));
}

function mapToApiUpdate(rawForm, original) {
    const isActivo =
    rawForm.activo === "on" || rawForm.activo === "true" || rawForm.activo === true;
    return {
    nombre: rawForm.nombre?.trim() ?? "",
    musculo: rawForm.musculoId ? Number(rawForm.musculoId) : original.musculoId ?? 0,
    urlDemo: rawForm.urlDemostracion?.trim() ?? "",
    categoria: rawForm.categoriaId
      ? Number(rawForm.categoriaId)
      : original.categoriaId ?? 0,
    activo: isActivo,
  };
}

export async function exerciseEditRender(exercise) {
  const container = document.getElementById("container-main");
  if (!container) return;

  const headerH1 = document.getElementById("header-h1");
  const headerP = document.getElementById("header-p");
  if (headerH1 && headerP && headerTxt.exercisesEdit){
    headerH1.textContent = headerTxt.exercisesEdit.h1;
    headerP.textContent = headerTxt.exercisesEdit.p;
  }

  try {
    const [apiMuscles, apiMuscleGroups, apiCategories] = await Promise.all([
      getMuscles({}),
      getMuscleGroups(),
      getCategories(),
    ]);

    const muscles = mapFromApiMuscles(apiMuscles);
    const muscleGroups = mapFromApiMuscleGroups(apiMuscleGroups);
    const categories = mapFromApiCategories(apiCategories);

    // calcular grupo muscular seleccionado a partir del músculo actual
    const selectedMuscle = muscles.find(
      (m) => m.id === (exercise.musculoId ?? null)
    );
    const selectedGroupId = selectedMuscle?.grupoMuscularId ?? null;

    container.innerHTML = exerciseEditHtml({
      exercise,
      muscles,
      muscleGroups,
      categories,
      selectedGroupId,
    });

    initExerciseEditEvents(exercise);
  } catch (err) {
    console.error(err);
    container.innerHTML =
      "<p style='color:#fff; padding:1rem;'>Error cargando datos para editar el ejercicio.</p>";
  }
}

function initExerciseEditEvents(originalExercise) {
  const form = document.getElementById("exercise-edit-form");
  const btnCancel = document.getElementById("exercise-edit-cancel");
  const groupSelect = document.getElementById("exercise-group");
  const muscleSelect = document.getElementById("exercise-muscle");

  if (!form || !btnCancel || !groupSelect || !muscleSelect) return;

  const selectedMuscleId = originalExercise.musculoId ?? null;

  // Guardamos todas las opciones de músculos para poder filtrarlas por grupo
  const allOptions = Array.from(muscleSelect.querySelectorAll("option")).filter(
    (opt) => opt.getAttribute("data-group-id")
  );

  function rebuildMuscleOptions() {
    const groupId = groupSelect.value;

    muscleSelect.innerHTML = "";
    const baseOption = document.createElement("option");
    baseOption.value = "";
    baseOption.textContent = "Seleccionar músculo...";
    muscleSelect.appendChild(baseOption);

    allOptions.forEach((opt) => {
      const optGroupId = opt.getAttribute("data-group-id");
      if (!groupId || optGroupId === groupId) {
        muscleSelect.appendChild(opt.cloneNode(true));
      }
    });

    // intentar mantener el músculo seleccionado si pertenece al grupo
    if (selectedMuscleId) {
      const exists = Array.from(muscleSelect.options).some(
        (o) => Number(o.value) === Number(selectedMuscleId)
      );
      if (exists) {
        muscleSelect.value = String(selectedMuscleId);
      }
    }
  }

  groupSelect.addEventListener("change", rebuildMuscleOptions);

  // Primera pasada para respetar el grupo muscular inicial
  rebuildMuscleOptions();

  btnCancel.addEventListener("click", () => {
    exercisesRender();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(form).entries());
    const dto = mapToApiUpdate(raw, originalExercise);

    try {
      await updateExercise(originalExercise.id, dto);
      await exercisesRender();
    } catch (err) {
      console.error(err);
      // acá podrías mostrar un toast de error
    }
  });
}
