import { planViewHtml } from '../components/planViewHtml.js'
import { addPlanViewListener } from '../controllers/planViewController.js'
import { getPlanIsInUse } from '../services/planApi.js'

/* ---------------------------
   Page render
   --------------------------- */
export function planViewRender(plan) {
    const containerMain = document.getElementById("container-main");
    if (!containerMain) return;

    // smooth transition
    containerMain.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-150');
    containerMain.classList.remove('opacity-100', 'scale-100');
    setTimeout(async () => {
        const planIsInUse = await getPlanIsInUse(plan.id);
        containerMain.innerHTML = planViewHtml(plan, planIsInUse);

        addPlanViewListener(plan);

        // Apply input classes
        containerMain.classList.remove('opacity-0', 'scale-95');
        containerMain.classList.add('opacity-100', 'scale-100');
    }, 100); // duration equal to the transition
}

