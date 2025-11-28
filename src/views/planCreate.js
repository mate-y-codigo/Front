import { planCreateHtml, sessionExcerciseHtml } from '../components/planCreateHtml.js'
import { createSession, addPlanListener, getListTemplate } from '../controllers/planCreateController.js'
import { comboBoxRender } from '../views/comboBox.js'
import { switchRender } from '../views/switch.js'

/* ---------------------------
   Page render
   --------------------------- */
export function planCreateRender() {
    const containerMain = document.getElementById("container-main");
    if (!containerMain) return;

    // smooth transition
    containerMain.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-150');
    containerMain.classList.remove('opacity-100', 'scale-100');
    setTimeout(async () => {
        containerMain.innerHTML = planCreateHtml();

        // render global widgets
        const listTemplate = await getListTemplate();
        if (listTemplate.length) {
            comboBoxRender('plan-template-combobox', listTemplate);
        }
        else {
            comboBoxRender('plan-template-combobox', [{ id: 0, name: "No hay plantillas definidas" }]);
        }

        switchRender('plan-new-template-switch', 'Guardar como plantilla');

        // add handlers
        document.getElementById("session-add-btn").onclick = () => createSession();
        addPlanListener();

        // Apply input classes
        containerMain.classList.remove('opacity-0', 'scale-95');
        containerMain.classList.add('opacity-100', 'scale-100');
    }, 100); // duration equal to the transition
}

// auto-run on module load
document.addEventListener('DOMContentLoaded', () => {
    planCreateRender();
});
