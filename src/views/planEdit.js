import { planEditHtml } from '../components/PlanEditHtml.js'
import { editPlanLoad, addPlanListener } from '../controllers/planEditController.js'

/* ---------------------------
   Page render
   --------------------------- */
export function planEditRender(plan) {
    const containerMain = document.getElementById("container-main");
    if (!containerMain) return;

    // smooth transition
    containerMain.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-150');
    containerMain.classList.remove('opacity-100', 'scale-100');
    setTimeout(async () => {
        containerMain.innerHTML = planEditHtml();

        editPlanLoad(plan);
        addPlanListener(plan);

        // Apply input classes
        containerMain.classList.remove('opacity-0', 'scale-95');
        containerMain.classList.add('opacity-100', 'scale-100');
    }, 100); // duration equal to the transition
}

// auto-run on module load
document.addEventListener('DOMContentLoaded', () => {
    // planCreateRender();
});
