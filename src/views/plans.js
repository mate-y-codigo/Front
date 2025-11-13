import { plansHtml } from '../components/plansHtml.js'
import { modalPlansDetailRender } from "../views/modalPlanDetail.js"
import { modalPlanNewRender } from '../views/modalPlanNew.js'
import { comboBoxRender } from '../views/comboBox.js'

const plansTypeList = ['Todos los planes', 'Plantillas', 'Personalizados'];

/** para test */
const jsonTestPlans = {
    "plans": [
        {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "nombre": "Hipertrofia Inicial",
            "descripcion": "Programa enfocado en ganancia de masa muscular para principiantes",
            "esPlantilla": true,
            "idEntrenador": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "fechaCreacion": "2025-11-11T17:47:47.553Z",
            "fechaActualizacion": "2025-11-11T17:47:47.553Z",
            "activo": true,
            "sesionesEntrenamiento": [
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "nombre": "Calentamiento",
                    "orden": 1,
                    "sesionesEjercicio": [
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "idEjercicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "nombreEjercicio": "Abdominales 1",
                            "seriesObjetivo": 5,
                            "repeticionesObjetivo": 10,
                            "pesoObjetivo": 0
                        },
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "idEjercicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "nombreEjercicio": "Abdominales 2",
                            "seriesObjetivo": 5,
                            "repeticionesObjetivo": 10,
                            "pesoObjetivo": 0
                        },
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "idEjercicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "nombreEjercicio": "Abdominales 3",
                            "seriesObjetivo": 5,
                            "repeticionesObjetivo": 10,
                            "pesoObjetivo": 0
                        }
                    ]
                },
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "nombre": "Fuerza",
                    "orden": 2,
                    "sesionesEjercicio": [
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "idEjercicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "nombreEjercicio": "Press en Banco",
                            "seriesObjetivo": 3,
                            "repeticionesObjetivo": 12,
                            "pesoObjetivo": 50
                        }
                    ]
                },
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "nombre": "Fuerza",
                    "orden": 3,
                    "sesionesEjercicio": [
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "idEjercicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "nombreEjercicio": "Sentadilla",
                            "seriesObjetivo": 5,
                            "repeticionesObjetivo": 10,
                            "pesoObjetivo": 70
                        }
                    ]
                },
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "nombre": "Fuerza",
                    "orden": 4,
                    "sesionesEjercicio": [
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "idEjercicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "nombreEjercicio": "Sentadilla",
                            "seriesObjetivo": 5,
                            "repeticionesObjetivo": 10,
                            "pesoObjetivo": 70
                        }
                    ]
                }
            ]
        },
        {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "nombre": "Hipertrofia Avanzada",
            "descripcion": "Programa enfocado en ganancia de masa muscular para principiantes",
            "esPlantilla": false,
            "idEntrenador": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "fechaCreacion": "2025-11-11T17:47:47.553Z",
            "fechaActualizacion": "2025-11-11T17:47:47.553Z",
            "activo": true,
            "sesionesEntrenamiento": [
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "nombre": "Calentamiento",
                    "orden": 1,
                    "sesionesEjercicio": [
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "idEjercicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "nombreEjercicio": "Abdominales",
                            "seriesObjetivo": 5,
                            "repeticionesObjetivo": 10,
                            "pesoObjetivo": 0
                        }
                    ]
                },
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "nombre": "Fuerza",
                    "orden": 2,
                    "sesionesEjercicio": [
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "idEjercicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "nombreEjercicio": "Press en Banco",
                            "seriesObjetivo": 3,
                            "repeticionesObjetivo": 12,
                            "pesoObjetivo": 50
                        }
                    ]
                },
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "nombre": "Fuerza",
                    "orden": 3,
                    "sesionesEjercicio": [
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "idEjercicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "nombreEjercicio": "Sentadilla",
                            "seriesObjetivo": 5,
                            "repeticionesObjetivo": 10,
                            "pesoObjetivo": 70
                        }
                    ]
                }
            ]
        }
    ]
};

function openPlanModal(plan) {
    modalPlansDetailRender(plan);
    const overlay = document.getElementById('modal-overlay-plan');
    const modal = document.getElementById('modal-plan-detail');

    overlay.style.display = 'flex';
    modal.classList.remove('modal-plan-exit');
    modal.classList.add('modal-plan-enter');

}

function closePlanModal() {
    const overlay = document.getElementById('modal-overlay-plan');
    const modal = document.getElementById('modal-plan-detail');

    modal.classList.remove('modal-plan-enter');
    modal.classList.add('modal-plan-exit');
    setTimeout(() => { overlay.style.display = 'none'; }, 250);
}

function openPlanNewModal() {
    modalPlanNewRender();
    const overlay = document.getElementById('modal-overlay-plan-new');
    const modal = document.getElementById('modal-plan-new');

    overlay.style.display = 'flex';
    modal.classList.remove('modal-plan-exit');
    modal.classList.add('modal-plan-enter');

}

function closePlanNewModal() {
    const overlay = document.getElementById('modal-overlay-plan-new');
    const modal = document.getElementById('modal-plan-new');

    modal.classList.remove('modal-plan-enter');
    modal.classList.add('modal-plan-exit');
    setTimeout(() => { overlay.style.display = 'none'; }, 250);
}

/** render */
export function plansRender() {
    const containerMain = document.getElementById("container-main");
    containerMain.innerHTML = plansHtml(jsonTestPlans);

    comboBoxRender('plan-type-combobox', plansTypeList);

    containerMain.querySelectorAll(".btn-plan-detail").forEach(btn => {
        btn.addEventListener("click", e => {
            const planData = JSON.parse(e.currentTarget.dataset.plan);
            openPlanModal(planData);
        });
    });


    window.closePlanModal = closePlanModal;
    window.openPlanNewModal = openPlanNewModal;
    window.closePlanNewModal = closePlanNewModal;
}
