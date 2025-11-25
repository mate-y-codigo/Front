// src/views/exercises.js

import { exercisesHtml } from "../components/exercisesHtml.js";
import { modalExerciseNewHtml } from "../components/modalExerciseNewHtml.js";
import { modalExerciseEditHtml } from "../components/modalExerciseEditHtml.js";
import { modalExerciseDeleteHtml } from "../components/modalExerciseDeleteHtml.js";

const exerciseState = {
  exercises: [],
  muscles: [],
};

const fakeExercises = [
  {
    id: 1,
    nombre: "Press de banco",
    musculoPrincipal: "Pectoral mayor",
    categoria: "Fuerza",
    activo: true,
    urlDemostracion: "https://ejemplo.com/press-banca",
    musculoId: 1,
    grupoMuscularNombre: "Pecho",
  },
  {
    id: 2,
    nombre: "Sillón de cuádriceps",
    musculoPrincipal: "Cuádriceps",
    categoria: "Hipertrofia",
    activo: true,
    urlDemostracion: "",
    musculoId: 2,
    grupoMuscularNombre: "Piernas",
  },
  {
    id: 3,
    nombre: "Rotaciones de hombro con banda",
    musculoPrincipal: "Manguito rotador",
    categoria: "Movilidad",
    activo: true,
    urlDemostracion: "",
    musculoId: 3,
    grupoMuscularNombre: "Hombros",
  },
];

const fakeMuscles = [
  {
    id: 1,
    nombre: "Pectoral mayor",
    grupoMuscular: { id: 1, nombre: "Pecho" },
  },
  {
    id: 2,
    nombre: "Cuádriceps",
    grupoMuscular: { id: 2, nombre: "Piernas" },
  },
  {
    id: 3,
    nombre: "Manguito rotador",
    grupoMuscular: { id: 3, nombre: "Hombros" },
  },
];

export function exercisesRender(initialExercises, initialMuscles) {
  const container = document.getElementById("container-main");
  if (!container) return;

  exerciseState.exercises = initialExercises ?? fakeExercises;
  exerciseState.muscles = initialMuscles ?? fakeMuscles;

  renderExercisesView();
}

function renderExercisesView() {
  const container = document.getElementById("container-main");
  if (!container) return;

  container.innerHTML = exercisesHtml({
    exercises: exerciseState.exercises,
    muscles: exerciseState.muscles,
  });

  initExercisesEvents();
}

/* Vistas */

function initExercisesEvents() {
  const searchInput = document.getElementById("exercise-search-input");
  const muscleInput = document.getElementById("exercise-muscle-filter");
  const categorySelect = document.getElementById("exercise-category-filter");
  const statusSelect = document.getElementById("exercise-status-filter");
  const btnNewExercise = document.getElementById("btn-new-exercise");
  const toastContainer = document.getElementById("exercise-toast-container");
  const modalHost = document.getElementById("modal-open-exercise");

  const cards = Array.from(document.querySelectorAll(".exercise-card"));

  /* Filtros */
  function applyFilters() {
    const nameFilter = (searchInput?.value || "").trim().toLowerCase();
    const muscleFilter = (muscleInput?.value || "").trim().toLowerCase();
    const categoryFilter = categorySelect?.value || "";
    const statusFilter = statusSelect?.value || "";

    cards.forEach((card) => {
      const name = (card.dataset.name || "").toLowerCase();
      const muscle = (card.dataset.muscle || "").toLowerCase();
      const category = card.dataset.category || "";
      const state = card.dataset.state || "";

      const matchesName = !nameFilter || name.includes(nameFilter);
      const matchesMuscle = !muscleFilter || muscle.includes(muscleFilter);
      const matchesCategory = !categoryFilter || category === categoryFilter;
      const matchesStatus = !statusFilter || state === statusFilter;

      const visible =
        matchesName && matchesMuscle && matchesCategory && matchesStatus;

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

  applyFilters();

  /* Botón Nuevo ejercicio */
  btnNewExercise?.addEventListener("click", () => {
    if (!modalHost) return;
    openNewExerciseModal(modalHost);
  });

  /* Botones Ver demostración */
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

  /* Botones Editar */
  document.querySelectorAll(".btn-edit-exercise").forEach((btn) => {
    btn.addEventListener("click", () => {
      const raw = btn.getAttribute("data-exercise");
      if (!raw || !modalHost) return;
      const exercise = JSON.parse(raw);
      openEditExerciseModal(modalHost, exercise);
    });
  });

  /* Botones Eliminar */
  document.querySelectorAll(".btn-delete-exercise").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-exercise-id");
      const name = btn.getAttribute("data-exercise-name") || "";
      if (!id || !modalHost) return;
      openDeleteExerciseModal(modalHost, { id, nombre: name });
    });
  });
}

/* TOAST */
// toast para cuando el ejercicio no tiene video
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

/* MODAL: NUEVO EJERCICIO */

function openNewExerciseModal(modalHost) {
  modalHost.innerHTML = modalExerciseNewHtml();

  const overlay = document.getElementById("modal-overlay-exercise-new");
  const modal = document.getElementById("modal-exercise-new");
  const form = document.getElementById("exercise-new-form");
  const btnCancel = document.getElementById("exercise-new-cancel");

  if (!overlay || !modal || !form || !btnCancel) return;

  // acá iría la carga de músculos para seleccionarlo

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

    const newExercisePayload = mapNewExercisePayload(raw);

    // la carga de ejercicio va acá

    const created = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
      ...newExercisePayload,
    };

    exerciseState.exercises.push(created);
    close();
    renderExercisesView();
  });
}

/**
 * Mapea los valores crudos del formulario de "nuevo ejercicio"
 *
 *  - name="nombre"
 *  - name="musculoId"
 *  - name="categoria"
 *  - name="urlDemostracion"
 *  - name="activo"
 */
function mapNewExercisePayload(raw) {
  return {
    nombre: raw.nombre?.trim() ?? "",
    musculoId: raw.musculoId ? raw.musculoId : null,
    categoria: raw.categoria || "",
    urlDemostracion: raw.urlDemostracion?.trim() || "",
    activo: raw.activo === "on",
  };
}

/* MODAL: EDITAR EJERCICIO */

function openEditExerciseModal(modalHost, exercise) {
  modalHost.innerHTML = modalExerciseEditHtml(exercise);

  const overlay = document.getElementById("modal-overlay-exercise-edit");
  const modal = document.getElementById("modal-exercise-edit");
  const form = document.getElementById("exercise-edit-form");
  const btnCancel = document.getElementById("exercise-edit-cancel");

  if (!overlay || !modal || !form || !btnCancel) return;

  form.elements["nombre"].value = exercise.nombre ?? "";
  form.elements["urlDemostracion"].value =
    exercise.urlDemostracion ?? exercise.urlDemo ?? "";
  form.elements["categoria"].value = exercise.categoria ?? "";

  // acá va lo de musculos

  if (exercise.activo !== undefined) {
    const chk = form.elements["activo"];
    if (chk) chk.checked = !!exercise.activo;
  }

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
    const updatePayload = mapNewExercisePayload(raw);

    // Back real acá

    const updated = { ...exercise, ...updatePayload };

    const idx = exerciseState.exercises.findIndex((x) => x.id === exercise.id);
    if (idx >= 0) {
      exerciseState.exercises[idx] = updated;
    }
    close();
    renderExercisesView();
  });
}

/* MODAL: ELIMINAR EJERCICIO */

function openDeleteExerciseModal(modalHost, { id, nombre }) {
  modalHost.innerHTML = modalExerciseDeleteHtml({ id, nombre });

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

    exerciseState.exercises = exerciseState.exercises.filter(
      (ex) => String(ex.id) !== String(id)
    );

    close();
    renderExercisesView();
  });
}
