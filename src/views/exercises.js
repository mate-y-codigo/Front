import { exercisesHtml } from "../components/exercisesHtml.js";
import { exerciseCreateRender } from "./exerciseCreate.js";
import { exerciseEditRender } from "./exerciseEdit.js";
import { modalExerciseDeleteHtml } from "../components/modalExerciseDeleteHtml.js";
import { headerTxt } from "../config/headerTxt.js";

import {
  getExercises,
  getMuscles,
  getCategories,
  getMuscleGroups,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../services/exerciseApi.js";

const exerciseState = {
  exercises: [],
  muscles: [],
  categories: [],
  muscleGroups: []
};

export async function exercisesRender() {
  const container = document.getElementById("container-main");
  if (!container) return;

  container.classList.add("opacity-0", "scale-95", "transition-all", "duration-300");
  container.classList.remove("opacity-100", "scale-100");

  // Header
  const headerH1 = document.getElementById("header-h1");
  const headerP = document.getElementById("header-p");
  if (headerH1 && headerP && headerTxt.exercises) {
    headerH1.textContent = headerTxt.exercises.h1;
    headerP.textContent = headerTxt.exercises.p;
  }

  setTimeout(async () => {
    try {
      const [
        apiExercisesActivos,
        apiExercisesInactivos,
        apiMuscles,
        apiCategories,
        apiMuscleGroups,
      ] = await Promise.all([
        getExercises({ activo: true }),
        getExercises({ activo: false }),
        getMuscles({}),
        getCategories(),
        getMuscleGroups(),
      ]);

      const apiExercises = [
        ...(apiExercisesActivos ?? []),
        ...(apiExercisesInactivos ?? []),
      ];

      exerciseState.muscles = mapFromApiMuscles(apiMuscles);
      exerciseState.categories = mapFromApiCategories(apiCategories);
      exerciseState.exercises = mapFromApiExercises(apiExercises);
      exerciseState.muscleGroups = mapFromApiMuscleGroups(apiMuscleGroups);

      renderExercisesView();

      container.classList.remove("opacity-0", "scale-95");
      container.classList.add("opacity-100", "scale-100");
    } catch (err) {
      console.error(err);
      container.innerHTML =
        "<p style='color: #fff; padding: 1rem;'>Error cargando ejercicios. Revisá la consola.</p>";

      container.classList.remove("opacity-0", "scale-95");
      container.classList.add("opacity-100", "scale-100");
    }
  }, 100);
}


function renderExercisesView() {
  const container = document.getElementById("container-main");
  if (!container) return;

  container.innerHTML = exercisesHtml({
    exercises: exerciseState.exercises,
    muscles: exerciseState.muscles,
    categories: exerciseState.categories,
    muscleGroups: exerciseState.muscleGroups
  });

  initExercisesEvents();
}


function mapFromApiExercises(apiExercises) {
  return apiExercises.map((e) => {
    const mus = e.musculo;
    const cat = e.categoria;

    return {
      id: e.id,
      nombre: e.nombre,
      musculoId: mus?.id ?? null,
      musculoPrincipal: mus?.nombre ?? "",
      grupoMuscularNombre: mus?.grupoMuscular?.nombre ?? "",
      categoriaId: cat?.id ?? null,
      categoriaNombre: cat?.nombre ?? "",
      categoria: cat?.nombre ?? "",
      activo: e.activo === true,
      urlDemostracion: e.urlDemo ?? "",
    };
  });
}

function mapFromApiMuscles(apiMuscles) {
  return apiMuscles.map((m) => ({
    id: m.id,
    nombre: m.nombre,
    grupoMuscularId: m.grupoMuscular?.id ?? null,
    grupoMuscularNombre: m.grupoMuscular?.nombre ?? "",
  }));
}

function mapFromApiCategories(apiCategories) {
  return apiCategories.map((c) => ({
    id: c.id,
    nombre: c.nombre,
  }));
}

function mapFromApiMuscleGroups(apiMuscleGroups) {
  return apiMuscleGroups.map((mg) => ({
    id: mg.id,
    nombre: mg.nombre
  }))
}

function mapToApiCreate(rawForm) {
  return {
    nombre: rawForm.nombre?.trim() ?? "",
    musculo: rawForm.musculoId ? Number(rawForm.musculoId) : 0,
    urlDemo: rawForm.urlDemostracion?.trim() || "",
    categoria: rawForm.categoriaId ? Number(rawForm.categoriaId) : 0,
  };
}

function mapToApiUpdate(rawForm, original) {
  return {
    nombre: rawForm.nombre?.trim() ?? "",
    musculo: rawForm.musculoId ? Number(rawForm.musculoId) : 0,
    urlDemo: rawForm.urlDemostracion?.trim() || "",
    categoria: rawForm.categoriaId ? Number(rawForm.categoriaId) : 0,
    activo: rawForm.activo === "on" || rawForm.activo === true || !!original.activo,
  };
}

/* =====================  EVENTOS / FILTROS  ===================== */

function initExercisesEvents() {
  const searchInput = document.getElementById("exercise-search-input");
  const muscleInput = document.getElementById("exercise-muscle-filter");
  const categorySelect = document.getElementById("exercise-category-filter");
  const statusSelect = document.getElementById("exercise-status-filter");
  const btnNewExercise = document.getElementById("btn-new-exercise");
  const toastContainer = document.getElementById("exercise-toast-container");
  const modalHost = document.getElementById("modal-open-exercise");

  const cards = Array.from(document.querySelectorAll(".exercise-card"));
  const groupChips = Array.from(document.querySelectorAll(".group-chip"));

  let selectedGroupId = "";

  if (statusSelect && !statusSelect.value) {
    statusSelect.value = "activo";
  }

  function applyFilters() {
    const nameFilter = (searchInput?.value || "").trim().toLowerCase();
    const muscleFilter = (muscleInput?.value || "").trim().toLowerCase();
    const categoryFilter = categorySelect?.value || "";
    const statusFilter = statusSelect?.value || "activo";

    cards.forEach((card) => {
      const name = (card.dataset.name || "").toLowerCase();
      const muscle = (card.dataset.muscle || "").toLowerCase();
      const category = card.dataset.category || "";
      const group = card.dataset.group || "";

      const isActive = card.dataset.active === "true";
      
      const matchesName = !nameFilter || name.includes(nameFilter);
      const matchesMuscle = !muscleFilter || muscle.includes(muscleFilter);
      const matchesCategory = !categoryFilter || category === categoryFilter;
      //const matchesStatus = !statusFilter || state === statusFilter;

      let matchesStatus = true;
      if (statusFilter === "activo") {
        matchesStatus = isActive === true;
      }
      else if (statusFilter === "inactivo") {
        matchesStatus = isActive === false;
      }

      const matchesGroup = !selectedGroupId || group === selectedGroupId;

      const visible = matchesName && matchesMuscle && matchesCategory && matchesStatus && matchesGroup;
      card.classList.toggle("hidden", !visible);
    });

    document.querySelectorAll(".exercise-group").forEach((section) => {
      const anyVisibleCard = section.querySelector(
        ".exercise-card:not(.hidden)"
      );
      section.classList.toggle("hidden", !anyVisibleCard);
    });
  }

  searchInput?.addEventListener("input", applyFilters);
  muscleInput?.addEventListener("input", applyFilters);
  categorySelect?.addEventListener("change", applyFilters);
  statusSelect?.addEventListener("change", applyFilters);
  
  groupChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const value = chip.dataset.group || "";

    selectedGroupId = value;
    groupChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    applyFilters();
  });
});

  applyFilters();

  // Nuevo ejercicio
  btnNewExercise?.addEventListener("click", () => {
    exerciseCreateRender();
  });

  // Ver demo
  document.querySelectorAll(".btn-view-demo").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");
      if (url && url.trim() !== "") {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        showExerciseToast(
          "Este ejercicio no tiene video de demostración.",
          toastContainer
        );
      }
    });
  });

  // Editar
  document.querySelectorAll(".btn-edit-exercise").forEach((btn) => {
    btn.addEventListener("click", () => {
      const exJson = btn.getAttribute("data-exercise");
      if (!exJson) return;
      const ex = JSON.parse(exJson);
      exerciseEditRender(ex);
    });
  });


  // Eliminar
  document.querySelectorAll(".btn-delete-exercise").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-exercise-id");
      const ex = exerciseState.exercises.find((e) => String(e.id) === String(id));
      if (!ex || !modalHost) return;
      openDeleteExerciseModal(modalHost, ex);
    });
  });
}

/* =====================  TOAST  ===================== */

function showExerciseToast(message, container) {
  if (!container) return;

  container.innerHTML = "";

  const div = document.createElement("div");
  div.className = "exercise-toast";
  div.textContent = message;
  container.appendChild(div);

  setTimeout(() => {
    div.style.opacity = "0";
    div.style.transform = "translateY(8px)";
    setTimeout(() => div.remove(), 200);
  }, 2000);
}

/* =====================  MODAL: EDITAR  ===================== */

function openEditExerciseModal(modalHost, exercise) {
  modalHost.innerHTML = modalExerciseEditHtml({
    exercise,
    muscles: exerciseState.muscles,
    categories: exerciseState.categories,
  });

  const overlay = document.getElementById("modal-overlay-exercise-edit");
  const modal = document.getElementById("modal-exercise-edit");
  const form = document.getElementById("exercise-edit-form");
  const btnCancel = document.getElementById("exercise-edit-cancel");

  if (!overlay || !modal || !form || !btnCancel) return;

  function close() {
    modalHost.innerHTML = "";
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  btnCancel.addEventListener("click", close);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(form).entries());
    const dto = mapToApiUpdate(raw, exercise);

    try {
      const updatedApi = await updateExercise(exercise.id, dto);
      const mapped = mapFromApiExercises([updatedApi])[0];

      const idx = exerciseState.exercises.findIndex(
        (ex) => String(ex.id) === String(exercise.id)
      );
      if (idx >= 0) exerciseState.exercises[idx] = mapped;

      close();
      renderExercisesView();
    } catch (err) {
      console.error(err);
    }
  });
}

/* =====================  MODAL: ELIMINAR  ===================== */

function openDeleteExerciseModal(modalHost, exercise) {
  modalHost.innerHTML = modalExerciseDeleteHtml(exercise);

  const overlay = document.getElementById("modal-overlay-exercise-delete");
  const modal = document.getElementById("modal-exercise-delete");
  const btnCancel = document.getElementById("exercise-delete-cancel");
  const btnConfirm = document.getElementById("exercise-delete-confirm");

  if (!overlay || !modal || !btnCancel || !btnConfirm) return;

  function close() {
    modalHost.innerHTML = "";
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  btnCancel.addEventListener("click", close);

  btnConfirm.addEventListener("click", async () => {
    try {
      await deleteExercise(exercise.id);

      exerciseState.exercises = exerciseState.exercises.filter(
        (ex) => String(ex.id) !== String(exercise.id)
      );

      close();
      renderExercisesView();
    } catch (err) {
      console.error(err);
    }
  });
}
