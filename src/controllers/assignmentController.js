import { comboBoxRender } from "../views/comboBox.js";
import { datePickerRangeRender } from "../views/datePicker.js";
import { getStudentsActivesAll } from "../services/userApi.js";
import { getPlanAll } from "../services/planApi.js";
import { createAlumnoPlan } from "../services/asignacionApi.js";

export async function initializeAssignmentComponents() {
  try {
    const users = await getStudentsActivesAll();
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.nombre + " " + user.apellido,
    }));
    comboBoxRender("assignment-new-student-combobox", formattedUsers);

    const planes = await getPlanAll();
    const planOptions = planes.map((plan) => ({
      id: plan.id,
      name: plan.nombre,
    }));
    comboBoxRender("assignment-new-plan-combobox", planOptions);

    datePickerRangeRender(
      "assignment-new-date-range-fullscreen",
      handleDateChange
    );

    // Establecer valor por defecto de 0 en días de descanso
    const restInput = document.getElementById("rest-days-fullscreen");
    if (restInput) {
      restInput.value = "0";
      updatePreview("rest", "0");
    }

    setTimeout(() => {
      setupComboboxListeners();
      setupBasicListeners();
    }, 300);
  } catch (error) {
    console.error("Error inicializando componentes:", error);
  }
}

function handleDateChange(startDate, endDate) {
  updatePreview("start", startDate);
  updatePreview("end", endDate);

  if (startDate && endDate) {
    validateDateRange(startDate, endDate);
  }
}

function validateDateRange(startDate, endDate) {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (end < start) {
    const dateInputs = document.querySelectorAll(
      "#assignment-new-date-range-fullscreen input"
    );
    dateInputs.forEach((input) => {
      input.style.borderColor = "var(--destructive)";
    });
  } else {
    const dateInputs = document.querySelectorAll(
      "#assignment-new-date-range-fullscreen input"
    );
    dateInputs.forEach((input) => {
      input.style.borderColor = "";
    });
  }
}

function parseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return new Date(year, month - 1, day);
}

function setupComboboxListeners() {
  setTimeout(() => {
    const studentCombobox = document.querySelector(
      "#assignment-new-student-combobox .combobox"
    );
    const planCombobox = document.querySelector(
      "#assignment-new-plan-combobox .combobox"
    );

    if (studentCombobox) {
      studentCombobox.addEventListener("combo:change", function (event) {
        const selectedName = event.detail.name;
        if (selectedName && selectedName !== "Seleccione una opción...") {
          updatePreview("student", selectedName);
        }
      });
    }

    if (planCombobox) {
      planCombobox.addEventListener("combo:change", function (event) {
        const selectedName = event.detail.name;
        if (selectedName && selectedName !== "Seleccione una opción...") {
          updatePreview("plan", selectedName);
        }
      });
    }
  }, 500);
}

function setupBasicListeners() {
  const restInput = document.getElementById("rest-days-fullscreen");
  if (restInput) {
    restInput.addEventListener("input", function () {
      updatePreview("rest", this.value);
    });
  }

  const notesInput = document.getElementById("notes-fullscreen");
  if (notesInput) {
    notesInput.addEventListener("input", function () {
      const counter = document.getElementById("notes-counter");
      if (counter) counter.textContent = this.value.length;
      updatePreview("notes", this.value);
    });
  }

  const saveButton = document.getElementById("plan-new-save");
  if (saveButton) {
    saveButton.addEventListener("click", function () {
      saveAssignment();
    });
  }
}

async function saveAssignment() {
  const saveButton = document.getElementById("plan-new-save");
  const originalText = saveButton.innerHTML;
  
  try {
    // Mostrar loading - usando estilos existentes
    saveButton.innerHTML = `
      <span class="material-symbols-outlined animate-spin">refresh</span>
      Guardando...
    `;
    saveButton.disabled = true;
    saveButton.classList.add('assignment-loading');

    const assignmentData = getAssignmentData();

    // Validaciones con mensajes de error estilizados
    if (!assignmentData.IdAlumno) {
      showErrorMessage("Por favor, seleccione un alumno");
      
      // Resaltar el combobox de alumno
      const studentCombobox = document.querySelector('#assignment-new-student-combobox .combobox');
      if (studentCombobox) {
        studentCombobox.style.borderColor = 'var(--destructive)';
      }
      return;
    }

    if (!assignmentData.IdPlanEntrenamiento) {
      showErrorMessage("Por favor, seleccione un plan de entrenamiento");
      
      // Resaltar el combobox de plan
      const planCombobox = document.querySelector('#assignment-new-plan-combobox .combobox');
      if (planCombobox) {
        planCombobox.style.borderColor = 'var(--destructive)';
      }
      return;
    }

    if (!assignmentData.FechaInicio || !assignmentData.FechaFin) {
      showErrorMessage("Por favor, seleccione un rango de fechas válido");
      
      // Resaltar el date picker
      const dateInputs = document.querySelectorAll('#assignment-new-date-range-fullscreen input');
      dateInputs.forEach(input => {
        input.style.borderColor = 'var(--destructive)';
      });
      return;
    }

    // Validar que las fechas se formatearon correctamente
    if (assignmentData.FechaInicio === null || assignmentData.FechaFin === null) {
      showErrorMessage("Error en el formato de fechas. Por favor, verifique las fechas seleccionadas");
      return;
    }

    const start = new Date(assignmentData.FechaInicio);
    const end = new Date(assignmentData.FechaFin);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      showErrorMessage("Fechas inválidas. Por favor, seleccione nuevamente");
      return;
    }

    if (end < start) {
      showErrorMessage("La fecha de fin no puede ser anterior a la fecha de inicio");
      return;
    }

    // LLAMADA REAL A LA API
    await createAlumnoPlan(assignmentData);
      
    // Mostrar mensaje de éxito
    showSuccessMessage("Asignación guardada exitosamente");
    
    // Cerrar la pantalla después de guardar
    setTimeout(() => {
      if (window.closeFullScreenAssignment) {
        window.closeFullScreenAssignment();
      }
    }, 1500);

  } catch (error) {
    console.error("Error guardando asignación:", error);
    
    // Mostrar mensaje de error específico
    let errorMessage = "Error al guardar la asignación";
    if (error.message.includes("409")) {
      errorMessage = "El alumno ya tiene un plan asignado en este período";
    } else if (error.message.includes("400")) {
      errorMessage = "Datos inválidos. Verifique la información ingresada";
    } else if (error.message.includes("500")) {
      errorMessage = "Error del servidor. Intente nuevamente";
    } else if (error.message.includes("Network Error")) {
      errorMessage = "Error de conexión. Verifique su internet e intente nuevamente";
    }
    
    showErrorMessage(errorMessage);
  } finally {
    // Restaurar botón
    saveButton.innerHTML = originalText;
    saveButton.disabled = false;
    saveButton.classList.remove('assignment-loading');
  }
}

function showSuccessMessage(message) {
  const successOverlay = document.createElement('div');
  successOverlay.className = 'message-overlay';
  
  successOverlay.innerHTML = `
    <div class="message-container message-slide-in">
      <div class="message-icon success material-symbols-outlined">check_circle</div>
      <h3 class="message-title">¡Éxito!</h3>
      <p class="message-text">${message}</p>
      <button onclick="this.closest('.message-overlay').remove()" 
              class="message-button success">
        <span class="material-symbols-outlined text-lg">check</span>
        Aceptar
      </button>
    </div>
  `;
  
  document.body.appendChild(successOverlay);
  
  // Auto-remover después de 3 segundos
  setTimeout(() => {
    if (successOverlay.parentNode) {
      successOverlay.remove();
    }
  }, 3000);
}

function showErrorMessage(message) {
  const errorOverlay = document.createElement('div');
  errorOverlay.className = 'message-overlay';
  
  errorOverlay.innerHTML = `
    <div class="message-container message-slide-in">
      <div class="message-icon error material-symbols-outlined">error</div>
      <h3 class="message-title">Error</h3>
      <p class="message-text">${message}</p>
      <button onclick="this.closest('.message-overlay').remove()" 
              class="message-button error">
        <span class="material-symbols-outlined text-lg">close</span>
        Entendido
      </button>
    </div>
  `;
  
  document.body.appendChild(errorOverlay);
  
  // Auto-remover después de 5 segundos
  setTimeout(() => {
    if (errorOverlay.parentNode) {
      errorOverlay.remove();
    }
  }, 5000);
}

export function getAssignmentData() {
  const studentCombobox = document.querySelector(
    "#assignment-new-student-combobox .combobox"
  );
  const planCombobox = document.querySelector(
    "#assignment-new-plan-combobox .combobox"
  );
  const restDays = document.getElementById("rest-days-fullscreen");
  const notes = document.getElementById("notes-fullscreen");

  const dateInputs = document.querySelectorAll(
    "#assignment-new-date-range-fullscreen input"
  );
  const startDateInput = dateInputs[0]?.value;
  const endDateInput = dateInputs[1]?.value;

  // AQUÍ SE LLAMA A formatDateForBackend
  const startDate = startDateInput
    ? formatDateForBackend(startDateInput)
    : null;
  const endDate = endDateInput ? formatDateForBackend(endDateInput) : null;

  const studentId = getSelectedId(studentCombobox);
  const planId = getSelectedId(planCombobox);

  return {
    IdAlumno: studentId,
    IdPlanEntrenamiento: planId,
    FechaInicio: startDate,
    FechaFin: endDate,
    IntervaloDiasDescanso: parseInt(restDays?.value) || 0,
    Notas: notes?.value || "",
  };
}

function formatDateForBackend(dateString) {
  try {
    const [day, month, year] = dateString.split("/");
    
    // Crear fecha con hora específica (7:33:49.221 como en el ejemplo)
    const date = new Date(Date.UTC(
      parseInt(year), 
      parseInt(month) - 1, 
      parseInt(day), 
      7, 33, 49, 221 // Hora fija como en "2025-11-30T07:33:49.221Z"
    ));
    
    const isoDateTime = date.toISOString();
    return isoDateTime;
    
  } catch (error) {
    console.error("Error formateando fecha:", error);
    return null;
  }
}

function getSelectedId(comboboxElement) {
  if (!comboboxElement) return null;

  const selectedId = comboboxElement.dataset.selectedId;

  if (!selectedId || selectedId === "" || selectedId === "null" || selectedId === "undefined") {
    const selectedOption = comboboxElement.querySelector("#selected-option");
    if (selectedOption && selectedOption.textContent !== "Seleccione una opción...") {
      return null;
    }
    return null;
  }

  // Asegurarse de que el ID sea un GUID válido
  try {
    // Si el ID no es un GUID válido, retornar null
    if (!isValidGuid(selectedId)) {
      return null;
    }
    return selectedId;
  } catch (error) {
    console.error("Error validando GUID:", error);
    return null;
  }
}

// Función auxiliar para validar GUID
function isValidGuid(guid) {
  const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return guidRegex.test(guid);
}

function updatePreview(type, value) {
  const previewElements = {
    student: "assignment-preview-student",
    plan: "assignment-preview-plan",
    rest: "assignment-preview-rest",
    notes: "assignment-preview-notes",
    start: "assignment-preview-start",
    end: "assignment-preview-end",
  };

  const element = document.getElementById(previewElements[type]);
  if (!element) return;

  let displayValue = value || getDefaultText(type);

  switch (type) {
    case "student":
      element.textContent = displayValue;
      break;
    case "plan":
      element.textContent = displayValue;
      break;
    case "rest":
      element.textContent = value ? `${value} días` : "0 días";
      break;
    case "notes":
      const preview = value
        ? value.substring(0, 100) + (value.length > 100 ? "..." : "")
        : "--";
      element.textContent = preview;
      break;
    case "start":
    case "end":
      element.textContent = value || "--/--/----";
      break;
    default:
      element.textContent = displayValue;
  }
}

function getDefaultText(type) {
  const defaults = {
    student: "Seleccione un alumno",
    plan: "Seleccione un plan de entrenamiento",
    rest: "0 días",
    notes: "--",
    start: "--/--/----",
    end: "--/--/----",
  };
  return defaults[type] || "--";
}

export function refreshPreview() {
  const studentCombobox = document.querySelector(
    "#assignment-new-student-combobox .combobox"
  );
  const planCombobox = document.querySelector(
    "#assignment-new-plan-combobox .combobox"
  );
  const restInput = document.getElementById("rest-days-fullscreen");
  const notesInput = document.getElementById("notes-fullscreen");
  const dateInputs = document.querySelectorAll(
    "#assignment-new-date-range-fullscreen input"
  );

  if (studentCombobox?.dataset.selectedName) {
    updatePreview("student", studentCombobox.dataset.selectedName);
  }
  if (planCombobox?.dataset.selectedName) {
    updatePreview("plan", planCombobox.dataset.selectedName);
  }
  if (restInput) updatePreview("rest", restInput.value);
  if (notesInput) updatePreview("notes", notesInput.value);
  if (dateInputs[0]) updatePreview("start", dateInputs[0].value);
  if (dateInputs[1]) updatePreview("end", dateInputs[1].value);
}
