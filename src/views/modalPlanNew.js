import { modalPlanNewHtml, modalPlanNewSessionHtml, modalPlanNewExcerciseHtml } from '../components/modalPlanNewHtml.js'
import { comboBoxRender } from '../views/comboBox.js'
import { switchRender } from '../views/switch.js'

/** para test */
const coachList = ['Lucas Pérez', 'Juan Rodríguez', 'María González', 'Ana Torres'];
const excerciseList = ['Press de banca', 'Sentadilla', 'Peso muerto', 'Dominadas','Press de banca', 'Sentadilla', 'Peso muerto', 'Dominadas','Press de banca', 'Sentadilla', 'Peso muerto', 'Dominadas','Press de banca', 'Sentadilla', 'Peso muerto', 'Dominadas'];

function modalPlanNewCreateSessions(list) {

    const sessionsContainer = document.getElementById("sessions-container");
    const sessionBtnAdd = document.getElementById("session-button-add");
    let sessionCounter = 0;

    // Crearte session
    sessionBtnAdd.addEventListener("click", () => {
        sessionCounter++;
        const sessionHTML = modalPlanNewSessionHtml(sessionCounter);
        sessionsContainer.insertAdjacentHTML("beforeend", sessionHTML);
    });

    // Events delegation
    sessionsContainer.addEventListener("click", (e) => {
        const session = e.target.closest(".session");

        if (e.target.closest(".toggle-session")) {
            const content = session.querySelector(".session-accordion-content");
            content.classList.toggle("open");
            const icon = session.querySelector(".accordion-arrow");
            icon.style.transform = content.classList.contains("open") ? "rotate(180deg)" : "rotate(0)";
        }

        if (e.target.closest(".exercise-add", list)) {
            const excercisesList = session.querySelector(".exercise-list");
            const excercises = excercisesList.querySelectorAll(".session-exercise");
            const numberNew = excercises.length + 1;
            const excerciseHtml = modalPlanNewExcerciseHtml(numberNew);            
            excercisesList.insertAdjacentHTML("beforeend", excerciseHtml);

            const comboBoxId = `session-exercise-list-${numberNew}`;
            comboBoxRender(comboBoxId, list);
        }

        if (e.target.closest(".exerciseDelete")) {
            const exercise = e.target.closest(".session-exercise");
            const excerciseList = exercise.closest(".exercise-list");
            exercise.remove();
            exercisesRenumber(excerciseList);
        }
        if (e.target.closest(".sessionDelete")) {
            session.remove();
            renumerarSesiones();
        }
    });

    function exercisesRenumber(list) {
        list.querySelectorAll(".session-exercise").forEach((ej, i) => {
            ej.querySelector(".exerciseTitle").textContent = `Ejercicio ${i + 1}`;
        });
    }

    function renumerarSesiones() {
        const sesiones = sessionsContainer.querySelectorAll(".session");
        sesiones.forEach((sesion, i) => {
            sesion.querySelector(".session-accordion-title").textContent = `Sesión ${i + 1}`;
            sesion.querySelector('input[type="number"]').value = i + 1;
        });
        sessionCounter = sesiones.length;
    }
}

/** render modal new plan */
export function modalPlanNewRender() {
    const planNew = document.getElementById('modal-open-plan-new');
    planNew.innerHTML = modalPlanNewHtml();

    comboBoxRender('modal-plan-new-coach', coachList);
    switchRender('modal-plan-new-switch', 'Guardar como plantilla');    

    modalPlanNewCreateSessions(excerciseList);
}