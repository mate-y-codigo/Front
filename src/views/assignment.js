import {
  assignmentHtml,
  assignmentCardHtml,
} from "../components/assignmentHtml.js";
import { comboBoxRender } from "../views/comboBox.js";
import { progressBarSetAll } from "../views/progressBar.js";
import { inputSuggestionIcon } from "../views/inputSuggestion.js";
import { assignmentNewFullScreenRender } from "../views/assignmentNew.js";
import { getAllAlumnoPlan } from "../services/asignacionApi.js";
import { getStudentsActivesAll } from "../services/userApi.js";

const assignmentTypeList = [
  { id: 0, name: "Todos" },
  { id: 1, name: "Activo" },
  { id: 2, name: "Finalizado" },
];

let currentAssignments = [];
let currentFilters = {
  status: null,
  student: null,
};
let currentUsers = [];
let activeListeners = [];

/** assignment render */
export async function assignmentRender(initialFilters = {}) {
  const containerMain = document.getElementById("container-main");
  if (!containerMain) return;

  cleanupListeners();

  containerMain.classList.add(
    "opacity-0",
    "scale-95",
    "transition-all",
    "duration-300"
  );
  containerMain.classList.remove("opacity-100", "scale-100");

  try {
    // RESETEAR FILTROS CUANDO SE ENTRA A LA VISTA (a menos que se pasen filtros específicos)
    if (Object.keys(initialFilters).length === 0) {
      currentFilters = {
        status: null,
        student: null,
      };
    } else {
      // Aplicar filtros iniciales si se pasaron explícitamente
      if (initialFilters.status !== undefined) {
        currentFilters.status = initialFilters.status;
      }
      if (initialFilters.student !== undefined) {
        currentFilters.student = initialFilters.student;
      }
    }

    console.log("Filtros al entrar a la vista:", currentFilters);

    // 1. OBTENER USUARIOS PRIMERO
    const users = await getStudentsActivesAll();
    currentUsers = users;

    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.nombre + " " + user.apellido,
    }));

    // 2. OBTENER TODAS LAS ASIGNACIONES (sin filtros cuando se entra por primera vez)
    const assignments = await getAllAlumnoPlan({}); // ✅ ENVÍAR OBJETO VACÍO
    currentAssignments = assignments;

    const formattedAssignments = formatAssignments(assignments);

    setTimeout(() => {
      containerMain.innerHTML = assignmentHtml(formattedAssignments);

      setTimeout(() => {
        initializeUIComponents(formattedUsers);
        setupFilterListeners();
        setupNewAssignmentButton();

        containerMain.classList.remove("opacity-0", "scale-95");
        containerMain.classList.add("opacity-100", "scale-100");
      }, 50);
    }, 100);
  } catch (error) {
    console.error("Error cargando asignaciones:", error);
    cleanupListeners();
  }
}

// Inicializar componentes de UI
function initializeUIComponents(formattedUsers) {
  // Inicializar input de búsqueda
  const searchContainer = document.getElementById("assignment-input-search");
  if (searchContainer && !searchContainer.hasChildNodes()) {
    inputSuggestionIcon(
      "assignment-input-search",
      "search",
      "Buscar alumno...",
      formattedUsers
    );
  }

  // Inicializar combobox
  const comboboxContainer = document.getElementById("assignment-type-combobox");
  if (comboboxContainer && !comboboxContainer.hasChildNodes()) {
    comboBoxRender("assignment-type-combobox", assignmentTypeList);
  }

  // Inicializar progress bars
  progressBarSetAll();
}

// Limpiar todos los listeners registrados
function cleanupListeners() {
  activeListeners.forEach(({ element, event, handler }) => {
    if (element && element.removeEventListener && handler) {
      element.removeEventListener(event, handler);
    }
  });
  activeListeners = [];
}

// Registrar listener para limpiarlo después
function registerListener(element, event, handler) {
  activeListeners.push({ element, event, handler });
  element.addEventListener(event, handler);
}

// Construir objeto de filtros para el backend CORREGIDO
function buildBackendFilters() {
  const filters = {};

  // Mapear estado: 1 = Activo, 2 = Finalizado
  if (currentFilters.status !== null) {
    filters.Estado = currentFilters.status;
  }

  // Filtrar por ID de alumno (NO por nombre)
  if (currentFilters.student !== null) {
    // Buscar el ID del alumno basado en el nombre
    const alumnoId = findAlumnoIdByName(currentFilters.student);
    if (alumnoId) {
      filters.IdAlumno = alumnoId;
    } else {
      console.warn(
        "No se encontró el ID para el alumno:",
        currentFilters.student
      );
      // Si no encontramos el ID, no filtramos por alumno
    }
  }

  console.log("Filtros para backend:", filters);
  return filters;
}

// Función para encontrar el ID del alumno por nombre
function findAlumnoIdByName(studentName) {
  if (!currentUsers || currentUsers.length === 0) {
    console.warn("No hay usuarios cargados para buscar el ID");
    return null;
  }

  // Buscar coincidencia exacta o parcial (case insensitive)
  const alumno = currentUsers.find((user) => {
    const fullName = `${user.nombre} ${user.apellido}`.toLowerCase();
    return fullName.includes(studentName.toLowerCase());
  });

  if (alumno) {
    console.log(
      `Encontrado: ${alumno.nombre} ${alumno.apellido} -> ID: ${alumno.id}`
    );
    return alumno.id;
  }

  console.warn(`No se encontró alumno con nombre: ${studentName}`);
  return null;
}

// Configurar listeners para los filtros
function setupFilterListeners() {
  console.log("Configurando listeners de filtros...");

  // Listener para el combobox de estado
  const statusCombobox = document.querySelector(
    "#assignment-type-combobox .combobox"
  );
  if (statusCombobox) {
    console.log("Combobox encontrado");
    registerListener(statusCombobox, "combo:change", function (event) {
      const selectedId = event.detail.id;
      console.log("Combobox cambiado:", selectedId);
      handleStatusFilterChange(selectedId);
    });
  } else {
    console.warn("No se encontró el combobox de estado");
  }

  // Listener para el input de búsqueda
  const searchInput = document.querySelector("#assignment-input-search input");
  if (searchInput) {
    console.log("Input de búsqueda encontrado");
    registerListener(searchInput, "input", function (event) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        handleStudentFilterChange(event.target.value);
      }, 500);
    });
  } else {
    console.warn("No se encontró el input de búsqueda");
  }

  // Listener para sugerencias seleccionadas
  const searchContainer = document.getElementById("assignment-input-search");
  if (searchContainer) {
    registerListener(searchContainer, "suggestion:select", function (event) {
      handleStudentFilterChange(event.detail.name);
    });
  }
}

// Configurar el botón de nueva asignación
function setupNewAssignmentButton() {
  const newAssignmentBtn = document.querySelector(
    '[onclick*="openFullScreenAssignment"]'
  );
  if (newAssignmentBtn) {
    newAssignmentBtn.removeAttribute("onclick");
    registerListener(newAssignmentBtn, "click", function () {
      assignmentNewFullScreenRender();
    });
  }
}

function handleStatusFilterChange(statusId) {
  currentFilters.status = statusId === "0" ? null : parseInt(statusId);
  applyFilters();
}

function handleStudentFilterChange(studentName) {
  currentFilters.student =
    studentName && studentName.trim() !== "" ? studentName.trim() : null;
  applyFilters();
}

async function applyFilters() {
  try {
    console.log("=== DEBUG APPLY FILTERS ===");
    console.log("Filtros actuales:", currentFilters);
    console.log("Filtros para backend:", buildBackendFilters());

    const filteredAssignments = await getAllAlumnoPlan(buildBackendFilters());
    console.log(`Resultados: ${filteredAssignments.length} asignaciones`);

    const formattedAssignments = formatAssignments(filteredAssignments);
    renderFilteredAssignments(formattedAssignments);
  } catch (error) {
    console.error("Error aplicando filtros:", error);
    const assignmentCards = document.getElementById("assignment-cards");
    if (assignmentCards) {
      assignmentCards.innerHTML = `
        <div class="text-center py-8">
          <p class="text-lg text-gray-600">Error al aplicar filtros</p>
          <button onclick="applyFilters()" class="button mt-4">Reintentar</button>
        </div>
      `;
    }
  }
}

function renderFilteredAssignments(formattedAssignments) {
  const assignmentCards = document.getElementById("assignment-cards");
  const assignmentTitle = document.getElementById("assignment-title");

  if (assignmentCards) {
    if (formattedAssignments.length === 0) {
      assignmentCards.innerHTML = `
    <div class="flex flex-col items-center justify-center py-16">
      <div class="text-center max-w-md">
        <div class="flex justify-center mb-4">
          <span class="material-symbols-outlined text-5xl text-gray-400">search_off</span>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Sin resultados</h3>
        <p class="text-gray-500 mb-6">No se encontraron asignaciones con los filtros aplicados</p>
        <button onclick="clearFilters()" class="button button-primary inline-flex items-center gap-2">
          <span class="material-symbols-outlined">refresh</span>
          Mostrar todas las asignaciones
        </button>
      </div>
    </div>
  `;
    } else {
      assignmentCards.innerHTML = formattedAssignments
        .map((assignment) => assignmentCardHtml(assignment))
        .join("");

      progressBarSetAll();
    }
  }

  if (assignmentTitle) {
    let title = "Todas las Asignaciones";
    if (currentFilters.status === 1) title = "Asignaciones Activas";
    else if (currentFilters.status === 2) title = "Asignaciones Finalizadas";
    if (currentFilters.student)
      title += ` - Filtrado por: ${currentFilters.student}`;
    assignmentTitle.textContent = title;
  }
}

function formatAssignments(assignments) {
  return assignments.map((assignment) => formatSingleAssignment(assignment));
}

function formatSingleAssignment(assignment) {
  return {
    id: assignment.id,
    name: assignment.nombreAlumno || "Nombre no disponible",
    planName: assignment.nombrePlan || "Plan no disponible",
    dateStart: formatDate(assignment.fechaInicio),
    dateEnd: formatDate(assignment.fechaFin),
    progress: assignment.progresoPorcentaje,
    status: getStatus(assignment.Estado, assignment.progresoPorcentaje),
    duration: calculateDuration(assignment.fechaInicio, assignment.fechaFin),
  };
}

function getStatus(backendStatus, progress) {
  if (backendStatus === 1) return "Activo";
  if (backendStatus === 2) return "Finalizado";
  return "Activo";
}

function formatDate(dateString) {
  if (!dateString) return "--/--/----";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  } catch (error) {
    return "--/--/----";
  }
}

function calculateDuration(startDate, endDate) {
  if (!startDate || !endDate) return "Duración no disponible";
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} días`;
  } catch (error) {
    return "Duración no disponible";
  }
}

export function clearFilters() {
  currentFilters = { status: null, student: null };
  
  // Limpiar input de búsqueda
  const searchInput = document.querySelector('#assignment-input-search input');
  if (searchInput) searchInput.value = '';
  
  // RESETEAR COMBOBOX DE ESTADO
  resetStatusCombobox();
  
  applyFilters();
}

// Función para resetear el combobox de estado
function resetStatusCombobox() {
  const statusCombobox = document.querySelector('#assignment-type-combobox .combobox');
  if (statusCombobox) {
    // Resetear el dataset
    statusCombobox.dataset.selectedId = '0';
    statusCombobox.dataset.selectedName = 'Todos';
    
    // Actualizar el texto visible
    const selectedOption = statusCombobox.querySelector('#selected-option');
    if (selectedOption) {
      selectedOption.textContent = 'Todos';
    }
    
    // Cerrar el dropdown si está abierto
    const dropdown = statusCombobox.querySelector('.combobox-dropdown');
    if (dropdown) {
      dropdown.classList.add('hidden');
    }
    
    console.log("✅ Combobox reseteado a 'Todos'");
  } else {
    console.warn("No se encontró el combobox de estado");
  }
}

window.clearFilters = clearFilters;
window.applyFilters = applyFilters;
window.assignmentRender = assignmentRender;