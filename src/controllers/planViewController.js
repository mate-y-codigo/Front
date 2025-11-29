import { plansRender } from '../views/plans.js'
import { AppModalQuery } from '../views/modalQuery.js'
import { deletePlanById } from '../services/planApi.js'
import { AppModal } from '../views/modalNotice.js'

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   listener
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function addPlanViewListener(plan) {
    const planId = plan.id;

    document.getElementById('btn-back-plan').addEventListener('click', () => {
        plansRender();
    });

    const btnDelete = document.getElementById('btn-delete-plan')
    if (btnDelete) {
        document.getElementById('btn-delete-plan').addEventListener('click', () => {
            AppModalQuery.open({
                id: planId,
                iconHTML: '<span class="material-symbols-outlined text-red-600 text-5xl">warning</span>',
                titleText: "Borrar Plan",
                messageText: "¿Deseas eliminar este plan definitivamente?",
                onConfirm: async (id) => {
                    console.log("Confirmado para el ID:", id);
                    const result = await deletePlanById(id);
                    if (result.success) {
                        plansRender();
                    }
                    else {
                        AppModal.open({
                            iconHTML: '<span class="material-symbols-outlined text-red-600 text-5xl">error</span>',
                            titleText: "Ocurrio un error",
                            messageText: answer.errors
                        });
                    }
                },
                onCancel: (id) => {
                    /*console.log("Cancelado para el ID:", id);*/
                }
            });
        });
    }
}
