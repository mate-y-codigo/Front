import { comboBoxRender } from '../views/comboBox.js'
import { plansHtml } from '../components/plansHtml.js'
import { getPlanActive } from '../services/planApi.js'
import { getPlansType, addPlanListener, initPlanFilters, openPlanCreate } from '../controllers/planController.js'
import { authHelper } from '../helpers/authHelper.js'

/** render */
export function plansRender() {
    const containerMain = document.getElementById("container-main");
    // transicion suave
    containerMain.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-300');
    containerMain.classList.remove('opacity-100', 'scale-100');
    setTimeout(async () => {

        // ID entrenador
        const token = authHelper.getAccessToken();
        const info = authHelper.parseTokens(token);
        const couchId = info.sub;

        const listPlan = await getPlanActive(couchId);
        containerMain.innerHTML = await plansHtml(listPlan);
        // make comboBox
        comboBoxRender('plan-type-filter-combobox', getPlansType());
        // add listener
        addPlanListener();
        // init filter
        initPlanFilters();
        
        window.openPlanCreate = openPlanCreate;

        // Apply input classes
        containerMain.classList.remove('opacity-0', 'scale-95');
        containerMain.classList.add('opacity-100', 'scale-100');
    }, 100); // duration equal to the transition
}
