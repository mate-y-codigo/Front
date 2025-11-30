
import { assignmentNewHtml } from '../components/assignmentNewHtml.js';
import { initializeAssignmentComponents } from '../controllers/assignmentController.js';
import { assignmentRender } from '../views/assignment.js';

let previousState = null;

/** Renderiza la pantalla completa de nueva asignación */
export function assignmentNewFullScreenRender() {
    const containerMain = document.getElementById('container-main');
    if (!containerMain) return;

    // Guardar estado actual
    previousState = {
        search: document.querySelector('#assignment-input-search input')?.value || '',
        status: document.querySelector('#assignment-type-combobox .combobox')?.dataset.selectedId || '0'
    };

    containerMain.classList.add('opacity-0', 'scale-95');
    containerMain.classList.remove('opacity-100', 'scale-100');

    setTimeout(() => {
        containerMain.innerHTML = assignmentNewHtml();
        initializeAssignmentComponents();
        
        containerMain.classList.remove('opacity-0', 'scale-95');
        containerMain.classList.add('opacity-100', 'scale-100');
    }, 150);
}

window.closeFullScreenAssignment = function() {
  const containerMain = document.getElementById('container-main');
  if (!containerMain || !previousState) return;

  containerMain.classList.add('opacity-0', 'scale-95');
  containerMain.classList.remove('opacity-100', 'scale-100');

  setTimeout(() => {
    containerMain.innerHTML = '<div class="flex items-center justify-center h-64">Cargando asignaciones...</div>';
    
    if (window.assignmentRender) {
      assignmentRender();
    }
    
    // Resetear estado
    previousState = null;

    // Transición de entrada
    containerMain.classList.remove('opacity-0', 'scale-95');
    containerMain.classList.add('opacity-100', 'scale-100');
  }, 150);
};