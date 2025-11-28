import { getPlanByFilter } from '../services/planApi.js'
import { planCreateRender } from '../views/planCreate.js'
import { planViewRender } from '../views/planView.js'
import { planCardHtml } from '../components/plansHtml.js'

export function getPlansType() {
    return [
        { id: 0, name: 'Todos los planes' },
        { id: 1, name: 'Plantilla' },
        { id: 2, name: 'Personalizado' }
    ];
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   render cards plan 
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export async function renderCardsPlans(plans) {
    const listPlans = plans;
    const containerPlansCards = document.querySelector('#plans-cards');

    // Encourage exit
    containerPlansCards.classList.add("plans-cards-fade-exit");
    containerPlansCards.classList.add("plans-cards-fade-exit-active");

    // Wait for the exit animation to finish.
    setTimeout(() => {
        // Replace content
        containerPlansCards.innerHTML = listPlans.map((plan) => planCardHtml(plan)).join('');

        // Reset output classes
        containerPlansCards.classList.remove("plans-cards-fade-exit", "plans-cards-fade-exit-active");

        // Animate entrance
        containerPlansCards.classList.add("plans-cards-fade-enter");
        requestAnimationFrame(() => {
            containerPlansCards.classList.add("plans-cards-fade-enter-active");
        });

        // Clean classes when finished
        setTimeout(() => {
            containerPlansCards.classList.remove("plans-cards-fade-enter", "plans-cards-fade-enter-active");
        }, 250);
    }, 200);
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   render init filter cards plans
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function initPlanFilters() {
    const searchInput = document.querySelector("#plan-input-search input");
    const cards = document.querySelectorAll(".card-plan");

    // obtener el tipo "Todos" una sola vez
    const defaultType = getPlansType()[0].name;

    // valor actual del filtro por tipo
    let currentType = defaultType;

    // referencia al combo
    const comboContainer = document.querySelector("#plan-type-filter-combobox .combobox");

    async function filterPlans() {
        let typePlan = null;
        if (currentType === getPlansType()[1].name)
            typePlan = true;
        if (currentType === getPlansType()[2].name)
            typePlan = false;

        const containerPlansCards = document.querySelector('#plans-cards');
        const plansFilter = await getPlanByFilter(searchInput.value.toLowerCase().trim(), typePlan);

        const titleFilter = document.querySelector('#plans-filter-title');
        if (searchInput.value.length === 0 && typePlan === null) {
            titleFilter.textContent = 'Todos los Planes';
        }
        else {
            titleFilter.textContent = `Rsultados de la búsqueda: ${plansFilter.length}`;
        }

        renderCardsPlans(plansFilter);
    }

    // Evento del input buscar
    searchInput.addEventListener("input", filterPlans);

    // Evento del combobox (personalizado)
    comboContainer.addEventListener("combo:change", (e) => {
        currentType = e.detail.name;
        filterPlans();
    });
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   listener
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function addPlanListener() {
    const containerMain = document.querySelector("#container-main");
    containerMain.querySelectorAll(".btn-plan-detail").forEach(btn => {
        btn.addEventListener("click", e => {
            const planData = JSON.parse(e.currentTarget.dataset.plan);
            planViewRender(planData);
        });
    });
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   open page to create plans
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function openPlanCreate() {
    planCreateRender();
}